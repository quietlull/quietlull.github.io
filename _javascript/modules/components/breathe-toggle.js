/**
 * Toggle breathing animations on/off via html.no-breathe class.
 * Uses a switch checkbox. Persists preference in localStorage.
 * Also handles prefers-reduced-motion: if user explicitly enables breathing,
 * adds .breathe-override to bypass the reduced-motion media query.
 */

import { STORAGE_KEYS } from '../config/storage-keys';
const STORAGE_KEY = STORAGE_KEYS.BREATHING;
const $toggle = document.getElementById('breathe-toggle');

export function breatheToggle() {
  if (!$toggle) return;

  const checkbox = $toggle.querySelector('input[type="checkbox"]');
  if (!checkbox) return;

  const html = document.documentElement;
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Determine initial state:
  // - If user has explicitly saved a preference, use that
  // - If no saved preference and OS prefers reduced motion, default to off
  if (saved === 'true' || (saved === null && prefersReduced)) {
    html.classList.add('no-breathe');
    html.classList.remove('breathe-override');
    checkbox.checked = false;
  } else {
    // User wants breathing on — override reduced motion if needed
    html.classList.remove('no-breathe');
    if (prefersReduced) html.classList.add('breathe-override');
    checkbox.checked = true;
  }

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      html.classList.remove('no-breathe');
      if (prefersReduced) html.classList.add('breathe-override');
      localStorage.setItem(STORAGE_KEY, 'false');
    } else {
      html.classList.add('no-breathe');
      html.classList.remove('breathe-override');
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  });
}
