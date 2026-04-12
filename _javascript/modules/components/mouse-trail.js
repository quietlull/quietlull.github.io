/**
 * Mouse trail sparkler — night-market sparkler cursor effect.
 * Canvas2D overlay with additive blending, motion-blur lines,
 * life-based color gradient (white-hot → amber → deep orange).
 * Ring buffer pool for zero GC. Speed-based emission scaling.
 * Reactive: scroll sparks, color pickup from hovered elements.
 * Toggle via topbar switch, persisted in localStorage.
 * Mobile: touch burst. Respects prefers-reduced-motion.
 */

import { STORAGE_KEYS } from '../config/storage-keys';
const STORAGE_KEY = STORAGE_KEYS.SPARKLER;
const MAX_PARTICLES = 200;
const MAX_EMIT_PER_FRAME = 12;
const PARTICLE_LIFE = 30;
const PARTICLE_SIZE = 2.5;
const DRAG = 0.92;
const GRAVITY = 0.15;
const BURST_SPEED = 5;
const TOUCH_BURST = 20;
const INTERACTIVE_SELECTOR = '.card, a, button, .tool-icon, .breathe-switch, .fireworks-switch, .sparkler-switch, .post-tag, .pin-tag, .badge';

// Default amber theme — hot stays warm gold, never white
const THEME_DEFAULT = {
  hot: [255, 220, 120], mid: [251, 191, 36], cool: [249, 115, 22],
  tipColor: [255, 210, 100],
};

// Breathing animation names — used to auto-detect breathing elements for sparkler color
const BREATHE_PATTERN = /breathe|throb/;

// ── Color sampling utilities (shared via utils/color-utils) ──
import { parseRGB, isWarmColor } from '../utils/color-utils';

function findWarmColor(el) {
  if (!el) return null;

  // 1. Walk up the DOM looking for any breathing element — its animated
  //    borderColor is the strongest color signal. This auto-detects ALL
  //    breathing elements (current + future) without maintaining a list.
  let current = el;
  while (current && current !== document.documentElement) {
    const style = getComputedStyle(current);
    if (BREATHE_PATTERN.test(style.animationName)) {
      const rgb = parseRGB(style.borderColor);
      if (rgb && isWarmColor(rgb)) return rgb;
    }
    current = current.parentElement;
  }

  // 2. Fallback: check interactive ancestors (buttons, links, cards)
  const interactive = el.closest(INTERACTIVE_SELECTOR);
  if (interactive) {
    const style = getComputedStyle(interactive);
    for (const prop of ['borderColor', 'backgroundColor', 'color']) {
      const rgb = parseRGB(style[prop]);
      if (rgb && isWarmColor(rgb)) return rgb;
    }
  }

  // 3. Finally check the element itself
  const style = getComputedStyle(el);
  for (const prop of ['borderColor', 'backgroundColor', 'color']) {
    const rgb = parseRGB(style[prop]);
    if (rgb && isWarmColor(rgb)) return rgb;
  }

  return null;
}

function themeFromColor(rgb) {
  if (!rgb) return THEME_DEFAULT;
  const [r, g, b] = rgb;
  // Hot stays warm-tinted: boost red most, green less, blue barely
  return {
    hot: [Math.min(255, r + 40), Math.min(255, g + 25), Math.min(255, b + 5)],
    mid: [r, g, b],
    cool: [Math.max(0, r - 30), Math.max(0, g - 50), Math.max(0, b - 20)],
    tipColor: [Math.min(255, r + 30), Math.min(255, g + 15), Math.min(255, b + 5)],
  };
}

// ── Main sparkler ──

