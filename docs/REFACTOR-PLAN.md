# Refactor plan

Brief: the flaws the 2026-08-11 scan found, and the phased plan to fix them. Each phase is
independently shippable and names its own test recipe before work starts. Owner tags: ROD =
in-editor/manual, CLAUDE = code or docs on request, preview-first.

**TIMING (ROD, 2026-08-11): Phases 1-3 are DEFERRED until the visual redesign ships** - the
redesign replaces the very surfaces Phase 1 would extract (post.html, topbar, theme Sass), so the
boundary work happens ONCE, on the final surfaces ([DECISIONS.md](DECISIONS.md) D6). Phase 0 is
done. Housekeeping items can land any time.

## The flaws (scan of 2026-08-11)

**Structural**

- The repo is a vendored Chirpy fork with NO site/theme boundary - stock and custom code
  interleave in the same files, distinguishable only by git blame. Full coupling list (11 items):
  [THEME-BOUNDARY.md](THEME-BOUNDARY.md).
- Fragile couplings instead of contracts: `animationName` string-matching, a manually synced
  `$breathe-selectors` list, front matter read directly at many render sites, layout names doubling
  as the JS-delivery contract, content directory layout doubling as the routing contract.

**Docs**

- PROJECT-STATUS.md was ~4 months stale with wrong counts; CLEANUP-LOG.md's claims no longer held
  (`_animations.scss` grew back to 574 lines after the logged 401); `docs/` was empty but still
  excluded in `_config.yml`; no architecture or decision records existed at all.
  (FIXED 2026-08-11 - this docs system.)

**Hygiene**

- `_gif-archive/` 414 MB and `.claude/worktrees/` ~900 MB inflate the working copy.
- `redesign-lab/` carries separate copies of live Three.js modules (intentional during the
  redesign; still a hazard).
- 10 of 16 tech-art posts are `wip: true` placeholders (content debt, not code debt).

**What is already good** - eslint/stylelint/prettier/commitlint/husky + CI all in place; dead theme
cruft has been actively pruned before; the custom subsystems themselves are feature-complete.

## Phase 0 - ground truth + docs reset (DONE 2026-08-11)

- Docs folder landed at `docs/`; PROJECT-STATUS.md and CLEANUP-LOG.md retired (still-true content
  folded into [STATUS.md](STATUS.md) / [BREATHING.md](BREATHING.md) / [TRAPS.md](TRAPS.md)).
- /sync-docs skill retargeted at this system.
- Remaining housekeeping (any time): move `_gif-archive/` out of the repo (ROD), prune
  `.claude/worktrees/` (ROD).
- **Test recipe:** a fresh Claude session orients from CLAUDE.md + STATUS alone, without reading
  any superseded doc; `npm run build && bundle exec jekyll b` still passes untouched.

## Phase 1 - draw the theme boundary (no behavior changes) [DEFERRED: post-redesign]

- Diff every `_layouts/`, `_includes/`, `_sass/`, `_javascript/` file against upstream Chirpy;
  fill the stock/modified/custom table in [THEME-BOUNDARY.md](THEME-BOUNDARY.md). Pin the fork
  point and record the upstream tag in [UPSTREAM.md](UPSTREAM.md).
- Extract our logic out of modified stock files into our own includes/partials - post.html's
  chips/takeaway/wip blocks become custom includes the layout calls; topbar's toggles likewise.
- Create the Sass override layer; move our variables out of `themes/_dark.scss`/`_light.scss`;
  split `_animations.scss` into stock-remnant vs breathing-system files.
- Foldered separation in `_javascript/` between Chirpy-original and custom modules.
- **Test recipe per extraction:** build passes AND the rendered page is pixel-identical (Rod
  spot-checks the affected page); PurgeCSS output diff reviewed after any include/layout move
  (its scan paths changed - see [TRAPS.md](TRAPS.md)).

## Phase 2 - decouple the subsystems (contracts over couplings) [DEFERRED: post-redesign]

- `data-breathing` attribute as the single semantic hook: Sass targets it, `mouse-trail.js` queries
  it - kills the `$breathe-selectors` manual sync AND the `animationName` string-match in one move.
- Front matter consumed through a small set of dedicated includes instead of scattered reads.
- Document the layout->bundle map and the PurgeCSS scan paths as named contracts with drift
  warnings at both ends.
- Fold or delete the redesign-lab Three.js duplicates (ROD decides keep/kill per file).
- **Teardown + memory audit** (ROD 2026-08-14, parked here deliberately rather than done during the
  redesign, since it would audit surfaces the redesign is about to replace). Every
  `addEventListener`, observer, `requestAnimationFrame` loop and three.js resource needs its
  teardown twin, which is the same class of bug TRAPS already records: the PWA keeps the session
  alive across navigations, so anything registered without a teardown leaks into the next page.
  Three.js needs explicit `.dispose()` for geometries, materials, textures and render targets;
  `lantern-controller` and `firework-controller` already dispose, so the audit is about coverage
  and about the modules that do not.
  **Measure, do not grep:** repeated navigations with heap and GPU memory sampled between them,
  looking for a rising floor after collection rather than a peak. A leak here shows up as the
  machine paging, so the symptom to watch is `pagefile.sys` growth, not a large file on disk.
- **Test recipe:** breathing toggle, sparkler detection, achievements hooks, and section pages all
  behave identically; grep proves zero remaining `animationName` matching and zero direct
  `$breathe-selectors` consumers; heap after N navigations returns to its starting floor.

## Phase 3 - theme-swap readiness [DEFERRED: after Phases 1-2]

- Write the site/theme contract: what any theme must provide (layout names or a mapping layer, the
  hooks our includes attach to, the custom-property surface our Sass expects).
- Decide vendored-but-clean vs returning to a gem-based theme. DEFERRED until Phases 1-2 land -
  the decision is meaningless while the boundary does not exist.
- **Test recipe:** a written walkthrough of "swap to theme X" touches only contract files, not
  subsystem internals.

## Order

0 (done) before 1; 1 before 2 (cannot decouple what you cannot tell apart); 3 only after 2. All of
1-3 wait for the redesign. Housekeeping items can land any time.
