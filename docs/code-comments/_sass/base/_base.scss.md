# Comments removed from `_sass/base/_base.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 19, above `body {`

```text
Background, colour and overflow-x are the redesign's now - base/_foundations.scss paints them.
```

### Line 27, above `*::-webkit-scrollbar {`

```text
F3: Custom amber scrollbar — global
```

### Line 37, above `// ... by default and then turn orange instead its really hard to see".`

```text
YELLOW AT REST, ORANGE ON HOVER. Rod 2026-09-03: "Scrollbar on the right should be the yellow
```

### Line 38, above `// It was --gold-20 resting and --gold-35 on hover: gold at 20% and 35% alpha over a near-black`

```text
... by default and then turn orange instead its really hard to see".
```

### Line 39, above `// ground, which is why it was hard to find. Both ends are solid now, and they are the same`

```text
It was --gold-20 resting and --gold-35 on hover: gold at 20% and 35% alpha over a near-black
```

### Line 40, above `// yellow -> orange pair the rest of the site ignites with (--color-gold -> --color-glow), so the`

```text
ground, which is why it was hard to find. Both ends are solid now, and they are the same
```

### Line 41, above `// bar behaves like every other interactive object here rather than like browser chrome.`

```text
yellow -> orange pair the rest of the site ignites with (--color-gold -> --color-glow), so the
```

### Line 42, above `*::-webkit-scrollbar-thumb {`

```text
bar behaves like every other interactive object here rather than like browser chrome.
```

### Line 52, above `* {`

```text
Firefox takes one pair and has no hover state for it, so it gets the resting colour.
```

### Line 58, above `::selection {`

```text
F4: Amber text selection
```

### Line 64, above `// beat the layered version and drew a second gold ring outside the search field's own border.`

```text
The redesign owns the focus ring now - see base/_focus-ring.scss. This one was unlayered, so it
```

### Line 65, above `h1.dynamic-title {`

```text
beat the layered version and drew a second gold ring outside the search field's own border.
```

### Line 77, above `.preview-img {`

```text
An empty `main` shell sat here after its one rule (.col-12 grid padding) died with
   Bootstrap (D48).
```

### Line 149, above `// it on the same div as '.prose' purely as a JS hook - tocbot's 'contentSelector',`

```text
SIZE ONLY WHERE `.content` IS THE PAGE BODY. On a post it is not: `_layouts/post.html` puts
```

### Line 150, above `// post-enhance and clipboard all query '.content' - and the prose ladder sets the type there.`

```text
it on the same div as `.prose` purely as a JS hook - tocbot's `contentSelector`,
```

### Line 151, above `// Unscoped, this rule is unlayered, so it beat the prose layer and set 17.28px as the`

```text
post-enhance and clipboard all query `.content` - and the prose ladder sets the type there.
```

### Line 152, above `// inherited size for everything in a post body that has no size of its own. '.prose p' and`

```text
Unscoped, this rule is unlayered, so it beat the prose layer and set 17.28px as the
```

### Line 153, above `// '.prose li' are pinned by the page sheet so they were never affected; the code-header`

```text
inherited size for everything in a post body that has no size of its own. `.prose p` and
```

### Line 154, above `// language label with its copy icon, and the post-nav "back to all" button, were.`

```text
`.prose li` are pinned by the page sheet so they were never affected; the code-header
```

### Line 155, above `// '_layouts/page.html' still gets Chirpy's size, which is the only place this was ever for.`

```text
language label with its copy icon, and the post-nav "back to all" button, were.
```

### Line 156, above `&:not(.prose) {`

```text
`_layouts/page.html` still gets Chirpy's size, which is the only place this was ever for.
```

### Line 212, above `> i {`

```text
checkbox icon
```

### Line 233, on the line `}`

```text
ul
```

### Line 248, on the line `}`

```text
.content
```

### Line 327, above `.flex-grow-1 {`

```text
--- Effects classes ---
```

### Line 337, above `/* Overwrite bootstrap outline button — amber theme */`

