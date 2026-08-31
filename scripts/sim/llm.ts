/**
 * TIER 3 — the LLM playtester: a reader, not a statistician.
 *
 * Plays biographies through the same engine, but chooses by READING the
 * prose, and files a rubric per scene: clarity, stakes, fatigue, surprise
 * (did the outcome betray the label?). Finds what bots cannot: confusing
 * choices, tonal breaks, boring stretches.
 *
 * Needs an OpenAI-compatible chat endpoint:
 *   LLM_BASE_URL=https://…/v1  LLM_API_KEY=…  LLM_MODEL=…  npm run sim:llm -- --runs=20
 *
 * Output: sim/llm-notes.json → surfaced on the map's SIM tab when present.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { CONTENT } from '../../src/content/world'
import { newGame, reduce, visibleChoices } from '../../src/engine/reduce'

const BASE = process.env.LLM_BASE_URL
const KEY = process.env.LLM_API_KEY
const MODEL = process.env.LLM_MODEL ?? 'gpt-4o-mini'
if (!BASE || !KEY) {
  console.error('LLM_BASE_URL / LLM_API_KEY missing — Tier 3 needs a chat endpoint. Nothing run.')
  process.exit(1)
}

const runs = Number(process.argv.find((a) => a.startsWith('--runs='))?.slice(7) ?? 10)

interface Note {
  scene: string
  choice: number
  reason: string
  clarity: number
  stakes: number
  fatigue: number
  surprise?: string
}

async function chat(system: string, user: string): Promise<string> {
  const r = await fetch(`${BASE!.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  })
  if (!r.ok) throw new Error(`chat ${r.status}: ${await r.text()}`)
  const j = (await r.json()) as { choices: { message: { content: string } }[] }
  return j.choices[0].message.content
}

const SYSTEM = `You are playtesting a text narrative game about a startup founder. You will receive one scene (prose + numbered choices). Reply with JSON only:
{"choice": <number>, "reason": "<one sentence, why>", "clarity": 1-5, "stakes": 1-5, "fatigue": 1-5, "surprise": "<only if the previous outcome betrayed what its label promised, else omit>"}
clarity = did you understand the situation and what each choice would do. stakes = did this scene feel like it mattered. fatigue = how tired of the game you feel right now (5 = exhausted/bored). Play like a person, not an optimizer.`

async function main(): Promise<void> {
  const notes: Note[] = []
  const finished: string[] = []
  for (let k = 0; k < runs; k++) {
    const seed = (0xa11ce + k * 2654435761) >>> 0
    let st = newGame(CONTENT, seed)
    let lastResult = ''
    let steps = 0
    while (st.phase !== 'complete' && steps < 400) {
      steps++
      if (st.phase === 'epilogue') {
        st = reduce(CONTENT, st, { t: 'foundNext' })
        continue
      }
      const legal = visibleChoices(CONTENT, st)
      if (!legal.length) break
      const chId = st.company.id
      const scene = CONTENT.chapters[chId].scenes.find((s) => s.id === st.company.queue[0])!
      const menu = legal.map((i) => `${i}: ${scene.choices[i].label}`).join('\n')
      const user = `${lastResult ? `PREVIOUS OUTCOME: ${lastResult}\n\n` : ''}SCENE: ${scene.title}\n${scene.prose}\n\nCHOICES:\n${menu}`
      try {
        const raw = await chat(SYSTEM, user)
        const j = JSON.parse(raw) as Note & { choice: number }
        const pick = legal.includes(j.choice) ? j.choice : legal[0]
        notes.push({ ...j, scene: `${chId}/${scene.id}`, choice: pick })
        lastResult = scene.choices[pick].result ?? ''
        st = reduce(CONTENT, st, { t: 'choose', index: pick })
      } catch (err) {
        console.error(`run ${k} step ${steps}: ${err instanceof Error ? err.message : err}`)
        break
      }
    }
    finished.push(`${seed}: ${st.phase} @${st.epoch}`)
    console.log(`run ${k + 1}/${runs} done (${steps} steps)`)
  }

  // aggregate per scene
  const byScene = new Map<string, { n: number; clarity: number; stakes: number; fatigue: number; surprises: string[]; reasons: string[] }>()
  for (const n of notes) {
    let b = byScene.get(n.scene)
    if (!b) byScene.set(n.scene, (b = { n: 0, clarity: 0, stakes: 0, fatigue: 0, surprises: [], reasons: [] }))
    b.n++
    b.clarity += n.clarity
    b.stakes += n.stakes
    b.fatigue += n.fatigue
    if (n.surprise) b.surprises.push(n.surprise)
    if (b.reasons.length < 3) b.reasons.push(n.reason)
  }
  const out = {
    generated: new Date().toISOString(),
    model: MODEL,
    runs,
    scenes: Object.fromEntries(
      [...byScene.entries()].map(([k, b]) => [
        k,
        {
          n: b.n,
          clarity: +(b.clarity / b.n).toFixed(2),
          stakes: +(b.stakes / b.n).toFixed(2),
          fatigue: +(b.fatigue / b.n).toFixed(2),
          surprises: b.surprises.slice(0, 5),
          reasons: b.reasons,
        },
      ]),
    ),
    finished,
  }
  mkdirSync(join(process.cwd(), 'sim'), { recursive: true })
  writeFileSync(join(process.cwd(), 'sim', 'llm-notes.json'), JSON.stringify(out, null, 1))
  console.log(`wrote sim/llm-notes.json — ${notes.length} scene readings`)
}

void main()
