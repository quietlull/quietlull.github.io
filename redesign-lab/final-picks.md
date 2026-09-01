# FINAL PICKS — Rod's element decisions (2026-06-12)

**This is the assembly spec for the final page.** Source = Rod's picker session + his per-slot reasoning (captured same day). Governed by the Code Provenance Contract. Where a slot is a REMIX (shape from X, behavior from Y), both parents are named — extraction must cite both.

Legend: ✅ final · 🔧 final-with-changes · 🧩 remix · ⛔ unresolved

---

## Background — 🔧 hana-bloom + Three.js scene as a PAIR
- The real model is a **toggle pair**: Three.js scene when on, **hana-bloom is the fallback/default when 3D is off**.
- **Posts default to bloom** (calm reading; "we don't want all the action from the scene" there).

## Chrome / top bar — 🔧 norikura
- "Cleanest top bar design." Shell/layout = norikura.
- CHANGES OWED: switches must change (→ harumaki gooey, see Toggles), top-bar font changes, some functions will change. Details deferred — Rod: "we will get to that later."
- (Naming note: Rod flagged "chrome" as a confusing label — it's the browser-UI term for nav shell. Picker label renamed to "Top bar".)

## Hero — 🔧 harumaki shell, COMPOSITION DECIDED (Rod, 2026-06-14)
- "Hands down the best hero — strong synergy with the lantern scene." Keep the tall atmospheric
  Three.js scene (the C pattern). Decision after reviewing references (`sources/hero-references.md`):
  Rod can't copy harumaki (its hero centers the artist's NAME); chriskalafatis centers a discipline
  line ("MULTI-DISCIPLINARY DESIGNER") — that's the model.
- **RESOLUTION (A+C): the NAME (with glow) MOVES to the TOP BAR** (alongside the **favicon** — add
  favicon to the bar). The hero no longer centers an orange name.
- **Hero centers the discipline/fascination line instead:** **"Tech Artist, Shaders, Tools,
  Interaction & little worlds"** (his current main-site line is "Technical Art / Shaders, tools,
  rendering pipelines, and visual problem solving" — this is the refreshed, more personal version).
  This is the "look at this, not look at me" hero.
- **Scroll cue:** the chriskalafatis **magnetic double-circle chevron** (already sourced in
  `sources/magnetic-buttons.md` + `hero-references.md`) at the bottom of the hero, pushing attention
  down after the scene. Buildable from the extracted magnetic module.
- CHANGE (still holds): the THREE gooey switches in the hero become **ONE switch** that toggles
  Three.js scene ↔ hana-bloom background. (breathing/sparkler/fireworks slap toggles live in the top
  bar — see Toggles.)
- TODO at build: top bar must now hold logo/name(glow) + favicon + nav + slap toggles — re-check it
  fits (norikura bar already flex-wraps).

