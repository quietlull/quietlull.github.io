/**
 * Toggle auto-fireworks on/off via a switch checkbox.
 * Persists preference in localStorage.
 * Relies on window.fireworkController being exposed by three-background.js.
 */

import { STORAGE_KEYS } from '../config/storage-keys';
const STORAGE_KEY = STORAGE_KEYS.FIREWORKS;
const $toggle = document.getElementById('fireworks-toggle');

export function fireworksToggle() {
  if (!$toggle) return;

  const checkbox = $toggle.querySelector('input[type="checkbox"]');
  if (!checkbox) return;

  const saved = localStorage.getItem(STORAGE_KEY);

  // Restore saved preference
  if (saved === 'true') {
    checkbox.checked = true;
    applyFireworks(true);
  } else {
    checkbox.checked = false;
    applyFireworks(false);
  }

  checkbox.addEventListener('change', () => {
    const enabled = checkbox.checked;
    localStorage.setItem(STORAGE_KEY, String(enabled));
    applyFireworks(enabled);
  });
}

function applyFireworks(enabled) {
  // fireworkController may not be available immediately (three-background loads async)
  if (window.fireworkController) {
    window.fireworkController.setAutoFireworks(enabled);
  } else {
    // Retry once the Three.js script has loaded
    const check = setInterval(() => {
      if (window.fireworkController) {
        window.fireworkController.setAutoFireworks(enabled);
        clearInterval(check);
      }
    }, 500);
    // Give up after 10 seconds
    setTimeout(() => clearInterval(check), 10000);
  }
}
