# DESIGN.md — fate

**One life. Three companies. Every scar carries forward.**

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

## 3. The Four Chapters

**Four startups, played in fixed order through one life.** There is no selection screen: each chapter opens only when the previous life ends — exit, death, or disgrace all lead forward, differently. The arc ascends: a garage on Earth, then orbit, then the elevator, then the Moon.

| # | Company | Premise |
|---|---|---|
| 1 | **HYPERCHUTE** | A railway in the sky — autonomous shuttles hold station above each home and drop deliveries through pneumatic tubes. Robomart's real drama: permits, gig politics, a pedestrian accident, the giant that clones you then tries to bury you. |
| 2 | **TELEPORT** | Telepresence robots on Mars and the Moon via cascading relay satellites. Space tourism that feels near-instant because latency was engineered out. |
| 3 | **SKYLINE** | A space elevator. The goods-vs-humans fork lives inside the story as authored branches, each a different game. |

### Chapter progression rules

- **History shapes how each chapter begins — never whether it begins.** Who takes your call, your starting capital, which board seats are pre-filled, which old enemies resurface: all read from the persisted biography. Statistical leverage, zero locks.
- **Founder Score** accrues across the whole life (milestones reached, years survived, people treated well, promises kept — not just exits). It tunes starting conditions and ending quality; it never gates access.
- Starting capital for each new company scales with Reputation and Founder Score (see §6); relationships and grudges carry in at full strength.
- Full biography target: **8–12 hours**; a single company runs **1.5–3 hours**.

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

**The cap table is living state.** Every point granted to advisors, lawyers, angels, and investors is tracked forever. Equity is a currency: pay professionals in points instead of cash when runway is thin — trading dilution for survival and living with it at exit. Founder stake below key thresholds opens hostile-control branches late in each chapter.

**The connection web gates the world.** Advisors know angels; angels know VC partners; lawyers know regulators; journalists know everyone's secrets. Which introduction scenes exist *at all* depends on who you've met and how they regard you. A great advisor's referral is a customer boom or a warm permit office. A bad one wastes equity — and can surface a sabotage scene later ("he's been shopping your deck").

## 7. Endings & The IPO Question

Every company carries a full ending spread (typically five): triumph (IPO/rare), sale, noble failure, disgrace, transformation. **An IPO is possible in any chapter if play is genuinely elite — never locked — but statistically rare early** (single-digit % in Hyperchute) because underwriters demand track record the math won't fake. By SKYLINE, IPO odds rise with Founder Score while the bars grow higher. Players who never IPO still get complete, dramatic stories — the biography is the prize, not the ticker.

## 8. Presentation & Art Policy

- **The game must be fully playable as pure text, forever.** This is the anti-bug, anti-slowness guarantee: no development path routes through art.

### Play surface — split stage (locked)

- **Left (~42%) — the scene card.** Canonical character portrait over a subtly animated backdrop (ambient drift — rain, city light, dust; cheap aliveness, no per-scene assets). Speaker nameplate beneath. When a fuse is armed, a burning ring counts down around the card edge — urgency felt peripherally.
- **Right — the story column.** Typewriter current beat (any click completes it instantly — never trap the reader), then 2–4 choice cards. Beneath, this chapter's past beats sit dimmed and compressed: the biography literally accumulates under the player as they live it.
- **One meter rail**, thin, top-right: runway-in-weeks as the big number (the drumbeat), stress as a hairline bar, reputation as a small chip. Nothing else. Weather, not cockpit.
- **Set-pieces escalate to full-screen**: cofounder split, term-sheet close, accident, IPO, death take over with letterboxing and dedicated beat art. Rarity is what makes takeover mean something (~6–10 per company).
- **Chapter breaks**: black screen, epilogue text, one button — *"Wire the check."*
- **Mobile**: split collapses to a single scrolling column, art becomes a header image. Same DOM, different breakpoint.

### Art policy

- **Portraits**: one canonical image per named character, generated once, reused everywhere (never regenerate faces mid-scene — that's the consistency trap). Style: anime portrait via the proven terminus bulletin pipeline; pixel-art fallback only if generation quality disappoints.
- **Beat art budget**: 40–80 images total for v1 — chapter openings, deaths, IPOs, epilogues, chapter transitions. Not every decision, not every outcome. When the screen goes full-canvas, the player should feel the weight.
- Scene backdrops vary freely (no faces in them); character cards stay fixed. Until assets land, the scene card renders a character sigil on an ambient field — the layout never waits on art.

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

## 10. Chapter One — HYPERCHUTE (locked opener)

2031. Delivery drones blanket the wealthy districts, owned by giants. You found **HYPERCHUTE** in a rented garage above a laundromat: a railway in the sky — autonomous shuttles holding station above each subscriber's home, dropping parcels through pneumatic tubes straight to the doorstep. Beam-down delivery, at street scale.

- **Start:** garage, incorporation papers, and a cap table that is 100% yours and will not stay that way.
- **Rival:** MERIDIAN, the platform giant — ignores you, clones you, then tries to bury or buy you.
- **Cast skeleton:** Priya Raghavan, veteran logistics advisor who advises for equity (the future re-backer thread) · Tomás Reyes, startup counsel paid in cash *or* points — his rolodex is the real product · June Park, angel whose introductions open doors · Marcus Vale, MERIDIAN VP alternating contempt and charm · the Office of Aerial Corridors, the city's permit AI · Sofia Brandt, first engineering hire · Nadia Osei, journalist.
- **Real-startup texture:** equity-for-services decisions, referral chains (advisor→angel→VC→customer), corridor-permit politics, hardware economics — manufacturing runs, warehouse partners, insurance, physical incidents.
- **Act structure (~30 epochs):** FOUND (garage, MVP, first corridor pilot) → FIGHT (clone launches, gig-driver politics, permit war) → RECKONING (a pedestrian accident and the press storm; acquisition offer lands mid-crisis).
- **Threat palette:** unit-economics squeezes · driver protests · corridor-permit denials · clone underpricing · warehouse partner cancellations · key-hire poaching · the accident investigation.
- **Endings (5):** IPO as the people's network (elite-only) · acquired and dissolved · bankrupt but beloved · you become what you fought (take MERIDIAN's offer and rise inside it) · open-source the stack and walk away.

## 11. Build Phases

| Phase | Deliverable | Acceptance |
|---|---|---|
| P0 | Docs (this file, README, AGENTS, CLAUDE) | done when pushed |
| P1 | Engine core + content schema (`engine`, `content`) | headless sim plays a full biography; Monte Carlo distribution sane |
| P2 | HYPERCHUTE fully authored as data (Acts 2–3) | graph-completeness CI green; all 5 endings reachable |
| P3 | Text-first UI, end-to-end | a stranger finishes company 1 and starts company 2 |
| P4 | Auth + persistence + $20 paywall | wallet login, biography persists server-side |
| P5 | Portraits, beat art, polish, beta | playtest scorecard passes |

## 12. Playtest Scorecard

- Did runway < 10 wks panic happen about once per hour? (target: yes)
- Could the player name the two decisions that killed them? (earned, not random)
- Any AP/action felt spare? (target: never)
- Did any branch dangle, repeat, or contradict persisted world state? (target: zero)
- Would they start company 2 immediately after the epilogue? (the only metric that matters)
