# view-all-button

The "View all" affordance at the right end of the landing PROJECTS HEADER band. D9 says every
layout keeps it. Three versions, all square, all built against a measured reservation.

Demo: `http://localhost:4000/redesign-lab/extracted/index.html?c=view-all-button`
(view at a 1440 viewport; the band scrolls sideways below that rather than reflowing, so the
numbers on the page stay true).

---

## The reservation, and the two things wrong with it

Read off `landing-blockout.html` at viewport 1440 with `getBoundingClientRect()`.

| | measured here | contract says |
|---|---|---|
| band `.sec.rowhead` | **1425 x 64** | 1421 x 64 |
| slot `.rowhead .r` | **84.98 x 28** | not recorded |

**1. The band is 4px wider than the contract records.** `analysis/2026-08-23-blockout-contract.md`
says 1421 x 64. I measure 1425 x 64. The height agrees exactly; the width difference is scrollbar
width (my `innerWidth` 1440 gives `clientWidth` 1425, a 15px bar; 1421 implies a 19px bar). Not a
design disagreement, but the contract's number is machine-specific and should probably say so.
I fitted to **1421**, the narrower and therefore safer of the two.

**2. The slot's live measurement is a typo, not a reservation.** `landing-blockout.html:490` reads

```html
<span class="r">VIEW ALL &rarr; /span>
```

The closing bracket is missing, so `/span>` renders as literal text and the following
`<span class="yy">616 -> 680</span>` nests inside `.r`. The live box is **123.47 x 28** and that
number means nothing. Measured again on a clone of the same element, same computed style,
`textContent` set to exactly `VIEW ALL ->`: **84.98 x 28**. Identical in the base, `m3`, `a3seam`
and `v1` variants, so it is not variant-specific. Every version below is fitted to 84.98 x 28.

I have not touched the blockout (D22), but that line is worth fixing in the next blockout pass or
the next agent measures 123.47 too.

---

## Fit, measured off the built demo (not predicted)

Reservation **84.98 x 28**, inside a **1421 x 64** band.

| | measured | width | height |
|---|---|---|---|
| **A** spec row | 84.61 x 43.00 | **fits**, 0.37 spare | **OVER by 15.00** |
| **B** quiet link | 53.67 x 18.00 | **fits**, 31.31 spare | **fits**, 10.00 spare |
| **C** outlined button | 83.67 x 28.00 | **fits**, 1.31 spare | **fits**, 0.00 spare |

All three fit the 64px **band**. A breaks the 28px **chip** only.

The register's line box at 12px is a measured **18.00px** (M PLUS Rounded 1c, `line-height:normal`).
Every derived padding in the CSS derives from that 18, not from an estimate. A first pass guessed
14 and shipped a 32px-tall version C; the demo's own readout caught it, which is why the readout
is in the page rather than in my head.

---

## What is reused rather than rebuilt

