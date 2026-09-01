/* drift-magnet — the ambient-drift + cursor-magnetism BASE.
   All drifting/magnetic elements (buttons, socials, favicon, nav) derive from this one engine.

   PROVENANCE (Remixed):
   - 2-axis ambient drift: breakdance4fun.supadezign GSAP floating recipe (independent-axis sine,
     ease sine.inOut, yoyo) -> ported to vanilla rAF as two desynced sines (refs-floating-and-palette.md).
   - cursor magnetism: dennissnellenberg.com/work (tdesero pattern, codepen.io/tdesero/pen/RmoxQg):
     normalized-offset * data-strength; inner text * data-strength-text (sources/dennissnellenberg-buttons.md).
   - lerp engine: chriskalafatis.com (rAF + lerp, no GSAP/jQuery dependency).
   - orchestration RULES (magnet fully overrides drift; motion-off is graceful, never mid-drift):
     Rod (Idea = mine).

   Hooks:
     .js-magnetic        cursor-stick      (data-strength, data-strength-text)
     [data-drift]        ambient drift     (value = amplitude px; data-drift-speed = multiplier)
     .js-magnetic-inner  optional inner parallax layer (e.g. label / glyph)
     data-magnet-clamp   cap magnet offset in px (e.g. favicon "can't escape its box")

   Motion gate: body.motion-off (set by the motion toggle / prefers-reduced-motion) ramps drift back
   to origin and suspends magnetism GRACEFULLY -- it finishes the return before it stops, so nothing
   freezes at an awkward offset mid-drift. */

const MIN_VIEWPORT_WIDTH = 541;   // dennissnellenberg/tdesero touch guard (> 540px)
const MAGNET_LERP = 0.12;         // cursor-follow speed
const BLEND_LERP = 0.12;          // drift <-> magnet handoff speed
const DRIFT_LEVEL_LERP = 0.05;    // graceful ramp of ambient drift on/off (slow = no pop)
const SETTLE_EPSILON = 0.01;
const DEFAULT_STRENGTH = 40;
const DEFAULT_STRENGTH_TEXT = 20;
const DEFAULT_DRIFT_AMP = 6;      // px
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

