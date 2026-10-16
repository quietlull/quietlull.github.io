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

## assets/js/site-wide.js

**What it does.** Starts what every page has: the six script behaviours (drift, magnet, tilt,
dwell, track-mouse, hover-play video), the logo's hand-drawn wobble, and the mouse glow.

**Why it is not simpler.** It is a list of imports and one call each. A behaviour does nothing on
a page where no element carries its class, so one list can serve every page. Shrinking it means
each one starts itself, and then no one file lists what runs everywhere.

**Functions.** None of its own.

**Worth knowing.**

- It was `chrome.js` until 2026-10-11. Rod: the name meant nothing to him.
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
stylesheet moves the glow. It also keeps the glow working over a post's comments. Touch input never
moves it: `cursor-coords.js` ignores touch pointers for every follower.

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

**What it does.** A slow wander at rest, for any element with the class `drift`. It only produces an
offset: it writes `--drift-x` and `--drift-y` and adds the class `is-drifting`. The stylesheet
moves the element.

**Why it is not simpler.**

- Each element remembers six things. Two distances, because the portal windows wander sideways
  only. Two random starting points, or neighbours move in step. Its speed. Whether it is on screen.
- The watcher skips off-screen elements, and the loop stops when none is on screen.

**Functions.**

- `readDrift(element)`: reads the settings from the stylesheet and picks the random starting
  points.
- `tick(now)`: the loop. Writes each on-screen element's offset.
- `wake()`: restarts the loop.
- `initDrift(root)`: registers every drifting element under `root`. Does nothing if the visitor's
  system asks for reduced motion.
- Outside any function: the off-screen watcher.

**Settings.** A component sets them in its own stylesheet. `--drift-distance-x` and
`--drift-distance-y`: how far it wanders each way, 6px unless set. `--drift-speed`: 1 unless set.
The defaults are at the top of `_sass/components/_behaviours.scss`.

**Worth knowing.** An element coming back on screen starts at its wander position. It does not
ease in. That happens up to 200px outside the view.

### Rod's calls

- 2026-10-11: one file per behaviour (P516). The trimmed record: no fade level.

## assets/js/behaviours/magnet.js

**What it does.** An element with the class `magnet` leans toward the mouse while the mouse is
over it. It only produces a pull: it writes `--magnet-x`, `--magnet-y` and `--magnet-amount`
(0 at rest, 1 when fully pulled) and adds the class `is-pulled`.

**Why it is not simpler.**

- The pull eases in and out with a lerp, so it needs the current and the target offset.
- `--magnet-amount` is what lets the stylesheet fade drift out while the magnet pulls.
- The loop only runs while something is easing, then stops.
- A child with `magnet-inner` follows at a smaller share. That is the label inside a button.

**Functions.**

- `tick()`: the loop. Eases every active magnet and writes its values. Drops it once at rest.
- `attach(element)`: reads the settings and listens for the mouse over the element.
- `initMagnet(root)`: attaches every magnetic element under `root`. Does nothing for reduced
  motion.

**Settings.** A component sets them in its own stylesheet. `--magnet-pull`: 40 unless set.
`--magnet-inner-pull`: how far the inner child follows, 20 unless set. `--magnet-limit`: the most
it may move, 0 for no limit.

**Worth knowing.** The inner child is moved with the CSS property `translate`, which inline text
ignores. That is why the kit button's label never moved (P536).

### Rod's calls

- 2026-10-11: the check that switched the magnet off below 541px is removed. It came with the
  borrowed code as a guard against touch screens.

## assets/js/behaviours/tilt.js

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

## assets/js/behaviours/dwell.js

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

## assets/js/behaviours/track-mouse.js

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

## assets/js/behaviours/hover-play-video.js

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

## _javascript/listening-test.js

**What it does.** Runs the hidden switch-sound test at `/norobots/switch-test-7a7f888b/`. Start
loads every clip, each pair shows Play A, Play B and two "I prefer" buttons, and the end shows the
ranking as bars with a percentage. The finished results go into the URL after `#r=`, so the link the friend
copies opens straight to the results. A hash is never sent to a server.

**Why it is not simpler.** The prefer buttons stay off until both clips have been played, or a
listener could pick without listening. The clip files carry the switch's name
(`kailh-box-jade-take-2.mp3`), Rod's call on 2026-10-16 so a file is never confused for another.
The names were already in the page's JSON, so it is blind for an honest friend, not a determined one.

