# Status

Keep this note to roughly one screen. It answers "what is true right now" so a session orients
cheaply. Detail lives in the linked notes; history lives in [CHANGELOG.md](CHANGELOG.md).

## READ THIS FIRST AFTER A CLEAR (2026-08-23, end of the layer-refactor session)

### THE H0 SITE MARK IS LIVE ON ALL THREE SURFACES, AND P100 IS CLOSED (2026-08-23)

Rod's three scratch fonts landed. `redesign-lab/assets/fonts/Lineboil{1,2,3}-Regular.ttf` - three
files, not six: the `.otf` twins are byte-identical to the `.ttf` and all are TrueType.

**`extracted/components/line-boil/`** (css + js) carries the pattern Rod picked: sequential order,
per-glyph phase with a random STARTING face, 6/sec. Record: **D37**. It is now on:
- the **landing hero**, the vertical name (3 columns, 24 glyph cells)
- the **top bar wordmark** on landing and post
- the **portal centre mark**, which was the last greybox on that page

**THE PORTAL IS 9 OF 9 - the first fully approved surface on the project.**

**Vertical is not horizontal rotated, and four separate bugs came out of assuming it was.** Under
`text-orientation: upright` every glyph advances by the same em box, so per-glyph widths pin nothing
- the vertical pin is ONE uniform advance, and raw drift there is 100px. A lone space in a `<span>`
measures ZERO advance (rendered the mark as RODNEYFAN). The mark also WRAPS at the space into two
sub-columns, so wrapping the space in a cell removed the break and forced one long column - the space
is now a plain text node. All in TRAPS.

**The faces contain NO DIGITS** (measured). The hero clock cannot use this yet. If Rod cuts three
digit faces TABULAR, the clock becomes the easy case and the reason it was routed to procedural
jitter disappears.

### THE BOIL NOW HAS NUMBERS, AND THE CLOCK IS THE FOURTH SURFACE (2026-08-23)

Rod cut three DIGIT faces and asked whether they could be combined with the text boils. **They can,
and nothing had to be merged into new font files.** `unicode-range` assembles one family name from
several files, so `Lineboil1` means his letters for letters and his numerals for U+0030-0039. Every
caller keeps working untouched, because the boil cycles family NAMES - a clock boils by the same
code path as a word.

**The colon comes from the letter faces, and it had to.** Measured: none of the three number faces
carries U+003A; all three letter faces do. Rod called this himself. Since the range covers only the
digits, the colon falls through on its own and needs no branch. It boils too - the three letter
faces draw it 31.3 / 31.6 / 40.4px wide at 100px.

**THE NUMBER FACES ARE NOT TABULAR**, which a word does not care about and a clock does. Numberboil1
draws "1" at 491 per 1000em against "2" at 680, a 39% spread. On raw metrics the clock would shove
itself sideways every tick and every boil frame. The pin now gives every digit ONE shared box - the
widest digit across all three faces - making them tabular at runtime. Measured: six digit cells all
47.06px, mark width 340.72px unchanged across five ticks and twelve boil frames.

**THE HORIZONTAL PIN WAS WRONG SINCE IT WAS WRITTEN, and Rod spotted it by eye.** The probe measured
each glyph in whichever face the HOST was set in - font 1 - and pinned the box to that. That is only
right if font 1 is the widest, and it usually is not: **7 of 9 glyphs on the top-bar mark are wider
in another face than the box they were given, worst "F" at 17.30px against 23.20px in face 3, a 34%
overflow into the next letter.** It measures all three faces now and pins to the per-character max.
0 overflowing after.

**The clock's tick had to stop assigning `textContent`** - that would delete all eight pinned cells
every second and kill the boil on the first tick. It writes into the cells instead.

### THE LANDING'S H0 BLOCK IS FINISHED, AND EVERY FLAGGED ISSUE ON IT IS CLOSED (2026-08-23)

Rod tuned the hero name across five asks, then closed it: "fix all the flagged issues, once finished
consider landing done." The tuning: tracking `-.23em -> -.06em` (that value was drawn for Caveat, a
CONNECTED script, and it crushed separate letterforms), `line-height 1.7 -> 4.23`, and a doubling out
to a left edge he drew on a screenshot.

**In a vertical writing mode `letter-spacing` is the VERTICAL gap and `line-height` is the HORIZONTAL
one.** That single fact answered four of his five asks, each as a one-number change.

**Four flagged issues, all fixed, with the desktop composition unmoved - max drift 0.01px across
eight measurements.** That was the constraint: robustness only, no design movement.

1. **A dead `ResizeObserver`** was writing `top` to a `position:static` element on every resize.
2. **The trench drifted against the halo.** `line-height` resolves against the column's clamped
   font-size while the row `gap` resolved against the base font, so the proportion Rod approved held
   at exactly one viewport height: 10.1% of a column at 26.1px, 5.7% at the clamp ceiling. The clamp
   is hoisted onto the row now so both ems share one base. Measured 10.1% at both ends.
3. **The stack spilled the hero below ~633px of viewport height**, because the socials were rem-fixed
   at 247.6px while the name shrank with its `vh` clamp. Every value is a clamp capped at the
   approved number, so desktop is untouched and only short windows differ.
