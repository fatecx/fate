/**
 * Graph completeness is CI — AGENTS.md law 3. Broken branches fail here,
 * before anything merges.
 */
import { describe, expect, it } from 'vitest'
import { CONTENT } from '../src/content/world'
import type { ChapterDef, SceneDef } from '../src/content/schema'
import { COMPANY_ORDER } from '../src/engine/types'

const ALL_SCENES: { chapter: string; scene: SceneDef }[] = COMPANY_ORDER.flatMap((id) =>
  CONTENT.chapters[id].scenes.map((s) => ({ chapter: id, scene: s })),
)

function effectSceneTargets(effs: readonly { e: string; scene?: string }[]): string[] {
  return effs.filter((e) => 'scene' in e && typeof e.scene === 'string').map((e) => e.scene as string)
}

describe('content integrity', () => {
  it('scene ids are globally unique', () => {
    const ids = ALL_SCENES.map((x) => x.scene.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every chapter has an entry, an insolvency scene, and endings including `bankrupt`', () => {
    for (const id of COMPANY_ORDER) {
      const ch = CONTENT.chapters[id]
      const sceneIds = new Set(ch.scenes.map((s) => s.id))
      expect(sceneIds.has(ch.entry), `${id}: entry missing`).toBe(true)
      expect(sceneIds.has(ch.insolvency), `${id}: insolvency missing`).toBe(true)
      expect(ch.endings.length).toBeGreaterThan(0)
      expect(new Set(ch.endings.map((e) => e.id)).size).toBe(ch.endings.length)
      expect(ch.endings.some((e) => e.id === 'bankrupt'), `${id}: no bankrupt ending`).toBe(true)
    }
  })

  it('insolvency scenes always keep one unconditional way out', () => {
    for (const id of COMPANY_ORDER) {
      const ch = CONTENT.chapters[id]
      const insolvency = ch.scenes.find((s) => s.id === ch.insolvency)
      expect(insolvency, `${id}: insolvency undefined`).toBeDefined()
      const open = insolvency!.choices.some((c) => !c.requires)
      expect(open, `${id}: insolvency can deadlock — needs one choice without requires`).toBe(true)
    }
  })

  it('every scene has between 1 and 4 choices with nonempty labels', () => {
    for (const { chapter, scene } of ALL_SCENES) {
      expect(scene.choices.length, `${chapter}/${scene.id}`).toBeGreaterThanOrEqual(1)
      expect(scene.choices.length, `${chapter}/${scene.id}`).toBeLessThanOrEqual(4)
      for (const c of scene.choices) expect(c.label.trim().length).toBeGreaterThan(0)
    }
  })

  it('no dangling references: gotos, enqueues, fuses, speakers, characters, endings', () => {
    for (const id of COMPANY_ORDER) {
      const ch: ChapterDef = CONTENT.chapters[id]
      const sceneIds = new Set(ch.scenes.map((s) => s.id))
      const endingIds = new Set(ch.endings.map((e) => e.id))

      for (const s of ch.scenes) {
        if (s.speaker) expect(CONTENT.characters[s.speaker], `${id}/${s.id} speaker`).toBeDefined()
        for (const c of s.choices) {
          if (c.goto) expect(sceneIds.has(c.goto), `${id}/${s.id} -> ${c.goto}`).toBe(true)
          for (const target of effectSceneTargets(c.effects)) {
            expect(sceneIds.has(target), `${id}/${s.id} enqueue/fuse ${target}`).toBe(true)
          }
          for (const fx of c.effects) {
            if ('ending' in fx) {
              expect(endingIds.has(fx.ending), `${id}/${s.id} ending ${fx.ending}`).toBe(true)
            }
            if (fx.e === 'rel' || fx.e === 'meet') {
              expect(CONTENT.characters[fx.who], `${id}/${s.id} character ${fx.who}`).toBeDefined()
            }
          }
        }
      }
    }
  })

  it('every scene is reachable (entry/insolvency/goto/enqueue edges + deal-eligible roots)', () => {
    for (const id of COMPANY_ORDER) {
      const ch = CONTENT.chapters[id]
      const byId = new Map(ch.scenes.map((s) => [s.id, s]))
      const reachable = new Set<string>([ch.entry, ch.insolvency])
      // Scenes with a `when` can arrive via the dealer.
      for (const s of ch.scenes) if (s.when || s.priority) reachable.add(s.id)

      let grew = true
      while (grew) {
        grew = false
        for (const s of ch.scenes) {
          if (!reachable.has(s.id)) continue
          for (const c of s.choices) {
            const targets = [...effectSceneTargets(c.effects)]
            if (c.goto) targets.push(c.goto)
            for (const t of targets) {
              if (!reachable.has(t)) {
                reachable.add(t)
                grew = true
              }
            }
          }
        }
      }

      const orphans = ch.scenes.filter((s) => !reachable.has(s.id)).map((s) => s.id)
      expect(orphans, `${id}: unreachable scenes`).toEqual([])
      void byId
    }
  })
})
