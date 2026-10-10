# Comments removed from `_sass/pages/_about.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// The lab scoped all of this under 'body.spacious', its variant switch. There is one About design`

```text
About, ported 2026-08-26 from the inline <style> of `redesign-lab/final-about.html`.
```

### Line 2, above `// now, so the scope is the page root instead - and it has to stay scoped, because '.wrapper-content-column', `

```text
The lab scoped all of this under `body.spacious`, its variant switch. There is one About design
```

### Line 3, above `// '.hero' and '.sect' are names other pages and Bootstrap also use.`

```text
now, so the scope is the page root instead - and it has to stay scoped, because `.wrapper-content-column`, `.band`,
```

### Line 4, above `// Rod's model, 2026-08-23: "about page is the landing page except the about me is the hero, the`

```text
`.hero` and `.sect` are names other pages and Bootstrap also use.
```

### Line 5, above `// achievements are the project cards." The numbers come from his own landing, not a reference site.`

```text
Rod's model, 2026-08-23: "about page is the landing page except the about me is the hero, the
```

### Line 6, above `#about-page {`

```text
achievements are the project cards." The numbers come from his own landing, not a reference site.
```

### Line 15, above `.wrapper-content-column {`

```text
The content column. 60.063rem is the landing's own width.
```

### Line 24, above `.band {`

```text
The landing's rhythm: 20px above and below every band.
```

### Line 30, above `.hero {`

```text
Rod's tune. It does not subtract the top bar - the bar is sticky and takes real layout space.
```

### Line 39, above `// while the panel still sizes to its content. Merging the two moves the block 32px (measured).`

```text
`flex: 1` lives HERE and not on the panel, which is what keeps the hero a full first screen
```

### Line 40, above `.hero__fill {`

```text
while the panel still sizes to its content. Merging the two moves the block 32px (measured).
```

### Line 48, above `.hero .sect {`

```text
The panel hugs its content. Stretching it to the hero made it read as a huge box, not a full one.
```

### Line 56, above `.sect,`

```text
Solid blue with an amber rule, Rod 2026-08-24: the grey "doesnt match any other backing element".
```

### Line 71, above `.biorow {`

```text
dimden's horizontal spacing: a 225px portrait rail with the gutter coming from the panel padding.
```

### Line 86, above `// because 'ch' resolves against the element's own font-size and drifts (docs/TRAPS.md).`

```text
Type is the post's, so the two pages read the same. The measure is px x count, never `ch`,
```

### Line 87, above `.sect p,`

```text
because `ch` resolves against the element's own font-size and drifts (docs/TRAPS.md).
```

### Line 107, above `.bio-h {`

```text
Only font-family and margin are page-local. Size, weight and colour come from the ladder.
```

### Line 114, above `// carry a 143% ascent/descent that grew the heading 2px, '.line-boil-text' paints H0 orange inside a gold`

```text
OVERRIDES `.line-boil-text` in `@layer components`, and each line fixes a measured defect. The boil faces
```

### Line 115, above `// heading, and every boiled glyph is a break opportunity so "Rod" broke as "Ro / d".`

```text
carry a 143% ascent/descent that grew the heading 2px, `.line-boil-text` paints H0 orange inside a gold
```

### Line 116, above `.bio-h .line-boil-text {`

```text
heading, and every boiled glyph is a break opportunity so "Rod" broke as "Ro / d".
```

### Line 139, above `.section-head { margin: 0 0 0.05rem; }`

```text
OVERRIDES the `section-head` component's 1.8rem. Rod's spacing, 2026-08-25.
```

### Line 151, above `// and opens a horizontal overflow.`

```text
`width: 100%` of a stacked full-width wrapper, never `100vw` - that includes the scrollbar
```

### Line 152, above `.scenewide {`

```text
and opens a horizontal overflow.
```

### Line 158, above `.scenewide__hole { height: 85vh; }`

```text
85vh is the landing's own reservation, so the scene gets the same room on both pages.
```
