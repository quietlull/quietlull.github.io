# Reference hunt — calm-drift motion + twilight palette in use (2026-06-13)

Exploration branch. Corrected targets after Rod's feedback:
- **Motion = CALM AMBIENT DRIFT + DRIFT-IN ENTRANCES**, NOT physics/gravity/draggable/throw.
  (The first pass wrongly chased Matter.js — that whole set is discarded.)
- **Color = live sites USING a twilight navy+amber-glow palette effectively**, NOT swatch/
  generator pages. **Anchor = harumakigohan.** Pink is welcome but OPTIONAL (the real site uses
  none today).

All URLs verified live (headless render and/or source signature). WebGL-heavy sites that only
render a loader headless are flagged mood-only. These feed the provenance ledger as candidate
sources if Rod pursues the drift direction.

---

# ⭐ FINAL SHORTLIST (2026-06-14) — LOWRYS-tier: slow bob + clean scroll reveals, POLISHED

Quality-first pass (reject tutorials/CodePen/dev-demos). All code-confirmed (real CSS/JS read);
polish = real brand campaigns, custom bundles, GSAP/Lenis craft tells. These match LOWRYS's two
motions — gentle always-on bob on decoration + clean scroll-in reveals — at production quality.
Register caveat: mostly cute/illustrated JP brand campaigns (lighter than Rod's twilight); the
MOTION + polish is the match — re-skin to the night palette.

| Site | URL | Bob | Scroll reveal | Note |
|---|---|---|---|---|
| ⭐ niko and... "wiggle wiggle" | dot-st.com/nikoand/cp/2026_wigglewiggle | `yokoyoko`/`flip-happy` infinite | GSAP ScrollTrigger + IO | **Same Adastria network as LOWRYS; richest, both motions.** |
| ⭐ PLAZA 60th | plazastyle.com/contents/plaza_60th/ | `@keyframes wave` + GSAP yoyo | GSAP ScrollTrigger (66 refs) | Cleanest GSAP reveal reference; polished anniversary. |
| ⭐ studio CLIP × Cojicoji | dot-st.com/studioclip/cp/sc2025cojicoji | `fuwafuwa_1 2.1s ease-in-out infinite alternate-reverse` (stars/clouds) | `.fadein → .fadein.in` (blur+opacity) | Same dot-st engine as LOWRYS; decoupled (deco bobs, copy holds). |
| studio CLIP × Noraneko | dot-st.com/studioclip/cp/sc2025noranekogundan | `fuwafuwa`/`updown`/`pyokopyoko` infinite | `.fadein → .in` (getBoundingClientRect) | Picture-book register; editorial-illustrated. |
| Chiikawa Pocket 1st | jp.chiikawa-pocket.com/ja/1st/ | `birdUpDown 2s ease-in-out infinite` + swings | GSAP ScrollTrigger + IO | **Render-confirmed polished**; heaviest/most-crafted build. |
| Loveeez | loveeez.com | `popup ... translate .5rem infinite` | Lenis + IO reveal | Cleanest MODERN codebase (Nuxt); contemporary award build. |
| MASUNAGA story120 | story120.masunaga1905.com | (light) | IO + ScrollTrigger | Premium eyewear; narrative scroll reveals (reveal > bob). |
| Sobajima 120th | sobajima.jp/120th-anniversary/ | GSAP-driven | ScrollTrigger + Lenis | Heritage anniversary; high-craft Lenis smooth-scroll. |

Renewable veins: dot-st.com `/<brand>/cp/<slug>` (each campaign = custom bundle at
`static.dot-st.com/static/docs/<brand>/pages/<slug>/assets/`); SANKOU! categories `motion-effect`,
`キャラクター`, `イラストを使用`; search terms `ふわふわ`/`furufuru`/`pyokopyoko`.

**The LOWRYS recipe, distilled (both agents independently extracted it — library-free):**
- Bob: one `@keyframes float{translateY(-x) -> translateY(x)}` + `animation: float 2.0-2.4s
  ease-in-out infinite alternate-reverse`, **staggered per element** (`animation-delay` + slightly
  different durations) so they drift out of phase. On the DECORATION `img` only.
- Reveal: `.fadein{opacity:0;filter:blur(4px)} -> .fadein.in{opacity:1;filter:none}` toggled by
  IntersectionObserver. Text in a separate non-animated layer = stays put.
- Reduced-motion gate (Rule 89) mandatory.

---

# VERDICT (2026-06-13, after 5 rounds) — the breakdance 2-axis wander is a RECIPE, not a site

The exact motion in Rod's two refs = **always-on, independent-period 2-axis sine drift** (X and Y
oscillate on different durations -> slow figure-8/Lissajous wander), running continuously with NO
input. Read from source. This is **genuinely rare in the wild as a clean artifact** — production
sites use either scroll-parallax (moves only on scroll) or single-axis `translateY` bobs. So
**breakdance4fun IS the canonical source; Rod's fallback plan is correct.** Don't keep hunting sites.

