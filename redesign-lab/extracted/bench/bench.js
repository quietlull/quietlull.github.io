/* bench — mounts one extracted component at a time + per-element tuning.
   Deep link: ?c=<id>. Component contract: components/<id>/<id>.html (fragment),
   <id>.css, optional <id>.js exporting init(root), optional deps (CSS preloaded).
   Tunes persist via tune-store and flow out to aggregate.html. */
import { REGISTRY } from './registry.js';
import { loadTunes, saveTunes, applyTune } from './tune-store.js';
import { loadPalette, applyPalette } from './palette-store.js';
import { retune } from '../components/drift-magnet/drift-magnet.js';

applyPalette(loadPalette()); /* palette overrides recolor every component, every visit */

const menuElement = document.querySelector('[data-bench-menu]');
const mountElement = document.querySelector('[data-bench-mount]');
const titleElement = document.querySelector('[data-bench-title]');
const tuneRowsElement = document.querySelector('[data-bench-tune-rows]');

let tunes = loadTunes();
let activeEntry = null;

function componentUrl(id, extension) {
  return `components/${id}/${id}.${extension}`;
}

/* A dep is either a component id or, for the lab-wide sheets the standalone component pages used
   to link (decisions.css, foundations.css), a path. Anything with a slash is taken as a path. */
function cssHref(dep) {
  return dep.includes('/') ? dep : componentUrl(dep, 'css');
}

