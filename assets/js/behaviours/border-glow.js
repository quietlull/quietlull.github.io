import { onCursor } from '../components/cursor-coords.js';

export function initBorderGlow(root = document) {
  const elements = [...root.querySelectorAll('.border-glow')];
  if (!elements.length) {
    return;
  }
  onCursor((x, y) => {
    for (const element of elements) {
      const box = element.getBoundingClientRect();
      element.style.setProperty('--border-glow-x', `${x - box.left}px`);
      element.style.setProperty('--border-glow-y', `${y - box.top}px`);
    }
  });
}
