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
import { AMBIENCE, FOLEY, MOODS, SCENE_BEDS, STINGERS, TENSION } from '../src/content/sound'

describe('soundscape', () => {
  it('every non-cutscene scene in authored chapters names a room from the registry', () => {
    for (const chId of ['hyperchute', 'teleport'] as const) {
      for (const s of CONTENT.chapters[chId].scenes) {
        if ((s.kind ?? 'scene') === 'cutscene') continue
        expect(s.ambience, `${chId}/${s.id}: missing ambience`).toBeDefined()
        expect(AMBIENCE[s.ambience!], `${chId}/${s.id}: unknown room '${s.ambience}'`).toBeDefined()
      }
    }
  })

  it('every non-cutscene hyperchute scene has its own bespoke bed', () => {
    for (const s of CONTENT.chapters.hyperchute.scenes) {
      if ((s.kind ?? 'scene') === 'cutscene') continue
      const bed = SCENE_BEDS[s.id]
      expect(bed, `hyperchute/${s.id}: missing scene bed in soundscape.ts`).toBeDefined()
      expect(bed.id, `hyperchute/${s.id}: bed id convention`).toBe(`scn_${s.id}`)
      expect(bed.prompt.length, `hyperchute/${s.id}: bed prompt too thin`).toBeGreaterThan(80)
    }
  })

  it('landmark mood overrides are valid and rare — the score holds between them', () => {
    const scored = CONTENT.chapters.hyperchute.scenes.filter((s) => s.mood)
    for (const s of scored) {
      expect(MOODS[s.mood!], `hyperchute/${s.id}: unknown mood '${s.mood}'`).toBeDefined()
    }
    // Music moves on drama, not on every beat: overrides stay a small set.
    expect(scored.length).toBeGreaterThan(6)
    expect(scored.length).toBeLessThan(24)
  })

  it('every bg and foley reference points into the registry', () => {
    for (const ch of Object.values(CONTENT.chapters)) {
      for (const p of ch.prologue ?? []) {
        if (p.bg) expect(AMBIENCE[p.bg], `${ch.id} prologue bg '${p.bg}'`).toBeDefined()
      }
      for (const e of ch.endings) {
        for (const p of e.screens ?? []) {
          if (p.bg) expect(AMBIENCE[p.bg], `${ch.id}/${e.id} screen bg '${p.bg}'`).toBeDefined()
        }
        if (e.interlude?.bg) expect(AMBIENCE[e.interlude.bg], `${ch.id}/${e.id} interlude bg`).toBeDefined()
      }
      for (const s of ch.scenes) {
        if (s.ambience) expect(AMBIENCE[s.ambience], `${ch.id}/${s.id} ambience`).toBeDefined()
        if (s.accent) expect(AMBIENCE[s.accent], `${ch.id}/${s.id} accent '${s.accent}'`).toBeDefined()
        if (s.accent) expect(s.accent, `${ch.id}/${s.id}: accent may not double the room`).not.toBe(s.ambience)
        if (s.mood) expect(MOODS[s.mood], `${ch.id}/${s.id} mood '${s.mood}'`).toBeDefined()
        if (s.foley) expect(FOLEY[s.foley], `${ch.id}/${s.id} foley '${s.foley}'`).toBeDefined()
        for (const p of s.screens ?? []) {
          if (p.bg) expect(AMBIENCE[p.bg], `${ch.id}/${s.id} screen bg '${p.bg}'`).toBeDefined()
        }
        for (const c of s.choices) {
          if (c.foley) expect(FOLEY[c.foley], `${ch.id}/${s.id} choice foley '${c.foley}'`).toBeDefined()
        }
      }
    }
  })

  it('registry ids are unique across decks', () => {
    const ids = [
      ...Object.values(AMBIENCE).map((d) => d.id),
      ...Object.values(MOODS).map((d) => d.id),
      TENSION.id,
      ...Object.values(STINGERS).map((d) => d.id),
      ...Object.values(FOLEY).map((d) => d.id),
      ...Object.values(SCENE_BEDS).map((d) => d.id),
    ]
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every registry entry has its rendered file committed', () => {
    const defs = [
      ...Object.values(AMBIENCE),
      ...Object.values(MOODS),
      TENSION,
      ...Object.values(STINGERS),
      ...Object.values(FOLEY),
      ...Object.values(SCENE_BEDS),
    ]
    const files = defs.map((d) => d.id)
    for (const d of Object.values(MOODS)) {
      for (let n = 2; n <= (d.takes ?? 1); n++) files.push(`${d.id}_${n}`)
    }
    for (const id of files) {
      const p = resolve(__dirname, `../public/sfx/${id}.mp3`)
      expect(existsSync(p), `public/sfx/${id}.mp3 missing — run scripts/audio/generate.mjs`).toBe(true)
    }
  })

  it('lane gains stay inside the mix ceiling', () => {
    const defs = [
      ...Object.values(AMBIENCE),
      ...Object.values(MOODS),
      TENSION,
      ...Object.values(STINGERS),
      ...Object.values(FOLEY),
    ]
    for (const d of defs) {
      expect(d.gain, d.id).toBeGreaterThan(0)
      expect(d.gain, d.id).toBeLessThanOrEqual(0.65)
    }
  })
})
