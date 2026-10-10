# Comments removed from `_sass/pages/_projects.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// The old Bootstrap card grid it replaced is gone; nothing here is shared with it.`

```text
Projects, ported 2026-08-25 from the inline <style> of `redesign-lab/final-projects.html`.
```

### Line 2, above `// Scoped to the page root - '.wrapper-content-column' is Bootstrap's too, and '.pv2-*' is only unique by luck`

```text
The old Bootstrap card grid it replaced is gone; nothing here is shared with it.
```

### Line 3, above `#projects-page {`

```text
Scoped to the page root - `.wrapper-content-column` is Bootstrap's too, and `.pv2-*` is only unique by luck.
```

### Line 18, above `// own 'h1 { margin: 0 }'. Same restatement as ramblings, same reason: that rule still spaces`

```text
`main h1 { margin-top: 3rem }` in base/_typography.scss is unlayered and beats the ladder's
```

### Line 19, above `// the h1 on the pages whose markup is not ported yet.`

```text
own `h1 { margin: 0 }`. Same restatement as ramblings, same reason: that rule still spaces
```

### Line 20, above `.page-heading__title { margin: 0; }`

```text
the h1 on the pages whose markup is not ported yet.
```

### Line 45, above `// 'main { line-height: 1.75 }' reached in and made every pill 2.5px taller than the bench's.`

```text
`line-height: 1` is live-only. Bootstrap's reboot makes a button inherit line-height, so
```

### Line 46, above `// The 16px icon is what sets the row height, exactly as it does on the bench.`

```text
`main { line-height: 1.75 }` reached in and made every pill 2.5px taller than the bench's.
```

### Line 47, above `.kit-tag {`

```text
The 16px icon is what sets the row height, exactly as it does on the bench.
```

### Line 86, above `.pv2-descbox {`

```text
A fixed box with a three-line clamp, so a long blurb cannot push the meta row off the card.
```

### Line 112, above `// room for a description and a meta rule the bench card does not carry.`

```text
The cover and its glass sheet are shorter here than the component's default, so the body has
```

### Line 113, above `.pv2-grid .card-cover {`

```text
room for a description and a meta rule the bench card does not carry.
```

### Line 182, above `.pill-icon--tool { color: var(--pill-icon-tool); }`

```text
THE TAG ICON COLOURS. Moved off inline `style=` attributes 2026-09-02 (STYLE.md Rule 13,
     D42); the values are `--pill-icon-*` in abstracts/_tokens.scss, which also carries the
     old-to-new mapping and the open question on the VFX blue. Nothing here names a colour.

     SCOPED TO THE PAGE, NOT TO `.pv2-filters`, and that is a fix rather than the original shape.
     The same seven icons are painted TWICE on this page: once in the filter row, and once on
     every project card via `_includes/tag-badges.html`. Scoping to the filter row meant the row
     moved to tokens while the cards below kept their old hex, so one icon rendered two colours
     on one screen. MEASURED: badges render on exactly two pages, tech-art/projects and
     game-design/projects, and both carry `#projects-page`, so this scope covers every instance
     and nothing else.

     These beat `.kit-tag:hover`, so an icon keeps its own colour when its pill lights up, which
     is what the inline attributes did too. The hover look is unchanged.
```

### Line 208, above `.pill-icon--shader {`

```text
The shader icon is painted by a ramp rather than a colour: the gradient fills the box, the
     box is clipped to the letterform, and the glyph's own fill goes transparent so the ramp
     shows through. Transcribed from the inline rule it replaces, prefixes and all.
```
