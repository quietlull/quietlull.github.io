# Comments removed from `assets/js/components/cursor-coords.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `const handlers = new Set();`

```text
cursor-coords — ONE window pointermove + ONE rAF, broadcast to registered handlers, so the cursor
  effects (card band-reveal, icon recolor-circle, cursor-lantern) share a single event + frame
  instead of each running their own listener/loop (script-size + perf dedup).
  Each handler receives (clientX, clientY). Returns an unsubscribe fn.
```
