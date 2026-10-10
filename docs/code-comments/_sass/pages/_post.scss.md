# Comments removed from `_sass/pages/_post.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// OWNERSHIP: this file is OURS. The filename is Chirpy's, the contents are almost entirely not.`

```text
================================================================================================
```

### Line 2, above `// ================================================================================================`

```text
OWNERSHIP: this file is OURS. The filename is Chirpy's, the contents are almost entirely not.
```

### Line 3, above `// Measured 2026-09-02 against pristine Chirpy 7.3.1 ('_sass/pages/_post.scss', 496 lines; ours is`

```text
================================================================================================
```

### Line 4, above `// also 496, which is coincidence, not shared ancestry). 66 lines match theirs verbatim; strip the`

```text
Measured 2026-09-02 against pristine Chirpy 7.3.1 (`_sass/pages/_post.scss`, 496 lines; ours is
```

### Line 5, above `// bare braces and blanks and 35 carry content, of which 2 are accidental collisions (a`

```text
also 496, which is coincidence, not shared ancestry). 66 lines match theirs verbatim; strip the
```

### Line 6, above `// 'display: block' and a 'width: 100%' that happen to sit in our own '.content img' rule). So 33`

```text
bare braces and blanks and 35 carry content, of which 2 are accidental collisions (a
```

### Line 7, above `// lines, under 7 percent, are genuinely inherited. Everything else is the redesign's post layout.`

```text
`display: block` and a `width: 100%` that happen to sit in our own `.content img` rule). So 33
```

### Line 8, above `// Upstream's version of this file is superseded wholesale: a clean overwrite deletes the post page.`

```text
lines, under 7 percent, are genuinely inherited. Everything else is the redesign's post layout.
```

### Line 9, above `//`

```text
Upstream's version of this file is superseded wholesale: a clean overwrite deletes the post page.
```

### Line 10, above `// THE UPSTREAM FRAGMENTS THAT SURVIVE, and an upgrade only has to re-check these:`

```text

```

### Line 11, above `//   1. The four '@use' lines below, byte-identical to theirs.`

```text
THE UPSTREAM FRAGMENTS THAT SURVIVE, and an upgrade only has to re-check these:
```

### Line 12, above `//   2. '#toc-solo-trigger' - DELETED 2026-09-03 on Rod's word. It was the closest thing to an`

```text
1. The four `@use` lines below, byte-identical to theirs.
```

### Line 13, above `//      untouched upstream Chirpy block left in this file, which is why it read as foreign.`

```text
2. `#toc-solo-trigger` - DELETED 2026-09-03 on Rod's word. It was the closest thing to an
```

### Line 14, above `//      our margin-top/margin-bottom, and 'var(--font-display)' where they read`

```text
untouched upstream Chirpy block left in this file, which is why it read as foreign.
```

### Line 15, above `//      'v.$font-family-heading', a variable this repo no longer defines.`

```text
our margin-top/margin-bottom, and `var(--font-display)` where they read
```

### Line 16, above `//   3. '#toc-bar' - upstream's rule skeleton (sticky, top 0, z-index 1, the -1rem side pull, the`

```text
`v.$font-family-heading`, a variable this repo no longer defines.
```

### Line 17, above `//      '@extend %btn-color', the 'bp.xl' hide, '.label', '&.invisible') with about half its`

```text
3. `#toc-bar` - upstream's rule skeleton (sticky, top 0, z-index 1, the -1rem side pull, the
```

### Line 18, above `//      declarations replaced: our flex row, 'mx.glass' instead of 'background: var(--main-bg)',`

```text
`@extend %btn-color`, the `bp.xl` hide, `.label`, `&.invisible`) with about half its
```

### Line 19, above `//      no bottom border, and a LOCAL '$toc-bar-height: 3rem' where they read 'v.$topbar-height'.`

```text
declarations replaced: our flex row, `mx.glass` instead of `background: var(--main-bg)`,
```

### Line 20, above `//      That fork is load-bearing: abstracts/_variables.scss re-pointed $topbar-height to 260px, so`

```text
no bottom border, and a LOCAL `$toc-bar-height: 3rem` where they read `v.$topbar-height`.
```

### Line 21, above `//      reading theirs would give the bar a 260px height with no error. Do not "restore" it.`

```text
That fork is load-bearing: abstracts/_variables.scss re-pointed $topbar-height to 260px, so
```

### Line 22, above `// Everything upstream styled and we deleted - post-tail-wrapper, the share row, .post-tags,`

```text
reading theirs would give the bar a 260px height with no error. Do not "restore" it.
```

