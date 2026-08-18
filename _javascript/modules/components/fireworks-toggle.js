/**
 * Owns both automatic firework streams.
 *   GREETING — the calm welcome at the top of the page. Always on, no switch: it stops once you
 *              scroll past the top and resumes when you come back.
 *   REWARD   — the auto-fireworks stream unlocked by Pyrotechnician, driven by the topbar switch
 *              (hidden by `.reward-locked` until earned) and persisted in localStorage.
 * Both can be live at once, which is the point: the reward adds to the greeting.
 * Relies on window.fireworkController being exposed by three-background.js.
 */

import { STORAGE_KEYS } from '../config/storage-keys';
const STORAGE_KEY = STORAGE_KEYS.FIREWORKS;
const $toggle = document.getElementById('fireworks-toggle');

// The greeting belongs to the top of the page, so it ends on the first real scroll gesture.
const GATE_FRACTION = 0.3;

let rewardWanted = false;

export function fireworksToggle() {
  const checkbox = $toggle && $toggle.querySelector('input[type="checkbox"]');

  if (checkbox) {
    rewardWanted = localStorage.getItem(STORAGE_KEY) === 'true';
    checkbox.checked = rewardWanted;

    checkbox.addEventListener('change', () => {
      rewardWanted = checkbox.checked;
      localStorage.setItem(STORAGE_KEY, String(rewardWanted));
      apply();
    });
  }

  // The greeting is scroll-gated, so it runs even on pages where the toggle is still locked.
  window.addEventListener('scroll', apply, { passive: true });
  whenControllerReady(apply);
}

function apply() {
  const controller = window.fireworkController;
  if (!controller) return;

  const atTop = window.scrollY < window.innerHeight * GATE_FRACTION;
  const stillness = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  controller.setGreeting(atTop && !stillness);
  controller.setAutoFireworks(rewardWanted && !stillness);
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
