# Comments removed from `_sass/abstracts/_tokens.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// TOKENS - the redesign's canonical set (D42, Rod 2026-08-25)`

```text
=============================================================================================
```

### Line 2, above `//`

```text
TOKENS - the redesign's canonical set (D42, Rod 2026-08-25)
```

### Line 3, above `//   "please just remove the live tokens for now and use our new ones assume everything style`

```text

```

### Line 4, above `//    related in the old site is now dead. also make sure you keep all colors to have tokens so we`

```text
"please just remove the live tokens for now and use our new ones assume everything style
```

### Line 5, above `//    can return later if need be."`

```text
related in the old site is now dead. also make sure you keep all colors to have tokens so we
```

### Line 6, above `//`

```text
can return later if need be."
```

### Line 7, above `// Lifted verbatim from 'redesign-lab/extracted/styles/settings.css', comments included, because`

```text

```

### Line 8, above `// those comments are the design record - which value came from where, and which of Rod's calls`

```text
Lifted verbatim from `redesign-lab/extracted/styles/settings.css`, comments included, because
```

### Line 9, above `// changed it. Losing them would make the palette unauditable.`

```text
those comments are the design record - which value came from where, and which of Rod's calls
```

### Line 10, above `//`

```text
changed it. Losing them would make the palette unauditable.
```

### Line 11, above `// WHAT THIS REPLACES. The old site defined 303 custom properties across 'themes/_dark.scss' and`

```text

```

### Line 12, above `// 'themes/_light.scss', of which **117 were never referenced by anything**.`

```text
WHAT THIS REPLACES. The old site defined 303 custom properties across `themes/_dark.scss` and
```

### Line 13, above `//`

```text
`themes/_light.scss`, of which **117 were never referenced by anything**.
```

### Line 14, above `// CORRECTION, 2026-08-25, and the first version of this comment had it wrong. It said the heaviest`

```text

```

### Line 15, above `// consumer of those tokens was 'vendors/_bootstrap.scss' at 167. **Bootstrap references 167 custom`

```text
CORRECTION, 2026-08-25, and the first version of this comment had it wrong. It said the heaviest
```

### Line 16, above `// properties and every one of them is a '--bs-*' that Bootstrap defines in that same file. The`

```text
consumer of those tokens was `vendors/_bootstrap.scss` at 167. **Bootstrap references 167 custom
```

### Line 17, above `// intersection with the theme's 270 is ZERO** - measured, not assumed. The original claim came from`

```text
properties and every one of them is a `--bs-*` that Bootstrap defines in that same file. The
```

### Line 18, above `// counting 'var(--...)' occurrences per file without checking whether the names matched.`

```text
intersection with the theme's 270 is ZERO** - measured, not assumed. The original claim came from
```

### Line 19, above `//`

```text
counting `var(--...)` occurrences per file without checking whether the names matched.
```

### Line 20, above `// The true picture is better than the wrong one: of the 270 theme tokens, **155 are read only by our`

```text

```

### Line 21, above `// own '_sass/' partials, 25 only by other tokens in the same file, and 108 by nothing at all.**`

```text
The true picture is better than the wrong one: of the 270 theme tokens, **155 are read only by our
```

### Line 22, above `// '_includes/', '_layouts/', '_javascript/' and 'assets/' reference them **zero** times - verified,`

```text
own `_sass/` partials, 25 only by other tokens in the same file, and 108 by nothing at all.**
```

### Line 23, above `// no 'var(--)' and no 'setProperty'. So the vendored Chirpy does not read them either.`

```text
`_includes/`, `_layouts/`, `_javascript/` and `assets/` reference them **zero** times - verified,
```

### Line 24, above `//`

```text
no `var(--)` and no `setProperty`. So the vendored Chirpy does not read them either.
```

### Line 25, above `// That answers the question this port was most afraid of. Removing the old tokens cannot break`

```text

```

### Line 26, above `// Chirpy, because Chirpy never read them. The blast radius is exactly the old design's own partials,`

```text
That answers the question this port was most afraid of. Removing the old tokens cannot break
```

### Line 27, above `// which D42 already declares dead.`

```text
Chirpy, because Chirpy never read them. The blast radius is exactly the old design's own partials,
```

