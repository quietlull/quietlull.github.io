# Web Standards & UX Analysis Instructions

**v2.1 (2026-06-12).** Three things in one governing doc: (A–G) coding standards for HTML/CSS/JS,
(H) accessibility hard rules, (I) UX heuristics, and (J) **the procedure for running a UX/a11y
analysis of this site** — written to be executed by an agent. Each rule cites the industry
source it derives from.

> Adopted by Rod. The `redesign-lab/extracted/` component bench is the first code held to this
> document. Per Rule 54, every intentional deviation is recorded in the log below.
> v2.1 changes: Section H renumbered contiguously in criterion order (55–89) and gap-filled
> (1.3.3 added; 1.3.5 refiled under Perceivable); project notes added for autoplay demo loops
> (2.2.2); analysis methods specified for contrast-over-media and flash audits; Step 0 paths
> made resolvable; report destination fixed. Do not cite pre-v2.1 rule numbers.

## Deviations log
- `redesign-lab/` prototypes (rework pages, picker, aggregate) PRE-DATE this document and are
  exempt from Sections A–G — throwaway lab surfaces. Everything under `redesign-lab/extracted/`
  and all future refactor code complies. (Lab pages are still ANALYZED under Sections H–J;
  exemption covers code style, not accessibility.)
- `extracted/` uses native ES modules with no bundler (Rules 46–51 apply to the real site
  build, which keeps Rollup).
- `extracted/components/merged-card/` keeps the source vocabulary of its parent code
  (`.card-tilt`/`.z-layer`/...) instead of strict BEM — renaming a working source's coupled
  CSS+JS invites the drift the provenance contract exists to stop.
- WCAG 2.3.3 (reduced motion) is Level AAA but adopted as a HARD rule here (Rule 89) — this is
  an animation-heavy site.
- Rule 86 (accessible authentication / redundant entry) is **dormant**: the site is static with
  no forms. It activates if comments/contact ever ship. Rule 60 (input purpose) likewise.

## Sources

| Source | Covers | URL |
|---|---|---|
| Google HTML/CSS Style Guide | HTML, CSS | https://google.github.io/styleguide/htmlcssguide.html |
| Google JavaScript Style Guide | JS | https://google.github.io/styleguide/jsguide.html |
| Airbnb JavaScript Style Guide | JS (most-starred JS guide on GitHub) | https://github.com/airbnb/javascript |
| MDN code style guides | HTML, CSS, JS | https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide |
| CSS Guidelines (Harry Roberts) | CSS architecture, BEM | https://cssguidelin.es |
| ITCSS (Harry Roberts) | CSS layer architecture | https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/ |
| BEM methodology | CSS naming | https://getbem.com / https://en.bem.info |
| SMACSS (Jonathan Snook) | CSS categorization | https://smacss.com |
| Idiomatic CSS (Nicolas Gallagher) | CSS formatting | https://github.com/necolas/idiomatic-css |
| Sass Guidelines (Kitty Giraudel), 7-1 pattern | Sass file structure | https://sass-guidelin.es |
| Prettier | Formatting automation | https://prettier.io/docs/en/why-prettier |
| ESLint / Stylelint | Linting | https://eslint.org / https://stylelint.io |
| EditorConfig | Cross-editor consistency | https://editorconfig.org |
| web.dev (Google) | Bundling, performance | https://web.dev/articles/reduce-javascript-payloads-with-code-splitting |
| Rollup / Vite docs | Bundling | https://rollupjs.org / https://vitejs.dev |
| WCAG 2.2 (W3C Recommendation) | Accessibility — hard rules | https://www.w3.org/TR/WCAG22/ |
| Laws of UX (Jon Yablonski) | UX heuristics — soft guidance | https://lawsofux.com |

A note on authority: there is no single official standard. Professional teams pick one
published guide per language, adopt it wholesale, and enforce it with tooling. The rules below
are the points where all the major guides agree, plus the dominant convention where they differ.

