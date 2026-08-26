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
import { CHAPTERS, CLIFFHANGER, COVENANT, HERO_ART, LANDING_ART } from '../src/content/landing'

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
  })

  it('one title card per company, in chapter order', () => {
    expect(CHAPTERS.map((c) => c.kicker)).toEqual(['CHAPTER ONE', 'CHAPTER TWO', 'CHAPTER THREE'])
  })

  it('the covenant carries its three lines', () => {
    expect(COVENANT.length).toBe(3)
  })
})
