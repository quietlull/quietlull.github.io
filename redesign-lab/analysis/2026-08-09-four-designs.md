# The four designs (2026-08-09) — for Rod

Four full-page directions, each a cohesive WHOLE with one dominant personality (not a factor-by-factor best-of). Each honors the locked calls: scribbly hand-drawn name + line-boil, clean mono support, warm dark-default, open-NOT-explorable, no serif / no cold-corporate.

## How the four differ (30-second read)

- They sit in four corners of the warm/quiet-vs-dark/busy space: **A** fills the frame with atmosphere, **B** fills it with paper, **C** fills it with draggable windows, **D** empties it.
- They treat the lantern/water scene four different ways: **A** makes it the HERO, **B** hides it behind a dimmed paper scrim, **C** stages it behind a black-canvas desktop, **D** shrinks it to one focal object in negative space.
- They split the razor's axes: **A** = open & wondrous, **B** = warm & hand-made, **C** = alive & playful, **D** = restraint + rare heat.

---

## A — "Lantern Poster"  ·  `design-festival-poster.html`

**Personality:** the whole page is one wistful night-festival poster you arrive *into*.

**Key moves**
- *Layout:* full-bleed poster, scene-as-hero; helloteajp numbered-index right rail (01/02/03) for wayfinding; project cards = capped bento poster-inset panels with gold hairline borders.
- *Color:* harumaki-ndt composed poster palette — blue night sky into warm pink drip + gold/yellow pop, warm-forward over the twilight tokens.
- *Type:* harumaki hand-lettered wordmark composed like album art (+ line-boil) with tracked clean-mono support. No serif.
- *Imagery:* harumaki-ndt watercolor moon-boat-fireworks; painterly/watercolor covers on project cards instead of screenshots; about = one watercolor poster panel.
- *Nav:* minimal transparent topbar, tracked-mono links + ONE cool-accent active mark, sengoku ticket-style primary CTA far right.
- *Atmosphere:* fully-committed wistful night-festival dreamscape; the scene is the emotional hero.
- *Identity:* poster/album-art craft + heritage-festival warmth (gold hairlines, single-warm-accent).

**What makes it distinct:** the only scene-as-HERO design — least UI chrome, most atmospheric. B hides the scene, C cages it, D shrinks it; A lets it fill the viewport.

**Three.js verdict:** NATIVE — this design is literally the scene wearing a poster. Blue-night-into-warm gradient overlay only, no geometry change. It also loads the real compiled `three-background-scene.min.js` full-bleed behind everything.

**Honest caveats:** all copy/dates/links are placeholder; project-card covers are CSS gradient washes standing in for real painted watercolor illustration; the poster gradient overlay + gold-hairline dressing is new glue CSS, not an extracted component. Drift/magnet/tilt hooks are present in markup but not wired to live JS in this static blockout.

**Link:** http://localhost:4000/redesign-lab/design-festival-poster.html

---

## B — "Fan-Diary"  ·  `design-warm-diary.html`

**Personality:** a cozy, hand-assembled scrapbook-diary that reads as genuinely made-by-a-person.

**Key moves**
- *Layout:* fumino airy off-grid scrapbook scatter; pomodorosa structured density keeps the project grid legible; cards = scrapbook clippings with tape corners + slight rotation.
- *Color:* mirandasofroniou warm gouache wash — cream/manila paper, rose, sage, ochre; the warmest, most saturated-warm of the four.
- *Type:* harumaki/fumino handdrawn marker headers (+ line-boil on the name), M PLUS Rounded body, clean-mono captions. No serif.
- *Imagery:* jaimekim storybook illustration + photo-collage doodles, handwritten captions, washi tape.
- *Nav:* fumino manila folder-tab section-switcher (all tabs visible = open-not-explorable), mono sub-labels; goo/slap toggles kept.
- *Atmosphere:* cozy hand-assembled diary page; the Axis-I warm anchor.
- *Identity:* scrapbook-journal fan-diary — genuinely handmade, not designed-to-look-handmade.

**What makes it distinct:** the collage-DENSE warm pole with the scene nearly hidden behind paper. The only paper-morphism / warm-saturated / hand-illustrated surface.

**Three.js verdict:** FITS (dimmed) — scene sits behind a warm paper scrim, heavily dimmed so the collage stays legible; exposure change only.

**Honest caveats:** the most wired of the four — favicon.js, top-bar.js, and drift-magnet.js are all live (the bubble left JS out). But copy, dates, folder-tab section anchors, and filter/search wiring are placeholder/mocked. All component markup + CSS is reused verbatim from `extracted/components/`.

**Link:** http://localhost:4000/redesign-lab/design-warm-diary.html

