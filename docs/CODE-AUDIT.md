# Code audit: how each file works

Rod's human audit, started 2026-10-09. He reads every script and template, asks questions, and has
things renamed until he can maintain the site by hand.

**This file is the hand-written half of each review page.** Each `## path` section is that file's
"How it works" text. The rest of a review page (what loads the file, what it imports, which names
it shares with other files) is measured by `tools/build_audit.py` on every build.

The review list: `http://localhost:4000/redesign-lab/todo.html`.

## How to write a section

Rod, 2026-10-10, on the first six: *"your overview is verbose and filled with jargon try to tell me
what the code does in a high level and why it cannot be simplified as well as the function or
functions within the code."* And: *"evaluate if what your saying is the simplest way to say
something only say things in a clear and concise way keeping information thats contextually close
bundled in tight short sentences."*

Every section has these parts and no others:

1. **What it does.** What a visitor would lose if the file were deleted.
2. **Why it is not simpler.** For each piece that looks removable, what breaks without it.
3. **What could still go.** Only if something honestly could. Say what is lost and how many lines.
4. **Functions.** One line each, in file order.
5. **Worth knowing**, if there is a trap. **Rod's calls**, as he makes them.

Rules:

- Before keeping a sentence, ask if there is a simpler way to say it.
- Short sentences. Keep related facts next to each other.
- Plain words. Explain a web term the first time, or do not use it.
- No measurements, history or connections to other files. The page lists the connections.
  History is in `docs/CHANGELOG.md`.
- Name functions, not line numbers.

The source files carry no comments (Rod, 2026-10-09). What a file needs explaining goes here. The
removed comments are in `docs/code-comments/`, and each review page shows its own.

## assets/js/chrome.js

**What it does.** Starts what every page has: drift, magnet and click flash, the logo's
hand-drawn wobble, and the mouse glow.

**Why it is not simpler.** It is five imports and five calls. Shrinking it means each one starts
itself, and then no one file lists what runs everywhere.

**Functions.** None of its own. It calls `initDrift`, `initMagnet` and `initClickFlash` from
`behaviours/`, `initLineBoil` once per logo, and `init` from `components/cursor-glow.js`.

**Worth knowing.**

- "chrome" means the frame around the content, not the browser. Rename candidate.
- Elements added after the page loads get no behaviours.

## assets/js/components/cursor-coords.js

**What it does.** Tracks the mouse position and passes it on once per screen redraw. Three effects
use it: the cursor glow, the card glow band, and the achievement tile rim.

**Why it is not simpler.** A mouse reports far more often than the screen redraws. Without this,
each effect would redo its work on every report. This keeps only the latest position.

**What could still go.**

- The `bound` check, about four lines. It delays listening until someone asks. Every page has the
  glow, so someone always does.
- The -9999 starting position. Nothing is passed on before the first movement, so it is never used.

**Functions.**

- `flush()`: once per redraw, passes the latest position to everyone who asked.
- `onCursor(fn)`: adds `fn` to the list. The first call starts listening to the mouse.

**Worth knowing.** Nothing can be taken off the list.

## assets/js/components/cursor-glow.js

**What it does.** Copies the mouse position into `--cx` and `--cy` on the glow layer. The
stylesheet moves the glow. It also keeps the glow working over a post's comments.

**Why it is not simpler.** Following the mouse is five lines. The rest is for the comments box.
That box is a page from giscus.app shown inside ours, and a browser will not tell our page where
the mouse is over another site's page. So an invisible sheet covers the box to catch the mouse,
with a hole under the pointer to let clicks through.

- No sheet: the glow stops at the edge of the comments.
- No hole: the sheet takes every click.
- Hole follows movement only: a click after scrolling is lost. The page moved, the mouse did not.
- No touch lines: a phone or touchscreen cannot tap the comments.

**Functions.**

- `setupCommentsShield()`: lays the sheet over the comments, only where the main input is a mouse.
- `moveHoleUnderPointer(event)`: moves the hole to the mouse. A finger touch removes the sheet.
- `init(root)`: finds the glow layer, sets up the sheet, then copies the mouse position on every
  redraw.

**Worth knowing.**

- The hole is drawn in `_sass/pages/_post.scss` under `.cursor-shield`. `--hole-half` is half its
  width, 6px. Bigger: the glow trails a slow mouse more. Smaller: less room for a shaky click.
- One thing, three names: file `cursor-glow`, class `cursorglow`, and "cursor lantern" in older
  notes.

### Rod's calls

- 2026-10-10 (P545): the sheet used to cover the whole box and step aside when the mouse rested.
  Replaced with the hole. Confirmed fixed.

## assets/js/behaviours/drift.js

**What it does.** A slow wander at rest, for any element with `data-drift`. It only produces an
offset: it writes `--drift-x` and `--drift-y` and adds the class `is-drifting`. The stylesheet
moves the element.

**Why it is not simpler.**

- Each element remembers six things. Two distances, because the portal windows wander sideways
  only. Two random starting points, or neighbours move in step. Its speed. Whether it is on screen.
