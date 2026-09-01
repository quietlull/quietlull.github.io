# Status

**THE WHOLE SITE IS PORTED AND THE STRIP PASS HAS RUN.** Compiled 2026-08-25 evening, after the
audit-and-fix session. Everything below is measured, not recalled.

## The one-screen update (2026-08-25 evening)

- **All 53 pages are the redesign now.** The 25 that were still old Chirpy (19 tag pages, the
  archive, game-design/blogs, under-construction, the 404) were ported in one pass under D46,
  reusing only shipped components: page-title-desc, entry-row, kit buttons, empty-state.
- **The strip pass ran under D47/his "delete the things we arent using":** both dead comment
  providers, six unused embeds, five unused analytics providers, mode-toggle and its callers,
  post-filter.js, the slap-toggle chain, three old layout stylesheets, the sidebar dimmer, the
  empty tail column, four unreachable includes. The PWA stays - it is genuinely live in production.
- **Phase 1 of the refactor is DONE**: `THEME-BOUNDARY-AUDIT.md`, every file diffed against
  upstream 7.3.1. After the strip: 25 stock / 46 modified / 81 ours / 39 deleted.
- **`npm test` PASSES for the first time** - eslint 0 (and it finally checks `assets/js`, which it
  had been skipping while linting the gitignored lab), stylelint 0, and the Dart Sass 3 `join()`
  deprecation is fixed.
