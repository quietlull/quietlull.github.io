# Comments removed from `_plugins/syntax-retag.rb`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 3, above `#`

```text
SYNTAX RE-TAG - splits the token classes Rouge cannot split on its own.
```

### Line 4, above `# WHY THIS EXISTS. Rod's syntax role list (element-tracker.md, locked 2026-08-23, refined`

```text

```

### Line 5, above `# 2026-09-03) cannot be expressed in CSS, because Rouge puts tokens with different ROLES in the`

```text
WHY THIS EXISTS. Rod's syntax role list (element-tracker.md, locked 2026-08-23, refined
```

### Line 6, above `# same CLASS. Measured on real output from this project's own Rouge:`

```text
2026-09-03) cannot be expressed in CSS, because Rouge puts tokens with different ROLES in the
```

### Line 7, above `#`

```text
same CLASS. Measured on real output from this project's own Rouge:
```

### Line 8, above `#   k   ->  return if else        AND  static const struct     (control flow + storage keywords)`

```text

```

### Line 9, above `#   n   ->  float bool            AND  dir uv seed             (scalar types + variables)`

```text
k   ->  return if else        AND  static const struct     (control flow + storage keywords)
```

### Line 10, above `#           AND the struct NAME, AND SCREAMING_SNAKE macro functions`

```text
n   ->  float bool            AND  dir uv seed             (scalar types + variables)
```

### Line 11, above `#   nb  ->  lerp saturate dot     AND  noise                   (real intrinsics + a local variable`

```text
AND the struct NAME, AND SCREAMING_SNAKE macro functions
```

### Line 12, above `#                                                               that happens to share a name with`

```text
nb  ->  lerp saturate dot     AND  noise                   (real intrinsics + a local variable
```

### Line 13, above `#                                                               one, AND vertex semantics)`

```text
that happens to share a name with
```

### Line 14, above `#`

```text
one, AND vertex semantics)
```

### Line 15, above `# No selector can separate those, so the split happens here, once, at build time. Every rule below`

```text

```

### Line 16, above `# is POSITIONAL or a closed word list - none of them guess, and none need per-language maintenance`

```text
No selector can separate those, so the split happens here, once, at build time. Every rule below
```

### Line 17, above `# beyond the two keyword sets.`

```text
is POSITIONAL or a closed word list - none of them guess, and none need per-language maintenance
```

### Line 18, above `#`

```text
beyond the two keyword sets.
```

### Line 19, above `# EVERY FAULT THIS FIXES WAS FOUND BY ROD LOOKING AT A RENDERED BLOCK, not by any checker, which`

```text

```

### Line 20, above `# is the thing worth remembering: a wrong colour is still a valid colour and nothing errors.`

```text
EVERY FAULT THIS FIXES WAS FOUND BY ROD LOOKING AT A RENDERED BLOCK, not by any checker, which
```

### Line 21, above `#`

```text
is the thing worth remembering: a wrong colour is still a valid colour and nothing errors.
```

### Line 22, above `# SCOPE. Only inside '<div class="highlight">', which Rouge emits for code BLOCKS. Inline code has`

```text

```

### Line 23, above `# no such wrapper, so D31 ("inline code is not included in the carve-out") holds by construction`

```text
SCOPE. Only inside `<div class="highlight">`, which Rouge emits for code BLOCKS. Inline code has
```

### Line 24, above `# rather than by a selector that has to be kept correct.`

```text
no such wrapper, so D31 ("inline code is not included in the carve-out") holds by construction
```

### Line 25, above `module SyntaxRetag`

```text
rather than by a selector that has to be kept correct.
```

### Line 28, above `# single class attribute is exact rather than approximate.`

```text
A span, as Rouge writes it. Rouge never nests spans inside spans, so a non-greedy match on a
```

### Line 29, above `SPAN = /<span class="([a-z0-9]+)">(.*?)<\/span>/m.freeze`

```text
single class attribute is exact rather than approximate.
```

### Line 43, above `# comparison below is against a plain ASCII operator, and the only escaped characters Rouge`

```text
Rouge escapes markup before it writes a span, so a token's text can carry entities. Every
```

### Line 44, above `# produces are '&gt;' '&lt;' '&amp;' '&quot;', none of which can be one of those operators. So`