---

## A. Universal Rules (all file types)

**Rule 1 - One formatter, zero debate.** Run Prettier (or equivalent) on every HTML/CSS/JS file, enforced in CI or a pre-commit hook. Formatting is automated, never reviewed by humans. (Prettier "Why Prettier".)

**Rule 2 - 2-space indentation, no tabs.** Commit an `.editorconfig` so every editor agrees. (Google HTML/CSS 2.2.1; Airbnb 19.1.)

**Rule 3 - UTF-8 files, ASCII source.** Save as UTF-8 without BOM; identifiers, comments, and literals stay printable ASCII; required Unicode goes in as escape sequences (`\u2014`), never pasted glyphs. (Google HTML/CSS 2.3.1.)

**Rule 4 - Lowercase everything in markup and styles.** `color: #e5e5e5;`, not `COLOR: #E5E5E5;`. (Google HTML/CSS 2.3.2.)

**Rule 5 - No trailing whitespace; files end with a single newline.** (Google HTML/CSS 2.3.3; POSIX; Prettier default.)

**Rule 6 - Comments explain why, never what.** Keep rationale, trade-offs, workarounds, warnings; delete restatements. (CSS Guidelines "Commenting"; Google JS 7; Clean Code ch. 4.)

**Rule 7 - Line length around 80-100 characters.** Pick one and let the formatter enforce it.

**Rule 8 - TODO comments carry an owner or issue link.** `// TODO(rod): replace with IntersectionObserver - issue #42`. (Google HTML/CSS 2.5.1; Google JS 7.4.)

---

## B. Project and File Architecture

**Rule 9 - One component/module per file.** Each JS file exports one logical unit and the filename matches the export. Each UI component gets its own CSS/Sass partial. (Airbnb React 1.1; Sass 7-1; ITCSS; Google JS 3.1.)

**Rule 10 - Folder structure groups by type at the top, by feature within.**

```
src/
  js/
    main.js            entry point only - imports and wiring
    components/        one file per UI component
    lib/               pure utilities, no DOM access
    scenes/            (project-specific, e.g. Three.js scenes)
  styles/
    main.scss          imports only, no rules
    settings/          variables, design tokens
    tools/             mixins, functions
    generic/           resets, normalize
    elements/          bare element styles (h1, a, ul)
    components/        one partial per component
    utilities/         single-purpose helper classes
  assets/
```

ITCSS layout shown; the 7-1 variant is equally accepted — pick one. (ITCSS; Sass Guidelines "Architecture".)

**Rule 11 - Entry points contain no logic.** `main.js`/`main.scss` only import and initialize. (Sass 7-1; Rollup/Vite convention.)

**Rule 12 - File names: kebab-case for CSS/HTML/asset files; JS either kebab-case or matching the default export — one scheme, never mixed.** No spaces, no uppercase in URL-facing files. (Google HTML/CSS 2.3; Airbnb 23.6.)

**Rule 13 - Separate concerns: structure (HTML), presentation (CSS), behavior (JS) in separate files.** No inline `style=""`, no inline `onclick=""`, no `<style>`/`<script>` blocks with real logic in pages. (Google HTML/CSS 3.1.4; MDN.)

**Rule 14 - Vendor/third-party code is quarantined** in `vendor/` (or `node_modules`), never hand-edited, excluded from linting. (Sass 7-1; standard practice.)

**Rule 15 - Dead code is deleted, not commented out.** Version control is the archive. (CSS Guidelines; universal code-review standard.)

---

## C. HTML Rules

**Rule 16 - Always declare `<!doctype html>` and a `lang` attribute on `<html>`.** (Google HTML/CSS 3.1.1; WCAG 3.1.1 — same requirement as Rule 81; edit both together.)

**Rule 17 - Use semantic elements for their purpose.** Never a `<div>` with a click handler where `<button>` belongs. (Google HTML/CSS 3.1.6; MDN.)

