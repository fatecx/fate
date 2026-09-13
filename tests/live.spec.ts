import { describe, expect, it } from 'vitest'
import { CONTENT } from '../src/content/world'
import { resolveScene } from '../src/engine/live'
import { getScene, newGame } from '../src/engine/reduce'
import type { GameState } from '../src/engine/types'

/** A Teleport-era state with the given company flags — nothing else matters to vary. */
function teleportState(flags: Record<string, boolean>): GameState {
  const st = newGame(CONTENT, 1)
  st.company.id = 'teleport'
  st.company.flags = { ...flags }
  return st
}

describe('resolveScene — films remember the route through prose only', () => {
  const y3 = getScene(CONTENT, 'teleport', 't_bridge_y3')

  it('base panels stand alone when no flag is set', () => {
    const r = resolveScene(y3, teleportState({}))
    expect(r.screens![0].prose).toBe(y3.screens![0].prose)
    expect(r.screens![1].prose).toBe(y3.screens![1].prose)
    expect(r.screens![0].prose).not.toMatch(/storefront chair/)
    expect(r.screens![1].prose).not.toMatch(/counting out loud/)
  })

  it('each panel resolves its own axis independently', () => {
    const r = resolveScene(y3, teleportState({ t_transparent: true, delay_named: true }))
    expect(r.screens![0].prose).toMatch(/stand dark under your own signature/)
    expect(r.screens![1].prose).toMatch(/the crowd counting out loud/)
    const only2 = resolveScene(y3, teleportState({ delay_masked: true }))
    expect(only2.screens![0].prose).toBe(y3.screens![0].prose)
    expect(only2.screens![1].prose).toMatch(/concert pianist/)
  })

  it('first match wins and the record prose is untouched', () => {
    const r = resolveScene(y3, teleportState({ log_sealed: true, blamed_cass: true }))
    expect(r.screens![0].prose).toMatch(/silence clause held/)
    expect(r.prose).toBe(y3.prose)
    expect(r.screens![0].art).toBe(y3.screens![0].art)
  })

  it('scene-level vary still overlays prose on a screenless cutscene', () => {
    const sc = getScene(CONTENT, 'hyperchute', 'h_bridge_pre_act3')
    const st = newGame(CONTENT, 1)
    st.company.id = 'hyperchute'
    st.company.flags = { couriers_enemy: true }
    expect(resolveScene(sc, st).prose).toMatch(/counter-list of porches/)
    st.company.flags = { couriers_enemy: true, couriers_ally: true }
    expect(resolveScene(sc, st).prose).toMatch(/health insurance/)
    st.company.flags = {}
    expect(resolveScene(sc, st).prose).toBe(sc.prose)
  })

  it('every vary predicate in the game evaluates without throwing', () => {
    const st = newGame(CONTENT, 1)
    for (const ch of Object.values(CONTENT.chapters)) {
      st.company.id = ch.id
      for (const s of ch.scenes) expect(() => resolveScene(s, st)).not.toThrow()
    }
  })
})
