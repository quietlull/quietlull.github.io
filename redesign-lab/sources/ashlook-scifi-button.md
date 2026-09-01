# SOURCE (True) — Sci-Fi Button, by Ashlook

- **URL:** https://codepen.io/Ashlook/pen/YzQQwdo
- **Captured:** 2026-06-09 (pasted verbatim by Rod)
- **Used by:** `rework-merodev-yanne.html` buttons (`.btn`). Adapted = Remixed (see rework-merodev-yanne-ledger.md).
- **Mechanic:** 4 corner `<div>`s (top/left/bottom/right combos) tile a FULL border at rest; on `:hover` each shrinks to a small corner bracket. `::before` radial flash on `:active`.

## Original HTML (verbatim)
```html
<button class="button primary" type="button">
  <div class="top right"></div>
  <div class="top left"></div>
  <div class="bottom right"></div>
  <div class="bottom left"></div>
  primary
</button>

<button class="button accent" type="button">
  <div class="top right"></div>
  <div class="top left"></div>
  <div class="bottom right"></div>
  <div class="bottom left"></div>
  accent
</button>

<button class="button warn" type="button">
  <div class="top right"></div>
  <div class="top left"></div>
  <div class="bottom right"></div>
  <div class="bottom left"></div>
  warning
</button>
```

## Original SCSS (verbatim)
```scss
$primary: 71 29% 59%;
$accent: 171 100% 30%;
$warn: 18 65% 45%;
$padding-x: 0.75em;
$padding-y: 0.5em;

body {
  --color: #{$primary};
  background: hsl(0 0% 10%);
  position: absolute;
  inset: 0;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.primary {
  --color: #{$primary}
}

.accent {
  --color: #{$accent}
}

.warn {
  --color: #{$warn}
}

.button {
  display: inline-block;
  background: transparent;
  color: #{hsl(var(--color))};
  border: 0px solid hsl(var(--color));
  font-variant: small-caps;
  letter-spacing: 0.10em;
  padding: $padding-y $padding-x;
  position: relative;
  cursor: pointer;
  margin: 0 10px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);

  div {
    position: absolute;
    width: 50%;
    height: 50%;
    box-sizing: border-box;
    transition:
      width 200ms ease-in,
      height 200ms ease-in;

    &.top { border-top: 1px solid; top: 0; }
    &.left { border-left: 1px solid; left: 0; }
    &.bottom { border-bottom: 1px solid; bottom: 0; }
    &.right { border-right: 1px solid; right: 0; }
  }

  &:hover div {
    width: $padding-x;
    height: $padding-y;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, hsl(var(--color) / 0.2) 0%, hsl(var(--color) / 0.4) 50%, hsl(var(--color) / 0.6) 100%);
    opacity: 0;
    transition: opacity 150ms ease-out;
  }

  &:active::before { opacity: 0.3; }
}
```
