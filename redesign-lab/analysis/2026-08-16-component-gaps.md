# Elements that still need a workbench component (2026-08-16)

Every slot the sub-page blockouts require that the bench cannot supply today. Produced by reading
all 28 directories in `redesign-lab/extracted/components/` against the frozen slot list of each
page type, plus the live `_layouts/` those pages ship now.

Sources: `analysis/subpage-specs/inventory-bench-components.md` (full tables),
`inventory-current-layouts.md` (what ships today), `docs/PAGE-PROCESS.md` (why this list gates the
aggregate stage).

**Headline: the bench has 28 directories but only ~20 are shippable components.** Four are not
page components at all (`palette/` is lab tooling, `cursor-coords/` is infra JS with no markup or
CSS, `card-tests/` and `glow-edge-tests/` are A/B harnesses). Two are superseded (`magnetic/` by
`drift-magnet/`; `hero/` by V6, which lives in `hero-tests.html`). Two are rejected-but-kept
(`seam-band/`, `edge-rails/` - the painted dividers Rod cut on 2026-08-13).

**Coverage is inverted against priority.** The bench is deep on chrome, controls and cards, and
close to empty on everything that makes a POST readable - even though the tracker calls the post
page "core". Post and About are the two page types where the aggregate stage is genuinely blocked.

---

## POST - blocked, 9 gaps (the important page)

| Slot | Status |
|---|---|
| Content reading well / prose scale | **MISSING** - no component, only inline CSS |
| Sticky metadata rail | **MISSING** - the device all four post variants lean on |
| TOC (desktop rail + mobile popup) | **MISSING** |
| Reading progress bar | **MISSING** |
| Hero media (masked, not boxed) | **MISSING** |
| Image lightbox | **MISSING** |
| Prev/next nav cards | **MISSING** |
| Footnotes / references | **MISSING** |
| Meta chips / tags | PARTIAL - `button-kit` `.kit-tag` exists; post meta chips unstyled |

Already covered: `post-header/`, `tldr-callout/`, `stamp-callout/` (takeaway, Rod-approved),
`quote-block/`, `code-block/`, `merged-card/` (related posts).

## ABOUT - blocked, 8 gaps

| Slot | Status |
|---|---|
| Achievements trophy grid | **MISSING** - the page's whole reason to exist |
| Achievement unlock toast | **MISSING** (robooneus source in hand, unbuilt) |
| Status / metadata rail (Now, Tools, Open to) | **MISSING** |
| Portrait / avatar | **MISSING** |
| Stats numbers | **MISSING** (direction set: solid amber serif; hollow stroke rejected) |
| "Currently studying..." status line | **MISSING** (lead: adevade pulse ring) |
| Contact / hire block | **MISSING** |
| Long-form about prose well | **MISSING** |
| Bio cards (intro / more) | PARTIAL - callout family exists, no about-specific component |

Worth flagging: the tracker still records the about block as *"a fail, mostly slop - needs a
dedicated design conversation before building"*. That conversation has not happened.

## RESUME - least covered of all, 4 gaps and zero dedicated components

| Slot | Status |
|---|---|
| Header / identity block | **MISSING** |
| Education / experience / credits sections | **MISSING** |
| Print / PDF stylesheet | **MISSING** - and one variant (Zach Leatherman) is print-first by design |
| Download-CV affordance | **MISSING** |

Resume has **no rows in `element-tracker.md` at all** and no layout file. Its only trace in the
repo is backlog item G3. Reusable candidates: `dated-timeline/` for entries, `draw-in-icons/` for
skills, `button-kit/` for the download button - none scoped for this.

## RAMBLINGS - 5 gaps

| Slot | Status |
|---|---|
| Page head / index header | **MISSING** |
| Archives timeline (by year) | **MISSING** |
| Tag index / tag page | **MISSING** |
| RSS / subscribe affordance | **MISSING** |
| Voice/tone furniture | **MISSING** (midnightsolarium lead) |

Covered by reuse: `dated-timeline/`, `merged-card/`, `list-controls/`, and the whole prose family
shared with post. **Caveat:** STATUS records that `dated-timeline` has no legitimate home - the
frozen 12-section flow has no ramblings section - so this page type has an unresolved question
above it that is not a component problem.

## PROJECTS - 6 gaps, least blocked

| Slot | Status |
|---|---|
| Page head (label + h1 + lede) | **MISSING** |
| Section header / "Featured Projects" cluster | **MISSING** |
| Pagination / load-more | **MISSING** |
| Category tree / collapse | **MISSING** |
| Sort control | **MISSING** |
| "View all" | PARTIAL - `button-kit` gives the shape; the slot's own treatment is Slop |

Covered: `merged-card/` + `project-cards-expensive/` (two card systems, plus two harnesses judging
them), three grid layouts, pin badge, hover reveal, `list-controls/` for search/filter/empty.
**Projects is the one page type close enough to aggregate stage to attempt it with placeholders.**

## PORTAL + 404 - 4 gaps

| Slot | Status |
|---|---|
| Two-door cards | **MISSING** |
| Time-of-day greeting | **MISSING** as a component (copy exists live) |
| Ramblings link (coffee + steam SVG) | **MISSING** in bench; live only, provenance unproven |
| 404 page | **MISSING** entirely |

Chrome is shared and covered (`top-bar/`, `site-footer/`, `picture-frame/`).

**Correction found during inventory: the portal is a THREE-way, not a two-way.** The live
`_layouts/portal.html` ships Tech Art, Game Design *and* a Ramblings link in `.portal-extras`.
Every blockout variant must route three doors, not two.

---

## Site-wide furniture missing from the bench

Not page-specific, but nothing can ship without them: theme toggle (dark/light), back-to-top,
tooltips, page transition (kaitonote line-transition source scraped, unbuilt), scrollbar (live site
has amber, needs retune), sparkler cursor trail (exists live, never brought into the bench), and
skip-link / focus furniture.

That last one is an accessibility gate, not a nicety.

---

## Two provenance rulings owed, neither a proposal

1. **`post-header` source conflict** - `element-tracker.md` records it `Slop / -` while the bench
   registry claims it is sengoku-sourced. One of the two is wrong.
2. **Favicon tier** - still `Slop` in the ledger; it is Rod's own Figma artwork, so the law's
   letter fits but not its intent. Already flagged, still unresolved.

---

## What this means for sequencing

- **Projects** can attempt the aggregate stage now, with placeholders for six slots.
- **Post and About are genuinely blocked** on components, and they are the two that matter most.
  Post needs a reading well, a sticky rail and a TOC before an aggregate means anything.
- **Resume needs to start from zero**, which also makes it the cheapest to get right, since there
  is nothing to un-build.
- **Ramblings has a question above it** (where the dated timeline lives) that no component solves.
