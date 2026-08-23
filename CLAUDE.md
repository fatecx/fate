# CLAUDE.md — fate

Narrative founder-saga game (fate.cx). Design phase — read `DESIGN.md` before any work; it is the source of truth for systems and content. Agent rules in `AGENTS.md` apply here in full.

## What this is

One persistent biography: you are a startup founder in a near-future world of AI-run corporations. Found four companies in fixed sequence — **HYPERCHUTE → TELEPORT → SKYLINE → ESCAPE** — carrying reputation, relationships, cap table history, and scars across every death and exit. Citizen Sleeper is the quality bar: deterministic mechanics, authored narrative, constant near-scarcity.

## Non-negotiables

- Engine = pure deterministic TS; LLM renders prose from true state only (never outcomes/numbers).
- Content lives as typed data files; scenario-graph completeness is enforced by vitest.
- Game must be fully playable as text at all times — art never blocks.
- Runway / Stress / Reputation are the only meters.
- Donor repo for auth/wallet scaffold: `~/.superset/projects/terminus` (read-only).

## Current phase

P1 landed (`ae56a82`): deterministic engine core + content schema + Hyperchute Act One slice + full gate suite green (17 tests; 390-run Monte Carlo proves every ending reachable; determinism replays byte-identical). `npm test` runs the gates. In progress: storyline visualizer (`scripts/map` → self-contained `map.html`). Next after that: P2 — author Hyperchute Acts 2–3 (FIGHT, RECKONING) as data; stub chapters 2–4 get replaced in later phases.
