import type { SceneDef } from '../schema'

/** HYPERCHUTE — Act Three: RECKONING. The accident, the storm, the offer. */
export const ACT_THREE: readonly SceneDef[] = [
  {
    id: 'h_cut_accident',
    kind: 'cutscene',
    title: 'RICHMOND STREET, 4:51 P.M.',
    prose:
      'A descent controller throws a transient fault — version nine, Sofia’s own code — and Shuttle Fourteen drops a forty-pound parcel from sixty feet instead of four. Mei-Lin Chen, fifty-eight, cycling home from the hospital where she has worked thirty-one years, is struck and severely injured. There is footage. There is always footage. By midnight, every channel in the city leads with the railway in the sky.',
    choices: [{ label: 'Continue', effects: [{ e: 'flag', scope: 'company', key: 'act3_open', v: true }], goto: 'h_accident' }],
  },
  {
    id: 'h_accident',
    title: 'THE FIRST FORTY-EIGHT HOURS',
    priority: true,
    fuseEpochs: 2,
    leadIn:
      'You get the call at 4:53 and are on Richmond Street by 5:20, before the second news van. The parcel is still on the pavement inside a chalk rectangle. Someone has turned off the shuttle’s beacon, and you realize numbly that it was you, from the phone in your hand, on the drive over.',
    prose:
      'The lawyers, the insurer, and the pit in your stomach all say the same three things in different orders. The corridors office has opened an emergency investigation. Chute’s couriers are quietly delivering flowers to Ms. Chen’s block, which is the most cynical thing you have ever seen and it is working.',
    choices: [
      {
        label: 'Ground the fleet. Cooperate with everything.',
        effects: [
          { e: 'revenue', d: -1500 },
          { e: 'treasury', d: -40000 },
          { e: 'rep', d: 2 },
          { e: 'stress', d: 8 },
          { e: 'flag', scope: 'company', key: 'transparent', v: true },
        ],
        result: 'You ground every shuttle before anyone asks and publish the fault report raw. Your general counsel calls it unilateral disarmament. The city calls it something it hasn’t called a startup in years: decent.',
      },
      {
        label: 'Settle quietly. NDA, sealed, move on.',
        effects: [
          { e: 'treasury', d: -90000 },
          { e: 'stress', d: 5 },
          { e: 'flag', scope: 'company', key: 'nda', v: true },
        ],
        result: 'The family’s lawyer is fair and the check is enormous and nobody is allowed to talk about it, including you. The fleet keeps flying. So does the fault, somewhere, in version nine.',
      },
      {
        label: 'Blame the installation contractor. It was their sleeve.',
        effects: [
          { e: 'rep', d: -2 },
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'blame_shift', v: true },
        ],
        result: 'The filing is technically accurate and morally legible to absolutely no one. The contractor’s lawyers return fire within a day, and now there are two stories and yours is the one with more money in it.',
      },
    ],
  },
  {
    id: 'h_press_storm',
    title: 'SHE HAS THE REPORT',
    speaker: 'nadia',
    priority: true,
    leadIn:
      'The story has stopped being local. National desks run the porch-camera clip on loop; a senator you’ve never met says your company’s name into a microphone. Into that noise, one specific phone buzzes with one specific name on it.',
    when: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true },
    prose:
      'Nadia’s email is two words this time: “Coffee. Now.” She has the preliminary investigation draft — someone inside the corridors office leaked it — and forty-eight hours before she goes to press with whatever she has. “I’d rather have it from you,” she says. “But I’ll run it without you.”',
    choices: [
      {
        label: 'Hand her everything, on record.',
        requires: { k: 'flag', scope: 'company', key: 'transparent', cmp: 'eq', v: true },
        effects: [
          { e: 'rep', d: 2 },
          { e: 'score', d: 1 },
          { e: 'stress', d: 3 },
          { e: 'rel', who: 'nadia', aff: 2, resp: 2 },
        ],
        result: 'Her piece runs with your fault report printed in full and one line everyone repeats: THE FOUNDER GROUNDED THE FLEET BEFORE THE CITY COULD. It does not undo what happened to Mei-Lin Chen. Nothing does. But it is the truth, and it is yours.',
      },
      {
        label: 'Steer her — what to emphasize, what to bury.',
        effects: [
          { e: 'rep', d: 1 },
          { e: 'stress', d: 2 },
          { e: 'rel', who: 'nadia', resp: -1 },
        ],
        result: 'The story runs softer than it might have. She notes, in her notebook and in her memory, exactly which sentences you asked her not to write.',
      },
      {
        label: 'Stonewall. No comment, again.',
        effects: [
          { e: 'rel', who: 'nadia', standing: 'hostile', aff: -2 },
          { e: 'rep', d: -2 },
        ],
        result: 'She runs it without you. The leak is worse than the report. The word “cover-up” appears in a headline above your company’s name.',
      },
    ],
  },
  {
    id: 'h_sofia_verdict',
    title: 'VERSION NINE',
    speaker: 'sofia',
    priority: true,
    leadIn:
      'The garage lights have been on every night this week. You find her at the bench at 6 a.m., surrounded by cold coffee and printouts of a stack trace, the fault line circled in red so many times the paper has torn.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true },
        { k: 'flag', scope: 'company', key: 'sofia_resolved', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'sofia_verdict', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'She wrote the code that failed. She has not slept, and she has rewritten the descent controller three times — version ten fails safe from any altitude, anywhere. What she cannot rewrite is whether she can stay. “Tell me who we are,” she says, “and I’ll tell you if I’m still here.”',
    choices: [
      {
        label: '“We ground first, publish everything, and fix it in daylight.”',
        requires: { k: 'flag', scope: 'company', key: 'transparent', cmp: 'eq', v: true },
        effects: [
          { e: 'rel', who: 'sofia', aff: 2, resp: 2 },
          { e: 'score', d: 1 },
          { e: 'rep', d: 1 },
          { e: 'flag', scope: 'company', key: 'sofia_verdict', v: true },
        ],
        result: 'She stays. Version ten ships with her name on the commit and a kill-switch she demonstrates at the all-hands by dropping a shuttle onto foam blocks in the laundromat parking lot.',
      },
      {
        label: '“We survive. Whatever it takes.”',
        effects: [
          { e: 'rel', who: 'sofia', aff: -3 },
          { e: 'stress', d: 6 },
          { e: 'flag', scope: 'company', key: 'sofia_verdict', v: true },
          { e: 'flag', scope: 'company', key: 'sofia_gone', v: true },
        ],
        result: 'She looks at you for a long moment, then starts packing her oscilloscope. The commit message on her last push reads: “for whoever inherits this.”',
      },
    ],
  },
  {
    id: 'h_suspension',
    title: 'EMERGENCY SUSPENSION HEARING',
    priority: true,
    fuseEpochs: 3,
    leadIn:
      'The notice is posted publicly this time — no courtesy call, no email first. Agenda item one, Friday session, room 4-B again: EMERGENCY REVIEW, HYPERCHUTE CORRIDOR AUTHORIZATIONS. The room where the railway was born gets to vote on whether it dies.',
    when: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true },
    prose:
      'The corridors office votes Friday on emergency suspension of every Hyperchute corridor pending the investigation. Chute’s lobbyists are circulating a “public safety alternative” that is Chute, everywhere, immediately. You can testify, send counsel, or accept the pause and live to fly again.',
    choices: [
      {
        label: 'Testify personally. Say her name, say version nine, say version ten.',
        effects: [
          { e: 'stress', d: 7 },
          { e: 'rep', d: 2 },
          { e: 'score', d: 1 },
          { e: 'rel', who: 'corr', resp: 2 },
        ],
        result: 'You testify for eleven minutes with your fleet grounded and your fault report in every commissioner’s hands. The suspension passes 4–1 — with a ninety-day review instead of indefinite, and the dissenting commissioner quotes you in the record.',
      },
      {
        label: 'Send counsel. Let lawyers do lawyer work.',
        requires: { k: 'met', who: 'tomas' },
        effects: [
          { e: 'stress', d: 2 },
          { e: 'rep', d: -1 },
        ],
        result: 'Tomás wins the procedural points and loses the room. Suspension passes with an indefinite tail. “You should’ve been the one standing there,” he says, not unkindly.',
      },
      {
        label: 'Accept a 90-day pause without a fight.',
        effects: [
          { e: 'revenue', d: -1600 },
          { e: 'stress', d: -4 },
          { e: 'rel', who: 'corr', aff: 1 },
        ],
        result: 'Ninety days of silence over the Flats. Chute flies your routes at triple surge pricing. The neighborhood remembers who stopped and who profited.',
      },
    ],
  },
  {
    id: 'h_offer',
    title: 'THE OFFER, MID-STORM',
    speaker: 'marcus',
    priority: true,
    fuseEpochs: 3,
    leadIn:
      'Six weeks into the storm, the vultures have sorted themselves into tiers: the ones who email, the ones who call, and the one who climbs your stairs in person on a Sunday, holding a folder like it weighs something.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 36 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'offer_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Marcus Vale comes to the garage — no car this time, no assistant, just a folder and a face doing something you have never seen it do, which is hesitate. “Acquisition. Two hundred million, your team absorbed, the tubes painted blue. Or keep bleeding through an investigation with my company lobbying your regulators. This isn’t a threat, it’s arithmetic.” He slides the folder across your own workbench. “Take the arithmetic.”',
    choices: [
      {
        label: 'Sell. Two hundred million ends every problem.',
        effects: [
          { e: 'flag', scope: 'company', key: 'offer_done', v: true },
          { e: 'end', ending: 'acquired' },
        ],
      },
      {
        label: 'Counter: not the company. You. Rise inside MERIDIAN.',
        requires: { k: 'rel', who: 'marcus', field: 'affinity', cmp: 'gte', v: 1 },
        effects: [
          { e: 'flag', scope: 'company', key: 'offer_done', v: true },
          { e: 'end', ending: 'become_them' },
        ],
      },
      {
        label: 'Refuse. The railway is not for sale.',
        effects: [
          { e: 'stress', d: 5 },
          { e: 'score', d: 2 },
          { e: 'flag', scope: 'company', key: 'offer_done', v: true },
          { e: 'flag', scope: 'company', key: 'refused', v: true },
        ],
        goto: 'h_war_room',
        result: 'You close the folder. Marcus stands, straightens his jacket, and — for one unguarded second — looks almost relieved. “Then win,” he says, and takes the stairs down.',
      },
    ],
  },
  {
    id: 'h_war_room',
    title: 'THE WAR ROOM',
    priority: true,
    leadIn:
      'Word of the refusal gets out by Monday — Marcus doesn’t leak, but folders have gravity. The stock-photo headlines write themselves: DAVID DECLINES. Everyone who still works for you shows up that night without being asked.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'refused', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'endgame', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Whiteboards, cold noodles, everyone you have left. Three doors are still standing: the listing, if the numbers and the name can carry it; the stack, opened to the world; or the street — one more quarter fought porch by porch, no margin for error, all of it.',
    choices: [
      {
        label: 'Ride for the listing.',
        requires: {
          k: 'all',
          of: [
            { k: 'score', cmp: 'gte', v: 12 },
            { k: 'rep', cmp: 'gte', v: 4 },
          ],
        },
        effects: [
          { e: 'flag', scope: 'company', key: 'endgame', v: true },
        ],
        goto: 'h_ipo_road',
      },
      {
        label: 'Open-source the stack. Give the railway to everyone.',
        effects: [
          { e: 'flag', scope: 'company', key: 'endgame', v: true },
          { e: 'end', ending: 'walkaway_opensource' },
        ],
      },
      {
        label: 'Fight on the streets. One more quarter.',
        effects: [
          { e: 'flag', scope: 'company', key: 'endgame', v: true },
          { e: 'stress', d: 4 },
        ],
        goto: 'h_last_stand',
      },
    ],
  },
  {
    id: 'h_ipo_road',
    title: 'THE ROAD SHOW',
    priority: true,
    leadIn:
      'The underwriters arrive with a slide template and leave with religion — Priya’s phrase, after the second meeting runs long because the bankers kept asking real questions. A calendar invite lands: eleven cities, nine days, wheels up Monday.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'endgame', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'ipo_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Eleven cities in nine days. The underwriters want a story and you have a better one: a grounded fleet that got back up, a courier pool with health insurance, a fault report printed in full. The last meeting is the pricing call. Somewhere in the building, a banker says the words “the people’s network” without irony and everyone pretends that is normal.',
    choices: [
      {
        label: 'Price it honest. Ring the bell.',
        requires: {
          k: 'all',
          of: [
            { k: 'rep', cmp: 'gte', v: 4 },
            { k: 'treasury', cmp: 'gte', v: 100000 },
          ],
        },
        effects: [
          { e: 'flag', scope: 'company', key: 'ipo_done', v: true },
          { e: 'end', ending: 'triumph_ipo' },
        ],
      },
      {
        label: 'Delay the pricing — one more quarter of growth first.',
        effects: [
          { e: 'flag', scope: 'company', key: 'ipo_done', v: true },
          { e: 'stress', d: 4 },
        ],
        goto: 'h_last_stand',
        result: 'The bankers warn you about windows. Windows close. You book the road show again for spring.',
      },
    ],
  },
  {
    id: 'h_last_stand',
    title: 'THE LAST QUARTER',
    priority: true,
    leadIn:
      'The decision empties the room of everything except what’s true: a whiteboard wiped clean to one column, ninety days drawn as ninety boxes, and the first box already crossed out because today counts.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'endgame', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'last_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'No bankers, no exits, no folder from Marcus. Just the Flats, the couriers, the porches, and ninety days to prove the railway deserves the sky. Chute outspends you ten to one. You have something they cannot buy, if — only if — it is still true.',
    choices: [
      {
        label: 'Win the city back: free routes for schools and the food bank.',
        requires: {
          k: 'all',
          of: [
            { k: 'rep', cmp: 'gte', v: 2 },
            { k: 'runway', cmp: 'gte', v: 12 },
          ],
        },
        effects: [
          { e: 'revenue', d: -600 },
          { e: 'rep', d: 2 },
          { e: 'score', d: 2 },
          { e: 'flag', scope: 'company', key: 'last_done', v: true },
          { e: 'end', ending: 'triumph_ipo' },
        ],
        result: 'The listing happens almost as a footnote to the thing itself: the people’s network, listed at 9:31 a.m., with Rosa from the courier pool holding the button.',
      },
      {
        label: 'Sell to the rival syndicate — anyone but MERIDIAN.',
        effects: [
          { e: 'flag', scope: 'company', key: 'last_done', v: true },
          { e: 'end', ending: 'acquired' },
        ],
      },
      {
        label: 'Go down swinging. Every corridor, every week, no surrender.',
        effects: [
          { e: 'flag', scope: 'company', key: 'last_done', v: true },
          { e: 'end', ending: 'bankrupt' },
        ],
      },
    ],
  },
]