4. **THE LINE-BOIL PIN NEVER RE-RAN ON RESIZE.** It writes fixed px while callers size it with `vh`,
   so a pin taken at one window height is simply wrong at the next: loaded at 900 and resized to 620,
   the mark stayed 274.9px against its true 189.1px. Debounced resize re-pin, with the listener
   attached only AFTER fonts resolve so a resize cannot re-pin fallbacks. Teardown twin added.

Verified across six viewports - 375x667, 390x920, 1440x620, 1440x900, 1905x1080, 1425x1700 - all
passing fits-hero, no-left-spill, no-page-overflow and symmetric air.

**THE LANDING IS NOT 12 OF 12.** Three slots are still `data-state="pending"`: top bar, view all
button, project cards. The top bar's own label carries an unanswered question. "Consider landing
done" was NOT read as approving them - that is Rod's call, and it is queued as an open question.

### The CSS architecture changed. Everything in `redesign-lab/` is now in cascade layers.

`@layer reset, tokens, prose, components, overrides;` at the top of all 60 lab stylesheets.
Full reasoning, the rejected `:where()` route and the open question: [DECISIONS.md](DECISIONS.md)
**D36**. **The one rule to carry:** unlayered CSS beats every layer, so a page's own inline
`<style>` outranks both the ladder and every component it loads. That is not settled yet - see
"What is still open" below.

**A frozen copy of every pre-refactor stylesheet is served at `redesign-lab/original-css/`.**
`redesign-lab/layer-diff.html` renders any page against it, live, with tabs. The refactor reverses
by copying that directory back.

### What the 7-agent audit found, because it changes how much to trust a green result

One agent per page, each asked to DISPROVE its result rather than confirm it.

- **The refactor had shipped broken to 40 lab pages** that kept their own unlayered `*` reset. Every
  component's padding was zeroed on them. Fixed on all 41; verified restored. In TRAPS.
- **The before/after harness under-reported badly** - it sampled `[class]` elements only, 15
  properties, one width, default state. A page with 37 changed values read as 1. Also in TRAPS.
- **Two zeros were proven properly** (portal via its own debug API at 5 widths and 4 states;
  about across 3 variants x 2 widths x 44 properties) and two were zero for a boring reason: the
  page loads almost nothing.
- **One agent claim was checked and rejected** (a 4th declaration supposedly removed from
  merged-card; it is present). An audit finding is a claim like any other.

### THE THING THAT REFRAMES EVERYTHING ELSE

**None of the eight components the refactor was built to fix is loaded by any final page.** Five
live only on `component-review.html`; three are on no page at all. **The six final pages load 12 of
the 56 bench components.** So the `.prose` collision - including the 1.06:1 case - was only ever
rendering on bench and review surfaces. It would have bitten the moment components landed in
`.prose`, which is exactly what happens next, so the fix was worth making before the merge rather
than after. But it was never live damage on Rod's pages, and a "0 changed" on a page that loads one
component is close to no evidence at all.

### Where the work is

- **The components ARE built.** 56 on the bench; **22 of the 25 pending slot TYPES across the final
  pages have one.** Only three do not: the post's metadata rail, the portal's centre identity mark
  (blocked on Rod's three scratch fonts), and the About trophy WALL (its tile is picked - V6 - but
  the wall is unbuilt and its colours wait on the About scene).
- **What has NOT happened is the merge.** The final pages are deliberately clean and the components
  sit on the bench. **That is the next job** and Rod has asked to start it.
- **`component-review.html` now shows the picks** - 19 decision lines, 9 winning variants badged,
  six deliberately showing no winner because the pick was not one of the three built.
- Slot state: **25 of 97 approved.** **portal 9/9 (complete)**, landing 9/12, post 4/19,
  projects 1/19, about 1/26, ramblings 1/12.

### What is still open

1. **Do pages get to override the ladder?** Each page's inline `<style>` is unlayered and currently
   wins. The proposed answer is a **lint that fails on any unlayered rule in a `final-*` page**,
   not a wrapper - a `page` layer above `prose` changes nothing, and escalating decisions.css's
   selectors would contradict its own documented strategy.
2. **Adopting the bigger post headings** (Rod prefers them, D31 change). **Blast radius is none** -
   no other final page uses `.prose`. But the five H2 margins were carrying the article's entire
   rhythm, because paragraph-to-paragraph gap is 0 and always was. Exact edits and the two ladder
   knock-ons are in REQUESTS P219.
3. **The portal's focus rings** degraded when `focus-ring.css` went into `overrides` above
   `components` - four controls lost their gold outline and two link rings flipped from inset to
   outset, where `overflow:hidden` clips them.
4. Rod's `#f86a03` is set on `--h0-color`/`--h1-color` but **does not reach the post's H1**, for the
   same page-override reason as (1).

### The blockout contract

**`redesign-lab/analysis/2026-08-23-blockout-contract.md`** holds every reservation MEASURED off the
rendered blockouts at 1440. **The post content column is 767 (94ch), NOT the blockout's 711** - Rod
settled it: *"its the 94 character one that's correct."* The blockout is 56px stale and stays on
disk as an approved artefact; that file is the correction layer.
**Reservations corrected from measurement:** callout 76 -> 130 (the old number came from a
single-line, unlabelled callout). **Reservations that a picked component cannot fit and should not:**
prev/next 345x44 (drawn for the text version, Rod picked a card), page title 930x44 (the locked H1
is ~48px taller), bio block (real copy needs 257px more).

