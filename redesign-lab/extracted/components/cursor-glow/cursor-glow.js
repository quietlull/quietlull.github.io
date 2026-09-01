/* cursor-glow — a full-page warm vignette that follows the cursor: "cursor-as-lantern".
   Provenance: brittanychiang / merodev `.cursorglow` fixed radial at --cx/--cy (Remixed:
   recolored from merodev's purple to the festival gold via the palette token).
   Driven by the shared cursor-coords broadcaster (ONE pointermove + ONE rAF for every cursor
   effect) instead of a private listener. The binding is a module singleton so a bench remount
   refreshes the element ref without stacking another listener. */
import { onCursor } from '../cursor-coords/cursor-coords.js';

let glowElement = null;
let bound = false;

export function init(root = document) {
  glowElement = root.querySelector('.cursorglow');
  if (!glowElement) {
    return;
  }
  if (bound) {
    return; // listener already added on a prior mount; element ref refreshed above
  }
  bound = true;
  onCursor((cx, cy) => {
    if (!glowElement) {
      return;
    }
    // .cursorglow is position:fixed inset:0, so element-local coords == client coords.
    glowElement.style.setProperty('--cx', `${cx}px`);
    glowElement.style.setProperty('--cy', `${cy}px`);
  });
}
