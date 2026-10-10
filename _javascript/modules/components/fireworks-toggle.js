const GATE_FRACTION = 0.3;

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

export function fireworksToggle() {
  window.addEventListener('scroll', apply, { passive: true });
  whenControllerReady(apply);
}

function apply() {
  const controller = window.fireworkController;
  if (!controller) return;

  const atTop = window.scrollY < window.innerHeight * GATE_FRACTION;
  const stillness = REDUCED_MOTION.matches;

  controller.setGreeting(atTop && !stillness);
}

function whenControllerReady(fn) {
  if (window.fireworkController) {
    fn();
    return;
  }

  const check = setInterval(() => {
    if (!window.fireworkController) return;
    fn();
    clearInterval(check);
  }, 500);

  setTimeout(() => clearInterval(check), 10000);
}
