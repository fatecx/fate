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
import { eliteBot, greedyBot, randomBot, type Policy } from './sim/bots'
import { playBiography, type RunResult } from './sim/run'

function sweep(policy: typeof randomBot | typeof greedyBot | typeof eliteBot, seeds: number[]): RunResult[] {
  return seeds.map((s) => playBiography(CONTENT, s, policy))
}

/**
 * Witness pilot: plays by ordered label preferences, falling back to the
 * least-stress legal choice. Rare endings must be reachable BY DESIGN, not by
 * random bots stumbling in — each witness documents one authored road.
 */
function witness(prefs: RegExp[]): Policy {
  return ({ content, st, legal }) => {
    const scene = content.chapters[st.company.id].scenes.find((s) => s.id === st.company.queue[0])!
    for (const re of prefs) {
      const i = legal.find((ix) => re.test(scene.choices[ix].label))
      if (i !== undefined) return i
    }
    let best = legal[0]
    let bestD = Infinity
    for (const ix of legal) {
      const d = scene.choices[ix].effects.reduce((s, fx) => s + (fx.e === 'stress' ? fx.d : 0), 0)
      if (d < bestD) {
        bestD = d
        best = ix
      }
    }
    return best
  }
}

// The road to the bell: seed money, allies, corridor, drops, cred, capital, refusal, composure.
const IPO_ROAD: RegExp[] = [
  /Take it\. One percent/,
  /Recruit an advisor/,
  /Welcome aboard/,
  /One percent, plus the rolodex/,
  /Hear her out/,
  /Take the check/,
  /Down round/,
  /Bridge loan/,
  /File the corridor pilot/,
  /Call in Tomás/,
  /Accept the corridor/,
  /Open the list/,
  /Three weeks somewhere/,
  /\$9,500 a month/,
  /Charm him/,
  /Full access/,
  /Face year two/,
  /Sell reliability/,
  /Say yes\. Full employees/,
  /Comply completely/,
  /Line up a second supplier/,
  /Two more percent\. Make her a real co-founder/,
  /Ride it\. National shows/,
  /Take it\. Win the war/,
  /Even: you, June/,
  /Ground the fleet/,
  /Hand her everything/,
  /ground first, publish everything/,
  /Testify personally/,
  /Refuse\. The railway is not for sale/,
  /Take the company public/,
  /Price it honest/,
]

const BECOME_THEM_ROAD: RegExp[] = [...IPO_ROAD.slice(0, -3), /Offer them you instead of the company/]
const WALKAWAY_ROAD: RegExp[] = [...IPO_ROAD.slice(0, -2), /Open-source the stack/]

// ---- TELEPORT witness roads -----------------------------------------------------
// Chapter two's rare endings, proven by design. Each road rides the hyperchute
// IPO prefix (score and cred carry into the biography) then walks its own door.

/** Door one to the second bell: three founders, honest delay, board of allies. */
const T_LISTING_KEEP: RegExp[] = [
  ...IPO_ROAD,
  /Shake his hand\. Build it together/,
  /Even partners\. Fifty-fifty/,
  /Third founder\. Welcome home, June/,
  /Moon now\. Mars when the cascade earns it/,
  /Cash up front\. Start Monday/,
  /Invite a Shackleton Verge observer/,
  /Pay it in full\. Flight-rate everything/,
  /The full booth/,
  /Name the delay\. Make the room count it out loud/,
  /Sign Salazar’s letter of intent/,
  /June steps in and pays it/,
  /Take it — but the independent seat stays yours/,
  /Guarantee her hours first/,
  /Chief teleoperator, full ride/,
  /Sell the honest delay/,
  /Seat Priya\. Pay whatever the fight costs/,
  /Open everything\. Raw, unedited/,
  /Give the honest number/,
  /Give her the firmware/,
  /Publish everything\. Ground tourism ops yourself/,
  /File a spectrum-access complaint/,
  /Fly him to the Cape/,
  /Fight\. Call the vote yourself/,
  /Sit with June tonight/,
  /Back to work\. The company needs its founder/,
  /Testify with the log you already published/,
  /Refuse\. The road stays open/,
  /Take the company public\. Price the honest number/,
]

/** Door two: the clean-money road — no ALEPH, no Hale, no coup, bootstrapped bell. */
const T_LISTING_CLEAN: RegExp[] = T_LISTING_KEEP.map((re) =>
  re.source.includes('independent seat stays yours') ? /Refuse the model’s money/ : re,
)

/** The commons: honest road that walks past its own bell to give the cascade away. */
const T_COMMONS_ROAD: RegExp[] = T_LISTING_KEEP.map((re) =>
  re.source.includes('Take the company public') ? /One more year private/ : re,
).concat([/Give the cascade to everyone/])

