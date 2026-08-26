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
    mood: 'dread',
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
      'The rent is due Friday. The account is already too thin. You have stared at the numbers for two days when a man from the vinyl-cutting shop knocks. He lost his lease. He asks if you know anyone with space.',
    prose:
      'You know someone with space. You are standing in it. Half the garage could keep the lights on. He can pay the quarter up front, today. He looks up at the shuttle hanging from the ceiling. “That thing safe?” he asks. “Safer than my landlord,” he decides, and gets out his checkbook.',
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
          'By Monday a vinyl cutter hums under Shuttle One, and a stranger’s coffee mug sits on your workbench. The room is cramped. The rent is covered by someone else’s rent. Mrs. Delgado approves so hard she brings him a plant.',
      },
      {
        label: 'Keep the space. Find the rent some other way.',
        effects: [{ e: 'stress', d: 4 }],
        result:
          'The garage stays yours, all of it, echoing. You spend the week you just bought figuring out what to sell. Something always remains. That is the scary part.',
      },
    ],
  },
  {
    id: 'h_fare',
    ambience: 'street',
    accent: 'crowd',
    mood: 'dread',
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
      'An angel investor across town — a friend of a friend from Priya’s list — has thirty minutes free on Thursday, and that meeting could save the company. The problem is getting there: your transit card is empty, and so is your wallet.',
    prose:
      'You put on the one good suit — the interview suit, the funeral suit, the suit that has outlived three phones — and the dress shoes that pinch. At the station gate, you pat your pockets, sigh, and give the sorry smile of a man who must have left his wallet at home. The attendant sees the suit and waves you through. The man inside the suit was counting on that.',
    choices: [
      {
        label: 'Bluff your way through the gate. The suit rides free.',
        effects: [
          { e: 'treasury', d: 30000 },
          { e: 'stress', d: 4 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'fare_blagged', v: true },
        ],
        result:
          'Buzzed through. Forty minutes later you pitch with your back against the wall. The angel writes thirty thousand dollars on the strength of it. On the ride home you load a fare card for a kid in a hoodie.',
      },
      {
        label: 'Walk it. Ninety minutes each way, arrive honest.',
        effects: [
          { e: 'treasury', d: 25000 },
          { e: 'stress', d: 6 },
          { e: 'flag', scope: 'company', key: 'fare_walked', v: true },
        ],
        result:
          'You arrive with dust on the dress shoes and close a slightly smaller check from a man who respects punctuality less than he thinks he does. Your feet complain for a week.',
      },
      {
        label: 'Ask Mrs. Delgado for the fare.',
        effects: [
          { e: 'treasury', d: 30000 },
          { e: 'rel', who: 'marisol', aff: 1 },
          { e: 'stress', d: 2 },
        ],
        result:
          'She hands you a laminated senior transit pass with a photo of Maria from three streets over. “Maria retired,” Mrs. Delgado says. “She won’t mind.” You close the angel and return the pass with a full fare card taped to it.',
      },
    ],
  },
  {
    id: 'h_last_fifteen',
    ambience: 'garage',
    accent: 'night',
    mood: 'dread',
    art: 'world_fifteen',
    title: 'FIFTEEN DOLLARS',
    landmark: true,
    when: { k: 'treasury', cmp: 'lt', v: 0 },
    weight: 4,
    leadIn:
      'Below zero, the math gets cruel. The meter on the garage wall eats coins and gives back light. Your stomach growls through the afternoon. Everything you have left adds up to fifteen dollars.',
    prose:
      'The choice sits on the workbench beside the coins. You can buy a week of electricity or a week of food. The shuttle needs the bench powered. You need to eat. You stand in the garage a long time with the money in your fist, learning something no pitch deck will ever hold.',
    choices: [
      {
        label: 'Spend it on the electric meter. Work hungry.',
        effects: [
          { e: 'stress', d: 5 },
          { e: 'score', d: 2 },
          { e: 'flag', scope: 'company', key: 'chose_the_meter', v: true },
        ],
        result:
          'The bench hums for seven more days. You work all of them light-headed, precise, and living on plain pasta and tap water. Years from now, someone will ask what founding a company was really like. This story stays yours.',
      },
      {
        label: 'Spend it on food. Plan on paper for a week.',
        effects: [
          { e: 'stress', d: -3 },
          { e: 'flag', scope: 'company', key: 'chose_the_food', v: true },
        ],
        result:
          'Tomatoes, rice, eggs — the meal tastes like surrender and vitamins. The bench goes dark for a week, and you plan on paper by the laundromat’s light. Mrs. Delgado stopped charging for that light a while ago. You both keep quiet about it.',
      },
    ],
  },
  {
    id: 'h_plastic',
    ambience: 'night',
    mood: 'dread',
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
      'Three envelopes arrive the same week, each holding a credit card you applied for on the same hopeful afternoon. The three limits together barely add up to a used car. Below eight weeks of runway, a used car is a fortune.',
    prose:
      'People with savings call this reckless. People with payroll due Friday understand the room you are in. The math is ugly and simple. Twenty-five thousand across three cards, at interest that would make a loan shark blush. The cards are the only money that says yes today.',
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
          'Three swipes kill your credit score and keep one company alive. The interest starts running like a cab meter you cannot shut off, so you tape the dead cards to the wall as a promise and a threat.',
      },
      {
        label: 'Cut them up. Debt with teeth eats founders.',
        effects: [
          { e: 'stress', d: 2 },
          { e: 'flag', scope: 'company', key: 'maxed_cards', v: true },
        ],
        result: 'The scissors make a satisfying sound, and the problem stays exactly the same size. At least now it is an honest problem.',
      },
    ],
  },

  // ---- the ghost check — signed at a coffee shop, dead by a job change --------
  {
    id: 'h_b_coffee_shop',
    ambience: 'cafe',
    accent: 'street',
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
      'The intro arrives polished. Elliot Vance, president of ATLAS Retail, wants to meet. The place is a coffee shop in the Flats. His assistant calls it charming. You read it as homework.',
    prose:
      'The shop is four blocks from the garage, with steamed windows and one good table. Through the glass you can see him already there, coat off, your corridor map sketched on a napkin in front of him. A town car idles at the curb, embarrassed about the neighborhood. You push the door open.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_ghost_check' }],
  },
  {
    id: 'h_ghost_check',
    ambience: 'cafe',
    title: 'SIGNED OVER COFFEE',
    speaker: 'vance',
    leadIn: 'He stands to shake your hand before you reach the table, and half the shop studies its cups.',
    prose:
      'He is better in person than his keynote clips. Sharp questions, real laughter, a napkin sketch of your corridor map marked from memory. Then, between refills, he says the sentence founders retell for years. “I’m in. Two hundred and fifty. My own money, separate from ATLAS.” He signs the papers against the window glass and shakes your hand with both of his. “Wire lands within the month,” he says. Everyone in the coffee shop hears it and returns to their cups like professionals.',
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
          'You post two roles before the coffee is cold. Signed means signed. Signed means money. Everyone in the shop saw him do it.',
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
          'The signed papers go into a folder, and you hire nobody until the money is real. You tell only Priya, who nods slowly and says the four hardest words in startup investing: “When it clears, celebrate.”',
      },
    ],
  },
  {
    id: 'h_ghost_dies_spent',
    ambience: 'night',
    mood: 'dread',
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
      'Elliot Vance’s wire — the two hundred fifty thousand he signed over at the coffee shop — is three weeks late. Week one brings “Legal is processing.” Week two brings silence. Week three brings his assistant dropping the exclamation points. In assistant language, the building is on fire.',
    prose:
      'The call comes on a Tuesday, from a number outside ATLAS. “I owe you honesty,” Elliot says. He is leaving for a rival with a bigger title. Their rules bar his personal investments, including yours. The money is dead. You have two hires starting Monday against a promise that vanished.',
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
          'Two phone calls you will remember longer than the people you called. The burn drops back to survivable, and the lesson stays with you for the rest of your career. Money counts after it hits the account.',
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
          'The hires start Monday, unaware how close it came. Priya finds out anyway — she always finds out — and keeps her face still. Her next intro is to someone who actually wires.',
      },
    ],
  },
  {
    id: 'h_ghost_dies_clean',
    ambience: 'night',
    mood: 'aftermath',
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
      'Elliot Vance’s wire — the two hundred fifty thousand he signed over at the coffee shop — is three weeks late. Week one brings “Legal is processing.” Week two brings silence. Week three brings a call from a number outside ATLAS.',
    prose:
      '“I owe you honesty,” Elliot says. He is leaving ATLAS for a rival, and the new company’s rules bar his personal investments, including the check he signed against the window glass. He apologizes twice. One of them lands. You hold the phone and feel the strange weightlessness of money that stayed imaginary. Across the garage, the budget you refused to touch sits intact.',
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
          'He remembers the grace. Elliot resurfaces every few years with new budgets and old guilt. Somewhere in a rival tower, your name now lives in the folder marked SOMEDAY, PROPERLY.',
      },
      {
        label: 'Tell him what his broken promise cost you.',
        effects: [
          { e: 'rel', who: 'vance', standing: 'hostile', aff: -2 },
          { e: 'stress', d: 1 },
          { e: 'flag', scope: 'company', key: 'ghost_dead', v: true },
        ],
        result:
          'It feels good for one phone call. It also closes every door he might have opened for you later, out of guilt. Some lines feel true and still cost too much.',
      },
    ],
  },
]
