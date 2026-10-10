const TILT_MAX = 8;
const SCALE_HOVER = 1.02;
const LIFT_PX = 6;
const TRANSITION_IN = 'transform 0.15s ease-out';
const TRANSITION_OUT = 'transform 0.4s ease-out';

const SELECTORS = [
  '.post-card .card',
  '.vertical-bar-container',
];

let tiltEnabled = false;

export function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll(SELECTORS.join(', '));
  if (!cards.length) return;

  let startPos = null;
  const onMove = (e) => {
    if (!startPos) { startPos = { x: e.clientX, y: e.clientY }; return; }
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    if (dx * dx + dy * dy > 16) {
      tiltEnabled = true;
      document.removeEventListener('mousemove', onMove);
    }
  };
  document.addEventListener('mousemove', onMove);

  const invalidators = [];
  cards.forEach(card => invalidators.push(setupMouseTilt(card)));
  const invalidateAll = () => { for (const fn of invalidators) fn(); };
  window.addEventListener('scroll', invalidateAll, { passive: true });
  window.addEventListener('resize', invalidateAll, { passive: true });

  setupGyroTilt(cards);
}

function setupMouseTilt(card) {
  let active = false;
  let cachedRect = null;

  const invalidateRect = () => { cachedRect = null; };

  card.addEventListener('mouseenter', () => {
    if (!tiltEnabled) return;
    active = true;
    cachedRect = card.getBoundingClientRect();
    card.style.transition = TRANSITION_IN;
  });

  card.addEventListener('mousemove', (e) => {
    if (!active) return;
    if (!cachedRect) cachedRect = card.getBoundingClientRect();
    const rect = cachedRect;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    const rotateX = -y * TILT_MAX;
    const rotateY = x * TILT_MAX;

    card.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${LIFT_PX}px) scale(${SCALE_HOVER})`;
  });

  card.addEventListener('mouseleave', () => {
    active = false;
    cachedRect = null;
    card.style.transition = TRANSITION_OUT;
    card.style.transform = '';
  });

  return invalidateRect;
}

function setupGyroTilt(cards) {
  if (!('DeviceOrientationEvent' in window)) return;

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouch) return;

  const requestPermission = typeof DeviceOrientationEvent.requestPermission === 'function';

  let gyroEnabled = false;
  let firstBeta = null;

  function handleOrientation(e) {
    if (!gyroEnabled) {
      if (firstBeta === null) { firstBeta = e.beta; return; }
      if (Math.abs(e.beta - firstBeta) < 3 && Math.abs(e.gamma) < 3) return;
      gyroEnabled = true;
    }

    const GYRO_MAX = TILT_MAX * 0.5;
    const GYRO_STRENGTH = 0.15;
    const beta = Math.max(-GYRO_MAX, Math.min(GYRO_MAX, (e.beta - 45) * GYRO_STRENGTH));
    const gamma = Math.max(-GYRO_MAX, Math.min(GYRO_MAX, e.gamma * GYRO_STRENGTH));

    cards.forEach(card => {
      if (card.matches(':hover')) return;

      const rect = card.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inViewport) return;

      card.style.transition = TRANSITION_IN;
      card.style.transform =
        `perspective(800px) rotateX(${beta}deg) rotateY(${gamma}deg)`;
    });
  }

  if (requestPermission) {
    let permissionRequested = false;
    document.addEventListener('touchstart', () => {
      if (permissionRequested) return;
      permissionRequested = true;
      DeviceOrientationEvent.requestPermission()
        .then(state => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(() => {});
    }, { once: false });
  } else {
    window.addEventListener('deviceorientation', handleOrientation);
  }
}
