# hana.b-rave.tokyo/tour/borntobloom/ — reconstruction spec

**Recreated in:** `redesign-lab/ref-hana.html`
**Rod's focus:** the bloom/glow animation + elements, and the merch-section cards.
**Capture note:** on-page screenshots render white (fixed bg + transform scroll-reveal confuses the headless capture mid-scroll). Authoritative data is pulled from the live CSS / computed styles, not pixels.

---

## Palette translation (hana red -> our locked twilight)

| hana value | role | our value |
|---|---|---|
| `#FF1A00` (hot orange-red) | every glow | `#FF6A00` `var(--glow)` (saturated orange halo) |
| `#C40018` (crimson) | titles | `#F59E0B` `var(--gold-deep)` (amber warm-fill) |
| `rgba(25,20,16,.7)` (warm charcoal) | card panel | `rgba(12,16,38,.72)` (night panel) |
| `togebaralight` | title face | Playfair Display (placeholder; type still open) |

Everything else (geometry, blur radii, alphas, timings, curves) is reproduced 1:1.

---

## 1. Global "breathing" background glow
NOT a box-shadow. Two stacked full-viewport background images that cross-fade.
- `.page-background` container, `position:fixed; inset:0`, behind all content.
- Two `<picture>` layers, both `position:absolute; inset:0; width/height:100%`.
  - Layer 1: `background-1.webp`, static, `opacity:1`.
  - Layer 2: `background-2.webp`, animated on top.
- Keyframe on layer 2:
```css
@keyframes background { 0%{opacity:0} 50%{opacity:1} 100%{opacity:0} }
animation: background 8s ease-in-out infinite;
```
8s loop, ease-in-out — lingers at the bright peak, dims gradually = the "breathe/throb." Reconstruct with two near-identical atmospheric layers, animate top one's opacity.

Scale "throb" keyframes used elsewhere (icons/accents) — the site's motion language:
```css
@keyframes scale_pc { 0%,45%{transform:scale(1)} 50%{transform:scale(1.125)} 55%,100%{transform:scale(1)} }
@keyframes scale_sd { 0%,45%{transform:scale(1)} 50%{transform:scale(1.25)}  55%,100%{transform:scale(1)} }
```
Hold at 1 most of the cycle, quick pop at midpoint = snappy heartbeat. `_pc` desktop, `_sd` larger/mobile.

## 2. Glow color system
One signature color `#FF1A00` at varying alphas. Two build methods:
1. `box-shadow` 0 spread + large blur — resting/ambient glow on cards + image frames.
2. `filter: drop-shadow(...)` — interactive hover/focus glow (follows alpha shape, stacks cleanly). Hover animates ONLY the drop-shadow color alpha `0 -> 0.4..0.8`; blur/offset never change.
Shared interactive transition: `transition: filter 0.125s cubic-bezier(0.215,0.61,0.355,1);` (fast 125ms ease-out — snaps on).

## 3. Responsive unit system
All sizes in design units vs a 3840px design width: `--base:3840`, `--pv ≈ vw/100`. Formula `calc(N * ((var(--pv)*100)/var(--base)))` = `N * vw/3840`. At 1920px, design units halve. Values below are resolved at ~1920px (source = double). To reproduce responsively: divide each design number by 3840, multiply by viewport width.

## 4. Merchandise section structure
```
section.main-section--merchandise > .section-container > .container-content
  > .content-goods           (position:relative; min-height ~3150px)
    > .goods-items           (position:absolute; left:50%; top:0)  <- 0x0 centered anchor
      > .items-item x15      (each absolutely positioned)
```
Absolute layout, NOT grid/flex. `.goods-items` is a zero-size anchor at horizontal center. Cards placed by `nth-of-type` with explicit left/top from center. 3-column:
- Column left offsets from center: -800, -250, +300px (design -1600/-500/+600) = a centered 3-col band 1600px wide.
- Row step: +650px (design +1300). 15 cards -> 5 rows.
- Card 500x600 (design 1000x1200); column pitch 550 -> 50px horizontal gap; row pitch 650 -> 50px vertical gap.
(Our recreation collapses this to a centered CSS grid `repeat(3,1fr)`, gap 50px, aspect 5/6 — visually identical, responsive.)

## 5. The card (`.items-item`)
Resting/ambient:
```css
.items-item{ position:absolute; width:500px; height:600px;
  border:1px solid rgba(255,26,0,.5);
  background:rgba(25,20,16,.7);
  box-shadow:0 0 50px rgba(255,26,0,.5), 0 0 100px rgba(255,26,0,.25); }  /* two-stop: tight+wide */
```
Inner link (2-row grid + interactive glow off by default):
```css
.items-item a{ display:grid; grid-template-rows:447px 60px; padding:25px; width:500px; height:600px;
  filter:drop-shadow(0 0 12px rgba(255,26,0,0)) drop-shadow(0 0 12px rgba(255,26,0,0));
  transition:filter .125s cubic-bezier(.215,.61,.355,1); }
.items-item a:hover{ filter:drop-shadow(0 0 12px rgba(255,26,0,.4)) drop-shadow(0 0 12px rgba(255,26,0,.4)); }
```
DOM: `a > .item-image (447x447, two stacked <picture>) + .item-meta (447x60 title-as-image)`.
Image frame inner glow (half strength of card):
```css
.item-image{ position:relative; overflow:hidden;
  box-shadow:0 0 25px rgba(255,26,0,.25), 0 0 50px rgba(255,26,0,.125); }
.item-image picture:not(:nth-of-type(1)){ position:absolute; inset:0; width:100%; opacity:0; }  /* alt image */
```
Two product images stacked; 2nd at opacity 0 cross-fades in (JS-driven; pure-CSS `:hover` swap is acceptable).
Title:
```css
.item-title{ text-align:center; font:300 24px/1.5 togebaralight,sans-serif; letter-spacing:-.06em; color:#C40018; }
```

## 6. Card scroll-reveal ("construction" entrance)
Hidden state:
```css
opacity:0; scale:0.5 0.75;   /* non-uniform: 50% wide, 75% tall */
transition:opacity 2s cubic-bezier(0,.5,0,1), scale 2s cubic-bezier(0,.5,0,1);
```
On reveal -> `opacity:1; scale:1`. 2s slow, front-loaded curve (fast early, glides to stop) = cards bloom open then settle. Non-uniform start = "unfurling" more horizontally than vertically. Triggered per-card by an in-view observer.

## Reconstruction checklist
Fixed two-layer cross-fading bg (opacity 0->1->0, 8s ease-in-out) for ambient breathing; single accent at varying alphas; ambient glows via stacked two-stop `box-shadow` (0 spread, big blur); interactive glows via `drop-shadow` animating alpha 0->0.4 over .125s; cards 500x600 dark-translucent panels w/ 1px border, centered 3-col (offsets -800/-250/+300, row step 650); 2s `cubic-bezier(0,.5,0,1)` opacity+scale entrance from `opacity:0; scale:.5 .75`.
