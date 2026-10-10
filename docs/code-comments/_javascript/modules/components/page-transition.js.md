# Comments removed from `_javascript/modules/components/page-transition.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `export function initPageTransition() {`

```text
Smooth page transitions — fade out current content before navigating.
The existing #main-wrapper fade-in animation handles arrival.
```

### Line 8, above `window.addEventListener('pageshow', (e) => {`

```text
Restore content visibility when returning via bfcache (back/forward)
```

### Line 20, above `if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;`

```text
Skip: modifier keys (open in new tab), target="_blank", downloads
```

### Line 27, above `try {`

```text
Skip: external links, hash-only links, javascript: links
```

### Line 50, above `if (typeof window.sparklerBurst === 'function') {`

```text
Sparkler burst at click point
```
