/**
 * FATE play surface — split stage per DESIGN.md §8.
 * The engine decides; this file only renders true state and forwards choices.
 */
import './style.css'
import { CONTENT } from '../content/world'
import { newGame, reduce, getScene } from '../engine/reduce'
import { evalPred } from '../engine/predicates'
import type { GameState } from '../engine/types'
import { runwayWeeks } from '../engine/types'
import { cloudLoad, cloudPush, pickSave } from './cloud'
import { makeFmt } from '../../scripts/map/format'

const SAVE_KEY = 'fate-save-v2'

interface BeatRec {
  kind: 'scene' | 'you' | 'outcome' | 'week' | 'chapter'
  title?: string
  speakerName?: string
  prose?: string
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

// ---- persistence -----------------------------------------------------------

function persist(): void {
  const blob = { st, transcript } satisfies Save
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(blob))
  } catch {
    /* private mode etc. — the game still plays, it just won't resume */
  }
  cloudPush(blob)
}

function load(): Save | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    const s = JSON.parse(raw) as Save
    if (!s?.st?.company || s.st.phase === undefined) return null
    return s
  } catch {
    return null
  }
}

function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY)
  } catch {
    /* ignore */
  }
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
  const stress = Math.round(st.company.stress)
  const rep = st.world.reputation
  const cells = Array.from({ length: 10 }, (_, k) => {
    const filled = stress > k * 10
    return `<i class="${filled ? (k >= 7 ? 'on hot' : 'on') : ''}"></i>`
  }).join('')
  return `
  <header class="rail">
    <div class="wordmark">FATE<em>·</em></div>
    <button class="chap" id="incToggle" title="Articles of incorporation">${esc(chapterTitle(st.company.id))}, INC. · WEEK ${st.epoch} ▾</button>
    <div class="rail-meters">
      <div class="runway ${danger ? 'danger' : ''}"><b>${fmtRunway()}</b><span>RUNWAY<br/>WEEKS</span></div>
      <div class="stressbox">
        <div class="mlabel"><span>STRESS</span><span>${stress}</span></div>
        <div class="stresscells">${cells}</div>
      </div>
      <div class="repchip" title="Bank balance">${fmtMoney(st.company.treasury)}</div>
      <div class="repchip" title="Your share of the company">${founderPct()}% YOURS</div>
      <div class="repchip" title="Reputation — opens and closes doors across your whole life">REP ${rep >= 0 ? '+' : ''}${rep}</div>
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
    <span>Founder</span><b>You</b>
    <span>Bank</span><b>${BANKS[c.id] ?? '—'} <span class="dim">· ${fmtMoney(c.treasury)}</span></b>
    <span>Counsel</span><b>${counselLine()}</b>
    <span>Advisor</span><b>${advisorLine()}</b>
    <span>Team</span><b>${teamLine()}</b>
  </div>
  <div class="inc-cap"><div class="mlabel" style="margin-bottom:6px"><span>CAP TABLE</span><span>${fmtRunway()} WKS RUNWAY</span></div>${capTableLines()}</div>`
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
          return `<div class="weekmark past">— WEEK ${b.text} —</div>`
        case 'you':
          return `<div class="you past">▸ ${esc(b.text ?? '')}</div>`
        case 'outcome':
          return `<div class="outcome past">${esc(b.prose ?? '')}</div>`
        default:
          return `<section class="beat past">
            <div class="beat-kicker">${esc(b.speakerName ? b.speakerName : chapterTitle(st.company.id))}</div>
            <h2 class="beat-title">${esc(b.title ?? '')}</h2>
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
  return `
  <aside class="scene-card">
    <canvas class="card-canvas"></canvas>
    ${ring}
    <div class="portrait"><span class="sigil">${initial}</span></div>
    <div class="nameplate">
      <div class="np-name">${esc(name)}</div>
      ${role ? `<div class="np-role">${esc(role)}</div>` : ''}
    </div>
  </aside>`
}

const fmt = makeFmt(CONTENT.characters)

function choicesInner(sceneId: string): string {
  const scene = getScene(CONTENT, st.company.id, sceneId)
  return scene.choices
    .map((c, i) => {
      const legal = !c.requires || evalPred(c.requires, st)
      const req = legal || !c.requires ? '' : `<span class="req">requires ${esc(fmt.fmtPred(c.requires))}</span>`
      return `<button class="choice${legal ? '' : ' locked'}" data-i="${i}">${esc(c.label)}${req}</button>`
    })
    .join('')
}

// ---- live-scene plumbing -----------------------------------------------------

let curProseEl: HTMLElement | null = null
let curFull = ''
let pendingEl: HTMLElement | null = null

function finishTyping(): void {
  typing = false
  if (curProseEl) curProseEl.textContent = curFull
  if (pendingEl) pendingEl.style.visibility = 'visible'
}

/** Append the next scene skeleton and run its typewriter. */
function mountScene(story: HTMLElement, sceneId: string): void {
  const scene = getScene(CONTENT, st.company.id, sceneId)
  const speaker = scene.speaker ? CONTENT.characters[scene.speaker]?.name : 'THE WORLD'
  const tpl = document.createElement('template')
  tpl.innerHTML = `<section class="beat">
    <div class="beat-kicker">${speaker}</div>
    <h2 class="beat-title">${esc(scene.title)}</h2>
    <p class="beat-prose"></p>
  </section><div class="choices" style="visibility:hidden"></div>`
  story.appendChild(tpl.content)

  curProseEl = story.querySelector('.beat:last-of-type .beat-prose')
  pendingEl = story.querySelector('.choices:last-of-type')
  if (pendingEl) pendingEl.innerHTML = choicesInner(sceneId)

  curFull = scene.prose
  if (scene.kind === 'bridge') pendingEl?.classList.add('bridge')
  typing = true
  let i = 0
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const step = (): void => {
    if (!typing) return
    i = Math.min(curFull.length, i + (reduced ? curFull.length : 2))
    if (curProseEl) curProseEl.textContent = curFull.slice(0, i)
    story.scrollTop = story.scrollHeight // pin while streaming
    if (i < curFull.length) requestAnimationFrame(step)
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
      <button class="cta" id="cutGo">Continue →</button>
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

/** Sequential full-screen beats (interludes, prologues). */
function showScreens(beats: { kicker?: string; title: string; prose: string }[], idx = 0): void {
  if (idx >= beats.length) {
    document.querySelector('.takeover')?.remove()
    return
  }
  document.querySelector('.takeover')?.remove()
  const b = beats[idx]
  const last = idx === beats.length - 1
  takeover(`
    <div class="tk-kicker">${esc(b.kicker ?? '')}</div>
    <h1 class="tk-title">${esc(b.title)}</h1>
    <p class="tk-body">${esc(b.prose)}</p>
    <button class="cta" id="scrGo">${last ? 'Begin →' : 'Continue →'}</button>
  `)
  document.getElementById('scrGo')?.addEventListener('click', () => showScreens(beats, idx + 1))
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
  if (target.closest('#incToggle')) {
    const panel = document.getElementById('incPanel')
    if (panel) {
      if (panel.hidden) panel.innerHTML = incPanelHtml()
      panel.hidden = !panel.hidden
    }
    return
  }
  if (!target.closest('.inc-panel')) {
    const panel = document.getElementById('incPanel')
    if (panel && !panel.hidden) panel.hidden = true
  }
  if (target.closest('.story')) finishTyping()
})

function takeover(inner: string): void {
  const el = document.createElement('div')
  el.className = 'takeover'
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
    const screens: { kicker?: string; title: string; prose: string }[] = []
    if (inter) screens.push({ kicker: inter.kicker, title: inter.title, prose: inter.prose })
    for (const p of pro) screens.push({ kicker: p.kicker, title: p.title, prose: p.prose })
    if (screens.length) showScreens(screens)
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
  takeover(`
    <div class="tk-kicker">THE BIOGRAPHY IS COMPLETE</div>
    <h1 class="tk-title">FOUR COMPANIES.<br/>ONE LIFE.</h1>
    <p class="tk-body">Final founder score: ${st.ledger.founderScore}. Roughly ${years} years from a garage above a laundromat to whatever came last. The world remembers all of it.</p>
    ${biographyStrip()}
    <button class="cta" id="again">Live another life ↺</button>
  `)
  document.getElementById('again')?.addEventListener('click', () => {
    clearSave()
    startNewLife()
  })
}

function renderSplash(): void {
  app.innerHTML = ''
  takeover(`
    <div class="tk-kicker">A NARRATIVE FOUNDER SAGA</div>
    <h1 class="tk-title">FATE</h1>
    <p class="tk-body">One life. Four companies. Every scar carries forward.

