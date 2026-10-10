# Comments removed from `_sass/base/_focus-ring.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/focus-ring.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `:focus-visible {`

```text
THE GLOBAL FOCUS RING. Bootstrap 5.3's focus-ring helper plus dev.to hybrid_alex's
   box-shadow outlines (sources/focus-ring.md). Remixed, theirs.
   It lives in its own file because the lab kept it in generic.css, which ZERO of the six final
   pages linked - so the ring did not exist anywhere, and six components that declined to write
   their own on the grounds that they "inherit the global ring" were inheriting nothing. That was
   a WCAG 2.4.7 and 2.4.11 failure on every page.
   `outline: 2px solid transparent` IS NOT DECORATION. Windows High Contrast Mode drops
   box-shadows entirely, and the transparent outline is what survives there and becomes the real
   ring. Never "clean it up" to outline: none.
```

### Line 25, above `:root {`

```text
--nav-h was USED nine times in toc-real and DEFINED NOWHERE, so every use fell back to 56px
   while the real bar is 96, and 107.6 at <=780px. The mobile TOC bar ended up UNDER the top bar,
   entirely hidden, with the sticky rail 40px below it.
   DERIVED from the real bar rather than restated, so it cannot drift again.
```
