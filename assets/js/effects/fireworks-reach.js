const TOP = 0.06;
const BOTTOM = 0.78;

function patch(controller) {
  controller.createAutoFirework = function (source) {
    if (this.fireWorkGroup.length >= this.maxFireworks) return;

    const randomX = (Math.random() * 2 - 1) * 0.8;
    const screenY = (TOP + Math.random() * (BOTTOM - TOP)) * window.innerHeight;

    this.createFireworkFromClick(
      (randomX * 0.5 + 0.5) * window.innerWidth,
      screenY,
      source,
    );
  };
}

let tries = 0;
const timer = setInterval(() => {
  if (window.fireworkController) {
    patch(window.fireworkController);
    clearInterval(timer);
  } else if (++tries > 40) {
    clearInterval(timer);
  }
}, 100);
