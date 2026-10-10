# Comments removed from `_plugins/callout.rb`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `#`

```text
{% callout note %} ... markdown body ... {% endcallout %}
```

### Line 2, above `# Emits the d-callout box for all four categories (Rod, 2026-09-01: "callouts should be A and`

```text

```

### Line 3, above `# not use any of the other candidates. the shells should be the same across all versions.").`

```text
Emits the d-callout box for all four categories (Rod, 2026-09-01: "callouts should be A and
```

### Line 4, above `# Tape placement per category is decision D30 (docs/DECISIONS.md):`

```text
not use any of the other candidates. the shells should be the same across all versions.").
```

### Line 5, above `#   note    -> A, one strip over the top edge   (green)`

```text
Tape placement per category is decision D30 (docs/DECISIONS.md):
```

### Line 6, above `#   tldr    -> B, one strip down the left edge  (orange)`

```text
note    -> A, one strip over the top edge   (green)
```

### Line 7, above `#   warning -> D, four diagonal corner tabs     (pink)`

```text
tldr    -> B, one strip down the left edge  (orange)
```

### Line 8, above `#   quote   -> C, two L-shaped corners          (blue)`

```text
warning -> D, four diagonal corner tabs     (pink)
```

### Line 9, above `# Colour is NOT written here: the d-callout--<type> class sets --tape-hue on the host`

```text
quote   -> C, two L-shaped corners          (blue)
```

### Line 10, above `# (decisions.scss), so a callout cannot render grey tape via a forgotten colour class.`

```text
Colour is NOT written here: the d-callout--<type> class sets --tape-hue on the host
```

### Line 11, above `module Jekyll`

```text
(decisions.scss), so a callout cannot render grey tape via a forgotten colour class.
```

### Line 17, above `L_CORNERS = %w[tl br].map { |c| %(<i class="tape tape--v tape--#{c}"></i><i class="tape tape--h tape--#{c}"></`

```text
Each L is two strips crossing at the corner, vertical arm first (washi-tape.scss:76).
```

### Line 32, above `# unstyled box or silently fall back to some default category.`

```text
Failing loudly at build time is the point of the tag: a typo must never ship as an
```

### Line 33, above `raise Liquid::SyntaxError,`

```text
unstyled box or silently fall back to some default category.
```
