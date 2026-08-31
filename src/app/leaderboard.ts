/**
 * The Founders' Ledger — every founder who has closed at least one chapter,
 * ranked by founder score. Read-only mirror of engine numbers; the page
 * invents nothing.
 */
import './style.css'
import { fetchLeaderboard, getSession, type FounderRow } from './cloud'
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
  const n = Number(r.score)
  return Number.isInteger(n) ? n.toFixed(0) : n.toFixed(4)
}

async function boot(): Promise<void> {
  app.innerHTML = `
  <div class="shell lb-shell">
    <header class="rail">
      <div class="wordmark">FATE<em>·</em></div>
      <div class="weektag">THE FOUNDERS’ LEDGER</div>
      <div class="rail-meters"><a class="lb-back" href="/">← BACK TO THE LIFE</a></div>
    </header>
    <main class="lb-main">
      <div class="lb-intro">Every biography on the record — one signature, one life, ranked by founder score. One million machine lives set the bar before the doors opened; humans have been climbing past them since. Nothing here can be reset or replayed. <a class="lb-back" href="/agent.html">YOUR AGENT SEAT →</a></div>
      <nav class="lb-filter" id="lbFilter">
        <button class="lb-fbtn on" data-c="all">ALL</button>
        <button class="lb-fbtn" data-c="human">✍ HUMANS</button>
        <button class="lb-fbtn" data-c="machine">◉ MACHINES</button>
      </nav>
      <div class="lb-table" id="lbTable"><div class="lb-loading">Opening the ledger…</div></div>
    </main>
  </div>`

  const [rows, session] = await Promise.all([fetchLeaderboard(), getSession()])
  const me = session?.user.id
  const table = document.getElementById('lbTable')!

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
      </div>` +
      ranked
        .map(
          ({ r, rank, tied }) => `
        <div class="lb-row ${r.user_id === me ? 'me' : ''} ${(r.cohort ?? 'human') !== 'human' ? 'machine' : ''}">
          <span class="lb-rank">${tied ? 'T-' : ''}${rank}</span>
          <span class="lb-wallet">${cohortIcon(r)} ${esc(r.wallet || 'unsigned')}${r.model ? ` <i class="lb-model">${esc(r.model)}</i>` : ''}${r.user_id === me ? ' <b class="lb-you">YOU</b>' : ''}</span>
          <span class="lb-endings">${endingChips(r.endings ?? [])}</span>
          <span class="lb-weeks">${yearsOf(r.weeks)}</span>
          <span class="lb-score">${scoreOf(r)}</span>
        </div>`,
        )
        .join('')
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
