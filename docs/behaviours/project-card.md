# The project card, split into behaviours

2026-10-11. Six commits, one per step, and a small seventh fix to the check, on `main`, not pushed. The card had two scripts
(`merged-card.js`, `project-cards-expensive.js`) and two stylesheets. It now has no script of its
own. Four behaviours do the work and one stylesheet decides how they combine.

| Step | Commit | What |
|---|---|---|
| 1 | `0fb4311` | The behaviour check reads the card from the browser's computed styles |
| 2 | `00d4350` | `tilt` |
| 3 | `18f029c` | `dwell`, and the flip moves into the stylesheet |
| 4 | `2a94c6b` | `border-glow` and `hover-play-video`, the old scripts go |
| 5 | `cce36ec` | One stylesheet, `_project-card.scss` |
| 6 | `4096b2f` | The class `post-card` becomes `project-card` (revert this one alone if needed) |
| 7 | `2a93129` | The check reads the card's sideways angle exactly (no reading changed) |

Two commit messages (`00d4350`, `18f029c`) cite a comparison of pictures as evidence. Rod's rule
since then: pictures prove nothing, he is the eyes. They were left as written. Nothing in this
note relies on a picture. Section "For Rod to look at" is the proof for looks.

## The final markup of a card

`_includes/project-card.html`, the lines that matter:

```html
<article class="project-card drift magnet tilt dwell hover-play-video">
  <a href="..." class="card-link"><div class="card-tilt border-glow"><div class="card-flipper">
```

The grids (`_layouts/section-landing.html`, `_layouts/section-projects.html`):

```html
<div class="wrapper-project-card-grid wrapper-project-card-grid--square pv2-grid">
```

`tilt`, `dwell` and `hover-play-video` sit on the article, which does not move when it leans, so the
mouse never loses the card at its edge. `border-glow` sits on the leaning layer, because the glow is
drawn inside that layer.

## The part of the stylesheet that combines them

`_sass/components/_project-card.scss`. The card's numbers:

```scss
.wrapper-project-card-grid .project-card {
  --magnet-pull: 20;
  --drift-distance-x: 4px;
  --drift-distance-y: 4px;
  --tilt-max: 8;
  --dwell-time: 0.9s;
  --card-lift: 6px;
  --card-grow: 1.02;
  ...
}
```

How the lean, the lift and the grow combine, and the flip:

```scss
.wrapper-project-card-grid .card-tilt {
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.4s ease-out;
}

.wrapper-project-card-grid .project-card.is-tilting .card-tilt {
  transform: rotateX(var(--tilt-rotate-x)) rotateY(var(--tilt-rotate-y));
  transition: transform 0.15s ease-out;
  will-change: transform;
}

.wrapper-project-card-grid .project-card.is-tilting:hover .card-tilt {
  transform:
    rotateX(var(--tilt-rotate-x))
    rotateY(var(--tilt-rotate-y))
    translateY(calc(var(--card-lift) * -1))
    scale(var(--card-grow));
}

.wrapper-project-card-grid .project-card.is-dwelled .card-flipper {
  transform: rotateY(180deg);
}
```

The glow rules (`.glass-plane`, `.card-back::before`, `::after`) read `--border-glow-x` and
`--border-glow-y`. The ring and its defaults are in `_sass/components/_behaviours.scss`:
`--tilt-max`, `--dwell-time`, `--dwell-x`, `--dwell-y` and `--dwell-progress` are declared there
with the `value` mixin.

Not registered, on purpose: `--tilt-rotate-x`, `--tilt-rotate-y`, `--border-glow-x`,
`--border-glow-y`, `--card-lift`, `--card-grow`. The card's inner layers must read them from the
article or the leaning layer, so they have to pass down. A registered angle also stores its number
with less precision, which moved the tilt matrix by about 1e-7. Unregistered, the stylesheet's
matrix equals the old inline one digit for digit.

## The four behaviours

### assets/js/behaviours/tilt.js

**What it does.** Leans an element toward the mouse and, on a phone, with the phone's motion. It
writes `--tilt-rotate-x` and `--tilt-rotate-y` (angles up to `--tilt-max`) and the class
`is-tilting`. The stylesheet turns those into a transform.