Precise mechanism (verbatim from the two refs):
- **breakdance4fun (GSAP):** `timeline({defaults:{ease:'sine.inOut',repeat:-1,yoyo:true}})` +
  `.fromTo(el,{x:-xpos/2},{x:xpos/2,duration:speedx},0).fromTo(el,{y:-ypos/2},{y:ypos/2,duration:speedy},0)`,
  per-element `data-gsap-floating='{"x":50,"y":50,"speedx":1.5,"speedy":2.5}'`. NOTE: it's wrapped in a
  ScrollTrigger with `toggleActions:"play pause resume reset"` (play/pause when in view — NOT scrub).
  **Strip that wrapper for pure always-on.**
- **LOWRYS (CSS):** `@keyframes float{50%{translateY(-0.5rem)}} ... infinite` (single-axis bob) +
  `katakata` staggered wobble + `scroll-left` marquee + `fadeSlide`/`rotate-center` entrances + the
  floating GLASS layer over static text. So LOWRYS' love = decoupled-glass + entrances + gentle bob,
  NOT the 2-axis wander. The 2-axis wander is purely the breakdance side.

NEW + buildable (the real payoff of round 5):
- **Pure CSS CANNOT do independent 2-axis drift on ONE element** — two `@keyframes` (translateX +
  translateY) on the same element clobber each other (last transform wins; no compositing without
  WAAPI `composite:'add'`). Confirmed (Dan Wilson, Additive CSS Animations).
- **The correct CSS recipe = NESTED WRAPPERS:** outer element `animation:driftX 13s ease-in-out
  infinite`, inner child `animation:driftY 17s ease-in-out infinite` — **coprime durations** = the
  element never repeats the same path = organic Lissajous wander, zero JS. This is the dependency-
  free equivalent of the breakdance GSAP timeline.
