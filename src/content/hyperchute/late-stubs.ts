import type { SceneDef } from '../schema'

/**
 * HYPERCHUTE — engine ladders (shared by every act): insolvency and burnout.
 * First trigger opens the authored scene; a second trigger ends the chapter.
 */
export const LATE_STUBS: readonly SceneDef[] = [
  {
    id: 'h_insolvency',
    ambience: 'night',
    mood: 'dread',
    art: 'world_runway_zero',
    landmark: true,
    title: 'RUNWAY ZERO',
    leadIn:
      'The warning signs were there for months. Then Tuesday comes, and the banking app’s balance turns a color you have never seen before.',
    prose:
      'Payroll bounces, and the bank’s notice sounds almost sorry about it. The inbox goes quiet the way it only goes quiet for founders out of money. HYPERCHUTE has weeks left, maybe less. A few doors remain open, and all of them are ugly.',
    choices: [
      {
        label: 'Bridge loan against everything',
        requires: { k: 'not', p: { k: 'flag', scope: 'company', key: 'bridge_used', cmp: 'eq', v: true } },
        effects: [
          { e: 'treasury', d: 40000 },
          { e: 'stress', d: 12 },
          { e: 'flag', scope: 'company', key: 'bridge_used', v: true },
        ],
        result:
          'Signed at 11 p.m., against the patents, the shuttles, and — if you read the paperwork twice — the tube itself.',
      },
      {
        label: 'Down round — June doubles down on you',
        requires: {
          k: 'all',
          of: [
            { k: 'met', who: 'june' },
            { k: 'not', p: { k: 'flag', scope: 'company', key: 'down_used', cmp: 'eq', v: true } },
          ],
        },
        effects: [
          { e: 'treasury', d: 90000 },
          { e: 'stake', who: 'june', d: 10 },
          { e: 'rel', who: 'june', resp: 2 },
          { e: 'stress', d: 10 },
          { e: 'flag', scope: 'company', key: 'down_used', v: true },
          { e: 'flag', scope: 'company', key: 'june_board', v: true },
        ],
        result:
          'The round died this morning. The lead investor walked away before signing, and the rest scattered. You call June so she hears it from you first. She listens to the whole thing and says, “Then I’m in for my share anyway.” The price gets sweeter for her, and she gets a board seat. She showed up when the term sheet failed. Worth it. You both call it business.',
      },
      {
        label: 'Acqui-hire to MERIDIAN: the team survives, the dream ends',
        requires: { k: 'met', who: 'marcus' },
        effects: [{ e: 'end', ending: 'acquired' }],
        result:
          'MERIDIAN takes the engineers, the patents, and the domain name. The railway becomes a slide in someone else’s deck.',
      },
      {
        label: 'Surrender',
        effects: [{ e: 'end', ending: 'bankrupt' }],
        result:
          'You pay the final invoices from personal savings. Sixty customers send cards. The Flats still calls it the railway.',
      },
    ],
  },
  {
    id: 'h_burnout',
    ambience: 'night',
    mood: 'aftermath',
    art: 'world_burnout',
    title: 'THE BODY KEEPS SCORE',
    landmark: true,
    leadIn:
      'It starts politely. You miss an exit on a road you drive every day. You read the same sentence four times. Coffee does nothing. Then one morning your hands shake over the keyboard and you cannot remember when you started crying.',
    prose:
      'Sofia would call it a fault cascade. Priya would call it the thing that kills founders faster than money runs out. The mirror keeps it simpler. The whole company depends on one exhausted body. Something gives this week. You choose what.',
    choices: [
      {
        label: 'Three weeks somewhere with no sky traffic. Doctor\u2019s orders.',
        effects: [
          { e: 'stress', d: -45 },
          { e: 'treasury', d: -6000 },
          { e: 'flag', scope: 'company', key: 'burnout_rested', v: true },
        ],
        result:
          'The company survives three weeks without you, which is its own hard lesson. You come back lighter, and the first thing you do is write down everything that only lived in your head.',
      },
      {
        label: 'White-knuckle it. Founders don\u2019t rest.',
        effects: [
          { e: 'stress', d: -12 },
          { e: 'rep', d: -1 },
        ],
        result:
          'You stay at the bench. The work gets done, worse than usual, by someone the team has quietly started managing around. Next time, the same pressure will hit an emptier body.',
      },
      {
        label: 'Walk away. The receivers can have it.',
        effects: [{ e: 'end', ending: 'bankrupt' }],
        result: 'Some ledgers only balance when you close them.',
      },
    ],
  },
]
