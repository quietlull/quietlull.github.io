# Comments removed from `_sass/base/_typography.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 6, above `// are gone from here and the ladder now reaches bare headings.`

```text
The type ladder moved to base/_decisions.scss, so the old sizes, weights, colours and margins
```

### Line 7, above `// What stays is Chirpy's heading ANCHOR, whose markup refactor-content.html still emits, and the`

```text
are gone from here and the ladder now reaches bare headings.
```

### Line 8, above `// scroll offset that keeps a jumped-to heading clear of the sticky bar.`

```text
What stays is Chirpy's heading ANCHOR, whose markup refactor-content.html still emits, and the
```

### Line 9, above `@for $i from 1 through 5 {`

```text
scroll offset that keeps a jumped-to heading clear of the sticky bar.
```

### Line 20, above `// active nav link came out gold on its own gold pill - same colour as its background, invisible.`

```text
Layered, because unlayered beats every layer and this was quietly repainting components. The
```

### Line 21, above `@layer reset {`

```text
active nav link came out gold on its own gold pill - same colour as its background, invisible.
```

### Line 29, above `// it stops a shrunk image distorting against its own 'height' attribute - but unlayered it also`

```text
LAYERED 2026-08-26, and it is the only layered rule in this file. `height: auto` is a RESET -
```

### Line 30, above `// beat every ported component that sizes an image, and collapsed the ramblings thumbnail from`

```text
it stops a shrunk image distorting against its own `height` attribute - but unlayered it also
```

### Line 31, above `// 170px to 0. In 'reset' it still does its job and components can now win.`

```text
beat every ported component that sizes an image, and collapsed the ramblings thumbnail from
```

### Line 32, above `@layer reset, tokens, prose, components, overrides;`

```text
170px to 0. In `reset` it still does its job and components can now win.
```

### Line 107, above `i {`

```text
fontawesome icons
```

### Line 120, above `h1 {`

```text
NO line-height HERE. Rod 2026-08-25: "The lab wins the whole point of the
     migration is to kill old issues like this."
     THREE VALUES WERE FIGHTING OVER ONE PROPERTY: the body said 1.65 (layered reset), the lab
     said 1.7 and the port dropped it, and this rule said 1.75. This one was winning, because
     this file is UNLAYERED and unlayered CSS beats every layer - so the leading everything
     inside <main> actually rendered at was the one nobody chose. The port had already caught
     this once, in _sass/pages/_projects.scss, where a comment records it "reached in and made
     every pill 2.5px taller than the bench's", and patched that ONE case rather than the cause.
     Deleting it is the fix: body now carries the lab's 1.7 and nothing overrides it.
```

### Line 205, above `/* it will be created by Liquid */`

```text
--- Begin of Markdown table style ---
```

### Line 207, above `.table-wrapper {`

```text
it will be created by Liquid
```

### Line 241, on the line `}`

```text
tbody
```

### Line 242, on the line `}`

```text
table
```
