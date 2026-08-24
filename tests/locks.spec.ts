/**
 * Lock-copy coverage — the class of bug where a locked choice shows raw
 * predicate syntax or a self-contradictory "needs <state you already have>".
 * Every locked choice stays visible; every leaf of every `requires` in ALL
 * content must phrase cleanly in one of two registers (needs / closed).
 * Content cannot ship a gate the UI cannot say.
 */
import { describe, expect, it } from 'vitest'
import { CONTENT } from '../src/content/world'
import { COMPANY_ORDER } from '../src/engine/types'
import type { Pred } from '../src/engine/predicates'
import { FLAG_PHRASES, phraseLeaf } from '../src/app/locks'

function leaves(p: Pred, negate = false): Pred[] {
  switch (p.k) {
    case 'all':
    case 'any':
      return p.of.flatMap((q) => leaves(q, negate))
    case 'not':
      return leaves(p.p, !negate)
    default:
      return [negate ? { k: 'not', p } : p]
  }
}

const name = (id: string): string => CONTENT.characters[id]?.name ?? id

describe('lock copy coverage', () => {
  it('every requires-leaf in all content phrases cleanly in fiction', () => {
    for (const chId of COMPANY_ORDER) {
      for (const scene of CONTENT.chapters[chId].scenes) {
        for (const [i, c] of scene.choices.entries()) {
          if (!c.requires) continue
          for (const leaf of leaves(c.requires)) {
            const where = `${chId}/${scene.id}#${i}`
            const copy = phraseLeaf(leaf, name)
            expect(copy.text.length, where).toBeGreaterThan(0)
            expect(['needs', 'closed']).toContain(copy.register)
            expect(
              /flag |company:|world:| = | ≥ | ≤ |!==/.test(copy.text),
              `${where}: raw syntax leaks: "${copy.text}"`,
            ).toBe(false)
          }
        }
      }
    }
  })

  it('positive boolean gate-flags used in requires are covered by FLAG_PHRASES', () => {
    for (const chId of COMPANY_ORDER) {
      for (const scene of CONTENT.chapters[chId].scenes) {
        for (const c of scene.choices) {
          if (!c.requires) continue
          for (const leaf of leaves(c.requires)) {
            if (leaf.k === 'flag' && typeof leaf.v === 'boolean' && leaf.cmp === 'eq' && leaf.v) {
              expect(
                FLAG_PHRASES[leaf.key],
                `${chId}/${scene.id}: gate flag "${leaf.key}" has no fiction phrase — add it to FLAG_PHRASES`,
              ).toBeDefined()
            }
          }
        }
      }
    }
  })
})
