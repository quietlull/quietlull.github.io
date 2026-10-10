# Comments removed from `_sass/components/_index.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `//`

```text
COMPONENTS
```

### Line 2, above `// 'buttons' and 'popups' are the OLD site's and stay put - this port is additive.`

```text

```

### Line 3, above `// Under them, the redesign's 24 stylesheets, ported 2026-08-25 from`

```text
`buttons` and `popups` are the OLD site's and stay put - this port is additive.
```

### Line 4, above `// redesign-lab/extracted/components/<name>/<name>.css, one partial each.`

```text
Under them, the redesign's 24 stylesheets, ported 2026-08-25 from
```

### Line 5, above `//`

```text
redesign-lab/extracted/components/<name>/<name>.css, one partial each.
```

### Line 6, above `// EVERY PORTED FILE OPENS WITH THE @layer ORDER STATEMENT AND WRAPS ITS BODY IN`

```text

```

### Line 7, above `// '@layer components'. Repeating it 24 times is correct, not redundant - it is idempotent, so`

```text
EVERY PORTED FILE OPENS WITH THE @layer ORDER STATEMENT AND WRAPS ITS BODY IN
```

### Line 8, above `// each file is right on its own whatever loads it. The footgun: unlayered CSS beats every layer,`

```text
`@layer components`. Repeating it 24 times is correct, not redundant - it is idempotent, so
```

### Line 9, above `// so a file that loses its wrapper silently wins over everything (D36, docs/TRAPS.md).`

```text
each file is right on its own whatever loads it. The footgun: unlayered CSS beats every layer,
```

### Line 10, above `//`

```text
so a file that loses its wrapper silently wins over everything (D36, docs/TRAPS.md).
```

### Line 11, above `// ORDER IS ALPHABETICAL, and that is a choice rather than a default: the six final-* lab pages`

```text

```

### Line 12, above `// disagree about load order, so there is no single lab order to reproduce.`

```text
ORDER IS ALPHABETICAL, and that is a choice rather than a default: the six final-* lab pages
```

### Line 13, above `//`

```text
disagree about load order, so there is no single lab order to reproduce.
```

### Line 14, above `// ORDER MATTERS. THIS USED TO CLAIM IT DID NOT, and that claim cost the wordmark weeks in the`

```text

```

### Line 15, above `// wrong font and the wrong colour (docs/REQUESTS.md P457). The old wording said no two of these`

```text
ORDER MATTERS. THIS USED TO CLAIM IT DID NOT, and that claim cost the wordmark weeks in the
```

### Line 16, above `// files declare the same SELECTOR, so nothing here can shadow anything. That is true, and it is`

```text
wrong font and the wrong colour (docs/REQUESTS.md P457). The old wording said no two of these
```

### Line 17, above `// the wrong test. An element carries SEVERAL component classes at once, so two DIFFERENT`

```text
files declare the same SELECTOR, so nothing here can shadow anything. That is true, and it is
```

### Line 18, above `// selectors land on the SAME element: the wordmark is 'class="top-bar__logo line-boil-text"', so`

```text
the wrong test. An element carries SEVERAL component classes at once, so two DIFFERENT
```

### Line 19, above `// '_top-bar.scss' and '_line-boil.scss' both style it, both one class deep, both in this layer.`

```text
selectors land on the SAME element: the wordmark is `class="top-bar__logo line-boil-text"`, so
```

### Line 20, above `// Nothing but the order of these lines separates them.`

```text
`_top-bar.scss` and `_line-boil.scss` both style it, both one class deep, both in this layer.
```

### Line 21, above `//`

```text
Nothing but the order of these lines separates them.
```

### Line 22, above `// WHAT PROVES THE ORDER SAFE IS THE CHECKER, NOT THIS COMMENT.`

```text

```

### Line 23, above `//   node tools/css-order-check.mjs`

```text
WHAT PROVES THE ORDER SAFE IS THE CHECKER, NOT THIS COMMENT.
```

### Line 24, above `// It reads the built CSS and every rendered page, and fails on any property that two partials`

```text
node tools/css-order-check.mjs
```

### Line 25, above `// decide by load order alone. Three places depend on this order deliberately, and each is pinned`

```text
It reads the built CSS and every rendered page, and fails on any property that two partials
```

### Line 26, above `// WITH ITS REASON in that file's PINNED list:`

```text
decide by load order alone. Three places depend on this order deliberately, and each is pinned
```

### Line 27, above `//   'top-bar' after 'line-boil'                    the wordmark's colour, Rod's call (P457)`

```text
WITH ITS REASON in that file's PINNED list:
```

### Line 28, above `//   'project-cards-expensive' after 'merged-card'  the card hover suppressor`

```text
`top-bar` after `line-boil`                    the wordmark's colour, Rod's call (P457)
```

### Line 29, above `//   'portal-window' after 'button-kit'             the Enter button's placement overrides`

```text
`project-cards-expensive` after `merged-card`  the card hover suppressor
```

### Line 30, above `// Re-sorting these lines is allowed. A sort that flips one of those three winners fails the`

```text
`portal-window` after `button-kit`             the Enter button's placement overrides
```

### Line 31, above `// checker, which is the whole point of it.`

```text
Re-sorting these lines is allowed. A sort that flips one of those three winners fails the
```

### Line 32, above `//`

```text
checker, which is the whole point of it.
```

### Line 33, above `// 'cursor-coords' is in the closure but ships JS only; there is no CSS to port.`

```text

```

### Line 34, above `@forward 'buttons';`

```text
`cursor-coords` is in the closure but ships JS only; there is no CSS to port.
```
