# callout-family — provenance

Built 2026-08-23. Three versions of the **box** under the washi tape. The tape itself is decided
and is not re-judged here.

**Reference brief:** [`analysis/reference-briefs/callout-family-the-box-under-the-tape.md`](../../../analysis/reference-briefs/callout-family-the-box-under-the-tape.md)
— every source re-fetched and byte-checked live rather than trusted from the saved notes.

---

## The headline, and it needs saying plainly

**The stated source does not cover this component.** `gneiss-washi-tape.md` and
`serrated-edge-css.md` are both about the *tape*. All six gneiss stylesheets were grepped for
`callout|notice|warning|admonition|aside` and returned **zero hits** — gneiss.place has no callout
system at all. Its only prose device in that family is a bare `blockquote`.

So the tape is fully sourced, **the box is not**, and neither is the five-way differentiation.
Nothing was substituted silently: each version below names the real site it comes from.

---

## The three versions

| | source | tier | idea-origin | the idea |
|---|---|---|---|---|
| **V1** | flamedfury.com `aside` | Remixed | theirs | One shell; the variant changes exactly one thing. Hard 3px offset shadow, zero blur. |
| **V2** | catlikecoding.com `aside` | Remixed | theirs | The box is **one notch smaller than prose** (14px vs 16px), so a run reads as a quiet rail. **No shadow at all.** |
| **V3** | gneiss `.box` + `.polaroid` | Remixed | theirs | The tape's actual partner box — asymmetric `1rem 1rem 3rem` padding. Warm blurred shadow. |

**They differ on the thing that is genuinely open:** how loud the box is, and whether its shadow
blurs. V1 and V3 are deliberately opposite on the shadow so the scene cost is visible.

**Why V1 is structurally strongest:** the tape already differentiates the categories. A box that
also differentiated would say the same thing twice. flamedfury's `aside` changes only the icon
between roles, which is exactly that property.

---

## Two categories that refuse a box, and are drawn that way

**`reference / links` — no tape, no box.** stripe's `additionalResourcesList`: hairline `.5px`
bottom rules, an **8px hard square** marker, `list-style:none`, 12px row padding. No card, no
border, no fill. Rod decided "no tape"; the source goes one further and says no box either. **The
cleanest sourced answer in the set.**

**`quote` — three independent sources refuse a box.**

- **maxime** — no bar, no rule, no glyph, *no background*. Typographic contrast plus a width break.
- **stripe** — has a `blockquote` rule but it is **rejected on usage**: zero `<blockquote>` elements
  across four fetched articles. Dead CSS, not a used device.
- **gneiss** — the tape's *own site* also refuses a box: left rule, italic, display face.

**So `quote + card + L-corner tape` has no source.** It is tiered **Slop, idea-origin Claude**, and
exists only because tape C needs corners to sit on. `.co-quote--boxless` is the sourced alternative
and is drawn beside it in every version so the two can be compared honestly. **This is the one
thing in the family worth reconsidering.**

---

## Corrections this build carries

1. **Rotation was 10× too big.** `.taped` shipped `-0.5deg`; gneiss's real value is `-0.05deg`
   (`.content-panel` in `index.css`, matching the inline `style="rotate: 0.05deg"` on their markup).
   Corrected. On a 700px card that is a 0.61px corner lift instead of 6.11px — **the card
   effectively stops looking tilted**, which is what theirs does.
2. **The shadow placeholder is retired.** `.taped` carried `rgba(0,0,0,.45)` with a comment saying
   it "becomes `rgba(88,70,48,.5)` when colour lands". Colour has landed; the real gneiss value is
   verified and used.
3. **`.taped` brings a shadow with it** — caught by measuring, not reading. V2 was silently
   inheriting it, which would have erased the one thing distinguishing V2 from V3. Cancelled
   explicitly. **Any box wanting a different shadow, or none, must say so.**

---

## Not taken, and why

