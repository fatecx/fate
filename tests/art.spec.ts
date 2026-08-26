/**
 * Art coverage gate — every surface the player sees carries an image.
 * The renderer never blocks on missing art (sigils hold the frame), but
 * SHIPPING without a frame is a content bug. Two laws, enforced forever:
 *   1. Every referenced art id resolves to a file in public/art/.
 *   2. Every scene, bridge, cutscene screen, prologue beat, ending, and
 *      interlude has SOME image: its own art, or a speaker whose portrait
 *      file exists.
 */
import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { CONTENT } from '../src/content/world'

const ART = join(__dirname, '..', 'public', 'art')
const has = (id?: string): boolean => !!id && existsSync(join(ART, `${id}.webp`))

describe('art coverage', () => {
  it('every referenced art id has a file', () => {
    const missing: string[] = []
    for (const ch of Object.values(CONTENT.chapters)) {
      for (const [i, p] of (ch.prologue ?? []).entries())
        if (p.art && !has(p.art)) missing.push(`${ch.id}/prologue[${i}]:${p.art}`)
      for (const s of ch.scenes) {
        if (s.art && !has(s.art)) missing.push(`${ch.id}/${s.id}:${s.art}`)
        for (const [i, p] of (s.screens ?? []).entries())
          if (p.art && !has(p.art)) missing.push(`${ch.id}/${s.id}.screen[${i}]:${p.art}`)
        for (const [i, v] of (s.vary ?? []).entries())
          if (v.art && !has(v.art)) missing.push(`${ch.id}/${s.id}.vary[${i}]:${v.art}`)
      }
      for (const e of ch.endings) {
        if (e.art && !has(e.art)) missing.push(`${ch.id}/end:${e.id}:${e.art}`)
        if (e.interlude?.art && !has(e.interlude.art)) missing.push(`${ch.id}/end:${e.id}.interlude:${e.interlude.art}`)
        for (const [i, p] of (e.screens ?? []).entries())
          if (p.art && !has(p.art)) missing.push(`${ch.id}/end:${e.id}.screen[${i}]:${p.art}`)
      }
    }
    expect(missing, missing.join(', ')).toEqual([])
  })

  it('no surface ships imageless', () => {
    const bare: string[] = []
    for (const ch of Object.values(CONTENT.chapters)) {
      for (const [i, p] of (ch.prologue ?? []).entries()) if (!p.art) bare.push(`${ch.id}/prologue[${i}]`)
      for (const s of ch.scenes) {
        for (const [i, p] of (s.screens ?? []).entries()) if (!p.art) bare.push(`${ch.id}/${s.id}.screen[${i}]`)
        if (!s.art && !s.screens && !has(s.speaker)) bare.push(`${ch.id}/${s.id}`)
      }
      for (const e of ch.endings) {
        if (!e.art) bare.push(`${ch.id}/end:${e.id}`)
        if (e.interlude && !e.interlude.art) bare.push(`${ch.id}/end:${e.id}.interlude`)
      }
    }
    expect(bare, bare.join(', ')).toEqual([])
  })
})
