# Reference gallery, re-analysed from source (2026-08-14, running)

The gallery's existing per-card notes were written from LOOKING at captures. Every real finding
this session came from reading source instead, and several contradicted what the capture implied
(the cloud partition is a sheet not a tiled strip; ndt's vertical title is an image not type;
109's SVG mask exists only because JS resizes it). So this pass re-reads all 57 tiered sites from
their actual HTML and CSS.

**The question this pass exists to answer, per device: is it CSS, or is it artwork?** That single
answer decides whether we can build a thing or whether it becomes a drawing task. It is invisible
in a screenshot, and it has caught us out repeatedly.

Method: `scratchpad/teardown.mjs` fetches each page plus up to 8 stylesheets and inline `<style>`
blocks, then counts mechanisms, lists painted assets by filename, and pulls declared fonts,
container widths, large paddings and breakpoints. Captures already cover the look; this covers the
mechanism. Worklist: `gallery-worklist.json` (57 sites, S6 / A7 / B17 / C11 / F1 / u15).

---

## THE HEADLINE FINDING (S tier)

**There are two completely different kinds of site in Rod's S tier, and they are opposites.**

| | harumaki main | Unseen Studio |
|---|---|---|
| `<img>` tags | **304** | 1 |
| inline `<svg>` | 0 | 19 |
| CSS custom properties | **0** | 54 |
| painted CSS backgrounds | 3 (a YouTube icon, 2 arrows) | 0 |

harumaki main is an **image-composited** site. It has no design tokens at all, and essentially
every visual element is a hand-drawn `<img>` placed with CSS. Unseen Studio is the pure opposite:
zero artwork, everything drawn in CSS and inline SVG, fully tokenised.

**This is the answer to "why does my site feel AI-generated and harumaki doesn't", and it is not a
technique.** harumaki's warmth is asset density: 304 drawn images. Our site is architecturally
Unseen Studio (tokens, CSS, components) while aiming for harumaki's feel. That gap cannot be closed
with CSS, which is exactly why the seam band, the cloud partition and the edge rails all resolved
to "mechanism built, ARTWORK OWED". It was never a coding problem.

Consequence for the redesign: either commission/draw a body of art, or stop chasing harumaki's
specific warmth and find a handmade quality that CSS and a live scene can actually deliver. That is
Rod's call and it is bigger than any individual component.

---

## S tier, per site

### harumakigohan (main) - image-composited, no tokens
- 304 `<img>`, 0 inline SVG, **0 custom properties**, 84KB CSS.
- Painted CSS backgrounds: only `new_youtube2x.png`, `news_left2x.png`, `news_right2x.png`.
- `transform` x128, `position:fixed` x18, `sticky` x5, one `background-attachment:fixed` (the sky).
- Fonts: system stack + `Yu Gothic` + a generic `serif`. **No webfont at all.**
- Containers 600-1280; big paddings 60 / 80 / 110.
- Libraries: Swiper, lazyload, jQuery.
- CONTRADICTS the gallery card, which credits its look to "palette + hand-drawn... colors and
  spacing". True but incomplete: the mechanism is 304 images and no type system.

### harumaki /ndt/ - the seam site
- 800KB CSS (largest in the tier), 79 `<img>`, 6 painted assets.
- Painted: `back.png`, `logo_wh.png`, `ribbon.png`, **`borderpink.png` / `borderblue.png` /
  `bordernavy.png`** - the three seam bands, confirmed as artwork.
- `background-repeat:repeat-x` x6 = the seams. `writing-mode`: **0**, confirming again that the
  vertical title is `logo_wh.png`, not type.
- Fonts: `Rounded Mplus 1c`, plus `shelby` and `Muli` (two faces the earlier scan missed).

### harumaki /ftr/ - THE vertical-type precedent
- 34 painted assets, nearly all `bh_spread_*.jpg` art-book spreads.
- **`writing-mode` x2** - so real CSS vertical text DOES exist in the harumaki family, on ftr,
  even though ndt's is an image. This matters for the hero tests: there is a genuine precedent.
- `keyframes` x7, `transform` x94, font `游明朝` (Yu Mincho).

### hana.b-rave - the mix-blend site
- **`mix-blend-mode` x17**, `display:grid` x52, `transition` x210, only 2 painted assets.
- Custom faces: `ff-carina`, `inter-variable`, `source-han-sans-japanese`, `togebarabold`.
- Relevant to the card reveal we just shipped: hana leans on `mix-blend-mode` heavily, so the
  additive treatment Rod picked has a real precedent in his own S tier.

### dimden.dev - the tiny one
- 19KB CSS total, 70 `<img>`, 6 custom properties, `position:fixed` x10.
- Fonts are all pixel/bitmap faces: `Pixel NES`, `NEC_APC3`, `RussianGothic`, `Perfect DOS VGA 437`.
- Proof that S-tier taste here does not require a big build.

### Unseen Studio - the CSS-only pole
- 0 painted assets, 19 inline SVG, **54 custom properties**, 1 `<img>`.
- `Neue Montreal` + `Saol Display`, `clip-path` x2, `transform` x67, breakpoints to 1921.

---

## A tier, per site

### thatskygame - THE ONE THAT MATTERS FOR THE DIVIDER PROBLEM
All 13 of its painted assets are **clouds**, and they are named as a system:

```
cloud-white--top.png     cloud-white--bottom.png
cloud-primary-light--top.png  cloud-primary-light--bottom.png
cloud-dark--top.png      cloud-dark--bottom.png
cloud-darkest--top.png   cloud-darkest--bottom.png
cloud-guide--top.png     cloud-footer.png
splash-clouds-top.png    splash-clouds.png    header-bg.png
```

Read the naming: **top/bottom PAIRS, in four darkness steps.** That is a section-transition system
where a zone is capped above and below by a cloud band, and the band's VALUE changes as the page
descends. Plus `mask` x14 and `background-attachment:fixed` x5.

This is the rejected seam band and the (dead) "vary the scrim per section" idea, combined, and
executed properly by a studio - on a game about flying through sky. Rod rejected painted dividers
because they divide flat colour fields his live scene does not have. thatskygame is the
counter-example worth weighing: its dividers do not separate flat fields, they add DEPTH to a sky,
which is exactly the "foreground objects / atmosphere" direction Rod said he liked.

Its spacing is also the most generous measured anywhere in the set: big paddings of
**80 / 100 / 120 / 160 / 200 / 220 / 230 / 250 / 300 / 360**. That confirms the a3zones reading
("every zone exhales 150-360px") with the source's own numbers.

### 109ichiki
41 tokens, `flex` x59, `grid` x16, `fixed` x17, `repeat-x` x2, big padding 120.
**Declared font list is `monospace` and nothing else** - independently confirming the earlier
computed-style finding that the entire site runs one mono face.

### Hoshimachi Suisei
**86 custom properties**, the most tokenised site in the set. `YakuHanJP` + `Avantt`, `mask` x2,
`transition` x37. A fully systematised modern build.

### potg.art
`fixed` x17, `flex` x46, `filter: blur()` x7, one painted `gradients.png`. Faces: `Dahlia`,
`Hellix`, `hiragino-kaku-gothic-pron`.

### stephanewillems / merodev - LIMIT OF THIS METHOD, not a finding
Both report 0 `<img>` and 0 inline `<svg>` with 56 and 61 custom properties. They are
client-rendered, so the served HTML has no content and a static read under-reports them. The
portrait visible in stephanewillems' capture does not exist in its HTML. **For SPA sites the
static pass is not valid** and the CDP computed-style pass is required instead. Flagged rather
than silently recorded as "no images".

### LOWRYS FARM - fetch failed, needs a retry (likely UA or geo gated).

---

## B tier (17)

### CORRECTION: CSS vertical type has three precedents in this gallery
I told Rod the vertical hero was effectively artwork-only, on the basis that ndt's title is an
image with no `writing-mode` anywhere in its CSS. That was true of ndt and wrong as a generalisation:

| site | `writing-mode` count |
|---|---|
| harumaki /ftr/ | 2 |
| TUYU | 6 |
| Sengoku Hanabi | 4 |

So real CSS vertical text is normal in this corpus, including inside the harumaki family itself.
The hero-tests caveat should be narrowed: ndt's *specific* lettering is artwork, but vertical type
as a device is well precedented and does not require an art asset.

### The image-vs-token split holds, and it tracks site TYPE
Japanese music / festival sites are image-composited; western studio and portfolio sites are
tokenised. It is not a quality difference, it is two different crafts.

| image-composited | img / painted | tokenised | custom props |
|---|---|---|---|
| Fumino | 128 / 33 | Miranda Sofroniou | 874 |
| Sengoku Hanabi | 113 / 30 | Jaime Kim | 251 |
| ZUTOMAYO | 99 / 37 | Kaito Note | 119 |
| TUYU | 33 / 12 | yannesidibe | 93 |
| Eve | 9 / 31 | dennissnellenberg | 23 |

**Do not misread Miranda Sofroniou's 874 properties or Jaime Kim's 251** - both are Wix builds
(`wix-madefor-text`, `helvetica-w01-roman`), so the token count is framework-generated boilerplate,
not authored design system. Counting it as intent would be a false lesson.

### Individually notable
- **chriskalafatis**: `fixed` x43, `transform` x221, `mix-blend-mode` x11, **zero tokens, one font**
  (`PP Telegraf`). Enormous motion built on almost no system.
- **dennissnellenberg**: `transform` x156, `transition` x50, GSAP + ScrollTrigger + Barba +
  Locomotive, and a bespoke face literally named `Dennis Sans`.
- **ZUTOMAYO**: the most systematic spacing found anywhere - big paddings at a strict 5px step,
  60/65/70/75/80/85/90/95/100/105.
- **Eve**: the largest single padding in the corpus, **460px**, alongside 251 and 307.
- **midnightsolarium**: `Comic Sans` + `Cozette` + `OpenDyslexic` together, on dithered PNG
  backgrounds. Deliberate indie-web font chaos, and it is B tier, so it works.
- **Unit**: 19KB CSS, zero images, zero SVG, zero tokens, `Inconsolata` only. The floor of the set.
- **Mike Klubnika**: 8KB CSS, 40 images. Nearly all content, nearly no styling.

### DEAD REFERENCE
**norikura-hanabi.com returns HTTP 404.** It is carried in the gallery as a B-tier card. The
capture is all that survives; the site is gone and cannot be re-sourced.

---

## C tier + untiered (26)

### The vertical-type correction gets stronger
Three more sites use CSS `writing-mode`: **Mateusz Urbanowicz** (2), **NEW SUSHISM** (2),
**cortiz.dev** (1). With ftr, TUYU and Sengoku Hanabi that is **six sites** in this gallery setting
real vertical type. ndt is the outlier for doing it as artwork, not the rule.

### Mineko's Night Market - worth a proper look, and it is not in a tier
1808KB of CSS, 1616 custom properties, `mask` x33, `mix-blend-mode` x18, `repeat-x` x5, 27 painted
assets. It is the most mechanically elaborate site in the entire gallery, and it is **untiered** -
nobody has judged it. Given Rod's own tagline is "a night market of tech-art experiments", a
festival-night-market game site sitting unranked in his own reference set is an odd gap.
[VERIFY] the 1616 token count before drawing lessons from it - at that scale it is probably
framework-generated, the same trap as the Wix sites in the B tier.

### Extremes worth keeping
- **Reol**: 55 painted assets, the most artwork of any site here, plus 43 inline SVG.
- **Avogado6**: 214 `<img>` tags, second only to harumaki main's 304.
- **harumaki /10/**: `repeat-y` x4 - the tiled vertical rule (`date_line.png`) confirmed again from
  a second direction, matching the dated-timeline component we built.
- **harumaki /gnep/**: 19 painted, 82 images. Same image-composited craft as the rest of the family.
- **Freya Holmér, Inigo Quilez, Cyanilux**: 5KB, 5KB and 13KB of CSS. The tech-art writers Rod is
  peers with run almost no styling at all. Worth weighing against the elaborate music sites.

### Failed, and why
| site | status |
|---|---|
| norikura-hanabi | **HTTP 404 - site is dead**, capture is all that survives |
| Shadertoy | HTTP 403, blocks automated fetch |
| Suzumon | fetch failed |
| LOWRYS FARM | fetch failed |
| stephanewillems, merodev | client-rendered; static read invalid, needs the CDP pass |

---

## Cross-tier tallies (updated each batch)

| Tier | done | image-composited | CSS/SVG-tokenised | needs CDP pass |
|---|---|---|---|---|
| S | 6/6 | harumaki main, ndt, ftr, dimden | hana, Unseen | - |
| A | 6/7 | thatskygame (clouds) | 109, Suisei, potg | stephanewillems, merodev |
| B | 16/17 | ZUTOMAYO, Fumino, Sengoku, TUYU, Eve, pomodorosa, Klubnika, midnightsolarium | Kaito Note, yannesidibe, chriskalafatis, dennissnellenberg, Unit, MinionsArt | Jaime Kim, Miranda (Wix) |
| C | 10/11 | Reol, Avogado6, Hello Tea | brittanychiang, Maxime Heckel, Cyanilux, Inigo Quilez, Freya, cortiz, TOKI | - |
| u | 14/15 | Mineko, gnep, /10/, Aimer, Alchemist, NEW SUSHISM | Filippo, SOLANI, terminal.shop, CINRA, Urbanowicz, melonking, whey, cinni | - |

**53 of 57 read. 4 blocked** (2 fetch failures, 1 dead site, 1 bot-blocked) **+ 2 SPA sites needing
the CDP pass** (counted as read but their numbers are not valid).

## ACTIONS THIS PASS GENERATED

1. **Narrow the vertical-type caveat** on `hero-tests.html`. Six sites use CSS `writing-mode`;
   only ndt's specific lettering is artwork. V2/V3 are more buildable than the panel currently says.
2. **Flag norikura-hanabi as a dead reference** in the gallery card.
3. **Do not cite** Miranda Sofroniou (874), Jaime Kim (251) or possibly Mineko (1616) as design-system
   evidence - framework boilerplate, not authorship.
4. **Tier Mineko's Night Market**, or decide to drop it. It is the most elaborate site in the set
   and nobody has ranked it.
5. **The asset-density finding** (harumaki main: 304 images, 0 tokens) is the one that actually
   changes the redesign's direction. It is a Rod decision, not a build task.
