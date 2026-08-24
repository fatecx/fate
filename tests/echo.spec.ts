/**
 * Anti-echo lint — bridges and lead-ins must continue the story, never
 * restate it. Fails when a choice's result shares a long word-run with the
 * scene it leads into, or a scene's leadIn overlaps its own prose.
 */
import { describe, expect, it } from 'vitest'
import { CONTENT } from '../src/content/world'
import { COMPANY_ORDER } from '../src/engine/types'

const SHINGLE = 5

/** Entity names and fixed world terms — repetition of a proper noun is not an echo. */
const ALLOW = new Set(['the office of aerial corridors', 'office of aerial corridors the'])

function shingles(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  const out = new Set<string>()
  for (let i = 0; i + SHINGLE <= words.length; i++) out.add(words.slice(i, i + SHINGLE).join(' '))
  return out
}

function overlap(a: string, b: string): string | null {
  const sa = shingles(a)
  for (const s of shingles(b)) if (sa.has(s) && !ALLOW.has(s)) return s
  return null
}

describe('anti-echo', () => {
  it('choice results never repeat the scene they lead into', () => {
    for (const chId of COMPANY_ORDER) {
      const ch = CONTENT.chapters[chId]
      const byId = new Map(ch.scenes.map((s) => [s.id, s]))
      for (const s of ch.scenes) {
        for (const c of s.choices) {
          if (!c.result || !c.goto) continue
          const target = byId.get(c.goto)
          if (!target) continue
          const hit = overlap(c.result, `${target.leadIn ?? ''} ${target.prose}`)
          expect(hit, `${chId}/${s.id} result echoes ${c.goto}: "${hit}"`).toBeNull()
        }
      }
    }
  })

  it('lead-ins never repeat their own prose', () => {
    for (const chId of COMPANY_ORDER) {
      for (const s of CONTENT.chapters[chId].scenes) {
        if (!s.leadIn) continue
        const hit = overlap(s.leadIn, s.prose)
        expect(hit, `${chId}/${s.id} leadIn echoes prose: "${hit}"`).toBeNull()
      }
    }
  })

  it('bridge prose never repeats the scene it flows into', () => {
    for (const chId of COMPANY_ORDER) {
      const ch = CONTENT.chapters[chId]
      const byId = new Map(ch.scenes.map((s) => [s.id, s]))
      for (const s of ch.scenes) {
        if (s.kind !== 'bridge') continue
        const goto = s.choices[0]?.goto
        if (!goto) continue
        const target = byId.get(goto)
        if (!target) continue
        const hit = overlap(s.prose, `${target.leadIn ?? ''} ${target.prose}`)
        expect(hit, `${chId}/${s.id} bridge echoes ${goto}: "${hit}"`).toBeNull()
      }
    }
  })
})
