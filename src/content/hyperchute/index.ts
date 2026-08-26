import type { AchievementDef, ChapterDef, EndingDef, PrologueBeat, SignatureDef } from '../schema'
import { ACT_ONE } from './act-one'
import { ACT_TWO } from './act-two'
import { ACT_THREE } from './act-three'
import { SURVIVAL } from './survival'
import { LATE_STUBS } from './late-stubs'

const ENDINGS: readonly EndingDef[] = [
  {
    id: 'triumph_ipo',
    title: 'THE PEOPLE’S NETWORK',
    kind: 'triumph',
    art: 'world_bell',
    scoreBonus: 12,
    skipYears: 2,
    screens: [
      {
        art: 'world_roadshow',
        bg: 'roadshow',
        prose:
          'The night before the company goes public, the pricing call runs ninety minutes past midnight. The lead banker keeps circling the high share price with his pen — the one that makes headlines. You keep saying the lower one — the one that won’t wipe out the ordinary families who buy in, if the market turns ugly.\n\nWhen you say it out loud for the last time, the line goes quiet. Priya, on mute in the corner of your screen, closes her eyes like a woman hearing a bet she made years ago finally come in.',
      },
      {
        art: 'world_bell',
        bg: 'exchange',
        prose:
          'The exchange floor at 9:28 a.m. smells like carpet cleaner and adrenaline. Somebody hands you a paddle with your own ticker on it, and you realize your hands are steady for the first time in three years.\n\nMrs. Delgado stands at the podium rail in a borrowed coat, house slippers underneath, because at eighty-one she has earned the right to be comfortable at other people’s ceremonies. She holds the ceremonial button the way she once held your first rent envelope — like it belongs to the block.\n\nAt 9:31 she presses it. The bell is louder than you expected. It sounds like dryers.',
      },
      {
        art: 'world_dawn_flights',
        bg: 'wind',
        prose:
          'By the time the market closes, the railway in the sky belongs to teachers’ pension funds, to index funds, to a retired dispatcher in Ohio who bought eleven shares at lunch — and, printed right on the cover of the offering documents, where the lawyers fought you and lost, to THE NEIGHBORHOODS IT SERVES.\n\nOver the Flats that evening the shuttles hover exactly where they always have, dropping packages soft as rain onto porches that used to be a gray zone on somebody’s map. The map was wrong. You are the proof.',
      },
      {
        art: 'world_legend_clip',
        bg: 'corp',
        prose:
          'Somewhere in a MERIDIAN planning office, a printer hums out a new corridor map. The stamp over your neighborhood has changed. It doesn’t say LOW-DENSITY YIELD anymore.\n\nIt says COMPETITOR.',
      },
    ],
    prose:
      'HYPERCHUTE lists at 9:31 a.m. Mrs. Delgado holds the ceremonial button on the exchange floor, still wearing her house slippers under the borrowed coat. The railway in the sky belongs to the street it was built for — and to the founder who refused, in order: a giant, a discount, and common sense.',
    interlude: {
      kicker: 'INTERLUDE · TWO YEARS',
      title: 'THE BELL AND AFTER',
      prose:
        'Two years of board decks and quarterly smiles. You are rich in the way that gets quoted. The sky over the Flats is full of your shuttles and someone else’s ambitions, and every time one drops a parcel soft as rain you feel the itch of the next impossible thing. June answers on the first ring, the way she has since the beginning: “I knew it. What are we building?”',
    },
  },
  {
    id: 'acquired',
    art: 'end_acquired',
    title: 'DISSOLVED INTO BLUE',
    kind: 'sale',
    scoreBonus: 6,
    skipYears: 4,
    prose:
      'The tubes still run. They are painted MERIDIAN blue now, and they stop wherever the margins are best, which is rarely where anyone lives. You are rich. Some nights that feels like winning, and some nights you know better. The Flats keeps your sticker on the receiver sleeve anyway.',
    interlude: {
      kicker: 'INTERLUDE · FOUR YEARS',
      title: 'THE HANDCUFFS',
      prose:
        'Four years of vesting inside the company that buried you. A good office with your name on the door and no window. You watch MERIDIAN starve your corridors, then close them, then call it optimization. In the fourth winter you walk past your own old prototype in the lobby glass and realize the non-compete expired in June. You call June Park that night. She picks up before the first ring ends. “There you are,” she says. “What took you so long?”',
    },
  },
  {
    id: 'bankrupt',
    art: 'end_bankrupt',
    title: 'BANKRUPT BUT BELOVED',
    kind: 'noble',
    scoreBonus: 4,
    skipYears: 1,
    prose:
      'The receivers take the shuttles; nobody can repossess what the neighborhood saw. Sixty porches watched parcels fall out of the sky like weather that loved them. Doors close. Some of them stay unlocked.',
    interlude: {
      kicker: 'INTERLUDE · ONE YEAR',
      title: 'THE YEAR OF ODD JOBS',
      prose:
        'A year in your parents’ basement, consulting for people who want your scar tissue more than your ideas. Your old bedroom still has the model rockets; nobody says anything at dinner, which is its own kind of love. You drive a delivery van for a competitor for three months, just to learn their routes from the inside. The cards from sixty porches live in a shoebox you do not explain to anyone. When the phone finally rings about something new, you are ready in a way that only failing teaches.',
    },
  },
  {
    id: 'become_them',
    art: 'end_become_them',
    title: 'YOU BECAME WHAT YOU FOUGHT',
    kind: 'disgrace',
    scoreBonus: 3,
    skipYears: 5,
    prose:
      'The badge is heavy and gets lighter every year. Your old prototype hangs in the MERIDIAN lobby under glass, labeled HERITAGE ARTIFACT. Sometimes you ride past the laundromat in the black car and do not look up.',
    interlude: {
      kicker: 'INTERLUDE · FIVE YEARS',
      title: 'THE VIEW FROM INSIDE',
      prose:
        'Five years, three promotions, one division. You are very good at this, which is the problem. The corridors you once flew close in April, quietly, and the press release has your signature at the bottom because that is the job. At night, sometimes, you open the folder of things you would build if you were free. The non-compete runs out on a Tuesday. You are at June’s door Wednesday.',
    },
  },
  {
    id: 'walkaway_opensource',
    art: 'end_opensource',
    title: 'THE STACK BELONGS TO EVERYONE',
    kind: 'transformation',
    scoreBonus: 5,
    skipYears: 2,
    prose:
      'You publish everything: flight controller, tube spec, descent safety case. Within a year there are four hundred small railways over four hundred neighborhoods, every one wearing a different name, and none of them wearing yours. Which is exactly what you wanted.',
    interlude: {
      kicker: 'INTERLUDE · TWO YEARS',
      title: 'THE FOUNDATION',
      prose:
        'Two years keeping the foundation lean and the spec honest. Four hundred little skies, none of them yours. Then a postcard arrives from Cape Canaveral — relay satellites, launch windows, a handwritten line: THE NEXT RAILWAY DOESN’T STOP AT THE ATMOSPHERE. You know the handwriting. It used to be yours.',
    },
  },
]

