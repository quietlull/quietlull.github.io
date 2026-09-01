import {
  back2top, fireworksToggle,
  initAchievements, initCardTilt, initMouseTrail, initPageTransition,
  initToolTaglines, loadTooptip
} from '../components';

export function basic() {
  fireworksToggle();
  back2top();
  loadTooptip();
  initPageTransition();
  initAchievements();
  initCardTilt();
  initToolTaglines();
  initMouseTrail();
}
