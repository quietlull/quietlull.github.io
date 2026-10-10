# Comments removed from `assets/js/effects/portal-windows.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `import { init as initDriftMagnet } from '../components/drift-magnet.js';`

```text
Portal windows - full-page field, draggable, throwable, bouncing off the page edges.

  Ported from `redesign-lab/effects/portal-windows.js` on 2026-08-26. Only the drift-magnet
  import path changed. Reached from `_includes/portal-scripts.html`.

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
```

### Line 81, above `const REF_W = 500;`

```text
Space Jam's stage, the coordinate space every data-x/y/w/h below is measured in
```

### Line 87, above `const STRENGTH = 0.24;`

```text
THE LEAN. Rod's rule is the design, not the number: a door should be ENCOURAGED, never forced.
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
  of keeping it. Do not remove it.
```

### Line 105, on the line `const RADIUS = 150;`

```text
px - beyond this the window ignores the cursor entirely
```

### Line 106, on the line `const MAX_LEAN = 10;`

```text
px - the furthest a window will ever lean from its home
```

### Line 107, on the line `const RETURN = 0.08;`

```text
how fast it settles back when the cursor leaves
```

### Line 109, on the line `const BOUNCE = 0.55;`

```text
energy kept when a thrown window hits a wall
```

### Line 110, on the line `const FRICTION = 0.94;`

```text
per-frame velocity decay
```

### Line 111, on the line `const DRAG_SLOP = 4;`

```text
px of movement before a press becomes a drag, so links stay clickable
```

### Line 112, on the line `const MAX_THROW = 60;`

```text
px/frame cap, so a wild flick cannot teleport a window across the page
```

### Line 113, on the line `const VEL_SMOOTH = 0.6;`

```text
how much of the newest delta feeds the throw velocity
```

### Line 114, above `const LEAD_MIN_RATIO = 1.6;`

```text
a lead door is never less than this multiple of the tallest social's height - enough that the
  two read as a different tier at a glance, not as the same object slightly enlarged
```

### Line 136, above `frac: {`

```text
home as a fraction of this window's own travel range, read off the source numbers
```

### Line 141, above `home0: {`

```text
the fraction as AUTHORED, kept untouched so "reset" has something true to go back to.
        `frac` drifts every time a window is dragged or thrown; this one never does.
```

### Line 162, above `field.addEventListener('pointermove', (e) => {`

```text
the lean needs the cursor in FIELD space, which is also the space the windows live in - so the
    per-window distance below is a subtraction, not a getBoundingClientRect per window per frame
```

### Line 173, above `function layout() {`

```text
---- LAYOUT. Runs at start and on every resize, which is what makes the bounds grow and
    shrink with the page rather than sitting at a fixed 500x520. ----
```

### Line 178, above `if (fw < 1 || fh < 1) return;`

```text
A zero-width field means the page has not been laid out yet - it happens in a background tab,
      and it would otherwise stack every window at x=0 and leave them there until something else
      resized. Bail instead: the ResizeObserver and the load handler both re-run this.
```

### Line 183, above `const barH = Math.round(clamp(27 * scale, 24, 44));`

```text
BAR HEIGHT UP 22->27 and the ceiling 34->44. Rod 2026-08-23: "honestly most of the window
      text doesnt read as header anyways". The title is sized as a fraction of this, so a header
      that reads as a header needs the bar to have room for one first - raising the type alone
      would just have crowded it against the edges.
```

### Line 198, above `for (const w of state) {`

```text
SECOND PASS: grow each window until its HEADER FITS. Rod 2026-08-23: "im realizing the boxes
      need to be wide enough to fit their header text". Space Jam's widths were measured for
      unlabelled satellites, so nothing about them ever accounted for a word having to fit inside.
      Measuring rather than guessing: the bar needs the title at its natural width, plus the close
      button, plus the bar's own padding and gap. `scrollWidth` reports the natural width even when
      the title is being clipped, which is what makes this readable off a live DOM.
      THIS BREAKS THE ASPECT LADDER on the narrow windows, and that is the right trade - a window
      whose own name does not fit is broken in a way an aspect ratio never is.
```

### Line 217, on the line `+ 4`

```text
the inner's own 1px border both sides, plus 2px of slack so sub-pixel rounding
              can never put the ellipsis back
```

