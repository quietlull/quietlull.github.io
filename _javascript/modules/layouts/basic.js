import {
  back2top, fireworksToggle,
  initAchievements, initCardTilt, initMouseTrail, initPageTransition,
  initToolTaglines
} from '../components';

export function basic() {
  fireworksToggle();
  back2top();
  // loadTooptip() removed - Bootstrap tooltips are gone site-wide, see components.js.
  initPageTransition();
  initAchievements();
  initCardTilt();
  initToolTaglines();
  initMouseTrail();
}
