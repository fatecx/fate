/**
 * Economy + Monte Carlo acceptance gates. Bands are loose until P2 content
 * lands; the infrastructure assertions (no crashes, sane ranges, ending
 * coverage) are hard.
 */
import { describe, expect, it } from 'vitest'
import { CONTENT } from '../src/content/world'
import { applyEffects } from '../src/engine/effects'
import { newGame } from '../src/engine/reduce'
import { netBurn, runwayWeeks, type GameState } from '../src/engine/types'
import { eliteBot, greedyBot, randomBot } from './sim/bots'
import { playBiography, type RunResult } from './sim/run'

function sweep(policy: typeof randomBot | typeof greedyBot | typeof eliteBot, seeds: number[]): RunResult[] {
  return seeds.map((s) => playBiography(CONTENT, s, policy))
}

describe('derived-number math', () => {
  it('runway = treasury / net burn', () => {
    const st = newGame(CONTENT, 1)
    st.company.treasury = 120000
    st.company.weeklyBurn = 3800
    st.company.weeklyRevenue = 0
    expect(netBurn(st.company)).toBe(3800)
    expect(runwayWeeks(st.company)).toBeCloseTo(31.58, 1)
    // profitable company: runway is infinite
    st.company.weeklyRevenue = 5000
    expect(runwayWeeks(st.company)).toBe(Infinity)
  })

  it('stake grants dilute post-money: everyone scales by (100-x)/100', () => {
    const st = newGame(CONTENT, 1)
    applyEffects(st, [
      { e: 'stake', who: 'priya', d: 2 },
      { e: 'stake', who: 'tomas', d: 1 },
      { e: 'stake', who: 'june', d: 8 },
    ])
    // Sequential post-money grants compound: each grant scales everyone by (100-x)/100.
    const pct = (who: string) => st.company.capTable.find((s) => s.who === who)?.pct ?? -1
    expect(pct('june')).toBeCloseTo(8, 5)
    expect(pct('tomas')).toBeCloseTo(1 * 0.92, 5)
    expect(pct('priya')).toBeCloseTo(2 * 0.99 * 0.92, 5)
    expect(pct('founder')).toBeCloseTo(100 * 0.98 * 0.99 * 0.92, 5)
    const total = st.company.capTable.reduce((s, x) => s + x.pct, 0)
    expect(total).toBeLessThanOrEqual(100.001)
  })
})

describe('monte carlo biography sweep', () => {
  const random = sweep(randomBot, Array.from({ length: 250 }, (_, i) => i + 1))
  const greedy = sweep(greedyBot, Array.from({ length: 80 }, (_, i) => i + 1))
  const elite = sweep(eliteBot, Array.from({ length: 60 }, (_, i) => i + 1))
  const all = [...random, ...greedy, ...elite]

  it('every biography completes without abort or violation', () => {
    for (const r of all) {
      expect(r.aborted, `seed ${r.seed} aborted`).toBe(false)
      expect(r.violations, `seed ${r.seed}: ${r.violations.join('; ')}`).toEqual([])
      expect(r.chapters.length).toBe(4)
    }
  })

  it('biographies run a sane number of epochs', () => {
    const epochs = all.map((r) => r.epochs).sort((a, b) => a - b)
    const median = epochs[Math.floor(epochs.length / 2)]
    expect(median).toBeGreaterThan(12)
    expect(median).toBeLessThan(400)
  })

  it('every ending of every chapter is reachable across the sweep', () => {
    const seen = new Set(all.flatMap((r) => r.chapters.map((c) => `${c.id}:${c.endingId}`)))
    for (const id of ['hyperchute', 'teleport', 'skyline', 'escape'] as const) {
      for (const e of CONTENT.chapters[id].endings) {
        expect(seen.has(`${id}:${e.id}`), `unreached: ${id}:${e.id}`).toBe(true)
      }
    }
  })

  it('the panic counter works and panic happens somewhere', () => {
    expect(all.every((r) => Number.isInteger(r.panics) && r.panics >= 0)).toBe(true)
    expect(all.reduce((s, r) => s + r.panics, 0)).toBeGreaterThan(0)
  })
})
