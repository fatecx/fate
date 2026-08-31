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
  /** When true the card wears the entire cast of the game, every face. */
  cast?: boolean
  /** The covenant's mark: a plain signature rule, label and value. */
  sig?: { label: string; value: string }
}

export interface ChapterCard {
  kicker: string
  name: string
  art: string | null
  line: string
}

export type LandingLocale = 'en' | 'zh-CN'

export interface LandingDemoCopy {
  speakerName: string
  speakerRole: string
  leadIn: string
  prose: string
  choices: readonly string[]
}

export interface LandingUiCopy {
  toggle: string
  toggleLabel: string
  scroll: string
  weekOne: string
  bank: string
  reputation: string
  world: string
  effects: { cash: string; equity: string; stress: string; reputation: string }
  odds: {
    kicker: string
    headBefore: string
    headAfter: string
    labels: readonly string[]
    bodyBefore: string
    agentSeat: string
    bodyAfter: string
  }
  ledgerLink: string
  signatureJoin: string
  footer: string
  meta: {
    title: string
    description: string
    ogDescription: string
    twitterDescription: string
  }
}

export interface LandingCopy {
  hero: { kicker: string; title: string; sub: string }
  pitch: readonly LandingPanel[]
  chapters: readonly ChapterCard[]
  cliffhanger: { kicker: string; sceneId: string; demo: LandingDemoCopy }
  features: readonly LandingPanel[]
  record: LandingPanel
  finale: LandingPanel
  priceChip: string
  guaranteeLabel: string
  guarantee: string
  ctaLabel: string
  covenant: readonly string[]
  ui: LandingUiCopy
  /** Hover labels for the cast portraits. Missing keys fall back to canon. */
  characterNames: Readonly<Record<string, string>>
  /** Maps canonical English signature text to its localized completion. */
  signatures: Readonly<Record<string, string>>
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
  title: 'FATE, INC.',
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
      'A sci-fi epic of desire, grit, and consequence, spanning two decades of cofounder fallouts, board politics, bad press, death, fortune, and billions in capital.',
    ],
  },
]

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
    art: 'cut_s_year_two',
    line: 'A space elevator that combines everything you built in logistics and space systems. Nations, unions, and your own investors fight over who gets access first.',
  },
]

/** The demo cliffhanger — the real opening scene, rendered read-only. */
export const CLIFFHANGER = {
  kicker: 'THE FIRST SCENE',
  sceneId: 'h_seedling',
  demo: {
    speakerName: 'Mrs. Delgado',
    speakerRole: 'Landlady — Sudz & Spin',
    leadIn:
      'Week one as a founder tastes like instant coffee. Dryer drums shake the floor below you. At 8 a.m., while you solder a motor mount, the stairs creak. You know that walk. Your landlady is coming up, and she wants an answer.',
    prose:
      'Mrs. Delgado owns the laundromat, the building, and — after thirty years — this whole block’s respect. She climbs the stairs at 8 a.m. with a rent envelope in one hand and a question she has practiced all morning. “Every day you are up here. Machines humming. My dryers vibrate. Don’t you have a job?” You tell her the truth: this is the job now — a railway in the sky that drops packages soft as rain onto every block, even the Flats. She studies the hanging shuttle for a long, calm minute. “My granddaughter waits forty minutes for a bus to bring her insulin,” she says, and pulls a second envelope from her apron — creased, warm, wrapped with a bank band. Ten thousand dollars. She pushes it across the workbench with one finger. “I want to put my money in your company. I was saving for a cruise. Boats are slow.”',
    choices: [
      'Take it. One percent, notarized on a laundry receipt.',
      'Take it as a loan. Pay her back double, someday.',
      'Refuse. Her cruise money isn’t venture capital.',
    ],
  },
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
    cast: true,
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
    head: 'NOTHING CAN BE UNDONE',
    art: null,
    paras: [
      'One life. No reloads, no retries, no fresh starts. Every choice is final the moment you make it, and the finished biography stays on the record forever.',
    ],
    sig: { label: 'FOUNDER OF RECORD', value: 'Nº 4F2A81C3 · PERMANENT' },
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
    'Fate runs in your browser. A passkey is your signature — no password, no email — and the first scene starts in the garage.',
    'The twenty dollars you pay incorporates your first company.',
  ],
}

export const PRICE_CHIP = 'ONE LIFE · $20'

/** The guarantee — plain words first, the fiction as the boundary. */
export const GUARANTEE_LABEL = 'MONEY-BACK GUARANTEE'
export const GUARANTEE =
  'Play the opening at no risk. Until your first company’s papers are stamped — about the first fifteen minutes — withdraw and your $20 comes back in full. After that, the life is yours. Permanently.'

export const CTA_LABEL = 'Incorporate →'

export const COVENANT = [
  'Fate gives you one life.',
  'Your decisions are immutable.',
  'Nothing can be undone.',
]

/** Every art id the landing references — the spec walks this list. */
export const LANDING_ART: readonly string[] = [
  ...HERO_ART,
  ...[...PITCH, ...FEATURES, RECORD, FINALE].map((p) => p.art),
  ...CHAPTERS.map((c) => c.art),
].filter((a): a is string => !!a)
