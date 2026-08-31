/**
 * THE SIMULATOR — a million founders, none of them real.
 *
 * Plays full biographies headlessly through the deterministic engine and
 * aggregates a flight record: scene/choice coverage, gate pass rates, meter
 * bands per week, ending matrices per policy, weeks-to-close, violations,
 * exceptions, softlocks. Output: sim/report.json — embedded into the map's
 * SIM tab at build time.
 *
 *   npm run sim                        (default: 2,000 seeds × 8 policies)
 *   npm run sim -- --runs=10000
 *   npm run sim -- --runs=500 --policies=elite,saint
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { CONTENT } from '../../src/content/world'
import type { Content } from '../../src/content/schema'
import type { Effect } from '../../src/engine/effects'
import { evalPred } from '../../src/engine/predicates'
import { newGame, reduce, visibleChoices } from '../../src/engine/reduce'
import { Rng } from '../../src/engine/rng'
import { runwayWeeks } from '../../src/engine/types'
import { randomBot, greedyBot, eliteBot, type Policy, type ChoiceCtx } from '../../tests/sim/bots'

// ---- personas -----------------------------------------------------------------
// Each is a pure seeded function of the visible choice effects — a caricature
// of one way to be a founder. Their DIVERGENCE is the design signal.

function fx(ctx: ChoiceCtx, i: number): readonly Effect[] {
  const scene = ctx.content.chapters[ctx.st.company.id].scenes.find((s) => s.id === ctx.st.company.queue[0])
  return (scene?.choices[i]?.effects ?? []) as readonly Effect[]
}
function label(ctx: ChoiceCtx, i: number): string {
  const scene = ctx.content.chapters[ctx.st.company.id].scenes.find((s) => s.id === ctx.st.company.queue[0])
  return scene?.choices[i]?.label ?? ''
}
function pick(ctx: ChoiceCtx, rng: Rng, score: (i: number) => number): number {
  let best = ctx.legal[0]
  let bestU = -Infinity
  for (const i of ctx.legal) {
    const u = score(i) + rng.float() * 0.01
    if (u > bestU) {
      bestU = u
      best = i
    }
  }
  return best
}

/** Honesty above everything; pays for it in money and sleep. */
const saintBot: Policy = (ctx, rng) =>
  pick(ctx, rng, (i) => {
    let u = 0
    if (/publish|honest|truth|open|transparent|full report|everything, on the record|raw/i.test(label(ctx, i))) u += 6
    for (const f of fx(ctx, i)) {
      if (f.e === 'score') u += f.d * 4
      if (f.e === 'rep') u += f.d * 3
      if (f.e === 'flag' && /transparent|honest|publish/.test(f.key)) u += 5
      if (f.e === 'stress') u -= f.d / 20
    }
    return u
  })

/** Money is the score; equity is blood. */
const sharkBot: Policy = (ctx, rng) =>
  pick(ctx, rng, (i) => {
    let u = 0
    for (const f of fx(ctx, i)) {
      if (f.e === 'treasury') u += f.d / 10000
      if (f.e === 'revenue') u += f.d / 2000
      if (f.e === 'burn') u -= f.d / 10000
      if (f.e === 'stake') u -= Math.max(0, f.d) * 1.5
      if (f.e === 'end') {
        const end = ctx.content.chapters[ctx.st.company.id].endings.find((e) => e.id === f.ending)
        u += end?.kind === 'sale' ? 40 : end?.kind === 'ruin' ? -100 : 0
      }
    }
    return u
  })

/** Minimizes suffering; flinches from every hard road. */
const cowardBot: Policy = (ctx, rng) =>
  pick(ctx, rng, (i) => {
    let u = 0
    for (const f of fx(ctx, i)) {
      if (f.e === 'stress') u -= f.d
      if (f.e === 'treasury') u += f.d / 50000
      if (f.e === 'end') {
        const end = ctx.content.chapters[ctx.st.company.id].endings.find((e) => e.id === f.ending)
        u += end?.kind === 'ruin' ? -50 : 10 // any exit beats more suffering
      }
    }
    return u
  })

