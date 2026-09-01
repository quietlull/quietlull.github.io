# REDESIGN HANDOFF - current state 2026-08-24

Read this, then `docs/STATUS.md`. The port roadmap is at the top of `docs/MERGE-WORKLIST.md`.
Open work is the OPEN table in `docs/REQUESTS.md` and nothing else; done rows are phantoms.

**Every number below was measured on 2026-08-24, not estimated.** This file is compiled to be
currently true rather than appended to. If it disagrees with the code, the code wins and this file
is the thing to fix.

---

## THE JOB, in one sentence

**Finish the redesign inside `redesign-lab/` until it is complete enough to replace the entire main
site in one port.** Not incrementally, not by improving the live site. One lab, then one port.

## START HERE: ABOUT IS THE ONLY PAGE STILL NEEDING CONSTRUCTION

Rod, 2026-08-24: *"after all these changes about me is the main thing that needs to be fixed."*

Five of the six final pages are BUILT and waiting on his judgement rather than on work. About is
1 of 26 approved with **24 greybox marks** and only 5 component stylesheets loaded.

**A full assembly spec already exists and is unused.** Its shape:
- collapse the TWO parallel slot sets onto the **3b** variant (`?v=spacious`, klubnika SPACIOUS).
  The page reads as 26 slots because portrait, bio_intro, bio_more, status terminal and locked/empty
  each appear twice.
- the portrait uses the favicon as a **marked** placeholder (`data-placeholder="true"` - the
  component already anticipates exactly this and ships the rule with no markup).
- the backing wraps **portrait + bio with the section head bare** - Rod's pick: *"portrait counts
  not the heading for now"*.
- the "full scene at the bottom" card goes, **keeping its spacing**.
- the achievement tiles reuse the project card's border glow, which **inherits that card's
  provenance debt** - say so rather than presenting the reuse as clean.
- **the trophy WALL stays unbuilt.** No source, and Rod has said it needs a design conversation
  first. Its tile is picked (V6) but the tile's box is 88x31 against 3b's 64x64 slot, so it is not
  a drop-in either.

The real copy is already on the page, verbatim from `tech-art/about.md`. **Two live About pages
exist with two different bios** (`tech-art/about.md` and `game-design/about.md`); the final page
carries tech-art's. Which one ships is Rod's content call.

## ROD TUNES HIS OWN NUMBERS NOW

Three tuners, one idiom. Each drives the REAL page through a same-origin iframe (never a copy - a
second copy is the wrong-copy hazard this repo keeps hitting), keeps its panel in the PARENT
document so it cannot contribute layout, and emits paste-ready CSS naming the file and line.

| tuner | tunes | the tripwire it carries |
|---|---|---|
| `hero-ratios.html` | the landing hero | its vertical sliders were FROZEN - the line boil pins each glyph in px at load and only re-measures on resize, and in a vertical writing mode that pin IS the vertical length |
| `rail-ratios.html` | the post rail | the prose measure - rail plus gap over 8 columns silently drops it 767 to 759 |
| `rambling-ratios.html` | the ramblings rows | the gap under the search field, which is not independent: it, the panel's top bleed and the list's hairline resolve to ONE clearance number, and that number was -7px with the panel on top of the field |

**Before trusting any export, check the tuner's defaults against its page.** One drifted (the hero's
trench, `.684` against the landing's corrected `.428`) and the export carried it straight back in.

**And read his paste before applying it.** One tune took the thumbnail to 335px wide and left the
space reserved for it at 270, which would have run the text 65px under the picture. The dial exists;
he moved one and not the other.

## THE RULE THAT OVERRIDES EVERYTHING ELSE (D22)

Rod: *"i want to make it clear we are only working on the new design lab stuff, zero main page stuff
at this point."*

**`_sass/`, `_layouts/`, `_includes/`, `_javascript/`, `_config.yml` and the root page files are OFF
LIMITS.** All work happens in `redesign-lab/`.

The consequence that is easy to get wrong: when Rod says a subsystem "won't exist any more", that
means **absent from the new design**, not "delete it from the live code". He said exactly that about
breathing, which is live in 18 SCSS files with 221 references. Deleting those now would be the
main-site work he forbade. It dies when the port replaces `_sass/`.

