import { basic, initSidebar, initSearchbar } from './modules/layouts';
import { initLocaleDatetime, loadImg } from './modules/components';
import * as THREE from 'three';
console.log('Three.js version:', THREE.REVISION);
loadImg();
initLocaleDatetime();
initSidebar();
initTopbar();
basic();
