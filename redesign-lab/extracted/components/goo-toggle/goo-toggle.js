/* goo-toggle behavior — the toggle itself is pure CSS (:checked); JS only attaches the
   magnetic cursor-stick (Rod's batch-1 feedback: "the gooey switches should be magnetic too"). */
import { init as initMagnetic } from '../drift-magnet/drift-magnet.js';

export function init(root = document) {
  initMagnetic(root);
}
