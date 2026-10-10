# Comments removed from `assets/css/giscus.css`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 7, above `main {`

```text
GISCUS CUSTOM THEME - the comments, wearing the site's palette instead of GitHub's.
   Rod 2026-09-03: "I did not realize comments were live lets keep the shape update the colors to
   match the rest of the site."

   WHY A CUSTOM THEME AND NOT A BUILT-IN. giscus was on `dark_dimmed`, which is GitHub's
   desaturated BLUE-grey. The palette law here is warm, and no built-in giscus theme is
   (`transparent_dark` gets closest and still leaves GitHub blue on every link and a green button).
   A custom theme is the only way to actually match, so this is it.

   WHAT IT IS. giscus's app is built on GitHub Primer, so theming it means overriding Primer's
   custom properties. The variable NAMES below are Primer's, not ours - do not rename them.
   Values are literal copies of our tokens, because the iframe is a different document and cannot
   see `_sass/abstracts/_tokens.scss`:

     --color-text          #f5f3ef      --color-gold        #fbbf24
     --color-panel-solid   #1c1a18      --color-gold-deep   #f59e0b
     --color-night         #070c23      --color-glow        #ff6a00
     --color-silver        #a3a19d      --color-muted-warm  #7d7a76
     --color-line-soft     rgba(255,255,255,.1)

   LINES ARE AMBER. FILLS ARE BLUE. That split is the whole rule here and I got it wrong twice.
   Rod 2026-09-03: "rather than white lines lets do the yellow we use everywhere else", then
   "i asked for just the lines to be changed from white to yellow but the boxes changed to yellow
   too the panels or cards should be the blue color they were before".

   So: a BORDER is amber - rgba(245,158,11,.2) for a real edge, rgba(245,158,11,.1) for a quiet
   one (--btn-border-color and --glass-border). A FILL is the blue slate panel. Amber never
   becomes a background here; it is a line colour and an accent, nothing else.

   AND THERE IS ONLY ONE FILL. Rod again, after seeing it drawn: "why are the other blue parts
   not just the same color as the comment box". Every surface in the widget is #070c23 - our
   --color-night, which is the value giscus already puts on the textarea via `form-control
   input-contrast`. The border rgba(245,158,11,.1) is what separates one piece from the next.

   IF A TOKEN CHANGES, THIS FILE DOES NOT FOLLOW IT. That is the cost of the iframe boundary and
   it is why every value is annotated with the token it came from.
```

### Line 45, above `--color-canvas-default: transparent;              /* let the post's own ground show through */`

```text
--- ground and text -------------------------------------------------------------------
```

### Line 46, on the line `--color-canvas-default: transparent;`

```text
let the post's own ground show through
```

### Line 47, on the line `--color-canvas-overlay: #070c23;`

```text
--color-night: THE one blue, see below
```

### Line 48, on the line `--color-canvas-inset: #070c23;`

```text
--color-night
```

### Line 49, on the line `--color-canvas-subtle: #070c23;`

```text
--color-night: the tab strip, same blue
```

### Line 51, on the line `--color-fg-default: #f5f3ef;`

```text
--color-text
```

### Line 52, on the line `--color-fg-muted: #a3a19d;`

```text
--color-silver
```

### Line 53, on the line `--color-fg-subtle: #7d7a76;`

```text
--color-muted-warm
```

### Line 54, on the line `--color-fg-on-emphasis: #1c1a18;`

```text
text ON the gold button, so it is the dark
```

### Line 56, above `--color-border-default: rgba(245, 158, 11, 0.2);  /* --btn-border-color: THE line colour */`

```text
--- borders ---------------------------------------------------------------------------
```

### Line 57, on the line `--color-border-default: rgba(245, 158, 11, 0.2);`

```text
--btn-border-color: THE line colour
```

### Line 58, on the line `--color-border-muted: rgba(245, 158, 11, 0.1);`

```text
--glass-border: the quieter one
```

### Line 62, above `--color-accent-fg: #fbbf24;                       /* --color-gold: links, @mentions */`

```text
--- the accent. Every GitHub blue in the widget resolves through these. -----------------
```

### Line 63, on the line `--color-accent-fg: #fbbf24;`

```text
--color-gold: links, @mentions
```

