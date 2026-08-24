import type { ChapterDef, EndingDef, PrologueBeat } from '../schema'
import { ACT_ONE } from './act-one'
import { ACT_TWO } from './act-two'
import { ACT_THREE } from './act-three'
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
        'A year of consulting for people who want your scar tissue more than your ideas. You drive a delivery van for a competitor for three months, just to learn their routes from the inside. The cards from sixty porches live in a shoebox you do not explain to anyone. When the phone finally rings about something new, you are ready in a way that only failing teaches.',
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
    kicker: 'THE FLATS · 2031',
    title: 'A CITY OF OTHER PEOPLE’S MACHINES',
    prose:
      'The drones came first — MERIDIAN’s, a hundred thousand of them, blue and quiet, serving the hills where the tips are good. Downtown, gig couriers weave the last mile for wages that shrink yearly. The city runs on rails other people laid, going where other people’s profits point.\n\nYou have watched it from below for years. You have ideas about gravity.',
  },
  {
    kicker: 'A GARAGE ABOVE A LAUNDROMAT',
    title: 'HYPERCHUTE',
    prose:
      'A railway in the sky: autonomous shuttles that hold station above your home and drop what you ordered through a pneumatic tube, soft as rain, four minutes at a time. No drones over playgrounds. No couriers racing a stopwatch for rent money. A fixed line, a fair drop.\n\nOne prototype hangs from the ceiling on a braided tether. One hundred percent of the company is yours. For now.',
  },
]

export const HYPERCHUTE: ChapterDef = {
  id: 'hyperchute',
  title: 'HYPERCHUTE',
  tagline: 'A railway in the sky, built from a garage.',
  entry: 'h_entry',
  insolvency: 'h_insolvency',
  opening: { treasury: 120000, burn: 3800, revenue: 0 },
  prologue: PROLOGUE,
  scenes: [...ACT_ONE, ...ACT_TWO, ...ACT_THREE, ...LATE_STUBS],
  endings: ENDINGS,
}
