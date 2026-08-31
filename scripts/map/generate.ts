/**
 * Storyline map generator. Walks CONTENT, lays out each chapter with dagre,
 * emits one self-contained map.html (inline JSON + CSS + JS, no runtime deps).
 *
 * Run: npm run map
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { CONTENT } from '../../src/content/world'
import { MOODS, TENSION } from '../../src/content/sound'
import type { ChapterDef } from '../../src/content/schema'
import type { Pred } from '../../src/engine/predicates'
import { makeFmt } from './format'

interface MapNode {
  id: string
  x: number
  y: number
  w: number
  h: number
  kind: 'scene' | 'ending'
  title: string
  speaker?: string
  prose?: string
  endKind?: string
  priority?: boolean
  fuse?: boolean
  /** Formatted `when` — THE WORLD deals this scene in once the condition ripens. */
  dealt?: string
  /** Forced-ruin badge: '$0' (insolvency) or 'STRESS 100' (burnout). */
  ruin?: string
  choices?: { label: string; requires?: string; effects: string[]; result?: string; targets: string[]; ripens?: string[] }[]
}

interface MapEdge {
  from: string
  to: string
  cls: '' | 'deal' | 'ruin' | 'flag'
  label?: string
}

interface MapChapter {
  id: string
  title: string
  tagline: string
  stats: { scenes: number; choices: number; endings: number }
  nodes: MapNode[]
  edges: MapEdge[]
  width: number
  height: number
}

function nodeSize(n: Omit<MapNode, 'x' | 'y' | 'w' | 'h'>): { w: number; h: number } {
  if (n.kind === 'ending') return { w: 168, h: 58 }
  const lines = Math.min(3, Math.ceil((n.prose?.length ?? 0) / 210))
  return { w: 208, h: 64 + lines * 15 }
}

function layoutChapter(id: string, def: ChapterDef): MapChapter {
  const fmt = makeFmt(CONTENT.characters)
  // Namespace ids per chapter so focus-mode traversal never crosses chapters.
  const pid = (x: string): string => `${id}:${x}`

  const nodesRaw: Omit<MapNode, 'x' | 'y'>[] = []
  const byId = new Map<string, Omit<MapNode, 'x' | 'y'>>()

  for (const s of def.scenes) {
    const n: Omit<MapNode, 'x' | 'y'> = {
      id: pid(s.id),
      kind: 'scene',
      title: s.title,
      speaker: s.speaker ? CONTENT.characters[s.speaker]?.name : undefined,
      prose: s.prose,
      priority: s.priority === true,
      fuse: s.fuseEpochs !== undefined,
      dealt: s.when ? fmt.fmtPred(s.when) : undefined,
      choices: s.choices.map((c) => ({
        label: c.label,
        requires: c.requires ? fmt.fmtPred(c.requires) : undefined,
        effects: c.effects.map(fmt.fmtEffect),
        result: c.result,
        targets: [
          ...(c.goto ? [pid(c.goto)] : []),
          ...c.effects.flatMap((fx) =>
            'scene' in fx && typeof fx.scene === 'string' ? [pid(fx.scene)] : [],
          ),
          ...c.effects.flatMap((fx) => ('ending' in fx ? [pid(`end:${fx.ending}`)] : [])),
        ],
      })),
    }
    nodesRaw.push(n)
    byId.set(pid(s.id), n)
  }

  for (const e of def.endings) {
    const n: Omit<MapNode, 'x' | 'y'> = {
      id: pid(`end:${e.id}`),
      kind: 'ending',
      title: e.title,
      prose: e.prose,
      endKind: e.kind,
    }
    nodesRaw.push(n)
    byId.set(pid(`end:${e.id}`), n)
  }

  // Forced-ruin scenes wear their trigger as a badge — no abstract pill nodes.
  {
    const ins = byId.get(pid(def.insolvency))
    if (ins) ins.ruin = '$0'
    const burn = byId.get(pid(def.burnout))
    if (burn) burn.ruin = 'STRESS 100'
  }

  // ---- edges -------------------------------------------------------------
  const edgeMap = new Map<string, MapEdge>()
  const addEdge = (from: string, to: string, cls: MapEdge['cls'], label?: string): void => {
    if (!byId.has(to)) return
    const key = `${from}|${to}|${cls}`
    if (!edgeMap.has(key)) edgeMap.set(key, { from, to, cls, label })
  }

  for (const s of def.scenes) {
    for (const c of s.choices) {
      if (c.goto) addEdge(pid(s.id), pid(c.goto), '')
      for (const fx of c.effects) {
        if ('scene' in fx && typeof fx.scene === 'string') addEdge(pid(s.id), pid(fx.scene), '')
        if ('ending' in fx) addEdge(pid(s.id), pid(`end:${fx.ending}`), '')
      }
    }
  }

  // ---- causal edges: the connective tissue goto never draws ----------------
  // Most progression is a scene setting a FLAG and a later scene's `when`
  // waiting for it (or for a scene having been SEEN). The engine reads this;
  // the map must draw it, or chains look severed and endings look orphaned.
  type Need = { flags: { scope: string; key: string; cmp: string; v: unknown }[]; seen: string[]; met: string[] }
  const needsOf = (p: Pred, pos: boolean, out: Need): Need => {
    if (p.k === 'all' || p.k === 'any') for (const q of p.of) needsOf(q, pos, out)
    else if (p.k === 'not') needsOf(p.p, !pos, out)
    else if (pos && p.k === 'flag') out.flags.push({ scope: p.scope, key: p.key, cmp: p.cmp, v: p.v })
    else if (pos && p.k === 'seen') out.seen.push(p.scene)
    else if (pos && p.k === 'met') out.met.push(p.who)
    return out
  }
  const setters = new Map<string, { scene: string; ci: number; v: unknown }[]>()
  const meeters = new Map<string, string[]>() // character id → scenes that introduce them
  for (const s of def.scenes)
    s.choices.forEach((c, ci) => {
      for (const fx of c.effects) {
        if (fx.e === 'flag') {
          const k = `${fx.scope}:${fx.key}`
          if (!setters.has(k)) setters.set(k, [])
          setters.get(k)!.push({ scene: s.id, ci, v: fx.v })
        }
        if (fx.e === 'meet') {
          if (!meeters.has(fx.who)) meeters.set(fx.who, [])
          meeters.get(fx.who)!.push(s.id)
        }
      }
    })
  const ripensByChoice = new Map<string, Set<string>>() // "sceneId|ci" → unlocked scene pids
  for (const s of def.scenes) {
    if (!s.when) continue
    const need = needsOf(s.when, true, { flags: [], seen: [], met: [] })
    for (const f of need.flags)
      for (const st of setters.get(`${f.scope}:${f.key}`) ?? []) {
        if (st.scene === s.id) continue
        if (f.cmp === 'eq' && String(st.v) !== String(f.v)) continue
        if (!edgeMap.has(`${pid(st.scene)}|${pid(s.id)}|`)) addEdge(pid(st.scene), pid(s.id), 'flag')
        const ck = `${st.scene}|${st.ci}`
        if (!ripensByChoice.has(ck)) ripensByChoice.set(ck, new Set())
        ripensByChoice.get(ck)!.add(pid(s.id))
      }
    for (const seen of need.seen)
      if (seen !== s.id && !edgeMap.has(`${pid(seen)}|${pid(s.id)}|`)) addEdge(pid(seen), pid(s.id), 'flag')
    for (const who of need.met)
      for (const m of meeters.get(who) ?? [])
        if (m !== s.id && !edgeMap.has(`${pid(m)}|${pid(s.id)}|`)) addEdge(pid(m), pid(s.id), 'flag')
  }
  // Choices learn what they ripen, so ROADS TO HERE can name the exact move.
  for (const s of def.scenes)
    s.choices.forEach((c, ci) => {
      const r = ripensByChoice.get(`${s.id}|${ci}`)
      if (!r) return
      const node = byId.get(pid(s.id))!
      const ch = node.choices![ci]
      ch.ripens = [...r].filter((t) => !ch.targets.includes(t))
    })

  // ---- story-order layout --------------------------------------------------
  // The map opens where the game opens. Rank = longest story distance from
  // the chapter's ENTRY scene, so play order reads straight down and only
  // genuinely competing paths share a row. Pool scenes that can interrupt
  // the story sit one row above the beat they feed into; self-contained
  // deals shelf at the bottom. Deal edges draw dashed but never rank.
  const story = [...edgeMap.values()].filter((e) => e.cls !== 'deal')
  const entry = pid(def.entry)
  const rank = new Map<string, number>()
  rank.set(entry, 0)
  for (let round = 0; round < 64; round++) {
    let moved = false
    for (const e of story) {
      const ru = rank.get(e.from)
      if (ru === undefined) continue
      const rv = rank.get(e.to)
      if (rv === undefined || rv < ru + 1) {
        rank.set(e.to, ru + 1)
        moved = true
      }
    }
    if (!moved) break
  }
  // Feeders (world interrupts): unranked nodes that fire into the ranked
  // story get a HALF rank — their own row between story beats, never sharing
  // a row with a genuine choice-fork. Anything they lead to settles below.
  for (let pass = 0; pass < 4; pass++) {
    let moved = false
    for (const n of nodesRaw) {
      if (rank.has(n.id)) continue
      const outs = story.filter((e) => e.from === n.id && rank.has(e.to)).map((e) => rank.get(e.to)!)
      if (outs.length) {
        rank.set(n.id, Math.max(0.5, Math.min(...outs) - 0.5))
        moved = true
        continue
      }
      const ins = story.filter((e) => e.to === n.id && rank.has(e.from)).map((e) => rank.get(e.from)!)
      if (ins.length) {
        rank.set(n.id, Math.max(...ins) + 1)
        moved = true
      }
    }
    if (!moved) break
  }

  // Within-rank order: DFS pre-order from the entry keeps sibling branches
  // adjacent; feeders inherit their target's order so they sit beside the
  // beat they interrupt.
  const outAdj = new Map<string, string[]>()
  for (const e of story) {
    if (!outAdj.has(e.from)) outAdj.set(e.from, [])
    outAdj.get(e.from)!.push(e.to)
  }
  const order = new Map<string, number>()
  {
    let i = 0
    const stack = [entry]
    while (stack.length) {
      const id = stack.pop()!
      if (order.has(id)) continue
      order.set(id, i++)
      const kids = (outAdj.get(id) ?? []).slice().reverse()
      for (const k of kids) if (!order.has(k)) stack.push(k)
    }
  }
  for (const n of nodesRaw)
    if (rank.has(n.id) && !order.has(n.id)) {
      const t = story.find((e) => e.from === n.id && order.has(e.to))
      order.set(n.id, (t ? order.get(t.to)! : 9e5) + 0.5)
    }

  // ---- geometry: centered rows inside a one-screen column -------------------
  const COLW = 1240
  const pos = new Map<string, { x: number; y: number }>()
  let cursorY = 24
  {
    const rankVals = [...new Set(rank.values())].sort((a, b) => a - b)
    for (const r of rankVals) {
      const ids = nodesRaw
        .filter((n) => rank.get(n.id) === r)
        .sort((a, b) => (order.get(a.id) ?? 9e5) - (order.get(b.id) ?? 9e5))
        .map((n) => n.id)
      const rows: string[][] = [[]]
      let rw = 0
      for (const id of ids) {
        const { w } = nodeSize(byId.get(id)!)
        if (rw + w + 18 > COLW - 48 && rows[rows.length - 1].length) {
          rows.push([])
          rw = 0
        }
        rows[rows.length - 1].push(id)
        rw += w + 18
      }
      for (const row of rows) {
        const totalW = row.reduce((s, id) => s + nodeSize(byId.get(id)!).w, 0) + (row.length - 1) * 18
        // Story ranks center; interrupt half-ranks hug the right margin so the
        // spine and the world's intrusions read as two different voices.
        const frac = r % 1 !== 0
        let cx = frac ? 24 + Math.max(0, COLW - 48 - totalW) : 24 + Math.max(0, (COLW - 48 - totalW) / 2)
        let rowH = 0
        for (const id of row) {
          const { w, h } = nodeSize(byId.get(id)!)
          pos.set(id, { x: Math.round(cx), y: cursorY })
          cx += w + 18
          rowH = Math.max(rowH, h)
        }
        cursorY += rowH + 16
      }
      cursorY += 30
    }
  }
  const spineW = COLW
  const spineH = cursorY

  // THE WORLD's pool — self-contained deals no story thread touches. They
  // wrap into a compact grid beneath the story spine.
  const loose = nodesRaw.filter((n) => !rank.has(n.id))
  const GRIDW = COLW
  const loosePos = new Map<string, { x: number; y: number }>()
  {
    let x = 24
    let y = spineH + 40
    let rowH = 0
    for (const n of loose) {
      const { w, h } = nodeSize(n)
      if (x + w > GRIDW) {
        x = 24
        y += rowH + 26
        rowH = 0
      }
      loosePos.set(n.id, { x, y })
      x += w + 26
      rowH = Math.max(rowH, h)
    }
  }

  const nodes: MapNode[] = nodesRaw.map((n) => {
    const { w, h } = nodeSize(n)
    const lp = loosePos.get(n.id) ?? pos.get(n.id)
    if (lp) return { ...n, x: lp.x, y: lp.y, w, h }
    return { ...n, x: 24, y: 24, w, h }
  })
  const edges = [...edgeMap.values()]

  const laneW = Math.max(spineW, loose.length ? GRIDW : 0) + 24
  const laneH = loose.length
    ? Math.max(...[...loosePos.values()].map((p) => p.y)) + 180
    : spineH + 40

  let choiceCount = 0
  for (const s of def.scenes) choiceCount += s.choices.length

  return {
    id,
    title: def.title,
    tagline: def.tagline,
    stats: { scenes: def.scenes.length, choices: choiceCount, endings: def.endings.length },
    nodes,
    edges,
    width: laneW,
    height: laneH,
  }
}

