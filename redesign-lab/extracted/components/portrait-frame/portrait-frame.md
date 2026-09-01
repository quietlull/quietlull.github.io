# portrait-frame - the ABOUT rail portrait, three frames

Built 2026-08-23. Files: `portrait-frame.css`, `portrait-frame.html`, this note.

---

## The box, and where every number came from

Reservation given: **191 x 200, inside a 225px rail**
(`analysis/2026-08-23-blockout-contract.md:39`).

Re-derived from the blockout itself so it is not taken on trust:

| number | file:line | value |
|---|---|---|
| rail width | `about-blockout.html:40` | `body.panels .rail{width:225px}` |
| panel chrome | `about-blockout.html:41` | `border:2px solid; padding:10px 15px` |
| portrait height | `about-blockout.html:170` | `box(200, 'PORTRAIT - 225px rail')` |

225 - (2 x 2 border) - (2 x 15 padding) = **191**. That is where the 191 comes from, and it is
arithmetic on two read values, not a rounding.

**FIT: all three versions fit exactly. 0px over on both axes, no overflow in either direction.**
Measured on the served page at `http://localhost:4000/redesign-lab/extracted/index.html?c=portrait-frame`
with `getBoundingClientRect()` and `scrollWidth - clientWidth`:

| version | outer box | reservation | image cell | caption | overflow x / y |
|---|---|---|---|---|---|
| V1 no frame | 191 x 200 | 191 x 200 | **191 x 173.81** | 191 x 18.19 + 8 margin | 0 / 0 |
| V2 brackets | 191 x 200 | 191 x 200 | **161 x 143.81** | 161 x 18.19 + 8 margin | 0 / 0 |
| V3 window | 191 x 200 | 191 x 200 | **187 x 164** | none | 0 / 0 |

The fit is exact **by construction**, not by luck: `.pf` is `width:191px; height:200px;
box-sizing:border-box` and every version lays out inside that with a `1fr` row, so a longer
caption shrinks the image rather than bursting the box.

Also measured, to confirm the colour and shape laws rather than assert them: bracket line
`rgba(251,191,36,.26)` at 1px (the gold hairline), window borders `rgba(255,255,255,.1)` outer and
`rgba(255,255,255,.06)` inner, both radii **0px**, bar fill `rgba(28,26,24,.55)`, body fill
transparent, caption `rgb(163,161,157)` = `#a3a19d`. Across all 20 elements: **zero**
`backdrop-filter`, `filter`, `transition` or `animation`. No blue anywhere, `--color-muted` is not
referenced.

---

## Existing work checked first

**`extracted/components/picture-frame/` does NOT fit, and nothing from it was rebuilt.**
It is 109ichiki's OUTER frame: `position:fixed; inset:20px; z-index:45; pointer-events:none` plus
`box-shadow: 0 0 0 100vmax var(--color-night)` as the mask (`picture-frame.css:22-31`). It rings
the **viewport**. Making it frame a 191px image in a rail means deleting `fixed`, `inset`, the
z-index, `pointer-events`, the 100vmax mask and the `border-radius:8px` - which is every
declaration it has. That is a rewrite, so it is left alone.

**`extracted/components/figure-real/` IS reused, and this is real reuse, not a claim.**
V1 and V2 are `.fig fig--v2` elements. The caption (0.875em, italic, left, 0.5rem top margin,
silver) comes entirely from `figure-real.css` and is **not redefined** in this component. The only
caption declaration added here is `line-height: 1.3` - see "one derived number" below.

**The figure decision is not contradicted.** decisions.css:342-361 settles figures as
catlikecoding geometry, no mat, no border, no fill, left caption. A portrait is a figure, so **V1
is that decision applied to this box** rather than a new idea. V2 and V3 both add chrome, which
the figure decision explicitly does not have. They are offered as alternatives *because a rail
portrait is arguably a different object from an in-body figure*, and that is Rod's call, not mine.
If the answer is "a portrait is just a figure", V1 wins and V2/V3 are the discards.

---

## V1 - no frame

