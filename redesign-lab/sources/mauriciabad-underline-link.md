# SOURCE (True) — inline link underline-draw (scaleX), from MauriciAbad

- **URL:** https://codepen.io/MauriciAbad/pen/QJmwOY (Rod picked + pasted)
- **Captured:** 2026-06-09 (Rod paste)
- **Used by:** `rework-hana.html` `.txtlink` inline link.
- **Mechanic:** `::after` full-width underline, `transform:scaleX(0)` at rest with `transform-origin:bottom right`; on hover `scaleX(1)` with `transform-origin:bottom left` -> draws in left-to-right, retracts right-to-left. Uses `background:currentcolor` so the underline matches text color automatically.

## Original CSS (verbatim, as pasted)
```css
a {
  display: inline-block;
  position: relative;
  color: #0087ca;
  text-decoration: none;
}
a::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  border-radius: 5px;
  height: 0.05em;
  bottom: 0;
  left: 0;
  background: currentcolor;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
a:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
body{
  font-family: 'Nunito', 'Quicksand', 'Roboto', -apple-system, system, system-ui, sans-serif;
  background: #eee;
  font-size: 3em;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
```

## Remix plan in rework-hana.html
- apply to `.txtlink` (replace the current `width:0 -> 100%` underline).
- `background:currentcolor` keeps it on the gold link color automatically; optional faint glow on hover per de-glow principle.
- Tier: **Remixed** (recolored via currentcolor, applied to `.txtlink`).
