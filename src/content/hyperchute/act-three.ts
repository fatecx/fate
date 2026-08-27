import type { SceneDef } from '../schema'

/** HYPERCHUTE — Act Three: RECKONING. The accident, the storm, the offer. */
export const ACT_THREE: readonly SceneDef[] = [
  {
    id: 'h_cut_accident',
    ambience: 'accident',
    place: 'RICHMOND STREET',
    art: 'cut_richmond_451',
    kind: 'cutscene',
    title: 'RICHMOND STREET, 4:51 P.M.',
    prose:
      'A part in the descent controller fails — version nine, Sofia’s own code — and Shuttle Fourteen drops a forty-pound parcel from sixty feet instead of four. A nurse, fifty-eight, is biking home from the hospital where she has worked for thirty-one years. The parcel hits her and leaves her badly hurt. Someone records it. By midnight, every channel in the city leads with the railway in the sky.',
    choices: [{ label: 'Continue', effects: [{ e: 'flag', scope: 'company', key: 'act3_open', v: true }], goto: 'h_accident' }],
  },
  {
    id: 'h_accident',
    ambience: 'accident',
    place: 'HYPERCHUTE HQ',
    landmark: true,
    art: 'world_richmond',
    title: 'THE FIRST FORTY-EIGHT HOURS',
    priority: true,
    fuseEpochs: 2,
    leadIn:
      'You get the call at 4:53 and reach Richmond Street by 5:20, before the second news van. The parcel still lies on the pavement inside a chalk rectangle. The shuttle’s beacon is off. Then you realize you turned it off from your phone during the drive over.',
    prose:
      'The lawyers tell you to stay silent. The insurance company tells you to wait before paying. Your gut says the machine was yours. The corridors office has opened an emergency investigation. Chute’s couriers are quietly delivering flowers to Ms. Chen’s block. It is cynical, and it is working.',
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
        result: 'You ground every shuttle before anyone asks and publish the full fault report. Your company lawyer calls it a mistake. The city calls you decent, a word it almost never uses for startups.',
      },
      {
        label: 'Settle quietly. NDA, sealed, move on.',
        effects: [
          { e: 'treasury', d: -90000 },
          { e: 'stress', d: 5 },
          { e: 'flag', scope: 'company', key: 'nda', v: true },
        ],
        result: 'The family’s lawyer is fair. The check is enormous. The deal says everyone stays quiet, including you. The fleet keeps flying. Somewhere in version nine, the same fault keeps flying too.',
      },
      {
        label: 'Blame the installation contractor. It was their sleeve.',
        effects: [
          { e: 'rep', d: -2 },
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'blame_shift', v: true },
        ],
        result: 'Your response to the city is technically true, and everyone who reads it hates you anyway. The contractor’s lawyers answer within a day. Now the news has two stories, and yours is the one with more money behind it.',
      },
    ],
  },
  {
    id: 'h_press_storm',
    ambience: 'cafe',
    accent: 'street',
    mood: 'siege',
    title: 'SHE HAS THE REPORT',
    speaker: 'nadia',
    priority: true,
    leadIn:
      'The story has outgrown the city. National news runs the porch-camera clip on a loop, and a senator you have never met says Hyperchute into a microphone. In that noise, your phone buzzes with Nadia’s name.',
    when: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true },
    prose:
      'Nadia’s email is two words. “Coffee. Now.” She has the early investigation draft, leaked by someone inside the corridors office. She has forty-eight hours before she publishes what she knows. “I’d rather have it from you,” she says. “I’ll run it either way.”',
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
        result: 'Her piece runs with your fault report printed in full and one line everyone repeats. THE FOUNDER GROUNDED THE FLEET BEFORE THE CITY COULD. The woman your shuttle struck is still hurt. The truth is public, and it came from you.',
      },
      {
        label: 'Steer her — what to emphasize, what to bury.',
        effects: [
          { e: 'rep', d: 1 },
          { e: 'stress', d: 2 },
          { e: 'rel', who: 'nadia', resp: -1 },
        ],
        result: 'The story runs softer than it could have. In her notebook and in her memory, she marks the exact sentences you asked her to leave out.',
      },
      {
        label: 'Stonewall. No comment, again.',
        effects: [
          { e: 'rel', who: 'nadia', standing: 'hostile', aff: -2 },
          { e: 'rep', d: -2 },
        ],
        result: 'She runs the story without you. The leak looks worse than the report. A headline puts the word “cover-up” above your company’s name.',
      },
    ],
  },
  {
    id: 'h_sofia_verdict',
    ambience: 'garage',
    accent: 'night',
    title: 'VERSION NINE',
    speaker: 'sofia',
    priority: true,
    leadIn:
      'The garage lights have stayed on every night this week. You find Sofia at the bench at 6 a.m. Cold coffee surrounds her, along with printouts of an error report. The failed line is circled in red until the paper has torn.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true },
        { k: 'flag', scope: 'company', key: 'sofia_resolved', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'sofia_verdict', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Sofia wrote the code that failed. She has barely slept, and she has rebuilt the landing system three times. Version ten stops safely from any height, anywhere. The part still hanging over her is whether she can stay. “Tell me who we are,” she says, “and I’ll tell you if I’m still here.”',
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
        result: 'She stays. Version ten ships with her name on it. She proves the emergency stop in front of the whole company by dropping a live shuttle onto foam blocks in the laundromat parking lot.',
      },
      {
        label: '“We survive. Whatever it takes.”',
        effects: [
          { e: 'rel', who: 'sofia', aff: -3 },
          { e: 'stress', d: 6 },
          { e: 'flag', scope: 'company', key: 'sofia_verdict', v: true },
          { e: 'flag', scope: 'company', key: 'sofia_gone', v: true },
        ],
        result: 'She looks at you for a long moment, then starts packing her tools. Her final code update says, “for whoever inherits this.”',
      },
    ],
  },
  {
    id: 'h_suspension',
    ambience: 'hearing',
    accent: 'crowd',
    mood: 'siege',
    art: 'world_suspension',
    landmark: true,
    title: 'EMERGENCY SUSPENSION HEARING',
    priority: true,
    fuseEpochs: 3,
    leadIn:
      'The notice goes straight to the public website this time, with no courtesy call and no early email. It reads: Friday session, room 4-B, EMERGENCY REVIEW, HYPERCHUTE FLIGHT RIGHTS. The same room where the railway was born will now vote on whether it keeps flying.',
    when: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true },
    prose:
      'The corridors office votes Friday on whether every Hyperchute corridor must shut down during the investigation. Chute’s lobbyists are pushing a “public safety alternative,” which means Chute everywhere, immediately. You can testify yourself, send Tomás, or accept the pause and save your strength.',
    choices: [
      {
        label: 'Testify yourself. Name the victim. Admit version nine failed. Show version ten.',
        requires: { k: 'stress', cmp: 'lt', v: 85 },
        effects: [
          { e: 'stress', d: 7 },
          { e: 'rep', d: 2 },
          { e: 'score', d: 1 },
          { e: 'rel', who: 'corr', resp: 2 },
        ],
        result: 'You testify for eleven minutes with your fleet grounded and the fault report in every commissioner’s hands. The suspension passes 4–1 with a ninety-day review. The one commissioner who votes for you quotes you in the record.',
      },
      {
        label: 'Send counsel. Let lawyers do lawyer work.',
        requires: { k: 'met', who: 'tomas' },
        effects: [
          { e: 'stress', d: 2 },
          { e: 'rep', d: -1 },
        ],
        result: 'Tomás wins the rule fight and loses the room. The suspension lasts until the office says otherwise. “You should’ve been the one standing there,” he says, gently.',
      },
      {
        label: 'Accept a 90-day pause without a fight.',
        effects: [
          { e: 'revenue', d: -1600 },
          { e: 'stress', d: -4 },
          { e: 'rel', who: 'corr', aff: 1 },
        ],
        result: 'For ninety days, the sky over the Flats goes quiet. Chute flies your routes at triple surge pricing. The neighborhood remembers who stopped flying and who cashed in.',
      },
    ],
  },
  {
    id: 'h_offer',
    ambience: 'garage',
    accent: 'night',
    mood: 'negotiate',
    landmark: true,
    title: 'THE OFFER, MID-STORM',
    speaker: 'marcus',
    priority: true,
    fuseEpochs: 3,
    leadIn:
      'A month into the storm, the vultures sort themselves by effort. Some email. Some call. One climbs your stairs in person on a Sunday, holding a folder like it has weight.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 134 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'offer_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Marcus Vale comes to the garage on foot, carrying one folder. His face does something you have never seen before. He hesitates. “Acquisition. Two hundred million. Your team joins mine, and the tubes turn blue. Or keep bleeding through an investigation while my company pushes the city office against you. This is arithmetic.” He slides the folder across your own workbench. “Take the arithmetic.”',
    choices: [
      {
        label: 'Sell. Two hundred million ends every problem.',
        effects: [
          { e: 'flag', scope: 'company', key: 'offer_done', v: true },
          { e: 'end', ending: 'acquired' },
        ],
      },
      {
        label: 'Offer them you instead of the company. Take the MERIDIAN job.',
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
        result: 'You close the folder. Marcus stands and straightens his jacket. For one unguarded second, he looks almost relieved. “Then win,” he says, and takes the stairs down.',
      },
    ],
  },
  {
    id: 'h_war_room',
    ambience: 'night',
    place: 'THE WAR ROOM',
    accent: 'garage',
    mood: 'endgame',
    landmark: true,
    art: 'world_war_room',
    title: 'THE WAR ROOM',
    priority: true,
    leadIn:
      'Word of the refusal gets out by Monday. Marcus keeps quiet, but folders have a way of traveling. The headlines choose the easy picture and print DAVID DECLINES. Everyone who still works for you shows up that night without being asked.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'refused', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'endgame', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'The room fills with whiteboards, cold noodles, and everyone you have left. Three doors remain open. Take the company public, if the numbers and the name can carry it. Give the technology to the whole world. Or fight in the streets for one more quarter, porch by porch, where one mistake can sink the company.',
    choices: [
      {
        label: 'Take the company public.',
        requires: {
          k: 'all',
          of: [
            { k: 'score', cmp: 'gte', v: 12 },
            { k: 'rep', cmp: 'gte', v: 4 },
          ],
        },
        effects: [
          { e: 'flag', scope: 'company', key: 'endgame', v: true },
          { e: 'stress', d: -10 },
        ],
        goto: 'h_ipo_road',
        result: 'Choosing gives the room its first deep breath in weeks. The whiteboard clears until only one word remains. LIST.',
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
    ambience: 'roadshow',
    accent: 'corp',
    mood: 'endgame',
    art: 'world_roadshow',
    landmark: true,
    title: 'THE ROAD SHOW',
    priority: true,
    leadIn:
      'The bankers running the IPO arrive with a slide template and leave believing the story. Priya says it after the second meeting runs long because they keep asking real questions. Then a calendar invite lands. Eleven cities, nine days, wheels up Monday.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'endgame', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'ipo_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'You fly to eleven cities in nine days, because the bankers need a story investors will believe, and your strongest story is the simple, true one: you grounded your own fleet and it came back, your couriers got health insurance, and the full fault report went public with your name on it. The last meeting sets the IPO price. Somewhere in the building, a banker says “the people’s network” with a straight face, and everyone lets it pass.',
    choices: [
      {
        label: 'Price it honest. Ring the bell.',
        requires: {
          k: 'all',
          of: [
            { k: 'flag', scope: 'company', key: 'transparent', cmp: 'eq', v: true },
            { k: 'score', cmp: 'gte', v: 14 },
            { k: 'rep', cmp: 'gte', v: 5 },
            { k: 'treasury', cmp: 'gte', v: 100000 },
            { k: 'stress', cmp: 'lt', v: 85 },
          ],
        },
        effects: [
          { e: 'flag', scope: 'company', key: 'ipo_done', v: true },
          { e: 'flag', scope: 'company', key: 'rang_bell', v: true },
          { e: 'end', ending: 'triumph_ipo' },
        ],
      },
      {
        label: 'Pull the listing — sell to the syndicate instead.',
        effects: [
          { e: 'flag', scope: 'company', key: 'ipo_done', v: true },
          { e: 'end', ending: 'acquired' },
        ],
      },
    ],
  },
  {
    id: 'h_last_stand',
    ambience: 'night',
    place: 'THE FLATS',
    accent: 'garage',
    mood: 'endgame',
    art: 'world_last_stand',
    landmark: true,
    title: 'THE LAST QUARTER',
    priority: true,
    leadIn:
      'The choice clears the room down to what matters. One whiteboard holds ninety boxes for ninety days. The first box is already crossed out because today counts.',
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'endgame', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'last_done', cmp: 'eq', v: true } },
      ],
    },
    prose:
      'Bankers are gone. Marcus’s folder is gone. What remains is the Flats, the couriers, the porches, and ninety days to prove the railway deserves the sky. Chute outspends you ten to one. The Flats may still trust you, if you can earn that trust again.',
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
          { e: 'treasury', d: 150000 },
          { e: 'rep', d: 2 },
          { e: 'score', d: 2 },
          { e: 'stress', d: -8 },
          { e: 'flag', scope: 'company', key: 'last_done', v: true },
        ],
        goto: 'h_ipo_road',
        result: 'Ninety days later, the Flats is yours again, porch by porch. Forty thousand subscriptions are prepaid because the neighborhood pays for what it trusts. Bankers who stopped calling start calling back. One door remains, and it leads to the IPO price meeting.',
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
