# Decisions

Each entry: what was decided, who decided, the rejected options WITH why. Losers keep getting
re-suggested - the reasoning is the point. Mark superseded decisions instead of deleting them.

## D1 - Docs system: atomic linked notes, not a monolith (2026-08-11, ROD)

Small single-topic notes + a one-screen STATUS + an index, plain markdown in `docs/`. LANDED
2026-08-11; PROJECT-STATUS.md and CLEANUP-LOG.md retired.

- REJECTED: continuing the PROJECT-STATUS.md monolith - it went ~4 months stale and its counts were
  wrong; a 461-line doc is too expensive to keep true and too expensive for an agent to load.
- REJECTED (for now): Obsidian MCP / plugin layer - token efficiency comes from the note shape, not
  the software; the MCP layer only pays when other clients share the vault. Revisit trigger in
  [OBSIDIAN-BRIEF.md](OBSIDIAN-BRIEF.md).
- Cautionary precedent: the Underworld project's own excellent doc system rotted within weeks of
  fast code movement - its fix was a small fresh authoritative note superseding the pile. This
  system only survives if doc updates are part of finishing a change.

## D2 - Chirpy treated as upstream client code (2026-08-11, ROD)

Additions in our files over edits to theirs, even at the cost of duplication; upstream bugs flagged
in [UPSTREAM.md](UPSTREAM.md), not silently fixed. Ported from the Underworld client-repo
discipline.

- REJECTED: continuing to edit theme files in place - it is why the boundary disappeared.

## D3 - Vendored fork vs gem-based theme: DEFERRED (2026-08-11, ROD)

The decision is meaningless until the Phase 1/2 boundary exists. Do not re-open before then.

## D4 - Semantic hooks over incidental coupling (2026-08-11, ROD)

Subsystems talk through declared contracts (data attributes like `data-breathing`, documented maps)
rather than CSS internals (`animationName` matching, selector lists).

- REJECTED: keeping the string-match "because it works" - it couples the sparkler to keyframe
  NAMES, which are styling internals, and it already requires a manually synced selector list to
  mirror it in Sass.

## D5 - Anti-bloat outranks micro-optimization (2026-08-11, ROD)

Optimizations that add code (caches, dirty flags, hoisted values, helper extractions for trivial
deltas) are bloat; fewer lines and readability win. This SUPERSEDES the earlier "optimize all JS
files" passes - ROD: that work was done under a different lens; do not blindly optimize again.

- REJECTED: continuing non-visual micro-optimization sweeps - each one trades readability for
  savings too small to measure, and the added mechanisms are themselves future maintenance.
- Genuine wins (algorithmic, measured, or code-REMOVING) are still welcome - the bar is that the
  change must delete complexity or provably matter.

## D6 - Structural refactor waits for the redesign (2026-08-11, ROD)

Refactor Phases 1-3 ([REFACTOR-PLAN.md](REFACTOR-PLAN.md)) are deferred until the visual redesign
ships, so boundary extraction happens ONCE on the final surfaces. The refactor is NOT cancelled -
it must eventually happen or the theme boundary stays unfixable.

- REJECTED: refactoring now - the redesign replaces post.html, the topbar, and the theme Sass, so
  pixel-identical extraction of the current surfaces would be done twice.
- REJECTED: skipping the refactor entirely - the couplings in
  [THEME-BOUNDARY.md](THEME-BOUNDARY.md) keep biting (see [TRAPS.md](TRAPS.md)) until contracts
  replace them.

## D7 - Code provenance law for the redesign (2026-06-09, ROD; recorded here 2026-08-11)

Every design element derives from a REAL snippet (reference site, CodePen, or the live site),
tiered True / Remixed / Slop; idea origin tracked (Rod / theirs / Claude) with Claude-originated
ideas capped near 25%. Ledger: `redesign-lab/element-tracker.md`. No source? ASK first.

- REJECTED: free-handed generation - it produced AI-slop designs Rod had to clean up, and mass
  autonomous generation diluted design coherence (2026-08-09 mishap). Multi-agent work is for
  analysis/extraction only, never design generation.

## D8 - Layout phase: capture-driven, greybox-only, information flow frozen (2026-08-12, ROD)

Layout exploration runs on VERIFIED full-page captures of the reference sites, not on numeric
profiles and not on free-handed ideas. Three standing rules came out of it:

