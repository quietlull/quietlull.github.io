# Comments removed from `_sass/components/_favicon.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/favicon/favicon.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `.favicon {`

```text
favicon - the home link. It leans toward the pointer, spins on hover, and overflow:hidden
   is what stops it escaping its box. See favicon.md.
```

### Line 17, on the line `background: var(--color-white);`

```text
the lantern icon is black, so it needs white behind it
```

### Line 21, above `.favicon--square {`

```text
Rod's 2026-08-11 shape pass: square by default, round only by exception.
```

### Line 38, above `.favicon__img {`

```text
Always attached and PAUSED, never added on hover, because a paused animation keeps the angle
   it reached - so the mark carries on from there instead of snapping upright (Rod 2026-08-18).
   .is-earned is the achievement state and spins without hover. See favicon.md.
```

### Line 50, above `.favicon.is-earned .favicon__img {`

```text
The shorthand resets play-state to running, which is what makes this one spin on its own.
```
