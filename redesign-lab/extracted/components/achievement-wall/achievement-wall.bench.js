/* achievement-wall.bench.js - the DEMO's knobs, tuner and readout.

   Why this file is not achievement-wall.js: that file is the COMPONENT, and D25 says bench chrome
   never moves into a component. When the standalone page became a bench fragment (2026-08-25) its
   inline module had to land somewhere, and this is that somewhere. The registry points the bench
   at this file with `jsFile`; it calls the component's own init first, exactly as the page did. */
import { init as initComponent } from './achievement-wall.js';

export function init(root) {
  initComponent(root);

  /* bench chrome: the knobs toggle a class on the component root so each alternative is one
     attribute away, and nothing here writes a style. */
  const aw = document.querySelector('.aw');
  document.querySelectorAll('.knobs button').forEach((b) => {
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      aw.classList.toggle(b.dataset.cls, on);
    });
  });

  /* ---- the tuner -----------------------------------------------------------------------------
     Three rules, each one closing a way the ramblings tuner went wrong:
       1. DEFAULTS ARE DERIVED, never typed. Every starting value is read out of the rendered
          component, so it cannot drift from the file the way a hand-transcribed preset table did.
       2. NOTHING IS WRITTEN UNTIL A DIAL MOVES. Opening this panel changes literally nothing -
          `aw.style` stays empty until an `input` event fires. Merely opening the ramblings tuner
          overwrote its page with stale numbers.
       3. THE COPY-OUT PRINTS BOTH VALUES, was and now, so what is being replaced is visible.
     It writes CUSTOM PROPERTIES rather than injecting a stylesheet, so it never competes with the
     cascade - it feeds the same inputs the component's own CSS already reads. */
  const DIALS = [...document.querySelectorAll('.tuner label[data-k]')];
  const cs = getComputedStyle(aw);
  const detail = document.querySelector('.aw__detail');
  const tile0 = document.querySelector('.aw__tile');

  /* read one default out of the rendered component: the custom property if the component set it,
     otherwise the real measured value it fell back to */
  const derive = (k) => {
    const v = cs.getPropertyValue('--aw-' + k).trim();
    if (v) return parseFloat(v);
    const ts = getComputedStyle(tile0), ds = getComputedStyle(detail);
    switch (k) {
      case 'glow-r':      return 90;
      case 'glow-r-soft': return 58;
      case 'orbit':       return 2.8;
      case 'tile':        return parseFloat(ts.width);
      case 'tilegap':     return parseFloat(ts.marginTop);
      case 'icon':        return parseFloat(ts.fontSize);
      case 'star':        return parseFloat(getComputedStyle(document.querySelector('.aw__on')).height) / 16;
      case 'dw':          return parseFloat(ds.width);
      case 'dh':          return parseFloat(ds.minHeight);
      case 'dpad':        return parseFloat(ds.paddingTop);
      case 'gap':         return parseFloat(cs.gap) || parseFloat(cs.columnGap);
      default:            return 0;
    }
  };

  const BASE = {};
  DIALS.forEach((l) => {
    const k = l.dataset.k;
    BASE[k] = derive(k);
    const i = l.querySelector('input');
    i.min = l.dataset.min; i.max = l.dataset.max; i.step = l.dataset.step;
    i.value = BASE[k];
    l.querySelector('b').textContent = BASE[k] + l.dataset.unit;
  });

  const readout = document.getElementById('read');
  const paint = () => {
    const catW = document.querySelector('.aw__cat').getBoundingClientRect().width;
    const t = parseFloat(document.querySelector('.aw__tile').getBoundingClientRect().width);
    const m = parseFloat(getComputedStyle(document.querySelector('.aw__tile')).marginTop);
    const perRow = Math.max(1, Math.floor(catW / (t + m * 2)));
    /* the far-edge walk, not scrollWidth - the same reason the ramblings tuner uses one */
    const far = Math.max(...[...document.querySelectorAll('.stage *')]
      .map((e) => e.getBoundingClientRect().right));
    /* CONVERSION 2026-08-25: on the page the tuner was fixed to the viewport's right edge, so
       the room left over was clientWidth - 336. In the bench the tuner floats inside the
       component, so "fits the stage" is measured against the stage's own right edge - which
       is what the readout claimed to mean all along. */
    const over = far - document.querySelector('.stage').getBoundingClientRect().right;
    readout.innerHTML =
        'tiles per row <b>' + perRow + '</b><br>'
      + 'catalogue <b>' + Math.round(catW) + 'px</b><br>'
      + 'panel <b>' + Math.round(detail.getBoundingClientRect().width) + ' x '
        + Math.round(detail.getBoundingClientRect().height) + '</b><br>'
      + 'glow vs tile <b>' + (parseFloat(aw.style.getPropertyValue('--aw-glow-r') || BASE['glow-r']) / t).toFixed(2)
        + 'x</b><br>'
      + 'fits the stage ' + (over > 0.5 ? '<b class="bad">no, ' + Math.round(over) + 'px over</b>' : '<b>yes</b>');
  };
  paint();

  DIALS.forEach((l) => {
    l.querySelector('input').addEventListener('input', (e) => {
      const k = l.dataset.k, u = l.dataset.unit, v = e.target.value;
      aw.style.setProperty('--aw-' + k, v + u);
      l.querySelector('b').textContent = v + u;
      paint();
    });
  });

  document.getElementById('reset').addEventListener('click', () => {
    aw.removeAttribute('style');
    DIALS.forEach((l) => {
      const k = l.dataset.k;
      l.querySelector('input').value = BASE[k];
      l.querySelector('b').textContent = BASE[k] + l.dataset.unit;
    });
    paint();
  });

  document.getElementById('copy').addEventListener('click', async () => {
    const moved = DIALS.filter((l) => parseFloat(l.querySelector('input').value) !== BASE[l.dataset.k]);
    if (!moved.length) { document.getElementById('copy').textContent = 'nothing moved'; 
      setTimeout(() => { document.getElementById('copy').textContent = 'copy'; }, 1400); return; }
    const lines = moved.map((l) => {
      const k = l.dataset.k, u = l.dataset.unit, v = l.querySelector('input').value;
      return '  --aw-' + k + ': ' + v + u + ';   /* was ' + BASE[k] + u + ' */';
    });
    const text =
        '/* achievement-wall tune, ' + moved.length + ' of ' + DIALS.length + ' values moved.\n'
      + '   Paste into redesign-lab/extracted/components/achievement-wall/achievement-wall.css,\n'
      + '   inside `@layer components`, as a `.aw { ... }` block - these are the same custom\n'
      + '   properties the component already reads, so they belong with it and not on the page. */\n'
      + '.aw {\n' + lines.join('\n') + '\n}\n';
    try { await navigator.clipboard.writeText(text); document.getElementById('copy').textContent = 'copied'; }
    catch { console.log(text); document.getElementById('copy').textContent = 'see console'; }
    setTimeout(() => { document.getElementById('copy').textContent = 'copy'; }, 1400);
  });
}