- **Greybox law.** A blockout carries geometry only - one grey language for every variant. Colour
  is decided separately (Sodium & Sky) and must never leak into a layout comparison.
- **The information flow is frozen.** nav, hero, projects header, cards, cards cont, skills header,
  flipper, skills, reel header, reel, scene bottom, footer. A variant may reshape a section; it may
  never delete one. (Caught in review: an early variant hid the second card row.)
- **Placeholders reuse the blockout's own greybox box**, reserving real spacing, so a missing
  component never reads as finished work.

- REJECTED: attempt 1, variants derived from measured NUMBERS (column %, hero vh, padding rhythm) -
  the profiler flattened different sites into the same shape. Archived, not deleted.
- REJECTED: attempt 2, per-site "structural" variants that carried each site's colour/atmosphere -
  broke comparability.
- REJECTED: impeccable as a layout gate - ROD 2026-08-11, "it doesn't actually do much here". Its
  colour/type rules remain useful elsewhere.

## D9 - Scene bottom is constant; every layout keeps "View all" (2026-08-12, ROD)

The closing three.js scene is Rod's own signature moment, not a borrowed device, so it is a
constant full-height block in every layout rather than flexing per variant. Likewise the projects
"View all" affordance survives in all variants - in the 109ichiki-derived layout it moves to the
right end of the filter-chip row rather than being dropped for fidelity.

## D10 - Flat is only required where something FEEDS THE BLOOM (2026-08-13, ROD)

Anime glow reads as glow because the bloom wraps a flat, hard-edged painted source. Our lantern
emissive ramps continuously across the body (`_javascript/shader/lanternShader.js`), so the halo has
no edge to sit against and soft-on-soft turns to mush. Two supporting measurements: the dimmest
lantern pixel is `gradientEnd 0.35 x emissiveIntensity 2.0 = 0.7`, well over the `0.45` bloom
threshold, so the WHOLE lantern blooms rather than a core; and no tonemapping is set, so highlights
hard-clip instead of rolling off photographically, which is already correct for this look.

The rule is narrow, and ROD set the bound: **gradients are fine, Shinsekai yori uses them freely.
They are banned only on surfaces that feed the bloom.** Do not generalise this into a flat-shading
rule for the site.

- Water is exempt and stays a PERFECT MIRROR. It carries no stylisation of its own; it reflects
  whatever the scene does, and because bloom is a screen-space post pass, reflected highlights get
  the same treatment for free. That is also what a physical lens filter does.
- REJECTED (for now): replacing `UnrealBloomPass` with a custom star/cross-filter composite. It is
  a real technique but it is an ANALOG-era idiom (optical printer, physical cross screen), while
  Shinsekai yori is 2012 digital compositing, softer halation. Revisit only if flat sources plus the
  existing bloom still miss. A custom pass is the only route to posterised falloff, tinted halo,
  grain or spikes, but it is NOT the route to "softer", which is three numbers on the pass we have.
- REJECTED: stacking a star pass on top of UnrealBloomPass - two threshold extractions and two
  glows composite into mud. Whatever gets built replaces it.

## D11 - Anime glow: keep bloom + star glare, drop shape-following (2026-08-13, ROD)

The lantern glow stays **UnrealBloomPass plus the ported star glare**, both driven by a FLAT
emissive (D10). The whole shape-following-halo line of work is closed.

ROD's diagnosis that opened it was right and is worth keeping: a pyramid bloom "blurs the shapes
too much, the bloom becomes round" while his reference has "a very minimal halo that almost traces
directly around the shapes". The mechanism is now understood - `UnrealBloomPass` sums 5 mips from
1/2 down to 1/32 resolution, and the wide mips are blurs of an image where a lantern is one or two
pixels, so they are round whatever shape produced them.

- REJECTED: bloom resolution scaling (0.1x to 4x) and per-mip "reach" tapering. Both were built and
  tried. Supersampling tightens each mip but mip 5 stays shapeless at ANY buffer size, so a pyramid
  bloom cannot trace a silhouette. ROD: "not impressed".
- REJECTED: JFA distance-field glow, after being built and verified working. ROD: "interesting but
  not quite what I'm looking for". Port was public-domain and is recoverable - see element-tracker.
