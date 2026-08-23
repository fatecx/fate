import type { ChapterDef } from './schema'
import { makeStubChapter } from './stub-chapter'

// STUB — replaced by authored content in a later phase.
export const TELEPORT: ChapterDef = makeStubChapter({
  id: 'teleport',
  title: 'TELEPORT',
  tagline: 'Be there without going.',
  entryProse:
    'Chapter Two opens with the relay constellation business plan spread across a leased cleanroom floor. Cascading satellites, Mars on the far end, latency engineered down to something the brain forgives. Stub for now.',
  midProse:
    'The first telepresence body on Martian soil moves one finger, then a whole hand, to applause you can feel in your chest four light-minutes too late. Stub middle.',
  opening: { treasury: 400000, burn: 22000, revenue: 0 },
  ipoGateScore: 14,
})
