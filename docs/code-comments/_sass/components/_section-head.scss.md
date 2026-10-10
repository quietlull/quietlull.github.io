# Comments removed from `_sass/components/_section-head.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/section-head/section-head.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `.section-head {`

```text
section-head - a centred label with an ornament each side and a hairline under.
   The flanking-ornament idea is harumakigohan.com's; theirs are drawn PNGs, ours is a typed `~`
   standing in until the artwork exists. Remixed, idea-origin Rod.
   Rod picked candidate C on 2026-08-22, minus the number, plus the hairline.
   The container is an <h2> on purpose - a 2.4rem label outside the heading outline is invisible
   to anyone navigating by headings. See section-head.md.
```

### Line 24, above `}`

```text
Looks half-empty on purpose. font-weight, font-size and color all lived here and all beat
     the type ladder in decisions.scss, which owns this class. The ladder is the system, the
     component defers. Do not put them back. See section-head.md.
```

### Line 29, above `.section-head__name::before {`

```text
The flanking ornament, a typed stand-in for harumaki's drawn wave. No screen reader reads
   generated content as text, so the label still comes through clean.
```

### Line 41, above `.section-head__name {`

```text
The label links to its own section (Rod 2026-08-22). It inherits colour and ornament, so it
   reads as a heading until you touch it, not as navigation.
```
