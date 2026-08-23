# AGENTS.md — fate

Rules for any agent (Claude or otherwise) working in this repo.

## House standing rules

- **Push straight to `main`.** No PRs, no "should I push?" — commit → push. Push to main = the record.
- **Never start localhost dev servers** to "test" — the deliverable is code + docs in the repo.
- **Hosting**: Render by default when the game ships, unless told otherwise.
- **Naming**: new services/repos get single bare words (`fate`, `memo`). Never `fate-something`.
- **Superset is source of truth**: this repo lives at `~/.superset/projects/fate`.
- **Sandbox**: run new/untrusted tools through `vet` before host install.
- **Do not modify `~/.superset/projects/terminus`** — it is a read-only donor repo. Harvest patterns/code by copying into fate; never commit changes there.

## Fate-specific laws

1. **The engine decides; the LLM decorates.** All game mechanics, outcomes, probabilities, and state transitions are deterministic TypeScript (`src/engine`). The LLM renders prose/dialogue/flavor from serialized true state and nothing else. An LLM may never author a number, a probability, or an outcome.
2. **Content is data.** Every scene, choice, event, company, and character lives in typed data files (`src/content`), not hardcoded logic. If adding story requires touching engine code, the schema is wrong.
3. **No dangling branches — enforced by test.** Every choice node must resolve to reachable states; every referenced character/company/scene must exist. CI (`vitest`) validates the full scenario graph before anything merges.
4. **Three meters only.** Runway, Stress, Reputation. New meters require deleting an old one first.
5. **Art cannot block development.** The game must be fully playable as pure text at all times. Portraits and beat art layer on top, never underneath.
6. **One founder biography.** Persistent world across companies. Company corpses stay in the world. A failed company can never be re-founded — its story was told.
7. **Statistical gating, never hard locks.** Progression gates via Founder Score math that reads as reality, not via "locked" flags.

## Tokens / remote

- Remote: `github.com/fatecx/fate`. **Push with `GITHUB_TOKEN_BUXOR`** (fatecx is a buxor org; roboalias and syedos both get 403): `git remote set-url origin "https://buxor:${GITHUB_TOKEN_BUXOR}@github.com/fatecx/fate.git" && git push origin main && git remote set-url origin https://github.com/fatecx/fate.git`
