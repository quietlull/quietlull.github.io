/* Lab sparkler bootstrap.
   ROD, P66 (2026-08-22): "the sparkler isnt being show across most of the new landing."

   IT WAS NEVER LOADED. The effect ships inside `commons.min.js`, and no lab page loads that
   bundle - `final-landing.html` pulls exactly two scripts, `hana-bloom.js` and
   `three-background-scene.min.js`. Measured on the rendered page before this file existed: zero
   elements matching [class*=spark]. So this is a missing script tag, not a broken effect, and the
   fix is one line of markup rather than a change to the effect.

   `commons.min.js` is deliberately NOT the thing loaded here. It carries the whole main-site
   runtime - theme, PWA, page transitions - which would fight a lab page and would also drag
   main-site behaviour into a lab-only surface that D22 says must stay separate. Copying the one
   module in is the smaller, honest move.

   The live code binds on/off to `#sparkler-toggle`, a top-bar control D20 removed. There is
   currently NO manual motion control anywhere on the final pages (REQUESTS #41 / #45), so this
   respects `prefers-reduced-motion` (the module returns early on its own) and the persisted
   `sparkler-disabled` key, and otherwise just runs.
*/
import { initMouseTrail } from './mouse-trail.js';

initMouseTrail();

/* Lab-only probe so the effect can be verified without eyeballing it. `window.__sparkler` says
   whether the canvas actually made it onto the page - which is the exact thing that was false
   before, and the thing worth re-checking after any page edit. */
window.__sparkler = {
  loaded: true,
  get canvas() { return document.querySelector('canvas.mouse-trail, canvas[data-sparkler]'); },
  get present() {
    return [...document.querySelectorAll('canvas')].some(
      (c) => c.style.pointerEvents === 'none' && c.style.position === 'fixed',
    );
  },
};
