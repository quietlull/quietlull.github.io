# toc-real — provenance

Built 2026-08-23. **Brief:** [`analysis/reference-briefs/brief-2.md`](../../../analysis/reference-briefs/brief-2.md)

**Premise: confirmed.** docs.astro.build genuinely ships a desktop rail **and** a `<details>` mobile
popup driven by **one shared list component**. The cited CSS file is byte-for-byte still the served
file (same content hash), so the note was not reading a stale build.

**Tier: Remixed.** Idea-origin **theirs** for everything structural; **ours** for every colour, the
squaring, the panel substitution, the shadow removal, and the fixed-vs-sticky choice.
**Slop risk: none** — every declaration traces to a live served file.

---

## The three versions

| | |
|---|---|
| **V1** | **Fixed rail** — Starlight faithful. Costs a `padding-top` compensation equal to the nav height, because `top:0` pushes it under the header. |
| **V2** | **Sticky rail** — **ours.** Needs no compensation at all because it never leaves the flow. A real simplification, not a preference. |
| **V3** | Sticky **plus a left rule** on the active item — **ours.** Marking active by **colour alone is a WCAG 1.4.1 exposure**; Starlight has it, we do not have to inherit it. |

---

## The nuance the saved note flattened

In **dark** mode Starlight's active link is `#b3c7ff` — a **pale** blue — against `#888c96` grey. So
**the active state is carried by a lightness step, not a hue pop.** That is precisely why their rail
reads quiet rather than shouty, and it maps cleanly onto `--color-gold` against `--color-silver`.

**Taking the hue without the lightness relationship would produce a much louder rail than theirs.**

**Verified in the build:** base `#a3a19d`, active `#fbbf24` — the same relationship.

---

## Five discrepancies the brief found

1. **"Zero JS for the open/close" is wrong.** There is real behaviour: close on any non-tab link
   click, close on outside click, and **Escape closes then returns focus to `<summary>` only if
   focus was inside**. That last one is the a11y move worth copying and the note omitted it entirely.
2. **`.display-current` is empty in the served HTML.** The "summary shows the current heading"
   effect is **JS-only** and needs a sensible pre-JS default. Starlight ships a blank; we ship
   "On this page".
3. **The note's "verbatim" CSS was pre-stripped and lightly edited** — a transcription, not a quote.
4. **Rules the note missed:** the whole mobile row treatment, the `:first-child` border-top reset,
   `.toggle:hover`, and **Starlight's own `scroll-padding-top` anchor fix** (the note credited only
   MDN for that idea). **One formula serves both layouts** because the popup height collapses to
   zero above 72rem.
5. **False alarm resolved** — the JS chunk appears in no `src=` but *is* the correct live file, a
   shared chunk imported by both entry scripts.

---

## The core mechanism, theirs

**`--depth` as a single inline property.** `calc(1rem * var(--depth) + var(--pad-inline))` drives
the whole hierarchy from one number. Confirmed in their served markup: the property is written onto
`ul`, `li`, `a` **and** `span` alike — redundant on three of the four, since only `a` consumes it.
We set it on `a` only.

**Verified in the build:** depth 0 → 8px, depth 1 → 24px. Exactly 1rem apart, reproducing their
formula.

**`aria-current="true"` is their sole styling and a11y hook** — one attribute does both jobs.

**72rem is the single switch.** Their `lg:sl-block` and the `--sl-mobile-toc-height` flip (3rem → 0)
live in the *same* query. Their `sl-hidden`/`lg:sl-block` is Starlight's own mini-utility layer, not
Tailwind, and is replaced by one media query.

---

## Cannot transfer

- **The accent in both themes** — `#3d50f5` / `#3369ff` / `#b3c7ff`. And `details[open] .toggle`
  carries a **second, separate blue** that needs re-hueing too.
- **`--sl-color-gray-3 #888c96` and `--sl-color-gray-5 #353841` are cool greys.** Swapped, not
  transcribed.
