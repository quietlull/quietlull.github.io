# Comments removed from `_sass/base/_syntax.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 9, on the line `margin-bottom: 1.2em;`

```text
Override BS Inline-code style
```

### Line 27, on the line `word-wrap: normal;`

```text
Fixed Safari overflow-x
```

### Line 43, on the line `overflow: visible;`

```text
Fixed iOS safari overflow-x
```

### Line 44, on the line `word-break: normal;`

```text
Fixed iOS safari linenos code break
```

### Line 58, on the line `}`

```text
.highlight
```

### Line 70, above `// same wrapping behaviour (re-apply on Chirpy upgrade)`

```text
OURS: upstream has word-break: break-word, a deprecated keyword our stylelint rejects;
```

### Line 71, above `overflow-wrap: break-word;`

```text
same wrapping behaviour (re-apply on Chirpy upgrade)
```

### Line 85, on the line `padding-bottom: 0;`

```text
show link's underlinke
```

### Line 101, above `a {`

```text
Prevent some browser extends from
    changing the URL string of code block.
```

### Line 116, above `// THE BACKDROP BLUR IS GONE, 2026-09-03. It was glassmorphism, which is the AI tell the shape`

```text
OURS: code-block chrome (re-apply on Chirpy upgrade). Upstream is the 1px ring only.
```

### Line 117, above `// pass strips everywhere else, and the source we transcribed this component from says the same`

```text
THE BACKDROP BLUR IS GONE, 2026-09-03. It was glassmorphism, which is the AI tell the shape
```

### Line 118, above `// thing unprompted: its own card blur is listed under doesNotTransfer in`

```text
pass strips everywhere else, and the source we transcribed this component from says the same
```

### Line 119, above `// analysis/component-sources/source-code-block.md, because it conflicts with paper-morphism.`

```text
thing unprompted: its own card blur is listed under doesNotTransfer in
```

### Line 120, above `// It was also doing nothing visible - the block is opaque, so there was no backdrop to blur.`

```text
analysis/component-sources/source-code-block.md, because it conflicts with paper-morphism.
```

### Line 121, above `box-shadow: var(--language-border-color) 0 0 0 1px,`

```text
It was also doing nothing visible - the block is opaque, so there was no backdrop to blur.
```

### Line 126, above `// shape". The bp.sm branch used to restore $radius-lg above 576px, so the block was square on`

```text
SQUARED, D20 (Rod 2026-08-18): "i however do need it to be a square instead of a rounded
```

### Line 127, above `// a phone and rounded on a desktop - the decision was half-applied rather than missing.`

```text
shape". The bp.sm branch used to restore $radius-lg above 576px, so the block was square on
```

### Line 128, above `.content > & {`

```text
a phone and rounded on a desktop - the decision was half-applied rather than missing.
```

### Line 139, above `// one '::before' circle plus two box-shadow copies. Rod rejected the window metaphor twice on`

```text
THE THREE macOS TRAFFIC-LIGHT DOTS ARE DELETED, 2026-09-03. They were upstream Chirpy's:
```

### Line 140, above `// the record (D20's "NO traffic lights", and again on the earlier shadcn pick) and finally:`

```text
one `::before` circle plus two box-shadow copies. Rod rejected the window metaphor twice on
```

### Line 141, above `// "code blocks are not the agreed shape using this sort of mac window based design. i never`

```text
the record (D20's "NO traffic lights", and again on the earlier shadcn pick) and finally:
```

### Line 142, above `// have used a mac so this is not something that represents me".`

```text
"code blocks are not the agreed shape using this sort of mac window based design. i never
```

### Line 143, above `// The 'span' rule went with them - it existed only to re-centre the label against the dots.`

```text
have used a mac so this is not something that represents me".
```

### Line 144, above `.code-header {`

```text
The `span` rule went with them - it existed only to re-centre the label against the dots.
```

### Line 156, above `// 'pre' fell through to the browser's UA default 'monospace' while IBM Plex Mono sat loaded and`

```text
THE CODE FONT, and it had never been set. Nothing in this repo gave a code BLOCK a font, so
```

### Line 157, above `// unasked-for - measured on the live post, computed font-family was the bare generic.`

```text
`pre` fell through to the browser's UA default `monospace` while IBM Plex Mono sat loaded and
```

### Line 158, above `// It has to name 'pre' DIRECTLY: the UA stylesheet sets 'pre { font-family: monospace }', so`

```text
unasked-for - measured on the live post, computed font-family was the bare generic.
```

### Line 159, above `// putting the family on this card and letting it inherit does not reach it.`

```text
It has to name `pre` DIRECTLY: the UA stylesheet sets `pre { font-family: monospace }`, so
```

### Line 160, above `// Inline code was never affected - '.prose code:not(pre code)' has always set the family.`

```text
putting the family on this card and letting it inherit does not reach it.
```

### Line 161, above `pre {`

```text
Inline code was never affected - `.prose code:not(pre code)` has always set the family.
```

### Line 167, above `div {`

```text
Hide line numbers for default, console, and terminal code snippets
```

### Line 184, above `// redesign-lab/analysis/component-sources/source-code-block.md (read off`

```text
D20 PICK A - Maxime Heckel's header strip, transcribed from the verbatim CSS in
```

### Line 185, above `// blog.maximeheckel.com/posts/the-study-of-shaders-with-react-three-fiber/):`

```text
redesign-lab/analysis/component-sources/source-code-block.md (read off
```

### Line 186, above `//   display:flex; justify-content:space-between; align-items:center; padding:12px;`

```text
blog.maximeheckel.com/posts/the-study-of-shaders-with-react-three-fiber/):
```

### Line 187, above `//   border-bottom: <the card's own border>`

```text
display:flex; justify-content:space-between; align-items:center; padding:12px;
```

### Line 188, above `// It is a FULL-WIDTH strip, not a protruding tab - that was the fork against Starlight (B).`

```text
border-bottom: <the card's own border>
```

### Line 189, above `// What changed here: the 0.75rem/0.25rem side margins are gone, because they inset the header`

```text
It is a FULL-WIDTH strip, not a protruding tab - that was the fork against Starlight (B).
```

### Line 190, above `// from the block's edges and a strip has to reach them; the separator is the border-bottom the`

```text
What changed here: the 0.75rem/0.25rem side margins are gone, because they inset the header
```

### Line 191, above `// source uses rather than the dots it never had. Height stays on $code-header-height so nothing`

```text
from the block's edges and a strip has to reach them; the separator is the border-bottom the
```

### Line 192, above `// below it moves.`

```text
source uses rather than the dots it never had. Height stays on $code-header-height so nothing
```

### Line 193, above `.code-header {`

```text
below it moves.
```

### Line 205, above `span {`

```text
the label block
```

### Line 209, above `i {`

```text
label icon
```

### Line 222, on the line `top: 1px;`

```text
center the file icon
```

### Line 225, above `&::after {`

```text
label text
```

### Line 234, above `button {`

```text
clipboard
```