## THE TEXT PASS IS DECIDED (2026-08-23) - read this first

- **`redesign-lab/text-decisions.html` is the single decision surface for everything that displays
  text.** 7 tabs, 25 sections, ~77 sourced variants, **23 picks settled**. It REPLACED and DELETED
  four separate comparison pages (`prose-blockout`, `component-blockout`, `callout-tests`,
  `orb-callout-tests`) - do not go looking for them, and do not build a fifth.
- **`redesign-lab/decisions.css` is where those picks live as real CSS**, imported by all six
  `final-*` pages. One definition, six consumers. Every block carries the citation that decided it;
  a rule with no citation is a bug in that file. Full record: [DECISIONS.md](DECISIONS.md) **D31**
  (the ladder, the colour ramp, the 23 picks) and **D30** (the callout family).
- **D30: tape colour encodes callout TYPE** - warning pink, note green, tldr orange, quote blue,
  reference no tape. **CORRECTED, and the correction matters:** this was first written up as
  "overturning the colour half of D27". Rod pushed back, it was checked, and **he was right** - no
  `final-*` page ever assigned a per-section tape colour and no section-colour token exists
  anywhere. D27's "for different sections" was **never built**, so D30 redirects an unbuilt plan.
  **There is no section-colour hole.** *Lesson: check whether a decision was ever IMPLEMENTED
  before calling a change an overturn.*
- **The heading ladder is ACCEPTED and it is layout-affecting** - landing and about change on every
  heading; the post already matched. **The post's h1 -> h3 skip (WCAG 1.3.1) is FIXED** - its five
  section breaks are real `<h2>` now and pick up case G automatically. Bench chrome was also
  de-outlined on five pages (state-panel `<h4>`s were polluting the document outline).
- **MARGIN NOTE DROPPED** (Rod 2026-08-23). One candidate instance in 19 posts, and it cost a
  permanently asymmetric article plus a fight with the Starlight TOC over the single gutter. **Two
  things settle by it not happening: the prose column stays centred, and the TOC keeps its gutter.**
- **WASHI TAPE ROTATION WAS 10x TOO BIG and is corrected** - `-0.5deg` -> `-0.05deg`, gneiss's real
  value. Found by a reference agent, verified against the saved source. **Consequence worth knowing:
  0.05deg lifts a 700px card's corner 0.61px, so the card effectively stops looking tilted** - which
  is what gneiss's own does. Visible tilt would be OURS and needs labelling.
- **THE FINAL PAGES ARE DELIBERATELY CLEAN.** Rod: *"keep the final pages clean and we can add
  everything together."* Only `decisions.css` has been spread to them - type and colour, no
  components. Real components land in `extracted/components/` for review first.
- **MORNING REVIEW PACKET: [`redesign-lab/REVIEW.md`](../redesign-lab/REVIEW.md)** - what changed on
  all six pages, the picks, the corrections Rod caught, what the agents found, and the short list of
  what still needs him. Linked as the first card on the lab index.
- **Worklist: [`redesign-lab/COMPONENT-TABLE.md`](../redesign-lab/COMPONENT-TABLE.md)** - 9 to
  build, 5 already real, 3 blocked on missing sources, 3 out of scope. Portal was excluded while
  another agent held it; **that agent has since finished it** - see the portal entry below.
- **A pattern to watch, it recurred three times in one session:** the judging pages kept re-asking
  questions Rod had already answered (callouts, meta chips, code block). Decisions were landing in
  DECISIONS.md and never being reflected back onto the surfaces. Check the decision record before
  presenting any comparison.

## Current (2026-08-11)

- **Docs system LANDED (Phase 0 done).** PROJECT-STATUS.md and CLEANUP-LOG.md are RETIRED - their
  still-true content was folded into these notes (breathing system -> [BREATHING.md](BREATHING.md),
  behavioral lessons -> memory, the rest is history in git). The /sync-docs skill now targets this
  folder.
- **Redesign ACTIVE.** Element-by-element build in the `redesign-lab/` bench (gitignored),
  governed by the provenance law (see CLAUDE.md). Palette exploration running in parallel.
  Current branch: `claude/water-rework` (About-page water rework).
- **Refactor Phases 1-3 DEFERRED until the redesign ships** ([DECISIONS.md](DECISIONS.md) D6) -
  boundary extraction happens once, on the post-redesign surfaces.
- **Measured ground truth (2026-08-11 scan):** 38 SCSS files / ~8,158 lines; 48 JS files / ~5,520
  lines; 19 posts (16 tech-art, 2 game-design, 1 blog; 10 wip: true); 15 layouts; 51 includes.
  Re-measure before relying on counts - they rot fast.
- **The site is a vendored Chirpy fork with no theme/site boundary.** Stock and custom code
  interleave in the same files. Full inventory: [THEME-BOUNDARY.md](THEME-BOUNDARY.md).
- **Housekeeping pending:** `_gif-archive/` (414 MB) to move out of the repo (compressed MP4s
  already deployed; originals kept for rollback); `.claude/worktrees/` (~900 MB) to prune.

## In flight