// ---- HTML shell -------------------------------------------------------------

const esc = (s: string): string => s.replace(/</g, '\\u003c')
const hesc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

// Build-time literal index: every editable block is mapped to the one content
// file that contains its exact TS literal. Blocks whose literal is not unique
// across src/content render read-only in the editor.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

/** Size + duration of a file in public/, so the MUSIC tab cannot show a stale 90s organ after a trim. */
function publicAudio(rel: string, fallbackSeconds: number): { seconds: number; path: string } {
  const file = join(process.cwd(), 'public', rel)
  let ver = '0'
  try {
    ver = String(statSync(file).size)
  } catch {
    /* missing file plays as a broken src; the tab still has to render */
  }
  const probe = spawnSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nk=1:nw=1', file],
    { encoding: 'utf8' },
  )
  const seconds = Number(probe.stdout)
  return {
    seconds: Number.isFinite(seconds) ? Math.round(seconds) : fallbackSeconds,
    path: `${rel}?v=${ver}`,
  }
}

function contentFiles(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...contentFiles(p))
    else if (name.endsWith('.ts')) out.push(p)
  }
  return out
}
const SRC_FILES = contentFiles(join(process.cwd(), 'src', 'content')).map((f) => ({
  rel: f.slice(process.cwd().length + 1),
  src: readFileSync(f, 'utf8'),
}))
const toLiteral = (text: string): string => text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')

const LOCK: Record<string, string> = {}
const FILEOF: Record<string, string> = {}

/** Register an editable block; returns the data attrs if uniquely locatable. */
function editable(path: string, text: string): string {
  const lit = toLiteral(text)
  let file = ''
  let hits = 0
  for (const f of SRC_FILES) {
    let at = f.src.indexOf(lit)
    while (at !== -1) {
      hits++
      file = f.rel
      at = f.src.indexOf(lit, at + 1)
    }
  }
  if (hits !== 1) return ''
  LOCK[path] = text
  FILEOF[path] = file
  return ` data-path="${hesc(path)}"`
}

// ---- ART GALLERY — every image in the game, grouped for audit ----------------
interface ArtCard {
  id: string
  grp: string // CAST | chapter title | ORPHANS
  sub: string // PFP | SCENE | CUTSCENE | BRIDGE | FILM | PROLOGUE | VARIANT | ENDING | INTERLUDE | FILE
  uses: string[]
  chars: string[]
}

function artCards(): ArtCard[] {
  const cards = new Map<string, ArtCard>()
  const charName = (id?: string): string => (id ? CONTENT.characters[id]?.name ?? id : '')
  const add = (id: string | undefined, grp: string, sub: string, use: string, chars: string[] = []): void => {
    if (!id) return
    let c = cards.get(id)
    if (!c) {
      c = { id, grp, sub, uses: [], chars: [] }
      cards.set(id, c)
    }
    if (!c.uses.includes(use)) c.uses.push(use)
    for (const nm of chars) if (nm && !c.chars.includes(nm)) c.chars.push(nm)
  }
  for (const [cid, cdef] of Object.entries(CONTENT.characters))
    if (existsSync(join(process.cwd(), 'public', 'art', `${cid}.webp`)))
      add(cid, 'CAST', 'PFP', `${cdef.name} — ${cdef.role}`, [cdef.name])
  for (const ch of Object.values(CONTENT.chapters)) {
    const G = ch.title
    ch.prologue?.forEach((p, i) =>
      add(p.art, G, 'PROLOGUE', `opening film · screen ${i + 1}${p.title ? ` · ${p.title}` : ''}`),
    )
    for (const s of ch.scenes) {
      const sub = s.kind === 'cutscene' ? 'CUTSCENE' : s.kind === 'bridge' ? 'BRIDGE' : 'SCENE'
      add(s.art, G, sub, `${s.title} · ${s.id}`, [charName(s.speaker)])
      s.screens?.forEach((p, i) => add(p.art, G, 'FILM', `${s.title} · film screen ${i + 1}`, [charName(s.speaker)]))
      s.vary?.forEach((v, i) => add(v.art, G, 'VARIANT', `${s.title} · variant ${i + 1}`, [charName(s.speaker)]))
    }
    for (const e of ch.endings) {
      add(e.art, G, 'ENDING', `ending · ${e.title}`)
      e.screens?.forEach((p, i) => add(p.art, G, 'FILM', `${e.title} · film screen ${i + 1}`))
      if (e.interlude?.art) add(e.interlude.art, G, 'INTERLUDE', `${e.title} · the years after`)
    }
  }
  // Orphans — files on disk that no content references. Remake/retire audit pile.
  for (const f of readdirSync(join(process.cwd(), 'public', 'art')))
    if (f.endsWith('.webp')) {
      const id = f.slice(0, -5)
      if (!cards.has(id)) add(id, 'ORPHANS', 'FILE', 'not referenced by any content')
    }
  return [...cards.values()]
}

let ART_FLAGS: string[] = []
try {
  ART_FLAGS = JSON.parse(readFileSync(join(process.cwd(), 'art', 'flags.json'), 'utf8')).flagged ?? []
} catch {
  /* no flags yet */
}

// The simulator's flight record (npm run sim) — absent is fine; the tab says so.
let SIM_REPORT: unknown = null
try {
  SIM_REPORT = JSON.parse(readFileSync(join(process.cwd(), 'sim', 'report.json'), 'utf8'))
} catch {
  /* no sim report yet */
}

// ---- MUSIC ROOM — live baseline + isolated Eleven Music auditions -----------
interface MusicCandidate {
  id: string
  title: string
  chapter: string
  role: string
  level: string
  art: string
  scenes: string[]
  note: string
  prompt: string
  seconds?: number
}

interface MusicBenchmarkSelection {
  id: string
  composition: string
  variant: number
  seed: number
  score: number
  metrics: {
    introDelay: number
    lowBandDelta: number
    medianCentroid: number
    sectionCentroidRangeRatio: number
    integratedLufs: number
    loudnessRange: number
    loudnessSurge: number
  }
}

interface MusicBenchmarkComposition extends Omit<MusicCandidate, 'prompt'> {
  key: string
  motifNotes: string
  tempo: string
  meter: string
  palette: string[]
  seedBase: number
  sections: Array<{ name: string; durationMs: number; direction: string }>
}

interface MusicDirectionComposition extends MusicBenchmarkComposition {
  moments: string[]
}

interface MusicV2Track {
  id: string
  title: string
  chapter: string
  role: string
  level: string
  art: string
  moments: string[]
  note: string
}

function musicData() {
  const manifest = JSON.parse(
    readFileSync(join(process.cwd(), 'music', 'candidates.json'), 'utf8'),
  ) as { model: string; seconds: number; candidates: MusicCandidate[] }
  const benchmarkManifest = JSON.parse(
    readFileSync(join(process.cwd(), 'music', 'benchmarks.json'), 'utf8'),
  ) as {
    model: string
    seconds: number
    variantsPerComposition: number
    compositions: MusicBenchmarkComposition[]
    curated: MusicBenchmarkSelection[]
  }
  const directionManifest = JSON.parse(
    readFileSync(join(process.cwd(), 'music', 'directions.json'), 'utf8'),
  ) as {
    model: string
    seconds: number
    variantsPerComposition: number
    compositions: MusicDirectionComposition[]
    curated: MusicBenchmarkSelection[]
  }
  const v2Manifest = JSON.parse(
    readFileSync(join(process.cwd(), 'music', 'v2.json'), 'utf8'),
  ) as { model: string; seconds: number; tracks: MusicV2Track[] }
  let decisions: Record<string, 'approved' | 'rejected'> = {}
  try {
    decisions = JSON.parse(
      readFileSync(join(process.cwd(), 'music', 'review.json'), 'utf8'),
    ).decisions ?? {}
  } catch {
    /* An empty review is the normal first-run state. */
  }

  const current = [
    ...Object.entries(MOODS).map(([role, def]) => ({
      id: def.id,
      title: role.replace(/_/g, ' ').toUpperCase(),
      role: 'CURRENT MOOD',
      prompt: def.prompt,
      gain: def.gain,
      seconds: def.seconds ?? 30,
      tracks: Array.from({ length: def.takes ?? 1 }, (_, i) => ({
        id: i ? `${def.id}_${i + 1}` : def.id,
        label: `TAKE ${i + 1}`,
        path: `sfx/${i ? `${def.id}_${i + 1}` : def.id}.mp3`,
      })),
    })),
    {
      id: TENSION.id,
      title: 'TENSION',
      role: 'CURRENT STEM',
      prompt: TENSION.prompt,
      gain: TENSION.gain,
      seconds: TENSION.seconds ?? 22,
      tracks: [{ id: TENSION.id, label: 'PLAY', path: `sfx/${TENSION.id}.mp3` }],
    },
  ]

  const candidates = manifest.candidates.map((candidate) => {
    const chapter = CONTENT.chapters[candidate.chapter.toLowerCase() as keyof typeof CONTENT.chapters]
    const uses = candidate.scenes.map((id) => {
      if (id.startsWith('end:')) return chapter?.endings.find((e) => e.id === id.slice(4))?.title ?? id
      return chapter?.scenes.find((s) => s.id === id)?.title ?? id
    })
    return {
      ...candidate,
      seconds: candidate.seconds ?? manifest.seconds,
      path: `music-candidates/${candidate.id}.mp3`,
      uses,
    }
  })

  const benchmarks = benchmarkManifest.curated.map((selection) => {
    const composition = benchmarkManifest.compositions.find((candidate) => candidate.id === selection.composition)
    if (!composition) throw new Error(`Unknown curated benchmark composition: ${selection.composition}`)
    const chapter = CONTENT.chapters[composition.chapter.toLowerCase() as keyof typeof CONTENT.chapters]
    const uses = composition.scenes.map((id) => {
      if (id.startsWith('end:')) return chapter?.endings.find((ending) => ending.id === id.slice(4))?.title ?? id
      return chapter?.scenes.find((scene) => scene.id === id)?.title ?? id
    })
    return {
      ...composition,
      ...selection,
      compositionId: composition.id,
      seconds: benchmarkManifest.seconds,
      variantsTotal: benchmarkManifest.variantsPerComposition,
      path: `music-benchmarks/${selection.id}.mp3`,
      uses,
    }
  })

  const directions = directionManifest.curated.map((selection) => {
    const composition = directionManifest.compositions.find((candidate) => candidate.id === selection.composition)
    if (!composition) throw new Error(`Unknown curated direction composition: ${selection.composition}`)
    return {
      ...composition,
      ...selection,
      compositionId: composition.id,
      seconds: directionManifest.seconds,
      variantsTotal: directionManifest.variantsPerComposition,
      path: `music-directions/${selection.id}.mp3`,
      uses: composition.moments,
    }
  })

  const v2 = v2Manifest.tracks.map((track) => {
    const audio = publicAudio(`music-v2/${track.id}.mp3`, v2Manifest.seconds)
    return {
      ...track,
      seconds: audio.seconds,
      path: audio.path,
      uses: track.moments,
    }
  })

  return {
    model: manifest.model,
    benchmarkModel: benchmarkManifest.model,
    directionModel: directionManifest.model,
    directionRenders: directionManifest.compositions.length * directionManifest.variantsPerComposition,
    v2Model: v2Manifest.model,
    current,
    candidates,
    benchmarks,
    directions,
    v2,
    decisions,
  }
}

