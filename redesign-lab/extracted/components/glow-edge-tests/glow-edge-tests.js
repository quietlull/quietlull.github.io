/* glow-edge-tests — one card per treatment, cloned from a single template so the treatment class
   is genuinely the only difference between panels. The cursor tracking, tilt, flip and video are
   the real expensive-card behaviours: this calls that component's own init rather than
   reimplementing it, so what Rod judges here is what would ship. */
import { init as initCards } from '../project-cards-expensive/project-cards-expensive.js';
import { onCursor } from '../cursor-coords/cursor-coords.js';

const TREATMENTS = [
  { k: '', name: 'A · baseline',
    why: 'What ships today: a 1.5px ring, hard-cut on both sides, with a bright spot sliding along it.' },
  { k: 'gedge--soft', name: 'B · soft edge',
    why: 'Blurs the ring so its two hard cuts become falloff. Attacks "constant width strip".' },
  { k: 'gedge--add', name: 'C · additive',
    why: 'Emits light instead of painting colour. Metal reflects a highlight; a lantern adds one.' },
  { k: 'gedge--tail', name: 'D · long tail',
    why: 'The hot spot fades along the band instead of ending. A short bright arc on a rail is the specular tell.' },
  { k: 'gedge--spill', name: 'E · inward spill',
    why: 'Light off an edge washes the surface beside it. The mask forbids that, so this adds it underneath.' },
  { k: 'gedge--dim', name: 'F · dim core',
    why: 'Same geometry, lower intensity. A blown-out white core reads specular; emission is dimmer and warmer.' },
  { k: 'gedge--round', name: 'G · round the light',
    why: 'Card stays exactly square. Only the glow ring rounds, so the band stops turning a hard mitre.' },
  { k: 'gedge--all', name: 'H · everything stacked',
    why: 'B + C + D + E + F + G together.' },
];

export function init(root) {
  const grid = root.querySelector('[data-gedge-grid]');
  const template = root.querySelector('[data-gedge-card]');
  if (!grid || !template) {
    return;
  }

  grid.textContent = '';
  for (const treatment of TREATMENTS) {
    const panel = document.createElement('div');
    panel.className = 'gedge__panel';

    const label = document.createElement('p');
    label.className = 'gedge__label';
    label.textContent = treatment.name;

    const card = document.createElement('div');
    card.className = 'gedge__card';
    card.append(template.content.cloneNode(true));
    if (treatment.k) {
      card.querySelector('.epx-cards').classList.add(treatment.k);
    }

    const why = document.createElement('p');
    why.className = 'gedge__why';
    why.textContent = treatment.why;

    panel.append(label, card, why);
    grid.append(panel);
  }

  /* bind AFTER the clones exist: the reveal collects its targets at init time */
  initCards(root);
  bindSync(root);
}

/* COMPARISON MODE. Normally the reveal lights only the card the cursor is actually over, which
   makes eight treatments impossible to compare: you can only ever see one lit. Synced mode takes
   the cursor's position relative to whichever card it is over and writes those SAME local
   coordinates to all eight, so every treatment lights identically at the same point and the only
   difference on screen is the treatment.
   This registers after the card component's own handler, and the broadcaster runs handlers in
   registration order, so this one overwrites per-frame. Turning it off restores real behaviour.
   The subscription is a module singleton over a REFRESHED list, matching every other cursor
   component here. Subscribing per init instead would strand a handler holding eight detached
   cards (and their videos) on every bench remount, which is exactly the teardown-twin rule in
   CONVENTIONS. */
let syncTilts = [];
let syncToggle = null;
let syncBound = false;

function bindSync(root) {
  syncToggle = root.querySelector('[data-gedge-sync]');
  syncTilts = [...root.querySelectorAll('.gedge__card .card-tilt')];
  if (syncBound || !syncToggle || !syncTilts.length) {
    return;
  }
  syncBound = true;
  onCursor((cx, cy) => {
    if (!syncToggle || !syncToggle.checked || !syncTilts.length) {
      return;
    }
    const hovered = syncTilts.find((tilt) => {
      const r = tilt.getBoundingClientRect();
      return cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
    }) || syncTilts[0];
    const from = hovered.getBoundingClientRect();
    const mx = cx - from.left;
    const my = cy - from.top;
    for (const tilt of syncTilts) {
      tilt.style.setProperty('--mx', `${mx}px`);
      tilt.style.setProperty('--my', `${my}px`);
    }
  });
}
