# Comments removed from `_sass/base/_index.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 7, above `// else stands on, not components, so they live here next to the old site's equivalents.`

```text
The redesign's three page-wide stylesheets, ported 2026-08-25. They are the ground everything
```

### Line 8, above `//   foundations - @layer reset      the palette shorthands and the page ground`

```text
else stands on, not components, so they live here next to the old site's equivalents.
```

### Line 9, above `//   decisions   - @layer prose      the type ladder and every settled text decision`

```text
foundations - @layer reset      the palette shorthands and the page ground
```

### Line 10, above `//   focus-ring  - @layer overrides  the global :focus-visible ring (WCAG 2.4.7 / 2.4.11)`

```text
decisions   - @layer prose      the type ladder and every settled text decision
```

### Line 11, above `//`

```text
focus-ring  - @layer overrides  the global :focus-visible ring (WCAG 2.4.7 / 2.4.11)
```

### Line 12, above `// SOURCE ORDER BETWEEN THESE THREE MEANS NOTHING and must not be read as a cascade - each sits in`

```text

```

### Line 13, above `// a different layer, and layer order decides who wins, not who loaded last. Re-measured 2026-09-02`

```text
SOURCE ORDER BETWEEN THESE THREE MEANS NOTHING and must not be read as a cascade - each sits in
```

### Line 14, above `// and still true: foundations opens '@layer reset', decisions '@layer prose', focus-ring`

```text
a different layer, and layer order decides who wins, not who loaded last. Re-measured 2026-09-02
```

### Line 15, above `// '@layer overrides'. It is a narrower claim than the one that used to sit in`

```text
and still true: foundations opens `@layer reset`, decisions `@layer prose`, focus-ring
```

### Line 16, above `// '_sass/components/_index.scss', which said order does not matter because no two files share a`

```text
`@layer overrides`. It is a narrower claim than the one that used to sit in
```

### Line 17, above `// selector, and was wrong for the reason spelled out there. 'node tools/css-order-check.mjs' is`

```text
`_sass/components/_index.scss`, which said order does not matter because no two files share a
```

### Line 18, above `// what proves it now, and it also fails if any of these three ever emits a rule outside its layer.`

```text
selector, and was wrong for the reason spelled out there. `node tools/css-order-check.mjs` is
```

### Line 19, above `//`

```text
what proves it now, and it also fails if any of these three ever emits a rule outside its layer.
```

### Line 20, above `// They are listed AFTER the old site's partials for one reason that DOES matter: the old partials`

```text

```

### Line 21, above `// are UNLAYERED, and unlayered CSS beats every layer. So where these three and the old site style`

```text
They are listed AFTER the old site's partials for one reason that DOES matter: the old partials
```

### Line 22, above `// the same thing, the old site still wins and the live pages keep rendering as they do today.`

```text
are UNLAYERED, and unlayered CSS beats every layer. So where these three and the old site style
```

### Line 23, above `// That is intended for the merge, not an accident.`

```text
the same thing, the old site still wins and the live pages keep rendering as they do today.
```

### Line 24, above `@forward 'foundations';`

```text
That is intended for the merge, not an accident.
```