### Line 28, above `//`

```text
which D42 already declares dead.
```

### Line 29, above `// ONLY TWO NAMES EVER OVERLAPPED between the two sets - '--z-content' and '--z-overlay', both`

```text

```

### Line 30, above `// z-index plumbing, neither a colour. There was no shared vocabulary to preserve.`

```text
ONLY TWO NAMES EVER OVERLAPPED between the two sets - `--z-content` and `--z-overlay`, both
```

### Line 31, above `//`

```text
z-index plumbing, neither a colour. There was no shared vocabulary to preserve.
```

### Line 32, above `// EVERY COLOUR IS A TOKEN AND MUST STAY ONE. Rod's reason is reversibility: "so we can return later`

```text

```

### Line 33, above `// if need be". A hard-coded colour anywhere in ported code is a defect, not a shortcut - it is a`

```text
EVERY COLOUR IS A TOKEN AND MUST STAY ONE. Rod's reason is reversibility: "so we can return later
```

### Line 34, above `// value that cannot be found, changed, or reverted.`

```text
if need be". A hard-coded colour anywhere in ported code is a defect, not a shortcut - it is a
```

### Line 35, above `//`

```text
value that cannot be found, changed, or reverted.
```

### Line 36, above `// THE FAILURE MODE TO WATCH, because it happened four times on 2026-08-25 alone: a token name that`

```text

```

### Line 37, above `// does not resolve renders its FALLBACK and is wrong WITHOUT ERRORING. '--color-pink' was defined`

```text
THE FAILURE MODE TO WATCH, because it happened four times on 2026-08-25 alone: a token name that
```

### Line 38, above `// in no stylesheet and rendered a fallback pink for weeks. So every token that moves gets MEASURED`

```text
does not resolve renders its FALLBACK and is wrong WITHOUT ERRORING. `--color-pink` was defined
```

### Line 39, above `// on the rendered page, never grepped.`

```text
in no stylesheet and rendered a fallback pink for weeks. So every token that moves gets MEASURED
```

### Line 40, above `// =============================================================================================`

```text
on the rendered page, never grepped.
```

### Line 41, above `:root {`

```text
=============================================================================================
```

### Line 44, above `--color-night: #070c23;`

```text
=== core palette (foundations.css values) ===
```

### Line 50, above `--color-glow-soft: #ffd9a8; /* warm highlight (foundations #FFD9A8) */`

```text
warm lantern ramp (value tiers: highlight -> gold -> deep -> ember glow)
```

### Line 51, on the line `--color-glow-soft: #ffd9a8;`

```text
warm highlight (foundations #FFD9A8)
```

### Line 52, on the line `--color-gold: #fbbf24;`

```text
primary accent
```

### Line 53, on the line `--color-gold-deep: #f59e0b;`

```text
headers, deep accent
```

### Line 54, on the line `--color-glow: #ff6a00;`

```text
ember glow / ignite
```

### Line 56, above `--color-accent-cool: #3090a8;`

```text
ONE cool accent = the "top note" that replaces pink (T0-A, Rod 2026-06-12: warm + 1 cool).
     The cool sky the warm lanterns hang in (Shinsekai/Shinkai twilight origin). Spend it RARELY
     on the single most-important mark per view (active state / one focal point) — decided
     per-surface in Tiers 1-4, not blanket-applied.
     SOURCED 2026-06-12 from harumaki Gen'eiten flyers (sources/harumaki-palette.md): the teal-cyan
     disc/link accent. Alt = cobalt #1830a8 (the glowing-figures blue). Brighten toward #78c0c0 on
     the Palette page for more pop.
```

### Line 65, above `/* WARM GREY - Rod picked it 2026-08-23 from card-greys-tests.html ("Warm grey is the`

```text
=== surfaces & lines ===
```

### Line 67, above `--color-panel: rgba(28, 26, 24, 0.55);`

```text
WARM GREY - Rod picked it 2026-08-23 from card-greys-tests.html ("Warm grey is the
     winner"). Was rgba(12,16,38,.55), a real blue: 38 blue against 12 red. ORIGIN: ROD - this
     swatch is ours, not sourced, and was labelled so on the page when he chose it.
     Alpha held at .55 so only the hue moved and no box changed size.
```