- **The lab is entering version control** (D49): cleaned 140 MB to 75 MB (WebP screenshots, the 54
  scene snapshots condensed to `archive/VERSIONS.md` on Rod's ruling), `.gitignore` now admits it
  while keeping the two hold piles out, and the deploy workflow deletes it from `_site` before
  upload so it never ships.
- **A day of measured fixes landed before that:** sticky restored site-wide (`overflow-x: clip`),
  the boil wordmark first-paints in its own face, the cursor glow escaped `#scrim`, the rejected
  card hover glow is gone, the mobile TOC has a background, Rouge code colours render, heading
  weight 300 -> 500, Bootstrap-free local parity understood (dev builds `main`, prod `main.bundle`).
- **Not committed yet.** The working tree holds all of it; committing in themed chunks is the next
  action. Bootstrap removal (D48) and the callout decision are the two open fronts.

## The previous snapshot (2026-08-26 morning), kept for contrast

## Where things stand in one screen

- **MERGED AND PUSHED TO `main`** at `ff72c0e`, 2026-08-26. 156 commits. `refactor/01-tokens` is
  pushed too, so the individual steps stay available to bisect.
- **Build green, all 53 pages 200**, and the deploy's own checks pass: 0 broken links, 0 broken
  resources, 0 images missing alt, 0 duplicate ids.
- **All six pages ported** - portal, landing, about, projects, post, ramblings. They are the redesign
  now, not the old site with new CSS available.
- **The type ladder reaches real markup site-wide**: h1 61.44 / h2 38.4 / h3 24 / h4 15, weight 300,
  h2 and h3 gold, all in M PLUS Rounded 1c.
- **The old design is gone** - about 2,770 lines: breathing, `_light.scss`, the search subsystem, 8
  dead includes, 2 dead layouts.
- **Comments trimmed 7,362 to 4,821** with the rendered CSS byte-identical.
- **Nothing that moves has been confirmed by anyone.** The automation cannot run animation frames.
  That is Rod's first job and it is the top row of `redesign-lab/todo.html`.

## The five documents from that night

`MERGE-NIGHT.md` first - it is ordered by what deserves the first ten minutes. Then
`ARCHITECTURE-HANDOFF.md` (the next agent starts here), `AUDIT-1-WORKING.md`, `AUDIT-A11Y.md`,
`PROVENANCE-AUDIT.md`.

## THE FAULT THAT DEFINES THIS CODEBASE

**Unlayered CSS beats every layer, regardless of specificity or load order.** It bit **nine separate
times** on merge night alone. Every ported component sits in `@layer components`; anything unlayered
silently outranks it and nothing errors.

Known instances, all fixed: the type ladder losing to Bootstrap's reboot, the active nav link going
gold-on-gold, a second focus ring on the search field, `.text-muted` at 1.16:1 contrast, and the card
title's hover colour.

**A corollary worth as much: `!important` INVERTS layer order.** Putting Bootstrap in a `vendor`
layer to rescue the type ladder handed it every utility class, because an important declaration in an
earlier layer beats one in a later layer and unlayered counts as last.

## Where the six pages are: 24 of 80 slots approved

| page | slots | approved | greybox left | state |
|---|---|---|---|---|
| `final-portal` | 9 | **8** | 0 | Approved. The centre mark is built (line boil); drift and a welcome line landed 2026-08-24 |
| `final-landing` | 12 | **9** | 1 | Built out. Carries Rod's own hero tune |
| `final-post` | 19 | **4** | 0 | Fully built. Carries Rod's own rail tune |
| `final-projects` | 24 | **2** | **0** | Rebuilt from the live page. Cards, search and filter pills all real |
| `final-ramblings` | 12 | **1** | 0 | Real post data, real search, Rod's own tune |
| `final-about` | 7 | **3** | 1 | **BUILT.** Collapsed to one page, top bar, boiling "Rod", real achievement wall, Rod's own tune |

**Five of the six are built and waiting on judgement, not on work.** Rod, 2026-08-24: *"after all
these changes about me is the main thing that needs to be fixed."* A full assembly spec for it
already exists and is unused - collapse onto the 3b (`?v=spacious`) variant, portrait uses the
favicon as a marked placeholder, and the backing wraps portrait + bio with the section head bare
(his pick). The trophy WALL stays unbuilt: no source, and he has said it needs a design
conversation first.

**ABOUT'S OWN COUNT DOES NOT MEAN WHAT THE OTHER FIVE'S MEAN, and an earlier version of this table
took it at face value.** `final-about.html` still holds **all three variant layouts in the DOM at
once** - `.col--panels` (13 slots), `.col--spacious` (4) and `.col--strip` (8) - with a `#vbar`
switcher and a `?v=` script that adds the body class at runtime, so `<body>` carries no static
class. The page's `#state` panel counts **every** `[data-slot]` in the document, so it reports "1 of
26 approved, 24 greybox" by counting the same slots two and three times over in variants Rod already
rejected. **The picked 3b variant has 4 slots, and two of them already carry real prose from
`tech-art/about.md`.** What is actually unbuilt there is the achievement wall and the bottom scene
block, and the wall is the one he parked pending a design conversation. The single "approved" slot
is the footer, which sits outside all three subtrees.

So About is one deletion away from being comparable to the other five, not twenty-four builds away.
Collapsing it is the job; the numbers only look enormous because the page is three pages.

## THE FIVE TUNERS, and why they exist

Rod tunes his own numbers. Each drives the REAL page rather than a copy and emits paste-ready CSS
naming the file and line.

- **`hero-ratios.html`** - the landing hero.
- **`rail-ratios.html`** - the post rail.
- **`rambling-ratios.html`** - the ramblings rows.
- **`about-ratios.html`** (2026-08-25) - 42 dials. Deliberately has NO heading-size dial: those come
  from the ladder, and a page-level size override is the exact fault fixed on that page a day
  earlier.
- **`cursor-ratios.html`** (2026-08-25) - 24 dials, glow and sparkler together. **Not framed**, on
  purpose: these follow the pointer, so inside a frame the cursor spends half its time over frame
  chrome and the glow clips to the frame box instead of the viewport.
- **`portal-ratios.html`** (2026-08-25) - drag-to-place. The windows are not positioned in CSS at
  all; a script converts `data-x/-y` into a fraction of each window's travel range and writes the
  transform every frame, so the tuner feeds the script its inputs and inverts the maths on a drop.

**THE RULE ALL NEW ONES FOLLOW, because `rambling-ratios.html` breaks it:** derive every default from
the rendered page, emit only what moved, and write nothing until a dial moves. That tuner stores
hand-transcribed presets which have drifted - **11 of its 19 dials no longer match its page, so
merely opening it overwrites the real page with stale numbers.** Fixing it is outstanding.

## The three tuners, and why they exist

Rod tunes his own numbers now. Each drives the REAL page through a same-origin iframe rather than a
copy, keeps its panel in the parent document so it cannot affect the design, and emits paste-ready
CSS naming the file and line for each block.

- **`hero-ratios.html`** - the landing hero. Its vertical sliders were frozen for months: the line
  boil pins each glyph's advance in px at load and only re-measures on a window resize, and in a
  vertical writing mode that pin IS the vertical length.
- **`rail-ratios.html`** - the post rail. The prose measure is a live tripwire: rail plus gap over
  8 columns silently drops it from 767 to 759.
- **`rambling-ratios.html`** - the ramblings rows. The gap under the search field is a permanent
  readout because it is not independent - it, the panel's top bleed and the list's own hairline all
  resolve to one clearance number, and that number was **-7px** with the panel sitting on the field.

**A tuner whose defaults have drifted from its page is tuning a composition nobody approved**, and
every export carries the drift into the paste. That happened once (the hero's trench) and is worth
checking before trusting any export.

## The bench: 58 components, 25 in use

`redesign-lab/extracted/components/` holds 58. Twenty-five are loaded by at least one final page.
Being on the bench is not the same as being wanted - some of the other 33 are losing variants from
the "3 versions each" review batches. Check `component-review.html` for the pick before treating an
unused component as a gap.

## Provenance, which is the actual shipping gate

`element-tracker.md` carries **93 tiered rows: 12 True, 30 Remixed, 46 Slop.** Slop is not shippable
by the ledger's own rule.

**Twenty components carry the word "circular" in their own files, and seven of those are on a final
page**: `button-kit`, `drift-magnet`, `empty-state`, `footer-line`, `list-controls`,
`project-cards-expensive`, `search-bar`. Treat that seven as an upper bound, not a verdict -
`button-kit`'s mention is Rod's own correction narrowing the problem to its shapes line only. Read
what each one points at.

Two that are not ambiguous:
- **`list-controls` declares itself circular-citation Slop in its own header** and is the search on
  ramblings. A sourced replacement is being hunted from the gallery.
- **`project-cards-expensive` self-flags as having NO EXTERNAL PROVENANCE**, and its one citation
  points at `rework-merodev-yanne.html`, a file in this repo. Anything reusing its glow inherits
  that debt.

---

## The type ladder is settled, and H1 is now on it

**61.44 / 38.4 / 24 / 15, a constant x1.6 at every width, weight 300 throughout.**

H2/H3/H4 were already a perfect x1.6 scale and **H1 was the only level off it**, rendering 100.8px
at 1440 - 2.625x H2, almost exactly two rungs, which is why it read as a missing level rather than a
big heading. It was also the only fluid size in `decisions.css`, so its ratio drifted from 1.87 at
1024 to 2.63 at 1920. `decisions.css:110` is now a flat `3.84rem` (38.4 x 1.6).

**The ladder applies BY ROLE**: bare `h1`-`h4`, not only inside `.prose` / `.d-h*`. Before that
change the landing, projects, ramblings and portal picked up colour and weight but **no scale at
all**, silently. Case G's counter and ruled divider deliberately stay `.prose h2`-scoped: they are a
prose device, not the h2 scale.

The only surviving `font-weight: 100` in `decisions.css` is `.prose th`, deliberately.

**H3 IS GOLD as of 2026-08-24** (Rod: "H3 should be yellow too i feel"). Taken as the rung rather
than carved out for one page. Nearly free: the card titles look like they would follow and do not,
because they name `--h4-color` explicitly and only LOOKED like they came from H3 while both tokens
were the same silver. Two things moved - the ramblings entry titles and About's lesser bio heading.
It softens half of D31's colour argument ("headings recede, prose leads") since a third level now
shares H2's gold; H4 stays silver, so the recession happens one rung later.

**The ramblings entry titles are ON the ladder now**, at the H3 rung, keeping their `<h2>` tag on
purpose - retagging would leave the page running h1 straight to h3, the WCAG heading-order failure
D31 ordered fixed on the post. **About's bio headings are ON the ladder as of 2026-08-24** (Rod: "remember to make it follow the
ladder like every other final page"), at 38.4 and 24. **The fault was in two places and the page was
only one of them:** `decisions.css` listed `.bio-h` in the H4 rung while mapping it to the H2 role
further down - the ladder contradicting itself in one file - and the H4 rung won on specificity, so
deleting the page's unlayered override alone would have dropped the heading to 15px silver rather
than raising it. Both ends fixed. The ladder's 72px heading rhythm was NOT taken: it drops the bio
heading 72px below the portrait beside it, and that is a layout move Rod did not ask for.

## The fault that keeps recurring

**A page restating something the ladder or a component already owns.** Every lab stylesheet is in
cascade layers (D36), and **unlayered CSS beats every layer**, so a page's own inline `<style>`
outranks both the ladder and every component it loads. It then wins silently with no error.

Six separate bugs in one session were this shape. Rod named the rule:

> *"When something conflicts simply add them to the ladder ... we shouldnt be making 100 exceptions
> just a few simple rules."*

**Delete the page's copy. Do not add an exception.** Two live instances were deleted from
`final-post.html` when the H1 landed; every other declaration they carried was already the ladder's.

Three siblings of the same fault, all of which bit again on 2026-08-24:
- **A partially restated shorthand reads as ownership and is not.** Ramblings sat **58px off
  centre** because the page restated `width` while `max-width` was the binding term - they are
  different properties and restating one does not beat the other. **`final-projects.html` still has
  this, 76px off**, and a note there claims it was fixed. It was not, for the same reason.
- **A CSS name that resolves to a FALLBACK renders wrong without erroring.** `--color-pink` was
  defined in no stylesheet and rendered its hard-coded fallback for weeks. Grep the definition.
- **A GREYBOX'S OWN PADDING SURVIVES THE THING THAT REPLACES IT.** The projects search slot kept
  `padding: 0 16px` from when it was a placeholder mimicking a field's inner inset; a real field
  brought its own 12px, so the text sat 17px in against 1px on the reference page. Rod spotted it by
  eye. **When a component fills a slot, strip the slot's own geometry with it (D36).**

And one that is not a cascade problem at all but cost the same time: **the visible gap is between
the PANELS, not the boxes.** Setting a 20px margin between the post header and its columns produced
a 24px overlap into the rail and 44px into the article, because all three carry `::before` panels
that bleed past their own boxes by different amounts. On this page they bleed 32/20, 12/24 and
32/16 - no two agree on either axis. Every spacing request here will hit it until they are unified.

---

## What is still open

1. **About** is the only surface needing construction. A full assembly spec exists: collapse the two
   parallel slot sets onto the 3b (`?v=spacious`) variant, portrait uses the favicon as a marked
   placeholder, the backing wraps portrait + bio with the section head bare (Rod's call). The trophy
   **wall** stays unbuilt: no source, and Rod has said it needs a design conversation first.
2. **The provenance debt**, above. `list-controls` blocks its slot outright.
3. **Rod's judgement** on the four built pages. That is a review queue, not a build queue.
4. **The token bridge** ([MERGE-WORKLIST.md](MERGE-WORKLIST.md) gate 2). 39 lab tokens against 270
   live, two names in common, no mapping file. Nothing ports without it.
5. **Page-level overrides.** Rod answered YES, pages may override, so the proposed guard is a lint
   that fails on any unlayered rule in a `final-*` page rather than a wrapper layer.
6. **The portal's `ResizeObserver`** in `effects/portal-windows.js` has no teardown twin, and
   `portal-window.css` has no `prefers-reduced-motion` path, which D21 requires.

## The blockout contract

`redesign-lab/analysis/2026-08-23-blockout-contract.md` holds every reservation MEASURED off the
rendered blockouts at 1440. **The post content column is 767 (94ch), NOT the blockout's 711** - Rod
settled it. The blockout is stale by 56px and stays on disk as an approved artefact; that file is the
correction layer.

Reservations a picked component cannot fit and should not: prev/next (drawn for a text version, and
prev/next was since deleted outright), page title (the locked H1 is taller), bio block (real copy
needs 257px more, but measured against the *panels* variant, which 3b does not use).

## The decision surfaces

- **`text-decisions.html`** - the single decision surface for everything that displays text. 7 tabs,
  ~77 sourced variants, 23 picks settled. It replaced and DELETED four comparison pages. **Do not
  build a fifth.**
- **`decisions.css`** - those picks as real CSS, imported by all six final pages. One definition, six
  consumers. A rule with no citation is a bug in that file.
- **`component-review.html`** - the built variants with Rod's picks badged.
- **`hero-ratios.html`** - the landing hero tuner. Ten live sliders, a copy-tune button emitting
  paste-ready CSS. **Its trench default is stale** (`.684` against the landing's corrected `.428`);
  the export warns about it rather than silently overwriting.
- **`original-css/`** plus `layer-diff.html` - a frozen copy of every pre-layer-refactor stylesheet,
  renderable against the current one. The lab is gitignored, so this is the ONLY way to diff a lab
  regression. The refactor reverses by copying that directory back.

---

## Live-site facts worth not rediscovering

- **The projects page is SECTION-SCOPED**: `/tech-art/projects/` and `/game-design/projects/`.
  `/projects/` 404s.
- **`/ramblings/` renders zero posts today.** `_layouts/ramblings.html:8` filters on the tag
  `personal`, and no post carries it. The two real ramblings posts render on `/game-design/blogs/`.
- **Only two posts of 19 carry `categories: [blog]`.** The lab's ramblings page therefore runs two
  real rows and six marked project substitutes.
- The site is a vendored Chirpy fork with no theme/site boundary; stock and custom code interleave.
  Full inventory: [THEME-BOUNDARY.md](THEME-BOUNDARY.md).
- **Housekeeping pending:** `_gif-archive/` (414 MB) to move out of the repo, `.claude/worktrees/`
  (~900 MB) to prune. Neither blocks anything.

## How the work runs

Every task Rod gives gets **a logged row in `docs/REQUESTS.md` AND an agent**. Not just the big ones.
Agents measure, extract and report; they do not design and they do not apply pixel changes. Their
output is a claim to verify, not a result. Full rule: the `feedback-agent-queue-workflow` memory.

Rod is the eyes. Never verify a visual by screenshot; make the change, link the `localhost:4000`
page, and ask what he sees. Link the pages that are ready for review at the end of a stretch.
