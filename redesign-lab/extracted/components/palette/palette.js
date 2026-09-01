/* palette — live editor for every color token (settings.css). Hex tokens get a color
   picker; alpha tokens get a text field. Changes apply instantly across the whole bench
   (and aggregate.html via its reader) and persist until reset. */
import { loadPalette, savePalette, applyPalette } from '../../bench/palette-store.js';

const TOKENS = [
  { group: 'Core palette', items: [
    { token: '--color-night', label: 'night ground', kind: 'hex' },
    { token: '--color-night-2', label: 'night 2 (gradient partner)', kind: 'hex' },
    { token: '--color-text', label: 'text', kind: 'hex' },
    { token: '--color-muted', label: 'muted text', kind: 'hex' },
    { token: '--color-gold', label: 'gold (primary accent)', kind: 'hex' },
    { token: '--color-gold-deep', label: 'gold deep (headers, accents)', kind: 'hex' },
    { token: '--color-glow', label: 'glow orange (ignite, flap)', kind: 'hex' },
    { token: '--color-glow-soft', label: 'glow soft (warm highlights)', kind: 'hex' },
    { token: '--color-accent-cool', label: 'cool accent (harumaki teal-cyan; alt cobalt #1830a8)', kind: 'hex' },
  ] },
  { group: 'Surfaces & lines', items: [
    { token: '--color-panel', label: 'panel (translucent night)', kind: 'text' },
    { token: '--color-panel-solid', label: 'panel solid', kind: 'hex' },
    { token: '--color-glass', label: 'top-bar glass', kind: 'text' },
    { token: '--color-line', label: 'gold hairline', kind: 'text' },
    { token: '--color-line-soft', label: 'neutral hairline', kind: 'text' },
    { token: '--color-line-faint', label: 'whisper hairline', kind: 'text' },
    { token: '--color-surface', label: 'chip/input fill', kind: 'text' },
    { token: '--color-surface-faint', label: 'faint fill', kind: 'text' },
  ] },
  { group: 'Component anchors', items: [
    { token: '--color-ink', label: 'ink on gold', kind: 'hex' },
    { token: '--color-cover-hi', label: 'card cover top', kind: 'hex' },
    { token: '--color-cover-lo', label: 'card cover bottom / band', kind: 'hex' },
    { token: '--color-warm-muted', label: 'cream text on covers', kind: 'text' },
    { token: '--color-stamp-paper', label: 'stamp paper', kind: 'hex' },
    { token: '--color-code-bg', label: 'code background', kind: 'hex' },
    { token: '--color-code-text', label: 'code text', kind: 'hex' },
    { token: '--color-code-green', label: 'code green', kind: 'hex' },
    { token: '--color-icon-stroke', label: 'icon stroke (rest)', kind: 'hex' },
  ] },
];

function currentValue(token) {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

export function init(root = document) {
  const host = root.querySelector('.palette');
  if (!host) {
    return;
  }
  let overrides = loadPalette();

  TOKENS.forEach(({ group, items }) => {
    const heading = document.createElement('h3');
    heading.className = 'palette__group';
    heading.textContent = group;
    host.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'palette__grid';
    items.forEach(({ token, label, kind }) => {
      const row = document.createElement('div');
      row.className = 'palette__row';

      const swatch = document.createElement('span');
      swatch.className = 'palette__swatch';
      swatch.style.background = `var(${token})`;
      row.appendChild(swatch);

      const meta = document.createElement('div');
      meta.className = 'palette__meta';
      meta.innerHTML = `<span class="palette__label">${label}</span><code class="palette__token">${token}</code>`;
      row.appendChild(meta);

      const input = document.createElement('input');
      input.className = 'palette__input';
      const value = overrides[token] || currentValue(token);
      if (kind === 'hex') {
        input.type = 'color';
        input.value = value.startsWith('#') ? value : '#000000';
      } else {
        input.type = 'text';
        input.value = value;
        input.spellcheck = false;
      }
      input.addEventListener('input', () => {
        overrides[token] = input.value;
        savePalette(overrides);
        applyPalette({ [token]: input.value });
      });
      row.appendChild(input);
      grid.appendChild(row);
    });
    host.appendChild(grid);
  });

  const reset = root.querySelector('.js-palette-reset');
  reset.addEventListener('click', () => {
    if (!window.confirm('Reset ALL palette overrides back to settings.css?')) {
      return;
    }
    Object.keys(overrides).forEach((token) => applyPalette({ [token]: '' }));
    overrides = {};
    savePalette(overrides);
    window.location.reload();
  });
}
