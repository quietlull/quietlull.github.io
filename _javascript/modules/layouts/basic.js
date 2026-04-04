import {
  back2top, breatheToggle, fireworksToggle,
  initAchievements, initPageTransition, loadTooptip, modeWatcher
} from '../components';

export function basic() {
  modeWatcher();
  breatheToggle();
  fireworksToggle();
  back2top();
  loadTooptip();
  initPageTransition();
  initAchievements();
}
