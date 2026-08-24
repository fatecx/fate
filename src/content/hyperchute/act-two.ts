import type { SceneDef } from '../schema'

/** HYPERCHUTE — Act Two: FIGHT. The clone war, the street, the money. */
export const ACT_TWO: readonly SceneDef[] = [
  {
    id: 'h_bridge_y2',
    kind: 'bridge',
    title: 'YEAR TWO',
    prose:
      'The garage is an office now — six desks, a server rack where the workbench was. MERIDIAN’s clone, Chute, sells the same stops at forty percent less and loses money on every drop with a smile. The war you wanted is here. It wants everything you have.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_price_war' }],
  },
  {
    id: 'h_price_war',
    title: 'THE PRICE OF PRICE',
    priority: true,
    fuseEpochs: 3,
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
        goto: 'h_cut_meridian_ipo',
      },
      {
        label: 'Sell reliability — the drop that never misses.',
        effects: [
          { e: 'revenue', d: 900 },
          { e: 'rep', d: 1 },
          { e: 'stress', d: 2 },
        ],
        result: 'You publish a 99.97% on-time ledger, signed weekly. The Flats notices. So does the insurance industry.',
        goto: 'h_cut_meridian_ipo',
      },
      {
        label: 'Slip the city Chute’s incident reports.',
        effects: [
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'chute_dirt', v: true },
          { e: 'rep', d: -1 },
        ],
        result: 'Anonymous, untraceable, effective. You tell yourself the reports are accurate. They are. Mostly.',
        goto: 'h_cut_meridian_ipo',
      },
    ],
  },
  {
    id: 'h_couriers',
    title: 'THE COLLECTIVE',
    speaker: 'corr',
    weight: 3,
    when: { k: 'age', cmp: 'gte', v: 16 },
    prose:
      'The last mile is still human — contract couriers carry what tubes can’t reach upstairs. Their collective arrives with a letter: employee status, or the porches go unserved. MERIDIAN’s couriers signed nothing and got nothing. Yours read the news.',
    choices: [
      {
        label: 'Grant it. W-2s, benefits, the whole paper trail.',
        effects: [
          { e: 'burn', d: 3200 },
          { e: 'rep', d: 2 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'couriers_ally', v: true },
        ],
        result: 'The letter comes back signed with a note: FIRST COMPANY TO ASK PROPERLY. Your burn jumps. So does your standing.',
        goto: 'h_cut_meridian_ipo',
      },
      {
        label: 'Offer a hybrid pool — guaranteed floors, no benefits.',
        effects: [
          { e: 'burn', d: 1400 },
          { e: 'stress', d: 3 },
        ],
        result: 'Half sign. Half organize harder.',
        goto: 'h_cut_meridian_ipo',
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
        goto: 'h_cut_meridian_ipo',
      },
    ],
  },
  {
    id: 'h_strike',
    title: 'THE PORCHES GO QUIET',
    priority: true,
    fuseEpochs: 2,
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
          { e: 'stress', d: 3 },
        ],
        result: 'You sign at the laundromat, on a table still warm from someone’s laundry. It plays on every local channel.',
        goto: 'h_cut_meridian_ipo',
      },
      {
        label: 'Hold firm. Machines finish the job.',
        effects: [
          { e: 'revenue', d: -900 },
          { e: 'stress', d: 6 },
          { e: 'rep', d: -1 },
        ],
        result: 'The drop success rate holds at 94% and falls a point every week. The Flats starts a counter-list: porches that refuse your tubes.',
        goto: 'h_cut_meridian_ipo',
      },
    ],
  },
  {
    id: 'h_cut_meridian_ipo',
    kind: 'cutscene',
    title: 'MERIDIAN GOES PUBLIC',
    prose:
      'They ring the bell on a Tuesday. By close, MERIDIAN is worth more than the city you live in. Marcus Vale’s face is on the financial channels, charming under studio lights: “Logistics is a solved problem. The last mile belongs to whoever owns the sky.” Your company is a rounding error on their press release — for now. The ticker behind him reads $91B. Yours reads a garage above a laundromat.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_permit_war' }],
  },
  {
    id: 'h_permit_war',
    title: 'THE AUDIT',
    priority: true,
    fuseEpochs: 4,
    when: { k: 'age', cmp: 'gte', v: 22 },
    prose:
      'The Office of Aerial Corridors opens a full audit of every Hyperchute corridor — “routine,” says the press release MERIDIAN’s lobbyists helped write. Three of your eleven corridors suspend pending review. The city that loved you is being lobbied by people who own it.',
    choices: [
      {
        label: 'Unleash Nadia. Make the lobbying the story.',
        requires: { k: 'met', who: 'nadia' },
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
    title: 'FRESNO IS BEHIND',
    weight: 2,
    when: { k: 'age', cmp: 'gte', v: 24 },
    prose:
      'The Fresno plant builds your shuttles and everyone else’s drones, and everyone else just ordered bigger. Lead times stretch from six weeks to nineteen. Every grounded shuttle is a porch you serve with a human courier at a loss.',
    choices: [
      {
        label: 'Double the order. Cash up front for priority.',
        requires: { k: 'treasury', cmp: 'gte', v: 80000 },
        effects: [
          { e: 'treasury', d: -80000 },
          { e: 'revenue', d: 1300 },
          { e: 'stress', d: 3 },
        ],
        result: 'Your shuttles move to line three, ahead of Chute’s. Money talks; Fresno listens.',
        goto: 'h_bridge_pre_act3',
      },
      {
        label: 'Qualify a second supplier in Reno.',
        effects: [
          { e: 'burn', d: 900 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'dual_source', v: true },
        ],
        result: 'Reno’s tolerances are looser and their price is worse, but when Fresno wobbles, you don’t.',
        goto: 'h_bridge_pre_act3',
      },
      {
        label: 'Give Fresno’s owner points for guaranteed capacity.',
        effects: [
          { e: 'meet', who: 'ray' },
          { e: 'stake', who: 'ray', d: 2 },
          { e: 'flag', scope: 'company', key: 'fresno_points', v: true },
          { e: 'revenue', d: 700 },
        ],
        result: 'You carve two points from your own share for the man who makes your machines. He frames the certificate next to his first dollar.',
        goto: 'h_bridge_pre_act3',
      },
    ],
  },
  {
    id: 'h_poach_sofia',
    title: 'THE OFFICE SHE DIDN’T ASK FOR',
    speaker: 'sofia',
    priority: true,
    fuseEpochs: 3,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'sofia_resolved', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 26 },
      ],
    },
    prose:
      'Sofia puts the offer letter on your desk without being asked: MERIDIAN, double salary, a team of nine, a title with “Principal” in it. “I’m not leaving,” she says. “But I’m not pretending I didn’t read it.” The kill-switch author of your entire descent stack is holding a ticket she hasn’t decided to use.',
    choices: [
      {
        label: 'Two more points. Make her a founder in fact.',
        effects: [
          { e: 'stake', who: 'sofia', d: 2 },
          { e: 'rel', who: 'sofia', aff: 2, resp: 2 },
          { e: 'burn', d: 1000 },
          { e: 'score', d: 1 },
        ],
        result: 'She tears the letter in half before you finish talking. “Principal,” she mutters. “Of a garage.”',
        goto: 'h_bridge_pre_act3',
      },
      {
        label: 'Match the money, keep the equity yours.',
        effects: [
          { e: 'burn', d: 6000 },
          { e: 'rel', who: 'sofia', aff: -1 },
        ],
        result: 'She stays for the number. Both of you know what that means, and it isn’t love.',
        goto: 'h_bridge_pre_act3',
      },
      {
        label: 'Let her go with blessing and a reference.',
        effects: [
          { e: 'rel', who: 'sofia', aff: -2 },
          { e: 'stress', d: 6 },
          { e: 'flag', scope: 'company', key: 'sofia_gone', v: true },
        ],
        result: 'The descent controller has her fingerprints on every line. MERIDIAN just bought themselves a very good conscience and you lost yours.',
        goto: 'h_bridge_pre_act3',
      },
    ],
  },
  {
    id: 'h_viral',
    title: 'THE FOUR MINUTES',
    weight: 3,
    when: { k: 'age', cmp: 'gte', v: 28 },
    prose:
      'A man on Forty-First Street collapses. The 911 drone ETA is eleven minutes. The nearest Hyperchute tube carries a defibrillator to his porch in four — the courier who reached it first also knew CPR. The porch camera does the rest: 40 million views, every caption some version of THIS is what it’s for.',
    choices: [
      {
        label: 'Ride it. National shows, op-eds, the whole arc.',
        effects: [
          { e: 'rep', d: 2 },
          { e: 'score', d: 1 },
          { e: 'stress', d: 5 },
          { e: 'flag', scope: 'company', key: 'went_national', v: true },
        ],
        result: 'You do eleven interviews in six days and say the same true thing each time: the railway was always for this. The list grows by forty thousand names.',
        goto: 'h_bridge_pre_act3',
      },
      {
        label: 'Send the courier. Keep yourself off camera.',
        effects: [
          { e: 'rep', d: 1 },
          { e: 'stress', d: 1 },
          { e: 'rel', who: 'nadia', resp: 1 },
        ],
        result: 'Rosa from the courier pool does the shows, better than you ever would. The story becomes hers, which makes it bigger.',
        goto: 'h_bridge_pre_act3',
      },
    ],
  },
  {
    id: 'h_series_a',
    title: 'TWO MILLION, TWENTY POINTS',
    speaker: 'june',
    priority: true,
    fuseEpochs: 4,
    when: {
      k: 'all',
      of: [
        { k: 'met', who: 'june' },
        { k: 'age', cmp: 'gte', v: 30 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'series_a', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'independent', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'June brings a partner from Sandhill and lets him talk for twenty minutes before she cuts in. “Two million. Twenty points. A real board, real governance, and enough runway to win the war instead of surviving it. This is the door I told you about. It only opens once.”',
    choices: [
      {
        label: 'Take it. Win the war.',
        effects: [
          { e: 'treasury', d: 2000000 },
          { e: 'stake', who: 'june', d: 20 },
          { e: 'score', d: 3 },
          { e: 'stress', d: -5 },
          { e: 'flag', scope: 'company', key: 'series_a', v: true },
        ],
        result: 'The wire clears on a Friday. On Monday there is a recruiting plan, a legal budget, and a board meeting on the calendar that includes you but is no longer yours alone.',
        goto: 'h_bridge_pre_act3',
      },
      {
        label: 'Counter at fifteen.',
        effects: [
          { e: 'treasury', d: 2000000 },
          { e: 'stake', who: 'june', d: 18 },
          { e: 'rel', who: 'june', resp: 1 },
          { e: 'score', d: 3 },
          { e: 'flag', scope: 'company', key: 'series_a', v: true },
        ],
        result: '“Eighteen,” she says, “because you asked twice.” The wire clears Friday.',
        goto: 'h_bridge_pre_act3',
      },
      {
        label: 'Stay independent. Own the whole thing or lose it all.',
        effects: [
          { e: 'stress', d: 6 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'independent', v: true },
          { e: 'rel', who: 'june', aff: -1 },
        ],
        result: 'June nods slowly. “Then you’re betting the company every single week. Some founders are built for that.” The door closes politely, forever.',
        goto: 'h_bridge_pre_act3',
      },
    ],
  },
  {
    id: 'h_board',
    title: 'WHO HOLDS THE GAVEL',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'series_a', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'board_set', cmp: 'eq', v: true } },
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
        goto: 'h_bridge_pre_act3',
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
        goto: 'h_bridge_pre_act3',
      },
    ],
  },
  {
    id: 'h_bridge_pre_act3',
    kind: 'bridge',
    title: 'EIGHTEEN MONTHS OF WAR',
    prose:
      'Three corridors suspended, then reopened. A price war that cost you both a fortune and taught the city your names. Couriers with health insurance. Sofia’s descent controller, version nine. The war doesn’t end. It just gets older — until the morning it stops mattering, because of what happens on Richmond Street.',
    choices: [{ label: 'Continue', effects: [], goto: 'h_cut_accident' }],
  },
]
