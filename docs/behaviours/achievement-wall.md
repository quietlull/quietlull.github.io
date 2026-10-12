# The achievement wall's tiles, moved onto `tilt`

2026-10-11. Two commits on `main`, not pushed, and this note.

| Step | Commit | What |
|---|---|---|
| 1 | `c2f6dea` | The behaviour check reads the tile's lean, transition and will-change from the browser |
| 2 | `376f859` | The tiles lean through `assets/js/behaviours/tilt.js`; the wall's own copy is deleted |

Only the lean moved. The glow, the orbit and the tags (`.kit-tag`) are untouched. Looks are Rod's to
check, by hand: no picture was taken or compared. Section "For Rod to look at" is the list.

## What changed

### The tile's markup

`assets/js/components/achievement-wall.js`, line 150. The only change is the class `tilt`.

```html
<button type="button" class="aw__tile tilt" data-id="..." data-tier="..." aria-pressed="..."
  aria-disabled="true"><span aria-hidden="true">icon</span><i class="aw__on" aria-hidden="true">&#9733;</i
  ><span class="aw__sr">name</span></button>
```

`aria-disabled` is only there on locked tiles. `tilt` sits on the tile itself, so the tile measures
its own outline, as the wall did.

### The stylesheet rules that compose the lean

`_sass/components/_achievement-wall.scss`, lines 43 to 78. The wall's numbers are custom properties
on the tile. `--tilt-max` is read by `tilt.js` (it is declared in `_behaviours.scss`, default 8).
The other three are the wall's own names.

```scss
.aw__tile {
  --tilt-max: 8;
  --tile-perspective: 170px;
  --tile-lift: 1px;
  --tile-grow: 1.02;
  ...
  transition: transform .4s ease-out;
}

.aw__tile.is-tilting {
  transform: perspective(var(--tile-perspective)) rotateX(var(--tilt-rotate-x)) rotateY(var(--tilt-rotate-y));
  transition: transform .15s ease-out;
  will-change: transform;
}

.aw__tile.is-tilting:hover {
  transform:
    perspective(var(--tile-perspective))
    rotateX(var(--tilt-rotate-x))
    rotateY(var(--tilt-rotate-y))
    translateY(calc(var(--tile-lift) * -1))
    scale(var(--tile-grow));
}
```

`--tilt-max: 8` equals the default. It is written out so the wall's number is visible in the wall's
file, as the card does. Drop it if Rod would rather not repeat a default.

### What was deleted

From `achievement-wall.js`, 36 lines: `TILT_DEG`, `TILT_LIFT`, `TILT_SCALE`, `TILT_PERSPECTIVE`, the
variables `tiltEl`, `tiltFrame`, `tiltX`, `tiltY`, the function `applyTilt`, and the three listeners
`pointerover`, `pointermove` and `pointerout` that drove it. The wall's listeners on the container
went from six (`pointerover` twice, `pointermove`, `pointerout`, `focusin`, `click`) to three
(`pointerover` for the panel, `focusin`, `click`).

The stylesheet's old `transition: border-color .18s ease, transform .18s cubic-bezier(.22,1,.36,1)`
is replaced, see "The transition question".

## How each tile is registered exactly once

The wall does not call `initTilt`. `site-wide.js` calls `initTilt(document)` once, and by then the
tiles are in the page. Measured in a real browser on `/tech-art/about/`:

- `document.querySelectorAll('.tilt')` is called once on the page, by `initTilt`. At that moment the
  document is "interactive", 29 tiles are in the page, and the query finds 29.
- Each of the 29 tiles has exactly one `mouseenter`, one `mousemove` and one `mouseleave` listener
  (87 listeners, none doubled).
- `tilt.js` has put exactly one `mousemove` listener on the page (`waitForRealMouse` ran once).
- Before the change the tiles had no listeners of their own and no `.tilt` was found.

Why the order works: the wall's script is an inline module in `_includes/about-scripts.html`. The
layout includes it before `site-wide-scripts.html` (`_layouts/default.html`, the `script_includes`
loop, then line 57), and `site-wide.js` is a module script too. Module scripts run in the order they
appear in the page. This is the spec's rule and Chrome did it, but nothing in the code says so.

