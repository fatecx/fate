/**
 * Lock presentation — the one place that decides how an unavailable choice
 * reads. Rules:
 *  - A door closed by something you ALREADY are/did (a failing NOT-clause,
 *    a spent rescue) is dead, not aspirational: it is hidden entirely.
 *  - A door through a person the founder has never met is hidden (fiction).
 *  - Everything else shows locked with "needs …" in plain fiction — never
 *    raw predicate syntax. Gate flags must appear in FLAG_PHRASES; a test
 *    enforces coverage so content cannot ship a gate the UI cannot phrase.
 */
import type { Pred } from '../engine/predicates'
import { evalPred } from '../engine/predicates'
import type { GameState } from '../engine/types'

/** Fiction phrasing for boolean gate-flags used positively in `requires`. */
export const FLAG_PHRASES: Record<string, string> = {
  lawyer_ally: 'Tomás retained for points, not cash',
  transparent: 'the fleet grounded and the fault report published',
}

/** Leaves of the predicate that are failing right now. */
export function failingLeaves(p: Pred, st: GameState, negate = false): Pred[] {
  const holds = evalPred(p, st) !== negate
  if (holds) return []
  switch (p.k) {
    case 'all':
    case 'any':
      return negate ? [p] : p.of.flatMap((q) => failingLeaves(q, st))
    case 'not':
      return failingLeaves(p.p, st, !negate)
    default:
      return [negate ? { k: 'not', p } : p]
  }
}

export interface LockCopy {
  hide: boolean
  needs: string[]
}

/** How a single failing leaf reads; null = this leaf hides the whole choice. */
export function phraseLeaf(leaf: Pred, name: (id: string) => string): string | null {
  switch (leaf.k) {
    case 'not':
    case 'met':
    case 'rel':
    case 'seen':
    case 'corpse':
      return null // closed doors and strangers: hide, don't tease
    case 'flag':
      return FLAG_PHRASES[leaf.key] ?? null
    case 'stress':
      return leaf.cmp === 'lt' || leaf.cmp === 'lte' ? 'a founder who has slept' : `stress ${leaf.cmp} ${leaf.v}`
    case 'score':
      return `founder score of ${leaf.v}`
    case 'rep':
      return `cred of ${leaf.v >= 0 ? '+' : ''}${leaf.v}`
    case 'treasury':
      return `$${Math.round(leaf.v / 1000)}k in the bank`
    case 'runway':
      return `${leaf.v} weeks of runway`
    case 'age':
      return `a company ${leaf.v} weeks old`
    case 'stake':
      return `${name(leaf.who)} holding ${leaf.v}%`
    default:
      return null
  }
}

/** Full lock copy for a failing `requires`. */
export function lockCopy(requires: Pred, st: GameState, name: (id: string) => string): LockCopy {
  const leaves = failingLeaves(requires, st)
  const needs: string[] = []
  for (const leaf of leaves) {
    const phrase = phraseLeaf(leaf, name)
    if (phrase === null) return { hide: true, needs: [] }
    needs.push(phrase)
  }
  return { hide: false, needs }
}
