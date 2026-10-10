# Comments removed from `_sass/abstracts/_animations.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 3, above `@use 'sass:math';`

```text
Animations — all keyframes for the lantern theme
```

### Line 7, above `@keyframes float {`

```text
--- Floating ---
```

### Line 25, above `@keyframes pulse {`

```text
--- Ambient opacity/scale ---
```

### Line 45, above `@keyframes shimmer {`

```text
--- Shimmer ---
```

### Line 53, above `@keyframes fade-in {`

```text
--- Fades ---
```

### Line 73, above `@keyframes spin {`

```text
--- Rotation ---
```

### Line 93, above `// REDUCED-MOTION KILL SWITCH`

```text
==========================================================================
```

### Line 94, above `// This list used to be shared with the breathing toggle. Breathing is gone (D43), so it now has`

```text
REDUCED-MOTION KILL SWITCH
```

### Line 95, above `// one job: honour prefers-reduced-motion for everything on the site that still animates.`

```text
This list used to be shared with the breathing toggle. Breathing is gone (D43), so it now has
```

### Line 96, above `// ==========================================================================`

```text
one job: honour prefers-reduced-motion for everything on the site that still animates.
```

### Line 97, above `$motion-selectors:`

```text
==========================================================================
```

### Line 118, above `$reduced-motion-extras:`

```text
Selectors that only reduced-motion needs to quiet.
```

### Line 131, above `#main-wrapper {`

```text
--- Page transitions ---
```

### Line 146, above `/* THE UNLOCK TOAST, built 2026-08-25 to the design Rod picked on the bench. Rod: "the achievement`

```text
--- Achievement toast ---
```

### Line 148, above `.achievement-toast {`

```text
THE UNLOCK TOAST, built 2026-08-25 to the design Rod picked on the bench. Rod: "the achievement
   popups are still the old ones ... do this when you can".
   IT WAS PICKED LONG AGO AND NEVER BUILT, and the lab said so at the time:
   redesign-lab/extracted/components/achievement-tile/achievement-tile.html:144 reads "Not rebuilt
   here: the unlock toast is already picked (dimden .box at 200 x 76, achievement-tests.html
   .t-pick)". So this is a transcription of an approved pick, not a new design.
   Every number below comes from `.t-pick` (redesign-lab/achievement-tests.html:163-168): 200x76,
   flex, 11px gap, 10px/15px padding, a 2px #383838 border, and the icon/title/description sizes.
   The source's own note says why it looks like this: "translucent so the live scene reads through,
   2px border, NO RADIUS, no glow" - so the 12px radius, the gold hairline and the two shadows the
   old toast carried are deliberately gone rather than forgotten.
   THIS IS EDITED IN PLACE RATHER THAN MOVED TO A COMPONENT FILE, on purpose. This file is
   UNLAYERED, so a new `_sass/components/_achievement-toast.scss` inside `@layer components` would
   have lost every property to the rules it was replacing - which is exactly the bug that made the
   top-bar wordmark paint in Caveat (P457). Replacing beats overriding across that boundary.
   THE FIXED 76px HEIGHT SUITS THE SCRIPT BETTER THAN THE OLD BOX DID: achievements.js stacks each
   toast at `activeToasts.length * 80`, a stride that only ever really worked against a fixed
   height, and the old toast's height varied with its text. 76 into 80 leaves a 4px gap.
```

### Line 188, above `.toast-title { font-size: 0.78rem; line-height: 1.25; }`

```text
No colour on the title: the pick sets none, so it takes the page's own text colour the way it
   did on the bench. The description is the one the source colours.
```

### Line 204, above `#achievement-debug {`

```text
--- Achievement debug panel ---
```

### Line 309, above `.under-construction {`

```text
--- Under construction page ---
```

### Line 335, above `/* The embers no-scroll block that stood here NEVER WORKED and is gone, 2026-08-25. Its own`

```text
--- 404 page ---
```

### Line 337, above `.not-found {`

```text
The embers no-scroll block that stood here NEVER WORKED and is gone, 2026-08-25. Its own
   comment claimed "this wins on specificity", and it did not: the rule it had to beat is
   `#main-wrapper > .container { min-height: 100vh }` (_base.scss), and the ID outscores an
   attribute plus a class, so the height never changed and the `overflow: hidden` was doing all
   the work by CLIPPING THE FOOTER. The working version lives in _sass/pages/_home.scss, which
   carries the ID in its selector. Kept as a note because two attempts died in this exact spot
   and the third person deserves the map.
```
