import type { SceneDef } from '../schema'

/**
 * SKYLINE — Act Two: THE BUILD AND THE FLAG.
 * The money gets sovereign, the schedule fights the safety margin, the
 * cable takes its wound, and an investor becomes a country.
 */
export const ACT_TWO: readonly SceneDef[] = [
  {
    id: 's_ingrid_margin',
    ambience: 'wind',
    landmark: true,
    art: 'world_s_margin',
    title: 'THE MARGIN',
    speaker: 'ingrid',
    leadIn:
      'Anders asks for you on the platform, in person, which he only does when a drawing cannot carry the weight of what he has to say. He meets you at the derrick with wind in his jacket and a tablet he does not open.',
    prose:
      '“The board wants the cable finished in three years,” he says. “The cable wants five.” He lets the wind have a moment. “I can build it in three. I know how — thinner redundancy, fewer test cycles, climb the schedule instead of the checklist. Other people build that way. Their names are on plaques near flowers.” He finally opens the tablet and shows you two plans, side by side. The fast one saves four hundred million dollars and two years. The slow one has a number at the bottom he has circled by hand — his safety margin, the extra strength the cable keeps in reserve for the day something surprises it. “You hired me with two conditions. This is me holding you to the first one. Choose which plan I build, and know that I will build either one with everything I have. Only one of them lets me sleep.”',
    choices: [
      {
        label: 'Build it her way. The margin stays.',
        effects: [
          { e: 'rel', who: 'ingrid', aff: 3, resp: 3 },
          { e: 'burn', d: 40000 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'margin_kept', v: true },
          { e: 'score', d: 2 },
        ],
        result:
          'The board grumbles for one full meeting, and then Anders presents the failure math in person and the grumbling stops mid-sentence. The schedule slips two years. The circled number stays. On his way out of the boardroom he touches your shoulder once, which from Anders Voss is an embrace.',
      },
      {
        label: 'Split it. Fast on the tower sections, her margin up high.',
        effects: [
          { e: 'rel', who: 'ingrid', aff: -1, resp: 1 },
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'margin_split', v: true },
        ],
        result:
          'He takes the compromise the way engineers take compromises — fully, formally, and with a memo. The memo lists which sections carry the thinner reserve and states, in one plain sentence, that he objects. “File it where the future can find it,” he says, and you do — thinking, the whole time, about where the future usually goes looking.',
      },
      {
        label: 'The fast plan. Three years. The market will not wait five.',
        effects: [
          { e: 'rel', who: 'ingrid', aff: -3, resp: -2 },
          { e: 'treasury', d: 100000000 },
          { e: 'flag', scope: 'company', key: 'margin_cut', v: true },
          { e: 'stress', d: 3 },
        ],
        result:
          'The savings hit the runway like found money, the board applauds, and the schedule tightens like a fist. Anders builds it, exactly as promised, with everything he has. He also stops calling the cable “she.” You notice a month later, and you understand it a year later.',
      },
    ],
  },
  {
    id: 's_aurelia_b',
    ambience: 'boardroom',
    landmark: true,
    priority: true,
    fuseEpochs: 4,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 58 }, { k: 'seen', scene: 's_ingrid_margin' }] },
    art: 'world_s_aurelia_b',
    title: 'SIX HUNDRED MILLION',
    speaker: 'rashid',
    leadIn:
      'The Series B is a simple sentence with a terrifying number in it: the cable needs six hundred million dollars, and only three kinds of money on Earth write that check — governments, sovereign funds, and things like ALEPH. Sheikh Rashid arrives first, and this time he brings Katarina Volkov.',
    prose:
      'Rashid does the believing and Volkov does the terms, and the two of them run the meeting like one person. “Six hundred million,” Volkov says, laying the pages out in perfect rows. “No board control. Generous timelines. One board seat, held by the Sheikh personally.” The terms are half a step better than fair — patient money behaving patiently. Then, at the bottom of page nine, one clause in gentle language: Aurelia receives first option to host the anchor operations within any special economic territory it may administer. Mateo reads it twice and writes one word on his legal pad, angled so only you can see it. TERRITORY?',
    choices: [
      {
        label: 'Take it — but strike the territory clause first.',
        requires: { k: 'flag', scope: 'company', key: 'asked_rashid', cmp: 'eq', v: true },
        foley: 'pen',
        effects: [
          { e: 'treasury', d: 600000000 },
          { e: 'stake', who: 'rashid', d: 14 },
          { e: 'meet', who: 'volkov' },
          { e: 'burn', d: 200000 },
          { e: 'flag', scope: 'company', key: 'aurelia_b', v: true },
          { e: 'flag', scope: 'company', key: 'territory_struck', v: true },
          { e: 'score', d: 1 },
        ],
        goto: 's_b_sovereign',
        result:
          'You quote his own words back to him — a fund is a wallet, I am tired of being a wallet — and tell him you will take the wallet and pass on the place. Rashid laughs with real delight and strikes the clause himself, in ink. Volkov’s pen pauses over notebook forty-one for three full seconds, which you will later learn was her being surprised.',
      },
      {
        label: 'Take the deal as written. It is the best paper on the table.',
        foley: 'pen',
        effects: [
          { e: 'treasury', d: 600000000 },
          { e: 'stake', who: 'rashid', d: 14 },
          { e: 'meet', who: 'volkov' },
          { e: 'burn', d: 200000 },
          { e: 'flag', scope: 'company', key: 'aurelia_b', v: true },
          { e: 'flag', scope: 'company', key: 'territory_clause', v: true },
        ],
        goto: 's_b_sovereign',
        result:
          'Six hundred million dollars clears in a single wire that briefly trips the bank’s fraud systems. Rashid toasts the future with pomegranate juice. The clause on page nine sleeps in the closing binder like a seed in winter, and Katarina Volkov starts notebook forty-two.',
      },
      {
        label: 'Refuse sovereign money. Raise it slow and ordinary.',
        effects: [
          { e: 'treasury', d: 350000000 },
          { e: 'stake', who: 'june', d: 10 },
          { e: 'burn', d: 150000 },
          { e: 'stress', d: 5 },
          { e: 'flag', scope: 'company', key: 'no_aurelia', v: true },
        ],
        goto: 's_b_sovereign',
        result:
          'The ordinary funds scrape together three hundred fifty million across four months of grinding closings — less money, slower build, cleaner hands. Rashid takes the refusal with unbroken warmth. “The offer does not expire,” he says. Volkov closes her notebook without writing anything, and that is worse than anything she could have written.',
      },
    ],
  },
  {
    id: 's_b_sovereign',
    ambience: 'corp',
    kind: 'bridge',
    art: 'world_s_ports',
    title: 'THE COLLECTOR',
    prose:
      'Whatever you signed or refused, Aurelia keeps shopping. Over the next two quarters the fund buys a container port in Sri Lanka, a seabed mining fleet, two undersea cable operators, and — Mateo flags this one in red — the entire national debt of Kiribela, purchased quietly from its creditors at a discount. Individually, each purchase reads as a rich fund buying boring infrastructure. Laid out on Mateo’s wall with string between the pins, they read as something else: every asset sits within nine hundred kilometers of your anchor platform. “Funds diversify,” Mateo says, staring at his own wall. “This is not diversifying. This is surrounding.”',
    choices: [{ label: 'Continue', effects: [], goto: 's_uproot' }],
  },
  {
    id: 's_uproot',
    ambience: 'night',
    landmark: true,
    fuseEpochs: 5,
    art: 'world_s_uproot',
    title: 'THE UPROOT',
    leadIn:
      'The build hits the phase every megaproject hits, where decisions queue up faster than they can travel to shore. Anders needs answers in hours, and you live eleven time zones and one helicopter away. The math keeps arriving at the same answer, and the answer is you.',
    prose:
      'Mateo lays it out without drama, because the drama is built in. “The next three years decide whether the cable gets finished. Run it from headquarters and you are a photograph on the platform’s wall — every hard call waits half a day for your time zone. Or move to FIRST RUNG and run it from the rail.” He pauses, and drops his voice out of chief-of-staff register into something older. “Boss, be clear-eyed. It is not a business trip. It is a one-way door. June’s Sunday calls become math. Your mother is seventy-eight, and she will not visit a platform six hundred miles from land. The people who move to the work always say they will come back. The work has never once agreed.”',
    choices: [
      {
        label: 'Move to the platform. The cable gets all of you.',
        effects: [
          { e: 'flag', scope: 'company', key: 'uprooted', v: true },
          { e: 'rel', who: 'ingrid', aff: 2, resp: 2 },
          { e: 'burn', d: -30000 },
          { e: 'stress', d: 5 },
          { e: 'score', d: 1 },
        ],
        goto: 's_b_platform_life',
        result:
          'You pack one life into eleven boxes and ship it to the middle of the ocean. The decisions start landing in minutes instead of days, the build finds a rhythm it never had, and four hundred people start nodding to you in the cafeteria like a neighbor. On shore, an apartment you own goes dark, and stays dark.',
      },
      {
        label: 'Stay on shore. Some things need you human more than fast.',
        effects: [
          { e: 'flag', scope: 'company', key: 'stayed_ashore', v: true },
          { e: 'rel', who: 'ingrid', aff: -1 },
          { e: 'burn', d: 30000 },
          { e: 'stress', d: 3 },
        ],
        goto: 's_b_shore_life',
        result:
          'You build the best remote command room money can buy and keep your Sundays. The cable slows by months, and Anders carries weight that should have been yours — you can hear it in his voice on the night calls. Some prices are paid in schedule. You chose to pay this one there.',
      },
    ],
  },
  {
    id: 's_b_platform_life',
    ambience: 'wind',
    kind: 'bridge',
    art: 'world_s_platform_life',
    title: 'LIFE AT THE RAIL',
    prose:
      'Platform life rearranges you. You learn the weather by the sound of the mooring lines, eat breakfast with welders, and hold board calls at 3 a.m. because the shareholders live where the daylight is. June’s Sunday call becomes a Wednesday email, then a monthly summary, and both of you pretend the shrinking is temporary. Your mother learns to video call and holds the phone too close, so for two years you know her mostly as a warm blurry forehead asking if you are eating. The cable climbs. That is the trade, and on the nights the warning lights blink all the way up into the stars, the trade feels almost fair.',
    choices: [{ label: 'Continue', effects: [], goto: 's_fork' }],
  },
  {
    id: 's_b_shore_life',
    ambience: 'office',
    kind: 'bridge',
    art: 'world_s_shore_life',
    title: 'THE LONG DISTANCE',
    prose:
      'You govern the build from a command room with eleven screens and a coffee machine that knows your schedule. It works the way remote things work — ninety percent as well, with the missing ten percent costing double. Decisions stack overnight. Small fires burn for hours longer than they should. But you are at your mother’s birthday in person, and at June’s table for the holidays, and when Mateo asks whether you regret it, you answer honestly that you do and you don’t, most days in that order before lunch and the reverse after.',
    choices: [{ label: 'Continue', effects: [], goto: 's_fork' }],
  },
  {
    id: 's_fork',
    ambience: 'boardroom',
    landmark: true,
    fuseEpochs: 4,
    art: 'world_s_fork',
    title: 'CARGO OR PEOPLE',
    leadIn:
      'The design freeze arrives — the date after which the cable becomes whatever it is going to be. One question towers over the freeze, and the whole company knows it, and the whole world is about to.',
    prose:
      'Anders frames it in one sentence at the all-hands: “A cargo cable and a passenger cable are different machines wearing the same line.” Cargo only means freight climbs cheap and nothing else matters — a simpler safety argument, faster approval, and profit like a tide. Rating it for people means triple redundancy, escape pods every hundred kilometers, years more work — and it changes who the cable is for. A teacher could ride to orbit for the price of a car. The treaty fight gets harder too, because a cable that moves people past every border on Earth frightens governments in a way freight never will. The room waits. Choose what the road is for.',
    choices: [
      {
        label: 'Rate it for people. That was always the point.',
        effects: [
          { e: 'flag', scope: 'company', key: 'humans_rated', v: true },
          { e: 'rel', who: 'ingrid', resp: 2 },
          { e: 'burn', d: 120000 },
          { e: 'rep', d: 2 },
          { e: 'stress', d: 4 },
          { e: 'score', d: 2 },
        ],
        goto: 's_b_fork_set',
        result:
          'The announcement plays around the planet: PEOPLE WILL RIDE. Applications to work on the cable triple in a week. So does the lobbying budget of everyone who fears it, and in one committee room, a senator who shook your hand starts redrafting a treaty with new urgency.',
      },
      {
        label: 'Cargo first. People when the road has proven itself.',
        effects: [
          { e: 'flag', scope: 'company', key: 'cargo_first', v: true },
          { e: 'revenue', d: 250000 },
          { e: 'stress', d: 2 },
        ],
        goto: 's_b_fork_set',
        result:
          'The freight contracts sign themselves — every factory owner on Earth can do the math of a hundred-dollar kilogram falling to one. The dream files a quiet objection that you promise to hear later. The promise has no date on it.',
      },
    ],
  },
  {
    id: 's_b_fork_set',
    ambience: 'warehouse',
    kind: 'bridge',
    art: 'world_s_climbers',
    title: 'THE CLIMBERS',
    prose:
      'The climber cars arrive from the factory like a parade of patient beetles — house-sized machines that grip the cable and walk it upward at three hundred kilometers an hour. Each one gets a name stenciled by its crew, because humans cannot help it: PILGRIM, STEADY GIRL, THE COMMUTE. Test runs climb higher every month, first with sandbags, then with instruments, then with the company dog’s weight in gelatin because an engineer swore the joke had scientific value. The cable holds them all. Far below, in the harbor towns, kids point up at the moving lights, and their parents let them stay up late to watch — the road to space, running its first errands.',
    choices: [{ label: 'Continue', effects: [], goto: 's_pirates' }],
  },
  {
    id: 's_pirates',
    ambience: 'mission',
    landmark: true,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 74 }, { k: 'seen', scene: 's_fork' }] },
    priority: true,
    art: 'world_s_pirates',
    title: 'THE CONVOY',
    leadIn:
      'The supply convoy from Kiribela runs the same route every twelve days, so regular you could set clocks by it. At 2 a.m. the ops room wakes you with the sentence nobody has said out loud on Earth in a hundred years: our ships are being boarded.',
    prose:
      'Three fast boats, professional, armed, and strangely polite — they take the strand spools and nothing else, harm no one, and vanish off every radar the region owns. Piracy, the insurers rule. Except pirates sell what they steal, and your strand never surfaces on any market anywhere. Mateo’s analysis takes one page: someone wanted to test your security, delay your schedule, and price your response, all in one night. The navies of three countries offer escorts within the week — Admiral Reyes-Cain’s office first among them, his letter warm as a handshake and heavy as a door. Protection is real. So is what protection costs.',
    choices: [
      {
        label: 'Hire private security. Stay under your own flag.',
        effects: [
          { e: 'burn', d: 80000 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'private_security', v: true },
        ],
        result:
          'The escort fleet you hire is quiet, expensive, and yours. The raids stop — whoever priced your response got the answer, and the answer was: this one pays for independence. In a ministry office, a file on you gains a new page with one underlined word. STUBBORN.',
      },
      {
        label: 'Accept the Admiral’s escorts. Free, capable, and his.',
        effects: [
          { e: 'meet', who: 'reyescain' },
          { e: 'rel', who: 'reyescain', aff: 2 },
          { e: 'flag', scope: 'company', key: 'navy_escort', v: true },
          { e: 'stress', d: 1 },
        ],
        result:
          'Gray hulls take station around your convoys inside a week, and nothing so much as splashes near them again. Admiral Reyes-Cain visits the platform to inspect the arrangement personally, stays for dinner, and toasts “the most important asset on Earth.” You notice he says asset the way other men say target.',
      },
      {
        label: 'Investigate first. Find out who ordered the test.',
        effects: [
          { e: 'treasury', d: -20000000 },
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'traced_raid', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          'The investigators follow the fast boats backward through four shell companies and one proud, careless middleman. The trail dies at a law office in Zurich that represents exactly two clients: a HALCYON subsidiary, and a shipping firm Aurelia bought last spring. Both, or either, or one hiring the other. You file the answer where the future can find it.',
      },
    ],
  },
  {
    id: 's_strand_snap',
    ambience: 'accident',
    landmark: true,
    priority: true,
    fuseEpochs: 2,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 84 }, { k: 'seen', scene: 's_fork' }] },
    art: 'world_s_snap',
    title: 'THE NIGHT THE CABLE SANG',
    leadIn:
      'A storm system the forecasts called manageable arrives eleven percent stronger than manageable. At 11:52 p.m., with a test climber at kilometer 900, the cable does something no simulation ever showed you. It starts to sing.',
    prose:
      'The sound comes through the platform’s bones before the instruments explain it — a low note like a whale made of metal, the whole line vibrating in the storm wind. At kilometer 900, climber STEADY GIRL grips the shaking cable with two technicians aboard, riding out forces the manual calls impossible. Anders is in ops in ninety seconds, barefoot, calling the storm’s bluff one command at a time — he slows the climber, angles the platform, and damps the vibration with the winches like a man calming an animal he raised. It takes four hours. At dawn the cable stands quiet, the technicians come down gray-faced and alive, and the inspection drones go up. On strand bundle nine, at kilometer 921, they find it: a partial tear, healed over by the emergency clamps. The cable held. It also, for the first time, got hurt.',
    choices: [
      {
        label: 'Publish the tear. Full report, world audience, your name on it.',
        effects: [
          { e: 'flag', scope: 'company', key: 's_transparent', v: true },
          { e: 'rep', d: 2 },
          { e: 'rel', who: 'ingrid', resp: 3 },
          { e: 'revenue', d: -80000 },
          { e: 'stress', d: 6 },
          { e: 'score', d: 2 },
        ],
        goto: 's_b_after_snap',
        result:
          'The report goes out with the tear photographed in full resolution and the fix documented bolt by bolt. Freight customers pause contracts for a season, and rivals quote the pictures out of context, exactly as the comms team warned. And in a hundred engineering schools, professors show the report to their students and say the sentence money cannot buy: this is how it is supposed to be done.',
      },
      {
        label: 'Report it quietly through official channels only.',
        effects: [
          { e: 'flag', scope: 'company', key: 'snap_quiet', v: true },
          { e: 'stress', d: 3 },
          { e: 'rel', who: 'ingrid', resp: -1 },
        ],
        goto: 's_b_after_snap',
        result:
          'The regulators get the full file and the public gets a sentence about “weather-related maintenance.” Both statements are true, and only one of them is honest. The file sits in three government inboxes now, which means it is one leak, one hearing, or one enemy away from being a story you no longer control.',
      },
      {
        label: 'Log it internally. The clamps worked. That is the system working.',
        effects: [
          { e: 'flag', scope: 'company', key: 'snap_buried', v: true },
          { e: 'rel', who: 'ingrid', aff: -3, resp: -3 },
          { e: 'stress', d: 2 },
        ],
        goto: 's_b_after_snap',
        result:
          'The tear becomes incident number 4471 in a database with four thousand four hundred seventy other entries. Anders signs the log because the law requires his signature, and then he walks to your office and stands in the doorway for a moment without sitting down. “Bridges do not forgive twice,” he says, and leaves. The doorway feels colder for an hour.',
      },
    ],
  },
  {
    id: 's_b_after_snap',
    ambience: 'wind',
    kind: 'bridge',
    art: 'world_s_repair',
    title: 'THE REPAIR SEASON',
    prose:
      'The repair takes a season either way. Climbers crawl the wounded kilometer with robotic arms, weaving new strand into old like surgeons who commute at three hundred kilometers an hour. Anders rewrites the storm playbook from scratch and drills the ops room until calming the cable becomes muscle memory. The insurance premiums arrive with a new decimal place. And on the shore, in capitals you have never visited, the photographs of a healed tear at kilometer 921 begin circulating through ministries — attached, always, to the same growing question: should something this important really belong to one person?',
    choices: [{ label: 'Continue', effects: [], goto: 's_cut_flag' }],
  },
  {
    id: 's_cut_flag',
    kind: 'cutscene',
    title: 'THE FLAG',
    marker: '2045 · THE FLAG',
    skipToWeek: 122,
    priority: true,
    when: { k: 'all', of: [{ k: 'age', cmp: 'gte', v: 96 }, { k: 'seen', scene: 's_strand_snap' }] },
    art: 'cut_s_flag',
    screens: [
      {
        art: 'cut_s_charter',
        prose:
          'It happens in three announcements, spaced like chess moves.\n\nFirst: Aurelia purchases the sea territory surrounding your anchor zone from the government of Kiribela — the same government whose national debt it quietly bought two years ago. The price forgives the debt. The paperwork calls it a “special economic zone.”\n\nSecond: the zone gets a charter, a court, a port authority, and a passport office. The press calls it an experiment. Katarina Volkov, listed as author of the charter, calls it “a jurisdiction.”',
      },
      {
        art: 'cut_s_flag',
        prose:
          'Third: on a bright Tuesday, with cameras arranged like an art exhibit, Sheikh Rashid al-Mansour stands on a brand-new sea wall and raises a flag.\n\nAURELIA. The first venture-state. A country whose constitution is a shareholder agreement, whose citizens hold equity, whose anthem was composed by an artificial intelligence and sounds, everyone agrees, expensive.\n\nIts territory is a ring of ocean. In the exact center of the ring, connected to the sky, stands your platform.\n\nYou are now the national landmark of a country you never joined.',
      },
    ],
    prose:
      'Aurelia declares itself the first venture-state — a country built like a startup, chartered on the ocean around your anchor platform. The elevator now stands inside the territory of its own investor.',
    choices: [{ label: 'Continue', effects: [{ e: 'meet', who: 'aurelia' }, { e: 'stress', d: 6 }], goto: 's_citizenship' }],
  },
  {
    id: 's_citizenship',
    ambience: 'corp',
    landmark: true,
    fuseEpochs: 3,
    art: 'world_s_citizenship',
    title: 'THE MINISTRY',
    speaker: 'rashid',
    leadIn:
      'Rashid requests a meeting on his new soil, in a capital that is nine buildings and a harbor, all of it smelling of fresh paint and seawater. Volkov meets you at the dock with diplomatic courtesy, which is its own kind of cold.',
    prose:
      'He receives you on a terrace overlooking your own platform on the horizon, and he does not pretend the view is an accident. “I told you once I wanted Aurelia to be a place. You are standing in it.” The offer comes on one page, beautiful and terrible. Citizenship, first class. A founding ministry — INFRASTRUCTURE OF THE CENTURY — with powers written for you personally. And the elevator reclassified as Aurelia’s national asset: protected by its treaties, funded by its treasury, wrapped in its flag. “Every government on Earth is circling your cable,” he says gently. “I am offering you the only shelter that was built for it. Join the country your work created. The alternative, my friend, is standing alone in the water while the old world decides what to do about you — and I say this with love. The old world has never once decided in favor of the new thing’s owner.”',
    choices: [
      {
        label: 'Take the ministry. Become the founding citizen.',
        effects: [{ e: 'end', ending: 'venture_state' }],
        result:
          'The oath takes ninety seconds. The passport is the first one ever printed, numbered 000001, and the elevator becomes the national asset of a country with more capital than most continents. Everything you built is safe now, and sovereign, and no longer exactly yours — a distinction the fireworks over the harbor are very beautiful about.',
      },
      {
        label: 'Refuse — warmly. The cable belongs to no flag.',
        effects: [
          { e: 'rel', who: 'rashid', resp: 2, aff: -1 },
          { e: 'flag', scope: 'company', key: 'refused_ministry', v: true },
          { e: 'stress', d: 4 },
          { e: 'score', d: 2 },
        ],
        goto: 's_b_cold_waters',
        result:
          'Rashid hears the no all the way through, nods slowly, and pours the tea anyway. “Then we are neighbors,” he says, “and neighbors have rules.” On the boat back, Mateo hands you his phone. Aurelia’s harbor authority has published its new schedule of fees, inspections, and transit permits, effective in sixty days, applying to everything that crosses its waters. Which is to say — everything you eat, burn, and build with.',
      },
      {
        label: 'Counter him: a treaty instead. Aurelia hosts, never owns.',
        requires: { k: 'flag', scope: 'company', key: 'territory_struck', cmp: 'eq', v: true },
        effects: [
          { e: 'rel', who: 'rashid', aff: 2, resp: 2 },
          { e: 'flag', scope: 'company', key: 'aurelia_treaty', v: true },
          { e: 'stress', d: 3 },
          { e: 'score', d: 1 },
        ],
        goto: 's_b_cold_waters',
        result:
          'You spend six hours on the terrace drafting it with him directly, Volkov correcting the language like a court reporter with opinions. Aurelia gets prestige, transit fees, and the world’s photographers. The cable keeps its own flag — none. Rashid signs with a flourish and one wistful look at the horizon. “A minister’s office will stay empty for you,” he says. “Founders age. Offers don’t.”',
      },
    ],
  },
  {
    id: 's_b_cold_waters',
    ambience: 'wind',
    kind: 'bridge',
    art: 'world_s_cold_waters',
    title: 'NEIGHBORS WITH RULES',
    prose:
      'Life inside another country’s ring of ocean acquires a rhythm of small frictions. Supply boats wait an extra hour at Aurelia’s inspection buoys. Fees arrive itemized in a currency that did not exist last year. Twice, a “routine customs review” holds a strand shipment just long enough to cost a shift. None of it is hostile, exactly — Volkov’s notes are models of administrative courtesy — and all of it is a language, spoken slowly, that says: you are here because we allow it. Mateo starts a folder titled THE SQUEEZE and files each courtesy in order. The folder gets thick. The world’s capitals watch the arrangement with fascination, and begin, in their own chambers, to ask what it teaches them about handling you.',
    choices: [{ label: 'Continue', effects: [], goto: 's_blockade' }],
  },
]