**Why it is not simpler.**

- It only starts after the mouse has really moved 4px on the page. Without that, the lean could
  start from a mouse parked under a freshly loaded page, or from the single mouse event a touch
  screen sends on a tap. This is an inference from the old code, which had no note.
- Work is done once per screen redraw (`frame`), because a mouse reports more often than that.
- `active` is fixed when the mouse enters. A card entered before the 4px rule is met stays flat
  until the mouse leaves and comes back, as before.
- The class is added in the same redraw that writes the angles, so the first frame never shows a
  stale angle from the last visit.

**What could still go.**

- The 4px rule, `waitForRealMouse` and `mouseHasMoved`, 14 lines. Lost: the protection above.
- The phone half, `leanWithPhone`, 70 lines. Lost: the lean on phones. It cannot be tried here.
- `active`, 3 lines. Lost: only the "entered too early" case above.

**Functions.**

- `waitForRealMouse()`: watches the page's mouse until it has moved 4px, then stops watching.
- `leanWithMouse(element)`: leans one element while the mouse is on it. Reads `--tilt-max` once.
- `leanWithPhone(elements)`: on touch devices, leans the elements on screen with the phone. Same
  code as before, new names. Its limit is 4 degrees, a number of its own.
- `initTilt(root)`: does nothing under reduced motion; otherwise starts the three above.

**Worth knowing.**

- The angle is measured against the element's own outline. The element is the article, which does
  not lean. The old code measured the leaning layer, which grows and rises as it leans. Same mouse
  position, the new angle is at most 0.17 degrees away on the first approach and 0.33 degrees after
  repeated moves (the old angle crept as the layer moved). Lift and scale are identical.
- For the achievement wall: put `tilt` on the tile itself and the numbers match the wall's current
  code exactly, because the tile measures its own outline there.

### assets/js/behaviours/dwell.js

**What it does.** When the mouse rests on an element for `--dwell-time` (0.9s on the card) within
48px, it adds the class `is-dwelled`. A gold ring under the mouse fills while it waits. Leaving
removes the class and the ring.

**Why it is not simpler.**

- Moving more than 48px restarts the wait. Without it the card would flip 0.9s after entering
  whatever the mouse did.
- The ring is one element shared by every dwelling element, appended to the page body. A ring
  inside each card would lean and flip with the card.
- `void ring.offsetWidth` forces the browser to notice the fill was emptied, so a restart refills
  from zero. Without it the fill continues from where it was.
- The wait is read from the stylesheet once and copied onto the ring, so the fill and the wait are
  one number.

**What could still go.**

- The 48px restart, 6 lines. Lost: the restart.
- The ring's reduced-motion rule in `_behaviours.scss`, 5 lines. `initDwell` already does nothing
  under reduced motion, so the ring never shows.

**Functions.**

- `moveRing(x, y)`: puts the ring under the mouse.
- `fillRing(x, y, time)`: empties the ring, places it, and starts the fill.
- `hideRing()`: hides the ring.
- `attach(element)`: reads the wait, then watches the mouse on one element.
- `initDwell(root)`: does nothing under reduced motion or when no element asks; otherwise adds the
  ring and attaches the elements.

**Worth knowing.** One guard was dropped: skipping a dwell on an already flipped card. It could
never run, because leaving always clears the flip before the next entry.

### assets/js/behaviours/border-glow.js

**What it does.** Writes where the mouse is relative to an element, as `--border-glow-x` and
`--border-glow-y` in pixels. The stylesheet draws a glow along the border from them.

**Why it is not simpler.** The page's mouse position arrives through `cursor-coords.js`, once per
screen redraw. Each element needs its own offset, so each is measured every redraw.

**What could still go.** It updates every glowing element on every redraw, including cards that
are off screen. Skipping those needs an observer, which is more code, so it was left as it was.

**Functions.**

- `initBorderGlow(root)`: collects the elements and updates all of them on every mouse redraw.

**Worth knowing.** It imports `../components/cursor-coords.js`. The mouse tracker is shared
plumbing that lives in `components/`.

### assets/js/behaviours/hover-play-video.js

