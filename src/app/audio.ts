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
import { AMBIENCE, MOODS, TENSION, STINGERS, FOLEY, SCENE_BEDS } from '../content/sound'
import type { SoundDef } from '../content/sound'
import { sfxUrl } from './assets'

const SOUND_KEY = 'fate-sound'
const MUSIC_FADE = 2.5
const AMB_FADE = 1.6
const TENSION_FADE = 2.5
/** Crossfade between takes of the same mood — the hum breathes, never loops. */
const TAKE_XFADE = 3.5
/** Films are CUTS, not modulations: into one, sound drops near-instantly and
 *  the film bed lands under the sting; out of one, the room returns quickly. */
const CUT_OUT = 0.25
const CUT_IN = 0.6
const FILM_EXIT_OUT = 0.6
const FILM_EXIT_IN = 1.2

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
let accentLane: Lane | null = null
let tensionLane: Lane | null = null
let tensionOn = false

let wantMood: string | null = null
/** Stable key for take pick — a scene id. Same key, same take, forever. */
let wantTakeKey = ''
let curTakeKey = ''
/** Ambience candidates in priority order: scene bed, then room bed. */
let wantAmbChain: SoundDef[] = []
let wantAmbKey = ''
let curAmbKey = ''
let wantAccent: string | null = null
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
  p = fetch(sfxUrl(id))
    .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status)))))
    .then((ab) => (ctx ? ctx.decodeAudioData(ab) : null))
    .catch(() => null) // missing bed = silence, play continues
  buffers.set(id, p)
  return p
}

/** Rooms play ONCE per scene, briefly — an establishing breath: fade in, hold
 *  a few seconds, gone. The music carries the room after. If this still reads
 *  as busy, the next step is removal, not another knob. */
const AMB_HOLD_ONCE = 6
const AMB_GONE_BY = 13
/** Accent lane level relative to its bed's own gain — seasoning, not a duet. */
const ACCENT_MIX = 0.35

/** Start a lane. Loop mode for music/tension; 'once' plays a single take with
 *  a scheduled tail fade. Returns null when the file is absent. */
async function startLoop(def: SoundDef, fade: number, mode: 'loop' | 'once' = 'loop'): Promise<Lane | null> {
  const c = ensureCtx()
  if (!c || !master) return null
  const buf = await loadBuffer(def.id)
  if (!buf || !c) return null
  const src = c.createBufferSource()
  src.buffer = buf
  const gain = c.createGain()
  gain.gain.value = 0
  src.connect(gain)
  gain.connect(master)
  const t0 = c.currentTime
  const g = gain.gain
  if (mode === 'loop') {
    src.loop = true
    // Skip encoder padding at the seam so mp3 loops don't click.
    src.loopStart = Math.min(0.12, buf.duration / 8)
    src.loopEnd = buf.duration - Math.min(0.12, buf.duration / 8)
    // Random entry point: the same bed never opens on the same phrase twice.
    const span = Math.max(0, src.loopEnd - src.loopStart - 0.5)
    src.start(0, src.loopStart + Math.random() * span)
    g.linearRampToValueAtTime(def.gain, t0 + fade)
  } else {
    src.start(0)
    g.linearRampToValueAtTime(def.gain, t0 + fade)
    g.linearRampToValueAtTime(def.gain, t0 + fade + AMB_HOLD_ONCE)
    g.linearRampToValueAtTime(0, t0 + Math.min(buf.duration, AMB_GONE_BY))
    src.stop(t0 + Math.min(buf.duration, AMB_GONE_BY) + 0.3)
  }
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

// ---- the music cycle: one assigned take, looped — never a shuffle ------------

let takeTimer = 0

function takeFile(def: SoundDef, n: number): string {
  return n <= 1 ? def.id : `${def.id}_${n}`
}

/** Stable take from a scene id. Same scene, same file, every restart. */
export function takeIndex(key: string, total: number): number {
  if (total <= 1) return 1
  let h = 2166136261
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % total) + 1
}

