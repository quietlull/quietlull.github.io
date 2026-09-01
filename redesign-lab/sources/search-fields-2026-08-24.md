# Search fields — six sourced candidates

All fetched and read 2026-08-24. Every site returned HTTP 200 that day and every CSS block below
was read from the site's own current stylesheet, not reconstructed.

**The headline finding.** All 102 cards in `reference-gallery.html` were swept. The gallery contains
exactly **two** always-visible inline search fields, and **both are unstyled browser defaults**.
Every other search in the gallery sits behind an interaction: a magnifier toggle, a modal, a
curtain, or a keyboard shortcut. Our reserved slot is an always-open inline box, so only the
ronja/minionsart mechanism is a strict drop-in.

**Six candidates were killed**, and the ratio is the point rather than a problem:

| killed | why |
|---|---|
| stripe.dev (S) | 85 hits on "search" are all article titles and prose. No search UI. |
| thatskygame (A−) | its only match is a Tailwind normalize reset. No search UI. |
| unseen.co (S+) | a schema.org `SearchAction` JSON-LD stub, WordPress boilerplate, nothing rendered. |
| Aman Kyoto | the field's only reachable CSS is stock Drupal module CSS. None of Aman's own design is in it, and its active state is `#0072b9`, a cool accent the palette law bans. |
| The Point | `#morphsearch` computes `display:none`, `0 x 0` at rest. It is a Codrops "Morphing Search Box" dropped into a WP theme, not their own work, and it is an overlay rather than the inline box it first read as. |
| brittanychiang / jaimekim / mirandasofroniou | palette-library regex false positives. "Algolia" appears as prose, "kBar" as a substring. |

**The geometry it has to fit**, measured on the rendered pages at 1440x900:

| page | element | measured |
|---|---|---|
| `final-projects` | `.pv2-search` (greybox, pending) | **1134.00 x 50.00**, `padding 0 16px`, `radius 0` |
| `final-ramblings` | `.list-controls__search` (live) | **340.00 x 47.22**, `radius 10px`, `border 1px rgba(255,255,255,.1)` |

---

## GROUP A — true drop-ins today, but they supply zero look

### 1. ronja
`https://www.ronja-tutorials.com/` · Rod's tier **? (CUT)** · always open inline

```html
<input id="SearchField" class="mb1" type="text" oninput="filterPosts(this.value)" />
```

**CSS read from** `/dist/css/app.d876a0cc99d23e9edadbac7fc6abde13.css` (134,426 B) and
`/css/main.css` (298 B). **Neither contains a single rule matching `#SearchField` or any bare
`input` selector.** Its only inherited declarations are `box-sizing: border-box` and
`.mb1 { margin-bottom: .25rem }`.

**What is structurally different:** it is not a search, it is a FILTER. No form, no submit, no
results page. It also mirrors the query into a `?search=` URL param, so a filtered list is linkable.

**Could not transfer:** the entire appearance, because it has none. Adopting this means adopting the
behaviour and drawing the box ourselves, which has to be labelled as ours.

Rod's note in the gallery: *"a post list ... with search + newest/oldest toggle. The
list-with-thumbnail-and-filter is the leaner cousin of the card grid."*

### 2. minionsart
`https://minionsart.github.io/tutorials/` · Rod's tier **C+** — the highest-tiered gallery site with
any search at all · always open inline

```html
<input type="text" placeholder="Search.." id="searchInput"
       style="margin-right: auto; margin-left: auto; width: 200px; color: black" />
```
```js
$("#searchInput").keyup(function (event) { ... })   // jQuery, filters on keyup
```

Measured live: **208 x 21**, `background rgb(255,255,255)`, `border 2px inset rgb(118,118,118)`,
`font 13.3333px Arial`, `border-radius 0px` — all of it the browser default. `style.css` (14,960 B)
contains zero rules for it.

**Differs from ronja only** in binding (keyup vs oninput) and in having no URL param.

