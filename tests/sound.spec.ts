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
import { takeIndex } from '../src/app/audio'

describe('soundscape', () => {
  it('every non-cutscene scene in authored chapters names a room from the registry', () => {
    for (const chId of ['hyperchute', 'teleport', 'skyline'] as const) {
      for (const s of CONTENT.chapters[chId].scenes) {
        if ((s.kind ?? 'scene') === 'cutscene') continue
        expect(s.ambience, `${chId}/${s.id}: missing ambience`).toBeDefined()
        expect(AMBIENCE[s.ambience!], `${chId}/${s.id}: unknown room '${s.ambience}'`).toBeDefined()
      }
    }
  })

  it('every non-cutscene scene in authored chapters has its own bespoke sound event', () => {
    // Skyline joins this law when the audio quota renews and its beds render.
    for (const chId of ['hyperchute', 'teleport'] as const) {
      for (const s of CONTENT.chapters[chId].scenes) {
        if ((s.kind ?? 'scene') === 'cutscene') continue
        const bed = SCENE_BEDS[s.id]
        expect(bed, `${chId}/${s.id}: missing scene sound in soundscape.ts`).toBeDefined()
        expect(bed.id, `${chId}/${s.id}: sound id convention`).toBe(`scn_${s.id}`)
        expect(bed.prompt.length, `${chId}/${s.id}: sound prompt too thin`).toBeGreaterThan(80)
      }
    }
  })

  it('chapter eras name real moods', () => {
    for (const ch of Object.values(CONTENT.chapters)) {
      for (const era of ch.eras ?? []) {
        expect(MOODS[era.mood], `${ch.id}: era mood '${era.mood}'`).toBeDefined()
      }
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

  it('picture scores are film cues with committed files and no SFX takes', () => {
    const ids = ['night_run', 'hold', 'latency', 'richmond', 'eleven', 'first_walk', 'ring'] as const
    for (const id of ids) {
      const def = MOODS[id]
      expect(def, id).toBeDefined()
      expect(def.film, id).toBe(true)
      expect(def.source, id).toBe('music')
      expect(def.takes ?? 1, id).toBe(1)
      expect(existsSync(resolve(__dirname, `../public/sfx/${def.id}.mp3`)), `${def.id}.mp3`).toBe(true)
    }
    expect(MOODS.film.film).toBe(true)
  })

  it('assigns picture scores to prologues, cutscenes, and ending films', () => {
    expect(CONTENT.chapters.hyperchute.score).toBe('night_run')
    expect(CONTENT.chapters.teleport.score).toBe('latency')
    expect(CONTENT.chapters.skyline.score).toBe('hold')
    expect(CONTENT.chapters.hyperchute.endings.find((e) => e.id === 'triumph_ipo')?.score).toBe('night_run')
    expect(CONTENT.chapters.teleport.endings.find((e) => e.id === 'listing')?.score).toBe('latency')
    expect(CONTENT.chapters.skyline.endings.find((e) => e.id === 'ascent')?.score).toBe('hold')
    const assigned: Record<string, string> = {
      h_bridge_y2: 'night_run',
      h_cut_meridian_ipo: 'night_run',
      h_bridge_pre_act3: 'night_run',
      h_cut_accident: 'richmond',
      t_cut_first_light: 'ring',
      t_bridge_y3: 'latency',
      t_father_death: 'latency',
      t_father_death_seen: 'latency',
      t_first_walk: 'first_walk',
      t_jonah: 'eleven',
      s_cut_year_two: 'hold',
      s_cut_flag: 'hold',
    }
    for (const ch of Object.values(CONTENT.chapters)) {
      for (const s of ch.scenes) {
        if ((s.kind ?? 'scene') !== 'cutscene') continue
        const want = assigned[s.id]
        if (!want) continue
        expect(s.mood, s.id).toBe(want)
        expect(MOODS[want]?.film, `${s.id} → ${want}`).toBe(true)
      }
    }
  })

  it('music takes are a pure function of the scene id', () => {
    expect(takeIndex('h_seedling', 6)).toBe(takeIndex('h_seedling', 6))
    expect(takeIndex('h_seedling', 6)).not.toBe(takeIndex('t_entry', 6))
    expect(takeIndex('h_seedling', 1)).toBe(1)
    for (const id of ['h_seedling', 't_jonah', 's_entry', 'film']) {
      const n = takeIndex(id, 6)
      expect(n).toBeGreaterThanOrEqual(1)
      expect(n).toBeLessThanOrEqual(6)
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
