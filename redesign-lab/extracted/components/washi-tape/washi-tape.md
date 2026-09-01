# washi-tape - the site's one loud object

Reasoning moved out of `_sass/components/_washi-tape.scss` on 2026-08-25 under D45 (comments get
short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/washi-tape/washi-tape.css`
Demo: `redesign-lab/extracted/components/washi-tape/washi-tape.html`

D27: the tape carries the colour. Paper is out, cards are plain grey, and the striped tape is the
site's one loud object in four section colours.

---

## Provenance

> washi-tape - the site's tape marker, one definition stuck on anything.
> FINALIZED as a CONVENTION by Rod 2026-08-21: "since we are doing washi tape on the top of some
> cards lets follow the convention".
>
> PROVENANCE (real, external, read from the site's own served CSS 2026-08-21):
>   gneiss.place  (formerly planity.neocities.org - the old URL now 302s, and the element-gallery
>   card still points at the dead one). Selector `.taped`. A photographic washi-tape PNG draped
>   over a card's top edge at left:40% so it overhangs off-centre, card rotated, shadow warm brown
>   rgba(88,70,48,.5) rather than neutral black.
>   Verbatim source: ../../sources/gneiss-washi-tape.md (the .taped rule as served, plus the
>   asset measured). ../../sources/gneiss-paper-borderimage.md is a different device - the
>   torn-page border-image - and is NOT this component's parent.
> Their own `.taped` is factored out as a mixin "so tape can be stuck onto anything" - that
> factoring IS the convention Rod adopted, not just the look.
>
> TIER: Remixed. The tape is theirs; using it as a system-wide marker across a callout family is
> Rod's call, and the left-edge and L-corner placements below have no equivalent on their site.
>
> GEOMETRY RULE (Rod 2026-08-21, after the first pass used arbitrary lengths):
>   tape is measured off the CARD, never off a fixed pixel guess. Only the tape's WIDTH is fixed,
>   because real tape comes off a roll at one width.
>
> STATE: greybox. `--tape-img` is the hatch stand-in; it takes the real photographed tape asset
> when that exists. Everything else is final geometry.

## The tips: solved 2026-08-22, Rod picked case D

> Rod 2026-08-22, after judging washi-tape-tests.html: "washi tape d remix".
>
> D = winterwind.com/tutorials/css/29, an IRREGULAR clip-path tear. Source saved verbatim to
> ../../sources/serrated-edge-css.md. Their pitch, unchanged and the whole point of the device:
>   1, 4, 9, 13, 19, 21, 26, 30, 36, 43, 50, 52, 61, 69, 70, 76, 81, 84, 91, 97, 99 percent
> The IRREGULAR spacing is what separates a tear from a zigzag. A uniform pitch would read as a
> postage stamp, which is the failure this component was warned about. Do not tidy these numbers.
>
> TIER: Remixed, and Rod named it that himself. Two things are ours, both stated rather than
> folded into the citation:
>
> 1. THE AXIS. Winterwind's polygon is a LONG-EDGE tear on a 2px strip, where 0-100% IS the 2px
>    thickness. Ours runs on the two ENDS, because that is where tape is cut. Their numbers, our
>    axis - and because their strip is painted in the page's background colour OVER the sheet,
>    their mechanism could not have been used as-is here at all: this site has a live scene
>    behind every card, so the tear has to CLIP the tape rather than cover it.
>
> 2. THE AMPLITUDE IS IN PIXELS, NOT PERCENT. This is a bug fix, not a preference. Transposed to
>    an end tear, a percentage resolves against whatever the placement's OTHER axis happens to
>    be - and .tape--left is pinned top:0/bottom:0, so its "5%" would be 5% of a 300px+ card:
>    a 15px bite out of a 26px-wide strip. Pixels also match the physical fact, one roll and one
>    blade give the same bite on every piece however long you tear it.
>    5.5px is not a new number - it is exactly what Rod approved, .tape--top's 5% of its 110px
>    width on the test page.

### Honest note on density

> 21 points across a 26-30px end is a ~1.3px pitch. That is a FINE serration, roughly 5x finer
> than the measured reference (gneiss.place tape1.png: ends wander +/-6px in two or three lobes of
> 30-40px across a 116px width). It is not what real washi does. It IS what he asked for -
> "serrated edges like the tape was taken out from a roller" - and it is what he saw and picked,
> so it is what is built. If it reads as noise at real size, the fix is to subsample their pitch
> (every 5th or 6th point), which stays inside the same citation.

> WHAT HE HAS NOT SEEN: the test page showed the tear on .tape--top ONLY. The three other
> placements below get it too, because the whole point of this component is ONE definition stuck
> on anything. That extension is mine; it is on the bench at extracted/?c=washi-tape and on
> prose-blockout.html for him to check.

> THE BORDER IS GONE. Case D carries no outline, and the measurement backs it: gneiss's real tape
> has no border at all. The old hue-matched border rule is deleted rather than commented out.

## Still open

> deliberately NOT bundled into this change (see docs/REQUESTS.md P52):
>   - the tape is axis-aligned; the real asset sits at 5.42 degrees to the edge it is on (case G)
>   - the fill is an opaque two-tone repeat; the sourced stripe has a TRANSPARENT third band (case E)
> Both are separate picks. Neither is smuggled in here.

> NOT YET TUNED: tape width, corner overhang, and the top strip's off-centre position, which is
> still gneiss's left:38-40% rather than a measured choice of ours.

## Striped, and coloured per section (2026-08-22, Rod)

> Rod: "we will have the fun striped washi tape in the blue, green, pink, and orange for different
> sections and i think that will be fine and good." The tape stops being a greybox stand-in and
> becomes the site's one piece of loud colour.
>
> THIS IS WHERE ALL THE COLOUR LIVES NOW. The cards went grey and untextured in the same breath -
> Rod: "we just do normal transparent cards in grey with no texture, the background already adds
> some texture". So colour is concentrated in one small deliberate object instead of spread across
> surfaces, which is why four accents do not read as a rainbow.
>
> PROVENANCE OF THE COLOURS, since three of the four already existed and one does not:
>   orange  --color-glow #ff6a00        ours already, the ember
>   pink    #f078f0                     MEASURED off harumakigohan.com's own section-header PNGs
>                                       (references/harumaki-heads/, pixel census 2026-08-22).
>                                       Their ornament is this pink. Not invented.
>   blue    --color-accent-cool #3090a8 ours already, sampled from the Gen'eiten flyers
>   green   #6fbf73                     NEW. No source and no existing token - the one colour here
>                                       that is a guess. FLAGGED, not smuggled: it wants either a
>                                       sample from a real harumaki asset or Rod picking it.
>
> The stripe is a repeating-linear-gradient at 45deg, two tones of the same hue, so the tape reads
> as patterned tape rather than a coloured bar. Greybox pages keep the neutral hatch by not
> setting a section class.

## The neutral has to be a fallback, not a declaration

> the neutral is a FALLBACK inside var(), not a declaration. Declaring --tape-hue on .tape would
> shadow the value inheriting from the host, and the stripes would render grey no matter what
> colour the section carried. They did, until this was caught.

## The placements

> over the top edge, off-centre so it never reads as a centred label. gneiss uses left:40%.
> Keeps a 16px bite rather than the 7px the corners use, because this is the placement Rod already
> approved. Unify only on his say-so.

> down the left edge, replacing the 3px left bar our own .post-takeaway uses.
> Pinned top AND bottom so it always matches the card's side, at any content length. This is the
> one placement the clamp does NOT govern - Rod asked for it to match the card exactly.

### The L corners

> L-SHAPED corners, replacing miroirs' drawn L-brackets. Each L is TWO strips crossing at the
> corner, the way tape actually overlaps. Compose an arm with a corner:
>   <i class="tape tape--v tape--tl"></i><i class="tape tape--h tape--tl"></i>
>
> CORRECTED 2026-08-21 (Rod). The first version used a raw 50% length and an 8px offset, which at
> a 663px measure produced a 331px arm sitting 18px deep into the card, long enough to run under
> the text. Both fixes are RULES, not tuned numbers:
>   1. the strip only BITES the edge - the overhang does the holding, so text is never underneath.
>   2. the length is CLAMPED. The percentage still drives small cards; the max stops a wide card
>      growing a stripe.

> The arms take DIFFERENT percentages on purpose. A callout is far wider than it is tall
> (measured 625 x 76), so one shared percentage cannot serve both.
> --tape-min MUST stay clearly longer than --tape-w: when the two were equal, a short card
> clamped the side arm to a 26 x 26 SQUARE that sat exactly under the horizontal arm, and the
> vertical tape read as missing.

> THE VERTICAL ARM SITS ON TOP. Rod 2026-08-23: "for the Blue L the vertical piece should be on
> top." Both arms are absolutely positioned siblings with no z-index, so paint order fell back to
> DOM order and the HORIZONTAL one won purely because it is written second. Stating it as a
> z-index rather than reordering the markup: the markup order is how you read an L (down, then
> across) and it should not have to encode a paint decision.

### The diagonal corner strips

> Rod 2026-08-23: "for the green one the tape should have 4 diagonal strips on each corner."
> One strip laid ACROSS each corner at 45 degrees - the way tape actually holds a photo down,
> rather than the two-strip L the blue card uses. Four of them, one per corner.
>
> THE ANGLE IS NOT A PREFERENCE, it is which two edges the corner joins. A strip across the
> TOP-LEFT runs from a point on the top edge to a point on the left edge - from upper-right down
> to lower-left, a "/" - which is a horizontal strip rotated -45deg. The top-right and bottom-left
> corners join the other way and take +45deg. So the pairs are (tl, br) at -45 and (tr, bl) at +45.
>
> SIZE: the strip is 2.6x the roll width. Short enough to read as a corner tab rather than a
> diagonal stripe across the card, long enough that both ends clear the corner once rotated -
> a 45deg rotation needs about 1.41x the diagonal reach, so anything under ~2x leaves the corner
> poking out past the tape.
>
> The OFFSET is negative by design: the strip is centred ON the corner so half of it overhangs,
> which is what makes it read as holding the card down rather than sitting inside it. This is the
> one placement `--tape-bite` does not drive, because a diagonal has no single bite edge.

## The host rotation, corrected

> ROTATION CORRECTED 2026-08-23 (Rod: "you should probably correct the page rotation").
> Was rotate(-0.5deg) - TEN TIMES gneiss's actual value. Theirs is an inline style on the host,
> `style="rotate: 0.05deg;"`, recorded in sources/gneiss-washi-tape.md.
> MEASURED CONSEQUENCE, so it is not a surprise later: on a 700px card 0.5deg lifts a corner by
> 6.11px and reads as a visible tilt; 0.05deg lifts it 0.61px and reads as no tilt at all. So
> "correct" here means the card effectively stops looking rotated - which is what gneiss's own
> card does. If a visible tilt is wanted it is OURS and has to be labelled, not cited.
> SIGN KEPT NEGATIVE: theirs is positive 0.05deg. The magnitude was the error; the direction is
> a mirror and was already ours. Flagged rather than silently flipped.

The host's shadow becomes rgba(88,70,48,.5) when colour lands (D18).
The host must also leave the overhang room: `width: calc(100% - 2 * (tape-w - tape-bite))`.