Rod's note: *"a tag-filtered card grid of shader tutorials ... warm/playful, not sterile."*

---

## GROUP B — an inline box with one visible state change

### 3. paris-review
`https://www.theparisreview.org/` · Rod's tier **? (CUT)** · `.search-toggle` click, `display:none`
at rest · CSS from `/css/screen.css` (377,209 B)

**Desktop, verbatim:**
```css
input.search-input {
  --height: 2.625em;
  padding: 0 2.25em;
  background-color: #f7f7f7;
  height: var(--height);
  line-height: var(--height);
  margin-bottom: 0;
}
@media screen and (min-width: 75em) {
  input.search-input { --height: 3rem; padding-left: 2.625em; }
}
.search-submit, .search-toggle {
  --height: 3.5em; padding-right: 1em; padding-left: 1em;
  position: absolute; top: 0; bottom: 0; color: #333;
  font-size: 0.75em; height: var(--height); line-height: var(--height);
  transition: all 0.2s ease; z-index: 1;
}
.search-toggle { right: 0; }
.search-toggle[aria-expanded=true] i { transform: rotate(180deg); }
```

**Mobile, verbatim — a different mechanism on the same site:**
```css
#int-nav-search-input_mobile {
  --height: 2em;
  padding-right: 0.5rem; padding-left: 0.5rem;
  background-color: transparent;
  border-bottom: 1px solid #333;
  color: #000; font-size: 0.875em;
}
#int-nav-search-input_mobile::placeholder { opacity: 1; }
#int-nav-search-input_mobile:focus { background-color: #f7f7f7; }
```

Measured live after clicking the toggle: **373.70 x 48**, `background rgb(247,247,247)`,
`border 0px none`, `border-radius 0px`, `padding 0px 36px 0px 42px`. No border, square, no blur.

**What is structurally different:** the box has no edge — **the fill IS the box** — and the icons
live in asymmetric padding wells rather than as flex siblings.

**Could not transfer:** the Font Awesome `\f002` / `\f00d` glyph swap. We have no FA, so the
mechanism transfers and the glyphs do not.

**Against the house rules:** the DESKTOP variant fails the scene constraint, because `#f7f7f7` is a
solid fill over the scene. Their own MOBILE rule is the fix: transparent, `border-bottom`, fill only
on `:focus`. Both are equally sourced from the same site, so it is a genuine two-way pick.

### 4. cinra
`https://cinra.co.jp/` · Rod's tier **?** · modal · CSS from inline `<style>` blocks, 1,027 rules

```css
.modal-search_modal__sd-3 {
  background:#FFFFFF;
  border-bottom:1px solid #FFFFFF; border-left:1px solid #FFFFFF;
  border-right:1px solid #FFFFFF;  border-top:1px solid #FFFFFF;
  border-radius:4px;
  color:#333; font-size:13px; font-weight:400;
  height:56px; line-height:1.4;
  padding:10px 16px; width:279px; max-width:calc(100% - 5px);
}
.modal-search_modal__sd-3:focus {
  outline:none;
  border-bottom:1px solid #000000; border-left:1px solid #000000;
  border-right:1px solid #000000;  border-top:1px solid #000000;
}
.modal-search_modal__sd-3::placeholder { color:#bbbbbb; }
.modal-search_modal__sd-4 { background:#000000; border:1px solid #000; border-radius:4px;
  height:56px; width:56px; font-size:15px; }
.modal-search_modal__sd-4:hover { background:#FFFFFF; --ha:1; }
.input, .richText * { transition: all 0.3s cubic-bezier(0.4, 0.4, 0, 1); }
```

**What is structurally different:** the border exists at rest but is **the same colour as the
fill**, so focus costs zero layout — nothing grows, nothing reflows, the edge simply becomes
visible. Paired with a solid square submit whose icon crossfades on hover rather than a glyph inside
the field.

