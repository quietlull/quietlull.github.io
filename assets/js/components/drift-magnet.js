const MIN_VIEWPORT_WIDTH = 541;
const MAGNET_LERP = 0.12;
const BLEND_LERP = 0.12;
const DRIFT_LEVEL_LERP = 0.05;
const SETTLE_EPSILON = 0.01;
const DEFAULT_STRENGTH = 40;
const DEFAULT_STRENGTH_TEXT = 20;
const DEFAULT_DRIFT_AMP = 6;
const TWO_PI = Math.PI * 2;

const entries = [];
let rafId = null;
let startTime = 0;
let cullObserver = null;
const elementToEntry = new Map();

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function motionOn() {
  return !document.body.classList.contains('motion-off');
}

function onScreenVisible(entry) {
  return document.body.classList.contains('cull-off') ? true : entry.onScreen;
}

function readDrift(element) {
  const hasDrift =
    element.hasAttribute('data-drift') ||
    element.hasAttribute('data-drift-x') ||
    element.hasAttribute('data-drift-y');
  const base = hasDrift ? Number(element.dataset.drift) || DEFAULT_DRIFT_AMP : 0;
  const speedScale = Number(element.dataset.driftSpeed) || 1;
  const axis = (v) => (v === undefined || v === '' ? base : Number(v));
  return {
    ampX: axis(element.dataset.driftX),
    ampY: axis(element.dataset.driftY),
    speedX: 0.45 * speedScale,
    speedY: 0.57 * speedScale,
  };
}

function createEntry(element) {
  const drift = readDrift(element);

  return {
    element,
    inner: element.querySelector('.js-magnetic-inner'),
    isMagnetic: element.classList.contains('js-magnetic'),
    clamp: Number(element.dataset.magnetClamp) || 0,
    strength: Number(element.dataset.strength) || DEFAULT_STRENGTH,
    strengthText: Number(element.dataset.strengthText) || DEFAULT_STRENGTH_TEXT,
    ampX: drift.ampX,
    ampY: drift.ampY,
    speedX: drift.speedX,
    speedY: drift.speedY,
    phaseX: Math.random() * TWO_PI,
    phaseY: Math.random() * TWO_PI,
    jitterX: 0.85 + Math.random() * 0.3,
    jitterY: 0.85 + Math.random() * 0.3,
    magnetActive: false,
    magX: 0,
    magY: 0,
    targetX: 0,
    targetY: 0,
    blend: 0,
    driftLevel: drift.ampX > 0 || drift.ampY > 0 ? 1 : 0,
    onScreen: true,
    promoted: false,
  };
}

