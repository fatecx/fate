/**
 * FATE play surface — split stage per DESIGN.md §8.
 * The engine decides; this file only renders true state and forwards choices.
 */
import './style.css'
import { CONTENT } from '../content/world'
import { FILLERS, BLUR_FILLERS } from '../content/fillers'
import { newGame, reduce, getScene, choiceLegal, spendBlocked } from '../engine/reduce'
import { evalPred } from '../engine/predicates'
import type { Effect } from '../engine/effects'
import type { GameState } from '../engine/types'
import { runwayWeeks } from '../engine/types'
import type { Session } from '@supabase/supabase-js'
import { cloudLoad, cloudPush, pickSave, getSession, signOut, walletLabel, walletAddress, walletChain } from './cloud'
import { initWalletDiscovery, listWallets } from './wallet'
import { lockCopy } from './locks'
import { makeFmt } from '../../scripts/map/format'

const LEGACY_SAVE_KEY = 'fate-save-v2'
const THEME_KEY = 'fate-theme'

function saveKey(uid: string): string {
  return `fate-save-u-${uid}`
}

interface BeatRec {
  kind: 'scene' | 'you' | 'outcome' | 'week' | 'chapter'
  title?: string
  speakerName?: string
  prose?: string
  leadIn?: string
  filler?: string
  text?: string
  company?: string
  endingTitle?: string
  span?: string
  stake?: string
}

interface Save {
  st: GameState
  transcript: BeatRec[]
}

const app = document.getElementById('app')!

let transcript: BeatRec[] = []
let st: GameState
let typing = false
let session: Session | null = null

// ---- persistence -----------------------------------------------------------
// The signed founder's biography: localStorage cache + cloud row, immutable.

function persist(): void {
  if (!session) return
  const blob = { st, transcript } satisfies Save
  try {
    localStorage.setItem(saveKey(session.user.id), JSON.stringify(blob))
  } catch {
    /* private mode etc. — the cloud copy still carries the game */
  }
  cloudPush(blob)
}

function load(uid: string): Save | null {
  try {
    const raw = localStorage.getItem(saveKey(uid))
    if (!raw) return null
    const s = JSON.parse(raw) as Save
    if (!s?.st?.company || s.st.phase === undefined) return null
    return s
  } catch {
    return null
  }
}

function clearSave(): void {
  if (!session) return
  try {
    localStorage.removeItem(saveKey(session.user.id))
  } catch {
    /* ignore */
  }
}

// ---- theme -------------------------------------------------------------------

function themeSetting(): 'auto' | 'light' | 'dark' {
  try {
    const t = localStorage.getItem(THEME_KEY)
    return t === 'light' || t === 'dark' ? t : 'auto'
  } catch {
    return 'auto'
  }
}

function applyTheme(): void {
  const t = themeSetting()
  if (t === 'auto') delete document.documentElement.dataset.theme
  else document.documentElement.dataset.theme = t
}

function cycleTheme(): void {
  const order = ['auto', 'light', 'dark'] as const
  const next = order[(order.indexOf(themeSetting()) + 1) % order.length]
  try {
    if (next === 'auto') localStorage.removeItem(THEME_KEY)
    else localStorage.setItem(THEME_KEY, next)
  } catch {
    /* ignore */
  }
  applyTheme()
}

// ---- helpers ---------------------------------------------------------------

const CHAPTERS = ['hyperchute', 'teleport', 'skyline', 'escape'] as const

function chapterTitle(id: string): string {
  return CONTENT.chapters[id as keyof typeof CONTENT.chapters].title
}

function nextChapterName(): string {
  const next = CHAPTERS[st.chapter + 1]
  return CONTENT.chapters[next].title
}

function hueFor(id: string): number {
  let h = 0
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 360
  return h
}

function fmtRunway(): string {
  const rw = runwayWeeks(st.company)
  return Number.isFinite(rw) ? String(Math.max(1, Math.ceil(rw))) : '∞'
}

function fuseInfo(): { remaining: number; total: number } | null {
  const sceneId = st.company.queue[0]
  const f = st.company.fuses.find((x) => x.sceneId === sceneId)
  const def = getScene(CONTENT, st.company.id, sceneId)
  if (!f || !def) return null
  return { remaining: Math.max(1, f.expiresEpoch - st.epoch), total: def.fuseEpochs ?? 1 }
}

/**
 * One authored line of world texture for a turned week. Deterministic:
 * same life, same week -> same line (epoch × seed hash over the eligible
 * pool). The renderer never rolls dice; it only reads state.
 */
function weekFillerText(deltaWeeks: number): string {
  const pool =
    deltaWeeks > 2
      ? BLUR_FILLERS.slice()
      : FILLERS.filter((f) => !f.when || evalPred(f.when, st))
  const src = pool.length ? pool : FILLERS.filter((f) => !f.when)
  if (!src.length) return ''
  const h = (Math.imul(st.epoch + 1, 2654435761) ^ st.seed) >>> 0
  return src[h % src.length].text
}

// ---- ambient canvas (cheap aliveness; respects reduced motion) -------------

