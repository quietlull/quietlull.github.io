/**
 * Toggle breathing animations on/off via html.no-breathe class.
 * Persists preference in localStorage.
 */

const STORAGE_KEY = 'breathe-disabled';
const $toggle = document.getElementById('breathe-toggle');

export function breatheToggle() {
  if (!$toggle) return;

  // Restore saved preference
  if (localStorage.getItem(STORAGE_KEY) === 'true') {
    document.documentElement.classList.add('no-breathe');
    $toggle.querySelector('i').classList.replace('fa-wind', 'fa-ban');
  }

  $toggle.addEventListener('click', () => {
    const html = document.documentElement;
    const disabled = html.classList.toggle('no-breathe');
    const icon = $toggle.querySelector('i');

    if (disabled) {
      icon.classList.replace('fa-wind', 'fa-ban');
      localStorage.setItem(STORAGE_KEY, 'true');
    } else {
      icon.classList.replace('fa-ban', 'fa-wind');
      localStorage.setItem(STORAGE_KEY, 'false');
    }
  });
}
