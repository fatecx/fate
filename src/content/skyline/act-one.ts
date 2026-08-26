import type { SceneDef } from '../schema'

/**
 * SKYLINE — Act One: THE PROOF.
 * A cable that should not exist, the engineer who trusts it, the first
 * money, and the choice of where on Earth to anchor a road to space.
 */
export const ACT_ONE: readonly SceneDef[] = [
  {
    id: 's_entry',
    ambience: 'warehouse',
    foley: 'door',
    landmark: true,
    art: 'world_s_strand',
    title: 'THE STRAND THAT WOULD NOT BREAK',
    speaker: 'ingrid',
    leadIn:
      'It started as a factory accident. Your old tether plant, trying to make relay cables cheaper, produced a strand so strong the testing machine broke before the strand did. The lab ordered a bigger testing machine. That one broke too.',
    prose:
      'Ingrid Voss has spent thirty years building bridges, and she has spent the last three weeks locked in your materials lab with the strand. She meets you at the test rig with a piece of it stretched across a frame — thinner than a shoelace, holding a truck engine off the floor. “Every engineer alive has done this math as a daydream,” she says. “A cable from the ground to orbit. The material was always the missing piece. It was supposed to be thirty years away.” She hands you the strand, and it weighs nothing at all, which is somehow the most convincing part. “Your factory made it by accident. I checked the math nine times, and I will say this once, quietly. We can build the elevator.”',
    choices: [
      {
        label: 'Hire her to build it. Chief engineer, real equity.',
        foley: 'pen',
        effects: [
          { e: 'meet', who: 'ingrid' },
          { e: 'stake', who: 'ingrid', d: 4 },
          { e: 'rel', who: 'ingrid', aff: 2, resp: 2 },
          { e: 'burn', d: 20000 },
          { e: 'score', d: 1 },
        ],
        goto: 's_b_lab',
        result:
          'She reads the offer once and signs it against the test rig. “Two conditions,” she says. “I set the safety margins, and nobody ever argues me down with a calendar.” You shake on both conditions, and the years ahead will test you on both.',
      },
      {
        label: 'Hire her on salary. Keep the equity close.',
        effects: [
          { e: 'meet', who: 'ingrid' },
          { e: 'rel', who: 'ingrid', resp: 1 },
          { e: 'burn', d: 35000 },
        ],
        goto: 's_b_lab',
        result:
          'She takes the salary without blinking, because the cable matters more to her than the money. Something in her manner stays formal, though — the care of a builder who knows exactly whose name is on the deed.',
      },
      {
        label: 'Slow down. Verify the material with outside labs first.',
        effects: [
          { e: 'meet', who: 'ingrid' },
          { e: 'rel', who: 'ingrid', resp: 2 },
          { e: 'treasury', d: -2000000 },
          { e: 'stress', d: 2 },
          { e: 'flag', scope: 'company', key: 'verified_first', v: true },
        ],
        goto: 's_b_lab',
        result:
          'Three independent labs spend six weeks trying to prove the strand is a fluke. All three fail, and one asks to invest. Ingrid approves of the caution more than she says. “Good,” is all she offers. From her, that is a speech.',
      },
    ],
  },
  {
    id: 's_b_lab',
    ambience: 'warehouse',
    kind: 'bridge',
    art: 'world_s_lab',
    title: 'THE QUIET MONTHS',
    prose:
      'The company forms around the strand the way a pearl forms around grit. Ingrid fills the old tether factory with test rigs and hires metallurgists who thought their careers were over. You file patents under boring names, buy the machines that make the machines, and tell nobody anything. Every night the strand gets longer, and every night the number on Ingrid’s whiteboard — the length the cable must reach to hold itself against the spin of the Earth — stares back, unimpressed. The whiteboard says 36,000 kilometers. The spool in the lab holds four.',
    choices: [{ label: 'Continue', effects: [], goto: 's_talia' }],
  },
  {
    id: 's_talia',
    ambience: 'office',
    landmark: true,
    art: 'world_s_talia',
    title: 'THE KID FROM THE FLATS',
    speaker: 'talia',
    leadIn:
      'The company needs a chief of staff before it needs anything else, because you now run three buildings, forty engineers, and a secret. The best résumé in the stack comes with a cover letter that starts with your first company, not your last one.',
    prose:
      'Talia Reyes is twenty-nine and has run operations for a governor and a shipping line. Her cover letter says she grew up in the Flats, on a street where the packages fell soft as rain. In the interview she is direct about it. “I was nine when your tubes reached our block. My grandmother stopped riding the bus for her medicine that year. I have wanted to work for you since I was nine, and I want to be clear — that is exactly why you should worry about hiring me. People who admire you make bad guards. So test me.” She slides a one-page memo across the desk. It is a list of five problems your company has right now. You knew about three of them.',
    choices: [
      {
        label: 'Hire her. The honesty is the résumé.',
        effects: [
          { e: 'meet', who: 'talia' },
          { e: 'rel', who: 'talia', aff: 2, resp: 2 },
          { e: 'burn', d: 8000 },
          { e: 'score', d: 1 },
        ],
        result:
          'She starts Monday and fixes the two problems you did not know about by Thursday. Her desk faces the door, and on it sits a photo of a porch with an old delivery tube — the kind your first company installed. You never ask. She never explains.',
      },
      {
        label: 'Hire her, but keep the secret from her for now.',
        effects: [
          { e: 'meet', who: 'talia' },
          { e: 'rel', who: 'talia', aff: -1, resp: 1 },
          { e: 'burn', d: 8000 },
          { e: 'stress', d: 2 },
        ],
        result:
          'She runs the visible company brilliantly and figures out the invisible one in eleven days, because the strand purchases leave a paper trail a good operator can read. She never mentions it. You find out she knows when she hands you a briefing titled THE THING WE ARE NOT DISCUSSING.',
      },
    ],
  },
  {
    id: 's_marcus',
    ambience: 'cafe',
    landmark: true,
    priority: true,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 6 }, { k: 'met', who: 'marcus' }] },
    art: 'world_s_marcus',
    title: 'THE OLD RIVAL',
    speaker: 'marcus',
    leadIn:
      'Marcus Vale asks for lunch at a diner near the old Flats corridor, which is his way of saying he knows where everything started. He is grayer now, near the end of his run at MERIDIAN, and he orders pie like a man with nothing left to prove.',
    prose:
      'He gets to it before the coffee arrives. “My analysts flagged your factory’s power bills eight months ago. Nobody buys that much testing equipment to make satellite tethers.” He smiles at your face. “Relax. I have told no one, and I am not here to buy you. I tried that once, and you said the best no I ever heard.” He turns his placemat over and draws two boxes. “A cable to orbit is worthless without a ground network feeding it. I run the biggest one on Earth, and in six years, drones are a commodity and MERIDIAN is a museum. I need a future. You need freight contracts, warehouses at the anchor port, and a friend who knows every regulator you are about to meet.” He slides the placemat across. “Partners. The kind you actually needed last time.”',
    choices: [
      {
        label: 'Alliance. MERIDIAN feeds the cable, you split the road.',
        foley: 'pen',
        effects: [
          { e: 'rel', who: 'marcus', aff: 3, resp: 2, standing: 'ally' },
          { e: 'treasury', d: 60000000 },
          { e: 'revenue', d: 120000 },
          { e: 'flag', scope: 'company', key: 'marcus_alliance', v: true },
          { e: 'score', d: 1 },
        ],
        goto: 's_b_alliance',
        result:
          'MERIDIAN wires sixty million dollars as a strategic investment and signs freight contracts that start paying the day the first cargo climbs. The man who once tried to buy your first company shakes your hand across a diner table, and this time both grips mean the same thing.',
      },
      {
        label: 'Take his money without the partnership.',
        effects: [
          { e: 'rel', who: 'marcus', aff: -1, resp: 1 },
          { e: 'treasury', d: 60000000 },
          { e: 'flag', scope: 'company', key: 'marcus_money_only', v: true },
        ],
        goto: 's_b_alliance',
        result:
          '“Money it is,” he says, and signs without complaint, though something in his shoulders settles an inch lower. He wanted to build one more thing. You bought his check and left the builder at the table.',
      },
      {
        label: 'Decline. No giants on the cap table this time.',
        effects: [
          { e: 'rel', who: 'marcus', resp: 2 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'marcus_declined', v: true },
        ],
        goto: 's_b_alliance',
        result:
          'He nods slowly, pays for both meals, and leaves you with one sentence that stays: “I fought you once and lost to what you are. Just remember — the people coming for this one make me look like a neighbor.”',
      },
    ],
  },
  {
    id: 's_b_alliance',
    ambience: 'night',
    kind: 'bridge',
    title: 'WHAT THE LUNCH MEANT',
    prose:
      'Word of the meeting moves through the industry within a week, because a MERIDIAN chairman does not eat pie in the Flats by accident. Nobody knows what was said, and that is somehow louder than knowing. Two investment funds that ignored your emails in the spring now ask for meetings. A logistics reporter calls Talia and asks, carefully, whether the rumors about a “vertical project” are worth her time. The strand in the lab crosses forty kilometers of spooled length the same night, and Ingrid marks the milestone the way she marks all of them — by writing the next, larger number on the whiteboard and going back to work.',
    choices: [{ label: 'Continue', effects: [], goto: 's_proof' }],
  },
  {
    id: 's_proof',
    ambience: 'wind',
    landmark: true,
    art: 'world_s_proof',
    title: 'ONE HUNDRED KILOMETERS, STRAIGHT UP',
    leadIn:
      'The test Ingrid designs is simple to describe and absurd to look at: a balloon platform lifts one end of the strand a hundred kilometers up, to the edge of space, while the other end stays winched to a barge. If the strand holds its own weight at that length, the math for the full cable stops being a daydream.',
    prose:
      'At dawn the strand disappears into the sky like a pencil line drawn by someone very patient. Cameras track it until it is invisible, and then the instruments carry the story alone. Tension nominal. Sway within limits. Ingrid stands at the winch console for six hours and speaks only to the cable, softly, in Norwegian. At 1:14 p.m. the test reaches full load, holds it, and keeps holding it. The barge crew starts to cheer, and Ingrid raises one hand for silence like a conductor. She waits another full hour before she lets anyone celebrate. Then she turns to you with wet eyes and total calm and says, “Now you may call the bankers.”',
    choices: [
      {
        label: 'Announce it to the world. Full proof, full noise.',
        effects: [
          { e: 'rep', d: 2 },
          { e: 'flag', scope: 'company', key: 'proof_public', v: true },
          { e: 'stress', d: 4 },
          { e: 'score', d: 1 },
        ],
        goto: 's_b_famous',
        result:
          'The footage of a line vanishing into the sky plays on every screen on Earth within a day. Three governments call before dinner. So does every fund you have ever met, two you haven’t, and one number Talia flags with a note: “This one owns a country’s savings. Careful.”',
      },
      {
        label: 'Keep it quiet. Show the proof privately, buyer by buyer.',
        effects: [
          { e: 'flag', scope: 'company', key: 'proof_private', v: true },
          { e: 'stress', d: 2 },
        ],
        goto: 's_b_famous',
        result:
          'You screen the footage in locked rooms for chosen investors, one at a time, and watch each of them go quiet in the same place — the moment the line stops looking like rope and starts looking like a road. Secrets this size leak anyway. Yours buys you about nine weeks of calm.',
      },
    ],
  },
  {
    id: 's_b_famous',
    ambience: 'street',
    kind: 'bridge',
    art: 'world_s_famous',
    title: 'THE WORD ELEVATOR',
    prose:
      'However carefully the proof travels, the word travels faster. Elevator. It shows up in analyst notes with question marks, then in headlines without them. HALCYON’s stock dips four percent on a rumor and recovers on a denial that names no one. Old friends surface — June calls on a Sunday and laughs for a solid ten seconds before saying anything at all, and Priya sends a one-line email you print and keep: SO IT WAS NEVER ABOUT DELIVERY TRUCKS. Somewhere in a tower you have never visited, someone opens a file on you. Several someones. The age of being underestimated is over for good.',
    choices: [{ label: 'Continue', effects: [], goto: 's_series_a' }],
  },
  {
    id: 's_series_a',
    ambience: 'boardroom',
    landmark: true,
    priority: true,
    fuseEpochs: 4,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 16 }, { k: 'seen', scene: 's_proof' }] },
    art: 'world_s_series_a',
    title: 'ONE HUNDRED FORTY MILLION',
    leadIn:
      'The Series A for a space elevator does not look like any round you have raised before. The term sheets arrive bound like books, the diligence teams bring their own structural engineers, and every lead investor wants one thing more than returns — a seat at the table where the century gets decided.',
    prose:
      'Three offers make the final cut, and Talia lays them side by side in the war room. A clean syndicate of the big venture funds — one hundred forty million, standard terms, a board seat for the lead. A strategic round built around aerospace giants — more money, more strings, engineers you could use and politics you could choke on. And a card that arrived by courier with no term sheet at all: SHEIKH RASHID AL-MANSOUR, AURELIA SOVEREIGN FUND, printed on paper that feels like cloth, with four handwritten words. WHENEVER YOU ARE READY. Talia taps that one. “Nine hundred billion under management. Patient as geology. I checked — they have never once led an early round. For you, they are offering to.”',
    choices: [
      {
        label: 'Take the clean venture syndicate. Boring money, free hands.',
        foley: 'pen',
        effects: [
          { e: 'treasury', d: 140000000 },
          { e: 'stake', who: 'june', d: 12 },
          { e: 'burn', d: 300000 },
          { e: 'flag', scope: 'company', key: 'clean_a', v: true },
          { e: 'score', d: 1 },
        ],
        goto: 's_b_funded',
        result:
          'The syndicate closes in three weeks, and June — who organized half of it from her kitchen — takes the board seat as the lead’s representative, which makes the first board meeting feel less like governance and more like family with lawyers. The Aurelia card goes in your desk drawer. It does not feel finished.',
      },
      {
        label: 'Meet the Sheikh. At least hear the patient money out.',
        effects: [
          { e: 'meet', who: 'rashid' },
          { e: 'rel', who: 'rashid', aff: 1 },
          { e: 'treasury', d: 140000000 },
          { e: 'stake', who: 'june', d: 12 },
          { e: 'burn', d: 300000 },
          { e: 'flag', scope: 'company', key: 'met_rashid_early', v: true },
        ],
        goto: 's_rashid_tea',
        result:
          'You take the syndicate’s money for the round — and accept the tea. Some doors deserve to be looked through before they are closed, and this one has a country behind it.',
      },
      {
        label: 'Strategic round. The aerospace giants and their strings.',
        effects: [
          { e: 'treasury', d: 180000000 },
          { e: 'stake', who: 'june', d: 16 },
          { e: 'burn', d: 340000 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'strategic_a', v: true },
        ],
        goto: 's_b_funded',
        result:
          'The giants bring forty million extra and engineering teams that shave months off the platform design. They also bring observers to every meeting and a contract clause Talia highlights in yellow and labels REMEMBER THIS ONE — a right to review any change of control. Strings pull both ways. Eventually, everything attached to them moves.',
      },
    ],
  },
  {
    id: 's_rashid_tea',
    ambience: 'hotel',
    landmark: true,
    art: 'world_s_rashid',
    title: 'TEA WITH A BELIEVER',
    speaker: 'rashid',
    leadIn:
      'Sheikh Rashid al-Mansour receives you in a hotel suite arranged like a living room, with no aides, no lawyers, and a teapot he pours from himself. On the table sits a printed copy of an interview you gave eleven years ago, in the garage years, annotated in the margins by hand.',
    prose:
      '“You said something once that I have never forgotten,” he begins, and reads your own words back to you — the line about starting exactly where the giants refuse to go. “My country grew rich on oil, and oil is ending. I manage the savings of a nation that must now buy its future, and everyone sells me the past — refineries, football clubs, office towers.” He sets down the paper. “You are building the only piece of infrastructure that will matter in a hundred years. I am not asking to invest today. I am asking you to remember, when the numbers get too large for the ordinary funds, that there is money in the world that thinks in generations. Mine.” He refills your cup and smiles like a man who has already seen the ending. “The next round, or the one after. Whenever you are ready.”',
    choices: [
      {
        label: 'Thank him honestly. Keep the door open.',
        effects: [
          { e: 'rel', who: 'rashid', aff: 2 },
          { e: 'flag', scope: 'company', key: 'rashid_door_open', v: true },
        ],
        goto: 's_b_funded',
        result:
          'You part with a handshake and no promises, which he seems to prefer. In the elevator down, Talia reads her phone and goes quiet. “While you were in there,” she says, “Aurelia bought two shipping ports and a satellite firm. He collects infrastructure the way other rich men collect art.”',
      },
      {
        label: 'Ask him the real question: what does Aurelia want to become?',
        effects: [
          { e: 'rel', who: 'rashid', resp: 2 },
          { e: 'flag', scope: 'company', key: 'rashid_door_open', v: true },
          { e: 'flag', scope: 'company', key: 'asked_rashid', v: true },
          { e: 'score', d: 1 },
        ],
        goto: 's_b_funded',
        result:
          'He studies you for a long moment, then answers with more honesty than you expected and less than you will eventually need. “A fund is a wallet,” he says. “I am tired of being a wallet. I want Aurelia to be a place.” You will remember this conversation in about two years, word for word.',
      },
    ],
  },
  {
    id: 's_b_funded',
    ambience: 'warehouse',
    kind: 'bridge',
    art: 'world_s_scale',
    title: 'A COMPANY THE SIZE OF THE JOB',
    prose:
      'The money changes the company’s physics. Headcount triples in a quarter, the old tether factory becomes one corner of a campus, and the burn rate crosses three hundred thousand dollars a week — a number that would have killed your first company in an afternoon and now appears in a Tuesday email without comment. Ingrid’s strand production runs around the clock. Talia builds the org chart like a hull, watertight compartment by compartment. And on the largest wall of the new headquarters, someone hangs a map of the equatorial oceans, because the next decision is the one that decides everything after it. A cable to space has to start somewhere on Earth.',
    choices: [{ label: 'Continue', effects: [], goto: 's_site' }],
  },
  {
    id: 's_site',
    ambience: 'boardroom',
    landmark: true,
    fuseEpochs: 4,
    art: 'world_s_site',
    title: 'WHERE THE ROAD TOUCHES THE EARTH',
    leadIn:
      'The anchor has to sit near the equator, in deep water, away from storms and shipping lanes. The shortlist comes down to three dots on the ocean map, and every dot is really a question about who you will owe.',
    prose:
      'Ingrid presents the engineering, then Talia presents the politics, which is the harder half. Option one — the waters of Kiribela, a small island nation drowning in debt, which would lease you a platform zone for almost nothing because it desperately needs the money. Cheap, fast, and fragile, because desperate landlords can be bought out from over your head. Option two — international waters, owned by no one, governed by treaties older than your parents. Nobody can sell your ground to a rival there, and nobody will defend it for you either. Option three — American waters, with Senator Calloway’s public blessing, her committee’s protection, and every string that comes woven into a flag.',
    choices: [
      {
        label: 'Kiribela. Cheap, fast, and a nation that needs the work.',
        effects: [
          { e: 'treasury', d: -30000000 },
          { e: 'burn', d: 60000 },
          { e: 'flag', scope: 'company', key: 'site_kiribela', v: true },
          { e: 'rep', d: 1 },
        ],
        goto: 's_b_site_set',
        result:
          'The lease signs in a government hall with peeling paint and genuine joy — the deal funds Kiribela’s schools and sea walls for a decade, and the platform will employ half the harbor. The finance minister shakes your hand twice. Behind him, unnoticed for now, a junior aide photographs every page of the agreement for a buyer she has never met.',
      },
      {
        label: 'International waters. Owned by no one, defended by no one.',
        effects: [
          { e: 'treasury', d: -80000000 },
          { e: 'burn', d: 90000 },
          { e: 'flag', scope: 'company', key: 'site_open_sea', v: true },
          { e: 'score', d: 1 },
        ],
        goto: 's_b_site_set',
        result:
          'The lawyers call it the hard road, and they are right — everything costs more when no country is your landlord. But the ground under the cable belongs to a treaty instead of a government, and no single flag can ever claim the road. Ingrid approves in her quiet way. “Bridges should not have owners,” she says. “Only keepers.”',
      },
      {
        label: 'American waters. Calloway’s protection, Calloway’s strings.',
        effects: [
          { e: 'meet', who: 'calloway' },
          { e: 'rel', who: 'calloway', aff: 2 },
          { e: 'treasury', d: -40000000 },
          { e: 'burn', d: 70000 },
          { e: 'flag', scope: 'company', key: 'site_us', v: true },
        ],
        goto: 's_b_site_set',
        result:
          'Senator Calloway announces the partnership on the Capitol steps with you at her side, and the permits move like they have engines. In private, her handshake lasts one second longer than it needs to. “America keeps what America protects,” she says warmly. It takes you the whole flight home to hear the sentence both ways.',
      },
    ],
  },
  {
    id: 's_b_site_set',
    ambience: 'wind',
    kind: 'bridge',
    art: 'world_s_platform_build',
    title: 'STEEL ON THE WATER',
    prose:
      'The anchor platform grows out of the ocean over the next year the way a city grows — first as pilings and promises, then as a floating harbor the size of forty football fields, ringed by supply ships and impatient weather. Crews rotate in on two-week shifts and come home talking about it the way people talk about cathedrals. The strand factory ships spools by the hundred. Ingrid moves her office onto the platform itself, into a container with one window, and starts calling the cable “she.” Costs run ahead of every estimate, because everything at sea costs double and everything unprecedented costs triple. The road to space is being built with money that burns like rocket fuel.',
    choices: [{ label: 'Continue', effects: [], goto: 's_cut_year_two' }],
  },
  {
    id: 's_cut_year_two',
    kind: 'cutscene',
    title: 'YEAR TWO',
    marker: 'YEAR TWO',
    skipToWeek: 52,
    art: 'cut_s_year_two',
    screens: [
      {
        art: 'cut_s_year_two',
        prose:
          'The platform gets a name the workers choose themselves: FIRST RUNG.\n\nBy the end of year two it has a cafeteria, a chapel, a gym, and a betting pool on the weather. Four hundred people live where there was only ocean. The cable — her first true segment, anyway — rises from the center derrick and vanishes into the clouds, attached to nothing yet but its own test weights and everyone’s whole heart.',
      },
      {
        art: 'cut_s_year_two_night',
        prose:
          'At night, from the platform’s edge, you can see the aircraft warning lights climb the line until they run out — a dotted road going up, unfinished.\n\nEvery person on FIRST RUNG has stood at this rail at least once, looking up at where the lights stop. Nobody ever says anything clever about it. Mostly they just look, the way people look at the thing their life turned out to be for.',
      },
    ],
    prose:
      'Year two ends with four hundred people living on a platform called FIRST RUNG, under a cable that climbs into the clouds and stops. The hard part — all 36,000 kilometers of it — is next.',
    choices: [{ label: 'Continue', effects: [{ e: 'stress', d: -6 }], goto: 's_ingrid_margin' }],
  },
]
