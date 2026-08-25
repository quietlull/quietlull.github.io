/* The shared chrome's JS. One module, loaded once by `_layouts/default.html`.

   A COMPONENT IS ITS MARKUP AND ITS CSS AND ITS JS, and this file exists because that keeps being
   learned the hard way. `final-projects.html` once shipped the redesign markup without this block
   and Rod called the page "clearly broken": nothing magnetic initialised, so the favicon and the
   nav links sat dead, and the wordmark rendered in a fallback face because nothing boiled it.
   Shipping `_includes/top-bar.html` without this import list would reproduce that exactly.

   WHY A PLAIN <script type="module"> AND NOT A ROLLUP BUNDLE. The site's own JS is bundled into
   `assets/js/dist/*.min.js`, and adding these there is the tidier end state. It is not what merge
   night does: `assets/js/dist` is gitignored build output, a rebuild is a 1.4 MB regeneration of
   files nobody can review, and it was happening alongside a second agent's CSS port. Native
   modules need no build step, so the port can be read, judged and reverted as source.
   At the next real build pass these fold into `commons.js` and this file goes away. */

import { init as initTopBar } from './components/top-bar.js';
import { init as initMagnetic } from './components/drift-magnet.js';
import { initLineBoil } from './components/line-boil.js';
import { init as initCursorGlow } from './components/cursor-glow.js';

/* Both, deliberately. `initTopBar` reaches `initMagnetic` through the slap-toggle chain today, but
   drift-magnet is a PAGE-level engine - every `.js-magnetic` and `[data-drift]` element on any
   ported component rides it, not just the bar's. Calling it here says so, and it is idempotent:
   the engine keeps a set of the elements it has already registered. */
initTopBar(document);
initMagnetic(document);

/* The bar's wordmark IS the site mark at a smaller size, so it boils too
   (Rod 2026-08-23: "add the line boil text to the top bar as well").
   `initLineBoil` waits on `document.fonts` before it measures - see line-boil.js. Do not "optimise"
   that away: it pins each glyph's advance in px from a real measurement, and measuring before the
   faces arrive pins the FALLBACK's metrics, permanently, with no error anywhere. */
document.querySelectorAll('.top-bar__logo').forEach((mark) => initLineBoil(mark));

/* The glow follows the cursor. It needs the .cursorglow div in default.html - the CSS shipped
   without it, so Rod's tuned values were styling an element that did not exist. */
initCursorGlow(document);
