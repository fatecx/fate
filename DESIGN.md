# DESIGN.md — fate

**One life. Nine companies. Every scar carries forward.**

A narrative founder saga for fate.cx. You play a single founder across a decades-long biography in a near-future world remade by AI corporations. Companies live and die; you persist. Citizen Sleeper is the quality bar: deterministic mechanics wearing excellent prose, constant near-scarcity, consequences that only compound.

Price: **$20 one-time**, paid diegetically — the buy button is the check you wire into your first company.

---

## 1. Pillars

1. **Narrative wins. Simplicity wins.** Masterpiece story, decisions, pressure, branching — even if the surface is plain text. Art seasons; it never leads and never blocks.
2. **Death is a chapter break, not a restart.** No run-based loops. The same person wakes up in the same world.
3. **Three meters, total.** Runway, Stress, Reputation. Everything else is fiction.
4. **Statistical gates, never locks.** Progression reads as reality (who funds a first-timer's space elevator?), not as a locked flag.
5. **The engine decides; the LLM decorates.** Mechanics are deterministic TypeScript. The model renders prose from true state — never outcomes, numbers, or probabilities.

## 2. The Biography

- One protagonist, one persistent world-city. Every company exists in the same economy, press cycle, investor pool, and rumor mill as the last.
- A company dying triggers an **epilogue** (LLM-written obituary from true run history), then a **chapter break**: time skips forward, the world has moved, your history hasn't.
- **Corpse rule:** a failed company stays dead and *stays in the world* — as a competitor, a cautionary headline, an old office you walk past. Its story was told; it can never be re-founded.
- Relationships persist. People you promoted remember it in company #4. People you burned block doors in company #7.
- An **IPO does not end the game** — it enriches and elevates you inside the world, unlocking wilder ventures. Early mastery buys harder chapters, not credits.

## 3. The Ladder

**3 tiers × 3 companies = 9 startups**, played sequentially through one life. At each chapter break you choose which company to found next from what your reputation can attract.

| Tier | Theme | Slots |
|---|---|---|
| 1 — GROUNDED | Street-level, fundable today | **THE LAST MILE** (locked opener) · *HANDS* · *SPRIG* |
| 2 — AMBITIOUS | Hardware frontiers, serious capital | *TELEPORT* · *SKYLINE* (space elevator) · *(one TBD)* |
| 3 — MOONSHOT | The impossible, funded | *MOON CASINO* · *MARS LINE* · *(one TBD)* |

*(Tier 1 non-opener slots and all Tier 2/3 entries are DRAFT proposals — finalize with Ali before any content authoring. Hooks: HANDS — humanoid service staff, dignity-and-labor drama. SPRIG — urban vertical-farm robot fleets, supply-chain and health-regulator drama. TELEPORT — telepresence robots on Earth scaling toward Mars via cascading relay satellites. SKYLINE — a space elevator; the strategic fork is goods-only vs humans vs both, each a different game. MOON CASINO — exactly what it says. MARS LINE — permanent telepresence settlement services on Mars.)*

### Tier progression rules

- **Founder Score gates tiers, and failures still earn score.** Score accrues from milestones reached, years survived, people treated well, promises kept — not just exits. There are no dead ends: even a founder who fails everything climbs eventually, because experience counts.
- Within a tier, a failed company frees you to found **another company from that same tier** (or push on if your score already qualifies you upward).
- Clearing a tier — or simply accruing enough score from its lives — opens the next. Expected shape: most players see Tier 2 around their 2nd–3rd company, Tier 3 around their 4th–5th.
- Full biography target: **8–12 hours** across all nine; a single company runs **1.5–3 hours**.

## 4. The Three Meters

Visible always, moved only by choices. Internal math below is hidden from players — they feel weather, not spreadsheets.

| Meter | Feel | Rules |
|---|---|---|
| **Runway** (weeks) | the drumbeat | Treasury ÷ weekly burn. Always on screen. Payroll auto-deducts. Panic target: runway < 10 wks at least once per hour of play. |
| **Stress** (0–100) | rationing agency | High stress shrinks available actions and unlocks breakdown events; rest actions trade progress for sanity. |
| **Reputation** (−10..+10) | doors | Gates which candidates/investors/journalists appear; carries across the whole biography; converts into starting capital variance for later companies. |

Tuning knife-edge (inherited from validated math): healthy mid-game income ÷ burn ∈ [0.85, 1.15]; between funding beats, expect to burn 35–55% of treasury; death approaches visibly on rails, escape requires acting early.

## 5. Core Loop

One epoch ≈ one week. The unit of play is the **scene**.

```
EPOCH OPEN   world tick (rivals move, headlines land) → scenes dealt (some on fuses)
PLAYER       read scene → choose 2–4 options → optionally SPEND STRESS to consult someone
RESOLVE      deterministic outcome → prose rendered from true state → meters move
CLOSE        payroll · condition drift · fuse countdowns tick
```

- **Scenes**: typewriter prose, portrait card, 2–4 choices. Important scenes carry **fuses** (must answer within N epochs).
- **Consult mechanic**: spend Stress to talk someone through the current scene. Their advice reflects their agenda — sometimes self-serving. Consulting can unlock a third option invisible without them.
- **Escalation ladder**: feed blip → standard scene → rare full-screen set-piece (cofounder split, term-sheet close, death). Rarity creates weight; ~6–10 set-pieces per company.
- **Rescues before ruin**: runway ≤ 6 wks unlocks bridge/down-round/acqui-hire scenes, once each, each leaving scars. Ruin = all rescues spent.

## 6. Characters & The Advisor Thread

Small recurring cast across the biography (~25 named characters): cofounders, hires, investors, journalists, regulators, rival executives — each with stats, one hidden trait, and one canonical portrait.

**The re-backing ritual** (the monetization seam made warm): at every epilogue, one specific person from the life just ended — the advisor whose respect you earned or burned — decides whether to capitalize your next company. Treat people well across a life → bigger check, friendlier terms, a board ally next chapter. Burn bridges → thinner checks or hostile seats. Your first investor becomes a recurring character whose faith in you is itself a meter. This solves "why does this serial failure keep getting funded?" inside the fiction.

## 7. Endings & The IPO Question

Every company carries a full ending spread (typically five): triumph (IPO/rare), sale, noble failure, disgrace, transformation. **An IPO is possible at any tier if play is genuinely elite — never locked — but statistically rare early** (single-digit % in Tier 1) because underwriters demand track record the math won't fake. By Tier 3, IPO odds rise with Founder Score while the bars grow higher. Players who never IPO still get complete, dramatic stories — the biography is the prize, not the ticker.

## 8. Presentation & Art Policy

- **The game must be fully playable as pure text, forever.** This is the anti-bug, anti-slowness guarantee: no development path routes through art.
- Surface: clean typographic narrative view — prose column, choice cards, thin meter bars, fuse timers. Restraint over chrome.
- **Portraits**: one canonical image per named character, generated once, reused everywhere (never regenerate faces mid-scene — that's the consistency trap). Style: anime portrait via the proven terminus bulletin pipeline; pixel-art fallback only if generation quality disappoints.
- **Beat art budget**: 40–80 images total for v1 — chapter openings, deaths, IPOs, epilogues, tier transitions. Not every decision, not every outcome. When the screen goes full-canvas, the player should feel the weight.
- Scene backdrops vary freely (no faces in them); character cards stay fixed.

## 9. Architecture Law

```
src/engine    deterministic TS: state, transitions, meters, fuses, score. Pure functions.
              (state, seed, action) → state'. Fully vitest-covered. No imports from content or UI.
src/content   typed data: companies, scenes, casts, threats, endings, tier tables.
src/render    LLM prose layer + text UI. Reads serialized true state, emits flavor strings,
              schema-validated. May never write back to state.
```

- **Content-as-data:** adding story never touches engine code. If it does, the schema is wrong.
- **Graph completeness is CI:** every choice resolves to a reachable state; every referenced character/company/scene exists; every ending reachable in a headless Monte Carlo sweep. Broken branches fail `vitest` before merge.
- Persistence: Supabase (biography, score, corpses, relationships). Auth: wallet gate carried from terminus scaffold (Dynamic Labs + signed actions) — donor repo `~/.superset/projects/terminus`, read-only.

## 10. Chapter One — THE LAST MILE (locked opener)

2031. Delivery robots blanket the wealthy districts, owned by giants. You found an independent autonomous delivery network for the neighborhoods they ignore.

- **Rival:** MERIDIAN, the platform giant — ignores you, clones you, then tries to bury or buy you.
- **Cast skeleton:** 3 cofounder offers (each strong stat + hidden flaw) · first engineer hire · a MERIDIAN exec who alternates contempt and charm · a city permit-regulator AI · one journalist · one investor-advisor (the future re-backer).
- **Act structure (~30 epochs):** FOUND (garage, MVP, first route pilot) → FIGHT (clone launches, gig-driver politics, permit war) → RECKONING (a pedestrian accident and the press storm; acquisition offer lands mid-crisis).
- **Threat palette:** unit-economics squeezes · driver protests · permit denials · clone underpricing · warehouse partner cancellations · key-hire poaching · the accident investigation.
- **Endings (5):** IPO as the people's network (elite-only) · acquired and dissolved · bankrupt but beloved · you become what you fought (take MERIDIAN's offer and rise inside it) · open-source everything and walk away.

## 11. Build Phases

| Phase | Deliverable | Acceptance |
|---|---|---|
| P0 | Docs (this file, README, AGENTS, CLAUDE) | done when pushed |
| P1 | Engine core + content schema (`engine`, `content`) | headless sim plays a full biography; Monte Carlo distribution sane |
| P2 | Chapter One authored as data | graph-completeness CI green; all 5 endings reachable |
| P3 | Text-first UI, end-to-end | a stranger finishes company 1 and starts company 2 |
| P4 | Auth + persistence + $20 paywall | wallet login, biography persists server-side |
| P5 | Portraits, beat art, polish, beta | playtest scorecard passes |

## 12. Playtest Scorecard

- Did runway < 10 wks panic happen about once per hour? (target: yes)
- Could the player name the two decisions that killed them? (earned, not random)
- Any AP/action felt spare? (target: never)
- Did any branch dangle, repeat, or contradict persisted world state? (target: zero)
- Would they start company 2 immediately after the epilogue? (the only metric that matters)