### Line 72, on the line `--color-panel-solid: #1c1a18;`

```text
the same warm grey, opaque. Was #161d39.
```

### Line 73, on the line `--color-glass: rgba(7, 12, 35, 0.4);`

```text
top-bar backdrop glass
```

### Line 74, on the line `--color-line: rgba(251, 191, 36, 0.26);`

```text
gold hairline (norikura)
```

### Line 75, on the line `--color-line-soft: rgba(255, 255, 255, 0.1);`

```text
neutral UI hairline
```

### Line 76, on the line `--color-line-faint: rgba(255, 255, 255, 0.06);`

```text
whisper hairline (bands, bar edge)
```

### Line 77, on the line `--color-surface: rgba(255, 255, 255, 0.05);`

```text
subtle chip/input fill
```

### Line 80, above `--color-ink: #1a1a1a; /* text on gold fills (buttons, badges) */`

```text
=== component-anchored colors ===
```

### Line 81, on the line `--color-ink: #1a1a1a;`

```text
text on gold fills (buttons, badges)
```

### Line 82, on the line `--color-cover-hi: #1b2452;`

```text
card cover gradient top (also reel band kin)
```

### Line 83, on the line `--color-cover-lo: #0b1024;`

```text
card cover gradient bottom / reel band ground
```

### Line 84, on the line `--color-warm-muted: rgba(245, 232, 208, 0.72);`

```text
cream body text on card covers
```

### Line 85, on the line `--color-stamp-paper: #1e160e;`

```text
stamp callout paper (dots must match exactly)
```

### Line 88, on the line `--color-code-green: #9bdc8a;`

```text
code symbol accent
```

### Line 89, on the line `--color-icon-stroke: var(--color-gold-deep);`

```text
draw-in icons resting stroke — orange (Rod 2026-08-11; was pale #cdd8f0 from the stephan source)
```

### Line 91, above `/* CAVEAT IS NO LONGER DOWNLOADED, so this token now resolves to the browser's default`

```text
type (hybrid fork: hand logo / display headers / body / mono workhorse)
```

### Line 93, above `--font-hand: "Caveat", cursive;`

```text
CAVEAT IS NO LONGER DOWNLOADED, so this token now resolves to the browser's default
     cursive. Rod 2026-08-25: "drop caveat". Its only consumer was `.top-bar__logo`, and that
     declaration was deleted the same day when the wordmark turned out to be painting in Caveat
     instead of the boil face. The name is kept rather than deleted so the decision stays
     readable, but USING IT WILL RENDER A FALLBACK WITHOUT ERRORING - re-add the family to the
     Google Fonts request in _includes/head.html first.
```

### Line 101, above `--font-display: "M PLUS Rounded 1c", sans-serif;`

```text
TYPE DECISION LOCKED 2026-08-18 (ROD): "rounded gothic is fine and we should use it for the
     project cards and headers as well." So DISPLAY is no longer a serif - the site has one text
     face plus the hand face plus mono, and nothing reaches for a mincho any more.
     This settles the open problem that had run since the font audit: four of the five harumaki
     sites render in mincho/serif, which contradicted the locked "hand-drawn name + clean mono,
     no serif" call. Rod picked the /ndt/ side, so the original call survives intact.
     Changing the TOKEN rather than each page is deliberate - card titles, section heads, the post
     header, the dated timeline, the quote block and the stamp callout all reach for --font-display,
     so they move together and cannot drift apart later.
```

### Line 114, above `--space-1: 0.25rem;`

```text
spacing scale
```

### Line 122, above `/* --- the rarity ladder on the achievement wall ---------------------------------------------`

```text
===========================================================================================
     PROMOTED DURING THE PORT (2026-08-25) - Rod: "make sure you keep all colors to have tokens so
     we can return later if need be."

     Everything below was a HARD-CODED COLOUR in the lab CSS this port brought over. None of it is
     new paint: every value is byte-identical to what the bench already rendered. What changed is
     that it now has a name, so it can be found and changed in one place, which is the whole of
     Rod's stated reason.

     Grouped by what the colour does, not by which file happened to hold it.
     ===========================================================================================
```

