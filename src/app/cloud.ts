/**
 * Cloud save — one row per founder, the server remembers and does nothing else.
 * The engine stays client-authoritative; this module only stores/restores
 * serialized GameState for a signed-in founder. Identity comes from a passkey
 * (see passkey.ts); guests are never written down.
 */
import { createClient, type Session } from '@supabase/supabase-js'
import type { GameState } from '../engine/types'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supa = url && key ? createClient(url, key) : null

export interface SaveBlob {
  st: GameState
  transcript: unknown[]
}

function progress(s: SaveBlob): number {
  return s.st.epoch * 100 + s.st.ledger.completed.length
}

// ---- identity ---------------------------------------------------------------

export async function getSession(): Promise<Session | null> {
  if (!supa) return null
  try {
    return (await supa.auth.getSession()).data.session
  } catch {
    return null
  }
}

export async function signOut(): Promise<void> {
  try {
    await supa?.auth.signOut()
  } catch {
    /* the local session is cleared regardless */
  }
}

function claims(session: Session): Record<string, unknown> {
  const meta = session.user.user_metadata as Record<string, unknown>
  return (meta?.custom_claims as Record<string, unknown>) ?? {}
}

/** Founder of record, e.g. "FOUNDER Nº 4F2A81C3". Wallet-era sessions keep
 *  their old address label so existing biographies still read as themselves. */
export function founderLabel(session: Session): string {
  const c = claims(session)
  if (typeof c.address === 'string' && c.address) {
    const a = c.address
    return `${a.slice(0, 6)}…${a.slice(-4)}`
  }
  return `FOUNDER Nº ${session.user.id.slice(0, 8).toUpperCase()}`
}

// ---- save transport -----------------------------------------------------------

/** Fetch the remote save for the signed-in founder (null when signed out). */
export async function cloudLoad(): Promise<SaveBlob | null> {
  if (!supa) return null
  try {
    const session = await getSession()
    if (!session) return null
    const { data } = await supa.from('saves').select('state,transcript').limit(1)
    const row = data?.[0]
    if (!row?.state) return null
    return { st: row.state as GameState, transcript: (row.transcript as unknown[]) ?? [] }
  } catch {
    return null // offline / blocked: the local copy still carries the game
  }
}

/** Returns the save that should win (greater progress; ties go to local). */
export function pickSave(local: SaveBlob | null, remote: SaveBlob | null): SaveBlob | null {
  if (!local) return remote
  if (!remote) return local
  return progress(remote) > progress(local) ? remote : local
}

let pending: SaveBlob | null = null
let timer: ReturnType<typeof setTimeout> | undefined

async function flush(): Promise<void> {
  if (!supa || !pending) return
  const save = pending
  pending = null
  clearTimeout(timer)
  try {
    const user = (await supa.auth.getUser()).data.user
    if (!user) return
    await supa
      .from('saves')
      .upsert({ user_id: user.id, state: save.st, transcript: save.transcript, updated_at: new Date().toISOString() })
  } catch {
    /* non-fatal — localStorage still has it */
  }
}

/** Debounced upsert of the current save (flushed early when the tab hides). */
export function cloudPush(save: SaveBlob): void {
  if (!supa) return
  pending = save
  clearTimeout(timer)
  timer = setTimeout(() => void flush(), 1500)
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') void flush()
  })
}

// ---- the public record ---------------------------------------------------------
// Chapter closes write two things beyond the save: a founders-ledger row
// (the leaderboard) and this founder's signature decisions (community stats).
// All numbers come from engine state; the server only counts.

export interface FounderRow {
  user_id: string
  wallet: string
  chain: string
  score: number
  chapters: number
  weeks: number
  endings: string[]
  cohort?: 'human' | 'model' | 'agent'
  model?: string | null
}

/** Upsert this founder's ledger row. Idempotent; safe to call at every epilogue. */
export async function pushFounder(row: Omit<FounderRow, 'user_id' | 'wallet' | 'chain' | 'cohort' | 'model'>): Promise<void> {
  if (!supa) return
  try {
    const session = await getSession()
    if (!session) return
    await supa.from('founders').upsert({
      user_id: session.user.id,
      wallet: founderLabel(session),
      chain: 'passkey',
      ...row,
      updated_at: new Date().toISOString(),
    })
  } catch {
    /* the ledger is a mirror, never a dependency */
  }
}

/** Record decided scenes for community tallies. First write wins; reruns are ignored. */
export async function pushDecisions(rows: { company: string; scene: string; choice: number }[]): Promise<void> {
  if (!supa || rows.length === 0) return
  try {
    const session = await getSession()
    if (!session) return
    await supa
      .from('decisions')
      .upsert(
        rows.map((r) => ({ user_id: session.user.id, ...r })),
        { onConflict: 'user_id,company,scene', ignoreDuplicates: true },
      )
  } catch {
    /* non-fatal */
  }
}

/** Aggregate decision counts for a chapter, keyed by scene id. */
export async function fetchDecisionSplit(company: string): Promise<Record<string, { choice: number; n: number }[]>> {
  const out: Record<string, { choice: number; n: number }[]> = {}
  if (!supa) return out
  try {
    const { data } = await supa.rpc('decision_split', { p_company: company })
    for (const row of (data ?? []) as { scene: string; choice: number; n: number }[]) {
      ;(out[row.scene] ??= []).push({ choice: row.choice, n: Number(row.n) })
    }
  } catch {
    /* offline: the record screen simply omits community lines */
  }
  return out
}

/** Top of the founders ledger, best score first. */
export async function fetchLeaderboard(limit = 100): Promise<FounderRow[]> {
  if (!supa) return []
  try {
    const { data } = await supa
      .from('founders')
      .select('user_id,wallet,chain,score,chapters,weeks,endings,cohort,model')
      .order('score', { ascending: false })
      .order('weeks', { ascending: true })
      .limit(limit)
    return (data ?? []) as FounderRow[]
  } catch {
    return []
  }
}