- **NEXT SESSION IS THE SOURCING PASS.** Brief at the top of `redesign-lab/HANDOFF.md`; roadmap and
  counts at the top of `docs/MERGE-WORKLIST.md`. Rod's goal: *"finish the lab, find all content that
  needs to have a reference and find a suitable reference from the gallery or workbench."*
  **23 of 97 slots approved** across the six final pages (portal 8/9, landing 8/12, post 4/19,
  projects 1/19, about 1/26, ramblings 1/12). Counted on the `data-slot` ATTRIBUTE - grepping the
  bare string also matches the state panel's own selector and the CSS, which is how a "measured"
  105 briefly overruled a correct 97.

- **PAPER IS DEAD EVERYWHERE (D29).** A0 picked for the image mat; D27 had already taken it off the
  cards. Same reason both times - the background carries the texture. Files stay on disk; the scene's
  paper FILTER (D24) is a different thing and is untouched.

- **THE CALLOUT QUESTION NEEDS RE-ASKING, NOT RE-PRESENTING (D29).** The seven-way set mixed a
  layout device (margin note), three placements of an already-settled convention (the tape) and a
  question Rod had already answered (flamedfury orb, top right; tape overlaying the content box).
  Split into its three real questions before showing him anything.

- **THE PORTAL IS FINISHED (2026-08-23, ROD: "Yup ok we are good here").** It was the last unbuilt
  surface and it is now the most complete one. `final-portal.html` + `extracted/components/portal-window/`.
  **ONE THING IS STILL OPEN and Rod named it himself: the centre identity mark.** It is greybox at
  272x165 and *"will be replaced by the line boil h0 font later"* - which is BLOCKED on his three
  scratch fonts (P100: identical metrics across all three or the text reflows every frame). It also
  doubles as the RESET control, so it is doing a real job while it waits.

  **The page.** Full-bleed field, no scroll at any height, eight windows: three section doors, five
  socials. Space Jam supplies only the SIZE relationships and its no-two-alike rule; the POSITIONS
  are Rod's own, hand-placed and converted from a screenshot he sent (P138). Everything is held as a
  fraction of each window's TRAVEL RANGE, which is the single idea that makes the constellation and
  the drag bounds grow with the page together. Three tiers enforced at runtime rather than baked:
  leads floored at 1.6x the tallest social, socials squared, every window grown to fit its own header.

  **The look took three passes and the first two were both properly sourced and both wrong.**
  Windows-98 chrome (98.css), then a faithful zutomayo copy in their real `#E8D2E9`/`#6F2ADD` - the
  latter only possible because Rod granted a palette exception, which is now spent. The answer was a
  component we already had: the approved project card, opaque, in its own deep blue. **The lesson is
  worth more than the result** - two rounds of chasing an external look ended at internal reuse.

  **What is genuinely borrowed, and what is ours.** zutomayo's drag is CONFIRMED (their `common.js`
  read from source: `.drag-and-drop`, mousemove writes `style.top/left`, the whole panel is the
  handle). They have **no inertia and no clamping at all**, so the throw, the page-edge bounce and
  the proximity lean are provably ours. Their measured 43%-of-bar-height type ratio is the one thing
  that survived the look changes. Social icons are Simple Icons, verbatim. The Enter affordance is
  button-kit's outline variant - **not a button**, a `<span>` inside the card's own link, so it adds
  no second tab stop.

  **FIVE FINDINGS FROM THIS BUILD THAT GENERALISE** (all in `docs/TRAPS.md` now):
  a font swap silently invalidates any layout measured from text; grid items default to `min-width`/
  `min-height: auto` and will grow past a clipping parent; `<a>` is natively draggable and eats
  pointer drags; the browser pane freezes CSS transitions, so a transitioned property reads its start
  value forever; and do not MODEL a layout the runtime already computes - measure it.

  **SHIP-CHECK FLAGS, open for Rod:** the `ResizeObserver` in `portal-windows.js:485` has no
  teardown twin; and there is no `prefers-reduced-motion` path in the component CSS - only the LEAN
  is gated in JS, so drag, throw and bounce still run. Contrast passes everywhere (lowest 3.45:1).

- **AWAITING ROD, each with a page:** the trophy wall design (no source, needs the conversation),
  `palette-backup.html` (open in HIS browser - localStorage is per-origin), the landing footer vs the
  other five (8 items/107px vs 5 items/63px), and the two queued asks - the nav hover effect and the
  kit tags.

- **BLOCKED ON FILES:** the line boil needs Rod's three scratch fonts. Constraints recorded in P100 -
  identical metrics across all three or the text reflows every frame.


- **COLOUR: WARM GREY IS LOCKED (2026-08-23, ROD).** `--color-panel: rgba(28,26,24,.55)`,
  `--color-panel-solid` / `foundations --panel`: `#1c1a18`. Origin ROD, not a source - the swatch was
  labelled "ours" when he picked it. Removes the last blue from every surface except the sky.

- **THE ABOUT PAGE IS BUILT ON THE LANDING'S MODEL.** ROD: *"about page is the landing page except
  the about me is the hero, the achievements are the project cards."* Numbers come from HIS landing,
  measured: hero = full first screen (`min-height:520px` floor), sections at `padding-block:30px 60px`
  = 90px apart, each with its own backing on `--color-panel`. `?v=strip` still shows the Klubnika
  version he approved; `?v=panels` still has dimden.

- **FOOTER IS ON ALL SIX FINAL PAGES.** `footer-line`, verbatim from the landing where it is approved.

