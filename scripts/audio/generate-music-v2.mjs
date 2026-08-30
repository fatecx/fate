/**
 * MUSIC 2.0 — isolated from Codex's audition rounds.
 *
 * Writes to public/music-v2/. Does not touch music-candidates,
 * music-benchmarks, or music-directions.
 *
 *   node scripts/audio/generate-music-v2.mjs
 *   node scripts/audio/generate-music-v2.mjs --only=v2_night_run
 *   node scripts/audio/generate-music-v2.mjs --force --concurrency=2
 */
import { mkdirSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const manifest = JSON.parse(readFileSync(resolve(root, 'music/v2.json'), 'utf8'))
const outDir = resolve(root, 'public/music-v2')
mkdirSync(outDir, { recursive: true })

const key = process.env.ELEVENLABS_API_KEY
if (!key) {
  console.error('ELEVENLABS_API_KEY missing (source ~/.tokens)')
  process.exit(1)
}

const args = process.argv.slice(2)
const force = args.includes('--force')
const only = args.find((a) => a.startsWith('--only='))?.slice(7).split(',')
const variants = Math.max(1, Math.min(4, Number(args.find((a) => a.startsWith('--variants='))?.slice(11) ?? 1)))
const concurrency = Math.max(1, Math.min(3, Number(args.find((a) => a.startsWith('--concurrency='))?.slice(14) ?? 2)))
const queue = manifest.tracks.filter((t) => !only || only.includes(t.id)).flatMap((t) =>
  Array.from({ length: variants }, (_, i) => ({
    ...t,
    outId: variants > 1 ? `${t.id}_v${i + 1}` : t.id,
    seed: t.seedBase + i,
  })),
)

const pause = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchWithRetry(url, options, id) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    const response = await fetch(url, options)
    if (response.ok || ![429, 500, 502, 503, 504].includes(response.status) || attempt === 4) return response
    const waitMs = Math.min(12_000, 1500 * 2 ** (attempt - 1))
    console.warn(`\nretry  ${id} after ${response.status} (${waitMs / 1000}s)`)
    await pause(waitMs)
  }
}

async function render(track) {
  const file = resolve(outDir, `${track.outId}.mp3`)
  if (!force) {
    try {
      if (statSync(file).size > 100_000) {
        console.log(`skip   ${track.outId} (exists)`)
        return
      }
    } catch {
      /* missing is the normal path */
    }
  }

  const seconds = manifest.seconds
  process.stdout.write(`render ${track.outId} (${seconds}s, seed ${track.seed})… `)
  const response = await fetchWithRetry(
    'https://api.elevenlabs.io/v1/music?output_format=mp3_48000_192',
    {
      method: 'POST',
      headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        composition_plan: { chunks: track.chunks },
        model_id: manifest.model,
        seed: track.seed,
        store_for_inpainting: true,
        sign_with_c2pa: false,
      }),
    },
    track.outId,
  )

  if (!response.ok) throw new Error(`${track.outId}: ${response.status} ${(await response.text()).slice(0, 600)}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.length < 100_000) throw new Error(`${track.outId}: suspiciously small response (${bytes.length} bytes)`)
  const tmp = `${file}.part`
  writeFileSync(tmp, bytes)
  renameSync(tmp, file)
  writeFileSync(
    resolve(outDir, `${track.outId}.json`),
    `${JSON.stringify({
      id: track.outId,
      seed: track.seed,
      songId: response.headers.get('song-id'),
      generatedAt: new Date().toISOString(),
      seconds,
    }, null, 2)}\n`,
  )
  console.log(`ok (${(bytes.length / 1024 / 1024).toFixed(1)} MB) song ${response.headers.get('song-id') || '?'}`)
}

let cursor = 0
let failed = false
async function worker() {
  while (cursor < queue.length) {
    const track = queue[cursor++]
    try {
      await render(track)
    } catch (err) {
      failed = true
      try { unlinkSync(resolve(outDir, `${track.outId}.mp3.part`)) } catch {}
      console.error(`FAILED ${String(err?.message ?? err)}`)
    }
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, worker))
if (failed) process.exitCode = 1
else console.log(`done — ${queue.length} track${queue.length === 1 ? '' : 's'} in public/music-v2/`)
