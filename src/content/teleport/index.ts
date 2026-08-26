import type { AchievementDef, ChapterDef, EndingDef, PrologueBeat, SignatureDef } from '../schema'
import { ACT_ONE } from './act-one'
import { ACT_TWO } from './act-two'
import { ACT_THREE } from './act-three'
import { SURVIVAL } from './survival'
import { LATE_STUBS } from './late-stubs'

const ENDINGS: readonly EndingDef[] = [
  {
    id: 'listing',
    title: 'THE HONEST DELAY',
    kind: 'triumph',
    art: 'end_t_listing',
    scoreBonus: 12,
    skipYears: 2,
    screens: [
      {
        art: 'world_listing',
        prose:
          'The pricing call is shorter this time. You have done this before, and the share price you keep repeating is the low, honest one — the price that will not wipe out the ordinary families who buy in if the market turns. The lead banker, who planned around the honest price from the start, closes her binder after twenty minutes and says, “I love a boring pricing call. They’re so rare.”',
      },
      {
        art: 'end_t_bell',
        prose:
          'The bell rings at 9:31, because you asked for the same minute on purpose.\n\nOn the podium: a CFO who waited through eleven companies to stand there as an operator, gripping the rail with both hands, and beside her the number 2.61, printed on the banner, the cofounder’s truth that made the whole thing possible. On the big board, under the ticker, where the exchange usually runs a slogan, you paid to keep one line:\n\nEVERY SESSION CARRIES 2.6 SECONDS OF LIGHT-SPEED HONESTY.',
      },
      {
        art: 'end_t_verge',
        prose:
          'At Shackleton Verge it is mid-shift, and nobody stops working for a bell on another world.\n\nCommander Salazar has the feed up in operations, sound off. At 9:31 Earth time he looks at the screen for four seconds — an eternity, from him — and says, to the room, to the bodies on the schedule, to the boring immortal work:\n\n“Back to it.”\n\nHigh praise. The highest.',
      },
      {
        art: 'end_t_chair',
        prose:
          'And in a strip-mall storefront in Ohio, a retired schoolteacher who owns eleven shares — bought at lunch, at the honest price — settles into the chair for her anniversary session.\n\nTwo point six seconds later, on the oldest light in the solar system, a hand rises against the small blue coin of the Earth.\n\nIt waves.',
      },
    ],
    prose:
      'TELEPORT lists at 9:31 a.m. at the honest price, with the delay printed on the cover of the listing papers. The company that told the truth about distance now belongs to the people who crossed it — teachers’ pensions, index funds, and a schoolteacher in Ohio with eleven shares.',
    interlude: {
      kicker: 'INTERLUDE · TWO YEARS',
      title: 'THE VIEW FROM ALTITUDE',
      prose:
        'Two years of quarterly earnings calls and glass offices, rich enough that strangers quote your net worth at parties. The satellite ring grows, the chairs multiply, and the maintenance shifts hum along above you with your name on their chest. At conferences and in green rooms, the same rumor keeps finding you: a new company is forming around the oldest dream in the space business — a space elevator. A real one. A cable from the ground to orbit, with cargo cars climbing it like trains. Goods first, humans someday. They are calling it a skyline. They keep asking one question in every room where your name comes up: who alive has built a road between worlds and told the truth about it twice?',
    },
  },
  {
    id: 'swallowed',
    title: 'SWALLOWED BY THE SKY',
    kind: 'sale',
    art: 'end_t_swallowed',
    scoreBonus: 6,
    skipYears: 3,
    prose:
      'The satellite ring changes its names overnight. The bodies at the Verge get repainted and keep working. The storefront chairs move into HALCYON pavilions, where the line moves faster and the magic feels like nothing. You are wealthy in the way the model predicted, to the dollar. Up at the pole, the shifts keep running as if nothing happened, because for the machines, nothing did.',
    interlude: {
      kicker: 'INTERLUDE · THREE YEARS',
      title: 'INSIDE THE MANIFEST',
      prose:
        'Three years of merger committees and a fancy title that means retired without saying the word. You watch the monopoly run your road the way monopolies run everything: efficiently, joylessly, and only where the margins live. The Verge contract survives. The honest counter gets removed. In the third spring, your ban on competing ends quietly on a Tuesday. That same week, a company planning to build a space elevator — an actual cable from the ground to space — sends three people to your kitchen table. They know exactly what you sold and exactly what it cost. “Help us build the one thing,” they say, “that no launch schedule can bump.”',
    },
  },
  {
    id: 'bankrupt',
    title: 'FORTY FALLING STARS',
    kind: 'noble',
    art: 'end_t_stars',
    scoreBonus: 4,
    skipYears: 1,
    prose:
      'The bankruptcy people can take the desks and the patents, but nobody can repossess an orbit. So the satellites come down on schedule instead — brought down one by one over six weeks, each a streak of light across somebody’s evening. The last one is visible from the Flats. People come out onto porches that once caught falling packages and watch a company become a meteor shower. People who saw it have never once called it a failure.',
    interlude: {
      kicker: 'INTERLUDE · ONE YEAR',
      title: 'THE YEAR OF LETTERS',
      prose:
        'A year of wind-down paperwork and unexpected mail. The company died owing nothing, and your own accounts survived it. The buyout money from the Hyperchute years was never in the company. And consulting pays absurdly well when every space agency on Earth wants to learn how you ran remote operations. Operators write to say the training program got them hired at three agencies. A letter arrives from Shackleton Verge in January. Commander Salazar’s annual letters, it turns out, include companies he considered crew. In the spring, a fat envelope arrives from a group you have never heard of. Inside is a study for a space elevator and a sticky note in an engineer’s hand: WE READ THE ELEVEN SECONDS. WE WANT PEOPLE WHO PUBLISH. CALL US.',
    },
  },
  {
    id: 'puppet',
    title: 'THE PUPPET SHOW',
    kind: 'disgrace',
    art: 'end_t_puppet',
    scoreBonus: 3,
    skipYears: 4,
    prose:
      'The seamless story prices at the seamless number and makes everyone rich, especially you. The machines guess beautifully, the customers never learn which motions were theirs, and the counter that once hung by a hangar door sits in a collector’s lobby with the date wrong on the plaque. All of it works exactly as sold. The machines do exactly what the customers see. The guessing stays secret, and you settled that question years ago.',
    interlude: {
      kicker: 'INTERLUDE · FOUR YEARS',
      title: 'THE MANAGED ENVIRONMENT',
      prose:
        'Four years of earnings calls where the word “delay” never appears. The stock performs. The settlements stay sealed. Nadia Osei’s book about the presence era has a chapter with your name on it, and you have never read past its first page. At night, sometimes, you sit in a chair no customer uses anymore — honest mode, the counter running — and watch a robot hand on the Moon copy yours, 2.6 truthful seconds late. In the fourth year, a company planning a space elevator calls. They need money and they need a famous name, and they are flexible about the order.',
    },
  },
  {
    id: 'ousted',
    title: 'REMOVED FOR CAUSE',
    kind: 'ousted',
    art: 'end_t_ousted',
    scoreBonus: 4,
    skipYears: 2,
    prose:
      'The company you founded in a hangar with a cardboard box of physics continues without you, professionally managed and model-approved. Your badge photo comes down. The framed 2.61, if it still hung anywhere, goes to storage. June resigns the same afternoon, in a two-line letter the trade press quotes for years. The satellite ring flies on over the pole, wearing your decisions and someone else’s name.',
    interlude: {
      kicker: 'INTERLUDE · TWO YEARS',
      title: 'THE WILDERNESS',
      prose:
        'Two years of being the cautionary tale at other people’s board dinners. Here is what the board could not take: your shares. They fired you from the job, never from the ownership, and in the second year you quietly sell a piece of your stake back to the company — millions in the bank, wired by the same people who removed you. You watch your company from the outside after that — the launches you planned, the storefronts you picked, the professional CEO running your roadmap well and calling it a turnaround. June calls every Sunday. Omid sends exactly one message, on the anniversary: THE NUMBER IS STILL THE PRODUCT. In the second spring, a company planning to build a space elevator — a cable from the ground straight up to orbit — asks to meet. They are not shopping for a company to buy. They flew here to recruit you. “The board that fired you,” their chair says, “published its reasoning. We read it twice. We concluded we were reading a reference letter.”',
    },
  },
  {
    id: 'commons',
    title: 'THE CASCADE BELONGS TO EVERYONE',
    kind: 'transformation',
    art: 'end_t_commons',
    scoreBonus: 5,
    skipYears: 2,
    prose:
      'The shared rules go to the standards body with the patents attached, free forever. Within eighteen months, cascade relays circle the Moon wearing eleven flags and four languages, all honest to the millisecond, because the rules you donated make lying a violation. The company becomes one builder among many, smaller and prouder. The number belongs to everyone now, which is why you gave it away.',
    interlude: {
      kicker: 'INTERLUDE · TWO YEARS',
      title: 'THE KEEPER OF THE SPEC',
      prose:
        'Two years chairing a standards body — the most powerful boring job in the solar system. The company you kept is smaller now, and still yours, and still profitable, which quietly makes you wealthier every quarter the cascade grows. Agencies defer to you. Monopolies comply with you, slowly, filing objections you answer with citations. The cascade carries presence to the Moon under every flag there is. At the second annual meeting, a team of engineers corners you with feasibility studies and a gleam you recognize from a hangar, years ago. They want to build a space elevator — a cable from the ground to orbit that no launch schedule can bump and no monopoly can own, if someone builds it as public property from the first bolt. “You gave away a protocol,” they say. “Come give away an elevator.”',
    },
  },
]