/* activation culling: an off-screen element does no work. body.cull-off disables culling so the
   cost difference is visible (and so culling can be turned off globally if ever needed). */
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
  /* `??` NOT `||`, fixed 2026-08-24. `Number("0") || base` is `base`, so a deliberate
     `data-drift-y="0"` silently fell back to the DEFAULT_DRIFT_AMP of 6 - the engine could not be
     told "move on one axis only". Caught building the portal's horizontal-only drift, where the
     vertical budget is measured at ZERO on short viewports: two window pairs there are held apart
     by their vertical gap alone and 6px of it would have closed them.
     A zero amplitude is a legitimate value; only an ABSENT attribute should fall back. */
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
  // will-change is set ONLY while moving (see tick) and cleared on settle -> no permanent layers

  return {
    element,
    inner: element.querySelector('.js-magnetic-inner'),
    isMagnetic: element.classList.contains('js-magnetic'),
    clamp: Number(element.dataset.magnetClamp) || 0,
    strength: Number(element.dataset.strength) || DEFAULT_STRENGTH,
    strengthText: Number(element.dataset.strengthText) || DEFAULT_STRENGTH_TEXT,
    ampX: drift.ampX,
    ampY: drift.ampY,
    /* independent-speed sines -> Lissajous wander (breakdance: speedx != speedy). Per-element random
       phase + slight amplitude jitter so siblings never sync. */
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
    blend: 0,                                          // 0 = pure drift, 1 = pure magnet
    driftLevel: drift.ampX > 0 || drift.ampY > 0 ? 1 : 0, // graceful ramp 0..1
    onScreen: true,                                    // set by the cull IntersectionObserver
    promoted: false,                                   // true while will-change:transform is applied
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
      // element was removed (e.g. bench remount) -> prune so it can GC and the loop stays lean
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
      continue; // off-screen + at rest -> zero cost (activation culling)
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

    // magnet fully overrides drift at blend = 1
    const x = driftX * (1 - e.blend) + e.magX * e.blend;
    const y = driftY * (1 - e.blend) + e.magY * e.blend;

    const moving =
      e.driftLevel > SETTLE_EPSILON ||
      e.blend > SETTLE_EPSILON ||
      Math.abs(e.magX) > SETTLE_EPSILON ||
      Math.abs(e.magY) > SETTLE_EPSILON;

    /* THE TRANSLATE LANE. Rod 2026-08-25, approving the transform-lane rule as part of the cleanup.
       This used to write `transform`, which is the single property magnet, drift, tilt and every
       hover scale all reached for - so on any element carrying two of them the last writer silently
       won and the others did nothing. It had already forced `achievement-wall.js` to hardcode
       knowledge of a hover scale inside its tilt, which is exactly the coupling being removed.
       `translate` is its own property. The browser applies translate, then rotate, then scale, then
       transform, in that fixed order, always - so a movement behaviour and a size behaviour and a
       tilt now compose with no coordination at all.
       `will-change` names `translate` to match: promoting `transform` would promote a property this
       code no longer writes. */
    if (moving) {
      if (!e.promoted) {
        e.element.style.willChange = 'translate'; // promote ONLY while moving (frees mobile GPU memory)
        e.promoted = true;
      }
      e.element.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px 0`;
      if (e.inner) {
        const ratio = e.strengthText / e.strength;
        e.inner.style.translate = `${(e.magX * ratio * e.blend).toFixed(2)}px ${(e.magY * ratio * e.blend).toFixed(2)}px 0`;
      }
      anyBusy = true;
    } else if (e.promoted) {
      e.element.style.translate = 'none'; // settled -> drop the compositor layer
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
    rafId = null; // nothing visible drifting and nothing settling -> sleep
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

/* click border-flash: the phojanecki outline-ripple (button-kit/tags hover effect) fired on CLICK.
   outline + box-shadow paint outside the box, so a social's own overflow:hidden does NOT clip them. */
function bindClickFlash(element) {
  element.addEventListener('click', () => {
    element.classList.remove('dm-flash');
    void element.offsetWidth; // force reflow so the animation restarts on a repeat click
    element.classList.add('dm-flash');
  });
  element.addEventListener('animationend', (event) => {
    if (event.animationName === 'dm-border-fly') {
      element.classList.remove('dm-flash');
    }
  });
}

/* live re-read of an element's tunables (data-strength / -text / -drift[-x/-y] / -drift-speed) so a
   tuner can change them without a reload. No-op if the element was never registered. */
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
      document.body.classList.add('motion-off'); // Rule 89: respect the OS preference by default
    }
    // re-evaluate when the motion / cull toggles flip a body class
    new MutationObserver(() => wake()).observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
    // activation culling: track which elements are on-screen (+200px buffer)
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
    /* The axis attributes were readable but not COLLECTABLE: `readDrift` has understood
       `data-drift-x` / `data-drift-y` all along, but this selector only looked for `[data-drift]`,
       so an element carrying axes alone was never picked up and simply did not move. Found wiring
       the portal's horizontal-only drift - the attributes were on all 8 windows and travel measured
       exactly 0 on both axes. */
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

  // demo-only control; in production the motion switch is the repurposed slap toggle (body.motion-off)
  const motionBtn = root.querySelector('[data-motion-toggle]');
  if (motionBtn && !motionBtn.dataset.bound) {
    motionBtn.dataset.bound = '1';
    motionBtn.addEventListener('click', () => {
      const off = document.body.classList.toggle('motion-off');
      motionBtn.textContent = off ? 'turn motion on' : 'turn motion off';
    });
  }
}