function startAmbient(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let w = 0
  let h = 0
  const resize = (): void => {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio
    h = canvas.height = canvas.offsetHeight * devicePixelRatio
  }
  resize()
  window.addEventListener('resize', resize)
  const dots = Array.from({ length: 42 }, () => ({
    x: Math.random(),
    y: Math.random(),
    v: 0.00015 + Math.random() * 0.0004,
    r: (0.6 + Math.random() * 1.6) * devicePixelRatio,
  }))
  if (reduced) {
    drawFrame(0)
    return
  }
  let t = 0
  ;(function loop() {
    if (!canvas.isConnected) return // card was replaced; let this loop die
    t += 1
    drawFrame(t)
    requestAnimationFrame(loop)
  })()
  function drawFrame(time: number): void {
    ctx!.clearRect(0, 0, w, h)
    for (const d of dots) {
      const y = (d.y + time * d.v) % 1
      ctx!.fillStyle = `hsla(${hueFor(st?.company.id ?? 'fate')},30%,60%,0.20)`
      ctx!.beginPath()
      ctx!.arc(d.x * w, y * h, d.r, 0, Math.PI * 2)
      ctx!.fill()
    }
  }
}

// ---- render -----------------------------------------------------------------

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function railHtml(): string {
  const rw = runwayWeeks(st.company)
  const danger = rw < 10
  const arrears = st.company.treasury < 0
  const stress = Math.round(st.company.stress)
  const rep = st.world.reputation
  const cells = Array.from({ length: 10 }, (_, k) => {
    const filled = stress > k * 10
    return `<i class="${filled ? (k >= 7 ? 'on hot' : 'on') : ''}"></i>`
  }).join('')
  const runwayBlock = arrears
    ? `<div class="runway danger"><b>—</b><span>IN<br/>ARREARS</span></div>`
    : `<div class="runway ${danger ? 'danger' : ''}"><b>${fmtRunway()}</b><span>RUNWAY<br/>WEEKS</span></div>`
  return `
  <header class="rail">
    <div class="wordmark">FATE<em>·</em></div>
    <div class="weektag">WEEK ${st.epoch + 1}</div>
    <div class="rail-meters">
      ${runwayBlock}
      <div class="stressbox">
        <div class="mlabel"><span>STRESS</span><span>${stress}</span></div>
        <div class="stresscells">${cells}</div>
      </div>
      <div class="repchip" title="Bank balance">${fmtMoney(st.company.treasury)}</div>
      <div class="repchip" title="Credibility — opens and closes doors across your whole life">CRED ${rep >= 0 ? '+' : ''}${rep}</div>
      <button class="chap" id="coToggle" title="Company papers, account, settings"><span class="chap-label">${esc(chapterTitle(st.company.id))}, INC. ▾</span></button>
    </div>
  </header>`
}

/** Re-render just the meter rail (called after every in-place choice). */
function refreshRail(): void {
  const rail = document.querySelector('.rail')
  if (rail) rail.outerHTML = railHtml()
}

// ---- incorporation paper -----------------------------------------------------

const BANKS: Record<string, string> = {
  hyperchute: 'First Flats Savings & Loan',
  teleport: 'Ceres Federal Trust',
  skyline: 'Anchor & Vantage',
  escape: 'Imbrium Reserve',
}

function fmtMoney(n: number): string {
  const abs = Math.abs(n)
  const s = abs >= 1_000_000 ? `$${(abs / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1)}M` : `$${Math.round(abs / 1000)}k`
  return (n < 0 ? '−' : '') + s
}

function founderPct(): string {
  const f = st.company.capTable.find((s) => s.who === 'founder')
  return String(Math.round(f?.pct ?? 100))
}

