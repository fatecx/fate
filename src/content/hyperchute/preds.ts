import type { Pred } from '../../engine/predicates'

/**
 * HYPERCHUTE — shared predicate vocabulary. The films remember the war the
 * way you fought it; these are the memories they check. AGENTS.md law 1.
 */

const flag = (key: string, v: boolean | number | string = true): Pred => ({
  k: 'flag',
  scope: 'company',
  key,
  cmp: 'eq',
  v,
})

/** The couriers became employees — at the collective, or after the strike. */
export const COURIERS_ALLY: Pred = flag('couriers_ally')

/** You automated the stairs and never came back to the table. */
export const COURIERS_ENEMY: Pred = flag('couriers_enemy')

/** The middle deal: guaranteed pay, no benefits, half a signature. */
export const COURIERS_MIDDLE: Pred = flag('couriers_middle')

/** Sofia took MERIDIAN's letter. Her code stayed; she did not. */
export const SOFIA_GONE: Pred = flag('sofia_gone')
