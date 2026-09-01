# portal-window - the draggable window on the portal

Reasoning moved out of `_sass/components/_portal-window.scss` on 2026-08-25 under D45 (comments get
short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/portal-window/portal-window.css`
Demo: `redesign-lab/extracted/components/portal-window/portal-window.html`
Behaviour: `effects/portal-windows.js` (drag, drift, close, reset, header-fit sizing).

---

## The header, and the two passes it retires

> portal-window - the draggable window on the portal. Our own project-card surface, made opaque.
>
> Rod, 2026-08-23: "Honestly i think this is ok just reconstruct these opaque cards in the site
> colors", after "try to make a version where they look a little more like our current project
> cards?" and "i also really dont like the diamonds remove those."
>
> That RETIRES two earlier passes on this component and it is worth saying why, because the trail
> matters more than the result:
>   - the WINDOWS-98 chrome ("make it kinda look like old windows tabs") - did not land.
>   - the ZUTOMAYO copy ("copy zutomayo exactly") - their real pink and purple, which only became
>     possible once Rod lifted the palette law here. It was faithful and he still did not want it.
> The palette exception is therefore SPENT: these windows go back to site colours. Two rounds of
> chasing an external look ended with the answer being a component we already had.

## Provenance: this is internal reuse, not an external borrow

> The surface is our own APPROVED project card, taken from `merged-card.css` and
> `project-cards-expensive.css`. That is not a citation of anything outside this repo, and it is
> not claimed as one - it is the ordinary and correct thing to do: two objects that should feel
> related are built from the same rules rather than from two independent readings of a reference.
>     hairline     `1px solid rgba(245, 158, 11, 0.14)`      (.card-cover)
>     drop shadow  `0 10px 26px -10px rgba(0, 0, 0, 0.55)`   (.card-cover)
>     glass plane  `inset: 8px`, sheen `linear-gradient(0deg, rgba(255,232,176,.04),
>                  rgba(255,232,176,.12))`, `border-left: 1px solid rgba(251,191,36,.5)`,
>                  `border-bottom: 1px solid rgba(251,191,36,.16)`   (.glass-plane)
> That asymmetric bright-left / faint-bottom edge is the whole reason the cards read as lit from
> one side, so it is reproduced rather than flattened into a uniform border.

## Opaque, and the card's own deep blue

> Rod asked for OPAQUE, then for the blue: "the cards themselves should be the deep blues of the
> site btw." So the ground is the card's actual gradient, `--color-cover-hi` #1b2452 ->
> `--color-cover-lo` #0b1024, at full opacity. Not an approximation - the same two tokens the
> project cards read, so if those tokens ever move, both move together.
>
> THIS SETTLES A QUESTION THIS FILE PREVIOUSLY HAD TO FLAG. An earlier pass used the warm grey
> `--color-panel-solid` instead, reasoning that the 2026-08-23 warm-grey lock had removed blue from
> every surface except the sky, and noted that the cards were still blue and the two would disagree
> (`card-greys-tests.html` is still open on exactly that). Rod's answer is that these windows follow
> the CARDS. If he later greys the cards, this follows automatically through the same tokens.

> WHAT OPAQUE COSTS: the lantern scene no longer reads through the windows. That is what "opaque"
> means and it was asked for directly, but it is the single biggest change to how the page reads
> and it is not a detail.

> THE DIAMOND IS GONE. `.pwin__mark` is deleted, markup and CSS. It began as a stand-in for
> zutomayo's drawn heart and survived into two later passes it never belonged to. Rod: "i really
> dont like the diamonds".

## The close button

> Rod reported some windows had the X cut off. I could not reproduce it: measured at 1588, 1280,
> 1100 and 980 every button rendered at full size inside its bar with room to spare, and none sat
> under the state panel. So rather than patch a symptom I could not see, the button is now sized so
> clipping is STRUCTURALLY impossible - a hard `flex: 0 0 auto` so it can never be compressed by a
> long title, and explicit min dimensions so it cannot shrink below a legible size on the smallest
> windows. If an X is still cut off, the viewport width would pin it down immediately.
> The 2x invisible hit area (109ichiki) stays: WCAG 2.2 target size (2.5.8) wants 24x24 and the
> drawn button is smaller than that on every window.

## The class prefix is `pwin`, not `portal-window`

> Deliberate, against convention: `effects/portal-windows.js` addresses these nodes by name and is
> verified working, so renaming them would edit behaviour-bearing code for a cosmetic reason.

## The bench fallbacks

> On the portal, final-portal.html overrides this with the absolute positioning the drag engine
> drives, and the JS sets --win-w / --win-h / --bar-h from the live field. On the BENCH none of
> that exists, so these fallbacks are what let the component render on its own.

## `min-width: 0` on the bar

> THE BAR IS A GRID ITEM, and a grid item's `min-width` defaults to AUTO - so it refuses to
> shrink below its own content and grows straight past the window, which has `overflow: hidden`.
> The close button sits at the far right of the bar, so it was the first thing clipped away.
> Measured before the fix: itch.io's window was 86px wide and its bar 135.7px. Rod: "the itch.io
> and art station still have their X missing."
> This is a SAFETY NET, not the fix he asked for - portal-windows.js now grows each window to fit
> its header, so the title should never need to ellipsise. This only guarantees that when a title
> cannot fit, the TITLE gives way rather than the control.

## The header type

> ORANGE, and BIGGER. Rod 2026-08-23: "do the Orange header text" and "honestly most of the
> window text doesnt read as header anyways". It was 40% of bar height capped at 14px, which on
> the smaller windows sat at the floor and read as a label rather than a heading. Now 48% of a
> taller bar with the cap lifted to 21px, and weight 700 - a header should be the loudest thing
> in its own window, and it was competing with body text at nearly the same size.

## The glass plane sits on the body

> THE CARD'S GLASS PLANE, on the BODY rather than the whole window. The card has no title bar, so
> its pane spans the whole tile; here a full-window pane would cross the bar and read as a mistake.
> The body is the card-equivalent region, so the pane lives there.

## Dragging from the centre

> `<a>` is natively draggable and this link fills the whole body, so a real press-and-drag near the
> centre started a LINK drag (the browser's own drag-and-drop, which pointer events do not drive)
> and the window never moved. Rod: "make it so windows can be dragged from the center too".
> NOTE a synthetic PointerEvent test cannot reproduce this - it reported the centre drag as fine.

> the drift wobble must not fight the drag - a held window tracks the cursor exactly

## Hover is keyed to the card, not the link

> keyed to the CARD, not the link. The link only covers the body, so hovering the title bar lit
> nothing - Rod: "hovering over the top of the card should count as hovering over the box as well".

> HOVER IS THE WHOLE CARD, TITLE BAR INCLUDED. Rod 2026-08-23: "hovering over the top of the card
> should count as hovering over the box as well."
> These were keyed to `.pwin a:hover`, and the link only covers the BODY - so the bar, which is a
> sibling of the body rather than a child of the link, lit nothing. Keying them to `.pwin:hover`
> makes the whole window one hover target, which is also what the card already behaves like: the
> entire thing is one destination.

## Closing, and the reset

> CLOSING. Rod: "if we are including the X they should be able to close/remove them until they
> refresh the page at least or maybe clicking the name card at the center resets them?" Both. A
> control that draws an X and does nothing is the dead-control problem, and this one had it.

> the identity mark only advertises itself once there is something to bring back - otherwise it
> would be a second dead control, which is the problem being fixed

## The text fill, and why it is aria-hidden

> THE TEXT FILL. Rod 2026-08-23: "do a spam of repeated text of what the header says inside the box
> for now." Explicitly a PLACEHOLDER - it exists so the boxes are not empty while the real content
> is undecided, and it is generated from each window's own title so it can never drift out of sync
> with the header above it.
>
> IT IS `aria-hidden`, and that is not incidental. Repeating a word forty times is texture to look
> at and noise to listen to, so the visible fill is hidden from assistive tech and `.pwin__sr`
> carries the single real label instead. A screen reader hears "Tech Art", not "Tech Art" x40.

> THE H2 COLOUR. Rod 2026-08-23: "backing text doesnt need to be that light i asked you to make
> it the secondary h2 color." `--color-gold-deep` is the token whose own comment reads "headers,
> deep accent", and it is what `.prose h2` uses on final-post. This was `--color-muted` at 0.22,
> which is why it read as almost nothing. Colour carries it now; the opacity only softens it
> enough that the Enter button still wins the eye.

> the real label, for assistive tech only. Not `display:none` - that would remove it from the
> accessibility tree too, leaving the link with no name at all.

## The social icons

> SOCIAL ICONS. Rod 2026-08-23: "for the socials inside the window can you put a icon of the social
> place they bring you?" The mark replaces the repeated-text fill on those five - a logo says what
> the window is far faster than its own name spammed forty times, and the two together would just
> be noise.
>
> Marks are Simple Icons, fetched verbatim (references/social-icons/SOURCES.md). INLINED rather
> than <img> for the reason skills-row already gives: an <img> cannot take colour from outside, and
> these have to follow the window's own. Geometry is byte-identical to the saved files; only the
> brand fill is dropped so `currentColor` can supply it.

> THE SOCIALS ARE DEMOTED. Rod: "for tech art, game design, and rambling can you make them slightly
> larger and lets demote the social windows to be smaller than they are now."
>
> Size alone could not do it. Every window is grown to fit its own header (P153), so the header sets
> a hard FLOOR on width - "ArtStation" at the door's 19.2px needs ~178px no matter how small the
> window is asked to be. Demoting them therefore means demoting their TYPE first, which is also the
> more honest reading of the ask: the three doors should read as louder, not merely bigger.
> Header ratio drops 0.48 -> 0.34 and the cap 21px -> 13px, which lets the width floor fall with it.

## The Enter affordance

> THE ENTER AFFORDANCE. Rod 2026-08-23: "Enter button is unsourced and i want it to be bottom
> center instead of center center. can you make the button one of the sourced buttons in the
> button toolkit?"
>
> HE IS RIGHT AND THE CORRECTION IS THE POINT. The previous version was built from zutomayo's
> `.btn-round` - which I HAD read from their live CSS, so it was not invented - but that is not the
> same as being one of the site's OWN sourced buttons. The portal was about to ship a fourth
> unrelated button shape onto a site that already has an approved button kit. "Sourced" and
> "consistent with what we already picked" are different tests and it only passed the first.
>
> SO IT IS NOW `button-kit`'s PRIMARY, unchanged. That component's own provenance:
>     shapes            rework-stephan (flagged in its header as having NO external source)
>     primary hover     phojanecki, codepen.io/phojanecki/pen/vwyZpY - the ripple where the
>                       outline floats outward and fades while the core ignites
>     magnetic          sources/magnetic-buttons.md
> Nothing here restyles it. The kit's CSS is linked and the markup follows its own contract
> (`.kit-button.kit-button--primary` wrapping a `.kit-button__label`), so if the kit is retuned
> this follows automatically instead of drifting.
>
> WHAT THIS FILE ADDS is placement only - where the button sits, never how it looks.
>
> **FLAGGED, and it is the kit's own flag:** `.kit-button` ships `border-radius: 8px`, which is
> against the site's locked square-by-default rule. `final-landing.html` already records this
> ("it is kept because it is what Rod pointed at on the bench; say if the shape pass should reach
> it"). Inheriting the kit means inheriting that too, and it is the one place these windows are
> not square.
>
> IT IS STILL NOT A BUTTON: a `<span>` marked `aria-hidden` inside the link that already covers the
> card. `<button>` inside `<a>` is invalid and nested interactive content adds a second tab stop
> for one destination. Rod's framing - the card navigates, this "draws their attention" - describes
> an affordance.

> SQUARE. Rod 2026-08-23: "make sure the button isnt rounded". The kit ships
> `border-radius: 8px`, which `final-landing.html` already flags as against the locked
> square-by-default rule. This is one of three overrides of the kit in this file, and it is a
> correction toward a site rule rather than a restyle away from one.

> LIFTED OFF THE EDGE. Rod: "bottom centered but should go above the window edge so nudge the
> enter button up very slightly." It was flush at 0px from the body's bottom; this floats it just
> clear so the window's own frame reads as a frame rather than as the button's bottom border.

> ANCHORED TO THE WINDOW BOTTOM, not floating above it. Rod: "it needs to be lower and anchored to
> window bottom". The alignment belongs on the LINK, which is the grid that holds the button - the
> body also holds the absolutely-positioned text fill, which has to stay at inset 0. Killing the
> body's bottom padding on doors is what lets the button reach the window's own bottom edge
> instead of stopping at the padding.

## The fill is reversed on this page

> Rod 2026-08-23: "lets do a reversal for the buttons on this page they start off orange and fill
> transparent the text is black and make it as big as the header."
>
> The kit's outline button is EMPTY at rest and fills on hover. Here it is FULL at rest and drains
> on hover, so the button is the loudest thing in the window before you touch it - which is the
> whole reason it exists ("the button just draws their attention").
>
> Mechanically this is one number. The kit parks its ellipse below at `translate3d(0, 76%, 0)` and
> raises it to `0`; this parks it at `0` and pushes it back down to `76%`. Nothing about the shape,
> the easing or the geometry changes, so it is still dennissnellenberg's rising circle - just
> entered from the other end. The curved edge now reads as the fill DRAINING away.
>
> The kit's own `--outline:hover` rules still fire when the cursor is over the button itself rather
> than the card, and they would fight this. They are neutralised below so the behaviour is
> identical wherever on the card you hover.

> with the fill gone the label has to carry itself, so it takes the orange the fill just vacated

## The wave fill

> THE WAVE FILL. Rod 2026-08-23: "do the wave fill like the nav buttons instead."
> The nav's fill and the kit's OUTLINE variant are the same device, so this is not a restyle - it
> is the right variant. Both are dennissnellenberg's rising-circle
> (sources/dennissnellenberg-wave-button.md, tier True): an oversized ellipse parked below the
> button that slides to 0 on hover. `top:-50%; left:-25%; 150% x 200%; border-radius:50%;
> translate3d(0,76%,0)` in `.top-bar__link::before` and in `.kit-button__fill` alike - identical
> numbers, which is why swapping variants gets the nav's behaviour for free.
> The CURVED leading edge is the whole "wave": because the top of the ellipse is round, the fill
> enters with a bulge rather than a flat line.
>
> It normally fires on the button. The button is decorative here and the CARD is the real target,
> so the card's hover drives it - same reason every other hover in this file is keyed to `.pwin`.
