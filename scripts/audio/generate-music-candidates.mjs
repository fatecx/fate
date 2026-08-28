/**
 * Generate the isolated Eleven Music audition batch.
 *
 * These files are NOT registered in src/content/sound.ts and cannot play in
 * the game. The restricted /map MUSIC tab is their review room.
 *
 *   node scripts/audio/generate-music-candidates.mjs
 *   node scripts/audio/generate-music-candidates.mjs --only=h_soft_as_rain
 *   node scripts/audio/generate-music-candidates.mjs --force --concurrency=2
 */
import { mkdirSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const manifest = JSON.parse(readFileSync(resolve(root, 'music/candidates.json'), 'utf8'))
const outDir = resolve(root, 'public/music-candidates')
mkdirSync(outDir, { recursive: true })

const key = process.env.ELEVENLABS_API_KEY
if (!key) {
  console.error('ELEVENLABS_API_KEY missing (source ~/.tokens)')
  process.exit(1)
}

const args = process.argv.slice(2)
const force = args.includes('--force')
const only = args.find((a) => a.startsWith('--only='))?.slice(7).split(',')
const concurrency = Math.max(1, Math.min(4, Number(args.find((a) => a.startsWith('--concurrency='))?.slice(14) ?? 2)))
const queue = manifest.candidates.filter((c) => !only || only.includes(c.id))

const generate = async (candidate) => {
  const file = resolve(outDir, `${candidate.id}.mp3`)
  if (!force) {
    try {
      if (statSync(file).size > 100_000) {
        console.log(`skip   ${candidate.id} (exists)`)
        return
      }
    } catch {
      // Missing is the normal path.
    }
  }

  const seconds = candidate.seconds ?? manifest.seconds
  process.stdout.write(`render ${candidate.id} (${seconds}s, ${manifest.model})… `)
  const res = await fetch('https://api.elevenlabs.io/v1/music?output_format=mp3_48000_192', {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: candidate.prompt,
      music_length_ms: seconds * 1000,
      model_id: manifest.model,
      force_instrumental: true,
      store_for_inpainting: true,
    }),
  })
  if (!res.ok) throw new Error(`${candidate.id}: ${res.status} ${(await res.text()).slice(0, 300)}`)
  const bytes = Buffer.from(await res.arrayBuffer())
  if (bytes.length < 100_000) throw new Error(`${candidate.id}: suspiciously small response (${bytes.length} bytes)`)
  const tmp = `${file}.part`
  writeFileSync(tmp, bytes)
  renameSync(tmp, file)
  console.log(`ok (${(bytes.length / 1024 / 1024).toFixed(1)} MB)`)
}

let cursor = 0
let failed = false
const worker = async () => {
  while (cursor < queue.length) {
    const candidate = queue[cursor++]
    try {
      await generate(candidate)
    } catch (err) {
      failed = true
      try { unlinkSync(resolve(outDir, `${candidate.id}.mp3.part`)) } catch {}
      console.error(`FAILED ${String(err?.message ?? err)}`)
    }
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, worker))
if (failed) process.exitCode = 1
else console.log(`done — ${queue.length} candidate${queue.length === 1 ? '' : 's'} ready in public/music-candidates/`)
