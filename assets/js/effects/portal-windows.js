const REF_W = 500;
const REF_H = 520;

const MIN_SCALE = 1;
const MAX_SCALE = 2.4;
const STRENGTH = 0.24;
const RADIUS = 150;
const MAX_LEAN = 10;
const RETURN = 0.08;

const BOUNCE = 0.55;
const FRICTION = 0.94;
const DRAG_SLOP = 4;
const MAX_THROW = 60;
const VEL_SMOOTH = 0.6;
const LEAD_MIN_RATIO = 1.6;

function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

function init(field) {
  if (!field) return;
  const windows = [...field.querySelectorAll('.pwin')];
  if (!windows.length) return;

  const state = windows.map((el) => {
    const baseW = parseFloat(el.dataset.w);
    const baseH = parseFloat(el.dataset.h);
    const home0 = {
      x: clamp(parseFloat(el.dataset.x) / (REF_W - baseW), 0, 1),
      y: clamp(parseFloat(el.dataset.y) / (REF_H - baseH), 0, 1),
    };
    return {
      el,
      baseW,
      baseH,
      w: baseW,
      h: baseH,
      frac: { ...home0 },
      home0,
      closed: false,
      pos: { x: 0, y: 0 },
      vel: { x: 0, y: 0 },
      lean: { x: 0, y: 0 },
      pending: false,
      dragging: false,
      start: { x: 0, y: 0 },
      grab: { x: 0, y: 0 },
    };
  });

  const stillness = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = { x: -9999, y: -9999, inside: false };

  field.addEventListener('pointermove', (e) => {
    const r = field.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
    pointer.inside = true;
    wake();
  });
  field.addEventListener('pointerleave', () => { pointer.inside = false; wake(); });

  function layout() {
    const fw = field.clientWidth;
    const fh = field.clientHeight;
    if (fw < 1 || fh < 1) return;
    const scale = clamp(Math.min(fw / REF_W, fh / REF_H), MIN_SCALE, MAX_SCALE);
    const barH = Math.round(clamp(27 * scale, 24, 44));
    field.style.setProperty('--bar-h', `${barH}px`);
    field.style.setProperty('--pscale', scale.toFixed(3));

    for (const w of state) {
      w.w = Math.round(w.baseW * scale);
      w.h = Math.round(w.baseH * scale);
      w.el.style.setProperty('--win-h', `${w.h}px`);
      w.el.style.setProperty('--win-w', `${w.w}px`);
    }

    for (const w of state) {
      const bar = w.el.querySelector('.pwin__bar');
      const title = w.el.querySelector('.pwin__title');
      if (!bar || !title) continue;
      const close = w.el.querySelector('.pwin__close');
      const bs = getComputedStyle(bar);
      const need = Math.ceil(
        title.scrollWidth
        + (close ? close.offsetWidth : 0)
        + parseFloat(bs.paddingLeft) + parseFloat(bs.paddingRight)
        + (parseFloat(bs.columnGap) || 0)
        + 4
      );
      const wanted = Math.min(need, Math.round(fw * 0.9));
      if (wanted > w.w) {
        w.w = wanted;
        w.el.style.setProperty('--win-w', `${w.w}px`);
      }

      if (w.el.classList.contains('pwin--social') && w.h !== w.w) {
        w.h = w.w;
        w.el.style.setProperty('--win-h', `${w.h}px`);
      }
    }

    const tallestSocial = state.reduce(
      (tallest, w) => (w.el.classList.contains('pwin--social') ? Math.max(tallest, w.h) : tallest), 0
    );
    const leadFloor = Math.round(tallestSocial * LEAD_MIN_RATIO);
    for (const w of state) {
      if (!w.el.classList.contains('pwin--lead')) continue;
      if (w.h < leadFloor) {
        w.h = leadFloor;
        w.el.style.setProperty('--win-h', `${w.h}px`);
      }
    }

    for (const w of state) {
      w.pos.x = w.frac.x * Math.max(0, fw - w.w);
      w.pos.y = w.frac.y * Math.max(0, fh - w.h);
    }
  }

  function recordHome(w) {
    const fw = field.clientWidth;
    const fh = field.clientHeight;
    w.frac.x = fw - w.w > 0 ? clamp(w.pos.x / (fw - w.w), 0, 1) : 0;
    w.frac.y = fh - w.h > 0 ? clamp(w.pos.y / (fh - w.h), 0, 1) : 0;
  }

  state.forEach((w) => {
    const bar = w.el.querySelector('.pwin__bar');

    w.el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      if (e.pointerType === 'touch' && !(bar && bar.contains(e.target))) return;
      if (e.target.closest('.pwin__close')) return;
      const r = field.getBoundingClientRect();
      w.pending = true;
      w.vel.x = 0; w.vel.y = 0;
      w.start.x = e.clientX; w.start.y = e.clientY;
      w.grab.x = (e.clientX - r.left) - w.pos.x;
      w.grab.y = (e.clientY - r.top) - w.pos.y;
    });

    w.el.addEventListener('pointermove', (e) => {
      if (!w.pending && !w.dragging) return;

      if (w.pending && !w.dragging) {
        if (Math.hypot(e.clientX - w.start.x, e.clientY - w.start.y) < DRAG_SLOP) return;
        w.dragging = true;
        w.el.classList.add('is-dragging');
        try { w.el.setPointerCapture(e.pointerId); } catch {}
        state.forEach((o) => { o.el.style.zIndex = o === w ? 30 : 10; });
      }

      const r = field.getBoundingClientRect();
      const nx = (e.clientX - r.left) - w.grab.x;
      const ny = (e.clientY - r.top) - w.grab.y;
      w.vel.x = w.vel.x * (1 - VEL_SMOOTH) + (nx - w.pos.x) * VEL_SMOOTH;
      w.vel.y = w.vel.y * (1 - VEL_SMOOTH) + (ny - w.pos.y) * VEL_SMOOTH;
      w.pos.x = nx;
      w.pos.y = ny;
      e.preventDefault();
      wake();
    });

    w.el.addEventListener('dragstart', (e) => e.preventDefault());

    const release = () => {
      w.pending = false;
      if (!w.dragging) return;
      w.dragging = false;
      w.el.classList.remove('is-dragging');
      w.vel.x = clamp(w.vel.x, -MAX_THROW, MAX_THROW);
      w.vel.y = clamp(w.vel.y, -MAX_THROW, MAX_THROW);
      recordHome(w);
      wake();
    };
    w.el.addEventListener('pointerup', release);
    w.el.addEventListener('pointercancel', release);

    const closeButton = w.el.querySelector('.pwin__close');
    if (closeButton) {
      closeButton.addEventListener('pointerdown', (e) => e.stopPropagation());
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        w.closed = true;
        w.el.classList.add('is-closed');
        w.vel.x = 0;
        w.vel.y = 0;
        w.lean.x = 0;
        w.lean.y = 0;
        syncReset();
      });
    }
  });

  const centre = field.querySelector('.centre');

  function syncReset() {
    const anyClosed = state.some((w) => w.closed);
    if (centre) centre.classList.toggle('can-reset', anyClosed);
  }

  function restoreAll() {
    if (!state.some((w) => w.closed)) return;
    for (const w of state) {
      w.closed = false;
      w.el.classList.remove('is-closed');
      w.frac.x = w.home0.x;
      w.frac.y = w.home0.y;
      w.vel.x = 0;
      w.vel.y = 0;
      w.lean.x = 0;
      w.lean.y = 0;
    }
    layout();
    syncReset();
    wake();
  }

  if (centre) {
    centre.addEventListener('click', restoreAll);
    centre.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        restoreAll();
      }
    });
  }

  function frame() {
    const fw = field.clientWidth;
    const fh = field.clientHeight;
    let busy = false;

    for (const w of state) {
      if (w.closed) continue;

      const maxX = Math.max(0, fw - w.w);
      const maxY = Math.max(0, fh - w.el.offsetHeight);

      if (w.dragging) {
        w.pos.x = clamp(w.pos.x, 0, maxX);
        w.pos.y = clamp(w.pos.y, 0, maxY);
        w.lean.x = 0;
        w.lean.y = 0;
        busy = true;
      } else if (Math.abs(w.vel.x) > 0.1 || Math.abs(w.vel.y) > 0.1) {
        w.pos.x += w.vel.x;
        w.pos.y += w.vel.y;
        if (w.pos.x < 0) { w.pos.x = 0; w.vel.x = -w.vel.x * BOUNCE; }
        if (w.pos.y < 0) { w.pos.y = 0; w.vel.y = -w.vel.y * BOUNCE; }
        if (w.pos.x > maxX) { w.pos.x = maxX; w.vel.x = -w.vel.x * BOUNCE; }
        if (w.pos.y > maxY) { w.pos.y = maxY; w.vel.y = -w.vel.y * BOUNCE; }
        w.vel.x *= FRICTION;
        w.vel.y *= FRICTION;
        recordHome(w);
        busy = true;
      }

      if (!w.dragging) {
        let tx = 0;
        let ty = 0;
        if (pointer.inside && !stillness.matches) {
          const dx = pointer.x - (w.pos.x + w.w / 2);
          const dy = pointer.y - (w.pos.y + w.el.offsetHeight / 2);
          const dist = Math.hypot(dx, dy);
          if (dist < RADIUS && dist > 0.001) {
            const falloff = 1 - dist / RADIUS;
            tx = dx * STRENGTH * falloff;
            ty = dy * STRENGTH * falloff;
            const lean = Math.hypot(tx, ty);
            if (lean > MAX_LEAN) { tx = (tx / lean) * MAX_LEAN; ty = (ty / lean) * MAX_LEAN; }
          }
        }
        w.lean.x += (tx - w.lean.x) * RETURN;
        w.lean.y += (ty - w.lean.y) * RETURN;
        if (Math.abs(w.lean.x) > 0.01 || Math.abs(w.lean.y) > 0.01) busy = true;
      }

      w.el.style.transform =
        `translate3d(${(w.pos.x + w.lean.x).toFixed(1)}px, ${(w.pos.y + w.lean.y).toFixed(1)}px, 0)`;
    }

    raf = busy || pointer.inside ? requestAnimationFrame(frame) : null;
  }

  let raf = null;
  function wake() { if (raf === null) raf = requestAnimationFrame(frame); }

  layout();
  syncReset();
  wake();

  new ResizeObserver(() => { layout(); wake(); }).observe(field);
  window.addEventListener('load', () => { layout(); wake(); }, { once: true });

  document.fonts.ready.then(() => { layout(); wake(); });

  window.addEventListener('pagehide', () => {
    if (raf !== null) cancelAnimationFrame(raf);
  }, { once: true });
}

init(document.querySelector('.field'));
