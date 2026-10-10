# Comments removed from `assets/js/components/slap-toggle.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `import { init as initMagnetic } from './drift-magnet.js';`

```text
slap-toggle behavior — ORIGINAL YarivFrd slap (codepen.io/YarivFrd/pen/PEOJLj). Reverted to the
  real rotateY slap-flip 2026-06-14 (the flap-tracks-active-label experiment lost the slap feel).
  The fixed-50% slap is correct where labels are equal-length — its homes are the hero background
  switch and the skills Technology<->Personal toggle (the bar uses gooey toggles now).
  - `.is-on` tracks the FIRST option (flap sits left when option A is selected);
  - the flap label swaps 180ms into the flip (matches the flap-text counter-rotation delay).
  Magnet rides the drift-magnet BASE (the consolidation).
```

### Line 36, above `const flap = control.querySelector('.slap-toggle__flap');`

```text
the flap overlays the selected side and swallowed its clicks — clicking it now
      flips to the other option, so the toggle works whichever side you hit (Rod).
      Dispatch a REAL change event (programmatic .checked fires nothing): the flap visual
      refreshes via the radio listener above AND page-level consumers (e.g. the landing's
      scene/bloom wiring) hear the switch — before this, flap clicks flipped only the visual.
```