Repo hygiene that touches no rendered surface (git, `docs/`, dependency merges) is still allowed.
If a lab page needs something from the live site, **copy it into the lab**; never edit the original.

---

## WHERE THINGS ACTUALLY ARE

### The six `final-*` pages: 25 of 102 slots approved

| page | slots | approved | greybox | state |
|---|---|---|---|---|
| `final-portal` | 9 | **8** | 0 | Approved. The centre mark is built (line boil); sideways drift and a placeholder welcome line landed 2026-08-24 |
| `final-landing` | 12 | **9** | 1 | Built out, carrying Rod's own hero tune. Pending: top bar, view all button, project cards |
| `final-post` | 19 | **4** | 0 | Fully built, carrying Rod's own rail tune |
| `final-projects` | 24 | **2** | **0** | Rebuilt from the LIVE page. Cards, search field and filter pills all real |
| `final-ramblings` | 12 | **1** | 0 | Real post data, real search, Rod's own tune |
| `final-about` | **4** | 0 | 2 | **Still the 3-variant comparison page**, not split out. Its count is NOT comparable - see below |

**"Approved" is a much lower number than "built".** Five of the six are finished work waiting on
Rod's eye; only About is waiting on work. Do not read the low counts as unfinished pages.

**AND ABOUT'S OWN COUNT MEANT SOMETHING DIFFERENT AGAIN, which this table got wrong until
2026-08-24.** `final-about.html` still carries all three candidate layouts in the DOM at once -
`.col--panels` (13 slots), `.col--spacious` (4) and `.col--strip` (8) - switched by `#vbar` and a
`?v=` script that adds the body class at runtime. The page's `#state` panel counts **every**
`[data-slot]` in the document, so it reported "1 of 26 approved, 24 greybox" by tallying the two
variants Rod rejected alongside the one he picked. **The picked 3b variant has 4 slots, two of which
already hold his real bio copy.** After the collapse the panel reads **1 of 5**.

**The collapse has one trap and it is not obvious.** Roughly 40 rules in the page's inline style are
scoped `body.spacious`, and so are `decisions.css:762` and `:766`. Deleting the switcher without
putting `class="spacious"` statically on `<body>` drops both bio headings from gold 20px/16.8px to
silver 15px (they fall through to the h4 rung, because `.bio-h` at (0,1,0) outranks bare `h2`) and
blows the column from 928px to 1409px. Keep the class or rewrite all 40 rules plus decisions.css
together - there is no third option.

### The bench: 58 components, 25 in use, 33 on no page

`extracted/components/` holds 58. Twenty-five are loaded by at least one final page. **Thirty-three
are on no final page at all** - some are losing variants from the "3 versions each" review batches,
some were built ahead of the slot that wants them, and a few were superseded outright.

**CONSOLIDATED 2026-08-25.** The eighteen components that used to be standalone demo PAGES are now fragments in the one gallery: `extracted/index.html?c=<id>`, **51 registered entries**. Their prose, sources, variant reasoning and live measurements came across intact; page chrome is scoped to a `.cb-<id>` wrapper and each page's script became `<id>.js` exporting `init(root)`. Two bench affordances came with them: a `wide` flag on an entry lifts the 760px stage cap, and `deps` may now name a stylesheet path (`/redesign-lab/decisions.css`) as well as a component id. **One caveat that matters for judging: the bench stage is not 1440.** Reservations measured at viewport 1440 still draw at true size, but a readout that compares against the viewport reads the stage, not the page it was written on.

Being on the bench is not the same as being wanted. Check `component-review.html` for the pick
before assuming an unused component is a gap.

### Provenance, which is the actual shipping gate

`element-tracker.md` carries **93 tiered rows: 12 True, 30 Remixed, 46 Slop.** Slop is not
shippable by the ledger's own rule.

**Twenty components carry the word "circular" in their own files, and seven of those are loaded by a
final page**: `button-kit`, `drift-magnet`, `empty-state`, `footer-line`, `list-controls`,
`project-cards-expensive`, `search-bar`. Treat that seven as an upper bound rather than a verdict -
`button-kit`'s mention is Rod's own correction narrowing the problem to its shapes line only, so the
word appearing in a file does not by itself condemn the component. Read what each one points at.

