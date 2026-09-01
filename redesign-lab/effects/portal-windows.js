/* Portal windows - full-page field, draggable, throwable, bouncing off the page edges.

   ROD, 2026-08-23: "currently the portal is too small it doesnt scale up to meet the edges of the
   page. make it so it does and make it so the bounds of the page for the popup windows are also
   the edge of the page... since they are buttons you should give them the features consistent to
   other page buttons like magnetism, the border break glow on hover, and the slow drift. The
   bounds should grow and shrink to match the edges of the page for all these windows... source the
   windows from zutomayo's page make sure i can move them around in the scene by drag clicking and
   i can 'throw' them."

   WHAT COMES FROM WHERE, because this combines four things and only two are sourced:
     LAYOUT   spacejam.com/1996 - the satellite positions and sizes, measured. Hierarchy is carried
              by POSITION and AREA; no two the same size; nothing on a grid. Now expressed as
              FRACTIONS of each window's own travel range rather than as fixed px - see below.
     WINDOW   zutomayo.net `.ztmy-pcmove-menu` / `.ztmy-pcmove-news`, read from their served CSS
              (sources/zutomayo-pcmove-window.md). The frame, the 1px border, the zero-blur
              `3px 3px 0` shadow, the full-width title bar and the close button centred in it.
              Their `.windowmini` collapse is deliberately NOT taken - Rod did not ask for it.
     DRIFT + GLOW   the SITE's own engines, not new code - drift-magnet.js for the slow ambient
              drift, and button-kit's phojanecki ripple for the hover glow. Rod 2026-08-23 picked
              the ripple over the card's edge ring: "these do not need the edge glow i want the
              glow from the buttons in extracted components."
     LEAN + DRAG + THROW + BOUNCE   OURS. No source.

   THE PROXIMITY LEAN IS BACK, AND HERE IS HOW IT WENT MISSING (Rod: "why did we lose proximity
   lean? when did that get lost again?"). It was not drift or rot - it was removed in this file on
   2026-08-23, deliberately, in the same edit that wired drift-magnet in. The reasoning was that
   "magnetism consistent to other page buttons" meant REPLACING the lean with drift-magnet's
   hover-magnet. That was wrong: the ask was to ADD button behaviour, not to trade away a tuned
   interaction that already existed and already had Rod's own constraint built into it.

   SO THE TWO MAGNETS ARE NOT BOTH RUNNING, because they would fight over the same pixels. The
   windows keep `data-drift` (drift-magnet's ambient wander, on the inner node) and do NOT take
   `.js-magnetic`. Cursor attraction is the LEAN below, which is the portal's own and is the one
   with the design constraint attached.

   ZUTOMAYO'S DRAG IS CONFIRMED, and the old note in this header was wrong. Their `common.js` was
   read on 2026-08-23: `.drag-and-drop` takes mousedown/touchstart and mousemove writes
   style.top/left from the press-relative offset, so the panels genuinely drag - and the WHOLE panel
   is the handle, not the bar. The earlier "cursor:pointer means it is a click target" reasoning was
   reading the wrong selector: `cursor:pointer` is on `#spNews .header-bar`, the MOBILE collapse
   tab. The draggable element is `.drag-and-drop { cursor: move }`.
   WHAT IS STILL OURS, and this is where their code stops: they have NO inertia (mouseup only
   unbinds listeners) and NO clamping of any kind. So the THROW, the BOUNCE and the page-edge bounds
   are ours, and the LEAN has no counterpart there at all.

   ---------------------------------------------------------------------------------------------
   WHY POSITIONS ARE FRACTIONS NOW, and why that is the same thing as the bounds question

   The old build hard-coded Space Jam's px into a fixed 500x520 stage, so the constellation could
   not grow and the windows bounced off a 500px wall floating in the middle of the page. Rod asked
   for both to reach the page edges, and they turn out to be ONE problem: a window's legal position
   is always somewhere in [0, fieldSize - windowSize]. Call that its TRAVEL RANGE.

   So each window stores its home as a FRACTION of its own travel range, taken from the source:

       fracX = sourceLeft / (500 - sourceWidth)

   At any field size the home is `fracX * (fieldWidth - windowWidth)`. That gives three things at
   once: the constellation keeps its shape, the outermost windows sit as near the edge as they did
   in the source (so the field genuinely reaches the edges), and home and drag bounds are expressed
   in the SAME coordinate system, so growing the page grows both together. A dragged window's new
   home is re-recorded as a fraction on release, which is why a resize does not throw it away.

   SCALE IS DELIBERATELY NOT THE WIDTH RATIO. A full-page field is far wider than it is tall, so
   scaling by width alone would stretch the constellation into a letterbox and blow the windows up.
   It takes `min(fw/500, fh/520)`, clamped to [1, 2.4] - the constellation grows, but stays the
   shape Space Jam measured.

   THE BAR IS NOT SCALED WITH THE WINDOW, and this is deliberate. zutomayo's bar is 46px in a 580px
   panel - 8% of its height. Our windows are a tenth of theirs, so a proportional bar would be 6px
   and unreadable. Their RULE transfers (collapsed height == bar height, so it folds into its own
   bar); their RATIO does not. The bar is a readable constant instead.
*/

