## Verification method

Re-fetched every URL fresh with `curl` (raw bytes, no markdown conversion), then regex-extracted the actual rule bodies from the served HTML/CSS and diffed them against the claims. No screenshots, no inference from prose.

---

### 1. ameye.dev — `/notes/edge-detection-outlines/` — **CONFIRMED**

- HTTP 200, 106,571 bytes. Only external stylesheets are `reset.css` and KaTeX; everything cited is in the page's inline `<style>` blocks (4 of them). Nothing cited is an image.
- **Component is really there, statically, in the served HTML:** `<footer class="note-footer"><ul class="note-tags"><li><a style="--tag-bg: #e1f5f6; --tag-text: #0885ff;" href="/tags/graphics">graphics</a></li></ul></footer>` — byte-identical to the claim. Also present on `/tags/graphics` (which additionally uses the `.tags-header` variant, 5 hits). Not on `/notes/` index; `/tags/` 404s.
- **All seven CSS rules verbatim**, character-for-character including `box-shadow:1px 1px`, `transition:transform .1s`, `line-height:30px`, `border-radius:10px`, `a:before{content:"#"}`, and `.note-tags a:hover{transform:scale(1.05)}` — hover is that one declaration and nothing else. Confirmed.
- **Tokens verbatim:** `--palette-offgray-600:#1f293c`, `--palette-offwhite-100:#fcfcfa`, and I confirmed offwhite-100 is actually the page background (`background-color:var(--palette-offwhite-100)` on the body/wrapper rules), so the "translucent `#fffefc80` over a `#fcfcfa` page" reading is correct, not assumed.
- **Dead-code claim independently verified:** `--tag-bg` appears exactly **1** time in the entire document and there are **0** `var(--tag-bg)` consumers. The claim was right.
- **`arial-rounded-bold` verified self-hosted:** `@font-face{font-family:arial-rounded-bold;src:url('/assets/fonts/arial-rounded-bold.woff2')...}`. Correct, and correctly flagged as non-transferable.
- **`prefers-reduced-motion`: 0 occurrences** page-wide. The "does not ship a guard" claim is true. `prefers-color-scheme`: 0 — permanently light, so the inverted-from-night-ground caveat is also true.
- Only nit: this URL renders exactly **one** chip, so `flex-wrap` and the li-carried gaps are read from CSS, not observed as multi-chip layout. The CSS is unambiguous, so this doesn't move the verdict.

### 2. 109ichiki.com — `/works/meidonohi/` — **PARTIAL**

- HTTP 200. `/_astro/style.COBHKi4A.css` hash still valid, HTTP 200, 62,906 bytes.
- **CSS is verbatim.** `._tags_uowtk_75{display:flex;gap:.5rem}` and `._tag_uowtk_75{...height:1.3125rem;padding:0 .75rem;margin-top:.46875rem;border:solid 1px var(--color-border);border-radius:100vh;font-size:var(--font-size-small)}` — exact. Root tokens exact, including `font-family:var(--font-ibm),var(--font-ja),sans-serif` and `font-size:clamp(14px,1.1111111111vw,16px)`. Mobile `--font-size-small:.625rem` exact (real query is `@media screen and (max-width: 768px)`; claim abridged the `screen and`). **Zero hover rules** matching `_tag_uowtk_75` — confirmed.
- **Why PARTIAL — the claim's framing is wrong in a way the ledger would inherit:** all **17** occurrences of `_tags_uowtk_75` on that page are inside `<template>` elements. Strip the templates and the count is **0**. There is no article page here: the slug URL serves the `/works/` grid plus one inert `<template>` per post, which `/_astro/hoisted.DLZDcrRD.js` clones into an empty `<div class="_postWrapper_uowtk_11" aria-hidden="true">` and shows inside a `<dialog>`. So this is a **modal/dialog meta strip, not post meta on an article page**. The candidate's line "these live on the `/works/<slug>/` detail pages" is directionally right but there are no detail pages.
- Its other corrections check out: `/` has 0 tag chips; the `_filterTypeItem_`/`_filterCategory_` chips are a separate component (4 and 6 hits) and appear on the slug URL only because it *is* the index page.
- Unmentioned: the chips carry Japanese text (オリジナル / イラスト). A 21px box tuned for CJK glyphs is not the same box for Latin mono.
- Nothing cited is an image.

