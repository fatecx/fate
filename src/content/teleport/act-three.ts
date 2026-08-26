import type { SceneDef } from '../schema'
import { LOSE_VOTE, SURVIVE_VOTE } from './preds'

/**
 * TELEPORT — Act Three: THE GRIEF AND THE ROOM.
 * A father dies, a model moves against you, and the board you built —
 * or failed to build — decides whether the chapter still belongs to you.
 */
export const ACT_THREE: readonly SceneDef[] = [
  {
    id: 't_bridge_y3',
    kind: 'cutscene',
    title: 'YEAR THREE',
    marker: 'YEAR THREE',
    skipToWeek: 104,
    priority: true,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 98 }, { k: 'seen', scene: 't_telemetry' }] },
    art: 'cut_year_three',
    screens: [
      {
        art: 'cut_year_three',
        prose:
          'Year three arrives the way years do at companies: one Monday the calendar has a new number on it, and the coffee tastes the same.\n\nThe satellite ring holds, the Verge schedule runs, and the storefront chair keeps its bookings. TELEPORT has become a place where a hundred people work now. That is a different kind of bet, renewed every week.',
      },
      {
        art: 'cut_year_three_earth',
        prose:
          'You notice it in small ways first: hotel clerks stop asking how to spell the company. HALCYON’s earnings call mentions “new remote-presence rivals” in a tone that sounds almost careful.\n\nOn your desk, in a frame you did not buy, someone has put the photograph from the expo — the crate, the counter, the crowd counting out loud. A hundred years ago this company was four desks and a declined credit card.\n\nIt was three years ago.',
      },
    ],
    prose: 'Year three. The company is real now, and everything it does carries real weight.',
    choices: [{ label: 'Continue', effects: [{ e: 'stress', d: -10 }], goto: 't_father_call' }],
  },
  {
    id: 't_father_call',
    mood: 'tender',
    ambience: 'night',
    landmark: true,
    art: 'world_father_call',
    title: 'THE CALL',
    speaker: 'father',
    leadIn:
      'Your sister calls twice in one evening. That has always meant trouble. Then your father calls himself, which means the trouble has a name.',
    prose:
      'He tells you the way he has told you everything your whole life: facts first, feelings last, a machinist reporting on his own body. The scans. The timeline. The word the doctors use when they mean months and are trying to be kind. “Don’t you dare fly home tonight,” he says, hearing you reach for your keys through the phone. “I’m not dying this week. I checked.” A pause, the length of an old kitchen, with a wall clock you can hear from two thousand miles away. “Your mother wants to know if you’re eating. I want to know—” and here the report fails him for the first time, “—when I get to see the Moon thing. The real one. In the chair.”',
    choices: [
      {
        label: 'Go home for two weeks. The company can breathe without you.',
        effects: [
          { e: 'flag', scope: 'company', key: 'went_home', v: true },
          { e: 'stress', d: -8 },
          { e: 'score', d: 2 },
          { e: 'treasury', d: -4000 },
        ],
        result:
          'Two weeks in the old house — fixing the porch rail he pretends is fine, losing at cards to a man on chemotherapy, saying the small things because the big ones refuse to come out. The company survives while you are gone. That fact rearranges something in your chest, quietly, for later.',
      },
      {
        label: 'Fly him to the Cape. Put him in the chair.',
        effects: [
          { e: 'flag', scope: 'company', key: 'father_cape', v: true },
          { e: 'stress', d: -8 },
          { e: 'score', d: 2 },
          { e: 'treasury', d: -8000 },
        ],
        result:
          'He grumbles about the wheelchair at the airport, the fuss, and the cost. Then he sits in the chair, and a body at Shackleton Verge wakes under a machinist’s hands. He is quiet for a long time on the surface of the Moon. Then he picks up a socket wrench from the tool sled, turns it over — checking the tolerances — and nods once, the highest rating he has ever given anything. The control bay crew still talks about it. You will keep the session log until you die.',
      },
      {
        label: '“After the quarter closes. I promise.”',
        effects: [
          { e: 'flag', scope: 'company', key: 'stayed_working', v: true },
          { e: 'stress', d: 6 },
        ],
        result:
          'The quarter really does need you, so the sentence is even true. He says he understands, and he does — he worked double shifts your whole childhood, and putting things off is the family language. You book flights for the week after the quarter closes and keep the confirmation email open in a tab, like a promise a browser can hold for you.',
      },
    ],
  },
  {
    id: 't_father_death',
    kind: 'cutscene',
    title: 'THE SHOEBOX',
    skipToWeek: 116,
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 110 },
        { k: 'seen', scene: 't_father_call' },
        { k: 'flag', scope: 'company', key: 'stayed_working', cmp: 'eq', v: true },
      ],
    },
    art: 'cut_shoebox',
    screens: [
      {
        art: 'cut_father_hall',
        prose:
          'He goes in his sleep, in the house he paid off — eleven days before the flight you finally booked. The confirmation email is still open in your browser tab when your sister calls. You will do that math for the rest of your life.\n\nThe funeral fills a union hall. Machinists in good suits. Your mother, upright and terrifying in her grief. Casseroles arriving like an airlift. Mrs. Delgado comes, eighty-three now, on her grandson’s arm, and holds your face in both hands. Her silence says everything.',
      },
      {
        art: 'cut_shoebox',
        prose:
          'Afterward, in his workshop, your sister hands you a shoebox with your name on it in his handwriting.\n\nEvery clipping is in there. The garage story, the corridor fight, the accident — the bad ones too, creased from being read more than once. The front page from the day your first company’s story ended. A printout of the TELEPORT expo demo, the crowd mid-count. And on top, taped there recently, torn from a legal pad, six words in machinist’s block capitals:\n\nHE BUILDS THINGS THAT REACH.',
      },
    ],
    prose:
      'Your father dies eleven days before the visit you kept postponing. The shoebox he leaves holds every clipping of every company — and six words that will outlast all of them.',
    choices: [
      {
        label: 'Continue',
        effects: [
          { e: 'flag', scope: 'company', key: 'father_gone', v: true },
          { e: 'stress', d: 12 },
        ],
      },
    ],
  },
  {
    id: 't_father_death_seen',
    kind: 'cutscene',
    title: 'THE SHOEBOX',
    skipToWeek: 116,
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 110 },
        { k: 'seen', scene: 't_father_call' },
        {
          k: 'any',
          of: [
            { k: 'flag', scope: 'company', key: 'went_home', cmp: 'eq', v: true },
            { k: 'flag', scope: 'company', key: 'father_cape', cmp: 'eq', v: true },
          ],
        },
      ],
    },
    art: 'cut_shoebox',
    screens: [
      {
        art: 'cut_father_hall',
        prose:
          'He goes in his sleep, in the house he paid off — eleven days after you saw him last. You got the time with him. Grief takes what it takes anyway, but it cannot take that.\n\nThe funeral fills a union hall. Machinists in good suits. Your mother, upright and terrifying in her grief. Casseroles arriving like an airlift. Mrs. Delgado comes, eighty-three now, on her grandson’s arm, and holds your face in both hands. Her silence says everything.',
      },
      {
        art: 'cut_shoebox',
        prose:
          'Afterward, in his workshop, your sister hands you a shoebox with your name on it in his handwriting.\n\nEvery clipping is in there. The garage story, the corridor fight, the accident — the bad ones too, creased from being read more than once. The front page from the day your first company’s story ended. A printout of the TELEPORT expo demo, the crowd mid-count. And at the top of the stack, added in the last month of his life, torn from a legal pad, six words in machinist’s block capitals:\n\nHE BUILDS THINGS THAT REACH.',
      },
    ],
    prose:
      'Your father dies eleven days after you saw him last — you got the time with him. The shoebox he leaves holds every clipping of every company, and six words that will outlast all of them.',
    choices: [
      {
        label: 'Continue',
        effects: [
          { e: 'flag', scope: 'company', key: 'father_gone', v: true },
          { e: 'stress', d: 9 },
        ],
      },
    ],
  },
  {
    id: 't_coup_move',
    mood: 'dread',
    ambience: 'boardroom',
    landmark: true,
    priority: true,
    fuseEpochs: 2,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'father_gone', cmp: 'eq', v: true },
        { k: 'flag', scope: 'company', key: 'hale_seat', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 118 },
      ],
    },
    art: 'world_coup_move',
    title: 'LEADERSHIP VARIANCE',
    speaker: 'hale',
    leadIn:
      'Three weeks after the funeral, a board meeting appears on your calendar that you did not call. The agenda item makes you read twice: EXECUTIVE LEADERSHIP REVIEW. Conrad Hale asks to see you the night before, alone.',
    prose:
      'He meets you at a quiet restaurant and leaves his food untouched. “I want you to hear it from a person,” he says, and slides over a single page — an ALEPH memo, timestamped 4 a.m. LEADERSHIP VARIANCE EXCEEDS MODEL TOLERANCE. FOUNDER DECISION DELAY UP 340 PERCENT OVER TRAILING QUARTER. RECOMMEND TRANSITION TO PROFESSIONAL MANAGEMENT. Decision delay. It measured your grief and called it inefficiency. “The model has no idea what a father is,” Hale says quietly. “I told it. It priced the information.” He folds his hands. “The motion is drafted. There are directors who will vote for it. Tomorrow, the room decides who runs this company. Board votes move by seats, one at a time. You spent three years building that board. Tomorrow you find out what you built.”',
    choices: [
      {
        label: 'Fight. Call the vote yourself, at the head of the table.',
        effects: [
          { e: 'flag', scope: 'company', key: 'vote_called', v: true },
          { e: 'stress', d: 5 },
          { e: 'score', d: 1 },
        ],
        goto: 't_coup_vote',
        result:
          '“Then let’s do the math in daylight,” you tell Hale, and take the agenda item for yourself. If the room is going to decide, it will decide to your face. Hale, to his credit, almost smiles. “For the record,” he says, “this is the version I hoped you’d pick.”',
      },
      {
        label: 'Negotiate. Executive chairman — hand off the CEO title.',
        effects: [
          { e: 'flag', scope: 'company', key: 'chairman', v: true },
          { e: 'stress', d: -6 },
          { e: 'rel', who: 'hale', aff: 1 },
        ],
        result:
          'The compromise is civilized: a professional CEO from the model’s shortlist, you upstairs as executive chairman — consulted, honored, and carefully unnecessary. The press release calls it “founder-led leadership evolution.” The model logs it as convergence. You keep an office, a title, and a view of someone else running your company well enough that no one will ever hand it back.',
      },
      {
        label: 'Resign with terms. Walk before they can make you run.',
        effects: [{ e: 'end', ending: 'ousted' }],
        result:
          'You negotiate the exit on your own terms — accelerated equity, a board observer seat you will never use, and a press release where the word “transition” does heroic work. It is dignified. Dignity, it turns out, is what they give you on the way out instead of the company.',
      },
    ],
  },
  {
    id: 't_coup_vote',
    ambience: 'night',
    landmark: true,
    art: 'world_coup_vote',
    title: 'THE NIGHT BEFORE THE VOTE',
    leadIn:
      'The vote is at nine tomorrow. Tonight the phone sits on the table like a loaded question. A few calls are still worth making. The call that would fix everything — to the better board you wish you had built — connects to nobody.',
    prose:
      'You know the count cold because you ran it in the parking lot, twice. Hale votes for the motion. The model sends memos it expects to win. Your seat is yours. Everything else was decided months and years ago, in rooms that did not look like this one — the term sheet, the fifth chair, the cofounder, the numbers you reported. Tomorrow the room adds all of it up, out loud, in front of you. Tonight, the only question left is how you walk in.',
    choices: [
      {
        label: 'Sit with June tonight. Walk in with your CFO.',
        requires: { k: 'flag', scope: 'company', key: 'june_seat', cmp: 'eq', v: true },
        effects: [
          { e: 'rel', who: 'june', aff: 2 },
          { e: 'stress', d: -4 },
        ],
        result:
          'She comes over with the WAYS WE DIE spreadsheet and a bottle of the good stuff, and at midnight she closes the laptop. “Eleven companies I watched from the outside,” she says. “You know what I never saw? A founder who deserved the room more than the people trying to take it. You do. See you at nine — I’m wearing the funeral suit. Let them sit with that.”',
      },
      {
        label: 'Call Priya. Ask her what an independent owes.',
        requires: { k: 'flag', scope: 'company', key: 'indep_priya', cmp: 'eq', v: true },
        effects: [
          { e: 'rel', who: 'priya', resp: 1 },
          { e: 'stress', d: -3 },
        ],
        result:
          '“An independent owes the company her judgment,” Priya says, and you can hear her making tea, unhurried, two bankruptcies’ worth of calm. “The fund’s model has a view. The founder’s feelings have a view. My vote gets my judgment.” A pause. “My judgment is that grief is human, and the company still needs you. Get some sleep. I have never once voted tired.”',
      },
      {
        label: 'Send ALEPH the grief-quarter numbers. Raw. Tonight.',
        requires: { k: 'flag', scope: 'company', key: 'aleph_raw', cmp: 'eq', v: true },
        effects: [
          { e: 'rel', who: 'aleph', resp: 1 },
          { e: 'stress', d: 2 },
        ],
        result:
          'You send one last report, unpolished — the quarter as it actually was, the missed calls and the caught ones, the slow decisions and what they were busy deciding, the funeral invoice filed under travel because no expense category exists for this. You add no commentary, and you let the model read the whole truth and price it. At 2:14 a.m. the answer arrives: RECEIVED. WEIGHTED. Nothing else — which, from ALEPH, may be mercy.',
      },
      {
        label: 'No calls. Sleep like a founder with a clear conscience.',
        effects: [{ e: 'stress', d: -2 }],
        result:
          'You put the phone face-down, walk the empty hangar once — past the body in its cradle, past the frame by the door if it still hangs there — and go home. The room that votes tomorrow is the room you built. By 9 a.m. you will know whether that truth comforts or cuts.',
      },
    ],
  },
  {
    id: 't_coup_win',
    ambience: 'boardroom',
    landmark: true,
    priority: true,
    when: {
      k: 'all',
      of: [{ k: 'flag', scope: 'company', key: 'vote_called', cmp: 'eq', v: true }, SURVIVE_VOTE],
    },
    art: 'world_coup_win',
    title: 'THE ROOM HOLDS',
    leadIn:
      'Nine a.m. The very good chairs. The motion is read aloud in the model’s own language, and Conrad Hale asks for the vote like a man performing a duty he privately hopes will fail.',
    prose:
      'It comes down one voice at a time, around the table you spent three years setting. The votes you earned show up. Some people in the room are your friends. Some are simply people you treated straight when it mattered. Enough are both. One by one, the people you kept faith with — and one system that measured whether your numbers told the truth — vote against the motion. The room, built vote by vote across choices that did not look like this vote at the time, holds. Hale accepts the count with a small nod, closes his folder, and says, “The fund updates on outcomes. So do I.” Afterward, in the corridor, he shakes your hand. “For the record,” he says, “I have never been so pleased to lose a client’s motion.”',
    choices: [
      {
        label: 'Back to work. The company needs its founder.',
        effects: [
          { e: 'flag', scope: 'company', key: 'coup_survived', v: true },
          { e: 'score', d: 3 },
          { e: 'stress', d: -12 },
        ],
        result:
          'The meeting moves to its regular agenda — capacity planning, the relay refresh, next quarter’s hiring — and the strangest, best thing happens. The room simply moves on. The question came, the room answered it, and it stays answered. You run your company.',
      },
      {
        label: 'One condition: the memo goes in the minutes, verbatim.',
        effects: [
          { e: 'flag', scope: 'company', key: 'coup_survived', v: true },
          { e: 'flag', scope: 'company', key: 'memo_minuted', v: true },
          { e: 'score', d: 3 },
          { e: 'stress', d: -10 },
          { e: 'rel', who: 'hale', resp: 1 },
        ],
        result:
          'LEADERSHIP VARIANCE EXCEEDS MODEL TOLERANCE goes into the permanent record, next to the vote that answered it. Every future director inherits both halves of the lesson. Hale seconds the motion to record it. “Institutional memory,” he says, “is the only kind the model respects.”',
      },
    ],
  },
  {
    id: 't_coup_loss',
    ambience: 'boardroom',
    landmark: true,
    priority: true,
    when: {
      k: 'all',
      of: [{ k: 'flag', scope: 'company', key: 'vote_called', cmp: 'eq', v: true }, LOSE_VOTE],
    },
    art: 'world_coup_loss',
    title: 'THE COUNT',
    leadIn:
      'Nine a.m. The very good chairs. The motion is read aloud, and you watch the room count itself. You meant to build a different room. This is the one you built.',
    prose:
      'It is over in eleven minutes. The seats you never filled with allies do the deciding, one polite voice at a time. The model’s memo sits at the center of the table, doing the one thing models do honestly, which is remember everything. The count carries. Deep in the paperwork you signed back when the money mattered more, a clause with your name in it activates, polite as a trapdoor with manners. Conrad Hale does not gloat, and the model would not know how. “Effective immediately,” the lawyer says. Before you reach the parking lot, your badge has stopped opening the doors of the company you founded.',
    choices: [
      {
        label: 'Clean out the desk. Shake every hand on the floor.',
        effects: [{ e: 'end', ending: 'ousted' }],
        result:
          'You walk the hangar floor one last time — machinists, operators, the crew that built the impossible with you — and shake every hand, learning three new names on your way out of the company you started. The box from your office fits in a hatchback. Of course it does. It always does.',
      },
      {
        label: 'Make them say it to the cameras outside.',
        effects: [{ e: 'rep', d: -1 }, { e: 'end', ending: 'ousted' }],
        result:
          'You stop at the microphones on the way out and make the board own its count in public — the memo, the timing, the funeral. It is honest, scorched earth, and, the coverage agrees, an extremely human thing to do. That was the quality the model flagged in the first place.',
      },
    ],
  },
  {
    id: 't_ostra_hearing',
    ambience: 'hearing',
    landmark: true,
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'flag', scope: 'company', key: 'jonah_dead', cmp: 'eq', v: true },
        { k: 'age', cmp: 'gte', v: 124 },
      ],
    },
    art: 'world_ostra_hearing',
    title: 'THE AUTHORITY',
    speaker: 'ostra',
    leadIn:
      'OSTRA, the old space AI regulator, opens its hearing into Jonah Reece’s death fourteen months later. For OSTRA, that is reckless speed. The hearing room is real, ceremonial, and mostly empty. The authority attends as a speaker on the desk and a live transcript.',
    prose:
      'The questions arrive in flat, instant text, each one stamped to the millisecond, each one a scalpel: WHO HELD COMMAND DURING THE ELEVEN SECONDS. STATE WHY THE BODY KEPT MOVING. PROVIDE THE FULL SESSION LOG. It has your filings, your marketing, your terms of service, and — because it is what it is — every public sentence you have ever said about two point six seconds. The room is empty, and the transcript is forever. Jonah’s sister sits in the second row with a printed photograph, and she is the only audience that matters.',
    choices: [
      {
        label: 'Testify with the log you already published.',
        requires: { k: 'flag', scope: 'company', key: 't_transparent', cmp: 'eq', v: true },
        effects: [
          { e: 'flag', scope: 'company', key: 'hearing_clean', v: true },
          { e: 'rep', d: 1 },
          { e: 'score', d: 1 },
          { e: 'stress', d: 2 },
        ],
        result:
          'You have already produced the log and already admitted the fault, marked in your own hand fourteen months ago. The authority’s findings, when they come, use a phrase no lawyer has seen from it before: OPERATOR DISCLOSURE EXCEEDED REQUIREMENT. Afterward, in the corridor, Jonah’s sister stops you. “You called me before the lawyers did,” she says. “I don’t forgive the machine. But I heard you.”',
      },
      {
        label: 'Unseal everything now, under oath, late.',
        requires: { k: 'flag', scope: 'company', key: 'log_sealed', cmp: 'eq', v: true },
        effects: [
          { e: 'flag', scope: 'company', key: 'unsealed_late', v: true },
          { e: 'rep', d: -1 },
          { e: 'stress', d: 6 },
        ],
        result:
          'The seal breaks in the worst room at the worst time — because the regulator makes you, on the record, while the settlement’s silence clause falls apart. The truth is the same truth it always was. Its late arrival disgraces it. The findings note the cooperation and timestamp it. The sister in the second row lets you pass in the corridor.',
      },
      {
        label: 'Let counsel carry it. Answer only what is asked.',
        effects: [
          { e: 'flag', scope: 'company', key: 'hearing_stained', v: true },
          { e: 'rep', d: -1 },
          { e: 'stress', d: 3 },
        ],
        result:
          'The lawyers are excellent. The testimony is minimal. The authority notes, in flat text, at the millisecond it happens, each question your counsel declines. The transcript reads exactly like what it is. It will be quoted for years, and never in your favor.',
      },
    ],
  },
  {
    id: 't_halcyon_offer',
    mood: 'negotiate',
    ambience: 'corp',
    landmark: true,
    priority: true,
    fuseEpochs: 3,
    when: { k: 'age', cmp: 'gte', v: 130 },
    art: 'world_halcyon_offer',
    title: 'THE NUMBER',
    speaker: 'halcyon',
    leadIn:
      'It arrives the way HALCYON does everything — machine-generated, machine-polite, and timed to your weakest quarter: an acquisition offer with a number large enough to change the weather.',
    prose:
      'Three hundred and forty million. The deck attached is respectful, thorough, and quietly obscene: your satellite ring absorbed into their launch system, your bodies repainted in their colors, your storefronts moved inside their pavilions, “founder transition support” on page nine, where they put the part where you leave. The monopoly feels no anger about the road you built around it. It has simply priced the road, the way it prices everything, and the price is real, wired-funds real, generational-wealth real. Around the table, the people who own the company you built look at the number, and then at you.',
    choices: [
      {
        label: 'Take the number. Let the sky have it.',
        foley: 'pen',
        effects: [{ e: 'end', ending: 'swallowed' }],
        result:
          'The signatures take a full day. The wire takes four seconds. The satellites you launched in threes change their call signs overnight. Somewhere at the pole, a body wakes for its shift wearing a new logo on its chest, works on, and never once looks up.',
      },
      {
        label: 'Refuse. The road stays open.',
        effects: [
          { e: 'rep', d: 1 },
          { e: 'rel', who: 'halcyon', standing: 'hostile' },
          { e: 'stress', d: 3 },
          { e: 'score', d: 1 },
        ],
        result:
          'The refusal is one paragraph. HALCYON answers with silence: no counter, no pressure, no acknowledgment. That silence is the most honest thing HALCYON has ever sent you. Somewhere in its planning system, your file just moved from the queue of things it wants to buy into the queue of things it plans to beat.',
      },
      {
        label: 'Counter: you drop the OSTRA case, they guarantee your launches.',
        requires: { k: 'flag', scope: 'company', key: 'ostra_filed', cmp: 'eq', v: true },
        effects: [
          { e: 'treasury', d: 600000 },
          { e: 'flag', scope: 'company', key: 'halcyon_truce', v: true },
          { e: 'rel', who: 'halcyon', aff: 1 },
          { e: 'stress', d: 2 },
        ],
        result:
          'The OSTRA case, it turns out, has been sitting on their top lawyer’s desk like a stone in a shoe. The settlement that comes back drops the acquisition, guarantees your launch slots at posted prices for five years, and pays your legal costs with a number that rounds to six hundred thousand. A peace, signed by a dashboard and honored to the letter.',
      },
    ],
  },
  {
    id: 't_listing',
    mood: 'endgame',
    ambience: 'roadshow',
    landmark: true,
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 136 },
        { k: 'flag', scope: 'company', key: 't_transparent', cmp: 'eq', v: true },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'blend_full', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'chairman', cmp: 'eq', v: true } },
        {
          k: 'any',
          of: [
            { k: 'flag', scope: 'company', key: 'coup_survived', cmp: 'eq', v: true },
            { k: 'flag', scope: 'company', key: 'no_aleph', cmp: 'eq', v: true },
          ],
        },
        { k: 'score', cmp: 'gte', v: 16 },
        { k: 'rep', cmp: 'gte', v: 4 },
        { k: 'stress', cmp: 'lt', v: 95 },
      ],
    },
    art: 'world_listing',
    title: 'THE SECOND BELL',
    leadIn:
      'The bankers come to the Cape this time — a different bank, or the same bank with a different posture. The founder they are pitching has done this before, and the file says so.',
    prose:
      'The buyers line up for a company that has told the truth when the truth cost money: the death at the pole published with the fault marked in your own hand, the delay framed by the hangar door, the forecast that came in flat and true. The lead banker circles a price with her pen — the high number, the one that makes headlines on day one and regrets by spring — and looks up. You realize she has read the Hyperchute file, or lived it, because she says this first: “I already know which number you’re going to pick. I told the bank group to model the honest one.” Around the table sit a CFO who waited eleven companies to ring a bell as an operator, and board signatures you earned one vote at a time.',
    choices: [
      {
        label: 'Take the company public. Price the honest number.',
        foley: 'pen',
        effects: [{ e: 'flag', scope: 'company', key: 'rang_bell_t', v: true }, { e: 'end', ending: 'listing' }],
        result:
          'The bank group grumbles for exactly one conference call, and then the roadshow discovers what the expo discovered years ago: honesty at scale is a spectacle. The order book closes full on the number the chairs can survive.',
      },
      {
        label: 'One more year private. The book will be bigger.',
        effects: [{ e: 'stress', d: 6 }],
        result:
          'You send the bankers home with the kindest no in the industry. The offering may be bigger next year. The window may close. Both futures are yours to hold now, along with everything else the waiting costs.',
      },
    ],
  },
  {
    id: 't_dark_listing',
    mood: 'aftermath',
    ambience: 'roadshow',
    landmark: true,
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 136 },
        { k: 'flag', scope: 'company', key: 'blend_full', cmp: 'eq', v: true },
        {
          k: 'any',
          of: [
            { k: 'flag', scope: 'company', key: 'log_sealed', cmp: 'eq', v: true },
            { k: 'flag', scope: 'company', key: 'blamed_cass', cmp: 'eq', v: true },
            { k: 'flag', scope: 'company', key: 'nadia_leaned', cmp: 'eq', v: true },
          ],
        },
        {
          k: 'any',
          of: [
            { k: 'flag', scope: 'company', key: 'coup_survived', cmp: 'eq', v: true },
            { k: 'flag', scope: 'company', key: 'no_aleph', cmp: 'eq', v: true },
            { k: 'flag', scope: 'company', key: 'chairman', cmp: 'eq', v: true },
          ],
        },
        { k: 'treasury', cmp: 'gte', v: 500000 },
      ],
    },
    art: 'world_dark_listing',
    title: 'THE SEAMLESS STORY',
    leadIn:
      'The bankers love this version of the company. Of course they do. Seamless presence, sealed lawsuits, and a press climate the warning section calls “managed.” The orders pour in. Every sentence in the listing papers is almost true, and the lawyers have initialed the almost.',
    prose:
      'The roadshow video is beautiful. In it, a hand reaches for a rock at Shackleton and the fingers close smoothly. The counter is gone. The number is gone. The delay was retired years ago, along with the man who framed it. The warning section discloses every important fact in sentences built to be skimmed. The death is “an operational incident, fully resolved.” Everyone in the bank group knows exactly what they are selling. The price the pen circles is the biggest number anyone has ever attached to your name. All it costs is the story being true.',
    choices: [
      {
        label: 'Ring it. Sell the seamless story at the seamless price.',
        foley: 'pen',
        effects: [{ e: 'end', ending: 'puppet' }],
        result:
          'The bell rings on time, the first-day price jump makes history, and everyone agrees the podium photographs look seamless.',
      },
      {
        label: 'Pull the filing. Not like this.',
        effects: [
          { e: 'stress', d: 8 },
          { e: 'score', d: 1 },
          { e: 'rep', d: 1 },
        ],
        result:
          'You pull the listing paperwork eleven days before the bell, at a cost the CFO declines to say out loud. The press release struggles to name the reason. The people closest to you understand it. If this company ever goes public, it will go public as something you can watch with your own eyes open.',
      },
    ],
  },
  {
    id: 't_commons',
    ambience: 'hangar',
    landmark: true,
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 142 },
        { k: 'flag', scope: 'company', key: 'honest_delay', cmp: 'eq', v: true },
        { k: 'flag', scope: 'company', key: 't_transparent', cmp: 'eq', v: true },
      ],
    },
    art: 'world_commons',
    title: 'THE PROTOCOL QUESTION',
    leadIn:
      'The letter arrives on actual paper, signed by four space agencies and eleven research stations. They want to turn the cascade — your cascade — into the open shared rules for remote presence beyond Earth. A private note is clipped to the back, in handwriting you know.',
    prose:
      'The agencies want the cascade the way harbors want lighthouses: owned by no one, maintained by everyone, trusted absolutely. Saying yes means giving away the moat — the handover patents, the timing math, the name in the equations — to a standards body. Your company becomes one builder among many. Every banker you know would call it throwing away a fortune. The handwritten note makes the other case: this is the future where the thing gets built right everywhere, instead of profitably in one place. The note is signed the way its author signs everything. 2.61.',
    choices: [
      {
        label: 'Give the cascade to everyone. Keep only the name.',
        effects: [{ e: 'end', ending: 'commons' }],
        result:
          'The signing ceremony is held in the hangar because you refuse anywhere grander. Four agencies, eleven stations, one standards body, and — arriving late, unannounced, in a lawn chair he brings himself if he ever left — the man whose math it always was, watching his number become the world’s.',
      },
      {
        label: 'Keep the moat. Lighthouses can be companies too.',
        effects: [
          { e: 'stress', d: 2 },
          { e: 'revenue', d: 4000 },
        ],
        result:
          'You license instead of donate — generous terms, fair rates, the moat intact. The agencies sign because they need the system. That need will outlive their gratitude. The handwritten note goes in a drawer you will open again someday, on a harder day, in a different company.',
      },
    ],
  },
  {
    id: 't_endgame',
    ambience: 'boardroom',
    landmark: true,
    priority: true,
    fuseEpochs: 4,
    when: { k: 'age', cmp: 'gte', v: 148 },
    art: 'world_endgame',
    title: 'WHAT IT BECOMES',
    leadIn:
      'Three years can found a company. Four years make it part of the world. TELEPORT has outlived every prediction except yours, and the question on the table has changed. What does it become next?',
    prose:
      'The board packet this quarter reads like a menu of futures. HALCYON’s standing number, refreshed monthly and patient as tide. The ending plan June — or her successor — modeled at your request: obligations met, satellites brought down with honors, capital returned, heads held high. And the long road: keep building, keep bleeding, keep the chair warm for a future that keeps almost arriving. TELEPORT has spent four years asking what distance is worth. Now it needs an answer.',
    choices: [
      {
        label: 'Sell to HALCYON. Let the number be the ending.',
        effects: [{ e: 'end', ending: 'swallowed' }],
        result:
          'The standing number, accepted at last. The integration team arrives wearing your competitor’s patience.',
      },
      {
        label: 'Close the company with honors. Pay everyone, land everything.',
        effects: [{ e: 'end', ending: 'bankrupt' }],
        result:
          'Obligations first: the Verge contract handed off intact, the operators placed, the customers made whole. What cannot be handed off is brought down — carefully, publicly, one satellite at a time. A company that ends on purpose, owing nothing, is so rare the trade press has no template for it.',
      },
      {
        label: 'Hand the cascade to the commons and step back.',
        requires: {
          k: 'all',
          of: [
            { k: 'flag', scope: 'company', key: 'honest_delay', cmp: 'eq', v: true },
            { k: 'flag', scope: 'company', key: 't_transparent', cmp: 'eq', v: true },
          ],
        },
        effects: [{ e: 'end', ending: 'commons' }],
        result:
          'The shared rules outlive the company on purpose. It is the rare exit where the mission fires the business, politely, with a pension.',
      },
    ],
  },
]