- **`extracted/components/section-head/`** supplies the type register, as instructed. Face is
  `var(--font-display)` (section-head.css:44) and the hover colour is `var(--color-gold)`
  (section-head.css:74, the head's own hover). No second register was invented. Resting colour is
  `--color-silver` (decisions.css:20), one step down the same ladder, because the head takes gold
  and two golds in one band compete.
- **`extracted/components/button-kit/`** IS version C. The markup is
  `class="va va--outline kit-button kit-button--outline"` and the kit supplies the border, the
  transparent ground, the label z-index and the whole `.kit-button__fill` block. My file adds four
  declarations, each forced by the slot. The fill was not re-typed.
- **`decisions.css`** supplies the inverted-text correction (`--color-panel-solid`, not
  `--color-night`) that both A and C use, and the reduced-motion pattern C falls back to
  (`.d-relcard`, decisions.css:465-475).

**`decisions.css` `.d-meta` was considered and does not fit.** Rod's "rectangles from the buttons"
chip is `padding:0.7rem 1.5rem` at `font-size:0.82rem`, which builds a **~38px** tall box against a
28px reservation. That is why C re-derives its padding instead of taking `.d-meta` whole.

---

## Version A - the spec row

**Tier: Remixed. Idea origin: theirs (stripe.dev).**

**Source:** `sources/stripe-dev-prose.md:149-169`, the "more from this author" directory row.
Verified in that note verbatim against
`https://stripe.dev/_next/static/immutable/chunks/12lm5yee46pgk.css`, with the markup directly
observable in the served HTML at 15 rows per page. A working system on that site, not a one-off.
stripe.dev is Rod's own pick for the post template and already supplies the type decisions, so the
band and the post would be speaking the same language.

**Verbatim:**
- the 8px hard **square** bullet: `width/height:8px` plus `min-width/min-height:8px` so it never
  squashes, plus `margin-top:.5px`
- `text-transform:uppercase; font-size:12px; font-weight:300; letter-spacing:-0.012em`. Their
  tracking on uppercase really is **negative**, which is not what anyone would guess and is the
  single most useful measured thing in the source
- `padding:12px 0` - no horizontal padding at all
- `border-bottom:.5px solid`
- label at the start, arrow pinned to the far end
- the `@media (pointer:fine)` gate on the hover, so touch never gets a stuck flood
- the hover floods the **whole row** and every child inverts, the square included

**Ours:**
- **the face.** Theirs is `sohne-mono`. Keeping monospace would put a second type register in a
  band that already has the section head's, which is exactly what this build was told not to do.
  **This is the open question below.**
- **the arrow pinning.** Theirs is `grid-template-columns:subgrid` on a 24-column page grid with
  the arrow at `grid-column:-2/-1`. There is no 24-column grid in this band, so it is
  `margin-left:auto` in a flex row. Same result, different mechanism.
- **the square's colour.** Theirs reads `var(--squareTextColor)` and the hover rebinds that
  property alongside `color`. `currentColor` does the same job in one declaration (D5).
- **colours.** Highlight is `--color-gold`; inverted text is `--color-panel-solid`, not the
  translucent panel - the same correction decisions.css:203-221 already made for the prose link,
  for the same reason (inverted text on a see-through fill over a live scene reads as mud).
- **`font-size` moved from the label to the row.** Same rendered label; without it the em-sized
  arrow sized itself off the inherited 16px root and rendered 11.52px next to a 12px word. This
  also took A's width from 87.50 to 84.61, i.e. from over the reservation to inside it.
- **`:focus-visible`** duplicating the hover. Their rule is hover-only; a link whose sole affordance
  is a hover flood is a 2.4.7 failure for a keyboard user.

**Could not transfer:**
- **their arrow glyph.** Their markup shows `<svg class="...__arrow ArrowIcon..." viewBox="0 0 7 7">`
  but `sources/stripe-dev-prose.md:166` truncates before the path data, so it was never captured.
  All three versions therefore use the **chriskalafatis** chevron instead (below).
- **the flood's breathing room.** `padding:12px 0` gives the highlight no horizontal inset. On
  their 700px grid row the text has space; in an 85px slot the gold runs right up to the glyphs.
  Their value is kept rather than padded out, because padding it would mean inventing a number to
  fix a problem their design does not have.

**Does not fit on height, deliberately.** 18.00 line box + 12 + 12 + 0.5 border = 42.5 -> 43.
Dropping the padding to `4.5px 0` gives 27.5 and fits, but 12px is **their** number and quietly
overwriting it is how a sourced component becomes ours without anyone noticing. Rod's call, stated
rather than taken. Width has no slack left either: 8 square + 8 gap + 51.98 label + 8 gap + 8.63
arrow = 84.61, and the next thing to cut would be the square, a gap, or the uppercase - which are
the three things that make it stripe's.

---

## Version B - the quiet link

**Tier: Remixed. Idea origin: theirs (two parents).**

No box, no fill, no border. The lightest thing that can still be a link, and the only version that
adds nothing at all in front of the live scene.

**Parent 1, the underline:** `sources/mauriciabad-underline-link.md` (Tier: True; Rod picked and
pasted the pen himself, `codepen.io/MauriciAbad/pen/QJmwOY`). Verbatim: the `::after` at
`width:100%`, `height:.05em`, `bottom:0`, `left:0`, `background:currentcolor`, `scaleX(0)` with
`transform-origin:bottom right` at rest, `scaleX(1)` with `transform-origin:bottom left` on hover,
`transition:transform .25s ease-out`. The origin flip is the whole trick - it draws in from the
left and retracts to the right rather than mirroring itself.
- **Dropped:** their `border-radius:5px`. Square by default, and on a 0.6px-tall bar it is
  invisible anyway, so obeying the rule costs nothing.
- **Changed:** `display:inline-block` -> `inline-flex`, to seat the arrow on the text baseline.

**Parent 2, the arrow spacing:** `sources/maximeheckel-prose.md:246`, their external-link mark,
`margin-left:0.18em`. Their icon is a `mask-image` pseudo and ours is a real inline SVG, so only
the spacing transfers - but it transfers rather than being guessed, which is the point.
- **Not taken:** their `margin-right:-0.36em`, which exists to pull *following* text back under
  the mark. Nothing follows this arrow, so it would only shorten the underline.
- **Not taken, and this is a real gap:** their `--arrow-translation` / `--hover-translation-distance`
  pair. Both custom properties are set on `:hover` and `:focus` in the fetched CSS and **nothing in
  either fetched stylesheet consumes them**, so the actual travel distance was never captured.
  The arrow therefore does not move on hover. A distance would have to be invented, and it is not.

**Fits with room to spare** - 31.31px wide and 10.00px tall of headroom.

---

## Version C - the outlined button

**Tier: Remixed. Idea origin: theirs (dennissnellenberg).**

**Reused, not rebuilt.** This is `button-kit`'s `.kit-button--outline` plus `.kit-button__fill`.
The kit's own header calls itself Slop; decisions.css:398-416 already corrected that and this build
follows the correction - the ripple (phojanecki), the fill-sweep and the magnetic behaviour are
genuinely sourced and external, and only the SHAPES line was circular. The piece reused here is the
**fill**, whose parent is real: `sources/dennissnellenberg-buttons.md`, `.btn-fill`, verbatim -
`width:150%; height:200%; border-radius:50%; top:-50%; left:-25%`, parked below and slid to 0 on
hover, clipped by `overflow:hidden`, easing `cubic-bezier(.7,0,.3,1)` (their `--animation-smooth`).
Their own source credits `codepen.io/tdesero/pen/RmoxQg` upstream.

**The four additions, each forced by the slot:**
1. `border-radius:0` - the kit is 8px. decisions.css:406 already squares the kit for `.d-meta`.
2. `padding:4px 14px`. **Horizontal 14px is the blockout's own measured value**
   (`landing-blockout.html:57`, `.rowhead .r{padding:7px 14px}`). **Vertical is derived, not
   chosen:** (28 reserved - 18.00 measured line box - 2 border) / 2 = 4.
3. `font-size:12px`, matching A's stripe-measured label so the three are comparable.
4. the label inverts to `--color-panel-solid`, not the kit's `--color-night`. Same correction as A.

**The one round thing on the page, and the exception is stated:** the fill is
`border-radius:50%`. Roundness *is* the mechanism - it is a 150% x 200% circle parked below the
button and clipped, so it never reads as a rounded box, only as a rising wave. Every actual box in
this component is square.

**Reduced motion:** the rising wave is the point of this version, so it is replaced rather than
slowed - the fill is removed and the border goes gold instead, which is the pattern
decisions.css:465-475 already uses on `.d-relcard` for the same "no motion" requirement.

**Fits, landing on the reservation exactly on height.**

---

## The arrow glyph, shared by all three

**Tier: Remixed. Idea origin: theirs (chriskalafatis).**
`sources/chriskalafatis-chevron-divider.md` (Tier: True, captured 2026-06-11 from the inline SVG on
chriskalafatis.com - the only inline SVG on that page, used 7 times). The path is verbatim. Their
glyph points **down** on a 26 x 27 viewBox; **the -90deg rotation to point right is ours.**
`fill:currentColor` is what makes the hover inversion work for free in all three versions.

Borrowed from a third site rather than authored, and rather than pretending it is stripe's, because
stripe's own 7x7 path was never captured. If Rod would rather it were the site's own mark, that is
a drawn-asset job like the section head's `~`, not a CSS one.

---

## Open questions for Rod

1. **Version A's face: monospace or not?** stripe's label is `sohne-mono`, and the mono is a real
   part of why their row reads like a spec sheet. I dropped it to obey "reuse the section head's
   type register", but `--font-mono` is already in the site's chrome (top bar, footer, both at
   IBM Plex Mono), so putting it back would not be inventing a register - it would be borrowing the
   chrome's. Which is it: the head's face, or the chrome's?
