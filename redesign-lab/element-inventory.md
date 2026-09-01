# Element inventories — per design (2026-06-08)

What UI elements/clusters each design provides, so the "new form" theme builds know their parts.
Build directions from Rod: **Norikura** = use his REAL Three.js about-scene as the bg; **Harumaki** = its own design (formerly "A1"; Rod prefers it over the skin recreation); **Merodev + Yannesidibe** = merge into ONE design.

Legend: [sig] = the distinctive thing that design contributes.

---

## 1. HANA  (ref-hana / ref-hana-skin)
**Chrome**
- Fixed top nav bar: small wordmark logo (left) + horizontal text nav links (right); mix-blend screen; ignite-on-hover drop-shadow
**Hero**
- Tall hero: mono kicker + huge 2-line serif title + jp wordmark + scroll cue; logo breathes (drop-shadow pulse)
**Background**
- [sig] Lava-lamp BLOOM — two baked glow images cross-fade (bg-1 static, bg-2 0->1->0 over 12s), blur(20px)
**Section**
- Section header cluster: mono kicker (header-sub) + serif h2 (header-main)
**Boxes**
- Text-box card: dark translucent panel, [sig] 6-span FRAME-DRAW border, two-stop ambient glow, backdrop-blur
- Project/merch card: 5:6 dark panel, frame-draw border, two-stop ambient glow, [sig] IGNITE-on-hover drop-shadow, image cross-fade (base->alt on hover), 2s scale-bloom reveal, image + title + mono item-number
**Footer**: mono letter-spaced line
*Effects: lava-lamp bloom, frame-draw, ignite-on-hover, scale-bloom reveal. NO text glow (text-shadow:none).*

## 2. NORIKURA  (ref-norikura)  -> new form uses REAL Three.js bg
**Chrome**
- Top nav bar: serif brand + horizontal mono links
- Right vertical nav rail (writing-mode vertical)
- Fixed ticket/CTA pill (bordered, bottom-right)
**Hero**
- Big serif title + mono subtitle + [sig] date-stamp pill (bordered) + lede paragraph
**Background**
- Night scene: JS firework bursts + water reflection + treeline silhouette  ->  **REPLACE with Rod's three-background-scene.js (FBX lanterns, dock, water reflection, embers, scroll camera)**
**Section**
- Program section: mono slash-label header ("/ Program /")
**Boxes**
- Program card: dark navy panel, gold hairline border, hover-lift + gold border + glow, thumb (radial) + title + mono time-meta
- About block: mono kicker + serif body
*Effects: (Three.js scene), card hover-lift. Single gold accent.*

## 3. STEPHAN WILLIAMS  (ref-stephanewillems)
**Chrome**
- Top bar: [sig] cursive signature logo (DRAWS IN via clip-path wipe) + centered pill nav (active pill)
**Controls**
- [sig] Toggle switch (Technology <-> Personal) with active-label states
**Content**
- [sig] Skill-icon grid: thin outline SVG icons that DRAW IN (stroke-dashoffset, staggered) + labels fade in; hover = gold #FFDF00 offset drop-shadow glow + recolor EVERY stroke to gold + scale(1.08)
*Effects: SVG stroke draw-in, name clip-path wipe, gold hover glow. Sparse (it's a skills page) — contributes the toggle + the draw-in icon treatment.*

## 4. MERODEV + YANNESIDIBE  (merge into ONE)
**From MERODEV:**
- Enter splash gate (the 3D-scene gateway)
- Top bar: name + role (left) / framed "WORKS" (center) / [sig] bracketed "EXIT" (right)
- [sig] Project card: corner-bracket RETICLE frame around the image + bracketed "VIEW LIVE" button + uppercase-mono title + subtitle + description + bottom hairline
- Bottom social bar (© / LinkedIn / GitHub / Email)
- Left corner toggles (High Quality / Sound Effects / Light Mode)
**From YANNESIDIBE:**
- [sig] Kinetic hero: rotating circular multilingual greeting (SVG textPath) + role kicker + name; purple top-glow
- About grid: tall portrait + intro card + "X+ years" stat card (outlined-stroke number) + service cards with one "raised" (uneven offset)
- [sig] Spotlight-border cards: dual-layer pointer-tracked border reveal (white specular core -> color falloff), faint resting border
**Merge concept:** yannesidibe kinetic hero + spotlight about-cards + merodev reticle PROJECT cards + enter gate + top/bottom bars + corner toggles. TENSION to resolve: two card languages (spotlight-reveal vs bracket-reticle) — pick which is the project card vs the about card.

## 5. HARUMAKI  (formerly "A1"; Rod prefers this over the skin)
**Chrome**: top-left MENU (hamburger) ; right social rail (dots, ignite-on-hover)
**Hero**: [sig] hand-drawn Caveat logo + mono subtitle + tagline + scroll cue
**Section**: [sig] ~tilde~ hand-drawn header (mono number + Caveat name with ~ ~ ornaments)
**Boxes**: [sig] BENTO grid — varied-span cells (big / wide / normal), frame-draw border, ignite-on-hover glow, thumb + bottom meta (h3 + tags) + corner pin badge + hover-reveal KEY-LEARNING overlay
**Bands**: full-bleed cinematic reel band (edge-to-edge)
**Other**: tools line (centered text) ; floating "open for work" card (bottom-right)
*Effects: foundations breathing bloom, frame-draw, ignite hover, hover-learn.*

## (culled 2026-06-09) A2 / B1 / B2 — REMOVED
A2 was a HANA fork (no independent basis); B1 & B2 had no reference origin (slop-born). Element sets deleted. Do not rebuild. Remaining designs: HANA, NORIKURA, STEPHAN, MERODEV+YANNESIDIBE, HARUMAKI.

---

## Cross-design coverage (for the new-form builds)
- **Nav bar:** all have one; styles differ (hana mix-blend text / norikura serif+rail / merodev bracketed).
- **Project card** has the MOST variety to test: hana 5:6 frame+ignite ; merodev reticle+VIEW-LIVE ; harumaki bento.
- **Hero** styles: hana big-serif ; yannesidibe kinetic-ring ; harumaki hand-drawn.
- **Signature interactions to preserve per theme:** hana=frame-draw+ignite+bloom ; norikura=Three.js scene ; stephan=draw-in icons+toggle ; merodev+yanne=reticle cards + spotlight cards + kinetic hero ; harumaki=bento+tilde+hand-drawn.
