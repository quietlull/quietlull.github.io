/* Fireworks: make auto bursts actually reach the top of the screen.
   ROD, P65 (2026-08-22): "fireworks still dont fire near the top of landing and about me pages."
   He has now raised this more than once, so it is worth writing down what it actually is.

   IT IS NOT THE UNPROJECTION TRAP. docs/TRAPS.md carries an entry about screen-to-world needing
   the camera's real matrices instead of frustum trigonometry, and that was the cause of an older
   version of this symptom. That fix is in and holding - `screenToWorldAtDepth` unprojects
   properly (_javascript/firework-controller.js:119).

   THE ACTUAL CAUSE is four lines above the spawn call, in `createAutoFirework`:

       const randomY = (Math.random() * 0.5 + 0.3);   // Upper/middle portion of screen
       this.createFireworkFromClick(..., (1 - randomY) * window.innerHeight, source);

   `randomY` runs 0.3 to 0.8, and the screen coordinate is `1 - randomY`, so bursts land between
   **20% and 70% down the viewport**. The top fifth is excluded by construction, every time. The
   comment says "upper/middle portion" and that is exactly what it does - the range is just wrong
   about where "upper" starts. No amount of scene or camera work would have found this, because
   nothing is broken; the number is simply not what he wants.

   WHY THIS IS A LAB PATCH AND NOT AN EDIT TO THE CONTROLLER: D22 puts `_javascript/` off limits
   until the port. This overrides the method on the live instance so the change is visible and
   judgeable now, and the one-line change ports later. The original is untouched.

   THE NEW RANGE, and where the numbers come from rather than a guess:
     top edge      0.06  - a burst dead on the edge reads as clipped, so it stops just short
     bottom edge   0.78  - unchanged from the old range's far end, so nothing that worked stops
                           working; only the missing band above it is added
   Expressed the same way the original is, so a diff at port time is one line.
*/

const TOP = 0.06;
const BOTTOM = 0.78;

function patch(controller) {
  if (!controller || controller.__reachPatched) return false;

  controller.createAutoFirework = function (source) {
    if (this.fireWorkGroup.length >= this.maxFireworks) return;

    const randomX = (Math.random() * 2 - 1) * 0.8;        // unchanged - 80% of the width
    const screenY = (TOP + Math.random() * (BOTTOM - TOP)) * window.innerHeight;

    lastSpawns.push(screenY / window.innerHeight);
    if (lastSpawns.length > 200) lastSpawns.shift();

    this.createFireworkFromClick(
      (randomX * 0.5 + 0.5) * window.innerWidth,
      screenY,
      source,
    );
  };

  controller.__reachPatched = true;
  return true;
}

/* Kept so the claim can be re-measured instead of re-argued: every auto spawn records the
   fraction of the viewport height it burst at. `window.__fireworkReach.report()` returns the
   min/max actually observed, which is the only honest way to say whether the top is covered. */
const lastSpawns = [];

window.__fireworkReach = {
  range: [TOP, BOTTOM],
  applied: false,
  samples: lastSpawns,
  report() {
    if (!lastSpawns.length) return 'no auto spawns observed yet';
    const min = Math.min(...lastSpawns);
    const max = Math.max(...lastSpawns);
    return {
      spawns: lastSpawns.length,
      highestBurst: (min * 100).toFixed(1) + '% down the viewport',
      lowestBurst: (max * 100).toFixed(1) + '% down the viewport',
      reachesTopFifth: min < 0.2,
    };
  },
};

/* The controller is created by the scene bundle, which is `defer`red, so it may not exist yet.
   Poll briefly rather than racing it - and give up rather than polling forever, because a page
   with no scene (the post pages, which run the hana bloom instead) legitimately has no controller
   and should not leave a timer running. */
let tries = 0;
const timer = setInterval(() => {
  if (patch(window.fireworkController)) {
    window.__fireworkReach.applied = true;
    clearInterval(timer);
  } else if (++tries > 40) {
    clearInterval(timer);
  }
}, 100);