function incDate(): string {
  const base = new Date(2031, 2, 3) // the fiction's calendar
  const d = new Date(base.getTime() + (st.company.foundedEpoch - 0) * 7 * 86400_000)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function counselLine(): string {
  const f = st.company.flags
  if (f['lawyer_ally']) return 'Tomás Reyes <span class="dim">— of counsel, 1%</span>'
  if (f['legal_solid']) return 'Tomás Reyes <span class="dim">— retained</span>'
  if (f['diy_legal']) return 'Pro se <span class="dim">— downloaded templates</span>'
  return 'None yet'
}

function advisorLine(): string {
  const stake = st.company.capTable.find((s) => s.who === 'priya')?.pct ?? 0
  if (stake > 0) return `Priya Raghavan <span class="dim">— ${stake.toFixed(stake % 1 ? 1 : 0)}%</span>`
  if (st.company.flags['priya_waitlist']) return 'Priya Raghavan <span class="dim">— waitlisted</span>'
  return 'None yet'
}

function teamLine(): string {
  const hires: string[] = []
  if (st.company.flags['sofia_resolved']) {
    const mode = st.company.flags['sofia_full'] ? 'full-time' : st.company.flags['sofia_equity'] ? '3 pts' : 'contract'
    hires.push(`Sofia Brandt <span class="dim">— flight controls, ${mode}</span>`)
  }
  return hires.length ? hires.join('<br>') : 'Just you'
}

function capTableLines(): string {
  return st.company.capTable
    .slice()
    .sort((a, b) => b.pct - a.pct)
    .map((s) => {
      const label = s.who === 'founder' ? 'You' : (CONTENT.characters[s.who]?.name ?? s.who)
      return `<div class="capline"><span>${esc(label)}</span><span>${s.pct.toFixed(s.pct % 1 ? 1 : 0)}%</span></div>`
    })
    .join('')
}

function incPanelHtml(): string {
  const c = st.company
  return `
  <div class="inc-title">${esc(chapterTitle(c.id))}, INC.</div>
  <div class="inc-grid">
    <span>Incorporated</span><b>${incDate()}</b>
    <span>Founder</span><b>You <span class="dim">— ${founderPct()}% stake</span></b>
    <span>Bank</span><b>${BANKS[c.id] ?? '—'} <span class="dim">· ${fmtMoney(c.treasury)}</span></b>
    <span>Counsel</span><b>${counselLine()}</b>
    <span>Advisor</span><b>${advisorLine()}</b>
    <span>Team</span><b>${teamLine()}</b>
  </div>
  <div class="inc-cap"><div class="mlabel" style="margin-bottom:6px"><span>CAP TABLE</span><span>${fmtRunway()} WKS RUNWAY</span></div>${capTableLines()}</div>`
}

// Dev tools (restart) ship only while VITE_DEV_TOOLS=1; launch = delete the var.
const DEV_TOOLS = (import.meta.env.VITE_DEV_TOOLS as string | undefined) === '1'

/** Account + settings section of the company dropdown. One wallet, one life. */
function accountHtml(): string {
  const addr = session ? walletAddress(session) : ''
  const chain = session ? walletChain(session) : ''
  const who = addr
    ? `<b class="addr">${esc(addr)}${chain ? ` <span class="dim">· ${esc(chain.toUpperCase())}</span>` : ''}</b>`
    : `<b>—</b>`
  return `
  <div class="inc-account">
    <div class="inc-grid">
      <span>Founder ID</span>${who}
      <span>Theme</span><b><button class="paction inline" id="actTheme">${themeSetting().toUpperCase()}</button></b>
    </div>
    <div class="pactions">
      <button class="paction" id="actLogout">LOG OUT</button>
      ${st?.phase === 'playing' ? `<button class="paction danger" id="actSurrender">DECLARE BANKRUPTCY</button>` : ''}
      ${DEV_TOOLS ? `<button class="paction danger" id="actDevRestart">RESTART (DEV)</button>` : ''}
    </div>
    <div class="inc-law">One wallet, one life. The biography is permanent.</div>
  </div>`
}

function transcriptHtml(): string {
  // The whole transcript is history — render fully, faded; nothing hides on hover.
  return transcript
    .map((b) => {
      switch (b.kind) {
        case 'chapter':
          return `<section class="memoir past">
            <div class="beat-kicker">CHAPTER · ${esc(b.span ?? '')}</div>
            <h2 class="beat-title">${esc(chapterTitle(b.company!))}, INC.</h2>
            <div class="memoir-line">${esc(b.endingTitle ?? '')} · walked away with ${esc(b.stake ?? '')}%</div>
          </section>`
        case 'week':
          return `<div class="weekbeat past"><div class="weekmark">— WEEK ${Number(b.text) + 1} —</div>${
            b.filler ? `<div class="filler">${esc(b.filler)}</div>` : ''
          }</div>`
        case 'you':
          return `<div class="youbtn past">${esc(b.text ?? '')}</div>`
        case 'outcome':
          return `<div class="outcome past">${esc(b.prose ?? '')}</div>`
        default:
          return `<section class="beat past">
            ${b.leadIn ? `<div class="leadin">${esc(b.leadIn)}</div>` : ''}
            <p class="beat-prose">${esc(b.prose ?? '')}</p>
          </section>`
      }
    })
    .join('')
}

function cardHtml(): string {
  const sceneId = st.company.queue[0]
  if (!sceneId) return '<aside class="scene-card"></aside>'
  const scene = getScene(CONTENT, st.company.id, sceneId)
  const speaker = scene.speaker ? CONTENT.characters[scene.speaker] : null
  const name = speaker?.name ?? 'THE WORLD'
  const role = speaker?.role ?? ''
  const initial = name === 'THE WORLD' ? '∴' : name[0]
  const fuse = fuseInfo()
  const ring =
    fuse && fuse.total > 0
      ? `<div class="fuse-ring" style="background:conic-gradient(var(--accent) ${(fuse.remaining / fuse.total) * 100}%, transparent 0); -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px)); mask: radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px));" title="${fuse.remaining} week(s) to answer"></div>`
      : ''
  const artId = scene.art ?? scene.speaker ?? null
  return `
  <aside class="scene-card">
    <canvas class="card-canvas"></canvas>
    ${ring}
    <div class="portrait"><span class="sigil">${initial}</span>${
      artId ? `<img class="portrait-img" src="/art/${artId}.webp" alt="" onerror="this.remove()">` : ''
    }</div>
    <div class="nameplate">
      <div class="np-name">${esc(name)}</div>
      ${role ? `<div class="np-role">${esc(role)}</div>` : ''}
    </div>
  </aside>`
}

const fmt = makeFmt(CONTENT.characters)

// ---- effect chips — the declared cost/gain of a choice, worn on its sleeve ----

function moneyAbs(n: number): string {
  const abs = Math.abs(n)
  if (abs >= 1_000_000) return `$${(abs / 1_000_000).toFixed(abs % 1_000_000 ? 1 : 0)}M`
  if (abs >= 1000) return `$${abs % 1000 ? (abs / 1000).toFixed(1) : String(abs / 1000)}k`
  return `$${abs}`
}

/** Renders authored effect deltas as chips. Reads content only — never invents a number. */
function fxChips(effects: readonly Effect[]): string {
  let money = 0
  let stress = 0
  let rep = 0
  let stake = 0
  let rev = 0
  let burn = 0
  for (const fx of effects) {
    switch (fx.e) {
      case 'treasury': money += fx.d; break
      case 'stress': stress += fx.d; break
      case 'rep': rep += fx.d; break
      case 'stake': stake += fx.d; break
      case 'revenue': rev += fx.d; break
      case 'burn': burn += fx.d; break
    }
  }
  const chips: string[] = []
  const chip = (good: boolean, label: string): void => {
    chips.push(`<span class="fx ${good ? 'good' : 'bad'}">${label}</span>`)
  }
  const sign = (n: number): string => (n > 0 ? '+' : '−')
  if (money) chip(money > 0, `${sign(money)}${moneyAbs(money)}`)
  if (stake) chip(stake < 0, `${sign(-stake)}${Math.abs(stake) % 1 ? Math.abs(stake).toFixed(1) : Math.abs(stake)}% equity`)
  if (rev) chip(rev > 0, `${sign(rev)}${moneyAbs(rev)}/wk rev`)
  if (burn) chip(burn < 0, `${sign(burn)}${moneyAbs(burn)}/wk burn`)
  if (stress) chip(stress < 0, `${sign(stress)}${Math.abs(stress)} stress`)
  if (rep) chip(rep > 0, `${sign(rep)}${Math.abs(rep)} cred`)
  return chips.length ? `<span class="fx-row">${chips.join('')}</span>` : ''
}

function choicesInner(sceneId: string): string {
  const scene = getScene(CONTENT, st.company.id, sceneId)
  return scene.choices
    .map((c, i) => {
      const legal = choiceLegal(st, c)
      let req = ''
      let dead = false
      if (!legal) {
        if (spendBlocked(st, c)) {
          req = `<span class="req">needs money the account doesn't have</span>`
        } else if (c.requires) {
          const copy = lockCopy(c.requires, st, fmt.name)
          if (copy.closed.length) {
            // A door your past sealed — visible forever, permanently shut.
            dead = true
            req = `<span class="req closed">door closed — ${esc(copy.closed.join(' · '))}</span>`
          } else {
            req = `<span class="req">needs ${esc(copy.needs.join(' · '))}</span>`
          }
        }
      }
      const kbd = scene.kind === 'bridge' ? '<kbd class="kbd">space</kbd>' : ''
      return `<button class="choice${legal ? '' : ' locked'}${dead ? ' dead' : ''}" data-i="${i}"><span class="c-label">${esc(c.label)}</span>${fxChips(c.effects)}${kbd}${req}</button>`
    })
    .join('')
}

// ---- live-scene plumbing -----------------------------------------------------

/** Typewriter segments: outcome → filler → leadIn → prose, in story order. */
let curSegs: { el: HTMLElement; text: string }[] = []
let pendingEl: HTMLElement | null = null

function finishTyping(): void {
  typing = false
  for (const s of curSegs) s.el.textContent = s.text
  if (pendingEl) pendingEl.style.visibility = 'visible'
}

/** Replace the left card for the scene being mounted — the face matches the voice. */
function refreshCard(): void {
  const aside = document.querySelector('.scene-card')
  if (!aside) return
  const tpl = document.createElement('template')
  tpl.innerHTML = cardHtml()
  aside.replaceWith(tpl.content)
  const canvas = document.querySelector('.card-canvas') as HTMLCanvasElement | null
  if (canvas) startAmbient(canvas)
}

/** Append the next scene skeleton and run its typewriter. Headings live in the
 *  backend and the map only — in play, the story is one unbroken stream. */
function mountScene(story: HTMLElement, sceneId: string, preSegs: { el: HTMLElement; text: string }[] = []): void {
  refreshCard()
  const scene = getScene(CONTENT, st.company.id, sceneId)
  const tpl = document.createElement('template')
  tpl.innerHTML = `<section class="beat">
    ${scene.leadIn ? `<div class="leadin"></div>` : ''}
    <p class="beat-prose"></p>
  </section><div class="choices" style="visibility:hidden"></div>`
  story.appendChild(tpl.content)

  const beat = story.querySelector('.beat:last-of-type')!
  curSegs = [...preSegs]
  const leadEl = beat.querySelector('.leadin') as HTMLElement | null
  if (leadEl && scene.leadIn) curSegs.push({ el: leadEl, text: scene.leadIn })
  curSegs.push({ el: beat.querySelector('.beat-prose') as HTMLElement, text: scene.prose })
  pendingEl = story.querySelector('.choices:last-of-type')
  if (pendingEl) pendingEl.innerHTML = choicesInner(sceneId)

  if (scene.kind === 'bridge') pendingEl?.classList.add('bridge')
  typing = true
  let seg = 0
  let i = 0
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const step = (): void => {
    if (!typing) return
    const cur = curSegs[seg]
    i = Math.min(cur.text.length, i + (reduced ? cur.text.length : 3))
    cur.el.textContent = cur.text.slice(0, i)
    story.scrollTop = story.scrollHeight // pin while streaming
    if (i >= cur.text.length && seg < curSegs.length - 1) {
      seg += 1
      i = 0
    }
    if (seg < curSegs.length - 1 || i < curSegs[seg].text.length) requestAnimationFrame(step)
    else finishTyping()
  }
  requestAnimationFrame(step)
}

let renderedChapter = -1

function renderPlaying(): void {
  const sceneId = st.company.queue[0]
  app.innerHTML = `
    <div class="shell">
      ${railHtml()}
      <div class="inc-panel" id="coPanel" hidden></div>
      <main class="stage">
        ${cardHtml()}
        <section class="story" id="story">${transcriptHtml()}</section>
      </main>
    </div>`
  const story = document.getElementById('story')!
  const canvas = app.querySelector('.card-canvas') as HTMLCanvasElement
  if (canvas) startAmbient(canvas)

  const chapterChanged = st.chapter !== renderedChapter
  renderedChapter = st.chapter

  const scene = sceneId ? getScene(CONTENT, st.company.id, sceneId) : null
  if (scene?.kind === 'cutscene') {
    // World-scale moments take the screen; no choices, just the weight.
    const speaker = scene.speaker ? CONTENT.characters[scene.speaker]?.name : null
    takeover(`
      <div class="tk-kicker">WORLD${speaker ? ` · ${esc(speaker)}` : ''}</div>
      <h1 class="tk-title">${esc(scene.title)}</h1>
      <p class="tk-body">${esc(scene.prose)}</p>
      <button class="cta" id="cutGo">Continue → <kbd class="kbd">space</kbd></button>
    `)
    document.getElementById('cutGo')?.addEventListener('click', () => {
      document.querySelector('.takeover')?.remove()
      transcript.push({
        kind: 'scene',
        title: scene.title,
        speakerName: speaker ?? 'THE WORLD',
        prose: scene.prose,
      })
      st = reduce(CONTENT, st, { t: 'choose', index: 0 })
      refreshRail()
      persist()
      render()
    })
    return
  }

  if (sceneId) mountScene(story, sceneId)
  story.scrollTop = chapterChanged ? 0 : story.scrollHeight
}

/** Sequential full-screen beats (interludes, prologues) — manga panels on black. */
function showScreens(beats: { kicker?: string; title: string; prose: string; art?: string }[], idx = 0, onDone?: () => void): void {
  if (idx >= beats.length) {
    document.querySelector('.takeover')?.remove()
    onDone?.()
    return
  }
  document.querySelector('.takeover')?.remove()
  const b = beats[idx]
  const last = idx === beats.length - 1
  const btn = `<button class="cta" id="scrGo">${last ? 'Begin →' : 'Continue →'} <kbd class="kbd">space</kbd></button>`
  if (b.art) {
    // Full-bleed cinematic: the panel IS the screen; copy rides a scrim at the foot.
    takeover(
      `
      <img class="cine-bg ${idx % 2 ? 'drift-b' : 'drift-a'}" src="/art/${b.art}.webp" alt="" onerror="this.remove()">
      <div class="cine-scrim"></div>
      <div class="cine-copy">
        <div class="tk-kicker">${esc(b.kicker ?? '')}</div>
        <h1 class="tk-title">${esc(b.title)}</h1>
        <p class="tk-body">${esc(b.prose)}</p>
        ${btn}
      </div>`,
      'cine',
    )
  } else {
    takeover(`
      <div class="tk-kicker">${esc(b.kicker ?? '')}</div>
      <h1 class="tk-title">${esc(b.title)}</h1>
      <p class="tk-body">${esc(b.prose)}</p>
      ${btn}
    `)
  }
  document.getElementById('scrGo')?.addEventListener('click', () => showScreens(beats, idx + 1, onDone))
}

// One delegated listener for the whole app — survives re-renders.
app.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  const choice = target.closest('.choice') as HTMLElement | null
  if (choice) {
    if (choice.classList.contains('locked')) return
    choose(Number(choice.dataset.i))
    return
  }
  if (target.closest('#coToggle')) {
    const panel = document.getElementById('coPanel')
    if (panel) {
      if (panel.hidden) {
        panel.innerHTML = incPanelHtml() + accountHtml()
        // Anchor just below the rail, whatever height it wrapped to.
        const rail = document.querySelector('.rail') as HTMLElement | null
        if (rail) panel.style.top = `${rail.offsetHeight + 10}px`
      }
      panel.hidden = !panel.hidden
    }
    return
  }
  if (target.closest('#actTheme')) {
    cycleTheme()
    const b = document.getElementById('actTheme')
    if (b) b.textContent = themeSetting().toUpperCase()
    return
  }
  if (target.closest('#actLogout')) {
    void (async () => {
      await signOut()
      location.reload()
    })()
    return
  }
  if (target.closest('#actSurrender')) {
    if (
      st.phase === 'playing' &&
      confirm(
        `Wind down ${chapterTitle(st.company.id)}, Inc.? The receivers take everything. The bankruptcy goes on your permanent record — and the biography continues.`,
      )
    ) {
      document.getElementById('coPanel')?.setAttribute('hidden', '')
      st = reduce(CONTENT, st, { t: 'surrender' })
      persist()
      refreshRail()
      renderEpilogue()
    }
    return
  }
  if (target.closest('#actDevRestart')) {
    if (DEV_TOOLS && confirm('[DEV] Overwrite this biography with a fresh life?')) {
      document.getElementById('coPanel')?.setAttribute('hidden', '')
      startNewLife()
    }
    return
  }
  if (!target.closest('.inc-panel')) {
    const panel = document.getElementById('coPanel')
    if (panel && !panel.hidden) panel.hidden = true
  }
  if (target.closest('.story')) finishTyping()
})

