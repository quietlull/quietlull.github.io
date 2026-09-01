# SOURCE (True) — card mouse-tracked glow border, from john_r_muir

- **URL:** https://codepen.io/john_r_muir/pen/ExzJjqL (Rod picked + pasted)
- **Captured:** 2026-06-09 (Rod paste)
- **Used by:** `rework-hana.html` project-card **ignite-on-hover** (replaces the static drop-shadow ignite, IF we replace it — Rod: "if we have to replace it I quite like this").
- **Mechanic:** a 1px-padding gradient "border" wrapper whose `::before` is a `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), ...)` revealed (opacity 0->1) on hover; an inner `.card-content::before` adds a fainter inner radial. JS sets per-card `--mouse-x/--mouse-y` from `getBoundingClientRect` on `document.onmousemove`. This is the SAME cursor-tracked-glow family as our cursor-lantern spotlight.

## Original code (verbatim, as pasted)
```css
.card-glow-border {
  padding: 1px;
  border-radius: 10px;
  cursor: pointer;
  background: rgba(245,245,245, 0.2);
  position: relative;
  box-shadow: 0 0px 15px rgba(0,0,0, 0.7);
}
.card-glow-border::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background: radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.8), transparent);
  z-index: -1;
  top: 0;
  left: 0;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.5s;
}
.card-glow-border:hover::before { opacity: 1; }
.card-middle{
  background: rgb(20,20,20);
  padding: 5px;
  border-radius: 10px;
}
.card-content {
  height: 500px;
  width: 500px;
  border: 1px solid rgba(245,245,245, 0.2);
  border-radius: 5px;
  background-color: rgb(30,30,30);
  overflow: hidden;
  position: relative;
}
.card-content::before {
  position: absolute;
  content: '';
  height: 100%;
  width: 100%;
  background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(245, 245, 245, 0.07), transparent);
  opacity: 0;
  transition: opacity 0.5s;
}
.card-glow-border:hover .card-content::before { opacity: 1; }
```
```js
document.onmousemove = e => {
  for(const card of document.getElementsByClassName('card-glow-border')) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
}
```

## Remix plan in rework-hana.html
- recolor the white `rgba(255,255,255,.8)` border glow + inner `rgba(245,245,245,.07)` -> our `--glow`/amber.
- adapt sizing to our card (drop the fixed 500x500).
- DEDUP: this is the cursor-lantern `--mx/--my` family — reuse/share that JS rather than adding a second mousemove handler if possible.
- Tier: **Remixed**.
