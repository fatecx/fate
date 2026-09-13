import type { SceneDef } from '../content/schema'
import type { GameState } from './types'
import { evalPred } from './predicates'

/**
 * A scene resolved against live state: the first matching `vary` overlay
 * replaces its listed fields, and each film panel resolves its own
 * `screens[i].vary` independently. Pure — the render layer and the tests
 * read scenes through this and nothing else. Prose only: the engine never
 * reads what this returns.
 */
export function resolveScene(sc: SceneDef, st: GameState): SceneDef {
  const v = sc.vary?.find((x) => evalPred(x.when, st))
  const screens = sc.screens?.map((p) => {
    const pv = p.vary?.find((x) => evalPred(x.when, st))
    return pv ? { ...p, prose: pv.prose ?? p.prose, art: pv.art ?? p.art } : p
  })
  const base = screens ? { ...sc, screens } : sc
  return v ? { ...base, prose: v.prose ?? sc.prose, leadIn: v.leadIn ?? sc.leadIn, art: v.art ?? sc.art } : base
}
