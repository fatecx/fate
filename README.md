# FATE

**A narrative founder saga. One life. Four companies. Every scar carries forward.**

fate.cx — you play a startup founder in a near-future world being remade by AI corporations. Found a company, fight for it, lose it or take it public — then wake up the next morning and start again, in the same persistent world, as the same person, with your reputation intact and your enemies remembering. Death is a chapter break, never a restart.

Citizen Sleeper-class ambition: a deterministic spine wearing excellent prose.

## Status

**Design phase — pre-code.** The full systems spec lives in [`DESIGN.md`](./DESIGN.md). Agent rules in [`AGENTS.md`](./AGENTS.md).

## Planned shape

- **Four chapters, fixed order**: HYPERCHUTE (garage delivery railway) → TELEPORT (Mars telepresence) → SKYLINE (space elevator) → ESCAPE (the casino on the Moon). No selection screen — each life opens when the last one ends.
- **Three meters total**: Runway, Stress, Reputation. The cap table and your connection web are living fiction, not meters.
- **Real-startup texture**: advisors and lawyers paid in cash *or* equity, referral chains that open doors (or waste them), permit wars, hardware economics.
- **Presentation**: text-first narrative scenes (typewriter prose, choices, fuses) dressed with character portraits and rare full-scene art for the big beats.
- **Price**: $20, diegetic — the buy button is the check you wire into your first company.

## Stack (planned)

Vite + React + TypeScript + Tailwind/shadcn · Supabase persistence · wallet auth scaffold harvested from `terminus` · deterministic TS scenario engine (`src/engine`) with LLM-rendered prose only.

## Repo map

```
DESIGN.md     game systems + content spec (source of truth)
AGENTS.md     rules for agents working here
CLAUDE.md     Claude Code entry point
docs/         premises, rosters, playtest notes
src/          (empty until Phase 1)
```
