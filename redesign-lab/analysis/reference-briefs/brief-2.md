**PREMISE: CONFIRMED.** docs.astro.build (Starlight) genuinely ships a desktop rail AND a `<details>` mobile popup driven by one shared list component with an inline `--depth` property. Fetched live 2026-08-23. The CSS file the saved note cited, `/_astro/middleware.Dyx8U14h.css`, is byte-for-byte still the served file (same content hash), so the note was not reading a stale build.

Saved note verified: `C:/Users/Rod/Documents/ProjectFiles/Website/redesign-lab/analysis/component-sources/source-toc-scroll-spy.md` (candidate 1 of 4). No file for this component exists in `redesign-lab/sources/`.

---

## Scope hashes to strip

`.astro-f35rxoh7` = the shared list (both instances). `.astro-gl7qdvoz` = mobile popup. `.astro-mbtvktjh` = right-sidebar panel. `.astro-ojrabbd2` = right-sidebar container. Every one is `:where()`-wrapped, so stripping them changes nothing about specificity.

## Verbatim CSS, live, scopes intact

The shared list (`.astro-f35rxoh7`) — this is the core of the treatment:
```
ul:where(.astro-f35rxoh7){padding:0;list-style:none}
a:where(.astro-f35rxoh7){--pad-inline:.5rem;padding-block:.25rem;padding-inline:calc(1rem * var(--depth) + var(--pad-inline)) var(--pad-inline);border-radius:.25rem;line-height:1.25;display:block}
a:where(.astro-f35rxoh7)[aria-current=true]{color:var(--sl-color-text-accent)}
.isMobile:where(.astro-f35rxoh7) a:where(.astro-f35rxoh7){--pad-inline:1rem;justify-content:space-between;gap:var(--pad-inline);border-top:1px solid var(--sl-color-gray-6);color:var(--sl-color-text);font-size:var(--sl-text-sm);outline-offset:var(--sl-outline-offset-inside);border-radius:0;padding-block:.5rem;text-decoration:none;display:flex}
.isMobile:where(.astro-f35rxoh7):first-child>li:where(.astro-f35rxoh7):first-child>a:where(.astro-f35rxoh7){border-top:0}
.isMobile ... a[aria-current=true],:hover,:focus{color:var(--sl-color-white);background-color:unset}
```
The single-property nesting trick, confirmed in served markup: `style="--depth: 0;"` / `"--depth: 1;"` is written onto `ul`, `li`, `a` and `span` alike (redundant on three of the four; only `a` consumes it).

Mobile popup (`.astro-gl7qdvoz`):
```
nav{z-index:var(--sl-z-index-toc);top:calc(var(--sl-nav-height) - 1px);border-top:1px solid var(--sl-color-gray-5);background-color:var(--sl-color-bg-nav);position:fixed;inset-inline:0}
@media (width>=50rem){nav{inset-inline-start:var(--sl-content-inline-start,0)}}
summary{height:var(--sl-mobile-toc-height);border-bottom:1px solid var(--sl-color-hairline-shade);font-size:var(--sl-text-xs);outline-offset:var(--sl-outline-offset-inside);align-items:center;gap:.5rem;padding:.5rem 1rem}
summary::marker{display:none}
summary::-webkit-details-marker{display:none}
.toggle{border:1px solid var(--sl-color-gray-5);background-color:var(--sl-color-black);user-select:none;cursor:pointer;border-radius:.5rem;flex-shrink:0;justify-content:space-between;align-items:center;gap:1rem;padding-block:.5rem;padding-inline:.75rem .5rem;line-height:1}
details[open] .toggle{color:var(--sl-color-white);border-color:var(--sl-color-accent)}
details .toggle:hover{color:var(--sl-color-white);border-color:var(--sl-color-gray-2)}
details[open] .caret{transform:rotate(90deg)}
.display-current{white-space:nowrap;text-overflow:ellipsis;color:var(--sl-color-white);overflow:hidden}
.dropdown{--border-top:1px;margin-top:calc(-1 * var(--border-top));border:var(--border-top) solid var(--sl-color-gray-6);border-top-color:var(--sl-color-hairline-shade);max-height:calc(85vh - var(--sl-nav-height) - var(--sl-mobile-toc-height));background-color:var(--sl-color-black);box-shadow:var(--sl-shadow-md);overscroll-behavior:contain;overflow-y:auto}
```

