import { basic, initSearchbar } from './modules/layouts';

import {
  loadImg,
  imgPopup,
  initLocaleDatetime,
  initClipboard,
  initToc,
  loadMermaid,
  initPostEnhance
} from './modules/components';

loadImg();
initToc();
imgPopup();
initLocaleDatetime();
initClipboard();
loadMermaid();
initPostEnhance();
basic();
