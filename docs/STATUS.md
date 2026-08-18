# Status

Keep this note to roughly one screen. It answers "what is true right now" so a session orients
cheaply. Detail lives in the linked notes; history lives in [CHANGELOG.md](CHANGELOG.md).

## Current (2026-08-11)

- **Docs system LANDED (Phase 0 done).** PROJECT-STATUS.md and CLEANUP-LOG.md are RETIRED - their
  still-true content was folded into these notes (breathing system -> [BREATHING.md](BREATHING.md),
  behavioral lessons -> memory, the rest is history in git). The /sync-docs skill now targets this
  folder.
- **Redesign ACTIVE.** Element-by-element build in the `redesign-lab/` bench (gitignored),
  governed by the provenance law (see CLAUDE.md). Palette exploration running in parallel.
  Current branch: `claude/water-rework` (About-page water rework).
- **Refactor Phases 1-3 DEFERRED until the redesign ships** ([DECISIONS.md](DECISIONS.md) D6) -
  boundary extraction happens once, on the post-redesign surfaces.
- **Measured ground truth (2026-08-11 scan):** 38 SCSS files / ~8,158 lines; 48 JS files / ~5,520
  lines; 19 posts (16 tech-art, 2 game-design, 1 blog; 10 wip: true); 15 layouts; 51 includes.
  Re-measure before relying on counts - they rot fast.
- **The site is a vendored Chirpy fork with no theme/site boundary.** Stock and custom code
  interleave in the same files. Full inventory: [THEME-BOUNDARY.md](THEME-BOUNDARY.md).
- **Housekeeping pending:** `_gif-archive/` (414 MB) to move out of the repo (compressed MP4s
  already deployed; originals kept for rollback); `.claude/worktrees/` (~900 MB) to prune.

## In flight

- **V6 IS THE HERO (LOCKED 2026-08-16, ROD).** `hero-tests.html?v=v6` - three upright all-caps
  vertical columns at the right edge plus the large live clock. Two changes landed on it the same
  day: the social rail now hangs 48px under the vertical name (the same gap the name takes from
  the top bar) instead of sitting at harumaki's 50%, and the top bar's favicon was unbundled from
  the wordmark (gap 14 -> 38px, name KEPT - Rod).
  SUPERSEDED 2026-08-18: the mark is no longer capped at 60px. It is FULL-BLEED - a square of the
  bar's full height, anchored hard to the left edge, escaping the bar's padding with negative
  margins. The old cap existed to stop the bar growing past 96px and breaking a hard-coded
  `calc(100vh - 96px)` hero; that constant is gone too. `--top-bar-height` is derived from the row
  heights at every breakpoint and declared on `:root`, so the mark and the hero both size against
  the real bar.
- **ALL SIX SUB-PAGE BLOCKOUTS BUILT (2026-08-16) - AWAITING ROD'S EYE.** `post-` `projects-`
  `about-` `ramblings-` `resume-` `portal-blockout.html`, greybox, 4 sourced variants each (24
  total), every one transcribed from a live site read from its own CSS. Source ledger + the
  verification numbers: `analysis/2026-08-16-subpage-sources.md`. Per-variant specs:
  `analysis/subpage-specs/`. **Next step is ROD JUDGING, then clean-agent verification** per
  [PAGE-PROCESS.md](PAGE-PROCESS.md) - not more building.
  **Portal is a THREE-way, not two** (live `portal.html` also ships a Ramblings link).
  Component gaps blocking the aggregate stage: `analysis/2026-08-16-component-gaps.md` - POST and
  ABOUT are genuinely blocked, PROJECTS can attempt it with placeholders, RESUME starts from zero.
- ~~**FOUR PAGE BLOCKOUTS AWAITING ROD'S EYE (built 2026-08-16).**~~ REJECTED same day, archived
  under `redesign-lab/archive/2026-08-16-rejected-subpage-tests/`. They were coloured rather than
  greybox, under-sourced, and built with no analysis. Superseded by the line above.
  <!-- kept one release so a stale link does not read as a live direction -->
- **(superseded, for reference)** `post-tests.html` (the important
  one, and the SHARED template for projects + ramblings), `projects-tests.html`,
  `ramblings-tests.html`, `about-tests.html` - all with variant bars, PROV panels and the live
  scene behind, same pattern as hero-tests. Post is transcribed from stripe.dev measured at 1440:
  24-col grid at 58.375px, sticky rail exactly 6 cols, prose exactly 12 cols, h1 101/93 weight 300.
  Two post variants because the version ROD prefers is the awwwards entry, which is NOT live -
  variant 2 inherits the measured structure and takes only the float-over-imagery idea from their
  imagery. The others are built from measured profiles already in `analysis/layout-measurements.md`.
- **Caveat is on the way out.** Rod is replacing the hand font with a LINE BOIL text animation,
  clock included, so the "do all-caps in Caveat read right" taste call was dropped unanswered.
  Tracing route for the drawn half: Calligraphr (handwriting -> font), Glyphr Studio / FontForge
  (outline editing), Inkscape trace-bitmap. The clock cannot use traced variants (10 digits x 3
  boil frames, changing every second) so it wants procedural path jitter - rough.js is the sourced
  precedent, and this keeps the boil on the D10 shader-work side rather than the drawn-art side.