### Line 23, above `// #related-posts, the Disqus and utterances hooks, the fade-up keyframes, %top-cover - styled`

```text
Everything upstream styled and we deleted - post-tail-wrapper, the share row, .post-tags,
```

### Line 24, above `// markup that no longer exists. An upgrade re-adding those rules re-adds dead CSS, not features.`

```text
#related-posts, the Disqus and utterances hooks, the fade-up keyframes, %top-cover - styled
```

### Line 25, above `//`

```text
markup that no longer exists. An upgrade re-adding those rules re-adds dead CSS, not features.
```

### Line 26, above `// THIS FILE IS UNLAYERED ON PURPOSE. A page sheet must beat the component sheets, and that is how`

```text

```

### Line 27, above `// it does it: unlayered CSS wins over every '@layer'. Do NOT wrap it in a layer. The consequence is`

```text
THIS FILE IS UNLAYERED ON PURPOSE. A page sheet must beat the component sheets, and that is how
```

### Line 28, above `// written out in the note just below, and it is the reason so few declarations are here.`

```text
it does it: unlayered CSS wins over every `@layer`. Do NOT wrap it in a layer. The consequence is
```

### Line 29, above `// ================================================================================================`

```text
written out in the note just below, and it is the reason so few declarations are here.
```

### Line 30, above `@use '../abstracts/variables' as v;`

```text
================================================================================================
```

### Line 37, above `// The old page's 990 lines came down to the eight blocks at the foot of this file, which are the`

```text
A post, ported 2026-08-25 from the inline <style> of `redesign-lab/final-post.html`.
```

### Line 38, above `// only ones whose markup survived the port - the TOC bar and solo trigger, post-nav, and the four`

```text
The old page's 990 lines came down to the eight blocks at the foot of this file, which are the
```

### Line 39, above `// things 'post-enhance.js' builds at runtime. Everything else styled markup that is now gone.`

```text
only ones whose markup survived the port - the TOC bar and solo trigger, post-nav, and the four
```

### Line 40, above `// WHAT THE PAGE DELIBERATELY DOES NOT DECLARE. 'base/_decisions.scss' owns '.prose', its measure,`

```text
things `post-enhance.js` builds at runtime. Everything else styled markup that is now gone.
```

### Line 41, above `// and '.prose p' / '.prose li' weight, leading and tracking. The lab page restated all of them and`

```text
WHAT THE PAGE DELIBERATELY DOES NOT DECLARE. `base/_decisions.scss` owns `.prose`, its measure,
```

### Line 42, above `// won silently, because a page style is unlayered. Only the font-size and the rhythm are here,`

```text
and `.prose p` / `.prose li` weight, leading and tracking. The lab page restated all of them and
```

### Line 43, above `// because the ladder sets neither. The lab's '.prose h3' block is gone for the same reason plus a`

```text
won silently, because a page style is unlayered. Only the font-size and the rhythm are here,
```

### Line 44, above `// second one: it re-implemented the ladder's own numbered-heading device one rung down, and the`

```text
because the ladder sets neither. The lab's `.prose h3` block is gone for the same reason plus a
```

### Line 45, above `// article it was written for contains no h3 at all, so it never rendered.`

```text
second one: it re-implemented the ladder's own numbered-heading device one rung down, and the
```

### Line 46, above `#post-page {`

```text
article it was written for contains no h3 at all, so it never rendered.
```

### Line 55, above `.posthead h1 { margin: 0; }`

```text
`main h1 { margin-top: 3rem }` in base/_typography.scss is unlayered and beats the ladder.
```

### Line 64, above `.posthead {`

```text
The header box. `isolation` keeps the ::after panel behind the text but in front of the page.
```

### Line 109, above `margin-top: 0;`

```text
`.content` in base/_base.scss puts 2rem above the first block. The panel starts at the text.
```

### Line 113, above `.prose p,`

```text
The ladder sets no prose font-size, so it is the page's.
```

### Line 122, above `.prose > * + * { margin-top: 24px; }`

```text
Rhythm is margin-TOP only, never bottom, so nothing has to cancel a trailing margin.
```

### Line 145, above `// 747px column by 1173px, hidden only by the page's own overflow clip. This constrains it and`

```text
Markdown-emitted media, which arrives at its intrinsic size - a 1920px video overhung the
```

### Line 146, above `// nothing more: the redesign's mat and caption treatments (.figmat, figure-real) need markup a`

```text
747px column by 1173px, hidden only by the page's own overflow clip. This constrains it and
```

### Line 147, above `// Markdown post cannot emit yet, so the LOOK of body media is still owed.`

```text
nothing more: the redesign's mat and caption treatments (.figmat, figure-real) need markup a
```

