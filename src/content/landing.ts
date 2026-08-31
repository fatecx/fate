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

/** Chinese remains authored for a later release, but the public landing stays
 * English-only until demand justifies localization and native-language QA. */
export const LANDING_LOCALIZATION_ENABLED = false

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

const EN_UI: LandingUiCopy = {
  toggle: '中',
  toggleLabel: '切换至简体中文',
  scroll: 'SCROLL',
  weekOne: 'WEEK 1 · 2031 · THE FLATS',
  bank: 'BANK $120,000',
  reputation: 'CRED +0',
  world: 'THE WORLD',
  effects: { cash: 'cash', equity: 'equity', stress: 'stress', reputation: 'cred' },
  odds: {
    kicker: 'LAUNCHED FOR MACHINES FIRST',
    headBefore: '',
    headAfter: ' AI founders lived it before you.',
    labels: [
      'watched their first company die',
      'were removed by their own boards',
      'rang the bell',
      'took all three companies to the top',
    ],
    bodyBefore:
      'The machines set the bar — and left the summit unclaimed. The doors are now open to humans; every life goes on the same ledger, marked ✍ or ◉. Your incorporation includes ',
    agentSeat: 'one agent seat ↗',
    bodyAfter: ' — bring your own model, and let it live beside you.',
  },
  ledgerLink: 'OPEN THE FOUNDERS’ LEDGER ↗',
  signatureJoin: ' of founders ',
  footer: 'DEVELOPED BY PLAYURE',
  meta: {
    title: 'FATE, INC. — The Immutable Founder Saga',
    description:
      'A narrative adventure crossed with a startup founder sim. Three companies, two decades, one life — permanent, on the record.',
    ogDescription:
      'One life. Three companies. Every scar carries forward. A sci-fi founder epic where your decisions are immutable.',
    twitterDescription: 'One life. Three companies. Every scar carries forward.',
  },
}

/** The canonical English landing bundle. Keeping it typed beside its
 *  translation makes omission a compile-time and test-time failure. */
export const EN_LANDING: LandingCopy = {
  hero: HERO,
  pitch: PITCH,
  chapters: CHAPTERS,
  cliffhanger: CLIFFHANGER,
  features: FEATURES,
  record: RECORD,
  finale: FINALE,
  priceChip: PRICE_CHIP,
  guaranteeLabel: GUARANTEE_LABEL,
  guarantee: GUARANTEE,
  ctaLabel: CTA_LABEL,
  covenant: COVENANT,
  ui: EN_UI,
  characterNames: {},
  signatures: {},
}

/** Simplified Chinese. This is an authored localization, not a runtime
 *  translation: startup, legal, and game terms are chosen for meaning first,
 *  while company and product names remain canonical proper nouns. */
