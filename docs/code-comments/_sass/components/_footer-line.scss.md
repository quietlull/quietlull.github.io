# Comments removed from `_sass/components/_footer-line.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/footer-line/footer-line.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `/* EVERY NUMBER BELOW WAS MEASURED OFF '.labtag', not guessed, after Rod asked three times for`

```text
footer-line - the whole footer as one quiet line.
   OURS, not sourced. It is the lab pages' own `.labtag`, which Rod promoted to a real element on
   2026-08-22: "i actually really like the way we do our lab footers". Never file it as a
   reference site's. It reads as a footnote, not a second nav, because the top bar already has
   the nav. The one deliberate change from the lab tag: that one is fixed-position, this one sits
   at the end of the document. See footer-line.md.
```

### Line 14, above `.footer-line {`

```text
EVERY NUMBER BELOW WAS MEASURED OFF `.labtag`, not guessed, after Rod asked three times for
   an exact match. It computes 10px / ui-monospace / weight 400 / tracking normal / warm
   rgba(245,243,239,.45). The old version missed on all four, and the colour was the tell: it used
   the blue-grey --color-muted on a surface the palette law keeps warm.
   Sizes are flat px on purpose - the tag is 10px flat and a rem would rescale it.
   THIS FILE IS THE ONLY COPY. All six pages used to carry their own, and one drifted.
   See footer-line.md.
```

### Line 26, above `gap: 0.3rem 4px;`

```text
Spacing measured off the tag too. The footer was 57.8px with 44.8 of it padding, so it read
     as a bar where the tag reads as a line. 29px now. See footer-line.md.
```

### Line 30, above `padding: 8px 14px;`

```text
14px because the lab tag is `left: 14px`. It belongs on the COMPONENT, not the wrapper -
     the wrapper WAS the problem, four pages had one and two did not. Flat px, not vw.
```

### Line 41, above `.footer-wrap { width: 100%; }`

```text
The footer spans the page and anchors left, not to the content column (Rod). The inset lives
   on .footer-line, so a page can skip this wrapper entirely and still look the same.
```

### Line 45, above `.footer-line .footer-line__name {`

```text
The name is the way home, and it reads as a signature only because it is the one full-opacity
   thing on the line. Keep the doubled selector: plain `.footer-line a` outranks the single class
   and would paint the name gold like every other link.
```

### Line 57, above `.footer-line__item + .footer-line__item::before {`

```text
Generated separators, so the markup stays a plain list and no middot can orphan at a wrap.
```

### Line 61, above `margin-right: 4px;`

```text
4px each side lands on the tag's 11px separator. It used to be 24.
```

### Line 66, above `.footer-line__name {`

```text
No uppercase, no tracking: the lab tag has neither, and "exactly" meant the name too.
```
