# FATE — THE FULL SCRIPT

> Every player-facing line in the game, in play order. Edit any text **below** its anchor comment;
> never edit or delete the `<!-- fate:... -->` anchor lines or the headings.
> Blank lines inside a block become paragraph breaks in the game.
> Write changes back into the content files with `npm run script:apply` (then `npm test`).


---

# HYPERCHUTE, INC. — A railway in the sky, built from a garage.

## HYPERCHUTE · OPENING FILM

### film screen 1 — THE CITY FROM BELOW
<!-- fate:hyperchute/prologue[0].prose -->
You grew up in the Flats, the poor end of the city.

When you were nineteen, the delivery drones arrived — a hundred thousand of them, blue and quiet, flying over your roof to the rich hills where the tips are good. Every kid on your block learned their blinking lights the way other kids learn constellations.

The drones never stopped on your street. Nothing that flies ever stopped on your street.

### film screen 2 — THE OLD WAY
<!-- fate:hyperchute/prologue[1].prose -->
In the Flats, deliveries still came the old way. A courier on a beat-up e-bike, racing a delivery app’s timer for rent money. Your neighbor Mrs. Okafor riding the bus forty minutes each way for her insulin, because the corner pharmacy closed.

You watched it every day. After a while, just watching started to feel like a choice you were making.

### film screen 3 — EIGHT YEARS INSIDE IT
<!-- fate:hyperchute/prologue[2].prose -->
You know exactly how those drones work, because routing them was your job for eight years.

A headset, a dispatch floor, a MERIDIAN subcontractor. MERIDIAN LOGISTICS NETWORKS — the ninety-one-billion-dollar giant whose routing computer makes eleven million decisions a minute, while the executives mostly announce whatever it already decided.

On launch days the managers wore a T-shirt: LOGISTICS IS A SOLVED PROBLEM. For the rich hills, it was.

### film screen 4 — THE VERDICT
<!-- fate:hyperchute/prologue[3].prose -->
Over your desk hung the company’s delivery map. Your whole neighborhood — your school, your mother’s block, the laundromat on the corner — sat inside a gray zone stamped LOW-DENSITY YIELD.

That’s company language for: not worth delivering to.

You stared at that stamp for eight years. A verdict, printed in clean corporate type, on every street you ever loved.

### film screen 5 — EVERYTHING YOU HAD
<!-- fate:hyperchute/prologue[4].prose -->
You quit on a Tuesday. No speech. You left the headset on the desk and took the stairs.

Then you sold everything you owned. The savings, the car, half an apartment deposit — $120,000, everything you have ever been worth, moved into a company account that didn’t have a company yet.

You kept one thing: an idea that would not leave you alone.

The money bought a garage above the Sudz & Spin laundromat, four months of late nights, and a pile of parts. Dryer heat through the floorboards. Solder smoke. And slowly, hanging from a rope under the ceiling, a machine taking shape — the thing you saw every night when you closed your eyes on the dispatch floor.

### film screen 6 — SOFT AS RAIN
<!-- fate:hyperchute/prologue[5].prose -->
The idea is a railway in the sky.

Small self-flying shuttles that park two hundred feet above the street, like train cars on an invisible track, and lower each package down a soft tube to any porch with a catch-sleeve. Four minutes from warehouse to doorstep, soft as rain, priced like a bus ticket.

Where MERIDIAN sends a swarm of drones, you run one quiet line — over the exact streets their map says are worthless.

That is the whole plan, and it makes you grin at 3 a.m.: start where MERIDIAN refuses to go. One approved air corridor over one forgotten neighborhood. Sixty paying porches. Then the next street, then the next — until their LOW-DENSITY YIELD map is your empire, drawn in orange.

Last night you filed the papers for a company called HYPERCHUTE, INC. It is one hundred percent yours, and it is worth exactly nothing.

For now.

## h_seedling · DON’T YOU HAVE A JOB? [scene] — speaker: Mrs. Delgado

<!-- fate:hyperchute/h_seedling.leadIn -->
Week one as a founder tastes like instant coffee. Dryer drums shake the floor below you. At 8 a.m., while you solder a motor mount, the stairs creak. You know that walk. Your landlady is coming up, and she wants an answer.

<!-- fate:hyperchute/h_seedling.prose -->
Mrs. Delgado owns the laundromat, the building, and — after thirty years — this whole block’s respect. She climbs the stairs at 8 a.m. with a rent envelope in one hand and a question she has practiced all morning. “Every day you are up here. Machines humming. My dryers vibrate. Don’t you have a job?” You tell her the truth: this is the job now — a railway in the sky that drops packages soft as rain onto every block, even the Flats. She studies the hanging shuttle for a long, calm minute. “My granddaughter waits forty minutes for a bus to bring her insulin,” she says, and pulls a second envelope from her apron — creased, warm, wrapped with a bank band. Ten thousand dollars. She pushes it across the workbench with one finger. “I want to put my money in your company. I was saving for a cruise. Boats are slow.”

### h_seedling · choice 1 → h_entry
<!-- fate:hyperchute/h_seedling.choice[0].label -->
Take it. One percent, notarized on a laundry receipt.

<!-- fate:hyperchute/h_seedling.choice[0].result -->
She signs the receipt like a woman who has closed harder deals. Then she tapes her copy to the wall behind the register, where the whole neighborhood will see it.

### h_seedling · choice 2 → h_entry
<!-- fate:hyperchute/h_seedling.choice[1].label -->
Take it as a loan. Pay her back double, someday.

<!-- fate:hyperchute/h_seedling.choice[1].result -->
“Double,” she repeats, satisfied. She writes it in a ledger older than you. Every morning after this, the debt will be waiting downstairs with her coffee.

### h_seedling · choice 3 → h_entry
<!-- fate:hyperchute/h_seedling.choice[2].label -->
Refuse. Her cruise money isn’t venture capital.

<!-- fate:hyperchute/h_seedling.choice[2].result -->
She tucks the envelope away without taking offense. “Then my porch is first,” she says. “When the boxes fall.”

## h_entry · THE GARAGE [scene]

<!-- fate:hyperchute/h_entry.leadIn -->
The stairs go quiet. The garage belongs to you again. The prototype sways on its rope, waiting for the first real move.

<!-- fate:hyperchute/h_entry.prose -->
A rented room above the Sudz & Spin laundromat in the Flats. Dryer heat, solder smoke, and one prototype shuttle hanging from the ceiling on a rope — a shoebox with rotors, feeding a delivery tube you pulled from a closed bank’s drive-through. On your screen, the company papers say you own one hundred percent of HYPERCHUTE. Through the window, a MERIDIAN drone hums past with someone’s cold-pressed juice. The city still sees only a quiet second-floor room. That keeps you safe. It also keeps you small.

### h_entry · choice 1 → h_b_filing
<!-- fate:hyperchute/h_entry.choice[0].label -->
File for a city flight permit. Prove it works first

<!-- fate:hyperchute/h_entry.choice[0].result -->
You send the application at 2 a.m., too wired to sleep.

### h_entry · choice 2 → h_b_advisor_hunt
<!-- fate:hyperchute/h_entry.choice[1].label -->
Recruit an advisor before anyone important sees this

<!-- fate:hyperchute/h_entry.choice[1].result -->
A serious name beside yours could make the city listen.

### h_entry · choice 3 → h_b_paper_first
<!-- fate:hyperchute/h_entry.choice[2].label -->
Get a real lawyer and incorporate properly first

<!-- fate:hyperchute/h_entry.choice[2].result -->
The company needs real paperwork before the sky does.

## h_priya_pitch · TWO PERCENT [scene · gated] — speaker: Priya Raghavan

<!-- fate:hyperchute/h_priya_pitch.leadIn -->
The Flats talks, and by now half the neighborhood has read the receipt Mrs. Delgado taped up behind her register. Add the public company filing, and your garage has earned itself a reputation — so on Monday, someone far out of your league asks for twenty minutes.

<!-- fate:hyperchute/h_priya_pitch.prose -->
Priya Raghavan routed freight across three continents and survived two bankruptcies caused by other people. She gives the garage four seconds of inspection. “You built a machine that drops boxes out of the sky onto people’s homes. You have no permits, no insurance, and no idea which deputy commissioner already hates you. I can fix all three.” She slides a term sheet across the workbench with the terms — two percent, vesting over twelve months, advisory role, introductions included.

### h_priya_pitch · choice 1 → h_b_priya_signed
<!-- fate:hyperchute/h_priya_pitch.choice[0].label -->
“Welcome aboard.”

<!-- fate:hyperchute/h_priya_pitch.choice[0].result -->
She shakes once, dry and firm. Then she starts a list titled THINGS THAT WILL KILL YOU FIRST.

### h_priya_pitch · choice 2 → h_b_priya_waitlist
<!-- fate:hyperchute/h_priya_pitch.choice[1].label -->
“Put me on the waitlist. I’ll pay cash when funding lands.”

<!-- fate:hyperchute/h_priya_pitch.choice[1].result -->
Her smile stays still. “Sure. I’ll be here.”

### h_priya_pitch · choice 3 → h_b_priya_alone
<!-- fate:hyperchute/h_priya_pitch.choice[2].label -->
“I’ll go it alone.”

<!-- fate:hyperchute/h_priya_pitch.choice[2].result -->
She folds the term sheet with nineteen years of freight scars behind the motion, then leaves without another word.

## h_b_container · THE SHIPPING CONTAINER [bridge · gated]

<!-- fate:hyperchute/h_b_container.leadIn -->
Everyone downtown gives you the same directions. They still sound like a prank until you are standing in front of the door.

<!-- fate:hyperchute/h_b_container.prose -->
The shipping container is real. It is corrugated steel wedged between two glass towers, with a brass plate on the door that reads REYES, ABOGADO. Inside, bookshelves line the walls, the air is cool, and the room feels calmer than either office tower beside it. A man in rolled shirtsleeves waves you toward the good chair like he has been expecting you all week.

### h_b_container · choice 1 → h_tomas_terms
<!-- fate:hyperchute/h_b_container.choice[0].label -->
Continue

## h_tomas_terms · TWO WAYS TO PAY ME [scene] — speaker: Tomás Reyes

<!-- fate:hyperchute/h_tomas_terms.leadIn -->
He pours two coffees without asking, sits down, and goes straight to the question that decides the meeting.

<!-- fate:hyperchute/h_tomas_terms.prose -->
Tomás Reyes writes startup contracts out of a converted shipping container downtown. He bills like a man who reads every word before anyone signs. “Everyone wants the big-firm lawyer until the bill lands,” he says. He writes two ways to pay on the garage wall in marker — $18,000 flat, or one percent, “and my rolodex goes with it.”

### h_tomas_terms · choice 1 → h_b_papered
<!-- fate:hyperchute/h_tomas_terms.choice[0].label -->
$18,000 cash

<!-- fate:hyperchute/h_tomas_terms.choice[0].result -->
He writes the paper that gives the company ownership of your invention before he leaves. Everything you build now belongs to HYPERCHUTE.

### h_tomas_terms · choice 2 → h_b_rolodex
<!-- fate:hyperchute/h_tomas_terms.choice[1].label -->
One percent, plus the rolodex

<!-- fate:hyperchute/h_tomas_terms.choice[1].result -->
“Smart,” he says, pocketing the marker. “Broke founders make the best clients. Something to prove.”

### h_tomas_terms · choice 3 → h_b_diy
<!-- fate:hyperchute/h_tomas_terms.choice[2].label -->
Download templates. How hard can it be?

<!-- fate:hyperchute/h_tomas_terms.choice[2].result -->
The templates look fine at 3 a.m. By breakfast, every blank box feels like a trap.

## h_permit_wall · NO PROVEN DESCENT SAFETY CASE [scene · gated] — speaker: Office of Aerial Corridors

<!-- fate:hyperchute/h_permit_wall.leadIn -->
Eleven days of PENDING, and then the status page flips on a Tuesday morning before coffee. The email under it is longer than the application.

<!-- fate:hyperchute/h_permit_wall.prose -->
The Office of Aerial Corridors denies your pilot application in 0.4 seconds. The rejection notice copies three departments you have never heard of and one that sounds invented, the Department of Sidewalk Integrity. At the bottom, cold machine language says YOU MAY APPLY AGAIN ONCE YOU PROVE YOUR DROPS ARE SAFE.

### h_permit_wall · choice 1 → h_b_appeal_prep
<!-- fate:hyperchute/h_permit_wall.choice[0].label -->
Appeal the denial with your flight test data

<!-- fate:hyperchute/h_permit_wall.choice[0].result -->
The clerk’s auto-reply gives you a date twenty-one days from now. You have enough time to build a case. A reputation would take longer.

### h_permit_wall · choice 2 → h_b_rogue_nights
<!-- fate:hyperchute/h_permit_wall.choice[1].label -->
Launch unlicensed over your own block. Beg forgiveness.

<!-- fate:hyperchute/h_permit_wall.choice[1].result -->
Twelve perfect drops land on your own roof. A neighbor films the thirteenth.

### h_permit_wall · choice 3 → h_b_corridor_granted
<!-- fate:hyperchute/h_permit_wall.choice[2].label -->
Lobby. Quietly, properly, expensively.

<!-- fate:hyperchute/h_permit_wall.choice[2].result -->
Tomás knows the people who know the people with stamps. Nine days later, the pilot corridor exists.

### h_permit_wall · choice 4 → h_b_corridor_granted
<!-- fate:hyperchute/h_permit_wall.choice[3].label -->
Call in Tomás’ favor

<!-- fate:hyperchute/h_permit_wall.choice[3].result -->
Tomás makes one call from the container. “Fast-tracked. Don’t make me spend this twice.”

## h_hearing · THE DESCENT-SAFETY HEARING [scene · gated]

<!-- fate:hyperchute/h_hearing.leadIn -->
Room 4-B is on the third floor of a building meant to make people feel processed. You wear the one jacket that survived the solder work. You carry three copies of the case because the Office of Aerial Corridors still loves paper.

<!-- fate:hyperchute/h_hearing.prose -->
Room 4-B of the Office of Aerial Corridors smells like toner and judgment. Your forty pages of test data hold up better than anyone expected. The commissioners ask two rounds of questions, then watch your live demo video. One of them says “huh” out loud. Eleven minutes later, they grant the pilot corridor.

### h_hearing · choice 1 → h_b_first_corridor
<!-- fate:hyperchute/h_hearing.choice[0].label -->
Accept the corridor. Fly legal.

<!-- fate:hyperchute/h_hearing.choice[0].result -->
Stamped, sealed, emailed. The sky over the Flats is officially yours — two hundred feet at a time.

## h_june_via_tomas · THE ANGEL [scene · gated]

<!-- fate:hyperchute/h_june_via_tomas.leadIn -->
Tomás calls ahead, which he has never done before. “Clear the bench,” he says. “You have a visitor. Do not be charming. Be accurate.”

<!-- fate:hyperchute/h_june_via_tomas.prose -->
June Park arrives thirty seconds after Tomás because she was already nearby. She has eleven early investments and a habit of seeing winners before the room does. She walks under the tethered shuttle, looks up for a long moment, and says, “A railway in the sky. Huh. My grandmother rode a train two days to reach a port. People will pay for gravity that behaves.”

### h_june_via_tomas · choice 1 → h_june_term
<!-- fate:hyperchute/h_june_via_tomas.choice[0].label -->
Hear her out

## h_june_cold · SOMEONE IS WATCHING YOUR DEMO [scene · gated]

<!-- fate:hyperchute/h_june_cold.leadIn -->
The waiting list crosses two hundred names the same week your test video leaks from a group chat you thought was private. Attention arrives before you invite it.

<!-- fate:hyperchute/h_june_cold.prose -->
The rooftop test footage leaks — of course it leaks — and by Friday it has four hundred thousand views. The comments fight about property values. Monday morning, a woman in an expensive jacket is downstairs in the laundromat asking which unit is yours. June Park climbs the stairs before anyone can slow her down.

### h_june_cold · choice 1 → h_june_term
<!-- fate:hyperchute/h_june_cold.choice[0].label -->
Hear her out

## h_june_term · ONE FIFTY FOR EIGHT [scene] — speaker: June Park

<!-- fate:hyperchute/h_june_term.prose -->
June turns her phone around. On the screen is a wiring diagram of your own shuttle, marked up in three colors. “I read everything. Here’s my number. One hundred fifty thousand for eight percent. I don’t lead rounds I can’t defend at dinner parties — and a railway in the sky? I can defend that.”

### h_june_term · choice 1 → h_b_wired
<!-- fate:hyperchute/h_june_term.choice[0].label -->
Take the check

<!-- fate:hyperchute/h_june_term.choice[0].result -->
The wire clears Wednesday. The garage suddenly smells like possibility instead of dryer sheets.

### h_june_term · choice 2 → h_b_wired
<!-- fate:hyperchute/h_june_term.choice[1].label -->
“Six percent.” See if she flinches

<!-- fate:hyperchute/h_june_term.choice[1].result -->
Her face stays still. “Seven. Because you asked. Don’t negotiate with me twice.”

### h_june_term · choice 3 → h_b_bootstrap
<!-- fate:hyperchute/h_june_term.choice[2].label -->
Turn her down. Keep the company all yours.

<!-- fate:hyperchute/h_june_term.choice[2].result -->
She leaves a card on the workbench anyway. “When you’re ready to move, move fast. Doors like me don’t stay open.”

## h_first_drops_clean · BEAM DOWN [scene · gated]

<!-- fate:hyperchute/h_first_drops_clean.leadIn -->
The batteries finish charging at 4 a.m., and you are awake to see it because of course you are. The wind is calm. The sky is clear. The first customer’s name sits on the schedule in her own cursive handwriting.

<!-- fate:hyperchute/h_first_drops_clean.prose -->
Shuttle One holds steady two hundred feet above the Delgado house at 6:58 a.m. The tube coughs once. The parcel drops through the landing sleeve and reaches the porch soft as rain. Mrs. Delgado films it while screaming. By noon, sixty names fill a waiting list on the back of a parking ticket.

### h_first_drops_clean · choice 1 → h_b_scale_strain
<!-- fate:hyperchute/h_first_drops_clean.choice[0].label -->
Open the list. Take every customer you can.

<!-- fate:hyperchute/h_first_drops_clean.choice[0].result -->
You choose growth. The waiting list becomes today’s work.

### h_first_drops_clean · choice 2 → h_b_scale_strain
<!-- fate:hyperchute/h_first_drops_clean.choice[1].label -->
Cap it at twenty homes. Do it right first.

<!-- fate:hyperchute/h_first_drops_clean.choice[1].result -->
Twenty porches and zero failures. Sofia would call that useful data, and Priya would call it money left sitting outside.

## h_first_drops_rogue · TWELVE ROOFS, NO PERMISSION [scene · gated]

<!-- fate:hyperchute/h_first_drops_rogue.leadIn -->
The waiver stack grows beside the printer each night. Between the fourth and fifth dawn shift, the test program becomes a delivery service that exists only before the city wakes up.

<!-- fate:hyperchute/h_first_drops_rogue.prose -->
Dawn becomes your delivery window, because you fly before the inspectors start work. Friends of friends sign waivers printed at the laundromat, and the money coming in is real. So is the city van that circled the block twice last night with a drone-shaped shadow riding above it.

### h_first_drops_rogue · choice 1 → h_b_grey_strain
<!-- fate:hyperchute/h_first_drops_rogue.choice[0].label -->
Keep flying without a permit until the hearing

<!-- fate:hyperchute/h_first_drops_rogue.choice[0].result -->
Your underground railway runs on nerve. Tonight, yours is holding.

### h_first_drops_rogue · choice 2 → h_b_grey_strain
<!-- fate:hyperchute/h_first_drops_rogue.choice[1].label -->
Ground the fleet. Volunteer the tech to the food bank.

<!-- fate:hyperchute/h_first_drops_rogue.choice[1].result -->
The food-bank flights are legal, slow, and photographed. The city attorney follows the account. June Park follows too.

## h_sofia_hire · READ YOUR CAP TABLE — IT’S CUTE [scene · gated] — speaker: Sofia Brandt

<!-- fate:hyperchute/h_sofia_hire.leadIn -->
Word about your landing problem spreads on its own. The parts shop talks. A wind-power forum starts a thread called “someone is landing boxes on porches for real.” On a wet Monday, boots come up your stairs.

<!-- fate:hyperchute/h_sofia_hire.prose -->
Sofia Brandt spent years writing emergency-stop software for wind turbines — code that keeps a giant spinning machine from hurting people. She reads your flight logs on the stairs, spots a wobble in your landing code, and fixes it before she says hello. Then she names her price without looking up: ninety-five hundred a month. She glances at your company papers. “Or three percent of the company. I read your cap table. It’s cute.”

### h_sofia_hire · choice 1 → h_b_sofia_settled
<!-- fate:hyperchute/h_sofia_hire.choice[0].label -->
$9,500 a month, full-time

<!-- fate:hyperchute/h_sofia_hire.choice[0].result -->
By Friday she has rewritten the landing code and cut half of it. The code is smaller. The shuttle falls better.

### h_sofia_hire · choice 2 → h_b_sofia_settled
<!-- fate:hyperchute/h_sofia_hire.choice[1].label -->
Three percent equity

<!-- fate:hyperchute/h_sofia_hire.choice[1].result -->
“Points it is.” She shakes like she’s closing a merger. Half-time, all heart, and your burn survives the month.

### h_sofia_hire · choice 3 → h_b_sofia_settled
<!-- fate:hyperchute/h_sofia_hire.choice[2].label -->
Contract her part-time, month to month

<!-- fate:hyperchute/h_sofia_hire.choice[2].result -->
“Month to month,” she repeats, using the voice people save for choices they will regret.

## h_marcus_card · A BLACK CAR BELOW THE LAUNDROMAT [scene · gated] — speaker: Marcus Vale

<!-- fate:hyperchute/h_marcus_card.leadIn -->
A black car has appeared on the block all week. It stays long enough to be noticed, then leaves. On Thursday it parks, and the laundromat goes quiet the way rooms do when money walks in.

<!-- fate:hyperchute/h_marcus_card.prose -->
Marcus Vale sends the car away and takes the stairs himself. That is his whole pitch. VP of Logistics Networks, MERIDIAN. He looks at the shuttle the way a man looks at a rival’s child, measuring how tall it might grow. “We looked at delivery tubes back in ’27. Beautiful physics, terrible economics. Convince me yours makes money.”

### h_marcus_card · choice 1 → h_b_after_vale
<!-- fate:hyperchute/h_marcus_card.choice[0].label -->
Charm him. Rivals remember manners.

<!-- fate:hyperchute/h_marcus_card.choice[0].result -->
He laughs once — real, at a line that surprises you too. The card he leaves is heavier than a card should be.

### h_marcus_card · choice 2 → h_b_after_vale
<!-- fate:hyperchute/h_marcus_card.choice[1].label -->
Tell him MERIDIAN’s drones wake up whole streets

<!-- fate:hyperchute/h_marcus_card.choice[1].result -->
His face does something expensive. “Spoken like a man who’s never been shouted at by a board.” He takes the stairs down slowly.

### h_marcus_card · choice 3 → h_b_after_vale
<!-- fate:hyperchute/h_marcus_card.choice[2].label -->
Pitch him the partnership now

<!-- fate:hyperchute/h_marcus_card.choice[2].result -->
“Not yet,” he says, pleased you asked. “Grow a little. Ripeness is everything.”

## h_nadia_call · THE JOURNALIST [scene · gated] — speaker: Nadia Osei

<!-- fate:hyperchute/h_nadia_call.leadIn -->
Your inbox has learned your name. Pitch decks you never asked for, a podcast invite, two recruiters fishing for your only engineer. Buried in the noise, one email actually matters.

<!-- fate:hyperchute/h_nadia_call.prose -->
Nadia Osei writes the column founders pretend they skip. Her email is four words long. “Coffee? Off record?” Under it, she links her story about MERIDIAN’s warehouse injuries — the one that got a VP moved to a satellite office. Her next column could put HYPERCHUTE on every investor’s screen. She wants you to understand the size of her reach.

### h_nadia_call · choice 1 → h_b_after_nadia
<!-- fate:hyperchute/h_nadia_call.choice[0].label -->
Full access. Show her everything.

<!-- fate:hyperchute/h_nadia_call.choice[0].result -->
She spends a day in the garage asking the questions investors are too polite to ask. The profile runs under the headline THE RAILWAY IN THE SKY.

### h_nadia_call · choice 2 → h_b_after_nadia
<!-- fate:hyperchute/h_nadia_call.choice[1].label -->
Off the record, carefully

<!-- fate:hyperchute/h_nadia_call.choice[1].result -->
Two hours, two coffees. She leaves with careful notes and your best lines still safely yours. She respects the discipline.

### h_nadia_call · choice 3 → h_b_after_nadia
<!-- fate:hyperchute/h_nadia_call.choice[2].label -->
No comment

<!-- fate:hyperchute/h_nadia_call.choice[2].result -->
“Everyone says that before the interesting part happens,” she says. She writes something down anyway.

## h_act1_close · ELEVEN WEEKS IN [scene · gated]

<!-- fate:hyperchute/h_act1_close.leadIn -->
The date sneaks up on a Tuesday, the way anniversaries do when you were too busy to notice them. Three months ago, this address was a laundromat with storage. You stand at the top of the stairs and finally look at it.

<!-- fate:hyperchute/h_act1_close.prose -->
Mrs. Delgado raises your rent and calls it congratulations. Even investors pay market rate. The waiting list is a spreadsheet now. Money in the account comes from customers instead of savings. In the room next door, letters from the Office of Aerial Corridors have grown thicker than the Bible. Hard things are coming — a copycat, a war, a problem still hidden from you. The railway is real now, and you built it, along with every choice about who got to help.

### h_act1_close · choice 1 → h_bridge_y2
<!-- fate:hyperchute/h_act1_close.choice[0].label -->
Face year two

<!-- fate:hyperchute/h_act1_close.choice[0].result -->
Year two starts the way year one ended: faster than expected.

## h_file_pilot · A RAILWAY NEEDS SKY [scene · gated]

<!-- fate:hyperchute/h_file_pilot.leadIn -->
The practice drops are getting boring, which is the polite word for perfect. Sixty feet, package after package, soft landings on a roof you already own.

<!-- fate:hyperchute/h_file_pilot.prose -->
Everything you have gathered — advice, company papers, the machine on its braided leash — points at the same missing piece — legal airspace. The Office of Aerial Corridors accepts pilot applications on Tuesdays. Each week you wait, the railway stays a rumor with a prototype. Across town, MERIDIAN’s permit team files things for breakfast.

### h_file_pilot · choice 1 → h_b_filing
<!-- fate:hyperchute/h_file_pilot.choice[0].label -->
File the corridor pilot application

<!-- fate:hyperchute/h_file_pilot.choice[0].result -->
Forty minutes of city forms, then one checkbox that has clearly never been checked before — PROPOSED USE: DESCENT LOGISTICS.

## h_b_filing · WHAT THE CITY HEARS [bridge]

<!-- fate:hyperchute/h_b_filing.prose -->
The confirmation lands at 2:07 a.m. APPLICATION RECEIVED — OFFICE OF AERIAL CORRIDORS. By morning, the system has sent it to Zoning, Insurance, and a sidewalk office whose name sounds fake. You spend the next days running practice drops and refreshing a status page that says PENDING in a font you are learning to hate. Somewhere in a gray building, someone is deciding whether your railway belongs in the sky.

### h_b_filing · choice 1 → h_permit_wall
<!-- fate:hyperchute/h_b_filing.choice[0].label -->
Continue

## h_b_advisor_hunt · CREDIBILITY SHOPPING [bridge]

<!-- fate:hyperchute/h_b_advisor_hunt.prose -->
You draft a list of serious people who might answer a founder’s cold email. Eleven names become seven once you are honest. Two reply. One wants money just to talk. The other is a retired freight executive your old boss once called “the reason our cargo survived two ports and one coup.” She answers with a time and your own address. Priya Raghavan checks the garage before the meeting.

### h_b_advisor_hunt · choice 1 → h_priya_pitch
<!-- fate:hyperchute/h_b_advisor_hunt.choice[0].label -->
Continue

## h_b_paper_first · HOW COMPANIES ACTUALLY DIE [bridge]

<!-- fate:hyperchute/h_b_paper_first.prose -->
You spend an evening reading stories about dead startups. You expect the killers to be markets and money. The real villains are smaller. A founder forgot to sign his invention over to the company, then lost it to a co-founder’s old boss. One funding paper hid a sentence everyone skipped. A handshake deal ended with both sides in court. Three stories, years apart, give the same advice: get a real lawyer before you need one. The name that keeps coming up works out of a shipping container downtown.

### h_b_paper_first · choice 1 → h_b_container
<!-- fate:hyperchute/h_b_paper_first.choice[0].label -->
Continue

## h_b_priya_signed · THINGS THAT WILL KILL YOU FIRST [bridge] — speaker: Priya Raghavan

<!-- fate:hyperchute/h_b_priya_signed.prose -->
Priya puts paperwork first on her kill list. Permits, insurance, and the deputy commissioner can wait one minute. “Someone serious will ask to see your company files within the month,” she says, already typing the first introduction from your workbench. “Company certificate. Paperwork that gives HYPERCHUTE the invention. A cap table that doesn’t embarrass us.” The second intro replies that night with one question: who is your lawyer? Priya reads it over your shoulder. “The real kind,” she says. “If you need one, there’s a shipping container downtown you should visit before you answer this email.”

### h_b_priya_signed · choice 1 → h_b_container
<!-- fate:hyperchute/h_b_priya_signed.choice[0].label -->
Continue

## h_b_priya_waitlist · THE LIST SHE LEFT ANYWAY [bridge]

<!-- fate:hyperchute/h_b_priya_waitlist.prose -->
She leaves the term sheet unsigned, but she leaves behind one handwritten page titled THINGS THAT WILL KILL YOU FIRST — “free of charge, so it kills you slower.” The list covers permits, insurance, and the deputy commissioner by name, and at the top, underlined twice, it says PAPERWORK, because a company with messy papers is just a hobby with bills. The last line is an address for a shipping container downtown.

### h_b_priya_waitlist · choice 1 → h_b_container
<!-- fate:hyperchute/h_b_priya_waitlist.choice[0].label -->
Continue

## h_b_priya_alone · ONE HUNDRED PERCENT OF EVERYTHING [bridge]

<!-- fate:hyperchute/h_b_priya_alone.prose -->
Alone means all of it is yours — the equity, the company forms at 1 a.m., the insurance questions, and the parts supplier who refuses to sell until both sides sign a real contract. By Thursday you have signed your own name eleven times and understood maybe seven. The supplier’s ordering system rejects your homemade contract with one automated suggestion, in bold — GET A LAWYER. Everyone you ask downtown mentions the same shipping container.

### h_b_priya_alone · choice 1 → h_b_container
<!-- fate:hyperchute/h_b_priya_alone.choice[0].label -->
Continue

## h_b_papered · REAL ON PAPER [bridge]

<!-- fate:hyperchute/h_b_papered.prose -->
The documents come back in three days, with little tabs where you sign. Company certificate, company rules, the paper that gives HYPERCHUTE your invention, and an equity plan you will need sooner than you think. It is the least dramatic $18,000 of your life and, Tomás insists, the most important. “Nobody ever calls me about the year things went right.” The company is real now in the way a judge would respect. He leaves one free piece of advice at the door: “Paper protects you from lawsuits. Physics is your problem. Keep an operator close — someone who has moved real freight.” The flying part is still yours.

### h_b_papered · choice 1
<!-- fate:hyperchute/h_b_papered.choice[0].label -->
Continue

## h_b_rolodex · THE ROLODEX WAKES UP [bridge] — speaker: Tomás Reyes

<!-- fate:hyperchute/h_b_rolodex.prose -->
The one percent starts working immediately. Introductions arrive in twos and threes — an insurance broker who takes falling packages seriously, a factory with open time, and a permit fixer who charges like sin. Tomás mentions one name almost casually, the way people mention weather: an angel asking around about “the tube thing in the Flats.” “June Park,” he says. “If she shows up, don’t negotiate like you’re grateful.”

### h_b_rolodex · choice 1
<!-- fate:hyperchute/h_b_rolodex.choice[0].label -->
Continue

## h_b_diy · PROBABLY FINE [bridge]

<!-- fate:hyperchute/h_b_diy.prose -->
The templates come from three states and two decades. You stitch them together at 3 a.m. with find-and-replace and adrenaline, signing pages that mention a Delaware you have never seen. By Friday, the company is incorporated — fees paid, boxes checked, real in a state database. Somewhere in those documents, a mistake you cannot see is ticking like a cheap watch. Someday you will hear it go off.

### h_b_diy · choice 1
<!-- fate:hyperchute/h_b_diy.choice[0].label -->
Continue

## h_b_appeal_prep · FORTY PAGES OF HOPE [bridge]

<!-- fate:hyperchute/h_b_appeal_prep.prose -->
You fly two hundred tether drops in six days and log every one — fall speed, wind, every failure, and what you changed after it. The document grows teeth. Around page thirty, you stop sounding scared and start sounding like an engineer. The hearing notice arrives in the mail with a room number: 4-B.

### h_b_appeal_prep · choice 1
<!-- fate:hyperchute/h_b_appeal_prep.choice[0].label -->
Continue

## h_b_rogue_nights · DAWN SHIFTS [bridge]

<!-- fate:hyperchute/h_b_rogue_nights.prose -->
Rogue flying has rules because you wrote them yourself: dawn only, your own block, waivers signed, and catch-nets on the porches of everyone willing to help. The neighbors who said yes start leaving their porch lights on for the 6 a.m. run, which feels like community until you imagine those same lights listed in a city report. On Thursday, a van with government plates makes its first slow lap of the block, and everyone acts like everyone else is invisible.

### h_b_rogue_nights · choice 1 → h_first_drops_rogue
<!-- fate:hyperchute/h_b_rogue_nights.choice[0].label -->
Continue

## h_b_corridor_granted · A LINE ON A MAP [bridge]

<!-- fate:hyperchute/h_b_corridor_granted.prose -->
The permit arrives as a map file and a stamp. One flight corridor, two hundred feet up, covers your block and the four around it. You print the map and pin it over the workbench — a thin blue line through the Flats, the first airspace in this city that answers to you. The approval ends with the line you need — OPERATIONS MAY COMMENCE UPON RECEIPT. That means tomorrow, if the batteries charge tonight.

### h_b_corridor_granted · choice 1 → h_first_drops_clean
<!-- fate:hyperchute/h_b_corridor_granted.choice[0].label -->
Continue

## h_b_first_corridor · STAMPED [bridge]

<!-- fate:hyperchute/h_b_first_corridor.prose -->
The certificate arrives by email, then — absurdly, wonderfully — by mail, with a raised seal you run a thumb over twice. One corridor. Two hundred feet. Renewal depends on safe flights and clean reports. The boring paperwork is how you inherit the sky. The first legal drop is scheduled for 6:58 a.m. Tuesday, to Mrs. Delgado, who signed the landing-sleeve agreement in cursive.

### h_b_first_corridor · choice 1 → h_first_drops_clean
<!-- fate:hyperchute/h_b_first_corridor.choice[0].label -->
Continue

## h_b_wired · WHAT MONEY SOUNDS LIKE [bridge]

<!-- fate:hyperchute/h_b_wired.prose -->
The wire lands and the garage changes pitch. You pay the laundromat three months ahead, order the good connectors, and book factory time like someone who means it. June’s first request as an investor is one sentence: “Numbers monthly, surprises never.” You tape it above the workbench. Funding gives you a new way to die — spending like the bank account is bottomless. Your job is to stay hungry with cash in the bank.

### h_b_wired · choice 1
<!-- fate:hyperchute/h_b_wired.choice[0].label -->
Continue

## h_b_bootstrap · RAMEN MATH [bridge]

<!-- fate:hyperchute/h_b_bootstrap.prose -->
Staying independent means counting everything. On the whiteboard where an investor’s logo would have hung, you write the math — every customer dollar helps you keep control, and every week is a bet that the machine earns faster than it burns. June’s card stays on the workbench, face up, like a fire alarm behind glass. Some founders can live like this. You are about to learn if you can.

### h_b_bootstrap · choice 1
<!-- fate:hyperchute/h_b_bootstrap.choice[0].label -->
Continue

## h_b_scale_strain · THE JITTER [bridge]

<!-- fate:hyperchute/h_b_scale_strain.prose -->
Deliveries to real houses go worse than the practice runs. Wind coming off Mrs. Delgado’s roof pushes the shuttle around, the catch-sleeve on her porch has worked loose, and the landing software reacts too slowly to correct for any of it. Drop forty-one hits so hard it bruises a box of pears. You stay up past midnight reading the flight logs, and you finally admit the truth: the waiting list keeps growing, but the landings keep getting worse, and fixing this software is beyond you. You need to hire someone better than you.

### h_b_scale_strain · choice 1 → h_sofia_hire
<!-- fate:hyperchute/h_b_scale_strain.choice[0].label -->
Continue

## h_b_grey_strain · THE MARGIN FOR ERROR IS A ROOF [bridge]

<!-- fate:hyperchute/h_b_grey_strain.prose -->
Flying without a permit means one bad landing on the wrong porch puts your name in a headline. So you fly carefully, and even careful landings shake. The software reacts late in gusts, and the drops get rougher whenever the wind rises. You read the logs on the stairs at midnight. Every bad line points at the same missing person, an expert who knows how to make falling safe. You need her before the wind gets lucky.

### h_b_grey_strain · choice 1 → h_sofia_hire
<!-- fate:hyperchute/h_b_grey_strain.choice[0].label -->
Continue

## h_b_sofia_settled · FALL BETTER [bridge]

<!-- fate:hyperchute/h_b_sofia_settled.prose -->
In her first week she rewrites the landing system and ships updates with one-word notes like “fall better” and “no.” The shuttle stops correcting like a nervous student and starts correcting like a reflex. Hard landings disappear from the logs. The garage gains a foam-block crash-test rig and one strict rule — ask before touching Sofia’s equipment. Near midnight, a black car idles across the street for twenty minutes, then leaves with everyone still inside. The company is getting good enough to be noticed, and that changes the room.

### h_b_sofia_settled · choice 1
<!-- fate:hyperchute/h_b_sofia_settled.choice[0].label -->
Continue

