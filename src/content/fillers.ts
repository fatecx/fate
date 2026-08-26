import type { Pred } from '../engine/predicates'

/**
 * Week-turn fillers — the connective tissue under "— WEEK N —" marks.
 * One line of authored world texture per turned week, gated by predicates so
 * it always reads as true state. The renderer picks deterministically
 * (epoch × seed hash); no randomness is ever authored at render time.
 */
export interface FillerDef {
  id: string
  /** Eligibility against true state. Omitted = always eligible. */
  when?: Pred
  text: string
}

export const FILLERS: readonly FillerDef[] = [
  // ---- money dread -----------------------------------------------------------
  {
    id: 'f_runway_counting',
    when: { k: 'runway', cmp: 'lt', v: 8 },
    text: 'You catch yourself doing the runway math during other conversations. The number stays the same, no matter how often you count it.',
  },
  {
    id: 'f_runway_groceries',
    when: { k: 'all', of: [{ k: 'runway', cmp: 'lt', v: 8 }, { k: 'not', p: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] } }] },
    text: 'The grocery run gets surgical. Mrs. Delgado slips you a dryer token and studies the receipt like it was her plan all along.',
  },
  {
    id: 'f_runway_invoices',
    when: { k: 'runway', cmp: 'lt', v: 10 },
    text: 'You learn the exact hour the bank posts transactions and are awake for it, refreshing, like it might change its mind.',
  },
  {
    id: 'f_basement',
    when: { k: 'all', of: [{ k: 'runway', cmp: 'lt', v: 5 }, { k: 'not', p: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] } }] },
    text: 'You let the apartment go and move back into your parents’ basement. Your old bedroom still has the model rockets. At dinner, the quiet feels like its own kind of love.',
  },
  {
    id: 'f_arrears_meter',
    when: { k: 'all', of: [{ k: 'treasury', cmp: 'lt', v: 0 }, { k: 'not', p: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] } }] },
    text: 'You’ve started feeding the electricity meter by hand, coin by coin, like the garage is a parking spot for a dream.',
  },
  {
    id: 'f_subletter_hum',
    when: { k: 'flag', scope: 'company', key: 'subletter', cmp: 'eq', v: true },
    text: 'The vinyl cutter below your office hums all day. Your tenant waves at the shuttle each morning like a coworker. In a way, he is.',
  },
  // ---- stress ------------------------------------------------------------------
  {
    id: 'f_stress_sleep',
    when: { k: 'all', of: [{ k: 'stress', cmp: 'gte', v: 70 }, { k: 'not', p: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] } }] },
    text: 'Sleep comes in installments. At 4 a.m. the ceiling shuttle looks less like a prototype and more like a verdict.',
  },
  {
    id: 'f_stress_jaw',
    when: { k: 'stress', cmp: 'gte', v: 70 },
    text: 'Your jaw aches all week before you notice you’ve been clenching it. The dentist would have opinions. The dentist is a luxury.',
  },
  {
    id: 'f_stress_email',
    when: { k: 'stress', cmp: 'gte', v: 55 },
    text: 'You reread one sent email eleven times, hunting for the mistake. The email is fine. Your nerves are doing the typing now.',
  },
  {
    id: 'f_calm_bench',
    when: { k: 'stress', cmp: 'lte', v: 30 },
    text: 'A good week, quietly. The workbench stays clean for three whole days, which in founder time is a sabbatical.',
  },
  // ---- team & cast texture ------------------------------------------------------
  {
    id: 'f_sofia_rig',
    when: { k: 'flag', scope: 'company', key: 'sofia_resolved', cmp: 'eq', v: true },
    text: 'Sofia’s test rig gets a new foam block and a hand-lettered sign that reads GRAVITY ALWAYS COLLECTS. Everyone lets it stand.',
  },
  {
    id: 'f_sofia_commits',
    when: { k: 'flag', scope: 'company', key: 'sofia_resolved', cmp: 'eq', v: true },
    text: 'The commit log fills at 2 a.m. with notes like LAND SOFTER and TOO HARD. The code keeps shrinking. The landings keep softening.',
  },
  {
    id: 'f_priya_check',
    when: { k: 'met', who: 'priya' },
    text: 'Priya’s weekly check-in is four words or fewer. This week she says, “Watch your burn.” She tends to be right, which is exhausting.',
  },
  {
    id: 'f_couriers_wave',
    when: { k: 'flag', scope: 'company', key: 'couriers_ally', cmp: 'eq', v: true },
    text: 'A courier waves up at the garage window on her route past. The drivers you hired as full employees started calling the tubes “ours.” You let them.',
  },
  {
    id: 'f_funded_burn',
    when: { k: 'flag', scope: 'company', key: 'angel_funded', cmp: 'eq', v: true },
    text: 'Money in the bank changes the sound of the rain. You order the good connectors without checking the price twice. Only twice.',
  },
  // ---- reputation ---------------------------------------------------------------
  {
    id: 'f_rep_loved',
    when: { k: 'all', of: [{ k: 'rep', cmp: 'gte', v: 3 }, { k: 'not', p: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] } }] },
    text: 'Someone stuck a hand-drawn shuttle in the laundromat window, crayon on cardboard. The owner refuses to take it down.',
  },
  {
    id: 'f_rep_cold',
    when: { k: 'all', of: [{ k: 'rep', cmp: 'lte', v: -2 }, { k: 'not', p: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] } }] },
    text: 'The barista who used to ask about the railway now only rings you up. Small city. Long memory.',
  },
  // ---- grey market / storm texture ----------------------------------------------
  {
    id: 'f_grey_van',
    when: { k: 'flag', scope: 'company', key: 'grey_market', cmp: 'eq', v: true },
    text: 'The compliance van does its slow lap of the block. You write down its schedule. It is probably writing down yours.',
  },
  {
    id: 'f_storm_quiet',
    when: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true },
    text: 'The city is quieter around you now — conversations that pause when you enter, feeds you’ve stopped opening. You work. It’s what’s left.',
  },
  {
    id: 'f_storm_letters',
    when: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true },
    text: 'Mail arrives for the company in new colors — stiff envelopes, city stamps, signatures required. You sign for all of it.',
  },
  // ---- always-eligible city & garage ambience ------------------------------------
  {
    id: 'f_dryer_heat',
    when: { k: 'not', p: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] } },
    text: 'Dryer heat rises through the floorboards at six sharp. The whole company still smells faintly of fabric softener. You’ve stopped minding.',
  },
  {
    id: 'f_meridian_sky',
    when: { k: 'not', p: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] } },
    text: 'MERIDIAN’s drones cross the evening sky in perfect intervals, blue lights heading for the hills. You watch one until the blue light disappears. It takes a while.',
  },
  {
    id: 'f_flats_night',
    when: { k: 'not', p: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] } },
    text: 'The Flats does its Friday thing — grills on fire escapes, someone’s speaker two blocks over. The city keeps being worth it.',
  },
  {
    id: 'f_todo_wall',
    text: 'The to-do wall gains nine items and loses four. One of the survivors has been there since the first week. You both know which one.',
  },
  {
    id: 'f_coffee_ledger',
    text: 'Somebody finally does the math on how much coffee the company drinks and presents it at standup as a funding round. The person who paid for it laughs hardest.',
  },
  {
    id: 'f_small_hours',
    text: 'The building has a sound it only makes at 2 a.m., and you know it the way sailors know their hull. Every company you will ever run has this sound. Only the pitch changes.',
  },
  {
    id: 'f_shuttle_tether',
    when: { k: 'not', p: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] } },
    text: 'You tighten the prototype’s tether out of habit, the way other people check their locks. It hasn’t hung crooked in months.',
  },
  {
    id: 'f_citation_list',
    when: { k: 'not', p: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] } },
    text: 'The parking citation with the original waiting list on the back lives in a drawer now. You keep it anyway.',
  },
  {
    id: 'f_weather',
    when: { k: 'not', p: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] } },
    text: 'Weather moves through midweek — real rain, the kind that grounds everything with propellers. The tubes keep working. It’s a small, private satisfaction.',
  },
  // ---- teleport era ---------------------------------------------------------------
  {
    id: 'f_cape_launch',
    when: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] },
    text: 'A booster goes up from the pads south of you, and the hangar roof drums with delay-shifted thunder. Only you look up anymore.',
  },
  {
    id: 'f_cape_gulls',
    when: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] },
    text: 'Gulls nest in the hangar eaves and scream at the forklift. Omid — or his empty bench — has named all of them after journal reviewers.',
  },
  {
    id: 'f_counter_hum',
    when: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] },
    text: 'The relay dashboard glows all night in the corner of the floor, handoffs ticking across it like a pulse. You check it the way you used to check the tether.',
  },
  {
    id: 'f_moon_sideways',
    when: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] },
    text: 'On the remote feed from the Moon, sunlight comes in sideways the way it always does. For a second, the whole shift watches an ordinary shadow do something no Earth shadow does.',
  },
  {
    id: 'f_verge_traffic',
    when: { k: 'all', of: [{ k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] }, { k: 'met', who: 'salazar' }] },
    text: 'Shackleton Verge’s weekly report arrives at 4 a.m., dry as Moon dust. Salazar’s only note this week is “Adequate.” The team frames it.',
  },
  {
    id: 'f_operator_hands',
    when: { k: 'all', of: [{ k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] }, { k: 'flag', scope: 'company', key: 'cass_chief', cmp: 'eq', v: true }] },
    text: 'Cass runs the morning calibration with his eyes shut, feeling the signal delay like a tide. The trainees think he is showing off. It is prayer.',
  },
  {
    id: 'f_tourist_letters',
    when: { k: 'all', of: [{ k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] }, { k: 'rep', cmp: 'gte', v: 3 }] },
    text: 'Letters from customers pile in a shoebox by the chair, with photos of hands raised against the Earth and thank-yous in shaky cursive. Somebody labels it CARGO, PRICELESS.',
  },
  {
    id: 'f_halcyon_watch',
    when: { k: 'all', of: [{ k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] }, { k: 'met', who: 'halcyon' }] },
    text: 'HALCYON’s quarterly deck leaks, as it always does. Slide forty-one is about you. It is very polite. You print it and pin it by the door.',
  },
  {
    id: 'f_burn_cape',
    when: { k: 'all', of: [{ k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] }, { k: 'runway', cmp: 'lt', v: 8 }] },
    text: 'You learn which vending machine at the spaceport still takes coins and what time the good bakery marks things down. Space is glamorous at a distance.',
  },
  {
    id: 'f_june_ledger',
    when: { k: 'all', of: [{ k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'not', p: { k: 'corpse', company: 'teleport' } }] }, { k: 'flag', scope: 'company', key: 'june_seat', cmp: 'eq', v: true }] },
    text: 'June updates WAYS WE DIE on Friday and reads the funniest entry aloud at standup. Morale, she says, is a line item. She budgets for it.',
  },
  // ---- skyline era ------------------------------------------------------------------
  {
    id: 'f_platform_weather',
    when: { k: 'corpse', company: 'teleport' },
    text: 'You learn the platform’s weather by sound — the mooring lines hum a note for calm and a different one for trouble, and everyone aboard can name both in their sleep.',
  },
  {
    id: 'f_cable_lights',
    when: { k: 'corpse', company: 'teleport' },
    text: 'On clear nights the cable’s warning lights climb until they run out of atmosphere, and new crew members always stop mid-step the first time they follow the line all the way up.',
  },
  {
    id: 'f_cafeteria_bets',
    when: { k: 'corpse', company: 'teleport' },
    text: 'The cafeteria betting pool now covers storm arrivals, climber times, and which visiting dignitary will be seasick first. Mateo claims not to run it. Mateo runs it.',
  },
  {
    id: 'f_aurelia_paper',
    when: { k: 'all', of: [{ k: 'corpse', company: 'teleport' }, { k: 'met', who: 'volkov' }] },
    text: 'Aurelia’s weekly harbor notices arrive in flawless bureaucratic prose, and Mateo reads them aloud at standup in a dry voice that has become everyone’s favorite radio show.',
  },
  {
    id: 'f_anders_walks',
    when: { k: 'all', of: [{ k: 'corpse', company: 'teleport' }, { k: 'met', who: 'anders' }] },
    text: 'Anders walks the derrick deck every morning before his coffee, one hand trailing the nearest anchor line, the way other people check on a sleeping child.',
  },
  {
    id: 'f_treaty_chatter',
    when: { k: 'all', of: [{ k: 'corpse', company: 'teleport' }, { k: 'rep', cmp: 'gte', v: 3 }] },
    text: 'A think-tank paper about “the elevator question” cites your safety record eleven times. A rival paper cites the same record as evidence of recklessness. Both invoice their governments.',
  },
  {
    id: 'f_flats_postcard',
    when: { k: 'corpse', company: 'teleport' },
    text: 'A padded envelope arrives from the old neighborhood — a crayon drawing of the cable, signed by a second-grade class from the Flats. Mateo frames it before you finish reading the card.',
  },
  {
    id: 'f_burn_platform',
    when: { k: 'all', of: [{ k: 'corpse', company: 'teleport' }, { k: 'runway', cmp: 'lt', v: 12 }] },
    text: 'You catch yourself pricing everything on the platform in weeks of runway — the cranes, the supply boats, the coffee. The coffee is holding up its end. Everything else is negotiable.',
  },
]

/** Used when several quiet weeks compress into one mark. */
export const BLUR_FILLERS: readonly FillerDef[] = [
  {
    id: 'fb_weeks_blur',
    text: 'The weeks run together — solder, invoices, drops, sleep in that order, most days. The hardware holds. It almost feels like a trick.',
  },
  {
    id: 'fb_routine',
    text: 'A stretch of quiet weeks. You use them the way founders do, badly at first, then, reluctantly, to rest.',
  },
  {
    id: 'fb_grind',
    text: 'Quiet weeks stack up like clean laundry. The company gets a little better at a hundred things few people will ever write about.',
  },
]
