# section-head - centred label flanked by an ornament, hairline under

Reasoning moved out of `_sass/components/_section-head.scss` on 2026-08-25 under D45 (comments get
short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/section-head/section-head.css`
Demo: `redesign-lab/extracted/components/section-head/section-head.html`

---

## Rod's pick

> PICKED BY ROD 2026-08-22 from four candidates on section-head-tests.html: "Lets go with C for
> now remove the number above and add a hairline below it."
> Two changes from candidate C as it was: the mono number/kicker is GONE, and a hairline is added.

## Provenance, stated precisely because this one is easy to overstate

> PARENT DEVICE: harumakigohan.com. Its section headers were read from the live site on
> 2026-08-22 and saved to redesign-lab/references/harumaki-heads/. They are drawn PNGs under
> `wp-content/themes/gohantheme/img/m_*.png` (`m_` = midashi, heading). Measured:
>     structure   drawn squiggle | white label | drawn squiggle   (identical in all four)
>     size        fixed 30px tall on main sections, 22px on minor; width follows the word
>     colour      label #f0f0f0, ornament #f078f0 magenta-pink   (pixel census)
> That page carries 124 images and ZERO html headings - not one h1..h6 anywhere.
>
> TIER: Remixed. The flanking-ornament idea is theirs. What is OURS:
>   - the typed `~` is a STAND-IN for their drawn wave. It is not their glyph; they have no tilde
>     character anywhere on the site.
>   - the colour is our gold, not their pink, because the palette law bans pink.
>   - the hairline is Rod's addition, and matches the one candidate A already used.
> IDEA ORIGIN: ROD.

## Asset owed - the tilde and the label are both placeholders

> Rod 2026-08-22: "I'm thinking we will replace this with hand drawn text later like the header
> art." So BOTH the tilde and the label are placeholders for drawn artwork. This is the D10 line:
> harumaki's warmth lives in the drawn asset, and matching it properly means drawing an ornament,
> not typing a character. Until that art exists this component is a stand-in that reads correctly.

## Accessibility

> A11Y: the container is an <h2>, not a div. A 2.4rem section label that is not in the heading
> outline is invisible to anyone navigating by headings, and the landing already jumps h1 -> h4.
> Caught by the ship-check on 2026-08-22 and fixed rather than noted.

The ornament is a pseudo-element, so `aria-hidden` is not available to it, but generated content
is not exposed as text by any current screen reader and the label reads clean.

## Not yet tuned

> the hairline's reach (it currently spans the container, not the label), the ornament's gap from
> the word, and the size relationship to the page's other headings.

## Three properties deliberately removed, all the same fault

`.section-head__name` looks half-empty on purpose. Three declarations were deleted from it, and
each one had been silently beating the type ladder:

> font-weight removed 2026-08-23 (Rod chose option B). decisions.css owns this class and sets
> font-weight: 100. The component was restating it as 700, and the two only resolved correctly by
> accident of load order. The ladder is the system; the component defers.

> font-size removed 2026-08-24 (Rod: "the headings are matching with the landing page so should
> be H1"). SAME FAULT AS THE TWO ABOVE, and the last of the three: decisions.css owns this class
> and maps it BY ROLE, but the role could not reach the type while the size lived here. This
> component is in `@layer components` and the ladder is in `@layer prose`, so this line beat the
> ladder outright and pinned every section head to the H2 rung regardless of its tag - which is
> why About's h1 computed 61.44px while its visible text rendered 38.4 and looked identical to a
> section break. The ladder is the system; the component defers.

> color removed 2026-08-23 (Rod chose option B). decisions.css owns this class and sets
> color: var(--h2-color). The component was restating it as var(--color-gold-deep, #f59e0b), and
> the two only resolved correctly by accident of load order. The ladder is the system; the
> component defers.

## The label is a link

> the label LINKS to the section it heads. Rod 2026-08-22: "make the text link to projects so we
> have a quick way to access it". Colour and ornament are inherited, so the link is invisible as a
> link until you touch it - the head still reads as a heading, not as navigation.
