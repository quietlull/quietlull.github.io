# Sub-page layout sources (2026-08-16)

Where every sub-page blockout variant gets its geometry from. Rod's requirement: **at least four
real sites per page type**, portal included, and the gallery used first because it is his own
vetted taste catalog rather than a fresh search.

Companion: `docs/PAGE-PROCESS.md` (the procedure), `redesign-lab/reference-gallery.html` (the
catalog itself, Sub-pages section).

---

## The grey language these blockouts must use

Taken from `landing-blockout.html`, which Rod already accepted as a blockout. Reuse EXACTLY - a
second grey language would break comparability across surfaces.

| Token | Value |
|---|---|
| page ground | `#141414` |
| hero / scene block | `#181818` |
| placeholder box | `#1b1b1b`, border `1.5px dashed #555` |
| bar / chrome | `#1f1f1f`, bottom `1.5px solid #666` |
| row header band | `#1d1d1d` |
| body text | `#d9d9d9` |
| box label | `#666`, 11px, `letter-spacing:.14em`, UPPERCASE |
| section tag | `#bbb` (bold part `#fff`, `.12em`) |
| measurement note | `#777`, 10px, right-aligned |
| scene label | `#5c5c5c`, 12px, `.2em`, UPPERCASE |
| face | `ui-monospace, "SF Mono", Consolas, monospace` - the ONLY face |

Dashed 1.5px = "this is a placeholder". Solid = real structure. No colour anywhere, no accent, no
second typeface.

---

## What the GALLERY already covers (Rod's own notes, verbatim source)

The gallery's Sub-pages section holds 12 cards across the page types we have to build. These are
already captured, already tiered, and already carry Rod's per-site observations - which makes them
better evidence than anything a fresh search returns.

### ABOUT — four sources, fully covered

| Site | URL | The move, per Rod |
|---|---|---|
| 109ichiki | `109ichiki.com/profile` | **Split**: oversized `PROFILE_` label + bio left, one artwork panel floating right on a wireframe grid, socials as small labelled buttons. Vast empty space below the fold rather than filler sections. |
| dimden | `dimden.dev/about.html` | **Stacked bordered panels**: a portrait box, then short first-person paragraphs each in its own frame, over a photographic background. Personality through framing rather than typography. |
| harumaki | `harumakigohan.com/profile` | **Almost nothing**: a `~PROFILE~` tilde header, a small centred block of text, a row of social icons, and an enormous amount of sky. The restraint is the statement. |
| cinni | `cinni.net/about.html` | **Scrapbook**: profile panel with full-body illustration, a "what's in my bag" object spread, socials as pixel buttons, site awards. Information as collected objects rather than prose. |

Four genuinely different families: split / framed-stack / near-empty / scrapbook. This page type
needs no further sourcing.

### PROJECTS INDEX + GALLERY — four sources, fully covered

| Site | URL | The move, per Rod |
|---|---|---|
| 109ichiki | `109ichiki.com/works` | "The closest reference to a projects page." Huge mono `WORKS_` label with a barcode motif, **one line of filter chips** (all / illustration / original / fan work), then a plain thumbnail grid with a caption under each tile. **No cards, no borders, no shadows** - images and gaps do all the work, inside the site's fixed frame. |
| harumaki | `harumakigohan.com/chara` | **Uniform tile grid** under a tilde-wrapped header on the same fixed sky. One screen, evenly spaced. "The one place this site uses a strict grid, and it works because the ground behind it is atmospheric." |
| cinni | `cinni.net/art/` | **Deliberately sparse**: a few framed pieces hung on a patterned wall with hand-drawn garlands, one screen, no pagination. The room metaphor continues from the home page. |
| whey-isolate | `whey-isolate.neocities.org/Gallery` | **Three-column shell**: nav list left, framed content centre, sidebar right. Items introduced with a sentence and stacked in the centre column rather than tiled - "a reading gallery, not a grid." |

Note the harumaki card is direct evidence for our own case: a strict uniform grid is normally an AI
tell, and Rod's own note says it survives *because the ground behind it is atmospheric*. Our ground
is the live scene, which is the same defence.