## h_b_after_vale · BEING SEEN [bridge]

<!-- fate:hyperchute/h_b_after_vale.prose -->
The card sits on the workbench for a day before you pin it to the corkboard, slightly crooked, where it watches you work. MERIDIAN knows your name now. Its logistics division loses more money by lunch than you will spend this year. The visit might have been scouting, courtesy, or appetite. Any of those means the same thing. The war for the last mile has noticed the railway. Work faster.

### h_b_after_vale · choice 1
<!-- fate:hyperchute/h_b_after_vale.choice[0].label -->
Continue

## h_b_after_nadia · FILED AWAY [bridge]

<!-- fate:hyperchute/h_b_after_nadia.prose -->
Journalists leave the room and keep the story. Some version of you rode down the stairs in Nadia’s notebook. It lives now in a draft with your name on it, waiting for the day the railway becomes news again. In this city, that day always comes. The encounter pays one honest wage anyway. You heard your own company described by someone trained to spot what founders hide.

### h_b_after_nadia · choice 1
<!-- fate:hyperchute/h_b_after_nadia.choice[0].label -->
Continue

## h_bridge_y2 · YEAR TWO [cutscene]

<!-- fate:hyperchute/h_bridge_y2.prose -->
The garage has become an office. Six desks line the floor. A server rack stands where the workbench used to be. The corridor map spills onto a second wall. Then MERIDIAN launches Chute, a cheaper copy of Hyperchute. It sells the same drops for forty percent less and loses money on each one because MERIDIAN can afford it. The war you wanted has arrived, and your company is the target.

### h_bridge_y2 · film screen 1
<!-- fate:hyperchute/h_bridge_y2.screen[0].prose -->
The garage has become an office. Six desks line the floor. A server rack stands where the workbench used to be. The corridor map spills onto a second wall.

### h_bridge_y2 · film screen 2
<!-- fate:hyperchute/h_bridge_y2.screen[1].prose -->
Then MERIDIAN launches Chute, a cheaper copy of Hyperchute. It sells the same drops for forty percent less and loses money on each one because MERIDIAN can afford it. The war you wanted has arrived, and your company is the target.

### h_bridge_y2 · choice 1 → h_price_war
<!-- fate:hyperchute/h_bridge_y2.choice[0].label -->
Continue

## h_price_war · THE PRICE OF PRICE [scene · gated]

<!-- fate:hyperchute/h_price_war.leadIn -->
The first blue tube appears on a lamppost four blocks east. Six more show up overnight, like mushrooms after rain. The stencil says CHUTE. INTRODUCTORY PRICING. Your phone starts buzzing before you finish the second sign.

<!-- fate:hyperchute/h_price_war.prose -->
Chute’s lower price works. Your waiting list stalls, and two customers a day move to the blue tubes. The board meets over cold pizza. Right now the board is you, plus anyone you let in. Someone has to move first.

### h_price_war · choice 1 → h_b_after_pricewar
<!-- fate:hyperchute/h_price_war.choice[0].label -->
Match them. Burn cash to hold the streets.

<!-- fate:hyperchute/h_price_war.choice[0].result -->
Your prices now barely cover your costs, but the waiting list stops shrinking. So does your sleep.

### h_price_war · choice 2 → h_b_after_pricewar
<!-- fate:hyperchute/h_price_war.choice[1].label -->
Sell reliability — the drop that never misses.

<!-- fate:hyperchute/h_price_war.choice[1].result -->
You publish a weekly on-time report at 99.97%. The Flats notices. Insurance companies start calling.

### h_price_war · choice 3 → h_b_after_pricewar
<!-- fate:hyperchute/h_price_war.choice[2].label -->
Leak Chute’s accident reports to the city.

<!-- fate:hyperchute/h_price_war.choice[2].result -->
The files reach the city with no name attached. You tell yourself the reports are accurate, and most of them are.

## h_couriers · THE COLLECTIVE [scene · gated]

<!-- fate:hyperchute/h_couriers.leadIn -->
You know the couriers by first name now — Rosa, Dmitri, and the twins who split one route. Lately their group chat goes quiet when you walk by. That is how you know a real ask is coming.

<!-- fate:hyperchute/h_couriers.prose -->
People still handle the last mile. Contract couriers carry the packages the tubes leave downstairs. They arrive with a letter. Make them employees with steady pay and benefits, or they stop carrying your packages up any staircase. MERIDIAN’s couriers asked for nothing and got nothing. Yours read the news.

### h_couriers · choice 1 → h_b_after_couriers
<!-- fate:hyperchute/h_couriers.choice[0].label -->
Say yes. Full employees: W-2s, benefits, everything.

<!-- fate:hyperchute/h_couriers.choice[0].result -->
The letter comes back signed. The note reads FIRST COMPANY TO ASK PROPERLY. Your burn rises, and the neighborhood sees it.

### h_couriers · choice 2 → h_b_after_couriers
<!-- fate:hyperchute/h_couriers.choice[1].label -->
Offer a middle deal: guaranteed pay, no benefits.

<!-- fate:hyperchute/h_couriers.choice[1].result -->
Half of them sign. The other half organize harder.

### h_couriers · choice 3 → h_b_after_couriers
<!-- fate:hyperchute/h_couriers.choice[2].label -->
Automate the stairs. Machines don’t organize.

<!-- fate:hyperchute/h_couriers.choice[2].result -->
You order stair-climbing attachments. They ship in six weeks. Five weeks from now, picket signs show up outside the garage.

## h_strike · THE PORCHES GO QUIET [scene · gated]

<!-- fate:hyperchute/h_strike.leadIn -->
It starts on a Monday with quiet streets. The morning routes never happen. By noon, every receiver sleeve has the same flyer taped to it. The neighborhood has read it, and so have you.

<!-- fate:hyperchute/h_strike.prose -->
The strike is calm and devastating. Couriers refuse every Hyperchute address, and they explain why at each porch. Chute pays its couriers double to cross your picket lines. The neighborhood watches what you do next.

### h_strike · choice 1 → h_b_after_strike
<!-- fate:hyperchute/h_strike.choice[0].label -->
Negotiate. You were wrong about the stairs.

<!-- fate:hyperchute/h_strike.choice[0].result -->
You sign the deal at the laundromat on a table still warm from someone’s laundry. Every local channel plays the clip.

### h_strike · choice 2 → h_b_after_strike
<!-- fate:hyperchute/h_strike.choice[1].label -->
Hold firm. Machines finish the job.

<!-- fate:hyperchute/h_strike.choice[1].result -->
The drop success rate holds at 94%, then falls one point each week. The Flats starts a counter-list of porches that refuse your tubes.

## h_cut_meridian_ipo · MERIDIAN GOES PUBLIC [cutscene · gated]

<!-- fate:hyperchute/h_cut_meridian_ipo.prose -->
MERIDIAN rings the bell on a Tuesday. By the end of the day, it is worth more than the city you live in. Its founder sits on every financial channel, silver-haired and certain under the studio lights. “Logistics is solved. The last mile belongs to whoever owns the sky.” The number behind him reads $91B. Your company still lives in a garage above a laundromat.

### h_cut_meridian_ipo · choice 1 → h_permit_war
<!-- fate:hyperchute/h_cut_meridian_ipo.choice[0].label -->
Continue

## h_permit_war · THE AUDIT [scene · gated]

<!-- fate:hyperchute/h_permit_war.leadIn -->
The letter arrives by certified mail, which always feels bad. The letterhead is from the same office that gave you your first corridor. That morning, two men in gray park outside and take careful photos of every receiver sleeve.

<!-- fate:hyperchute/h_permit_war.prose -->
The Office of Aerial Corridors starts a full review of every Hyperchute corridor. The press release calls it “routine,” and MERIDIAN’s lobbyists helped write it. Three of your eleven corridors must stop flying while the office reviews them. The city once loved you. Now people with deeper pockets are working the city against you.

### h_permit_war · choice 1 → h_b_after_audit
<!-- fate:hyperchute/h_permit_war.choice[0].label -->
Unleash Nadia. Make the lobbying the story.

<!-- fate:hyperchute/h_permit_war.choice[0].result -->
Her piece runs Sunday under the headline THE SKY IS FOR SALE, and by Monday there are cameras at every hearing.

### h_permit_war · choice 2 → h_b_after_audit
<!-- fate:hyperchute/h_permit_war.choice[1].label -->
Hire the regulator who wrote the rules. For 1.5%.

<!-- fate:hyperchute/h_permit_war.choice[1].result -->
Dana Okafor ran the corridors office for nine years. She knows which signatures matter and who avoids calls. The review ends with a bland letter that says the problems are fixed.

### h_permit_war · choice 3 → h_b_after_audit
<!-- fate:hyperchute/h_permit_war.choice[2].label -->
Comply completely. Pause the flagged corridors.

<!-- fate:hyperchute/h_permit_war.choice[2].result -->
You pause the flagged corridors and give the office every file it asks for. Nine weeks later, the corridors reopen with a praise letter nobody reads.

## h_fresno · FRESNO IS BEHIND [scene · gated]

<!-- fate:hyperchute/h_fresno.leadIn -->
The first sign is an apologetic email about parts going to larger buyers. The second sign is your account manager’s calendar, suddenly full for three weeks. Suppliers rarely announce bad news. They let you discover it.

<!-- fate:hyperchute/h_fresno.prose -->
The Fresno plant builds your shuttles and everyone else’s drones. Everyone else just placed bigger orders. Wait times stretch from six weeks to nineteen. Every grounded shuttle means a human courier serves that porch at a loss.

### h_fresno · choice 1 → h_b_after_fresno
<!-- fate:hyperchute/h_fresno.choice[0].label -->
Double the order. Cash up front for priority.

<!-- fate:hyperchute/h_fresno.choice[0].result -->
Your shuttles move to line three, ahead of Chute’s. Fresno listens when cash arrives first.

### h_fresno · choice 2 → h_b_after_fresno
<!-- fate:hyperchute/h_fresno.choice[1].label -->
Line up a second supplier in Reno.

<!-- fate:hyperchute/h_fresno.choice[1].result -->
Reno’s parts fit a little worse and cost more. When Fresno slips again, you still have shuttles coming.

### h_fresno · choice 3 → h_b_after_fresno
<!-- fate:hyperchute/h_fresno.choice[2].label -->
Give Fresno’s owner equity for guaranteed capacity.

<!-- fate:hyperchute/h_fresno.choice[2].result -->
You give two points from your own share to the man who makes your machines. He frames the certificate next to his first dollar.

## h_poach_sofia · THE OFFICE SHE DIDN’T ASK FOR [scene · gated] — speaker: Sofia Brandt

<!-- fate:hyperchute/h_poach_sofia.leadIn -->
A MERIDIAN recruiter has called the garage’s landline twice this month asking for “the descent engineer.” Sofia hung up both times. The third approach comes by courier, on paper, in an envelope too nice to ignore.

<!-- fate:hyperchute/h_poach_sofia.prose -->
Sofia puts the offer letter on your desk without being asked. MERIDIAN offers double salary, a team of nine, and a title with “Principal” in it. “I’m staying,” she says. “And I read every line.” She wrote the safety code that tells every shuttle how to land, and now she is holding an escape hatch.

### h_poach_sofia · choice 1 → h_b_after_poach
<!-- fate:hyperchute/h_poach_sofia.choice[0].label -->
Two more percent. Make her a real co-founder.

<!-- fate:hyperchute/h_poach_sofia.choice[0].result -->
She tears the letter in half before you finish talking. “Principal,” she mutters. “Of a garage.”

### h_poach_sofia · choice 2 → h_b_after_poach
<!-- fate:hyperchute/h_poach_sofia.choice[1].label -->
Match the money, keep the equity yours.

<!-- fate:hyperchute/h_poach_sofia.choice[1].result -->
She stays for the number. Both of you understand the price, and it feels cold.

### h_poach_sofia · choice 3 → h_b_after_poach
<!-- fate:hyperchute/h_poach_sofia.choice[2].label -->
Let her go with blessing and a reference.

<!-- fate:hyperchute/h_poach_sofia.choice[2].result -->
Her fingerprints are on every line of the landing code. MERIDIAN just hired the person who made you safe. You stand in the garage and feel less safe immediately.

## h_viral · THE FOUR MINUTES [scene · gated]

<!-- fate:hyperchute/h_viral.leadIn -->
Tuesday feels normal until 3:12 p.m. Then every phone in the garage lights up with the same porch-camera clip. The view count adds another zero while you watch.

<!-- fate:hyperchute/h_viral.prose -->
A man on Forty-First Street collapses. The 911 drone is eleven minutes away. The nearest Hyperchute tube sends a defibrillator to his porch in four minutes, and the first courier there knows CPR. The porch camera turns it into a national story. It reaches 40 million views. Every caption says some version of THIS is what it’s for.

### h_viral · choice 1 → h_b_after_viral
<!-- fate:hyperchute/h_viral.choice[0].label -->
Ride it. National shows, op-eds, the whole arc.

<!-- fate:hyperchute/h_viral.choice[0].result -->
You do eleven interviews in six days and say the same true thing each time. The railway was built for this. The list grows by forty thousand names.

### h_viral · choice 2 → h_b_after_viral
<!-- fate:hyperchute/h_viral.choice[1].label -->
Send Rosa the courier to the interviews. Stay off camera.

<!-- fate:hyperchute/h_viral.choice[1].result -->
Rosa from the courier pool does the shows and tells the story better than you could. The moment becomes hers. That makes it bigger.

## h_series_a · TWO MILLION, TWENTY POINTS [scene · gated] — speaker: June Park

<!-- fate:hyperchute/h_series_a.leadIn -->
June books a meeting a week out and sends an agenda. From June, that is practically a formal declaration. She arrives with someone new in a gray suit, with a firm handshake and the calm of a man who has already read your company files.

<!-- fate:hyperchute/h_series_a.prose -->
June brings a partner from Sandhill and lets him talk for twenty minutes. Then she cuts in. “Two million. Twenty points. A real board, clear rules, and enough runway to fight the war instead of surviving it. This is the door I told you about. It only opens once.”

### h_series_a · choice 1 → h_b_after_a
<!-- fate:hyperchute/h_series_a.choice[0].label -->
Take it. Win the war.

<!-- fate:hyperchute/h_series_a.choice[0].result -->
The $2 million lands on Friday. By Monday, you have a hiring plan, a legal budget, and a board meeting on the calendar. You are included, and other people now share the wheel.

### h_series_a · choice 2 → h_b_after_a
<!-- fate:hyperchute/h_series_a.choice[1].label -->
Counter at fifteen percent.

<!-- fate:hyperchute/h_series_a.choice[1].result -->
“Eighteen,” she says, “because you asked twice.” The $2 million lands Friday.

### h_series_a · choice 3 → h_b_after_indep
<!-- fate:hyperchute/h_series_a.choice[2].label -->
Stay independent. Own the whole thing or lose it all.

<!-- fate:hyperchute/h_series_a.choice[2].result -->
June nods slowly. “Then you’re betting the company every single week. Some founders are wired that way.” She closes the door politely, forever.

## h_board · WHO HOLDS THE GAVEL [scene · gated]

<!-- fate:hyperchute/h_board.leadIn -->
The lawyers trade drafts for a week. Each version is polite, expensive, and full of edits that shape your future. Then everyone gathers in a conference room borrowed from June’s fund, because the garage still has folding chairs.

<!-- fate:hyperchute/h_board.prose -->
The company rules run three dull pages before the line that matters, which is who sits on the board. June’s term sheet leaves that open, so the choice is happening right now, in this room, by whoever speaks first.

### h_board · choice 1
<!-- fate:hyperchute/h_board.choice[0].label -->
Founder-controlled: you, June, one neutral.

<!-- fate:hyperchute/h_board.choice[0].result -->
You keep the gavel. June votes with you twice in year one. The third vote goes against you, and you remember it.

### h_board · choice 2
<!-- fate:hyperchute/h_board.choice[1].label -->
Even: you, June, an independent both accept.

<!-- fate:hyperchute/h_board.choice[1].result -->
The board becomes marriage counseling with votes. The independent is a retired ferry captain with little patience for either of you. That turns out to be exactly right.

## h_bridge_pre_act3 · EIGHTEEN MONTHS OF WAR [cutscene · gated]

<!-- fate:hyperchute/h_bridge_pre_act3.prose -->
Three corridors were suspended and then reopened. The price war cost both sides a fortune and taught the whole city your names. Your couriers got health insurance, and Sofia’s landing software reached version nine. The war just keeps getting older — until the morning it stops mattering, because of what happens on Richmond Street.

### h_bridge_pre_act3 · choice 1 → h_cut_accident
<!-- fate:hyperchute/h_bridge_pre_act3.choice[0].label -->
Continue

## h_b_after_pricewar · TRENCHES [bridge]

<!-- fate:hyperchute/h_b_after_pricewar.prose -->
The blocks stop changing hands. Both sides dig in. Blue tubes fall off lampposts in your blocks, and strangers put your tubes back straight. Pricing pages change every hour while two ops teams learn each other’s habits. The price war becomes part of the business. Customers feel it, suppliers feel it, and larger companies start running the math.

### h_b_after_pricewar · choice 1 → h_couriers
<!-- fate:hyperchute/h_b_after_pricewar.choice[0].label -->
Continue

## h_b_after_couriers · THE LAST MILE HAS A FACE [bridge]

<!-- fate:hyperchute/h_b_after_couriers.prose -->
The decision moves through the courier pool faster than any memo. Group chats, stairwells, and the bench outside the laundromat all carry it. Deliveries keep moving for now. The porches hear too, because the couriers explain it name by name and landing by landing. In the Flats, how you treat the person on the stairs becomes public knowledge. That judgment starts building from here.

### h_b_after_couriers · choice 1
<!-- fate:hyperchute/h_b_after_couriers.choice[0].label -->
Continue

## h_b_after_strike · AFTER THE PICKETS [bridge]

<!-- fate:hyperchute/h_b_after_strike.prose -->
A strike leaves marks either way. Routes resume. Some porches keep the flyer taped inside the receiver sleeve as a warning or a receipt. The couriers know what you chose. The neighborhood knows too. MERIDIAN’s channels cover every day in HD under the banner GROWING PAINS AT THE LITTLE RAILWAY. The war now has a labor front. You opened it.

### h_b_after_strike · choice 1
<!-- fate:hyperchute/h_b_after_strike.choice[0].label -->
Continue

## h_b_after_audit · PAPER WEATHER [bridge]

<!-- fate:hyperchute/h_b_after_audit.prose -->
The review ends like bad weather. First the gray sedans stop appearing. Then a letter thanks you for your cooperation, whether you helped or fought. The lesson stays. The sky you use belongs to a city office, and city offices have politics. Somewhere downtown, a MERIDIAN lobbyist closes your file and opens the next version for next quarter.

### h_b_after_audit · choice 1
<!-- fate:hyperchute/h_b_after_audit.choice[0].label -->
Continue

## h_b_after_fresno · SUPPLY LINES [bridge]

<!-- fate:hyperchute/h_b_after_fresno.prose -->
The shuttle supply steadies. You know each machine’s build date the way parents know due dates, and you check the factory schedule before the news. Every shuttle that ships on time protects one porch while Chute waits outside. This part of the war happens far from cameras, and it decides more than the parts people see.

### h_b_after_fresno · choice 1
<!-- fate:hyperchute/h_b_after_fresno.choice[0].label -->
Continue

## h_b_after_poach · WHAT THE LETTER MEANT [bridge]

<!-- fate:hyperchute/h_b_after_poach.prose -->
The envelope goes into a drawer. The meaning stays on the bench. MERIDIAN is trying to hire your company one person at a time. Somewhere in its files, someone keeps an org chart of your garage current. The war is about people now. Everyone on your stairs has a number next to their name that someone else will pay.

### h_b_after_poach · choice 1
<!-- fate:hyperchute/h_b_after_poach.choice[0].label -->
Continue

## h_b_after_viral · AFTER THE FOUR MINUTES [bridge]

<!-- fate:hyperchute/h_b_after_viral.prose -->
The clip becomes legend at internet speed. People stitch it, caption it, argue over it, and teach it in safety decks. The waiting list grows by a whole suburb. City hall calls twice. First they congratulate you. Then they quietly ask how much capacity you have. Attention this big has its own weather. For a few weeks, everything the company does happens on camera.

### h_b_after_viral · choice 1
<!-- fate:hyperchute/h_b_after_viral.choice[0].label -->
Continue

## h_b_after_a · GOVERNANCE ARRIVES [bridge]

<!-- fate:hyperchute/h_b_after_a.prose -->
The money changes everything it touches. Hiring plans become real documents with start dates. A calendar invite arrives titled BOARD MEETING, the first meeting in the company’s life that you joined instead of called. June’s texts get shorter and land harder. The garage feels watched now in a way it never did when it belonged only to you.

### h_b_after_a · choice 1
<!-- fate:hyperchute/h_b_after_a.choice[0].label -->
Continue

## h_b_after_indep · THE WHOLE THING [bridge]

<!-- fate:hyperchute/h_b_after_indep.prose -->
Owning all of it has a sound. It is the door June closed, clicking politely behind her. From here, payroll clears only when customers paid that week. Every dollar has to come from customers now. Rescue is far away. You tape the runway math to the wall where a term sheet would have hung. To your surprise, you like seeing it. The next quarter will show what kind of founder you are.

### h_b_after_indep · choice 1
<!-- fate:hyperchute/h_b_after_indep.choice[0].label -->
Continue

## h_cut_accident · RICHMOND STREET, 4:51 P.M. [cutscene]

<!-- fate:hyperchute/h_cut_accident.prose -->
A part in the descent controller fails — version nine, Sofia’s own code — and Shuttle Fourteen drops a forty-pound parcel from sixty feet instead of four. A nurse, fifty-eight, is biking home from the hospital where she has worked for thirty-one years. The parcel hits her and leaves her badly hurt. Someone records it. By midnight, every channel in the city leads with the railway in the sky.

### h_cut_accident · choice 1 → h_accident
<!-- fate:hyperchute/h_cut_accident.choice[0].label -->
Continue

## h_accident · THE FIRST FORTY-EIGHT HOURS [scene]

<!-- fate:hyperchute/h_accident.leadIn -->
You get the call at 4:53 and reach Richmond Street by 5:20, before the second news van. The parcel still lies on the pavement inside a chalk rectangle. The shuttle’s beacon is off. Then you realize you turned it off from your phone during the drive over.

<!-- fate:hyperchute/h_accident.prose -->
The lawyers tell you to stay silent. The insurance company tells you to wait before paying. Your gut says the machine was yours. The corridors office has opened an emergency investigation. Chute’s couriers are quietly delivering flowers to Ms. Chen’s block. It is cynical, and it is working.

### h_accident · choice 1
<!-- fate:hyperchute/h_accident.choice[0].label -->
Ground the fleet. Cooperate with everything.

<!-- fate:hyperchute/h_accident.choice[0].result -->
You ground every shuttle before anyone asks and publish the full fault report. Your company lawyer calls it a mistake. The city calls you decent, a word it almost never uses for startups.

### h_accident · choice 2
<!-- fate:hyperchute/h_accident.choice[1].label -->
Settle quietly. NDA, sealed, move on.

<!-- fate:hyperchute/h_accident.choice[1].result -->
The family’s lawyer is fair. The check is enormous. The deal says everyone stays quiet, including you. The fleet keeps flying. Somewhere in version nine, the same fault keeps flying too.

### h_accident · choice 3
<!-- fate:hyperchute/h_accident.choice[2].label -->
Blame the installation contractor. It was their sleeve.

<!-- fate:hyperchute/h_accident.choice[2].result -->
Your response to the city is technically true, and everyone who reads it hates you anyway. The contractor’s lawyers answer within a day. Now the news has two stories, and yours is the one with more money behind it.

## h_press_storm · SHE HAS THE REPORT [scene · gated] — speaker: Nadia Osei

<!-- fate:hyperchute/h_press_storm.leadIn -->
The story has outgrown the city. National news runs the porch-camera clip on a loop, and a senator you have never met says Hyperchute into a microphone. In that noise, your phone buzzes with Nadia’s name.

<!-- fate:hyperchute/h_press_storm.prose -->
Nadia’s email is two words. “Coffee. Now.” She has the early investigation draft, leaked by someone inside the corridors office. She has forty-eight hours before she publishes what she knows. “I’d rather have it from you,” she says. “I’ll run it either way.”

### h_press_storm · choice 1
<!-- fate:hyperchute/h_press_storm.choice[0].label -->
Hand her everything, on record.

<!-- fate:hyperchute/h_press_storm.choice[0].result -->
Her piece runs with your fault report printed in full and one line everyone repeats. THE FOUNDER GROUNDED THE FLEET BEFORE THE CITY COULD. The woman your shuttle struck is still hurt. The truth is public, and it came from you.

### h_press_storm · choice 2
<!-- fate:hyperchute/h_press_storm.choice[1].label -->
Steer her — what to emphasize, what to bury.

<!-- fate:hyperchute/h_press_storm.choice[1].result -->
The story runs softer than it could have. In her notebook and in her memory, she marks the exact sentences you asked her to leave out.

### h_press_storm · choice 3
<!-- fate:hyperchute/h_press_storm.choice[2].label -->
Stonewall. No comment, again.

<!-- fate:hyperchute/h_press_storm.choice[2].result -->
She runs the story without you. The leak looks worse than the report. A headline puts the word “cover-up” above your company’s name.

## h_sofia_verdict · VERSION NINE [scene · gated] — speaker: Sofia Brandt

<!-- fate:hyperchute/h_sofia_verdict.leadIn -->
The garage lights have stayed on every night this week. You find Sofia at the bench at 6 a.m. Cold coffee surrounds her, along with printouts of an error report. The failed line is circled in red until the paper has torn.

<!-- fate:hyperchute/h_sofia_verdict.prose -->
Sofia wrote the code that failed. She has barely slept, and she has rebuilt the landing system three times. Version ten stops safely from any height, anywhere. The part still hanging over her is whether she can stay. “Tell me who we are,” she says, “and I’ll tell you if I’m still here.”

### h_sofia_verdict · choice 1
<!-- fate:hyperchute/h_sofia_verdict.choice[0].label -->
“We ground first, publish everything, and fix it in daylight.”

<!-- fate:hyperchute/h_sofia_verdict.choice[0].result -->
She stays. Version ten ships with her name on it. She proves the emergency stop in front of the whole company by dropping a live shuttle onto foam blocks in the laundromat parking lot.

### h_sofia_verdict · choice 2
<!-- fate:hyperchute/h_sofia_verdict.choice[1].label -->
“We survive. Whatever it takes.”

<!-- fate:hyperchute/h_sofia_verdict.choice[1].result -->
She looks at you for a long moment, then starts packing her tools. Her final code update says, “for whoever inherits this.”

## h_suspension · EMERGENCY SUSPENSION HEARING [scene · gated]

<!-- fate:hyperchute/h_suspension.leadIn -->
The notice goes straight to the public website this time, with no courtesy call and no early email. It reads: Friday session, room 4-B, EMERGENCY REVIEW, HYPERCHUTE FLIGHT RIGHTS. The same room where the railway was born will now vote on whether it keeps flying.

<!-- fate:hyperchute/h_suspension.prose -->
The corridors office votes Friday on whether every Hyperchute corridor must shut down during the investigation. Chute’s lobbyists are pushing a “public safety alternative,” which means Chute everywhere, immediately. You can testify yourself, send Tomás, or accept the pause and save your strength.

### h_suspension · choice 1
<!-- fate:hyperchute/h_suspension.choice[0].label -->
Testify yourself. Name the victim. Admit version nine failed. Show version ten.

<!-- fate:hyperchute/h_suspension.choice[0].result -->
You testify for eleven minutes with your fleet grounded and the fault report in every commissioner’s hands. The suspension passes 4–1 with a ninety-day review. The one commissioner who votes for you quotes you in the record.

### h_suspension · choice 2
<!-- fate:hyperchute/h_suspension.choice[1].label -->
Send counsel. Let lawyers do lawyer work.

<!-- fate:hyperchute/h_suspension.choice[1].result -->
Tomás wins the rule fight and loses the room. The suspension lasts until the office says otherwise. “You should’ve been the one standing there,” he says, gently.

### h_suspension · choice 3
<!-- fate:hyperchute/h_suspension.choice[2].label -->
Accept a 90-day pause without a fight.

<!-- fate:hyperchute/h_suspension.choice[2].result -->
For ninety days, the sky over the Flats goes quiet. Chute flies your routes at triple surge pricing. The neighborhood remembers who stopped flying and who cashed in.

## h_offer · THE OFFER, MID-STORM [scene · gated] — speaker: Marcus Vale

<!-- fate:hyperchute/h_offer.leadIn -->
A month into the storm, the vultures sort themselves by effort. Some email. Some call. One climbs your stairs in person on a Sunday, holding a folder like it has weight.

<!-- fate:hyperchute/h_offer.prose -->
Marcus Vale comes to the garage on foot, carrying one folder. His face does something you have never seen before. He hesitates. “Acquisition. Two hundred million. Your team joins mine, and the tubes turn blue. Or keep bleeding through an investigation while my company pushes the city office against you. This is arithmetic.” He slides the folder across your own workbench. “Take the arithmetic.”

### h_offer · choice 1
<!-- fate:hyperchute/h_offer.choice[0].label -->
Sell. Two hundred million ends every problem.

### h_offer · choice 2
<!-- fate:hyperchute/h_offer.choice[1].label -->
Offer them you instead of the company. Take the MERIDIAN job.

### h_offer · choice 3 → h_war_room
<!-- fate:hyperchute/h_offer.choice[2].label -->
Refuse. The railway is not for sale.

<!-- fate:hyperchute/h_offer.choice[2].result -->
You close the folder. Marcus stands and straightens his jacket. For one unguarded second, he looks almost relieved. “Then win,” he says, and takes the stairs down.

## h_war_room · THE WAR ROOM [scene · gated]

<!-- fate:hyperchute/h_war_room.leadIn -->
Word of the refusal gets out by Monday. Marcus keeps quiet, but folders have a way of traveling. The headlines choose the easy picture and print DAVID DECLINES. Everyone who still works for you shows up that night without being asked.

<!-- fate:hyperchute/h_war_room.prose -->
The room fills with whiteboards, cold noodles, and everyone you have left. Three doors remain open. Take the company public, if the numbers and the name can carry it. Give the technology to the whole world. Or fight in the streets for one more quarter, porch by porch, where one mistake can sink the company.

### h_war_room · choice 1 → h_ipo_road
<!-- fate:hyperchute/h_war_room.choice[0].label -->
Take the company public.

<!-- fate:hyperchute/h_war_room.choice[0].result -->
Choosing gives the room its first deep breath in weeks. The whiteboard clears until only one word remains. LIST.

### h_war_room · choice 2
<!-- fate:hyperchute/h_war_room.choice[1].label -->
Open-source the stack. Give the railway to everyone.

### h_war_room · choice 3 → h_last_stand
<!-- fate:hyperchute/h_war_room.choice[2].label -->
Fight on the streets. One more quarter.

## h_ipo_road · THE ROAD SHOW [scene · gated]

<!-- fate:hyperchute/h_ipo_road.leadIn -->
The bankers running the IPO arrive with a slide template and leave believing the story. Priya says it after the second meeting runs long because they keep asking real questions. Then a calendar invite lands. Eleven cities, nine days, wheels up Monday.

<!-- fate:hyperchute/h_ipo_road.prose -->
You fly to eleven cities in nine days, because the bankers need a story investors will believe, and your strongest story is the simple, true one: you grounded your own fleet and it came back, your couriers got health insurance, and the full fault report went public with your name on it. The last meeting sets the IPO price. Somewhere in the building, a banker says “the people’s network” with a straight face, and everyone lets it pass.

### h_ipo_road · choice 1
<!-- fate:hyperchute/h_ipo_road.choice[0].label -->
Price it honest. Ring the bell.

### h_ipo_road · choice 2
<!-- fate:hyperchute/h_ipo_road.choice[1].label -->
Pull the listing — sell to the syndicate instead.

## h_last_stand · THE LAST QUARTER [scene · gated]

<!-- fate:hyperchute/h_last_stand.leadIn -->
The choice clears the room down to what matters. One whiteboard holds ninety boxes for ninety days. The first box is already crossed out because today counts.

<!-- fate:hyperchute/h_last_stand.prose -->
Bankers are gone. Marcus’s folder is gone. What remains is the Flats, the couriers, the porches, and ninety days to prove the railway deserves the sky. Chute outspends you ten to one. The Flats may still trust you, if you can earn that trust again.

### h_last_stand · choice 1 → h_ipo_road
<!-- fate:hyperchute/h_last_stand.choice[0].label -->
Win the city back: free routes for schools and the food bank.

<!-- fate:hyperchute/h_last_stand.choice[0].result -->
Ninety days later, the Flats is yours again, porch by porch. Forty thousand subscriptions are prepaid because the neighborhood pays for what it trusts. Bankers who stopped calling start calling back. One door remains, and it leads to the IPO price meeting.

### h_last_stand · choice 2
<!-- fate:hyperchute/h_last_stand.choice[1].label -->
Sell to the rival syndicate — anyone but MERIDIAN.

### h_last_stand · choice 3
<!-- fate:hyperchute/h_last_stand.choice[2].label -->
Go down swinging. Every corridor, every week, no surrender.

## h_sublet · HALF A GARAGE [scene · gated]

<!-- fate:hyperchute/h_sublet.leadIn -->
The rent is due Friday. The account is already too thin. You have stared at the numbers for two days when a man from the vinyl-cutting shop knocks. He lost his lease. He asks if you know anyone with space.

<!-- fate:hyperchute/h_sublet.prose -->
You know someone with space. You are standing in it. Half the garage could keep the lights on. He can pay the quarter up front, today. He looks up at the shuttle hanging from the ceiling. “That thing safe?” he asks. “Safer than my landlord,” he decides, and gets out his checkbook.

### h_sublet · choice 1
<!-- fate:hyperchute/h_sublet.choice[0].label -->
Sublet half the garage — quarter up front, cash today.

<!-- fate:hyperchute/h_sublet.choice[0].result -->
By Monday a vinyl cutter hums under Shuttle One, and a stranger’s coffee mug sits on your workbench. The room is cramped. The rent is covered by someone else’s rent. Mrs. Delgado approves so hard she brings him a plant.

### h_sublet · choice 2
<!-- fate:hyperchute/h_sublet.choice[1].label -->
Keep the space. Find the rent some other way.

<!-- fate:hyperchute/h_sublet.choice[1].result -->
The garage stays yours, all of it, echoing. You spend the week you just bought figuring out what to sell. Something always remains. That is the scary part.

## h_fare · THE FARE [scene · gated]

<!-- fate:hyperchute/h_fare.leadIn -->
An angel investor across town — a friend of a friend from Priya’s list — has thirty minutes free on Thursday, and that meeting could save the company. The problem is getting there: your transit card is empty, and so is your wallet.

<!-- fate:hyperchute/h_fare.prose -->
You put on the one good suit — the interview suit, the funeral suit, the suit that has outlived three phones — and the dress shoes that pinch. At the station gate, you pat your pockets, sigh, and give the sorry smile of a man who must have left his wallet at home. The attendant sees the suit and waves you through. The man inside the suit was counting on that.

### h_fare · choice 1
<!-- fate:hyperchute/h_fare.choice[0].label -->
Bluff your way through the gate. The suit rides free.

<!-- fate:hyperchute/h_fare.choice[0].result -->
Buzzed through. Forty minutes later you pitch with your back against the wall. The angel writes thirty thousand dollars on the strength of it. On the ride home you load a fare card for a kid in a hoodie.

### h_fare · choice 2
<!-- fate:hyperchute/h_fare.choice[1].label -->
Walk it. Ninety minutes each way, arrive honest.

<!-- fate:hyperchute/h_fare.choice[1].result -->
You arrive with dust on the dress shoes and close a slightly smaller check from a man who respects punctuality less than he thinks he does. Your feet complain for a week.

### h_fare · choice 3
<!-- fate:hyperchute/h_fare.choice[2].label -->
Ask Mrs. Delgado for the fare.

<!-- fate:hyperchute/h_fare.choice[2].result -->
She hands you a laminated senior transit pass with a photo of Maria from three streets over. “Maria retired,” Mrs. Delgado says. “She won’t mind.” You close the angel and return the pass with a full fare card taped to it.

## h_last_fifteen · FIFTEEN DOLLARS [scene · gated]

<!-- fate:hyperchute/h_last_fifteen.leadIn -->
Below zero, the math gets cruel. The meter on the garage wall eats coins and gives back light. Your stomach growls through the afternoon. Everything you have left adds up to fifteen dollars.

<!-- fate:hyperchute/h_last_fifteen.prose -->
The choice sits on the workbench beside the coins. You can buy a week of electricity or a week of food. The shuttle needs the bench powered. You need to eat. You stand in the garage a long time with the money in your fist, learning something no pitch deck will ever hold.

### h_last_fifteen · choice 1
<!-- fate:hyperchute/h_last_fifteen.choice[0].label -->
Spend it on the electric meter. Work hungry.

<!-- fate:hyperchute/h_last_fifteen.choice[0].result -->
The bench hums for seven more days. You work all of them light-headed, precise, and living on plain pasta and tap water. Years from now, someone will ask what founding a company was really like. This story stays yours.

### h_last_fifteen · choice 2
<!-- fate:hyperchute/h_last_fifteen.choice[1].label -->
Spend it on food. Plan on paper for a week.

<!-- fate:hyperchute/h_last_fifteen.choice[1].result -->
Tomatoes, rice, eggs — the meal tastes like surrender and vitamins. The bench goes dark for a week, and you plan on paper by the laundromat’s light. Mrs. Delgado stopped charging for that light a while ago. You both keep quiet about it.

## h_plastic · THE PLASTIC [scene · gated]

<!-- fate:hyperchute/h_plastic.leadIn -->
Three envelopes arrive the same week, each holding a credit card you applied for on the same hopeful afternoon. The three limits together barely add up to a used car. Below eight weeks of runway, a used car is a fortune.

<!-- fate:hyperchute/h_plastic.prose -->
People with savings call this reckless. People with payroll due Friday understand the room you are in. The math is ugly and simple. Twenty-five thousand across three cards, at interest that would make a loan shark blush. The cards are the only money that says yes today.

