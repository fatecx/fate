/**
 * The filing fee — paid once, on Whop, and written to the record.
 *
 * The embedded checkout fires onComplete(planId, receiptId); the receipt goes
 * to /api/whop with this founder's access token, the server verifies it
 * against Whop's API and writes the payments row. A receipt that confirmed
 * but failed to land (network, closed tab) waits in localStorage and is
 * claimed on the next visit.
 */
import { supa } from './cloud'

export const WHOP_PLAN_ID = 'plan_oXvp9t9S4YzeQ'
const RECEIPT_KEY = 'fate-fee-receipt'

const API = (): string =>
  self.origin && self.origin.startsWith('http') && !self.origin.includes('localhost')
    ? `${self.origin}/api/whop`
    : 'https://www.fate.cx/api/whop'

/** True when this founder has a payment on the record. */
export async function hasPaid(): Promise<boolean> {
  return (await feeCents()) !== null
}

/**
 * What the fee actually settled at, in cents — null when no payment is on
 * record. Promo codes make this less than 2000; a 100%-off code makes it 0,
 * and a $0 filing has nothing to withdraw.
 */
export async function feeCents(): Promise<number | null> {
  if (!supa) return null
  try {
    const { data } = await supa.from('payments').select('amount').limit(1)
    if (!data?.length) return null
    const n = Number((data[0] as { amount?: unknown }).amount)
    return Number.isFinite(n) && n >= 0 ? n : 2000
  } catch {
    return null
  }
}

/** Verify a fresh receipt server-side and write the payments row. */
export async function claimFeeReceipt(receipt: string): Promise<void> {
  if (!supa) throw new Error('auth is not configured')
  const session = (await supa.auth.getSession()).data.session
  if (!session) throw new Error('not signed in')
  try {
    localStorage.setItem(RECEIPT_KEY, JSON.stringify({ receipt, uid: session.user.id }))
  } catch {
    /* private mode — the claim below still runs */
  }
  const res = await fetch(API(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ receipt, jwt: session.access_token }),
  })
  const j = (await res.json().catch(() => ({}))) as { error?: string }
  if (!res.ok) throw new Error(j.error || `HTTP ${res.status}`)
  try {
    localStorage.removeItem(RECEIPT_KEY)
  } catch {
    /* ignore */
  }
}

/** A confirmed fee whose row never landed gets claimed on the next visit. */
export async function claimPendingFee(): Promise<boolean> {
  try {
    const raw = localStorage.getItem(RECEIPT_KEY)
    if (!raw || !supa) return false
    const r = JSON.parse(raw) as { receipt?: string; uid?: string }
    const session = (await supa.auth.getSession()).data.session
    if (!r?.receipt || !session || r.uid !== session.user.id) return false
    await claimFeeReceipt(r.receipt)
    return true
  } catch {
    return false
  }
}
