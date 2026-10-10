import { init as initMagnetic } from './components/drift-magnet.js';
import { initLineBoil } from './components/line-boil.js';
import { init as initCursorGlow } from './components/cursor-glow.js';

initMagnetic(document);

document.querySelectorAll('.top-bar__logo').forEach((mark) => initLineBoil(mark));

initCursorGlow(document);