// Space advances: skips the typewriter, turns bridges, dismisses single-CTA
// takeovers (cutscenes, prologue screens). Never decides a real choice.
window.addEventListener('keydown', (e) => {
  if (e.code !== 'Space') return
  const ae = document.activeElement as HTMLElement | null
  if (ae && ae.tagName === 'BUTTON') ae.blur() // avoid native double-activation
  const tk = document.querySelector('.takeover')
  if (tk) {
    const ctas = tk.querySelectorAll<HTMLElement>('.cta')
    if (ctas.length === 1) {
      e.preventDefault()
      ctas[0].click()
    }
    return
  }
  e.preventDefault() // story mode: space never scrolls
  if (typing) {
    finishTyping()
    return
  }
  if (pendingEl?.classList.contains('bridge')) {
    const btn = pendingEl.querySelector<HTMLElement>('.choice:not(.locked):not(.picked)')
    btn?.click()
  }
})

function takeover(inner: string, cls = ''): void {
  const el = document.createElement('div')
  el.className = `takeover${cls ? ` ${cls}` : ''}`
  el.innerHTML = `<div class="takeover-inner">${inner}</div>`
  app.appendChild(el)
}

function biographyStrip(): string {
  return (
    '<div class="tk-strip">' +
    st.ledger.completed
      .map(
        (c) =>
          `<span class="tk-chip">${esc(chapterTitle(c.company))} — ${esc(c.endingId.replace(/_/g, ' '))}</span>`,
      )
      .join('') +
    '</div>'
  )
}

