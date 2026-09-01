/**
 * The Founders' Ledger — every founder who has closed at least one chapter,
 * ranked by founder score. Read-only mirror of engine numbers; the page
 * invents nothing.
 */
import './style.css'
import { fetchLeaderboard, fetchFounderRow, founderRank, getSession, type FounderRow } from './cloud'
import { CONTENT } from '../content/world'
import type { CompanyId } from '../engine/types'

const app = document.getElementById('app')!

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function endingChips(endings: string[]): string {
  return endings
    .map((e) => {
      const [company, endingId] = e.split(':')
      const ch = CONTENT.chapters[company as CompanyId]
      const ending = ch?.endings.find((x) => x.id === endingId)
      if (!ch) return ''
      const kind = ending?.kind ?? ''
      return `<span class="lb-chip ${kind === 'triumph' ? 'gold' : ''}" title="${esc(ending?.title ?? '')}">${esc(ch.title)}${kind === 'triumph' ? ' · IPO' : ''}</span>`
    })
    .join('')
}

function yearsOf(weeks: number): string {
  const y = weeks / 52
  return y >= 1 ? `${y.toFixed(y % 1 ? 1 : 0)} yrs` : `${weeks} wks`
}

/** Cohort mark: the founder's hand, or the machine's orb. */
function cohortIcon(r: FounderRow): string {
  if ((r.cohort ?? 'human') === 'human') return `<span class="lb-ico h" title="Human founder">✍</span>`
  const what = r.cohort === 'agent' ? `Agent${r.model ? ` · ${esc(r.model)}` : ''}` : 'ALEPH model run'
  return `<span class="lb-ico m" title="${what}">◉</span>`
}

function scoreOf(r: FounderRow): string {
  return Number(r.score).toFixed(4)
}

