/**
 * 3D card tilt effect — cursor-driven on desktop, gyro on mobile.
 * Applies inline transform on mousemove, resets on mouseleave.
 * CSS hover transform acts as fallback when JS hasn't set a style.
 */

const TILT_MAX = 8;          // max degrees of rotation
const SCALE_HOVER = 1.02;    // slight scale on hover
const LIFT_PX = 6;           // translateY lift on hover
const TRANSITION_IN = 'transform 0.15s ease-out';
const TRANSITION_OUT = 'transform 0.4s ease-out';

const SELECTORS = [
  '.post-card .card',
  '.vertical-bar-container',
];

// Global gate: require real mouse movement before enabling tilt.
// Prevents cards from starting tilted when cursor is already over them at load.
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
    if (dx * dx + dy * dy > 16) { // 4px movement threshold
      tiltEnabled = true;
      document.removeEventListener('mousemove', onMove);
    }
  };
  document.addEventListener('mousemove', onMove);

  cards.forEach(card => setupMouseTilt(card));
  setupGyroTilt(cards);
}

function setupMouseTilt(card) {
  let active = false;

  card.addEventListener('mouseenter', () => {
    if (!tiltEnabled) return;
    active = true;
    card.style.transition = TRANSITION_IN;
  });

  card.addEventListener('mousemove', (e) => {
    if (!active) return;
    const rect = card.getBoundingClientRect();
    // Normalise cursor position to -1..1 from card center
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // rotateX: negative y moves top toward viewer
    // rotateY: positive x moves right toward viewer
    const rotateX = -y * TILT_MAX;
    const rotateY = x * TILT_MAX;

    card.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${LIFT_PX}px) scale(${SCALE_HOVER})`;
  });

  card.addEventListener('mouseleave', () => {
    active = false;
    card.style.transition = TRANSITION_OUT;
    card.style.transform = '';
  });
}

function setupGyroTilt(cards) {
  if (!('DeviceOrientationEvent' in window)) return;

  // iOS 13+ requires permission
  const requestPermission = typeof DeviceOrientationEvent.requestPermission === 'function';

  function handleOrientation(e) {
    const beta = Math.max(-TILT_MAX, Math.min(TILT_MAX, (e.beta - 45) * 0.3));
    const gamma = Math.max(-TILT_MAX, Math.min(TILT_MAX, e.gamma * 0.3));

    cards.forEach(card => {
      // Only apply gyro when not being mouse-controlled
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
    // Will be triggered by a user gesture (first touch)
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
