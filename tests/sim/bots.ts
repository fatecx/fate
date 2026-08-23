import type { Content } from '../../src/content/schema'
import type { Effect } from '../../src/engine/effects'
import { Rng } from '../../src/engine/rng'
import type { GameState } from '../../src/engine/types'

export interface ChoiceCtx {
  content: Content
  st: GameState
  legal: number[]
}

export type Policy = (ctx: ChoiceCtx, rng: Rng) => number

const END_UTILITY: Record<string, number> = {
  triumph: 50,
  sale: 20,
  noble: 10,
  disgrace: 5,
  transformation: 8,
  ruin: -100,
}

/** Rough utility read straight off the choice's declared effects. */
function utility(
  content: Content,
  st: GameState,
  index: number,
  weights: { score: number; rep: number; endKind: Record<string, number> },
): number {
  const chapter = content.chapters[st.company.id]
  const sceneId = st.company.queue[0]
  const scene = chapter.scenes.find((s) => s.id === sceneId)
  if (!scene) return -Infinity
  const choice = scene.choices[index]
  let u = 0
  for (const fx of choice.effects as readonly Effect[]) {
    switch (fx.e) {
      case 'treasury':
        u += fx.d / 20000
        break
      case 'burn':
        u -= fx.d / 20000
        break
      case 'revenue':
        u += fx.d / 5000
        break
      case 'stress':
        u -= fx.d / 8
        break
      case 'rep':
        u += fx.d * weights.rep
        break
      case 'score':
        u += fx.d * weights.score
        break
      case 'stake':
        u -= Math.max(0, fx.d) * 0.5
        break
      case 'rel':
        u += (fx.aff ?? 0) * 0.3 + (fx.resp ?? 0) * 0.3
        if (fx.standing === 'ally') u += 2
        if (fx.standing === 'hostile') u -= 2
        break
      case 'end': {
        const ending = chapter.endings.find((e) => e.id === fx.ending)
        u += ending ? (weights.endKind[ending.kind] ?? 0) + ending.scoreBonus : 0
        break
      }
      default:
        break
    }
  }
  return u
}

function argmax(ctx: Parameters<Policy>[0], rng: Rng, weights: Parameters<typeof utility>[3]): number {
  let best = ctx.legal[0]
  let bestU = -Infinity
  for (const i of ctx.legal) {
    const u = utility(ctx.content, ctx.st, i, weights) + rng.float() * 0.01
    if (u > bestU) {
      bestU = u
      best = i
    }
  }
  return best
}

const GREEDY_WEIGHTS = { score: 3, rep: 2, endKind: END_UTILITY }

const ELITE_END_UTILITY: Record<string, number> = {
  triumph: 500,
  sale: -80,
  noble: 30,
  disgrace: -20,
  transformation: 40,
  ruin: -500,
}

export const randomBot: Policy = (ctx, rng) => ctx.legal[rng.int(0, ctx.legal.length - 1)]

/** A competent-ish player: takes good deals, chases healthy outcomes. */
export const greedyBot: Policy = (ctx, rng) => argmax(ctx, rng, GREEDY_WEIGHTS)

/**
 * Elite play: farms score and reputation, walks past early exits, hunts the IPO.
 * Proves elite-gated endings are reachable without weakening content gates.
 */
export const eliteBot: Policy = (ctx, rng) =>
  argmax(ctx, rng, { score: 8, rep: 4, endKind: ELITE_END_UTILITY })
