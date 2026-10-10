# Comments removed from `_javascript/pwa/app.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 2, above `const src = new URL(document.currentScript.src);`

```text
Get Jekyll config from URL parameters
```

### Line 11, above `// When a new service worker is waiting, activate it immediately in the`

```text
Silent auto-update on next navigation:
```

### Line 12, above `// background. The current tab keeps using its already-loaded resources`

```text
When a new service worker is waiting, activate it immediately in the
```

### Line 13, above `// (no forced reload). The next navigation naturally picks up the new`

```text
background. The current tab keeps using its already-loaded resources
```

### Line 14, above `// version because the new SW is now in control.`

```text
(no forced reload). The next navigation naturally picks up the new
```

### Line 15, above `const activateIfWaiting = () => {`

```text
version because the new SW is now in control.
```

### Line 22, above `activateIfWaiting();`

```text
Case 1: a new SW was already installed and waiting when the page loaded
```

### Line 25, above `registration.addEventListener('updatefound', () => {`

```text
Case 2: a new SW finishes installing while the page is open
```