### Line 220, above `const wanted = Math.min(need, Math.round(fw * 0.9));`

```text
never wider than the field itself, or the window could not be placed at all
```

### Line 227, above `if (w.el.classList.contains('pwin--social') && w.h !== w.w) {`

```text
THE SOCIALS ARE SQUARE. Rod 2026-08-23: "can we make all socials square to differentiate
        them shape wise?" - which also fixes their icons not fitting.
        It has to happen HERE, after the header-fit grow, not in the markup: growing the width to
        fit a header would otherwise flatten a square into a letterbox, and "ArtStation" needs a
        good deal more width than its authored side. Squaring last means the header sets the side
        and the shape survives it. The doors keep their varied rectangles, which is what makes the
        two groups read as different KINDS of thing rather than just different sizes.
```

### Line 240, above `const tallestSocial = state.reduce(`

```text
THIRD PASS: the two LEAD doors are guaranteed the largest. Rod 2026-08-23: "expand tech art
      vertically so its always taller than any social... game design and tech art should always be
      the largest and draw the user to them."
      ALWAYS is the operative word, so this is enforced rather than hoped for. The socials resize
      themselves at runtime - grown to fit their header, then squared - so a lead door that is
      comfortably taller today can be overtaken on a viewport nobody measured. Reading the tallest
      social and clearing it by a margin is the only version of this that cannot drift.
```

### Line 265, above `function recordHome(w) {`

```text
a window's home is only meaningful as a fraction, so record it that way whenever it moves
```

### Line 273, above `state.forEach((w) => {`

```text
---- DRAG, THROW. The WHOLE window is the handle, not just the bar (Rod: "move them around in
    the scene by drag clicking"). A link inside still works because a press only becomes a drag
    after DRAG_SLOP px of movement - below that the pointer is never captured and nothing is
    prevented, so the click lands normally.

    TOUCH IS THE EXCEPTION. The field is now the whole page, so making every window swallow touch
    moves would trap the page scroll behind them. On touch the bar is the handle, which is also
    what both reference sites do. ----
```

### Line 287, on the line `if (e.target.closest('.pwin__close')) return;`

```text
the close button is not a drag handle
```

### Line 301, above `w.dragging = true;`

```text
the press has become a drag: NOW capture and take over, not before
```

### Line 304, above `try { w.el.setPointerCapture(e.pointerId); } catch { /* pointer already gone */ }`

```text
capture can throw NotFoundError if the pointer is no longer active by the time we get
          here. The drag still works without it (events keep coming from the element), so swallow
          it rather than letting it escape and leave the drag half-initialised.
```

### Line 307, on the line `try { w.el.setPointerCapture(e.pointerId); } catch {  }`

```text
pointer already gone
```

### Line 308, above `state.forEach((o) => { o.el.style.zIndex = o === w ? 30 : 10; });`

```text
a dragged window comes to the front and STAYS there - dropping back under its
          neighbours the moment you let go would undo the thing you just did
```

### Line 316, above `w.vel.x = w.vel.x * (1 - VEL_SMOOTH) + (nx - w.pos.x) * VEL_SMOOTH;`

```text
smoothed, so the throw follows the gesture rather than whatever the last frame happened
        to be - a single stuttered frame at release should not decide where a window goes
```

### Line 326, above `w.el.addEventListener('dragstart', (e) => e.preventDefault());`

```text
THE CENTRE-DRAG FIX. Rod 2026-08-23: "make it so windows can be dragged from the center too."
      The body's link fills the whole window, and `<a>` is natively draggable - so pressing near
      the centre and moving started the BROWSER's own link drag, which tears down the pointer
      stream and leaves the window sitting still. The title bar worked only because it has no link.
      Killing dragstart on the window covers links, images and anything added later, and it costs
      nothing at rest.
      WORTH KNOWING: a synthetic PointerEvent test cannot reproduce this and reported the centre
      drag as working. Native drag is not driven by pointer events.
```

### Line 349, above `const closeButton = w.el.querySelector('.pwin__close');`

