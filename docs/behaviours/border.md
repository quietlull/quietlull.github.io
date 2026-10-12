# The border, and the glow that works with any border

2026-10-11. Six commits on `main`, not pushed, and this note.

Rod: *"lets go with the border object being used with elements passing variables in to use it."*
And: `border` should "pretty much reach everything but only if it makes sense as a component thats
meant to be shared across things". And: the glow should "work with any sort of border object".
`border-glow.js` was renamed because it was "just checking the mouse relative to the element".

| Step | Commit | What |
|---|---|---|
| 1 | `9b1421a` | The behaviour check reads the glow position under the old and the new variable names |
| 2 | `e2c3dcf` | `track-mouse`: the script that writes the mouse position, renamed from `border-glow` |
| 3 | `1c7fa20` | `border-glow` becomes a stylesheet class, first on the card's glass panel |
| 4 | `eb24af4` | `border` and `border-glow` on the achievement tiles; the orbit and the mouse stop sharing variables |
| 5 | `6e40a5d` | `border` on the social icons; `border-break` draws its outline in the border's colour |
| 6 | `9f0f619` | The check reads the final names only |

Nothing was meant to change for a visitor. One thing does, in a case almost nobody will meet: see
"The one difference". Looks are Rod's to check by hand, no picture was taken or compared. The list
is in "For Rod to look at".

## The three pieces

### assets/js/behaviours/track-mouse.js

**What it does.** Writes where the mouse is relative to an element, as `--mouse-x` and `--mouse-y`
in pixels, on every element with the class `track-mouse`. It is the old `border-glow.js`, line for
line, with new names. It draws nothing. Whatever wants the mouse position reads the two variables.

**Why it is not simpler.** The page's mouse position comes from `cursor-coords.js`, once per screen
redraw. Each element needs its own offset, so each is measured on every redraw.

**What could still go.** It updates every tracked element on every redraw, including cards that are
off screen. Skipping those needs an observer, which is more code, so it was left as it was.

**Functions.**

- `initTrackMouse(root)`: collects the elements and updates all of them on every mouse redraw.

**Worth knowing.**

- The offset is measured from the element's outer box, as `getBoundingClientRect()` gives it. For
  a leaning element that is the leaned box, which is what the card and the tiles always used.
- `--mouse-x` and `--mouse-y` are not registered with the `value` mixin, on purpose: a child of a
  tracked element can read its parent's position.
- It is started by `site-wide.js`, so the elements must be in the page when that runs. The tiles
  are, for the reason in `achievement-wall.md`. Measured here: one `.track-mouse` query on the about
  page, 29 tiles found, all 29 written on the first mouse move; on the landing page 8 cards found, 8
  written.

### The `border` class (`_sass/components/_behaviours.scss`)

**What it does.** Draws the edge. The element passes the width and the colour in:

```scss
.border {
  border: var(--border-width, 1px) solid var(--border-color, var(--color-line));
}
```

**Why it is not simpler.** It is three words of CSS. The value is the agreement: every edge on the
site that wants to be shared sets two variables instead of its own `border`, and anything that
needs to know about an edge (the glow, `border-break`) reads those two variables.

**What could still go.** Nothing. There are no variants yet and none were built. A variant is a
modifier beside the base (`border border--dashed`), never a class that inherits from another.

**Rules.**

- `.border`: the whole component.

**Worth knowing.**

- `--border-width` and `--border-color` are not registered with the `value` mixin, so they keep a
  readable fallback in the rule and they pass down to children. Measured: a `border` inside a
  `border` takes the outer one's colour and width unless it sets its own (an inner `border` inside
  an outer one set to red and 3px came out red, 3px, solid). Set both on any border that sits
  inside another.
- It does not touch `border-radius`, `padding` or `position`. The corner shape is the element's own.
- About sixteen other plain 1px edges on the site have not moved to it. They move when Rod reaches
  each file in his audit.

### The `border-glow` class (`_sass/components/_behaviours.scss`)

**What it does.** Two blurred rings of light along the inside of an element's edge, brightest next
to a point. The point follows the mouse by default and a component can drive it itself.

```scss
.border-glow::before,
.border-glow::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: calc(var(--border-width, 1px) + 0.5px);
  pointer-events: none;
  -webkit-mask: linear-gradient(#000000 0 0) content-box, linear-gradient(#000000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  filter: blur(2.5px);
  mix-blend-mode: plus-lighter;
}

.border-glow::before {
  background: radial-gradient(
    var(--border-glow-size, 220px) var(--border-glow-size, 220px)
      at var(--border-glow-x, var(--mouse-x, -9999px)) var(--border-glow-y, var(--mouse-y, -9999px)),
    var(--border-glow-color, var(--color-glow)),
    transparent 100%
  );
}
```