### Line 148, above `// Declared before '.posthero', which needs its own height and wins on source order.`

```text
Markdown post cannot emit yet, so the LOOK of body media is still owed.
```

### Line 149, above `.content img,`

```text
Declared before `.posthero`, which needs its own height and wins on source order.
```

### Line 171, above `.raillabel {`

```text
---- the rail ------------------------------------------------------------------------------
```

### Line 217, above `// '--depth' off the link and '[aria-current]', so the two are bridged here rather than in the`

```text
tocbot nests a <ul> per level and marks the current link with a class. The component reads
```

### Line 218, above `// component, which knows nothing about tocbot.`

```text
`--depth` off the link and `[aria-current]`, so the two are bridged here rather than in the
```

### Line 219, above `.toc ul ul { --depth: 1; }`

```text
component, which knows nothing about tocbot.
```

### Line 229, above `/* WIDENED FROM THE ACTIVE LINK TO EVERY LINK, Rod 2026-09-01: "we already have the yellow`

```text
TOCBOT DRAWS ITS OWN ACTIVE BAR AND IT IS GREEN. Rod 2026-08-25: "when did this weird green
     bar show up thats strange and not supposed to be there". Measured on the live page: a
     `::before` on the active link, absolute, 2px wide, 121px tall, `rgb(84, 188, 75)`. That colour
     appears NOWHERE in this repo - it is tocbot's own default stylesheet, which is served
     cross-origin and therefore cannot be read from script, which is why no earlier sweep of ours
     ever saw it. The rule above already paints our gold bar as the link's `border-left`, so the
     list was carrying TWO left bars in two different colours. This removes theirs and leaves ours.
```

### Line 237, above `.toc a::before { display: none; }`

```text
WIDENED FROM THE ACTIVE LINK TO EVERY LINK, Rod 2026-09-01: "we already have the yellow
     and grey lines for TOC we dont need this white one ... the main issue is its inconsistent".
     tocbot draws its faint rail as a `::before` on EVERY link, and suppressing only the active
     one (the first version of this fix) is exactly what made the two states disagree: with the
     first item active its segment vanished from the top of the rail, with any later item
     active the rail ran unbroken beside our gold bar. One selector, the whole rail gone, and
     the yellow-active grey-rest system is the only one left drawing.
```

### Line 246, above `.post-related { margin-top: 28px; }`

```text
---- the foot ------------------------------------------------------------------------------
```

### Line 254, above `.post-comments {`

```text
THE COMMENTS. Rod 2026-09-03: "make the spacing match the center so its not like a huge bar at
     the bottom and feels connected to the post."
     The width fix is not here - it is that the widget now mounts inside `.post-foot` instead of
     beside the full-bleed footer, so it inherits the column and needs no width of its own. What is
     here is the spacing: 48px off prev/next, which is the same step the rail and the related block
     use, so the foot reads as three stacked pieces of ONE column rather than a page section.
     `min-height` reserves the frame's own starting height, so the footer does not jump upward and
     then back down while the lazy iframe loads.
```

### Line 263, on the line `position: relative;`

```text
the shield below is absolutely placed against this
```

### Line 268, above `.cursor-shield {`

```text
THE CURSOR SHIELD. A transparent sheet of OUR document laid over the giscus iframe, and the
     only way the cursor lantern can see the pointer over the comments at all - measured, the
     frame delivers zero events to this document, not even at its boundary. cursor-glow.js drops
     its `pointer-events` the moment the pointer holds still, so a click still reaches the frame.
     No paint of its own: it exists to be a hit target.
```

### Line 281, above `@media (max-width: 1000px) {`

```text
---- narrow ---------------------------------------------------------------------------------
```

### Line 293, above `// '_javascript/modules/components/toc.js:4' runs 'matchMedia('(min-width: 1200px)')' to pick`

```text
1200px is the ONE switch for the narrow-viewport contents list, and this is its CSS half.
```

### Line 294, above `// which tocbot instance gets built; below that it fills the popup and never '#toc', so the`

```text
`_javascript/modules/components/toc.js:4` runs `matchMedia('(min-width: 1200px)')` to pick
```

### Line 295, above `// rail would hold an empty Contents box. This hides the whole block, label included.`

```text
which tocbot instance gets built; below that it fills the popup and never `#toc`, so the
```

### Line 296, above `// THE THIRD NUMBER IS GONE, 2026-09-02. components/_toc-real.scss used to hide '.toc--v3' at`

```text
rail would hold an empty Contents box. This hides the whole block, label included.
```

### Line 297, above `// 72rem (1152px); it now states no breakpoint at all, by its own header note at its line 11,`