### 3. chriskirknielsen.com — `/blog/going-full-circle-css-toggle-transitions/` — **PARTIAL**

- HTTP 200, 173,730 bytes, all CSS inlined as claimed. Nothing cited is an image.
- **Component really there, statically:** line 3236, `<li><a href="/tags/css" class="button button--tag | p-category">css</a></li>` inside `<div class="hero-tags">` in the post header. Verbatim.
- **Every quoted rule verbatim:** the `.button` base block, the `@media (prefers-reduced-motion: no-preference)` transition wrapper, `.button.button--tag{--CTA-padding: var(--_cta-padding-block) var(--size-xs)}`, the `icon-only`/`tag` `text-decoration:none` pairing, `.flex-list`, `.fontSize-small`, and `.button:is(:hover, :focus-visible, :has(:focus-visible))` (exactly 1 occurrence). All `--_cta-*` tokens, `--size-2xs:4px`, `--size-xs:8px`, `--anim-short`, `--typeScale-n1` — exact. The cyberpunk block at lines 2555–2572 is exact.
- **Why PARTIAL — the amber-on-night chip is not what the cited URL shows.** The served root element is `<html data-section="post" lang="en" data-js="false">` with **no `data-theme`**. Cyberpunk is one of nine opt-in themes (`campfire, custom, cyberpunk, dawn, director, dusk, quill, vapor, vintage`) chosen via a `<theme-picker>` web component. The default is the dawn/dusk space-toggle pair: `--color-surface: var(--T-dawn, #e2e2d5) var(--T-dusk, #2d0042)`, driven by `prefers-color-scheme` (8 hits). The writeup does scope the selector honestly, but a ledger row that records "amber on night" without the theme gate will send the next agent to a URL showing a completely different chip.
- **One token omission:** `--_cta-padding-inline: var(--cta-padding-inline, var(--size-s))` was not quoted and `--size-s` was never resolved. The tag overrides its own inline padding, but `--_cta-padding-inline` still drives `gap` on `.button`, so it is live for the chip.
- Reduced-motion claim checks out for this site: 31 `prefers-reduced-motion` hits plus an `--anim-f: 1e-7` kill switch.

---

### Payload integrity problem

The candidate-3 `howItWorks` field arrived **truncated mid-sentence** ("Height"), and candidate 2's prose says "the most restrained of the four" — **a fourth candidate is referenced but absent from the payload.** Whatever produced this list either dropped a candidate or was cut off. Do not treat this as a complete three-way comparison.

---

### Stake the ledger row on: **ameye.dev**

It is the only one of the three where the component is statically present in the served HTML at the cited URL — no JS template cloning, no dialog, no theme gate, no external stylesheet whose hash can rot. Every claimed declaration, token, page background, `@font-face`, and even the dead-code assertion survived independent re-derivation. It is genuinely post-meta on an article page, and it is the only candidate that ships the non-fill hover the brief is after (`transform: scale(1.05)`, `.1s`) as default behavior rather than as a theme variant or as a non-interactive span.

Tier it **Remixed, not True**: the palette inverts (cool navy on off-white vs. warm ink on night), `arial-rounded-bold` is unlicensable and must be substituted, the inline `--tag-bg`/`--tag-text` are dead and must not be carried over, and the `scale(1.05)` hover needs a `prefers-reduced-motion` guard that the source does not ship.

Keep 109ichiki as a **secondary geometry-only** note if you want the fixed-height/flex-centred pill, but record it as a dialog component. Do not stake the row on chriskirknielsen unless the row explicitly reads `html[data-theme="cyberpunk"]`.