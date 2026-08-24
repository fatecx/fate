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

**LIVE on the buxor Vercel account** (user `buxord`, team `buxors` — zero Robomart/syedos connection). Ship: `npm run build && npm run deploy` (uploads dist via `VERCEL_TOKEN_BUXOR`; no GitHub↔Vercel integration). Current URL: check latest deployment (`fate-*.vercel.app`); **fate.cx awaits DNS in Porkbun** — apex A `@ → 76.76.21.21`, www CNAME `→ cname.vercel-dns.com` (Porkbun API keys 403, manual step). Split-stage play surface per DESIGN.md §8. **Auth is wallet-only**: headless picker (Wallet Standard for Solana, EIP-6963 for Ethereum, no vendor modal) → `supabase.auth.signInWithWeb3` (SIWS/SIWE, enabled on the buxor Supabase project `erwkzijhscmyqztifseb` with fate.cx + `*-buxors.vercel.app` in the allow-list). Signed-in saves: Supabase `saves` row + per-user localStorage cache; guests are never persisted — refresh restarts. Welcome screen gates every load; company dropdown (top-right) holds incorporation papers, founder ID, theme, restart, logout. syedOS Render `fate-nb62.onrender.com` exists only as fallback.

Content status: Hyperchute fully authored across all three acts, now with a connective-tissue grammar: `leadIn` prose on every dealt scene (test-enforced), full bridge beats (`kind: 'bridge'`) on decision edges, and predicate-gated week fillers (`src/content/fillers.ts`) rendered under week marks (deterministic epoch×seed pick — no render-side RNG). Teleport/Skyline/Escape chapters are STUBS by design. Next milestone: playtest Hyperchute live, then author Teleport with the same grammar. Review surface: `npm run map` → `map.html`. Gates: `npm test`.
