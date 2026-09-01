/* button-kit behavior — magnetic cursor-stick rides the drift-magnet BASE (one source of truth). */
import { init as initMagnetic } from '../drift-magnet/drift-magnet.js';

export function init(root = document) {
  initMagnetic(root);
}