`::after` is the same with `--border-glow-soft-size` (140px) and `--border-glow-soft-color`
(`var(--color-glow-soft)`).

**Why it is not simpler.** The ring is a gradient seen through a mask that cuts out the middle,
so only a thin line at the edge shows. The blur softens it and `plus-lighter` makes it add light to
what is under it instead of covering it. The two rings are a wide one and a small bright one on
top. These were written twice before (the card and the tile) with the same technique, and the tile
had its own copy of the mouse tracking as well.

**What could still go.** The soft ring, if a flat single glow would do (it would change how the
glow looks). Everything else is the look as it was.

**Rules.**

- `.border-glow::before`, `.border-glow::after`: the shared ring.
- `.border-glow::before`: the wide, coloured one. `.border-glow::after`: the small, bright one.

**Worth knowing.**

- The settings a component may pass: `--border-glow-color`, `--border-glow-soft-color`,
  `--border-glow-size` (a radius, default 220px), `--border-glow-soft-size` (140px). The defaults
  are the card's numbers. They are not registered either, so a `border-glow` inside another one
  takes the outer one's numbers.
- To drive the light itself, a component sets `--border-glow-x` and `--border-glow-y` (pixels or
  percentages). The achievement tiles' orbit does.
- It sets nothing on its host, not even `position`. The host must already be positioned.

## What a border promises, and what `border-glow` reads

A border promises:

1. A real CSS border on all four sides, style solid.
2. Its width is `--border-width` (default 1px) and its colour is `--border-color` (default
   `--color-line`), as passed on the element.
3. The corner shape is the element's own `border-radius`.
4. It sets nothing else.

`border-glow` reads exactly:

1. `--border-width`, from the element or the nearest ancestor that sets it. Ring thickness is that
   plus 0.5px (1.5px at the default, which is the number it had everywhere before).
2. The element's `border-radius`, copied with `inherit`.
3. The position: `--border-glow-x` and `--border-glow-y` if set, else `--mouse-x` and `--mouse-y`,
   else off screen (`-9999px`).
4. Its four settings above.

It does not need the `border` class. The card's glass panel has no full edge and uses it without
one. If a future variant of `border` is to work with the glow, these must stay true: the variant
still passes its real width as `--border-width`, and the element's `border-radius` is still the
shape of its edge.

What the host must provide:

- It is already positioned (`relative`, `absolute`, ...).
- Its `::before` and `::after` are free.
- Its `overflow` is visible, or the blur that spills outside the edge is clipped.
- The mouse position is measured on the element with `track-mouse`. If that is a different box
  from the glow's host, the light is offset by the difference. The card does this today: the glass
  panel sits 8px inside the leaning layer that is tracked, and the light is 8px off the pointer, as
  it always was.

## The final markup and each component's settings

**The card.** `_includes/project-card.html`:

```html
<a href="..." class="card-link"><div class="card-tilt track-mouse"><div class="card-flipper">
  ...
  <div class="glass-plane parallax-z-layer border-glow"></div>
```

`_sass/components/_project-card.scss`. The glass panel passes one setting. The card's own `--glow-r`
was never set anywhere, so this is 220px, the number it always had:

```scss
.wrapper-project-card-grid .project-card .glass-plane {
  --border-glow-size: var(--glow-r, 220px);
  ...
}
```

The card keeps, as its own rules reading `--mouse-x` and `--mouse-y`: the soft patch on the glass
surface (in the `.glass-plane` background) and the glow on the back (`.card-back::before` and
`::after`).

**The achievement tile.** `assets/js/components/achievement-wall.js`:

```html
<button type="button" class="aw__tile border border-glow track-mouse tilt" data-id="..." ...>
```

`_sass/components/_achievement-wall.scss`:

```scss
.aw__tile {
  --tilt-max: 8;
  --tile-perspective: 170px;
  --tile-lift: 1px;
  --tile-grow: 1.02;
  --border-color: var(--color-line-faint, #2c2c2c);
  --border-glow-size: var(--aw-glow-r, 90px);
  --border-glow-soft-size: 58px;
  ...
}
```

- **The edge colour in every state is `--border-color`.** Rest is the line above. Hover, keyboard
  focus and pressed set `--border-color: transparent` (the tier gradient shows through). A locked
  tile sets `--border-color: var(--color-black)`. These are the same selectors that used to set
  `border-color`, so the cascade is the same.
