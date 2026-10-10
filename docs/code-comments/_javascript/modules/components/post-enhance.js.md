# Comments removed from `_javascript/modules/components/post-enhance.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `export function initPostEnhance() {`

```text
Post page enhancements:
- Splits content at h2 boundaries into glass section cards
- Adds scroll-triggered fade-in animations via IntersectionObserver
- Adds a reading progress bar
- Section completion sparks
```

### Line 20, above `function splitSections() {`

```text
Split .content children at every <h2> into individual glass sections.
Each section gets its own .post-section wrapper.
```

### Line 31, above `const sections = [];`

```text
Group children into sections split at h2 boundaries
```

### Line 46, above `if (sections.length <= 1) return;`

```text
Don't split if there's only one section (no h2s or just one)
```

### Line 49, above `content.innerHTML = '';`

```text
Clear content and re-insert wrapped sections
```

### Line 62, above `function initReadingProgress() {`

```text
Thin amber progress bar at the top of the viewport showing read progress.
```

### Line 73, above `let articleTop = 0;`

```text
Cache article dimensions — only recalculate on resize
```

### Line 99, above `window.addEventListener('scroll', updateProgress, { passive: true });`

```text
Passive scroll listener — single style update, no rAF needed
```

### Line 102, above `updateProgress();`

```text
NO CLICK-TO-JUMP. Rod 2026-09-03: "make the progress bar not interactable."
    The handler mapped a click's x to a scroll position. The CSS now sets `pointer-events: none`,
    so this could never fire again anyway - leaving it would be dead code that reads as live.
```

### Line 109, above `function initFireflies(article) {`

```text
Ambient fireflies — tiny gold dots that slowly drift behind post content.
```

### Line 116, above `if (getComputedStyle(container).position === 'static') {`

```text
Ensure positioning context
```

### Line 125, on the line `const dur = 10 + Math.random() * 10;`

```text
10–20s
```

### Line 126, on the line `const delay = Math.random() * dur;`

```text
stagger within cycle
```

### Line 127, on the line `const dx = (Math.random() - 0.5) * 60;`

```text
±30px horizontal
```

### Line 128, on the line `const dy = -20 - Math.random() * 40;`

```text
-20 to -60px upward
```

### Line 129, on the line `const opacity = 0.06 + Math.random() * 0.08;`

```text
0.06–0.14
```

### Line 143, above `function initSectionSparks() {`

```text
Spark burst when a section scrolls fully out of the viewport (read completion).
Fires once per section at the h2 heading position.
```

### Line 155, above `if (!entry.isIntersecting`

```text
Fire when section leaves viewport going upward (user scrolled past it)
```

### Line 161, above `const progressBar = document.querySelector('.reading-progress-bar');`

```text
THE BURST FIRES AT THE PROGRESS BAR, not at the heading. Rod 2026-09-03: "there are
          sparks playing when you use it that should move to the top progress bar".
          It used to fire at the h2's own position, which by definition is just above the top of
          the viewport at the moment a section leaves - so the sparks appeared at a scattered x,
          clipped, and read as random debris while scrolling. The bar's leading edge is where the
          reader's progress actually IS, so the burst now marks it: same event, one meaning.
```

### Line 179, above `function initImagePopups() {`

```text
Wrap post content images in <a class="popup"> so GLightbox handles zoom.
Skips emoji, images already inside links, and images already with .popup.
```

### Line 194, above `const slides = images.map((img) => ({`

```text
Build GLightbox slide elements from images
```
