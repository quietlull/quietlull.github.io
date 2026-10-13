---
name: project-site-sections-and-plan
description: "The site's confirmed sections/surfaces + the corrected 'measured blanks' build method + current redesign status. Read this to resume the redesign build."
metadata: 
  node_type: memory
  type: project
  originSessionId: 76ad9361-5fac-44c0-8963-cd4321815abd
  modified: 2026-08-16T13:10:27.830Z
---

# Site sections + build plan (2026-08-09, post-mishap reset)

**Confirmed sections (Rod approved 2026-08-09):**
1. **Top bar** — favicon/name · nav (Home/Projects/About) · effect toggles · socials.
2. **Hero / section-landing** — title+tagline (or hero) · tool-icon strip · demo-reel · featured projects + "view all".
3. **Project grid** — cards (thumbnail/video, tags, pins).
4. **Post template (SHARED by Projects AND Ramblings/blog)** — header (title/desc/tags/meta/read-time) · hero media · TOC · TL;DR · prose · code · takeaway · prev/next · related. A project page and a ramblings/blog post use the **same post formatting** (Rod corrected 2026-08-09: it's the POST formatting that's shared between projects and ramblings, NOT the project grid). Ramblings adds some personal details.
5. **About** — bio (intro/more) · achievements trophy case · status.
6. **Footer.**
- **Ramblings / blog** = uses the shared **post template** (#4) + personal touches; not a unique layout.
- **Resume** = Rod wants a good one; likes **brittanychiang.com**'s (fixed-left intro + scrolling experience timeline w/ dates/roles/skill-tag pills). Build in that register.
- **FUTURE (deferred): a "Projects & Quotes" / services page** — Rod thought it really cool, but needs to define prices/offerings first (doesn't have them yet). Revisit later.
- Root **Portal** = low priority ([[feedback-portal-not-landing]]). 404/resume-minor.
- First four surfaces (topbar/hero/project-grid/post) + about/footer are what we build measured **blanks** for.

**Build method — CORRECTED (see [[feedback-design-generation-mishap]]):** NO autonomous design generation. Instead: extract EXACT measurements from the sites Rod likes (browser + `getComputedStyle`; resize to ~1440 for fluid sites) → build **measured "blanks"** = unstyled structural skeletons carrying real numbers → **Rod is the eyes/taste** (I'm screenshot-blind, can't run the see→adjust loop) → build **ONE section at a time**, grounded in real measurements + his Three.js scene → iterate small, Rod judges each step. Multi-agent = parallel EXTRACTION only, never generation.

**START FROM WHAT EXISTS (Rod, 2026-08-09):** most sections are ALREADY built to some degree in the `extracted/` bench + components (top-bar, hero, project-cards-expensive, tool/draw-in-icons, reel-band, post-header, tldr/stamp callouts, code-block, quote-block, site-footer, goo/slap toggles, drift-magnet, cursor-glow, merged-card, etc.). Build = **ADAPT / re-theme these to the new direction + measurements, NOT rebuild from scratch.** Some won't fit the new theme/layout and will need reworking — flag those.

**HARD CONSTRAINT — PERFORMANCE (Rod, 2026-08-09):** the site MUST run on **mobile and old PCs with hardware acceleration OFF.** So: keep it light; graceful degradation is mandatory. **The Three.js / WebGL lantern scene will NOT run without HW-accel** → it needs a low-end fallback path (static baked image / CSS-only / disabled) so the site still works with no GPU. Every heavy effect (shaders, particles, WebGL water, large animations) needs a cheap/CPU-friendly or opt-out path. This tensions with the 'alive/shader' wants — resolve via DEGRADATION (fallbacks), not by abandoning performance. Test target = low-end mobile + no-accel desktop.

**Goal:** warm · hand-made · alive-via-TOUCH (not travel) · festival personality · "look at this not look at me" · 65/35 portfolio/personal · keeps the Three.js lantern scene · distinctive but scannable · **open, NOT explorable**. Full razor: [[project-design-pillars]].

**Current status (2026-08-09) — post-slop-mishap reset.**
KEPT & useful:
- `redesign-lab/reference-gallery.html` — 82 sites tiered S+→F + Rod's per-site "You:" notes + factor-tag filter (his taste catalog; open http://localhost:4000/redesign-lab/reference-gallery.html).
- [[project-design-pillars]] — 3-axis razor + LOCKED calls (scribbly-handdrawn name + line-boil + clean mono; warm-dark; open-not-explorable; interaction≠exploration; handmade>polish).
- `redesign-lab/analysis/2026-08-09-website-factors.md` + `2026-08-09-synthesis-plan.md` — the 7 VISIBLE factors (layout/color/type/imagery/nav/atmosphere/identity; identity=umbrella) + the 41-site×factor matrix. Motion/interactivity are ROD-judged (I can't see them).
- `redesign-lab/analysis/judgment-log.md` — agent reasoning trail (Steps 1-4).
- `redesign-lab/analysis/layout-measurements.md` — STARTED. dimden measured: **fixed 900px content column**, type **16/18.72/24/50px**, pure-black ground, narrow-dense-not-wide.
BINNED: the 10 slop `bubble-*` / `design-*` pages (the autonomous mishap output).

**NEW LANDING BUILD (2026-08-11, ACTIVE ASSEMBLY TARGET):** `redesign-lab/new-landing.html` supersedes aggregate (aggregate kept as old reference). Built element-by-element from the `extracted/` bench components as Rod selects them. Current order: **top bar (sticky page-level, favicon SQUARE, toggles = SMALL SQUARE SLAP — Rod swapped goo→slap in the bar) → hero (harumaki logo/tagline + GOO scene-switch "Lanterns/Off" — the goo moved here from the bar; whole-label checkbox so any click switches; it is THE only scene switch, utilbar removed) → project-cards-expensive (SQUARE bento, capped 4, pink STAR pins) → draw-in skills (stroke now ORANGE `--color-icon-stroke: var(--color-gold-deep)`, was pale #cdd8f0) → scene-space** (85vh spacer so the three.js scene bottom reads like the original page; auto-hidden in bloom mode). Scene ON by default; `?bloom=1` starts in bloom. NO button-kit section (Rod removed it). Component fix: slap-toggle flap clicks now dispatch a REAL bubbling `change` (programmatic .checked fires nothing — before, flap clicks flipped the visual only and page wiring never heard it).
**SHAPE PASS variants added to the workbench (2026-08-11):** `favicon--square`, `slap-toggle--square` (demos show both), `merged-cards--square` (cover/back/glass/pin radius 0 — MUST stay at merged-card.css END to out-cascade base radii) + `card-pin--star` (reference-gallery tier-badge shape, 5px radius kept as the deliberate exception, pink `var(--color-pink,#ff7ec8)`, ★ only, no "Pinned" text); epx bench demo defaults square w/ a Corners toggle button. Registry notes updated.
## ⏩⏩ RESUME HERE (state at 2026-08-14 — READ THIS FIRST, the 08-12 block below is older)

**THE BIG CALL — repo docs [[DECISIONS D10]]: the handmade signature is SHADER work, not drawn art.**
Gallery teardown (53 of 57 sites read from SOURCE, `redesign-lab/analysis/2026-08-14-gallery-teardown.md`)
found Rod's favourites split into two crafts: harumaki main = **304 `<img>`, ZERO design tokens**
(they DRAW everything); Unseen Studio = 1 image, 54 tokens (they DESCRIBE everything in CSS). This
site is architecturally the second while chasing the first's feel — which is why the seam band,
cloud partition and edge rails all ended "mechanism built, ARTWORK OWED". Never a CSS problem.
**Rod is a shader artist, not a 2D artist**, so his equivalent of their 304 drawings is procedural
work (lantern scene, About-page water, compute grass, sparkler). Route chosen = a bit of both: one
drawn piece (the scribbly name), scene carries the rest. Painted dividers stay RETIRED. KEEP the
design tokens — the references' lack of a system reflects throwaway album microsites, not a lesson
for a forever project.

**JUDGE HERE NOW: `redesign-lab/hero-tests.html`** (7 buttons, over the live scene).
`?v=v6` is the current direction and Rod approved it ("we got there in the end"):
three UPRIGHT ALL-CAPS vertical columns at the right edge — `rodney fan` · `technical` · `artist`
(design page would be `rodney fan` · `game` · `designer`) — plus a **large 64px live clock**,
left-anchored, low in frame, as a main attraction. No paragraph tagline anywhere (no harumaki-family
site has one). Geometry transcribed from ndt's real CSS: `.release` top:80px/left:50px,
`.logo` top:0/right:0/width:20%/min-width:250px; block footprint ~224x656px at 1440x1080.
**Size the vertical block in `vh`, NEVER `vw`** — its height must clear the centred social rail,
which is height-derived; vw made it collide on wide-short windows (Rod: "wrong when scaled").

**ALL THREE QUEUED ITEMS ARE CLOSED (2026-08-16). V6 IS LOCKED (Rod: "V6 is the one we are
keeping/going with").** Rod has NOT yet eyed the two visual changes below — that is the open loop.
1. **Top bar favicon: UNBUNDLED.** Gap 0.9→2.4rem, mark 3.2→3.75rem, in `top-bar.css`.
   Rod ruled **KEEP the wordmark** (the "does the bar need a name" redundancy question stays open).
   3.75rem is a HARD CEILING = the wordmark's line box; bigger makes the mark the tallest bar item,
   the bar outgrows 96px, and `hero-tests` `.h{height:calc(100vh - 96px)}` overflows the viewport.
2. **Fireworks: DONE, but reframed by Rod into TWO features** (repo `docs/DECISIONS.md` D12).
   GREETING = permanent, calm, top-of-page only (0.3 viewport gate), NO off switch by design.
   REWARD = the Pyrotechnician-unlocked topbar toggle, STACKS on the greeting. Rod rejected my
   "toggle as master kill for both": it would kill the unlock/curiosity moment, which is the point.
   Fixed en route: auto shells used to bump `achievement:firework`, so a permanent greeting would
   have unlocked its own reward while the visitor idled. Only `source === 'click'` counts now.
   OPEN: combined flash rate at the top can approach 3/sec — Rod chose to judge by eye, not cap it.
3. **Caps-in-Caveat: DROPPED, not answered.** Rod is replacing Caveat with a **LINE BOIL text
   animation, the clock included**. Tracing route he asked for: Calligraphr (handwriting→font),
   Glyphr Studio / FontForge (outlines), Inkscape trace-bitmap. The CLOCK can't use traced variants
   (10 digits × 3 boil frames, changing every second) → procedural path jitter, rough.js as the
   sourced precedent. This keeps the boil on the D10 shader-work side, not the drawn-art side.
4. **Socials spacing (Rod, same session):** in V6 the social rail now hangs **48px below the
   vertical name** — his spec was "the same space we give the vertical text from the top bar", and
   that gap is 48px. Measured in JS (ResizeObserver): the name block is clamped in vh so no CSS
   constant can say where it ends. V1–V5 keep harumaki's centred rail, so only V6 departs.

**ALSO STILL OPEN:** reduced-motion path for the card cursor-reveal (missing) · FPS check on the
card's `filter:blur()` + `mix-blend-mode` which re-rasterises every frame (perf constraint) · the
layout cull on `a3-assembly.html` · the type decision (mincho vs rounded gothic) · where the dated
timeline actually lives (its placement under Skills is nonsense; the frozen flow has no ramblings
section).

**Corrections logged this session:** ndt's Latin letters are UPRIGHT, not sideways (I had it wrong);
six gallery sites use real CSS `writing-mode` so vertical type needs NO artwork; norikura-hanabi.com
is DEAD (404); never cite Miranda Sofroniou's 874 tokens or Jaime Kim's 251 as design-system
evidence (both Wix boilerplate); Mineko's Night Market is "default corporate stuff" per Rod —
**mechanical elaborateness is not quality**, which is a bias in how the teardown ranks sites.
Hallmark (github.com/nutlope/hallmark): **schema adopted, skill NOT installed** — its URL mode uses
WebFetch and is explicitly rhythm-blind, and its "extract structure not pixels" philosophy is the
opposite of the provenance law.

## ⏩ RESUME HERE (state at 2026-08-12, written for a fresh context)

**Judge here:** `redesign-lab/a3-assembly.html` — 8 buttons: Spec · A3 harumaki·mincho · A3 harumaki·sans · A3 ndt · A3 /10/ · A3 109 · A3 sky · Hybrid. REAL bench components over the live three.js lantern scene (hero goo toggle swaps scene↔bloom). Left panel names each layout's SOURCE, borrowed moves, font, and missing components. Supporting files: `landing-blockout.html` (greybox, same provenance panel), `reference-gallery.html` (99 cards, verified captures, Sub-pages section grouped by page type), `analysis/2026-08-12-a3-assembly-decisions.md`.
**Tooling:** skill `web-preview` (`~/.claude/skills/web-preview/`) = reliable first-screen + full-length page capture. ALWAYS verify a contact sheet BY EYE before using a capture — an "empty background" page usually just hadn't loaded (that mistake burned two whole attempts).
**Locked rules (repo docs D8/D9):** greybox = geometry only, one grey language, no colour; the information FLOW is frozen (a variant may reshape a section, never delete one); placeholders reuse the blockout's own greybox box and reserve real spacing; scene bottom is a CONSTANT full-height block; "View all" survives in every layout (in a3frame it sits on the filter-chip row).
**Rod's answers 2026-08-12:** keep all layouts for now (settle once finished) · hybrid fine as-is · a3main's fold-crop stays · missing-component BUILD ORDER parked until the type decision · font lock deferred, sans twin added so mincho vs rounded-gothic is judged on ONE layout.
**OPEN — the type decision (gates the next step):** audit found 4 of 5 harumaki sites render in mincho/serif (Yu Mincho, Noto Serif JP, Zen Old Mincho, Trirong); only /ndt/ uses M PLUS Rounded 1c, a rounded GOTHIC (sans, NOT a rounded serif — Rod initially called it a serif). Their big titles are ARTWORK not type, so the face mostly does BODY work → "hand-drawn title art + rounded gothic body" satisfies the locked no-serif rule. Rod leans rounded; deciding next pass.
**Missing components (build after the type lock):** seam band 160px · cloud partition 96px · fixed edge rails 106px · dated timeline · in-scene identity art · fixed picture frame.

**LAYOUT PIPELINE COMPLETE (2026-08-11): all 4 steps ran.** `redesign-lab/landing-blockout.html` holds 19 switchable states (Rod's baseline/V1/V2 · 5 measured reference captures · 6 impeccable-iterated "+i" · mutants M1/M1+i/M2/M2+i/M3). Full results + rankings in `redesign-lab/analysis/layout-measurements.md`. **Audit ranking: M3 (spec×varied-air+anchors, bugs fixed) > M1 (spec×indie fixed-760-col) > M2 (spec×109 rhythm, merge-donor).** Convergent measured finding: Rod's liked sites = hero≈100vh · narrow 41-49% column · 74-185px breathing (thatskygame zones: 200-400px); anti-refs: pomodorosa, jaimekim (wall-dominant). AWAITING ROD'S CULL. No timed wakeups (Rod: run continuously; routine agent handles restarts).

**THE 4-STEP LAYOUT PLAN (Rod /goal 2026-08-11 — the governing process for the layout phase):**
1. **ANALYSE & CAPTURE** — measure B-tier-and-above reference sites LIVE (getComputedStyle @1440) and capture each layout as a blockout variant on `redesign-lab/landing-blockout.html` (+ find/measure 3 extra "indie spacing" refs, e.g. Neocities). IN PROGRESS — profiles in `redesign-lab/analysis/layout-measurements.md`.
2. **CLEAN-AGENT VERIFICATION** — a FRESH subagent (unbiased by the building session) verifies each variant against its reference: numeric re-check (column %, hero vh, section rhythm) + side-by-side comparison for Rod's eyes.
3. ~~IMPECCABLE SCAN~~ — **DROPPED by Rod 2026-08-11 ("impeccable doesn't actually do much here")** — skip impeccable for layout work going forward.
**METHOD CORRECTION (Rod 2026-08-11): the generic section-profiler FLATTENS sites** (harumaki + hana blockouts came out identical; harumaki main's first screen is NOT an empty hero — logo/character/news all live in it; the 100vh was a background cloud LAYER). Ground layout work in FULL-PAGE + FIRST-SCREEN captures of the real sites, not top-level section metrics. Harumaki has FIVE sites: /, /ndt/, /ftr/, /gnep/, /10/.
4. **MUTANTS + RE-SCAN (Rod 2026-08-11)** — combine the surviving experiment layouts WITH THE ORIGINAL spec baseline, **keeping the original's section ORDER** (the information flow nav→hero→projects-header→cards→skills→reel→scene-bottom→footer is SET; only the layout/spacing mutates). These original×experiment crosses = the "MUTANTS". Then run impeccable on the mutants AGAIN before anything is called good.
Key measured finding so far: Rod-liked sites converge on **hero ≈ 100vh · narrow 41-49% center column · 74-185px section breathing**; pomodorosa = anti-reference (disliked); hana reference = the /tour/borntobloom/ page, NOT the current homepage.

**ROD'S EXACT LANDING SPACING SPEC (given 2026-08-11; blockout = `redesign-lab/landing-blockout.html`, verified to the px):** ref 1920x1080; screen 1 = nav-top to bottom of first card row = EXACTLY 1080px. NAV fixed 0-72 (ICO far-left, name, spacer, nav btns, effect toggles far-right; SOCIAL rail = SEPARATE fixed element, right edge, spans HERO height only) | HERO 72-616 (544px; chevron anchored to hero bottom edge, not its own section) | PROJECTS HEADER 616-680 (64px; title left, View All right) | CARDS 680-1080 (400px, fully on screen 1) | CARDS CONT 1080-1480 | SKILLS HEADER 1480-1552 (72) | SKILL FLIPPER 1552-1672 (120, flip/carousel) | SKILLS 1672-1912 (240) | DEMOREEL HEADER 1912-1984 (72) | DEMO REEL 1984-2524 (540; 16:9 = 960x540 contained or 1920x540 letterboxed) | SCENE BOTTOM 2524-3244 (720, the heavy closing scene) | FOOTER 3244-3324 (80). TOTAL 3324px.
**NEXT:** Rod judges the blockout proportions, then we pour the bench components (new-landing) into this skeleton at these exact heights.