- **The tier colours** are `--border-glow-color` and `--border-glow-soft-color`, set by the four
  `data-tier` rules, and by the locked rule (the muted colour). They used to be `--aw-tier-glow`
  and `--aw-tier-glow-soft`.
- **The ring sizes are 170px and 58px on the wall,** not 90px. `.aw` sets `--aw-glow-r: 170px`;
  90px is only the fallback for a tile with no `.aw` around it (the lab page's bare view). The 58px
  is the old fallback of a variable that nothing ever set, so it is written plainly.
- **The 2px edge on a tiered tile is a real `border-width`,** not `--border-width`. See "The one
  difference" and "Decisions".

**The orbit.** `achievement-wall.js` writes `--border-glow-x` and `--border-glow-y` (percentages, as
before) on pressed tiles every frame, and removes them when a tile is un-pressed.
`track-mouse` writes `--mouse-x` and `--mouse-y` on every tile, pressed or not. Neither touches the
other's variables. Measured on the page, the inline style of a pressed tile is
`--border-glow-x: 0.56%; --border-glow-y: 100%; --mouse-x: 176.5px; --mouse-y: 32.09px;` (rounded) and of an
un-pressed one `--mouse-x: 32.5px; --mouse-y: 32.09px;` (plus the lean). The ring reads
`--border-glow-x` first, so a pressed tile shows the orbit and an un-pressed one follows the mouse.
The wall's own cursor code and its `cursor-coords.js` import are deleted.

**The social icons.** `_layouts/section-landing.html` and `_layouts/post.html`:

```html
<a class="dm-social border border-break orb-fill drift magnet" href="..." aria-label="GitHub">
```

(the post foot has no `drift magnet`). `_sass/components/_drift-magnet.scss`:

```scss
.dm-social {
  --magnet-pull: 45;
  --magnet-inner-pull: 22;
  --orb-fill-color: var(--color-gold);
  --orb-fill-time: 0.6s;
  --border-color: var(--color-line);
  --border-break-rest: -1px;
  ...
}
```

`border-break` could read the border's colour, and it is shown to change nothing, so it does. It now
hides the border itself and draws the same edge as an outline:

```scss
.border-break {
  border-color: transparent;
  outline: 1px solid var(--border-color, color-mix(in srgb, var(--color-glow) 40%, transparent));
  ...
}
```

Before, the icon's own rule hid the border and copied the colour into `--border-break-edge`; that
variable and the `.dm-social.border-break` rule are gone. `border-break` comes after `border` in
`_behaviours.scss` on purpose: both are one-class rules, so the later one wins the border colour.
Only the social icons use `border-break`.

## The proof

All of it is headless Chrome with a real mouse and keyboard sent over the DevTools Protocol. No
picture was taken or compared. The "before" was recorded on the unchanged code before the first
edit, rather than by checking the old files out afterwards. Both are the same site.

**The states run.** One script reads every computed style value (every property the browser has,
custom properties excluded) of:

- ten tiles, covering every tier, earned and locked, and pressed and not: the tile, its `::before`
  and its `::after`, at rest, with the mouse on it, and with keyboard focus;
- one tile with the mouse at three whole-pixel positions;
- a pressed tile at three moments of its orbit (the script fixes the clock the orbit reads, so the
  moments are exact), and with the mouse on it;
- a tile pressed, un-pressed with the mouse still, nudged one pixel, and pressed again;
- the first card: the glass panel with its two rings, the back with its two layers, and the leaning
  layer, at rest, at three mouse positions and after leaving;
- the first social icon on the landing page and on a post, with its `::before` and `::after`, at
  rest, hovered (after the transitions end) and after leaving.

It runs with reduced motion on, so nothing drifts or leans and every number is exact. 82,829 values.
**Run twice on the old code: 0 differ** (the floor). Against the old code:

| After step | Values that differ |
|---|---|
| 2 `track-mouse` | 0 |
| 3 `border-glow` on the card | 0 |
| 4 `border` and `border-glow` on the tiles | 2 (the one difference, below) |
| 5 `border` on the social icons | the same 2 |

**The behaviour check** (drives 7 page groups with a real mouse and keyboard): the two runs of the
new check on the unchanged code are byte-identical and equal the previous check's output, in normal
and in reduced motion (step 1). After every later step it is byte-identical to that baseline: in
normal motion after steps 2 to 6, and in reduced motion after steps 4 to 6. It reads the glow on the
card, the orbit samples, the rim glow of three tiles, and the orbit after a reload.

**The comparison of every element's position and style** (20 page views, 4513 elements, a wide and
a narrow window, class names ignored, every computed style value of every element and of its
`::before` and `::after`): identical after steps 2, 3, 4 and 5. The two baseline captures (before
this job, and the previous job's last one) are also identical to each other.

**The check that opens every component on the lab page and looks for script errors:** 55
specimens, 0 problems. The extra one, against the 54 before, is the new `border-glow` class getting
its own tab (it is the card's glass panel).

**`npm test`** passes after every commit. The load-order check reports 0 hazards and the same 5
pins; no `classes:` string in `tools/css-order-check.mjs` needed to change.

**Search of the whole tree,** every file type, including `assets/404.html` (nothing in it), for
`border-glow.js`, `initBorderGlow`, `--mx`, `--my`, `--aw-tier-glow` and `--border-break-edge`:
none left in code, templates or stylesheets. `--border-glow-x` and `--border-glow-y` are left in
three places, all with their new meaning (the ring rule, the orbit, the check). The old names remain
in notes (listed at the end) and in the lab's own old copies under `redesign-lab/`, which were left
alone.

## The one difference

Un-press a tile and keep the mouse still on it. The old script removed the tile's position and the
glow stayed off screen until the mouse next moved, even a pixel. Now the ring falls back to
`--mouse-x` and `--mouse-y`, which `track-mouse` keeps up to date on every tile, so the glow is at
the mouse at once. Measured: right after the un-press the old ring centre is at `-9999px -9999px`,
the new one at `32.5px 32.06px`; after a one-pixel nudge both are at `33.5px 32.06px`. Those are
the only 2 values in the states run that differ: the wide ring and the small ring of that one
moment. To get the old behaviour back exactly, the un-press branch
would also have to remove `--mouse-x` and `--mouse-y` from the tile, which reaches into another
behaviour's variables. It was not done. The brief said un-pressing returns the glow to the mouse at
once; this is that, and it is the only place the old code did not.

Everything else a visitor can see is equal in the states run: a pressed tile shows the orbit (the
mouse over it is ignored), an un-pressed tile follows the mouse, pressing it again returns to the
orbit.

## Decisions

1. **The 2px tier edge is a real `border-width`, not `--border-width`.** Ring thickness is the
   border width plus 0.5px. Passing 2px would make the tiers' ring 2.5px instead of 1.5px, and a
   blurred ring that much thicker is about two thirds brighter at its centre (my arithmetic, not
   measured). So the tile keeps `border-width: 2px`
   (and `1px` when locked) as plain declarations, the glow reads the default 1px and draws 1.5px, and
   nothing changes. The cost: for those tiles the glow does not follow the border width, so the
   promise "the glow follows the border's width" only holds for borders that pass `--border-width`.
   If Rod wants the ring to grow with the 2px edge, it is one change in the tile's rules and the
   ring becomes 2.5px.
2. **The tile passes `var(--aw-glow-r, 90px)`,** keeping the token and its fallback, so the wall
   still draws 170px and a tile outside `.aw` still draws 90px.
3. **`border-break` reads the border.** Shown to change nothing (the icons' full set of computed
   values, at rest, hovered and after leaving, is equal), so it was done.
4. **The check's old-name fallbacks were added, used for steps 2 to 5, and removed in step 6.**
5. The orbit's local names `mx` and `my` became `orbitX` and `orbitY`, because they no longer mean
   the mouse.

## For Rod to look at

Do the card and the tiles with a normal mouse, and with reduced motion if you want to check it
still glows (the glow runs with it on). Nothing here should look different from before except where
it says so.

1. **The card glow, front.** `http://localhost:4000/tech-art/` and `/tech-art/projects/`. Move the
   mouse across a card. A soft light follows the mouse along the edge of the glass panel, with a
   faint patch on the glass. Two layers: a wide orange one and a small pale one.
2. **The card glow, back.** Rest the mouse on a card until it turns over. The same light follows the
   mouse along the back's edge.
3. **The tile glow.** `http://localhost:4000/tech-art/about/`. Move the mouse over the tiles. A
   light follows along the edges of the tiles near the mouse, in the tile's tier colour (bronze,
   silver, gold, prismatic; a muted grey on locked tiles). It should be the same thickness on every
   tile, including the ones with the thicker (2px) edge.
4. **A pressed tile's orbit.** Click an earned tile. The gold star shows, the background warms and a
   light runs around its edge, going round about every 5 seconds. Move the mouse over it: the light
   keeps going round and ignores the mouse. Other tiles keep following the mouse.
5. **Un-pressing.** Click the pressed tile again without moving the mouse. The orbit stops and the
   glow appears at the mouse straight away. This is the one thing that is different: before, it
   stayed off until you moved the mouse a little.
6. **The tile's edge colour, state by state.** Rest: a faint grey edge (black on a locked tile).
   Mouse on it, keyboard focus on it, or pressed: the grey edge is gone and the tier's moving
   gradient edge shows. A locked tile with the mouse or focus on it shows no gradient edge.
7. **The social icons, at rest.** The landing page hero (`/tech-art/`) and the foot of any post
   (for example `/tech-art/posts/ComputeGrass/`). Round, with a thin edge, the same grey as before.
8. **The social icons, hovered.** The edge lifts away from the icon and fades while a gold circle
   rises inside it. Move off: the circle sinks and the edge comes back. On the landing page the
   icons also wander and follow the mouse, as before.
9. **Reduced motion.** With reduced motion asked for, the glow on the card and the tiles still
   follows the mouse (it did before), and nothing leans or wanders.

## What could not be verified

- **Looks.** Everything a visitor sees is left to Rod's eye.
- **Other browsers.** Headless Chrome only. Edge is installed and was not used. `mask-composite:
  exclude`, `color-mix`, `plus-lighter` and `@layer` are all in the old code too.
- **A phone.** The glow and the border were not tried on a touch device. `cursor-coords.js`
  listens to pointer movement, which a finger also produces while it drags, so the glow may follow
  a finger as it did before. Not tested.
- **The states run is under reduced motion,** so it never leans a tile or drifts a card. The glow's
  position is read relative to a box that does not move. The behaviour check covers the same glow
  in normal motion with a tolerance, byte-identical output before and after.
- **The glow's colour on screen.** Computed values were compared, not what the eye sees after the
  blur and the blend.

## The limits

Rod was told three. Confirmed or corrected:

1. **"An uneven or partial border still gets a full even ring": confirmed.** The ring is one number
   all the way round. The card's glass panel has only a left and a bottom edge (both transparent)
   and gets a full ring on all four sides, as it always did. A border with a different width on one
   side does not change the ring either, because it reads one variable, not the four real widths.
2. **"Only rounded rectangles": confirmed.** The corner radii are copied from the host, so square,
   rounded, pill and circle hosts work (a circle was tried: radius 50%, thickness 3.5px with a 3px
   border). A shape made with `clip-path`, or a glow along only part of an edge, is not supported.
3. **"`border-glow` uses both of an element's spare drawing layers, so it cannot share an element
   with `orb-fill`": confirmed, and the clash is on `::before`.** `orb-fill` uses only `::before`.
   Both on one element, measured: the ring's layer takes the circle's size (180px by 120px on a
   120px by 60px host) and its moving transform, and `orb-fill`'s `overflow: hidden` clips the
   glow. The same goes for anything that already uses `::before` or `::after`, like the card's
   cover.

More that were found:

4. **The host must be positioned,** or the rings are placed against some ancestor.
5. **A host with `overflow: hidden` clips the blur** that spills 2.5px outside the edge.
6. **The light is measured from the tracked box.** If the glow's host is a different box from the
   `track-mouse` element, the light is offset by the difference (8px on the card, kept).
7. **The ring sits just inside the edge,** in the host's padding box, but the mouse offset is
   measured from its outer box. A host with an edge `w` wide has the light `w` off. The tiles' 2px
   edge is 2px off, as it always was.
8. **Settings leak into nested glows,** like the border's two variables do.
9. **One position drives both rings,** so the wide and the small one always share a centre.
10. **The blur and the half pixel are fixed** (2.5px, +0.5px). A very thick border gets a ring
    that is thin compared with it.

## Notes elsewhere that are now stale (not edited, out of bounds for this job)

- `docs/behaviours/README.md`: the table row for `border-glow` (now a stylesheet class), the missing
  rows for `track-mouse` and `border`, and the "Still to do" paragraph (the tags' own border break
  remains).
- `docs/behaviours/project-card.md`: the section on `border-glow.js`, the `--border-glow-x` and
  `--border-glow-y` names, and the whole "Hand-off: the achievement wall" section.
- `docs/behaviours/achievement-wall.md`: the last section ("What the next step needs"): the glow
  lines it lists are the ones this job changed.
- `docs/CODE-AUDIT.md`: the section `assets/js/behaviours/border-glow.js`. It should read
  `track-mouse.js`, and `border` and `border-glow` need entries from this note.
- `docs/STATUS.md`, `docs/CHANGELOG.md`, `docs/REQUESTS.md` (P551, P552), `docs/PROVENANCE-AUDIT.md`,
  `docs/simplify/js-raw.md` and `docs/simplify/scss-foundation.md` name the old script or the old
  `--mx`, `--my`.
- Under `redesign-lab/`, the old copies of the wall and the card still carry `--mx`, `--my` and
  `border-glow.js`. They do not ship.
