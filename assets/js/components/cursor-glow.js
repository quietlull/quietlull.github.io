import { onCursor } from './cursor-coords.js';

const SETTLE_BEFORE_CLICK_MS = 140;

function setupCommentsShield() {
  const region = document.querySelector('.post-comments');
  if (!region) {
    return;
  }

  const shield = document.createElement('div');
  shield.className = 'cursor-shield';
  region.appendChild(shield);

  let stillTimer = null;

  shield.addEventListener('pointermove', () => {
    clearTimeout(stillTimer);
    stillTimer = setTimeout(() => {
      shield.style.pointerEvents = 'none';
    }, SETTLE_BEFORE_CLICK_MS);
  });

  document.addEventListener(
    'pointermove',
    (event) => {
      if (!region.contains(event.target)) {
        clearTimeout(stillTimer);
        shield.style.pointerEvents = '';
      }
    },
    { passive: true }
  );
}

export function init(root = document) {
  const glowElement = root.querySelector('.cursorglow');
  if (!glowElement) {
    return;
  }

  setupCommentsShield();
  onCursor((cx, cy) => {
    glowElement.style.setProperty('--cx', `${cx}px`);
    glowElement.style.setProperty('--cy', `${cy}px`);
  });
}
