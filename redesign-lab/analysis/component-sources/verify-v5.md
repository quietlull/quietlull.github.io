Re-fetched all three URLs independently and diffed every quoted declaration against the live stylesheets.

## Candidate 1 — Maxime Heckel — **CONFIRMED**

- **Live:** 200, 507,628 bytes.
- **Has the component:** Yes, 9 instances on this exact URL, each with a real title (`data-testid="codesnippet-title"`, e.g. "Basic definition of a React Three Fiber mesh") plus `aria-label="Copy code to clipboard"` and `prism-code`. All 8 claimed classes present in the DOM.
- **CSS verbatim:** All 8 rules match byte-for-byte from `<style id="stitches">`. All 5 tokens match exactly (`--code-snippet-background:var(--gray-200)`, `--border-radius-2:12px`, `--space-2:8px`, `--font-size-1:14px`, `--font-mono-code:'FiraCode', 'FiraCode Fallback'`). Only deviation: `.c-eotEYs` was quoted without the `-webkit-user-select:none;` prefix. Trivial.
- **Not an image:** The copy button is real inline SVG and the `howItWorks` description is exact — one `<svg viewBox="0 0 25 25">` holding three `<path>`s: two clipboard paths at `opacity="1" filter="blur(0px)"` and a checkmark `M20 6L9 17L4 12` at `opacity="0" filter="blur(2px)" pathLength="1" stroke-dashoffset stroke-dasharray`. That level of detail cannot be confabulated.
- **"No traffic lights" verified:** 5 `<circle>` elements page-wide, all `cx=12 cy=12 r=10` generic icon circles, none in the code header.

Two errors, both in prose caveats, neither touching the transferable CSS:
1. **"styled-components hashes"** is wrong. Zero occurrences of `styled-components`; it is **Stitches**. The "rename them" advice still stands.
2. **The glassmorphism caveat is phantom.** `--card-blur` is never defined anywhere on the page (0 occurrences), so `backdrop-filter` resolves to `none`. The card is not glassmorphic and does not conflict with the paper-morphism call.

## Candidate 2 — Astro Starlight — **CONFIRMED**

- **Live:** 200; `_astro/ec.v4551.css` resolves at exactly the claimed 18,222 bytes.
- **Has the component:** Yes, and both forks are on this page: 3 × `frame has-title`, 10 × `frame is-terminal`, 1 × `is-terminal has-title`, 36 plain. Titles are real (`<span class="title">src/content/docs/example.md`).
- **CSS verbatim:** All 6 rules match byte-for-byte, including the `.frame.has-title pre` top-radius zeroing and `--ec-frm-trmTtbDotsFg:color-mix(in srgb, var(--sl-color-gray-5), transparent 25%)`.
- **`data-code` trick verified:** literal U+007F separators, 148 on the page, matching the quoted sample `data-code="---\x7ftitle: My page title\x7f---"` exactly. `<div aria-live="polite">` confirmed.
- **Dots are CSS, not artwork:** confirmed monochrome `mask-image` of a 3-circle SVG tinted by one `background-color`.

Two inaccuracies:
1. **The `--ec-frm-trmIcon` value is reconstructed, not verbatim.** Quoted as readable `url("data:image/svg+xml,<svg viewBox='0 0 60 16'>...")`; the real value is fully percent-encoded and includes `xmlns` and `preserveAspectRatio='xMidYMid meet'`. Presented under a "read-from-source" label it was not read from.
2. **The hit-target claim is conditional.** `2.5rem` is the base, but under `@media (hover: hover)` the rule is `.copy button{opacity:0;width:2rem;height:2rem}` — on desktop the button is **hidden until frame hover** and 32px, not a persistent 40px. Still clears WCAG 2.5.8, but the described behavior is not what desktop users get. Unmentioned bonus: `@media (scripting: none){.copy{display:none}}`.

## Candidate 3 — Josh Comeau — **PARTIAL**

- **Live:** 200. All 6 claimed classes present; all 4 quoted rules verbatim in `/_next/static/css/` (`--copy-button-sticky-top:5rem` confirmed elsewhere in the cascade, so the `0px` fallback in the quoted rule is correctly characterized).
- **But it is not this component.** There is no filename bar, no title, no header, no tab. The code block is `<div class="coaxrjn c1qvfy1x ae97emi"><button>…</button><div><pre class="shiki">`. It is a copy button in isolation. The candidate self-declares this, so it is honest rather than fabricated, but as a *code-block* source it covers one sub-part.
- **One unflagged detail:** the icon is not a single SVG. It is a nested span stack (`i1htlkn0` → `i14jtb2i` → `w1gpdsbs`) swapping a **Lucide loader spinner** and a check via `opacity`/`transform:scale(0)`. Anyone transcribing from the prose would build the wrong thing.
- Byte count claimed 127,542 vs 130,373 measured — bundle rotation, not a red flag.

## Stake the ledger row on: **Candidate 1 (Maxime Heckel)**

It is the only one that is simultaneously (a) verbatim-accurate on every transferable declaration, verified down to SVG path data, (b) a complete component — card, header, title, copy button, line-number gutter — rather than a fragment, (c) a hand-made personal dev site rather than a docs system, which is the taste evidence the pillars require, and (d) already free of the traffic-light chrome, so nothing needs surgical removal. Its two errors are phantom-risk caveats that make it *more* compatible with Rod's palette and paper-morphism calls, not less.

Correct these before the row is written: the library is **Stitches, not styled-components**, and **delete the glassmorphism caveat** — `--card-blur` is undefined, so there is no blur to inherit. The real cool-palette warning stands: `--code-snippet-background: var(--gray-200)` must be taken as a slot and filled with Rod's night-ground.

Two secondary notes. Candidate 2 is a legitimate **CONFIRMED** second row if Rod wants the *protruding folder-tab* silhouette — Maxime gives a full-width header strip, not a tab, and those are different geometries. Fix the `--ec-frm-trmIcon` quote to the real percent-encoded value and correct the hover-hides-the-button behavior first. Candidate 3 should not get its own code-block row; at most a copy-button-sticky-positioning row, with the icon description rewritten.