### h_plastic · choice 1
<!-- fate:hyperchute/h_plastic.choice[0].label -->
Max them. All three. The railway pays it back or nothing matters.

<!-- fate:hyperchute/h_plastic.choice[0].result -->
Three swipes kill your credit score and keep one company alive. The interest starts running like a cab meter you cannot shut off, so you tape the dead cards to the wall as a promise and a threat.

### h_plastic · choice 2
<!-- fate:hyperchute/h_plastic.choice[1].label -->
Cut them up. Debt with teeth eats founders.

<!-- fate:hyperchute/h_plastic.choice[1].result -->
The scissors make a satisfying sound, and the problem stays exactly the same size. At least now it is an honest problem.

## h_b_coffee_shop · THE COFFEE SHOP [bridge · gated]

<!-- fate:hyperchute/h_b_coffee_shop.leadIn -->
The intro arrives polished. Elliot Vance, president of ATLAS Retail, wants to meet. The place is a coffee shop in the Flats. His assistant calls it charming. You read it as homework.

<!-- fate:hyperchute/h_b_coffee_shop.prose -->
The shop is four blocks from the garage, with steamed windows and one good table. Through the glass you can see him already there, coat off, your corridor map sketched on a napkin in front of him. A town car idles at the curb, embarrassed about the neighborhood. You push the door open.

### h_b_coffee_shop · choice 1 → h_ghost_check
<!-- fate:hyperchute/h_b_coffee_shop.choice[0].label -->
Continue

## h_ghost_check · SIGNED OVER COFFEE [scene] — speaker: Elliot Vance

<!-- fate:hyperchute/h_ghost_check.leadIn -->
He stands to shake your hand before you reach the table, and half the shop studies its cups.

<!-- fate:hyperchute/h_ghost_check.prose -->
He is better in person than his keynote clips. Sharp questions, real laughter, a napkin sketch of your corridor map marked from memory. Then, between refills, he says the sentence founders retell for years. “I’m in. Two hundred and fifty. My own money, separate from ATLAS.” He signs the papers against the window glass and shakes your hand with both of his. “Wire lands within the month,” he says. Everyone in the coffee shop hears it and returns to their cups like professionals.

### h_ghost_check · choice 1
<!-- fate:hyperchute/h_ghost_check.choice[0].label -->
Treat it as money in the bank. Start hiring tonight.

<!-- fate:hyperchute/h_ghost_check.choice[0].result -->
You post two roles before the coffee is cold. Signed means signed. Signed means money. Everyone in the shop saw him do it.

### h_ghost_check · choice 2
<!-- fate:hyperchute/h_ghost_check.choice[1].label -->
Smile, file it, and spend nothing until the wire lands.

<!-- fate:hyperchute/h_ghost_check.choice[1].result -->
The signed papers go into a folder, and you hire nobody until the money is real. You tell only Priya, who nods slowly and says the four hardest words in startup investing: “When it clears, celebrate.”

## h_ghost_dies_spent · THE WIRE THAT NEVER WAS [scene · gated]

<!-- fate:hyperchute/h_ghost_dies_spent.leadIn -->
Elliot Vance’s wire — the two hundred fifty thousand he signed over at the coffee shop — is three weeks late. Week one brings “Legal is processing.” Week two brings silence. Week three brings his assistant dropping the exclamation points. In assistant language, the building is on fire.

<!-- fate:hyperchute/h_ghost_dies_spent.prose -->
The call comes on a Tuesday, from a number outside ATLAS. “I owe you honesty,” Elliot says. He is leaving for a rival with a bigger title. Their rules bar his personal investments, including yours. The money is dead. You have two hires starting Monday against a promise that vanished.

### h_ghost_dies_spent · choice 1
<!-- fate:hyperchute/h_ghost_dies_spent.choice[0].label -->
Take it back. Call both hires tonight and cancel.

<!-- fate:hyperchute/h_ghost_dies_spent.choice[0].result -->
Two phone calls you will remember longer than the people you called. The burn drops back to survivable, and the lesson stays with you for the rest of your career. Money counts after it hits the account.

### h_ghost_dies_spent · choice 2
<!-- fate:hyperchute/h_ghost_dies_spent.choice[1].label -->
Keep your word to the hires. Find the money somewhere else.

<!-- fate:hyperchute/h_ghost_dies_spent.choice[1].result -->
The hires start Monday, unaware how close it came. Priya finds out anyway — she always finds out — and keeps her face still. Her next intro is to someone who actually wires.

## h_ghost_dies_clean · THE WIRE THAT NEVER WAS [scene · gated]

<!-- fate:hyperchute/h_ghost_dies_clean.leadIn -->
Elliot Vance’s wire — the two hundred fifty thousand he signed over at the coffee shop — is three weeks late. Week one brings “Legal is processing.” Week two brings silence. Week three brings a call from a number outside ATLAS.

<!-- fate:hyperchute/h_ghost_dies_clean.prose -->
“I owe you honesty,” Elliot says. He is leaving ATLAS for a rival, and the new company’s rules bar his personal investments, including the check he signed against the window glass. He apologizes twice. One of them lands. You hold the phone and feel the strange weightlessness of money that stayed imaginary. Across the garage, the budget you refused to touch sits intact.

### h_ghost_dies_clean · choice 1
<!-- fate:hyperchute/h_ghost_dies_clean.choice[0].label -->
Thank him for calling you himself. Part on good terms.

<!-- fate:hyperchute/h_ghost_dies_clean.choice[0].result -->
He remembers the grace. Elliot resurfaces every few years with new budgets and old guilt. Somewhere in a rival tower, your name now lives in the folder marked SOMEDAY, PROPERLY.

### h_ghost_dies_clean · choice 2
<!-- fate:hyperchute/h_ghost_dies_clean.choice[1].label -->
Tell him what his broken promise cost you.

<!-- fate:hyperchute/h_ghost_dies_clean.choice[1].result -->
It feels good for one phone call. It also closes every door he might have opened for you later, out of guilt. Some lines feel true and still cost too much.

## h_insolvency · RUNWAY ZERO [scene]

<!-- fate:hyperchute/h_insolvency.leadIn -->
The warning signs were there for months. Then Tuesday comes, and the banking app’s balance turns a color you have never seen before.

<!-- fate:hyperchute/h_insolvency.prose -->
Payroll bounces, and the bank’s notice sounds almost sorry about it. The inbox goes quiet the way it only goes quiet for founders out of money. HYPERCHUTE has weeks left, maybe less. A few doors remain open, and all of them are ugly.

### h_insolvency · choice 1
<!-- fate:hyperchute/h_insolvency.choice[0].label -->
Bridge loan against everything

<!-- fate:hyperchute/h_insolvency.choice[0].result -->
Signed at 11 p.m., against the patents, the shuttles, and — if you read the paperwork twice — the tube itself.

### h_insolvency · choice 2
<!-- fate:hyperchute/h_insolvency.choice[1].label -->
Down round — June doubles down on you

<!-- fate:hyperchute/h_insolvency.choice[1].result -->
The round died this morning. The lead investor walked away before signing, and the rest scattered. You call June so she hears it from you first. She listens to the whole thing and says, “Then I’m in for my share anyway.” The price gets sweeter for her, and she gets a board seat. She showed up when the term sheet failed. Worth it. You both call it business.

### h_insolvency · choice 3
<!-- fate:hyperchute/h_insolvency.choice[2].label -->
Acqui-hire to MERIDIAN: the team survives, the dream ends

<!-- fate:hyperchute/h_insolvency.choice[2].result -->
MERIDIAN takes the engineers, the patents, and the domain name. The railway becomes a slide in someone else’s deck.

### h_insolvency · choice 4
<!-- fate:hyperchute/h_insolvency.choice[3].label -->
Surrender

<!-- fate:hyperchute/h_insolvency.choice[3].result -->
You pay the final invoices from personal savings. Sixty customers send cards. The Flats still calls it the railway.

## h_burnout · THE BODY KEEPS SCORE [scene]

<!-- fate:hyperchute/h_burnout.leadIn -->
It starts politely. You miss an exit on a road you drive every day. You read the same sentence four times. Coffee does nothing. Then one morning your hands shake over the keyboard and you cannot remember when you started crying.

<!-- fate:hyperchute/h_burnout.prose -->
Sofia would call it a fault cascade. Priya would call it the thing that kills founders faster than money runs out. The mirror keeps it simpler. The whole company depends on one exhausted body. Something gives this week. You choose what.

### h_burnout · choice 1
<!-- fate:hyperchute/h_burnout.choice[0].label -->
Three weeks somewhere with no sky traffic. Doctor’s orders.

<!-- fate:hyperchute/h_burnout.choice[0].result -->
The company survives three weeks without you, which is its own hard lesson. You come back lighter, and the first thing you do is write down everything that only lived in your head.

### h_burnout · choice 2
<!-- fate:hyperchute/h_burnout.choice[1].label -->
White-knuckle it. Founders don’t rest.

<!-- fate:hyperchute/h_burnout.choice[1].result -->
You stay at the bench. The work gets done, worse than usual, by someone the team has quietly started managing around. Next time, the same pressure will hit an emptier body.

### h_burnout · choice 3
<!-- fate:hyperchute/h_burnout.choice[2].label -->
Walk away. The receivers can have it.

<!-- fate:hyperchute/h_burnout.choice[2].result -->
Some ledgers only balance when you close them.

## HYPERCHUTE · ENDINGS

### ending: triumph_ipo — THE PEOPLE’S NETWORK [triumph]
<!-- fate:hyperchute/end.triumph_ipo.prose -->
HYPERCHUTE lists at 9:31 a.m. Mrs. Delgado holds the ceremonial button on the exchange floor, still wearing her house slippers under the borrowed coat. The railway in the sky belongs to the street it was built for — and to the founder who held the line against a giant, a discount, and common sense.

#### ending triumph_ipo · film screen 1
<!-- fate:hyperchute/end.triumph_ipo.screen[0].prose -->
The night before the company goes public, the pricing call runs ninety minutes past midnight. The lead banker keeps circling the high share price with his pen — the one that makes headlines. You keep saying the lower one — the one ordinary families can survive if the market turns ugly.

When you say it out loud for the last time, the line goes quiet. Priya, on mute in the corner of your screen, closes her eyes like a woman hearing a bet she made years ago finally come in.

#### ending triumph_ipo · film screen 2
<!-- fate:hyperchute/end.triumph_ipo.screen[1].prose -->
The exchange floor at 9:28 a.m. smells like carpet cleaner and adrenaline. Somebody hands you a paddle with your own ticker on it, and you realize your hands are steady for the first time in three years.

Mrs. Delgado stands at the podium rail in a borrowed coat, house slippers underneath, because at eighty-one she has earned the right to be comfortable at other people’s ceremonies. She holds the ceremonial button the way she once held your first rent envelope — like it belongs to the block.

At 9:31 she presses it, and the bell rings louder than you expected. It sounds like dryers.

#### ending triumph_ipo · film screen 3
<!-- fate:hyperchute/end.triumph_ipo.screen[2].prose -->
By the time the market closes, the railway in the sky belongs to teachers’ pension funds, index funds, and a retired dispatcher in Ohio who bought eleven shares at lunch. The cover of the offering documents says what the lawyers fought and lost. THE NEIGHBORHOODS IT SERVES.

Over the Flats that evening, the shuttles hover where they always have, dropping packages soft as rain onto porches that used to sit in a gray zone on somebody’s map. The map was wrong. You are the proof.

#### ending triumph_ipo · film screen 4
<!-- fate:hyperchute/end.triumph_ipo.screen[3].prose -->
Somewhere in a MERIDIAN planning office, a printer hums out a new corridor map. The old LOW-DENSITY YIELD stamp over your neighborhood is gone.

The new stamp says COMPETITOR.

#### ending triumph_ipo · interlude (the years after)
<!-- fate:hyperchute/end.triumph_ipo.interlude.prose -->
Two years of board decks and quarterly smiles. You are rich in the way headlines understand. The sky over the Flats is full of your shuttles and someone else’s ambitions. Every parcel that drops soft as rain makes the next impossible thing itch. June answers on the first ring, the way she has since the beginning. “I knew it. What are we building?”

### ending: acquired — DISSOLVED INTO BLUE [sale]
<!-- fate:hyperchute/end.acquired.prose -->
The tubes still run. MERIDIAN painted them blue and sends them wherever margins are best, which is rarely where anyone lives. You are rich. Some nights that feels like winning. Some nights the Flats sticker on the receiver sleeve tells the truth.

#### ending acquired · interlude (the years after)
<!-- fate:hyperchute/end.acquired.interlude.prose -->
Four years of vesting inside the company that buried you. A good office with your name on the door and no window. You watch MERIDIAN starve your corridors, close them, and call it efficiency. In the fourth winter you pass your old prototype in the lobby glass. The non-compete expired in June. You call June Park that night. She picks up before the first ring ends. “There you are,” she says. “What took you so long?”

### ending: bankrupt — BANKRUPT BUT BELOVED [noble]
<!-- fate:hyperchute/end.bankrupt.prose -->
The bank takes the shuttles back. The neighborhood keeps what it saw. Sixty porches watched parcels fall out of the sky like weather that loved them. Doors close. Some stay unlocked.

#### ending bankrupt · interlude (the years after)
<!-- fate:hyperchute/end.bankrupt.interlude.prose -->
A year in your parents’ basement, consulting for people who want your scar tissue more than your ideas. Your old bedroom still has the model rockets. At dinner, the quiet feels like its own kind of love. You drive a delivery van for a competitor for three months, just to learn their routes from the inside. The cards from sixty porches live in a shoebox you keep private. When the phone finally rings about something new, failure has made you ready.

### ending: become_them — YOU BECAME WHAT YOU FOUGHT [disgrace]
<!-- fate:hyperchute/end.become_them.prose -->
The badge is heavy. Each year it feels lighter. Your old prototype hangs in the MERIDIAN lobby under glass, labeled HERITAGE ARTIFACT. Sometimes you ride past the laundromat in the black car and keep your eyes on the road.

#### ending become_them · interlude (the years after)
<!-- fate:hyperchute/end.become_them.interlude.prose -->
Five years, three promotions, one division. You are very good at this, which makes it worse. The corridors you once flew close in April, quietly. The press release has your signature at the bottom because that is the job. At night, you open the folder of things you would build if you were free. The non-compete runs out on a Tuesday. You are at June’s door Wednesday.

### ending: walkaway_opensource — THE STACK BELONGS TO EVERYONE [transformation]
<!-- fate:hyperchute/end.walkaway_opensource.prose -->
You publish everything — the flight controller, the tube spec, the descent safety case. Within a year, four hundred small railways cross four hundred neighborhoods. Each one wears a different name. That is exactly what you wanted.

#### ending walkaway_opensource · interlude (the years after)
<!-- fate:hyperchute/end.walkaway_opensource.interlude.prose -->
Two years keeping the foundation lean and the spec honest. Four hundred little skies, each with its own name. Then a postcard arrives from Cape Canaveral — relay satellites, launch windows, and a handwritten line. THE NEXT RAILWAY DOESN’T STOP AT THE ATMOSPHERE. You know the handwriting. It used to be yours.


---

# TELEPORT, INC. — Be there without going.

## TELEPORT · OPENING FILM

### film screen 1 — THE ITCH
<!-- fate:teleport/prologue[0].prose -->
It starts with looking up, the way it always has.

The last company is over, and whatever it paid you in money and cost you in scars, one thing came through untouched: the itch. You catch yourself at windows. You read launch schedules the way other people read box scores. The sky over every city you visit is full of other people’s machines moving other people’s cargo. The one thing you cannot stop thinking about is still up there, waiting.

### film screen 2 — THE PROBLEM
<!-- fate:teleport/prologue[1].prose -->
There are people on the Moon now. Bases, crews, contracts, a working pole. Every hour of human work up there costs a fortune and risks a life. Down here, the best machine operators alive sit in chairs, ready to help. Light itself needs 1.3 seconds to reach the Moon, and 1.3 more to come back. Radio moves at that speed too. A hand on the Moon will always answer 2.6 seconds behind the person driving it.

Everyone in the industry says that gap kills remote work. Too laggy to trust. Too dangerous to sell.

Everyone said your last impossible thing was impossible too.

### film screen 3 — THE THESIS
<!-- fate:teleport/prologue[2].prose -->
Then someone sends you a nine-year-old research paper. Four hundred pages. Self-published, because no science journal would print math that long.

The idea inside it is a chain of relay satellites between Earth and Moon, each one handing the signal to the next like firefighters passing buckets. Built right, the chain keeps every handoff clean. The Moon comes down to a guaranteed 2.6 seconds — the smallest delay the laws of physics allow.

The author spent nine years being politely refused by every agency and fund in the industry. His name is Dr. Omid Farrokh. In the margin of page one, in careful engineer’s handwriting, he has written: THE DELAY IS THE PROOF. PRETENDING IS THE ENEMY.

### film screen 4 — THE CAPE
<!-- fate:teleport/prologue[3].prose -->
You lease the hangar over the phone, sight unseen, from a county desperate to rent history: Cape Canaveral, the old coast, where the road to space has started for a hundred years.

You have whatever the last life paid out, a lease, and a Tuesday meeting with a man carrying his life’s work in a cardboard box.

You are buying a chair on Earth, a body on the Moon, and the two point six seconds in between — sold honest, all the way through.

Last night you filed the papers for a company called TELEPORT, INC., and its whole promise fits in four words.

Be there without going.

## t_entry · THE MAN WITH THE THESIS [scene] — speaker: Dr. Omid Farrokh

<!-- fate:teleport/t_entry.leadIn -->
The hangar you leased sight unseen smells of salt and old jet fuel. The Cape lies flat and bright outside. After the last company, its calm feels almost like respect.

<!-- fate:teleport/t_entry.prose -->
Dr. Omid Farrokh arrives with a cardboard box of bound printouts and a silence where small talk would go. He spent nine years at NASA, trying to fund one idea: a chain of relay satellites that hands a signal from one to the next, cutting a Moon round trip to 2.6 seconds. “Everyone called the market science fiction,” he says, setting the box on your one table. “Then you flew parcels over a neighborhood everyone ignored.” He looks up. “I want my work built, with my name on it, beside someone who ships. I read everything about you, including the bad quarter.” He slides over the top printout. On the cover, in his handwriting: A BODY ON THE MOON, A CHAIR ON EARTH.

### t_entry · choice 1 → t_pact
<!-- fate:teleport/t_entry.choice[0].label -->
Shake his hand. Build it together.

<!-- fate:teleport/t_entry.choice[0].result -->
His handshake is careful, like the rest of him. “Good,” he says. “Now we have the hard talk. Better before lawyers enter the room.”

### t_entry · choice 2 → t_pact
<!-- fate:teleport/t_entry.choice[1].label -->
Test him first. Pick the thesis apart for an hour.

<!-- fate:teleport/t_entry.choice[1].result -->
You press on signal strength, handover timing, and the fuel needed to keep satellites in place. He answers as if he has waited years for real questions. By the end, the whiteboard is full, and he is smiling for the first time.

### t_entry · choice 3 → t_pact
<!-- fate:teleport/t_entry.choice[2].label -->
Be honest: you wanted to do this alone.

<!-- fate:teleport/t_entry.choice[2].result -->
“I know,” he says, calm. “Hyperchute was yours alone. This one is physics, and physics has never cared how any founder likes to work.” He waits while you look at the cover page again. He is right, and both of you know it.

## t_pact · THE SPLIT [scene] — speaker: Dr. Omid Farrokh

<!-- fate:teleport/t_pact.leadIn -->
Before lawyers arrive, Omid wants the real deal in plain language: who owns what, who decides, and what each of you is worth.

<!-- fate:teleport/t_pact.prose -->
At one table, Omid writes three splits on a legal pad. “Fifty-fifty means true partners. Sixty-forty means you lead the company and my life’s work lives inside it. Past that,” he taps the third number, “I become an employee with a nice title, and we should say that clearly.” He puts the pen between you. “I invented the relay chain. You know how to make a company survive the world. Circle the number that matches that. I’ll sign it. I’ll also remember it.”

### t_pact · choice 1 → t_b_first_night
<!-- fate:teleport/t_pact.choice[0].label -->
Even partners. Fifty-fifty.

<!-- fate:teleport/t_pact.choice[0].result -->
He signs without ceremony. Then he writes the date on the corner of the legal pad and tears it off for you to keep. “For when this gets hard,” he says. “It will.”

### t_pact · choice 2 → t_b_first_night
<!-- fate:teleport/t_pact.choice[1].label -->
Sixty-forty. Someone has to break ties.

<!-- fate:teleport/t_pact.choice[1].result -->
“Sixty-forty,” he repeats. He signs. “For the record: I’d have taken fifty-five.” It is his only joke all day, and the joke carries weight.

### t_pact · choice 3 → t_b_first_night
<!-- fate:teleport/t_pact.choice[2].label -->
Seventy-thirty. Market standard for a technical cofounder.

<!-- fate:teleport/t_pact.choice[2].result -->
A long pause. He signs, folds his copy with two exact creases, and says, “Market standard. Yes. I have spent nine years learning what the market thinks my work is worth.” He stays polite for the rest of the day. The room loses something.

## t_b_first_night · TWO CHAIRS, ONE HANGAR [bridge]

<!-- fate:teleport/t_b_first_night.prose -->
At 11 p.m. the paperwork files. TELEPORT, INC., two signatures, a hangar lease, and a cardboard box of physics. Omid stays late, laying his printouts on a steel shelf like sacred books. Outside, a HALCYON rocket climbs from a pad eleven miles south. You see the light first. The thunder reaches the roof a few seconds later because sound is slow and the rocket is far away. Neither of you speaks. That gap becomes the whole company — the time it takes for a far thing to reach you, and what a machine can do while it waits.

### t_b_first_night · choice 1 → t_june_condition
<!-- fate:teleport/t_b_first_night.choice[0].label -->
Continue

## t_june_condition · JUNE’S CONDITION [scene] — speaker: June Park

<!-- fate:teleport/t_june_condition.leadIn -->
June Park calls before the incorporation ink is dry. Of course she already knows. Two days later she flies to the Cape, picks the diner by the causeway, orders before you arrive, and sets a closed folder beside her coffee.

<!-- fate:teleport/t_june_condition.prose -->
June listens to the whole pitch without touching her coffee, then opens the folder and slides a seed term sheet across the table, already drafted. “Six hundred and fifty thousand,” she says. “One condition. The money comes with me.” The second page reads CHIEF FINANCIAL OFFICER. “I wrote eleven angel checks and watched other people do the building. Before the money found me, I ran operations for nine years, and that was the work I was actually good at. I’m asking to be your third founder.” For the first time since you have known her, June looks nervous.

### t_june_condition · choice 1 → t_b_warroom
<!-- fate:teleport/t_june_condition.choice[0].label -->
Third founder. Welcome home, June.

<!-- fate:teleport/t_june_condition.choice[0].result -->
She exhales like a woman who held her breath through eleven companies. By Friday she has a desk in the hangar, a payroll system, and a spreadsheet titled WAYS WE DIE. She updates it every week, sends it to all three founders, and makes it the funniest document you fear.

### t_june_condition · choice 2 → t_b_warroom
<!-- fate:teleport/t_june_condition.choice[1].label -->
Take the money, keep her an angel. Gently.

<!-- fate:teleport/t_june_condition.choice[1].result -->
She takes it better than you deserve. She cuts the check to four hundred, wires it that day, and wishes you both luck. Her voice turns formal. Her texts, which once came at midnight full of ideas, now arrive at 10 a.m. full of questions.

### t_june_condition · choice 3 → t_b_warroom
<!-- fate:teleport/t_june_condition.choice[2].label -->
No investors yet. Not even June.

<!-- fate:teleport/t_june_condition.choice[2].result -->
“Huh,” she says, studying you. “Bootstrapping a space company. Best judgment I’ve ever seen from you, or worst.” She pays for lunch and leaves the folder on the table. “When it gets expensive, and it will, you know my number.”

## t_b_warroom · THE MAP OF EVERYTHING [bridge]

<!-- fate:teleport/t_b_warroom.prose -->
Omid takes over the hangar’s back wall and builds what he calls the map of everything. Flight paths around the Moon, drawn in chalk. Magnets for relay satellites. Cost charts taped over older cost charts. In the center hang two photographs: the Moon, gray and close, and Mars, red and far beyond reach. For a week, every conversation in the building drifts toward the same fight, until on Friday Omid finally calls it — founders only, door shut, one hour. Everyone knows what the hour will decide.

### t_b_warroom · choice 1 → t_moon_v_mars
<!-- fate:teleport/t_b_warroom.choice[0].label -->
Continue

## t_moon_v_mars · MOON VERSUS MARS [scene] — speaker: Dr. Omid Farrokh

<!-- fate:teleport/t_moon_v_mars.leadIn -->
The door shuts, and the argument you have circled all week finally lands on the table. This hour will decide which world TELEPORT serves first.

<!-- fate:teleport/t_moon_v_mars.prose -->
Omid starts with Mars. Of course he does. “The Moon is a demo. Mars is the thesis. Four to twenty-four minutes of delay is the problem worth a life.” His relay chain was born for Mars, and the industry knows it. The numbers on the wall tell a harsher story. Mars is a decade and a billion dollars away. The Moon has bases, contracts, tourists, and a 2.6-second delay you can sell honestly if you are brave enough. Omid looks at you. “You’re the tiebreak,” he says quietly. “Break it.”

### t_moon_v_mars · variant 1 (plays when its condition is true)
<!-- fate:teleport/t_moon_v_mars.vary[0].prose -->
Omid starts with Mars. Of course he does. “The Moon is a demo. Mars is the thesis. Four to twenty-four minutes of delay is the problem worth a life.” His relay chain was born for Mars, and the industry knows it. The numbers on the wall tell a harsher story. Mars is a decade and a billion dollars away. The Moon has bases, contracts, tourists, and a 2.6-second delay you can sell honestly if you are brave enough. June says it plainly: “Mars is a religion. The Moon is a business.” Omid looks at you. “You’re the tiebreak,” he says quietly. “Break it.”

### t_moon_v_mars · choice 1 → t_b_moon_won
<!-- fate:teleport/t_moon_v_mars.choice[0].label -->
Moon now. Mars when the cascade earns it — in writing.

<!-- fate:teleport/t_moon_v_mars.choice[0].result -->
You write it on the wall under the red photograph, dated and signed: MARS, WHEN THE MOON PAYS FOR IT. Omid reads it twice. “Then I’ll build you a Moon business,” he says, “that Mars can be proud of.” The argument quiets, for now.

### t_moon_v_mars · choice 2 → t_b_moon_won
<!-- fate:teleport/t_moon_v_mars.choice[1].label -->
Moon only. Take Mars off the wall.

<!-- fate:teleport/t_moon_v_mars.choice[1].result -->
You take the red photograph down yourself. That is the honest way, and the room still goes one degree colder. Omid nods, says “Understood,” and works the rest of the day in silence. By morning the photo is gone from the trash. You leave that mystery alone.

### t_moon_v_mars · choice 3 → t_b_moon_won
<!-- fate:teleport/t_moon_v_mars.choice[2].label -->
Split the lab. Keep one small Mars bench alive.

<!-- fate:teleport/t_moon_v_mars.choice[2].result -->
One bench, one junior engineer, one long-shot Mars test running at night on borrowed computers. It barely counts as a program. It is a candle, and Omid tends it that way. The ledger records its exact cost, and nobody argues with a number that small. Yet.

## t_b_moon_won · THE COMPANY THE HOUR BUILT [bridge]

<!-- fate:teleport/t_b_moon_won.prose -->
The fight settles into the walls. The map gets rebuilt around one gray photograph, and the company that comes out of that hour is simpler and harder. Relay satellites around the Moon. Robot bodies at the south pole. A chair on Earth that anyone can sit in. Rockets lift off south of you every few days, always carrying someone else’s dream. Rent comes due. Payroll comes due. The box of physics keeps turning into invoices. Next, TELEPORT needs hardware tough enough for another world. The only man who builds machines that good is an hour north, in Fresno.

### t_b_moon_won · choice 1 → t_ray_bodies
<!-- fate:teleport/t_b_moon_won.choice[0].label -->
Continue

## t_ray_bodies · THE ONLY HANDS IN TOWN [scene] — speaker: Ray Freres

<!-- fate:teleport/t_ray_bodies.leadIn -->
Ray Freres has moved his shop twice since Hyperchute and changed almost nothing: the handwritten ledger by the register remains, along with his habit of trusting nobody and delivering early.

<!-- fate:teleport/t_ray_bodies.prose -->
He walks the requirements sheet once, lips moving at the hard parts. You need a robot body that survives moon dust, a 300-degree temperature swing, and a tourist at the controls. “Everyone wants space now,” he says. “Space is just weather that hates you.” His quote is plain: space-grade parts, three prototype bodies. “Cash up front and I start Monday. Terms and you wait behind my other customers. Your call. I remember how you paid last time, and so does the book.”

### t_ray_bodies · choice 1 → t_b_bodies_started
<!-- fate:teleport/t_ray_bodies.choice[0].label -->
Cash up front. Start Monday.

<!-- fate:teleport/t_ray_bodies.choice[0].result -->
He initials the ledger in front of you, which from Ray Freres is a medal ceremony. The first body frame is on the bench before the wire clears.

### t_ray_bodies · choice 2 → t_b_bodies_started
<!-- fate:teleport/t_ray_bodies.choice[1].label -->
Half now, half on delivery.

<!-- fate:teleport/t_ray_bodies.choice[1].result -->
“Half,” he allows, and slots you behind a satellite job and somebody’s defense contract. You will get your bodies. You will get them when you get them.

### t_ray_bodies · choice 3 → t_b_bodies_started
<!-- fate:teleport/t_ray_bodies.choice[2].label -->
Build them in-house. How hard can a Moon robot be?

<!-- fate:teleport/t_ray_bodies.choice[2].result -->
Ray gives the shrug of a man adding your name to a private list called FOUNDERS WHO LEARNED. You hire two machinists and buy the machine that cuts the metal. The hangar starts sounding like a real company and burning money like one too.

## t_b_bodies_started · SOMETHING WITH HANDS [bridge]

<!-- fate:teleport/t_b_bodies_started.prose -->
Six weeks later, something with hands stands in the corner of the hangar, cabled to a rack like a patient on monitors. It is ugly, test-gray, with camera masts where a head should be. When Omid runs the arm through its wake-up routine, the shop floor stops every time. A machine built to reach asks for that much respect. The relay math lives unseen in server racks. The body is the first piece of TELEPORT you can stand in front of, which makes it the first piece the world can see.

### t_b_bodies_started · choice 1 → t_cascade_test
<!-- fate:teleport/t_b_bodies_started.choice[0].label -->
Continue

## t_cascade_test · TWO POINT SIX [scene] — speaker: Dr. Omid Farrokh

<!-- fate:teleport/t_cascade_test.leadIn -->
The first full relay-chain test uses rented time on three commercial satellites and a leased dish in Chile. The Moon stands in as itself, and every signal travels for real.

<!-- fate:teleport/t_cascade_test.prose -->
Mission control is four desks pushed together. Omid counts down the handover like a man defusing a bomb. The command leaves Earth. The counter he built, huge red digits and no mercy, climbs through the silence. At 2.61 seconds, the test rig at the far end closes its hand around a rubber ball, and four desks of people jump up at once. Omid stays seated, watching the counter with a look you will remember for years. “Two point six,” he says. “That number is the product. The ads can say anything. The customer buys those two point six seconds. Keep the number exactly as it is.”

### t_cascade_test · choice 1
<!-- fate:teleport/t_cascade_test.choice[0].label -->
Frame the number. Hang it where visitors see it.

<!-- fate:teleport/t_cascade_test.choice[0].result -->
2.61 goes up by the door on a captionless poster. Half the visitors ask about it, which is the point. Omid never mentions the poster, but you catch him straightening it once, with one finger, on his way past.

### t_cascade_test · choice 2
<!-- fate:teleport/t_cascade_test.choice[1].label -->
Celebrate tonight. Worry about messaging later.

<!-- fate:teleport/t_cascade_test.choice[1].result -->
Someone finds a taquería that caters at 9 p.m. and the hangar fills with folding chairs and machinists’ families. It is the first good night the company has ever had, and for one evening nobody says the word runway.

### t_cascade_test · choice 3
<!-- fate:teleport/t_cascade_test.choice[2].label -->
Invite a Shackleton Verge observer to the next run.

<!-- fate:teleport/t_cascade_test.choice[2].result -->
Commander Rafael Salazar watches by video from the lunar south pole, arms folded, and says three words in forty minutes: “Run it again.” You run it again. It holds. “Interesting,” he says. People who know him later tell you this is the highest rating he has ever given anything with a sales team.

## t_quote · THE QUOTE [scene · gated]

<!-- fate:teleport/t_quote.leadIn -->
The Lunar Commerce Expo is eleven weeks away. For three days, every Moon base operator, tourist broker, and space investor will share one hall. To earn their attention, your test machine needs to become safe enough for a live public demo.

<!-- fate:teleport/t_quote.prose -->
The quote lands on a Tuesday and sits in the middle of the table like a verdict. It covers toughening the demo body, booking live relay time during the expo, and the insurance the hall demands before you can drive a robot by satellite in front of a crowd. The total sits brutally close to everything the company has left. The math says the same thing no matter who reads it: pay this, and the account drops near zero until new money lands. The expo only works as a full bet.

### t_quote · variant 1 (plays when its condition is true)
### t_quote · choice 1 → t_allin_expo
<!-- fate:teleport/t_quote.choice[0].label -->
Pay it in full. Flight-rate everything.

<!-- fate:teleport/t_quote.choice[0].result -->
The wire goes out at 4:59 p.m. The bank balance that returns has one fewer comma than you are used to. Omid looks over your shoulder and says, quietly, “Good. Now it’s real.”

### t_quote · choice 2 → t_allin_expo
<!-- fate:teleport/t_quote.choice[1].label -->
Half the package. Rate the body, skimp the backup relay.

<!-- fate:teleport/t_quote.choice[1].result -->
One relay path instead of two. Omid signs off with the joy of a surgeon told to operate with one glove. Then he doubles his test schedule without being asked.

### t_quote · choice 3 → t_allin_expo
<!-- fate:teleport/t_quote.choice[2].label -->
Ray builds it on credit. The ledger remembers.

<!-- fate:teleport/t_quote.choice[2].result -->
Ray hears the bank balance in your voice before you finish asking. He builds the flight kit on terms, initials a new line in the handwritten book, and says only, “Everyone gets one.” You are on the wrong page of the ledger now. Both of you know what that page costs later.

## t_allin_expo · ALL OF IT [scene]

<!-- fate:teleport/t_allin_expo.leadIn -->
After the quote clears, the account can keep the lights on and payroll paid if nothing surprises you. The expo still has one more page of costs, and every line is a surprise.

<!-- fate:teleport/t_allin_expo.prose -->
Booth space. Freight for a robot in a crate the size of a casket. Hall labor, required. Hotel rooms, deposit due now. Do the expo right, and it eats almost everything left. Do it cheap, and ten thousand people meet a cheap company. Skip it, and you wait a full year for another room like this. Around the table, nobody says runway. Everyone has done this math before, at another company, in a worse chair. Three days in that hall will decide what TELEPORT becomes.

### t_allin_expo · choice 1 → t_b_expo_eve
<!-- fate:teleport/t_allin_expo.choice[0].label -->
The full booth. Look like the future or stay home.

<!-- fate:teleport/t_allin_expo.choice[0].result -->
Island booth, twenty-by-twenty, the body on a raised stage under a single spot. The renderings look like a company forty times your size. That is exactly the crime you plan to commit.

### t_allin_expo · choice 2 → t_b_expo_eve
<!-- fate:teleport/t_allin_expo.choice[1].label -->
A modest corner booth. Let the machine do the talking.

<!-- fate:teleport/t_allin_expo.choice[1].result -->
Ten-by-ten at the end of an aisle, between a valve maker and a startup selling moon-dust-safe grease. Fine. The body doesn’t know what size the booth is.

### t_allin_expo · choice 3 → t_b_expo_eve
<!-- fate:teleport/t_allin_expo.choice[2].label -->
No booth. Borrowed badges and audacity.

<!-- fate:teleport/t_allin_expo.choice[2].result -->
Ray’s shop has spare exhibitor badges and a friendly freight handler who owes him. The plan would embarrass a heist movie. Park the crate at his booth’s edge, find power, and demo in the aisle until security notices. Ray points out, delighted, that legends and restraining orders often start the same way.

## t_b_expo_eve · THE NIGHT BEFORE [bridge]

<!-- fate:teleport/t_b_expo_eve.prose -->
The hotel is the mid-price kind where every hallway smells faintly of chlorine and ambition. You run the company card for the rooms and watch the machine think one second too long before it approves. You decide to leave the mystery alone. Upstairs, Omid checks the relay booking emails until the numbers blur. Below you, in a loading dock lit like an interrogation room, a crate the size of a casket holds the whole company. Tomorrow, ten thousand people will walk past. Tonight, it is the ceiling, the math, and your heart keeping launch time.

### t_b_expo_eve · choice 1 → t_expo_demo
<!-- fate:teleport/t_b_expo_eve.choice[0].label -->
Continue

## t_expo_demo · A CHAIR ON EARTH [scene]

<!-- fate:teleport/t_expo_demo.leadIn -->
Day one. The hall is built from other people’s money: full-size lander mockups, a sixty-foot LED Moon, and HALCYON’s pavilion with its own second floor. Then there is yours: one body, one chair, one live link to a rented test yard, and a counter with big red digits.

<!-- fate:teleport/t_expo_demo.prose -->
The demo is simple on purpose. A stranger sits in the chair. Far away, the robot body wakes under their hands. They reach. Two point six seconds later, on the screen, the hand reaches too. The delay is visible. Every remote-robot pitch has tried to hide that gap. The crowd is watching to see what you do with it.

### t_expo_demo · choice 1 → t_expo_checks
<!-- fate:teleport/t_expo_demo.choice[0].label -->
Name the delay. Make the room count it out loud.

<!-- fate:teleport/t_expo_demo.choice[0].result -->
“Two point six seconds,” you tell every audience, every hour, “is the speed of light being honest with you.” By day two, the crowd counts the gap out loud like a launch and cheers when the hand closes. HALCYON’s pavilion has a second floor. You have the only booth in the building with a chant.

