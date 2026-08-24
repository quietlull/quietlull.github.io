# Changelog

Append-only. Entry format, ported from the Underworld convention: date, SHORT-CAPS-TITLE, then
prose - what happened, who decided (ROD / CLAUDE), why, what was tried and rejected, what still
needs verification. The why is the point; a diff already says the what.

---

- **2026-08-24 (THE LADDER REACHES EVERY PAGE, THE POST FINISHES, AND ONE FAULT WEARING SIX COSTUMES).**

  **The heading ladder was never reaching four of the six final pages, and it failed silently.**
  Rod spotted it as "a little weird looking" rather than broken, which is exactly the signature:
  every SIZE rule was scoped to `.prose` or `.d-h*`, so pages without a prose container inherited
  colour and weight from the few class-named rules and no scale at all. The landing's `<h1>`
  computed the browser default - 32.64px, weight 700, white - and proving it took injecting a bare
  `<h1>` to watch it come out the same. The ladder applies by ROLE now. Case G stayed prose-scoped
  on purpose: its counter and divider are a prose device, not the h2 scale.

  **One weight per level, site-wide, on Rod's call** - section heads then bio headings to 300.
  The first attempt changed nothing on screen because the weight went on the element while the
  visible text sat in a child span with its own 100. Now in TRAPS, along with the check that a
  computed 300 does not prove weight 300 LOADED: three weights must render three different widths.

  **THE FAULT OF THE DAY, six times over: a page restating what the ladder or a component already
  owned.** A page `<style>` is unlayered and unlayered beats every `@layer`, so each one won
  quietly and rendered the old value - the landing's section head at 700/#f59e0b against the
  component's 100/#fbbf24, the post's `.prose h2` cancelling the approved case-G section break,
  `.prose ul` indenting the reference list past body text, `.prose a` drawing an underline across
  the related CARDS, the clock forcing mono over the boil. **Rod named the rule that ends it:**
  *"When something conflicts simply add them to the ladder ... we shouldnt be making 100 exceptions
  just a few simple rules."* Every fix was a deletion, not an exception.

  **The post reached zero greybox slots.** Callouts to D30's tape placements, figure, D35 syntax
  colours that had been locked and rendering nowhere, both halves of the TOC, the hero video that
  had been sitting in the repo unused, the stamp, share buttons, and a reference block rebuilt from
  Ronja Tutorials. Prev/next was DELETED rather than built - Rod: chronological neighbours here are
  unrelated, so a control presenting them as a sequence claims something untrue.

  **The line-boil jiggle was not a layout bug at all.** Three reports, two failed fixes, and the
  answer only arrived when Rod gave the reproduction: scrolled half way down the hero. Every
  geometry value was stable; `window.scrollY` was drifting 8px. Chrome's scroll anchoring was
  compensating for content it saw changing above the fold, six times a second. `overflow-anchor:
  none`. In TRAPS as the difference between "the viewport moves" and "an element moves".

  **D39, Rod's own architecture call:** behaviours should be single-purpose and stackable -
  magnetic, drift, glow, boil - because they are currently welded into components and the cost is
  already on the record. When he asked for the post's socials to stop moving there was no way to
  remove drift without also killing magnetism.

  **Also: the footer, third report and third genuinely different fault** (spacing, then being a
  grid item, then living inside a parent with 140px of bottom padding). Each earlier fix was right
  for what it addressed and blind to the next - which is what happens when the fix aims at the
  symptom that was just measured rather than at the element.

- **2026-08-23 (THE BOIL GETS NUMBERS, AND A PIN THAT HAD BEEN WRONG ALL ALONG).**

  Rod cut three digit faces and asked whether they could be combined with the text boils. **Yes, and
  no font merging was needed:** `unicode-range` assembles one family name out of several files, so
  `Lineboil1` resolves to his letters for letters and his numerals for digits. Because the boil
  cycles family NAMES rather than files, every existing caller kept working untouched and the clock
  became the fourth surface by the same code path as a word.

  **His instinct about the colon was not merely right, it was forced.** He wrote "if not you will
  need to use the text boil font for :" - and measured, none of the three number faces contains
  U+003A at all, while all three letter faces do. Scoping the range to the digits alone makes the
  colon fall through by itself, with no special case anywhere in the JS. It boils as a bonus: the
  three letter faces draw it 31.3 / 31.6 / 40.4px wide.

  **The faces are not tabular, and only the clock cares.** Numberboil1 draws "1" at 491 per 1000em
  against "2" at 680 - a 39% spread. In a word that is invisible; in a ticking clock it would shove
  the line sideways every second AND on every boil frame. The pin gives every digit one shared box,
  the widest digit of all three faces, which is `tabular-nums` done by hand for faces that have no
  tabular figures.

  **THE HORIZONTAL PIN HAD BEEN WRONG SINCE IT WAS WRITTEN, and Rod caught it by eye** - "the pinning
  isnt looking right". The probe measured each glyph in whichever face the HOST was set in, which is
  font 1, and pinned the box to that. That is only correct if font 1 is the widest, and it usually is
  not: **7 of 9 glyphs on the top-bar mark are wider in another face than the box they were given,
  and "F" is 17.30px in face 1 against 23.20px in face 3 - a 34% overflow that spilled it into the
  neighbouring letter every time the cycle landed there.** The whole point of the pin is that the
  glyph boils inside a fixed box; sizing the box from one face defeats it. It measures all three now.

  **Worth recording as method:** the verification of the clock first reported the boil as NOT running.
  It was sampling every 1000ms against a 6/sec cycle of 3 faces - six steps is exactly two full
  cycles, so every sample landed on the same frame. Re-sampled at 170ms it shows all three faces.
  **That is the sixth measurement this session to produce a confident wrong answer**, and the first
  caused by aliasing rather than by a stale or absent value.