**Functions.** `init` wires the page. `renderTrial` resets for the next pair. `renderButtons`
marks which clip is playing and switches the prefer buttons on. `showResults` fills one bar row per
switch from the `<template>` in the layout. The % is the share of its pairs a switch won. `readHash` reads results back out of a shared link.

**Worth knowing.** `hidden` does nothing on a `.kit-button`: its `display` rule wins. Hide its
parent instead.

## _javascript/modules/audio/audio-clip.js

**What it does.** One sound file, fetched and decoded once however many times it is asked for.

**Why it is not simpler.** `gainDb` lets a page level-match clips in the browser. Any listening
comparison must be loudness matched, because people prefer the louder of two clips. The switch test
matches its clips before they ship, so it passes no gain.

**Functions.** `load` fetches and decodes, once. `duration` is the decoded length.

## _javascript/modules/audio/audio-player.js

**What it does.** Plays one clip at a time, looping. Playing another clip while one is going starts
it at the same moment in its own loop, so a listener can flip between A and B mid-passage. That is
how the standard listening-test tools present a comparison.

**Why it is not simpler.** Every start and stop fades over 10ms, or each switch clicks. The audio session is set to
`playback` because an iPhone with its silent switch on otherwise mutes web audio entirely, while video still
plays, so the page looks broken. Browsers without `navigator.audioSession` skip that line. The page
must call `play` from a click, because browsers keep sound off until the visitor does something.

**Functions.** `load` decodes a list of clips. `playing` and `position` say what is playing and
where. `play` starts a clip, carrying the playhead over. `stop` fades out.

## _javascript/modules/utils/pairwise-test.js

**What it does.** The blind test itself, with no page and no sound. It lists every pair of items in
both orders, shuffles them, records which side won, and scores.

**Why it is not simpler.**
- Both orders, because the order you hear two sounds in biases which one you pick.
- `variants` is how many recordings each item has. A normal pair plays the same excerpt number on
  both sides. A control pairs an item with itself on two different excerpts, so it sounds like any
  other pair. Controls are left out of the ranking.
- The score is a plain win count. Every item meets every other item equally often, and then a
  Bradley-Terry fit, the usual statistics for this, ranks them in the same order.

**Functions.** `shuffle` mixes a list in place. `current` is the pair being asked. `done` says
whether all pairs are answered. `choose` records a side. `summary` returns the ranking, the most
wins possible, how many pairs got the same winner in both orders, and how often A was picked. The page shows
only the ranking; the other two are in the results link for whoever decodes it.

## _javascript/tier-test.js

**What it does.** Runs the hidden sound tier list at `/norobots/sound-tiers-3c91d2e4/`. Six questions
come first (one per screen, the wording is Rod's own, typos kept on purpose), then every
switch starts in the tray under the board; the listener drags each into S, A, B, C, D or F. Done
shows "Your sounds", a bar per sound tag growing left or right from the listener's average, then one project
card per switch in rank order, with its tier and tags, and a link that reopens the results. Each
switch's tags are in the page's front matter.

**Why it is not simpler.** Every clip loads before the board appears, so a tap plays at once.
Tiles carry no label, because any label hints at the answer. The result cards are in the page from
the start, hidden, and only reordered at the end: `site-wide.js` starts tilt once, at load, so a
card built later would never lean.

**Functions.** `init` wires the page. `showResults` fills the chart and puts the cards in rank order.
`readHash` reads results back out of a shared link.

## _javascript/modules/components/question-flow.js

**What it does.** The questions before the tier list, one per screen. Each question is a
`fieldset` the layout renders from the page's front matter, on a faint panel with no border (spacing
and 20px inputs measured from a live Google Form on 2026-10-16; Rod dropped its stripe and border).
The answers are real radio buttons and checkboxes, one full-width bar each; the two pick-any
questions lay them out in as many columns as the width allows. The page title hides while the
questions are up (`:has()` in `_tier-test.scss`), so the question is the top of the page. "Pick one" questions keep Next locked until something is chosen; "pick any" questions can
be skipped. The answers come back as the index of each chosen option plus any "Other" text.

**Why it is not simpler.** Answers are stored as option indexes, not words, so the results link
stays short and the wording can be edited without breaking the meaning.

