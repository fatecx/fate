/**
 * Prose-quality gate — the reader's law. Every player-facing string in the
 * game must read as connected sentences, the way a person tells a friend
 * what happened. Two mechanical rules, enforced forever:
 *   1. No semicolons in player-facing prose — split the sentence instead.
 *   2. No staccato: three or more consecutive narration sentences of seven
 *      words or fewer is machine rhythm. Dialogue (“quoted speech”) and
 *      ALL-CAPS machine-speak are exempt — humans and robots may punch.
 */
import { describe, expect, it } from 'vitest'
import { CONTENT } from '../src/content/world'
import { FILLERS, BLUR_FILLERS } from '../src/content/fillers'

const ABBR = /\b(Mrs|Mr|Ms|Dr|St|vs|Inc|No)\./g

function sentences(text: string): string[] {
  const t = text
    .replace(/“[^”]*”/g, ' ')
    .replace(/\b[A-Z][A-Z0-9’'\-&.]+(\s+[A-Z][A-Z0-9’'\-&.,]+)+/g, ' ')
    .replace(ABBR, (m) => m.replace('.', '\u2024'))
  return t
    .split(/\n+/)
    .flatMap((p) => p.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

function staccatoRun(text: string): boolean {
  let run = 0
  for (const s of sentences(text)) {
    const words = s.split(/\s+/).filter(Boolean).length
    run = words <= 7 ? run + 1 : 0
    if (run >= 3) return true
  }
  return false
}

function collect(): { where: string; text: string }[] {
  const out: { where: string; text: string }[] = []
  const add = (where: string, text?: string): void => {
    if (text) out.push({ where, text })
  }
  for (const ch of Object.values(CONTENT.chapters)) {
    for (const b of ch.prologue ?? []) add(`${ch.id}/prologue`, b.prose)
    for (const s of ch.scenes) {
      add(`${ch.id}/${s.id}.leadIn`, s.leadIn)
      add(`${ch.id}/${s.id}.prose`, s.prose)
      for (const b of s.screens ?? []) add(`${ch.id}/${s.id}.screen`, b.prose)
      s.choices.forEach((c, i) => add(`${ch.id}/${s.id}.result[${i}]`, c.result))
    }
    for (const e of ch.endings) {
      add(`${ch.id}/end:${e.id}.prose`, e.prose)
      for (const b of e.screens ?? []) add(`${ch.id}/end:${e.id}.screen`, b.prose)
      add(`${ch.id}/end:${e.id}.interlude`, e.interlude?.prose)
    }
  }
  for (const f of [...FILLERS, ...BLUR_FILLERS]) add(`filler/${f.id}`, f.text)
  for (const c of Object.values(CONTENT.characters)) {
    add(`cast/${c.id}.blurb`, c.blurb)
    add(`cast/${c.id}.trait`, c.hiddenTrait)
  }
  return out
}

describe('prose quality', () => {
  const all = collect()

  it('covers the whole corpus', () => {
    expect(all.length).toBeGreaterThan(300)
  })

  it('no semicolons anywhere in player-facing prose', () => {
    const hits = all.filter((x) => x.text.includes(';')).map((x) => x.where)
    expect(hits, hits.join(', ')).toEqual([])
  })

  it('no staccato: never three straight short narration sentences', () => {
    const hits = all.filter((x) => staccatoRun(x.text)).map((x) => x.where)
    expect(hits, hits.join(', ')).toEqual([])
  })
})