**Rule 18 - Every `<img>` has an `alt`; decorative images get `alt=""`. Every form control has a `<label>`.** (Google HTML/CSS 3.1.8; WCAG 1.1.1 — same requirement as Rule 55; edit both together.)

**Rule 19 - Omit `type` attributes on stylesheets and scripts.** (Google HTML/CSS 3.1.9.)

**Rule 20 - Double quotes for HTML attributes.** (Google HTML/CSS 3.2.3.)

**Rule 21 - Validate markup** (W3C Nu validator or html-validate in CI). (Google HTML/CSS 3.1.7.)

**Rule 22 - Scripts load with `defer` (or `type="module"`) in `<head>`, or at end of `<body>`.** Never a blocking script in head. (MDN; web.dev.)

**Rule 23 - Styling hooks and behavior hooks are separate: `js-` classes or `data-` attributes for JS, never styling classes.** (CSS Guidelines "JavaScript hooks".)

---

## D. CSS Rules

**Rule 24 - BEM for component class names.** `.card`, `.card__title`, `.card--featured`. (getbem.com; CSS Guidelines; GOV.UK/BBC/Shopify adoption.)

**Rule 25 - Class names are kebab-case and meaning-based, not appearance-based.** `.button--primary`, not `.button--red`. (Google HTML/CSS 4.1.3.)

**Rule 26 - Never style IDs; never style `js-` hooks.** (CSS Guidelines "IDs in CSS"; Idiomatic CSS.)

**Rule 27 - Utilities prefixed `u-`, one job each. JS state classes prefixed `is-`/`has-`.** (SMACSS; SUIT CSS.)

**Rule 28 - Order stylesheets by ITCSS layers: settings, tools, generic, elements, objects, components, utilities.** (ITCSS.)

**Rule 29 - One component per partial, named after the block.** (Sass 7-1; ITCSS.)

**Rule 30 - Specificity flat: single-class selectors by default; max one nesting level in Sass.** (CSS Guidelines "Specificity"; Sass Guidelines.)

**Rule 31 - No `!important` outside utility classes.** (CSS Guidelines; SMACSS.)

**Rule 32 - Design tokens defined once in the settings layer.** No magic hex values or pixel numbers in components. (Sass Guidelines; Material/Polaris convention. This project: `extracted/styles/settings.css`.)

**Rule 33 - Media queries live next to the component they modify.** (Sass Guidelines; CUBE CSS.)

**Rule 34 - One declaration per line; one selector per line; space after `:`; trailing `;`.** Prettier enforces. (Google HTML/CSS 4.2.)

**Rule 35 - Zero values without units; leading zero on decimals; 3-digit hex where possible.** (Google HTML/CSS 4.1.5-4.1.7.)

---

## E. JavaScript Rules

**Rule 36 - camelCase variables/functions; PascalCase classes; UPPER_SNAKE_CASE true constants.** (Airbnb 23; Google JS 6.2.)

**Rule 37 - Descriptive nouns for values, verb phrases for functions, predicate booleans.** No `btn`, `cfg`, single letters outside loop indices. (Airbnb 23.1; Clean Code ch. 2.)

**Rule 38 - `const` by default, `let` when reassigned, `var` never.** (Airbnb 2.1.)

**Rule 39 - Strict equality only.** (Airbnb 15.1.)

**Rule 40 - ES modules exclusively; no globals, no IIFE namespacing, no CommonJS in browser code.** (Airbnb 10; Google JS 3.3-3.4.)

