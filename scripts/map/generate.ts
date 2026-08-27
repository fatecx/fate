/**
 * Storyline map generator. Walks CONTENT, lays out each chapter with dagre,
 * emits one self-contained map.html (inline JSON + CSS + JS, no runtime deps).
 *
 * Run: npm run map
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { CONTENT } from '../../src/content/world'
import type { ChapterDef } from '../../src/content/schema'
import { makeFmt } from './format'

interface MapNode {
  id: string
  x: number
  y: number
  w: number
  h: number
  kind: 'scene' | 'ending' | 'deck' | 'bank'
  title: string
  speaker?: string
  prose?: string
  endKind?: string
  priority?: boolean
  fuse?: boolean
  choices?: { label: string; requires?: string; effects: string[]; result?: string; targets: string[] }[]
}

interface MapEdge {
  from: string
  to: string
  cls: '' | 'deal' | 'ruin'
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
  if (n.kind === 'deck') return { w: 96, h: 40 }
  if (n.kind === 'bank') return { w: 96, h: 40 }
  const lines = Math.min(3, Math.ceil((n.prose?.length ?? 0) / 210))
  return { w: 208, h: 64 + lines * 15 }
}

function layoutChapter(id: string, def: ChapterDef): MapChapter {
  const fmt = makeFmt(CONTENT.characters)
  // Namespace ids per chapter so focus-mode traversal never crosses chapters.
  const pid = (x: string): string => `${id}:${x}`

  const nodesRaw: Omit<MapNode, 'x' | 'y'>[] = []
  const byId = new Map<string, Omit<MapNode, 'x' | 'y'>>()

  const deckId = pid('_deck')
  const deck: Omit<MapNode, 'x' | 'y'> = {
    id: deckId,
    kind: 'deck',
    title: 'THE WORLD',
    prose: 'Deals scenes into play as weeks pass.',
  }
  const bank: Omit<MapNode, 'x' | 'y'> = {
    id: pid('_bank'),
    kind: 'bank',
    title: '$0',
    prose: 'Treasury hits zero — the insolvency scene forces a rescue or the end.',
  }
  nodesRaw.push(deck, bank)
  byId.set(deckId, deck)
  byId.set(pid('_bank'), bank)

  for (const s of def.scenes) {
    const n: Omit<MapNode, 'x' | 'y'> = {
      id: pid(s.id),
      kind: 'scene',
      title: s.title,
      speaker: s.speaker ? CONTENT.characters[s.speaker]?.name : undefined,
      prose: s.prose,
      priority: s.priority === true,
      fuse: s.fuseEpochs !== undefined,
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

  // ---- edges -------------------------------------------------------------
  const edgeMap = new Map<string, MapEdge>()
  const addEdge = (from: string, to: string, cls: MapEdge['cls'], label?: string): void => {
    if (!byId.has(to)) return
    const key = `${from}|${to}|${cls}`
    if (!edgeMap.has(key)) edgeMap.set(key, { from, to, cls, label })
  }

  // Deal pool: dashed edges from THE WORLD to every scene carrying a `when`.
  for (const s of def.scenes) {
    if (s.when) addEdge(deckId, pid(s.id), 'deal')
  }
  addEdge(pid('_bank'), pid(def.insolvency), 'ruin', '$0')
  addEdge(deckId, pid(def.burnout), 'ruin', '100 stress')

  for (const s of def.scenes) {
    for (const c of s.choices) {
      if (c.goto) addEdge(pid(s.id), pid(c.goto), '')
      for (const fx of c.effects) {
        if ('scene' in fx && typeof fx.scene === 'string') addEdge(pid(s.id), pid(fx.scene), '')
        if ('ending' in fx) addEdge(pid(s.id), pid(`end:${fx.ending}`), '')
      }
    }
  }

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
  // Feeders (pool scenes, the deck, the bank): unranked nodes that fire into
  // the ranked story land just above their earliest target; anything they
  // lead to settles below. A few passes catch chains.
  for (let pass = 0; pass < 4; pass++) {
    let moved = false
    for (const n of nodesRaw) {
      if (rank.has(n.id)) continue
      const outs = story.filter((e) => e.from === n.id && rank.has(e.to)).map((e) => rank.get(e.to)!)
      if (outs.length) {
        rank.set(n.id, Math.max(0, Math.min(...outs) - 1))
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
        let cx = 24 + Math.max(0, (COLW - 48 - totalW) / 2)
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
.edge.hl{stroke:var(--accent);stroke-opacity:1;stroke-width:2}
.edge.dimmed{stroke-opacity:.05}
.node{position:absolute;background:var(--panel);border:1.5px solid var(--ink);border-radius:4px;padding:9px 11px;cursor:pointer;transition:box-shadow .12s, opacity .15s}
.node:hover{box-shadow:0 2px 0 0 var(--ink)}
.node.pool{border-style:dashed;border-color:var(--dim)}
.node.deck,.node.bank{border-radius:999px;text-align:center;font-family:var(--mono);font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;color:var(--dim);border-color:var(--dim)}
.node.bank{color:#9C3B2E;border-color:#9C3B2E}
.ntitle{font-family:var(--mono);font-weight:600;font-size:12px;letter-spacing:.02em;line-height:1.35}
.ngist{color:var(--dim);font-size:11px;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.chiprow{display:flex;gap:5px;margin-top:5px;flex-wrap:wrap}
.chip{font-family:var(--mono);font-size:9px;letter-spacing:.06em;padding:1px 6px;border:1px solid var(--line);border-radius:99px;color:var(--dim)}
.chip.spk{color:var(--accent);border-color:var(--accent)}
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
@media (prefers-reduced-motion:no-preference){.node{transition:box-shadow .12s,opacity .15s}.drawer{transition:transform .18s ease}}
</style>
</head>
<body>
<header class="topbar">
  <div class="masthead">FATE<span>·</span>STORYLINE MAP</div>
  <nav class="tabs" id="pages">
    <button class="tab pg on" data-page="map">MAP</button>
    <button class="tab pg" data-page="art">ART</button>
    <button class="tab pg" data-page="script">SCRIPT</button>
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
    <span class="lg"><span class="sw"></span>authored sequence</span>
    <span class="lg"><span class="sw deal"></span>world-dealt pool</span>
    <span class="lg"><span class="sw ruin"></span>$0 insolvency route</span>
    <span class="lg"><span class="dotk"></span>scene&nbsp;&nbsp;<span class="dotk" style="border-color:#B98A1F"></span>ending</span>
    <span class="lg">dashed border = random-pool · chip = speaker/fuse</span>
  </div>
</div>
<main class="stage" id="stage"><div class="scriptpane" id="scriptpane" style="display:none"></div><div class="artpane" id="artpane" style="display:none">
  <aside class="artside" id="artside"></aside>
  <div class="artmain">
    <nav class="tabs artchips" id="artchips"></nav>
    <div class="artgrid" id="artgrid"></div>
  </div>
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
  ch.nodes.forEach(n=>{const el=document.createElement('div');el.className='node '+n.kind+(n.kind==='scene'&&!n.priority?' pool':'')+(n.endKind?' k-'+n.endKind:'');el.dataset.id=n.id;el.style.left=n.x+'px';el.style.top=n.y+'px';el.style.width=n.w+'px';el.style.minHeight=n.h+'px';
    let inner='<div class="ntitle">'+n.title+'</div>';
    if(n.kind==='scene'&&n.prose)inner+='<div class="ngist">'+n.prose.slice(0,150)+'…</div>';
    const chips=[];if(n.speaker)chips.push('<span class="chip spk">'+n.speaker+'</span>');if(n.fuse)chips.push('<span class="chip">⏱ FUSE</span>');
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
  if(n.prose)html+='<div class="dspeaker">'+(n.speaker?n.speaker+' — ':'')+(n.kind==='ending'?'':'')+'</div><p class="dprose">'+n.prose+'</p>';
  if(n.choices&&n.choices.length){html+='<div class="dchoices">';
    n.choices.forEach(c=>{const jump=c.targets.length>0;const tid=jump?c.targets[0]:null;
      html+='<div class="choice'+(jump?' jump':'')+'"'+(tid?' data-tid="'+tid+'"':'')+'>'
        +'<div class="clabel">'+c.label+'</div>'
        +(c.requires?'<div class="creq">requires '+c.requires+'</div>':'')
        +(c.effects.length?'<div class="ceffects">'+c.effects.map(x=>'<span>'+x+'</span>').join('')+'</div>':'')
        +(c.result?'<div class="cresult">'+c.result+'</div>':'')
        +(jump?'<div class="ctargets">→ '+c.targets.map(t=>{const tn=DATA.chapters.flatMap(c=>c.nodes).find(nn=>nn.id===t);return tn?tn.title:t}).join(', ')+'</div>':'')
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
        const vias=(s.choices||[]).filter(c=>c.targets.some(t=>lit.has(t)));
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
// PAGES (header) — MAP, SCRIPT and ART are different rooms, not filters.
document.getElementById('pages').addEventListener('click',e=>{const b=e.target.closest('.pg');if(!b)return;
  const page=b.dataset.page,scriptOn=page==='script',artOn=page==='art',mapOn=page==='map';
  document.querySelectorAll('.pg').forEach(t=>t.classList.toggle('on',t===b));
  const pane=document.getElementById('scriptpane');
  pane.style.display=scriptOn?'':'none';
  if(scriptOn&&!pane.dataset.built){pane.innerHTML=DATA.script;pane.dataset.built='1';
    if(document.body.hasAttribute('data-edit'))applyEditable(true);}
  const ap=document.getElementById('artpane');
  ap.style.display=artOn?'':'none';
  if(artOn&&!ap.dataset.built){buildArt();ap.dataset.built='1';}
  document.getElementById('edbar').style.display=scriptOn?'':'none';
  document.getElementById('subbar').style.display=mapOn?'':'none';
  document.querySelector('.search').style.display=scriptOn?'none':'';
  q.placeholder=artOn?'search art…':'search scenes…';
  document.querySelector('.hint').style.display=mapOn?'':'none';
  document.querySelectorAll('.lane').forEach(l=>{l.style.display=(mapOn&&(currentTab==='all'||l.dataset.ch===currentTab))?'':'none';});
  clearFocus();drawer.classList.remove('open');});
document.getElementById('dclose').addEventListener('click',()=>{drawer.classList.remove('open');clearFocus();});
stage.addEventListener('click',e=>{if(e.target===stage||e.target.classList.contains('canvas')){drawer.classList.remove('open');clearFocus();}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){drawer.classList.remove('open');document.getElementById('pubdrop').classList.remove('open');document.getElementById('lightbox').classList.remove('open');clearFocus();}});
q.addEventListener('input',()=>{const v=q.value.trim().toLowerCase();document.querySelectorAll('.node').forEach(el=>{const n=el._node;if(!n)return;const hit=!v||(n.title+' '+(n.prose||'')).toLowerCase().includes(v);el.classList.toggle('q-dim',!hit);});
  if(document.getElementById('artpane').dataset.built)applyArtFilter();});

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
