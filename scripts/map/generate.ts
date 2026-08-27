/**
 * Storyline map generator. Walks CONTENT, lays out each chapter with dagre,
 * emits one self-contained map.html (inline JSON + CSS + JS, no runtime deps).
 *
 * Run: npm run map
 */
import dagre from 'dagre'
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

  // ---- dagre layout ------------------------------------------------------
  const g = new dagre.graphlib.Graph()
  g.setGraph({ rankdir: 'LR', nodesep: 34, ranksep: 78, marginx: 24, marginy: 24 })
  g.setDefaultEdgeLabel(() => ({}))
  for (const n of nodesRaw) {
    const { w, h } = nodeSize(n)
    g.setNode(n.id, { width: w, height: h })
  }
  for (const e of edgeMap.values()) g.setEdge(e.from, e.to)

  // Insolvency is reachable only via the $0 bank node, never as a dealt scene.
  dagre.layout(g)

  const nodes: MapNode[] = nodesRaw.map((n) => {
    const pos = g.node(n.id)
    const { w, h } = nodeSize(n)
    return { ...n, x: Math.round(pos.x - w / 2), y: Math.round(pos.y - h / 2), w, h }
  })
  const gi = g.graph()
  const edges = [...edgeMap.values()]

  let choiceCount = 0
  for (const s of def.scenes) choiceCount += s.choices.length

  return {
    id,
    title: def.title,
    tagline: def.tagline,
    stats: { scenes: def.scenes.length, choices: choiceCount, endings: def.endings.length },
    nodes,
    edges,
    width: gi.width ?? 800,
    height: gi.height ?? 400,
  }
}

// ---- HTML shell -------------------------------------------------------------

const esc = (s: string): string => s.replace(/</g, '\\u003c')
const hesc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

// Build-time literal index: every editable block is mapped to the one content
// file that contains its exact TS literal. Blocks whose literal is not unique
// across src/content render read-only in the editor.
import { readFileSync, readdirSync, statSync } from 'node:fs'

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
.legend{display:flex;gap:16px;padding:7px 20px;border-bottom:1px solid var(--line);font-family:var(--mono);font-size:11px;color:var(--dim);flex-wrap:wrap;background:var(--panel)}
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
.edbar{display:flex;gap:6px;align-items:center}
.edbar .tab.on{color:var(--accent);border-color:var(--accent);font-weight:600}
#edsave:disabled{opacity:.35;cursor:default}
.edstatus{font-family:var(--mono);font-size:11px;color:var(--dim);max-width:420px}
.edstatus.err{color:var(--disgrace)}
.edstatus.ok{color:var(--triumph)}
body[data-edit] .scriptpane [data-path]{outline:1px dashed var(--line);outline-offset:3px;border-radius:2px;cursor:text}
body[data-edit] .scriptpane [data-path]:focus{outline:1.5px solid var(--accent)}
body[data-edit] .scriptpane [data-path].dirty{background:var(--accent-soft)}
body[data-edit] .scriptpane .sb-t:not([data-path]),body[data-edit] .scriptpane .s-cl:not([data-path]){opacity:.45}
@media (prefers-reduced-motion:no-preference){.node{transition:box-shadow .12s,opacity .15s}.drawer{transition:transform .18s ease}}
</style>
</head>
<body>
<header class="topbar">
  <div class="masthead">FATE<span>·</span>STORYLINE MAP</div>
  <nav class="tabs" id="tabs"></nav>
  <div class="search"><input id="q" type="search" placeholder="search scenes…" aria-label="Search scenes"></div>
  <div class="edbar" id="edbar" style="display:none">
    <button class="tab" id="edtoggle">EDIT</button>
    <button class="tab" id="edsave" disabled>SAVE</button>
    <span class="edstatus" id="edstatus"></span>
  </div>
</header>
<div class="legend">
  <span class="lg"><span class="sw"></span>authored sequence</span>
  <span class="lg"><span class="sw deal"></span>world-dealt pool</span>
  <span class="lg"><span class="sw ruin"></span>$0 insolvency route</span>
  <span class="lg"><span class="dotk"></span>scene&nbsp;&nbsp;<span class="dotk" style="border-color:#B98A1F"></span>ending</span>
  <span class="lg">dashed border = random-pool scene · chip = speaker/fuse</span>
</div>
<main class="stage" id="stage"><div class="scriptpane" id="scriptpane" style="display:none"></div></main>
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
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','edges');
  // Mount FIRST so edge-path lookups can find nodes in the document.
  lane.appendChild(canvas);stage.appendChild(lane);
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
  const x1=n1.x+n1.w,y1=n1.y+n1.h/2,x2=n2.x,y2=n2.y+n2.h/2;const dx=Math.max(36,(x2-x1)*0.45);
  return 'M'+x1+','+y1+' C'+(x1+dx)+','+y1+' '+(x2-dx)+','+y2+' '+x2+','+y2;}
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
    const steps=ch.nodes.filter(x=>x.kind==='scene'&&lit.has(x.id)).sort((a,b)=>a.x-b.x);
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
tabs.addEventListener('click',e=>{const b=e.target.closest('.tab');if(!b)return;
  currentTab=b.dataset.ch;
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t===b));
  const scriptOn=currentTab==='script';
  const pane=document.getElementById('scriptpane');
  pane.style.display=scriptOn?'':'none';
  document.getElementById('edbar').style.display=scriptOn?'':'none';
  if(scriptOn&&!pane.dataset.built){pane.innerHTML=DATA.script;pane.dataset.built='1';}
  document.querySelectorAll('.lane').forEach(l=>{l.style.display=(!scriptOn&&(currentTab==='all'||l.dataset.ch===currentTab))?'':'none';});
  clearFocus();drawer.classList.remove('open');});
{const all=document.createElement('button');all.className='tab on';all.dataset.ch='all';all.textContent='ALL CHAPTERS';tabs.prepend(all);
 const sc=document.createElement('button');sc.className='tab';sc.dataset.ch='script';sc.textContent='SCRIPT';tabs.appendChild(sc);}