function tick(now) {
  const seconds = (now - startTime) / 1000;
  const on = motionOn();
  let anyBusy = false;
  let anyVisibleDrift = false;

  for (let i = entries.length - 1; i >= 0; i -= 1) {
    const e = entries[i];
    if (!e.element.isConnected) {
      if (cullObserver) {
        cullObserver.unobserve(e.element);
      }
      elementToEntry.delete(e.element);
      entries.splice(i, 1);
      continue;
    }
    const vis = onScreenVisible(e);
    const parked =
      e.driftLevel < SETTLE_EPSILON &&
      e.blend < SETTLE_EPSILON &&
      Math.abs(e.magX) < SETTLE_EPSILON &&
      Math.abs(e.magY) < SETTLE_EPSILON;
    if (!vis && parked) {
      continue;
    }

    const hasDrift = e.ampX > 0 || e.ampY > 0;
    const driftTarget = hasDrift && on && vis ? 1 : 0;
    e.driftLevel = lerp(e.driftLevel, driftTarget, DRIFT_LEVEL_LERP);

    const blendTarget = e.magnetActive && on ? 1 : 0;
    e.blend = lerp(e.blend, blendTarget, BLEND_LERP);

    e.magX = lerp(e.magX, e.targetX, MAGNET_LERP);
    e.magY = lerp(e.magY, e.targetY, MAGNET_LERP);

    const driftX = e.ampX * e.jitterX * Math.sin(seconds * e.speedX + e.phaseX) * e.driftLevel;
    const driftY = e.ampY * e.jitterY * Math.sin(seconds * e.speedY + e.phaseY) * e.driftLevel;

    const x = driftX * (1 - e.blend) + e.magX * e.blend;
    const y = driftY * (1 - e.blend) + e.magY * e.blend;

    const moving =
      e.driftLevel > SETTLE_EPSILON ||
      e.blend > SETTLE_EPSILON ||
      Math.abs(e.magX) > SETTLE_EPSILON ||
      Math.abs(e.magY) > SETTLE_EPSILON;

    if (moving) {
      if (!e.promoted) {
        e.element.style.willChange = 'translate';
        e.promoted = true;
      }
      e.element.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px 0`;
      if (e.inner) {
        const ratio = e.strengthText / e.strength;
        e.inner.style.translate = `${(e.magX * ratio * e.blend).toFixed(2)}px ${(e.magY * ratio * e.blend).toFixed(2)}px 0`;
      }
      anyBusy = true;
    } else if (e.promoted) {
      e.element.style.translate = 'none';
      e.element.style.willChange = '';
      if (e.inner) {
        e.inner.style.translate = 'none';
      }
      e.promoted = false;
    }

    if (hasDrift && on && vis) {
      anyVisibleDrift = true;
    }
  }

  if (anyBusy || anyVisibleDrift) {
    rafId = requestAnimationFrame(tick);
  } else {
    rafId = null;
  }
}

function wake() {
  if (rafId === null) {
    rafId = requestAnimationFrame(tick);
  }
}

function bindMagnet(e) {
  e.element.addEventListener('mousemove', (event) => {
    if (!motionOn() || window.innerWidth < MIN_VIEWPORT_WIDTH) {
      return;
    }
    const r = e.element.getBoundingClientRect();
    let tx = ((event.clientX - r.left) / r.width - 0.5) * e.strength;
    let ty = ((event.clientY - r.top) / r.height - 0.5) * e.strength;
    if (e.clamp) {
      tx = Math.max(-e.clamp, Math.min(e.clamp, tx));
      ty = Math.max(-e.clamp, Math.min(e.clamp, ty));
    }
    e.targetX = tx;
    e.targetY = ty;
    e.magnetActive = true;
    wake();
  });

  e.element.addEventListener('mouseleave', () => {
    e.targetX = 0;
    e.targetY = 0;
    e.magnetActive = false;
    wake();
  });
}

function bindClickFlash(element) {
  element.addEventListener('click', () => {
    element.classList.remove('dm-flash');
    void element.offsetWidth;
    element.classList.add('dm-flash');
  });
  element.addEventListener('animationend', (event) => {
    if (event.animationName === 'dm-border-fly') {
      element.classList.remove('dm-flash');
    }
  });
}

export function retune(element) {
  const entry = elementToEntry.get(element);
  if (!entry) {
    return;
  }
  entry.strength = Number(element.dataset.strength) || DEFAULT_STRENGTH;
  entry.strengthText = Number(element.dataset.strengthText) || DEFAULT_STRENGTH_TEXT;
  const drift = readDrift(element);
  entry.ampX = drift.ampX;
  entry.ampY = drift.ampY;
  entry.speedX = drift.speedX;
  entry.speedY = drift.speedY;
  wake();
}

export function init(root = document) {
  if (!startTime) {
    startTime = performance.now();
  }
  if (!init.gated) {
    init.gated = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('motion-off');
    }
    new MutationObserver(() => wake()).observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
    cullObserver = new IntersectionObserver(
      (records) => {
        let changed = false;
        records.forEach((rec) => {
          const entry = elementToEntry.get(rec.target);
          if (entry) {
            entry.onScreen = rec.isIntersecting;
            changed = true;
          }
        });
        if (changed) {
          wake();
        }
      },
      { rootMargin: '200px' }
    );
  }

  const seen = new Set(entries.map((e) => e.element));
  root.querySelectorAll(
    '.js-magnetic, [data-drift], [data-drift-x], [data-drift-y]').forEach((el) => {
    if (seen.has(el)) {
      return;
    }
    const entry = createEntry(el);
    entries.push(entry);
    elementToEntry.set(el, entry);
    if (cullObserver) {
      cullObserver.observe(el);
    }
    if (entry.isMagnetic) {
      bindMagnet(entry);
    }
    if (el.hasAttribute('data-click-flash')) {
      bindClickFlash(el);
    }
  });
  wake();

  const motionBtn = root.querySelector('[data-motion-toggle]');
  if (motionBtn && !motionBtn.dataset.bound) {
    motionBtn.dataset.bound = '1';
    motionBtn.addEventListener('click', () => {
      const off = document.body.classList.toggle('motion-off');
      motionBtn.textContent = off ? 'turn motion on' : 'turn motion off';
    });
  }
}
