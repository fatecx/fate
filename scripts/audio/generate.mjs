/**
 * Renders the soundscape registry to public/sfx/*.mp3 via the ElevenLabs
 * sound-generation endpoint. Idempotent: existing files are skipped, so this
 * is safe to re-run as new beds are authored. Requires ELEVENLABS_API_KEY.
 *
 *   node scripts/audio/generate.mjs            # render missing
 *   node scripts/audio/generate.mjs --only=amb_cafe,mus_war
 *   node scripts/audio/generate.mjs --force    # re-render everything
 */
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const outDir = resolve(root, 'public/sfx')
mkdirSync(outDir, { recursive: true })

// The registry is TS; bundle it to a temp module and import the data.
const tmp = '/tmp/fate-sound-registry.mjs'
execSync(
  `npx esbuild ${resolve(root, 'src/content/sound.ts')} --bundle --platform=node --format=esm --outfile=${tmp}`,
  { stdio: 'pipe' },
)
const { AMBIENCE, MOODS, TENSION, STINGERS, FOLEY, SCENE_BEDS } = await import(tmp)

const KEY = process.env.ELEVENLABS_API_KEY
if (!KEY) {
  console.error('ELEVENLABS_API_KEY missing (source ~/.tokens)')
  process.exit(1)
}

const args = process.argv.slice(2)
const force = args.includes('--force')
const only = args.find((a) => a.startsWith('--only='))?.slice(7).split(',')

const defs = [
  ...Object.values(AMBIENCE).map((d) => ({ ...d, loop: true, seconds: d.seconds ?? 22 })),
  ...Object.values(MOODS).flatMap((d) => {
    if (d.source === 'music') return [] // picture scores — generate-music-v2.mjs
    const takes = [{ ...d, loop: true, seconds: d.seconds ?? 26 }]
    for (let n = 2; n <= (d.takes ?? 1); n++) {
      takes.push({ ...d, id: `${d.id}_${n}`, loop: true, seconds: d.seconds ?? 26 })
    }
    return takes
  }),
  { ...TENSION, loop: true, seconds: TENSION.seconds ?? 22 },
  ...Object.values(STINGERS).map((d) => ({ ...d, loop: false, seconds: d.seconds ?? 6 })),
  ...Object.values(FOLEY).map((d) => ({ ...d, loop: false, seconds: d.seconds ?? 4 })),
  ...Object.values(SCENE_BEDS).map((d) => ({ ...d, loop: false, seconds: d.seconds ?? 4 })),
]

let rendered = 0
for (const d of defs) {
  if (only && !only.includes(d.id)) continue
  const file = resolve(outDir, `${d.id}.mp3`)
  if (!force && existsSync(file) && statSync(file).size > 10_000) {
    console.log(`skip   ${d.id} (exists)`)
    continue
  }
  process.stdout.write(`render ${d.id} (${d.seconds}s${d.loop ? ', loop' : ''})… `)
  const res = await fetch('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128', {
    method: 'POST',
    headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: d.prompt,
      duration_seconds: Math.min(30, d.seconds),
      prompt_influence: 0.4,
      loop: d.loop,
    }),
  })
  if (!res.ok) {
    console.log(`FAILED ${res.status}: ${(await res.text()).slice(0, 200)}`)
    continue
  }
  writeFileSync(file, Buffer.from(await res.arrayBuffer()))
  rendered += 1
  console.log(`ok (${Math.round(statSync(file).size / 1024)}kB)`)
  await new Promise((r) => setTimeout(r, 800)) // gentle on the API
}
console.log(`\ndone — ${rendered} rendered into public/sfx/`)
