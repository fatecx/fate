import type { ChapterDef, EndingDef } from '../schema'
import { ACT_ONE } from './act-one'
import { LATE_STUBS } from './late-stubs'

const ENDINGS: readonly EndingDef[] = [
  {
    id: 'triumph_ipo',
    title: 'THE PEOPLE’S NETWORK',
    kind: 'triumph',
    scoreBonus: 12,
    prose:
      'HYPERCHUTE lists at 9:31 a.m. Mrs. Delgado holds the ceremonial button on the exchange floor, still wearing her house slippers under the borrowed coat. The railway in the sky belongs to the street it was built for — and to the founder who refused, in order: a giant, a discount, and common sense.',
  },
  {
    id: 'acquired',
    title: 'DISSOLVED INTO BLUE',
    kind: 'sale',
    scoreBonus: 6,
    prose:
      'The tubes still run. They are painted MERIDIAN blue now, and they stop where the margins are best, not where people live. You are rich, which is not the same as right. The Flats keeps your sticker on the receiver sleeve anyway.',
  },
  {
    id: 'bankrupt',
    title: 'BANKRUPT BUT BELOVED',
    kind: 'noble',
    scoreBonus: 4,
    prose:
      'The receivers take the shuttles; nobody can repossess what the neighborhood saw. Sixty porches watched parcels fall out of the sky like weather that loved them. Doors close. Some of them stay unlocked.',
  },
  {
    id: 'become_them',
    title: 'YOU BECAME WHAT YOU FOUGHT',
    kind: 'disgrace',
    scoreBonus: 3,
    prose:
      'The badge is heavy and gets lighter every year. Your old prototype hangs in the MERIDIAN lobby under glass, labeled HERITAGE ARTIFACT. Sometimes you ride past the laundromat in the black car and do not look up.',
  },
  {
    id: 'walkaway_opensource',
    title: 'THE STACK BELONGS TO EVERYONE',
    kind: 'transformation',
    scoreBonus: 5,
    prose:
      'You publish everything: flight controller, tube spec, descent safety case. Within a year there are four hundred small railways over four hundred neighborhoods wearing different names. Yours is not one of them. That was the point.',
  },
]

export const HYPERCHUTE: ChapterDef = {
  id: 'hyperchute',
  title: 'HYPERCHUTE',
  tagline: 'A railway in the sky, built from a garage.',
  entry: 'h_entry',
  insolvency: 'h_insolvency',
  opening: { treasury: 120000, burn: 3800, revenue: 0 },
  scenes: [...ACT_ONE, ...LATE_STUBS],
  endings: ENDINGS,
}
