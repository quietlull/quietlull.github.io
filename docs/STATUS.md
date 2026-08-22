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
  1.4 -> 0.45, radius 0.3 -> 0), both annotated Rod 2026-08-13. CORRECTED 2026-08-21: these are
  COMMITTED (`970a6ba`, `0acec39`), as is the Sarah avoidance rework (`ae2c59c`) - the old
  "uncommitted" line was stale. Sarah's radii were still never re-tuned per scene. What IS
  uncommitted today is the perf session's `three-shared.js` / `three-background-scene.js` work
  (antialias off, pixel ratio capped at 1, bloom at half res, composer + THREE exposed for the
  tuner).
- **THE SCENE PASS IS DONE AND LIVE (2026-08-22).** Bloom is a 2-level Dual Kawase in the bundle
  (`shader/kawaseBloom.js`); UnrealBloomPass, the bright pass and `threshold` are gone. A paper-grain
  filter is composited inside that pass at zero extra passes, and the render resolutions dropped
  behind it - **pixel ratio 0.5, bloom 0.25, reflection 0.25** (D24; the two are one decision).
  Lighting numbers: sky `0x162237`, strength 0.7, radius 0.15, `uSunLift` 1.5, no tone mapping.
  Fireworks: particle directions baked on the CPU, rocket trail deleted, trail copies stay at 10.
  Scene bundles went **3 -> 2** - `general` retired, `minimal` everywhere but About, which cost
  those pages their fireworks and narrowed the topbar toggle to `section-about`.
  **FIVE DEBTS CARRIED, none of them blocking but all of them real:** the Shadertoy URL is still
  owed for the paper filter's `element-tracker.md` row (live without provenance, flagged by three
  ship-checks); there is no `prefers-reduced-motion` path anywhere in the scene code although D21
  requires one, and the paper boil now runs 3.25/sec behind body text on every post; that boil
  clears WCAG 2.3.1 only on amplitude, not frequency; there is no WebGL-absent fallback; and
  **nothing has been re-profiled since UnrealBloomPass was removed**, so every ms figure in D23 and
  in the tuner header describes a pass that no longer exists. Re-run the ablation before quoting any
  of them (#37).
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

## The job is now ONE thing

**Finish `redesign-lab/` until it can replace the entire main site in a single port.**
D22, Rod: *"zero main page stuff at this point."* `_sass/`, `_layouts/`, `_includes/`,
`_javascript/`, `_config.yml` are OFF LIMITS. Repo hygiene that touches no rendered surface is fine.

Orient from **`redesign-lab/HANDOFF.md`** (rewritten 2026-08-18, current). Open work is
**`docs/REQUESTS.md`** - read the OPEN table only; done rows are phantoms.

## Build target: the `final-*` group

Six pages, each containing ONLY its chosen blockout, every slot greybox until Rod approves that
specific element. State panel on each. `final-landing` is 3 of 8; the rest are 0. The only approved
things on the whole site are the favicon, the V6 hero and the scene bottom.

## Two new judging surfaces

- **`prose-blockout.html`** - the whole reading system in reading order at stripe's 663px measure,
  all six callout candidates in real sequence. Callouts get judged HERE, not in isolation: a callout
  alone in a 340px card cannot show how it reads between a heading and a code block.
- **`element-gallery.html`** - 9 real cropped screenshots of live elements, take/leave per card.

## Decisions this session

D15 sub-page winners (resume dropped, About keeps two) - D16 rounded gothic, no serif -
D17 no chevron - D18 colour comes last - D19 source ELEMENTS not layouts - D20 code block, post rail,
toggles out of the bar - D21 one control (scene + all motion) - D22 lab only.

## What it cost, so it is not repeated

`projects-aggregate.html` built and rejected as *"the most ai generated page i have seen"*, and six
elements added to the landing that Rod never asked for. Same root, now hard gates in
[PAGE-PROCESS.md](PAGE-PROCESS.md): **the blockout is a contract** (an aggregate contains only its
approved blockout's elements, never more) and **stages are dependencies** (missing context = ASK).

## Numbers

Of 72 tracked elements: 40 Slop with no source, 11 Slop with a source saved, 12 circular-citation,
21 with real provenance. Port substrate gap: 39 lab tokens vs 270 live, **2 names in common**.

## Waiting on Rod

Prose-blockout judgement - element-gallery take/leave - code-block colours (and whether syntax is an
explicit carve-out from the palette law, which bans cool accents and red) - whether the fireworks
reward keeps its own button despite D21 - About layout - and the palette export, which is the only
item that can be LOST rather than deferred: the approved colours live in
`localStorage['lab-palette']` in his browser and in no tracked file.
