import type { CharacterDef, Content } from './schema'
import { HYPERCHUTE } from './hyperchute'
import { TELEPORT } from './teleport'
import { SKYLINE } from './skyline'

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
    blurb: 'Washed out of the astronaut corps on a medical. Runs machines at a distance better than anyone alive, and he knows what it cost him.',
    hiddenTrait: 'Keeps his rejected flight-suit patch in his toolbox. The mission name stays with him.',
  },
  salazar: {
    id: 'salazar',
    name: 'Cmdr. Rafael Salazar',
    role: 'Ops director, Shackleton Verge',
    blurb: 'Runs the Moon’s south pole like a harbor. Every docking, move, and breath runs through his list.',
    hiddenTrait: 'Writes a letter to the family of every worker on his base each January. The drafts stay private.',
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
  // ---- SKYLINE natives ----------------------------------------------------------
  anders: {
    id: 'anders',
    name: 'Anders Voss',
    role: 'Chief cable engineer',
    blurb: 'Built bridges for thirty years before anyone let him build one standing up. Talks to the cable like it can hear him.',
    hiddenTrait: 'He has walked away from two projects in his life, both times over a safety margin. Both projects later failed exactly the way he said they would.',
  },
  mateo: {
    id: 'mateo',
    name: 'Mateo Reyes',
    role: 'Chief of staff',
    blurb: 'Grew up in the Flats catching your packages as a kid. Twenty-nine now, and runs your world like air traffic control.',
    hiddenTrait: 'Keeps a photo on his desk of a porch with a delivery tube on it. He has never told you it is his grandmother’s porch.',
  },
  okonkwo: {
    id: 'okonkwo',
    name: 'Ambassador Okonkwo',
    role: 'Chair, World Orbital Commission',
    blurb: 'Thirty years of treaty work have left him fair, patient, and immune to charm — the one judge money cannot reach.',
    hiddenTrait: 'He reads every safety report himself, in full, at night. He has caught three lies that way, and never says which ones.',
  },
  reyescain: {
    id: 'reyescain',
    name: 'Admiral Reyes-Cain',
    role: 'Orbital Defense Command',
    blurb: 'Wants the elevator under military protection. Every offer he makes is real, generous, and shaped like a cage.',
    hiddenTrait: 'He genuinely believes he is saving you, which is what makes him dangerous.',
  },
  rashid: {
    id: 'rashid',
    name: 'Sheikh Rashid al-Mansour',
    role: 'Chairman, Aurelia Sovereign Fund',
    blurb: 'Runs nine hundred billion dollars of oil money hunting for the post-oil century. Quotes your old interviews back at you, warmly, from memory.',
    hiddenTrait: 'He is a true believer who would spend everything he controls to prove a country can be founded like a startup.',
  },
  volkov: {
    id: 'volkov',
    name: 'Katarina Volkov',
    role: 'Deputy chairman, Aurelia',
    blurb: 'Spent fifteen years writing debt deals for struggling countries. Now she writes constitutions, and hers always contain an exit clause that is never for you.',
    hiddenTrait: 'She has already gamed out your next three moves. Her notebooks are numbered, and she is on notebook forty-one.',
  },
  calloway: {
    id: 'calloway',
    name: 'Senator Ruth Calloway',
    role: 'Chair, Senate Committee on Orbital Infrastructure',
    blurb: 'Shakes your hand warmly in public. Wants an American elevator or no elevator at all.',
    hiddenTrait: 'She co-wrote the first draft of the seizure treaty. Her name appears nowhere on it.',
  },
  chen: {
    id: 'chen',
    name: 'Ambassador Chen Jiang',
    role: 'Head of the rival bloc’s delegation',
    blurb: 'His country is building its own elevator, two years behind yours. He tells you this to your face, over dinner, with complete honesty.',
    hiddenTrait: 'He respects exactly one thing: people who speak to him as plainly as he speaks to them. His reports home say more than his speeches.',
  },
  anneke: {
    id: 'anneke',
    name: 'Anneke Voss',
    role: 'Director of Government Affairs, HALCYON',
    blurb: 'The human hand behind the lobbying money that wants your cable dead. She is also Anders’s estranged sister.',
    hiddenTrait: 'She keeps a photo of a bridge her brother built, and she has never once crossed it.',
  },
  aurelia: {
    id: 'aurelia',
    name: 'AURELIA',
    role: 'Sovereign fund, then venture-state',
    blurb: 'It began as a nine-hundred-billion-dollar fund. Then it bought territory, wrote a constitution, and raised a flag.',
    hiddenTrait: 'Its constitution is a term sheet and its citizens are shareholders. If it wins, its founding myth will be you.',
  },
}

export const CONTENT: Content = {
  characters: CHARACTERS,
  chapters: {
    hyperchute: HYPERCHUTE,
    teleport: TELEPORT,
    skyline: SKYLINE,
  },
}