- **APPROVED THIS ROUND:** achievements popup (dimden at 200x76), scene tiers, skills draw at 6s,
  Klubnika for About, warm grey. **Post page confirmed: no three.js at all, and that is final.**

- **THE PORTAL IS BUILT** (see the rebuild bullet above). The frame ended up ZUTOMAYO's rather
  than 109ichiki's, on Rod's 2026-08-23 instruction. Frame and handle sourced
  (`sources/109ichiki-dialog-window.md`); the magnetism is ours; **the bounce has no source** and
  must be labelled ours. Space Jam orbital is rejected.

- **STILL NEEDING ROD:** the achievements TROPHY WALL has no source and he has said it needs a design
  conversation first (backlog E1b). `palette-backup.html` still wants opening in HIS browser -
  localStorage is per-origin.


- **ROD'S DECISION BATCH IS BUILT IN (2026-08-23).** Washi tape case D, section-break case G (now on
  `final-post.html`), the achievement toast at 200x76 dimden B, Klubnika for About, the two scene
  tiers, all rewards scrapped, skills draw at 6s, magnetic skills, the View-all button, and the
  119px -> 30px gap. Every one verified by measurement, not by eye.

- **BOTH SCENE EFFECT BUGS HAD THE SAME CAUSE: the module was never on the page.** The sparkler and
  the firework GREETING GATE both ship in `commons.min.js`, which no lab page loads. Copied into
  `redesign-lab/effects/` per D22. **Correction on record:** the earlier "fireworks verified at 6.8%
  down" measured forced calls, not the emitter - proving a patch works is not proving a feature runs.

- **SCENE TIERS (ROD, P72):** `full` = lanterns + fireflies + post + dock + water -> landing, about.
  `minimal` = lanterns + fireflies + post -> projects, portal, ramblings. `bare`/`blobs` deleted.
  **OPEN: what the POST page gets** - it loads no three.js at all and "none will be the blobs"
  reverses the earlier "hana blobs for posts".

- **AWAITING ROD, each with a page:** [`final-about.html`](/redesign-lab/final-about.html) spacious
  rebuild (200px rhythm, four slots, full-bleed scene), [`card-greys-tests.html`] over the live
  scene, [`achievement-tests.html`] trophy wall (the toast is picked, the wall is not),
  [`palette-backup.html`] (open it in HIS browser - localStorage is per-origin).

- ~~**NOT STARTED:** the PORTAL rebuild.~~ DONE 2026-08-23 - see the rebuild bullet above. Space Jam is rejected;
  zutomayo's `.ztmy-pcmove-*` window is sourced and saved, but that is ONE verified reference and
  the process wants more before variants get drawn.


- **TWO SCENE BUGS FIXED, and neither was where the docs pointed (2026-08-22).** The **sparkler was
  never loaded** - it lives in `commons.min.js` and no lab page loads that bundle; measured zero
  `[class*=spark]` elements before the fix. The **fireworks never reached the top** because
  `createAutoFirework` uses `randomY = Math.random() * 0.5 + 0.3` against a `1 - randomY` screen
  coordinate, so bursts land 20-70% down and the top fifth is excluded by construction - NOT the
  unprojection trap in TRAPS, which is fixed and holding. Both patched lab-side in
  `redesign-lab/effects/`; fireworks verified reaching **6.8% down** over 50 spawns.

- **EVERY FINAL PAGE NOW HAS `?scene=full|lanterns|bare|blobs`.** Measuring corrected the premise:
  all six run the FULL scene (58 lanterns + dock + water) and **nothing loads
  `three-background-minimal.min.js`**. "Minimal" is 35 spheres with no lanterns at all. Rod's pick
  between the four modes is open.

- **WASHI TAPE IS SETTLED.** Case D (winterwind irregular clip-path tear) picked and built, border
  deleted, opaque fill and axis-alignment both confirmed kept. The only tape debt left is the
  green's missing source, which Rod parked as "ok for now".

- **AWAITING ROD, all with a page:** `achievement-tests.html` (5 minimised toasts + trophy grid),
  `section-break-tests.html` (7 cases incl. his D+F mix), `card-greys-tests.html` (now over the LIVE
  scene), `final-about.html?v=panels|strip`, `palette-backup.html`.

- **THE ABOUT AND PORTAL REBUILDS ARE THE NEXT REAL BUILDS.** Both have their references measured
  and saved (`sources/about-page-spacing.md`, `sources/zutomayo-pcmove-window.md`) and neither is
  started. The About number that matters: **our section rhythm is 10px, the references run 100-213px.**


- **ALL SIX `final-*` PAGES NOW CARRY A REAL LAYOUT (2026-08-22).** Landing and post were already
  built out; projects, ramblings, portal and about were one-slot stubs and are now their chosen
  blockout's actual geometry with greybox slots in the right places. Every number verified by
  measurement at 1440, not by eye: projects panel **1000** with a 3x300/20px grid and the zero-blur
  `5px 10px` sticker shadow; ramblings `.wf` **1140** with the left edge identical on all 8 rows
  (the property D15 picked it for); portal's **8 satellites matching [w,h,left,top] exactly**, no
  two the same size; about carrying **BOTH** dimden (675+225=900, zero gap) and Klubnika (928, side
  borders only) behind `?v=panels` / `?v=strip`, which is what D15 asked for. **`final-about` is no
  longer blocked on building - it is waiting on Rod's pick.**

