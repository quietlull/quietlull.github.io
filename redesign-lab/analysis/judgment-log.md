# Judgment log

A running record of every non-obvious call the JUDGE made during synthesis, so Rod can review and correct. Honest about uncertainty. `conf` = my confidence.

## Step 1 factor calls (2026-08-09)

### Sites INFERRED with no real screenshot (loader / unreachable — treat all as low-to-mid confidence)

- unseen · Tagged the blush-pink SPLASH frame only (dark top band + tiny centered "N / UNSEEN STUDIO®" mark). The whole point of this S+/STEAL site is the water/ripple 3D interaction Rod described, which is MOTION and deliberately not judged; visible-factor tags describe a near-empty splash and undersell the site. · why: only the splash rendered; conf: LOW on identity, HIGH that the splash itself is blush-pink minimal.
- 109ichiki · Inferred pure-black canvas + draggable retro-windows + white 3D blob objects + anime character + barcode + mono type + text pills from Rod's written description, not a screenshot (headless got the "87%" loader). 3D-interactable objects are carried as Rod's motion note, not judged. · why: Rod's note is detailed and specific; conf: MED-HIGH on the static layout/type/color, the 3D interactivity is his call not mine.
- lowrysfarm · WEAKEST inference. Geo-blocked, no capture ever obtained. color/type/nav tagged `unknown`; only layout (editorial apparel grid) + atmosphere (calm editorial) + identity (Japanese apparel) come from the teardown, and the "one thing floats, rest calm" decoupled-drift is MOTION carried from Rod. · why: no visual at all, teardown-only; conf: LOW. Needs a proxy/real-browser pass before its tags are trusted.
- potg · Inferred from Rod's own screenshot (headless only got the loader): pale blush-pink, huge elegant serif "pickup works" watermark, floating anime illustration cards, serif numerals, minimal nav. The floating-cards behavior is motion (carried). · why: Rod screenshotted it and described it well; conf: MED-HIGH on the visible palette/type/imagery.
- norikura · Live site 404s; tags derive from the in-repo `ref-norikura.html` clone + Mine/You notes (navy night, fireworks, single gold accent, serif display, arch masks, water reflection, right rail). nav-topbar-minimal is a guess. · why: judging a clone stand-in, not the original; conf: MED on the palette/mood keepers, LOW on nav.
- chriskalafatis · Captured mid-PRELOAD only: bold uppercase grotesque "CHRIS KALAFATIS." + "100%" counter, black-on-white. The reveal Rod liked is motion after this frame (carried). Tagged as a brutalist preloader, which is not the real homepage. · why: preloader frame; conf: HIGH on the frame's look, LOW that it represents the site.
- cortiz · Caught on the intro/consent screen: pure black, green/magenta WebGL wireframe torus-knot, distressed gothic "CORTIZ", music-consent modal. nav-consent-gate is inferred; the real nav is unseen. Rod flagged the "stencil-buffer-ish" 3D cards (behind the gate) which I did not see. · why: consent gate only; conf: MED on hero visuals, LOW on nav/interior.

### Ambiguous / borderline factor assignments (seen sites)

