# Element needs — the full list, 2026-08-18

Rod: *"look at everything that's slop and anything that's missing or is needed and create a list.
go through pages where you're likely to find things that can fill out the list."*

Counted from `element-tracker.md` (72 rows) plus a grep of the bench. Nothing here is estimated.

| state | count | what it means |
|---|---|---|
| **A. Slop, NO source at all** | **40** | needs a real reference FOUND before anything can be built |
| **B. Slop, HAS a source, not built** | **11** | reference exists and is saved; needs BUILDING only |
| **C. Circular citation** | **12** | has a "PROVENANCE" comment pointing at our own repo. Counts as no source. |
| D. Remixed / True | 21 | legitimately sourced |

A and C overlap partially — a component can be built and still unsourced. **The honest headline:
of 72 tracked elements, 51 are Slop, and only 21 have real provenance.**

---

## B. Has a source, needs BUILDING (11) — the cheapest wins on the board

No hunting required. The reference is already read and saved; someone just has to write the code.

| element | source already held |
|---|---|
| Reading measure / reading well | Red Blob, Ciechanowski, lisyarus, Josh Comeau |
| Hero media | restaurant.nelu.osaka + heralbony.jp |
| TL;DR block | `sources/cyanilux-notice-callout.md` |
| Takeaway block | same |
| Blockquote | same |
| TOC (desktop rail + mobile popup) | Starlight + MDN + brittanychiang |
| Meta chips / tags | ameye.dev + chriskirknielsen |
| Code block + copy | blog.maximeheckel.com + starlight |
| Prev/next nav cards | therealmjp + thebookofshaders |
| Tool-icon strip + hover taglines | stephanewillems.be/skills |
| Achievements toast | `sources/robooneus-achievement-toast.md` |

**Caveat:** the three callout rows all point at the same Cyanilux recipe, and Rod rejected that set
as not warm enough on 2026-08-18. Treat those three as blocked on the warm-callout hunt, not ready.

---

## A. No source at all (40) — these need a reference found

Grouped as they were hunted. Each group maps to one agent in the gallery element hunt.

**Global / chrome (10)** — avatar/logo mark · site title + subtitle · active-nav indicator ·
theme toggle · back-to-top · cursor (sparkler trail) · page transition · scrollbar · tooltips ·
footer

**Landing / section (5)** — section title + tagline · demo reel embed/placeholder ·
"Featured Projects" header + icon-dot · key-learning hover quote on a card · "View All" button

**Portal (3)** — two-door cards · time-of-day greeting · third door (Ramblings)

**Lists / index (6)** — search bar · filter pills · empty state · post preview cards ·
category tree / collapse · archives timeline

**Post page (5)** — post header · content reading well · reading progress bar · image lightbox ·
related posts cards

**About (3)** — bio cards · stats numbers · "currently studying" status line

**Other (4)** — 404 page · ramblings index · text-card (news/member box) · 3D scene / planar
reflection

**Foundations (4)** — glow technique · palette · typography · ambient breathing bloom.
*These are not element hunts.* Palette is deferred to the end (D18), typography is settled (D16),
and the glow/bloom are shader work on the scene track, not CSS to source.

---

## C. Circular citation (12) — built, shipped, and unsourced

`button-kit` · `card-tests` · `code-block` · `draw-in-icons` · `hero` · `list-controls` ·
`post-header` · `project-cards-expensive` · `quote-block` · `reel-band` · `site-footer` ·
`tldr-callout`

Every one carries a `PROVENANCE:` line pointing at a `rework-*.html` or `ref-*.html` inside this
repo. Those are our own builds. **Four of these are on the landing right now**
(`project-cards-expensive`, `draw-in-icons`, `hero`, `site-footer`), which is why the landing cannot
be called sourced no matter how good it looks.

Rod found two of the unsourced ones by eye on 2026-08-18 without being told which they were — the
demo reel band and the section headers. That is the argument for the provenance law in one line.

---

## What happens with this list

1. **Gallery element hunt** (running) — map the 40 onto sites already in the reference gallery,
   with a page URL and a CSS selector for each.
2. **Screenshot pass** — open each URL, photograph the element at its selector, so Rod judges the
   real thing rather than a description.
3. **Element gallery** — one page of those crops, tagged by which slot they fill, so Rod can go
   through and say take / leave per element.
4. Only then does anything get built, and only into the slot its blockout declares.