- **THE WASHI TAPE RESEARCH IS DONE AND IT CONTRADICTS THE ASK (2026-08-22).** `washi-tape-tests.html`
  holds the real reference asset plus 6 sourced edge mechanisms. gneiss.place's `tape1.png` measures
  **298 x 116 on its own axis, drawn at 5.42 degrees off its bitmap axis, ends wandering +/- 6px in
  2-3 broad lobes** - a TEAR, where Rod asked for a roller's serration (10-20 alternations). Both
  are drawn; the pick is his. **Three faults independent of the tips**, all measured: a `1px border`
  the real tape has none of, axis-alignment where the real tape sits at 5.42 degrees to its own
  edge, and an opaque two-tone fill where the sourced stripe has a transparent third band.
  Citation corrected: `.taped` is in gneiss's `deco.css`, NOT `index.css` (0 hits for "tape" there).

- **THREE NEW COMPONENT PAGES AWAITING ROD.** `washi-tape-tests.html` (8 cases),
  `section-break-tests.html` (6 sourced heading/section treatments at the real 767px measure, three
  of them deliberately box-free so the ask gets tested rather than proved), and
  `card-greys-tests.html` (7 candidates - the cards are genuinely blue today at
  `rgba(12,16,38,.55)`; NOT committed, because that one line repaints every card on every page).


- **THE LANDING IS BUILT OUT (2026-08-22, ROD: "im fairly happy with what we have now").**
  `final-landing.html` carries every section it declares: top bar, V6 hero, section head, project
  cards, skills head, skills row, reel head, demo reel, scene bottom, footer. **8 of 11 slots
  approved.** Rod called it DONE as a build; it is not "everything approved", and the difference
  matters:
    - **top bar** - #26 is still his taste call, and #45 (where the one motion/scene control lives)
      is still unanswered. There is currently NO manual motion control anywhere on the final pages;
      `prefers-reduced-motion` is honoured but a visitor cannot turn the scene off.
    - **project cards** - the component carries a CIRCULAR CITATION. Its band-reveal cites
      yannesidibe.com/about, a real URL that has never been read. Ledger still says Slop.
    - **demo reel** - a deliberate placeholder. ONE bar that chains: a clip plays, and on `ended`
      another takes over. Its pool is the POSTS' OWN HEROES, read from each post's `image.path` in
      front matter, not a sweep of `assets/media` - the sweep was serving `GrassTwitchingIssue.mp4`,
      which is a clip of a bug. Four usable heroes; WIP posts and missing files excluded.
      Regenerate from front matter, do not hand-edit the baked list. Still has no sourced DESIGN,
      which is why Rod pulled the section on 08-18. He: "we will fix it later."
  New components on the bench: `section-head`, `skills-row`, `footer-line`, `tag-badge`,
  `washi-tape` (registry now 32).

- **PAPER IS OUT, THE TAPE CARRIES THE COLOUR (D27, 2026-08-22, ROD).** Cards are plain,
  transparent and grey - the scene already carries grain, so a second texture competed with it.
  The washi tape becomes the site's one loud object: striped, four colours, one per section
  (orange, pink, blue, green). Colour is concentrated in one component rather than spread.
  **This overturns T0-A ("warm + 1 cool")** - see D27 for the reconciliation before re-litigating.
  Green is the one colour with no source. Paper is PARKED not deleted; `paper-tests.html`,
  `paper-tuner.html` and the extracted height maps all survive and nothing shipped, so there is
  nothing to unwind.

- **V6 IS THE HERO (LOCKED 2026-08-16, ROD).** `hero-tests.html?v=v6` - three upright all-caps
  vertical columns at the right edge plus the large live clock. Two changes landed on it the same
  day: the social rail now hangs 48px under the vertical name (the same gap the name takes from
  the top bar) instead of sitting at harumaki's 50%, and the top bar's favicon was unbundled from
  the wordmark (gap 14 -> 38px, name KEPT - Rod).
  SUPERSEDED 2026-08-18: the mark is no longer capped at 60px. It is FULL-BLEED - a square of the
  bar's full height, anchored hard to the left edge, escaping the bar's padding with negative
  margins. The old cap existed to stop the bar growing past 96px and breaking a hard-coded
  `calc(100vh - 96px)` hero; that constant is gone too. `--top-bar-height` is derived from the row
  heights at every breakpoint and declared on `:root`, so the mark and the hero both size against
  the real bar.
- **ALL SIX SUB-PAGE BLOCKOUTS BUILT (2026-08-16) - AWAITING ROD'S EYE.** `post-` `projects-`
  `about-` `ramblings-` `resume-` `portal-blockout.html`, greybox, 4 sourced variants each (24
  total), every one transcribed from a live site read from its own CSS. Source ledger + the
  verification numbers: `analysis/2026-08-16-subpage-sources.md`. Per-variant specs:
  `analysis/subpage-specs/`. **Next step is ROD JUDGING, then clean-agent verification** per
  [PAGE-PROCESS.md](PAGE-PROCESS.md) - not more building.
  **Portal is a THREE-way, not two** (live `portal.html` also ships a Ramblings link).
  Component gaps blocking the aggregate stage: `analysis/2026-08-16-component-gaps.md` - POST and
  ABOUT are genuinely blocked, PROJECTS can attempt it with placeholders, RESUME starts from zero.