- stephanewillems · Called the rim light "cool teal/blue accent" and gave it both color-dark-moody AND color-cool-accent. Borderline whether the faint rim qualifies as a real accent color or just lighting; kept both per the descriptor. · conf: MED.
- helloteajp · Assigned TWO color tags (dark-monochrome + warm-accent) and TWO mood tags (serene + luxury). Judgment call that the amber/cream is a distinct accent worth its own tag rather than folding into monochrome. · conf: HIGH.
- pomodorosa · "color-bw-photo-accent" is awkward: the banner is B&W but the grid carries full-color illustration thumbs + red YouTube accents. One color cell can't fully capture the split; matrix cell notes both. · conf: MED.
- acegikmo · Given both layout-centered-column AND layout-card-grid because it's a single column that CONTAINS a thumbnail grid. Slight double-count of layout. · conf: MED-HIGH.
- kaitonote · Serif-italic mixed WITH clean sans in the same headline — tagged type-serif-italic-display, which foregrounds the serif and underplays the sans pairing. Judgment: the italic serif is the memorable move. · conf: MED.
- eve · "img-illustration-vibrant" covers the vivid album art but the site ALSO has a grayscale thumbnail filmstrip; picked the dominant vivid read. · conf: MED.
- zutomayo · Palette called "muted-green-dark" (sage/olive) but there are saturated accent pops in the character art; tagged the dominant desaturated ground. Also gave it two layout tags (fullbleed-collage + dense-composition) for the same single image. · conf: MED.
- toki / yorushika / helloteajp · All three are premium JP brands with near-monochrome + one warm/cool accent + minimal type. They will cluster hard in Step 2; flagging now that their tags look similar by design, not by my error. · conf: HIGH.
- reol · Heavy tag count (10) because the popup hero, carousel, mixed 3D-render + product-photo imagery, and dual mood (energetic + commercial) all read as distinct. May be over-tagged relative to simpler sites. · conf: MED.
- avogado6 vs zutomayo vs tuyu · All "melancholic" + illustration + JP. avogado6 is diary-archive (monochrome ink), the other two are polished single-illustration heroes. Kept mood-melancholic on all three but the identity tags separate them. · conf: HIGH.
- merodev / midnightsolarium / dimden / mikeklubnika · The "gateway/terminal/neocities" family. merodev is a bare gate, midnightsolarium a decorated gate, dimden+mikeklubnika full pages. All share dark + mono/pixel + nostalgic; tagged consistently so they cluster, but they differ a lot in density. · conf: HIGH.
- dennissnellenberg · Tagged img-none-visible + id-loading-teaser because the capture is a preloader ("· Hello"). Same caveat as chriskalafatis: not the real site. Marked as seen (not `†`) since it did render, but it's effectively a loader. · conf: HIGH on the frame, LOW that it represents the site.
- yannesidibe · Homepage is near-empty (rotating multilingual ring); the element Rod actually took (spotlight-reveal hover) is on the About page and is MOTION. Visible tags describe the sparse homepage only. · conf: HIGH on what's visible, but the visible part isn't why it's rated.

### Discipline notes

- Motion/interactivity never judged. Carried as Rod's notes where present: unseen (water ripple/dive), 109ichiki (3D interactable objects), lowrysfarm (decoupled drift), potg (floating cards), chriskalafatis + dennissnellenberg (reveal after preload), fumino/jaimekim (line-boil, per plan doc). These do NOT appear as visible-factor tags.
- The 7 `†` inferred rows in the tag table are best-guess. Recommend a real-browser pass (web-snapshot skill) before the mechanical step writes them into gallery `data-tags`, especially lowrysfarm (color/type/nav = unknown).

## Step 2 candidate/cohesion calls (2026-08-09)

