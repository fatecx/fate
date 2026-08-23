import type { ChapterDef } from './schema'
import { makeStubChapter } from './stub-chapter'

// STUB — replaced by authored content in a later phase.
export const SKYLINE: ChapterDef = makeStubChapter({
  id: 'skyline',
  title: 'SKYLINE',
  tagline: 'The road straight up.',
  entryProse:
    'A cable to orbit. The pitch is two words long and the physics is not. Goods first, or humans first, or both at once — three games wearing one elevator. Stub for now.',
  midProse:
    'Tension tests hold at eight percent beyond spec. The anchor station has a waiting list that includes two governments and one eccentric who wants his car up there. Stub middle.',
  opening: { treasury: 2500000, burn: 90000, revenue: 0 },
  ipoGateScore: 22,
})
