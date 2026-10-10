const LINE_BOIL_FACES = ['"Lineboil1"', '"Lineboil2"', '"Lineboil3"'];
const LINE_BOIL_RATE = 6;

function pinGlyphAdvance(host, text) {
  const vertical = getComputedStyle(host).writingMode.startsWith('vertical');

  const probe = document.createElement('span');
  probe.style.visibility = 'hidden';
  probe.style.position = 'absolute';
  probe.style.whiteSpace = 'pre';
  host.textContent = '';
  host.appendChild(probe);

  let digitBox = 0;
  if (/[0-9]/.test(text)) {
    for (const digit of '0123456789') {
      for (const face of LINE_BOIL_FACES) {
        probe.style.fontFamily = face;
        probe.textContent = digit;
        const box = probe.getBoundingClientRect();
        digitBox = Math.max(digitBox, vertical ? box.height : box.width);
      }
    }
  }

  const advances = [];
  for (const character of text) {
    if (digitBox && /[0-9]/.test(character)) {
      advances.push(digitBox);
      continue;
    }
    let widest = 0;
    for (const face of LINE_BOIL_FACES) {
      probe.style.fontFamily = face;
      probe.textContent = character;
      const box = probe.getBoundingClientRect();
      widest = Math.max(widest, vertical ? box.height : box.width);
    }
    advances.push(widest);
  }
  probe.remove();

  if (vertical) {
    const uniform = Math.max(...advances);
    advances.fill(uniform);
  }

  host.textContent = '';
  text.split('').forEach((character, index) => {
    if (/\s/.test(character)) {
      host.appendChild(document.createTextNode(character));
      return;
    }
    const cell = document.createElement('span');
    cell.className = 'line-boil-text__g';
    cell.textContent = character;
    cell.style.inlineSize = advances[index].toFixed(2) + 'px';
    cell.dataset.face = String(Math.floor(Math.random() * LINE_BOIL_FACES.length));
    cell.style.fontFamily = LINE_BOIL_FACES[Number(cell.dataset.face)];
    host.appendChild(cell);
  });
}

function boilTick(host) {
  for (const cell of host.querySelectorAll('.line-boil-text__g')) {
    const next = (Number(cell.dataset.face) + 1) % LINE_BOIL_FACES.length;
    cell.dataset.face = String(next);
    cell.style.fontFamily = LINE_BOIL_FACES[next];
  }
}

export function initLineBoil(host) {
  if (!host) return;
  const text = host.textContent.trim();

  host.classList.add('line-boil-text');

  let repin = null;

  const onResize = () => {
    clearTimeout(repin);
    repin = setTimeout(() => pinGlyphAdvance(host, host.textContent.trim()), 150);
  };

  const start = () => {
    pinGlyphAdvance(host, text);
    setInterval(() => boilTick(host), 1000 / LINE_BOIL_RATE);
    window.addEventListener('resize', onResize);
  };

  Promise.all(LINE_BOIL_FACES.map((face) => document.fonts.load('1em ' + face, text)))
    .then(() => document.fonts.ready)
    .then(start);
}
