# Comments removed from `_sass/abstracts/_variables.scss`

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

### Line 3, above `// Measured 2026-09-02 against pristine Chirpy 7.3.1 ('_sass/abstracts/_variables.scss', 30 lines,`

```text
============================================================================
```

### Line 4, above `// 19 variables). This file declares 123. Thirteen of them still carry upstream's exact value:`

```text
Measured 2026-09-02 against pristine Chirpy 7.3.1 (`_sass/abstracts/_variables.scss`, 30 lines,
```

### Line 5, above `//   $back2top-size $code-dot-gap $code-dot-size $code-font-size $code-header-height`

```text
19 variables). This file declares 123. Thirteen of them still carry upstream's exact value:
```

### Line 6, above `//   $code-icon-width $footer-height $footer-height-large $radius-lg $radius-sm $sb-btn-gap`

```text
$back2top-size $code-dot-gap $code-dot-size $code-font-size $code-header-height
```

### Line 7, above `//   $sb-btn-gap-lg $search-max-width`

```text
$code-icon-width $footer-height $footer-height-large $radius-lg $radius-sm $sb-btn-gap
```

### Line 8, above `// So 110 of 123, or 89 percent, are ours. Upstream's version of this file is superseded wholesale.`

```text
$sb-btn-gap-lg $search-max-width
```

### Line 9, above `//`

```text
So 110 of 123, or 89 percent, are ours. Upstream's version of this file is superseded wholesale.
```

### Line 10, above `// THE PART THAT MATTERS MORE THAN THE PERCENTAGE. Only 15 of the 123 are read anywhere in '_sass/'`

```text

```

### Line 11, above `// at all, and 2 of those 15 are read only by other variables in this same file. Of the 13 that any`

```text
THE PART THAT MATTERS MORE THAN THE PERCENTAGE. Only 15 of the 123 are read anywhere in `_sass/`
```

### Line 12, above `// other partial actually reads, EVERY ONE is a name Chirpy invented:`

```text
at all, and 2 of those 15 are read only by other variables in this same file. Of the 13 that any
```

### Line 13, above `//   $back2top-size, the five $code-*, $footer-height, $footer-height-large,`

```text
other partial actually reads, EVERY ONE is a name Chirpy invented:
```

### Line 14, above `//   $main-content-max-width, $radius-lg, $radius-sm, $sidebar-width, $sidebar-width-large.`

```text
$back2top-size, the five $code-*, $footer-height, $footer-height-large,
```

### Line 15, above `// Everything we added here - the spacing scale, the font ladder, the z-index ladder, the container`

```text
$main-content-max-width, $radius-lg, $radius-sm, $sidebar-width, $sidebar-width-large.
```

### Line 16, above `// widths, the aspect ratios, the $lantern-* palette, the glow intensities - is read by nothing.`

```text
Everything we added here - the spacing scale, the font ladder, the z-index ladder, the container
```

### Line 17, above `// The redesign moved all of it to CSS custom properties in 'abstracts/_tokens.scss'. So this file`

```text
widths, the aspect ratios, the $lantern-* palette, the glow intensities - is read by nothing.
```

### Line 18, above `// is 89 percent our names and 0 percent our vocabulary in the built sheet. Deleting the 110 unread`

```text
The redesign moved all of it to CSS custom properties in `abstracts/_tokens.scss`. So this file
```

### Line 19, above `// ones is a separate, larger call than tonight's pass and is NOT done here.`

```text
is 89 percent our names and 0 percent our vocabulary in the built sheet. Deleting the 110 unread
```

### Line 20, above `//`

```text
ones is a separate, larger call than tonight's pass and is NOT done here.
```

### Line 21, above `// WHAT AN UPGRADE HAS TO RE-CHECK. Four names we kept but re-pointed, three of them live:`

```text

```

### Line 22, above `//   $main-content-max-width  1250px -> 1400px   read at components/_buttons.scss:32`

```text
WHAT AN UPGRADE HAS TO RE-CHECK. Four names we kept but re-pointed, three of them live:
```