## Toggles — 🔧 REVISED (Rod, 2026-06-12): **top bar uses the SLAP toggle trio** (hana/YarivFrd, small variant)
- Original pick was harumaki gooey small in the bar; after seeing it Rod switched the bar to slap toggles.
- The harumaki gooey survives as the **hero scene switch** (Lanterns ↔ bloom) — Rod co-designed it.
- Bar nav links: magnetic (25) + the norikura underline UN-CLIPPED (source's `overflow:hidden` was swallowing it).

## Tools — 🔧 stephan (only candidate)
- Draw-in skill icons stay.
- CHANGE: the Technology↔Personal switch is replaced by **the hana slap toggle, recolored to match the harumaki toggle colors**.

## Kit (buttons/tags/links) — 🧩 REMIX: stephan shape × hana behavior × cursor-stick
- **Shape stays exactly stephan** ("the buttons here look the best to me visually").
- **Behavior = hana** (glow-ignite family) **PLUS magnetic cursor attraction** — buttons "slightly attracted to the cursor and stick to it."
- ✅ PROVENANCE CLEARED (2026-06-12): Rod provided BOTH sources — chriskalafatis.com (rAF+lerp engine, 1.25×width radius, per-layer parallax) and dennissnellenberg.com/work (tdesero pattern, credits codepen.io/tdesero/pen/RmoxQg). Recorded in `sources/magnetic-buttons.md`. Built as `extracted/components/magnetic/` (Remixed, both parents cited; Elastic-bounce deviation flagged).
- **Inline link = harumaki** (underline-draw behavior).

## Cards — 🧩 harumaki: FLIP layout × MERGED function
- **Layout & spacing = the "flip" mode** (flip-tile bento grid).
- **Function = the "merged" card** (z-parallax layers, dwell-flip, gyro).
- CHANGES: (1) consider **dropping the glass plane** — final page must include a GLASS ON/OFF toggle so Rod can judge; (2) Rod will **adjust the z values** of the parallax layers (expose them tunable).
- **Project LIST page**: plain normal grid — "I just want it to be easy to access." (No priority-sized weirdness.)

## Reel band — ✅ harumaki (picker said none only because placement was wrong)
- USE it, but position **ABOVE the project cards, not below**.

## List controls — 🧩 REMIX: stephan shape × hana function × cursor-stick
- "Shape wins" = stephan. Function = hana family. Same magnetic cursor-stick as Kit.

## Post — 🧩 four-way REMIX (most nuanced slot)
- **Header = norikura** (the decision/serif+slash header).
- **TL;DR, body, headings, code block = hana.**
- **Takeaway = UNIQUE: harumaki stamp shape** (perforated dot edge) — deliberately distinct from TL;DR.
- **Blockquote = harumaki shape, but font/colors changed to match hana.**

## About — ⛔ UNRESOLVED ("this one is a fail")
- Rod: "most of that section is covered in slop obtained from nowhere."
- NEEDS a dedicated design conversation before anything is built. Do NOT improvise an about block.

## Footer — 🔧 harumaki (best of an unremarkable field)
- CHANGES: **drop the duplicate nav links** (unneeded). Footer should link to **About me** instead.
- Self-link problem (about page footer linking to itself) → footer is contextual or simply changed; final shape TBD ("changed ultimately instead").
- **Socials**: norikura-style icons "might be the way to go" — needs planning. Deferred.

---

## Cross-cutting consequences
1. **Bg toggle architecture**: one switch (in hero) drives scene↔bloom; posts default bloom. Affects three-bundle wiring + hana-bloom.js.
2. **Cursor-stick (magnetic) interaction** appears in Kit AND List → ONE shared implementation, ONE source. BLOCKER: needs Rod's source or an approved reference.
3. **Toggles migrate into the top bar small** → goo filter id must be page-unique; size variant needed (Rod already flagged 3 full-pill toggles won't fit a bar — small variant is the answer).
4. Tunable-at-assembly: card glass on/off, card z-layer values, all spacing (Rod's picker tune values when provided).

## BUILT: `aggregate.html` (2026-06-12) — the picks assembled as ONE page
All picked sections physically assembled (CSS namespaced per `.s-*` section wrapper, scoped vars — no collisions; provenance map in the file's header comment). Includes: scene↔bloom toggle pair (hero gooey switch + utilbar; bloom default; canvas display:none when off — invisible-but-rendering canvas stalls capture + burns GPU), small gooey toggles in the norikura bar, GLASS on/off button, built-in SPACING TUNER (26 `data-tune` elements, mt/mb/zoom/gap/maxw, Alt-click to jump, persists `agg-tune-v1`, "Copy tune" exports). `?jump=<id>` = capture helper (negative html margin, NOT scroll — classic headless only rasterizes the unscrolled viewport). Stephan sections amber-mapped (#FFDF00→#FBBF24, one var to revert). Section headers = harumaki shead, PROVISIONAL (never a picker slot). Tools icon SET still stephan's geometry relabeled w/ Rod's tools — real official SVGs owed. Verified headless: all sections render; scene/glass/tuner all functional.

## EXTRACTION COMPLETE: `redesign-lab/extracted/` (2026-06-12, batch 2)
Standards-compliant component bench (repo-root **STYLE.md**). Test at `/redesign-lab/extracted/?c=<id>`. Each component = `<id>.html` + `<id>.css` (+ `<id>.js` exporting `init(root)`), provenance header in every file. **16 components, ALL queue items extracted:** top-bar, hero, goo-toggle, slap-toggle (source-exact: .on follows c1, flap label syncs @180ms), draw-in-icons (REAL official tool SVGs still owed), magnetic, button-kit (55/tags 25 + hana ripple per Rod), merged-card (**flip-tile COVER look × merged function**, glass toggle, tunable --z-* depth tokens, [6r2][6][6][12] bento), reel-band, list-controls (stephan × hana caret/ripple × magnetic), post-header, tldr-callout, quote-block (harumaki shape × hana type), code-block (working copy button), stamp-callout (APPROVED), site-footer. Magnetic on: buttons, tags, all toggles (Rod's feedback).
- **BENCH TUNER:** every [data-tune] element adjustable in the bench; values persist (`lab-element-tunes`) and **flow to aggregate.html automatically** via the bridge map (aggregate's own tuner overrides bench values).
- **PALETTE PAGE (2026-06-12):** all 26 color tokens consolidated into `extracted/styles/settings.css` (literals replaced across components; `--color-glow-soft` corrected to foundations' #FFD9A8). Bench "PALETTE" entry = live token editor; overrides persist (`lab-palette`) and recolor every component AND aggregate (incl. legacy var aliases --gold/--glow/etc; section-scoped --line stays local). 
- **SLAP TOGGLE:** clicking the flap (selected side) now flips to the other option — works whichever side is hit.
- **AGGREGATE v2:** rebuilt to CONSUME extracted components (cards = merged-card component; magnetic module shared). Verified: bridge works, flip bento renders, zero console errors.
- PARKED: about (conversation first), socials, bg pair as a bench component (Three-canvas-bound; lives in aggregate). NEXT PHASE per Rod: optimization pass over all extracted components.

## Extraction order (proposed)
Unblocked + final first: toggles (small variant) → hero → top bar shell → cards (flip×merged + glass toggle) → reel band → footer shell → post composite (4 sources) → bg pair wiring. Blocked: kit/list (await cursor-stick source). Parked: about (needs conversation), socials plan.
