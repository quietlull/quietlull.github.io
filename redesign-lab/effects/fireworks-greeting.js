/* The GREETING firework stream - the reason the top of the page never got any.
   ROD, P75 (2026-08-22): "Top viewport still seems to not get autofireworks still not sure if you
   didnt rebuild or what."

   HE IS RIGHT, AND MY EARLIER VERIFICATION WAS WRONG. I patched WHERE auto bursts spawn
   (fireworks-reach.js) and then "verified" it by calling `createAutoFirework` 60 times by hand.
   That proved the patch worked. It did not prove the feature ran, and it does not:

       fireworkController.emitters.greeting.active  ->  false
       fireworkController.emitters.reward.active    ->  false      at scrollY 0

   Both streams are off, so nothing auto-fires anywhere, at any height. The spawn range was a real
   bug and a second-order one.

   THE FIRST-ORDER CAUSE IS THE SAME AS THE SPARKLER'S. The gate lives in
   `_javascript/modules/components/fireworks-toggle.js`, which Rollup bundles into
   `commons.min.js`, and no lab page loads that bundle. Nothing ever calls `setGreeting(true)`.
   Two separate "the effect is broken" reports, one cause: the module was never on the page.

   WHAT THIS FILE KEEPS AND WHAT IT DROPS, from the live module's own logic:
     KEPT   the scroll gate - the greeting belongs to the top of the page and ends on the first
            real scroll gesture. GATE_FRACTION 0.3 is theirs, unchanged.
     KEPT   the reduced-motion stop.
     KEPT   the poll for a controller that has not loaded yet (the bundle is deferred).
     DROPPED the entire REWARD stream and its topbar checkbox. Rod, P77: "lets scrap the idea of
            unlocks they get an achievement and thats fine." That retires D12 outright, so the
            reward emitter is not wired here at all rather than wired and left off - a control that
            exists but can never turn on is the dead-control problem again.

   D22 keeps `_javascript/` off limits, so this is a lab copy, not an edit.
*/

const GATE_FRACTION = 0.3;   // theirs, verbatim

function apply() {
  const controller = window.fireworkController;
  if (!controller) return;

  const atTop = window.scrollY < window.innerHeight * GATE_FRACTION;
  const stillness = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  controller.setGreeting(atTop && !stillness);
}

/* The scene bundle is deferred, so the controller may not exist on first call. Poll, but give up -
   a page with no scene (the post page) legitimately never gets one and must not leave a timer
   running forever. */
function whenReady(fn) {
  if (window.fireworkController) { fn(); return; }
  let tries = 0;
  const check = setInterval(() => {
    if (window.fireworkController) { fn(); clearInterval(check); }
    else if (++tries > 60) clearInterval(check);
  }, 100);
}

window.addEventListener('scroll', apply, { passive: true });
whenReady(apply);

/* Lab probe. The whole point of this file is that "it looks broken" and "it is not running" are
   different states and only one of them is visible by eye. `window.__greeting.report()` says which. */
window.__greeting = {
  gateFraction: GATE_FRACTION,
  report() {
    const c = window.fireworkController;
    if (!c) return 'no fireworkController on this page (expected on the post page)';
    return {
      greetingActive: c.emitters.greeting.active,
      rewardActive: c.emitters.reward.active,
      atTop: window.scrollY < window.innerHeight * GATE_FRACTION,
      scrollY: Math.round(window.scrollY),
      gateAt: Math.round(window.innerHeight * GATE_FRACTION),
      liveShells: c.fireWorkGroup.length,
      spawnRange: window.__fireworkReach ? window.__fireworkReach.range : 'reach patch not loaded',
    };
  },
};