**Functions.** The constructor writes "Question n of 6" into each card. `start` opens the first
question. `show` switches screen and scrolls it into view. `update` locks or unlocks
Next. `advance` moves on or finishes. `answers` collects what was chosen.

## _javascript/modules/components/tier-board.js

**What it does.** The S to F board. Tap a tile to play or stop it. Drag it to a row, and it lands
where you let go, left of whichever tile you dropped before. Dragging stops the sound. The playing tile is tinted gold
and shows a play icon; the tiles have no hover fill, so on a phone a tapped tile cannot look like it
is still playing. Keyboard:
Enter plays, the letters S A B C D F place the focused tile.

**Why it is not simpler.** It uses pointer events, not the browser's built-in drag and drop,
because built-in drag and drop does not work with a finger. A press only counts as a drag after
6px of movement, so a slightly shaky tap still plays. Holding a dragged tile within 70px of the top or bottom of
the screen scrolls the page at 700px a second, so on a phone a tile can be carried from the tray
below the board up to the S row in one drag. The scroll is `instant` because the site's smooth
scrolling would otherwise swallow it.

**Functions.** `load` puts fresh tiles in the pool, numbered 1 up in the order given, so the listener
can tell clips apart without seeing names. `anyRated` says whether at least one tile is in a row
(Done needs one). `placement` lists the ids in each row, left to right, plus `unrated` for the pool. `setPlaying` marks the playing tile.
`createTile` builds one tile. `startPointer` tells a tap from a drag. `drop` finds the row and
the spot under the pointer. Inside `startPointer`, `follow` keeps the tile under the finger while
the page scrolls and `scrollAtEdge` does the scrolling. `handleKey` places a tile by letter.

**Worth knowing.** `hidden` does nothing on a `.kit-button`, and the tiles are kit buttons.

## _javascript/modules/utils/tier-scores.js

**What it does.** Turns a finished tier board into "your sounds": an affinity for each sound tag.
Each tier is worth points (S 100, A 80, B 60, C 40, D 20, F -20), and a switch left in the tray
is worth 0 (Rod, 2026-10-16), so the board can be finished without rating everything. A tag's affinity is the average
points of the switches carrying it, minus the listener's average over every switch. +30 means they
rank that sound 30 points above their typical switch; 0 means no preference.

**Why it is not simpler.** Measuring against the listener's own average is what makes it a
preference: someone who puts everything in S or A would otherwise score every tag 80 to 100. A
bridge switch (two tags) counts half toward each, so it never weighs more than one switch in total.
The switch count is returned so the page can show how much evidence each tag has.

**Functions.** `tagAffinity` returns each tag with its affinity and switch count, best first.
`TIERS` is the row order the board and the results share. `AFFINITY_RANGE` (S minus F) scales
the bars so the largest possible lead fills half the track.

## _javascript/pwa/sw.js

**What it does.** The service worker: it keeps a copy of what the site loads so it opens offline.
Pages, scripts, stylesheets and the manifest come from the network first (asking the server even
when the browser's cache says the file is fresh), and the saved copy is the fallback. Images,
audio and everything else come from the saved copy first. Each build names a new copy, and the
old one is deleted when the new worker takes over.

**Why it is not simpler.** Saved-copy-first for everything showed the old site on the first visit
after every deploy. Network-first for everything would download every image and clip on every
visit. The split keeps the site current and the heavy files fast.

**Functions.** `store` saves a response if the address may be saved. `networkFirst` and
`cacheFirst` are the two orders. `changesWithEachDeploy` picks between them. `verifyUrl` skips
addresses the config says never to save.

## _javascript/modules/utils/answer-factors.js

**What it does.** Turns the tier list's six answers into "What you need". Each answer option in
the page's front matter can carry `leans` (a nudge from -1 to 1 on a factor such as spring or
pre-travel), a `flag` (a yes/no such as Numpad or Mac) and a `size` (the layout it needs). A
factor's value is the average of the nudges it got. The layout is the `means` text of the largest
`size` ticked.

**Why it is not simpler.** The mapping lives beside Rod's wording in the front matter, so changing
what an answer means never touches code.

**Functions.** `answerFactors` returns `leans`, every flag with whether it was ticked, and `layout`.

## _javascript/modules/utils/shuffle.js

**What it does.** Shuffles a list in place, every order equally likely. Shared by the pairwise test
and the tier test.
