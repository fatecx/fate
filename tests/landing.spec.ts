/**
 * Landing integrity — the front door references only prints that exist and a
 * scene that is real. The page renders sigils when art is missing by design,
 * but the authored landing list itself may never point at nothing.
 */
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { CONTENT } from '../src/content/world'
import { getScene } from '../src/engine/reduce'
import {
  CHAPTERS,
  CLIFFHANGER,
  COVENANT,
  EN_LANDING,
  HERO_ART,
  LANDING_ART,
  LANDING_COPY,
  LANDING_LOCALIZATION_ENABLED,
  ZH_CN_LANDING,
} from '../src/content/landing'

describe('landing', () => {
  it('every print the landing names is committed to public/art', () => {
    for (const id of LANDING_ART) {
      const file = resolve(__dirname, `../public/art/${id}.webp`)
      expect(existsSync(file), `landing art missing: ${id}`).toBe(true)
    }
  })

  it('the hero montage has enough frames to breathe', () => {
    expect(HERO_ART.length).toBeGreaterThanOrEqual(4)
  })

  it('the cliffhanger is a real scene with real choices and a real face', () => {
    const scene = getScene(CONTENT, 'hyperchute', CLIFFHANGER.sceneId)
    expect(scene.choices.length).toBeGreaterThanOrEqual(2)
    expect(scene.speaker, 'the first scene should carry a portrait').toBeDefined()
    const portrait = resolve(__dirname, `../public/art/${scene.speaker}.webp`)
    expect(existsSync(portrait), `cliffhanger portrait missing: ${scene.speaker}`).toBe(true)
    expect(CLIFFHANGER.demo.leadIn).toBe(scene.leadIn)
    expect(CLIFFHANGER.demo.prose).toBe(scene.prose)
    expect(CLIFFHANGER.demo.choices).toEqual(scene.choices.map((c) => c.label))
  })

  it('one title card per company, in chapter order', () => {
    expect(CHAPTERS.map((c) => c.kicker)).toEqual(['CHAPTER ONE', 'CHAPTER TWO', 'CHAPTER THREE'])
  })

  it('the covenant carries its three lines', () => {
    expect(COVENANT.length).toBe(3)
  })

  it('ships exactly English and Simplified Chinese landing copy', () => {
    expect(Object.keys(LANDING_COPY)).toEqual(['en', 'zh-CN'])
    expect(LANDING_COPY.en).toBe(EN_LANDING)
    expect(LANDING_COPY['zh-CN']).toBe(ZH_CN_LANDING)
  })

  it('keeps the public landing English-only for now', () => {
    expect(LANDING_LOCALIZATION_ENABLED).toBe(false)
  })

  it('the Chinese landing covers every authored landing surface', () => {
    expect(ZH_CN_LANDING.pitch).toHaveLength(EN_LANDING.pitch.length)
    expect(ZH_CN_LANDING.chapters).toHaveLength(EN_LANDING.chapters.length)
    expect(ZH_CN_LANDING.features).toHaveLength(EN_LANDING.features.length)
    expect(ZH_CN_LANDING.cliffhanger.demo.choices).toHaveLength(
      EN_LANDING.cliffhanger.demo.choices.length,
    )
    expect(ZH_CN_LANDING.ui.odds.labels).toHaveLength(EN_LANDING.ui.odds.labels.length)
    expect(ZH_CN_LANDING.covenant).toHaveLength(EN_LANDING.covenant.length)

    const translated = JSON.stringify(ZH_CN_LANDING)
    expect(translated).toMatch(/[\u3400-\u9fff]/)
    for (const required of ['通行密钥', '董事会', '风险投资', '声望', '退款保证', '注册公司']) {
      expect(translated, `missing reviewed Chinese term: ${required}`).toContain(required)
    }
  })

  it('the Chinese landing localizes every cast hover label and live signature', () => {
    expect(Object.keys(ZH_CN_LANDING.characterNames).sort()).toEqual(Object.keys(CONTENT.characters).sort())
    for (const signature of CONTENT.chapters.hyperchute.signatures ?? []) {
      expect(
        ZH_CN_LANDING.signatures[signature.text],
        `missing Chinese signature: ${signature.text}`,
      ).toMatch(/[\u3400-\u9fff]/)
    }
  })
})