- **Tier: Remixed.** Inherited from figure-real: six declarations transcribed from catlikecoding's
  `tutorials.css`, one inverted (`text-align`).
- **Idea-origin: theirs (catlikecoding) + ROD** (the left-aligned caption is his change).
- **Verbatim:** the whole figure geometry, via figure-real. Nothing restated.
- **Ours:** `margin:0` (cancels figure-real's `margin: 2em auto`, which is prose-column rhythm and
  would push the component out of its own reservation), the 191 x 200 box, and the pinned caption
  line-height.
- **Could not transfer: the intrinsic-size premise.** catlikecoding's entire figure idea is that a
  320px screenshot renders at 320px. A fixed 191 x 200 hole cannot honour an intrinsic size, so
  `object-fit: cover` decides what gets cut. **The image will be cropped.** That is forced by the
  reservation, not chosen, and it is the single largest departure in this component.

## V2 - corner brackets

- **Source:** filipporuffini.com,
  `https://cdn.prod.website-files.com/643d4a3e40f13a5d541373e9/css/filippo-ruffini.webflow.98e69a3e9.css`
- **PREMISE RE-VERIFIED LIVE 2026-08-23**, not taken on the saved note's word. Every rule quoted
  in `sources/filipporuffini-corner-brackets.md` that lives in that sheet matches the served file,
  and `--grey-tertiary:#333` / `--grey-secondary:#777` are confirmed.
  **One discrepancy, and it improved the provenance rather than breaking it:** the live main sheet
  contains **no** `.corners__top::before` pseudo-element rules and **no**
  `--corners-large / --corners-small / --corner-style` properties. The saved note says so itself -
  that half lives in an inline `<style>` / `.custom-corners.w-embed` block on the page, which the
  fetch could not read. So this build uses the half I verified myself: their four-div variant
  (`.p-corners` / `.p-corner.is--tl|tr|br|bl`), which hard-codes `1px solid var(--grey-tertiary)`
  and depends on none of the unverified variables.
- **Tier: Remixed.** **Idea-origin: theirs.**
- **Verbatim:** the elbow mechanism (a square box painting exactly two adjacent borders, no
  background, pinned flush into a corner of a positioned parent), the four `is--tl/tr/br/bl` inset
  patterns, the `.p-corners` absolute inset-0 overlay, the **2.5rem** arm, the 1px stroke, and
  `.corners`'s **`padding: .9375rem`**.
- **Ours (the remix):** `.corners`'s padding and `.p-corner`'s arms are two different rules from
  the same stylesheet, composed here. Their own DOM pairs `.corners` with the pseudo-element
  variant instead. Also ours: the colour map.
- **Why 2.5rem and not their big arm, decided by arithmetic and not taste:** `--corners-large` is
  6.25rem = 100px. On a 191-wide box the top-left and top-right arms would want 200px and
  **overlap by 9px**; on the 200-tall box they would meet exactly. `.p-corner`'s 2.5rem = 40px
  leaves a **measured 111px gap across the top and 120px down the side** (bracket rects read at
  x 358/509 and y 203.4/363.4), so the elbows still read as elbows.
- **Colour:** their `1px solid #333` on `#101010` is a deliberately quiet neutral. Mapped to
  `--color-line` (gold hairline). The source note's own de-glow paragraph recommends "a dim ember
  tone" for this palette, so the warm direction is theirs too.
- **Could not transfer / not carried, both stated rather than dropped in silence:**
  - their `.cursor-corners` hover-grow (arms 0.5rem -> 1rem on `.is--hovering`). That is their
    **cursor** behaviour, not their frame behaviour. Putting it on a portrait would be inventing an
    interaction and citing a different element for it.
  - their `<=768px` arm shrink. There is no **measured** mobile reservation for this slot, so a
    breakpoint here would be a guess about a box nobody has drawn.

## V3 - named window