What this means:

- **If the wall called `initTilt` on its own tiles**, every tile would be registered twice (the
  page-wide call finds them too, because the class is in the markup), and `waitForRealMouse` would
  start twice. Two page listeners, one flag. Harmless to the flag, but each tile would lean from two
  listeners. So it does not call it. This is read from `tilt.js`, not measured.
- **If the wall's script ever starts later than `site-wide.js`** (it waits for data, or the two
  includes swap places in the layout), the tiles are missed and simply never lean. No error is
  thrown. That is the one way this can break silently. No guard was added.

## The transition question

The old script replaced the tile's stylesheet transition with an inline one on the first mouse hover
and never put the first back. Read from computed styles in a real browser, mouse and keyboard, with
the old script served in place of the new one on the same page:

| Moment | Old | New |
|---|---|---|
| Before any hover | `border-color .18s ease, transform .18s cubic-bezier(.22,1,.36,1)` | `transform .4s ease-out` |
| Mouse enters, first time | `transform .15s ease-out`; border snaps | same |
| Mouse resting on it | `transform .15s ease-out`, will-change `transform` | same |
| Mouse leaves | `transform .4s ease-out`; border snaps | same |
| Rest, after the first hover | `transform .4s ease-out` | same |
| Keyboard focus on a tile never hovered | border fades over 0.18s, and again on blur | border snaps |
| Keyboard focus on a tile hovered before | border snaps | border snaps |

Six mouse moments were compared (entering, resting, just left, long after, entering again, resting
again, with the mouse already warmed up past the 4px wait): transition, will-change, whether a
transform is set, border colour and the list of running transitions are equal at all six.

Two things follow.

- **The mouse never saw the border fade, not even on the first hover.** Entering with the mouse
  showed only the transform transition running and the border already snapped. So the stylesheet's
  `border-color .18s ease` only ever showed for keyboard focus on a tile that had not been hovered.
- **The stylesheet's `transform .18s cubic-bezier(...)` was never used.** Nothing moves the tile's
  transform before the script's own inline transition took over.

Decision: the new stylesheet says what the mouse always saw. Resting `transform .4s ease-out`, while
leaning `transform .15s ease-out`, no border fade. The alternative, keeping the fade, would add a
0.18s border fade to every mouse hover (new) to keep it on keyboard focus (old but rare). It is one
edit if Rod prefers it: put `border-color .18s ease, ` first in the `transition` of `.aw__tile` and
of `.aw__tile.is-tilting`. The difference that is left is the keyboard row above. It is in the list
for Rod.

## The proof

Everything below was measured in headless Chrome with a real mouse and keyboard sent over the
DevTools Protocol. Nothing was judged by a picture.

**The behaviour check** (`tools/behaviour-check.mjs`, drives 7 page groups):

- Unchanged code, twice: the two files are byte-identical. Also for the new check after step 1.
- Step 1, against the old check: the only differences are the added keys and the tilt line itself.
  The new readings on the old code, centre of a tile: `rotX 0, rotY 0, lift -1, scale 1.02`; at a
  point to its upper right: `rotX 4, rotY 4, lift -1, scale 1.02`; hovered `transform 0.15s
  ease-out`, will-change `transform`; after leaving `none`, `transform 0.4s ease-out`, `auto`.
  Resting, before any hover: `border-color, transform 0.18s, 0.18s ease, cubic-bezier(...)`.
- Step 2, normal motion, against the step-1 file: **one line differs**, the resting tile's
  transition (old `border-color, transform 0.18s, 0.18s ease, cubic-bezier(0.22, 1, 0.36, 1)`, new
  `transform 0.4s ease-out`). Every lean, lift, scale, hover and leaving reading is equal. So are the
  panel, the press, the stored state, the orbit (`orbitPercent`, `orbitMoves` true), the rim glow
  (three tiles, true), and the pressed tiles after a reload.
