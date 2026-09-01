# SOURCE (True) — junni.co.jp (HERO: outlined "ghost" type that ignites with accent)

- **URL:** https://junni.co.jp (creative studio, Tokyo)
- **Captured:** 2026-06-11 via Chrome extension + PowerShell raw-CSS fetch.
- **Raw CSS (provenance):** `sources/junni-index1.css`, `sources/junni-index2.css`.
- **Rod wants:** the HERO (replacing the swirling ring). Take the **outlined ghost-type identity**, NOT the 6x6 flipping image-panel KV grid (too image-heavy).
- **Palette here:** near-black #1c1d21 / #111 + acid-lime accent #dcff46 / #d3ff02. **Recolor lime -> Rod amber-night** (#FBBF24 / #F59E0B on midnight).
- Display fonts: **Barlow Condensed** (numerals) and **Lato 900** (the big slider). For Rod: a condensed display face.

## The core technique — outline that IGNITES with accent (verbatim)
```css
/* ghost numeral that fills with accent on hover/scroll (data-hover state machine) */
.home_service_num{font-family:Barlow Condensed,sans-serif;font-size:min(100px,6.25vw);font-weight:700;letter-spacing:.05em;line-height:.8}
[data-hover=before] .home_service_num{-webkit-text-stroke:1px #1c1d21;-webkit-text-fill-color:transparent;color:transparent}      /* ghost outline */
[data-hover=after]  .home_service_num{-webkit-text-stroke:1px #dcff46;-webkit-text-fill-color:#dcff46;color:#dcff46}             /* ignited: outline+fill in accent */
```

## Huge outlined hero text + per-char NEON FLICKER (verbatim) ★ strong hero candidate
```css
.home_recruit_textSlider_item{display:inline-flex;align-items:center;padding:0 .1923em;font-family:Lato;font-size:min(156px,9.75vw);font-weight:900;line-height:1;letter-spacing:.1em;-webkit-text-stroke:2px #dcff46;-webkit-text-fill-color:transparent;color:transparent}
@keyframes char-blinking{
  0%{-webkit-text-stroke:.0128em #dcff46;-webkit-text-fill-color:transparent}
  1%,15%{-webkit-text-stroke:.0128em #fff;-webkit-text-fill-color:#fff}   /* flash to solid white */
  16%,to{-webkit-text-stroke:.0128em #dcff46;-webkit-text-fill-color:transparent}  /* back to accent outline */
}
```
(Apply `char-blinking` per-letter with staggered delays = a lantern/neon flicker across the name.)

## Section-title reveal trick (outline filled with bg color, revealed on scroll)
```css
.home_*_title_wrap>span{background-color:#1c1d21;-webkit-text-fill-color:#1c1d21;-webkit-text-stroke:1px #dcff46}
```
(Letters hidden = filled with bg; stroke makes them appear as outlines during a scroll reveal.)

## Hero container
```css
.home_kv{position:relative;z-index:3;width:100%;background-color:#111;overflow:hidden}
.home_kv_inner{position:relative;width:100%;max-width:100vw;height:100vh;height:100svh}
```

## ADAPTATION PLAN for Rod's hero
Big outlined name **"RODNEY FAN"** in a condensed display face, ghost outline by default, **ignites to amber** on load/scroll (the `data-hover` fill swap), with optional staggered per-letter `char-blinking` = a festival-lantern flicker. Mono kicker ("TECHNICAL ARTIST // GAME DESIGNER") above. Replaces the swirling `textPath` ring entirely. NO image-panel grid.
