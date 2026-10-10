# Comments removed from `_includes/landing-scripts.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `<script type="module">`

```text
The landing's own JS. `assets/js/chrome.js` already runs the top bar, the magnets and the bar's
wordmark boil, so what is here is the three things only this page has.
```

### Line 7, above `import { init as initCards } from '{{ '/assets/js/components/project-cards-expensive.js' | relative_url }}';`

```text
initCards also runs merged-card and drift-magnet internally.
```

### Line 11, above `import { initLineBoil } from '{{ '/assets/js/components/line-boil.js' | relative_url }}';`

```text
Each vertical column is its own mark, so each gets its own boil and its own starting phase.
    The clock boils too - Rod's three number faces are attached to the same family names by
    unicode-range, so nothing here has to know they exist.
```

### Line 21, above `(function () {`

```text
WRITE INTO THE CELLS, never back over textContent. Once the boil has run the clock's characters
    live in pinned spans that each carry their own face and phase, and assigning textContent would
    delete all eight every second. Before the boil resolves there are no cells and the plain
    assignment is right, which is what the length check picks.
```

### Line 44, above `{% assign reel_posts = site.posts | where: 'section', page.section | where: 'tags', 'project' %}`

```text
ONE bar that keeps playing while it is on screen: a hero clip runs and on `ended` (or
`error`) another takes over. The `<video>` element itself is created when `#reel-bar` scrolls
into view and fully removed when it scrolls out - see the mount/unmount comment below for why.

THE LIST IS THE POSTS' OWN HEROES. Rod 2026-08-22: "maybe limit it to hero project videos for
project posts" - a full sweep of assets/media was pulling clips of BUGS. The lab baked this
array by hand; here it is generated from each post's own `image.path`, so it cannot drift.
WIP posts and non-video heroes are excluded.
```

### Line 82, on the line `if (play && play.catch) { play.catch(function () {}); }`

```text
blocked autoplay must not break it
```

### Line 85, above `function mount() {`

```text
THIS WAS ATTEMPT 4 AT THE EDGE GHOST BOX AND IT DID NOT FIX IT. Kept because it is
        worth having anyway, and demoted to that: the reel stops decoding video for a section
        nobody is looking at.

        WHAT IT DID SETTLE, WHICH IS THE USEFUL PART: the `<video>` is INNOCENT. Splitting the
        host from the video let Rod delete the empty `<div class="reel__bar">` on its own in
        Edge, and the ghost died with it - with no video mounted at all. Four attempts had been
        aimed at the video; the box is the thing. See `_section-landing.scss` for the full list
        of what is dead so none of it is retried.
```

### Line 104, on the line `video.addEventListener('error', next);`

```text
a bad file would otherwise stall it forever
```

### Line 113, on the line `video.load();`

```text
aborts the in-flight fetch/decode now, rather than whenever GC gets to it
```

### Line 118, above `var observer = new IntersectionObserver(function (entries) {`

```text
No `observer.disconnect()` teardown: `#reel-bar` never leaves the DOM, and the only way
        off this page is `page-transition.js` setting `window.location`, a real navigation that
        tears down this whole script (and the observer with it) on its own.
```
