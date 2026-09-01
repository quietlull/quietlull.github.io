/* hero behavior — the background switch is the GOO toggle (Rod 2026-08-11: slap moved to the bar).
   The goo toggle is pure CSS (:checked); JS only attaches the magnet. The actual scene/bloom
   action is page-level wiring (the bg pair lives where the Three.js canvas is). */
import { init as initMagnetic } from '../drift-magnet/drift-magnet.js';

export function init(root = document) {
  initMagnetic(root);
}