### Line 64, on the line `--color-accent-emphasis: #f59e0b;`

```text
--color-gold-deep
```

### Line 68, above `--color-btn-text: #f5f3ef;`

```text
--- buttons. The primary is the gold, not GitHub's green. -------------------------------
```

### Line 70, on the line `--color-btn-bg: #070c23;`

```text
--color-night. A FILL, so it stays blue.
```

### Line 71, on the line `--color-btn-border: rgba(245, 158, 11, 0.2);`

```text
--btn-border-color: this is a LINE
```

### Line 78, on the line `--color-btn-primary-bg: #fbbf24;`

```text
--color-gold
```

### Line 80, on the line `--color-btn-primary-hover-bg: #f59e0b;`

```text
--color-gold-deep
```

### Line 81, on the line `--color-btn-primary-hover-border: #ff6a00;`

```text
--color-glow, the ignite end
```

### Line 86, above `--color-social-reaction-bg-hover: rgba(251, 191, 36, 0.1);`

```text
--- reactions, mostly the same warm family ----------------------------------------------
```

### Line 90, above `--color-success-fg: #6fbf73;                      /* --tape-green */`

```text
--- states ------------------------------------------------------------------------------
```

### Line 91, on the line `--color-success-fg: #6fbf73;`

```text
--tape-green
```

### Line 92, on the line `--color-danger-fg: #ff6a00;`

```text
--color-glow: this palette has no red
```

### Line 95, above `--color-primer-border-active: #fbbf24;`

```text
--- inputs ------------------------------------------------------------------------------
```

### Line 99, above `--primer-text-body-font: 'M PLUS Rounded 1c', sans-serif;`

```text
--- typography. The site's own faces, so the widget does not read as a foreign object. ---
```

### Line 106, above `/* ONE BLUE, NOT THREE. Rod 2026-09-03: "why are the other blue parts not just the same color as`

```text
The comment box and each comment sit on the warm panel rather than a blue-grey card.
```

### Line 107, above `.gsc-comment-box,`

```text
ONE BLUE, NOT THREE. Rod 2026-09-03: "why are the other blue parts not just the same color as
   the comment box use this same blue in <textarea class='form-control input-contrast'> on the
   other elements".
   The textarea sits on --color-canvas-inset (#070c23, our --color-night) because giscus gives it
   `form-control input-contrast`. The form around it and the tab strip above it were on two OTHER
   values, so the widget read as three stacked shades of navy. Everything is the textarea's blue
   now, and the amber hairlines are what separate the pieces - which is the same way the rest of
   the site distinguishes a card from its ground.
```

### Line 122, on the line `border-color: rgba(245, 158, 11, 0.1);`

```text
--glass-border
```

### Line 125, above `.gsc-comment-content code,`

```text
Code inside a comment, matched to the site's inline code rather than GitHub's grey chip.
```

### Line 129, on the line `background: rgba(251, 191, 36, 0.05);`

```text
--inline-code-bg
```

### Line 132, above `.gsc-comment-box-buttons .btn-primary {`

```text
The "Sign in with GitHub" prompt is the first thing a reader sees on a post with no comments
   yet, and it is the widget's one loud object. Its GOLD comes from --color-btn-primary-bg above,
   not from here - this only matches the weight the rest of the site's buttons use. Verified
   rendering on the real widget: background rgb(251,191,36), text rgb(28,26,24).
```

### Line 140, above `/* SQUARED, matching the shape pass and D20's code block: the widget is otherwise the only`

```text
SQUARED, matching the shape pass and D20's code block: the widget is the only round-cornered
   object left in the post otherwise.
```

### Line 142, above `.gsc-comment-box,`

```text
SQUARED, matching the shape pass and D20's code block: the widget is otherwise the only
   round-cornered object left in the post.
   THE SELECTOR LIST IS MEASURED, NOT GUESSED. Opened the widget directly at giscus.app and
   enumerated its real classes, which is how `.gsc-comment-box-textarea` got caught - it carries
   its OWN `border-radius: 4px 4px 0 0` and was still rounded while everything around it was
   square. The `.gsc-comment*` selectors that are not in that list only exist once a post HAS
   comments, so they cannot be confirmed on an empty thread and are kept on giscus's documented
   names.
```
