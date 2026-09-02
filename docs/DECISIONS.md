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

> **HALF RETIRED 2026-08-23 by D28.** The EARNED REWARD half is gone - Rod scrapped every
> unlock: *"lets scrap the idea of unlocks they get an achievement and thats fine."* The
> GREETING half stands and is now the only auto stream. Kept rather than deleted because the
> two-features split is still the reason the greeting exists at all, and because a future
> "additional ideas" pass (his words) may want the reward shape back.

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
- `text-decisions.html` (was `component-blockout.html`, renamed 2026-08-23) holds components in ISOLATION, each alone in a ~340px card.

Judging a callout alone in a small card cannot tell you how it reads between a heading and a code
block at a 663px measure. That is almost certainly why the callout picks kept feeling wrong: the
question was being asked in a context that hides the answer.

**So the next artefact is a PROSE BLOCKOUT** - the whole reading system in context, in reading
order, at real measure: headings, body, links, inline code, tags/meta, image boxes with captions,
code blocks, callouts, quotes, lists. Greybox, judged as a FAMILY. The individual take/leave pass
on `element-gallery.html` waits for it, because the answers change once the neighbours are visible.

## D21 - One combined control; the breathing TOGGLE retires (2026-08-18, ROD)

Rod, on where the three bar toggles go: *"We should just have it combined with the scene toggle. we
also wont have breathing anymore it doesn't exist but we should just keep the motion. if they have
prefer reduced motion then it can be still instead."*

**Decided:** the separate bar toggles are gone (D20) and their function folds into the existing
scene toggle. One control, not four. Motion survives as a concept; a separate breathing switch does
not. `prefers-reduced-motion` defaults the site to STILL rather than needing the user to find a
control.

**FACTUAL CORRECTION, because the decision reads differently once this is known.** Breathing is not
gone from the code. Measured 2026-08-18:
- **18 SCSS files** reference it, 221 references total (`_animations.scss` alone has 60,
  `_topbar.scss` 59, `_post.scss` 30).
- `$breathe-selectors` at `_sass/abstracts/_animations.scss:235` names ~14 live selectors.
- The toggle is wired and rendering at `_includes/topbar.html:75`.

So "we won't have breathing any more" is a **removal task with real reach**, not a statement of
current fact. Recorded that way on purpose: if a future session reads it as "already gone" it will
be confused by 221 references.

**AND THE REDUCED-MOTION BEHAVIOUR ROD ASKED FOR ALREADY EXISTS.**
`_sass/abstracts/_animations.scss:266-272` runs `@media (prefers-reduced-motion: reduce)` over
`join($breathe-selectors, $reduced-motion-extras)` and sets `animation: none !important`. There is
also a `html.breathe-override` escape hatch so a user who deliberately turns motion ON can overrule
their OS setting. That pattern is worth carrying into the new control rather than rebuilding.

**RESOLVED same day.** Rod: *"Kill this subsystem it wont exist anymore."* Breathing is out of the
new design entirely - no ambient glow animation, no selector list, no toggle.

**But NOT as an 18-file removal, because of the scope rule below.** The live site's breathing dies
when the new theme replaces `_sass/` at port time. Deleting it from the current SCSS now would be
exactly the main-site work Rod has ruled out. So: breathing is ABSENT from everything built in the
lab, and the old subsystem is left alone until the port removes its surfaces wholesale.

