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
import { cloudLoad, cloudPush, pickSave, getSession, signOut, walletLabel, walletAddress, walletChain, pushFounder, pushDecisions, fetchDecisionSplit } from './cloud'
import { initWalletDiscovery, listWallets } from './wallet'
import { lockCopy } from './locks'
import { setStage, stinger, soundEnabled, setSoundEnabled, igniteOnFirstGesture } from './audio'
import { makeFmt } from '../../scripts/map/format'

const LEGACY_SAVE_KEY = 'fate-save-v2'

function saveKey(uid: string): string {
  return `fate-save-u-${uid}`
}

interface BeatRec {
  kind: 'scene' | 'you' | 'outcome' | 'week' | 'chapter' | 'divider'
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
  /** Week beats: bank balance stamped when the week turned. */
  bank?: string
  /** Chapter memoir cards: the record of the life just closed. */
  kindLabel?: string
  weeks?: number
  score?: number
  cred?: number
  cash?: number
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

// ---- the cast --------------------------------------------------------------
// Characters unlock in the header as the founder meets them. "Met" is true
// state: a relationship exists, a seen scene had them speak — or they are
// speaking right now (a face on screen is a face you've met).

interface CastEntry {
  id: string
  met: boolean
  metOrder: number // lower = met earlier; Infinity = unmet
}

function castRoster(): CastEntry[] {
  const chapter = CONTENT.chapters[st.company.id]
  const relIds = Object.keys(st.world.rels)
  const seenSpeakers = new Set<string>()
  for (const sid of st.company.seen) {
    const sp = chapter.scenes.find((s) => s.id === sid)?.speaker
    if (sp) seenSpeakers.add(sp)
  }
  const onScreen = st.company.queue[0]
    ? chapter.scenes.find((s) => s.id === st.company.queue[0])?.speaker
    : undefined
  if (onScreen) seenSpeakers.add(onScreen)
  const ids = new Set<string>([...relIds.filter((id) => st.world.rels[id]?.met), ...seenSpeakers])
  // Roster = everyone met this life + this chapter's still-unmet speakers, as shadows.
  for (const s of chapter.scenes) if (s.speaker) ids.add(s.speaker)
  const entries: CastEntry[] = []
  for (const id of ids) {
    if (!CONTENT.characters[id]) continue
    const met = st.world.rels[id]?.met === true || seenSpeakers.has(id)
    const order = id === onScreen ? 1000 : relIds.indexOf(id) // the current face is the freshest
    entries.push({ id, met, metOrder: met ? (order === -1 ? 999 : order) : Infinity })
  }
  return entries.sort((a, b) => a.metOrder - b.metOrder)
}

function castFaceHtml(id: string, cls = 'cast-face', veiled = false): string {
  const ch = CONTENT.characters[id]
  // Veiled faces never leak the initial — if the print is missing, a ? holds the frame.
  return `<span class="${cls}${veiled ? ' veiled' : ''}"><i>${veiled ? '?' : esc(ch.name[0])}</i><img src="/art/${id}.webp" alt="" onerror="this.remove()"></span>`
}

/** The protagonist's token — no portrait by design; the biography is the face. */
function youFaceHtml(cls = 'cast-face'): string {
  return `<span class="${cls} you"><i>YOU</i></span>`
}

/** Header cluster: you, the last faces met, and the word. */
function castClusterHtml(): string {
  const met = castRoster().filter((c) => c.met)
  const faces = met.slice(-2).reverse().map((c) => castFaceHtml(c.id)).join('')
  const shadow = met.length === 0 ? `<span class="cast-face shadow"><i>?</i></span>` : ''
  return `<button class="cast" id="castToggle" title="The cast — everyone this life has met">
    ${youFaceHtml()}${faces}${shadow}<span class="cast-word">CAST ▾</span>
  </button>`
}

function standingChip(id: string): string {
  const r = st.world.rels[id]
  if (!r) return ''
  if (r.standing === 'ally') return `<span class="cchip ally">ALLY</span>`
  if (r.standing === 'hostile') return `<span class="cchip hostile">HOSTILE</span>`
  const lean = r.affinity + r.respect
  if (lean >= 3) return `<span class="cchip warm">WARM</span>`
  if (lean <= -3) return `<span class="cchip cold">COLD</span>`
  return ''
}

function castPanelHtml(): string {
  const roster = castRoster()
  const met = roster.filter((c) => c.met)
  const unmet = roster.filter((c) => !c.met)
  const youRow = `<div class="cast-row">
    ${youFaceHtml('cast-face lg')}
    <div class="cast-meta">
      <div class="cast-name">YOU <span class="cchip">${founderPct()}%</span></div>
      <div class="cast-role">Founder — ${esc(chapterTitle(st.company.id))}, INC.</div>
      <div class="cast-blurb">The founder of record. Every scar in this biography is yours.</div>
    </div>
  </div>`
  const rows = met
    .map((c) => {
      const ch = CONTENT.characters[c.id]
      const stake = st.company.capTable.find((s) => s.who === c.id)?.pct ?? 0
      const stakeTag = stake > 0 ? `<span class="cchip">${stake.toFixed(stake % 1 ? 1 : 0)}%</span>` : ''
      return `<div class="cast-row">
        ${castFaceHtml(c.id, 'cast-face lg')}
        <div class="cast-meta">
          <div class="cast-name">${esc(ch.name)} ${standingChip(c.id)}${stakeTag}</div>
          <div class="cast-role">${esc(ch.role)}</div>
          <div class="cast-blurb">${esc(ch.blurb)}</div>
        </div>
      </div>`
    })
    .join('')
  // The unmet appear in the flesh but veiled — only the next few, fading out.
  // New faces land on top; the tail dissolves before it can count the cast.
  const shadowRows = unmet
    .slice(0, 3)
    .map((c) => {
      const ch = CONTENT.characters[c.id]
      return `<div class="cast-row unmet">
        ${castFaceHtml(c.id, 'cast-face lg', true)}
        <div class="cast-meta">
          <div class="cast-name veiled-name" aria-hidden="true">${esc(ch.name)}</div>
          <div class="cast-role">${esc(ch.role)}</div>
        </div>
      </div>`
    })
    .join('')
  return `
  <div class="inc-title">THE CAST · IN ORDER OF APPEARANCE</div>
  <div class="cast-list">${youRow}${rows}</div>
  ${shadowRows ? `<div class="cast-soon">${shadowRows}</div>` : ''}`
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

/** The clock, as people say it: which year of the company, which week of that year. */
function clockLabel(): string {
  const w = st.epoch - (st.company?.foundedEpoch ?? 0)
  return `YEAR ${Math.floor(w / 52) + 1} · WEEK ${(w % 52) + 1}`
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
    <div class="weektag">${clockLabel()}</div>
    <div class="rail-meters">
      ${runwayBlock}
      <div class="stressbox">
        <div class="mlabel"><span>STRESS</span><span>${stress}</span></div>
        <div class="stresscells">${cells}</div>
      </div>
      <div class="repchip" title="Bank balance">${fmtMoney(st.company.treasury)}</div>
      <div class="repchip" title="Credibility — opens and closes doors across your whole life">CRED ${rep >= 0 ? '+' : ''}${rep}</div>
    </div>
    <div class="rail-right">
      ${castClusterHtml()}
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
      <span>Sound</span><b><button class="paction inline" id="actSound">${soundEnabled() ? 'ON' : 'OFF'}</button></b>
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
        case 'chapter': {
          // Enriched memoir cards carry the record; older saves fall back to one line.
          const chNo = ['ONE', 'TWO', 'THREE', 'FOUR'][(CHAPTERS as readonly string[]).indexOf(b.company ?? '')] ?? ''
          const outcome = b.kindLabel
            ? `<div class="memoir-outcome">${esc(b.kindLabel)} — “${esc(b.endingTitle ?? '')}”</div>`
            : `<div class="memoir-line">${esc(b.endingTitle ?? '')} · walked away with ${esc(b.stake ?? '')}%</div>`
          const stats = b.kindLabel
            ? `<div class="memoir-stats">
                <span><b>${b.weeks ?? '—'}</b> weeks</span>
                <span><b>${esc(b.stake ?? '')}%</b> walked away with</span>
                <span><b>${b.cash !== undefined ? fmtMoney(b.cash) : '—'}</b> at close</span>
                <span><b>${(b.cred ?? 0) >= 0 ? '+' : ''}${b.cred ?? '—'}</b> cred</span>
                <span><b>${b.score ?? '—'}</b> founder score</span>
              </div>
              <a class="memoir-link" href="/leaderboard.html" target="_blank" rel="noopener">FOUNDERS LEDGER ↗</a>`
            : ''
          return `<section class="memoir past">
            <div class="beat-kicker">CHAPTER ${chNo} · ${esc(b.span ?? '')}</div>
            <h2 class="beat-title">${esc(chapterTitle(b.company!))}, INC.</h2>
            ${outcome}${stats}
          </section>`
        }
        case 'week': {
          // Newer saves store the formatted label; older ones stored a raw epoch.
          const wk = b.text ?? ''
          const label = wk.includes('·') ? wk : `WEEK ${Number(wk) + 1}`
          const bank = b.bank ? ` · ${esc(b.bank)}` : ''
          return `<div class="weekbeat past"><div class="weekmark">— ${esc(label)}${bank} —</div>${
            b.filler ? `<div class="filler">${esc(b.filler)}</div>` : ''
          }</div>`
        }
        case 'you':
          return `<div class="youbtn past">${esc(b.text ?? '')}</div>`
        case 'divider':
          return `<div class="era past"><span>${esc(b.text ?? '')}</span></div>`
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
  const fuseLine =
    fuse && fuse.total > 0
      ? `<div class="np-fuse">ANSWER WITHIN ${fuse.remaining} WEEK${fuse.remaining === 1 ? '' : 'S'}</div>`
      : ''
  const artId = scene.art ?? scene.speaker ?? null
  return `
  <aside class="scene-card">
    <canvas class="card-canvas"></canvas>
    <div class="portrait"><span class="sigil">${initial}</span>${
      artId ? `<img class="portrait-img" src="/art/${artId}.webp" alt="" onerror="this.remove()">` : ''
    }</div>
    <div class="nameplate">
      <div class="np-name">${esc(name)}</div>
      ${role ? `<div class="np-role">${esc(role)}</div>` : ''}
      ${fuseLine}
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

/** Renders authored effect deltas as chips — direction only, never magnitude.
 *  The player consents to the kind of cost; the size is lived, not shopped. */
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
  if (money) chip(money > 0, `${money > 0 ? '+' : '−'} cash`)
  if (stake) chip(stake < 0, `${stake > 0 ? '−' : '+'} equity`)
  if (rev) chip(rev > 0, `${rev > 0 ? '+' : '−'} revenue`)
  if (burn) chip(burn < 0, `${burn > 0 ? '+' : '−'} burn`)
  if (stress) chip(stress < 0, `${stress > 0 ? '+' : '−'} stress`)
  if (rep) chip(rep > 0, `${rep > 0 ? '+' : '−'} cred`)
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

/** Chat-style reveal queue — prose lands one line at a time, in story order. */
let revealQueue: HTMLElement[] = []
let revealTimer = 0
let pendingEl: HTMLElement | null = null

function finishTyping(): void {
  typing = false
  window.clearTimeout(revealTimer)
  for (const p of revealQueue) {
    p.classList.add('on')
    p.parentElement?.classList.add('on')
  }
  revealQueue = []
  if (pendingEl) pendingEl.style.visibility = 'visible'
}

/** Sentence splitter — zero-width breaks after end punctuation, so no text is
 *  ever lost. Built at runtime so engines without lookbehind fall back to
 *  whole-paragraph reveals instead of crashing the bundle. */
let SENT_BREAK: RegExp | null = null
try {
  SENT_BREAK = new RegExp('(?<=[.!?\\u2026]["\'\\u201d\\u2019)]?\\s)(?<!\\b(?:Mr|Mrs|Ms|Dr|St)\\.\\s)')
} catch {
  SENT_BREAK = null
}

/** Split a block's text into hidden paragraph/line spans, ready to fade in. */
function makeParas(el: HTMLElement, text: string): HTMLElement[] {
  el.textContent = ''
  const lines: HTMLElement[] = []
  for (const t of text.split(/\n{2,}/)) {
    const para = document.createElement('span')
    para.className = 'fadepara'
    for (const line of SENT_BREAK ? t.split(SENT_BREAK) : [t]) {
      const s = document.createElement('span')
      s.className = 'fadeline'
      s.textContent = line
      para.appendChild(s)
      lines.push(s)
    }
    el.appendChild(para)
  }
  return lines
}

/** Replace the left card for the scene being mounted — the face matches the voice.
 *  Decode-before-swap: the old print holds until the new one can paint, so an
 *  empty frame never shows. Superseded swaps are dropped. */
let cardSwapN = 0
function refreshCard(): void {
  if (!document.querySelector('.scene-card')) return
  const holder = document.createElement('div')
  holder.innerHTML = cardHtml()
  const next = holder.querySelector('.scene-card') as HTMLElement
  const img = next?.querySelector('.portrait-img') as HTMLImageElement | null
  const n = ++cardSwapN
  const swap = (): void => {
    if (n !== cardSwapN) return // a newer scene already claimed the card
    const cur = document.querySelector('.scene-card')
    if (!cur || !next) return
    cur.replaceWith(next)
    const canvas = next.querySelector('.card-canvas') as HTMLCanvasElement | null
    if (canvas) startAmbient(canvas)
  }
  // decode() resolves in a microtask when the bitmap is already warm; on
  // failure we swap anyway and the img's onerror reveals the sigil.
  if (img?.decode) img.decode().then(swap, swap)
  else swap()
}

/** Append the next scene skeleton and fade it in line by line.
 *  Headings live in the backend and the map only — in play, the story is one
 *  unbroken stream. */
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
  const segs = [...preSegs]
  const leadEl = beat.querySelector('.leadin') as HTMLElement | null
  if (leadEl && scene.leadIn) segs.push({ el: leadEl, text: scene.leadIn })
  segs.push({ el: beat.querySelector('.beat-prose') as HTMLElement, text: scene.prose })
  pendingEl = story.querySelector('.choices:last-of-type')
  if (pendingEl) pendingEl.innerHTML = choicesInner(sceneId)

  if (scene.kind === 'bridge') pendingEl?.classList.add('bridge')
  revealQueue = segs.flatMap((s) => makeParas(s.el, s.text))
  typing = true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishTyping()
    story.scrollTop = story.scrollHeight
    return
  }
  const step = (): void => {
    if (!typing) return
    const p = revealQueue.shift()
    if (!p) {
      finishTyping()
      return
    }
    p.classList.add('on')
    p.parentElement?.classList.add('on')
    story.scrollTop = story.scrollHeight // pin while the stream lands
    // Reading-paced: longer lines hold a beat longer.
    const wait = Math.min(620, 220 + (p.textContent?.length ?? 0) * 4)
    revealTimer = window.setTimeout(revealQueue.length ? step : finishTyping, wait)
  }
  step()
}

let renderedChapter = -1

// ---- the sound stage: music by era, tension by meters, rooms by scene --------

/** Which mood bed plays. BIG events only — acts, the endgame. Pure read. */
function moodOf(): 'build' | 'war' | 'aftermath' | 'endgame' {
  const f = st.company.flags
  if (f['endgame']) return 'endgame'
  if (f['act3_open']) return 'aftermath'
  if (f['act1_done']) return 'war'
  return 'build'
}

/** The danger stem: ticking fades in when the meters go red. Pure read. */
function tensionNow(): boolean {
  return st.company.treasury < 0 || runwayWeeks(st.company) < 10 || st.company.stress >= 70
}

/** Reconcile the decks with the moment. Film mode overrides the room. */
function applyStage(film = false): void {
  if (!st) return
  if (film || st.phase !== 'playing') {
    setStage({ mood: 'film', ambience: null, tension: false })
    return
  }
  const sceneId = st.company.queue[0]
  const scene = sceneId ? getScene(CONTENT, st.company.id, sceneId) : null
  if (scene?.kind === 'cutscene') {
    setStage({ mood: 'film', ambience: null, tension: false })
    return
  }
  setStage({ mood: moodOf(), ambience: scene?.ambience ?? null, tension: tensionNow() })
}

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
  applyStage()
  if (scene?.kind === 'cutscene') {
    stinger('cut', `cut:${scene.id}`)
    // World-scale moments take the screen; no choices, no headings — just the
    // weight. Consecutive cutscenes chain into one film: no Continue stops
    // between them, one door at the very end.
    const chain = [scene]
    let cur = scene
    while (cur.choices.length === 1 && cur.choices[0].goto) {
      const next = CONTENT.chapters[st.company.id].scenes.find((s) => s.id === cur.choices[0].goto)
      if (next?.kind !== 'cutscene' || st.company.seen.includes(next.id)) break
      chain.push(next)
      cur = next
    }
    const beats = chain.flatMap((sc) =>
      sc.screens?.length
        ? sc.screens.map((p) => ({ prose: p.prose, art: p.art }))
        : [{ prose: sc.prose, art: sc.art }],
    )
    showScreens(
      beats,
      () => {
        for (const sc of chain) {
          if (st.company.queue[0] !== sc.id) break // engine interjected; stop cleanly
          if (sc.marker) transcript.push({ kind: 'divider', text: sc.marker })
          transcript.push({
            kind: 'scene',
            title: sc.title,
            speakerName: sc.speaker ? CONTENT.characters[sc.speaker]?.name : 'THE WORLD',
            prose: sc.prose,
          })
          st = reduce(CONTENT, st, { t: 'choose', index: 0 })
        }
        refreshRail()
        persist()
        render()
      },
      'Continue →',
    )
    return
  }

  if (sceneId) mountScene(story, sceneId)
  // Jump, never sweep — returning from a takeover should land on the newest
  // beat instantly instead of scrolling the whole memoir past the reader.
  story.style.scrollBehavior = 'auto'
  story.scrollTop = chapterChanged ? 0 : story.scrollHeight
  story.style.scrollBehavior = ''
}

/** Sequential full-screen beats (interludes, prologues) — a film sequence.
 *  Each print gets a breath alone, then the prose plays as timed subtitles
 *  over a feathered lower vignette: one thought on screen at a time — fade
 *  in, hold at reading pace, fade out. Nothing accumulates, nothing grows.
 *  Unskippable by design; only the final passage offers a button. */
function showScreens(
  beats: { kicker?: string; title?: string; prose: string; art?: string }[],
  onDone?: () => void,
  cta = 'Begin \u2192',
  dateline?: string,
): void {
  // One "thought" per screen: sentences grouped to a subtitle-sized breath.
  type Unit = { art?: string; text: string; head: boolean }
  const units: Unit[] = []
  for (const b of beats) {
    let head = true
    for (const para of b.prose.split(/\n{2,}/)) {
      if (!para.trim()) continue
      let buf = ''
      for (const s of SENT_BREAK ? para.split(SENT_BREAK) : [para]) {
        if (buf && (buf + s).length > 170) {
          units.push({ art: b.art, text: buf.trim(), head })
          head = false
          buf = ''
        }
        buf += s
      }
      if (buf.trim()) {
        units.push({ art: b.art, text: buf.trim(), head })
        head = false
      }
    }
  }
  document.querySelector('.takeover')?.remove()
  if (!units.length) {
    onDone?.()
    return
  }
  setStage({ mood: 'film', ambience: null, tension: false }) // films own the air
  const cardMarkup = dateline
    ? `<div class="cine-card">${dateline
        .split('\n')
        .map((l, i) => `<div class="${i === 0 ? 'cc-top' : 'cc-main'}">${esc(l)}</div>`)
        .join('')}</div>`
    : ''
  takeover(
    `
    <img class="cine-bg" alt="">
    <div class="cine-veil"></div>
    ${cardMarkup}
    <p class="cine-sub"></p>
    <div class="cine-cue" hidden><span class="cue-glyph">▸</span><kbd class="kbd cue-kbd">space</kbd></div>
    <div class="cine-end" hidden><button class="cta" id="scrGo">${esc(cta)} <kbd class="kbd">space</kbd></button></div>`,
    'cine',
  )
  const tk = document.querySelector('.takeover') as HTMLElement
  const bg = tk.querySelector('.cine-bg') as HTMLImageElement
  const sub = tk.querySelector('.cine-sub') as HTMLElement
  const cue = tk.querySelector('.cine-cue') as HTMLElement
  const end = tk.querySelector('.cine-end') as HTMLElement
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  bg.addEventListener('error', () => {
    bg.style.opacity = '0' // art never blocks — the words play on ink
  })

  let timer = 0
  let curArt = ''
  let artN = 0
  let cur = 0
  let armed = false // clicks only count once the thought has fully landed
  const wait = (ms: number, fn: () => void): void => {
    timer = window.setTimeout(() => {
      if (tk.isConnected) fn()
    }, ms)
  }
  const setArt = (id?: string): void => {
    const src = id ? `/art/${id}.webp` : ''
    if (!src || src === curArt || !bg.isConnected) return
    const first = !curArt
    curArt = src
    artN += 1
    bg.style.opacity = '0'
    window.setTimeout(
      () => {
        if (!bg.isConnected) return
        bg.src = src
        // Hold the dark until the new print has decoded — never re-show the old frame.
        const reveal = (): void => {
          if (!bg.isConnected || bg.src !== new URL(src, location.href).href) return
          bg.classList.remove('drift-a', 'drift-b')
          void bg.offsetWidth
          bg.classList.add(artN % 2 ? 'drift-a' : 'drift-b')
          bg.style.opacity = '1'
        }
        bg.decode().then(reveal, () => {
          bg.style.opacity = '0' // failed print: stay on ink, words carry it
        })
      },
      first || reduced ? 0 : 420,
    )
  }
  const show = (i: number): void => {
    cur = i
    const u = units[i]
    armed = false
    cue.hidden = true
    tk.classList.remove('armed')
    sub.classList.remove('in') // previous thought fades down and out
    const speak = (): void => {
      sub.textContent = u.text
      void sub.offsetWidth
      sub.classList.add('in')
      // Arm once the fade lands — the thought holds until the reader clicks.
      wait(800, () => {
        armed = true
        tk.classList.add('armed')
        if (i + 1 < units.length) cue.hidden = false
        else end.hidden = false // the last thought stays; the door opens under it
      })
    }
    if (u.head) {
      setArt(u.art)
      wait(i === 0 ? 800 : 1400, speak) // the print breathes alone first
    } else {
      wait(420, speak) // clear air between thoughts
    }
  }

  tk.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('#scrGo')) {
      window.clearTimeout(timer)
      tk.remove()
      onDone?.()
      return
    }
    if (armed && cur + 1 < units.length) show(cur + 1)
  })
  if (dateline) {
    // Cold open: the dateline holds the dark, then the film starts.
    wait(reduced ? 1600 : 4600, () => {
      tk.querySelector('.cine-card')?.remove()
      show(0)
    })
  } else {
    show(0)
  }
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
      const showing = !panel.hidden && !panel.classList.contains('cast-mode')
      if (!showing) {
        panel.classList.remove('cast-mode')
        panel.innerHTML = incPanelHtml() + accountHtml()
        // Anchor just below the rail, whatever height it wrapped to.
        const rail = document.querySelector('.rail') as HTMLElement | null
        if (rail) panel.style.top = `${rail.offsetHeight + 10}px`
        panel.hidden = false
      } else {
        panel.hidden = true
      }
    }
    return
  }
  if (target.closest('#castToggle')) {
    const panel = document.getElementById('coPanel')
    if (panel) {
      const wasCast = !panel.hidden && panel.classList.contains('cast-mode')
      if (!wasCast) {
        panel.classList.add('cast-mode')
        panel.innerHTML = castPanelHtml()
        const rail = document.querySelector('.rail') as HTMLElement | null
        if (rail) panel.style.top = `${rail.offsetHeight + 10}px`
        panel.hidden = false
      } else {
        panel.hidden = true
      }
    }
    return
  }
  if (target.closest('#actSound')) {
    const next = !soundEnabled()
    setSoundEnabled(next)
    const b = document.getElementById('actSound')
    if (b) b.textContent = next ? 'ON' : 'OFF'
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

// Space advances: skips the reveal, turns bridges and cutscene paragraphs,
// dismisses single-CTA takeovers. Never decides a real choice.
window.addEventListener('keydown', (e) => {
  if (e.code !== 'Space') return
  const ae = document.activeElement as HTMLElement | null
  if (ae && ae.tagName === 'BUTTON') ae.blur() // avoid native double-activation
  const tk = document.querySelector('.takeover') as HTMLElement | null
  if (tk) {
    if (tk.classList.contains('cine')) {
      // Film sequence: space turns the page like a click; end button when shown.
      e.preventDefault()
      const go = tk.querySelector<HTMLElement>('#scrGo')
      if (go && go.offsetParent) go.click()
      else tk.click()
      return
    }
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

// ---- chapter close: film, card, record ----------------------------------------

const KIND_LABEL: Record<string, string> = {
  triumph: 'INITIAL PUBLIC OFFERING',
  sale: 'ACQUISITION',
  noble: 'BANKRUPTCY',
  disgrace: 'DISGRACE',
  transformation: 'TRANSFORMATION',
  ruin: 'RUIN',
}

interface ChapterClose {
  company: string
  endingId: string
  ending: ReturnType<typeof resolveEnding>
  weeks: number
  stake: number
  cash: number
  cred: number
  score: number
}

function resolveEnding(company: string, endingId: string) {
  return (
    CONTENT.chapters[company as keyof typeof CONTENT.chapters].endings.find((e) => e.id === endingId) ??
    CONTENT.chapters.hyperchute.endings[0]
  )
}

function chapterClose(): ChapterClose {
  const completed = st.ledger.completed[st.ledger.completed.length - 1]
  const company = completed?.company ?? st.company.id
  const endingId = completed?.endingId ?? st.company.endingId ?? 'bankrupt'
  return {
    company,
    endingId,
    ending: resolveEnding(company, endingId),
    weeks: st.epoch - st.company.foundedEpoch,
    stake: Math.round(st.company.capTable.find((s) => s.who === 'founder')?.pct ?? 0),
    cash: st.company.treasury,
    cred: st.world.reputation,
    score: st.ledger.founderScore,
  }
}

/** One write per chapter close: the founders-ledger row and this life's
 *  decided scenes, for community stats. Server counts; engine decided. */
let pushedClose = ''
let pushedClosePromise: Promise<void> = Promise.resolve()
function pushChapterClose(): Promise<void> {
  const c = chapterClose()
  const key = `${c.company}:${c.endingId}:${st.epoch}`
  if (pushedClose === key) return pushedClosePromise
  pushedClose = key
  const chapter = CONTENT.chapters[c.company as keyof typeof CONTENT.chapters]
  const sceneIds = new Set(chapter.scenes.map((s) => s.id))
  const decided = new Map<string, number>()
  for (const h of st.history) if (sceneIds.has(h.scene)) decided.set(h.scene, h.choice)
  const rows = [...decided.entries()].map(([scene, choice]) => ({ company: c.company, scene, choice }))
  pushedClosePromise = Promise.all([
    pushDecisions(rows),
    pushFounder({
      score: st.ledger.founderScore,
      chapters: st.ledger.completed.length,
      weeks: st.epoch,
      endings: st.ledger.completed.map((x) => `${x.company}:${x.endingId}`),
    }),
  ]).then(() => undefined)
  return pushedClosePromise
}

/** Move the biography into the next chapter (or the finale) — the old #next flow. */
function proceedNext(): void {
  document.querySelector('.takeover')?.remove()
  if (st.chapter + 1 >= CHAPTERS.length) {
    renderComplete()
    return
  }
  // Snapshot the life just ended, collapse it into a memoir card, then skip years.
  const c = chapterClose()
  const prevCompany = st.company
  const years = c.ending.skipYears ?? 1
  const spanFrom = 2031 + Math.floor(prevCompany.foundedEpoch / 52)
  const spanTo = 2031 + Math.floor((st.epoch + years * 52) / 52)

  st = reduce(CONTENT, st, { t: 'foundNext' })
  transcript = [
    {
      kind: 'chapter',
      company: prevCompany.id,
      endingTitle: c.ending.title,
      span: `${spanFrom}–${spanTo}`,
      stake: String(c.stake),
      kindLabel: KIND_LABEL[c.ending.kind] ?? c.ending.kind.toUpperCase(),
      weeks: c.weeks,
      score: c.score,
      cred: c.cred,
      cash: c.cash,
    },
    { kind: 'week', text: clockLabel() },
  ]
  persist()
  renderedChapter = -1
  render()

  const inter = c.ending.interlude
  const pro = CONTENT.chapters[st.company.id]?.prologue ?? []
  const screens: { kicker?: string; title?: string; prose: string; art?: string }[] = []
  if (inter) screens.push({ kicker: inter.kicker, title: inter.title, prose: inter.prose, art: inter.art })
  for (const p of pro) screens.push({ kicker: p.kicker, title: p.title, prose: p.prose, art: p.art })
  if (screens.length)
    showScreens(screens, () => render(), 'Begin →', CONTENT.chapters[st.company.id]?.dateline)
}

function achievementsHtml(c: ChapterClose): string {
  const defs = CONTENT.chapters[c.company as keyof typeof CONTENT.chapters].achievements ?? []
  if (!defs.length) return ''
  const earned = defs.filter((a) => evalPred(a.when, st))
  const cells = defs
    .map((a) => {
      const on = earned.includes(a)
      return `<div class="ach ${on ? 'on' : ''}">
        <div class="ach-mark">${on ? '◆' : '◇'}</div>
        <div><div class="ach-title">${esc(a.title)}</div><div class="ach-desc">${on ? esc(a.desc) : 'Not this life.'}</div></div>
      </div>`
    })
    .join('')
  return `<div class="rep-h"><span>ACHIEVEMENTS</span><span>${earned.length} / ${defs.length}</span></div>
  <div class="rep-achs">${cells}</div>`
}

function reportCastHtml(): string {
  const met = castRoster().filter((x) => x.met)
  if (!met.length) return ''
  const rows = met
    .map((x) => {
      const ch = CONTENT.characters[x.id]
      const stake = st.company.capTable.find((s) => s.who === x.id)?.pct ?? 0
      const bits = [standingChip(x.id), stake > 0 ? `<span class="cchip">${stake.toFixed(stake % 1 ? 1 : 0)}%</span>` : '']
        .filter(Boolean)
        .join('')
      return `<div class="cast-row">
        ${castFaceHtml(x.id, 'cast-face lg')}
        <div class="cast-meta">
          <div class="cast-name">${esc(ch.name)} ${bits}</div>
          <div class="cast-role">${esc(ch.role)}</div>
        </div>
      </div>`
    })
    .join('')
  return `<div class="rep-h"><span>THE CAST</span><span>${met.length} MET</span></div>
  <div class="rep-cast">${rows}</div>`
}

function communityShellHtml(c: ChapterClose): string {
  const sigs = CONTENT.chapters[c.company as keyof typeof CONTENT.chapters].signatures ?? []
  if (!sigs.length) return ''
  const rows = sigs
    .map(
      (s, i) => `<div class="sig-row" id="sig-${i}">
        <b class="sig-pct">··%</b>
        <span class="sig-text">of founders ${esc(s.text)}<em class="sig-you"></em></span>
      </div>`,
    )
    .join('')
  return `<div class="rep-h"><span>EVERY FOUNDER WHO CAME BEFORE YOU</span><span id="sigCount"></span></div>
  <div class="rep-sigs">${rows}</div>`
}

/** Fill the community rows once the tallies land. Numbers come from the server count. */
async function fillCommunity(c: ChapterClose): Promise<void> {
  const sigs = CONTENT.chapters[c.company as keyof typeof CONTENT.chapters].signatures ?? []
  if (!sigs.length) return
  await pushChapterClose() // own decisions count before the read
  const split = await fetchDecisionSplit(c.company)
  const decided = new Map<string, number>()
  for (const h of st.history) decided.set(h.scene, h.choice)
  sigs.forEach((sig, i) => {
    const row = document.getElementById(`sig-${i}`)
    if (!row) return
    const counts = split[sig.scene] ?? []
    const total = counts.reduce((s, x) => s + x.n, 0)
    const n = counts.find((x) => x.choice === sig.choice)?.n ?? 0
    const pctEl = row.querySelector('.sig-pct')
    const youEl = row.querySelector('.sig-you')
    if (pctEl) pctEl.textContent = total > 0 ? `${Math.round((100 * n) / total)}%` : '—'
    if (youEl) {
      const faced = decided.has(sig.scene)
      youEl.textContent = !faced
        ? ' — your road never crossed it'
        : decided.get(sig.scene) === sig.choice
          ? ' — so did you'
          : ' — you didn’t'
      if (decided.get(sig.scene) === sig.choice) row.classList.add('same')
    }
  })
  const totalFounders = Math.max(
    ...sigs.map((sig) => (split[sig.scene] ?? []).reduce((s, x) => s + x.n, 0)),
    0,
  )
  const countEl = document.getElementById('sigCount')
  if (countEl && totalFounders > 0) countEl.textContent = `${totalFounders} ON RECORD`
}

/** The record — end-of-chapter stats card. Walking-dead style, engine numbers only. */
function showChapterReport(): void {
  document.querySelector('.takeover')?.remove()
  const c = chapterClose()
  const isLast = st.chapter + 1 >= CHAPTERS.length
  const cta = isLast
    ? `<button class="cta" id="next">See how the life ends →</button>`
    : `<button class="cta" id="next">Wire the check — found ${esc(nextChapterName())} →</button>`
  const spanFrom = 2031 + Math.floor(st.company.foundedEpoch / 52)
  const spanTo = 2031 + Math.floor(st.epoch / 52)
  takeover(`
    <div class="tk-kicker">THE RECORD · ${esc(chapterTitle(c.company))}, INC. · ${spanFrom}–${spanTo}</div>
    <h1 class="tk-title rep-outcome">${esc(KIND_LABEL[c.ending.kind] ?? c.ending.kind.toUpperCase())}</h1>
    <div class="rep-ending">“${esc(c.ending.title)}”</div>
    <div class="rep-grid">
      <div class="rep-stat"><b>${c.weeks}</b><span>WEEKS<br/>LIVED</span></div>
      <div class="rep-stat"><b>${c.stake}%</b><span>FINAL<br/>STAKE</span></div>
      <div class="rep-stat"><b>${fmtMoney(c.cash)}</b><span>CASH AT<br/>CLOSE</span></div>
      <div class="rep-stat"><b>${c.cred >= 0 ? '+' : ''}${c.cred}</b><span>CRED</span></div>
      <div class="rep-stat"><b>${c.score}</b><span>FOUNDER<br/>SCORE</span></div>
    </div>
    ${achievementsHtml(c)}
    ${reportCastHtml()}
    ${communityShellHtml(c)}
    <div class="tk-actions">${cta}
      <a class="tk-link" href="/leaderboard.html" target="_blank" rel="noopener">FOUNDERS LEDGER ↗</a>
    </div>
  `)
  document.getElementById('next')?.addEventListener('click', proceedNext)
  void fillCommunity(c)
}

let filmPlayedFor = ''

function showEpilogue(): void {
  const c = chapterClose()
  void pushChapterClose()
  applyStage(true) // the chapter is closing: film mode, the room goes quiet
  // World-scale exits earn a film before the card — the IPO takes the screen.
  const filmKey = `${c.company}:${c.endingId}`
  if (c.ending.screens?.length && filmPlayedFor !== filmKey) {
    filmPlayedFor = filmKey
    showScreens(
      c.ending.screens.map((p) => ({ prose: p.prose, art: p.art })),
      () => showEpilogue(),
      'Continue →',
    )
    return
  }
  stinger(c.ending.kind === 'triumph' ? 'bell' : 'close', `end:${filmKey}`)
  takeover(`
    <div class="tk-kicker">CHAPTER CLOSED · ${esc(chapterTitle(c.company))}</div>
    ${c.ending.art ? `<img class="tk-art" src="/art/${c.ending.art}.webp" alt="" onerror="this.remove()">` : ''}
    <h1 class="tk-title">${esc(c.ending.title)}</h1>
    <p class="tk-body">${esc(c.ending.prose)}</p>
    ${biographyStrip()}
    <button class="cta" id="record">See the record →</button>
  `)
  document.getElementById('record')?.addEventListener('click', showChapterReport)
}

function renderEpilogue(): void {
  renderPlaying()
  showEpilogue()
}

function renderComplete(): void {
  renderPlaying()
  const years = Math.max(1, Math.round((st.epoch - st.ledger.completed[0]?.epoch / 1) / 52))
  const closing = `<p class="tk-body" style="margin-top:22px">This biography belongs to ${session ? esc(walletLabel(session)) : 'this wallet'}, finished and on the record. One wallet, one life — to live another, sign with another wallet.</p>
       <div class="tk-actions"><button class="cta" id="switchWallet">Sign out — new wallet, new life →</button>
       <a class="tk-link" href="/leaderboard.html" target="_blank" rel="noopener">FOUNDERS LEDGER ↗</a></div>`
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
  // The title screen hums the film bed once the first gesture unlocks audio.
  setStage({ mood: 'film', ambience: null, tension: false })
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
    () => render(),
    'Begin →',
    CONTENT.chapters[st.company.id].dateline,
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
  // Everything on screen joins history — beats, bridges, outcomes, week marks.
  for (const el of Array.from(story.children)) el.classList.add('past')

  st = reduce(CONTENT, st, { t: 'choose', index })

  refreshRail()
  applyStage()

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
    // Payroll cleared while the week turned — stamp what's left in the account.
    const bank = st.company.treasury < 0 ? `OVERDRAWN ${fmtMoney(st.company.treasury)}` : `BANK ${fmtMoney(st.company.treasury)}`
    transcript.push({ kind: 'week', text: clockLabel(), filler, bank })
    const wk = document.createElement('template')
    wk.innerHTML = `<div class="weekbeat"><div class="weekmark">— ${clockLabel()} · ${bank} —</div>${
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

/** Every known print, decoded once and held — retained references keep the
 *  bitmaps warm in the browser's image cache so cards paint instantly.
 *  Fire-and-forget; play never waits on art (law 5). */
const ART_CACHE = new Map<string, HTMLImageElement>()

function warmArt(): void {
  const ids = new Set<string>()
  // Current scene first — it's the one about to paint.
  const cur = st?.company?.queue?.[0]
  if (cur) {
    const s = getScene(CONTENT, st.company.id, cur)
    const a = s.art ?? s.speaker
    if (a) ids.add(a)
  }
  for (const id of Object.keys(CONTENT.characters)) ids.add(id)
  for (const ch of Object.values(CONTENT.chapters)) {
    for (const p of ch.prologue ?? []) if (p.art) ids.add(p.art)
    for (const s of ch.scenes) {
      if (s.art) ids.add(s.art)
      for (const p of s.screens ?? []) if (p.art) ids.add(p.art)
    }
    for (const e of ch.endings) {
      if (e.art) ids.add(e.art)
      if (e.interlude?.art) ids.add(e.interlude.art)
    }
  }
  for (const id of ids) {
    if (ART_CACHE.has(id)) continue
    const img = new Image()
    img.src = `/art/${id}.webp`
    img.decode?.().catch(() => {}) // missing art is fine — sigil covers it
    ART_CACHE.set(id, img)
  }
}

async function boot(): Promise<void> {
  initWalletDiscovery()
  warmArt()
  igniteOnFirstGesture()
  try {
    localStorage.removeItem(LEGACY_SAVE_KEY) // pre-auth saves: refresh restarts by design
    localStorage.removeItem('fate-theme') // the look is authored now; old prefs are void
  } catch {
    /* ignore */
  }
  session = await getSession()
  await enterAsFounder()
}

void boot()
