/**
 * Phone-weight prints for the landing's art wall.
 *
 * The landing backgrounds are the full-size wides (300–700 KB each) — fine on
 * broadband, molasses on cellular. This renders every frame in LANDING_ART to
 * public/artsm/<id>.webp at 900px wide, q70 (~60–110 KB); the landing picks
 * the small print on narrow viewports and falls back to the full frame when a
 * small one is missing. Rerun after changing LANDING_ART:
 *
 *   npx tsx scripts/art/landing-sm.ts
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { LANDING_ART } from '../../src/content/landing'

const OUT = 'public/artsm'
mkdirSync(OUT, { recursive: true })

let made = 0
for (const id of [...new Set(LANDING_ART)]) {
  const src = `public/art/${id}.webp`
  const dst = join(OUT, `${id}.webp`)
  if (!existsSync(src)) {
    console.warn(`MISSING SOURCE ${src}`)
    continue
  }
  if (existsSync(dst) && statSync(dst).mtimeMs >= statSync(src).mtimeMs) continue
  const png = join(tmpdir(), `fate-sm-${id}.png`)
  execFileSync('dwebp', [src, '-o', png], { stdio: 'pipe' })
  execFileSync('cwebp', ['-q', '70', '-resize', '900', '0', png, '-o', dst], { stdio: 'pipe' })
  made++
  console.log(`${dst} ← ${src} (${(statSync(dst).size / 1024).toFixed(0)} KB)`)
}
console.log(`${made} small prints rendered → ${OUT}/`)
