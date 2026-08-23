import type { CompanyId } from '../engine/types'
import type { ChapterDef, EndingDef, SceneDef } from './schema'

/**
 * Factory for STUB chapters 2–4. They exist so the engine plays full
 * biographies today; each is replaced by authored content in later phases.
 */
export function makeStubChapter(cfg: {
  id: CompanyId
  title: string
  tagline: string
  entryProse: string
  midProse: string
  opening: { treasury: number; burn: number; revenue: number }
  ipoGateScore: number
}): ChapterDef {
  const p = cfg.id[0]
  const scenes: readonly SceneDef[] = [
    {
      id: `${p}_entry`,
      title: `${cfg.title} — CHAPTER OPEN (STUB)`,
      prose: cfg.entryProse,
      choices: [
        {
          label: 'Go loud — announce before you’re ready',
          effects: [
            { e: 'stress', d: 6 },
            { e: 'rep', d: 1 },
            { e: 'score', d: 1 },
            { e: 'flag', scope: 'company', key: 'started', v: true },
          ],
          goto: `${p}_mid`,
          result: 'Placeholder boldness.',
        },
        {
          label: 'Go quiet — build in secret first',
          effects: [
            { e: 'stress', d: -2 },
            { e: 'score', d: 1 },
            { e: 'flag', scope: 'company', key: 'started', v: true },
          ],
          goto: `${p}_mid`,
          result: 'Placeholder patience.',
        },
      ],
    },
    {
      id: `${p}_mid`,
      title: `${cfg.title} — THE LONG MIDDLE (STUB)`,
      when: { k: 'all', of: [{ k: 'flag', scope: 'company', key: 'started', cmp: 'eq', v: true }] },
      priority: true,
      prose: cfg.midProse,
      choices: [
        {
          label: 'Ride for the listing',
          requires: { k: 'score', cmp: 'gte', v: cfg.ipoGateScore },
          effects: [{ e: 'end', ending: 'triumph' }],
        },
        {
          label: 'Sell to the highest bidder',
          effects: [{ e: 'end', ending: 'sale' }],
        },
        {
          label: 'Keep building until the biography decides',
          effects: [{ e: 'stress', d: 3 }],
          result: 'The placeholder road goes on.',
        },
      ],
    },
    {
      id: `${p}_insolvency`,
      title: `${cfg.title} — RUNWAY ZERO`,
      prose:
        'The account reads zero and the silence that follows is specific to founders. Stub rescue: take the bridge, or let it end.',
      choices: [
        {
          label: 'Bridge loan against everything',
          requires: { k: 'not', p: { k: 'flag', scope: 'company', key: 'bridge_used', cmp: 'eq', v: true } },
          effects: [
            { e: 'treasury', d: 250000 },
            { e: 'stress', d: 12 },
            { e: 'flag', scope: 'company', key: 'bridge_used', v: true },
          ],
          result: 'Signed against everything you have, which is now nothing but time.',
        },
        {
          label: 'Let it end',
          effects: [{ e: 'end', ending: 'bankrupt' }],
        },
      ],
    },
  ]

  const endings: readonly EndingDef[] = [
    {
      id: 'triumph',
      title: `${cfg.title} — TRIUMPH (STUB)`,
      kind: 'triumph',
      scoreBonus: 10,
      prose: 'Placeholder triumph. The real ending arrives with this chapter’s authoring phase.',
    },
    {
      id: 'sale',
      title: `${cfg.title} — ACQUIRED (STUB)`,
      kind: 'sale',
      scoreBonus: 6,
      prose: 'Placeholder exit.',
    },
    {
      id: 'bankrupt',
      title: `${cfg.title} — RUIN (STUB)`,
      kind: 'ruin',
      scoreBonus: 0,
      prose: 'Placeholder ruin. The biography continues anyway.',
    },
  ]

  return {
    id: cfg.id,
    title: cfg.title,
    tagline: cfg.tagline,
    entry: `${p}_entry`,
    insolvency: `${p}_insolvency`,
    opening: cfg.opening,
    scenes,
    endings,
  }
}