- **Source:** 109ichiki.com, `https://109ichiki.com/_astro/style.COBHKi4A.css`
- **PREMISE RE-VERIFIED LIVE 2026-08-23.** Every declaration in
  `sources/109ichiki-dialog-window.md` matches the served file. The re-fetch also **closed a gap
  the note left open**: the note records the title as `font-size: var(--font-size-base-en)` without
  its value. It is **`.9375rem` (15px)**, now used verbatim instead of a number I would otherwise
  have had to pick. Worth folding back into that source note.
- **Tier: Remixed.** **Idea-origin: theirs** - and Rod named 109ichiki's popup windows himself
  (D15, again in P64), so the register is one he already chose.
- **Verbatim:** the double border, `grid-template-rows: 2rem 1fr`, the header's
  `display:flex; align-items:center; justify-content:space-between; padding: 0 .5rem 1px .625rem`
  and its 1px bottom rule, the title's `.9375rem` + `padding-bottom:1px` + `pointer-events:none`,
  and the body's `position:relative; height:100%; overflow:hidden; contain:paint`.
- **The grid row is the point**, per the source note: `2rem 1fr` means the bar takes its height and
  the body takes the rest at any size, with no second number to keep in sync. Measured: bar
  **187 x 32**, body **187 x 164**, and 200 - 2 - 2 - 32 = 164 checks out.
- **Four departures, all deliberate:**
  1. **Radius squared.** Theirs is `.1875rem` outer and `2px` inner; both are 0 here, per the shape
     pass (D20) - the same squaring decisions.css already applies to `.kit-button` and inline code.
  2. **Their page is light, ours is dark.** Their `--color-border` is a near-black on a white
     `--color-bg`, and their inner border is `#fff` on that same white: the outer line **reads**,
     the inner line **whispers**. That relationship is what transfers, not the values - outer takes
     `--color-line-soft`, inner takes `--color-line-faint`.
  3. **No solid ground.** Their header and body both take `--color-bg`, which is their page ground.
     Ours is a live three.js scene, so copying that paints a fake ground over a real one. The bar
     takes `--color-panel` (the house translucent panel, the same token `.d-relcard` and
     `.d-callout` use) and the body takes no fill - the image is the fill.
  4. **No close button.** Theirs is a real control on a real dismissible dialog, with a genuinely
     clever 2x invisible hit area. A portrait pinned in an About rail cannot be closed, so an X
     would be an affordance that lies. Dropped rather than drawn as decoration.
- **Not carried:** `cursor: grab` / `:active grabbing` (nothing drags in a fixed 225px rail), and
  `[data-blink=true] { animation: blinking .1s step-end infinite }`, a 10Hz flash that exceeds
  STYLE.md Section J's 3/sec cap. The source note flags that one itself.
- **Ours:** the title's `min-width:0; overflow:hidden; white-space:nowrap; text-overflow:ellipsis`.
  Usable title width is 191 - 2 - 2 - 10 - 8 = **169px**; their windows are 280-340 wide so they
  never needed it. "Rod" measures 25.58px, so it is a guard, not a crutch.
- **No caption, and that is the version's argument:** the bar already names the subject, so a
  caption underneath says it twice. It also buys the image back 26.19px, giving V3 the largest
  image of the three.

---

## One derived number, flagged as derived

`.fig.pf figcaption { line-height: 1.3 }` is **ours**. Neither catlikecoding nor figure-real sets a
figcaption line-height, and with `normal` the caption block height is font-dependent, which makes
the image cell height a number nobody can state. 1.3 is the house body line-height
(`decisions.css:198`, `.prose p, .prose li`). Measured result: caption 18.19px + 8px margin =
**26.19px**, which is where V1's 173.81 and V2's 143.81 come from.

## Content

