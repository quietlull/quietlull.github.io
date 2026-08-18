# Page process

**How a surface goes from nothing to a locked layout.** This is the procedure ROD already set for
the landing page (his `/goal`, 2026-08-11) generalised to every other surface, written down so it
does not have to be re-explained per page. If you are about to build a blockout for post, projects,
about, ramblings, resume or portal, this note governs. Read it before you open an editor.

**Why it exists:** on 2026-08-16 CLAUDE built six sub-page "blockouts" in one sitting. They were
rejected on four counts at once - they were coloured rather than greybox, they were sourced from
one or two sites instead of four, they skipped the analysis entirely, and they were finished so
fast that the speed itself was the evidence no analysis had happened. Every one of those rules
already existed, in this folder or in memory. The failure was not knowing less; it was not looking.

---

## The two artifacts, never confused

| | BLOCKOUT | AGGREGATE |
|---|---|---|
| What | Greybox skeleton | The assembled page |
| Colour | **NONE.** One grey language | The set palette |
| Type | Boxes reserving real space | Real faces |
| Built from | Geometry only | Workbench components |
| Judges | LAYOUT alone | The whole thing |
| Example | `landing-blockout.html` | `new-landing.html`, `a3-assembly.html` |

Colour in a blockout smuggles taste into a layout decision. An earlier attempt died for exactly
this ("smuggled each site's colour into the greybox and broke comparability", CHANGELOG 2026-08-12),
and the 2026-08-16 batch died for it again.

**Stage check before you start: which artifact is this surface at?** As of 2026-08-16 the landing
is the only surface past blockout. Post, projects, about, ramblings, resume and portal all START at
BLOCKOUT stage.

**But the gate is component coverage, not ceremony (ROD, 2026-08-16).** If a surface is NOT missing
components - or you can build most of it from what the bench already has - go ahead and build the
AGGREGATE too, using a greybox **placeholder** for each missing layout component. This is D9's
placeholder rule applied at page level: the placeholder reuses the blockout's own greybox box and
reserves the real spacing, so the gap is visible and correctly sized rather than papered over.
Run the coverage check from step 1 question 2 first, so you know which slots are real components
and which are placeholders, and say which is which when you hand it over.

---

## The steps

### 1. ANALYSE - before any file is opened

Four questions, answered in writing, not from memory:

1. **What does ROD actually need on this page?** The content slots come from the frozen section
   spec, not from the reference site. The information FLOW is frozen: a variant may reshape a
   section, never delete one.
2. **What already exists?** The current `_layouts/` + `_includes/` that serve this page today, and
   which `redesign-lab/extracted/components/` already cover its slots. The build is ADAPT, not
   rebuild from scratch - flag components that will not survive the new direction.
3. **What do other sites do for this layout?** At least **FOUR real, currently-live sites per page
   type**, portal included. One or two is a guess wearing a citation, and it breaks the provenance
   law. Aim for five or six so weak ones can be dropped.
4. **How do we copy it?** Per site, the specific geometry to reproduce.

**Read the HTML and CSS from source, not the captures.** The recurring question is "is this device
CSS or is it artwork", and that is invisible in a screenshot. A capture tells you a site has a
divider; only the CSS tells you whether you can have one. Where the site is live, measure it with
`getComputedStyle` at 1440 - that is how stripe.dev's 24-column/58.375px spine and brittanychiang's
561px sticky column were both recovered exactly.

**Never report a number you did not read.** "Not found" is a valid answer; an invented number is
not. Mark every finding read-from-source / partial / inferred.

**Check that the reference IS the page type, not just that it is live.** This is a separate test
from "did I read its CSS", and skipping it produced false provenance on 2026-08-16: two of the four
portal references (potg.art, lyra.horse) turned out to be ordinary homepages that the research
narrated as "two-door choosers". Their CSS was genuinely read from source, so every confidence
field said read-from-source and was telling the truth - the classification had simply never been
tested. Ask of every reference: *does this site actually have to solve the problem this page type
solves?*

**A minimum-source quota can manufacture false provenance.** "At least four per page type" is the
right bar for common surfaces and a trap for rare ones. Portal had zero gallery coverage and a hard
quota, and quota pressure on a rare page type is what produced the stretched framings above. When a
page type genuinely has few references, the honest output is "there are only N real ones" - say so
and let ROD decide, rather than padding to the number.

**The generic section-profiler FLATTENS sites** (ROD, 2026-08-11) - harumaki and hana came out
identical through it. Ground the work in full-page and first-screen captures of the real site plus
its real CSS, never top-level section metrics.

### 2. BUILD THE BLOCKOUT - four variants minimum

- Four **genuinely different layout families**, not four tweaks of one idea.
- Every variant **transcribed from a named real site**. No free-handing. No source, no variant -
  ASK instead.