**The single control governs SCENE + ALL MOTION**, one switch (Rod's pick). Scene, drift/magnet and
any remaining animation go together. The trade he accepted: you cannot keep the scene while calming
the motion. `prefers-reduced-motion` defaults it to still, and the `breathe-override` idea - letting
someone deliberately turn motion back ON against their OS setting - is the one part of the old
system worth carrying forward.

Sparkler and the fireworks reward stream fold under "all motion" by this reading. Flagged rather
than assumed: D12 made the fireworks reward an UNLOCKABLE, which only works if it has its own
button, so that specific one may need to survive separately. Not decided.

## D22 - LAB ONLY. No main-site work. (2026-08-18, ROD) - STANDING RULE

Rod: *"i want to make it clear we are only working on the new design lab stuff, zero main page stuff
at this point."*

**All work happens in `redesign-lab/`.** `_sass/`, `_layouts/`, `_includes/`, `_javascript/`,
`_config.yml` and the page files are OFF LIMITS until the port.

This is not a preference, it is what makes the redesign finishable. Every hour spent fixing the
current site is spent on surfaces the redesign is about to replace, and it is how the 2026-08-11
scan's flaws got half-fixed twice already.

**EXCEPTION, 2026-08-22 (Rod, explicit):** `_layouts/` and `_includes/` were opened once, for the
scene consolidation only - four layouts repointed from the retired `general` bundle to `minimal`,
and the fireworks toggle narrowed to the one layout that still has fireworks. Rod: *"remove general
and just replace it with minimal for now that makes sense."* This does NOT reopen those directories
generally; the three.js scene was already carved out of this rule, and this is its page wiring.

**Consequences worth stating so they are not rediscovered:**
- "Kill breathing" is not a removal job. It is an absence in the new design.
- The live-site items in [MERGE-WORKLIST.md](MERGE-WORKLIST.md) gates 4-6 - the dead search
  subsystem, PWA theme-colour, og:image, PurgeCSS globs, the 11 real eslint errors - are NOT
  cancelled. They are PORT-TIME work, and they stay in the worklist under those gates.
- Repo hygiene that touches no rendered surface (git, docs, dependency merges) stays allowed.
- If a lab page needs something from the live site, it COPIES it into the lab rather than editing
  the original.
- **THE THREE.JS SCENE IS THE EXCEPTION, and it has to be** (noted 2026-08-18 when the parallel
  performance session began editing `_javascript/three-background-scene.js`). The scene is not
  "main page stuff" - it is SHARED INFRASTRUCTURE. Every lab page loads the built bundle at
  `/assets/js/dist/three-background-scene.min.js`, so scene and shader work in `_javascript/`
  lands in the lab too and is the one live directory the redesign genuinely depends on.
  Rebuild with `BUILD=production npx rollup -c` after touching it.
  This does NOT reopen `_sass/`, `_layouts/`, `_includes/` or `_config.yml`.

## D24 - Paper filter pays for low render resolutions (2026-08-22, ROD)

Rod, after seeing it: *"the artifacts from bloom resolution and reflection being a lower resolution
get completely masked and makes it look intentional with the paper grain."*

A paper-grain post effect over the whole scene, composited INSIDE the bloom pass's final composite
rather than added as its own pass - so it costs two texture fetches and one extra tap of the frame,
no new pass and no new render target. With it on, the render resolutions dropped: **pixel ratio
1 -> 0.5, bloom scale 0.5 -> 0.25, water reflection 0.5 -> 0.25.** The two decisions are one
decision. Do not raise the resolutions or drop the paper without re-judging both.

**Shipped values:** washi at tile 1 carrying the large fibre structure, cold press at tile 4 sitting
inside it as tooth, combined with SUBTRACT (the sheets cancel where they agree, which keeps the
result from just reading as more noise), mix 0.5, bleed 0.5, displace 0.0075, tooth 0.05, boil 3.25.

**The sheets are BAKED, and that is the whole reason this is affordable.** The source Shadertoy
derived its paper normal from a 4-octave simplex fbm evaluated ~24 times per pixel - about 144 `sin`
calls - which is impossible under software rasterisation. `assets/tex/paper-*.png` are normal+height
bakes (rg = normal xy, b = height), so the shader does one fetch. The generator is not in the repo.

**The boil is the on-pillar part.** It re-rolls both sheets 3.25 times a second instead of every
frame, which reads as a hand-drawn boiling line rather than video noise. The two sheets are offset
by a non-integer factor so they do not pulse together.

- REJECTED: `UnsignedByteType` for the bloom buffers, suggested twice by an external review as a
  software-rasteriser win. The pipeline is LINEAR, and the sky `#162237` is linear
  `[0.008, 0.016, 0.038]` - steps 2, 4 and 10 out of 255. The whole scene's base tone would quantise
  into the bottom 4% of the range, and a blur is exactly the smooth gradient that banding destroys.
  Viable only with sRGB encoding on the way in, which costs an encode/decode.
- REJECTED: dropping the blur chain to 1/8 resolution. The reasoning offered was "no threshold means
  low resolution is fine", which is backwards: with a threshold you blur sparse bright blobs and low
  res hides, without one you composite a low-res copy of the ENTIRE frame back over itself.
- REJECTED: a single-band composite and a one-pass blur - both were built on 2026-08-18 and lost on
  LOOK (D23). Re-proposing them as performance wins does not address why they were dropped.
- NOT DONE, and the honest limit on all of the above: **nothing has been re-profiled** since
  UnrealBloomPass was removed. The 8.5 ms / 52% figure in D23 and in the tuner header describes a
  pass that no longer exists. Every resolution decision here was judged by eye.

**CARRIED DEBTS.** The Shadertoy URL is still owed for the `element-tracker.md` provenance row -
three ship-checks have flagged it and the effect is live without one. There is no
`prefers-reduced-motion` path anywhere in the scene code, which D21 explicitly asks for. And at
3.25/sec the boil clears the WCAG 2.3.1 flash threshold only on AMPLITUDE (~2.5% luminance at tooth
0.05, limit 10%), not on frequency - so raising tooth past ~0.2 would cross it.

## D23 - Bloom is a 2-level Dual Kawase with no threshold (2026-08-18, ROD)

<!-- RENUMBERED from D20 to D23 on 2026-08-18. Two sessions were writing to this file at once - the
     redesign pass and the performance audit - and both reached for D20 within minutes of each
     other. The bloom decision was committed second so it moved. Nothing about its content changed.
     If the perf session refers to "D20 bloom" anywhere, it means this. -->

UnrealBloomPass is out. Rod, after A/B-ing four implementations in `redesign-lab/scene-tuner.html`:
*"the two pyramid kawase is the winner for now"*, then *"remove the other blooms"* and *"remove the
slider we are keeping the kawase"*.

**Why it was ever a question.** Ablation profiling on Rod's machine with hardware acceleration OFF
(his stated no-GPU constraint) measured the scene at 16.5 ms/frame, of which **bloom was 8.5 ms -
52%** - and that was already at HALF resolution, so full-res bloom was costing roughly 34 ms. Draw
calls were never the issue: the scene is 27 draw calls and 733 triangles. It is fragment-bound.

**What UnrealBloomPass actually costs.** Read from source: `nMips = 5`, eleven render targets, and a
SEPARABLE GAUSSIAN at every level - two passes per mip plus a composite, so ~12 passes.
`kernelSizeArray = [3,5,7,9,11]` and the inner loop fetches `vUv + offset` AND `vUv - offset` per
iteration, so the deepest level is 42 taps per pixel per direction. It also samples on-texel, so it
gets no benefit from bilinear filtering.

**What shipped instead** (`_javascript/shader/kawaseBloom.js`, `KawaseBloomPass`): Marius Bjorge's
dual filtering at TWO levels with the bright-pass skipped -

```
1  copy       whole frame -> 640x360    (no threshold, nothing is cut)
2  down       640x360 -> 320x180        (5-tap)
3  up         320x180 -> 320x180        (8-tap tent)      -> the WIDE band
4  up         320x180 -> 640x360        (8-tap tent)      -> the TIGHT band
5  composite  base + tight*1.0 + wide*0.8, both through lerpBloomFactor
```

**Five renders, four render targets**, against Unreal's twelve and eleven. Every tap is offset to
land between texels so the GPU's bilinear filter fetches four texels per sample for free.

<!-- CORRECTED 2026-08-21. This section originally read "four passes, two render targets", which
     described an earlier draft. The mip-composite rework needs each reconstructed level to SURVIVE
     as its own frequency band, so the up-chain got its own targets and a same-resolution seed
     blur. Counted from the code, not from memory. -->

**Ported to the live scene 2026-08-21.** Until then this decision was only true of the tuner page:
`three-shared.js` still imported `UnrealBloomPass`, and `redesign-lab/cheap-bloom.js` hot-swapped
Kawase in at runtime over the top of it. The pass now lives in the bundle, the lab copy is retired
to a pointer note, and there is no runtime swap. In the move it lost `setLevels` and the
generated-for-N composite (fixed at 2), the bright pass and `threshold` (deleted, not just skipped),
and every kernel weight became a named GLSL const.

**Brightness had to be matched deliberately.** Rod: *"the unreal bloom is definitely doing something
to the exposure."* He was right, and it was energy, not tone: Unreal's composite sums five mips
weighted `[1.0, 0.8, 0.6, 0.4, 0.2]`, summing to 3.0, so at identical `strength` it deposits ~3x the
light of a single-texture composite. The Kawase pass therefore uses Unreal's own per-mip composite
(`lerpBloomFactor(f) = mix(f, 1.2 - f, radius)`), which is why `radius` still rebalances tight
against wide the way the stock knob did.

**No threshold is deliberate.** With the bright-pass skipped the whole frame blurs and is added
back, which lifts the dark water as well as the lanterns. That matters because of the finding below.

**DELETED the same day, having lost on look rather than cost:** the single-pass variant (bright +
9-tap blur), the plain additive composite, and the paper-grain experiment. Rod: *"just remove the
grain its not what i wanted."* The implementation switcher is gone too, and as of the 2026-08-21
port so is `window.__stockBloom` - the bundle builds Kawase directly, so there is no stock pass left
to A/B against.

**THE FINDING THAT OUTLIVES THIS DECISION: the scene has no lights at all.** `grep` for
`AmbientLight|DirectionalLight|HemisphereLight|PointLight|SpotLight` across `_javascript/` returns
nothing. Lanterns are visible only because their material is emissive, and the water is a mirror
whose sky was `scene.background = 0x080f1b` - rgb(8,15,27), almost black. **Bloom was functioning as
the scene's lighting rig**, which is why removing it made everything read unlit and why tone mapping
could not rescue it (exposure multiplies, and anything x near-black is still black). The water shader
already carries a moonlight model - `uSunLift`, `uSunDiffuse 0.13`, `uSunColor2 0xaec6f0` - which
was dialled almost to zero (`uSunLift 0.2`) because bloom was doing the job. Sky, water colour and moonlight are now
live sliders in the tuner. Lighting the scene properly is still open.

**FIRST MOVE ON THAT, 2026-08-21 (Rod):** the sky went to `0x162237`, bloom strength/radius to
0.7 / 0.15, and `uSunLift` from 0.2 to **1.5** - the top of the tuner's range, so the moonlight model
that was sitting dormant in the water shader is finally carrying load. Rod's reasoning: *"previously
the unreal bloom acted as the light source on the site but now its dead so the background is almost
pitch black."* At those numbers the composite adds
`0.7 * (0.88 + 0.74) = 1.13x` the frame back as glow against `0.45 * 1.8 = 0.81x` before, so ~1.4x
more light, on top of a sky that is no longer near-black. Tone mapping was considered and REJECTED
as the fix for the same reason it failed before: exposure multiplies, and near-black x anything is
still near-black. The renderer stays on `NoToneMapping`. This is a first pass, not the lighting rig
- request #40 is still open.

## D25 - Layout changes need Rod's direct, confirmed instruction (2026-08-22, ROD) - STANDING RULE

Rod: *"after every change you NEED to check if it changed the layout. if not continue, if so
remember only I the user can ask for layout changes and they always need to be direct and
confirmed."*

Two halves, both binding. **A check after EVERY change**, not only layout-shaped ones - a colour
edit can still reflow. **And if something moved, it needed his direct instruction first.** Not
inferred from a nearby request, not justified as a side effect of a fix, not "it looked wrong".

**Why it exists:** a request for a text backing and one for heading colour turned into a page-width
change, the backing moving from the column to the measure, a new vertical rhythm, and a zone label
being added. Some of that was defensible; none of it was asked for. Rod reads the rendered page, so
unrequested movement is the first thing he sees.

**The corollary that caught a real bug:** lab chrome must never move the design. The `RAW` badge's
`border` was holding the rail's metadata rows to 275px inside a 277px column. It is an `outline`
now, which is painted outside the box model.

Applied retroactively the same day: four unrequested layout changes were put to Rod, he kept one
(heading sizes) and rejected three, all reverted and verified by before/after snapshot.

## D26 - The landing's remaining picks (2026-08-22, ROD)

Four calls made while building `final-landing.html` out. Each is recorded with what it cost, because
each has a live alternative that will otherwise be re-proposed.

**1. SECTION HEAD = the centred ornament head**, kicker removed, hairline added, label links to its
section. Chosen from four candidates on `section-head-tests.html`, all of which were OUR builds.
Filed origin ROD, not provenance.
*The parent device is real and was measured:* harumakigohan.com's section headers are drawn PNGs
(`m_*.png`, `m_` = midashi), fixed 30px tall, structured squiggle | white label | squiggle, label
`#f0f0f0` and ornament `#f078f0`. That page has **124 images and ZERO html headings**. Our typed `~`
is a STAND-IN for their drawn wave, and gold replaces their pink. **Asset owed** - Rod: "we will
replace this with hand drawn text later like the header art."

**2. SKILLS ROW = simpleicons.org marks (CC0), stroked in deep gold, drawing in.** Seven tools:
Unity, Unreal, Godot, Blender, Maya, Python, Git.
- REJECTED: devicon's full-colour multipath marks, which Rod initially chose. They kill the draw-in
  (it needs one path) and they fail contrast on the night ground - see TRAPS.
- REJECTED: re-drawing "cartoony" icons the way the old set was made. That set was AI-drawn
  approximation - `draw-in-icons.css` says so itself - and its charm was a failure mode. The honest
  route to the same look is a procedural wobble over real geometry (`icon-wobble-tests.html`,
  feTurbulence displacement), which is D10's side of the line. Not adopted; Rod: "not worth it."
- **C#, HLSL and Compute are ABSENT rather than faked.** Simple Icons carries no C# (verified
  against their 3,453-icon index) and the other two are not products, so no mark exists.

**3. FOOTER = one quiet line**, the lab `.labtag` treatment promoted to a real element. Origin ROD.
It is a footnote, not a second navigation, because the top bar already carries the nav.
It SUPERSEDES the circular-citation `site-footer` component rather than fixing it; that one should
be retired at port time.

**4. DEMO REEL = a random placeholder.** Rod: "just make it pull random video files from the site
for now we will fix it later." Nothing has changed about why he pulled it on 2026-08-18: it still
has no source. Random content is a stand-in, not a design.

**Post page, same batch:** measure LOCKED at **94 characters** (767px), chosen over 72 after an A/B.
It is Catlike Coding's 768px re-expressed in our narrower face. Held as a CHARACTER COUNT, not a
column span, because a column count drifts on a fluid spine. Spine = **1401px**, stripe's own grid
width, which puts the rail on 350px and the body on 701px - the blockout's annotated numbers.

