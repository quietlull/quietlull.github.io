/* line-boil — the H0 site mark, boiled by swapping three hand-drawn faces.

   THE PATTERN IS ROD'S PICK, 2026-08-23: "Sequential per glyph 6sec on 4's looks best for me."
   Sequential order, per-glyph phase, 6 changes/sec. See line-boil.css for the full reasoning.

   THE RANDOM STARTING PHASE IS LOAD-BEARING, not decoration. Without it every glyph increments in
   lockstep and per-glyph renders identically to swapping the whole line - measured, 3 distinct
   states in 24 ticks instead of a staggered wave.

   THE ADVANCE IS PINNED because the three faces do not share metrics. Each glyph gets a box sized
   to the WIDEST of the three drawings of that character - measuring only the host's own face
   under-sizes the box for every glyph another face draws bigger, which on the top-bar mark was
   7 of 9, and let "F" overflow its box by 34%.
   The box is RE-measured on resize: the pin is written as fixed px while callers size this with
   `vh` clamps, so a pin taken at one window height is simply wrong at the next. Measured on the
   hero, loaded at 900px tall and resized to 620, the mark stayed 274.9px tall against its true
   189.1px, every letter carrying ~10px of phantom gap until a reload.
   `inlineSize` is used rather than `width` so the same code pins a
   horizontal mark by width and a `writing-mode: vertical-rl` mark by height - the hero is vertical,
   and pinning the wrong axis there does nothing. A fixed line-height does NOT work for the vertical
   case: in `text-orientation: upright` the advance comes from the font's own vertical metrics.

   DIGITS, closed 2026-08-23. The LETTER faces carry no numerals - measured, '0' and '7' render at
   the fallback width in all three - so Rod cut three digit faces. They are not a fourth family:
   line-boil.css attaches them to the SAME three family names by `unicode-range`, so "Lineboil1"
   resolves to his letters for letters and his numerals for digits, and this file needs no branch
   for which kind of character it is holding.
   THE COLON COMES FROM THE LETTER FACE, because none of the number faces contains U+003A while all
   three letter faces do. Rod called that himself. The range covers only U+0030-0039, so the colon
   falls through on its own rather than being special-cased.
   The digit faces are NOT tabular, so pinGlyphAdvance gives every digit one shared box. */

const LINE_BOIL_FACES = ['"Lineboil1"', '"Lineboil2"', '"Lineboil3"'];
const LINE_BOIL_RATE = 6;                       // per second — "on 4s" at 24fps

