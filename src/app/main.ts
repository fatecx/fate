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
  kind: 'scene' | 'you' | 'outcome' | 'week'
  title?: string
  speakerName?: string
  prose?: string
  text?: string
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
  return `
  <header class="rail">
    <div class="wordmark">FATE<em>·</em></div>
    <div class="chap">${esc(chapterTitle(st.company.id))} · WEEK ${st.epoch}</div>
    <div class="rail-meters">
      <div class="runway ${danger ? 'danger' : ''}"><b>${fmtRunway()}</b><span>RUNWAY<br/>WEEKS</span></div>
      <div class="stressbox">
        <div class="mlabel"><span>STRESS</span><span>${stress}</span></div>
        <div class="stressbar"><i style="width:${stress}%"></i></div>
      </div>
      <div class="repchip" title="Reputation — opens and closes doors across your whole life">REP ${rep >= 0 ? '+' : ''}${rep}</div>
    </div>
  </header>`
}

function transcriptHtml(): string {
  // The whole transcript is history — render fully, faded; nothing hides on hover.
  return transcript
    .map((b) => {
      switch (b.kind) {
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

  if (sceneId) mountScene(story, sceneId)
  story.scrollTop = story.scrollHeight
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
    st = reduce(CONTENT, st, { t: 'foundNext' })
    transcript.push({ kind: 'week', text: String(st.epoch) })
    persist()
    render()
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
  persist()
  render()
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