2. **Version A does not fit the 28px chip (43 vs 28).** Either the reservation moves, or stripe's
   `padding:12px 0` becomes `4.5px 0` and stops being theirs. I did neither. Same shape as
   mismatch 3 in the blockout contract, and worth noting the 28px chip was drawn around **10px
   placeholder monospace**, which is smaller than any real UI type in this register - so the
   reservation may simply be too small rather than the component too big.
3. **Case.** The blockout greybox says `VIEW ALL`; the section head beside it says
   `Featured Projects` in title case. A is uppercase because stripe's is; B and C are title case
   because the head is. That is a live inconsistency across the three, not an oversight, and it is
   one word either way.
4. **`final-landing.html:25` does not load the weights `decisions.css` asks for.** It requests
   `M+PLUS+Rounded+1c:wght@400;500;700`, and decisions.css specifies 100 and 300 throughout, so
   every 300 in that file silently renders 400 on that page. This demo loads 300 so the component
   is judged on what the register actually says. The fix is one edit to that font URL and it is
   outside D22 scope for me.
5. **`landing-blockout.html:490` has the unclosed `</span>`** described above. Not mine to fix.

---

## Files

- `view-all-button.css` - all three versions, sectioned, provenance header per version
- `view-all-button.html` - self-contained demo on the night ground, reservation drawn dashed
  behind each version, with a live `getBoundingClientRect` fit readout at the bottom
- `view-all-button.md` - this file
