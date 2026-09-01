28 component directories at `C:/Users/Rod/Documents/ProjectFiles/Website/redesign-lab/extracted/components/`. Context read: `element-inventory.md`, `element-tracker.md`, `HANDOFF.md`, `docs/PAGE-PROCESS.md`, `docs/STATUS.md`, the bench `registry.js`, and the five page blockouts (`post-tests.html`, `projects-tests.html`, `ramblings-tests.html`, `about-tests.html`, `portal-404-tests.html`).

---

# PART 1 — COMPONENT INVENTORY (28 dirs)

Tier/idea values are quoted from `element-tracker.md`; where the tracker and `bench/registry.js` disagree I flag it.

### Global chrome

**1. `top-bar/`** (html 3.4K, css 5.1K, js 410B) — the site header. Markup: `.top-bar` with `__left` (favicon + `.top-bar__logo` wordmark), centered `.top-bar__nav` of 4 `.top-bar__link` (Home/Projects/About/Ramblings, `is-active`), and `.top-bar__toggles` holding 3 small square slap toggles (Breathing/Sparkler/Fireworks). CSS: bar layout, nav pill with rising-circle `::before` fill on hover/active, a ghost-at-rest slap skin override, mobile two-row reflow. Deps: `slap-toggle`, `favicon`. Tier: Remixed (norikura shell + hana nav ignite + YarivFrd toggles). Most recently touched file in the tree (2026-08-16 favicon unbundle: gap 0.9→2.4rem, mark 3.2→3.75rem). **Slot: ALL page types (post/projects/about/ramblings/resume/portal). Already the only component the five page blockouts actually consume.**