- Step 2, reduced motion, against the step-1 file: that same line, plus exactly the lean lines.
  `tilt` and `tiltOffCentre` are `"none"`, the hover transition is `transform 0.4s ease-out` and
  will-change is `auto`. No other line moved.
- The helper that turns the matrix back into angles (`leanOf`) needed no change for the wall's
  `perspective(170px)`. Perspective only changes the matrix's last row, which the helper never
  reads. Checked on three matrices built from known angles: rotX, rotY, lift and scale came back
  exact.

**The composed transform, three mouse positions on one tile** (Pyrotechnician, real mouse): the
tile's computed transform is the same text as the old formula
`perspective(170px) rotateX(a) rotateY(b) translateY(-1px) scale(1.02)` computed on a scratch
element from the same two angles `a` and `b`, at all three. Built as a `DOMMatrix` instead, the two
differ by at most 2.7e-6, 4.4e-6 and 4.9e-6, which is the browser printing matrix numbers to six
digits.

**The angles against the old code** (the old script from `git` served in place of the new one, same
page, same mouse path), three positions, whole-pixel mouse positions (what a real mouse reports):

| Position | Old rotX, rotY | New rotX, rotY | Difference |
|---|---|---|---|
| 1 | 4.90043, -5.35147 | 4.900426, -5.351473 | 0.000004, 0.000003 |
| 2 | 4.8983, 5.83526 | 4.898139, 5.835437 | 0.000161, 0.000177 |
| 3 | -5.87829, 5.82753 | -5.878332, 5.827487 | 0.000042, 0.000043 |

Fractional mouse positions (the test driver sends them; a high-density screen or browser zoom can
too) differ by up to 0.23 degrees. See "Differences nobody asked for".

**The tiles lean one at a time and let go.** Tried on First Light (the first tile), Toolsmith (the
middle one, locked), 1001% (the last, locked) and Pyrotechnician: hovering sets `is-tilting` and a
transform on that tile only (one tile leaning at a time), and moving away clears both.

**Keyboard, old and new on the same page:** `focus` on Curator shows Curator in the panel, Enter
presses it (`aria-pressed true`, star opacity 1, panel says Active), Tab goes to the next tile and
the panel follows. Equal in both.

**The comparison of every element's position and style** (20 page views, 4513 elements, a wide and a
narrow window, class names ignored): only the 29 tiles on `/tech-art/about/`, at both widths, are
listed. Each is in the same place and the same size. Only its style code differs. To show why:
adding the old `transition` line back onto the new stylesheet, in the page, turns the two new style
codes back into the two old ones, one to one (`9krudf` back to `1yscn85`, `15rxfzp` back to
`16xvkp3`). So the resting transition is the only style change at rest. (The split between the two
codes was 3 and 26 in the capture and 2 and 27 in my check. One tile was in a different earned
state. Not chased.)

**The check that opens every component on the lab page and looks for script errors:** 54 specimens,
0 problems, output file identical to the one taken before the change (the wall's specimen
included).

**`npm test`:** passes (eslint, stylelint, the load-order check, no comments in the source).

**Search of the whole tree** for `applyTilt`, `TILT_DEG`, `TILT_LIFT`, `TILT_SCALE`,
`TILT_PERSPECTIVE`, `tiltEl`, `tiltFrame`: none left in live code. They remain in the archive of
stripped comments (`docs/code-comments/assets/js/components/achievement-wall.js.md`), in
`docs/simplify/js-raw.md` (history), and in the lab's old copy
`redesign-lab/extracted/components/achievement-wall/achievement-wall.js` (a separate copy that does
not ship). Notes that now say the wall "still has its own tilt" are listed at the end.

## The three accepted changes, shown

1. **Reduced motion: no lean.** Behaviour check, reduced: `tilt: "none"`, `tiltOffCentre: "none"`
   (they were a lean with the old script).
2. **The lean waits for 4px of real movement.** Same page, old script and new, whole-pixel mouse:

   | Mouse | Old | New |
   |---|---|---|
   | First event on the tile | leaning | flat |
   | Nudged 1 to 3 pixels | leaning | flat |
   | Moved out into the gap, then back in | leaning | leaning |

   The new tile stays flat until the mouse has travelled more than 4px on the page, and a tile
   entered before that stays flat until the mouse leaves and comes back (`active` in `tilt.js`).
