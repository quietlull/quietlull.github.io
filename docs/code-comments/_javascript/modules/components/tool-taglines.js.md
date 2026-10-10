# Comments removed from `_javascript/modules/components/tool-taglines.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `const TYPE_SPEED = 35;          // ms per character when typing`

```text
Tool icon hover → typewriter reveal on landing tagline.
Full text is laid out immediately (no shifting). A cursor reveals
characters left-to-right. Erase accelerates like holding backspace.
```

### Line 7, on the line `const TYPE_SPEED = 35;`

```text
ms per character when typing
```

### Line 8, on the line `const ERASE_START = 40;`

```text
ms per character at start of erase
```

### Line 9, on the line `const ERASE_MIN = 10;`

```text
ms per character at fastest erase
```

### Line 10, on the line `const ERASE_ACCEL = 0.85;`

```text
multiplier each erase tick (speeds up)
```

### Line 11, on the line `const LEAVE_DELAY = 10000;`

```text
ms before reverting after mouseleave
```

### Line 12, on the line `const ENTER_DELAY = 300;`

```text
ms hover before triggering (debounce quick passes)
```

### Line 26, above `tagline.style.minHeight = tagline.offsetHeight + 'px';`

```text
Lock container height so different-length texts don't cause layout shift
```

### Line 56, above `let eraseSpeed = ERASE_START;`

```text
Phase 1: erase current text with acceleration
```

### Line 66, above `tagline.style.opacity = '0';`

```text
Brief crossfade to mask layout shift when switching texts
```
