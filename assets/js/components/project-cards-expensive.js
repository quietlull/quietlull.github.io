/* project-cards (expensive) — combined keeper. merged-card behaviors (tilt/flip/parallax/dwell) +
   drift-magnet base (drift + magnet on the .post-card wrapper) + cursor band-reveal on glass/back +
   video-on-hover (project-page perf precaution). No text glow (scrapped, Rod 2026-06-14).
   PROVENANCE: merged-card; drift-magnet (breakdance + dennissnellenberg + chriskalafatis);
   band-reveal = yannesidibe .glow; video-on-hover = lab perf precaution. */
import { init as initMergedCard } from './merged-card.js';
import { init as initDriftMagnet } from './drift-magnet.js';
import { onCursor } from './cursor-coords.js';

/* init refreshes the live target list; the cursor handler is registered ONCE on the shared broadcaster */
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

function bindHoverVideo(root) {
  root.querySelectorAll('.post-card video').forEach((video) => {
    video.pause();
    const card = video.closest('.post-card');
    if (!card) {
      return;
    }
    card.addEventListener('mouseenter', () => video.play().catch(() => {}));
    card.addEventListener('mouseleave', () => video.pause());
  });
}

function bindControls(root) {
  const grid = root.querySelector('.epx-cards');
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
  // live tuners write CSS vars onto the grid (z-* read by merged-card, --glow-r by the reveal)
  root.querySelectorAll('[data-epx-var]').forEach((input) => {
    input.addEventListener('input', () => {
      grid.style.setProperty(input.dataset.epxVar, input.value + (input.dataset.epxUnit || ''));
    });
  });
}

export function init(root = document) {
  initMergedCard(root);
  initDriftMagnet(root);
  bindReveal(root);
  bindHoverVideo(root);
  bindControls(root);
}
