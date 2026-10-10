import { init as initMagnetic } from './drift-magnet.js';

const FLAP_TEXT_SWAP_DELAY_MS = 180;

export function init(root = document) {
  initMagnetic(root);
  root.querySelectorAll('.slap-toggle__control').forEach((control) => {
    const flapText = control.querySelector('.slap-toggle__flap-text');
    const radios = [...control.querySelectorAll('.slap-toggle__radio')];
    const [firstRadio] = radios;

    function selectedLabel() {
      const checked = radios.find((radio) => radio.checked);
      return checked ? checked.nextElementSibling.textContent : '';
    }

    control.classList.toggle('is-on', firstRadio.checked);
    flapText.textContent = selectedLabel();

    function refresh() {
      control.classList.toggle('is-on', firstRadio.checked);
      setTimeout(() => {
        flapText.textContent = selectedLabel();
      }, FLAP_TEXT_SWAP_DELAY_MS);
    }

    radios.forEach((radio) => radio.addEventListener('change', refresh));

    const flap = control.querySelector('.slap-toggle__flap');
    flap.addEventListener('click', () => {
      const other = radios.find((radio) => !radio.checked);
      if (other) {
        other.checked = true;
        other.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });
}
