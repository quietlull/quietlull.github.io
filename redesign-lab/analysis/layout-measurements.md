# Exact layout measurements (from real sites) → blanks

**Purpose (Rod, 2026-08-09):** pull EXACT layout measurements from the sites we like (via the browser + `getComputedStyle`, not eyeballing), and use them as **blanks** — measured structural skeletons Rod can fill. Grounded material, not invented. Corrects the [[feedback-design-generation-mishap]].

**Method:** open the real site in the browser, resize to a desktop width (~1440 for fluid/max-width sites; fixed-width sites report the same regardless), read the DOM, `getComputedStyle` the layout containers → record container width/max-width, columns + gaps, section padding/rhythm, and the type scale (font-family + px per level). Then hand-build a **blank** = an unstyled HTML/CSS skeleton carrying those real numbers.

---

## dimden.dev  (measured 2026-08-09)
*Rod: S tier — the indie-web/personality north star.*
- **Content column:** FIXED **900px**, centered (not fluid). Old-web convention; content never reflows wider.
- **Ground:** pure black `#000`.
- **Body face:** RussianGothic (pixel/gothic), 16px base.
- **Type scale (px):** body/p **16** · h3 **18.72** · h2 **24** (Pixel NES bitmap face) · big logo link **50** (MS UI Gothic).
- **Structure:** a single 900px column holds a banner img, the nav, then a two-column widget region (main content left + widget sidebar right, nested), then footer. (The two-col split is nested inside the 900px block — measure deeper next pass.)
- **Takeaway for Rod:** dimden's "alive/dense" feel is NOT a wide fluid layout — it's a *narrow fixed column packed with widgets*. Density in a small frame, not a big canvas.

---