```text
THE THIRD NUMBER IS GONE, 2026-09-02. components/_toc-real.scss used to hide `.toc--v3` at
```

### Line 298, above `// so nothing but 1200px is left in play. The earlier version of this comment flagged that`

```text
72rem (1152px); it now states no breakpoint at all, by its own header note at its line 11,
```

### Line 299, above `// third number as unresolved and is simply out of date.`

```text
so nothing but 1200px is left in play. The earlier version of this comment flagged that
```

### Line 300, above `// 1199.98px, NOT 1199px, and the 0.02 is load-bearing. 'bp.xl' is 'min-width: 1200px'`

```text
third number as unresolved and is simply out of date.
```

### Line 301, above `// (abstracts/_breakpoints.scss:10), and '#toc-bar' hides inside it. At`

```text
1199.98px, NOT 1199px, and the 0.02 is load-bearing. `bp.xl` is `min-width: 1200px`
```

### Line 302, above `// a fractional viewport width like 1199.5px the old 'max-width: 1199px' did not match and`

```text
(abstracts/_breakpoints.scss:10), and `#toc-bar` hides inside it. At
```

### Line 303, above `// 'bp.xl' did not either, so the rail and the mobile bar both drew at once. The 0.02px step`

```text
a fractional viewport width like 1199.5px the old `max-width: 1199px` did not match and
```

### Line 304, above `// is the Bootstrap convention for butting a max-width against a min-width and it covers`

```text
`bp.xl` did not either, so the rail and the mobile bar both drew at once. The 0.02px step
```

### Line 305, above `// every fractional width a browser actually reports. It is NOT a mathematical complement:`

```text
is the Bootstrap convention for butting a max-width against a min-width and it covers
```

### Line 306, above `// a hypothetical 1199.99px still matches neither query. If that sliver ever turns out to be`

```text
every fractional width a browser actually reports. It is NOT a mathematical complement:
```

### Line 307, above `// real, the exact form is '@media not all and (min-width: 1200px)'.`

```text
a hypothetical 1199.99px still matches neither query. If that sliver ever turns out to be
```

### Line 308, above `@media (max-width: 1199.98px) {`

```text
real, the exact form is `@media not all and (min-width: 1200px)`.
```

### Line 318, above `// cannot emit either yet, so they are kept as the styles the port owes rather than deleted.`

```text
The code block and figure treatments the lab wrote for hand-authored markup. A Markdown post
```

### Line 319, above `.figmat {`

```text
cannot emit either yet, so they are kept as the styles the port owes rather than deleted.
```

### Line 351, on the line `$toc-bar-height: 3rem;`

```text
declared in the old file's body; the blocks below still read it
```

### Line 353, above `// WHAT SURVIVED FROM THE OLD POST PAGE. Everything below styles markup that is still rendered:`

```text
================================================================================================
```

### Line 354, above `// the TOC bar and its solo trigger, post-nav, and the four elements 'post-enhance.js' builds at`

```text
WHAT SURVIVED FROM THE OLD POST PAGE. Everything below styles markup that is still rendered:
```

### Line 355, above `// runtime - the reading progress bar, the fireflies, and GLightbox's overlay and controls.`

```text
the TOC bar and its solo trigger, post-nav, and the four elements `post-enhance.js` builds at
```

### Line 356, above `// ================================================================================================`

```text
runtime - the reading progress bar, the fireflies, and GLightbox's overlay and controls.
```

### Line 357, above `.post-navigation {`

```text
================================================================================================
```

### Line 434, above `.reading-progress-bar {`

```text
--- Reading progress bar ---
```

### Line 449, above `pointer-events: none;`

```text
NOT A CONTROL. Rod 2026-09-03: "make the progress bar not interactable."
     It used to carry `pointer-events: auto`, `cursor: pointer` and a hover state that grew it to
     6px, backed by a click-to-jump handler in post-enhance.js - all three are gone, handler
     included. It is a readout, and a 3px strip pinned under the top edge of the window is a bad
     click target anyway: it sits exactly where a reader throws the pointer to reach the tab bar,
     so every near-miss teleported them somewhere in the article.
     `pointer-events: none` is the load-bearing line. Without it the strip still swallows a
     hover along the very top of the viewport even with no handler attached.
```

### Line 462, above `.post-firefly {`

```text
--- Post ambient fireflies ---
```

### Line 475, above `// R4: GLightbox glass overlay — amber themed image zoom`

```text
============================================================================
```

### Line 476, above `// ============================================================================`

```text
R4: GLightbox glass overlay — amber themed image zoom
```

### Line 477, above `.goverlay {`

```text
============================================================================
```