### Line 134, above `--tier-bronze-dark: #8a5222;`

```text
--- the rarity ladder on the achievement wall ---------------------------------------------
     `achievement-wall.css` carried four tier palettes as raw hex, five stops each, restated in
     four places (the tile gradient, the tile's cursor rim, the counter bar, the tier label). The
     component's own comment insists "a tier declares its gradient ONCE ... the state rules never
     name a colour at all" - which was true INSIDE the file and false across it, because the bar
     and the label each spelled the metals out again. Named here, they are declared once for real.
     The bronze/silver/gold ramps run dark -> base -> light; the base of the gold ramp is the
     site's own --color-gold, so gold gets no base token of its own.
```

### Line 151, above `--tier-prismatic-pink: #e879a6;`

```text
Prismatic is the only tier that is not one hue - in TFT prismatic is the ABSENCE of one. Its
     ramp is gold -> ember -> pink -> sky -> green -> gold, and the first two ARE --color-gold and
     --color-glow, spelled out as #fbbf24 and #ff6a00 in the lab; they now reference the tokens.
     These three cool stops are the deliberate, flagged exception to the palette law that otherwise
     keeps cool colour in the sky.
```

### Line 160, above `--tier-prismatic-rim: #eaf4ff;`

```text
A rim is ONE colour, so the prismatic tile cannot be prismatic at its edge. It takes the
     brightest pair on the ladder instead of pretending one of its hues is the whole thing.
```

### Line 164, above `--color-line-card: rgba(245, 158, 11, 0.14);`

```text
--- hairlines ------------------------------------------------------------------------------
     TWO amber hairlines, ONE ALPHA STEP APART, and that is almost certainly an accident rather
     than a decision: .14 edges the cards (merged-card, project cards, related card, portal window)
     and .15 edges the section panels and text boxes (achievement wall, and the three final pages).
     FLAGGED, NOT UNIFIED. Collapsing them would change what renders, and nobody asked for that.
     Now that both have names, deciding they are the same colour is a one-line change.
```

### Line 173, above `--color-line-panel-strong: rgba(245, 158, 11, 0.5);`

```text
About's own edge, and it is a THIRD step rather than a fourth hairline: Rod tuned the two About
     panels up to a visible amber rule on 2026-08-24, where post and ramblings keep the .15 whisper.
     About is the only consumer. Collapsing it onto --color-line-panel would undo that tune.
```

### Line 178, above `--color-panel-blue: rgba(8, 15, 27, 0.92);`

```text
The panel fill that pairs with --color-line-panel. NOT YET REFERENCED by anything in _sass:
     its three consumers (final-about, final-post, final-ramblings) are page-level CSS that this
     port did not cover. Named now because it is the single most-copied literal in the lab.
```

### Line 183, above `--color-panel-blue-solid: rgb(8, 15, 27);`

```text
The same blue, fully opaque. About's two panels sit over the full three.js scene, so they run
     solid where post and ramblings let 8% of the page through. About is the only consumer.
```

### Line 187, above `--color-black: #000000;`