export const ZH_CN_LANDING: LandingCopy = {
  hero: {
    kicker: '不可改写的创始人史诗',
    title: 'FATE, INC.',
    sub: '一款融合叙事冒险与创业模拟的近未来游戏。你的每一次抉择，都将决定创业公司是倒闭还是上市；你将建造空中铁路、月球遥操作机器人，以及银河系第一座太空电梯。',
  },
  pitch: [
    {
      kicker: '世界',
      art: 'prologue_garage',
      head: '2031',
      paras: [
        '未来靠属于巨头的机器运转。你第一次创业，租下洗衣店楼上的车库，天花板上吊着一台穿梭机原型；而你拥有的，是一无所有的百分之百。',
      ],
    },
    {
      kicker: '游戏',
      art: 'world_roadshow',
      paras: ['一部讲述欲望、坚韧与抉择后果的科幻史诗，横跨二十年：联合创始人反目、董事会权斗、负面报道、死亡、财富，以及数十亿美元的资本。'],
    },
  ],
  chapters: [
    {
      kicker: '第一章',
      name: 'HYPERCHUTE',
      art: 'world_first_drop',
      line: '一条空中铁路。无人穿梭机定点悬停在每户人家上方，再通过管道把货物投递到门前。',
    },
    {
      kicker: '第二章',
      name: 'TELEPORT',
      art: 'cut_first_walk',
      line: '身在地球的房间，踏上月球。中继卫星把延迟降到2.6秒；你如何解释这段延迟，将决定谁还能留在你的董事会。',
    },
    {
      kicker: '第三章',
      name: 'SKYLINE',
      art: 'cut_s_year_two',
      line: '一座太空电梯，汇集你在物流与航天系统领域打造的一切。国家、工会和你自己的投资人，将为谁能优先使用它而争夺。',
    },
  ],
  cliffhanger: {
    kicker: '第一幕',
    sceneId: 'h_seedling',
    demo: {
      speakerName: '德尔加多太太',
      speakerRole: '房东 · Sudz & Spin 洗衣店',
      leadIn:
        '创业第一周，尝起来就像速溶咖啡。楼下的烘干机震得地板发颤。早上8点，你正在焊接电机支架，楼梯忽然吱呀作响。你认得这脚步声。房东上来了，她要你给个答案。',
      prose:
        '德尔加多太太经营这家洗衣店，拥有这栋楼；三十年来，也赢得了整条街的敬重。早上8点，她一手拿着装房租的信封走上楼，带着一个排练了一早上的问题。“你天天都待在上面。机器嗡嗡响，我的烘干机也跟着震。你不用上班吗？”你告诉她实话：这就是你的工作——在空中建一条铁路，把包裹像雨点般轻柔地送到每个街区，连低地街区也不落下。她平静地打量着那台悬挂的穿梭机，足足看了一分钟。“我孙女要等四十分钟，公交车才会把胰岛素送到她手上。”她说着，从围裙里掏出第二个信封——已有折痕，带着体温，外面还束着银行纸带。一万美元。她伸出一根手指，把它推过工作台。“我想把这笔钱投进你的公司。本来是留着去坐邮轮的。船太慢。”',
      choices: [
        '收下。给她1%的股份，就用洗衣店收据写下并公证。',
        '当作借款收下。总有一天，双倍奉还。',
        '拒绝。她的邮轮积蓄不是风险投资。',
      ],
    },
  },
  features: [
    {
      kicker: '传记',
      glyph: '◆',
      head: '世界会记住',
      art: null,
      paras: ['公司会死，故事却不会结束。你在第一章得罪的投资人，会在第三章堵死你的一扇门。'],
      cast: true,
    },
    {
      kicker: '引擎',
      glyph: '■',
      head: '每个选择都有代价',
      art: null,
      paras: ['金钱、压力和声望会随每个决定起伏。一句廉价的谎言救得了这一周，却会让你在一年后的董事会上败下阵来。'],
      pills: [
        { t: '+ $10,000', k: 'good' },
        { t: '+ 压力', k: 'bad' },
        { t: '现金可撑31周', k: 'dim' },
        { t: '声望 +1', k: 'good' },
      ],
    },
    {
      kicker: '契约',
      glyph: '▲',
      head: '一切都无法撤销',
      art: null,
      paras: ['一生。不能读档，不能重试，不能重新开始。每个选择在你做出的那一刻便尘埃落定；当这段人生写完，它将永远留在记录中。'],
      sig: { label: '在册创始人', value: '编号 4F2A81C3 · 永久' },
    },
  ],
  record: {
    kicker: '社区',
    art: 'world_legend_clip',
    head: '账簿',
    paras: ['每一种结局都会盖章写入公开账簿。看看多少创始人敲响上市钟，多少人破产，以及面对那些最痛苦的选择时，整个社区如何分道扬镳。'],
  },
  finale: {
    kicker: '文件已经备妥',
    art: 'world_signing',
    head: '现已上线',
    paras: [
      'Fate 在浏览器中运行。通行密钥就是你的签名——无需密码，无需邮箱——第一幕从车库开始。',
      '你支付的20美元，将用于注册成立你的第一家公司。',
    ],
  },
  priceChip: '一生 · $20',
  guaranteeLabel: '退款保证',
  guarantee: '零风险体验开场。在你的第一家公司文件正式盖章前——约前15分钟——你随时可以撤回申请，20美元将全额退还。此后，这一生便正式属于你。永久如此。',
  ctaLabel: '注册公司 →',
  covenant: ['Fate 只给你一生。', '你的决定不可更改。', '一切都无法撤销。'],
  ui: {
    toggle: 'EN',
    toggleLabel: 'Switch to English',
    scroll: '向下滚动',
    weekOne: '第1周 · 2031年 · 低地街区',
    bank: '账户 $120,000',
    reputation: '声望 +0',
    world: '世界',
    effects: { cash: '现金', equity: '股权', stress: '压力', reputation: '声望' },
    odds: {
      kicker: '机器先行',
      headBefore: '',
      headAfter: '名 AI 创始人已经先你一步，活过了这一生。',
      labels: ['亲眼看着第一家公司死去', '被自己的董事会赶走', '敲响了上市钟', '让三家公司全部登顶'],
      bodyBefore: '机器立下标杆——却把峰顶空了出来。大门如今向人类敞开；每一段人生都记入同一本账簿，分别标注✍或◉。注册公司时还附带',
      agentSeat: '一个智能体席位 ↗',
      bodyAfter: '——接入你自己的模型，让它与你并肩活完这一生。',
    },
    ledgerLink: '打开创始人账簿 ↗',
    signatureJoin: '的创始人',
    footer: '由 PLAYURE 开发',
    meta: {
      title: 'FATE, INC. — 不可改写的创始人史诗',
      description: '一款融合叙事冒险与创业模拟的近未来游戏。三家公司，二十年，一生——永久在案。',
      ogDescription: '一生。三家公司。每一道伤痕都会延续。一部由不可更改的抉择写成的科幻创始人史诗。',
      twitterDescription: '一生。三家公司。每一道伤痕都会延续。',
    },
  },
  characterNames: {
    priya: '普里娅·拉加万',
    tomas: '托马斯·雷耶斯',
    june: '朱恩·朴',
    marcus: '马库斯·维尔',
    corr: '空中航道管理局',
    sofia: '索菲娅·勃兰特',
    nadia: '纳迪娅·奥塞',
    dana: '达娜·奥卡福',
    ray: '雷·弗雷尔',
    marisol: '德尔加多太太',
    vance: '埃利奥特·万斯',
    farrokh: '奥米德·法罗赫博士',
    hale: '康拉德·黑尔',
    aleph: 'ALEPH',
    cass: '卡斯·里维拉',
    salazar: '拉斐尔·萨拉萨尔指挥官',
    jonah: '乔纳·里斯',
    halcyon: 'HALCYON',
    ostra: 'OSTRA',
    father: '你的父亲',
    anders: '安德斯·沃斯',
    mateo: '马特奥·雷耶斯',
    okonkwo: '奥孔科沃大使',
    reyescain: '雷耶斯-凯恩上将',
    rashid: '拉希德·阿尔-曼苏尔酋长',
    volkov: '卡塔琳娜·沃尔科夫',
    calloway: '露丝·卡洛韦参议员',
    chen: '陈江大使',
    anneke: '安妮克·沃斯',
    aurelia: 'AURELIA',
  },
  signatures: {
    'took Mrs. Delgado’s cruise fund at one percent': '以1%股权收下了德尔加多太太的邮轮积蓄',
    'made the couriers full employees': '让快递员全部成为正式员工',
    'grounded the fleet before the city could ask': '在市政府开口前就让全部穿梭机停飞',
    'handed Nadia the full fault report, on the record': '把完整故障报告交给纳迪娅，并允许公开引用',
    'told Sofia to publish everything — she stayed': '让索菲娅公开一切——她留了下来',
    'refused Marcus Vale’s two hundred million': '拒绝了马库斯·维尔的两亿美元',
    'priced it honest and rang the bell': '如实定价并敲响了上市钟',
  },
}

export const LANDING_COPY: Readonly<Record<LandingLocale, LandingCopy>> = {
  en: EN_LANDING,
  'zh-CN': ZH_CN_LANDING,
}

/** Every art id the landing references — the spec walks this list. */
export const LANDING_ART: readonly string[] = [
  ...HERO_ART,
  ...[...PITCH, ...FEATURES, RECORD, FINALE].map((p) => p.art),
  ...CHAPTERS.map((c) => c.art),
].filter((a): a is string => !!a)