3. **On a phone the tiles lean with the phone's motion.** Not testable here. See below.

## Differences nobody asked for

These came with using the shared behaviour and are not in the three accepted changes.

- **Keyboard focus on a tile you have not hovered:** the border used to fade in over 0.18s and out
  again. Now it snaps. See "The transition question".
- **A 10ms stall at the icon's outline went away.** The old script listened for `pointerover` and
  `pointerout`, which fire when the mouse crosses from the tile onto its own icon, so the lean was
  cleared and set again. Frame by frame (real mouse, 1px every 25ms across the tile): the old lean's
  sideways angle stood still at -5.227 for three frames (about 10ms) at the crossing; the new one
  goes -5.270, -5.228, -5.187, -5.148, steadily. `tilt.js` uses `mouseenter` and `mouseleave`, which
  do not fire for the tile's own children.
- **Fractional mouse positions lean up to 0.23 degrees differently.** Pointer events can carry a
  half pixel, mouse events never do. A mouse on a normal screen reports whole pixels, so there it is
  identical (table above). On a screen with display scaling or with browser zoom, rounding is at most
  half a pixel on a 64px tile, which is 0.125 degrees at the first reading, and up to 0.23 after the
  tile's own movement feeds back. Measured with fractional positions standing in for such a screen.
- **Touch and pen (inference, not tested):** the old script used pointer events, so a finger
  dragging on a tile could lean it. `tilt.js` uses mouse events, so a finger does not. A pen
  hovering still sends mouse events.

## For Rod to look at

Page: `http://localhost:4000/tech-art/about/`. The wall is at the bottom of the page. Do each of
these. Nothing should look different from before except where it says so.

1. **The lean.** Move the mouse slowly across a tile. The side under the mouse sinks away, up to
   about 8 degrees at a corner, with strong perspective. The tile rises 1px and grows 2%. It eases
   in fast (about a sixth of a second) and, when you leave, back to flat over about 0.4 seconds.
   Locked (dim) tiles lean the same.
2. **Accepted change 1, reduced motion.** Ask the system or the browser for reduced motion
   (Chrome DevTools, Rendering, "Emulate CSS media feature prefers-reduced-motion") and reload. The
   tiles do not lean. They did before. The panel and the rainbow edge on hover still work.
3. **Accepted change 2, the 4px wait.** Reload with the mouse resting on a tile and do not move it.
   Then nudge it a pixel or two: the tile stays flat. Move the mouse more than a few pixels, leave
   the tile and come back: it leans.
4. **Accepted change 3, a phone.** Not testable here (see below). On a phone, tiles should lean a
   little, at most about 4 degrees, as you tilt the phone.
5. **Keyboard focus on a tile you have not hovered.** Reload, press Tab until a tile is focused
   without touching the mouse. The rainbow edge now appears at once. Before it faded in over under
   a fifth of a second. Say if you want the fade back (one edit, see the transition question).
6. **Across the icon (you probably will not see it).** Drag the mouse slowly across the middle of a
   tile, over the icon. The lean should glide. Before, it paused for a blink at the icon's outline.
7. **Must not have changed:**
   - **The panel.** Hover or focus a tile: the panel on the right shows its name, progress and
     state. Nothing hovered: "Hover an achievement to read it...".
   - **Press.** Click an earned tile: the gold star appears at its top right, the background warms,
     a light runs around its edge. Click again: it goes. Click a locked tile: only the panel shows.
     A pressed tile still leans on hover.
   - **The glow.** A soft light follows the mouse along the edges of the unpressed tiles, including
     tiles far from the mouse.
   - **Keyboard.** Tab moves between tiles, the panel follows, Enter or Space presses.
   - **After reload.** Pressed tiles are still pressed and still run their light.

## What could not be verified