- **Three scene conflicts:** `.dropdown` and `.toggle` both use **solid fills**, and `.dropdown`
  adds `box-shadow: var(--sl-shadow-md)` — **four stacked shadows**. Replaced with `--color-panel`,
  shadow dropped. *(No `backdrop-filter` anywhere in this component.)*
- **Roundness** — `.25rem` on rail links, `.5rem` on the toggle. Squared. Note **Starlight itself
  already ships `border-radius:0` on mobile**, so the square variant is theirs.
- **The base64 tick** on the active mobile row — generic; dropped.
- **The caret is a real inline 24×24 chevron SVG**, i.e. **artwork**, not a CSS shape. Needs its own
  source or a CSS replacement; the demo uses a CSS shape so nothing unsourced ships.

---

## Reduced motion

**Starlight's mobile caret has no transition at all — it snaps.** So as-shipped this needs no
reduced-motion path, and the caret rotation here is instant by default.

If motion is ever added, **copy their inverse gate**, which is the better pattern:
`@media (prefers-reduced-motion: no-preference) { …transition… }` — **opt in to motion rather than
opt out of it.**

## Open for Rod

1. **Fixed or sticky** — sticky is simpler and costs nothing.
2. **The active marker** — colour alone (theirs) or colour plus a rule (V3, and the a11y-safer one).
3. **The caret glyph** needs its own source if their SVG is wanted.
4. If the **sliding-marker** feel is wanted instead of a colour swap, **that geometry is VitePress's,
   not Starlight's**, and must be cited as such.

---

# Appendix: reasoning moved out of the stylesheet, 2026-08-25

Moved from `_sass/components/_toc-real.scss` under D45 (comments get short). Original wording,
kept because it is the provenance record. The stylesheet points here.

## Header

> toc-real - Starlight's rail + mobile popup, ONE system.
> Built 2026-08-23 from analysis/reference-briefs/brief-2.md (TOC).
>
> PREMISE: CONFIRMED. docs.astro.build genuinely ships a desktop rail AND a <details> mobile
> popup driven by one shared list component with an inline --depth property. The cited CSS file
> is byte-for-byte still the served file (same content hash), so the note was not reading a stale
> build.
>
> TIER: Remixed. Idea-origin THEIRS for everything structural; OURS for every colour, the
> squaring, the panel substitution, the shadow removal, and the fixed-vs-sticky choice.
> SLOP RISK: none. Every declaration traces to a live served file.
>
> SCOPE HASHES STRIPPED: .astro-f35rxoh7 (shared list), -gl7qdvoz (popup), -mbtvktjh / -ojrabbd2
> (rail). All were :where()-wrapped, so removing them changes nothing about specificity.
>
> ===== 72rem IS THE SINGLE SWITCH
> `.lg\:sl-block{display:block}` lives inside @media (width>=72rem), and --sl-mobile-toc-height
> flips 3rem -> 0rem in that SAME query. Below 1152px the popup bar is the TOC; above it, the rail
> is. Their sl-hidden / lg:sl-block is Starlight's own mini-utility layer (NOT Tailwind) and is
> replaced here by one media query.

## The indent formula

> THE INDENT FORMULA - theirs, and the core of the treatment.
> A single inline `style="--depth: 0|1"` drives the whole hierarchy. Confirmed in their served
> markup: the property is written onto ul, li, a AND span alike, redundant on three of the four -
> only `a` consumes it. We set it on `a` only.

Their radius is .25rem and is squared here. Their link colour is --sl-color-gray-3 #888c96, a COOL
grey, mapped to our silver. `overflow-wrap: anywhere` is theirs: long headings must not blow the
rail out. `border-bottom: 0` cancels the global prose-link hairline.

## The active state, and the nuance that makes the rail read quiet

> `aria-current="true"` is their SOLE styling and a11y hook - one attribute does both jobs.
>
> THE NUANCE THE SAVED NOTE FLATTENED: in DARK mode their active link is --sl-color-accent-high
> #b3c7ff, a PALE blue, against --sl-color-gray-3 #888c96. So the active state is carried by a
> LIGHTNESS STEP, NOT A HUE POP. That is precisely why the rail reads quiet rather than shouty,
> and it maps cleanly onto --color-gold #fbbf24 against --color-silver #a3a19d.
> Taking the hue without the lightness relationship would produce a much louder rail than theirs.

