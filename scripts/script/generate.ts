/**
 * Script exporter — walks CONTENT in authored order and writes the entire
 * player-facing text of the game as ONE editable document (script.md), plus a
 * lock file (script.lock.json) recording what every block said at export time.
 *
 * Edit script.md freely (never touch the <!-- fate:... --> anchor lines),
 * then write the changes back into the typed content files with:
 *
 *   npm run script          # export  (content -> script.md)
 *   npm run script:apply    # import  (script.md -> src/content/**)
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { CONTENT } from '../../src/content/world'
import { FILLERS, BLUR_FILLERS } from '../../src/content/fillers'

const blocks: { path: string; text: string }[] = []
const md: string[] = []

function block(path: string, text: string | undefined): void {
  if (text === undefined) return
  blocks.push({ path, text })
  md.push(`<!-- fate:${path} -->`)
  md.push(text)
  md.push('')
}

md.push('# FATE — THE FULL SCRIPT')
md.push('')
md.push('> Every player-facing line in the game, in play order. Edit any text **below** its anchor comment;')
md.push('> never edit or delete the `<!-- fate:... -->` anchor lines or the headings.')
md.push('> Blank lines inside a block become paragraph breaks in the game.')
md.push('> Write changes back into the content files with `npm run script:apply` (then `npm test`).')
md.push('')

for (const ch of Object.values(CONTENT.chapters)) {
  md.push(`\n---\n\n# ${ch.title}, INC. — ${ch.tagline}`)
  md.push('')

  if (ch.prologue?.length) {
    md.push(`## ${ch.title} · OPENING FILM`)
    md.push('')
    ch.prologue.forEach((p, i) => {
      md.push(`### film screen ${i + 1}${p.title ? ` — ${p.title}` : ''}`)
      block(`${ch.id}/prologue[${i}].prose`, p.prose)
    })
  }

  for (const s of ch.scenes) {
    const kind = s.kind ?? 'scene'
    const gates = s.when ? ' · gated' : ''
    md.push(`## ${s.id} · ${s.title} [${kind}${gates}]${s.speaker ? ` — speaker: ${CONTENT.characters[s.speaker]?.name ?? s.speaker}` : ''}`)
    md.push('')
    block(`${ch.id}/${s.id}.leadIn`, s.leadIn)
    block(`${ch.id}/${s.id}.prose`, s.prose)
    s.screens?.forEach((p, i) => {
      md.push(`### ${s.id} · film screen ${i + 1}`)
      block(`${ch.id}/${s.id}.screen[${i}].prose`, p.prose)
    })
    s.vary?.forEach((v, i) => {
      md.push(`### ${s.id} · variant ${i + 1} (plays when its condition is true)`)
      block(`${ch.id}/${s.id}.vary[${i}].leadIn`, v.leadIn)
      block(`${ch.id}/${s.id}.vary[${i}].prose`, v.prose)
    })
    s.choices.forEach((c, i) => {
      const arrow = c.goto ? ` → ${c.goto}` : ''
      md.push(`### ${s.id} · choice ${i + 1}${arrow}`)
      block(`${ch.id}/${s.id}.choice[${i}].label`, c.label)
      block(`${ch.id}/${s.id}.choice[${i}].result`, c.result)
    })
  }

  md.push(`## ${ch.title} · ENDINGS`)
  md.push('')
  for (const e of ch.endings) {
    md.push(`### ending: ${e.id} — ${e.title} [${e.kind}]`)
    block(`${ch.id}/end.${e.id}.prose`, e.prose)
    e.screens?.forEach((p, i) => {
      md.push(`#### ending ${e.id} · film screen ${i + 1}`)
      block(`${ch.id}/end.${e.id}.screen[${i}].prose`, p.prose)
    })
    if (e.interlude) {
      md.push(`#### ending ${e.id} · interlude (the years after)`)
      block(`${ch.id}/end.${e.id}.interlude.prose`, e.interlude.prose)
    }
  }
}

md.push('\n---\n\n# FILLERS — the quiet weeks')
md.push('')
for (const f of [...FILLERS, ...BLUR_FILLERS]) {
  md.push(`### filler: ${f.id}`)
  block(`filler/${f.id}.text`, f.text)
}

const root = process.cwd()
writeFileSync(join(root, 'script.md'), md.join('\n'))
writeFileSync(
  join(root, 'script.lock.json'),
  JSON.stringify(Object.fromEntries(blocks.map((b) => [b.path, b.text])), null, 1),
)
const words = blocks.reduce((a, b) => a + b.text.split(/\s+/).length, 0)
console.log(`wrote script.md (${blocks.length} blocks, ~${words.toLocaleString()} words) + script.lock.json`)
