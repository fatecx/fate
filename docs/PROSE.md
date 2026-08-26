# PROSE.md — the house standard for player-facing text

Every `prose`, `leadIn`, `result`, ending, interlude, and prologue string in `src/content/` is read by the player. This is the bar. It was earned scene-by-scene on Hyperchute; it applies to every chapter, and to any agent or session that touches content.

## The bar

**An 8th grader reads it once and gets it.** Short sentences (average under 15 words). Common words. Concrete nouns. Active voice. One idea per sentence.

## The defects

1. **Semicolons.** Never in player-facing prose. Two sentences, or a comma.
2. **Negative framing.** Never open with what something is not. "Real porches are not tether tests" is a defect. Say what the porches are. Ban list: "not X but Y", "it wasn't X, it was Y", "Nobody calls it X, which is how you know it is one."
3. **Riddles.** Every image lands on first read or it gets cut. "The number is not in service", "hope-formatted-as-engineering", "a machine shaped like reaching" — all past defects. If a line needs a second read, rewrite it.
4. **AI tells.** Triple parallel constructions. "The way X does Y" simile stacks. Stacked em-dash appositives (max one em-dash pair per sentence). "Somewhere, someone…" vagueness. Dramatic ellipses. "…which is somehow the most X part."
5. **Jargon.**
   - **Founder-native stays.** The player plays a founder; these are the audience's native words: term sheet, cap table, burn, runway, acqui-hire, board seat, down round, bridge loan, IPO, S-1.
   - **Everyone else gets translated.** Lawyers, bankers, engineers, and space: EVA → working outside in a suit. Fairing → rocket. Shapefile → map file. The book → the buyers. Underwriters → the bankers running the deal. Receivers → the people who wind down bankrupt companies.
   - A term that needs a gloss to survive should be replaced instead.

## The protections

- **Character voice is not flattened.** June speaks in numbers. Ray growls. Anneke fences. Plain does not mean bland.
- **The good line is sacred.** "She holds." "Boats are slow." "Paper first, dinner never." If a line is already clean and punchy, leave it alone. Rewriting for its own sake makes new slop.
- **Facts are load-bearing.** Numbers, names, sequence, and stakes never change in a prose pass.

## The hard constraints (tests enforce these)

- Choice **labels** are witness-locked in `tests/economy.spec.ts` — never reword without updating the spec.
- `leadIn` ≥ 40 chars; bridge `prose` ≥ 120 chars.
- **Echo shingles**: no 5-word overlap between a choice's `result` and its target scene's prose (`tests/echo.spec.ts`).
- Run `npx vitest run` after every batch. Green or it doesn't ship.

## The method (learned the hard way)

- Full-scene anchored rewrites. No word-patches — they leave the surrounding slop intact.
- Read like a player: every line stands alone, because subtitles and beats render one thought at a time.
- When unsure between `touch` and `rewrite`, choose `rewrite`.
