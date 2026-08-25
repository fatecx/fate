/**
 * The soundscape registry — every bed, mood, and stinger is data, exactly like
 * art. `prompt` is the generation spec (scripts/audio/generate.mjs renders any
 * entry missing from public/sfx). The engine never invents sound: scenes carry
 * an `ambience` id, moods derive from true state, and a missing file is
 * silence — audio never blocks (law 5 applies to ears too).
 */

export interface SoundDef {
  /** File stem: public/sfx/{id}.mp3 */
  id: string
  /** Lane gain 0..1 — mixed by ear, committed like art. */
  gain: number
  /** Generation spec for the sound-effects model. Loopable, no voices, no melody drift. */
  prompt: string
  /** Requested loop length in seconds (generation-time only). */
  seconds?: number
}

/** Diegetic room tone. The unit is the PLACE — scenes reference these by id. */
export const AMBIENCE: Record<string, SoundDef> = {
  garage: {
    id: 'amb_garage',
    gain: 0.5,
    prompt:
      'Interior room tone, small workshop garage above a laundromat: muffled tumble dryers rumbling through the floor, soft electronics hum, occasional light metallic tinker and a chair creak, quiet ventilation. Calm, steady, seamless loop. No music, no voices.',
  },
  night: {
    id: 'amb_night',
    gain: 0.45,
    prompt:
      'Quiet interior at night: low room tone, a soft wall clock tick, distant city hum through a closed window, occasional far-off car pass, faint refrigerator drone. Lonely, still, seamless loop. No music, no voices.',
  },
  office: {
    id: 'amb_office',
    gain: 0.45,
    prompt:
      'Small converted shipping-container law office: air conditioner hum, papers shuffling occasionally, a pen tap, distant downtown traffic muffled through thin metal walls. Businesslike, dry, seamless loop. No music, no voices.',
  },
  cafe: {
    id: 'amb_cafe',
    gain: 0.5,
    prompt:
      'Busy neighborhood coffee shop interior: espresso machine hissing and grinding intermittently, cup and saucer clinks, low indistinct crowd murmur, a door chime once. Warm, lively but not loud, seamless loop. Murmur only — no intelligible words, no music.',
  },
  street: {
    id: 'amb_street',
    gain: 0.45,
    prompt:
      'Working-class city street, daytime: light traffic passing, distant bus air brakes, sparrows, a dog bark far away, footsteps on pavement, a faint electric hum overhead. Open-air, lived-in, seamless loop. No music, no voices.',
  },
  hearing: {
    id: 'amb_hearing',
    gain: 0.4,
    prompt:
      'Municipal hearing room tone: large room HVAC rumble, chairs shifting on hard floor, papers turning, a distant cough, microphone hum. Formal, tense, hushed, seamless loop. No music, no speech.',
  },
  crowd: {
    id: 'amb_crowd',
    gain: 0.45,
    prompt:
      'Street protest heard from a half block away: crowd murmur swelling and falling, indistinct chant rhythms, a whistle, picket signs knocking, city traffic behind. Tense but not violent, seamless loop. No intelligible words, no music.',
  },
  warehouse: {
    id: 'amb_warehouse',
    gain: 0.45,
    prompt:
      'Aerostructures fabrication floor: distant CNC machining whine, a forklift reversing beep far away, compressed air bursts, metal sheet handling, big-space reverb. Industrial, busy, seamless loop. No music, no voices.',
  },
  corp: {
    id: 'amb_corp',
    gain: 0.4,
    prompt:
      'Glass corporate tower interior: vast quiet atrium tone, soft ventilation, distant elevator chime, muffled phone ringing once far away, expensive hush. Cold, polished, seamless loop. No music, no voices.',
  },
  accident: {
    id: 'amb_accident',
    gain: 0.42,
    prompt:
      'Cordoned city street after an accident, evening: wind over pavement, a distant siren passing once, low bystander murmur, police radio crackle far away, a news helicopter faint overhead. Somber, heavy, seamless loop. No music, no intelligible words.',
  },
  roadshow: {
    id: 'amb_roadshow',
    gain: 0.42,
    prompt:
      'Hotel conference room between meetings: low HVAC, projector fan, ice in water glasses, distant lobby murmur, a rolling suitcase passing in the corridor, faint jet cabin drone undertone. Transient, professional, seamless loop. No music, no voices.',
  },
}

/**
 * Non-diegetic mood beds. Music moves on BIG events only — the act you are in,
 * the endgame, the film — never per scene. Meters move the tension stem, not
 * the song.
 */
export const MOODS: Record<string, SoundDef> = {
  build: {
    id: 'mus_build',
    gain: 0.32,
    seconds: 26,
    prompt:
      'Warm ambient electronic drone bed: soft analog synth pads in a major key, very slow gentle pulse, faint tape hiss, hopeful and patient, like building something at night. Minimal, hypnotic, seamless loop, no percussion hits, no melody, no vocals.',
  },
  war: {
    id: 'mus_war',
    gain: 0.32,
    seconds: 26,
    prompt:
      'Tense dark ambient bed: low minor-key synth drone, slow filtered pulse underneath, distant metallic shimmer, pressure and forward motion, like a long campaign. Restrained, brooding, seamless loop, no drums, no melody, no vocals.',
  },
  aftermath: {
    id: 'mus_aftermath',
    gain: 0.3,
    seconds: 26,
    prompt:
      'Grave sparse ambient bed: cold sustained pad, air and space between sounds, a single soft piano note decaying rarely, grief and responsibility. Very quiet, very slow, seamless loop, no rhythm, no melody, no vocals.',
  },
  endgame: {
    id: 'mus_endgame',
    gain: 0.32,
    seconds: 26,
    prompt:
      'Rising cinematic ambient bed: deep warm drone slowly swelling, subtle high shimmer gathering, weight and destiny, the last door at the end of a long road. Grand but restrained, seamless loop, no drums, no melody, no vocals.',
  },
  film: {
    id: 'mus_film',
    gain: 0.3,
    seconds: 26,
    prompt:
      'Dark cinematic room tone for a film interlude: near-black ambient drone, sub bass presence, faint distant city resonance, held breath. Minimal and heavy, seamless loop, no rhythm, no melody, no vocals.',
  },
}

/** The danger stem — layered OVER the current mood when meters go red. */
export const TENSION: SoundDef = {
  id: 'mus_tension',
  gain: 0.26,
  seconds: 22,
  prompt:
    'Anxious ticking pulse layer: a dry clock tick at a steady urgent tempo, soft low heartbeat thump underneath, subtle rising strain. Designed to sit over an ambient drone. Sparse, dry, seamless loop, no melody, no vocals.',
}

/** One-shots. Not looped. */
export const STINGERS: Record<string, SoundDef> = {
  bell: {
    id: 'sting_bell',
    gain: 0.6,
    seconds: 8,
    prompt:
      'A stock exchange opening bell rings hard and bright, sustained clangor for several seconds, a crowd erupts into cheering and applause beneath it, then it all decays naturally. One-shot, triumphant.',
  },
  cut: {
    id: 'sting_cut',
    gain: 0.45,
    seconds: 5,
    prompt:
      'A single deep cinematic impact: soft dark braam swell with a sub thump, restrained and serious, decaying into silence. One-shot, no music after.',
  },
  close: {
    id: 'sting_close',
    gain: 0.5,
    seconds: 7,
    prompt:
      'A low warm gong-like resolve: one deep struck chord, long natural decay into quiet, finality without triumph. One-shot, no melody.',
  },
}