import { init as initDriftMagnet } from '/redesign-lab/extracted/components/drift-magnet/drift-magnet.js';

/* Space Jam's stage, the coordinate space every data-x/y/w/h below is measured in */
const REF_W = 500;
const REF_H = 520;

const MIN_SCALE = 1;
const MAX_SCALE = 2.4;
/* THE LEAN. Rod's rule is the design, not the number: a door should be ENCOURAGED, never forced.
   A magnet strong enough that the cursor cannot pass a window without landing on it has taken the
   choice away, and a portal exists to offer one. Three things hold it back and all three matter:
     STRENGTH  the weakest pull on the site by a wide margin (nav links use 40 on drift-magnet's
               scale, cards 20; this is roughly a tenth of the cards')
     RADIUS    outside this the window does not move at all, so a cursor crossing the field
               BETWEEN windows is never touched. A global magnet is what makes a UI feel sticky
     MAX_LEAN  it leans, it does not travel - the cursor still closes the remaining distance
   STRENGTH DOUBLED 0.12 -> 0.24 on Rod's instruction, 2026-08-23: "make the magnet strength higher
   maybe double it." At 0.12 the lean peaked around 4.5px, which he found too subtle to read as an
   invitation. Re-measured after the change: **20px->4.2, 40->7.0, 60->8.6, 75->9.0, 90->8.6,
   120->5.8, 145->1.2, 200->0.** Peak 9.0px, still at the same 75px distance.
   **MAX_LEAN still does not fire** - 9.0 against a cap of 10 is 90% of it, so the cap is close to
   live but is not yet clamping anything. Stated precisely because it would be easy to assume
   doubling the strength doubled the peak into the cap; it did double the peak (4.5 -> 9.0) and the
   cap remains a rail. If STRENGTH goes up again the cap starts doing real work, which is the point
   of keeping it. Do not remove it. */
const STRENGTH = 0.24;
const RADIUS = 150;      // px - beyond this the window ignores the cursor entirely
const MAX_LEAN = 10;     // px - the furthest a window will ever lean from its home
const RETURN = 0.08;     // how fast it settles back when the cursor leaves

const BOUNCE = 0.55;      // energy kept when a thrown window hits a wall
const FRICTION = 0.94;    // per-frame velocity decay
const DRAG_SLOP = 4;      // px of movement before a press becomes a drag, so links stay clickable
const MAX_THROW = 60;     // px/frame cap, so a wild flick cannot teleport a window across the page
const VEL_SMOOTH = 0.6;   // how much of the newest delta feeds the throw velocity
/* a lead door is never less than this multiple of the tallest social's height - enough that the
   two read as a different tier at a glance, not as the same object slightly enlarged */
const LEAD_MIN_RATIO = 1.6;

