/**
 * Soundscape integrity — rooms are content, and content is law. Every
 * non-cutscene Hyperchute scene names a room that exists in the registry;
 * every registry entry has its rendered file committed, so a deploy can
 * never ship a silent room by accident.
 */
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { CONTENT } from '../src/content/world'
import { AMBIENCE, MOODS, STINGERS, TENSION } from '../src/content/sound'

describe('soundscape', () => {
  it('every non-cutscene hyperchute scene names a room from the registry', () => {
    for (const s of CONTENT.chapters.hyperchute.scenes) {
      if ((s.kind ?? 'scene') === 'cutscene') continue
      expect(s.ambience, `hyperchute/${s.id}: missing ambience`).toBeDefined()
      expect(AMBIENCE[s.ambience!], `hyperchute/${s.id}: unknown room '${s.ambience}'`).toBeDefined()
    }
  })

  it('registry ids are unique across decks', () => {
    const ids = [
      ...Object.values(AMBIENCE).map((d) => d.id),
      ...Object.values(MOODS).map((d) => d.id),
      TENSION.id,
      ...Object.values(STINGERS).map((d) => d.id),
    ]
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every registry entry has its rendered file committed', () => {
    const defs = [...Object.values(AMBIENCE), ...Object.values(MOODS), TENSION, ...Object.values(STINGERS)]
    for (const d of defs) {
      const p = resolve(__dirname, `../public/sfx/${d.id}.mp3`)
      expect(existsSync(p), `public/sfx/${d.id}.mp3 missing — run scripts/audio/generate.mjs`).toBe(true)
    }
  })

  it('lane gains stay inside the mix ceiling', () => {
    const defs = [...Object.values(AMBIENCE), ...Object.values(MOODS), TENSION, ...Object.values(STINGERS)]
    for (const d of defs) {
      expect(d.gain, d.id).toBeGreaterThan(0)
      expect(d.gain, d.id).toBeLessThanOrEqual(0.65)
    }
  })
})
