/**
 * /api/refund — THE FILING GUARANTEE, honored by machine.
 *
 * A founder may withdraw the filing any time before their first company's
 * papers are stamped (legal_solid / lawyer_ally / diy_legal). The server is
 * the judge: it reads the cloud save, verifies the life is still pre-stamp,
 * refunds the Whop payment in full, and dissolves the record — the payments
 * row and the save are deleted. A withdrawn venture was never incorporated;
 * the fiction requires that it leaves no trace.
 *
 * POST { jwt } → { ok: true }
 */
import { createClient } from '@supabase/supabase-js'

const STAMPS = ['legal_solid', 'lawyer_ally', 'diy_legal']

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
  const admin = createClient(url, service, { auth: { persistSession: false } })

  const jwt = typeof req.body?.jwt === 'string' ? req.body.jwt : ''
  if (!jwt) return res.status(401).json({ error: 'not signed in' })

  try {
    const who = await admin.auth.getUser(jwt)
    const uid = who.data.user?.id
    if (!uid) return res.status(401).json({ error: 'not signed in' })

    const pay = await admin.from('payments').select('tx,chain,amount').eq('user_id', uid).maybeSingle()
    if (!pay.data) return res.status(400).json({ error: 'no filing fee on record' })
    if (pay.data.chain !== 'whop')
      return res.status(400).json({ error: 'this filing predates the guarantee — write to dev@fate.cx' })
    // A fee waived in full (100% promo) moved no money; the filing is simply permanent.
    if (Number(pay.data.amount) === 0)
      return res.status(400).json({ error: 'the fee was waived — there is nothing to return' })

    // The judge reads the record: still the first company, still unstamped.
    const save = await admin.from('saves').select('state').eq('user_id', uid).maybeSingle()
    if (save.data?.state) {
      const st = save.data.state as {
        company?: { id?: string; flags?: Record<string, unknown> }
        ledger?: { completed?: unknown[] }
      }
      const stamped = STAMPS.some((f) => st.company?.flags?.[f] === true)
      const closed = (st.ledger?.completed?.length ?? 0) > 0
      const moved = st.company?.id && st.company.id !== 'hyperchute'
      if (stamped || closed || moved)
        return res.status(409).json({ error: 'the papers are stamped — the filing is permanent now' })
    }

    // The agent seat is part of the filing: a used seat means value delivered.
    const seat = await admin.from('agent_seats').select('agent_user_id').eq('user_id', uid).maybeSingle()
    if (seat.data) {
      const agentRow = await admin.from('founders').select('score').eq('user_id', seat.data.agent_user_id).maybeSingle()
      if (agentRow.data)
        return res.status(409).json({ error: 'your agent seat already lived its life — the filing is spent' })
    }

    // Full refund through Whop; the money goes back the way it came.
    let refunded = false
    let lastErr = ''
    for (const path of [
      `/api/v1/payments/${pay.data.tx}/refund`,
      `/api/v2/payments/${pay.data.tx}/refund`,
      `/api/v5/company/payments/${pay.data.tx}/refund`,
    ]) {
      const r = await fetch(`https://api.whop.com${path}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${whopKey}`, 'Content-Type': 'application/json' },
        body: '{}',
      })
      if (r.ok) {
        refunded = true
        break
      }
      lastErr = `${r.status} ${(await r.text()).slice(0, 120)}`
      if (r.status === 400 && /already|refunded/i.test(lastErr)) {
        refunded = true // idempotent retry after a half-completed withdrawal
        break
      }
    }
    if (!refunded) return res.status(502).json({ error: `the processor declined the refund (${lastErr}) — write to dev@fate.cx` })

    // The record dissolves: no fee, no biography, no ledger row, no seat.
    await admin.from('saves').delete().eq('user_id', uid)
    await admin.from('payments').delete().eq('user_id', uid)
    await admin.from('founders').delete().eq('user_id', uid)
    await admin.from('agent_seats').delete().eq('user_id', uid)
    return res.status(200).json({ ok: true })
  } catch (err: any) {
    return res.status(502).json({ error: String(err?.message ?? err) })
  }
}
