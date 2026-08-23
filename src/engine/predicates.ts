/**
 * Predicate DSL — the read side of the content schema. Scenes/choices use these
 * to declare availability and requirements; the engine evaluates them against
 * true state. No writes, ever.
 */
import type { CompanyId, GameState } from './types'
import { runwayWeeks } from './types'

export type Cmp = 'eq' | 'neq' | 'gte' | 'lte' | 'gt' | 'lt'

export type Pred =
  | { k: 'true' }
  | { k: 'flag'; scope: 'company' | 'world'; key: string; cmp: Cmp; v: number | string | boolean }
  | { k: 'stress'; cmp: Cmp; v: number }
  | { k: 'runway'; cmp: Cmp; v: number } // weeks
  | { k: 'treasury'; cmp: Cmp; v: number } // $
  | { k: 'rep'; cmp: Cmp; v: number }
  | { k: 'stake'; who: string; cmp: Cmp; v: number } // cap-table percentage
  | { k: 'rel'; who: string; field: 'affinity' | 'respect'; cmp: Cmp; v: number }
  | { k: 'met'; who: string }
  | { k: 'score'; cmp: Cmp; v: number } // founder score
  | { k: 'corpse'; company: CompanyId } // a dead company is remembered by the world
  | { k: 'seen'; scene: string }
  | { k: 'age'; cmp: Cmp; v: number } // weeks since this company was founded
  | { k: 'all'; of: Pred[] }
  | { k: 'any'; of: Pred[] }
  | { k: 'not'; p: Pred }

export const TRUE: Pred = { k: 'true' }

function cmpNum(a: number, op: Cmp, b: number): boolean {
  switch (op) {
    case 'eq':
      return a === b
    case 'neq':
      return a !== b
    case 'gte':
      return a >= b
    case 'lte':
      return a <= b
    case 'gt':
      return a > b
    case 'lt':
      return a < b
  }
}

export function evalPred(p: Pred, st: GameState): boolean {
  switch (p.k) {
    case 'true':
      return true
    case 'flag': {
      const bag = p.scope === 'company' ? st.company.flags : st.world.flags
      const actual = bag[p.key]
      if (typeof actual === 'number' && typeof p.v === 'number') return cmpNum(actual, p.cmp, p.v)
      if (p.cmp === 'eq') return actual === p.v
      if (p.cmp === 'neq') return actual !== p.v
      return false
    }
    case 'stress':
      return cmpNum(st.company.stress, p.cmp, p.v)
    case 'runway':
      return cmpNum(runwayWeeks(st.company), p.cmp, p.v)
    case 'treasury':
      return cmpNum(st.company.treasury, p.cmp, p.v)
    case 'rep':
      return cmpNum(st.world.reputation, p.cmp, p.v)
    case 'stake': {
      const s = st.company.capTable.find((x) => x.who === p.who)
      return cmpNum(s ? s.pct : 0, p.cmp, p.v)
    }
    case 'rel': {
      const r = st.world.rels[p.who]
      const v = r ? r[p.field] : 0
      return cmpNum(v, p.cmp, p.v)
    }
    case 'met':
      return st.world.rels[p.who]?.met === true
    case 'score':
      return cmpNum(st.ledger.founderScore, p.cmp, p.v)
    case 'corpse':
      return st.world.corpses.some((c) => c.company === p.company)
    case 'seen':
      return st.company.seen.includes(p.scene)
    case 'age':
      return cmpNum(st.epoch - st.company.foundedEpoch, p.cmp, p.v)
    case 'all':
      return p.of.every((q) => evalPred(q, st))
    case 'any':
      return p.of.some((q) => evalPred(q, st))
    case 'not':
      return !evalPred(p.p, st)
  }
}
