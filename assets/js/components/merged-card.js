/* merged-card behavior — VERBATIM port of merged card v2 (rework-harumaki.html lines 400-431):
   parallax z-layer tilt + dwell-flip + gyro tilt on touch. Changes vs source, per the contract:
   - scoped to a passed root (bench mounts/unmounts components);
   - dwell ring classes renamed on/fill -> is-on/is-filling (Rule 27 state prefixes);
   - the document-level "first mouse move arms tilt" guard kept as in source.
   Also wires the lab glass toggle (Rod: judge dropping the glass). */

const TILT_MAX = 8;
const SCALE_HOVER = 1.02;
const LIFT_PX = 6;
const TILT_IN = 'transform 0.15s ease-out';
const TILT_OUT = 'transform 0.4s ease-out';
const DWELL_MS = 900;
const DWELL_RESET_PX = 48;

function setupCard(card, ring) {
  if (card.__cardWired) {
    return; // idempotent: safe to re-run init after appending more cards
  }
  card.__cardWired = true;
  const tilt = card.querySelector('.card-tilt');
  const flipper = card.querySelector('.card-flipper');
  const hasBack = !!card.querySelector('.card-back');
  if (!tilt || !flipper) {
    return;
  }
  let active = false;
  let rect = null;
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
    rect = tilt.getBoundingClientRect(); // recompute each frame (one hovered card) -> no scroll listener needed
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
    void ring.offsetWidth; /* restart the conic fill animation */
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
    if (card.__tiltEnabled()) {
      active = true;
      rect = tilt.getBoundingClientRect();
      tilt.style.transition = TILT_IN;
      tilt.style.willChange = 'transform';
    }
    if (hasBack) {
      startDwell(event.clientX, event.clientY);
    }
  });

  card.addEventListener('mousemove', (event) => {
    if (active) {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame === null) {
        frame = requestAnimationFrame(applyTilt);
      }
    }
    if (hasBack && dwellAnchor) {
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
    rect = null;
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

/* T2-C (2.2.2, Rod's spec): demo loops AUTOPLAY by default (the markup keeps `autoplay`).
   ONLY when the user has reduced-motion on (or the kill-switch body.motion-off) do we pause them
   and fall back to hover-to-play, so motion-sensitive users get a still frame + play-on-intent.
   The default autoplay's required pause path (2.2.2) is the motion kill-switch, wired at assembly. */
function setupCardVideos(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionOff = () => reduce || document.body.classList.contains('motion-off');
  if (!motionOff()) {
    return; /* default: leave the autoplay loops alone */
  }
  root.querySelectorAll('.post-card video').forEach((video) => {
    video.removeAttribute('autoplay');
    video.muted = true;
    video.pause();
    const showFrame = () => {
      try {
        video.currentTime = 0.1; /* still poster frame while paused */
      } catch (e) {
        /* metadata not ready yet */
      }
    };
    if (video.readyState >= 1) {
      showFrame();
    } else {
      video.addEventListener('loadedmetadata', showFrame, { once: true });
    }
    const card = video.closest('.post-card');
    if (!card) {
      return;
    }
    card.addEventListener('mouseenter', () => video.play().catch(() => {}));
    card.addEventListener('mouseleave', () => video.pause());
  });
}

export function init(root = document) {
  setupCardVideos(root); /* runs even under reduced motion (just no hover-play) */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  const cards = root.querySelectorAll('.post-card');
  if (!cards.length) {
    return;
  }

  /* source guard: tilt only arms after the cursor genuinely moves (avoids load-position jank) */
  let tiltEnabled = false;
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

  let ring = document.querySelector('.dwell-ring');
  if (!ring) {
    ring = document.createElement('div');
    ring.className = 'dwell-ring';
    document.body.appendChild(ring);
  }

  cards.forEach((card) => {
    card.__tiltEnabled = () => tiltEnabled;
    setupCard(card, ring);
  });
  setupGyroTilt(root.querySelectorAll('.card-tilt'));

  const glassToggle = root.querySelector('.js-glass-toggle');
  const grid = root.querySelector('.merged-cards');
  if (glassToggle && grid) {
    glassToggle.addEventListener('click', () => {
      const off = grid.classList.toggle('no-glass');
      glassToggle.textContent = off ? 'Glass · Off' : 'Glass · On';
    });
  }
}
