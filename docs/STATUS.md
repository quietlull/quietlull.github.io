# Status

**What is true right now.** Compiled, not appended: this note is rewritten to be currently true
rather than grown. History lives in [CHANGELOG.md](CHANGELOG.md), decisions in
[DECISIONS.md](DECISIONS.md), open work in [REQUESTS.md](REQUESTS.md) (OPEN table only, done rows
are phantoms). If this disagrees with the code, the code wins and this file is the thing to fix.

Last compiled 2026-08-24. Every number below was measured that day, not estimated.

---

## Where the six pages are: 25 of 102 slots approved

| page | slots | approved | greybox left | components | state |
|---|---|---|---|---|---|
| `final-portal` | 9 | **8** | 0 | 4 | Approved by Rod. The one unapproved slot is the centre mark, which is BUILT (the line boil), so it is a judgement not a job |
| `final-landing` | 12 | **9** | 1 | 10 | Built out. Pending: top bar, view all button, project cards |
| `final-post` | 19 | **4** | 0 | 13 | Fully built out. Everything on it is real and waiting on Rod's eye |
| `final-projects` | 24 | **2** | 1 | 10 | Rebuilt from the LIVE page and promoted. Cards carry real fields on the front |
| `final-ramblings` | 12 | **1** | 0 | 7 | Built out, on real post data |
| `final-about` | 26 | **1** | 24 | 5 | **The only surface still needing real construction.** Carries two parallel slot sets, which is why it reads as 26 |

**"Pending" mostly means built but not approved, not empty.** Only about still carries real greybox.
That distinction decides what to do next: post, ramblings, projects and portal need Rod's judgement;
about needs work.

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

**Three sizes still sit off the ladder** and are Rod's call: ramblings entry titles at 20px/400
(`entry-row.css`, outside `decisions.css` entirely), About's bio headings at 20px and 16.8px, and
card titles pulled to the H4 size by a component rule, which is why nothing anywhere renders at the
H3 size.

## The fault that keeps recurring

**A page restating something the ladder or a component already owns.** Every lab stylesheet is in
cascade layers (D36), and **unlayered CSS beats every layer**, so a page's own inline `<style>`
outranks both the ladder and every component it loads. It then wins silently with no error.

Six separate bugs in one session were this shape. Rod named the rule:

> *"When something conflicts simply add them to the ladder ... we shouldnt be making 100 exceptions
> just a few simple rules."*

**Delete the page's copy. Do not add an exception.** Two live instances were deleted from
`final-post.html` when the H1 landed; every other declaration they carried was already the ladder's.

Two siblings of the same fault:
- **A partially restated shorthand reads as ownership and is not.** The projects page sat 76px off
  centre because its inline `.wrap` restated `padding` but not `width`.
- **A CSS name that resolves to a FALLBACK renders wrong without erroring.** `--color-pink` was
  defined in no stylesheet and rendered its hard-coded fallback for weeks. Grep the definition.

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