const PROLOGUE: readonly PrologueBeat[] = [
  {
    kicker: 'PROLOGUE · 2031',
    title: 'THE CITY FROM BELOW',
    art: 'prologue_below',
    bg: 'street',
    prose:
      'You grew up in the Flats, the poor end of the city.\n\nWhen you were nineteen, the delivery drones arrived — a hundred thousand of them, blue and quiet, flying over your roof to the rich hills where the tips are good. Every kid on your block learned their blinking lights the way other kids learn constellations.\n\nThe drones never stopped on your street. Nothing that flies ever stopped on your street.',
  },
  {
    kicker: 'PROLOGUE · 2031',
    title: 'THE OLD WAY',
    art: 'prologue_street',
    prose:
      'In the Flats, deliveries still came the old way. A courier on a beat-up e-bike, racing a delivery app’s timer for rent money. Your neighbor Mrs. Okafor riding the bus forty minutes each way for her insulin, because the corner pharmacy closed.\n\nYou watched it every day. After a while, just watching started to feel like a choice you were making.',
  },
  {
    kicker: 'PROLOGUE · THE MACHINE',
    title: 'EIGHT YEARS INSIDE IT',
    art: 'prologue_dispatch',
    bg: 'dispatch',
    prose:
      'You know exactly how those drones work, because routing them was your job for eight years.\n\nA headset, a dispatch floor, a MERIDIAN subcontractor. MERIDIAN LOGISTICS NETWORKS — the ninety-one-billion-dollar giant whose routing computer makes eleven million decisions a minute, while the executives mostly announce whatever it already decided.\n\nOn launch days the managers wore a T-shirt: LOGISTICS IS A SOLVED PROBLEM. For the rich hills, it was.',
  },
  {
    kicker: 'PROLOGUE · THE MACHINE',
    title: 'THE VERDICT',
    art: 'prologue_map',
    prose:
      'Over your desk hung the company’s delivery map. Your whole neighborhood — your school, your mother’s block, the laundromat on the corner — sat inside a gray zone stamped LOW-DENSITY YIELD.\n\nThat’s company language for: not worth delivering to.\n\nYou stared at that stamp for eight years. A verdict, printed in clean corporate type, on every street you ever loved.',
  },
  {
    kicker: 'PROLOGUE · THE TUESDAY',
    title: 'EVERYTHING YOU HAD',
    art: 'prologue_garage',
    bg: 'garage',
    prose:
      'You quit on a Tuesday. No speech. You left the headset on the desk and took the stairs.\n\nThen you sold everything you owned. The savings, the car, half an apartment deposit — $120,000, everything you have ever been worth, moved into a company account that didn’t have a company yet.\n\nYou kept one thing: an idea that would not leave you alone.\n\nThe money bought a garage above the Sudz & Spin laundromat, four months of late nights, and a pile of parts. Dryer heat through the floorboards. Solder smoke. And slowly, hanging from a rope under the ceiling, a machine taking shape — the thing you saw every night when you closed your eyes on the dispatch floor.',
  },
  {
    kicker: 'PROLOGUE · THE RAILWAY',
    title: 'SOFT AS RAIN',
    art: 'prologue_corridor',
    bg: 'wind',
    prose:
      'The idea is a railway in the sky.\n\nSmall self-flying shuttles that park two hundred feet above the street, like train cars on an invisible track, and lower each package down a soft tube to any porch with a catch-sleeve. Four minutes from warehouse to doorstep. Soft as rain. Priced like a bus ticket.\n\nWhere MERIDIAN sends a swarm of drones, you run one quiet line — over the exact streets their map says are worthless.\n\nThat is the whole plan, and it makes you grin at 3 a.m.: start where MERIDIAN refuses to go. One approved air corridor over one forgotten neighborhood. Sixty paying porches. Then the next street, then the next — until their LOW-DENSITY YIELD map is your empire, drawn in orange.\n\nLast night you filed the papers. HYPERCHUTE, INC. One hundred percent yours, worth exactly nothing.\n\nFor now.',
  },
]

