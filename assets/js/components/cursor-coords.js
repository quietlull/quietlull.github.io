/* cursor-coords — ONE window pointermove + ONE rAF, broadcast to registered handlers, so the cursor
   effects (card band-reveal, icon recolor-circle, cursor-lantern) share a single event + frame
   instead of each running their own listener/loop (script-size + perf dedup).
   Each handler receives (clientX, clientY). Returns an unsubscribe fn. */
const handlers = new Set();
let x = -9999;
let y = -9999;
let pending = false;
let bound = false;

function flush() {
  pending = false;
  handlers.forEach((fn) => fn(x, y));
}

export function onCursor(fn) {
  handlers.add(fn);
  if (!bound) {
    bound = true;
    window.addEventListener(
      'pointermove',
      (event) => {
        x = event.clientX;
        y = event.clientY;
        if (!pending) {
          pending = true;
          requestAnimationFrame(flush);
        }
      },
      { passive: true }
    );
  }
  return () => handlers.delete(fn);
}
