const PHONE_LIMIT = 4;
const PHONE_STRENGTH = 0.15;
const PHONE_REST_ANGLE = 45;
const PHONE_DEADZONE = 3;

let mouseHasMoved = false;

function waitForRealMouse() {
  let start = null;
  const onMove = (event) => {
    if (!start) {
      start = { x: event.clientX, y: event.clientY };
      return;
    }
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (dx * dx + dy * dy > 16) {
      mouseHasMoved = true;
      document.removeEventListener('mousemove', onMove);
    }
  };
  document.addEventListener('mousemove', onMove);
}

function leanWithMouse(element) {
  const max = parseFloat(getComputedStyle(element).getPropertyValue('--tilt-max'));
  let active = false;
  let frame = null;
  let pointerX = 0;
  let pointerY = 0;

  const lean = () => {
    frame = null;
    const box = element.getBoundingClientRect();
    const x = ((pointerX - box.left) / box.width - 0.5) * 2;
    const y = ((pointerY - box.top) / box.height - 0.5) * 2;
    element.style.setProperty('--tilt-rotate-x', `${-y * max}deg`);
    element.style.setProperty('--tilt-rotate-y', `${x * max}deg`);
    element.classList.add('is-tilting');
  };

  element.addEventListener('mouseenter', () => {
    active = mouseHasMoved;
  });

  element.addEventListener('mousemove', (event) => {
    if (!active) {
      return;
    }
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (frame === null) {
      frame = requestAnimationFrame(lean);
    }
  });

  element.addEventListener('mouseleave', () => {
    active = false;
    cancelAnimationFrame(frame);
    frame = null;
    element.classList.remove('is-tilting');
  });
}

function leanWithPhone(elements) {
  if (!('DeviceOrientationEvent' in window)) {
    return;
  }
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouch) {
    return;
  }
  const visible = new Set();
  const watcher = new IntersectionObserver(
    (changes) => {
      changes.forEach((change) => (change.isIntersecting ? visible.add(change.target) : visible.delete(change.target)));
    },
    { rootMargin: '50px' }
  );
  elements.forEach((element) => watcher.observe(element));

  let armed = false;
  let firstBeta = null;
  let frame = null;
  let beta = 0;
  let gamma = 0;

  const lean = () => {
    frame = null;
    visible.forEach((element) => {
      element.style.setProperty('--tilt-rotate-x', `${beta}deg`);
      element.style.setProperty('--tilt-rotate-y', `${gamma}deg`);
      element.classList.add('is-tilting');
    });
  };

  const handleOrientation = (event) => {
    if (!armed) {
      if (firstBeta === null) {
        firstBeta = event.beta;
        return;
      }
      if (Math.abs(event.beta - firstBeta) < PHONE_DEADZONE && Math.abs(event.gamma) < PHONE_DEADZONE) {
        return;
      }
      armed = true;
    }
    beta = Math.max(-PHONE_LIMIT, Math.min(PHONE_LIMIT, (event.beta - PHONE_REST_ANGLE) * PHONE_STRENGTH));
    gamma = Math.max(-PHONE_LIMIT, Math.min(PHONE_LIMIT, event.gamma * PHONE_STRENGTH));
    if (frame === null) {
      frame = requestAnimationFrame(lean);
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

export function initTilt(root = document) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  const elements = root.querySelectorAll('.tilt');
  if (!elements.length) {
    return;
  }
  waitForRealMouse();
  elements.forEach(leanWithMouse);
  leanWithPhone(elements);
}
