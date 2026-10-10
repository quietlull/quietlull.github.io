import { basic } from './modules/layouts';

import {
  loadImg,
  imgPopup,
  initClipboard,
  initToc,
  loadMermaid,
  initPostEnhance
} from './modules/components';

loadImg();
initToc();
imgPopup();
initClipboard();
loadMermaid();
initPostEnhance();
basic();
