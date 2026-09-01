/**
 * /api/agent — the synthetic co-founder's registrar.
 *
 * Every paid incorporation includes one agent seat: a machine's life, played
 * on the owner's own model key (client-side — no key ever reaches here), then
 * VERIFIED by replay. The engine is deterministic, so a life is fully
 * described by seed + choice indices; this endpoint replays them through the
 * real engine and writes the ledger row itself. Nobody self-reports a score.
 *
 * POST { jwt, action: 'seat' }                            → { agent_user_id, used, model? }
 * POST { jwt, action: 'submit', seed, choices, model }    → { score, weeks, endings }
 */
import { randomUUID } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
// Prebundled engine (npm run api:engine) — one flat module, no TS tree tracing.
// @ts-expect-error generated at build time
import { CONTENT, newGame, reduce, visibleChoices, auditedScore } from './_engine.js'

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const url = process.env.SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE
  if (!url || !service) return res.status(500).json({ error: 'server not configured' })
  const admin = createClient(url, service, { auth: { persistSession: false } })

  const body = req.body ?? {}
  const jwt = typeof body.jwt === 'string' ? body.jwt : ''
  if (!jwt) return res.status(401).json({ error: 'not signed in' })

  try {
    const who = await admin.auth.getUser(jwt)
    const uid = who.data.user?.id
    if (!uid) return res.status(401).json({ error: 'not signed in' })

    // The seat exists only behind the filing fee.
    const paid = await admin.from('payments').select('tx').eq('user_id', uid).limit(1)
    if (!paid.data?.length) return res.status(402).json({ error: 'the agent seat comes with incorporation — file first' })

    if (body.action === 'seat') {
      const existing = await admin.from('agent_seats').select('agent_user_id,model').eq('user_id', uid).maybeSingle()
      if (existing.data) {
        const row = await admin.from('founders').select('score').eq('user_id', existing.data.agent_user_id).maybeSingle()
        return res.status(200).json({ agent_user_id: existing.data.agent_user_id, used: !!row.data, model: existing.data.model })
      }
      const agentId = randomUUID()
      const ins = await admin.from('agent_seats').insert({ user_id: uid, agent_user_id: agentId })
      if (ins.error) return res.status(502).json({ error: ins.error.message })
      return res.status(200).json({ agent_user_id: agentId, used: false })
    }

    if (body.action === 'submit') {
      const seat = await admin.from('agent_seats').select('agent_user_id').eq('user_id', uid).maybeSingle()
      if (!seat.data) return res.status(400).json({ error: 'no seat issued' })
      const agentId = seat.data.agent_user_id as string
      const prior = await admin.from('founders').select('score').eq('user_id', agentId).maybeSingle()
      if (prior.data) return res.status(409).json({ error: 'this seat already lived its one life' })

      const seed = Number(body.seed) >>> 0
      const choices = body.choices
      const model = typeof body.model === 'string' ? body.model.slice(0, 48) : ''
      if (!Array.isArray(choices) || choices.length === 0 || choices.length > 3000 || choices.some((c: unknown) => typeof c !== 'number'))
        return res.status(400).json({ error: 'bad choice log' })

      // ---- the replay: the only scorekeeper is the engine itself ------------
      let st = newGame(CONTENT, seed)
      let i = 0
      let guard = 0
      while (st.phase !== 'complete' && guard++ < 5000) {
        if (st.phase === 'playing') {
          const legal = visibleChoices(CONTENT, st)
          if (!legal.length) return res.status(422).json({ error: `replay stuck at ${st.company.queue[0]}` })
          const idx = choices[i++]
          if (idx === undefined) return res.status(422).json({ error: 'choice log ended before the life did' })
          if (!legal.includes(idx)) return res.status(422).json({ error: `illegal choice ${idx} at step ${i}` })
          st = reduce(CONTENT, st, { t: 'choose', index: idx })
        } else if (st.phase === 'epilogue') {
          st = reduce(CONTENT, st, { t: 'foundNext' })
        } else break
      }
      if (st.phase !== 'complete') return res.status(422).json({ error: 'life did not complete' })
      if (i !== choices.length) return res.status(422).json({ error: 'choice log longer than the life' })

      const score = auditedScore(st)
      const endings = st.ledger.completed.map((x) => `${x.company}:${x.endingId}`)
      const label = `BOT ${String(seed % 1000000).padStart(6, '0')}`
      const up = await admin.from('founders').upsert({
        user_id: agentId,
        wallet: label,
        chain: 'agent',
        cohort: 'agent',
        model: model || null,
        owner: uid,
        score,
        chapters: st.ledger.completed.length,
        weeks: st.epoch,
        endings,
        updated_at: new Date().toISOString(),
      })
      if (up.error) return res.status(502).json({ error: up.error.message })
      await admin.from('agent_seats').update({ model: model || null }).eq('user_id', uid)
      return res.status(200).json({ ok: true, label, score, weeks: st.epoch, endings })
    }

    return res.status(400).json({ error: 'unknown action' })
  } catch (err: any) {
    return res.status(502).json({ error: String(err?.message ?? err) })
  }
}
