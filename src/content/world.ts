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
    blurb: 'Nineteen years routing freight across three continents. Survived two bankruptcies that were somebody else’s fault.',
    hiddenTrait:
      'Keeps a private ranking of every founder she has backed — and quietly invests her own money in the ones she respects.',
  },
  tomas: {
    id: 'tomas',
    name: 'Tomás Reyes',
    role: 'Startup counsel',
    blurb: 'Contracts out of a converted shipping container downtown. Bills favors as diligently as hours.',
    hiddenTrait: 'His contact list is worth more than his contracts, and he knows it.',
  },
  june: {
    id: 'june',
    name: 'June Park',
    role: 'Angel investor',
    blurb: 'Eleven angel checks, an instinct she calls pattern-matching and everyone else calls luck.',
    hiddenTrait: 'Always keeps a Tuesday exit from any round she leads.',
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus Vale',
    role: 'VP Logistics Networks, MERIDIAN',
    blurb: 'Takes the stairs himself, which is his entire pitch.',
    hiddenTrait: 'Collects founders the way other men collect watches.',
  },
  corr: {
    id: 'corr',
    name: 'Office of Aerial Corridors',
    role: 'City permit authority (AI)',
    blurb: 'Rejects applications in 0.4 seconds and copies offices that may be invented.',
    hiddenTrait: 'Protects the city from embarrassment. Useful work goes in someone else’s file.',
  },
  sofia: {
    id: 'sofia',
    name: 'Sofia Brandt',
    role: 'Flight-controls engineer',
    blurb: 'Wrote the emergency-stop software for wind turbines. Treats altitude the way surgeons treat scalpels.',
    hiddenTrait: 'Ships only what she can personally stop.',
  },
  nadia: {
    id: 'nadia',
    name: 'Nadia Osei',
    role: 'Technology journalist',
    blurb: 'Writes the column founders read in private.',
    hiddenTrait: 'A source who feels used becomes a headline.',
  },
  dana: {
    id: 'dana',
    name: 'Dana Okafor',
    role: 'Former corridors commissioner',
    blurb: 'Ran the Office of Aerial Corridors for nine years before “spending more time with family.”',
    hiddenTrait: 'Knows exactly which rule each department is scared of.',
  },
  ray: {
    id: 'ray',
    name: 'Ray Freres',
    role: 'Owner, Fresno Aerostructures',
    blurb: 'Builds everyone’s drones, trusts very few people, delivers early anyway.',
    hiddenTrait: 'Keeps a handwritten ledger of every founder who paid late. Your place in it decides how warmly he answers.',
  },
  meilin: {
    id: 'meilin',
    name: 'Mei-Lin Chen',
    role: 'Struck by Shuttle Fourteen',
    blurb:
      'Fifty-eight. Thirty-one years at the same hospital. She was cycling home when version nine failed. You know her through what your company did to her.',
    hiddenTrait: 'Her silence is the point.',
  },
  marisol: {
    id: 'marisol',
    name: 'Mrs. Delgado',
    role: 'Landlady — Sudz & Spin',
    blurb: 'Owns the laundromat, the building, and the block’s collective memory. Your first believer.',
    hiddenTrait: 'Has quietly bankrolled half the street at one time or another. Everyone repays her by the second warning.',
  },
  vance: {
    id: 'vance',
    name: 'Elliot Vance',
    role: 'President, ATLAS Retail',
    blurb: 'Signs term sheets in coffee shops and means every one of them at the moment of signing.',
    hiddenTrait: 'Keeps a private folder titled SOMEDAY, PROPERLY — the founders he owes from deals killed by company rules.',
  },
  // ---- TELEPORT natives -------------------------------------------------------
  farrokh: {
    id: 'farrokh',
    name: 'Dr. Omid Farrokh',
    role: 'Cofounder · CTO',
    blurb:
      'Ex-JPL deep-space communications. Wrote a relay plan everyone praised while investors kept passing. Spent nine years being polite about it.',
    hiddenTrait: 'The relay math carries his name. He will burn the company down before he lets it carry a lie.',
  },
  hale: {
    id: 'hale',
    name: 'Conrad Hale',
    role: 'General Partner, ALEPH',
    blurb: 'The human face of an AI fund. Excellent manners, verdicts arrive pre-written.',
    hiddenTrait: 'Has always agreed with the model in public. Twice, in private, he was relieved when humans overruled it.',
  },
  aleph: {
    id: 'aleph',
    name: 'ALEPH',
    role: 'Investment fund (AI)',
    blurb: 'A fund run by a model and backed by humans. It has read everything you have ever signed.',
    hiddenTrait: 'It scores founders on one thing above all others. Their numbers have to match their sentences.',
  },
  cass: {
    id: 'cass',
    name: 'Cass Rivera',
    role: 'Chief teleoperator',
    blurb: 'Washed out of the astronaut corps on a medical. Runs machines at a distance better than anyone alive, and she knows what it cost her.',
    hiddenTrait: 'Keeps her rejected flight-suit patch in her toolbox. The mission name stays with her.',
  },
  salazar: {
    id: 'salazar',
    name: 'Cmdr. Ruth Salazar',
    role: 'Ops director, Shackleton Verge',
    blurb: 'Runs the Moon’s south pole like a harbor. Every docking, move, and breath runs through her list.',
    hiddenTrait: 'Writes a letter to the family of every worker on her base each January. The drafts stay private.',
  },
  jonah: {
    id: 'jonah',
    name: 'Jonah Reece',
    role: 'Maintenance tech, Shackleton Verge',
    blurb:
      'Thirty-four. Two tours at the pole, saving for a third. You know him through eleven seconds of sensor data.',
    hiddenTrait: 'His silence is the point.',
  },
  halcyon: {
    id: 'halcyon',
    name: 'HALCYON',
    role: 'Launch monopoly (AI-run)',
    blurb: 'Every kilogram that reaches orbit rides its rockets. It posts its prices, and the industry adjusts to them like weather.',
    hiddenTrait: 'Its model has already priced the day you become a competitor, and it is spending the wait preparing.',
  },
  ostra: {
    id: 'ostra',
    name: 'OSTRA',
    role: 'Orbital spectrum authority (AI)',
    blurb: 'Hands out orbital signal lanes in 0.4 seconds and copies treaty offices that may still use fax machines.',
    hiddenTrait: 'Protects its watch from embarrassment and keeps a long memory for companies that made it look bad.',
  },
  father: {
    id: 'father',
    name: 'Your Father',
    role: 'Retired machinist',
    blurb:
      'Sixty-nine. Kept every clipping — the good ones and the bad ones, in the same shoebox as your model rockets.',
    hiddenTrait: 'Kept pride quiet at home. Told every man at the union hall, every week, for years.',
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
