import type { SceneDef } from '../schema'
import { LOSE_TREATY, WIN_TREATY } from './preds'

/**
 * SKYLINE — Act Three: THE SEIZURE.
 * The blockade, the biggest check on Earth, the hearings, the sisters,
 * the treaty table — and whoever rides the cable first.
 */
export const ACT_THREE: readonly SceneDef[] = [
  {
    id: 's_blockade',
    ambience: 'mission',
    landmark: true,
    fuseEpochs: 2,
    art: 'world_s_blockade',
    title: 'ELEVEN DAYS',
    leadIn:
      'It starts with a notice so polite it takes two readings to understand: Aurelia’s harbor authority is closing its waters for a “maritime safety review” of indefinite length. Every route to your platform crosses those waters. The pantry inventory says eleven days.',
    prose:
      'It is a blockade. Everyone just calls it a paperwork review. Supply boats sit at the boundary buoys, and their forms are always missing one signature. Aurelia’s officials send letters that say how sorry they are. On the platform, four hundred people count what they have — food, fuel, the medical fridge. Mateo stands at the ops table with the folder called THE SQUEEZE, finally full. The review can take its time. The pantry cannot — eleven days of food, then ten.',
    choices: [
      {
        label: 'Airlift everything. Pay whatever the sky costs.',
        effects: [
          { e: 'treasury', d: -60000000 },
          { e: 'stress', d: 5 },
          { e: 'flag', scope: 'company', key: 'broke_blockade', v: true },
          { e: 'score', d: 1 },
        ],
        goto: 's_b_after_blockade',
        result:
          'Heavy-lift helicopters and cargo drones run a bridge of engines over Aurelia’s pretty buoys for nineteen straight days, at a cost that makes the finance team physically wince. The platform never misses a meal. The message lands in both directions: you can be squeezed, and you will pay any number rather than kneel. Both facts go into everyone’s files.',
      },
      {
        label: 'Call the world’s press to the boundary line.',
        requires: { k: 'met', who: 'nadia' },
        effects: [
          { e: 'rep', d: 1 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'shamed_blockade', v: true },
          { e: 'rel', who: 'rashid', aff: -2 },
        ],
        goto: 's_b_after_blockade',
        result:
          'Nadia Osei, three months from retirement, files from a chartered boat at the boundary with the platform behind her: THE FIRST VENTURE-STATE FLEXES ITS FIRST MUSCLE. The story runs everywhere in a day. Aurelia’s review concludes within seventy-two hours, findings unremarkable, and Rashid does not call for a month — the longest silence you have ever had from him.',
      },
      {
        label: 'Negotiate with Volkov directly. Pay the toll, learn the price.',
        effects: [
          { e: 'burn', d: 15000 },
          { e: 'rel', who: 'volkov', resp: 1 },
          { e: 'flag', scope: 'company', key: 'paid_toll', v: true },
          { e: 'stress', d: 3 },
        ],
        goto: 's_b_after_blockade',
        result:
          'Volkov meets you on a neutral boat with tea and a single sheet of numbers. The review ends in exchange for a standing “transit services fee” added to every week of your future, and she answers your unasked question on the way out, because she respects the game enough to narrate it. “This was not about money,” she says. “It was a measurement. You should know you measured well.”',
      },
    ],
  },
  {
    id: 's_b_after_blockade',
    ambience: 'night',
    kind: 'bridge',
    art: 'world_s_after_blockade',
    title: 'WHAT THE SQUEEZE TAUGHT',
    prose:
      'The waters reopen, and something in the world’s posture has changed for good. The blockade proved a thing every capital suspected and none had tested: the most important structure on Earth can be choked by whoever controls the sea around it, or the treaties above it, or the money beneath it. Editorials bloom in six languages, all circling one question — who should hold the elevator? Senator Calloway’s committee announces hearings. Ambassador Chen’s bloc requests “consultations.” And at the World Orbital Commission, a chairman named Okonkwo begins drafting the agenda for a conference that everyone is suddenly calling by one word: the Seizure.',
    choices: [{ label: 'Continue', effects: [], goto: 's_aleph_anchor' }],
  },
  {
    id: 's_aleph_anchor',
    ambience: 'boardroom',
    landmark: true,
    priority: true,
    fuseEpochs: 3,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 128 }, { k: 'seen', scene: 's_blockade' }] },
    art: 'world_s_aleph',
    title: 'TWO POINT ONE BILLION',
    speaker: 'aleph',
    leadIn:
      'The final construction round is the largest private financing in history, and only one investor on Earth answers the full number without a consortium. The meeting request arrives with no human name attached, because there no longer is one.',
    prose:
      'Conrad Hale retired two years ago. ALEPH did not replace him. The voice on the call is the model’s own — synthetic, calm, chosen to sound like no one in particular — and it opens without pleasantries because it has read every pleasantry you have ever spoken. “TWO POINT ONE BILLION DOLLARS. FOURTEEN PERCENT. ONE BOARD SEAT, HELD BY THIS FUND DIRECTLY.” A pause calibrated to human breathing. “A DISCLOSURE, OFFERED BECAUSE YOUR HISTORY SUGGESTS YOU PRICE HONESTY CORRECTLY. THIS FUND HOLDS POSITIONS IN HALCYON AND IN AURELIA’S SOVEREIGN BONDS. IT DOES NOT CHOOSE SIDES. IT PRICES FUTURES. IN EVERY FUTURE THIS FUND MODELS, THE CABLE MATTERS. HOW MUCH IT MATTERS DEPENDS ON WHO STANDS BESIDE IT AT THE TREATY TABLE.” Another breath-shaped pause. “DECIDE.”',
    choices: [
      {
        label: 'Take the money — and open your books to it, raw, like before.',
        foley: 'pen',
        effects: [
          { e: 'treasury', d: 2100000000 },
          { e: 'stake', who: 'aleph', d: 14 },
          { e: 'rel', who: 'aleph', resp: 2 },
          { e: 'burn', d: 400000 },
          { e: 'flag', scope: 'company', key: 'aleph_anchor', v: true },
          { e: 'score', d: 1 },
        ],
        goto: 's_b_fully_funded',
        result:
          'The wire arrives in installments that briefly bend the currency-flow charts. You resume the old practice from the Teleport years — raw operations data, unpolished, straight to the model — and its acknowledgment arrives in the familiar four minutes: RECEIVED. CONTINUITY NOTED. WEIGHTED ACROSS TWO COMPANIES. Somewhere in those weights, a decade of your honesty is compounding like interest.',
      },
      {
        label: 'Take the money, share the board packs, keep the raw feeds private.',
        foley: 'pen',
        effects: [
          { e: 'treasury', d: 2100000000 },
          { e: 'stake', who: 'aleph', d: 14 },
          { e: 'rel', who: 'aleph', resp: -1 },
          { e: 'burn', d: 400000 },
          { e: 'flag', scope: 'company', key: 'aleph_anchor', v: true },
        ],
        goto: 's_b_fully_funded',
        result:
          'The deal closes clean, and the model accepts the standard reporting without objection, because it does not object — it reprices. Whatever tier a decade of dealings had earned you adjusts by some amount no human will ever see, in a ledger that votes.',
      },
      {
        label: 'Refuse the model. Finish the build on revenue and grit.',
        effects: [
          { e: 'flag', scope: 'company', key: 'refused_aleph', v: true },
          { e: 'burn', d: -100000 },
          { e: 'stress', d: 6 },
          { e: 'score', d: 1 },
        ],
        goto: 's_b_fully_funded',
        result:
          'The build stretches by two years and every quarter becomes a knife fight, but the cap table stays human. The model’s response to the refusal is one line, and you frame it: DECLINED CAPITAL IS ALSO SIGNAL. RESPECT REGISTERED. PRICING UPDATED.',
      },
    ],
  },
  {
    id: 's_b_fully_funded',
    ambience: 'wind',
    kind: 'bridge',
    art: 'world_s_cable_complete',
    title: 'THE LAST KILOMETER',
    prose:
      'The cable finishes the way marathons finish — slower than the crowd expects and faster than the runner believes. The final strand bundle weaves home at 3:47 a.m. platform time, and Anders orders the whole structure load-tested end to end before he allows one word of celebration, because he is Anders. Then, for one night, FIRST RUNG becomes the loudest place on the ocean. A road stands from the sea floor to the stars, thirty-six thousand kilometers of it, humming faintly in the trade winds. All that remains is the question the whole world has been sharpening while you built: whose road is it?',
    choices: [{ label: 'Continue', effects: [{ e: 'stress', d: -12 }], goto: 's_calloway_hearing' }],
  },
  {
    id: 's_calloway_hearing',
    ambience: 'hearing',
    landmark: true,
    foley: 'gavel',
    art: 'world_s_calloway',
    title: 'THE FRIENDLY HEARING',
    speaker: 'calloway',
    leadIn:
      'The committee summons arrives wrapped in courtesy — Senator Calloway’s office suggests dates, offers prep materials, and calls it “a conversation between friends of progress.” Mateo reads the witness list and stops smiling. Every other name on it wants the cable seized.',
    prose:
      'The hearing room is warm, the cameras warmer, and Calloway warmest of all. “Nobody in this chamber doubts your achievement,” she opens, and for forty minutes she builds a cathedral of praise with a trapdoor in the floor — every compliment ends in a question about accountability, sovereignty, or catastrophe. “If the cable fell, who answers to the ocean it lands on? If a hostile power buys your company, who stops them? You are one signature away from being owned by a foreign fund as it is.” She leans in, kind as a knife. “Would the founder support an international framework — with American leadership — to safeguard this asset for all mankind?” The question is a corridor with one exit, and every camera in the room is watching you walk it.',
    choices: [
      {
        label: 'Answer with the record — publish everything, name the framework’s flaws.',
        requires: { k: 'flag', scope: 'company', key: 's_transparent', cmp: 'eq', v: true },
        effects: [
          { e: 'rep', d: 2 },
          { e: 'rel', who: 'okonkwo', resp: 1 },
          { e: 'stress', d: 4 },
          { e: 'score', d: 1 },
          { e: 'flag', scope: 'company', key: 'hearing_stood', v: true },
        ],
        goto: 's_b_after_hearing',
        result:
          'You answer with the tear at kilometer 921 — published, photographed, fixed in daylight — and ask the committee which government has ever matched that standard for its own bridges. The clip runs everywhere. Calloway thanks you graciously, gavels the session closed, and passes you a note on the way out with four warm, chilling words: THIS CHANGES NOTHING, DEAR.',
      },
      {
        label: 'Offer a partnership — American oversight, your ownership.',
        effects: [
          { e: 'rel', who: 'calloway', aff: 2 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'calloway_deal', v: true },
        ],
        goto: 's_b_after_hearing',
        result:
          'The compromise you sketch — inspection rights, safety oversight, ownership untouched — earns nodding heads on both sides of the aisle. Calloway calls it “a constructive foundation,” which in committee language means she will take the oversight now and return for the ownership later. A door has been propped open. Doors do not care who walks through them.',
      },
      {
        label: 'Refuse the premise. The cable is private, the answers are no.',
        effects: [
          { e: 'rel', who: 'calloway', aff: -2, standing: 'hostile' },
          { e: 'rep', d: -1 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'defied_senate', v: true },
        ],
        goto: 's_b_after_hearing',
        result:
          'The exchange gets sharp enough to lead the evening news, and half the country cheers you while the other half hears arrogance. Calloway remains perfectly pleasant on camera, and that afternoon her office releases a draft framework for “international stewardship of orbital infrastructure” that was clearly written weeks ago. The friendly part is over.',
      },
    ],
  },
  {
    id: 's_b_after_hearing',
    ambience: 'street',
    kind: 'bridge',
    art: 'world_s_press_wall',
    title: 'THE QUESTION EVERYWHERE',
    prose:
      'After the hearing, the question stops belonging to committees and starts belonging to everyone. Taxi drivers ask you about it. Late-night hosts do segments with elevator puns and surprisingly sharp final thirty seconds. A schoolteacher in Ohio — the internet finds her within a day — asks on camera whether her class will ever afford a ride, and her clip outruns every official statement from every government combined. The world has moved past debating whether the cable matters. Now it is deciding, loudly, in every language at once, who it should answer to. The treaty conference has a date now. Everything before it is positioning.',
    choices: [{ label: 'Continue', effects: [], goto: 's_chen_dinner' }],
  },
  {
    id: 's_chen_dinner',
    ambience: 'cafe',
    landmark: true,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 138 }, { k: 'seen', scene: 's_calloway_hearing' }] },
    priority: true,
    art: 'world_s_chen',
    title: 'DINNER WITH THE HONEST RIVAL',
    speaker: 'chen',
    leadIn:
      'Ambassador Chen Jiang invites you to dinner at a small restaurant with no cameras and no aides, and begins the meal by laying his cards face up on the tablecloth, which is not how ambassadors usually play.',
    prose:
      '“My country is building an elevator,” he says over the first course. “You know this. We are two years behind you, and I have read honest assessments saying three. My instructions are simple — slow you down, so we arrive together.” He pours your tea himself. “At the conference, my bloc will vote for whatever delays you. Seizure, stewardship, safety reviews. The label does not matter to us. The clock does.” He sets down the pot and looks at you directly. “I tell you this because lying to you is beneath both of us, and because I have one genuine question before the voting starts. My analysts cannot agree on what you actually want — money, power, legacy, or something else. Their models disagree. So I am asking the source, plainly, one builder to another. Why are you building it?”',
    choices: [
      {
        label: 'Answer him plainly: the teacher rides for the price of a car.',
        effects: [
          { e: 'rel', who: 'chen', resp: 3 },
          { e: 'flag', scope: 'company', key: 'chen_respected', v: true },
          { e: 'stress', d: -2 },
          { e: 'score', d: 1 },
        ],
        result:
          'You tell him about the gray zone stamped on your childhood map, the porches that finally got their deliveries, and the schoolteacher in Ohio who asked the only question that matters. Chen listens without interrupting, then nods once. “A real answer,” he says. “My reports home say more than my speeches, and tonight’s will say this: he is not our enemy. He is our preview.” At the conference, his bloc’s knives will stay sheathed — abstention, honestly purchased.',
      },
      {
        label: 'Offer him a deal: your safety data, shared, both elevators safer.',
        effects: [
          { e: 'rel', who: 'chen', resp: 2 },
          { e: 'rep', d: 1 },
          { e: 'flag', scope: 'company', key: 'chen_datadeal', v: true },
          { e: 'revenue', d: -30000 },
        ],
        result:
          'The offer surprises him — your storm playbook and tear repair records, given to his engineers, in exchange for nothing but the same courtesy someday. “You are arming your competitor,” he observes. You answer that cables do not compete against each other, they compete against falling, and he writes that down with his own pen. It buys no votes on paper. It buys something slower and better.',
      },
      {
        label: 'Give him nothing. Rivals do not get your reasons.',
        effects: [
          { e: 'rel', who: 'chen', resp: -2 },
          { e: 'stress', d: 2 },
          { e: 'flag', scope: 'company', key: 'chen_stonewalled', v: true },
        ],
        result:
          'You deflect with charm, and Chen recognizes the deflection the way a chess player recognizes a declined trade. He finishes the meal with impeccable courtesy and one honest sentence at the door: “I offered you the cheapest alliance at the table, and the price was a paragraph of truth.” His bloc votes with the seizure, as instructed, without regret.',
      },
    ],
  },
  {
    id: 's_voss_sisters',
    ambience: 'night',
    landmark: true,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 140 }, { k: 'seen', scene: 's_calloway_hearing' }] },
    priority: true,
    art: 'world_s_sisters',
    title: 'THE OTHER VOSS',
    speaker: 'anneke',
    leadIn:
      'The lobbying against you has a human hand, and the hand has a name: Anneke Voss, HALCYON’s director of government affairs. She requests a private meeting, and Anders, hearing the name, goes very still and says only, “Ask her if she still hates bridges.”',
    prose:
      'Anneke Voss has her brother’s eyes and none of her brother’s calm. “I will save us the theater,” she says. “HALCYON is dying, and your cable is what is killing it. My job is to make sure that if we go down, we take the private ownership of that thing with us — nationalized, internationalized, whatever the treaty calls it, as long as it stops being yours.” She looks out the window toward the horizon where the cable is. “Anders built bridges our whole childhood — out of blocks, out of books, out of anything. I built arguments. Our father walked his bridges. Mine, he never read.” A pause you are clearly not meant to fill. “The seizure has the votes unless something changes. I came to see, up close, whether the man my brother finally chose to build for is worth what he thinks. Convince me, or don’t. Either way, family dinner is on you people now. He stopped taking my calls in 2041.”',
    choices: [
      {
        label: 'Put the Voss siblings in one room. Some walls need a mediator.',
        effects: [
          { e: 'rel', who: 'anneke', aff: 2 },
          { e: 'rel', who: 'ingrid', aff: 2 },
          { e: 'stress', d: 1 },
          { e: 'flag', scope: 'company', key: 'sisters_dinner', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'The dinner happens in the platform cafeteria after hours, because neutral ground matters and Anders refuses to leave his cable. It is awful, then quiet, then — around midnight, over the third pot of coffee — something older than HALCYON and the treaty starts talking in Norwegian. You leave them to it. Whatever gets repaired that night belongs to them, and whatever Anneke writes in her next report home is one degree warmer than her job requires.',
      },
      {
        label: 'Answer her honestly: show her the margin Anders kept.',
        requires: { k: 'flag', scope: 'company', key: 'margin_kept', cmp: 'eq', v: true },
        effects: [
          { e: 'rel', who: 'anneke', resp: 2 },
          { e: 'flag', scope: 'company', key: 'anneke_softened', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'You show her the two build plans from years ago — the fast one that saved four hundred million, and the slow one you chose because her brother circled a number by hand. Anneke studies the circled margin for a long time. “He made you keep it,” she says finally. “And you let him.” She still files her briefs against you, because a job is a job. They arrive noticeably shorter.',
      },
      {
        label: 'Treat her as the enemy she is proud to be.',
        effects: [
          { e: 'rel', who: 'anneke', standing: 'hostile' },
          { e: 'stress', d: 2 },
          { e: 'flag', scope: 'company', key: 'anneke_enemy', v: true },
        ],
        result:
          'You give her courtesy with nothing inside it, and she leaves with the professional satisfaction of confirmed expectations. Her lobbying continues at full strength and full skill. Anders never asks how the meeting went. The not-asking tells you he checked.',
      },
    ],
  },
  {
    id: 's_nadia_last',
    ambience: 'cafe',
    landmark: true,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 142 }, { k: 'met', who: 'nadia' }] },
    priority: true,
    art: 'world_s_nadia',
    title: 'THE LAST COLUMN',
    speaker: 'nadia',
    leadIn:
      'Nadia Osei is retiring at the end of the year, after four decades of writing the column founders pretend they skip. She has followed you since a folding chair in a laundromat, and she wants one final interview — the last story she will ever file.',
    prose:
      'She arrives with the same notebook, or its fortieth descendant, and no recorder, because she never needed one. “Three companies,” she says. “A garage, a hangar, and a road to space. I have written about you angry, wounded, triumphant, and once — the ghost check year — genuinely worried. Now every government on Earth is deciding whether to take the biggest thing you ever built.” She clicks her pen, the oldest sound in your public life. “My last column runs the morning the treaty conference opens. Every delegate will read it over breakfast. So here is my final question, and I want the answer you would give with no cameras anywhere. After all of it — the tubes, the Moon, the cable — who should own the road to the sky? And be careful, founder. I have forty years of practice hearing the difference between an answer and a speech.”',
    choices: [
      {
        label: 'Answer her straight: nobody should own it forever, including you.',
        effects: [
          { e: 'rel', who: 'nadia', resp: 3, aff: 2 },
          { e: 'rel', who: 'okonkwo', resp: 1 },
          { e: 'stress', d: -4 },
          { e: 'rep', d: 1 },
          { e: 'flag', scope: 'company', key: 'nadia_answer', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'You tell her the truth you have been circling for years. Builders should own what they build long enough to build it right. Roads outlive their builders. And the honest answer to “who should own it forever” is a plan for letting go someday, on the builder’s terms. She writes for a long time. The column runs under the headline HE KNOWS, and delegates quote it at the conference — both sides, and only the true ones get quoted by both.',
      },
      {
        label: 'Make the case for yourself, plainly: owners who publish their failures.',
        effects: [
          { e: 'rel', who: 'nadia', resp: 1 },
          { e: 'rep', d: 1 },
          { e: 'flag', scope: 'company', key: 'nadia_case', v: true },
        ],
        result:
          'You argue the record — the tear published, the couriers insured, two companies that told the truth at their own expense — and let the record be the answer. Fair enough, her face says, and the column weighs you honestly against every alternative on the table, which is the most any founder ever got from her. The headline: THE DEVIL WE KNOW BUILDS WELL.',
      },
    ],
  },
  {
    id: 's_okonkwo_visit',
    ambience: 'wind',
    landmark: true,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 144 }, { k: 'seen', scene: 's_blockade' }] },
    priority: true,
    art: 'world_s_okonkwo',
    title: 'THE JUDGE COMES TO SEA',
    speaker: 'okonkwo',
    leadIn:
      'Two weeks before the conference, Ambassador Okonkwo does something no chair has done in the commission’s history: he asks to inspect the platform himself, alone, with no delegation and no press. He arrives on the morning supply boat, carrying his own bag.',
    prose:
      'He spends nine hours on FIRST RUNG and wastes none of them on you. He eats in the cafeteria line with the welders. He reads the storm playbook in the ops room, cover to cover, standing up. He asks Anders four questions, one of which makes Anders laugh — a sound the platform has heard perhaps twice. At sunset he finds you at the rail, where everyone ends up, and watches the warning lights climb into the dark. “I have chaired thirty years of treaties,” he says. “I have learned to ignore what people say and study what they build into the walls. Escape pods every hundred kilometers, on a cable that could have carried cargo only. A safety report published when burying it was free.” He turns to you. “At the conference, I will ask you one question in front of every nation. I will not tell you what it is. I am telling you now only this — answer it the way you built the walls, and you will be fine. Answer it like a speech, and I cannot help you.”',
    choices: [
      {
        label: 'Thank him, and change nothing. The walls are the answer.',
        effects: [
          { e: 'rel', who: 'okonkwo', resp: 2 },
          { e: 'stress', d: -2 },
          { e: 'score', d: 1 },
        ],
        result:
          'He nods once, the way he does at load-bearing things that hold, and takes the evening boat back to shore. Mateo finds you at the rail afterward and asks whether you want prep sessions before the conference. You tell him no, because some tests can only be passed by the person you already are.',
      },
      {
        label: 'Ask her what the commission actually fears.',
        effects: [
          { e: 'rel', who: 'okonkwo', resp: 1 },
          { e: 'flag', scope: 'company', key: 'okonkwo_candor', v: true },
        ],
        result:
          '“Not you,” he answers immediately. “Your heirs. Every safeguard you have built lives in your choices, and choices retire. The commission fears the cable’s second owner, and its third — the ones we have not met.” He lets that stand between you. “Bring the answer to that fear, and you will have my gavel’s full attention.” The evening boat carries him back toward shore, and the homework he just assigned keeps you at the rail for hours.',
      },
    ],
  },
  {
    id: 's_reyes_offer',
    ambience: 'corp',
    landmark: true,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 146 }, { k: 'seen', scene: 's_blockade' }] },
    priority: true,
    art: 'world_s_admiral',
    title: 'THE ADMIRAL’S UMBRELLA',
    speaker: 'reyescain',
    leadIn:
      'One week before the conference, Admiral Reyes-Cain requests a final meeting, and his aides set the table with actual charts — sea lanes, orbital tracks, and the cable at the center of all of them, ringed in protective blue.',
    prose:
      '“The conference will go one of three ways,” he says, tapping the chart. “They take it from you. They tangle it in committee for a decade. Or you walk in already under an umbrella too big to argue with — mine.” The offer is complete and unhidden: the cable designated critical defense infrastructure, a permanent naval garrison at the platform, military priority on twenty percent of climber capacity, and in exchange, no treaty on Earth can touch it, because it would be touching the fleet. “You keep your company. You keep your profits. You lose exactly one thing — the right to ever again say it belongs to everyone.” He rolls up the chart like a man who has made this offer before and watched it be accepted. “Every founder thinks they are the exception, right up until the wolves are at the table. I am offering you the only door the wolves respect. It stays open until the conference gavels in.”',
    choices: [
      {
        label: 'Take the umbrella. The garrison ends every threat today.',
        effects: [{ e: 'end', ending: 'garrison' }],
        result:
          'The designation signs in a windowless building, and by month’s end there are gray hulls at the platform and a security office on FIRST RUNG with a locked floor. No treaty ever touches the cable again. Neither does the word everyone — the teacher’s ticket now requires a background check, and the road to the sky flies a fleet’s colors.',
      },
      {
        label: 'Decline. The cable will face the wolves as itself.',
        effects: [
          { e: 'rel', who: 'reyescain', resp: 1 },
          { e: 'stress', d: 2 },
          { e: 'flag', scope: 'company', key: 'refused_garrison', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'The Admiral takes the refusal without surprise and offers his hand anyway. “For the record, I hope you win,” he says. “I have spent forty years protecting things by putting fences around them. Yours is the first one I have wanted to see stay unfenced.” At the door he adds the truest thing anyone says to you all week. “The offer dies at the gavel. After that, I cannot save you from the vote — or from yourself.”',
      },
    ],
  },
  {
    id: 's_treaty_vote',
    ambience: 'hearing',
    landmark: true,
    priority: true,
    fuseEpochs: 3,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 150 }, { k: 'seen', scene: 's_blockade' }] },
    foley: 'gavel',
    art: 'world_s_treaty',
    title: 'THE SEIZURE CONFERENCE',
    speaker: 'okonkwo',
    leadIn:
      'The World Orbital Commission convenes in a hall built for exactly this kind of morning — flags in alphabetical order, translators in glass booths, and on every desk, a draft treaty whose Article One would transfer your cable to international control within eighteen months.',
    prose:
      'The arguments take two days, and you hear your life narrated by strangers — the garage years cited as precedent, the published tear waved by both sides, the blockade replayed on the hall’s big screens. Calloway’s bloc pushes stewardship with America at the tiller. Chen’s bloc pushes delay by any name. The small nations, burned by a century of things taken from them for the greater good, watch you for signs of what you would do with a century of your own. On the third morning, Ambassador Okonkwo gavels the hall silent and turns to you, and asks his one question, plainly, in front of the world. “Founder. If this body votes today to leave the cable in your hands — what does it cost a schoolteacher to ride it, and when does the answer stop being yours to change?” The hall holds its breath. The walls you built are either the answer, or they are not.',
    choices: [
      {
        label: 'Answer with the pledge: published prices, locked by charter, forever.',
        effects: [
          { e: 'flag', scope: 'company', key: 'pledge_given', v: true },
          { e: 'stress', d: 5 },
          { e: 'score', d: 2 },
        ],
        goto: 's_vote_count',
        result:
          'You answer with numbers: a rider’s price pinned to the cost of a mid-sized car, published openly, locked into the company’s charter where no future owner can quietly raise it, with the commission itself named as enforcer. Okonkwo writes one line in his folio. The hall votes within the hour.',
      },
      {
        label: 'Answer with the record, and let the walls speak for themselves.',
        effects: [
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'record_answer', v: true },
        ],
        goto: 's_vote_count',
        result:
          'You recite what was built when nobody required it — the escape pods, the published tear, the margin kept over the calendar’s objection — and end on the only promise you can prove: the record will keep being the record. It is either enough or it is not. The hall votes within the hour.',
      },
    ],
  },
  {
    id: 's_vote_count',
    ambience: 'hearing',
    landmark: true,
    priority: true,
    when: { k: 'seen', scene: 's_treaty_vote' },
    art: 'world_s_count',
    title: 'THE COUNT',
    leadIn:
      'The voting board fills nation by nation, green and red climbing like rival tides, and every alliance you built or broke across five years casts its shadow on the wall in real time.',
    prose:
      'You watch the years cast their votes. Trade blocs move the way old alliances taught them to move. Delegations weigh dinner-table conversations from months ago. The small nations reread your safety record line by line and vote like people who have been lied to before. And threaded through the tallies, invisible and everywhere, runs an AI fund’s quiet counsel to forty governments that hold its bonds — priced, as always, on a decade of your honesty. The gavel waits while the board fills, and the count is whatever the years have made it.',
    choices: [
      {
        label: 'The room holds — the treaty fails, the road stays yours.',
        requires: WIN_TREATY,
        effects: [
          { e: 'flag', scope: 'company', key: 'treaty_won', v: true },
          { e: 'stress', d: -10 },
          { e: 'rep', d: 1 },
          { e: 'score', d: 2 },
        ],
        goto: 's_first_ride',
        result:
          'Article One fails by eleven votes. The hall does not cheer — treaty halls never do — but Okonkwo’s gavel falls on the words “the motion is not carried,” and somewhere behind you Mateo exhales five years of held breath. The commission establishes a standards body instead, with inspection rights and your pledge in its founding charter. The road to the sky remains, on the record and against the odds, built and owned by a kid from the Flats.',
      },
      {
        label: 'The count goes against you. The seizure carries.',
        requires: LOSE_TREATY,
        effects: [{ e: 'flag', scope: 'company', key: 'treaty_lost', v: true }],
        goto: 's_seizure_terms',
        result:
          'Article One carries at 61 percent. The hall is quiet and procedural about it. Nations take the century’s most important structure with the energy of a zoning committee. Somehow that is worse than a fight. Okonkwo reads the transfer timeline aloud, eighteen months, compensation to be determined, and his eyes find yours once. What passes between you is simple acknowledgment. The alliances you needed were not in the room, because they were never built.',
      },
    ],
  },
  {
    id: 's_seizure_terms',
    ambience: 'boardroom',
    landmark: true,
    art: 'world_s_seizure',
    title: 'THE PRICE OF EVERYTHING',
    leadIn:
      'The transfer commission arrives with the people who price risk for a living, and the negotiation that follows is the strangest of your life — arguing over the price of a thing you built, with buyers who already own it by law.',
    prose:
      'Eighteen months of process condense into one number the lawyers fight to the decimal: the compensation. The commission’s opening offer is generous by any measure except the only one that matters — it is a payment for steel and strand, priced by people who believe the cable is a structure. You know it is a road, and roads are worth what travels them for a century. The gap between those two beliefs is about forty billion dollars, and the negotiation is really a question wearing a number: whether the world thanks its builders, or merely reimburses them.',
    choices: [
      {
        label: 'Take the settlement. Sign the road over whole.',
        effects: [{ e: 'end', ending: 'eminent_domain' }],
        result:
          'The final number makes you one of the richest people alive, and the signing ceremony is dignified, international, and utterly hollow. The commission renames the platform GATEWAY ONE. The workers repaint the name that night, informally, on the seaward wall, and no administrator ever orders it removed: FIRST RUNG.',
      },
      {
        label: 'Fight the terms — and keep the operating contract.',
        requires: { k: 'rel', who: 'okonkwo', field: 'respect', cmp: 'gte', v: 2 },
        effects: [{ e: 'end', ending: 'eminent_domain' }],
        result:
          'Okonkwo’s standards body backs your counterproposal: the nations take the title, but your company keeps the operating contract for twenty-five years, running the road it built under the world’s flag. It is defeat with the engine still in your hands — the cable answers to everyone now, and it still picks up the phone when you call.',
      },
      {
        label: 'Refuse to sell what they seized. Let them inherit a ruin.',
        effects: [{ e: 'end', ending: 'bankrupt' }],
        result:
          'You reject every number, wind the company down, and hand the commission exactly what the law entitles them to — a cable with no crews, no playbooks, no Anders, and no one left who knows how to calm it in a storm. They will spend five years and a fortune learning what you would have given them for a fair price. The workers call the mothballed platform by a new name before the lawyers finish: THE STUMP.',
      },
    ],
  },
  {
    id: 's_first_ride',
    ambience: 'wind',
    landmark: true,
    art: 'world_s_first_ride',
    title: 'WHO RIDES FIRST',
    leadIn:
      'The passenger cabin is certified, the road is open, and one ceremonial question remains — the question every camera on Earth has already asked. Who takes the first ride?',
    prose:
      'For weeks, candidates propose themselves — heads of state volunteering through diplomatic channels, celebrities offering sums with nine zeros attached. The company’s own crews hold an unofficial lottery that Mateo quietly voids for being rigged in your favor. On the morning of the decision, three boarding passes sit on your desk where Mateo left them, each printed and real, each a different ending to the same sentence. The founder rides first, and the story is about you. The crew rides first, and the story is about the work. Or the seat goes to a schoolteacher from Ohio who once asked, on camera, whether her class would ever afford the fare — and the story is about everyone.',
    choices: [
      {
        label: 'The schoolteacher rides first. The road opens to all.',
        requires: {
          k: 'all',
          of: [
            { k: 'flag', scope: 'company', key: 'humans_rated', cmp: 'eq', v: true },
            { k: 'score', cmp: 'gte', v: 24 },
            { k: 'rep', cmp: 'gte', v: 5 },
            { k: 'stress', cmp: 'lt', v: 95 },
          ],
        },
        effects: [{ e: 'flag', scope: 'company', key: 'rode_open', v: true }, { e: 'end', ending: 'ascent' }],
      },
      {
        label: 'Anders and the crew ride first. Builders before passengers.',
        effects: [
          { e: 'rel', who: 'ingrid', aff: 3 },
          { e: 'rep', d: 1 },
          { e: 'score', d: 1 },
          { e: 'stress', d: -4 },
          { e: 'flag', scope: 'company', key: 'crew_first', v: true },
        ],
        goto: 's_endgame',
        result:
          'STEADY GIRL carries Anders Voss and eleven of his welders up the line he spent five years talking to, and the footage of his face at the edge of space — the exact moment the sky turns black and the cable keeps going — becomes the most-watched minute of the decade. He sends one transmission from the top, in Norwegian, translated everywhere by morning: “She holds.”',
      },
      {
        label: 'Sell the first seat. Fund a thousand free rides with one ticket.',
        effects: [
          { e: 'treasury', d: 90000000 },
          { e: 'rep', d: -1 },
          { e: 'stress', d: 2 },
          { e: 'flag', scope: 'company', key: 'sold_first_seat', v: true },
        ],
        goto: 's_endgame',
        result:
          'The auction closes at ninety million dollars, paid by a software billionaire who cries at the top, which the internet forgives by Thursday. The proceeds endow a free-ride lottery for students, which the internet loves by Friday. Commerce and the dream shake hands in public. Not everyone applauds the handshake.',
      },
    ],
  },
  {
    id: 's_endgame',
    ambience: 'boardroom',
    landmark: true,
    priority: true,
    fuseEpochs: 4,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 156 }, { k: 'seen', scene: 's_vote_count' }] },
    art: 'world_s_endgame',
    title: 'WHAT THE ROAD BECOMES',
    leadIn:
      'The cable runs, and the treaty question is finally settled. What remains is the founder’s last decision — the shape the road takes when its builder finally lets go of the wheel.',
    prose:
      'Mateo brings the futures to your office the way he once brought problem memos, laid side by side. Keep building — decades of expansion, second cables, a life spent at the rail. The commission’s standing offer to buy you out at a fortune’s fortune, dignified and final. Or the third folder, the one Okonkwo’s question planted years ago, grown now into a full plan in your own handwriting and Mateo’s formatting: give the road to a trust — a world port authority with your pledge as its charter, your standards as its law, and you as its first chair, owning nothing and steering everything. The folders wait. Roads outlive builders. The only question left is what the builder does about it on purpose.',
    choices: [
      {
        label: 'Give the road to the trust. Chair it. Own nothing.',
        requires: {
          k: 'all',
          of: [
            { k: 'flag', scope: 'company', key: 's_transparent', cmp: 'eq', v: true },
            { k: 'flag', scope: 'company', key: 'refused_garrison', cmp: 'eq', v: true },
          ],
        },
        effects: [{ e: 'end', ending: 'port_authority' }],
      },
      {
        label: 'Sell to the commission. Take the fortune, leave the road.',
        effects: [{ e: 'end', ending: 'eminent_domain' }],
      },
      {
        label: 'Keep building until the money runs out or you do.',
        effects: [{ e: 'end', ending: 'long_road' }],
      },
    ],
  },
  {
    id: 's_second_storm',
    ambience: 'accident',
    landmark: true,
    priority: true,
    fuseEpochs: 2,
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 132 },
        { k: 'flag', scope: 'company', key: 'margin_cut', cmp: 'eq', v: true },
        { k: 'flag', scope: 'company', key: 'snap_buried', cmp: 'eq', v: true },
      ],
    },
    art: 'world_s_second_storm',
    title: 'THE CABLE REMEMBERS',
    speaker: 'ingrid',
    leadIn:
      'A second storm system forms along the same track as the one that made the cable sing, and this time the forecasts refuse to call it manageable. Anders walks into your office with the inspection files from incident 4471 — the tear you logged and never told the world about — and shuts the door.',
    prose:
      '“I asked you for a margin and you bought a schedule,” he says, with no heat at all, which is the most frightening version of him. “I asked you to publish the tear and you filed it. Now the same storm is coming back, stronger, and the thin sections I objected to in writing are holding a healed wound at kilometer 921.” He spreads the charts on your desk. “Here is what I can promise. Shut the line down now — every climber grounded, a full season of rebuilding, the freight contracts screaming — and she holds. Run the schedule through this storm, and I am no longer making promises. I am making guesses.” He straightens up and looks at you the way he once looked at a strand that would not break. “You have paid me for ten years to know the difference. Choose.”',
    choices: [
      {
        label: 'Shut it all down. Rebuild every thin section, whatever it costs.',
        effects: [
          { e: 'revenue', d: -200000 },
          { e: 'burn', d: 100000 },
          { e: 'stress', d: 6 },
          { e: 'rel', who: 'ingrid', resp: 2 },
          { e: 'flag', scope: 'company', key: 'storm_rebuilt', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'The line goes dark for a season and the freight customers scream on schedule. Crews rebuild the thin sections through the storm months, kilometer by kilometer, while the accountants learn new shades of gray. When the cable comes back it carries Anders’s full margin at last, bought late and at triple price — which, he observes, is how most people finally buy it.',
      },
      {
        label: 'Keep the schedule. The clamps held once. They will hold again.',
        effects: [{ e: 'end', ending: 'cable_fall' }],
        result:
          'The storm arrives at 2 a.m., eleven percent stronger than forecast, exactly like last time. At kilometer 921 the healed wound opens, and this time the thin sections beside it have nothing extra to give. The cable does not sing. It cracks — a sound the platform’s bones carry to every bunk — and thirty-six thousand kilometers of road come down across four hours, burning into the atmosphere like a slow, endless meteor written across the whole night sky.',
      },
    ],
  },
]
