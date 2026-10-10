# Comments removed from `_javascript/performance-monitor.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `export class PerformanceMonitor {`

```text
Performance monitoring class
```

### Line 9, on the line `this.lanternCount = 0;`

```text
Initialize
```

### Line 11, above `this.container = document.createElement('div');`

```text
Create UI
```

### Line 25, above `this.render();`

```text
Initial render
```

### Line 34, above `if (this.frameTimes.length > 60) {`

```text
Keep last 60 frame times for averaging
```

### Line 41, above `if (time >= this.prevTime + 1000) {`

```text
Update display once per second
```

### Line 65, on the line `this.render();`

```text
Update display immediately
```
