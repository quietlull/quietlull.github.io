# Comments removed from `_sass/pages/_portal.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// The old glass-door page it replaced is gone; nothing here is shared with it.`

```text
The portal at `/`, ported 2026-08-26 from the inline <style> of `redesign-lab/final-portal.html`.
```

### Line 2, above `// UNLAYERED, like every other page partial, so it beats '@layer components' (P200 - pages may`

```text
The old glass-door page it replaced is gone; nothing here is shared with it.
```

### Line 3, above `// override). Only two rules use that: '.pwin' and '.centre__mark', and both say so below.`

```text
UNLAYERED, like every other page partial, so it beats `@layer components` (P200 - pages may
```

### Line 4, above `// The page is a viewport-locked column: the field takes whatever the page does not.`

```text
override). Only two rules use that: `.pwin` and `.centre__mark`, and both say so below.
```

### Line 6, above `.pground {`

```text
The page is a viewport-locked column: the field takes whatever the page does not.
```

### Line 14, above `.field {`

```text
`min-height: 0` or the flex item refuses to shrink past its content and the scrollbar comes back.
```

### Line 23, above `body:has(.pground)::before {`

```text
The portal is the one page with no glow behind it - the three.js scene is the whole background.
```

### Line 28, above `// so the window can render alone on the bench; here the drag engine owns the position and the size.`

```text
OVERRIDES the component. `_portal-window.scss` sets `position: relative` and fixed fallback sizes
```

### Line 29, above `.pwin {`

```text
so the window can render alone on the bench; here the drag engine owns the position and the size.
```

### Line 40, above `.centre {`

```text
272x165 is the area the Space Jam layout reserves for the centre. `--pscale` comes from the JS.
```

### Line 50, above `.centre__mark {`

```text
OVERRIDES `.line-boil-text` in `@layer components`, which would otherwise pick the boil's own colour.
```

### Line 61, above `// 500px is measured: at 600px it collides with the ArtStation window at 1280 and 1440x900.`

```text
Absolutely positioned against the same centre point, so it costs the window field zero height.
```

### Line 62, above `// ANCHORED TO THE NAME, NOT TO THE MIDDLE. Rod 2026-08-25: "the welcome to my page needs to be`

```text
500px is measured: at 600px it collides with the ArtStation window at 1280 and 1440x900.
```

### Line 63, above `// placed relative to the name boil text make it 20px below that". It was 'top: 50% + 3.2rem',`

```text
ANCHORED TO THE NAME, NOT TO THE MIDDLE. Rod 2026-08-25: "the welcome to my page needs to be
```

### Line 64, above `// measured from the middle of the window field, and the name is NOT measured from there, so the`

```text
placed relative to the name boil text make it 20px below that". It was `top: 50% + 3.2rem`,
```

### Line 65, above `// gap drifted with the viewport: 150px seen at 1029x918 against the 51px the number claimed. The`

```text
measured from the middle of the window field, and the name is NOT measured from there, so the
```

### Line 66, above `// 99px of difference is three things and the big one moves. 86px is the empty lower half of`

```text
gap drifted with the viewport: 150px seen at 1029x918 against the 51px the number claimed. The
```

### Line 67, above `// '.centre' (its box is 165px x --pscale and the name sits at the TOP of it), 5.7px is the space`

```text
99px of difference is three things and the big one moves. 86px is the empty lower half of
```

### Line 68, above `// under the name's letters, 7.2px the space over this line's.`

```text
`.centre` (its box is 165px x --pscale and the name sits at the TOP of it), 5.7px is the space
```

### Line 69, above `// So the calc walks DOWN FROM THE NAME instead: field middle, back up half of '.centre''s scaled`

```text
under the name's letters, 7.2px the space over this line's.
```

### Line 70, above `// box to reach its top edge, down the name's own line box (its font-size x the 1.15 line-height),`

```text
So the calc walks DOWN FROM THE NAME instead: field middle, back up half of `.centre`'s scaled
```

### Line 71, above `// then the 20px he asked for. The two font-metric terms are folded into the constants: 1.15 minus`

```text
box to reach its top edge, down the name's own line box (its font-size x the 1.15 line-height),
```

### Line 72, above `// 0.1585 is the 0.9915, taking off the space under the letters, and 12.8 is his 20 minus the 7.2`

```text
then the 20px he asked for. The two font-metric terms are folded into the constants: 1.15 minus
```

### Line 73, above `// over this line's.`

```text
0.1585 is the 0.9915, taking off the space under the letters, and 12.8 is his 20 minus the 7.2
```

### Line 74, above `// MEASURED, NOT DERIVED. Those ratios come off the live page with canvas ink metrics, max across`

```text
over this line's.
```

### Line 75, above `// the three Lineboil faces, and the font API quantises them to whole pixels, so the gap lands`

```text
MEASURED, NOT DERIVED. Those ratios come off the live page with canvas ink metrics, max across
```

### Line 76, above `// within about half a pixel of 20 rather than exactly on it. They also encode THESE TWO STRINGS,`

```text
the three Lineboil faces, and the font API quantises them to whole pixels, so the gap lands
```

### Line 77, above `// so changing the name or this line means re-measuring.`

```text
within about half a pixel of 20 rather than exactly on it. They also encode THESE TWO STRINGS,
```

### Line 78, above `// IT HOLDS AT EVERY SIZE, which the old number could not: both of the terms that move are in the`

```text
so changing the name or this line means re-measuring.
```

### Line 79, above `// calc, so --pscale and the 3.5vw clamp are tracked instead of ignored.`

```text
IT HOLDS AT EVERY SIZE, which the old number could not: both of the terms that move are in the
```

### Line 80, above `// THE TUNER WILL FLATTEN THIS. 'redesign-lab/portal-ratios.html' emits 'top: <rem>' for its`

```text
calc, so --pscale and the 3.5vw clamp are tracked instead of ignored.
```

### Line 81, above `// 'welcome line' and 'gap under the name' dials, so tuning either one replaces this calc with a`

```text
THE TUNER WILL FLATTEN THIS. `redesign-lab/portal-ratios.html` emits `top: <rem>` for its
```

### Line 82, above `// fixed number and the drift comes straight back. That emit needs updating before those dials are`

```text
`welcome line` and `gap under the name` dials, so tuning either one replaces this calc with a
```

### Line 83, above `// used again.`

```text
fixed number and the drift comes straight back. That emit needs updating before those dials are
```

### Line 84, above `.centre__welcome {`

```text
used again.
```
