import type { ChapterDef } from './schema'
import { makeStubChapter } from './stub-chapter'

// STUB — replaced by authored content in a later phase.
export const ESCAPE: ChapterDef = makeStubChapter({
  id: 'escape',
  title: 'ESCAPE',
  tagline: 'The casino on the Moon.',
  blurb: 'A casino on the Moon that pays for the first town where ordinary people live.',
  entryProse:
    'The last chapter of the biography begins with a gaming license for the Moon and a site survey of Mare Imbrium. Whatever you were before, the Moon only asks what you are now. Stub for now.',
  midProse:
    'The first roulette wheel arrives in its own crate, hand-carried because nobody trusted it to cargo. Earthrise hangs over the pit like a dealer who never blinks. Stub middle.',
  opening: { treasury: 8000000, burn: 260000, revenue: 0 },
  ipoGateScore: 30,
})
