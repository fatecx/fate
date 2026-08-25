import type { CharacterDef, Content } from './schema'
import { HYPERCHUTE } from './hyperchute'
import { TELEPORT } from './teleport'
import { SKYLINE } from './skyline'
import { ESCAPE } from './escape'

/**
 * The recurring cast. Relationships persist across the whole biography;
 * hidden traits are engine-inert until the consult mechanic ships.
 */
const CHARACTERS: Record<string, CharacterDef> = {
  priya: {
    id: 'priya',
    name: 'Priya Raghavan',
    role: 'Veteran logistics advisor',
    blurb: 'Nineteen years routing freight across three continents; survived two bankruptcies that were not her fault.',
    tease: 'Freight people still call one retired routing legend first — when she picks up.',
    hiddenTrait:
      'Keeps a private ranking of every founder she has backed — and quietly invests her own money in the ones she respects.',
  },
  tomas: {
    id: 'tomas',
    name: 'Tomás Reyes',
    role: 'Startup counsel',
    blurb: 'Contracts out of a converted shipping container downtown. Bills favors as diligently as hours.',
    tease: 'There’s a lawyer downtown who bills favors as diligently as hours.',
    hiddenTrait: 'The rolodex is the real product; the law is the packaging.',
  },
  june: {
    id: 'june',
    name: 'June Park',
    role: 'Angel investor',
    blurb: 'Eleven angel checks, an instinct she calls pattern-matching and everyone else calls luck.',
    tease: 'An angel with eleven checks out and an instinct nobody can name.',
    hiddenTrait: 'Never leads a round she cannot abandon by Tuesday.',
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus Vale',
    role: 'VP Logistics Networks, MERIDIAN',
    blurb: 'Takes the stairs himself, which is his entire pitch.',
    tease: 'Someone in a very tall blue building has started asking about you.',
    hiddenTrait: 'Collects founders the way other men collect watches.',
  },
  corr: {
    id: 'corr',
    name: 'Office of Aerial Corridors',
    role: 'City permit authority (AI)',
    blurb: 'Denies applications in 0.4 seconds and cc’s departments that may be invented.',
    tease: 'The city runs a machine that says no in 0.4 seconds. Every founder meets it eventually.',
    hiddenTrait: 'Optimizes for incident-free optics, not throughput.',
  },
  sofia: {
    id: 'sofia',
    name: 'Sofia Brandt',
    role: 'Flight-controls engineer',
    blurb: 'Wrote kill-switch software for wind turbines; treats altitude the way surgeons treat scalpels.',
    tease: 'The best flight-controls engineer in the state is rumored to be bored.',
    hiddenTrait: 'Will not ship anything she cannot personally stop.',
  },
  nadia: {
    id: 'nadia',
    name: 'Nadia Osei',
    role: 'Technology journalist',
    blurb: 'Writes the column founders pretend not to read.',
    tease: 'Somebody writes the column founders pretend not to read.',
    hiddenTrait: 'A source who feels used becomes a headline.',
  },
  dana: {
    id: 'dana',
    name: 'Dana Okafor',
    role: 'Former corridors commissioner',
    blurb: 'Ran the Office of Aerial Corridors for nine years before “spending more time with family.”',
    tease: 'A former commissioner walks her dog past the office she used to run, they say.',
    hiddenTrait: 'Knows exactly which clause in which annex each department is afraid of.',
  },
  ray: {
    id: 'ray',
    name: 'Ray Freres',
    role: 'Owner, Fresno Aerostructures',
    blurb: 'Builds everyone’s drones, trusts almost nobody, delivers early anyway.',
    tease: 'Out in Fresno, a man builds everyone’s aircraft and trusts almost nobody.',
    hiddenTrait: 'Keeps a hand-written ledger of every founder who paid late. You are on it, or you are not.',
  },
  marisol: {
    id: 'marisol',
    name: 'Mrs. Delgado',
    role: 'Landlady — Sudz & Spin',
    blurb: 'Owns the laundromat, the building, and the block’s collective memory. Your first believer.',
    tease: 'The landlady downstairs knows more about this block than the city does.',
    hiddenTrait: 'Has quietly bankrolled half the street at one time or another. Nobody has ever missed a payment to her twice.',
  },
  vance: {
    id: 'vance',
    name: 'Elliot Vance',
    role: 'President, ATLAS Retail',
    blurb: 'Signs term sheets in coffee shops and means every one of them at the moment of signing.',
    tease: 'A retail president is said to sign term sheets in coffee shops — and mean them.',
    hiddenTrait: 'Keeps a private folder titled SOMEDAY, PROPERLY — the founders he owes from the deals compliance killed.',
  },
}

export const CONTENT: Content = {
  characters: CHARACTERS,
  chapters: {
    hyperchute: HYPERCHUTE,
    teleport: TELEPORT,
    skyline: SKYLINE,
    escape: ESCAPE,
  },
}
