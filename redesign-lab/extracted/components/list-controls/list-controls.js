/* list-controls behavior — hana caret discipline (decorative caret hides once the field has
   text), demo filter switching, magnetic on the filters. */
import { init as initMagnetic } from '../drift-magnet/drift-magnet.js';

export function init(root = document) {
  initMagnetic(root);

  const search = root.querySelector('.js-search');
  if (search) {
    const input = search.querySelector('input');
    input.addEventListener('input', () => {
      search.classList.toggle('has-text', input.value !== '');
    });
  }

  root.querySelectorAll('.list-controls__filter').forEach((filter) => {
    filter.addEventListener('click', () => {
      root.querySelectorAll('.list-controls__filter').forEach((other) => {
        other.classList.toggle('is-active', other === filter);
      });
    });
  });
}
