import type { Pred } from '../../engine/predicates'

/**
 * TELEPORT — shared predicate vocabulary. The boardroom war resolves through
 * these; the engine decides, the prose narrates. AGENTS.md law 1.
 */

const flag = (key: string, v: boolean | number | string = true): Pred => ({
  k: 'flag',
  scope: 'company',
  key,
  cmp: 'eq',
  v,
})

const not = (p: Pred): Pred => ({ k: 'not', p })
const all = (...of: Pred[]): Pred => ({ k: 'all', of })
const any = (...of: Pred[]): Pred => ({ k: 'any', of })

/** June holds a board seat — she came in as cofounder-CFO, not as a check. */
export const JUNE_SEAT: Pred = flag('june_seat')

/** Farrokh will vote for you: he stayed whole, or the break was mended. */
export const FARROKH_LOYAL: Pred = any(flag('farrokh_stays'), flag('farrokh_mended'))

/** The independent seat belongs to Priya Raghavan. */
export const INDEP_PRIYA: Pred = flag('indep_priya')

/** ALEPH's model trusts you — earned only by numbers that matched sentences. */
export const ALEPH_LOYAL: Pred = { k: 'rel', who: 'aleph', field: 'respect', cmp: 'gte', v: 3 }

/**
 * The vote. Removal for cause needs the room; two true allies among
 * {June's seat, Farrokh, Priya's independent seat, ALEPH} kill the motion.
 * Deterministic seat math — you either built this board or you didn't.
 */
export const SURVIVE_VOTE: Pred = any(
  all(JUNE_SEAT, FARROKH_LOYAL),
  all(JUNE_SEAT, INDEP_PRIYA),
  all(JUNE_SEAT, ALEPH_LOYAL),
  all(FARROKH_LOYAL, INDEP_PRIYA),
  all(FARROKH_LOYAL, ALEPH_LOYAL),
  all(INDEP_PRIYA, ALEPH_LOYAL),
)

export const LOSE_VOTE: Pred = not(SURVIVE_VOTE)

/** The chapter's golden thread: the eleven seconds were published, not buried. */
export const TRANSPARENT: Pred = flag('t_transparent')

/** The product tells the truth about distance — the blend never wore the brand alone. */
export const HONEST_PRODUCT: Pred = not(flag('blend_full'))

/** ALEPH money was taken; Conrad Hale sits on the board. Coup roads live here. */
export const ALEPH_ROUND: Pred = flag('aleph_round')

/** The clean-money road: you never took the model's check. No Hale, no coup. */
export const NO_ALEPH: Pred = flag('no_aleph')
