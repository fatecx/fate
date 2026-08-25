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
    text: 'You catch yourself doing the runway math during other conversations. The number is always the same. That is the problem with math.',
  },
  {
    id: 'f_runway_groceries',
    when: { k: 'all', of: [{ k: 'runway', cmp: 'lt', v: 8 }, { k: 'not', p: { k: 'corpse', company: 'hyperchute' } }] },
    text: 'The grocery run gets surgical. Mrs. Delgado slips you a dryer token and pretends she didn’t.',
  },
  {
    id: 'f_runway_invoices',
    when: { k: 'runway', cmp: 'lt', v: 10 },
    text: 'You learn the exact hour the bank posts transactions and are awake for it, refreshing, like it might change its mind.',
  },
  {
    id: 'f_basement',
    when: { k: 'all', of: [{ k: 'runway', cmp: 'lt', v: 5 }, { k: 'not', p: { k: 'corpse', company: 'hyperchute' } }] },
    text: 'You let the apartment go and move back into your parents’ basement. Your old bedroom still has the model rockets. Nobody says anything at dinner, which is its own kind of love.',
  },
  {
    id: 'f_arrears_meter',
    when: { k: 'all', of: [{ k: 'treasury', cmp: 'lt', v: 0 }, { k: 'not', p: { k: 'corpse', company: 'hyperchute' } }] },
    text: 'You’ve started feeding the electricity meter by hand, coin by coin, like the garage is a parking spot for a dream.',
  },
  {
    id: 'f_subletter_hum',
    when: { k: 'flag', scope: 'company', key: 'subletter', cmp: 'eq', v: true },
    text: 'The vinyl cutter downstairs-of-your-upstairs hums all day. Your tenant waves at the shuttle each morning like a coworker. In a way, he is.',
  },
  // ---- stress ------------------------------------------------------------------
  {
    id: 'f_stress_sleep',
    when: { k: 'all', of: [{ k: 'stress', cmp: 'gte', v: 70 }, { k: 'not', p: { k: 'corpse', company: 'hyperchute' } }] },
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
    text: 'You reread one sent email eleven times looking for the mistake in it. There is no mistake. There is only Thursday.',
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
    text: 'Sofia’s test rig acquires a new foam block and a hand-lettered sign: GRAVITY IS NOT A THEORY. Nobody argues.',
  },
  {
    id: 'f_sofia_commits',
    when: { k: 'flag', scope: 'company', key: 'sofia_resolved', cmp: 'eq', v: true },
    text: 'The commit log fills at 2 a.m. with messages like "fall better" and "no". The code keeps shrinking. The landings keep softening.',
  },
  {
    id: 'f_priya_check',
    when: { k: 'met', who: 'priya' },
    text: 'Priya’s weekly check-in is four words or fewer. This week: “Watch your burn.” She is never wrong, which is exhausting.',
  },
  {
    id: 'f_couriers_wave',
    when: { k: 'flag', scope: 'company', key: 'couriers_ally', cmp: 'eq', v: true },
    text: 'A courier waves up at the garage window on her route past. The W-2 crowd started calling the tubes “ours.” You let them.',
  },
  {
    id: 'f_funded_burn',
    when: { k: 'flag', scope: 'company', key: 'angel_funded', cmp: 'eq', v: true },
    text: 'Money in the bank changes the sound of the rain. You order the good connectors without checking the price twice. Only twice.',
  },
  // ---- reputation ---------------------------------------------------------------
  {
    id: 'f_rep_loved',
    when: { k: 'all', of: [{ k: 'rep', cmp: 'gte', v: 3 }, { k: 'not', p: { k: 'corpse', company: 'hyperchute' } }] },
    text: 'Someone stuck a hand-drawn shuttle in the laundromat window, crayon on cardboard. The owner refuses to take it down.',
  },
  {
    id: 'f_rep_cold',
    when: { k: 'all', of: [{ k: 'rep', cmp: 'lte', v: -2 }, { k: 'not', p: { k: 'corpse', company: 'hyperchute' } }] },
    text: 'The barista who used to ask about the railway doesn’t ask anymore. Small city. Long memory.',
  },
  // ---- grey market / storm texture ----------------------------------------------
  {
    id: 'f_grey_van',
    when: { k: 'flag', scope: 'company', key: 'grey_market', cmp: 'eq', v: true },
    text: 'The compliance van does its slow lap of the block. You log its schedule the way it is definitely logging yours.',
  },
  {
    id: 'f_storm_quiet',
    when: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true },
    text: 'The city is quieter around you now — conversations that pause when you enter, feeds you’ve stopped opening. You work. It’s what’s left.',
  },
  {
    id: 'f_storm_letters',
    when: { k: 'flag', scope: 'company', key: 'act3_open', cmp: 'eq', v: true },
    text: 'Mail arrives for the company in colors it never used to: registered, certified, return receipt requested. You sign for all of it.',
  },
  // ---- always-eligible city & garage ambience ------------------------------------
  {
    id: 'f_dryer_heat',
    when: { k: 'not', p: { k: 'corpse', company: 'hyperchute' } },
    text: 'Dryer heat rises through the floorboards at six sharp. The whole company still smells faintly of fabric softener. You’ve stopped minding.',
  },
  {
    id: 'f_meridian_sky',
    when: { k: 'not', p: { k: 'corpse', company: 'hyperchute' } },
    text: 'MERIDIAN’s drones cross the evening sky in perfect intervals, blue lights heading for the hills. You watch one until it isn’t interesting. It takes a while.',
  },
  {
    id: 'f_flats_night',
    when: { k: 'not', p: { k: 'corpse', company: 'hyperchute' } },
    text: 'The Flats does its Friday thing — grills on fire escapes, someone’s speaker two blocks over. The city keeps being worth it.',
  },
  {
    id: 'f_todo_wall',
    text: 'The to-do wall gains nine items and loses four. One of the survivors has been there since the first week. You both know which one.',
  },
  {
    id: 'f_coffee_ledger',
    text: 'Somebody finally does the math on the company’s coffee consumption and presents it at standup as a funding round. Nobody laughs harder than the person who paid for it.',
  },
  {
    id: 'f_small_hours',
    text: 'The building has a sound it only makes at 2 a.m., and you know it the way sailors know their hull. Every company you will ever run has this sound. Only the pitch changes.',
  },
  {
    id: 'f_shuttle_tether',
    when: { k: 'not', p: { k: 'corpse', company: 'hyperchute' } },
    text: 'You tighten the prototype’s tether out of habit, the way other people check their locks. It hasn’t hung crooked in months.',
  },
  {
    id: 'f_citation_list',
    when: { k: 'not', p: { k: 'corpse', company: 'hyperchute' } },
    text: 'The parking citation with the original waiting list on the back lives in a drawer now. You still can’t throw it away.',
  },
  {
    id: 'f_weather',
    when: { k: 'not', p: { k: 'corpse', company: 'hyperchute' } },
    text: 'Weather moves through midweek — real rain, the kind that grounds everything with propellers. The tubes don’t care. It’s a small, private satisfaction.',
  },
  // ---- teleport era ---------------------------------------------------------------
  {
    id: 'f_cape_launch',
    when: { k: 'corpse', company: 'hyperchute' },
    text: 'A booster goes up from the pads south of you, and the hangar roof drums with delay-shifted thunder. Nobody looks up anymore except you.',
  },
  {
    id: 'f_cape_gulls',
    when: { k: 'corpse', company: 'hyperchute' },
    text: 'Gulls nest in the hangar eaves and scream at the forklift. Omid — or his empty bench — has named all of them after journal reviewers.',
  },
  {
    id: 'f_counter_hum',
    when: { k: 'corpse', company: 'hyperchute' },
    text: 'The relay dashboard glows all night in the corner of the floor, handoffs ticking across it like a pulse. You check it the way you used to check the tether.',
  },
  {
    id: 'f_moon_sideways',
    when: { k: 'corpse', company: 'hyperchute' },
    text: 'On the teleop feed the light at the pole comes in sideways, the way it always does, and for a second the whole shift watches an ordinary shadow do something no shadow does on Earth.',
  },
  {
    id: 'f_verge_traffic',
    when: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'met', who: 'salazar' }] },
    text: 'Shackleton Verge’s weekly ops digest arrives at 0400 base time, dry as regolith. Salazar’s only annotation this week: “Adequate.” The team frames it.',
  },
  {
    id: 'f_operator_hands',
    when: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'flag', scope: 'company', key: 'cass_chief', cmp: 'eq', v: true }] },
    text: 'Cass runs the morning calibration with her eyes shut, feeling the delay like tide. The trainees think it’s showing off. It’s prayer.',
  },
  {
    id: 'f_tourist_letters',
    when: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'rep', cmp: 'gte', v: 3 }] },
    text: 'Letters from customers pile in a shoebox by the chair: photos of hands raised against the Earth, thank-yous in shaky cursive. Somebody labels it CARGO, PRICELESS.',
  },
  {
    id: 'f_halcyon_watch',
    when: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'met', who: 'halcyon' }] },
    text: 'HALCYON’s quarterly deck leaks, as it always does. Slide forty-one is about you. It is very polite. You print it and pin it by the door.',
  },
  {
    id: 'f_burn_cape',
    when: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'runway', cmp: 'lt', v: 8 }] },
    text: 'You learn which vending machine at the spaceport still takes coins and what time the good bakery marks things down. Space is glamorous at a distance.',
  },
  {
    id: 'f_june_ledger',
    when: { k: 'all', of: [{ k: 'corpse', company: 'hyperchute' }, { k: 'flag', scope: 'company', key: 'june_seat', cmp: 'eq', v: true }] },
    text: 'June updates WAYS WE DIE on Friday and reads the funniest entry aloud at standup. Morale, she says, is a line item. She budgets for it.',
  },
]

/** Used when several quiet weeks compress into one mark. */
export const BLUR_FILLERS: readonly FillerDef[] = [
  {
    id: 'fb_weeks_blur',
    text: 'The weeks run together — solder, invoices, drops, sleep in that order, most days. Nothing breaks. It almost feels like a trick.',
  },
  {
    id: 'fb_routine',
    text: 'A stretch of weeks with no fires. You use them the way founders do: badly at first, then, reluctantly, to rest.',
  },
  {
    id: 'fb_grind',
    text: 'Quiet weeks stack up like clean laundry. The company gets incrementally better at a hundred things nobody will ever write about.',
  },
]
