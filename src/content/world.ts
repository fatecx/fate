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
    hiddenTrait:
      'Keeps a private ranking of every founder she has backed — and quietly invests her own money in the ones she respects.',
  },
  tomas: {
    id: 'tomas',
    name: 'Tomás Reyes',
    role: 'Startup counsel',
    blurb: 'Contracts out of a converted shipping container downtown. Bills favors as diligently as hours.',
    hiddenTrait: 'The rolodex is the real product; the law is the packaging.',
  },
  june: {
    id: 'june',
    name: 'June Park',
    role: 'Angel investor',
    blurb: 'Eleven angel checks, an instinct she calls pattern-matching and everyone else calls luck.',
    hiddenTrait: 'Never leads a round she cannot abandon by Tuesday.',
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
    blurb: 'Denies applications in 0.4 seconds and cc’s departments that may be invented.',
    hiddenTrait: 'Optimizes for incident-free optics, not throughput.',
  },
  sofia: {
    id: 'sofia',
    name: 'Sofia Brandt',
    role: 'Flight-controls engineer',
    blurb: 'Wrote kill-switch software for wind turbines; treats altitude the way surgeons treat scalpels.',
    hiddenTrait: 'Will not ship anything she cannot personally stop.',
  },
  nadia: {
    id: 'nadia',
    name: 'Nadia Osei',
    role: 'Technology journalist',
    blurb: 'Writes the column founders pretend not to read.',
    hiddenTrait: 'A source who feels used becomes a headline.',
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
