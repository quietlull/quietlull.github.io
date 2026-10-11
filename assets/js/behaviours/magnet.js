const EASE = 0.12;
const RESTING = 0.01;

const easing = new Set();
let frame = null;

function tick() {
  for (const magnet of easing) {
    magnet.amount += ((magnet.hovered ? 1 : 0) - magnet.amount) * EASE;
    magnet.x += (magnet.targetX - magnet.x) * EASE;
    magnet.y += (magnet.targetY - magnet.y) * EASE;
    const resting =
      !magnet.hovered &&
      magnet.amount < RESTING &&
      Math.abs(magnet.x) < RESTING &&
      Math.abs(magnet.y) < RESTING;

    magnet.element.classList.toggle('is-pulled', !resting);
    magnet.element.style.setProperty('--magnet-x', `${magnet.x.toFixed(2)}px`);
    magnet.element.style.setProperty('--magnet-y', `${magnet.y.toFixed(2)}px`);
    magnet.element.style.setProperty('--magnet-amount', magnet.amount.toFixed(3));
    if (magnet.inner) {
      const share = magnet.innerShare * magnet.amount;
      magnet.inner.style.translate = resting
        ? 'none'
        : `${(magnet.x * share).toFixed(2)}px ${(magnet.y * share).toFixed(2)}px`;
    }
    if (resting) {
      easing.delete(magnet);
    }
  }
  frame = easing.size ? requestAnimationFrame(tick) : null;
}

function attach(element) {
  const style = getComputedStyle(element);
  const setting = (name) => parseFloat(style.getPropertyValue(name));
  const pull = setting('--magnet-pull');
  const limit = setting('--magnet-limit') || Infinity;
  const within = (value) => Math.max(-limit, Math.min(limit, value));
  const magnet = {
    element,
    inner: element.querySelector('.magnet-inner'),
    innerShare: setting('--magnet-inner-pull') / pull,
    hovered: false,
    amount: 0,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  };

  element.addEventListener('mousemove', (event) => {
    const box = element.getBoundingClientRect();
    magnet.targetX = within(((event.clientX - box.left) / box.width - 0.5) * pull);
    magnet.targetY = within(((event.clientY - box.top) / box.height - 0.5) * pull);
    magnet.hovered = true;
    easing.add(magnet);
    if (frame === null) {
      frame = requestAnimationFrame(tick);
    }
  });

  element.addEventListener('mouseleave', () => {
    magnet.targetX = 0;
    magnet.targetY = 0;
    magnet.hovered = false;
  });
}

export function initMagnet(root = document) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  root.querySelectorAll('.magnet').forEach(attach);
}
