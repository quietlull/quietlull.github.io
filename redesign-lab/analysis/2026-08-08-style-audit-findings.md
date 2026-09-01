# Style audit — findings (2026-08-08, /loop)

Report-only (per STYLE.md Section J + Rod's "ask before any rendered-pixel change"). Scope this pass: the 5 `rework-*.html` element kits. Method: grep the exact patterns impeccable + Vercel Web Interface Guidelines flag, then run each real hit through **the fork** (pillar backs it → elevate / name the visible reason it isn't slop; no pillar → cut). Every finding cites file:line.

## PASSES THE FORK — keep (pillar-backed, already the elevated version)

- **Ignite-glow** — `rework-hana.html:97`, `rework-harumaki.html:93` (+ others): `box-shadow:0 0 70px rgba(255,106,0,0),0 0 140px rgba(255,106,0,0); transition:box-shadow 2s` → alpha 0 at rest, ignites on `.in`. Lantern pillar; ignites-not-constant; amber hotter than fill. **Visible reason it's not "dark-glow" slop: it's off until you scroll to it, and it IS the festival theme.** Keep.
- **Slap-toggle bounce** — `rework-hana.html:52`: `transition:transform cubic-bezier(0,0,.3,2) .3s` (the `2` overshoots). Playful pillar; the control literally "slaps." Keep as the deliberate physical toggle.
- **Cursor-spotlight radials** — merodev/yanne cursor-glow + brittany vignette. Cursor-as-lantern pillar. Keep.
- **All other easing is ease-out** (`.215,.61,.355,1`, `.22,1,.36,1`, etc.) — Vercel/impeccable approve smooth decel. No action.

## FINDINGS (flagged by the fork)

### 1. Glassmorphism — `backdrop-filter:blur()` (all 5 reworks) — HIGH
Cited: `rework-hana.html:43,97,135,157` (bar/card/post/bio), `rework-norikura.html:26`, `rework-merodev-yanne.html:32,131`, `rework-harumaki.html:93,198,227`, `rework-stephan.html:16`.
- **Decorative glass** (`.card`, `.post`, `.bio`, `.pages`, `.bgtoggle`): frosted-blur panels = the glassmorphism tell Rod called out. **Fork:** weak pillar. → **Replace with paper-morphism** (translucent washi/paper grain panel, no blur) per [[project-impeccable-adoption]]. This is the single biggest lever this audit found.
- **Functional sticky-bar blur** (`.bar`, blur 5px over scrolling content): has a legibility pillar (keeps the bar readable over moving content). **Fork:** borderline keep, but test a solid-night bar first — if legible, drop the blur too (cheaper, less tell).

### 2. Overused font: Inter — `rework-merodev-yanne.html:7,14,101`, `rework-stephan.html:7,13` — HIGH
`font-family:"Inter",system-ui,sans-serif` on body + prose. Inter is impeccable's #1 overused-font tell. **Fork:** no pillar backs "Inter" specifically — it's the generic default. → **Swap** for a distinctive sans. Keep the design's *character* fonts (Space Mono for merodev's terminal identity; Sacramento for stephan's script brand) and replace only the Inter body. Candidates that dodge the tell-list (avoid Fraunces/Space Grotesk, also flagged): Schibsted Grotesk, Hanken Grotesk, or lean mono-led for merodev. Feeds the still-open type decision.

### 3. Decorative radial halos — `rework-harumaki.html` (12 radial-gradients), `rework-stephan.html:13` (body bg) — MEDIUM
Matches Rod's explicit "reduce halo presence." **Fork:** cursor/functional radials pass (pillar); section-decoration halos don't. → Audit harumaki's 12 radials individually, keep cursor/reveal ones, **flatten/remove decorative section halos**. stephan's `radial-gradient(120% 80% at 50% -5%, ...)` page bg is a soft halo — consider a flatter night ground.

