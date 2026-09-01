/* favicon behavior — magnet only (the spin is CSS hover). Uses the drift-magnet BASE so the
   data-magnet-clamp ("can't escape its box") is honored. */
import { init as initMagnetic } from '../drift-magnet/drift-magnet.js';

export function init(root = document) {
  initMagnetic(root);
}
