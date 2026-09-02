/**
 * Owns the automatic firework stream.
 *   GREETING — the calm welcome at the top of the page. Always on, no switch: it stops once you
 *              scroll past the top and resumes when you come back.
 *
 * There used to be a second REWARD stream, switched on by the Pyrotechnician achievement and
 * driven by a `#fireworks-toggle` switch in the old top bar. Rod scrapped every achievement
 * reward (D28), and the new bar never rendered the switch, so the stream, the switch and the
 * saved on/off setting were all deleted on 2026-08-31. The achievement itself still unlocks.
 *
 * Relies on window.fireworkController being exposed by three-background.js.
 *
 * NAME: the file and its export are still called "toggle" because there is no toggle left to
 * name them after. Renaming them is a follow-up (it touches _includes/chrome-scripts.html).
 */

// The greeting belongs to the top of the page, so it ends on the first real scroll gesture.
const GATE_FRACTION = 0.3;

// One MediaQueryList for the page. apply() runs on every scroll event, and calling matchMedia
// there allocated a fresh query object per scroll tick.
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

export function fireworksToggle() {
  window.addEventListener('scroll', apply, { passive: true });
  whenControllerReady(apply);
}

function apply() {
  const controller = window.fireworkController;
  if (!controller) return;

  const atTop = window.scrollY < window.innerHeight * GATE_FRACTION;
  const stillness = REDUCED_MOTION.matches;

  controller.setGreeting(atTop && !stillness);
}

// three-background.js loads async, so the controller may not exist yet on first call.
function whenControllerReady(fn) {
  if (window.fireworkController) {
    fn();
    return;
  }

  const check = setInterval(() => {
    if (!window.fireworkController) return;
    fn();
    clearInterval(check);
  }, 500);

  // Give up after 10 seconds
  setTimeout(() => clearInterval(check), 10000);
}