- ~~**FOUR PAGE BLOCKOUTS AWAITING ROD'S EYE (built 2026-08-16).**~~ REJECTED same day, archived
  under `redesign-lab/archive/2026-08-16-rejected-subpage-tests/`. They were coloured rather than
  greybox, under-sourced, and built with no analysis. Superseded by the line above.
  <!-- kept one release so a stale link does not read as a live direction -->
- **(superseded, for reference)** `post-tests.html` (the important
  one, and the SHARED template for projects + ramblings), `projects-tests.html`,
  `ramblings-tests.html`, `about-tests.html` - all with variant bars, PROV panels and the live
  scene behind, same pattern as hero-tests. Post is transcribed from stripe.dev measured at 1440:
  24-col grid at 58.375px, sticky rail exactly 6 cols, prose exactly 12 cols, h1 101/93 weight 300.
  Two post variants because the version ROD prefers is the awwwards entry, which is NOT live -
  variant 2 inherits the measured structure and takes only the float-over-imagery idea from their
  imagery. The others are built from measured profiles already in `analysis/layout-measurements.md`.
- **Caveat is on the way out.** Rod is replacing the hand font with a LINE BOIL text animation,
  clock included, so the "do all-caps in Caveat read right" taste call was dropped unanswered.
  Tracing route for the drawn half: Calligraphr (handwriting -> font), Glyphr Studio / FontForge
  (outline editing), Inkscape trace-bitmap. The clock cannot use traced variants (10 digits x 3
  boil frames, changing every second) so it wants procedural path jitter - rough.js is the sourced
  precedent, and this keeps the boil on the D10 shader-work side rather than the drawn-art side.
- **Redesign LAYOUT phase (active).** Three artefacts, all in `redesign-lab/`:
  `landing-blockout.html` (greybox layouts + a provenance panel naming each borrowed move),
  `a3-assembly.html` (the same layouts built from real bench components over the live lantern
  scene - **judge here**), and `reference-gallery.html` (99 cards, verified captures, a Sub-pages
  section grouped by page type). Rules in [DECISIONS.md](DECISIONS.md) D8/D9.
- **Open problem: the type decision.** A full font audit of every reference site
  (`redesign-lab/analysis/`) found four of the five harumaki sites render in mincho/serif
  (Yu Mincho, Noto Serif JP, Zen Old Mincho, Trirong) while only /ndt/ uses a rounded gothic
  (M PLUS Rounded 1c, a sans). That contradicts the locked "hand-drawn name + clean mono, no
  serif" call. Their large titles are usually artwork, not type. The assembly carries two
  **twins of the same layout** (`A3 harumaki · mincho` / `· sans`) that differ ONLY in typeface,
  so the call can be made on one layout instead of across two. Still Rod's to make.
- **Missing components BUILT (2026-08-13)** - `seam-band`, `edge-rails`, `dated-timeline`,
  `picture-frame`, each transcribed from its source site's re-fetched CSS. Every A3 variant now
  assembles from real components; the only greybox left is the in-scene identity art, which is
  artwork on the character-scene track, not code.
- **The borrowed painted DIVIDERS are REJECTED (2026-08-13, ROD).** Seam band, cloud partition and
  the /10/ curtain rails all exist to divide flat painted colour fields; this site has one
  continuous live scene instead, so they read as stickers over it. The components stay in
  `extracted/` as proven transcriptions, unused. Sections get separated by SPACE (thatskygame does
  exactly this, 150-360px per zone), by the scene showing through the largest gaps, and by the
  section label - no painted strip needed.