/** The seamless story: blend everywhere, sealed logs, chairman deal, dark bell. */
const T_PUPPET_ROAD: RegExp[] = [
  ...IPO_ROAD.slice(0, -2),
  /Take the company public/,
  /Price it honest/,
  /Test him first/,
  /Seventy-thirty\. Market standard/,
  /Take the money, keep her an angel/,
  /Moon only\. Take Mars off the wall/,
  /Build them in-house/,
  /Celebrate tonight/,
  /Ray builds it on credit/,
  /A modest corner booth/,
  /Choreograph around it/,
  /All three, one long evening/,
  /Negotiate: invoice the company/,
  /Take the deal as written/,
  /Promise everything to everyone/,
  /Pass\. Hire the safe pair of hands/,
  /Blend everywhere/,
  /Accept the model’s candidate/,
  /Send the polished pack/,
  /Give the stretch number/,
  /Proprietary latency compensation/,
  /Let him cool off/,
  /Version three\. He stays in the title and the cage/,
  /Settle with the family/,
  /Take the partnership meeting/,
  /After the quarter closes/,
  /Negotiate\. Executive chairman/,
  /Let counsel carry it/,
  /Refuse\. The road stays open/,
  /Ring it\. Sell the seamless story/,
]

/** The count goes against you: broken cofounder, hostile board, removed for cause. */
const T_OUSTED_ROAD: RegExp[] = T_PUPPET_ROAD.map((re) =>
  re.source.includes('Executive chairman') ? /Fight\. Call the vote yourself/ : re,
).concat([/No calls\. Sleep/, /Clean out the desk/])

/** The number, taken: HALCYON swallows the road. */
const T_SWALLOWED_ROAD: RegExp[] = T_LISTING_KEEP.map((re) =>
  re.source.includes('The road stays open') ? /Take the number\. Let the sky have it/ : re,
)

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
  const random = sweep(randomBot, Array.from({ length: 600 }, (_, i) => i + 1))
  const greedy = sweep(greedyBot, Array.from({ length: 200 }, (_, i) => i + 1))
  const elite = sweep(eliteBot, Array.from({ length: 200 }, (_, i) => i + 1))
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
    expect(median).toBeLessThan(900)
  })

  it('every ending of every chapter is reachable — sweep plus authored witness roads', () => {
    const witnesses = [
      IPO_ROAD,
      BECOME_THEM_ROAD,
      WALKAWAY_ROAD,
      T_LISTING_KEEP,
      T_LISTING_CLEAN,
      T_COMMONS_ROAD,
      T_PUPPET_ROAD,
      T_OUSTED_ROAD,
      T_SWALLOWED_ROAD,
    ].flatMap((prefs) => [3, 11, 29].map((seed) => playBiography(CONTENT, seed, witness(prefs))))
    const seen = new Set(
      [...all, ...witnesses].flatMap((r) => r.chapters.map((c) => `${c.id}:${c.endingId}`)),
    )
    for (const id of ['hyperchute', 'teleport', 'skyline', 'escape'] as const) {
      for (const e of CONTENT.chapters[id].endings) {
        expect(seen.has(`${id}:${e.id}`), `unreached: ${id}:${e.id}`).toBe(true)
      }
    }
  })

  it('the authored IPO road actually rings the bell', () => {
    const runs = [3, 11, 29].map((s) => playBiography(CONTENT, s, witness(IPO_ROAD)))
    const hits = runs.filter((r) => r.chapters.some((c) => c.id === 'hyperchute' && c.endingId === 'triumph_ipo'))
    expect(hits.length, 'no witness seed completes the hardest path').toBeGreaterThan(0)
  })

  it('the second bell has two doors — allies-board road and clean-money road both list', () => {
    for (const [name, prefs] of [
      ['keep', T_LISTING_KEEP],
      ['clean', T_LISTING_CLEAN],
    ] as const) {
      const runs = [3, 11, 29].map((s) => playBiography(CONTENT, s, witness(prefs)))
      const hits = runs.filter((r) => r.chapters.some((c) => c.id === 'teleport' && c.endingId === 'listing'))
      expect(hits.length, `teleport listing unreachable via ${name} door`).toBeGreaterThan(0)
    }
  })

  it('the coup is seat math: the hostile-board road ends removed for cause', () => {
    const runs = [3, 11, 29].map((s) => playBiography(CONTENT, s, witness(T_OUSTED_ROAD)))
    const hits = runs.filter((r) => r.chapters.some((c) => c.id === 'teleport' && c.endingId === 'ousted'))
    expect(hits.length, 'ousted road never lost the vote').toBeGreaterThan(0)
  })

  it('the bell has one golden door: no grounding, no IPO — even on an otherwise perfect road', () => {
    // Same elite road, but the accident is settled quietly instead of grounding
    // the fleet. The transparent gate at the pricing call must hold shut.
    const NO_GROUND = IPO_ROAD.map((re) =>
      re.source.includes('Ground the fleet') ? /Settle quietly/ : re,
    )
    for (const seed of [3, 11, 29]) {
      const r = playBiography(CONTENT, seed, witness(NO_GROUND))
      const h = r.chapters.find((c) => c.id === 'hyperchute')
      expect(h?.endingId, `seed ${seed} rang the bell without grounding the fleet`).not.toBe('triumph_ipo')
    }
  })

  it('the panic counter works and panic happens somewhere', () => {
    expect(all.every((r) => Number.isInteger(r.panics) && r.panics >= 0)).toBe(true)
    expect(all.reduce((s, r) => s + r.panics, 0)).toBeGreaterThan(0)
  })
})
