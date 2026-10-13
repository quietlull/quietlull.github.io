---
name: project-reference-site-breakdowns
description: "Detailed per-site teardowns for the redesign (hana bloom recipe, harumakigohan, the 9 SANKOU picks, his own site) + the canonical big-reference list. Companion to project-visual-references."
metadata: 
  node_type: memory
  type: project
  originSessionId: abec0419-fe69-439f-9691-f740e9de223f
---

# Reference site breakdowns (redesign)

Detailed companion to [[project-visual-references]] (which holds the principles/direction/plan). THIS file is the durable home for the per-site analysis so it survives context shrink. Do not lose it.

## THE BIG REFERENCE SITES (canonical list + Rod's verdicts)

| Site | Bucket | Rod's verdict / what to steal |
|---|---|---|
| **harumakigohan.com** | VIBE (#1) | **LOVES.** His top vibe match. Blue+pink twilight, hand-drawn, organic orb layout. Full breakdown below. |
| **hana.b-rave.tokyo/tour/borntobloom/** | GLOW | **The glow bible.** Full bloom recipe below. Steal technique, not the red. |
| **midnightsolarium.neocities.org** | CRAFT/SOUL | **LOVES — touchstone.** Hand-built lo-fi web craft, personality in microcopy. The "soul" model. |
| romanjeanelie.com | craft | Admired NOT the vibe — restraint/negative-space to emulate, not the direction. |
| dimden.dev | interaction | North star for a few hand-made interactive surprises on a calm page. |
| tomareruengeki.com | VIBE | **Rating 6/10** (low-priority band). Painted navy night, works-as-scenes. Teardown below. |
| norikura-hanabi.com | VIBE | **Rating 8/10** (Rod: 7-9; most aligned non-tier-1). Midnight-blue + fireworks, single gold accent, masked light. Advances palette+type+restraint. Teardown below. |
| ru-ru-ru.com | SHAPE | **Rating 5/10** (low-priority band). Kraft-paper charm, mascot + speech bubbles. Teardown below. |
| infinity-lawfirm.com | SHAPE | Clean palette/icons, "informative yet charming" = his 65/35 + scannability made concrete. PENDING teardown. |
| no-12.jp | SHAPE | Little details + ambient motion everywhere; likes shapes/look not layout. PENDING teardown. |
| junni.co.jp | TECH | **Rating 7/10** (top of low-priority band). Strongest execution model; clean+modern. Teardown below. |
| ambientweaving2.lab.zozo.jp/virtualgallery | TECH | Interactive 3D gallery. Likes the IDEA, unsure about imitating for a portfolio. |
| wolfvanveen.art | REJECTED | "Dislike its look." Do NOT resurface. |
| feign.neocities.org | REJECTED | Disliked (gothic black/red). Do NOT resurface. |

PENDING = Rod can relay an in-browser-agent teardown (the agent that did hana) using the 8-heading brief in [[project-visual-references]].

---

## HANA BLOOM RECIPE — full teardown (2026-06-03, in-browser agent reading live CSS)

The definitive technical bridge for the de-glow rework. Stack: GSAP + Lenis + split-text + image-layer parallax (NO WebGL/canvas/video). Steal the TECHNIQUE, not the red palette. (My own earlier CSS scan corroborates: `drop-shadow` x429 vs `box-shadow` x15; one `mix-blend:screen` overlay = the drifting petals; 4 keyframes / 2 animation rules because the bloom is transition-driven not keyframe-driven.)

### The core trick (replaces Rod's box-shadow-on-rectangles entirely)
- Glow = `filter: drop-shadow()` on a SHAPED element, NEVER box-shadow on a glowing rectangle (one exception: square cards, below).
- **Stack 2-3 identical drop-shadows** on the same element -> opacity builds in the blurred core = dense bright center + feathered edge = "bloom/additive" WITHOUT mix-blend-mode.
- **Animate ONLY the alpha** of the shadow color (rgba(255,26,0, 0) -> 0.4-0.8). Blur radius/offset never change -> GPU-composited, cheap, jank-free.
- **Glow color HOTTER/more saturated than the fill** (#FF1A00 glow over #C40018 fill): "the light looks hotter than the objects it lights" = sells "glowing" vs merely "colored."
- Blur authored in VIEWPORT-RELATIVE units (calc in 4K/3840 design px) so bloom stays proportional at every screen size.

### Two bloom SYSTEMS + one exception
- **System A - text bloom (hover-driven):** glow directly on text glyphs via drop-shadow (NOT text-shadow, so the halo traces the exact letterform). Pre-declared alpha 0; on `:hover` (gated by `[data-hover]` html class = off on touch) animate alpha to ~0.4. `transition: filter .125s cubic-bezier(.215,.61,.355,1)` (ease-out-cubic) -> letters "ignite."
- **System B - panel bloom (scroll-ignite, the memorable one):** glow on a shaped `::before`/`::after` carrying `background-image` of the panel edge art (dark translucent webp with a notch) so drop-shadow hugs the organic edge. Driven by IntersectionObserver adding `.is-intersection`. Two-part staged reveal: `background-position` slides edges together 2s `cubic-bezier(0,.5,0,1)` + `filter` alpha 0->0.8 over 1s linear, BOTH delayed .5s -> panel "assembles AND ignites" after the heading appears. Alpha tops 0.8 (vs 0.4 hover) for far-from-viewer punch. Linear ramp = "powering on" (easing would flicker).
- **System C - square cards (exception):** real box-shadow, dual-layer (tight bright inner + wide faint outer): `0 0 40px rgba(255,26,0,.5), 0 0 80px rgba(255,26,0,.25)`. Used ONLY because the card is a 0-radius rectangle with no silhouette to hug.

### THE BIG ARCHITECTURAL LESSON (most important for Rod)
hana's blooms are mostly NOT continuously breathing - they IGNITE once on hover/scroll-in, then settle. The ONLY constant breath is a single background gradient layer (opacity 0->1->0, keyframe `background`). Rod's current site does the opposite: box-shadow breathing on EVERYTHING, constantly. **Fix = ignite-on-interaction + ONE ambient background breath**, not constant-breathe-every-box. Huge part of killing the uniform/Claude feel.

### hana palette (sampled) + translation to ROD'S twilight festival
- hana bg: near-black #0F0C09 -> blood-red #8E1808 (living radial gradient, drifting hotspots)  =>  Rod deep-navy -> twilight-blue night
- hana fill/text/accent (all one): crimson #C40018  =>  Rod amber/gold #F59E0B / #FBBF24
- hana glow: hot orange-red #FF1A00  =>  Rod HOTTER amber-white #FFD27A / #FFE8B0 (brighter than the amber fill - same principle)
- hana lone soft color: dusty rose-pink  =>  Rod pink firework/blossom accents
- KEEP Rod's Three.js lanterns as the ambient breathing layer (his version of hana's background gradient)

### Other hana notes
- Layout: full-bleed red field, content in a narrow ~720px centered column with big empty margins; generous NON-uniform vertical rhythm; sections numbered 01-07 like scroll-scenes; only Merchandise uses a true 3-col grid.
- Containers: translucent near-black panels (dark pools) OR bare elements on red; borderless transparent accordion rows (hairline + small triangle); square corners (0 radius) almost everywhere.
- Type: section titles in `scotch-display` (high-contrast editorial serif, ~95px, per-letter split); body/nav wide-tracked sans (`r41-alfabeta`, `togebaralight`); the "Born to Bloom" logo + "HANA/flower" monogram are HAND-DRAWN gothic/calligraphic illustrated marks (ornament only around key headers, rest stays clean).
- Buttons: square, no fill, no border - text + a long thin arrow inside a hairline-ruled bar.
- Motion: drifting rose petals with real depth (big motion-blurred foreground + small sharp background = parallax), a tiny bee flits between sections; signature payoff = footer "flower" kanji monogram morphs into the red "HANA" wordmark as big blurred petals fall.
- GOTCHA for rebuild: nav links report default blue #0000EE computed but render crimson - set link colors explicitly to #C40018, don't inherit.
- IGNORE a keyframe named `claude-pulse` if seen - it's tooling-injected, not part of the site.

### Minimal copy-recipe
Author blur in vw-relative units; glow on element `filter` (or shaped ::before image for organic edges); pre-declare alpha 0; animate ONLY alpha to ~0.4 (hover) / ~0.8 (ambient); stack 2-3x for dense core; glow color hotter than fill; fire panel glows on IntersectionObserver `.is-intersection` with `filter 1s linear .5s` + paired `background-position 2s` slide; keep one slow opacity gradient breathing underneath. (Rod has full direct edit control of his own site, so this agent builds it - no relay-agent code needed.)

---

## harumakigohan.com - feature log (2026-06-02, 4 screenshots captured)

Rod's #1 VIBE site (musician he loves; blue+pink are also his favorite colors).
- **Palette = blue->pink twilight**, validated: deep blue sky up top melting into magenta/pink cloud bands at the horizon. The "looking up above the clouds" feeling is literal (hero is a figure falling through a twilight sky with pink wispy light trails; celestial galaxy/comet/star motifs throughout).
- **Hand-drawn everything that matters:** logo is hand-lettered; section headers are wobbly hand-drawn words framed in `~tildes~` (`~NEWS~`, `~DISCOGRAPHY~`, `~SERIES~`). ZERO glow borders.
- **Organic, non-grid layout of works:** discography = album covers floating as scattered CIRCLES/orbs across the sky scene, not a card grid. THIS is the "organic layout" he loved.
- **Full-bleed cinematic bands:** Series section = edge-to-edge animated MV stills, letterboxed dark, no containers.
- Persistent floating nav cards bottom-right; vertical social rail; hamburger menu. Atmosphere from illustration + gradient, NOT UI chrome.
- **Structural steal:** each album is a WHOLE WORLD you enter (its own microsite/characters), not a product card. Hits "stories matter deeply" + "look at this."

---

## Low-priority site teardowns (rated 5-7 per Rod, 2026-06-04, via relay agent)

Rating band note: Rod flagged these as low-priority and asked to score them 5-7 (tier-1 sites harumaki/hana/midnightsolarium sit above this band). **CONVERGENCE across all three + harumaki: full-bleed bands + oversized display type over a plain/painted background, and NO CSS glow** - strong evidence Rod's layout grammar = BANDS not cards, and de-glow is correct.

### junni.co.jp - RATING 7/10 (strongest execution model)
Creative studio, ~11,200px, high-contrast dark + acid-green, very kinetic. Least warm/aligned aesthetically but best technique + the "clean+modern" Rod loves.
- Layout: centered hero w/ faint grid overlay; WORKS = full-viewport edge-to-edge scenes (one project = whole screen); services = left-aligned numbered list 01-05; lots of negative space.
- Containers: NONE - everything on the background. Emphasis via SCALE + transition, never shadows.
- Light: no glow at all. Energy = color contrast (acid-lime vs near-black) + motion. Flat/graphic/poster.
- Color: bg near-black #1C1D21, accent acid-lime #D3FF02, off-white section #F7F7F7.
- Type: bold grotesque sans; giant OUTLINED/ghost "WORKS" w/ hairline stroke; outlined ghost numerals; playful mixed-size lettering; hand-drawn JP subline.
- Liftable: "MENU" pill (text + dotted circular button) fixed top-right; chevron text-CTAs; rotated vertical copyright on right edge.
- STEAL: oversized outlined/ghost section titles + the acid-on-black sliding-bar WIPE section transition (kinetic "shutter") = maximal energy, zero shadows/gradients.

### tomareruengeki.com - RATING 6/10 (most vibe-aligned; thin craft, Wix)
"Theater you can stay overnight," ~14,600px, dreamy painted-night-sky.
- Layout: single centered text column over full-bleed painted bg; works = stacked full-width horizontal blocks; airy, intentional/uneven spacing.
- Containers: body copy directly on painting (no boxes); each work = square illustrated artwork + solid black info panel, title in a pure-black caption box overlapping the artwork's top-left corner.
- Light: ILLUSTRATIVE bloom only - neon sign, lit windows, lamplight PAINTED into the art. No CSS glow.
- Color: bg navy #0B0B2B; hero deep teal-blue painted gradient; text #FFF; artwork pops neon-pink ~#ff3da1, warm green ~#9fc9a8.
- Type: thin elegant brush/mincho display logo; typewriter/monospace work titles in black boxes; plain sans body; restraint (no header ornaments).
- Liftable: text-link nav (no buttons); fixed vertical social rail pinned right the whole scroll; works = 0-radius rect blocks w/ small external-link glyph.
- STEAL (the good idea): each portfolio item as a painted SCENE with a black typewriter caption tab cutting into the corner - reads like a film still / luggage tag, NOT a web card. (Strong answer for de-rectangling Rod's project cards.)

### ru-ru-ru.com - RATING 5/10 (charm only; matte aesthetic furthest from his direction)
"Rururu Onsen" drinkable hot-spring powder STORE, ~13,500px, kraft-paper craft theme, flat illustration.
- Layout: centered content on textured kraft bg, broken by full-bleed black bands + photo strips; sticky/pinned split "how to enjoy" (tabs left, swapping illustration right); product carousel; scrapbook-loose spacing.
- Containers: mix - thin black-bordered rect boxes + black rounded cards. Emphasis via scale + speech bubbles + pink. No glow/shadow.
- Light: NONE - matte printed-paper aesthetic; kraft texture + flat fills.
- Color: kraft #BC9B82, accent magenta-pink #F72F8D, black #000, white fills.
- Type: Zen Kaku Gothic New (rounded gothic); lots of hand-drawn lettering in speech bubbles; giant stylized kanji/numerals as illustration.
- Liftable: fully-rounded black PILL buttons (white label + circular arrow); e-commerce header (shop/account/search circular icons); swipeable product row; carousel w/ circular arrows + pink progress underline; custom hand-drawn loader.
- STEAL: persistent corner MASCOT (a serow peeking bottom-left with speech bubbles) + hand-drawn speech bubbles + picture-book sticky-scroll (eat-the-onsen character animation). Pure "look at this" charm. (Aesthetic is matte/bright - take the mechanism, not the look.)

### norikura-hanabi.com - RATING 8/10 (most aligned non-tier-1; advances 3 foundations)
Fireworks-event site, Nuxt, ~14,200px, midnight-blue starry-sky-meets-fireworks. Rod: 7-9 relevance.
- Layout: THREE-ZONE fixed frame - fixed full-height starry-night hero LEFT, narrow scrolling center "reading track," fixed serif nav rail RIGHT. Flanks stay, center scrolls; narrow tall measure like a scroll-of-paper; generous uneven dark negative space, hushed premium pace. (NOTE: rigid pinned frame is too architectural for Rod's scannable portfolio - admire, don't copy.)
- Containers: content directly on dark bg; containers are SOFT ORGANIC MASKS not boxes - a tall rounded-ARCH window revealing fireworks footage, circular photo masks, a faint large circle framing copy. Emphasis via masked imagery + scale + the single gold accent. No shadows/borders.
- Light: ALL photographic/video - real fireworks + star-field on a lake, natural bloom baked into media, revealed through arch/circle masks. No CSS glow; "breathing" = a looping fireworks <video> inside masks.
- COLOR (palette gift, real hexes ~= Rod's twilight festival): bg midnight blue #070C23 (panels #161D39 / #626482); text #FFF; SINGLE accent antique/brass gold #867426->#C9A227 (the lone color, a round Venue Map button); secondary = multicolor fireworks (magenta/pink, teal, amber).
- TYPOGRAPHY (first real type reference): high-contrast serif (Didone-ish), all-caps section labels; hand-drawn brush-calligraphy logo; section headers in thin SLASH ornaments (/ FEATURE /, / FAQ /) + tiny subtitle; signature = body copy (even English) often VERTICAL right-to-left tategaki (editorial but NOT for Rod - hurts scannability).
- Liftable: lone gold circular fixed button = only UI color; fixed right-rail serif nav (label + thin underline + long arrow); FAQ accordion (serif Q + hairline + right-aligned category tag + arrow); understated text+underline+arrow links; arch/circle media masks.
- STEAL: (1) SINGLE warm accent in a near-monochrome dark page carries ALL UI emphasis = restraint principle = amber-as-the-one-warm-color. (2) Reveal light/work through SHAPED MASKS (arch/circle/lantern) instead of rect cards. (3) Dark feels CINEMATIC & REVERENT not empty - proves "darkness default + work brightest."
- THREE FOUNDATION CONTRIBUTIONS: PALETTE (anchor hexes #070C23 night + #C9A227 gold + pink/teal/amber pops); TYPOGRAPHY (serif display + brush logo + slash-ornament labels); RESTRAINT/MOTIF (single-accent discipline + shaped masks).

## Aesthetic north stars = GAMES/FILM/PLACE (not websites)

A personal *website* themed as a lantern festival barely exists as a genre - the aesthetic lives in games/film/real places (all human-made). Pour that mood into midnightsolarium-style web craft.
- **Sky: Children of the Light** (thatskygame.com) - VERIFIED: dark default + warm glowing accents = wonder/serenity/sanctuary. De-glow principle proven on the web.
- **Genshin - Lantern Rite / Liyue Harbor at night** - literally a Chinese lantern festival as a playable space. Most direct "night market with lanterns."
- **Spiritfarer** - cozy hand-drawn warm-lantern boat on dark water = midnightsolarium's FEELING in a game.
- **Stray (the Slums)** - dense neon/lantern night-market alleys (cooler/cyberpunk; steal signage-glow + stall density).
- **Spirited Away** (Ghibli) - glowing-food-stall night-market street + red lanterns. Source image of "a night market you wander."
- **Tangled sky-lanterns + Thai Yi Peng/Loi Krathong** - real-world version of Rod's EXISTING sky-lantern Three.js scene.
- **Jiufen, Taiwan** - real red-lantern-lined night streets that inspired Spirited Away. Photography: warm light pools, dark wet stone, lanterns in a row.

---

## ROD'S OWN SITE - diagnosis + feature inventory (2026-06-02, local preview)

Captured: tech-art landing, portal, ComputeGrass post, tech-art about. NOTE: Three.js lantern/ember background was BROKEN in preview (check `npx rollup -c` built the bundle) - so "flat dark field" in those shots is partly an artifact; the container/layout/spacing/glow-border problems stand regardless.

### THE CONCRETE CLAUDE-TELL (confirmed visually)
His site delivers EVERY feature as the SAME unit: a glow-bordered rounded rectangle, centered single column, even/algorithmic spacing, uniform card grids + uniform tool-icon row. Nav pills, demo-reel box, view-all button, project cards, portal doors, post header, about panels - all the same box with an amber/orange breathing border. THIS is "things don't look intentionally arranged" - the *delivery*, not the palette.

Compare harumakigohan: illustrated twilight scene, hand-drawn headers, organic scattered orbs, full-bleed bands, drop-shadow glow + dark negative space. No boxes, no borders.

### Redesign thesis (Rod's words: "keep features, change style/framing/layout/spacing")
Keep FEATURES, change DELIVERY: kill the universal glow-bordered rounded rectangle; framing; layout (organic/asymmetric/full-bleed not centered card grid); spacing (intentional not even); glow (drop-shadow on shapes, ignite-not-constant); type (hand-drawn/illustrated headers).

### FEATURE INVENTORY (preserve ALL through the restyle)
- **Topbar:** lantern-ring avatar, name + "CG Art Portfolio and Studies", nav (Home/Projects/About), effect toggles (breathe/sparkler/fireworks), social links (GitHub/X/LinkedIn).
- **Section landing:** gold section title + tagline, tool-icon strip (~10), demo-reel embed, Featured Projects + View All, project cards (pin badges, tags, thumbnail/video).
- **Portal:** two-door (Tech Art / Game Design) + time-of-day greeting + Ramblings link.
- **Post:** header (title/desc/tags/meta/read-time), hero media, TOC trigger, TL;DR, content, takeaway, prev/next, related.
- **About:** bio (intro/more), Achievements trophy case.
- **Footer.** Site-wide: Three.js lanterns/fireworks, sparkler cursor, achievements, card-tilt, page transitions.

## CONVERGING DIRECTION (2026-06-04) - "Japanese aesthetic on Rod's own layout"

Rod rated the pure-Japanese Variation A (harumaki orb layout) 7/10 - liked the aesthetic, rejected the structure. Resolved into **V1-B = lab file section-landing-A2-japanese.html**:
- Japanese AESTHETIC (mono type from 109ichiki + hand-drawn logo/~tilde~ headers from harumaki + hana amber glow that IGNITES on hover) on **ROD'S ORIGINAL LAYOUT** (top bar: avatar+name+subtitle+nav+toggles+social; then title, tools strip, demo reel, featured CARD GRID, view all - original order).
- REJECTED from Var A: circular orb project layout; hamburger menu (wants his real top bar); PINK (clashes with his amber Three.js lantern scene).
- LOCKED: glow = amber only; top bar restyled (NOT hamburger); tools+reel original order; card grid not orbs; heading-scale 1, width 64; type size good at 1.
- This = "evolve the baseline, don't replace it" + the Japanese skin. STRONGEST direction so far.

## yannesidibe + stephanewillems - SEEN via Rod's screenshots (2026-06-04), for Variation B
**yannesidibe.com**: dark purple-black; HUGE Clash Display name w/ liquid blue 3D blob behind; "CREATIVE DEVELOPER" OUTLINED display caps; green "available now for work" pill top-center; nav top-right + "Sound|OFF"; "LOCATED IN FRANCE"+flag; left-edge vertical "W./Honors" tab + award badge. ABOUT: "ABOUT * ME" outlined header; photo card + bio card with PURPLE/PINK GRADIENT BORDER GLOW (the hover-reveal Rod loves) + "5+ years" dotted stat card; SEO/UX/Web cards; tool-icon row. WORK: "SELECTED * WORK" outlined header; projects as horizontal LIST rows, hover reveals floating preview card w/ View button. STEAL: outlined-display headers w/ asterisk; bio-card hover-reveal gradient border; work-as-hover-list w/ floating preview. Font = Clash Display.
**stephanewillems.be/skills**: script logo; centered pill nav; Technology/Personal toggle; grid of OUTLINED SVG skill icons that DRAW IN (mid-draw = first row faint, post-draw = full grid), hovered icon glows amber/yellow; selected skill name + witty copy below. Font Poppins. STEAL: outlined-SVG-draws-in + amber-glow-on-hover skill grid + witty per-skill copy.
**PALETTE CONSISTENCY RULE (2026-06-04, Rod):** ALL lab variations use ONE theme = the lab foundations twilight palette, with gold aligned to Rod's ORIGINAL lantern theme (--gold #FBBF24 / --gold-deep #F59E0B on midnight-blue night). NO pink in backgrounds/accents (clashes with the amber Three.js scene). Only LAYOUT differs by theme (A = Japanese, B = Western). Deleted V1 hybrid + V2 cozy lab files (total fail, nothing salvageable).

**dimden.dev - SEEN (2026-06-04, Rod's screenshots):** retro-terminal NEOCITIES look - black bg + green "matrix rain", pixel "DIMDEN" logo (green glow), green pixel/mono text, cursor cat (canvas). TWO-COLUMN: main content panels (Welcome/Blog/Projects, each with a moon ` headline) + a rich personality SIDEBAR (STARS link list, "I'm ONLINE!" presence, Last-song now-playing widget, "cool sites" 88x31 badges, Current status, MOON PHASE widget w/ azimuth/altitude, webring, hotlink-my-button). STEAL the STRUCTURE/SOUL (two-col + widget sidebar, live presence, moon/now-playing widgets, webring + badges, neocities warmth) NOT the green-pixel palette - recolor to amber-night.
**stephanewillems.be/projects - SEEN:** bright CYAN bg, MASONRY grid of project cards (varied heights, rounded, images), script logo + pill nav. STEAL the masonry varied-height project grid; recolor to amber-night.

Variation B (Western) refs now COMPLETE: yannesidibe (outlined headers + bio hover-glow + work-hover-list + big name) + stephanewillems (masonry projects + skills-draw-in) + dimden (widget sidebar + presence + cursor companion). Build in the consistent amber-night palette (NOT their purple/cyan/green).

## DARK-TECHNICAL / HUD / TERMINAL CLUSTER (2026-06-11, via vibe-site-research skill)
For the "most code-heavy/blocky/technological" theme prototype (merodev-yanne). Full screenshot-verified set in `redesign-lab/vibe-sites-merodev-cluster.md`. Top picks: **terminal.shop** (7/7), **foundry.basement.studio**, **mikeklubnika.com**, **n-o-d-e.net**, **maximeheckel.com**, **rauno.me**, cortiz.dev, rogierdeboeve.com, unit.software, insilicoterminal.com, GTFO/Den of Wolves (10 Chambers).
- **Makers:** merodev = self-built Merouane Bali; yannesidibe = self-built Yanne Sidibe; **109ichiki web build = bokoko33** (Tokyo, bokoko33.me — his client roster is a vein, incl. tomula-ikuho.com).
- **Liftable open-source CODE (provenance-friendly):** scificn-ui (github baxy5/scificn-ui — HUD/bracket components), satnaing/terminal-portfolio, glitchcn-ui.
- **Gallery trick that worked best:** Awwwards FONT INDEX (awwwards.com/websites/JetBrains%20Mono/) beats keyword search. Vocab: "code brutalism", "technical mono", "terminal aesthetic", "HUD UI / reticle / corner brackets", "engineered UI".
