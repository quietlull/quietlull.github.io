# SOURCE (True) — terminal blink caret, from 109ichiki.com

- **URL:** https://109ichiki.com (captured from the live page via web agent)
- **Captured:** 2026-06-09 (Rod, via web agent)
- **Used by:** `rework-merodev-yanne.html` `.term` search caret. Also a 1:1 candidate for the top-bar "WORKS" heading caret.
- **Mechanic:** caret is NOT a separate element — it's a `::after` pseudo on the `<h1>` (the "Works" heading). `content:"_"` + a 1s `step-start` infinite keyframe toggling opacity 1->0->1 (hard snap blink, no fade). Pure CSS; the heading's fade-in is separate (Framer Motion JS) and independent of the blink.
- **Caveat:** original class names are hashed CSS-Modules output (`_main_1ppyp_6`, `_cursor_1ppyp_1`) — suffixes vary per build. We rename to clean local names when adapting.

## Original CSS (verbatim)
```css
._root_1ppyp_1 {
  position: relative;
  display: block;
}

._main_1ppyp_6 {
  display: flex;
  font-family: var(--font-ibm), sans-serif;
  font-size: var(--font-size-h2);
  text-transform: uppercase;
  opacity: 0; /* starts hidden, revealed via JS */
}

._main_1ppyp_6::after {
  display: block;
  content: "_";
  animation: 1s step-start 0s infinite normal none running _cursor_1ppyp_1;
}

@keyframes _cursor_1ppyp_1 {
  0%   { opacity: 1; }
  50%  { opacity: 0; }
  100% { opacity: 1; }
}
```
