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
  title: string
  prose: string
}

export interface SceneDef {
  id: string
  kind?: SceneKind // default 'scene'
  title: string
  /** Landmark beats keep their big title in the story column; ordinary scenes show only the speaker kicker. */
  landmark?: boolean
  /**
   * Connective arrival prose — one to three sentences of world texture shown
   * dim above the beat, situating why this scene is happening now. Required
   * (by test) on every dealt scene so arrivals never feel like teleports.
   */
  leadIn?: string
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
  scoreBonus: number
  /** Years skipped between this ending and the next chapter's opening. */
  skipYears?: number
  /** Full-screen interlude: what you did with those years. */
  interlude?: PrologueBeat
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
  scenes: readonly SceneDef[]
  endings: readonly EndingDef[]
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