- REJECTED: dilate-and-subtract, built alongside it and cut with it.
- NOT BUILT: geometric shell glow (inverted hull). ROD called it "kind of unimpressive" unbuilt.
- Standing lesson: **blur cannot follow a silhouette**, it spreads mass isotropically. A halo that
  traces a shape is a distance problem, not a blur problem. If this reopens, that is the fork.

## D10 - The handmade signature is SHADER work, not drawn art (2026-08-14, ROD)

The gallery teardown (53 sites read from source) found that Rod's top references split into two
crafts: **image-composited** sites that draw their visuals and place them as pictures (harumaki
main: 304 `<img>`, ZERO design tokens), and **tokenised** sites that describe their visuals in CSS
(Unseen Studio: 1 image, 54 tokens). This site is architecturally the second while aiming for the
first's feel, which is why the seam band, cloud partition and edge rails all resolved to "mechanism
built, ARTWORK OWED". It was never a CSS-quality problem.

ROD's ruling, and the reframe that resolves it: **he is not a 2D artist, he is a shader artist.**
So the equivalent of harumaki's 304 drawings is not a pile of PNGs he does not want to draw - it is
procedural and shader craft, which he already produces (the lantern scene, the About-page water,
compute grass, the lantern shader, the sparkler system). Both are handmade in the sense that
matters: a person authored them and no template emits them. Neither is describable in CSS, which is
precisely why neither reads as generated.

Chosen route: a bit of both. A small number of genuinely drawn pieces where they matter most (the
scribbly name), and **the scene carrying the rest**. Consequences:

- The borrowed PAINTED dividers stay retired (already D-noted): seam band, cloud partition, edge
  rails. Their components remain in `extracted/` as proven transcriptions, shelved, not deleted.
- The "artwork owed" list is RE-POINTED at scene and shader work rather than at drawing tasks.
  Rod's three picks - sparkler trail, foreground objects, lantern garland - are all scene-side.
