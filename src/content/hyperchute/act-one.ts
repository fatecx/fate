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
    foley: 'stairs',
    title: 'DON’T YOU HAVE A JOB?',
    landmark: true,
    speaker: 'marisol',
    leadIn:
      'Week one of being a founder tastes like instant coffee and sounds like dryer drums. You are soldering a gimbal mount at 8 a.m. when the stairs creak with the unmistakable rhythm of a landlady with an agenda.',
    prose:
      'Mrs. Delgado owns the laundromat, the building, and — by long habit — the moral authority of the block. She takes the stairs at 8 a.m. with a rent envelope in one hand and a question she has clearly rehearsed: “Every day you are up here. Machines humming. My dryers vibrate. Don’t you have a job?” You tell her the truth: this is the job. A railway in the sky. Boxes that fall soft as rain, to anyone, not just the hills. She squints at the tethered shuttle for a long, unhurried minute. “My granddaughter waits forty minutes for a bus to bring her insulin,” she says, and pulls a second envelope from her apron — creased, warm, bank-banded. Ten thousand dollars. “I was saving for a cruise. Boats are slow.”',
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
          'She signs the receipt like a woman who has closed harder deals, then tapes her copy to the wall behind the register — where the whole neighborhood will see it.',
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
          '“Double,” she repeats, satisfied, and writes it in a ledger older than you. Owing money to a bank is a number. Owing it to a woman you see every morning is a schedule.',
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
          'She puts the envelope away without offense, the way people do when they know the offer stands forever. “Then my porch is first,” she says. “When the boxes fall.”',
      },
    ],
  },
  {
    id: 'h_entry',
    ambience: 'garage',
    landmark: true,
    art: 'world_garage',
    leadIn:
      'The stairs stop creaking. The garage is yours again — the tether creaking softly, the whole improbable thing waiting to be started.',
    title: 'THE GARAGE',
    prose:
      'A rented unit above the Sudz & Spin laundromat in the Flats. Dryer heat, solder smoke, and one prototype shuttle hanging from the ceiling on a braided tether — a shoebox with rotors and a pneumatic drop-tube salvaged from a dead bank’s drive-through. On your screen, the incorporation papers say you own one hundred percent of a company called HYPERCHUTE. Through the window, a MERIDIAN drone hums past with someone’s cold-pressed juice. Nobody knows your name yet. That cuts both ways.',
    choices: [
      {
        label: 'File for a city flight permit. Prove it works first',
        effects: [
          { e: 'flag', scope: 'company', key: 'pilot_booked', v: true },
          { e: 'stress', d: 5 },
        ],
        goto: 'h_b_filing',
        result: 'You file the application at 2 a.m., high on it.',
      },
      {
        label: 'Recruit an advisor before anyone important sees this',
        effects: [],
        goto: 'h_b_advisor_hunt',
        result: 'Credibility is also infrastructure.',
      },
      {
        label: 'Get a real lawyer and incorporate properly first',
        effects: [],
        goto: 'h_b_paper_first',
        result: 'Paper first. It’s never just paper.',
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
      'The Flats talks. Mrs. Delgado’s taped-up receipt has been read by half the neighborhood, the incorporation filing is public record, and somewhere in the overlap between the two, your garage acquired a reputation. On Monday, a name from a different weight class asks for twenty minutes.',
    prose:
      'Priya Raghavan routed freight across three continents and survived two bankruptcies that were not her fault. She gives the garage exactly four seconds of inspection. ‘You’ve built a machine that drops boxes out of the sky onto people’s homes. You have no permits, no insurer, and no idea which deputy commissioner already hates you. I can fix all three.’ She slides a term sheet across the workbench: two percent, vesting over twelve months, advisory role, introductions included.',
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
        result: 'She shakes once, dry and firm, then starts a list titled THINGS THAT WILL KILL YOU FIRST.',
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
        result: 'Her smile doesn’t move. ‘Sure. I’ll be here.’',
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
        result: 'Nineteen years of pattern recognition folds its term sheet and leaves without another word.',
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
    leadIn: 'Everyone downtown gives you the same directions, and the directions still sound like a joke until you are standing in front of it.',
    prose:
      'The shipping container is real: corrugated steel wedged between two glass towers, a brass plate on the door reading REYES, ABOGADO. Inside it is all bookshelves and climate control, calmer than any office in either tower next door. A man in rolled shirtsleeves waves you toward the good chair like he has been expecting you all week.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_tomas_terms' }],
  },
  {
    id: 'h_tomas_terms',
    ambience: 'office',
    accent: 'street',
    title: 'TWO WAYS TO PAY ME',
    speaker: 'tomas',
    leadIn: 'He pours two coffees without asking, sits, and gets straight to the only question that matters.',
    prose:
      'Tomás Reyes does contracts out of a converted shipping container downtown and bills like a man who has read every clause he has ever written. ‘Everyone wants the big-firm lawyer until the invoice lands,’ he says. He writes two numbers on the garage wall in marker: $18,000 flat. Or one percent — “and my rolodex goes with it.”',
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
        result: 'He drafts the IP assignment before he leaves. Everything you build now actually belongs to the company.',
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
        result: '‘Smart,’ he says, pocketing the marker. ‘Broke founders make the best clients. Something to prove.’',
      },
      {
        label: 'Download templates. How hard can it be?',
        effects: [
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'diy_legal', v: true },
        ],
        goto: 'h_b_diy',
        result: 'The templates are fine. Probably. The templates are probably fine.',
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
      'Eleven days of PENDING, and then the status page flips on a Tuesday morning before you’ve had coffee. The email underneath it is longer than the application was.',
    when: { k: 'all', of: [{ k: 'flag', scope: 'company', key: 'pilot_booked', cmp: 'eq', v: true }, { k: 'not', p: { k: 'flag', scope: 'company', key: 'permit_done', cmp: 'eq', v: true } }] },
    prose:
      'The Office of Aerial Corridors denies your pilot application in 0.4 seconds. The rejection notice cc’s three departments you have never heard of and one — Department of Sidewalk Integrity — that sounds invented. At the bottom, in machine-perfect passive voice: REAPPLICATION PERMITTED UPON DEMONSTRATED DESCENT COMPLIANCE.',
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
        result: 'The clerk’s auto-reply grants you a date, twenty-one days out. Enough time to build a case; not enough to build a reputation.',
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
        result: 'Twelve perfect drops onto your own roof. A neighbor films the thirteenth.',
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
        result: 'Tomás knows which consultant owns which signature. Nine days later, the pilot corridor exists.',
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
        result: 'Tomás makes one call from the container. ‘Fast-tracked. Don’t make me spend this twice.’',
      },
    ],
  },
  {
    id: 'h_hearing',
    ambience: 'hearing',
    foley: 'gavel',
    title: 'THE DESCENT-SAFETY HEARING',
    art: 'world_hearing_4b',
    priority: true,
    leadIn:
      'Room 4-B is on the third floor of a building designed to make people feel processed. You wear the one jacket that survived the solder work and carry the case in triplicate, per the instructions, because the Office of Aerial Corridors does not do PDFs.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'corridor', cmp: 'eq', v: 'appealed' },
        { k: 'age', cmp: 'gte', v: 5 },
      ],
    },
    fuseEpochs: 3,
    prose:
      'Room 4-B of the Office of Aerial Corridors smells like toner and judgment. Your forty pages of hope-formatted-as-engineering hold up better than anyone expected — the descent case survives two rounds of questions and one live demo video that makes a commissioner say “huh” out loud. Deliberation lasts eleven minutes. The pilot corridor is granted.',
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
        result: 'Stamped, sealed, e-mailed. The sky over the Flats is officially yours — two hundred feet at a time.',
      },
    ],
  },
  {
    id: 'h_june_via_tomas',
    ambience: 'garage',
    foley: 'stairs',
    art: 'june_garage',
    title: 'THE ANGEL',
    priority: true,
    leadIn:
      'Tomás calls ahead, which he has never once done. ‘Clear the bench,’ he says. ‘You have a visitor. Do not be charming. Be accurate.’',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'lawyer_ally', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'met', who: 'june' } },
      ],
    },
    prose:
      'June Park arrives thirty seconds after Tomás, because she was never far away. Eleven angel checks; an instinct she calls pattern-matching and everyone else calls luck. She walks under the tethered shuttle, looks up for a long moment, and says: “A railway in the sky. Huh. My grandmother rode a train two days to reach a port. People will pay for gravity that behaves.”',
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
      'The waiting list crosses two hundred names the same week your test footage escapes whatever you thought a private channel was. Attention, it turns out, does not ask first.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'corridor', cmp: 'eq', v: 'granted' },
        { k: 'not', p: { k: 'met', who: 'june' } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'lawyer_ally', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'The rooftop test footage leaks — of course it leaks — and by Friday it has four hundred thousand views and a comment section arguing about property values. Monday morning, a woman in an expensive jacket is downstairs in the laundromat asking which unit is yours. June Park does not wait for permission to climb the stairs.',
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
      'June turns her phone around: a wiring diagram of your own shuttle, annotated in three colors. ‘I read everything. Here’s my number. One hundred fifty thousand for eight percent. I don’t lead rounds I can’t defend at dinner parties — and a railway in the sky? I can defend that.’',
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
        result: 'She doesn’t blink. ‘Seven. Because you asked. Don’t negotiate with me twice.’',
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
        result: 'She leaves a card on the workbench anyway. ‘When you’re ready to move, move fast. Doors like me don’t stay open.’',
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
      'The batteries finish charging at 4 a.m. and you are awake to see it, because of course you are. Corridor conditions: wind four knots, ceiling clear, one customer in cursive on the schedule.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'corridor', cmp: 'eq', v: 'granted' },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'drops_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Shuttle One holds station two hundred feet above the Delgado house at 6:58 a.m. The tube coughs once — then the parcel drops through the receiver sleeve and lands on the porch soft as rain. Mrs. Delgado films it screaming. By noon there are sixty names on a waiting list scrawled on the back of a parking citation.',
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
        result: 'Growth is a decision. You just made it.',
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
        result: 'Twenty porches, zero failures. Sofia would call that a dataset. Priya would call it leaving money outside.',
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
      'The waiver stack grows nightly by the printer. Somewhere between the fourth and fifth dawn shift, this stopped being a test program and became a delivery service that officially does not exist.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'corridor', cmp: 'eq', v: 'rogue' },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'drops_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Without a corridor you fly dawn shifts only, dropping to friends-of-friends who sign waivers printed at the laundromat. The money is real. So is the compliance van that circled the block twice last night, drone-shaped shadow and all.',
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
        result: 'Underground railways run on nerve. Yours is holding. For now.',
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
        result: 'Legal, slow, and photographed. The city attorney follows the account. So does June Park.',
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
      'You never post the job. Word travels anyway — through the fabricator, through a turbine-industry forum thread titled "someone is doing urban descent for real" — and on a wet Monday there are boots on your stairs.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'drops_done', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'sofia_resolved', cmp: 'eq', v: true } },
      ],
    },
    fuseEpochs: 4,
    prose:
      'Sofia Brandt wrote kill-switch software for wind turbines and treats altitude the way surgeons treat scalpels. She reads your flight logs on the stairs, fixes a gimbal jitter nobody had noticed, and names her price without looking up: nine five a month. Then she glances at your incorporation papers. “Or three points. I’ve read your cap table — it’s cute.”',
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
        result: 'By Friday she has rewritten the descent controller and deleted half of it. The code is smaller. It falls better.',
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
        result: '‘Points it is.’ She shakes like she’s closing a merger. Half-time, all-heart, and your burn survives the month.',
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
        result: '‘Month to month,’ she repeats, in the tone people use for things that end badly.',
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
      'A black car has been making appearances on the block all week — long enough to be noticed, polite enough to leave. On Thursday it parks, and the laundromat goes quiet the way rooms do when money walks in.',
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 6 }, { k: 'not', p: { k: 'met', who: 'marcus' } }] },
    prose:
      'Marcus Vale sends the car away and takes the stairs himself, which is his entire pitch. VP of Logistics Networks, MERIDIAN. He looks at the shuttle the way a man looks at a rival’s child — measuring how tall it might grow. “We considered tubes in ’27. Beautiful physics, ugly economics. Convince me yours grew up.”',
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
        result: 'He laughs once — real, at something you didn’t plan to say. The card he leaves is heavier than cards should be.',
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
        result: 'His face does something expensive. ‘Spoken like a man who’s never been shouted at by a board.’ The stairs down are slower than the stairs up.',
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
        result: '‘Not yet,’ he says, pleased you asked. ‘Grow a little. Ripeness is everything.’',
      },
    ],
  },
  {
    id: 'h_nadia_call',
    ambience: 'garage',
    foley: 'phone',
    title: 'THE JOURNALIST',
    speaker: 'nadia',
    leadIn:
      'Your inbox has learned your name: pitch decks you never asked for, a podcast invite, two recruiters fishing for your only engineer. Buried in the noise, one email that actually matters.',
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
      'Nadia Osei writes the column founders pretend not to read. Her email is four words long: “Coffee? Off record?” Underneath, unasked-for, is her piece about MERIDIAN’s warehouse injuries — the one that got a VP moved to a satellite office. She is dangerous in both directions and wants you to know she knows it.',
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
        result: 'She spends a day in the garage asking the questions investors are too polite for. The profile runs under the headline THE RAILWAY IN THE SKY.',
      },
      {
        label: 'Off the record, carefully',
        goto: 'h_b_after_nadia',
        effects: [
          { e: 'meet', who: 'nadia' },
          { e: 'rel', who: 'nadia', aff: 1 },
          { e: 'flag', scope: 'company', key: 'press_cautious', v: true },
        ],
        result: 'Two hours, two coffees, nothing usable and nothing burned. She respects the discipline. She notes it.',
      },
      {
        label: 'No comment',
        goto: 'h_b_after_nadia',
        effects: [
          { e: 'meet', who: 'nadia' },
          { e: 'rel', who: 'nadia', standing: 'hostile', aff: -2 },
          { e: 'flag', scope: 'company', key: 'press_enemy', v: true },
        ],
        result: '‘Everyone says that before the interesting part happens,’ she says, and writes something down anyway.',
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
      'It sneaks up on a Tuesday, the way anniversaries of things you were too busy to notice do. Three months ago this address was a laundromat with storage. You stand at the top of the stairs and actually look at it.',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 12 },
        { k: 'flag', scope: 'company', key: 'drops_done', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act1_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Mrs. Delgado raises your rent and calls it congratulations — investor or not, business is business. The waiting list is a spreadsheet now. There is money in the account that did not come from anyone’s savings, and there is a folder of letters from the Office of Aerial Corridors thicker than the Bible in the room next door. Hard things are coming — a copycat, a war, something nobody has thought of yet. But the railway is real now. You built that, with help you chose well or didn’t.',
    choices: [
      {
        label: 'Face year two',
        effects: [
          { e: 'score', d: 2 },
          { e: 'stress', d: -4 },
          { e: 'flag', scope: 'company', key: 'act1_done', v: true },
        ],
        goto: 'h_bridge_y2',
        result: 'Year two begins the way year one ended: faster than expected.',
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
      'The tether tests are getting boring, which is the polite word for perfect. Sixty feet of proven descent, over and over, above a roof you already own.',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 2 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'pilot_booked', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'permit_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Everything you have assembled — the advice, the paper, the machine on its braided leash — points at the same missing ingredient: airspace that is legally yours. The Office of Aerial Corridors accepts pilot applications on Tuesdays. Every week you don’t file is a week the railway is a rumor with a prototype, and somewhere across town, MERIDIAN’s permits team files things for breakfast.',
    choices: [
      {
        label: 'File the corridor pilot application',
        effects: [
          { e: 'flag', scope: 'company', key: 'pilot_booked', v: true },
          { e: 'stress', d: 4 },
        ],
        goto: 'h_b_filing',
        result: 'Forty minutes of municipal forms and one checkbox — PROPOSED USE: DESCENT LOGISTICS — that has clearly never been checked before.',
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
      'The confirmation lands at 2:07 a.m.: APPLICATION RECEIVED — OFFICE OF AERIAL CORRIDORS. By morning it has been forwarded, according to the read receipts, to Zoning, to Insurance Compliance, and to something called the Department of Sidewalk Integrity. You spend the days after flying tether tests and refreshing a status page that says PENDING in a font you are learning to hate. Somewhere in a gray building, someone is deciding what to make of a railway in the sky.',
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
      'You draft a list of everyone serious who might answer a founder’s cold email: eleven names, then seven once you’re honest about it. Two reply. One wants a fee just for the conversation. The other — a retired freight executive your old boss once called “the reason our cargo survived two ports and one coup” — answers with a time and your own address. She has already looked up the garage. Priya Raghavan does her diligence before the meeting, not after.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_priya_pitch' }],
  },
  {
    id: 'h_b_paper_first',
    ambience: 'office',
    art: 'world_postmortems',
    kind: 'bridge',
    title: 'HOW COMPANIES ACTUALLY DIE',
    prose:
      'You spend an evening reading stories about dead startups, expecting markets and money to be the killers. Mostly it turns out to be paperwork. A founder who never signed the invention over to the company, and lost it to a co-founder’s old employer. An investment note with one clause nobody read closely. A handshake deal that ended up read aloud in a courtroom. Three separate stories, years apart, end on the same advice: get a real lawyer before you need one. The name that keeps surfacing in the replies works out of a shipping container downtown.',
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
      'Item one on Priya’s list is not permits, or insurance, or the deputy commissioner. It is your own paperwork. ‘Someone serious will ask for your data room within the month,’ she says, already typing the first introduction from your workbench. ‘Certificate of incorporation. IP assignments. A cap table that doesn’t embarrass us.’ The second intro replies the same night — interested, and asking one question first: who is your counsel? Priya reads it over your shoulder. ‘The real kind,’ she says. ‘If you don’t have that yet, there’s a shipping container downtown you should visit before you answer this email.’',
    choices: [{ label: 'Continue', effects: [], goto: 'h_b_container' }],
  },
  {
    id: 'h_b_priya_waitlist',
    ambience: 'garage',
    art: 'world_kill_list',
    kind: 'bridge',
    title: 'THE LIST SHE LEFT ANYWAY',
    prose:
      'She leaves the term sheet unsigned but leaves something else: one handwritten page titled THINGS THAT WILL KILL YOU FIRST — ‘free of charge, so it kills you slower.’ Permits. Insurance. The deputy commissioner, by name. And underlined twice at the top: PAPERWORK — a company that isn’t papered isn’t a company, it’s a hobby with liability. The last line isn’t advice at all. It’s an address. A shipping container, downtown.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_b_container' }],
  },
  {
    id: 'h_b_priya_alone',
    ambience: 'night',
    art: 'world_alone_night',
    kind: 'bridge',
    title: 'ONE HUNDRED PERCENT OF EVERYTHING',
    prose:
      'Alone means all of it is yours: the equity, and also the incorporation forms at 1 a.m., the insurance questionnaire that wants a ‘chief compliance officer,’ the parts supplier who won’t open a purchase order without a countersigned master agreement. By Thursday you have signed your own name eleven times and understood maybe seven of them. The supplier’s procurement bot bounces your homemade contract with one automated suggestion, in bold: OBTAIN COUNSEL. Everyone you ask downtown mentions the same shipping container.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_b_container' }],
  },
  {
    id: 'h_b_papered',
    ambience: 'office',
    art: 'world_signing',
    kind: 'bridge',
    title: 'REAL ON PAPER',
    prose:
      'The documents come back in three days, tabbed where you sign. Certificate, bylaws, IP assignment, an equity plan you won’t need until you badly do. It is the least dramatic $18,000 of your life and, Tomás insists, the most important: ‘Nobody ever calls me about the year things went right.’ The company exists now in the way that survives arguments. He leaves you with one unpaid piece of advice at the door: ‘Paper protects you from lawsuits, not from physics. Keep an operator close — someone who has routed real freight.’ Paper doesn’t fly, though. That part is still yours.',
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
      'The one percent starts working immediately. Introductions arrive in twos and threes — an insurance broker who doesn’t laugh at the words ‘descent risk,’ a fabricator with spare line capacity, a permits consultant who bills like sin. And one name Tomás mentions almost casually, the way people mention weather: an angel who has been asking around about ‘the tube thing in the Flats.’ ‘June Park,’ he says. ‘If she shows up, don’t negotiate like you’re grateful.’',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_diy',
    ambience: 'night',
    art: 'world_diy_legal',
    kind: 'bridge',
    title: 'PROBABLY FINE',
    prose:
      'The templates are from three jurisdictions and two decades. You harmonize them at 3 a.m. with find-and-replace and adrenaline, initialing clauses that reference a Delaware you have never seen. By Friday the company is incorporated — self-certified, fee paid, real in the eyes of a state database. In the drawer where the documents live, something small and legal ticks like a cheap watch. You will hear it again someday.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_appeal_prep',
    ambience: 'night',
    art: 'world_appeal_doc',
    kind: 'bridge',
    title: 'FORTY PAGES OF HOPE',
    prose:
      'You fly two hundred tether drops in six days and log every one: descent curves, wind-shear tables, failure modes with mitigation columns. The document grows teeth. Somewhere around page thirty you stop writing like a defendant and start writing like an engineer. The hearing notice arrives in the mail with a room number: 4-B.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_rogue_nights',
    ambience: 'night',
    accent: 'wind',
    art: 'world_dawn_flights',
    kind: 'bridge',
    title: 'DAWN SHIFTS',
    prose:
      'Rogue flying has rules too — yours. Dawn only. Your own block. Waivers signed, catch-nets on the porches of the willing. The neighbors who said yes start leaving their porch lights on for the 6 a.m. run, which is either community or evidence, depending on who is asking. On Thursday, a van with government plates makes its first slow lap of the block. Everyone pretends not to notice each other.',
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
      'The permit arrives as a shapefile and a stamp: one corridor, two hundred feet, your block and the four around it. You print the map and pin it over the workbench — a thin blue line through the Flats, the first airspace in this city that answers to you. Beneath it, in the approval conditions, the sentence that matters: OPERATIONS MAY COMMENCE UPON RECEIPT. That’s tomorrow, if the batteries charge tonight.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_first_drops_clean' }],
  },
  {
    id: 'h_b_first_corridor',
    ambience: 'hearing',
    art: 'world_certificate',
    kind: 'bridge',
    title: 'STAMPED',
    prose:
      'The certificate arrives by email, then — absurdly, wonderfully — by mail, with a raised seal you run a thumb over twice. One corridor, two hundred feet, renewable on compliance. The boring paperwork, it turns out, is how you inherit the sky. The first legal drop is scheduled for 6:58 a.m. Tuesday, to a Mrs. Delgado, who signed the receiver-sleeve agreement in cursive.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_first_drops_clean' }],
  },
  {
    id: 'h_b_wired',
    ambience: 'garage',
    art: 'world_wire',
    kind: 'bridge',
    title: 'WHAT MONEY SOUNDS LIKE',
    prose:
      'The wire lands and the garage changes pitch. You pay the laundromat three months forward, order the good connectors, book fabrication line time like someone who means it. June’s first investor-update request is one sentence: ‘Numbers monthly, surprises never.’ You tape it above the workbench. There is suddenly a version of this company that dies from spending instead of starving, and it is your job to never meet it.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_bootstrap',
    ambience: 'night',
    art: 'world_ramen_math',
    kind: 'bridge',
    title: 'RAMEN MATH',
    prose:
      'Clean means counting. You do the arithmetic on the whiteboard where an investor’s logo would have gone: every dollar of revenue is one you never have to explain to anyone, and every week is a bet that the machine earns faster than it burns. June’s card stays on the workbench, face up, like a fire alarm behind glass. Some founders are built for this. You are about to find out which kind you are.',
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
      'Real porches are not tether tests. Wind eddies off the roofline of the Delgado house, a receiver sleeve sags on its bolts, and somewhere in the descent controller a gimbal correction fires ninety milliseconds late. Drop forty-one lands hard enough to bruise a box of pears. Nobody films that one. You watch the log scroll past midnight and admit what the waiting list won’t let you say out loud: the software is the company now, and it needs somebody better than you.',
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
      'Flying without cover means no second chances — one hard landing on the wrong porch is a headline with your name in it. So you fly conservative, and even conservative shakes: a gimbal correction that fires late, a descent curve that flattens uglier every time the wind has opinions. You read the logs on the stairs at midnight, and every bad line says the same name-shaped hole: this company needs someone who treats altitude like a scalpel, and it needs her before the wind gets lucky.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_sofia_hire' }],
  },
  {
    id: 'h_b_sofia_settled',
    ambience: 'garage',
    art: 'world_sofia_landing',
    kind: 'bridge',
    title: 'FALL BETTER',
    prose:
      'Her first week rewrites the descent stack in commits with one-word messages. The shuttle stops correcting like a nervous student and starts correcting like a reflex; the hard landings vanish from the logs entirely. The garage acquires a foam-block test rig and a rule about touching her oscilloscope. Once, near midnight, a black car idles across the street for twenty minutes, then leaves without anyone getting out. The company is getting good enough to be noticed. Both halves of that sentence matter.',
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
      'The card sits on the workbench for a day before you pin it to the corkboard, slightly off-level, where it watches you work. MERIDIAN knows your name now — a company whose logistics division loses more money by lunch than you will spend this year. Maybe the visit was scouting, maybe courtesy, maybe appetite. All three mean the same thing: the war for the last mile has noticed the railway. Work faster.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_nadia',
    ambience: 'garage',
    art: 'nadia_notebook',
    kind: 'bridge',
    title: 'FILED AWAY',
    prose:
      'Journalists never really leave. They file. Some version of you rode down the stairs in Nadia’s notebook, and it lives now in a drafts folder with your name on it, patient as a savings account, waiting for the day the railway becomes news again. In this city, it always becomes news again. The encounter pays you one honest wage anyway: you got to hear your own company described by someone paid to notice what founders hide.',
    choices: [{ label: 'Continue', effects: [] }],
  },
]
