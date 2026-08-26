/**
 * HYPERCHUTE per-scene soundscapes — one bespoke bed per scene, each anchored
 * in its room's family so the garage stays the garage across fourteen visits
 * while every visit is differently lit. Claim-free texture: soft, blended,
 * nothing sudden, nothing the prose could contradict.
 *
 * Files render to public/sfx/{id}.mp3 via scripts/audio/generate.mjs; the
 * engine falls back to the scene's room bed, then silence. Sound never blocks.
 */
import type { SoundDef } from '../sound'

const P = (t: string): string =>
  `${t} Soft, blended, nothing sudden, no distinct animal or alarm sounds. Seamless loop, no music, no voices.`

export const HYPERCHUTE_SCENE_BEDS: Record<string, SoundDef> = {
  // ---- ACT ONE ----
  h_seedling: {
    id: 'scn_h_seedling', gain: 0.5,
    prompt: P('Morning workshop garage over a laundromat: warm tumble dryers through the floorboards, a soldering iron resting hot, kettle steam, the building waking up.'),
  },
  h_entry: {
    id: 'scn_h_entry', gain: 0.5,
    prompt: P('Quiet workshop garage, first day: a tether line creaking gently as a small machine sways, faint electronics idle, dust in still air, dryers murmuring far below.'),
  },
  h_priya_pitch: {
    id: 'scn_h_priya_pitch', gain: 0.5,
    prompt: P('Workshop garage with the street window cracked open: neighborhood morning drifting in, dryers below, papers moving on a bench, two chairs pulled close.'),
  },
  h_b_container: {
    id: 'scn_h_b_container', gain: 0.5,
    prompt: P('Downtown container yard, midday: gravel underfoot ambience, distant freight movement, chain-link fence breathing in wind, city traffic a block away.'),
  },
  h_tomas_terms: {
    id: 'scn_h_tomas_terms', gain: 0.5,
    prompt: P('Converted shipping-container law office: rain-thin metal walls, a window AC unit, coffee being poured slowly into two cups, papers squared on a desk.'),
  },
  h_permit_wall: {
    id: 'scn_h_permit_wall', gain: 0.5,
    prompt: P('Workshop garage, early Tuesday: computer fan whir close, one refresh-click of a mouse, dryers below not yet busy, the flat quiet of bad news on a screen.'),
  },
  h_hearing: {
    id: 'scn_h_hearing', gain: 0.5,
    prompt: P('Municipal hearing room 4-B: big HVAC breathing, hard chairs shifting, a folder opening, water poured into a glass at a long table, procedural hush.'),
  },
  h_june_via_tomas: {
    id: 'scn_h_june_via_tomas', gain: 0.5,
    prompt: P('Workshop garage tidied for a visitor: bench cleared, one chair set out, dryers below, the small nervous quiet of a room waiting for someone important.'),
  },
  h_june_cold: {
    id: 'scn_h_june_cold', gain: 0.5,
    prompt: P('Workshop garage at dusk: laptop fans, the soft repeated buzz of notifications arriving muted on a bench, dryers winding down below, evening settling in.'),
  },
  h_june_term: {
    id: 'scn_h_june_term', gain: 0.5,
    prompt: P('Workshop garage, papers on the bench: a term sheet being slid across wood, a pen cap clicked once, dryers below, held-breath negotiation quiet.'),
  },
  h_first_drops_clean: {
    id: 'scn_h_first_drops_clean', gain: 0.5,
    prompt: P('Residential street before dawn: pre-morning hush, a soft electric hum holding steady overhead, a light breeze, one porch light buzzing faintly, the city still asleep.'),
  },
  h_first_drops_rogue: {
    id: 'scn_h_first_drops_rogue', gain: 0.5,
    prompt: P('Rooftops at first light: wind over shingles, a quiet electric motor holding position above, distant earliest traffic, the nervous quiet of doing something unpermitted.'),
  },
  h_sofia_hire: {
    id: 'scn_h_sofia_hire', gain: 0.5,
    prompt: P('Workshop garage mid-interview: a small test rig ticking through cycles on the bench, tools being turned over and inspected, dryers below, appraising silence between questions.'),
  },
  h_marcus_card: {
    id: 'scn_h_marcus_card', gain: 0.5,
    prompt: P('Street below a laundromat: an expensive engine idling smoothly at the curb, laundromat warmth spilling out the door, neighborhood watching without watching.'),
  },
  h_nadia_call: {
    id: 'scn_h_nadia_call', gain: 0.5,
    prompt: P('Workshop garage, evening phone call: close phone-speaker room tone, a chair leaned back, dryers below gone quiet, the careful stillness of choosing words.'),
  },
  h_act1_close: {
    id: 'scn_h_act1_close', gain: 0.5,
    prompt: P('Workshop garage at night, three months in: machines resting warm, a mug set down on wood, the building settling, dryer drums cooling and ticking below.'),
  },
  h_file_pilot: {
    id: 'scn_h_file_pilot', gain: 0.5,
    prompt: P('Workshop garage, repetition made boring: a winch cycling smoothly up and down, a stopwatch clicked, notes scratched on a clipboard, dryers steady below.'),
  },
  h_b_filing: {
    id: 'scn_h_b_filing', gain: 0.5,
    prompt: P('Workshop garage, late paperwork: a form being filled by hand, printer warming and feeding one page, dryers below, municipal tedium in a hopeful key.'),
  },
  h_b_advisor_hunt: {
    id: 'scn_h_b_advisor_hunt', gain: 0.5,
    prompt: P('Coffee shop between meetings: soft crowd murmur, an espresso machine working gently in the background, a laptop bag unzipped, chairs drawn to a small table.'),
  },
  h_b_paper_first: {
    id: 'scn_h_b_paper_first', gain: 0.5,
    prompt: P('Small legal office, reading hour: pages of a long document turning steadily, an AC unit cycling, a highlighter cap popped, dense procedural quiet.'),
  },
  h_b_priya_signed: {
    id: 'scn_h_b_priya_signed', gain: 0.5,
    prompt: P('Workshop garage after a handshake: two coffee cups half-finished, a folder closed with a soft pat, dryers below, the settled warmth of a deal done right.'),
  },
  h_b_priya_waitlist: {
    id: 'scn_h_b_priya_waitlist', gain: 0.5,
    prompt: P('Workshop garage, alone again: a list pinned to corkboard rustling under a fan, dryers below, the mild deflation of a maybe that was almost a yes.'),
  },
  h_b_priya_alone: {
    id: 'scn_h_b_priya_alone', gain: 0.5,
    prompt: P('Workshop garage late at night: one lamp buzzing softly, tools put away one by one, the city distant through a closed window, self-reliant solitude.'),
  },
  h_b_papered: {
    id: 'scn_h_b_papered', gain: 0.5,
    prompt: P('Small office, documents executed: a stack of signed pages tapped square on a desk, a stapler pressed once, AC hum, the dry satisfaction of being real on paper.'),
  },
  h_b_rolodex: {
    id: 'scn_h_b_rolodex', gain: 0.5,
    prompt: P('Container office, calls being made: a desk phone lifted and set down between conversations, card stock flipped through, AC hum, doors opening across a city.'),
  },
  h_b_diy: {
    id: 'scn_h_b_diy', gain: 0.5,
    prompt: P('Night interior, templates hour: laptop keys pattering in bursts, a printer chunking pages, a mug refilled, the overconfident quiet of doing law yourself.'),
  },
  h_b_appeal_prep: {
    id: 'scn_h_b_appeal_prep', gain: 0.5,
    prompt: P('Night interior, forty pages of hope: steady keyboard work, pages proofed and turned, a clock ticking softly, coffee gone cold and remade.'),
  },
  h_b_rogue_nights: {
    id: 'scn_h_b_rogue_nights', gain: 0.5,
    prompt: P('Rooftop before dawn, repeated: wind low over roofs, a small motor passing quietly overhead at intervals, first birds far away, adrenaline going routine.'),
  },
  h_b_corridor_granted: {
    id: 'scn_h_b_corridor_granted', gain: 0.5,
    prompt: P('Neighborhood street, a line drawn on a map above it: open air, light morning traffic, a breeze carrying laundromat warmth, quiet civic victory.'),
  },
  h_b_first_corridor: {
    id: 'scn_h_b_first_corridor', gain: 0.5,
    prompt: P('Municipal office counter: a stamp pressed onto paper once, papers slid under glass, HVAC hush, footsteps on polished floor departing lighter than they came.'),
  },
  h_b_wired: {
    id: 'scn_h_b_wired', gain: 0.5,
    prompt: P('Workshop garage, the account refreshed: a laptop chime-adjacent silence, a slow exhale of relief, dryers below, money changing what the room feels like.'),
  },
  h_b_bootstrap: {
    id: 'scn_h_b_bootstrap', gain: 0.5,
    prompt: P('Night interior, ramen math: a pot simmering on a hotplate, a calculator tapped, paper edges aligned, the frugal quiet of counting weeks on one hand.'),
  },
  h_b_scale_strain: {
    id: 'scn_h_b_scale_strain', gain: 0.5,
    prompt: P('Workshop garage under load: several small machines cycling slightly out of sync, a cooling fan working hard, dryers below, growth sounding like strain.'),
  },
  h_b_grey_strain: {
    id: 'scn_h_b_grey_strain', gain: 0.5,
    prompt: P('Workshop garage, thin margins: wind pressing the window, a rig cycling with an occasional hesitation, breath held between test runs, roofs waiting outside.'),
  },
  h_b_sofia_settled: {
    id: 'scn_h_b_sofia_settled', gain: 0.5,
    prompt: P('Workshop garage, two engineers now: foam blocks thumped softly by a test drop, a second bench being arranged, dryers below, competence doubling the room.'),
  },
  h_b_after_vale: {
    id: 'scn_h_b_after_vale', gain: 0.5,
    prompt: P('Street outside the laundromat, after the black car: engine note fading down the block, neighborhood exhaling back to normal, the changed feeling of being seen.'),
  },
  h_b_after_nadia: {
    id: 'scn_h_b_after_nadia', gain: 0.5,
    prompt: P('Workshop garage, after the call: a notebook closed somewhere across the city, dryers below, the specific quiet of words already on the record.'),
  },
  // ---- ACT TWO ----
  h_price_war: {
    id: 'scn_h_price_war', gain: 0.5,
    prompt: P('Contested neighborhood street: busier traffic than before, competing delivery activity in the distance, staple guns on lampposts far off, commerce as combat.'),
  },
  h_couriers: {
    id: 'scn_h_couriers', gain: 0.5,
    prompt: P('Street by the courier benches: bike wheels ticking past, a group of people standing together in formal quiet, an envelope changing hands, respectful tension.'),
  },
  h_strike: {
    id: 'scn_h_strike', gain: 0.5,
    prompt: P('Picket line half a block away: crowd murmur in waves, sign sticks knocking softly, a whistle far off, morning routes conspicuously not happening.'),
  },
  h_permit_war: {
    id: 'scn_h_permit_war', gain: 0.5,
    prompt: P('Workshop garage under audit: unfamiliar careful footsteps on the floorboards, binders opened and compared, a camera shutter once, dryers below trying to sound innocent.'),
  },
  h_fresno: {
    id: 'scn_h_fresno', gain: 0.5,
    prompt: P('Aerostructures fabrication floor: big-room machining wash, gantry movement far away, compressed air in short bursts, the specific quiet of a production slot slipping.'),
  },
  h_poach_sofia: {
    id: 'scn_h_poach_sofia', gain: 0.5,
    prompt: P('Workshop garage, the landline problem: an old phone ringer silenced mid-ring, a bench chair turned around for a real conversation, dryers below, loyalty being weighed.'),
  },
  h_viral: {
    id: 'scn_h_viral', gain: 0.5,
    prompt: P('Workshop garage at 3:12 p.m.: several phones buzzing against wood in overlapping waves, laptop fans spinning up, dryers below, the vertigo of sudden attention.'),
  },
  h_series_a: {
    id: 'scn_h_series_a', gain: 0.5,
    prompt: P('Borrowed conference room: leather folio unzipped, water glasses on a long table, HVAC hush, expensive pens uncapped, term-sheet gravity in the air.'),
  },
  h_board: {
    id: 'scn_h_board', gain: 0.5,
    prompt: P('Law office late: document drafts shuffled and compared across a table, tracked-changes keyboard bursts, AC hum, the future being negotiated a clause at a time.'),
  },
  h_b_after_pricewar: {
    id: 'scn_h_b_after_pricewar', gain: 0.5,
    prompt: P('Neighborhood street in the trenches: two rival delivery sounds sharing one sky, porch conversations in the distance, loyalty audible in which doors open.'),
  },
  h_b_after_couriers: {
    id: 'scn_h_b_after_couriers', gain: 0.5,
    prompt: P('Street by the benches, after the answer: bikes rolling out on schedule again, a thermos shared, the eased quiet of a workforce that got its letter back.'),
  },
  h_b_after_strike: {
    id: 'scn_h_b_after_strike', gain: 0.5,
    prompt: P('Street after the pickets: signs stacked against a wall, normal traffic returning cautiously, brooms on pavement, a neighborhood remembering how this went.'),
  },
  h_b_after_audit: {
    id: 'scn_h_b_after_audit', gain: 0.5,
    prompt: P('Office, paper weather: filing drawers rolled shut, a scanner feeding pages, AC hum, compliance settling over everything like fine dust.'),
  },
  h_b_after_fresno: {
    id: 'scn_h_b_after_fresno', gain: 0.5,
    prompt: P('Loading dock, supply lines: a truck reversing gently to a bay far off, pallet wrap stretched, clipboard checkmarks, logistics breathing again.'),
  },
  h_b_after_poach: {
    id: 'scn_h_b_after_poach', gain: 0.5,
    prompt: P('Workshop garage, after the letter: one bench lamp on, a keyboard resuming its rhythm, dryers below, the room holding whoever chose to stay.'),
  },
  h_b_after_viral: {
    id: 'scn_h_b_after_viral', gain: 0.5,
    prompt: P('Workshop garage, attention aftermath: phones set face-down at last, a window cracked for air, the street below newly curious, fame cooling to workload.'),
  },
  h_b_after_a: {
    id: 'scn_h_b_after_a', gain: 0.5,
    prompt: P('Office, governance arrives: a boardroom table wiped clean, chairs counted and aligned, a video-call chime tested once, adulthood installing itself.'),
  },
  h_b_after_indep: {
    id: 'scn_h_b_after_indep', gain: 0.5,
    prompt: P('Night interior, the whole thing kept: rain beginning against glass, a ledger closed, one lamp, the weight and the freedom of owing nobody an answer.'),
  },
  // ---- ACT THREE ----
  h_accident: {
    id: 'scn_h_accident', gain: 0.5,
    prompt: P('Cordoned residential street at dusk: wind over pavement, tape flickering against a lamppost, a distant siren passing once and gone, radios murmuring far off, grief-heavy stillness.'),
  },
  h_press_storm: {
    id: 'scn_h_press_storm', gain: 0.5,
    prompt: P('Coffee shop under siege quiet: espresso machine working softly, a notebook opened flat, murmur subdued like everyone is listening, news vans idling outside the glass.'),
  },
  h_sofia_verdict: {
    id: 'scn_h_sofia_verdict', gain: 0.5,
    prompt: P('Workshop garage at 6 a.m.: printouts shifting on a bench, cold coffee moved aside, a chair pulled close, dryers not yet started, a hard conversation beginning gently.'),
  },
  h_suspension: {
    id: 'scn_h_suspension', gain: 0.5,
    prompt: P('Hearing room 4-B, packed session: full-gallery presence breathing behind you, chairs creaking under weight, papers aligned at a microphone, procedural stakes at maximum.'),
  },
  h_offer: {
    id: 'scn_h_offer', gain: 0.5,
    prompt: P('Workshop garage on a quiet Sunday: rain light on the skylight, a folder set down on a workbench, two men and one decision, the street below empty and listening.'),
  },
  h_war_room: {
    id: 'scn_h_war_room', gain: 0.5,
    prompt: P('Workshop garage at night, everyone present: markers squeaking on a whiteboard, takeout containers opened, chairs dragged into a circle, dryers off, resolve gathering.'),
  },
  h_ipo_road: {
    id: 'scn_h_ipo_road', gain: 0.5,
    prompt: P('Hotel conference suite, city eleven of nine days: projector fan, ice settling in glasses, a suitcase zipped in the corridor, jet-lag hush between pitches.'),
  },
  h_last_stand: {
    id: 'scn_h_last_stand', gain: 0.5,
    prompt: P('Workshop garage, ninety boxes on a whiteboard: one box crossed out with a squeak, night traffic distant, machines resting, a small team breathing like a crew before weather.'),
  },
  // ---- SURVIVAL ----
  h_sublet: {
    id: 'scn_h_sublet', gain: 0.5,
    prompt: P('Workshop garage being measured for sharing: a tape measure retracting, boxes slid across the floor, a vinyl cutter test-run next door, pride negotiating with rent.'),
  },
  h_fare: {
    id: 'scn_h_fare', gain: 0.5,
    prompt: P('Transit platform: a train arriving and leaving without you, fare gates cycling for other people, announcements too distant to parse, pocket-change arithmetic.'),
  },
  h_last_fifteen: {
    id: 'scn_h_last_fifteen', gain: 0.5,
    prompt: P('Workshop garage on the coin meter: the meter ticking toward dark, a coin turned over on a bench, dryers below indifferent, hunger doing quiet math.'),
  },
  h_plastic: {
    id: 'scn_h_plastic', gain: 0.5,
    prompt: P('Night kitchen table: three envelopes opened one by one, cards snapped from adhesive, a calculator tapped slowly, the seductive hush of borrowed time.'),
  },
  h_b_coffee_shop: {
    id: 'scn_h_b_coffee_shop', gain: 0.5,
    prompt: P('Coffee shop doorway to table: steamed-window warmth, murmur folding around you, a chair pulled out in welcome, an idling engine faint outside the glass.'),
  },
  h_ghost_check: {
    id: 'scn_h_ghost_check', gain: 0.5,
    prompt: P('Coffee shop, the good table: cups refilled, a napkin smoothed flat for a sketch, murmur politely pretending not to listen, a fountain pen resting ready.'),
  },
  h_ghost_dies_spent: {
    id: 'scn_h_ghost_dies_spent', gain: 0.5,
    prompt: P('Night interior, the wire that never was: a phone set down after the last call, a hiring plan face-up on the table, rain starting, promises curdling into arithmetic.'),
  },
  h_ghost_dies_clean: {
    id: 'scn_h_ghost_dies_clean', gain: 0.5,
    prompt: P('Night interior, the wire that never was: a ledger reviewed calmly by lamplight, a page turned without flinching, rain starting, discipline holding the room together.'),
  },
  // ---- LATE STUBS ----
  h_insolvency: {
    id: 'scn_h_insolvency', gain: 0.5,
    prompt: P('Night interior at zero: a banking app refreshed once more, a chair pushed slowly back, the building silent, the specific stillness after money runs out.'),
  },
  h_burnout: {
    id: 'scn_h_burnout', gain: 0.5,
    prompt: P('Night interior, the body keeping score: a clock ticking slightly too loud, shallow breathing, a page read four times, exhaustion pressing on the walls.'),
  },
}