- **GSAP always-on cousins** (verified, no ScrollTrigger): OSUblake "make everything random +
  sine.inOut" (gsap.com/community/forums/topic/21578), and `gsap.to('#blob',{x:'random()',y:'random()',
  duration:'random(5,50)',repeat:-1,repeatRefresh:true})` (floating-blobs thread). These desync via
  randomization rather than strict speedx!=speedy.

BUILD PLAN for the lab: 2-axis nested-wrapper drift (or the GSAP timeline) on DECORATIVE elements
only (lanterns/ornaments/tool icons), text/buttons untouched; the merged-card `.glass-plane` gets
the decoupled-drift; entrances via IO reveal cascade. Reduced-motion gate (Rule 89) mandatory.

---

# ROUND 4 (2026-06-13) — DECOUPLED drift (Rod's chosen direction) — CODE-CONFIRMED

Rod locked the direction: LOWRYS "Ready to Go Out" + breakdance4fun GSAP float. **The key
principle he identified: the decoration floats, the TEXT stays put** — motion without the UX
nightmare of moving copy/targets. "Drift-in entrances" also wanted. All below code-confirmed
(CSS/JS read directly; temporal blocked by preloaders).

## THE RULE (what makes it UX-safe)
**Animate/parallax ONLY the decorative layer; never the text container.** Every confirmed site
does this — the float/parallax tween selects deco elements (bubbles, glass, petals, badges),
text containers are untouched. This is the whole trick, and it maps 1:1 onto a layer the lab
already has.

## dot-st / Adastria vein (same in-house motion system — renewable)
No external studio (Adastria in-house). Real microsites live at
`static.dot-st.com/static/docs/<brand>/pages/<folder>/assets/`; generic `/cp/` slugs fall back to
a no-motion mall template. Brute-force `dot-st.com/<brand>/cp/<season-slug>` (KV/lookbook/concept
pages carry motion; product/staff pages don't).
- ⭐ **LOWRYS "Share LFM with you"** — dot-st.com/lowrysfarm/cp/share_lfm_with_you — RICHEST: layered
  deco system over static copy; elements do `fade-in-bottom .8s forwards` THEN `pikopiko-women 5.5s
  infinite` (reveal-then-float on the same element); marquee `loop` strips; 40s staggered badge loops.
- ⭐ **LOWRYS "2025 Summer KV"** — dot-st.com/lowrysfarm/cp/kv_2025summer — BEST entrance reveals:
  IntersectionObserver fires `@keyframes slidein/slidein2/scalein/maskin/rotatein` with cascading
  `animation-delay:.05s/.1s...` + ambient `infinite alternate` bg loops. Decoupled (IO, not scrub).
- **LOWRYS KIDS 2025 Summer** — dot-st.com/lowrysfarm/cp/kids_2025summer — CSS marquees (`marquee`/
  `marqueeY` infinite) decoupled from text; GSAP layer here is scroll-scrub (note: scroll-tied).

## Decoupled-drift live sites (GSAP sine-yoyo float + ScrollTrigger parallax on deco only)
- ⭐ **HANA "Born to Bloom"** — hana.b-rave.tokyo/tour/borntobloom/ — *already a project ref* — now
  CODE-confirmed: `to(e,{y:...*-50,duration:2,ease:"sine.inOut",repeat:-1,yoyo:true,delay:...})`
  continuous petal drift + `to(t,{yPercent...scrub:true})` decoupled scroll-parallax. The closest
  match AND it's the bloom recipe Rod already owns.
- **TriOrb** — triorb.co.jp — GSAP+Lenis+ScrollTrigger; named `Float`(60x)/`Parallax`(29x) modules,
  `repeat:-1, yoyo`, `yPercent...scrub` on deco over fixed headings.
- **doda Shigotozukan 2026** — dodasports.doda.jp/shigotozukan/2026/ — 23x `yoyo`, layered art drift
  over static text + marquee deco.
- **Tsuklio** — tsuklio.com — `@keyframes service-bubble{translateY 0→-10%...} infinite` bubbles
  float over copy (bob bigger than LOWRYS' -0.5rem — tuning note).
- **4WIDE** — 4wide.jp — Lenis+lerp+GSAP; `mvLoop 60s linear infinite`, `bring 2s infinite`.

## Recipes (code-read; pick per behavior)
- ⭐ **Per-element desync, pure CSS** — CSS-IRL "negative animation delay":
  `--delay:calc(var(--i) * -200ms); animation:float 500ms var(--delay) infinite` — one shared
  keyframe, each element starts mid-cycle via `--i` → organic un-synced drift, zero JS. **Best fit
  for lanterns/petals.** (joshwcomeau keyframe guide = pair with custom-property amplitude for 2-axis variety.)
- **Per-element desync, GSAP** — `gsap.utils.toArray('.lantern').forEach(...)` + `duration:()=>random(1.5,3)`,
  `x:"random(-100,100)"`, `repeat:-1, yoyo:true, repeatRefresh:true, ease:"sine.inOut"` (oxygen4fun
  loop × GSAP random docs). The JS equivalent; same family as the breakdance4fun ref.
- ⭐ **Decoupled glass-over-text, pure CSS scroll-driven** — CSS-Tricks "Bringing Back Parallax":
  `.deco{animation:drift linear;animation-timeline:scroll()} .text{/* untouched */}` — decoration on
  the scroll timeline, text on its own/none = different speeds, text never moves. Maps EXACTLY to
  Rod's glass-over-text observation. (Codrops `view()`/`scroll()` intro = same family + entrances,
  already `prefers-reduced-motion`-wrapped.)
- **Entrance reveal (broad support)** — daltonwalsh IntersectionObserver: `.loadin{opacity:0;
  translateY(45px)}` → `.loaded{...}` at `threshold:.3`, + `transition-delay`/`--i` stagger.

## How this maps to the lab build (the payoff)
- The merged-card **already has a static `.glass-plane`** — make THAT drift (slow sine / scroll-
  parallax) while `.card-body` text stays fixed = Rod's exact LOWRYS pattern, on a layer that exists.
- Per-element lantern drift = CSS-IRL negative-delay on decorative elements (tool icons, ornaments),
  never on nav/buttons/text. Reduced-motion gate mandatory (Rule 89).
- Entrance: IO reveal cascade (or `view()`), fade + translateY ~600-900ms ease-out.

---

# ROUND 3 (2026-06-13) — CODE-CONFIRMED drift (the real answer)

Rod re-articulated the target: **elements that subtly shift POSITION over time on their own — like his sky-lanterns adrift — plus floaty eased hover/interaction, NOT physics.** Skill updated with a "motion target" mode: a screenshot can't verify motion, so these are **code-confirmed** (read the shipped `@keyframes`/JS), since temporal capture is blocked by the sites' intro preloaders.

## The pattern that matches (and how to find more)
JP production sites ship plain CSS with **literally-named float keyframes + staggered `animation-delay`** — each element drifts on its own phase = the lantern feel. Grep galleries (SANKOU! `motion-effect`/`element-move`/`illustration-move`) for `fuwa`/`float`/`swing` + `infinite alternate`.

## Code-confirmed LIVE sites (read their CSS)
- ⭐ **THE610BASE** — https://the610base.jp/ — scattered illustrations float independently on X AND Y with staggered sway. Signature: `@keyframes floating-y{translateY(-5%→5%)}` + `floating-x`, used `animation:floating-x 2.4s ease-in-out infinite alternate` (siblings `alternate-reverse`) + `@keyframes swingX` at staggered `2s..18s` delays. **Closest to the lantern feel.** (Content gated behind a preloader in headless — confirmed via CSS, not temporal.)
- **KOSÉ Breaking Street** — https://breakingstreet.kose.co.jp/ — `@keyframes fuwafuwaAnim{0,100→0; 50,55%→translateY(-5px)}` `animation:fuwafuwaAnim 2.5s linear infinite`. Literally "fuwafuwa."
- **The North Face Japan Recruit** — https://www.thenorthface.jp/special/recruit/ — `@keyframes fuwa{...translate3d}` `3000ms ease infinite` + sibling `+1500ms` stagger.
- **LOWRYS FARM "Ready to Go Out?"** — https://www.dot-st.com/lowrysfarm/cp/ready_to_go_out — `@keyframes float{50%→translateY(-0.5rem)}` cubic-bezier sinusoid + 1s sibling stagger.
- **PLAZA 60th** — https://www.plazastyle.com/contents/plaza_60th/ — `illust-rock{rotate -7→7deg}` `5s ease-in-out infinite alternate` + `wave{translateY(-10px)}`.
- **Nulab Careers** — https://careers.nulab.com/ — `@keyframes swing{rotate -5→5deg}` `3s ease-in-out infinite` (sway layer).

## Code-confirmed RECIPES (the buildable answer — pick one)
- ⭐ **Per-element independent slow drift (GSAP)** — breakdance4fun.supadezign.com/how-to-create-a-floating-animation-with-gsap/ — each element reads `data-` x/y amplitude + speed; `fromTo` on X and Y with **independent durations**, `ease:sine.inOut, repeat:-1, yoyo:true` → every element traces its own slow loop, never still. **This is "each lantern on its own path."**
- **Dependency-free equivalent** — CSS `@keyframes float{50%{translateY(-12px)}}` `ease-in-out infinite` + per-element `animation-delay` via `:nth-child` (Sass `@for`). Add a second out-of-phase axis (`floating-x`) for organic 2-axis drift (the THE610BASE move).
- **Organic wander (vanilla rAF)** — `requestAnimationFrame` + `Math.sin(t + phasePerElement)` on translate; unique phase/speed/radius per element = desynced figure-8 drift. Best when CSS delays aren't varied enough.
- **Floaty eased hover** — lerp toward target inside rAF with low factor (~0.07) — Codrops "Motion Hover Effect for a Background Image Grid" (code-confirmed: `lerp(...,0.07)` in a render loop). The long-settle that reads "floaty," not snappy. (This is the same lerp family as the `magnetic` component already in the bench — extendable.)
- **Mandatory:** gate all of it behind `prefers-reduced-motion` (STYLE.md Rule 89).

## Verification honesty
6 live sites = **code-confirmed** (shipped `@keyframes` read directly); **temporal capture blocked by their preloaders** — so "it moves" is proven by the animation declaration, not a captured frame. Recipe tutorials = code-confirmed. CodePen pens (whusterj float, Hail-Gracy "Tangled" lanterns, magnetic-button lerp pens) = **claimed only** — CodePen now Cloudflare-blocks both scripted and headless fetch, so their keyframes couldn't be read; open in a real browser before lifting code.

---

# HUNT 1 — calm drift motion (rounds 1-2, superseded by Round 3 above for motion specifics)

## 1a. Ambient continuous drift (elements float/sway on their own)
- ⭐ **HANA "Born to Bloom"** — https://hana.b-rave.tokyo/tour/borntobloom/ — rose petals + slow starburst drift across a dark nocturne hero, autonomously. **Already a project reference** (the bloom recipe) and the closest "petals/lanterns adrift" match. CSS/DOM, reusable. JP. *Screenshot-confirmed mid-drift.*
- ⭐ **dimden.dev** — https://dimden.dev/ — your stated north star. Decorative star/ornament motifs bob ambiently in a Neocities nocturne; lightweight CSS/JS, not WebGL. Reusable. EN. *Render-confirmed.*
- ⭐ **Enoshima Aquarium (Enosui)** — https://www.enosui.com/ — a full-screen wall of moon jellyfish slowly drifting/pulsing behind a serif "Peace" title; mascot bobs by the info card. The literal "suspended things adrift" reference. Looping video (no physics). JP. *Screenshot-confirmed — gorgeous calm drift.*
- **4WIDE** — https://4wide.jp/ — a single project thumbnail floats in vast whitespace; gentle float/parallax. JP/EN. (Re-verify the idle-motion type live — a still only proves "suspended.")
- **Endangered Veggies** — https://endangeredveggies.smm.co.jp/ — one vegetable as a weightless suspended object on black; dreamy minimal. JP.
- **Floating City Uii (浮遊街)** — https://fuyuugai.com/ — illustrated town elements drift in an opening sequence; concept = "a town floating on a hill." JP. (Intro-movie heavy; verify reusable idle motion.)
- *Mood-only (heavy WebGL, not the reusable family):* **Lusion** (lusion.co), **Igloo Inc** (igloo.inc) — drifting 3D scenes, ethereal, but only a loader renders headless.

## 1b. Drift-IN entrance animations (elements waft into view on load/scroll)
- ⭐ **24/7 Artists** — https://247artists.com — headings/cards waft up with fade on scroll; **source-confirmed GSAP + IntersectionObserver**. The strongest reusable drift-in match. EN.
- ⭐ **Joonas Sandell** — https://joonassandell.com — staged on-load intro, then content fades + drifts up as sections enter; calm/weightless. EN.
- **Szymon Dziukiewicz** — https://dziukiewicz.com — dark theme; loader, then content drifts in on load. EN.
- **Le chef d'orchestre du corps** — https://lechefdorchestreducorps.fr — soft loader then gentle fade/translate reveals. FR.
- *Mood-only (WebGL hero):* **Sol Reader** (solreader.com), **Ratafia/Almond Spirit** (almondspirit.com) — section reveals are calm fade-up but heroes are canvas.

## 1c. Cross-niche calm-float (games / nature — for feel)
- ⭐ **Sky: Children of the Light** — https://thatskygame.com/ — drifting clouds, light, candle-children float across a dreamy meadow; GSAP + looping video + CSS keyframes. The best mood+motion blend. EN.
- ⭐ **GRIS — Nomada Studio** — https://nomada.studio/gris-game/ — watercolor clouds + figure drift on layered parallax (source: heavy `float`/`parallax`/`translate`, no physics). EN.
- **Neva / Nomada** — https://nomada.studio/ — same painterly parallax-drift system. EN.
- **「深海」Deep Sea template** — https://do.gt-gt.org/TEMP/gt005/index.html — character suspended underwater, fish + bubbles drift, page sinks deeper on scroll (Rellax.js parallax). **Free reusable template.** JP.
- *Mood, weak drift:* **Spiritfarer** (thunderlotusgames.com/spiritfarer/) — dreamy but video/static hero.

## Reusable techniques (the buildable recipes — split by behavior)
**Ambient drift:**
- CSS `@keyframes` translateY float loop (+ paired shadow) — canonical bob; stagger via per-element `animation-delay`. Very portable, GPU-friendly. (GeeksforGeeks float; CodePen kpdushanmaduka/rexrony — search-confirmed.)
- rAF + `Math.sin()` drift — per-element phase/speed for organic non-synced wander; combine two sines (x/y) for a wandering bob. Tiny vanilla JS. Best when CSS delays can't express enough variation.
- Slow mousemove parallax — `translate(x/divisor, y/divisor)` per layer, bigger divisor = slower/farther, with `transition`/lerp easing so it's calm not twitchy.

**Drift-in entrance:**
- ⭐ IntersectionObserver + CSS transition (opacity + translateY, `.inview` class) — the standard dependency-free reveal. For "floaty," push duration to ~600–900ms `ease-out` (tutorials' ~250ms is too snappy) and low threshold (~0.1). Codrops **SmoothScrollAnimations** (repo on GitHub) is the closest copy-pasteable version.
- Staggered variant — `data-delay`/index → `transition-delay`, ~80–120ms steps; unobserve after reveal.
- CSS-only `animation-timeline: view(); animation-range: entry` — no JS; needs IO fallback for older Safari/FF.
- GSAP ScrollTrigger `gsap.from({opacity:0,y:100, ease:"power2.out"})` — only if you want scrubbed timelines (heavier dep); use `sine.out`/`power2.out`, never bouncy eases.

**Mandatory gate:** all of the above wrapped in `prefers-reduced-motion` (STYLE.md Rule 89, hard).

## Renewable veins
- **SANKOU!** filtered on native terms that actually work: **浮遊 / 浮遊感** (fuyū, floating), **ふわふわ / ゆらゆら** (soft-sway), **漂う** (drift), **深海** (deep sea), **幻想的** (dreamlike). Categories `要素が動く` (elements move) / `motion-effect`. Far better than English "floating."
- **Makers:** Eat-Play-Sleep (Floating City), Nomada Studio (GRIS/Neva), darkroom.engineering (Lenis smooth-scroll), Locomotive.
- **gt / do.gt-gt.org** JP creative-template library (深海 series + neighbors).

## Dropped (wrong family / dead)
ALL first-pass physics sites (Wildish/Niblu/greenbow/MoMoney/Bruno Simon/Active Theory — grab-throw-gravity, not calm drift) · Google "Float" easter egg (bounces + draggable) · Noomo jellyfish (only loader rendered, possibly interactive) · Codrops Typography Motion (click-triggered, snappy) · odegoods/theud.tv/Unit London (dead/unreachable) · minh.pm (DEAD).

---

# HUNT 2 — sites USING the twilight palette effectively

Target: deep navy/midnight ground + warm amber/gold glow accent; dreamy twilight register; a
few warm things glow against the dark. Pink optional. **Anchor = harumakigohan.** (Swatch
generators deliberately excluded.)

## ⭐ The anchor's own ecosystem (best provenance — these ARE the look)
- ⭐ **harumakigohan — NEO DREAM TRAVELER** — https://harumakigohan.com/ndt/ — watercolor sky-blue
  grading into deep navy, pink cloud-drips, **gold firework burst + gold-lined crescent moon**.
  The gold-glow-against-twilight accent is textbook. *Screenshot-confirmed — strongest single
  embodiment of the target.* JP.
- ⭐ **harumakigohan — Futarino** — https://harumakigohan.com/ftr/ — cornflower→navy ground,
  magenta sunset band, warm gold ribbon-glow streaks. JP.
- **harumakigohan — main** — https://harumakigohan.com/ — brighter cornflower twilight + magenta
  sparkler hero (less deep-night). JP.
- **Renewable:** each harumaki release gets a fresh twilight-palette microsite at a new `/xx/`
  slug — a whole vein of the exact look to mine directly.

## Cross-niche — warm glow against the dark
- ⭐ **Akaneya** — https://akaneyajapan.com/en/ — sumibiyaki restaurant; charcoal-dark ground, the
  only light is amber/red ember glow. Textbook "few warm things glow against the dark" restraint.
  (Ground is warm-brown, not navy.) JP/EN.
- **CASA stella** — https://casastella.net/ — genuine deep midnight-navy ground + a warm-lit
  glowing storefront; quiet, dreamy. JP.
- **JUNNI New Year 2026** — https://nenga2026.junni.dev/ — deep maroon ground + glowing gold type;
  right mood, red (not navy) ground. JP.

## Findings
- The warm-glow-on-navy look lives in **album/brand microsites**, not restaurant/ryokan sites
  (those came back photographic-light). harumaki's `/ftr/` `/ndt/` are the truest references.
- **The "dark award winner" trap:** most (Cobalt Night, MASUNAGA, etc.) use COOL cobalt/cyan
  accents — dropped ~12. Warm amber-glow-on-navy is rarer than it looks, which is part of what
  makes Rod's palette distinctive.
- Best gallery filters that produced hits: SANKOU! `/category/navy/`, `/dark-profoundfeeling-color/`,
  `/japanesestyle/`; native terms 夜空 (night sky), 灯り (lamplight), 暖色 (warm color), 幻想的.
