# Comments removed from `_sass/themes/_dark.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// OWNERSHIP: this file is OURS. The filename is Chirpy's, the contents are not.`

```text
============================================================================
```

### Line 2, above `// ============================================================================`

```text
OWNERSHIP: this file is OURS. The filename is Chirpy's, the contents are not.
```

### Line 3, above `// Measured 2026-09-02 against pristine Chirpy 7.3.1 ('_sass/themes/_dark.scss', 303 lines).`

```text
============================================================================
```

### Line 4, above `// Of the 121 custom properties declared below, exactly ONE still carries upstream's value:`

```text
Measured 2026-09-02 against pristine Chirpy 7.3.1 (`_sass/themes/_dark.scss`, 303 lines).
```

### Line 5, above `//   --btn-backtotop-color: var(--text-color)`

```text
Of the 121 custom properties declared below, exactly ONE still carries upstream's value:
```

### Line 6, above `// 56 of our names are also names upstream uses, because Chirpy's own stylesheets read them, but`

```text
--btn-backtotop-color: var(--text-color)
```

### Line 7, above `// every one of those was given a new value here (64 shared before the delete pass below).`

```text
56 of our names are also names upstream uses, because Chirpy's own stylesheets read them, but
```

### Line 8, above `// Nothing else survives. Upstream's version of this file is superseded WHOLESALE: a clean`

```text
every one of those was given a new value here (64 shared before the delete pass below).
```

### Line 9, above `// overwrite loses the entire site palette.`

```text
Nothing else survives. Upstream's version of this file is superseded WHOLESALE: a clean
```

### Line 10, above `//`

```text
overwrite loses the entire site palette.
```

### Line 11, above `// WHAT AN UPGRADE HAS TO RE-CHECK, and it is only these three things:`

```text

```

### Line 12, above `//   1. '@mixin styles' plus 'color-scheme: dark' - the shape base/_base.scss:12 calls.`

```text
WHAT AN UPGRADE HAS TO RE-CHECK, and it is only these three things:
```

### Line 13, above `//   2. The 56 shared token NAMES. If upstream adds a name, nothing here defines it and the rule`

```text
1. `@mixin styles` plus `color-scheme: dark` - the shape base/_base.scss:12 calls.
```

### Line 14, above `//      that reads it silently renders its fallback. Diff the name lists, never the values.`

```text
2. The 56 shared token NAMES. If upstream adds a name, nothing here defines it and the rule
```

### Line 15, above `//   3. '.light { display: none; }' at the foot - upstream's dark/light icon swap.`

```text
that reads it silently renders its fallback. Diff the name lists, never the values.
```

### Line 16, above `//`

```text
3. `.light { display: none; }` at the foot - upstream's dark/light icon swap.
```

### Line 17, above `// THERE IS NO LIGHT THEME. '_sass/themes/_light.scss' was deleted in the merge and`

```text

```

### Line 18, above `// base/_base.scss:12 includes this mixin unconditionally, with no data-mode branch, so every`

```text
THERE IS NO LIGHT THEME. `_sass/themes/_light.scss` was deleted in the merge and
```

### Line 19, above `// value here is THE value and not the dark half of a pair. Two leftovers follow from that,`

```text
base/_base.scss:12 includes this mixin unconditionally, with no data-mode branch, so every
```

### Line 20, above `// reported rather than changed because both would alter the built CSS: the '.light' rule at the`

```text
value here is THE value and not the dark half of a pair. Two leftovers follow from that,
```

### Line 21, above `// foot now matches no markup in '_includes/' or '_layouts/', and this file is a palette, not a`

```text
reported rather than changed because both would alter the built CSS: the `.light` rule at the
```

### Line 22, above `// theme. A rename to something that says so is PROPOSED, not done, because the files that point`

```text
foot now matches no markup in `_includes/` or `_layouts/`, and this file is a palette, not a
```

### Line 23, above `// at it belong to other owners.`

```text
theme. A rename to something that says so is PROPOSED, not done, because the files that point
```

### Line 24, above `//`

```text
at it belong to other owners.
```

### Line 25, above `// TOKENS DELETED HERE 2026-09-02 (D42): 43 names that NOTHING read, found by exact-name grep over`

```text

```

### Line 26, above `// _sass, _includes, _layouts, _javascript, assets and _data, counting JS setProperty calls as`

