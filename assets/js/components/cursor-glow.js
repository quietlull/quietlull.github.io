/* cursor-glow — a full-page warm vignette that follows the cursor: "cursor-as-lantern".
   Provenance: brittanychiang / merodev `.cursorglow` fixed radial at --cx/--cy (Remixed:
   recolored from merodev's purple to the festival gold via the palette token).
   Driven by the shared cursor-coords broadcaster (ONE pointermove + ONE rAF for every cursor
   effect) instead of a private listener. The binding is a module singleton so a bench remount
   refreshes the element ref without stacking another listener. */
import { onCursor } from './cursor-coords.js';

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

  /* A cross-origin iframe swallows pointer events, so `pointermove` stops arriving the moment the
     cursor crosses into one and the lantern parks at its edge until the cursor comes back out.
     `mouseover` DOES still fire here, because the <iframe> element itself lives in this document,
     so one delegated listener covers every frame on the page - present or added later, which
     matters because giscus injects its own.
     Delegated on purpose: the alternative is wiring each iframe as it appears, which needs a
     MutationObserver and a teardown for something two lines do. */
  document.addEventListener('mouseover', (event) => {
    if (glowElement) {
      glowElement.classList.toggle('is-hidden', event.target.tagName === 'IFRAME');
    }
  });

  onCursor((cx, cy) => {
    if (!glowElement) {
      return;
    }
    // Client coords go straight in; the CSS transform shifts the box so its centre lands on them.
    glowElement.style.setProperty('--cx', `${cx}px`);
    glowElement.style.setProperty('--cy', `${cy}px`);
  });
}
