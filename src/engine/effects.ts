/**
 * Effect DSL — the write side of the content schema. A choice carries a list of
 * these; applyEffects mutates an already-cloned draft state in order.
 * `end` is deferred: reduce() intercepts it and closes the chapter.
 */
import { clamp, FuseState, GameState } from './types'

export type Effect =
  | { e: 'treasury'; d: number } // $ delta
  | { e: 'burn'; d: number } // weekly burn delta
  | { e: 'revenue'; d: number } // weekly revenue delta
  | { e: 'stress'; d: number }
  | { e: 'rep'; d: number } // biography-wide reputation
  | { e: 'score'; d: number } // founder score
  | { e: 'stake'; who: string; d: number } // grant (+, post-dilution) or buy back (-) pct points
  | { e: 'rel'; who: string; aff?: number; resp?: number; standing?: 'ally' | 'neutral' | 'hostile' }
  | { e: 'meet'; who: string }
  | { e: 'flag'; scope: 'company' | 'world'; key: string; v: number | string | boolean }
  | { e: 'clearFlag'; scope: 'company' | 'world'; key: string }
  | { e: 'enqueue'; scene: string } // jump to front of the queue (deduped)
  | { e: 'fuse'; scene: string; epochs: number } // scene must be answered within N epochs
  | { e: 'end'; ending: string } // close this chapter with the given ending

export interface DeferredEnd {
  ending: string
}

function ensureRel(st: GameState, who: string): void {
  if (!st.world.rels[who]) {
    st.world.rels[who] = { met: true, affinity: 0, respect: 0, standing: 'neutral' }
  }
}

/** Grant `x` post-dilution points to `who`: everyone else scales by (100-x)/100. */
function grantStake(st: GameState, who: string, x: number): void {
  const ct = st.company.capTable
  let holder = ct.find((s) => s.who === who)
  if (!holder) {
    holder = { who, pct: 0 }
    ct.push(holder)
  }
  if (x >= 0) {
    const scale = (100 - x) / 100
    for (const s of ct) s.pct *= scale
    holder.pct += x
  } else {
    holder.pct = Math.max(0, holder.pct + x)
  }
}

export function applyEffects(st: GameState, effects: readonly Effect[]): DeferredEnd[] {
  const ends: DeferredEnd[] = []
  for (const fx of effects) {
    switch (fx.e) {
      case 'treasury':
        st.company.treasury += fx.d
        break
      case 'burn':
        st.company.weeklyBurn = Math.max(0, st.company.weeklyBurn + fx.d)
        break
      case 'revenue':
        st.company.weeklyRevenue = Math.max(0, st.company.weeklyRevenue + fx.d)
        break
      case 'stress':
        st.company.stress = clamp(st.company.stress + fx.d, 0, 100)
        break
      case 'rep':
        st.world.reputation = clamp(st.world.reputation + fx.d, -10, 10)
        break
      case 'score':
        st.ledger.founderScore += fx.d
        break
      case 'stake':
        grantStake(st, fx.who, fx.d)
        break
      case 'rel': {
        ensureRel(st, fx.who)
        const r = st.world.rels[fx.who]
        r.met = true
        if (fx.aff !== undefined) r.affinity = clamp(r.affinity + fx.aff, -10, 10)
        if (fx.resp !== undefined) r.respect = clamp(r.respect + fx.resp, -10, 10)
        if (fx.standing !== undefined) r.standing = fx.standing
        break
      }
      case 'meet':
        ensureRel(st, fx.who)
        break
      case 'flag':
        ;(fx.scope === 'company' ? st.company.flags : st.world.flags)[fx.key] = fx.v
        break
      case 'clearFlag':
        delete (fx.scope === 'company' ? st.company.flags : st.world.flags)[fx.key]
        break
      case 'enqueue':
        if (!st.company.queue.includes(fx.scene)) st.company.queue.unshift(fx.scene)
        break
      case 'fuse':
        if (!st.company.fuses.some((f) => f.sceneId === fx.scene)) {
          const f: FuseState = { sceneId: fx.scene, expiresEpoch: st.epoch + Math.max(1, fx.epochs) }
          st.company.fuses.push(f)
        }
        break
      case 'end':
        ends.push({ ending: fx.ending })
        break
    }
  }
  return ends
}
