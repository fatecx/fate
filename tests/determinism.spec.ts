/**
 * Determinism law: same seed + same actions => byte-identical trace.
 * Purity law: reduce never mutates its input state.
 */
import { describe, expect, it } from 'vitest'
import { CONTENT } from '../src/content/world'
import { newGame, reduce, visibleChoices } from '../src/engine/reduce'
import { Rng } from '../src/engine/rng'
import type { GameState } from '../src/engine/types'

function play(seed: number): string {
  let st = newGame(CONTENT, seed)
  const rng = new Rng((seed ^ 0x51ed270b) >>> 0)
  while (st.phase !== 'complete') {
    if (st.phase === 'playing') {
      const legal = visibleChoices(CONTENT, st)
      if (legal.length === 0) break
      st = reduce(CONTENT, st, { t: 'choose', index: legal[rng.int(0, legal.length - 1)] })
    } else {
      st = reduce(CONTENT, st, { t: 'foundNext' })
    }
  }
  return JSON.stringify(st)
}

describe('determinism', () => {
  it.each([1, 7, 987654321])('seed %i replays byte-identically', (seed) => {
    expect(play(seed)).toBe(play(seed))
  })

  it('different seeds diverge', () => {
    const traces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(play)
    const distinct = new Set(traces).size
    expect(distinct).toBeGreaterThanOrEqual(18)
  })

  it('reduce is pure — input state untouched by every transition', () => {
    let input: GameState = newGame(CONTENT, 42)
    const rng = new Rng(1)
    for (let i = 0; i < 12 && input.phase !== 'complete'; i++) {
      const before = JSON.stringify(input)
      let next: GameState
      if (input.phase === 'playing') {
        const legal = visibleChoices(CONTENT, input)
        expect(legal.length).toBeGreaterThan(0)
        next = reduce(CONTENT, input, { t: 'choose', index: legal[rng.int(0, legal.length - 1)] })
      } else {
        next = reduce(CONTENT, input, { t: 'foundNext' })
      }
      expect(JSON.stringify(input), `transition ${i} mutated its input`).toBe(before)
      input = next
    }
  })
})
