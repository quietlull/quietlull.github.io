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

# THE BLOCKOUT IS A CONTRACT (Rod, 2026-08-18)

Rod, after the projects aggregate and the landing both drifted: *"whats the point of making a great
blockout if we just randomly slap things together later on?"*

There is no point. That is the whole answer. A blockout that does not bind the aggregate is wasted
work, and every hour spent sourcing variants for Rod to judge is wasted with it. The judging only
means something if the thing he judged is the thing that gets built.

So the blockout is not inspiration. It is a **parts list plus an arrangement**, and the aggregate's
only job is to realise it with real components.

## The rule

**An aggregate may contain ONLY the elements its approved blockout contains.**

- Fewer is allowed - a slot can stay a `.ph` placeholder if its component is not built yet.
- MORE IS NOT. Not one chip, not one link, not one toggle, not a footer.
- An element that seems obviously needed and is not in the blockout is a **proposal**. It goes back
  to the blockout, gets a variant, and gets judged. It does not get quietly added during assembly.

## The check, before calling any aggregate done

List the elements in the approved blockout. List the elements in the aggregate. Diff them. Anything
in the aggregate and not in the blockout comes out or gets explicitly flagged to Rod as a proposal
BEFORE he is asked to look. "I flagged it in the file header" does not count - he reads the page,
not the header.

## Why this keeps happening, so it can stop

The failure is not laziness, it is a plausible-looking shortcut: another lab page (usually
`a3-assembly.html`) already has the element, so borrowing it feels like reuse rather than invention.
It is not. `a3-assembly` is an unjudged pile of everything; taking from it is exactly as unapproved
as making something up, and it carries the extra harm of looking sourced.

A second, subtler version: being asked to "complete a stub" is not licence to decide WHAT completes
it. Rod asking for the skills section to be finished authorised finishing the skills section. It did
not authorise inventing a Technology/Personal switch to put above it.

# STAGES ARE DEPENDENCIES, NOT A CHECKLIST (Rod, 2026-08-18)

Rod: *"things need to be systematic, some things need to come first and have dependencies. you cant
just skip things because you're missing context. remember everything needs to be human reviewed and
approved. we are not following the provenance rule at all it seems."*

All three are true, and they are one failure wearing three faces: **when context was missing, I
improvised instead of stopping.** Every skipped stage this session started as a small gap I filled
myself rather than asking about.

## The chain, and what each stage OWES the next

Each arrow is a hard dependency. You cannot start the right-hand side until the left-hand side
exists AND Rod has approved it.

```
  references  ->  layout blockout  ->  component sourcing  ->  component blockout
      |                  |                     |                       |
   4+ real,         greybox only,        live CSS read           greybox variants,
   verified,        Rod picks one        from source,            Rod picks one
   live sites                            saved verbatim
                                                                        |
                                                                        v
                        aggregate  <-  bench tune  <-  component BUILD
                            ^                              (real code, from
                            |                               the saved source)
                    ONLY blockout elements,
                    only BUILT components
```

- **Missing a reference?** Source one. Do not proceed on three.
- **Missing a component the blockout calls for?** It stays a `.ph` placeholder. Do NOT substitute
  something from another lab page, and do NOT invent a stand-in.
- **Missing the CONTEXT for a decision?** Ask. Batch the question if Rod is away. An assumption
  filled in silently is indistinguishable from a fabrication by the time he sees the page.

## Human review is a GATE, not a notification

Every arrow above is a stop. "I showed him afterwards" is not approval, and neither is "I flagged it
in the file header" - Rod reads the rendered page, not the comments. If work has not been approved
at the stage it belongs to, it does not move to the next stage.

## Provenance, restated because it is being broken in practice, not in principle

The rule was never "write a PROVENANCE comment". It is: **every element derives from a real snippet
read from a live external site, saved verbatim before it is built.** Practical consequences that
were being ignored:

- An element in `a3-assembly.html`, `rework-*.html` or any other lab page **has no provenance**.
  Copying from them is inventing with extra steps, and it is worse than inventing because it looks
  sourced.
- A component whose CSS header cites an in-repo file is Slop. Twelve currently do.
- Slop **does not go into an aggregate**, not even flagged, not even temporarily. The placeholder is
  the correct representation of an unsourced slot.

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

- **2026-08-18 - BLOCKOUT NOT FOLLOWED (1st), and it cost a whole page.** `projects-aggregate.html`
  was built from the MinionsArt blockout and rejected outright: *"giga sucks... probably the most ai
  generated page i have seen, worse than the original."* Two distinct failures in one page. (a) The
  layout was transcribed from a site whose life is its CONTENT, so the geometry alone produced a
  shell - see DECISIONS D19. (b) The aggregate did not match the blockout it came from.
- **2026-08-18 - ELEMENTS ADDED WITHOUT APPROVAL (1st).** Six things went into `final-landing.html`
  that Rod never asked for: the two-part section head with `View all ->`, a filter/tag chip row, a
  Technology/Personal skills switch, the demo reel band, and the site footer. He caught them:
  *"randomly things are added without my permission or approval first... idk why the landing page
  has tag buttons, this has never been a thing i wanted."* All were lifted from `a3-assembly.html`,
  which made borrowing feel like reuse. It was not - a3-assembly is unjudged.
- **2026-08-18 - SHIPPED A DEAD CONTROL (1st).** The Technology/Personal skills switch had ZERO JS
  behind it anywhere in the repo. I knew, and wrote "presentational here" in the markup instead of
  either wiring it or not shipping it. A control that does nothing teaches the user the interface
  lies. Removed.
- **2026-08-18 - SHIPPED AN ELEMENT WITH NO SOURCE (2nd).** The demo reel band went onto the landing
  while `element-tracker.md:76` recorded it as `Slop | ? | - | no ref yet`. I flagged the debt in a
  comment and shipped it anyway. Flagging is not permission. Rod spotted it by eye - *"i actually
  have no idea where it even comes from"* - and he was right: it comes from nowhere.

