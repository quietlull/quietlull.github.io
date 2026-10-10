# Comments removed from `_sass/components/_portal-window.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/portal-window/portal-window.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `.pwin {`

```text
portal-window - the draggable window on the portal. Our own project card, made opaque.
   Rod 2026-08-23: "just reconstruct these opaque cards in the site colors". That retired two
   earlier passes, a Windows-98 chrome and a faithful zutomayo copy, and it SPENDS the palette
   exception these windows had: they are back on site colours.
   THE SURFACE IS INTERNAL REUSE, not an external borrow - the hairline, the shadow and the glass
   plane come from merged-card and project-cards-expensive, through the same tokens, so the two
   objects move together instead of drifting.
   THE CLASS PREFIX IS `pwin` ON PURPOSE. effects/portal-windows.js addresses these nodes by name,
   so renaming them would edit working behaviour for a cosmetic reason.
   See portal-window.md, which holds the full trail.
```

### Line 19, above `position: relative;`

```text
Fallbacks for the bench. On the real portal the page positions these absolutely and the JS
     sets --win-w / --win-h / --bar-h from the live field.
```

### Line 34, above `background: linear-gradient(160deg, var(--color-cover-hi, #1b2452), var(--color-cover-lo, #0b1024));`

```text
The SAME gradient the project cards use, not an approximation, so if those tokens move both
     move together. Opaque, which means the lantern scene no longer reads through. Rod's call.
```

### Line 49, above `min-width: 0;`

```text
KEEP THIS. A grid item's min-width is auto, so the bar refused to shrink below its content
     and grew straight past a window that clips. Measured: an 86px window with a 135.7px bar, and
     the close button was the first thing cut off. This makes the TITLE give way, not the control.
```

### Line 54, above `color: var(--color-glow, #ff6a00);`

```text
Orange and bigger, Rod 2026-08-23. At 40% capped at 14px it sat on the floor on small
     windows and read as a label. A header should be the loudest thing in its own window.
```

### Line 82, above `.pwin__close {`

```text
`flex: 0 0 auto` and the clamp floors are what make clipping structurally impossible: a long
   title can never compress this, and it can never shrink below a legible glyph.
```

### Line 100, above `.pwin__close::before {`

```text
109ichiki's 2x invisible target. The drawn button is under the 24x24 WCAG 2.5.8 wants.
```

### Line 159, above `.pwin__body::after {`

```text
The card's glass plane, on the BODY rather than the whole window - a full-window pane would
   cross the title bar and read as a mistake. The body is the card-equivalent region.
```

### Line 174, above `padding-bottom: 0;`

```text
No bottom padding, so the Enter button can reach the window's own edge (Rod).
```

### Line 178, above `.pwin a {`

```text
`user-drag: none` IS THE FIX FOR CENTRE DRAGGING. An <a> is natively draggable and this link
   fills the body, so a real press-and-drag started the browser's own drag-and-drop and the window
   never moved. A synthetic PointerEvent test cannot reproduce it - it reports centre drag fine.
```

### Line 194, above `.pwin:hover a {`

```text
Keyed to the CARD, not the link: the link only covers the body, so hovering the title bar used
   to light nothing. Rod asked for the whole window to be one target.
```

### Line 205, above `.pwin.is-closed {`

```text
Closing, and clicking the centre mark brings them back. Both, Rod's call. An X that draws and
   does nothing is a dead control, and this one was.
```

### Line 211, above `.centre.can-reset {`

```text
The centre mark only advertises itself once there is something to bring back, or it becomes a
   second dead control.
```

### Line 222, above `.pwin.is-dragging .pwin__inner {`

```text
The drift wobble must not fight the drag: a held window tracks the cursor exactly.
```

### Line 227, above `.pwin__fill {`

```text
THE TEXT FILL IS A PLACEHOLDER, Rod 2026-08-23: "do a spam of repeated text of what the header
   says inside the box for now." Generated from each window's own title so it cannot drift.
   IT IS aria-hidden, and that is not incidental: forty repeats are texture to look at and noise to
   listen to. `.pwin__sr` carries the one real label, so a screen reader hears "Tech Art" once.
```

### Line 243, above `color: var(--color-gold-deep, #f59e0b);`

