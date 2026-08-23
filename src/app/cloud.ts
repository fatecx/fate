/**
 * Cloud save — one row per player, server remembers and does nothing else.
 * The engine stays client-authoritative; this module only stores/restores
 * serialized GameState. Anonymous sessions now; passkey/wallet upgrade at P4.
 */
import { createClient } from '@supabase/supabase-js'
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

/** Sign in anonymously (per-browser identity for now) and fetch the remote save. */
export async function cloudLoad(): Promise<SaveBlob | null> {
  if (!supa) return null
  try {
    const { error } = await supa.auth.signInAnonymously()
    if (error) return null
    const { data } = await supa.from('saves').select('state,transcript').limit(1)
    const row = data?.[0]
    if (!row?.state) return null
    return { st: row.state as GameState, transcript: (row.transcript as unknown[]) ?? [] }
  } catch {
    return null // offline / blocked: localStorage still carries the game
  }
}

/** Returns the save that should win (greater progress; ties go to local). */
export function pickSave(local: SaveBlob | null, remote: SaveBlob | null): SaveBlob | null {
  if (!local) return remote
  if (!remote) return local
  return progress(remote) > progress(local) ? remote : local
}

let timer: ReturnType<typeof setTimeout> | undefined

/** Debounced upsert of the current save. */
export function cloudPush(save: SaveBlob): void {
  if (!supa) return
  clearTimeout(timer)
  timer = setTimeout(() => {
    void (async () => {
      try {
        const user = (await supa!.auth.getUser()).data.user
        if (!user) return
        await supa!
          .from('saves')
          .upsert({ user_id: user.id, state: save.st, transcript: save.transcript, updated_at: new Date().toISOString() })
      } catch {
        /* non-fatal */
      }
    })()
  }, 2500)
}
