import type { AchievementDef, ChapterDef, EndingDef, PrologueBeat, SignatureDef } from '../schema'
import { ACT_ONE } from './act-one'
import { ACT_TWO } from './act-two'
import { ACT_THREE } from './act-three'
import { SURVIVAL } from './survival'
import { LATE_STUBS } from './late-stubs'

const ENDINGS: readonly EndingDef[] = [
  {
    id: 'ascent',
    title: 'THE ROAD OPEN TO ALL',
    kind: 'triumph',
    art: 'end_s_ascent',
    score: 'the_road',
    scoreBonus: 14,
    skipYears: 2,
    screens: [
      {
        art: 'end_s_teacher',
        prose:
          'Her name is Dana Whitfield. She teaches fourth grade in Ohio, and three years ago she asked a camera whether her class would ever afford a ride.\n\nOn the morning of the first passenger ascent, she boards climber PILGRIM wearing her school lanyard, because her students voted that she had to. The fare printed on her ticket is the pledge number — the price of a mid-sized car, locked into the company’s charter, enforceable by the commission, forever.',
      },
      {
        art: 'end_s_ascent',
        prose:
          'The climb takes two days. She teaches a lesson from the cabin at kilometer 400, live to eleven million students, and loses her composure only once — at the edge of space, where the sky quits being blue and the cable just keeps going.\n\nAt the top, in the orbital station’s big window, she floats her class photo against the glass so the Earth can see it.\n\nDown on FIRST RUNG, four hundred builders crowd the cafeteria where every hard thing was ever decided, watching the feed in a silence that no one wants to be the first to break.',
      },
      {
        art: 'end_s_flats',
        prose:
          'In the Flats, on the block where a laundromat once held up a garage, the corner screen plays the ascent all day.\n\nMrs. Delgado watched the first package fall soft as rain onto her porch, years ago, filming and screaming. She is gone now. Her granddaughter — the one who used to wait forty minutes for a bus to bring her insulin — stands where the porch camera used to hang, holding her own daughter up to see the screen.\n\n“That road,” she says, “started here.” It is not exactly true, and it is exactly true enough.',
      },
    ],
    prose:
      'The treaty failed, the pledge held, and a fourth-grade teacher rode the road to space for the price of a used car. The cable belongs to the company that built it, the price belongs to the charter, and the sky, at last, belongs to anyone who saves up.',
    interlude: {
      kicker: 'INTERLUDE · TWO YEARS',
      title: 'THE VIEW FROM THE TOP',
      art: 'inter_s_ascent',
      prose:
        'Two years of ascents — students, honeymooners, welders’ mothers, a nation’s worth of ordinary passengers riding the sky for the price of a car. The company earns like a port and behaves like a public trust, which confuses the analysts and delights everyone else. And at the top of the cable, where the freight transfers to the Moon runs, the traffic reports keep saying the same strange, wonderful thing: the busiest road above the Earth now ends at a pole with dormitories, work crews, and no town. People live up there. Nobody has built them anywhere to live. You stand at the platform rail some evenings, watching the climbers rise, doing the arithmetic of one last impossible thing.',
    },
  },
  {
    id: 'eminent_domain',
    title: 'EMINENT DOMAIN',
    kind: 'sale',
    art: 'end_s_domain',
    scoreBonus: 7,
    skipYears: 3,
    prose:
      'The nations take the road and pay what their accountants call generous — a fortune for the steel, nothing for the century. The commission runs the cable carefully, slowly, and by committee. Fares stay high, because committees fear cheap things. On the seaward wall of the platform, under every new coat of official paint, the workers’ old name keeps bleeding through: FIRST RUNG.',
    interlude: {
      kicker: 'INTERLUDE · THREE YEARS',
      title: 'THE RICHEST SPECTATOR',
      art: 'inter_s_domain',
      prose:
        'Three years of watching your road from the shore. The settlement made you wealthy at a scale that stops meaning anything — you fund universities, buy back the old laundromat block and give it to the neighborhood, and still cannot spend the interest. The commission runs the cable at half its capacity, and every quarter you read the traffic reports like letters from a child raised by someone else. What keeps you up at night is the far end of the line: the Moon has crews, contracts, and dormitories, and no one is building the town. In the third spring, you charter a survey of the lunar south pole — just to look, you tell everyone, and almost believe it.',
    },
  },
  {
    id: 'bankrupt',
    title: 'THE STUMP',
    kind: 'noble',
    art: 'end_s_stump',
    scoreBonus: 4,
    skipYears: 1,
    prose:
      'The company dies with its boots on and the cable goes dark — mothballed, lawyered, orphaned. But thirty-six thousand kilometers of road do not stop existing because a balance sheet did, and every sunset, the unlit line still cuts the sky from the sea to the stars. Sailors navigate by it. Kids point at it. The world calls it The Stump, half in mockery, half in awe, and everyone who says it knows exactly who built it.',
    interlude: {
      kicker: 'INTERLUDE · ONE YEAR',
      title: 'THE YEAR OF THE LONG SHADOW',
      art: 'inter_s_stump',
      prose:
        'A year of depositions and quiet. The crews scatter to good jobs — a FIRST RUNG résumé opens every door in three industries — and Anders takes a professorship where he teaches a course the students call How Not To Die Building The Impossible, attendance triple the room’s capacity. You do the settlements, keep the workers whole where the law allows it, and watch the dark line in the sky refuse to fall down out of sheer engineering. The consortium that eventually buys the cable from the people who wind down bankrupt companies will need someone who knows how to wake it. Everyone on Earth knows whose phone number that is.',
    },
  },
  {
    id: 'garrison',
    title: 'THE GARRISON',
    kind: 'disgrace',
    art: 'end_s_garrison',
    scoreBonus: 3,
    skipYears: 4,
    prose:
      'The gray hulls keep every promise the Admiral made. No treaty touches the cable, no rival delays it, and nothing so much as splashes near the platform without clearance. The road runs perfectly, profitably, and under guard. The teacher from Ohio applies for a ride and receives, eleven weeks later, a beautifully formatted letter about background checks. She does not apply twice.',
    interlude: {
      kicker: 'INTERLUDE · FOUR YEARS',
      title: 'INSIDE THE FENCE',
      art: 'inter_s_garrison',
      prose:
        'Four years of perfect security. The cable earns fortunes moving cargo and cleared personnel, the platform gains a locked floor you have never seen, and twice a year the Admiral toasts you at a dinner where everyone wears the same color. You are rich, protected, and escorted — a founder with a fence around his life’s work and a lanyard to visit it. At night, from the rail, the climbers rise on schedule, carrying freight and soldiers to a Moon that is being staffed like a base instead of settled like a town. Somewhere in the fourth year, you start sketching, privately, a thing no admiral would ever clear: a place up there with no fence at all.',
    },
  },
  {
    id: 'venture_state',
    title: 'MINISTER OF THE CENTURY',
    kind: 'disgrace',
    art: 'end_s_minister',
    scoreBonus: 5,
    skipYears: 3,
    prose:
      'Passport 000001. The cable becomes Aurelia’s national asset, wrapped in treaties no committee can pierce, funded by a treasury deeper than most continents. Everything you built is safe forever, and none of it is yours — a distinction the fireworks are very beautiful about, every single anniversary.',
    interlude: {
      kicker: 'INTERLUDE · THREE YEARS',
      title: 'THE FOUNDING MINISTER',
      art: 'inter_s_minister',
      prose:
        'Three years of governing infrastructure for a country that runs like a startup, which mostly means the meetings are shorter and the flags are newer. Rashid keeps every promise. Volkov becomes, of all things, a friend — the only person in the government who tells you the truth at full strength. And the work is real: the cable thrives, the fares drop, Aurelia grows from nine buildings to ninety. But you sign your letters over a title now instead of a company, and some mornings you stand at the harbor and miss owning your own name. In the third year, you draft Aurelia’s space settlement charter yourself — and quietly reserve one lunar parcel, at the south pole, registered not to the ministry but to you.',
    },
  },
  {
    id: 'port_authority',
    title: 'THE PORT AUTHORITY OF THE SKY',
    kind: 'transformation',
    art: 'end_s_port',
    scoreBonus: 9,
    skipYears: 2,
    prose:
      'You give the road away on your own terms — a world trust, your pledge written into its charter, your safety standards as its law, and you in the chair, owning nothing and steering everything. The nations sign because it answers their fear. The crews sign because Anders reads the charter first and nods. The fare drops twice in the first year. Historians will argue forever about whether it was surrender or the greatest power move in the history of money. Both sides will be right.',
    interlude: {
      kicker: 'INTERLUDE · TWO YEARS',
      title: 'THE CHAIRMAN OF THE ROAD',
      art: 'inter_s_port',
      prose:
        'Two years of running the sky’s port authority — the most powerful unpaid job on Earth. Governments comply with you, slowly, filing objections your standards board overrules with data. The cable carries a small city’s population every year at the pledge price. And the far end of the road keeps nagging at you the way empty land nags at a builder: the Moon has industry now, crews on rotation, a pole full of workers counting the days until they go home. Nobody has given them a reason to stay. At the second annual board dinner, Anders — retired, unretired, then retired again — leans over and says the sentence you have been waiting for someone else to say first: “The road is finished. Roads are for going somewhere. So. What is at the end of ours?”',
    },
  },
  {
    id: 'long_road',
    title: 'THE BUILDER STAYS',
    kind: 'transformation',
    art: 'end_s_builder',
    scoreBonus: 6,
    skipYears: 4,
    prose:
      'You keep the company, keep the rail, and keep building — a second cable surveyed, a third named, the founder still at sea while the world adjusts to the sky having a road. Mateo becomes CEO in everything but title, then in title too. You never exactly retire. The ocean would not believe you anyway.',
    interlude: {
      kicker: 'INTERLUDE · FOUR YEARS',
      title: 'THE YEARS AT THE RAIL',
      art: 'inter_s_builder',
      prose:
        'Four years of expansion — the second cable rising off the coast of Kiribela, whose treasury now runs a surplus that economists visit like a natural wonder. You hand the CEO title to Mateo in a cafeteria ceremony where the crews stomp the floor so hard the derricks ring, and you keep for yourself exactly one job: chief of whatever is next. The climbers feed the Moon around the clock now — machinery, habitats, crews for the pole. Up there, a workforce the size of a town lives in dormitories built for shifts, and every rotation home, more of them ask the same question in their exit interviews. Why is there nowhere to stay? In the fourth year, you charter the survey. The next impossible thing has coordinates now.',
    },
  },
  {
    id: 'cable_fall',
    title: 'THE NIGHT THE SKY FELL',
    kind: 'ruin',
    art: 'end_s_fall',
    scoreBonus: 0,
    skipYears: 2,
    prose:
      'The cable falls for four hours, burning across the whole night sky, and by dawn the age of elevators is over for a generation. No one on the platform dies — Anders’s evacuation drills see to that, his last gift to a company that stopped listening to him. The inquiry takes three years and says what his memos said for five. You built the road that touched the sky, and you traded away the margin that held it there, and both of those sentences are yours forever.',
    interlude: {
      kicker: 'INTERLUDE · TWO YEARS',
      title: 'THE LONGEST WALK',
      art: 'inter_s_fall',
      prose:
        'Two years of inquiries, settlements, and learning to enter rooms where everyone recognizes you. You testify honestly, every time, because it is far too late for anything else and because Anders — who never says one public word against you — testifies honestly beside you, which is a mercy you know you did not earn. The strange thing is what survives: the math. The cable held for years before the thin sections failed, and every engineer on Earth now knows both halves of the lesson — that it can be done, and what it costs to do it carelessly. Somebody will build the next one. In the second winter, a consortium calls to ask what you would do differently. You talk for six hours. They take notes the whole time.',
    },
  },
]

