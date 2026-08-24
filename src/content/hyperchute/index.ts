import type { ChapterDef, EndingDef, PrologueBeat } from '../schema'
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
    scoreBonus: 12,
    skipYears: 2,
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
    title: 'DISSOLVED INTO BLUE',
    kind: 'sale',
    scoreBonus: 6,
    skipYears: 4,
    prose:
      'The tubes still run. They are painted MERIDIAN blue now, and they stop where the margins are best, not where people live. You are rich, which is not the same as right. The Flats keeps your sticker on the receiver sleeve anyway.',
    interlude: {
      kicker: 'INTERLUDE · FOUR YEARS',
      title: 'THE HANDCUFFS',
      prose:
        'Four years of vesting inside the company that buried you. A good office with your name on the door and no window. You watch MERIDIAN starve your corridors, then close them, then call it optimization. In the fourth winter you walk past your own old prototype in the lobby glass and realize the non-compete expired in June. You call June Park that night. She picks up before the first ring ends. “There you are,” she says. “What took you so long?”',
    },
  },
  {
    id: 'bankrupt',
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
    title: 'THE STACK BELONGS TO EVERYONE',
    kind: 'transformation',
    scoreBonus: 5,
    skipYears: 2,
    prose:
      'You publish everything: flight controller, tube spec, descent safety case. Within a year there are four hundred small railways over four hundred neighborhoods wearing different names. Yours is not one of them. That was the point.',
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
    prose:
      'You grew up in the Flats, under a sky that worked for someone else.\n\nThe drones came when you were nineteen — a hundred thousand of them, blue and quiet, sliding along invisible rails toward the hills where the tips are good. You learned to read their running lights the way other kids read constellations. They never stopped on your street. Nothing that flies ever stopped on your street.\n\nDown here, deliveries came the old way: a courier on a scratched-up e-bike, racing an algorithm’s stopwatch for rent money, and your neighbor Mrs. Okafor waiting forty minutes for a bus to bring back her insulin because the pharmacy quit stocking it. You watched all of it from below, every day, until watching started to feel like a decision you were making.',
  },
  {
    kicker: 'PROLOGUE · THE MACHINE',
    title: 'EIGHT YEARS INSIDE IT',
    prose:
      'You know exactly how the sky works, because for eight years it was your job.\n\nA dispatch floor, a MERIDIAN sub-contractor, a headset. MERIDIAN LOGISTICS NETWORKS: the ninety-one-billion-dollar colossus whose routing brain makes eleven million decisions a minute and whose executives mostly announce what it already decided. There was a T-shirt the managers wore on launch days — LOGISTICS IS A SOLVED PROBLEM — and for the hills, it was.\n\nOver your desk hung the planning map. Your whole neighborhood — your school, your mother’s block, the laundromat on the corner — sat inside a gray zone stamped LOW-DENSITY YIELD. Eight years, you stared at that stamp. A verdict, printed in helvetica, on every street you ever loved.',
  },
  {
    kicker: 'PROLOGUE · THE TUESDAY',
    title: 'EVERYTHING YOU HAD',
    prose:
      'You quit on a Tuesday. No speech. You left the headset on the desk and took the stairs.\n\nWhat you had: a severance check, an index fund, a car, half an apartment deposit, and an idea that would not leave you alone. You sold all of it except the idea — $120,000, everything you have ever been worth, moved into a company account that didn’t have a company yet.\n\nWhat you bought: a lease on a garage above the Sudz & Spin laundromat, four months of nights, and the parts. Dryer heat through the floorboards. Solder smoke. And slowly, on a braided tether under the ceiling, a machine taking shape — the thing you saw every night on the dispatch floor when you closed your eyes.',
  },
  {
    kicker: 'PROLOGUE · THE RAILWAY',
    title: 'SOFT AS RAIN',
    prose:
      'A railway in the sky. Not drones — a fixed line. Autonomous shuttles that hold station two hundred feet up and lower each parcel down a pneumatic tube to any porch with a receiver sleeve. Four minutes. Soft as rain. Priced like a bus ticket. No propellers over playgrounds, no stopwatch chewing up couriers — gravity, tamed, for the streets the machines forgot.\n\nAnd the plan is the part that makes you grin at 3 a.m.: start exactly where MERIDIAN refuses to go. One permitted corridor over one forgotten neighborhood. Sixty subscribing porches. Then the next street, then the next — until their LOW-DENSITY YIELD map is your empire, drawn in orange.\n\nLast night you filed the incorporation papers. HYPERCHUTE, INC. One hundred percent yours, worth exactly nothing.\n\nFor now.',
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
  scenes: [...ACT_ONE, ...ACT_TWO, ...ACT_THREE, ...SURVIVAL, ...LATE_STUBS],
  endings: ENDINGS,
}
