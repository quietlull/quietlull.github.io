import { initDrift } from './behaviours/drift.js';
import { initMagnet } from './behaviours/magnet.js';
import { initTilt } from './behaviours/tilt.js';
import { initDwell } from './behaviours/dwell.js';
import { initTrackMouse } from './behaviours/track-mouse.js';
import { initHoverPlayVideo } from './behaviours/hover-play-video.js';
import { initLineBoil } from './components/line-boil.js';
import { init as initCursorGlow } from './components/cursor-glow.js';

initDrift(document);
initMagnet(document);
initTilt(document);
initDwell(document);
initTrackMouse(document);
initHoverPlayVideo(document);

document.querySelectorAll('.top-bar__logo').forEach((mark) => initLineBoil(mark));

initCursorGlow(document);