function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

function init(field) {
  if (!field) return;
  const windows = [...field.querySelectorAll('.pwin')];
  if (!windows.length) return;

  const state = windows.map((el) => {
    const baseW = parseFloat(el.dataset.w);
    const baseH = parseFloat(el.dataset.h);
    return {
      el,
      baseW,
      baseH,
      w: baseW,
      h: baseH,
      /* home as a fraction of this window's own travel range, read off the source numbers */
      frac: {
        x: clamp(parseFloat(el.dataset.x) / (REF_W - baseW), 0, 1),
        y: clamp(parseFloat(el.dataset.y) / (REF_H - baseH), 0, 1),
      },
      /* the fraction as AUTHORED, kept untouched so "reset" has something true to go back to.
         `frac` drifts every time a window is dragged or thrown; this one never does. */
      home0: {
        x: clamp(parseFloat(el.dataset.x) / (REF_W - baseW), 0, 1),
        y: clamp(parseFloat(el.dataset.y) / (REF_H - baseH), 0, 1),
      },
      closed: false,
      pos: { x: 0, y: 0 },
      vel: { x: 0, y: 0 },
      lean: { x: 0, y: 0 },
      pending: false,
      dragging: false,
      start: { x: 0, y: 0 },
      grab: { x: 0, y: 0 },
    };
  });

  const stillness = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scale = 1;
  const pointer = { x: -9999, y: -9999, inside: false };

  /* the lean needs the cursor in FIELD space, which is also the space the windows live in - so the
     per-window distance below is a subtraction, not a getBoundingClientRect per window per frame */
  field.addEventListener('pointermove', (e) => {
    const r = field.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
    pointer.inside = true;
    wake();
  });
  field.addEventListener('pointerleave', () => { pointer.inside = false; wake(); });

  /* ---- LAYOUT. Runs at start and on every resize, which is what makes the bounds grow and
     shrink with the page rather than sitting at a fixed 500x520. ---- */
  function layout() {
    const fw = field.clientWidth;
    const fh = field.clientHeight;
    /* A zero-width field means the page has not been laid out yet - it happens in a background tab,
       and it would otherwise stack every window at x=0 and leave them there until something else
       resized. Bail instead: the ResizeObserver and the load handler both re-run this. */
    if (fw < 1 || fh < 1) return;
    scale = clamp(Math.min(fw / REF_W, fh / REF_H), MIN_SCALE, MAX_SCALE);
    /* BAR HEIGHT UP 22->27 and the ceiling 34->44. Rod 2026-08-23: "honestly most of the window
       text doesnt read as header anyways". The title is sized as a fraction of this, so a header
       that reads as a header needs the bar to have room for one first - raising the type alone
       would just have crowded it against the edges. */
    const barH = Math.round(clamp(27 * scale, 24, 44));
    field.style.setProperty('--bar-h', `${barH}px`);
    field.style.setProperty('--pscale', scale.toFixed(3));

    for (const w of state) {
      w.w = Math.round(w.baseW * scale);
      w.h = Math.round(w.baseH * scale);
      w.el.style.setProperty('--win-h', `${w.h}px`);
      w.el.style.setProperty('--win-w', `${w.w}px`);
    }

    /* SECOND PASS: grow each window until its HEADER FITS. Rod 2026-08-23: "im realizing the boxes
       need to be wide enough to fit their header text". Space Jam's widths were measured for
       unlabelled satellites, so nothing about them ever accounted for a word having to fit inside.
       Measuring rather than guessing: the bar needs the title at its natural width, plus the close
       button, plus the bar's own padding and gap. `scrollWidth` reports the natural width even when
       the title is being clipped, which is what makes this readable off a live DOM.
       THIS BREAKS THE ASPECT LADDER on the narrow windows, and that is the right trade - a window
       whose own name does not fit is broken in a way an aspect ratio never is. */
    for (const w of state) {
      const bar = w.el.querySelector('.pwin__bar');
      const title = w.el.querySelector('.pwin__title');
      if (!bar || !title) continue;
      const close = w.el.querySelector('.pwin__close');
      const bs = getComputedStyle(bar);
      const need = Math.ceil(
        title.scrollWidth
        + (close ? close.offsetWidth : 0)
        + parseFloat(bs.paddingLeft) + parseFloat(bs.paddingRight)
        + (parseFloat(bs.columnGap) || 0)
        + 4 /* the inner's own 1px border both sides, plus 2px of slack so sub-pixel rounding
               can never put the ellipsis back */
      );
      /* never wider than the field itself, or the window could not be placed at all */
      const wanted = Math.min(need, Math.round(fw * 0.9));
      if (wanted > w.w) {
        w.w = wanted;
        w.el.style.setProperty('--win-w', `${w.w}px`);
      }

      /* THE SOCIALS ARE SQUARE. Rod 2026-08-23: "can we make all socials square to differentiate
         them shape wise?" - which also fixes their icons not fitting.
         It has to happen HERE, after the header-fit grow, not in the markup: growing the width to
         fit a header would otherwise flatten a square into a letterbox, and "ArtStation" needs a
         good deal more width than its authored side. Squaring last means the header sets the side
         and the shape survives it. The doors keep their varied rectangles, which is what makes the
         two groups read as different KINDS of thing rather than just different sizes. */
      if (w.el.classList.contains('pwin--social') && w.h !== w.w) {
        w.h = w.w;
        w.el.style.setProperty('--win-h', `${w.h}px`);
      }
    }

    /* THIRD PASS: the two LEAD doors are guaranteed the largest. Rod 2026-08-23: "expand tech art
       vertically so its always taller than any social... game design and tech art should always be
       the largest and draw the user to them."
       ALWAYS is the operative word, so this is enforced rather than hoped for. The socials resize
       themselves at runtime - grown to fit their header, then squared - so a lead door that is
       comfortably taller today can be overtaken on a viewport nobody measured. Reading the tallest
       social and clearing it by a margin is the only version of this that cannot drift. */
    const tallestSocial = state.reduce(
      (tallest, w) => (w.el.classList.contains('pwin--social') ? Math.max(tallest, w.h) : tallest), 0
    );
    const leadFloor = Math.round(tallestSocial * LEAD_MIN_RATIO);
    for (const w of state) {
      if (!w.el.classList.contains('pwin--lead')) continue;
      if (w.h < leadFloor) {
        w.h = leadFloor;
        w.el.style.setProperty('--win-h', `${w.h}px`);
      }
    }

    for (const w of state) {
      w.pos.x = w.frac.x * Math.max(0, fw - w.w);
      w.pos.y = w.frac.y * Math.max(0, fh - w.h);
    }
  }

  /* a window's home is only meaningful as a fraction, so record it that way whenever it moves */
  function recordHome(w) {
    const fw = field.clientWidth;
    const fh = field.clientHeight;
    w.frac.x = fw - w.w > 0 ? clamp(w.pos.x / (fw - w.w), 0, 1) : 0;
    w.frac.y = fh - w.h > 0 ? clamp(w.pos.y / (fh - w.h), 0, 1) : 0;
  }

  /* ---- DRAG, THROW. The WHOLE window is the handle, not just the bar (Rod: "move them around in
     the scene by drag clicking"). A link inside still works because a press only becomes a drag
     after DRAG_SLOP px of movement - below that the pointer is never captured and nothing is
     prevented, so the click lands normally.

     TOUCH IS THE EXCEPTION. The field is now the whole page, so making every window swallow touch
     moves would trap the page scroll behind them. On touch the bar is the handle, which is also
     what both reference sites do. ---- */
  state.forEach((w) => {
    const bar = w.el.querySelector('.pwin__bar');

    w.el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      if (e.pointerType === 'touch' && !(bar && bar.contains(e.target))) return;
      if (e.target.closest('.pwin__close')) return;   // the close button is not a drag handle
      const r = field.getBoundingClientRect();
      w.pending = true;
      w.vel.x = 0; w.vel.y = 0;
      w.start.x = e.clientX; w.start.y = e.clientY;
      w.grab.x = (e.clientX - r.left) - w.pos.x;
      w.grab.y = (e.clientY - r.top) - w.pos.y;
    });

    w.el.addEventListener('pointermove', (e) => {
      if (!w.pending && !w.dragging) return;

      if (w.pending && !w.dragging) {
        if (Math.hypot(e.clientX - w.start.x, e.clientY - w.start.y) < DRAG_SLOP) return;
        /* the press has become a drag: NOW capture and take over, not before */
        w.dragging = true;
        w.el.classList.add('is-dragging');
        /* capture can throw NotFoundError if the pointer is no longer active by the time we get
           here. The drag still works without it (events keep coming from the element), so swallow
           it rather than letting it escape and leave the drag half-initialised. */
        try { w.el.setPointerCapture(e.pointerId); } catch { /* pointer already gone */ }
        /* a dragged window comes to the front and STAYS there - dropping back under its
           neighbours the moment you let go would undo the thing you just did */
        state.forEach((o) => { o.el.style.zIndex = o === w ? 30 : 10; });
      }

      const r = field.getBoundingClientRect();
      const nx = (e.clientX - r.left) - w.grab.x;
      const ny = (e.clientY - r.top) - w.grab.y;
      /* smoothed, so the throw follows the gesture rather than whatever the last frame happened
         to be - a single stuttered frame at release should not decide where a window goes */
      w.vel.x = w.vel.x * (1 - VEL_SMOOTH) + (nx - w.pos.x) * VEL_SMOOTH;
      w.vel.y = w.vel.y * (1 - VEL_SMOOTH) + (ny - w.pos.y) * VEL_SMOOTH;
      w.pos.x = nx;
      w.pos.y = ny;
      e.preventDefault();
      wake();
    });

    /* THE CENTRE-DRAG FIX. Rod 2026-08-23: "make it so windows can be dragged from the center too."
       The body's link fills the whole window, and `<a>` is natively draggable - so pressing near
       the centre and moving started the BROWSER's own link drag, which tears down the pointer
       stream and leaves the window sitting still. The title bar worked only because it has no link.
       Killing dragstart on the window covers links, images and anything added later, and it costs
       nothing at rest.
       WORTH KNOWING: a synthetic PointerEvent test cannot reproduce this and reported the centre
       drag as working. Native drag is not driven by pointer events. */
    w.el.addEventListener('dragstart', (e) => e.preventDefault());

    const release = () => {
      w.pending = false;
      if (!w.dragging) return;
      w.dragging = false;
      w.el.classList.remove('is-dragging');
      w.vel.x = clamp(w.vel.x, -MAX_THROW, MAX_THROW);
      w.vel.y = clamp(w.vel.y, -MAX_THROW, MAX_THROW);
      recordHome(w);
      wake();
    };
    w.el.addEventListener('pointerup', release);
    w.el.addEventListener('pointercancel', release);

    /* CLOSING. Rod 2026-08-23: "if we are including the X they should be able to close/remove them
       until they refresh the page at least or maybe clicking the name card at the center resets
       them?" - both. Until now the X drew itself and did nothing, which is the dead-control problem
       this file has been carrying all session.
       `stopPropagation` matters: without it the press also reaches the window's own drag handler
       and a click on the X would arm a drag on a window that is about to vanish. */
    const closeButton = w.el.querySelector('.pwin__close');
    if (closeButton) {
      closeButton.addEventListener('pointerdown', (e) => e.stopPropagation());
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        w.closed = true;
        w.el.classList.add('is-closed');
        w.vel.x = 0;
        w.vel.y = 0;
        w.lean.x = 0;
        w.lean.y = 0;
        syncReset();
      });
    }
  });

  /* the identity mark is the way back. It only advertises itself once something is actually closed,
     otherwise it would be a second control that does nothing. */
  const centre = field.querySelector('.centre');

  function syncReset() {
    const anyClosed = state.some((w) => w.closed);
    if (centre) centre.classList.toggle('can-reset', anyClosed);
  }

  function restoreAll() {
    if (!state.some((w) => w.closed)) return;
    for (const w of state) {
      w.closed = false;
      w.el.classList.remove('is-closed');
      /* a full RESET, not just an un-close: every window goes back to its authored spot, so the
         constellation returns to how it shipped. FLAGGED because it also undoes any arranging you
         did by dragging - if it should only un-close and leave dragged windows alone, drop these
         two lines and the closed ones will simply reappear where they were. */
      w.frac.x = w.home0.x;
      w.frac.y = w.home0.y;
      w.vel.x = 0;
      w.vel.y = 0;
      w.lean.x = 0;
      w.lean.y = 0;
    }
    layout();
    syncReset();
    wake();
  }

  if (centre) {
    centre.addEventListener('click', restoreAll);
    centre.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        restoreAll();
      }
    });
  }

  function frame() {
    const fw = field.clientWidth;
    const fh = field.clientHeight;
    let busy = false;

    for (const w of state) {
      /* a closed window is display:none, so offsetHeight reads 0 and every bounds calculation below
         would silently work against a zero-height box. Skip it entirely - it also costs nothing. */
      if (w.closed) continue;

      const maxX = Math.max(0, fw - w.w);
      const maxY = Math.max(0, fh - w.el.offsetHeight);

      if (w.dragging) {
        /* dragging is the one time a window may be held outside its range; it is clamped anyway so
           it can never be dropped off the page. A held window does not lean - it should track the
           cursor exactly. */
        w.pos.x = clamp(w.pos.x, 0, maxX);
        w.pos.y = clamp(w.pos.y, 0, maxY);
        w.lean.x = 0;
        w.lean.y = 0;
        busy = true;
      } else if (Math.abs(w.vel.x) > 0.1 || Math.abs(w.vel.y) > 0.1) {
        /* THE THROW. Only a thrown window has velocity, so this costs nothing at rest. It reflects
           off the FIELD bounds - which are now the page edges - and loses energy each bounce. */
        w.pos.x += w.vel.x;
        w.pos.y += w.vel.y;
        if (w.pos.x < 0) { w.pos.x = 0; w.vel.x = -w.vel.x * BOUNCE; }
        if (w.pos.y < 0) { w.pos.y = 0; w.vel.y = -w.vel.y * BOUNCE; }
        if (w.pos.x > maxX) { w.pos.x = maxX; w.vel.x = -w.vel.x * BOUNCE; }
        if (w.pos.y > maxY) { w.pos.y = maxY; w.vel.y = -w.vel.y * BOUNCE; }
        w.vel.x *= FRICTION;
        w.vel.y *= FRICTION;
        recordHome(w);
        busy = true;
      }

      /* THE LEAN, applied on top of position so a leaning window still has a stable home to
         return to. Skipped entirely while dragging or while a throw is still travelling. */
      if (!w.dragging) {
        let tx = 0;
        let ty = 0;
        if (pointer.inside && !stillness.matches) {
          const dx = pointer.x - (w.pos.x + w.w / 2);
          const dy = pointer.y - (w.pos.y + w.el.offsetHeight / 2);
          const dist = Math.hypot(dx, dy);
          if (dist < RADIUS && dist > 0.001) {
            const falloff = 1 - dist / RADIUS;
            tx = dx * STRENGTH * falloff;
            ty = dy * STRENGTH * falloff;
            const lean = Math.hypot(tx, ty);
            if (lean > MAX_LEAN) { tx = (tx / lean) * MAX_LEAN; ty = (ty / lean) * MAX_LEAN; }
          }
        }
        w.lean.x += (tx - w.lean.x) * RETURN;
        w.lean.y += (ty - w.lean.y) * RETURN;
        if (Math.abs(w.lean.x) > 0.01 || Math.abs(w.lean.y) > 0.01) busy = true;
      }

      w.el.style.transform =
        `translate3d(${(w.pos.x + w.lean.x).toFixed(1)}px, ${(w.pos.y + w.lean.y).toFixed(1)}px, 0)`;
    }

    /* stays awake while the cursor is over the field, because that is when a window can start
       leaning; otherwise it sleeps until a drag or a throw wakes it */
    raf = busy || pointer.inside ? requestAnimationFrame(frame) : null;
  }

  let raf = null;
  function wake() { if (raf === null) raf = requestAnimationFrame(frame); }

  layout();
  syncReset();
  wake();

  /* the bounds ARE the page, so they have to be re-read whenever the page changes size */
  new ResizeObserver(() => { layout(); wake(); }).observe(field);
  /* belt and braces: fonts and the stylesheet can settle after this module runs, and a background
     tab delivers no ResizeObserver records at all until it renders */
  window.addEventListener('load', () => { layout(); wake(); }, { once: true });

  /* AND AGAIN ONCE THE WEBFONT IS IN. This is what made the headers ellipsise for Rod while every
     measurement here said they fit: the fonts load with `display=swap`, so the first layout measures
     `title.scrollWidth` against the FALLBACK, sizes the window to that, and then the real face swaps
     in wider with nothing to trigger a re-measure. My own checks all ran a manual relayout long
     after the fonts had settled, which is precisely why they could not see it.
     Any layout that sizes a box from measured text has this bug unless it waits for this promise. */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { layout(); wake(); });
  }

  /* MAGNETISM AND SLOW DRIFT come from the site engine, on the INNER element.
     drift-magnet writes element.style.transform, and so does the positioning above - putting both
     on the same node would make them overwrite each other every frame. Outer node carries POSITION,
     inner node carries DRIFT + MAGNET, and the two compose instead of fighting. */
  initDriftMagnet(field);

  /* teardown twin - the PWA keeps the session alive across navigations, so an rAF loop without one
     leaks into the next page (docs/TRAPS.md) */
  window.addEventListener('pagehide', () => {
    if (raf !== null) cancelAnimationFrame(raf);
  }, { once: true });

  window.__portalWindows = {
    count: windows.length,
    /* force a re-measure. Exists so the layout can be checked without waiting on the rendering
       lifecycle - a hidden or throttled tab delivers neither rAF nor ResizeObserver records. */
    relayout: () => { layout(); wake(); },
    scale: () => scale,
    field: () => [field.clientWidth, field.clientHeight],
    sizes: () => state.map((w) => [w.w, w.h]),
    positions: () => state.map((w) => [Math.round(w.pos.x), Math.round(w.pos.y)]),
    velocities: () => state.map((w) => [+w.vel.x.toFixed(2), +w.vel.y.toFixed(2)]),
    closed: () => state.filter((w) => w.closed).map((w) => w.el.dataset.slot),
    restoreAll: () => restoreAll(),
    leans: () => state.map((w) => Math.round(Math.hypot(w.lean.x, w.lean.y) * 10) / 10),
    leanTuning: { strength: STRENGTH, radius: RADIUS, maxLean: MAX_LEAN },
    /* advance the physics by one frame without waiting on rAF - for tuning the throw, and the only
       way to check a bounce in a tab whose animation timeline is throttled */
    step: () => {
      /* frame() re-arms rAF on its way out, so drop the pending one first or each manual step
         leaves a second loop running alongside the first */
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
      frame();
    },
    fractions: () => state.map((w) => [+w.frac.x.toFixed(3), +w.frac.y.toFixed(3)]),
    /* every window's gap to the nearest field edge - the direct check on "does it reach the edges" */
    edgeGaps: () => {
      const fw = field.clientWidth;
      const fh = field.clientHeight;
      return state.map((w) => Math.round(Math.min(
        w.pos.x, w.pos.y, fw - (w.pos.x + w.w), fh - (w.pos.y + w.el.offsetHeight)
      )));
    },
  };
}

init(document.querySelector('.field'));
