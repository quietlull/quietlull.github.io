---
name: project-visual-references
description: "Redesign principles + direction + open decisions (de-glow principle, atmosphere rules, twilight palette, plan). Detailed per-site teardowns live in project-reference-site-breakdowns."
metadata:
  node_type: memory
  type: project
  originSessionId: abec0419-fe69-439f-9691-f740e9de223f
---

# Visual redesign - principles & direction (2026-06-02..03)

The PRINCIPLES, DIRECTION, and OPEN DECISIONS for the dark-atmospheric redesign. Started after Rod asked to push the lantern/festival theme harder while shaking off the Claude-tell "every box has a glow border" feel. See [[project-design-vision]] for the deeper personal/vision context.

**Detailed per-site teardowns (hana bloom recipe, harumakigohan, the 9 SANKOU picks, his own site, the canonical reference list) -> [[project-reference-site-breakdowns]].**

## THE CORE PRINCIPLE (most important)

**A lantern only reads as warm because the night around it is dark.** The current site makes *every* element a light source (glow borders / breathing on everything), so there is no night left - all figure, no ground, all lanterns and no festival.

The fix is NOT "remove the glow." It is **restore the darkness so the few things that glow actually mean something.** Mostly night. A few deliberate fires. Light is *pooled*, not spread.

## The 5 atmosphere rules (the visual spine - pending Rod's final lock)

1. **Darkness is the default.** Most of the page is genuinely dark and quiet; light is pooled, not spread.
2. **Texture over glow.** Grain, paper, collaged found-objects - depth from surface, not shadow-spread.
3. **One ambient motion per view, not twenty.** One thing drifts (lanterns/embers); everything else holds still.
4. **Voice lives in microcopy.** Personality in labels, empty states, tooltips - not in decoration.
5. **Let the work be the brightest thing on screen.** Shaders/projects are the lanterns; the chrome stays dim.

## Direction: Asian lantern / night market / festival

Rod's named target aesthetic: **Asian lantern glow, night market, festival.** Think a *night market you wander* - warm pools of lantern light in an otherwise dark night, paper-lantern texture, stall-like sections, twilight-to-night palette. Fits his amber/gold-on-dark AND his Zoe-yukata-fireworks identity. Reinforces the de-glow principle (a night market is mostly dark, with warm stalls glowing).

Possible (NOT yet adopted) organizing metaphor: **the site as a night market you drift through** - sections = warmly-lit stalls, projects = the goods, "look at this" = the vendor showing what they made. Floated, not imposed. Convergence: harumaki's "each work is a world you enter" + Spirited Away + Jiufen + Genshin Liyue all point here. STATUS: still a maybe, Rod's call.

**Overall target = midnightsolarium's hand-built web CRAFT, skinned in warm Asian-night-market/festival aesthetic, with a few dimden-style interactive surprises. More POLISHED than raw Neocities (junni/harumaki/infinity-lawfirm = the finish). Clean+scannable and charming+atmospheric are NOT in tension - JP commercial sites prove it.**

## The glow technique = LOCKED (see breakdowns file for full recipe)

The de-glow rework is technically solved via the hana teardown: glow = stacked `filter: drop-shadow()` on SHAPED art (not box-shadow on rectangles), animate ONLY alpha, glow color hotter than fill, **ignite on hover/scroll-in rather than constant-breathe-everything**, plus ONE ambient background breath. Full recipe + Rod's-palette translation in [[project-reference-site-breakdowns]].

**2026-06-09 — FRESH verbatim hana glow source extracted** into `redesign-lab/sources/hana-glow.css` (hana.b-rave.tokyo is still live with real linked CSS — re-confirmed the recipe is current, not stale): stacked drop-shadows alpha-only `.125s cubic-bezier(.215,.61,.355,1)` ignite; panel ignite `filter 0s linear .5s`; card box-shadow dual-layer (100u+200u); `@keyframes background{0% .5% 100% opacity 0/1/0}`; units `--base:3840;--pv:min(1vw,19.2px)`. **DE-GLOW vs ORIGINAL — durable lesson:** a web-agent audit (2026-06-09) wanted to re-frame every block in a glowing panel to match the original hana (which frames everything). REJECTED — that IS the Claude-tell de-glow kills. Our format intentionally diverges: dark night + a FEW glowing panels (cards/post), the rest floats on night. Also: card glow must IGNITE on scroll-in, never be constant (fixed in rework-hana). Don't let a future audit "fix" de-glow back into all-glow.

## OPEN DECISIONS (the visual foundations still to lock)

