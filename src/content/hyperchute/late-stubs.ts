import type { SceneDef } from '../schema'

/**
 * HYPERCHUTE — engine ladders (shared by every act): insolvency and burnout.
 * First trigger opens the authored scene; a second trigger ends the chapter.
 */
export const LATE_STUBS: readonly SceneDef[] = [
  {
    id: 'h_insolvency',
    landmark: true,
    title: 'RUNWAY ZERO',
    leadIn:
      'It happens the way everyone warned you it would: slowly for months, and then on a Tuesday, all at once. The banking app’s balance turns a color it has never been before.',
    prose:
      'Payroll bounces. The bank’s notification tone is almost apologetic. Every founder learns this exact silence — the inbox that stops answering. HYPERCHUTE has weeks, maybe less. But doors remain, even now. They’re just all ugly.',
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
          'Signed at 11 p.m., against the IP, the shuttles, and — reading the clauses closely — possibly the tube itself.',
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
          { e: 'rel', who: 'june', resp: -1 },
          { e: 'stress', d: 10 },
          { e: 'flag', scope: 'company', key: 'down_used', v: true },
        ],
        result:
          'She wires it before the term sheet finishes printing. ‘This is the cheap money. Don’t make me do it again.’',
      },
      {
        label: 'Acqui-hire: the team survives, the dream doesn’t',
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
    title: 'THE BODY KEEPS SCORE',
    landmark: true,
    leadIn:
      'It announces itself politely at first — the missed exit on a road you drive daily, the sentence you read four times, the coffee that does nothing. Then one morning your hands are shaking over the keyboard and you cannot remember starting to cry.',
    prose:
      'Sofia would call it a fault cascade. Priya would call it the thing that kills founders faster than money. Whatever you call it, the truth is on the table between you and the mirror: you are the single point of failure in a company that no longer fits inside one human being. Something yields this week. You choose what.',
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
          'You stay at the bench. The work gets done, worse than usual, by someone the team has quietly started managing around. The next time the pressure pegs the gauge, there will be nothing left to spend.',
      },
      {
        label: 'Walk away. The receivers can have it.',
        effects: [{ e: 'end', ending: 'bankrupt' }],
        result: 'Some ledgers only balance when you stop paying into them.',
      },
    ],
  },
]