Two that are not ambiguous:
- **`list-controls` declares itself circular-citation Slop in its own header** and is the search
  field on both projects and ramblings. It blocks both regardless of anyone's preference.
- **`project-cards-expensive` self-flags as having NO EXTERNAL PROVENANCE**, and its one citation
  points at `rework-merodev-yanne.html`, a file in this repo. Anything that reuses its glow inherits
  that debt.

---

## THE PIPELINE, and the two rules that keep getting broken

```
 references -> layout blockout -> component sourcing -> component blockout
                                                              |
      aggregate  <-  bench tune  <-  component BUILD  <--------+
```

Each arrow is a **hard dependency AND a human-approval gate**. Full text in
`docs/PAGE-PROCESS.md`, which is the single most important doc in the repo right now.

**Rule 1 - THE BLOCKOUT IS A CONTRACT.** An aggregate may contain ONLY the elements its approved
blockout contains. Fewer is fine (a slot stays a placeholder). **More is not**, not one chip, not
one link, not one toggle, not a footer. Anything extra is a PROPOSAL and goes back to the blockout.

Rod, after a whole page was rejected: *"whats the point of making a great blockout if we just
randomly slap things together later on?"* There is no point. That is the whole answer.

**Rule 2 - PROVENANCE IS A LIVE EXTERNAL SOURCE.** Not a comment saying "PROVENANCE". Copying from
`a3-assembly.html` or any `rework-*.html` is inventing with extra steps, and it is *worse* than
inventing because it arrives looking sourced.

The specific trap: being asked to "complete a stub" authorises completing it, NOT deciding what
completes it. Six elements went onto the landing this way in one day and every one was rejected.

**And the one about where sources come from.** The gallery and the workbench are not the same kind
of thing:
- **`reference-gallery.html` (87 sites) IS provenance.** Rod tiered those himself. Read the site's
  own CSS, save it verbatim to `sources/`, then build.
- **The workbench is NOT.** It is our code. It can supply a BUILT COMPONENT to fill a slot, but it
  can never supply a CITATION. Where a bench component is reused, the ledger row keeps that
  component's original source; it does not gain one by being reused.

---

## THE FAULT THAT KEEPS RECURRING, and Rod's standing fix

**A page restating something the ladder or a component already owns.** Every lab stylesheet is in
cascade layers (`@layer reset, tokens, prose, components, overrides`, D36), and **unlayered CSS
beats every layer**, so a page's own inline `<style>` outranks both the ladder and every component
it loads. It then wins silently and renders the old value with no error.

Six separate bugs in one session were this exact shape. Rod named the rule:

> *"When something conflicts simply add them to the ladder ... we shouldnt be making 100 exceptions
> just a few simple rules."*

**Delete the page's copy. Do not add an exception.** Known live instance: `final-post.html:254` and
`:503` both restate the H1 size, so any change to the ladder's H1 will silently not reach the post
until those two are deleted.

The sibling fault: **a partially restated shorthand reads as ownership and is not.** The projects
page sat 76px off centre because its inline `.wrap` restated `padding` but not `width`, leaving
`foundations.css`'s `--measure` in force underneath.

And the one that costs the most time: **a CSS name that resolves to a FALLBACK renders wrong without
erroring.** `--color-pink` was defined in no stylesheet and rendered its hard-coded fallback for
weeks. Grep the definition; do not trust the name.

---

## WHAT IS ACTUALLY LEFT, in dependency order

1. **About.** The only surface still needing real construction. Rod has asked for a real final page
   built off the **3b variant** (`?v=spacious`, klubnika SPACIOUS, landing rhythm (`padding-block:30px 60px`)), collapsing the two
   parallel slot sets into one. The trophy WALL stays unbuilt: its tile is picked (V6) but the wall
   has no source and Rod has said it needs a design conversation first.
2. **The provenance debt.** The seven circular-cited components that are on final pages, and
   `list-controls` above all, since it blocks two pages outright. This is the sourcing pass and it
   is the thing standing between a finished-looking lab and a portable one.
3. **Rod's judgement on the built pages.** Post and ramblings are fully built with almost nothing
   approved. That is a review queue, not a build queue.