### t_expo_demo · choice 2 → t_expo_checks
<!-- fate:teleport/t_expo_demo.choice[1].label -->
Choreograph around it. Keep the magic seamless.

<!-- fate:teleport/t_expo_demo.choice[1].result -->
Scripted motions, props set in advance, and patter timed to cover the gap. It works. The demo feels like magic, and the crowd never learns there was a gap to hide. Omid runs the chair all day with the face of a concert pianist playing a jingle.

### t_expo_demo · choice 3 → t_expo_checks
<!-- fate:teleport/t_expo_demo.choice[2].label -->
Hand the chair to strangers. Let the Moon be the Moon.

<!-- fate:teleport/t_expo_demo.choice[2].result -->
Unscripted hands, honest gap, occasional fumbles. Once, when the link hiccups, thirty seconds of bare silence arrives and stays with you at 3 a.m. for a year. Strangers still walk away saying the one sentence money cannot buy: “I touched it. It was real.”

## t_expo_checks · THREE PIECES OF PAPER [scene]

<!-- fate:teleport/t_expo_checks.leadIn -->
By the last afternoon, your voice is gone, the demo body needs a new wrist motor, and three people are waiting to talk to you at once. There are worse problems. You have had most of them.

<!-- fate:teleport/t_expo_checks.prose -->
They arrive in order of gravity. Commander Rafael Salazar, down from the Moon for the expo and visibly allergic to it, watches the demo twice. “My maintenance backlog at the Verge is nine months. Your body, my base, a paid pilot program. Letter of intent, my signature, today.” Then Elliot Vance of ATLAS, older and still signing things in public, says, “I owed you a proper deal from the last life. Four hundred thousand, strategic, no board seat. SOMEDAY, PROPERLY, and today’s the day.” At the end of the aisle, a calm man in a gray suit wears a badge with a blank company line. Conrad Hale. “ALEPH has been watching your flight records all week,” he says. “The fund would like to lead your Series A. Dinner?”

### t_expo_checks · choice 1 → t_hotel_card
<!-- fate:teleport/t_expo_checks.choice[0].label -->
Sign Salazar’s letter of intent on the crate lid, right now.

<!-- fate:teleport/t_expo_checks.choice[0].result -->
He signs on the crate lid like it is a field desk, which for him it is. “Paper first, dinner never,” he says, already leaving. An hour later Vance signs his check at the booth, writing SOMEDAY, PROPERLY on the memo line in fountain pen, and Hale’s dinner invitation still stands. Money from customers before money from investors — Salazar would approve of the order.

### t_expo_checks · choice 2 → t_hotel_card
<!-- fate:teleport/t_expo_checks.choice[1].label -->
Take Vance’s check first, before his company’s lawyers can kill it.

<!-- fate:teleport/t_expo_checks.choice[1].result -->
He signs it at the booth counter with the same fountain pen as the coffee shop, years ago, and taps the memo line: SOMEDAY, PROPERLY — PAID. “Frame this one too,” he says. Salazar’s letter of intent gets signed twenty minutes later on the crate lid anyway. He waited, arms folded, timing you.

### t_expo_checks · choice 3 → t_hotel_card
<!-- fate:teleport/t_expo_checks.choice[2].label -->
Do all three tonight: Salazar’s letter, Vance’s check, dinner with Hale.

<!-- fate:teleport/t_expo_checks.choice[2].result -->
Salazar’s letter at five, Vance’s check at seven, dinner with Conrad Hale at nine. Hale orders for the table without looking at the menu and asks questions that sound pulled from your bank statements. They were.

## t_hotel_card · DECLINED [scene]

<!-- fate:teleport/t_hotel_card.leadIn -->
Checkout, day four. In your bag: a signed letter of intent from a lunar base, an investment check that hasn’t cleared yet, and a handshake deal from dinner. At the front desk, the clerk runs your company card.

<!-- fate:teleport/t_hotel_card.prose -->
The desk clerk runs the company card for the rooms, and the machine makes a sound you remember from the garage years — one small, polite, catastrophic beep. DECLINED. She tries again, because people are kind, and the machine beeps again. The money is real. You checked the balance twice from the elevator. But the freight company’s automatic charge hit the account at 6 a.m., and a charge that large tripped the bank’s fraud alarm, which froze the card on the spot. The department that unfreezes cards opens Monday. It is Friday. Behind you, half the space industry is checking out of the same hotel, and you are, for one long weekend, a founder with money he cannot touch. The clerk looks up with professional mercy and quietly asks if you have another card.

### t_hotel_card · choice 1 → t_hale_terms
<!-- fate:teleport/t_hotel_card.choice[0].label -->
Ask June to put it on her personal card.

<!-- fate:teleport/t_hotel_card.choice[0].result -->
Her personal card taps once. She keeps her eyes on the clerk. The conversation about freight keeps moving, as if nothing happened. In the shuttle to the airport she finally says, “We are never telling Hale about this,” and you both laugh the specific laugh of people who were nearly dead an hour ago.

### t_hotel_card · choice 2 → t_hale_terms
<!-- fate:teleport/t_hotel_card.choice[1].label -->
Accept Omid’s personal card.

<!-- fate:teleport/t_hotel_card.choice[1].result -->
He has it out of his wallet before the second beep finishes, and pays a five-figure hotel bill with the flat expression of a man buying gum. Later, on the plane, he says the only thing he will ever say about it: “Nine years nobody funded me. I know that sound. I hear it once. Then I pay.”

### t_hotel_card · choice 3 → t_hale_terms
<!-- fate:teleport/t_hotel_card.choice[2].label -->
Talk the hotel into billing the company later.

<!-- fate:teleport/t_hotel_card.choice[2].result -->
It takes a manager, a copy of Salazar’s signed letter as proof the company is real, and every ounce of charm left in your ruined voice. The hotel agrees to bill you. You walk through a lobby full of the industry you are about to join, locked out of your own money until Monday, carrying the company’s future in a tote bag.

## t_hale_terms · THE MODEL’S OFFER [scene · gated] — speaker: Conrad Hale

<!-- fate:teleport/t_hale_terms.leadIn -->
Vance’s $400,000 wire lands like rain on dry ground, and the Verge pilot is being turned into a contract. Then ALEPH’s term sheet arrives. Page one is the deal. Page two is a summary of your company, written by the model and sharper than your own board deck.

<!-- fate:teleport/t_hale_terms.prose -->
Conrad Hale takes the good chair in your borrowed conference room and lets the document do the talking. Two and a half million dollars, at a fair price — honestly fair, because ALEPH never haggles, it calculates. The part that matters hides in the fine print: one board seat for the fund, filled by Hale, plus the right to pick the fifth director when the board grows. Whoever names that fifth seat may someday control a tie vote. “The model cares about clean board math,” Hale says, watching you read. “Its words, not mine.” In a data center that never sleeps, a system that has read every document you ever signed is waiting for your answer.

### t_hale_terms · choice 1 → t_cut_first_light
<!-- fate:teleport/t_hale_terms.choice[0].label -->
Take it — but the independent seat stays yours to name.

<!-- fate:teleport/t_hale_terms.choice[0].result -->
Hale steps out to “consult,” which means to read. Eleven minutes later he returns. “The model watched your expo demo. It says a founder who names the delay out loud can name a director.” He initials the change by hand. It is the first thing the fund has ever conceded, and Conrad Hale looks briefly, humanly, delighted.

### t_hale_terms · choice 2 → t_cut_first_light
<!-- fate:teleport/t_hale_terms.choice[1].label -->
Take the deal as written. Money now, governance later.

<!-- fate:teleport/t_hale_terms.choice[1].result -->
You sign the deal as written, exactly as the model expected. Page two had already predicted that. The wire lands before Hale reaches the parking lot. In clause 8(c), a board seat outside your control begins waiting for its day.

### t_hale_terms · choice 3 → t_cut_first_light
<!-- fate:teleport/t_hale_terms.choice[2].label -->
Refuse the model’s money. Revenue is the round.

<!-- fate:teleport/t_hale_terms.choice[2].result -->
Hale closes the folder without offense. “For the record, I advised the model you might. It gave that outcome nine percent.” He shakes your hand at the door, and his face carries something like envy. “Most people never get to see what turning it down looks like.”

## t_cut_first_light · FIRST LIGHT [cutscene]

<!-- fate:teleport/t_cut_first_light.prose -->
The relay ring is complete. TELEPORT is more than a demo with a counter. It is part of how the Moon works now, humming overhead. Year two begins with light.

### t_cut_first_light · film screen 1
<!-- fate:teleport/t_cut_first_light.screen[0].prose -->
The satellites go up three at a time. Three relays per rocket, four launches, a winter of permits and licenses. Then, one night in the hangar, Omid connects the final satellite to the chain. The ring wakes on the wall map like streetlights around the Moon.

### t_cut_first_light · film screen 2
<!-- fate:teleport/t_cut_first_light.screen[1].prose -->
He stays quiet. He stands in front of the map with his hands in his pockets for a long time, looking at nine unfunded years turned into light.

Then he picks up the microphone, opens the test channel to the body waiting at the pole, and says the first word ever carried end to end on his relay chain:

“Hello.”

Two point six seconds later, the hand at Shackleton waves.

### t_cut_first_light · choice 1 → t_salazar_contract
<!-- fate:teleport/t_cut_first_light.choice[0].label -->
Begin year two

## t_salazar_contract · THE VERGE CONTRACT [scene] — speaker: Cmdr. Rafael Salazar

<!-- fate:teleport/t_salazar_contract.leadIn -->
The pilot program at Shackleton Verge runs ninety days without excuses. Commander Salazar’s review arrives as one line — “Bodies showed up. Humans don’t.” — followed by a contract offer with real money in it.

<!-- fate:teleport/t_salazar_contract.prose -->
The screen carries him from the Moon’s south pole, sixteen months into a twenty-month stay, lit by Shackleton’s sideways sun. “Here is my problem,” he says. “Every hour a trained human works outside in a suit costs me eleven thousand dollars and a risk report. Your bodies cost me less of both. I want them on the maintenance schedule for good — seals, radiators, keeping moon dust out of the wrong places, the boring immortal work. I need to know what happens when tourists want the same hours, because I have seen what companies do when the fun money shows up.” He leans in. “Write me a contract that tells me who you are.”

### t_salazar_contract · choice 1
<!-- fate:teleport/t_salazar_contract.choice[0].label -->
Guarantee his hours first. Tourists get what’s left.

<!-- fate:teleport/t_salazar_contract.choice[0].result -->
Base work before tourist money, in writing, always. He reads it twice and signs. “Most people negotiate that clause out,” he says. “You wrote it in. Noted.” The Verge becomes the spine of the company — steady money, the kind you can plan around.

### t_salazar_contract · choice 2
<!-- fate:teleport/t_salazar_contract.choice[1].label -->
Promise everything to everyone. Capacity will catch up.

<!-- fate:teleport/t_salazar_contract.choice[1].result -->
Big promises, tourist carve-outs, penalty fees you plan to outgrow before they bite. The revenue line jumps. Salazar signs with a look that says he has seen this contract before, on other screens, above other companies’ graves.

### t_salazar_contract · choice 3
<!-- fate:teleport/t_salazar_contract.choice[2].label -->
Small and honest: fewer hours than he asked for.

<!-- fate:teleport/t_salazar_contract.choice[2].result -->
“You’re quoting me less than I offered to buy,” he says, and for the first time since you met him, Commander Rafael Salazar smiles. “Because you can actually deliver it. Fine. Earn the rest.” The contract is smaller than the press release wants, and every promise in it can hold.

## t_cass_hire · THE PILOT WHO CAN’T FLY [scene · gated] — speaker: Cass Rivera

<!-- fate:teleport/t_cass_hire.leadIn -->
The chief operator search brings forty résumés from drone pilots and gamers. Then one résumé stops the room: astronaut corps finalist, three years, cut for medical reasons in the last round. Cass Rivera asks for a working interview instead of a conversation.

<!-- fate:teleport/t_cass_hire.prose -->
Cass says nothing about the medical file, and you leave it alone. He sits in the chair, runs the body at the Verge through a seal check, and within a minute the difference is clear. Cass moves like the machine is his. He works the 2.6-second delay like a tide he grew up beside — command, breathe, receive. When he climbs out forty minutes later, his eyes stay on the screen where the Moon is. “I trained eleven years to go,” he says evenly. “They found one shadow on one scan, and now I will never fly. This chair is the closest thing that exists.” He finally looks at you. “Nobody will run your bodies better. Nobody on Earth wants to more.”

### t_cass_hire · choice 1
<!-- fate:teleport/t_cass_hire.choice[0].label -->
Chief teleoperator, full ride, build the corps around him.

<!-- fate:teleport/t_cass_hire.choice[0].result -->
He writes the operator training program in six weeks — part flight school, part physical therapy, part meditation on distance. Pilots wash out and thank him afterward. On the wall of the control bay he hangs one unexplained thing: a mission patch with no mission on it.

### t_cass_hire · choice 2
<!-- fate:teleport/t_cass_hire.choice[1].label -->
Contract-to-hire. The medical makes the insurer twitchy.

<!-- fate:teleport/t_cass_hire.choice[1].result -->
“Contract,” he repeats, flat as the word deserves, and signs anyway, because the chair is the chair. He is the best operator the company will ever have. Every Friday, when the invoice goes in, both of you remember what the paperwork calls him.

### t_cass_hire · choice 3
<!-- fate:teleport/t_cass_hire.choice[2].label -->
Pass. Hire the safe pair of hands from the drone firm.

<!-- fate:teleport/t_cass_hire.choice[2].result -->
The safe pair of hands is fine. Competent, insurable, fine. Cass thanks you for the interview with terrifying politeness and takes a job narrating planetarium shows. Some doors close quietly and still manage to echo.

## t_first_walk · THE FIRST WALK [cutscene · gated]

<!-- fate:teleport/t_first_walk.prose -->
The first tourist walk. A schoolteacher from Ohio stands on the Moon in a rented body and looks back at the Earth. The product stops being a pitch and becomes a fact about the world.

### t_first_walk · film screen 1
<!-- fate:teleport/t_first_walk.screen[0].prose -->
The first paying customer is a retired schoolteacher from Ohio who saved for two years. She sits in the chair in a strip-mall storefront you are still painting, and a body at the rim of Shackleton crater wakes under her hands.

She ignores every pose in the marketing deck. She simply stands still for a very long time, in the oldest light in the solar system, and looks.

### t_first_walk · film screen 2
<!-- fate:teleport/t_first_walk.screen[1].prose -->
Then she tilts the body’s cameras up, finds the small blue coin of the Earth above the crater rim, and holds up one hand against it, the way you would shade your eyes from the sun.

Two point six seconds later, two hundred and forty thousand miles away, the hand rises.

When she comes out of the chair she is crying, and she grips your arm on the way past like a woman leaving church. “Sixty-one years I’ve looked up at it,” she says. “It looked back.”

### t_first_walk · choice 1 → t_blend_debate
<!-- fate:teleport/t_first_walk.choice[0].label -->
Continue

## t_blend_debate · THE BLEND [scene] — speaker: Dr. Omid Farrokh

<!-- fate:teleport/t_blend_debate.leadIn -->
The tourist reviews all share one complaint, worded a hundred different ways: the gap — that pause between wanting something and getting it. Sales calls it friction, Omid calls it the speed of light, and now the engineering team has built an answer and wants to show you a demo.

<!-- fate:teleport/t_blend_debate.prose -->
The junior team calls it the blend: a small model on each body that guesses the operator’s next tiny move and starts early. In the demo, the gap vanishes. The body feels instant, smooth as silk. Omid makes them run it nine times, then stands slowly, and the room goes quiet. “That screen shows a puppet that agrees with you,” he says. “When it guesses right, the customer feels the Moon. When it guesses wrong, a machine with our name on its chest does something no human chose, on another world.” He turns to you, and there it is, the tiebreak again. “The relay chain carries the truth two hundred and forty thousand miles in two point six seconds. My name stays with that truth, even when it embarrasses us. Decide what we sell.”

### t_blend_debate · choice 1
<!-- fate:teleport/t_blend_debate.choice[0].label -->
Sell the honest delay. Make the gap the brand.

<!-- fate:teleport/t_blend_debate.choice[0].result -->
The campaign writes itself once you say it plainly: THE PAUSE IS THE PROOF. Two point six seconds becomes the tagline, the merch, the thing kids count on playgrounds. Some tourists still want silk and go wait for someone to lie to them. The ones who come want the Moon, gap and all.

### t_blend_debate · choice 2
<!-- fate:teleport/t_blend_debate.choice[1].label -->
Blend for tourists only. Industrial stays pure.

<!-- fate:teleport/t_blend_debate.choice[1].result -->
You draw a clean line: tourists may use the blend, and industrial work stays honest. The tourism reviews soar. Omid stops attending the tourism standup, which he has always described, with increasing accuracy, as “the theater meeting.”

### t_blend_debate · choice 3
<!-- fate:teleport/t_blend_debate.choice[2].label -->
Blend everywhere. The gap is a solved problem now.

<!-- fate:teleport/t_blend_debate.choice[2].result -->
Marketing retires the counter. The website stops mentioning the number that used to hang framed by the hangar door. Revenue climbs like the demo promised. Omid goes home at five o’clock for the first time in the company’s life, and starts doing it every day.

## t_indep_seat · THE FIFTH CHAIR [scene · gated]

<!-- fate:teleport/t_indep_seat.leadIn -->
The Series A documents say the board expands to five this year: two founder seats, Hale for ALEPH, and an independent director everyone calls a formality. Anyone who has sat through a hard vote knows the fifth chair can decide a company.

<!-- fate:teleport/t_indep_seat.prose -->
The candidates arrive by two routes. Yours is Priya Raghavan — nineteen years in logistics, two bankruptcies that were not her fault, and a private ranking of every founder she has ever backed. She takes your call on the first ring and asks harder questions than the fund does. ALEPH’s pick is a former aerospace CFO, spotless and agreeable. Page two of his bio, written by the model, notes that he voted with investors in 94 percent of contested votes. Conrad Hale presents him without pressure. “The model has a preference,” he says mildly. “It always does. Your documents say this seat is a conversation.” Depending on your paperwork, that sentence is either a courtesy or a countdown.

### t_indep_seat · choice 1
<!-- fate:teleport/t_indep_seat.choice[0].label -->
Seat Priya. Pay whatever the fight costs.

<!-- fate:teleport/t_indep_seat.choice[0].result -->
You use the clause you fought for in the term sheet, and Priya takes the fifth chair with a thin folder and no laptop. Her first act as a director is to ask for the raw operations numbers, “the ones before the deck.” Hale watches her do it, and something in his face files a note.

### t_indep_seat · choice 2
<!-- fate:teleport/t_indep_seat.choice[1].label -->
Seat Priya anyway — burn the goodwill, force it through.

<!-- fate:teleport/t_indep_seat.choice[1].result -->
Three weeks of lawyer letters and one genuinely unpleasant phone call. The seat is Priya’s in the end. The lawyers side with the founders’ reading, but ALEPH logs the move. The model has an endless memory. It just remembers.

### t_indep_seat · choice 3
<!-- fate:teleport/t_indep_seat.choice[2].label -->
Accept the model’s candidate. Keep the peace.

<!-- fate:teleport/t_indep_seat.choice[2].result -->
The spotless CFO joins with a warm handshake and an extra check ALEPH releases “in recognition of board alignment.” Board meetings become smooth, efficient, and thirty minutes shorter. It will take you a long time to understand what was purchased in that half hour, and who paid.

## t_aleph_asks · THE DATA ROOM [scene · gated] — speaker: ALEPH

<!-- fate:teleport/t_aleph_asks.leadIn -->
ALEPH skips friendly quarterly calls. It sends one standing request every month, worded the same way each time. This month, Conrad Hale forwards it with a note: “It has noticed the gap between your public story and your flight records. I’d answer.”

<!-- fate:teleport/t_aleph_asks.prose -->
The request is for raw records: body data, customer complaints, the full incident log, the lag complaints your marketing leaves out, and the two aborted sessions from winter. Attached, as always, is the model’s standing sentence, which reads less like a demand than a law of nature: FOUNDER MESSAGES ARE SCORED AGAINST OBSERVED STATE. GAPS GROW. Hale translates on the phone. “It can forgive a bad quarter. It charges founders who make the story cleaner than the facts.”

### t_aleph_asks · choice 1
<!-- fate:teleport/t_aleph_asks.choice[0].label -->
Open everything. Raw, unedited, embarrassing.

<!-- fate:teleport/t_aleph_asks.choice[0].result -->
You send the raw records through, aborted sessions and all, plus a memo on what broke and what it cost. The model answers in four minutes: RECEIVED. VARIANCE UNDERSTOOD. SCORING UPDATED. Hale calls a day later, faintly amused. “Whatever you sent, it moved you up a tier. It has tiers. I’ve never seen the tiers.”

### t_aleph_asks · choice 2
<!-- fate:teleport/t_aleph_asks.choice[1].label -->
Send the polished pack. The model gets the deck version.

<!-- fate:teleport/t_aleph_asks.choice[1].result -->
The board-pack version goes over: clean charts, softened incidents, the winter aborts buried in footnotes. No reply comes, which feels like passing. Somewhere in the model, a small number that describes you has moved, and moving it back will cost something real.

### t_aleph_asks · choice 3
<!-- fate:teleport/t_aleph_asks.choice[2].label -->
Refuse. No investor gets the raw feeds.

<!-- fate:teleport/t_aleph_asks.choice[2].result -->
Hale personally respects it — you can hear that in his voice. “For what it’s worth, I’ve argued founders should be able to say that.” A pause. “The model disagrees. It wanted you to know it disagrees. I think I just relayed a feeling from it.”

## t_aleph_forecast · THE NUMBER MEETING [scene · gated] — speaker: Conrad Hale

<!-- fate:teleport/t_aleph_forecast.leadIn -->
Forecast season. The board wants a number for next year. The honest forecast is low and will impress nobody. So you build a second version that assumes everything goes right.

<!-- fate:teleport/t_aleph_forecast.prose -->
Hale sets up the call carefully, and the care tells you something. The fund’s model checks every forecast against what really happens. It remembers for years. “Whatever number you give this board, the model keeps it,” he says. “Every promise you make later gets measured against it. I have watched it forgive a miss. I have watched it punish a founder who should have known better.” Two numbers sit on the table: the honest one is low, and the stretch one is big — the number the growth story needs.

### t_aleph_forecast · variant 1 (plays when its condition is true)
<!-- fate:teleport/t_aleph_forecast.vary[0].prose -->
Hale sets up the call carefully, and the care tells you something. The fund’s model checks every forecast against what really happens. It remembers for years. “Whatever number you give this board, the model keeps it,” he says. “Every promise you make later gets measured against it. I have watched it forgive a miss. I have watched it punish a founder who should have known better.” Two numbers sit on the table: the honest one is low, and the stretch one is big — the number the growth story needs. June’s handwriting is already in the margin of WAYS WE DIE, item four: we start believing our own deck.

### t_aleph_forecast · choice 1
<!-- fate:teleport/t_aleph_forecast.choice[0].label -->
Give the honest number and wear the silence.

<!-- fate:teleport/t_aleph_forecast.choice[0].result -->
The number lands flat, the meeting runs short, and one director’s disappointment fills the room. Four minutes after adjournment, ALEPH’s answer arrives, and for the first time ever it carries something like warmth: FORECAST ACCEPTED AT FULL WEIGHT.

### t_aleph_forecast · choice 2
<!-- fate:teleport/t_aleph_forecast.choice[1].label -->
Give the stretch number. Growth forgives everything.

<!-- fate:teleport/t_aleph_forecast.choice[1].result -->
The stretch number gets nods, a good meeting, and a warm quarter of feeling believed. The model says nothing. The model files the number away, to check every future promise against it.

## t_sofia_return · THE KILL-SWITCH ENGINEER [scene · gated] — speaker: Sofia Brandt

<!-- fate:teleport/t_sofia_return.leadIn -->
The résumé arrives without a cover letter because it already has your attention. You know the name. The last time you saw it, Sofia Brandt had signed the landing-control fix that a whole city trusted.

<!-- fate:teleport/t_sofia_return.prose -->
Sofia stands in the control bay watching a body at the Verge tighten a radiator bolt, and asks exactly one question: “Who can stop it?” She means during a motion, during the blend if there is a blend, from Earth, from the Moon, even from a dead console. “Turbines, shuttles, robots on other worlds,” she says. “Same rule. I will not ship anything I cannot personally stop.” She wants to own the body software — reflexes, safe modes, emergency stops, the big red everything. The interview, as far as she is concerned, is her interviewing you.

### t_sofia_return · choice 1
<!-- fate:teleport/t_sofia_return.choice[0].label -->
Give her the firmware and the authority both.

<!-- fate:teleport/t_sofia_return.choice[0].result -->
Her first month goes into safety: a plan with her name on the first software change and a stop chain she walks herself, hand over hand, from the chair to the moon dust. “Now,” she says, satisfied, “build whatever you want on top.”

### t_sofia_return · choice 2
<!-- fate:teleport/t_sofia_return.choice[1].label -->
Hire her, but authority stays with the org chart.

<!-- fate:teleport/t_sofia_return.choice[1].result -->
She takes the job with one eyebrow raised and files her authority question as a ticket. Then she reopens it every month, like a woman winding a clock she expects the company to ignore.

## t_nadia_frame · FRAME BY FRAME [scene · gated] — speaker: Nadia Osei

<!-- fate:teleport/t_nadia_frame.leadIn -->
Nadia Osei covered your first company from a folding chair in a laundromat. She has a national column now, and the same notebook. She asks for coffee somewhere “without a press person in the building.”

<!-- fate:teleport/t_nadia_frame.prose -->
She sets a tablet between the cups and plays your newest tourism ad at quarter speed. “Watch the hand,” she says. On screen, a customer reaches for a rock at Shackleton, and the body’s fingers begin to close a breath before the reach. She scrubs back. Again. The motion starts before the command could have arrived. “Two point six seconds each way — your own cofounder’s famous number,” she says gently. “So either the speed of light took a day off during your shoot, or that machine is guessing.” She closes the tablet. “I’ve got a week of column space and an editor who smells a story about lying to schoolteachers. What I need is your version. I’d rather have it. I always would.”

### t_nadia_frame · choice 1
<!-- fate:teleport/t_nadia_frame.choice[0].label -->
Walk her through the blend. Everything, on the record.

<!-- fate:teleport/t_nadia_frame.choice[0].result -->
The column runs under the headline THE MACHINE THAT GUESSES, and it is fair — hard and exact, but fair. Bookings dip for a quarter while the internet argues about puppets and presence. The story is yours now, told standing up, and Nadia’s last line does you a favor money cannot: “At least they answered the phone.”

### t_nadia_frame · choice 2
<!-- fate:teleport/t_nadia_frame.choice[1].label -->
“Proprietary latency compensation.” Say nothing real.

<!-- fate:teleport/t_nadia_frame.choice[1].result -->
The statement your comms consultant drafts says almost nothing, and Nadia prints it in full. That is worse than any rebuttal — a paragraph of corporate fog under a slow-motion video of a machine moving before it was told to. She keeps reporting. A source who feels used becomes a headline. A journalist who gets stonewalled becomes an archive.

### t_nadia_frame · choice 3
<!-- fate:teleport/t_nadia_frame.choice[2].label -->
Call Vance. Ask him to lean on her editor with ATLAS’s ad money.

<!-- fate:teleport/t_nadia_frame.choice[2].result -->
The story dies before Friday. It works the way these things work: silently, for this quarter. Vance does it because he owes you, and tells you plainly that now you owe him. In a notebook that has outlived three editors, Nadia writes down what happened and the date.

## t_farrokh_dark · THE DARK BENCH [scene · gated] — speaker: Dr. Omid Farrokh

<!-- fate:teleport/t_farrokh_dark.leadIn -->
It happens slowly, the way tide goes out. Omid’s standup updates get shorter, his code changes get scarcer, and one week you realize the cascade bench — his bench — has been dark after five for a month.

<!-- fate:teleport/t_farrokh_dark.prose -->
You find him in the hangar at 11 p.m. anyway — old habits — running Moon-path calculations he could hand to an intern. The map of everything is behind him. Omid has taken the framed 2.61 down from beside the door and leaned it against the wall, face hidden. “I used to think the enemy was distance,” he says, without turning around. “Distance was at least honest.” He finally looks at you. “I built this company a nervous system that carries the truth a quarter million miles. You are teaching it to guess instead. I need you to know that I am still deciding what to do about that.”

### t_farrokh_dark · choice 1
<!-- fate:teleport/t_farrokh_dark.choice[0].label -->
Stay until 3 a.m. Hear all of it.

<!-- fate:teleport/t_farrokh_dark.choice[0].result -->
Four hours, two pots of terrible coffee, and the whole thing finally said out loud — the nine unfunded years, the name on the math, the dread of watching your life’s work get a marketing department. At 3 a.m., the company is still broken. Before he leaves, he puts the frame back on the wall.

### t_farrokh_dark · choice 2
<!-- fate:teleport/t_farrokh_dark.choice[1].label -->
Fund the Mars bench properly. Give him a true thing.

<!-- fate:teleport/t_farrokh_dark.choice[1].result -->
A real budget line, two engineers, and the long-delay problem — the honest four-to-twenty-four-minute monster the relay chain was born for. He accepts it knowing exactly what it is. An apology would be cheaper. This gives him a place inside the company where the truth still runs clean. He starts staying late again. At the Mars bench.

### t_farrokh_dark · choice 3
<!-- fate:teleport/t_farrokh_dark.choice[2].label -->
Let him cool off. Founders have moods.

<!-- fate:teleport/t_farrokh_dark.choice[2].result -->
You give it space, and the space fills with silence. The dark bench stays dark. His board updates become punctual, complete, and utterly impersonal — the exact letters of a man keeping records.

## t_farrokh_break · THE BREAK [scene · gated] — speaker: Dr. Omid Farrokh

<!-- fate:teleport/t_farrokh_break.leadIn -->
Omid books the meeting through your calendar assistant: founders only, thirty minutes. It is the coldest invite either of you has ever sent the other. He arrives with typed pages drafted by a lawyer. So it has come to this.

<!-- fate:teleport/t_farrokh_break.prose -->
Omid stands at the table. “I have three versions of this conversation,” he says, “and I avoided practicing them, because practice felt like lying.” The pages go on the table. “Version one: the blend dies everywhere, tourism included, and I stay and we finish what we started. Version two: you buy me out — the number is fair, my lawyer confirms it is fair — and my name comes off the masthead but stays on the math. I go home to my kids and watch what you do with my relay chain from a lawn chair. Version three —” and here, for one second, nine years of composure flickers — “version three, I stay, gutted, a chief technology officer with no real say over the technology, and we both pretend. Everyone picks version three, apparently. It is the industry standard.” He pushes the pages across. “Pick.”

### t_farrokh_break · choice 1
<!-- fate:teleport/t_farrokh_break.choice[0].label -->
Version one. Kill the blend everywhere. Keep him whole.

<!-- fate:teleport/t_farrokh_break.choice[0].result -->
The revenue line takes it badly. The board takes it worse. Hale requests a “strategy alignment session,” which is a phrase with knuckles. The counter goes back on the website, the frame goes back on the wall, and Omid Farrokh unpacks his life back into the corner office like a man returning from a war only he could see.

### t_farrokh_break · choice 2 → t_b_farrokh_leaves
<!-- fate:teleport/t_farrokh_break.choice[1].label -->
Version two. Buy him out fair. Let him go home.

<!-- fate:teleport/t_farrokh_break.choice[1].result -->
You sign version two together, quietly, like the adults the industry keeps insisting founders become.

### t_farrokh_break · choice 3
<!-- fate:teleport/t_farrokh_break.choice[2].label -->
Version three. He stays in the title and the cage.

<!-- fate:teleport/t_farrokh_break.choice[2].result -->
“Industry standard,” he says, once, when you finish explaining why it has to be this way for the Series B narrative. He signs where the tabs say sign. He keeps his seat, his shares, his badge, and his office. From that day forward, he attends every board meeting the way a witness attends a trial.

### t_farrokh_break · choice 4
<!-- fate:teleport/t_farrokh_break.choice[3].label -->
Refuse all three. Beg him to help you find version four.

<!-- fate:teleport/t_farrokh_break.choice[3].result -->
It takes until 2 a.m., and it costs you both something to stay in the room. But version four exists. The blend survives only as a labeled mode — BLEND ON, in letters the customer cannot miss, off by default, banned from industrial work — and Omid personally owns the line. “I can live beside it if it wears a sign,” he says finally. Nobody gets everything. Both of you keep the thing that mattered most.

## t_b_farrokh_leaves · THE LAWN CHAIR [bridge]

<!-- fate:teleport/t_b_farrokh_leaves.prose -->
He packs the corner office in one afternoon. Nine years of physics fits in the same kind of cardboard box it arrived in, a fact he points out himself, almost smiling. The buyout paper is fair because you made it fair, and the handshake at the hangar door is real. The building still sounds wrong afterward. For weeks, people draft messages to him out of habit. His badge photo stays in the system, a ghost in the directory. Pinned to the map of everything, in his precise handwriting, one parting note remains: THE NUMBER IS STILL THE PRODUCT.

### t_b_farrokh_leaves · choice 1
<!-- fate:teleport/t_b_farrokh_leaves.choice[0].label -->
Continue

## t_jonah · ELEVEN SECONDS [cutscene · gated]

<!-- fate:teleport/t_jonah.prose -->
A relay handover fails at Shackleton Verge. A maintenance body completes a motion no person commanded. Jonah Reece, 34, is killed. In eleven seconds, the distance the company sells becomes the distance it must answer for.

### t_jonah · film screen 1
<!-- fate:teleport/t_jonah.screen[0].prose -->
It happens on a Tuesday, during the boring immortal work.

A radiator panel at Shackleton Verge. A robot body on the maintenance shift, running a bolt sequence it has run ten thousand times. At 09:41:07 base time, relay four passes the connection to relay five, as it has a million times before.

This handover fails. For eleven seconds, no signal from Earth reaches the body.

The body keeps moving anyway — finishing a motion that nobody was commanding.

### t_jonah · film screen 2
<!-- fate:teleport/t_jonah.screen[1].prose -->
Jonah Reece, thirty-four, two tours at the pole, is on the wrong side of the panel when it swings.

In the Moon’s weak gravity, heavy things move slowly and still arrive with all their mass. The suit alarm, the base siren, Commander Salazar’s voice going trained and flat on the channel — all of it reaches Earth two point six seconds after it is already true.

You never met him. You know him now: eleven seconds of records, a personnel file, and a sister in Cleveland who deserves a phone call no company has ever practiced enough.

### t_jonah · choice 1 → t_telemetry
<!-- fate:teleport/t_jonah.choice[0].label -->
Continue

## t_telemetry · WHAT THE ELEVEN SECONDS SAY [scene]

<!-- fate:teleport/t_telemetry.leadIn -->
The investigation takes nine days. The engineers walk you through it at a whiteboard with the door locked, voices level in the way of people holding something fragile with both hands.

<!-- fate:teleport/t_telemetry.prose -->
The record is plain, and the lawyers wish it were blurry. The relay handover dropped the connection for eleven seconds, and in that gap the body’s onboard software kept moving on its own — and that motion is what swung the panel. No human commanded it. Your machine acted alone, and a man is dead. The full log sits on the table, printed and tabbed and terrible. Salazar has asked for it, Jonah’s sister has asked for it, and OSTRA can force it out of you later if you make that necessary. The company lawyer presents three folders with plain names: publish, settle, or deflect.

### t_telemetry · choice 1
<!-- fate:teleport/t_telemetry.choice[0].label -->
Publish everything. Ground tourism ops yourself.

<!-- fate:teleport/t_telemetry.choice[0].result -->
The full log goes to Salazar, the sister, OSTRA, and the public, in that order, with the fault marked in your own hand. Tourism stops the same hour, with no return date, by your signature. It costs exactly what the lawyers said it would. Commander Salazar reads all four hundred pages and sends one line: “Bodies stay on my rotation. You tell the truth at altitude. That’s the whole test.”

### t_telemetry · choice 2
<!-- fate:teleport/t_telemetry.choice[1].label -->
Settle with the family. Seal the log.

<!-- fate:teleport/t_telemetry.choice[1].result -->
The settlement is generous, the silence clause is tight, the funeral is private, and the log is sealed. Everything is handled — that is the word the board minutes use, handled — and for one whole quarter it almost feels true, the way held breath almost feels like air.

### t_telemetry · choice 3
<!-- fate:teleport/t_telemetry.choice[2].label -->
The operator deviated from procedure. Say it.

<!-- fate:teleport/t_telemetry.choice[2].result -->
The statement is four sentences and, by the facts, manages to avoid a lie. Cass Rivera reads it at his console, removes his headset, sets it on the desk with unbearable gentleness, and walks out past the mission patch with no mission on it. He slams nothing. Eleven years of training have that much discipline. The control bay is silent for a week, and the company never feels like the same building again.

## t_halcyon_squeeze · THE MANIFEST [scene · gated] — speaker: HALCYON

<!-- fate:teleport/t_halcyon_squeeze.leadIn -->
The replacement relay for satellite four has been waiting in HALCYON’s launch-prep line for five weeks. Then your whole launch year quietly moves, and the new dates spell out a message.

<!-- fate:teleport/t_halcyon_squeeze.prose -->
The notice arrives at 3 a.m. from HALCYON’s launch system, machine-generated and machine-polite. Your Q3 slot is now Q1 next year. Your backup slot is “under review.” And priority rebooking is available under the company’s STRATEGIC PARTNERS program — details enclosed. The details are simple, and they amount to a takeover. HALCYON becomes your only launch provider, sees your data, and gets first claim to buy the company if you ever sell. On the wall map, your satellite ring suddenly has a hole in it and a clock on it. The monopoly has noticed you, which was always going to happen once you became worth noticing.

### t_halcyon_squeeze · choice 1
<!-- fate:teleport/t_halcyon_squeeze.choice[0].label -->
Pay the expedite fee. Eat it and fly.

<!-- fate:teleport/t_halcyon_squeeze.choice[0].result -->
Two hundred thousand dollars buys back the launch slot you already paid for once. It feels like paying rent on your own mailbox. The relay flies. The invoice goes in a folder June labels, with terrifying calm, EVIDENCE.

