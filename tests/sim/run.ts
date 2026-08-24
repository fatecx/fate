import type { Content } from '../../src/content/schema'
import { newGame, reduce, visibleChoices } from '../../src/engine/reduce'
import { Rng } from '../../src/engine/rng'
import { runwayWeeks, type GameState } from '../../src/engine/types'
import type { Policy } from './bots'

const EPOCH_CAP = 1500

export interface ChapterResult {
  id: string
  endingId: string
  startEpoch: number
  endEpoch: number
}

export interface RunResult {
  seed: number
  epochs: number
  chapters: ChapterResult[]
  /** Times runway crossed from >=10wk to <10wk while playing. */
  panics: number
  violations: string[]
  aborted: boolean
  finalScore: number
}

function scanInvariants(st: GameState, violations: string[]): void {
  const c = st.company
  const nums = [c.treasury, c.weeklyBurn, c.weeklyRevenue]
  if (!nums.every(Number.isFinite)) violations.push(`non-finite company numbers @${st.epoch}`)
  if (!(c.stress >= 0 && c.stress <= 100)) violations.push(`stress out of range @${st.epoch}`)
  if (!(st.world.reputation >= -10 && st.world.reputation <= 10)) {
    violations.push(`rep out of range @${st.epoch}`)
  }
  if (!(st.ledger.founderScore >= 0 && Number.isFinite(st.ledger.founderScore))) {
    violations.push(`score invalid @${st.epoch}`)
  }
  let total = 0
  for (const s of c.capTable) {
    if (!(s.pct >= 0 && s.pct <= 100)) violations.push(`stake ${s.who} out of range @${st.epoch}`)
    total += s.pct
  }
  if (total > 100.001) violations.push(`cap table sums to ${total} @${st.epoch}`)
  if (st.epoch > 1500) violations.push(`epoch overrun @${st.epoch}`)
}

/**
 * Plays one full biography headlessly — four chapters, deaths and all.
 * Determinism of the GAME is independent of the bot's own RNG stream.
 */
export function playBiography(
  content: Content,
  seed: number,
  policy: Policy,
): RunResult {
  let st = newGame(content, seed)
  const rng = new Rng((seed ^ 0x9e3779b9) >>> 0)
  const chapters: ChapterResult[] = []
  const violations: string[] = []
  let panics = 0
  let prevRunway = runwayWeeks(st.company)
  let prevCompany = st.company.id

  scanInvariants(st, violations)

  while (st.phase !== 'complete') {
    if (st.epoch > EPOCH_CAP) return { seed, epochs: st.epoch, chapters, panics, violations, aborted: true, finalScore: st.ledger.founderScore }

    if (st.phase === 'playing') {
      if (st.company.id !== prevCompany) {
        prevCompany = st.company.id
        prevRunway = runwayWeeks(st.company)
      }
      const rw = runwayWeeks(st.company)
      if (prevRunway >= 10 && rw < 10) panics += 1
      prevRunway = rw

      const legal = visibleChoices(content, st)
      if (legal.length === 0) {
        violations.push(`no legal choices on ${st.company.queue[0]} @${st.epoch}`)
        break
      }
      const index = policy({ content, st, legal }, rng)
      st = reduce(content, st, { t: 'choose', index })
    } else if (st.phase === 'epilogue') {
      const ended = st.company
      const completed = st.ledger.completed[st.ledger.completed.length - 1]
      chapters.push({
        id: ended.id,
        endingId: completed?.endingId ?? ended.endingId ?? 'unknown',
        startEpoch: ended.foundedEpoch,
        endEpoch: st.epoch,
      })
      st = reduce(content, st, { t: 'foundNext' })
    } else {
      break
    }

    scanInvariants(st, violations)
  }

  return {
    seed,
    epochs: st.epoch,
    chapters,
    panics,
    violations,
    aborted: false,
    finalScore: st.ledger.founderScore,
  }
}
