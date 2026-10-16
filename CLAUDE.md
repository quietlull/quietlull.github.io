# Website - Claude context

Personal portfolio site. Jekyll + a vendored fork of the Chirpy theme + custom JS/SCSS subsystems.
Forever project: maintainability beats speed. **The visual redesign has SHIPPED** - it merged to
`main` at `ff72c0e` on 2026-08-26 and all 53 pages are the redesign now. Refactor Phase 1 (the
theme boundary) is done; Phases 2 and 3 are the open work, see
[docs/REFACTOR-PLAN.md](docs/REFACTOR-PLAN.md).

## Read first, load only what the task touches

- **In a cloud session, or any session with no memory of this project:** read
  [docs/CLOUD-SESSIONS.md](docs/CLOUD-SESSIONS.md) first. It says what you are missing, how to set up,
  and where the copied memory notes are (`docs/memory/MEMORY.md`).

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
  Rod is the eyes: never verify visuals by screenshot or by comparing pictures, make the change
  and give him a short list of what to look at and where.
- **Effects are behaviours.** One effect, one file, one class; the component's stylesheet sets
  the numbers and decides how behaviours combine. Read
  [docs/behaviours/README.md](docs/behaviours/README.md) before touching any effect.
- **Code wins.** If a doc disagrees with the code, the doc is stale - fix the doc.
- **No comments in the source.** Rod, 2026-10-09: "strip them all out ... Code should be self
  explanatory or documenting." Scripts, stylesheets, templates and plugins carry no comments;
  `npm test` fails if one appears (`npm run lint:comments`). Explain a file in
  [docs/CODE-AUDIT.md](docs/CODE-AUDIT.md), which its review page shows. If code needs a comment to
  be understood, rename things or restructure it until it does not. The only comments allowed are
  instructions to a tool (a stylelint or eslint directive). The 2,565 that were removed are kept in
  `docs/code-comments/`.
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

## The lab (reference, plus the generated workbench)

`redesign-lab/` is version-controlled (D49). It holds the reference gallery, the palette explorer,
session logs and the old component bench in `extracted/`. The six `final-*` pages the port was made
from were deleted on 2026-09-04; `git show 047213e:redesign-lab/final-landing.html` reads one.

- **It never ships.** `.github/workflows/pages-deploy.yml:68` deletes it out of `_site` before
  upload. It is still browsable on localhost, which is the point.
- **Editing a lab page changes nothing a visitor sees.** D22 is lifted, the live tree ships. Before
  tuning anything, ask which file renders the URL Rod is looking at.
- **The workbench is generated, never hand-edited.** `http://localhost:4000/redesign-lab/workbench.html`
  shows every component as a real element from a real built page. `tools/build_workbench.py` writes
  it into `_site/` and `_plugins/lab-pages-hook.rb` reruns that after every `jekyll serve` build.
  Each specimen keeps its page's ancestors, stylesheets and scripts; "Bare" removes the ancestors
  to show what depends on its page. See `redesign-lab/HANDOFF.md` and
  [docs/WORKBENCH-CHECK.md](docs/WORKBENCH-CHECK.md).

Its copies of the live Three.js modules are still separate and still a wrong-copy hazard, and the
lab water is now five changes behind live - see [docs/TRAPS.md](docs/TRAPS.md).

## Build

- `npm run build` - JS bundles (Rollup). This is the only build step Jekyll needs.
- `bundle exec jekyll s` - local serve
- `npm test` - eslint + stylelint + the CSS load-order check + no comments in the source
- `python tools/build_workbench.py` - rebuild the lab workbench by hand (the serve hook normally does it)

## Proving a change moved nothing

Capture before, change, rebuild, capture after, compare. Each tool's header has the commands.

- `node tools/page-fingerprint.mjs capture <file> [--styles]` - where every element sits on ten
  pages at two widths; `--styles` adds every computed style, so colour changes are caught too
- `node tools/behaviour-check.mjs <file> [reduced]` - tilt, flip, drift, magnets, line boil,
  search, achievement wall, portal, driven with a real mouse and keyboard
- `node tools/check-workbench.mjs` - every workbench specimen loads with no script errors
- `node tools/css-rule-diff.mjs <before.css> <after.css>` - which compiled rules changed
