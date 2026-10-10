# Comments removed from `_sass/pages/_section-landing.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// The old centred-title page it replaced is gone; nothing here is shared with it.`

```text
A section landing, ported 2026-08-25 from the inline <style> of `redesign-lab/final-landing.html`.
```

### Line 2, above `// Scoped to the page root, because '.wrapper-content-column', '.wrapper-section-band' and '.hero' are names o`

```text
The old centred-title page it replaced is gone; nothing here is shared with it.
```

### Line 3, above `// also use, and '.hero' in particular is one character long.`

```text
Scoped to the page root, because `.wrapper-content-column`, `.wrapper-section-band` and `.hero` are names other pages and Bootstrap
```

### Line 4, above `// NOT DECLARED HERE: '.section-head__name' text-decoration and display. The lab restated both and`

```text
also use, and `.hero` in particular is one character long.
```

### Line 5, above `// the component already says exactly that, so the copy was doing nothing but hiding the owner.`

```text
NOT DECLARED HERE: `.section-head__name` text-decoration and display. The lab restated both and
```

### Line 6, above `#section-landing {`

```text
the component already says exactly that, so the copy was doing nothing but hiding the owner.
```

### Line 9, above `.wrapper-content-column {`

```text
The content column and the rhythm between sections, both the lab's own numbers.
```

### Line 20, above `.hero {`

```text
The hero ends at the fold. It DOES subtract the bar, which About deliberately does not.
```

### Line 27, above `.hero__name,`

```text
The heading for anyone reading rather than looking - the visible mark is the vertical columns.
```

### Line 67, above `.hero__clock {`

```text
The clock keeps its white and changes only its letterforms - `.line-boil-text` would paint it H0 orange.
```

### Line 98, above `.viewall-row {`

```text
Pulled up into the head's own space so the pill sits beside the rule, not under it.
```

### Line 105, above `.skills-row {`

```text
---- skills ---------------------------------------------------------------------------------
```

### Line 133, above `.skills-row__icon path {`

```text
The draw-in: one dash the length of the whole path, offset out and animated back to zero.
```

### Line 154, above `// The host stays mounted for the page's life; 'landing-scripts.html' creates and destroys the`

```text
---- reel -----------------------------------------------------------------------------------
```

### Line 156, above `// '<video>' inside it as the reel enters and leaves view. That is a perf measure, NOT the Edge`

```text
The host stays mounted for the page's life; `landing-scripts.html` creates and destroys the
```

### Line 157, above `// fix - see the dead-attempt list inside the rule. The aspect-ratio lives here on the host so`

```text
`<video>` inside it as the reel enters and leaves view. That is a perf measure, NOT the Edge
```

### Line 158, above `// the box does not collapse each time the video goes.`

```text
fix - see the dead-attempt list inside the rule. The aspect-ratio lives here on the host so
```

### Line 159, above `.reel__bar {`

```text
the box does not collapse each time the video goes.
```

### Line 173, above `}`

```text
THE EDGE GHOST BOX IS STILL OPEN. Rod on Windows Edge: a rectangle about the size of the
       reel, filled flat with the page's own ground colour, that tracks the scroll with an
       inverse-Y relationship to the real reel. Only he can see it; nobody else here has Edge.

       THE VIDEO IS INNOCENT, MEASURED 2026-09-03. With the host split from the video he deleted
       the empty `div.reel__bar` on its own and the ghost died with it, no video mounted. So the
       target is this BOX, and note that it paints no background - a filled opaque rectangle is
       not this rule drawing, it is a stale composited snapshot of the region.

       FIVE DEAD ATTEMPTS, kept so none is retried:
       1. `disablepictureinpicture` - box survives it. Still set (from `landing-scripts.html`)
          because opting a decorative autoplaying reel out of PiP is correct regardless.
       2. `transform: translateZ(0)` - never shipped. A `transform` also creates a containing
          block for fixed descendants, and this page has several (#hana-bg, #scrim, .cursorglow,
          two canvases), so putting it on any ANCESTOR of the reel breaks them. Untried on the
          video/host itself.
       3. `background: var(--color-black)` here - removed, ghost survived. No loss either way:
          `object-fit: cover` already fills the frame.
       4. Unmounting the `<video>` off-screen - ghost survived. This is what proved point 2 above.
       5. `background-attachment: fixed` on body, on the theory that the document-tall ground
          gradient in base/_foundations.scss was the thing being re-blitted - it is the right
          colours and the right shape, but pinning it changed nothing.
       Next untried lever: `translateZ(0)` on `.reel__bar` itself, never an ancestor.
```