function showEpilogue(): void {
  const completed = st.ledger.completed[st.ledger.completed.length - 1]
  const ending =
    CONTENT.chapters[completed?.company ?? st.company.id].endings.find(
      (e) => e.id === (completed?.endingId ?? st.company.endingId),
    ) ?? CONTENT.chapters.hyperchute.endings[0]
  const isLast = st.chapter + 1 >= CHAPTERS.length
  const cta = isLast
    ? `<button class="cta" id="finale">See how the life ends →</button>`
    : `<button class="cta" id="next">Wire the check — found ${esc(nextChapterName())} →</button>`
  takeover(`
    <div class="tk-kicker">CHAPTER CLOSED · ${esc(chapterTitle(completed?.company ?? st.company.id))}</div>
    ${ending.art ? `<img class="tk-art" src="/art/${ending.art}.webp" alt="" onerror="this.remove()">` : ''}
    <h1 class="tk-title">${esc(ending.title)}</h1>
    <p class="tk-body">${esc(ending.prose)}</p>
    ${biographyStrip()}
    ${cta}
  `)
  document.getElementById('next')?.addEventListener('click', () => {
    document.querySelector('.takeover')?.remove()
    // Snapshot the life just ended, collapse it into a memoir card, then skip years.
    const completed = st.ledger.completed[st.ledger.completed.length - 1]
    const prevCompany = st.company
    const prevEndingDef = CONTENT.chapters[completed.company].endings.find(
      (e) => e.id === completed.endingId,
    )
    const years = prevEndingDef?.skipYears ?? 1
    const stake = String(Math.round(prevCompany.capTable.find((s) => s.who === 'founder')?.pct ?? 0))
    const spanFrom = 2031 + Math.floor(prevCompany.foundedEpoch / 52)
    const spanTo = 2031 + Math.floor((st.epoch + years * 52) / 52)

    st = reduce(CONTENT, st, { t: 'foundNext' })
    transcript = [
      {
        kind: 'chapter',
        company: prevCompany.id,
        endingTitle: prevEndingDef?.title ?? completed.endingId.replace(/_/g, ' '),
        span: `${spanFrom}–${spanTo}`,
        stake,
      },
      { kind: 'week', text: String(st.epoch) },
    ]
    persist()
    renderedChapter = -1
    render()

    const inter = prevEndingDef?.interlude
    const pro = CONTENT.chapters[st.company.id]?.prologue ?? []
    const screens: { kicker?: string; title: string; prose: string; art?: string }[] = []
    if (inter) screens.push({ kicker: inter.kicker, title: inter.title, prose: inter.prose, art: inter.art })
    for (const p of pro) screens.push({ kicker: p.kicker, title: p.title, prose: p.prose, art: p.art })
    if (screens.length) showScreens(screens, 0, () => render())
  })
  document.getElementById('finale')?.addEventListener('click', () => {
    document.querySelector('.takeover')?.remove()
    renderComplete()
  })
}

