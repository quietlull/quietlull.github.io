const DEFAULT_DISTANCE = 6;

const drifting = new Map();
let frame = null;

function readDrift(element) {
  const distance = Number(element.dataset.drift) || DEFAULT_DISTANCE;
  const along = (value) => (value === undefined || value === '' ? distance : Number(value));
  return {
    distanceX: along(element.dataset.driftX) * (0.85 + Math.random() * 0.3),
    distanceY: along(element.dataset.driftY) * (0.85 + Math.random() * 0.3),
    speed: Number(element.dataset.driftSpeed) || 1,
    startX: Math.random() * Math.PI * 2,
    startY: Math.random() * Math.PI * 2,
    onScreen: true,
  };
}

function tick(now) {
  const seconds = now / 1000;
  let anyOnScreen = false;
  for (const [element, drift] of drifting) {
    element.classList.toggle('is-drifting', drift.onScreen);
    if (!drift.onScreen) {
      continue;
    }
    const x = drift.distanceX * Math.sin(seconds * 0.45 * drift.speed + drift.startX);
    const y = drift.distanceY * Math.sin(seconds * 0.57 * drift.speed + drift.startY);
    element.style.setProperty('--drift-x', `${x.toFixed(2)}px`);
    element.style.setProperty('--drift-y', `${y.toFixed(2)}px`);
    anyOnScreen = true;
  }
  frame = anyOnScreen ? requestAnimationFrame(tick) : null;
}

function wake() {
  if (frame === null) {
    frame = requestAnimationFrame(tick);
  }
}

const watcher = new IntersectionObserver(
  (changes) => {
    for (const change of changes) {
      drifting.get(change.target).onScreen = change.isIntersecting;
    }
    wake();
  },
  { rootMargin: '200px' }
);

export function initDrift(root = document) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  for (const element of root.querySelectorAll('[data-drift], [data-drift-x], [data-drift-y]')) {
    drifting.set(element, readDrift(element));
    watcher.observe(element);
  }
}
