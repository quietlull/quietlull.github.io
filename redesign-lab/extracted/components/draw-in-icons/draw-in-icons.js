/* draw-in-icons behavior — magnetism from the drift-magnet BASE. The icons draw themselves in via
   CSS (stroke-dashoffset), which needs no JS.
   The cursor-tracked RECOLOR CIRCLE was REMOVED 2026-08-13 (Rod): he never wanted a hover-reveal
   here, and it shipped a visible artifact. It cloned each icon and revealed the gold copy through
   a circle at the cursor, but the clone was built at init time, AFTER the base had already begun
   its draw-in, so the two copies' stroke-dashoffset ran permanently out of phase and the icon read
   as doubled. The cursor reveal now belongs to the project cards alone. */
import { init as initMagnetic } from '../drift-magnet/drift-magnet.js';

export function init(root = document) {
  initMagnetic(root);
}