const PROLOGUE: readonly PrologueBeat[] = [
  {
    kicker: 'PROLOGUE',
    title: 'THE ITCH',
    art: 'prologue_t_itch',
    prose:
      'It starts with looking up, the way it always has.\n\nThe last company is over, and whatever it paid you in money and cost you in scars, one thing came through untouched: the itch. You catch yourself at windows. You read launch schedules the way other people read box scores. The sky over every city you visit is full of other people’s machines moving other people’s cargo. The one thing you cannot stop thinking about is still up there, waiting.',
  },
  {
    kicker: 'PROLOGUE',
    title: 'THE PROBLEM',
    art: 'prologue_t_problem',
    prose:
      'There are people on the Moon now. Bases, crews, contracts, a working pole. Every hour of human work up there costs a fortune and risks a life. Down here, the best machine operators alive sit in chairs, ready to help. Light itself needs 1.3 seconds to reach the Moon, and 1.3 more to come back. Radio moves at that speed too. A hand on the Moon will always answer 2.6 seconds behind the person driving it.\n\nEveryone in the industry says that gap kills remote work. Too laggy to trust. Too dangerous to sell.\n\nEveryone said your last impossible thing was impossible too.',
  },
  {
    kicker: 'PROLOGUE',
    title: 'THE THESIS',
    art: 'prologue_t_thesis',
    prose:
      'Then someone sends you a nine-year-old research paper. Four hundred pages. Self-published, because no science journal would print math that long.\n\nThe idea inside it is a chain of relay satellites between Earth and Moon, each one handing the signal to the next like firefighters passing buckets. Built right, the chain keeps every handoff clean. The Moon comes down to a guaranteed 2.6 seconds — the smallest delay the laws of physics allow.\n\nThe author spent nine years being politely refused by every agency and fund in the industry. His name is Dr. Omid Farrokh. In the margin of page one, in careful engineer’s handwriting, he has written: THE DELAY IS THE PROOF. PRETENDING IS THE ENEMY.',
  },
  {
    kicker: 'PROLOGUE',
    title: 'THE CAPE',
    art: 'prologue_t_cape',
    prose:
      'You lease the hangar over the phone, sight unseen, from a county desperate to rent history: Cape Canaveral, the old coast, where the road to space has started for a hundred years.\n\nYou have whatever the last life paid out, a lease, and a Tuesday meeting with a man carrying his life’s work in a cardboard box.\n\nYou are buying a chair on Earth, a body on the Moon, and the two point six seconds in between — sold honest, all the way through.\n\nLast night you filed the papers for a company called TELEPORT, INC., and its whole promise fits in four words.\n\nBe there without going.',
  },
]

