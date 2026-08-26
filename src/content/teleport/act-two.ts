import type { SceneDef } from '../schema'

/**
 * TELEPORT — Act Two: MOON MONEY, THE BLEND, THE BREAK.
 * Revenue arrives, the 2.6 seconds becomes a moral question, and the
 * partnership at the heart of the company starts to crack along it.
 */
export const ACT_TWO: readonly SceneDef[] = [
  {
    id: 't_salazar_contract',
    ambience: 'moonlink',
    landmark: true,
    art: 'world_verge_contract',
    title: 'THE VERGE CONTRACT',
    speaker: 'salazar',
    leadIn:
      'The pilot program at Shackleton Verge ran ninety days without an excuse. Commander Salazar’s review arrives as one line — “Bodies showed up. Humans don’t.” — followed by a contract offer with real numbers in it.',
    prose:
      'The screen carries her from the pole, sixteen months into a twenty-month rotation, backlit by the permanent sideways light of Shackleton. “Here is my problem,” she says. “Every hour of trained-human EVA time costs me eleven thousand dollars and a risk report. Your bodies cost me neither. I want them on the maintenance rotation permanently — seals, radiators, dust mitigation, the boring immortal work. What I need to know is what happens when you sell this same capacity to tourists, because I have seen what companies do when the fun money shows up.” She leans in slightly. “Write me a contract that tells me who you are.”',
    choices: [
      {
        label: 'Guarantee her hours first. Tourists get what’s left.',
        foley: 'pen',
        effects: [
          { e: 'revenue', d: 26000 },
          { e: 'rel', who: 'salazar', resp: 3, aff: 1 },
          { e: 'stress', d: -3 },
          { e: 'flag', scope: 'company', key: 'verge_first', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'Priority clause, in writing: base operations before revenue passengers, always. She reads it twice and signs. “Most people negotiate that clause out,” she says. “You wrote it in. Noted.” The Verge becomes the spine of the company — steady money that arrives like weather.',
      },
      {
        label: 'Promise everything to everyone. Capacity will catch up.',
        effects: [
          { e: 'revenue', d: 34000 },
          { e: 'stress', d: 2 },
          { e: 'rel', who: 'salazar', resp: -1 },
          { e: 'flag', scope: 'company', key: 'sla_hot', v: true },
        ],
        result:
          'Aggressive service levels, tourism carve-outs, penalty clauses you plan to outgrow before they bite. The revenue line jumps. Salazar signs it with a look that says she has read this exact contract before, on other screens, above other companies’ graves.',
      },
      {
        label: 'Small and honest: fewer hours than she asked for.',
        effects: [
          { e: 'revenue', d: 20000 },
          { e: 'rel', who: 'salazar', resp: 2 },
          { e: 'stress', d: -2 },
          { e: 'flag', scope: 'company', key: 'verge_modest', v: true },
        ],
        result:
          '“You’re quoting me less than I offered to buy,” she says, and for the first time in your acquaintance, Commander Ruth Salazar smiles. “Because you can actually deliver it. Fine. Earn the rest.” The contract is smaller than the press release wants, and nothing in it can break.',
      },
    ],
  },
  {
    id: 't_cass_hire',
    ambience: 'hangar',
    landmark: true,
    when: { k: 'age', cmp: 'gte', v: 56 },
    weight: 3,
    art: 'world_cass',
    title: 'THE PILOT WHO CAN’T FLY',
    speaker: 'cass',
    leadIn:
      'The chief operator search produces forty résumés of drone pilots and gamers, and then one that stops the room: astronaut corps finalist, three years, cut on a medical in the last round. She asks for a working interview instead of a conversation.',
    prose:
      'Cass Rivera does not talk about the medical file and you do not ask. She sits in the chair, runs the body at the Verge through a seal inspection, and it is immediately, embarrassingly obvious that everyone else who has ever sat there was driving a machine and she is wearing one. She works the 2.6 seconds like a tide she grew up next to — command, breathe, receive — and when she climbs out forty minutes later her eyes stay on the screen where the Moon is. “I trained eleven years to go,” she says evenly. “They found one shadow on one scan, and I will never fly. This chair is the closest thing that exists.” She finally looks at you. “Nobody will run your bodies better. Nobody on Earth wants to.”',
    choices: [
      {
        label: 'Chief teleoperator, full ride, build the corps around her.',
        effects: [
          { e: 'meet', who: 'cass' },
          { e: 'rel', who: 'cass', aff: 3, resp: 2 },
          { e: 'burn', d: 4500 },
          { e: 'stress', d: -3 },
          { e: 'flag', scope: 'company', key: 'cass_chief', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'She writes the operator training program in six weeks — part flight school, part physical therapy, part meditation on distance. Pilots wash out of it and thank her afterward. On the wall of the teleop bay she hangs one unexplained thing: a mission patch with no mission on it.',
      },
      {
        label: 'Contract-to-hire. The medical makes the insurer twitchy.',
        effects: [
          { e: 'meet', who: 'cass' },
          { e: 'rel', who: 'cass', aff: -1, resp: 1 },
          { e: 'burn', d: 2500 },
          { e: 'flag', scope: 'company', key: 'cass_contract', v: true },
        ],
        result:
          '“Contract,” she repeats, flat as the word deserves, and signs it anyway, because the chair is the chair. She is the best operator the company will ever have, and every Friday when the invoice goes in, both of you remember what the paperwork calls her.',
      },
      {
        label: 'Pass. Hire the safe pair of hands from the drone firm.',
        effects: [
          { e: 'meet', who: 'cass' },
          { e: 'rel', who: 'cass', aff: -3 },
          { e: 'burn', d: 3000 },
          { e: 'flag', scope: 'company', key: 'no_cass', v: true },
          { e: 'stress', d: 2 },
        ],
        result:
          'The safe pair of hands is fine. Competent, insurable, fine. Cass Rivera thanks you for the interview with terrifying politeness and takes a job narrating planetarium shows. Some doors close quietly and still manage to echo.',
      },
    ],
  },
  {
    id: 't_first_walk',
    kind: 'cutscene',
    title: 'THE FIRST WALK',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 62 },
        { k: 'seen', scene: 't_salazar_contract' },
      ],
    },
    priority: true,
    art: 'cut_first_walk',
    screens: [
      {
        art: 'cut_first_walk',
        prose:
          'The first paying customer is a retired schoolteacher from Ohio who saved for two years. She sits in the chair in a strip-mall storefront you have not finished painting, and a body at the rim of Shackleton crater wakes under her hands.\n\nShe does not do any of the things the marketing deck predicted. She does not wave, or jump, or reach for a rock.\n\nShe stands still for a very long time, in the oldest light in the solar system, and looks.',
      },
      {
        art: 'cut_first_walk_earth',
        prose:
          'Then she tilts the body’s cameras up, finds the small blue coin of the Earth above the crater rim, and holds up one hand against it, the way you would shade your eyes from the sun.\n\nTwo point six seconds later, two hundred and forty thousand miles away, the hand rises.\n\nWhen she comes out of the chair she is crying, and she grips your arm on the way past like a woman leaving church. “Sixty-one years I’ve looked up at it,” she says. “It looked back.”',
      },
    ],
    prose:
      'The first tourist walk. A schoolteacher from Ohio stands on the Moon in a rented body and looks back at the Earth. The product stops being a pitch and becomes a fact about the world.',
    choices: [{ label: 'Continue', effects: [{ e: 'stress', d: -6 }], goto: 't_blend_debate' }],
  },
  {
    id: 't_blend_debate',
    ambience: 'boardroom',
    landmark: true,
    art: 'world_blend_debate',
    title: 'THE BLEND',
    speaker: 'farrokh',
    leadIn:
      'The tourism reviews share one complaint, worded a hundred ways: the gap. The pause between wanting and getting. Sales calls it friction. Omid calls it the speed of light. Engineering, in between, has built something — and the something has a demo.',
    prose:
      'The junior team calls it the blend: a local model on the body that predicts your next quarter-second and starts moving before your command arrives. In the demo it is indistinguishable from magic — the gap simply gone, presence like silk. Omid makes them run it nine times, then stands up slowly, and the room goes quiet. “What is on that screen is not telepresence,” he says. “It is a puppet that agrees with you. When it guesses right, the customer feels the Moon. When it guesses wrong, a machine our company signed does something no human chose — on another world, with our name on its chest.” He turns to you, and there it is, the tiebreak again, except this time it is not photographs on a wall. “The cascade carries the truth two hundred and forty thousand miles in two point six seconds. I will not spend my name making the truth embarrassing. Decide what we sell.”',
    choices: [
      {
        label: 'Sell the honest delay. Make the gap the brand.',
        effects: [
          { e: 'flag', scope: 'company', key: 'honest_delay', v: true },
          { e: 'flag', scope: 'company', key: 'farrokh_stays', v: true },
          { e: 'rel', who: 'farrokh', resp: 3, aff: 2 },
          { e: 'revenue', d: -6000 },
          { e: 'rep', d: 1 },
          { e: 'stress', d: -4 },
          { e: 'score', d: 1 },
        ],
        result:
          'The campaign writes itself once you stop being ashamed: THE PAUSE IS THE PROOF. Two point six seconds becomes the tagline, the merch, the thing kids count on playgrounds. Some tourists still want silk and go wait for someone to lie to them. The ones who come want the Moon, gap and all.',
      },
      {
        label: 'Blend for tourists only. Industrial stays pure.',
        effects: [
          { e: 'flag', scope: 'company', key: 'blend_tourism', v: true },
          { e: 'rel', who: 'farrokh', aff: -2, resp: -2 },
          { e: 'revenue', d: 4000 },
          { e: 'stress', d: 3 },
        ],
        result:
          'A reasonable compromise, adopted reasonably, over your CTO’s unreasonable objection. The tourism reviews soar. Omid stops attending the tourism standup, which he has always described, with increasing accuracy, as “the theater meeting.”',
      },
      {
        label: 'Blend everywhere. The gap is a solved problem now.',
        effects: [
          { e: 'flag', scope: 'company', key: 'blend_full', v: true },
          { e: 'rel', who: 'farrokh', aff: -3, resp: -3 },
          { e: 'revenue', d: 10000 },
          { e: 'stress', d: -4 },
        ],
        result:
          'Marketing retires the counter. The website stops mentioning the number that used to hang framed by the hangar door. Revenue climbs like the demo promised. Omid goes home at five o’clock for the first time in the company’s life, and starts doing it every day.',
      },
    ],
  },
  {
    id: 't_indep_seat',
    ambience: 'boardroom',
    landmark: true,
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 70 },
        { k: 'flag', scope: 'company', key: 'aleph_round', cmp: 'eq', v: true },
        { k: 'seen', scene: 't_blend_debate' },
      ],
    },
    art: 'world_indep_seat',
    title: 'THE FIFTH CHAIR',
    leadIn:
      'The Series A documents said the board expands to five this year: two founders’ seats, Hale for ALEPH, and an independent director everyone pretends is a formality. Nobody who has ever sat through a hard vote believes the fifth chair is a formality.',
    prose:
      'The candidates arrive by two routes. Yours: Priya Raghavan — nineteen years of logistics scar tissue, two bankruptcies that were not her fault, and a private ranking of every founder she has ever backed. She takes your call on the first ring and asks harder questions than the fund does. ALEPH’s: a former aerospace CFO named by the model, immaculate, agreeable, and — per page two of his own bio, which the model helpfully generated — statistically aligned with investor outcomes in 94 percent of contested votes. Conrad Hale presents him without pressure. “The model has a preference,” he says mildly. “It always does. The seat, per your documents, is a conversation.” Depending on your paperwork, that sentence is either a courtesy or a countdown.',
    choices: [
      {
        label: 'Seat Priya. Pay whatever the fight costs.',
        requires: {
          k: 'all',
          of: [
            { k: 'met', who: 'priya' },
            { k: 'flag', scope: 'company', key: 'indep_yours', cmp: 'eq', v: true },
          ],
        },
        effects: [
          { e: 'flag', scope: 'company', key: 'indep_priya', v: true },
          { e: 'rel', who: 'priya', aff: 2, resp: 2 },
          { e: 'rel', who: 'hale', aff: -1 },
          { e: 'stress', d: -2 },
          { e: 'score', d: 1 },
        ],
        result:
          'You exercise the clause you fought for at the term sheet, and Priya Raghavan takes the fifth chair with a thin folder and no laptop. Her first act as a director is to ask for the raw operations numbers, “not the deck version.” Hale watches her do it, and something in his face files a note.',
      },
      {
        label: 'Seat Priya anyway — burn the goodwill, force it through.',
        requires: { k: 'met', who: 'priya' },
        effects: [
          { e: 'flag', scope: 'company', key: 'indep_priya', v: true },
          { e: 'rel', who: 'priya', resp: 2 },
          { e: 'rel', who: 'hale', aff: -2, resp: -1 },
          { e: 'rel', who: 'aleph', resp: -1 },
          { e: 'stress', d: 6 },
        ],
        result:
          'Three weeks of counsel letters and one genuinely unpleasant phone call. The seat is Priya’s in the end — governance lawyers side with the founders’ reading — but ALEPH logs the maneuver, and the model does not experience the passage of time the way people do. It does not cool off. It just remembers.',
      },
      {
        label: 'Accept the model’s candidate. Keep the peace.',
        effects: [
          { e: 'flag', scope: 'company', key: 'indep_hale', v: true },
          { e: 'rel', who: 'hale', aff: 2 },
          { e: 'treasury', d: 250000 },
          { e: 'stress', d: 2 },
        ],
        result:
          'The immaculate CFO joins with a warm handshake and a follow-on check ALEPH releases “in recognition of governance alignment.” Board meetings become smooth, efficient, and thirty minutes shorter. It will take you a long time to understand what was purchased in that half hour, and who paid.',
      },
    ],
  },
  {
    id: 't_aleph_asks',
    ambience: 'corp',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 58 },
        { k: 'flag', scope: 'company', key: 'aleph_round', cmp: 'eq', v: true },
      ],
    },
    weight: 3,
    art: 'world_aleph_room',
    title: 'THE DATA ROOM',
    speaker: 'aleph',
    leadIn:
      'ALEPH does not do quarterly check-in calls. It sends, instead, a single standing request, renewed monthly, always worded identically — and this month, Conrad Hale forwards it with a note: “It has noticed the gap between your press and your telemetry. I’d answer.”',
    prose:
      'The request is for raw feeds: operations telemetry, customer complaints, the unredacted incident log — including the lag complaints your marketing does not mention and the two aborted sessions from the winter. Attached, as always, is the model’s standing sentence, which reads less like a demand than a description of physics: FOUNDER COMMUNICATIONS ARE SCORED AGAINST OBSERVED STATE. DIVERGENCE COMPOUNDS. Hale, on the phone, translates: “It doesn’t punish bad quarters. It prices unreliable narrators.”',
    choices: [
      {
        label: 'Open everything. Raw, unedited, embarrassing.',
        effects: [
          { e: 'rel', who: 'aleph', resp: 3 },
          { e: 'flag', scope: 'company', key: 'aleph_raw', v: true },
          { e: 'stress', d: 2 },
        ],
        result:
          'You pipe the raw feeds through, aborts and all, plus a memo on what broke and what it cost. The model’s acknowledgment arrives in four minutes: RECEIVED. VARIANCE UNDERSTOOD. SCORING UPDATED. Hale calls a day later, faintly amused: “Whatever you sent, it moved you a tier. It has tiers. I’ve never seen the tiers.”',
      },
      {
        label: 'Send the polished pack. The model gets the deck version.',
        effects: [
          { e: 'rel', who: 'aleph', resp: -2 },
          { e: 'flag', scope: 'company', key: 'aleph_polished', v: true },
        ],
        result:
          'The board pack version goes over: clean charts, contextualized incidents, the winter aborts footnoted into fog. No reply comes, which feels like passing. It is not passing. Somewhere in the weights, a small number that describes you has moved, and nothing that moves it back is free.',
      },
      {
        label: 'Refuse. No investor gets the raw feeds.',
        effects: [
          { e: 'rel', who: 'aleph', resp: -2 },
          { e: 'rel', who: 'hale', resp: 1, aff: -1 },
          { e: 'flag', scope: 'company', key: 'aleph_refused', v: true },
          { e: 'stress', d: 2 },
        ],
        result:
          'Hale, personally, respects it — you can hear it in his voice. “For what it’s worth, I’ve argued founders should be able to say that.” A pause. “The model disagrees. It wanted you to know it disagrees. I’m not sure I’ve ever relayed a feeling from it before.”',
      },
    ],
  },
  {
    id: 't_aleph_forecast',
    ambience: 'corp',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 80 },
        { k: 'flag', scope: 'company', key: 'aleph_round', cmp: 'eq', v: true },
        { k: 'seen', scene: 't_aleph_asks' },
      ],
    },
    weight: 2,
    art: 'world_aleph_forecast',
    title: 'THE NUMBER MEETING',
    speaker: 'hale',
    leadIn:
      'Forecast season. The board wants next year’s number, and the honest model of the business produces a figure that will not impress anyone. There is a version of the spreadsheet where the assumptions lean sunward. Every founder alive has met that spreadsheet.',
    prose:
      'Hale sets up the call with unusual care, which is how you learn the model scores forecasts against outcomes with a long memory and compounding weights. “Whatever number you give this board becomes part of how it prices every sentence you say afterward,” he says. “I have watched it forgive a miss. I have never watched it forgive a founder who knew.” On the table: the honest number, low and defensible; the stretch number the growth curve wants to believe; and June’s old spreadsheet wisdom, if she is with you, sitting quietly in the margin: WAYS WE DIE, item four — we start believing our own deck.',
    choices: [
      {
        label: 'Give the honest number and wear the silence.',
        effects: [
          { e: 'rel', who: 'aleph', resp: 2 },
          { e: 'rel', who: 'hale', resp: 2 },
          { e: 'flag', scope: 'company', key: 'forecast_honest', v: true },
          { e: 'stress', d: 3 },
          { e: 'score', d: 1 },
        ],
        result:
          'The number lands flat, the meeting runs short, and one director’s disappointment is measurable in cubic feet. Four minutes after adjournment, ALEPH’s acknowledgment arrives, and for the first time ever it contains something resembling warmth: FORECAST ACCEPTED AT FULL WEIGHT.',
      },
      {
        label: 'Give the stretch number. Growth forgives everything.',
        effects: [
          { e: 'rel', who: 'aleph', resp: -3 },
          { e: 'flag', scope: 'company', key: 'forecast_stretch', v: true },
          { e: 'stress', d: -3 },
        ],
        result:
          'The stretch number gets nods, a good meeting, a warm quarter of feeling believed. The model says nothing at all — it does not warn, the way gravity does not warn — and the number goes into the weights next to every future sentence you will ever need it to trust.',
      },
    ],
  },
  {
    id: 't_sofia_return',
    ambience: 'hangar',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 64 },
        { k: 'met', who: 'sofia' },
        { k: 'rel', who: 'sofia', field: 'respect', cmp: 'gte', v: 2 },
      ],
    },
    weight: 2,
    art: 'world_sofia_return',
    title: 'THE KILL-SWITCH ENGINEER',
    speaker: 'sofia',
    leadIn:
      'The résumé arrives without a cover letter because it does not need one. You know the name. The last time you saw it, it was signed at the bottom of a descent-controller fix that a whole city ended up trusting.',
    prose:
      'Sofia Brandt stands in the teleop bay watching a body at the Verge torque a radiator bolt, and asks exactly one question: “Who can stop it?” She means mid-motion, mid-blend if there is a blend, from Earth, from the Moon, from a dead console. “Turbines, shuttles, robots on other worlds,” she says. “Same rule. I will not ship anything I cannot personally stop.” She wants to own body firmware — the reflexes, the safe-states, the big red everything. The interview, as far as she is concerned, is her interviewing you.',
    choices: [
      {
        label: 'Give her the firmware and the authority both.',
        effects: [
          { e: 'rel', who: 'sofia', aff: 2, resp: 2 },
          { e: 'burn', d: 3500 },
          { e: 'stress', d: -3 },
          { e: 'flag', scope: 'company', key: 'sofia_firmware', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'Her first month produces no features — only a safe-state architecture with her name on the commit and a stop chain she personally walks, hand over hand, from the chair to the regolith. “Now,” she says, satisfied, “build whatever you want on top.”',
      },
      {
        label: 'Hire her, but authority stays with the org chart.',
        effects: [
          { e: 'rel', who: 'sofia', aff: -1, resp: 1 },
          { e: 'burn', d: 3500 },
          { e: 'flag', scope: 'company', key: 'sofia_hired_boxed', v: true },
        ],
        result:
          'She takes the job with one eyebrow at altitude and files her authority question as a ticket, which she then reopens monthly, forever, like a woman winding a clock she does not trust the company to hear.',
      },
    ],
  },
  {
    id: 't_nadia_frame',
    ambience: 'cafe',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 76 },
        {
          k: 'any',
          of: [
            { k: 'flag', scope: 'company', key: 'blend_tourism', cmp: 'eq', v: true },
            { k: 'flag', scope: 'company', key: 'blend_full', cmp: 'eq', v: true },
          ],
        },
      ],
    },
    art: 'world_nadia_frames',
    title: 'FRAME BY FRAME',
    speaker: 'nadia',
    leadIn:
      'Nadia Osei covered your first company from a folding chair in a laundromat. She has a national column now, and the same notebook, and she asks for coffee somewhere “without a press person in the building.”',
    prose:
      'She sets a tablet between the cups and plays your newest tourism spot at quarter speed. “Watch the hand,” she says. On screen, a customer reaches for a rock at Shackleton — and the body’s fingers begin to close a breath before the reach. She scrubs back. Again. The motion starts before the command can possibly have arrived. “Two point six seconds each way — your own cofounder’s famous number,” she says, and she says it gently. “So either the speed of light took a day off during your shoot, or that machine is guessing.” She closes the tablet. “I’ve got a week of column space and an editor who smells a story about lying to schoolteachers. What I don’t have yet is your version. I’d rather have it. I always would.”',
    choices: [
      {
        label: 'Walk her through the blend. Everything, on the record.',
        effects: [
          { e: 'flag', scope: 'company', key: 'blend_public', v: true },
          { e: 'rel', who: 'nadia', resp: 3 },
          { e: 'rep', d: 1 },
          { e: 'revenue', d: -4000 },
          { e: 'rel', who: 'aleph', resp: 1 },
          { e: 'stress', d: 4 },
        ],
        result:
          'The column runs under the headline THE MACHINE THAT GUESSES, and it is fair — brutally, meticulously fair. Bookings dip for a quarter while the internet argues about puppets and presence. But the story is yours now, told standing up, and Nadia’s last line does you a favor money can’t: “At least they answered the phone.”',
      },
      {
        label: '“Proprietary latency compensation.” Say nothing real.',
        effects: [
          { e: 'flag', scope: 'company', key: 'blend_spun', v: true },
          { e: 'rel', who: 'nadia', resp: -3, aff: -1 },
          { e: 'stress', d: -2 },
        ],
        result:
          'The statement your comms consultant drafts is a small masterpiece of saying nothing, and Nadia prints it in full, which is worse than any rebuttal — a paragraph of corporate fog sitting under a slow-motion video of a machine moving before it was told to. She keeps reporting. A source who feels used becomes a headline; a journalist who feels stonewalled becomes an archive.',
      },
      {
        label: 'Call ATLAS. Vance’s ad budget can find her editor.',
        effects: [
          { e: 'flag', scope: 'company', key: 'nadia_leaned', v: true },
          { e: 'rel', who: 'nadia', resp: -3, standing: 'hostile' },
          { e: 'rep', d: -2 },
          { e: 'rel', who: 'vance', resp: -1 },
          { e: 'stress', d: -2 },
        ],
        result:
          'The story dies before Friday. It works exactly the way these things work, which is to say: silently, this quarter. Vance does it because he owes you, and tells you plainly he is now owed instead. And in a notebook that has outlived three of her editors, Nadia Osei writes down what happened, and the date.',
      },
    ],
  },
  {
    id: 't_farrokh_dark',
    ambience: 'night',
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 80 },
        { k: 'seen', scene: 't_blend_debate' },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'honest_delay', cmp: 'eq', v: true } },
      ],
    },
    weight: 3,
    art: 'world_farrokh_dark',
    title: 'THE DARK BENCH',
    speaker: 'farrokh',
    leadIn:
      'It happens by degrees, the way tide goes out: Omid’s standup updates get shorter, his commits get scarcer, and one week you realize the cascade bench — his bench — has been dark after five for a month.',
    prose:
      'You find him in the hangar at 11 p.m. anyway, because some habits survive their own death, running orbital decay projections he could delegate to an intern. The map of everything is behind him, and someone — him — has taken down the framed 2.61 that used to hang by the door and leaned it against the wall, face inward. “I used to think the enemy was distance,” he says, not turning around. “Distance was at least honest.” He finally looks at you. “I built this company a nervous system that tells the truth across a quarter million miles. You are teaching it to guess instead. I need you to know I am still deciding what I do about that.”',
    choices: [
      {
        label: 'Stay until 3 a.m. Hear all of it.',
        effects: [
          { e: 'rel', who: 'farrokh', aff: 3 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'farrokh_heard', v: true },
        ],
        result:
          'Four hours, two pots of terrible coffee, and the whole thing finally said out loud — the nine unfunded years, the name on the math, the specific dread of watching your life’s work get a marketing department. Nothing is fixed at 3 a.m. But he puts the frame back on the wall before he leaves, and that is not nothing.',
      },
      {
        label: 'Fund the Mars bench properly. Give him a true thing.',
        effects: [
          { e: 'burn', d: 4000 },
          { e: 'rel', who: 'farrokh', aff: 2, resp: 1 },
          { e: 'flag', scope: 'company', key: 'mars_bench_funded', v: true },
          { e: 'stress', d: 2 },
        ],
        result:
          'A real budget line, two engineers, and the long-delay problem — the honest four-to-twenty-four-minute monster the cascade was born for. He accepts it knowing exactly what it is. An apology would be cheaper. This is a place inside the company where nothing guesses. He starts staying late again. At the Mars bench.',
      },
      {
        label: 'Let him cool off. Founders have moods.',
        effects: [
          { e: 'flag', scope: 'company', key: 'farrokh_drift', v: true },
          { e: 'rel', who: 'farrokh', aff: -2 },
        ],
        result:
          'You give it space, which is what you call it, and the space fills the way vacuums fill. The dark bench stays dark. His board updates become punctual, complete, and utterly impersonal — the exact correspondence of a man keeping records.',
      },
    ],
  },
  {
    id: 't_farrokh_break',
    ambience: 'boardroom',
    landmark: true,
    priority: true,
    fuseEpochs: 3,
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 88 },
        { k: 'seen', scene: 't_blend_debate' },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'honest_delay', cmp: 'eq', v: true } },
      ],
    },
    art: 'world_farrokh_break',
    title: 'THE BREAK',
    speaker: 'farrokh',
    leadIn:
      'He books the meeting through your calendar assistant, founders only, thirty minutes — the coldest document either of you has ever addressed to the other. He arrives with typed pages. It was drafted by a lawyer. So it has come to this.',
    prose:
      'Omid does not sit. “I have three versions of this conversation,” he says, “and I have practiced none of them, because practicing felt like lying.” The pages go on the table. “Version one: the blend dies everywhere, tourism included, and I stay and we finish what we started. Version two: you buy me out — the number is fair, my lawyer confirms it is fair — and my name comes off the masthead but stays on the math, and I go home to my kids and watch what you do with my cascade from a lawn chair. Version three —” and here, for one second, nine years of composure flickers — “version three, I stay, gutted, a chief technology officer who is neither chief of anything nor trusted with the technology, and we both pretend. Everyone picks version three, apparently. It is the industry standard.” He pushes the pages across. “Pick.”',
    choices: [
      {
        label: 'Version one. Kill the blend everywhere. Keep him whole.',
        effects: [
          { e: 'flag', scope: 'company', key: 'honest_delay', v: true },
          { e: 'clearFlag', scope: 'company', key: 'blend_tourism' },
          { e: 'clearFlag', scope: 'company', key: 'blend_full' },
          { e: 'flag', scope: 'company', key: 'farrokh_stays', v: true },
          { e: 'rel', who: 'farrokh', aff: 3, resp: 3 },
          { e: 'revenue', d: -8000 },
          { e: 'rel', who: 'hale', aff: -2 },
          { e: 'stress', d: 4 },
          { e: 'score', d: 2 },
        ],
        result:
          'The revenue line takes it badly; the board takes it worse; Hale requests a “strategy alignment session,” which is a phrase with knuckles. But the counter goes back on the website, the frame goes back on the wall, and Omid Farrokh unpacks his life back into the corner office like a man returning from a war only he could see.',
      },
      {
        label: 'Version two. Buy him out fair. Let him go home.',
        requires: { k: 'treasury', cmp: 'gte', v: 400000 },
        foley: 'pen',
        effects: [
          { e: 'treasury', d: -400000 },
          { e: 'stake', who: 'farrokh', d: -20 },
          { e: 'flag', scope: 'company', key: 'farrokh_gone', v: true },
          { e: 'rel', who: 'farrokh', aff: 1, resp: 1 },
          { e: 'stress', d: 6 },
        ],
        goto: 't_b_farrokh_leaves',
        result:
          'You sign version two together, quietly, like the adults the industry keeps insisting founders become.',
      },
      {
        label: 'Version three. He stays in the title and the cage.',
        effects: [
          { e: 'flag', scope: 'company', key: 'farrokh_broken', v: true },
          { e: 'rel', who: 'farrokh', aff: -3, resp: -3, standing: 'hostile' },
          { e: 'stress', d: 2 },
        ],
        result:
          '“Industry standard,” he says, once, when you finish explaining why it has to be this way for the Series B narrative. He signs where the tabs say sign. He keeps his seat, his shares, his badge, and his office, and he attends every board meeting from that day forward the way a witness attends a trial.',
      },
      {
        label: 'Refuse all three. Beg him to help you find version four.',
        requires: {
          k: 'all',
          of: [
            { k: 'rel', who: 'farrokh', field: 'respect', cmp: 'gte', v: 5 },
            { k: 'flag', scope: 'company', key: 'farrokh_heard', cmp: 'eq', v: true },
          ],
        },
        effects: [
          { e: 'flag', scope: 'company', key: 'farrokh_mended', v: true },
          { e: 'flag', scope: 'company', key: 'blend_labeled', v: true },
          { e: 'clearFlag', scope: 'company', key: 'blend_full' },
          { e: 'rel', who: 'farrokh', aff: 2, resp: 2 },
          { e: 'stress', d: 6 },
          { e: 'score', d: 1 },
        ],
        result:
          'It takes until 2 a.m. and it costs you both something to stay in the room, but version four exists: the blend survives only as a labeled mode — BLEND ON, in letters the customer cannot miss, off by default, banned from anything industrial — and Omid personally owns the boundary. “I can live beside it if it wears a sign,” he says finally. Nobody gets everything. Both of you keep the thing that mattered most.',
      },
    ],
  },
  {
    id: 't_b_farrokh_leaves',
    ambience: 'hangar',
    kind: 'bridge',
    art: 'world_farrokh_leaves',
    title: 'THE LAWN CHAIR',
    prose:
      'He packs the corner office in one afternoon — nine years of physics fits in the same kind of cardboard box it arrived in, which he points out himself, almost smiling. The buyout paper is fair because you made it fair, and the handshake at the hangar door is real, and none of that makes the building sound right afterward. For weeks people keep drafting messages to him out of habit. His badge photo stays in the system, a ghost in the directory. And pinned to the map of everything, in his precise handwriting, one parting annotation nobody has the heart to take down: THE NUMBER IS STILL THE PRODUCT.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 't_jonah',
    kind: 'cutscene',
    title: 'ELEVEN SECONDS',
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 92 },
        { k: 'seen', scene: 't_blend_debate' },
      ],
    },
    art: 'cut_jonah',
    screens: [
      {
        art: 'cut_jonah',
        prose:
          'It happens on a Tuesday, during the boring immortal work.\n\nA radiator panel at Shackleton Verge, a body on the maintenance rotation, a torque sequence run ten thousand times before. At 09:41:07 base time, relay node four hands the session to node five, the way it has a million times — and for eleven seconds, in the gap between one certainty and another, something goes wrong with the handoff.\n\nThe body finishes a motion nobody finished commanding.',
      },
      {
        art: 'cut_jonah_after',
        prose:
          'Jonah Reece, thirty-four, two tours at the pole, is on the wrong side of the panel when it swings.\n\nIn one-sixth gravity, heavy things move slowly and arrive with all their mass. The suit alarm, the base klaxon, Commander Salazar’s voice going flat and procedural on the channel — all of it reaches Earth two point six seconds after it is already, unchangeably, true.\n\nYou never met him. You know him now: eleven seconds of telemetry, a personnel file, and a sister in Cleveland who deserves a phone call no company has ever practiced enough.',
      },
    ],
    prose:
      'A relay handoff fault at Shackleton Verge. A maintenance body completes an uncommanded motion. Jonah Reece, 34, is killed. The distance the company sells becomes, in eleven seconds, the distance it answers for.',
    choices: [{ label: 'Continue', effects: [{ e: 'flag', scope: 'company', key: 'jonah_dead', v: true }, { e: 'stress', d: 8 }], goto: 't_telemetry' }],
  },
  {
    id: 't_telemetry',
    ambience: 'boardroom',
    landmark: true,
    fuseEpochs: 2,
    art: 'world_telemetry',
    title: 'WHAT THE ELEVEN SECONDS SAY',
    leadIn:
      'The investigation takes nine days. The engineers walk you through it at a whiteboard with the door locked, voices level in the way of people holding something with both hands.',
    prose:
      'The telemetry is unambiguous and the lawyers wish it weren’t. The handoff fault starved the session; the body’s local systems bridged the gap; the bridging motion is what the panel rode in on. Whether the blend was in the loop or a bare safe-state failed unsafe, the eleven seconds belong to your architecture — the machine acted, no human commanded, a man is dead. On the table: the full log, printed, tabbed, terrible. Salazar has requested it. Jonah’s sister has requested it. OSTRA will subpoena it eventually if you make it need to. The general counsel presents three folders and has the decency not to name them anything cute. Publish. Settle. Deflect.',
    choices: [
      {
        label: 'Publish everything. Ground tourism ops yourself.',
        effects: [
          { e: 'flag', scope: 'company', key: 't_transparent', v: true },
          { e: 'revenue', d: -10000 },
          { e: 'rep', d: 2 },
          { e: 'rel', who: 'salazar', resp: 3 },
          { e: 'rel', who: 'aleph', resp: 2 },
          { e: 'rel', who: 'nadia', resp: 2 },
          { e: 'stress', d: 6 },
          { e: 'score', d: 2 },
        ],
        result:
          'The full log goes to Salazar, the sister, OSTRA, and the public, in that order, with the fault line marked in your own hand. Tourism grounds itself the same hour, indefinitely, by your signature. It costs exactly what the lawyers said it would. Commander Salazar reads all four hundred pages and sends one line: “Bodies stay on my rotation. You tell the truth at altitude. That’s the whole test.”',
      },
      {
        label: 'Settle with the family. Seal the log.',
        effects: [
          { e: 'treasury', d: -350000 },
          { e: 'flag', scope: 'company', key: 'log_sealed', v: true },
          { e: 'stress', d: -6 },
          { e: 'rel', who: 'salazar', resp: -2 },
        ],
        result:
          'The settlement is generous and the NDA is airtight and the funeral is private and the log is sealed. Everything is handled. That is the word the board minutes use — handled — and for one whole quarter it even feels true, the way held breath feels like air.',
      },
      {
        label: 'The operator deviated from procedure. Say it.',
        requires: { k: 'flag', scope: 'company', key: 'cass_chief', cmp: 'eq', v: true },
        effects: [
          { e: 'flag', scope: 'company', key: 'blamed_cass', v: true },
          { e: 'rel', who: 'cass', aff: -5, resp: -5, standing: 'hostile' },
          { e: 'rep', d: -2 },
          { e: 'stress', d: -2 },
        ],
        result:
          'The statement is four sentences and technically, forensically, never quite lies. Cass Rivera reads it at her console, removes her headset, sets it on the desk with unbearable gentleness, and walks out past the mission patch with no mission on it. She does not slam anything. Eleven years of training do not slam things. The teleop bay is silent for a week, and the company is never really the same building again.',
      },
    ],
  },
  {
    id: 't_halcyon_squeeze',
    ambience: 'corp',
    when: { k: 'age', cmp: 'gte', v: 94 },
    weight: 2,
    art: 'world_halcyon_tower',
    title: 'THE MANIFEST',
    speaker: 'halcyon',
    leadIn:
      'The replacement relay for node four has been sitting in a HALCYON integration queue for five weeks. Then your whole launch year quietly reschedules itself, and the new dates spell out a message.',
    prose:
      'The notice arrives from HALCYON’s manifest system at 3 a.m., machine-generated, machine-polite: your Q3 slot is now Q1 next year, your backup slot is “under review,” and priority rebooking is available under the company’s STRATEGIC PARTNERS program — details enclosed. The details read like a slow takeover wearing a partnership costume: they become your only launch provider, they see your data, and if you ever sell the company, they get first claim to buy it. On the wall map, your constellation suddenly has a hole in it and a clock on it. The monopoly has noticed you, which was always going to happen the moment you were worth noticing.',
    choices: [
      {
        label: 'Pay the expedite fee. Eat it and fly.',
        requires: { k: 'treasury', cmp: 'gte', v: 200000 },
        effects: [
          { e: 'treasury', d: -200000 },
          { e: 'flag', scope: 'company', key: 'expedited', v: true },
          { e: 'stress', d: 3 },
        ],
        result:
          'Two hundred thousand dollars buys back the launch slot you already paid for once. It feels like paying rent on your own mailbox. The relay flies. The invoice goes in a folder June labels, with terrifying calm, EVIDENCE.',
      },
      {
        label: 'File a spectrum-access complaint with OSTRA.',
        effects: [
          { e: 'meet', who: 'ostra' },
          { e: 'flag', scope: 'company', key: 'ostra_filed', v: true },
          { e: 'rel', who: 'halcyon', resp: -1, standing: 'hostile' },
          { e: 'stress', d: 3 },
        ],
        result:
          'OSTRA acknowledges the filing in 0.4 seconds and cc’s four treaty bodies, two of which may not have met since the nineties. The docket number is real, though, and HALCYON’s counsel notices it — monopolies fear paper trails the way vampires fear inventory. Your slot un-reschedules itself without comment.',
      },
      {
        label: 'Take the partnership meeting. Know thine enemy.',
        effects: [
          { e: 'flag', scope: 'company', key: 'halcyon_courted', v: true },
          { e: 'rel', who: 'halcyon', aff: 1 },
        ],
        result:
          'The meeting is on their campus, in a building shaped like a wing, with humans who defer visibly to a dashboard. The partnership terms would wrap around the company and tighten a little every year. You commit to nothing and leave with the one thing they gave away free: how badly they want what you built, and how cheap they hope to get it.',
      },
    ],
  },
]