2031. You are a first-time founder in a city that runs on rails of other people's machines. You have a garage above a laundromat, a shuttle prototype hanging from its ceiling, and one hundred percent of nothing.</p>
    <button class="cta" id="begin">Incorporate →</button>
  `)
  document.getElementById('begin')?.addEventListener('click', startNewLife)
}

function startNewLife(): void {
  st = newGame(CONTENT, (Date.now() ^ performance.now()) >>> 0)
  transcript = []
  renderedChapter = -1
  persist()
  render()
  const pro = CONTENT.chapters[st.company.id].prologue
  if (pro) showScreens(pro.map((p) => ({ kicker: p.kicker, title: p.title, prose: p.prose })))
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
  })
  transcript.push({ kind: 'you', text: choice.label })

  // outcome prose lands below the greyed decision
  let lastNew: HTMLElement | null = null
  if (choice.result) {
    transcript.push({ kind: 'outcome', prose: choice.result })
    const tpl = document.createElement('template')
    tpl.innerHTML = `<div class="outcome">${esc(choice.result)}</div>`
    const el = tpl.content.firstElementChild as HTMLElement
    container?.after(el)
    lastNew = el
  }

  if (st.phase === 'epilogue') {
    persist()
    if (lastNew) lastNew.scrollIntoView({ behavior: 'smooth', block: 'end' })
    setTimeout(showEpilogue, 700)
    return
  }

  if (st.epoch > beforeEpoch) {
    transcript.push({ kind: 'week', text: String(st.epoch) })
    const wk = document.createElement('template')
    wk.innerHTML = `<div class="weekmark">— WEEK ${st.epoch} —</div>`
    const el = wk.content.firstElementChild as HTMLElement
    ;(lastNew ?? container)?.after(el)
    lastNew = el
  }

  persist()
  if (st.company.queue[0]) mountScene(story, st.company.queue[0])
  lastNew?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ---- boot --------------------------------------------------------------------

async function boot(): Promise<void> {
  const local = load()
  const remote = await cloudLoad()
  const best = pickSave(local, remote)
  if (best) {
    st = best.st
    transcript = (best.transcript as BeatRec[]) ?? []
    render()
  } else {
    renderSplash()
  }
}

void boot()
