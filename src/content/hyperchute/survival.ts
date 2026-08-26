import type { SceneDef } from '../schema'

/**
 * HYPERCHUTE — the survival register. Scenes gated behind low runway and
 * arrears: the game only speaks this language when the money is dying.
 * Drawn from a real founder's early years. Prosperous runs never see these.
 */
export const SURVIVAL: readonly SceneDef[] = [
  {
    id: 'h_sublet',
    ambience: 'garage',
    accent: 'warehouse',
    art: 'world_sublet',
    title: 'HALF A GARAGE',
    when: {
      k: 'all',
      of: [
        { k: 'runway', cmp: 'lt', v: 6 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    weight: 3,
    leadIn:
      'The rent is due Friday and the account will not survive it. You have spent two days staring at the problem when the problem knocks: a man from the vinyl-cutting shop that just lost its lease, asking if you know anyone with space.',
    prose:
      'You do know someone with space. You are standing in it. Half a garage is still a garage — and a tenant who pays the quarter up front, in advance, today, is the difference between the railway existing on Saturday and not. He looks up at the shuttle hanging from the ceiling. “That thing safe?” he asks. “Safer than my landlord,” he decides, and gets out his checkbook.',
    choices: [
      {
        label: 'Sublet half the garage — quarter up front, cash today.',
        effects: [
          { e: 'treasury', d: 9000 },
          { e: 'burn', d: -400 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'subletter', v: true },
        ],
        result:
          'By Monday there is a vinyl cutter humming under Shuttle One and a stranger’s coffee mug on your workbench. It is cramped, absurd, and it works: rent covered with someone else’s rent. Mrs. Delgado approves so hard she brings him a plant.',
      },
      {
        label: 'Keep the space. Find the rent some other way.',
        effects: [{ e: 'stress', d: 4 }],
        result:
          'The garage stays yours, all of it, echoing. You spend the week you just bought figuring out what to sell instead. There is always something left to sell. That is the scary part.',
      },
    ],
  },
  {
    id: 'h_fare',
    ambience: 'street',
    accent: 'crowd',
    art: 'world_fare',
    title: 'THE FARE',
    when: {
      k: 'all',
      of: [
        { k: 'runway', cmp: 'lt', v: 4 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    weight: 3,
    leadIn:
      'An angel across town — a friend of a friend of Priya’s list — has thirty minutes on Thursday. The meeting could save the company. The transit card in your pocket has nothing on it, and neither does anything else you own.',
    prose:
      'You put on the one good suit — the interview suit, the funeral suit, the suit that has outlived three phones — and the dress shoes that pinch. At the station gate you perform the oldest trick in the broke professional’s book: the pocket-pat, the sigh, the apologetic smile of a man who obviously has a wallet and has obviously forgotten it. The attendant sees the suit and waves it through. The man inside it was counting on exactly that.',
    choices: [
      {
        label: 'Sell it. The suit rides free today.',
        effects: [
          { e: 'treasury', d: 30000 },
          { e: 'stress', d: 4 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'fare_blagged', v: true },
        ],
        result:
          'Buzzed through. Forty minutes later you pitch like a man with nothing to lose, because you are one, and the angel writes thirty thousand dollars on the strength of it. On the ride home you pay the fare forward to a kid in a hoodie. Some debts you settle sideways.',
      },
      {
        label: 'Walk it. Ninety minutes each way, arrive honest.',
        effects: [
          { e: 'treasury', d: 25000 },
          { e: 'stress', d: 6 },
          { e: 'flag', scope: 'company', key: 'fare_walked', v: true },
        ],
        result:
          'You arrive with dust on the dress shoes and close a slightly smaller check from a man who respects punctuality less than he thinks he does. Your feet file a formal complaint that lasts a week.',
      },
      {
        label: 'Ask Mrs. Delgado for the fare.',
        effects: [
          { e: 'treasury', d: 30000 },
          { e: 'rel', who: 'marisol', aff: 1 },
          { e: 'stress', d: 2 },
        ],
        result:
          'She does not hand you coins. She hands you a laminated senior transit pass with a photo of a woman who is not you. “Maria retired,” she says. “She won’t mind.” You close the angel and return the pass with a full fare card taped to it.',
      },
    ],
  },
  {
    id: 'h_last_fifteen',
    ambience: 'garage',
    accent: 'night',
    art: 'world_fifteen',
    title: 'FIFTEEN DOLLARS',
    landmark: true,
    when: { k: 'treasury', cmp: 'lt', v: 0 },
    weight: 4,
    leadIn:
      'Below zero, the arithmetic gets very simple and very cruel. The meter on the garage wall eats coins and gives back light. Your stomach has opinions. What is left in the world, in total, is fifteen dollars.',
    prose:
      'The choice sits on the workbench like a part you cannot buy: a week of electricity, or a week of food. Fifteen dollars will not cover both. The shuttle needs the bench powered to exist. You need to eat to exist. You stand in the garage a long time with the coins in your fist, learning something about yourself that no pitch deck will ever hold.',
    choices: [
      {
        label: 'The meter. Lights on. Hungry is a work state.',
        effects: [
          { e: 'stress', d: 5 },
          { e: 'score', d: 2 },
          { e: 'flag', scope: 'company', key: 'chose_the_meter', v: true },
        ],
        result:
          'The bench hums for seven more days and you work all of them, light-headed and precise, on tomato-less pasta and tap water. Years from now, someone will ask what founding a company was really like, and you will not tell them this story. It is yours.',
      },
      {
        label: 'Food. A body that fails helps nobody.',
        effects: [
          { e: 'stress', d: -3 },
          { e: 'flag', scope: 'company', key: 'chose_the_food', v: true },
        ],
        result:
          'Tomatoes, rice, eggs — the meal tastes like surrender and vitamins. The bench goes dark for a week and you plan on paper by the laundromat’s light. Mrs. Delgado quietly stopped charging for that light a while ago, and neither of you has ever mentioned it.',
      },
    ],
  },
  {
    id: 'h_plastic',
    ambience: 'night',
    art: 'world_plastic',
    title: 'THE PLASTIC',
    when: {
      k: 'all',
      of: [
        { k: 'runway', cmp: 'lt', v: 8 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'maxed_cards', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    weight: 2,
    leadIn:
      'Three envelopes arrive the same week, each containing a credit card you applied for the same optimistic afternoon. The three limits together barely add up to a used car. Below eight weeks of runway, a used car is a fortune.',
    prose:
      'Founders are not supposed to do this, according to people who have never had a Friday payroll and a Wednesday balance. The math is ugly and simple: twenty-five thousand across three cards at interest that would make a loan shark blush politely. It is also the only money in the room that says yes without a meeting.',
    choices: [
      {
        label: 'Max them. All three. The railway pays it back or nothing matters.',
        effects: [
          { e: 'treasury', d: 25000 },
          { e: 'burn', d: 350 },
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'maxed_cards', v: true },
        ],
        result:
          'Three swipes, three small deaths of financial respectability, one alive company. The interest starts its meter like a cab you can’t get out of. You tape the cards to the wall as a promise and a threat.',
      },
      {
        label: 'Cut them up. Debt with teeth eats founders.',
        effects: [
          { e: 'stress', d: 2 },
          { e: 'flag', scope: 'company', key: 'maxed_cards', v: true },
        ],
        result: 'The scissors make a satisfying sound. The problem remains exactly the size it was, but it remains honestly.',
      },
    ],
  },

  // ---- the ghost check — signed at a coffee shop, dead by a job change --------
  {
    id: 'h_b_coffee_shop',
    ambience: 'cafe',
    accent: 'street',
    foley: 'door',
    art: 'world_coffee_shop',
    kind: 'bridge',
    title: 'THE COFFEE SHOP',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 10 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    weight: 2,
    leadIn:
      'The intro comes gilded: Elliot Vance, president of ATLAS Retail, wants to meet. Not at his office — at a coffee shop in the Flats, which his assistant calls charming and you correctly read as homework.',
    prose:
      'The shop is four blocks from the garage, the kind of place with steamed windows and one good table. Through the glass you can see him already there, coat off, your corridor map sketched on a napkin in front of him. A town car idles at the curb, embarrassed about the neighborhood. You push the door open.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_ghost_check' }],
  },
  {
    id: 'h_ghost_check',
    ambience: 'cafe',
    foley: 'pen',
    title: 'SIGNED OVER COFFEE',
    speaker: 'vance',
    leadIn: 'He stands to shake your hand before you reach the table, and half the shop pretends not to watch.',
    prose:
      'He is better in person than his keynote clips: sharp questions, real laughter, a napkin sketch of your corridor map annotated from memory. Then, between refills, he says the sentence founders retell for years: “I’m in. Two hundred and fifty. Personal money, not ATLAS.” He signs the papers right there against the window glass and shakes your hand with both of his. “Wire lands within the month,” he says. Everyone in the coffee shop pretends they weren’t listening. Nobody was pretending.',
    choices: [
      {
        label: 'Treat it as money in the bank. Start hiring tonight.',
        effects: [
          { e: 'meet', who: 'vance' },
          { e: 'stress', d: -3 },
          { e: 'burn', d: 800 },
          { e: 'flag', scope: 'company', key: 'ghost_signed', v: true },
          { e: 'flag', scope: 'company', key: 'ghost_spent', v: true },
        ],
        result:
          'You post two roles before the coffee is cold in the cup. Signed is signed. Signed is money. Everyone knows signed is money.',
      },
      {
        label: 'Smile, file it, and spend nothing until the wire lands.',
        effects: [
          { e: 'meet', who: 'vance' },
          { e: 'stress', d: 2 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'ghost_signed', v: true },
        ],
        result:
          'You frame nothing, hire nobody, and tell only Priya — who nods slowly and says the four hardest words in venture: “When it clears, celebrate.”',
      },
    ],
  },
  {
    id: 'h_ghost_dies_spent',
    ambience: 'night',
    art: 'world_ghost_wire',
    title: 'THE WIRE THAT NEVER WAS',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'ghost_spent', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 15 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'ghost_dead', cmp: 'eq', v: true } },
      ],
    },
    leadIn:
      'Elliot Vance’s wire — the two hundred fifty thousand he signed over at the coffee shop — is three weeks late. Week one: “Legal is processing.” Week two: silence. Week three: his assistant stops using exclamation points, which in assistant means the building is on fire.',
    prose:
      'The call comes on a Tuesday, from a number that is no longer an ATLAS number. “I owe you honesty,” Elliot says, and delivers it. He is leaving ATLAS for a rival, with a bigger title and a compliance office that treats his personal investments like radioactive material. The money is dead. You have two hires starting Monday against a promise that no longer exists.',
    choices: [
      {
        label: 'Take it back. Call both hires tonight and cancel.',
        effects: [
          { e: 'burn', d: -800 },
          { e: 'stress', d: 8 },
          { e: 'rep', d: -1 },
          { e: 'flag', scope: 'company', key: 'ghost_dead', v: true },
        ],
        result:
          'Two phone calls you will remember longer than the people you called. The burn drops back to survivable, and the lesson sticks for the rest of your career: money is not money until it is in the account.',
      },
      {
        label: 'Keep your word to the hires. Find the money somewhere else.',
        effects: [
          { e: 'stress', d: 10 },
          { e: 'score', d: 2 },
          { e: 'rel', who: 'priya', resp: 2 },
          { e: 'flag', scope: 'company', key: 'ghost_dead', v: true },
        ],
        result:
          'The hires start Monday and are never told how close it came. Priya finds out anyway — she always finds out — and says nothing, but her next intro is to someone who actually wires.',
      },
    ],
  },
  {
    id: 'h_ghost_dies_clean',
    ambience: 'night',
    art: 'world_ghost_wire',
    title: 'THE WIRE THAT NEVER WAS',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'ghost_signed', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'ghost_spent', cmp: 'eq', v: true } },
        { k: 'age', cmp: 'gte', v: 15 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'ghost_dead', cmp: 'eq', v: true } },
      ],
    },
    leadIn:
      'Elliot Vance’s wire — the two hundred fifty thousand he signed over at the coffee shop — is three weeks late. Week one: “Legal is processing.” Week two: silence. Week three: the call, from a number that is no longer an ATLAS number.',
    prose:
      '“I owe you honesty,” Elliot says, and delivers it. He is leaving ATLAS for a rival, and the new company’s rules kill every personal investment on his books — including the check he signed against the window glass a few months ago. He apologizes twice, means it once. You hold the phone and feel the strange weightlessness of losing money you never had. Across the garage, the budget you refused to touch sits exactly where it was: intact, unspent, yours.',
    choices: [
      {
        label: 'Thank him for calling you himself. Part on good terms.',
        effects: [
          { e: 'rel', who: 'vance', aff: 1, resp: 1 },
          { e: 'stress', d: 3 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'ghost_dead', v: true },
        ],
        result:
          'He remembers the grace. Men like Elliot resurface every few years with new budgets and old guilt — and somewhere in a rival tower, your name now lives in the folder marked SOMEDAY, PROPERLY.',
      },
      {
        label: 'Tell him what his broken promise cost you.',
        effects: [
          { e: 'rel', who: 'vance', standing: 'hostile', aff: -2 },
          { e: 'stress', d: 1 },
          { e: 'flag', scope: 'company', key: 'ghost_dead', v: true },
        ],
        result:
          'It feels good for exactly one phone call. It also closes every door he might have opened for you later, out of guilt. Some things you say just to have said them.',
      },
    ],
  },
]