4. **The token bridge** (MERGE-WORKLIST gate 2). 39 lab tokens against 270 live, two names in
   common, no mapping file. Every lab stylesheet depends on it and nothing can port without it.

---

## DECISIONS THAT CONSTRAIN NEW WORK

Full records in `docs/DECISIONS.md`. The ones a new agent will trip over:

- **D22** lab only, zero main-site work.
- **D19** source ELEMENTS, not page layouts. Layout-sourcing only works when the LAYOUT is the idea;
  when the source's life is its content, transcribing geometry yields a shell that reads as
  AI-generated. **A greybox cannot catch this**, because greybox removes the thing carrying the source.
- **D16** type is settled: rounded gothic (M PLUS Rounded 1c) for body AND display. No serif.
- **D18** colour is decided LAST, after space. *"Colour hierarchy comes after space."*
- **D21** one control: scene + all motion, one switch. `prefers-reduced-motion` means still.
- **D20** code block = Maxime header strip, squared.
- **D8** greybox law: uniform monochrome, geometry only, NO colour, including lab tooling badges.
- **D25** only Rod asks for layout changes, and every change gets checked for whether it moved one.
  Lab chrome must never move the design.
- **D27 / D30** the washi tape is the site's one loud object; tape colour encodes callout TYPE
  (warning pink, note green, tldr orange, quote blue, reference no tape). **There is no
  section-colour scheme and there never was one built.**
- **D29** a comparison page is only honest if its candidates are genuinely substitutable. Also:
  **paper is dead**, the background carries the texture.
- **D31** the heading ladder, the colour ramp and the 23 text picks. **The ladder now applies BY
  ROLE**: bare `h1`-`h4`, not only inside `.prose`/`.d-h*`. Before that change the landing, projects,
  ramblings and portal picked up colour and weight but **no scale at all**, silently.
- **ONE WEIGHT PER LEVEL, SITE-WIDE: 300.** The only surviving `font-weight: 100` in `decisions.css`
  is `.prose th`, deliberately: a table header is not a heading level.
- **D36** cascade layers, and the rule above about unlayered CSS.
- **D37** the line boil: sequential order, per-glyph phase with a random starting face, 6/sec.
- **D39** behaviours are single-purpose and stackable. Magnetic, drift and glow should be mixable
  rather than fused into one component.
- **2026-08-13** painted dividers (seam band, cloud partition, curtain rails) REJECTED. Sections are
  separated by SPACE and by the scene showing through.

---

## KEPT AS RECORD - the callout reasoning

**Do not act on this as an open brief. It is closed (D30). The reasoning is the useful part.**

Every one of the 19 real posts was parsed. What Rod's writing actually contains: `takeaway:` in
front matter in **14 of 19 posts**, 46 images, 52 links, 12 code fences, 10 videos, 11 lists, and
**zero blockquotes, zero admonitions, zero raw `<div>`s**.

**His content used exactly ONE callout: the takeaway.** Everything else was answering a question his
writing had not asked. Rod reached the same conclusion himself before the count was shown to him,
then **created the five categories deliberately**, knowing none were in use: *"lets create the
callout categories im sure we can find places to use them."*

Two lessons that outlived the decision:
1. **Check whether a decision was ever IMPLEMENTED before describing a change to it as an overturn.**
   D30 was first written up as overturning D27's colour half. Rod pushed back, it was checked, and he
   was right: no page ever assigned a per-section tape colour and no such token exists. D27's *"for
   different sections"* was an intention that was never built.
2. **A set of options is only a decision if the options are substitutable.** The seven callouts were
   never seven alternatives: one was a layout device, three were placements of a settled convention,
   and the rest were a question Rod had already answered.

**The margin note is DROPPED** (one candidate instance in 19 posts, and it cost a permanently
asymmetric article). Two things settle by it not happening: the prose column stays centred, and the
TOC keeps its gutter.

**The takeaway keeps the stamp** - Rod's own CSS, and the one callout with a legitimate attribution.

---

## KEPT AS RECORD - three component pages with open cases