```text
The secondary H2 colour, Rod's ask. It was --color-muted at 0.22 and read as nothing.
     Colour carries it now and the opacity only softens it enough that Enter still wins.
```

### Line 249, above `.pwin__sr {`

```text
The real label, for assistive tech. NOT display:none - that would drop it from the
   accessibility tree too and leave the link with no name at all.
```

### Line 263, above `.pwin__icon {`

```text
SOCIAL ICONS replace the repeated-text fill on those five - a logo says what the window is
   faster than its own name forty times, and both together would be noise. Rod 2026-08-23.
   Simple Icons, fetched verbatim (references/social-icons/SOURCES.md). INLINED, not <img>, because
   an <img> cannot take colour from outside and these have to follow the window's. Geometry is
   byte-identical; only the brand fill is dropped so currentColor can supply it.
```

### Line 281, above `.pwin--social .pwin__bar {`

```text
DEMOTING THE SOCIALS MEANT DEMOTING THEIR TYPE FIRST. Every window grows to fit its own header
   (P153), so the header sets a hard floor on width - "ArtStation" at the door's size needs about
   178px no matter what. Dropping the ratio and the cap is what lets that floor fall. It is also
   the more honest reading of Rod's ask: the three doors should read louder, not just be bigger.
```

### Line 296, above `.pwin__enter {`

```text
THE ENTER AFFORDANCE IS button-kit's PRIMARY, UNCHANGED, and this file adds placement only.
   Rod 2026-08-23 caught the previous one: it was built from zutomayo's .btn-round, which I had
   genuinely read from their CSS, but that is not the same as being one of the site's OWN sourced
   buttons. The portal was about to ship a fourth button shape onto a site with an approved kit.
   FLAGGED: the kit ships border-radius 8px against the locked square rule, so inheriting the kit
   inherits that too. This file overrides it below.
   IT IS NOT A BUTTON. It is an aria-hidden <span> inside the link that already covers the card -
   a <button> inside an <a> is invalid and adds a second tab stop for one destination.
   See portal-window.md.
```

### Line 309, above `border-radius: 0;`

```text
Square, Rod 2026-08-23. The kit's own 8px is against the locked square rule, so this is a
     correction toward a site rule rather than a restyle away from one.
```

### Line 313, above `border-color: var(--color-glow, #ff6a00);`

```text
Black on orange at rest, and the label sized to the window's own header (Rod).
```

### Line 318, above `margin-bottom: 0.55em;`

```text
Lifted just clear of the edge (Rod), so the window's frame reads as a frame rather than as
     the button's bottom border.
```

### Line 323, above `.pwin__enter .kit-button__fill {`

```text
THE FILL IS REVERSED HERE, and it is one number. The kit parks its ellipse below and raises it
   on hover; this parks it covering the button and pushes it down. Nothing about the shape or the
   easing changes, so it is still dennissnellenberg's rising circle entered from the other end -
   the curved edge now reads as the fill DRAINING.
   Rod 2026-08-23 wanted the button loud before you touch it, which is the whole reason it exists.
   The kit's own :hover rules are neutralised below, or they fight this when the cursor is over the
   button rather than the card.
```

### Line 334, above `transform: translate3d(0, 0, 0);`

```text
At rest it covers the button.
```

### Line 343, above `.pwin:hover .pwin__enter .kit-button__fill,`

```text
On hover it drains downward, leaving the outline empty over the card.
```

### Line 349, above `.pwin--door a {`

```text
The alignment belongs on the LINK, not the body: the body also holds the absolutely-positioned
   text fill, which has to stay at inset 0. Rod asked for the button anchored to the window bottom.
```

### Line 357, above `.pwin:hover .pwin__enter .kit-button__label,`

```text
Every hover below is keyed to `.pwin`, never to the link. The link only covers the body, so the
   title bar is a sibling of it and lit nothing. The whole window is one destination.
   With the fill gone the label has to carry itself, so it takes the orange the fill vacated.
```

### Line 374, above `}`

```text
THE WAVE FILL is the kit's OUTLINE variant, not a restyle - the nav's fill and the kit's are
   the same device, dennissnellenberg's rising circle, with identical numbers. That is why swapping
   variants gets the nav's behaviour for free. The curved leading edge IS the "wave": the top of
   the ellipse is round, so the fill enters with a bulge rather than a flat line. Rod 2026-08-23.
```
