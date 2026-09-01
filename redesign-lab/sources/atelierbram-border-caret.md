# SOURCE (True) — border blink caret (typewriter), from atelierbram

- **URL:** https://codepen.io/atelierbram/pen/abrbyQ (Rod opened + pasted; CodePen is un-fetchable via agent — Cloudflare)
- **Captured:** 2026-06-09 (Rod paste)
- **Used by:** `rework-hana.html` `.search` input caret (replaces the fake floating `.caret` span).
- **Mechanic:** the caret is NOT a separate element — it's a BORDER on the text element (`border-right:1px solid`), and a keyframe blinks it by toggling `border-color` transparent<->color. Because a border auto-matches the element's text/line height and sits flush at the edge, the alignment problems of a hand-sized floating span vanish by construction. (The `typing` width-animation is a separate typewriter-reveal effect; we do NOT use it — we have a real typeable input.)

## Original CSS (verbatim, as pasted)
```css
@keyframes typing {
  from { width: 0; }
  to { width: 455px; }
}
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: black }
}
h3 {
  position: relative;
  font-size: 28px;
  font-family: "Consolas", "Menlo", "Monaco", "Courier New", monospace;
  /* width:455px; */
  padding-left: 1rem;
  font-style: italic;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  border-right: 1px solid #000;
  box-sizing: border-box;
  /* -webkit-animation-delay: 15s;
  -webkit-animation: typing 10s steps(25, end), blink-caret 1s step-end infinite;
  -moz-animation: typing 10s steps(25, end), blink-caret 1s step-end infinite;
  animation: typing 10s steps(25, end) backwards .5s, blink-caret 1s step-end backwards 5s; */
  animation: typing 10s steps(25, end) 5s, blink-caret 1s infinite 5s; 
}
/* general */
html {
  font-size: 16px;
}
body {
  font: 100%/1.5 sans-serif;
  background-color: #fff;
}
```

## Remix applied in rework-hana.html (what changed)
- `border-right` -> `border-left` (caret sits at the START of the input, right after the `//` prefix).
- recolored `#000` -> `var(--gold)`.
- dropped the `typing` width animation entirely (real input, not a typewriter reveal).
- keyframe toggles `border-left-color` specifically (input has only a left border).
- applied to a real `<input>`; decorative caret hidden on `:focus-within`/`.has-text` so the native gold `caret-color` takes over while typing.
- Tier: **Remixed** (atelierbram blink-caret border technique, changed as above).