### Line 23, above `//   $sidebar-width           260px  -> 0px      read at components/_buttons.scss:27`

```text
$main-content-max-width  1250px -> 1400px   read at components/_buttons.scss:32
```

### Line 24, above `//   $sidebar-width-large     300px  -> 0px      read at components/_buttons.scss:32`

```text
$sidebar-width           260px  -> 0px      read at components/_buttons.scss:27
```

### Line 25, above `//   $topbar-height           3rem   -> 260px    read by NOTHING, and a landmine: 260px is`

```text
$sidebar-width-large     300px  -> 0px      read at components/_buttons.scss:32
```

### Line 26, above `//     upstream's $sidebar-width, so the value looks like a paste that lost its name. Chirpy sizes`

```text
$topbar-height           3rem   -> 260px    read by NOTHING, and a landmine: 260px is
```

### Line 27, above `//     '#toc-bar' from $topbar-height, which is why pages/_post.scss had to declare its own local`

```text
upstream's $sidebar-width, so the value looks like a paste that lost its name. Chirpy sizes
```

### Line 28, above `//     $toc-bar-height: 3rem rather than read this one. If an upgrade reintroduces a partial that`

```text
`#toc-bar` from $topbar-height, which is why pages/_post.scss had to declare its own local
```

### Line 29, above `//     reads $topbar-height, it gets a 260px navigation bar with no error.`

```text
$toc-bar-height: 3rem rather than read this one. If an upgrade reintroduces a partial that
```

### Line 30, above `// Two upstream names we dropped: $font-family-base and $font-family-heading. Type now comes from`

```text
reads $topbar-height, it gets a 260px navigation bar with no error.
```

### Line 31, above `// the --font-body and --font-display custom properties, so a re-added Chirpy partial that reads`

```text
Two upstream names we dropped: $font-family-base and $font-family-heading. Type now comes from
```

### Line 32, above `// either variable will fail to compile, which is the good failure. Take theirs on those two only.`

```text
the --font-body and --font-display custom properties, so a re-added Chirpy partial that reads
```

### Line 33, above `//`

```text
either variable will fail to compile, which is the good failure. Take theirs on those two only.
```

### Line 34, above `// ============================================================================`

```text

```

### Line 35, above `// VARIABLES - Static SCSS Variables`

```text
============================================================================
```

### Line 36, above `// ============================================================================`

```text
VARIABLES - Static SCSS Variables
```

### Line 37, above `// Static values that don't change between themes.`

```text
============================================================================
```

### Line 38, above `// Theme-specific values live in themes/_dark.scss, which is the only theme: _light.scss was`

```text
Static values that don't change between themes.
```

### Line 39, above `// deleted in the merge and base/_base.scss:12 includes the dark mixin unconditionally.`

```text
Theme-specific values live in themes/_dark.scss, which is the only theme: _light.scss was
```

### Line 40, above `@use 'sass:math';`

```text
deleted in the merge and base/_base.scss:12 includes the dark mixin unconditionally.
```

### Line 44, above `// FEATURE TOGGLES`

```text
============================================================================
```

### Line 45, above `// ============================================================================`

```text
FEATURE TOGGLES
```

### Line 46, above `// ============================================================================`

```text
============================================================================
```

### Line 49, above `// BLUR VALUES - Backdrop filters and effects`

```text
============================================================================
```

### Line 50, above `// ============================================================================`

```text
BLUR VALUES - Backdrop filters and effects
```

### Line 51, above `$blur-sm: 4px !default;`

```text
============================================================================
```

### Line 60, above `// TRANSITION TIMINGS - Consistent animation durations`

```text
============================================================================
```

### Line 61, above `// ============================================================================`

```text
TRANSITION TIMINGS - Consistent animation durations
```

### Line 62, above `$transition-fast: 300ms !default;`

```text
============================================================================
```

### Line 68, above `$ease-in-out: cubic-bezier(0.4, 0, 0.2, 1) !default;`

```text
Easing functions
```