**2. `favicon/`** (html 1.1K, css 1.5K, js 293B) — top-left home mark. Markup: `.favicon` > `.favicon__magnet.js-magnetic[data-magnet-clamp=6]` > `.favicon__img` (`/assets/img/favicons/favicon.svg`), plus a `.favicon--square` variant. CSS: clamped magnet box, spin-on-hover, `.is-earned` continuous-spin achievement state. Tier: Slop/mine — **open tier question for Rod** (it's his own Figma artwork; "Slop" fits the letter of the law, not its intent). **Slot: ALL page types.**

**3. `site-footer/`** (html 182B, css 785B) — `.site-footer` with a "thanks for wandering by" line + `.site-footer__links` single about-me link. CSS: centered mono, letter-spaced, one link hover. Tier: Slop (lead: HANA/norikura-junni minimal). Registry notes nav links were dropped per Rod and an about-page self-link variant is TBD. **Slot: ALL page types.**

**4. `picture-frame/`** (html 392B, css 2.1K) — fixed viewport frame. Markup: one `.picture-frame` div + `.picture-frame__gutter` carrying two gutter-type spans. CSS: `position:fixed`, inset 20px (15 ≤768), rx 8 (6), 1px stroke; `--open` modifier = stroke only. Tier: Remixed/theirs (109ichiki `._frame`), their SVG rect+mask rebuilt as inset + one outset box-shadow so no resize JS. **Slot: ALL page types (global furniture).** Open call in the ledger: the faithful opaque band crops the lantern scene, so `--open` is what the assembly uses.

**5. `edge-rails/`** (html 464B, css 2.1K) — fixed full-height illustration rails at both window edges. Markup: `.edge-rail--l` / `--r` (+ `--noart` placeholder state). CSS: `position:fixed;top:0;height:100%;pointer-events:none`, art sized by height, hidden ≤450px, `--rail-art` slot. Tier: True mechanism / **artwork owed**. ⚠️ **REJECTED by Rod 2026-08-13** — painted dividers read as stickers over the live scene. Kept as a proven transcription, unused. **Slot: would have been global furniture; currently none.**

**6. `seam-band/`** (html 642B, css 2.5K, +`tiling-test.svg`) — painted section transition, two separate mechanisms: `--tiled` (160px, `repeat-x top / 70%`, ndt) and `--sheet` (96px painted `<hr>`, harumaki main). `--seam-art` slot, degrades to a hairline. Tier: True mechanism / artwork owed. ⚠️ **REJECTED with edge-rails.** **Slot: would have been section transitions on landing/any long page; currently none.**

### Interaction infrastructure (no page slot of their own)

**7. `drift-magnet/`** (html 2.0K, css 4.0K, js 11.2K — the largest JS in the bench) — THE base interaction engine. Hooks: `.js-magnetic`, `data-drift`, `data-drift-x/y`, `data-drift-speed`, `data-strength`, `data-strength-text`, `data-magnet-clamp`, `data-click-flash`, `.js-magnetic-inner`. Magnet overrides drift via blend-lerp; graceful motion-off (ramps to origin, never freezes mid-drift); activation culling; dynamic `will-change`; exported `retune(el)`. Its own demo markup (`.dm-social` circles with rising fill, `.dm-favicon`) is bench-only. Tier: Remixed (breakdance4fun drift × dennissnellenberg/tdesero magnet × chriskalafatis lerp), orchestration = Rod's idea. **Slot: cross-cutting dependency of nearly every other component. Not a page slot.**

**8. `magnetic/`** (html 812B, css 841B, js 3.1K) — the earlier standalone magnet, bare pills at strength 24/40/70 for judging pull in isolation. Tracker: **superseded by drift-magnet** once buttons/socials/favicon/nav migrate. **Slot: none (legacy).**

**9. `cursor-coords/`** (js 921B, **no html, no css**) — one `pointermove` + one rAF broadcast to registered handlers via `onCursor(fn)`, returns an unsubscribe. Pure infrastructure so card band-reveal, cursor glow etc. don't each run their own loop. **Slot: none (infra).**

**10. `cursor-glow/`** (html 837B, css 1.5K, js 1.1K) — full-page warm vignette following the cursor. Markup: a single `.cursorglow` div (the demo panel grid below it is bench-only). CSS: fixed radial at `--cx/--cy`, gold. Tier: Remixed/theirs (brittanychiang + merodev `.cursorglow`, recolored purple→gold). **Slot: ALL page types (global ambience), if kept.**

### Controls

**11. `button-kit/`** (html 1.3K, css 4.0K, js 240B) — the button family. Markup: `.kit-button--primary` / `--outline` / `--pill` (each with `__fill` + `__label`), an `.inline-link` with animated underline, and three `.kit-tag` chips. All magnetic (buttons 55, tags 25). CSS: rising-circle/translate fill sweep, tag hover, `::after` scaleX underline. Tier: Remixed (phojanecki primary ripple + nfranciosi outline/pill fill + MauriciAbad underline). **Slot: ALL page types — CTAs, "read more", "view all", tag chips, inline prose links.**

**12. `slap-toggle/`** (html 1.5K, css 3.7K, js 2.4K) — segmented two-label toggle (Technology ↔ Personal) with a sliding `__flap` whose text tracks the active label; `--small` and `--square` variants. Tier: Remixed/theirs (codepen YarivFrd PEOJLj, recolored, JS `.on` class because the `:checked~.flap` sibling was unreliable). **Slot: top bar (all pages) + about/resume skills section (Technology↔Personal split).**

**13. `goo-toggle/`** (html 2.2K, css 3.9K, js 326B) — SVG gooey toggle: `feGaussianBlur` + `feColorMatrix` goo filter over a track/capsule/tail/orb, with word + state labels; `--small` variant. Note: the filter `<defs>` id is global, exactly one per document. Registry: nicolasjesenberger `xxmbvxL`, recolored. **Slot: hero/landing background scene switch (currently used inside `hero/`); a settings control anywhere.**

**14. `list-controls/`** (html 1.2K, css 3.8K, js 809B) — the index-page control cluster, three parts in one component: `.list-controls__search` (always-open square input, blinking border-caret), `.list-controls__filters` (5 magnetic filter buttons with `is-active`), and `.list-controls__empty` (heading + body + "browse all" link, no dashed border). Tier: caret Remixed (atelierbram); filter pills phojanecki and empty state PatternFly confirmed from source in the hana ledger; box/prefix still Slop. **Slot: projects, ramblings, archives/tags — any list index.**

### Cards

**15. `merged-card/`** (html 4.8K, css 10.2K — the largest CSS, js 8.6K) — the base project/post card and its bento grid. Markup: `.merged-cards` grid using `data-column-span="6|12"` / `data-row-span="2"` (bento `[6r2][6][6][12]`), each cell an `article.post-card` > `.card-link` > `.card-tilt` > `.card-flipper` with `.card-front` (`.card-cover` video, `.card-pin` / `--wip`, `.glass-plane`, `.card-body` h3 + `.card-meta`) and `.card-back` (`.takeaway-quote`, `.takeaway-text`, `.back-read`). CSS: z-depth `.z-layer` vars, glass plane, flip, tilt, hue variants `posts-grid-hue-a/b`. JS: dwell-flip, glass toggle. Tier: Remixed/True mixed — hana panel + frame-draw, real project `<video>` from the live site (Rod's own = True), corner-ribbon pin (Rod snippet). **Slot: projects grid, post "related posts", blog/ramblings preview cards, landing featured grid.**

**16. `project-cards-expensive/`** (html 9.1K, css 7.3K, js 3.1K) — the COMBINED keeper stack layered on the real merged-card: drift + magnet on the whole card, glass band-reveal on the front, back-side glow, parallax tilt/flip, **video plays on hover only** (project-page perf precaution). 9 cards. Bench controls (Layout: Bento/Staggered/Regular · Corners: Square/Round · 4 range sliders for `--glow-r`, `--z-glass`, `--z-body`, `--z-title`) are lab-only chrome. Dep: `merged-card`. **Slot: landing featured grid (capped) and/or projects wall — the ledger explicitly scopes the full luxe stack to the CAPPED grid.**

**17. `card-tests/`** (html 1.4K, css 4.1K, js 7.0K) — **lab harness, not a page slot.** Two grids of the real card at scale: Variant A = magnet+drift, Variant B = yannesidibe band-reveal, with activation culling, a live FPS readout and a "push to 100 cards" stress test. Answers the project-page card-count perf question.

**18. `glow-edge-tests/`** (html 1.8K, css 6.5K, js 4.5K) — **lab harness, not a page slot.** 7 isolated treatments + 1 stacked, cloned from one `<template>` card so the treatment is the only variable, plus a "light every card together" comparison switch. Built because Rod said the band-reveal "looks more like a metal band than a glow". The three winning treatments (`plus-lighter`, `blur(2.5px)`, unmasked spill) are **claude-origin and count against the <25% guardrail**.

### Post-page content blocks

**19. `post-header/`** (html 284B, css 988B) — `.post-header` > `__inner` > `__title` h1 + `__meta` (date · read time · category). Tier: tracker says **Slop / no source**; registry says "sengoku-sourced centered title card" — **the two disagree, needs resolving.** Watch the flagged `.ph`/`.phead` collision with the foundations placeholder. **Slot: post.**

**20. `tldr-callout/`** (html 219B, css 703B) — `.tldr-callout` aside with a `__title` "TL;DR" + body. CSS: left-accent amber, tint, faint glow. Deliberately distinct from the stamp takeaway. Tier: Slop (lead: hana callout family). **Slot: post; the tracker also says About bio cards should MATCH this callout family (Rod, 2026-06-09).**

**21. `stamp-callout/`** (html 264B, css 1.2K) — `.stamp-callout` aside, "Takeaway" title, with a perforated stamp edge via `::before`. Tier: **Rod-provided CSS, APPROVED.** **Slot: post (takeaway block); reusable on about.**

**22. `quote-block/`** (html 143B, css 580B) — one `<blockquote class="quote-block">`. CSS: bare left bar + Shippori italic, per Rod's remix spec (harumaki shape × hana type). Tier: Slop with lead. **Slot: post; ramblings.**

**23. `code-block/`** (html 450B, css 1.3K, js 720B) — `<figure class="code-block">` with `__head` (filename `__name` + `__copy` button) and `__body` with `__keyword`/`__symbol` spans. Filename tab + copy, **no traffic lights** (Rod). JS = copy-to-clipboard. Tier: Slop; the shadcn code-snippet block is the picked source but **re-proof is still owed** before it can be called True. **Slot: post (the core surface for shader/tech-art write-ups).**

### Lists / timelines

**24. `dated-timeline/`** (html 2.1K, css 3.2K, no js) — dated entry list, 3 entries. Markup per entry: `__datewrap` > `__date` (with `__weekday`), `__rule`, `__body` (h3 `__title`, `__text`, `__link`). CSS is verbatim geometry: 20% date / 4% tiled rule (+2% margin) / 70% body, `space-between`, entry `margin-bottom:100px`, date 36px (26px ≤1024), weekday 16px, and **the move: `position:sticky; top:100px` on the date** so it hangs beside its entry for the whole read. `--tl-rule` degrades to a hairline. Tier: **True/theirs** (harumakigohan `/10/` `.handmade_*`). **Slot: ramblings index (its most natural home) or archives.** STATUS.md flags that it survived the divider cull but **its placement has no legitimate home yet** — the frozen 12-section flow has no ramblings section. Rod's call.

**25. `reel-band/`** (html 137B, css 886B) — `.reel-band` full-bleed cinematic band with a `__label`. Sits above the cards at page level. Tier: Slop, no ref yet. **Slot: landing (demo reel); possibly projects header.**

### Skills / identity

**26. `draw-in-icons/`** (html 3.4K, css 2.4K, js 756B) — 8 tool icons (HLSL, Compute, Unity, Three.js, Git, RenderDoc, Blender, C#) as inline SVGs with `pathLength="1"` stroke draw-in on a staggered `--d`, each `.draw-in-icons__skill` magnetic with the icon as inner-parallax. Tier: **True (animation)** from stephanewillems / **Slop (content)** — the icon geometry is hand-approximated and official SVGs are owed. The cursor recolour circle was **deleted 2026-08-13** (Rod: clearly-AI artifact; the clone desynced from the draw-in). **Slot: about (tools/skills), resume (skills grid), landing tools strip.**

**27. `hero/`** (html 3.3K, css 3.0K, js 417B) — landing hero: `.hero__logo` "rodney fan" + `__subtitle`, `__tagline`, `__switch` (an embedded goo toggle, `js-scene-switch`, Lanterns↔Bloom), `__scrollcue` (chriskalafatis chevron SVG, **Remixed/True**, magnetic), and `__social` rail of 4 links anchored to the hero's right. ⚠️ **SUPERSEDED:** the locked hero is **V6, and V6 lives in `redesign-lab/hero-tests.html?v=v6`, not in this directory.** This component is the older harumaki-style hero. **Slot: landing only.**

### Lab tooling (never ships)

**28. `palette/`** (html 260B, css 1.6K, js 4.6K) — live-editable colour token panel; overrides persist to localStorage and recolor every component plus `aggregate.html`. Explicitly lab tooling. **Slot: none.**

---

# PART 2 — COVERAGE TABLE BY PAGE TYPE

Slot lists are taken from `element-tracker.md`'s own by-surface sections plus the slots the 2026-08-16 blockouts actually reserve space for. "Covered" means a component directory provides markup + CSS for it today.

### Shared chrome (applies to all six page types)

| Slot | Covered by | Status |
|---|---|---|
| Top bar / nav | `top-bar/` | ✅ (+ active-nav indicator has no source: Slop) |
| Favicon / home mark | `favicon/` | ✅ (tier ruling owed) |
| Footer | `site-footer/` | ✅ |
| Buttons, tags, inline links | `button-kit/` | ✅ |
| Outer picture frame | `picture-frame/` | ✅ (`--open` in use) |
| Cursor glow / lantern vignette | `cursor-glow/` | ✅ |
| Magnet + drift behaviour | `drift-magnet/` (+`cursor-coords/`) | ✅ |
| Theme toggle (dark/light) | — | ❌ NOTHING |
| Back-to-top button | — | ❌ NOTHING |
| Tooltips | — | ❌ NOTHING |
| Page transition | — | ❌ NOTHING (kaitonote line-transition source scraped, unbuilt) |
| Scrollbar | — | ❌ NOTHING (live site has amber, needs retune) |
| Sparkler cursor trail | — | ❌ NOTHING in bench (exists on live site only) |
| Skip link / focus furniture | — | ❌ NOTHING |
| Section transition | `seam-band/`, `edge-rails/` | ⛔ REJECTED — space + scene + label instead |

### POST

| Slot | Covered by | Status |
|---|---|---|
| Post header (title/meta/read-time) | `post-header/` | ✅ (source conflict: tracker Slop vs registry "sengoku") |
| TL;DR block | `tldr-callout/` | ✅ |
| Takeaway block | `stamp-callout/` | ✅ (Rod-approved) |
| Blockquote | `quote-block/` | ✅ |
| Code block + copy | `code-block/` | ✅ (re-proof owed) |
| Related posts cards | `merged-card/` | ✅ (reusable) |
| Meta chips / tags | `button-kit/` `.kit-tag` | ⚠️ partial — tag chips exist, post meta chips not styled as a component |
| Content reading well / prose scale | — | ❌ NOTHING as a component (only inline CSS in `post-tests.html`) |
| Sticky metadata rail | — | ❌ NOTHING as a component (only inline in `post-tests.html`) |
| TOC (desktop sidebar + mobile popup) | — | ❌ NOTHING |
| Reading progress bar | — | ❌ NOTHING |
| Hero media (masked, not boxed) | — | ❌ NOTHING |
| Image lightbox | — | ❌ NOTHING |
| Prev/next nav cards | — | ❌ NOTHING |
| Footnotes / references | — | ❌ NOTHING |
| "Copy for LLM" / "View as Markdown" | — | ❌ NOTHING (invented in the blockout only) |

### PROJECTS

| Slot | Covered by | Status |
|---|---|---|
| Project card | `merged-card/` + `project-cards-expensive/` | ✅ (two, plus two lab harnesses judging them) |
| Grid layouts (bento / staggered / regular) | `project-cards-expensive/` | ✅ (cycler button) |
| Pinned / WIP badge | `merged-card/` `.card-pin` | ✅ Remixed |
| Key-learning hover reveal | `merged-card/` `.card-back` | ✅ (Rod's concept) |
| Search bar | `list-controls/` | ✅ |
| Filter pills | `list-controls/` | ✅ |
| Empty state | `list-controls/` | ✅ |
| At-scale perf story | `card-tests/` | ✅ (harness, 100-card stress) |
| Page head (label + h1 + lede) | — | ❌ NOTHING as a component (inline in `projects-tests.html`) |
| Section header / "Featured Projects" cluster | — | ❌ NOTHING |
| "View All" button | `button-kit/` shape only | ⚠️ partial — shape yes, the slot's own treatment is Slop |
| Pagination / load-more | — | ❌ NOTHING |
| Category tree / collapse | — | ❌ NOTHING |
| Sort control | — | ❌ NOTHING |

### ABOUT

| Slot | Covered by | Status |
|---|---|---|
| Tools / skills icon strip | `draw-in-icons/` | ✅ animation True; **icon geometry + real tool SVGs owed** |
| Technology ↔ Personal toggle | `slap-toggle/` | ✅ |
| Bio cards (intro / more) | `tldr-callout/` + `stamp-callout/` | ⚠️ partial — Rod said bio cards should MATCH the callout family, so the family exists but no about-specific component does |
| Portrait / avatar | — | ❌ NOTHING |
| Stats numbers | — | ❌ NOTHING (direction set: solid amber serif; hollow stroke rejected) |
| "Currently studying…" status line | — | ❌ NOTHING (lead: adevade pulse ring) |
| Achievements trophy grid | — | ❌ NOTHING (emoji placeholders in `about-tests.html` only) |
| Achievement unlock toast | — | ❌ NOTHING built (robooneus source in hand) |
| Status/metadata rail (Now / Tools / Open to) | — | ❌ NOTHING as a component (inline in `about-tests.html`) |
| Contact / hire block | — | ❌ NOTHING |
| Long-form about prose well | — | ❌ NOTHING; and the tracker still records the about block as *"a fail, mostly slop — needs a dedicated design conversation before building"* |

### RAMBLINGS

| Slot | Covered by | Status |
|---|---|---|
| Dated entry list / log | `dated-timeline/` | ✅ True/theirs — **but STATUS.md says it has no legitimate home yet** (the frozen 12-section flow has no ramblings section) |
| Entry preview cards | `merged-card/` | ✅ (reusable) |
| Search / filter / empty state | `list-controls/` | ✅ (reusable) |
| Prose blocks (quote, callouts, code) | `quote-block/`, `tldr/stamp`, `code-block/` | ✅ (reusable; post and ramblings share the template) |
| Page head / index header | — | ❌ NOTHING as a component |
| Archives timeline (by year) | — | ❌ NOTHING |
| Tag index / tag page | — | ❌ NOTHING |
| RSS / subscribe affordance | — | ❌ NOTHING |
| Ramblings voice/tone furniture (midnightsolarium lead) | — | ❌ NOTHING |

### RESUME

| Slot | Covered by | Status |
|---|---|---|
| Skills grid | `draw-in-icons/` | ⚠️ only reusable candidate |
| Buttons (download / contact) | `button-kit/` | ⚠️ generic shapes only |
| Experience / timeline entries | `dated-timeline/` | ⚠️ reusable candidate, never scoped for this |
| Header / identity block | — | ❌ NOTHING |
| Education, experience, credits sections | — | ❌ NOTHING |
| Print / PDF stylesheet | — | ❌ NOTHING |
| Download-CV affordance | — | ❌ NOTHING |

**Resume is the least-covered page type by a wide margin.** It has zero dedicated components, zero rows anywhere in `element-tracker.md`, and no blockout file — its only existence in the repo is backlog item **G3** in `feature-backlog.md` ("`/resume` page (clean, conventional, subtly linked) — TODO. Long-agreed.") and a passing mention in `docs/PAGE-PROCESS.md`.

### PORTAL (+ 404)

| Slot | Covered by | Status |
|---|---|---|
| Two-door cards (Tech Art / Game Design) | — | ❌ NOTHING (inline `.door` markup in `portal-404-tests.html` only) |
| Time-of-day greeting | — | ❌ NOTHING as a component (copy exists on the live site) |
| Ramblings link (coffee + steam SVG) | — | ❌ NOTHING in bench (live site only, provenance unproven) |
| Portal chrome (bar/footer/frame) | `top-bar/`, `site-footer/`, `picture-frame/` | ✅ (shared) |
| 404 page | — | ❌ NOTHING (inline in the blockout) |
| 404 "ways back" links | `button-kit/` | ⚠️ generic shapes only |

---

## Cross-cutting observations

1. **Coverage is inverted against priority.** The bench is deep on chrome, controls and cards (16 of 28 dirs) and thin-to-empty on everything that makes a *post* readable — no TOC, no reading well, no progress bar, no prev/next, no hero media, no lightbox — even though the tracker names the post page "core — shader/tech-art write-ups".

2. **Portal and resume are near-zero.** Portal has three tracker rows and no components at all; resume has neither. This is consistent with the "portal is not the landing page" priority call, less so for resume.

3. **Four of the 28 dirs are not page components:** `palette/` (lab tooling), `cursor-coords/` (infra JS, no markup or CSS at all), `card-tests/` and `glow-edge-tests/` (A/B harnesses). Two more are dead or superseded: `magnetic/` (superseded by `drift-magnet/`) and `hero/` (superseded by V6, which lives in `hero-tests.html`, not in `components/`). Two more are rejected-but-kept: `seam-band/`, `edge-rails/`. **Effective shippable component count is 20, not 28.**

4. **The five page blockouts do not use the bench.** `post-tests.html`, `projects-tests.html`, `ramblings-tests.html`, `about-tests.html` and `portal-404-tests.html` each link exactly two component stylesheets — `top-bar` and `favicon` — and hand-write every other slot inline. That is deliberate per `docs/PAGE-PROCESS.md` ("Post, projects, about, ramblings, resume and portal are all at BLOCKOUT stage — do not build them from bench components and do not apply the palette"), so the gap between "component exists" and "page uses it" is by design at this stage, not an oversight.

5. **Two provenance items surfaced during the inventory, both needing a ruling, neither a proposal:** the `post-header` source conflict (tracker `Slop / —` vs registry "sengoku-sourced"), and the standing favicon tier question already logged in the ledger.