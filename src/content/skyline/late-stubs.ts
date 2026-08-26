import type { SceneDef } from '../schema'

/**
 * SKYLINE — engine ladders (shared by every act): insolvency and burnout.
 * First trigger opens the authored scene; a second trigger ends the chapter.
 */
export const LATE_STUBS: readonly SceneDef[] = [
  {
    id: 's_insolvency',
    ambience: 'night',
    art: 'world_s_runway_zero',
    landmark: true,
    title: 'RUNWAY ZERO',
    leadIn:
      'A company with a road to space dies the same way a garage company dies — the account turns red, the inbox goes quiet, and the phone fills with numbers you owe. The only difference is that this time, four hundred people live inside the thing that is running out of money.',
    prose:
      'Payroll for a floating city bounces, and the sound it makes is global — the platform makes the evening news on six continents before the bank’s apology email finishes loading. The insurers want calls. The commission wants assurances. Aurelia’s harbor authority expresses, in beautifully formatted language, its concern. Ingrid keeps the cable crews working without being asked, because bridges do not care who is solvent. A few doors remain open, and all of them are ugly.',
    choices: [
      {
        label: 'Bridge loan against the cable itself',
        requires: { k: 'not', p: { k: 'flag', scope: 'company', key: 'bridge_used', cmp: 'eq', v: true } },
        effects: [
          { e: 'treasury', d: 250000000 },
          { e: 'stress', d: 12 },
          { e: 'flag', scope: 'company', key: 'bridge_used', v: true },
        ],
        result:
          'The lending syndicate takes the cable as collateral — the road to space, pledged like a house. During the signing, one banker asks what repossessing it would even look like, and nobody in the room laughs, because everybody in the room has quietly wondered.',
      },
      {
        label: 'Emergency sale to the commission — the nations buy the road',
        effects: [{ e: 'end', ending: 'eminent_domain' }],
        result:
          'The transfer that treaties argued about for years gets done in eleven days by accountants, at a distressed price with a dignity clause. The nations own the cable now. The press release thanks you for your service to mankind, and means it, which does not help.',
      },
      {
        label: 'Surrender',
        effects: [{ e: 'end', ending: 'bankrupt' }],
        result: 'Some roads outlast the companies that build them. This becomes one of the sentences people say about you.',
      },
    ],
  },
  {
    id: 's_burnout',
    ambience: 'night',
    art: 'world_s_burnout',
    landmark: true,
    title: 'THE BODY KEEPS SCORE',
    leadIn:
      'It happens on the helicopter deck, between meetings — a missed step, a gray blur, and the platform medic’s face arriving from very far away. The clinic’s machines are new and expensive, and every one of them agrees with each other about you.',
    prose:
      'The doctor is a veteran of oil rigs and navy ships, and she has seen your chart’s shape before. “Founders and captains,” she says. “Same graph, same ending, and I have watched the ending.” Three companies, twenty years, and a body that has been treated like a rental. She is not dramatic about it, which is what makes it land — she simply shows you the numbers and says the platform’s rules give her the authority to ground anyone unfit for duty, and asks, professionally, whether she is about to need it.',
    choices: [
      {
        label: 'Take the forced rest. A month on shore, phone in a drawer.',
        effects: [
          { e: 'stress', d: -45 },
          { e: 'treasury', d: -1000000 },
        ],
        result:
          'A month in a house with no rails and no derricks. You sleep nine hours a night by week two, remember what food tastes like by week three, and by week four you can watch the ocean without pricing it. The company runs without you — Talia sees to that — and the fact that it can is medicine of its own strange kind.',
      },
      {
        label: 'Push through. The conference schedule outranks the bloodwork.',
        effects: [
          { e: 'stress', d: -12 },
          { e: 'rep', d: -1 },
        ],
        result:
          'You negotiate with the doctor like she is a vendor, and she extends terms, once, with a note in the file she reads aloud so you both hear it. Nothing left in the tank after this, the note says. She underlines it, you initial it, and that is the whole deal.',
      },
      {
        label: 'Walk away. Let the road belong to whoever wants it more.',
        effects: [{ e: 'end', ending: 'bankrupt' }],
        result:
          'There is a version of health that costs a company, and you finally pay it. The wind-down is orderly because Talia makes it orderly, and the last thing shipped off the platform is everyone’s final paycheck, on time, with a letter you write yourself.',
      },
    ],
  },
]