function renderEpilogue(): void {
  renderPlaying()
  showEpilogue()
}

function renderComplete(): void {
  renderPlaying()
  const years = Math.max(1, Math.round((st.epoch - st.ledger.completed[0]?.epoch / 1) / 52))
  const closing = `<p class="tk-body" style="margin-top:22px">This biography belongs to ${session ? esc(walletLabel(session)) : 'this wallet'}, finished and on the record. One wallet, one life — to live another, sign with another wallet.</p>
       <button class="cta" id="switchWallet">Sign out — new wallet, new life →</button>`
  takeover(`
    <div class="tk-kicker">THE BIOGRAPHY IS COMPLETE</div>
    <h1 class="tk-title">FOUR COMPANIES.<br/>ONE LIFE.</h1>
    <p class="tk-body">Final founder score: ${st.ledger.founderScore}. Roughly ${years} years from a garage above a laundromat to whatever came last. The world remembers all of it.</p>
    ${biographyStrip()}
    ${closing}
  `)
  document.getElementById('switchWallet')?.addEventListener('click', () => {
    void (async () => {
      await signOut()
      location.reload()
    })()
  })
}

// ---- welcome / connect ---------------------------------------------------------

const INTRO = `2031. You are a first-time founder in a city that runs on rails of other people's machines. You have a garage above a laundromat, a shuttle prototype hanging from its ceiling, and one hundred percent of nothing.`

