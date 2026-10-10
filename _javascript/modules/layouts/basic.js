import {
  back2top, fireworksToggle,
  initAchievements, initMouseTrail, initPageTransition
} from '../components';

export function basic() {
  fireworksToggle();
  back2top();
  initPageTransition();
  initAchievements();
  initMouseTrail();
}