| | why |
|---|---|
| gneiss `.glassine-overlay-box` | `backdrop-filter: blur(2px)` — the glass tell, being stripped site-wide. It sits in the same file as the rules that *are* taken. |
| flamedfury's orb `aside::before` | Punches a circle filled with the *page background*. Needs an opaque page; ours is 55% translucent over a live scene, so it reads as a disc, not a hole. Superseded by the tape system anyway. |
| cyanilux `.notice` gutter | Its `.notice-left` has **no width declaration** — the 48px is the chip's `min-width` plus margins. Drop the chip and the gutter collapses to nothing. A chipless gutter would need a width, and that width would be **ours**. Also its 45° hatch is the same mechanism as the tape's stripe at a different scale, so it would read as one object repeated. |
| catlikecoding's disclosure behaviour | A callout that hides its own content is a different device from the one Rod decided. |
| cyanilux `#00aabb` chip | Cool UI accent. |
| gneiss `--accent-red #a83c32` | No red. |
| acegikmo-style semantic cell colours | Four colours; palette law bans red and cool. |

---

## Palette and scene corrections applied to all three

flamedfury `#999` → `--color-silver`. catlikecoding `#ddd`/`#ccc` and its dark `#444`/`#555` →
`--color-panel` (their `#444` is an **opaque fill that would kill the scene**). gneiss
`--bg-paper`/`--ink-primary` → our night tokens. All radii → `0`.

**Square is a transcription for two of the three.** flamedfury's `border-radius:
var(--border-radius)` references a token defined **zero times** in their file, so their aside
renders square; catlikecoding is square already.

---

## The blue is an exception on the tape only

The palette law bans cool accents outside the sky. Rod approved the blue L directly, so it stands
**on the tape object**. It must not migrate to a box border, box text, or a chip.

---

## Open for Rod

1. **Which version** — V1 (structurally strongest), V2 (quietest in a run), V3 (the tape's real partner).
2. **Shadow** — hard offset (scene-safe) vs warm blur (truer to gneiss, smears the scene). V1 and V3 show both.
3. **The quote.** No source for a boxed one, no home in the best-developed post, and it had to be bent to exist. **Worth deciding whether it survives.**
4. **Green `#6fbf73`** is still the one tape colour with no external reference, and it now carries `note`. Origin ROD, which is legitimate — flagged only because it is the most-used category.
5. **`.5px` hairlines on the reference list render as 1px** on non-retina displays. Stripe's sub-pixel rule is a real device; at 1px it is double weight. Browser limitation, not a bug — but worth knowing.

---

# Appendix: reasoning moved out of the stylesheet, 2026-08-25

Moved from `_sass/components/_callout-family.scss` under D45 (comments get short). Original
wording, kept because it is the provenance record. The stylesheet points here.

## Read this first: the stated source does not cover this component

> callout-family - the BOX under the washi tape. THREE VERSIONS for Rod to pick between.
> Built 2026-08-23 from the reference brief at
> analysis/reference-briefs/callout-family-the-box-under-the-tape.md, which re-verified every
> source live rather than trusting the saved notes.
>
> The tape is fully sourced (gneiss `.taped` + winterwind's tear). THE BOX IS NOT, and neither is
> the five-way differentiation. gneiss.place has NO callout system at all - all six of its
> stylesheets were grepped for callout|notice|warning|admonition|aside and returned ZERO hits.
> Its only prose device in that family is a bare blockquote.
>
> So this file does not pretend gneiss is the parent. Each version below names the real site it
> comes from, and all four were re-fetched and byte-checked this session.

## What the tape already decides, so the box does not have to

> The tape is the differentiator: warning = D corners/pink, note = A top/green, tldr = B left/
> orange, quote = C L-corners/blue, reference = none. That is why the strongest box answer is the
> one that differs LEAST between categories - flamedfury's, where the variant changes exactly one
> thing. A box that also differentiates would be saying the same thing twice.

## Geometry contract, inherited from washi-tape and NOT redefined here

> --tape-w 26px, --tape-bite 7px (top override 16px). Host width
> calc(100% - 2 * (tape-w - tape-bite)) with margin-left 19px. Host needs position:relative and
> MUST NOT set overflow:hidden - every placement overhangs. The colour class goes on the HOST,
> never on .tape: .tape declares --tape-hue only as a var() fallback so the host value inherits,
> and setting it on .tape renders grey.

## Palette and scene corrections applied to every version

> cyanilux #00aabb chip -> dropped (cool UI accent). flamedfury #999 -> --color-silver.
> catlikecoding #ddd/#ccc and .dark #444/#555 -> --color-panel (their #444 is an OPAQUE fill that
> would kill the scene). gneiss --bg-paper/--ink-primary -> our night tokens. gneiss --accent-red
> -> --color-silver. All radii -> 0 (square by default; catlikecoding and flamedfury are already
> square, so for those two it is a transcription, not a deviation).
> NOT TAKEN: gneiss .glassine-overlay-box, which carries backdrop-filter: blur(2px) and sits in
> the same file as the rules that ARE taken.

