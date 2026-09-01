VERDICTS — reading-well, adversarial re-verification (all three URLs independently re-fetched, stylesheets pulled separately, and every layout claim re-measured in a live browser at 1440px rather than read off the CSS).

---

**1. Red Blob Games — A* introduction — CONFIRMED**

- Live, HTTP 200, 51,764 bytes. Single inline `<style>` block, 16,434 chars (no external CSS).
- Component genuinely present: long technical post, 10 `<pre>` blocks, the measure system is the page's actual layout.
- Every quoted declaration found **verbatim**: `--body-linelen: 66`, `font-size-adjust:ex-height .48`, `round(down, …, 1px)`, `pre{width:var(--body-width);…border-block:1px solid #ccc}`, `pre.simple`, `.w-auto/.w-full/.w-150b`, `aside,p.note,div.note>p`, the `@media(width>=34.375em)` hanging-punctuation rule, `section figcaption`.
- Measured, not inferred: font-size 20px, line-height 30px, `--body-width` 660px, prose 68.3 chars, `pre` width 660px (**byte-identical to the prose column**), pre font 18px → 62.6 mono columns, 3 of 10 pres scroll. h1 40px / h2 25px at 810px width / h3 22.5px — the band arithmetic (2×3em + 660 = 810) checks out.
- Incidental claims that could have been fabricated and were not: longest code line is **exactly 87 chars**; `.w-150b` appears **exactly once**, on `<div id="diagram-astar" class="side-by-side w-150b">` at 990px; `pre.simple` is unused (all 10 pres have empty class attrs).
- Nits only: the quoted monospace stack is truncated (real one ends `…Consolas, monospace, "Segoe UI Symbol", Symbol`); `pre.simple` really has an extra `background-color:transparent`; the `h3` quote drops a nested `a.anchor` block.
- No CSS-vs-artwork confusion. The blob texture is correctly identified as artwork in `doesNotTransfer`.

**2. Josh W. Comeau — full-bleed — CONFIRMED, with two corrections**

- Live, 200. Article shell is real in the DOM: `<article style="--max-article-width:42.875rem" class="a1perbvc">`, with 9 code cards inside it.
- All quoted rules found verbatim across the six `_next/static/css` bundles. The load-bearing one is exact: `@container (min-width: 42.875rem){.w1ey322x pre{white-space:pre-wrap!important}}`. Quote drops `-ms-` prefixes and a few declarations (`--scrollbar-thumb`, `--scrollbar-bg`, `transition`) — trimming, not paraphrase.
- Measured: grid resolves to `337.5px 686px 337.5px`; prose 18px / 686px / 76 chars; card 750px bleeding exactly 32px per side; code 16px; **all 9 pres compute `white-space: pre-wrap`, zero horizontal scroll**. The counter-evidence claim holds up.
- Glyph alignment verified by Range measurement: code glyph left **369.5px** == prose glyph left **369.5px**. "Extra width is pure card chrome, zero extra columns of code" is correct.
- **Correction 1:** the quoted CSS omits the rule that makes that alignment work — `.ae97emi .line{padding-inline:var(--inline-padding)}` (computes to `padding: 0 32px` per line). The `pre` and `code` elements both have `padding: 0`. Copy the quote as given and the recipe does not reproduce.
- **Correction 2:** `.full-bleed` renders **zero** times on this page (`querySelectorAll('.full-bleed').length === 0`). The 20 "full-bleed" hits in the HTML are code samples inside the RSC payload, because the article is *about* full-bleed. The escape hatch that actually renders here is the mid-tier `.fegvmv9`, twice, at 1100px and 1425px. The rule is real in his stylesheet; "the site demonstrates it" is not supported at this URL.
- The candidate's own label ("An Interactive Guide to CSS Grid / full-bleed article") conflates two different pages. The URL is right; the name is sloppy.

**3. lisyarus — exponential smoothing — PARTIAL**

- Live, 200. Component present: `#page-content`, 12 `code.block` elements.
- CSS is **verbatim**, character for character, from `/blog/styles/styles.css`. Nothing paraphrased, nothing invented.
- Core structural claim **confirmed empirically**: code really is narrower than prose. Prose column 800px, `code.block` content box exactly 640px, inset 67px per side, zero of 12 blocks scroll, longest code line **78 chars** (matches the claim exactly).
- **Error 1 — the prose measure is wrong.** Claim: "`max-width: 800px; padding: 20px` = 760px of content … 47.5em, roughly 95 characters." There is no box-sizing reset in the file (its single `box-sizing:border-box` is scoped to `code.block` inside the ≤768px media query), so `#page-content` is content-box: border box 840px, **prose column 800px, measured ~100 chars/line**. The 760/95ch figure is desk arithmetic that the page contradicts. The stated 60px inset is really 67px for the same reason.
- **Error 2 — the 80-column story does not survive measurement.** Claim: "640/8 = EXACTLY 80 COLUMNS … the author writes to 80 columns and sizes the box to 80 columns." Measured code font is **13px** with a **7.15px** advance → 640px = **89.5 columns**, not 80. The 8px-per-glyph assumption (0.6em at 13.33px) is font- and browser-dependent and is not what renders. The 78-char longest line is real; the causal story built on it is inference presented as fact — and `transfers` sells exactly that story ("a fixed pixel width derived from the monospace advance") as the thing to copy.
- Secondary: this page has **zero** `.image-embed` and **zero** `.image-banner` elements, so "one 640px media constant shared across code, images, video and blockquote" is true of the stylesheet but not demonstrated on the cited URL.
- No artwork-as-CSS confusion; `background.png` is real artwork and treated as such.

---

**Stake the ledger row on: Red Blob Games.**

It is the only candidate where the CSS is self-hosted and stable (one inline block, no build hashes to rotate), every quoted declaration is verbatim, and **every** numeric assertion reproduced under independent measurement — including the throwaway ones (87-char longest line, `.w-150b` used exactly once, `pre.simple` unused) that an inventing analyst would have gotten wrong. The component is also the page's actual subject rather than something adjacent to it.

Comeau is a defensible second and the pre-wrap finding is genuinely valuable, but log it with the two corrections attached: add the `.line{padding-inline}` rule to the snippet or the alignment trick won't reproduce, and drop any claim that the page demonstrates `.full-bleed`.

Do not stake lisyarus. The CSS quote is honest, but the two analytical claims that make it worth citing — the 95-char prose measure and the 80-column derivation — are both wrong as rendered, and the `transfers` recipe is built on the wrong one.

Working files: `C:\Users\Rod\AppData\Local\Temp\claude\C--Users-Rod-Documents-ProjectFiles-Website\d1d0c775-c102-4c14-b21e-98f9e13d1b9f\scratchpad\verify\` (`rbg.html`, `rbg.css`, `jwc.html`, `jwc-all.css`, `lisyarus.html`, `lisyarus.css`, `panda.css`).