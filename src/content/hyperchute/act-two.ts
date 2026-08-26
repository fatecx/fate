import type { SceneDef } from '../schema'

/** HYPERCHUTE — Act Two: FIGHT. The clone war, the street, the money. */
export const ACT_TWO: readonly SceneDef[] = [
  {
    id: 'h_bridge_y2',
    art: 'cut_year_two',
    kind: 'cutscene',
    title: 'YEAR TWO',
    marker: 'YEAR TWO',
    skipToWeek: 52,
    screens: [
      {
        title: 'YEAR TWO',
        art: 'cut_year_two',
        bg: 'street',
        prose:
          'The garage has become an office. Six desks line the floor. A server rack stands where the workbench used to be. The corridor map spills onto a second wall.',
      },
      {
        title: 'THE CLONE',
        art: 'cut_chute_launch',
        bg: 'street',
        prose:
          'Then MERIDIAN launches Chute, a cheaper copy of Hyperchute. It sells the same drops for forty percent less and loses money on each one because MERIDIAN can afford it. The war you wanted has arrived, and your company is the target.',
      },
    ],
    prose:
      'The garage has become an office. Six desks line the floor. A server rack stands where the workbench used to be. The corridor map spills onto a second wall. Then MERIDIAN launches Chute, a cheaper copy of Hyperchute. It sells the same drops for forty percent less and loses money on each one because MERIDIAN can afford it. The war you wanted has arrived, and your company is the target.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_price_war' }],
  },
  {
    id: 'h_price_war',
    ambience: 'street',
    accent: 'crowd',
    art: 'world_price_war',
    title: 'THE PRICE OF PRICE',
    priority: true,
    fuseEpochs: 3,
    leadIn:
      'The first blue tube appears on a lamppost four blocks east. Six more show up overnight, like mushrooms after rain. The stencil says CHUTE. INTRODUCTORY PRICING. Your phone starts buzzing before you finish the second sign.',
    when: { k: 'flag', scope: 'company', key: 'act1_done', cmp: 'eq', v: true },
    prose:
      'Chute’s lower price works. Your waiting list stalls, and two customers a day move to the blue tubes. The board meets over cold pizza. Right now the board is you, plus anyone you let in. Someone has to move first.',
    choices: [
      {
        label: 'Match them. Burn cash to hold the streets.',
        effects: [
          { e: 'burn', d: 2600 },
          { e: 'revenue', d: 2200 },
          { e: 'stress', d: 5 },
          { e: 'flag', scope: 'company', key: 'price_war', v: true },
        ],
        result: 'Your prices now barely cover your costs, but the waiting list stops shrinking. So does your sleep.',
        goto: 'h_b_after_pricewar',
      },
      {
        label: 'Sell reliability — the drop that never misses.',
        effects: [
          { e: 'revenue', d: 900 },
          { e: 'rep', d: 1 },
        ],
        result: 'You publish a weekly on-time report at 99.97%. The Flats notices. Insurance companies start calling.',
        goto: 'h_b_after_pricewar',
      },
      {
        label: 'Leak Chute’s accident reports to the city.',
        effects: [
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'chute_dirt', v: true },
          { e: 'rep', d: -1 },
        ],
        result: 'The files reach the city with no name attached. You tell yourself the reports are accurate, and most of them are.',
        goto: 'h_b_after_pricewar',
      },
    ],
  },
  {
    id: 'h_couriers',
    ambience: 'street',
    accent: 'crowd',
    art: 'world_couriers',
    title: 'THE COLLECTIVE',
    weight: 3,
    leadIn:
      'You know the couriers by first name now — Rosa, Dmitri, and the twins who split one route. Lately their group chat goes quiet when you walk by. That is how you know a real ask is coming.',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 54 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'People still handle the last mile. Contract couriers carry the packages the tubes leave downstairs. They arrive with a letter. Make them employees with steady pay and benefits, or they stop carrying your packages up any staircase. MERIDIAN’s couriers asked for nothing and got nothing. Yours read the news.',
    choices: [
      {
        label: 'Say yes. Full employees: W-2s, benefits, everything.',
        effects: [
          { e: 'burn', d: 3200 },
          { e: 'rep', d: 2 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'couriers_ally', v: true },
          { e: 'stress', d: -3 },
        ],
        result: 'The letter comes back signed. The note reads FIRST COMPANY TO ASK PROPERLY. Your burn rises, and the neighborhood sees it.',
        goto: 'h_b_after_couriers',
      },
      {
        label: 'Offer a middle deal: guaranteed pay, no benefits.',
        effects: [
          { e: 'burn', d: 1400 },
          { e: 'stress', d: 3 },
        ],
        result: 'Half of them sign. The other half organize harder.',
        goto: 'h_b_after_couriers',
      },
      {
        label: 'Automate the stairs. Machines don’t organize.',
        effects: [
          { e: 'burn', d: 600 },
          { e: 'rep', d: -2 },
          { e: 'stress', d: 5 },
          { e: 'flag', scope: 'company', key: 'couriers_enemy', v: true },
        ],
        result: 'You order stair-climbing attachments. They ship in six weeks. Five weeks from now, picket signs show up outside the garage.',
        goto: 'h_b_after_couriers',
      },
    ],
  },
  {
    id: 'h_strike',
    ambience: 'crowd',
    accent: 'street',
    art: 'world_strike',
    title: 'THE PORCHES GO QUIET',
    priority: true,
    fuseEpochs: 2,
    leadIn:
      'It starts on a Monday with quiet streets. The morning routes never happen. By noon, every receiver sleeve has the same flyer taped to it. The neighborhood has read it, and so have you.',
    when: { k: 'flag', scope: 'company', key: 'couriers_enemy', cmp: 'eq', v: true },
    prose:
      'The strike is calm and devastating. Couriers refuse every Hyperchute address, and they explain why at each porch. Chute pays its couriers double to cross your picket lines. The neighborhood watches what you do next.',
    choices: [
      {
        label: 'Negotiate. You were wrong about the stairs.',
        effects: [
          { e: 'burn', d: 1800 },
          { e: 'rep', d: 1 },
          { e: 'flag', scope: 'company', key: 'couriers_ally', v: true },
          { e: 'stress', d: -4 },
        ],
        result: 'You sign the deal at the laundromat on a table still warm from someone’s laundry. Every local channel plays the clip.',
        goto: 'h_b_after_strike',
      },
      {
        label: 'Hold firm. Machines finish the job.',
        effects: [
          { e: 'revenue', d: -900 },
          { e: 'stress', d: 6 },
          { e: 'rep', d: -1 },
        ],
        result: 'The drop success rate holds at 94%, then falls one point each week. The Flats starts a counter-list of porches that refuse your tubes.',
        goto: 'h_b_after_strike',
      },
    ],
  },
  {
    id: 'h_cut_meridian_ipo',
    ambience: 'exchange',
    art: 'cut_meridian_ipo',
    kind: 'cutscene',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'act1_done', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 58 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    title: 'MERIDIAN GOES PUBLIC',
    prose:
      'MERIDIAN rings the bell on a Tuesday. By the end of the day, it is worth more than the city you live in. Its founder sits on every financial channel, silver-haired and certain under the studio lights. “Logistics is solved. The last mile belongs to whoever owns the sky.” The number behind him reads $91B. Your company still lives in a garage above a laundromat.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_permit_war' }],
  },
  {
    id: 'h_permit_war',
    ambience: 'garage',
    accent: 'office',
    art: 'world_audit',
    title: 'THE AUDIT',
    priority: true,
    fuseEpochs: 4,
    leadIn:
      'The letter arrives by certified mail, which always feels bad. The letterhead is from the same office that gave you your first corridor. That morning, two men in gray park outside and take careful photos of every receiver sleeve.',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 60 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'The Office of Aerial Corridors starts a full review of every Hyperchute corridor. The press release calls it “routine,” and MERIDIAN’s lobbyists helped write it. Three of your eleven corridors must stop flying while the office reviews them. The city once loved you. Now people with deeper pockets are working the city against you.',
    choices: [
      {
        label: 'Unleash Nadia. Make the lobbying the story.',
        requires: { k: 'met', who: 'nadia' },
        goto: 'h_b_after_audit',
        effects: [
          { e: 'rep', d: 2 },
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'press_war', v: true },
          { e: 'score', d: 1 },
        ],
        result: 'Her piece runs Sunday under the headline THE SKY IS FOR SALE, and by Monday there are cameras at every hearing.',
      },
      {
        label: 'Hire the regulator who wrote the rules. For 1.5%.',
        goto: 'h_b_after_audit',
        effects: [
          { e: 'meet', who: 'dana' },
          { e: 'stake', who: 'dana', d: 1.5 },
          { e: 'rep', d: 1 },
          { e: 'flag', scope: 'company', key: 'regulator_insider', v: true },
        ],
        result: 'Dana Okafor ran the corridors office for nine years. She knows which signatures matter and who avoids calls. The review ends with a bland letter that says the problems are fixed.',
      },
      {
        label: 'Comply completely. Pause the flagged corridors.',
        goto: 'h_b_after_audit',
        effects: [
          { e: 'revenue', d: -1100 },
          { e: 'stress', d: -3 },
          { e: 'rel', who: 'corr', resp: 1 },
        ],
        result: 'You pause the flagged corridors and give the office every file it asks for. Nine weeks later, the corridors reopen with a praise letter nobody reads.',
      },
    ],
  },
  {
    id: 'h_fresno',
    ambience: 'warehouse',
    art: 'world_fresno',
    title: 'FRESNO IS BEHIND',
    weight: 2,
    leadIn:
      'The first sign is an apologetic email about parts going to larger buyers. The second sign is your account manager’s calendar, suddenly full for three weeks. Suppliers rarely announce bad news. They let you discover it.',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 62 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'The Fresno plant builds your shuttles and everyone else’s drones. Everyone else just placed bigger orders. Wait times stretch from six weeks to nineteen. Every grounded shuttle means a human courier serves that porch at a loss.',
    choices: [
      {
        label: 'Double the order. Cash up front for priority.',
        requires: { k: 'treasury', cmp: 'gte', v: 80000 },
        goto: 'h_b_after_fresno',
        effects: [
          { e: 'treasury', d: -80000 },
          { e: 'revenue', d: 1300 },
          { e: 'stress', d: 3 },
        ],
        result: 'Your shuttles move to line three, ahead of Chute’s. Fresno listens when cash arrives first.',
      },
      {
        label: 'Line up a second supplier in Reno.',
        goto: 'h_b_after_fresno',
        effects: [
          { e: 'burn', d: 900 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'dual_source', v: true },
        ],
        result: 'Reno’s parts fit a little worse and cost more. When Fresno slips again, you still have shuttles coming.',
      },
      {
        label: 'Give Fresno’s owner equity for guaranteed capacity.',
        goto: 'h_b_after_fresno',
        effects: [
          { e: 'meet', who: 'ray' },
          { e: 'stake', who: 'ray', d: 2 },
          { e: 'flag', scope: 'company', key: 'fresno_points', v: true },
          { e: 'revenue', d: 700 },
        ],
        result: 'You give two points from your own share to the man who makes your machines. He frames the certificate next to his first dollar.',
      },
    ],
  },
  {
    id: 'h_poach_sofia',
    ambience: 'garage',
    accent: 'corp',
    title: 'THE OFFICE SHE DIDN’T ASK FOR',
    speaker: 'sofia',
    priority: true,
    fuseEpochs: 3,
    leadIn:
      'A MERIDIAN recruiter has called the garage’s landline twice this month asking for “the descent engineer.” Sofia hung up both times. The third approach comes by courier, on paper, in an envelope too nice to ignore.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'sofia_resolved', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 64 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Sofia puts the offer letter on your desk without being asked. MERIDIAN offers double salary, a team of nine, and a title with “Principal” in it. “I’m staying,” she says. “And I read every line.” She wrote the safety code that tells every shuttle how to land, and now she is holding an escape hatch.',
    choices: [
      {
        label: 'Two more percent. Make her a real co-founder.',
        goto: 'h_b_after_poach',
        effects: [
          { e: 'stake', who: 'sofia', d: 2 },
          { e: 'rel', who: 'sofia', aff: 2, resp: 2 },
          { e: 'burn', d: 1000 },
          { e: 'score', d: 1 },
          { e: 'stress', d: -3 },
        ],
        result: 'She tears the letter in half before you finish talking. “Principal,” she mutters. “Of a garage.”',
      },
      {
        label: 'Match the money, keep the equity yours.',
        goto: 'h_b_after_poach',
        effects: [
          { e: 'burn', d: 6000 },
          { e: 'rel', who: 'sofia', aff: -1 },
        ],
        result: 'She stays for the number. Both of you understand the price, and it feels cold.',
      },
      {
        label: 'Let her go with blessing and a reference.',
        goto: 'h_b_after_poach',
        effects: [
          { e: 'rel', who: 'sofia', aff: -2 },
          { e: 'stress', d: 6 },
          { e: 'flag', scope: 'company', key: 'sofia_gone', v: true },
        ],
        result: 'Her fingerprints are on every line of the landing code. MERIDIAN just hired the person who made you safe. You stand in the garage and feel less safe immediately.',
      },
    ],
  },
  {
    id: 'h_viral',
    ambience: 'garage',
    accent: 'street',
    art: 'world_four_minutes',
    title: 'THE FOUR MINUTES',
    weight: 3,
    leadIn:
      'Tuesday feels normal until 3:12 p.m. Then every phone in the garage lights up with the same porch-camera clip. The view count adds another zero while you watch.',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 66 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'A man on Forty-First Street collapses. The 911 drone is eleven minutes away. The nearest Hyperchute tube sends a defibrillator to his porch in four minutes, and the first courier there knows CPR. The porch camera turns it into a national story. It reaches 40 million views. Every caption says some version of THIS is what it’s for.',
    choices: [
      {
        label: 'Ride it. National shows, op-eds, the whole arc.',
        goto: 'h_b_after_viral',
        effects: [
          { e: 'rep', d: 2 },
          { e: 'score', d: 1 },
          { e: 'stress', d: 5 },
          { e: 'flag', scope: 'company', key: 'went_national', v: true },
        ],
        result: 'You do eleven interviews in six days and say the same true thing each time. The railway was built for this. The list grows by forty thousand names.',
      },
      {
        label: 'Send Rosa the courier to the interviews. Stay off camera.',
        goto: 'h_b_after_viral',
        effects: [
          { e: 'rep', d: 1 },
          { e: 'stress', d: 1 },
          { e: 'rel', who: 'nadia', resp: 1 },
        ],
        result: 'Rosa from the courier pool does the shows and tells the story better than you could. The moment becomes hers. That makes it bigger.',
      },
    ],
  },
  {
    id: 'h_series_a',
    ambience: 'office',
    accent: 'corp',
    mood: 'negotiate',
    landmark: true,
    title: 'TWO MILLION, TWENTY POINTS',
    art: 'world_series_a',
    speaker: 'june',
    priority: true,
    fuseEpochs: 4,
    leadIn:
      'June books a meeting a week out and sends an agenda. From June, that is practically a formal declaration. She arrives with someone new in a gray suit, with a firm handshake and the calm of a man who has already read your company files.',
    when: {
      k: 'all',
      of: [
        { k: 'met', who: 'june' },
        { k: 'age', cmp: 'gte', v: 64 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'series_a', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'independent', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'June brings a partner from Sandhill and lets him talk for twenty minutes. Then she cuts in. “Two million. Twenty points. A real board, clear rules, and enough runway to fight the war instead of surviving it. This is the door I told you about. It only opens once.”',
    choices: [
      {
        label: 'Take it. Win the war.',
        foley: 'pen',
        goto: 'h_b_after_a',
        effects: [
          { e: 'treasury', d: 2000000 },
          { e: 'stake', who: 'june', d: 20 },
          { e: 'score', d: 3 },
          { e: 'stress', d: -5 },
          { e: 'flag', scope: 'company', key: 'series_a', v: true },
        ],
        result: 'The $2 million lands on Friday. By Monday, you have a hiring plan, a legal budget, and a board meeting on the calendar. You are included, and other people now share the wheel.',
      },
      {
        label: 'Counter at fifteen percent.',
        goto: 'h_b_after_a',
        effects: [
          { e: 'treasury', d: 2000000 },
          { e: 'stake', who: 'june', d: 18 },
          { e: 'rel', who: 'june', resp: 1 },
          { e: 'score', d: 3 },
          { e: 'flag', scope: 'company', key: 'series_a', v: true },
        ],
        result: '“Eighteen,” she says, “because you asked twice.” The $2 million lands Friday.',
      },
      {
        label: 'Stay independent. Own the whole thing or lose it all.',
        goto: 'h_b_after_indep',
        effects: [
          { e: 'stress', d: 6 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'independent', v: true },
          { e: 'rel', who: 'june', aff: -1 },
        ],
        result: 'June nods slowly. “Then you’re betting the company every single week. Some founders are wired that way.” She closes the door politely, forever.',
      },
    ],
  },
  {
    id: 'h_board',
    ambience: 'office',
    accent: 'corp',
    mood: 'negotiate',
    art: 'world_gavel',
    title: 'WHO HOLDS THE GAVEL',
    priority: true,
    leadIn:
      'The lawyers trade drafts for a week. Each version is polite, expensive, and full of edits that shape your future. Then everyone gathers in a conference room borrowed from June’s fund, because the garage still has folding chairs.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'series_a', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'board_set', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'The company rules run three dull pages before the line that matters, which is who sits on the board. June’s term sheet leaves that open, so the choice is happening right now, in this room, by whoever speaks first.',
    choices: [
      {
        label: 'Founder-controlled: you, June, one neutral.',
        foley: 'pen',
        requires: { k: 'stake', who: 'founder', cmp: 'gte', v: 55 },
        effects: [
          { e: 'flag', scope: 'company', key: 'board_set', v: true },
          { e: 'flag', scope: 'company', key: 'control', v: 'founder' },
          { e: 'score', d: 1 },
        ],
        result: 'You keep the gavel. June votes with you twice in year one. The third vote goes against you, and you remember it.',
      },
      {
        label: 'Even: you, June, an independent both accept.',
        foley: 'pen',
        effects: [
          { e: 'flag', scope: 'company', key: 'board_set', v: true },
          { e: 'flag', scope: 'company', key: 'control', v: 'shared' },
          { e: 'rep', d: 1 },
          { e: 'stress', d: 3 },
        ],
        result: 'The board becomes marriage counseling with votes. The independent is a retired ferry captain with little patience for either of you. That turns out to be exactly right.',
      },
    ],
  },
  {
    id: 'h_bridge_pre_act3',
    ambience: 'night',
    art: 'cut_eighteen_months',
    kind: 'cutscene',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'act1_done', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 70 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    title: 'EIGHTEEN MONTHS OF WAR',
    marker: 'EIGHTEEN MONTHS LATER',
    skipToWeek: 130,
    prose:
      'Three corridors were suspended and then reopened. The price war cost both sides a fortune and taught the whole city your names. Your couriers got health insurance, and Sofia’s landing software reached version nine. The war just keeps getting older — until the morning it stops mattering, because of what happens on Richmond Street.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_cut_accident' }],
  },

  // ---- aftermath bridges — the week after each act-two decision ---------------
  {
    id: 'h_b_after_pricewar',
    ambience: 'street',
    accent: 'crowd',
    art: 'world_trenches',
    kind: 'bridge',
    title: 'TRENCHES',
    prose:
      'The blocks stop changing hands. Both sides dig in. Blue tubes fall off lampposts in your blocks, and strangers put your tubes back straight. Pricing pages change every hour while two ops teams learn each other’s habits. The price war becomes part of the business. Customers feel it, suppliers feel it, and larger companies start running the math.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_couriers' }],
  },
  {
    id: 'h_b_after_couriers',
    ambience: 'street',
    art: 'world_courier_bench',
    kind: 'bridge',
    title: 'THE LAST MILE HAS A FACE',
    prose:
      'The decision moves through the courier pool faster than any memo. Group chats, stairwells, and the bench outside the laundromat all carry it. Deliveries keep moving for now. The porches hear too, because the couriers explain it name by name and landing by landing. In the Flats, how you treat the person on the stairs becomes public knowledge. That judgment starts building from here.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_strike',
    ambience: 'street',
    art: 'world_flyer_sleeve',
    kind: 'bridge',
    title: 'AFTER THE PICKETS',
    prose:
      'A strike leaves marks either way. Routes resume. Some porches keep the flyer taped inside the receiver sleeve as a warning or a receipt. The couriers know what you chose. The neighborhood knows too. MERIDIAN’s channels cover every day in HD under the banner GROWING PAINS AT THE LITTLE RAILWAY. The war now has a labor front. You opened it.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_audit',
    ambience: 'office',
    art: 'world_paper_weather',
    kind: 'bridge',
    title: 'PAPER WEATHER',
    prose:
      'The review ends like bad weather. First the gray sedans stop appearing. Then a letter thanks you for your cooperation, whether you helped or fought. The lesson stays. The sky you use belongs to a city office, and city offices have politics. Somewhere downtown, a MERIDIAN lobbyist closes your file and opens the next version for next quarter.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_fresno',
    ambience: 'warehouse',
    art: 'world_build_dates',
    kind: 'bridge',
    title: 'SUPPLY LINES',
    prose:
      'The shuttle supply steadies. You know each machine’s build date the way parents know due dates, and you check the factory schedule before the news. Every shuttle that ships on time protects one porch while Chute waits outside. This part of the war happens far from cameras, and it decides more than the parts people see.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_poach',
    ambience: 'garage',
    art: 'world_poach_letter',
    kind: 'bridge',
    title: 'WHAT THE LETTER MEANT',
    prose:
      'The envelope goes into a drawer. The meaning stays on the bench. MERIDIAN is trying to hire your company one person at a time. Somewhere in its files, someone keeps an org chart of your garage current. The war is about people now. Everyone on your stairs has a number next to their name that someone else will pay.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_viral',
    ambience: 'garage',
    accent: 'street',
    art: 'world_legend_clip',
    kind: 'bridge',
    title: 'AFTER THE FOUR MINUTES',
    prose:
      'The clip becomes legend at internet speed. People stitch it, caption it, argue over it, and teach it in safety decks. The waiting list grows by a whole suburb. City hall calls twice. First they congratulate you. Then they quietly ask how much capacity you have. Attention this big has its own weather. For a few weeks, everything the company does happens on camera.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_a',
    ambience: 'office',
    accent: 'corp',
    art: 'world_board_invite',
    kind: 'bridge',
    title: 'GOVERNANCE ARRIVES',
    prose:
      'The money changes everything it touches. Hiring plans become real documents with start dates. A calendar invite arrives titled BOARD MEETING, the first meeting in the company’s life that you joined instead of called. June’s texts get shorter and land harder. The garage feels watched now in a way it never did when it belonged only to you.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_indep',
    ambience: 'night',
    art: 'world_runway_taped',
    kind: 'bridge',
    title: 'THE WHOLE THING',
    prose:
      'Owning all of it has a sound. It is the door June closed, clicking politely behind her. From here, payroll clears only when customers paid that week. Every dollar has to come from customers now. Rescue is far away. You tape the runway math to the wall where a term sheet would have hung. To your surprise, you like seeing it. The next quarter will show what kind of founder you are.',
    choices: [{ label: 'Continue', effects: [] }],
  },
]