## The blue is an exception on the tape only

> The palette law bans cool accents outside the sky. Rod approved the blue L directly, so it
> stands ON THE TAPE OBJECT. It must NOT migrate to a box border, box text or a chip. Stated here
> so the next agent does not read the exception as a licence.

## The shared shell and the label

> Everything all three versions agree on. Kept separate so the versions differ only where they
> genuinely differ.

> The category LABEL. Free-form text, not a fixed severity set - maxime's pattern, though his
> own straddling tab is deliberately NOT copied because it is structurally the same move as tape
> on an edge and would read as the device repeated.

## Version 1 - one shell, the variant changes one thing

> SOURCE: flamedfury.com, z2Ai70SrDv.css (103,170 bytes), re-fetched and byte-matched.
> TIER: Remixed. Idea-origin: theirs for the structure, ROD for the tape system it serves.
>
> Their `aside` is ONE box; the role class (note/warning/tip/skateboard) changes ONLY the icon.
> That is exactly the property this system needs, because the tape is already carrying the
> difference. Rod also picked this device once before, on 2026-08-22, for its orb.
>
> VERBATIM, with our tokens substituted:
>   --border-width: 0.2rem; border: var(--border-width) solid #999;
>   padding-inline: var(--space-s-m); padding-block: var(--space-s-m);
>   margin-block: var(--space-m-l); position: relative;
>
> THEIR SPACING SCALE, taken as-is because it is what makes the box feel theirs:
>   --space-s-m:  clamp(0.625rem,  0.41rem + 1.06vw, 1.3125rem)
>   --space-m-l:  clamp(0.875rem,  0.55rem + 1.63vw, 1.9375rem)
>
> SQUARE IS A TRANSCRIPTION HERE, NOT A DEVIATION. Their rule says
> `border-radius: var(--border-radius)` and that bare token is defined ZERO times in their file -
> only --border-radius-medium and -small exist. It resolves to nothing and their aside renders
> square. Confirmed live.
>
> THE ORB IS DELIBERATELY ABSENT. Their `aside::before` punches a circle through the border,
> filled with the page background. That trick needs an OPAQUE page; ours is 55% translucent over
> a live scene, so the punch reads as a disc rather than a hole. Rod superseded it with the tape
> system anyway. Not carried.

> HARD offset shadow, zero blur - gneiss `.pinned-note`, verbatim geometry.
> A blurred shadow smears the live three.js scene behind the card; a hard offset does not.
> Their colour #bda77d is a light-paper value and becomes our warm line token.

> The four corner tabs on the warning variant overhang all four corners, so text has to be kept
> out from under them. This is the only place a category changes the BOX in v1.

## Version 2 - the quiet secondary rail

