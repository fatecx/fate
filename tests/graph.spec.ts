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

  it('every chapter has an entry, an insolvency scene, a burnout scene, and endings including `bankrupt`', () => {
    for (const id of COMPANY_ORDER) {
      const ch = CONTENT.chapters[id]
      const sceneIds = new Set(ch.scenes.map((s) => s.id))
      expect(sceneIds.has(ch.entry), `${id}: entry missing`).toBe(true)
      expect(sceneIds.has(ch.insolvency), `${id}: insolvency missing`).toBe(true)
      expect(sceneIds.has(ch.burnout), `${id}: burnout missing`).toBe(true)
      expect(ch.endings.length).toBeGreaterThan(0)
      expect(new Set(ch.endings.map((e) => e.id)).size).toBe(ch.endings.length)
      expect(ch.endings.some((e) => e.id === 'bankrupt'), `${id}: no bankrupt ending`).toBe(true)
    }
  })

  it('insolvency and burnout scenes always keep one unconditional way out', () => {
    for (const id of COMPANY_ORDER) {
      const ch = CONTENT.chapters[id]
      for (const sceneId of [ch.insolvency, ch.burnout]) {
        const scene = ch.scenes.find((s) => s.id === sceneId)
        expect(scene, `${id}/${sceneId}: undefined`).toBeDefined()
        const open = scene!.choices.some((c) => !c.requires)
        expect(open, `${id}/${sceneId}: can deadlock — needs one choice without requires`).toBe(true)
      }
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
      const reachable = new Set<string>([ch.entry, ch.insolvency, ch.burnout])
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

  it('bridges are single-exit and unconditional — pure connective tissue', () => {
    for (const { chapter, scene } of ALL_SCENES) {
      if (scene.kind !== 'bridge') continue
      expect(scene.choices.length, `${chapter}/${scene.id}: bridges carry exactly one choice`).toBe(1)
      expect(scene.choices[0].requires, `${chapter}/${scene.id}: bridge exit must be unconditional`).toBeUndefined()
      expect(scene.prose.trim().length, `${chapter}/${scene.id}: bridge needs real prose`).toBeGreaterThan(120)
    }
  })

  it('every dealt scene arrives with a leadIn — no cold teleports (authored chapters)', () => {
    for (const chId of ['hyperchute', 'teleport'] as const) {
      const ch = CONTENT.chapters[chId]
      for (const s of ch.scenes) {
        const dealt = (s.when !== undefined || s.priority === true) || s.id === ch.insolvency || s.id === ch.burnout
        const isPlainScene = (s.kind ?? 'scene') === 'scene'
        if (!dealt || !isPlainScene || s.id === ch.entry) continue
        expect(
          (s.leadIn ?? '').trim().length,
          `${chId}/${s.id}: dealt scene is missing its leadIn`,
        ).toBeGreaterThan(40)
      }
    }
  })

  it('signatures point at real scenes and real choices', () => {
    for (const id of COMPANY_ORDER) {
      const ch = CONTENT.chapters[id]
      for (const sig of ch.signatures ?? []) {
        const scene = ch.scenes.find((s) => s.id === sig.scene)
        expect(scene, `${id}: signature scene ${sig.scene} missing`).toBeDefined()
        expect(scene!.choices.length, `${id}/${sig.scene}: signature choice #${sig.choice} out of range`).toBeGreaterThan(sig.choice)
        expect(sig.text.trim().length, `${id}/${sig.scene}: signature text empty`).toBeGreaterThan(10)
      }
    }
  })

  it('achievements carry unique ids and real copy', () => {
    for (const id of COMPANY_ORDER) {
      const achs = CONTENT.chapters[id].achievements ?? []
      expect(new Set(achs.map((a) => a.id)).size).toBe(achs.length)
      for (const a of achs) {
        expect(a.title.trim().length, `${id}/${a.id}: empty title`).toBeGreaterThan(2)
        expect(a.desc.trim().length, `${id}/${a.id}: empty desc`).toBeGreaterThan(10)
      }
    }
  })
})