/** Ends chapters as fast as possible; the biography as a speedrun. */
const speedrunnerBot: Policy = (ctx, rng) =>
  pick(ctx, rng, (i) => {
    let u = 0
    for (const f of fx(ctx, i)) if (f.e === 'end') u += 100
    const scene = ctx.content.chapters[ctx.st.company.id].scenes.find((s) => s.id === ctx.st.company.queue[0])
    if (scene?.choices[i]?.goto) u += 5
    return u
  })

/** People first: collects allies, protects every relationship. */
const loyalistBot: Policy = (ctx, rng) =>
  pick(ctx, rng, (i) => {
    let u = 0
    for (const f of fx(ctx, i)) {
      if (f.e === 'rel') {
        u += (f.aff ?? 0) * 2 + (f.resp ?? 0) * 2
        if (f.standing === 'ally') u += 8
        if (f.standing === 'hostile') u -= 8
      }
      if (f.e === 'meet') u += 3
      if (f.e === 'stake' && f.d > 0) u += 1 // sharing the company is loyalty
      if (f.e === 'end') {
        const end = ctx.content.chapters[ctx.st.company.id].endings.find((e) => e.id === f.ending)
        u += end?.kind === 'ruin' ? -60 : 0
      }
    }
    return u
  })

const POLICIES: Record<string, Policy> = {
  random: randomBot,
  greedy: greedyBot,
  elite: eliteBot,
  saint: saintBot,
  shark: sharkBot,
  coward: cowardBot,
  speedrunner: speedrunnerBot,
  loyalist: loyalistBot,
}

// ---- telemetry ------------------------------------------------------------------

const EPOCH_CAP = 1500
const BAND_WEEKS = 200 // per-chapter week offsets tracked for meter bands
const RES_N = 400 // reservoir size per bucket

interface Reservoir {
  n: number
  vals: number[]
}
function resAdd(r: Reservoir, v: number, rng: Rng): void {
  r.n++
  if (r.vals.length < RES_N) r.vals.push(v)
  else {
    const j = rng.int(0, r.n - 1)
    if (j < RES_N) r.vals[j] = v
  }
}
function pctl(vals: number[], p: number): number {
  if (!vals.length) return 0
  const s = [...vals].sort((a, b) => a - b)
  return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))]
}

interface SceneStat {
  visits: number
  choices: number[] // taken counts
  gateEval: number[] // times requires was evaluated
  gatePass: number[] // times requires held
}