- The watcher skips off-screen elements, and the loop stops when none is on screen.

**Functions.**

- `readDrift(element)`: reads the settings from the markup and picks the random starting points.
- `tick(now)`: the loop. Writes each on-screen element's offset.
- `wake()`: restarts the loop.
- `initDrift(root)`: registers every drifting element under `root`. Does nothing if the visitor's
  system asks for reduced motion.
- Outside any function: the off-screen watcher.

**Settings in the markup.** `data-drift="6"`: distance in pixels. `data-drift-x`, `data-drift-y`:
one direction only. `data-drift-speed`: faster or slower.

**Worth knowing.** An element coming back on screen starts at its wander position. It does not
ease in. That happens up to 200px outside the view.

### Rod's calls

- 2026-10-11: one file per behaviour (P516). The trimmed record: no fade level.

## assets/js/behaviours/magnet.js

**What it does.** An element with the class `js-magnetic` leans toward the mouse while the mouse
is over it. It only produces a pull: it writes `--magnet-x`, `--magnet-y` and `--magnet-amount`
(0 at rest, 1 when fully pulled) and adds the class `is-pulled`.

**Why it is not simpler.**

- The pull eases in and out with a lerp, so it needs the current and the target offset.
- `--magnet-amount` is what lets the stylesheet fade drift out while the magnet pulls.
- The loop only runs while something is easing, then stops.
- A child with `js-magnetic-inner` follows at a smaller share. That is the label inside a button.

**Functions.**

- `tick()`: the loop. Eases every active magnet and writes its values. Drops it once at rest.
- `attach(element)`: reads the settings and listens for the mouse over the element.
- `initMagnet(root)`: attaches every magnetic element under `root`. Does nothing for reduced
  motion.

**Settings in the markup.** `data-strength="40"`: pull. `data-magnet-clamp`: its limit.
`data-strength-text`: how far the inner child follows.

**Worth knowing.** The inner child is moved with the CSS property `translate`, which inline text
ignores. That is why the kit button's label never moved (P536).

### Rod's calls

- 2026-10-11: the check that switched the magnet off below 541px is removed. It came with the
  borrowed code as a guard against touch screens.

## assets/js/behaviours/click-flash.js

**What it does.** A ring leaves the element's edge and fades when it is clicked. Used on the four
social icons of a landing page.

**Why it is not simpler.** It adds the class `dm-flash` on click and removes it when the animation
ends. The forced re-read of the element's width makes a second click restart the ring.

**Functions.** `initClickFlash(root)`: wires every element with `data-click-flash`.

**Worth knowing.** The ring itself is the `dm-border-fly` animation in
`_sass/components/_drift-magnet.scss`.

## assets/js/components/line-boil.js

**What it does.** Redraws every letter in one of three hand-drawn fonts, six times a second, so
text looks alive.

**Why it is not simpler.** Swapping fonts is three lines (`boilTick`). The rest stops the text
jumping:

- The fonts have different letter widths. Each letter gets a box as wide as the widest, or the
  line would change length six times a second. That is `pinGlyphAdvance`, most of the file.
- Digits share one width, so the landing clock stays put.
- Vertical text (the landing hero) needs every box the same size.
- It waits for the fonts before measuring. Measuring early locks in the wrong widths, with no
  error.
- It measures again on resize.

**Functions.**

- `pinGlyphAdvance(host, text)`: rebuilds the text as one fixed-width box per letter.
- `boilTick(host)`: moves every letter to its next font.
- `initLineBoil(host)`: the one other files call. Waits for the fonts, measures, starts the timer.

**Worth knowing.**

- The landing clock writes straight into the letter boxes (`.line-boil-text__g`), so two files
  share that class name.
- The timer never stops, on screen or off.
- `__g` is short for glyph. "Advance" is the typesetter's word for a letter's width.

## assets/js/effects/scene-mode.js

**What it does.** Hides the dock and water in the 3D background on pages marked "minimal".
Lanterns and fireflies stay. The mark is `data-scene-tier` on `<body>`: 30 pages are minimal, 4
full, 21 have no scene, and the 404 has its own.

**Why it is not simpler.**

- The scene loads late and in pieces, so hiding once is not enough. It retries every tenth of a
  second until the dock and water are hidden, for up to ten seconds. That is the timer and
  `counts`.
- The water is hidden twice, object and surface. The reflection code switches the object back on
  every frame. That is `setWater`.

**What could still go.**

- The lantern line in `apply`, one line. Nothing hides a lantern, so showing them looks pointless.
  Not proven.
- The `?scene=` override, one line. A testing aid.
- The whole file, with a bigger job. Minimal pages download the full 843 KB scene, then hide part
  of it. A scene built without the dock and water would not need this file.

**Functions.**

- `setWater(mesh, wanted)`: shows or hides the water, object and surface.
- `apply(tier)`: shows or hides the dock and water for this page.
- `counts()`: counts the pieces and how many are hidden, so the timer knows when to stop.
- Outside any function: reads the mark and starts the timer, unless the page has no scene.

**Worth knowing.** It loads on all 56 pages and does nothing on the 21 with no scene.
