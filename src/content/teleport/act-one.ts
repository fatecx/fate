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
      'The hangar you leased sight unseen smells of salt and old jet fuel. The Cape lies flat and bright outside. After the last company, its calm feels almost like respect.',
    prose:
      'Dr. Omid Farrokh arrives with a cardboard box of bound printouts and a silence where small talk would go. He spent nine years at JPL, NASA’s space lab, trying to fund one idea: a chain of relay satellites that passes a signal from one satellite to the next, cutting a Moon round trip to 2.6 seconds. “Everyone called the market science fiction,” he says, setting the box on your one table. “Then you flew parcels over a neighborhood everyone ignored.” He looks up. “I want my work built, with my name on it, beside someone who ships. I read everything about you, including the bad quarter.” He slides over the top printout. On the cover, in his handwriting: A BODY ON THE MOON, A CHAIR ON EARTH.',
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
          'His handshake is careful, like the rest of him. “Good,” he says. “Now we have the hard talk. Better before lawyers enter the room.”',
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
          'You press on signal strength, handover timing, and the fuel needed to keep satellites in place. He answers as if he has waited years for real questions. By the end, the whiteboard is full, and he is smiling for the first time.',
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
          '“I know,” he says, calm. “Hyperchute was yours alone. This one is physics, and physics has never cared how any founder likes to work.” He waits while you look at the cover page again. He is right, and both of you know it.',
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
      'Before lawyers arrive, Omid wants the real deal in plain language: who owns what, who decides, and what each of you is worth.',
    prose:
      'At one table, Omid writes three splits on a legal pad. “Fifty-fifty means true partners. Sixty-forty means you lead the company and my life’s work lives inside it. Past that,” he taps the third number, “I become an employee with a nice title, and we should say that clearly.” He puts the pen between you. “I invented the relay chain. You know how to make a company survive the world. Circle the number that matches that. I’ll sign it. I’ll also remember it.”',
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
          'He signs without ceremony. Then he writes the date on the corner of the legal pad and tears it off for you to keep. “For when this gets hard,” he says. “It will.”',
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
          '“Sixty-forty,” he repeats. He signs. “For the record: I’d have taken fifty-five.” It is his only joke all day, and the joke carries weight.',
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
          'A long pause. He signs, folds his copy with two exact creases, and says, “Market standard. Yes. I have spent nine years learning what the market thinks my work is worth.” He stays polite for the rest of the day. The room loses something.',
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
      'At 11 p.m. the paperwork files. TELEPORT, INC., two signatures, a hangar lease, and a cardboard box of physics. Omid stays late, laying his printouts on a steel shelf like sacred books. Outside, a HALCYON rocket climbs from a pad eleven miles south. You see the light first. The thunder reaches the roof a few seconds later because sound is slow and the rocket is far away. Neither of you speaks. That gap becomes the whole company — the time it takes for a far thing to reach you, and what a person can do before it does.',
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
      'June Park calls before the incorporation ink is dry. Of course she already knows. Two days later she flies to the Cape, picks the diner by the causeway, orders before you arrive, and sets a closed folder beside her coffee.',
    prose:
      'June listens to the whole pitch without touching her coffee, then opens the folder and slides a seed term sheet across the table, already drafted. “Six hundred and fifty thousand,” she says. “One condition. The money comes with me.” The second page reads CHIEF FINANCIAL OFFICER. “I wrote eleven angel checks and watched other people do the building. Before the money found me, I ran operations for nine years, and that was the work I was actually good at. I’m asking to be your third founder.” For the first time since you have known her, June looks nervous.',
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
          'She exhales like a woman who held her breath through eleven companies. By Friday she has a desk in the hangar, a payroll system, and a spreadsheet titled WAYS WE DIE. She updates it every week, sends it to all three founders, and somehow makes it the funniest document you fear.',
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
          'She takes it better than you deserve. She cuts the check to four hundred, wires it that day, and wishes you both luck. Her voice turns formal. Her texts, which once came at midnight full of ideas, now arrive at 10 a.m. full of questions.',
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
          '“Huh,” she says, studying you. “Bootstrapping a space company. Best judgment I’ve ever seen from you, or worst.” She pays for lunch and leaves the folder on the table. “When it gets expensive, and it will, you know my number.”',
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
      'Omid takes over the hangar’s back wall and builds what he calls the map of everything — flight paths around the Moon drawn in chalk, magnets standing in for relay satellites, cost charts taped over older cost charts. In the center hang two photographs: the Moon, gray and close, and Mars, red and far beyond reach. For a week, every conversation in the building drifts toward the same fight, until on Friday Omid finally calls it — founders only, door shut, one hour. Everyone knows what the hour will decide.',
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
      'The door shuts, and the argument you have circled all week finally lands on the table. This hour will decide which world TELEPORT serves first.',
    prose:
      'Omid starts with Mars. Of course he does. “The Moon is a demo. Mars is the thesis. Four to twenty-four minutes of delay is the problem worth a life.” His relay chain was born for Mars, and the industry knows it. The numbers on the wall tell a harsher story. Mars is a decade and a billion dollars away. The Moon has bases, contracts, tourists, and a 2.6-second delay you can sell honestly if you are brave enough. If June is in the room, she says it plainly: “Mars is a religion. The Moon is a business.” Omid looks at you. “You’re the tiebreak,” he says quietly. “Break it.”',
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
          'You write it on the wall under the red photograph, dated and signed: MARS, WHEN THE MOON PAYS FOR IT. Omid reads it twice. “Then I’ll build you a Moon business,” he says, “that Mars can be proud of.” The argument quiets, for now.',
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
          'You take the red photograph down yourself. That is the honest way, and the room still goes one degree colder. Omid nods, says “Understood,” and works the rest of the day in silence. By morning the photo is gone from the trash. You leave that mystery alone.',
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
          'One bench, one junior engineer, one long-shot Mars test running at night on borrowed computers. It barely counts as a program. It is a candle, and Omid tends it that way. If June is watching the books, she writes down its exact cost and says nothing yet.',
      },
    ],
  },
  {
    id: 't_b_moon_won',
    ambience: 'hangar',
    kind: 'bridge',
    title: 'THE COMPANY THE HOUR BUILT',
    prose:
      'The fight settles into the walls. The map gets rebuilt around one gray photograph, and the company that comes out of that hour is simpler and harder. Relay satellites around the Moon. Robot bodies at the south pole. A chair on Earth that anyone can sit in. Rockets lift off south of you every few days, always carrying someone else’s dream. Rent comes due. Payroll comes due. The box of physics keeps turning into invoices. Next, TELEPORT needs hardware tough enough for another world. The only man who builds machines that good is an hour north, in Fresno.',
    choices: [{ label: 'Continue', effects: [], goto: 't_ray_bodies' }],
  },
  {
    id: 't_ray_bodies',
    ambience: 'warehouse',
    title: 'THE ONLY HANDS IN TOWN',
    speaker: 'ray',
    leadIn:
      'Ray Freres has moved his shop twice since Hyperchute and changed almost nothing: the handwritten ledger by the register remains, along with his habit of trusting nobody and delivering early.',
    prose:
      'He walks the requirements sheet once, lips moving at the hard parts. You need a robot body that survives moon dust, a 300-degree temperature swing, and a tourist at the controls. “Everyone wants space now,” he says. “Space is just weather that hates you.” His quote is plain: space-grade parts, three prototype bodies. “Cash up front and I start Monday. Terms and you wait behind my other customers. Your call. I remember how you paid last time, and so does the book.”',
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
          'He initials the ledger in front of you, which from Ray Freres is a medal ceremony. The first body frame is in the jig before the wire clears.',
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
          '“Half,” he allows, and slots you behind a satellite job and somebody’s defense contract. You will get your bodies. You will get them when you get them.',
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
          'Ray gives the shrug of a man adding your name to a private list called FOUNDERS WHO LEARNED. You hire two machinists and buy a mill. The hangar starts sounding like a real company and burning money like one too.',
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
      'Six weeks later, something with hands stands in the corner of the hangar, cabled to a rack like a patient on monitors. It is ugly, test-gray, with camera masts where a head should be. When Omid runs the arm through its wake-up routine, the shop floor stops every time. Nobody feels casual around a machine built to reach. The relay math lives unseen in server racks. The body is the first piece of TELEPORT you can stand in front of, which makes it the first piece the world can see.',
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
      'The first full relay-chain test uses rented time on three commercial satellites and a leased dish in Chile. The Moon stands in as itself, and every signal travels for real.',
    prose:
      'Mission control is four desks pushed together. Omid counts down the handover like a man defusing a bomb. The command leaves Earth. The counter he built, huge red digits and no mercy, climbs through the silence. At 2.61 seconds, the test rig at the far end closes its hand around a rubber ball, and four desks of people jump up at once. Omid stays seated, watching the counter with a look you will remember for years. “Two point six,” he says. “That number is the product. The ads can say anything. The customer buys those two point six seconds. Keep the number exactly as it is.”',
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
          '2.61 goes up by the door on a captionless poster. Half the visitors ask about it, which is the point. Omid never mentions the poster, but you catch him straightening it once, with one finger, on his way past.',
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
          'Commander Ruth Salazar watches by video from the lunar south pole, arms folded, and says eleven words in forty minutes: “Run it again.” You run it again. It holds. “Interesting,” she says. People who know her later tell you this is the highest rating she has ever given anything with a sales team.',
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
      'The Lunar Commerce Expo is eleven weeks away. For three days, every Moon base operator, tourist broker, and space investor will share one hall. To earn their attention, your test machine needs to become safe enough for a live public demo.',
    prose:
      'The quote lands on a Tuesday and sits in the middle of the table like a verdict. It covers hardening the demo body, booking live relay time during the expo, and buying the insurance the hall demands when a robot moves over satellite in front of a crowd. The total sits brutally close to everything the company has left. June’s spreadsheet, or the ghost of it if she is gone, says the same thing: pay this, and the account drops near zero until new money lands. The expo only works as a full bet.',
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
          'The wire goes out at 4:59 p.m. The bank balance that returns has one fewer comma than you are used to. Omid looks over your shoulder and says, quietly, “Good. Now it’s real.”',
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
          'One relay path instead of two. Omid signs off with the joy of a surgeon told to operate with one glove. Then he doubles his test schedule without being asked.',
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
          'Ray hears the bank balance in your voice before you finish asking. He builds the flight kit on terms, initials a new line in the handwritten book, and says only, “Everyone gets one.” You are on the wrong page of the ledger now. Both of you know what that page costs later.',
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
      'After the quote clears, the account can keep the lights on and payroll paid if nothing surprises you. The expo still has one more page of costs, and every line is a surprise.',
    prose:
      'Booth space. Freight for a robot in a crate the size of a casket. Hall labor, required. Hotel rooms, deposit due now. Do the expo right, and it eats almost everything left. Do it cheap, and ten thousand people meet a cheap company. Skip it, and you wait a full year for another room like this. Around the table, nobody says runway. Everyone has done this math before, at another company, in a worse chair. Three days in that hall will decide what TELEPORT becomes.',
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
          'Island booth, twenty-by-twenty, the body on a raised dais under a single spot. The renderings look like a company forty times your size. That is exactly the crime you plan to commit.',
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
          'Ten-by-ten at the end of an aisle, between a valve maker and a startup selling moon-dust-safe grease. Fine. The body doesn’t know what size the booth is.',
      },
      {
        label: 'No booth. Borrowed badges and audacity.',
        effects: [
          { e: 'flag', scope: 'company', key: 'expo_crash', v: true },
          { e: 'stress', d: 5 },
        ],
        goto: 't_b_expo_eve',
        result:
          'Ray’s shop has spare exhibitor badges and a friendly freight handler who owes him. The plan would embarrass a heist movie. Park the crate at his booth’s edge, find power, and demo in the aisle until security notices. If June is present, she points out that legends and restraining orders often start the same way.',
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
      'The hotel is the mid-price kind where every hallway smells faintly of chlorine and ambition. You run the company card for the rooms and watch the machine think one second too long before it approves. You decide to leave the mystery alone. Upstairs, Omid checks the relay booking emails until the numbers blur. Below you, in a loading dock lit like an interrogation room, a crate the size of a casket holds the whole company. Tomorrow, ten thousand people will walk past. Tonight, it is the ceiling, the math, and your heart keeping launch time.',
    choices: [{ label: 'Continue', effects: [], goto: 't_expo_demo' }],
  },
  {
    id: 't_expo_demo',
    ambience: 'expo',
    landmark: true,
    art: 'world_expo_demo',
    title: 'A CHAIR ON EARTH',
    leadIn:
      'Day one. The hall is built from other people’s money: full-size lander mockups, a sixty-foot LED Moon, and HALCYON’s pavilion with its own second floor. Then there is yours: one body, one chair, one live link to a rented test yard, and a counter with big red digits.',
    prose:
      'The demo is simple on purpose. A stranger sits in the chair. Far away, the robot body wakes under their hands. They reach. Two point six seconds later, on the screen, the hand reaches too. The delay is visible. Every remote-robot pitch has tried to hide that gap. The crowd is watching to see what you do with it.',
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
          '“Two point six seconds,” you tell every audience, every hour, “is the speed of light being honest with you.” By day two, the crowd counts the gap out loud like a launch and cheers when the hand closes. HALCYON’s pavilion has a second floor. You have the only booth in the building with a chant.',
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
          'Scripted motions, props set in advance, and patter timed to cover the gap. It works. The demo feels like magic, and the crowd misses what it was never shown. Omid runs the chair all day with the face of a concert pianist playing a jingle.',
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
          'Unscripted hands, honest gap, occasional fumbles. Once, when the link hiccups, thirty seconds of bare silence arrives and stays with you at 3 a.m. for a year. Strangers still walk away saying the one sentence money cannot buy: “I touched it. It was real.”',
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
      'By the last afternoon, your voice is gone, the demo body needs a new wrist motor, and three people are waiting to talk to you at once. There are worse problems. You have had most of them.',
    prose:
      'They arrive in order of gravity. Commander Ruth Salazar, down from the Moon for the expo and visibly allergic to it, watches the demo twice. “My maintenance backlog at the Verge is nine months. Your body, my base, a paid pilot program. Letter of intent, my signature, today.” Then Elliot Vance of ATLAS, older and still signing things in public, says, “I owed you a proper deal from the last life. Four hundred thousand, strategic, no board seat. SOMEDAY, PROPERLY, and today’s the day.” At the end of the aisle, a calm man in a gray suit wears a badge with a blank company line. Conrad Hale. “ALEPH has been watching your flight records all week,” he says. “The fund would like to lead your Series A. Dinner?”',
    choices: [
      {
        label: 'Sign Salazar’s letter of intent on the crate lid, right now.',
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
          'She signs on the crate lid like it is a field desk, which for her it is. “Paper first, dinner never,” she says, already leaving. An hour later Vance signs his check at the booth, writing SOMEDAY, PROPERLY on the memo line in fountain pen, and Hale’s dinner invitation still stands. Money from customers before money from investors — Salazar would approve of the order.',
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
          'He signs it at the booth counter with the same fountain pen as the coffee shop, years ago, and taps the memo line: SOMEDAY, PROPERLY — PAID. “Frame this one too,” he says. Salazar’s letter of intent gets signed twenty minutes later on the crate lid anyway. She waited, arms folded, timing you.',
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
          'Salazar’s letter at five, Vance’s check at seven, dinner with Conrad Hale at nine. Hale orders for the table without looking at the menu and asks questions that sound pulled from your bank statements. They were.',
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
      'Checkout, day four. In your bag: a signed letter of intent from a lunar base, an investment check that hasn’t cleared yet, and a handshake deal from dinner. At the front desk, the clerk runs your company card.',
    prose:
      'The desk clerk runs the company card for the rooms, and the machine makes a sound you remember from the garage years — one small, polite, catastrophic beep. DECLINED. She tries again, because people are kind, and the machine beeps again. Behind you, half the space industry is checking out of the same hotel. In your bag, on paper, sits more money than this building costs to rent for a week — but in the actual account behind this card, after the shipping invoice that paid itself this morning, there is roughly enough left for the minibar. The clerk looks up with professional mercy and quietly asks if you have another card.',
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
          'Her personal card taps once. She keeps her eyes on the clerk. The conversation about freight keeps moving, as if nothing happened. In the shuttle to the airport she finally says, “We are never telling Hale about this,” and you both laugh the specific laugh of people who were nearly dead an hour ago.',
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
          'He has it out of his wallet before the second beep finishes, and pays a five-figure hotel bill with the flat expression of a man buying gum. Later, on the plane, he says the only thing he will ever say about it: “Nine years nobody funded me. I know that sound. I hear it once. Then I pay.”',
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
          'It takes a manager, a copy of Salazar’s signed letter as proof the company is real, and every ounce of charm left in your ruined voice. The hotel agrees to bill you. You walk through a lobby full of the industry you are about to join, broke flat, carrying the company’s future in a tote bag.',
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
      'Vance’s $400,000 wire lands like rain on dry ground, and the Verge pilot is being turned into a contract. Then ALEPH’s term sheet arrives. Page one is the deal. Page two is a summary of your company, written by the model and sharper than your own board deck.',
    prose:
      'Conrad Hale takes the good chair in your borrowed conference room and lets the document do the talking. Two and a half million dollars, at a fair price — honestly fair, because ALEPH never haggles, it calculates. The part that matters hides in the fine print: one board seat for the fund, filled by Hale, plus the right to pick the fifth director when the board grows. Whoever names that fifth seat may someday control a tie vote. “The model cares about clean board math,” Hale says, watching you read. “Its words.” Somewhere in a data center, a system that has read every document you ever signed is waiting for your answer.',
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
          'Hale steps out to “consult,” which means to read. Eleven minutes later he returns. “The model watched your expo demo. It says a founder who names the delay out loud can name a director.” He initials the change by hand. It is the first thing the fund has ever conceded, and Conrad Hale looks briefly, humanly, delighted.',
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
          'You sign the deal as written, exactly as the model expected. Page two had already predicted that. The wire lands before Hale reaches the parking lot. In clause 8(c), a board seat outside your control begins waiting for its day.',
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
          'Hale closes the folder without offense. “For the record, I advised the model you might. It gave that outcome nine percent.” He shakes your hand at the door, and his face carries something like envy. “Most people never get to see what turning it down looks like.”',
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
          'The satellites go up three at a time. Three relays per rocket, four launches, a winter of permits and licenses. Then, one night in the hangar, Omid connects the final satellite to the chain. The ring wakes on the wall map like streetlights around the Moon.',
      },
      {
        art: 'cut_ring_alive',
        prose:
          'He stays quiet. He stands in front of the map with his hands in his pockets for a long time, looking at nine unfunded years turned into light.\n\nThen he picks up the microphone, opens the test channel to the body waiting at the pole, and says the first word ever carried end to end on his relay chain:\n\n“Hello.”\n\nTwo point six seconds later, the hand at Shackleton waves.',
      },
    ],
    prose:
      'The relay ring is complete. TELEPORT is more than a demo with a counter. It is part of how the Moon works now, humming overhead. Year two begins with light.',
    choices: [{ label: 'Begin year two', effects: [{ e: 'stress', d: -8 }], goto: 't_salazar_contract' }],
  },
]
