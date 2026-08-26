/**
 * The mixing pass — normalizes committed beds to class loudness targets so
 * lane gains stay artistic offsets, not compensation. ffmpeg loudnorm, in
 * place. Run after generate.mjs whenever new audio lands.
 *
 *   node scripts/audio/mix.mjs
 *
 * Targets (integrated LUFS): rooms sit just under the ear line so chatter
 * reads OVER the music; music stays where the owner approved it; foley and
 * stingers are transients and get presence.
 */
import { execSync } from 'node:child_process'
import { readdirSync, renameSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '../../public/sfx')

const TARGETS = [
  { prefix: 'amb_', I: -30 },
  { prefix: 'scn_', I: -30 },
  { prefix: 'fol_', I: -19 },
  { prefix: 'sting_', I: -16 },
  { prefix: 'mus_', I: -17 },
]

for (const f of readdirSync(dir).filter((f) => f.endsWith('.mp3'))) {
  const t = TARGETS.find((t) => f.startsWith(t.prefix))
  if (!t) {
    console.log(`keep   ${f}`)
    continue
  }
  const src = resolve(dir, f)
  const tmp = resolve(dir, `.${f}.tmp.mp3`)
  process.stdout.write(`mix    ${f} -> ${t.I} LUFS… `)
  execSync(
    `ffmpeg -y -hide_banner -loglevel error -i "${src}" -af loudnorm=I=${t.I}:TP=-1.5:LRA=11 -ar 44100 -b:a 128k "${tmp}"`,
  )
  renameSync(tmp, src)
  console.log('ok')
}
console.log('mix done')
