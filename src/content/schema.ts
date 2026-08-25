/**
 * Content schema — every scene, choice, character, and ending is typed data.
 * Adding story must never require touching engine code; if it does, this
 * schema is wrong.
 */
import type { Effect } from '../engine/effects'
import type { Pred } from '../engine/predicates'
import type { CompanyId, Standing } from '../engine/types'

export type SceneKind = 'scene' | 'bridge' | 'cutscene'

export interface PrologueBeat {
  kicker?: string
  title?: string
  prose: string
  /** Widescreen cinematic art id (public/art/{art}.webp) shown above the text. Optional — text always carries the screen. */
  art?: string
}

export interface SceneDef {
  id: string
  kind?: SceneKind // default 'scene'
  title: string
  /** Landmark beats keep their big title in the story column; ordinary scenes show only the speaker kicker. */
  landmark?: boolean
  /**
   * World-card art id (public/art/{art}.webp) shown on the scene card instead
   * of the speaker portrait. Purely presentational — if the file is missing,
   * the sigil renders and play continues (art never blocks).
   */
  art?: string
  /** Cutscene-only: multiple film panels, each with its own art and prose.
   *  When present these play in sequence; `prose` remains the transcript record. */
  screens?: readonly PrologueBeat[]
  /** Era divider label written into the transcript when this cutscene ends (e.g. 'YEAR TWO'). */
  marker?: string
  /**
   * Cutscene-only: resolving this scene jumps the company clock forward to
   * this week of the company's life (no-op if already past it). Narrative
   * compression — the months the cutscene summarizes actually pass.
   */
  skipToWeek?: number
  /**
   * Connective arrival prose — one to three sentences of world texture shown
   * dim above the beat, situating why this scene is happening now. Required
   * (by test) on every dealt scene so arrivals never feel like teleports.
   */
  leadIn?: string
  /**
   * Diegetic room tone id (src/content/sound.ts AMBIENCE). The unit is the
   * place, not the scene — rooms recur the way portraits do. Required (by
   * test) on every non-cutscene Hyperchute scene; cutscenes ride the film bed.
   */
  ambience?: string
  /** Authored prose. The LLM render layer decorates later; the game runs on these strings. */
  prose: string
  speaker?: string // character id
  /** Eligibility for random dealing. Omitted = dealt only via goto/enqueue. */
  when?: Pred
  /** Priority scenes deal before the random pool whenever eligible. */
  priority?: boolean
  /** Random-deal weight (default 1). Ignored for priority scenes. */
  weight?: number
  /** If set, once dealt the player has N epochs to answer before lateness penalties. */
  fuseEpochs?: number
  choices: ChoiceDef[]
}

export interface ChoiceDef {
  label: string
  requires?: Pred
  effects: readonly Effect[]
  /** Immediate outcome prose shown after choosing. */
  result?: string
  /** Follow-on scene id, played next. */
  goto?: string
}

export type EndingKind = 'triumph' | 'sale' | 'noble' | 'disgrace' | 'transformation' | 'ruin'

export interface EndingDef {
  id: string
  title: string
  kind: EndingKind
  prose: string
  /** World-card art id (public/art/{art}.webp) shown on the epilogue screen. */
  art?: string
  /** Full-screen film beats played the moment the chapter closes with this
   *  ending, before the epilogue card. Reserved for world-scale exits (IPO). */
  screens?: readonly PrologueBeat[]
  scoreBonus: number
  /** Years skipped between this ending and the next chapter's opening. */
  skipYears?: number
  /** Full-screen interlude: what you did with those years. */
  interlude?: PrologueBeat
}

/** A marquee decision the whole player base gets measured on ("94% of
 *  founders grounded the fleet"). Points at one authored choice. */
export interface SignatureDef {
  scene: string
  choice: number
  /** Past-tense verb phrase completing "N% of founders …". */
  text: string
}

/** Deterministic end-of-chapter badge, evaluated against final true state. */
export interface AchievementDef {
  id: string
  title: string
  desc: string
  when: Pred
}

export interface ChapterDef {
  id: CompanyId
  title: string
  tagline: string
  entry: string // scene id — always queued first, ignores `when`
  /** Enqueued when treasury <= 0; its choices either rescue or end the chapter. */
  insolvency: string
  /** Enqueued when stress hits 100; rest, white-knuckle, or walk away. A second 100 collapses the chapter. */
  burnout: string
  opening: { treasury: number; burn: number; revenue: number }
  /** Full-screen beats shown before the first scene of the chapter. */
  prologue?: readonly PrologueBeat[]
  /** Establishing card before the prologue — film-style place/year, one line
   *  per \n (first line small, rest large). Fades in and out; never skippable. */
  dateline?: string
  scenes: readonly SceneDef[]
  endings: readonly EndingDef[]
  /** Community-stat decisions surfaced on the chapter record screen. */
  signatures?: readonly SignatureDef[]
  /** Badges evaluated when the chapter closes. */
  achievements?: readonly AchievementDef[]
}

export interface CharacterDef {
  id: string
  name: string
  role: string
  blurb: string
  /** Engine-inert; the consult mechanic reads it when that layer ships. */
  hiddenTrait: string
}

export interface Content {
  characters: Record<string, CharacterDef>
  chapters: Record<CompanyId, ChapterDef>
}