function signedRowHtml(): string {
  return session
    ? `<div class="tk-id">SIGNED · ${esc(walletLabel(session))} · <button class="tk-link" id="wlOut">log out</button></div>`
    : ''
}

function wireLogout(): void {
  document.getElementById('wlOut')?.addEventListener('click', () => {
    void (async () => {
      await signOut()
      session = null
      renderWelcome(null)
    })()
  })
}

/** Welcome screen — every page load starts here. */
function renderWelcome(saved: Save | null): void {
  app.innerHTML = ''
  if (saved) {
    takeover(`
      <div class="tk-kicker">A NARRATIVE FOUNDER SAGA</div>
      <h1 class="tk-title">FATE</h1>
      <p class="tk-body">The biography is open to the last page you wrote — ${esc(chapterTitle(saved.st.company.id))}, INC., week ${saved.st.epoch + 1}.</p>
      <button class="cta" id="wlContinue">Continue →</button>
      <div class="tk-id">One wallet, one life. This biography is permanent.</div>
      ${signedRowHtml()}`)
    document.getElementById('wlContinue')?.addEventListener('click', () => {
      st = saved.st
      transcript = (saved.transcript as BeatRec[]) ?? []
      renderedChapter = -1
      render()
    })
    wireLogout()
    return
  }
  const actions = session
    ? `<button class="cta" id="wlBegin">Incorporate →</button>
      <div class="tk-id">One wallet, one life. What you sign here is permanent.</div>`
    : `<button class="cta" id="wlConnect">Connect wallet →</button>
      <div class="tk-id">Your wallet is your signature. One life per wallet — permanent, no resets.</div>`
  takeover(`
    <div class="tk-kicker">A NARRATIVE FOUNDER SAGA</div>
    <h1 class="tk-title">FATE</h1>
    <p class="tk-body">One life. Four companies. Every scar carries forward.

${INTRO}</p>
    ${actions}
    ${signedRowHtml()}`)
  document.getElementById('wlBegin')?.addEventListener('click', startNewLife)
  document.getElementById('wlConnect')?.addEventListener('click', () => {
    renderConnect(
      () => renderWelcome(null),
      () => void enterAsFounder(),
    )
  })
  wireLogout()
}

/** Fate-styled wallet picker — the headless connect surface. */
function renderConnect(onBack: () => void, onDone: () => void): void {
  document.querySelector('.takeover')?.remove()
  const wallets = listWallets()
  const list = wallets.length
    ? wallets
        .map(
          (w, i) => `
      <button class="wallet-opt" data-w="${i}">
        ${w.icon ? `<img class="wicon" src="${w.icon}" alt="">` : `<span class="wicon">◈</span>`}
        <span class="wname">${esc(w.name)}</span>
        <span class="wchain">${w.chain === 'solana' ? 'SOL' : 'ETH'}</span>
      </button>`,
        )
        .join('')
    : `<p class="tk-body">No wallets found in this browser. Install Phantom (Solana) or MetaMask (Ethereum), then come back — the papers will wait.</p>`
  takeover(`
    <div class="tk-kicker">SIGN THE PAPERS</div>
    <h1 class="tk-title">THE FOUNDER OF RECORD</h1>
    <p class="tk-body">Your wallet is your signature. One approval — no funds move, no email asked. The biography binds to the address.</p>
    <div class="wallet-list">${list}</div>
    <div class="werr" id="werr"></div>
    <button class="tk-link" id="wBack">← back</button>
  `)
  document.getElementById('wBack')?.addEventListener('click', () => {
    document.querySelector('.takeover')?.remove()
    onBack()
  })
  document.querySelectorAll<HTMLButtonElement>('.wallet-opt').forEach((btn) => {
    btn.addEventListener('click', () => {
      void (async () => {
        const w = wallets[Number(btn.dataset.w)]
        const err = document.getElementById('werr')
        const label = btn.querySelector('.wname')
        const orig = label?.textContent ?? w.name
        if (err) err.textContent = ''
        btn.disabled = true
        if (label) label.textContent = 'SIGNING…'
        try {
          await w.sign()
          session = await getSession()
          document.querySelector('.takeover')?.remove()
          onDone()
        } catch (ex) {
          btn.disabled = false
          if (label) label.textContent = orig
          if (err) err.textContent = ex instanceof Error ? ex.message : 'The wallet declined. Try again.'
        }
      })()
    })
  })
}

