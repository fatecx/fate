/**
 * Merge per-persona sim shards into one flight record.
 *
 * The million-life baseline ran as 8 nohup shards (one persona each,
 * weighted population). Each shard wrote a full report; this folds them
 * into sim/report.json so the map's SIM tab shows the whole million.
 * Quantiles (weeks-to-close, stress bands) merge as n-weighted means —
 * an approximation fit for a review surface, not for gates.
 *
 *   npx tsx scripts/sim/merge.ts            # merges sim/shard-*.json
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'

type Q3 = { p10: number; p50: number; p90: number }
type Band = { w: number; n: number; stress: number[]; treasury: number[]; runway: number[] }

const dir = 'sim'
const files = readdirSync(dir)
  .filter((f) => f.startsWith('shard-') && f.endsWith('.json'))
  .map((f) => join(dir, f))
if (!files.length) throw new Error('no sim/shard-*.json to merge')

const shards = files.map((f) => JSON.parse(readFileSync(f, 'utf8')))

const out: Record<string, unknown> = {
  generated: shards
    .map((s) => s.generated as string)
    .sort()
    .at(-1),
  mergedFrom: files.map((f) => basename(f)),
  engineRunsPerPolicy: null,
  policies: [] as string[],
  wallMs: 0,
}

const policies: string[] = []
const perPolicy: Record<string, any> = {}
for (const s of shards) {
  out.wallMs = (out.wallMs as number) + s.wallMs
  for (const pol of s.policies as string[]) if (!policies.includes(pol)) policies.push(pol)
  for (const [pol, P] of Object.entries<any>(s.perPolicy)) {
    if (!perPolicy[pol]) {
      perPolicy[pol] = P
      continue
    }
    // Same persona in two shards: sum counts, weight the quantiles.
    const a = perPolicy[pol]
    const wA = a.runs
    const wB = P.runs
    const wq = (x: Q3, y: Q3): Q3 => ({
      p10: Math.round((x.p10 * wA + y.p10 * wB) / (wA + wB)),
      p50: Math.round((x.p50 * wA + y.p50 * wB) / (wA + wB)),
      p90: Math.round((x.p90 * wA + y.p90 * wB) / (wA + wB)),
    })
    a.score = wq(a.score, P.score)
    a.epochs = wq(a.epochs, P.epochs)
    a.panicsPerRun = +((a.panicsPerRun * wA + P.panicsPerRun * wB) / (wA + wB)).toFixed(2)
    for (const ch of Object.keys(P.endings))
      for (const [e, n] of Object.entries<number>(P.endings[ch]))
        a.endings[ch][e] = (a.endings[ch][e] ?? 0) + n
    a.aborted += P.aborted
    a.exceptions.push(...P.exceptions)
    a.violations.push(...P.violations)
    a.runs += P.runs
  }
}
out.policies = policies
out.perPolicy = perPolicy

// Coverage: a scene is unvisited only if NO shard reached it; same for choices.
const first = shards[0]
const inAll = <T>(lists: T[][], keyOf: (t: T) => string): T[] => {
  const counts = new Map<string, { t: T; n: number }>()
  for (const list of lists)
    for (const t of list) {
      const k = keyOf(t)
      const c = counts.get(k)
      if (c) c.n++
      else counts.set(k, { t, n: 1 })
    }
  return [...counts.values()].filter((c) => c.n === lists.length).map((c) => c.t)
}
const unvisited = inAll(
  shards.map((s) => s.coverage.unvisited),
  (u: any) => u.key,
)
const neverTaken = inAll(
  shards.map((s) => s.coverage.neverTaken),
  (c: any) => `${c.key}||${c.label}`,
).map((c: any) => ({ ...c }))

// Hard gates: union, pass rates recombined by evals.
const gates = new Map<string, any>()
for (const s of shards)
  for (const g of s.coverage.hardGates as any[]) {
    const k = `${g.key}||${g.label}`
    const prev = gates.get(k)
    if (!prev) gates.set(k, { ...g })
    else {
      const evals = prev.evals + g.evals
      prev.passRate = (prev.passRate * prev.evals + g.passRate * g.evals) / evals
      prev.evals = evals
    }
  }
out.coverage = {
  scenes: first.coverage.scenes,
  visited: first.coverage.scenes - unvisited.length,
  unvisited,
  neverTaken,
  hardGates: [...gates.values()].sort((a, b) => a.passRate - b.passRate).slice(0, 40),
}

// Weeks-to-close and stress bands: n-weighted merges.
const weeksToClose: Record<string, Q3 & { n: number }> = {}
const bands: Record<string, Band[]> = {}
for (const ch of Object.keys(first.weeksToClose)) {
  let n = 0
  let p10 = 0
  let p50 = 0
  let p90 = 0
  for (const s of shards) {
    const w = s.weeksToClose[ch]
    if (!w?.n) continue
    p10 += w.p10 * w.n
    p50 += w.p50 * w.n
    p90 += w.p90 * w.n
    n += w.n
  }
  weeksToClose[ch] = { n, p10: Math.round(p10 / n), p50: Math.round(p50 / n), p90: Math.round(p90 / n) }

  const byWeek = new Map<number, Band>()
  for (const s of shards)
    for (const b of (s.bands[ch] ?? []) as Band[]) {
      const prev = byWeek.get(b.w)
      if (!prev) {
        byWeek.set(b.w, { w: b.w, n: b.n, stress: [...b.stress], treasury: [...b.treasury], runway: [...b.runway] })
        continue
      }
      const n2 = prev.n + b.n
      for (const f of ['stress', 'treasury', 'runway'] as const)
        prev[f] = prev[f].map((v, i) => (v * prev.n + b[f][i] * b.n) / n2)
      prev.n = n2
    }
  bands[ch] = [...byWeek.values()].sort((a, b) => a.w - b.w)
}
out.weeksToClose = weeksToClose
out.bands = bands

// Scene stats and ending tuples: plain sums.
const sceneStats = new Map<string, { visits: number; choices: number[] }>()
for (const s of shards) {
  const entries: [string, { visits: number; choices: number[] }][] = Array.isArray(s.sceneStats)
    ? s.sceneStats
    : Object.entries(s.sceneStats ?? {})
  for (const [key, st] of entries) {
    const prev = sceneStats.get(key)
    if (!prev) sceneStats.set(key, { visits: st.visits, choices: [...st.choices] })
    else {
      prev.visits += st.visits
      st.choices.forEach((c, i) => (prev.choices[i] = (prev.choices[i] ?? 0) + c))
    }
  }
}
out.sceneStats = Object.fromEntries(sceneStats)

const tuples: Record<string, number> = {}
for (const s of shards) for (const [k, n] of Object.entries<number>(s.tuples ?? {})) tuples[k] = (tuples[k] ?? 0) + n
out.tuples = tuples

out.top = shards
  .flatMap((s) => s.top ?? [])
  .sort((a, b) => b.score - a.score)
  .slice(0, 20)

writeFileSync(join(dir, 'report.json'), JSON.stringify(out))
const total = Object.values(perPolicy).reduce((a: number, p: any) => a + p.runs, 0)
console.log(`merged ${files.length} shards → sim/report.json · ${total.toLocaleString()} lives · ${policies.length} personas`)
