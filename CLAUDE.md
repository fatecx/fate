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

Content status: Hyperchute fully authored across all three acts plus a **survival register** (`src/content/hyperchute/survival.ts`): desperation scenes gated behind low runway/arrears (sublet the garage, the fare blag, fifteen dollars, credit cards, the ghost check two-beat arc) — drawn from the founder-owner's real early-startup stories; prosperous runs never see them. **Authoring commitments for later chapters (owner-approved):** TELEPORT opens with the all-or-nothing expo arc ($20k in bank, $15k prototype quote, three checks closed at the show, hotel card bounces) and is founded WITH a cofounder whose breakup is a mid-chapter arc; SKYLINE carries the board-coup ending (investors flip your cofounder, you're forced out of your own company) and **the Moon uproot** — a massive one-way life decision to live in a biodome beside the build; ESCAPE inherits remaining life-changer beats. Connective-tissue grammar: `leadIn` on every dealt scene (test-enforced), bridges on decision edges, predicate-gated week fillers. IPO ladder: 1 route (Hyperchute, via `h_ipo_road` honest pricing: cred≥4 + $100k + stress<85) → 2–3 (Teleport) → 4–5 (Skyline) → 6 (Escape); rare endings are proven by deterministic witness roads in `tests/economy.spec.ts`, not bot luck. Review surface: `npm run map` → `map.html` (click ending → ROADS TO HERE). Gates: `npm test`.