## The three versions

> V1 - STARLIGHT FAITHFUL: a FIXED rail.
> position:fixed; top:0; height:100vh with an inner scroll and a hairline inner border.
> THE COST, which is theirs and is why V2 exists: `top:0` forces a `padding-top` equal to the nav
> height to push the content back down under the header.

> V2 - STICKY instead of fixed. OURS, and it is a real simplification rather than a preference.
> A sticky rail needs no padding-top compensation at all, because it never leaves the flow. Same
> inner scroll, same hairline. Everything else is identical to V1.
> Flagged as ours because it is a deviation from the source's own layout choice.

> V3 - STICKY, PLUS A NON-COLOUR ACTIVE CHANNEL. OURS, and it exists for a real reason:
> marking the active item by COLOUR ALONE is a WCAG 1.4.1 exposure (colour must not be the only
> means of conveying information). Starlight has this exposure; we do not have to inherit it.
> A left rule adds a second channel and costs no motion and no fill.

## The mobile popup

> THE MOBILE POPUP - <details>/<summary>, with the active heading in the closed summary.
> Their geometry, our surfaces.
>
> NOT TAKEN, all three because they fight the live scene:
>   .dropdown and .toggle both use SOLID fills (--sl-color-black #17181c)
>   .dropdown adds box-shadow: var(--sl-shadow-md), which is FOUR STACKED SHADOWS
> Replaced with --color-panel and no shadow. (No backdrop-filter anywhere in this component, so
> there is nothing to strip on that front.)

> .display-current: their summary shows the CURRENT heading, and it is JS-only - the served HTML
> ships it EMPTY and a mobile subclass writes link.textContent into it. It is not free, and it
> needs a sensible pre-JS default. Starlight ships a blank; we ship "On this page".

z-index 4 is their --sl-z-index-toc. `outline-offset: -0.1875rem` is their
--sl-outline-offset-inside. The popup list's max-height and its `overscroll-behavior: contain`
(which stops scroll chaining) are theirs verbatim, and Starlight itself ships square rows on
mobile. The `:first-child` border reset is theirs too.

## The anchor-under-sticky-header fix - deliberately NOT applied

> theirs, and the saved note credited only MDN for the idea.
> DELIBERATELY NOT APPLIED HERE, corrected 2026-08-23 after an audit measured the result.
> `decisions.css` already sets `scroll-margin-top` on the heading TARGETS. Setting
> `scroll-padding-top` on `html` as well does not override it - THE TWO ADD, and every in-page
> jump overshot by 80 to 116px.
> One offset, on the target, is enough. Their formula is kept here as a comment because it is the
> better IDEA - one expression serving both layouts, since the popup height collapses to zero
> above 72rem - and it is what to reach for if the offset ever moves off the targets:
>     html { scroll-padding-top: calc(1.5rem + var(--nav-h) + 3rem); }
>     @media (width >= 72rem) { html { scroll-padding-top: calc(1.5rem + var(--nav-h)); } }
> This was also the only bare-element global selector in all 22 components, which is why a
> component file could reach out and change the whole page.

## Reduced motion

> Starlight's mobile caret has NO transition at all - it snaps. So as-shipped
> this needs no reduced-motion path. The caret rotation above is therefore instant by default.
> If motion is ever added, copy THEIR inverse gate, which is the better pattern:
>   @media (prefers-reduced-motion: no-preference) { ...transition... }
> Opt IN to motion rather than opt out of it.

## Not taken, needs its own source if wanted

> - the base64 data-URI checkmark on the active mobile row (generic; use Rod's own mark)
> - the caret is a real inline 24x24 chevron SVG with fill:currentColor, i.e. ARTWORK, not a CSS
>   shape. The demo uses a CSS triangle so nothing unsourced ships.
> - the SLIDING MARKER feel, if wanted instead of a colour swap, is VITEPRESS's geometry
>   (candidate 2 in the same analysis file), NOT Starlight's, and must be cited as such.
