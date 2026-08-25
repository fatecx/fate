import type { SceneDef } from '../schema'

/** HYPERCHUTE — Act Two: FIGHT. The clone war, the street, the money. */
export const ACT_TWO: readonly SceneDef[] = [
  {
    id: 'h_bridge_y2',
    art: 'cut_year_two',
    kind: 'cutscene',
    title: 'YEAR TWO',
    marker: 'YEAR TWO',
    screens: [
      {
        title: 'YEAR TWO',
        art: 'cut_year_two',
        prose:
          'The garage is an office now. Six desks, a server rack where the workbench used to be, and a corridor map that no longer fits on one wall.',
      },
      {
        title: 'THE CLONE',
        art: 'cut_chute_launch',
        prose:
          'Then MERIDIAN launches a copy of you. It is called Chute. It sells the same deliveries at forty percent less and loses money on every drop, on purpose, because it can afford to. The war you wanted is here. It wants everything you have.',
      },
    ],
    prose:
      'The garage is an office now. Six desks, a server rack where the workbench used to be, and a corridor map that no longer fits on one wall. Then MERIDIAN launches a copy of you. It is called Chute. It sells the same deliveries at forty percent less and loses money on every drop, on purpose, because it can afford to. The war you wanted is here. It wants everything you have.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_price_war' }],
  },
  {
    id: 'h_price_war',
    art: 'world_price_war',
    title: 'THE PRICE OF PRICE',
    priority: true,
    fuseEpochs: 3,
    leadIn:
      'The first blue tube appears on a lamppost four blocks east, then six more overnight, like mushrooms after rain. CHUTE, the stencil says. INTRODUCTORY PRICING. Your phone starts buzzing before you finish reading the second one.',
    when: { k: 'flag', scope: 'company', key: 'act1_done', cmp: 'eq', v: true },
    prose:
      'Chute’s underpricing works. Your waiting list flattens; two subscribers a day drift over the fence to their blue tubes. The board — you, and whoever you let in — meets over cold pizza. Somebody has to blink first.',
    choices: [
      {
        label: 'Match them. Burn cash to hold the streets.',
        effects: [
          { e: 'burn', d: 2600 },
          { e: 'revenue', d: 2200 },
          { e: 'stress', d: 5 },
          { e: 'flag', scope: 'company', key: 'price_war', v: true },
        ],
        result: 'Margins go to zero. The list stops shrinking. So does your sleep.',
        goto: 'h_b_after_pricewar',
      },
      {
        label: 'Sell reliability — the drop that never misses.',
        effects: [
          { e: 'revenue', d: 900 },
          { e: 'rep', d: 1 },
        ],
        result: 'You publish a 99.97% on-time ledger, signed weekly. The Flats notices. So does the insurance industry.',
        goto: 'h_b_after_pricewar',
      },
      {
        label: 'Leak Chute’s accident reports to the city.',
        effects: [
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'chute_dirt', v: true },
          { e: 'rep', d: -1 },
        ],
        result: 'Anonymous, untraceable, effective. You tell yourself the reports are accurate. They are. Mostly.',
        goto: 'h_b_after_pricewar',
      },
    ],
  },
  {
    id: 'h_couriers',
    title: 'THE COLLECTIVE',
    speaker: 'corr',
    weight: 3,
    leadIn:
      'You know the couriers by first name now — Rosa, Dmitri, the twins who split a route. Lately their group chat has gone quiet when you walk past, which is how you know something formal is coming.',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 16 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'The last mile is still human — contract couriers carry what tubes can’t reach upstairs. Their collective arrives with a letter: employee status, or the porches go unserved. MERIDIAN’s couriers signed nothing and got nothing. Yours read the news.',
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
        result: 'The letter comes back signed with a note: FIRST COMPANY TO ASK PROPERLY. Your burn jumps. So does your standing.',
        goto: 'h_b_after_couriers',
      },
      {
        label: 'Offer a middle deal: guaranteed pay, no benefits.',
        effects: [
          { e: 'burn', d: 1400 },
          { e: 'stress', d: 3 },
        ],
        result: 'Half sign. Half organize harder.',
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
        result: 'Stair-climbing attachments ship in six weeks. The picket signs appear in five.',
        goto: 'h_b_after_couriers',
      },
    ],
  },
  {
    id: 'h_strike',
    art: 'world_strike',
    title: 'THE PORCHES GO QUIET',
    priority: true,
    fuseEpochs: 2,
    leadIn:
      'It starts on a Monday, without a single raised voice. The morning routes just don’t happen. By noon the neighborhood has read the flyer taped to every receiver sleeve, and so have you.',
    when: { k: 'flag', scope: 'company', key: 'couriers_enemy', cmp: 'eq', v: true },
    prose:
      'The strike is polite and devastating: no courier serves a Hyperchute address, and the couriers taught the porches why. Chute’s couriers cross your picket lines for double pay. The neighborhood watches who blinks.',
    choices: [
      {
        label: 'Negotiate. You were wrong about the stairs.',
        effects: [
          { e: 'burn', d: 1800 },
          { e: 'rep', d: 1 },
          { e: 'flag', scope: 'company', key: 'couriers_ally', v: true },
          { e: 'stress', d: -4 },
        ],
        result: 'You sign at the laundromat, on a table still warm from someone’s laundry. It plays on every local channel.',
        goto: 'h_b_after_strike',
      },
      {
        label: 'Hold firm. Machines finish the job.',
        effects: [
          { e: 'revenue', d: -900 },
          { e: 'stress', d: 6 },
          { e: 'rep', d: -1 },
        ],
        result: 'The drop success rate holds at 94% and falls a point every week. The Flats starts a counter-list: porches that refuse your tubes.',
        goto: 'h_b_after_strike',
      },
    ],
  },
  {
    id: 'h_cut_meridian_ipo',
    art: 'cut_meridian_ipo',
    kind: 'cutscene',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'act1_done', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 20 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    title: 'MERIDIAN GOES PUBLIC',
    prose:
      'They ring the bell on a Tuesday. By close, MERIDIAN is worth more than the city you live in. Its founder is on every financial channel, silver-haired and certain under the studio lights: “Logistics is a solved problem. The last mile belongs to whoever owns the sky.” The ticker behind him reads $91B. Yours reads a garage above a laundromat.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_permit_war' }],
  },
  {
    id: 'h_permit_war',
    art: 'world_audit',
    title: 'THE AUDIT',
    priority: true,
    fuseEpochs: 4,
    leadIn:
      'The letter arrives certified, which is never good, on letterhead you last saw granting you a corridor. Two men in gray park outside the same morning and photograph the receiver sleeves, methodically, like appraisers.',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 22 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'The Office of Aerial Corridors opens a full audit of every Hyperchute corridor — “routine,” says the press release MERIDIAN’s lobbyists helped write. Three of your eleven corridors suspend pending review. The city that loved you is being lobbied by people who own it.',
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
        result: 'HER PIECE RUNS SUNDAY: THE SKY IS FOR SALE. The audit committee suddenly finds cameras at every hearing.',
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
        result: 'Dana Okafor spent nine years running the corridors office. She knows which signatures mean what. The audit finds “procedural irregularities, resolved.”',
      },
      {
        label: 'Comply completely. Pause the flagged corridors.',
        goto: 'h_b_after_audit',
        effects: [
          { e: 'revenue', d: -1100 },
          { e: 'stress', d: -3 },
          { e: 'rel', who: 'corr', resp: 1 },
        ],
        result: 'Slow, clean, survivable. The corridors reopen in nine weeks with a letter of commendation nobody reads.',
      },
    ],
  },
  {
    id: 'h_fresno',
    art: 'world_fresno',
    title: 'FRESNO IS BEHIND',
    weight: 2,
    leadIn:
      'The first sign is an apologetic email about "component allocation." The second is your account manager’s calendar, suddenly full for three weeks. Supply chains never announce bad news; they let you deduce it.',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 24 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'The Fresno plant builds your shuttles and everyone else’s drones, and everyone else just ordered bigger. Lead times stretch from six weeks to nineteen. Every grounded shuttle is a porch you serve with a human courier at a loss.',
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
        result: 'Your shuttles move to line three, ahead of Chute’s. Money talks; Fresno listens.',
      },
      {
        label: 'Line up a second supplier in Reno.',
        goto: 'h_b_after_fresno',
        effects: [
          { e: 'burn', d: 900 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'dual_source', v: true },
        ],
        result: 'Reno’s tolerances are looser and their price is worse, but when Fresno wobbles, you don’t.',
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
        result: 'You carve two points from your own share for the man who makes your machines. He frames the certificate next to his first dollar.',
      },
    ],
  },
  {
    id: 'h_poach_sofia',
    title: 'THE OFFICE SHE DIDN’T ASK FOR',
    speaker: 'sofia',
    priority: true,
    fuseEpochs: 3,
    leadIn:
      'A MERIDIAN recruiter has called the garage’s landline twice this month asking for "the descent engineer." Sofia hung up both times. The third approach doesn’t call. It arrives by courier, on paper, in an envelope too nice to ignore.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'sofia_resolved', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 26 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Sofia puts the offer letter on your desk without being asked: MERIDIAN, double salary, a team of nine, a title with “Principal” in it. “I’m not leaving,” she says. “But I’m not pretending I didn’t read it.” The kill-switch author of your entire descent stack is holding a ticket she hasn’t decided to use.',
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
        result: 'She stays for the number. Both of you know what that means, and it isn’t love.',
      },
      {
        label: 'Let her go with blessing and a reference.',
        goto: 'h_b_after_poach',
        effects: [
          { e: 'rel', who: 'sofia', aff: -2 },
          { e: 'stress', d: 6 },
          { e: 'flag', scope: 'company', key: 'sofia_gone', v: true },
        ],
        result: 'The descent controller has her fingerprints on every line. MERIDIAN just bought themselves a very good conscience and you lost yours.',
      },
    ],
  },
  {
    id: 'h_viral',
    art: 'world_four_minutes',
    title: 'THE FOUR MINUTES',
    weight: 3,
    leadIn:
      'Tuesday is ordinary until 3:12 p.m. Then every phone in the garage lights up at once, and the notifications are all the same porch camera clip, and the view counter is adding a zero while you watch.',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 28 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'A man on Forty-First Street collapses. The 911 drone ETA is eleven minutes. The nearest Hyperchute tube carries a defibrillator to his porch in four — the courier who reached it first also knew CPR. The porch camera does the rest: 40 million views, every caption some version of THIS is what it’s for.',
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
        result: 'You do eleven interviews in six days and say the same true thing each time: the railway was always for this. The list grows by forty thousand names.',
      },
      {
        label: 'Send the courier. Keep yourself off camera.',
        goto: 'h_b_after_viral',
        effects: [
          { e: 'rep', d: 1 },
          { e: 'stress', d: 1 },
          { e: 'rel', who: 'nadia', resp: 1 },
        ],
        result: 'Rosa from the courier pool does the shows, better than you ever would. The story becomes hers, which makes it bigger.',
      },
    ],
  },
  {
    id: 'h_series_a',
    landmark: true,
    title: 'TWO MILLION, TWENTY POINTS',
    speaker: 'june',
    priority: true,
    fuseEpochs: 4,
    leadIn:
      'June books a meeting a week out, with an agenda, which from her is practically a formal declaration. She arrives with someone new: gray suit, firm handshake, the unmistakable air of a man who has already read your data room.',
    when: {
      k: 'all',
      of: [
        { k: 'met', who: 'june' },
        { k: 'age', cmp: 'gte', v: 26 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'series_a', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'independent', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'June brings a partner from Sandhill and lets him talk for twenty minutes before she cuts in. “Two million. Twenty points. A real board, real governance, and enough runway to win the war instead of surviving it. This is the door I told you about. It only opens once.”',
    choices: [
      {
        label: 'Take it. Win the war.',
        goto: 'h_b_after_a',
        effects: [
          { e: 'treasury', d: 2000000 },
          { e: 'stake', who: 'june', d: 20 },
          { e: 'score', d: 3 },
          { e: 'stress', d: -5 },
          { e: 'flag', scope: 'company', key: 'series_a', v: true },
        ],
        result: 'The wire clears on a Friday. On Monday there is a recruiting plan, a legal budget, and a board meeting on the calendar that includes you but is no longer yours alone.',
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
        result: '“Eighteen,” she says, “because you asked twice.” The wire clears Friday.',
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
        result: 'June nods slowly. “Then you’re betting the company every single week. Some founders are wired that way.” The door closes politely, forever.',
      },
    ],
  },
  {
    id: 'h_board',
    art: 'world_gavel',
    title: 'WHO HOLDS THE GAVEL',
    priority: true,
    leadIn:
      'The lawyers exchange drafts for a week — polite, expensive volleys with your company’s future in the tracked changes. Then everyone gathers in a conference room borrowed from June’s fund, because the garage has folding chairs.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'series_a', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'board_set', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'The charter is three pages of boilerplate until page four: board composition. June’s term sheet leaves it open, which means it is being decided right now, in this room, by whoever speaks first.',
    choices: [
      {
        label: 'Founder-controlled: you, June, one neutral.',
        requires: { k: 'stake', who: 'founder', cmp: 'gte', v: 55 },
        effects: [
          { e: 'flag', scope: 'company', key: 'board_set', v: true },
          { e: 'flag', scope: 'company', key: 'control', v: 'founder' },
          { e: 'score', d: 1 },
        ],
        result: 'You keep the gavel. June votes with you twice in year one and against you once, memorably.',
      },
      {
        label: 'Even: you, June, an independent both accept.',
        effects: [
          { e: 'flag', scope: 'company', key: 'board_set', v: true },
          { e: 'flag', scope: 'company', key: 'control', v: 'shared' },
          { e: 'rep', d: 1 },
          { e: 'stress', d: 3 },
        ],
        result: 'Governance as marriage counseling. The independent is a retired ferry captain with no patience for either of you, which turns out to be exactly right.',
      },
    ],
  },
  {
    id: 'h_bridge_pre_act3',
    art: 'cut_eighteen_months',
    kind: 'cutscene',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'act1_done', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 32 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true } },
      ],
    },
    title: 'EIGHTEEN MONTHS OF WAR',
    marker: 'EIGHTEEN MONTHS LATER',
    prose:
      'Three corridors suspended, then reopened. A price war that cost you both a fortune and taught the city your names. Couriers with health insurance. Sofia’s descent controller, version nine. The war doesn’t end. It just gets older — until the morning it stops mattering, because of what happens on Richmond Street.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_cut_accident' }],
  },

  // ---- aftermath bridges — the week after each act-two decision ---------------
  {
    id: 'h_b_after_pricewar',
    art: 'world_trenches',
    kind: 'bridge',
    title: 'TRENCHES',
    prose:
      'The fence-line stops moving — not because anyone won, but because both sides dug in. Blue tubes fall off lampposts in your blocks; strangers straighten yours without being asked. Pricing pages update hourly now, two ops teams learning each other’s rhythms like chess players who hate each other politely. Wars like this don’t end, you realize. They get priced in — by customers, by suppliers, and eventually by people with much bigger spreadsheets than yours.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_couriers' }],
  },
  {
    id: 'h_b_after_couriers',
    art: 'world_courier_bench',
    kind: 'bridge',
    title: 'THE LAST MILE HAS A FACE',
    prose:
      'The decision travels through the courier pool faster than any memo could — group chats, stairwells, the bench outside the laundromat. For a while deliveries continue as they always did. But the porches heard about it too, because the couriers told them, name by name, landing by landing. In the Flats, how you treat the person on the stairs is public information. It compounds, one direction or the other, from here.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_strike',
    art: 'world_flyer_sleeve',
    kind: 'bridge',
    title: 'AFTER THE PICKETS',
    prose:
      'A strike leaves marks either way. Routes resume; some porches keep the flyer taped inside the receiver sleeve, as a warning or a receipt, depending. The couriers know exactly what you are now, and so does the neighborhood, and so does MERIDIAN — whose channels covered every day of it, gleefully, in HD, under the banner GROWING PAINS AT THE LITTLE RAILWAY. The war has a labor front now. You opened it.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_audit',
    art: 'world_paper_weather',
    kind: 'bridge',
    title: 'PAPER WEATHER',
    prose:
      'Audits end the way weather does — gradually, then officially, with a letter that thanks you for your cooperation whether you cooperated or not. The gray sedans stop appearing. What stays is the lesson: the sky you operate in is licensed, and licenses have politics, and politics has a payroll. Somewhere downtown a MERIDIAN lobbyist closes your file and opens next quarter’s version of it.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_fresno',
    art: 'world_build_dates',
    kind: 'bridge',
    title: 'SUPPLY LINES',
    prose:
      'The shuttle supply steadies — not fixed exactly, managed. You know your machines’ build dates now the way parents know due dates, and you check the line schedule before you check the news. Quietly, logistics becomes a weapon in the war ledger: every shuttle that ships on time is a porch Chute doesn’t take while you wait. Nobody films this part. It decides more than the parts they film.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_poach',
    art: 'world_poach_letter',
    kind: 'bridge',
    title: 'WHAT THE LETTER MEANT',
    prose:
      'The envelope goes into a drawer, but its meaning stays out on the bench: MERIDIAN is recruiting your company one name at a time. Somewhere in a talent database there is an org chart of your garage, and someone’s job is keeping it current. The war stopped being about porches a while ago. It is about people now — and everyone on your stairs has a number next to their name that someone else is willing to pay.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_viral',
    art: 'world_legend_clip',
    kind: 'bridge',
    title: 'AFTER THE FOUR MINUTES',
    prose:
      'The clip ages into legend at internet speed: stitched, captioned, argued about, taught. The waiting list grows a suburb. City hall calls twice — once to congratulate, once, quieter, to ask about capacity. Attention this size has weather of its own; for a few weeks everything the company does happens slightly on camera, and you learn to move like someone who knows it.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_a',
    art: 'world_board_invite',
    kind: 'bridge',
    title: 'GOVERNANCE ARRIVES',
    prose:
      'The money changes the math; the board changes the mirror. Hiring plans become real documents with real start dates. So does a calendar invite titled BOARD MEETING — the first meeting in the company’s life that you attend rather than convene. June’s texts get shorter and land harder. The garage doesn’t feel smaller, exactly. It feels witnessed.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 'h_b_after_indep',
    art: 'world_runway_taped',
    kind: 'bridge',
    title: 'THE WHOLE THING',
    prose:
      'Owning all of it has a sound: the door June closed, clicking, politely, forever. From here every payroll clears because revenue cleared, or it doesn’t clear at all. You tape the runway math to the wall where a term sheet would have hung and find, to your surprise, that you like looking at it. Some founders are built for this. The next quarter finds out which kind you are.',
    choices: [{ label: 'Continue', effects: [] }],
  },
]
