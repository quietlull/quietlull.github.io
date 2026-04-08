import {
  back2top, breatheToggle, fireworksToggle,
  initAchievements, initCardTilt, initMouseTrail, initPageTransition,
  initToolTaglines, loadTooptip, modeWatcher
} from '../components';

export function basic() {
  modeWatcher();
  breatheToggle();
  fireworksToggle();
  back2top();
  loadTooptip();
  initPageTransition();
  initAchievements();
  initCardTilt();
  initToolTaglines();
  initMouseTrail();
}
