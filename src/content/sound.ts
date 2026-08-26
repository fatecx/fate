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
    gain: 0.48,
    prompt:
      'Interior of a small workshop garage above a laundromat: soft muffled tumble dryers through the floorboards, gentle electronics hum, ventilation. Very occasionally and quietly: a small tool set down, a faint chair creak. Calm, warm, understated. Seamless loop, no music, no voices.',
  },
  night: {
    id: 'amb_night',
    gain: 0.42,
    prompt:
      'Quiet interior late at night: low room tone, a soft clock tick, distant city murmur through a closed window. Very occasionally: one far-off car passing, barely there. Still, lonely, minimal. Seamless loop, no music, no voices.',
  },
  office: {
    id: 'amb_office',
    gain: 0.42,
    prompt:
      'Small office interior: steady air-conditioner hum, distant muffled traffic. Very occasionally and softly: a page turns, a pen scratches briefly. Dry, businesslike, understated. Seamless loop, no music, no voices.',
  },
  cafe: {
    id: 'amb_cafe',
    gain: 0.5,
    prompt:
      'Neighborhood coffee shop interior: continuous soft crowd murmur, gentle cup and saucer sounds now and then, an espresso machine hissing quietly in the background. Warm, blended, unobtrusive — nothing sudden, nothing loud. Seamless loop, murmur only, no intelligible words, no music.',
  },
  street: {
    id: 'amb_street',
    gain: 0.46,
    prompt:
      'City street ambience, medium distance: steady light traffic wash, occasional car passing, faint city birds, air. Everything soft and blended, nothing distinct or sudden — no animals, no voices, no horns. Seamless loop, no music.',
  },
  hearing: {
    id: 'amb_hearing',
    gain: 0.42,
    prompt:
      'Municipal hearing room before session: large-room HVAC rumble — with occasional events: chairs shift on hard floor, a microphone is bumped once, papers turn, someone coughs at the back, a heavy door closes softly. Formal, hushed, tense. Seamless loop, no music, no speech.',
  },
  crowd: {
    id: 'amb_crowd',
    gain: 0.48,
    prompt:
      'Street protest heard from a half block away: crowd murmur swelling and falling, indistinct chant rhythms, a whistle, picket signs knocking, city traffic behind. Tense but not violent, seamless loop. No intelligible words, no music.',
  },
  warehouse: {
    id: 'amb_warehouse',
    gain: 0.48,
    prompt:
      'Aerostructures fabrication floor: distant CNC machining whine, a forklift reversing beep far away, compressed air bursts, metal sheet handling, big-space reverb. Industrial, busy, seamless loop. No music, no voices.',
  },
  corp: {
    id: 'amb_corp',
    gain: 0.42,
    prompt:
      'Glass corporate tower interior: vast quiet atrium tone, soft ventilation, distant elevator chime, muffled phone ringing once far away, expensive hush. Cold, polished, seamless loop. No music, no voices.',
  },
  accident: {
    id: 'amb_accident',
    gain: 0.46,
    prompt:
      'Cordoned city street after an accident, evening: wind over pavement, a distant siren passing once, low bystander murmur, police radio crackle far away, a news helicopter faint overhead. Somber, heavy, seamless loop. No music, no intelligible words.',
  },
  roadshow: {
    id: 'amb_roadshow',
    gain: 0.42,
    prompt:
      'Hotel conference room between meetings: low HVAC, projector fan, ice in water glasses, distant lobby murmur, a rolling suitcase passing in the corridor, faint jet cabin drone undertone. Transient, professional, seamless loop. No music, no voices.',
  },
  dispatch: {
    id: 'amb_dispatch',
    gain: 0.46,
    prompt:
      'Large logistics dispatch floor: hundreds of quiet keyboards, headset call-center murmur, server room whir, air conditioning, an alert tone chirping far away. Corporate, monotonous, seamless loop. No intelligible words, no music.',
  },
  wind: {
    id: 'amb_wind',
    gain: 0.44,
    prompt:
      'City rooftop at height: steady soft wind over ledges, faint traffic far below, a distant electric hum above, cable tick against a mast. Open, airy, slightly lonely, seamless loop. No music, no voices.',
  },
  exchange: {
    id: 'amb_exchange',
    gain: 0.52,
    prompt:
      'Stock exchange trading floor mid-morning: large hall crowd roar, overlapping excited murmur, distant phone rings, papers, big marble reverb. Electric, historic, seamless loop. No intelligible words, no music.',
  },
  // ---- TELEPORT rooms ---------------------------------------------------------
  hangar: {
    id: 'amb_hangar',
    gain: 0.55,
    prompt:
      'Leased aircraft hangar interior on a coastal spaceport: vast tin-roof reverb, gulls faint outside, wind pressing the doors — with occasional events: a socket wrench ratchets, a cable drum rolls a short way, a test servo whirs and stops, distant surf between gusts. Big, echoing, hopeful. Seamless loop, no music, no voices.',
  },
  cleanroom: {
    id: 'amb_cleanroom',
    gain: 0.5,
    prompt:
      'Small satellite cleanroom: steady laminar airflow hiss, HEPA fan hum, bunny-suit fabric rustle rarely — with occasional events: tweezers set on steel, a torque driver clicks to spec, an air shower cycles far away. Sterile, precise, close. Seamless loop, no music, no voices.',
  },
  mission: {
    id: 'amb_mission',
    gain: 0.52,
    prompt:
      'Small mission-control room at night: server rack whir, many cooling fans, UPS hum — with occasional events: a telemetry alert chirps once softly, a keyboard runs a short burst, a headset is set on a desk, a chair rolls. Focused, electronic, caffeinated. Seamless loop, no music, no voices.',
  },
  boardroom: {
    id: 'amb_boardroom',
    gain: 0.48,
    prompt:
      'Corporate boardroom before a meeting: long-room hush, ventilation whisper, glass wall damping distant office sounds — with occasional events: a leather chair creaks, a water glass is set down, a laptop lid closes, papers square against the table once. Expensive, tense, quiet. Seamless loop, no music, no voices.',
  },
  expo: {
    id: 'amb_expo',
    gain: 0.6,
    prompt:
      'Vast convention hall during an aerospace trade show: continuous layered crowd murmur, big-hall PA reverb without words — with frequent events: a demo servo whines somewhere, polite applause ripples far off, a badge scanner beeps, carpetted footsteps pass, a booth screen plays muffled bass. Alive, commercial, enormous. Seamless loop, no intelligible words, no melody.',
  },
  hotel: {
    id: 'amb_hotel',
    gain: 0.5,
    prompt:
      'Mid-price hotel room at night: air conditioner cycling, mini-fridge hum, muffled corridor sounds — with occasional events: an elevator dings far away, an ice machine rumbles once, a door closes down the hall, plumbing runs briefly. Anonymous, tired, liminal. Seamless loop, no music, no voices.',
  },
  moonlink: {
    id: 'amb_moonlink',
    gain: 0.5,
    prompt:
      'Teleoperation bay with a live lunar feed: soft static bed of an open space channel, quantized data chirps at irregular intervals, cooling fans, the faint clock-tick of a latency counter — with occasional events: a relay handoff blip, a comms squelch opens and closes, a servo command chord. Vast distance made audible. Seamless loop, no music, no voices.',
  },
}