```text
--bs-secondary-color and .tooltip-inner removed - D48 deleted Bootstrap's own SCSS entirely,
   so neither Bootstrap's `.text-muted` rule nor its `.tooltip` markup exist anywhere in the
   compiled output any more for these to feed or override. `.text-muted` is still used as an
   HTML class in a few includes but currently renders with no colour override at all (checked:
   no `.text-muted` rule exists anywhere in _sass) - that is a separate pre-existing gap, not
   something this deletion introduces, and out of scope for a tooltip removal.

   .btn.btn-outline-primary below is KEPT, unlike its two neighbours above - it is not dead.
   post-nav.html's "Back to all X projects" button still carries this exact class combo, and
   _a11y.scss (touch target) and _animations.scss (reduced-motion list) both still target it.
```

### Line 348, above `.btn.btn-outline-primary {`

```text
Overwrite bootstrap outline button — amber theme
```

### Line 400, above `/* mermaid */`

```text
--- Overriding ---
```

### Line 402, above `.mermaid {`

```text
mermaid
```

### Line 407, above `mjx-container {`

```text
MathJax
```

### Line 427, above `/* The #main-wrapper / .container / .row block that stood here is gone with the Bootstrap`

```text
`#mask` and its rule are gone with the sidebar that used it, 2026-08-25.
```

### Line 429, above `/* --- basic wrappers --- */`

```text
The #main-wrapper / .container / .row block that stood here is gone with the Bootstrap
   scaffold it styled (D48, 2026-09-01). Its 100vh container minimum was also the rule that
   beat two 404 fixes on ID specificity.
```

### Line 433, above `/* '#tail-wrapper' and its rules are gone with the empty tail column, 2026-08-25.`

```text
--- basic wrappers ---
```

### Line 436, above `// ============================================================================`

```text
`#tail-wrapper` and its rules are gone with the empty tail column, 2026-08-25.
   Nothing set `tail_includes`, so the div rendered empty on 25 pages.
```

### Line 439, above `// SECTION SEPARATOR`

```text
============================================================================
```

### Line 440, above `// ============================================================================`

```text
SECTION SEPARATOR
```

### Line 441, above `.home-content > section + section {`

```text
============================================================================
```

### Line 456, above `// Lets the user scroll past content to see just the dock/lake scene.`

```text
Scene spacer — one full viewport of empty space at the bottom.
```

### Line 457, above `.scene-spacer {`

```text
Lets the user scroll past content to see just the dock/lake scene.
```

### Line 462, above `// SECTION ICON BOX — glass box with icon and dot`

```text
============================================================================
```

### Line 463, above `// ============================================================================`

```text
SECTION ICON BOX — glass box with icon and dot
```

### Line 464, above `.section-icon-box {`

```text
============================================================================
```

### Line 481, above `&::before {`

```text
Blurred orb behind the box — Tier 4 (largest)
```

### Line 504, above `.icon-dot {`

```text
Heartbeat dot — double-beat throb with glow
```

### Line 514, above `// CARD ICON BOX — animated rounded square inside each card (from reference)`

```text
============================================================================
```

### Line 515, above `// ============================================================================`

```text
CARD ICON BOX — animated rounded square inside each card (from reference)
```

### Line 516, above `.card-icon-box {`

```text
============================================================================
```

### Line 525, above `.card-icon-glow {`

```text
Blurred glow behind the box
```

### Line 535, above `.card-icon-inner {`

```text
The visible rounded square
```

### Line 548, above `.card-icon-dot {`

```text
Heartbeat dot in center
```

### Line 558, above `.post-card:hover .card-icon-glow {`

```text
Hover: glow brightens
```

### Line 563, above `// CARD COLOR PALETTES — warm tone variance per nth-child`

```text
============================================================================
```

### Line 564, above `// ============================================================================`

```text
CARD COLOR PALETTES — warm tone variance per nth-child
```

### Line 565, above `// Amber (default) — the glow keeps the default gold hue`

```text
============================================================================
```

### Line 567, above `.card-palette-amber {`

```text
Amber (default) — the glow keeps the default gold hue
```

### Line 577, above `.card-palette-orange {`

```text
Orange — the glow matches the orange icon colour
```

### Line 589, above `.card-palette-gold {`

```text
Yellow / Gold — the glow matches the yellow icon colour
```
