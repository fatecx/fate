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

**LIVE**: playable build deployed on Render (`fate-tys4.onrender.com`, service `srv-da5mtpgu01pc73fqn1dg`, autodeploys on push to main). Split-stage play surface per DESIGN.md §8; saves resume via localStorage. Custom domain **fate.cx is registered on Render but DNS-unverified** — Porkbun API keys return 403, so apex A record (`@ → 216.24.57.1`) and www CNAME (`→ fate-tys4.onrender.com`) need manual adding in Porkbun.

Content status: Hyperchute Act One fully authored; Acts 2–3 and chapters 2–4 are STUBS by design. Next milestone: **P2 — author Hyperchute completely** (FIGHT + RECKONING acts, all 5 endings human-reachable), then playtest live before authoring Teleport. Review surface: `npm run map` → `map.html`. Gates: `npm test`.