**What it does.** Plays the video inside an element while the mouse is on it, and pauses it when
the mouse leaves. At rest the video shows its 0.1 second frame.

**Why it is not simpler.** The 0.1 second frame is set when the video's details have loaded, or at
once if they already have. `play()` can be refused by the browser, so its failure is caught.

**What could still go.** Nothing honestly. One line went: the `pause()` before the first hover. The
videos have no `autoplay` and nothing else plays them, so it did nothing (checked: all six videos
on the landing page and all eight on the projects page are paused at 0.1s after load).

**Functions.**

- `showPosterFrame(video)`: moves a video to its 0.1 second frame.
- `initHoverPlayVideo(root)`: for each element that holds a video, shows the frame and plays and
  pauses with the mouse.

**Worth knowing.** Leaving pauses the video where it is. It does not rewind. That is as it was.

## Per step: what changed and the proof

Baseline before any change: the behaviour check (it drives a real mouse and keyboard on 7 page
groups) run twice in normal motion gave byte-identical files, and once in reduced motion. The
comparison of every element's position and style (20 page views, 4513 elements, both a wide and a
narrow window) gave identical files on two runs. The check that opens every component on the lab
page and looks for script errors: 56 specimens, 0 problems. `npm test` passes after every step.

"Behaviour check, byte-identical" below means the file equals the step-1 file, which is the
check's reading of unchanged code.

