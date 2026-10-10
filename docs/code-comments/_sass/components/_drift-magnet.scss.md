# Comments removed from `_sass/components/_drift-magnet.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/drift-magnet/drift-magnet.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `.dm-row {`

```text
drift-magnet - the drifting social circles. drift-magnet.js owns the motion, this owns shape.
   Rising fill from dennissnellenberg.com/work .btn-fill (sources/dennissnellenberg-buttons.md),
   recoloured to tokens. See drift-magnet.md.
```

### Line 13, above `gap: min(1.625rem, 8.7957%);`

```text
The percentages here and on .dm-social's width make 4 circles + 3 gaps come to exactly 100%
     of the row, so it squeezes instead of wrapping (Rod 2026-08-24). Do not round them.
     The wrap used to fire at viewport 1429 and cost 94.39px of rail height. See drift-magnet.md.
```

### Line 23, above `.dm-social {`

```text
The circles, in harumaki's register: right of the hero.
```

### Line 39, above `.dm-social__fill {`

```text
The fill: an oversized circle parked below that rises to cover on hover. Geometry is verbatim.
```

### Line 68, above `.dm-social:hover .dm-social__glyph {`

```text
The glyph flips to dark as the fill covers it (dennissnellenberg .btn-text-inner.change).
```

### Line 73, above `.dm-favicon {`

```text
favicon-style: magnetic but clamped to its box, and it spins on hover.
```

### Line 118, above `.dm-flash {`

```text
Click flash, and this one ships - it is not demo furniture. The border lights up, flies
   outward and fades. Opt in with data-click-flash; drift-magnet.js toggles .dm-flash.
   outline and box-shadow paint outside the box, so overflow:hidden does not clip them.
   phojanecki (codepen.io/phojanecki/pen/vwyZpY), the same ripple as button-kit.
```
