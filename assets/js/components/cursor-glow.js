import { onCursor } from './cursor-coords.js';

function setupCommentsShield() {
  const region = document.querySelector('.post-comments');
  if (!region || !window.matchMedia('(hover: hover)').matches) {
    return;
  }

  const shield = document.createElement('div');
  shield.className = 'cursor-shield';
  region.appendChild(shield);

  const moveHoleUnderPointer = (event) => {
    if (event.pointerType === 'touch') {
      shield.remove();
      return;
    }
    shield.style.setProperty('--hole-x', `${event.offsetX}px`);
    shield.style.setProperty('--hole-y', `${event.offsetY}px`);
  };

  shield.addEventListener('pointermove', moveHoleUnderPointer, { passive: true });
  shield.addEventListener('pointerover', moveHoleUnderPointer, { passive: true });
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