export function initMouseTrail() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Toggle setup
  const toggle = document.getElementById('sparkler-toggle');
  const checkbox = toggle ? toggle.querySelector('input[type="checkbox"]') : null;
  const saved = localStorage.getItem(STORAGE_KEY);
  let enabled = saved !== 'true';

  if (checkbox) checkbox.checked = enabled;

  // Canvas setup
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:500;pointer-events:none;';
  document.body.appendChild(canvas);
  if (!enabled) canvas.style.display = 'none';

  const ctx = canvas.getContext('2d', { alpha: true });

  // Ring buffer pool
  const pool = Array.from({ length: MAX_PARTICLES }, () => ({
    active: false, x: 0, y: 0, vx: 0, vy: 0,
    life: 0, maxLife: 0, size: 0,
    theme: THEME_DEFAULT
  }));
  let poolIndex = 0;

  let mouseX = 0, mouseY = 0;
  let lastMouseX = 0, lastMouseY = 0;
  let mouseOnPage = false;
  let animating = false;
  let lastTime = 0;
  let tipStreaks = null;
  let tipTimer = 0;
  let activeTheme = THEME_DEFAULT;
  let hoverCheckCount = 0;

  function setEnabled(val) {
    enabled = val;
    localStorage.setItem(STORAGE_KEY, val ? 'false' : 'true');
    if (val) {
      canvas.style.display = '';
      if (mouseOnPage) startLoop();
    } else {
      canvas.style.display = 'none';
      for (let i = 0; i < MAX_PARTICLES; i++) pool[i].active = false;
      animating = false;
    }
  }

  if (checkbox) {
    checkbox.addEventListener('change', () => setEnabled(checkbox.checked));
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function emit(x, y, count, speedMult) {
    if (!enabled) return;
    for (let i = 0; i < count; i++) {
      const p = pool[poolIndex];
      p.active = true;
      p.x = x + (Math.random() - 0.5) * 4;
      p.y = y + (Math.random() - 0.5) * 4;

      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * BURST_SPEED + 1.5) * speedMult;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;

      p.maxLife = PARTICLE_LIFE * (0.6 + Math.random() * 0.4);
      p.life = p.maxLife;
      p.size = PARTICLE_SIZE * (0.6 + Math.random() * 0.4);
      p.theme = activeTheme;

      poolIndex = (poolIndex + 1) % MAX_PARTICLES;
    }
    startLoop();
  }

  function startLoop() {
    if (animating || !enabled) return;
    animating = true;
    lastTime = performance.now();
    requestAnimationFrame(animate);
  }

  function animate(now) {
    if (!enabled) { animating = false; return; }

    const rawDelta = (now - lastTime) / (1000 / 60);
    const delta = Math.min(rawDelta, 3);
    lastTime = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';

    let anyActive = false;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = pool[i];
      if (!p.active) continue;

      p.vx *= Math.pow(DRAG, delta);
      p.vy *= Math.pow(DRAG, delta);
      p.vy += GRAVITY * delta;
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.life -= delta;

      if (p.life <= 0) {
        p.active = false;
        continue;
      }

      anyActive = true;
      const t = p.life / p.maxLife;
      const theme = p.theme;

      let r, g, b;
      if (t > 0.7) {
        [r, g, b] = theme.hot;
      } else if (t > 0.3) {
        [r, g, b] = theme.mid;
      } else {
        [r, g, b] = theme.cool;
      }

      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * 1.5, p.y - p.vy * 1.5);
      ctx.strokeStyle = `rgba(${r},${g},${b},${t})`;
      ctx.lineWidth = p.size * t;
      ctx.stroke();
    }

    // Sparkler tip — jagged radial streaks
    if (mouseOnPage) {
      tipTimer--;
      if (!tipStreaks || tipTimer <= 0) {
        tipTimer = 4 + Math.floor(Math.random() * 4);
        tipStreaks = [];
        const count = 5 + Math.floor(Math.random() * 5);
        for (let i = 0; i < count; i++) {
          tipStreaks.push({
            angle: Math.random() * Math.PI * 2,
            len: 6 + Math.random() * 16,
            alpha: 0.2 + Math.random() * 0.6,
            width: 0.4 + Math.random() * 2.2,
          });
        }
      }

      const [tr, tg, tb] = activeTheme.tipColor;
      for (const s of tipStreaks) {
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(
          mouseX + Math.cos(s.angle) * s.len,
          mouseY + Math.sin(s.angle) * s.len
        );
        ctx.strokeStyle = `rgba(${tr},${tg},${tb},${s.alpha})`;
        ctx.lineWidth = s.width;
        ctx.stroke();
      }
    }

    if (anyActive || mouseOnPage) {
      requestAnimationFrame(animate);
    } else {
      animating = false;
    }
  }

  // Track mouse presence
  document.addEventListener('mouseenter', () => {
    mouseOnPage = true;
    startLoop();
  });
  document.addEventListener('mouseleave', () => {
    mouseOnPage = false;
    activeTheme = THEME_DEFAULT;
  });

  // Desktop: speed-based emission + color sampling on mousemove
  let lastEmitTime = 0;
  document.addEventListener('mousemove', (e) => {
    mouseOnPage = true;
    const now = performance.now();
    if (now - lastEmitTime < 16) return;
    lastEmitTime = now;

    mouseX = e.clientX;
    mouseY = e.clientY;

    // Color sampling — every ~100ms (every 6th tick)
    hoverCheckCount++;
    if (hoverCheckCount % 6 === 0) {
      const el = document.elementFromPoint(mouseX, mouseY);
      const warmRGB = findWarmColor(el);
      activeTheme = themeFromColor(warmRGB);
    }

    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 2) {
      const count = Math.min(Math.floor(speed * 0.4), MAX_EMIT_PER_FRAME);
      emit(mouseX, mouseY, count, 1.2);
    }

    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }, { passive: true });

  // Scroll sparks — emit at cursor position based on scroll speed
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (!enabled || !mouseOnPage) return;
    const dy = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
    if (dy > 2) {
      const count = Math.min(Math.floor(dy * 0.3), MAX_EMIT_PER_FRAME);
      emit(mouseX, mouseY, count, 0.8);
    }
  }, { passive: true });

  // Mobile: burst on touch
  document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    emit(touch.clientX, touch.clientY, TOUCH_BURST, 1.5);
  }, { passive: true });

  // Expose burst for page transitions
  window.sparklerBurst = (x, y) => {
    emit(x, y, 30, 2.0);
  };
}
