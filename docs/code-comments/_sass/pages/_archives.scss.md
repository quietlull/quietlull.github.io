# Comments removed from `_sass/pages/_archives.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// with '::before' pseudo-elements at hardcoded left offsets, a pulsing dot per year, a second dot`

```text
The archive, 2026-08-31. This file used to hold Chirpy's timeline: a 4px vertical rule drawn
```

### Line 2, above `// per post, and a striped 'nth-child(odd)' gradient on every row. All of it hung off '#archives',`

```text
with `::before` pseudo-elements at hardcoded left offsets, a pulsing dot per year, a second dot
```

### Line 3, above `// and that id is gone with the markup - '_layouts/archives.html' is now built from the same`

```text
per post, and a striped `nth-child(odd)` gradient on every row. All of it hung off `#archives`,
```

### Line 4, above `// components as the tag pages.`

```text
and that id is gone with the markup - `_layouts/archives.html` is now built from the same
```

### Line 5, above `// Everything visible on this page is a component now - page-title-desc, entry-row, empty-state -`

```text
components as the tag pages.
```

### Line 7, above `// so what is left here is the column, the year headings and the gaps. Same shape as '_tags.scss'`

```text
Everything visible on this page is a component now - page-title-desc, entry-row, empty-state -
```

### Line 8, above `// and '_ramblings.scss', because it is the same page with a different filter.`

```text
so what is left here is the column, the year headings and the gaps. Same shape as `_tags.scss`
```

### Line 9, above `// Page stylesheets are UNLAYERED on purpose (D36), so anything written here beats every`

```text
and `_ramblings.scss`, because it is the same page with a different filter.
```

### Line 11, above `// component. Keep that in mind before adding a rule: it is a page override, not a suggestion.`

```text
Page stylesheets are UNLAYERED on purpose (D36), so anything written here beats every
```

### Line 12, above `#archives-page {`

```text
component. Keep that in mind before adding a rule: it is a page override, not a suggestion.
```

### Line 19, above `// 'full_bleed' list in _layouts/default.html, so its parent is the Bootstrap content column`

```text
100% rather than 92vw, for the reason written out in `_tags.scss`: this page is not in the
```

### Line 20, above `// rather than the viewport, and the cap has to be measured against the parent.`

```text
`full_bleed` list in _layouts/default.html, so its parent is the Bootstrap content column
```

### Line 21, above `max-width: 100%;`

```text
rather than the viewport, and the cap has to be measured against the parent.
```

### Line 37, above `// own 'h1 { margin: 0 }' and pushes the title down. Same restatement as ramblings and projects.`

```text
`main h1 { margin-top: 3rem }` in base/_typography.scss is unlayered, so it beats the ladder's
```

### Line 38, above `.page-heading__title { margin: 0; }`

```text
own `h1 { margin: 0 }` and pushes the title down. Same restatement as ramblings and projects.
```

### Line 41, above `// and nothing about them is set here. Only the space around it is this page's business.`

```text
The year takes the H2 rung whole - size, weight and colour all come from base/_decisions.scss
```

### Line 42, above `.arc-year { margin-bottom: 1rem; }`

```text
and nothing about them is set here. Only the space around it is this page's business.
```

### Line 45, above `// because the title block above it already brings its own 37px of padding.`

```text
The rung's own 4.5rem top margin is the gap BETWEEN years. The first year does not need one,
```

### Line 46, above `.arc-group:first-of-type .arc-year { margin-top: 0; }`

```text
because the title block above it already brings its own 37px of padding.
```
