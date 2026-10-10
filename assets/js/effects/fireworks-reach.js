const TOP = 0.06;
const BOTTOM = 0.78;

function patch(controller) {
  if (!controller || controller.__reachPatched) return false;

  controller.createAutoFirework = function (source) {
    if (this.fireWorkGroup.length >= this.maxFireworks) return;

    const randomX = (Math.random() * 2 - 1) * 0.8;
    const screenY = (TOP + Math.random() * (BOTTOM - TOP)) * window.innerHeight;

    lastSpawns.push(screenY / window.innerHeight);
    if (lastSpawns.length > 200) lastSpawns.shift();

    this.createFireworkFromClick(
      (randomX * 0.5 + 0.5) * window.innerWidth,
      screenY,
      source,
    );
  };

  controller.__reachPatched = true;
  return true;
}

const lastSpawns = [];

window.__fireworkReach = {
  range: [TOP, BOTTOM],
  applied: false,
  samples: lastSpawns,
  report() {
    if (!lastSpawns.length) return 'no auto spawns observed yet';
    const min = Math.min(...lastSpawns);
    const max = Math.max(...lastSpawns);
    return {
      spawns: lastSpawns.length,
      highestBurst: (min * 100).toFixed(1) + '% down the viewport',
      lowestBurst: (max * 100).toFixed(1) + '% down the viewport',
      reachesTopFifth: min < 0.2,
    };
  },
};

let tries = 0;
const timer = setInterval(() => {
  if (patch(window.fireworkController)) {
    window.__fireworkReach.applied = true;
    clearInterval(timer);
  } else if (++tries > 40) {
    clearInterval(timer);
  }
}, 100);
