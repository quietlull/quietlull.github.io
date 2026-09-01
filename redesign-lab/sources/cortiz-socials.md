# SOURCE (True, partial) — cortiz.dev (social buttons)

- **URL:** https://www.cortiz.dev (Next.js + heavy GSAP)
- **Captured:** 2026-06-11 via Chrome extension (computed styles). Raw CSS saved `sources/cortiz-1..3.css` (107KB) but `.mediaLink` is NOT in them — it's styled-jsx/global + the HOVER is GSAP-driven (no CSS hover rule found).
- **Rod wants:** the social buttons.

## Structure (verbatim computed — the resting state)
```css
.mediaLink{
  display:flex; align-items:center; justify-content:center;
  width:50px; height:50px;
  border:2px solid rgba(255,255,255,.71);   /* -> recolor: rgba(amber/.7) */
  border-radius:50%;
  background:transparent;
}
```
Circular outlined icon buttons, 50px, 2px ring, transparent, icon centered. Footer/contact social row.

## HOVER = GSAP (not lifted)
The hover effect Rod likes is JS/GSAP (magnetic-follow and/or fill), not CSS — so it can't be copied as a static rule. **Decision needed:** recreate the feel ourselves (magnetic hover or ring-fill-on-hover) — OR, since this is just a circle + icon, pair it with a CSS hover we already own (e.g. the cursor-lantern glow reveal, or a simple ring fill). The circular outlined SHAPE is the liftable part; the motion we'd build.