### POST TEMPLATE — two sources, needs more

| Site | URL | The move, per Rod |
|---|---|---|
| dimden | `dimden.dev/blog/13-optimizing-rendering-of-100k-html-nodes` | Title, date line, prose at a comfortable measure, inline images, syntax-highlighted code block. **Same fixed column as the home page, so the site never changes width between page types.** |
| whey-isolate | `whey-isolate.neocities.org/posts/2024-04-20-...` | Long article in the same **three-column shell**, over a starfield. "The chrome never changes between index and article - only the middle column's content does." |

Plus, measured from source this session (archived in
`archive/2026-08-16-rejected-subpage-tests/README.md`):

| Site | The move |
|---|---|
| stripe.dev blog | **24-column grid at 58.375px**, sticky metadata rail exactly **6 columns (350px, top:60px)**, prose exactly **12 columns (701px)**, remaining 6 columns left as margin so the layout is NOT centred. h1 101/93 at weight 300. Rod chose this reference himself. |

That is three. The extraction pass is finding a fourth-plus.

### POST INDEX / RAMBLINGS — two sources, needs more

| Site | URL | The move, per Rod |
|---|---|---|
| dimden | `dimden.dev/blog` | **No thumbnails at all**: a stack of link-coloured titles each with a small "POSTED ON \<date\>" line. Pure text list in the fixed column - "proof an index does not need cards." |
| harumaki | `harumakigohan.com/live` | **Dated entries down a narrow column**, each with line-art or a poster, over the fixed sky. Long scroll built from one repeating entry shape. |

### RESUME — nothing in the gallery

Only `brittanychiang.com`, which Rod named directly and which was measured this session: sticky
left header **561px, top:0, full viewport height**, right column **607px**, 16px gutter, h1 48/48/700,
prose 16/26 at ~76ch, experience rows 183px, skill pills 28px tall at radius 9999px. Her teal accent
breaks the palette law and is not transcribable; the geometry is.

### PORTAL — nothing in the gallery

The one page type with no vetted reference at all. Also the one Rod ranks LAST priority. Needs
sourcing from outside the gallery.

---

## Where the gaps are

| Page type | Gallery sources | Total with measured | Still needed |
|---|---|---|---|
| About | 4 | 4 | none |
| Projects | 4 | 4 | none |
| Post template | 2 | 3 (+stripe.dev) | 1+ |
| Ramblings / post index | 2 | 2 | 2+ |
| Resume | 0 | 1 (brittanychiang) | 3+ |
| Portal | 0 | 0 | 4 |

This is exactly why the gallery goes first: it fully covers the two page types I would otherwise
have searched blindly for, and it tells us precisely where a search is actually warranted.

---

# FINAL — the 24 variants and where each came from (built 2026-08-16)

Six blockouts, four variants each, every variant transcribed from a currently-live site read from
its own CSS. Open any blockout and its provenance panel names the source, the transcribed
geometry, and the honest caveats for the variant you are looking at.

| Blockout | V1 | V2 | V3 | V4 |
|---|---|---|---|---|
| `post-blockout.html` | **stripe.dev** 24-col spine, STICKY metadata rail that follows the scroll (ROD'S PICK, default) | **Cyanilux** contained card, section rhythm is filled BARS | **Klubnika** document sheet, side hairlines, dotted rules | **Inigo Quilez** 120ch measure, TOC as a wrapping wall + **dimden** uncapped left, 205px bare right |
| `projects-blockout.html` | **MinionsArt** sticker panel, zero-blur shadow | **109ichiki** frameless square field, padding-as-gutter | **Kaito Note** zero-gutter mosaic + right rail | **TUYU** narrow 2-up, motion-first faces |
| `about-blockout.html` | **dimden** panel stack 900 (675+225) | **109ichiki** scatter desk, draggable panels | **Klubnika** lit strip + tile catalogue | **potg.art** band drift, width changes per section |
| `ramblings-blockout.html` | **dimden** rule log, 4px block rules | **Klubnika** terminal ledger, zebra, relative age | **Eve Official** hairline rows, native category tag | **whey-isolate** sticky rail sheet, 3 panels |
| `resume-blockout.html` | **Brittany Chiang** sticky split rail | **Zach Leatherman** print-first 31em measure | **Ben Hoyt** bare document, type IS the layout | **Tania Rascia** doc shell + 90px date gutter |
| `portal-blockout.html` | **potg.art** sequential, doors never co-visible | **ZUTOMAYO MART** stacked block per destination | **lyra.horse** type-scale only, 367 bytes total | **Space Jam 1996** orbital, position-as-hierarchy |

## Which came from the gallery, and which needed a search

**From Rod's own gallery** (already captured, tiered, with his notes): dimden (post, ramblings,
about), 109ichiki (projects, about), whey-isolate (ramblings), harumaki and cinni as supporting
evidence. The gallery fully covered ABOUT and PROJECTS before any search ran.

