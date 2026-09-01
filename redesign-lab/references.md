# References — sites we used + sites to revisit

Consolidated 2026-06-14 from the old vibe-hunt docs (theme-references, harumaki-vibe-sites,
norikura-inspiration-sites — now deleted, good content merged here).

**How this doc is organized (Rod's rule):**
1. **USED AS INSPIRATION / SOURCED** — sites we actually took data from, organized by what they gave + where the code lives.
2. **SOURCE-CODE WELLS** — kept docs that hold verbatim lifted code (not duplicated here).
3. **REVISIT (links only)** — everything considered but not used, parked in case it's wanted later.

---

## 1. USED AS INSPIRATION / SOURCED

### The five skin directions (each → a `ref-*.html` + `rework-*-ledger.md`)
- **HANA** — https://hana.b-rave.tokyo/ (+ tour `/borntobloom/`) — lava-lamp bloom background, nav-link ignite (stacked drop-shadow), card panel + frame-draw, per-letter header spawn, continuous petal drift. → `ref-hana.html`, `rework-hana-ledger.md`, `analysis/hana.md`, `sources/hana-nav.md`.
- **HARUMAKI** — https://harumakigohan.com/ (Studio Gohan) — bento grid, ~tilde~ hand-drawn headers, hand-lettered logo; also the TWILIGHT PALETTE anchor (see microsites below) and the entrance temporal-stagger reference. → `ref-harumaki.html`, `rework-harumaki-ledger.md`, `sources/harumaki-palette.md`.
- **NORIKURA** — https://norikura-hanabi.com/ — the elegant nocturnal serif direction; the live element CODE was lifted from the hanabi sites below (see source wells). → `rework-norikura-ledger.md`.
- **STEPHAN WILLEMS** — https://stephanewillems.be/ — draw-in skill icons (stroke-dashoffset) + cursive logo write-in (clip-path wipe). The two confirmed **True** elements. → `rework-stephan-ledger.md`.
- **MERODEV** — https://merodev.net/ — corner-reticle project cards + Enter-gate. → `rework-merodev-yanne-ledger.md`.
- **YANNESIDIBE** — https://yannesidibe.com/about — spotlight-reveal border (dual-layer radial mask) + kinetic rotating greeting ring. → cursor-lantern, `rework-merodev-yanne-ledger.md`.

### Specific technique / element sources
- **brittanychiang.com/#about** — cursor vignette spotlight (fixed radial at `--cx/--cy`). Pairs with yannesidibe for the "cursor-as-lantern." → `cursor-lantern.js`.
- **dennissnellenberg.com** — rising-circle / wave fill buttons + magnetic-button lerp. → `sources/dennissnellenberg-buttons.md`, `sources/dennissnellenberg-wave-button.md`, drift-magnet engine.
- **breakdance4fun.supadezign.com** (how-to-create-a-floating-animation-with-gsap) — the 2-axis independent-period sine DRIFT recipe (the lantern wander). → drift-magnet engine; code in `refs-floating-and-palette.md`.
- **chriskalafatis.com / tdesero** — lerp / magnet mechanics folded into the drift-magnet base. → `sources/chriskalafatis-*`.
- **LOWRYS FARM / dot-st (Adastria)** — decoupled drift (deco floats, text stays) + IntersectionObserver entrance reveals; the temporal-stagger entrance spec. → `sources/lowrys-motion.md`.
- **potg.art** + **109ichiki.com** — typography direction: high-contrast serif display + clean geometric/mono. → `sources/potg-typography.md` (free near-twins: Fraunces/Newsreader/Cormorant + Hanken/Schibsted Grotesk).
- **Mineko's Night Market** — https://minekosmarket.com/ — cozy night-market festival, warm→twilight, hand-crafted type. "Eerily on-theme" festival inspiration.
- CodePen / component sources (in ledgers + `sources/`): **phojanecki** (outline-ripple glow), **thejamespower** (fill-sweep), **YarivFrd** (slap toggle), **PatternFly** (empty state), **adevade** (status-line pulse ring), **atelierbram** (search caret), **nfranciosi** (outline/pill button), **MauriciAbad** (inline link underline).

### Palette / mood anchors
- **harumakigohan — NEO DREAM TRAVELER** https://harumakigohan.com/ndt/ and **Futarino** https://harumakigohan.com/ftr/ — the truest twilight-navy + warm-gold-glow embodiment (the palette anchor).
- **dimden.dev** — https://dimden.dev/ — the north-star for personality-through-craft (cursor cat, toggles, ambient bob). Neocities nocturne, lightweight CSS/JS.
- **Shinsekai Yori ED** — the amber/gold-on-dark palette origin (see memory `project_design_vision`).

---

## 2. SOURCE-CODE WELLS (kept — hold verbatim lifted code, do NOT delete)
- `scraped-norikura.md` — verbatim Remixed code for the norikura kit: top nav (suwako-hanabi.com `.gnavi`), buttons (restaurant.nelu.osaka `.boxbutton`/`hoverRoll`), footer + posts (sengokuhanabi.com `.footer`/`.decision`).
- `refs-floating-and-palette.md` — the breakdance4fun drift recipe (verbatim GSAP timeline + CSS nested-wrapper equivalent) + LOWRYS motion breakdown; also a large drift/twilight hunt list.
- `sources/*.md` — the per-source provenance captures required by the Code Provenance Contract.

---

## 3. REVISIT (links only — considered, not used)

### A. Dreamy / nostalgic / cinematic twilight (the harumaki idiom)
Style: dreamy storybook mood · twilight blue/lavender/pink OR golden-hour · hand-lettered/illustrated display + tilde/brush ornaments · single-column image-forward · organic/blob masks · handmade craft.
JP descriptors: 幻想的 (dreamlike) · エモい (nostalgic) · 手描き (hand-drawn) · 水彩 (watercolor) · やさしい配色 (soft palette).

- JP musicians/vocaloid: TUYU https://tuyu.moe/ · Reol https://reol.jp/ · Aimer https://www.aimer-web.jp/ · Eve https://eveofficial.com/ · Yorushika https://yorushika.com/?lang=en · ZUTOMAYO https://zutomayo.net/
- JP illustrators / anime-MV: Akane Yabushita https://akaneyabushita.com · Mateusz Urbanowicz https://mateuszurbanowicz.com (truest Shinkai grading) · SOLANI https://solani-illustration.xyz · Avogado6 https://www.avogado6.com · pomodorosa https://pomodorosa.com
- Label / agency clusters: Fumino https://fumino.b-rave.tokyo/ (same host as HANA) · Kaf "Fable" https://kaf.kamitsubaki.jp/fable/ · Hoshimachi Suisei https://hoshimachi-suisei.jp/ · KAMITSUBAKI STUDIO https://kamitsubaki.jp
- Real studios in this idiom: Garden Eight https://garden-eight.com · CINRA https://cinra.co.jp/work
- Cross-niche (proves it's a style not a niche): Eastward https://eastwardgame.com/ · GRIS https://nomada.studio/gris-game/ · Sky https://www.thatskygame.com/ · Spiritfarer https://thunderlotusgames.com/games/spiritfarer/ · Jaime Kim https://www.jaimekim.com/ · Miranda Sofroniou https://www.mirandasofroniou.com/ · David Whyte https://davidwhyte.com/experience/

### B. Dark-cinematic "Stéphane Willems" portfolios (two-voice type, emerge-from-shadow)
Markers: dark/near-black cinematic · expressive script/hand display + clean sans · 3D/cinematic hero · airy narrow column · frosted pill nav · line-art + playful voice.

- Closest on rare dark+script trait: Death & Co https://deathandcompany.com · Iris K https://theirisk.com (only verified frosted-pill nav) · Luke Baffait https://lukebaffait.fr · Still Night https://stillnight.joshua-garcia.com · Alchemist https://alchemist.dk · FRA! https://fradesign.it
- Dark-cinematic clean-sans (atmosphere refs): Dennis Snellenberg https://dennissnellenberg.com · Filippo Ruffini https://filipporuffini.com · Igor Mahr https://igma.im · Stas Bondar https://stabondar.com · Chris Kalafatis https://chriskalafatis.com · Sundown Studio https://sundown-studio.com · Anzo Studio https://anzo.studio · Isabel Moranta (best two-voice) https://www.awwwards.com/sites/isabel-moranta-portfolio · Pacôme Pertant https://pacomepertant.com · Quentin Hocdé https://quentinhocde.com · Dave Holloway https://daveholloway.uk · Unseen Studio https://unseen.co · STUDIO DETAILS https://details.co.jp · Kaito Note https://kaitonote.com
- Maker veins (one maker → many matches): Aristide Benoist https://aristidebenoist.com · Jon Way https://jonway.studio · Olivier Larose https://olivierlarose.com · Patrick David (FRA!) · studios: Locomotive, Immersive Garden, Resn, Cuberto.
- Unconfirmed (gated WebGL — eyeball in a real browser): nakirishota.com · artemartemartem.com · yutaabe.com · enzo-casalini.dev · bullionproductions.com · vitalinabender.com · silent-house.com

### C. Elegant nocturnal serif (the norikura register)
Markers: dark ground + single warm gold · serif/mincho + tracked caps · narrow column · tategaki/side-rail · hairline + → CTA · arch/circle/wave mask · calm/premium.

- JP hanabi (closest reachable twins): Sengoku https://sengokuhanabi.com/ · Jingu Gaien https://www.jinguhanabi.com/ · Itabashi https://itabashihanabi.jp/ · Nagaoka https://nagaokamatsuri.com/ · Suwako https://www.suwako-hanabi.com/
- JP craft / hospitality: Aman Kyoto https://www.aman.com/resorts/aman-kyoto · Hello Tea Japan https://helloteajp.com · The Tawaraya https://the-tawaraya.jp · Suzumon https://suzumon.co.jp/en/ · TOKI https://toki-fuji.com/ · MAHORA https://mahora-stay.com/ · Shinzan https://shinzan-kinosaki.jp/ · Manchinken https://manchinken.com/ · NELU https://restaurant.nelu.osaka/ · NEW SUSHISM https://new-sushism.jp/
- Dark serif editorial: The Paris Review https://www.theparisreview.org/ · Gagosian Quarterly https://gagosian.com/quarterly/ · The Point https://thepointmag.com/ · Craig Mod https://craigmod.com/ · Read Something Wonderful https://readsomethingwonderful.com/ · Field Studies Flora https://fieldstudiesflora.com/ · A24 https://a24films.com/ · New Genre https://newgenre.studio/
- WebGL "truest twins" (open in your browser): igloo.inc · obys.agency · maxime.gl · aristidebenoist.com · emergencemagazine.org · readmercury.com

### D. Discovery engines (renewable veins)
- **SANKOU!** sankoudesign.com — filter by dark / mincho / verticaltext / japanesestyle / 高級感 / 手書き / イラスト / 浮遊 / motion-effect.
- **Awwwards** /collections/dark-mode/, /hand-made-fonts/, /freelance-portfolio/ · **Godly** godly.website · **Land-book** land-book.com · **muz.li** · **muuuuu.org**.
- Native search terms that worked: 夜空 (night sky) · 灯り (lamplight) · 暖色 (warm color) · 浮遊感 (floating) · ふわふわ/ゆらゆら (soft-sway) · 余白 (negative space) · 縦書き (vertical text).