## harumakigohan.com  (measured LIVE 2026-08-11, 1440×900, getComputedStyle)
*Rod: S — the north star.* → blockout variant `vharumaki`
- **Hero: exactly 100vh** full-bleed (cloud+gradient scene).
- **Content column: 604px = 42% of viewport** (63 elements share it). Massive air both sides.
- Section air: **~160–200px** between blocks; **96px cloud-partition band** between zones.
- Vertical SNS rail 21px wide on the edge, mid-hero height (Rod's SOCIAL rail, at the source).
- Character art OVERLAPS the title zone (negative margins, −58px). Page = 5.34 screens.

## hana.b-rave.tokyo/tour/borntobloom/  (measured LIVE 2026-08-11 — ROD'S ACTUAL REFERENCE)
*Rod: S.* → variant `vhana` (rebuilt on these numbers)
- Opening ≈ **1000px ≈ 1.1 screens**; page 12590 = 14 screens.
- Sections = full-bleed BANDS, every one with **74.2px padding top/bottom** (the breath rhythm).
- **Content column 594px = 41%** (59 elements) + secondary 742px = 52% (39 elements).
- **CONVERGENCE: harumaki 604px/42% ≈ born-to-bloom 594px/41%** — two S-tier refs, same narrow-column DNA.
_(The current hana.b-rave.tokyo homepage is a DIFFERENT layout (giant sparse blocks, 92% container) —
measured earlier, kept below as a secondary data point, but Rod's reference is Born to Bloom.)_
- current-homepage numbers: 100vh video + 120px air; sections 921-1463px; container 1320/92%; closing 100vh.
- **100vh video opening + 120px margin-bottom air** before content.
- Sections are GIANT sparse blocks: 921 / 1463 / 1090 / 1027px (1.0–1.6 screens EACH); air lives INSIDE.
- Container 1320px = 92%; inner text columns 705/620/460.
- **Closing section = another full 100vh** (main-meta) — source-confirms Rod's scene-bottom pattern.

## 109ichiki.com  (measured LIVE 2026-08-11)
*Rod: A — "love the use of space".* → variant `v109`
- ~100vh hero; next section **overlaps up −20px**.
- **Works region = 7794px = 76% of the page** (art floats in one giant space). Container 1400 = 97%.
- Section breath = **97.5px** padding top/bottom (their exact number).

## pomodorosa.com  (measured LIVE 2026-08-11) — ANTI-REFERENCE
*Rod 2026-08-11: "a site with layout I dislike" (supersedes the earlier B+ note). Variant removed;
numbers kept so we know what NOT to do: tiny intro + wall-dominant + minimal chrome = disliked.*
- THE INVERSE: intro tiny — **content starts 466px from top** (≈ nav + half-height hero).
- Bento wall dominates: ~3000px of ~**360px-wide tiles** (360×23, 330×18, 380×11 sightings). Minimal chrome. Page 3.9 screens.

**Cross-site takeaway so far:** all four hit "spacious/free" differently — harumaki narrows the column (42%), hana inflates the sections (air inside), 109 gives one region the whole page (76%), pomodorosa deletes everything except the work. Common: hero ≈ 100vh (except pomo), full-bleed sections with constrained inner content, air ≥ 100px between zones (vs our baseline's 0).

## fumino.b-rave.tokyo  (measured LIVE 2026-08-11)
*Rod: B+ (paper-morphism ref).* — covered by the `vhana` (b-rave family) variant, no duplicate built.
- Hero 925px ≈ 100vh; first section gets **185px top padding** (big air after the hero).
- Sections 635–902px full-bleed bands; **content column 709px = 49%** (+ 527px = 37% secondary).
- Page 5879 = 6.5 screens. Same family DNA as Born to Bloom.

## One-screen sites (no scroll layout to measure — noted 2026-08-11)
- **unseen.co (S+)**: single 100vh WebGL canvas; layout N/A (Rod's steal there = the reactive-water EFFECT).
- **stephanewillems.be (A)**: one-screen cinematic hero (single 100vh section, one 720px/50% block); the liked draw-in icons live a page deeper.

## ★ CONVERGENT FINDING (after 7 measured)
The Rod-liked JP/indie sites share one spacing skeleton: **hero ≈ 100vh · content in a NARROW
centered column (41% / 42% / 49% — b-rave family + harumaki; dimden fixed 900px) · sections breathe
74–185px · pages run 5–14 screens tall.** Our baseline (full-width sections, 0 air) is the outlier.
Anti-reference: pomodorosa (tiny intro + wall = disliked).

## Batch 2 (measured LIVE 2026-08-11, continued)
- **hoshimachi (A−)**: 100vh hero; section pad rhythm 64–86px; MV region DOMINATES (5603px = 51% of a 12.1-screen page). Same skeleton as 109.
- **thatskygame (A− zones north-star)**: hero 1026px = **114vh**; zone partitions = **200–400px vertical air** (padTop 230; padBottoms 300/400/360/250) — biggest breathing measured; container 89%/68%. → variant `vsky`
- **tuyu (B)**: 100vh hero; **content column 650px = 45%** (×40); 340px air before video. Pattern confirm #6.
- **midnightsolarium (B, neocities)**: one screen; **FIXED 700px column** (49%) of stacked containers + decorative absolute floats around it. Dimden-family.
- **potg (A−)**: scroll-jacked — stacked 100vh scenes, art floats INSIDE full-screen scenes; no flow layout.
- **merodev (A)**: enter-gate → one-screen desktop metaphor; no flow layout.
- **zutomayo (B)**: one-screen interactive landing (bug-catch); no flow layout.
- **jaimekim (B−)**: 286px intro + uniform 296px-tile masonry wall (×138) — wall-dominant ≈ the pomodorosa anti-pattern.
- SKIPPED as low-value: eve/kaitonote/sengoku (JP-band template, pattern already 6× confirmed), dennissnellenberg/chriskalafatis (Rod likes their MOTION, layouts explicitly "too minimalist"), mirandasofroniou (≈jaimekim).

## The 3 additional "indie spacing" finds (Neocities et al., measured 2026-08-11)
1. **cinni.net** — the DIORAMA: one fixed 1125×740 stage (78%), centered, NO scroll; the site is a room.
2. **melonking.net** — one-screen splash world (795px "everything" block), maximalist-handmade.
3. **whey-isolate.neocities.org** — the WIDGET STACK: skinny 515–737px column (36–51%), blocks 88–596px tall, irregular hand-placed gaps 19–144px, 4.6 screens.
(+ gallery-native: dimden fixed-900, midnightsolarium fixed-700.) **Indie-web signature: a FIXED-width
column/stage — not fluid, not %-based — with decorations floating OUTSIDE it and irregular gaps.** → variant `vindie`

## STEP 1 COMPLETE (2026-08-11). Variants live: vharumaki · vhana(borntobloom) · v109 · vsky · vindie (+Rod's baseline/V1/V2).

## STEP 2 CLEAN-AGENT VERIFICATION — DONE 2026-08-11 (fresh subagent, report-only)
- Baseline exact to the px. **vhana / vsky / vindie / vharumaki: FAITHFUL** (vharumaki had one drift — the 96px band carved INTO the 100vh hero via border-box — FIXED: `calc(100vh + 96px)`).
- **v109: DRIFTED, structurally unfixable** — 109's signature is works=76% of page (their 7794px wall of many works); with Rod's FIXED info flow (exactly 2 card rows) that would mean two ~5-screen-tall cards. Relabeled `109ichiki ·rhythm·` (local numbers exact: 100vh hero, −20 overlap, 70vh rows, 97.5px breath). ROD'S CALL: keep as rhythm-only, or allow a taller works region.
- Independent live spot-checks CONFIRMED the doc numbers (harumaki 604px/42% ×89; borntobloom 594px/41%, 74/74 exact, page 12590).
- Zero structural defects across all 8 variants (no overflow, labels contained, social rail spans hero). Minor: section tag labels always show the baseline px — stale in variants, cosmetic only.
## STEP 3 IMPECCABLE SCAN — DONE 2026-08-11 (fresh agent; rules fetched from pbakaus/impeccable @main: 59-rule detector registry + reference/layout.md doctrine; layout-scope only)
Key findings → applied as "+i" VARIANTS (base variants untouched; buttons v2+i, harumaki+i, hana+i, 109+i, sky+i, indie+i):
- UNIVERSAL BUG-CLASS (fixed in place, mechanical): all 100vh-family heroes ignored the 72px fixed nav → chevron/hero-bottom below the fold; now `calc(Xvh - 72px)`.
- v109: heading-rhythm violation (breath AFTER headers, "each section captions the previous one") → v109i moves 97.5px ABOVE headers, keeps −20 overlap only at hero→projects. Audit: "after this, arguably the best variant".
- vindie: box-nesting tell (same-weight borders 3 levels deep) → vindiei elevates to FRAMING (2px outer / 1px inner) + fixes one inverted gap + nudges the 88s (72/88/104).
- v2: header labels floated over the void, disconnected from anchored content → v2i binds labels to the anchor side + varies the flat 60 air (60/100/140).
- vharumaki: media imprisoned in the 42% column (reel 551px vs 960 spec) → vharumakii lets MEDIA escape full-width (harumaki-authentic: their banner walls run full-bleed) + bento re-cut 2-col.
- vhana: band-grouping error (skills header wore the previous band's surface) → vhanai fixes band colors per section + reel escapes + breaks the 74 rhythm once (110).
- vsky: rhythm champion but ceremony-DNA starves the portfolio priority → vskyi feeds exhale back to cards (rows 240) + de-clones zone headers (230/180/280).
- Audit's anti-slop ranking of bases: 1 vindie · 2 v109(+fix) · 3 v2. v1 weakest ("symmetric shrinkage, still the centered-SaaS silhouette, just airier").

## STEP 4 MUTANTS — BUILT 2026-08-11 (original spec heights + fixed order × experiment spacing systems)
- **M1 spec×indie**: spec heights in the fixed 760px column, irregular gaps, border-hierarchy framing.
- **M2 spec×109**: spec heights full-width, 97.5px breath above headers, −20 overlap at hero→projects only.
- **M3 spec×air+anchors**: spec heights, varied 130/90/160 air, alternating anchors + hero void, labels bound to anchor side.
All verified: hero 544 / cards 400 preserved in every mutant; baseline still exact (3324).
## STEP 4b IMPECCABLE RE-SCAN OF MUTANTS — DONE 2026-08-11. **RANKING: M3 > M1 > M2.**
- **M3 (spec×air+anchors) = the strongest layout audited across both passes**: clears every detector rule AND the doctrine tells (no monotone interval, no single axis, full-size bento, headers bound). Its only failures were two implementation BUGS, both fixed in place + verified: (a) label-binding was dead CSS (inline margin-left:auto + the rowhead's space-between both re-centered it; fixed with !important + flex-start), (b) flip lost its anchor (L-R-C-R-L → now L-R-L-R-L).
- **M1 (spec×indie)**: genuinely irregular rhythm (8 distinct gap values), elevated framing (2px solid outer / 1px dashed inner), heading inversions fixed. Tension: spec heights × 760 column distorts proportions (portrait feature card; reel frame rattling around its 696px player). Re-scan suggestions → **M1+i** variant (150px bento rows = landscape restored + screen-1 within 2px; reel fits its player).
- **M2 (spec×109)**: mechanically cleanest (best screen-1 anywhere: entire first card row inside 1080; working −20 peek) but least anti-slop — "baseline-with-rhythm," keeps the centered monolith. Re-scan suggestions → **M2+i** variant (160px closing exhale breaks the 98/98/98 monotone; skills pulled off-axis). Merge candidate rather than ship-as-is.
- No mutant re-introduces the fold trap.

## STRUCTURAL REBUILD (2026-08-11, after Rod's correction) — READ the full-page captures, don't profile numbers.
The numeric profiles flattened harumaki+hana into the same blockout. Re-captured every reference site
(first screen + full page, artifact 24a94527) and READ them. Six DISTINCT structures found — each now a
structural blockout variant (old vharumaki/vhana/+i RETIRED):
- **harumaki main (`vhmain`)**: hamburger-only menu; hand-scrawled logo top-center; character art dead center; social rail right; NEWS label + carousel PEEK cropped by the fold (the scroll invitation). Sections FLOAT on the sky, each a different shape: tiny centered `~ label ~` headers (no bars) → edge-to-edge 3-card strip → organic blob-disc discography → full-bleed cinema bands (series) → LONG empty sky closing into a cloud horizon + tiny footer. Cloud bands partition zones.
- **hana Born to Bloom (`vbtb`)**: full-bleed PHOTO hero w/ title overlay → content in DARK CENTERED PANELS down a narrow column → merch = 3-col product grid → ambient petals → deep gradient close. Panels-on-atmosphere.
- **gnep (`vgnep`)**: near-black VOID + tiny glitch logo; ONE GIANT character artwork = the page spine (thousands of px); content = small satellites beside the spine.
- **/10/ (`v10d`)**: WHITE day ground (the only light one); a blue ribbon/thread streams down the whole page as a spine, knotting at the center text block; tiny centered moments.
- **ndt (`vndt`)**: the DESCENT — pink clouds + date at top, watercolor blue ground deepens continuously the whole page; the bottom = the payoff scene (girl on crescent moon over clouds). Scroll = a journey.
- **ftr (`vftr`)**: twilight ground; hero = big SQUARE art panel whose streaks ESCAPE the frame; quiet night below; bright blue footer band.
CROSS-FINDING v2: harumaki's family shares a GRAMMAR, not a layout — in-scene identity (logo/art ARE the hero), one signature gesture per site (peek / spine / ribbon / descent / escaping frame), hand-drawn section labels, ground-as-atmosphere, a scene payoff at the bottom. Rod's fixed info flow maps onto ALL of them.
Blockout now has 21 states; galleries: blockouts artifact 218388e0 (updated), reference sites artifact 24a94527.

## ATTEMPT 3 DELIVERED (2026-08-12)
- **SKILL**: `~/.claude/skills/web-preview/` (SKILL.md + capture.mjs + stitch.ps1). Reusable first-screen + full-length page capture. Handles lazy-load, scroll reveals, vh-sized sections, fixed/sticky layers, and inner scroll containers. Random CDP port + unique profile so concurrent runs cannot hijack each other (a fixed port made run #2 attach to run #1's browser and die when it exited).
- **CAPTURES**: 13 main pages + 12 sub-pages, all `gaps: []`, all verified against contact sheets before use.
- **GALLERY** (`reference-gallery.html`, now 99 cards): 8 existing cards re-imaged with verified captures, captions REWRITTEN from what the full pages actually show, layout tags appended; 5 new cards (gnep, /10/, whey-isolate, cinni, melonking, all untiered for Rod); new **Sub-pages section** (12 cards) grouped by PAGE TYPE - projects index, about, post index, post template, gallery, event list, character grid - each mapping to one of our surfaces. Full-page views open via `<details>` using a deferred `data-src` swap (`loading=lazy` never fires inside a closed `<details>`, so images silently stayed blank).
- **BLOCKOUT attempt-3 variants** (greybox, colour-leak scan = 0, baseline still exactly 3324):
  `a3main` harumaki (identity in-scene, no nav bar, card strip CROPPED at the fold - verified 832->1232 across the 1080 line, tilde labels, disc row, cinema band, long empty close) ·
  `a3btb` hana (fixed backdrop, narrow centred panels, 3-col product grid, FULL-SCREEN footer = 1080) ·
  `a3seam` ndt (value steps joined by 160px seam bands) ·
  `a3rails` /10/ (fixed 106px edge rails, 126px column inset, timeline) ·
  `a3frame` 109 (fixed frame 20px inset, 40px mono label + filter-chip row, PLAIN 5-col thumbnail grid - no cards/borders, full-screen footer) ·
  `a3zones` thatskygame (over-viewport hero 1.07vh, 150-360px zone exhales).

- **PROVENANCE PANEL** (blockout, 2026-08-12): Rod couldn't tell where the variants came from. Every variant now declares itself on-page - a fixed panel (top-left) with its source site, a link to the live page, links to its stored capture, and the list of borrowed moves; plus a label pinned to each section naming the move that landed there (`data-note`). Honest kinds: "verified capture" / "my idea, NOT from a site" (v2) / "archived: numeric profile" (A1) / "your spec x an experiment" (mutants). Panel + labels hide under `body.shot` so captures stay clean.

## ATTEMPT NUMBERING (Rod, 2026-08-11)
- **Attempt 1** = numeric-profile variants (vharumaki/vhana/v109/vsky/vindie + i + mutants). Rod: "likely useless" but KEPT/ARCHIVED in `landing-blockout.html`. Verified colorless, baseline Y-map exact (72/616/680/1080/1480/1552/1672/1912/1984/2524/3244, total 3324).
- **Attempt 2** = per-site "structural" variants (vhmain/vbtb/vgnep/v10d/vndt/vftr). **DISCARDED** - they smuggled each site's COLOR/atmosphere into the greybox, breaking comparability. GREYBOX RULE (re-locked): geometry only, one grey language for all variants; color was already decided (Sodium & Sky).
- **Attempt 3** = rebuild from VERIFIED captures. Captures done + verified 2026-08-11; blockouts pending Rod's review of the gallery.

## CAPTURE HARNESS (attempt 3) - `scratchpad/capture.mjs`, Node 22 + CDP, no deps
Why attempts 1-2 had unusable references (Rod: "if all the content is missing... the page probably hasn't loaded"):
1. `chrome --headless --screenshot` fires at load, long before lazy content arrives.
2. `Page.captureScreenshot{captureBeyondViewport}` paints the GROUND but not the content (proven on ndt).
3. A full-height viewport rewrites the layout - these sites size sections in vh (ndt grew 10765 -> 15800+).
4. 109ichiki scrolls an INNER container (`overflow:auto` wrapper), so window scrolling never moved it.
METHOD THAT WORKS: navigate -> wait load -> wait NETWORK IDLE -> full scroll sweep (fires lazyload + IntersectionObserver reveals) -> idle again -> capture ONE REAL SCREEN AT A TIME at 1440x1080 -> stitch. Auto-detects window vs inner scroller. Emits per-site evidence (images loaded/total, text length, page height, screens).
VERIFICATION (the step that was missing): build a contact sheet of each site's MIDDLE and LAST screens and actually look at it before shipping. All 13 sites confirmed loaded 2026-08-11 (previously-empty positions now show real content: 109 works list, hana FANCLUB cards, /10/ DISC tracklists, ftr store grid, gnep event maps, ndt disc buttons + event block).
CAVEAT to state in any gallery: stitched fulls repeat FIXED layers (nav, backdrops, edge rails, frames) once per screen.
Gallery (attempt 3, with evidence): artifact 24a94527.

## CODE-STRUCTURE PASS (2026-08-11, Rod: "did you look at their code?") — DOM/CSS dumped in a real
browser AFTER full scroll-reveal sweeps (headless shots under-show reveal/lazy content; code = truth):
- **harumaki main**: the sky = FIXED parallax backdrop (gradient + 3 cloud layers + a 4500×2160 star sheet) — content scrolls OVER it, exactly Rod's fixed three.js-canvas pattern. News = 21-slide swiper (604×340). Fixed store button.
- **ndt**: descent = STACKED SOLID WASHES, each opening with a **160px painted seam band** (borderpink/borderblue/bordernavy bg images); 900px column; character imgs absolutely placed ACROSS seams.
- **ftr**: `infi_wrap` — the page LOOPS (infinite scroll); 4 full-bleed sections.
- **gnep**: hero = COLLAGE STAGE (~10 layered absolute art pieces in one screen: corner curtains, backdrop, girl 713×648, circle motif, title, date); 3-up intro row; 1024px column; a 2138px flower layer OVERFLOWS across sections.
- **/10/**: the "ribbons" = **FIXED 106px image RAILS on both edges** framing the scroll; 900px column + 1211px breakouts; looping swiper.
- **109ichiki**: a **FIXED SVG FRAME 20px inside the viewport** — the site scrolls INSIDE a picture frame; custom scroll container; full-screen (1080px) footer.
- **hana btb**: fixed 2-layer picture backdrop (petal atmosphere); header 928 + main 8941 + FULL-SCREEN 1080px footer.
**GRAMMAR (code-confirmed): fixed atmosphere layer behind (or frame around) + content scrolling through it + a full-screen scene/footer payoff.** Blockout variants corrected accordingly (vgnep=collage stage; v10d=edge rails; vndt=washes+seams; v109 gained the fixed frame). Galleries republished (blockouts 218388e0 · references 24a94527, now with per-site code notes).

## PIPELINE COMPLETE (2026-08-11) — all 4 steps done. 19 states on landing-blockout.html:
baseline · V1 · V2 | measured: vharumaki · vhana(btb) · v109 · vsky · vindie | impeccable-iterated: v2+i · harumaki+i · hana+i · 109+i · sky+i · indie+i | mutants: M1 · M1+i · M2 · M2+i · M3(fixed).
**AWAITING ROD: flip through and cull.** Audit's overall pick: M3, then M1(+i), then indie/109+i among the pure captures.
THEN — ROD'S 4-STEP PLAN (/goal 2026-08-11 + step 4 added same day): **(1) analyse & capture** (this loop) → **(2) CLEAN-AGENT verification** (fresh subagent re-checks every variant vs its reference: numeric column-%/hero-vh/rhythm + side-by-sides for Rod) → **(3) impeccable scan & iterate** (changes land as NEW variants, never in-place) → **(4) MUTANTS: cross the surviving experiments with the ORIGINAL spec baseline, KEEPING the original's section order** (the information flow is SET — nav→hero→projects-header→cards→skills→reel→scene-bottom→footer; only layout/spacing mutates), **then impeccable-scan the mutants again**.
