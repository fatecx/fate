/**
 * TELEPORT per-scene sound events — ONE diegetic action per scene, 2–4
 * seconds, fired once as the scene arrives. The signature, not the office;
 * the card declining, not the hotel. Music carries the world.
 */
import type { SoundDef } from '../sound'

const E = (t: string): string => `${t} One-shot, close and natural, decays to silence. No music, no voices, no ambience bed.`

export const TELEPORT_SCENE_BEDS: Record<string, SoundDef> = {
  // ---- ACT ONE ----
  t_entry: { id: 'scn_t_entry', gain: 0.4, seconds: 4, prompt: E('A heavy cardboard box of bound printouts lands on a metal table in a big echoing hangar.') },
  t_pact: { id: 'scn_t_pact', gain: 0.4, seconds: 3, prompt: E('A pencil writes three short lines on a legal pad and underlines one, hard.') },
  t_b_first_night: { id: 'scn_t_b_first_night', gain: 0.38, seconds: 4, prompt: E('Two folding chairs scrape close on concrete, a bottle cap cracks open, a vast hangar hushes around them.') },
  t_june_condition: { id: 'scn_t_june_condition', gain: 0.4, seconds: 3, prompt: E('A folder opens flat and one page slides across a table, tapped once for emphasis.') },
  t_b_warroom: { id: 'scn_t_b_warroom', gain: 0.38, seconds: 4, prompt: E('Marker strokes on a huge wall map, tape tearing, a printout smoothed flat against the wall.') },
  t_moon_v_mars: { id: 'scn_t_moon_v_mars', gain: 0.4, seconds: 3, prompt: E('A fist knocks a table twice in debate, papers shuffle, a chair pushes back.') },
  t_b_moon_won: { id: 'scn_t_b_moon_won', gain: 0.36, seconds: 3, prompt: E('A single photograph is pinned to a wall with one push-pin press, then quiet.') },
  t_ray_bodies: { id: 'scn_t_ray_bodies', gain: 0.4, seconds: 4, prompt: E('A requirements sheet turns page by page under a slow whistle, a workshop bench knock.') },
  t_b_bodies_started: { id: 'scn_t_b_bodies_started', gain: 0.4, seconds: 4, prompt: E('A robotic joint whirs through one slow test rotation and parks with a soft servo lock.') },
  t_cascade_test: { id: 'scn_t_cascade_test', gain: 0.4, seconds: 4, prompt: E('A countdown of keyboard clicks, one switch flip, then a telemetry ping returning steady.') },
  t_quote: { id: 'scn_t_quote', gain: 0.4, seconds: 3, prompt: E('A single sheet of paper lands flat in the middle of a table and no one touches it.') },
  t_allin_expo: { id: 'scn_t_allin_expo', gain: 0.4, seconds: 4, prompt: E('A calculator taps out a long sum, then a checkbook tears one check loose.') },
  t_b_expo_eve: { id: 'scn_t_b_expo_eve', gain: 0.38, seconds: 4, prompt: E('A crate pries open with a creak in a hotel loading corridor, packing foam squeaks free.') },
  t_expo_demo: { id: 'scn_t_expo_demo', gain: 0.42, seconds: 4, prompt: E('A chair creaks as someone sits, a robot servo wakes far away, an expo crowd gasps once softly.') },
  t_expo_checks: { id: 'scn_t_expo_checks', gain: 0.4, seconds: 4, prompt: E('Three papers land on a table one after another, each heavier than the last, a pen uncaps.') },
  t_hotel_card: { id: 'scn_t_hotel_card', gain: 0.4, seconds: 3, prompt: E('A card reader buzzes a flat decline tone twice at a quiet front desk.') },
  t_hale_terms: { id: 'scn_t_hale_terms', gain: 0.4, seconds: 3, prompt: E('A thick document drops onto a conference table and slides to a stop, expensive and final.') },
  // ---- ACT TWO ----
  t_salazar_contract: { id: 'scn_t_salazar_contract', gain: 0.4, seconds: 4, prompt: E('A video call connects with a static blip and a light delay echo, papers ready near the mic.') },
  t_cass_hire: { id: 'scn_t_cass_hire', gain: 0.4, seconds: 3, prompt: E('A chair adjusts with precise clicks, hands settle on controls, one calm breath.') },
  t_blend_debate: { id: 'scn_t_blend_debate', gain: 0.38, seconds: 3, prompt: E('A whiteboard marker writes fast, stops, and taps the board three times in argument.') },
  t_indep_seat: { id: 'scn_t_indep_seat', gain: 0.38, seconds: 3, prompt: E('Two resumes land side by side on a boardroom table, one chair rolls forward.') },
  t_aleph_asks: { id: 'scn_t_aleph_asks', gain: 0.38, seconds: 3, prompt: E('A laptop chimes one flat system notification, then a long file-transfer progress hum begins.') },
  t_aleph_forecast: { id: 'scn_t_aleph_forecast', gain: 0.38, seconds: 3, prompt: E('A projector clicks to a slide of numbers, the fan hums, a pen sets down slowly.') },
  t_sofia_return: { id: 'scn_t_sofia_return', gain: 0.4, seconds: 4, prompt: E('A ratchet tightens one bolt in a control bay, then knuckles rap a console twice, familiar.') },
  t_nadia_frame: { id: 'scn_t_nadia_frame', gain: 0.38, seconds: 3, prompt: E('Video scrubbing clicks frame by frame, pauses, and one still frame prints.') },
  t_farrokh_dark: { id: 'scn_t_farrokh_dark', gain: 0.38, seconds: 4, prompt: E('Chalk scratches equations on a board late at night, stops mid-line, a long exhale.') },
  t_farrokh_break: { id: 'scn_t_farrokh_break', gain: 0.4, seconds: 4, prompt: E('A chair pushes back slowly on concrete, a badge and lanyard set down gently on a table.') },
  t_b_farrokh_leaves: { id: 'scn_t_b_farrokh_leaves', gain: 0.38, seconds: 4, prompt: E('A cardboard box is taped shut with two strips, footsteps recede across a hangar floor.') },
  t_jonah: { id: 'scn_t_jonah', gain: 0.42, seconds: 4, prompt: E('A telemetry alarm chirps once and cuts out, followed by absolute radio silence and one shaken breath.') },
  t_telemetry: { id: 'scn_t_telemetry', gain: 0.38, seconds: 4, prompt: E('A recording rewinds with a soft whir and replays the same two seconds, twice, in a silent room.') },
  t_halcyon_squeeze: { id: 'scn_t_halcyon_squeeze', gain: 0.38, seconds: 3, prompt: E('A printer pushes out one machine-generated page at 3 a.m., alone in a dark office.') },
  // ---- ACT THREE ----
  t_father_call: { id: 'scn_t_father_call', gain: 0.38, seconds: 4, prompt: E('An old phone rings twice and is answered, a kitchen clock ticking behind the silence.') },
  t_coup_move: { id: 'scn_t_coup_move', gain: 0.4, seconds: 3, prompt: E('Restaurant cutlery is set down untouched, a napkin folds, a chair shifts with quiet intent.') },
  t_coup_vote: { id: 'scn_t_coup_vote', gain: 0.4, seconds: 4, prompt: E('Footsteps pace a parking garage at night, a car fob chirps, keys turn over in a pocket.') },
  t_coup_win: { id: 'scn_t_coup_win', gain: 0.42, seconds: 4, prompt: E('A boardroom holds its breath, then one gavel-light knock and chairs release around a table.') },
  t_coup_loss: { id: 'scn_t_coup_loss', gain: 0.42, seconds: 4, prompt: E('A single sheet slides across a boardroom table, a badge unclips, a door closes with soft finality.') },
  t_ostra_hearing: { id: 'scn_t_ostra_hearing', gain: 0.38, seconds: 3, prompt: E('Rapid text notifications arrive in flat sequence, a keyboard answers carefully between them.') },
  t_halcyon_offer: { id: 'scn_t_halcyon_offer', gain: 0.4, seconds: 3, prompt: E('A courier envelope unseals with a long zip, a bound deck lands heavy on a desk.') },
  t_listing: { id: 'scn_t_listing', gain: 0.42, seconds: 4, prompt: E('A crowd hushes, then an exchange bell rings out bright and long over rising applause.') },
  t_dark_listing: { id: 'scn_t_dark_listing', gain: 0.4, seconds: 4, prompt: E('An exchange bell rings distantly, heard through glass from an empty side room.') },
  t_commons: { id: 'scn_t_commons', gain: 0.38, seconds: 3, prompt: E('A treaty-thick document stamps once, twice, three times — different hands, one page.') },
  t_endgame: { id: 'scn_t_endgame', gain: 0.38, seconds: 3, prompt: E('A board packet drops on a long table and fans slightly open, futures inside.') },
  // ---- SURVIVAL ----
  t_s_farrokh_loan: { id: 'scn_t_s_farrokh_loan', gain: 0.38, seconds: 3, prompt: E('A personal check tears free slowly, deliberately, and is slid across a kitchen table.') },
  t_s_pawn_body: { id: 'scn_t_s_pawn_body', gain: 0.4, seconds: 4, prompt: E('A dust sheet pulls off with a soft whump, a hand pats a metal shoulder goodbye.') },
  t_s_halcyon_consult: { id: 'scn_t_s_halcyon_consult', gain: 0.38, seconds: 3, prompt: E('A visitor badge prints and clips on, a glass security gate slides open.') },
  t_s_ramen: { id: 'scn_t_s_ramen', gain: 0.38, seconds: 3, prompt: E('A red pen strikes through one line of a list, pauses, then strikes another.') },
  // ---- LATE STUBS ----
  t_insolvency: { id: 'scn_t_insolvency', gain: 0.38, seconds: 4, prompt: E('A payroll notice prints, the printer stops, and a vast hangar is suddenly audible.') },
  t_burnout: { id: 'scn_t_burnout', gain: 0.38, seconds: 4, prompt: E('A blood-pressure cuff releases its air slowly in a quiet exam room, paper crinkles.') },
}