/**
 * Non-diegetic mood beds. Music moves on BIG events only — the act you are in,
 * the endgame, the film — never per scene. Meters move the tension stem, not
 * the song. Prompts ask for MUSIC (slow chords, movement, character) — pure
 * drones read as HVAC next to the room tones.
 */
export const MOODS: Record<string, SoundDef> = {
  build: {
    id: 'mus_build',
    gain: 0.3,
    seconds: 30,
    prompt:
      'Warm ambient instrumental music: soft analog synthesizer chords slowly shifting through a gentle hopeful progression, a faint music-box arpeggio drifting in and out, tape warmth, late-night optimism of building something in a garage. Slow, patient, seamless loop, no drums, no vocals.',
  },
  war: {
    id: 'mus_war',
    gain: 0.32,
    seconds: 30,
    prompt:
      'Tense restrained instrumental music: a slow minor-key chord progression on warm analog synthesizers, clearly audible in the mid register, a quiet pulsing bass note beneath, cold shimmering accents above. Forward pressure, a long campaign. Melodic movement present but subtle. Seamless loop, no drums, no vocals.',
  },
  aftermath: {
    id: 'mus_aftermath',
    gain: 0.28,
    seconds: 30,
    prompt:
      'Somber ambient instrumental music: melancholy felt-piano phrases over a cold sustained string pad, slow and mournful, grief and responsibility after an accident, clearly audible but gentle. Seamless loop, no drums, no vocals.',
  },
  endgame: {
    id: 'mus_endgame',
    gain: 0.3,
    seconds: 30,
    prompt:
      'Cinematic ambient instrumental music: deep warm pads slowly swelling and receding, a quiet noble horn-like synthesizer line rising gradually, gathering shimmer, destiny at the end of a long road. Grand but restrained, seamless loop, no drums, no vocals.',
  },
  film: {
    id: 'mus_film',
    gain: 0.32,
    seconds: 30,
    prompt:
      'Dark cinematic ambient instrumental music: a deep evolving synthesizer pad with slow tonal movement, distant resonant piano note echoing rarely, held-breath suspense of a film interlude. Heavy, spacious, seamless loop, no drums, no vocals.',
  },
}

