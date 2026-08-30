/**
 * /api/passkey — identity without accounts, wallets, or passwords.
 *
 * A passkey (WebAuthn) is the founder's signature: created with a fingerprint
 * at incorporation, presented again to re-enter the biography from any device
 * in the same keychain. One passkey, one life.
 *
 * The bridge to Supabase: each credential maps to one auth user whose password
 * is HMAC(FATE_AUTH_PEPPER, user_id) — releasable only by this endpoint, only
 * after the WebAuthn assertion verifies against the stored public key. The
 * browser then runs a normal signInWithPassword; RLS sees a normal user.
 *
 * POST { action: 'regopts' }                       → registration options + challenge token
 * POST { action: 'register', att, chal }           → { email, pass }  (new founder)
 * POST { action: 'authopts' }                      → assertion options + challenge token
 * POST { action: 'login', asr, chal }              → { email, pass }  (returning founder)
 */
import { createHmac, timingSafeEqual } from 'node:crypto'
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server'
import { createClient } from '@supabase/supabase-js'

const RP_NAME = 'FATE'
// The apex covers www too (RP id scoping); localhost covers dev.
const RP_IDS = ['fate.cx', 'localhost']
const ORIGINS = ['https://fate.cx', 'https://www.fate.cx', 'http://localhost:5173', 'http://localhost:4173']

const b64u = (b: Buffer | Uint8Array): string => Buffer.from(b).toString('base64url')

function hmac(key: string, msg: string): Buffer {
  return createHmac('sha256', key).update(msg).digest()
}

/** Stateless challenge: sign an already-encoded challenge + expiry with the pepper. */
function signChallenge(pepper: string, challenge: string): string {
  const exp = Date.now() + 5 * 60_000
  const sig = b64u(hmac(pepper, `chal|${challenge}|${exp}`))
  return `${challenge}.${exp}.${sig}`
}

function readChallenge(pepper: string, token: unknown): string | null {
  if (typeof token !== 'string') return null
  const [challenge, expStr, sig] = token.split('.')
  if (!challenge || !expStr || !sig) return null
  const exp = Number(expStr)
  if (!Number.isFinite(exp) || Date.now() > exp) return null
  const want = b64u(hmac(pepper, `chal|${challenge}|${exp}`))
  const a = Buffer.from(sig)
  const bb = Buffer.from(want)
  if (a.length !== bb.length || !timingSafeEqual(a, bb)) return null
  return challenge
}

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const pepper = process.env.FATE_AUTH_PEPPER
  const url = process.env.SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE
  if (!pepper || !url || !service) return res.status(500).json({ error: 'server not configured' })
  const admin = createClient(url, service, { auth: { persistSession: false } })

  const body = req.body ?? {}
  const derivedPass = (uid: string): string => b64u(hmac(pepper, `pw|${uid}`))
  const emailOf = (credId: string): string => `${b64u(hmac(pepper, `em|${credId}`)).slice(0, 24).toLowerCase()}@founders.fate.cx`

  try {
    if (body.action === 'regopts') {
      const options = await generateRegistrationOptions({
        rpName: RP_NAME,
        rpID: RP_IDS[0],
        userName: 'founder',
        userDisplayName: 'The Founder',
        attestationType: 'none',
        authenticatorSelection: { residentKey: 'required', userVerification: 'required' },
      })
      return res.status(200).json({ options, chal: signChallenge(pepper, options.challenge) })
    }

    if (body.action === 'register') {
      const challenge = readChallenge(pepper, body.chal)
      if (!challenge) return res.status(400).json({ error: 'stale challenge — try again' })
      const verification = await verifyRegistrationResponse({
        response: body.att,
        expectedChallenge: challenge,
        expectedOrigin: ORIGINS,
        expectedRPID: RP_IDS,
        requireUserVerification: false,
      })
      if (!verification.verified || !verification.registrationInfo)
        return res.status(400).json({ error: 'signature did not verify' })
      const info = verification.registrationInfo
      const credId = info.credential.id
      const pubKey = b64u(info.credential.publicKey)

      // One passkey, one life: an already-registered credential can't re-register.
      const existing = await admin.from('passkeys').select('user_id').eq('cred_id', credId).maybeSingle()
      if (existing.data) return res.status(409).json({ error: 'this passkey already signs a biography — enter instead' })

      const email = emailOf(credId)
      const created = await admin.auth.admin.createUser({ email, email_confirm: true, password: 'x' })
      let uid = created.data.user?.id
      if (!uid) return res.status(502).json({ error: `could not create founder: ${created.error?.message ?? 'unknown'}` })
      const pass = derivedPass(uid)
      await admin.auth.admin.updateUserById(uid, { password: pass })
      const ins = await admin.from('passkeys').insert({
        cred_id: credId,
        user_id: uid,
        public_key: pubKey,
        counter: info.credential.counter ?? 0,
        transports: (body.att?.response?.transports ?? []).join(','),
      })
      if (ins.error) return res.status(502).json({ error: ins.error.message })
      return res.status(200).json({ email, pass })
    }

    if (body.action === 'authopts') {
      const options = await generateAuthenticationOptions({
        rpID: RP_IDS[0],
        userVerification: 'required',
      })
      return res.status(200).json({ options, chal: signChallenge(pepper, options.challenge) })
    }

    if (body.action === 'login') {
      const challenge = readChallenge(pepper, body.chal)
      if (!challenge) return res.status(400).json({ error: 'stale challenge — try again' })
      const credId = typeof body.asr?.id === 'string' ? body.asr.id : ''
      const row = await admin.from('passkeys').select('user_id,public_key,counter').eq('cred_id', credId).maybeSingle()
      if (!row.data) return res.status(404).json({ error: 'this passkey has no biography here — incorporate first' })
      const verification = await verifyAuthenticationResponse({
        response: body.asr,
        expectedChallenge: challenge,
        expectedOrigin: ORIGINS,
        expectedRPID: RP_IDS,
        requireUserVerification: false,
        credential: {
          id: credId,
          publicKey: Buffer.from(row.data.public_key, 'base64url'),
          counter: Number(row.data.counter) || 0,
        },
      })
      if (!verification.verified) return res.status(401).json({ error: 'signature did not verify' })
      await admin
        .from('passkeys')
        .update({ counter: verification.authenticationInfo.newCounter })
        .eq('cred_id', credId)
      return res.status(200).json({ email: emailOf(credId), pass: derivedPass(row.data.user_id) })
    }

    return res.status(400).json({ error: 'unknown action' })
  } catch (err: any) {
    return res.status(502).json({ error: String(err?.message ?? err) })
  }
}
