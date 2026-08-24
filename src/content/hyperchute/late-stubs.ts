import type { SceneDef } from '../schema'

/**
 * HYPERCHUTE — insolvency ladder (shared by every act). First trigger opens the
 * rescue scene; a second trigger with rescues spent ends the chapter.
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
]