> SOURCE: catlikecoding.com/unity/tutorials/tutorials.css, `aside` at line 236, re-fetched.
> TIER: Remixed. Idea-origin: theirs.
>
> VERBATIM:
>   aside { background-color:#ddd; border:2px solid #ccc; font-size:14px; margin:1em; padding:0 1em }
>   aside h3 { font-size:14px; margin:0 0 1em; padding:1em 0 0; cursor:pointer }
>
> THE IDEA WORTH HAVING: the box is ONE NOTCH SMALLER THAN PROSE - 14px against their 16px body.
> A run of callouts then reads as a quiet secondary rail rather than a stack of banners. With
> five categories that could all appear in one post, that matters more here than on their site.
> Their h3 also gets NO size hierarchy at all - the heading is the same 14px as the body.
>
> Already square, 2px flat border, no radius, no shadow. Nothing to correct but the colours:
> their #444 dark-mode fill is OPAQUE and would black out the scene behind the card.
>
> NOT TAKEN: the disclosure behaviour (`aside div{display:none}` + `.expanded`). Their aside is a
> collapsible, not an admonition, and a callout that hides its own content is a different device
> from the one Rod decided. Their `@media print{aside div{display:block}}` is the good half of
> that idea and is moot without the collapse.

### The inherited shadow, caught by measuring

> CAUGHT BY MEASURING, not by reading: `.taped` (washi-tape.css) sets its own
> box-shadow: 0 3px 5px rgba(0,0,0,.45), and every callout here carries `.taped` for the tape
> geometry. So v2 was silently inheriting a shadow catlikecoding does not have, which is the
> one thing that distinguishes it from v3. Cancelled explicitly.
> This is worth knowing generally: `.taped` brings a shadow with it, so any box that wants a
> different one - or none - has to say so.

## Version 3 - the tape's actual partner box

> SOURCE: gneiss.place box.css `.box` + `.polaroid`, re-fetched this session.
> TIER: Remixed. Idea-origin: theirs.
>
> THIS IS THE ONE THE TAPE WAS DESIGNED AGAINST. gneiss's own taped markup is
> `class="taped polaroid"` - so the tape's real partner is NOT an evenly padded card, it is the
> polaroid, whose deep bottom sill is the device:
>
>   .polaroid { padding: 1rem 1rem 3rem 1rem; }        <- the asymmetry IS the polaroid
>   .box { box-shadow: 0 3px 5px rgba(88,70,48,0.50); } <- the warm shadow, verbatim
>
> That asymmetric padding is theirs and it is free. It also does something useful here: the deep
> bottom sill gives the bottom corner tapes somewhere to sit without touching text.
>
> THE WARM BLUR IS THE TRADE. `0 3px 5px rgba(88,70,48,.5)` is the real gneiss value and is
> warmer and softer than v1's hard offset - but it BLURS, which smears the live scene behind the
> card. v1 and v3 are deliberately opposite on exactly this point so Rod can see both.
>
> CORRECTION THIS VERSION CARRIES: washi-tape.css shipped `box-shadow: 0 3px 5px rgba(0,0,0,.45)`
> with a comment saying it "becomes rgba(88,70,48,.5) when colour lands". Colour has landed and
> the real value is verified. This is that value.

## Reference / links - no box at all

> SOURCE: stripe.dev additionalResourcesList. TIER: Remixed. Idea-origin: theirs.
>
> Rod decided reference gets no tape and no rotation. Stripe goes one further: no box either.
>   .ListItem { border-bottom: .5px solid var(--borderColor); display: grid }
>   .link { padding: 12px 0; align-items: center; display: grid }
>   .SquareIcon { background-color: ...; width:8px; height:8px }   <- an 8px HARD SQUARE marker
>
> Hairline .5px bottom rules, an 8px square marker, list-style:none, 12px row padding. No card,
> no border, no fill. It is the same shape as the decision: quiet end matter that does not
> interrupt.
> Their .5px is kept - it is a real sub-pixel hairline on retina and rounding it to 1px doubles
> the weight of the one device this has.

Note: the shipping reference list is now the separate `reference-links` component (ronja
tutorials, picked by Rod 2026-08-24). `.co-ref` here is the earlier stripe.dev answer.

## The quote problem - stated so it cannot be silently resolved

> THREE INDEPENDENT SOURCES REFUSE A BOX:
>   maxime    - no bar, no rule, no glyph, NO BACKGROUND. The device is typographic contrast plus
>               a width break that lets the quote escape the measure.
>   stripe    - has a blockquote rule, but it is REJECTED ON USAGE: zero <blockquote> elements
>               across four fetched articles. Dead CSS, not a used device.
>   gneiss    - the tape's OWN site also refuses a box: left rule, italic, display face.
>
> So `quote + card + L-corner tape` HAS NO SOURCE. Rod chose tape C for it knowing the corners
> need corners to sit on. The boxed version below is therefore tiered SLOP, idea-origin CLAUDE,
> and is drawn ONLY because the decision requires it. `.co-quote--boxless` is the sourced
> alternative and is drawn beside it so the two can be compared honestly.

> SOURCED alternative: the one treatment all three sites share is a left rule and italic.
> gneiss verbatim geometry, our tokens, their --accent-red on the cite replaced with silver.