function isFilmId(id: string | null): boolean {
  if (!id) return false
  return Object.values(MOODS).some((m) => m.id === id && m.film)
}

/** Play the assigned take of the mood. Recursion is guarded by lane identity:
 *  a mood change orphans the timer chain. */
async function startMusicCycle(def: SoundDef, fadeIn: number): Promise<Lane | null> {
  const c = ensureCtx()
  if (!c || !master) return null
  const total = def.takes ?? 1
  const n = takeIndex(wantTakeKey || def.id, total)
  let buf = await loadBuffer(takeFile(def, n))
  if (!buf && n !== 1) {
    buf = await loadBuffer(def.id)
  }
  if (!buf || !c) return null
  const src = c.createBufferSource()
  src.buffer = buf
  const gain = c.createGain()
  gain.gain.value = 0
  src.connect(gain)
  gain.connect(master)
  // Picture scores loop the trimmed meat in place. Play-scene drones still
  // cycle takes via the timer below — the hum breathes, never a hard seam.
  if (def.film) {
    src.loop = true
    src.loopStart = Math.min(0.12, buf.duration / 8)
    src.loopEnd = buf.duration - Math.min(0.12, buf.duration / 8)
  }
  src.start(0)
  gain.gain.linearRampToValueAtTime(def.gain, c.currentTime + fadeIn)
  const lane: Lane = { src, gain, id: def.id }
  if (def.film) return lane
  const handoff = (): void => {
    if (musicLane !== lane || !ctx) return
    void startMusicCycle(def, TAKE_XFADE).then((next) => {
      if (next && musicLane === lane) {
        stopLane(lane, TAKE_XFADE)
        musicLane = next
      }
    })
  }
  window.clearTimeout(takeTimer)
  takeTimer = window.setTimeout(handoff, Math.max(4000, (buf.duration - TAKE_XFADE) * 1000))
  src.onended = handoff // background-tab timers throttle; the source itself backstops
  return lane
}

let applying = false
/** Reconcile the decks with the wanted state. Serialized; latest wins. */
async function reconcile(): Promise<void> {
  if (applying || !ctx) return
  applying = true
  // The cut law: entering a picture score is abrupt; leaving one is quick;
  // everything else modulates at musical pace.
  const intoFilm = isFilmId(wantMood) && musicLane?.id !== wantMood
  const outOfFilm = isFilmId(musicLane?.id ?? null) && !isFilmId(wantMood)
  const musicOut = intoFilm ? CUT_OUT : outOfFilm ? FILM_EXIT_OUT : MUSIC_FADE
  const musicIn = intoFilm ? CUT_IN : outOfFilm ? FILM_EXIT_IN : MUSIC_FADE
  const ambOut = intoFilm ? CUT_OUT : AMB_FADE
  const ambIn = intoFilm ? CUT_IN : AMB_FADE
  try {
    if (wantMood !== (musicLane?.id ?? null) || wantTakeKey !== curTakeKey) {
      window.clearTimeout(takeTimer)
      const def = wantMood ? Object.values(MOODS).find((m) => m.id === wantMood) : undefined
      stopLane(musicLane, musicOut)
      musicLane = null
      curTakeKey = wantTakeKey
      if (def) musicLane = await startMusicCycle(def, musicIn)
    }
    if (wantAmbKey !== curAmbKey) {
      curAmbKey = wantAmbKey
      stopLane(ambLane, ambOut)
      ambLane = null
      // First candidate whose file exists wins — scene bed, then room, then silence.
      for (const def of wantAmbChain) {
        ambLane = await startLoop(def, ambIn, 'once')
        if (ambLane) break
      }
    }
    if (wantAccent !== (accentLane?.id ?? null)) {
      const def = wantAccent
        ? Object.values(AMBIENCE).find((a) => a.id === wantAccent)
        : undefined
      stopLane(accentLane, ambOut)
      accentLane = null
      // Accents season under the room: same bed library, a third the level.
      if (def) accentLane = await startLoop({ ...def, gain: def.gain * ACCENT_MIX }, ambIn + 1, 'once')
    }
    if (wantTension !== tensionOn) {
      tensionOn = wantTension
      if (wantTension && !tensionLane) tensionLane = await startLoop(TENSION, TENSION_FADE)
      else if (!wantTension && tensionLane) {
        stopLane(tensionLane, intoFilm ? CUT_OUT : TENSION_FADE)
        tensionLane = null
      }
    }
  } finally {
    applying = false
  }
  // State may have moved while we awaited decode — settle it.
  if (
    wantMood !== (musicLane?.id ?? null) ||
    wantTakeKey !== curTakeKey ||
    wantAmbKey !== curAmbKey ||
    wantAccent !== (accentLane?.id ?? null) ||
    wantTension !== tensionOn
  ) {
    void reconcile()
  }
}