### Line 73, above `// ANIMATION DURATIONS - Keyframe animation timings`

```text
============================================================================
```

### Line 74, above `// ============================================================================`

```text
ANIMATION DURATIONS - Keyframe animation timings
```

### Line 75, above `$float-duration: 10s !default;`

```text
============================================================================
```

### Line 84, above `// Z-INDEX LAYERS - Stacking context management`

```text
============================================================================
```

### Line 85, above `// ============================================================================`

```text
Z-INDEX LAYERS - Stacking context management
```

### Line 86, above `$z-background: -1 !default;`

```text
============================================================================
```

### Line 98, above `// SPACING SCALE - Consistent spacing system`

```text
============================================================================
```

### Line 99, above `// ============================================================================`

```text
SPACING SCALE - Consistent spacing system
```

### Line 100, above `$spacing-xs: 0.5rem !default;    // 8px`

```text
============================================================================
```

### Line 102, on the line `$spacing-xs: 0.5rem !default;`

```text
8px
```

### Line 103, on the line `$spacing-sm: 0.75rem !default;`

```text
12px
```

### Line 104, on the line `$spacing-md: 1rem !default;`

```text
16px
```

### Line 105, on the line `$spacing-lg: 1.5rem !default;`

```text
24px
```

### Line 106, on the line `$spacing-xl: 2rem !default;`

```text
32px
```

### Line 107, on the line `$spacing-2xl: 3rem !default;`

```text
48px
```

### Line 108, on the line `$spacing-3xl: 4rem !default;`

```text
64px
```

### Line 109, on the line `$spacing-4xl: 6rem !default;`

```text
96px
```

### Line 111, above `// BORDER RADIUS - Consistent rounding`

```text
============================================================================
```

### Line 112, above `// ============================================================================`

```text
BORDER RADIUS - Consistent rounding
```

### Line 113, above `$radius-sm: 6px !default;`

```text
============================================================================
```

### Line 123, above `// LAYOUT DIMENSIONS`

```text
============================================================================
```

### Line 124, above `// ============================================================================`

```text
LAYOUT DIMENSIONS
```

### Line 125, above `$btn-border-width: 3px !default;`

```text
============================================================================
```

### Line 130, above `// TOPBAR - Navigation dimensions`

```text
============================================================================
```

### Line 131, above `// ============================================================================`

```text
TOPBAR - Navigation dimensions
```

### Line 132, above `// READ BY NOTHING (measured 2026-09-02). Upstream's $topbar-height is 3rem and Chirpy sizes`

```text
============================================================================
```

### Line 133, above `// '#toc-bar' from it; 260px is upstream's $sidebar-width. See the landmine note in the banner`

```text
READ BY NOTHING (measured 2026-09-02). Upstream's $topbar-height is 3rem and Chirpy sizes
```

### Line 134, above `// at the top of this file before giving either of these a consumer.`

```text
`#toc-bar` from it; 260px is upstream's $sidebar-width. See the landmine note in the banner
```

### Line 135, above `$topbar-height: 260px !default;`

```text
at the top of this file before giving either of these a consumer.
```

### Line 140, above `// SIDEBAR - Legacy (set to 0 since using topbar)`

```text
============================================================================
```

### Line 141, above `// ============================================================================`

```text
SIDEBAR - Legacy (set to 0 since using topbar)
```

### Line 142, above `$sidebar-width: 0px !default;`

```text
============================================================================
```

### Line 149, above `// FRAMEWORK SIZES`

```text
============================================================================
```

### Line 150, above `// ============================================================================`

```text
FRAMEWORK SIZES
```

### Line 151, above `$search-max-width: 200px !default;`

```text
============================================================================
```

### Line 159, above `// CODE BLOCKS`

```text
============================================================================
```

### Line 160, above `// ============================================================================`

```text
CODE BLOCKS
```

### Line 161, above `$code-font-size: 0.85rem !default;`

```text
============================================================================
```

### Line 169, above `// TYPOGRAPHY`

