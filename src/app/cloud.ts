/**
 * Cloud save — one row per wallet, the server remembers and does nothing else.
 * The engine stays client-authoritative; this module only stores/restores
 * serialized GameState for a signed-in founder. Identity comes from
 * signInWithWeb3 (see wallet.ts); guests are never written down.
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

/** Short wallet label, e.g. "7fUA…kQ9d · SOL". */
export function walletLabel(session: Session): string {
  const u = session.user
  const meta = { ...(u.identities?.[0]?.identity_data ?? {}), ...u.user_metadata } as Record<string, unknown>
  const addr = typeof meta.address === 'string' ? meta.address : ''
  const chain = typeof meta.chain === 'string' ? meta.chain : ''
  if (!addr) return 'wallet'
  const tag = chain ? ` · ${chain.slice(0, 3).toUpperCase()}` : ''
  return `${addr.slice(0, 4)}…${addr.slice(-4)}${tag}`
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
