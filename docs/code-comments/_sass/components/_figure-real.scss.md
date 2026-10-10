# Comments removed from `_sass/components/_figure-real.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/figure-real/figure-real.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `/* Their geometry, verbatim. The caption is 0.875em rather than 14px because what they picked is`

```text
figure-real - catlikecoding's figure geometry, no mat, caption pushed LEFT (Rod's change).
   Six declarations transcribed verbatim, one flipped. Remixed, geometry theirs, left-align Rod's.
   THE TRAP: their `figure { text-align: center }` centres the caption AND the image, because an
   <img> is inline. Flipping it would drag the image flush left too, which Rod did not ask for.
   So the media is centred by its own rule and text-align: left goes on the figcaption only.
   See figure-real.md.
```

### Line 14, above `.fig {`

```text
Their geometry, verbatim. The caption is 0.875em rather than 14px because what they picked is
   the RATIO against 16px prose - copy the ratio, never the pixels.
```

### Line 27, above `display: block;`

```text
The split: centre the media here so the caption can go left without dragging it along.
```

### Line 35, on the line `text-align: left;`

```text
ours; theirs inherits center
```

### Line 40, above `.fig { page-break-inside: avoid; }`

```text
theirs, verbatim, and it costs nothing
```

### Line 44, above `.fig > video {`

```text
Video is SLOP - catlikecoding has no video rules at all, so none of this is sourced. It still
   has to exist: our videos ship without width or height, so without a ratio the page jumps on
   load. See figure-real.md.
```

### Line 48, on the line `aspect-ratio: 16 / 9;`

```text
a guess, until something reads each clip's real ratio
```

### Line 52, above `/* V1 - faithful. Body colour, separated by italic and size alone, like the source. */`

```text
Three versions, and they differ on one thing: how far the caption recedes. Still open.
   catlikecoding never colours its caption in either theme, which argues for V1.
   See figure-real.md.
```

### Line 56, above `.fig--v1 figcaption { color: var(--color-text, #f5f3ef); }`

```text
V1 - faithful. Body colour, separated by italic and size alone, like the source.
```

### Line 59, above `.fig--v2 figcaption { color: var(--color-silver, #a3a19d); }`

```text
V2 - what ships today. Silver, so it recedes on colour too. A departure from the source.
```

### Line 62, above `.fig--v3 figcaption { color: var(--color-silver, #a3a19d); font-size: 0.8em; }`

```text
V3 - quietest. Silver and a size step down. Ours; the source has no third degree.
```
