/**
 * Script applier — reads edited script.md, diffs every block against
 * script.lock.json, and writes changed text back into the typed content files
 * by exact-literal replacement.
 *
 * Safety model:
 *   - a block only applies when its OLD text (from the lock) appears exactly
 *     once across src/content — ambiguous or missing literals are reported
 *     and skipped, never guessed.
 *   - after applying, run `npm test` (prose gates + graph + economy) before
 *     shipping. The applier refuses nothing else — the tests are the law.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function contentFiles(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...contentFiles(p))
    else if (name.endsWith('.ts')) out.push(p)
  }
  return out
}

/** Prose text -> the exact single-quoted TS literal body used in content files. */
function toLiteral(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')
}

// ---- parse script.md ---------------------------------------------------------
const mdSrc = readFileSync(join(root, 'script.md'), 'utf8')
const lock: Record<string, string> = JSON.parse(readFileSync(join(root, 'script.lock.json'), 'utf8'))

const edited: Record<string, string> = {}
const anchorRe = /^<!-- fate:(.+?) -->$/
const lines = mdSrc.split('\n')
for (let i = 0; i < lines.length; i++) {
  const m = anchorRe.exec(lines[i])
  if (!m) continue
  const buf: string[] = []
  let j = i + 1
  for (; j < lines.length; j++) {
    if (anchorRe.test(lines[j]) || /^#{1,4} /.test(lines[j]) || /^---$/.test(lines[j])) break
    buf.push(lines[j])
  }
  edited[m[1]] = buf.join('\n').trim()
  i = j - 1
}

// ---- diff + apply --------------------------------------------------------------
const files = contentFiles(join(root, 'src', 'content'))
const sources = new Map(files.map((f) => [f, readFileSync(f, 'utf8')]))

let applied = 0
const skipped: string[] = []
const missing: string[] = []

for (const [path, oldText] of Object.entries(lock)) {
  const newText = edited[path]
  if (newText === undefined) {
    missing.push(`${path} (anchor deleted from script.md)`)
    continue
  }
  if (newText === oldText) continue
  if (!newText) {
    skipped.push(`${path} (edited to empty — refusing; delete text in the TS file directly if intended)`)
    continue
  }

  const oldLit = toLiteral(oldText)
  const hits: { file: string; idx: number }[] = []
  for (const [file, src] of sources) {
    let at = src.indexOf(oldLit)
    while (at !== -1) {
      hits.push({ file, idx: at })
      at = src.indexOf(oldLit, at + 1)
    }
  }
  if (hits.length === 0) {
    skipped.push(`${path} (original text not found — lock is stale, rerun npm run script)`)
    continue
  }
  if (hits.length > 1) {
    skipped.push(`${path} (text appears ${hits.length}x in content — edit the TS file directly)`)
    continue
  }
  const { file, idx } = hits[0]
  const src = sources.get(file)!
  sources.set(file, src.slice(0, idx) + toLiteral(newText) + src.slice(idx + oldLit.length))
  applied++
}

for (const [file, src] of sources) {
  if (src !== readFileSync(file, 'utf8')) writeFileSync(file, src)
}

console.log(`applied ${applied} edited block(s)`)
if (skipped.length) console.log(`\nSKIPPED (${skipped.length}):\n  ` + skipped.join('\n  '))
if (missing.length) console.log(`\nMISSING (${missing.length}):\n  ` + missing.join('\n  '))
if (applied) console.log('\nNow run: npm test   (prose gates must stay green)\nThen rerun: npm run script   (refresh script.md + lock to the new truth)')
