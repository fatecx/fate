/**
 * The front door — marketing copy and art for fate.cx's landing scroll.
 * Content is data: the renderer in src/app/landing.ts reads this and nothing
 * else. Art ids point at public/art; a missing file renders as a sigil field,
 * so the page never waits on a picture (law 5).
 */

export interface LandingPanel {
  kicker: string
  art: string | null
  glyph?: string
  head?: string
  paras: string[]
}

export interface ChapterCard {
  kicker: string
  name: string
  art: string | null
  line: string
}

/** Hero montage — the strongest frames across chapters, cycled behind the wordmark. */
export const HERO_ART: readonly string[] = [
  'cut_first_light',
  'cut_chute_launch',
  'world_bell',
  'cut_ring_alive',
  'end_t_stars',
  'end_s_ascent',
  'world_hangar_night',
]

export const HERO = {
  kicker: 'THE IMMUTABLE FOUNDER SAGA',
  title: 'FATE',
  tag: 'One life. Three companies. Every scar carries forward.',
}

export const PITCH: readonly LandingPanel[] = [
  {
    kicker: 'THE WORLD',
    art: 'prologue_garage',
    head: '2031',
    paras: [
      'The future runs on machines that belong to giants. You are a first-time founder in a rented garage above a laundromat, with a shuttle prototype hanging from the ceiling and one hundred percent of nothing.',
    ],
  },
  {
    kicker: 'THE GAME',
    art: 'world_war_room',
    paras: [
      'Fate is a narrative adventure crossed with a startup founder sim. You will found three companies in one life, and every decision moves real numbers. Those numbers decide whether each company dies quietly, sells out, or rings the bell at an IPO.',
      'Thirty years of cofounder fallouts, board politics, bad press, death, fortune, and billions in capital.',
    ],
  },
]

export const PITCH_STAT = '3 STARTUPS · 30 YEARS · 1 LIFE'

/** Each chapter holds a full screen — a title card from the life itself. */
export const CHAPTERS: readonly ChapterCard[] = [
  {
    kicker: 'CHAPTER ONE',
    name: 'HYPERCHUTE',
    art: 'world_first_drop',
    line: 'A railway in the sky. Autonomous shuttles hold station above each home and drop deliveries through a tube to the doorstep.',
  },
  {
    kicker: 'CHAPTER TWO',
    name: 'TELEPORT',
    art: 'cut_first_walk',
    line: 'Walk on the Moon from a room on Earth. Relay satellites cut the delay to 2.6 seconds, and what you say about those seconds decides who stays on your board.',
  },
  {
    kicker: 'CHAPTER THREE',
    name: 'SKYLINE',
    art: 'world_s_cable_complete',
    line: 'A cable from the ground to orbit. Nations, unions, and your own investors fight over who rides it first.',
  },
]

/** The demo cliffhanger — the real opening scene, rendered read-only. */
export const CLIFFHANGER = {
  kicker: 'THE FIRST SCENE',
  sceneId: 'h_seedling',
  caption: 'TO CHOOSE, SIGN THE PAPERS →',
}

export const FEATURES: readonly LandingPanel[] = [
  {
    kicker: 'THE BIOGRAPHY',
    glyph: '◆',
    head: 'THE WORLD REMEMBERS',
    art: null,
    paras: [
      'Companies die and the story keeps going. The investor you burned in your first company blocks a door in your third. A failed company stays in the world as a headline, a rival, or an old office you walk past.',
    ],
  },
  {
    kicker: 'THE ENGINE',
    glyph: '■',
    head: 'THE NUMBERS ARE REAL',
    art: null,
    paras: [
      'Runway, stress, and reputation are the only three meters in the game. Every outcome comes from your choices and those numbers, under rules that are the same for everyone. Board votes resolve by counting seats, and when a company dies you can name the two decisions that killed it.',
    ],
  },
  {
    kicker: 'THE COVENANT',
    glyph: '▲',
    head: 'BURNED TO YOUR WALLET',
    art: null,
    paras: [
      'Your wallet signs the incorporation papers. One wallet gets one life, and every choice is written to that address for good. There are no resets and no second saves. When the biography ends, it stays on the record.',
    ],
  },
]

export const RECORD: LandingPanel = {
  kicker: 'THE COMMUNITY',
  art: 'world_legend_clip',
  head: 'THE RECORD',
  paras: [
    'Every ending is stamped to a public ledger. See how many founders reached the bell, how many went bankrupt, and how the community split on the choices that hurt.',
  ],
}

export const FINALE: LandingPanel = {
  kicker: 'THE PAPERS ARE WAITING',
  art: 'world_signing',
  head: 'OUT NOW',
  paras: [
    'Fate runs in your browser. Your wallet is your signature, and the first scene starts in the garage.',
    'The twenty dollars you pay is the check that incorporates your first company.',
  ],
}

export const PRICE_CHIP = 'ONE LIFE · $20'

export const COVENANT = [
  'Fate gives you one life.',
  'Your decisions are immutable.',
  'Your path is burned to your wallet.',
]

/** Every art id the landing references — the spec walks this list. */
export const LANDING_ART: readonly string[] = [
  ...HERO_ART,
  ...[...PITCH, ...FEATURES, RECORD, FINALE].map((p) => p.art),
  ...CHAPTERS.map((c) => c.art),
].filter((a): a is string => !!a)