- **`washi-tape-tests.html`** - Case D picked and built. Cases **E** (transparent third band in the
  fill) and **G** (the tape's own 5.42 degree rotation) are STILL OPEN and were deliberately not
  bundled into the D build; each is its own pick. The page stays up as the record of the comparison.
  Note the rotation was found to be **10x too big** and corrected to gneiss's real `-0.05deg`, which
  means the tape effectively **stops looking tilted**. Visible tilt would be OURS and needs labelling.
- **`section-break-tests.html`** - six sourced treatments at the real 767px measure. **Three have no
  box at all, on purpose**; without them every option is a card and the page proves the ask rather
  than testing it.
- **`card-greys-tests.html`** - deliberately not committed. One line in `settings.css` repaints every
  card on every page, and "similar to the blockout" is not a value.

---

## THE DECISION SURFACES

- **`text-decisions.html`** - the single decision surface for everything that displays text. 7 tabs,
  25 sections, ~77 sourced variants, 23 picks settled. It replaced and DELETED four pages
  (`prose-blockout`, `component-blockout`, `callout-tests`, `orb-callout-tests`). **Do not build a
  fifth comparison page.** Rod: *"Rather than making alot of comparison pages just add things to the
  component block out."*
- **`decisions.css`** - those picks as real CSS, imported by all six `final-*` pages. One definition,
  six consumers. Every block carries the citation that decided it; a rule with no citation is a bug.
- **`component-review.html`** - the built variants with Rod's picks badged. Its fourteen outbound links now open in the bench. **It did not retire with the demo pages** and should not: it is the only home of the measured-fit verdicts, the pick badges and the inline demos of `related-card-real`, `heading-anchor-real`, `toc-real` and `table-real`, none of which are in the registry yet.
- **`analysis/2026-08-23-blockout-contract.md`** - every reservation MEASURED off the rendered
  blockouts at 1440. **The post content column is 767 (94ch), NOT the blockout's 711** - Rod settled
  it. That file is the correction layer over the stale blockout.
- **`original-css/`** plus `layer-diff.html` - a frozen copy of every pre-layer-refactor stylesheet,
  renderable against the current one. The refactor reverses by copying that directory back.

---

## HOW ROD WORKS - honour these or the work gets rejected

- **He is the eyes.** Never verify a visual by screenshot. Make the change, link the
  `localhost:4000` preview URL, ask what he sees. **Always link the URL.**
- **Ask before any rendered-pixel change.** Preview-first.
- **Every task he gives gets a logged row AND an agent.** Not just the big ones. Handling something
  inline because it looks quick is how things get forgotten and how he ends up repeating himself.
  Agents measure and report; they do not design and they do not apply pixels. See
  `docs/REQUESTS.md` and the `feedback-agent-queue-workflow` memory.
- **When context is missing, STOP AND ASK.** Batch questions if he is away. Every skipped stage
  began as a small gap filled in silently.
- **Flagging is not permission.** He reads the rendered page, not your file header comments.
- **Never ship a dead control.** A Technology/Personal switch shipped with zero JS behind it.
- **Queue every request** to `docs/REQUESTS.md` as it arrives, one row per REQUEST, not per message.
  His messages routinely carry four or five asks and that is exactly where they got lost.
- **Duplicate mistakes get re-logged** to the REPEAT-OFFENCE TALLY in `docs/PAGE-PROCESS.md`. It
  grows by repetition on his instruction. Do not tidy it.
- **No em dashes** in written content.
- **Never ScheduleWakeup.** Run until out of usage.

---

## TOOLING WORTH KNOWING

- `element-shot.mjs` pattern (scratchpad) - CDP screenshot of ONE element at a CSS selector, saved
  cropped. Different job from `web-preview`, which captures whole pages. Use document coords plus
  `captureBeyondViewport`, and kill the process TREE or Chrome children orphan.
- `web-preview` skill - first-screen and full-length page capture. Always verify captures.
- `vibe-site-research` skill - style-not-niche reference hunting.
- `hero-ratios.html` - the landing hero tuner, seven live sliders (size, column width, letter gap,
  trench, air, right inset, socials). Full bleed on purpose.
- `scene-tuner.html`, `perf-probe.js` - scene and performance. Profile with hardware acceleration
  OFF or you find nothing.
- Workflows for sourcing fan-out. Verifiers should be adversarial: recent hunts killed 7 of 21
  candidates on warmth and 9 on existence, and only 6 of 34 element finds survived. **That ratio is
  the point, not a problem.**
