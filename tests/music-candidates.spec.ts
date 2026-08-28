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

  it('review data is valid and candidates remain outside the runtime score', () => {
    const candidateIds = new Set(manifest.candidates.map((c) => c.id))
    for (const [id, status] of Object.entries(review.decisions)) {
      expect(candidateIds.has(id), `review for unknown candidate '${id}'`).toBe(true)
      expect(['approved', 'rejected'], id).toContain(status)
    }
    const runtimeIds = new Set([...Object.values(MOODS).map((m) => m.id), TENSION.id])
    for (const id of candidateIds) expect(runtimeIds.has(id), `${id} leaked into runtime`).toBe(false)
  })
})
