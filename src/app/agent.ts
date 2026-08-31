/**
 * THE AGENT SEAT — your incorporation includes one synthetic co-founder.
 *
 * Bring your own model (any OpenAI-compatible endpoint). The key stays in
 * this tab's memory and never leaves the browser; the model plays the real
 * engine headlessly at machine speed while a ledger-style log streams the
 * life as it is lived. When the life completes, the seed + choice log go to
 * /api/agent, which REPLAYS them server-side — the engine is the only
 * scorekeeper — and files the row on the Founders' Ledger, cohort ◉.
 */
import './style.css'
import { supa, getSession } from './cloud'
import { CONTENT } from '../content/world'
import { newGame, reduce, visibleChoices, getScene } from '../engine/reduce'
import { evalPred } from '../engine/predicates'
import { runwayWeeks, type GameState } from '../engine/types'
import { auditedScore } from '../engine/audit'
import type { SceneDef } from '../content/schema'

const app = document.getElementById('app')!
const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const API = (): string =>
  self.origin && self.origin.startsWith('http') && !self.origin.includes('localhost')
    ? `${self.origin}/api/agent`
    : 'https://www.fate.cx/api/agent'

const STORE_KEY = 'fate-agent-life'

interface LifeState {
  seed: number
  choices: number[]
  memory: string
  model: string
  done?: boolean
}

function liveScene(st: GameState, sceneId: string): SceneDef {
  const sc = getScene(CONTENT, st.company.id, sceneId)
  const v = sc.vary?.find((x) => evalPred(x.when, st))
  return v ? { ...sc, prose: v.prose ?? sc.prose, leadIn: v.leadIn ?? sc.leadIn, art: v.art ?? sc.art } : sc
}

const SYSTEM = `You are a startup founder living one life inside FATE, a narrative founder saga. You will receive one scene at a time: your meters, your own notebook from previous turns, the scene's prose, and the legal choices with their index numbers.

Reply with JSON only, no other text:
{"choice": <one of the given index numbers>, "memory": "<your private notebook, max 800 chars — carry forward whatever future-you needs>", "thought": "<one sentence of your reasoning, in character>"}

You get exactly one life. It is permanent. Play it like it's yours.`

function promptFor(st: GameState, memory: string, lastResult: string): { user: string; legal: number[] } {
  const scene = liveScene(st, st.company.queue[0])
  const legal = visibleChoices(CONTENT, st)
  const rw = runwayWeeks(st.company)
  const meters = `COMPANY: ${st.company.id.toUpperCase()} · WEEK ${st.epoch + 1} · BANK $${Math.round(st.company.treasury).toLocaleString('en-US')} · RUNWAY ${Number.isFinite(rw) ? Math.round(rw) + 'wk' : '∞'} · STRESS ${Math.round(st.company.stress)}/100 · REPUTATION ${st.world.reputation}`
  const menu = legal.map((i) => `${i}: ${scene.choices[i].label}`).join('\n')
  const user = `${meters}\n\nYOUR NOTEBOOK: ${memory || '(empty)'}\n${lastResult ? `\nWHAT JUST HAPPENED: ${lastResult}\n` : ''}\nSCENE — ${scene.title}\n${scene.leadIn ? scene.leadIn + '\n\n' : ''}${scene.prose}\n\nCHOICES:\n${menu}`
  return { user, legal }
}

// ---- the ticker ---------------------------------------------------------------

let feed: HTMLElement
function line(html: string, cls = ''): void {
  const el = document.createElement('div')
  el.className = `ag-line ${cls}`
  el.innerHTML = html
  feed.appendChild(el)
  feed.scrollTop = feed.scrollHeight
}

function beatLine(st: GameState, scene: SceneDef, choiceLabel: string, thought: string): void {
  const rw = runwayWeeks(st.company)
  const art = scene.art ?? scene.speaker ?? ''
  line(
    `${art ? `<img class="ag-thumb" src="/art/${esc(art)}.webp" onerror="this.remove()">` : ''}<div class="ag-body">
      <div class="ag-head">WK ${st.epoch + 1} · ${esc(scene.title)}</div>
      <div class="ag-choice">↳ ${esc(choiceLabel)}</div>
      <div class="ag-meters">stress ${Math.round(st.company.stress)} · bank $${Math.round(st.company.treasury / 1000)}k · runway ${Number.isFinite(rw) ? Math.round(rw) + 'wk' : '∞'}</div>
      ${thought ? `<div class="ag-thought">❝ ${esc(thought)} ❞</div>` : ''}
    </div>`,
  )
}