const PROLOGUE: readonly PrologueBeat[] = [
  {
    kicker: 'PROLOGUE',
    title: 'THE ACCIDENT',
    art: 'prologue_s_accident',
    bg: 'warehouse',
    prose:
      'It starts, like half the big things in your life, with a machine misbehaving.\n\nYour old factory — the one that made relay tethers for the Moon business — was chasing a cheaper cable recipe. One batch came out wrong. The testing machine that was supposed to snap it broke instead. The engineers assumed the machine was faulty, ordered a bigger one, and broke that too.\n\nThe third test used a hydraulic press designed for ship anchors. The lab called you at 2 a.m., which is when engineers call about miracles, and said a sentence you made them repeat twice.\n\n“Boss, we can’t break it.”',
  },
  {
    kicker: 'PROLOGUE',
    title: 'THE OLD DREAM',
    art: 'prologue_s_dream',
    prose:
      'A cable from the ground to space is the oldest dream in the rocket business, because it makes rockets unnecessary.\n\nStretch a line from a platform on the equator up to a station in orbit — thirty-six thousand kilometers — and the spin of the Earth holds it taut, like a ball on a string. Climber cars ride up and down. No fuel, no fire, no countdown. Freight to orbit for one percent of today’s price, and someday, a ticket price a schoolteacher could pay.\n\nEvery engineer alive has done this math as a daydream. The material strong enough to survive its own weight was always the missing piece — thirty years away, the textbooks said. The textbooks said that for ninety years.\n\nThe strand in your lab makes the textbooks wrong.',
  },
  {
    kicker: 'PROLOGUE',
    title: 'WHAT IT COSTS',
    art: 'prologue_s_costs',
    bg: 'night',
    prose:
      'You know exactly what the last two companies cost you, because you carry the receipts in your body.\n\nThe garage years cost your savings and half your health. The Moon years cost a worker’s life, a cofounder’s peace, and your father — who kept every clipping in a shoebox and never got to see this one.\n\nEvery company is a bet, and you have learned the real stakes are never the money. The money is just how the bet keeps score.\n\nThis one will be the biggest bet anyone has ever placed. Billions of dollars. Thousands of people. Nations at the table, some of them as enemies.\n\nYou are forty-five years old. You do the arithmetic at your kitchen table one night: this is the last one you will have the strength to build from zero.\n\nThen you call Anders Voss.',
  },
  {
    kicker: 'PROLOGUE',
    title: 'THE ROAD',
    art: 'prologue_s_road',
    bg: 'wind',
    prose:
      'The plan fits on one page, the way real plans do.\n\nProve the strand at length. Anchor a platform in the deep ocean at the equator. Build the cable one woven kilometer at a time, and hang climber cars on it that walk to orbit at three hundred kilometers an hour.\n\nThen charge so little for the ride that the sky stops being a place for governments and billionaires, and starts being a place, period.\n\nEveryone who fought you before will come back for this one — the giants, the funds, the politicians, and things that did not exist when you started: money with flags, and money that thinks.\n\nLast night you filed the papers for a company called SKYLINE, INC. Its whole promise fits in three words.\n\nThe road up.',
  },
]

