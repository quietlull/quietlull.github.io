const RADIUS = 48;

let ring = null;

function moveRing(x, y) {
  ring.style.setProperty('--dwell-x', `${x}px`);
  ring.style.setProperty('--dwell-y', `${y}px`);
}

function fillRing(x, y, time) {
  moveRing(x, y);
  ring.style.setProperty('--dwell-time', time);
  ring.classList.remove('is-filling');
  void ring.offsetWidth;
  ring.classList.add('is-on', 'is-filling');
}

function hideRing() {
  ring.classList.remove('is-on', 'is-filling');
}

function attach(element) {
  const time = getComputedStyle(element).getPropertyValue('--dwell-time');
  let anchor = null;
  let timer = null;

  const start = (x, y) => {
    anchor = { x, y };
    fillRing(x, y, time);
    clearTimeout(timer);
    timer = setTimeout(() => {
      element.classList.add('is-dwelled');
      hideRing();
      anchor = null;
    }, parseFloat(time) * 1000);
  };

  element.addEventListener('mouseenter', (event) => {
    start(event.clientX, event.clientY);
  });

  element.addEventListener('mousemove', (event) => {
    if (!anchor) {
      return;
    }
    moveRing(event.clientX, event.clientY);
    const dx = event.clientX - anchor.x;
    const dy = event.clientY - anchor.y;
    if (dx * dx + dy * dy > RADIUS * RADIUS) {
      start(event.clientX, event.clientY);
    }
  });

  element.addEventListener('mouseleave', () => {
    clearTimeout(timer);
    anchor = null;
    hideRing();
    element.classList.remove('is-dwelled');
  });
}

export function initDwell(root = document) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  const elements = root.querySelectorAll('.dwell');
  if (!elements.length) {
    return;
  }
  ring = document.createElement('div');
  ring.className = 'dwell-ring';
  document.body.appendChild(ring);
  elements.forEach(attach);
}
