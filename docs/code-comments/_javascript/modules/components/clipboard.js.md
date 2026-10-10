# Comments removed from `_javascript/modules/components/clipboard.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Tooltip import removed - it only drove the "Copied!" bubble, and Bootstrap is gone (D48).`

```text
Clipboard functions

Dependencies:
   clipboard.js (https://github.com/zenorocha/clipboard.js)
```

### Line 8, above `// The icon swap below (ICON_DEFAULT <-> ICON_SUCCESS) is the copy button's own feedback and`

```text
Tooltip import removed - it only drove the "Copied!" bubble, and Bootstrap is gone (D48).
```

### Line 9, above `// did not depend on the tooltip; it still runs unchanged.`

```text
The icon swap below (ICON_DEFAULT <-> ICON_SUCCESS) is the copy button's own feedback and
```

### Line 10, above `const clipboardSelector = '.code-header>button';`

```text
did not depend on the tooltip; it still runs unchanged.
```

### Line 18, on the line `const TIMEOUT = 2000;`

```text
in milliseconds
```

### Line 56, above `const clipboard = new ClipboardJS(clipboardSelector, {`

```text
Initial the clipboard.js object
```

### Line 75, above `document.dispatchEvent(new Event('achievement:codecopy'));`

```text
OURS: achievement hook + sparkler burst on a successful copy (re-apply on Chirpy upgrade)
```

### Line 97, above `// code-copy button above, it has no icon swap or other visual of its own. Removing the`

```text
NOTE: this button's "Copied!" feedback was 100% the tooltip title swap below - unlike the
```

### Line 98, above `// tooltip leaves the copy working but silent (no confirmation shown at all). That is a real`

```text
code-copy button above, it has no icon swap or other visual of its own. Removing the
```

### Line 99, above `// UX loss, not a like-for-like removal - flagging for Rod rather than inventing a new visual.`

```text
tooltip leaves the copy working but silent (no confirmation shown at all). That is a real
```

### Line 100, above `btnCopyLink.addEventListener('click', (e) => {`

```text
UX loss, not a like-for-like removal - flagging for Rod rather than inventing a new visual.
```

### Line 108, above `navigator.clipboard.writeText(window.location.href).then(() => {`

```text
Copy URL to clipboard
```
