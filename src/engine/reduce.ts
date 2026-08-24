/**
 * The deterministic reducer. (content, state, action) -> state'.
 *
 * Purity: the input state is never mutated (structuredClone at entry); the RNG
 * cursor is threaded through the clone and written back once. Content is
 * immutable data resolved by id.
 */
import type { ChoiceDef, Content, SceneDef } from '../content/schema'
import { Rng } from './rng'
import { evalPred } from './predicates'
import { applyEffects, DeferredEnd } from './effects'
import {
  Action,
  clamp,
  COMPANY_ORDER as ORDER,
  CompanyState,
  GameState,
  netBurn,
} from './types'

const MAX_QUEUE = 4
const DEALS_PER_EPOCH = 2
const HISTORY_CAP = 200
const EPOCH_CAP = 800

export function getScene(content: Content, companyId: string, sceneId: string): SceneDef {
  const def = content.chapters[companyId as keyof typeof content.chapters]
  const scene = def?.scenes.find((s) => s.id === sceneId)
  if (!scene) throw new Error(`unknown scene ${sceneId} in chapter ${companyId}`)
  return scene
}

/** Arrears law: a company below zero cannot spend — the account can't cover it. */
export function spendBlocked(st: GameState, choice: ChoiceDef): boolean {
  if (st.company.treasury >= 0) return false
  return choice.effects.some((fx) => fx.e === 'treasury' && fx.d < 0)
}

/** Full legality: authored requires plus the arrears law. */
export function choiceLegal(st: GameState, choice: ChoiceDef): boolean {
  if (choice.requires && !evalPred(choice.requires, st)) return false
  return !spendBlocked(st, choice)
}

/** Choices the player may legally take right now. */
export function visibleChoices(content: Content, st: GameState): number[] {
  if (st.phase !== 'playing' || st.company.queue.length === 0) return []
  const scene = getScene(content, st.company.id, st.company.queue[0])
  const out: number[] = []
  scene.choices.forEach((c, i) => {
    if (choiceLegal(st, c)) out.push(i)
  })
  return out
}

function enterChapter(content: Content, st: GameState, chapterIndex: number): void {
  const id = ORDER[chapterIndex]
  const def = content.chapters[id]
  // History shapes how each chapter begins: capital scales with reputation + founder score.
  const bonus = clamp(st.world.reputation, -10, 10) * 0.03 + Math.min(st.ledger.founderScore, 60) * 0.008
  const capital = Math.round((def.opening.treasury * (1 + bonus)) / 5000) * 5000

  const company: CompanyState = {
    id,
    foundedEpoch: st.epoch,
    status: 'active',
    treasury: capital,
    weeklyBurn: def.opening.burn,
    weeklyRevenue: def.opening.revenue,
    stress: 15,
    capTable: [{ who: 'founder', pct: 100 }],
    flags: {},
    fuses: [],
    queue: [def.entry],
    seen: [],
  }
  st.chapter = chapterIndex
  st.company = company
  st.phase = 'playing'
}

function endChapter(st: GameState, content: Content, endingId: string): void {
  const def = content.chapters[st.company.id]
  const ending = def.endings.find((e) => e.id === endingId)
  if (!ending) throw new Error(`unknown ending ${endingId} for ${st.company.id}`)
  st.company.status = 'ended'
  st.company.endingId = endingId
  const yearsSurvived = Math.floor((st.epoch - st.company.foundedEpoch) / 52)
  st.ledger.founderScore += ending.scoreBonus + yearsSurvived * 2
  st.ledger.completed.push({ company: st.company.id, endingId, epoch: st.epoch })
  st.world.corpses.push({ company: st.company.id, endingId, endedEpoch: st.epoch })
  st.phase = 'epilogue'
}

function dealScenes(content: Content, st: GameState, rng: Rng): void {
  const def = content.chapters[st.company.id]
  const queued = new Set(st.company.queue)
  // Only scenes carrying an explicit `when` are dealable. Scenes without one
  // are exclusively goto/enqueue/engine-reachable (insolvency, goto chains).
  const eligible = (s: SceneDef): boolean =>
    s.id !== def.entry &&
    s.when !== undefined &&
    !st.company.seen.includes(s.id) &&
    !queued.has(s.id) &&
    evalPred(s.when, st)

  // Story beats first, in authored order.
  for (const s of def.scenes) {
    if (s.priority && eligible(s)) {
      st.company.queue.push(s.id)
      queued.add(s.id)
      if (s.fuseEpochs && !st.company.fuses.some((f) => f.sceneId === s.id)) {
        st.company.fuses.push({ sceneId: s.id, expiresEpoch: st.epoch + s.fuseEpochs })
      }
    }
  }

  // Then fill from the weighted random pool, bounded by queue capacity.
  const budget = MAX_QUEUE - st.company.queue.length
  const pool = def.scenes.filter((s) => !s.priority && eligible(s))
  const picked = rng.weightedPick(pool, (s) => s.weight ?? 1, Math.min(DEALS_PER_EPOCH, budget))
  for (const s of picked) {
    st.company.queue.push(s.id)
    if (s.fuseEpochs && !st.company.fuses.some((f) => f.sceneId === s.id)) {
      st.company.fuses.push({ sceneId: s.id, expiresEpoch: st.epoch + s.fuseEpochs })
    }
  }
}