```text
CLOSING. Rod 2026-08-23: "if we are including the X they should be able to close/remove them
      until they refresh the page at least or maybe clicking the name card at the center resets
      them?" - both. Until now the X drew itself and did nothing, which is the dead-control problem
      this file has been carrying all session.
      `stopPropagation` matters: without it the press also reaches the window's own drag handler
      and a click on the X would arm a drag on a window that is about to vanish.
```

### Line 372, above `const centre = field.querySelector('.centre');`

```text
the identity mark is the way back. It only advertises itself once something is actually closed,
    otherwise it would be a second control that does nothing.
```

### Line 386, above `w.frac.x = w.home0.x;`

```text
a full RESET, not just an un-close: every window goes back to its authored spot, so the
        constellation returns to how it shipped. FLAGGED because it also undoes any arranging you
        did by dragging - if it should only un-close and leave dragged windows alone, drop these
        two lines and the closed ones will simply reappear where they were.
```

### Line 418, above `if (w.closed) continue;`

```text
a closed window is display:none, so offsetHeight reads 0 and every bounds calculation below
        would silently work against a zero-height box. Skip it entirely - it also costs nothing.
```

### Line 426, above `w.pos.x = clamp(w.pos.x, 0, maxX);`

```text
dragging is the one time a window may be held outside its range; it is clamped anyway so
          it can never be dropped off the page. A held window does not lean - it should track the
          cursor exactly.
```

### Line 435, above `w.pos.x += w.vel.x;`

```text
THE THROW. Only a thrown window has velocity, so this costs nothing at rest. It reflects
          off the FIELD bounds - which are now the page edges - and loses energy each bounce.
```

### Line 449, above `if (!w.dragging) {`

```text
THE LEAN, applied on top of position so a leaning window still has a stable home to
        return to. Skipped entirely while dragging or while a throw is still travelling.
```

### Line 475, above `raf = busy || pointer.inside ? requestAnimationFrame(frame) : null;`

```text
stays awake while the cursor is over the field, because that is when a window can start
      leaning; otherwise it sleeps until a drag or a throw wakes it
```

### Line 487, above `new ResizeObserver(() => { layout(); wake(); }).observe(field);`

```text
the bounds ARE the page, so they have to be re-read whenever the page changes size
```

### Line 489, above `window.addEventListener('load', () => { layout(); wake(); }, { once: true });`

```text
belt and braces: fonts and the stylesheet can settle after this module runs, and a background
    tab delivers no ResizeObserver records at all until it renders
```

### Line 493, above `if (document.fonts && document.fonts.ready) {`

```text
AND AGAIN ONCE THE WEBFONT IS IN. This is what made the headers ellipsise for Rod while every
    measurement here said they fit: the fonts load with `display=swap`, so the first layout measures
    `title.scrollWidth` against the FALLBACK, sizes the window to that, and then the real face swaps
    in wider with nothing to trigger a re-measure. My own checks all ran a manual relayout long
    after the fonts had settled, which is precisely why they could not see it.
    Any layout that sizes a box from measured text has this bug unless it waits for this promise.
```

### Line 503, above `initDriftMagnet(field);`

```text
MAGNETISM AND SLOW DRIFT come from the site engine, on the INNER element.
    drift-magnet writes element.style.transform, and so does the positioning above - putting both
    on the same node would make them overwrite each other every frame. Outer node carries POSITION,
    inner node carries DRIFT + MAGNET, and the two compose instead of fighting.
```

### Line 509, above `window.addEventListener('pagehide', () => {`

```text
teardown twin - the PWA keeps the session alive across navigations, so an rAF loop without one
    leaks into the next page (docs/TRAPS.md)
```

### Line 517, above `relayout: () => { layout(); wake(); },`

```text
force a re-measure. Exists so the layout can be checked without waiting on the rendering
      lifecycle - a hidden or throttled tab delivers neither rAF nor ResizeObserver records.
```

### Line 529, above `step: () => {`

```text
advance the physics by one frame without waiting on rAF - for tuning the throw, and the only
      way to check a bounce in a tab whose animation timeline is throttled
```

### Line 532, above `if (raf !== null) { cancelAnimationFrame(raf); raf = null; }`

```text
frame() re-arms rAF on its way out, so drop the pending one first or each manual step
        leaves a second loop running alongside the first
```

### Line 538, above `edgeGaps: () => {`

```text
every window's gap to the nearest field edge - the direct check on "does it reach the edges"
```