**Rule 41 - Named exports (this project's policy), enforced with ESLint.** (Airbnb 10.6 vs Google JS 3.4.1 — teams pick one.)

**Rule 42 - Small single-purpose functions; DOM-touching modules separate from pure logic.** (Clean Code ch. 3.)

**Rule 43 - Modern syntax: arrows for callbacks, template literals, destructuring, spread, async/await.** (Airbnb 8, 6.4, 5, 28.)

**Rule 44 - No `console.log` in shipped code; no empty `catch`.** (ESLint `no-console`.)

**Rule 45 - Avoid mutating shared state; document unavoidable singletons.** (Airbnb immutability guidance.)

---

## F. Bundling and Build

**Rule 46 - Author many small files, ship few optimized bundles** via Rollup/Vite/esbuild. (Rollup docs; Vite "Why Vite".)

**Rule 47 - Tree shaking: side-effect-free modules, `"sideEffects": false`.** (Rollup/webpack docs.)

**Rule 48 - Code-split heavy or below-fold modules with dynamic `import()`** — e.g. Three.js scenes load when their canvas nears the viewport. (web.dev.)

**Rule 49 - Production output minified with content-hashed filenames; never commit built files to source folders.** (web.dev; Vite defaults.)

**Rule 50 - CSS through the same pipeline: compile, Autoprefixer, minify, hash.** (Vite/PostCSS standard usage.)

**Rule 51 - `dist/` gitignored; `src/` is the only hand-edited tree; lockfile committed.** (npm docs; CI practice.)

---

## G. Enforcement and Tooling

**Rule 52 - Standard toolchain: ESLint (+ `eslint-config-airbnb-base`), Stylelint (`stylelint-config-standard`), Prettier, EditorConfig — plus, for Section H, an automated accessibility layer: axe-core (or pa11y) against the built site in CI and a Lighthouse accessibility budget.** Automated a11y tooling catches roughly a third of WCAG failures; the rest need the manual passes in Section J. (eslint.org; stylelint.io; deque axe docs.)

**Rule 53 - Enforcement runs automatically: lint and format on editor save and pre-commit (husky + lint-staged); a11y checks against rendered pages in CI.** A rule that is not machine-enforced will not survive. (Prettier docs; CI practice.)

**Rule 54 - Document the deviations** in this file's Deviations log, with reasons. (Google style guide preamble model.)

---

## H. Accessibility — WCAG 2.2 Level AA (HARD rules)

Testable success criteria from WCAG 2.2, ordered by criterion number within each principle.
AA conformance = passing **every** Level A and AA criterion. These are not stylistic
preferences — they are the standard cited by accessibility law (ADA, EU Accessibility Act,
Section 508). **Treat violations as bugs.** Criterion numbers are given so each rule is
verifiable against the spec.

### Perceivable

**Rule 55 - Every image has an `alt`; decorative images get `alt=""`.** (1.1.1 — duplicate of Rule 18; edit both together.)

**Rule 56 - Media alternatives match the media.** Prerecorded video **with audio** gets captions; prerecorded audio gets transcripts; video gets audio description where meaningful visual info isn't in the dialogue. (1.2.1–1.2.5) **Project note:** this site's demo clips are muted autoplay loops — captions do NOT apply to silent video; what they need is a text alternative/nearby description of what the demo shows (falls under 1.1.1). Do not flag silent demo loops for captions. (Their *motion* obligation is Rule 71.)

**Rule 57 - Structure lives in semantics, not visuals.** Headings, lists, and relationships in markup; DOM order meaningful. (1.3.1, 1.3.2)

**Rule 58 - Instructions never rely solely on sensory characteristics** — shape, color, size, visual location, orientation, or sound ("click the orange pill on the right" fails; "click the Breathing toggle" passes). Pair every sensory cue with a name. (1.3.3)

**Rule 59 - Content works in portrait and landscape.** (1.3.4)

**Rule 60 - Common input fields declare their purpose** (`autocomplete` attributes). (1.3.5 — dormant until forms exist.)

**Rule 61 - Color is never the only carrier of information.** (1.4.1)

**Rule 62 - Auto-playing audio longer than 3 seconds can be paused, stopped, or volume-controlled independently.** (1.4.2 — currently moot: all site media is muted; activates if sound ever ships.)

**Rule 63 - Text contrast at least 4.5:1; 3:1 for large text (18pt/~24px regular, or 14pt/~18.7px bold).** Check every text-over-glass, text-over-gradient, and text-over-canvas surface — measurement method in Section J, Step 1. (1.4.3)

**Rule 64 - Text scales to 200%; layout reflows at 320px width without horizontal scroll or content loss.** (1.4.4, 1.4.10)

**Rule 65 - No images of text where real text can do the job** (logos exempt). (1.4.5)

**Rule 66 - UI components and meaningful graphics: at least 3:1 against adjacent colors.** Includes focus indicators, form borders, icons. (1.4.11)

**Rule 67 - Layout survives user text-spacing overrides** (line height 1.5×, paragraph 2×, letter 0.12×, word 0.16×) without clipping or overlap. (1.4.12)

**Rule 68 - Hover/focus-revealed content is dismissible, hoverable, and persistent.** (1.4.13)

### Operable

**Rule 69 - Everything operable with keyboard alone; no focus traps.** Includes anything layered over or beside the canvas scene. (2.1.1, 2.1.2)

**Rule 70 - Single-character keyboard shortcuts can be turned off or remapped, or only fire on focus.** (2.1.4 — modifier combos like Ctrl+Shift+A are fine.)

**Rule 71 - Auto-starting motion that lasts over 5 seconds and sits alongside other content can be paused, stopped, or hidden — decorative motion included** (the criterion is not limited to content-bearing animation). Time limits are adjustable. (2.2.2, 2.2.1) **Project notes:** (a) the breathing/sparkler/fireworks/scene kill toggles exist for exactly this; every NEW ambient surface must join them. (b) **The muted autoplay demo-loop videos (card covers, post media) are auto-starting moving content under this criterion** — they need a pause path too: wire them to the global motion kill (pause all `<video autoplay>` when motion is off) or switch to hover/in-view play with a pause control. A loop with no off switch is a violation on the site's most important surface.

**Rule 72 - Nothing flashes more than 3 times per second.** (2.3.1) **Project note: the fireworks feature is the one surface on this site that needs a real flash-threshold audit** — burst frequency, area, and red-flash content. Method in Section J, Step 1.

**Rule 73 - Skip link to main content; descriptive `<title>` per page; logical focus order.** (2.4.1, 2.4.2, 2.4.3)

**Rule 74 - Link text describes the destination; headings/labels describe their content.** (2.4.4, 2.4.6)

**Rule 75 - More than one way to reach a page** (nav plus search, sitemap, or index). (2.4.5)

**Rule 76 - Visible focus indicator on every interactive element; the focused element is never fully hidden behind sticky headers/overlays.** Never `outline: none` without a replacement. (2.4.7, 2.4.11)

**Rule 77 - Path-based gestures and drags have single-pointer, non-drag alternatives; actions fire on release.** (2.5.1, 2.5.2, 2.5.7)

**Rule 78 - The accessible name of a control contains its visible label text.** (2.5.3)

**Rule 79 - Device-motion-operated features can be disabled and have a conventional UI alternative.** (2.5.4) **Project-critical: the merged card's gyro tilt is motion actuation** — it must be disableable and nothing may depend on it.

**Rule 80 - Pointer targets at least 24×24 CSS px or sufficiently spaced.** (2.5.8; pairs with Principle 4.)

### Understandable

**Rule 81 - The page declares `lang`; inline language changes are marked.** (3.1.1, 3.1.2 — duplicate of Rule 16; edit both together.)

**Rule 82 - No surprise context changes: focus or input never auto-navigates or auto-submits.** (3.2.1, 3.2.2)

**Rule 83 - Navigation and component naming consistent across pages.** (3.2.3, 3.2.4)

**Rule 84 - Help mechanisms, where present, appear in the same relative place on every page.** (3.2.6)

**Rule 85 - Form errors identified in text; fields labeled; correction suggestions offered; destructive submissions get review-or-confirm.** (3.3.1–3.3.4)

**Rule 86 - Authentication never requires puzzles, memorization, or transcription; no asking for the same info twice in one process.** (3.3.7, 3.3.8 — DORMANT: no auth/forms on this site yet.)

### Robust

**Rule 87 - Custom widgets expose name, role, and value via correct ARIA; prefer native elements.** (4.1.2)

**Rule 88 - Status messages are announced via `role="status"`/live regions without moving focus.** (4.1.3 — the achievement toast already does this; keep it true.)

**Rule 89 - Respect `prefers-reduced-motion` for all non-essential animation.** Strictly AAA (2.3.3) but adopted as HARD here: reduced/static variants of the canvas scene and transitions are mandatory.

---

## I. UX Design Principles (SOFT guidance)

From Laws of UX (Jon Yablonski). Not pass/fail — heuristics for analyzing layouts, navigation,
and interactions. Deviate knowingly, not accidentally — **and "knowingly" is defined by this
project's own documents**: the design vision (see Step 0 for paths — Neocities energy, festival
identity, hand-placed intentionality) and the priority stack (scannability is the hard floor;
the spark decorates everything scannability doesn't break). A finding that a principle is
"violated" by deliberate festival personality is not a finding — flag only where friction hits
the floor: findability, readability, orientation, speed.

**Principle 1 - Jakob's Law.** Users import expectations from every other site. Spend novelty on visuals and content; keep navigation, scrolling, and link behavior conventional.

**Principle 2 - Aesthetic-Usability Effect.** Polish masks friction. Test flows with the styling mentally stripped away — but judge the result against the design vision, not against a generic minimal portfolio.

**Principle 3 - Hick's Law / Choice Overload.** Short nav, few CTAs, progressive disclosure for depth.

**Principle 4 - Fitts's Law.** Big, close, well-spaced targets; pairs with hard Rule 80.

**Principle 5 - Miller's Law / Chunking.** Group content into small meaningful clusters, not long undifferentiated lists.

**Principle 6 - Cognitive Load / Occam's Razor.** Among designs that work equally well, ship the one with fewest elements and assumptions.

**Principle 7 - Doherty Threshold.** Response under ~400ms or immediate feedback (skeletons, optimistic UI). Motivates Rule 48 and instant interaction feedback.

**Principle 8 - Von Restorff Effect.** Reserve visual distinction for the one thing that matters most per view.

**Principle 9 - Serial Position / Peak-End.** Strongest work opens and closes the project list; the final screen deserves as much intent as the hero.

**Principle 10 - Goal-Gradient / Zeigarnik.** Show progress in multi-step flows; make remaining steps visible.

**Principle 11 - Gestalt grouping (Proximity, Similarity, Common Region, Connectedness).** Group with whitespace first; borders and boxes second.

**Principle 12 - Pragnanz / Selective Attention.** Simple silhouettes for layout; never hide critical info inside decorative regions users learn to ignore.

**Principle 13 - Mental Models / Paradox of the Active User.** Nobody reads instructions; the obvious first action must be the correct one.

**Principle 14 - Tesler's Law.** Absorb irreducible complexity in implementation, never push it onto the visitor.

**Principle 15 - Pareto / Parkinson.** Timebox polish on low-traffic pages; spend the budget on screens that carry the experience.

---

## J. UX/A11y ANALYSIS PROCEDURE (the instruction set)

This section is executable instructions for an agent running an analysis pass.

### Step 0 — Load project context FIRST
Read before analyzing, in this order:
1. `redesign-lab/final-picks.md` — what is decided, what is deliberately unbuilt (e.g. the
   about block), what is provisional. Do not flag placeholders or parked items as defects.
2. The design vision + priority stack:
   `C:\Users\Rod\.claude\projects\C--Users-Rod-Documents-ProjectFiles-Website\memory\project_design_vision.md`
   — what "intentional" means here. If that path is unreachable from your session, STOP and ask
   Rod for the design-vision summary rather than analyzing without it.
3. The provenance contract:
   `C:\Users\Rod\.claude\projects\C--Users-Rod-Documents-ProjectFiles-Website\memory\project_code_provenance.md`
   (governs the Output rules below; the operational ledger is `redesign-lab/element-tracker.md`).
4. This file, Sections H and I.

### Step 1 — Hard pass (Section H), page by page
- Scope (current phase): `redesign-lab/archive/2026-08-18-retired/aggregate.html` (retired
  2026-08-18, kept as the verbatim source for section-head variant C), each component at
  `redesign-lab/extracted/?c=<id>`. (Post-assembly: every real page template.)
- **The bench's own chrome (menu, tuner column, stage labels) is lab tooling — exclude it from
  findings; analyze only the mounted component.**
- **Findings require rendered evidence, not code reading alone.** Verify in a real render:
  headless capture (`redesign-lab/shot.ps1`, `?jump=<id>` for below-fold sections), a keyboard
  tab-walk for Rules 69, 73, 76, and 320px-width and 200%-zoom renders for Rule 64.
- **Contrast (Rules 63, 66):** compute ratios — never eyeball. For text on a flat color, use
  computed styles. **For text over gradients, video, canvas, or glass (most of this site):
  computed background is meaningless — sample the rendered screenshot pixels in the text's
  bounding region and compute against the WORST-CASE (lightest-behind-light-text /
  darkest-behind-dark-text) background luminance.** For video, sample several frames.
- **Flash audit (Rule 72):** capture the fireworks surface as a frame sequence (ffmpeg from a
  screen recording, or repeated timed captures), then count luminance transitions per second in
  the affected region; >3 general flashes or any red flash per second fails.
- Each finding records: **Rule # + WCAG criterion · location (page → selector) · evidence
  (measured value / repro steps / screenshot) · severity.**

### Step 2 — Soft pass (Section I)
- Walk the 15 principles per page. For each candidate finding, first ask: *is this the design
  vision operating as intended?* If yes, it is not a finding (note it as a known deviation at
  most). Flag only floor violations: can't find the work, can't read, can't orient, too slow.
- Soft findings record: principle · observation · who it affects · a proposal (see below).

### Severity scale
- **Blocker** — WCAG A/AA violation that prevents access (focus trap, unreadable contrast,
  keyboard-dead control). Fix before ship.
- **Major** — AA at risk or significant friction on a core flow (landing → project → read).
- **Minor** — real but low-impact; batch into polish passes.
- **Note** — heuristic observation or known deviation; no action required.

### Output rules — REPORT, NEVER CHANGES
- The analysis produces a **markdown report**, nothing else, written to
  **`redesign-lab/analysis/<YYYY-MM-DD>-uxa11y-report.md`** (one file per run; never overwrite a
  previous run's report). Structure: findings table up top, per-finding detail below.
  **No code changes during analysis. No "quick fixes."**
- Every proposal is a PROPOSAL: what to change, why, and — per the **Code Provenance
  Contract** — where the fix's code would COME FROM (an existing sourced component in
  `extracted/`, a cited reference snippet, or "needs a source → ask Rod"). A fix with no
  source is not a proposal, it is future slop.
- Implementation happens only after Rod approves, follows Sections A–G, and lands in the
  ledger like any other change.

---

## Quick decisions for this project

- HTML/CSS: Google HTML/CSS Style Guide base. CSS naming: BEM. Architecture: ITCSS.
- JS: Airbnb via `eslint-config-airbnb-base`, ES modules, named exports.
- Build: keep Rollup; hashed output; code-split Three.js scenes.
- Enforcement: Prettier + ESLint + Stylelint + EditorConfig on pre-commit; axe-core/Lighthouse
  against rendered pages in CI.
- Accessibility: WCAG 2.2 AA hard, plus reduced-motion (AAA 2.3.3) adopted as hard.
- UX analysis: Section J procedure; design vision and provenance contract always in scope.