- **Redesign LAYOUT phase (active).** Three artefacts, all in `redesign-lab/`:
  `landing-blockout.html` (greybox layouts + a provenance panel naming each borrowed move),
  `a3-assembly.html` (the same layouts built from real bench components over the live lantern
  scene - **judge here**), and `reference-gallery.html` (99 cards, verified captures, a Sub-pages
  section grouped by page type). Rules in [DECISIONS.md](DECISIONS.md) D8/D9.
- **Open problem: the type decision.** A full font audit of every reference site
  (`redesign-lab/analysis/`) found four of the five harumaki sites render in mincho/serif
  (Yu Mincho, Noto Serif JP, Zen Old Mincho, Trirong) while only /ndt/ uses a rounded gothic
  (M PLUS Rounded 1c, a sans). That contradicts the locked "hand-drawn name + clean mono, no
  serif" call. Their large titles are usually artwork, not type. The assembly carries two
  **twins of the same layout** (`A3 harumaki · mincho` / `· sans`) that differ ONLY in typeface,
  so the call can be made on one layout instead of across two. Still Rod's to make.
- **Missing components BUILT (2026-08-13)** - `seam-band`, `edge-rails`, `dated-timeline`,
  `picture-frame`, each transcribed from its source site's re-fetched CSS. Every A3 variant now
  assembles from real components; the only greybox left is the in-scene identity art, which is
  artwork on the character-scene track, not code.
- **The borrowed painted DIVIDERS are REJECTED (2026-08-13, ROD).** Seam band, cloud partition and
  the /10/ curtain rails all exist to divide flat painted colour fields; this site has one
  continuous live scene instead, so they read as stickers over it. The components stay in
  `extracted/` as proven transcriptions, unused. Sections get separated by SPACE (thatskygame does
  exactly this, 150-360px per zone), by the scene showing through the largest gaps, and by the
  section label - no painted strip needed.
