# line-boil - the H0 site mark, boiling between three hand-drawn faces

Reasoning moved out of `_sass/components/_line-boil.scss` on 2026-08-25 under D45 (comments get
short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/line-boil/line-boil.css`
JS: `redesign-lab/extracted/components/line-boil/line-boil.js`

---

## Provenance

> ORIGIN: ROD. The three faces are his own scratch fonts, drawn by him and delivered 2026-08-23.
> The MECHANISM is traditional 2D animation practice, not ours and not a reference site's:
> three drawings cycled in sequence, held on 2s-4s. It is the technique every hand-drawn
> "boiling line" uses. Nothing here is transcribed from another website.

## The pattern, picked by Rod 2026-08-23

> "Sequential per glyph 6sec on 4's looks best for me."
>   ORDER  sequential - every glyph runs 1,2,3 in order, the traditional cycle
>   PHASE  per-glyph, each starting on a RANDOM face, so letters drift out of step and the word
>          never changes as a block. Without the random start this is a no-op: all glyphs
>          increment in lockstep and it renders identically to swapping the whole line.
>   RATE   6/sec, "on 4s" at 24fps

## Why the advance has to be pinned

> The three faces do NOT share metrics - 55 of 68 glyphs differ in advance width. Measured raw,
> "RODNEY FAN" drifts 12.64px (4.26%) and the vertical hero drifts 70px (29%), because the fonts
> also have different ascent/descent. So each glyph is wrapped in a box measured ONCE from font 1
> and the letter boils inside it. `inline-size` is used rather than `width` because the hero runs
> `writing-mode: vertical-rl`, where the advance is vertical - `width` would pin the wrong axis.
>
> A fixed `line-height` does NOT fix the vertical case: in `text-orientation: upright` the advance
> comes from the font's own vertical metrics, not from line-height. Measured - it stayed at 70px.

## Digits: closed 2026-08-23

> The letter faces contain NO digits - measured, '0' and '7' render at the fallback width in all
> three, which is also why an earlier measurement wrongly reported digits as "identical, zero
> drift": all three were falling back to the same system font. Rod then cut three DIGIT faces, and
> they are wired in below by `unicode-range` rather than as a separate family.
> THEY ARE NOT TABULAR, which the clock cares about and a word does not. Measured per 1000em,
> Numberboil1 runs '1' at 491 against '2' at 680 - a 39% spread - and the other two are 26% and
> 28%. A ticking clock on raw metrics would shove itself sideways on every tick AND on every boil
> frame. So the pin gives every digit ONE shared box, the widest digit of all three faces, which
> makes them tabular at runtime. See pinGlyphAdvance.

> THE DIGIT FACES JOIN THE SAME THREE FAMILIES, THEY ARE NOT A FOURTH FONT.
> Rod cut three number faces 2026-08-23 and asked whether they could be combined with the text
> boils. They can, and nothing has to be merged into new font files: `unicode-range` lets one
> family name be assembled from several files, so "Lineboil1" means Rod's letters for letters and
> Rod's numerals for U+0030-0039. Every caller keeps working untouched - the boil already cycles
> the three family NAMES, so a clock boils by the same code path as a word.
>
> THE COLON DELIBERATELY IS NOT IN THIS RANGE, and it cannot be: measured, none of the three
> number faces carries U+003A at all, while all three letter faces do. Rod called this himself -
> "you will need to use the text boil font for :". Because the range covers only the digits, the
> colon falls through to the letter face on its own. It needs no special case in the JS.
>
> Declared AFTER the letter faces on purpose. Where two rules of one family both cover a
> character, the later declaration wins, and the letter faces carry no digits to lose.

## Font paths, and why a 404 here is worse than usual

> FONT PATHS REPOINTED 2026-08-25, from `/redesign-lab/assets/fonts/` to `/assets/fonts/`. The lab
> directory is gitignored, so the ported rules resolved on the machine that wrote them and 404'd
> everywhere else. That is worse here than an ordinary missing asset: the boil pins each glyph's
> advance in PIXELS at load and only re-measures on a window resize, so a face that fails to load
> does not render as missing - it pins FALLBACK metrics and the wordmark stays permanently
> mis-spaced, with nothing in the console to say why. Verify with
> `document.fonts.check('1em Lineboil1')` in the page, never by reading this file.

`font-display: block`, not swap: a fallback flash would show the wrong letterforms.

## overflow-anchor: none - the jiggle Rod reported three times

> SCROLL ANCHORING IS TURNED OFF, and this is the actual cause of the jiggle Rod reported three
> times. It is not a layout bug - NOTHING on the page was moving.
> Rod 2026-08-24, giving the reproduction that finally pinned it: "its when im scrolled half way
> down the hero because the text is changing size im getting jiggling matching the line boil
> changes."
> MEASURED at that exact position - scrolled to half the hero height, sampled 26 times off-beat
> from the 6/sec cycle: font-size, the pinned advance, cell width/height, column width/height and
> the block box were ALL STABLE to three decimal places. The only value that moved was
> `window.scrollY`, which drifted 394 <-> 402 - EIGHT PIXELS of scroll, in time with the boil.
> WHY. Chrome's scroll anchoring watches content above the viewport and quietly adjusts scrollTop
> to keep the visual position steady when that content changes. The boil replaces every glyph six
> times a second, so the browser re-anchored six times a second and the page rocked under the
> cursor. The browser was helping. `overflow-anchor: none` tells it not to.
> THIS IS WHY IT SURVIVED TWO EARLIER FIXES: both looked for something changing SIZE, and the
> earlier `vertical-align: top` did fix a real 1px baseline swing on the top-bar mark. Neither
> could find this one, because the thing moving was the viewport, not the mark.
> Verified: spread 8px -> 0px, same position, same sampling.

## vertical-align: top is load-bearing, not tidying

> Rod 2026-08-24: "if the boiling text is near the top it can cause the viewport to jiggle".
> Measured on the top-bar mark: the CELLS stay a constant 59.84px, but their container swung
> 59.84 <-> 60.84 every tick.
> Cause: an inline-block's baseline is the baseline of the text INSIDE it, and the three faces do
> not share one. So each swap re-seated the cell against the line's baseline and the line box grew
> or shrank by a pixel - six times a second, under a wordmark. `top` takes the cells off the
> baseline entirely, so the line box is the max cell height and nothing moves.
> This is the same class of bug as the pinned advance: the faces disagree on their metrics, and
> every metric they disagree on has to be taken out of the layout.

## Reduced motion is deliberately not handled

> Rod ruled motion preferences out of scope (D34), and the JS honours nothing on purpose rather
> than by omission. Recorded so the next person does not "fix" it.
