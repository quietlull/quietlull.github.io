import {
  back2top, fireworksToggle,
  initAchievements, initMouseTrail, initPageTransition,
  initToolTaglines
} from '../components';

export function basic() {
  fireworksToggle();
  back2top();
  initPageTransition();
  initAchievements();
  initToolTaglines();
  initMouseTrail();
}
