/**
 * The audition room is deliberately one-way: candidates can be generated and
 * reviewed, but cannot enter gameplay merely by existing or being approved.
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { CONTENT } from '../src/content/world'
import { MOODS, TENSION } from '../src/content/sound'

const manifest = JSON.parse(readFileSync(resolve(__dirname, '../music/candidates.json'), 'utf8')) as {
  model: string
  seconds: number
  candidates: Array<{
    id: string
    title: string
    chapter: string
    role: string
    art: string
    scenes: string[]
    prompt: string
    seconds?: number
  }>
}
const benchmarks = JSON.parse(readFileSync(resolve(__dirname, '../music/benchmarks.json'), 'utf8')) as {
  model: string
  seconds: number
  variantsPerComposition: number
  shared: { motif: string; negativeStyles: string[] }
  compositions: Array<{
    id: string
    title: string
    chapter: string
    role: string
    level: string
    art: string
    scenes: string[]
    seedBase: number
    sections: Array<{ name: string; durationMs: number; direction: string }>
  }>
  curated: Array<{
    id: string
    composition: string
    variant: number
    seed: number
    score: number
    metrics: {
      introDelay: number
      lowBandDelta: number
      medianCentroid: number
      sectionCentroidRangeRatio: number
      integratedLufs: number
      loudnessRange: number
      loudnessSurge: number
    }
  }>
}
const directions = JSON.parse(readFileSync(resolve(__dirname, '../music/directions.json'), 'utf8')) as {
  model: string
  seconds: number
  variantsPerComposition: number
  shared: { negativeStyles: string[] }
  compositions: Array<{
    id: string
    title: string
    chapter: string
    level: string
    art: string
    moments: string[]
    seedBase: number
    sections: Array<{ name: string; durationMs: number; direction: string }>
  }>
  curated: Array<{
    id: string
    composition: string
    variant: number
    seed: number
    score: number
    metrics: {
      introDelay: number
      lowBandDelta: number
      sectionCentroidRangeRatio: number
      loudnessSurge: number
    }
  }>
}
const v2 = JSON.parse(readFileSync(resolve(__dirname, '../music/v2.json'), 'utf8')) as {
  model: string
  seconds: number
  label: string
  tracks: Array<{
    id: string
    title: string
    chapter: string
    role: string
    level: string
    art: string
    moments: string[]
    note: string
    chunks: Array<{ text: string; duration_ms: number; positive_styles: string[] }>
  }>
}
const review = JSON.parse(readFileSync(resolve(__dirname, '../music/review.json'), 'utf8')) as {
  decisions: Record<string, string>
}

describe('music auditions', () => {
  it('has four restrained candidates for each authored company', () => {
    expect(manifest.model).toBe('music_v2')
    expect(manifest.candidates).toHaveLength(12)
    for (const chapter of ['HYPERCHUTE', 'TELEPORT', 'SKYLINE']) {
      expect(manifest.candidates.filter((c) => c.chapter === chapter), chapter).toHaveLength(4)
    }
    expect(new Set(manifest.candidates.map((c) => c.id)).size).toBe(manifest.candidates.length)
    for (const candidate of manifest.candidates) {
      expect(candidate.prompt.toLowerCase(), `${candidate.id}: reading constraint`).toContain('text-heavy')
      expect(candidate.prompt.toLowerCase(), `${candidate.id}: instrumental constraint`).toContain('no vocals')
      expect(candidate.seconds ?? manifest.seconds, candidate.id).toBeGreaterThanOrEqual(60)
      expect(candidate.seconds ?? manifest.seconds, candidate.id).toBeLessThanOrEqual(120)
    }
  })

  it('every candidate points to real art, story beats, and a rendered MP3', () => {
    for (const candidate of manifest.candidates) {
      const chapter = CONTENT.chapters[candidate.chapter.toLowerCase() as keyof typeof CONTENT.chapters]
      expect(chapter, `${candidate.id}: unknown chapter`).toBeDefined()
      expect(existsSync(resolve(__dirname, `../public/art/${candidate.art}.webp`)), `${candidate.id}: art`).toBe(true)
      for (const scene of candidate.scenes) {
        const exists = scene.startsWith('end:')
          ? chapter.endings.some((e) => e.id === scene.slice(4))
          : chapter.scenes.some((s) => s.id === scene)
        expect(exists, `${candidate.id}: unknown beat '${scene}'`).toBe(true)
      }
      const file = resolve(__dirname, `../public/music-candidates/${candidate.id}.mp3`)
      expect(existsSync(file), `${candidate.id}: render missing`).toBe(true)
      expect(statSync(file).size, `${candidate.id}: render suspiciously small`).toBeGreaterThan(100_000)
    }
  })

  it('has one structured benchmark composition and one curated render per company', () => {
    expect(benchmarks.model).toBe('music_v2')
    expect(benchmarks.seconds).toBe(90)
    expect(benchmarks.variantsPerComposition).toBe(8)
    expect(benchmarks.compositions).toHaveLength(3)
    expect(benchmarks.curated).toHaveLength(3)
    expect(benchmarks.shared.motif).toContain('1, flat 3, 5, 4')
    expect(benchmarks.shared.negativeStyles).toEqual(expect.arrayContaining([
      'long fade-in',
      'static drone',
      'sub-bass rumble',
      'monotonous repetition',
    ]))

    const compositionIds = new Set(benchmarks.compositions.map((composition) => composition.id))
    expect(compositionIds.size).toBe(3)
    expect(new Set(benchmarks.compositions.map((composition) => composition.chapter))).toEqual(
      new Set(['HYPERCHUTE', 'TELEPORT', 'SKYLINE']),
    )
    for (const composition of benchmarks.compositions) {
      expect(composition.sections).toHaveLength(6)
      expect(composition.sections.reduce((total, section) => total + section.durationMs, 0)).toBe(90_000)
      expect(composition.sections[0].durationMs).toBe(6_000)
      for (const section of composition.sections) {
        expect(section.durationMs).toBeGreaterThanOrEqual(3_000)
        expect(section.direction.length).toBeGreaterThan(40)
      }
    }

    expect(new Set(benchmarks.curated.map((selection) => selection.composition))).toEqual(compositionIds)
    for (const selection of benchmarks.curated) {
      const composition = benchmarks.compositions.find((candidate) => candidate.id === selection.composition)!
      expect(selection.variant).toBeGreaterThanOrEqual(1)
      expect(selection.variant).toBeLessThanOrEqual(benchmarks.variantsPerComposition)
      expect(selection.seed).toBe(composition.seedBase + selection.variant - 1)
      expect(selection.score).toBeGreaterThanOrEqual(80)
      expect(selection.metrics.introDelay).toBeLessThanOrEqual(1)
      expect(selection.metrics.lowBandDelta).toBeLessThanOrEqual(-3)
      expect(selection.metrics.medianCentroid).toBeGreaterThanOrEqual(350)
      expect(selection.metrics.loudnessSurge).toBeLessThanOrEqual(12)
      const file = resolve(__dirname, `../public/music-benchmarks/${selection.id}.mp3`)
      expect(existsSync(file), `${selection.id}: curated render missing`).toBe(true)
      expect(statSync(file).size, `${selection.id}: curated render suspiciously small`).toBeGreaterThan(100_000)
    }
  })

  it('has three distinct short-form direction tests selected from twelve renders', () => {
    expect(directions.model).toBe('music_v2')
    expect(directions.seconds).toBe(60)
    expect(directions.variantsPerComposition).toBe(4)
    expect(directions.compositions).toHaveLength(3)
    expect(directions.curated).toHaveLength(3)
    expect(new Set(directions.compositions.map((composition) => composition.level))).toEqual(
      new Set(['ORCHESTRA + ORGAN', 'ANALOG SYNTH NOIR', 'ORCHESTRAL–ANALOG HYBRID']),
    )
    expect(directions.shared.negativeStyles).toEqual(expect.arrayContaining([
      'long fade-in',
      'low buzzing hum',
      'unchanged four-bar loop',
      'monotonous repetition',
    ]))

    const compositionIds = new Set(directions.compositions.map((composition) => composition.id))
    expect(compositionIds.size).toBe(3)
    for (const composition of directions.compositions) {
      expect(existsSync(resolve(__dirname, `../public/art/${composition.art}.webp`)), `${composition.id}: art`).toBe(true)
      expect(composition.moments.length).toBeGreaterThanOrEqual(3)
      expect(composition.sections).toHaveLength(5)
      expect(composition.sections.reduce((total, section) => total + section.durationMs, 0)).toBe(60_000)
      expect(composition.sections[0].durationMs).toBe(4_000)
    }

    expect(new Set(directions.curated.map((selection) => selection.composition))).toEqual(compositionIds)
    for (const selection of directions.curated) {
      const composition = directions.compositions.find((candidate) => candidate.id === selection.composition)!
      expect(selection.variant).toBeGreaterThanOrEqual(1)
      expect(selection.variant).toBeLessThanOrEqual(directions.variantsPerComposition)
      expect(selection.seed).toBe(composition.seedBase + selection.variant - 1)
      expect(selection.score).toBeGreaterThanOrEqual(80)
      expect(selection.metrics.introDelay).toBeLessThanOrEqual(2)
      expect(selection.metrics.lowBandDelta).toBeLessThanOrEqual(-3)
      expect(selection.metrics.sectionCentroidRangeRatio).toBeGreaterThanOrEqual(0.4)
      expect(selection.metrics.loudnessSurge).toBeLessThanOrEqual(12)
      const file = resolve(__dirname, `../public/music-directions/${selection.id}.mp3`)
      expect(existsSync(file), `${selection.id}: curated render missing`).toBe(true)
      expect(statSync(file).size, `${selection.id}: render suspiciously small`).toBeGreaterThan(100_000)
    }
  })

  it('has three isolated MUSIC 2.0 scores that do not overwrite earlier auditions', () => {
    expect(v2.model).toBe('music_v2')
    expect(v2.seconds).toBe(90)
    expect(v2.label).toBe('MUSIC 2.0')
    expect(v2.tracks.length).toBeGreaterThanOrEqual(7)
    expect(new Set(v2.tracks.map((t) => t.chapter))).toEqual(new Set(['HYPERCHUTE', 'TELEPORT', 'SKYLINE']))
    for (const id of ['v2_night_run', 'v2_hold', 'v2_latency', 'v2_richmond', 'v2_eleven', 'v2_first_walk']) {
      expect(v2.tracks.map((t) => t.id), id).toContain(id)
    }
    const earlier = new Set([
      ...manifest.candidates.map((c) => c.id),
      ...benchmarks.curated.map((c) => c.id),
      ...directions.curated.map((c) => c.id),
    ])
    for (const track of v2.tracks) {
      expect(track.id.startsWith('v2_'), track.id).toBe(true)
      expect(earlier.has(track.id), `${track.id} collides with a Codex audition id`).toBe(false)
      expect(track.level).toBe('MUSIC 2.0')
      expect(track.chunks.length, track.id).toBeGreaterThanOrEqual(4)
      expect(track.chunks.reduce((n, c) => n + c.duration_ms, 0), track.id).toBe(90_000)
      expect(existsSync(resolve(__dirname, `../public/art/${track.art}.webp`)), `${track.id}: art`).toBe(true)
      expect(track.moments.length, track.id).toBeGreaterThanOrEqual(3)
      const file = resolve(__dirname, `../public/music-v2/${track.id}.mp3`)
      expect(existsSync(file), `${track.id}: render missing`).toBe(true)
      expect(statSync(file).size, `${track.id}: render suspiciously small`).toBeGreaterThan(100_000)
    }
  })

  it('review data is valid and candidates remain outside the runtime score', () => {
    const candidateIds = new Set([
      ...manifest.candidates.map((c) => c.id),
      ...benchmarks.curated.map((c) => c.id),
      ...directions.curated.map((c) => c.id),
      ...v2.tracks.map((c) => c.id),
    ])
    for (const [id, status] of Object.entries(review.decisions)) {
      expect(candidateIds.has(id), `review for unknown candidate '${id}'`).toBe(true)
      expect(['approved', 'rejected'], id).toContain(status)
    }
    const runtimeIds = new Set([...Object.values(MOODS).map((m) => m.id), TENSION.id])
    for (const id of candidateIds) expect(runtimeIds.has(id), `${id} leaked into runtime`).toBe(false)
  })
})
