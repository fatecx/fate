import type { SceneDef } from '../schema'

/**
 * HYPERCHUTE — Act One: FOUND.
 * The vertical slice. Garage, cap table decisions, corridor politics, first drops.
 */
export const ACT_ONE: readonly SceneDef[] = [
  {
    id: 'h_seedling',
    ambience: 'garage',
    accent: 'street',
    title: 'DON’T YOU HAVE A JOB?',
    landmark: true,
    speaker: 'marisol',
    leadIn:
      'Week one as a founder tastes like instant coffee. Dryer drums shake the floor below you. At 8 a.m., while you solder a motor mount, the stairs creak. You know that walk. Your landlady is coming up, and she wants an answer.',
    prose:
      'Mrs. Delgado owns the laundromat, the building, and — after thirty years — this whole block’s respect. She climbs the stairs at 8 a.m. with a rent envelope in one hand and a question she has practiced all morning. “Every day you are up here. Machines humming. My dryers vibrate. Don’t you have a job?” You tell her the truth: this is the job now — a railway in the sky that drops packages soft as rain onto every block, even the Flats. She studies the hanging shuttle for a long, calm minute. “My granddaughter waits forty minutes for a bus to bring her insulin,” she says, and pulls a second envelope from her apron — creased, warm, wrapped with a bank band. Ten thousand dollars. She pushes it across the workbench with one finger. “I want to put my money in your company. I was saving for a cruise. Boats are slow.”',
    choices: [
      {
        label: 'Take it. One percent, notarized on a laundry receipt.',
        foley: 'pen',
        effects: [
          { e: 'meet', who: 'marisol' },
          { e: 'treasury', d: 10000 },
          { e: 'stake', who: 'marisol', d: 1 },
          { e: 'rel', who: 'marisol', aff: 2, resp: 1 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'delgado_seed', v: true },
        ],
        goto: 'h_entry',
        result:
          'She signs the receipt like a woman who has closed harder deals. Then she tapes her copy to the wall behind the register, where the whole neighborhood will see it.',
      },
      {
        label: 'Take it as a loan. Pay her back double, someday.',
        effects: [
          { e: 'meet', who: 'marisol' },
          { e: 'treasury', d: 10000 },
          { e: 'rel', who: 'marisol', aff: 1, resp: 2 },
          { e: 'stress', d: 2 },
          { e: 'flag', scope: 'company', key: 'delgado_loan', v: true },
        ],
        goto: 'h_entry',
        result:
          '“Double,” she repeats, satisfied. She writes it in a ledger older than you. Every morning after this, the debt will be waiting downstairs with her coffee.',
      },
      {
        label: 'Refuse. Her cruise money isn’t venture capital.',
        effects: [
          { e: 'meet', who: 'marisol' },
          { e: 'rel', who: 'marisol', aff: 1, resp: 2 },
          { e: 'rep', d: 1 },
          { e: 'stress', d: 1 },
          { e: 'flag', scope: 'company', key: 'delgado_declined', v: true },
        ],
        goto: 'h_entry',
        result:
          'She tucks the envelope away without taking offense. “Then my porch is first,” she says. “When the boxes fall.”',
      },
    ],
  },
  {
    id: 'h_entry',
    ambience: 'garage',
    landmark: true,
    art: 'world_garage',
    leadIn:
      'The stairs go quiet. The garage belongs to you again. The prototype sways on its rope, waiting for the first real move.',
    title: 'THE GARAGE',
    prose:
      'A rented room above the Sudz & Spin laundromat in the Flats. Dryer heat, solder smoke, and one prototype shuttle hanging from the ceiling on a rope — a shoebox with rotors, feeding a delivery tube you pulled from a closed bank’s drive-through. On your screen, the company papers say you own one hundred percent of HYPERCHUTE. Through the window, a MERIDIAN drone hums past with someone’s cold-pressed juice. The city still sees only a quiet second-floor room. That keeps you safe. It also keeps you small.',
    choices: [
      {
        label: 'File for a city flight permit. Prove it works first',
        effects: [
          { e: 'flag', scope: 'company', key: 'pilot_booked', v: true },
          { e: 'stress', d: 5 },
        ],
        goto: 'h_b_filing',
        result: 'You send the application at 2 a.m., too wired to sleep.',
      },
      {
        label: 'Recruit an advisor before anyone important sees this',
        effects: [],
        goto: 'h_b_advisor_hunt',
        result: 'A serious name beside yours could make the city listen.',
      },
      {
        label: 'Get a real lawyer and incorporate properly first',
        effects: [],
        goto: 'h_b_paper_first',
        result: 'The company needs real paperwork before the sky does.',
      },
    ],
  },
  {
    id: 'h_priya_pitch',
    ambience: 'garage',
    accent: 'street',
    title: 'TWO PERCENT',
    speaker: 'priya',
    when: { k: 'not', p: { k: 'met', who: 'priya' } },
    weight: 2,
    leadIn:
      'The Flats talks, and by now half the neighborhood has read the receipt Mrs. Delgado taped up behind her register. Add the public company filing, and your garage has earned itself a reputation — so on Monday, someone far out of your league asks for twenty minutes.',
    prose:
      'Priya Raghavan routed freight across three continents and survived two bankruptcies caused by other people. She gives the garage four seconds of inspection. “You built a machine that drops boxes out of the sky onto people’s homes. You have no permits, no insurance, and no idea which deputy commissioner already hates you. I can fix all three.” She slides a term sheet across the workbench with the terms — two percent, vesting over twelve months, advisory role, introductions included.',
    choices: [
      {
        label: '“Welcome aboard.”',
        effects: [
          { e: 'meet', who: 'priya' },
          { e: 'rel', who: 'priya', aff: 2, resp: 2 },
          { e: 'stake', who: 'priya', d: 2 },
          { e: 'score', d: 1 },
          { e: 'stress', d: -3 },
        ],
        goto: 'h_b_priya_signed',
        result: 'She shakes once, dry and firm. Then she starts a list titled THINGS THAT WILL KILL YOU FIRST.',
      },
      {
        label: '“Put me on the waitlist. I’ll pay cash when funding lands.”',
        effects: [
          { e: 'meet', who: 'priya' },
          { e: 'rel', who: 'priya', aff: -1 },
          { e: 'flag', scope: 'company', key: 'priya_waitlist', v: true },
          { e: 'stress', d: 2 },
        ],
        goto: 'h_b_priya_waitlist',
        result: 'Her smile stays still. “Sure. I’ll be here.”',
      },
      {
        label: '“I’ll go it alone.”',
        effects: [
          { e: 'meet', who: 'priya' },
          { e: 'rel', who: 'priya', aff: -2, resp: -1 },
          { e: 'flag', scope: 'company', key: 'priya_declined', v: true },
          { e: 'stress', d: 2 },
        ],
        goto: 'h_b_priya_alone',
        result: 'She folds the term sheet with nineteen years of freight scars behind the motion, then leaves without another word.',
      },
    ],
  },
  {
    id: 'h_b_container',
    ambience: 'street',
    accent: 'warehouse',
    art: 'world_container_office',
    kind: 'bridge',
    title: 'THE SHIPPING CONTAINER',
    when: { k: 'not', p: { k: 'met', who: 'tomas' } },
    weight: 2,
    leadIn: 'Everyone downtown gives you the same directions. They still sound like a prank until you are standing in front of the door.',
    prose:
      'The shipping container is real. It is corrugated steel wedged between two glass towers, with a brass plate on the door that reads REYES, ABOGADO. Inside, bookshelves line the walls, the air is cool, and the room feels calmer than either office tower beside it. A man in rolled shirtsleeves waves you toward the good chair like he has been expecting you all week.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_tomas_terms' }],
  },
  {
    id: 'h_tomas_terms',
    ambience: 'office',
    accent: 'street',
    title: 'TWO WAYS TO PAY ME',
    speaker: 'tomas',
    leadIn: 'He pours two coffees without asking, sits down, and goes straight to the question that decides the meeting.',
    prose:
      'Tomás Reyes writes startup contracts out of a converted shipping container downtown. He bills like a man who reads every word before anyone signs. “Everyone wants the big-firm lawyer until the bill lands,” he says. He writes two ways to pay on the garage wall in marker — $18,000 flat, or one percent, “and my rolodex goes with it.”',
    choices: [
      {
        label: '$18,000 cash',
        foley: 'pen',
        requires: { k: 'treasury', cmp: 'gte', v: 18000 },
        effects: [
          { e: 'treasury', d: -18000 },
          { e: 'meet', who: 'tomas' },
          { e: 'rel', who: 'tomas', aff: 1 },
          { e: 'flag', scope: 'company', key: 'legal_solid', v: true },
          { e: 'stress', d: -3 },
        ],
        goto: 'h_b_papered',
        result: 'He writes the paper that gives the company ownership of your invention before he leaves. Everything you build now belongs to HYPERCHUTE.',
      },
      {
        label: 'One percent, plus the rolodex',
        foley: 'pen',
        effects: [
          { e: 'meet', who: 'tomas' },
          { e: 'rel', who: 'tomas', aff: 2, resp: 2 },
          { e: 'stake', who: 'tomas', d: 1 },
          { e: 'flag', scope: 'company', key: 'lawyer_ally', v: true },
          { e: 'score', d: 1 },
          { e: 'stress', d: -2 },
        ],
        goto: 'h_b_rolodex',
        result: '“Smart,” he says, pocketing the marker. “Broke founders make the best clients. Something to prove.”',
      },
      {
        label: 'Download templates. How hard can it be?',
        effects: [
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'diy_legal', v: true },
        ],
        goto: 'h_b_diy',
        result: 'The templates look fine at 3 a.m. By breakfast, every blank box feels like a trap.',
      },
    ],
  },
  {
    id: 'h_permit_wall',
    ambience: 'garage',
    title: 'NO PROVEN DESCENT SAFETY CASE',
    speaker: 'corr',
    priority: true,
    fuseEpochs: 3,
    leadIn:
      'Eleven days of PENDING, and then the status page flips on a Tuesday morning before coffee. The email under it is longer than the application.',
    when: { k: 'all', of: [{ k: 'flag', scope: 'company', key: 'pilot_booked', cmp: 'eq', v: true }, { k: 'not', p: { k: 'flag', scope: 'company', key: 'permit_done', cmp: 'eq', v: true } }] },
    prose:
      'The Office of Aerial Corridors denies your pilot application in 0.4 seconds. The rejection notice copies three departments you have never heard of and one that sounds invented, the Department of Sidewalk Integrity. At the bottom, cold machine language says YOU MAY APPLY AGAIN ONCE YOU PROVE YOUR DROPS ARE SAFE.',
    choices: [
      {
        label: 'Appeal the denial with your flight test data',
        effects: [
          { e: 'treasury', d: -6000 },
          { e: 'stress', d: 6 },
          { e: 'flag', scope: 'company', key: 'corridor', v: 'appealed' },
          { e: 'flag', scope: 'company', key: 'permit_done', v: true },
          { e: 'meet', who: 'corr' },
        ],
        goto: 'h_b_appeal_prep',
        result: 'The clerk’s auto-reply gives you a date twenty-one days from now. You have enough time to build a case. A reputation would take longer.',
      },
      {
        label: 'Launch unlicensed over your own block. Beg forgiveness.',
        effects: [
          { e: 'stress', d: 8 },
          { e: 'rep', d: -1 },
          { e: 'flag', scope: 'company', key: 'corridor', v: 'rogue' },
          { e: 'flag', scope: 'company', key: 'permit_done', v: true },
          { e: 'meet', who: 'corr' },
        ],
        goto: 'h_b_rogue_nights',
        result: 'Twelve perfect drops land on your own roof. A neighbor films the thirteenth.',
      },
      {
        label: 'Lobby. Quietly, properly, expensively.',
        requires: {
          k: 'all',
          of: [
            { k: 'met', who: 'tomas' },
            { k: 'not', p: { k: 'flag', scope: 'company', key: 'lawyer_ally', cmp: 'eq', v: true } },
          ],
        },
        effects: [
          { e: 'treasury', d: -9000 },
          { e: 'flag', scope: 'company', key: 'corridor', v: 'granted' },
          { e: 'flag', scope: 'company', key: 'permit_done', v: true },
          { e: 'meet', who: 'corr' },
          { e: 'rel', who: 'corr', aff: 1 },
        ],
        goto: 'h_b_corridor_granted',
        result: 'Tomás knows the people who know the people with stamps. Nine days later, the pilot corridor exists.',
      },
      {
        label: 'Call in Tomás’ favor',
        requires: { k: 'flag', scope: 'company', key: 'lawyer_ally', cmp: 'eq', v: true },
        effects: [
          { e: 'flag', scope: 'company', key: 'corridor', v: 'granted' },
          { e: 'flag', scope: 'company', key: 'permit_done', v: true },
          { e: 'rel', who: 'tomas', aff: 1 },
          { e: 'stress', d: -2 },
          { e: 'meet', who: 'corr' },
        ],
        goto: 'h_b_corridor_granted',
        result: 'Tomás makes one call from the container. “Fast-tracked. Don’t make me spend this twice.”',
      },
    ],
  },
  {
    id: 'h_hearing',
    ambience: 'hearing',
    title: 'THE DESCENT-SAFETY HEARING',
    art: 'world_hearing_4b',
    priority: true,
    leadIn:
      'Room 4-B is on the third floor of a building meant to make people feel processed. You wear the one jacket that survived the solder work. You carry three copies of the case because the Office of Aerial Corridors still loves paper.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'corridor', cmp: 'eq', v: 'appealed' },
        { k: 'age', cmp: 'gte', v: 5 },
      ],
    },
    fuseEpochs: 3,
    prose:
      'Room 4-B of the Office of Aerial Corridors smells like toner and judgment. Your forty pages of test data hold up better than anyone expected. The commissioners ask two rounds of questions, then watch your live demo video. One of them says “huh” out loud. Eleven minutes later, they grant the pilot corridor.',
    choices: [
      {
        label: 'Accept the corridor. Fly legal.',
        effects: [
          { e: 'flag', scope: 'company', key: 'corridor', v: 'granted' },
          { e: 'rep', d: 1 },
          { e: 'score', d: 1 },
          { e: 'stress', d: -5 },
          { e: 'meet', who: 'corr' },
          { e: 'rel', who: 'corr', resp: 1 },
        ],
        goto: 'h_b_first_corridor',
        result: 'Stamped, sealed, emailed. The sky over the Flats is officially yours — two hundred feet at a time.',
      },
    ],
  },
  {
    id: 'h_june_via_tomas',
    ambience: 'garage',
    art: 'june_garage',
    title: 'THE ANGEL',
    priority: true,
    leadIn:
      'Tomás calls ahead, which he has never done before. “Clear the bench,” he says. “You have a visitor. Do not be charming. Be accurate.”',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'lawyer_ally', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'met', who: 'june' } },
      ],
    },
    prose:
      'June Park arrives thirty seconds after Tomás because she was already nearby. She has eleven early investments and a habit of seeing winners before the room does. She walks under the tethered shuttle, looks up for a long moment, and says, “A railway in the sky. Huh. My grandmother rode a train two days to reach a port. People will pay for gravity that behaves.”',
    choices: [
      {
        label: 'Hear her out',
        effects: [],
        goto: 'h_june_term',
      },
    ],
  },
  {
    id: 'h_june_cold',
    ambience: 'garage',
    art: 'june_street',
    title: 'SOMEONE IS WATCHING YOUR DEMO',
    priority: true,
    leadIn:
      'The waiting list crosses two hundred names the same week your test video leaks from a group chat you thought was private. Attention arrives before you invite it.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'corridor', cmp: 'eq', v: 'granted' },
        { k: 'not', p: { k: 'met', who: 'june' } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'lawyer_ally', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'The rooftop test footage leaks — of course it leaks — and by Friday it has four hundred thousand views. The comments fight about property values. Monday morning, a woman in an expensive jacket is downstairs in the laundromat asking which unit is yours. June Park climbs the stairs before anyone can slow her down.',
    choices: [
      {
        label: 'Hear her out',
        effects: [],
        goto: 'h_june_term',
      },
    ],
  },
  {
    id: 'h_june_term',
    ambience: 'garage',
    landmark: true,
    title: 'ONE FIFTY FOR EIGHT',
    speaker: 'june',
    prose:
      'June turns her phone around. On the screen is a wiring diagram of your own shuttle, marked up in three colors. “I read everything. Here’s my number. One hundred fifty thousand for eight percent. I don’t lead rounds I can’t defend at dinner parties — and a railway in the sky? I can defend that.”',
    choices: [
      {
        label: 'Take the check',
        foley: 'pen',
        effects: [
          { e: 'treasury', d: 150000 },
          { e: 'meet', who: 'june' },
          { e: 'stake', who: 'june', d: 8 },
          { e: 'rel', who: 'june', aff: 1 },
          { e: 'score', d: 2 },
          { e: 'stress', d: -4 },
          { e: 'flag', scope: 'company', key: 'angel_funded', v: true },
        ],
        goto: 'h_b_wired',
        result: 'The wire clears Wednesday. The garage suddenly smells like possibility instead of dryer sheets.',
      },
      {
        label: '“Six percent.” See if she flinches',
        effects: [
          { e: 'treasury', d: 150000 },
          { e: 'meet', who: 'june' },
          { e: 'stake', who: 'june', d: 7 },
          { e: 'rel', who: 'june', resp: 1, aff: -1 },
          { e: 'score', d: 2 },
          { e: 'stress', d: -3 },
          { e: 'flag', scope: 'company', key: 'angel_funded', v: true },
        ],
        goto: 'h_b_wired',
        result: 'Her face stays still. “Seven. Because you asked. Don’t negotiate with me twice.”',
      },
      {
        label: 'Turn her down. Keep the company all yours.',
        effects: [
          { e: 'meet', who: 'june' },
          { e: 'rel', who: 'june', aff: 1, resp: 1 },
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'bootstrapping', v: true },
        ],
        goto: 'h_b_bootstrap',
        result: 'She leaves a card on the workbench anyway. “When you’re ready to move, move fast. Doors like me don’t stay open.”',
      },
    ],
  },
  {
    id: 'h_first_drops_clean',
    ambience: 'street',
    accent: 'wind',
    landmark: true,
    art: 'world_first_drop',
    title: 'BEAM DOWN',
    priority: true,
    leadIn:
      'The batteries finish charging at 4 a.m., and you are awake to see it because of course you are. The wind is calm. The sky is clear. The first customer’s name sits on the schedule in her own cursive handwriting.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'corridor', cmp: 'eq', v: 'granted' },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'drops_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Shuttle One holds steady two hundred feet above the Delgado house at 6:58 a.m. The tube coughs once. The parcel drops through the landing sleeve and reaches the porch soft as rain. Mrs. Delgado films it while screaming. By noon, sixty names fill a waiting list on the back of a parking ticket.',
    choices: [
      {
        label: 'Open the list. Take every customer you can.',
        effects: [
          { e: 'revenue', d: 2400 },
          { e: 'burn', d: 1500 },
          { e: 'stress', d: -5 },
          { e: 'rep', d: 1 },
          { e: 'score', d: 2 },
          { e: 'flag', scope: 'company', key: 'drops_done', v: true },
        ],
        goto: 'h_b_scale_strain',
        result: 'You choose growth. The waiting list becomes today’s work.',
      },
      {
        label: 'Cap it at twenty homes. Do it right first.',
        effects: [
          { e: 'revenue', d: 1400 },
          { e: 'stress', d: -8 },
          { e: 'rep', d: 1 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'drops_done', v: true },
          { e: 'flag', scope: 'company', key: 'slow_growth', v: true },
        ],
        goto: 'h_b_scale_strain',
        result: 'Twenty porches and zero failures. Sofia would call that useful data, and Priya would call it money left sitting outside.',
      },
    ],
  },
  {
    id: 'h_first_drops_rogue',
    ambience: 'street',
    accent: 'wind',
    landmark: true,
    art: 'world_first_drop',
    title: 'TWELVE ROOFS, NO PERMISSION',
    priority: true,
    leadIn:
      'The waiver stack grows beside the printer each night. Between the fourth and fifth dawn shift, the test program becomes a delivery service that exists only before the city wakes up.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'corridor', cmp: 'eq', v: 'rogue' },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'drops_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Dawn becomes your delivery window, because you fly before the inspectors start work. Friends of friends sign waivers printed at the laundromat, and the money coming in is real. So is the city van that circled the block twice last night with a drone-shaped shadow riding above it.',
    choices: [
      {
        label: 'Keep flying without a permit until the hearing',
        effects: [
          { e: 'revenue', d: 1900 },
          { e: 'stress', d: 6 },
          { e: 'rep', d: 1 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'drops_done', v: true },
          { e: 'flag', scope: 'company', key: 'grey_market', v: true },
        ],
        goto: 'h_b_grey_strain',
        result: 'Your underground railway runs on nerve. Tonight, yours is holding.',
      },
      {
        label: 'Ground the fleet. Volunteer the tech to the food bank.',
        effects: [
          { e: 'revenue', d: 300 },
          { e: 'stress', d: -4 },
          { e: 'rep', d: 2 },
          { e: 'score', d: 2 },
          { e: 'flag', scope: 'company', key: 'drops_done', v: true },
          { e: 'flag', scope: 'company', key: 'foodbank', v: true },
        ],
        goto: 'h_b_grey_strain',
        result: 'The food-bank flights are legal, slow, and photographed. The city attorney follows the account. June Park follows too.',
      },
    ],
  },
  {
    id: 'h_sofia_hire',
    ambience: 'garage',
    title: 'READ YOUR CAP TABLE — IT’S CUTE',
    speaker: 'sofia',
    priority: true,
    leadIn:
      'Word about your landing problem spreads on its own. The parts shop talks. A wind-power forum starts a thread called “someone is landing boxes on porches for real.” On a wet Monday, boots come up your stairs.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'drops_done', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'sofia_resolved', cmp: 'eq', v: true } },
      ],
    },
    fuseEpochs: 4,
    prose:
      'Sofia Brandt spent years writing emergency-stop software for wind turbines — code that keeps a giant spinning machine from hurting people. She reads your flight logs on the stairs, spots a wobble in your landing code, and fixes it before she says hello. Then she names her price without looking up: ninety-five hundred a month. She glances at your company papers. “Or three percent of the company. I read your cap table. It’s cute.”',
    choices: [
      {
        label: '$9,500 a month, full-time',
        effects: [
          { e: 'burn', d: 9500 },
          { e: 'meet', who: 'sofia' },
          { e: 'rel', who: 'sofia', aff: 1 },
          { e: 'stress', d: -2 },
          { e: 'flag', scope: 'company', key: 'sofia_resolved', v: true },
          { e: 'flag', scope: 'company', key: 'sofia_full', v: true },
        ],
        goto: 'h_b_sofia_settled',
        result: 'By Friday she has rewritten the landing code and cut half of it. The code is smaller. The shuttle falls better.',
      },
      {
        label: 'Three percent equity',
        effects: [
          { e: 'burn', d: 5200 },
          { e: 'meet', who: 'sofia' },
          { e: 'stake', who: 'sofia', d: 3 },
          { e: 'rel', who: 'sofia', resp: 1 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'sofia_resolved', v: true },
          { e: 'flag', scope: 'company', key: 'sofia_equity', v: true },
        ],
        goto: 'h_b_sofia_settled',
        result: '“Points it is.” She shakes like she’s closing a merger. Half-time, all heart, and your burn survives the month.',
      },
      {
        label: 'Contract her part-time, month to month',
        effects: [
          { e: 'burn', d: 4000 },
          { e: 'meet', who: 'sofia' },
          { e: 'rel', who: 'sofia', aff: -1 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'sofia_resolved', v: true },
          { e: 'flag', scope: 'company', key: 'sofia_parttime', v: true },
        ],
        goto: 'h_b_sofia_settled',
        result: '“Month to month,” she repeats, using the voice people save for choices they will regret.',
      },
    ],
  },
  {
    id: 'h_marcus_card',
    ambience: 'street',
    accent: 'corp',
    title: 'A BLACK CAR BELOW THE LAUNDROMAT',
    speaker: 'marcus',
    priority: true,
    leadIn:
      'A black car has appeared on the block all week. It stays long enough to be noticed, then leaves. On Thursday it parks, and the laundromat goes quiet the way rooms do when money walks in.',
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 6 }, { k: 'not', p: { k: 'met', who: 'marcus' } }] },
    prose:
      'Marcus Vale sends the car away and takes the stairs himself. That is his whole pitch. VP of Logistics Networks, MERIDIAN. He looks at the shuttle the way a man looks at a rival’s child, measuring how tall it might grow. “We looked at delivery tubes back in ’27. Beautiful physics, terrible economics. Convince me yours makes money.”',
    choices: [
      {
        label: 'Charm him. Rivals remember manners.',
        requires: { k: 'stress', cmp: 'lt', v: 85 },
        effects: [
          { e: 'meet', who: 'marcus' },
          { e: 'rel', who: 'marcus', aff: 1 },
          { e: 'rep', d: 1 },
          { e: 'stress', d: 2 },
          { e: 'flag', scope: 'company', key: 'meridian_watching', v: true },
        ],
        goto: 'h_b_after_vale',
        result: 'He laughs once — real, at a line that surprises you too. The card he leaves is heavier than a card should be.',
      },
      {
        label: 'Tell him MERIDIAN’s drones wake up whole streets',
        effects: [
          { e: 'meet', who: 'marcus' },
          { e: 'rel', who: 'marcus', standing: 'hostile' },
          { e: 'rep', d: 1 },
          { e: 'score', d: 1 },
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'meridian_enemy', v: true },
        ],
        goto: 'h_b_after_vale',
        result: 'His face does something expensive. “Spoken like a man who’s never been shouted at by a board.” He takes the stairs down slowly.',
      },
      {
        label: 'Pitch him the partnership now',
        effects: [
          { e: 'meet', who: 'marcus' },
          { e: 'rel', who: 'marcus', aff: 1 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'meridian_talks', v: true },
        ],
        goto: 'h_b_after_vale',
        result: '“Not yet,” he says, pleased you asked. “Grow a little. Ripeness is everything.”',
      },
    ],
  },
  {
    id: 'h_nadia_call',
    ambience: 'garage',
    title: 'THE JOURNALIST',
    speaker: 'nadia',
    leadIn:
      'Your inbox has learned your name. Pitch decks you never asked for, a podcast invite, two recruiters fishing for your only engineer. Buried in the noise, one email actually matters.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'drops_done', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 8 },
        { k: 'not', p: { k: 'met', who: 'nadia' } },
      ],
    },
    weight: 3,
    prose:
      'Nadia Osei writes the column founders pretend they skip. Her email is four words long. “Coffee? Off record?” Under it, she links her story about MERIDIAN’s warehouse injuries — the one that got a VP moved to a satellite office. Her next column could put HYPERCHUTE on every investor’s screen. She wants you to understand the size of her reach.',
    choices: [
      {
        label: 'Full access. Show her everything.',
        goto: 'h_b_after_nadia',
        effects: [
          { e: 'meet', who: 'nadia' },
          { e: 'rel', who: 'nadia', aff: 2, resp: 1 },
          { e: 'rep', d: 2 },
          { e: 'score', d: 1 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'press_friend', v: true },
        ],
        result: 'She spends a day in the garage asking the questions investors are too polite to ask. The profile runs under the headline THE RAILWAY IN THE SKY.',
      },
      {
        label: 'Off the record, carefully',
        goto: 'h_b_after_nadia',
        effects: [
          { e: 'meet', who: 'nadia' },
          { e: 'rel', who: 'nadia', aff: 1 },
          { e: 'flag', scope: 'company', key: 'press_cautious', v: true },
        ],
        result: 'Two hours, two coffees. She leaves with careful notes and your best lines still safely yours. She respects the discipline.',
      },
      {
        label: 'No comment',
        goto: 'h_b_after_nadia',
        effects: [
          { e: 'meet', who: 'nadia' },
          { e: 'rel', who: 'nadia', standing: 'hostile', aff: -2 },
          { e: 'flag', scope: 'company', key: 'press_enemy', v: true },
        ],
        result: '“Everyone says that before the interesting part happens,” she says. She writes something down anyway.',
      },
    ],
  },
  {
    id: 'h_act1_close',
    ambience: 'garage',
    accent: 'night',
    art: 'world_waitlist',
    landmark: true,
    title: 'ELEVEN WEEKS IN',
    priority: true,
    leadIn:
      'The date sneaks up on a Tuesday, the way anniversaries do when you were too busy to notice them. Three months ago, this address was a laundromat with storage. You stand at the top of the stairs and finally look at it.',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 12 },
        { k: 'flag', scope: 'company', key: 'drops_done', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act1_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Mrs. Delgado raises your rent and calls it congratulations. Even investors pay market rate. The waiting list is a spreadsheet now. Money in the account comes from customers instead of savings. In the room next door, letters from the Office of Aerial Corridors have grown thicker than the Bible. Hard things are coming — a copycat, a war, a problem still hidden from you. The railway is real now, and you built it, along with every choice about who got to help.',
    choices: [
      {
        label: 'Face year two',
        effects: [
          { e: 'score', d: 2 },
          { e: 'stress', d: -4 },
          { e: 'flag', scope: 'company', key: 'act1_done', v: true },
        ],
        goto: 'h_bridge_y2',
        result: 'Year two starts the way year one ended: faster than expected.',
      },
    ],
  },

  // The pilot application is the company's oxygen: any opening path that
  // didn't file at entry gets pulled back to it here. A railway needs sky.
  {
    id: 'h_file_pilot',
    ambience: 'garage',
    accent: 'wind',
    art: 'world_permit_office',
    title: 'A RAILWAY NEEDS SKY',
    priority: true,
    fuseEpochs: 3,
    leadIn:
      'The practice drops are getting boring, which is the polite word for perfect. Sixty feet, package after package, soft landings on a roof you already own.',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 2 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'pilot_booked', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'permit_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Everything you have gathered — advice, company papers, the machine on its braided leash — points at the same missing piece — legal airspace. The Office of Aerial Corridors accepts pilot applications on Tuesdays. Each week you wait, the railway stays a rumor with a prototype. Across town, MERIDIAN’s permit team files things for breakfast.',
    choices: [
      {
        label: 'File the corridor pilot application',
        effects: [
          { e: 'flag', scope: 'company', key: 'pilot_booked', v: true },
          { e: 'stress', d: 4 },
        ],
        goto: 'h_b_filing',
        result: 'Forty minutes of city forms, then one checkbox that has clearly never been checked before — PROPOSED USE: DESCENT LOGISTICS.',
      },
    ],
  },

  // ---- connective tissue — the weeks between decisions -------------------------
  // Bridges are full beats: aftermath of the choice, then the pressure that
  // makes the next scene inevitable. Single exit, no stats, pure story.
  {
    id: 'h_b_filing',
    ambience: 'garage',
    art: 'world_filing_night',
    kind: 'bridge',
    title: 'WHAT THE CITY HEARS',
    prose:
      'The confirmation lands at 2:07 a.m. APPLICATION RECEIVED — OFFICE OF AERIAL CORRIDORS. By morning, the system has sent it to Zoning, Insurance, and a sidewalk office whose name sounds fake. You spend the next days running practice drops and refreshing a status page that says PENDING in a font you are learning to hate. Somewhere in a gray building, someone is deciding whether your railway belongs in the sky.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_permit_wall' }],
  },
  {
    id: 'h_b_advisor_hunt',
    ambience: 'cafe',
    accent: 'street',
    art: 'world_coldmail',
    kind: 'bridge',
    title: 'CREDIBILITY SHOPPING',
    prose:
      'You draft a list of serious people who might answer a founder’s cold email. Eleven names become seven once you are honest. Two reply. One wants money just to talk. The other is a retired freight executive your old boss once called “the reason our cargo survived two ports and one coup.” She answers with a time and your own address. Priya Raghavan checks the garage before the meeting.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_priya_pitch' }],
  },
  {
    id: 'h_b_paper_first',
    ambience: 'office',
    art: 'world_postmortems',
    kind: 'bridge',
    title: 'HOW COMPANIES ACTUALLY DIE',
    prose:
      'You spend an evening reading stories about dead startups. You expect the killers to be markets and money. The real villains are smaller. A founder forgot to sign his invention over to the company, then lost it to a co-founder’s old boss. One funding paper hid a sentence everyone skipped. A handshake deal ended with both sides in court. Three stories, years apart, give the same advice: get a real lawyer before you need one. The name that keeps coming up works out of a shipping container downtown.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_b_container' }],
  },
  {
    id: 'h_b_priya_signed',
    ambience: 'garage',
    art: 'priya_signed',
    kind: 'bridge',
    title: 'THINGS THAT WILL KILL YOU FIRST',
    speaker: 'priya',
    prose:
      'Priya puts paperwork first on her kill list. Permits, insurance, and the deputy commissioner can wait one minute. “Someone serious will ask to see your company files within the month,” she says, already typing the first introduction from your workbench. “Company certificate. Paperwork that gives HYPERCHUTE the invention. A cap table that doesn’t embarrass us.” The second intro replies that night with one question: who is your lawyer? Priya reads it over your shoulder. “The real kind,” she says. “If you need one, there’s a shipping container downtown you should visit before you answer this email.”',
    choices: [{ label: 'Continue', effects: [], goto: 'h_b_container' }],
  },
  {
    id: 'h_b_priya_waitlist',
    ambience: 'garage',
    art: 'world_kill_list',
    kind: 'bridge',
    title: 'THE LIST SHE LEFT ANYWAY',
    prose:
      'She leaves the term sheet unsigned, but she leaves behind one handwritten page titled THINGS THAT WILL KILL YOU FIRST — “free of charge, so it kills you slower.” The list covers permits, insurance, and the deputy commissioner by name, and at the top, underlined twice, it says PAPERWORK, because a company with messy papers is just a hobby with bills. The last line is an address for a shipping container downtown.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_b_container' }],
  },
  {
    id: 'h_b_priya_alone',
    ambience: 'night',
    place: 'THE GARAGE',
    art: 'world_alone_night',
    kind: 'bridge',
    title: 'ONE HUNDRED PERCENT OF EVERYTHING',
    prose:
      'Alone means all of it is yours — the equity, the company forms at 1 a.m., the insurance questions, and the parts supplier who refuses to sell until both sides sign a real contract. By Thursday you have signed your own name eleven times and understood maybe seven. The supplier’s ordering system rejects your homemade contract with one automated suggestion, in bold — GET A LAWYER. Everyone you ask downtown mentions the same shipping container.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_b_container' }],
  },
  {
    id: 'h_b_papered',
    ambience: 'office',
    art: 'world_signing',
    kind: 'bridge',
    title: 'REAL ON PAPER',
    prose:
      'The documents come back in three days, with little tabs where you sign. Company certificate, company rules, the paper that gives HYPERCHUTE your invention, and an equity plan you will need sooner than you think. It is the least dramatic $18,000 of your life and, Tomás insists, the most important. “Nobody ever calls me about the year things went right.” The company is real now in the way a judge would respect. He leaves one free piece of advice at the door: “Paper protects you from lawsuits. Physics is your problem. Keep an operator close — someone who has moved real freight.” The flying part is still yours.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_rolodex',
    ambience: 'office',
    accent: 'street',
    art: 'tomas_rolodex',
    kind: 'bridge',
    title: 'THE ROLODEX WAKES UP',
    speaker: 'tomas',
    prose:
      'The one percent starts working immediately. Introductions arrive in twos and threes — an insurance broker who takes falling packages seriously, a factory with open time, and a permit fixer who charges like sin. Tomás mentions one name almost casually, the way people mention weather: an angel asking around about “the tube thing in the Flats.” “June Park,” he says. “If she shows up, don’t negotiate like you’re grateful.”',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_diy',
    ambience: 'night',
    place: 'THE GARAGE',
    art: 'world_diy_legal',
    kind: 'bridge',
    title: 'PROBABLY FINE',
    prose:
      'The templates come from three states and two decades. You stitch them together at 3 a.m. with find-and-replace and adrenaline, signing pages that mention a Delaware you have never seen. By Friday, the company is incorporated — fees paid, boxes checked, real in a state database. Somewhere in those documents, a mistake you cannot see is ticking like a cheap watch. Someday you will hear it go off.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_appeal_prep',
    ambience: 'night',
    place: 'THE GARAGE',
    art: 'world_appeal_doc',
    kind: 'bridge',
    title: 'FORTY PAGES OF HOPE',
    prose:
      'You fly two hundred tether drops in six days and log every one — fall speed, wind, every failure, and what you changed after it. The document grows teeth. Around page thirty, you stop sounding scared and start sounding like an engineer. The hearing notice arrives in the mail with a room number: 4-B.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_rogue_nights',
    ambience: 'night',
    place: 'THE FLATS',
    accent: 'wind',
    art: 'world_dawn_flights',
    kind: 'bridge',
    title: 'DAWN SHIFTS',
    prose:
      'Rogue flying has rules because you wrote them yourself: dawn only, your own block, waivers signed, and catch-nets on the porches of everyone willing to help. The neighbors who said yes start leaving their porch lights on for the 6 a.m. run, which feels like community until you imagine those same lights listed in a city report. On Thursday, a van with government plates makes its first slow lap of the block, and everyone acts like everyone else is invisible.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_first_drops_rogue' }],
  },
  {
    id: 'h_b_corridor_granted',
    ambience: 'street',
    accent: 'wind',
    art: 'world_corridor_map',
    kind: 'bridge',
    title: 'A LINE ON A MAP',
    prose:
      'The permit arrives as a map file and a stamp. One flight corridor, two hundred feet up, covers your block and the four around it. You print the map and pin it over the workbench — a thin blue line through the Flats, the first airspace in this city that answers to you. The approval ends with the line you need — OPERATIONS MAY COMMENCE UPON RECEIPT. That means tomorrow, if the batteries charge tonight.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_first_drops_clean' }],
  },
  {
    id: 'h_b_first_corridor',
    ambience: 'hearing',
    art: 'world_certificate',
    kind: 'bridge',
    title: 'STAMPED',
    prose:
      'The certificate arrives by email, then — absurdly, wonderfully — by mail, with a raised seal you run a thumb over twice. One corridor. Two hundred feet. Renewal depends on safe flights and clean reports. The boring paperwork is how you inherit the sky. The first legal drop is scheduled for 6:58 a.m. Tuesday, to Mrs. Delgado, who signed the landing-sleeve agreement in cursive.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_first_drops_clean' }],
  },
  {
    id: 'h_b_wired',
    ambience: 'garage',
    art: 'world_wire',
    kind: 'bridge',
    title: 'WHAT MONEY SOUNDS LIKE',
    prose:
      'The wire lands and the garage changes pitch. You pay the laundromat three months ahead, order the good connectors, and book factory time like someone who means it. June’s first request as an investor is one sentence: “Numbers monthly, surprises never.” You tape it above the workbench. Funding gives you a new way to die — spending like the bank account is bottomless. Your job is to stay hungry with cash in the bank.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_bootstrap',
    ambience: 'night',
    place: 'THE GARAGE',
    art: 'world_ramen_math',
    kind: 'bridge',
    title: 'RAMEN MATH',
    prose:
      'Staying independent means counting everything. On the whiteboard where an investor’s logo would have hung, you write the math — every customer dollar helps you keep control, and every week is a bet that the machine earns faster than it burns. June’s card stays on the workbench, face up, like a fire alarm behind glass. Some founders can live like this. You are about to learn if you can.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_scale_strain',
    ambience: 'garage',
    accent: 'street',
    art: 'world_jitter',
    kind: 'bridge',
    title: 'THE JITTER',
    prose:
      'Deliveries to real houses go worse than the practice runs. Wind coming off Mrs. Delgado’s roof pushes the shuttle around, the catch-sleeve on her porch has worked loose, and the landing software reacts too slowly to correct for any of it. Drop forty-one hits so hard it bruises a box of pears. You stay up past midnight reading the flight logs, and you finally admit the truth: the waiting list keeps growing, but the landings keep getting worse, and fixing this software is beyond you. You need to hire someone better than you.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_sofia_hire' }],
  },
  {
    id: 'h_b_grey_strain',
    ambience: 'garage',
    accent: 'wind',
    art: 'world_grey_margin',
    kind: 'bridge',
    title: 'THE MARGIN FOR ERROR IS A ROOF',
    prose:
      'Flying without a permit means one bad landing on the wrong porch puts your name in a headline. So you fly carefully, and even careful landings shake. The software reacts late in gusts, and the drops get rougher whenever the wind rises. You read the logs on the stairs at midnight. Every bad line points at the same missing person, an expert who knows how to make falling safe. You need her before the wind gets lucky.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_sofia_hire' }],
  },
  {
    id: 'h_b_sofia_settled',
    ambience: 'garage',
    art: 'world_sofia_landing',
    kind: 'bridge',
    title: 'FALL BETTER',
    prose:
      'In her first week she rewrites the landing system and ships updates with one-word notes like “fall better” and “no.” The shuttle stops correcting like a nervous student and starts correcting like a reflex. Hard landings disappear from the logs. The garage gains a foam-block crash-test rig and one strict rule — ask before touching Sofia’s equipment. Near midnight, a black car idles across the street for twenty minutes, then leaves with everyone still inside. The company is getting good enough to be noticed, and that changes the room.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_vale',
    ambience: 'street',
    accent: 'corp',
    art: 'world_vale_card',
    kind: 'bridge',
    title: 'BEING SEEN',
    prose:
      'The card sits on the workbench for a day before you pin it to the corkboard, slightly crooked, where it watches you work. MERIDIAN knows your name now. Its logistics division loses more money by lunch than you will spend this year. The visit might have been scouting, courtesy, or appetite. Any of those means the same thing. The war for the last mile has noticed the railway. Work faster.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_nadia',
    ambience: 'garage',
    art: 'nadia_notebook',
    kind: 'bridge',
    title: 'FILED AWAY',
    prose:
      'Journalists leave the room and keep the story. Some version of you rode down the stairs in Nadia’s notebook. It lives now in a draft with your name on it, waiting for the day the railway becomes news again. In this city, that day always comes. The encounter pays one honest wage anyway. You heard your own company described by someone trained to spot what founders hide.',
    choices: [{ label: 'Continue', effects: [] }],
  },
]