function ensureCss(dep) {
  if (!document.querySelector(`link[data-component-css="${dep}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssHref(dep);
    link.dataset.componentCss = dep;
    document.head.appendChild(link);
  }
}

/* Load exactly this entry's sheets and drop the previous entry's. Component CSS is class-scoped so
   leaving it loaded was harmless, but decisions.css restyles bare h1/h2/h3 and would follow you
   onto every component mounted after it. */
function syncCss(entry) {
  const wanted = [...(entry.deps || []), entry.id];
  document.querySelectorAll('link[data-component-css]').forEach((link) => {
    if (!wanted.includes(link.dataset.componentCss)) {
      link.remove();
    }
  });
  wanted.forEach(ensureCss);
}

function setActiveLink(activeId) {
  menuElement.querySelectorAll('a').forEach((link) => {
    link.classList.toggle('is-active', link.dataset.id === activeId);
  });
}

/* ---- tuning ---- */
const INTERACTION_DATA = { ms: 'strength', mst: 'strengthText', dx: 'driftX', dy: 'driftY', ds: 'driftSpeed' };

/* CSS knobs that affect ANY element. Conditional ones (gap, bloom, tspd) are added per element
   only when they'd actually change something. */
const BASE_CSS_PROPS = [
  ['mt', 'Margin top (px)'],
  ['mb', 'Margin bottom (px)'],
  ['z', 'Size (scale, e.g. 1.1)'],
  ['mw', 'Max width (px)'],
];

const STEP = (prop) =>
  prop === 'z' || prop === 'bloom' ? '0.05' : prop === 'tspd' ? '10' : prop === 'ds' ? '0.1' : '1';

/* magnetic elements whose INNERMOST [data-tune] group is this element — so a parent group doesn't
   repeat the magnet/drift controls its child group already owns. */
function magnetTargets(element) {
  const list = [...element.querySelectorAll('.js-magnetic')].filter(
    (el) => el.closest('[data-tune]') === element
  );
  if (element.classList.contains('js-magnetic')) {
    list.unshift(element);
  }
  return list;
}

/* a number-input grid for a [prop, label] list; onApply runs after each edit. */
function buildGrid(props, key, onApply) {
  const grid = document.createElement('div');
  grid.className = 'bench__tune-grid';
  props.forEach(([prop, label]) => {
    const wrap = document.createElement('span');
    const labelElement = document.createElement('label');
    labelElement.textContent = label;
    wrap.appendChild(labelElement);
    const input = document.createElement('input');
    input.type = 'number';
    input.step = STEP(prop);
    const current = tunes[key]?.[prop];
    input.value = current !== undefined && current !== '' ? current : '';
    input.addEventListener('input', () => {
      const value = input.value === '' ? '' : parseFloat(input.value);
      if (!tunes[key]) {
        tunes[key] = {};
      }
      tunes[key][prop] = value;
      saveTunes(tunes);
      onApply();
    });
    wrap.appendChild(input);
    grid.appendChild(wrap);
  });
  return grid;
}

function applyInteraction(targets, tune) {
  const has = (value) => value !== undefined && value !== null && value !== '';
  targets.forEach((el) => {
    Object.entries(INTERACTION_DATA).forEach(([prop, dataKey]) => {
      if (has(tune?.[prop])) {
        el.dataset[dataKey] = tune[prop];
      } else {
        delete el.dataset[dataKey];
      }
    });
    retune(el);
  });
}

function applyStoredTunes(entry) {
  mountElement.querySelectorAll('[data-tune]').forEach((element) => {
    const key = `${entry.id}|${element.dataset.tune}`;
    if (tunes[key]) {
      applyTune(element, tunes[key]);
      applyInteraction(magnetTargets(element), tunes[key]);
    }
  });
}

function renderTuner(entry) {
  tuneRowsElement.innerHTML = '';
  const elements = [...mountElement.querySelectorAll('[data-tune]')];
  if (!elements.length) {
    tuneRowsElement.innerHTML = '<p class="bench__hint">no tunable elements in this component.</p>';
    return;
  }
  elements.forEach((element) => {
    const key = `${entry.id}|${element.dataset.tune}`;
    const targets = magnetTargets(element);

    const row = document.createElement('div');
    row.className = 'bench__tune-row';

    const head = document.createElement('div');
    head.className = 'bench__tune-head';
    head.innerHTML = `<span>${element.dataset.tune}</span>`;
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'bench__tune-reset';
    reset.textContent = 'reset';
    reset.addEventListener('click', () => {
      delete tunes[key];
      saveTunes(tunes);
      applyTune(element, null);
      applyInteraction(targets, null);
      renderTuner(entry);
    });
    head.appendChild(reset);
    row.appendChild(head);

    // only the CSS knobs that actually affect THIS element
    const cssProps = [...BASE_CSS_PROPS];
    const display = getComputedStyle(element).display;
    if (display.includes('flex') || display.includes('grid')) {
      cssProps.push(['gap', 'Gap between children (px)']);
    }
    if (element.hasAttribute('data-bloom')) {
      cssProps.push(['bloom', 'Bloom (glow size multiplier)']);
    }
    if (element.hasAttribute('data-tspeed')) {
      cssProps.push(['tspd', 'Transition speed (ms, hover/active)']);
    }
    row.appendChild(buildGrid(cssProps, key, () => applyTune(element, tunes[key])));

    // magnet/drift only when this group actually owns magnetic elements
    if (targets.length) {
      const iProps = [['ms', 'Magnet strength (whole element)']];
      if (targets.some((t) => t.querySelector('.js-magnetic-inner'))) {
        iProps.push(['mst', 'Magnet strength (inner text / icon)']);
      }
      iProps.push(
        ['dx', 'Drift X (float amplitude, px)'],
        ['dy', 'Drift Y (float amplitude, px)'],
        ['ds', 'Drift speed (multiplier, 1 = default)']
      );
      row.appendChild(buildGrid(iProps, key, () => applyInteraction(targets, tunes[key])));
    }

    row.addEventListener('mouseenter', () => {
      element.style.outline = '2px dashed #ff8c00';
      element.style.outlineOffset = '3px';
    });
    row.addEventListener('mouseleave', () => {
      element.style.outline = '';
      element.style.outlineOffset = '';
    });
    tuneRowsElement.appendChild(row);
  });
}

/* ---- mounting ---- */
async function mount(entry) {
  activeEntry = entry;
  setActiveLink(entry.id);
  titleElement.textContent = entry.title;
  mountElement.innerHTML = '<p class="bench__loading">loading…</p>';

  syncCss(entry);

  const response = await fetch(componentUrl(entry.id, 'html'));
  if (!response.ok) {
    mountElement.innerHTML = `<p class="bench__loading">failed to load ${entry.id} (${response.status})</p>`;
    return;
  }
  mountElement.innerHTML = await response.text();
  /* Components converted from standalone demo pages carry their own widths and measure themselves
     against reservations read at viewport 1440. The 760px stage cap would make those readouts a
     lie, so those entries ask for the full stage instead. */
  mountElement.classList.toggle('bench__mount--wide', Boolean(entry.wide));

  if (entry.hasJs) {
    /* `jsFile` exists for one case: achievement-wall.js is the COMPONENT's behaviour, and its
       demo's knobs + tuner are bench chrome that must not move into it (D25). The chrome lives in
       a separate file and names itself here. Everywhere else the file is <id>.js. */
    const module = await import(`../components/${entry.id}/${entry.jsFile || entry.id}.js`);
    if (typeof module.init === 'function') {
      module.init(mountElement);
    }
  }

  applyStoredTunes(entry);
  renderTuner(entry);
}

function pickInitial() {
  const requested = new URLSearchParams(window.location.search).get('c');
  return REGISTRY.find((entry) => entry.id === requested) || REGISTRY[0];
}

REGISTRY.forEach((entry) => {
  const link = document.createElement('a');
  link.href = `?c=${entry.id}`;
  link.textContent = entry.title;
  link.title = entry.note;
  link.dataset.id = entry.id;
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.history.replaceState(null, '', `?c=${entry.id}`);
    mount(entry);
  });
  menuElement.appendChild(link);
});

document.querySelector('[data-bench-copy]').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const current = loadTunes();
  const count = Object.keys(current).length;
  const out = JSON.stringify(current, null, 2);
  const feedback = (text) => {
    button.textContent = text;
    setTimeout(() => {
      button.textContent = 'Copy tunes';
    }, 1800);
  };
  if (count === 0) {
    feedback('nothing tuned yet');
    return;
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(out)
      .then(() => feedback(`copied ${count} ✓`))
      .catch(() => window.prompt('Copy:', out));
  } else {
    window.prompt('Copy:', out);
  }
});

document.querySelector('[data-bench-reset]').addEventListener('click', () => {
  if (!window.confirm('Reset ALL element tunes (bench + aggregate bridge)?')) {
    return;
  }
  tunes = {};
  saveTunes(tunes);
  if (activeEntry) {
    mount(activeEntry);
  }
});

mount(pickInitial());
