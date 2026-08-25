/** Core state types. Everything here is plain serializable JSON — a save IS the state. */

export type CompanyId = 'hyperchute' | 'teleport' | 'skyline' | 'escape'

export const COMPANY_ORDER: readonly CompanyId[] = ['hyperchute', 'teleport', 'skyline', 'escape']

export const FOUNDER = 'founder'

export interface Stake {
  who: string
  pct: number
}

export type Standing = 'ally' | 'neutral' | 'hostile'

export interface Rel {
  met: boolean
  affinity: number
  respect: number
  standing: Standing
}

export interface FuseState {
  sceneId: string
  expiresEpoch: number
}

export interface CompanyState {
  id: CompanyId
  foundedEpoch: number
  status: 'active' | 'ended'
  endingId?: string

  treasury: number // $
  weeklyBurn: number // $/wk opex + payroll
  weeklyRevenue: number // $/wk

  stress: number // 0..100
  capTable: Stake[]

  flags: Record<string, number | string | boolean>
  fuses: FuseState[]
  queue: string[] // ordered pending scenes; queue[0] is on screen now
  seen: string[]
}

export interface Corpse {
  company: CompanyId
  endingId: string
  endedEpoch: number
}

export interface WorldState {
  reputation: number // -10..+10, biography-wide
  rels: Record<string, Rel>
  corpses: Corpse[]
  flags: Record<string, number | string | boolean>
}

export interface Ledger {
  founderScore: number
  completed: { company: CompanyId; endingId: string; epoch: number }[]
}

export interface HistoryEntry {
  epoch: number
  scene: string
  choice: number
  label: string
}

export interface GameState {
  seed: number // PRNG cursor; writeback after every transition
  chapter: number // index into COMPANY_ORDER
  epoch: number // biography-wide weeks since incorporation #1
  company: CompanyState
  world: WorldState
  ledger: Ledger
  history: HistoryEntry[]
  phase: 'playing' | 'epilogue' | 'complete'
}

export type Action =
  | { t: 'newGame'; seed: number }
  | { t: 'choose'; index: number }
  | { t: 'foundNext' }
  | { t: 'surrender' } // declare bankruptcy: the founder's legal out, scars and all
  | { t: 'devSkip'; ending: string } // dev tools only: close the chapter with a named ending

// ---- derived numbers -------------------------------------------------------

export function netBurn(c: CompanyState): number {
  return c.weeklyBurn - c.weeklyRevenue
}

export function runwayWeeks(c: CompanyState): number {
  const nb = netBurn(c)
  return nb > 0 ? c.treasury / nb : Infinity
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v))
}