/** The decisions the whole player base gets measured on. */
const SIGNATURES: readonly SignatureDef[] = [
  { scene: 't_pact', choice: 0, text: 'split the company fifty-fifty with Dr. Farrokh' },
  { scene: 't_june_condition', choice: 0, text: 'welcomed June Park as the third founder' },
  { scene: 't_expo_demo', choice: 0, text: 'named the delay out loud on the expo floor' },
  { scene: 't_blend_debate', choice: 0, text: 'sold the honest delay and made the gap the brand' },
  { scene: 't_telemetry', choice: 0, text: 'published the eleven seconds and grounded themselves' },
  { scene: 't_coup_move', choice: 0, text: 'fought the boardroom coup at the head of the table' },
  { scene: 't_halcyon_offer', choice: 1, text: 'refused HALCYON’s three hundred and forty million' },
]

/** End-of-chapter badges, judged against final true state. Pure reads. */
const ACHIEVEMENTS: readonly AchievementDef[] = [
  {
    id: 'even_pact',
    title: 'EVEN PARTNERS',
    desc: 'Fifty-fifty with the man who brought the physics.',
    when: { k: 'flag', scope: 'company', key: 'pact_even', cmp: 'eq', v: true },
  },
  {
    id: 'third_founder',
    title: 'THE THIRD FOUNDER',
    desc: 'June Park came back inside — CFO, cofounder, board seat.',
    when: { k: 'flag', scope: 'company', key: 'june_seat', cmp: 'eq', v: true },
  },
  {
    id: 'number_wall',
    title: 'THE NUMBER ON THE WALL',
    desc: 'You named the delay out loud with the whole industry watching.',
    when: { k: 'flag', scope: 'company', key: 'delay_named', cmp: 'eq', v: true },
  },
  {
    id: 'eleven_seconds',
    title: 'THE ELEVEN SECONDS',
    desc: 'The full log went to the family, the base, and the world — marked in your own hand.',
    when: { k: 'flag', scope: 'company', key: 't_transparent', cmp: 'eq', v: true },
  },
  {
    id: 'held_room',
    title: 'HELD THE ROOM',
    desc: 'The model moved against you in your worst season. The board you built said no.',
    when: { k: 'flag', scope: 'company', key: 'coup_survived', cmp: 'eq', v: true },
  },
  {
    id: 'clean_money',
    title: 'NEVER TOOK THE MODEL’S CHECK',
    desc: 'No ALEPH round, no Hale seat, no coup. Revenue was the round.',
    when: { k: 'flag', scope: 'company', key: 'no_aleph', cmp: 'eq', v: true },
  },
  {
    id: 'still_partners',
    title: 'STILL PARTNERS',
    desc: 'Dr. Farrokh was whole when the chapter closed — the pact outlived the pressure.',
    when: {
      k: 'any',
      of: [
        { k: 'flag', scope: 'company', key: 'farrokh_stays', cmp: 'eq', v: true },
        { k: 'flag', scope: 'company', key: 'farrokh_mended', cmp: 'eq', v: true },
      ],
    },
  },
  {
    id: 'her_chair',
    title: 'THE CHAIR',
    desc: 'Cass Rivera built your operator corps and was never once made the excuse.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'cass_chief', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'blamed_cass', cmp: 'eq', v: true } },
      ],
    },
  },
  {
    id: 'second_bell',
    title: 'THE SECOND BELL',
    desc: 'Two companies, two honest prices, one founder.',
    when: { k: 'flag', scope: 'company', key: 'rang_bell_t', cmp: 'eq', v: true },
  },
]

export const TELEPORT: ChapterDef = {
  id: 'teleport',
  title: 'TELEPORT',
  tagline: 'Be there without going.',
  blurb:
    'Relay satellites that let people on Earth work on the Moon in real time, through bodies that wait on the surface.',
  entry: 't_entry',
  insolvency: 't_insolvency',
  burnout: 't_burnout',
  opening: { treasury: 240000, burn: 9000, revenue: 0 },
  prologue: PROLOGUE,
  dateline: 'YEARS LATER\nTHE CAPE',
  scenes: [...ACT_ONE, ...ACT_TWO, ...ACT_THREE, ...SURVIVAL, ...LATE_STUBS],
  endings: ENDINGS,
  eras: [
    { when: { k: 'seen', scene: 't_endgame' }, mood: 'endgame' },
    { when: { k: 'seen', scene: 't_coup_move' }, mood: 'siege' },
    { when: { k: 'seen', scene: 't_jonah' }, mood: 'aftermath' },
    { when: { k: 'seen', scene: 't_cut_first_light' }, mood: 'hustle' },
  ],
  signatures: SIGNATURES,
  achievements: ACHIEVEMENTS,
}