/** The whole game as one readable, editable document — the SCRIPT tab. */
function scriptHtml(): string {
  const out: string[] = []
  const block = (label: string, path: string, text?: string): void => {
    if (!text) return
    out.push(`<div class="sb"><div class="sb-k">${hesc(label)}</div><div class="sb-t"${editable(path, text)}>${hesc(text)}</div></div>`)
  }
  for (const ch of Object.values(CONTENT.chapters)) {
    out.push(`<h1 class="s-ch">${hesc(ch.title)}, INC. <span>— ${hesc(ch.tagline)}</span></h1>`)
    ch.prologue?.forEach((p, i) => block(`opening film · screen ${i + 1}${p.title ? ` · ${p.title}` : ''}`, `${ch.id}/prologue[${i}].prose`, p.prose))
    for (const s of ch.scenes) {
      const spk = s.speaker ? CONTENT.characters[s.speaker]?.name ?? s.speaker : 'THE WORLD'
      out.push(`<h2 class="s-sc" id="s-${hesc(s.id)}">${hesc(s.title)} <span>· ${hesc(s.id)} · ${hesc(spk)}${s.kind ? ` · ${s.kind}` : ''}</span></h2>`)
      block('lead-in', `${ch.id}/${s.id}.leadIn`, s.leadIn)
      block('prose', `${ch.id}/${s.id}.prose`, s.prose)
      s.screens?.forEach((p, i) => block(`film screen ${i + 1}`, `${ch.id}/${s.id}.screen[${i}].prose`, p.prose))
      s.vary?.forEach((v, i) => {
        block(`variant ${i + 1} · lead-in`, `${ch.id}/${s.id}.vary[${i}].leadIn`, v.leadIn)
        block(`variant ${i + 1} · prose`, `${ch.id}/${s.id}.vary[${i}].prose`, v.prose)
      })
      s.choices.forEach((c, i) => {
        out.push(
          `<div class="s-choice"><div class="sb-k">choice ${i + 1}${c.goto ? ` → ${hesc(c.goto)}` : ''}</div>` +
            `<div class="s-cl"${editable(`${ch.id}/${s.id}.choice[${i}].label`, c.label)}>${hesc(c.label)}</div>` +
            (c.result ? `<div class="sb-t"${editable(`${ch.id}/${s.id}.choice[${i}].result`, c.result)}>${hesc(c.result)}</div>` : '') +
            `</div>`,
        )
      })
    }
    out.push(`<h2 class="s-sc">${hesc(ch.title)} · ENDINGS</h2>`)
    for (const e of ch.endings) {
      out.push(`<h3 class="s-end">${hesc(e.title)} <span>· ${hesc(e.id)} · ${hesc(e.kind)}</span></h3>`)
      block('epilogue', `${ch.id}/end.${e.id}.prose`, e.prose)
      e.screens?.forEach((p, i) => block(`film screen ${i + 1}`, `${ch.id}/end.${e.id}.screen[${i}].prose`, p.prose))
      if (e.interlude) block('interlude — the years after', `${ch.id}/end.${e.id}.interlude.prose`, e.interlude.prose)
    }
  }
  return out.join('')
}

function renderHtml(chapters: MapChapter[]): string {
  const script = scriptHtml()
  const data = JSON.stringify({
    chapters,
    script,
    lock: LOCK,
    fileOf: FILEOF,
    art: artCards(),
    flags: ART_FLAGS,
    sim: SIM_REPORT,
    music: musicData(),
    repo: 'fatecx/fate',
    branch: 'main',
  })
  return TEMPLATE.split('__DATA__').join(esc(data))
}

