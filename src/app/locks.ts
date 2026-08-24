/**
 * Lock presentation — the one place that decides how an unavailable choice
 * reads. Every locked choice STAYS VISIBLE (a closed door you can stare at is
 * part of the biography). Copy comes in two registers:
 *  - "needs …"  — a threshold you haven't reached yet. Aspirational.
 *  - "closed —" — a door your earlier choices shut forever. Permanent.
 * Raw predicate syntax must never leak; tests/locks.spec.ts enforces coverage.
 */
import type { Pred } from '../engine/predicates'
import { evalPred } from '../engine/predicates'
import type { GameState } from '../engine/types'

/** Fiction phrasing for boolean gate-flags required positively ("needs …"). */
export const FLAG_PHRASES: Record<string, string> = {
  lawyer_ally: 'Tomás retained for points, not cash',
  transparent: 'the fleet grounded and the fault report published',
}

/** Fiction phrasing for states that CLOSE a door when present ("closed — …"). */
export const FLAG_CLOSED: Record<string, string> = {
  lawyer_ally: 'Tomás is already on your cap table; allies don’t bill twice',
  bridge_used: 'the bridge loan is spent; nobody lends against everything twice',
  down_used: 'June already doubled down once this life',
}

const CLOSED_FALLBACK = 'a road you took earlier sealed this one'

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

export interface LeafCopy {
  register: 'needs' | 'closed'
  text: string
}

/** How a single failing leaf reads — always in fiction, never raw syntax. */
export function phraseLeaf(leaf: Pred, name: (id: string) => string): LeafCopy {
  switch (leaf.k) {
    case 'not': {
      const inner = leaf.p
      if (inner.k === 'flag' && FLAG_CLOSED[inner.key]) {
        return { register: 'closed', text: FLAG_CLOSED[inner.key] }
      }
      if (inner.k === 'met') {
        return { register: 'closed', text: `${name(inner.who)} already knows you — that ship sailed` }
      }
      return { register: 'closed', text: CLOSED_FALLBACK }
    }
    case 'met':
      return { register: 'needs', text: `${name(leaf.who)} in your corner` }
    case 'rel':
      return {
        register: 'needs',
        text: leaf.field === 'respect' ? `${name(leaf.who)}’s respect` : `${name(leaf.who)}’s trust`,
      }
    case 'flag':
      return { register: 'needs', text: FLAG_PHRASES[leaf.key] ?? CLOSED_FALLBACK }
    case 'stress':
      return {
        register: 'needs',
        text: leaf.cmp === 'lt' || leaf.cmp === 'lte' ? 'a founder who has slept' : 'more pressure than this',
      }
    case 'score':
      return { register: 'needs', text: `a founder score of ${leaf.v}` }
    case 'rep':
      return { register: 'needs', text: `cred of ${leaf.v >= 0 ? '+' : ''}${leaf.v}` }
    case 'treasury':
      return { register: 'needs', text: `$${Math.round(leaf.v / 1000)}k in the bank` }
    case 'runway':
      return { register: 'needs', text: `${leaf.v} weeks of runway` }
    case 'age':
      return { register: 'needs', text: `a company ${leaf.v} weeks old` }
    case 'stake':
      return { register: 'needs', text: `${name(leaf.who)} holding ${leaf.v}%` }
    case 'seen':
      return { register: 'needs', text: 'a scene this life hasn’t reached' }
    case 'corpse':
      return { register: 'needs', text: 'a company already in the ground' }
    default:
      return { register: 'needs', text: CLOSED_FALLBACK }
  }
}

export interface LockCopy {
  /** Doors your past sealed (permanent). Takes display priority. */
  closed: string[]
  /** Thresholds not yet met (aspirational). */
  needs: string[]
}

/** Full lock copy for a failing `requires`. */
export function lockCopy(requires: Pred, st: GameState, name: (id: string) => string): LockCopy {
  const closed: string[] = []
  const needs: string[] = []
  for (const leaf of failingLeaves(requires, st)) {
    const c = phraseLeaf(leaf, name)
    if (c.register === 'closed') closed.push(c.text)
    else needs.push(c.text)
  }
  return { closed, needs }
}
