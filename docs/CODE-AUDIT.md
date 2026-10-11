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

**What it does.** Starts the three effects every page has: drift and magnet, the logo's hand-drawn
wobble, and the mouse glow.

**Why it is not simpler.** It is three imports and three calls. Shrinking it means each effect
starts itself, and then no one file lists what runs everywhere.

**Functions.** None of its own. It calls:

- `init` from `components/drift-magnet.js`, once.
- `initLineBoil` from `components/line-boil.js`, once per logo.
- `init` from `components/cursor-glow.js`, once.

**Worth knowing.**

- "chrome" means the frame around the content, not the browser. Rename candidate.
- Elements added after the page loads get no drift or magnet.

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

## assets/js/components/drift-magnet.js

**What it does.** Moves elements in three ways, each switched on in the markup. One loop moves
them all.

- **Drift** (`data-drift`): a slow wander at rest.
- **Magnet** (class `js-magnetic`): leans toward the mouse while hovered.
- **Flash** (`data-click-flash`): an outline ripple on click.

**It is not the architecture Rod asked for.** He asked for one file per behaviour, combined on
the element (P516). Here the switches are separate but the code is not: one file, one loop and
one record hold drift and magnet together. Flash shares nothing with them and only lives here.
The split is still to do.

**Why it is not simpler.**

- Drift and magnet move the same element, which has one position. `tick` mixes them: magnet fades
  in while hovered, drift fades back after. This does not prevent a split. It means separate files
  need one agreed way to add their movements together.
- One loop, not a timer per element. A page can have a dozen or more.
- The loop skips off-screen elements and stops when nothing visible moves. Without that it would
  run forever for cards nobody sees.
- Each element gets a random start and wander size. Otherwise neighbours move in step.
- Every setting it reads is used on the live site.

**What could still go.**

- `promoted` and the two `will-change` lines, about eight lines. They warn the browser that an
  element is about to move. The saving is unmeasured.
- The 541px check in `bindMagnet`. It turns the magnet off in narrow windows. Removing it is a
  visible change.

**Functions.**

- `lerp(a, b, t)`: moves a value part way to a target. This is the easing.
- `motionOn()`: false when the visitor's system asks for reduced motion.
- `createEntry(element)`: reads the element's settings and makes its record.
- `tick(now)`: the loop. Eases each element, mixes drift and magnet, writes the position.
- `wake()`: restarts the loop.
- `bindMagnet(entry)`: aims the magnet at the mouse while hovered. Lets go on leave.
- `bindClickFlash(element)`: adds `dm-flash` on click, removes it when the ripple ends.
- `init(root)`: sets up every drift or magnet element under `root`. Called once, by `chrome.js`.
- Outside any function: turns motion off for reduced motion, and creates the off-screen watcher.

**Settings in the markup.**

- `data-drift="6"`: wander distance in pixels. `data-drift-x`, `data-drift-y`: one direction only.
  `data-drift-speed`: faster or slower.
- `data-strength="40"`: magnet pull. `data-magnet-clamp`: its limit.
- `data-strength-text`: how far a `js-magnetic-inner` child follows.

**Worth knowing.**

- It moves things with the CSS property `translate`, which inline text ignores. That is why the
  kit button's label never moved (P536).
- Calling `init` twice on one element sets it up twice.
- Abbreviations to rename: `e`, `r`, `tx`, `ty`, `rec`, `vis`, `mag`, `amp`, `dm-`.

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
