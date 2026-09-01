/* top-bar behavior — favicon + nav links + toggles are all magnetic via the drift-magnet BASE.
   The bar toggles are SLAP toggles again (Rod 2026-08-11: slap in the bar, goo moved to the hero);
   slap-toggle.init wires the flap behavior AND runs the magnet init. */
import { init as initSlapToggle } from '../slap-toggle/slap-toggle.js';

export function init(root = document) {
  initSlapToggle(root);
}