/** After sign-in from the welcome flow: surface this wallet's biography, if any. */
async function enterAsFounder(): Promise<void> {
  let best: Save | null = null
  if (session) {
    const local = load(session.user.id)
    const remote = (await cloudLoad()) as Save | null
    best = pickSave(local, remote) as Save | null
  }
  renderWelcome(best)
}

function startNewLife(): void {
  st = newGame(CONTENT, (Date.now() ^ performance.now()) >>> 0)
  transcript = []
  renderedChapter = -1
  persist()
  render()
  const pro = CONTENT.chapters[st.company.id].prologue
  // Re-render when the prologue closes so the first scene streams in view,
  // not invisibly underneath the takeover.
  if (pro) showScreens(
    pro.map((p) => ({ kicker: p.kicker, title: p.title, prose: p.prose, art: p.art })),
    0,
    () => render(),
  )
}

function render(): void {
  switch (st.phase) {
    case 'playing':
      renderPlaying()
      break
    case 'epilogue':
      renderEpilogue()
      break
    case 'complete':
      renderComplete()
      break
  }
}

// ---- actions ----------------------------------------------------------------

function choose(index: number): void {
  if (st.phase !== 'playing' || typing) return
  const story = document.getElementById('story')!
  const sceneId = st.company.queue[0]
  const beforeEpoch = st.epoch
  const scene = getScene(CONTENT, st.company.id, sceneId)
  const choice = scene.choices[index]

  // Grey the picked button in place; remove its siblings.
  const container = pendingEl
  if (container) {
    container.style.visibility = 'visible'
    container.querySelectorAll('.choice').forEach((b) => {
      if ((b as HTMLElement).dataset.i === String(index)) b.classList.add('picked')
      else b.remove()
    })
  }
  // The answered beat joins history.
  story.querySelector('.beat:last-of-type')?.classList.add('past')

  st = reduce(CONTENT, st, { t: 'choose', index })

  refreshRail()

  // record the beat for persistence
  transcript.push({
    kind: 'scene',
    title: scene.title,
    speakerName: scene.speaker ? CONTENT.characters[scene.speaker]?.name : 'THE WORLD',
    prose: scene.prose,
    leadIn: scene.leadIn,
  })
  transcript.push({ kind: 'you', text: choice.label })

  // Outcome prose continues the story below the greyed decision — same stream,
  // same voice; it types with everything that follows.
  let lastNew: HTMLElement | null = null
  const preSegs: { el: HTMLElement; text: string }[] = []
  if (choice.result) {
    transcript.push({ kind: 'outcome', prose: choice.result })
    const tpl = document.createElement('template')
    tpl.innerHTML = `<div class="outcome"></div>`
    const el = tpl.content.firstElementChild as HTMLElement
    container?.after(el)
    lastNew = el
    if (st.phase === 'epilogue') el.textContent = choice.result
    else preSegs.push({ el, text: choice.result })
  }

  if (st.phase === 'epilogue') {
    persist()
    if (lastNew) lastNew.scrollIntoView({ behavior: 'smooth', block: 'end' })
    setTimeout(showEpilogue, 700)
    return
  }

  if (st.epoch > beforeEpoch) {
    const filler = weekFillerText(st.epoch - beforeEpoch)
    transcript.push({ kind: 'week', text: String(st.epoch), filler })
    const wk = document.createElement('template')
    wk.innerHTML = `<div class="weekbeat"><div class="weekmark">— WEEK ${st.epoch + 1} —</div>${
      filler ? `<div class="filler"></div>` : ''
    }</div>`
    const el = wk.content.firstElementChild as HTMLElement
    ;(lastNew ?? container)?.after(el)
    lastNew = el
    // the filler streams ahead of the next beat instead of popping in
    const fillerEl = el.querySelector('.filler') as HTMLElement | null
    if (fillerEl && filler) preSegs.push({ el: fillerEl, text: filler })
  }

  persist()
  const nextId = st.company.queue[0]
  if (nextId) {
    const next = getScene(CONTENT, st.company.id, nextId)
    if (next.kind === 'cutscene') {
      // World-scale beats always take the whole screen, even mid-session.
      for (const s of preSegs) s.el.textContent = s.text
      render()
      return
    }
    mountScene(story, nextId, preSegs)
  } else {
    for (const s of preSegs) s.el.textContent = s.text
  }
  lastNew?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ---- boot --------------------------------------------------------------------

/** Warm every known print into the browser cache so panels land instantly.
 *  Fire-and-forget; play never waits on art (law 5). */
function warmArt(): void {
  const ids = new Set<string>()
  for (const id of Object.keys(CONTENT.characters)) ids.add(id)
  for (const ch of Object.values(CONTENT.chapters)) {
    for (const p of ch.prologue ?? []) if (p.art) ids.add(p.art)
    for (const s of ch.scenes) if (s.art) ids.add(s.art)
    for (const e of ch.endings) {
      if (e.art) ids.add(e.art)
      if (e.interlude?.art) ids.add(e.interlude.art)
    }
  }
  for (const id of ids) {
    const img = new Image()
    img.src = `/art/${id}.webp`
  }
}

async function boot(): Promise<void> {
  applyTheme()
  initWalletDiscovery()
  warmArt()
  try {
    localStorage.removeItem(LEGACY_SAVE_KEY) // pre-auth saves: refresh restarts by design
  } catch {
    /* ignore */
  }
  session = await getSession()
  await enterAsFounder()
}

void boot()