**Found by search because the gallery had no candidate**: Cyanilux, Inigo Quilez, MinionsArt, Kaito
Note, TUYU, Eve Official, Brittany Chiang (Rod-named), Zach Leatherman, Ben Hoyt, Tania Rascia,
ZUTOMAYO, lyra.horse, Space Jam. Concentrated exactly where the gallery was thin: post, resume,
portal.

**Used twice, worth noting**: Mike Klubnika (post, about, ramblings) and dimden (post, about,
ramblings) and potg.art (about, portal). Borrowing is concentrated in a few sources - if that
starts to show as sameness, it is a cull signal, not a coincidence.

## Verified, not asserted

- **Greybox law:** every blockout's content area was measured with `getComputedStyle`; zero
  non-grey values (r=g=b on every painted colour). The only non-grey in the files is the
  provenance panel's link blue and warning amber, which is lab tooling, same as
  `landing-blockout.html`.
- **Distinct families:** post columns measure 855 / 928 / 1188 / 1200px; the dimden variant's
  205px bare right gap is exactly as transcribed.
- **Pinned mechanisms:** Kaito Note tiles hold the 549/312 ratio (1.76) with the pinned tile
  exactly double on both axes; 109ichiki's pinned square fills at 212px while others stay inset
  at 172px.
- **Scene coverage on About** (the page with the heaviest scene): dimden 52.7% of ground covered,
  109ichiki 50.7%, Klubnika 23.1%, potg.art 15%.
- **Frozen slots:** all three portal doors present in all four variants.

## One deliberate override

The portal research proposed its own LIGHT grey ramp (`#E8E8E8`). Rejected - the greybox law is
one grey language across every surface, so the portal uses the same dark ramp as the rest.
Comparability beats per-source fidelity.


---

## CORRECTION 2026-08-16 — stripe.dev was missing from the post blockout

Rod picked stripe.dev himself and named the exact device he wanted: **two columns with the left
data following as you scroll.** It was measured in detail early in the session, then DROPPED when
the research workflow independently sourced its own four post references (Cyanilux, Klubnika,
Inigo Quilez, dimden) and the blockout was built straight from that spec without checking that
Rod's own named reference survived the handoff.

The miss was worse than an omission: **none of those four has a sticky rail.** Cyanilux's TOC is
explicitly not sticky, Klubnika's is not sticky, IQ's is a wrapping wall, dimden's is a 3-cell
block. The post blockout was testing four ways of NOT doing the thing Rod asked for.

Fixed: stripe.dev added as **V1 and the default**, measured at 1440 on the exact post Rod linked
(`/blog/what-it-feels-like-building-with-stripe-projects`) — 24 cols x 58.375px, container 1425,
sticky rail exactly 6 cols (350px) at `top:60px`, prose exactly 12 cols (701px) from x=421, ~5 cols
of bare right margin, h1 101.085/92.998/w300/-6.065px. Verified in the blockout: body scrolls 900px
while the rail stays pinned at 60px, and it is the ONLY variant of the five with any sticky element.

**Process lesson worth keeping:** when a user names a reference, it is a fixed requirement, not a
candidate. Delegated sourcing must be checked against the user's own picks before anything is
built on it.
