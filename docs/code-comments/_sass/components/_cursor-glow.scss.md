# Comments removed from `_sass/components/_cursor-glow.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/cursor-glow/cursor-glow.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `.cursorglow {`

```text
cursor-glow - a warm lantern vignette that follows the pointer.
   brittanychiang / merodev `.cursorglow`, recoloured purple to gold. Remixed, theirs.
   Mechanism moved 2026-09-01 from a repainting full-viewport background to a small box on a
   composited transform, for paint cost; the look is unchanged.
   Swap --cursor-glow-tint to --color-accent-cool for a cool wash. See cursor-glow.md.
```

### Line 13, on the line `--cursor-glow-radius: 350px;`

```text
Rod 2026-08-25. merodev shipped 520px
```

### Line 22, above `z-index: var(--z-cursor, 10050);`

```text
TOPMOST, and the number was never the hard part. This sat at 600 and still rendered
     under everything, because the markup nested it inside `#scrim` (z-index -1), whose own
     stacking context capped it. That nesting is fixed in _layouts/default.html; this token
     is what makes it beat the toasts and the skip link too.
```

### Line 28, above `pointer-events: none;`

```text
This box rides under the pointer at all times, so dropping this swallows every click.
```

### Line 36, above `transform: translate3d(`

```text
--cx/--cy are the cursor's client coords (written by cursor-glow.js). Shifting back by one
     radius puts the gradient centre exactly on the cursor. The -9999px default parks the whole
     box off-viewport until the first pointer event.
```

### Line 46, above `&.is-settled {`

```text
THE SETTLE. While the cursor is inside a region this document cannot track through, the
     lantern glides to that region's centre and holds instead of freezing wherever the cursor
     happened to cross. The transition is what sells it as deliberate - the same held position
     without it is exactly the bug it replaces. Only applied via the class, so ordinary pointer
     movement never pays for a transition.
```

### Line 55, above `}`

```text
WHY THE LANTERN CANNOT SIMPLY FOLLOW INTO THE COMMENTS.
     A cross-origin iframe consumes pointer events entirely: giscus.app is a different origin, so
     the moment the cursor crosses into that frame THIS document stops receiving `pointermove` and
     the lantern holds its last position. That is a browser security boundary, not our layering -
     the glow is z-index 10050 and `pointer-events: none`, so it is already drawn ABOVE the frame
     and is already not eating clicks. Verified by hit-testing three points over the frame: all
     three return the iframe.
     A FADE-ON-ENTER WAS TRIED AND REJECTED (Rod, 2026-09-03) - he wants the lantern to reach the
     comments, not to disappear before them. The only ways to actually track the cursor in there
     are to put `pointer-events: none` on the iframe, which would make the comments unusable, or
     for giscus to postMessage its coordinates out, which it does not do.
```
