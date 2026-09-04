# Refactor plan

Brief: the flaws the 2026-08-11 scan found, and the phased plan to fix them. Each phase is
independently shippable and names its own test recipe before work starts. Owner tags: ROD =
in-editor/manual, CLAUDE = code or docs on request, preview-first.

**TIMING, UPDATED 2026-09-02. The wait is over: the redesign shipped** (merged to `main` at
`ff72c0e` on 2026-08-26, all 53 pages ported). The original note read *"Phases 1-3 are DEFERRED
until the visual redesign ships"*, on the reasoning that the redesign replaces the very surfaces
Phase 1 would extract, so the boundary work should happen ONCE on the final surfaces
([DECISIONS.md](DECISIONS.md) D6). That held, and it worked. **Phases 0 and 1 are now DONE**
(Phase 1's audit is [THEME-BOUNDARY-AUDIT.md](THEME-BOUNDARY-AUDIT.md)); **Phase 2 is the next
phase and nothing blocks it.** Housekeeping items can land any time.

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
- `redesign-lab/` carries separate copies of live Three.js modules. The redesign shipped, so
  "intentional for now" no longer applies and this is just a hazard: as of 2026-09-01 the lab's
  water is five changes behind live ([TRAPS.md](TRAPS.md)). Folding or deleting the duplicates is
  the Phase 2 item below.
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

## Phase 1 - draw the theme boundary (no behavior changes) [DONE 2026-08-25]

**Every file is diffed against upstream Chirpy 7.3.1 in
[THEME-BOUNDARY-AUDIT.md](THEME-BOUNDARY-AUDIT.md): 25 stock, 46 modified, 81 ours, 39 deleted
after the strip pass.** The extraction items below are recorded as written; the ones the redesign
made moot (the theme Sass split, `_animations.scss` splitting off breathing) went a different way,
because D42 declared the old design's styles dead and D43 killed breathing outright.

- Diff every `_layouts/`, `_includes/`, `_sass/`, `_javascript/` file against upstream Chirpy;
  fill the stock/modified/custom table in [THEME-BOUNDARY.md](THEME-BOUNDARY.md). Pin the fork
  point and record the upstream tag in [UPSTREAM.md](UPSTREAM.md).
- Extract our logic out of modified stock files into our own includes/partials - post.html's
  chips/takeaway/wip blocks become custom includes the layout calls; topbar's toggles likewise.
- Create the Sass override layer; move our variables out of `themes/_dark.scss`/`_light.scss`;
  split `_animations.scss` into stock-remnant vs breathing-system files.
- Foldered separation in `_javascript/` between Chirpy-original and custom modules.
- **Test recipe per extraction:** build passes AND the rendered page is pixel-identical (Rod
  spot-checks the affected page). ~~PurgeCSS output diff reviewed after any include/layout move~~
  **STRUCK 2026-09-02: PurgeCSS is gone (D48), so moving an include can no longer drop styles.**

## Phase 2 - decouple the subsystems (contracts over couplings) [DEFERRED: post-redesign]

- ~~`data-breathing` attribute as the single semantic hook: Sass targets it, `mouse-trail.js`
  queries it - kills the `$breathe-selectors` manual sync AND the `animationName` string-match in
  one move.~~ **STRUCK 2026-09-02: there is nothing left to hook.** Breathing is dead (D43) and its
  tokens went with it. MEASURED: zero matches for `data-breathing`, `$breathe-selectors` or
  `--breathe` anywhere in `_sass/`, `_includes/`, `_layouts/`, `_javascript/` or `assets/js/`. Its
  successors are drift and magnetism, which are already single-purpose behaviours (D39), which was
  the point of the hook.
- Front matter consumed through a small set of dedicated includes instead of scattered reads.
- Document the layout->bundle map as a named contract with drift warnings at both ends.
  ~~and the PurgeCSS scan paths~~ **STRUCK 2026-09-02: PurgeCSS no longer exists.** D48 removed
  Bootstrap completely, and `purgecss.js` and `_sass/vendors/` went with it. MEASURED: neither path
  is on disk, and `package.json` has one build script left, `build:js`.
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

## Phase 3 - vendored but clean [DEFERRED: after Phase 2]

**REWRITTEN 2026-09-02. Rod ruled on 2026-09-02 that Phase 3 is "vendored but clean", so the goal is
no longer theme-swap readiness.** We stay on the vendored fork and own our layer of it well enough
that **a Chirpy upgrade is a clean overwrite plus a re-apply list**: drop the new upstream in, then
work down a written list of our changes and put them back. Nothing is built to make swapping to a
different theme easy, because nobody is swapping.

- **The old first item is answered and comes out:** *"decide vendored-but-clean vs returning to a
  gem-based theme"*. Vendored, clean. It was deferred on the grounds that the decision is
  meaningless until the boundary exists; the boundary now exists (Phase 1 is done,
  [THEME-BOUNDARY-AUDIT.md](THEME-BOUNDARY-AUDIT.md)) and Rod has decided.
- Write the upgrade contract: for every file the audit marks MODIFIED, what we changed and why, in
  a form that can be re-applied against a newer upstream. The STOCK files need nothing, and the
  OURS files are not upstream's business.
- Shrink the re-apply list by moving our logic out of modified stock files, which is Phase 1's
  extraction work continued rather than a new idea.
- **Test recipe:** a written walkthrough of "upgrade to Chirpy X" that names every file the
  overwrite would clobber and where its replacement lives. If a file is on the list and nobody can
  say what we changed in it, the contract is not done.

## THE NEXT PHASE - the CSS/JS split and rebuild (PROPOSED 2026-09-03, awaiting Rod)

Rod named this himself: *"I think ill do the naming pass once we start the full CSS and JS
splitting and rebuild"*. It absorbs what was left of Phase 2 rather than running beside it - the
"layout -> bundle map as a named contract" item IS this work, and the naming pass (P511/P514) rides
along because renaming is cheapest while the files are already being moved.

**Everything below is measured, 2026-09-03.** Re-measure before trusting any number.

### What is actually there now

| | files | lines | ships as |
|---|---|---|---|
| `_sass/` | 59 | 10,079 | ONE stylesheet, on every page including the 404 |
| `_javascript/` | 39 | 4,914 | Rollup -> 10 bundles in `assets/js/dist/` |
| `assets/js/` (excl. dist) | 16 | 2,506 | raw ES modules, `<script type="module">`, no build step |

Bundles by weight: `three-background-scene` **823KB**, `three-background-minimal` **512KB**, then
`post` 29KB, `page` 25KB, `home` 24KB, `misc` 23KB. The scene bundles are two orders of magnitude
above everything else, so any conversation about JS size is a conversation about those two.

### The four problems, in the order they cost the most

**1. THERE ARE TWO JAVASCRIPT SYSTEMS AND THEY HAVE DIFFERENT RULES.** `_javascript/` is bundled by
Rollup; `assets/js/` is served raw as ES modules. Same language, same site, two build stories, two
places to look, two conventions for imports. This is the single biggest structural problem and
nearly every other item gets easier once it is one system. It is also the direct cause of a bug
class we have already hit: `merged-card.js` and `project-cards-expensive.js` both existed, one was
dead, and a comment inside the dead one claimed the opposite.

**2. THE `minimal` TIER IS NOT MINIMAL.** `chrome-scripts.html` only branches on `none`, so every
other tier including `minimal` falls through to the 823KB full scene. Eight page types (portal,
projects, ramblings, archives, blog, page, tag, under-construction) download it and never render a
scene. This is the largest user-facing win available anywhere in the repo and it is a routing fix,
not an optimisation.

**3. ONE STYLESHEET SHIPS TO EVERY PAGE.** 10,079 lines, including `pages/_post.scss` (511) on the
portal and `pages/_portal.scss` on posts. Splitting per-page is real work because of the cascade
layers (D36) - load order currently decides several ties, and `tools/css-order-check.mjs` exists
because getting that wrong cost the wordmark once.

**4. THREE NAMING CONVENTIONS ARE LIVE AT ONCE.** Upstream Chirpy ids (`#toc-bar`), vendor classes
we now theme (`.gsc-*`, Primer `--color-canvas-*`), and two of our own token families that overlap
(`--gold-20`/`--gold-35` alpha ramps vs `--color-gold`/`--color-glow` semantic names). The
scrollbar being invisible was exactly that overlap - an alpha-ramp token used where a semantic one
was meant.

### Proposed order, and why this order

1. **Honest tiers first.** Biggest win, smallest diff, touches one include. Independent of
   everything else, so it can ship on its own and be judged on its own.
2. **Collapse the two JS trees into one.** Decide bundled-or-raw once, move the 16 stragglers,
   delete the duplicate-module hazard. Do this BEFORE any renaming, so names are only changed once.
3. **The bundle contract**, which is Phase 2's outstanding item: write down which layout loads
   which bundle, with a drift warning at both ends. Cheap once step 2 makes the map true.
4. **Split the stylesheet per page.** Largest and riskiest, and it wants the load-order checker
   watching every step. Do it last, when nothing else is moving.
5. **The naming pass rides steps 2 and 4** rather than being its own pass.

### What needs Rod before starting

- **Bundled or raw?** Step 2 needs one answer. Rollup for everything is consistent and gives real
  bundles; raw ES modules for everything drops the build step entirely but ships more requests.
- **How far does the CSS split go?** Per-page sheets, or just lifting the four heaviest page
  stylesheets out of the global one?
- **Is the 823KB scene bundle in scope?** Making the tiers honest does not shrink it; it only stops
  sending it to pages that never use it. Shrinking it is a separate, larger question and the perf
  audit's iceboxed items already speak to it.

## Order

0 (done) before 1 (done, cannot decouple what you cannot tell apart); 3 only after 2. **The
redesign no longer gates anything - it shipped.** Phase 2 is next. Housekeeping items can land any
time.

## Behaviours split out from components (D39, Rod 2026-08-24)

Rod's own framing: *"magnetic should just be a behavior i can stack with drift, border glow, etc."*
Single-purpose, stackable, host-agnostic. The evidence that it matters is already in the tracker:
drift and magnetism could not be separated when the post needed one without the other; the card
edge glow could not be reused on achievement tiles; a second tag style got built because the first
was entangled with button-kit. Full reasoning in DECISIONS.md D39.