Real, from Rod's own files. Caption "Rod, technical artist" is his own line from
`tech-art/about.md` ("I'm a technical artist focused on bridging the gap between art and
engineering"), compressed to a caption. Window title "Rod" is from `final-about.html:389`
("Hey There, I'm Rod"). Their window title is a filename (`meme.webp`); naming a portrait file
here would be inventing an asset that does not exist, so the window is named for the person.

## Motion

**Nothing in this component animates or transitions** - verified, 0 of 20 elements carry a
`transition`, `animation`, `filter` or `backdrop-filter`. There is deliberately no
`prefers-reduced-motion` block, because an empty guard is bloat under D5. If Rod wants the portrait
to do something, that is a new pass with a new source.

---

## OPEN QUESTIONS FOR ROD

1. **Is there a portrait at all?** This is the biggest one and it is already on record
   (`analysis/subpage-specs/synth-about.md`, open question 2). `_sass/layout/_aboutmecontainer.scss`
   has `.profile-container { flex: 0 0 300px; &:empty { display:none } }`, so the slot **collapses
   today**, and a repo-wide search finds **no portrait image of any kind**. The media slot here
   says "no portrait asset" in words rather than borrowing a face. If you are not putting a picture
   of yourself on the site, this whole component comes out and the rail gets 200px shorter.

2. **Is a rail portrait a figure, or an object?** V1 says figure (the decision you already locked).
   V2 and V3 say object. I did not assume the decision extends from an in-body post figure to a
   225px About rail, because I do not think that is mine to assume.

3. **Does the rail portrait want a caption at all?** V1 and V2 carry one because the figure
   decision has one. Dropping it gives the image back 26.19px in both. V3 already has none.

4. **The crop.** A fixed 191 x 200 means the photo gets cut by `object-fit: cover`. If the portrait
   is a specific composition, either the reservation moves or the crop needs an
   `object-position`. I did not invent one.

5. **V2's bracket colour.** I used the gold hairline `--color-line` because the source note's own
   de-glow paragraph recommends an ember tone. `--color-line-soft` (neutral white 10%) is the
   quieter option and is what V3's window chrome uses. One line to switch.

---

# Appendix: reasoning moved out of the stylesheet, 2026-08-25

Moved from `_sass/components/_portrait-frame.scss` under D45 (comments get short). Original
wording, kept because it is the provenance record. The stylesheet points here.

## The box is a measurement, not a choice

> Reservation: 191 x 200, inside the 225px rail of about-blockout.html (body.panels .rail).
> Where 191 comes from, so nobody re-derives it wrong later: the rail is 225px
> (about-blockout.html:40) and the portrait sits inside a `.p` panel that is
> `border:2px solid; padding:10px 15px` (about-blockout.html:41). 225 - (2 x 2) - (2 x 15) = 191.
> The 200 is the box() call at about-blockout.html:170. Both were confirmed against the rendered
> page in analysis/2026-08-23-blockout-contract.md line 39.
> So `.pf` is `width:191px; height:200px; box-sizing:border-box` and the fit is exact BY
> CONSTRUCTION on both axes, in all three versions. Nothing here can overflow the reservation.

## What was checked first, and why it was not reused

> extracted/components/picture-frame/ does NOT fit and is not rebuilt here. It is 109ichiki's
> OUTER frame: `position:fixed; inset:20px; z-index:45; pointer-events:none` plus a
> `box-shadow: 0 0 0 100vmax` mask (picture-frame.css:22-31). It rings the VIEWPORT. To make it
> frame a 191px image in a rail every one of those declarations has to go, plus its
> `border-radius:8px` is the opposite of the shape pass. That is a rewrite, not a reuse.

## What is reused, genuinely

> V1 and V2 are `.fig` elements. The caption comes from
> extracted/components/figure-real/figure-real.css and is NOT redefined here - one definition,
> several consumers. A portrait IS a figure and the figure decision (catlikecoding geometry, no
> mat, no border, no fill, LEFT caption) is already made, so V1 is that decision applied to this
> box rather than a new idea. Overrides below use `.fig.pf` (0,2,0) rather than `.pf` (0,1,0) so
> they beat figure-real's single-class rules WITHOUT depending on stylesheet load order.
> The demo also carries figure-real's own `fig--v2` modifier, which is the SILVER caption - the
> one decisions.css:358 ships. figure-real deliberately left "how far the caption recedes" open
> (its v1 is the faithful catlikecoding reading, where the caption is body colour in BOTH their
> themes). That question is still open and is not re-decided here; this component just follows
> what ships, and follows it by reusing their modifier rather than restating a colour.

## Palette, motion, and the missing image

> No red, no cool accent, no --color-muted. Warm tokens only, every one with a literal fallback.
> No backdrop-filter and no blur anywhere - the live scene sits behind this rail.
> Square everywhere. The two source radii (109ichiki's .1875rem and 2px) are deliberately
> flattened to 0; see V3.

> NOTHING IN THIS FILE ANIMATES OR TRANSITIONS. There is no prefers-reduced-motion block because
> there is nothing to reduce, and an empty guard is bloat. Two motions were available in the
> sources and both were dropped on purpose - see V2 and V3.

> THE IMAGE DOES NOT EXIST. `_sass/layout/_aboutmecontainer.scss` has `.profile-container` at
> `flex:0 0 300px` with `&:empty{display:none}`, so the slot collapses today, and a search of the
> repo turns up no portrait asset. `.pf__media--empty` is the honest stand-in and says so in
> words. The moment a real <img class="pf__media"> exists it drops straight in.

## The shared parts

> `position:relative` is load-bearing for V2 only (it is the containing block the four corner
> divs pin to), but it costs nothing on the other two so it lives here rather than being
> repeated.

> The media fills its cell and CROPS. This is a real departure and it is forced by the fixed
> reservation: catlikecoding's whole figure premise is that an image renders at its intrinsic
> size, and figure-real.css carries that as `height:auto`. A 191 x 200 hole cannot honour an
> intrinsic size, so `object-fit:cover` decides what gets cut. Selector is (0,2,0) so it beats
> figure-real's `.fig > img` at (0,1,1) without an !important and without a load-order rule.

> The caption is figure-real's and is not restated. ONE declaration is added: a pinned
> line-height, because with `normal` the caption block height is font-dependent and the image
> cell height stops being a number anyone can state. 1.3 is the house body line-height
> (decisions.css:198, `.prose p, .prose li`). OURS, and a derivation rather than a source value.
> At 0.875em of a 16px root that makes the caption block 8px margin + 18.2px line = 26.2px.

## V1 - no frame

> The figure decision, applied.
> SOURCE: catlikecoding tutorials.css, via extracted/components/figure-real/ and
> decisions.css:342-361 (FIGURES - PICKED B, catlikecoding, left caption - Rod 2026-08-23).
> TIER: Remixed. IDEA-ORIGIN: theirs (geometry, italic caption device) + ROD (left align).
> Nothing new is invented; this is the settled decision sized to the measured box.
>
> `margin:0` cancels figure-real's `margin: 2em auto`. That margin is the rhythm between figures
> in a prose column; in a rail slot the panel above owns the spacing, and 2em would push the
> component out of its own reservation.
>
> MEASURES: caption block 26.2px, so the image cell is 191 x 173.8.

## V2 - corner brackets

> A frame that is not a box.
> SOURCE: filipporuffini.com, main Webflow sheet
>   https://cdn.prod.website-files.com/643d4a3e40f13a5d541373e9/css/filippo-ruffini.webflow.98e69a3e9.css
> PREMISE RE-VERIFIED LIVE 2026-08-23 against that URL, not taken on the saved note's word. The
> note at sources/filipporuffini-corner-brackets.md matches the live file on every rule quoted
> below, and `--grey-tertiary:#333` / `--grey-secondary:#777` are confirmed.
> ONE THING THE RE-FETCH CHANGES, and it improved the provenance rather than breaking it: the
> live main sheet contains NO `.corners__top::before` pseudo-element rules and NO
> `--corners-large / --corners-small / --corner-style` properties. The note says so itself - that
> half lives in an inline <style> / `.custom-corners.w-embed` block on the page, which this fetch
> could not read. So this build uses the half I could verify myself: their FOUR-DIV variant
> (`.p-corners` / `.p-corner.is--tl|tr|br|bl`), which hard-codes `1px solid var(--grey-tertiary)`
> and needs none of the unverified variables.
>
> TIER: Remixed. IDEA-ORIGIN: theirs.
> VERBATIM: the elbow mechanism (a square box painting exactly two adjacent borders, no
> background, pinned flush into a corner of a positioned parent), the four `is--tl/tr/br/bl`
> inset patterns, the `.p-corners` absolute inset-0 overlay, the 2.5rem arm, the 1px stroke, and
> `.corners`'s `padding: .9375rem`.
> REMIX: `.corners`'s padding and `.p-corner`'s arms are two different rules from the same
> stylesheet, composed here. Their own DOM pairs `.corners` with the pseudo-element variant.
>
> WHY 2.5rem AND NOT THEIR BIG ARM: `--corners-large` is 6.25rem = 100px. On a 191 wide box the
> top-left and top-right arms would need 200px and OVERLAP by 9px, and on the 200 tall box they
> would meet exactly. `.p-corner`'s 2.5rem = 40px leaves a 111px gap across the top and 120px
> down the side, so the elbows still read as elbows. The value is theirs; only the choice between
> their sizes is ours, and it was made by arithmetic, not taste.
>
> COLOUR: their `1px solid #333` is a deliberately quiet neutral on `#101010`. Mapped to
> `--color-line` (the gold hairline, rgba(251,191,36,.26)) - the source note's own de-glow
> paragraph recommends "a dim ember tone" for this palette, so the warm map is theirs too.
>
> NOT CARRIED, both stated rather than silently dropped:
>   - their `.cursor-corners` hover-grow (arms expand 0.5rem -> 1rem on `.is--hovering`). That is
>     their CURSOR behaviour, not their picture-frame behaviour. Putting it on a portrait would
>     be inventing an interaction and citing a different element for it.
>   - their `<=768px` arm shrink (--corners-large 6.25 -> 3.75rem). There is no MEASURED mobile
>     reservation for this slot, so a breakpoint here would be a guess about a box nobody has
>     drawn yet.
>
> MEASURES: padding 15px all round leaves 161 x 170; caption block 26.2px; image cell 161 x 143.8.

> their .p-corners - the overlay is the full box, so the brackets sit on the OUTER edges while
> the media stays inset by the padding above. `inset:0` resolves to the padding box of `.pf`,
> which has no border, so it is exactly 191 x 200.

## V3 - named window (the one Rod picked)

> The portrait as an object with a title bar.
> SOURCE: 109ichiki.com, https://109ichiki.com/_astro/style.COBHKi4A.css
> PREMISE RE-VERIFIED LIVE 2026-08-23. Every declaration in sources/109ichiki-dialog-window.md
> matches the served file. The re-fetch also CLOSED A GAP the note left open: the note records
> `font-size: var(--font-size-base-en)` without its value. It is `.9375rem` (15px), and that is
> used verbatim below instead of a number I would otherwise have had to choose.
>
> TIER: Remixed. IDEA-ORIGIN: theirs (Rod named 109ichiki's popup windows himself in D15/P64).
> VERBATIM: the double border, `grid-template-rows: 2rem 1fr`, the header's
> `display:flex; align-items:center; justify-content:space-between; padding: 0 .5rem 1px .625rem`
> plus its 1px bottom rule, the title's `.9375rem` and `padding-bottom:1px` and
> `pointer-events:none`, and the body's `position:relative; height:100%; overflow:hidden;
> contain:paint`.
>
> THE GRID ROW IS THE POINT, per the source note: `2rem 1fr` means the bar takes its height and
> the body takes the rest at any window size, with no padding number to keep in sync. zutomayo
> does the same job with an absolute bar plus a matching padding-top - two numbers that can drift.
>
> FOUR DEPARTURES, all stated:
>   1. RADIUS SQUARED. Theirs is `.1875rem` outer and `2px` inner. Zero here, per the shape pass
>      (D20) - the same squaring decisions.css already applies to .kit-button and inline code.
>   2. THEIR PAGE IS LIGHT, OURS IS DARK. Their `--color-border` is a near-black on a white
>      `--color-bg`, and their inner border is `#fff` on that same white - so the outer line
>      READS and the inner line WHISPERS. That RELATIONSHIP is what transfers, not the values:
>      outer takes --color-line-soft, inner takes --color-line-faint.
>   3. NO SOLID GROUND. Their header and body both take `--color-bg`, which is their page ground.
>      Ours is a live three.js scene, so copying that would paint a fake ground over a real one.
>      The bar takes --color-panel (the house translucent panel, same token .d-relcard and
>      .d-callout use) and the body takes no fill at all - the image is the fill.
>   4. NO CLOSE BUTTON. Theirs is a real control on a real dismissible dialog, with a genuinely
>      good 2x invisible hit area. A portrait pinned in an About rail cannot be closed, so the X
>      would be an affordance that lies. Dropped rather than drawn as decoration.
>
> ALSO NOT CARRIED: `cursor: grab` / `:active grabbing` (nothing drags in a fixed 225px rail),
> and `[data-blink=true] { animation: blinking .1s step-end infinite }`, which is a 10Hz flash
> and exceeds STYLE.md Section J's 3/sec cap. The source note flags that one itself.
>
> NO CAPTION HERE, and that is the version's whole argument: the title bar already names the
> subject, so a caption underneath would say it twice. That also buys the image 26.2px back.
>
> MEASURES: 200 - 2 (outer borders) - 2 (inner borders) - 32 (the 2rem bar) = image cell
> 187 x 164 - the largest image of the three.

> OURS. The usable title width is 191 - 2 - 2 - 10 - 8 = 169px. Their windows are 280-340 wide
> so they never needed this; at 169px a longer name has to end somewhere chosen rather than
> wherever the box happens to cut.

## Rod picked V3, 2026-08-23, with the favicon standing in

> Rod: "portrait should just be named window use my fav icon for now I need to make an image at
> some point."
>
> So the FRAME is decided and the CONTENT is explicitly a placeholder. Those are two different
> states and the component says so rather than letting a stand-in quietly become the design.
>
> THE FAVICON IS AN APPROVED COMPONENT, not a new asset: extracted/components/favicon/, and it is
> one of the very few things already approved on final-landing. Reusing it costs nothing and adds
> no sourcing debt - which is exactly why it is the right stand-in.
>
> THE WINDOW comes from the portal's own dialog frame (109ichiki), which Rod approved for the
> portal on 2026-08-23. Reusing it here means the portrait speaks the same language as the portal
> windows rather than inventing a second frame vocabulary for one image.
>
> MARKED AS PROVISIONAL IN THE MARKUP, not just in a comment: `data-placeholder="true"` on the
> image, so anything auditing the page can see the portrait is not final. A stand-in that looks
> finished is how a placeholder ships by accident.

### The favicon fills the window - a superseded call, and the reason

The stylesheet used to carry both sides of this, the old note and its correction, stacked:

> the favicon sits at a size that reads as a mark, not as a portrait - deliberately, so it cannot
> be mistaken for the real image.

> THE FAVICON FILLS THE WINDOW. Rod 2026-08-24: "make fav icon same size as the window".
> The comment that used to sit above this said the favicon should read "as a mark, not as a
> portrait - deliberately, so it cannot be mistaken for the real image", and pinned it to 64px in
> a 221x164 hole. Rod has now asked for the opposite, and the later call wins: the stand-in should
> occupy the frame the real portrait will occupy, so the composition he is judging is the one that
> ships. It stays marked provisional by `data-placeholder="true"`, which is what actually stops it
> shipping by accident - the small size was never the safeguard.
> A first pass read "match the size" as matching the TOP BAR's chip-to-mark ratio and set 40px in
> a 64px chip. Wrong reading, corrected here.
> The mark keeps that 0.625 against the window's SHORT side, so it scales with the frame instead
> of being a second number to maintain. `width:auto` because the source viewBox is 520x546, very
> slightly taller than square - forcing both axes would squash it.

## Still open, and it is Rod's

> the real portrait image does not exist yet. He said "I need to make an image at some point."
> Until it does, this component is FRAME-APPROVED and CONTENT-PENDING, and the two should not be
> conflated when the slot is marked on final-about.