- **2026-08-23 (THE LANDING'S NAME BLOCK, AND THE ONE FACT THAT ANSWERED FOUR ASKS).**

  Rod tuned the hero name five times and then closed it: "fix all the flagged issues, once finished
  consider landing done."

  **The fact worth carrying: in a vertical writing mode, the axes swap names.** `letter-spacing` is
  the VERTICAL gap and `line-height` is the HORIZONTAL one. Four of his five asks - more vertical
  space, more space between letters, more horizontal space, extend out to a drawn line - were the
  same two properties, and each became a one-number change once that was clear. The tracking the
  block inherited was `-.23em`, **drawn for Caveat, a connected script where tight fitting reads as
  handwriting**; on separate letterforms it advanced 13.56px against a ~24px glyph, overlapping them
  by more than half.

  **He drew the target rather than describing it, and the drawing was measurable:** a vertical stroke
  178px out from a 175.5px block - one block-width further, a straight 2.012x. Doubling the air
  rather than the type landed it at `missBy: 0`. Doubling the TYPE would have hit the same left edge
  while making the block twice as tall as the line he drew, which is what ruled it out.

  **Four flagged issues fixed with the desktop composition unmoved - max drift 0.01px across eight
  measurements, swept over six viewports.** The one that generalises beyond this page: **the
  line-boil pin never re-ran on resize.** It writes fixed px advances while callers size it with `vh`
  clamps, so a pin taken at one window height is wrong at the next - loaded at 900 and resized to
  620, the mark stayed 274.9px against its true 189.1px, every letter carrying phantom gap until a
  reload. It re-pins now, debounced, with the listener attached only after fonts resolve so a resize
  cannot pin fallbacks.

  **A fifth measurement artefact, caught before it reached Rod.** The ship check first reported the
  focus ring missing: `outline:none`, no shadow. That was the method - `:focus-visible` does not
  match a scripted `.focus()`. On a real Tab press the ring is there. **The session tally is now five
  failures that produced plausible NUMBERS rather than errors, plus one that produced a plausible
  ABSENCE. The lesson has stopped being about any individual trap: a measurement harness needs its
  own verification before its output counts as evidence.**

  **Ledger debt paid.** The ship check found line-boil had no `element-tracker.md` row at all despite
  shipping on three surfaces, and the portal identity mark was still `Tier: Slop` - which cannot ship
  - after it shipped. Both written, plus a recorded DEVIATION: the Hero V6 row cites ndt's slot as
  `width:20%/min-width:250px` and the block now uses `width:auto`, so the placement is still ndt's
  but the sizing rule is ours.

- **2026-08-23 (H0 ON ALL THREE SURFACES, AND THE PORTAL HITS 9 OF 9).**

  The line boil went from one surface to three on Rod's call: *"add the line boil text to the top bar
  as well and the portal"*. The landing hero, the top-bar wordmark on landing and post, and the
  portal's centre identity mark all now run the same component and the same picked pattern.

  **The portal is the first fully approved surface on the project, 9 of 9.** Its centre mark was the
  last greybox there and had been blocked on these fonts since P100 was written; the slot header
  literally said it *"will be replaced by the line boil h0 font later"*. It keeps its second job as
  the reset control.

  **The socials moved twice and the second move was the right one.** Rod first said ring variant;
  seeing it he pointed at the bench `dm-row` instead - so they are drift-magnet's `.dm-social`, with
  the real Simple Icons marks rather than GH/AS/IO/IN initials. Then: *"they need to be smaller and
  below the text itself"*. `.h__vert` became a column holding the name row and the socials, rather
  than giving the socials a fixed `top` - the name's height is a `vh` clamp, so any hard-coded offset
  would drift with the viewport. 2.2rem circles, 15px marks, and 0 of 24 glyph cells overlapping.

  **The pattern of the whole session, stated once.** Five times in two days the bug was not the
  component but the page failing to load it: the footer (six inline copies), `.section-head__name`,
  the view-all button (browser-default link blue because `button-kit.css` was never linked), the
  socials (drift-magnet's JS running with its CSS absent), and the top bar. **Check the page loads
  the stylesheet before debugging the component.**

  And separately: four failures this session produced plausible NUMBERS rather than errors - lazy
  `@font-face` making the harness compare fallbacks and report PASS, a detached node returning zeros
  from `getBoundingClientRect`, a lone space collapsing to zero advance, and wrapping that space
  removing a line break the design depends on. All four are in TRAPS.

- **2026-08-23 (THE H0 MARK BOILS, AND FOUR BUGS THAT ALL LOOKED LIKE RESULTS).**

  Rod's three scratch fonts arrived and unblocked P100 after weeks. The landing hero's vertical name
  now animates by cycling them. **D37** carries the decision; the pattern is his:
  *"Sequential per glyph 6sec on 4's looks best for me."*

  **Looking up the craft changed the advice halfway through.** Line boil is traditionally **three
  drawings cycled in sequence on 2s-4s**, so three was already the canonical count and adding fonts
  was never the lever - which is what I had first offered to measure. The rule that comes with the
  tradition is *draw the three with as little deviation as possible, or the boil looks too jumpy*,
  and that is why a 3-frame loop reads as texture rather than as a loop. Rod's pick lands on the
  tradition instead of patching around it with randomness.

  **Vertical is not horizontal rotated, and he caught it from the markup.** Under
  `text-orientation: upright` every glyph advances by the same em box, so the per-glyph widths that
  fix the horizontal case pin nothing at all. Raw vertical drift is 100px against 4.26% horizontally.
  A fixed `line-height` does not help - the advance comes from the font's own vertical metrics.

  **FOUR FAILURES THIS SESSION PRODUCED PLAUSIBLE NUMBERS RATHER THAN ERRORS.** That is the pattern
  worth carrying, not the individual bugs:
  - `@font-face` is fetched lazily, so `document.fonts.ready` resolved before the faces loaded and
    the metric harness compared three FALLBACK renderings: *"PASS, max drift 0.00px"* - precisely the
    drift it exists to detect.
  - `getBoundingClientRect()` on a **detached** node returns zeros, so a pinned column built from
    them collapsed to 0px and reported "pinned, zero drift", because 0 minus 0 is 0.
  - A `<span>` holding only a space **collapses to zero advance**, so the mark rendered RODNEYFAN.
  - Wrapping that space in a cell also removed the natural **line break**, forcing one long column
    where the design wraps into two. Measured by comparing glyph tops against natural text.
  None of the four threw. All are in TRAPS.

  **Also corrected: the faces have no digits.** I had earlier reported digits as "identical across
  all three, zero drift" - that was all three falling back to the same system font. If Rod cuts three
  TABULAR digit faces, the clock becomes the easy case rather than the hard one.

  **The landing closed out.** Socials are drift-magnet's `.dm-social` - the workbench component Rod
  pointed at - with real Simple Icons marks and real destinations, replacing four dead `#` initials.
  The page had been running drift-magnet's JS while never loading its CSS. The view-all button is
  button-kit's PILL, and it was rendering in browser-default link blue because the page never linked
  `button-kit.css` either. **That is four times in two days that a missing link or an inline copy was
  the real bug** - the footer across six pages, `.section-head__name`, the button, the socials. The
  rule that falls out: when a component looks wrong, check the page loads its stylesheet before
  debugging the component.

- **2026-08-23 (CASCADE LAYERS, AND A 7-AGENT AUDIT THAT CAUGHT WHAT I SHIPPED BROKEN).**

  ROD, on the specificity war between `.prose` and the components: *"i feel like this nesting is
  really bad in general and we should design this better ... i mean this is how CSS is intended to
  be used to begin with."* Recorded as **D36**.

  **The refactor.** `@layer reset, tokens, prose, components, overrides;` on all 60 lab stylesheets.
  A component no longer has to know prose exists, and **all 53 losing declarations stayed exactly as
  written.** `:where()` was rejected after measuring: it works, and it is one file, but it flattens
  specificity INSIDE prose too and moved `ol li` line-height 24px -> 20.8px. Rod chose option B for
  the overlaps, so where a component restated type the ladder owns, the component defers - **5
  declarations across 2 files**, verified by diffing live against the frozen copy rather than by
  counting what I intended to remove.

  **Then he asked for one agent per page, and it was worth it.**

  **The refactor had shipped broken to 40 lab pages.** I deleted the duplicate unlayered `*` reset
  from the 8 pages my harness sampled and never checked the rest. On the other 40 that rule now
  outranks every layer, so every component's padding was zeroed. Proven on `a3-assembly`: top bar
  `16px 32px` -> `0`, footer `40px` -> `0`, hero `64px 16px` -> `0`. **It is worse where JS measures
  the DOM** - re-injecting it moved 4 of 8 portal window sizes and 4 of 8 positions, because the
  portal sizes windows from its title bar's computed padding. Fixed on all 41 and verified restored.

  **My measurement was the other failure.** The before/after harness sampled `[class]` elements
  only, 15 properties, one width, the default state. `.posthead h1` has no class, so a page with
  **37** changed values reported **1**. Four portal focus rings changed and the diff said zero
  because `outline-color` was not in the list. **I was sampling by what I expected to change**, and
  I reported "4 of 7 pages identical" on that basis. Both failures are now in TRAPS.

  **THE FINDING THAT REFRAMES THE WHOLE EXERCISE.** None of the eight components the refactor was
  built to fix is loaded by any final page - five live only on `component-review.html`, three on no
  page at all, and the six final pages load 12 of 56 bench components. So the `.prose` collision,
  including the 1.06:1 dark-on-dark case I put in front of Rod, was only ever rendering on bench
  surfaces. **It would still have blocked the merge** - which is the very next job - so fixing it
  first was right. But I let it read as live breakage on his pages and it was not.

  **What the audit verified rather than assumed.** The portal zero survived its own debug API at 5
  field widths and 4 class states across 78 properties plus the JS-computed geometry. The About zero
  survived 3 variants x 2 widths x 44 properties, and the two variants nobody had ever measured came
  back clean for a structural reason. **One agent claim was checked and rejected** - a fourth
  declaration supposedly removed from merged-card is present at line 230.

  **Rod's calls this session:** the post's bigger headings are preferred, so that becomes a
  deliberate D31 change rather than a regression - and the blast radius is none, because no other
  final page uses `.prose`. `#f86a03` goes to H0/H1 only; `--color-glow` keeps `#ff6a00` across its
  other 75 uses, so two oranges coexist at deltaE 3.23, chosen knowingly.

  **Still open and not guessed at:** whether a page's inline `<style>` may override the ladder. The
  proposal is a lint that fails on any unlayered rule in a `final-*` page rather than a wrapper,
  because a `page` layer above `prose` changes nothing and escalating decisions.css's selectors
  would contradict its own documented strategy.

- **2026-08-23 (THE OPEN LIST GOES 12 TO 1, AND TWO NEW ANALYSER PAGES THAT MEASURE INSTEAD OF ASSERT).**

  Rod closed six calls in a row - the silver (**ii**, confirmed), the demo reel, the portal, the FPS
  test, the About 3B spacing (**option A**), and the palette backup - leaving **one open decision on
  the whole project: the `.prose` prefix policy.**

  **`prose-collisions.html` - the eight components, split out.** It reads `decisions.css` and all 15
  post-component stylesheets ON LOAD, parses every selector, computes both specificities and reports
  only genuine losses on a shared property. **8 components, 53 losing rules** (callout-family 10,
  prevnext-real 11, toc-real 11, figure-real 6, status-chip 6, table-real 4, entry-row 3,
  image-zoom-real 2); six are clean. **It is 8, not the 9 the docs have been repeating** - and the
  ninth was my own bug: the selector-list splitter broke `:is(h2, h3)` on its comma into two nonsense
  fragments and reported `heading-anchor-real` as colliding. **The docs had always said
  heading-anchor-real was the one component that got this right, and they were right.** Caught it by
  checking the one result that contradicted a standing claim, rather than shipping a number that
  looked plausible.

  **`palette-backup.html` stopped being an export and became the palette.** Rod: *"i dont think we
  need a palette backup."* It now reads every custom property off the live stylesheets, so it cannot
  go stale: **47 tokens**, nine groups, translucent ones shown over a checkerboard with their
  composited hex. **Three faults in my own first pass, all fixed before reporting:** hairlines and
  tape fills were measured against the 4.5:1 TEXT threshold and reported as failures, which is noise
  rather than a finding; the page's own `--pal-*` chrome leaked into the palette; and
  `--color-silver` plus the eight `--syn-*` tokens were missing because `decisions.css` was not
  loaded. **Both new pages made the same mistake in their first version** - measuring something
  against a rule that does not apply to it - which is worth naming as a pattern.

  **About 3B, option A, built.** Scoped to bands 0 and 1 only, because band 2 is the trophy case and
  Rod likes it as it is. Hero `.sect` **34px 38px -> 34px 15px**, band-1 `.textbox` **30px -> 30px
  15px**, portrait **280 -> 225**. Vertical is untouched, per his instruction. Measured after:
  portrait 225, text column **611** against the 613 I predicted - the measurement is what counts.

  **The demo reel row was stale, not the element.** A real 599x337 video has been playing near the
  bottom of the landing, under a reel head that was already approved, while the tracker carried
  "no source" from a placeholder his own footage had replaced. Landing **9/12**, total **24 of 97**.

- **2026-08-23 (CODE SYNTAX COLOURS LOCKED, AND THE CSS FINALLY MATCHES THE DECISION).**

  ROD, after seeing both readings drawn side by side: *"Keep dark blue for constants but 100% a."*
  Recorded as **D35**.

  **The point of the exercise was never the pick.** It was that `decisions.css` had held Dark+'s
  values under a comment claiming it followed Rod's role list, and it did not - type was blue where
  he said orange, functions yellow where he said pink. Two of four roles wrong for the life of the
  file, under a comment asserting the opposite. Nothing errored, because a wrong colour is still a
  valid colour. **A comment is not evidence.**

  **His refinement is the better half of the decision.** His original list gave constants and
  variables one hue; seeing it rendered, he split them - and the dark blue he wants for constants is
  exactly the `#569CD6` that types vacated by going orange. `--syn-const` is new, `.tok-const` no
  longer shares `--syn-var`, and **nothing was invented to do it**. Every hue is still Dark+'s own,
  mapped to his roles instead of theirs, which is why A cost no new colour.

  **Verified on the real thing, not the demo.** Real `.tok-*` spans injected into the actual
  `.prose pre code` on `final-post.html`; all six resolve. **Contrast measured against the
  COMPOSITED ground `rgb(10,14,34)`** rather than the block's own `rgba(0,0,0,.34)` - measuring
  against the rgba treats the ground as pure black and flatters every number. All six of Rod's roles
  pass 4.5:1 at 12.48px (6.48 to 12.82).

  **Three things stated rather than buried:** strings now share the type orange and Dark+ has no
  second string hue; `--syn-comment #6a6a6a` measures 3.53:1, below AA, a pre-existing placeholder;
  and **no page renders a highlighted code block yet** - zero `.tok-*` spans exist in any markup, so
  this is correct in the CSS and visible only on the new tab. The highlighting is unbuilt.

  **Ledger:** added as its own element, **Remixed / rod**, separate from the code block CHROME row
  which is a different element with a different source. Values cited to Dark+, mapping is Rod's.

- **2026-08-23 (HALF THE "OPEN" LIST WAS ALREADY DECIDED, AND THE CODE COLOURS WERE BUILT WRONG).**

  The todo page went to Rod with 12 open calls. **Six were already decided.** He caught three in one
  message: the element gallery ("nothing on here that i need"), the code block colours, and the
  silver for heading tiers 3 and 4 ("i already picked... it was iii"). Auditing the rest found three
  more: the top bar's lopsided gaps (D26, *"taste call made, closed"*), the About variant (Klubnika,
  P60 - and `final-about.html`'s own variant bar has said so all along), and the meta chips
  (answered 08-21). The fireworks button was moot on top of that, since D28 scrapped every reward.

  **The cause, and it is not carelessness about any one row.** The list was assembled from the
  tracker's "Blocked on Rod specifically" bullets, which had never been updated as the answers landed
  in `DECISIONS.md` and `decisions.css` instead. **D32 recorded this identical failure a day earlier
  at PAGE scale** - "the page kept re-asking questions Rod had already answered". This was the same
  failure at LIST scale, and repeating it while the warning sat in the same repo is the part worth
  recording. Rule written into REQUESTS: nothing joins that list without a same-day check against
  the decision record and the built CSS.

  **A worse thing surfaced underneath the code-colour row.** The decision was real and the CSS is
  built - and **the CSS contradicts the decision.** `decisions.css`'s own header says the values
  follow Rod's role list. Measured: `--syn-type` is `#569cd6` BLUE where he said orange, and
  `--syn-func` is `#dcdcaa` YELLOW where he said pink. Two of four roles render against spec, with an
  unused `--syn-orange` sitting in the same block, under a comment asserting the opposite.
  **A comment is not evidence** - the same shape as a provenance header not being provenance.

  **Built: an eighth tab, CODE COLOUR**, split out of "Callouts & code" because that tab only ever
  showed the code block's CHROME and never a single hue, which is exactly what Rod said. It renders
  both readings side by side on the same HLSL sample - his role list against what is built today -
  so it settles by looking rather than by trusting a note. **Neither sample invents a hue**; every
  value in both is from VS Code Dark+'s own palette, so choosing his list costs no new colour.
  Two bugs found building it, both already in TRAPS in a nearby form: `section.comp` is styled by
  ELEMENT so `div.comp` silently got nothing, and a `1fr` grid track's automatic minimum is `auto`,
  so a `white-space:pre` block sized the track to its longest line and pushed the page 179px sideways
  (`min-width:0` on the ITEM does not fix it - the floor is on the TRACK, `minmax(0,1fr)` does).
  Also worth noting: two rounds of measuring said the fix had failed and it was **browser cache**,
  the same near-miss as P123.

  **Four decisions came in while this was running**, all recorded:
  **P182** the achievement tiles are V6, plus the project cards' hover edge glow and a border colour
  that varies per achievement - rebuild deliberately BEHIND the About scene, Rod's own sequencing.
  **P184 (now D34)** the trophy wall IS the control panel: a tile remembers what you found and
  toggles what it unlocked, persisting across pages. **This finally answers where the toggles went**,
  open since D20 removed them and D21 specified a combined control with no home. D21's control is
  retired, and D28 is untouched - nothing is gated behind progress, the tile is a control not a
  prize. **P185** reduced motion is out of scope by Rod's call, which closes gate 5 items 32 and 33
  and the portal's missing guard as WILL NOT DO rather than leaving them rotting in the bug list;
  the fireworks flash audit is flagged once as a different category (WCAG 2.3.1 is a seizure
  threshold, never measured) and then dropped. **P183** #26 confirmed resolved by Rod, matching what
  the audit had independently found.

- **2026-08-23 (ONE PAGE FOR EVERYTHING LEFT, AND THE LAB INDEX CUT BACK TO WHAT IS STILL OPEN).**

  ROD: *"can make a table with everything that needs to be done and update the lab page so only
  relevant sections are on the top?"*

  **Built as a page, not a note.** `redesign-lab/todo.html` holds the whole remaining road in eight
  sections: his 12 open calls, the re-look the type-ladder fix forces on judgements he already made,
  the measured slot debt, my build queue, 8 verified open bugs, the port's gates 0-6, the stage-3
  phases, and what is parked on a file that does not exist. A `.md` would have been faster and would
  have broken his standing instruction never to be linked one.

  **The reason it had to be deduplicated rather than dumped.** The tracker's OPEN table is **173 rows
  and 96 of them say NEEDS ROD** - that status quietly became a catch-all for "built, awaiting your
  eye", which is not the same thing as a decision. Dumping 173 rows in front of him would have
  reproduced exactly the problem he asked to be fixed. The 12 real calls were extracted by reading
  what each row is actually waiting on.

  **The lab index's Judge section went from 17 cards to 7.** Nothing was deleted: the nine decided
  surfaces moved to a new "Settled, kept for reference" section, each carrying the decision that
  closed it (card greys and washi tape and section breaks D28, tape colour D30, paper D29, sub-page
  layouts D15), so the record of why a surface stopped being a question survives with it. Two of the
  removed cards had a second reason to go: `BACKLOG.md` and `REVIEW.md` were the only `.md` links in
  the top section, on a page whose own rule bans them.

  **Every header count on that page was stale and is now measured, not copied:** 5 of 26 slots ->
  **15 of 105**, 29 -> **56** bench components, 9 -> **7** blockouts, 51 -> **60** sources. The
  gallery's "72" turned out to be right but under-stated: 72 kept of **102** entries, the other 30
  cut. **Slot counts come from `[data-state="approved"]` on the rendered pages**, which is also how
  the portal's 0 of 10 surfaced - Rod approved that page's look and no slot on it was ever marked.

  **Verified before reporting:** todo.html renders 8 sections and 60 rows with zero `.md` links, all
  14 of its links 200; the index has 88 links, 0 broken; neither page overflows horizontally and
  neither logs a console error.

  Also committed here: the seven docs files the component and portal sessions wrote and never
  committed (`49cd980`, 1,854 insertions - D25 through D33, five new traps, the STATUS rewrite).

- **2026-08-23 (THE COMPONENT LAYER: 22 BUILT, AND TWO BUGS THAT MADE EARLIER JUDGEMENTS INVALID).**

  **The headline is not the components.** An audit found that **the type ladder had never
  rendered**: every page requested `wght@400;500;700` while `decisions.css` asks for 100 and 300.
  Measured proof - **100, 300 and 400 all rendered at exactly 438.25px**, byte-identical. So D31's
  central rule, *hierarchy is size and tracking never weight*, was collapsed to one weight, and
  every judgement ROD made before the fix was against weight 400. Fixed on 22 files and re-measured
  distinct. He was told plainly that the pages will now look different and may want a re-look.

  **And there was no focus indicator anywhere on the site.** `generic.css` holds the ring and was
  linked by ZERO of the six final pages. Six components declined to write their own because they
  "inherit the global ring" - they inherited nothing. WCAG 2.4.7 and 2.4.11 were failing sitewide.

  **THE PATTERN IS THE LESSON, and it happened three times in one session:** a name that resolves
  to a fallback **renders wrong without erroring**. The font weights; `--nav-h`, used nine times and
  defined never, which hid the mobile TOC under the top bar entirely below 780px; and
  `--color-muted-warm`, used three times and defined never, silently rendering a neutral grey on a
  token named warm. **A token that looks right is not evidence. Measure it.**

  **22 components built** across two batches, every one from a reference brief that re-fetched its
  source live rather than trusting the saved note. That method paid for itself immediately: **six of
  the first eight briefs found a real error, and three of those were MINE** - the related-card
  "three deletions" spec was written from a grep and was wrong in all three parts (the hover rule I
  said to delete is a SUPPRESSOR; deleting it ADDS a 24px bloom), the heading anchor's
  `scroll-margin-top` was calibrated to Maxime's nav and left our headings tucked under the bar, and
  our own `.prose a` was silently overriding that anchor. The other three were in the sources: the
  related card's one external citation is **dead** (yannesidibe /about is a 404), **gneiss has no
  callout system at all** so the box was never sourced, and acegikmo's real table is the one the
  note missed at **126 uses** against the pill grid's 1.

  **ROD CAUGHT THREE THINGS THAT WERE BUILD ERRORS RATHER THAN PREFERENCES**, and each is worth
  keeping: the view-all button was **changing the layout** when the ask was to swap the button
  inside the existing row; the search bar and filter pills **already existed on the workbench**
  (`list-controls` has the input, the filter and the active state) and two agents rebuilt them; and
  the **review page itself was squeezing components** - a 3-up grid at 320px rendering 767px
  components at ~206px, which is why callout-family looked right and the review did not.

  **The rule that produced:** reuse beats sourcing when the thing already exists and is approved.
  Three components now actively reuse. And each reuse surfaced law debt in its PARENT that a
  rebuild would have hidden - `.kit-tag` carries the banned `--color-muted` and a 6px radius;
  `tag-badge`'s line-height puts the entry-row tag strip 6.8px over its reservation. Fix those at
  the parent.

  **The blockout was measured rather than trusted** and its own labels disagreed with its own
  rendering (701 printed, 711 drawn). ROD settled the bigger conflict - the content column is
  **767**, the blockout is 56px stale - and set a standing rule with it: *"always just assume the
  later decision is correct when possible, it doesn't hurt to check though."*

  **STILL BLOCKING THE MERGE, and it needs ROD:** nine components render wrong inside `.prose` and
  two land at **1:1 contrast**, because component stylesheets are the weakest layer in the page's
  load order. One vocabulary decision fixes all nine; guessing it means redoing them.



- **2026-08-23 (THE PORTAL, FINISHED - AND THE LOOK TOOK THREE SOURCED PASSES TO GET RIGHT).** ROD:
  *"Yup ok we are good here"*, with one carve-out he named himself - the centre identity mark, which
  *"will be replaced by the line boil h0 font later"* and is blocked on his three scratch fonts.

  **What shipped.** A full-bleed field that never scrolls, eight windows (three doors, five socials),
  drag from anywhere, throw with a page-edge bounce, a proximity lean, close-and-reset, social icons,
  and an Enter affordance. The whole visual layer lives in `extracted/components/portal-window/`;
  `final-portal.html` keeps only the positioning shell the drag engine drives.

  **THE ONE IDEA THE LAYOUT RESTS ON.** Rod asked for two things that sounded separate - the portal
  should reach the page edges, and the drag bounds should be the page edges. They are the same
  problem: a window's legal position is always `[0, fieldSize - windowSize]`, its TRAVEL RANGE. Hold
  every home as a fraction of that and the constellation, the bounds and the resize behaviour all
  follow from one number. Everything since - squaring the socials, flooring the leads, growing each
  window to fit its header - is a pass over that same structure.

  **THE LOOK: THREE PASSES, TWO OF THEM PROPERLY SOURCED AND STILL WRONG.** Windows-98 chrome read
  from 98.css; then a faithful zutomayo copy in their real pale pink and purple, which only became
  possible when Rod lifted the palette law for these windows. Neither landed. The answer was the
  approved project card, made opaque, in its own deep blue - a component we already had. **Sourcing
  something correctly is not the same as it being the right thing**, and the palette exception was
  spent proving it.

  **A PROVENANCE CORRECTION ROD CAUGHT.** He asked *"this component looks nothing like the ones from
  zutomayo's website how is it sourced?"* - and he was right. The header claimed "transcribed". What
  had actually come across was a set of RATIOS. Fetching their assets settled it: `news_pc_window.png`
  is **671x1164 for a 335x582 box** - their whole news window is a 2x retina drawing with no CSS
  appearance at all. Two of the three things that make a zutomayo window recognisable are forbidden
  by the palette law and the third is artwork. Re-tiered, and the header now leads with why.
  He caught the same class of thing again on the Enter button - my zutomayo `.btn-round` version WAS
  read from their live CSS, but that is not the same as being one of the site's own approved buttons.

  **WHAT IS OURS, NOW PROVABLE RATHER THAN ASSUMED.** Their `common.js` was finally read: the panels
  genuinely drag, and the earlier note in `sources/` had reasoned from the wrong selector
  (`cursor:pointer` on the mobile collapse tab, not the draggable element, which is `cursor:move`).
  But they have **no inertia and no clamping whatsoever** - so the throw, the bounce and the lean have
  no counterpart there.

  **A REGRESSION I CAUSED AND ROD CAUGHT.** *"why did we lose proximity lean? when did that get lost
  again?"* I had removed it an hour earlier, deliberately, reading "magnetism consistent to other page
  buttons" as REPLACE rather than ADD. Restored with its original numbers and re-measured against the
  historical curve - identical, peak 9.0px at 75px after he asked to double the strength. Flagging a
  change in a report is not the same as it being agreed.

  **FIVE BUGS WHOSE LESSONS OUTLIVE THIS PAGE**, all now in TRAPS: webfonts swapping in after a
  text-measured layout (this is why headers ellipsised for Rod while every check I ran passed - my
  checks forced a relayout long after fonts settled); grid items defaulting to auto min-size and
  growing past a clipping parent; `<a>` being natively draggable and eating pointer drags; the
  browser pane freezing CSS transitions so a transitioned property reads its start value forever
  (this cost four attempts on one hover state); and modelling a layout the runtime already computes
  instead of measuring it - which broke the arrangement twice before I stopped hand-nudging.

  **STILL OPEN.** The centre mark (Rod's, awaiting the line-boil font). Two ship-check flags: the
  `ResizeObserver` has no teardown twin, and there is no `prefers-reduced-motion` path in the
  component CSS - the lean is gated in JS but drag, throw and bounce are not. Contrast passes
  everywhere, lowest 3.45:1.

- **2026-08-23 (THE TEXT PASS: FIVE COMPARISON PAGES BECOME ONE, AND 23 PICKS LAND).** The largest
  judging session so far, and most of what it settled came from ROD catching things.

  **He stopped a pile of work that was answering nothing.** *"im realizing we might have been doing
  all of this for nothing since i was thinking of using the stamp takeaway and the washi tape
  components for the other callouts."* Counted across all 19 posts: `takeaway:` in **14 of 19**;
  TL;DR, blockquote, admonition, pull quote, margin note, h4 and `hr` in **zero**. Six of the seven
  callout candidates answered a question his writing has never asked. The callout system was already
  finished for the content that exists.

  **Five pages collapsed into one.** ROD: *"Rather than making alot of comparison pages just add
  things to the component block out rename it to Text decisions... and add tabs."* `prose-blockout`,
  `component-blockout`, `callout-tests` and `orb-callout-tests` are DELETED, not archived, and the
  four index cards pointing at them are one card now. The nine surviving sections were moved
  verbatim rather than retyped.

  **A pattern showed up three times in one session and it is the real lesson: the judging pages kept
  re-asking questions ROD had already answered.** Callouts (answered 08-22), meta chips (answered
  08-21, with the ledger already recording the external sources as UNUSED), code block (answered in
  D20). He caught each one. **The cause is that decisions were landing in DECISIONS.md and never
  being reflected back onto the surfaces the judging happens on.** `decisions.css` now exists partly
  to close that loop - it is the picks as real CSS, imported by all six final pages, one definition
  and six consumers.

  **Two corrections I owed him.** The washi-tape callouts were LOST when `prose-blockout` was folded
  in and deleted - my error, not recoverable from git (the lab is gitignored) or `_site` (Jekyll had
  cleaned it), and rebuilt from the surviving component. And *"any reason the pull quote cannot be
  taped?"* was a fair push: tape needs only `position:relative` on its host, so the honest objection
  was "has no precedent", not "cannot". Both versions were drawn instead of argued about.

  **The heading audit found five contradictions, all measured, none of them opinions:** H1 meant two
  different things (33px w700 vs 101px w300), H3 meant three, the landing's scale was INVERTED (its
  H3 larger than its H2), weight ran in opposite directions on different pages, and **the post skips
  H2 entirely** - a WCAG 1.3.1 failure that survives whatever scale wins. The ladder ROD accepted
  fixes the first four; the fifth is a markup fix and is still outstanding, because styling h3 to
  look like h2 would hide the failure rather than repair it.

  **Colour: the ramp deliberately inverts at the bottom.** Body copy is PRISTINE WHITE and the
  brightest thing on the page; H3/H4 silver sits UNDER it. ROD: *"keep the pristine white text for
  the things we are going to be reading the most often."* Headings recede, prose leads. Measured
  against the reading well the finished ramp does **not** descend by brightness - body 17.31, H2
  yellow 11.49, silver 7.44, H0/H1 orange 6.68 - so his two most important headings are the
  lowest-contrast text on the page. All clear WCAG; flagged as a deliberate call.
  Silver was DERIVED from two approved tokens, not invented, and of three candidates only one kept
  the ramp monotonic. Recorded hazard: `--color-muted` `#9aa3bd` is the last blue in any text token
  and is exactly the wrong bottom step for a ramp.

  **D30 overturns the colour half of D27**, with the conflict put to ROD before he chose: tape
  colour now means callout TYPE, not site section. The hole it leaves is real and is recorded rather
  than papered over - sections have no colour identity via the tape any more and nothing replaces it.

  **Sourcing:** `sources/flamedfury-orb-callout.md` and
  `sources/inline-elements-kbd-mark-sup-sub-abbr.md` are new, the second after grepping nine live
  sites. Two honest gaps came out of it: **nobody designs `abbr`** (every site allows the normalize
  default, so "accept the default" is the decision), and the one `sub` rule that exists anywhere is
  a TeX logo and does not generalise. Neither was dressed up as a source.

- **2026-08-23 (PAPER IS DEAD; THE CALLOUT QUESTION WAS MALFORMED).** Two calls from ROD, and the
  second is a correction to how the lab has been asking things.

  **A0 - no paper on the image mat.** *"stick to A0 paper test was failure texture comes in from the
  background anyways."* A/B/C rejected. **This is D27's reason applied a second time**, not a new
  one - D27 took paper off the cards on exactly that argument. Between them paper is finished as a
  surface treatment and no open question points at it any more. The files stay on disk, nothing
  shipped, nothing to unwind. **The paper FILTER in the scene (D24) is untouched** - that one is in
  the render, not on a surface.

  **The seven-callout set was a bad question, and bracketing it only made that visible.** ROD:
  *"decision 2 is weird i dont understand what im choosing between again these are all elements for
  different things."* He is right on all three counts: the famicom.party margin note is a LAYOUT
  device that leaves the column, not a callout style, so it cannot be compared against the others;
  tape-on-top, taped corners and left-edge tape are three PLACEMENTS of an already-settled
  convention rather than three rival callouts; and he had **already answered the real question on
  2026-08-22** - flamedfury's orb moved to the top right, with the tape overlaying the content box -
  while the page carried on asking it.

  **The rule worth keeping:** a comparison page is only honest if its candidates are genuinely
  substitutable. Seven things that do different jobs, some already decided, is a pile with a border
  drawn round it. Before building any future comparison, check that swapping any candidate for any
  other would leave the page still working; if not, it is several questions and wants several pages.
  Recorded as D29 with the three real questions split out for next session.

  Nothing was built for either call - ROD asked for the sync only.

- **2026-08-23 (PROSE BLOCKOUT: A DECISION LAYER, AND A MEASURED FINDING ABOUT CALLOUTS).**
  ROD: *"currently its unclear what im supposed to be choosing between or is this just stuff thats
  missing?"* Both, and the page only said which in its source. Its badges reported PROVENANCE
  (SOURCED / UNSOURCED) - real bookkeeping, but it answers a question he is not asking while judging.
  Every block now also carries **CHOOSE / MISSING / SETTLED**, with a legend at the top.
  **The structural fix mattered more than the labels.** The seven callout candidates were spread
  through the article in reading order AND split in two by the image-mat section, so the page read
  as *a post containing seven callouts* rather than *seven alternatives to each other*. Bracketed
  into one CHOOSE set; the image mat likewise. The page now asks for **two** decisions, not twelve.
  **THE FINDING THAT SHOULD RESHAPE THE CALLOUT WORK.** All 19 real posts were parsed:
  **zero blockquotes, zero admonitions, zero prompt classes, zero raw `<div>`s.** The only
  callout-shaped device the content uses is **`takeaway:` front matter, in 14 of 19 posts**,
  rendering as `.post-takeaway` from `_layouts/post.html:157`. For scale, the same parse found 46
  images, 52 links, 24 h3, 15 h2, 12 code fences, 10 videos, 11 lists.
  So six of the seven candidates are answering a question the writing has not asked. That does not
  make them wrong - a component can invite new writing - but the decision should be reframed as
  *"what does the takeaway become, and is there a second device worth writing toward"* rather than
  *"pick a family"*. Put to ROD rather than resolved.
  **A caution on the measurement itself:** a first pass using `grep -c | paste | bc` reported zeros
  for headings and code fences and was nearly reported as fact. The numbers above come from parsing
  the files, and the shell pipeline that lied is worth remembering.

- **2026-08-23 (TAPE: VERTICAL ARM ON TOP, AND A NEW DIAGONAL CORNER PLACEMENT).**
  ROD: *"for the Blue L the vertical piece should be on top"* and *"for the green one the tape
  should have 4 diagonal strips on each corner."*
  The L's two arms are absolutely positioned siblings with no z-index, so paint order fell back to
  DOM order and the horizontal one won purely because it is written second - the same class of
  silent ordering bug as the overlapping CSS rules earlier in the session. Fixed as an explicit
  `z-index` rather than by reordering the markup: the markup order is how you read an L (down, then
  across) and should not have to encode a paint decision. Verified with `elementFromPoint` at the
  crossing rather than by eye.
  The diagonal corner is a **new placement**, `.tape--corner`, and its angle is geometry rather than
  taste: a strip across the TOP-LEFT joins the top edge to the left edge, which is a "/" and so
  -45deg, while tr/bl join the other way at +45. Length is 2.6x the roll width because a 45-degree
  rotation needs about 1.41x reach to clear the corner - anything shorter leaves the corner poking
  out past the tape. The STRIP itself is the existing sourced component (gneiss tape, winterwind
  torn ends); only the placement is new, and the placement is ROD's, so the ledger row is ORIGIN:
  ROD rather than a new citation. `text-decisions.html`'s greybox twin kept in step.

- **2026-08-23 (ABOUT PASS 3 - the hero void, the head, and the top edge).**
  **THE 264px GAP WAS MOSTLY A VOID.** ROD: *"too big a gap between about me and more about me."*
  Measured: 264px from the bio's last line to the More panel, of which only 90 was the section
  rhythm. The rest was empty page - the panel held 493px of content centred inside a 900px hero, so
  `justify-content:center` left 174px of nothing between the two blocks. The hero still fills the
  first screen; what changed is that the PANEL fills it too, so the backing reaches the fold.
  **264 -> 90**, and the panel went 493 -> 840.
  **ONE HEAD STYLE ON THE WHOLE SITE.** ROD: *"the header text should match the formatting of the
  rest of the headers on the site being centered with a hair line matching the achievements text
  below."* `.bhead` stops being its own smaller thing and takes the approved `section-head`
  treatment verbatim - 2.4rem, centred, 1px hairline, the `~` ornament. Verified identical to the
  Achievements head. The `~` remains a stand-in for harumaki's drawn squiggle; that asset is still
  owed wherever the head appears.
  **AND THE TOP EDGE, which was my doing.** ROD: *"shouldnt be connected to the top."* I had zeroed
  the first band's `padding-top` so the hero would start at the page edge - but **About has no top
  bar**, so the panel sat hard against the browser chrome. The landing never shows this because its
  hero sits under a 96px bar. Rhythm's 30px restored, and the fold did not move: `box-sizing:
  border-box` means `height:100vh` absorbs padding rather than adding to it.

  **PLANNED, NOT BUILT:** ROD is drawing three scratch fonts to cycle for the LINE BOIL that
  replaces Caveat. Logged with three things worth knowing before he draws them: the CLOCK cannot use
  traced variants (10 digits changing every second - already ruled out, it wants procedural jitter
  with rough.js as the precedent); boil reads best at 8-12fps rather than per-frame; and three
  webfonts is three downloads against the perf constraint, so subsetting matters.

- **2026-08-23 (SECTION BREAK PUSHED TO THE POST - and it was never really there).** ROD: *"section
  break is much better please push it to the final post."* Pushing it exposed that the post had
  **two `.prose h3` rules**. The original one comes later in the file and therefore won, and it
  carried `margin: 0` - which cancelled the `2em 0 1em` that is the entire fix he had just approved.
  So the post was still rendering the tight heading spacing he originally complained about, while I
  had reported case G as applied to it. Merged into a single rule rather than adding a third, since
  a third would move the specificity fight rather than end it.
  Verified live: one rule, weight 100, deep gold, centred, `border-bottom: solid 1px` inheriting
  `color`, counter at the 0.68 ratio, and **margins 72px / 36px where they had been 0px**.
  **Flagged rather than silently changed:** the heading stays at stripe's 36px. The test page renders
  21.6px against 16px body text; the post's body is 18px, so the matching proportion would be ~24px.
  That size is a separate earlier decision from `post-blockout.html` and not mine to overturn on the
  back of a treatment approval.
  **This is the third time this session a change was reported as applied while a later duplicate
  overrode it** (skills draw duration, then the tape's greybox twin, now this). The lesson is now a
  TRAPS entry: before reporting any CSS change as done, confirm the COMPUTED value on the rendered
  page, not the source edit.

- **2026-08-23 (ABOUT PASS 2 - and one of my leftovers found by ROD, not by me).**

  **THE LOWER BOX WAS MINE.** ROD: *"please remove the lower box idk why its even there."* The
  ORIGINAL scene slot from the first About build was still sitting AFTER all three variant wrappers,
  so it rendered on every variant as a second scene box under whichever one was showing. I replaced
  the markup inside the wrappers on the rework pass and never removed the one outside them. Deleted.
  **Worth noting as a pattern:** the earlier pass also left the spacious wrapper unclosed. Both are
  the same mistake - slicing markup by index and not re-reading the seams.

  **`slot__wait` WAS READING AS PAGE COPY.** ROD: *"not sure what slot__wait is."* Fair - it is MY
  note about why a slot is pending, and on a `.gb` it rendered as a paragraph at the top of the
  section, so it looked like content he was meant to judge. The PENDING tags on that page were
  already gated behind `body.show-state`; the wait text now uses the same switch. **0 of 24 visible
  by default**, all one toggle away. Lab chrome should never be mistakable for the design.

  **THE ABOUT-ME IS TWO BLOCKS AGAIN.** The rework had merged bio_intro and bio_more into one "about
  me" on the strength of his four key features. He wants two: the hero, then *"a second one below it
  for the second about me text this time make it a full text box."* Un-merged, and the second panel
  is **sourced by ROD himself** - *"if you want a source for this list dimden and cyanliux as this is
  how they laid it out at one point."* Both were already read from source: dimden's translucent
  `.box` with its 2px `#383838` border for the panel, cyanilux's `.content` 30px padding for the
  room a full text box needs. Zero radius per the locked shape rule; the combination is ours and is
  labelled as such.

  **ACHIEVEMENTS GO BACK TO KLUBNIKA'S LAYOUT.** ROD: *"i liked the klubnika version of this alot
  better btw."* The bare grid becomes **catalogue + detail** - 29 tiles at 64x64 with 4px margins on
  the left, a 333x250 panel beside them that swaps from the selected tile. Klubnika's own geometry,
  already transcribed in `about-blockout.html`, so this is a return to a sourced arrangement rather
  than a new one. The section keeps its tagline, **"yours, not mine"** - the achievements belong to
  the visitor. The tile DESIGN still has no source and still waits on the design conversation he
  flagged (backlog E1b).

  Verified: one scene slot, hero at exactly 1.00 viewport, second block 898x303 in the 928 column,
  detail panel beside the catalogue, 29 tiles, footer present, and no overflow across twelve
  checks at 390 and 1440.

- **2026-08-23 (WARM GREY LOCKED, ABOUT REBUILT ON THE LANDING MODEL, FOOTERS EVERYWHERE).**

  **COLOUR: WARM GREY.** ROD picked it off `card-greys-tests.html` after seeing the candidates over
  the live scene. `--color-panel` moves `rgba(12,16,38,.55)` -> **`rgba(28,26,24,.55)`**, with
  `--color-panel-solid` and `foundations --panel` -> `#1c1a18`. Alpha held at .55 so only the hue
  moved and nothing changed size. **ORIGIN IS ROD, NOT A SOURCE** - that swatch was labelled "ours,
  not sourced" on the page when he chose it, so it is a taste call made knowingly rather than a
  guess smuggled through. It removes the last blue from any surface except the sky, finishing what
  D27 started when the tape took the colour.

  **THE ABOUT PAGE IS NOW THE LANDING.** ROD gave the model: *"about page is the landing page except
  the about me is the hero, the achievements are the project cards."* That replaced the potg.art
  200px rhythm the previous pass used - he supplied a reference of his own, so the numbers come from
  **his page**, measured at 1440x900: hero 804px = 0.89 of the viewport with a `min-height:520px`
  floor; `.sec` at `padding-block: 30px 60px` = 90px between sections; `.col` gutter 18.5%.
  About carries no top bar, so the landing's `calc(100vh - var(--top-bar-height) ...)` has nothing
  to subtract and the equivalent is a plain `100vh` - verified at exactly 1.00 viewport. Sections
  are cut out from each other with their own backing, and that backing uses **`--color-panel`, the
  same token the cards use**, so his one grey decision covers both.
  **Two bugs caught by measuring:** the spacious wrapper was left unclosed, so the Klubnika variant
  nested INSIDE it and the tile count read 58 instead of 29; and the scene band still nested a `.gb`
  outline around a `.cell` - two boxes over the scene where ROD asked for one.

  **SECTION HEADINGS: THE FAULT WAS A LEVEL MIX-UP, AND IT WAS MINE.** ROD: *"Section breaks dont
  have enough padding between them and the next and previous text please measure out how our
  combined references do it."* Measured from each source's own CHAPTER rule:
  `catlikecoding tutorials.css h2 { font-size:20px; margin: 2em 0 1em }` and
  `acegikmo styles.css h1 { margin-top: 60px }` with no bottom set. **The `.3em` bottom I had shipped
  is acegikmo's h3/h4/h5 value - their SUB-heading - not their chapter h1.** So our chapter heading
  sat ~11px off the paragraph under it while both references sit at 20px or more. Now Catlike's
  `2em 0 1em`, the only rule of the two that specifies both ends at chapter level; in `em` it is
  their ratio, so it scales at our larger heading rather than being re-picked.

  **FOOTERS.** `footer-line` was approved on the landing and existed only there. Copied verbatim -
  CSS and markup - to post, projects, about, ramblings and portal. 107px on each, verified.
  **Landing:** the featured-projects gap 30 -> 60 at his ask, which is one number, the head
  section's `padding-bottom`.

  **DECIDED AND RECORDED:** the post page keeps NO three.js - *"when i say none is the blob thats
  exactly what i mean keep it like this"* - so the scene-tier table deliberately omits it and that
  omission is now correct rather than pending. The PORTAL direction is 109ichiki's `cursor:grab`
  drag (not zutomayo's collapse) plus our `drift-magnet` and an edge bounce; the frame and handle
  are sourced, the magnetism is ours, and **the bounce has no source at all** and must be labelled
  as ours when built.

  **And a communication fix:** ROD asked what "toast" meant, which was fair - it is dev jargon.
  Replaced with "unlock popup" in 12 places on the achievements page.

- **2026-08-23 (ROD'S DECISIONS BUILT INTO THE FINAL PAGES).** A second batch of rulings, landed.

  **THE FIREWORKS BUG WAS NOT WHAT I SAID IT WAS, TWICE.** ROD: *"Top viewport still seems to not
  get autofireworks."* He was right. The spawn-range fix was real but second-order, and the
  "verified 6.8% down" claim measured MY OWN forced `createAutoFirework` calls, not the emitter.
  Measured properly at scrollY 0: **both emitters `active: false`** - greeting and reward alike - so
  nothing auto-fired anywhere at any height. The gate lives in
  `_javascript/modules/components/fireworks-toggle.js`, which ships in `commons.min.js`, **the same
  bundle the sparkler was in and that no lab page loads.** Two "the effect is broken" reports, one
  cause: the module was never on the page. Copied to `effects/fireworks-greeting.js`, greeting only -
  the REWARD stream is not wired at all, per P77. Verified `greetingActive: true` at the top with
  shells spawning. **The lesson is about the verification, not the bug:** proving a patch works is
  not proving the feature runs, and I reported the first as the second.

  **SCENE TIERS, as ROD defined them.** `full` = lanterns + fireflies + post + dock + water ->
  landing, about. `minimal` = lanterns + fireflies + post only -> projects, portal, ramblings.
  `bare` and `blobs` deleted. Built by hiding dock and water on the real scene rather than adding
  FBX to the minimal bundle, which would pull a second three.js into the page - a demo, not the
  port, and said so in the file. **Bug found:** the readiness loop waited on "lanterns exist", but
  lanterns and dock are separate FBX loads and the lanterns win the race, so the loop stopped before
  the dock was in the graph and it arrived visible. The stop condition is now the satisfied state.

  **ACHIEVEMENTS PICKED AND ALL REWARDS SCRAPPED.** ROD: *"200x76 square and the dim den B style"*
  and *"lets scrap the idea of unlocks they get an achievement and thats fine."* Built at exactly
  200x76. **Two things flagged rather than reinterpreted:** 200x76 is not square (2.63:1), so
  "square" is read as the shape call - zero radius, which B already is; and at 200px B's one-line
  layout does not fit, so the text wraps to two lines beside the icon, which is what the 76px of
  height buys. **D12 is fully retired** - the three lantern rewards go with the fireworks one - and
  the page now answers its own open question: with no rewards, the trophy wall IS the payoff.

  **CASE G PICKED, FIXED, AND PUT INTO THE POST.** ROD: *"Yes G is good... lets recolor the headers
  and the sub sections too i also find it weird that the section number is smaller than the header
  text and doesnt grow to match it."* The counter was a fixed `.72rem`, which is exactly why it
  stayed put. `em` on a `::before` resolves against the heading's own font-size, so **0.68em tracks
  any heading size for free** - and 0.68 is Catlike's own ratio (14px on 20px), not a taste pick.
  Proved by bumping a heading to 3rem and watching the counter go 14.7 -> 32.6px. Recoloured heads
  deep gold and subheads bright gold, so depth reads by hue rather than size, with the counter left
  muted. The rule recolours itself because acegikmo's borderless `border-bottom` inherits `color` -
  the whole reason that trick was kept. Applied to `final-post.html`, with the h3-as-chapter mapping
  stated in the file because the article still has no h2 (P55a, unanswered).

  **ABOUT: KLUBNIKA PICKED, SPACIOUS REBUILD BUILT.** `?v=spacious` is now the default and
  `?v=strip` still shows what he approved. **Section rhythm 10px -> 200px**, measured off
  potg.art/about (213/200/100/199 at 1440) with thatskygame independently at 150-360. The scene
  leaves the 928px column and goes full bleed with 200px above it. **Ten declared slots down to
  four** on his key-feature list, with the status terminal cut - it was a dimden named borrow he did
  not recognise. **Two bugs caught by measuring:** `.wrapper` is a centring FLEX row, so the new
  scene sat BESIDE the column rather than under it, and a `100vw` full-bleed includes the scrollbar
  and opened a horizontal overflow.

  **LANDING.** Skills draw halved twice at his ask (1.5s -> 3s -> 6s) and the skills icons are now
  magnetic - **not a regression, they never were**; `drift-magnet` was already running on the page
  and they simply never carried the class. View-all is now button-kit's magnetic primary reading
  "View projects". The head-to-cards gap was **119px and it was three numbers stacked** (the row's
  1.8rem margin + a 60px section padding-bottom + a 30px padding-top, because head and cards live in
  two separate `.col.sec` blocks); now **30px**, with the sections deliberately not merged.
  All 12 lab pages verified clean at 390 and 1440.

- **2026-08-22 (SCENE BUGS FIXED, ACHIEVEMENTS RESKINNED, TEN RULINGS LANDED).** ROD returned a
  batch of decisions plus four "major notes"; this is what came of them.

  **TWO SCENE BUGS, both real, neither where the docs pointed.**
  *The sparkler was never loaded.* It ships inside `commons.min.js` and no lab page loads that
  bundle - `final-landing.html` pulled exactly two scripts. Measured before touching anything: zero
  elements matching `[class*=spark]` on the rendered page. Fixed by copying `mouse-trail.js` and its
  two dependencies into `redesign-lab/effects/` per D22's copy-never-edit rule; the only edit is a
  `.js` extension on three import specifiers, which Rollup resolves and a browser does not.
  *The fireworks never reach the top, and it is NOT the unprojection trap* that TRAPS records - that
  fix is in and holding. The cause is four lines above the spawn call:
  `randomY = Math.random() * 0.5 + 0.3` with the screen coordinate at `1 - randomY`, so auto bursts
  land between **20% and 70% down the viewport** and the top fifth is excluded by construction. The
  comment above it says "upper/middle portion", which is exactly what it does - the range is simply
  not what ROD wants. Patched on the live instance from the lab; **verified over 50 spawns, highest
  burst now 6.8% down.**

  **SCENE MODES.** `effects/scene-mode.js` gives every final page `?scene=full|lanterns|bare|blobs`.
  Measuring first corrected the premise: **all six pages run the FULL scene** (58 lanterns, dock,
  water) and nothing anywhere loads `three-background-minimal.min.js`. "Minimal" is 35 spheres and
  genuinely has no lanterns - its own comment says the edge lanterns "were removed and only this
  note survived them", so ROD's ask was right. Built by hiding dock and water on the real scene
  rather than adding FBX to minimal, which would have pulled a second three.js into the page.
  **Bug worth recording:** `visible` will not hold on the water - three's `Reflector` rewrites that
  flag every frame as part of its own render pass. `material.visible` is outside that dance and does.

  **ACHIEVEMENTS (P68).** `achievement-tests.html` - five minimised toast treatments plus the
  29-tile trophy grid, all firing live so the arrival can be judged rather than the still. The
  current toast was measured first and carries **three AI tells in a single CSS rule**
  (`_animations.scss:292`): a constant `0 0 20px` gold glow against the de-glow principle, a 12px
  radius against the locked square-by-default, and `backdrop-filter: blur` on its sibling debug
  panel. The strongest candidate is zutomayo's window, which **folds into its own 46px title bar** -
  literally "minimise" rather than "dismiss". **The three lantern rewards are untouched:** #45
  deprecates `pyrotechnician -> auto-fireworks` by name and says nothing about
  `lantern-shape/color/panel`, so killing those would be CLAUDE deciding.

  **PROVENANCE.** `sources/zutomayo-pcmove-window.md` and `sources/about-page-spacing.md`.
  The zutomayo premise nearly failed in the flattering direction: 47 "window" hits on their landing
  are mostly `window.dataLayer` plus an image filename, and the `.remodal`/`.modal` classes are
  third-party libraries. Their real component is `.ztmy-pcmove-*` and it is genuinely theirs - 46px
  bar, one-class collapse, `box-shadow: 3px 3px 0` (zero blur, the same device D15 locked for the
  MinionsArt panel, now confirmed by a second independent site). **Not verified: whether they drag.**
  The handle is `cursor:pointer`, not `move`, and the JS was not read.
  The About measurements answer "more spacious" with a number: **our section rhythm is 10px;
  potg.art/about runs 213 / 200 / 100 / 199px**, and harumakigohan's whole profile page is ~800px
  tall with five elements and a 72px bio. Two references measured, not four - saying two rather than
  padding to the quota is the rule.

  **RULINGS LANDED.** Washi tape: opaque fill kept, axis-alignment kept, all placements approved -
  the three measured faults collapse to the one that was fixed. Top bar: centred nav with lopsided
  gaps, closed. Code-block colour: **syntax highlighting is a carve-out from the palette law** on
  readability grounds, and exempt from D18's sequencing for the same reason. Project cards: the
  circular-citation objection **withdrawn by ROD** - origin is his; only scaling remains. Scene lag:
  shelved until the effects are in, because measuring a page missing half its effects proves
  nothing. **#45 retires D12** (reward-as-unlockable) and deprecates confetti.
  Skills draw-in halved to 3s - and **two copies had to change**, the component and the landing's
  inline copy, which is the wrong-copy hazard biting again. Section heads unlinked and a **View all**
  button added under Featured Projects: his diagnosis was exact - `section-head` is one component
  used three times, so styling its label as a link styled Skills and Reel too.
  #3 answered plainly: **no callouts are shipping at all**; every slot is greybox `pending`. What is
  done and sourced is the TAPE, which is the marker stuck on a callout, not the callout.

- **2026-08-22 (WASHI TAPE: ROD PICKED CASE D, BUILT).** ROD, after judging `washi-tape-tests.html`:
  *"washi tape d remix"* - he named the tier himself. D is winterwind.com/tutorials/css/29's
  irregular `clip-path` tear. Built into `extracted/components/washi-tape/washi-tape.css` and its
  greybox twin in `text-decisions.html` (the two copies are a known wrong-copy hazard, so both moved
  together). Their pitch is unchanged - 1,4,9,13,19,21,26,30,36,43,50,52,61,69,70,76,81,84,91,97,99
  percent - because the IRREGULAR spacing is the device; a uniform pitch reads as a postage stamp.
  **Two things are ours and are labelled rather than folded into the citation.** (1) The AXIS:
  winterwind's polygon is a LONG-EDGE tear on a 2px strip painted in the page's background colour
  OVER the sheet; that mechanism could not be used here at all, because a live scene sits behind
  every card, so it becomes a clip on the tape and runs on the two ENDS. (2) The AMPLITUDE IS IN
  PIXELS, which is a bug fix rather than a preference: transposed to an end tear, a percentage
  resolves against whatever the placement's other axis is, and `.tape--left` is pinned
  `top:0/bottom:0` - its "5%" would be 5% of a 300px card, a **15px bite out of a 26px-wide strip**.
  5.5px is not a new number; it is exactly what ROD approved, `.tape--top`'s 5% of its 110px width.
  **The border is deleted, not commented out** - case D carries no outline and the measurement
  agrees, gneiss's real tape has none.
  **Recorded honestly rather than left to be found by eye:** 21 points across a 26-30px end is a
  ~1.3px pitch, a FINE serration roughly 5x finer than the measured reference (ends wandering +/-6px
  in 2-3 lobes across 116px). That is not what real washi does - it IS what ROD asked for and what
  he saw and picked. If it reads as noise at real size the fix is to subsample their pitch, which
  stays inside the same citation. **And what he has NOT seen:** the test page showed the tear on
  `.tape--top` only; the other three placements got it too, because one definition stuck on anything
  is the whole point of the component. That extension is CLAUDE's and is on the bench for his eye.
  Verified: 10 strips on the bench all clipped at 42 points with the correct axis per placement and
  `border:0` throughout; greybox law still held on `text-decisions.html` (every tape colour neutral,
  r=g=b); measure unchanged at 663; no overflow; no console errors.
  **Deliberately NOT bundled:** the 5.42-degree rotation (case G) and the transparent-third-band
  fill (case E) are separate picks and remain open.

- **2026-08-22 (WASHI TAPE SOURCED, FOUR LAYOUTS BUILT, POST MADE LAYOUT-COMPLETE).** A sourcing
  and layout pass run while ROD was away, under his standing instruction for it: *"when i say make
  the layouts i mean it dont try to substitute without my permission when stuck do research when I'm
  back i expect you to have many component pages that are based off the gallery references or from
  sites that contain similar elements."*

  **WASHI TAPE (P51/P52).** The look-at-other-sites step, outstanding since 2026-08-21, is done.
  Six edge mechanisms sourced and drawn on `washi-tape-tests.html`, plus the real reference asset
  itself. **The measurements disagree with the ask, which is the finding.** ROD asked for *"serrated
  edges like the tape was taken out from a roller"*; gneiss.place's real `tape1.png` was measured
  (alpha threshold 128, rotated onto the strip's own principal axis) at **298 x 116 on its own axis,
  drawn at 5.42 degrees off its bitmap axis, ends wandering +/- 6px in two or three broad lobes**.
  A dispenser blade gives ten to twenty alternations; this is a TEAR. Both targets are drawn rather
  than one being chosen for him. **Three faults independent of the tips, all measured:** ours carries
  a `1px border` the real tape has none of, ours is axis-aligned where the real one sits at 5.42
  degrees to its own edge, and our fill is an opaque two-tone repeat where the sourced stripe
  (codingartistweb) has a **transparent third band** - which is why ours reads as a painted bar.
  Case E tests the fill alone with square ends so the faults can be separated.
  **Citation corrected, not quietly:** `washi-tape.css` cites gneiss.place `.taped`, and that is
  true, but the rule is NOT in `index.css` - that file has **zero** occurrences of "tape". It is in
  `deco.css`, one `@import` deeper. Right citation, wrong file. Also: only `tape1.png` exists;
  `tape2/3/4.png` are 404.
  **Honest negative result:** the gallery's own neocities/collage sites (cinni, whey-isolate,
  midnightsolarium, melonking, minekosmarket, solani) have **no washi tape in CSS** - all six
  checked, one `border-image` PNG between them. CodePen returns 403 to this session (curl and fetch
  alike, four pens tried), so **no pen is cited anywhere**; the CSS-Tricks sawtooth is transcribed
  from the article body and the half it gives only in prose is labelled OURS.

  **THE FOUR REMAINING FINAL PAGES ARE NOW LAYOUTS, not slot stacks.** Each carries its chosen
  blockout's real geometry, verified by measurement at 1440 rather than by eye. `final-projects`
  MinionsArt: panel exactly **1000**, 3x300 grid at 20px gaps, the zero-blur `5px 10px` sticker
  shadow, 12 cards (blockout N=12, PINS=[0,1]). `final-ramblings` Eve hairline: `.wf` exactly
  **1140**, 8 rows, and the left edge verified **identical on all 8** - the exact property D15 chose
  the variant for. `final-portal` Space Jam: all **8 satellites match [w,h,left,top] exactly** and no
  two are the same size. `final-about` carries **BOTH survivors** behind a variant switch, per D15's
  *"i want to see both in the real version with the real elements"* - dimden 675+225=900 with a zero
  gap, Klubnika 928 with side borders only. Nothing substituted anywhere.
  **Three bugs found by measuring rather than looking:** `.slot`'s 22px padding forced two portal
  satellites off their measured size (44 and 40 both rendered 46); `58em` rendered Klubnika's column
  at **947 not 928** because `em` resolves against the element's own inherited font-size, the same
  trap as the prose measure; and a fixed 560px measurement cell overflowed ramblings by 187px at
  390 wide because its `max-width:100%` resolved against a `max-content` grid TRACK, not the
  container. All three fixed and re-verified; every desktop number is unchanged.

  **POST MADE LAYOUT-COMPLETE (P55).** Five prose elements the blockout declares and the page did
  not have, added at reading-order positions and sized to what the blockout reserves: TL;DR (role 1),
  note/warning (role 2, replacing a generic 110px box), reference/links (role 3), pull quote (90px)
  and margin note (88px). The callout family is ONE component in three roles - alevirita's note on
  `text-decisions.html` says *"one object covers all three roles"* - so three roles, not seven boxes.
  **A bug worth recording:** the first pass put the reasoning in `.slot__wait` and grew a 76px
  callout to **244px**, a 3x over-reserve. A greybox that reserves the wrong space is worse than no
  greybox, because it teaches the eye a rhythm the built page will not have. Reasoning moved into
  comments, a scoped `.slot--tight` added, all five verified at their exact reserved height.
  **STILL OPEN and flagged rather than fixed:** the article has NO h2 - it runs h1 -> h3 six times,
  where the blockout declares an h2. Changing which level ROD's own sentences sit at is a CONTENT
  edit and the content is his. It is also a skipped-heading-level a11y gap.

  **SECTION BREAKS (P54) and CARD GREYS (P53) are component blockouts, not builds.** ROD asked for
  headers in their own spaced-out cards and for sections broken into their own bits; per PAGE-PROCESS
  a change he asks for becomes a NEW VARIANT with a real source, so `section-break-tests.html` draws
  six at the real 767px measure. Two read from source this day - **cyanilux** boxes every h2/h3/h4
  with 30px above (his ask almost word for word, 20 h2 on one real page, nesting carried by fill
  `#282828 -> #303030`) and **dimden** boxes the SECTION in a **translucent** `#000000a8` panel, the
  only boxed candidate that would not bury the live scene. Three of the six have **no box at all**,
  on purpose: without them every option is a card and the page proves the ask instead of testing it.
  No source combines a boxed heading WITH a boxed section, so that combination is not drawn.
  `card-greys-tests.html` was **deliberately not committed as a token flip** - it is one line in
  `settings.css` but that line repaints every card on every page including the 8-of-11 landing, and
  "similar to the blockout" is not a value. Measured: the cards really are blue today,
  `rgba(12,16,38,.55)`, 38 blue against 12 red.

  **Ledger:** 8 new sourced rows and 1 corrected citation in `element-tracker.md`; 4 new verbatim
  source notes in `redesign-lab/sources/`. **Verification:** all eight touched pages measured clean
  at 390 / 768 / 1440, zero console errors, and every desktop constant re-checked after the
  responsive fixes to confirm nothing moved.

- **2026-08-11 (DOCS SYSTEM ESTABLISHED).** Atomic-note docs folder created, replacing
  PROJECT-STATUS.md and CLEANUP-LOG.md (both superseded - still-true content folded into STATUS
  and TRAPS). ROD's call, drafted by CLAUDE, motivated by two findings: the old monolith was ~4
  months stale with wrong counts, and web research showed the atomic shape (small notes + index +
  short CLAUDE.md) is what makes agent sessions cheap - Obsidian software optional, MCP layer
  rejected for now (see DECISIONS D1). Conventions ported from the Underworld project: philosophy
  layer (observation-first verification, decision logs with losers, dead-ends tables, traps
  symptom-first, controlled vocabulary, upstream-boundary discipline, stage-by-stage delivery with
  test recipes) plus the concrete naming/comment/structure rules translated to Jekyll/JS/SCSS.
  Refactor plan drafted (Phases 0-3: docs reset, theme boundary, subsystem decoupling, swap
  readiness). Still needs: ROD placing the files, retiring the old docs, and the Phase 0 test
  recipe (fresh session orients from CLAUDE.md + STATUS alone).

- **2026-08-11 (DOCS LANDED, OLD DOCS RETIRED, RULINGS RECORDED).** The bundle above (drafted in
  `Learnings/` by a parallel agent) was reviewed with ROD and landed: CLAUDE.md at the repo root,
  notes in `docs/` (already Jekyll-excluded). CLAUDE drove the merge, ROD ruled on the conflicts:
  (1) provenance law + redesign-workbench reality added to CLAUDE.md/CONVENTIONS/DECISIONS (D7) -
  the draft did not know the redesign existed; (2) anti-bloat CONFIRMED and recorded as D5,
  superseding the earlier "optimize all JS files" passes ("that work was under a different lens");
  (3) refactor Phases 1-3 DEFERRED until the redesign ships (D6) so extraction happens once.
  Merged from the old docs before retiring them: breathing-system reference -> BREATHING.md
  (element inventory deliberately dropped - grep instead, it rots); behavioral
  lessons -> Claude's memory; task history -> git. CLEANUP-LOG's removed-code tables discarded as
  history. /sync-docs retargeted at this folder. `Learnings/` deleted after the merge. Post counts
  re-measured (19 posts: 16 tech-art / 2 game-design / 1 blog, 10 wip) - the draft's "12 wip" was
  already stale, proving its own point about counts.

- **2026-08-11 (SHIP-CHECK GATE ADDED).** New `/ship-check` skill (`.claude/skills/ship-check/`),
  ROD's ask: a pre-ship checklist that fires whenever he finalizes any creative step. Seven gates:
  provenance ledger row (True/Remixed only, claude-ratio < 25%), the tell fork (pillar-elevated or
  deleted, no neutral middle), taste anchors (pillars + de-glow + Rod-saw-it), CONVENTIONS
  readability spot-check, quality floor (contrast/line-length/reduced-motion/44px/flash limit),
  no-GPU degradation path, and docs-are-part-of-done. Report-only by design (Section J precedent) -
  the gate surfaces flags, ROD rules on them. Rationale: the enforcement audit found the weak link
  was rules living in docs with no forced moment of application; this pins them to the finalize
  moment. Trigger is model-recognized finalize language plus a CLAUDE.md standing rule (not a
  harness hook - "finalize" is semantic, not a tool event).

- **2026-08-12 (LAYOUT PHASE: VERIFIED CAPTURES, A3 LAYOUTS, WEB-PREVIEW SKILL).** The layout
  exploration was rebuilt on evidence after ROD rejected two earlier attempts. Attempt 1 derived
  variants from measured numbers and flattened different sites into the same shape ("likely
  useless"); attempt 2 smuggled each site's colour into the greybox and broke comparability. Root
  cause of both: the reference screenshots were wrong. ROD caught it - "if all the content is
  missing and it's just an empty background the page probably hasn't loaded" - and he was right on
  every count. Four separate capture failures were found and fixed (see [TRAPS.md](TRAPS.md)), and
  the working method became the user-level **`web-preview` skill**: wait for network idle, scroll-
  sweep to fire lazy-loading and reveals, capture the first screen before any DOM edits, then unfix
  fixed/sticky layers and capture one real screen at a time, stitching at true offsets. CLAUDE
  built it; the non-negotiable step is verifying a contact sheet by eye before using a capture.
  On that base: 13 main pages + 12 sub-pages captured, the reference gallery re-imaged with
  rewritten captions and layout/font tags plus a Sub-pages section grouped by page type, six A3
  layouts derived from what the captures actually show, and `a3-assembly.html` building those
  layouts from real bench components over the live lantern scene. ROD asked for provenance to be
  visible after noting the greyboxes explained nothing, so every variant now states its source,
  its borrowed moves, and labels them on the sections they changed - including honest labels for
  the one variant that was CLAUDE's idea rather than a reference. Rulings recorded as D8/D9.
  Impeccable was dropped as a layout gate (ROD: "it doesn't actually do much here"). A full font
  audit followed and surfaced a real conflict between the locked no-serif type rule and the
  serif-heavy references; the build order for the remaining missing components is parked until
  ROD rules on type.

- **2026-08-13 (MISSING LAYOUT DEVICES BUILT FROM SOURCE; ART SEPARATED FROM MECHANISM).** The five
  devices the A3 assembly had been reserving with greyboxes are now real components in
  `redesign-lab/extracted/`: `seam-band`, `edge-rails`, `dated-timeline`, `picture-frame`. ROD
  called for the build; CLAUDE re-fetched each source site's actual CSS first rather than working
  from the captures, so every rule is transcribed with its source values intact (ndt's 160px band
  tiled `repeat-x` at 70%; /10/'s rails sized by height and dropped under 450px; /10/'s timeline at
  20/4/70 with the date `sticky` at `top:100px`; 109's 20px inset, 8px radius, 1px stroke). Two
  earlier assumptions died on contact with the code: the "cloud partition" is a different mechanism
  from the seam band (one painted sheet, not a tiled strip), so it is a modifier rather than a
  second component; and 109's frame is an SVG rect with a mask only because JS has to resize it,
  which `inset` plus one outset `box-shadow` does for free.

  The finding that shaped the whole build: **three of the four devices are painted PNGs on the
  source sites, not CSS.** So each component owns the mechanism and exposes an art slot
  (`--seam-art`, `--rail-art`, `--tl-rule`), degrading to a plain rule when empty. That keeps the
  layouts judgeable on spacing and rhythm today without anyone inventing artwork, which the
  provenance law forbids, and turns the remainder into one scoped drawing task. The in-scene
  identity art stays a greybox for the same reason: it is art, and it belongs to the character-scene
  track. Also fixed while wiring: a3frame's sticky top bar sat at `top:0`, covering the frame's
  gutter type and crossing its border - it now sits inside the frame, which is what 109 does.
  Deliberately NOT copied: the sources' colours (ndt's pink/blue/navy, /10/'s `#fef694`) - colour is
  Sodium & Sky's job. Type decision still open and still not blocking.

- **2026-08-13 (THE SCRIM WAS NEVER RENDERING; REMOVED FROM THE ASSEMBLY).** ROD, judging the
  layer toggles CLAUDE had just added: "i literally cannot see the scrim whatsoever". He was right,
  and not because it was subtle. `#scrim` was a fixed vertical readability gradient at
  `z-index:-1`; the scene's canvas is also `z-index:-1` and is appended by script, so among equal-z
  siblings DOM order decided it and the canvas painted straight over the scrim. It had never been
  visible on that page. The scene's own vignette survives only because `three-shared.js` appends it
  after its own canvas. Removed from `a3-assembly.html` along with its toggle; the vignette toggle
  stays, since that layer is real. Consequence worth remembering: the readability protection we
  assumed we had does not exist, so if text over bright lanterns ever becomes a problem the fix is a
  scrim at `z-index:0`, not a darker version of the old one. The same dead copy sits in five other
  lab pages (`aggregate`, `home`, `new-landing`, `rework-hana`, `palette-explorer`) and was
  deliberately NOT swept: a page without a scene canvas would genuinely be showing its scrim, so
  each needs checking rather than a blind delete.

  Also this session: the a3 assembly's layer controls became live toggles instead of URL reloads,
  because the scene re-randomises on every load and an A/B across two reloads is unjudgeable. And
  ROD rejected the borrowed painted DIVIDERS outright - seam band, cloud partition and the /10/
  curtain rails - on the grounds that they divide flat colour fields, which his continuous live
  scene does not have. Direction chosen instead: sparkler, foreground objects, lantern garland, all
  additive to the scene rather than drawn over it. Sourcing not yet started.

- **2026-08-13 (CURSOR REVEAL: MATERIAL FIXED, AND SCOPED BACK TO THE CARDS ALONE).** ROD on the
  project cards: "the reveal looks more like a metal band than a glow". Diagnosis, from reading the
  construction rather than the colour: the yannesidibe technique is a constant-width 1.5px strip,
  hard-cut on both sides by its mask, carrying a bright spot that slides along it, with no spill in
  any direction. That is how a specular highlight on polished trim is built, so the eye was reading
  it correctly. CLAUDE proposed seven treatments on a new `glow-edge-tests` bench (each attacking
  one cue, plus a stacked one, all on the real card with a synced-cursor mode so eight cards could
  be compared at once); ROD picked **additive (`plus-lighter`) + soft edge (`blur(2.5px)`) +
  inward spill**. Rejected there: long tail, dim core, and rounding the glow's corners. The card's
  SHAPE was never in question and is untouched. Those three treatments are CLAUDE-originated ideas
  and are logged as such against the under-25% guardrail, even though the selection was ROD's.

  Applied to the back as well, which then exposed that the back had never matched the front: its
  static border was `rgba(251,191,36,.35)` against the front's `.14` (a hard bright line the new
  glow simply sat on top of), it ran one ring layer where the front runs two, and its spill reached
  the edge instead of insetting 8px. All three matched. Also removed a duplication hazard by
  hoisting merged-card's glass sheen into a `--glass-sheen` token instead of restating it.

  Separately, ROD spotted the skill icons doing a cursor reveal too and rejected it: "I never
  wanted a hover to reveal effect", plus the second icon was visibly desynced. He was right about
  the artifact and the cause is exact - `draw-in-icons.js` cloned each icon at init, AFTER the base
  had already started its CSS draw-in, so the two copies' `stroke-dashoffset` were permanently out
  of phase and the icon read as doubled. Removed from the JS and the CSS; the draw-in and the
  magnet are untouched. Worth keeping: the deeper objection was that cards and skills ran the same
  cursor-mask trick off the same `--mx/--my`, making the page feel like it had one move. The reveal
  is now the cards' alone. Open from the ship-check and NOT yet resolved: the reveal has no
  `prefers-reduced-motion` path, and `filter: blur()` plus `mix-blend-mode` on a layer that updates
  every frame needs a real FPS check against the perf constraint.

- **2026-08-16 (FIREWORKS SPLIT IN TWO; V6 LOCKED; FAVICON UNBUNDLED).** Three queued items closed.
  (1) **Fireworks.** The queued task was a scroll gate; ROD reframed it mid-build into two
  independent streams - a permanent top-of-page GREETING and the earned REWARD that stacks on it -
  and rejected CLAUDE's single-flag "toggle as master kill" design because it would have destroyed
  the unlock moment (full reasoning + the rejected option in [DECISIONS.md](DECISIONS.md) D12).
  Gate is 0.3 viewport, all pages, ROD's numbers. Found and fixed while building: auto-launched
  shells were dispatching `achievement:firework`, so a permanent greeting would have unlocked
  Pyrotechnician - whose reward IS the toggle - with the visitor sitting still. Verified live: the
  counter held while greeting shells launched and expired, and the gate flips at the right scroll
  position. Also deleted a dead `const length` in `createRocketTrail` that predated this work and
  was failing eslint. NOT verified: how it looks. ROD has not judged it yet, and the combined
  flash rate at the top is an open item he chose to eye rather than have CLAUDE cap.
  (2) **V6 LOCKED (ROD)** as the hero direction, with two same-day changes: the social rail now
  hangs 48px below the vertical name - ROD's spec was "the same space we give the vertical text
  from the top bar", and that gap is 48px - and it is measured in JS because the name block's
  height is clamped in vh, so no CSS constant can say where it ends. Other variants keep
  harumaki's centred rail untouched, so only V6 departs from the transcription.
  (3) **Top bar favicon unbundled**, ROD choosing to KEEP the wordmark rather than drop it (the
  redundancy question stays open). Mark 51 -> 60px, gap 14 -> 38px. The 60px is a real ceiling, not
  a taste pick: it is the wordmark's own line box, and one pixel more makes the mark the tallest
  bar item, grows the bar past 96px and overflows `.h{height:calc(100vh - 96px)}` - which was
  caught by measuring, after a first attempt at 4.2rem did exactly that.
  Also corrected here: STATUS had claimed the anime-glow flat emissive was lab-only. It is live in
  the working tree (uncommitted) and has been since 2026-08-13.
  Dropped, not done: the caps-in-Caveat taste call - ROD is replacing Caveat with a line-boil
  animation, clock included, so the question is moot.

- **2026-08-16 (FIREWORK PLACEMENT: A CONFIG BUG, A PROJECTION BUG, AND A WATER RULE).** ROD
  reported three symptoms - shells going "too far in the z", clipping the water, and never reaching
  the top of the page - and asked for a PLAN with the maths before any more attempts, because
  earlier passes at the tilt problem had not stuck. All three turned out to have distinct causes.
  (1) **The depth spread was a falsy-default bug**, not a tuning choice: `config.minZ || -10000`
  discarded the configured `0`, so the effective range was -10000..-200 instead of the intended
  band. That 9800-unit spread IS the "sometimes" in Rod's report - measured, the same burst reads
  110% of screen height at the near end and 7% at the far end. Every option in that constructor now
  reads with `??`. Band retuned to -3000..-4500, derived not guessed: scene content ends at z -1130
  and the water plane reaches -4500, so this sits behind everything and still over the water.
  (2) **The tilt shortfall was a wrong projection.** Screen-to-world used frustum trig that assumes
  the camera looks down -Z; About pitches it 25 degrees at the top of the scroll. Measured error at
  z -1000: true world Y 2455, formula 1281 - it reached 52% of the way up. Replaced with an
  unproject through the camera's own matrices, which is correct at any rotation and DELETED the
  `extraHeightThreshold`/`extraHeightMultiplier` block. That block was the previous attempt's
  compensation curve, and keeping it is what made this recur: it can be tuned right for one tilt
  and is wrong at every other scroll position. ROD signed off on removing it explicitly.
  (3) **Water clipping was guarding the wrong thing** - `sceneBottom` clamped the burst CENTRE while
  particles reach roughly `1.69 * explosionSpread * scale` below it (sphere ~1.1 plus the shader's
  gravity term ~0.588). So the floor now scales with the shell's own size: small ones may burst low
  near the water, big ones are pushed high, no special case. Verified on 41 live shells: zero
  violations, depth held the band. HONEST LIMIT: the 1.69 is read off the shader, not measured -
  particle positions are computed on the GPU and cannot be read back, so it wants an eye check.
  OPEN, and worth knowing before tuning further: **"far background" and "occasional small burst
  close to the water" cannot both happen at one depth.** At z -3000..-4500 the frustum is 3644-5205
  units tall, so the water surface projects near the horizon and every shell lands between y 1594
  and 4408 - the new floor never even binds. Getting Rod's low near-water pops needs a SECOND,
  nearer band (roughly -500..-1500) rather than a lower Y in this one.

- **2026-08-16 (FOUR PAGE BLOCKOUTS BUILT; STRIPE.DEV TRANSCRIBED FROM SOURCE).** ROD asked for
  blockouts of the remaining surfaces "just like we did here" (hero-tests) and chose to do all four
  in one pass rather than one at a time. Built: `post-tests.html`, `projects-tests.html`,
  `ramblings-tests.html`, `about-tests.html` - same furniture as hero-tests (variant bar, PROV
  panel naming each borrowed move plus honest caveats, live three.js scene behind).
  **POST is the important one** (ROD) and it is the SHARED template - projects and ramblings both
  use it. Reference is stripe.dev, ROD's pick, and it was MEASURED from the live article at 1440
  rather than read off a capture: a **24-column grid at 58.375px per column**, children on
  `subgrid`, sticky metadata rail **exactly 6 columns (350px, top:60px)**, prose column **exactly
  12 columns (701px)**, the remaining 6 columns left as right margin - the layout is deliberately
  NOT centred. Type: h1 101/93 at weight **300** with -0.06em tracking (light, not bold), h2 48/48,
  body 18/23.4, 1px rules in the ink colour, 56px section rhythm. Our transcription measures 1425px
  / 6 cols / 12 cols / 6 cols margin - exact.
  ROD asked for BOTH stripe versions because the one he prefers is the awwwards Site-of-the-Day
  entry, which differs from what stripe.dev serves today. PROVENANCE LIMIT recorded on the page
  itself: that version is NOT live, so no CSS exists to transcribe - variant 2 inherits the
  measured structure from variant 1 and takes only the float-over-imagery idea from awwwards. It
  matters for us beyond taste: floating the type layer over an image is structurally the same
  problem as floating it over the live night scene, and the opaque variant hides the scene on every
  post. Their face is `sohne-var` (Klim Söhne, commercial) so it is substituted; ratios transfer,
  the face does not. Also flagged: their prose runs ~78ch at line-height 1.3, against STYLE.md's
  65-75ch - a real conflict, not a detail.
  The other three came from measured profiles already in `analysis/layout-measurements.md` rather
  than new capture work: projects = pomodorosa's ~360px bento wall vs 109ichiki's one-giant-region
  (76% of page, 97.5px breath); ramblings = the harumaki/hana convergence (604px/42% and 594px/41%,
  independently measured) vs dimden's fixed 900px dense column; about = that same 42% column vs
  reusing the stripe rail, since About is the one page with genuinely tabular facts.
  Bug caught by measuring rather than looking: the About rail rendered at 1.8 columns instead of 6,
  because `grid-column: span 6` sets the START, so a separate `grid-column-start: 14` left the end
  at `auto` and collapsed it. Now `14 / span 6`.

- **2026-08-16 (SUB-PAGE BATCH REJECTED; THE PAGE PROCESS WRITTEN DOWN).** ROD rejected all six
  sub-page "blockouts" CLAUDE built earlier the same day, on four counts at once: they were
  COLOURED rather than greybox (DECISIONS D8 says geometry only, one grey language, no colour);
  no analysis was done of what ROD needs per page, what the current `_layouts/` already render, or
  what other sites do; they cited only one to three reference sites where ROD requires at least
  FOUR live sites per page type, which breaks the provenance law; and they were finished far too
  fast, which is the symptom of the other three rather than a separate fault. Every rule broken was
  already written down here or in memory - the failure was not looking, so the fix is not another
  rule but a place the rules are guaranteed to be read.
  New note [PAGE-PROCESS.md](PAGE-PROCESS.md), linked from CLAUDE.md's read-first block: the two
  artifacts (BLOCKOUT = uniform monochrome greybox / AGGREGATE = bench components + the set
  palette, never a hybrid), and ROD's four-step procedure generalised from the landing page -
  ANALYSE (what ROD needs, what exists, what 4+ live sites do, how to copy it) -> BUILD four
  sourced variants -> CLEAN-AGENT VERIFICATION by a fresh subagent -> ROD JUDGES, with changes
  becoming new variants rather than edits. Records that speed is a symptom: if a page type took
  minutes, the analysis did not happen.
  ROD also refined the stage gate: sub-pages START at blockout, but the gate is COMPONENT COVERAGE,
  not ceremony - if a surface is not missing components, or most of it can be built from the bench,
  build the AGGREGATE too with a greybox PLACEHOLDER for each missing component (D9's placeholder
  rule at page level), stating which slots are real and which are placeholders.
  The rejected pages are archived under `redesign-lab/archive/2026-08-16-rejected-subpage-tests/`
  with a README, kept ONLY because the measurements in them are real and expensive: stripe.dev's
  24-col/58.375px spine with its 6-col sticky rail and 12-col prose, and brittanychiang's 561px
  full-height sticky column against a 607px scroller. Both are recorded there with their honest
  limits (Söhne is commercial; her teal accent breaks the palette law; her webfont did not resolve
  so no face is claimed). A research workflow is now running the analysis that should have come
  first: 4+ live sites per page type for post, projects, about, ramblings, resume AND portal.

- **2026-08-16 (SUB-PAGE RESEARCH DONE PROPERLY; POST BLOCKOUT BUILT).** The analysis that should
  have preceded the rejected batch. A 16-agent workflow ran inventory (what the live `_layouts/`
  render, what the 28 bench components cover, what the gallery already holds) then extraction of
  **4+ currently-live sites per page type, every one read from its own CSS**, then four distinct
  greybox variant specs per type. 1.6M tokens, zero agent errors. Full per-agent output preserved
  in `redesign-lab/analysis/subpage-specs/`.
  **The gallery earned its keep**: its Sub-pages section already covered ABOUT and PROJECTS with
  four sourced references each, and told us precisely where a fresh search was actually warranted
  (post, ramblings, resume, portal). Sources landed: post = Cyanilux / Klubnika / Inigo Quilez /
  dimden; projects = MinionsArt / 109ichiki / Kaito Note / TUYU; about = dimden / 109ichiki /
  Klubnika / potg.art; ramblings = dimden / Klubnika / Eve Official / whey-isolate; resume =
  Brittany Chiang / Zach Leatherman / Ben Hoyt / Tania Rascia; portal = potg.art / ZUTOMAYO MART /
  lyra.horse / Space Jam 1996.
  **A correction the inventory produced: the portal is a THREE-way, not a two-way** - the live
  `_layouts/portal.html` ships Tech Art, Game Design AND a Ramblings link in `.portal-extras`.
  Every variant must route three doors.
  **Do not trust this run's critic verdict.** It reported "the brief asked for six page types, the
  output contains two" - that was an artifact of CLAUDE truncating the results to 40k before
  passing them in, not a research failure. All six synthesis agents completed; the journal proves
  it. Worth remembering as a workflow lesson: a critic fed a truncated slice critiques the slice.
  `post-blockout.html` built first (Rod: the important one, and the SHARED template for projects
  and ramblings). Four variants: Cyanilux's contained card where SECTION RHYTHM IS FILLED BARS
  rather than typography; Klubnika's document sheet with left/right hairlines only and every
  boundary a 1px DOTTED rule; Inigo Quilez's 120ch character-based measure with the TOC as a
  wrapping wall and no container chrome at all; dimden's uncapped-left layout where content caps
  at 1200px, chrome does not, and 205px of ground is deliberately left bare on the right.
  Verified empirically rather than asserted: of 14 distinct painted colours, ZERO are non-grey
  (r=g=b on every one), and the four column geometries measure 855 / 928 / 1188 / 1200px with
  dimden's 205px right gap exactly as transcribed.
  Also produced: `analysis/2026-08-16-component-gaps.md`, the list of elements still needing a
  workbench component. Headline finding - the bench has 28 directories but only ~20 are shippable
  components, and **coverage is inverted against priority**: deep on chrome, controls and cards,
  near-empty on everything that makes a POST readable (no reading well, no sticky rail, no TOC, no
  progress bar, no prev/next, no hero media, no lightbox). POST and ABOUT are genuinely blocked at
  the aggregate stage; PROJECTS is close enough to attempt with placeholders; RESUME has zero
  dedicated components and zero ledger rows.

- **2026-08-16 (ALL SIX SUB-PAGE BLOCKOUTS BUILT, GREYBOX, 24 SOURCED VARIANTS).** post, projects,
  about, ramblings, resume and portal - four variants each, every one transcribed from a
  currently-live site read from its own CSS, in the ONE grey language `landing-blockout.html`
  already established. Each blockout carries a provenance panel naming its source URL, the
  transcribed geometry, and the honest caveats including any AI tell the variant flirts with.
  Full ledger: `analysis/2026-08-16-subpage-sources.md`.
  VERIFIED RATHER THAN ASSERTED, which is the part that failed last time: every blockout's content
  area was measured with `getComputedStyle` and returns ZERO non-grey values (r=g=b on every
  painted colour; the only non-grey in the files is the provenance panel's link blue and warning
  amber, which is lab tooling exactly as in landing-blockout). Post columns measure 855 / 928 /
  1188 / 1200px, with dimden's 205px bare right gap exactly as transcribed. Kaito Note tiles hold
  the 549/312 ratio at 1.76 with the pinned tile precisely double on both axes; 109ichiki's pinned
  square fills at 212px while unpinned stay inset at 172px. All three portal doors are present in
  all four portal variants, so the frozen-slot rule holds.
  A measurement worth keeping: on ABOUT, the page carrying the heaviest scene, the four variants
  cover 52.7% / 50.7% / 23.1% / 15% of the ground respectively (dimden panels, 109ichiki scatter,
  Klubnika strip, potg bands). That turns "how much scene does this cost" from an opinion into a
  number, and it is the clearest axis for judging that page.
  ONE DELIBERATE OVERRIDE of the research: the portal spec proposed its own LIGHT grey ramp
  (#E8E8E8). Rejected - the greybox law is one grey language across every surface, so the portal
  uses the same dark ramp. Comparability beats per-source fidelity.
  Borrowing is CONCENTRATED and worth watching: Klubnika appears in post/about/ramblings, dimden in
  post/about/ramblings, potg.art in about/portal. If the set starts reading same-y, that is a cull
  signal rather than a coincidence.

- **2026-08-16 (STRIPE.DEV RESTORED TO THE POST BLOCKOUT — a delegation failure).** ROD asked why
  his own chosen reference was absent from the post variants. It was a genuine miss with no good
  excuse: stripe.dev was measured in detail early in the session, then dropped when the research
  workflow independently sourced its own four post references and the blockout was built straight
  from that spec WITHOUT checking that ROD's named pick survived the handoff. The measurements
  were sitting in the archive the whole time.
  The miss was worse than an omission. ROD had named the exact device he wanted - "two columns
  with the left data following when you scroll" - and **none of the four variants had a sticky
  rail**: Cyanilux's TOC is explicitly not sticky, Klubnika's is not sticky, IQ's is a wrapping
  wall, dimden's is a 3-cell block. The post blockout was testing four ways of NOT doing the
  requested thing.
  Fixed: stripe.dev is now V1 and the DEFAULT, re-measured at 1440 on the exact post ROD linked -
  24 columns x 58.375px, container 1425, sticky rail exactly 6 columns (350px) at top:60px
  carrying / METADATA, / AGENTS and / SHARE, prose exactly 12 columns (701px) from x=421, ~5
  columns of bare right margin, h1 101.085/92.998/weight 300/-6.065px tracking. Verified: the body
  scrolls 900px while the rail stays pinned at 60px, and it is the ONLY variant of the five with
  any sticky element at all. Greybox law still clean (zero non-grey in the blockout content).
  PROCESS LESSON, recorded because it will recur: **a reference the user names is a fixed
  requirement, not a candidate.** Delegated sourcing has to be diffed against the user's own picks
  before anything is built on top of it. Related: the sticky metadata rail is listed as MISSING in
  `analysis/2026-08-16-component-gaps.md`, so the variant ROD likes is also the one most blocked
  on a component that does not exist yet.

- **2026-08-16 (MINIONSART VARIANT SQUARED; ABOUT GETS ITS SCENE BOTTOM).** Two ROD asks on the
  blockouts.
  (1) **The MinionsArt projects variant now uses the square cards.** ROD's locked 2026-08-11 shape
  pass ("square by default, round only by exception") applied to a transcription. MinionsArt's own
  radii were panel 10 / card 15 / thumb 15-15-0-0 / chips 10; all now 0, matching
  `.merged-cards--square`, which zeroes card-cover, card-back, glass-plane and card-pin. The card
  FOOTPRINT needed no change - MinionsArt is already 300x300, the same 1/1 aspect
  `.epx-cards.is-regular` uses, so the two systems already agreed on proportion and disagreed only
  on corners. THE EXCEPTION IS KEPT: the star pin holds its 5px radius at the component's 1.7rem
  square, exactly as `.merged-cards--square .card-pin--star` specifies, and the chip pin was
  swapped for the actual star glyph. What was NOT touched: the 1000px panel, the 3x300 grid at
  20px gaps, and above all the zero-blur `5px 10px` offset shadow, which is the load-bearing line
  of that variant - it is what makes the card read as a sticker on paper rather than a soft panel.
  Verified: the ONLY rounded elements left anywhere in the variant are the two star pins at 5px.
  (2) **The about blockout now carries the scene bottom.** ROD: the about page needs the full
  scene at the bottom like the regular page. Transcribed from `landing-blockout.html`'s own
  `.sceneb` (720px, #151515, 1.5px dashed inset fill) plus the 80px footer. It sits OUTSIDE the
  variant switch deliberately, because DECISIONS D9 makes the scene bottom a CONSTANT full-height
  block - if it varied per variant the variants would stop being comparable. Verified 720px and
  full-bleed (1425px at 1440) identically across all four, and it is ~20% of the page.

- **2026-08-16 (PORTAL SOURCES WERE MOSTLY NOT PORTALS — ROD CAUGHT IT).** ROD: "idk where a lot of
  these portal designs come from, none of these sites I'm pretty sure have a portal at all." He was
  right. Verified by fetching each:
  **potg.art is NOT a portal** - an artist portfolio with an ordinary nav bar (About / Works /
  Contact) plus socials. The research had described it as "two pinned text panels that swap by
  scroll state, a genuine two-door chooser"; that was a scroll-animated HOMEPAGE reframed as doors.
  **lyra.horse is NOT a portal** - a personal homepage listing four projects (antonymph, blog, css
  clicker, x86css) plus socials. The "2em bold door links" are project links on an index page.
  **ZUTOMAYO /mart_both/ is UNVERIFIED** - the path reads as a both-marts chooser and the block
  geometry is real, but the retrievable anchors are the site's global nav; the two store doors are
  not in the readable markup.
  **Space Jam 1996 is the only VERIFIED portal** - its homepage is 11 section links and essentially
  nothing else. Routing IS the page.
  ROOT CAUSE, and it is structural rather than careless: the extraction schema asked whether a site
  was LIVE and what its GEOMETRY was, and never asked whether the site is actually that PAGE TYPE.
  Every confidence field said "read-from-source" and every one was telling the truth - the CSS was
  genuinely read. Only the classification was fictional. Compounding it, portal had ZERO gallery
  coverage and a hard "at least 4 sites" quota, and quota pressure on a rare page type is what
  produced the stretch. This is the second sourcing failure in the batch after stripe.dev was
  dropped, and they share a root: the mechanics of delegated research were verified, the premises
  were not.
  FIXED: every portal PROV panel now states honestly what its source actually is, with the two bad
  ones marked NOT A PORTAL, the third UNVERIFIED, and Space Jam marked verified. The geometry is
  left in place because it was really read - a fixed left column with scroll states and a 2:1 type
  scale are real devices - but they are now labelled REMIXES FROM NON-PORTAL SOURCES rather than
  portal transcriptions. Two rules added to [PAGE-PROCESS.md](PAGE-PROCESS.md): verify the
  reference IS the page type (a separate test from reading its CSS), and treat a minimum-source
  quota as a trap on rare page types - report "there are only N real ones" instead of padding.

- **2026-08-16 (POST AGGREGATE AUDITED AGAINST THE RULES — IT WAS BROKEN).** ROD: "you have been
  not following the previous rules and examples." Re-read CONVENTIONS, PAGE-PROCESS and the ledger,
  then audited `post-aggregate.html` against them. Five real failures, all found by MEASURING
  rather than reading:
  (1) **Every `--color-*` token was UNDEFINED.** The page loaded `foundations.css` but not
  `extracted/styles/settings.css`, which is where the token layer lives. The bench components were
  therefore rendering against variables that did not exist - the top-bar's background resolved to
  `rgba(0,0,0,0)`, fully transparent. This is exactly what "believe the observation, verify the
  mechanism" exists to catch, and assuming foundations was enough is what skipped it.
  (2) **No webfonts.** The approved landing loads Shippori Mincho / IBM Plex Mono / Caveat /
  M PLUS Rounded; the aggregate loaded none, so it rendered in system faces.
  (3) **No scene.** The whole site is scene-first and the approved landing carries the three.js
  bundle plus a `.scene-space` block. The aggregate had neither. Now loads
  `three-background-minimal.min.js` - the bundle `_layouts/post.html` actually serves - with a 40vh
  scene-space rather than the landing's 85vh, because a post page gets no water or dock.
  (4) **Abbreviated class names**, against CONVENTIONS' zero-abbreviations rule: `.pa`, `.pa__lab`,
  `.pa__row`. Now `.post-page`, `.post-page__label`, `.post-page__meta-row`.
  (5) **Magic numbers inline.** The grid spans, sticky offset and section rhythm are now named
  custom properties on `.post-page`, per the dials-vs-invariants rule.
  PROVENANCE, which was the actual gap: the page had NO ledger row at all. Three added to
  `element-tracker.md` - the post LAYOUT/spine as **Remixed/theirs** from stripe.dev with the
  measured numbers and the reasons it is not True (commercial Söhne substituted, sticky offset
  raised 60->84px for our taller bar, measure narrowed); the STICKY RAIL as Remixed/theirs, flagged
  as hand-built and owing a real bench component; and the 68ch reading measure honestly tiered
  **Slop/mine**, because stripe runs ~78ch and the narrowing is ours with no reference behind it.
  The TOC row was updated to note stripe's rail is now the likelier parent than brittanychiang,
  since the TOC should live IN the picked rail rather than beside it.
  Verified after: tokens resolve, top-bar paints `rgba(7,12,35,.4)`, h1 renders in Shippori Mincho,
  rail still exactly 6 columns and article 12, rail pins at 84px through a 1148px scroll, all 10
  placeholders labelled and painting, and no `.ph`/`.phead` collision (the ledger's own warning).

- **2026-08-16 (POST AGGREGATE STRIPPED BACK TO WHAT IS ACTUALLY SOURCED).** ROD: "it's pretty
  sloppy, please replace all non-providence elements, or elements just taken from the main site
  which is being reworked, with the blockout elements." Done, and the count that justified it:
  by the ledger's own tiers the page was **2 of 16 elements sourced, 12%** - a sourced stripe
  skeleton stuffed with unsourced filler.
  THE MISTAKE WORTH NAMING: CLAUDE treated "a file exists in `extracted/components/`" as
  provenance. It is not. The 2026-06-09 TRUST RESET put every element back to Slop until re-proven
  from a real source, and the callout family, code block and cards were never re-proven. Importing
  them and calling them "6 real components" manufactured the APPEARANCE of provenance. That is
  what read as slop, and it was a labelling failure rather than a taste failure.
  Now BUILT, and only these: the post layout/spine (Remixed, stripe.dev), the sticky rail STRUCTURE
  (Remixed, stripe.dev), and the top nav links (Remixed, `sources/hana-nav.md`). Everything else -
  18 slots including the favicon and wordmark, which are Slop in the chrome section - is a greybox
  block that names what it needs rather than what it is missing, so the page doubles as the
  sourcing worklist. Verified: zero unsourced bench components remain in the DOM.
  ALSO FIXED, a regression CLAUDE introduced in the previous rewrite and ROD caught: the top bar
  had been left `position:static`, so it scrolled away while the rail stayed pinned - "the top bar
  doesn't scroll with the toc/metadata". The bar is sticky again and the rail's offset is now
  DERIVED from the bar's real height (`--top-bar-height` + 12px) instead of a guessed 84px, so the
  two travel together by construction. Verified: bar pinned at 0, rail at 106, 12px gap held.
  ROD's standing assessment for the record: the blockouts are good and the landing aggregate is
  fine; this pass was not. The road ahead is filling the workbench with SOURCED components, not
  building more pages.

- **2026-08-16 (CIRCULAR PROVENANCE FOUND ACROSS THE WHOLE BENCH - 12 COMPONENTS).** ROD caught
  CLAUDE citing "hana" and "harumaki" as the parents of the TL;DR and blockquote callouts: *"you are
  confidently lying because these are not anywhere to be found on hana, unless you mean our AI
  generated hana copy."* He was right. Those components' CSS headers say
  `PROVENANCE: rework-hana.html .tldr` and `rework-harumaki.html .prose blockquote` - and
  `rework-*.html` are OUR OWN BUILDS, named after the sites that inspired them. The ledger itself
  calls the rework pages "source candidates", i.e. things that FEED provenance. Citing one as a
  parent is circular, and repeating it to ROD as a real site was a false claim.
  Grepping the bench for the same pattern found it is not two components but **TWELVE**:
  button-kit, card-tests, code-block, draw-in-icons, hero, list-controls, post-header,
  project-cards-expensive, quote-block, reel-band, site-footer, tldr-callout. Every one cites an
  in-repo `rework-*.html` or `ref-*.html` under a "PROVENANCE" heading. **None of them has external
  provenance.** This is the mechanism behind the 2026-06-09 trust reset that nobody had named: the
  citations look real, so the reset never got undone, because undoing it would have required
  noticing the chain never left the building.
  FIXED at the source rather than in prose: a CIRCULAR CITATION warning block is now prepended to
  all twelve CSS files, so the next agent reading the header cannot repeat the mistake. It states
  the component is Slop until a real live site is found and its CSS read from source, and it
  records ROD's exact words.
  NEW STANDING RULE (ROD): **"ONLY components on the workbench are actually made by us."** The bench
  and every `rework-*.html` are source CANDIDATES, never sources. A provenance comment is a CLAIM,
  not evidence - check what it points at; if it points inside this repo, there is no source.
  Also corrected: `text-decisions.html` and `text-decisions.html` both stated the false parents
  and now say plainly "we made these", with the stamp takeaway marked as the one legitimately
  attributable callout because it is ROD's own CSS.

- **2026-08-18 (THE CALLOUT DROUGHT IS OVER - 8 SITES SOURCED, AND THE BEST RESULT IS A NEGATIVE
  ONE).** The standing job from the last session was "source two to three more callout recipes".
  Eight live technical-writing sites were fetched with `curl` (not WebFetch, which summarises and
  would destroy the verbatim CSS) and every claimed declaration was independently re-grepped
  against the downloaded file by a second agent before it was allowed into the record. ROD's
  instruction shaped the list: prefer sites already in the gallery, especially stripe.dev.
  Records: `redesign-lab/sources/*-prose.md`, 77 confirmed components, 9 claims rejected.
  **stripe.dev - the post reference ROD picked - has NO callout system at all.** An exhaustive grep
  of all four of its stylesheets for callout|admonition|notice|warning|tip|alert|sidenote|footnote|
  pullquote|tldr returned exactly one hit, and it is a 90s-theme decoration. Its blockquote is a
  plain `<p><em>` with no CSS behind it. That is now variant G in the blockout rather than a gap:
  "have no callout" is a real, defensible answer, and it comes from the page ROD named.
  Four genuine recipes did land. **Maxime Heckel** carries two, and both work by ESCAPING the box -
  an icon disc at `top:-20px;right:-20px` with a 6px ring painted in the PAGE colour that knocks
  the ground back in, and the same trick as a word tab straddling the top edge. Border and fill are
  the same token, so the panel itself is an almost-borderless wash and severity is one custom
  property. **catlikecoding** answers differently: a bare `<aside>` that is a DISCLOSURE - the
  question is an `h3` at the same size as the box body (it does not shout), `cursor:pointer`, the
  answer `display:none` until JS adds `.expanded`, and `@media print` force-expands everything so
  the collapse degrades to a readable document. **MinionsArt** refuses to draw an edge at all: one
  tinted block separating by fill alone, and a darker panel with a downward shadow so it reads as
  sitting below the page. All three are now greybox variants in `text-decisions.html`, whose
  callout section is split into ROLE 1 note / ROLE 2 pull quote / ROLE 3 TL;DR - which is the shape
  of ROD's open decision (three objects, or one object in three roles). 33 variants, verified zero
  non-grey colours.
  Worth recording because it is a pattern, not a coincidence: of the four sourced pull-quote and
  TL;DR treatments, NONE uses a left bar, a quote glyph, or a background. Maxime's quote is a width
  break (it escapes the measure); catlikecoding's TL;DR is a bullet-less italic list in the post
  header with no box. The convention we were about to copy is not what the sites we admire do.

- **2026-08-18 (STRIPE.DEV ADDED TO THE GALLERY - S TIER, ROD).** *"despite being made by a
  corporation its design is S and feels human crafted."* It had never been in the gallery despite
  being the core inspiration for the post section. Three cards added (site, post template, post
  index), captured fresh at the exact URL ROD named - the previous `stripe-dev-post` capture on
  disk was of a DIFFERENT article on the same template. What makes it read as hand-made is
  specific and copyable: bracketed mono nav tokens (`[B] BLOG`), slash-prefixed mono smallcaps zone
  labels over hairlines (`/ FEATURED POST`), `+` crosshair registration marks sitting at grid
  intersections so the construction lines are part of the artwork, line-art diagrams in framed
  windows captioned `[ FIG. 1 ]`, and a pale multi-hue gradient wash instead of white. One narrow
  type weight band throughout - the 48px headings are LIGHTER than the body.

- **2026-08-18 (LAB INDEX REBUILT - IT LINKED NOTHING WE HAD BUILT).** ROD: the lab page does not
  link to any of the blockouts. It did not: six sub-page blockouts, the component blockout, the
  post aggregate, the palette explorer and the anime-glow scene were all unreachable from it, while
  it advertised "16 sites" in a gallery that has 72 cards. Rebuilt and reordered by what needs
  ROD's eye first (JUDGE HERE at the top), with a RECREATIONS section that now carries the circular
  citation warning inline, so nobody clicks `rework-harumaki.html` thinking it is a source.
  RETIRED, not deleted, to `redesign-lab/archive/2026-08-18-retired/`: `picker.html` (picks made),
  `aggregate.html` (superseded by new-landing), `assembly.html` (superseded by a3-assembly),
  `layout-blockouts.html` (superseded by landing-blockout). Every link on the new index verified
  200 before shipping.

- **2026-08-18 (FAVICON: THE ROTATION PERSISTS, THE POSITION DOES NOT - ROD).** The previous pass
  read the request backwards and made the MAGNET hold its offset. ROD: *"the icon should be
  magnetic but should return to the center position like all other magnetic elements. Then the
  rotation after hovering off the rotation value should stay."* The `data-magnet-hold` opt-in and
  its `holdsPosition` branch are deleted from the drift-magnet engine entirely - every magnet
  springs back again, no exceptions. The rotation is held with no JS at all: the spin animation is
  now ALWAYS attached and `animation-play-state: paused`, with hover only setting it running. A
  paused animation holds its computed transform, so the mark keeps the angle it reached and the
  next hover carries on from there. Verified over CDP: after a real hover and un-hover the mark
  sits at a frozen 73 degrees and the magnet transform is back to `none`.

- **2026-08-18 (TOP BAR SCALING LADDER - THE MARK CAN NO LONGER DISAGREE WITH THE BAR).** ROD, with
  a screenshot: *"scaling causes these boxes to spill over causing the favicon box and the top bar
  not to match."* Reproduced exactly at 910px - the toggles wrapped THREE rows deep, the bar grew
  to 147px, and the 96px mark sat marooned at y26-122 inside it. Two defects, one visible symptom:
  the toggles were allowed to wrap, and the mark was pinned to a constant while the bar was not.
  The fix is a rule rather than a patch: **`--top-bar-height` is DERIVED from the row heights plus
  the block padding at every tier**, so a square of that height matches the bar by construction no
  matter how the zones stack. Rows are fixed, never auto - an auto row that grows when content
  wraps is precisely the bug. The 100px column gap (the widest thing in the bar) now closes at 0.4x
  the rate the viewport narrows, holding one row down to ~1200px; below that the nav drops to a
  second row and the block padding halves so the second row costs 12px instead of 34. Below 560px
  the mark stops being full-bleed and goes inset, because a square the height of a three-row bar is
  124px and the toggles need 356 of the 358px left on a 390px screen - stated as a deliberate
  mobile design rather than left as a silent mismatch. Measured at 1440 / 1250 / 1210 / 910 / 700 /
  390: bar and mark identical at every one above 560, no wrap, no squeezed labels, no overflow, and
  1440 unchanged from the layout ROD approved.

## 2026-08-22 - SCENE PASS: PAPER FILTER BUYS THE RESOLUTION DROP (ROD)

The three.js scene stopped being tuned and got restructured. Six things landed and all are live.

**Bloom.** The 2-level Dual Kawase that D23 chose on 2026-08-18 had only ever run in the tuner -
`three-shared.js` still imported `UnrealBloomPass` and the lab hot-swapped over the top of it. It is
in the bundle now at `shader/kawaseBloom.js`, fixed at two levels, with the bright pass and the
`threshold` knob deleted rather than skipped and every kernel weight named as a GLSL const. D23's
own pass count was wrong and is corrected: five renders over four targets, not four and two.

**Lighting.** The finding that outlived D23 - the scene has zero lights and bloom was standing in
for a rig - got its first real answer. Sky `0x080f1b -> 0x162237`, bloom strength 0.45 -> 0.7,
radius 0 -> 0.15, and `uSunLift` 0.2 -> 1.5 so the water's dormant moonlight model finally carries
load. Tone mapping was considered and rejected for the same reason as before: exposure multiplies,
and near-black times anything is still near-black.

**Paper (D24).** ROD asked whether a paper texture would let the resolutions halve, and it did:
*"the artifacts ... get completely masked and makes it look intentional with the paper grain."* Two
baked sheets composited INSIDE the bloom pass - no new pass, no new target. Behind it, pixel ratio
1 -> 0.5, bloom scale 0.5 -> 0.25, reflection 0.5 -> 0.25. The sheets are baked because the source
Shadertoy evaluated a 4-octave fbm ~24 times per pixel, which software rasterisation cannot pay for.
REJECTED along the way, twice, from an external review: 8-bit bloom buffers (the linear sky is steps
2/4/10 of 255, so it would band) and a 1/8-resolution blur (backwards for a bloom with no threshold).

**Fireworks.** The explosion vertex shader was recomputing a constant - a hash plus `acos`, two
`sin`, two `cos` and a `cbrt`, every frame, once per trail copy, 200,000 times a frame at the cap.
Baked to the position attribute on the CPU. A shared-geometry variant was built and REJECTED by ROD
on look (rainbow shells lost their colour variety). The rocket trail was deleted outright - ROD:
*"they cannot be seen anyways"*. Particle trails stay at 10; ROD: *"the particle trails are
important."* Investigated and NOT acted on: there is no shell pool and building one is not worth it,
because allocation is only 0.015 ms of the 0.207 ms spawn cost.

**Scenes 3 -> 2.** `three-background-general.js` retired; `minimal` now serves everything except
About. ROD: *"remove general and just replace it with minimal for now that makes sense."* 101 dead
lines went with it. Two consequences worth carrying: portal, landing and projects have **no
fireworks at all** now, so the topbar toggle was narrowed to `section-about` rather than left inert;
and this needed `_layouts/` and `_includes/`, which D22 closes - ROD authorised it for this change
only and the exception is recorded in D22 itself.

**Three traps found**, all now in TRAPS.md: the composer caches its pixel ratio so lowering dpr made
post-processing *slower* (every dpr reading before today was inverted), a backgrounded tab throttles
`setInterval` so timed load tests silently under-deliver, and `sizeAttenuation` meant firework fill
was never the cost despite a scary-looking `particleSize: 20`.

**WHAT IS NOT DONE, stated plainly because it is easy to lose:** the paper filter is live on every
page including posts without a provenance row, the boil runs 3.25/sec behind body text with no
`prefers-reduced-motion` path despite D21 asking for one, and **nothing has been re-profiled** - the
entire performance case for this batch rests on a measurement of a pass that no longer exists.

- **2026-08-22 (THE LANDING BUILT OUT, AND A RULE ABOUT WHO MOVES THE LAYOUT).** ROD drove a long
  session that filled `final-landing.html` to 8 of 11 slots and produced one standing rule worth
  more than the pixels: **D25, only Rod asks for layout changes, and every change must be checked
  for whether it moved one.** It came out of a request for a text backing and one for heading colour
  turning into a page-width change, a restructured backing, a new rhythm and an added element - none
  of it asked for. Applied retroactively the same day: four unrequested changes were put to him, he
  kept one and rejected three, all reverted and verified against a before/after snapshot.
  Its corollary caught a real bug - lab chrome must never move the design, and the `RAW` badge's
  `border` was holding the rail's metadata rows to 275px in a 277px column.

  **Built:** section-head (picked from four candidates, all of which were ours - filed origin ROD,
  not provenance), skills-row (simpleicons.org CC0 marks stroked in deep gold and drawing in via
  `pathLength="1"`), footer-line (the lab `.labtag` treatment promoted to a real element, and it
  SUPERSEDES the circular-citation `site-footer` rather than fixing it), and a chaining demo-reel
  placeholder.

  **Corrected, all mine and all caught by ROD:** the top bar was stacking for the toggles D20
  removed, growing 12px and shoving content down at every narrow width - all three tiers of its
  ladder were laid out around a zone that no longer existed. The post page's spine, measure and
  heading weights were wrong against the blockout and stripe both; headings were weight 500 where
  stripe is 300, which inverted the one device the reference is built on. And the "gradient map" on
  the paper was not a gradient map - it laid a spatial gradient over the texture, colouring by
  POSITION rather than by VALUE. ROD: "the colors should pretty much be the A and B inputs of a lerp
  and the texture should be T." Rebuilt with `feComponentTransfer`, where a two-entry `tableValues`
  per channel IS that lerp.

  **Measured, not argued:** brand logos fail on this ground - devicon Unity 2.29:1, Blender 2.55:1,
  Unreal Engine's own `#0E1128` **1.04:1, invisible**. That killed the full-colour icon set on
  numbers rather than taste. Separately, harumakigohan.com's section headers were read from the live
  site: drawn PNGs, 124 images and ZERO html headings on the page, which is D10 in one artefact.

  **REJECTED:** re-drawing "cartoony" icons the way the old set was made. That set was AI-drawn
  approximation - `draw-in-icons.css` admits it - and its charm was a failure mode. The honest route
  to the same look is a procedural wobble over real geometry (`icon-wobble-tests.html`); ROD looked
  and said "not worth it", so it stays unbuilt but recorded.

  **Still open:** C#, HLSL and Compute have no official marks and are absent rather than faked; the
  paper numbers; and the motion control, which does not exist anywhere on the final pages.

- **2026-08-22 (PAPER OUT, TAPE IN - COLOUR GETS CONCENTRATED).** ROD, after looking at the paper
  tuner: *"i dont think paper is the play... we just do normal transparent cards in grey with no
  texture, the background already adds some texture, and we will have the fun striped washi tape in
  the blue, green, pink, and orange for different sections."* Recorded as **D27**.

  The reasoning that makes it more than a reversal: the scene ALREADY carries grain through its own
  paper filter (D24), so texture on the card was competing with the background rather than adding
  to it. Taking it off the cards and putting colour into one small object means the design does not
  become more colourful, it becomes colourful **in exactly one place**.

  **It overturns T0-A** ("warm + 1 cool", 2026-06-12 - one cool accent, spent rarely, never
  blanket-applied). Written up as an overturn rather than slipped in, with the reconciliation
  attached, because T0-A will otherwise be quoted back at it.

  Three of the four tape colours already existed; **pink `#f078f0` is measured off harumaki's own
  section-header PNGs**, so it is sourced rather than picked. **Green `#6fbf73` is the one guess**
  and is flagged as such in the component header rather than left to be discovered.

  A real bug went with it: the tape's stripes rendered GREY no matter what colour the section
  carried, because `.tape` declared `--tape-hue` on itself and shadowed the value inheriting from
  the host. Neutrals are `var()` fallbacks now, not declarations. Caught by reading the computed
  gradient rather than trusting that it looked plausible.

  **PARKED, not deleted:** the paper work never reached a shipped surface, so nothing needed
  unwinding. `paper-tests.html`, `paper-tuner.html`, the extracted height maps and three verbatim
  sources all survive, along with the finding that the sheet generator is not in the repo - so
  washi / cold press / wove is the whole palette of paper that will ever be available without
  rebuilding it.
