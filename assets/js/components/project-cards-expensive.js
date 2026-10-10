import { init as initMergedCard } from './merged-card.js';
import { onCursor } from './cursor-coords.js';

let revealTilts = [];
let revealBound = false;

function bindReveal(root) {
  revealTilts = [...root.querySelectorAll('.ct-glow-card .card-tilt')];
  if (revealBound || !revealTilts.length) {
    return;
  }
  revealBound = true;
  onCursor((cx, cy) => {
    for (const tilt of revealTilts) {
      const r = tilt.getBoundingClientRect();
      tilt.style.setProperty('--mx', `${cx - r.left}px`);
      tilt.style.setProperty('--my', `${cy - r.top}px`);
    }
  });
}

function showPosterFrame(video) {
  const seek = () => { video.currentTime = 0.1; };
  if (video.readyState >= 1) {
    seek();
  } else {
    video.addEventListener('loadedmetadata', seek, { once: true });
  }
}

function bindHoverVideo(root) {
  root.querySelectorAll('.post-card video').forEach((video) => {
    video.pause();
    showPosterFrame(video);
    const card = video.closest('.post-card');
    if (!card) {
      return;
    }
    card.addEventListener('mouseenter', () => video.play().catch(() => {}));
    card.addEventListener('mouseleave', () => video.pause());
  });
}

export function init(root = document) {
  initMergedCard(root);
  bindReveal(root);
  bindHoverVideo(root);
}