## D37 - The H0 site mark is the line boil (2026-08-23, ROD)

Rod's three scratch fonts landed and unblocked P100. The mark on the landing hero now boils.

**THE PATTERN, his pick:** *"Sequential per glyph 6sec on 4's looks best for me."* Sequential order
(every glyph runs 1,2,3 in turn), per-glyph phase, each glyph starting on a RANDOM face, 6/sec.

**Why that is the right pick and not just a preference.** The traditional recipe is three drawings
cycled IN SEQUENCE on 2s-4s - three is already the canonical count, so adding fonts was never the
lever. The craft rule that comes with it is *draw the three with as little deviation as possible or
the boil looks too jumpy*, which is why a 3-frame loop reads as texture rather than as a loop. Rod's
pick lands on that tradition; the random ORDER option that also exists is a digital patch for
deviation being too large.
**REJECTED:** more fonts (the loop comes from the sequence, not the count - and per-glyph phase
already gives 3^10 = 59,049 renderings of a ten-letter line); random order (works, but departs from
the tradition for no gain once the faces are close).

**THE RANDOM STARTING PHASE IS LOAD-BEARING.** Without it every glyph increments in lockstep and
per-glyph renders identically to swapping the whole line - measured, 3 distinct states in 24 ticks.

**THE ADVANCE HAS TO BE PINNED, and the vertical case is NOT the horizontal one rotated.**
The faces do not share metrics: 55 of 68 glyphs differ. Horizontally "RODNEY FAN" drifts 4.26%.
**Vertically it drifts 100px** because the faces have different ascent/descent. And under
`text-orientation: upright` **every glyph advances by the same em box**, so per-glyph widths carry
no information at all - the vertical pin is ONE uniform advance for every cell, the space included.
A fixed `line-height` does not fix it; measured, still drifting.

**WHAT CHANGED ON THE HERO.** `--font-hand` (Caveat) was always the placeholder - `decisions.css`
said H0 was "PROVISIONAL BY DEFINITION ... being replaced by the line boil". Colour corrected from
`--color-gold-deep` to the H0 token `#f86a03`. **Size deliberately unchanged** - the clamp is part
of the locked V6 composition and Rod asked for font and colour.

**KNOWN GAP: the faces contain no digits.** Measured - `0` and `7` render at the fallback width in
all three. So the hero clock cannot use this yet. If Rod cuts three digit faces **tabular**, the
clock becomes the EASY case rather than the hard one, and the reason it was routed to procedural
jitter (a digit changing every second compounding with the boil) disappears.

## D36 - CSS cascade layers replace the specificity war (2026-08-23, ROD)

Rod: *"i feel like this nesting is really bad in general and we should design this better ... i
mean this is how CSS is intended to be used to begin with."* Then, seeing it: *"So after looks
alot better so its approved."*