```text
--- black ----------------------------------------------------------------------------------
     Only for colour that is genuinely black: the disabled tile's border, and the operand that
     darkens a hue in color-mix. Deliberately NOT used for the `linear-gradient(#000 0 0)` inside
     -webkit-mask, where the black is not paint - it is "fully opaque", and any opaque colour does
     the same job. Naming it there would invite someone to change it and quietly break six masks.
```

### Line 194, above `--color-white: #ffffff;`

```text
White, and only where white is the point: the favicon's backing plate (so the black
     lantern-cluster icon reads on the dark bar) and the softer half of the prismatic rim.
```

### Line 198, above `/* --- shadows ---------------------------------------------------------------------------------`

```text
THESE TWO ARE THE ONLY NAMES IN THIS PROMOTED BLOCK THAT THE OLD SITE ALSO DEFINES -
     themes/_dark.scss:506-507 and themes/_light.scss:361-362, as #000000 and #ffffff. Same colours,
     so nothing renders differently whichever wins, and this `:root` outranks their `html` selector
     anyway. Defined here regardless, deliberately: when the old 303 come out, the redesign set has
     to stand on its own, and a token that disappears with them would take six components with it.
     Checked the other 43 names in this block against every stylesheet - no other collisions.
```

### Line 205, above `--color-shadow: rgba(0, 0, 0, 0.45);`

```text
--- shadows ---------------------------------------------------------------------------------
     Four black shadows at four opacities, spread across five files with no name between them.
     Named by the job, not the number, because the number is the thing most likely to be tuned:
       shadow       the ordinary drop shadow under a small object (tape, chips, tiles)
       shadow-card  a card at rest
       shadow-lift  the same card lifted on hover - deeper, which is the whole effect
       shadow-text  behind text sitting on a photo, where 0.9 is doing legibility work
     The warm one is separate and stays separate: washi-tape's own comment says the black is a
     placeholder that "becomes rgba(88,70,48,.5) when colour lands (D18)", and callout-family has
     already made that move. Same name, so finishing D18 is now a swap of one token reference.
```

### Line 221, above `--color-glass-sheen-lo: rgba(255, 232, 176, 0.04);`

```text
--- the glass plane -------------------------------------------------------------------------
     The lit pane over a card. merged-card and portal-window carried the SAME four values in two
     syntaxes - rgba() in one, `rgb(255 232 176 / 4%)` in the other - which is how a shared surface
     drifts apart without anyone editing it twice. One set of names, both files.
```

### Line 227, on the line `--color-glass-edge: rgba(251, 191, 36, 0.5);`

```text
the bright left edge
```

### Line 228, on the line `--color-glass-edge-soft: rgba(251, 191, 36, 0.16);`

```text
the dim bottom edge
```

### Line 229, on the line `--color-window-bar: rgba(0, 0, 0, 0.3);`

```text
the portal window's title bar
```

### Line 231, above `--color-cover-mid: rgba(11, 16, 36, 0.62);`

```text
--- card covers -----------------------------------------------------------------------------
     The midpoint of the scrim that fades a cover image into the card body. --color-cover-hi and
     --color-cover-lo above are its ends; this was the only stop left unnamed. Two of them because
     merged-card fades to the blue and related-card to the warm grey, which is the same open
     blue-vs-grey question card-greys-tests.html is still holding.
```

### Line 239, above `--color-ring-track: rgba(255, 255, 255, 0.16);`

```text
--- the dwell ring --------------------------------------------------------------------------
     The countdown ring on a card: gold sweeps around a track, and a disc punches the middle out.
```

### Line 244, above `--color-line-tag: rgba(245, 158, 11, 0.2);`

```text
--- tags, marks and quiet text --------------------------------------------------------------
     --color-line-tag is a THIRD amber hairline, at .2, on the prose tag chip. Left at its own value
     for the same reason as the other two: flagged, not quietly merged.
     --color-highlight is the del/ins mark. It is the source's own dark-mode value (#411 widened),
     a warm near-black that survived the palette law almost unchanged; Rod confirmed the highlight
     stays ("my problem isnt with highlights per se").
```

### Line 253, on the line `--color-line-grey: #383838;`

```text
the bio panel's 2px border, transcribed verbatim from its source
```

### Line 255, above `--color-toast-fill: rgba(0, 0, 0, 0.66);`

```text
The unlock toast, from the design Rod picked on the bench (redesign-lab/achievement-tests.html
     `.t-pick`, dimden's box). Both values are transcribed from that source rather than chosen:
     the fill is translucent ON PURPOSE so the live scene reads through the toast, which is the
     whole reason the pick has no radius and no glow either.
```

### Line 261, on the line `--color-text-quiet: rgba(245, 243, 239, 0.45);`

```text
--color-text at 45%: the footer's fine print
```

### Line 263, above `--tape-pink: #f078f0;`

```text
--- the tape hues ---------------------------------------------------------------------------
     D27: the striped washi tape is the site's ONE loud object, in four section colours. Two of the
     four were already tokens (--color-glow for tldr, --color-accent-cool for quote) and two were
     bare hex, restated in both washi-tape and decisions. Provenance is unchanged and still recorded
     in `_washi-tape.scss`: pink is MEASURED off harumakigohan's own section-header PNGs, and green
     is origin ROD - D27's condition was "sampled from a real asset OR Rod picking it", and he
     picked it.
```

### Line 273, above `--pill-icon-shader: linear-gradient(`

```text
--- the projects filter pill icons ----------------------------------------------------------
     PROMOTED 2026-09-02. `_includes/kit-filter-pills.html` painted these seven icons with inline
     `style=` attributes, which breaks STYLE.md Rule 13 (no inline style) and D42 (every colour is a
     token so it can be changed in one place). Three of the eight values it used also broke the
     palette law, which bans a red and bans a cool accent outside the sky: #ff6b6b is a red,
     #4d96ff a cool blue, #9b59b6 a purple.

     NOTHING NEW IS MINTED HERE. Every value below points at a colour the site already ships, so
     these are aliases, not paint. The mapping and the reason for each:
       shader   was #ff6b6b #ffd93d #6bcb77 #4d96ff #9b59b6, a five-stop rainbow. It becomes the
                site's OWN five-stop rainbow, the prismatic tier ramp, matched stop for stop by
                hue. Prismatic is already the palette's one declared cool exception (see the
                --tier-prismatic-* block above), so the rainbow keeps its meaning without opening a
                second exception, and the red is gone.
       tool     was #b0b8c4 -> --tier-silver #c9cbd1. A wrench reads as metal and silver is the
                palette's metal. Nearest existing colour as well as the right meaning.
       vfx      was #4d96ff -> --tier-prismatic-sky #7dd3fc. FLAGGED FOR ROD: this is the least
                settled of the seven. It swaps an unsanctioned blue for a sanctioned one rather
                than for a warm colour, because the palette has no warm equivalent of "blue".
                The alternatives are --color-accent-cool (the one true cool accent, but its own
                rule says spend it on the single most important mark per view, which a filter icon
                is not) or --color-glow-soft if he wants the row fully warm.
       rigging  was #9b59b6 -> --tier-prismatic-pink #e879a6. Purple has no home in the palette;
                pink is the nearest hue that ships and it leans warm. Same ramp as the shader icon.
       2d       was #6bcb77 -> --tape-green #6fbf73. Effectively the same green already, 4 points
                of red apart, and green is a tape hue Rod picked himself (D27).
       3d       was #f0a500 -> --color-gold-deep #f59e0b. Effectively the same amber already.
       study    was #e8a87c -> --tier-bronze-light #d99a5c. The warm tan rung that ships; a shade
                deeper than the old value.

     STILL INLINE AND STILL RAW: `_includes/tag-badges.html` paints the SAME seven icons with the
     SAME eight hex values on the project cards, and its own comment says minting names for them is
     a separate call. This is that call. Until that include points at these tokens, a card badge and
     a filter pill for the same tag render different colours.
```

### Line 322, above `--color-ground-warm: rgba(245, 158, 11, 0.1);`

```text
--- the page ground -------------------------------------------------------------------------
     What every page is painted on, from `foundations`: a warm wash rising off the floor, a blue
     wash falling from the top right, and three saturated-orange blobs. They used to drift.
     Each gradient needs its transparent end named too, because a gradient to plain `transparent`
     fades through grey in some engines - it has to fade to the SAME hue at zero alpha. That is why
     the `-0` tokens exist and why they must keep matching their partner's rgb triplet.
```

### Line 333, on the line `--color-glow-drift-right: rgba(255, 140, 0, 0.1);`

```text
the only one that is not #ff6a00
```

### Line 336, above `--z-content: 1;`

```text
z-index scale
```

### Line 341, above `--z-cursor: 10050;`

```text
The cursor glow rides above EVERYTHING. Rod 2026-08-25: "it should be make it go up".
     Deliberately clear of the two highest things on the site, the skip link at 9999 and the
     achievement toasts at 10000/10001, because "upmost" has to mean upmost or it is just a
     bigger number that loses to the next one somebody adds. Safe to sit over both: the glow
     is `pointer-events: none` and paints a 15%-opacity gold radial that fades out entirely,
     so it tints those surfaces without obscuring them. Drop it below 9999 if the focused
     skip link ever needs to be completely clear.
```
