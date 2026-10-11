const DWELL_MS = 900;
const DWELL_RESET_PX = 48;

function setupCard(card, ring) {
  const flipper = card.querySelector('.card-flipper');
  let dwellTimer = null;
  let dwellAnchor = null;

  const startDwell = (x, y) => {
    if (flipper.classList.contains('is-flipped')) {
      return;
    }
    dwellAnchor = { x, y };
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.classList.remove('is-filling');
    void ring.offsetWidth;
    ring.classList.add('is-on', 'is-filling');
    clearTimeout(dwellTimer);
    dwellTimer = setTimeout(() => {
      flipper.classList.add('is-flipped');
      ring.classList.remove('is-on', 'is-filling');
      dwellTimer = null;
      dwellAnchor = null;
    }, DWELL_MS);
  };

  const stopDwell = () => {
    clearTimeout(dwellTimer);
    dwellTimer = null;
    dwellAnchor = null;
    ring.classList.remove('is-on', 'is-filling');
  };

  card.addEventListener('mouseenter', (event) => {
    startDwell(event.clientX, event.clientY);
  });

  card.addEventListener('mousemove', (event) => {
    if (dwellAnchor) {
      ring.style.left = `${event.clientX}px`;
      ring.style.top = `${event.clientY}px`;
      const dx = event.clientX - dwellAnchor.x;
      const dy = event.clientY - dwellAnchor.y;
      if (dx * dx + dy * dy > DWELL_RESET_PX * DWELL_RESET_PX) {
        startDwell(event.clientX, event.clientY);
      }
    }
  });

  card.addEventListener('mouseleave', () => {
    stopDwell();
    flipper.classList.remove('is-flipped');
  });
}

export function init(root = document) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  const cards = root.querySelectorAll('.post-card');
  if (!cards.length) {
    return;
  }

  const ring = document.createElement('div');
  ring.className = 'dwell-ring';
  document.body.appendChild(ring);

  cards.forEach((card) => setupCard(card, ring));
}
