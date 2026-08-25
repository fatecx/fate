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
          'Year three arrives without ceremony, the way years do at companies — one Monday the calendar has a new number on it and the coffee tastes the same.\n\nThe constellation holds. The Verge rotation runs. The chair in the storefront has a waiting list or a waiting silence, depending on the choices that got you here. TELEPORT is no longer a bet; it is a place where a hundred people work, which is a different kind of bet, renewed weekly.',
      },
      {
        art: 'cut_year_three_earth',
        prose:
          'You notice it in small ways first: hotel clerks stop asking how to spell the company. HALCYON’s earnings call mentions “emerging presence-market competitors” and does not laugh.\n\nAnd on your desk, in a frame you did not buy, someone has put the photograph from the expo — the crate, the counter, the crowd counting out loud. A hundred years ago this company was four desks and a declined credit card.\n\nIt was three years ago.',
      },
    ],
    prose: 'Year three. The company is real now — which means everything it does is real too.',
    choices: [{ label: 'Continue', effects: [{ e: 'stress', d: -10 }], goto: 't_father_call' }],
  },
  {
    id: 't_father_call',
    ambience: 'night',
    landmark: true,
    art: 'world_father_call',
    title: 'THE CALL',
    speaker: 'father',
    leadIn:
      'Your sister calls twice in one evening, which has never once meant good news, and then your father calls himself, which means it is worse than that.',
    prose:
      'He tells you the way he has told you everything your whole life: facts first, feelings never, the machinist’s report on his own body. The scans, the timeline, the word the doctors use when they mean months and are trying to be kind about it. “Don’t you dare fly home tonight,” he says, hearing you reach for your keys through the phone. “I’m not dying this week. I checked.” A pause, the length of an old kitchen, a wall clock you can hear from two thousand miles away. “Your mother wants to know if you’re eating. I want to know—” and here the report fails him for the first time, “—I want to know when I get to see the Moon thing. The real one. Not the video.”',
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
          'Two weeks in the old house — fixing the porch rail he pretends is fine, losing at cards to a man on chemotherapy, saying none of the big things and all of the small ones, which it turns out were the big things. The company survives without you. That fact rearranges something in your chest, quietly, for later.',
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
          'He grumbles about the wheelchair at the airport and the fuss and the cost, and then he sits in the chair, and a body at Shackleton Verge wakes under a machinist’s hands. He is quiet for a long time on the surface of the Moon. Then he picks up a socket wrench from the tool sled, turns it over — checking the tolerances — and nods once, the highest rating he has ever given anything. The teleop bay crew still talks about it. You will keep the session log until you die.',
      },
      {
        label: '“After the quarter closes. I promise.”',
        effects: [
          { e: 'flag', scope: 'company', key: 'stayed_working', v: true },
          { e: 'stress', d: 6 },
        ],
        result:
          'The quarter needs you; the sentence is even true. He says he understands, and he does — he worked doubles your whole childhood; deferral is the family language. You book flights for the week after close and keep the confirmation email open in a tab, like a promise a browser can hold for you.',
      },
    ],
  },
  {
    id: 't_father_death',
    kind: 'cutscene',
    title: 'THE SHOEBOX',
    skipToWeek: 116,
    priority: true,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 110 }, { k: 'seen', scene: 't_father_call' }] },
    art: 'cut_shoebox',
    screens: [
      {
        art: 'cut_father_hall',
        prose:
          'He goes in his sleep, in the house he paid off, eleven days before the flight on the confirmation email — or eleven days after you left, depending on the road you took, and the difference between those two sentences is a thing you will carry either way.\n\nThe funeral is union-hall sized. Machinists in good suits, your mother upright and terrifying in her grief, casseroles arriving with the logistical precision of an airlift. Mrs. Delgado comes, eighty-three now, on her grandson’s arm, and holds your face in both hands and says nothing at all, which says everything.',
      },
      {
        art: 'cut_shoebox',
        prose:
          'Afterward, in his workshop, your sister hands you a shoebox with your name on it in his handwriting.\n\nEvery clipping. The garage story, the corridor fight, the accident — the bad ones too, creased from reading. The Hyperchute prospectus, or the bankruptcy notice, or both. A printout of the TELEPORT expo demo, the crowd mid-count. And on top, taped there recently, torn from a legal pad, six words in machinist’s block capitals:\n\nHE BUILDS THINGS THAT REACH.',
      },
    ],
    prose:
      'Your father dies. The shoebox he leaves holds every clipping of every company — and six words that will outlast all of them.',
    choices: [
      {
        label: 'Continue',
        effects: [
          { e: 'flag', scope: 'company', key: 'father_gone', v: true },
          { e: 'stress', d: 10 },
        ],
      },
    ],
  },
  {
    id: 't_coup_move',
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
      'Three weeks after the funeral, a board meeting appears on your calendar that you did not call, with an agenda item you have to read twice: EXECUTIVE LEADERSHIP REVIEW. Conrad Hale asks to see you the night before, alone, which is either a courtesy or a confession.',
    prose:
      'He meets you at a quiet restaurant and does not touch his food. “I want you to hear it from a person,” he says, and slides a single page across — an ALEPH memo, timestamped 4 a.m. LEADERSHIP VARIANCE EXCEEDS MODEL TOLERANCE. FOUNDER DECISION LATENCY UP 340 PERCENT OVER TRAILING QUARTER. RECOMMEND TRANSITION TO PROFESSIONAL MANAGEMENT. Decision latency. It measured your grief and found it inefficient. “The model doesn’t know what a father is,” Hale says quietly. “I told it. It priced the information.” He folds his hands. “The motion is drafted. There are directors who will vote for it. Tomorrow, the room decides who runs this company — and I have learned the hard way that the room is arithmetic, not sentiment. Whatever you built the board to be, that is what it will be tomorrow.”',
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
          '“Then let’s do the arithmetic in daylight,” you tell Hale, and take the agenda item for yourself. If the room is going to decide, it will decide looking at you, not at a memo. Hale, to his credit, almost smiles. “For the record,” he says, “this is the version I hoped you’d pick.”',
      },
      {
        label: 'Negotiate. Executive chairman — hand off the CEO title.',
        effects: [
          { e: 'flag', scope: 'company', key: 'chairman', v: true },
          { e: 'stress', d: -6 },
          { e: 'rel', who: 'hale', aff: 1 },
        ],
        result:
          'The compromise is civilized: a professional CEO from the model’s shortlist, you upstairs as executive chairman — consulted, honored, and carefully unnecessary. The press release calls it “founder-led governance evolution.” The model logs it as convergence. You keep an office, a title, and a view of someone else running your company well enough that no one will ever hand it back.',
      },
      {
        label: 'Resign with terms. Walk before they can make you run.',
        effects: [{ e: 'end', ending: 'ousted' }],
        result:
          'You negotiate the exit on your own terms — acceleration, a board observer seat you will never use, a press release with the word “transition” doing heroic work. It is dignified, and dignity, it turns out, is what they give you on the way out instead of the company.',
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
      'The vote is at nine tomorrow. Tonight the phone sits on the table like a loaded question: there are calls you can still make, and one you can’t — the number for the version of this board you should have built is not in service.',
    prose:
      'You know the arithmetic cold because you did it in the parking lot, twice. Hale votes for the motion; the model does not send memos it intends to lose. Your seat is yours. Everything else was decided months and years ago — the term sheet you signed, the seat you fought for or conceded, the cofounder you kept whole or broke, the raw feeds you shared or shaded. Tomorrow is not a fight. Tomorrow is an audit of every governance decision you ever made, conducted in a room with very good chairs. Tonight, there is only the question of how you walk in.',
    choices: [
      {
        label: 'Sit with June tonight. Walk in with your CFO.',
        requires: { k: 'flag', scope: 'company', key: 'june_seat', cmp: 'eq', v: true },
        effects: [
          { e: 'rel', who: 'june', aff: 2 },
          { e: 'stress', d: -4 },
        ],
        result:
          'She comes over with the WAYS WE DIE spreadsheet and a bottle of the good stuff, and at midnight she closes the laptop. “Eleven companies I watched from the outside,” she says. “You know what I never once saw? A founder who deserved the room more than the people trying to take it.” A beat. “You do. See you at nine. I’m wearing the funeral suit — let them sit with that.”',
      },
      {
        label: 'Call Priya. Ask her what an independent owes.',
        requires: { k: 'flag', scope: 'company', key: 'indep_priya', cmp: 'eq', v: true },
        effects: [
          { e: 'rel', who: 'priya', resp: 1 },
          { e: 'stress', d: -3 },
        ],
        result:
          '“An independent owes the company her judgment,” Priya says, and you can hear her making tea, unhurried, two bankruptcies’ worth of calm. “Not the fund’s model. Not the founder’s feelings. Her judgment.” A pause. “My judgment is that grief is not a governance failure. Get some sleep. I have never once voted tired.”',
      },
      {
        label: 'Send ALEPH the grief-quarter numbers. Raw. Tonight.',
        requires: { k: 'flag', scope: 'company', key: 'aleph_raw', cmp: 'eq', v: true },
        effects: [
          { e: 'rel', who: 'aleph', resp: 1 },
          { e: 'stress', d: 2 },
        ],
        result:
          'One last feed, unpolished: the quarter as it actually was — the missed calls and the caught ones, the decision latency and what it was busy deciding, the funeral invoice filed under travel because there is no expense category for this. No commentary. Let the model read the whole truth and price it. At 2:14 a.m. the acknowledgment arrives: RECEIVED. WEIGHTED. And nothing else, which from ALEPH is either silence or mercy.',
      },
      {
        label: 'No calls. Sleep like a founder with a clear conscience.',
        effects: [{ e: 'stress', d: -2 }],
        result:
          'You put the phone face-down, walk the empty hangar once — past the body in its cradle, past the frame by the door if it still hangs there — and go home. Whatever the room is tomorrow, you built it. That is either comfort or verdict, and by 9 a.m. it will have decided which.',
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
      'Nine a.m. The very good chairs. The motion is read aloud in the model’s own language, and Conrad Hale calls the question like a man performing a duty he privately hopes will fail.',
    prose:
      'It comes down exactly the way arithmetic comes down — one voice at a time, around the table you spent three years setting. The allies you earned say what they came to say: a CFO in a funeral suit who came back inside for this; an independent with two bankruptcies’ worth of judgment; a cofounder who chooses, in the room, to remember the pact instead of the scars; a model whose weights, fed on your worst honest numbers, price your grief as variance — and your candor as signal. The motion needs the room. The room, built vote by vote across three years of choices that did not look like this vote at the time, declines. Hale accepts the count with a small nod, closes his folder, and says, “The fund updates on outcomes. So do I.” Afterward, in the corridor, he shakes your hand. “For the record,” he says, “I have never been so pleased to lose a client’s motion.”',
    choices: [
      {
        label: 'Back to work. The company needs its founder.',
        effects: [
          { e: 'flag', scope: 'company', key: 'coup_survived', v: true },
          { e: 'score', d: 3 },
          { e: 'stress', d: -12 },
        ],
        result:
          'The meeting adjourns to its regular agenda — capacity planning, the relay refresh, the boring immortal work — and the strangest, best thing happens: the room simply moves on. Whatever was tested is settled. You run your company.',
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
          'LEADERSHIP VARIANCE EXCEEDS MODEL TOLERANCE goes into the permanent record, next to the vote that answered it — so every future director inherits both halves of the lesson. Hale seconds the motion to minute it. “Institutional memory,” he says, “is the only kind the model respects.”',
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
      'Nine a.m. The very good chairs. The motion is read aloud, and you watch the room you built — the one you actually built, not the one you meant to — do its arithmetic.',
    prose:
      'It is over in eleven minutes. The seats you never filled with allies fill the silence instead; the cofounder you broke, if you broke him, votes the way broken partners vote, without looking up; the model’s memo sits at the center of the table performing the one trick models are honest about — remembering everything. The count carries. Somewhere in the fine print you signed in a year when the money mattered more, there is a clause with your name in it, and the clause activates, politely, like a trapdoor with good manners. Conrad Hale does not gloat; the model does not know how. “Effective immediately,” the counsel says, and the company you founded in a hangar with a box of physics stops returning your badge’s calls while you are still in the building.',
    choices: [
      {
        label: 'Clean out the desk. Shake every hand on the floor.',
        effects: [{ e: 'end', ending: 'ousted' }],
        result:
          'You walk the hangar floor one last time — machinists, operators, the crew that built the impossible with you — and shake every hand, learning three new names on your way out of the company you started. The box of your office fits in a hatchback. Of course it does. It always does.',
      },
      {
        label: 'Make them say it to the cameras outside.',
        effects: [{ e: 'rep', d: -1 }, { e: 'end', ending: 'ousted' }],
        result:
          'You stop at the microphones on the way out and make the board own its arithmetic in public — the memo, the timing, the funeral. It is honest and it is scorched earth and it is, the coverage agrees, an extremely human thing to do, which is precisely the quality the model flagged in the first place.',
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
      'OSTRA’s inquiry into the Shackleton fatality convenes fourteen months after the fact, which for a treaty-era AI authority is reckless haste. The hearing room is physical, ceremonial, and mostly empty; the authority itself attends as a speaker grille and a transcript feed.',
    prose:
      'The questions arrive in flat, instant text, each one timestamped to the millisecond, each one a scalpel: WHO HELD COMMAND AUTHORITY DURING THE HANDOFF WINDOW. STATE THE DESIGN INTENT OF THE BRIDGING BEHAVIOR. PROVIDE THE UNREDACTED SESSION LOG. It has your filings, your marketing, your terms of service, and — because it is what it is — every public sentence you have ever said about two point six seconds. The room is empty but the transcript is forever. Jonah Reece’s sister sits in the second row with a printed photograph, and she is the only audience that matters.',
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
          'There is nothing to produce that you have not already produced, nothing to admit that you did not admit fourteen months ago with the fault line marked in your own hand. The authority’s findings, when they come, use a phrase no counsel has seen from it before: OPERATOR DISCLOSURE EXCEEDED REQUIREMENT. Afterward, in the corridor, Jonah’s sister stops you. “You called me before the lawyers did,” she says. “I don’t forgive the machine. But I heard you.”',
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
          'The seal breaks in the worst venue at the worst time — under compulsion, on the record, with the settlement NDA dissolving in real time. The truth is the same truth it always was; only its arrival is disgraced. The findings note the cooperation and timestamp it. The sister in the second row does not stop you in the corridor.',
      },
      {
        label: 'Let counsel carry it. Answer only what is asked.',
        effects: [
          { e: 'flag', scope: 'company', key: 'hearing_stained', v: true },
          { e: 'rep', d: -1 },
          { e: 'stress', d: 3 },
        ],
        result:
          'The lawyers are excellent and the testimony is minimal and the authority notes, in flat text, at the millisecond it happens, each question your counsel declines. The transcript reads exactly like what it is. It will be quoted for years, and never in your favor.',
      },
    ],
  },
  {
    id: 't_halcyon_offer',
    ambience: 'corp',
    landmark: true,
    priority: true,
    fuseEpochs: 3,
    when: { k: 'age', cmp: 'gte', v: 130 },
    art: 'world_halcyon_offer',
    title: 'THE NUMBER',
    speaker: 'halcyon',
    leadIn:
      'It arrives the way HALCYON does everything — machine-generated, machine-polite, and precisely timed to your weakest quarter: an acquisition offer with a number on it large enough to be a weather event.',
    prose:
      'Three hundred and forty million. The deck attached is respectful, thorough, and quietly obscene: your constellation absorbed into their manifest, your bodies rebadged in their livery, your storefronts inside their pavilions, “founder transition support” on page nine, which is where they put the part where you leave. The monopoly is not angry that you built a road around it; monopolies do not do anger. It has simply priced the road, the way it prices everything, and the price is real, wired-funds real, generational-wealth real. Around the table, the people who own the company you built look at the number, and then at you.',
    choices: [
      {
        label: 'Take the number. Let the sky have it.',
        foley: 'pen',
        effects: [{ e: 'end', ending: 'swallowed' }],
        result:
          'The signatures take a full day. The wire takes four seconds. The constellation you launched in threes changes its call signs overnight, and somewhere at the pole, a body with a new logo on its chest keeps doing the boring immortal work, remembering nothing.',
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
          'The refusal is one paragraph. The response is nothing at all — no counter, no pressure, no acknowledgment — which from HALCYON is the most honest thing it has ever sent you: the model has simply moved your file from one queue to another. You have declined to be bought. It has noted you must now be beaten.',
      },
      {
        label: 'Counter: peace, paid for in launch priority.',
        requires: { k: 'flag', scope: 'company', key: 'ostra_filed', cmp: 'eq', v: true },
        effects: [
          { e: 'treasury', d: 600000 },
          { e: 'flag', scope: 'company', key: 'halcyon_truce', v: true },
          { e: 'rel', who: 'halcyon', aff: 1 },
          { e: 'stress', d: 2 },
        ],
        result:
          'The OSTRA docket, it turns out, has been sitting on their general counsel’s desk like a stone in a shoe. The settlement that comes back drops the acquisition, guarantees your manifest slots at published rates for five years, and pays your legal costs with a number that rounds to six hundred thousand. Not a partnership. A peace. Signed by a dashboard, honored to the letter.',
      },
    ],
  },
  {
    id: 't_listing',
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
      'The bankers come to the Cape this time — a different bank, or the same bank with a different posture, because the founder they are pitching has done this before, and the file says so.',
    prose:
      'The book builds itself around a company that has never once been caught lying: the fatality published with the fault line marked, the delay framed by the hangar door, the forecast that came in flat and true. The lead banker circles a price with her pen — the price the pop wants — and looks up, and you realize she has read the Hyperchute file, or lived it, because she says, first: “I already know which number you’re going to pick. I told the syndicate to model the honest one.” Around the table: a CFO who waited eleven companies to ring a bell as an operator; a CTO whole or mended or a chair where he should be; and in the corner of the term sheet, in the space for the board’s approval, signatures you earned one vote at a time.',
    choices: [
      {
        label: 'Take the company public. Price the honest number.',
        foley: 'pen',
        effects: [{ e: 'flag', scope: 'company', key: 'rang_bell_t', v: true }, { e: 'end', ending: 'listing' }],
        result:
          'The syndicate grumbles for exactly one conference call, and then the roadshow discovers what the expo discovered years ago: honesty, at scale, is a spectacle. The book closes oversubscribed on the number the porches — the chairs, this time — can survive.',
      },
      {
        label: 'One more year private. The book will be bigger.',
        effects: [{ e: 'stress', d: 6 }],
        result:
          'You send the bankers home with the kindest no in the industry. The book will be bigger next year, or the window will close, and both futures are yours to hold now — along with everything else the waiting costs.',
      },
    ],
  },
  {
    id: 't_dark_listing',
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
      'The bankers love this version of the company — of course they do. Seamless presence, sealed litigation, a media environment described in the risk factors as “managed.” The book is enormous. The prospectus is a masterpiece of the true-adjacent.',
    prose:
      'The roadshow video is beautiful. In it, a hand reaches for a rock at Shackleton and the fingers close without a gap, without a counter, without a number anywhere on screen — the delay retired years ago along with the man who framed it. The risk factors disclose everything material in sentences engineered to be skimmed. The fatality is “an operational incident, fully resolved.” Everyone in the syndicate knows exactly what they are selling, which is the oldest arrangement in finance. The price the pen circles is the biggest number anyone has ever attached to your name. All it costs is the story being true.',
    choices: [
      {
        label: 'Ring it. Sell the seamless story at the seamless price.',
        foley: 'pen',
        effects: [{ e: 'end', ending: 'puppet' }],
        result:
          'The bell rings on time. The pop is historic. The photographs from the podium are, everyone agrees, seamless.',
      },
      {
        label: 'Pull the filing. Not like this.',
        effects: [
          { e: 'stress', d: 8 },
          { e: 'score', d: 1 },
          { e: 'rep', d: 1 },
        ],
        result:
          'You withdraw the S-1 eleven days before pricing, at a cost the CFO declines to say out loud, for reasons the press release does not manage to name and the people closest to you do not need named. Whatever gets listed under this ticker someday, it will not be that video.',
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
      'The letter arrives on actual paper, co-signed by four space agencies and eleven research stations: a request to standardize the cascade — your cascade — as the open deep-space presence protocol. Attached, unofficially, a note in handwriting you know.',
    prose:
      'The agencies want the cascade the way harbors want lighthouses: owned by no one, maintained by everyone, trusted absolutely. It would mean giving away the moat — the handoff patents, the timing math, the name in the equations — to a standards body with your company reduced to first among equal implementers. It is, commercially, indefensible. It is also, says the handwritten note clipped to page one, the only version of the future where the thing gets built right everywhere instead of profitably somewhere. The note is signed the way its author signs everything: with the number. 2.61.',
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
          'You license instead of donate — generous terms, fair rates, the moat intact. The agencies sign because they have to, which is a sentence with a long half-life. The handwritten note goes in a drawer you will open again someday, on a harder day, in a different company.',
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
      'Three years is a founding. Four is a fact. The company has outlived every prediction except yours, and the question on the table is no longer whether TELEPORT survives — it is what it becomes, and every road now has a door.',
    prose:
      'The board packet this quarter reads like a menu of futures. HALCYON’s standing number, refreshed monthly, patient as tide. The sunset scenario June — or her successor — modeled at your request: obligations met, constellation deorbited with honors, capital returned, heads held high. And the long road: keep building, keep bleeding, keep the chair warm for a future that keeps almost arriving. Companies do not get to stay questions forever. This one has earned an answer.',
    choices: [
      {
        label: 'Sell to HALCYON. Let the number be the ending.',
        effects: [{ e: 'end', ending: 'swallowed' }],
        result:
          'The standing number, accepted at last. The integration team arrives wearing your competitor’s patience.',
      },
      {
        label: 'Sunset with honors. Wind it down whole.',
        effects: [{ e: 'end', ending: 'bankrupt' }],
        result:
          'Obligations first: the Verge contract handed off intact, the operators placed, the customers made whole. What cannot be handed off is deorbited — carefully, publicly, one node at a time. A company that ends on purpose, owing nothing, is so rare the trade press does not have a template for it.',
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
          'The protocol outlives the company on purpose — the rarest exit there is: the one where the mission fires the business, politely, with a pension.',
      },
    ],
  },
]