/** The danger stem — layered OVER the current mood when meters go RED, and
 *  only then: this is the rarest sound in the game or it is wallpaper. */
export const TENSION: SoundDef = {
  id: 'mus_tension',
  gain: 0.16,
  seconds: 22,
  prompt:
    'Anxious ticking pulse layer: a dry clock tick at a steady urgent tempo, soft low heartbeat thump underneath, subtle rising strain. Designed to sit over an ambient drone. Sparse, dry, seamless loop, no melody, no vocals.',
}

/** One-shots. Not looped. */
export const STINGERS: Record<string, SoundDef> = {
  boom: {
    id: 'sting_boom',
    gain: 0.62,
    seconds: 4,
    prompt:
      'One massive cinematic taiko drum hit: deep resonant strike with a sub-bass bloom, natural long decay into silence, ceremonial and heavy — a chapter beginning. One-shot, no music after, no voices.',
  },
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

/**
 * Foley — diegetic one-shots the fiction earns: the landlady on the stairs,
 * the pen on the receipt, the gavel in 4-B. Scenes fire one on arrival
 * (SceneDef.foley); a choice may fire one as it resolves (ChoiceDef.foley).
 */
export const FOLEY: Record<string, SoundDef> = {
  stairs: {
    id: 'fol_stairs',
    gain: 0.5,
    seconds: 4,
    prompt:
      'Footsteps climbing old creaky wooden stairs, approaching steadily, then stopping at the top. Interior, close, natural. One-shot, no music, no voices.',
  },
  pen: {
    id: 'fol_pen',
    gain: 0.5,
    seconds: 3,
    prompt:
      'A ballpoint pen signing a signature on paper laid on a wooden table: quick confident scratch strokes, a small paper rustle, pen set down. One-shot, close, dry, no music.',
  },
  phone: {
    id: 'fol_phone',
    gain: 0.48,
    seconds: 3,
    prompt:
      'A phone vibrating twice on a wooden workbench, short buzz pattern, slight rattle of small parts nearby. One-shot, close, no music, no ringtone melody.',
  },
  gavel: {
    id: 'fol_gavel',
    gain: 0.52,
    seconds: 3,
    prompt:
      'A wooden gavel strikes a sound block twice in a large municipal hall, firm and procedural, natural room reverb. One-shot, no music, no voices.',
  },
  cameras: {
    id: 'fol_cameras',
    gain: 0.48,
    seconds: 4,
    prompt:
      'A burst of press camera shutters clicking rapidly with a few flash pops, a scrum settling. One-shot, no music, no voices.',
  },
  door: {
    id: 'fol_door',
    gain: 0.45,
    seconds: 3,
    prompt:
      'A glass shop door opens with a small brass bell chime and swings shut with a soft thud. Interior cafe acoustics. One-shot, no music, no voices.',
  },
}

// Per-scene beds — one bespoke take per scene, keyed scn_<sceneId>. The
// engine tries the scene's own bed first, then the room, then silence.
import { HYPERCHUTE_SCENE_BEDS } from './hyperchute/soundscape'
export const SCENE_BEDS: Record<string, SoundDef> = { ...HYPERCHUTE_SCENE_BEDS }
