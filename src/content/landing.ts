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
  /** Animated game chips — the pills the play surface stamps after a choice. */
  pills?: { t: string; k: 'good' | 'bad' | 'dim' | 'accent' }[]
  /** Portrait circles — character ids whose faces this card wears. */
  cast?: string[]
  /** The covenant's mark: a plain signature rule, label and value. */
  sig?: { label: string; value: string }
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
  'cut_s_year_two_night',
]

export const HERO = {
  kicker: 'THE IMMUTABLE FOUNDER SAGA',
  title: 'FATE',
  sub: 'A narrative adventure crossed with a startup founder sim, set in the near future. Every decision you make shapes whether your startups fail or go public, as you build a railway in the sky, telepresence robots on the Moon, and the galaxy’s first space elevator.',
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
    art: 'world_roadshow',
    paras: [
      'A sci-fi epic of desire, grit, and consequence, spanning thirty years of cofounder fallouts, board politics, bad press, death, fortune, and billions in capital.',
    ],
  },
]

/** Each chapter holds a full screen — a title card from the life itself. */
export const CHAPTERS: readonly ChapterCard[] = [
  {
    kicker: 'CHAPTER ONE',
    name: 'HYPERCHUTE, INC.',
    art: 'world_first_drop',
    line: 'A railway in the sky. Autonomous shuttles hold station above each home and drop deliveries through a tube to the doorstep.',
  },
  {
    kicker: 'CHAPTER TWO',
    name: 'TELEPORT, INC.',
    art: 'cut_first_walk',
    line: 'Walk on the Moon from a room on Earth. Relay satellites cut the delay to 2.6 seconds, and what you say about those seconds decides who stays on your board.',
  },
  {
    kicker: 'CHAPTER THREE',
    name: 'SKYLINE, INC.',
    art: 'cut_s_year_two',
    line: 'A space elevator that combines everything you learned in logistics and space systems. Nations, unions, and your own investors fight over who rides it first.',
  },
]

/** The demo cliffhanger — the real opening scene, rendered read-only. */
export const CLIFFHANGER = {
  kicker: 'THE FIRST SCENE',
  sceneId: 'h_seedling',
}

export const FEATURES: readonly LandingPanel[] = [
  {
    kicker: 'THE BIOGRAPHY',
    glyph: '◆',
    head: 'THE WORLD REMEMBERS',
    art: null,
    paras: [
      'Companies die and the story keeps going. The investor you burned in chapter one blocks a door in chapter three.',
    ],
    cast: ['marisol', 'priya', 'tomas', 'june', 'sofia', 'nadia', 'marcus', 'farrokh', 'hale', 'vance'],
  },
  {
    kicker: 'THE ENGINE',
    glyph: '■',
    head: 'EVERY CHOICE COSTS',
    art: null,
    paras: [
      'Money, stress, and reputation move with every decision. A cheap lie saves the week and loses the boardroom a year later.',
    ],
    pills: [
      { t: '+ $10,000', k: 'good' },
      { t: '+ STRESS', k: 'bad' },
      { t: 'RUNWAY 31 WKS', k: 'dim' },
      { t: 'CRED +1', k: 'good' },
    ],
  },
  {
    kicker: 'THE COVENANT',
    glyph: '▲',
    head: 'BURNED TO YOUR WALLET',
    art: null,
    paras: [
      'One wallet gets one life. Every choice is written to that address for good, and the finished biography stays on the record.',
    ],
    sig: { label: 'FOUNDER OF RECORD', value: '0x3f…a2 · PERMANENT' },
  },
]

export const RECORD: LandingPanel = {
  kicker: 'THE COMMUNITY',
  art: 'world_legend_clip',
  head: 'THE LEDGER',
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
    'The twenty dollars you pay incorporates your first company.',
  ],
}

export const PRICE_CHIP = 'ONE LIFE · $20'

export const CTA_LABEL = 'Incorporate →'

export const COVENANT = [
  'Fate gives you one life.',
  'Your decisions are immutable.',
  'Your path is burned to your wallet.',
]

/** Every art id the landing references — the spec walks this list. */
export const LANDING_ART: readonly string[] = [
  ...HERO_ART,
  ...[...PITCH, ...FEATURES, RECORD, FINALE].map((p) => p.art),
  ...FEATURES.flatMap((p) => p.cast ?? []),
  ...CHAPTERS.map((c) => c.art),
].filter((a): a is string => !!a)