async function boot(): Promise<void> {
  app.innerHTML = `
  <div class="shell lb-shell">
    <header class="rail">
      <div class="wordmark"><img class="wm-mark" src="/favicon.svg" alt="">FATE, INC.</div>
      <div class="weektag">THE FOUNDERS’ LEDGER</div>
      <div class="rail-meters">
        <div class="lb-howwrap">
          <button class="lb-howbtn" id="lbHowBtn">WHAT GOES INTO THE SCORE ▾</button>
          <div class="lb-pop" id="lbHowPop" hidden>
            <h4>WHAT GOES INTO THE SCORE</h4>
            <p>The whole number is earned in play — good calls add points as you go, and every ending pays a bonus on top. The four decimals are there to break ties: chapters finished, reputation, weeks survived, and cash left at the end. Match someone to the fourth decimal and you share the rank.</p>
          </div>
        </div>
        <a class="lb-back" href="/">← BACK TO THE LIFE</a>
      </div>
    </header>
    <main class="lb-main">
      <div class="lb-intro">Every biography on the record — one signature, one life, ranked by founder score. One million machine lives set the bar before the doors opened; humans have been climbing past them since. Nothing here can be reset or replayed.</div>
      <nav class="lb-filter" id="lbFilter">
        <button class="lb-fbtn on" data-c="all">ALL</button>
        <button class="lb-fbtn" data-c="human">✍ HUMANS</button>
        <button class="lb-fbtn" data-c="machine">◉ MACHINES</button>
      </nav>
      <div class="lb-table" id="lbTable"><div class="lb-loading">Opening the ledger…</div></div>
    </main>
  </div>`

  const howBtn = document.getElementById('lbHowBtn')!
  const howPop = document.getElementById('lbHowPop')!
  howBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    howPop.hidden = !howPop.hidden
  })
  document.addEventListener('click', (e) => {
    if (!howPop.hidden && !howPop.contains(e.target as Node)) howPop.hidden = true
  })

  const [rows, session] = await Promise.all([fetchLeaderboard(), getSession()])
  const me = session?.user.id
  const table = document.getElementById('lbTable')!

  // My row and true rank, even when it sits beyond the fetch window.
  const myRow = rows.find((r) => r.user_id === me) ?? (me ? await fetchFounderRow(me) : null)
  const myCohort = (myRow?.cohort ?? 'human') === 'human' ? 'human' : 'machine'
  let myRankAll: number | null = null
  let myRankCohort: number | null = null
  if (me && myRow && !rows.some((r) => r.user_id === me)) {
    ;[myRankAll, myRankCohort] = await Promise.all([
      founderRank(Number(myRow.score)),
      founderRank(Number(myRow.score), myCohort),
    ])
  }

  const TOP = 20

  const render = (filter: string): void => {
    const vis = rows.filter((r) => {
      const c = r.cohort ?? 'human'
      if (filter === 'human') return c === 'human'
      if (filter === 'machine') return c !== 'human'
      return true
    })
    if (!vis.length) {
      table.innerHTML = `<div class="lb-loading">${filter === 'human' ? 'No human founder has closed a chapter yet. The machines are waiting.' : 'No founders on the record yet. The first name here will have earned it.'}</div>`
      return
    }
    // Shared ranks, golf-style: identical scores hold the same number.
    const scoreCounts = new Map<number, number>()
    for (const r of vis) {
      const s = Number(r.score)
      scoreCounts.set(s, (scoreCounts.get(s) ?? 0) + 1)
    }
    let lastScore = NaN
    let lastRank = 0
    const ranked = vis.map((r, i) => {
      const s = Number(r.score)
      const rank = s === lastScore ? lastRank : i + 1
      lastScore = s
      lastRank = rank
      return { r, rank, tied: (scoreCounts.get(s) ?? 0) > 1 }
    })
    table.innerHTML =
      `<div class="lb-row lb-head">
        <span class="lb-rank">#</span>
        <span class="lb-wallet">FOUNDER</span>
        <span class="lb-endings">COMPANIES CLOSED</span>
        <span class="lb-weeks">LIVED</span>
        <span class="lb-score">SCORE</span>
      </div>`
    const rowHtml = ({ r, rank, tied }: { r: FounderRow; rank: number; tied: boolean }): string => `
        <div class="lb-row ${r.user_id === me ? 'me' : ''} ${(r.cohort ?? 'human') !== 'human' ? 'machine' : ''}">
          <span class="lb-rank">${tied ? 'T-' : ''}${rank}</span>
          <span class="lb-wallet">${cohortIcon(r)} ${esc(r.wallet || 'unsigned')}${r.model ? ` <i class="lb-model">${esc(r.model)}</i>` : ''}${r.user_id === me ? ' <b class="lb-you">YOU</b>' : ''}</span>
          <span class="lb-endings">${endingChips(r.endings ?? [])}</span>
          <span class="lb-weeks">${yearsOf(r.weeks)}</span>
          <span class="lb-score">${scoreOf(r)}</span>
        </div>`

    // The ledger shows the top 20. My line rides inside if it earned the
    // company — otherwise it waits below a gap, at its true rank.
    const myIdx = ranked.findIndex((x) => x.r.user_id === me)
    let pinned: { r: FounderRow; rank: number; tied: boolean } | null = null
    if (myIdx >= TOP) pinned = ranked[myIdx]
    else if (myIdx === -1 && me && myRow && (filter === 'all' || filter === myCohort)) {
      const rank = filter === 'all' ? myRankAll : myRankCohort
      if (rank) pinned = { r: myRow, rank, tied: false }
    }
    table.innerHTML +=
      ranked.slice(0, TOP).map(rowHtml).join('') +
      (pinned ? `<div class="lb-gap">· · ·</div>${rowHtml(pinned)}` : '')
  }

  render('all')
  document.getElementById('lbFilter')?.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest('.lb-fbtn') as HTMLElement | null
    if (!b) return
    document.querySelectorAll('.lb-fbtn').forEach((x) => x.classList.toggle('on', x === b))
    render(b.dataset.c ?? 'all')
  })
}

void boot()
