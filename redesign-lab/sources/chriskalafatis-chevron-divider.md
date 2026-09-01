# Chevron / Down-Arrow SVG (the magnetized element)

- **Source URL:** https://chriskalafatis.com/ (inline in the page HTML)
- **Captured:** 2026-06-11
- **Tier: True** (verbatim inline SVG copied from the live HTML)

This is the exact chevron/down-arrow that the magnetic effect (see chriskalafatis-magnetic-cursor.md) pulls toward the cursor. It appears 7 times in the page (4 at `100%` sizing inside buttons, 3 at fixed `3rem`). It is the ONLY inline SVG on the page.

## Verbatim SVG

```html
<svg width="100%" height="100%" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.2338 12.28L14.7538 20.8V0.239998H11.3538V20.76L2.87375 12.28L0.59375 14.56L13.0738 27L25.5138 14.56L23.2338 12.28Z" fill="white"></path>
</svg>
```

Fixed-size variant used standalone (identical path, different width/height):
```html
<svg width="3rem" height="3rem" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.2338 12.28L14.7538 20.8V0.239998H11.3538V20.76L2.87375 12.28L0.59375 14.56L13.0738 27L25.5138 14.56L23.2338 12.28Z" fill="white"></path>
</svg>
```

## Plain-English technique

A single-path, filled (not stroked) downward arrow/chevron on a `26 x 27` viewBox. The path traces a thick down-arrow: a vertical shaft (the `0.239998 -> 20.76` segment) with a chevron arrowhead at the bottom. It's a clean geometric glyph, NOT hand-drawn. Filled `white` and shown over dark/WebGL background, picked up by the site's `mix-blend-mode: difference` treatment so it inverts against whatever is behind it.

## NOTE on "organic lines & dividers"

Rod's brief asked for **hand-drawn/organic divider lines**. After scraping the HTML, CSS, and JS:
- The only inline SVG on the page is this geometric chevron (above) — there are **no inline organic/hand-drawn SVG divider paths** in the markup.
- The CSS `.noise` class is an empty placeholder (`height:1rem;width:1rem;position:fixed;visibility:hidden`) — no divider assets there.
- The page renders most of its visible content through **Three.js / WebGL** (see chriskalafatis-noise-grain.md). Any "organic" lines/strokes that appear on the live site are most likely drawn on the WebGL canvas (shader/geometry) or are raster image assets loaded by the WebGL layer — they are NOT extractable as clean inline SVG from the source.
- If Rod specifically wants organic divider lines, those are a **CHROME-AGENT SCRAPE REQUEST** target (inspect the live canvas / network image assets) — flagged in the return summary.