```text
TOKENS DELETED HERE 2026-09-02 (D42): 43 names that NOTHING read, found by exact-name grep over
```

### Line 27, above `// readers. Two traps that the grep alone would have got wrong, both checked by hand:`

```text
_sass, _includes, _layouts, _javascript, assets and _data, counting JS setProperty calls as
```

### Line 28, above `//   - The eight '--prompt-*' names LOOK unread and are NOT. abstracts/_mixins.scss:337 and :341`

```text
readers. Two traps that the grep alone would have got wrong, both checked by hand:
```

### Line 29, above `//     build them by interpolation, 'var(--prompt-#{$type}-bg)', from base/_typography.scss:80-83.`

```text
- The eight `--prompt-*` names LOOK unread and are NOT. abstracts/_mixins.scss:337 and :341
```

### Line 30, above `//     Never delete a token without first grepping for an interpolated read of its prefix.`

```text
build them by interpolation, `var(--prompt-#{$type}-bg)`, from base/_typography.scss:80-83.
```

### Line 31, above `//   - '--slate-950', '--slate-800' and '--bg-tertiary' had readers, but only inside this file and`

```text
Never delete a token without first grepping for an interpolated read of its prefix.
```

### Line 32, above `//     only feeding tokens that were themselves unread, so the whole chain went.`

```text
- `--slate-950`, `--slate-800` and `--bg-tertiary` had readers, but only inside this file and
```

### Line 33, above `// Three names here are also declared on ':root' in abstracts/_tokens.scss (--color-white,`

```text
only feeding tokens that were themselves unread, so the whole chain went.
```

### Line 34, above `// --color-black, --z-overlay). ':root' outranks this 'html' selector, so those three declarations`

```text
Three names here are also declared on `:root` in abstracts/_tokens.scss (--color-white,
```

### Line 35, above `// never win: --z-overlay reads 200 from tokens.scss, not the 500 written below. Left alone because`

```text
--color-black, --z-overlay). `:root` outranks this `html` selector, so those three declarations
```

### Line 36, above `// they are shadowed, not unread, and removing them is a separate call.`

```text
never win: --z-overlay reads 200 from tokens.scss, not the 500 written below. Left alone because
```

### Line 37, above `//`

```text
they are shadowed, not unread, and removing them is a separate call.
```

### Line 38, above `// ============================================================================`

```text

```

### Line 39, above `// DARK THEME - Lantern Aesthetic`

```text
============================================================================
```

### Line 40, above `// ============================================================================`

```text
DARK THEME - Lantern Aesthetic
```

### Line 41, above `// Based on the floating lantern design with warm amber glows`

```text
============================================================================
```

### Line 42, above `// Matches React component styling from LanternGlowSite`

```text
Based on the floating lantern design with warm amber glows
```

### Line 43, above `@mixin styles {`

```text
Matches React component styling from LanternGlowSite
```

### Line 48, above `// CORE PALETTE`

```text
==========================================================================
```

### Line 49, above `// ==========================================================================`

```text
CORE PALETTE
```

### Line 50, above `--slate-900: #0f172a;         // rgb(15, 23, 42) - main bg`

```text
==========================================================================
```

### Line 51, on the line `--slate-900: #0f172a;`

```text
rgb(15, 23, 42) - main bg
```

### Line 52, on the line `--amber-400: #fbbf24;`

```text
rgb(251, 191, 36) - bright accents
```

### Line 53, on the line `--amber-300: #fcd34d;`

```text
rgb(252, 211, 77) - highlights
```

### Line 56, above `// BACKGROUNDS - Layered depth with gradients`

```text
==========================================================================
```

### Line 57, above `// ==========================================================================`

```text
BACKGROUNDS - Layered depth with gradients
```

### Line 58, above `--bg-secondary: var(--slate-900);`

```text
==========================================================================
```

### Line 61, above `--bg-glass: rgba(15, 23, 42, 0.4);`

```text
Glass morphism
```

### Line 65, above `--img-bg: radial-gradient(circle, var(--slate-900) 0%, #1a1a1a 100%);`

```text
Gradients
```

### Line 68, above `// TEXT - Warm stone palette for readability on dark backgrounds`

```text
==========================================================================
```

### Line 69, above `// ==========================================================================`

```text
TEXT - Warm stone palette for readability on dark backgrounds
```

### Line 70, above `--text-color: #E8E0D4;                                // warm stone - less saturated for long reading`

```text
==========================================================================
```

### Line 71, on the line `--text-color: #E8E0D4;`

```text
warm stone - less saturated for long reading
```

### Line 72, on the line `--text-muted-color: rgba(232, 224, 212, 0.78);`

```text
warm stone/78 — bumped from 0.6 for card + caption readability
```

### Line 74, on the line `--heading-color: #FFF9F0;`

```text
lantern paper off-white - crisp
```

### Line 77, above `// ICON COLORS - Add after text colors section (~line 60)`

```text
============================================================================
```

### Line 78, above `// ============================================================================`

```text
ICON COLORS - Add after text colors section (~line 60)
```

### Line 79, above `// ==========================================================================`

```text
============================================================================
```

### Line 82, above `// BORDERS & GLASS EFFECTS - Subtle amber glow`

```text
==========================================================================
```

### Line 83, above `// ==========================================================================`

```text
BORDERS & GLASS EFFECTS - Subtle amber glow
```

### Line 84, above `--main-border-color: rgba(245, 158, 11, 0.1);`

```text
==========================================================================
```

### Line 89, above `--glass-shadow:`

```text
Triple-layer shadow for depth + glow + inner highlight
```

### Line 93, on the line `inset 0 1px 0 rgba(251, 191, 36, 0.05);`

```text
Top highlight
```

### Line 100, above `// LANTERN GLOWS - Core visual identity`

```text
==========================================================================
```

### Line 101, above `// ==========================================================================`

```text
LANTERN GLOWS - Core visual identity
```

### Line 102, above `--glow-subtle: rgba(251, 191, 36, 0.03);`

```text
==========================================================================
```

### Line 107, above `--glow-ring:`

```text
Glow shadows for dot/orb elements
```

### Line 115, above `// Yellow variants`

```text
Orange variants (matching amber structure)
```

### Line 117, above `// ==========================================================================`

```text
Yellow variants
```

### Line 119, above `// GLOW TIER SYSTEM — ember / candle / lantern / bonfire / star`

```text
==========================================================================
```

### Line 120, above `// ==========================================================================`

```text
GLOW TIER SYSTEM — ember / candle / lantern / bonfire / star
```

### Line 121, above `// Tier 0 (Ember):  background atmosphere, 0.02-0.06, 40-80px, 1 layer`

```text
==========================================================================
```

### Line 122, above `// Tier 1 (Candle): resting interactive, 0.10-0.20, 8-20px, 1 layer`

```text
Tier 0 (Ember):  background atmosphere, 0.02-0.06, 40-80px, 1 layer
```

### Line 123, above `// Tier 2 (Lantern): hover/focus feedback, 0.20-0.35, 12-24px, 1-2 layers`

```text
Tier 1 (Candle): resting interactive, 0.10-0.20, 8-20px, 1 layer
```

### Line 124, above `// Tier 3 (Bonfire): emphasized/pinned, 0.30-0.50, 12-36px, 2-3 layers`

```text
Tier 2 (Lantern): hover/focus feedback, 0.20-0.35, 12-24px, 1-2 layers
```

### Line 125, above `// Tier 4 (Star):   indicator dots/orbs, 0.40-0.70, 8-20px, dual ring`

```text
Tier 3 (Bonfire): emphasized/pinned, 0.30-0.50, 12-36px, 2-3 layers
```

### Line 126, above `// ==========================================================================`

```text
Tier 4 (Star):   indicator dots/orbs, 0.40-0.70, 8-20px, dual ring
```

### Line 129, above `// CONSOLIDATED COLOR PALETTE — single source of truth for theme tuning`

```text
==========================================================================
```

### Line 130, above `// ==========================================================================`

```text
CONSOLIDATED COLOR PALETTE — single source of truth for theme tuning
```

### Line 131, above `// To adjust the entire site's color feel, modify these values.`

```text
==========================================================================
```

### Line 132, above `// All component files reference these instead of hardcoding rgba().`

```text
To adjust the entire site's color feel, modify these values.
```

### Line 133, above `// -- Glow hue channels (override per-element for a coloured glow) --`

```text
All component files reference these instead of hardcoding rgba().
```

### Line 135, above `--glow-hue: 251, 191, 36;          // gold (default)`

```text
-- Glow hue channels (override per-element for a coloured glow) --
```

### Line 136, on the line `--glow-hue: 251, 191, 36;`

```text
gold (default)
```

### Line 137, on the line `--glow-border-hue: 245, 158, 11;`

```text
amber (default)
```

### Line 139, above `--gold-03: rgba(251, 191, 36, 0.03);`

```text
-- Gold (251, 191, 36) — primary glow/accent family --
```

### Line 154, above `--amber-a10: rgba(245, 158, 11, 0.1);`

```text
-- Amber (245, 158, 11) — border/accent family --
```

### Line 158, above `--orange-a10: rgba(249, 115, 22, 0.10);`

```text
-- Orange (249, 115, 22) — warm secondary accent --
```

### Line 167, above `--yellow-a15: rgba(250, 204, 21, 0.15);`

```text
-- Yellow (250, 204, 21) — warm highlight accent --
```

### Line 174, above `--red-a10: rgba(239, 68, 68, 0.1);`

```text
-- Red (239, 68, 68) — warm danger accent --
```

### Line 177, above `--white-a08: rgba(255, 255, 255, 0.08);`

```text
-- White highlights --
```

### Line 180, above `--shadow-a15: rgba(0, 0, 0, 0.15);`

```text
-- Shadow/depth (0, 0, 0) --
```

### Line 185, above `--slate-a40: rgba(15, 23, 42, 0.4);`

```text
-- Slate backgrounds (15, 23, 42) --
```

### Line 189, above `// TRANSITION TIMINGS`

```text
==========================================================================
```

### Line 190, above `// ==========================================================================`

```text
TRANSITION TIMINGS
```

### Line 191, above `--transition-fast: 300ms;`

```text
==========================================================================
```

### Line 196, above `// ANIMATION DURATIONS`

```text
==========================================================================
```

### Line 197, above `// ==========================================================================`

```text
ANIMATION DURATIONS
```

### Line 198, above `// ==========================================================================`

```text
==========================================================================
```

### Line 200, above `// Z-INDEX LAYERS`

```text
==========================================================================
```

### Line 201, above `// ==========================================================================`

```text
Z-INDEX LAYERS
```

### Line 202, above `--z-overlay: 500;`

```text
==========================================================================
```

### Line 205, above `// SPACING SCALE`

```text
==========================================================================
```

### Line 206, above `// ==========================================================================`

```text
SPACING SCALE
```

### Line 207, above `// ==========================================================================`

```text
==========================================================================
```

### Line 209, above `// LINKS - Amber with glow on hover`

```text
==========================================================================
```

### Line 210, above `// ==========================================================================`

```text
LINKS - Amber with glow on hover
```

### Line 211, above `--link-color: var(--amber-400);`

```text
==========================================================================
```

### Line 217, above `// BUTTONS - Layered glass with glow states`

```text
==========================================================================
```

### Line 218, above `// ==========================================================================`

```text
BUTTONS - Layered glass with glow states
```

### Line 219, above `--button-bg: rgba(245, 158, 11, 0.1);`

```text
==========================================================================
```

### Line 226, above `--btn-backtotop-color: var(--text-color);`

```text
Specific button types
```

### Line 230, above `// TOPBAR - Navigation with lantern aesthetic`

```text
==========================================================================
```

### Line 231, above `// ==========================================================================`

```text
TOPBAR - Navigation with lantern aesthetic
```

### Line 232, above `--topbar-text-color: rgba(254, 243, 199, 0.6);`

```text
==========================================================================
```

### Line 236, above `// Site titles`

```text
Avatar
```

### Line 238, above `// ==========================================================================`

```text
Site titles
```

### Line 240, above `// SEARCH/INPUT`

```text
==========================================================================
```

### Line 241, above `// ==========================================================================`

```text
SEARCH/INPUT
```

### Line 242, above `--input-focus-border-color: rgba(251, 191, 36, 0.3);`

```text
==========================================================================
```

### Line 246, above `// CARDS - Glass effect matching React component`

```text
==========================================================================
```

### Line 247, above `// ==========================================================================`

```text
CARDS - Glass effect matching React component
```

### Line 248, above `--card-bg: rgba(15, 23, 42, 0.6);`

```text
==========================================================================
```

### Line 255, above `// TAGS`

```text
==========================================================================
```

### Line 256, above `// ==========================================================================`

```text
TAGS
```

### Line 257, above `--tag-hover: rgba(245, 158, 11, 0.15);`

```text
==========================================================================
```

### Line 260, above `// BLOCKQUOTES`

```text
==========================================================================
```

### Line 261, above `// ==========================================================================`

```text
BLOCKQUOTES
```

### Line 262, above `--blockquote-border-color: rgba(251, 191, 36, 0.3);`

```text
==========================================================================
```

### Line 266, above `// PROMPTS/ALERTS`

```text
==========================================================================
```

### Line 267, above `// ==========================================================================`

```text
PROMPTS/ALERTS
```

### Line 268, above `--prompt-text-color: rgba(254, 243, 199, 0.75);`

```text
==========================================================================
```

### Line 279, above `// CODE BLOCKS`

```text
==========================================================================
```

### Line 280, above `// ==========================================================================`

```text
CODE BLOCKS
```

### Line 281, above `--language-border-color: var(--glass-border);`

```text
==========================================================================
```

### Line 294, above `// TABLES`

```text
==========================================================================
```

### Line 295, above `// ==========================================================================`

```text
TABLES
```

### Line 296, above `--tb-odd-bg: rgba(15, 23, 42, 0.4);`

```text
==========================================================================
```

### Line 301, above `// CATEGORIES. The timeline tokens that shared this block went with the archives port.`

```text
==========================================================================
```

### Line 302, above `// ==========================================================================`

```text
CATEGORIES. The timeline tokens that shared this block went with the archives port.
```

### Line 303, above `--categories-border: var(--glass-border);`

```text
==========================================================================
```

### Line 309, above `// TABLE OF CONTENTS`

```text
==========================================================================
```

### Line 310, above `// ==========================================================================`

```text
TABLE OF CONTENTS
```

### Line 311, above `--toc-highlight: var(--amber-400);`

```text
==========================================================================
```

### Line 315, above `// MISC ELEMENTS`

```text
==========================================================================
```

### Line 316, above `// ==========================================================================`

```text
MISC ELEMENTS
```

### Line 317, above `--footnote-target-bg: rgba(251, 191, 36, 0.1);`

```text
==========================================================================
```

### Line 325, above `// ANIMATIONS/EFFECTS`

```text
==========================================================================
```

### Line 326, above `// ==========================================================================`

```text
ANIMATIONS/EFFECTS
```

### Line 327, above `// Shimmer effect for buttons (matching React)`

```text
==========================================================================
```

### Line 328, above `--shimmer-bg: linear-gradient(`

```text
Shimmer effect for buttons (matching React)
```

### Line 336, above `// ==========================================================================`

```text
Floating animation for ambient glows
```

### Line 338, above `// MISSING / SUPPLEMENTAL VARS`

```text
==========================================================================
```

### Line 339, above `// ==========================================================================`

```text
MISSING / SUPPLEMENTAL VARS
```

### Line 340, above `--separator-gradient: linear-gradient(`

```text
==========================================================================
```

### Line 348, above `// Ambient orb colors`

```text
Section title accent line
```

### Line 350, above `// ==========================================================================`

```text
Ambient orb colors
```

### Line 352, above `// UTILITY COLORS - For avoiding hard-coding`

```text
==========================================================================
```

### Line 353, above `// ==========================================================================`

```text
UTILITY COLORS - For avoiding hard-coding
```

### Line 354, above `--color-white: #ffffff;`

```text
==========================================================================
```

### Line 358, above `// THEME-SPECIFIC VISIBILITY`

```text
==========================================================================
```

### Line 359, above `// ==========================================================================`

```text
THEME-SPECIFIC VISIBILITY
```

### Line 360, above `.light { display: none; }`

```text
==========================================================================
```

### Line 363, above `// COMPONENT OVERRIDES`

```text
==========================================================================
```

### Line 364, above `// ==========================================================================`

```text
COMPONENT OVERRIDES
```

### Line 365, above `/* The category-card and list-group rules that stood here died with the tag/archive port,`

```text
==========================================================================
```

### Line 367, above `}`

```text
The category-card and list-group rules that stood here died with the tag/archive port,
     2026-08-25 - their markup was Chirpy's and the new pages use entry rows.
```
