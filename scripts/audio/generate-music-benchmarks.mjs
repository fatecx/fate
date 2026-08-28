/**
 * Render the high-bar Fate company-theme benchmark round with Eleven Music v2.
 *
 * All eight variants per composition use the same explicit musical plan and
 * different seeds, making comparisons honest. Raw renders stay local in
 * music/benchmark-renders; only curated selections are copied into public/.
 *
 *   node scripts/audio/generate-music-benchmarks.mjs
 *   node scripts/audio/generate-music-benchmarks.mjs --only=h_gravity_softened_v1
 *   node scripts/audio/generate-music-benchmarks.mjs --concurrency=2
 */
import { mkdirSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const manifest = JSON.parse(readFileSync(resolve(root, 'music/benchmarks.json'), 'utf8'))
const outDir = resolve(root, 'music/benchmark-renders')
mkdirSync(outDir, { recursive: true })

const key = process.env.ELEVENLABS_API_KEY
if (!key) {
  console.error('ELEVENLABS_API_KEY missing (source ~/.tokens)')
  process.exit(1)
}

const args = process.argv.slice(2)
const force = args.includes('--force')
const only = args.find((arg) => arg.startsWith('--only='))?.slice(7).split(',')
const concurrency = Math.max(1, Math.min(3, Number(args.find((arg) => arg.startsWith('--concurrency='))?.slice(14) ?? 2)))

const variants = manifest.compositions.flatMap((composition) =>
  Array.from({ length: manifest.variantsPerComposition }, (_, index) => ({
    composition,
    number: index + 1,
    id: `${composition.id}_v${index + 1}`,
    seed: composition.seedBase + index,
  })),
).filter((variant) => !only || only.includes(variant.id))

const planFor = (composition) => ({
  chunks: composition.sections.map((section, index) => ({
    // Music v2 treats prose in `text` like lyrics. Keep it to a section label;
    // all instrumental direction belongs in positive_styles.
    text: `[Instrumental ${section.name}]`,
    duration_ms: section.durationMs,
    positive_styles: [
      ...(index === 0 ? manifest.shared.production : manifest.shared.production.slice(2)),
      composition.key,
      composition.tempo,
      composition.meter,
      ...composition.palette,
      section.direction,
    ],
    negative_styles: manifest.shared.negativeStyles,
    context_adherence: index === 3 ? 'medium' : 'high',
  })),
})

const pause = (ms) => new Promise((resolvePause) => setTimeout(resolvePause, ms))

async function fetchWithRetry(url, options, id) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    const response = await fetch(url, options)
    if (response.ok || ![429, 500, 502, 503, 504].includes(response.status) || attempt === 4) return response
    const waitMs = Math.min(10_000, 1500 * 2 ** (attempt - 1))
    console.warn(`\nretry  ${id} after ${response.status} (${waitMs / 1000}s)`)
    await pause(waitMs)
  }
}

async function render(variant) {
  const file = resolve(outDir, `${variant.id}.mp3`)
  if (!force) {
    try {
      if (statSync(file).size > 100_000) {
        console.log(`skip   ${variant.id} (exists)`)
        return
      }
    } catch {
      // Missing is the normal path.
    }
  }

  process.stdout.write(`render ${variant.id} (${manifest.seconds}s, seed ${variant.seed})… `)
  const response = await fetchWithRetry('https://api.elevenlabs.io/v1/music?output_format=mp3_48000_192', {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      composition_plan: planFor(variant.composition),
      model_id: manifest.model,
      seed: variant.seed,
      store_for_inpainting: true,
      sign_with_c2pa: false,
    }),
  }, variant.id)

  if (!response.ok) throw new Error(`${variant.id}: ${response.status} ${(await response.text()).slice(0, 500)}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.length < 100_000) throw new Error(`${variant.id}: suspiciously small response (${bytes.length} bytes)`)
  const tmp = `${file}.part`
  writeFileSync(tmp, bytes)
  renameSync(tmp, file)
  writeFileSync(resolve(outDir, `${variant.id}.json`), `${JSON.stringify({
    id: variant.id,
    composition: variant.composition.id,
    variant: variant.number,
    seed: variant.seed,
    songId: response.headers.get('song-id'),
    generatedAt: new Date().toISOString(),
    compositionPlan: planFor(variant.composition),
  }, null, 2)}\n`)
  console.log(`ok (${(bytes.length / 1024 / 1024).toFixed(1)} MB)`)
}

let cursor = 0
let failed = false
async function worker() {
  while (cursor < variants.length) {
    const variant = variants[cursor++]
    try {
      await render(variant)
    } catch (error) {
      failed = true
      try { unlinkSync(resolve(outDir, `${variant.id}.mp3.part`)) } catch {}
      console.error(`FAILED ${String(error?.message ?? error)}`)
    }
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, variants.length) }, worker))
if (failed) process.exitCode = 1
else console.log(`done — ${variants.length} structured benchmark render${variants.length === 1 ? '' : 's'} ready in music/benchmark-renders/`)