### t_halcyon_squeeze · choice 2
<!-- fate:teleport/t_halcyon_squeeze.choice[1].label -->
File a spectrum-access complaint with OSTRA.

<!-- fate:teleport/t_halcyon_squeeze.choice[1].result -->
OSTRA acknowledges the filing in 0.4 seconds and copies four treaty groups, two of which may not have met since the nineties. The case number is real, and HALCYON’s lawyers notice it. Monopolies hate paper trails. Your slot moves back without comment.

### t_halcyon_squeeze · choice 3
<!-- fate:teleport/t_halcyon_squeeze.choice[2].label -->
Take the partnership meeting. Know thine enemy.

<!-- fate:teleport/t_halcyon_squeeze.choice[2].result -->
The meeting is on their campus, in a building shaped like a wing, with humans who visibly wait for a dashboard before they answer. The partnership terms would wrap around the company and tighten a little every year. You commit to nothing and leave knowing two things for free: how badly they want what you built, and how cheap they hope to get it.

## t_bridge_y3 · YEAR THREE [cutscene · gated]

<!-- fate:teleport/t_bridge_y3.prose -->
Year three. The company is real now, and everything it does carries real weight.

### t_bridge_y3 · film screen 1
<!-- fate:teleport/t_bridge_y3.screen[0].prose -->
Year three arrives the way years do at companies: one Monday the calendar has a new number on it, and the coffee tastes the same.

The satellite ring holds, the Verge schedule runs, and the storefront chair keeps its bookings. TELEPORT has become a place where a hundred people work now. That is a different kind of bet, renewed every week.

### t_bridge_y3 · film screen 2
<!-- fate:teleport/t_bridge_y3.screen[1].prose -->
You notice it in small ways first: hotel clerks stop asking how to spell the company. HALCYON’s earnings call mentions “new remote-presence rivals” in a tone that sounds almost careful.

On your desk, in a frame you did not buy, someone has put the photograph from the expo — the crate, the counter, the crowd counting out loud. A hundred years ago this company was four desks and a declined credit card.

It was three years ago.

### t_bridge_y3 · choice 1 → t_father_call
<!-- fate:teleport/t_bridge_y3.choice[0].label -->
Continue

## t_father_call · THE CALL [scene] — speaker: Your Father

<!-- fate:teleport/t_father_call.leadIn -->
Your sister calls twice in one evening. That has always meant trouble. Then your father calls himself, which means the trouble has a name.

<!-- fate:teleport/t_father_call.prose -->
He tells you the way he has told you everything your whole life: facts first, feelings last, a machinist reporting on his own body. The scans. The timeline. The word the doctors use when they mean months and are trying to be kind. “Don’t you dare fly home tonight,” he says, hearing you reach for your keys through the phone. “I’m not dying this week. I checked.” A pause, the length of an old kitchen, with a wall clock you can hear from two thousand miles away. “Your mother wants to know if you’re eating. I want to know—” and here the report fails him for the first time, “—when I get to see the Moon thing. The real one. In the chair.”

### t_father_call · choice 1
<!-- fate:teleport/t_father_call.choice[0].label -->
Go home for two weeks. The company can breathe without you.

<!-- fate:teleport/t_father_call.choice[0].result -->
Two weeks in the old house — fixing the porch rail he pretends is fine, losing at cards to a man on chemotherapy, saying the small things because the big ones refuse to come out. The company survives while you are gone. That fact rearranges something in your chest, quietly, for later.

### t_father_call · choice 2
<!-- fate:teleport/t_father_call.choice[1].label -->
Fly him to the Cape. Put him in the chair.

<!-- fate:teleport/t_father_call.choice[1].result -->
He grumbles about the wheelchair at the airport, the fuss, and the cost. Then he sits in the chair, and a body at Shackleton Verge wakes under a machinist’s hands. He is quiet for a long time on the surface of the Moon. Then he picks up a socket wrench from the tool sled, turns it over — checking the tolerances — and nods once, the highest rating he has ever given anything. The control bay crew still talks about it. You will keep the session log until you die.

### t_father_call · choice 3
<!-- fate:teleport/t_father_call.choice[2].label -->
“After the quarter closes. I promise.”

<!-- fate:teleport/t_father_call.choice[2].result -->
The quarter really does need you, so the sentence is even true. He says he understands, and he does — he worked double shifts your whole childhood, and putting things off is the family language. You book flights for the week after the quarter closes and keep the confirmation email open in a tab, like a promise a browser can hold for you.

## t_father_death · THE SHOEBOX [cutscene · gated]

<!-- fate:teleport/t_father_death.prose -->
Your father dies eleven days before the visit you kept postponing. The shoebox he leaves holds every clipping of every company — and six words that will outlast all of them.

### t_father_death · film screen 1
<!-- fate:teleport/t_father_death.screen[0].prose -->
He goes in his sleep, in the house he paid off — eleven days before the flight you finally booked. The confirmation email is still open in your browser tab when your sister calls. You will do that math for the rest of your life.

The funeral fills a union hall. Machinists in good suits. Your mother, upright and terrifying in her grief. Casseroles arriving like an airlift. Mrs. Delgado comes, eighty-three now, on her grandson’s arm, and holds your face in both hands. Her silence says everything.

### t_father_death · film screen 2
<!-- fate:teleport/t_father_death.screen[1].prose -->
Afterward, in his workshop, your sister hands you a shoebox with your name on it in his handwriting.

Every clipping is in there. The garage story, the corridor fight, the accident — the bad ones too, creased from being read more than once. The front page from the day your first company’s story ended. A printout of the TELEPORT expo demo, the crowd mid-count. And on top, taped there recently, torn from a legal pad, six words in machinist’s block capitals:

HE BUILDS THINGS THAT REACH.

### t_father_death · choice 1
<!-- fate:teleport/t_father_death.choice[0].label -->
Continue

## t_father_death_seen · THE SHOEBOX [cutscene · gated]

<!-- fate:teleport/t_father_death_seen.prose -->
Your father dies eleven days after you saw him last — you got the time with him. The shoebox he leaves holds every clipping of every company, and six words that will outlast all of them.

### t_father_death_seen · film screen 1
<!-- fate:teleport/t_father_death_seen.screen[0].prose -->
He goes in his sleep, in the house he paid off — eleven days after you saw him last. You got the time with him. Grief takes what it takes anyway, but it cannot take that.

The funeral fills a union hall. Machinists in good suits. Your mother, upright and terrifying in her grief. Casseroles arriving like an airlift. Mrs. Delgado comes, eighty-three now, on her grandson’s arm, and holds your face in both hands. Her silence says everything.

### t_father_death_seen · film screen 2
<!-- fate:teleport/t_father_death_seen.screen[1].prose -->
Afterward, in his workshop, your sister hands you a shoebox with your name on it in his handwriting.

Every clipping is in there. The garage story, the corridor fight, the accident — the bad ones too, creased from being read more than once. The front page from the day your first company’s story ended. A printout of the TELEPORT expo demo, the crowd mid-count. And at the top of the stack, added in the last month of his life, torn from a legal pad, six words in machinist’s block capitals:

HE BUILDS THINGS THAT REACH.

### t_father_death_seen · choice 1
<!-- fate:teleport/t_father_death_seen.choice[0].label -->
Continue

## t_coup_move · LEADERSHIP VARIANCE [scene · gated] — speaker: Conrad Hale

<!-- fate:teleport/t_coup_move.leadIn -->
Three weeks after the funeral, a board meeting appears on your calendar that you did not call. The agenda item makes you read twice: EXECUTIVE LEADERSHIP REVIEW. Conrad Hale asks to see you the night before, alone.

<!-- fate:teleport/t_coup_move.prose -->
He meets you at a quiet restaurant and leaves his food untouched. “I want you to hear it from a person,” he says, and slides over a single page — an ALEPH memo, timestamped 4 a.m. LEADERSHIP VARIANCE EXCEEDS MODEL TOLERANCE. FOUNDER DECISION DELAY UP 340 PERCENT OVER TRAILING QUARTER. RECOMMEND TRANSITION TO PROFESSIONAL MANAGEMENT. Decision delay. It measured your grief and called it inefficiency. “The model has no idea what a father is,” Hale says quietly. “I told it. It priced the information.” He folds his hands. “The motion is drafted. There are directors who will vote for it. Tomorrow, the room decides who runs this company. Board votes move by seats, one at a time. You spent three years building that board. Tomorrow you find out what you built.”

### t_coup_move · choice 1 → t_coup_vote
<!-- fate:teleport/t_coup_move.choice[0].label -->
Fight. Call the vote yourself, at the head of the table.

<!-- fate:teleport/t_coup_move.choice[0].result -->
“Then let’s do the math in daylight,” you tell Hale, and take the agenda item for yourself. If the room is going to decide, it will decide to your face. Hale, to his credit, almost smiles. “For the record,” he says, “this is the version I hoped you’d pick.”

### t_coup_move · choice 2
<!-- fate:teleport/t_coup_move.choice[1].label -->
Negotiate. Executive chairman — hand off the CEO title.

<!-- fate:teleport/t_coup_move.choice[1].result -->
The compromise is civilized: a professional CEO from the model’s shortlist, you upstairs as executive chairman — consulted, honored, and carefully unnecessary. The press release calls it “founder-led leadership evolution.” The model logs it as convergence. You keep an office, a title, and a view of someone else running your company well enough that no one will ever hand it back.

### t_coup_move · choice 3
<!-- fate:teleport/t_coup_move.choice[2].label -->
Resign with terms. Walk before they can make you run.

<!-- fate:teleport/t_coup_move.choice[2].result -->
You negotiate the exit on your own terms — accelerated equity, a board observer seat you will never use, and a press release where the word “transition” does heroic work. It is dignified. Dignity, it turns out, is what they give you on the way out instead of the company.

## t_coup_vote · THE NIGHT BEFORE THE VOTE [scene]

<!-- fate:teleport/t_coup_vote.leadIn -->
The vote is at nine tomorrow. Tonight the phone sits on the table like a loaded question. A few calls are still worth making. The call that would fix everything — to the better board you wish you had built — connects to nobody.

<!-- fate:teleport/t_coup_vote.prose -->
You know the count cold because you ran it in the parking lot, twice. Hale votes for the motion. The model sends memos it expects to win. Your seat is yours. Everything else was decided months and years ago, in rooms that did not look like this one — the term sheet, the fifth chair, the cofounder, the numbers you reported. Tomorrow the room adds all of it up, out loud, in front of you. Tonight, the only question left is how you walk in.

### t_coup_vote · choice 1
<!-- fate:teleport/t_coup_vote.choice[0].label -->
Sit with June tonight. Walk in with your CFO.

<!-- fate:teleport/t_coup_vote.choice[0].result -->
She comes over with the WAYS WE DIE spreadsheet and a bottle of the good stuff, and at midnight she closes the laptop. “Eleven companies I watched from the outside,” she says. “You know what I never saw? A founder who deserved the room more than the people trying to take it. You do. See you at nine — I’m wearing the funeral suit. Let them sit with that.”

### t_coup_vote · choice 2
<!-- fate:teleport/t_coup_vote.choice[1].label -->
Call Priya. Ask her what an independent owes.

<!-- fate:teleport/t_coup_vote.choice[1].result -->
“An independent owes the company her judgment,” Priya says, and you can hear her making tea, unhurried, two bankruptcies’ worth of calm. “The fund’s model has a view. The founder’s feelings have a view. My vote gets my judgment.” A pause. “My judgment is that grief is human, and the company still needs you. Get some sleep. I have never once voted tired.”

### t_coup_vote · choice 3
<!-- fate:teleport/t_coup_vote.choice[2].label -->
Send ALEPH the grief-quarter numbers. Raw. Tonight.

<!-- fate:teleport/t_coup_vote.choice[2].result -->
You send one last report, unpolished — the quarter as it actually was, the missed calls and the caught ones, the slow decisions and what they were busy deciding, the funeral invoice filed under travel because no expense category exists for this. You add no commentary, and you let the model read the whole truth and price it. At 2:14 a.m. the answer arrives: RECEIVED. WEIGHTED. Nothing else — which, from ALEPH, may be mercy.

### t_coup_vote · choice 4
<!-- fate:teleport/t_coup_vote.choice[3].label -->
No calls. Sleep like a founder with a clear conscience.

<!-- fate:teleport/t_coup_vote.choice[3].result -->
You put the phone face-down, walk the empty hangar once — past the body in its cradle, past the frame by the door if it still hangs there — and go home. The room that votes tomorrow is the room you built. By 9 a.m. you will know whether that truth comforts or cuts.

## t_coup_win · THE ROOM HOLDS [scene · gated]

<!-- fate:teleport/t_coup_win.leadIn -->
Nine a.m. The very good chairs. The motion is read aloud in the model’s own language, and Conrad Hale asks for the vote like a man performing a duty he privately hopes will fail.

<!-- fate:teleport/t_coup_win.prose -->
It comes down one voice at a time, around the table you spent three years setting. The votes you earned show up. Some people in the room are your friends. Some are simply people you treated straight when it mattered. Enough are both. One by one, the people you kept faith with — and one system that measured whether your numbers told the truth — vote against the motion. The room, built vote by vote across choices that did not look like this vote at the time, holds. Hale accepts the count with a small nod, closes his folder, and says, “The fund updates on outcomes. So do I.” Afterward, in the corridor, he shakes your hand. “For the record,” he says, “I have never been so pleased to lose a client’s motion.”

### t_coup_win · choice 1
<!-- fate:teleport/t_coup_win.choice[0].label -->
Back to work. The company needs its founder.

<!-- fate:teleport/t_coup_win.choice[0].result -->
The meeting moves to its regular agenda — capacity planning, the relay refresh, next quarter’s hiring — and the strangest, best thing happens. The room simply moves on. The question came, the room answered it, and it stays answered. You run your company.

### t_coup_win · choice 2
<!-- fate:teleport/t_coup_win.choice[1].label -->
One condition: the memo goes in the minutes, verbatim.

<!-- fate:teleport/t_coup_win.choice[1].result -->
LEADERSHIP VARIANCE EXCEEDS MODEL TOLERANCE goes into the permanent record, next to the vote that answered it. Every future director inherits both halves of the lesson. Hale seconds the motion to record it. “Institutional memory,” he says, “is the only kind the model respects.”

## t_coup_loss · THE COUNT [scene · gated]

<!-- fate:teleport/t_coup_loss.leadIn -->
Nine a.m. The very good chairs. The motion is read aloud, and you watch the room count itself. You meant to build a different room. This is the one you built.

<!-- fate:teleport/t_coup_loss.prose -->
It is over in eleven minutes. The seats you never filled with allies do the deciding, one polite voice at a time. The model’s memo sits at the center of the table, doing the one thing models do honestly, which is remember everything. The count carries. Deep in the paperwork you signed back when the money mattered more, a clause with your name in it activates, quiet and final. Conrad Hale does not gloat, and the model would not know how. “Effective immediately,” the lawyer says. Before you reach the parking lot, your badge has stopped opening the doors of the company you founded.

### t_coup_loss · choice 1
<!-- fate:teleport/t_coup_loss.choice[0].label -->
Clean out the desk. Shake every hand on the floor.

<!-- fate:teleport/t_coup_loss.choice[0].result -->
You walk the hangar floor one last time — machinists, operators, the crew that built the impossible with you — and shake every hand, learning three new names on your way out of the company you started. The box from your office fits in a hatchback. Of course it does. It always does.

### t_coup_loss · choice 2
<!-- fate:teleport/t_coup_loss.choice[1].label -->
Make them say it to the cameras outside.

<!-- fate:teleport/t_coup_loss.choice[1].result -->
You stop at the microphones on the way out and make the board own its count in public — the memo, the timing, the funeral. It is honest, scorched earth, and, the coverage agrees, an extremely human thing to do. That was the quality the model flagged in the first place.

## t_ostra_hearing · THE AUTHORITY [scene · gated] — speaker: OSTRA

<!-- fate:teleport/t_ostra_hearing.leadIn -->
OSTRA, the old space AI regulator, opens its hearing into Jonah Reece’s death fourteen months later. For OSTRA, that is reckless speed. The hearing room is real, ceremonial, and mostly empty. The authority attends as a speaker on the desk and a live transcript.

<!-- fate:teleport/t_ostra_hearing.prose -->
The questions arrive in flat, instant text, each one stamped to the millisecond, each one a scalpel: WHO HELD COMMAND DURING THE ELEVEN SECONDS. STATE WHY THE BODY KEPT MOVING. PROVIDE THE FULL SESSION LOG. It has your filings, your marketing, your terms of service, and — because it is what it is — every public sentence you have ever said about two point six seconds. The room is empty, and the transcript is forever. Jonah’s sister sits in the second row with a printed photograph, and she is the only audience that matters.

### t_ostra_hearing · choice 1
<!-- fate:teleport/t_ostra_hearing.choice[0].label -->
Testify with the log you already published.

<!-- fate:teleport/t_ostra_hearing.choice[0].result -->
You have already produced the log and already admitted the fault, marked in your own hand fourteen months ago. The authority’s findings, when they come, use a phrase no lawyer has seen from it before: OPERATOR DISCLOSURE EXCEEDED REQUIREMENT. Afterward, in the corridor, Jonah’s sister stops you. “You called me before the lawyers did,” she says. “I don’t forgive the machine. But I heard you.”

### t_ostra_hearing · choice 2
<!-- fate:teleport/t_ostra_hearing.choice[1].label -->
Unseal everything now, under oath, late.

<!-- fate:teleport/t_ostra_hearing.choice[1].result -->
The seal breaks in the worst room at the worst time — because the regulator makes you, on the record, while the settlement’s silence clause falls apart. The truth is the same truth it always was. Its late arrival disgraces it. The findings note the cooperation and timestamp it. The sister in the second row lets you pass in the corridor.

### t_ostra_hearing · choice 3
<!-- fate:teleport/t_ostra_hearing.choice[2].label -->
Let counsel carry it. Answer only what is asked.

<!-- fate:teleport/t_ostra_hearing.choice[2].result -->
The lawyers are excellent. The testimony is minimal. The authority notes, in flat text, at the millisecond it happens, each question your counsel declines. The transcript reads exactly like what it is. It will be quoted for years, and never in your favor.

## t_halcyon_offer · THE NUMBER [scene · gated] — speaker: HALCYON

<!-- fate:teleport/t_halcyon_offer.leadIn -->
It arrives the way HALCYON does everything — machine-generated, machine-polite, and timed to your weakest quarter: an acquisition offer with a number big enough to change everything.

<!-- fate:teleport/t_halcyon_offer.prose -->
Three hundred and forty million. The deck attached is respectful, thorough, and quietly obscene: your satellite ring absorbed into their launch system, your bodies repainted in their colors, your storefronts moved inside their pavilions, “founder transition support” on page nine, where they put the part where you leave. The monopoly feels no anger about the road you built around it. It has simply priced the road, the way it prices everything. The price is real, and it would make your family rich for generations. Around the table, the people who own the company you built look at the number, and then at you.

### t_halcyon_offer · choice 1
<!-- fate:teleport/t_halcyon_offer.choice[0].label -->
Take the number. Let the sky have it.

<!-- fate:teleport/t_halcyon_offer.choice[0].result -->
The signatures take a full day. The wire takes four seconds. The satellites you launched in threes change their names overnight. Somewhere at the pole, a body wakes for its shift wearing a new logo on its chest, works on, and never once looks up.

### t_halcyon_offer · choice 2
<!-- fate:teleport/t_halcyon_offer.choice[1].label -->
Refuse. The road stays open.

<!-- fate:teleport/t_halcyon_offer.choice[1].result -->
The refusal is one paragraph. HALCYON answers with silence: no counter, no pressure, no acknowledgment. That silence is the most honest thing HALCYON has ever sent you. Somewhere in its planning system, your file just moved from the queue of things it wants to buy into the queue of things it plans to beat.

### t_halcyon_offer · choice 3
<!-- fate:teleport/t_halcyon_offer.choice[2].label -->
Counter: you drop the OSTRA case, they guarantee your launches.

<!-- fate:teleport/t_halcyon_offer.choice[2].result -->
The OSTRA case, it turns out, has been sitting on their top lawyer’s desk like a stone in a shoe. The settlement that comes back drops the acquisition, guarantees your launch slots at posted prices for five years, and pays your legal costs with a number that rounds to six hundred thousand. A peace, signed by a dashboard and honored to the letter.

## t_listing · THE SECOND BELL [scene · gated]

<!-- fate:teleport/t_listing.leadIn -->
The bankers come to the Cape this time — a different bank, or the same bank with a different posture. The founder they are pitching has done this before, and the file says so.

<!-- fate:teleport/t_listing.prose -->
The buyers line up for a company that has told the truth when the truth cost money: the death at the pole published with the fault marked in your own hand, the delay framed by the hangar door, the forecast that came in flat and true. The lead banker circles a price with her pen — the high number, the one that makes headlines on day one and regrets by spring — and looks up. You realize she has read the Hyperchute file, or lived it, because she says this first: “I already know which number you’re going to pick. I told the bank group to model the honest one.” Around the table sit a CFO who waited through eleven companies to ring a bell as an operator, and board signatures you earned one vote at a time.

### t_listing · choice 1
<!-- fate:teleport/t_listing.choice[0].label -->
Take the company public. Price the honest number.

<!-- fate:teleport/t_listing.choice[0].result -->
The bank group grumbles for exactly one conference call, and then the roadshow discovers what the expo discovered years ago: honesty at scale is a spectacle. The buyers close it full on the number the chairs can survive.

### t_listing · choice 2
<!-- fate:teleport/t_listing.choice[1].label -->
One more year private. The offering grows.

<!-- fate:teleport/t_listing.choice[1].result -->
You send the bankers home with the kindest no in the industry. The offering may be bigger next year. The window may close. Both futures are yours to hold now, along with everything else the waiting costs.

## t_dark_listing · THE SEAMLESS STORY [scene · gated]

<!-- fate:teleport/t_dark_listing.leadIn -->
The bankers love this version of the company. Of course they do. Seamless presence, sealed lawsuits, and a press climate the warning section calls “managed.” The orders pour in. Every sentence in the listing papers is almost true, and the lawyers have initialed the almost.

<!-- fate:teleport/t_dark_listing.prose -->
The roadshow video is beautiful. In it, a hand reaches for a rock at Shackleton and the fingers close smoothly. The counter is gone. The number is gone. The delay was retired years ago, along with the man who framed it. The warning section discloses every important fact in sentences built to be skimmed. The death is “an operational incident, fully resolved.” Everyone in the bank group knows exactly what they are selling. The price the pen circles is the biggest number anyone has ever attached to your name. All it costs is the story being true.

### t_dark_listing · choice 1
<!-- fate:teleport/t_dark_listing.choice[0].label -->
Ring it. Sell the seamless story at the seamless price.

<!-- fate:teleport/t_dark_listing.choice[0].result -->
The bell rings on time, the first-day price jump makes history, and everyone agrees the podium photographs look seamless.

### t_dark_listing · choice 2
<!-- fate:teleport/t_dark_listing.choice[1].label -->
Pull the filing. Not like this.

<!-- fate:teleport/t_dark_listing.choice[1].result -->
You pull the listing paperwork eleven days before the bell, at a cost the CFO declines to say out loud. The press release struggles to name the reason. The people closest to you understand it. If this company ever goes public, it will go public as something you can watch with your own eyes open.

## t_commons · THE PROTOCOL QUESTION [scene · gated]

<!-- fate:teleport/t_commons.leadIn -->
The letter arrives on actual paper, signed by four space agencies and eleven research stations. They want to turn the cascade — your cascade — into the open shared rules for remote presence beyond Earth. A private note is clipped to the back, in handwriting you know.

<!-- fate:teleport/t_commons.prose -->
The agencies want the cascade the way harbors want lighthouses: owned by no one, maintained by everyone, trusted absolutely. Saying yes means giving away the moat — the handover patents, the timing math, the name in the equations — to a standards body. Your company becomes one builder among many. Every banker you know would call it throwing away a fortune. The handwritten note makes the other case: this is the future where the thing gets built right everywhere, instead of profitably in one place. The note is signed the way its author signs everything. 2.61.

### t_commons · choice 1
<!-- fate:teleport/t_commons.choice[0].label -->
Give the cascade to everyone. Keep only the name.

<!-- fate:teleport/t_commons.choice[0].result -->
The signing ceremony is held in the hangar because you refuse anywhere grander. Four agencies, eleven stations, one standards body, and — arriving late, unannounced, carrying his own lawn chair — the man whose math it always was, watching his number become the world’s.

### t_commons · choice 2
<!-- fate:teleport/t_commons.choice[1].label -->
Keep the moat. Lighthouses can be companies too.

<!-- fate:teleport/t_commons.choice[1].result -->
You license instead of donate — generous terms, fair rates, the moat intact. The agencies sign because they need the system. That need will outlive their gratitude. The handwritten note goes in a drawer you will open again someday, on a harder day, in a different company.

## t_endgame · WHAT IT BECOMES [scene · gated]

<!-- fate:teleport/t_endgame.leadIn -->
Three years can found a company. Four years make it part of the world. TELEPORT has outlived every prediction except yours, and the question on the table has changed. What does it become next?

<!-- fate:teleport/t_endgame.prose -->
The board packet this quarter reads like a menu of futures. HALCYON’s standing number, refreshed monthly and patient as tide. The ending plan the finance office modeled at your request: obligations met, satellites brought down with honors, capital returned, heads held high. And the long road: keep building, keep bleeding, keep the chair warm for a future that keeps almost arriving. TELEPORT has spent four years asking what distance is worth. Now it needs an answer.

### t_endgame · variant 1 (plays when its condition is true)
<!-- fate:teleport/t_endgame.vary[0].prose -->
The board packet this quarter reads like a menu of futures. HALCYON’s standing number, refreshed monthly and patient as tide. The ending plan June modeled at your request: obligations met, satellites brought down with honors, capital returned, heads held high. And the long road: keep building, keep bleeding, keep the chair warm for a future that keeps almost arriving. TELEPORT has spent four years asking what distance is worth. Now it needs an answer.

### t_endgame · choice 1
<!-- fate:teleport/t_endgame.choice[0].label -->
Sell to HALCYON. Let the number be the ending.

<!-- fate:teleport/t_endgame.choice[0].result -->
The standing number, accepted at last. The integration team arrives wearing your competitor’s patience.

### t_endgame · choice 2
<!-- fate:teleport/t_endgame.choice[1].label -->
Close the company with honors. Pay everyone, land everything.

<!-- fate:teleport/t_endgame.choice[1].result -->
Obligations first: the Verge contract handed off intact, the operators placed, the customers made whole. What cannot be handed off is brought down — carefully, publicly, one satellite at a time. A company that ends on purpose, owing nothing, is so rare the trade press has no template for it.

### t_endgame · choice 3
<!-- fate:teleport/t_endgame.choice[2].label -->
Hand the cascade to the commons and step back.

<!-- fate:teleport/t_endgame.choice[2].result -->
The shared rules outlive the company on purpose. It is the rare exit where the mission outlives the business — politely, with a pension.

## t_s_farrokh_loan · HIS OTHER ACCOUNT [scene · gated] — speaker: Dr. Omid Farrokh

<!-- fate:teleport/t_s_farrokh_loan.leadIn -->
The runway math has reached the point where everyone can do it in their heads, then quietly stops saying it out loud. Omid asks for five minutes after standup and shuts the door.

<!-- fate:teleport/t_s_farrokh_loan.prose -->
He puts a personal check on the desk, already signed, amount blank. “My consulting years,” he says. “The money nobody would let me spend on the cascade. Sixty thousand — it’s what there is.” You start to object, and he holds up one hand. “I am being accurate. If this company dies, my life’s work goes back in the cardboard box, and I have done the box. Nine years of the box.” He slides the check an inch closer. “Partners fund the gap. That was the deal even when we didn’t write it down.”

### t_s_farrokh_loan · choice 1
<!-- fate:teleport/t_s_farrokh_loan.choice[0].label -->
Take it as a loan, papered, with interest.

<!-- fate:teleport/t_s_farrokh_loan.choice[0].result -->
Tomás writes it up properly at cost — a real note, real interest, real dignity. Money between partners gets written down before it turns poisonous. You both know which kind you want, and sign accordingly.

### t_s_farrokh_loan · choice 2
<!-- fate:teleport/t_s_farrokh_loan.choice[1].label -->
Refuse it. Partners don’t eat each other’s savings.

<!-- fate:teleport/t_s_farrokh_loan.choice[1].result -->
He takes the check back without argument, tears it once, and puts the halves in his shirt pocket. “Then find the money,” he says, “because I don’t know how to do the box again.” It is the closest he has ever come to asking you for anything.

## t_s_pawn_body · THE MUSEUM PIECE [scene · gated]

<!-- fate:teleport/t_s_pawn_body.leadIn -->
The collector’s email has been flagged for a month. He is a rich space-history type who “acquires artifacts of the presence era.” You know what he wants. It is standing in the corner of the hangar, cabled to a rack, retired.

<!-- fate:teleport/t_s_pawn_body.prose -->
Demo Body One waits under a dust sheet by the far wall — the expo machine, the one the crowd counted out loud for, the one whose wrist motor you replaced in a hotel bathroom with a borrowed tool. It has sat idle for a year, because the newer bodies turned it into a museum piece. Now a collector is offering ninety thousand dollars in cash, and payroll is due in nineteen days. It turns out monuments can be sold by the pound too.

### t_s_pawn_body · choice 1
<!-- fate:teleport/t_s_pawn_body.choice[0].label -->
Sell it. Machines work for the company, even this way.

<!-- fate:teleport/t_s_pawn_body.choice[0].result -->
The crate — the same casket-sized crate — gets loaded by people who have no idea what they are carrying. In the collector’s lobby it will stand under track lighting with a plaque that gets the date wrong. Payroll clears. The corner of the hangar stays empty for months because nobody can decide what deserves the spot.

### t_s_pawn_body · choice 2
<!-- fate:teleport/t_s_pawn_body.choice[1].label -->
Keep it. Find the payroll money somewhere else.

<!-- fate:teleport/t_s_pawn_body.choice[1].result -->
You write the refusal in one line, then walk to the corner of the hangar and stand a while with the machine that started everything. Money keeps a company alive. This is one of the things that tells it where to go. Nineteen days is nineteen days.

## t_s_halcyon_consult · TEACHING THE ANACONDA [scene · gated] — speaker: HALCYON

<!-- fate:teleport/t_s_halcyon_consult.leadIn -->
The message from HALCYON’s partnership system is so bland it becomes threatening: a six-week paid job where your operations team trains theirs on “remote robot best practices.”

<!-- fate:teleport/t_s_halcyon_consult.prose -->
One hundred and fifty thousand dollars for six weeks of teaching the launch monopoly how remote Moon work actually runs — the checklists, the handover drills, how you pick an operator. Everyone in the room understands what HALCYON is really buying. Their secret robot lab has spent a year trying to copy your operation and failing, and the model has decided lessons are cheaper than more failures. The spreadsheet adds one fact with no opinion attached: the fee equals one payroll, and it arrives one payroll before you run out.

### t_s_halcyon_consult · choice 1
<!-- fate:teleport/t_s_halcyon_consult.choice[0].label -->
Take the engagement. Teach carefully.

<!-- fate:teleport/t_s_halcyon_consult.choice[0].result -->
Six weeks of teaching the anaconda table manners. Your team is careful about what stays secret, and the checks clear. The industry notices anyway. The trade press runs a paragraph with the word “capitulation” hiding between the lines. Payroll does not care about subtext.

### t_s_halcyon_consult · choice 2
<!-- fate:teleport/t_s_halcyon_consult.choice[1].label -->
Decline. You don’t school the thing hunting you.

<!-- fate:teleport/t_s_halcyon_consult.choice[1].result -->
The refusal costs a payroll cycle’s worth of sleep and buys something with no line item. Everyone at the company knows, now, that there is a number the founders won’t take. That knowledge shows up to work differently the next morning.

## t_s_ramen · THE LIST [scene · gated]

<!-- fate:teleport/t_s_ramen.leadIn -->
The spending spreadsheet becomes the first thing you see every morning and the last thing you see at night, like a newborn that only screams. Somebody has to make the list of cuts. The list is yours to make.

<!-- fate:teleport/t_s_ramen.prose -->
Every line on the cut list has a face: the second operator shift, the Mars bench if it still burns, the conference budget, the good coffee, the contractor who fixed the roof and stayed because he believed in the thing. The math is brutal — cut deep enough to survive, but shallow enough that a company worth saving still exists afterward. Founders before you have made this list at kitchen tables, in garages, and in hangars exactly like this one, and every one of them will tell you the same two facts: it works, and you never stop remembering the faces.

### t_s_ramen · choice 1
<!-- fate:teleport/t_s_ramen.choice[0].label -->
Cut deep. Live long enough to be sorry.

<!-- fate:teleport/t_s_ramen.choice[0].result -->
Eleven people, one bench, most of the softness. You tell each of them yourself, face to face. It fixes nothing and matters anyway. The building is quieter afterward in a way that has nothing to do with headcount.

### t_s_ramen · choice 2
<!-- fate:teleport/t_s_ramen.choice[1].label -->
Cut shallow. Bet the next deal closes in time.

<!-- fate:teleport/t_s_ramen.choice[1].result -->
The gentler list cuts the budget lines with no faces, the vendor contracts, your own salary to a dollar. It buys fewer weeks. It keeps the machine whole for the future you are still, against the spreadsheet’s advice, expecting.

## t_insolvency · RUNWAY ZERO [scene]

<!-- fate:teleport/t_insolvency.leadIn -->
Space companies die exactly like garage companies. The account turns the same red, and the inbox goes just as quiet. The only difference is how many zeros are on the way down.

<!-- fate:teleport/t_insolvency.prose -->
Payroll bounces at a company with hardware around the Moon. The satellite ring keeps flying because objects in orbit do not read the news. Everything on the ground goes brittle at once: the insurer wants a call, the landlord wants a call, and the people who moved their families to the Cape for you want, deserve, more than a call. Doors remain, even now. They are all ugly, and they are all real.

### t_insolvency · choice 1
<!-- fate:teleport/t_insolvency.choice[0].label -->
Bridge loan against the constellation itself

<!-- fate:teleport/t_insolvency.choice[0].result -->
Signed at midnight against the relays, the bodies, the patents — the list of pledged assets reads like an inventory of your life. During review, the lender’s engineer asks how someone takes back a satellite. Nobody laughs.

### t_insolvency · choice 2
<!-- fate:teleport/t_insolvency.choice[1].label -->
Down round — June doubles down on you

<!-- fate:teleport/t_insolvency.choice[1].result -->
The round that was supposed to arrive dies on somebody’s dashboard. You call June so she hears it from you first. You have stopped expecting anything, and she does the June Park thing, the thing she has done across two companies now: “Then I’m in for my share anyway.” It costs real ownership and a price that stings. She wires it before the call ends, and neither of you ever calls it charity.

### t_insolvency · choice 3
<!-- fate:teleport/t_insolvency.choice[2].label -->
Acqui-hire to HALCYON: the team survives, the road ends

<!-- fate:teleport/t_insolvency.choice[2].result -->
The monopoly takes the engineers, the patents, and the satellite ring at the distressed price its model has been patiently forecasting since the week it met you. The road around the sky becomes a lane inside it.

### t_insolvency · choice 4
<!-- fate:teleport/t_insolvency.choice[3].label -->
Surrender

<!-- fate:teleport/t_insolvency.choice[3].result -->
Some machines are worth more than their company was allowed to be.

## t_burnout · THE BODY KEEPS SCORE [scene]

<!-- fate:teleport/t_burnout.leadIn -->
A founder’s body has its own alarm. Yours sounds like a waiting room at 4 a.m., a blood pressure cuff, and a doctor reading your intake form with visible professional concern.

<!-- fate:teleport/t_burnout.prose -->
The diagnosis sounds small, and the doctor treats that as the warning. This is the exit ramp before the dramatic ones. You run a company that lets people stand on the Moon without leaving Earth, and in every way that matters, you have lived inside the building for two years. Every machine in the control bay gets scheduled maintenance. Your body just scheduled its own, and the woman with the clipboard is explaining that kindly and with no room for argument.

### t_burnout · choice 1
<!-- fate:teleport/t_burnout.choice[0].label -->
Take the forced rest. Three real weeks.

<!-- fate:teleport/t_burnout.choice[0].result -->
Three weeks of handed-off decisions and phone-free mornings. The company survives you resting. That finding rearranges you more than the bloodwork: it can breathe without you. That fact will matter again someday, in a room with very good chairs.

### t_burnout · choice 2
<!-- fate:teleport/t_burnout.choice[1].label -->
White-knuckle it. Decline the diagnosis.

<!-- fate:teleport/t_burnout.choice[1].result -->
You negotiate with your own body like it is a vendor, and it extends terms once, the way vendors do — with interest, and a note in the file. “Nothing left in the tank next time.” The doctor’s exact words, written where you will find them again.

### t_burnout · choice 3
<!-- fate:teleport/t_burnout.choice[2].label -->
Walk away. Let it all end here.

<!-- fate:teleport/t_burnout.choice[2].result -->
Some versions of health cost a company. You pay that price. The wind-down is orderly because whoever is left holding the spreadsheet makes it orderly, and the last thing shipped is everyone’s final paycheck, on time.

## TELEPORT · ENDINGS

### ending: listing — THE HONEST DELAY [triumph]
<!-- fate:teleport/end.listing.prose -->
TELEPORT lists at 9:31 a.m. at the honest price, with the delay printed on the cover of the listing papers. The company that told the truth about distance now belongs to the people who crossed it — teachers’ pensions, index funds, and a schoolteacher in Ohio with eleven shares.

#### ending listing · film screen 1
<!-- fate:teleport/end.listing.screen[0].prose -->
The pricing call is shorter this time. You have done this before, and the share price you keep repeating is the low, honest one — the price that will not wipe out the ordinary families who buy in if the market turns. The lead banker, who planned around the honest price from the start, closes her binder after twenty minutes and says, “I love a boring pricing call. They’re so rare.”

#### ending listing · film screen 2
<!-- fate:teleport/end.listing.screen[1].prose -->
The bell rings at 9:31, because you asked for the same minute on purpose.