function pinGlyphAdvance(host, text) {
  const vertical = getComputedStyle(host).writingMode.startsWith('vertical');

  const probe = document.createElement('span');
  probe.style.visibility = 'hidden';
  probe.style.position = 'absolute';
  // `pre`, or a span holding only a space collapses and measures ZERO. That is exactly what
  // happened on the hero: the space between "rodney" and "fan" pinned to 0px and the mark rendered
  // as RODNEYFAN. A collapsed space measures as no advance, not as a narrow one.
  probe.style.whiteSpace = 'pre';
  host.textContent = '';
  host.appendChild(probe);

  /* EVERY FACE IS MEASURED, not just the one the host happens to be set in. Pinning to font 1's
     width is only correct if font 1 is the widest, and it usually is not: measured on the top-bar
     mark, 7 of 9 glyphs are WIDER in another face than the box they were given, and "F" is 17.30px
     in face 1 against 23.20px in face 3 - a 34% overflow that spilled it into the next letter every
     time the boil landed there. Rod: "the pinning isnt looking right". The box has to hold the
     WIDEST drawing of the character, so the glyph boils inside it instead of bursting out of it. */
  /* DIGITS ARE MADE TABULAR HERE, because Rod's number faces are not. Measured per 1000em,
     Numberboil1 draws "1" at 491 and "2" at 680 - a 39% spread - and the other two faces run 26%
     and 28%. For a word that is harmless; for the CLOCK it means the line would shove itself
     sideways on every tick, and again on every boil frame. So every digit gets ONE shared box, the
     widest digit across all three faces, and a 1 then occupies exactly the space a 2 does. This is
     what `font-variant-numeric: tabular-nums` would do if these faces carried tabular figures. */
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
      // In vertical writing modes the advance runs down the block, so read the axis that matches.
      widest = Math.max(widest, vertical ? box.height : box.width);
    }
    advances.push(widest);
  }
  probe.remove();

  /* VERTICAL IS NOT THE HORIZONTAL CASE WITH THE AXIS SWAPPED, and treating it as one is what Rod
     caught: "the spacing check was only for horizontal but this text is vertical".
     With `text-orientation: upright` every glyph advances by the SAME em box - measured, all ten
     letters came back 23.89px - so per-glyph widths carry no information here. What differs is that
     em advance BETWEEN the three faces, which is the 70px column drift. So the vertical pin is ONE
     uniform advance applied to every cell, the space included, taken from font 1. */
  if (vertical) {
    const uniform = Math.max(...advances);
    advances.fill(uniform);
  }

  host.textContent = '';
  text.split('').forEach((character, index) => {
    /* A SPACE IS LEFT AS A PLAIN TEXT NODE, not wrapped in a pinned cell, and that is a layout
       decision rather than a tidy-up. The hero's mark wraps at the space: measured, the natural
       glyph tops run 0, 23.88 ... 143.25 and then RESET to 0, because "rodney fan" breaks into TWO
       vertical columns. Wrapping the space in an inline-block cell removed that break point and
       forced all ten glyphs into one long column - which is what Rod saw as "not quite right".
       An unwrapped space keeps the browser's own break behaviour intact. */
    if (/\s/.test(character)) {
      host.appendChild(document.createTextNode(character));
      return;
    }
    const cell = document.createElement('span');
    cell.className = 'lb__g';
    cell.textContent = character;
    cell.style.inlineSize = advances[index].toFixed(2) + 'px';
    cell.dataset.face = String(Math.floor(Math.random() * LINE_BOIL_FACES.length));
    cell.style.fontFamily = LINE_BOIL_FACES[Number(cell.dataset.face)];
    host.appendChild(cell);
  });
}

function boilTick(host) {
  for (const cell of host.querySelectorAll('.lb__g')) {
    const next = (Number(cell.dataset.face) + 1) % LINE_BOIL_FACES.length;
    cell.dataset.face = String(next);
    cell.style.fontFamily = LINE_BOIL_FACES[next];
  }
}

export function initLineBoil(host, { rate = LINE_BOIL_RATE } = {}) {
  if (!host) return null;
  const text = host.textContent.trim();

  host.classList.add('lb');

  let timer = null;
  let repin = null;

  /* Debounced because a window drag fires this continuously and each pin is a measure loop of one
     forced layout per glyph. Re-pinning re-randomises the starting faces, which is left alone
     deliberately: the boil already reshuffles every glyph 6 times a second, so a reshuffle during a
     resize is invisible, and preserving phase across it would cost more code than it buys. */
  const onResize = () => {
    clearTimeout(repin);
    // Re-read the host rather than reusing the captured text: a caller whose content CHANGES (the
    // clock) would otherwise be rebuilt from its value at page load and show a stale time until
    // the next tick. The cells concatenate back to the current string, so this costs nothing.
    repin = setTimeout(() => pinGlyphAdvance(host, host.textContent.trim()), 150);
  };

  const start = () => {
    pinGlyphAdvance(host, text);
    timer = setInterval(() => boilTick(host), 1000 / rate);
    // Attached only after the fonts resolve. Listening earlier lets a resize re-pin the FALLBACK
    // metrics, which is the same trap the load path below exists to avoid.
    window.addEventListener('resize', onResize);
  };

  // Fonts are fetched lazily, and measuring before they arrive pins the FALLBACK's advances -
  // which is how this page once reported three unrelated faces as metrically identical.
  Promise.all(LINE_BOIL_FACES.map((face) => document.fonts.load('1em ' + face, text)))
    .then(() => document.fonts.ready)
    .then(start);

  // The teardown twin, so a page that swaps this out does not leave the interval running.
  return () => {
    if (timer) clearInterval(timer);
    timer = null;
    clearTimeout(repin);
    window.removeEventListener('resize', onResize);
  };
}