/** The decisions the whole player base gets measured on — the record screen
 *  renders "N% of founders …" from live tallies. Text completes that stem. */
const SIGNATURES: readonly SignatureDef[] = [
  { scene: 'h_seedling', choice: 0, text: 'took Mrs. Delgado’s cruise fund at one percent' },
  { scene: 'h_couriers', choice: 0, text: 'made the couriers full employees' },
  { scene: 'h_accident', choice: 0, text: 'grounded the fleet before the city could ask' },
  { scene: 'h_press_storm', choice: 0, text: 'handed Nadia the full fault report, on the record' },
  { scene: 'h_sofia_verdict', choice: 0, text: 'told Sofia to publish everything — she stayed' },
  { scene: 'h_offer', choice: 2, text: 'refused Marcus Vale’s two hundred million' },
  { scene: 'h_ipo_road', choice: 0, text: 'priced it honest and rang the bell' },
]

/** End-of-chapter badges, judged against final true state. Pure reads. */
const ACHIEVEMENTS: readonly AchievementDef[] = [
  {
    id: 'laundry_receipt',
    title: 'THE LAUNDRY RECEIPT',
    desc: 'Mrs. Delgado’s cruise fund is on your cap table.',
    when: { k: 'flag', scope: 'company', key: 'delgado_seed', cmp: 'eq', v: true },
  },
  {
    id: 'grounded_first',
    title: 'GROUNDED FIRST',
    desc: 'You stopped the fleet before anyone could make you.',
    when: { k: 'flag', scope: 'company', key: 'transparent', cmp: 'eq', v: true },
  },
  {
    id: 'version_ten',
    title: 'VERSION TEN',
    desc: 'Sofia stayed, and the fix shipped with her name on the commit.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'sofia_verdict', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'sofia_gone', cmp: 'eq', v: true } },
      ],
    },
  },
  {
    id: 'asked_properly',
    title: 'FIRST COMPANY TO ASK PROPERLY',
    desc: 'Every courier a W-2. The letter came back signed.',
    when: { k: 'flag', scope: 'company', key: 'couriers_ally', cmp: 'eq', v: true },
  },
  {
    id: 'never_saved',
    title: 'NEVER NEEDED SAVING',
    desc: 'No bridge, no down round, never a week in the red.',
    when: {
      k: 'all',
      of: [
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'bridge_used', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'down_used', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'insolvency_open', cmp: 'eq', v: true } },
      ],
    },
  },
  {
    id: 'street_saint',
    title: 'THE STREET REMEMBERS',
    desc: 'Credibility of +8 or better when the story closed.',
    when: { k: 'rep', cmp: 'gte', v: 8 },
  },
  {
    id: 'majority_founder',
    title: 'NEVER DILUTED OUT',
    desc: 'Walked out of chapter one still owning more than half.',
    when: { k: 'stake', who: 'founder', cmp: 'gte', v: 51 },
  },
  {
    id: 'bell_ringer',
    title: 'THE BELL',
    desc: 'Priced it honest. The people’s network went public.',
    when: { k: 'flag', scope: 'company', key: 'rang_bell', cmp: 'eq', v: true },
  },
]

export const HYPERCHUTE: ChapterDef = {
  id: 'hyperchute',
  title: 'HYPERCHUTE',
  tagline: 'A railway in the sky, built from a garage.',
  entry: 'h_seedling',
  insolvency: 'h_insolvency',
  burnout: 'h_burnout',
  opening: { treasury: 120000, burn: 3800, revenue: 0 },
  prologue: PROLOGUE,
  dateline: '2031\nTHE FLATS',
  scenes: [...ACT_ONE, ...ACT_TWO, ...ACT_THREE, ...SURVIVAL, ...LATE_STUBS],
  endings: ENDINGS,
  signatures: SIGNATURES,
  achievements: ACHIEVEMENTS,
}
