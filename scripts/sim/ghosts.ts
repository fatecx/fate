/**
 * THE GHOSTS — the twenty best lives from the million, seeded to the ledger.
 *
 * ALEPH ran the futures before the doors opened; these are its finest model
 * runs, cohort ◉, named in its own register style. Reads sim/shard-*.json
 * top lists, crowns 20, writes sim/ghosts.sql for the management API.
 *
 *   npm run sim:ghosts
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

const simDir = join(process.cwd(), 'sim')
const CHAPTERS = ['hyperchute', 'teleport', 'skyline']

interface TopLife {
  seed: number
  policy: string
  score: number
  weeks: number
  endings: string[]
  panics: number
}

const all: TopLife[] = []
for (const f of readdirSync(simDir).filter((x) => x.startsWith('shard-') && x.endsWith('.json'))) {
  const r = JSON.parse(readFileSync(join(simDir, f), 'utf8'))
  for (const t of (r.top ?? []) as TopLife[]) all.push(t)
}
if (!all.length) {
  console.error('no top lives found in shards')
  process.exit(1)
}
all.sort((a, b) => b.score - a.score)
// Machines are deterministic: many seeds converge on identical lives. The
// board wants twenty GHOSTS, not one ghost twenty times — dedupe exact
// signatures and cap each persona at three seats.
const seenSig = new Set<string>()
const perPersona = new Map<string, number>()
const ghosts: TopLife[] = []
for (const g of all) {
  const sig = `${g.score}|${g.weeks}|${g.endings.join(',')}`
  if (seenSig.has(sig)) continue
  if ((perPersona.get(g.policy) ?? 0) >= 3) continue
  seenSig.add(sig)
  perPersona.set(g.policy, (perPersona.get(g.policy) ?? 0) + 1)
  ghosts.push(g)
  if (ghosts.length === 20) break
}
// Fill remaining seats with unique lives regardless of persona.
if (ghosts.length < 20)
  for (const g of all) {
    const sig = `${g.score}|${g.weeks}|${g.endings.join(',')}`
    if (seenSig.has(sig)) continue
    seenSig.add(sig)
    ghosts.push(g)
    if (ghosts.length === 20) break
  }

const PERSONA_EPITHET: Record<string, string> = {
  saint: 'THE HONEST ONE',
  shark: 'THE COLLECTOR',
  coward: 'THE CAREFUL ONE',
  loyalist: 'EVERYONE’S FRIEND',
  speedrunner: 'THE SPRINTER',
  elite: 'THE CLIMBER',
  greedy: 'THE DEALMAKER',
  random: 'THE GAMBLER',
}

// Earned epithets override persona ones for standouts.
const byWeeks = [...ghosts].sort((a, b) => b.weeks - a.weeks)[0]
const byPanics = [...ghosts].sort((a, b) => b.panics - a.panics)[0]
const epithetOf = (g: TopLife, rank: number): string => {
  if (rank === 0) return 'THE SUMMIT'
  if (g === byWeeks) return 'THE PATIENT ONE'
  if (g === byPanics && g.panics > 0) return 'THE SURVIVOR'
  return PERSONA_EPITHET[g.policy] ?? 'THE MODEL'
}

const seen = new Map<string, number>()
const rows = ghosts.map((g, i) => {
  let ep = epithetOf(g, i)
  const n = (seen.get(ep) ?? 0) + 1
  seen.set(ep, n)
  if (n > 1) ep = `${ep} ${'II III IV V VI VII VIII IX X'.split(' ')[n - 2] ?? n}`
  const wallet = `BOT ${String(g.seed % 1_000_000).padStart(6, "0")} · ${ep}`
  const endings = g.endings.map((e, k) => `${CHAPTERS[k]}:${e}`)
  return {
    user_id: randomUUID(),
    wallet,
    chain: 'model',
    cohort: 'model',
    model: `aleph/${g.policy}`,
    score: g.score,
    chapters: endings.length,
    weeks: g.weeks,
    endings,
  }
})

const values = rows
  .map(
    (r) =>
      `('${r.user_id}','${r.wallet.replace(/'/g, "''")}','${r.chain}','${r.cohort}','${r.model}',${r.score},${r.chapters},${r.weeks},'${JSON.stringify(r.endings)}'::jsonb, now())`,
  )
  .join(',\n')
const sql = `begin;
delete from public.founders where cohort = 'model';
insert into public.founders (user_id, wallet, chain, cohort, model, score, chapters, weeks, endings, updated_at) values
${values};
commit;`
writeFileSync(join(simDir, 'ghosts.sql'), sql)
console.log(`${rows.length} ghosts crowned · top score ${rows[0].score} (${rows[0].wallet})`)
console.log('wrote sim/ghosts.sql')
for (const r of rows.slice(0, 5)) console.log(' ', r.wallet, r.score, r.endings.join(' '))
