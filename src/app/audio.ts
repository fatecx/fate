/**
 * The sound stage — three decks over WebAudio, all reads, no writes:
 *
 *   MUSIC     mood bed derived from BIG state only (act, endgame, film) +
 *             a tension stem layered in when meters go red. Slow crossfades.
 *   AMBIENCE  diegetic room tone keyed by the scene's `ambience` id. Fast
 *             crossfades — you walked through a door.
 *   STINGERS  one-shots (the bell, film hits, chapter close).
 *
 * Laws: the engine decides, this file only listens. Missing files are
 * silence — audio never blocks play. Autoplay ignition happens on the first
 * user gesture. One switch (SOUND ON/OFF) persists in localStorage.
 */
import { AMBIENCE, MOODS, TENSION, STINGERS } from '../content/sound'
import type { SoundDef } from '../content/sound'

const SOUND_KEY = 'fate-sound'
const MUSIC_FADE = 4
const AMB_FADE = 1.6
const TENSION_FADE = 2.5

let ctx: AudioContext | null = null
let master: GainNode | null = null
const buffers = new Map<string, Promise<AudioBuffer | null>>()

interface Lane {
  src: AudioBufferSourceNode
  gain: GainNode
  id: string
}

let musicLane: Lane | null = null
let ambLane: Lane | null = null
let tensionLane: Lane | null = null
let tensionOn = false

let wantMood: string | null = null
let wantAmb: string | null = null
let wantTension = false

export function soundEnabled(): boolean {
  try {
    return localStorage.getItem(SOUND_KEY) !== 'off'
  } catch {
    return true
  }
}

export function setSoundEnabled(on: boolean): void {
  try {
    if (on) localStorage.removeItem(SOUND_KEY)
    else localStorage.setItem(SOUND_KEY, 'off')
  } catch {
    /* ignore */
  }
  if (!master || !ctx) return
  master.gain.cancelScheduledValues(ctx.currentTime)
  master.gain.linearRampToValueAtTime(on ? 1 : 0, ctx.currentTime + 0.4)
}

function ensureCtx(): AudioContext | null {
  if (ctx) return ctx
  try {
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = soundEnabled() ? 1 : 0
    master.connect(ctx.destination)
  } catch {
    ctx = null
  }
  return ctx
}

function loadBuffer(id: string): Promise<AudioBuffer | null> {
  let p = buffers.get(id)
  if (p) return p
  p = fetch(`/sfx/${id}.mp3`)
    .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status)))))
    .then((ab) => (ctx ? ctx.decodeAudioData(ab) : null))
    .catch(() => null) // missing bed = silence, play continues
  buffers.set(id, p)
  return p
}

/** Start a looped lane and fade it in; returns null when the file is absent. */
async function startLoop(def: SoundDef, fade: number): Promise<Lane | null> {
  const c = ensureCtx()
  if (!c || !master) return null
  const buf = await loadBuffer(def.id)
  if (!buf || !c) return null
  const src = c.createBufferSource()
  src.buffer = buf
  src.loop = true
  // Skip encoder padding at the seam so mp3 loops don't click.
  src.loopStart = Math.min(0.12, buf.duration / 8)
  src.loopEnd = buf.duration - Math.min(0.12, buf.duration / 8)
  const gain = c.createGain()
  gain.gain.value = 0
  src.connect(gain)
  gain.connect(master)
  src.start(0, src.loopStart)
  gain.gain.linearRampToValueAtTime(def.gain, c.currentTime + fade)
  return { src, gain, id: def.id }
}

function stopLane(lane: Lane | null, fade: number): void {
  if (!lane || !ctx) return
  const at = ctx.currentTime
  lane.gain.gain.cancelScheduledValues(at)
  lane.gain.gain.setValueAtTime(lane.gain.gain.value, at)
  lane.gain.gain.linearRampToValueAtTime(0, at + fade)
  const src = lane.src
  window.setTimeout(() => {
    try {
      src.stop()
      src.disconnect()
    } catch {
      /* already stopped */
    }
  }, fade * 1000 + 120)
}

let applying = false
/** Reconcile the decks with the wanted state. Serialized; latest wins. */
async function reconcile(): Promise<void> {
  if (applying || !ctx) return
  applying = true
  try {
    if (wantMood !== (musicLane?.id ?? null)) {
      const def = wantMood ? Object.values(MOODS).find((m) => m.id === wantMood) : undefined
      stopLane(musicLane, MUSIC_FADE)
      musicLane = null
      if (def) musicLane = await startLoop(def, MUSIC_FADE)
    }
    if (wantAmb !== (ambLane?.id ?? null)) {
      const def = wantAmb
        ? Object.values(AMBIENCE).find((a) => a.id === wantAmb)
        : undefined
      stopLane(ambLane, AMB_FADE)
      ambLane = null
      if (def) ambLane = await startLoop(def, AMB_FADE)
    }
    if (wantTension !== tensionOn) {
      tensionOn = wantTension
      if (wantTension && !tensionLane) tensionLane = await startLoop(TENSION, TENSION_FADE)
      else if (!wantTension && tensionLane) {
        stopLane(tensionLane, TENSION_FADE)
        tensionLane = null
      }
    }
  } finally {
    applying = false
  }
  // State may have moved while we awaited decode — settle it.
  if (
    wantMood !== (musicLane?.id ?? null) ||
    wantAmb !== (ambLane?.id ?? null) ||
    wantTension !== tensionOn
  ) {
    void reconcile()
  }
}

export interface StageState {
  mood: keyof typeof MOODS | null
  ambience: string | null
  tension: boolean
}

/** The one entry point: render layer describes the moment, decks follow. */
export function setStage(s: StageState): void {
  wantMood = s.mood ? MOODS[s.mood]?.id ?? null : null
  wantAmb = s.ambience ? AMBIENCE[s.ambience]?.id ?? null : null
  wantTension = s.tension
  if (ctx) void reconcile()
}

const stung = new Set<string>()
/** One-shot. `once` de-dupes per key so re-renders never double-ring the bell. */
export function stinger(name: keyof typeof STINGERS, onceKey?: string): void {
  if (onceKey) {
    if (stung.has(onceKey)) return
    stung.add(onceKey)
  }
  const def = STINGERS[name]
  const c = ensureCtx()
  if (!def || !c || !master) return
  void loadBuffer(def.id).then((buf) => {
    if (!buf || !c || !master) return
    const src = c.createBufferSource()
    src.buffer = buf
    const gain = c.createGain()
    gain.gain.value = def.gain
    src.connect(gain)
    gain.connect(master)
    src.start()
  })
}

/** Warm the whole cabinet after ignition — small files, fire-and-forget. */
function warm(): void {
  for (const d of [...Object.values(AMBIENCE), ...Object.values(MOODS), TENSION, ...Object.values(STINGERS)]) {
    void loadBuffer(d.id)
  }
}

/** Browsers gate audio behind a gesture; the first click starts the stage. */
export function igniteOnFirstGesture(): void {
  const ignite = (): void => {
    const c = ensureCtx()
    if (!c) return
    void c.resume().then(() => {
      warm()
      void reconcile()
    })
  }
  window.addEventListener('pointerdown', ignite, { once: true, capture: true })
  window.addEventListener('keydown', ignite, { once: true, capture: true })
}
