import { TIERS } from '../utils/tier-scores';

const DRAG_THRESHOLD = 6;

export class TierBoard {
  constructor(root, { onToggle, onDragStart, onChange }) {
    this.root = root;
    this.pool = root.querySelector('[data-tier-pool]');
    this.rows = Object.fromEntries(TIERS.map((tier) => [tier, root.querySelector(`[data-tier-row="${tier}"]`)]));
    this.callbacks = { onToggle, onDragStart, onChange };
  }

  load(ids) {
    Object.values(this.rows).forEach((row) => row.replaceChildren());
    this.pool.replaceChildren(...ids.map((id) => this.createTile(id)));
    this.callbacks.onChange();
  }

  get complete() {
    return this.pool.children.length === 0;
  }

  placement() {
    const idsIn = (container) => [...container.children].map((tile) => tile.dataset.id);
    return Object.fromEntries(TIERS.map((tier) => [tier, idsIn(this.rows[tier])]));
  }

  setPlaying(id) {
    this.root.querySelectorAll('[data-id]').forEach((tile) => {
      tile.setAttribute('aria-pressed', tile.dataset.id === id);
    });
  }

  createTile(id) {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'kit-button kit-button--outline tier-tile';
    tile.innerHTML = '<i class="fas fa-play-circle tier-tile__icon" aria-hidden="true"></i>';
    tile.dataset.id = id;
    tile.setAttribute('aria-pressed', 'false');
    tile.setAttribute('aria-label', 'Sound clip');
    tile.addEventListener('pointerdown', (event) => this.startPointer(event, tile));
    tile.addEventListener('keydown', (event) => this.handleKey(event, tile));
    tile.addEventListener('click', (event) => {
      if (event.detail === 0) this.callbacks.onToggle(id);
    });
    return tile;
  }

  startPointer(event, tile) {
    if (event.button !== 0) return;
    const start = { x: event.clientX, y: event.clientY };
    let dragging = false;
    tile.setPointerCapture(event.pointerId);

    const move = (moveEvent) => {
      const dx = moveEvent.clientX - start.x;
      const dy = moveEvent.clientY - start.y;
      if (!dragging && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      if (!dragging) {
        dragging = true;
        tile.classList.add('is-dragging');
        this.callbacks.onDragStart();
      }
      tile.style.translate = `${dx}px ${dy}px`;
    };

    const end = (endEvent) => {
      tile.removeEventListener('pointermove', move);
      tile.removeEventListener('pointerup', end);
      tile.removeEventListener('pointercancel', end);
      if (!dragging) {
        if (endEvent.type === 'pointerup') this.callbacks.onToggle(tile.dataset.id);
        return;
      }
      tile.classList.remove('is-dragging');
      tile.style.translate = '';
      this.drop(tile, endEvent.clientX, endEvent.clientY);
    };

    tile.addEventListener('pointermove', move);
    tile.addEventListener('pointerup', end);
    tile.addEventListener('pointercancel', end);
  }

  drop(tile, x, y) {
    const target = document.elementFromPoint(x, y)?.closest('[data-tier-row], [data-tier-pool], .tier-board__row');
    if (!target) return;
    const container = target.matches('.tier-board__row') ? target.querySelector('[data-tier-row]') : target;
    const before = [...container.children].find((other) => {
      const rect = other.getBoundingClientRect();
      return other !== tile && (y < rect.top || (y < rect.bottom && x < rect.left + rect.width / 2));
    });
    container.insertBefore(tile, before ?? null);
    tile.focus();
    this.callbacks.onChange();
  }

  handleKey(event, tile) {
    const tier = event.key.toUpperCase();
    if (!TIERS.includes(tier)) return;
    event.preventDefault();
    this.callbacks.onDragStart();
    this.rows[tier].appendChild(tile);
    tile.focus();
    this.callbacks.onChange();
  }
}
