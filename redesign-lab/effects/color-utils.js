/**
 * Color parsing and warm-color detection utilities.
 * Shared across sparkler, achievements, and future color-aware features.
 */

export function parseRGB(str) {
  if (!str || str === 'transparent') return null;
  const m = str.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/);
  return m ? [+m[1], +m[2], +m[3]] : null;
}

export function rgbToHSL(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s, l];
}

export function isWarmColor(rgb) {
  const [r, g, b] = rgb;
  const [h, s, l] = rgbToHSL(r, g, b);
  if (l < 0.15 || l > 0.95) return false;
  if (s < 0.2) return false;
  return (h >= 0 && h <= 70) || (h >= 320 && h <= 360);
}
