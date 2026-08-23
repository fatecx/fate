/** Standalone probe: trace every transition. Run via esbuild bundle + node. */
import { CONTENT } from '../src/content/world'
import { newGame, reduce, visibleChoices } from '../src/engine/reduce'
import { Rng } from '../src/engine/rng'
import { randomBot, greedyBot } from './sim/bots'

function trace(seed: number, policy: typeof randomBot | typeof greedyBot, maxSteps: number): void {
  let st = newGame(CONTENT, seed)
  const rng = new Rng((seed ^ 0x9e3779b9) >>> 0)
  let steps = 0
  console.log(`\n=== seed ${seed} (${policy === randomBot ? 'random' : 'greedy'}) ===`)
  while (st.phase !== 'complete') {
    steps++
    if (steps > maxSteps) {
      console.log(`STUCK: epoch=${st.epoch} queue=[${st.company.queue}]`)
      return
    }
    if (st.phase === 'playing') {
      const legal = visibleChoices(CONTENT, st)
      if (legal.length === 0) {
        console.log(`NO-LEGAL epoch ${st.epoch} queue=[${st.company.queue}]`)
        return
      }
      const idx = policy({ content: CONTENT, st, legal }, rng)
      const sceneId = st.company.queue[0]
      const scene = CONTENT.chapters[st.company.id].scenes.find((s) => s.id === sceneId)
      console.log(`e${st.epoch} [${st.company.id}] ${sceneId} -> #${idx} "${scene?.choices[idx]?.label ?? '?'}"`)
      st = reduce(CONTENT, st, { t: 'choose', index: idx })
    } else {
      const last = st.ledger.completed[st.ledger.completed.length - 1]
      console.log(`   EPILOGUE: ${st.company.id} ended "${last?.endingId}" @epoch ${st.epoch}`)
      st = reduce(CONTENT, st, { t: 'foundNext' })
    }
  }
  console.log(`COMPLETE @e${st.epoch} steps=${steps} score=${st.ledger.founderScore}`)
}

trace(1, randomBot, 500)
