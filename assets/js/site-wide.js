import { initDrift } from './behaviours/drift.js';
import { initMagnet } from './behaviours/magnet.js';
import { initLineBoil } from './components/line-boil.js';
import { init as initCursorGlow } from './components/cursor-glow.js';

initDrift(document);
initMagnet(document);

document.querySelectorAll('.top-bar__logo').forEach((mark) => initLineBoil(mark));

initCursorGlow(document);