### Factor-strength vs overall-pillar-fit divergences (kept for the factor, flagged the clash)
- helloteajp as a LAYOUT candidate - its serif/luxury identity is squarely off-pillar; I picked it for composition/framing ONLY and said so. Factor-strength high, whole-site fit low. conf: HIGH it's a strong layout, HIGH it must not carry its type/identity.
- acegikmo as TYPE + IDENTITY candidate - its serif headers directly violate the NO-serif lock; only the casual warm-mono half qualifies. Divergence within one site. conf: MED-HIGH (mono is a genuine warm-mono exemplar; serif must be dropped).
- dimden as TYPE candidate - strongest personality mono/bitmap, but neon-on-black runs cold against the warm pillar; carried with an explicit "needs warming" caveat. conf: MED (could clash if palette isn't rewarmed).
- minionsart in COLOR and TYPE - a lower-overall-tier, hobbyist dev-blog site nailing candy color-pops and a bubbly logo; factor-strength outruns its tier. conf: MED-HIGH on color pops, MED on type.
- hana in IMAGERY and ATMOSPHERE - photographic + cinematic, i.e. off the illustration+warm center of the pillar; kept because its mood/imagery execution is genuinely strong, but it pulls cool. conf: MED (real risk it fails the razor).
- avogado6 as COLOR candidate (restraint) - the muted-sage discipline is the pick, but its melancholic-cool identity diverges from warm; borrowing palette-discipline not mood. conf: MED-HIGH.
- yorushika as LAYOUT candidate - cool ceremonial identity is off-pillar; spacing discipline only. Same shape of call as helloteajp. conf: HIGH on spacing, HIGH it can't carry its identity.

### Candidates I was unsure of
- Splitting one artist (harumaki vs harumaki-ndt) across factors - harumaki for type/identity, harumaki-ndt for color/imagery/atmosphere. Risk that Family 2's "cluster" is really just one creator's output wearing two hats. conf: MED.
- pomodorosa as a layout candidate for a WARM site - it's B&W-leaning DIY-zine; I picked it only as proof that scrapbook density can stay legible (structure lesson), not for its palette. Unsure it earns a slot vs just being a density reference. conf: MED.
- 109ichiki and unseen candidacies lean partly on CARRIED MOTION (draggable-3D / water-ripple) that I did not judge; the visible-factor pick is only the static black-canvas layout / nav / pills. Flagging that the reason Rod rates them is partly the motion I'm not scoring. conf: MED-HIGH on the static picks, motion is Rod's call.

### Family-boundary coin-flips
- midnightsolarium placed in BOTH Family 2 (atmosphere: nocturnal glow) and Family 3 (identity: neocities webring). Genuine coin-flip; it bridges festival-mood and DIY-internet. conf: MED.
- acegikmo placed in Family 3 (neocities, via warm-mono) but could sit in Family 4 (quiet-editorial, also via warm-mono). Warm-mono is the hinge between the playful-DIY and the restrained-editorial poles. conf: MED.
- Whether "Quiet Editorial Restraint" (Family 4) and "Night-Festival Poster" (Family 2) are truly distinct - both want the scene to breathe in negative space. They diverge on busy/quiet and warm-illustration/composed-air, but the boundary is soft. conf: MED.
- Including a 5th family ("Cinematic Mood-Flood") at all - it's the most off-pillar (cool, photographic) and risks seeding a design that fails the razor. Kept as a labelled STRETCH, not a peer of 1-4. If Rod wants only cohesive-safe seeds, drop it. conf: LOW that it should be a full design; MED that it's worth one test bubble.

### Risky-but-interesting pairings (flagged as gambles, not recommendations)
- Pairing 1 (neocities windows x watercolor poster art) - highest upside, highest kitsch risk; junk-chrome over fine-art could clash badly. conf: LOW it works, HIGH it's worth trying.
- Pairing 2 (editorial negative-space x handdrawn type) - could read as under-designed/empty if the warm type doesn't fill the air. conf: MED.
- Pairing 3 (avogado6 muted base x minionsart candy pops) - forcing the two opposite color candidates together; could be striking or could muddy. conf: MED.
- Pairing 4 (fumino folder-tabs x hana mood-flood) - crosses warm-cozy with cool-cinematic; the interesting-but-fragile "diary by lantern-light" register depends on warming hana's dark. conf: MED.

### Discipline notes
- Motion/interactivity never judged in Step 2; carried only where Rod noted it (unseen, 109ichiki, lowrysfarm, potg, fumino/jaimekim line-boil) and attached to the family that adopts the host site.
- No candidate list treated tier as a gate - minionsart (lower tier) wins color/type slots; helloteajp/yorushika (high craft) are demoted to composition-only. Factor-strength, not overall tier, drove inclusion, per the plan.
- Every family recorded a Three.js scene-fit verdict inline in the plan (Family 2 = native, Family 4 = ideal, Families 1/3 = compatible-with-a-watch-item, Family 5 = needs-active-warming).

## Step 3 spec calls (2026-08-09)

Lead-designer judgment calls made while writing the 6 idea-bubble build specs. All are DIRECTIONAL blockout decisions, revisable at build time.

### Which bubbles to build
- Built exactly the 6 requested: 4 safe families + Pairings 1 and 3 (the two the Step-2 note flagged highest-upside/highest-risk). Chose 1 and 3 over Pairings 2/4/5 because the note explicitly nominated 1 and 3 for early bubbles; did NOT second-guess that ranking. conf: HIGH on following the brief; MED on whether 2 (editorial×handdrawn) might actually out-perform Pairing 1.
- Skipped Family 5 per instruction (off-pillar). Agree it should not seed a bubble. conf: HIGH.

### Component-mapping calls (no pixel source, invented the arrangement)
- **Folder-tab nav** (Bubble 1) has NO dedicated extracted component — it reskins top-bar nav into fumino manila tabs. That is a net-new treatment, provenance = fumino technique, not a lab component. Flag for the provenance ledger. conf: MED.
- **OS-window reskin of merged-card** (Bubbles 3 + 5) — merged-card/project-cards-expensive exists, but "window chrome + title bar + close/min dots + draggable" is invented on top of it via drift-magnet drag + 109ichiki technique. Real component underneath, novel chrome on top. conf: MED.
- **cursor-coords as a visible HUD ticker** (Bubble 3) — cursor-coords is currently an internal shared pointer/rAF util, NOT a visible readout. Surfacing it as UI is a repurpose; may not be what it was built for. conf: LOW-MED.
- Reused **draw-in-icons** as washi-taped sticker badges (Bubble 1) and desktop-shortcut sprites (Bubble 3) — same component, two very different skins; assuming its recolor/draw-in behavior survives both. conf: MED.

### Locked-call enforcement
- Deliberately did NOT use `--font-display` (Shippori Mincho serif) in ANY of the 6, because the locked call is NO serif. This means the settings.css type fork is only using 3 of its 4 fonts in these directions (hand + mono + rounded body). Headers go hand or mono. Flag: if Rod wants the serif back, it violates the current lock. conf: HIGH on the lock; noting the token goes unused.

### Pairing-3 warm-razor tension (the biggest risk I flagged)
- minionsart candy pops are magenta/purple/electric = COOL, which fights Axis-I warm. I resolved this in-spec by (a) desaturating the scene, (b) keeping pops OFF the scene, and (c) recommending pops be biased warm (coral/ember) or spent via the single cool-accent token. This is me PATCHING a pairing that partly contradicts the razor; Rod may prefer to let the cool pops stand for contrast, or to kill the pairing. conf: MED that the patch preserves the interesting-ness; the whole pairing is a labelled gamble.

### Three.js verdicts
- Assigned: Bubble 2 = fits/native, Bubble 4 = fits/ideal, Bubbles 1 = fits/dimmed, 3 = fits/watch-contrast, 5 = fits/dim-behind-art, 6 = scene-can-adapt/desaturate. No bubble was rated conflicts or irreconcilable — every direction can host the scene with only exposure/saturation changes, no geometry change. conf: MED-HIGH (these are reasoned from the scene being a background layer, not tested in a render).

### Distinctness
- Confirmed the 6 spread across warm/cool and busy/quiet so Step 4 can consolidate to 4 genuinely-different designs. Soft boundary remains between Bubble 2 (festival-poster) and Bubble 4 (quiet-editorial) — both want the scene to breathe; they diverge on busy/warm-illustration vs quiet/air. Same soft-boundary note carried from Step 2. conf: MED.

## Step 4 design calls (2026-08-09)

Creative-director judgment defining the 4 final designs. All revisable; Rod picks/merges before build.

### Which 4 seeds, and how the 2 pairings fold in
- Chose the 4 SAFE seed families as the 4 designs (festival-poster / warm-diary / neocities-diy / quiet-editorial) rather than promoting a pairing to a 5th design. Rationale: those four already sit at the four corners of the warm/quiet vs dark/busy space and each maps cleanly to one razor axis; adding a pairing as a peer would blur the spread. conf: HIGH.
- **Split window-poster across two designs** — its two ingredients separate cleanly: watercolor poster ART → Design A (Lantern Poster, as painterly covers/about panel), draggable WINDOW chrome → Design C (Playroom). This dissolves the pairing's kitsch risk: the risk lived in fusing junk-chrome AROUND fine-art in the SAME frame; splitting them means art lands in a poster context (native) and windows land in a terminal context (native), neither fighting the other. This is me actively defusing Pairing-1's flagged clash rather than shipping it. conf: MED-HIGH that the split is safer than the fused bubble; the fused window-poster bubble still exists if Rod wants the risky version.
- **Folded muted-sparks WHOLE into Design D** rather than keeping it separate. quiet-editorial and muted-sparks are the same restraint sensibility (negative space, one-thing-at-a-time); muted-sparks just adds the emotional-weight mechanic (muted ground + one rare warm pop) that keeps quiet-editorial from reading cold/luxury. Merging them makes D stronger than either alone. Carried the muted-sparks risk patch: ember pop biased WARM (coral), not cold cyan, per Axis-I. conf: MED-HIGH.
- **Left warm-diary (Design B) deliberately UNCUT** — no pairing folded in. Both pairings pull toward dark (windows) or muted (sage), which would dilute B's job as the pure warm-saturated cozy anchor. A design that folds nothing is intentional here, not an oversight. conf: HIGH.

### Distinctness resolution (the soft boundary I flagged twice)
- The Step-2/Step-3 soft boundary between festival-poster and quiet-editorial (both "want the scene to breathe") is RESOLVED by pushing them to opposite scene-roles: A = scene fills the frame as HERO (busy, warm, composed); D = scene shrinks to one focal object in empty space (quiet, muted, subtractive). They no longer overlap on "breathe" — A is additive/atmospheric, D is subtractive/restrained. conf: MED-HIGH.
- Four-corner check ran clean on all 6 pairwise comparisons (see plan): the discriminators are scene-role (hero/hidden/staged/shrunk), density (dense/dense/spatial/empty), and ground (warm-lit/paper/black-canvas/muted). No two designs share more than one. conf: MED-HIGH.

### Axis mapping (one dominant axis each, not a max of all)
- A→Axis III (open & wondrous), B→Axis I (warm & hand-made), C→Axis II (alive & playful), D→cross-cutting SPACE + Axis-III restraint. Deliberately gave each design ONE dominant axis so they read as distinct personalities; each still touches the others (all warm, all hand-font-named) but leads with one. Risk: D leans on the CROSS-CUTTING space pillar rather than a numbered axis, so it's the least "axis-pure" of the four — but it's the clearest embodiment of Rod's repeated "great spacing" note. conf: MED-HIGH.

### Three.js verdicts
- A native / B dim / C stage / D desaturate — all exposure-or-saturation only, no geometry change, consistent with the per-bubble verdicts. No design was allowed to require a scene rebuild; that was a selection constraint, not a coincidence. conf: MED-HIGH (reasoned from the scene being a background layer; not render-tested).

### Locked-call enforcement across all 4
- Every design uses hand-font + line-boil for the name/logo card and clean mono support; NONE use `--font-display` (Mincho serif) — the serif token stays unused in all four, same as Step 3. open-not-explorable honored: A/B/D are normal scrolling pages, C is spatial-but-scannable (poke objects, don't travel to places). If Rod ever wants serif back, it breaks the lock across all four at once. conf: HIGH.
