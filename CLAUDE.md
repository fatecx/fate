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

**LIVE on the buxor Vercel account** (user `buxord`, team `buxors` — zero Robomart/syedos connection). Ship: `npm run build && npm run deploy` (uploads dist via `VERCEL_TOKEN_BUXOR`; no GitHub↔Vercel integration). Current URL: **fate.cx** (aliased; apex DNS live). Split-stage play surface per DESIGN.md §8. **Auth is wallet-only — there is NO guest mode**: headless picker (Wallet Standard for Solana, EIP-6963 for Ethereum, no vendor modal) → `supabase.auth.signInWithWeb3` (SIWS/SIWE on buxor Supabase project `erwkzijhscmyqztifseb`; address/chain live in `user_metadata.custom_claims`). **One wallet, one life — the biography is immutable.** No restart for players; the `saves` table has no client DELETE policy; replay = new wallet (revenue model + marketing claim: a lived-once experience). **Dev exception: `VITE_DEV_TOOLS=1` in `.env` bakes a RESTART (DEV) button into the drawer for playtesting — LAUNCH CHECKLIST: delete that var and redeploy.** In-fiction out: DECLARE BANKRUPTCY in the drawer (engine action `surrender` → chapter's `bankrupt` ending, scars carry forward, biography continues). Broken saves are fixed server-side, never via user resets. syedOS Render `fate-nb62.onrender.com` exists only as fallback.

Content status: Hyperchute fully authored across all three acts, now with a connective-tissue grammar: `leadIn` prose on every dealt scene (test-enforced), full bridge beats (`kind: 'bridge'`) on decision edges, and predicate-gated week fillers (`src/content/fillers.ts`) rendered under week marks (deterministic epoch×seed pick — no render-side RNG). **IPO ladder (per-chapter design law): routes to the triumph/IPO ending are authored and static — Hyperchute exactly 1 (via `h_ipo_road` honest pricing only), Teleport 2–3, Skyline 4–5, Escape 6 — while the *gates* on those routes are priced in carried Founder Score/rep/treasury (law 7), so a storied founder finds doors a first-timer can't open.** Teleport/Skyline/Escape chapters are STUBS by design. Next milestone: playtest Hyperchute live, then author Teleport with the same grammar. Review surface: `npm run map` → `map.html`. Gates: `npm test`.