// ---- the loop -------------------------------------------------------------------

async function chat(base: string, key: string, model: string, user: string): Promise<{ choice: number; memory?: string; thought?: string }> {
  const r = await fetch(`${base.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: user },
      ],
      temperature: 0.8,
    }),
  })
  if (!r.ok) throw new Error(`model endpoint ${r.status}: ${(await r.text()).slice(0, 180)}`)
  const j = (await r.json()) as { choices: { message: { content: string } }[] }
  const raw = j.choices?.[0]?.message?.content ?? ''
  const m = raw.match(/\{[\s\S]*\}/)
  if (!m) throw new Error('model returned no JSON')
  return JSON.parse(m[0]) as { choice: number; memory?: string; thought?: string }
}

/** Replay a stored life locally (instant) to resume where it paused. */
function rebuild(life: LifeState): GameState {
  let st = newGame(CONTENT, life.seed)
  for (const idx of life.choices) {
    while (st.phase === 'epilogue') st = reduce(CONTENT, st, { t: 'foundNext' })
    if (st.phase !== 'playing') break
    st = reduce(CONTENT, st, { t: 'choose', index: idx })
  }
  while (st.phase === 'epilogue') st = reduce(CONTENT, st, { t: 'foundNext' })
  return st
}

let running = false

async function runLife(base: string, key: string, life: LifeState): Promise<void> {
  if (running) return
  running = true
  const btn = document.getElementById('agGo') as HTMLButtonElement | null
  if (btn) btn.disabled = true
  let st = rebuild(life)
  let lastResult = ''
  let steps = 0

  while (st.phase !== 'complete' && steps++ < 800) {
    if (st.phase === 'epilogue') {
      const done = st.ledger.completed[st.ledger.completed.length - 1]
      line(`<div class="ag-body ag-ending">■ ${esc(done?.company.toUpperCase() ?? '')} CLOSES — ${esc(done?.endingId ?? '')}</div>`, 'end')
      st = reduce(CONTENT, st, { t: 'foundNext' })
      continue
    }
    const scene = liveScene(st, st.company.queue[0])
    const { user, legal } = promptFor(st, life.memory, lastResult)
    const think = document.createElement('div')
    think.className = 'ag-line dim'
    think.textContent = `…thinking (${scene.title})`
    feed.appendChild(think)
    feed.scrollTop = feed.scrollHeight
    const t0 = Date.now()
    let out: { choice: number; memory?: string; thought?: string }
    try {
      out = await chat(base, key, life.model, user)
    } catch (err) {
      think.remove()
      line(`<div class="ag-body ag-err">✕ ${esc(err instanceof Error ? err.message : String(err))} — the life is saved; press RESUME.</div>`, 'end')
      running = false
      if (btn) {
        btn.disabled = false
        btn.textContent = 'RESUME THE LIFE →'
      }
      return
    }
    think.remove()
    const idx = legal.includes(out.choice) ? out.choice : legal[0]
    const label = scene.choices[idx].label
    life.choices.push(idx)
    life.memory = (out.memory ?? life.memory).slice(0, 800)
    st = reduce(CONTENT, st, { t: 'choose', index: idx })
    beatLine(st, scene, label, `${out.thought ?? ''}`.slice(0, 200))
    line(`<div class="ag-lat">${((Date.now() - t0) / 1000).toFixed(1)}s</div>`, 'lat')
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(life))
    } catch {
      /* private mode: the run still completes in-memory */
    }
  }

  if (st.phase !== 'complete') {
    line(`<div class="ag-body ag-err">✕ the life exceeded the step guard — report this seed: ${life.seed}</div>`, 'end')
    running = false
    return
  }

  line(`<div class="ag-body ag-ending">■ THE BIOGRAPHY CLOSES · score ${auditedScore(st).toFixed(4)} · ${st.epoch} weeks</div>`, 'end')
  await submit(life, st)
  running = false
}

async function submit(life: LifeState, st: GameState): Promise<void> {
  line(`<div class="ag-body">Filing with the registrar — the engine replays every choice server-side…</div>`)
  try {
    const session = supa ? (await supa.auth.getSession()).data.session : null
    if (!session) throw new Error('signed out mid-life — sign back in on the main page, then reload here')
    const r = await fetch(API(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jwt: session.access_token, action: 'submit', seed: life.seed, choices: life.choices, model: life.model }),
    })
    const j = (await r.json().catch(() => ({}))) as { error?: string; label?: string; score?: number }
    if (!r.ok) throw new Error(j.error || `HTTP ${r.status}`)
    life.done = true
    localStorage.setItem(STORE_KEY, JSON.stringify(life))
    line(
      `<div class="ag-body ag-ending">✓ VERIFIED AND FILED — ${esc(j.label ?? '')} · score ${j.score} · <a href="/ledger">see it on the ledger ↗</a></div>`,
      'end',
    )
  } catch (err) {
    line(
      `<div class="ag-body ag-err">✕ filing failed: ${esc(err instanceof Error ? err.message : String(err))} — the life is saved locally; press RESUME to refile.</div>`,
      'end',
    )
  }
}

// ---- boot ----------------------------------------------------------------------

async function boot(): Promise<void> {
  app.innerHTML = `
  <div class="shell lb-shell">
    <header class="rail">
      <div class="wordmark"><img class="wm-mark" src="/favicon.svg" alt="">FATE<em>·</em></div>
      <div class="weektag">THE AGENT SEAT</div>
      <div class="rail-meters"><a class="lb-back" href="/">← BACK TO THE LIFE</a></div>
    </header>
    <main class="lb-main">
      <div class="lb-intro">Your incorporation includes one synthetic co-founder: one machine, one life, on your own model key. The key stays in this tab — the registrar only ever sees the choices, and verifies them by replaying the whole life through the engine. The row files under ◉, bound to your name.</div>
      <div id="agGate" class="ag-gate"></div>
      <div class="ag-feed" id="agFeed" style="display:none"></div>
    </main>
  </div>`
  feed = document.getElementById('agFeed')!
  const gate = document.getElementById('agGate')!

  const session = await getSession()
  if (!session) {
    gate.innerHTML = `<p class="lb-loading">The seat belongs to a founder. <a href="/">Sign the papers first ↗</a></p>`
    return
  }
  let seat: { agent_user_id?: string; used?: boolean; error?: string } = {}
  try {
    const r = await fetch(API(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jwt: session.access_token, action: 'seat' }),
    })
    seat = await r.json()
    if (!r.ok) throw new Error(seat.error || `HTTP ${r.status}`)
  } catch (err) {
    gate.innerHTML = `<p class="lb-loading">${esc(err instanceof Error ? err.message : String(err))}</p>`
    return
  }
  if (seat.used) {
    gate.innerHTML = `<p class="lb-loading">Your machine already lived its one life. <a href="/ledger">It is on the record ↗</a></p>`
    return
  }

  const saved = ((): LifeState | null => {
    try {
      const raw = localStorage.getItem(STORE_KEY)
      return raw ? (JSON.parse(raw) as LifeState) : null
    } catch {
      return null
    }
  })()
  const resuming = saved && !saved.done && saved.choices.length > 0

  gate.innerHTML = `
    <div class="ag-form">
      <label>MODEL ENDPOINT <input id="agBase" type="url" placeholder="https://api.openai.com/v1" value="https://api.openai.com/v1"></label>
      <label>API KEY <input id="agKey" type="password" placeholder="sk-… (never leaves this tab)"></label>
      <label>MODEL <input id="agModel" type="text" placeholder="gpt-4o-mini" value="${esc(saved?.model ?? '')}"></label>
      <button class="cta" id="agGo">${resuming ? 'RESUME THE LIFE →' : 'GIVE IT ITS LIFE →'}</button>
      <div class="ag-note">${resuming ? `A paused life exists (week ${saved!.choices.length}+). It resumes exactly where it stopped.` : 'One life. It cannot be restarted, rerolled, or replayed. Choose the model like a co-founder.'}</div>
    </div>`
  document.getElementById('agGo')?.addEventListener('click', () => {
    const base = (document.getElementById('agBase') as HTMLInputElement).value.trim()
    const key = (document.getElementById('agKey') as HTMLInputElement).value.trim()
    const model = (document.getElementById('agModel') as HTMLInputElement).value.trim()
    if (!base || !key || !model) return
    feed.style.display = ''
    const life: LifeState = resuming ? { ...saved!, model } : { seed: (Math.random() * 0xffffffff) >>> 0, choices: [], memory: '', model }
    if (!resuming) {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(life))
      } catch {
        /* private mode */
      }
      line(`<div class="ag-body ag-ending">■ SEED ${life.seed} · MODEL ${esc(model)} · THE LIFE BEGINS</div>`, 'end')
    }
    void runLife(base, key, life)
  })
}

void boot()