**1. The check (`0fb4311`).** It read the tilt, flip, easing, will-change and glow from inline
styles and class names. It now reads what the browser computes: the tilt layer's matrix turned
back into angles, lift and scale; the flipper's matrix, read after its transitions end; easing and
will-change from computed style. Proof, on unchanged code: two runs are byte-identical, and
against the old check the only differences are how "nothing" is written (`""` became `"none"` or
`"auto"`; in reduced motion the stylesheet's own `transform 0.4s ease` now shows). Every angle,
lift, scale, flip and ring value is equal.

**2. tilt (`00d4350`).** `tilt.js` added. The mouse and phone code left `merged-card.js`. The
stylesheet owns the transform, the lift (6px), the grow (1.02) and the easing (0.15s in, 0.4s out).
Proof:

- Behaviour check, normal motion: byte-identical.
- Reduced motion: one line differs, the resting easing of the tilt layer, `ease` to `ease-out`.
  The old 0.4s `ease` was never used, because the script's inline value replaced it at the first
  hover. Nothing transitions the transform under reduced motion.
- The composed transform, in a real browser with a real mouse, at three positions: the card's
  computed matrix equals the matrix the old inline string
  `rotateX() rotateY() translateY(-6px) scale(1.02)` gives for the same two angles, digit for digit.
- Angle against the old code, nine mouse positions, same page: at most 0.165 degrees apart on the
  first approach and 0.332 after repeated moves. Lift (-6) and scale (1.02) equal at all nine.
  (The commit message for this step says 0.16. That used the check's first sideways formula,
  which read about 2 percent low; step 7 fixes the formula.)
- Comparison of every element's position and style, class names ignored: the only difference is the
  48 tilt layers' resting easing. Everything else identical.
- 56 specimens, 0 problems.

**3. dwell (`18f029c`).** `dwell.js` added; the ring's styles moved to `_behaviours.scss`;
`--dp` became `--dwell-progress`; the flip is a stylesheet rule on `is-dwelled`. `merged-card.js`
deleted in this step because nothing was left in it. Proof:

- Behaviour check: normal motion byte-identical; reduced motion equal to step 2.
- Flip timing, sampled every frame with a real mouse: the flip starts about 1050ms after the mouse
  first enters, in the old code and the new (the wait is 900ms from the last restart). The ring's
  fill reads 0.8 at 850ms in both, within the 0.1 the old code wobbles by from run to run. The
  ring sits under the mouse to the pixel in both.
- Comparison of every element's position and style, class names ignored: identical across 20 page
  views.
- Compiled stylesheet: one rule removed (`.is-flipped`), one added (`.is-dwelled`), and the ring's
  rules changed by the renames.

**4. border-glow and hover-play-video (`2a94c6b`).** Both added; `project-cards-expensive.js`
deleted; `landing-scripts.html` and `projects-scripts.html` lose their card lines; `site-wide.js`
starts the four behaviours. The check now reads `--border-glow-x`. Proof:

- Behaviour check: normal motion byte-identical, reduced motion equal to step 2. The glow, ring,
  flip and video readings are in it, and they are the old values.
- Composed transform still equal at three positions.
- Comparison of every element's position and style, class names ignored: identical across 20 page
  views.
- Compiled stylesheet: only the five glow rules changed, by the renamed variables.

**5. One stylesheet (`cce36ec`).** `_merged-card.scss` and `_project-cards-expensive.scss` became
`_project-card.scss`: the first file's rules in their old order, then the second's. Names changed:
`.merged-cards` to `.wrapper-project-card-grid`, `.merged-cards--square` to
`.wrapper-project-card-grid--square`, `.ct-glow-card` to `.post-card` (same element, so every
selector keeps its specificity). Proof:

- Compiled stylesheet with the old names mapped to the new: 0 rules removed, added or changed.
- Load order. The merged file now sits where the second one sat, so the card's earlier rules come
  after `page-title-desc`, `portal-window` and `portrait-frame`. Those three share no class with the
  card, so no winner can change. The load-order check agrees: 0 hazards.
- Behaviour check byte-identical (reduced equals step 2).
- Comparison of every element's position and style, class names ignored: identical across 20 page
  views. With class names, the only differences are the card and its grid losing the old names.
- The check that opens every component on the lab page: 0 problems on 54 specimens. The four
  specimens for the two old stylesheets are now two for the one, at the same sizes.

**6. The rename (`4096b2f`).** `post-card` to `project-card` in the template, the stylesheet,
`_sass/pages/_projects.scss` and the behaviour check. Proof: compiled stylesheet with the name
mapped, 0 rules differ; behaviour check byte-identical; comparison of position and style identical
across 20 page views; 54 specimens, 0 problems.

**7. The check's sideways angle (`2a93129`).** The first version of the check read the card's
sideways angle from the matrix with a formula that the card's 2 percent grow bends: 3.89 for a true
3.96. Fixed. The check rounds to whole even degrees, so nothing it writes changed: byte-identical
to the baseline in normal motion and to step 2 in reduced motion.

**Final state, measured once more at the end.** The numbers belong to the card's stylesheet. With
`--tilt-max: 16; --card-lift: 12px; --card-grow: 1.1; --dwell-time: 2s` injected in the page, the
same mouse position leans to 8.05 and 7.93 degrees (was 4.03 and 3.96), lifts 12px and grows 1.1,
the ring fills over 2 seconds (0.4 at 1000ms, 0.9 at 2000ms) and the flip starts at about 2200ms
(was about 1100ms).

## For Rod to look at

Your dev server, after it rebuilds: `http://localhost:4000/tech-art/` (the landing page, a big first
card and smaller ones) and `http://localhost:4000/tech-art/projects/` (the grid). The other
sections' landing and projects pages use the same card. Do each of these on both pages. Nothing
below should look different from before.

1. **Card at rest.** Look at the cards without touching the mouse. They wander slowly by a few
   pixels. Square corners. A video card shows a still frame.
2. **Lean.** Move the mouse across a card slowly. The card leans with the mouse, the side under the
   mouse sinking away from you, up to about 8 degrees. Corners lean more than the middle. It eases
   in fast (about a sixth of a second).
3. **Lift and grow.** As soon as the card starts leaning it also rises about 6px and grows 2%. It
   stays up while the mouse is on it.
4. **Leaving.** Move the mouse off. The card eases back flat over about 0.4 seconds.
5. **Reload with the mouse parked on a card.** Do not move it. Then nudge it a pixel or two. The
   card should not lean yet. After you have moved a few pixels, move off the card and back on:
   now it leans.
6. **The ring.** Rest the mouse on a card and keep still. A gold ring fills under the mouse over
   just under a second. Then the ring disappears and the card turns over to show its takeaway.
   Move the mouse more than a finger's width (48px) while the ring fills: the ring should start again
   from empty where the mouse now is. Small wobbles do not restart it.
7. **The flip back.** Move the mouse off the flipped card. It turns back (about 0.6 seconds) and
   leans flat. Moving the mouse inside a flipped card should not turn it back.
8. **The glow.** A soft light follows the mouse along the card's edge, and a faint patch on the
   glass. On the back (flipped) side too. It should follow without lag on both pages.
9. **Video.** On a card with a video cover: the video plays while the mouse is on it and stops when
   you leave, staying on the frame it stopped at. A card with a picture does nothing.
10. **Drift and magnet.** The card wanders at rest. With the mouse on it, it follows the mouse a
    little (about 10px at most). Off it, it goes back to wandering.
11. **Tags on the projects page.** On a hovered card the small tag icons brighten.
12. **A narrow window.** Make the window narrower than 760px (or open it on a phone-sized
    window). The grid goes from 12 columns to 6, so the cards stack and get wider. With a mouse,
    everything above should still work the same. Cards on a touch screen: depth
    layers are flat there, as before. The phone lean is not verified, see below.
13. **Reduced motion.** If your system asks for reduced motion: no wandering, no lean, no ring and
    no flip. The glow and the video still follow the mouse, as before.
14. **Other pages.** Nothing else on the site should have changed. The top bar links and the social
    icons still wander and follow the mouse. The achievement wall on `/tech-art/about/` is
    untouched.

## What could not be verified

- **The phone lean.** `leanWithPhone` is the old code moved with new names. It needs a phone. It
  now writes the same classes and values as the mouse lean, so one difference exists in theory: on
  a phone the tilting layer gets the compositor hint `will-change: transform` that it did not
  have. And a card that has been tapped keeps `:hover` on some phones, which would also lift and
  grow it while it leans. Both are inference.
- **Looks.** Everything a visitor sees is left to Rod's eye (section above).
- **Other browsers.** Every check ran in headless Chrome. Edge is installed here and was not used.
- **Hover rules of the merged stylesheet** were proved by the rule-by-rule comparison of the
  compiled CSS and the argument about load order, not by looking at a hovered card.
- **A mouse at the narrow width.** The narrow window was covered by the comparison of every
  element's position and style (390px wide). The behaviours were driven with a mouse only at
  1440px.
- **A video's first frame** was read from the page (all paused at 0.1s), not looked at.

## Old names removed, and where to look now

| Old | Now |
|---|---|
| `assets/js/components/merged-card.js` | `assets/js/behaviours/tilt.js` and `dwell.js` |
| `assets/js/components/project-cards-expensive.js` | `assets/js/behaviours/border-glow.js` and `hover-play-video.js` |
| `_sass/components/_merged-card.scss`, `_project-cards-expensive.scss` | `_sass/components/_project-card.scss` |
| `.dwell-ring` styles in the card sheet | `_sass/components/_behaviours.scss` |
| class `post-card` | `project-card` |
| class `ct-glow-card` | gone; its rules are on `.project-card` |
| classes `merged-cards`, `merged-cards--square` | `wrapper-project-card-grid`, `wrapper-project-card-grid--square` |
| class `is-flipped` on `.card-flipper` | `is-dwelled` on the article; the flip rule is in `_project-card.scss` |
| `--mx`, `--my` on the card | `--border-glow-x`, `--border-glow-y` (the achievement wall still uses `--mx`, `--my`) |
| `--dp` | `--dwell-progress` |
| inline `style="transform..."` on `.card-tilt` | `--tilt-rotate-x`, `--tilt-rotate-y` and the stylesheet |
| `initCards` in `landing-scripts.html`, `projects-scripts.html` | `site-wide.js` starts all four |
| `TILT_MAX`, `LIFT_PX`, `SCALE_HOVER`, `DWELL_MS` | `--tilt-max`, `--card-lift`, `--card-grow`, `--dwell-time` on `.project-card` |
| `tiltEnabled`, `onFirstMove` | `mouseHasMoved`, `waitForRealMouse` in `tilt.js` |
| `setupGyroTilt` | `leanWithPhone` in `tilt.js` |

Still carrying the old names, because they were out of bounds for this job: the pin on the card
cover in `tools/css-order-check.mjs` (lines 727-736; the load-order check now says it is stale),
one example in the docstring of `tools/build_workbench.py` (line 138), `STYLE.md` line 22,
`.claude/skills/clarify/SKILL.md`, and the notes under `docs/` and `redesign-lab/`.

## Needs Rod's decision

1. **The lean angle's basis.** It is now measured against the card's resting outline, a stable
   shape. It differs from the old angle by at most 0.33 degrees. Keeping the old basis exactly
   would mean putting `tilt` on the leaning layer. The layer's edge then moves under the mouse as
   it leans, and the card would flicker in and out of hover at its bottom 3 pixels. Not done.
2. **The stale pin.** `tools/css-order-check.mjs` names the two old stylesheets, and the check
   itself says "Delete it from PINNED". Deleting it, and fixing the example in
   `tools/build_workbench.py`, was outside what this job could touch.
3. **Dead rules, left in.** (a) The first `:hover .card-cover` rule (gold border and shadow) is
   always overridden by the rule below it, same selector, later. (b) `--square` is on every grid,
   so the rounded corners (1rem, 12px, 8px) in the card sheet are always overridden; the modifier
   could become the default. (c) The ring's reduced-motion rule never matters.
4. **The phone lean's 4 degrees** is now a number of its own in `tilt.js`. It used to be half of
   the card's 8. Same value, but a card tuned to `--tilt-max: 16` would still lean 4 on a phone.
5. **Reduced motion.** `border-glow` and `hover-play-video` still run under reduced motion, as
   `bindReveal` and `bindHoverVideo` did. Should they?
6. **Where shared plumbing lives.** `border-glow.js` imports `../components/cursor-coords.js`.
7. **`active` fixed at entry** (the "entered too early" case in the `tilt` note). Keep or drop.

## Hand-off: the achievement wall

**Done on 2026-10-11.** The tilt: [achievement-wall.md](achievement-wall.md). The glow, which became
`track-mouse`, `border` and `border-glow`: [border.md](border.md). What follows is the hand-off as it
was written, with the old names.

The wall (`assets/js/components/achievement-wall.js`, `_sass/components/_achievement-wall.scss`)
has its own copies of both effects. To switch to the shared ones it needs:

**From `tilt`.**

- Class `tilt` on each tile. Events become the mouse's `mouseenter`, `mousemove`, `mouseleave`
  (the wall uses pointer events and one listener on the container now).
- The wall's stylesheet writes the transform, as the card does:
  `.aw__tile.is-tilting { transform: perspective(170px) rotateX(var(--tilt-rotate-x)) rotateY(var(--tilt-rotate-y)); transition: transform 0.15s ease-out; will-change: transform; }`
  and the `:hover` rule with `translateY(-1px) scale(1.02)`. Its resting transition must become
  `transform 0.4s ease-out` for the lean-out. `--tilt-max` is already 8, the wall's number.
- Put the class on the tile itself and the angles equal the wall's today, because the tile then
  measures its own outline.
- Three visible changes come with the shared behaviour, so they need Rod's say: it does nothing
  under reduced motion (the wall leans today), it waits for 4px of real mouse movement, and tiles
  lean with the phone's motion.
- `tools/behaviour-check.mjs` reads the wall tile's inline `transform` (`hoverPyro.tilt`). It must
  switch to the computed matrix first. The helper `leanOf` assumes no perspective in the
  matrix; the wall's `perspective(170px)` adds one.

**From `border-glow`.**

- Class `border-glow` on each tile; rename `--mx`, `--my` to `--border-glow-x`, `--border-glow-y`
  in `_achievement-wall.scss`, the wall script, and the three readings in the behaviour check
  (orbit samples, rim glow, after-reload).
- A conflict to settle first. Pressed tiles run an orbit that writes percentages into the same two
  variables every frame, and the wall skips pressed tiles when it writes the mouse position.
  `border-glow` writes to every element it holds. Either the orbit becomes a behaviour of its own
  that `border-glow` steps aside for (a state class), or the pressed tiles drop `border-glow`
  while pressed. The variables are unregistered, so percentages work.