const TEMPLATE = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fate Storyline Map</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --paper:#FAFAF7; --panel:#FFFFFF; --ink:#16181D; --dim:#7C7E76; --line:#DADBD3;
  --accent:#B4540A; --accent-soft:#F4E4D4;
  --triumph:#1F7A5C; --sale:#3E6BD6; --noble:#7A5CC0; --disgrace:#9C3B2E; --ruin:#2B2B28;
  --mono:'IBM Plex Mono',ui-monospace,monospace;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --paper:#14161A; --panel:#1B1E23; --ink:#ECEDea; --dim:#8B8D85; --line:#33363C;
  --accent:#E57A2E; --accent-soft:#3A2A1C;
}}
:root[data-theme="dark"]{
  --paper:#14161A; --panel:#1B1E23; --ink:#ECEDea; --dim:#8B8D85; --line:#33363C;
  --accent:#E57A2E; --accent-soft:#3A2A1C;
}
*{box-sizing:border-box;margin:0}
html,body{height:100%}
body{background:var(--paper);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:14px;line-height:1.5;display:flex;flex-direction:column;overflow:hidden}
button{font-family:var(--mono);cursor:pointer;background:none;border:none;color:inherit}
button:focus-visible,input:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
.topbar{display:flex;align-items:center;gap:18px;padding:10px 20px;border-bottom:1px solid var(--line);background:var(--panel);flex-wrap:wrap}
.masthead{font-family:'Orbitron',var(--mono);font-weight:800;font-size:15px;letter-spacing:.14em}
.masthead span{color:var(--accent)}
.tabs{display:flex;gap:6px}
.tab{font-size:12px;padding:5px 12px;border:1px solid var(--line);border-radius:3px;color:var(--dim)}
.tab.on{color:var(--ink);border-color:var(--ink);font-weight:600}
.search{margin-left:auto;display:flex;align-items:center;gap:8px}
.search input{font-family:var(--mono);font-size:12px;background:var(--paper);color:var(--ink);border:1px solid var(--line);border-radius:3px;padding:5px 10px;width:200px}
.search input:focus{outline:2px solid var(--accent);outline-offset:0;border-color:transparent}
.legend{display:flex;gap:16px;font-family:var(--mono);font-size:11px;color:var(--dim);flex-wrap:wrap;align-items:center;margin-left:auto}
.subbar{display:flex;gap:18px;align-items:center;padding:7px 20px;border-bottom:1px solid var(--line);background:var(--panel);flex-wrap:wrap}
.zoomer{display:flex;gap:5px;align-items:center}
.zoomer .tab{font-size:11px;padding:4px 9px;min-width:34px;text-align:center}
.cwrap{position:relative;overflow:hidden}
.canvas{transform-origin:0 0}
.filters .tab{font-size:11px;padding:4px 10px}
.pg{font-weight:600;letter-spacing:.1em}
.lg{display:flex;gap:6px;align-items:center}
.sw{width:22px;height:0;border-top:2px solid var(--ink);display:inline-block}
.sw.deal{border-top-style:dashed}
.sw.ruin{border-top-color:#9C3B2E}
.sw.gold{border-top-color:#B98A1F}
.dotk{width:9px;height:9px;border-radius:50%;display:inline-block;border:1.5px solid var(--ink)}
.stage{position:relative;flex:1;overflow:auto}
.lane{position:relative;margin:26px 30px}
.lane-head{display:flex;align-items:baseline;gap:14px;margin-bottom:6px}
.lane-title{font-family:'Orbitron',var(--mono);font-weight:600;font-size:13px;letter-spacing:.12em}
.lane-tag{color:var(--dim);font-size:12px}
.lane-stats{margin-left:auto;font-family:var(--mono);font-size:11px;color:var(--dim)}
.canvas{position:relative;background:
  linear-gradient(var(--line) 1px,transparent 1px) 0 0/100% 44px,
  radial-gradient(var(--line) 1px,transparent 1px) 0 0/44px 44px;}
svg.edges{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.edge{fill:none;stroke:var(--ink);stroke-opacity:.38;stroke-width:1.4}
.edge.deal{stroke-dasharray:5 5;stroke-opacity:.26}
.edge.ruin{stroke:#9C3B2E;stroke-dasharray:2 4;stroke-opacity:.75}
.edge.flag{stroke:var(--accent);stroke-opacity:.3;stroke-dasharray:2 6;stroke-width:1.5}
.edge.hl{stroke:var(--accent);stroke-opacity:1;stroke-width:2}
.edge.dimmed{stroke-opacity:.05}
.node{position:absolute;background:var(--panel);border:1.5px solid var(--ink);border-radius:4px;padding:9px 11px;cursor:pointer;transition:box-shadow .12s, opacity .15s}
.node:hover{box-shadow:0 2px 0 0 var(--ink)}
.node.pool{border-style:dashed;border-color:var(--dim)}
.ntitle{font-family:var(--mono);font-weight:600;font-size:12px;letter-spacing:.02em;line-height:1.35}
.ngist{color:var(--dim);font-size:11px;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.chiprow{display:flex;gap:5px;margin-top:5px;flex-wrap:wrap}
.chip{font-family:var(--mono);font-size:9px;letter-spacing:.06em;padding:1px 6px;border:1px solid var(--line);border-radius:99px;color:var(--dim)}
.chip.spk{color:var(--accent);border-color:var(--accent)}
.chip.ruinc{color:#9C3B2E;border-color:#9C3B2E;font-weight:700}
.dwhen{font-family:var(--mono);font-size:11px;line-height:1.6;color:var(--accent);border:1px dashed var(--accent);border-radius:4px;padding:6px 10px;margin-bottom:10px}
.dwhen.ruinc{color:#9C3B2E;border-color:#9C3B2E}
.node.ending{border-width:2px;text-align:left}
.node.ending .ntitle{font-size:11px}
.k-triumph{border-color:var(--triumph)} .k-sale{border-color:var(--sale)} .k-noble{border-color:var(--noble)} .k-disgrace{border-color:var(--disgrace)} .k-ruin{border-color:var(--ruin)}
.node.sel{outline:2.5px solid var(--accent);outline-offset:2px}
.node.lit{box-shadow:0 0 0 3px var(--accent-soft),0 2px 0 0 var(--ink)}
.node.dimmed{opacity:.13;pointer-events:auto}
.node.q-dim{opacity:.15}
.roads{margin-top:18px;border-top:1px solid var(--line);padding-top:12px}
.roads h4{font:600 10px/1 var(--mono);letter-spacing:.16em;color:var(--dim);margin:0 0 10px}
.rstep{position:relative;padding:0 0 10px 18px;border-left:2px solid var(--line);margin-left:5px}
.rstep:last-child{border-left-color:transparent}
.rstep::before{content:'';position:absolute;left:-6px;top:2px;width:10px;height:10px;border-radius:99px;background:var(--panel);border:2px solid var(--accent)}
.rstep .rt{font:600 12px/1.35 var(--mono)}
.rstep .rvia{font:400 11px/1.5 var(--mono);color:var(--dim);margin-top:2px}
.rstep .rgate{display:inline-block;font:600 9.5px/1 var(--mono);letter-spacing:.06em;color:var(--accent);border:1px solid var(--accent);border-radius:99px;padding:2px 8px;margin:4px 4px 0 0}
.drawer{position:absolute;top:0;right:0;bottom:0;width:min(420px,92vw);background:var(--panel);border-left:1px solid var(--line);transform:translateX(102%);transition:transform .18s ease;overflow-y:auto;z-index:10}
.drawer.open{transform:none;box-shadow:-12px 0 32px rgba(0,0,0,.08)}
.dhead{padding:14px 18px 10px;border-bottom:1px solid var(--line);position:sticky;top:0;background:var(--panel)}
.dkicker{font-family:var(--mono);font-size:10px;letter-spacing:.16em;color:var(--accent);text-transform:uppercase}
.dtitle{font-family:'Orbitron',var(--mono);font-weight:600;font-size:14px;letter-spacing:.06em;margin-top:3px;text-wrap:balance}
.dclose{position:absolute;top:12px;right:14px;font-size:16px;color:var(--dim)}
.dclose:hover{color:var(--ink)}
.dbody{padding:14px 18px 24px}
.dspeaker{font-family:var(--mono);font-size:11px;color:var(--dim);margin-bottom:8px}
.dprose{font-size:13.5px;line-height:1.65;white-space:pre-wrap}
.dchoices{margin-top:16px;display:flex;flex-direction:column;gap:10px}
.choice{border:1px solid var(--line);border-left:3px solid var(--ink);padding:9px 11px;border-radius:0 4px 4px 0}
.choice.jump{cursor:pointer}
.choice.jump:hover{border-left-color:var(--accent);background:var(--accent-soft)}
.clabel{font-weight:600;font-size:13px}
.creq{font-family:var(--mono);font-size:10.5px;color:var(--accent);margin-top:3px}
.ceffects{font-family:var(--mono);font-size:10.5px;color:var(--dim);margin-top:4px;display:flex;flex-direction:column;gap:1px}
.cresult{font-size:12px;color:var(--dim);margin-top:5px;font-style:italic}
.ctargets{font-family:var(--mono);font-size:10px;margin-top:5px;color:var(--dim)}
.hint{position:fixed;left:50%;transform:translateX(-50%);bottom:14px;font-family:var(--mono);font-size:11px;color:var(--dim);background:var(--panel);border:1px solid var(--line);border-radius:99px;padding:6px 16px;z-index:20}
.scriptpane{max-width:76ch;margin:0 auto;padding:34px 26px 120px}
.s-ch{font-family:'Orbitron',var(--mono);font-size:20px;letter-spacing:.1em;margin:44px 0 6px;padding-top:26px;border-top:2px solid var(--ink)}
.s-ch span{font-family:inherit;font-size:12px;color:var(--dim);letter-spacing:.02em}
.s-sc{font-family:var(--mono);font-size:14px;font-weight:600;letter-spacing:.04em;margin:34px 0 4px;padding-top:14px;border-top:1px solid var(--line)}
.s-sc span,.s-end span{font-weight:400;font-size:11px;color:var(--dim)}
.s-end{font-family:var(--mono);font-size:13px;margin:22px 0 2px}
.sb{margin:10px 0}
.sb-k{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:2px}
.sb-t{font-size:14px;line-height:1.7;white-space:pre-wrap}
.s-choice{border-left:3px solid var(--ink);padding:7px 12px;margin:12px 0;background:var(--panel);border-radius:0 4px 4px 0}
.s-cl{font-weight:600;font-size:13.5px;margin:1px 0 4px}
.s-choice .sb-t{font-size:12.5px;color:var(--dim)}
.edbar{display:flex;gap:6px;align-items:center;margin-left:auto}
.edbar .tab.on{color:var(--accent);border-color:var(--accent);font-weight:600}
.pubwrap{position:relative}
.pub{font-weight:600;letter-spacing:.06em}
.pub.has{color:var(--paper);background:var(--accent);border-color:var(--accent)}
.pub .spin{display:none;width:10px;height:10px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;margin-right:7px;vertical-align:-1px}
.pub.busy .spin{display:inline-block;animation:pspin .7s linear infinite}
@keyframes pspin{to{transform:rotate(360deg)}}
.pubdrop{position:absolute;top:calc(100% + 10px);right:0;width:min(380px,92vw);background:var(--panel);border:1px solid var(--line);border-radius:6px;box-shadow:0 10px 32px rgba(0,0,0,.14);padding:14px 16px;display:none;z-index:60}
.pubdrop.open{display:block}
.pd-head{font-family:var(--mono);font-size:11.5px;color:var(--dim);line-height:1.6}
.publog{margin-top:4px}
.publog:empty{display:none}
.pl{font-family:var(--mono);font-size:11.5px;line-height:1.55;padding:7px 0;border-top:1px dashed var(--line);display:flex;gap:9px;align-items:baseline}
.pl::before{flex:none}
.pl.run::before{content:'';width:9px;height:9px;border:2px solid var(--accent);border-top-color:transparent;border-radius:50%;display:inline-block;animation:pspin .7s linear infinite;align-self:center}
.pl.ok::before{content:'✓';color:var(--triumph);font-weight:600}
.pl.err::before{content:'✕';color:var(--disgrace);font-weight:600}
.pl.err{color:var(--disgrace)}
.pd-go{display:block;width:100%;margin-top:12px;font-family:var(--mono);font-weight:700;font-size:12px;letter-spacing:.1em;padding:9px;border-radius:4px;background:var(--accent);color:var(--paper);border:1px solid var(--accent)}
.pd-go:disabled{opacity:.35;cursor:default}
body[data-edit] .scriptpane [data-path]{outline:1px dashed var(--line);outline-offset:3px;border-radius:2px;cursor:text}
body[data-edit] .scriptpane [data-path]:focus{outline:1.5px solid var(--accent)}
body[data-edit] .scriptpane [data-path].dirty{background:var(--accent-soft)}
body[data-edit] .scriptpane .sb-t:not([data-path]),body[data-edit] .scriptpane .s-cl:not([data-path]){opacity:.45}
.artpane{display:flex;align-items:flex-start;min-height:100%}
.artside{position:sticky;top:0;flex:0 0 218px;max-height:calc(100vh - 60px);overflow-y:auto;padding:16px 12px 24px;border-right:1px solid var(--line);background:var(--panel);display:flex;flex-direction:column;gap:2px}
.af{font-family:var(--mono);font-size:12px;text-align:left;padding:6px 10px;border-radius:3px;color:var(--dim);display:flex;justify-content:space-between;gap:10px}
.af:hover{color:var(--ink)}
.af.on{color:var(--accent);font-weight:600;background:var(--accent-soft)}
.af .n{opacity:.65}
.af-h{font:600 9.5px/1 var(--mono);letter-spacing:.16em;color:var(--dim);margin:14px 0 5px;padding:0 10px}
.af-save{margin-top:16px;font:700 11px var(--mono);letter-spacing:.08em;padding:9px;border:1px solid var(--line);border-radius:4px;color:var(--dim)}
.af-save.has{background:var(--accent);border-color:var(--accent);color:var(--paper)}
.af-note{font:10.5px/1.5 var(--mono);color:var(--dim);padding:8px 10px 0}
.artmain{flex:1;min-width:0;padding:16px 20px 90px}
.artchips{flex-wrap:wrap;margin-bottom:14px}
.artchips .tab{font-size:10.5px;padding:3px 9px}
.artgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:14px;align-items:start}
.acard{border:1px solid var(--line);border-radius:5px;background:var(--panel);overflow:hidden;display:flex;flex-direction:column}
.acard.flagged{border-color:var(--disgrace);box-shadow:0 0 0 1.5px var(--disgrace)}
.acard img{width:100%;height:auto;display:block;cursor:zoom-in;background:var(--paper);min-height:80px}
.ainfo{padding:8px 10px 10px;display:flex;flex-direction:column;gap:5px}
.ahead{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.aid{font:600 11px var(--mono);word-break:break-all}
.aflagbtn{font-size:13px;color:var(--dim);flex:none;line-height:1}
.aflagbtn:hover{color:var(--disgrace)}
.aflagbtn.on{color:var(--disgrace)}
.arow{display:flex;gap:4px;flex-wrap:wrap}
.atag{font:600 9px var(--mono);letter-spacing:.06em;padding:1.5px 6px;border:1px solid var(--line);border-radius:99px;color:var(--dim)}
.atag.k{color:var(--accent);border-color:var(--accent)}
.ause{font-size:10.5px;color:var(--dim);line-height:1.5}
.lightbox{position:fixed;inset:0;background:rgba(10,10,10,.86);display:none;z-index:100;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:28px;cursor:zoom-out}
.lightbox.open{display:flex}
.lightbox img{max-width:min(94vw,960px);max-height:76vh;border-radius:4px;box-shadow:0 18px 60px rgba(0,0,0,.5)}
.lbmeta{font:12px/1.7 var(--mono);color:#E8E8E4;text-align:center;max-width:82ch}
.lbmeta b{color:#fff}
.lbnav{position:fixed;top:50%;transform:translateY(-50%);font-size:44px;line-height:1;color:#E8E8E4;padding:18px 20px;opacity:.65;z-index:101;cursor:pointer;user-select:none}
.lbnav:hover{opacity:1;color:#fff}
.lbprev{left:8px}
.lbnext{right:8px}
.lbcount{color:#8b8d85}
.musicpane{min-height:100%;padding:18px 22px 100px}
.simpane{max-width:1080px;margin:0 auto;padding:26px 24px 120px}
.sim-h{font-family:'Orbitron',var(--mono);font-size:15px;letter-spacing:.12em;margin:34px 0 12px;padding-top:20px;border-top:2px solid var(--ink)}
.sim-h:first-child{margin-top:0;border-top:none;padding-top:0}
.sim-sub{font:11px/1.6 var(--mono);color:var(--dim);margin:-6px 0 14px}
.sim-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:8px}
.sim-card{border:1px solid var(--line);border-radius:6px;background:var(--panel);padding:12px 14px}
.sim-card b{display:block;font:700 22px var(--mono);letter-spacing:.02em}
.sim-card span{font:10px var(--mono);letter-spacing:.14em;color:var(--dim);text-transform:uppercase}
.sim-card.bad b{color:var(--disgrace)}
.sim-card.good b{color:var(--triumph)}
.simtable{width:100%;border-collapse:collapse;font:11.5px var(--mono);margin-bottom:10px}
.simtable th{text-align:left;font-weight:600;color:var(--dim);letter-spacing:.08em;padding:6px 8px;border-bottom:1.5px solid var(--ink);white-space:nowrap}
.simtable td{padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top}
.simtable td.num{font-variant-numeric:tabular-nums;text-align:right}
.simtable .hot{color:var(--accent);font-weight:700}
.simtable .zero{color:var(--dim);opacity:.5}
.sim-chart{border:1px solid var(--line);border-radius:6px;background:var(--panel);padding:10px 12px 4px;margin-bottom:14px}
.sim-chart h4{font:600 10px var(--mono);letter-spacing:.16em;color:var(--dim);margin:0 0 6px}
.sim-chart svg{width:100%;height:110px;display:block}
.sim-band{fill:var(--accent);fill-opacity:.14;stroke:none}
.sim-mid{fill:none;stroke:var(--accent);stroke-width:1.6}
.sim-axis{font:9px var(--mono);fill:var(--dim)}
.sim-note{font:11px/1.7 var(--mono);color:var(--dim)}
.sim-flag{color:var(--disgrace);font-weight:600}
.musicbar{position:sticky;top:0;z-index:8;display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:10px 12px;margin:-2px -4px 18px;background:color-mix(in srgb,var(--paper) 94%,transparent);backdrop-filter:blur(10px);border:1px solid var(--line);border-radius:6px}
.mswitch{display:flex;border:1px solid var(--line);border-radius:4px;overflow:hidden;background:var(--panel)}
.mswitch button{font:600 10.5px var(--mono);letter-spacing:.08em;padding:7px 11px;color:var(--dim);border-right:1px solid var(--line)}
.mswitch button:last-child{border-right:0}
.mswitch button.on{color:var(--paper);background:var(--ink)}
.mfilters{display:flex;gap:5px;flex-wrap:wrap}
.mfilters .tab{font-size:10px;padding:4px 8px}
.mreviewcount{margin-left:auto;font:10.5px var(--mono);color:var(--dim)}
.msave{font:700 10.5px var(--mono);letter-spacing:.08em;padding:7px 11px;border:1px solid var(--line);border-radius:4px;color:var(--dim)}
.msave.has{background:var(--accent);border-color:var(--accent);color:var(--paper)}
.mintro{display:flex;align-items:baseline;justify-content:space-between;gap:20px;margin:0 2px 14px}
.mintro p{max-width:78ch;color:var(--dim);font-size:12.5px}
.mintro .model{flex:none;font:10px var(--mono);letter-spacing:.08em;color:var(--dim)}
.musicgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;align-items:start}
.mcard{border:1px solid var(--line);border-radius:6px;background:var(--panel);overflow:hidden;display:flex;flex-direction:column;min-width:0}
.mcard.approved{border-color:var(--triumph);box-shadow:0 0 0 1px var(--triumph)}
.mcard.rejected{border-color:var(--disgrace);opacity:.68}
.mcover{position:relative;aspect-ratio:16/9;overflow:hidden;background:linear-gradient(135deg,var(--accent-soft),var(--panel))}
.mcover img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.82) contrast(.96)}
.mcover::after{content:'';position:absolute;inset:0;background:linear-gradient(transparent 45%,rgba(0,0,0,.62));pointer-events:none}
.mplay{font:700 11px var(--mono);border:1px solid var(--line);border-radius:99px;padding:6px 10px;background:var(--panel);color:var(--ink);white-space:nowrap}
.mplay:hover,.mplay.active{border-color:var(--accent);color:var(--accent)}
.mcover .mplay{position:absolute;left:14px;bottom:14px;z-index:2;width:44px;height:44px;padding:0;border:1px solid rgba(255,255,255,.8);background:rgba(20,22,26,.78);color:#fff;font-size:16px;backdrop-filter:blur(6px)}
.mcover .mplay.active{background:var(--accent);border-color:var(--accent)}
.mprogress{position:absolute;left:0;right:0;bottom:0;height:12px;padding:0;border:0;background:transparent;z-index:3;cursor:ew-resize}
.mprogress::before{content:'';position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.28)}
.mprogress i{position:absolute;left:0;bottom:0;display:block;width:0;height:3px;background:var(--accent);pointer-events:none}
.mprogress:hover::before,.mprogress:focus-visible::before{height:5px}
.mtime{position:absolute;right:12px;bottom:14px;z-index:2;font:10.5px var(--mono);color:#fff}
.mskip{position:absolute;left:68px;bottom:17px;z-index:2;display:flex;gap:5px}
.mskip button{font:600 9.5px var(--mono);padding:4px 7px;border:1px solid rgba(255,255,255,.55);border-radius:99px;background:rgba(20,22,26,.68);color:#fff;backdrop-filter:blur(6px)}
.mskip button:hover{border-color:#fff}
.mbody{padding:11px 12px 12px;display:flex;flex-direction:column;gap:8px}
.mtop{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.mtitle{font:600 13px/1.35 var(--mono);letter-spacing:.02em}
.mid{font:9.5px var(--mono);color:var(--dim);margin-top:2px;word-break:break-all}
.mbadges{display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end}
.mbadge{font:600 8.5px var(--mono);letter-spacing:.08em;padding:2px 6px;border:1px solid var(--line);border-radius:99px;color:var(--dim);white-space:nowrap}
.mbadge.role{color:var(--accent);border-color:var(--accent)}
.mnote{font-size:12px;line-height:1.55}
.muses{font:10px/1.55 var(--mono);color:var(--dim);border-top:1px dashed var(--line);padding-top:7px}
.mreview{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:2px}
.mreview button{font:700 10px var(--mono);letter-spacing:.08em;padding:7px;border:1px solid var(--line);border-radius:4px;color:var(--dim)}
.mreview .approve.on{color:#fff;background:var(--triumph);border-color:var(--triumph)}
.mreview .reject.on{color:#fff;background:var(--disgrace);border-color:var(--disgrace)}
.moldhead{height:112px;background:linear-gradient(135deg,var(--accent-soft),var(--panel));padding:12px;position:relative}
.moldhead::before{content:'';position:absolute;inset:12px;background:repeating-linear-gradient(90deg,transparent 0 7px,var(--line) 7px 8px);opacity:.5;mask-image:linear-gradient(to top,#000,transparent)}
.mtakes{display:flex;gap:6px;flex-wrap:wrap;position:relative}
.moldhead .mskip{left:12px}
.moldhead .mtime{color:var(--dim)}
.moldhead .mprogress::before{background:var(--line)}
@media(max-width:680px){.musicpane{padding:12px 12px 80px}.musicgrid{grid-template-columns:1fr}.mreviewcount{margin-left:0}.musicbar{position:relative}.mintro{display:block}.mintro .model{margin-top:6px}}
@media (prefers-reduced-motion:no-preference){.node{transition:box-shadow .12s,opacity .15s}.drawer{transition:transform .18s ease}}
</style>
</head>
<body>
<header class="topbar">
  <div class="masthead">FATE<span>·</span>STORYLINE MAP</div>
  <nav class="tabs" id="pages">
    <button class="tab pg on" data-page="map">MAP</button>
    <button class="tab pg" data-page="art">ART</button>
    <button class="tab pg" data-page="music">MUSIC</button>
    <button class="tab pg" data-page="script">SCRIPT</button>
    <button class="tab pg" data-page="sim">SIM</button>
  </nav>
  <div class="search"><input id="q" type="search" placeholder="search scenes…" aria-label="Search scenes"></div>
  <div class="edbar" id="edbar" style="display:none">
    <button class="tab" id="edtoggle">EDIT</button>
    <div class="pubwrap">
      <button class="tab pub" id="edsave">PUBLISH</button>
      <div class="pubdrop" id="pubdrop">
        <div class="pd-head" id="pdhead">No unpublished edits.</div>
        <div class="publog" id="publog"></div>
        <button class="pd-go" id="pdgo" disabled>PUSH LIVE</button>
      </div>
    </div>
  </div>
</header>
<div class="subbar" id="subbar">
  <nav class="tabs filters" id="tabs"></nav>
  <div class="zoomer"><button class="tab" id="zout">−</button><button class="tab" id="zpct">100%</button><button class="tab" id="zin">+</button><button class="tab" id="zfit">FIT</button></div>
  <div class="legend">
    <span class="lg"><span class="sw"></span>a choice leads there</span>
    <span class="lg"><span class="sw" style="border-top-style:dotted;border-top-color:var(--accent)"></span>a choice here ripens it (sets its flag)</span>
    <span class="lg"><span class="dotk" style="border-style:dashed"></span>dashed + right-shifted = THE WORLD deals it in when its moment ripens</span>
    <span class="lg"><span class="dotk" style="border-color:#9C3B2E"></span>$0 / STRESS 100 = forced ruin scene</span>
    <span class="lg">bottom shelf = side deals off the main road</span>
  </div>
</div>
<main class="stage" id="stage"><div class="scriptpane" id="scriptpane" style="display:none"></div><div class="simpane" id="simpane" style="display:none"></div><div class="artpane" id="artpane" style="display:none">
  <aside class="artside" id="artside"></aside>
  <div class="artmain">
    <nav class="tabs artchips" id="artchips"></nav>
    <div class="artgrid" id="artgrid"></div>
  </div>
</div><div class="musicpane" id="musicpane" style="display:none">
  <div class="musicbar">
    <div class="mswitch" id="mswitch"><button data-set="v2" class="on">MUSIC 2.0</button><button data-set="direction">DIRECTION TEST</button><button data-set="benchmark">BENCHMARK ROUND</button><button data-set="new">FIRST AUDITIONS</button><button data-set="current">CURRENT SCORE</button></div>
    <div class="mfilters" id="mfilters"></div>
    <span class="mreviewcount" id="mreviewcount"></span>
    <button class="msave" id="msave" disabled>REVIEWS SAVED</button>
  </div>
  <div class="mintro"><p id="mintro"></p><span class="model" id="mmodel"></span></div>
  <div class="musicgrid" id="musicgrid"></div>
</div></main>
<div class="lightbox" id="lightbox"><button class="lbnav lbprev" id="lbprev" aria-label="Previous">‹</button><img id="lbimg" alt=""><button class="lbnav lbnext" id="lbnext" aria-label="Next">›</button><div class="lbmeta" id="lbmeta"></div></div>
<aside class="drawer" id="drawer">
  <div class="dhead"><div class="dkicker" id="dkicker"></div><div class="dtitle" id="dtitle"></div><button class="dclose" id="dclose" aria-label="Close">✕</button></div>
  <div class="dbody" id="dbody"></div>
</aside>
<div class="hint">click any beat → its downstream tree lights up · click an ending → every road that reaches it + the ROADS TO HERE chain in the drawer · Esc clears</div>
<script>
const DATA = __DATA__;
const stage=document.getElementById('stage'),tabs=document.getElementById('tabs'),q=document.getElementById('q');
const drawer=document.getElementById('drawer'),dk=document.getElementById('dkicker');
let currentTab='all';
const adj={},radj={};
DATA.chapters.forEach(ch=>{ch.edges.forEach(e=>{(adj[e.from]=adj[e.from]||new Set()).add(e.to);(radj[e.to]=radj[e.to]||new Set()).add(e.from);});});
function bfs(start,map){const seen=new Set([start]);const st=[start];while(st.length){const n=st.pop();for(const m of(map[n]||[]))if(!seen.has(m)){seen.add(m);st.push(m);}}return seen;}
function clearFocus(){document.querySelectorAll('.node.sel,.node.lit,.node.dimmed').forEach(n=>n.classList.remove('sel','lit','dimmed'));document.querySelectorAll('.edge.hl,.edge.dimmed').forEach(n=>n.classList.remove('hl','dimmed'));delete document.body.dataset.focus;}
function applyFocus(rootId,dir){clearFocus();document.body.dataset.focus='1';const map=dir==='down'?adj:radj;const lit=bfs(rootId,map);
  document.querySelectorAll('.node').forEach(el=>{if(!laneVisible(el))return;const id=el.dataset.id;
    if(lit.has(id)){el.classList.add(el.dataset.id===rootId?'sel':'lit');}else{el.classList.add('dimmed');}});
  document.querySelectorAll('.edge').forEach(el=>{
    const on=lit.has(el.dataset.from)&&lit.has(el.dataset.to);
    el.classList.toggle('hl',on);el.classList.toggle('dimmed',!on);});
  const sel=document.querySelector('.node.sel');if(sel)sel.scrollIntoView({block:'center',inline:'center',behavior:'smooth'});}
function laneVisible(el){const lane=el.closest('.lane');return !currentTab||currentTab==='all'||lane.dataset.ch===currentTab;}
DATA.chapters.forEach(ch=>{
  tabs.insertAdjacentHTML('beforeend','<button class="tab" data-ch="'+ch.id+'">'+ch.title+'</button>');
  const lane=document.createElement('section');lane.className='lane';lane.dataset.ch=ch.id;
  lane.innerHTML='<div class="lane-head"><span class="lane-title">'+ch.title+'</span><span class="lane-tag">'+ch.tagline+'</span><span class="lane-stats">'+ch.stats.scenes+' scenes · '+ch.stats.choices+' choices · '+ch.stats.endings+' endings</span></div>';
  const canvas=document.createElement('div');canvas.className='canvas';
  canvas.style.width=ch.width+'px';canvas.style.height=ch.height+'px';
  const wrap=document.createElement('div');wrap.className='cwrap';
  wrap.style.width=ch.width+'px';wrap.style.height=ch.height+'px';
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','edges');
  // Mount FIRST so edge-path lookups can find nodes in the document.
  wrap.appendChild(canvas);lane.appendChild(wrap);stage.appendChild(lane);
  ch.nodes.forEach(n=>{const el=document.createElement('div');el.className='node '+n.kind+(n.kind==='scene'&&n.dealt?' pool':'')+(n.endKind?' k-'+n.endKind:'');el.dataset.id=n.id;el.style.left=n.x+'px';el.style.top=n.y+'px';el.style.width=n.w+'px';el.style.minHeight=n.h+'px';
    let inner='<div class="ntitle">'+n.title+'</div>';
    if(n.kind==='scene'&&n.prose)inner+='<div class="ngist">'+n.prose.slice(0,150)+'…</div>';
    const chips=[];if(n.kind==='ending'&&n.endKind)chips.push('<span class="chip spk">'+n.endKind.toUpperCase()+'</span>');if(n.ruin)chips.push('<span class="chip ruinc">'+n.ruin+' →</span>');if(n.speaker)chips.push('<span class="chip spk">'+n.speaker+'</span>');if(n.fuse)chips.push('<span class="chip">⏱ FUSE</span>');
    if(chips.length)inner+='<div class="chiprow">'+chips.join('')+'</div>';
    el.innerHTML=inner;canvas.appendChild(el);el._node=n;
    el.addEventListener('click',ev=>{ev.stopPropagation();
      if(n.kind==='ending'){applyFocus(n.id,'up');openDrawer(n,ch);}
      else if(n.kind==='scene'){applyFocus(n.id,'down');openDrawer(n,ch);}
      else clearFocus();});});
  canvas.prepend(svg);
  ch.edges.forEach(e=>{const p=pathFor(ch,e);if(!p)return;const el=document.createElementNS('http://www.w3.org/2000/svg','path');el.setAttribute('class','edge '+e.cls);el.setAttribute('d',p);el.dataset.from=e.from;el.dataset.to=e.to;svg.appendChild(el);});
});
function nodeEl(id){return document.querySelector('.node[data-id="'+CSS.escape(id)+'"]');}
function pathFor(ch,e){const a=nodeEl(e.from),b=nodeEl(e.to);if(!a||!b)return null;const n1=a._node,n2=b._node;
  const x1=n1.x+n1.w/2,y1=n1.y+n1.h,x2=n2.x+n2.w/2,y2=n2.y;const dy=Math.max(30,(y2-y1)*0.45);
  return 'M'+x1+','+y1+' C'+x1+','+(y1+dy)+' '+x2+','+(y2-dy)+' '+x2+','+y2;}
function openDrawer(n,ch){
  dk.textContent=(n.kind==='ending'?('ENDING · '+n.endKind):ch.title)+(n.speaker?(' · '+n.speaker):'');
  document.getElementById('dtitle').textContent=n.title;
  const body=document.getElementById('dbody');let html='';
  if(n.dealt)html+='<div class="dwhen">THE WORLD deals this in · when '+n.dealt+'</div>';
  if(n.ruin)html+='<div class="dwhen ruinc">FORCED · the moment '+(n.ruin==='$0'?'the treasury hits $0':'stress hits 100')+'</div>';
  if(n.prose)html+='<div class="dspeaker">'+(n.speaker?n.speaker+' — ':'')+(n.kind==='ending'?'':'')+'</div><p class="dprose">'+n.prose+'</p>';
  if(n.choices&&n.choices.length){html+='<div class="dchoices">';
    n.choices.forEach(c=>{const jump=c.targets.length>0;const tid=jump?c.targets[0]:null;
      const nameOf=t=>{const tn=DATA.chapters.flatMap(c=>c.nodes).find(nn=>nn.id===t);return tn?tn.title:t};
      html+='<div class="choice'+(jump?' jump':'')+'"'+(tid?' data-tid="'+tid+'"':'')+'>'
        +'<div class="clabel">'+c.label+'</div>'
        +(c.requires?'<div class="creq">requires '+c.requires+'</div>':'')
        +(c.effects.length?'<div class="ceffects">'+c.effects.map(x=>'<span>'+x+'</span>').join('')+'</div>':'')
        +(c.result?'<div class="cresult">'+c.result+'</div>':'')
        +(jump?'<div class="ctargets">→ '+c.targets.map(nameOf).join(', ')+'</div>':'')
        +(c.ripens&&c.ripens.length?'<div class="ctargets">⚑ ripens '+c.ripens.map(nameOf).join(', ')+'</div>':'')
      +'</div>';});
    html+='</div>';}
  if(n.kind==='ending'){
    // PATH VIEW — every scene on any road that reaches this ending, in play order,
    // with the exact choice + gate that keeps you on the road.
    const lit=bfs(n.id,radj);
    const steps=ch.nodes.filter(x=>x.kind==='scene'&&lit.has(x.id)).sort((a,b)=>a.y-b.y);
    if(steps.length){
      html+='<div class="roads"><h4>ROADS TO HERE · '+steps.length+' BEATS</h4>';
      steps.forEach(s=>{
        const vias=(s.choices||[]).filter(c=>c.targets.concat(c.ripens||[]).some(t=>lit.has(t)));
        html+='<div class="rstep"><div class="rt">'+s.title+'</div>'
          +vias.map(c=>'<div class="rvia">▸ '+c.label
            +(c.requires?'<br><span class="rgate">'+c.requires+'</span>':'')+'</div>').join('')
          +'</div>';
      });
      html+='</div>';}
  }
  body.innerHTML=html;drawer.classList.add('open');
  body.querySelectorAll('.choice.jump').forEach(el=>el.addEventListener('click',()=>{const t=nodeEl(el.dataset.tid);if(t)t.click();}));
}
// Chapter FILTERS (subbar) — they scope the map; the pages live in the header.
tabs.addEventListener('click',e=>{const b=e.target.closest('.tab');if(!b)return;
  currentTab=b.dataset.ch;
  document.querySelectorAll('#tabs .tab').forEach(t=>t.classList.toggle('on',t===b));
  document.querySelectorAll('.lane').forEach(l=>{l.style.display=(currentTab==='all'||l.dataset.ch===currentTab)?'':'none';});
  clearFocus();drawer.classList.remove('open');});
{const all=document.createElement('button');all.className='tab on';all.dataset.ch='all';all.textContent='ALL CHAPTERS';tabs.prepend(all);}
// ZOOM — scale the canvases; FIT sizes the widest visible chapter to the screen.
let ZOOM=1;
function applyZoom(){
  document.querySelectorAll('.canvas').forEach(c=>{
    c.style.transform=ZOOM===1?'':'scale('+ZOOM+')';
    const w=parseFloat(c.style.width),h=parseFloat(c.style.height);
    c.parentElement.style.width=(w*ZOOM)+'px';c.parentElement.style.height=(h*ZOOM)+'px';});
  document.getElementById('zpct').textContent=Math.round(ZOOM*100)+'%';}
function setZoom(z){ZOOM=Math.min(1.5,Math.max(0.1,z));applyZoom();}
document.getElementById('zin').addEventListener('click',()=>setZoom(ZOOM*1.25));
document.getElementById('zout').addEventListener('click',()=>setZoom(ZOOM/1.25));
document.getElementById('zpct').addEventListener('click',()=>setZoom(1));
document.getElementById('zfit').addEventListener('click',()=>{
  let w=0;
  document.querySelectorAll('.lane').forEach(l=>{
    if(l.style.display==='none')return;
    const c=l.querySelector('.canvas');if(c)w=Math.max(w,parseFloat(c.style.width));});
  if(w)setZoom((stage.clientWidth-70)/w);});
// PAGES (header) — MAP, SCRIPT, ART, MUSIC and SIM are different rooms, not filters.
document.getElementById('pages').addEventListener('click',e=>{const b=e.target.closest('.pg');if(!b)return;
  const page=b.dataset.page,scriptOn=page==='script',artOn=page==='art',musicOn=page==='music',simOn=page==='sim',mapOn=page==='map';
  document.querySelectorAll('.pg').forEach(t=>t.classList.toggle('on',t===b));
  const pane=document.getElementById('scriptpane');
  pane.style.display=scriptOn?'':'none';
  if(scriptOn&&!pane.dataset.built){pane.innerHTML=DATA.script;pane.dataset.built='1';
    if(document.body.hasAttribute('data-edit'))applyEditable(true);}
  const ap=document.getElementById('artpane');
  ap.style.display=artOn?'':'none';
  if(artOn&&!ap.dataset.built){buildArt();ap.dataset.built='1';}
  const mp=document.getElementById('musicpane');
  mp.style.display=musicOn?'':'none';
  if(musicOn&&!mp.dataset.built){buildMusic();mp.dataset.built='1';}
  if(!musicOn)stopMusic();
  const sp=document.getElementById('simpane');
  sp.style.display=simOn?'':'none';
  if(simOn&&!sp.dataset.built){buildSim();sp.dataset.built='1';}
  document.getElementById('edbar').style.display=scriptOn?'':'none';
  document.getElementById('subbar').style.display=mapOn?'':'none';
  document.querySelector('.search').style.display=(scriptOn||simOn)?'none':'';
  q.placeholder=artOn?'search art…':musicOn?'search music…':'search scenes…';
  document.querySelector('.hint').style.display=mapOn?'':'none';
  document.querySelectorAll('.lane').forEach(l=>{l.style.display=(mapOn&&(currentTab==='all'||l.dataset.ch===currentTab))?'':'none';});
  clearFocus();drawer.classList.remove('open');});
document.getElementById('dclose').addEventListener('click',()=>{drawer.classList.remove('open');clearFocus();});
stage.addEventListener('click',e=>{if(e.target===stage||e.target.classList.contains('canvas')){drawer.classList.remove('open');clearFocus();}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){drawer.classList.remove('open');document.getElementById('pubdrop').classList.remove('open');document.getElementById('lightbox').classList.remove('open');clearFocus();}});
q.addEventListener('input',()=>{const v=q.value.trim().toLowerCase();document.querySelectorAll('.node').forEach(el=>{const n=el._node;if(!n)return;const hit=!v||(n.title+' '+(n.prose||'')).toLowerCase().includes(v);el.classList.toggle('q-dim',!hit);});
  if(document.getElementById('artpane').dataset.built)applyArtFilter();
  if(document.getElementById('musicpane').dataset.built)applyMusicFilter();});

// ---- ART GALLERY — every frame in the game, foldered, filterable, flaggable --
// Sidebar folders scope by group (cast / chapter / orphans / flagged); chips
// filter by type; search matches id, usage and character. Flag any card and
// SAVE FLAGS commits art/flags.json through /api/save — a remake list any
// agent can pick up.
const AFLAGS=new Set(DATA.flags||[]);
let artGrp='ALL',artSub='ALL';
const ARTBASE=location.protocol==='file:'?'public/art/':'/art/';
const eh=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
function flagDirty(){const base=new Set(DATA.flags||[]);let n=0;
  AFLAGS.forEach(x=>{if(!base.has(x))n++;});base.forEach(x=>{if(!AFLAGS.has(x))n++;});return n;}
function refreshFlagUI(){
  const btn=document.getElementById('afsave');if(!btn)return;
  const d=flagDirty();
  btn.textContent=d?('SAVE FLAGS ('+d+')'):'FLAGS SAVED';
  btn.classList.toggle('has',d>0);btn.disabled=!d;
  const fl=document.querySelector('.af[data-grp="FLAGGED"] .n');if(fl)fl.textContent=AFLAGS.size;}
function toggleFlag(id){
  if(AFLAGS.has(id))AFLAGS.delete(id);else AFLAGS.add(id);
  document.querySelectorAll('.acard[data-id="'+CSS.escape(id)+'"]').forEach(el=>{
    el.classList.toggle('flagged',AFLAGS.has(id));
    el.querySelector('.aflagbtn').classList.toggle('on',AFLAGS.has(id));});
  refreshFlagUI();if(artGrp==='FLAGGED')applyArtFilter();}
function applyArtFilter(){const v=q.value.trim().toLowerCase();
  let shown=0;
  document.querySelectorAll('.acard').forEach(el=>{const a=el._art;
    const gOk=artGrp==='ALL'||(artGrp==='FLAGGED'?AFLAGS.has(a.id):a.grp===artGrp);
    const sOk=artSub==='ALL'||a.sub===artSub;
    const qOk=!v||(a.id+' '+a.uses.join(' ')+' '+a.chars.join(' ')).toLowerCase().includes(v);
    const on=gOk&&sOk&&qOk;el.style.display=on?'':'none';if(on)shown++;});
  const c=document.getElementById('afcount');if(c)c.textContent=shown+' of '+DATA.art.length+' frames';}
function lbList(){return [...document.querySelectorAll('.acard')].filter(el=>el.style.display!=='none').map(el=>el._art);}
function openLightbox(a){
  const list=lbList(),i=list.findIndex(x=>x.id===a.id);
  document.getElementById('lbimg').src=ARTBASE+a.id+'.webp';
  document.getElementById('lbmeta').innerHTML='<b>'+eh(a.id)+'</b> · '+eh(a.sub)+' · '+eh(a.grp)
    +(i>=0?' <span class="lbcount">· '+(i+1)+' / '+list.length+'</span>':'')
    +(a.chars.length?'<br>'+a.chars.map(eh).join(' · '):'')
    +'<br>'+a.uses.map(eh).join('<br>');
  document.getElementById('lightbox').dataset.cur=a.id;
  document.getElementById('lightbox').classList.add('open');}
function lbStep(dir){
  const lb=document.getElementById('lightbox');
  if(!lb.classList.contains('open'))return;
  const list=lbList();if(!list.length)return;
  const i=list.findIndex(x=>x.id===lb.dataset.cur);
  openLightbox(list[(i+dir+list.length)%list.length]);}
document.getElementById('lightbox').addEventListener('click',()=>document.getElementById('lightbox').classList.remove('open'));
document.getElementById('lbprev').addEventListener('click',e=>{e.stopPropagation();lbStep(-1);});
document.getElementById('lbnext').addEventListener('click',e=>{e.stopPropagation();lbStep(1);});
document.getElementById('lbimg').addEventListener('click',e=>{e.stopPropagation();lbStep(1);});
document.addEventListener('keydown',e=>{
  if(!document.getElementById('lightbox').classList.contains('open'))return;
  if(e.key==='ArrowRight'){e.preventDefault();lbStep(1);}
  else if(e.key==='ArrowLeft'){e.preventDefault();lbStep(-1);}});
function buildArt(){
  const side=document.getElementById('artside'),grid=document.getElementById('artgrid'),chips=document.getElementById('artchips');
  const grps=['ALL'];DATA.art.forEach(a=>{if(!grps.includes(a.grp))grps.push(a.grp);});grps.push('FLAGGED');
  const count=g=>g==='ALL'?DATA.art.length:g==='FLAGGED'?AFLAGS.size:DATA.art.filter(a=>a.grp===g).length;
  side.innerHTML='<div class="af-h">FOLDERS</div>'
    +grps.map(g=>'<button class="af'+(g==='ALL'?' on':'')+'" data-grp="'+eh(g)+'"><span>'+(g==='FLAGGED'?'⚑ FLAGGED':eh(g))+'</span><span class="n">'+count(g)+'</span></button>').join('')
    +'<button class="af-save" id="afsave" disabled>FLAGS SAVED</button>'
    +'<div class="af-note" id="afcount"></div>'
    +'<div class="af-note">⚑ marks a frame for remake. SAVE commits the list to the repo.</div>';
  const subs=['ALL'];DATA.art.forEach(a=>{if(!subs.includes(a.sub))subs.push(a.sub);});
  chips.innerHTML=subs.map(s=>'<button class="tab'+(s==='ALL'?' on':'')+'" data-sub="'+eh(s)+'">'+(s==='PFP'?'PFPS':eh(s)+(s==='ALL'?'':'S')).replace('ALLS','ALL')+'</button>').join('');
  DATA.art.forEach(a=>{
    const el=document.createElement('div');
    el.className='acard'+(AFLAGS.has(a.id)?' flagged':'');el.dataset.id=a.id;
    el.innerHTML='<img loading="lazy" src="'+ARTBASE+eh(a.id)+'.webp" alt="'+eh(a.id)+'">'
      +'<div class="ainfo"><div class="ahead"><span class="aid">'+eh(a.id)+'</span>'
      +'<button class="aflagbtn'+(AFLAGS.has(a.id)?' on':'')+'" title="flag for remake">⚑</button></div>'
      +'<div class="arow"><span class="atag k">'+eh(a.sub)+'</span><span class="atag">'+eh(a.grp)+'</span>'+a.chars.map(c=>'<span class="atag">'+eh(c)+'</span>').join('')+'</div>'
      +'<div class="ause">'+a.uses.slice(0,3).map(eh).join('<br>')+(a.uses.length>3?'<br>+'+(a.uses.length-3)+' more':'')+'</div></div>';
    grid.appendChild(el);el._art=a;
    el.querySelector('img').addEventListener('click',()=>openLightbox(a));
    el.querySelector('.aflagbtn').addEventListener('click',()=>toggleFlag(a.id));});
  side.addEventListener('click',e=>{const b=e.target.closest('.af');if(!b)return;
    artGrp=b.dataset.grp;
    side.querySelectorAll('.af').forEach(x=>x.classList.toggle('on',x===b));
    applyArtFilter();});
  chips.addEventListener('click',e=>{const b=e.target.closest('.tab');if(!b)return;
    artSub=b.dataset.sub;
    chips.querySelectorAll('.tab').forEach(x=>x.classList.toggle('on',x===b));
    applyArtFilter();});
  document.getElementById('afsave').addEventListener('click',async()=>{
    const btn=document.getElementById('afsave');
    if(!flagDirty())return;
    const pass=mapPass();if(!pass)return;
    btn.disabled=true;btn.textContent='SAVING…';
    try{
      const out=await api({pass:pass,action:'flags',flags:[...AFLAGS].sort()});
      DATA.flags=[...AFLAGS];
      btn.textContent='SAVED · '+out.sha.slice(0,7);
      setTimeout(refreshFlagUI,2500);
    }catch(err){btn.textContent='FAILED — TRY AGAIN';btn.disabled=false;
      alert(String(err&&err.message||err));}
  });
  refreshFlagUI();applyArtFilter();}

// ---- MUSIC ROOM — A/B the current score against isolated new auditions -----
// One shared player prevents accidental cacophony. Review decisions are data,
// saved to music/review.json; candidate files are deliberately absent from the
// runtime registry until a later, explicit integration pass.
const MDEC=Object.assign({},DATA.music.decisions||{});
const musicPlayer=new Audio();musicPlayer.loop=true;
let musicSet='v2',musicChapter='ALL',musicActive=null;
const ASSETBASE=location.protocol==='file:'?'public/':'/';
const mtime=s=>{if(!Number.isFinite(s))return '0:00';const n=Math.max(0,Math.floor(s));return Math.floor(n/60)+':'+String(n%60).padStart(2,'0');};
function musicDirty(){const base=DATA.music.decisions||{};const ids=new Set(Object.keys(base).concat(Object.keys(MDEC)));let n=0;
  ids.forEach(id=>{if((base[id]||'')!==(MDEC[id]||''))n++;});return n;}
function refreshMusicReview(){
  document.querySelectorAll('.mcard[data-candidate]').forEach(card=>{const s=MDEC[card.dataset.candidate]||'';
    card.classList.toggle('approved',s==='approved');card.classList.toggle('rejected',s==='rejected');
    card.querySelector('.approve').classList.toggle('on',s==='approved');card.querySelector('.reject').classList.toggle('on',s==='rejected');});
  const pool=musicSet==='v2'?DATA.music.v2:musicSet==='direction'?DATA.music.directions:musicSet==='benchmark'?DATA.music.benchmarks:musicSet==='new'?DATA.music.candidates:[],ids=new Set(pool.map(x=>x.id));
  const approved=Object.entries(MDEC).filter(([id,status])=>ids.has(id)&&status==='approved').length,rejected=Object.entries(MDEC).filter(([id,status])=>ids.has(id)&&status==='rejected').length;
  const count=document.getElementById('mreviewcount');if(count)count.textContent=musicSet==='current'?'':approved+' approved · '+rejected+' rejected · '+(pool.length-approved-rejected)+' open';
  const save=document.getElementById('msave');if(save){const d=musicDirty();save.textContent=d?('SAVE REVIEWS ('+d+')'):'REVIEWS SAVED';save.classList.toggle('has',d>0);save.disabled=!d;}}
function resetMusicButtons(){document.querySelectorAll('.mplay').forEach(b=>{b.classList.remove('active');b.textContent=b.dataset.label||'▶';});}
function resetMusicCard(card){if(!card)return;const bar=card.querySelector('.mprogress i'),progress=card.querySelector('.mprogress'),time=card.querySelector('.mtime');
  if(bar)bar.style.width='0';if(progress)progress.setAttribute('aria-valuenow','0');if(time)time.textContent='0:00 / '+mtime(Number(card.dataset.duration));}
function stopMusic(){const card=musicActive&&musicActive.card;musicPlayer.pause();musicActive=null;resetMusicButtons();resetMusicCard(card);}
function playMusic(btn){const path=btn.dataset.path;
  if(musicActive&&musicActive.path===path){
    if(musicPlayer.paused){musicPlayer.play().catch(()=>{});btn.classList.add('active');btn.textContent='Ⅱ';}
    else{musicPlayer.pause();btn.classList.remove('active');btn.textContent=btn.dataset.label||'▶';}
    return;}
  musicPlayer.pause();if(musicActive)resetMusicCard(musicActive.card);resetMusicButtons();musicPlayer.src=ASSETBASE+path;musicActive={path:path,btn:btn,card:btn.closest('.mcard')};
  btn.classList.add('active');btn.textContent='Ⅱ';
  musicPlayer.play().catch(err=>{stopMusic();alert('Could not play this track: '+String(err&&err.message||err));});}
musicPlayer.addEventListener('timeupdate',()=>{if(!musicActive)return;const card=musicActive.card,bar=card.querySelector('.mprogress i'),time=card.querySelector('.mtime');
  const progress=card.querySelector('.mprogress'),pct=musicPlayer.duration?musicPlayer.currentTime/musicPlayer.duration*100:0;
  if(bar)bar.style.width=pct+'%';if(progress)progress.setAttribute('aria-valuenow',String(Math.round(pct)));if(time)time.textContent=mtime(musicPlayer.currentTime)+' / '+mtime(musicPlayer.duration);});
musicPlayer.addEventListener('ended',()=>{const card=musicActive&&musicActive.card;musicActive=null;resetMusicButtons();resetMusicCard(card);});
function skipMusic(seconds,card){if(!musicActive||musicActive.card!==card||!Number.isFinite(musicPlayer.duration))return;
  musicPlayer.currentTime=Math.max(0,Math.min(musicPlayer.duration,musicPlayer.currentTime+seconds));}
function scrubMusic(progress,event){const card=progress.closest('.mcard');if(!musicActive||musicActive.card!==card||!Number.isFinite(musicPlayer.duration))return;
  const box=progress.getBoundingClientRect(),ratio=Math.max(0,Math.min(1,(event.clientX-box.left)/box.width));musicPlayer.currentTime=ratio*musicPlayer.duration;}
function applyMusicFilter(){const v=q.value.trim().toLowerCase();let shown=0;
  document.querySelectorAll('.mcard').forEach(card=>{const setOk=card.dataset.set===musicSet,chOk=musicSet==='current'||musicChapter==='ALL'||card.dataset.chapter===musicChapter;
    const qOk=!v||card._musicSearch.includes(v),on=setOk&&chOk&&qOk;card.style.display=on?'':'none';if(on)shown++;});
  const intro=document.getElementById('mintro');if(intro)intro.textContent=musicSet==='v2'
    ?'Picture scores for every film in the game. Analog-noir and machine-organ sci-fi — not church, not Codex’s rounds. Play loops. Your ears make the decision.'
    :musicSet==='direction'
    ?'3 fresh 60-second composition directions curated from 12 internal renders: orchestral, analog, and hybrid. Every selection starts within two seconds and changes orchestration across the minute. Your ears make the decision; nothing here plays in the game.'
    :musicSet==='new'
      ?'12 first-pass 90-second auditions generated from one prose prompt each. Preserved with your original decisions for comparison; nothing here plays in the game.'
      :musicSet==='benchmark'
        ?'3 rejected company-theme benchmarks curated from 24 structured renders. Preserved for comparison; nothing here plays in the game.'
        :'The live baseline: play-scene drones, picture scores on films, and the tension stem. Same scene, same take. This is what the game uses today.';
  const model=document.getElementById('mmodel');if(model)model.textContent=musicSet==='v2'?(shown+' SHOWN · ELEVEN '+DATA.music.v2Model.toUpperCase()):musicSet==='direction'?(shown+' SHOWN · '+DATA.music.directionRenders+' INTERNAL RENDERS · ELEVEN '+DATA.music.directionModel.toUpperCase()):musicSet==='benchmark'?(shown+' SHOWN · 24 RENDERS · ELEVEN '+DATA.music.benchmarkModel.toUpperCase()):musicSet==='new'?(shown+' SHOWN · ELEVEN '+DATA.music.model.toUpperCase()):(shown+' SHOWN · 61 LIVE TRACKS');
  document.getElementById('mfilters').style.display=musicSet==='current'?'none':'';refreshMusicReview();}
function buildMusic(){const grid=document.getElementById('musicgrid'),filters=document.getElementById('mfilters');
  const chapters=['ALL'];DATA.music.v2.concat(DATA.music.directions,DATA.music.benchmarks,DATA.music.candidates).forEach(c=>{if(!chapters.includes(c.chapter))chapters.push(c.chapter);});
  filters.innerHTML=chapters.map(ch=>'<button class="tab'+(ch==='ALL'?' on':'')+'" data-chapter="'+eh(ch)+'">'+eh(ch)+'</button>').join('');
  filters.addEventListener('click',e=>{const b=e.target.closest('[data-chapter]');if(!b)return;musicChapter=b.dataset.chapter;
    filters.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));applyMusicFilter();});
  function appendAudition(c,set){const card=document.createElement('article');card.className='mcard';card.dataset.set=set;card.dataset.chapter=c.chapter;card.dataset.candidate=c.id;card.dataset.duration=c.seconds;
    card._musicSearch=(c.id+' '+c.title+' '+c.chapter+' '+c.role+' '+c.level+' '+c.note+' '+c.uses.join(' ')).toLowerCase();
    const metrics=(set==='benchmark'||set==='direction')?'<div class="muses">OBJECTIVE SCREEN '+eh(c.score)+'/100 · VARIANT '+eh(c.variant)+'/'+eh(c.variantsTotal)+' · START '+eh(c.metrics.introDelay)+'S · LOW BAND '+eh(c.metrics.lowBandDelta)+'DB · LRA '+eh(c.metrics.loudnessRange)+'LU</div>':'';
    card.innerHTML='<div class="mcover"><img loading="lazy" src="'+ARTBASE+eh(c.art)+'.webp" alt="">'
      +'<button class="mplay" data-path="'+eh(c.path)+'" data-label="▶" aria-label="Play '+eh(c.title)+'">▶</button><div class="mskip"><button data-skip="-15" aria-label="Back 15 seconds">−15</button><button data-skip="15" aria-label="Forward 15 seconds">+15</button></div><span class="mtime">0:00 / '+mtime(c.seconds)+'</span><button class="mprogress" aria-label="Scrub '+eh(c.title)+'" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></button></div>'
      +'<div class="mbody"><div class="mtop"><div><div class="mtitle">'+eh(c.title)+'</div><div class="mid">'+eh(c.id)+'</div></div><div class="mbadges"><span class="mbadge role">'+eh(c.role)+'</span><span class="mbadge">'+eh(c.level)+'</span><span class="mbadge">'+eh(c.chapter)+'</span></div></div>'
      +'<p class="mnote">'+eh(c.note)+'</p>'+metrics+'<div class="muses">FOR · '+c.uses.map(eh).join(' · ')+'</div>'
      +'<div class="mreview"><button class="approve">APPROVE</button><button class="reject">REJECT</button></div></div>';
    grid.appendChild(card);}
  DATA.music.v2.forEach(c=>appendAudition(c,'v2'));
  DATA.music.directions.forEach(c=>appendAudition(c,'direction'));
  DATA.music.benchmarks.forEach(c=>appendAudition(c,'benchmark'));
  DATA.music.candidates.forEach(c=>appendAudition(c,'new'));
  DATA.music.current.forEach(c=>{const card=document.createElement('article');card.className='mcard';card.dataset.set='current';card.dataset.duration=c.seconds;
    card._musicSearch=(c.id+' '+c.title+' '+c.role+' '+c.prompt).toLowerCase();
    card.innerHTML='<div class="moldhead"><div class="mtakes">'+c.tracks.map((t,i)=>'<button class="mplay" data-path="'+eh(t.path)+'" data-label="▶ '+(i+1)+'">▶ '+(i+1)+'</button>').join('')+'</div><div class="mskip"><button data-skip="-10" aria-label="Back 10 seconds">−10</button><button data-skip="10" aria-label="Forward 10 seconds">+10</button></div><span class="mtime">0:00 / '+mtime(c.seconds)+'</span><button class="mprogress" aria-label="Scrub '+eh(c.title)+'" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></button></div>'
      +'<div class="mbody"><div class="mtop"><div><div class="mtitle">'+eh(c.title)+'</div><div class="mid">'+eh(c.id)+'</div></div><div class="mbadges"><span class="mbadge role">'+eh(c.role)+'</span><span class="mbadge">GAIN '+c.gain+'</span></div></div>'
      +'<p class="mnote">'+eh(c.prompt)+'</p><div class="muses">'+c.tracks.length+' TAKE'+(c.tracks.length===1?'':'S')+' · '+c.seconds+'S EACH · LIVE IN GAME</div></div>';
    grid.appendChild(card);});
  grid.addEventListener('click',e=>{const play=e.target.closest('.mplay');if(play){playMusic(play);return;}const skip=e.target.closest('[data-skip]');if(skip){skipMusic(Number(skip.dataset.skip),skip.closest('.mcard'));return;}const progress=e.target.closest('.mprogress');if(progress){scrubMusic(progress,e);return;}const review=e.target.closest('.mreview button');if(!review)return;
    const id=review.closest('.mcard').dataset.candidate,want=review.classList.contains('approve')?'approved':'rejected';if(MDEC[id]===want)delete MDEC[id];else MDEC[id]=want;refreshMusicReview();});
  document.getElementById('mswitch').addEventListener('click',e=>{const b=e.target.closest('[data-set]');if(!b)return;musicSet=b.dataset.set;
    document.querySelectorAll('#mswitch button').forEach(x=>x.classList.toggle('on',x===b));stopMusic();applyMusicFilter();});
  document.getElementById('msave').addEventListener('click',async()=>{if(!musicDirty())return;const pass=mapPass();if(!pass)return;const btn=document.getElementById('msave');btn.disabled=true;btn.textContent='SAVING…';
    try{const out=await api({pass:pass,action:'music-review',decisions:MDEC});DATA.music.decisions=Object.assign({},MDEC);btn.textContent='SAVED · '+out.sha.slice(0,7);setTimeout(refreshMusicReview,2500);}
    catch(err){btn.textContent='FAILED — TRY AGAIN';btn.disabled=false;alert(String(err&&err.message||err));}});
  applyMusicFilter();}

// ---- SIM — the flight record: what 40,000 ghost founders found ---------------
function buildSim(){
  const sp=document.getElementById('simpane');
  const S=DATA.sim;
  if(!S){sp.innerHTML='<div class="sim-h">SIMULATOR</div><p class="sim-note">No flight record in this build. Run <b>npm run sim</b> and rebuild the map.</p>';return;}
  const CHT={hyperchute:'HYPERCHUTE',teleport:'TELEPORT',skyline:'SKYLINE'};
  const chIds=Object.keys(CHT);
  const nodesByKey={};DATA.chapters.forEach(c=>c.nodes.forEach(n=>{nodesByKey[n.id.replace(':','/')]=n;}));
  const titleOf=k=>{const n=nodesByKey[k];return n?n.title:k.split('/')[1];};
  const totalRuns=Object.values(S.perPolicy).reduce((a,p)=>a+p.runs,0);
  const totalEx=Object.values(S.perPolicy).reduce((a,p)=>a+p.exceptions.length,0);
  const totalViol=Object.values(S.perPolicy).reduce((a,p)=>a+p.violations.length,0);
  const totalAbort=Object.values(S.perPolicy).reduce((a,p)=>a+p.aborted,0);
  let html='<div class="sim-h">SIMULATOR · FLIGHT RECORD</div>'
    +'<p class="sim-sub">'+totalRuns.toLocaleString()+' complete biographies · '+S.policies.length+' pilot personalities · generated '+S.generated.slice(0,16).replace('T',' ')+' · '+(S.wallMs/1000).toFixed(0)+'s wall</p>'
    +'<div class="sim-cards">'
    +'<div class="sim-card"><b>'+totalRuns.toLocaleString()+'</b><span>biographies</span></div>'
    +'<div class="sim-card '+(totalEx?'bad':'good')+'"><b>'+totalEx+'</b><span>engine exceptions</span></div>'
    +'<div class="sim-card '+(totalAbort?'bad':'good')+'"><b>'+totalAbort+'</b><span>softlocks</span></div>'
    +'<div class="sim-card '+(totalViol?'bad':'good')+'"><b>'+totalViol+'</b><span>invariant violations</span></div>'
    +'<div class="sim-card"><b>'+S.coverage.visited+'/'+S.coverage.scenes+'</b><span>scenes reached</span></div>'
    +'</div>';
  if(totalEx||totalViol){
    html+='<div class="sim-h">FAILURES</div><table class="simtable"><tr><th>POLICY</th><th>SEED</th><th>WHAT</th></tr>';
    for(const [pol,P] of Object.entries(S.perPolicy))
      for(const e of P.exceptions.concat(P.violations))
        html+='<tr><td>'+pol+'</td><td class="num">'+e.seed+'</td><td class="sim-flag">'+e.msg+'</td></tr>';
    html+='</table>';
  }
  // Ending matrix per chapter: policies × endings
  for(const ch of chIds){
    const endIds=new Set();
    for(const P of Object.values(S.perPolicy))Object.keys(P.endings[ch]||{}).forEach(e=>endIds.add(e));
    const ends=[...endIds].sort();
    html+='<div class="sim-h">'+CHT[ch]+' · WHO GETS WHICH ENDING</div>'
      +'<table class="simtable"><tr><th>PILOT</th>'+ends.map(e=>'<th>'+e.replace(/^(h_|t_|s_)/,'')+'</th>').join('')+'</tr>';
    for(const [pol,P] of Object.entries(S.perPolicy)){
      const row=P.endings[ch]||{};const tot=Object.values(row).reduce((a,b)=>a+b,0)||1;
      html+='<tr><td>'+pol+'</td>'+ends.map(e=>{
        const v=row[e]||0;const pc=100*v/tot;
        return '<td class="num'+(v===0?' zero':pc>=40?' hot':'')+'">'+(v?pc.toFixed(0)+'%':'—')+'</td>';
      }).join('')+'</tr>';
    }
    const w=S.weeksToClose[ch];
    html+='</table><p class="sim-sub">weeks to close: p10 '+w.p10+' · median '+w.p50+' · p90 '+w.p90+'</p>';
    // stress band chart
    const band=S.bands[ch]||[];
    if(band.length>3){
      const W=1000,H=100,maxW=band[band.length-1].w||1;
      const x=v=>8+(W-16)*(v/maxW), y=v=>H-6-(H-16)*(v/100);
      let lo='',hi='',mid='';
      band.forEach((b,i)=>{const px=x(b.w);mid+=(i?'L':'M')+px.toFixed(1)+','+y(b.stress[1]).toFixed(1);lo+=(i?'L':'M')+px.toFixed(1)+','+y(b.stress[0]).toFixed(1);hi='L'+px.toFixed(1)+','+y(b.stress[2]).toFixed(1)+hi.replace(/^L/, i===0?'':'L');});
      let area='';band.forEach((b,i)=>{area+=(i?'L':'M')+x(b.w).toFixed(1)+','+y(b.stress[2]).toFixed(1);});
      for(let i=band.length-1;i>=0;i--)area+='L'+x(band[i].w).toFixed(1)+','+y(band[i].stress[0]).toFixed(1);
      html+='<div class="sim-chart"><h4>STRESS OVER THE CHAPTER · shaded = middle 80% of founders · line = median</h4>'
        +'<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none">'
        +'<path class="sim-band" d="'+area+'Z"/>'
        +'<path class="sim-mid" d="'+mid+'"/>'
        +'<text class="sim-axis" x="8" y="12">100</text><text class="sim-axis" x="8" y="'+(H-8)+'">0</text>'
        +'<text class="sim-axis" x="'+(W-70)+'" y="'+(H-8)+'">week '+maxW+'</text>'
        +'</svg></div>';
    }
  }
  // Coverage findings
  html+='<div class="sim-h">UNREACHED CONTENT</div>';
  if(S.coverage.unvisited.length){
    html+='<p class="sim-sub">Scenes no pilot reached in '+totalRuns.toLocaleString()+' lives — over-gated, orphaned, or reserved for humans.</p><table class="simtable"><tr><th>SCENE</th><th>TITLE</th><th>KIND</th></tr>'
      +S.coverage.unvisited.map(s=>'<tr><td>'+s.key+'</td><td>'+s.title+'</td><td>'+s.kind+'</td></tr>').join('')+'</table>';
  }else html+='<p class="sim-note">Every scene was reached. The graph breathes everywhere.</p>';
  if(S.coverage.neverTaken.length){
    html+='<p class="sim-sub" style="margin-top:14px">Choices never once taken (with observed gate pass rates):</p><table class="simtable"><tr><th>SCENE</th><th>CHOICE</th><th>GATED</th><th>GATE PASS</th></tr>'
      +S.coverage.neverTaken.map(c=>'<tr><td>'+titleOf(c.key)+'</td><td>'+c.label+'</td><td>'+(c.gated?'yes':'no')+'</td><td class="num">'+(c.passRate==null?'—':(100*c.passRate).toFixed(1)+'%')+'</td></tr>').join('')+'</table>';
  }
  if(S.coverage.hardGates.length){
    html+='<div class="sim-h">HARDEST GATES</div><p class="sim-sub">Requires-clauses that almost never open when tested. Intentional summits should live here; accidents should not.</p>'
      +'<table class="simtable"><tr><th>SCENE</th><th>CHOICE</th><th>PASS RATE</th><th>TESTED</th></tr>'
      +S.coverage.hardGates.map(g=>'<tr><td>'+titleOf(g.key)+'</td><td>'+g.label+'</td><td class="num">'+(100*g.passRate).toFixed(1)+'%</td><td class="num">'+g.evals.toLocaleString()+'</td></tr>').join('')+'</table>';
  }
  // Pilot table
  html+='<div class="sim-h">THE PILOTS</div><table class="simtable"><tr><th>PILOT</th><th>RUNS</th><th>FINAL SCORE p50</th><th>WEEKS p50</th><th>PANICS/RUN</th></tr>'
    +Object.entries(S.perPolicy).map(([pol,P])=>'<tr><td>'+pol+'</td><td class="num">'+P.runs.toLocaleString()+'</td><td class="num">'+P.score.p50+'</td><td class="num">'+P.epochs.p50+'</td><td class="num">'+P.panicsPerRun+'</td></tr>').join('')+'</table>';
  sp.innerHTML=html;
}

// ---- SCRIPT EDITOR — edit prose in the browser, PUBLISH ships it -------------
// Every [data-path] block maps to ONE unique TS string literal (DATA.lock /
// DATA.fileOf, built at generate time). PUBLISH opens a panel; PUSH LIVE posts
// the edits to /api/save (GitHub token lives server-side), which commits to
// main — then the panel follows the pipeline: checks must pass before deploy.
// Auth = the map passphrase from the gate (sessionStorage) — nothing to paste.
const edtoggle=document.getElementById('edtoggle'),edsave=document.getElementById('edsave');
const pubdrop=document.getElementById('pubdrop'),pdhead=document.getElementById('pdhead');
const publog=document.getElementById('publog'),pdgo=document.getElementById('pdgo');
let publishing=false;
const CE=(()=>{const d=document.createElement('div');try{d.contentEditable='plaintext-only';return 'plaintext-only';}catch(e){return 'true';}})();
const toLit=s=>s.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,'\\n');
const blockText=el=>el.innerText.replace(/\u00A0/g,' ').replace(/^\s+|\s+$/g,'');
function applyEditable(on){document.querySelectorAll('#scriptpane [data-path]').forEach(el=>{
  if(on)el.setAttribute('contenteditable',CE);else el.removeAttribute('contenteditable');});}
function refreshDirty(){const out={};let n=0;
  document.querySelectorAll('#scriptpane [data-path]').forEach(el=>{
    const p=el.dataset.path,t=blockText(el),d=t!==DATA.lock[p];
    el.classList.toggle('dirty',d);if(d){out[p]=t;n++;}});
  edsave.textContent=n?'PUBLISH ('+n+')':'PUBLISH';
  edsave.classList.toggle('has',n>0);
  if(edsave.classList.contains('busy'))edsave.insertAdjacentHTML('afterbegin','<span class="spin"></span>');
  pdgo.disabled=!n||publishing;
  if(!publishing)pdhead.textContent=n?(n+' edited block'+(n>1?'s':'')+' ready. Push to run the checks and go live.')
    :(document.body.hasAttribute('data-edit')?'Edit mode on — click any outlined block and type. Dim blocks are locked (their text repeats in source).':'No unpublished edits.');
  return out;}
edtoggle.addEventListener('click',()=>{
  const on=!document.body.hasAttribute('data-edit');
  if(on)document.body.setAttribute('data-edit','1');else document.body.removeAttribute('data-edit');
  edtoggle.classList.toggle('on',on);
  applyEditable(on);refreshDirty();});
document.getElementById('scriptpane').addEventListener('input',e=>{if(e.target.closest('[data-path]'))refreshDirty();});
edsave.addEventListener('click',()=>{refreshDirty();pubdrop.classList.toggle('open');});
document.addEventListener('click',e=>{if(!e.target.closest('.pubwrap'))pubdrop.classList.remove('open');});
function mapPass(){let p=sessionStorage.getItem('fate-map-pass');
  if(!p){p=prompt('Map passphrase (the one that unlocked this page):');
    if(p){p=p.trim();sessionStorage.setItem('fate-map-pass',p);}}
  return p;}
async function api(body){
  // Same host the map was unlocked on; the apex 308-redirects to www, and
  // redirects break CORS preflights.
  const base=(self.origin&&self.origin.indexOf('http')===0)?self.origin:'https://www.fate.cx';
  const res=await fetch(base+'/api/save',{method:'POST',
    headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const j=await res.json().catch(()=>({}));
  if(res.status===401){sessionStorage.removeItem('fate-map-pass');throw new Error('passphrase rejected — push again and re-enter it');}
  if(!res.ok)throw new Error(j.error||('HTTP '+res.status));
  return j;}
pdgo.addEventListener('click',async()=>{
  const dirty=refreshDirty();const n=Object.keys(dirty).length;
  if(!n||publishing)return;
  const pass=mapPass();if(!pass)return;
  publishing=true;pdgo.disabled=true;pdgo.textContent='PUBLISHING…';
  edsave.classList.add('busy');edsave.insertAdjacentHTML('afterbegin','<span class="spin"></span>');
  publog.innerHTML='';
  const step=(cls,msg)=>{const el=document.createElement('div');el.className='pl '+cls;el.textContent=msg;publog.appendChild(el);return el;};
  const set=(el,cls,msg)=>{el.className='pl '+cls;if(msg!=null)el.textContent=msg;};
  let s=step('run','Saving '+n+' block'+(n>1?'s':'')+' to the repo…');
  try{
    const edits=Object.keys(dirty).map(p=>({file:DATA.fileOf[p],from:toLit(DATA.lock[p]),to:toLit(dirty[p])}));
    const out=await api({pass:pass,action:'save',edits:edits});
    for(const p in dirty)DATA.lock[p]=dirty[p];
    set(s,'ok','Saved — commit '+out.sha.slice(0,7));
    s=step('run','Running checks — story graph, prose laws, art coverage, endings…');
    let fin='timeout';
    for(let i=0;i<90;i++){
      await new Promise(r=>setTimeout(r,10000));
      try{
        const run=await api({pass:pass,action:'status',sha:out.sha});
        if(!run.found)continue;
        if(run.status!=='completed'){set(s,'run','Checks '+run.status.split('_').join(' ')+'… (nothing ships unless every test passes)');continue;}
        fin=run.conclusion;break;
      }catch(e){}
    }
    if(fin==='success'){set(s,'ok','All checks passed');step('ok','LIVE on fate.cx');}
    else set(s,'err','Pipeline '+fin+' — the edit is saved in the repo but NOT live. Check github.com/'+DATA.repo+'/actions');
  }catch(err){set(s,'err',String(err&&err.message||err));}
  publishing=false;
  edsave.classList.remove('busy');
  pdgo.textContent='PUSH LIVE';
  refreshDirty();});
</script>
</body>
</html>`;

// ---- main -------------------------------------------------------------------
const chapters = ['hyperchute', 'teleport', 'skyline'].map(
  (id) => layoutChapter(id, CONTENT.chapters[id as keyof typeof CONTENT.chapters]),
)
const html = renderHtml(chapters)
// Bundled output may live anywhere; write relative to the repo root (npm script cwd).
const out = join(process.cwd(), 'map.html')
writeFileSync(out, html)
console.log(`wrote ${out} (${(html.length / 1024).toFixed(0)} KB, ${chapters.reduce((s, c) => s + c.nodes.length, 0)} nodes)`)
