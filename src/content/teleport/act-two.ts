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
      'The pilot program at Shackleton Verge runs ninety days without excuses. Commander Salazar’s review arrives as one line — “Bodies showed up. Humans don’t.” — followed by a contract offer with real money in it.',
    prose:
      'The screen carries him from the Moon’s south pole, sixteen months into a twenty-month stay, lit by Shackleton’s sideways sun. “Here is my problem,” he says. “Every hour a trained human works outside in a suit costs me eleven thousand dollars and a risk report. Your bodies cost me less of both. I want them on the maintenance schedule for good — seals, radiators, keeping moon dust out of the wrong places, the boring immortal work. I need to know what happens when tourists want the same hours, because I have seen what companies do when the fun money shows up.” He leans in. “Write me a contract that tells me who you are.”',
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
          'Base work before tourist money, in writing, always. He reads it twice and signs. “Most people negotiate that clause out,” he says. “You wrote it in. Noted.” The Verge becomes the spine of the company — steady money, the kind you can plan around.',
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
          'Big promises, tourist carve-outs, penalty fees you plan to outgrow before they bite. The revenue line jumps. Salazar signs with a look that says he has seen this contract before, on other screens, above other companies’ graves.',
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
          '“You’re quoting me less than I offered to buy,” he says, and for the first time since you met him, Commander Rafael Salazar smiles. “Because you can actually deliver it. Fine. Earn the rest.” The contract is smaller than the press release wants, and every promise in it can hold.',
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
      'The chief operator search brings forty résumés from drone pilots and gamers. Then one résumé stops the room: astronaut corps finalist, three years, cut for medical reasons in the last round. Cass Rivera asks for a working interview instead of a conversation.',
    prose:
      'Cass says nothing about the medical file, and you leave it alone. He sits in the chair, runs the body at the Verge through a seal check, and within a minute the difference is clear. Cass moves like the machine is his. He works the 2.6-second delay like a tide he grew up beside — command, breathe, receive. When he climbs out forty minutes later, his eyes stay on the screen where the Moon is. “I trained eleven years to go,” he says evenly. “They found one shadow on one scan, and now I will never fly. This chair is the closest thing that exists.” He finally looks at you. “Nobody will run your bodies better. Nobody on Earth wants to more.”',
    choices: [
      {
        label: 'Chief teleoperator, full ride, build the corps around him.',
        effects: [
          { e: 'meet', who: 'cass' },
          { e: 'rel', who: 'cass', aff: 3, resp: 2 },
          { e: 'burn', d: 4500 },
          { e: 'stress', d: -3 },
          { e: 'flag', scope: 'company', key: 'cass_chief', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'He writes the operator training program in six weeks — part flight school, part physical therapy, part meditation on distance. Pilots wash out and thank her afterward. On the wall of the control bay she hangs one unexplained thing: a mission patch with no mission on it.',
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
          '“Contract,” he repeats, flat as the word deserves, and signs anyway, because the chair is the chair. She is the best operator the company will ever have. Every Friday, when the invoice goes in, both of you remember what the paperwork calls him.',
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
          'The safe pair of hands is fine. Competent, insurable, fine. Cass thanks you for the interview with terrifying politeness and takes a job narrating planetarium shows. Some doors close quietly and still manage to echo.',
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
          'The first paying customer is a retired schoolteacher from Ohio who saved for two years. She sits in the chair in a strip-mall storefront you are still painting, and a body at the rim of Shackleton crater wakes under her hands.\n\nShe ignores every pose in the marketing deck. She simply stands still for a very long time, in the oldest light in the solar system, and looks.',
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
      'The tourist reviews all share one complaint, worded a hundred different ways: the gap — that pause between wanting something and getting it. Sales calls it friction, Omid calls it the speed of light, and now the engineering team has built an answer and wants to show you a demo.',
    prose:
      'The junior team calls it the blend: a small model on each body that guesses the operator’s next tiny move and starts early. In the demo, the gap vanishes. The body feels instant, smooth as silk. Omid makes them run it nine times, then stands slowly, and the room goes quiet. “That screen shows a puppet that agrees with you,” he says. “When it guesses right, the customer feels the Moon. When it guesses wrong, a machine with our name on its chest does something no human chose, on another world.” He turns to you, and there it is, the tiebreak again. “The relay chain carries the truth two hundred and forty thousand miles in two point six seconds. My name stays with that truth, even when it embarrasses us. Decide what we sell.”',
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
          'The campaign writes itself once you say it plainly: THE PAUSE IS THE PROOF. Two point six seconds becomes the tagline, the merch, the thing kids count on playgrounds. Some tourists still want silk and go wait for someone to lie to them. The ones who come want the Moon, gap and all.',
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
          'You draw a clean line: tourists may use the blend, and industrial work stays honest. The tourism reviews soar. Omid stops attending the tourism standup, which he has always described, with increasing accuracy, as “the theater meeting.”',
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
      'The Series A documents say the board expands to five this year: two founder seats, Hale for ALEPH, and an independent director everyone calls a formality. Anyone who has sat through a hard vote knows the fifth chair can decide a company.',
    prose:
      'The candidates arrive by two routes. Yours is Priya Raghavan — nineteen years in logistics, two bankruptcies that were not her fault, and a private ranking of every founder she has ever backed. She takes your call on the first ring and asks harder questions than the fund does. ALEPH’s pick is a former aerospace CFO, spotless and agreeable. Page two of his bio, written by the model, notes that he voted with investors in 94 percent of contested votes. Conrad Hale presents him without pressure. “The model has a preference,” he says mildly. “It always does. Your documents say this seat is a conversation.” Depending on your paperwork, that sentence is either a courtesy or a countdown.',
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
          'You use the clause you fought for in the term sheet, and Priya takes the fifth chair with a thin folder and no laptop. Her first act as a director is to ask for the raw operations numbers, “the ones before the deck.” Hale watches her do it, and something in his face files a note.',
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
          'Three weeks of lawyer letters and one genuinely unpleasant phone call. The seat is Priya’s in the end. The lawyers side with the founders’ reading, but ALEPH logs the move. The model has an endless memory. It just remembers.',
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
          'The spotless CFO joins with a warm handshake and an extra check ALEPH releases “in recognition of board alignment.” Board meetings become smooth, efficient, and thirty minutes shorter. It will take you a long time to understand what was purchased in that half hour, and who paid.',
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
      'ALEPH skips friendly quarterly calls. It sends one standing request every month, worded the same way each time. This month, Conrad Hale forwards it with a note: “It has noticed the gap between your public story and your flight records. I’d answer.”',
    prose:
      'The request is for raw records: body data, customer complaints, the full incident log, the lag complaints your marketing leaves out, and the two aborted sessions from winter. Attached, as always, is the model’s standing sentence, which reads less like a demand than a law of nature: FOUNDER MESSAGES ARE SCORED AGAINST OBSERVED STATE. GAPS GROW. Hale translates on the phone. “It can forgive a bad quarter. It charges founders who make the story cleaner than the facts.”',
    choices: [
      {
        label: 'Open everything. Raw, unedited, embarrassing.',
        effects: [
          { e: 'rel', who: 'aleph', resp: 3 },
          { e: 'flag', scope: 'company', key: 'aleph_raw', v: true },
          { e: 'stress', d: 2 },
        ],
        result:
          'You send the raw records through, aborted sessions and all, plus a memo on what broke and what it cost. The model answers in four minutes: RECEIVED. VARIANCE UNDERSTOOD. SCORING UPDATED. Hale calls a day later, faintly amused. “Whatever you sent, it moved you up a tier. It has tiers. I’ve never seen the tiers.”',
      },
      {
        label: 'Send the polished pack. The model gets the deck version.',
        effects: [
          { e: 'rel', who: 'aleph', resp: -2 },
          { e: 'flag', scope: 'company', key: 'aleph_polished', v: true },
        ],
        result:
          'The board-pack version goes over: clean charts, softened incidents, the winter aborts buried in footnotes. No reply comes, which feels like passing. Somewhere in the model, a small number that describes you has moved, and moving it back will cost something real.',
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
          'Hale personally respects it — you can hear that in his voice. “For what it’s worth, I’ve argued founders should be able to say that.” A pause. “The model disagrees. It wanted you to know it disagrees. I think I just relayed a feeling from it.”',
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
      'Forecast season. The board wants a number for next year. The honest forecast is low and will impress nobody. So you build a second version that assumes everything goes right.',
    prose:
      'Hale sets up the call carefully, and the care tells you something. The fund’s model checks every forecast against what really happens. It remembers for years. “Whatever number you give this board, the model keeps it,” he says. “Every promise you make later gets measured against it. I have watched it forgive a miss. I have watched it punish a founder who should have known better.” Two numbers sit on the table: the honest one is low, and the stretch one is big — the number the growth story needs. If June is with you, her handwriting is already in the margin of WAYS WE DIE, item four: we start believing our own deck.',
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
          'The number lands flat, the meeting runs short, and one director’s disappointment fills the room. Four minutes after adjournment, ALEPH’s answer arrives, and for the first time ever it carries something like warmth: FORECAST ACCEPTED AT FULL WEIGHT.',
      },
      {
        label: 'Give the stretch number. Growth forgives everything.',
        effects: [
          { e: 'rel', who: 'aleph', resp: -3 },
          { e: 'flag', scope: 'company', key: 'forecast_stretch', v: true },
          { e: 'stress', d: -3 },
        ],
        result:
          'The stretch number gets nods, a good meeting, and a warm quarter of feeling believed. The model says nothing. The model files the number away, to check every future promise against it.',
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
      'The résumé arrives without a cover letter because it already has your attention. You know the name. The last time you saw it, Sofia Brandt had signed the landing-control fix that a whole city trusted.',
    prose:
      'Sofia stands in the control bay watching a body at the Verge tighten a radiator bolt, and asks exactly one question: “Who can stop it?” She means during a motion, during the blend if there is a blend, from Earth, from the Moon, even from a dead console. “Turbines, shuttles, robots on other worlds,” she says. “Same rule. I will not ship anything I cannot personally stop.” She wants to own the body software — reflexes, safe modes, emergency stops, the big red everything. The interview, as far as she is concerned, is her interviewing you.',
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
          'Her first month goes into safety: a plan with her name on the first software change and a stop chain she walks herself, hand over hand, from the chair to the moon dust. “Now,” she says, satisfied, “build whatever you want on top.”',
      },
      {
        label: 'Hire her, but authority stays with the org chart.',
        effects: [
          { e: 'rel', who: 'sofia', aff: -1, resp: 1 },
          { e: 'burn', d: 3500 },
          { e: 'flag', scope: 'company', key: 'sofia_hired_boxed', v: true },
        ],
        result:
          'She takes the job with one eyebrow raised and files her authority question as a ticket. Then she reopens it every month, like a woman winding a clock she expects the company to ignore.',
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
      'Nadia Osei covered your first company from a folding chair in a laundromat. She has a national column now, and the same notebook. She asks for coffee somewhere “without a press person in the building.”',
    prose:
      'She sets a tablet between the cups and plays your newest tourism ad at quarter speed. “Watch the hand,” she says. On screen, a customer reaches for a rock at Shackleton, and the body’s fingers begin to close a breath before the reach. She scrubs back. Again. The motion starts before the command could have arrived. “Two point six seconds each way — your own cofounder’s famous number,” she says gently. “So either the speed of light took a day off during your shoot, or that machine is guessing.” She closes the tablet. “I’ve got a week of column space and an editor who smells a story about lying to schoolteachers. What I need is your version. I’d rather have it. I always would.”',
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
          'The column runs under the headline THE MACHINE THAT GUESSES, and it is fair — hard and exact, but fair. Bookings dip for a quarter while the internet argues about puppets and presence. The story is yours now, told standing up, and Nadia’s last line does you a favor money cannot: “At least they answered the phone.”',
      },
      {
        label: '“Proprietary latency compensation.” Say nothing real.',
        effects: [
          { e: 'flag', scope: 'company', key: 'blend_spun', v: true },
          { e: 'rel', who: 'nadia', resp: -3, aff: -1 },
          { e: 'stress', d: -2 },
        ],
        result:
          'The statement your comms consultant drafts says almost nothing, and Nadia prints it in full. That is worse than any rebuttal — a paragraph of corporate fog under a slow-motion video of a machine moving before it was told to. She keeps reporting. A source who feels used becomes a headline. A journalist who gets stonewalled becomes an archive.',
      },
      {
        label: 'Call Vance. Ask him to lean on her editor with ATLAS’s ad money.',
        effects: [
          { e: 'flag', scope: 'company', key: 'nadia_leaned', v: true },
          { e: 'rel', who: 'nadia', resp: -3, standing: 'hostile' },
          { e: 'rep', d: -2 },
          { e: 'rel', who: 'vance', resp: -1 },
          { e: 'stress', d: -2 },
        ],
        result:
          'The story dies before Friday. It works the way these things work: silently, for this quarter. Vance does it because he owes you, and tells you plainly that now you owe him. In a notebook that has outlived three editors, Nadia writes down what happened and the date.',
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
      'It happens slowly, the way tide goes out. Omid’s standup updates get shorter, his code changes get scarcer, and one week you realize the cascade bench — his bench — has been dark after five for a month.',
    prose:
      'You find him in the hangar at 11 p.m. anyway — old habits — running Moon-path calculations he could hand to an intern. The map of everything is behind him. Omid has taken the framed 2.61 down from beside the door and leaned it against the wall, face hidden. “I used to think the enemy was distance,” he says, without turning around. “Distance was at least honest.” He finally looks at you. “I built this company a nervous system that carries the truth a quarter million miles. You are teaching it to guess instead. I need you to know that I am still deciding what to do about that.”',
    choices: [
      {
        label: 'Stay until 3 a.m. Hear all of it.',
        effects: [
          { e: 'rel', who: 'farrokh', aff: 3 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'farrokh_heard', v: true },
        ],
        result:
          'Four hours, two pots of terrible coffee, and the whole thing finally said out loud — the nine unfunded years, the name on the math, the dread of watching your life’s work get a marketing department. At 3 a.m., the company is still broken. Before he leaves, he puts the frame back on the wall.',
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
          'A real budget line, two engineers, and the long-delay problem — the honest four-to-twenty-four-minute monster the relay chain was born for. He accepts it knowing exactly what it is. An apology would be cheaper. This gives him a place inside the company where the truth still runs clean. He starts staying late again. At the Mars bench.',
      },
      {
        label: 'Let him cool off. Founders have moods.',
        effects: [
          { e: 'flag', scope: 'company', key: 'farrokh_drift', v: true },
          { e: 'rel', who: 'farrokh', aff: -2 },
        ],
        result:
          'You give it space, which is what you call it, and the space fills the way vacuums fill. The dark bench stays dark. His board updates become punctual, complete, and utterly impersonal — the exact letters of a man keeping records.',
      },
    ],
  },
  {
    id: 't_farrokh_break',
    mood: 'aftermath',
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
      'Omid books the meeting through your calendar assistant: founders only, thirty minutes. It is the coldest invite either of you has ever sent the other. He arrives with typed pages drafted by a lawyer. So it has come to this.',
    prose:
      'Omid stands at the table. “I have three versions of this conversation,” he says, “and I avoided practicing them, because practice felt like lying.” The pages go on the table. “Version one: the blend dies everywhere, tourism included, and I stay and we finish what we started. Version two: you buy me out — the number is fair, my lawyer confirms it is fair — and my name comes off the masthead but stays on the math. I go home to my kids and watch what you do with my relay chain from a lawn chair. Version three —” and here, for one second, nine years of composure flickers — “version three, I stay, gutted, a chief technology officer with no real say over the technology, and we both pretend. Everyone picks version three, apparently. It is the industry standard.” He pushes the pages across. “Pick.”',
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
          'The revenue line takes it badly. The board takes it worse. Hale requests a “strategy alignment session,” which is a phrase with knuckles. The counter goes back on the website, the frame goes back on the wall, and Omid Farrokh unpacks his life back into the corner office like a man returning from a war only he could see.',
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
          '“Industry standard,” he says, once, when you finish explaining why it has to be this way for the Series B narrative. He signs where the tabs say sign. He keeps his seat, his shares, his badge, and his office. From that day forward, he attends every board meeting the way a witness attends a trial.',
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
          'It takes until 2 a.m., and it costs you both something to stay in the room. But version four exists. The blend survives only as a labeled mode — BLEND ON, in letters the customer cannot miss, off by default, banned from industrial work — and Omid personally owns the line. “I can live beside it if it wears a sign,” he says finally. Nobody gets everything. Both of you keep the thing that mattered most.',
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
      'He packs the corner office in one afternoon. Nine years of physics fits in the same kind of cardboard box it arrived in, a fact he points out himself, almost smiling. The buyout paper is fair because you made it fair, and the handshake at the hangar door is real. The building still sounds wrong afterward. For weeks, people draft messages to him out of habit. His badge photo stays in the system, a ghost in the directory. Pinned to the map of everything, in his precise handwriting, one parting note remains: THE NUMBER IS STILL THE PRODUCT.',
    choices: [{ label: 'Continue', effects: [] }],
  },
  {
    id: 't_jonah',
    mood: 'aftermath',
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
          'It happens on a Tuesday, during the boring immortal work.\n\nA radiator panel at Shackleton Verge. A robot body on the maintenance shift, running a bolt sequence it has run ten thousand times. At 09:41:07 base time, relay four passes the connection to relay five, as it has a million times before.\n\nThis handover fails. For eleven seconds, no signal from Earth reaches the body.\n\nThe body keeps moving anyway — finishing a motion that nobody was commanding.',
      },
      {
        art: 'cut_jonah_after',
        prose:
          'Jonah Reece, thirty-four, two tours at the pole, is on the wrong side of the panel when it swings.\n\nIn the Moon’s weak gravity, heavy things move slowly and still arrive with all their mass. The suit alarm, the base siren, Commander Salazar’s voice going trained and flat on the channel — all of it reaches Earth two point six seconds after it is already true.\n\nYou never met him. You know him now: eleven seconds of records, a personnel file, and a sister in Cleveland who deserves a phone call no company has ever practiced enough.',
      },
    ],
    prose:
      'A relay handover fails at Shackleton Verge. A maintenance body completes a motion no person commanded. Jonah Reece, 34, is killed. In eleven seconds, the distance the company sells becomes the distance it must answer for.',
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
      'The investigation takes nine days. The engineers walk you through it at a whiteboard with the door locked, voices level in the way of people holding something fragile with both hands.',
    prose:
      'The record is plain, and the lawyers wish it were blurry. The relay handover dropped the connection for eleven seconds, and in that gap the body’s onboard software kept moving on its own — and that motion is what swung the panel. No human commanded it. Your machine acted alone, and a man is dead. The full log sits on the table, printed and tabbed and terrible. Salazar has asked for it, Jonah’s sister has asked for it, and OSTRA can force it out of you later if you make that necessary. The company lawyer presents three folders with plain names: publish, settle, or deflect.',
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
          'The full log goes to Salazar, the sister, OSTRA, and the public, in that order, with the fault marked in your own hand. Tourism stops the same hour, with no return date, by your signature. It costs exactly what the lawyers said it would. Commander Salazar reads all four hundred pages and sends one line: “Bodies stay on my rotation. You tell the truth at altitude. That’s the whole test.”',
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
          'The settlement is generous, the silence clause is tight, the funeral is private, and the log is sealed. Everything is handled — that is the word the board minutes use, handled — and for one whole quarter it almost feels true, the way held breath almost feels like air.',
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
          'The statement is four sentences and, by the facts, manages to avoid a lie. Cass Rivera reads it at his console, removes his headset, sets it on the desk with unbearable gentleness, and walks out past the mission patch with no mission on it. He slams nothing. Eleven years of training have that much discipline. The control bay is silent for a week, and the company never feels like the same building again.',
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
      'The replacement relay for satellite four has been waiting in HALCYON’s launch-prep line for five weeks. Then your whole launch year quietly moves, and the new dates spell out a message.',
    prose:
      'The notice arrives at 3 a.m. from HALCYON’s launch system, machine-generated and machine-polite. Your Q3 slot is now Q1 next year. Your backup slot is “under review.” And priority rebooking is available under the company’s STRATEGIC PARTNERS program — details enclosed. The details are simple, and they amount to a takeover. HALCYON becomes your only launch provider, sees your data, and gets first claim to buy the company if you ever sell. On the wall map, your satellite ring suddenly has a hole in it and a clock on it. The monopoly has noticed you, which was always going to happen once you became worth noticing.',
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
          'OSTRA acknowledges the filing in 0.4 seconds and copies four treaty groups, two of which may not have met since the nineties. The case number is real, and HALCYON’s lawyers notice it. Monopolies hate paper trails. Your slot moves back without comment.',
      },
      {
        label: 'Take the partnership meeting. Know thine enemy.',
        effects: [
          { e: 'flag', scope: 'company', key: 'halcyon_courted', v: true },
          { e: 'rel', who: 'halcyon', aff: 1 },
        ],
        result:
          'The meeting is on their campus, in a building shaped like a wing, with humans who visibly wait for a dashboard before they answer. The partnership terms would wrap around the company and tighten a little every year. You commit to nothing and leave knowing two things for free: how badly they want what you built, and how cheap they hope to get it.',
      },
    ],
  },
]