Desktop rail (`.astro-ojrabbd2` / `.astro-mbtvktjh`):
```
.right-sidebar{border-inline-start:1px solid var(--sl-color-hairline);padding-top:var(--sl-nav-height);scrollbar-width:none;width:100%;height:100vh;position:fixed;top:0;overflow-y:auto}
.right-sidebar-panel{min-height:100%;padding:1rem var(--sl-sidebar-pad-x);flex-direction:column;justify-content:space-between}
.right-sidebar-panel{display:flex}
.right-sidebar-panel h2{color:var(--sl-color-white);font-size:var(--sl-text-h5);font-weight:600;line-height:var(--sl-line-height-headings);margin-bottom:.5rem}
.right-sidebar-panel :where(a){font-size:var(--sl-text-xs);color:var(--sl-color-gray-3);overflow-wrap:anywhere;text-decoration:none;display:block}
.right-sidebar-panel :where(a):hover{color:var(--sl-color-white)}
```

Breakpoint and tokens, settled: `.lg\:sl-block{display:block}` lives inside `@media (width>=72rem)`, and `--sl-mobile-toc-height` flips `3rem` -> `0rem` in that same query. So **72rem (1152px) is the single switch**: below it the popup bar is the TOC, above it the rail is. Others: `--sl-z-index-toc:4`, `--sl-sidebar-width:18.75rem`, `--sl-sidebar-pad-x:1rem`, `--sl-text-xs:.8125rem`, `--sl-text-sm:.875rem`, `--sl-outline-offset-inside:-.1875rem`.

## Five discrepancies against the saved note

1. **"Zero JS for the open/close" is wrong.** `MobileTableOfContents...kgentfrr.js` adds real behaviour: close on any non-tab link click, close on outside click, and Escape closes then returns focus to `<summary>` only if focus was inside. That last one is the a11y move worth copying, and the note omits it entirely.
2. **`.display-current` is empty in the served HTML.** The "summary shows the current heading" effect is JS-only: the mobile subclass overrides `set current` to write `link.textContent` into it. It is not free, and it needs a sensible pre-JS default (Starlight ships a blank).
3. **The note's "verbatim" CSS was pre-stripped and lightly edited** — scope hashes removed and the two `.right-sidebar-panel` rules merged into one with `display:flex` folded in. Live keeps them separate. Harmless, but it means the note is a transcription, not a quote.
4. **Rules the note missed:** the whole `.isMobile a` row treatment (flex, `--pad-inline:1rem`, top hairline), the `:first-child` border-top reset, `.toggle:hover`, `[dir=rtl] .caret`, and `html{scroll-padding-top:calc(1.5rem + var(--sl-nav-height) + var(--sl-mobile-toc-height))}` (dropping to `calc(1.5rem + var(--sl-nav-height))` at >=72rem). That last one is Starlight's own anchor-under-sticky-header fix; the note credited only MDN for that idea. One formula serves both layouts because the popup height collapses to zero.
5. **False alarm resolved:** `starlight-toc.CTCQXEge.js` appears in no `src=` attribute, but it IS the correct live file — a shared chunk imported by both entry scripts. The note's citation stands.

## JS: de-minification verified accurate

I diffed the note's de-minified `StarlightTOC` against live `starlight-toc.CTCQXEge.js` and it is faithful. `tocHeadingSelector` builds to `h1#_top,:where(h2,h3)[id]`. `getRootMargin()` = `header.height + summary.height + 32`, returning `` `-${N}px 0% ${N+53-clientHeight}px` ``. Resize disconnects, debounces 200ms, re-inits inside `requestIdleCallback`. The heading-walk recursion (previousElementSibling, descend to lastElementChild, else recurse to parent, else `#_top`) is the part that keeps a section lit under a long code block or a canvas.

