# Comments removed from `_sass/components/_stamp-callout.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/stamp-callout/stamp-callout.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `.stamp-callout {`

```text
stamp-callout - the TAKEAWAY block, kept deliberately unlike the TL;DR.
   Rod's own stamp CSS, recoloured amber-on-night in rework-harumaki. Remixed.
   --stamp-paper is one property, not two literals, because the paper and the perforated dots
   have to be the exact same colour. See stamp-callout.md.
```

### Line 12, above `--stamp-paper: color-mix(in srgb, var(--h1-color, #f86a03) 26%, var(--color-black));`

```text
Mixed off --h1-color so the stamp follows when Rod retunes the signature orange.
     Opaque on purpose: it sits over a live scene and any alpha muddied the paper.
     Rod 2026-08-24, replacing #1e160e which read as a hole. See stamp-callout.md.
```

### Line 31, above `inset: -7px -7px 0;`

```text
The perforation only shows where it overhangs, so a bottom inset of 0 flattens that edge
     and leaves the torn fringe on the other three. Rod 2026-08-24. See stamp-callout.md.
```

### Line 41, on the line `font-family: var(--font-display);`

```text
T0-B: serif display
```
