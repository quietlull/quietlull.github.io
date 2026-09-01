/* card-tests — the two project-card behaviors on the REAL merged-card (flip + parallax + tilt), at
   scale, with ACTIVATION CULLING (Rod 2026-06-14).
   Variant A = magnet + drift (drift-magnet base on the .post-card wrapper; tilt stays on .card-tilt).
   Variant B = band-reveal (yannesidibe cursor-tracked glow border).
   Lab harness (never ships). Remount-safe: state is reset on init and the window pointermove + perf
   rAF are module singletons that target the CURRENT elements (no stacking across bench visits). */
import { init as initMergedCard } from '../merged-card/merged-card.js';
import { init as initDriftMagnet } from '../drift-magnet/drift-magnet.js';
import { onCursor } from '../cursor-coords/cursor-coords.js';

const SAMPLES = [
  { title: 'Compute Grass', meta: 'Unity · HLSL · Compute', hue: 'a', video: '/assets/media/GrassCompute/GrassHeroAndPreviewImage.mp4' },
  { title: 'Shaders of ZZZ', meta: 'Rendering study · HLSL', hue: 'b', video: '/assets/media/ZZZProject/CodeScroll.mp4' },
  { title: '2D Physics on the GPU', meta: 'Tooling · Compute', hue: 'a', video: '' },
  { title: 'Procedural 3D Mask', meta: 'Unity · Shader', hue: 'b', video: '/assets/media/P3DM/TerrainShowcase.mp4' },
];

const START_PER_VARIANT = 12; // 24 total
const MAX_PER_VARIANT = 50; // 100 total

let cullObserver = null;
const visibleCards = new Set();
let glowCards = [];
let allCards = [];

function cullOff() {
  return document.body.classList.contains('cull-off');
}

function motionOn() {
  return !document.body.classList.contains('motion-off');
}

function cardActive(card) {
  return cullOff() || visibleCards.has(card);
}

function applyCard(card) {
  const video = card.querySelector('video');
  if (!video) {
    return;
  }
  if (cardActive(card) && motionOn()) {
    video.play().catch(() => {});
  } else {
    video.pause();
  }
}

function buildCard(variant, sample) {
  const cell = document.createElement('div');
  cell.className = sample.hue === 'a' ? 'posts-grid-hue-a' : 'posts-grid-hue-b';
  const cover = sample.video
    ? `<div class="card-cover z-layer"><video loop muted playsinline preload="metadata"><source src="${sample.video}" type="video/mp4"></video></div>`
    : '<div class="card-cover z-layer"></div>';
  const behaviorClass = variant === 'a' ? ' js-magnetic' : ' ct-glow-card';
  const behaviorAttrs = variant === 'a' ? ' data-drift="4" data-strength="20"' : '';
  cell.innerHTML = `
    <article class="post-card${behaviorClass}"${behaviorAttrs}>
      <a href="#" class="card-link">
        <div class="card-tilt"><div class="card-flipper">
          <div class="card-front">
            ${cover}
            <div class="glass-plane z-layer"></div>
            <div class="card-body z-layer">
              <h3 class="card-title z-layer">${sample.title}</h3>
              <p class="card-meta">${sample.meta}</p>
            </div>
          </div>
          <div class="card-back">
            <p class="takeaway-quote">"A short takeaway."</p>
            <p class="takeaway-text">One note on what this project taught.</p>
            <span class="back-read">Read the post &rarr;</span>
          </div>
        </div></div>
      </a>
    </article>`;
  return cell;
}

function fill(grid, variant, count) {
  for (let i = 0; i < count; i += 1) {
    const sample = SAMPLES[grid.children.length % SAMPLES.length];
    const cell = buildCard(variant, sample);
    grid.appendChild(cell);
    const card = cell.querySelector('.post-card');
    allCards.push(card);
    cullObserver.observe(card);
    if (variant === 'b') {
      glowCards.push({ layer: cell.querySelector('.glass-plane'), card });
    }
  }
}

/* band-reveal — single shared cursor handler over the live glowCards array */
let bandBound = false;

function bindBandReveal() {
  if (bandBound) {
    return;
  }
  bandBound = true;
  onCursor((cx, cy) => {
    for (const { layer, card } of glowCards) {
      if (!cardActive(card)) {
        continue; // culled: skip rect reads for off-screen cards
      }
      const r = layer.getBoundingClientRect();
      layer.style.setProperty('--mx', `${cx - r.left}px`);
      layer.style.setProperty('--my', `${cy - r.top}px`);
    }
  });
}

/* perf meter — a single rAF loop writing to whichever readout element is current */
let perfBound = false;
let perfEl = null;
let perfFrames = 0;
let perfLast = 0;

function perfLoop(now) {
  perfFrames += 1;
  const span = now - perfLast;
  if (span >= 500) {
    if (perfEl) {
      const fps = Math.round((perfFrames * 1000) / span);
      perfEl.textContent = `${fps} fps / ${(span / perfFrames).toFixed(1)} ms`;
      perfEl.classList.toggle('ct-perf--warn', fps < 50);
    }
    perfFrames = 0;
    perfLast = now;
  }
  requestAnimationFrame(perfLoop);
}

function startPerfMeter(el) {
  perfEl = el;
  if (perfBound) {
    return;
  }
  perfBound = true;
  perfLast = performance.now();
  requestAnimationFrame(perfLoop);
}

export function init(root = document) {
  const gridA = root.querySelector('[data-ct-grid-a]');
  const gridB = root.querySelector('[data-ct-grid-b]');
  if (!gridA || !gridB) {
    return;
  }

  // remount-safe: drop stale state so the arrays/observer don't grow across bench visits
  if (cullObserver) {
    cullObserver.disconnect();
  }
  visibleCards.clear();
  glowCards = [];
  allCards = [];

  cullObserver = new IntersectionObserver(
    (records) => {
      records.forEach((rec) => {
        if (rec.isIntersecting) {
          visibleCards.add(rec.target);
        } else {
          visibleCards.delete(rec.target);
        }
        applyCard(rec.target);
      });
    },
    { rootMargin: '200px' }
  );

  const countEl = root.querySelector('[data-ct-count]');
  function updateCount() {
    if (countEl) {
      countEl.textContent = `${allCards.length} cards`;
    }
  }

  function grow(perVariant) {
    fill(gridA, 'a', perVariant - gridA.children.length);
    fill(gridB, 'b', perVariant - gridB.children.length);
    initMergedCard(root);
    initDriftMagnet(root);
    updateCount();
  }

  grow(START_PER_VARIANT);
  bindBandReveal();

  const cullBtn = root.querySelector('[data-ct-cull]');
  if (cullBtn) {
    cullBtn.addEventListener('click', () => {
      const off = document.body.classList.toggle('cull-off');
      cullBtn.textContent = off ? 'Culling · Off' : 'Culling · On';
      allCards.forEach(applyCard);
    });
  }

  const motionBtn = root.querySelector('[data-ct-motion]');
  if (motionBtn) {
    motionBtn.addEventListener('click', () => {
      const off = document.body.classList.toggle('motion-off');
      motionBtn.textContent = off ? 'Motion · Off' : 'Motion · On';
      allCards.forEach(applyCard);
    });
  }

  const stressBtn = root.querySelector('[data-ct-100]');
  if (stressBtn) {
    stressBtn.addEventListener('click', () => {
      grow(MAX_PER_VARIANT);
      stressBtn.disabled = true;
    });
  }

  const perf = root.querySelector('[data-ct-perf]');
  if (perf) {
    startPerfMeter(perf);
  }
}
