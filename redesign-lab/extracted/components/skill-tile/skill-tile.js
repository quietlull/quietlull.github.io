/* skill-tile - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract is
   `export function init(root)`. The slap-toggle import moves to module scope, which is the
   only change; everything below is the page's code verbatim. */
import { init as initSlap } from '/redesign-lab/extracted/components/slap-toggle/slap-toggle.js';

export function init(root) {

  /* The two flippers are wired for real. F1 is slap-toggle's own JS, imported from its folder, so
     the behaviour is the component's and not a copy of it. */
  initSlap(root);

  const techFace = document.getElementById('row-v1');
  const personalFace = document.getElementById('row-v1-personal');

  function showFace(value) {
    const tech = value === 'tech';
    techFace.hidden = !tech;
    personalFace.hidden = tech;
  }

  /* both flippers drive the one row, and they mirror each other so the page never shows two
     switches disagreeing. That mirroring is demo scaffolding, not part of either component. */
  const allFlips = [...document.querySelectorAll('input[name="flip-f1"], input[name="flip-f2"]')];
  allFlips.forEach((radio) => {
    radio.addEventListener('change', () => {
      showFace(radio.value);
      allFlips.forEach((other) => {
        if (other !== radio && other.value === radio.value && !other.checked) {
          other.checked = true;
          other.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });
  });

  /* stephanewillems' track is clickable and JS-driven on their site; theirs has no <label> on it,
     so the click has to be wired rather than declared. */
  document.querySelectorAll('[data-flip-track]').forEach((track) => {
    track.addEventListener('click', () => {
      const group = [...track.closest('.sw-flip').querySelectorAll('.sw-flip__radio')];
      const other = group.find((radio) => !radio.checked);
      if (other) {
        other.checked = true;
        other.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });

  /* Rows 2 and 3 are clones of row 1 so there is exactly one copy of each mark in this file.
     The clone swaps the modifier class and adds the four corner boxes; nothing else changes, which
     is the point - the three rows differ only in their box. */
  const CORNERS = ['is--tl', 'is--tr', 'is--br', 'is--bl'];

  function buildRow(targetId, modifier) {
    const target = document.getElementById(targetId);
    [...techFace.children].forEach((slot) => {
      const copy = slot.cloneNode(true);
      const tile = copy.querySelector('.skill-tile');
      if (tile) {
        tile.classList.remove('skill-tile--bare');
        tile.classList.add(modifier);
        CORNERS.forEach((corner) => {
          const box = document.createElement('i');
          box.className = 'skill-tile__c ' + corner;
          tile.appendChild(box);
        });
      }
      target.appendChild(copy);
    });
  }

  buildRow('row-v2', 'skill-tile--brackets');
  buildRow('row-v3', 'skill-tile--frame');
}