- Section separation continues to come from space, the scene showing through, and section labels
  (thatskygame's evidence: 150-360px of exhale and no divider).

- REJECTED: commissioning or drawing a body of 2D art to chase harumaki's specific warmth. Rod does
  not work in that medium; the result would be weaker than the shader work he already does well.
- REJECTED: copying the references' lack of a design system. 17 of 53 sites, including all three
  harumaki sites, carry ZERO CSS custom properties - but those are single-album promo microsites
  built once and never maintained. This is a forever project (CLAUDE.md) with many pages. Their
  build style suits a thing that ships once and dies. Keep the tokens; the lesson was about where
  warmth comes from, not about how to build.
- REJECTED as a reference: **Mineko's Night Market**. It is the most mechanically elaborate site in
  the gallery (1808KB CSS, mask x33, mix-blend x18) and CLAUDE flagged it as an odd untiered gap.
  ROD judged it on sight: "just default corporate stuff, same as the spiritfarer website."
  **Mechanical elaborateness is not quality** - a useful correction to how the teardown ranks things.

## D12 - Fireworks are TWO features: a permanent greeting and an earned reward (2026-08-16, ROD)

The queued item was only "gate the auto-fireworks by scroll position". ROD split it into two
independent streams instead: a GREETING that always runs while the top of the page is on screen,
and the REWARD stream unlocked by Pyrotechnician, which stacks on top of the greeting rather than
replacing it. The controller now runs one emitter per stream, each with its own timer and its own
cap on live shells; `fireworks-toggle.js` decides which is active.

- REJECTED: **one flag, toggle as master kill for both** (CLAUDE's proposal, and CLAUDE's
  recommendation). ROD's reasoning is the whole point of the feature: "then they don't actually
  unlock a new button and there's no curiosity when they notice it." A master kill makes the
  toggle a settings switch; keeping it bound to the reward alone makes its APPEARANCE the payoff.
  The topbar switch is already `.reward-locked` (`display:none`) until earned, so the discovery
  moment existed in the code and the master-kill design would have thrown it away.
- CONSEQUENCE ACCEPTED: the greeting has NO user opt-out. CLAUDE flagged this against the
  no-GPU/perf constraint; ROD overruled deliberately. `prefers-reduced-motion` still silences both
  streams, since that is an OS setting rather than a button and costs no unlock moment.
- OPEN, ROD'S EYE: greeting and reward stack at the top and can together cross 3 explosions/sec,
  the photosensitive threshold. CLAUDE offered suppressing the greeting while the reward runs;
  ROD chose to judge it by eye first. Nothing was changed.
- FIXED ON THE WAY: auto-launched shells used to dispatch `achievement:firework` because
  `createAutoFirework` routes through `createFireworkFromClick`. With a permanent greeting that
  would unlock Pyrotechnician while the visitor sits still - the reward would earn itself. Only
  `source === 'click'` counts now.
- TUNING NOTE: `maxLive: 4` is a ceiling, not a target. At the calm 2.5s rate the measured peak was
  2 shells on screen. A shell lives ~1.7s, so genuinely holding 3-4 needs delay near 0.5s, which is
  no longer calm. Calm rate and high concurrency pull against each other.

## D13 - Code scrolls sideways; the prose measure stays narrow (2026-08-16, ROD)

The 65-75ch rule in STYLE.md conflicted with every technical reference measured: stripe.dev ~78ch,
Cyanilux `width:70%` (~95ch), Inigo Quilez `max-width:120ch`. The hypothesis was that code sets the
measure because code does not wrap.

ROD resolved it the other way: **let the code scroll left and right.** The prose measure stays
narrow and the reader scrolls a code block horizontally to read the rest of a long line.

- REJECTED: widening the prose measure to fit the widest code line. That is what all three
  references do, and it costs readability on every paragraph to serve a few long lines.
- REJECTED: an exception to 65-75ch for code-heavy posts. Same cost, narrower blast radius.
- CONSEQUENCE ROD NAMED: "we have less space than others in this case" - our column is genuinely
  narrower than the references, so horizontal scroll inside code blocks will be COMMON, not rare.
  Keep it in mind when picking a code-block source: the scroll affordance has to be obvious and
  must not fight the page's own scroll.

## D14 - Handmade is not only shaders (2026-08-16, ROD) - amends D10

D10 concluded the handmade signature is SHADER work rather than drawn art, because Rod is a shader
artist and his favourite references get their warmth from drawn assets he does not make.

ROD amends it: **"things should be handmade and that's not just shaders."** Where a shader is the
right answer it should be a shader, but where a 2D element, a hand-drawn element or noise makes
more sense, use that instead. The medium follows the problem.

The rule D10 was reaching for survives - warmth has to come from something MADE, not from CSS
defaults. What is dropped is the assumption that "made" means "procedural". Do not cite D10 as a
reason to reject a drawn or noise-based solution.

NOTE: two entries in this file were both numbered D10 (the bloom-flatness rule and the handmade-
signature rule). ROD: "this doesn't matter too much." Left as-is rather than renumbered, because
both are cited as D10 elsewhere and silently renumbering would break those references. Cite them
as "D10 (bloom)" and "D10 (handmade)".

### D13 addendum (2026-08-16) - the references AGREE with Rod, and CLAUDE's evidence was wrong

D13 was recorded as Rod choosing horizontal code scroll AGAINST what the references do. Sourcing
seven technical sites from source shows the opposite: **he picked what they already do.**

- SIX of seven give code the SAME measure as prose, or narrower. lisyarus puts a 640px code card
  inside a 760px column. Only Josh Comeau widens code, by one 32px gutter per side which he re-adds
  as internal padding, and he pairs it with `white-space: pre-wrap` so his code WRAPS.
- Nobody bleeds code out to fit long lines. Bleed classes exist on four of these sites and are
  reserved for FIGURES, diagrams and canvases - verified as never applied to a `pre`.
- CLAUDE's earlier evidence ("every technical reference runs wider than 65-75ch") was WRONG in its
  implication. The wide ones are wide because they never set a measure at all: Cyanilux has no
  `max-width` in its whole stylesheet, and IQ's 120ch is a two-column figure-grid width. Sorting
  these sites by craft sorts them by measure, and the careful ones - Ciechanowski ~32em, Red Blob
  66 by explicit declaration, Josh ~70-76 - sit on Rod's own spec.

THREE DEVICES WORTH ADOPTING ALONGSIDE the scroll, all cheap and all near-universal:
1. **Shrink the mono.** Code runs 0.81-0.89x the prose size everywhere (Catlike 13/16, Ciechanowski
   0.875x, Red Blob .9em, Josh 16/18). Same column, more columns of code, no layout change. This is
   the single highest-value thing on the list and it was not in D13.
2. **Author discipline.** lisyarus sizes his card to exactly 80 monospace columns and keeps his
   longest line at 78. Writing to the column beats engineering around it.
3. **Shrink code on mobile rather than scroll** (iq drops to 0.8em below 1280px), so the scroll
   affordance is a desktop-only fallback rather than the mobile default.

## D15 - Sub-page layout winners (2026-08-18, ROD)

Gate 1 of [MERGE-WORKLIST.md](MERGE-WORKLIST.md). Judged from the six greybox blockouts, one call
per page type. This is the gate everything downstream sat behind - per PAGE-PROCESS.md, components
cannot be built until the picks exist.

**PROJECTS -> MinionsArt page, OUR OWN cards.** *(revised the same day - see below.)*

The first pass built a hybrid that put Kaito Note's card face on MinionsArt's page. Rod scratched
it on sight: *"actually just scratch that, it pretty much looks like the project cards we have now,
just build the page with our current project cards."* He is right, and the reason is worth keeping:
their card and ours had already converged. Ours is a uniform square with the caption over the
cover; theirs is a uniform square with the caption over a veil. The swap bought a different veil
and cost a second card system to maintain.

So the page is **MinionsArt's PAGE carrying `project-cards-expensive` unmodified** - `is-regular`
uniform squares (bento cut 2026-08-16), star pin, video cover and flip back all intact. Built as
`projects-aggregate.html`. Transcribed from their `style.css`: 1000px panel at 35px padding sitting
lighter than the ground, 3-up 300px grid at 20px gaps, 500px filter row, 400px search, and the
zero-blur `5px 10px` shadow - the load-bearing line, a sticker on paper rather than a glass panel.
Variant 5 stays in the blockout labelled SCRATCHED, as the record of the attempt.

**SUPERSEDED FIRST PASS - MinionsArt with Kaito Note's card.** Rod: *"lets do minionsart, i want to note that i
really like the layout of the project cards from kaitonote so please make a variant where the
majority of the page is using the minionsart layout but with the kaitonote project cards."*
Built as variant 5 in `projects-blockout.html?v=hybrid`. The split of parentage is deliberate and
recorded in the file: MinionsArt owns the PAGE (1000px panel at 35px padding, 3-up 300px grid with
20px gaps, 500px centred filter row, 400px search, top-right chip cluster, and the zero-blur
`5px 10px` offset shadow); Kaito Note owns the CARD (square tile, full-tile rest veil, caption
INSIDE at left/right 24 and bottom 16).
- **The shadow survives on purpose.** Zero blur, zero spread is the pillar-backed move - a sticker
  on paper, not a glass panel - and it belongs to the page, not the card. Kaito Note's own zero
  gutter would kill it, since a shadow between touching tiles has nowhere to fall.
- **What was dropped:** MinionsArt's 160px thumb, its 44px title band and the text block beneath
  the card. Once the caption moves inside the image there is nothing left for that block to do.
- **Still open for Rod's eye:** their caption-inside is sized for 549x312 tiles butting edge to
  edge; here it sits at 300x300 with a 20px gap, so the 24px inset reads proportionally larger than
  on the source. The alternative reading - keep Kaito Note's zero gutter and lose the shadow - is
  recorded in the variant's own caveats rather than silently discarded.
- REJECTED: 109ichiki (frameless field) and TUYU (live 16:9 embeds - twelve of those hits the
  no-GPU hard constraint head-on).

**ABOUT -> NO SINGLE WINNER YET, deliberately.** Rod: *"lets try 1 and 3 those are the winners i
want to see both in the real version with the real elements."* dimden (fixed 900px, 675+225, five
trophy categories legible at a glance) and Klubnika (928px column, borders left and right only,
catalogue plus detail panel) both advance to the AGGREGATE stage and get judged there instead.
This is the first time a page type carries two survivors past the blockout, and it is the right
call for this page specifically: the two variants differ most in **how much live scene they
cover**, which a greybox physically cannot show. 109ichiki (draggable windows) and potg.art
(full-bleed bands) are cut.

