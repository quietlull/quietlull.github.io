# achievement-wall - the catalogue and its detail panel

Reasoning moved out of `_sass/components/_achievement-wall.scss` on 2026-08-25 under D45 (comments
get short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/achievement-wall/achievement-wall.css`
Demo: `redesign-lab/extracted/components/achievement-wall/achievement-wall.html`
JS: `redesign-lab/extracted/components/achievement-wall/achievement-wall.js`

---

## Rod's spec, 2026-08-24

> "For the achievements use the same thing as the project cards with the hover rim reveal. they
>  will keep the emojis as images for now. when clicking on them they will 'activate' which for
>  now will do nothing but will later influence the three.js scene. On the right side it will
>  list out the stat of the achievement and what it does in the scene as well as any little bit
>  of text i want to add.
>  so the detail panel should include Achievement name, Progress, State (active or inactive),
>  Flavor Text (left empty for now), Effect (also left empty for now)"

## Provenance, and it is a CORRECTION to an earlier claim

> THE RIM IS THE BEST-SOURCED THING ON THE PROJECT CARD, not the worst. The file-level banner on
> `project-cards-expensive.css:22-29` stamps that whole component "NO EXTERNAL PROVENANCE / Slop",
> and that stamp is wrong for THIS technique. Three older, more specific records say so:
>   - `rework-merodev-yanne-ledger.md:11`  Rod, 2026-06-09: "the cursor glow and the glow reveal
>     are NOT slop - Rod found their references himself. Everything else = Slop."
>   - `rework-merodev-yanne-ledger.md:78`  the row for the rim: Remixed, idea THEIRS,
>     yannesidibe.com/about (spotlight border).
>   - `element-tracker.md:45`             Cursor-lantern spotlight, Remixed / theirs,
>     yannesidibe.com + brittanychiang.com, "Rod-authorized not-slop (2026-06-09)".
> A second, VERBATIM, non-circular source is already captured:
>   - `sources/john-r-muir-glow-border.md:1-6`  headed "SOURCE (True)",
>     https://codepen.io/john_r_muir/pen/ExzJjqL - full CSS+JS transcribed, pasted by Rod.
> `docs/DECISIONS.md:1266` records Rod withdrawing the circular-citation objection outright.
>
> WHAT IS STILL OWED, stated rather than buried: nobody has pinned a byte-verified capture of
> yannesidibe's CSS into `sources/`. Both the ledger and the tracker say "verbatim diff not yet
> pinned". The mask geometry is Remixed/theirs; the 2026-08-13 material pass (plus-lighter, the
> 2.5px blur, the inward spill) is tiered IDEA ORIGIN = claude and counts against the <25% cap.

Note that `related-card-real` has since re-fetched yannesidibe.com and found the cited page
returns 404 with nothing matching on the live site. The john_r_muir CodePen remains a real,
verbatim, pasted-by-Rod source and is the one to lean on.

> ONE HONEST DIFFERENCE FROM THE SOURCE. john_r_muir's original is a HOVER effect: opacity 0 -> 1
> over 0.5s. Our project-card build removed the trigger entirely - no :hover, no transition - and
> lights from global cursor PROXIMITY, so a card glows when the pointer is merely near it
> (measured: 2 of 16 at once). Giving the tiles a real hover/focus trigger moves BACK toward the
> source, and it is what makes them legible to a keyboard. Both are built here so Rod can see the
> difference.

## The orbit is driven from JS, not from keyframes

> and the reason is worth recording because the CSS version looks correct and silently does not
> work.
> Animating a custom property requires it to be REGISTERED with a type - otherwise the animation
> engine treats it as an unparsed string and steps between keyframes instead of interpolating. So
> this file had `@property --mx/--my` plus an `aw-orbit` keyframe walking the four corners.
> MEASURED ON THE REAL PAGE: the `@property` rules parse and appear in `document.styleSheets`, but
> the registration does not take in this Chrome - `CSS.registerProperty` accepts a duplicate name,
> which it would throw on if the rule had registered. The glow therefore sat at the 0% stop and
> never moved: sampled 500ms apart in a 2.8s loop it read `0%` both times.
> It would have shipped as a dead animation that looks alive in the source. The JS loop in
> `achievement-wall.js` writes the same two properties the hover path already writes, runs only
> while at least one tile is active, and stops itself when none is.

## The tuner contract

> Every number the tuner drives is a custom property with its real value as the fallback, so the
> component renders identically with no tuner attached and the tuner has nothing to override - it
> sets the same inputs the CSS already reads.

## Rod's tune, 2026-08-24 - 8 of 11 dials moved

>     glow reach   90 -> 170px    a much wider pool again, 2.7x the tile
>     one lap     2.8 -> 5s       slower orbit
>     emoji      25.6 -> 27px
>     star       1.7rem           unchanged in effect (the dial derived 1.69921875 and he squared it)
>     panel w     333 -> 373px
>     panel h     360 -> 620px    now TALLER than the catalogue column, see the note below
>     panel pad    16 -> 24px
>     wall/panel gap 20 -> 12px
>   The panel is now the tallest thing in the row: the catalogue is ~360 and this is 620, so the
>   detail box sets the section's height rather than the wall doing it. That is a real change in
>   which element is in charge and it is his call, but it is worth naming because every earlier
>   measurement of this row assumed the opposite.

## The catalogue geometry

> Klubnika's geometry, from the approved blockout (`about-blockout.html:69-71`, provenance note
> at `:255`): "64x64 tiles at 72px pitch, hover scale 1.3, selected gets a ring, and a 333x250
> DETAIL PANEL that swaps contents from the tile". 64 + 4 + 4 margin = that 72 pitch.

## The hidden label, and why it lives here

> Each tile is icon-only, so its accessible name is a piece of text that must exist for a screen
> reader and must never be seen.
> This class used to be `.visually-hidden`, which is defined in the BENCH PAGE'S own chrome and
> in NO stylesheet `final-about.html` loads. So the moment the wall was ported, all 29 labels
> rendered as ordinary body text - full achievement titles spilling out of 64px squares, over
> each other and over the panel. It looked catastrophic and every computed-style check I ran came
> back clean, because nothing was wrong with any box: the text was simply visible.
> A COMPONENT MAY NOT DEPEND ON A CLASS IT DOES NOT DEFINE. Its own namespace, in its own file,
> so it cannot be left behind again.
> `clip-path` plus the legacy `clip` deliberately - and NOT `display:none` or `visibility:hidden`,
> either of which would take the name away from a screen reader too.

## A tile is a real button

> A REAL <button>, not a span with a role. WCAG 2.1.1 comes free (Enter and Space both), 4.1.2
> gets a real `aria-pressed`, and `focus-ring.css` reaches it without a line of new CSS. The
> older `achievement-tile` component renders `<span role="img">`, which is exactly why its own
> `:focus-visible` rule there is dead code that can never fire.

> `flex: none` because these are flex items and the default `flex-shrink: 1` let them SQUASH
> instead of wrapping - measured at a narrow width, a 64px tile rendered 39px and every tile in
> the row was a slightly different size. A catalogue that reflows is correct; one that quietly
> shrinks its own tiles is not, and it only shows up below about 1100px.

The emoji size is the live site's own 1.6rem, from `_sass/layout/_aboutmecontainer.scss:247`.

## The fill: a wrong turn, reverted the same day

> THE FILLS ARE BLUE, NOT THE WARM GREY. Rod 2026-08-25: "Achievements still have bronze glow
> under them."
> He was looking at `--color-panel-solid`, which is `#1c1a18` - the WARM grey he abandoned the day
> before ("abandon the grey for this blue used here in ramblings"). I moved About's section panels
> to the blue and then built this component afterwards on the old token, so 29 warm-brown squares
> and a warm-brown detail box were sitting on a blue page. Against blue, that warm fill reads as
> exactly what he called it.
> REVERTED SAME DAY. Rod: "the color was fine before now its too blue." I read "bronze glow" as
> the FILL and it was not - the fill was right, and what he is seeing is an EDGE glow. So the
> warm fill comes back and the edge is dealt with on its own terms.
> Keeping one thing from the wrong turn: the detail panel stays a different value from the tiles,
> because when they shared a fill the panel merged into its container and vanished.

## The rim

> THE RIM. Geometry lifted from `project-cards-expensive.css:160-181` unchanged: a 1.5px ring
> made by masking the padding box out of the border box, blurred 2.5px, composited plus-lighter,
> lit by a radial gradient whose CENTRE is written per element as --mx/--my.
> `--glow-r` is the only one of the source's four radii it exposes - the soft 140px layer and
> both spills are hard-coded there - so the soft layer is re-declared here as a variable. That is
> the one deviation, and it exists so the reach is tunable at 64px at all.

> REACH IS MUCH WEAKER THAN THE CARDS'. Rod 2026-08-24: "make the mouse radius much weaker."
> The source's 220px is 3.4x a tile's width, so the falloff across 64px was nearly flat and every
> tile in reach lit almost uniformly - the band never read as a band. 90px is a little over one
> tile, so the gradient actually falls off inside the tile and neighbours dim quickly.
> Both radii are variables so the tuner can drive them; the source only exposed the first.

### The variable name was wrong, and it was a live defect

> `--aw-glow-r`, NOT `--glow-r`. These two read the wrong name until 2026-08-25 and it was a live
> defect, not a tidy-up: every other tunable here is `--aw-*`, the tune block Rod approved writes
> `--aw-glow-r: 170px`, and NOTHING read that name - so the gradient fell through to its 90px
> fallback and his chosen value never rendered once. Measured on the page: `radial-gradient(90px
> 90px ...)` while the file said 170.
> `--glow-r` is the project card's own name (`project-cards-expensive.css:176`); inheriting it
> here meant this component was reading a variable it does not own.

## Hover reads, click activates

> Rod 2026-08-24: "hovering should show the last hovered achievement's text on the right, clicking
> the achievement should force its border to shine and activate it."
> That answers the sharpest open question in the spec. Selecting and activating are not two
> clicks and not one click doing two jobs - they are two DIFFERENT GESTURES, so you can read
> every achievement without ever changing what the scene is doing. The blockout's "selected gets
> a ring" is satisfied by hover rather than by a persistent ring, so no third state is invented.
> The panel keeps the LAST hovered one rather than emptying on mouseout - his word was "last
> hovered", and a panel that blanks every time the pointer leaves a 64px square would be
> unreadable.

> ACTIVE - "force its border to shine". Rod 2026-08-24 offered two readings and said "whichever
> is easier": a uniform glow, or one that travels around the border. THE TRAVELLING ONE IS THE
> EASIER OF THE TWO HERE, which is worth saying because it is also the better-looking option and
> it would be reasonable to assume the opposite. The rim's light position is already a pair of
> custom properties the hover code writes every frame, so an active tile just drives those same
> two properties from a CSS animation instead of from the pointer. No second effect, no extra
> element, no JavaScript - the active state runs identical machinery to hover, on a timer rather
> than a mouse.
> `@property` is what makes it animatable at all: to the animation engine a custom property is an
> unparsed string unless it has been registered with a type, so without those two declarations
> the keyframes would JUMP between stops instead of interpolating.

## The star

> Rod 2026-08-24: "the active icon top right kind of sucks lets use a star and make it
> bigger reuse the pinned icon for project cards."
> REUSED, not redrawn: the project card's pinned badge already IS a star, and its box lives at
> `merged-card.css:291-300` - 1.7rem square, 5px radius, gold fill on night, centred flex, the
> same drop shadow. Those numbers are carried verbatim; only the corner moves (top-right here,
> top-left there) and the glyph gets bigger, which is what he asked for.
> Worth knowing what is being inherited: that badge's own comment records it used to paint
> `var(--color-pink)`, a token defined in NO stylesheet, so it rendered a fallback pink that is in
> no palette at all. Taking the gold takes the corrected version, not the original bug.

## Locked - readable and hoverable, but not activatable

> Rod 2026-08-24: "For locked ones give them just the name and still some interaction".
> THIS REVERSES AN EARLIER CALL OF MINE and his is better. I had made these `disabled`, reasoning
> that a pressable locked achievement is a fake feature. True, but `disabled` also takes an
> element out of the tab order and kills its hover, so it removed 15 of 29 tiles from the keyboard
> entirely and made more than half the wall unreadable. His version keeps them real buttons that
> you can reach, hover and read - the click simply does not toggle. So the honesty is preserved
> (nothing activates that should not) without the accessibility cost.
> `aria-disabled` rather than `disabled` is exactly that distinction in one attribute: it tells a
> screen reader the control is unavailable while leaving it focusable.
> The live site greys locked marks with a FILTER, not `color`, because emoji ignore `color`
> entirely - `achievement-tile.css:176-179` already flags that.

> BLACK EDGE ON A LOCKED TILE. Rod 2026-08-24: "make it so the locked cards have a black border."
> Pure black rather than the panel's usual faint grey, which is what makes it read as locked: on
> this ground a black edge is DARKER than the surface it sits on, so the tile reads as a hole
> rather than as a card that happens to be dim. The grey hairline every other tile carries is
> lighter than the fill, so the two states now differ in direction, not just in amount.

## Rarity edges: hover or pinned, never at rest

> Rod 2026-08-25: "prismatic is glowing even though it isnt in the pinned unlocked state when not
> pinned the prismatic should be hover only do the same for silver borders as well."
> He is right and the reason is worth naming: a permanently shimmering edge was doing the SAME
> job as the pinned state, so five tiles looked switched-on when nothing was. Rarity is
> information you go looking for; pinned is a state you set. They cannot share a signal.
> So a rarity edge now appears on hover or focus, and stays on only while the tile is pinned -
> which makes pinning the one thing that holds an edge lit, and that is exactly what he wanted
> "force its border to shine" to mean.
> A border cannot be a gradient, so this is the two-layer background trick: the solid fill is
> clipped to the PADDING box, the gradient to the BORDER box, and the border is transparent so
> only the gradient shows through it. Focus is included with hover deliberately - the wall is the
> one component here where tabbing reads exactly like pointing, and dropping focus would break
> that for the rarest tiles first.

## Each tier owns its colour, in one place

> Rod 2026-08-25: "Prismatic, gold and silver borders seem to overlap each other and the activated
> border when pinned is always prismatic fix it so each tier can only show their own color border."
> He is describing one bug with two symptoms. The old version hardcoded a gradient into every
> state rule, and the pinned rule listed prismatic and silver TOGETHER while painting the
> prismatic gradient - so pinning a silver tile made it prismatic. Any scheme where four tiers
> times three states means twelve places to write a colour will drift like that; the fix is to
> make it structurally impossible rather than to correct the one wrong line.
> So: a tier declares its gradient ONCE, into `--aw-tier-grad`. The state rules never name a
> colour at all - they only decide the FILL behind it and whether it is lit. A tier cannot borrow
> another's edge because no state rule knows any tier's colour.

> THE CURSOR RIM TAKES THE TIER'S COLOUR TOO. Rod 2026-08-25: "Bronze edge glow still exists."
> The tier work a message earlier fixed the BORDER but left the cursor rim on `--color-glow`
> (#ff6a00) for all 29 tiles - so a silver tile still got a bronze edge, which is the same
> complaint one layer down. Measured at his 170px radius: **13 of 29 tiles light from a single
> cursor position**, all of them orange, so the wall washed bronze wherever the pointer went.
> Declared here beside each tier's gradient, so a tier's colour is still stated in exactly one
> place and the rim rules never name a colour - same rule as the borders.

> prismatic is the only one that is not a single hue, because in TFT prismatic is the ABSENCE of
> one. It carries cool stops the palette law otherwise keeps to the sky - a deliberate exception
> for the top rung of a rarity ladder, flagged rather than hidden.

> a rim is one colour, so prismatic cannot be prismatic here - it takes a near-white, the
> brightest thing on the ladder, rather than picking one of its own hues and pretending that is
> prismatic.

> PINNED differs from merely hovered by its FILL, not by its edge - so pinned still reads as a
> distinct state without a second tier colour being invented for it.

> LOCKED WINS OVER RARITY, whatever the tier - otherwise an unearned achievement advertises that
> it is one of the rare ones.

> AND ITS GLOW GOES NEUTRAL TOO. Locked already hides the tier on the BORDER, so leaving the
> cursor rim on the tier colour let the wall announce rarity through the glow instead - and
> since every bronze achievement is locked by construction, the practical effect was 10 tiles
> glowing bronze wherever the pointer went. That is the "bronze edge glow" Rod kept seeing after
> the border was fixed.
> If locked hides rarity, it has to hide it everywhere, or the rule only half exists.

## Progress tiers

> Rod 2026-08-24: "i also plan on making it so the progress tracker keeps going right now its
> bronze but make it go silver > gold > prismatic like in TFT."
> Four rungs. Bronze, silver and gold are flat fills; PRISMATIC is the odd one and has to be,
> because in TFT prismatic is not a colour - it is the absence of a single colour. It is built
> here as a moving multi-stop gradient rather than a static rainbow, so it reads as a material
> and not as a fifth hue.
> ONE PALETTE NOTE, flagged not hidden: prismatic necessarily contains cool hues, which the
> palette law otherwise keeps out of everything but the sky. It is the top rung of a rarity
> ladder and rarity ladders are read by hue, so it is a deliberate exception rather than drift -
> say the word and it becomes a warm-only shimmer instead.

## Redacted, not blank

> Rod: "same amount of characters as real text but all in ?" - so a locked field shows the SHAPE
> of what is hidden rather than an empty line, which is what makes it read as withheld instead of
> unwritten.

## The scale lane

> The blockout also reserves `hover scale 1.3`. Off by default because Rod asked for the rim
> INSTEAD of it - kept switchable so the substitution is visible rather than assumed.

> THE SCALE LANE, not `transform` - Rod 2026-08-25. This and the tilt used to write the same one
> property on the same element, so whichever ran last silently erased the other and the tilt had
> to be told about this rule by name to compensate. `scale` is its own property and composes with
> the tilt's `transform` automatically.

> HOVER/FOCUS TRIGGER, the john_r_muir reading. When on, the rim is dark until the tile is
> actually hovered or focused, instead of lighting from proximity.

## The detail panel

> 333 wide is Klubnika's, exact. The HEIGHT is 360, not the blockout's 250 - Rod 2026-08-24:
> "yes extend the panel".
> WHY IT HAD TO GROW, and why it was free: five labelled fields at the ladder's own body size
> need about 328px once Flavor and Effect carry real sentences, so 250 overflows by ~78. Today
> they fit only because both fields are empty, which means the overflow would have arrived the
> moment he filled in the two he called "empty for now" - the worst time to find it.
> It costs no page height at all: the catalogue column beside it is 360 tall, so those 110px
> were already reserved and sitting unused. This is a deviation from the blockout's 333x250
> reservation and is recorded as one rather than slipped in.

> THE WARM PANEL, NOT THE BLUE ONE - and this is a bug fix, not a preference. The panel was
> `rgba(8,15,27,.92)`, which is exactly the fill of the `.sect` it sits inside on About, so it
> rendered as an invisible box and the detail text appeared to float loose in the section. It
> read fine on the bench only because the bench stage happens to be a different colour.
> It is now `--color-night`, one step DARKER than both the section it sits in and the tiles
> beside it, so it separates from both without restating either. (It briefly used the tiles'
> own fill, which was the warm grey.)

> NOT `.tagline`'s colour: that computes to #9aa3bd, which D31 names as the banned blue and
> says must never be used as one. Warm muted instead.

> THESE ARE DIVS, NOT PARAGRAPHS, AND THAT IS DELIBERATE. On About the wall sits inside
> `body.spacious .sect`, whose own unlayered rule `body.spacious .sect p` restyles EVERY `<p>`
> to 16px body copy with a 130% line box - so every value, label and caption in this panel was
> silently rendered as body text. Measured: the category label came out 16px against its own
> 11.2px. A component that only looks right on pages which happen not to style `p` is not
> finished, so it uses elements the page is not reaching for.

> NO ACTIVATE BUTTON IN THE PANEL. An earlier draft had one, for the reading where selecting and
> activating were two clicks. Rod's "hovering shows the text, clicking activates" removes the
> need for it entirely - the tile itself is the control, and a second control that does the same
> thing would be two ways to reach one state.
> The panel still REPORTS the state, because reading it is the panel's whole job.

> Nothing hovered yet. Rod's spec does not say what sits here, and whatever it is sets the
> panel's RESTING height - so it is a real state, not a blank.