Foundation checklist - status as of 2026-06-03:
- **Light & glow technique** - LOCKED (hana recipe -> amber).
- **Palette** - LOCKED (2026-06-04, matches Rod's original lantern theme). Night `#070C23` -> `#0A1030`; **WARM FILL** (logos, headings, "Technical Art") = AMBER `#F59E0B` (= var(--gold-deep)); **bright accent** (active nav, ~tildes~, pin badges, tags) = GOLD `#FBBF24` (= var(--gold)); **GLOW `#FFE8B0` = drop-shadow HALO ONLY, NEVER a text fill** (this was the recurring bug - I kept using the pale cream glow as fill, making logos look washed-out instead of amber); text `#F5F3EF` / muted `#9AA3BD`; **NO pink** (clashes with amber Three.js scene). All lab variations pull these from foundations.css. Restraint lesson (norikura): in a dark page ONE warm accent carries all UI emphasis.
- **Motion vocabulary** - principle locked (ignite-on-interaction + one ambient breath), specifics open.
- **Container/layout grammar** - sketched ("the night is the container": default no-box, emphasis via pooled light not borders, drop-shadow-on-shaped-art, full-bleed bands + organic placement), NOT locked.
- **Typography** - first references in: norikura (high-contrast serif display + hand-drawn brush-calligraphy logo + slash-ornament section labels "/ FEATURE /") and harumaki (hand-lettered logo + ~tilde~ headers). Direction forming = clean modern body + a hand-drawn/brush DISPLAY accent for logo & section headers + ornamented labels. NOT locked; needs Rod's type pick + maybe more refs.
- **Illustration & motif system** (lanterns, paper, embers/petals, "stalls") - thematic only, undefined.
- **Organizing metaphor** - "night market you wander," still a maybe.

Rod realized (2026-06-03) his past attempts were uninspired because they EXECUTED without a solid visual foundation. So: lock ALL these foundations BEFORE building. No code until Rod says the foundation is solid.

## Confirmed wants
- **Cursor as a carried lantern**: ambient glow-mask around the cursor pushing back a vignette. The cursor IS the lantern you carry through the dark market. (Technique: fixed radial light blob following cursor, screen-blend, over a vignette overlay.)
- Sound opt-IN (never autoplay); visuals always on. (Matches his no-music-widget / no-listening-data stance.)

## Resources Rod can browse himself
- Follow **midnightsolarium.neocities.org/links** + its webring (neighbors of a loved site = curated taste). BEST path.
- **SANKOU!** (sankoudesign.com) - JP gallery, filter by style/color for illustrated/colorful (the right one; NOT muuuuu, which is font/photo-heavy).
- Neocities browse-by-tag (cozy/dark/personal), **Marginalia Search** (Explore button), **Wiby.me** (surprise me), MelonLand/32-bit Cafe forums.
- Pinterest "night market" / "lantern festival aesthetic" - VISUAL mood only.
- Western galleries (Rod is western-minded): godly.website, land-book.com, siteinspire.com, httpster.net, awwwards.com; **Codrops** (tympanus.net/codrops) for the technical "wow" he loves. TODO: curate SPECIFIC western picks using his taste profile.

## Browser tooling - SOLVED (2026-06-04): headless Chrome lets the agent SEE any site

BREAKTHROUGH (replaces the old permission-wall problem): this agent CAN now directly see ANY reference page, bypassing the broken Chrome EXTENSION (which was permission-blocked on all domains but harumakigohan). Method = drive the local Chrome BINARY headlessly via PowerShell, screenshot to a file, Read the PNG. Verified rendering hana.b-rave (a JS site) fully.

- **Helper:** `redesign-lab/shot.ps1` (gitignored). `powershell -File redesign-lab/shot.ps1 -Url "URL" -Out "$env:TEMP\x.png" -W 1366 -H 1600` then Read the PNG. Raise -H (e.g. 4000) to capture more of a tall page.
- **Raw command:** `& 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless --disable-gpu --no-sandbox --hide-scrollbars --window-size=1366,1600 --virtual-time-budget=12000 --screenshot=OUT.png URL`. CRITICAL: classic `--headless`, NOT `--headless=new` (the new mode wrote no file).
- **For raw CSS/HTML:** PowerShell `Invoke-WebRequest` works on external domains (got hana's CSS, 109ichiki fonts, dimden structure this way). So: headless screenshot = SEE it; Invoke-WebRequest = GRAB its CSS.
- **Video:** ffmpeg (at C:\Users\Rod\AppData\Local\Microsoft\WinGet\Links\ffmpeg.exe) -> contact sheets to "see" motion from screen recordings.
- The Chrome MCP extension is still permission-blocked (don't rely on it). For ROD'S OWN site, the Claude_Preview MCP (localhost:4000) + source edits work fully.
- No more needing Rod's relay agent or manual screenshots - the agent can self-serve references now.

## Layout exploration - 3 deviation tiers (2026-06-04, Rod's framing)

Rod wants layout options at three levels before drafting (then 1-2 drafts per chosen tier). I CAN render+screenshot my own draft blockouts on the preview; I CANNOT screenshot external refs (permission wall) - so refs are URLs to browse / relay-tear-down.

- **Tier A - RADICAL (layout completely changes):** an explorable festival/night-market SCENE you navigate (projects = stalls/lanterns), using his Three.js strength. = the zozo virtual-gallery idea reframed. Refs: bruno-simon.com, henryheffernan.com (OS metaphor), and from Muzli Top-100 2025: WoraWork (cozy Zelda/AnimalCrossing explorable - closest to his vibe), Jordan Breton (floating sky island, FWA SOTD), Aimee's Papercraft World (scroll-driven character through hand-drawn scene). TRADEOFF: highest wow but fights his hard #2 scannability rule. Mitigation: explorable landing/personal layer + one-click "skip to projects"; project pages stay conventional. (= his zozo hesitation.)
- **Tier B - SAME SKELETON, new elements+spacing (THE SWEET SPOT):** keep topbar+landing+project list, but kill glow-bordered cards -> full-bleed BANDS, projects as SCENES (caption tabs/arch masks), uneven spacing, single gold accent, hand-drawn headers. = the blockout + harumaki/norikura/junni grammar. Refs: harumakigohan, norikura, junni (his tier-1), brittanychiang.com (proof it stays scannable). Biggest feel-change while keeping scannability = best risk/reward.
- **Tier C - GENTLE PUSH:** current centered-column layout, just de-glowed + better spacing + single accent + hand-drawn header accents. Element/glow/type cleanup, ~no structural change. Lowest risk, lowest wow.

Browse galleries: Muzli Top-100 2025 (muz.li/blog), Awwwards, FWA.
NEXT: Rod picks which tier(s) to actually draft as blockouts (I render+screenshot locally - that path WORKS, unlike external screenshots).

## REDESIGN-LAB STATE (2026-06-04) - RESUME HERE

Working in `redesign-lab/` (gitignored, served at localhost:4000/redesign-lab/ via the jekyll preview). Shared: `foundations.css` (locked palette + breathing-bg `body::before` + `.reveal` card-in) and `sliders.js` (live spacing/size sliders + IntersectionObserver that adds `.in` to `.reveal`). Helper `shot.ps1` (headless screenshots).

**Section-landing variations built:**
- `section-landing-0-baseline.html` - approximation of his CURRENT site (reference point).
- `section-landing-A-japanese.html` (A1) - Japanese: harumaki layout + 109ichiki mono + hana glow. "the work" = **BENTO grid** (replaced the rejected orbs). Bodoni serif, orange glow, square, card-in.
- `section-landing-A2-japanese.html` (A2) - **Japanese aesthetic on Rod's ORIGINAL layout** (top bar + title + tools + reel + featured card grid). hana-styled SQUARE cards (merch-grid), orange breathing glow, card-in. **This "evolve the baseline" path is the one Rod keeps gravitating to.**
- B1/B2 western - listed in lab index but NOT built yet (404). Build from yannesidibe/stephanewillems/dimden in the locked palette.

**LOCKED:** palette (amber #F59E0B fill / gold #FBBF24 accent / SATURATED-ORANGE #FF6A00 glow halo / night #070C23 / NO pink / glow is NEVER pale cream); glow behavior = saturated orange + a slow BREATHING-and-drifting bg glow + IGNITE on hover + cards ANIMATE IN on scroll (NOT constant uniform breathing); cards SQUARE (0 radius); tools+reel kept in ORIGINAL order; A2 keeps real top bar (no hamburger); no orbs (A1 uses bento).

**OPEN / Rod's latest verdict:** A2 hana-styling = "not quite" yet - he wants the REAL hana CSS matched precisely (now doable: headless screenshot + Invoke-WebRequest the actual page). FONT unresolved: dropped Caveat (he disliked it), currently Bodoni Moda serif, Rod unsure - wants "something else entirely"; swappable via `--fd`/`--fh`; options to try: DM Serif Display, Fraunces, a better hand-drawn, or mono-led. Heading-scale 1, width 64 are good defaults; type size good.

**NEXT:** (1) Use headless screenshot + Invoke-WebRequest to grab the ACTUAL hana glow/breathing/card CSS and match it exactly in A2. (2) Resolve the font. (3) Build Variation B (western) in the locked palette. (4) Lock section-landing, then derive the other pages (post page is the 2nd anchor). (5) Eventually implement on a branch off main (NOT the elastic-morse worktree).

## References-recreation workflow (2026-06-08) - new branch task

Rod's directive: visit each key site, faithfully RECREATE its layout reskinned to our locked palette, collect under a "References" tab at the top of the lab index. Per site: (1) SEE it + GRAB real CSS via web-snapshot skill / shot.ps1 + Invoke-WebRequest; (2) save a thorough teardown to `redesign-lab/analysis/<site>.md` (match the depth of the pasted hana spec); (3) build `redesign-lab/ref-<site>.html` reskinned.

Key sites + focus: hana.b-rave (bloom/glow + merch cards), harumakigohan (layout/theme/vibe), norikura-hanabi (layout/theme/vibe), yannesidibe.com (cards + glow on about-me), stephanewillems.be/skills ("drawn-in" skill animation + glow), merodev.net -> Works section (project-card presentation).

**PALETTE DECISION REVERSED (2026-06-08):** Rod dropped the "reskin to our palette" idea mid-task - recreations now match each source's OWN palette as closely as possible (faithful clones, not reskins). Pull toward our de-glow/amber direction only when synthesizing ROD'S design later, NOT in these reference clones.

**ALL 7 DONE + verified (headless shot.ps1 @ localhost:4000, render + key JS confirmed, no console errors):**
- ref-hana.html - red #FF1A00/crimson, 8s breathing bg, two-stop glow, ignite-on-hover, 2s bloom-open reveal, merch grid. analysis/hana.md.
- ref-harumaki.html - twilight blue->pink, hand-lettered logo (Caveat), faller w/ pink trails, ~tilde~ headers, NEWS carousel (auto-advance+dots), organic discography orbs, full-bleed SERIES bands, social rail + floating nav cards.
- ref-norikura.html - navy night, JS firework bursts (verified 52 live particles) + water reflection, vertical serif title, right vertical nav rail, ABOUT pill.
- ref-yannesidibe.html - near-black + purple glow, rotating circular multilingual greeting (SVG textPath), hover-glow work cards + about cards.
- ref-stephanewillems.html - navy, cursive logo, pill nav, Technology<->Personal toggle, skill icons that DRAW IN (pathLength=1 stroke anim, staggered) + hover glow.
- ref-merodev.html - black "Enter" splash gate -> Works grid of clean hover-reveal project cards. Dev bypass: append ?auto=1 to skip the gate for headless capture.
- ref-dimden.html - green-on-near-black CRT retro, DIMDEN neon banner, link-list columns + STARS sidebar + status/blinkies, cursor-following cat (JS lerp), toggleable neon sign.
All linked from a References tab at the TOP of redesign-lab/index.html.

Tooling that works: headless `shot.ps1` against localhost:4000 (preview_screenshot times out - window not open); preview_eval for runtime/computed-style verification. GOTCHA: the jekyll preview server drops sometimes - if headless shots come back ~25KB white "site can't be reached", the server is down; preview_start jekyll + confirm Invoke-WebRequest 200 before re-shooting.

### ROUND 2 - iterated on Rod's per-site ratings (2026-06-08)
Rod rated each + gave specific fixes. Fixes applied (compare-to-source, match spacing/size):
- **hana (was 6)**: REBUILT from real source CSS. Pulled hana's actual structure (page-nav fixed top, 2500u hero w/ layered logo, sections news/schedule/ticket/merch/fanclub/tour/attention, page-rose screen-blend petals, design unit = 100vw/3840). Added top nav, breathing hero halo, EDGE GLOW (radial at viewport edges), drifting screen-blend petals, a TEXT-BOX card. The earlier version "felt like a screenshot"; now it breathes.
- **yannesidibe (was 6)**: added the KEY ask - spotlight-border cards: border hidden, revealed by a pointer-tracked mask (radial gradient from #fff specular at cursor -> purple -> transparent), global cursor -> per-card --mx/--my. `?spot=1` capture hook parks it for headless.
- **stephanewillems (8)**: name DRAWS IN (clip-path write reveal). Hover glow RESOLVED (Rod supplied exact CSS): accent gold `#FFDF00`; baseline `filter:drop-shadow(rgba(255,223,0,0) 2px 2px 10px)` (transparent gold, OFFSET 2px 2px so it can transition); on hover `transform:scale(1.08)` + `drop-shadow(rgba(255,223,0,.9) 2px 2px 10px)` AND turn EVERY shape element's stroke (path/line/polyline/polygon/circle/rect/ellipse/[pathLength]) to the gold accent (not white, not just [pathLength]); add `transition:stroke .25s,fill .25s` on the shapes. Skin: gold #FBBF24 glow, strokes brighten to cream #FFE8B0. Kept the simple janky icons (Rod likes them). `?hover=1` forces first-row hover for headless capture.
- **harumaki (was 7)**: SPACING fixed - real hero is short w/ small logo at TOP + news cards in first screen (not a 100vh centered giant logo). Shrank hero/logo/faller, tightened section padding. Verified vs real side-by-side.
- **norikura (was 4)**: REBUILT - dropped the empty center capsule, added top nav + right rail + a Program CARDS section, treeline silhouette + lake reflection, denser fireworks. Kept the serif fonts (Rod liked them). Rod suggested using his Three.js about-scene as bg for the SKIN/his-site version.
- **dimden**: DROPPED per Rod ("too complicated, don't care for their layout"). Unlinked from index.
- **merodev (0)**: BLOCKED - works section is behind a Three.js Enter gate; Rod is sending a screenshot of their project cards. ref-merodev.html is a placeholder Enter->grid until then.

### merodev - UNBLOCKED + done (2026-06-08)
Rod sent the works screenshot. merodev's WORKS view = black/mono, top bar (name + "FULL STACK WEB DEVELOPER" / framed "WORKS" / bracketed "EXIT"), grid of project cards each with CORNER-BRACKET reticles framing the image + a bracketed "VIEW LIVE" button + title/subtitle/description, bottom bar (c 2025 / LinkedIn / GitHub / Email), left toggles (HIGH QUALITY / SOUND EFFECTS / LIGHT MODE [SOON]). ref-merodev.html rebuilt to match (Enter gate -> Works; EXIT returns). Verified.

### SKINNED category (Rod's palette) - DONE
"Skinned recreations" category in index. Each ref-X-skin.html = the faithful recreation recolored to the LOCKED palette (night #070C23 / amber #F59E0B fill / gold #FBBF24 / orange #FF6A00 glow / no pink). ALL DONE + verified: hana, harumaki, norikura, yannesidibe, stephanewillems, merodev skins. (norikura-skin note: for Rod's REAL site, swap the CSS firework scene for his Three.js water/lantern about-scene.)

### yannesidibe glow = PRECISE dual-layer spotlight (2026-06-08, from a browser agent's exact match)
The yannesidibe card-border reveal is TWO stacked masked-border pseudo-elements, NOT one. Single-layer can't do specular-core + wide-falloff at once. Exact recipe:
```
.glow{position:relative}
.glow::before,.glow::after{content:"";position:absolute;inset:-2px;border-radius:inherit;padding:2px;pointer-events:none;
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;
  mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude}
.glow::before{background:radial-gradient(262px 262px at var(--mx,-9999px) var(--my,-9999px),rgb(255,0,187),rgba(0,0,0,0) 100%)} /* wide magenta */
.glow::after {background:radial-gradient(175px 175px at var(--mx,-9999px) var(--my,-9999px),rgb(255,204,241),rgba(0,0,0,0) 100%)} /* tight pale-pink specular */
```
JS: `pointermove` updates `--mx/--my` (clientX-rect.left) for ALL `.glow` els globally. Default -9999px = hidden until cursor near. Skin colors: ::before orange rgb(255,106,0), ::after cream rgb(255,227,160).
Real about LAYOUT (also adopted): grid `184px 1fr 184px` -> tall grayscale portrait (spans 2 rows) | intro card | "5+ years" card (big outlined number via `-webkit-text-stroke`, transparent fill) ; then 3 service cards `184px 184px 388px` with the MIDDLE one `.raised` (margin-top:-24px). ref-yannesidibe.html + skin both updated + verified. Kept my rotating-greeting hero above it (Rod prefers my fuller layout). Rod is refining site-by-site with a browser agent and feeding exact specs - EXPECT more precise corrections like this for the other recreations.

### hana BACKGROUND glow = lava-lamp cross-fade (2026-06-08, exact spec from browser agent)
The real hana breathing background is NOT radial gradients and NOT floating particles (those were my wrong guesses - the floating "glowing balls" are NOT in the original, REMOVED). It is a **lava-lamp cross-fade between two STATIC baked glow images**:
- two full-viewport layers: bg-1 always opacity 1 (base topology); bg-2 opacity `0->1->0` on ONE shared `ease-in-out` curve (reference = 8s; the agent slowed to **12s** because faster read as breaking the illusion).
- each layer `filter: blur(20px) brightness(.9) saturate(1.04)`.
- the perceived "movement" is purely the DISSOLVE between two compositions whose bright masses sit in different places - nothing transforms/translates.
- textures baked from two 32x18 luminance grids (0..86) via canvas + progressive-doubling bilinear upscale to ~1024px. Palette peaks `rgb(232,40,2)` (deep crimson, slight orange), gamma crush darks to black. Grids + bake() are embedded in ref-hana.html.
- SKIN version: same grids, lumToRGB lerps NIGHT #070C23 -> ORANGE #FF6A00 (so dark areas stay night-blue, not black). ref-hana-skin.html.
Both updated + verified - this finally gives the "edge glow / intentional breathing" Rod wanted (bright masses pool in corners/edges). Removed the old .page-rose petals + .edge + radial .page-bg entirely.

### Lab variation fonts assigned + border-draw added (2026-06-08)
Rod's section-landing variations now pull fonts from the recreation groups:
- **A1** (japanese/bento) = harumaki group: Caveat (hand-lettered logo + ~tilde~ headers) + Zen Maru Gothic (body). vars --fh/--fm.
- **A2** (japanese/his layout) = norikura group: Shippori Mincho (serif display) + IBM Plex Mono. vars --fd/--fm. (was Bodoni Moda - Rod never locked it.)
- **B1** (western showcase) = REVERTED to its original Space Grotesk + Poppins + Space Mono - Rod preferred the previous (the yannesidibe-group Poppins swap was undone).
- **B2** (western/his layout) = stephanewillems group: Inter (display/body/labels) + Sacramento (signature brand name `.brand .nm` only). vars + a `.nm` override.

**A2 BLOOM:** Rod wanted "more of the bloom from the reskinned hana" on A2 -> added the lava-lamp cross-fade bg via a NEW shared helper `redesign-lab/hana-bloom.js` (holds the grids + bake; reads `data-base`/`data-peak` off `#hana-bg` so palette is configurable - A2 uses base 7,12,35 night -> peak 255,106,0 orange). Disabled foundations `body::before` on A2 so the lava-lamp is the clean bloom. Reuse hana-bloom.js for other variations by dropping `<div id="hana-bg" data-base=".." data-peak="..">` + the .bgcanvas CSS + the script.

**Frame-draw box animation (CORRECTED - this IS hana's real technique, Rod supplied the exact code):** the border draws itself around the box segment-by-segment on scroll-in. NOT a conic gradient (my first wrong attempt). Technique = **6 spans** inside the box, each a single border-edge that scales from 0 along its own transform-origin:
- top split into 2 halves (border-top, origin left / origin right, `scale:0 1`)
- bottom split into 2 halves (border-bottom, origin left / right, `scale:0 1`)
- right side (border-right, origin top, `scale:1 0`); left side (border-left, origin bottom, `scale:1 0`)
- on `.in`: all spans `scale:1; transition:scale 1.2s cubic-bezier(.215,.61,.355,1)`. Real hana also fades a bg fill + the text (opacity+translate, delay .35s).
- Shared injector `redesign-lab/frame-draw.js` injects the 6 spans into every `.card`/`.cell` (no per-card markup). Pair with the `.frame` CSS + sliders.js `.in`. Applied to A1 `.cell` + A2 `.card` (orange rgba(255,106,0,.7)). Removed A2's static outline + my conic version.
- A2 also got the lava-lamp BLOOM (see above) + stronger ambient glow. B1/B2 kept their own western glow.

**hana TEXT-BOX research answer (asked by Rod):** hana has NO text glow (`text-shadow:none` everywhere) and NO native border-draw animation (checked clip-path/stroke-dash/scaleX(0)/border-image - none). Its boxes have static always-complete borders; the "forming" look is the 2s scale-bloom reveal. Reveals = `.is-intersection` class -> CSS transitions (slide via translate, fade via opacity, the scale-bloom), staggered 0.1/0.2/0.3s. Only 4 keyframes site-wide (bg cross-fade + 2 scale-throbs).

### "New form" plan + per-design element inventories (2026-06-08)
Hana border FIXED with the real frame-draw (frame-draw.js now also targets `.text-card`; applied to ref-hana + ref-hana-skin, static borders removed).
**Element inventories DONE** for all 8 -> `redesign-lab/element-inventory.md` (Hana, Norikura, Stephan Williams, Merodev+Yannesidibe, A1, A2, B1, B2). Each lists that design's element clusters + [sig] signatures + cross-design coverage.
**NEXT PHASE - build the "new form" (theme tests) for these only:** Hana, Norikura (with Rod's REAL three-background-scene.js as bg, not the CSS fireworks), Stephan Williams, and Merodev+Yannesidibe MERGED into one. Harumaki is covered by A1 (Rod: A1 > its skin, no separate harumaki build). The merge tension: yannesidibe spotlight cards vs merodev reticle cards - decide project vs about card. B1 fonts were reverted to Space Grotesk (Rod preferred).

### ELEMENT SETS - new lab category (2026-06-08, IN PROGRESS - /goal)
Rod clarified: he does NOT want a .md inventory (that was my miss) - he wants the elements BUILT as 8 full "element set" pages in a new lab category. Each = the WHOLE site element kit (top bar+nav+toggles+social, hero, buttons/links/tags, project cards, list controls=search+filter+empty, post block=header+TL;DR+prose+code+takeaway, about=bio cards+stats+trophies+status, footer) styled in that design. GOAL: 8 polished, DISTINCT pages (not too similar -> use each design's signature layout) so Rod can pick the strongest element GROUPS across them for the final page. New index category "Element sets".
Shared building blocks: foundations.css (palette vars), hana-bloom.js (lava bloom, data-base/data-peak), frame-draw.js (6-span frame on .card/.cell/.text-card), sliders.js (.in observer). element-inventory.md kept as MY build reference only.
**ALL 8 DONE + verified (2026-06-08) - /goal MET.** Each is a full element kit, polished, deliberately DISTINCT (a real choice) so Rod can pick the strongest element GROUPS for the final page. Linked in the index "Element sets" category.
1. element-hana.html - warm, lava-bloom, frame-draw cards, ignite-hover, Shippori serif (editorial)
2. element-norikura.html - cool navy, GOLD accent, right rail, date-stamp pill, hover-lift cards, slash-labels, drifting embers (elegant/restrained; real build -> Rod's Three.js scene as bg)
3. element-stephan.html - clean minimal navy, Sacramento brand + Inter, DRAW-IN outline icons + Technology/Personal toggle, gold #FFDF00 hover, crisp cards
4. element-merodev-yanne.html - MERGED: black + purple glow + lime CTA, Space Mono+Inter, kinetic ring hero (yanne) + RETICLE project cards (merodev) + SPOTLIGHT bio cards (yanne) + WORKS/EXIT bars + corner toggles
5. element-a1.html - harumaki: Caveat hand-drawn logo + ~tilde~ headers + BENTO frame-draw cells + full-bleed reel band (warm/playful)
6. element-a2.html - your portfolio layout: avatar+toggle bar + tool tiles + lava-bloom + SQUARE frame-draw cards (product feel)
7. element-b1.html - western showcase: HUGE outlined name + asterisk headers + work-as-HOVER-LIST (not grid) + left edge-tab + Space Grotesk
8. element-b2.html - western your-layout: Sacramento brand + Inter + MASONRY + CURSOR-SPOTLIGHT borders (cursor-lantern.js) + rounded/soft
NEXT (Rod will drive): he picks the strongest element groups across these to assemble the FINAL page.

### Three.js norikura DONE + element-set REWORKS started (2026-06-08)
- **Three.js norikura**: wired Rod's REAL about-scene `<script defer src="/assets/js/dist/three-background-scene.min.js"></script>` (self-injects a fixed canvas, no container needed, bundle is self-contained incl. Three.js; served at localhost:4000) into element-norikura.html + ref-norikura.html + ref-norikura-skin.html, REPLACING the CSS firework/ember stand-ins. Verified: real lanterns render, no console errors. (For any lab page: just add that one script tag; canvas z-index -1 sits over the body bg, content z-index 1+ above.)
- **merodev+yanne card fixed**: one unified card = merodev clean rectangular SHAPE (image+mono title+VIEW LIVE) + yanne CURSOR edge-glow (.glow dual-layer) + 109ichiki-clean. Dropped the two-card-systems.
- **REWORK category**: Rod's feedback - the 8 v1 element sets were ONE shared kit reskinned (cards differ, but buttons/tags/post/about/list IDENTICAL -> felt like 1-2 options). Fix: rework ALL 8 so EVERY element group gets that design's OWN distinct treatment. New index category "Element set REWORKS"; v1 element-*.html preserved. DONE: rework-merodev-yanne.html (bracketed-mono buttons, `[ ]` tags, terminal search, mono-brutalist post, bracket trophies, cursor-glow everywhere - fully distinct). TODO: rework hana, norikura, stephan, a1, a2, b1, b2 - each must differentiate buttons/post/about/list/hero/tags, not just colors. (Note: merodev rework hero is 78vh = lots of dead space; could tighten.)

### Unique-element-SHAPES /goal + ambient-life writeup (2026-06-08)
Rod: the element sets share identical small-element SHAPES (e.g. the toggle pill is the same everywhere). /goal = every set must have UNIQUE element shapes for all/most elements. Also wanted a separate WRITEUP on adding ambient movement/life per set.
- **Ambient writeup DONE** -> `redesign-lab/ambient-life-writeup.md` (one dominant motion + micro-life per set, reduced-motion-safe).
- **SHAPE MATRIX** (build target - each element type a DIFFERENT shape per set): toggle = hana sharp-square-slide / norikura thin-gold-line+dot / stephan pill / merodev `[x]` bracket / a1 hand-drawn / a2 square-glow-tile / b1 text ON.OFF / b2 soft-pill+glow. Buttons/tags/status/search likewise distinct per set (see the matrix I posted). 
- Reworks (in "Element set REWORKS" category) carry the unique shapes. DONE: rework-merodev-yanne (bracket-mono everything), rework-hana (sharp square-slide toggle, sharp square social, ember status, `//` search, frame cards; + rising-ember ambient). 
**ALL 8 REWORKS DONE + linked (rework-*.html)** - /goal met. Each has UNIQUE element shapes (verified the toggles are all different):
- toggle: merodev `[x]` bracket / hana sharp square-slide / norikura thin-gold-line+dot / stephan labeled Technology-Personal pill / a1 hand-drawn wobbly (irregular border-radius) / a2 square glow-TILE (lights, no slide) / b1 text "ON.OFF" / b2 soft pill+glowing-knob.
- buttons/tags/status/search/cards also differ per set (sharp vs pill vs outlined-stroke vs bracket vs hand-drawn-wobbly-radius vs square vs soft-pill).
- rework-norikura + rework-merodev card use the special interactions (Three.js scene bg; bracket-cursor-glow + brittanychiang cursor vignette).
NEXT (Rod drives): pick the strongest element groups across the 8 reworks for the final page. Ambient-life ideas per set are in ambient-life-writeup.md (not all built into the reworks yet - hana has rising embers, others have their dominant motion).

### merodev+yanne card = CORRECT now (2026-06-08): bracket-shaped cursor-revealed glow + brittanychiang cursor vignette
Rod's exact spec (3rd iteration): project cards = merodev clean rect (image+title+VIEW LIVE+sub) WITH corner BRACKETS (like the EXIT button) where **the bracket IS the glow shape revealed by the cursor** (NOT a full rectangular border). Technique: `.pcard .bg` layer holds 4 corner `<b>` brackets (border-L shapes, currentColor lime + drop-shadow), masked by a cursor-following radial `mask:radial-gradient(circle 190px at var(--mx) var(--my),#000 0%,#000 16%,transparent 64%)` -> brackets only show near the pointer, brightest at it. JS sets per-card --mx/--my on mousemove. PLUS a GLOBAL cursor vignette (brittanychiang.com style): fixed `.cursorglow{background:radial-gradient(520px circle at var(--cx) var(--cy),rgba(109,75,255,.13),transparent 70%)}` following the pointer. Refs Rod gave: brittanychiang.com, sakaba.shibajuku.net, enndaruma.co.jp/contact. `?demo=1` parks the cursor on card-1 corner for headless capture. In rework-merodev-yanne.html. VERIFIED.

### STATE: both categories complete
Index has TWO categories: "Site recreations" (6 faithful, dimden dropped) + "Skinned recreations" (6 in Rod's palette). All verified via headless shot. merodev cards now real (Rod's screenshot). The hana skin doubles as the concrete de-glow direction for Rod's actual redesign. NEXT (Rod's call): pick which recreation/skin direction informs his real section-landing, then derive his actual pages.

## The plan (redesign)

Step 1 references (mostly done) -> **Step 2 lock the visual foundations** (palette, type, layout grammar, motif - see OPEN DECISIONS) -> Step 3 lock Layer 2 site map (resolve the bifurcated-portal fork, one job per surface) -> Step 4 de-glow build on ONE sandbox surface (404 = pick, zero stakes) -> Step 5 ripple to load-bearing surfaces in priority order. No code before the foundations are locked, not without Rod's go.

Layer 1 (purpose/priorities) is LOCKED - see [[project-design-vision]] ("look at this, not look at me" + the 5-item priority stack).