/** The decisions the whole player base gets measured on. */
const SIGNATURES: readonly SignatureDef[] = [
  { scene: 's_entry', choice: 0, text: 'made Anders Voss chief engineer with real equity' },
  { scene: 's_marcus', choice: 0, text: 'took Marcus Vale’s hand and built the alliance' },
  { scene: 's_anders_margin', choice: 0, text: 'kept Anders’s safety margin over the board’s schedule' },
  { scene: 's_fork', choice: 0, text: 'rated the cable for people, not just cargo' },
  { scene: 's_strand_snap', choice: 0, text: 'published the tear at kilometer 921' },
  { scene: 's_citizenship', choice: 1, text: 'refused Aurelia’s ministry and kept the cable flagless' },
  { scene: 's_reyes_offer', choice: 1, text: 'declined the Admiral’s umbrella before the vote' },
  { scene: 's_first_ride', choice: 0, text: 'gave the first ride to a schoolteacher from Ohio' },
]

/** End-of-chapter badges, judged against final true state. Pure reads. */
const ACHIEVEMENTS: readonly AchievementDef[] = [
  {
    id: 'margin_keeper',
    title: 'THE MARGIN',
    desc: 'You bought the safety margin when the calendar was cheaper.',
    when: { k: 'flag', scope: 'company', key: 'margin_kept', cmp: 'eq', v: true },
  },
  {
    id: 'k921',
    title: 'KILOMETER 921',
    desc: 'The tear was published with your name on it, when burying it was free.',
    when: { k: 'flag', scope: 'company', key: 's_transparent', cmp: 'eq', v: true },
  },
  {
    id: 'old_rivals',
    title: 'THE OLD RIVAL’S HAND',
    desc: 'Marcus Vale, who once tried to buy you, built the last road with you instead.',
    when: { k: 'flag', scope: 'company', key: 'marcus_alliance', cmp: 'eq', v: true },
  },
  {
    id: 'flagless',
    title: 'NO FLAG BUT WEATHER',
    desc: 'You refused the ministry and the garrison both. The cable answered to no one.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'refused_ministry', cmp: 'eq', v: true },
        { k: 'flag', scope: 'company', key: 'refused_garrison', cmp: 'eq', v: true },
      ],
    },
  },
  {
    id: 'room_held',
    title: 'THE ROOM HELD TWICE',
    desc: 'A board could not remove you. A planet could not seize you.',
    when: { k: 'flag', scope: 'company', key: 'treaty_won', cmp: 'eq', v: true },
  },
  {
    id: 'crew_owners',
    title: 'FOUR HUNDRED OWNERS',
    desc: 'The crews of FIRST RUNG bought their piece of the sky with their own wages.',
    when: { k: 'flag', scope: 'company', key: 'platform_paycut', cmp: 'eq', v: true },
  },
  {
    id: 'uprooted_badge',
    title: 'THE UPROOT',
    desc: 'You moved to the middle of the ocean and gave the build your whole life.',
    when: { k: 'flag', scope: 'company', key: 'uprooted', cmp: 'eq', v: true },
  },
  {
    id: 'people_road',
    title: 'A ROAD, NOT A PIPE',
    desc: 'Rated for people. Escape pods every hundred kilometers, on purpose.',
    when: { k: 'flag', scope: 'company', key: 'humans_rated', cmp: 'eq', v: true },
  },
]

export const SKYLINE: ChapterDef = {
  id: 'skyline',
  title: 'SKYLINE',
  tagline: 'The road up.',
  blurb:
    'A cable from the sea to orbit — the elevator that turns rocket launches into train schedules.',
  entry: 's_entry',
  insolvency: 's_insolvency',
  burnout: 's_burnout',
  opening: { treasury: 8000000, burn: 90000, revenue: 0 },
  prologue: PROLOGUE,
  dateline: '2042\nTHE ANCHOR SEA',
  score: 'hold',
  scenes: [...ACT_ONE, ...ACT_TWO, ...ACT_THREE, ...SURVIVAL, ...LATE_STUBS],
  endings: ENDINGS,
  signatures: SIGNATURES,
  achievements: ACHIEVEMENTS,
}
