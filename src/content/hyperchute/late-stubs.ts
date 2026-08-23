import type { SceneDef } from '../schema'

/**
 * HYPERCHUTE — Acts Two and Three, STUB SKELETON.
 * Replaced by authored content in P2 (the FIGHT and RECKONING acts).
 * Exists so the engine can play full biographies end-to-end today.
 */
export const LATE_STUBS: readonly SceneDef[] = [
  {
    id: 'h_stub_fight',
    title: 'THE CLONE — STUB',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'act1_done', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'fight_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'MERIDIAN launches Chute — same stops, same tubes, their logo where yours was. They undercut you by forty percent and lose money on every drop with a smile. This is the fight the design doc promises: gig-driver politics, permit wars, clone underpricing. Authored in Phase Two. Tonight it is a placeholder wearing a very good suit.',
    choices: [
      {
        label: 'Fight on the streets — price, service, stubbornness',
        effects: [
          { e: 'stress', d: 6 },
          { e: 'rep', d: 1 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'fight_done', v: true },
          { e: 'flag', scope: 'company', key: 'street_fight', v: true },
        ],
        result: 'Placeholder resistance. The real war arrives with Act Two authoring.',
      },
      {
        label: 'Go over the top: publish open standards',
        effects: [
          { e: 'stress', d: 3 },
          { e: 'rep', d: 2 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'fight_done', v: true },
          { e: 'flag', scope: 'company', key: 'opensourced_standards', v: true },
        ],
        result: 'You publish the tube-interface spec free for anyone. The internet notices. MERIDIAN’s lawyers notice harder.',
      },
    ],
  },
  {
    id: 'h_stub_offer',
    title: 'MERIDIAN MAKES THE CALL — STUB',
    speaker: 'marcus',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'fight_done', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 18 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'offer_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Marcus Vale’s assistant books forty minutes and Marcus uses eight. “Acquisition. Generous multiple. Your network inside ours, your name on the building. Or keep bleeding charmingly, and we’ll see whose tubes the city loves in March.” It is a good offer. That is what makes it a problem.',
    choices: [
      {
        label: 'Sell. Dissolve into MERIDIAN.',
        effects: [{ e: 'end', ending: 'acquired' }],
      },
      {
        label: 'Negotiate yourself instead of the company — rise inside the beast',
        requires: { k: 'rel', who: 'marcus', field: 'affinity', cmp: 'gte', v: 1 },
        effects: [{ e: 'end', ending: 'become_them' }],
      },
      {
        label: 'Refuse, and become worth buying later',
        effects: [
          { e: 'stress', d: 4 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'offer_done', v: true },
        ],
        goto: 'h_stub_scale',
        result: 'You say no in two syllables and mean all of them.',
      },
    ],
  },
  {
    id: 'h_stub_scale',
    title: 'SCALE OR SINCERITY — STUB',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'fight_done', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 20 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'scaled_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Thirty corridors. Three cities. A manufacturing partner in Fresno who calls you “kid” and delivers early anyway. IPO bankers leave voicemails that sound like marriage proposals. This is where elite play earns the people’s-network listing — and where the accident lives in the full design. Placeholder for now: choose your trajectory.',
    choices: [
      {
        label: 'Ride for the listing',
        requires: {
          k: 'all',
          of: [
            { k: 'score', cmp: 'gte', v: 8 },
            { k: 'rep', cmp: 'gte', v: 3 },
          ],
        },
        effects: [{ e: 'end', ending: 'triumph_ipo' }],
      },
      {
        label: 'Open-source the stack and walk away',
        effects: [{ e: 'end', ending: 'walkaway_opensource' }],
      },
      {
        label: 'Keep building; let the biography decide',
        effects: [
          { e: 'flag', scope: 'company', key: 'scaled_done', v: true },
          { e: 'stress', d: 3 },
        ],
        result: 'The voicemails keep coming. You keep building.',
      },
    ],
  },
  {
    id: 'h_insolvency',
    title: 'RUNWAY ZERO',
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
