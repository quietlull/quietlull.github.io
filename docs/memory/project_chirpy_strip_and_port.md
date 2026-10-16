---
name: project_chirpy_strip_and_port
description: "Where the site stands as of 2026-09-03 - the strip and port are done, the post page's furniture is finished, and the next phase is the CSS/JS split, planned and awaiting three answers from Rod."
metadata:
  node_type: memory
  type: project
  originSessionId: 44ce946e-ba74-4e0e-b1da-32a1620ad724
  modified: 2026-09-04T01:49:22.660Z
---

**The whole site is the redesign, Chirpy is stripped, Bootstrap is gone, and the post page's
furniture is finished.** `npm test` green throughout: eslint 0, stylelint 0, load-order checker 0.

**Decisions executed:** D46-D49 (port everything, strip Chirpy, delete Bootstrap, keep the lab),
D50 (tooltips deleted outright), D51 (the code block shipped - D20's wrapper plus Rod's syntax
mapping), D52 (the narrow-viewport TOC deleted entirely).

## What landed 2026-09-02/03, beyond the strip

- **The code blocks render for the first time.** The `--syn-*` variables sat on `.prose pre code`,
  which matches NOTHING once Rouge's table layout nests code as `code > table > td > pre`. A locked
  palette had never once drawn. `_plugins/syntax-retag.rb` now supplies the four mappings Rouge
  cannot express (all four found by Rod looking at a rendered block, not by a checker).
- **The comments** moved into the post column, took the site's palette, and the cursor lantern
  works over them via a transparent shield in `.post-comments`.
- **Smaller:** scrollbar findable, progress bar is a readout not a control, sparks moved onto it,
  footer credit gone, achievements' flavour/effect fixed strings.

## THE NEXT PHASE - the CSS/JS split and rebuild

**Rod named it and the plan is written**, measured, in `docs/REFACTOR-PLAN.md` under "THE NEXT
PHASE", marked PROPOSED. It absorbs what was left of Phase 2; the naming pass rides along because
renaming is cheapest while files are already moving.

**The measurements that drive it:** 59 stylesheets / 10,079 lines shipping as ONE sheet to every
page; **two parallel JS systems** (39 files bundled by Rollup, 16 served raw as ES modules); and
the scene bundles at 823KB and 512KB against 29KB for the next largest.

**THE BIGGEST WIN IS POST VIDEO, measured 2026-09-03:** one post transfers **31.43MB, 99% of it
autoplaying video**, against 0.29MB for a post with none - ten 1920x1016 clips decoding at 265
megapixels/second while sitting off screen. 38x the scene bundle. `_includes/post-media.html:13`
emits video with no lazy gate while the `<img>` branch one line later gets `loading="lazy"`.

**AND A CLAIM I HAD WRITTEN HERE WAS FALSE, corrected the same day:** "eight page types download
the scene without ever rendering one". They render it. `minimal` is lanterns + fireflies +
post-processing with only dock and water hidden (`_layouts/default.html:26`), on 29 pages. Not
requesting the bundle would strip their background. The waste is real but narrow - dock and water
shipped and hidden - and recovering it needs a third Rollup entry point.

**THREE QUESTIONS BLOCK STEP ONE** - bundled or raw for the unified JS tree; how far the CSS split
goes; and whether shrinking the scene bundle is in scope or stays iceboxed.

## Open, and who owns each

1. **The Edge ghost box on the landing reel** - a rectangular box the size of the reel that tracks
   the scroll. **Rod's tests narrowed it hard:** deleting any other element does nothing, deleting
   the `<video>` kills it; pausing it stops the motion but the box remains; `overflow-x: clip` is
   ruled out. So it is the video's own composited layer and pausing is not enough - the element has
   to be unmounted when off-screen. An agent has this. **Three attempts are already dead and
   recorded in the file so none is retried.** Only Rod can confirm a fix; nobody else has Edge.
2. VFX pill blue (P499), projects spacing (P486), dead top-bar magnets, the never-run fireworks
   flash audit, 34 files with em dashes.
3. **The claude-idea ratio rollup in `element-tracker.md` is self-marked STALE**, so the <25%
   provenance gate is unverified for everything shipped since June. Worth a recount before the next
   ship-check.

Related: [[feedback_verify_the_premise]], [[project_cascade_layers]], [[feedback_measure_dont_trust_tokens]],
[[project_merge_port_divergence]], [[feedback_agent_queue_workflow]].

## THE LAB CLEANUP, 2026-09-04

Rod: *"i want it clean since the major visual refactor has already been done and finished."* **101
tracked files deleted**, all recoverable with `git show 047213e:<path>` - the six `final-*` pages
plus `a3-assembly`, 7 blockouts, 7 ratios/tuners, 5 `rework-*`, 9 `*-tests`, `archive/`,
`original-css/`. Full list in `redesign-lab/HANDOFF.md`.

**THE TRAP, and it is the opposite of what the names suggest:** `_TRASH-2026-08-25/` (35M) and
`_BACKUP-pre-deletion-2026-08-26/` (1.5M) are **gitignored with zero tracked files**. Deleting them
is PERMANENT. 34M of the trash folder is `_ref-emissive-dissolve`, a reference that feeds the live
character-scene dissolve track. Check `git ls-files` before deleting anything in the lab - the
folders named disposable are the only ones git cannot restore.

Kept for stated reasons: `scene-tuner.html` (drives the LIVE scene bundle), `washi-tape-tests.html`
(the tape tips are unfinished), `references/` (the gallery loads 231 images from it),
`analysis/` + `sources/` (what provenance citations point at).
