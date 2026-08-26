import type { Pred } from '../../engine/predicates'

/**
 * SKYLINE — shared predicate vocabulary. The treaty vote resolves through
 * alliances built all chapter. The engine decides, the prose narrates.
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

/** Marcus Vale's MERIDIAN bloc stands with you at the table. */
export const MARCUS_BLOC: Pred = flag('marcus_alliance')

/** ALEPH backs you — honesty compounds across chapters (world-scoped rel). */
export const ALEPH_BACKING: Pred = { k: 'rel', who: 'aleph', field: 'respect', cmp: 'gte', v: 4 }

/** Chen's bloc abstains — earned by matching his plain honesty at dinner. */
export const CHEN_NEUTRAL: Pred = flag('chen_respected')

/** The small nations trust you — the strand failure was published, marked in your hand. */
export const S_TRANSPARENT: Pred = flag('s_transparent')

/** Okonkwo, the judge, is convinced. Never bought — convinced. */
export const OKONKWO_CONVINCED: Pred = { k: 'rel', who: 'okonkwo', field: 'respect', cmp: 'gte', v: 2 }

/**
 * The treaty vote. Winning takes the judge PLUS any two of the four
 * alliances. Deterministic — you either built the room or you didn't.
 */
export const WIN_TREATY: Pred = all(
  OKONKWO_CONVINCED,
  any(
    all(MARCUS_BLOC, ALEPH_BACKING),
    all(MARCUS_BLOC, CHEN_NEUTRAL),
    all(MARCUS_BLOC, S_TRANSPARENT),
    all(ALEPH_BACKING, CHEN_NEUTRAL),
    all(ALEPH_BACKING, S_TRANSPARENT),
    all(CHEN_NEUTRAL, S_TRANSPARENT),
  ),
)

export const LOSE_TREATY: Pred = not(WIN_TREATY)

/** The cable carries people, not just cargo — the dream stayed whole. */
export const HUMANS_RATED: Pred = flag('humans_rated')

/** You moved to the platform. The build got you. Earth got less of you. */
export const UPROOTED: Pred = flag('uprooted')