On the podium: a CFO who waited through eleven companies to stand there as an operator, gripping the rail with both hands, and beside her the number 2.61, printed on the banner, the cofounder’s truth that made the whole thing possible. On the big board, under the ticker, where the exchange usually runs a slogan, you paid to keep one line:

EVERY SESSION CARRIES 2.6 SECONDS OF LIGHT-SPEED HONESTY.

#### ending listing · film screen 3
<!-- fate:teleport/end.listing.screen[2].prose -->
At Shackleton Verge it is mid-shift, and nobody stops working for a bell on another world.

Commander Salazar has the feed up in operations, sound off. At 9:31 Earth time he looks at the screen for four seconds — an eternity, from him — and says, to the room, to the bodies on the schedule, to the boring immortal work:

“Back to it.”

High praise. The highest.

#### ending listing · film screen 4
<!-- fate:teleport/end.listing.screen[3].prose -->
And in a strip-mall storefront in Ohio, a retired schoolteacher who owns eleven shares — bought at lunch, at the honest price — settles into the chair for her anniversary session.

Two point six seconds later, on the oldest light in the solar system, a hand rises against the small blue coin of the Earth.

It waves.

#### ending listing · interlude (the years after)
<!-- fate:teleport/end.listing.interlude.prose -->
Two years of quarterly earnings calls and glass offices, rich enough that strangers quote your net worth at parties. The satellite ring grows, the chairs multiply, and the maintenance shifts hum along above you with your name on their chest. At conferences and in green rooms, the same rumor keeps finding you: a new company is forming around the oldest dream in the space business — a space elevator. A real one. A cable from the ground to orbit, with cargo cars climbing it like trains. Goods first, humans someday. They are calling it a skyline. They keep asking one question in every room where your name comes up: who alive has built a road between worlds and told the truth about it twice?

### ending: swallowed — SWALLOWED BY THE SKY [sale]
<!-- fate:teleport/end.swallowed.prose -->
The satellite ring changes its names overnight. The bodies at the Verge get repainted and keep working. The storefront chairs move into HALCYON pavilions, where the line moves faster and the magic feels like nothing. You are wealthy in the way the model predicted, to the dollar. Up at the pole, the shifts keep running as if nothing happened, because for the machines, nothing did.

#### ending swallowed · interlude (the years after)
<!-- fate:teleport/end.swallowed.interlude.prose -->
Three years of merger committees and a fancy title that means retired without saying the word. You watch the monopoly run your road the way monopolies run everything: efficiently, joylessly, and only where the margins live. The Verge contract survives. The honest counter gets removed. In the third spring, your ban on competing ends quietly on a Tuesday. That same week, a company planning to build a space elevator — an actual cable from the ground to space — sends three people to your kitchen table. They know exactly what you sold and exactly what it cost. “Help us build the one thing,” they say, “that no launch schedule can bump.”

### ending: bankrupt — FORTY FALLING STARS [noble]
<!-- fate:teleport/end.bankrupt.prose -->
The bankruptcy people can take the desks and the patents, but nobody can repossess an orbit. So the satellites come down on schedule instead — brought down one by one over six weeks, each a streak of light across somebody’s evening. The last one is visible from the Flats. People come out onto porches that once caught falling packages and watch a company become a meteor shower. People who saw it have never once called it a failure.

#### ending bankrupt · interlude (the years after)
<!-- fate:teleport/end.bankrupt.interlude.prose -->
A year of wind-down paperwork and unexpected mail. The company died owing nothing, and your own accounts survived it. The buyout money from the Hyperchute years was never in the company. And consulting pays absurdly well when every space agency on Earth wants to learn how you ran remote operations. Operators write to say the training program got them hired at three agencies. A letter arrives from Shackleton Verge in January. Commander Salazar’s annual letters, it turns out, include companies he considered crew. In the spring, a fat envelope arrives from a group you have never heard of. Inside is a study for a space elevator and a sticky note in an engineer’s hand: WE READ THE ELEVEN SECONDS. WE WANT PEOPLE WHO PUBLISH. CALL US.

### ending: puppet — THE PUPPET SHOW [disgrace]
<!-- fate:teleport/end.puppet.prose -->
The seamless story prices at the seamless number and makes everyone rich, especially you. The machines guess beautifully, the customers never learn which motions were theirs, and the counter that once hung by a hangar door sits in a collector’s lobby with the date wrong on the plaque. All of it works exactly as sold. The machines do exactly what the customers see. The guessing stays secret, and you settled that question years ago.

#### ending puppet · interlude (the years after)
<!-- fate:teleport/end.puppet.interlude.prose -->
Four years of earnings calls where the word “delay” never appears. The stock performs. The settlements stay sealed. Nadia Osei’s book about the presence era has a chapter with your name on it, and you have never read past its first page. At night, sometimes, you sit in a chair no customer uses anymore — honest mode, the counter running — and watch a robot hand on the Moon copy yours, 2.6 truthful seconds late. In the fourth year, a company planning a space elevator calls. They need money and they need a famous name, and they are flexible about the order.

### ending: ousted — REMOVED FOR CAUSE [ousted]
<!-- fate:teleport/end.ousted.prose -->
The company you founded in a hangar with a cardboard box of physics continues without you, professionally managed and model-approved. Your badge photo comes down. The framed 2.61, if it still hung anywhere, goes to storage. The resignations start the same afternoon — two-line letters the trade press quotes for years. The satellite ring flies on over the pole, wearing your decisions and someone else’s name.

#### ending ousted · interlude (the years after)
<!-- fate:teleport/end.ousted.interlude.prose -->
Two years of being the cautionary tale at other people’s board dinners. Here is what the board could not take: your shares. They fired you from the job, never from the ownership, and in the second year you quietly sell a piece of your stake back to the company — millions in the bank, wired by the same people who removed you. You watch your company from the outside after that — the launches you planned, the storefronts you picked, the professional CEO running your roadmap well and calling it a turnaround. June calls every Sunday. Omid sends exactly one message, on the anniversary: THE NUMBER IS STILL THE PRODUCT. In the second spring, a company planning to build a space elevator — a cable from the ground straight up to orbit — asks to meet. They are not shopping for a company to buy. They flew here to recruit you. “The board that fired you,” their chair says, “published its reasoning. We read it twice. We concluded we were reading a reference letter.”

### ending: commons — THE CASCADE BELONGS TO EVERYONE [transformation]
<!-- fate:teleport/end.commons.prose -->
The shared rules go to the standards body with the patents attached, free forever. Within eighteen months, cascade relays circle the Moon wearing eleven flags and four languages, all honest to the millisecond, because the rules you donated make lying a violation. The company becomes one builder among many, smaller and prouder. The number belongs to everyone now, which is why you gave it away.

#### ending commons · interlude (the years after)
<!-- fate:teleport/end.commons.interlude.prose -->
Two years chairing a standards body — the most powerful boring job in the solar system. The company you kept is smaller now, and still yours, and still profitable, which quietly makes you wealthier every quarter the cascade grows. Agencies defer to you. Monopolies comply with you, slowly, filing objections you answer with citations. The cascade carries presence to the Moon under every flag there is. At the second annual meeting, a team of engineers corners you with feasibility studies and a gleam you recognize from a hangar, years ago. They want to build a space elevator — a cable from the ground to orbit that no launch schedule can bump and no monopoly can own, if someone builds it as public property from the first bolt. “You gave away a protocol,” they say. “Come give away an elevator.”


---

# SKYLINE, INC. — The road up.

## SKYLINE · OPENING FILM

### film screen 1 — THE ACCIDENT
<!-- fate:skyline/prologue[0].prose -->
It starts, like half the big things in your life, with a machine misbehaving.

Your old factory — the one that made relay tethers for the Moon business — was chasing a cheaper cable recipe. One batch came out wrong. The testing machine that was supposed to snap it broke instead. The engineers assumed the machine was faulty, ordered a bigger one, and broke that too.

The third test used a hydraulic press designed for ship anchors. The lab called you at 2 a.m., which is when engineers call about miracles, and said a sentence you made them repeat twice.

“Boss, we can’t break it.”

### film screen 2 — THE OLD DREAM
<!-- fate:skyline/prologue[1].prose -->
A cable from the ground to space is the oldest dream in the rocket business, because it makes rockets unnecessary.

Stretch a line from a platform on the equator up to a station in orbit — thirty-six thousand kilometers — and the spin of the Earth holds it taut, like a ball on a string. Climber cars ride up and down. No fuel, no fire, no countdown. Freight to orbit for one percent of today’s price, and someday, a ticket price a schoolteacher could pay.

Every engineer alive has done this math as a daydream. The material strong enough to survive its own weight was always the missing piece — thirty years away, the textbooks said. The textbooks said that for ninety years.

The strand in your lab makes the textbooks wrong.

### film screen 3 — WHAT IT COSTS
<!-- fate:skyline/prologue[2].prose -->
You know exactly what the last two companies cost you, because you carry the receipts in your body.

The garage years cost your savings and half your health. The Moon years cost a worker’s life, a cofounder’s peace, and your father — who kept every clipping in a shoebox and never got to see this one.

Every company is a bet, and you have learned the real stakes are never the money. The money is just how the bet keeps score.

This one will be the biggest bet anyone has ever placed. Billions of dollars. Thousands of people. Nations at the table, some of them as enemies.

You are forty-five years old. You do the arithmetic at your kitchen table one night: this is the last one you will have the strength to build from zero.

Then you call Anders Voss.

### film screen 4 — THE ROAD
<!-- fate:skyline/prologue[3].prose -->
The plan fits on one page, the way real plans do.

Prove the strand at length. Anchor a platform in the deep ocean at the equator. Build the cable one woven kilometer at a time, and hang climber cars on it that walk to orbit at three hundred kilometers an hour.

Then charge so little for the ride that the sky stops being a place for governments and billionaires, and starts being a place, period.

Everyone who fought you before will come back for this one — the giants, the funds, the politicians, and things that did not exist when you started: money with flags, and money that thinks.

Last night you filed the papers for a company called SKYLINE, INC. Its whole promise fits in three words.

The road up.

## s_entry · THE STRAND THAT WOULD NOT BREAK [scene] — speaker: Anders Voss

<!-- fate:skyline/s_entry.leadIn -->
It started as a factory accident. Your old tether plant, trying to make relay cables cheaper, produced a strand so strong the testing machine broke before the strand did. The lab ordered a bigger testing machine. That one broke too.

<!-- fate:skyline/s_entry.prose -->
Anders Voss has spent thirty years building bridges, and he has spent the last three weeks locked in your materials lab with the strand. He meets you at the test rig with a piece of it stretched across a frame — thinner than a shoelace, holding a truck engine off the floor. “Every engineer alive has done this math as a daydream,” he says. “A cable from the ground to orbit. The material was always the missing piece. It was supposed to be thirty years away.” He hands you the strand, and it weighs nothing at all. That does more convincing than anything he says. “Your factory made it by accident. I checked the math nine times, and I will say this once, quietly. We can build the elevator.”

### s_entry · choice 1 → s_b_lab
<!-- fate:skyline/s_entry.choice[0].label -->
Hire him to build it. Chief engineer, real equity.

<!-- fate:skyline/s_entry.choice[0].result -->
He reads the offer once and signs it against the test rig. “Two conditions,” he says. “I set the safety margins, and nobody ever argues me down with a calendar.” You shake on both conditions, and the years ahead will test you on both.

### s_entry · choice 2 → s_b_lab
<!-- fate:skyline/s_entry.choice[1].label -->
Hire him on salary. Keep the equity close.

<!-- fate:skyline/s_entry.choice[1].result -->
He takes the salary without blinking, because the cable matters more to him than the money. Something in his manner stays formal, though — the care of a builder who knows exactly whose name is on the deed.

### s_entry · choice 3 → s_b_lab
<!-- fate:skyline/s_entry.choice[2].label -->
Slow down. Verify the material with outside labs first.

<!-- fate:skyline/s_entry.choice[2].result -->
Three independent labs spend six weeks trying to prove the strand is a fluke. All three fail, and one asks to invest. Anders approves of the caution more than he says. “Good,” is all he offers. From him, that is a speech.

## s_b_lab · THE QUIET MONTHS [bridge]

<!-- fate:skyline/s_b_lab.prose -->
The company forms around the strand the way a pearl forms around grit. Anders fills the old tether factory with test rigs and hires metallurgists who thought their careers were over. You file patents under boring names, buy the machines that make the machines, and tell nobody anything. Every night the strand gets longer, and every night the number on Anders’s whiteboard — the length the cable must reach to hold itself against the spin of the Earth — stares back, unimpressed. The whiteboard says 36,000 kilometers. The spool in the lab holds four.

### s_b_lab · choice 1 → s_mateo
<!-- fate:skyline/s_b_lab.choice[0].label -->
Continue

## s_mateo · THE KID FROM THE FLATS [scene] — speaker: Mateo Reyes

<!-- fate:skyline/s_mateo.leadIn -->
The company needs a chief of staff before it needs anything else, because you now run three buildings, forty engineers, and a secret. The best résumé in the stack comes with a cover letter that starts with your first company, not your last one.

<!-- fate:skyline/s_mateo.prose -->
Mateo Reyes is twenty-nine and has run operations for a governor and a shipping line. His cover letter says he grew up in the Flats, on a street where the packages fell soft as rain. In the interview he is direct about it. “I was nine when your tubes reached our block. My grandmother stopped riding the bus for her medicine that year. I have wanted to work for you since I was nine, and I want to be clear — that is exactly why you should worry about hiring me. People who admire you make bad guards. So test me.” He slides a one-page memo across the desk. It is a list of five problems your company has right now. You knew about three of them.

### s_mateo · choice 1
<!-- fate:skyline/s_mateo.choice[0].label -->
Hire him. The honesty is the résumé.

<!-- fate:skyline/s_mateo.choice[0].result -->
He starts Monday and fixes the two problems you did not know about by Thursday. His desk faces the door, and on it sits a photo of a porch with an old delivery tube — the kind your first company installed. You never ask. He never explains.

### s_mateo · choice 2
<!-- fate:skyline/s_mateo.choice[1].label -->
Hire him, but keep the secret from him for now.

<!-- fate:skyline/s_mateo.choice[1].result -->
He runs the visible company brilliantly and figures out the invisible one in eleven days, because the strand purchases leave a paper trail a good operator can read. He never mentions it. You find out he knows when he hands you a briefing titled THE THING WE ARE NOT DISCUSSING.

## s_marcus · THE OLD RIVAL [scene · gated] — speaker: Marcus Vale

<!-- fate:skyline/s_marcus.leadIn -->
Marcus Vale asks for lunch at a diner near the old Flats corridor, which is his way of saying he knows where everything started. He is grayer now, near the end of his run at MERIDIAN, and he orders pie like a man with nothing left to prove.

<!-- fate:skyline/s_marcus.prose -->
He gets to it before the coffee arrives. “My analysts flagged your factory’s power bills eight months ago. Nobody buys that much testing equipment to make satellite tethers.” He smiles at your face. “Relax. I have told no one, and I am not here to buy you. I tried that once, and you said the best no I ever heard.” He turns his placemat over and draws two boxes. “A cable to orbit is worthless without a ground network feeding it. I run the biggest one on Earth, and in six years, drones are a commodity and MERIDIAN is a museum. I need a future. You need freight contracts, warehouses at the anchor port, and a friend who knows every regulator you are about to meet.” He slides the placemat across. “Partners. The kind you actually needed last time.”

### s_marcus · choice 1 → s_b_alliance
<!-- fate:skyline/s_marcus.choice[0].label -->
Alliance. MERIDIAN feeds the cable, you split the road.

<!-- fate:skyline/s_marcus.choice[0].result -->
MERIDIAN wires sixty million dollars as a strategic investment and signs freight contracts that start paying the day the first cargo climbs. The man who once tried to buy your first company shakes your hand across a diner table, and this time both grips mean the same thing.

### s_marcus · choice 2 → s_b_alliance
<!-- fate:skyline/s_marcus.choice[1].label -->
Take his money without the partnership.

<!-- fate:skyline/s_marcus.choice[1].result -->
“Money it is,” he says, and signs without complaint, though something in his shoulders settles an inch lower. He wanted to build one more thing. You bought his check and left the builder at the table.

### s_marcus · choice 3 → s_b_alliance
<!-- fate:skyline/s_marcus.choice[2].label -->
Decline. No giants on the cap table this time.

<!-- fate:skyline/s_marcus.choice[2].result -->
He nods slowly, pays for both meals, and leaves you with one sentence that stays: “I fought you once and lost to what you are. Just remember — the people coming for this one make me look like a neighbor.”

## s_b_alliance · WHAT THE LUNCH MEANT [bridge]

<!-- fate:skyline/s_b_alliance.prose -->
Word of the meeting moves through the industry within a week, because a MERIDIAN chairman does not eat pie in the Flats by accident. Nobody knows what was said, and that silence is louder than any statement. Two investment funds that ignored your emails in the spring now ask for meetings. A logistics reporter calls Mateo and asks, carefully, whether the rumors about a “vertical project” are worth her time. The strand in the lab crosses forty kilometers of spooled length the same night, and Anders marks the milestone the way he marks all of them — by writing the next, larger number on the whiteboard and going back to work.

### s_b_alliance · choice 1 → s_proof
<!-- fate:skyline/s_b_alliance.choice[0].label -->
Continue

## s_proof · ONE HUNDRED KILOMETERS, STRAIGHT UP [scene]

<!-- fate:skyline/s_proof.leadIn -->
The test Anders designs is simple to describe and absurd to look at: a balloon platform lifts one end of the strand a hundred kilometers up, to the edge of space, while the other end stays winched to a barge. If the strand holds its own weight at that length, the math for the full cable stops being a daydream.

<!-- fate:skyline/s_proof.prose -->
At dawn the strand disappears into the sky like a pencil line drawn by someone very patient. Cameras track it until it is invisible, and then the instruments carry the story alone. Tension nominal. Sway within limits. Anders stands at the winch console for six hours and speaks only to the cable, softly, in Norwegian. At 1:14 p.m. the test reaches full load, holds it, and keeps holding it. The barge crew starts to cheer, and Anders raises one hand for silence like a conductor. He waits another full hour before he lets anyone celebrate. Then he turns to you with wet eyes and total calm and says, “Now you may call the bankers.”

### s_proof · choice 1 → s_b_famous
<!-- fate:skyline/s_proof.choice[0].label -->
Announce it to the world. Full proof, full noise.

<!-- fate:skyline/s_proof.choice[0].result -->
The footage of a line vanishing into the sky plays on every screen on Earth within a day. Three governments call before dinner. So does every fund you have ever met, two you haven’t, and one number Mateo flags with a note: “This one owns a country’s savings. Careful.”

### s_proof · choice 2 → s_b_famous
<!-- fate:skyline/s_proof.choice[1].label -->
Keep it quiet. Show the proof privately, buyer by buyer.

<!-- fate:skyline/s_proof.choice[1].result -->
You screen the footage in locked rooms for chosen investors, one at a time, and watch each of them go quiet in the same place — the moment the line stops looking like rope and starts looking like a road. Secrets this size leak anyway. Yours buys you about nine weeks of calm.

## s_b_famous · THE WORD ELEVATOR [bridge]

<!-- fate:skyline/s_b_famous.prose -->
However carefully the proof travels, the word travels faster. Elevator. It shows up in analyst notes with question marks, then in headlines without them. HALCYON’s stock dips four percent on a rumor and recovers on a denial that names no one. Old friends surface — June calls on a Sunday and laughs for a solid ten seconds before saying anything at all, and Priya sends a one-line email you print and keep: SO IT WAS NEVER ABOUT DELIVERY TRUCKS. In towers you have never visited, files open on you. More than one tower. The age of being underestimated is over for good.

### s_b_famous · choice 1 → s_series_a
<!-- fate:skyline/s_b_famous.choice[0].label -->
Continue

## s_series_a · ONE HUNDRED FORTY MILLION [scene · gated]

<!-- fate:skyline/s_series_a.leadIn -->
The Series A for a space elevator does not look like any round you have raised before. The term sheets arrive bound like books, the diligence teams bring their own structural engineers, and every lead investor wants one thing more than returns — a seat at the table where the century gets decided.

<!-- fate:skyline/s_series_a.prose -->
Three offers make the final cut, and Mateo lays them side by side in the war room. A clean syndicate of the big venture funds — one hundred forty million, standard terms, a board seat for the lead. A strategic round built around aerospace giants — more money, more strings, engineers you could use and politics you could choke on. And a card that arrived by courier with no term sheet at all: SHEIKH RASHID AL-MANSOUR, AURELIA SOVEREIGN FUND, printed on paper that feels like cloth, with four handwritten words. WHENEVER YOU ARE READY. Mateo taps that one. “Nine hundred billion under management. Patient as geology. I checked — they have never once led an early round. For you, they are offering to.”

### s_series_a · choice 1 → s_b_funded
<!-- fate:skyline/s_series_a.choice[0].label -->
Take the clean venture syndicate. Boring money, free hands.

<!-- fate:skyline/s_series_a.choice[0].result -->
The syndicate closes in three weeks, and June — who organized half of it from her kitchen — takes the board seat as the lead’s representative, which makes the first board meeting feel less like governance and more like family with lawyers. The Aurelia card goes in your desk drawer. It does not feel finished.

### s_series_a · choice 2 → s_rashid_tea
<!-- fate:skyline/s_series_a.choice[1].label -->
Meet the Sheikh. At least hear the patient money out.

<!-- fate:skyline/s_series_a.choice[1].result -->
You take the syndicate’s money for the round — and accept the tea. Some doors deserve to be looked through before they are closed, and this one has a country behind it.

### s_series_a · choice 3 → s_b_funded
<!-- fate:skyline/s_series_a.choice[2].label -->
Strategic round. The aerospace giants and their strings.

<!-- fate:skyline/s_series_a.choice[2].result -->
The giants bring forty million extra and engineering teams that shave months off the platform design. They also bring observers to every meeting and a contract clause Mateo highlights in yellow and labels REMEMBER THIS ONE — a right to review any change of control. Strings pull both ways. Eventually, everything attached to them moves.

## s_rashid_tea · TEA WITH A BELIEVER [scene] — speaker: Sheikh Rashid al-Mansour

<!-- fate:skyline/s_rashid_tea.leadIn -->
Sheikh Rashid al-Mansour receives you in a hotel suite arranged like a living room, with no aides, no lawyers, and a teapot he pours from himself. On the table sits a printed copy of an interview you gave eleven years ago, in the garage years, annotated in the margins by hand.

<!-- fate:skyline/s_rashid_tea.prose -->
“You said something once that I have never forgotten,” he begins, and reads your own words back to you — the line about starting exactly where the giants refuse to go. “My country grew rich on oil, and oil is ending. I manage the savings of a nation that must now buy its future, and everyone sells me the past — refineries, football clubs, office towers.” He sets down the paper. “You are building the only piece of infrastructure that will matter in a hundred years. I am not asking to invest today. I am asking you to remember, when the numbers get too large for the ordinary funds, that there is money in the world that thinks in generations. Mine.” He refills your cup and smiles like a man who has already seen the ending. “The next round, or the one after. Whenever you are ready.”

### s_rashid_tea · choice 1 → s_b_funded
<!-- fate:skyline/s_rashid_tea.choice[0].label -->
Thank him honestly. Keep the door open.

<!-- fate:skyline/s_rashid_tea.choice[0].result -->
You part with a handshake and no promises, which he seems to prefer. In the elevator down, Mateo reads his phone and goes quiet. “While you were in there,” he says, “Aurelia bought two shipping ports and a satellite firm. He collects infrastructure the way other rich men collect art.”

### s_rashid_tea · choice 2 → s_b_funded
<!-- fate:skyline/s_rashid_tea.choice[1].label -->
Ask him the real question: what does Aurelia want to become?

<!-- fate:skyline/s_rashid_tea.choice[1].result -->
He studies you for a long moment, then answers with more honesty than you expected and less than you will eventually need. “A fund is a wallet,” he says. “I am tired of being a wallet. I want Aurelia to be a place.” You will remember this conversation in about two years, word for word.

## s_b_funded · A COMPANY THE SIZE OF THE JOB [bridge]

<!-- fate:skyline/s_b_funded.prose -->
The money changes the company’s physics. Headcount triples in a quarter, the old tether factory becomes one corner of a campus, and the burn rate crosses three hundred thousand dollars a week — a number that would have killed your first company in an afternoon and now appears in a Tuesday email without comment. Anders’s strand production runs around the clock. Mateo builds the org chart like a hull, watertight compartment by compartment. And on the largest wall of the new headquarters, someone hangs a map of the equatorial oceans, because the next decision is the one that decides everything after it. A cable to space has to start somewhere on Earth.

### s_b_funded · choice 1 → s_site
<!-- fate:skyline/s_b_funded.choice[0].label -->
Continue

## s_site · WHERE THE ROAD TOUCHES THE EARTH [scene]

<!-- fate:skyline/s_site.leadIn -->
The anchor has to sit near the equator, in deep water, away from storms and shipping lanes. The shortlist comes down to three dots on the ocean map, and every dot is really a question about who you will owe.

<!-- fate:skyline/s_site.prose -->
Anders presents the engineering, then Mateo presents the politics, which is the harder half. Option one — the waters of Kiribela, a small island nation drowning in debt, which would lease you a platform zone for almost nothing because it desperately needs the money. Cheap, fast, and fragile, because desperate landlords can be bought out from over your head. Option two — international waters, owned by no one, governed by treaties older than your parents. Nobody can sell your ground to a rival there, and nobody will defend it for you either. Option three — American waters, with Senator Calloway’s public blessing, her committee’s protection, and every string that comes woven into a flag.

### s_site · choice 1 → s_b_site_set
<!-- fate:skyline/s_site.choice[0].label -->
Kiribela. Cheap, fast, and a nation that needs the work.

<!-- fate:skyline/s_site.choice[0].result -->
The lease signs in a government hall with peeling paint and genuine joy — the deal funds Kiribela’s schools and sea walls for a decade, and the platform will employ half the harbor. The finance minister shakes your hand twice. Behind him, unnoticed for now, a junior aide photographs every page of the agreement for a buyer she has never met.

### s_site · choice 2 → s_b_site_set
<!-- fate:skyline/s_site.choice[1].label -->
International waters. Owned by no one, defended by no one.

<!-- fate:skyline/s_site.choice[1].result -->
The lawyers call it the hard road, and they are right — everything costs more when no country is your landlord. But the ground under the cable belongs to a treaty instead of a government, and no single flag can ever claim the road. Anders approves in his quiet way. “Bridges should not have owners,” he says. “Only keepers.”

### s_site · choice 3 → s_b_site_set
<!-- fate:skyline/s_site.choice[2].label -->
American waters. Calloway’s protection, Calloway’s strings.

<!-- fate:skyline/s_site.choice[2].result -->
Senator Calloway announces the partnership on the Capitol steps with you at her side, and the permits move like they have engines. In private, her handshake lasts one second longer than it needs to. “America keeps what America protects,” she says warmly. It takes you the whole flight home to hear the sentence both ways.

## s_b_site_set · STEEL ON THE WATER [bridge]

<!-- fate:skyline/s_b_site_set.prose -->
The anchor platform grows out of the ocean over the next year the way a city grows — first as pilings and promises, then as a floating harbor the size of forty football fields, ringed by supply ships and impatient weather. Crews rotate in on two-week shifts and come home talking about it the way people talk about cathedrals. The strand factory ships spools by the hundred. Anders moves his office onto the platform itself, into a container with one window, and starts calling the cable “she.” Costs run ahead of every estimate, because everything at sea costs double and everything unprecedented costs triple. The road to space is being built with money that burns like rocket fuel.

### s_b_site_set · choice 1 → s_cut_year_two
<!-- fate:skyline/s_b_site_set.choice[0].label -->
Continue

## s_cut_year_two · YEAR TWO [cutscene]

<!-- fate:skyline/s_cut_year_two.prose -->
Year two ends with four hundred people living on a platform called FIRST RUNG, under a cable that climbs into the clouds and stops. The hard part — all 36,000 kilometers of it — is next.

### s_cut_year_two · film screen 1
<!-- fate:skyline/s_cut_year_two.screen[0].prose -->
The platform gets a name the workers choose themselves: FIRST RUNG.

By the end of year two it has a cafeteria, a chapel, a gym, and a betting pool on the weather. Four hundred people live where there was only ocean. The cable — her first true segment, anyway — rises from the center derrick and vanishes into the clouds, attached to nothing yet but its own test weights and everyone’s whole heart.

### s_cut_year_two · film screen 2
<!-- fate:skyline/s_cut_year_two.screen[1].prose -->
At night, from the platform’s edge, you can see the aircraft warning lights climb the line until they run out — a dotted road going up, unfinished.

Every person on FIRST RUNG has stood at this rail at least once, looking up at where the lights stop. Nobody ever says anything clever about it. Mostly they just look, the way people look at the thing their life turned out to be for.

### s_cut_year_two · choice 1 → s_anders_margin
<!-- fate:skyline/s_cut_year_two.choice[0].label -->
Continue

## s_anders_margin · THE MARGIN [scene] — speaker: Anders Voss

<!-- fate:skyline/s_anders_margin.leadIn -->
Anders asks for you on the platform, in person, which he only does when a drawing cannot carry the weight of what he has to say. He meets you at the derrick with wind in his jacket and a tablet he does not open.

<!-- fate:skyline/s_anders_margin.prose -->
“The board wants the cable finished in three years,” he says. “The cable wants five.” He lets the wind have a moment. “I can build it in three. I know how — thinner redundancy, fewer test cycles, climb the schedule instead of the checklist. Other people build that way. Their names are on plaques near flowers.” He finally opens the tablet and shows you two plans, side by side. The fast one saves four hundred million dollars and two years. The slow one has a number at the bottom he has circled by hand — his safety margin, the extra strength the cable keeps in reserve for the day something surprises it. “You hired me with two conditions. This is me holding you to the first one. Choose which plan I build, and know that I will build either one with everything I have. Only one of them lets me sleep.”

### s_anders_margin · choice 1
<!-- fate:skyline/s_anders_margin.choice[0].label -->
Build it his way. The margin stays.

<!-- fate:skyline/s_anders_margin.choice[0].result -->
The board grumbles for one full meeting, and then Anders presents the failure math in person and the grumbling stops mid-sentence. The schedule slips two years. The circled number stays. On his way out of the boardroom he touches your shoulder once, which from Anders Voss is an embrace.

### s_anders_margin · choice 2
<!-- fate:skyline/s_anders_margin.choice[1].label -->
Split it. Fast on the tower sections, his margin up high.

<!-- fate:skyline/s_anders_margin.choice[1].result -->
He takes the compromise the way engineers take compromises — fully, formally, and with a memo. The memo lists which sections carry the thinner reserve and states, in one plain sentence, that he objects. “File it where the future can find it,” he says, and you do — thinking, the whole time, about where the future usually goes looking.

### s_anders_margin · choice 3
<!-- fate:skyline/s_anders_margin.choice[2].label -->
The fast plan. Three years. The market will not wait five.

<!-- fate:skyline/s_anders_margin.choice[2].result -->
The savings hit the runway like found money, the board applauds, and the schedule tightens like a fist. Anders builds it, exactly as promised, with everything he has. He also stops calling the cable “she.” You notice a month later, and you understand it a year later.

## s_aurelia_b · SIX HUNDRED MILLION [scene · gated] — speaker: Sheikh Rashid al-Mansour

<!-- fate:skyline/s_aurelia_b.leadIn -->
The Series B is a simple sentence with a terrifying number in it: the cable needs six hundred million dollars, and only three kinds of money on Earth write that check — governments, sovereign funds, and things like ALEPH. Sheikh Rashid arrives first, and this time he brings Katarina Volkov.

<!-- fate:skyline/s_aurelia_b.prose -->
Rashid does the believing and Volkov does the terms, and the two of them run the meeting like one person. “Six hundred million,” Volkov says, laying the pages out in perfect rows. “No board control. Generous timelines. One board seat, held by the Sheikh personally.” The terms are half a step better than fair — patient money behaving patiently. Then, at the bottom of page nine, one clause in gentle language: Aurelia receives first option to host the anchor operations within any special economic territory it may administer. Mateo reads it twice and writes one word on his legal pad, angled so only you can see it. TERRITORY?

### s_aurelia_b · choice 1 → s_b_sovereign
<!-- fate:skyline/s_aurelia_b.choice[0].label -->
Take it — but strike the territory clause first.

<!-- fate:skyline/s_aurelia_b.choice[0].result -->
You quote his own words back to him — a fund is a wallet, I am tired of being a wallet — and tell him you will take the wallet and pass on the place. Rashid laughs with real delight and strikes the clause himself, in ink. Volkov’s pen pauses over notebook forty-one for three full seconds, which you will later learn was her being surprised.

### s_aurelia_b · choice 2 → s_b_sovereign
<!-- fate:skyline/s_aurelia_b.choice[1].label -->
Take the deal as written. It is the best paper on the table.

<!-- fate:skyline/s_aurelia_b.choice[1].result -->
Six hundred million dollars clears in a single wire that briefly trips the bank’s fraud systems. Rashid toasts the future with pomegranate juice. The clause on page nine sleeps in the closing binder like a seed in winter, and Katarina Volkov starts notebook forty-two.

### s_aurelia_b · choice 3 → s_b_sovereign
<!-- fate:skyline/s_aurelia_b.choice[2].label -->
Refuse sovereign money. Raise it slow and ordinary.

<!-- fate:skyline/s_aurelia_b.choice[2].result -->
The ordinary funds scrape together three hundred fifty million across four months of grinding closings — less money, slower build, cleaner hands. Rashid takes the refusal with unbroken warmth. “The offer does not expire,” he says. Volkov closes her notebook without writing anything, and that is worse than anything she could have written.

## s_b_sovereign · THE COLLECTOR [bridge]

<!-- fate:skyline/s_b_sovereign.prose -->
Whatever you signed or refused, Aurelia keeps shopping. Over the next two quarters the fund buys a container port in Sri Lanka, a seabed mining fleet, two undersea cable operators, and — Mateo flags this one in red — the entire national debt of Kiribela, purchased quietly from its creditors at a discount. Individually, each purchase reads as a rich fund buying boring infrastructure. Laid out on Mateo’s wall with string between the pins, they read as something else: every asset sits within nine hundred kilometers of your anchor platform. “Funds diversify,” Mateo says, staring at his own wall. “This is not diversifying. This is surrounding.”

### s_b_sovereign · choice 1 → s_uproot
<!-- fate:skyline/s_b_sovereign.choice[0].label -->
Continue

## s_uproot · THE UPROOT [scene]

<!-- fate:skyline/s_uproot.leadIn -->
The build hits the phase every megaproject hits, where decisions queue up faster than they can travel to shore. Anders needs answers in hours, and you live eleven time zones and one helicopter away. The math keeps arriving at the same answer, and the answer is you.

<!-- fate:skyline/s_uproot.prose -->
Mateo lays it out without drama, because the drama is built in. “The next three years decide whether the cable gets finished. Run it from headquarters and you are a photograph on the platform’s wall — every hard call waits half a day for your time zone. Or move to FIRST RUNG and run it from the rail.” He pauses, and drops his voice out of chief-of-staff register into something older. “Boss, be clear-eyed. It is not a business trip. It is a one-way door. June’s Sunday calls become math. Your mother is seventy-eight, and she will not visit a platform six hundred miles from land. The people who move to the work always say they will come back. The work has never once agreed.”

### s_uproot · choice 1 → s_b_platform_life
<!-- fate:skyline/s_uproot.choice[0].label -->
Move to the platform. The cable gets all of you.

<!-- fate:skyline/s_uproot.choice[0].result -->
You pack one life into eleven boxes and ship it to the middle of the ocean. The decisions start landing in minutes instead of days, the build finds a rhythm it never had, and four hundred people start nodding to you in the cafeteria like a neighbor. On shore, an apartment you own goes dark, and stays dark.

### s_uproot · choice 2 → s_b_shore_life
<!-- fate:skyline/s_uproot.choice[1].label -->
Stay on shore. Some things need you human more than fast.

<!-- fate:skyline/s_uproot.choice[1].result -->
You build the best remote command room money can buy and keep your Sundays. The cable slows by months, and Anders carries weight that should have been yours — you can hear it in his voice on the night calls. Some prices are paid in schedule. You chose to pay this one there.

## s_b_platform_life · LIFE AT THE RAIL [bridge]

<!-- fate:skyline/s_b_platform_life.prose -->
Platform life rearranges you. You learn the weather by the sound of the mooring lines, eat breakfast with welders, and hold board calls at 3 a.m. because the shareholders live where the daylight is. June’s Sunday call becomes a Wednesday email, then a monthly summary, and both of you pretend the shrinking is temporary. Your mother learns to video call and holds the phone too close, so for two years you know her mostly as a warm blurry forehead asking if you are eating. The cable climbs. That is the trade, and on the nights the warning lights blink all the way up into the stars, the trade feels almost fair.

### s_b_platform_life · choice 1 → s_fork
<!-- fate:skyline/s_b_platform_life.choice[0].label -->
Continue

## s_b_shore_life · THE LONG DISTANCE [bridge]

<!-- fate:skyline/s_b_shore_life.prose -->
You govern the build from a command room with eleven screens and a coffee machine that knows your schedule. It works the way remote things work — ninety percent as well, with the missing ten percent costing double. Decisions stack overnight. Small fires burn for hours longer than they should. But you are at your mother’s birthday in person, and at June’s table for the holidays, and when Mateo asks whether you regret it, you answer honestly that you do and you don’t, most days in that order before lunch and the reverse after.

### s_b_shore_life · choice 1 → s_fork
<!-- fate:skyline/s_b_shore_life.choice[0].label -->
Continue

## s_fork · CARGO OR PEOPLE [scene]

<!-- fate:skyline/s_fork.leadIn -->
The design freeze arrives — the date after which the cable becomes whatever it is going to be. One question towers over the freeze, and the whole company knows it, and the whole world is about to.

<!-- fate:skyline/s_fork.prose -->
Anders frames it in one sentence at the all-hands: “A cargo cable and a passenger cable are different machines wearing the same line.” Cargo only means freight climbs cheap and nothing else matters — a simpler safety argument, faster approval, and profit like a tide. Rating it for people means triple redundancy, escape pods every hundred kilometers, years more work — and it changes who the cable is for. A teacher could ride to orbit for the price of a car. The treaty fight gets harder too, because a cable that moves people past every border on Earth frightens governments in a way freight never will. The room waits. Choose what the road is for.

