# Comments removed from `assets/js/components/cursor-glow.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `import { onCursor } from './cursor-coords.js';`

```text
cursor-glow — a full-page warm vignette that follows the cursor: "cursor-as-lantern".
  Provenance: brittanychiang / merodev `.cursorglow` fixed radial at --cx/--cy (Remixed:
  recolored from merodev's purple to the festival gold via the palette token).
  Driven by the shared cursor-coords broadcaster (ONE pointermove + ONE rAF for every cursor
  effect) instead of a private listener. The binding is a module singleton so a bench remount
  refreshes the element ref without stacking another listener.
```

### Line 12, above `const SETTLE_BEFORE_CLICK_MS = 140;`

```text
How long the pointer must hold still inside the comments before the shield steps aside. A click
  is essentially always preceded by the pointer stopping, so this is the window that lets a real
  click through while a pass-through sweep keeps the lantern lit.
```

### Line 17, above `function setupCommentsShield() {`

```text
THE COMMENTS ARE OPAQUE TO THIS DOCUMENT'S EVENTS. MEASURED, twice, because I got it wrong
  twice by reasoning instead of testing.

  Test 1: a counter on `pointermove` recorded 2 events with the cursor over the page just above
  the giscus frame and 0 across three positions inside it, with --cx stuck at its last outside
  value. Test 2, after two failed fixes: probes on `pointerenter`, `pointerover`, `mouseenter`,
  `mouseover`, `pointerleave` and `mouseout` - on the iframe element AND on its wrapper - caught
  NOTHING as the cursor stepped across the boundary. Not one event.

  That is what killed the two earlier attempts. Fading on `mouseover` of the iframe and settling
  on `pointerenter` of the wrapper both assumed the parent is told when the cursor arrives. It is
  not. A cross-origin iframe is a separate browsing context: the hit target moves into ITS
  document and this one is never notified, not even at the boundary.

  So the only thing that can see the cursor over the comments is an element of OURS on top of the
  frame. That is the shield below. It is transparent and it does nothing except exist in this
  document so that pointermove has something to land on - which is enough for the lantern, since
  the shared broadcaster listens on the window and the event bubbles.

  THE TRADE, stated because it is the whole reason this is not just `inset: 0` and done: while
  the shield is live it is also what a click would land on. So it steps aside the moment the
  pointer holds still, which is what someone about to click does, and re-arms once the cursor is
  demonstrably outside the comments again. The re-arm signal is a pointermove whose target is
  outside the region - available precisely BECAUSE the frame is opaque, so any pointermove we can
  see is a pointermove that happened somewhere else.
```

### Line 82, on the line `return;`

```text
listener already added on a prior mount; element ref refreshed above
```

### Line 89, above `glowElement.style.setProperty('--cx', '${cx}px');`

```text
Client coords go straight in; the CSS transform shifts the box so its centre lands on them.
```