- **Direction chosen instead: sparkler, foreground objects, lantern garland** - all ADDITIVE to the
  three.js scene rather than drawn over it. Sourcing not started; nothing built. `dated-timeline`
  survives the cull but its placement under Skills does not (the frozen 12-section flow has no
  ramblings section, so the log has no legitimate home yet - Rod's call).
- **The handmade signature is SHADER work, not drawn art ([DECISIONS.md](DECISIONS.md) D10,
  2026-08-14).** The gallery teardown found Rod's favourites get their warmth from drawn assets
  (harumaki main: 304 images, zero tokens) while this site describes everything in CSS. Rod is a
  shader artist, not a 2D artist, so the equivalent of their drawings is his procedural work. The
  "artwork owed" list is re-pointed at scene and shader work. Keep the design tokens: the
  references' lack of a system reflects throwaway microsites, not a lesson for a forever project.
- **Gallery re-analysed from source (2026-08-14):** 53 of 57 sites, corrections listed in
  `redesign-lab/analysis/2026-08-14-gallery-teardown.md`. Method worth reusing: read the HTML and
  CSS, not the captures - "is this device CSS or artwork" is invisible in a screenshot.
- Remaining decisions (frame opacity, timeline content and home, the layout cull) are listed in
  `redesign-lab/analysis/2026-08-12-a3-assembly-decisions.md`.
- **ANIME GLOW track - the flat emissive IS LIVE now (corrected 2026-08-16).** The A/B bench is
  `redesign-lab/anime-glow-scene.html`; rule and evidence in [DECISIONS.md](DECISIONS.md) D10
  (bloom entry). The earlier "nothing live changed" line here was stale: `shader/lanternShader.js`
  now runs a FLAT emissive and `three-config.js` carries the matching bloom retune (strength
  1.4 -> 0.45, radius 0.3 -> 0), both annotated Rod 2026-08-13. Still UNCOMMITTED in the working
  tree, alongside the Sarah avoidance rework whose radii were never re-tuned per scene.
- Palette exploration (`redesign-lab/palette-explorer.html`) - Sodium & Sky is the frontrunner.
- Next refactor step (post-redesign): Phase 1 boundary audit.

## Content open items

- 10 WIP tech-art posts awaiting real content; commented-out image blocks with TODO markers.
- Umamusume game-design post awaiting Rod's cropped images (`assets/media/UmamusumeInheritance/`).
- `_posts/personal/` routing scope exists in `_config.yml` but the directory has no files yet.
- Feature backlog (achievements, easter eggs, unlockables, Three.js model upgrades):
  `redesign-lab/feature-backlog.md` is the master index.

---

# SESSION SAVE - 2026-08-18 (read this first after a clear)

## Merge readiness

**[MERGE-WORKLIST.md](MERGE-WORKLIST.md) is the answer to "what is left before we merge."** Built
2026-08-18 from an eight-agent sweep, 111 verified findings, ordered into gates. Read it instead of
reassembling the question. Headline: nothing of the redesign has ever touched the live site, and the
two sides share **2 token names out of 39 and 270** - so the port needs a token bridge, a Rollup
decision and an SCSS delivery decision sequenced ahead of any component work.

## What changed this session

- **FINAL LANDING BUILT** - `redesign-lab/final-landing.html`. ROD: *"we are using A3 NDT as the
  main base of the new landing, keep the changes we did to the hero test and combine them."*
  Layout is `a3-assembly` body.a3seam (harumakigohan.com/ndt): M PLUS Rounded 1c, content in a
  narrow column inset 18.5% each side, descent rhythm. Hero is the LOCKED V6 verbatim. Everything
  below the hero is the same bench components as new-landing; nothing was rebuilt.
  **One deliberate omission, flagged in the file header:** ndt's 160px painted SEAM BAND is NOT
  there, because the borrowed painted dividers were rejected 2026-08-13 (they read as stickers over
  a continuous live scene). Sections are separated by space instead, per that decision. Say the
  word and the band comes back from `extracted/components/seam-band`.
  Verified at 1440 and 895: bar + hero = viewport exactly, mark matches the bar, social rail sits
  exactly 48px under the vertical name, no overflow, no console errors.
- **CALLOUTS ARE SOURCED.** Eight sites fetched by curl and independently re-verified; records in
  `redesign-lab/sources/*-prose.md`. `component-blockout.html`'s callout section is now split into
  three ROLE sections (note / pull quote / TL;DR) with 32 greybox variants, zero non-grey colours.
  The headline finding: **stripe.dev has no callout system at all** - that is now variant G, not a
  gap. Four real recipes landed (Maxime escaping badge + label tab, catlikecoding disclosure aside,
  MinionsArt fill-only and dropped panel), joining Cyanilux.
- **stripe.dev is in the gallery** - S tier, plus post-template and post-index sub-page cards, all
  captured fresh at the exact URL ROD named.
- **Lab index rebuilt** and reordered by what needs ROD's eye. Four superseded pages retired to
  `archive/2026-08-18-retired/`. Every link verified 200.
- **Favicon**: rotation now persists on hover-off, position springs back (the previous pass had it
  backwards). `data-magnet-hold` is deleted from the engine.
- **Top bar scaling ladder**: `--top-bar-height` is derived from the rows at every tier and now
  lives on `:root`, so the mark and the hero both size against the real bar instead of a constant.

## OPEN DECISIONS - waiting on Rod

1. **Callout family** - now a real choice rather than a shortage. Six sourced treatments in
   `component-blockout.html`, three roles. The live question is still: three separate objects, or
   one object in three roles? Maxime's label tab is the option that answers it without three
   objects. Rod has already said REPLACE ALL EXCEPT the stamp takeaway.
2. **Final landing** - does the ndt seam band come back, or does space carry the transitions?
3. **Component picks** from `component-blockout.html`: code block, meta chips, prev/next, hero
   media, TOC.
4. **Projects** - Kaito vs MinionsArt, no winner. **About** - dimden vs Klubnika, no winner.
   **Ramblings / Resume** - "try them all" is not yet a pick.
5. **Portal** - two verified sources (ZUTOMAYO, Space Jam); fold in the 109ichiki/zutomayo popup
   windows, replacing the unlabelled satellites.
6. **Type decision** - mincho vs rounded gothic. final-landing currently commits to the ROUNDED
   GOTHIC, because that is what A3 ndt is. That is a de-facto answer if it ships.
7. **Wordmark** - kept as plain text, replace near the end (backlog R2).
8. **Achievements design pass** - backlog E1b.
9. **Where the dated timeline lives** - the frozen flow has no ramblings section for it.
10. **Mobile top bar** - below 560px the mark stops being full-bleed and goes inset, because a
    square the height of a three-row bar leaves no room for the toggles. Deliberate, but untuned.

## UNCOMPLETED TASKS

- **ROD: get the Z measurements of the scene** (backlog R1) - gates the near-water firework band.
- **Build the sourced components** - the callout recipes are sourced and greyboxed but not BUILT.
- **Re-source the 12 circular-citation components** - each now carries a warning in its CSS header.
- Aggregates for the other blockouts (only post exists, and only as a worklist).
- Reduced-motion path for the card cursor-reveal; FPS check on `filter:blur()` + `mix-blend-mode`.
- `npm test` is RED from ~3309 pre-existing lint errors, mostly in `redesign-lab/`.
- Uncommitted in the working tree: the flat-emissive shader + bloom retune, and the Sarah
  lantern/firefly avoidance rework whose radii were never re-tuned per scene.

## THE THING THAT KEEPS GOING WRONG

Five failures logged, one root: **the mechanics were verified and the premise never was.** The
tally is in [PAGE-PROCESS.md](PAGE-PROCESS.md) under REPEAT-OFFENCE TALLY and it grows by
repetition on Rod's instruction - do not tidy it.
