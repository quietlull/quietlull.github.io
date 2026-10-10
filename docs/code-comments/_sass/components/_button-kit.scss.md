# Comments removed from `_sass/components/_button-kit.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/button-kit/button-kit.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `.kit-button {`

```text
button-kit - the buttons, the tags and the inline link.
   SLOP UNTIL RESOURCED. The shapes cite rework-stephan.html, which is our own build, so this
   component has no external provenance yet. A citation pointing inside this repo is not a source.
   Real outside sources: the hover ripple is phojanecki (codepen.io/phojanecki/pen/vwyZpY) and the
   rising fill is dennissnellenberg .btn-fill. See button-kit.md.
```

### Line 13, above `display: inline-block;`

```text
INLINE-BLOCK, AND THE REASON IS THE CLIP. `overflow: hidden` below does nothing to an inline
     box, and an <a> is inline by default, so the fill was only ever clipped because every page
     happened to put the button in a flex or grid parent - four unrelated rules doing this
     component's job (P529). The workbench shows the button bare, and that is where it spilled.
     The lab bench never showed it because it used <button>, which browsers draw inline-block.
     Measured on all live instances before this went in: no visible change.
```

### Line 38, above `.kit-button--primary:hover {`

```text
phojanecki ripple: the outline floats outward and fades while the core lights up.
```

### Line 73, above `.kit-button__fill {`

```text
dennissnellenberg .btn-fill: an oversized circle parked below that rises on hover.
   overflow:hidden on the button is what clips it into shape.
```

### Line 93, above `.kit-tag {`

```text
Tags: stephan chip geometry, phojanecki ripple on hover.
   `border: 0` IS LOAD-BEARING. This rule draws the edge with `outline` and never touches
   `border`, so a <button> keeps the browser's 2px outset bevel and a <span> does not - the same
   class rendering two different boxes, 44 of them on one page. See button-kit.md.
```

### Line 111, above `// .is-active was being set with nothing styling it - the class and aria-pressed were both correct`

```text
A selected filter pill keeps the hover look. Rod could not tell which filters were on, because
```

### Line 112, above `// and the pill looked identical either way.`

```text
.is-active was being set with nothing styling it - the class and aria-pressed were both correct
```

### Line 113, above `.kit-tag:hover,`

```text
and the pill looked identical either way.
```

### Line 125, above `// pill, the icon stops being greyscale, and the edge lights up.`

```text
Selected goes a step further than hover so the two never read the same. The gold wash fills the
```

### Line 126, above `.kit-tag.is-active {`

```text
pill, the icon stops being greyscale, and the edge lights up.
```

### Line 139, above `font-family: var(--font-body);`

```text
Body font, not the hand: T0-B reserves the hand for the logo. Rod picked the grow-underline.
```