- **The phone lean.** No device here. `leanWithPhone` is the card's code. One thing to watch: on a
  phone the lean gives every tile on screen the class `is-tilting` at once, and with it
  `will-change: transform`. That could give up to 29 tiles a layer of their own on a page that
  already blurs and blends their glow. This is inference and its cost was not measured.
- **Touch and pen** (see above): from reading, not run.
- **Looks.** Everything a visitor sees is left to Rod's eye.
- **Other browsers.** Headless Chrome only. Edge is installed and was not used. The script order
  that registers the tiles is the spec's rule, measured in Chrome.
- **A screen with display scaling.** Fractional positions stood in for it.

## What the next step (the glow) needs from this file

Nothing about the glow changed. These are the lines that are still the glow's or the orbit's, after
step 2.

`assets/js/components/achievement-wall.js`:

- line 1, `import { onCursor }`;
- line 186, `startOrbit()` in the click handler, and line 187, which removes `--mx` and `--my` when a
  tile is switched off;
- lines 191 to 208, the orbit: `ORBIT_MS`, `raf`, `orbit`, `startOrbit` and its first call. It writes
  percentages into `--mx` and `--my` every frame on pressed tiles;
- lines 210 to 218, the `tiles` list and the `onCursor` block. It writes pixels into `--mx` and
  `--my` on every tile that is not pressed.

`_sass/components/_achievement-wall.scss`:

- lines 9 and 10, `--aw-glow-r` and `--aw-orbit`;
- lines 80 to 103, the two pseudo-elements that draw the glow, reading `--mx`, `--my`,
  `--aw-glow-r`, `--aw-glow-r-soft`, `--aw-tier-glow` and `--aw-tier-glow-soft`;
- lines 136, 139, 142, 145 and 167 to 168, which set the two tier glow colours.

`tools/behaviour-check.mjs` reads `--mx` and `--my` at lines 510 (orbit samples), 529 (rim glow) and
542 (orbit after reload).

What to know before touching them:

- **`tilt` and the glow measure the same box.** The wall's glow code and `border-glow.js` both call
  `getBoundingClientRect()` on the tile, which is the leaned, lifted, grown box. A tile with both
  classes keeps the same basis as today.
- **The orbit conflict from the card's hand-off is still open.** `border-glow` writes pixels into its
  two variables on every element that has the class, on every cursor redraw. The orbit writes
  percentages into the same two on pressed tiles, and the wall's cursor code skips pressed tiles.
  The class list is fixed in the markup (line 150), so either the orbit becomes its own behaviour
  that `border-glow` steps aside for, or the click handler adds and removes the class.
- **Starting order matters here too.** Anything started from `site-wide.js` sees the tiles, for the
  reason in "How each tile is registered". Anything the wall starts itself does too, and a behaviour
  must then not also be started page-wide.
- **The tile's lean variables inherit.** `--tilt-rotate-x` and `--tilt-rotate-y` are not declared as
  registered values, so they pass down to the tile's children. Nothing reads them there.
  `--tilt-max` is registered and does not pass down, so it has to be on the tile, as it is.
- **The wall's own names.** `--tile-perspective`, `--tile-lift` and `--tile-grow` are the wall's
  names for its numbers. If the border class decision settles on another naming pattern, they are
  three declarations and three uses in this one file.
- **The wall's pointer listeners are different on purpose.** The panel still listens for
  `pointerover` on the container (line 169) and `onCursor` still uses `pointermove`. Only the lean
  moved to mouse events.

## Notes elsewhere that are now stale (not edited, out of bounds for this job)

- `docs/behaviours/README.md` line 38, "Still to do: the achievement wall has its own copy of the
  tilt and the glow". Now only the glow.
- `docs/STATUS.md` line 20, the same sentence.
- `docs/behaviours/project-card.md`, the section "Hand-off: the achievement wall" and line 135. The
  `tilt` half is done; the `border-glow` half stands.
- `docs/AUDIT-1-WORKING.md` lines 206 and 331, "pointerover/pointermove handlers bound" for the
  wall's tilt. History, but no longer true of the code.
- `docs/CODE-AUDIT.md` line 213 repeats the card's hand-off sentence.
