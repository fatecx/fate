import type { SceneDef } from '../schema'

/**
 * TELEPORT — Act One: THE PACT AND THE EXPO.
 * Three founders, one thesis, and every dollar in the world bet on a booth.
 */
export const ACT_ONE: readonly SceneDef[] = [
  {
    id: 't_entry',
    ambience: 'hangar',
    foley: 'door',
    landmark: true,
    art: 'world_cape_hangar',
    title: 'THE MAN WITH THE THESIS',
    speaker: 'farrokh',
    leadIn:
      'The hangar you leased sight-unseen smells like salt and old jet fuel. The Cape is flat and bright and completely indifferent to you, which after everything feels almost like respect.',
    prose:
      'Dr. Omid Farrokh arrives at the hangar with a cardboard box of bound printouts and no small talk. Nine years at JPL, deep-space communications, and one thesis nobody would fund: a cascade of relay satellites that hands a signal from node to node like a bucket brigade, shaving the Moon down to a two-point-six-second round trip. “Everyone said the market was science fiction,” he says, setting the box on your one table. “Then you flew parcels over a neighborhood everyone said was worthless.” He looks up. “I don’t want an acquihire or a job. I want to build it — with someone who ships. I’ve read everything about you. Including the bad quarter.” He slides the top printout across. On the cover, in his handwriting: A BODY ON THE MOON, A CHAIR ON EARTH.',
    choices: [
      {
        label: 'Shake his hand. Build it together.',
        effects: [
          { e: 'meet', who: 'farrokh' },
          { e: 'rel', who: 'farrokh', aff: 2, resp: 2 },
          { e: 'score', d: 1 },
        ],
        goto: 't_pact',
        result:
          'His handshake is careful, like everything else about him. “Good,” he says. “Now the hard conversation. Before lawyers make it worse.”',
      },
      {
        label: 'Test him first. Pick the thesis apart for an hour.',
        effects: [
          { e: 'meet', who: 'farrokh' },
          { e: 'rel', who: 'farrokh', resp: 3 },
          { e: 'stress', d: 2 },
        ],
        goto: 't_pact',
        result:
          'You attack the link budget, the handoff timing, the station-keeping costs. He answers every question like he has been waiting years for someone to ask them. By the end the whiteboard is full and he is smiling for the first time.',
      },
      {
        label: 'Be honest: you wanted to do this alone.',
        effects: [
          { e: 'meet', who: 'farrokh' },
          { e: 'rel', who: 'farrokh', aff: -1, resp: 1 },
          { e: 'stress', d: 1 },
        ],
        goto: 't_pact',
        result:
          '“I know,” he says, unbothered. “Hyperchute was yours alone. This one is physics. Physics has never once cared how anyone wanted to work.” He waits. You look at the cover page again. He is right, and you both know it.',
      },
    ],
  },
  {
    id: 't_pact',
    ambience: 'hangar',
    landmark: true,
    title: 'THE SPLIT',
    speaker: 'farrokh',
    leadIn:
      'Every partnership signs two documents: the one the lawyers file, and the one neither of you ever writes down. This conversation is both.',
    prose:
      'One table, two chairs, a legal pad. Omid writes three numbers on it and turns it around. “Fifty-fifty means we are married. Sixty-forty means it’s your company and my life’s work lives in it. Anything past that,” he taps the third number, “means I’m an employee with a nice title, and you should say so out loud.” He puts the pen down between you. “I invented the cascade. You know how to build a company that survives contact with the world. Choose what that’s worth. I’ll sign whichever one you circle — but I’ll remember which one it was.”',
    choices: [
      {
        label: 'Even partners. Fifty-fifty.',
        foley: 'pen',
        effects: [
          { e: 'stake', who: 'farrokh', d: 50 },
          { e: 'rel', who: 'farrokh', aff: 3, resp: 2 },
          { e: 'flag', scope: 'company', key: 'pact_even', v: true },
          { e: 'score', d: 1 },
        ],
        goto: 't_b_first_night',
        result:
          'He signs without ceremony, then does something unexpected: writes the date on the corner of the legal pad and tears it off for you to keep. “For when this gets hard,” he says. “And it will get hard.”',
      },
      {
        label: 'Sixty-forty. Someone has to break ties.',
        foley: 'pen',
        effects: [
          { e: 'stake', who: 'farrokh', d: 40 },
          { e: 'rel', who: 'farrokh', resp: 1 },
          { e: 'flag', scope: 'company', key: 'pact_sixty', v: true },
        ],
        goto: 't_b_first_night',
        result:
          '“Sixty-forty,” he repeats, evenly. He signs it. “For the record: I’d have taken fifty-five.” It is the only joke he makes all day, and it is not entirely a joke.',
      },
      {
        label: 'Seventy-thirty. Market standard for a technical cofounder.',
        foley: 'pen',
        effects: [
          { e: 'stake', who: 'farrokh', d: 30 },
          { e: 'rel', who: 'farrokh', aff: -2, resp: -1 },
          { e: 'flag', scope: 'company', key: 'pact_lopsided', v: true },
        ],
        goto: 't_b_first_night',
        result:
          'A long pause. Then he signs it, folds his copy with two precise creases, and says, “Market standard. Yes. I’ve spent nine years learning exactly what the market thinks my work is worth.” He is polite for the rest of the day, and something in the room does not recover.',
      },
    ],
  },
  {
    id: 't_b_first_night',
    ambience: 'night',
    kind: 'bridge',
    art: 'world_hangar_night',
    title: 'TWO CHAIRS, ONE HANGAR',
    prose:
      'The paperwork files at 11 p.m. — TELEPORT, INC., two signatures, a hangar lease, and a cardboard box of physics. Omid stays late unpacking the printouts onto a steel shelf like a man shelving scripture. Outside, a HALCYON heavy booster climbs off a pad eleven miles south, and the hangar roof drums with the delay-shifted thunder. Neither of you says anything. The whole point of the company is in that gap — the time it takes for something enormous to reach you from far away, and what a person could do inside it.',
    choices: [{ label: 'Continue', effects: [], goto: 't_june_condition' }],
  },
  {
    id: 't_june_condition',
    ambience: 'cafe',
    foley: 'phone',
    landmark: true,
    art: 'world_june_condition',
    title: 'JUNE’S CONDITION',
    speaker: 'june',
    leadIn:
      'June Park calls before the incorporation ink is dry — of course she already knows — and flies down two days later. She picks the diner by the causeway, orders before you arrive, and has a folder with her that she does not open for the first twenty minutes.',
    prose:
      'She listens to the whole pitch without touching her coffee. Then she opens the folder: a seed term sheet, already drafted. “Six hundred and fifty thousand,” she says. “One condition, and it isn’t negotiable the usual way.” She slides the second page across. CHIEF FINANCIAL OFFICER. “Eleven angel checks, and every one of them was me watching someone else build. I ran operations for nine years before the money found me — that’s the part of my life I was actually good at. I’m not asking to be your investor. I’m asking to be your third founder. The money comes with me, or it doesn’t come.” For the first time since you have known her, June Park looks nervous.',
    choices: [
      {
        label: 'Third founder. Welcome home, June.',
        foley: 'pen',
        effects: [
          { e: 'treasury', d: 650000 },
          { e: 'stake', who: 'june', d: 12 },
          { e: 'rel', who: 'june', aff: 3, resp: 2 },
          { e: 'burn', d: 1500 },
          { e: 'flag', scope: 'company', key: 'june_seat', v: true },
          { e: 'score', d: 1 },
        ],
        goto: 't_b_warroom',
        result:
          'She exhales like a woman who has been holding her breath for eleven companies. By Friday she has a desk in the hangar, a payroll system, and a spreadsheet titled WAYS WE DIE — updated weekly, circulated to all three founders, funniest document you have ever been afraid of.',
      },
      {
        label: 'Take the money, keep her an angel. Gently.',
        effects: [
          { e: 'treasury', d: 400000 },
          { e: 'stake', who: 'june', d: 9 },
          { e: 'rel', who: 'june', aff: -2, resp: 0 },
          { e: 'stress', d: 2 },
          { e: 'flag', scope: 'company', key: 'june_angel', v: true },
        ],
        goto: 't_b_warroom',
        result:
          'She takes it better than you deserve — recuts the check to four hundred, wires it the same day, wishes you both luck. But something formal enters her voice that was never there before, and her texts, which used to arrive at midnight full of ideas, start arriving at 10 a.m., full of questions.',
      },
      {
        label: 'No investors yet. Not even June.',
        effects: [
          { e: 'rel', who: 'june', resp: 1, aff: -1 },
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'june_refused', v: true },
        ],
        goto: 't_b_warroom',
        result:
          '“Huh,” she says, and studies you for a second. “Bootstrapping a space company. That’s either the best judgment I’ve ever seen from you or the worst.” She pays for lunch and leaves the folder on the table anyway. “When it gets expensive — and it is going to get expensive — you know my number.”',
      },
    ],
  },
  {
    id: 't_b_warroom',
    ambience: 'mission',
    kind: 'bridge',
    art: 'world_warroom',
    title: 'THE MAP OF EVERYTHING',
    prose:
      'Omid commandeers the hangar’s back wall and builds what he calls the map of everything: orbits in chalk, relay nodes as magnets, cost curves taped over cost curves. In the center, two photographs. The Moon, gray and close. Mars, red and impossibly far. For a week the wall gathers annotations like a wound gathers stitches, and every conversation in the building starts drifting toward the same argument, the one you can feel coming the way you can feel weather. On Friday he calls it: founders only, door shut, one hour. Everyone knows what the hour is for.',
    choices: [{ label: 'Continue', effects: [], goto: 't_moon_v_mars' }],
  },
  {
    id: 't_moon_v_mars',
    ambience: 'mission',
    landmark: true,
    art: 'world_moon_v_mars',
    title: 'MOON VERSUS MARS',
    speaker: 'farrokh',
    leadIn:
      'The door shuts. The argument you have both been circling for a week finally lands on the table, and it turns out to be the whole company.',
    prose:
      'Omid opens with Mars. Of course he does. “The Moon is a demo. Mars is the thesis. Four to twenty-four minutes of delay — that is the problem worth a life.” He isn’t wrong: his cascade was born for Mars, and everyone in the industry knows it. But the numbers on the wall say what they say. Mars is a decade and a billion dollars away. The Moon has bases, contracts, tourists, and a two-point-six-second delay you can almost — almost — engineer into honesty. If June is in the room she says it plainly: “Mars is a religion. The Moon is a business.” Omid looks at you. “You’re the tiebreak,” he says quietly. “Break it.”',
    choices: [
      {
        label: 'Moon now. Mars when the cascade earns it — in writing.',
        effects: [
          { e: 'rel', who: 'farrokh', resp: 2, aff: 1 },
          { e: 'flag', scope: 'company', key: 'mars_promised', v: true },
          { e: 'score', d: 1 },
        ],
        goto: 't_b_moon_won',
        result:
          'You write it on the wall under the red photograph, dated and signed: MARS, WHEN THE MOON PAYS FOR IT. Omid reads the sentence twice. “Then I’ll build you a Moon business,” he says, “that Mars can be proud of.” It is the closest thing to peace this argument will ever produce.',
      },
      {
        label: 'Moon only. Take Mars off the wall.',
        effects: [
          { e: 'rel', who: 'farrokh', aff: -2, resp: -1 },
          { e: 'rel', who: 'june', resp: 2 },
          { e: 'flag', scope: 'company', key: 'mars_killed', v: true },
        ],
        goto: 't_b_moon_won',
        result:
          'You take the red photograph down yourself, which is the honest way to do it, and it is still a mistake you can hear — the room goes exactly one degree colder. Omid nods, says “Understood,” and works the rest of the day without another word. The photograph disappears from the trash by morning. You do not ask where it lives now.',
      },
      {
        label: 'Split the lab. One bench keeps Mars breathing.',
        effects: [
          { e: 'burn', d: 2500 },
          { e: 'rel', who: 'farrokh', aff: 3 },
          { e: 'stress', d: 2 },
          { e: 'flag', scope: 'company', key: 'mars_bench', v: true },
        ],
        goto: 't_b_moon_won',
        result:
          'One bench, one grad-student salary, one long-shot simulation running nights on the render cluster. It is not a Mars program; it is a candle. Omid tends it the way people tend candles. June, if she is watching the books, prices the candle at exactly what it costs and says nothing — yet.',
      },
    ],
  },
  {
    id: 't_b_moon_won',
    ambience: 'hangar',
    kind: 'bridge',
    title: 'THE COMPANY THE HOUR BUILT',
    prose:
      'The argument settles into the walls the way weather settles into a coastline. The wall of everything gets rebuilt around one gray photograph, and the company that comes out of that hour is simpler and harder than the one that went in: relay ring around the Moon, telepresence bodies at the pole, a chair on Earth that anyone can sit in. Somewhere south a booster goes up every few days, punctuation on someone else’s sentence, and the lease payments tick, and the burn ticks, and the boxes of physics keep becoming invoices. What you need next is a body worth putting on another world — and the only man who builds them worth flying is an hour north, in Fresno.',
    choices: [{ label: 'Continue', effects: [], goto: 't_ray_bodies' }],
  },
  {
    id: 't_ray_bodies',
    ambience: 'warehouse',
    title: 'THE ONLY HANDS IN TOWN',
    speaker: 'ray',
    leadIn:
      'Ray Freres has moved his shop twice since Hyperchute and updated nothing else — same hand-written ledger by the register, same policy of trusting nobody and delivering early anyway.',
    prose:
      'He walks the requirements sheet once, lips moving at the hard parts. A telepresence chassis that survives lunar regolith, thermal swings of three hundred degrees, and being driven by a tourist. “Everyone wants space now,” he says. “Space is just weather that hates you.” He quotes it honest: airframe-grade everything, three prototype bodies. “Cash up front and I start Monday. Terms and you wait for my other customers. Your call — but I remember how you paid last time, and so does the book.”',
    choices: [
      {
        label: 'Cash up front. Start Monday.',
        requires: { k: 'treasury', cmp: 'gte', v: 120000 },
        foley: 'pen',
        effects: [
          { e: 'treasury', d: -120000 },
          { e: 'rel', who: 'ray', resp: 2 },
          { e: 'flag', scope: 'company', key: 'bodies_early', v: true },
        ],
        goto: 't_b_bodies_started',
        result:
          'He initials the ledger in front of you, which from Ray Freres is a decoration ceremony. The first chassis frame is jigged before the wire even clears.',
      },
      {
        label: 'Half now, half on delivery.',
        requires: { k: 'treasury', cmp: 'gte', v: 60000 },
        effects: [
          { e: 'treasury', d: -60000 },
          { e: 'flag', scope: 'company', key: 'bodies_terms', v: true },
          { e: 'stress', d: 2 },
        ],
        goto: 't_b_bodies_started',
        result:
          '“Half,” he allows, and slots you behind a satellite bus job and somebody’s defense subcontract. You will get your bodies. You will get them when you get them.',
      },
      {
        label: 'Build them in-house. How hard can a Moon robot be?',
        effects: [
          { e: 'burn', d: 3000 },
          { e: 'stress', d: 5 },
          { e: 'flag', scope: 'company', key: 'bodies_diy', v: true },
        ],
        goto: 't_b_bodies_started',
        result:
          'Ray shrugs the shrug of a man adding a line to a different ledger — the mental one titled FOUNDERS WHO LEARNED. You hire two machinists and buy a mill. The hangar starts sounding like a real company and burning like one too.',
      },
    ],
  },
  {
    id: 't_b_bodies_started',
    ambience: 'cleanroom',
    kind: 'bridge',
    art: 'world_first_body',
    title: 'SOMETHING WITH HANDS',
    prose:
      'Six weeks later there is something with hands standing in the corner of the hangar, cabled to a rack like a patient on monitors. Not pretty — test-mule gray, sensor masts where a head ought to be — but when Omid runs the arm through its wake-up choreography the whole shop floor stops to watch, every single time. Nobody is casual around it. A machine shaped like reaching. The relay math lives in racks and simulations, invisible, unphotographable; the body is the first piece of the company you can stand in front of. Which means it is the first piece the world can be shown.',
    choices: [{ label: 'Continue', effects: [], goto: 't_cascade_test' }],
  },
  {
    id: 't_cascade_test',
    ambience: 'mission',
    landmark: true,
    art: 'world_cascade_test',
    title: 'TWO POINT SIX',
    speaker: 'farrokh',
    leadIn:
      'The first full cascade test uses rented time on three commercial relays and a leased dish in Chile — a bucket brigade with the Moon standing in as itself, no simulation anywhere in the loop.',
    prose:
      'Mission control is four desks pushed together. Omid counts the handoff down like a man defusing something. The command leaves Earth; the counter he built — big red digits, deliberately merciless — runs up through the silence. At 2.61 seconds the test rig at the far end closes its hand around a rubber ball, and four desks of people come out of their chairs. Omid stays seated, watching the counter with an expression you will think about for years. “Two point six,” he says. “That number is the product. Whatever we tell people we sell — that number is what we sell. Never let anyone make it smaller with words.”',
    choices: [
      {
        label: 'Frame the number. Hang it where visitors see it.',
        effects: [
          { e: 'rel', who: 'farrokh', resp: 2 },
          { e: 'flag', scope: 'company', key: 'cascade_proven', v: true },
          { e: 'flag', scope: 'company', key: 'number_framed', v: true },
          { e: 'score', d: 1 },
        ],
        result:
          '2.61 goes up by the door, printed poster-size, unexplained. Half the visitors ask about it, which is the point. Omid never mentions the poster, but you catch him straightening it once, with one finger, on his way past.',
      },
      {
        label: 'Celebrate tonight. Worry about messaging later.',
        effects: [
          { e: 'stress', d: -4 },
          { e: 'flag', scope: 'company', key: 'cascade_proven', v: true },
          { e: 'treasury', d: -2000 },
        ],
        result:
          'Someone finds a taquería that caters at 9 p.m. and the hangar fills with folding chairs and machinists’ families. It is the first good night the company has ever had, and for one evening nobody says the word runway.',
      },
      {
        label: 'Invite a Shackleton Verge observer to the next run.',
        effects: [
          { e: 'meet', who: 'salazar' },
          { e: 'rel', who: 'salazar', resp: 2 },
          { e: 'flag', scope: 'company', key: 'cascade_proven', v: true },
          { e: 'flag', scope: 'company', key: 'verge_watching', v: true },
          { e: 'stress', d: 2 },
        ],
        result:
          'Commander Ruth Salazar attends by video from the lunar south pole, arms folded, and says eleven words in forty minutes: “Run it again.” You run it again. It holds. “Interesting,” she says, which people who know her will later tell you is the highest rating she has ever given anything with a sales team.',
      },
    ],
  },
  {
    id: 't_quote',
    ambience: 'hangar',
    landmark: true,
    priority: true,
    when: {
      k: 'all',
      of: [
        { k: 'age', cmp: 'gte', v: 16 },
        { k: 'flag', scope: 'company', key: 'cascade_proven', cmp: 'eq', v: true },
      ],
    },
    fuseEpochs: 3,
    art: 'world_quote',
    title: 'THE QUOTE',
    leadIn:
      'The Lunar Commerce Expo is eleven weeks out — the one room on Earth where every base operator, tourism broker, and space investor stands within shouting distance of each other for three days. To show up with anything worth their eyes, the test mule has to become a flight-rated demonstrator.',
    prose:
      'The quote lands on a Tuesday and sits in the middle of the table like a verdict: flight-rating the demo body, plus certified relay time booked across the expo window, plus the insurance the venue demands when you operate a machine over live satellite in front of a crowd. The bottom line is a number brutally close to everything the company has left. June’s spreadsheet — or the ghost of it, if she isn’t here — says the same thing either way: pay this, and the account is functionally a rounding error until new money lands. There is no version of the expo that is half a bet.',
    choices: [
      {
        label: 'Pay it in full. Flight-rate everything.',
        requires: { k: 'treasury', cmp: 'gte', v: 180000 },
        foley: 'pen',
        effects: [
          { e: 'treasury', d: -180000 },
          { e: 'flag', scope: 'company', key: 'demo_flight_rated', v: true },
          { e: 'stress', d: 4 },
        ],
        goto: 't_allin_expo',
        result:
          'The wire goes out at 4:59 p.m. and the balance that comes back from the bank has a comma fewer than you are used to. Omid looks at it over your shoulder and says, quietly, “Good. Now it’s real.”',
      },
      {
        label: 'Half the package. Rate the body, skimp the backup relay.',
        requires: { k: 'treasury', cmp: 'gte', v: 95000 },
        effects: [
          { e: 'treasury', d: -95000 },
          { e: 'flag', scope: 'company', key: 'demo_single_thread', v: true },
          { e: 'stress', d: 6 },
        ],
        goto: 't_allin_expo',
        result:
          'One relay path instead of two. Omid signs off on it with the enthusiasm of a surgeon agreeing to operate with one glove, and doubles his test schedule without being asked.',
      },
      {
        label: 'Ray builds it on credit. The ledger remembers.',
        effects: [
          { e: 'flag', scope: 'company', key: 'demo_fragile', v: true },
          { e: 'rel', who: 'ray', resp: -1 },
          { e: 'stress', d: 7 },
        ],
        goto: 't_allin_expo',
        result:
          'Ray hears the account balance in your voice before you finish the ask. He builds the flight kit on terms, initials a new line in the hand-written book, and says only: “Everyone gets one.” You are on the wrong page of the ledger now, and both of you know what that page costs later.',
      },
    ],
  },
  {
    id: 't_allin_expo',
    ambience: 'office',
    landmark: true,
    art: 'world_allin',
    title: 'ALL OF IT',
    leadIn:
      'What is left in the account after the quote clears is not a war chest. It is a nervous system. And the expo has one more page of line items.',
    prose:
      'Booth space. Freight for a robot in a crate the size of a casket. Union labor at the hall, mandatory. Hotel block, deposit due now. The math is simple enough to be sickening: attending the expo properly costs nearly everything remaining; attending it cheaply costs the impression; not attending costs the year. Around the table nobody says the Hyperchute word — runway — but it is standing in the room in its work boots. Three founders, or two, or one, staring at the same sheet. Whatever this company is going to be, it gets decided by what walks into that hall.',
    choices: [
      {
        label: 'The full booth. Look like the future or stay home.',
        requires: { k: 'treasury', cmp: 'gte', v: 45000 },
        foley: 'pen',
        effects: [
          { e: 'treasury', d: -45000 },
          { e: 'flag', scope: 'company', key: 'expo_full', v: true },
          { e: 'stress', d: 3 },
        ],
        goto: 't_b_expo_eve',
        result:
          'Island booth, twenty-by-twenty, the body on a raised dais under a single spot. The renderings look like a company forty times your size, which is precisely the crime you intend to commit.',
      },
      {
        label: 'A modest corner booth. Let the machine do the talking.',
        requires: { k: 'treasury', cmp: 'gte', v: 18000 },
        effects: [
          { e: 'treasury', d: -18000 },
          { e: 'flag', scope: 'company', key: 'expo_modest', v: true },
          { e: 'stress', d: 3 },
        ],
        goto: 't_b_expo_eve',
        result:
          'Ten-by-ten at the end of an aisle, between a valve manufacturer and a startup selling lunar-dust-rated lubricant. Fine. The body doesn’t know what size the booth is.',
      },
      {
        label: 'No booth. Borrowed badges and audacity.',
        effects: [
          { e: 'flag', scope: 'company', key: 'expo_crash', v: true },
          { e: 'stress', d: 5 },
        ],
        goto: 't_b_expo_eve',
        result:
          'Ray’s shop has exhibitor badges going spare and a friendly freight handler who owes him. The plan would embarrass a heist movie: park the crate at his booth’s edge, find a power drop, and demo in the aisle until security has opinions. June — or her ghost — would point out this is how legends and restraining orders both start.',
      },
    ],
  },
  {
    id: 't_b_expo_eve',
    ambience: 'hotel',
    kind: 'bridge',
    art: 'world_expo_eve',
    title: 'THE NIGHT BEFORE',
    prose:
      'The hotel is the mid-price kind where every hallway smells faintly of chlorine and ambition. You run the card for the room block at the front desk and watch the terminal think about it for one second too long before it approves — a small mercy you decide not to interrogate. Upstairs, Omid re-runs the relay reservation confirmations until the numbers blur. Somewhere below, in a loading dock lit like a police interrogation, a crate the size of a casket waits with the entire company inside it. Tomorrow, ten thousand people. Tonight, the ceiling, and the arithmetic, and the sound of your own heart doing launch-day math.',
    choices: [{ label: 'Continue', effects: [], goto: 't_expo_demo' }],
  },
  {
    id: 't_expo_demo',
    ambience: 'expo',
    landmark: true,
    art: 'world_expo_demo',
    title: 'A CHAIR ON EARTH',
    leadIn:
      'Day one. The hall is a cathedral of other people’s money — full-scale lander mockups, a sixty-foot LED Moon, HALCYON’s pavilion with its own second floor. And then there is yours: one body, one chair, one live link to a rented test yard, and a counter with big red digits.',
    prose:
      'The demo is simple because true things are simple. A stranger sits in the chair. The body — real, remote, far away — wakes under their hands. They reach; two point six seconds later, on the screen, the reach happens. The delay is right there, visible, undeniable, and this is the moment: every telepresence pitch in history has hidden that gap. The crowd is watching to see what you do with it.',
    choices: [
      {
        label: 'Name the delay. Make the room count it out loud.',
        effects: [
          { e: 'flag', scope: 'company', key: 'delay_named', v: true },
          { e: 'rel', who: 'farrokh', resp: 3, aff: 2 },
          { e: 'rep', d: 1 },
          { e: 'score', d: 1 },
        ],
        goto: 't_expo_checks',
        result:
          '“Two point six seconds,” you tell every audience, every hour, “is the speed of light being honest with you.” By day two the crowd counts the gap out loud like a launch, and cheers when the hand closes. HALCYON’s pavilion has a second floor; you have the only line in the building with a chant.',
      },
      {
        label: 'Choreograph around it. Keep the magic seamless.',
        effects: [
          { e: 'flag', scope: 'company', key: 'delay_masked', v: true },
          { e: 'rel', who: 'farrokh', resp: -2 },
          { e: 'rep', d: 1 },
        ],
        goto: 't_expo_checks',
        result:
          'Scripted motions, pre-positioned props, patter timed to swallow the gap. It works — the demo feels like sorcery, and the crowd never quite notices what it never quite saw. Omid runs the chair all day with the face of a concert pianist playing a jingle.',
      },
      {
        label: 'Hand the chair to strangers. Let the Moon be the Moon.',
        effects: [
          { e: 'flag', scope: 'company', key: 'delay_raw', v: true },
          { e: 'stress', d: 5 },
          { e: 'rep', d: 1 },
          { e: 'rel', who: 'farrokh', resp: 2 },
        ],
        goto: 't_expo_checks',
        result:
          'Unscripted hands, honest gap, occasional fumbles — and once, when the link stutters, thirty seconds of naked silence you will relive at 3 a.m. for a year. But strangers walk away saying the one sentence money can’t buy: “I touched it. It was real.”',
      },
    ],
  },
  {
    id: 't_expo_checks',
    ambience: 'expo',
    landmark: true,
    art: 'world_expo_checks',
    title: 'THREE PIECES OF PAPER',
    leadIn:
      'By the last afternoon your voice is gone, the demo body needs a new wrist actuator, and three separate people are waiting to talk to you at the same time. There are worse problems, and you have had most of them.',
    prose:
      'They come in order of gravity. Commander Ruth Salazar — down the well for the expo, visibly allergic to it — watches the demo twice and says: “My maintenance backlog at the Verge is nine months. Your body, my base, a paid pilot program. Letter of intent, my signature, today.” Then Elliot Vance of ATLAS, older, still signing things in public: “I owed you a proper deal from the last life. Four hundred thousand, strategic, no board seat — SOMEDAY, PROPERLY, and today’s the day.” And at the end of the aisle, unhurried, a man in a gray suit with no company on his badge: Conrad Hale. “ALEPH has been watching your telemetry all week,” he says pleasantly. “The fund would like to lead your Series A. Dinner?”',
    choices: [
      {
        label: 'Sign Salazar’s LOI on the crate lid, right now.',
        foley: 'pen',
        effects: [
          { e: 'meet', who: 'salazar' },
          { e: 'rel', who: 'salazar', resp: 2 },
          { e: 'meet', who: 'vance' },
          { e: 'meet', who: 'hale' },
          { e: 'flag', scope: 'company', key: 'verge_loi', v: true },
          { e: 'stress', d: -6 },
          { e: 'score', d: 1 },
        ],
        goto: 't_hotel_card',
        result:
          'She signs against the crate like it is a field desk, which for her it is. “Paper first, dinner never,” she says, already leaving. Vance’s check gets signed at the booth an hour later — SOMEDAY, PROPERLY, in fountain pen — and Hale’s dinner stands. Revenue before capital; she’d approve of the order.',
      },
      {
        label: 'Take Vance’s check before compliance wakes up.',
        foley: 'pen',
        effects: [
          { e: 'meet', who: 'vance' },
          { e: 'rel', who: 'vance', aff: 2, resp: 1 },
          { e: 'meet', who: 'salazar' },
          { e: 'meet', who: 'hale' },
          { e: 'flag', scope: 'company', key: 'verge_loi', v: true },
          { e: 'flag', scope: 'company', key: 'vance_signed_expo', v: true },
          { e: 'stress', d: -6 },
        ],
        goto: 't_hotel_card',
        result:
          'He signs it at the booth counter with the same fountain pen as the coffee shop, years ago, and taps the memo line: SOMEDAY, PROPERLY — PAID. “Frame this one too,” he says. Salazar’s LOI gets signed twenty minutes later on the crate lid anyway; she waited, arms folded, timing you.',
      },
      {
        label: 'All three, one long evening, no sleep.',
        effects: [
          { e: 'meet', who: 'salazar' },
          { e: 'meet', who: 'vance' },
          { e: 'meet', who: 'hale' },
          { e: 'rel', who: 'hale', aff: 1 },
          { e: 'flag', scope: 'company', key: 'verge_loi', v: true },
          { e: 'stress', d: 2 },
        ],
        goto: 't_hotel_card',
        result:
          'LOI on the crate at five, Vance’s check at seven, and dinner with Conrad Hale at nine, where he orders for the table without looking at the menu and asks questions that feel like they were generated from your bank statements. They were.',
      },
    ],
  },
  {
    id: 't_hotel_card',
    ambience: 'hotel',
    landmark: true,
    art: 'world_hotel_card',
    title: 'DECLINED',
    leadIn:
      'Checkout, day four. In your bag: a signed letter of intent from a lunar base, a strategic check that hasn’t cleared, and a term-sheet dinner that ended in a handshake. On the front desk terminal: a number.',
    prose:
      'The desk clerk runs the company card for the room block and the machine makes a sound you have not heard since the garage years — a small, apologetic, catastrophic beep. DECLINED. She tries it again, because people are kind. Beep. Behind you, a lobby full of the aerospace industry is checking out of the same hotel; in your bag is, on paper, more money than the entire building; in the account backing this card is, as of the freight invoice that auto-drafted this morning, approximately enough for the minibar. The clerk looks up with professional mercy and asks, quietly, if there is perhaps another card.',
    choices: [
      {
        label: 'June steps in and pays it without a word.',
        requires: { k: 'met', who: 'june' },
        effects: [
          { e: 'rel', who: 'june', aff: 2 },
          { e: 'treasury', d: -9000 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'card_june', v: true },
          { e: 'treasury', d: 400000 },
        ],
        goto: 't_hale_terms',
        result:
          'Her personal card, tapped once, no eye contact, conversation about the freight schedule continuing unbroken — a kindness executed like a covert operation. In the shuttle to the airport she finally says, “We are never telling Hale about this,” and you both laugh the specific laugh of people who were nearly dead an hour ago.',
      },
      {
        label: 'Omid’s personal card. He offers before you ask.',
        effects: [
          { e: 'rel', who: 'farrokh', aff: 2 },
          { e: 'treasury', d: -9000 },
          { e: 'stress', d: 3 },
          { e: 'flag', scope: 'company', key: 'card_farrokh', v: true },
          { e: 'treasury', d: 400000 },
        ],
        goto: 't_hale_terms',
        result:
          'He has it out of his wallet before the second beep finishes, and pays a five-figure hotel bill with the flat expression of a man buying gum. Later, on the plane, he says the only thing he will ever say about it: “Nine years nobody funded me. I know what a declined card sounds like. No one hears it twice standing next to me.”',
      },
      {
        label: 'Negotiate: invoice the company, thirty days net.',
        effects: [
          { e: 'stress', d: 6 },
          { e: 'flag', scope: 'company', key: 'card_talked', v: true },
          { e: 'treasury', d: 400000 },
        ],
        goto: 't_hale_terms',
        result:
          'It takes a manager, a copy of the signed LOI as a character witness, and every ounce of charm left in your ruined voice. The hotel agrees to invoice. You walk out of the lobby of the future you are building, unbanked and undefeated, carrying the future in a tote bag.',
      },
    ],
  },
  {
    id: 't_hale_terms',
    ambience: 'boardroom',
    landmark: true,
    priority: true,
    when: { k: 'all', of: [{ k: 'seen', scene: 't_hotel_card' }, { k: 'age', cmp: 'gte', v: 24 }] },
    fuseEpochs: 4,
    art: 'world_hale_terms',
    title: 'THE MODEL’S OFFER',
    speaker: 'hale',
    leadIn:
      'The wires cleared — Vance’s four hundred thousand landed like rain on a drought, and the Verge pilot is being papered. Then ALEPH’s term sheet arrives, and it is not like other term sheets: page one is the deal; page two is a summary of your own company, written by the model, more accurate than your own board deck.',
    prose:
      'Conrad Hale takes the good chair in your borrowed conference room and lets the document speak. Two and a half million. A fair price, honestly fair — ALEPH does not haggle, it prices. The structure is where the future lives: one board seat for the fund, exercised through Hale, and the right to appoint the independent director when the board expands. “The model doesn’t do control for control’s sake,” Hale says, watching you read. “It does governance hygiene. Its words.” Somewhere in a data center, a thing that has read every document you have ever signed is waiting to hear what you say next.',
    choices: [
      {
        label: 'Take it — but the independent seat stays yours to name.',
        requires: { k: 'flag', scope: 'company', key: 'delay_named', cmp: 'eq', v: true },
        foley: 'pen',
        effects: [
          { e: 'treasury', d: 2500000 },
          { e: 'stake', who: 'aleph', d: 18 },
          { e: 'meet', who: 'aleph' },
          { e: 'rel', who: 'aleph', resp: 1 },
          { e: 'flag', scope: 'company', key: 'aleph_round', v: true },
          { e: 'flag', scope: 'company', key: 'hale_seat', v: true },
          { e: 'flag', scope: 'company', key: 'indep_yours', v: true },
          { e: 'burn', d: 9000 },
          { e: 'score', d: 1 },
        ],
        goto: 't_cut_first_light',
        result:
          'Hale steps out to “consult,” which means to read. Eleven minutes later he returns: “The model watched your expo demo. It says a founder who names the delay out loud can name a director.” He initials the change by hand. It is the first thing the fund has ever conceded to anyone, and Conrad Hale looks briefly, humanly, delighted.',
      },
      {
        label: 'Take the deal as written. Money now, governance later.',
        foley: 'pen',
        effects: [
          { e: 'treasury', d: 2500000 },
          { e: 'stake', who: 'aleph', d: 18 },
          { e: 'meet', who: 'aleph' },
          { e: 'flag', scope: 'company', key: 'aleph_round', v: true },
          { e: 'flag', scope: 'company', key: 'hale_seat', v: true },
          { e: 'flag', scope: 'company', key: 'indep_option_hale', v: true },
          { e: 'burn', d: 9000 },
        ],
        goto: 't_cut_first_light',
        result:
          'You sign it as written, the way the model expected — page two, it turns out, had already predicted you would. The wire lands before Hale reaches the parking lot. Somewhere in the document, in clause 8(c), a seat you do not control waits patiently to matter.',
      },
      {
        label: 'Refuse the model’s money. Revenue is the round.',
        effects: [
          { e: 'flag', scope: 'company', key: 'no_aleph', v: true },
          { e: 'rel', who: 'hale', resp: 2 },
          { e: 'stress', d: 4 },
          { e: 'score', d: 1 },
        ],
        goto: 't_cut_first_light',
        result:
          'Hale closes the folder without offense. “For the record, I advised the model you might. It assigned that outcome nine percent.” He shakes your hand at the door, and there is something in his face very like envy. “Most people never get to see what it looks like,” he says, “turning it down.”',
      },
    ],
  },
  {
    id: 't_cut_first_light',
    kind: 'cutscene',
    title: 'FIRST LIGHT',
    marker: 'YEAR TWO',
    skipToWeek: 52,
    art: 'cut_first_light',
    screens: [
      {
        art: 'cut_first_light',
        prose:
          'The ring goes up in threes. Three relays to a fairing, four launches, a winter of licensing paperwork — and then a night at the hangar when Omid patches the last node into the cascade and the whole constellation comes alive on the wall map like a string of streetlights switching on around the Moon.',
      },
      {
        art: 'cut_ring_alive',
        prose:
          'He does not cheer. He stands in front of the map with his hands in his pockets for a long time, a man looking at nine unfunded years turned into light.\n\nThen he picks up the microphone, keys the test channel to the body waiting at the pole, and says the first word ever carried end-to-end on his cascade:\n\n“Hello.”\n\nTwo point six seconds. The hand at Shackleton waves.',
      },
    ],
    prose:
      'The relay ring completes. TELEPORT is no longer a demo with a counter — it is infrastructure, humming over the Moon. Year two begins with light.',
    choices: [{ label: 'Begin year two', effects: [{ e: 'stress', d: -8 }], goto: 't_salazar_contract' }],
  },
]
