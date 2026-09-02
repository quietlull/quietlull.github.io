# Website - Claude context

Personal portfolio site. Jekyll + a vendored fork of the Chirpy theme + custom JS/SCSS subsystems.
Forever project: maintainability beats speed. **The visual redesign has SHIPPED** - it merged to
`main` at `ff72c0e` on 2026-08-26 and all 53 pages are the redesign now. Refactor Phase 1 (the
theme boundary) is done; Phases 2 and 3 are the open work, see
[docs/REFACTOR-PLAN.md](docs/REFACTOR-PLAN.md).

## Read first, load only what the task touches

- [docs/INDEX.md](docs/INDEX.md) - map of every note, one line each
- [docs/STATUS.md](docs/STATUS.md) - what is true right now and what is in flight
- [docs/CONVENTIONS.md](docs/CONVENTIONS.md) - house rules, non-negotiable
- [docs/PAGE-PROCESS.md](docs/PAGE-PROCESS.md) - **read before building ANY page blockout**: the
  analyse -> 4 sourced variants -> clean-agent verify -> Rod judges procedure, and the
  blockout-is-greybox rule. Skipping it is how the 2026-08-16 sub-page batch got rejected.

## Standing rules

- **Provenance law.** Every design element must derive from a REAL code snippet (reference site,
  CodePen, or the live site), tiered True / Remixed / Slop. No free-handing designs or elements.
  No source? ASK Rod first. Idea origin is tracked (Rod / theirs / Claude) and Claude-originated
  ideas stay under ~25% of the design. Ledger: `redesign-lab/element-tracker.md`.
- **Preview-first.** Show every non-trivial change in chat and get a go BEFORE touching files.
  Rod is the eyes: never verify visuals by screenshot, make the change and ask what he sees.
- **Code wins.** If a doc disagrees with the code, the doc is stale - fix the doc.
- **Anti-bloat.** Optimizations that add code (caches, dirty flags, guards, helper extractions for
  micro-savings) are bloat. Fewer lines and readability win. This supersedes earlier
  micro-optimization passes (see DECISIONS D5).
- **Verify empirically.** Check the rendered page, computed styles, and built output - not the
  code's intent. Claims cite file:line or say "inference". Believe the observation, then verify
  the mechanism before naming a cause.
- **Chirpy is upstream "client code".** Add in our own files rather than editing theirs, even at
  the cost of duplication. Upstream bugs get flagged in [docs/UPSTREAM.md](docs/UPSTREAM.md), not
  silently fixed.
- **Content voice.** No em dashes in any written content (use commas). When editing Rod's prose,
  fix mechanical errors only - never formalize or strip his casual voice.
- **Docs are part of done.** Whenever a section, feature, or change batch is finished: run
  /sync-docs (touched note + STATUS + CHANGELOG). The docs are how learnings propagate to every
  agent working this repo - unsynced learnings die with the session.
- **Ship check.** When Rod finalizes ANY creative step ("lock it in", "keeper", "approved",
  "bake it", picking a bench element), run the `/ship-check` skill gates before calling it done.
- **Machine-owned files - never hand-edit:** `assets/js/dist/` (Rollup output). There is no longer
  a PurgeCSS output to protect: D48 deleted Bootstrap, so `_sass/vendors/_bootstrap.scss` and
  `purgecss.js` are both gone from the repo.

## The lab (reference, not a workbench)

`redesign-lab/` is version-controlled now (D49) and it is a REFERENCE, not the place work happens:
component bench in `extracted/`, reference gallery, palette explorer, session logs, the six
`final-*` pages the port was made from. Two things follow from that:

- **It never ships.** `.github/workflows/pages-deploy.yml:68` deletes it out of `_site` before
  upload. It is still browsable on localhost, which is the point.
- **Editing a lab page changes nothing a visitor sees.** D22 is lifted, the live tree ships. Before
  tuning anything, ask which file renders the URL Rod is looking at.

Its copies of the live Three.js modules are still separate and still a wrong-copy hazard, and the
lab water is now five changes behind live - see [docs/TRAPS.md](docs/TRAPS.md).
`redesign-lab/HANDOFF.md` is still the orientation doc for the sourcing pass that is finishing the
lab's own citation trail.

## Build

- `npm run build` - JS bundles (Rollup). This is the only build step Jekyll needs.
- `bundle exec jekyll s` - local serve
- `npm test` - eslint + stylelint