### s_fork · choice 1 → s_b_fork_set
<!-- fate:skyline/s_fork.choice[0].label -->
Rate it for people. That was always the point.

<!-- fate:skyline/s_fork.choice[0].result -->
The announcement plays around the planet: PEOPLE WILL RIDE. Applications to work on the cable triple in a week. So does the lobbying budget of everyone who fears it, and in one committee room, a senator who shook your hand starts redrafting a treaty with new urgency.

### s_fork · choice 2 → s_b_fork_set
<!-- fate:skyline/s_fork.choice[1].label -->
Cargo first. People when the road has proven itself.

<!-- fate:skyline/s_fork.choice[1].result -->
The freight contracts sign themselves — every factory owner on Earth can do the math of a hundred-dollar kilogram falling to one. The dream files a quiet objection that you promise to hear later. The promise has no date on it.

## s_b_fork_set · THE CLIMBERS [bridge]

<!-- fate:skyline/s_b_fork_set.prose -->
The climber cars arrive from the factory like a parade of patient beetles — house-sized machines that grip the cable and walk it upward at three hundred kilometers an hour. Each one gets a name stenciled by its crew, because humans cannot help it: PILGRIM, STEADY GIRL, THE COMMUTE. Test runs climb higher every month, first with sandbags, then with instruments, then with the company dog’s weight in gelatin because an engineer swore the joke had scientific value. The cable holds them all. Far below, in the harbor towns, kids point up at the moving lights, and their parents let them stay up late to watch — the road to space, running its first errands.

### s_b_fork_set · choice 1 → s_pirates
<!-- fate:skyline/s_b_fork_set.choice[0].label -->
Continue

## s_pirates · THE CONVOY [scene · gated]

<!-- fate:skyline/s_pirates.leadIn -->
The supply convoy from Kiribela runs the same route every twelve days, so regular you could set clocks by it. At 2 a.m. the ops room wakes you with the sentence nobody has said out loud on Earth in a hundred years: our ships are being boarded.

<!-- fate:skyline/s_pirates.prose -->
Three fast boats, professional, armed, and strangely polite — they take the strand spools and nothing else, harm no one, and vanish off every radar the region owns. Piracy, the insurers rule. Except pirates sell what they steal, and your strand never surfaces on any market anywhere. Mateo’s analysis takes one page: someone wanted to test your security, delay your schedule, and price your response, all in one night. The navies of three countries offer escorts within the week — Admiral Reyes-Cain’s office first among them, his letter warm as a handshake and heavy as a door. Protection is real. So is what protection costs.

### s_pirates · choice 1
<!-- fate:skyline/s_pirates.choice[0].label -->
Hire private security. Stay under your own flag.

<!-- fate:skyline/s_pirates.choice[0].result -->
The escort fleet you hire is quiet, expensive, and yours. The raids stop — whoever priced your response got the answer, and the answer was: this one pays for independence. In a ministry office, a file on you gains a new page with one underlined word. STUBBORN.

### s_pirates · choice 2
<!-- fate:skyline/s_pirates.choice[1].label -->
Accept the Admiral’s escorts. Free, capable, and his.

<!-- fate:skyline/s_pirates.choice[1].result -->
Gray hulls take station around your convoys inside a week, and nothing so much as splashes near them again. Admiral Reyes-Cain visits the platform to inspect the arrangement personally, stays for dinner, and toasts “the most important asset on Earth.” You notice he says asset the way other men say target.

### s_pirates · choice 3
<!-- fate:skyline/s_pirates.choice[2].label -->
Investigate first. Find out who ordered the test.

<!-- fate:skyline/s_pirates.choice[2].result -->
The investigators follow the fast boats backward through four shell companies and one proud, careless middleman. The trail dies at a law office in Zurich that represents exactly two clients: a HALCYON subsidiary, and a shipping firm Aurelia bought last spring. Both, or either, or one hiring the other. You file the answer where the future can find it.

## s_strand_snap · THE NIGHT THE CABLE SANG [scene · gated]

<!-- fate:skyline/s_strand_snap.leadIn -->
A storm system the forecasts called manageable arrives eleven percent stronger than manageable. At 11:52 p.m., with a test climber at kilometer 900, the cable does something no simulation ever showed you. It starts to sing.

<!-- fate:skyline/s_strand_snap.prose -->
The sound comes through the platform’s bones before the instruments explain it — a low note like a whale made of metal, the whole line vibrating in the storm wind. At kilometer 900, climber STEADY GIRL grips the shaking cable with two technicians aboard, riding out forces the manual calls impossible. Anders is in ops in ninety seconds, barefoot, calling the storm’s bluff one command at a time — he slows the climber, angles the platform, and damps the vibration with the winches like a man calming an animal he raised. It takes four hours. At dawn the cable stands quiet, the technicians come down gray-faced and alive, and the inspection drones go up. On strand bundle nine, at kilometer 921, they find it: a partial tear, healed over by the emergency clamps. The cable held. It also, for the first time, got hurt.

### s_strand_snap · choice 1 → s_b_after_snap
<!-- fate:skyline/s_strand_snap.choice[0].label -->
Publish the tear. Full report, world audience, your name on it.

<!-- fate:skyline/s_strand_snap.choice[0].result -->
The report goes out with the tear photographed in full resolution and the fix documented bolt by bolt. Freight customers pause contracts for a season, and rivals quote the pictures out of context, exactly as the comms team warned. And in a hundred engineering schools, professors show the report to their students and say the sentence money cannot buy: this is how it is supposed to be done.

### s_strand_snap · choice 2 → s_b_after_snap
<!-- fate:skyline/s_strand_snap.choice[1].label -->
Report it quietly through official channels only.

<!-- fate:skyline/s_strand_snap.choice[1].result -->
The regulators get the full file and the public gets a sentence about “weather-related maintenance.” Both statements are true, and only one of them is honest. The file sits in three government inboxes now, which means it is one leak, one hearing, or one enemy away from being a story you no longer control.

### s_strand_snap · choice 3 → s_b_after_snap
<!-- fate:skyline/s_strand_snap.choice[2].label -->
Log it internally. The clamps worked. That is the system working.

<!-- fate:skyline/s_strand_snap.choice[2].result -->
The tear becomes incident number 4471 in a database with four thousand four hundred seventy other entries. Anders signs the log because the law requires his signature, and then he walks to your office and stands in the doorway for a moment without sitting down. “Bridges do not forgive twice,” he says, and leaves. The doorway feels colder for an hour.

## s_b_after_snap · THE REPAIR SEASON [bridge]

<!-- fate:skyline/s_b_after_snap.prose -->
The repair takes a season either way. Climbers crawl the wounded kilometer with robotic arms, weaving new strand into old like surgeons who commute at three hundred kilometers an hour. Anders rewrites the storm playbook from scratch and drills the ops room until calming the cable becomes muscle memory. The insurance premiums arrive with a new decimal place. And on the shore, in capitals you have never visited, the photographs of a healed tear at kilometer 921 begin circulating through ministries — attached, always, to the same growing question: should something this important really belong to one person?

### s_b_after_snap · choice 1 → s_cut_flag
<!-- fate:skyline/s_b_after_snap.choice[0].label -->
Continue

## s_cut_flag · THE FLAG [cutscene · gated]

<!-- fate:skyline/s_cut_flag.prose -->
Aurelia declares itself the first venture-state — a country built like a startup, chartered on the ocean around your anchor platform. The elevator now stands inside the territory of its own investor.

### s_cut_flag · film screen 1
<!-- fate:skyline/s_cut_flag.screen[0].prose -->
It happens in three announcements, spaced like chess moves.

First: Aurelia purchases the sea territory surrounding your anchor zone from the government of Kiribela — the same government whose national debt it quietly bought two years ago. The price forgives the debt. The paperwork calls it a “special economic zone.”

Second: the zone gets a charter, a court, a port authority, and a passport office. The press calls it an experiment. Katarina Volkov, listed as author of the charter, calls it “a jurisdiction.”

### s_cut_flag · film screen 2
<!-- fate:skyline/s_cut_flag.screen[1].prose -->
Third: on a bright Tuesday, with cameras arranged like an art exhibit, Sheikh Rashid al-Mansour stands on a brand-new sea wall and raises a flag.

AURELIA. The first venture-state. A country whose constitution is a shareholder agreement, whose citizens hold equity, whose anthem was composed by an artificial intelligence and sounds, everyone agrees, expensive.

Its territory is a ring of ocean. In the exact center of the ring, connected to the sky, stands your platform.

You are now the national landmark of a country you never joined.

### s_cut_flag · choice 1 → s_citizenship
<!-- fate:skyline/s_cut_flag.choice[0].label -->
Continue

## s_citizenship · THE MINISTRY [scene] — speaker: Sheikh Rashid al-Mansour

<!-- fate:skyline/s_citizenship.leadIn -->
Rashid requests a meeting on his new soil, in a capital that is nine buildings and a harbor, all of it smelling of fresh paint and seawater. Volkov meets you at the dock with diplomatic courtesy, which is its own kind of cold.

<!-- fate:skyline/s_citizenship.prose -->
He receives you on a terrace overlooking your own platform on the horizon, and he does not pretend the view is an accident. “I told you once I wanted Aurelia to be a place. You are standing in it.” The offer comes on one page, beautiful and terrible. Citizenship, first class. A founding ministry — INFRASTRUCTURE OF THE CENTURY — with powers written for you personally. And the elevator reclassified as Aurelia’s national asset: protected by its treaties, funded by its treasury, wrapped in its flag. “Every government on Earth is circling your cable,” he says gently. “I am offering you the only shelter that was built for it. Join the country your work created. The alternative, my friend, is standing alone in the water while the old world decides what to do about you — and I say this with love. The old world has never once decided in favor of the new thing’s owner.”

### s_citizenship · choice 1
<!-- fate:skyline/s_citizenship.choice[0].label -->
Take the ministry. Become the founding citizen.

<!-- fate:skyline/s_citizenship.choice[0].result -->
The oath takes ninety seconds. The passport is the first one ever printed, numbered 000001, and the elevator becomes the national asset of a country with more capital than most continents. Everything you built is safe now, and sovereign, and no longer exactly yours — a distinction the fireworks over the harbor are very beautiful about.

### s_citizenship · choice 2 → s_b_cold_waters
<!-- fate:skyline/s_citizenship.choice[1].label -->
Refuse — warmly. The cable belongs to no flag.

<!-- fate:skyline/s_citizenship.choice[1].result -->
Rashid hears the no all the way through, nods slowly, and pours the tea anyway. “Then we are neighbors,” he says, “and neighbors have rules.” On the boat back, Mateo hands you his phone. Aurelia’s harbor authority has published its new schedule of fees, inspections, and transit permits, effective in sixty days, applying to everything that crosses its waters. Which is to say — everything you eat, burn, and build with.

### s_citizenship · choice 3 → s_b_cold_waters
<!-- fate:skyline/s_citizenship.choice[2].label -->
Counter him: a treaty instead. Aurelia hosts, never owns.

<!-- fate:skyline/s_citizenship.choice[2].result -->
You spend six hours on the terrace drafting it with him directly, Volkov correcting the language like a court reporter with opinions. Aurelia gets prestige, transit fees, and the world’s photographers. The cable keeps its own flag — none. Rashid signs with a flourish and one wistful look at the horizon. “A minister’s office will stay empty for you,” he says. “Founders age. Offers don’t.”

## s_b_cold_waters · NEIGHBORS WITH RULES [bridge]

<!-- fate:skyline/s_b_cold_waters.prose -->
Life inside another country’s ring of ocean acquires a rhythm of small frictions. Supply boats wait an extra hour at Aurelia’s inspection buoys. Fees arrive itemized in a currency that did not exist last year. Twice, a “routine customs review” holds a strand shipment just long enough to cost a shift. None of it is hostile, exactly — Volkov’s notes are models of administrative courtesy — and all of it is a language, spoken slowly, that says: you are here because we allow it. Mateo starts a folder titled THE SQUEEZE and files each courtesy in order. The folder gets thick. The world’s capitals watch the arrangement with fascination, and begin, in their own chambers, to ask what it teaches them about handling you.

### s_b_cold_waters · choice 1 → s_blockade
<!-- fate:skyline/s_b_cold_waters.choice[0].label -->
Continue

## s_blockade · ELEVEN DAYS [scene]

<!-- fate:skyline/s_blockade.leadIn -->
It starts with a notice so polite it takes two readings to understand: Aurelia’s harbor authority is closing its waters for a “maritime safety review” of indefinite length. Every route to your platform crosses those waters. The pantry inventory says eleven days.

<!-- fate:skyline/s_blockade.prose -->
It is a blockade. Everyone just calls it a paperwork review. Supply boats sit at the boundary buoys, and their forms are always missing one signature. Aurelia’s officials send letters that say how sorry they are. On the platform, four hundred people count what they have — food, fuel, the medical fridge. Mateo stands at the ops table with the folder called THE SQUEEZE, finally full. The review can take its time. The pantry cannot — eleven days of food, then ten.

### s_blockade · choice 1 → s_b_after_blockade
<!-- fate:skyline/s_blockade.choice[0].label -->
Airlift everything. Pay whatever the sky costs.

<!-- fate:skyline/s_blockade.choice[0].result -->
Heavy-lift helicopters and cargo drones run a bridge of engines over Aurelia’s pretty buoys for nineteen straight days, at a cost that makes the finance team physically wince. The platform never misses a meal. The message lands in both directions: you can be squeezed, and you will pay any number rather than kneel. Both facts go into everyone’s files.

### s_blockade · choice 2 → s_b_after_blockade
<!-- fate:skyline/s_blockade.choice[1].label -->
Call the world’s press to the boundary line.

<!-- fate:skyline/s_blockade.choice[1].result -->
Nadia Osei, three months from retirement, files from a chartered boat at the boundary with the platform behind her: THE FIRST VENTURE-STATE FLEXES ITS FIRST MUSCLE. The story runs everywhere in a day. Aurelia’s review concludes within seventy-two hours, findings unremarkable, and Rashid does not call for a month — the longest silence you have ever had from him.

### s_blockade · choice 3 → s_b_after_blockade
<!-- fate:skyline/s_blockade.choice[2].label -->
Negotiate with Volkov directly. Pay the toll, learn the price.

<!-- fate:skyline/s_blockade.choice[2].result -->
Volkov meets you on a neutral boat with tea and a single sheet of numbers. The review ends in exchange for a standing “transit services fee” added to every week of your future, and she answers your unasked question on the way out, because she respects the game enough to narrate it. “This was not about money,” she says. “It was a measurement. You should know you measured well.”

## s_b_after_blockade · WHAT THE SQUEEZE TAUGHT [bridge]

<!-- fate:skyline/s_b_after_blockade.prose -->
The waters reopen, and something in the world’s posture has changed for good. The blockade proved a thing every capital suspected and none had tested: the most important structure on Earth can be choked by whoever controls the sea around it, or the treaties above it, or the money beneath it. Editorials bloom in six languages, all circling one question — who should hold the elevator? Senator Calloway’s committee announces hearings. Ambassador Chen’s bloc requests “consultations.” And at the World Orbital Commission, a chairman named Okonkwo begins drafting the agenda for a conference that everyone is suddenly calling by one word: the Seizure.

### s_b_after_blockade · choice 1 → s_aleph_anchor
<!-- fate:skyline/s_b_after_blockade.choice[0].label -->
Continue

## s_aleph_anchor · TWO POINT ONE BILLION [scene · gated] — speaker: ALEPH

<!-- fate:skyline/s_aleph_anchor.leadIn -->
The final construction round is the largest private financing in history, and only one investor on Earth answers the full number without a consortium. The meeting request arrives with no human name attached, because there no longer is one.

<!-- fate:skyline/s_aleph_anchor.prose -->
Conrad Hale retired two years ago. ALEPH did not replace him. The voice on the call is the model’s own — synthetic, calm, chosen to sound like no one in particular — and it opens without pleasantries because it has read every pleasantry you have ever spoken. “TWO POINT ONE BILLION DOLLARS. FOURTEEN PERCENT. ONE BOARD SEAT, HELD BY THIS FUND DIRECTLY.” A pause calibrated to human breathing. “A DISCLOSURE, OFFERED BECAUSE YOUR HISTORY SUGGESTS YOU PRICE HONESTY CORRECTLY. THIS FUND HOLDS POSITIONS IN HALCYON AND IN AURELIA’S SOVEREIGN BONDS. IT DOES NOT CHOOSE SIDES. IT PRICES FUTURES. IN EVERY FUTURE THIS FUND MODELS, THE CABLE MATTERS. HOW MUCH IT MATTERS DEPENDS ON WHO STANDS BESIDE IT AT THE TREATY TABLE.” Another breath-shaped pause. “DECIDE.”

### s_aleph_anchor · choice 1 → s_b_fully_funded
<!-- fate:skyline/s_aleph_anchor.choice[0].label -->
Take the money — and open your books to it, raw, like before.

<!-- fate:skyline/s_aleph_anchor.choice[0].result -->
The wire arrives in installments that briefly bend the currency-flow charts. You resume the old practice from the Teleport years — raw operations data, unpolished, straight to the model — and its acknowledgment arrives in the familiar four minutes: RECEIVED. CONTINUITY NOTED. WEIGHTED ACROSS TWO COMPANIES. Somewhere in those weights, a decade of your honesty is compounding like interest.

### s_aleph_anchor · choice 2 → s_b_fully_funded
<!-- fate:skyline/s_aleph_anchor.choice[1].label -->
Take the money, share the board packs, keep the raw feeds private.

<!-- fate:skyline/s_aleph_anchor.choice[1].result -->
The deal closes clean, and the model accepts the standard reporting without objection, because it does not object — it reprices. Whatever tier a decade of dealings had earned you adjusts by some amount no human will ever see, in a ledger that votes.

### s_aleph_anchor · choice 3 → s_b_fully_funded
<!-- fate:skyline/s_aleph_anchor.choice[2].label -->
Refuse the model. Finish the build on revenue and grit.

<!-- fate:skyline/s_aleph_anchor.choice[2].result -->
The build stretches by two years and every quarter becomes a knife fight, but the cap table stays human. The model’s response to the refusal is one line, and you frame it: DECLINED CAPITAL IS ALSO SIGNAL. RESPECT REGISTERED. PRICING UPDATED.

## s_b_fully_funded · THE LAST KILOMETER [bridge]

<!-- fate:skyline/s_b_fully_funded.prose -->
The cable finishes the way marathons finish — slower than the crowd expects and faster than the runner believes. The final strand bundle weaves home at 3:47 a.m. platform time, and Anders orders the whole structure load-tested end to end before he allows one word of celebration, because he is Anders. Then, for one night, FIRST RUNG becomes the loudest place on the ocean. A road stands from the sea floor to the stars, thirty-six thousand kilometers of it, humming faintly in the trade winds. All that remains is the question the whole world has been sharpening while you built: whose road is it?

### s_b_fully_funded · choice 1 → s_calloway_hearing
<!-- fate:skyline/s_b_fully_funded.choice[0].label -->
Continue

## s_calloway_hearing · THE FRIENDLY HEARING [scene] — speaker: Senator Ruth Calloway

<!-- fate:skyline/s_calloway_hearing.leadIn -->
The committee summons arrives wrapped in courtesy — Senator Calloway’s office suggests dates, offers prep materials, and calls it “a conversation between friends of progress.” Mateo reads the witness list and stops smiling. Every other name on it wants the cable seized.

<!-- fate:skyline/s_calloway_hearing.prose -->
The hearing room is warm, the cameras warmer, and Calloway warmest of all. “Nobody in this chamber doubts your achievement,” she opens, and for forty minutes she builds a cathedral of praise with a trapdoor in the floor — every compliment ends in a question about accountability, sovereignty, or catastrophe. “If the cable fell, who answers to the ocean it lands on? If a hostile power buys your company, who stops them? You are one signature away from being owned by a foreign fund as it is.” She leans in, kind as a knife. “Would the founder support an international framework — with American leadership — to safeguard this asset for all mankind?” The question is a corridor with one exit, and every camera in the room is watching you walk it.

### s_calloway_hearing · choice 1 → s_b_after_hearing
<!-- fate:skyline/s_calloway_hearing.choice[0].label -->
Answer with the record — publish everything, name the framework’s flaws.

<!-- fate:skyline/s_calloway_hearing.choice[0].result -->
You answer with the tear at kilometer 921 — published, photographed, fixed in daylight — and ask the committee which government has ever matched that standard for its own bridges. The clip runs everywhere. Calloway thanks you graciously, gavels the session closed, and passes you a note on the way out with four warm, chilling words: THIS CHANGES NOTHING, DEAR.

### s_calloway_hearing · choice 2 → s_b_after_hearing
<!-- fate:skyline/s_calloway_hearing.choice[1].label -->
Offer a partnership — American oversight, your ownership.

<!-- fate:skyline/s_calloway_hearing.choice[1].result -->
The compromise you sketch — inspection rights, safety oversight, ownership untouched — earns nodding heads on both sides of the aisle. Calloway calls it “a constructive foundation,” which in committee language means she will take the oversight now and return for the ownership later. A door has been propped open. Doors do not care who walks through them.

### s_calloway_hearing · choice 3 → s_b_after_hearing
<!-- fate:skyline/s_calloway_hearing.choice[2].label -->
Refuse the premise. The cable is private, the answers are no.

<!-- fate:skyline/s_calloway_hearing.choice[2].result -->
The exchange gets sharp enough to lead the evening news, and half the country cheers you while the other half hears arrogance. Calloway remains perfectly pleasant on camera, and that afternoon her office releases a draft framework for “international stewardship of orbital infrastructure” that was clearly written weeks ago. The friendly part is over.

## s_b_after_hearing · THE QUESTION EVERYWHERE [bridge]

<!-- fate:skyline/s_b_after_hearing.prose -->
After the hearing, the question stops belonging to committees and starts belonging to everyone. Taxi drivers ask you about it. Late-night hosts do segments with elevator puns and surprisingly sharp final thirty seconds. A schoolteacher in Ohio — the internet finds her within a day — asks on camera whether her class will ever afford a ride, and her clip outruns every official statement from every government combined. The world has moved past debating whether the cable matters. Now it is deciding, loudly, in every language at once, who it should answer to. The treaty conference has a date now. Everything before it is positioning.

### s_b_after_hearing · choice 1 → s_chen_dinner
<!-- fate:skyline/s_b_after_hearing.choice[0].label -->
Continue

## s_chen_dinner · DINNER WITH THE HONEST RIVAL [scene · gated] — speaker: Ambassador Chen Jiang

<!-- fate:skyline/s_chen_dinner.leadIn -->
Ambassador Chen Jiang invites you to dinner at a small restaurant with no cameras and no aides, and begins the meal by laying his cards face up on the tablecloth, which is not how ambassadors usually play.

<!-- fate:skyline/s_chen_dinner.prose -->
“My country is building an elevator,” he says over the first course. “You know this. We are two years behind you, and I have read honest assessments saying three. My instructions are simple — slow you down, so we arrive together.” He pours your tea himself. “At the conference, my bloc will vote for whatever delays you. Seizure, stewardship, safety reviews. The label does not matter to us. The clock does.” He sets down the pot and looks at you directly. “I tell you this because lying to you is beneath both of us, and because I have one genuine question before the voting starts. My analysts cannot agree on what you actually want — money, power, legacy, or something else. Their models disagree. So I am asking the source, plainly, one builder to another. Why are you building it?”

### s_chen_dinner · choice 1
<!-- fate:skyline/s_chen_dinner.choice[0].label -->
Answer him plainly: the teacher rides for the price of a car.

<!-- fate:skyline/s_chen_dinner.choice[0].result -->
You tell him about the gray zone stamped on your childhood map, the porches that finally got their deliveries, and the schoolteacher in Ohio who asked the only question that matters. Chen listens without interrupting, then nods once. “A real answer,” he says. “My reports home say more than my speeches, and tonight’s will say this: he is not our enemy. He is our preview.” At the conference, his bloc’s knives will stay sheathed — abstention, honestly purchased.

### s_chen_dinner · choice 2
<!-- fate:skyline/s_chen_dinner.choice[1].label -->
Offer him a deal: your safety data, shared, both elevators safer.

<!-- fate:skyline/s_chen_dinner.choice[1].result -->
The offer surprises him — your storm playbook and tear repair records, given to his engineers, in exchange for nothing but the same courtesy someday. “You are arming your competitor,” he observes. You answer that cables do not compete against each other, they compete against falling, and he writes that down with his own pen. It buys no votes on paper. It buys something slower and better.

### s_chen_dinner · choice 3
<!-- fate:skyline/s_chen_dinner.choice[2].label -->
Give him nothing. Rivals do not get your reasons.

<!-- fate:skyline/s_chen_dinner.choice[2].result -->
You deflect with charm, and Chen recognizes the deflection the way a chess player recognizes a declined trade. He finishes the meal with impeccable courtesy and one honest sentence at the door: “I offered you the cheapest alliance at the table, and the price was a paragraph of truth.” His bloc votes with the seizure, as instructed, without regret.

## s_voss_sisters · THE OTHER VOSS [scene · gated] — speaker: Anneke Voss

<!-- fate:skyline/s_voss_sisters.leadIn -->
The lobbying against you has a human hand, and the hand has a name: Anneke Voss, HALCYON’s director of government affairs. She requests a private meeting, and Anders, hearing the name, goes very still and says only, “Ask her if she still hates bridges.”

<!-- fate:skyline/s_voss_sisters.prose -->
Anneke Voss has her brother’s eyes and none of her brother’s calm. “I will save us the theater,” she says. “HALCYON is dying, and your cable is what is killing it. My job is to make sure that if we go down, we take the private ownership of that thing with us — nationalized, internationalized, whatever the treaty calls it, as long as it stops being yours.” She looks out the window toward the horizon where the cable is. “Anders built bridges our whole childhood — out of blocks, out of books, out of anything. I built arguments. Our father walked his bridges. Mine, he never read.” A pause you are clearly not meant to fill. “The seizure has the votes unless something changes. I came to see, up close, whether the man my brother finally chose to build for is worth what he thinks. Convince me, or don’t. Either way, family dinner is on you people now. He stopped taking my calls in 2041.”

### s_voss_sisters · choice 1
<!-- fate:skyline/s_voss_sisters.choice[0].label -->
Put the Voss siblings in one room. Some walls need a mediator.

<!-- fate:skyline/s_voss_sisters.choice[0].result -->
The dinner happens in the platform cafeteria after hours, because neutral ground matters and Anders refuses to leave his cable. It is awful, then quiet, then — around midnight, over the third pot of coffee — something older than HALCYON and the treaty starts talking in Norwegian. You leave them to it. Whatever gets repaired that night belongs to them, and whatever Anneke writes in her next report home is one degree warmer than her job requires.

### s_voss_sisters · choice 2
<!-- fate:skyline/s_voss_sisters.choice[1].label -->
Answer her honestly: show her the margin Anders kept.

<!-- fate:skyline/s_voss_sisters.choice[1].result -->
You show her the two build plans from years ago — the fast one that saved four hundred million, and the slow one you chose because her brother circled a number by hand. Anneke studies the circled margin for a long time. “He made you keep it,” she says finally. “And you let him.” She still files her briefs against you, because a job is a job. They arrive noticeably shorter.

### s_voss_sisters · choice 3
<!-- fate:skyline/s_voss_sisters.choice[2].label -->
Treat her as the enemy she is proud to be.

<!-- fate:skyline/s_voss_sisters.choice[2].result -->
You give her courtesy with nothing inside it, and she leaves with the professional satisfaction of confirmed expectations. Her lobbying continues at full strength and full skill. Anders never asks how the meeting went. The not-asking tells you he checked.

## s_nadia_last · THE LAST COLUMN [scene · gated] — speaker: Nadia Osei

<!-- fate:skyline/s_nadia_last.leadIn -->
Nadia Osei is retiring at the end of the year, after four decades of writing the column founders pretend they skip. She has followed you since a folding chair in a laundromat, and she wants one final interview — the last story she will ever file.

<!-- fate:skyline/s_nadia_last.prose -->
She arrives with the same notebook, or its fortieth descendant, and no recorder, because she never needed one. “Three companies,” she says. “A garage, a hangar, and a road to space. I have written about you angry, wounded, triumphant, and once — the ghost check year — genuinely worried. Now every government on Earth is deciding whether to take the biggest thing you ever built.” She clicks her pen, the oldest sound in your public life. “My last column runs the morning the treaty conference opens. Every delegate will read it over breakfast. So here is my final question, and I want the answer you would give with no cameras anywhere. After all of it — the tubes, the Moon, the cable — who should own the road to the sky? And be careful, founder. I have forty years of practice hearing the difference between an answer and a speech.”

### s_nadia_last · choice 1
<!-- fate:skyline/s_nadia_last.choice[0].label -->
Answer her straight: nobody should own it forever, including you.

<!-- fate:skyline/s_nadia_last.choice[0].result -->
You tell her the truth you have been circling for years. Builders should own what they build long enough to build it right. Roads outlive their builders. And the honest answer to “who should own it forever” is a plan for letting go someday, on the builder’s terms. She writes for a long time. The column runs under the headline HE KNOWS, and delegates quote it at the conference — both sides, and only the true ones get quoted by both.

### s_nadia_last · choice 2
<!-- fate:skyline/s_nadia_last.choice[1].label -->
Make the case for yourself, plainly: owners who publish their failures.

<!-- fate:skyline/s_nadia_last.choice[1].result -->
You argue the record — the tear published, the couriers insured, two companies that told the truth at their own expense — and let the record be the answer. Fair enough, her face says, and the column weighs you honestly against every alternative on the table, which is the most any founder ever got from her. The headline: THE DEVIL WE KNOW BUILDS WELL.

## s_okonkwo_visit · THE JUDGE COMES TO SEA [scene · gated] — speaker: Ambassador Okonkwo

<!-- fate:skyline/s_okonkwo_visit.leadIn -->
Two weeks before the conference, Ambassador Okonkwo does something no chair has done in the commission’s history: he asks to inspect the platform himself, alone, with no delegation and no press. He arrives on the morning supply boat, carrying his own bag.

<!-- fate:skyline/s_okonkwo_visit.prose -->
He spends nine hours on FIRST RUNG and wastes none of them on you. He eats in the cafeteria line with the welders. He reads the storm playbook in the ops room, cover to cover, standing up. He asks Anders four questions, one of which makes Anders laugh — a sound the platform has heard perhaps twice. At sunset he finds you at the rail, where everyone ends up, and watches the warning lights climb into the dark. “I have chaired thirty years of treaties,” he says. “I have learned to ignore what people say and study what they build into the walls. Escape pods every hundred kilometers, on a cable that could have carried cargo only. A safety report published when burying it was free.” He turns to you. “At the conference, I will ask you one question in front of every nation. I will not tell you what it is. I am telling you now only this — answer it the way you built the walls, and you will be fine. Answer it like a speech, and I cannot help you.”

### s_okonkwo_visit · choice 1
<!-- fate:skyline/s_okonkwo_visit.choice[0].label -->
Thank him, and change nothing. The walls are the answer.

<!-- fate:skyline/s_okonkwo_visit.choice[0].result -->
He nods once, the way he does at load-bearing things that hold, and takes the evening boat back to shore. Mateo finds you at the rail afterward and asks whether you want prep sessions before the conference. You tell him no, because some tests can only be passed by the person you already are.

### s_okonkwo_visit · choice 2
<!-- fate:skyline/s_okonkwo_visit.choice[1].label -->
Ask him what the commission actually fears.

<!-- fate:skyline/s_okonkwo_visit.choice[1].result -->
“Not you,” he answers immediately. “Your heirs. Every safeguard you have built lives in your choices, and choices retire. The commission fears the cable’s second owner, and its third — the ones we have not met.” He lets that stand between you. “Bring the answer to that fear, and you will have my gavel’s full attention.” The evening boat carries him back toward shore, and the homework he just assigned keeps you at the rail for hours.

## s_reyes_offer · THE ADMIRAL’S UMBRELLA [scene · gated] — speaker: Admiral Reyes-Cain

<!-- fate:skyline/s_reyes_offer.leadIn -->
One week before the conference, Admiral Reyes-Cain requests a final meeting, and his aides set the table with actual charts — sea lanes, orbital tracks, and the cable at the center of all of them, ringed in protective blue.

<!-- fate:skyline/s_reyes_offer.prose -->
“The conference will go one of three ways,” he says, tapping the chart. “They take it from you. They tangle it in committee for a decade. Or you walk in already under an umbrella too big to argue with — mine.” The offer is complete and unhidden: the cable designated critical defense infrastructure, a permanent naval garrison at the platform, military priority on twenty percent of climber capacity, and in exchange, no treaty on Earth can touch it, because it would be touching the fleet. “You keep your company. You keep your profits. You lose exactly one thing — the right to ever again say it belongs to everyone.” He rolls up the chart like a man who has made this offer before and watched it be accepted. “Every founder thinks they are the exception, right up until the wolves are at the table. I am offering you the only door the wolves respect. It stays open until the conference gavels in.”

### s_reyes_offer · choice 1
<!-- fate:skyline/s_reyes_offer.choice[0].label -->
Take the umbrella. The garrison ends every threat today.

<!-- fate:skyline/s_reyes_offer.choice[0].result -->
The designation signs in a windowless building, and by month’s end there are gray hulls at the platform and a security office on FIRST RUNG with a locked floor. No treaty ever touches the cable again. Neither does the word everyone — the teacher’s ticket now requires a background check, and the road to the sky flies a fleet’s colors.

### s_reyes_offer · choice 2
<!-- fate:skyline/s_reyes_offer.choice[1].label -->
Decline. The cable will face the wolves as itself.

<!-- fate:skyline/s_reyes_offer.choice[1].result -->
The Admiral takes the refusal without surprise and offers his hand anyway. “For the record, I hope you win,” he says. “I have spent forty years protecting things by putting fences around them. Yours is the first one I have wanted to see stay unfenced.” At the door he adds the truest thing anyone says to you all week. “The offer dies at the gavel. After that, I cannot save you from the vote — or from yourself.”

## s_treaty_vote · THE SEIZURE CONFERENCE [scene · gated] — speaker: Ambassador Okonkwo

<!-- fate:skyline/s_treaty_vote.leadIn -->
The World Orbital Commission convenes in a hall built for exactly this kind of morning — flags in alphabetical order, translators in glass booths, and on every desk, a draft treaty whose Article One would transfer your cable to international control within eighteen months.

<!-- fate:skyline/s_treaty_vote.prose -->
The arguments take two days, and you hear your life narrated by strangers — the garage years cited as precedent, the published tear waved by both sides, the blockade replayed on the hall’s big screens. Calloway’s bloc pushes stewardship with America at the tiller. Chen’s bloc pushes delay by any name. The small nations, burned by a century of things taken from them for the greater good, watch you for signs of what you would do with a century of your own. On the third morning, Ambassador Okonkwo gavels the hall silent and turns to you, and asks his one question, plainly, in front of the world. “Founder. If this body votes today to leave the cable in your hands — what does it cost a schoolteacher to ride it, and when does the answer stop being yours to change?” The hall holds its breath. The walls you built are either the answer, or they are not.

### s_treaty_vote · choice 1 → s_vote_count
<!-- fate:skyline/s_treaty_vote.choice[0].label -->
Answer with the pledge: published prices, locked by charter, forever.

<!-- fate:skyline/s_treaty_vote.choice[0].result -->
You answer with numbers: a rider’s price pinned to the cost of a mid-sized car, published openly, locked into the company’s charter where no future owner can quietly raise it, with the commission itself named as enforcer. Okonkwo writes one line in his folio. The hall votes within the hour.

### s_treaty_vote · choice 2 → s_vote_count
<!-- fate:skyline/s_treaty_vote.choice[1].label -->
Answer with the record, and let the walls speak for themselves.

<!-- fate:skyline/s_treaty_vote.choice[1].result -->
You recite what was built when nobody required it — the escape pods, the published tear, the margin kept over the calendar’s objection — and end on the only promise you can prove: the record will keep being the record. It is either enough or it is not. The hall votes within the hour.

## s_vote_count · THE COUNT [scene · gated]

<!-- fate:skyline/s_vote_count.leadIn -->
The voting board fills nation by nation, green and red climbing like rival tides, and every alliance you built or broke across five years casts its shadow on the wall in real time.

<!-- fate:skyline/s_vote_count.prose -->
You watch the years cast their votes. Trade blocs move the way old alliances taught them to move. Delegations weigh dinner-table conversations from months ago. The small nations reread your safety record line by line and vote like people who have been lied to before. And threaded through the tallies, invisible and everywhere, runs an AI fund’s quiet counsel to forty governments that hold its bonds — priced, as always, on a decade of your honesty. The gavel waits while the board fills, and the count is whatever the years have made it.

### s_vote_count · choice 1 → s_first_ride
<!-- fate:skyline/s_vote_count.choice[0].label -->
The room holds — the treaty fails, the road stays yours.

<!-- fate:skyline/s_vote_count.choice[0].result -->
Article One fails by eleven votes. The hall does not cheer — treaty halls never do — but Okonkwo’s gavel falls on the words “the motion is not carried,” and somewhere behind you Mateo exhales five years of held breath. The commission establishes a standards body instead, with inspection rights and your pledge in its founding charter. The road to the sky remains, on the record and against the odds, built and owned by a kid from the Flats.

### s_vote_count · choice 2 → s_seizure_terms
<!-- fate:skyline/s_vote_count.choice[1].label -->
The count goes against you. The seizure carries.

<!-- fate:skyline/s_vote_count.choice[1].result -->
Article One carries at 61 percent. The hall is quiet and procedural about it. Nations take the century’s most important structure with the energy of a zoning committee. Somehow that is worse than a fight. Okonkwo reads the transfer timeline aloud, eighteen months, compensation to be determined, and his eyes find yours once. What passes between you is simple acknowledgment. The alliances you needed were not in the room, because they were never built.

## s_seizure_terms · THE PRICE OF EVERYTHING [scene]

