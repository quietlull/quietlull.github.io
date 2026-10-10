import {
  back2top, fireworksToggle,
  initAchievements, initCardTilt, initMouseTrail, initPageTransition,
  initToolTaglines
} from '../components';

export function basic() {
  fireworksToggle();
  back2top();
  initPageTransition();
  initAchievements();
  initCardTilt();
  initToolTaglines();
  initMouseTrail();
}