## Cannot transfer under the palette law

- **The accent, in both themes.** Light: `--sl-color-accent:#3d50f5`, `--sl-color-accent-high:#0f1c8a`, `--sl-color-text-accent:var(--sl-color-accent)`. Dark: `--sl-color-accent:#3369ff`, `--sl-color-accent-high:#b3c7ff`, `--sl-color-text-accent:var(--sl-color-accent-high)`. **Useful nuance the note flattened:** in dark mode the active link is `#b3c7ff`, a *pale* blue against `--sl-color-gray-3` `#888c96`. The active state is carried by a **lightness step, not a hue pop**. That relationship maps cleanly onto `--color-gold #fbbf24` (or `--color-glow #ff6a00`) against `--color-silver #a3a19d`, and it is the reason this rail reads quiet rather than shouty. Also note `details[open] .toggle{border-color:var(--sl-color-accent)}` is a second, separate blue that needs re-hueing.
- **`--sl-color-gray-3` `#888c96` and `--sl-color-gray-5` `#353841` are cool greys.** Swap to `--color-silver` and a warm hairline; do not transcribe the hexes.
- **The base64 tick.** `.isMobile a[aria-current=true]:after` uses a data-URI checkmark as `mask-image`. Generic; drop it or use Rod's own mark.
- **The caret is a real inline chevron SVG** (24x24 viewBox, `fill="currentColor"`, `--sl-icon-size:1rem`), not a CSS shape. Artwork, so it needs sourcing separately or replacing with a CSS triangle.
- **Three-scene conflicts:** `.dropdown` and `.toggle` both use solid fills (`--sl-color-black` `#17181c`) and `.dropdown` adds `box-shadow:var(--sl-shadow-md)` (four stacked shadows). Those compete with the live scene. `--color-panel rgba(28,26,24,.55)` is the substitute, and the shadow should go. No `backdrop-filter` anywhere in this component, so nothing to strip on that front.
- **Roundness:** `border-radius:.25rem` on rail links and `.5rem` on the toggle both violate square-by-default. Note that `.isMobile a` already resets to `border-radius:0`, so the square variant is the one Starlight itself ships on mobile.
- **`sl-hidden` / `lg:sl-block`** is Starlight's own mini-utility layer, not Tailwind. Replace with one `@media (width>=72rem)`.

## Reduced motion

Starlight's mobile caret has **no transition at all** — it snaps. Only the unrelated sidebar caret (`.astro-3xlzsaht`) animates. So as-shipped this component needs no reduced-motion path; if the craft stage adds one, copy Starlight's inverse gate, which is the better pattern: `@media (prefers-reduced-motion:no-preference){ ...transition... }` (opt in to motion rather than opt out).

## Theirs vs ours

**Theirs (True, idea-origin: theirs):** `aria-current="true"` as the sole styling and a11y hook; the `calc(1rem * var(--depth) + var(--pad-inline))` indent; observing inter-heading content blocks plus the backward/upward heading walk; the runtime-computed rootMargin band; `<details>`/`<summary>` popup with the active heading in the closed summary; `max-height:calc(85vh - ...)` with `overscroll-behavior:contain`; the fixed rail with inner scroll and a hairline inner border; `scroll-padding-top` tied to the same height tokens; the Escape-with-focus-restore handler.

**Ours (must be declared, not inherited):** every colour; the square corners; panel token instead of solid black; shadow removal; the 72rem breakpoint choice if we deviate; the caret glyph; whatever replaces the tick; and the decision of whether the desktop rail is `fixed` (Starlight) or `sticky`. Flagging that last one because Starlight's `position:fixed;top:0;height:100vh` is what forces the `padding-top:var(--sl-nav-height)` compensation, and a sticky rail avoids that entirely.

**Slop risk:** none identified. Every declaration above is traceable to a live served file. If the craft stage wants the sliding-marker feel instead of a colour swap, that geometry is VitePress's and is documented as candidate 2 in the same analysis file, not Starlight's, and must be cited as such.