**Could not transfer:** the invisible-border trick **depends on an opaque fill**. On a transparent
ground it has to be re-derived with the border set to the ground colour, which is a different thing
and needs labelling as ours. Also `border-radius: 4px` against square-by-default, and a
`transition: all 0.3s` over a ~24-property list.

---

## GROUP C — overlays, so the reserved box would hold only a trigger

### 5. craigmod
`https://craigmod.com/` · Rod's tier **? (CUT)** · **Cmd + `/` only**, no visible trigger ·
CSS from `/css/master-1140.css?v=20260804` (117,492 B), JS from `/js/fastsearch.js?v=20250220`

```css
#fastSearch {
  visibility: hidden; position: fixed; inset: 0; z-index: 1000;
  display: flex; flex-direction: column; align-items: center;
  padding-top: 16vh;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(3px);
}
#fastSearch input {
  width: min(560px, 92vw); padding: 14px 18px;
  font-size: 1.8em; color: #fff; font-weight: bold;
  background-color: #000; border-radius: 8px 8px 0 0;
  border: none; outline: none; text-align: left;
}
#searchResults { width: min(560px, 92vw); border-radius: 0 0 8px 8px; overflow: hidden; }
#searchResults li { background-color: #333; border-bottom: 1px solid #262626; }
#searchResults li mark { background: rgba(0, 122, 252, 0.3); color: #cde5ff; }
@media (prefers-reduced-motion: reduce) { #searchResults li { animation: none !important; } }
```

**What is structurally different:** input and results are **one continuous slab** (`8px 8px 0 0` on
top of `0 0 8px 8px`), matched substrings get `<mark>`, and it is the **only candidate in the whole
gallery that ships a `prefers-reduced-motion` block**.

**Could not transfer:** the `<mark>` blue is a cool accent outside the sky and the palette law bans
it. `backdrop-filter: blur(3px)` is the glass tell being stripped site-wide.

### 6. a24
`https://a24films.com/` · Rod's tier **? (CUT)** · header icon opens a full-viewport curtain ·
CSS from `/assets/css/app.css?v=21b06488...` (307,566 B)

```css
aside.search-wrapper {
  position: fixed; max-height: 0; height: 100vh; min-width: 100vw;
  top: 0; color: white; background-color: black; overflow: hidden; z-index: 5;
  transition: max-height 500ms ease-in-out;
}
aside.search-wrapper.active { max-height: 100vh; height: 100vh; }
.search-wrapper .search-form { width: 100%; font-weight: 500;
  font-size: 48px; line-height: 0.92; letter-spacing: -0.04em; }
/* breakpoints: 38px / 1 / -0.03em  ...  74px / 0.92 / -0.04em */
.page.search .site-container .search-form input {
  color: white; border-bottom: none; font-weight: 300; }
```

**What is structurally different:** **no field chrome exists at all.** The input inherits 74px
display type with `border-bottom: none`; the affordance is the wrapping `<label>` and the curtain,
and the reveal is a `max-height 0 -> 100vh` transition, not opacity.

**Could not transfer:** the curtain removes the scene entirely for its duration, a 100vw x 100vh
solid black panel. That may be intentional but it is Rod's call, not a free adoption. And 74px
display type does not fit a 50px box, so the type would have to be ours.

---

## What this replaces, and why it matters

`list-controls` **declares itself circular-citation Slop in its own header** and is the search on
ramblings. Its claimed provenance was checked line by line:

| claim | points at | verdict |
|---|---|---|
| shapes — the box itself | `rework-stephan.html`, **in this repo** | circular |
| filter hover/active | `rework-hana.html`, **in this repo** | circular |
| empty-state structure | same | circular |
| magnetic | "the kit/list spec", internal | ours |
| search caret | `codepen.io/atelierbram/pen/abrbyQ` | **genuinely external**, but never agent-verified against the live pen |

So the **box** — radius, border, fill, padding, max-width, the whole thing — traces to a file inside
this repo. The one real external link covers a `border-left` and a keyframe, not the box.