- Greybox only. Placeholders reuse the blockout's own greybox box and reserve real spacing.
- Carry a **provenance panel** naming each variant's source, its borrowed moves, and its honest
  caveats - including any AI tell it flirts with and whether a pillar backs it.
- Numbers, not adjectives. Container widths, column counts, gaps, section rhythm.

### 3. CLEAN-AGENT VERIFICATION

A **fresh** subagent, unbiased by the building session, verifies each variant against its
reference: numeric re-check (column %, hero vh, section rhythm) plus a side-by-side for ROD's eyes.
The builder cannot be the checker.

### 4. ROD JUDGES - he is the eyes

Give him the preview URL (`http://localhost:4000/...`) every single time. Never verify a visual by
screenshot and never report a look as confirmed. Changes he asks for become **new variants**, not
edits to the existing one, so the comparison survives.

*(A fifth step, an "impeccable scan", was DROPPED by ROD on 2026-08-11: "impeccable doesn't
actually do much here." Do not reintroduce it for layout work.)*

---

## Speed is a symptom

If a page type took minutes, the analysis did not happen. Four sites read from source, measured and
turned into four distinct sourced variants is hours of work per surface. Finishing fast is the
tell, not the achievement.

## Multi-agent rule

Parallel agents are for **EXTRACTION ONLY** - measuring sites, reading CSS, inventorying what
exists. Never for generating finished designs. That rule came from a real mishap and has not been
relaxed.

## When it is done

Run `/ship-check` when ROD finalises the surface, then `/sync-docs`. A locked layout gets a row in
`redesign-lab/element-tracker.md` at the moment it is locked, not later.

---

# THE FULL PIPELINE — landing blockout to aggregate, in order

Written 2026-08-16 so it can be replicated. This is what ACTUALLY happened on the landing page,
which is the one surface Rod has called good. The sub-page attempts failed by skipping the middle.

## The stages, and why each exists

### 0. Reference gathering
`redesign-lab/reference-gallery.html` - ~99 sites, captured, tiered S+ to F BY ROD, with his own
per-site notes and factor tags. It has a Sub-pages section grouped by page type. **This is the
first place to look, always.** It is Rod's own taste catalog, so a candidate from it already
carries his judgement; a candidate from a fresh search does not.

Captures use the `web-preview` skill, and the non-negotiable step is verifying a contact sheet BY
EYE before trusting any capture. An "empty background" page usually just had not loaded - that
mistake burned two whole attempts.

### 1. LAYOUT BLOCKOUT  ->  `<surface>-blockout.html`
Greybox. Uniform monochrome, one grey language, geometry only, NO colour (D8). Four variants
minimum, each TRANSCRIBED from a named live site read from its own CSS, at least four sites per
page type. A provenance panel names each variant's source, its borrowed moves, and its honest
caveats including any AI tell it flirts with.

Judged by ROD. His changes become NEW VARIANTS, never edits, so the comparison survives.

### 2. COMPONENT SOURCING  ->  `element-tracker.md` rows + `sources/*.md`
For every slot the chosen layout needs, find a REAL live source and save its CSS verbatim to
`redesign-lab/sources/`. A row in the ledger gets Tier / Idea / Source. Slop cannot ship.
**Verify the site actually HAS the component** - this is a separate test from reading its CSS and
it is the one that keeps failing (see the failures section below).

### 3. COMPONENT BLOCKOUT  ->  greybox variants of each COMPONENT
Same law as stage 1, one level down: several greybox treatments of a single component, each from a
different sourced site, judged side by side on the same content. Added 2026-08-16 at Rod's ask -
"add all current callouts, code blocks, header etc and start testing them in blockout format like
the others". Cheaper than building three real components to find out two are wrong.

### 4. COMPONENT BUILD  ->  `extracted/components/<name>/`
Build the chosen treatment as a real component: its own `.html`, `.css`, and `.js` if it needs
behaviour. It lands on the bench at `?c=<id>`.

### 5. BENCH TUNE  ->  Rod turns the knobs
The bench has a LIVE per-element tuner exposing only the knobs that do something for that element.
Rod tunes, hits **Copy tunes** to export JSON, and the numbers get BAKED into the component's
defaults. This is where the design actually gets decided - not in the blockout, and not by Claude.

### 6. AGGREGATE  ->  `new-landing.html`, `a3-assembly.html`
The assembled page: real components, the SET COLOURS, the live three.js scene behind it, and
greybox `.ph` placeholders reserving real space for anything still missing. Judged whole.

### 7. `/ship-check` then `/sync-docs`
On any finalize. Ledger row updated at the moment of locking, not later.

## The rule the sub-pages broke

**You cannot aggregate components that do not exist yet.**

The landing aggregate is good because stages 2-5 happened first: every element in it was sourced,
built and tuned individually before assembly. The post aggregate read as slop because it jumped
stage 1 straight to stage 6, and the parts it assembled were bench files that had never been
re-proven after the 2026-06-09 trust reset. Importing an unsourced file and calling it a "real
component" manufactures the APPEARANCE of provenance.

If a surface is missing components, the honest artifact is the BLOCKOUT plus a build list - not an
aggregate wearing placeholder parts.

## What went wrong this session, so it is not repeated

Four failures, all the same root: **the mechanics were verified and the premise never was.**

1. **Rod's own pick was dropped.** He chose stripe.dev for the post page; a research workflow then
   sourced its own four references and the blockout was built from that without diffing against
   his pick. A reference the user names is a REQUIREMENT, not a candidate.
2. **Two "portal" references were not portals.** potg.art is a portfolio with a nav bar; lyra.horse
   is a homepage with project links. Their CSS was genuinely read, so every confidence field said
   "read-from-source" and was telling the truth - only the classification was fiction.
3. **A minimum-source quota manufactured false provenance.** "At least four per page type" is right
   for common surfaces and a trap for rare ones. Quota pressure on the portal produced the stretch.
4. **"A bench file exists" was treated as provenance.** It is not. The trust reset put everything
   back to Slop until re-proven.

And one invention that inherited a real source's credibility: the `/ contents` TOC block in the
stripe rail. Stripe has no TOC - verified. Anything added beyond the transcription must be labelled
as ours at the moment it is added.

## Evidence discipline

- Numbers come from `getComputedStyle` at 1440 on the live site, or they are not numbers.
- "Not found" is a valid answer. An invented value is not.
- Believe the observation, then verify the mechanism. Assuming `foundations.css` was enough left
  every `--color-*` token UNDEFINED on the post aggregate and rendered the top bar fully
  transparent - visible immediately by measuring, invisible by reading.
- When Claude's own earlier claim turns out wrong, WITHDRAW it in the ledger rather than quietly
  correcting. The measure claim ("every technical reference runs wider than 65-75ch") was withdrawn
  on 2026-08-16 after seven sites showed the opposite.

---

# REPEAT-OFFENCE TALLY (Rod's rule, 2026-08-16)

**Every duplicate mistake gets written here AGAIN, on purpose.** Rod: "if you make a duplicate
mistake we are noting it in the file again as extra reinforcement, I feel like your notes to your
own memory are very leaky." He is right - the notes exist and get read and then not applied. So
this section grows by repetition rather than being tidied. A rule appearing three times means it
was broken three times.

Append a dated line each time. Do not merge, do not summarise, do not delete.

### Tally

- **2026-08-16 - GREYBOX LAW broken (1st).** Six sub-page "blockouts" built with colour, gold
  accents and real type. The rule was already in DECISIONS D8 and in the landing blockout being
  copied from.
- **2026-08-16 - NO TIMED WAKEUPS broken (1st, 2nd, 3rd).** `ScheduleWakeup` called three times in
  one session. The memory note saying never to call it was READ EARLIER IN THE SAME SESSION, in the
  same file as the resume block. Leaky exactly as Rod describes.
- **2026-08-16 - PREMISE NOT VERIFIED (1st, 2nd, 3rd, 4th).** Rod's own named reference dropped;
  two "portal" sources that were not portals; bench files treated as provenance; a TOC invented
  into stripe's rail. Same root every time: the mechanics were checked and the premise was not.
- **2026-08-16 - CLAIM MADE WITHOUT MEASURING (1st).** "Every technical reference runs wider than
  65-75ch" - withdrawn after seven sites showed the opposite. The wide ones had simply never set a
  measure at all.
- **2026-08-16 - SOLVED A PROBLEM ROD DID NOT RAISE (1st, 2nd, 3rd, 4th).** Asked four times to
  make the favicon fill the bar's height and anchor hard left; each time capped it instead to
  protect a hero height calc he never mentioned. The fix was to cancel the bar's padding, not to
  grow the bar - available from the first attempt.
- **2026-08-16 - PREMISE NOT VERIFIED (5th).** Told Rod the bench callouts had "real parents - hana
  for the TL;DR, harumaki x hana for the quote". Their CSS headers do say that, but they point at
  `rework-hana.html` and `rework-harumaki.html`, which are OUR OWN BUILDS named after the sites that
  inspired them. Rod: "you are confidently lying because these are not anywhere to be found on hana,
  unless you mean our AI generated hana copy." The citation laundered our own work through a
  filename that sounds like a source. **A provenance comment is a CLAIM, not evidence - check what
  it points at, and if it points inside this repo the chain never left the building.**
  New standing rule from this: ONLY components on the workbench are made by us; the bench and every
  `rework-*.html` are source CANDIDATES, never sources.
