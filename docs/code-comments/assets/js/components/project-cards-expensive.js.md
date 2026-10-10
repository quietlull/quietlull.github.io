# Comments removed from `assets/js/components/project-cards-expensive.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `import { init as initMergedCard } from './merged-card.js';`

```text
project-cards (expensive) — combined keeper. merged-card behaviors (tilt/flip/parallax/dwell) +
  drift-magnet base (drift + magnet on the .post-card wrapper) + cursor band-reveal on glass/back +
  video-on-hover (project-page perf precaution). No text glow (scrapped, Rod 2026-06-14).
  PROVENANCE: merged-card; drift-magnet (breakdance + dennissnellenberg + chriskalafatis);
  band-reveal = yannesidibe .glow; video-on-hover = lab perf precaution.
```

### Line 10, above `let revealTilts = [];`

```text
init refreshes the live target list; the cursor handler is registered ONCE on the shared broadcaster
```

### Line 29, above `function showPosterFrame(video) {`

```text
A paused <video> shows its FIRST frame, and on these captures frame 0 is black, so a card with a
  video cover read as an empty box until you hovered it. Seeking a tenth of a second in gives the
  card a real still to sit on.

  Seeking needs HAVE_METADATA (readyState 1): before that the assignment is silently dropped, so
  wait for `loadedmetadata` when the metadata has not landed yet. `preload="metadata"` is enough -
  the seekable range comes with the metadata, and this is where the byte range gets fetched.

  This lives here rather than in merged-card.js because THIS is the code that runs. merged-card
  had the same seek behind a reduced-motion guard that bailed on every ordinary visit, so it never
  fired; the guard was deleted on 2026-08-31 and the seek moved here.
```

### Line 92, above `root.querySelectorAll('[data-epx-var]').forEach((input) => {`

```text
live tuners write CSS vars onto the grid (z-* read by merged-card, --glow-r by the reveal)
```
