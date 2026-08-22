# Changelog

Append-only. Entry format, ported from the Underworld convention: date, SHORT-CAPS-TITLE, then
prose - what happened, who decided (ROD / CLAUDE), why, what was tried and rejected, what still
needs verification. The why is the point; a diff already says the what.

---

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
  Also corrected: `callout-tests.html` and `component-blockout.html` both stated the false parents
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
  sitting below the page. All three are now greybox variants in `component-blockout.html`, whose
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

