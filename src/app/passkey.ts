/**
 * Passkey identity — the founder's signature is a fingerprint, not a password.
 *
 * Registration creates a resident WebAuthn credential ("one passkey, one
 * life") and a matching Supabase user; login presents the credential and
 * exchanges the verified assertion for that user's derived credentials.
 * All verification is server-side (/api/passkey); the browser never holds
 * a secret beyond the resulting Supabase session.
 */
import { startRegistration, startAuthentication } from '@simplewebauthn/browser'
import { supa } from './cloud'

const API = (): string =>
  self.origin && self.origin.startsWith('http') && !self.origin.includes('localhost')
    ? `${self.origin}/api/passkey`
    : 'https://www.fate.cx/api/passkey'

async function api(body: Record<string, unknown>): Promise<Record<string, any>> {
  const res = await fetch(API(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const j = (await res.json().catch(() => ({}))) as Record<string, any>
  if (!res.ok) throw new Error(j.error || `HTTP ${res.status}`)
  return j
}

export function passkeySupported(): boolean {
  return typeof window !== 'undefined' && !!window.PublicKeyCredential
}

/** Create the signature: new passkey, new founder, signed in. */
export async function passkeyRegister(): Promise<void> {
  if (!supa) throw new Error('auth is not configured')
  const { options, chal } = await api({ action: 'regopts' })
  const att = await startRegistration({ optionsJSON: options })
  const { email, pass } = await api({ action: 'register', att, chal })
  const { error } = await supa.auth.signInWithPassword({ email, password: pass })
  if (error) throw new Error(error.message)
}

/** Present the signature: existing passkey, existing biography. */
export async function passkeyLogin(): Promise<void> {
  if (!supa) throw new Error('auth is not configured')
  const { options, chal } = await api({ action: 'authopts' })
  const asr = await startAuthentication({ optionsJSON: options })
  const { email, pass } = await api({ action: 'login', asr, chal })
  const { error } = await supa.auth.signInWithPassword({ email, password: pass })
  if (error) throw new Error(error.message)
}