document.getElementById('dclose').addEventListener('click',()=>{drawer.classList.remove('open');clearFocus();});
stage.addEventListener('click',e=>{if(e.target===stage||e.target.classList.contains('canvas')){drawer.classList.remove('open');clearFocus();}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){drawer.classList.remove('open');clearFocus();}});
q.addEventListener('input',()=>{const v=q.value.trim().toLowerCase();document.querySelectorAll('.node').forEach(el=>{const n=el._node;if(!n)return;const hit=!v||(n.title+' '+(n.prose||'')).toLowerCase().includes(v);el.classList.toggle('q-dim',!hit);});});

// ---- SCRIPT EDITOR — edit prose in the browser, SAVE ships it ---------------
// Every [data-path] block maps to ONE unique TS string literal (DATA.lock /
// DATA.fileOf, built at generate time). SAVE posts the edits to /api/save,
// which holds the GitHub token server-side and pushes one commit to main;
// the ship workflow then tests + deploys. Auth = the map passphrase you
// already entered at the gate (sessionStorage) — nothing else to paste.
const edtoggle=document.getElementById('edtoggle'),edsave=document.getElementById('edsave'),edstatus=document.getElementById('edstatus');
const CE=(()=>{const d=document.createElement('div');try{d.contentEditable='plaintext-only';return 'plaintext-only';}catch(e){return 'true';}})();
const toLit=s=>s.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,'\\n');
const blockText=el=>el.innerText.replace(/\u00A0/g,' ').replace(/^\s+|\s+$/g,'');
function setStatus(msg,cls){edstatus.textContent=msg||'';edstatus.className='edstatus'+(cls?' '+cls:'');}
function refreshDirty(){const out={};let n=0;
  document.querySelectorAll('#scriptpane [data-path]').forEach(el=>{
    const p=el.dataset.path,t=blockText(el),d=t!==DATA.lock[p];
    el.classList.toggle('dirty',d);if(d){out[p]=t;n++;}});
  edsave.disabled=!n;edsave.textContent=n?'SAVE ('+n+')':'SAVE';return out;}
edtoggle.addEventListener('click',()=>{
  const on=!document.body.hasAttribute('data-edit');
  if(on)document.body.setAttribute('data-edit','1');else document.body.removeAttribute('data-edit');
  edtoggle.classList.toggle('on',on);
  document.querySelectorAll('#scriptpane [data-path]').forEach(el=>{
    if(on)el.setAttribute('contenteditable',CE);else el.removeAttribute('contenteditable');});
  setStatus(on?'edit mode — click any outlined block and type; dim blocks are locked (text not unique in source)':'');});
document.getElementById('scriptpane').addEventListener('input',e=>{if(e.target.closest('[data-path]'))refreshDirty();});
function mapPass(){let p=sessionStorage.getItem('fate-map-pass');
  if(!p){p=prompt('Map passphrase (the one that unlocked this page):');
    if(p){p=p.trim();sessionStorage.setItem('fate-map-pass',p);}}
  return p;}
async function api(body){
  const res=await fetch('https://fate.cx/api/save',{method:'POST',
    headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const j=await res.json().catch(()=>({}));
  if(res.status===401){sessionStorage.removeItem('fate-map-pass');throw new Error('passphrase rejected — click SAVE and enter it again');}
  if(!res.ok)throw new Error(j.error||('HTTP '+res.status));
  return j;}
edsave.addEventListener('click',async()=>{
  const dirty=refreshDirty();const n=Object.keys(dirty).length;
  if(!n)return;
  const pass=mapPass();if(!pass)return;
  edsave.disabled=true;
  try{
    setStatus('saving…');
    const edits=Object.keys(dirty).map(p=>({file:DATA.fileOf[p],from:toLit(DATA.lock[p]),to:toLit(dirty[p])}));
    const out=await api({pass:pass,action:'save',edits:edits});
    for(const p in dirty)DATA.lock[p]=dirty[p];
    refreshDirty();
    setStatus('saved '+out.sha.slice(0,7)+' — tests + deploy running…','ok');
    pollShip(out.sha,pass);
  }catch(err){setStatus(String(err&&err.message||err),'err');refreshDirty();}});
async function pollShip(sha,pass){
  for(let i=0;i<90;i++){
    await new Promise(r=>setTimeout(r,10000));
    try{
      const run=await api({pass:pass,action:'status',sha:sha});
      if(!run.found){setStatus(sha.slice(0,7)+' saved — waiting for pipeline to start…','ok');continue;}
      if(run.status!=='completed'){setStatus(sha.slice(0,7)+' — pipeline '+run.status.split('_').join(' ')+'…','ok');continue;}
      if(run.conclusion==='success')setStatus(sha.slice(0,7)+' — tests passed, LIVE on fate.cx ✓','ok');
      else setStatus(sha.slice(0,7)+' — pipeline '+run.conclusion+': saved but NOT live. Check github.com/'+DATA.repo+'/actions','err');
      return;
    }catch(e){}
  }
}
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
