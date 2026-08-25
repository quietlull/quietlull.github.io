import {
  back2top, fireworksToggle,
  initAchievements, initCardTilt, initMouseTrail, initPageTransition,
  initToolTaglines, loadTooptip, modeWatcher
} from '../components';

export function basic() {
  modeWatcher();
  fireworksToggle();
  back2top();
  loadTooptip();
  initPageTransition();
  initAchievements();
  initCardTilt();
  initToolTaglines();
  initMouseTrail();
}
