/**
 * HYPERCHUTE per-scene sound events — ONE diegetic action per scene, 2–4
 * seconds, fired once as the scene arrives. The pour, not the café; the
 * signature, not the office. Music carries the world; these punctuate it.
 *
 * Files render to public/sfx/{id}.mp3 via scripts/audio/generate.mjs.
 * Missing file = silence; sound never blocks.
 */
import type { SoundDef } from '../sound'

const E = (t: string): string => `${t} One-shot, close and natural, decays to silence. No music, no voices, no ambience bed.`

export const HYPERCHUTE_SCENE_BEDS: Record<string, SoundDef> = {
  // ---- ACT ONE ----
  h_seedling: { id: 'scn_h_seedling', gain: 0.4, seconds: 4, prompt: E('Old wooden stairs creak under slow deliberate footsteps, then a paper envelope is set down on a workbench.') },
  h_entry: { id: 'scn_h_entry', gain: 0.4, seconds: 4, prompt: E('A tether rope creaks once as a small hanging machine sways gently, a soft metallic settle.') },
  h_priya_pitch: { id: 'scn_h_priya_pitch', gain: 0.4, seconds: 3, prompt: E('A single sheet of paper slides across a wooden workbench and is tapped flat.') },
  h_b_container: { id: 'scn_h_b_container', gain: 0.4, seconds: 4, prompt: E('A heavy corrugated metal container door unlatches and swings open with a low groan.') },
  h_tomas_terms: { id: 'scn_h_tomas_terms', gain: 0.4, seconds: 4, prompt: E('Coffee pours slowly into two ceramic cups, one after the other, the pot set back down.') },
  h_permit_wall: { id: 'scn_h_permit_wall', gain: 0.38, seconds: 3, prompt: E('A single mouse click, then a quiet exhale in a silent room.') },
  h_hearing: { id: 'scn_h_hearing', gain: 0.4, seconds: 3, prompt: E('A microphone bumps once with a low thud, papers square against a table in a large echoing room.') },
  h_june_via_tomas: { id: 'scn_h_june_via_tomas', gain: 0.4, seconds: 3, prompt: E('A workbench being cleared quickly: tools gathered and set aside, a chair pulled out.') },
  h_june_cold: { id: 'scn_h_june_cold', gain: 0.38, seconds: 3, prompt: E('A phone vibrates twice against wood, then a notification chime muffled in a pocket.') },
  h_june_term: { id: 'scn_h_june_term', gain: 0.4, seconds: 3, prompt: E('A term sheet slides across wood and a pen cap clicks open once.') },
  h_first_drops_clean: { id: 'scn_h_first_drops_clean', gain: 0.4, seconds: 4, prompt: E('A soft pneumatic hiss from above, then a parcel lands gently on a porch mat.') },
  h_first_drops_rogue: { id: 'scn_h_first_drops_rogue', gain: 0.4, seconds: 4, prompt: E('A quiet electric motor passes overhead in the dark, then a soft parcel thud on wood.') },
  h_sofia_hire: { id: 'scn_h_sofia_hire', gain: 0.4, seconds: 3, prompt: E('A precision tool is picked up, inspected, and set down exactly where it was.') },
  h_marcus_card: { id: 'scn_h_marcus_card', gain: 0.4, seconds: 4, prompt: E('An expensive car door closes with a soft thunk, unhurried footsteps approach on pavement.') },
  h_nadia_call: { id: 'scn_h_nadia_call', gain: 0.38, seconds: 3, prompt: E('A phone buzzes once and is picked up off a wooden bench mid-vibration.') },
  h_act1_close: { id: 'scn_h_act1_close', gain: 0.38, seconds: 4, prompt: E('A mug is set down on wood and a chair leans back with a slow creak in a quiet room.') },
  h_file_pilot: { id: 'scn_h_file_pilot', gain: 0.4, seconds: 4, prompt: E('A winch cycles once — smooth motor descent, a soft stop — and a stopwatch clicks.') },
  h_b_filing: { id: 'scn_h_b_filing', gain: 0.38, seconds: 3, prompt: E('A printer feeds and cuts one page, which is pulled free and squared.') },
  h_b_advisor_hunt: { id: 'scn_h_b_advisor_hunt', gain: 0.4, seconds: 3, prompt: E('An espresso machine hisses one short pour into a small cup, a saucer clinks.') },
  h_b_paper_first: { id: 'scn_h_b_paper_first', gain: 0.38, seconds: 3, prompt: E('Heavy document pages turn twice, a highlighter cap pops.') },
  h_b_priya_signed: { id: 'scn_h_b_priya_signed', gain: 0.4, seconds: 3, prompt: E('A pen signs one line of paper on a hard surface and taps a period.') },
  h_b_priya_waitlist: { id: 'scn_h_b_priya_waitlist', gain: 0.36, seconds: 3, prompt: E('A sheet of paper is pinned to a corkboard with one firm push-pin press.') },
  h_b_priya_alone: { id: 'scn_h_b_priya_alone', gain: 0.36, seconds: 4, prompt: E('A lamp switch clicks in a quiet room, a chair settles.') },
  h_b_papered: { id: 'scn_h_b_papered', gain: 0.38, seconds: 3, prompt: E('A stapler presses once through a document stack, the stack is tapped square.') },
  h_b_rolodex: { id: 'scn_h_b_rolodex', gain: 0.4, seconds: 3, prompt: E('A rolodex spins with fluttering cards and stops, a desk phone is lifted.') },
  h_b_diy: { id: 'scn_h_b_diy', gain: 0.38, seconds: 3, prompt: E('Fast confident keyboard typing ends with one decisive stroke.') },
  h_b_appeal_prep: { id: 'scn_h_b_appeal_prep', gain: 0.38, seconds: 4, prompt: E('A thick stack of pages is jogged into alignment and bound with a paper clamp.') },
  h_b_rogue_nights: { id: 'scn_h_b_rogue_nights', gain: 0.38, seconds: 4, prompt: E('A quiet electric motor lifts away into night air, fading, a distant first bird.') },
  h_b_corridor_granted: { id: 'scn_h_b_corridor_granted', gain: 0.4, seconds: 3, prompt: E('A map tube pops open and a chart unrolls across a table.') },
  h_b_first_corridor: { id: 'scn_h_b_first_corridor', gain: 0.4, seconds: 3, prompt: E('A rubber stamp presses paper once, firm and official, in a large quiet room.') },
  h_b_wired: { id: 'scn_h_b_wired', gain: 0.38, seconds: 3, prompt: E('A single soft banking chime from a laptop, then a long relieved exhale.') },
  h_b_bootstrap: { id: 'scn_h_b_bootstrap', gain: 0.38, seconds: 4, prompt: E('A pot lid settles over simmering water, calculator keys tap three times.') },
  h_b_scale_strain: { id: 'scn_h_b_scale_strain', gain: 0.4, seconds: 4, prompt: E('A cooling fan spins up under load and a small servo stutters once before catching.') },
  h_b_grey_strain: { id: 'scn_h_b_grey_strain', gain: 0.4, seconds: 4, prompt: E('Wind gusts once against a window frame, a test rig cycles with a brief hesitation.') },
  h_b_sofia_settled: { id: 'scn_h_b_sofia_settled', gain: 0.4, seconds: 3, prompt: E('A shuttle drops onto foam blocks with a soft engineered thump, one satisfied knuckle rap on wood.') },
  h_b_after_vale: { id: 'scn_h_b_after_vale', gain: 0.4, seconds: 4, prompt: E('A luxury car pulls away from a curb, engine note fading down a quiet street.') },
  h_b_after_nadia: { id: 'scn_h_b_after_nadia', gain: 0.36, seconds: 3, prompt: E('A notebook snaps shut somewhere close, a pen clicks retracted.') },
  // ---- ACT TWO ----
  h_price_war: { id: 'scn_h_price_war', gain: 0.4, seconds: 3, prompt: E('A staple gun fixes a poster to a wooden pole with two hard clacks.') },
  h_couriers: { id: 'scn_h_couriers', gain: 0.4, seconds: 3, prompt: E('A bicycle rolls to a stop, its freewheel ticking, and a letter is held out with a paper snap.') },
  h_strike: { id: 'scn_h_strike', gain: 0.4, seconds: 4, prompt: E('A distant crowd chant swells once and fades, a picket sign knocks against another.') },
  h_permit_war: { id: 'scn_h_permit_war', gain: 0.4, seconds: 3, prompt: E('A certified envelope tears open, the letter unfolds with stiff paper crackle.') },
  h_fresno: { id: 'scn_h_fresno', gain: 0.4, seconds: 4, prompt: E('A desk phone rings twice in a big metal building and stops mid-third-ring.') },
  h_poach_sofia: { id: 'scn_h_poach_sofia', gain: 0.4, seconds: 3, prompt: E('An old landline receiver is hung up hard, the bell inside protesting faintly.') },
  h_viral: { id: 'scn_h_viral', gain: 0.4, seconds: 4, prompt: E('Several phones buzz against wood in overlapping waves, one chimes bright.') },
  h_series_a: { id: 'scn_h_series_a', gain: 0.4, seconds: 3, prompt: E('A leather folio unzips around three sides and opens flat on a conference table.') },
  h_board: { id: 'scn_h_board', gain: 0.4, seconds: 3, prompt: E('Two document stacks land on a table, one after the other, followed by a pen tap.') },
  h_b_after_pricewar: { id: 'scn_h_b_after_pricewar', gain: 0.38, seconds: 3, prompt: E('A porch door opens and a parcel is picked up off the mat.') },
  h_b_after_couriers: { id: 'scn_h_b_after_couriers', gain: 0.38, seconds: 3, prompt: E('A thermos cup is poured and passed, a bike bell rings once, friendly.') },
  h_b_after_strike: { id: 'scn_h_b_after_strike', gain: 0.38, seconds: 4, prompt: E('A broom sweeps pavement twice, a stack of picket signs is leaned against a wall.') },
  h_b_after_audit: { id: 'scn_h_b_after_audit', gain: 0.38, seconds: 3, prompt: E('A filing drawer rolls shut with a metal click, a folder drops flat on top.') },
  h_b_after_fresno: { id: 'scn_h_b_after_fresno', gain: 0.4, seconds: 4, prompt: E('Pallet wrap stretches around boxes twice and tears off, a clipboard pen scratches a checkmark.') },
  h_b_after_poach: { id: 'scn_h_b_after_poach', gain: 0.36, seconds: 3, prompt: E('A keyboard resumes typing after a silence, steady and unhurried.') },
  h_b_after_viral: { id: 'scn_h_b_after_viral', gain: 0.36, seconds: 3, prompt: E('A phone is set face-down on wood with a final deliberate tap.') },
  h_b_after_a: { id: 'scn_h_b_after_a', gain: 0.38, seconds: 3, prompt: E('A conference chair rolls to a table and settles, a laptop opens with a soft click.') },
  h_b_after_indep: { id: 'scn_h_b_after_indep', gain: 0.36, seconds: 4, prompt: E('Rain begins against a window, a ledger book closes with a soft thud.') },
  // ---- ACT THREE ----
  h_accident: { id: 'scn_h_accident', gain: 0.42, seconds: 4, prompt: E('Police tape flutters and snaps once in wind, a distant siren passes and fades.') },
  h_press_storm: { id: 'scn_h_press_storm', gain: 0.4, seconds: 3, prompt: E('A phone buzzes urgently twice on a café table, a cup is set down hard beside it.') },
  h_sofia_verdict: { id: 'scn_h_sofia_verdict', gain: 0.38, seconds: 4, prompt: E('Printout pages shuffle slowly, a cold coffee mug is moved aside on a workbench.') },
  h_suspension: { id: 'scn_h_suspension', gain: 0.42, seconds: 3, prompt: E('A gavel strikes twice in a packed hall, the room shifts and hushes.') },
  h_offer: { id: 'scn_h_offer', gain: 0.4, seconds: 4, prompt: E('Light rain on a skylight, a folder lands flat on a workbench with quiet weight.') },
  h_war_room: { id: 'scn_h_war_room', gain: 0.4, seconds: 3, prompt: E('A whiteboard marker squeaks one hard line and caps shut, chairs drag close.') },
  h_ipo_road: { id: 'scn_h_ipo_road', gain: 0.4, seconds: 3, prompt: E('A projector fan spins up and a slide clicker advances once in a hotel room.') },
  h_last_stand: { id: 'scn_h_last_stand', gain: 0.4, seconds: 3, prompt: E('A marker crosses one box off a whiteboard grid with a single squeak.') },
  // ---- SURVIVAL ----
  h_sublet: { id: 'scn_h_sublet', gain: 0.4, seconds: 4, prompt: E('A tape measure extends and retracts with a zip-snap, boxes slide across a floor.') },
  h_fare: { id: 'scn_h_fare', gain: 0.4, seconds: 4, prompt: E('A transit train arrives and departs, doors chiming, leaving a platform quiet.') },
  h_last_fifteen: { id: 'scn_h_last_fifteen', gain: 0.4, seconds: 3, prompt: E('A coin drops into a metal meter slot and a dial cranks once.') },
  h_plastic: { id: 'scn_h_plastic', gain: 0.4, seconds: 4, prompt: E('Three envelopes tear open one after another, a plastic card snaps free of adhesive.') },
  h_b_coffee_shop: { id: 'scn_h_b_coffee_shop', gain: 0.4, seconds: 3, prompt: E('A café door opens with a small brass bell, warmth and murmur swelling for a moment.') },
  h_ghost_check: { id: 'scn_h_ghost_check', gain: 0.4, seconds: 4, prompt: E('A fountain pen signs paper against window glass with two confident strokes, a handshake pat follows.') },
  h_ghost_dies_spent: { id: 'scn_h_ghost_dies_spent', gain: 0.38, seconds: 4, prompt: E('A phone call ends with a soft disconnect tone, the phone set down slowly on a table.') },
  h_ghost_dies_clean: { id: 'scn_h_ghost_dies_clean', gain: 0.38, seconds: 4, prompt: E('A ledger page turns calmly under lamplight, a pencil makes one small note.') },
  // ---- LATE STUBS ----
  h_insolvency: { id: 'scn_h_insolvency', gain: 0.38, seconds: 4, prompt: E('A banking app refresh whooshes once to silence, a chair pushes slowly back.') },
  h_burnout: { id: 'scn_h_burnout', gain: 0.38, seconds: 4, prompt: E('A clock ticks slightly too loud, one page turns, a long tired breath.') },
}