- **Direction chosen instead: sparkler, foreground objects, lantern garland** - all ADDITIVE to the
  three.js scene rather than drawn over it. Sourcing not started; nothing built. `dated-timeline`
  survives the cull but its placement under Skills does not (the frozen 12-section flow has no
  ramblings section, so the log has no legitimate home yet - Rod's call).
- **The handmade signature is SHADER work, not drawn art ([DECISIONS.md](DECISIONS.md) D10,
  2026-08-14).** The gallery teardown found Rod's favourites get their warmth from drawn assets
  (harumaki main: 304 images, zero tokens) while this site describes everything in CSS. Rod is a
  shader artist, not a 2D artist, so the equivalent of their drawings is his procedural work. The
  "artwork owed" list is re-pointed at scene and shader work. Keep the design tokens: the
  references' lack of a system reflects throwaway microsites, not a lesson for a forever project.
- **Gallery re-analysed from source (2026-08-14):** 53 of 57 sites, corrections listed in
  `redesign-lab/analysis/2026-08-14-gallery-teardown.md`. Method worth reusing: read the HTML and
  CSS, not the captures - "is this device CSS or artwork" is invisible in a screenshot.
- Remaining decisions (frame opacity, timeline content and home, the layout cull) are listed in
  `redesign-lab/analysis/2026-08-12-a3-assembly-decisions.md`.
- **ANIME GLOW track - the flat emissive IS LIVE now (corrected 2026-08-16).** The A/B bench is
  `redesign-lab/anime-glow-scene.html`; rule and evidence in [DECISIONS.md](DECISIONS.md) D10
  (bloom entry). The earlier "nothing live changed" line here was stale: `shader/lanternShader.js`
  now runs a FLAT emissive and `three-config.js` carries the matching bloom retune (strength
  1.4 -> 0.45, radius 0.3 -> 0), both annotated Rod 2026-08-13. CORRECTED 2026-08-21: these are
  COMMITTED (`970a6ba`, `0acec39`), as is the Sarah avoidance rework (`ae2c59c`) - the old
  "uncommitted" line was stale. Sarah's radii were still never re-tuned per scene. What IS
  uncommitted today is the perf session's `three-shared.js` / `three-background-scene.js` work
  (antialias off, pixel ratio capped at 1, bloom at half res, composer + THREE exposed for the
  tuner).
- **THE SCENE PASS IS DONE AND LIVE (2026-08-22).** Bloom is a 2-level Dual Kawase in the bundle
  (`shader/kawaseBloom.js`); UnrealBloomPass, the bright pass and `threshold` are gone. A paper-grain
  filter is composited inside that pass at zero extra passes, and the render resolutions dropped
  behind it - **pixel ratio 0.5, bloom 0.25, reflection 0.25** (D24; the two are one decision).
  Lighting numbers: sky `0x162237`, strength 0.7, radius 0.15, `uSunLift` 1.5, no tone mapping.
  Fireworks: particle directions baked on the CPU, rocket trail deleted, trail copies stay at 10.
  Scene bundles went **3 -> 2** - `general` retired, `minimal` everywhere but About, which cost
  those pages their fireworks and narrowed the topbar toggle to `section-about`.
  **FIVE DEBTS CARRIED, none of them blocking but all of them real:** the Shadertoy URL is still
  owed for the paper filter's `element-tracker.md` row (live without provenance, flagged by three
  ship-checks); there is no `prefers-reduced-motion` path anywhere in the scene code although D21
  requires one, and the paper boil now runs 3.25/sec behind body text on every post; that boil
  clears WCAG 2.3.1 only on amplitude, not frequency; there is no WebGL-absent fallback; and
  **nothing has been re-profiled since UnrealBloomPass was removed**, so every ms figure in D23 and
  in the tuner header describes a pass that no longer exists. Re-run the ablation before quoting any
  of them (#37).
- Palette exploration (`redesign-lab/palette-explorer.html`) - Sodium & Sky is the frontrunner.
- Next refactor step (post-redesign): Phase 1 boundary audit.

## Content open items

- 10 WIP tech-art posts awaiting real content; commented-out image blocks with TODO markers.
- Umamusume game-design post awaiting Rod's cropped images (`assets/media/UmamusumeInheritance/`).
- `_posts/personal/` routing scope exists in `_config.yml` but the directory has no files yet.
- Feature backlog (achievements, easter eggs, unlockables, Three.js model upgrades):
  `redesign-lab/feature-backlog.md` is the master index.

---

# SESSION SAVE - 2026-08-18 (read this first after a clear)

## The job is now ONE thing

**Finish `redesign-lab/` until it can replace the entire main site in a single port.**
D22, Rod: *"zero main page stuff at this point."* `_sass/`, `_layouts/`, `_includes/`,
`_javascript/`, `_config.yml` are OFF LIMITS. Repo hygiene that touches no rendered surface is fine.

Orient from **`redesign-lab/HANDOFF.md`** (rewritten 2026-08-18, current). Open work is
**`docs/REQUESTS.md`** - read the OPEN table only; done rows are phantoms.

## Build target: the `final-*` group

Six pages, each containing ONLY its chosen blockout, every slot greybox until Rod approves that
specific element. State panel on each. `final-landing` is 3 of 8; the rest are 0. The only approved
things on the whole site are the favicon, the V6 hero and the scene bottom.

## Two new judging surfaces

- **`text-decisions.html`** - the whole reading system in reading order at stripe's 663px measure,
  all six callout candidates in real sequence. Callouts get judged HERE, not in isolation: a callout
  alone in a 340px card cannot show how it reads between a heading and a code block.
- **`element-gallery.html`** - 9 real cropped screenshots of live elements, take/leave per card.

## Decisions this session

D15 sub-page winners (resume dropped, About keeps two) - D16 rounded gothic, no serif -
D17 no chevron - D18 colour comes last - D19 source ELEMENTS not layouts - D20 code block, post rail,
toggles out of the bar - D21 one control (scene + all motion) - D22 lab only.

## What it cost, so it is not repeated

`projects-aggregate.html` built and rejected as *"the most ai generated page i have seen"*, and six
elements added to the landing that Rod never asked for. Same root, now hard gates in
[PAGE-PROCESS.md](PAGE-PROCESS.md): **the blockout is a contract** (an aggregate contains only its
approved blockout's elements, never more) and **stages are dependencies** (missing context = ASK).

## Numbers

Of 72 tracked elements: 40 Slop with no source, 11 Slop with a source saved, 12 circular-citation,
21 with real provenance. Port substrate gap: 39 lab tokens vs 270 live, **2 names in common**.

## Waiting on Rod

Prose-blockout judgement - element-gallery take/leave - code-block colours (and whether syntax is an
explicit carve-out from the palette law, which bans cool accents and red) - whether the fireworks
reward keeps its own button despite D21 - About layout - and the palette export, which is the only
item that can be LOST rather than deferred: the approved colours live in
`localStorage['lab-palette']` in his browser and in no tracked file.
