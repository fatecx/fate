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

async function boot(): Promise<void> {
  app.innerHTML = `
  <div class="shell lb-shell">
    <header class="rail">
      <div class="wordmark">FATE<em>·</em></div>
      <div class="weektag">THE FOUNDERS’ LEDGER</div>
      <div class="rail-meters"><a class="lb-back" href="/">← BACK TO THE LIFE</a></div>
    </header>
    <main class="lb-main">
      <div class="lb-intro">Every biography on the record — one signature, one life, ranked by founder score. Scores accrue across all three companies; nothing here can be reset or replayed.</div>
      <div class="lb-table" id="lbTable"><div class="lb-loading">Opening the ledger…</div></div>
    </main>
  </div>`

  const [rows, session] = await Promise.all([fetchLeaderboard(), getSession()])
  const me = session?.user.id
  const table = document.getElementById('lbTable')!
  if (!rows.length) {
    table.innerHTML = `<div class="lb-loading">No founders on the record yet. The first name here will have earned it.</div>`
    return
  }
  table.innerHTML =
    `<div class="lb-row lb-head">
      <span class="lb-rank">#</span>
      <span class="lb-wallet">FOUNDER</span>
      <span class="lb-endings">COMPANIES CLOSED</span>
      <span class="lb-weeks">LIVED</span>
      <span class="lb-score">SCORE</span>
    </div>` +
    rows
      .map(
        (r: FounderRow, i: number) => `
      <div class="lb-row ${r.user_id === me ? 'me' : ''}">
        <span class="lb-rank">${i + 1}</span>
        <span class="lb-wallet">${esc(r.wallet || 'unsigned')}${r.user_id === me ? ' <b class="lb-you">YOU</b>' : ''}</span>
        <span class="lb-endings">${endingChips(r.endings ?? [])}</span>
        <span class="lb-weeks">${yearsOf(r.weeks)}</span>
        <span class="lb-score">${r.score}</span>
      </div>`,
      )
      .join('')
}

void boot()