---

## C — "Playroom"  ·  `design-neocities-playroom.html`

**Personality:** a pure-black internet-native canvas of draggable OS-window cards and mono text-pills you shove around and poke.

**Key moves**
- *Layout:* 109ichiki pure-black canvas of draggable window-cards in generous negative space; merged-cards reskinned as OS windows (title bar, traffic-light dots), drag-by-titlebar; dimden feature-slop widgets.
- *Color:* dark ground + minionsart candy accent pops (pink/cyan/lime) + midnightsolarium string-light gold, warmed so it doesn't run cold against the razor.
- *Type:* 109ichiki/dimden clean-mono as the reading voice + bitmap personality; hand wordmark + line-boil. No serif.
- *Imagery:* one hero draggable "poster window" carries harumaki-ndt watercolor night-festival art (the warm heart that stops the grid going cold); tool icons as desktop-shortcut sprites; pixel/webring motifs.
- *Nav:* 109ichiki mono text-pills (HOME/PROJECTS/ABOUT/RAMBLINGS) as draggable-feeling chips; live cursor-coords HUD ticker.
- *Atmosphere:* spatial, tactile, very-online playroom; scannable objects you poke, NOT places you travel to (open-not-explorable honored).
- *Identity:* neocities Y2K DIY — the anti-corporate pole, Rod's already-favored dimden + 109ichiki energy.

**What makes it distinct:** the ONLY dark-canvas / draggable-toy / candy-accent design; where the "poke it, it's alive" interaction lives. A/B/D are warm-lit scrolling pages; C is a spatial-but-scannable desktop.

**Three.js verdict:** FITS (stage) — pure-black canvas is a natural stage for the scene behind floating windows; watch window-chrome contrast over the scene; exposure only. The three.js tag renders only if `three-background-scene.min.js` exists at that path.

**Honest caveats:** the `.win` window-chrome system + its drag-by-titlebar JS are lifted near-verbatim (working) from the window-poster bubble, and project cards use real video sources. But the watercolor art is CSS-gradient placeholder (not real illustration); the drift-magnet data attributes are present but NOT wired to the live engine (drag-only here, no snap/persist); search/filter and code-block copy are inert.

**Link:** http://localhost:4000/redesign-lab/design-neocities-playroom.html

---

## D — "Embers"  ·  `design-quiet-embers.html`

**Personality:** restraint as the statement — a muted, hushed, negative-space page where one rare warm ember is the only thing that burns.

**Key moves**
- *Layout:* helloteajp/yorushika extreme negative space, one-object-per-view; uniform muted squares; lowrysfarm decoupled-drift — one lantern glyph floats, everything else still.
- *Color:* avogado6 muted-sage ground where a single warm ember pop carries maximum emotional weight. Resolves the two basis bubbles' conflict by taking muted-sparks' sage ground but re-biasing the accent WARM (`--color-ember: #ff6a3d`) instead of magenta/cyan, spent exactly once per section (hero lantern glyph, one card pin, reel-band frame line, quote text, about-portrait dot, nav active state).
- *Type:* acegikmo warm casual mono as the everyday reading voice + hand wordmark + line-boil on the name only. No serif.
- *Imagery:* sparse hand-ink accents, muted covers with a rare saturated pop; one portrait/illustration per view.
- *Nav:* helloteajp numbered-index nav (01/02/03) in warm mono, whisper-minimal topbar, huge negative space, one accent active.
- *Atmosphere:* restraint-as-statement; melancholic muted calm where rare heat lands hard.
- *Identity:* quiet warm-mono editorial — disciplined, one-thing-at-a-time; the anti-busy pole.

**What makes it distinct:** the muted / empty / restrained pole — the only design that subtracts. A fills the frame, B fills it with paper, C fills it with windows; D empties it and lets one ember + one drifting lantern carry the whole page.

**Three.js verdict:** FITS (ideal, desaturated) — negative space lets the scene breathe as the single focal object; desaturate + dim it to hold the muted ground and reserve warm pops for UI; exposure/saturation only. Points at the real production bundle.

**Honest caveats:** drift-magnet interaction + favicon-spin JS are live and wired. But card cover images, reel-band content, and the about portrait are gradient/empty divs (no real media swapped in); filters, search, and card-tests grid-fill are static markup, not wired.

**Link:** http://localhost:4000/redesign-lab/design-quiet-embers.html

---

**Common to all four:** every component's markup + CSS is reused verbatim from `redesign-lab/extracted/components/`; no design requires a scene geometry change (only exposure/saturation); all copy is placeholder. Next: pick, merge, or ask for a fifth cross — then we build the chosen direction forward.
