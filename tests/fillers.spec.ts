/**
 * Week fillers are content too — validate the pool the way the graph is
 * validated: unique ids, honest predicates, and a guaranteed eligible line
 * so no rendered week ever goes bare.
 */
import { describe, expect, it } from 'vitest'
import { BLUR_FILLERS, FILLERS } from '../src/content/fillers'
import { CONTENT } from '../src/content/world'
import { evalPred } from '../src/engine/predicates'
import { newGame } from '../src/engine/reduce'

describe('week fillers', () => {
  it('ids are unique across both pools', () => {
    const ids = [...FILLERS, ...BLUR_FILLERS].map((f) => f.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every filler is a single real line', () => {
    for (const f of [...FILLERS, ...BLUR_FILLERS]) {
      expect(f.text.trim().length, f.id).toBeGreaterThan(40)
      expect(f.text.includes('\n'), `${f.id}: fillers are one line`).toBe(false)
    }
  })

  it('at least three fillers are unconditionally eligible — weeks never go bare', () => {
    expect(FILLERS.filter((f) => !f.when).length).toBeGreaterThanOrEqual(3)
    expect(BLUR_FILLERS.length).toBeGreaterThanOrEqual(1)
    for (const f of BLUR_FILLERS) expect(f.when, `${f.id}: blur fillers stay unconditional`).toBeUndefined()
  })

  it('every predicate evaluates cleanly against real state', () => {
    const st = newGame(CONTENT, 7)
    for (const f of FILLERS) {
      if (f.when) expect(typeof evalPred(f.when, st), f.id).toBe('boolean')
    }
  })
})
