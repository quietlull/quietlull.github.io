import { onCursor } from '../components/cursor-coords.js';

export function initTrackMouse(root = document) {
  const elements = [...root.querySelectorAll('.track-mouse')];
  if (!elements.length) {
    return;
  }
  onCursor((x, y) => {
    for (const element of elements) {
      const box = element.getBoundingClientRect();
      element.style.setProperty('--mouse-x', `${x - box.left}px`);
      element.style.setProperty('--mouse-y', `${y - box.top}px`);
    }
  });
}
