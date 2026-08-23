import type { SceneDef } from '../schema'

/**
 * HYPERCHUTE — Act One: FOUND.
 * The vertical slice. Garage, cap table decisions, corridor politics, first drops.
 */
export const ACT_ONE: readonly SceneDef[] = [
  {
    id: 'h_entry',
    title: 'THE GARAGE',
    prose:
      'A rented unit above the Sudz & Spin laundromat in the Flats. Dryer heat, solder smoke, and one prototype shuttle hanging from the ceiling on a braided tether — a shoebox with rotors and a pneumatic drop-tube salvaged from a dead bank’s drive-through. On your screen, the incorporation papers say you own one hundred percent of a company called HYPERCHUTE. Through the window, a MERIDIAN drone hums past with someone’s cold-pressed juice. Nobody knows your name yet. That cuts both ways.',
    choices: [
      {
        label: 'Book a corridor pilot with the city — proof before polish',
        effects: [
          { e: 'flag', scope: 'company', key: 'pilot_booked', v: true },
          { e: 'stress', d: 5 },
          { e: 'enqueue', scene: 'h_permit_wall' },
        ],
        result: 'You file the application at 2 a.m., high on it.',
      },
      {
        label: 'Recruit an advisor before anyone important sees this',
        effects: [{ e: 'enqueue', scene: 'h_priya_pitch' }],
        result: 'Credibility is also infrastructure.',
      },
      {
        label: 'Incorporate clean — lawyer first, hardware second',
        effects: [{ e: 'enqueue', scene: 'h_tomas_terms' }],
        result: 'Paper first. It’s never just paper.',
      },
    ],
  },
  {
    id: 'h_priya_pitch',
    title: 'TWO PERCENT',
    speaker: 'priya',
    when: { k: 'not', p: { k: 'met', who: 'priya' } },
    weight: 2,
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
          { e: 'enqueue', scene: 'h_tomas_terms' },
        ],
        result: 'She shakes once, dry and firm, then starts a list titled THINGS THAT WILL KILL YOU FIRST.',
      },
      {
        label: '“Cash when the angel money lands. Waitlist me.”',
        effects: [
          { e: 'meet', who: 'priya' },
          { e: 'rel', who: 'priya', aff: -1 },
          { e: 'flag', scope: 'company', key: 'priya_waitlist', v: true },
          { e: 'stress', d: 2 },
        ],
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
        result: 'Nineteen years of pattern recognition folds its term sheet and leaves without another word.',
      },
    ],
  },
  {
    id: 'h_tomas_terms',
    title: 'TWO WAYS TO PAY ME',
    speaker: 'tomas',
    when: { k: 'not', p: { k: 'met', who: 'tomas' } },
    weight: 2,
    prose:
      'Tomás Reyes does contracts out of a converted shipping container downtown and bills like a man who has read every clause he has ever written. ‘Everyone wants the big-firm lawyer until the invoice lands,’ he says. He writes two numbers on the garage wall in marker: $18,000 flat. Or one percent — “and my rolodex goes with it.”',
    choices: [
      {
        label: '$18,000 cash',
        requires: { k: 'treasury', cmp: 'gte', v: 18000 },
        effects: [
          { e: 'treasury', d: -18000 },
          { e: 'meet', who: 'tomas' },
          { e: 'rel', who: 'tomas', aff: 1 },
          { e: 'flag', scope: 'company', key: 'legal_solid', v: true },
        ],
        result: 'He drafts the IP assignment before he leaves. Everything you build now actually belongs to the company.',
      },
      {
        label: 'One percent, plus the rolodex',
        effects: [
          { e: 'meet', who: 'tomas' },
          { e: 'rel', who: 'tomas', aff: 2, resp: 2 },
          { e: 'stake', who: 'tomas', d: 1 },
          { e: 'flag', scope: 'company', key: 'lawyer_ally', v: true },
          { e: 'score', d: 1 },
        ],
        result: '‘Smart,’ he says, pocketing the marker. ‘Broke founders make the best clients. Something to prove.’',
      },
      {
        label: 'Download templates. How hard can it be?',
        effects: [
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'diy_legal', v: true },
        ],
        result: 'The templates are fine. Probably. The templates are probably fine.',
      },
    ],
  },
  {
    id: 'h_permit_wall',
    title: 'NO PROVEN DESCENT SAFETY CASE',
    speaker: 'corr',
    priority: true,
    fuseEpochs: 3,
    when: { k: 'all', of: [{ k: 'flag', scope: 'company', key: 'pilot_booked', cmp: 'eq', v: true }, { k: 'not', p: { k: 'flag', scope: 'company', key: 'permit_done', cmp: 'eq', v: true } }] },
    prose:
      'The Office of Aerial Corridors denies your pilot application in 0.4 seconds. The rejection notice cc’s three departments you have never heard of and one — Department of Sidewalk Integrity — that sounds invented. At the bottom, in machine-perfect passive voice: REAPPLICATION PERMITTED UPON DEMONSTRATED DESCENT COMPLIANCE.',
    choices: [
      {
        label: 'File a full appeal with engineered descent data',
        effects: [
          { e: 'treasury', d: -6000 },
          { e: 'stress', d: 6 },
          { e: 'flag', scope: 'company', key: 'corridor', v: 'appealed' },
          { e: 'flag', scope: 'company', key: 'permit_done', v: true },
          { e: 'meet', who: 'corr' },
        ],
        result: 'Three weeks to a hearing. Your descent-safety case is forty pages of hope formatted as engineering.',
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
        result: 'Tomás makes one call from the container. ‘Fast-tracked. Don’t make me spend this twice.’',
      },
    ],
  },
  {
    id: 'h_hearing',
    title: 'THE DESCENT-SAFETY HEARING',
    priority: true,
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
        result: 'Stamped, sealed, e-mailed. The sky over the Flats is officially yours — two hundred feet at a time.',
      },
    ],
  },
  {
    id: 'h_june_via_tomas',
    title: 'THE ANGEL',
    priority: true,
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
    title: 'SOMEONE IS WATCHING YOUR DEMO',
    priority: true,
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
    title: 'ONE FIFTY FOR EIGHT',
    speaker: 'june',
    prose:
      'June turns her phone around: a wiring diagram of your own shuttle, annotated in three colors. ‘I read everything. Here’s my number. One hundred fifty thousand for eight percent. I don’t lead rounds I can’t defend at dinner parties — and a railway in the sky? I can defend that.’',
    choices: [
      {
        label: 'Take the check',
        effects: [
          { e: 'treasury', d: 150000 },
          { e: 'meet', who: 'june' },
          { e: 'stake', who: 'june', d: 8 },
          { e: 'rel', who: 'june', aff: 1 },
          { e: 'score', d: 2 },
          { e: 'stress', d: -4 },
          { e: 'flag', scope: 'company', key: 'angel_funded', v: true },
        ],
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
        result: 'She doesn’t blink. ‘Seven. Because you asked. Don’t negotiate with me twice.’',
      },
      {
        label: 'Stay clean while it’s still yours',
        effects: [
          { e: 'meet', who: 'june' },
          { e: 'rel', who: 'june', aff: 1, resp: 1 },
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'bootstrapping', v: true },
        ],
        result: 'She leaves a card on the workbench anyway. ‘When you’re ready to move, move fast. Doors like me don’t stay open.’',
      },
    ],
  },
  {
    id: 'h_first_drops_clean',
    title: 'BEAM DOWN',
    priority: true,
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
        goto: 'h_sofia_hire',
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
        goto: 'h_sofia_hire',
        result: 'Twenty porches, zero failures. Sofia would call that a dataset. Priya would call it leaving money outside.',
      },
    ],
  },
  {
    id: 'h_first_drops_rogue',
    title: 'TWELVE ROOFS, NO PERMISSION',
    priority: true,
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
        label: 'Keep flying grey until the hearing',
        effects: [
          { e: 'revenue', d: 1900 },
          { e: 'stress', d: 6 },
          { e: 'rep', d: 1 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'drops_done', v: true },
          { e: 'flag', scope: 'company', key: 'grey_market', v: true },
        ],
        goto: 'h_sofia_hire',
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
        goto: 'h_sofia_hire',
        result: 'Legal, slow, and photographed. The city attorney follows the account. So does June Park.',
      },
    ],
  },
  {
    id: 'h_sofia_hire',
    title: 'READ YOUR CAP TABLE — IT’S CUTE',
    speaker: 'sofia',
    priority: true,
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
        result: 'By Friday she has rewritten the descent controller and deleted half of it. The code is smaller. It falls better.',
      },
      {
        label: 'Three points',
        effects: [
          { e: 'burn', d: 5200 },
          { e: 'meet', who: 'sofia' },
          { e: 'stake', who: 'sofia', d: 3 },
          { e: 'rel', who: 'sofia', resp: 1 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'sofia_resolved', v: true },
          { e: 'flag', scope: 'company', key: 'sofia_equity', v: true },
        ],
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
        result: '‘Month to month,’ she repeats, in the tone people use for things that end badly.',
      },
    ],
  },
  {
    id: 'h_marcus_card',
    title: 'A BLACK CAR BELOW THE LAUNDROMAT',
    speaker: 'marcus',
    priority: true,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 6 }, { k: 'not', p: { k: 'met', who: 'marcus' } }] },
    prose:
      'Marcus Vale sends the car away and takes the stairs himself, which is his entire pitch. VP of Logistics Networks, MERIDIAN. He looks at the shuttle the way a man looks at a rival’s child — measuring how tall it might grow. “We considered tubes in ’27. Beautiful physics, ugly economics. Convince me yours grew up.”',
    choices: [
      {
        label: 'Charm him. Rivals remember manners.',
        effects: [
          { e: 'meet', who: 'marcus' },
          { e: 'rel', who: 'marcus', aff: 1 },
          { e: 'rep', d: 1 },
          { e: 'stress', d: 2 },
          { e: 'flag', scope: 'company', key: 'meridian_watching', v: true },
        ],
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
        result: '‘Not yet,’ he says, pleased you asked. ‘Grow a little. Ripeness is everything.’',
      },
    ],
  },
  {
    id: 'h_nadia_call',
    title: 'THE JOURNALIST',
    speaker: 'nadia',
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
        effects: [
          { e: 'meet', who: 'nadia' },
          { e: 'rel', who: 'nadia', aff: 1 },
          { e: 'flag', scope: 'company', key: 'press_cautious', v: true },
        ],
        result: 'Two hours, two coffees, nothing usable and nothing burned. She respects the discipline. She notes it.',
      },
      {
        label: 'No comment',
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
    title: 'ELEVEN WEEKS IN',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 12 },
        { k: 'flag', scope: 'company', key: 'drops_done', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act1_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'The laundromat owner raises your rent and calls it congratulations. The waiting list is a spreadsheet now. There is money in the account that did not come from anyone’s savings, and there is a folder of letters from the Office of Aerial Corridors thicker than the Bible in the room next door. Whatever comes next — the clone, the war, the thing nobody has thought of yet — the railway is real. You built that. With help you chose well or didn’t.',
    choices: [
      {
        label: 'Face year two',
        effects: [
          { e: 'score', d: 2 },
          { e: 'stress', d: -4 },
          { e: 'flag', scope: 'company', key: 'act1_done', v: true },
        ],
        goto: 'h_stub_fight',
        result: 'Year two begins the way year one ended: faster than expected.',
      },
    ],
  },
]