**THE LAYER ORDER, and it is the whole decision.**
`@layer reset, tokens, prose, components, overrides;` repeated at the top of every lab stylesheet -
idempotent, so each file is correct on its own whatever a page loads. reset=foundations.css,
tokens=extracted/styles/*, prose=decisions.css, components=extracted/components/*,
overrides=focus-ring.css.

**What it replaced.** Eight components had 53 declarations losing to `.prose` element rules, worst
case rendering dark text on a dark panel at 1.06:1. The two candidate patches both made the
COMPONENT apologise for where it was put - either scoping it under `.prose` (costing portability)
or doubling its own class (costing legibility). Layers make the question disappear: a component
never has to know prose exists, and **all 53 declarations stayed exactly as written.**

**REJECTED: `:where()`.** It also worked, and it is a smaller change - one file. But it flattens
specificity INSIDE prose too, and measuring found a real regression: `ol li` line-height 24px ->
20.8px, because `.prose ol > li` currently outranks `.prose li` and `:where()` makes them equal.
Layers preserve normal specificity within a layer and only change precedence between layers, which
is the property actually wanted. Also worth knowing: a regex rewrite caught only 38 of 58 prose
selectors, so that route needs a parser, not find-and-replace.

**Option B over option A, Rod's call.** Where a component restated type the ladder already owns,
the COMPONENT defers. Scope was far smaller than estimated - **5 declarations across 2 files**
(section-head 2, merged-card 3), verified by diffing live against the frozen copy declaration by
declaration. Interaction states and pseudo-element ornaments were deliberately left with the
component: a `:hover` colour is not the base ladder value.

**THE ONE FOOTGUN, and it cost 40 pages.** Unlayered CSS beats every layer. Any page keeping its own
`*{margin:0;padding:0}` in an inline `<style>` now outranks every component it loads. See TRAPS.

**Not settled by this decision, and it is the next question:** each page's inline `<style>` is still
unlayered, so a page can silently beat both the ladder and any component. The proposed answer is a
LINT that fails on any unlayered rule in a `final-*` page, rather than a wrapper - a `page` layer
above `prose` changes nothing, and escalating decisions.css's selectors would contradict that file's
own documented strategy of matching page specificity and relying on load order.

**A frozen copy of every pre-refactor stylesheet is served at `redesign-lab/original-css/`**, which
is what makes `layer-diff.html` able to render before and after side by side rather than describe
them. The whole refactor reverses by copying that directory back.

## D35 - Code syntax colours: Rod's role list wins, constants take the dark blue (2026-08-23, ROD)

Rod, after seeing both readings drawn side by side: ***"Keep dark blue for constants but 100% a."***

**WHAT IT CORRECTED, and this is the reason the tab existed.** `decisions.css` held Dark+'s values
under a comment claiming it followed Rod's role list. It did not: `--syn-type` was `#569CD6` BLUE
where he said orange, `--syn-func` was `#DCDCAA` YELLOW where he said pink, and an unused
`--syn-orange` sat in the same block. **Two of four roles had rendered against spec for as long as
the file existed**, under a comment asserting the opposite. Nothing errored, because a wrong colour
is still a valid colour. **A comment is not evidence** - the same shape as a provenance header not
being provenance.

**THE FINAL MAPPING.** orange `#ce9178` types and storage keywords - **dark blue `#569cd6` named
constants** - light blue `#9cdcfe` plain variables - green `#4ec9b0` classes and type names -
pink `#c586c0` functions.

**The refinement is the interesting half.** Rod's original list gave constants and variables ONE
hue. Seeing it rendered, he split them - and the dark blue he wants for constants is exactly the
`#569CD6` that types vacated by going orange. So `--syn-const` is a new token and `.tok-const` no
longer shares `--syn-var`. **Nothing was invented to do it:** the hue was already in the file and is
now simply on the role he wants. Every value here remains Dark+'s own, mapped to HIS roles rather
than theirs, which is precisely what made option A cost no new colour and why it was cheap to pick.

**WHAT COUNTS AS A CONSTANT - Rod corrected the demo, and the correction is the durable part.**
*"constants should be in SCREAMING but alot of the uses of the constants are in _camelCase."* He was
right: the first sample marked `_Cutoff`, `_EdgeWidth`, `_NoiseTex` and `_EdgeColor` as constants,
and they are shader UNIFORMS. The leading underscore is Unity's property convention and their values
change per material and per frame. **The demo was teaching the wrong rule while being used to judge
the rule.** So the highlighter binds by NAMING, not by position:
- `.tok-const` - **SCREAMING_SNAKE_CASE only**, fixed at compile time (`#define MAX_STEPS`,
  `static const EDGE_SOFTNESS`).
- `.tok-var` - everything that varies, **including `_Prefixed` uniforms and buffer names**. A uniform
  is a variable that happens to be set from outside.

**One case left undecided rather than guessed:** HLSL SEMANTICS (`POSITION`, `TEXCOORD0`,
`SV_Target`) currently sit on `.tok-const` because they are fixed reserved names, but `SV_Target` is
not screaming and they are arguably closer to keywords. One word from Rod moves them.

**Provenance.** Ledger row added as its own element, **Remixed / rod** - separate from the code
block CHROME row, which is a different element with a different source. The VALUES are cited to
Dark+; the MAPPING is Rod's. This is one of the few **rod**-origin rows in a ledger where almost
every entry reads "theirs".

**Measured, against the composited ground `rgb(10,14,34)` rather than the block's own
`rgba(0,0,0,.34)`** - measuring against the rgba would have flattered every number by treating the
ground as pure black. At 12.48px the threshold is 4.5:1: type 7.23, const 6.48, var 12.82,
class 9.38, func 6.87, number 11.25. All pass.

**TWO THINGS LEFT OPEN, neither caused by this decision:**
- **Strings share the type orange.** `#ce9178` is Dark+'s string colour and types now hold it, so a
  string and a type render identically. Dark+ has no second string hue to fall back on, and HLSL -
  the language in every code block on this site - barely uses strings, so it may never show. Left
  alone rather than invented around; if it shows, it needs one value from Rod.
- **`--syn-comment: #6a6a6a` measures 3.53:1, below AA.** A placeholder held neutral pending the
  green-vs-comments conflict (Dark+ puts comments on green, Rod put classes there). Pre-existing.

**A caveat worth stating plainly: no page renders a highlighted code block yet.** Zero `.tok-*`
spans exist in any markup, so this decision is correct in the CSS and currently only visible on
`text-decisions.html#code`. The highlighting itself is unbuilt.

## D34 - The trophy wall IS the control panel, and reduced motion is out of scope (2026-08-23, ROD)

Two calls made in one message, and the first one closes a question that has been open since D20.

**ACHIEVEMENTS ARE CONTROLS.** Rod: *"the three.js scene should remember what achievements you have
and when you click on that particular achievement it toggles what it unlocked. this will persist
elsewhere in the scene as well."*

**What it answers.** D20 took the three toggles out of the top bar and explicitly left "where the
toggles GO" open. D21 answered it with one combined scene+motion control and never said where that
control sits, so it was never built and no final page has one. **The answer is that it does not need
a home in the chrome: the trophy wall is the control surface.** A tile is two things at once, the
record that you found something and the switch for it, which is why it needs no separate UI.
**D21's combined control is therefore retired** - its function moved rather than disappeared.

**Its relationship to D28, stated rather than smuggled.** D28 scrapped every reward outright
(*"lets scrap the idea of unlocks they get an achievement and thats fine"*) and retired D12. This
does NOT reinstate that. Nothing is gated behind progress and nothing is withheld until you earn it.
The tile is a control, not a prize. What changes is that the wall stops being purely a display.

**What it costs.** Scene state has to persist across pages, so this needs real storage and a defined
default - and 19b is still open, which is the same class of problem (state living only in a browser).
The build sits behind the About scene (P179) and the tile rebuild (P182), both by Rod's own
sequencing: *"we should settle about scene before building this again."*

**REDUCED MOTION IS OUT OF SCOPE.** Rod: *"as for reduced motion and other features we are ignoring
that even if it might be 'more accessible'."* His site, his call, recorded as a decision so it stops
reappearing as a bug.
- **Closed as WILL NOT DO:** gate 5 item 32 (`body.motion-off` has no stylesheet reacting to it),
  item 33 (four component stylesheets with no reduced-motion guard), and the portal component CSS
  having no `prefers-reduced-motion` path.
- **Not a strip, a stop.** `drift-magnet.js:257` already adds `motion-off` from the OS preference and
  stays. This is a decision not to build more, not to remove what exists.
- **One item flagged once and then dropped, because it is a different category:** the fireworks flash
  audit is WCAG 2.3.1 Level A, a photosensitive-seizure threshold rather than a comfort preference,
  and it has never been measured - so nobody knows which side of three-flashes-per-second it lands
  on. Recorded here so the decision is on the record whichever way he goes.

## D32 - The component layer: 22 built, ~20 picked (2026-08-23, ROD)

Two batches, every component built from a reference brief that **re-fetched its source live**
rather than trusting the saved note. Briefs kept at `redesign-lab/analysis/reference-briefs/`.

**THE PICKS.** callout **V1** (flamedfury shell) - code block **V1** (Rod's own scheme) - figure
**V2** (silver caption) - table **V2** (effect not literal, and it scrolls) - related card **V2** -
prev/next **a new V4**, two related-cards in two lanes - heading anchor **V3** (always visible) -
TOC **V3** - search bar **A** - empty state **V1** - filter pills **REBUILT** - page title **V1** -
entry row **B** - view all **C as a drop-in swap** - status chip **A**, terminal at 675x172 -
portrait **V3** named window - bio block **V4**, V1's panel with V2's heading line.
**Still open:** achievement tiles (V2 preferred, three more sourced from real systems).

**SKILL TILE AND FLIPPER ARE DROPPED, not pending.** Rod: *"lets not do extra work and keep it the
same as it is now."* The approved `skills-row` stands.

### Three things Rod caught that were build errors, not preferences

1. **The view-all button was changing the layout.** Versions A and C shipped a `.va--row` wrapper
   replacing the ROW, when the ask was to swap the BUTTON inside the row the landing already has.
   Rebuilt as `.va--swap`, deliberately empty of layout - no display, margin, width or position.
2. **The search bar and the filter pills already existed on the workbench.** `list-controls` has
   `.list-controls__input`, `.list-controls__filter` AND `.is-active`. Two agents rebuilt what was
   already built and approved. **Check the workbench before sourcing anything.**
3. **The review page was squeezing components.** A 3-up grid at 320px rendered 767px components at
   ~206px, so every proportion read wrong. That was the PAGE's fault, not the components'.

### The rule this produced

**REUSE BEATS SOURCING WHEN THE THING ALREADY EXISTS AND IS APPROVED.** Three components now
actively reuse rather than rebuild - view-all takes button-kit's outline variant, prev/next takes
the related card, filter pills take list-controls' behaviour on button-kit's tag box. Each reuse
also surfaced law debt in its parent that a rebuild would have hidden: `.kit-tag` carries the
banned `--color-muted` and a 6px radius; `tag-badge`'s line-height puts the entry-row tag strip
6.8px over its reservation. **Fix those at the parent, not in the child.**

## D33 - Two bugs that made earlier judgements invalid (2026-08-23)

Both found by audit, both verified independently before acting, both fixed.

**THE TYPE LADDER WAS NEVER RENDERING.** Pages requested `wght@400;500;700`; `decisions.css` asks
for **100 and 300**. Neither face loaded. **Measured: 100, 300 and 400 all rendered at exactly
438.25px.** So D31's central rule - *hierarchy is size and tracking, never weight* - was collapsed
to a single weight, and **every judgement made before this fix was against weight 400.** Fixed on
22 files; re-measured all distinct.

**THERE WAS NO FOCUS INDICATOR ANYWHERE.** `generic.css` holds the ring and was linked by **zero**
of the six final pages. Six components declined to write their own on the grounds that they inherit
it. WCAG 2.4.7 and 2.4.11 failing sitewide. Extracted to `redesign-lab/focus-ring.css` - *not*
`generic.css` wholesale, whose `body{background}` would flatten the scene ground.

**THE PATTERN, and it is the transferable part:** a name that resolves to a fallback **renders
wrong without erroring**. Three instances in one session - the font weights, `--nav-h` (used 9x,
defined never, hiding the mobile TOC under the top bar), and `--color-muted-warm` (used 3x, defined
never). **A token or a weight that looks right is not evidence. Measure it.**

**Also fixed:** the anchor scroll offset was applied twice and the two ADDED, overshooting every
in-page jump by 80-116px. `toc-real.css` was also the only bare-element global selector in all 22
components - which is how a component file reached out and changed the whole page.

## D31 - The text system: one ladder, one colour ramp, 23 picks (2026-08-23, ROD)

> **PARTLY SUPERSEDED. The ladder's SHAPE survives; its numbers and two of its colours do not.**
> Corrected 2026-09-02 against the code, which is the truth here. What the ladder renders now,
> MEASURED in `_sass/base/_decisions.scss`:
>
> | rung | size | weight | colour | file:line |
> | --- | --- | --- | --- | --- |
> | h1 | `3.84rem` = 61.44px | 500 | `--color-orange` `#f86a03` | `_decisions.scss:75-77`, `:29-30` |
> | h2 | `2.4rem` = 38.4px | 500 | `--color-gold` `#fbbf24` | `_decisions.scss:92-93`, `:31` |
> | h3 | `1.5rem` = 24px | 500 | `--color-gold` `#fbbf24` | `_decisions.scss:147-148`, `:36` |
> | h4 | `0.9375rem` = 15px | 500 | `--color-silver` `#a3a19d` | `_decisions.scss:168-169`, `:37` |
>
> Three separate later calls did it, and each is cited in the code beside the value it changed:
> - **The sizes** became a constant x1.6 at the port, 2026-08-25. D38's 101/48/24 was fluid at h1
>   and drifted from 1.87x at 1024 to 2.63x at 1920, so h1 read as a missing level. See D38's own
>   superseded note and `docs/STATUS.md` "The type ladder is settled, and H1 is now on it".
> - **The weight** went 300 to 500, Rod 2026-08-25 (*"i dont like the current sans font ... i want
>   to do a rounded sans"*): the face was already M PLUS Rounded 1c, but at Light on a 61px heading
>   the rounded stroke ends are too thin to read as rounded. `_decisions.scss:69-74`. Weight is
>   still not the hierarchy, because it is now the SAME on every rung.
> - **The colours** moved twice. H0/H1 are `#f86a03`, not `#ff6a00`, Rod 2026-08-23 (*"H1 and H0
>   should be #f86a03"*), a new token rather than a repoint of `--color-glow`. **H3 went GOLD**,
>   Rod 2026-08-24 (*"H3 should be yellow too"*), taken as the whole rung. Only H4 is silver now,
>   so "headings recede, prose leads" still happens but one rung later.
>
> Everything else in D31 stands: the H0-H4 role structure, the 23 picks, the two process notes, and
> the still-open WCAG heading-order failure on the post.

Judged on `redesign-lab/text-decisions.html`, which replaced four separate comparison pages
(`prose-blockout`, `component-blockout`, `callout-tests`, `orb-callout-tests`) after Rod:
*"Rather than making alot of comparison pages just add things to the component block out rename it
to Text decisions... and add tabs so i can just see and choose the things i like the most."*

**THE FINDING THAT RESHAPED THE WHOLE PASS.** Counted across all 19 posts: `takeaway:` appears in
**14 of 19**; TL;DR, blockquote, admonition, pull quote, margin note, h4 and `hr` appear **zero**
times. Rod: *"im realizing we might have been doing all of this for nothing."* He was right - six of
the seven callout candidates answered a question his writing had never asked. **The callout system
was already finished for the content that exists**, and everything else is "do you want to start
writing this", which is a content question, not a design one.

### The heading ladder - ACCEPTED, and it is layout-affecting

Rod: *"we are about to have many different headings... these should be consistent throughout the
pages."* He was right, and it was worse than suspected. **Five contradictions, all measured off the
six `final-*` pages at 1440, not read off class names:**

1. **H1 meant two things** - landing 33px w700, post 101px w300. Same tag, 3x size, opposite weight.
2. **H3 meant three things** - 36px/w100, 27px/w700, 20px/w700.
3. **The landing's scale was INVERTED** - its H3 (27px) was larger than its H2 (24px).
4. **Weight ran in opposite directions** - the post follows stripe's rule that hierarchy never uses
   weight; landing and about ran 700 everywhere, which is that rule inverted.
5. **The post SKIPS H2**, running h1 straight to h3 - a **WCAG 1.3.1 heading-order failure** that
   must be fixed whichever scale wins. **Still outstanding: it is a MARKUP fix, and styling h3 to
   look like h2 would hide the failure rather than fix it.**

**The ladder (structure is Rod's, the ladder itself is OURS - no source supplies it):**
`H0` site mark - `H1` page title - `H2` section break - `H3` subsection - `H4` card/item title.

### The colour ramp - and it deliberately inverts at the bottom

**AS DECIDED HERE, and two of these four are no longer what renders:** `H0`/`H1` **signature
orange** `#ff6a00` - `H2` **yellow** `#fbbf24` - `H3`/`H4` **silver** `#a3a19d` - **body PRISTINE
WHITE** `#f5f3ef`. Bold takes the H2 yellow.

**WHAT RENDERS NOW:** H0/H1 `#f86a03` (Rod 2026-08-23, three shades off the orange written above),
H2 and **H3** both `#fbbf24` gold (H3 moved 2026-08-24), H4 `#a3a19d` silver, body `#f5f3ef`. The
table at the top of this decision is the current state; the paragraph above is what was picked.

Rod: *"keep the pristine white text for the things we are going to be reading the most often."*
**So body copy is the brightest thing on the page and H3/H4 sit UNDER it - headings recede, prose
leads.** That is the interesting part of the call and it is intentional.

**MEASURED against the reading well `#080f1b`, and the finished ramp does NOT descend by
brightness:** body 17.31 > H2 yellow 11.49 > silver 7.44 > **H0/H1 orange 6.68**. All clear WCAG,
but the two most important headings are the lowest-contrast text on the page and silver
out-contrasts them. Flagged to Rod as a deliberate call rather than an accident.

**THESE FOUR NUMBERS ARE FOR THE RAMP AS PICKED, NOT AS SHIPPED**, and nobody has re-measured since:
H0/H1 changed hue and H3 moved from silver to gold, so there are now three rungs at 11.49 and one
step of silver. The shape of the finding (headings sit under body text) is unchanged. Re-measuring
against `#080f1b` is an open job, not a claim this doc can make.

- **Silver was DERIVED, not invented** - `color-mix(--color-text 62%, --color-panel-solid)`, from
  two tokens already approved. Of three candidates only this one keeps the ramp monotonic: the
  brighter one (9.51) beat gold-deep and broke the descent; the third (16.40) was within a hair of
  body white and was not silver at all.
- **HAZARD RECORDED:** `--color-muted` `#9aa3bd` is a **blue** grey and is the last blue in any text
  token. It is the obvious bottom step of a ramp and must never be used as one.

### The picks

**Body:** measure 94ch (Rod's, P33) - links **stripe** hairline that inverts on hover - inline code
**Maxime** bordered chip, squared, shadow dropped as a glass tell - bold **acegikmo treatment,
remixed** (their custom-element mechanism cannot survive markdown, so it becomes `strong{}`) -
`del`/`ins` **catlikecoding**, the only source that has them - lists **Maxime nested counters**,
which is the same mechanism as the approved section break, so headings and lists now share one
numbering logic - `sup` **gwern**, `vertical-align:baseline` so footnote markers shrink but never
rise - `sub` and `abbr` **accepted as browser defaults**, which for `abbr` is a decision NOT to
style it - **`kbd` and `mark` REJECTED** outright.

**Blocks:** code block **Maxime header strip squared** (already D20; the page was still asking, and
Rod caught it) - figure **catlikecoding no-mat with a LEFT-aligned caption** (their centring
dropped, so it is a remix) - hero media **no special treatment at all**, all three mask candidates
rejected, a hero is just a figure - table **iquilezles body + scroll wrapper with acegikmo's
coloured `th` in the H2 yellow**, squared, their four semantic cell states NOT taken because the
palette law bans red and cool.

**Navigation:** TOC **Starlight** rail + mobile popup - prev/next **TheRealMJP** split halves, no
box - tags **squares, OURS** (the live `.post-tag`, squared) - meta rectangles **`.kit-button`**,
squared, **and it inherits button-kit's circular-citation warning, which does not go away by being
reused** - related post cards **the project card minus blur, band reveal and hover shadow**, plus a
border-colour focus state because a motionless link still needs an affordance (WCAG 2.4.7).

### Two process notes worth keeping

**A pattern showed up three times in one session: the page kept re-asking questions Rod had already
answered.** The callouts (answered 08-22), the meta chips (answered 08-21, with the ledger already
recording the external sources as UNUSED), and the code block (answered in D20). Each time he
caught it. **The cause is that decisions were landing in `DECISIONS.md` and never being reflected
back onto the judging surfaces.** `decisions.css` now exists partly to close that gap.

**Rod's own instinct beat the process twice.** He spotted that the callout work was largely wasted
before the count was run, and he was right to push back on "the pull quote cannot be taped", which
was overstated. Both are recorded because the corrections are the useful part.

## D30 - The callout family exists, and tape COLOUR now means TYPE not SECTION (2026-08-23, ROD)

**THE FAMILY IS CREATED.** Rod: *"lets create the callout categories im sure we can find places to
use them."* Five categories, each with one washi-tape placement and one hard-coded colour:

| category | tape placement | colour |
|---|---|---|
| warning | D - four diagonal corner tabs | **pink** `#f078f0` |
| note | A - over the top edge | **green** `#6fbf73` |
| tldr | B - down the left edge | **orange** `--color-glow` |
| quote | C - L-shaped corners | **blue** `--color-accent-cool` |
| reference / links | **none** | - |

Rod's words: *"for warning use the green D washi tape, for notes use A, for TLDR use B, for qoutes
lets use the L shaped C"*, then the colour pass: *"we should hard code the colors in a way that
makes sense maybe red for errors, green for notes, blue for quotes?"* and the correction *"do pink
for warning instead my mistake."* Orange falls to tldr by elimination. Reference takes no tape:
*"reference i guess should have no tape"* - it is end matter, not an interruption.

**CORRECTED 2026-08-23, and the correction matters because the first version overstated it.**
This was written up as "overturning the colour half of D27". Rod pushed back - *"im confused as to
what this means because im not sure if you misinterpreted me or what because site sections
genuinely do not have different colors"* - and **he is right. It was checked and there is nothing
to overturn:**

- **No `final-*` page assigns a per-section tape colour.** Zero hits.
- **No section-colour token, class or variable exists anywhere in the lab.** Zero hits.
- The four colours appear only on bench pages: `washi-tape.html`, `achievement-tests.html` and
  `text-decisions.html`.

So D27's *"in the blue, green, pink, and orange for different sections"* was **a stated intention
that was never built**. D30 does not overturn a working system; it **redirects an unbuilt plan
before it was ever implemented**, which costs nothing and unwinds nothing.

**D27's other half was real and still holds** - the tape is the site's one loud object, colour is
concentrated in one component rather than spread, and the cards stay plain, grey and untextured.

**There is therefore NO section-colour hole.** The earlier claim that "sections no longer have a
colour identity via the tape" described a loss that never existed. If sections ever want a colour
identity, that is a fresh question with nothing behind it, not a regression created here.

**The lesson, since this is the second time in one session:** check whether a decision was ever
IMPLEMENTED before describing a change to it as an overturn. A decision recorded in this file is
not the same as a decision that shipped.

**Two things this decision also settled:**

1. **"Note" and "warning" SPLIT.** Rod named them separately, so `final-post.html`'s single
   `note / warning` slot becomes two categories. The post now reserves five callout slots, not three.
2. **The quote gains a card, and that contradicts its own sources.** L-corners need corners to sit
   on. Both pull-quote references deliberately refuse a box - Maxime escapes the measure at 118%
   width with no border or fill, stripe uses a plain italic paragraph with no ornament. So the quote
   stops being a *pull quote* and becomes a *quote callout*. **Originated, not transcribed**, and
   the ledger says so.

**A correction on record, because the reasoning was wrong before it was right:** the earlier claim
that a pull quote *cannot* be taped was overstated. Rod pushed back - *"any reason the pull quote
cannot be taped?"* - and he was right. Tape is absolutely positioned against a host needing only
`position:relative`; it needs no border, fill or card. The honest objection was "has no precedent",
not "cannot". Both versions were then drawn rather than argued about.

**Colour provenance:** orange and blue are ours already, **pink is measured** off harumakigohan's
own section-header PNGs.

**GREEN IS SETTLED, and the earlier "no source, still Slop" framing was wrong.** Rod:
*"the source is the other tape components the only thing that changed is its color idk what i would
need to source a color i chose."* He is right, and D27's own table already set the condition:
green *"wants sampling from a real asset **or Rod picking it**"*. He picked it. **The condition is
met and the thread is closed.**

The error was conflating two different things: the tape's MECHANISM is sourced (gneiss `.taped`
plus winterwind's tear, both read from live CSS), and only the colour VALUE is Rod's choice. A
colour the owner chooses has idea-origin ROD - that is a tracked, legitimate origin under the
provenance law, not a gap. **The law asks where an element came from, and "Rod picked it" is an
answer.** Filed origin ROD, not Slop.

## D29 - Paper is dead everywhere, and the callout question was malformed (2026-08-23, ROD)

**A0 - NO PAPER ON THE IMAGE MAT.** Rod: *"stick to A0 paper test was failure texture comes in from
the background anyways."* Rejected: A (gneiss `border-image` torn edge), B (tiled paper ground),
C (ibelick `feTurbulence` grain - the only one needing no asset).

**This is D27's reason applied a second time**, not a new one. D27 took paper off the cards because
"the background already adds some texture"; the same argument retires it on the image mat. Between
them, **paper is finished as a surface treatment** - there is no open question pointing at it any
more. `paper-tests.html`, `paper-tuner.html` and the baked height maps stay on disk, nothing
shipped, nothing to unwind. **The paper FILTER inside the three.js scene (D24) is a different
thing and is untouched** - that one is in the render, not on a surface.

**THE CALLOUT SET WAS ASKING A BAD QUESTION.** Rod, on being shown seven bracketed candidates:
*"decision 2 is weird i dont understand what im choosing between again these are all elements for
different things."* He is right, and the fix on 2026-08-23 - bracketing them so they read as
alternatives - only made the problem legible rather than solving it. Three things were wrong:

1. **One of the seven is a different KIND of thing.** The famicom.party margin note leaves the
   column into the gutter; the other six interrupt the column. That is a layout decision about the
   page, not a style decision about a callout, and it cannot be compared against them.
2. **Three of the seven are one thing wearing a settled convention.** Tape-on-top, taped corners and
   left-edge tape are three PLACEMENTS of the washi tape, which is already a locked site convention
   (D27 + the case-D build). Presenting them as rival callouts re-opens something closed.
3. **Rod had already answered the real question and the page kept asking it.** On 2026-08-22, in the
   element-gallery pass: *"i kinda like the flamedfury.com callout with the orb but move it to the
   top right instead maybe. For the washi tape ones i think it would be nice to have them overlay on
   top of the posts content box like a section is being stuck on the page."*

**The lesson worth keeping, because it will recur:** a comparison page is only honest if its
candidates are genuinely substitutable for each other. Seven things that do different jobs, some of
them already decided, is a pile with a border drawn round it. **Before building any future
comparison, check that swapping any candidate for any other would leave the page still working** -
if not, it is several questions and it should be several pages.

**What the callout question actually is, restated for next session:**
- *the default callout's look* - answered: flamedfury's orb, moved to the top right
- *where the tape sits on it* - answered: overlaying the content box, "like a section is being stuck
  on the page"
- *whether a margin note exists at all* - genuinely OPEN, and it is a layout call because it needs
  the rail's gutter

## D28 - The 2026-08-22/23 decision batch (ROD)

Eleven calls made across two days of judging. Grouped because they were made together and several
of them only make sense against each other.

**WASHI TAPE: case D, opaque, axis-aligned.** Rod: *"washi tape d remix"*, then *"keep opaque"* and
*"axis aligned"*. D is winterwind.com's irregular `clip-path` tear. Their pitch is unchanged - the
IRREGULAR spacing is the device, and a uniform pitch reads as a postage stamp. Two things are ours
and labelled: the AXIS (theirs is a long-edge tear on a 2px strip; ours runs on the two ENDS) and
the AMPLITUDE IN PIXELS - a percentage would resolve against `.tape--left`'s 300px+ height and bite
15px out of a 26px strip. **REJECTED, by measurement then by Rod:** the SVG-filter routes (Daniel
Jones' two-primitive squiggle, TornPaper.js's full chain) - both real and both more faithful to how
real washi tears, but they cost a filter and a rasterisation where a clip-path costs nothing.
**REJECTED by Rod after seeing them:** the transparent third band in the fill (case E) and the
5.42-degree rotation the real asset has (case G).
**A finding that outlived the decision:** the reference asset measures as a TEAR, not a serration -
ends wandering +/-6px in 2-3 broad lobes across a 116px width. Rod asked for a roller's serration
and picked the serration knowingly. Recorded because the two are different targets and the
distinction will come back.

**SECTION BREAKS: case G.** Catlike Coding's nested COUNTERS on acegikmo's ruled chapter DIVIDER.
Both halves verbatim; **the COMBINATION is ours** - no source does both. They merge rather than
collide because **neither uses SIZE to carry hierarchy**: Catlike de-emphasises the number,
acegikmo the type. So the counter ranks and the rule separates while the type stays quiet.
**REJECTED:** cyanilux's heading-as-a-card (Rod's ask almost literally, but it nests three opaque
fills deep before any prose and this site has a live scene behind it), dimden's boxed section,
MinionsArt's tinted block, and the two no-box options.
Follow-ups Rod called: the counter must SCALE with its heading (`0.68em`, which is Catlike's own
14/20 ratio) and heads/subheads take colour.

**ACHIEVEMENTS: dimden's box at 200x76, and EVERY reward is scrapped.** *"lets scrap the idea of
unlocks they get an achievement and thats fine."* **This RETIRES D12** (reward-as-unlockable)
outright - the fireworks unlock and all three lantern tiers go together. Confetti is deprecated in
the same breath and the popups are minimised.
**The consequence, stated because it changes what the system is FOR:** with no rewards, the trophy
wall IS the payoff and the popup's only job is to say "that went on the wall" and get out of the
way. That is why the smallest sourced option won.
**REJECTED:** zutomayo's fold-into-its-own-title-bar window (the most literal reading of
"minimise", and still the better mechanism if a window component is ever wanted), cyanilux's accent
bar, the taped card, and the no-box floor.

**SCENE TIERS: two, not four.** `full` = lanterns + fireflies + post-processing + dock + water, on
landing and about. `minimal` = lanterns + fireflies + post-processing, on projects, portal and
ramblings. **The POST page carries no three.js at all** - Rod: *"when i say none is the blob thats
exactly what i mean keep it like this"* - which preserves the 845 KB saving from 2026-08-21.
`bare` and `blobs` are deleted rather than kept unused.
**What this corrected:** the docs said "minimal everywhere but About". Measurement said otherwise -
every page was running the FULL scene, and `three-background-minimal.min.js` was loaded by nothing.
"Minimal" as shipped is 35 spheres with no lanterns at all, so Rod's ask to add them was real.

**COLOUR: warm grey.** `--color-panel: rgba(28,26,24,.55)`, solid `#1c1a18`. **ORIGIN IS ROD, not a
source** - the swatch was drawn as "a grey pulled 2 points warm" and labelled ours on the test page,
and he chose it knowing that. Alpha held at .55 so only hue moved and no box changed size.
**This finishes what D27 started:** with the cards neutral, the only blue left anywhere is the sky.
**REJECTED:** the blockout's own #141414/#1b1b1b/#1d1d1d ramp, cyanilux's #282828, and dimden's
translucent black - all sourced, all beaten by an unsourced warm grey, which is a legitimate outcome
when the person deciding is the one whose taste the site is.

**ABOUT IS THE LANDING.** Rod: *"about page is the landing page except the about me is the hero, the
achievements are the project cards."* Klubnika's 928px column is the picked layout (dimden survives
at `?v=panels` for reference), but the RHYTHM now comes from his own landing rather than a reference
site: hero fills the first screen with the landing's `min-height:520px` floor, sections at
`padding-block: 30px 60px`. **SUPERSEDES** the potg.art 200px rhythm used one pass earlier, which
was the right answer only while he had given no reference of his own.
Its type is the POST's, verbatim - which rests on P33, the 94-character measure.

**SYNTAX HIGHLIGHTING IS A CARVE-OUT FROM THE PALETTE LAW.** Rod: *"this is ok because its important
for readability and convention."* Code colour is exempt from the no-cool-accent/no-red rule AND from
D18's colour-last sequencing, on readability grounds. Said out loud because the conflict was real
and had been flagged as unresolved.

**AND TWO SMALLER ONES.** The top bar keeps a centred nav with lopsided gaps (213/48) - taste call
made, closed. The project cards' circular-citation objection is **withdrawn by Rod**: *"we made the
project cards together so its ok"* - origin is his, and only scaling remains open.

## D27 - Paper is OUT. The cards go grey, and the TAPE carries all the colour (2026-08-22, ROD)

Rod: *"i dont think paper is the play lets do something else. im thinking we just do normal
transparent cards in grey with no texture, the background already adds some texture, and we will
have the fun striped washi tape in the blue, green, pink, and orange for different sections and i
think that will be fine and good."*

**Three things at once, and they only make sense together:**

1. **No texture on the cards.** The scene already carries grain - `assets/tex/paper-*.png` runs
   inside the bloom pass (D24) - so a second texture on the card was competing with it, not adding
   to it. Cards are plain, transparent, grey.
2. **The tape becomes the site's one loud object.** Striped, in four colours, one per section.
3. **So colour is CONCENTRATED rather than spread.** That is the part worth keeping hold of: the
   design does not get more colourful, it gets colourful in exactly one place.

**THIS OVERTURNS T0-A**, recorded 2026-06-12 as *"warm + 1 cool"* - one cool accent, spent RARELY
on the single most-important mark per view, *"decided per-surface, not blanket-applied"*. Four
accents applied per section is the opposite of that sentence. Recorded as an overturn rather than
slipped in, because T0-A will otherwise be quoted back at this.

The reconciliation, for whoever hits the contradiction: the SPIRIT of T0-A survives - colour is
still spent rarely and deliberately, on one small object - while its LETTER (one cool accent) does
not. What changed is that the accent is now a component rather than a token used sparingly.

**Colour provenance, because three of the four already existed and one does not:**

| | value | where it comes from |
|---|---|---|
| orange | `--color-glow` `#ff6a00` | ours already, the ember |
| pink | `#f078f0` | **MEASURED** off harumakigohan.com's own section-header PNGs, pixel census 2026-08-22. Their ornament is this pink. |
| blue | `--color-accent-cool` `#3090a8` | ours already, sampled from the Gen'eiten flyers |
| green | `#6fbf73` | **NO SOURCE.** The one guess in the set. Wants sampling from a real asset or Rod picking it. |

**PAPER IS PARKED, NOT DELETED.** It was never applied to a shipped surface, so nothing needs
unwinding. What survives and is worth not re-deriving:
- `redesign-lab/references/paper/*-height.png` - the scene's own sheets with the height channel
  split out. The blue channel IS the height.
- `paper-tests.html` (A/B/C sourced options + the baked sheets) and `paper-tuner.html` (a real
  gradient map over the live scene).
- Three verbatim sources in `sources/`: gneiss border-image, gneiss ground, ibelick feTurbulence.
- The finding that outlives it: **only three sheets exist and the generator that baked them is not
  in the repo** (D24), so washi / cold press / wove is the entire palette of paper available.

## D38 - CASE G KEEPS ITS MECHANISM AND GIVES UP ITS SIZE (ROD, 2026-08-24)

> **SUPERSEDED ON THE NUMBERS, 2026-08-25 at the port. The reasoning below still explains WHY the
> quiet treatment moved down to h3, and that part holds; the four sizes do not.**
> The ladder is now a constant x1.6 at every rung and every width, weight 500 throughout:
> **h1 61.44px, h2 38.4px, h3 24px, h4 15px** (`_sass/base/_decisions.scss:75`, `:92`, `:147`,
> `:168`, MEASURED). D38's h1 was the only fluid size in the file and rendered 100.8px at 1440,
> 2.625x its h2, so the eye read a missing level between them; its ratio also drifted from 1.87x at
> 1024 to 2.63x at 1920. Weight 300 became 500 the same day, Rod's call, because M PLUS Rounded 1c
> only shows its rounded stroke ends at 500 or heavier (`_decisions.scss:69-74`).
>
> **Two things D38 left open or flagged are now closed by the code:**
> - *"`.section-head__name` renders 2.4rem while the post's h2 is 3rem. Two section-level headings
>   at two sizes."* They are ONE size now, both 2.4rem: `_decisions.scss:92` and `:572`.
> - *"At 48px a long heading eats the line, so one heading has no divider at all."* Gone. The
>   divider moved from beside the heading to under it (Rod 2026-08-24), so every heading gets the
>   same full-width rule whatever its length. `_decisions.scss:121-137`.

Rod, seeing the post: *"H2 isnt meant to look like how it is on the post page"*, then
*"hierarchies across the site should be consistent"*, then *"please do 2"*.

**WHAT D28 ACTUALLY SAID, because this is where the drift started.** D28 records
*"SECTION BREAKS: case G"* and its rationale is that *"neither uses SIZE to carry hierarchy ...
the counter ranks and the rule separates while the type stays quiet"*. **It never says h2.**
Mapping a section BREAK onto the top-level section HEADING was an implementation choice made
after the fact, and it is what produced a 22px h2 - 1.22x the 18px body, and THINNER than it at
weight 100 against 300.

**A NAMING TRAP WORTH RECORDING:** "case G" appears TWICE in D28 for different things. The washi
tape case G (the 5.42-degree rotation) was REJECTED; the section-break case G was approved. Same
label, opposite verdicts, which is why Rod asked whether he had misspoken. He had not.

**THE CALL.** The mechanism stays, the size comes back:
  h1  101px / 300   unchanged, the post title
  h2   48px / 300   stripe's own measured number, ALREADY transcribed in the post's heading
                    block - a value that existed, not a new invention. Keeps case G's counter
                    (0.68em, so it still scales) and its ruled divider.
  h3   24px / 300   the quiet one now. A sub-break under a real heading is what D28 described.
                    Raised from 17px, where it was SMALLER than the 18px body it headed.
  body 18px / 300
Steps: 2.10x, 2.00x, 1.33x. **Every heading now sits above the body text and none is thinner
than it**, which was true of neither h3 nor h4 before.

**BLAST RADIUS: the post only.** It is the only final page with a `.prose` container; every
other page's headings are component-scoped (`.section-head`, `.er-ttl`).

**LEFT OPEN, and it is the consistency question Rod raised:** `.section-head__name` renders
2.4rem / 38.4px on landing, projects and about, while the post's h2 is now 3rem / 48px. Two
section-level headings at two sizes. Aligning them moves three approved pages, so it is his call.

**A CONSEQUENCE OF THE SIZE, measured:** the ruled divider is `flex:1` on whatever the heading
leaves. At 48px a long heading eats the line - "Three Variants: X, Quad, ..." leaves the rule
**0px** wide, so that one heading has no divider at all. The other four measure 217-395px.

## D39 - BEHAVIOURS ARE SINGLE-PURPOSE AND STACKABLE (ROD, 2026-08-24)

Rod: *"something im realizing is actually we should probably do a splitting of all the
functionalities because i reuse alot of stuff. like magnetic should just be a behavior i can
stack with drift, border glow, etc. during our refactor we should do this and make sure we have
a bunch of single purpose components so we can mix and match what we need."*

**THE PRINCIPLE.** A behaviour is one thing that can be applied to anything. A component is a
thing that has behaviours. Today those are fused, and the cost is already measurable on this
project rather than theoretical:

- **drift-magnet** is TWO behaviours welded into one engine and one class. When Rod asked for the
  post's socials to stop moving, there was no way to remove DRIFT while keeping MAGNETISM - the
  only lever was stripping `.js-magnetic` and killing both. Stacked, that request is one class off.
- **`.ct-glow-card`** carries the edge glow, but the same glow was wanted on achievement tiles
  (P154). It could not be reused without dragging the card with it.
- **`.kit-tag` vs `.tag-badge`** - two tag styles existed doing the same job, and the second was
  built because the first was entangled with button-kit. Rod: *"why did we make a new tag style"*.
- **`merged-card`** scopes EVERY card rule under `.merged-cards`, so the container is load-bearing
  styling rather than layout. Removing it to change the grid stripped the cards entirely - that
  cost two wrong fixes in one day.

**WHAT THIS MEANS IN PRACTICE, when the refactor happens:**
  - one behaviour per file, each addable by a single class: `.js-magnetic`, `.js-drift`,
    `.fx-glow-edge`, `.fx-tilt`, `.fx-boil`, `.fx-flash`
  - behaviours must not assume their host. `.fx-glow-edge` on a card, a tile and a button should
    need no knowledge of which it is on
  - components own STRUCTURE and LAYOUT; behaviours own MOTION and LIGHT. A component may declare
    which behaviours it ships with, never re-implement one
  - a behaviour that needs config takes it from a data attribute, as drift already does
    (`data-drift`, `data-strength`), not from a variant class

**SCOPE.** This is a REFACTOR-stage change, not a now-change. The lab is mid-merge and rewriting
the component boundaries under it would invalidate picks Rod has already made. Recorded here so
the refactor starts from it rather than rediscovering it. See docs/REFACTOR-PLAN.md.

## D40 - D22 is LIFTED, and the port runs audit-first (2026-08-25, ROD)

*"d22 is officially lifted I do want you to clean up alot of the code in a audit before doing so we
have alot of repeated code and we should fix it for the architecture pass i talked about before."*

`_sass/`, `_layouts/`, `_includes/`, `_javascript/` and `_config.yml` are back in scope. D22 held for
the whole redesign so that lab churn could never break the shipping site; that reason expires the
moment the port begins, because the port IS the work D22 forbade.

**The order is audit -> dedupe -> port, not port -> tidy.** Rod's call, and the reason is that the
duplication is the thing being ported. Copying 25 components onto the live site first and
de-duplicating afterwards means de-duplicating twice the code, on a surface that is now live.

- REJECTED: porting first and cleaning later. Faster to start, and every day of it makes the cleanup
  bigger and riskier, on shipping pages rather than a gitignored lab.
- The architecture pass is the one already specced: **one behaviour per transform lane** (movement
  owns `translate`, size owns `scale`, anything needing perspective owns `transform` and is then the
  only thing on that element allowed to touch it). It is a naming rule, not a framework - net
  negative lines - and it fixes a collision that already shipped, where a tilt had to hardcode
  knowledge of a hover scale because both wrote `transform` and the last writer silently won.
- REJECTED, with numbers: a shared transform registry plus lifecycle contract. It adds ~75-90 lines
  to remove ~64 of real duplication. D5 (anti-bloat) says no. It starts paying at roughly four
  duplications; there are two.

## D41 - Lab tokens are renamed to the LIVE names (2026-08-25, ROD) - **SUPERSEDED SAME DAY by D42**

*"yes lab tokens get renamed to the live names."*

39 lab tokens against 317 live, two names in common, no mapping file (counted 2026-08-25, not taken
from the older note claiming 270). **The diff therefore lands in `redesign-lab/`, not in `_sass/`.**

Why this direction is the safer one, beyond it being Rod's call: the live names are referenced by a
vendored Chirpy fork with no theme/site boundary, so renaming live tokens means editing upstream
client code - exactly what D2 exists to prevent. Renaming lab tokens touches only files that are
gitignored and pre-release.

**The hazard this creates, and it is the one to watch:** a lab token renamed to a live name that does
not exist, or is spelled differently, resolves to its FALLBACK and renders wrong **without erroring**.
That failure occurred four times on 2026-08-25 alone (`--color-pink`, `--aw-orbit`, `--aw-glow-r`,
`.visually-hidden`). So the bridge is not a find-and-replace: every renamed token must be MEASURED on
the rendered page afterwards, not grepped.

- REJECTED: replacing live tokens with the lab's names. Fewer edits, but it edits upstream client
  code and puts the risk on the shipping site instead of the lab.
- REJECTED: an alias layer mapping one set onto the other. It would work, and it leaves two names for
  every colour forever - which is the condition that produced `--color-pink` resolving to nothing.

## D42 - The LAB tokens win; the old site's styles are dead (2026-08-25, ROD)

*"please just remove the live tokens for now and use our new ones assume everything style related in
the old site is now dead. also make sure you keep all colors to have tokens so we can return later
if need be."*

**Reverses D41 within the hour, and the reversal is the bigger call of the two.** D41 kept the live
token names and renamed the lab to fit them, on the reasoning that the diff should stay out of a
vendored Chirpy fork. Rod's answer removes the premise: if everything style-related in the old site
is dead, there is nothing in `_sass/` worth preserving compatibility WITH.

The 39 lab tokens become the site's canonical set. **The diff now lands in `_sass/`, not in
`redesign-lab/`.**

**EVERY COLOUR STAYS A TOKEN.** His stated reason is reversibility - "so we can return later if need
be" - which makes this a constraint on the new code, not just a tidy-up of the old. Today the lab
itself violates it: `rgba(8,15,27,.92)` and `rgba(245,158,11,.15)` are copied verbatim across three
final pages, and the four tier palettes in `achievement-wall.css` are hard-coded hex. Those become
tokens as part of the port.

**The hazard, and it is the opposite of D41's:** D2 says Chirpy is upstream client code and we add in
our own files rather than editing theirs. Chirpy's own partials reference the live tokens. Deleting
those tokens breaks Chirpy's stylesheets, so "the old styles are dead" has to extend to the Chirpy
partials that depend on them, or they have to be repointed. That is a real decision the audit has to
surface with a list, not a thing to discover during the port.

- REJECTED (D41, one hour old): renaming lab tokens to live names. Its virtue was keeping the diff
  out of upstream code; its cost was carrying 317 live token names forward into a design that does
  not use them. Rod chose the smaller surviving set.
- KEPT FROM D41: the measurement rule. A token name that does not resolve renders its FALLBACK and
  is wrong **without erroring** - four instances on 2026-08-25 alone. Whichever direction the rename
  runs, every token gets measured on the rendered page afterwards, never grepped.

## D43 - Breathing is dead. Drift and magnetism are what replace it (2026-08-26, ROD)

*"breathing is dead its listed in memory many times. the successor if you can call it that is the
light drifting and magnet components."*

Closes the question the audit raised. `--breathe-hue` and `--breathe-border-hue` are 144 references
across 12 partials and 6 keyframes - the largest style subsystem on the old site - and they go.

**It is not a straight swap and Rod's "if you can call it that" is the honest part.** Breathing was
AMBIENT: everything pulsed on a shared clock whether you touched it or not. Drift and magnetism are
RESPONSIVE - drift moves an element on its own slow loop, magnetism answers the cursor. The site
stops having a heartbeat and starts having reflexes. That is a different feeling, chosen on purpose.

- REJECTED: porting breathing forward. It has no place in the new design and nothing in the lab ever
  reached for it in four months of building.
- REJECTED: leaving the tokens defined but unused. A token nothing reads is the exact condition that
  produced `--color-pink` rendering a fallback for weeks.

## D44 - Delete the old rather than working around it (2026-08-26, ROD)

*"delete the old its in the repo always prioritise making the new work correctly since old can
always be recovered."*

Ends the additive phase. The old design's partials, tokens and includes come out, and where the new
and the old disagree the new wins by deletion rather than by specificity.

**The reason this is safe here and was not safe in the lab:** `_sass/` is tracked. Every deletion is
one `git revert` away. `redesign-lab/` is gitignored, which is why THAT cleanup moved files to a
holding directory instead - the same instruction produces different mechanics depending on whether
git is watching.

- This resolves the six layered/unlayered collisions directly. The ported components are wrapped in
  `@layer components`; the old partials are unlayered and beat them. Deleting the old partial is the
  only fix that does not involve adding an exception.

## D45 - Comments are one spoken line (2026-08-26, ROD)

*"try to trim comments deeply one line no convoluted wording single line of comments like spoken
language and no scientific prose and try to use active voice instead of passive voice."*

He is going to read every script after the refactor, and he cannot do that through the current
comment blocks - many run 10-20 lines of reasoning above three lines of code.

The rule: **one line, spoken, active voice.** "This sits above the fold" not "It should be noted
that this element is positioned such that it remains within the viewport."

**What this costs, stated so the trade is deliberate:** those long comments carry the WHY - which
reference a technique came from, which of Rod's calls changed a value, what was measured. Losing
that wholesale would gut the provenance record. So: the reasoning moves to the component's `.md`
where prose belongs, and the code keeps one line pointing at it. **Trim the file, not the record.**

## D46 - Port all 25 un-ported pages, and accept them rough on the way (2026-08-25, ROD)

Rod, asked what happens to the half of the site the redesign never reached: **"port them all Its ok
if these pages end up a little broken we can fix it once everything lands."**

The 25 are the 19 tag pages, the archive, `game-design/blogs`, `under-construction`, and the 404.
Measured: exactly half the built site (25 of 53) still renders through old Chirpy machinery, which
is precisely what keeps that machinery alive. An agent tonight kept `_sass/layout/_blogspreview.scss`
for exactly one consumer, `game-design/blogs`.

**What makes this a decision rather than a task:** it sets the ORDER. Porting first and stripping
second means every strip has a smaller surface to prove safe, because the old pages stop being the
reason to keep things. Stripping first would mean proving each removal safe against 25 pages that
are about to be replaced anyway. His "a little broken is fine" is what makes port-first affordable.

## D47 - Strip Chirpy down, do not remove it (2026-08-25, ROD)

Rod: **"i don't necessarily think we NEED to remove all of chirpy but we should strip it down get
rid of things that are unused and integrate and try to customize the things we do use."**

This settles a question the plan had left open and my own notes had recorded as "strip Chirpy" with
a `(rec)` next to it, i.e. a recommendation nobody had ruled on. **The goal is not a theme swap.**
Phase 3 of REFACTOR-PLAN.md ("theme-swap readiness") is therefore not the target it was written as,
and should be re-read as "own our layer" rather than "be able to swap the theme out".

The Phase 1 audit makes this immediately actionable: **40 files are byte-identical to upstream** and
are the only real strip-or-keep surface. 81 are already wholly ours and 44 are hybrids, of which the
top five are 89 to 100 percent changed and are ours wearing an upstream filename.

## D48 - Bootstrap goes, completely (2026-08-25, ROD)

Rod: **"Sure lets get rid of bootstrap completely everything should be custom components anyways."**

**The unusual thing here is that this has already been under test for weeks without anyone
realising.** `assets/css/jekyll-theme-chirpy.scss` picks `main` in development and `main.bundle` in
production, and only `main.bundle` pulls Bootstrap in. So the localhost build Rod reviews from has
never contained Bootstrap at all. Every visual judgement he has made this session was made against a
Bootstrap-free site, and what he reported were specific bugs rather than a broken layout.

That is real evidence for the 28 ported pages. It is NOT evidence for the other 25, which lean on
Bootstrap's grid and utilities and only look right in production. Which is why D46 comes first.

Consequence to plan for: the `.container` / `.row` / `col-*` grid in `_layouts/default.html` is
Bootstrap, so removing it is a layout change on every page, not a stylesheet swap.

## D49 - The lab is kept and version-controlled, but only after it is clean and sealed (2026-08-25, ROD)

Rod: **"we should actually keep it clean and un-gitignore it we actually do want to keep it provided
its much cleaner and cant be accessed and wont be built on the main site when it ships."**

Three conditions, and **the ORDER of the work is forced by a hazard rather than by preference:**

1. **Seal it first.** `redesign-lab/` is in `.gitignore` but is NOT in `_config.yml`'s `exclude:`
   list, and Jekyll is building it right now - that is why it is browsable at localhost. Un-ignoring
   it before excluding it would publish all 294 pages on the next deploy.
2. **Clean it second.** It is 140 MB across 294 HTML pages and 185 images.
3. **Un-ignore it last.** Git keeps blobs forever, so committing 140 MB is close to irreversible;
   the size has to come down BEFORE the first commit, not after.

Doing these in any other order either ships the workbench publicly or bakes 140 MB into history.
