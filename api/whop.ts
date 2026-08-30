/**
 * /api/whop — the filing fee's receipt desk.
 *
 * The browser's embedded Whop checkout fires onComplete(planId, receiptId);
 * the client posts that receipt here with its Supabase access token. This
 * endpoint verifies the payment against Whop's API (server key, never in the
 * browser), confirms the plan and its status, then writes the payments row
 * with the service role. A receipt can be claimed exactly once.
 *
 * POST { receipt, jwt } → { ok: true }
 */
import { createClient } from '@supabase/supabase-js'

const PLAN_ID = 'plan_oXvp9t9S4YzeQ'

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const whopKey = process.env.WHOP_API_KEY
  const url = process.env.SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE
  if (!whopKey || !url || !service) return res.status(500).json({ error: 'server not configured' })

  const receipt = typeof req.body?.receipt === 'string' ? req.body.receipt : ''
  const jwt = typeof req.body?.jwt === 'string' ? req.body.jwt : ''
  if (!/^[a-zA-Z0-9_-]{4,80}$/.test(receipt) || !jwt) return res.status(400).json({ error: 'bad request' })

  const admin = createClient(url, service, { auth: { persistSession: false } })

  try {
    // Whose fee is this? The caller proves who they are with their own token.
    const who = await admin.auth.getUser(jwt)
    const uid = who.data.user?.id
    if (!uid) return res.status(401).json({ error: 'not signed in' })

    // Ask Whop about the receipt. v5 first; v2 as the fallback dialect.
    let paid = false
    let plan = ''
    for (const path of [`/api/v5/company/payments/${receipt}`, `/api/v2/payments/${receipt}`]) {
      const r = await fetch(`https://api.whop.com${path}`, {
        headers: { Authorization: `Bearer ${whopKey}` },
      })
      if (!r.ok) continue
      const j = (await r.json()) as Record<string, any>
      plan = j.plan_id ?? j.plan?.id ?? j.data?.plan_id ?? ''
      const status = String(j.status ?? j.data?.status ?? '')
      paid = ['paid', 'succeeded', 'successful', 'completed'].includes(status.toLowerCase())
      if (plan || paid) break
    }
    if (!paid) return res.status(402).json({ error: 'Whop has no settled payment under that receipt' })
    if (plan && plan !== PLAN_ID) return res.status(402).json({ error: 'receipt is for a different product' })

    // One receipt, one founder — first claim wins, replays are no-ops for the same founder.
    const prior = await admin.from('payments').select('user_id').eq('tx', receipt).maybeSingle()
    if (prior.data && prior.data.user_id !== uid)
      return res.status(409).json({ error: 'this receipt already incorporated another founder' })

    const ins = await admin.from('payments').upsert(
      { user_id: uid, wallet: '', payer: 'whop', chain: 'whop', tx: receipt, asset: 'usd', amount: 2000 },
      { onConflict: 'user_id' },
    )
    if (ins.error) return res.status(502).json({ error: ins.error.message })
    return res.status(200).json({ ok: true })
  } catch (err: any) {
    return res.status(502).json({ error: String(err?.message ?? err) })
  }
}
