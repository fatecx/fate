import type { SceneDef } from '../schema'

/**
 * SKYLINE — the survival register. Even at billion-dollar scale, there are
 * weeks where the money almost dies. The numbers grow. The dread is the same.
 */
export const SURVIVAL: readonly SceneDef[] = [
  {
    id: 's_s_guarantee',
    ambience: 'night',
    when: {
      k: 'all',
      of: [
        { k: 'runway', cmp: 'lt', v: 12 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'guaranteed_steel', cmp: 'eq', v: true } },
        { k: 'age', cmp: 'gte', v: 30 },
      ],
    },
    weight: 3,
    art: 'world_s_guarantee',
    title: 'THE STEEL INVOICE',
    leadIn:
      'The platform’s steel supplier calls a meeting that is really an ultimatum: forty million dollars overdue, and the next shipment stays on the dock until someone makes them whole. Without that steel, two thousand workers stand idle at sea, at full pay, in eleven days.',
    prose:
      'The company cannot cover the invoice this month, and every lender who could bridge it wants six weeks of paperwork you do not have. There is one signature on Earth the supplier will accept today, and it is yours — the personal kind, backed by everything the last two companies ever paid you. The lawyer explains it twice, slowly, the way lawyers do when they want the record to show they warned you. If the company fails after you sign, the failure follows you home. Your houses, your shares, your accounts — the whole biography, pledged against a shipment of steel.',
    choices: [
      {
        label: 'Sign it. The build does not stop while you own a dollar.',
        foley: 'pen',
        effects: [
          { e: 'treasury', d: 40000000 },
          { e: 'stress', d: 8 },
          { e: 'flag', scope: 'company', key: 'guaranteed_steel', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'The steel ships the same afternoon. For four months, until the next round closes, every storm forecast and freight report reads differently, because the thing at stake at sea is now also everything in your name on land. You sleep the way founders slept in the garage years. It turns out that muscle never forgets.',
      },
      {
        label: 'Refuse. Slow the build before you bet the biography.',
        effects: [
          { e: 'revenue', d: -60000 },
          { e: 'stress', d: 5 },
          { e: 'flag', scope: 'company', key: 'guaranteed_steel', v: true },
        ],
        result:
          'The build slows to half pace while finance grinds through the lenders’ paperwork, and two thousand workers rotate home on reduced shifts. It costs a season and a headline. It keeps your name off the collateral schedule, which some nights feels wise and other nights feels like the first time you flinched.',
      },
    ],
  },
  {
    id: 's_s_sell_shares',
    ambience: 'office',
    when: {
      k: 'all',
      of: [
        { k: 'runway', cmp: 'lt', v: 10 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'sold_old_shares', cmp: 'eq', v: true } },
        { k: 'age', cmp: 'gte', v: 40 },
      ],
    },
    weight: 2,
    art: 'world_s_sell_shares',
    title: 'THE OLD FORTUNE',
    leadIn:
      'The finance team’s weekly note has developed a tone, and the tone is a politely screaming siren. Payroll for a floating city is due in twenty days, the next round is stuck in diligence, and the only liquid money in reach is the fortune your last company left you.',
    prose:
      'The shares from the Teleport years sit in a vault account you almost never open — the proof, in numbers, that the second company happened. Selling a block of them at speed means selling at a discount, publicly, with every analyst on Earth reading it as either total commitment or quiet desperation. Mateo puts the choice plainly, because that is his job. “It is your personal safety net, boss. You would be feeding it to the company. I am required by loyalty to point out that founders who do this are heroes in the retellings and cautionary tales in the settlements, and nobody knows which one until later.”',
    choices: [
      {
        label: 'Sell the block. The past pays for the future.',
        effects: [
          { e: 'treasury', d: 120000000 },
          { e: 'stress', d: 6 },
          { e: 'flag', scope: 'company', key: 'sold_old_shares', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'The sale prints before the market opens, and the analysts split exactly as predicted — half write ALL IN, half write TROUBLE AT SEA. Payroll clears with nine days to spare. In the vault account, the number that proved the second company happened is smaller now. The cable does not know that. The cable just keeps standing, fed.',
      },
      {
        label: 'Keep the net. Squeeze the build instead.',
        effects: [
          { e: 'burn', d: -120000 },
          { e: 'stress', d: 5 },
          { e: 'flag', scope: 'company', key: 'sold_old_shares', v: true },
        ],
        result:
          'The cuts go deep enough to hurt — contractor rotations stretched, two supply runs merged into one, the second cafeteria closed at night. The platform grumbles and holds. Your safety net stays where it is, and you catch yourself checking that it is still there, which tells you something about this decade you were not planning to learn.',
      },
    ],
  },
  {
    id: 's_s_aurelia_advance',
    ambience: 'corp',
    when: {
      k: 'all',
      of: [
        { k: 'runway', cmp: 'lt', v: 8 },
        { k: 'met', who: 'volkov' },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'aurelia_advance', cmp: 'eq', v: true } },
      ],
    },
    weight: 2,
    art: 'world_s_advance',
    title: 'THE NEIGHBORLY OFFER',
    speaker: 'volkov',
    leadIn:
      'Katarina Volkov has a gift for arriving in the exact week the money gets thin, which means Aurelia’s analysts read your supplier payments the way weather services read pressure maps. She requests ten minutes and brings one page.',
    prose:
      '“An advance,” she says. “Two hundred million against future transit fees, wired this week, no equity, no board seat.” She lets the number sit there being beautiful. “One term. Aurelia’s port authority becomes the exclusive logistics provider for the platform — fuel, food, freight, all of it, for ten years.” She caps her pen and gives you the courtesy of the truth, as always. “You would be solvent by Friday, and every meal your platform eats for a decade would arrive on our boats. I would take a week to think about that trade, in your position. You have four days.”',
    choices: [
      {
        label: 'Take the advance. Solvent by Friday, tethered for ten years.',
        foley: 'pen',
        effects: [
          { e: 'treasury', d: 200000000 },
          { e: 'burn', d: 40000 },
          { e: 'rel', who: 'volkov', aff: 1 },
          { e: 'flag', scope: 'company', key: 'aurelia_advance', v: true },
          { e: 'stress', d: 4 },
        ],
        result:
          'The wire lands in thirty-one hours, which for a nine-figure sovereign transfer is a love letter. From that week on, everything the platform eats, burns, and builds with arrives flying Aurelia’s flag, and the folder called THE SQUEEZE gains a final page in Mateo’s handwriting: WE HANDED THEM THE HOSE.',
      },
      {
        label: 'Decline. Hungry beats owned.',
        effects: [
          { e: 'rel', who: 'volkov', resp: 2 },
          { e: 'stress', d: 6 },
          { e: 'flag', scope: 'company', key: 'aurelia_advance', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'Volkov accepts the refusal with what you could swear is approval, and notes it in notebook forty-three. The lean weeks stay lean. But the supply boats keep flying your colors, and on a platform where everyone can read a flag, that turns out to be worth more than the comfort would have been.',
      },
    ],
  },
  {
    id: 's_s_paycut',
    ambience: 'wind',
    when: {
      k: 'all',
      of: [
        { k: 'runway', cmp: 'lt', v: 6 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'platform_paycut', cmp: 'eq', v: true } },
      ],
    },
    weight: 2,
    art: 'world_s_paycut',
    title: 'THE CAFETERIA MEETING',
    leadIn:
      'The money gets thin enough that the crews notice before the press does — supply runs merge, overtime vanishes, and the rumor mill on a platform of four hundred people runs faster than any wire service. The shift leads request a meeting, and they book the cafeteria, because everyone fits there.',
    prose:
      'The head welder does the talking, a woman named Osei — no relation to the journalist, though she enjoys the double takes. “We can read a supply manifest, boss. You are maybe eight weeks from missing payroll.” She puts a signed sheet on the table. “Here is our offer, and it is an offer, not a favor. Every crew on FIRST RUNG takes a fifteen percent cut until the next round closes — in exchange for shares. We built her. If she is going to be worth something someday, we want to own the part we built.” The sheet has three hundred and eighty signatures on it. The room waits, four hundred faces above four hundred folded arms, to find out what kind of company this is.',
    choices: [
      {
        label: 'Take the offer. The crews become owners.',
        foley: 'pen',
        effects: [
          { e: 'burn', d: -100000 },
          { e: 'stake', who: 'anders', d: 2 },
          { e: 'rep', d: 1 },
          { e: 'stress', d: -3 },
          { e: 'flag', scope: 'company', key: 'platform_paycut', v: true },
          { e: 'score', d: 2 },
        ],
        result:
          'The equity pool for the crews papers in a week, with Anders holding the trust as their representative, and the cafeteria meeting ends in the loudest sound the platform has ever produced indoors. Years from now, business schools will teach this week. What the case studies will never quite capture is the shift change afterward — four hundred owners walking out to the derricks, checking the weather on their cable.',
      },
      {
        label: 'Refuse the cut. Their wages are not your runway.',
        effects: [
          { e: 'stress', d: 5 },
          { e: 'rep', d: 1 },
          { e: 'flag', scope: 'company', key: 'platform_paycut', v: true },
        ],
        result:
          'You tell the cafeteria the truth — that you will sell your own holdings before you spend theirs — and the room takes it the way crews take a captain’s decision, with respect and a low grumble. Osei folds the signed sheet and hands it to you anyway. “Keep it,” she says. “So you know what was on the table.” You keep it for the rest of your career, and it outlasts most of the furniture.',
      },
    ],
  },
]
