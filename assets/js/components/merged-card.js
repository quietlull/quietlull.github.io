const TILT_MAX = 8;
const SCALE_HOVER = 1.02;
const LIFT_PX = 6;
const TILT_IN = 'transform 0.15s ease-out';
const TILT_OUT = 'transform 0.4s ease-out';
const DWELL_MS = 900;
const DWELL_RESET_PX = 48;

let tiltEnabled = false;

function setupCard(card, ring) {
  const tilt = card.querySelector('.card-tilt');
  const flipper = card.querySelector('.card-flipper');
  let active = false;
  let frame = null;
  let pointerX = 0;
  let pointerY = 0;
  let dwellTimer = null;
  let dwellAnchor = null;

  const applyTilt = () => {
    frame = null;
    if (!active) {
      return;
    }
    const rect = tilt.getBoundingClientRect();
    const x = ((pointerX - rect.left) / rect.width - 0.5) * 2;
    const y = ((pointerY - rect.top) / rect.height - 0.5) * 2;
    tilt.style.transform = `rotateX(${-y * TILT_MAX}deg) rotateY(${x * TILT_MAX}deg) translateY(-${LIFT_PX}px) scale(${SCALE_HOVER})`;
  };

  const startDwell = (x, y) => {
    if (flipper.classList.contains('is-flipped')) {
      return;
    }
    dwellAnchor = { x, y };
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.classList.remove('is-filling');
    void ring.offsetWidth;
    ring.classList.add('is-on', 'is-filling');
    clearTimeout(dwellTimer);
    dwellTimer = setTimeout(() => {
      flipper.classList.add('is-flipped');
      ring.classList.remove('is-on', 'is-filling');
      dwellTimer = null;
      dwellAnchor = null;
    }, DWELL_MS);
  };

  const stopDwell = () => {
    clearTimeout(dwellTimer);
    dwellTimer = null;
    dwellAnchor = null;
    ring.classList.remove('is-on', 'is-filling');
  };

  card.addEventListener('mouseenter', (event) => {
    if (tiltEnabled) {
      active = true;
      tilt.style.transition = TILT_IN;
      tilt.style.willChange = 'transform';
    }
    startDwell(event.clientX, event.clientY);
  });

  card.addEventListener('mousemove', (event) => {
    if (active) {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame === null) {
        frame = requestAnimationFrame(applyTilt);
      }
    }
    if (dwellAnchor) {
      ring.style.left = `${event.clientX}px`;
      ring.style.top = `${event.clientY}px`;
      const dx = event.clientX - dwellAnchor.x;
      const dy = event.clientY - dwellAnchor.y;
      if (dx * dx + dy * dy > DWELL_RESET_PX * DWELL_RESET_PX) {
        startDwell(event.clientX, event.clientY);
      }
    }
  });

  card.addEventListener('mouseleave', () => {
    active = false;
    if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
    tilt.style.transition = TILT_OUT;
    tilt.style.transform = '';
    tilt.style.willChange = '';
    stopDwell();
    flipper.classList.remove('is-flipped');
  });
}

function setupGyroTilt(tiltLayers) {
  if (!('DeviceOrientationEvent' in window)) {
    return;
  }
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouch) {
    return;
  }
  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)));
  }, { rootMargin: '50px' });
  tiltLayers.forEach((el) => observer.observe(el));

  const GYRO_MAX = TILT_MAX * 0.5;
  const GYRO_STRENGTH = 0.15;
  const BETA_REST = 45;
  const DEADZONE_DEG = 3;
  let armed = false;
  let firstBeta = null;
  let frame = null;
  let beta = 0;
  let gamma = 0;

  const applyGyro = () => {
    frame = null;
    visible.forEach((el) => {
      el.style.transition = TILT_IN;
      el.style.transform = `rotateX(${beta}deg) rotateY(${gamma}deg)`;
    });
  };

  const handleOrientation = (event) => {
    if (!armed) {
      if (firstBeta === null) {
        firstBeta = event.beta;
        return;
      }
      if (Math.abs(event.beta - firstBeta) < DEADZONE_DEG && Math.abs(event.gamma) < DEADZONE_DEG) {
        return;
      }
      armed = true;
    }
    beta = Math.max(-GYRO_MAX, Math.min(GYRO_MAX, (event.beta - BETA_REST) * GYRO_STRENGTH));
    gamma = Math.max(-GYRO_MAX, Math.min(GYRO_MAX, event.gamma * GYRO_STRENGTH));
    if (frame === null) {
      frame = requestAnimationFrame(applyGyro);
    }
  };

  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    let requested = false;
    document.addEventListener('touchstart', () => {
      if (requested) {
        return;
      }
      requested = true;
      DeviceOrientationEvent.requestPermission()
        .then((state) => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(() => {});
    });
  } else {
    window.addEventListener('deviceorientation', handleOrientation);
  }
}

export function init(root = document) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  const cards = root.querySelectorAll('.post-card');
  if (!cards.length) {
    return;
  }

  let startPos = null;
  const onFirstMove = (event) => {
    if (!startPos) {
      startPos = { x: event.clientX, y: event.clientY };
      return;
    }
    const dx = event.clientX - startPos.x;
    const dy = event.clientY - startPos.y;
    if (dx * dx + dy * dy > 16) {
      tiltEnabled = true;
      document.removeEventListener('mousemove', onFirstMove);
    }
  };
  document.addEventListener('mousemove', onFirstMove);

  const ring = document.createElement('div');
  ring.className = 'dwell-ring';
  document.body.appendChild(ring);

  cards.forEach((card) => setupCard(card, ring));
  setupGyroTilt(root.querySelectorAll('.card-tilt'));
}