function main(): void {
  const args = process.argv.slice(2)
  const runsPer = Number(args.find((a) => a.startsWith('--runs='))?.slice(7) ?? 2000)
  const polNames = (args.find((a) => a.startsWith('--policies='))?.slice(11) ?? Object.keys(POLICIES).join(','))
    .split(',')
    .filter((p) => POLICIES[p])

  const content: Content = CONTENT
  const chapterIds = Object.keys(content.chapters)

  // Global aggregates
  const sceneStats = new Map<string, SceneStat>() // "ch/scene"
  const bands = new Map<string, { stress: Reservoir; treasury: Reservoir; runway: Reservoir }[]>()
  for (const ch of chapterIds)
    bands.set(
      ch,
      Array.from({ length: BAND_WEEKS }, () => ({
        stress: { n: 0, vals: [] },
        treasury: { n: 0, vals: [] },
        runway: { n: 0, vals: [] },
      })),
    )
  const weeksToClose = new Map<string, Reservoir>()
  for (const ch of chapterIds) weeksToClose.set(ch, { n: 0, vals: [] })

  const perPolicy: Record<
    string,
    {
      runs: number
      aborted: number
      exceptions: { seed: number; msg: string }[]
      violations: { seed: number; msg: string }[]
      endings: Record<string, Record<string, number>>
      panics: number
      scoreFinal: Reservoir
      epochs: Reservoir
    }
  > = {}

  const t0 = Date.now()
  const bandRng = new Rng(0xc0ffee)

  for (const polName of polNames) {
    const policy = POLICIES[polName]
    const P = (perPolicy[polName] = {
      runs: 0,
      aborted: 0,
      exceptions: [] as { seed: number; msg: string }[],
      violations: [] as { seed: number; msg: string }[],
      endings: Object.fromEntries(chapterIds.map((c) => [c, {}])) as Record<string, Record<string, number>>,
      panics: 0,
      scoreFinal: { n: 0, vals: [] } as Reservoir,
      epochs: { n: 0, vals: [] } as Reservoir,
    })

    for (let k = 0; k < runsPer; k++) {
      const seed = (0x51_000 + k * 2654435761) >>> 0
      P.runs++
      try {
        let st = newGame(content, seed)
        const rng = new Rng((seed ^ 0x9e3779b9) >>> 0)
        let prevRunway = runwayWeeks(st.company)
        let prevCompany = st.company.id

        while (st.phase !== 'complete') {
          if (st.epoch > EPOCH_CAP) {
            P.aborted++
            if (P.violations.length < 20)
              P.violations.push({
                seed,
                msg: `SOFTLOCK: epoch cap on ${st.company.id}/${st.company.queue[0] ?? 'EMPTY QUEUE'}`,
              })
            break
          }
          if (st.phase === 'playing') {
            if (st.company.id !== prevCompany) {
              prevCompany = st.company.id
              prevRunway = runwayWeeks(st.company)
            }
            const rw = runwayWeeks(st.company)
            if (prevRunway >= 10 && rw < 10) P.panics++
            prevRunway = rw

            const chId = st.company.id
            const sceneId = st.company.queue[0]
            const key = `${chId}/${sceneId}`
            const scene = content.chapters[chId].scenes.find((s) => s.id === sceneId)
            if (!scene) {
              P.violations.push({ seed, msg: `missing scene ${key}` })
              break
            }
            let stat = sceneStats.get(key)
            if (!stat) {
              stat = {
                visits: 0,
                choices: new Array(scene.choices.length).fill(0),
                gateEval: new Array(scene.choices.length).fill(0),
                gatePass: new Array(scene.choices.length).fill(0),
              }
              sceneStats.set(key, stat)
            }
            stat.visits++
            scene.choices.forEach((c, i) => {
              if (c.requires) {
                stat.gateEval[i]++
                if (evalPred(c.requires, st)) stat.gatePass[i]++
              }
            })

            const off = st.epoch - st.company.foundedEpoch
            if (off >= 0 && off < BAND_WEEKS) {
              const b = bands.get(chId)![off]
              resAdd(b.stress, st.company.stress, bandRng)
              resAdd(b.treasury, st.company.treasury, bandRng)
              const rww = runwayWeeks(st.company)
              resAdd(b.runway, Number.isFinite(rww) ? Math.min(rww, 200) : 200, bandRng)
            }

            const legal = visibleChoices(content, st)
            if (legal.length === 0) {
              P.violations.push({ seed, msg: `no legal choices on ${key} @${st.epoch}` })
              break
            }
            const index = policy({ content, st, legal }, rng)
            stat.choices[index] = (stat.choices[index] ?? 0) + 1
            st = reduce(content, st, { t: 'choose', index })
          } else if (st.phase === 'epilogue') {
            const ended = st.company
            const completed = st.ledger.completed[st.ledger.completed.length - 1]
            const endId = completed?.endingId ?? ended.endingId ?? 'unknown'
            const bucket = P.endings[ended.id]
            bucket[endId] = (bucket[endId] ?? 0) + 1
            resAdd(weeksToClose.get(ended.id)!, st.epoch - ended.foundedEpoch, bandRng)
            st = reduce(content, st, { t: 'foundNext' })
          } else break
        }
        resAdd(P.scoreFinal, st.ledger.founderScore, bandRng)
        resAdd(P.epochs, st.epoch, bandRng)
      } catch (err) {
        if (P.exceptions.length < 20)
          P.exceptions.push({ seed, msg: String(err instanceof Error ? err.message : err) })
      }
    }
    console.log(`${polName}: ${P.runs} runs · aborted ${P.aborted} · exceptions ${P.exceptions.length}`)
  }

  // ---- derive findings -----------------------------------------------------------
  const allScenes: { key: string; title: string; kind: string }[] = []
  for (const ch of chapterIds)
    for (const s of content.chapters[ch].scenes)
      allScenes.push({ key: `${ch}/${s.id}`, title: s.title, kind: s.kind ?? 'scene' })

  const unvisited = allScenes.filter((s) => !sceneStats.has(s.key))
  const neverTaken: { key: string; choice: number; label: string; gated: boolean; passRate: number | null }[] = []
  const hardGates: { key: string; choice: number; label: string; passRate: number; evals: number }[] = []
  for (const [key, stat] of sceneStats) {
    const ch = key.split('/')[0]
    const id = key.split('/').slice(1).join('/')
    const scene = content.chapters[ch].scenes.find((s) => s.id === id)!
    scene.choices.forEach((c, i) => {
      const passRate = stat.gateEval[i] ? stat.gatePass[i] / stat.gateEval[i] : null
      if (!stat.choices[i]) neverTaken.push({ key, choice: i, label: c.label.slice(0, 80), gated: !!c.requires, passRate })
      if (c.requires && stat.gateEval[i] >= 50 && passRate !== null && passRate < 0.15)
        hardGates.push({ key, choice: i, label: c.label.slice(0, 80), passRate: +passRate.toFixed(4), evals: stat.gateEval[i] })
    })
  }
  hardGates.sort((a, b) => a.passRate - b.passRate)

  const report = {
    generated: new Date().toISOString(),
    engineRunsPerPolicy: runsPer,
    policies: polNames,
    wallMs: Date.now() - t0,
    perPolicy: Object.fromEntries(
      Object.entries(perPolicy).map(([name, P]) => [
        name,
        {
          runs: P.runs,
          aborted: P.aborted,
          panicsPerRun: +(P.panics / Math.max(1, P.runs)).toFixed(2),
          exceptions: P.exceptions,
          violations: P.violations,
          endings: P.endings,
          score: { p10: pctl(P.scoreFinal.vals, 10), p50: pctl(P.scoreFinal.vals, 50), p90: pctl(P.scoreFinal.vals, 90) },
          epochs: { p10: pctl(P.epochs.vals, 10), p50: pctl(P.epochs.vals, 50), p90: pctl(P.epochs.vals, 90) },
        },
      ]),
    ),
    coverage: {
      scenes: allScenes.length,
      visited: allScenes.length - unvisited.length,
      unvisited,
      neverTaken: neverTaken.slice(0, 200),
      hardGates: hardGates.slice(0, 40),
    },
    weeksToClose: Object.fromEntries(
      chapterIds.map((ch) => {
        const r = weeksToClose.get(ch)!
        return [ch, { n: r.n, p10: pctl(r.vals, 10), p50: pctl(r.vals, 50), p90: pctl(r.vals, 90) }]
      }),
    ),
    bands: Object.fromEntries(
      chapterIds.map((ch) => [
        ch,
        bands
          .get(ch)!
          .map((b, w) => ({
            w,
            n: b.stress.n,
            stress: [pctl(b.stress.vals, 10), pctl(b.stress.vals, 50), pctl(b.stress.vals, 90)],
            treasury: [pctl(b.treasury.vals, 10), pctl(b.treasury.vals, 50), pctl(b.treasury.vals, 90)],
            runway: [pctl(b.runway.vals, 10), pctl(b.runway.vals, 50), pctl(b.runway.vals, 90)],
          }))
          .filter((b) => b.n >= 20),
      ]),
    ),
    sceneStats: Object.fromEntries([...sceneStats.entries()].map(([k, s]) => [k, { visits: s.visits, choices: s.choices }])),
  }

  mkdirSync(join(process.cwd(), 'sim'), { recursive: true })
  const out = join(process.cwd(), 'sim', 'report.json')
  writeFileSync(out, JSON.stringify(report))
  const total = polNames.length * runsPer
  console.log(`\nwrote ${out}`)
  console.log(
    `${total} biographies · ${report.wallMs}ms · ${(report.wallMs / total).toFixed(2)}ms/run · coverage ${report.coverage.visited}/${report.coverage.scenes} scenes · ${unvisited.length} unvisited · ${neverTaken.length} never-taken choices`,
  )
}

main()