export interface StageState {
  mood: keyof typeof MOODS | null
  ambience: string | null
  /** Scene id — when a bespoke scn_<id> bed exists it outranks the room. */
  scene?: string | null
  /** Stable key for the music take. Same key, same take. */
  takeKey?: string | null
  /** Optional second room layered low — the scene's seasoning. */
  accent?: string | null
  tension: boolean
}

/** The one entry point: render layer describes the moment, decks follow. */
export function setStage(s: StageState): void {
  wantMood = s.mood ? MOODS[s.mood]?.id ?? null : null
  wantTakeKey = s.takeKey || s.scene || wantMood || ''
  const chain: SoundDef[] = []
  const sceneBed = s.scene ? SCENE_BEDS[s.scene] : undefined
  if (sceneBed) chain.push(sceneBed)
  const room = s.ambience ? AMBIENCE[s.ambience] : undefined
  if (room) chain.push(room)
  wantAmbChain = chain
  wantAmbKey = chain.map((d) => d.id).join('|')
  wantAccent = s.accent ? AMBIENCE[s.accent]?.id ?? null : null
  wantTension = s.tension
  if (ctx) void reconcile()
}

/** Hard cut for restarts: every lane stops fast, one-shot dedupe clears.
 *  The next setStage starts the stage from silence. */
export function resetStage(): void {
  wantMood = null
  wantTakeKey = ''
  curTakeKey = ''
  wantAmbChain = []
  wantAmbKey = ''
  curAmbKey = ''
  wantAccent = null
  wantTension = false
  window.clearTimeout(takeTimer)
  stopLane(musicLane, 0.2)
  stopLane(ambLane, 0.2)
  stopLane(accentLane, 0.2)
  stopLane(tensionLane, 0.2)
  musicLane = null
  ambLane = null
  accentLane = null
  tensionLane = null
  tensionOn = false
  stung.clear()
}

/** A scene's sound event: one diegetic action, 2–4s, fired on arrival. */
export function sceneSound(sceneId: string): void {
  playOnce(SCENE_BEDS[sceneId])
}

const stung = new Set<string>()
/** One-shot. `once` de-dupes per key so re-renders never double-ring the bell. */
export function stinger(name: keyof typeof STINGERS, onceKey?: string): void {
  if (onceKey) {
    if (stung.has(onceKey)) return
    stung.add(onceKey)
  }
  playOnce(STINGERS[name])
}

let lastFoley = 0
/** Diegetic one-shot (stairs, pen, gavel). Throttled so re-mounts never stack. */
export function foley(name: keyof typeof FOLEY): void {
  const now = Date.now()
  if (now - lastFoley < 400) return
  lastFoley = now
  playOnce(FOLEY[name])
}

function playOnce(def: SoundDef | undefined): void {
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
  for (const d of [
    ...Object.values(AMBIENCE),
    ...Object.values(MOODS),
    TENSION,
    ...Object.values(STINGERS),
    ...Object.values(FOLEY),
    ...Object.values(SCENE_BEDS),
  ]) {
    void loadBuffer(d.id)
  }
  // Alternate takes warm too — the first crossfade should never stutter.
  for (const d of Object.values(MOODS)) {
    for (let n = 2; n <= (d.takes ?? 1); n++) void loadBuffer(`${d.id}_${n}`)
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