**RAMBLINGS -> Eve OFFICIAL, the hairline variant.** Fixed 1140px centred column. The deciding
property: it is the only one of the four that handles a mix of illustrated and text-only rows
without moving the row's left edge, and Rod's ramblings will be exactly that mix. Note that all
four variants declared search as a deviation - none of the four sources has one.
REJECTED: dimden (very empty at low entry counts), Klubnika (works at 200 entries but reads as a
ledger, which is the wrong register for personal writing), whey-isolate (three heavy panels leave
the least scene showing).

**RESUME -> DROPPED for now.** Rod: *"drop it for now."* There is no resume page anywhere on the
site - `grep -rl resume` outside `docs/` and `redesign-lab/` returns nothing - so this was never a
design pick, it was a create-or-cut question. Cutting it removes a whole surface from the port and
from the sourcing backlog (it had zero tracker rows and needed 3+ references from scratch).
`resume-blockout.html` stays on disk, unlinked from the worklist, in case it comes back.

**PORTAL -> Space Jam orbital**, treated as settled: it is the only VERIFIED portal of the two
remaining references (ZUTOMAYO's page-type claim was never confirmed), and Rod had already said he
likes the orbital and wants the 109ichiki/zutomayo popup windows folded in to replace the
unlabelled satellites.

## D16 - Rounded gothic everywhere; the serif is out (2026-08-18, ROD)

Rod: *"rounded gothic is fine and we should use it for the project cards and headers as well."*

This closes the type problem that had been open since the reference font audit. That audit found
four of the five harumaki sites render in mincho/serif (Yu Mincho, Noto Serif JP, Zen Old Mincho,
Trirong) and only `/ndt/` uses a rounded gothic - which contradicted the earlier locked call of
"hand-drawn name + clean mono, no serif". Rod picked the `/ndt/` side, so **the original locked call
survives intact** and the assembly's mincho/sans twins have done their job.

Implemented at the TOKEN, not per page: `--font-display` in `extracted/styles/settings.css` moves
from `"Shippori Mincho", serif` to `"M PLUS Rounded 1c", sans-serif`. Six things reach for that
token - card titles, section heads, post header, dated timeline, quote block, stamp callout - so
they move together and cannot drift apart later. Verified on the landing: display token, section
head, card title and body all resolve to M PLUS Rounded 1c, with zero serif left on any head or
title.

The site now runs THREE faces, down from four: M PLUS Rounded 1c for text and display, Caveat for
the hand/wordmark (itself on the way out, to be replaced by the line-boil animation), IBM Plex Mono
for labels and code. Shippori Mincho stays loaded only because `a3-assembly.html` still renders the
mincho twins for the record.

**Downstream this now gates a real file:** fonts are requested from `_data/origin/cors.yml:19`, not
from SCSS, so the webfont declaration has to change there at port time.

## D17 - No scroll chevron (2026-08-18, ROD)

Rod: *"remove the chevron honestly we don't need it."* Deleted from `final-landing.html` - markup,
CSS and its `@keyframes cue`, rather than hidden. A hidden element is still a thing to maintain.
The hero still reads as scrollable because the section below it starts inside the fold at every
tested viewport.

## D18 - Colour is decided LAST, after space (2026-08-18, ROD)

Rod: *"we can wait for the palette changes, i think we should do this at the end once everything is
sorted, colour hierarchy comes after space."* So the palette lock moves out of gate 1 and to the end
of the build. This is a sequencing principle, not a deferral of convenience: a palette judged
against unfinished spacing gets re-judged the moment the spacing changes.

ONE CAVEAT that is not a decision and does not wait: the colours currently rendering on
`final-landing.html` come from `palette-store.js` reading `localStorage['lab-palette']` in Rod's own
browser. That is not a design question, it is an unbacked-up file. Exporting it costs one console
line and protects the work regardless of when the lock happens.

## D19 - Source ELEMENTS, not page layouts (2026-08-18, ROD) - amends PAGE-PROCESS

`projects-aggregate.html` was rejected outright. Rod: *"New project page giga sucks... probably the
most ai generated page i have seen, worse than the original for sure. rejected, lets go back to the
drawing board in detail for that one. maybe rather than sourcing a layout its a better idea to
source elements and build from the workbench page."*

**Why it failed, honestly.** The page had a container and a grid and no idea. What makes
MinionsArt's projects page work is its CONTENT - a mascot banner, real thumbnails, varied tags, a
purple that belongs to them. Transcribe only the geometry and fill it with placeholder squares and
nothing survives: a dark rectangle holding nine identical tiles, a title, a description, a search,
five chips and a View-all. That is the stock generated portfolio page, and Rod named it on sight.

**The part worth keeping as a rule:** the greybox stage *cannot* catch this. Greybox removes exactly
the thing that was carrying the source. A layout blockout proves the geometry is transcribed; it
cannot prove the geometry is what made the page good. So:

> **Layout-sourcing is valid only when the LAYOUT is the idea.** When the source's life comes from
> its content, transcribing its geometry produces a shell, and the shell reads as generated.

**The new default (Rod's call):** source ELEMENTS and compose on the workbench. Judge each element
where it lives - in the bench, against the scene - and let the page emerge from parts that have
each survived a look, rather than pouring parts into a borrowed silhouette.

This does not overturn D15's other picks. The landing came out fine on the layout route because its
elements had each been judged on the bench over weeks first; the projects page tried to do both
steps at once, in one pass.

**Also rejected in the same message, and both were unsourced - Rod found them by eye:**
- **the demo reel band.** `element-tracker.md:76`: `Demo reel embed / placeholder | Slop | ? | - |
  no ref yet.` Tier Slop, Source empty. It has no reference at all, and it was shipped into
  final-landing earlier the same day. Now pulled back to a `.ph` placeholder.
- **the section headers.** `final-picks.md:89`: "harumaki shead, PROVISIONAL (never a picker slot)".
  Never judged, no verified source. Left in place because a page needs labels, but marked
  provisional in the file and added to the sourcing list.

Rod picking out precisely the two unsourced elements on a page of otherwise-sourced ones is the
strongest argument yet that the provenance law is not bureaucracy.

## D20 - Four calls from the decision pass (2026-08-18, ROD)

**1. TOGGLES COME OUT OF THE TOP BAR.** Rod: *"i got a feedback which is that i should remove
toggles from the bar and i think thats what we will do."* Breathing / sparkler / fireworks leave the
bar entirely.

This also SETTLES the nav-centring problem rather than trading it off. The bar is
`grid-template-columns: 1fr auto 1fr`; the asymmetry existed only because the toggles made the right
zone 165px wider than the mark+name. With the third zone empty, the outer columns are equal, so the
nav is centred AND the gaps are even. No compromise needed.
**STILL OPEN: where the three toggles GO.** They are real controls, not decoration - the motion
toggle in particular is an accessibility affordance. Parked as a proposal, not decided.

**2. CODE BLOCK -> Maxime Heckel's header strip, SQUARED.** Rod: *"i like Maxime Heckel's, i however
do need it to be a square instead of a rounded shape and i like the colors of other code blocks
more."* So the structure is Maxime's filename/language strip with the copy button in it, corners
squared per the 2026-08-11 shape pass (square by default, round only by exception).
**STILL OPEN: whose colours.** Rod prefers another block's palette but did not name which. The
sourced candidates with their own schemes are Starlight, Josh Comeau, iquilezles, ronja and
catlikecoding. Needs a side-by-side of the SAME code under each scheme before he can answer.

**3. POST RAIL -> metadata AND a TOC below it**, as the post blockout already shows. Two removals
and one repurpose, all from Rod:
- **No "Copy for LLM" and no "View as Markdown".** Those are stripe's agent buttons. We are not
  building for agents, and copying them would be transcribing a feature rather than a design.
- **Share buttons become a SOCIALS section** linking to Rod's own accounts, rather than
  share-this-page actions.

**4. THE CALLOUT FAMILY IS NOT A SEPARATE DECISION.** Rod rejected the framing of the question:
*"actually the current callout family isnt great and i think we should do a comprehensive rework
with context from things that will surround it like tags, headers, image boxes, etc. do we have a
blockout like stripe's yet?"*

**Answer: no, and that is the real gap.** Two artefacts exist and neither is this:
- `post-blockout.html?v=stripe` is the page SPINE - grid, rail position, column widths. It says
  nothing about prose.
- `component-blockout.html` holds components in ISOLATION, each alone in a ~340px card.

Judging a callout alone in a small card cannot tell you how it reads between a heading and a code
block at a 663px measure. That is almost certainly why the callout picks kept feeling wrong: the
question was being asked in a context that hides the answer.

**So the next artefact is a PROSE BLOCKOUT** - the whole reading system in context, in reading
order, at real measure: headings, body, links, inline code, tags/meta, image boxes with captions,
code blocks, callouts, quotes, lists. Greybox, judged as a FAMILY. The individual take/leave pass
on `element-gallery.html` waits for it, because the answers change once the neighbours are visible.