```text
============================================================================
```

### Line 170, above `// ============================================================================`

```text
TYPOGRAPHY
```

### Line 171, above `// Font families`

```text
============================================================================
```

### Line 173, above `// Font weights (matching light/extralight from React)`

```text
Font families
```

### Line 175, above `$font-weight-extralight: 200 !default;`

```text
Font weights (matching light/extralight from React)
```

### Line 183, above `$font-size-xs: 0.75rem !default;    // 12px`

```text
Font sizes
```

### Line 184, on the line `$font-size-xs: 0.75rem !default;`

```text
12px
```

### Line 185, on the line `$font-size-sm: 0.875rem !default;`

```text
14px
```

### Line 186, on the line `$font-size-base: 1rem !default;`

```text
16px
```

### Line 187, on the line `$font-size-lg: 1.125rem !default;`

```text
18px
```

### Line 188, on the line `$font-size-xl: 1.25rem !default;`

```text
20px
```

### Line 189, on the line `$font-size-2xl: 1.5rem !default;`

```text
24px
```

### Line 190, on the line `$font-size-3xl: 1.875rem !default;`

```text
30px
```

### Line 191, on the line `$font-size-4xl: 2.25rem !default;`

```text
36px
```

### Line 192, on the line `$font-size-5xl: 3rem !default;`

```text
48px
```

### Line 193, on the line `$font-size-6xl: 3.75rem !default;`

```text
60px
```

### Line 194, on the line `$font-size-7xl: 4.5rem !default;`

```text
72px
```

### Line 196, above `$line-height-tight: 1.25 !default;`

```text
Line heights
```

### Line 202, above `// LANTERN COLORS - Static color references`

```text
============================================================================
```

### Line 203, above `// ============================================================================`

```text
LANTERN COLORS - Static color references
```

### Line 204, above `// Note: These are SCSS variables for calculations/functions.`

```text
============================================================================
```

### Line 205, above `// For actual theming, use the CSS custom properties in abstracts/_tokens.scss.`

```text
Note: These are SCSS variables for calculations/functions.
```

### Line 206, above `// MEASURED 2026-09-02: nothing reads any of the 17 names below.`

```text
For actual theming, use the CSS custom properties in abstracts/_tokens.scss.
```

### Line 207, above `$lantern-amber-50: #fffbeb !default;`

```text
MEASURED 2026-09-02: nothing reads any of the 17 names below.
```

### Line 227, above `// GLOW INTENSITIES - For calculations`

```text
============================================================================
```

### Line 228, above `// ============================================================================`

```text
GLOW INTENSITIES - For calculations
```

### Line 229, above `$glow-intensity-subtle: 0.03 !default;`

```text
============================================================================
```

### Line 236, above `// SHADOW DEPTHS - Box shadow layers`

```text
============================================================================
```

### Line 237, above `// ============================================================================`

```text
SHADOW DEPTHS - Box shadow layers
```

### Line 238, above `$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !default;`

```text
============================================================================
```

### Line 246, above `// GLASS EFFECT VALUES`

```text
============================================================================
```

### Line 247, above `// ============================================================================`

```text
GLASS EFFECT VALUES
```

### Line 248, above `$glass-opacity: 0.9 !default;`

```text
============================================================================
```

### Line 254, above `// GRID SYSTEM`

```text
============================================================================
```

### Line 255, above `// ============================================================================`

```text
GRID SYSTEM
```

### Line 256, above `$grid-columns: 12 !default;`

```text
============================================================================
```

### Line 263, above `// CONTAINER WIDTHS`

```text
============================================================================
```

### Line 264, above `// ============================================================================`

```text
CONTAINER WIDTHS
```

### Line 265, above `$container-sm: 640px !default;`

```text
============================================================================
```

### Line 273, above `// ASPECT RATIOS`

```text
============================================================================
```

### Line 274, above `// ============================================================================`

```text
ASPECT RATIOS
```

### Line 275, above `$aspect-square: math.div(1, 1) !default;`

```text
============================================================================
```