function tickFuses(st: GameState): void {
  const expired = st.company.fuses.filter((f) => f.expiresEpoch <= st.epoch)
  if (expired.length === 0) return
  st.company.fuses = st.company.fuses.filter((f) => f.expiresEpoch > st.epoch)
  for (const f of expired) {
    st.company.flags[`late:${f.sceneId}`] = true
    st.company.stress = clamp(st.company.stress + 8, 0, 100)
    if (!st.company.queue.includes(f.sceneId) && !st.company.seen.includes(f.sceneId)) {
      st.company.queue.unshift(f.sceneId)
    }
  }
}

// Burnout: the body keeps score. First time stress pegs at 100 the authored
// burnout scene deals (rest, push through, or walk away). If it pegs again
// after that scene has been answered, the body quits the company for you.
function checkBurnout(content: Content, st: GameState): void {
  const c = st.company
  const def = content.chapters[c.id]
  if (c.status !== 'active' || st.phase !== 'playing' || c.stress < 100) return
  if (!c.flags['burnout_open']) {
    c.flags['burnout_open'] = true
    if (!c.queue.includes(def.burnout) && !c.seen.includes(def.burnout)) {
      c.queue.unshift(def.burnout)
    }
  } else if (c.seen.includes(def.burnout)) {
    endChapter(st, content, 'bankrupt')
  }
}

function closeEpoch(content: Content, st: GameState, rng: Rng): void {
  const c = st.company
  const def = content.chapters[c.id]

  st.epoch += 1
  c.treasury -= netBurn(c)
  c.stress = clamp(c.stress + 1, 0, 100) // life accrues interest
  if (c.treasury < 0) c.stress = clamp(c.stress + 2, 0, 100) // arrears: creditors call daily

  tickFuses(st)

  // Insolvency: first time, hand the problem to authored content (rescue or die).
  // If it recurs after rescues are spent, the chapter ends with its `bankrupt` ending.
  if (c.treasury <= 0 && c.status === 'active') {
    if (!c.flags['insolvency_open']) {
      c.flags['insolvency_open'] = true
      c.queue.unshift(def.insolvency)
    } else {
      endChapter(st, content, 'bankrupt')
      return
    }
  }

  checkBurnout(content, st)
  if (st.phase !== 'playing') return

  dealScenes(content, st, rng)
}

export function reduce(content: Content, state: GameState, action: Action): GameState {
  const st: GameState = structuredClone(state)
  const rng = new Rng(st.seed)
  try {
    switch (action.t) {
      case 'newGame': {
        st.seed = action.seed >>> 0
        st.epoch = 0
        st.chapter = 0
        st.world = { reputation: 0, rels: {}, corpses: [], flags: {} }
        st.ledger = { founderScore: 0, completed: [] }
        st.history = []
        enterChapter(content, st, 0)
        break
      }
      case 'choose': {
        if (st.phase !== 'playing') throw new Error('not playing')
        const q = st.company.queue
        if (q.length === 0) throw new Error('no scene pending')
        const scene = getScene(content, st.company.id, q[0])
        const choice = scene.choices[action.index]
        if (!choice) throw new Error(`bad choice index ${action.index} for ${scene.id}`)
        if (!choiceLegal(st, choice)) {
          throw new Error(`choice locked: ${scene.id}#${action.index}`)
        }

        // Consume the current beat FIRST, then let its consequences land —
        // otherwise an `enqueue` effect lands ahead of the scene being resolved
        // and the following shift() consumes the wrong node (self-reresolution loop).
        if (!st.company.seen.includes(scene.id)) st.company.seen.push(scene.id)
        q.shift()

        const ends: DeferredEnd[] = applyEffects(st, choice.effects)
        st.history.push({ epoch: st.epoch, scene: scene.id, choice: action.index, label: choice.label })
        if (st.history.length > HISTORY_CAP) st.history.splice(0, st.history.length - HISTORY_CAP)

        if (choice.goto && !st.company.seen.includes(choice.goto) && !q.includes(choice.goto)) {
          q.unshift(choice.goto)
        }

        if (ends.length > 0) {
          endChapter(st, content, ends[0].ending)
        } else {
          // Choice-driven stress spikes trigger burnout immediately, not next week.
          checkBurnout(content, st)
        }
        if (st.phase === 'playing') {
          // Quiet weeks compress forward until the world has something to say
          // or the money runs out — a stalled empty queue is never a valid rest state.
          let guard = 0
          while (st.phase === 'playing' && q.length === 0 && guard++ < EPOCH_CAP) {
            closeEpoch(content, st, rng)
          }
          if (st.phase === 'playing' && q.length === 0) {
            endChapter(st, content, 'bankrupt') // invariant backstop: nothing left can happen
          }
        }
        break
      }
      case 'surrender': {
        if (st.phase !== 'playing') throw new Error('not playing')
        endChapter(st, content, 'bankrupt')
        break
      }
      case 'foundNext': {
        if (st.phase !== 'epilogue') throw new Error('no epilogue to leave')
        // Time skips between chapters: years pass as the ending dictates.
        const last = st.ledger.completed[st.ledger.completed.length - 1]
        const prevEnding = last
          ? content.chapters[last.company].endings.find((e) => e.id === last.endingId)
          : undefined
        st.epoch += (prevEnding?.skipYears ?? 1) * 52
        const next = st.chapter + 1
        if (next >= ORDER.length) {
          st.phase = 'complete'
        } else {
          enterChapter(content, st, next)
        }
        break
      }
    }
  } finally {
    st.seed = rng.s
  }
  return st
}

/** Convenience: start a fresh biography. */
export function newGame(content: Content, seed: number): GameState {
  return reduce(content, { seed: 0 } as unknown as GameState, { t: 'newGame', seed })
}
