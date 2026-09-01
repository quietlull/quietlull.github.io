# Filippo Ruffini — Layout / Grid Structure

- **Source:** https://www.filipporuffini.com/ (Webflow)
- **Asset:** https://cdn.prod.website-files.com/643d4a3e40f13a5d541373e9/css/filippo-ruffini.webflow.98e69a3e9.css
  (plus inline `:root` vars from page `<head>`)
- **Captured 2026-06-11**
- **Tier: True** (verbatim from the live stylesheet)

The page is a full-viewport, edge-framed layout: every section is `min-height:100vh`, content
sits inside a global side padding (`3.9375em`) that exactly matches a fixed dev-grid overlay,
and the inner content is laid out on a **12-column flexbox grid** (Bootstrap-style:
`.row` + `.col.col-lg-N`). Background "year" numerals and corner brackets fill the frame.

---

## A. Foundations (verbatim)

```css
:root {
  --black: #101010;
  --white: white;
  --grey-secondary: #777;
  --grey-tertiary: #333;
  --orange: #fd6746;
}

body {
  background-color: var(--black);
  color: var(--white);
  font-family: Ppneuemontreal, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
```

Page also sets a viewport-relative root font on `body` (inline): `font-size: 0.8333333333333334vw;`
so every `em`/`rem` scales fluidly with the viewport width on desktop.

Column gap token (inline `:root`): `--col-gap: 0.9375rem;` (= the 15px Bootstrap gutter).

---

## B. Section + global padding (verbatim)

```css
.section {
  z-index: 20;
  width: 100%;
  position: relative;
}
.section.is--hero {
  z-index: 10;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  min-height: 100vh;
  padding-top: 4.375em;
  padding-bottom: 3.75em;
  display: flex;
}
.section.is--footer {
  z-index: 20;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  min-height: 100vh;
  padding-top: 4.375em;
  padding-bottom: 3.75em;
  display: flex;
}

/* global left/right page padding — matches the dev-grid inset */
.p-pad {
  width: 100%;
  padding-left: 3.9375em;
  padding-right: 3.9375em;
}

.main-c {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
```

---

## C. Fixed dev-grid overlay (verbatim)

A fixed two-column ghost grid pinned inside the same `3.9375em` inset, used as the visible
layout guide. `.dev-grid__col` columns scale in with a `scale3d(1,0,1)` -> 1 reveal.

```css
.dev-grid {
  z-index: 1000;
  height: 100vh;
  position: fixed;
  top: 0%;
  bottom: 0%;
  left: 3.9375em;
  right: 3.9375em;
}
.dev-grid.pointer-none {
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
}
.dev-grid__col {
  transform-origin: 50% 100%;
  transform-style: preserve-3d;
  background-color: rgba(255, 255, 255, .03);
  width: 100%;
  height: 100%;
  transform: scale3d(1, 0, 1);
}
```

---

## D. 12-column flex grid (verbatim)

This is the real content grid. `.row` is a wrapping flexbox with negative margins; each
`.col` has 0.9375rem side padding (the gutter); width is set by a `.col-lg-N` modifier
(`N/12`). Plus alignment/justify modifiers and `ml-/mr-/offset-` spacers.

```css
.row {
  flex-wrap: wrap;
  align-content: stretch;
  margin-left: -.9375rem;
  margin-right: -.9375rem;
  display: flex;
}
.row.justify-end     { justify-content: flex-end; }
.row.justify-between { justify-content: space-between; }
.row.justify-around  { justify-content: space-around; }
.row.justify-start   { justify-content: flex-start; }
.row.j-center        { justify-content: center; }
.row.align-stretch   { align-items: stretch; }
.row.align-start     { align-items: flex-start; line-height: 1; }
.row.align-center    { align-items: center; }
.row.align-end       { align-items: flex-end; }
.row.full-height     { height: 100%; }
.row.abs-full {
  z-index: 1;
  position: absolute;
  top: 0%; bottom: 0%; left: 0%; right: 0%;
}

.col {
  flex: 1;
  padding-left: .9375rem;
  padding-right: .9375rem;
}

/* width modifiers — N/12 */
.col.col-lg-1  { flex: 8.333%;   max-width: 8.333%; }
.col.col-lg-2  { flex: 16.6667%; max-width: 16.6667%; }
.col.col-lg-3  { flex: 25%;      max-width: 25%; }
.col.col-lg-4  { flex: 33.3333%; max-width: 33.3333%; }
.col.col-lg-5  { flex: 41.6667%; max-width: 41.6667%; }
.col.col-lg-6  { flex: 50%;      max-width: 50%; }
.col.col-lg-7  { flex: 58.3333%; max-width: 58.3333%; }
.col.col-lg-8  { flex: 66.6667%; max-width: 66.6667%; }
.col.col-lg-9  { flex: 75%;      max-width: 75%; }
.col.col-lg-10 { flex: 83.3333%; max-width: 83.3333%; position: relative; }
.col.col-lg-11 { flex: 91.6667%; max-width: 91.6667%; }
.col.col-lg-12 { flex: 100%;     max-width: 100%; }

/* offset / margin spacers (verbatim samples) */
.col.ml-1-col { margin-left: 8.333%; }
.col.mr-2-col { margin-right: 16.666%; }
.col.col-lg-1.offset-right { margin-right: -.9375rem; }
.col.col-lg-1.offset-left  { /* mirror of offset-right */ }
.col.no-pad__right { margin-right: -.9375rem; padding-right: 1.875rem; }
```

### Markup pattern (from page DOM)

```html
<section class="section is--hero">
  <div class="p-pad">
    <div class="main-c">
      <div class="row align-center full-height">
        <div class="col col-lg-7">...</div>
        <div class="col col-lg-5">...</div>
      </div>
    </div>
  </div>
</section>
```

---

## Responsive breakpoints used

Standard Webflow tiers: `991px`, `767px/768px`, `479px`. The `.col-lg-*` widths are the
desktop (>=992px) values shown above; below 992px Webflow's base `.w-col` rules stack columns
to full width. The fluid `body { font-size: ...vw }` only applies at desktop widths.

---

## Technique explanation

- **Edge-frame, not a centered container.** Rather than a `max-width` centered column, the
  whole viewport is the canvas: `min-height:100vh` sections, content inset by a single
  `--p-pad` value (`3.9375em`) on both sides. The corner brackets + dev-grid overlay live in
  that same inset, so the framing lines always agree with the content edges.
- **Classic 12-col flex grid.** `.row` (negative-margin flex wrap) + `.col.col-lg-N`
  (`flex` + `max-width` = `N/12`) + `.col` gutter padding of `0.9375rem`. This is the Bootstrap
  model rebuilt as Webflow utility classes — predictable, easy to hand-author.
- **Fluid sizing via vw root font.** Because `body` font-size is `~0.833vw`, all the `em/rem`
  paddings/gaps/corner sizes breathe with the viewport on desktop, then snap to fixed rem at
  the breakpoints.

### Fit for Rod's site
The "100vh section + single side-inset + 12-col flex grid + corner brackets keyed to the same
inset" recipe is the cleanest part to reuse. Keep `--p-pad` and `--col-gap` as tokens, draw
the corner brackets (see `filipporuffini-corner-brackets.md`) from that same inset, and you get
the framed, instrument-panel layout without adopting Webflow's whole class soup. The vw root
font is optional — Rod's site can keep clamp-based fluid type instead.
