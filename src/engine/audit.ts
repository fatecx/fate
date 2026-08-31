/**
 * The Ledger's audit digits — the fractional part of a founder score.
 *
 * Integer founder score ranks lives; the audit examines them more closely.
 * Four normalized reads of the final true state, weighted to sum strictly
 * below 1.0 so the fraction can NEVER reorder two different integer scores:
 *
 *   .30 — chapters completed (a finished biography outranks an abandoned one)
 *   .30 — world reputation (how the world remembers you)
 *   .20 — weeks lived (a longer life at the same score survived more)
 *   .20 — treasury at close (what was left on the table)
 *
 * Deterministic, engine-pure, display-only: every gate in the game keeps
 * reading the integer. The simulator and the client compute this identically.
 */
import type { GameState } from './types'

export function auditDigits(st: GameState): number {
  const chapters = Math.min(st.ledger.completed.length, 3) / 3
  const rep = (Math.max(-10, Math.min(10, st.world.reputation)) + 10) / 20
  const weeks = Math.min(Math.max(st.epoch, 0), 1500) / 1500
  const treasury = Math.min(Math.max(st.company.treasury, 0), 1_000_000_000) / 1_000_000_000
  const frac = (0.3 * chapters + 0.3 * rep + 0.2 * weeks + 0.2 * treasury) * 0.9999
  return Math.round(frac * 10000) / 10000
}

/** Full display score, e.g. 34.4958. Integer part is the engine's law. */
export function auditedScore(st: GameState): number {
  return st.ledger.founderScore + auditDigits(st)
}
