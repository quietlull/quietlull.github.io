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

function bindControls(root) {
  const grid = root.querySelector('.wrapper-project-card-grid');
  if (!grid) {
    return;
  }
  const layoutBtn = root.querySelector('[data-epx-layout]');
  if (layoutBtn) {
    const LAYOUTS = [
      { label: 'Layout: Bento', cls: null },
      { label: 'Layout: Staggered', cls: 'is-staggered' },
      { label: 'Layout: Regular', cls: 'is-regular' },
    ];
    let layoutIndex = 0;
    layoutBtn.addEventListener('click', () => {
      layoutIndex = (layoutIndex + 1) % LAYOUTS.length;
      grid.classList.remove('is-staggered', 'is-regular');
      const next = LAYOUTS[layoutIndex];
      if (next.cls) {
        grid.classList.add(next.cls);
      }
      layoutBtn.textContent = next.label;
    });
  }
  const cornersBtn = root.querySelector('[data-epx-corners]');
  if (cornersBtn) {
    cornersBtn.addEventListener('click', () => {
      const square = grid.classList.toggle('merged-cards--square');
      cornersBtn.textContent = square ? 'Corners: Square' : 'Corners: Rounded';
    });
  }
  root.querySelectorAll('[data-epx-var]').forEach((input) => {
    input.addEventListener('input', () => {
      grid.style.setProperty(input.dataset.epxVar, input.value + (input.dataset.epxUnit || ''));
    });
  });
}

export function init(root = document) {
  initMergedCard(root);
  bindReveal(root);
  bindHoverVideo(root);
  bindControls(root);
}