```text
comparison below is against a plain ASCII operator, and the only escaped characters Rouge
```

### Line 45, above `# decoding is unnecessary here, and doing it would risk re-encoding differences on the way out.`

```text
produces are `&gt;` `&lt;` `&amp;` `&quot;`, none of which can be one of those operators. So
```

### Line 46, above `def self.retag(html)`

```text
decoding is unnecessary here, and doing it would risk re-encoding differences on the way out.
```

### Line 51, above `# TERNARY rather than introducing a semantic. A newline ends the search, which is how Rouge`

```text
Walks back from a colon to the start of its line. A `?` on the way means the colon closes a
```

### Line 52, above `# marks a line break.`

```text
TERNARY rather than introducing a semantic. A newline ends the search, which is how Rouge
```

### Line 53, above `def self.ternary_colon?(tokens, meaningful, here)`

```text
marks a line break.
```

### Line 67, above `# whitespace Rouge emits between tokens`

```text
indices of the tokens whose text is not blank, so the positional rules are not fooled by the
```

### Line 68, above `meaningful = tokens.each_index.reject { |i| tokens[i][1].strip.empty? }`

```text
whitespace Rouge emits between tokens
```

### Line 86, above `# Positional, so it catches them even though Rouge classes some 'nb' (the same class as`

```text
A SEMANTIC is an identifier after a colon: POSITION, TEXCOORD0, SV_DispatchThreadID.
```

### Line 87, above `# 'lerp') and others plain 'n' - which is exactly why they used to render different colours`

```text
Positional, so it catches them even though Rouge classes some `nb` (the same class as
```

### Line 88, above `# from each other.`

```text
`lerp`) and others plain `n` - which is exactly why they used to render different colours
```

### Line 89, above `#`

```text
from each other.
```

### Line 90, above `# TWO GUARDS, both added after the bare rule fired on a real post:`

```text

```

### Line 91, above `# 'next = next < 0.005 ? 0.0 : next;' in ComputeGrass painted that last 'next' as a semantic,`

```text
TWO GUARDS, both added after the bare rule fired on a real post:
```

### Line 92, above `# because a ternary's colon is indistinguishable from a declaration's on its own.`

```text
`next = next < 0.005 ? 0.0 : next;` in ComputeGrass painted that last `next` as a semantic,
```

### Line 93, above `#   1. a ternary has a '?' earlier on the SAME LINE; a declaration never does`

```text
because a ternary's colon is indistinguishable from a declaration's on its own.
```

### Line 94, above `#   2. HLSL semantics are capitalised by convention`

```text
1. a ternary has a `?` earlier on the SAME LINE; a declaration never does
```

### Line 95, above `# Either guard alone would have caught that case. Both are cheap and they fail differently,`

```text
2. HLSL semantics are capitalised by convention
```

### Line 96, above `# which is the point of keeping the pair.`

```text
Either guard alone would have caught that case. Both are cheap and they fail differently,
```

### Line 97, above `if prev_text == ':' && text.match?(CAPITALISED) && !ternary_colon?(tokens, meaningful, here)`

```text
which is the point of keeping the pair.
```

### Line 106, above `# of type names and cannot mis-fire on an ordinary variable.`

```text
A struct NAME is the identifier straight after `struct`. Positional, so it needs no list
```

### Line 107, above `extra[following] << 'x-class' if text == 'struct' && following && tokens[following][0] == 'n'`

```text
of type names and cannot mis-fire on an ordinary variable.
```

### Line 113, above `# by '('. Rod caught SAMPLE_TEXTURE2D rendering as a constant.`

```text
SCREAMING_SNAKE alone does NOT mean constant: a SCREAMING macro FUNCTION is followed
```

### Line 114, above `extra[index] << (call_follows ? 'x-func' : 'x-const')`

```text
by `(`. Rod caught SAMPLE_TEXTURE2D rendering as a constant.
```

### Line 118, above `# because HLSL has a noise() intrinsic, but 'float noise = ...' is a local variable.`

```text
Rouge's function classes are not reliable; only the `(` is. `noise` comes back `nb`
```

### Line 119, above `extra[index] << 'x-notcall' unless call_follows`

```text
because HLSL has a noise() intrinsic, but `float noise = ...` is a local variable.
```
