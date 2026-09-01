# SOURCE: accessible focus-ring (for T4-A / report B2) — researched 2026-06-12

Rod asked for real references before building the global focus indicator. Researched the canonical
accessible technique; three theme-fitting options below, all sharing the accessible base.

## The accessible base (non-negotiable, from the sources)
- Use `:focus-visible` (keyboard focus only; supported in all major browsers since 2022).
- **`outline: 2px solid transparent`** (NOT `outline: none`) so the indicator still appears in
  Windows High Contrast Mode, where box-shadow is stripped. (dev.to hybrid_alex comments;
  Bootstrap 5.3 focus-ring helper.)
- Layer the visible ring with **`box-shadow`** — it follows `border-radius`, causes no layout
  shift, and is animatable. (dev.to hybrid_alex "Better CSS outlines with box-shadows".)
- Two-tone (gap + color) reads on both light and dark grounds. (Bootstrap 5.3; WAI best practice.)
Sources:
- https://dev.to/hybrid_alex/better-css-outlines-with-box-shadows-1k7j (box-shadow outline + HCM caveat)
- https://getbootstrap.com/docs/5.3/helpers/focus-ring/ (two-tone focus-ring helper)
- https://darekkay.com/blog/accessible-focus-indicator/ (accessible indicator best practice; 403 to fetch, cited from search)

## Option A — Crisp two-tone ring (conventional, max legibility)
```css
:focus-visible {
  outline: 2px solid transparent;          /* HCM */
  box-shadow: 0 0 0 2px var(--color-night), /* gap */
              0 0 0 4px var(--color-gold);  /* ring */
}
```
Standard, sharp, unmistakable. Least "festival," most bulletproof. (Bootstrap pattern.)

## Option B — Lantern-glow ring (festival fit) [RECOMMENDED]
```css
:focus-visible {
  outline: 2px solid transparent;          /* HCM */
  box-shadow: 0 0 0 2px var(--color-gold),                       /* tight ring */
              0 0 12px 2px color-mix(in srgb, var(--color-glow) 45%, transparent); /* soft bloom */
}
```
A crisp amber ring + a soft ember bloom — echoes the site's own ignite/glow language while
staying accessible. Amber-on-night is ~9:1, far past the 3:1 indicator bar (Rule 66/76).
Provenance: box-shadow technique (dev.to) + the site's existing hana glow-ignite recipe.

## Option C — Animated ignite ring (most on-brand, more code)
Same as B, but the ring/bloom fades+expands in on focus, mirroring the existing "ignite" hover
(phojanecki). Honor `prefers-reduced-motion` (no animation; show the static ring). More moving
parts; only if Rod wants the focus to feel like the hovers.

## Notes
- Apply globally in `extracted/styles/generic.css` (so every component inherits) — this is the
  B2 fix; supersedes the scoped slap-toggle ring already added in B1.
- All three keep `outline-offset` ~2px so the ring sits just outside the element.
