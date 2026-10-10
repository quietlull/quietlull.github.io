# Comments removed from `_sass/components/_reference-links.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/reference-links/reference-links.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `.reference-links {`

```text
reference-links - the end-of-article reading list. No box, just a label and a list.
   From ronja-tutorials.com `.nested-links` (sources/ronja-tutorials-prose.md). Remixed, theirs.
   Rod picked it 2026-08-24: "A Ronja Tutorials, colour-only links". See reference-links.md.
```

### Line 35, above `.reference-links a {`

```text
Deliberately no colour or hover here - decisions.scss already styles every `.prose a`, and
   restating it is how two pages ended up with different link styles. This one line stays because
   spacing is ours and reference lists are where bare URLs turn up. See reference-links.md.
```
