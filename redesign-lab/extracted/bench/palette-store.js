/* palette-store — persisted color-token overrides (the "nail down key visuals" loop).
   Overrides apply on top of styles/settings.css via inline custom properties, persist in
   localStorage, and flow to aggregate.html (which maps them onto its legacy var names too). */
const STORAGE_KEY = 'lab-palette';

export function loadPalette() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function savePalette(overrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

export function applyPalette(overrides, root = document.documentElement) {
  Object.entries(overrides).forEach(([token, value]) => {
    if (value) {
      root.style.setProperty(token, value);
    } else {
      root.style.removeProperty(token);
    }
  });
}
