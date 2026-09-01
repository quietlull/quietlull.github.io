# Design synthesis — 4-step plan (2026-08-09, /loop until done)

**Goal:** turn the 82-site gallery + the 12-factor framework + the pillars into **4 distinct candidate designs** for Rod's site, built from the lab base and evaluated against the Three.js scene.

**Governing docs:** [[project-design-pillars]] (the razor + LOCKED type/nav/interaction decisions), `2026-08-09-website-factors.md` (12 factors), `final-picks.md` + `aggregate.html` (the current built draft), `extracted/` components (the build base), `reference-gallery.html` (82 sites, tiered + Rod's per-site notes).

**Hard constraints (carry every iteration):**
- **Provenance:** every element derives from a lab component OR a cited reference-site technique. No free-handing.
- **Three.js scene stays in mind:** the lantern/water background scene must keep working. For each idea, ask: does it fit the scene? If not, can the scene be adapted, or is it irreconcilable? Record the verdict.
- **Locked decisions:** scribbly hand-drawn font + line-boil for the name/logo, clean mono support, NO serif. Warm (dark-default). **Open + scannable, NOT explorable** — interaction ≠ exploration (buttons/elements/shaders, not travel-between-places). Intentionally-handmade > clean-polish.
- Don't verify by screenshot; note what to check for Rod. Test pages are NEW files (safe); do NOT alter existing rendered pages without asking.
- Prefer running heavy iterations past the usage reset (fresh windows).

## STEP 1 — Record design factors per site  [x]
For each **rated-above-F** card (~41: S+→C; skip F/Cut/Untiered): append factor-tags to its gallery `data-tags` for the **VISIBLE factor set ONLY — layout / color / type / imagery / nav / atmosphere / identity** (identity = umbrella for texture, craft, personality). Build a site×factor matrix in the log below. **Do NOT AI-judge MOTION or INTERACTIVITY** (can't see/feel/interact); instead carry Rod's stated notes on those from his gallery ratings.

## STEP 2 — Strong candidates per factor + cohesion  [x]
For each of the **7 visible factors**, list **several strong candidates** (NOT just the single best — regardless of tier; a C site can nail one factor). Then map **COHESION**: which candidates share a sensibility and could combine well, and which clash. For **motion & interactivity**, carry **Rod's picks** (unseen/109ichiki interaction; fumino/jaimekim line-boil), not my judgment.
**Output = (a) candidates-per-factor table + (b) a cohesion map: which elements cluster into families, plus flagged surprising pairings worth trying.**
**COMBINATION PRINCIPLE (Rod, 2026-08-09):** do NOT build a Frankenstein best-of-each. A *good-but-cohesive* element beats a *best-but-clashing* one. Good elements can survive and combine for a more interesting overall feel. **Be empowered to try strange/unexpected combinations if the result could be interesting.** Think in parts + categories that go together.

## STEP 3 — Fit to Rod's site + build mix-and-match test pages  [x]
- Map the best factor-executions + locked decisions onto Rod's real surfaces (topbar, section-landing, project cards, tools strip, reel, post, about, footer).
- Build modular **"idea bubbles"** — self-contained, mix-and-matchable component treatments — as **lab test pages**, from `extracted/` components + cited techniques from the top exemplars.
- Per bubble, evaluate **Three.js scene compatibility**: fits / conflicts / scene-can-adapt / irreconcilable. Record.

## STEP 4 — Consolidate into 4 distinct designs  [x]
Combine bubbles into **4 coherent, DISTINCT** full-page directions — each a cohesive WHOLE with its own personality, **not a factor-by-factor maximum**. Actively explore unexpected/strange mixes that could be interesting (per the Step-2 combination principle). Aim for 4 designs that feel genuinely different from each other. Present to Rod. Then stop the loop.

## Progress log
_(iterations append here)_

### Iteration 1 (2026-08-09) — STEP 1 complete: factor matrix + final tags

**Scope:** 41 rated-above-F sites. 34 have real screenshots (visible-factor descriptors). 7 were loaders/unreachable (unseen, 109ichiki, lowrysfarm, potg, norikura, chriskalafatis, cortiz) and are INFERRED from Rod's gallery notes — flagged `†` and logged in `judgment-log.md`. Visible-factor discipline held: no motion/interactivity judged; Rod's motion notes carried, not assessed.

#### A. Site × factor matrix

| site | layout | color | type | imagery | nav | atmosphere | identity |
|---|---|---|---|---|---|---|---|
| harumaki | vertical-scroll, centered-logo hero, carousel band | vivid cobalt blue + hot pink | hand-lettered marker wordmark + clean small-caps | flat anime line art + collaged covers | hamburger minimal, scroll-driven | playful youthful J-pop, dreamy night | handmade scrapbook fan-art warmth |
| harumaki-ndt | full-bleed poster, asymmetric | blue gradient sky + hot-pink drip + yellow | display mixed (condensed numerals, cursive, vertical kana) | watercolor illus, moon-boat fireworks | none | wistful dreamlike night festival | poster/album-art craft |
| harumaki-ftr | centered square frame | monochrome royal blue + glow | angular futuristic display wordmark | flat cel-shaded anime | none | emotional weightless bittersweet | anime MV-cover aesthetic |
| hana | full-bleed hero, tall scroll | near-black warm sepia/amber | blackletter emblem monogram | grainy dark live-performance photo | playback controls | moody intimate intense | cinematic band, gritty + ornate emblem |
| dimden | dense two-column widget grid | black + neon teal/green | pixel/bitmap + monospace | pixel-art sprites, badges | sidebar link list | nostalgic old-web hacker, chaotic | neocities Y2K DIY |
| stephanewillems | full-bleed portrait hero, big dark space | near-black + cool teal rim light | cursive signature + clean sans | low-key moody portrait photo | pill topbar | brooding cinematic mysterious | minimal dramatic dark portfolio |
| merodev | void-center, single button | pure black + white outline | mono/pixel uppercase | none | none (gateway) | stark void mysterious | minimal gatekeeper splash |
| hoshimachisuisei | asymmetric bleed, character off-edge | monochrome blue + single vivid accent | serif JP logotype + tracked caps | anime character digital painting | topbar text + flag MENU tab | nocturnal idol-glam elegant | monochrome-blue idol branding |
| thatskygame | centered hero, sectioned scroll | pastel sky-blue→pink gradient + coral | rounded script wordmark + rounded sans | painterly 3D game-world, winged silhouettes | standard topbar + pills | whimsical airy dreamlike | storybook-soft game marketing |
| pomodorosa | masonry magazine grid + banner | B&W photo + neutral-gray + color thumbs | utilitarian serif/sans | mixed media (B&W photo, anime, video) | full-width dark textbar + search | busy prolific scrapbook | DIY zine multi-hyphenate |
| fumino | airy off-grid scattered | dusty lavender + muted pastels | handdrawn marker + rounded sans | photo portrait crop + doodle line art | folder-tab switcher | cozy intimate fan-diary | scrapbook journal handmade |
| midnightsolarium | centered terminal column, string-light border | dark teal CRT + neon rim + pastel baubles | monospace terminal + pixel wordmark | pixel string-lights, pixel flower | none (gateway button) | eerie-cozy nocturnal webring | webcore/neocities nostalgia |
| sengoku | full-bleed photo hero + panel | warm sepia/brown + cream + gold | bold brush JP serif + condensed numerals | dusk stadium photo + line-art crest | topbar minimal + ticket btn | ceremonial warm festive heritage | heritage event poster |
| kaitonote | centered grid, circle guides | black + electric blue orb | serif-italic + clean sans display | 3D gradient orb | topbar minimal text | futuristic clean precise | portfolio precision, studio-quality |
| eve | dense magazine grid, full nav | black + vivid saturated accent bursts | serif caps nav + clean sans | vibrant painterly album art + grayscale thumbs | full topbar + socials | energetic artistic moody | official music-artist site |
| zutomayo | full-bleed collage, dense composition | muted sage/olive + small accent pops | brush JP logotype + tiny mono | dense anime/manga illustration | topbar minimal (TOP) + retro popups | melancholic nostalgic chaotic | anime band-merch aesthetic |
| tuyu | centered portrait hero, symmetric | purple-magenta gradient + dark | clean sans JP + vertical logotype | gothic anime illustration, rain | topbar icons + lang toggle | melancholic cinematic rain-gothic | gothic idol/vocaloid aesthetic |
| yannesidibe | centered minimal, text arc | monochrome black + faint violet glow | display arc multilingual geometric sans | none (typographic) | none visible | mysterious quiet gallery-still | conceptual typographic portfolio |
| jaimekim | grid gallery, 3-col squares | warm varied per-illustration pastel | handdrawn logo + clean sans nav | storybook children's-book illustration | topbar textlinks + socials | cozy nostalgic gentle | children's-book illustrator craft |
| mirandasofroniou | masonry gallery, asymmetric | warm painterly gouache, saturated | handlettered logo + italic serif | gouache/watercolor travel illustration | topbar textlinks minimal | warm worldly breezy | editorial illustrator portfolio |
| dennissnellenberg | centered minimal, big void | near-black + subtle vignette | thin simple sans | none visible (preloader frame) | none visible | quiet dark hushed | minimal loading teaser |
| minionsart | card grid + banner header | dark + magenta/purple banner + bright card accents | bubbly handdrawn logo + rounded sans | 3D game-art shader renders | topbar icons + pill tabs + search | playful vibrant hobbyist | crafty dev-blog, candy-colored |
| mikeklubnika | dense list webzine, film-strip edges | black/dark gray + green terminal | monospace terminal | photoreal CRT + 3D object icons | topbar textlinks | lo-fi dystopian DIY | retro-terminal webzine |
| unitsoftware | vertical card stack, centered | light white + near-black borders | monospace throughout | node-canvas wireframe screenshots | icon header, scroll-driven | technical clean dry | devtool minimal spec-sheet |
| brittanychiang | split sticky two-column | dark navy + teal accent | clean sans, tracked caps labels | none (text-only) | fixed sidebar scroll-spy | professional calm | portfolio-resume (widely cloned) |
| helloteajp | full-bleed asymmetric, big negative space | near-black + warm amber/cream | serif display + small-caps + JP logotype | macro tea-ware photography | topbar minimal + numbered index | serene meditative luxury | premium Japanese tea brand |
| acegikmo | centered column, thumbnail grid | light/white + colorful thumb accents | casual mono + serif headers | mixed personal photo + 3D/software shots | none (scroll) | friendly indie personal | handmade tech-artist portfolio |
| maximeheckel | hero + chronological list | dark blue→black + electric blue glow | modern sans + mono dates | abstract 3D particle graphic | pill topbar | futuristic technical sci-fi | generative-tech engineering blog |
| cyanilux | card/panel, pill nav | dark teal + cyan accent | rounded sans | chibi mascot illustration | pill topbar + social icons | cozy approachable techy | tutorial-mascot dev-blog |
| iquilezles | index card grid, sectioned | dark charcoal monochrome + red links | plain sans | none (iconography) | none (index) | austere academic calm | academic minimal, prestige-restraint |
| reol | hero popup/lightbox + news carousel | cool dark navy + red/cyan accent | bold condensed + JP display | 3D render + product photo | topbar dense | energetic commercial urgent | idol-merch glossy |
| avogado6 | dense thumbnail grid by date | muted sage + mono w/ color pops | minimal plain JP sans | handdrawn manga ink illustration | topbar + year tabs | melancholic diary prolific | diary-archive illustrator |
| yorushika | negative-space, single object | cool pale grey-blue + kraft tan + indigo | minimal/absent + tiny wordmark | still-life product photo (envelope) | sidebar | hushed ceremonial precious | tactile-object music branding |
| toki | full-bleed photo, vertical JP copy | cool dark forest desaturated + white | elegant thin serif + brush logotype | aerial forest nature photography | footer | solemn premium contemplative | heritage-nature water brand |
| unseen † | centered splash, dark top band | blush-pink + dark band | small centered mark/caps | none (minimal mark) | none (splash) | warm minimal calm | motion-studio splash (motion carried, not judged) |
| 109ichiki † | pure-black canvas, draggable windows, negative space | pure black + pink/blue + white | clean mono | anime character illus + 3D blob objects + barcode | text pills (HOME/PROFILE/CONTACT) + socials | very-internet playful confident | illustration portfolio, internet-native (3D interactable carried) |
| lowrysfarm † | editorial apparel grid | unknown (unreachable) | unknown (unreachable) | apparel photography (inferred) | unknown (inferred) | calm editorial | Japanese apparel, decoupled-drift motion (carried) |
| potg † | spacious works-index, floating cards | pale blush-pink | elegant serif display + serif numerals | anime illustration cards | minimal (socials + About/Works/Contact) | soft spacious dreamy | type-and-art-forward illustrator index |
| norikura † | full-bleed night + right-rail | navy night + single gold accent | serif display | fireworks (+ arch masks, water reflection) | topbar minimal (inferred) | nocturnal festive restrained | heritage fireworks-event, single-warm-accent |
| chriskalafatis † | centered preloader frame | stark black-on-white | bold uppercase grotesque condensed | none (percent counter) | none visible (preload) | stark brutalist-clean | brutalist preloader (motion-reveal carried) |
| cortiz † | pure-black hero + consent modal | pure black + green/magenta | distressed gothic logo | WebGL wireframe torus-knot | consent-gate (inferred) | edgy experimental dark | experimental dev portfolio |

`†` = inferred from Rod's notes, no real screenshot (see judgment-log.md).

#### B. Final factor-tags per site

_(Prefixed `layout-/color-/type-/img-/nav-/mood-/id-`. For the 34 seen sites these are the confirmed proposed tags; the 7 inferred `†` sites are best-guess and flagged. A later mechanical step applies these to gallery `data-tags`.)_

| site | final tags |
|---|---|
| harumaki | layout-vertical-scroll, color-vivid-blue-pink, type-handdrawn, img-illustration, nav-hamburger-minimal, mood-playful, id-handmade, id-scrapbook |
| harumaki-ndt | layout-fullbleed-poster, color-blue-pink-gradient, type-display-mixed, img-watercolor-illustration, nav-none, mood-dreamy, id-poster-art |
| harumaki-ftr | layout-centered-frame, color-monochrome-blue, type-display-futuristic, img-illustration, nav-none, mood-emotional, id-anime-cover |
| hana | layout-fullbleed-hero, color-dark-monochrome, type-blackletter-emblem, img-photo-grainy, nav-playback-controls, mood-moody-intense, id-cinematic-band |
| dimden | layout-dense-grid, color-black-neon-green, type-pixel-bitmap, img-pixel-art, nav-sidebar-list, mood-nostalgic-chaotic, id-neocities-diy |
| stephanewillems | layout-fullbleed-hero, color-dark-moody, color-cool-accent, type-handwritten-signature, type-sans-clean, img-photo-portrait, img-lowkey-lighting, nav-pill-topbar, mood-cinematic, id-minimal-dramatic |
| merodev | layout-void-center, color-dark-moody, type-mono-pixel, img-none, nav-none, mood-mysterious, id-minimal-void, id-gatekeeper-splash |
| hoshimachisuisei | layout-asymmetric-bleed, color-monochrome-blue, color-single-accent, type-serif-logotype, type-tracked-caps, img-illustration-anime, nav-topbar-tab, mood-nocturnal-glam, id-idol-branding |
| thatskygame | layout-centered-hero, color-pastel-gradient, color-warm-light, type-script-wordmark, type-rounded-sans, img-3d-painterly, nav-topbar-standard, mood-whimsical-dreamy, id-storybook-soft |
| pomodorosa | layout-masonry-grid, color-bw-photo-accent, color-neutral-light, type-utilitarian-sans, img-mixed-media, img-illustration-anime, nav-full-textbar, mood-scrapbook-busy, id-diy-multihyphenate |
| fumino | layout-airy-scattered, layout-negative-space, color-pastel-lavender, type-handdrawn, img-photo-collage, nav-tabbed-folder, mood-soft-diary, id-scrapbook-journal |
| midnightsolarium | layout-centered-terminal, color-dark-neon, color-neon-glow, type-monospace-terminal, img-pixel-icon, nav-none-gateway, mood-eerie-cozy, id-webcore-nostalgia |
| sengoku | layout-fullbleed-hero, color-warm-dusk-brown, type-bold-japanese-serif, img-photo-architecture, nav-topbar-minimal, mood-traditional-festive, id-heritage-event-poster |
| kaitonote | layout-centered-grid, color-black-electric-blue, type-serif-italic-display, img-3d-gradient-orb, nav-topbar-minimal, mood-futuristic-clean, id-portfolio-precision |
| eve | layout-dense-magazine, color-dark-vivid-accent, type-serif-caps-nav, img-illustration-vibrant, nav-topbar-full, mood-energetic-artistic, id-music-artist-site |
| zutomayo | layout-fullbleed-collage, layout-dense-composition, color-muted-green-dark, type-brush-logotype, img-illustration, nav-topbar-minimal, mood-melancholic-nostalgic, id-anime-band-aesthetic |
| tuyu | layout-centered-portrait, color-purple-pink-dark, type-clean-sans-jp, img-illustration, nav-topbar-icons, mood-melancholic-cinematic, id-gothic-idol-aesthetic |
| yannesidibe | layout-centered-minimal, color-monochrome-black, type-display-arc-multilingual, img-none, nav-none-visible, mood-mysterious-quiet, id-conceptual-typographic |
| jaimekim | layout-grid-gallery, color-warm-varied-palette, type-handdrawn-logo-clean-nav, img-illustration-storybook, nav-topbar-textlinks, mood-cozy-nostalgic, id-childrens-book-craft |
| mirandasofroniou | layout-masonry-gallery, color-warm-painterly, type-handlettered-logo, img-gouache-illustration, nav-topbar-textlinks, mood-warm-worldly, id-editorial-illustrator |
| dennissnellenberg | layout-centered-minimal, color-dark-near-black, type-simple-sans, img-none-visible, nav-none-visible, mood-quiet-mysterious, id-loading-teaser |
| minionsart | layout-card-grid, color-dark-purple-pink, type-bubbly-handdrawn, img-3d-render, nav-topbar-icons, mood-playful-vibrant, id-crafty-dev-blog |
| mikeklubnika | layout-dense-list, color-dark-monochrome, type-monospace-terminal, img-object-icons, nav-topbar-textlinks, mood-lofi-dystopian, id-webzine-retro |
| unitsoftware | layout-vertical-card-stack, color-light-mono, type-monospace-terminal, img-diagram-wireframe, nav-icon-header, mood-technical-clean, id-devtool-minimal |
| brittanychiang | layout-split-sticky, color-dark-navy, type-clean-sans, img-none-text-only, nav-sidebar-anchor, mood-professional-calm, id-portfolio-resume |
| helloteajp | layout-full-bleed, color-dark-monochrome, color-warm-accent, type-serif-elegant, img-photo-macro, nav-topbar-minimal, mood-serene, mood-luxury, id-premium-japanese |
| acegikmo | layout-centered-column, layout-card-grid, color-light-neutral, type-mono-casual, img-thumbnail-grid, nav-none-scroll, mood-personal-playful, id-handmade-portfolio |
| maximeheckel | layout-hero-plus-list, color-dark-blue-glow, type-sans-modern, img-3d-particle, nav-pill-topbar, mood-futuristic, id-generative-tech |
| cyanilux | layout-card-panel, color-dark-teal, type-sans-rounded, img-illustration-mascot, nav-pill-topbar, mood-cozy, id-tutorial-mascot |
| iquilezles | layout-index-cardgrid, color-dark-monochrome, type-sans-plain, img-none-iconography, nav-none-index, mood-austere, id-academic-minimal |
| reol | layout-hero-popup, color-cool-dark-red-accent, type-bold-condensed, img-3d-render, img-photo-product, nav-topbar, mood-energetic, mood-commercial, id-idol-merch, id-glossy |
| avogado6 | layout-grid-dense, color-muted-sage, color-mono-accent-pop, type-minimal-plain, img-illustration, img-handdrawn, nav-topbar, mood-melancholic, id-diary-archive, id-prolific |
| yorushika | layout-negative-space, color-cool-pale-kraft-accent, type-minimal-absent, img-photo-stilllife, img-product, nav-sidebar, mood-hushed, mood-ceremonial, id-tactile-object |
| toki | layout-fullbleed-photo, color-cool-dark-forest, type-elegant-serif, img-photo-aerial, img-nature, nav-footer, mood-solemn, mood-premium, id-heritage-nature |
| unseen † | layout-centered-splash, color-blush-pink, color-dark-band, type-minimal-mark, img-none, nav-none-splash, mood-warm-minimal, id-motion-studio |
| 109ichiki † | layout-black-canvas, layout-negative-space, color-pure-black, color-pink-blue-accent, type-clean-mono, img-illustration-anime, img-3d-object, nav-text-pills, mood-playful-internet, id-illustration-portfolio |
| lowrysfarm † | layout-editorial-grid, layout-apparel-grid, color-unknown, type-unknown, img-apparel-photo, nav-unknown, mood-calm-editorial, id-japanese-apparel |
| potg † | layout-spacious-index, layout-negative-space, color-blush-pink, type-serif-display, type-serif-numeral, img-illustration-anime, nav-minimal-textlinks, mood-soft-dreamy, id-illustrator-index |
| norikura † | layout-fullbleed-night, layout-right-rail, color-navy-night, color-single-gold-accent, type-serif-display, img-fireworks, nav-topbar-minimal, mood-nocturnal-festive, id-heritage-fireworks-event |
| chriskalafatis † | layout-centered-preloader, color-black-on-white, type-grotesque-condensed-caps, img-none, nav-none-preload, mood-stark-brutalist, id-brutalist-preloader |
| cortiz † | layout-fullbleed-hero, color-pure-black, color-green-magenta, type-gothic-distressed, img-3d-wireframe, nav-consent-gate, mood-edgy-experimental, id-experimental-devfolio |

`†` = inferred, lower confidence. Do NOT bulk-apply the `†` rows to gallery `data-tags` without a real-browser pass; see judgment-log.md.

### Iteration 2 — STEP 2: candidates + cohesion (2026-08-09)

**Scope:** strong candidates per visible factor (several each, tier-agnostic — a C site can win a factor), then a cohesion map: 5 families that each combine into a coherent whole, plus 5 strange-but-worth-trying pairings. Motion/interactivity are NOT judged — carried only from Rod's notes (unseen water-ripple/dive, 109ichiki draggable-3D-objects, lowrysfarm decoupled-drift, potg floating-cards, fumino/jaimekim line-boil). Governing razor: warm + intentionally-handmade > clean-polish; open + scannable, NOT explorable; scribbly hand-font + clean mono, NO serif; dark-default; Three.js lantern/water scene must survive.

#### A. Candidates per factor (picked sites + one-line why)

| factor | candidates (best-fit first) |
|---|---|
| **layout** | **fumino** — airy off-grid scattered scrapbook page with folder-tab section-switching; single best pillar-fit (warm, handmade, open-not-explorable). · **109ichiki** — pure-black canvas of draggable window-cards in generous negative space; internet-native, spatial-but-scannable. · **helloteajp** — masterclass asymmetric full-bleed framing + numbered index (borrow composition ONLY; serif/luxury identity off-pillar). · **pomodorosa** — dense masonry magazine grid that stays legible; proof scrapbook density can be structured (maps to project/tools surfaces). · **acegikmo** — centered single-column spine feeding a thumbnail grid; mirrors Rod's section-landing + project-cards. · **yorushika** — extreme negative-space, single-object-per-view (cool identity off-pillar; spacing discipline only). |
| **color** | **harumaki-ndt** — fully-composed poster palette (blue-gradient night sky + hot-pink drip + yellow pop); album-art bold + warm. · **mirandasofroniou** — warm saturated painterly gouache; the literal embodiment of warm+handmade. · **jaimekim** — cohesive warm storybook palette held cozy across the whole gallery (curation, not one hero color). · **minionsart** — candy-bright accents (magenta/purple/electric) on a dark ground; playful pops that stay legible. · **avogado6** — muted-sage base letting rare saturated pops carry emotional weight (restraint IS strong color). |
| **type** | **harumaki** — purest locked pairing: warm hand-lettered marker wordmark + tracked small-caps support. · **jaimekim** — handdrawn logo + clean sans nav; the display-plus-clean split, zero serif. · **fumino** — handdrawn marker headers over rounded-sans body; cozy diary register. · **acegikmo** — best warm-mono exemplar (mono as everyday reading voice; caveat: its serif headers are off-pillar). · **dimden** — strongest personality-driven mono/bitmap (fits clean-mono pillar; neon-on-black runs cold, needs warming). · **minionsart** — bubbly handdrawn logo + rounded sans; playful, handmade, warm. |
| **imagery** | **jaimekim** — storybook children's-book illustrations, per-piece warm pastels; purest warm-handmade imagery + dead-on pillar. · **mirandasofroniou** — genuinely hand-painted gouache/watercolor travel illustration; handmade-over-polish exactly. · **harumaki-ndt** — watercolor moon-boat-fireworks fused into one crafted poster; night-festival imagery uncannily aligned with the lantern/water scene. · **avogado6** — dense grid of handdrawn manga-ink; raw brush/ink IS the identity. · **hana** — grainy warm-sepia live-performance photography; imagery strength beyond illustration, cinematic without going cold. |
| **nav** | **fumino** — folder-tab switcher (manila tabs flip sections in place); most on-pillar (tactile, scrapbook, open-not-explorable — all tabs visible at once). · **dimden** — neocities sidebar link-list; whole site laid bare as one scannable column, warm DIY. · **109ichiki** — draggable-window text pills (HOME/PROFILE/CONTACT) in mono; nav as a playful object, scannable not explorable. · **jaimekim** — handdrawn logo + restrained clean topbar of textlinks + socials; the exact locked mark+clean split. · **helloteajp** — minimal topbar + numbered index (01/02/03); structure + scannability, could carry mono support without serif coldness. |
| **atmosphere** | **harumaki-ndt** — fully-committed wistful night-festival dreamscape (moon-boat fireworks, watercolor blue-into-pink); exactly the lantern-festival pillar. · **midnightsolarium** — eerie-cozy nocturnal webring glow (string-lights, CRT teal, pastel baubles); atmosphere IS the site, neocities-warm. · **hana** — enveloping cinematic intimacy from near-black warm sepia/amber; mood floods the viewport. · **sengoku** — ceremonial warm-festive heritage (dusk, sepia-brown, cream, gold); genuine festival warmth, echoes Rod's theme. · **tuyu** — total commitment to melancholic rain-gothic (purple-magenta + falling rain); one unbroken emotional register. · **zutomayo** — melancholic nostalgic-chaotic density; a lived-in world, not a clean layout. |
| **identity** | **fumino** — cozy fan-diary scrapbook-journal (handdrawn marker, photo-collage doodles, folder tabs); genuinely handmade, not designed-to-look-handmade. · **jaimekim** — children's-book illustrator craft carried whole; personality inseparable from the work. · **harumaki** — handmade scrapbook fan-art warmth with real conviction (marker wordmark + collaged covers). · **dimden** — fiercest, most cohesive personality; neocities Y2K DIY, the anti-corporate benchmark. · **acegikmo** — best scribbly-plus-clean-mono match; friendly indie tech-artist, warm without polish veneer. · **midnightsolarium** — webcore/neocities nostalgia; eerie-cozy webring identity, distinctive yet non-corporate. |

**Motion/interactivity (carried from Rod, NOT judged):** unseen = water ripple/dive on interact (STEAL); 109ichiki = draggable/3D-interactable window-objects; lowrysfarm = decoupled-drift (one thing floats, rest calm); potg = floating-cards; fumino + jaimekim = line-boil on the hand-drawn mark. These attach to whichever family adopts their host site.

#### B. Cohesion map — families (clusters that combine into a coherent whole)

Per Rod's COMBINATION PRINCIPLE: cohesion beats best-of-each; a good-but-cohesive element beats a best-but-clashing one. Each family below is a *sensibility*, sized to seed one of the eventual 4 designs. The four must end up genuinely different, so the families are deliberately spread across the warm/cool and quiet/busy axes.

**Family 1 — "Handmade Fan-Diary" (scrapbook-journal).** The warmest, most on-pillar cluster.
- Groups: layout=**fumino** (+pomodorosa density where surfaces get busy), nav=**fumino** folder-tabs, type=**fumino/harumaki/jaimekim** handdrawn marker + rounded/clean support, imagery=**jaimekim** storybook illustration, color=**jaimekim/mirandasofroniou** warm curated pastels, identity=**fumino/jaimekim/harumaki**. Motion: line-boil (fumino/jaimekim).
- Feel: a cozy, hand-assembled diary page. Doodles, folder tabs, warm paper. Reads as made-by-a-person. **Scene fit:** lantern/water sits behind soft paper warmth — compatible, may need the scene dimmed so collage stays legible.

**Family 2 — "Night-Festival Poster" (lantern dreamscape).** The most Three.js-scene-aligned cluster.
- Groups: color=**harumaki-ndt** (blue-night + pink + yellow), imagery=**harumaki-ndt** watercolor moon-boat-fireworks, atmosphere=**harumaki-ndt / sengoku / norikura† / midnightsolarium**, type=**harumaki** hand-lettered wordmark, layout=**helloteajp** full-bleed poster framing (composition only). Motion: none required beyond the live scene.
- Feel: the whole page as one wistful festival poster; the lantern/water scene is the hero, everything else framed around it. **Scene fit:** native — this family is basically the scene wearing a poster.

**Family 3 — "Neocities Internet-Native" (playful DIY).** Rod's already-favored 109ichiki + dimden energy.
- Groups: layout=**109ichiki** draggable window-cards on black canvas, nav=**109ichiki** text-pills / **dimden** sidebar link-list, type=**dimden/acegikmo** mono/bitmap warmed, identity=**dimden/midnightsolarium**, color=**minionsart** candy pops on dark. Motion: 109ichiki draggable-3D-objects (carried).
- Feel: spatial, tactile, very-online; scannable objects you can shove around, not places you travel to. **Scene fit:** pure-black canvas is a natural stage for the lantern/water scene behind floating windows — strong fit, watch contrast of window chrome over the scene.

**Family 4 — "Quiet Editorial Restraint" (warm-mono negative space).** The composed, disciplined pole — distinct from the busy families by sheer spacing.
- Groups: layout=**helloteajp / yorushika** negative-space + numbered index, nav=**helloteajp** numbered index / clean topbar, type=**acegikmo** warm casual mono, color=**avogado6** muted base + rare saturated pop, imagery=**avogado6/mirandasofroniou** sparse hand-ink accents. Motion: lowrysfarm decoupled-drift (one element floats).
- Feel: lots of air, one thing at a time, restraint as the statement. Warm-mono keeps it from going cold/luxury. **Scene fit:** ideal — negative space lets the lantern/water scene breathe as the single focal object.

**Family 5 — "Cinematic Mood-Flood" (enveloping dark).** The riskiest / most off-pillar, kept as a stretch direction.
- Groups: atmosphere=**hana / tuyu / zutomayo**, imagery=**hana** grainy warm-sepia photo (or dense illustration collage a la zutomayo), color=**hana** near-black warm amber, type=**harumaki** hand-lettered mark for warmth against the dark. Motion: none required.
- Feel: mood floods the whole viewport; intimate, moody, immersive. **Scene fit:** the dark warmth is scene-friendly, but the cinematic/photographic register pulls toward cool-polish and must be actively warmed to survive the razor.

#### C. Surprising / strange pairings worth trying

Per "be empowered to try strange combinations if the result could be interesting":

1. **Neocities draggable windows (109ichiki) × watercolor night-festival poster art (harumaki-ndt).** DIY window-chrome carrying dreamy hand-painted poster imagery — junk-shop framing around fine-art content. Could be magic or could read as kitsch; worth a bubble.
2. **Editorial negative-space layout (helloteajp/yorushika) × handdrawn marker type (harumaki/fumino).** Luxury spacing warmed and de-cooled by scrapbook lettering; strips helloteajp's serif coldness while keeping its composition tension. Risk: could look under-designed/empty.
3. **avogado6's muted-sage restraint palette × minionsart's candy color pops.** Melancholic ground with rare electric bursts — maximum emotional weight per pop. The two color candidates are opposites; forcing them together is the interesting part.
4. **fumino folder-tab nav × hana's cinematic mood-flood atmosphere.** Cozy diary tabs living inside an enveloping near-black intimacy — warmth + moodiness at once, a "diary read by lantern-light" register.
5. **acegikmo warm-mono voice × 109ichiki draggable spatial canvas.** A handmade tech-artist's monospace personality poured into an internet-native, shove-the-cards-around layout — Family 3 and Family 4's sensibilities crossed.

**Note toward Step 3/4:** Families 1–4 are the strongest distinct seeds (warm-diary / festival-poster / neocities-DIY / quiet-editorial). Family 5 is a stretch; if the 4 final designs need a fourth that is clearly different, the neocities-DIY and cinematic-flood directions are the two most different from the warm center. Pairings 1 and 3 are the highest-upside-highest-risk and should get early test bubbles.

### Iteration 3 — STEP 3: idea-bubble build specs (2026-08-09, NOT marked done)

**Scope:** directional BLOCKOUT specs for the 6 highest-value idea bubbles — the 4 SAFE seed families (warm-diary / festival-poster / neocities-DIY / quiet-editorial) + the 2 highest-upside Step-2 pairings (Pairing 1 window×poster, Pairing 3 muted×sparks). Family 5 (cinematic mood-flood) SKIPPED as off-pillar. These are DISTINCT-direction blockouts, not pixel finals. Every component named by its `extracted/components/` folder; every technique cited to a gallery site. Locked calls honored throughout: scribbly hand-drawn `--font-hand` (Caveat placeholder) + line-boil for the name/logo card, clean `--font-mono` (IBM Plex) support, **NO serif** (so the `--font-display` Shippori Mincho is deliberately NOT used in these directions — headers go hand or mono), warm dark-default, open-not-explorable.

**Component inventory (real folders):** top-bar, hero, favicon, goo-toggle, slap-toggle, list-controls, button-kit, project-cards-expensive (+ merged-card, card-tests), reel-band, post-header, tldr-callout, stamp-callout, quote-block, code-block, site-footer, draw-in-icons, cursor-glow, cursor-coords, drift-magnet, magnetic, palette.

---

#### Bubble 1 — `warm-diary` — "Handmade Fan-Diary"
**Basis:** Family 1 (scrapbook-journal), the warmest / most on-pillar seed.
**Components:** top-bar, favicon, hero, list-controls, project-cards-expensive (+ merged-card), reel-band, post-header, tldr-callout, stamp-callout, quote-block, code-block, draw-in-icons, cursor-glow, site-footer, drift-magnet.
**Techniques:** fumino (manila folder-tab section-switch, airy off-grid scatter, line-boil on the mark), jaimekim (storybook illustration imagery + handdrawn-logo/clean-nav split), harumaki (marker wordmark), pomodorosa (structured scrapbook density so the project grid stays legible), mirandasofroniou (warm curated gouache pastels).
**Layout (top→bottom):**
- **topbar:** favicon + hand-drawn "rodney fan" (Caveat + line-boil); nav reskinned as MANILA FOLDER TABS (fumino) taped on a paper strip, mono sub-labels; goo/slap toggles kept right.
- **hero:** warm washi/paper panel over a DIMMED scene; big hand-lettered logo, mono tagline, doodle scroll-cue (draw-in-icons chevron), slap-toggle scene switch styled as a taped label.
- **tools:** tool icons as washi-taped sticker badges (draw-in-icons recolor), scattered not gridded.
- **reel:** reel-band framed like a taped-in photo strip / polaroid border.
- **project-cards:** merged-card grid in pomodorosa structured-masonry; each card a scrapbook clipping (tape corners, slight rotation), video-on-hover kept, line-boil on titles.
- **post:** post-header hand title; tldr + stamp (perforated) + quote-block as diary margin-asides; code-block as a taped snippet.
- **about:** diary spread — photo-collage doodles, handwritten captions.
- **footer:** "thanks for wandering by" handwritten + doodle arrow.
**threejs:** fits (scene dimmed) — lantern/water sits behind soft paper warmth; dim so collage stays legible.

#### Bubble 2 — `festival-poster` — "Night-Festival Poster"
**Basis:** Family 2 (lantern dreamscape), the most scene-aligned seed.
**Components:** top-bar, favicon, hero, slap-toggle, button-kit, reel-band, project-cards-expensive, post-header, tldr-callout, stamp-callout, site-footer.
**Techniques:** harumaki-ndt (composed poster palette blue-night+hot-pink+yellow, watercolor moon-boat-fireworks imagery), harumaki (hand-lettered wordmark), sengoku (ceremonial festival warmth, gold hairlines, ticket-style CTA), helloteajp (full-bleed poster framing + numbered index 01/02/03), norikura (single-gold-accent night, right-rail).
**Layout (top→bottom):**
- **topbar:** minimal transparent — favicon + hand wordmark left, nav as tracked-mono links with ONE cool-accent active mark; sengoku ticket-style primary (button-kit--primary) far right.
- **hero:** THE SCENE IS THE POSTER — full-bleed lantern/water, hand-lettered title composed like album art, mono/vertical subtitle, harumaki-ndt gradient overlay (blue night → warm); helloteajp numbered index (01/02/03) down a right rail = wayfinding.
- **tools:** gold-hairline strip (`--color-line`), icons as festival-stall glyphs.
- **reel:** full-bleed cinematic band = the main-stage marquee.
- **project-cards:** capped bento, framed as poster inset panels with gold hairline borders.
- **post:** post-header as centered poster masthead; callouts as festival-program asides.
- **about:** single poster panel with a moon-boat-fireworks watercolor motif.
- **footer:** gold hairline + festival closing line.
**threejs:** fits (native) — this family is literally the scene wearing a poster.

#### Bubble 3 — `neocities-diy` — "Neocities Internet-Native"
**Basis:** Family 3 (playful DIY), Rod's already-favored 109ichiki + dimden energy.
**Components:** top-bar, favicon, hero, cursor-coords, project-cards-expensive (+ merged-card), list-controls, button-kit, goo-toggle, slap-toggle, reel-band, code-block, post-header, tldr-callout, site-footer, drift-magnet.
**Techniques:** 109ichiki (draggable window-cards on black canvas, mono text-pill nav HOME/PROFILE/CONTACT, negative space), dimden (sidebar link-list, feature-density/slop, bitmap-mono personality), minionsart (candy accent pops on dark), midnightsolarium (string-light/webring cozy glow).
**Layout (top→bottom):**
- **topbar:** mono text-pills (109ichiki) HOME/PROJECTS/ABOUT/RAMBLINGS as draggable-feeling chips; favicon spins. (Alt: dimden sidebar link-list.)
- **hero:** pure-dark canvas, scene behind; a mono wordmark "window" + a couple of draggable window-cards floating; cursor-coords HUD as a playful mono ticker.
- **tools:** tool icons as desktop-shortcut sprites, candy-accent hover (minionsart).
- **reel:** reel-band as a media-player window with chrome.
- **project-cards:** merged-cards reskinned as OS windows (title bar, close/min dots) you can shove around (drift-magnet drag); video-on-hover; candy glow.
- **post:** post rendered inside a window frame; code-block native (terminal); callouts as sticky-note windows.
- **about:** a "readme.txt" / profile window + feature-slop widgets (webring, hit-counter via goo-toggles/badges).
- **footer:** webring string-lights (midnightsolarium) + mono signoff.
**threejs:** fits (watch contrast) — pure-black canvas is a natural stage for lantern/water behind floating windows; watch window-chrome contrast over the scene.

#### Bubble 4 — `quiet-editorial` — "Quiet Editorial Restraint"
**Basis:** Family 4 (warm-mono negative space), the disciplined pole — distinct by sheer spacing.
**Components:** top-bar, favicon, hero, list-controls, project-cards-expensive (uniform), card-tests (staggered-uniform-squares), reel-band, post-header, quote-block, tldr-callout, site-footer, drift-magnet.
**Techniques:** helloteajp (asymmetric negative-space + numbered index 01/02/03), yorushika (extreme negative space, one-object-per-view), acegikmo (warm casual mono as the reading voice), avogado6 (muted base + rare saturated pop), lowrysfarm (decoupled-drift — one element floats, rest calm).
**Layout (top→bottom):**
- **topbar:** whisper-minimal — favicon + hand wordmark left, numbered-index nav (01 Home / 02 Projects …) in warm mono, huge negative space, one cool-accent active.
- **hero:** mostly empty; scene breathes as the single focal object; small hand wordmark + one mono line; decoupled-drift on ONE element (a lantern glyph floats, rest still).
- **tools:** a restrained single-row mono list, generous gaps, no grid pressure.
- **reel:** one wide band with lots of air around it.
- **project-cards:** uniform squares (card-tests staggered-uniform), one-per-emphasis, muted covers with a rare gold pop, minimal chrome.
- **post:** post-header with airy measure; acegikmo warm-mono body; quote-block + tldr as sparse margin notes; big whitespace.
- **about:** single column, one portrait/illustration, lots of air.
- **footer:** one hairline, one mono line.
**threejs:** fits (ideal) — negative space lets the scene breathe as the single focal object.

#### Bubble 5 — `window-poster` — "Junk-Shop Gallery" (PAIRING 1)
**Basis:** Pairing 1 — Neocities draggable windows (109ichiki) × watercolor night-festival poster art (harumaki-ndt). Highest upside / highest kitsch risk.
**Components:** top-bar, favicon, hero, project-cards-expensive (+ merged-card), reel-band, button-kit, post-header, tldr-callout, site-footer, drift-magnet.
**Techniques:** 109ichiki (draggable window chrome, black canvas, mono pills), harumaki-ndt (watercolor moon-boat-fireworks poster imagery INSIDE the windows), sengoku (gold ceremonial trim), midnightsolarium (webring glow). Feel: DIY junk-shop window-chrome framing fine-art watercolor content.
**Layout (top→bottom):**
- **topbar:** 109ichiki mono text-pills + hand wordmark.
- **hero:** black canvas, scene behind (dim); a large DRAGGABLE "poster window" showing harumaki-ndt watercolor night-festival art as the centerpiece; hand-lettered title.
- **tools:** small windows / sprites.
- **reel:** media-player window showing the reel.
- **project-cards:** each a draggable window whose COVER is watercolor/painterly art (not screenshots), gold trim, video-on-hover inside the frame.
- **post:** content window; watercolor header banner; callouts as sticky windows.
- **about:** a framed watercolor "portrait window."
- **footer:** webring + gold hairline.
**threejs:** fits (dim scene behind art windows) — black canvas stages both, but watercolor art competes with the scene, so keep the scene dim behind windows OR seat windows in negative space beside it. RISK: kitsch / clash.

#### Bubble 6 — `muted-sparks` — "Melancholy with Sparks" (PAIRING 3)
**Basis:** Pairing 3 — avogado6 muted-sage restraint × minionsart candy pops. Forcing the two opposite color candidates together.
**Components:** top-bar, favicon, hero, list-controls, project-cards-expensive (+ card-tests dense grid), reel-band, post-header, quote-block, tldr-callout, stamp-callout, cursor-glow, site-footer, drift-magnet.
**Techniques:** avogado6 (muted-sage base, dense diary grid, rare saturated pop carrying emotional weight, handdrawn manga-ink accents), minionsart (candy magenta/purple/electric pops on dark), acegikmo (warm-mono voice to keep it from going cold). Feel: melancholic muted ground where rare bursts carry maximum weight.
**Layout (top→bottom):**
- **topbar:** near-monochrome muted; ONE candy-accent on the active link only.
- **hero:** subdued desaturated field, scene MUTED/dimmed; hand wordmark in muted tone; a single candy spark (cursor-glow / one glowing lantern) = the one hot element.
- **tools:** muted icon row; hover reveals a candy pop (the only saturated moment).
- **reel:** muted band; a single accent frame.
- **project-cards:** avogado6 dense grid of muted covers; on hover ONE card lights candy-bright (minionsart); handdrawn-ink tags.
- **post:** muted reading surface; quote/tldr muted; a rare candy accent on the key stamp/takeaway.
- **about:** muted ink-illustration; one saturated detail.
- **footer:** muted; one candy link on hover.
**threejs:** scene-can-adapt (desaturate scene; reserve pops for UI) — the scene must be desaturated/dimmed to hold the melancholic ground, and candy pops kept OFF the scene so they don't fight lantern warmth. RISK: candy-cool pops vs warm razor (mitigate by biasing pops warm — coral/ember — or spending the single cool-accent token).

#### Built bubbles (blockout files)

| bubble | file | components used | three.js verdict | real vs mocked |
|---|---|---|---|---|
| warm-diary | `redesign-lab/bubble-warm-diary.html` | top-bar, favicon, hero, list-controls, project-cards-expensive, merged-card, reel-band, post-header, tldr-callout, stamp-callout, quote-block, code-block, draw-in-icons, cursor-glow, site-footer, drift-magnet hooks | fits (dimmed) | Real: all component markup/classes lifted verbatim from `extracted/components/**` with real CSS linked unmodified. Mocked: new scoped `diary-*` overlay stylesheet (manila folder-tab nav, washi-tape hero panel, taped scrapbook-clipping cards, diary-margin post asides, handwritten footer) + placeholder copy. No drift-magnet/favicon/top-bar JS wired; no existing files touched. |
| festival-poster | `redesign-lab/bubble-festival-poster.html` | top-bar, hero, slap-toggle, button-kit, reel-band, project-cards-expensive (subset), post-header, tldr-callout, stamp-callout, site-footer | fits (native, scene = hero) | Real: markup/classes pulled verbatim from `extracted/components/**`, styled by real `settings.css`/`generic.css` tokens, actual compiled `three-background-scene.min.js` loaded behind hero. Mocked: poster dressing layer (gradient overlay, numbered-index rail, ticket CTA, stall-strip glyphs, poster-frame borders, about-panel gradients) + placeholder copy/media, videos stripped. |
| neocities-diy | `redesign-lab/bubble-neocities-diy.html` | top-bar, favicon, hero, project-cards-expensive/merged-card, list-controls, button-kit, goo-toggle, slap-toggle, reel-band, code-block, post-header, tldr-callout, site-footer, drift-magnet attrs | fits (watch contrast) | Real: all component HTML/CSS pulled verbatim from `extracted/components/*` with real CSS linked. Mocked: `.wm-*` OS-window chrome skin (titlebars, traffic lights, floating window-card positions, desktop shortcuts, string-lights, sticky-note framing) built fresh, static positioning not live drift-magnet physics; minimal inline JS for cursor-coords ticker only; search/filter, code-block copy, scene-switch toggle unwired. Three.js script points at real build path. |
| quiet-editorial | `redesign-lab/bubble-quiet-editorial.html` | top-bar, favicon, hero, list-controls, project-cards-expensive, card-tests, reel-band, post-header, quote-block, tldr-callout, site-footer, drift-magnet | fits (ideal, negative space) | Real: all section markup copied from real extracted component HTML/CSS, re-tuned via override `<style>` layer only. Mocked: card cover images/videos removed (empty `.card-cover`), lorem-ish body copy, about/portrait block built as plain div (no such component exists). Live JS wired: `drift-magnet.js` + `favicon.js` only; search/filter and card-tests grid-fill intentionally unwired. Three.js scene tag included behind content. |
| window-poster | `redesign-lab/bubble-window-poster.html` | top-bar, favicon, hero, merged-card/project-cards-expensive CSS on new window cards, reel-band, button-kit, post-header, tldr-callout, site-footer, 109ichiki step-start caret | fits (dim scene behind art windows); risk: kitsch/clash | Real: top-bar, favicon, hero markup+CSS, merged-card/project-cards-expensive CSS classes reused, reel-band, button-kit, post-header, tldr-callout, site-footer, settings/generic tokens, 109ichiki caret ported verbatim from `sources/109ichiki-caret.md`. Mocked: `.win` draggable-window chrome is new/flagged Slop (drag is real plain-JS but z-index-raise only, no snapping/persistence), watercolor art is CSS gradient washes standing in for real illustration, reel band has no real video, drift-magnet/tilt/flip JS intentionally left unwired. |
| muted-sparks | `redesign-lab/bubble-muted-sparks.html` | top-bar, favicon, hero, list-controls, project-cards-expensive, reel-band, post-header, quote-block, tldr-callout, stamp-callout, cursor-glow, site-footer | scene-can-adapt (desaturate/dim) | Real: all component markup copied verbatim from `extracted/components/*`, linked against real component CSS + `generic.css`/`settings.css`. Mocked: muted-sage + candy-accent palette is a new inline `<style>` override block not yet fed back into `settings.css`; drift-magnet/card-tests JS engines not wired (only a trivial pointermove listener drives cursor-glow); three.js scene tag wrapped in a `filter: saturate/brightness` div to fake a scene-level dim rather than a real shader change. |

**Cross-bubble notes:** Bubbles 1/4/6 want the scene DIMMED or DESATURATED; 2 wants it HERO/native; 3/5 want it as a dark-canvas STAGE behind windows. None demand scene geometry changes — only exposure/saturation. Distinctness spread: 2 = warm+busy+scene-forward, 4 = warm+quiet+air, 3/5 = dark-canvas+playful-DIY, 1 = warm+cozy+collage, 6 = muted+rare-electric. All six honor the locked hand-font-name + clean-mono + no-serif + open-not-explorable calls.

### Iteration 4 — STEP 4: the 4 designs (2026-08-09, NOT marked done — for Rod)

**Method:** four seed families become four designs, each a cohesive WHOLE with one dominant personality (NOT a factor-by-factor max). The two Step-2 pairing bubbles are FOLDED IN where they strengthen a design rather than seeding their own: `window-poster` splits cleanly — its two ingredients (watercolor poster ART + draggable WINDOW chrome) go to two different designs — and `muted-sparks` folds wholesale into the restraint design. So two of the four are strengthened past their raw seed; the warm-diary anchor stays deliberately uncut. Each design maps to one axis of the razor and a distinct corner of the warm/quiet vs dark/busy space. All four honor the LOCKED calls: scribbly hand-drawn name/logo + line-boil, clean mono support, warm dark-default, open-NOT-explorable, no serif / no cold-corporate.

**Distinctness spread (the four corners):**
- **A Lantern Poster** — warm · atmospheric · scene-as-HERO · airy-composed → Axis III (open & wondrous).
- **B Fan-Diary** — warm · cozy · collage-DENSE · scene-hidden-behind-paper → Axis I (warm & hand-made).
- **C Playroom** — dark · playful · draggable-TOYS · internet-native → Axis II (alive & playful).
- **D Embers** — muted · restrained · negative-SPACE · rare-heat → cross-cutting SPACE + Axis III restraint.

---

#### Design A — `festival-poster` — "Lantern Poster"
**One line:** the whole page is one wistful night-festival poster you arrive *into*, the live lantern/water scene composed like album art with hand-lettered title and gold ceremonial trim.
**Basis:** seed = Bubble 2 (festival-poster). FOLDS IN Bubble 5 (window-poster) — takes its watercolor poster ART (harumaki-ndt moon-boat-fireworks as painterly project covers + about panel) but NOT its junk-shop window chrome (that goes to Design C).
**Factor choices:**
- *layout:* full-bleed poster, scene-as-hero; helloteajp numbered-index right rail (01/02/03) as wayfinding; project cards = capped bento poster-inset panels with gold hairline borders.
- *color:* harumaki-ndt composed poster palette — blue night sky → warm pink drip + gold/yellow pop, warm-forward over the locked twilight tokens.
- *type:* harumaki hand-lettered wordmark composed like album art (`--font-hand` + line-boil on the name card) + tracked clean-mono support. No serif (`--font-display` Mincho stays unused).
- *imagery:* harumaki-ndt watercolor moon-boat-fireworks; folded from window-poster — painterly/watercolor covers on project cards instead of screenshots; about = one watercolor poster panel.
- *nav:* minimal transparent topbar, tracked-mono links + ONE cool-accent active mark, sengoku ticket-style primary CTA far right.
- *atmosphere:* fully-committed wistful night-festival dreamscape; wonder + openness; the scene is the emotional hero.
- *identity:* poster/album-art craft + heritage-festival warmth (sengoku gold hairlines, norikura single-warm-accent).
**Distinct from the other 3:** the only scene-as-HERO design — least UI chrome, most atmospheric; B hides the scene behind paper, C cages it behind windows, D shrinks it to one focal object in white space. A lets it fill the viewport.
**threejs:** NATIVE — this design is literally the scene wearing a poster; blue-night→warm gradient overlay only, no geometry change.

#### Design B — `warm-diary` — "Fan-Diary"
**One line:** a cozy, hand-assembled scrapbook-diary of taped clippings, doodles and manila folder tabs, warm paper laid over a dimmed scene so it reads as genuinely made-by-a-person.
**Basis:** seed = Bubble 1 (warm-diary). Deliberately UNCUT — kept as the pure Axis-I warm anchor; folding either pairing (dark windows / muted sage) would only muddy its warm-saturated cozy register.
**Factor choices:**
- *layout:* fumino airy off-grid scrapbook scatter; pomodorosa structured-density keeps the project grid legible; cards = scrapbook clippings with tape corners + slight rotation.
- *color:* mirandasofroniou warm gouache wash — cream/manila paper, rose, sage, ochre over the twilight tokens; the warmest, most saturated-warm of the four.
- *type:* harumaki/fumino handdrawn marker headers (Caveat) + line-boil on the name, M PLUS Rounded body, clean-mono captions. No serif.
- *imagery:* jaimekim storybook illustration + photo-collage doodles, handwritten captions, washi tape.
- *nav:* fumino manila folder-tab section-switcher (all tabs visible at once = open-not-explorable), mono sub-labels; goo/slap toggles kept.
- *atmosphere:* cozy hand-assembled diary page; made-by-a-person warmth; the Axis-I anchor.
- *identity:* scrapbook-journal fan-diary — genuinely handmade, not designed-to-look-handmade.
**Distinct from the other 3:** the collage-DENSE warm pole with the scene nearly hidden behind paper; A is airy + scene-forward, C is dark + spatial, D is muted + empty. B is the only paper-morphism / warm-saturated / hand-illustrated surface.
**threejs:** FITS (dimmed) — scene sits behind a warm paper scrim, heavily dimmed so the collage stays legible; exposure change only.

#### Design C — `neocities-playroom` — "Playroom"
**One line:** a pure-black internet-native canvas of draggable OS-window cards and mono text-pills you shove around and poke, one hero window carrying watercolor festival art so the terminal grid keeps a warm soul.
**Basis:** seed = Bubble 3 (neocities-diy). FOLDS IN Bubble 5 (window-poster) — takes its draggable WINDOW chrome and its single watercolor "poster window" as the hero (the warm heart that stops the grid going cold/terminal). Carries Rod's 109ichiki draggable-3D-object motion note = the Axis-II interaction payload.
**Factor choices:**
- *layout:* 109ichiki pure-black canvas of draggable window-cards in generous negative space; merged-cards reskinned as OS windows (title bar, traffic-light dots) shoved around via drift-magnet drag; dimden feature-slop widgets.
- *color:* dark ground + minionsart candy accent pops (pink/cyan/lime) + midnightsolarium string-light gold; warmed so it doesn't run cold against the razor.
- *type:* 109ichiki/dimden clean-mono as the reading voice + bitmap personality; hand wordmark + line-boil on the name card. No serif.
- *imagery:* folded from window-poster — one hero draggable "poster window" carries harumaki-ndt watercolor night-festival art; tool icons as desktop-shortcut sprites; pixel/webring motifs.
- *nav:* 109ichiki mono text-pills (HOME/PROJECTS/ABOUT/RAMBLINGS) as draggable-feeling chips (+ optional dimden sidebar link-list); cursor-coords HUD ticker.
- *atmosphere:* spatial, tactile, very-online playroom; scannable objects you poke, NOT places you travel (open-not-explorable honored); webring string-lights cozy glow.
- *identity:* neocities Y2K DIY, internet-native — the anti-corporate pole, Rod's already-favored dimden + 109ichiki energy.
**Distinct from the other 3:** the ONLY dark-canvas / draggable-toy / candy-accent design; where the "poke it, it's alive" interaction lives. A/B/D are all warm-lit scrolling pages; C is a spatial-but-scannable desktop.
**threejs:** FITS (stage) — pure-black canvas is a natural stage for the lantern/water scene behind floating windows; watch window-chrome contrast over the scene; exposure only.

#### Design D — `quiet-embers` — "Embers"
**One line:** restraint as the statement — a muted, hushed, negative-space page where the scene breathes as the single focal object and one rare warm ember is the only thing that burns.
**Basis:** seed = Bubble 4 (quiet-editorial). FOLDS IN Bubble 6 (muted-sparks) wholesale — the avogado6 muted-sage ground + a single warm ember pop (biased coral/ember, NOT cold cyan) so the restraint reads warm-melancholic and alive rather than cold/dead/luxury.
**Factor choices:**
- *layout:* helloteajp/yorushika extreme negative space, one-object-per-view; uniform muted squares (card-tests staggered-uniform); lowrysfarm decoupled-drift — one lantern glyph floats, everything else still.
- *color:* muted-sparks fold — avogado6 muted-sage / warm-muted ground where a single warm ember pop carries maximum emotional weight; the one cool-accent token spent rarely.
- *type:* acegikmo warm casual mono as the everyday reading voice + hand wordmark + line-boil on the name card only. No serif (acegikmo's own serif headers dropped per the lock).
- *imagery:* sparse hand-ink accents (avogado6), muted covers with a rare saturated pop; one portrait/illustration per view.
- *nav:* helloteajp numbered-index nav (01/02/03) in warm mono, whisper-minimal topbar, huge negative space, one cool-accent active.
- *atmosphere:* restraint-as-statement; melancholic muted calm where rare heat lands hard; the scene breathes as the single focal object.
- *identity:* quiet warm-mono editorial — disciplined, one-thing-at-a-time; the anti-busy pole.
**Distinct from the other 3:** the muted / empty / restrained pole — the only design that subtracts. A fills the frame, B fills it with paper, C fills it with windows; D empties it and lets one ember and one drifting lantern carry the whole page.
**threejs:** FITS (ideal, desaturated) — negative space lets the scene breathe as the single focal object; desaturate + dim it to hold the muted ground and reserve warm pops for UI; exposure/saturation only.

**Fold-in ledger:** window-poster → ART to A, WINDOWS to C (split); muted-sparks → whole to D; warm-diary anchor stays uncut. Every locked call honored across all four. No design requires scene geometry change — A native, B/C dim-or-stage, D desaturate. Next: Rod picks / merges before we build any forward.
