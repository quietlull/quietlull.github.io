/* slap-toggle behavior — ORIGINAL YarivFrd slap (codepen.io/YarivFrd/pen/PEOJLj). Reverted to the
   real rotateY slap-flip 2026-06-14 (the flap-tracks-active-label experiment lost the slap feel).
   The fixed-50% slap is correct where labels are equal-length — its homes are the hero background
   switch and the skills Technology<->Personal toggle (the bar uses gooey toggles now).
   - `.is-on` tracks the FIRST option (flap sits left when option A is selected);
   - the flap label swaps 180ms into the flip (matches the flap-text counter-rotation delay).
   Magnet rides the drift-magnet BASE (the consolidation). */
import { init as initMagnetic } from '../drift-magnet/drift-magnet.js';

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

    /* the flap overlays the selected side and swallowed its clicks — clicking it now
       flips to the other option, so the toggle works whichever side you hit (Rod).
       Dispatch a REAL change event (programmatic .checked fires nothing): the flap visual
       refreshes via the radio listener above AND page-level consumers (e.g. the landing's
       scene/bloom wiring) hear the switch — before this, flap clicks flipped only the visual. */
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