### 4. Neutral elevation shadows — `rework-harumaki.html:69` `.tile{box-shadow:0 10px 26px -10px rgba(0,0,0,.55)}` (+ ~others in harumaki's 18 box-shadows) — LOW
Plain gray drop-shadow for card lift = generic elevation (Vercel WIG: "hairline before shadow"). **Fork:** no pillar (not the amber glow). → Prefer a 1px hairline or the ignite-glow; reserve neutral shadow for genuine overlays only.

### 5. Focus outline removed on custom controls — MEDIUM (Vercel WIG)
`ref-stephanewillems*.html` `.sw{outline:none}` on the custom toggle. The `#tuner input:focus{outline:none}` cases are OK (they set a `border-color` replacement). **Fork:** n/a (pure quality). → Every custom control (toggles, slap, gooey) in the REAL build must ship a visible `:focus-visible` ring (Vercel WIG + STYLE.md WCAG 2.4.7). Also check `rework-hana.html:120` search input relies on caret+border only.

## Quality checklist still to verify (needs render / can't grep)
- Contrast (prefer APCA) on `--muted` text over night; 44px touch targets on toggles/nav; heading order; line-length (post is capped 72ch ✓ `rework-hana.html:135`); no width/height transitions (scan clean — transitions are transform/opacity/filter/box-shadow ✓).

## Remaining audit targets (next loop iterations)
- `aggregate.html` (the assembled final-picks page — most important).
- The `extracted/` bench components (the actual build source).
- `section-landing-*.html` (superseded, low priority).

## AGGREGATE + BENCH audit (the ACTUAL build — cleaner than the reworks)

Scanned `aggregate.html` + `extracted/` (25 component CSS files). Key result: **the real build already fixed most of what the reworks show.**

- **Inter is ALREADY dropped.** `aggregate.html:118,151,179` are commented "T0-B: Inter dropped" (uses `var(--fs)` serif / `var(--fm)` body token / `var(--fmono)` mono instead); `button-kit.css:8` "Font is the body token, not stephan's Inter — type is owned by the cohesion pass." → **Rework finding #2 is superseded in the build.** The reworks are older element-kits; don't fix Inter there, just don't carry it forward.
- **Glass is nearly gone.** `extracted/` has ONE `backdrop-filter` (top-bar.css). `aggregate.html` has two: `.s-bar:74` (functional sticky-bar blur, legibility pillar) and `.s-post .post:194` (blur 3px, decorative reading panel). → **Only remaining paper-morphism target: `.s-post .post`.** One swap, not twelve.
- **`#hana-bg:50` uses `mask-image:radial-gradient(...)`** — a vignette MASK that pools the bloom into the center = the de-glow "pooled light" done *right*. Passes the fork; keep as a positive exemplar (radial as a mask ≠ radial as a decorative halo).
- **Glow that passes:** `.s-hero .logo:112` amber `drop-shadow` (lantern pillar), `.s-post .tldr:196` soft amber `box-shadow` low-alpha (lantern, ignite-ish). Keep.
- **Spot-check queue (16 radial/outline hits in `extracted/`):** cursor-glow = pillar-backed spotlight (keep); confirm each custom control's `outline` has a `:focus-visible` replacement; `bench.css` outline is lab-tooling (ships never, exempt).
- **icon-tile-stack:** `.s-tools` tool-icon strip — run the fork next: does the cursor-recolor-circle elevation justify keeping the tile row, or reduce per Rod's directive? (Needs Rod.)

## Net
The reworks are in good shape on motion (ease-out everywhere, ignite-not-constant) and mostly clean on structure; the **build (aggregate/bench) is cleaner still and already dropped Inter**. Across everything, the real open levers are just: **(1) `.s-post .post` glass → paper-morphism**, **(2) decide the `.s-tools` icon-tile-stack**, and **(3) reduce harumaki-era decorative halos if those patterns carry forward.** All three are pillar-decisions for Rod, not silent fixes. Motion, contrast-structure, and type are already in good order.
