# Docs index

One note per topic. Load only what the task touches. The bar for a note: expensive to rediscover
AND not inferable from reading the code. If a doc disagrees with the code, the doc is stale - fix it.

- [STATUS.md](STATUS.md) - what is true right now + what is in flight. Read every session.
- [CONVENTIONS.md](CONVENTIONS.md) - house rules: philosophy layer + concrete web rules.
- [PAGE-PROCESS.md](PAGE-PROCESS.md) - how a surface goes from nothing to a locked layout. Read BEFORE building any blockout.
- [ARCHITECTURE.md](ARCHITECTURE.md) - subsystem map, build pipelines, file pointers.
- [ARCHITECTURE-HANDOFF.md](ARCHITECTURE-HANDOFF.md) - **start here for the optimization / restructure**: every file with who loads it, the layer model and its live collisions, the 84 tokens, ranked duplication, and what is deliberately unfinished.
- [BREATHING.md](BREATHING.md) - **HISTORICAL. Breathing is dead (D43) and none of it is in the code any more.** Kept because the system is named all over the older notes. Its successors are drift and magnetism.
- [THEME-BOUNDARY.md](THEME-BOUNDARY.md) - stock vs modified vs custom; the known couplings.
- [THEME-BOUNDARY-AUDIT.md](THEME-BOUNDARY-AUDIT.md) - the Phase 1 file audit, every file labelled against upstream Chirpy 7.3.1. 25 stock, 46 modified, 81 ours, 39 deleted, 152 audited. (The counts here said 40/44/81/26 until 2026-09-02; those were the pre-strip numbers and the audit itself never carried them.)
- [REQUESTS.md](REQUESTS.md) - Rod's request queue with statuses. Read the OPEN table; done rows are phantoms.
- [ELEMENT-INVENTORY.md](ELEMENT-INVENTORY.md) - what markup actually ships: every class on the built pages, counted, grouped by stylesheet. 2026-09-04.
- [WORKBENCH-CHECK.md](WORKBENCH-CHECK.md) - the 36-tab check of the first workbench: visitor-visible issues waiting on Rod, dead code, and which components only work because of their page.
- [CODE-AUDIT.md](CODE-AUDIT.md) - how each source file works, one section per file. The hand-written
  half of the review pages in the lab to-do page. The source carries no comments; this is where
  explanation lives.
- `code-comments/` - the 2,565 comments removed from the source on 2026-10-10, one file per source
  file, each with the line it sat on. Archives for files that were later deleted are gone with them.
- [simplify/README.md](simplify/README.md) - **the simplification pass of 2026-10-10: the result,
  how it was checked, and the 22 decisions waiting on Rod.** Below that, the contract the five
  agents worked to. One report per area beside it (`templates`, `js-bundled`, `js-raw`,
  `scss-components-pages`, `scss-foundation`): every deletion with its evidence.
- **Line numbers in notes written before 2026-10-10 are for the tree at commit `e1b1351`.** Removing
  the comments moved every line. Use `git show e1b1351:<path>` to follow an old `file:line` citation.
- [MERGE-WORKLIST.md](MERGE-WORKLIST.md) - **the ROADMAP** (3 stages: finish the lab -> port -> Jekyll refactor, with where we are) + every port gate in order. Stage 2 is done: the port shipped.
- [REFACTOR-PLAN.md](REFACTOR-PLAN.md) - the flaws found 2026-08-11 + the phased plan. Phases 0 and 1 are DONE; Phase 2 is next and nothing gates it; Phase 3 is "vendored but clean" (Rod, 2026-09-02).
- [POST-FRAMES-PLAN.md](POST-FRAMES-PLAN.md) - **why post pages drop frames (P515), PLANNED not run.** The parent perf investigation; scoped to FRAMES only, not bytes or memory.
- [SPARKLER-PERF-PLAN.md](SPARKLER-PERF-PLAN.md) - the cursor sparkler profiling pass, PLANNED not run. One candidate inside POST-FRAMES-PLAN; read that first.
- [TRAPS.md](TRAPS.md) - symptom-first list of things that bite. Search here FIRST when debugging.
- [DECISIONS.md](DECISIONS.md) - decisions with the rejected options and why. Losers get re-suggested.
- [DEAD-ENDS.md](DEAD-ENDS.md) - attempts that died and why. Do not re-litigate.
- [VOCABULARY.md](VOCABULARY.md) - controlled terms + banned terms.
- [UPSTREAM.md](UPSTREAM.md) - Chirpy divergences and flagged-not-fixed upstream issues.
- [OBSIDIAN-BRIEF.md](OBSIDIAN-BRIEF.md) - the docs-system rationale + optional Obsidian layer.
- [CHANGELOG.md](CHANGELOG.md) - dated, owner-attributed entries with the why. Append-only.