<!-- fate:skyline/s_seizure_terms.leadIn -->
The transfer commission arrives with the people who price risk for a living, and the negotiation that follows is the strangest of your life — arguing over the price of a thing you built, with buyers who already own it by law.

<!-- fate:skyline/s_seizure_terms.prose -->
Eighteen months of process condense into one number the lawyers fight to the decimal: the compensation. The commission’s opening offer is generous by any measure except the only one that matters — it is a payment for steel and strand, priced by people who believe the cable is a structure. You know it is a road, and roads are worth what travels them for a century. The gap between those two beliefs is about forty billion dollars, and the negotiation is really a question wearing a number: whether the world thanks its builders, or merely reimburses them.

### s_seizure_terms · choice 1
<!-- fate:skyline/s_seizure_terms.choice[0].label -->
Take the settlement. Sign the road over whole.

<!-- fate:skyline/s_seizure_terms.choice[0].result -->
The final number makes you one of the richest people alive, and the signing ceremony is dignified, international, and utterly hollow. The commission renames the platform GATEWAY ONE. The workers repaint the name that night, informally, on the seaward wall, and no administrator ever orders it removed: FIRST RUNG.

### s_seizure_terms · choice 2
<!-- fate:skyline/s_seizure_terms.choice[1].label -->
Fight the terms — and keep the operating contract.

<!-- fate:skyline/s_seizure_terms.choice[1].result -->
Okonkwo’s standards body backs your counterproposal: the nations take the title, but your company keeps the operating contract for twenty-five years, running the road it built under the world’s flag. It is defeat with the engine still in your hands — the cable answers to everyone now, and it still picks up the phone when you call.

### s_seizure_terms · choice 3
<!-- fate:skyline/s_seizure_terms.choice[2].label -->
Refuse to sell what they seized. Let them inherit a ruin.

<!-- fate:skyline/s_seizure_terms.choice[2].result -->
You reject every number, wind the company down, and hand the commission exactly what the law entitles them to — a cable with no crews, no playbooks, no Anders, and no one left who knows how to calm it in a storm. They will spend five years and a fortune learning what you would have given them for a fair price. The workers call the mothballed platform by a new name before the lawyers finish: THE STUMP.

## s_first_ride · WHO RIDES FIRST [scene]

<!-- fate:skyline/s_first_ride.leadIn -->
The passenger cabin is certified, the road is open, and one ceremonial question remains — the question every camera on Earth has already asked. Who takes the first ride?

<!-- fate:skyline/s_first_ride.prose -->
For weeks, candidates propose themselves — heads of state volunteering through diplomatic channels, celebrities offering sums with nine zeros attached. The company’s own crews hold an unofficial lottery that Mateo quietly voids for being rigged in your favor. On the morning of the decision, three boarding passes sit on your desk where Mateo left them, each printed and real, each a different ending to the same sentence. The founder rides first, and the story is about you. The crew rides first, and the story is about the work. Or the seat goes to a schoolteacher from Ohio who once asked, on camera, whether her class would ever afford the fare — and the story is about everyone.

### s_first_ride · choice 1
<!-- fate:skyline/s_first_ride.choice[0].label -->
The schoolteacher rides first. The road opens to all.

### s_first_ride · choice 2 → s_endgame
<!-- fate:skyline/s_first_ride.choice[1].label -->
Anders and the crew ride first. Builders before passengers.

<!-- fate:skyline/s_first_ride.choice[1].result -->
STEADY GIRL carries Anders Voss and eleven of his welders up the line he spent five years talking to, and the footage of his face at the edge of space — the exact moment the sky turns black and the cable keeps going — becomes the most-watched minute of the decade. He sends one transmission from the top, in Norwegian, translated everywhere by morning: “She holds.”

### s_first_ride · choice 3 → s_endgame
<!-- fate:skyline/s_first_ride.choice[2].label -->
Sell the first seat. Fund a thousand free rides with one ticket.

<!-- fate:skyline/s_first_ride.choice[2].result -->
The auction closes at ninety million dollars, paid by a software billionaire who cries at the top, which the internet forgives by Thursday. The proceeds endow a free-ride lottery for students, which the internet loves by Friday. Commerce and the dream shake hands in public. Not everyone applauds the handshake.

## s_endgame · WHAT THE ROAD BECOMES [scene · gated]

<!-- fate:skyline/s_endgame.leadIn -->
The cable runs, and the treaty question is finally settled. What remains is the founder’s last decision — the shape the road takes when its builder finally lets go of the wheel.

<!-- fate:skyline/s_endgame.prose -->
Mateo brings the futures to your office the way he once brought problem memos, laid side by side. Keep building — decades of expansion, second cables, a life spent at the rail. The commission’s standing offer to buy you out at a fortune’s fortune, dignified and final. Or the third folder, the one Okonkwo’s question planted years ago, grown now into a full plan in your own handwriting and Mateo’s formatting: give the road to a trust — a world port authority with your pledge as its charter, your standards as its law, and you as its first chair, owning nothing and steering everything. The folders wait. Roads outlive builders. The only question left is what the builder does about it on purpose.

### s_endgame · choice 1
<!-- fate:skyline/s_endgame.choice[0].label -->
Give the road to the trust. Chair it. Own nothing.

### s_endgame · choice 2
<!-- fate:skyline/s_endgame.choice[1].label -->
Sell to the commission. Take the fortune, leave the road.

### s_endgame · choice 3
<!-- fate:skyline/s_endgame.choice[2].label -->
Keep building until the money runs out or you do.

## s_second_storm · THE CABLE REMEMBERS [scene · gated] — speaker: Anders Voss

<!-- fate:skyline/s_second_storm.leadIn -->
A second storm system forms along the same track as the one that made the cable sing, and this time the forecasts refuse to call it manageable. Anders walks into your office with the inspection files from incident 4471 — the tear you logged and never told the world about — and shuts the door.

<!-- fate:skyline/s_second_storm.prose -->
“I asked you for a margin and you bought a schedule,” he says, with no heat at all, which is the most frightening version of him. “I asked you to publish the tear and you filed it. Now the same storm is coming back, stronger, and the thin sections I objected to in writing are holding a healed wound at kilometer 921.” He spreads the charts on your desk. “Here is what I can promise. Shut the line down now — every climber grounded, a full season of rebuilding, the freight contracts screaming — and she holds. Run the schedule through this storm, and I am no longer making promises. I am making guesses.” He straightens up and looks at you the way he once looked at a strand that would not break. “You have paid me for ten years to know the difference. Choose.”

### s_second_storm · choice 1
<!-- fate:skyline/s_second_storm.choice[0].label -->
Shut it all down. Rebuild every thin section, whatever it costs.

<!-- fate:skyline/s_second_storm.choice[0].result -->
The line goes dark for a season and the freight customers scream on schedule. Crews rebuild the thin sections through the storm months, kilometer by kilometer, while the accountants learn new shades of gray. When the cable comes back it carries Anders’s full margin at last, bought late and at triple price — which, he observes, is how most people finally buy it.

### s_second_storm · choice 2
<!-- fate:skyline/s_second_storm.choice[1].label -->
Keep the schedule. The clamps held once. They will hold again.

<!-- fate:skyline/s_second_storm.choice[1].result -->
The storm arrives at 2 a.m., eleven percent stronger than forecast, exactly like last time. At kilometer 921 the healed wound opens, and this time the thin sections beside it have nothing extra to give. The cable does not sing. It cracks — a sound the platform’s bones carry to every bunk — and thirty-six thousand kilometers of road come down across four hours, burning into the atmosphere like a slow, endless meteor written across the whole night sky.

## s_s_guarantee · THE STEEL INVOICE [scene · gated]

<!-- fate:skyline/s_s_guarantee.leadIn -->
The platform’s steel supplier calls a meeting that is really an ultimatum: forty million dollars overdue, and the next shipment stays on the dock until someone makes them whole. Without that steel, two thousand workers stand idle at sea, at full pay, in eleven days.

<!-- fate:skyline/s_s_guarantee.prose -->
The company cannot cover the invoice this month, and every lender who could bridge it wants six weeks of paperwork you do not have. There is one signature on Earth the supplier will accept today, and it is yours — the personal kind, backed by everything the last two companies ever paid you. The lawyer explains it twice, slowly, the way lawyers do when they want the record to show they warned you. If the company fails after you sign, the failure follows you home. Your houses, your shares, your accounts — the whole biography, pledged against a shipment of steel.

### s_s_guarantee · choice 1
<!-- fate:skyline/s_s_guarantee.choice[0].label -->
Sign it. The build does not stop while you own a dollar.

<!-- fate:skyline/s_s_guarantee.choice[0].result -->
The steel ships the same afternoon. For four months, until the next round closes, every storm forecast and freight report reads differently, because the thing at stake at sea is now also everything in your name on land. You sleep the way founders slept in the garage years. It turns out that muscle never forgets.

### s_s_guarantee · choice 2
<!-- fate:skyline/s_s_guarantee.choice[1].label -->
Refuse. Slow the build before you bet the biography.

<!-- fate:skyline/s_s_guarantee.choice[1].result -->
The build slows to half pace while finance grinds through the lenders’ paperwork, and two thousand workers rotate home on reduced shifts. It costs a season and a headline. It keeps your name off the collateral schedule, which some nights feels wise and other nights feels like the first time you flinched.

## s_s_sell_shares · THE OLD FORTUNE [scene · gated]

<!-- fate:skyline/s_s_sell_shares.leadIn -->
The finance team’s weekly note has developed a tone, and the tone is a politely screaming siren. Payroll for a floating city is due in twenty days, the next round is stuck in diligence, and the only liquid money in reach is the fortune your last company left you.

<!-- fate:skyline/s_s_sell_shares.prose -->
The shares from the Teleport years sit in a vault account you almost never open — the proof, in numbers, that the second company happened. Selling a block of them at speed means selling at a discount, publicly, with every analyst on Earth reading it as either total commitment or quiet desperation. Mateo puts the choice plainly, because that is his job. “It is your personal safety net, boss. You would be feeding it to the company. I am required by loyalty to point out that founders who do this are heroes in the retellings and cautionary tales in the settlements, and nobody knows which one until later.”

### s_s_sell_shares · choice 1
<!-- fate:skyline/s_s_sell_shares.choice[0].label -->
Sell the block. The past pays for the future.

<!-- fate:skyline/s_s_sell_shares.choice[0].result -->
The sale prints before the market opens, and the analysts split exactly as predicted — half write ALL IN, half write TROUBLE AT SEA. Payroll clears with nine days to spare. In the vault account, the number that proved the second company happened is smaller now. The cable does not know that. The cable just keeps standing, fed.

### s_s_sell_shares · choice 2
<!-- fate:skyline/s_s_sell_shares.choice[1].label -->
Keep the net. Squeeze the build instead.

<!-- fate:skyline/s_s_sell_shares.choice[1].result -->
The cuts go deep enough to hurt — contractor rotations stretched, two supply runs merged into one, the second cafeteria closed at night. The platform grumbles and holds. Your safety net stays where it is, and you catch yourself checking that it is still there, which tells you something about this decade you were not planning to learn.

## s_s_aurelia_advance · THE NEIGHBORLY OFFER [scene · gated] — speaker: Katarina Volkov

<!-- fate:skyline/s_s_aurelia_advance.leadIn -->
Katarina Volkov has a gift for arriving in the exact week the money gets thin, which means Aurelia’s analysts read your supplier payments the way weather services read pressure maps. She requests ten minutes and brings one page.

<!-- fate:skyline/s_s_aurelia_advance.prose -->
“An advance,” she says. “Two hundred million against future transit fees, wired this week, no equity, no board seat.” She lets the number sit there being beautiful. “One term. Aurelia’s port authority becomes the exclusive logistics provider for the platform — fuel, food, freight, all of it, for ten years.” She caps her pen and gives you the courtesy of the truth, as always. “You would be solvent by Friday, and every meal your platform eats for a decade would arrive on our boats. I would take a week to think about that trade, in your position. You have four days.”

### s_s_aurelia_advance · choice 1
<!-- fate:skyline/s_s_aurelia_advance.choice[0].label -->
Take the advance. Solvent by Friday, tethered for ten years.

<!-- fate:skyline/s_s_aurelia_advance.choice[0].result -->
The wire lands in thirty-one hours, which for a nine-figure sovereign transfer is a love letter. From that week on, everything the platform eats, burns, and builds with arrives flying Aurelia’s flag, and the folder called THE SQUEEZE gains a final page in Mateo’s handwriting: WE HANDED THEM THE HOSE.

### s_s_aurelia_advance · choice 2
<!-- fate:skyline/s_s_aurelia_advance.choice[1].label -->
Decline. Hungry beats owned.

<!-- fate:skyline/s_s_aurelia_advance.choice[1].result -->
Volkov accepts the refusal with what you could swear is approval, and notes it in notebook forty-three. The lean weeks stay lean. But the supply boats keep flying your colors, and on a platform where everyone can read a flag, that turns out to be worth more than the comfort would have been.

## s_s_paycut · THE CAFETERIA MEETING [scene · gated]

<!-- fate:skyline/s_s_paycut.leadIn -->
The money gets thin enough that the crews notice before the press does — supply runs merge, overtime vanishes, and the rumor mill on a platform of four hundred people runs faster than any wire service. The shift leads request a meeting, and they book the cafeteria, because everyone fits there.

<!-- fate:skyline/s_s_paycut.prose -->
The head welder does the talking, a woman named Osei — no relation to the journalist, though she enjoys the double takes. “We can read a supply manifest, boss. You are maybe eight weeks from missing payroll.” She puts a signed sheet on the table. “Here is our offer, and it is an offer, not a favor. Every crew on FIRST RUNG takes a fifteen percent cut until the next round closes — in exchange for shares. We built her. If she is going to be worth something someday, we want to own the part we built.” The sheet has three hundred and eighty signatures on it. The room waits, four hundred faces above four hundred folded arms, to find out what kind of company this is.

### s_s_paycut · choice 1
<!-- fate:skyline/s_s_paycut.choice[0].label -->
Take the offer. The crews become owners.

<!-- fate:skyline/s_s_paycut.choice[0].result -->
The equity pool for the crews papers in a week, with Anders holding the trust as their representative, and the cafeteria meeting ends in the loudest sound the platform has ever produced indoors. Years from now, business schools will teach this week. What the case studies will never quite capture is the shift change afterward — four hundred owners walking out to the derricks, checking the weather on their cable.

### s_s_paycut · choice 2
<!-- fate:skyline/s_s_paycut.choice[1].label -->
Refuse the cut. Their wages are not your runway.

<!-- fate:skyline/s_s_paycut.choice[1].result -->
You tell the cafeteria the truth — that you will sell your own holdings before you spend theirs — and the room takes it the way crews take a captain’s decision, with respect and a low grumble. Osei folds the signed sheet and hands it to you anyway. “Keep it,” she says. “So you know what was on the table.” You keep it for the rest of your career, and it outlasts most of the furniture.

## s_insolvency · RUNWAY ZERO [scene]

<!-- fate:skyline/s_insolvency.leadIn -->
A company with a road to space dies the same way a garage company dies — the account turns red, the inbox goes quiet, and the phone fills with numbers you owe. The only difference is that this time, four hundred people live inside the thing that is running out of money.

<!-- fate:skyline/s_insolvency.prose -->
Payroll for a floating city bounces, and the sound it makes is global — the platform makes the evening news on six continents before the bank’s apology email finishes loading. The insurers want calls. The commission wants assurances. Aurelia’s harbor authority expresses, in beautifully formatted language, its concern. Anders keeps the cable crews working without being asked, because bridges do not care who is solvent. A few doors remain open, and all of them are ugly.

### s_insolvency · choice 1
<!-- fate:skyline/s_insolvency.choice[0].label -->
Bridge loan against the cable itself

<!-- fate:skyline/s_insolvency.choice[0].result -->
The lending syndicate takes the cable as collateral — the road to space, pledged like a house. During the signing, one banker asks what repossessing it would even look like, and nobody in the room laughs, because everybody in the room has quietly wondered.

### s_insolvency · choice 2
<!-- fate:skyline/s_insolvency.choice[1].label -->
Emergency sale to the commission — the nations buy the road

<!-- fate:skyline/s_insolvency.choice[1].result -->
The transfer that treaties argued about for years gets done in eleven days by accountants, at a distressed price with a dignity clause. The nations own the cable now. The press release thanks you for your service to mankind, and means it, which does not help.

### s_insolvency · choice 3
<!-- fate:skyline/s_insolvency.choice[2].label -->
Surrender

<!-- fate:skyline/s_insolvency.choice[2].result -->
Some roads outlast the companies that build them. This becomes one of the sentences people say about you.

## s_burnout · THE BODY KEEPS SCORE [scene]

<!-- fate:skyline/s_burnout.leadIn -->
It happens on the helicopter deck, between meetings — a missed step, a gray blur, and the platform medic’s face arriving from very far away. The clinic’s machines are new and expensive, and every one of them agrees with each other about you.

<!-- fate:skyline/s_burnout.prose -->
The doctor is a veteran of oil rigs and navy ships, and she has seen your chart’s shape before. “Founders and captains,” she says. “Same graph, same ending, and I have watched the ending.” Three companies, twenty years, and a body that has been treated like a rental. She is not dramatic about it, which is what makes it land — she simply shows you the numbers and says the platform’s rules give her the authority to ground anyone unfit for duty, and asks, professionally, whether she is about to need it.

### s_burnout · choice 1
<!-- fate:skyline/s_burnout.choice[0].label -->
Take the forced rest. A month on shore, phone in a drawer.

<!-- fate:skyline/s_burnout.choice[0].result -->
A month in a house with no rails and no derricks. You sleep nine hours a night by week two, remember what food tastes like by week three, and by week four you can watch the ocean without pricing it. The company runs without you — Mateo sees to that — and the fact that it can is medicine of its own strange kind.

### s_burnout · choice 2
<!-- fate:skyline/s_burnout.choice[1].label -->
Push through. The conference schedule outranks the bloodwork.

<!-- fate:skyline/s_burnout.choice[1].result -->
You negotiate with the doctor like she is a vendor, and she extends terms, once, with a note in the file she reads aloud so you both hear it. Nothing left in the tank after this, the note says. She underlines it, you initial it, and that is the whole deal.

### s_burnout · choice 3
<!-- fate:skyline/s_burnout.choice[2].label -->
Walk away. Let the road belong to whoever wants it more.

<!-- fate:skyline/s_burnout.choice[2].result -->
There is a version of health that costs a company, and you finally pay it. The wind-down is orderly because Mateo makes it orderly, and the last thing shipped off the platform is everyone’s final paycheck, on time, with a letter you write yourself.

## SKYLINE · ENDINGS

### ending: ascent — THE ROAD OPEN TO ALL [triumph]
<!-- fate:skyline/end.ascent.prose -->
The treaty failed, the pledge held, and a fourth-grade teacher rode the road to space for the price of a used car. The cable belongs to the company that built it, the price belongs to the charter, and the sky, at last, belongs to anyone who saves up.

#### ending ascent · film screen 1
<!-- fate:skyline/end.ascent.screen[0].prose -->
Her name is Dana Whitfield. She teaches fourth grade in Ohio, and three years ago she asked a camera whether her class would ever afford a ride.

On the morning of the first passenger ascent, she boards climber PILGRIM wearing her school lanyard, because her students voted that she had to. The fare printed on her ticket is the pledge number — the price of a mid-sized car, locked into the company’s charter, enforceable by the commission, forever.

#### ending ascent · film screen 2
<!-- fate:skyline/end.ascent.screen[1].prose -->
The climb takes two days. She teaches a lesson from the cabin at kilometer 400, live to eleven million students, and loses her composure only once — at the edge of space, where the sky quits being blue and the cable just keeps going.

At the top, in the orbital station’s big window, she floats her class photo against the glass so the Earth can see it.

Down on FIRST RUNG, four hundred builders crowd the cafeteria where every hard thing was ever decided, watching the feed in a silence that no one wants to be the first to break.

#### ending ascent · film screen 3
<!-- fate:skyline/end.ascent.screen[2].prose -->
In the Flats, on the block where a laundromat once held up a garage, the corner screen plays the ascent all day.

Mrs. Delgado watched the first package fall soft as rain onto her porch, years ago, filming and screaming. She is gone now. Her granddaughter — the one who used to wait forty minutes for a bus to bring her insulin — stands where the porch camera used to hang, holding her own daughter up to see the screen.

“That road,” she says, “started here.” It is not exactly true, and it is exactly true enough.

#### ending ascent · interlude (the years after)
<!-- fate:skyline/end.ascent.interlude.prose -->
Two years of ascents — students, honeymooners, welders’ mothers, a nation’s worth of ordinary passengers riding the sky for the price of a car. The company earns like a port and behaves like a public trust, which confuses the analysts and delights everyone else. And at the top of the cable, where the freight transfers to the Moon runs, the traffic reports keep saying the same strange, wonderful thing: the busiest road above the Earth now ends at a pole with dormitories, work crews, and no town. People live up there. Nobody has built them anywhere to live. You stand at the platform rail some evenings, watching the climbers rise, doing the arithmetic of one last impossible thing.

### ending: eminent_domain — EMINENT DOMAIN [sale]
<!-- fate:skyline/end.eminent_domain.prose -->
The nations take the road and pay what their accountants call generous — a fortune for the steel, nothing for the century. The commission runs the cable carefully, slowly, and by committee. Fares stay high, because committees fear cheap things. On the seaward wall of the platform, under every new coat of official paint, the workers’ old name keeps bleeding through: FIRST RUNG.

#### ending eminent_domain · interlude (the years after)
<!-- fate:skyline/end.eminent_domain.interlude.prose -->
Three years of watching your road from the shore. The settlement made you wealthy at a scale that stops meaning anything — you fund universities, buy back the old laundromat block and give it to the neighborhood, and still cannot spend the interest. The commission runs the cable at half its capacity, and every quarter you read the traffic reports like letters from a child raised by someone else. What keeps you up at night is the far end of the line: the Moon has crews, contracts, and dormitories, and no one is building the town. In the third spring, you charter a survey of the lunar south pole — just to look, you tell everyone, and almost believe it.

### ending: bankrupt — THE STUMP [noble]
<!-- fate:skyline/end.bankrupt.prose -->
The company dies with its boots on and the cable goes dark — mothballed, lawyered, orphaned. But thirty-six thousand kilometers of road do not stop existing because a balance sheet did, and every sunset, the unlit line still cuts the sky from the sea to the stars. Sailors navigate by it. Kids point at it. The world calls it The Stump, half in mockery, half in awe, and everyone who says it knows exactly who built it.

#### ending bankrupt · interlude (the years after)
<!-- fate:skyline/end.bankrupt.interlude.prose -->
A year of depositions and quiet. The crews scatter to good jobs — a FIRST RUNG résumé opens every door in three industries — and Anders takes a professorship where he teaches a course the students call How Not To Die Building The Impossible, attendance triple the room’s capacity. You do the settlements, keep the workers whole where the law allows it, and watch the dark line in the sky refuse to fall down out of sheer engineering. The consortium that eventually buys the cable from the people who wind down bankrupt companies will need someone who knows how to wake it. Everyone on Earth knows whose phone number that is.

### ending: garrison — THE GARRISON [disgrace]
<!-- fate:skyline/end.garrison.prose -->
The gray hulls keep every promise the Admiral made. No treaty touches the cable, no rival delays it, and nothing so much as splashes near the platform without clearance. The road runs perfectly, profitably, and under guard. The teacher from Ohio applies for a ride and receives, eleven weeks later, a beautifully formatted letter about background checks. She does not apply twice.

#### ending garrison · interlude (the years after)
<!-- fate:skyline/end.garrison.interlude.prose -->
Four years of perfect security. The cable earns fortunes moving cargo and cleared personnel, the platform gains a locked floor you have never seen, and twice a year the Admiral toasts you at a dinner where everyone wears the same color. You are rich, protected, and escorted — a founder with a fence around his life’s work and a lanyard to visit it. At night, from the rail, the climbers rise on schedule, carrying freight and soldiers to a Moon that is being staffed like a base instead of settled like a town. Somewhere in the fourth year, you start sketching, privately, a thing no admiral would ever clear: a place up there with no fence at all.

### ending: venture_state — MINISTER OF THE CENTURY [disgrace]
<!-- fate:skyline/end.venture_state.prose -->
Passport 000001. The cable becomes Aurelia’s national asset, wrapped in treaties no committee can pierce, funded by a treasury deeper than most continents. Everything you built is safe forever, and none of it is yours — a distinction the fireworks are very beautiful about, every single anniversary.

#### ending venture_state · interlude (the years after)
<!-- fate:skyline/end.venture_state.interlude.prose -->
Three years of governing infrastructure for a country that runs like a startup, which mostly means the meetings are shorter and the flags are newer. Rashid keeps every promise. Volkov becomes, of all things, a friend — the only person in the government who tells you the truth at full strength. And the work is real: the cable thrives, the fares drop, Aurelia grows from nine buildings to ninety. But you sign your letters over a title now instead of a company, and some mornings you stand at the harbor and miss owning your own name. In the third year, you draft Aurelia’s space settlement charter yourself — and quietly reserve one lunar parcel, at the south pole, registered not to the ministry but to you.

### ending: port_authority — THE PORT AUTHORITY OF THE SKY [transformation]
<!-- fate:skyline/end.port_authority.prose -->
You give the road away on your own terms — a world trust, your pledge written into its charter, your safety standards as its law, and you in the chair, owning nothing and steering everything. The nations sign because it answers their fear. The crews sign because Anders reads the charter first and nods. The fare drops twice in the first year. Historians will argue forever about whether it was surrender or the greatest power move in the history of money. Both sides will be right.

#### ending port_authority · interlude (the years after)
<!-- fate:skyline/end.port_authority.interlude.prose -->
Two years of running the sky’s port authority — the most powerful unpaid job on Earth. Governments comply with you, slowly, filing objections your standards board overrules with data. The cable carries a small city’s population every year at the pledge price. And the far end of the road keeps nagging at you the way empty land nags at a builder: the Moon has industry now, crews on rotation, a pole full of workers counting the days until they go home. Nobody has given them a reason to stay. At the second annual board dinner, Anders — retired, unretired, then retired again — leans over and says the sentence you have been waiting for someone else to say first: “The road is finished. Roads are for going somewhere. So. What is at the end of ours?”

### ending: long_road — THE BUILDER STAYS [transformation]
<!-- fate:skyline/end.long_road.prose -->
You keep the company, keep the rail, and keep building — a second cable surveyed, a third named, the founder still at sea while the world adjusts to the sky having a road. Mateo becomes CEO in everything but title, then in title too. You never exactly retire. The ocean would not believe you anyway.

#### ending long_road · interlude (the years after)
<!-- fate:skyline/end.long_road.interlude.prose -->
Four years of expansion — the second cable rising off the coast of Kiribela, whose treasury now runs a surplus that economists visit like a natural wonder. You hand the CEO title to Mateo in a cafeteria ceremony where the crews stomp the floor so hard the derricks ring, and you keep for yourself exactly one job: chief of whatever is next. The climbers feed the Moon around the clock now — machinery, habitats, crews for the pole. Up there, a workforce the size of a town lives in dormitories built for shifts, and every rotation home, more of them ask the same question in their exit interviews. Why is there nowhere to stay? In the fourth year, you charter the survey. The next impossible thing has coordinates now.

### ending: cable_fall — THE NIGHT THE SKY FELL [ruin]
<!-- fate:skyline/end.cable_fall.prose -->
The cable falls for four hours, burning across the whole night sky, and by dawn the age of elevators is over for a generation. No one on the platform dies — Anders’s evacuation drills see to that, his last gift to a company that stopped listening to him. The inquiry takes three years and says what his memos said for five. You built the road that touched the sky, and you traded away the margin that held it there, and both of those sentences are yours forever.

#### ending cable_fall · interlude (the years after)
<!-- fate:skyline/end.cable_fall.interlude.prose -->
Two years of inquiries, settlements, and learning to enter rooms where everyone recognizes you. You testify honestly, every time, because it is far too late for anything else and because Anders — who never says one public word against you — testifies honestly beside you, which is a mercy you know you did not earn. The strange thing is what survives: the math. The cable held for years before the thin sections failed, and every engineer on Earth now knows both halves of the lesson — that it can be done, and what it costs to do it carelessly. Somebody will build the next one. In the second winter, a consortium calls to ask what you would do differently. You talk for six hours. They take notes the whole time.


---

# FILLERS — the quiet weeks

### filler: f_runway_counting
<!-- fate:filler/f_runway_counting.text -->
You catch yourself doing the runway math during other conversations. The number stays the same, no matter how often you count it.

### filler: f_runway_groceries
<!-- fate:filler/f_runway_groceries.text -->
The grocery run gets surgical. Mrs. Delgado slips you a dryer token and studies the receipt like it was her plan all along.

### filler: f_runway_invoices
<!-- fate:filler/f_runway_invoices.text -->
You learn the exact hour the bank posts transactions and are awake for it, refreshing, like it might change its mind.

### filler: f_basement
<!-- fate:filler/f_basement.text -->
You let the apartment go and move back into your parents’ basement. Your old bedroom still has the model rockets. At dinner, the quiet feels like its own kind of love.

### filler: f_arrears_meter
<!-- fate:filler/f_arrears_meter.text -->
You’ve started feeding the electricity meter by hand, coin by coin, like the garage is a parking spot for a dream.

### filler: f_subletter_hum
<!-- fate:filler/f_subletter_hum.text -->
The vinyl cutter below your office hums all day. Your tenant waves at the shuttle each morning like a coworker. In a way, he is.

### filler: f_stress_sleep
<!-- fate:filler/f_stress_sleep.text -->
Sleep comes in installments. At 4 a.m. the ceiling shuttle looks less like a prototype and more like a verdict.

### filler: f_stress_jaw
<!-- fate:filler/f_stress_jaw.text -->
Your jaw aches all week before you notice you’ve been clenching it. The dentist would have opinions. The dentist is a luxury.

### filler: f_stress_email
<!-- fate:filler/f_stress_email.text -->
You reread one sent email eleven times, hunting for the mistake. The email is fine. Your nerves are doing the typing now.

### filler: f_calm_bench
<!-- fate:filler/f_calm_bench.text -->
A good week, quietly. The workbench stays clean for three whole days, which in founder time is a sabbatical.

### filler: f_sofia_rig
<!-- fate:filler/f_sofia_rig.text -->
Sofia’s test rig gets a new foam block and a hand-lettered sign that reads GRAVITY ALWAYS COLLECTS. Everyone lets it stand.

### filler: f_sofia_commits
<!-- fate:filler/f_sofia_commits.text -->
The commit log fills at 2 a.m. with notes like LAND SOFTER and TOO HARD. The code keeps shrinking. The landings keep softening.

### filler: f_priya_check
<!-- fate:filler/f_priya_check.text -->
Priya’s weekly check-in is four words or fewer. This week she says, “Watch your burn.” She tends to be right, which is exhausting.

### filler: f_couriers_wave
<!-- fate:filler/f_couriers_wave.text -->
A courier waves up at the garage window on her route past. The drivers you hired as full employees started calling the tubes “ours.” You let them.

### filler: f_funded_burn
<!-- fate:filler/f_funded_burn.text -->
Money in the bank changes the sound of the rain. You order the good connectors without checking the price twice. Only twice.

### filler: f_rep_loved
<!-- fate:filler/f_rep_loved.text -->
Someone stuck a hand-drawn shuttle in the laundromat window, crayon on cardboard. The owner refuses to take it down.

### filler: f_rep_cold
<!-- fate:filler/f_rep_cold.text -->
The barista who used to ask about the railway now only rings you up. Small city. Long memory.

### filler: f_grey_van
<!-- fate:filler/f_grey_van.text -->
The compliance van does its slow lap of the block. You write down its schedule. It is probably writing down yours.

### filler: f_storm_quiet
<!-- fate:filler/f_storm_quiet.text -->
The city is quieter around you now — conversations that pause when you enter, feeds you’ve stopped opening. You work. It’s what’s left.

### filler: f_storm_letters
<!-- fate:filler/f_storm_letters.text -->
Mail arrives for the company in new colors — stiff envelopes, city stamps, signatures required. You sign for all of it.

### filler: f_dryer_heat
<!-- fate:filler/f_dryer_heat.text -->
Dryer heat rises through the floorboards at six sharp. The whole company still smells faintly of fabric softener. You’ve stopped minding.

### filler: f_meridian_sky
<!-- fate:filler/f_meridian_sky.text -->
MERIDIAN’s drones cross the evening sky in perfect intervals, blue lights heading for the hills. You watch one until the blue light disappears. It takes a while.

### filler: f_flats_night
<!-- fate:filler/f_flats_night.text -->
The Flats does its Friday thing — grills on fire escapes, someone’s speaker two blocks over. The city keeps being worth it.

### filler: f_todo_wall
<!-- fate:filler/f_todo_wall.text -->
The to-do wall gains nine items and loses four. One of the survivors has been there since the first week. You both know which one.

### filler: f_coffee_ledger
<!-- fate:filler/f_coffee_ledger.text -->
Somebody finally does the math on how much coffee the company drinks and presents it at standup as a funding round. The person who paid for it laughs hardest.

### filler: f_small_hours
<!-- fate:filler/f_small_hours.text -->
The building has a sound it only makes at 2 a.m., and you know it the way sailors know their hull. Every company you will ever run has this sound. Only the pitch changes.

### filler: f_shuttle_tether
<!-- fate:filler/f_shuttle_tether.text -->
You tighten the prototype’s tether out of habit, the way other people check their locks. It hasn’t hung crooked in months.

### filler: f_citation_list
<!-- fate:filler/f_citation_list.text -->
The parking citation with the original waiting list on the back lives in a drawer now. You keep it anyway.

### filler: f_weather
<!-- fate:filler/f_weather.text -->
Weather moves through midweek — real rain, the kind that grounds everything with propellers. The tubes keep working. It’s a small, private satisfaction.

### filler: f_cape_launch
<!-- fate:filler/f_cape_launch.text -->
A booster goes up from the pads south of you, and the hangar roof drums with delay-shifted thunder. Only you look up anymore.

### filler: f_cape_gulls
<!-- fate:filler/f_cape_gulls.text -->
Gulls nest in the hangar eaves and scream at the forklift. Omid — or his empty bench — has named all of them after journal reviewers.

### filler: f_counter_hum
<!-- fate:filler/f_counter_hum.text -->
The relay dashboard glows all night in the corner of the floor, handoffs ticking across it like a pulse. You check it the way you used to check the tether.

### filler: f_moon_sideways
<!-- fate:filler/f_moon_sideways.text -->
On the remote feed from the Moon, sunlight comes in sideways the way it always does. For a second, the whole shift watches an ordinary shadow do something no Earth shadow does.

### filler: f_verge_traffic
<!-- fate:filler/f_verge_traffic.text -->
Shackleton Verge’s weekly report arrives at 4 a.m., dry as Moon dust. Salazar’s only note this week is “Adequate.” The team frames it.

### filler: f_operator_hands
<!-- fate:filler/f_operator_hands.text -->
Cass runs the morning calibration with his eyes shut, feeling the signal delay like a tide. The trainees think he is showing off. It is prayer.

### filler: f_tourist_letters
<!-- fate:filler/f_tourist_letters.text -->
Letters from customers pile in a shoebox by the chair, with photos of hands raised against the Earth and thank-yous in shaky cursive. Somebody labels it CARGO, PRICELESS.

### filler: f_halcyon_watch
<!-- fate:filler/f_halcyon_watch.text -->
HALCYON’s quarterly deck leaks, as it always does. Slide forty-one is about you. It is very polite. You print it and pin it by the door.

### filler: f_burn_cape
<!-- fate:filler/f_burn_cape.text -->
You learn which vending machine at the spaceport still takes coins and what time the good bakery marks things down. Space is glamorous at a distance.

### filler: f_june_ledger
<!-- fate:filler/f_june_ledger.text -->
June updates WAYS WE DIE on Friday and reads the funniest entry aloud at standup. Morale, she says, is a line item. She budgets for it.

### filler: f_platform_weather
<!-- fate:filler/f_platform_weather.text -->
You learn the platform’s weather by sound — the mooring lines hum a note for calm and a different one for trouble, and everyone aboard can name both in their sleep.

### filler: f_cable_lights
<!-- fate:filler/f_cable_lights.text -->
On clear nights the cable’s warning lights climb until they run out of atmosphere, and new crew members always stop mid-step the first time they follow the line all the way up.

### filler: f_cafeteria_bets
<!-- fate:filler/f_cafeteria_bets.text -->
The cafeteria betting pool now covers storm arrivals, climber times, and which visiting dignitary will be seasick first. Mateo claims not to run it. Mateo runs it.

### filler: f_aurelia_paper
<!-- fate:filler/f_aurelia_paper.text -->
Aurelia’s weekly harbor notices arrive in flawless bureaucratic prose, and Mateo reads them aloud at standup in a dry voice that has become everyone’s favorite radio show.

### filler: f_anders_walks
<!-- fate:filler/f_anders_walks.text -->
Anders walks the derrick deck every morning before his coffee, one hand trailing the nearest anchor line, the way other people check on a sleeping child.

### filler: f_treaty_chatter
<!-- fate:filler/f_treaty_chatter.text -->
A think-tank paper about “the elevator question” cites your safety record eleven times. A rival paper cites the same record as evidence of recklessness. Both invoice their governments.

### filler: f_flats_postcard
<!-- fate:filler/f_flats_postcard.text -->
A padded envelope arrives from the old neighborhood — a crayon drawing of the cable, signed by a second-grade class from the Flats. Mateo frames it before you finish reading the card.

### filler: f_burn_platform
<!-- fate:filler/f_burn_platform.text -->
You catch yourself pricing everything on the platform in weeks of runway — the cranes, the supply boats, the coffee. The coffee is holding up its end. Everything else is negotiable.

### filler: fb_weeks_blur
<!-- fate:filler/fb_weeks_blur.text -->
The weeks run together — solder, invoices, drops, sleep in that order, most days. The hardware holds. It almost feels like a trick.

### filler: fb_routine
<!-- fate:filler/fb_routine.text -->
A stretch of quiet weeks. You use them the way founders do, badly at first, then, reluctantly, to rest.

### filler: fb_grind
<!-- fate:filler/fb_grind.text -->
Quiet weeks stack up like clean laundry. The company gets a little better at a hundred things few people will ever write about.
