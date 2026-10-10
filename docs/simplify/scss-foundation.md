# Simplification pass: foundation styles

Area: `_sass/abstracts/**` (7 files, 1210 lines), `_sass/base/**` (9 files, 1644 lines),
`_sass/themes/_dark.scss` (150 lines) and `_sass/main.scss` (5 lines). Baseline commit `d6a9638`
(agent 4's report). 24 commits on `main` plus this report, none pushed. No template, script,
stylesheet outside the area, tool or other doc was touched.

## Result

The area went from 3009 to 1884 lines (1125 fewer, 37%).

| Folder | Before | After |
|---|---|---|
| `_sass/abstracts/` | 1210 | 559 |
| `_sass/base/` | 1644 | 1231 |
| `_sass/themes/` | 150 | 89 |
| `_sass/main.scss` | 5 | 5 |

The compiled stylesheet (`_site/assets/css/jekyll-theme-chirpy.css`) went from 873 rules and 19
`@keyframes` to 772 rules and 9, and from 108,980 to 95,555 bytes (13.4 KB, 12.3%). Visitors download
that file on every page. Added to agent 4's savings the stylesheet is now 25.9 KB smaller than the
121,474 bytes it was before the component pass.

Nothing a visitor can see or feel changed. 101 whole rules and 10 whole `@keyframes` blocks are gone,
and 64 custom property declarations are gone from two rules (`:root` and `html`). One selector list
got shorter (see "css-rule-diff reports two things you should expect"). Every other rule is the same
text in the same place.

### Lines per file

| File | Before | After |
|---|---|---|
| `abstracts/_variables.scss` | 127 | 11 |
| `abstracts/_mixins.scss` | 406 | 110 |
| `abstracts/_placeholders.scss` | 181 | 71 |
| `abstracts/_animations.scss` | 315 | 229 |
| `abstracts/_breakpoints.scss` | 71 | 43 |
| `abstracts/_tokens.scss` | 105 | 90 |
| `base/_base.scss` | 525 | 269 |
| `base/_decisions.scss` | 477 | 393 |
| `base/_typography.scss` | 220 | 212 |
| `base/_a11y.scss` | 86 | 31 |
| `base/_foundations.scss` | 43 | 33 |
| `themes/_dark.scss` | 150 | 89 |

Untouched, 6 files: `abstracts/_index.scss`, `base/_index.scss`, `base/_reset.scss`,
`base/_syntax.scss`, `base/_focus-ring.scss`, `main.scss`. Every rule in `_reset.scss`,
`_focus-ring.scss` matched an element; `_syntax.scss` is all code-block styling (see "Styles for
content no post uses yet").

## How it was proved safe

All browser work used `tools/real-browser.mjs` (a real headless Chrome with real input) against
`_site` served by `tools/static-server.mjs`. No server was started, nothing used an in-page
`dispatchEvent`, one browser ran at a time.

**Stage 1, Sass that produces no CSS.** Each commit was built on its own and the compiled
stylesheet compared with `cmp` against the one from the commit before: byte for byte identical every
time (9 commits, listed below). That needed a particular order: placeholders went before the mixins
they used, and the helpers that only the stage 2 deletions had been using went last.

**Stage 2, dead rules.**
1. *A census of every rule.* I parsed the built stylesheet (873 rules), took each rule's selector, cut
   off the hover, focus, active and `::before`/`::after` parts (a pseudo part cannot make an element
   exist) and asked the browser how many elements it matches. 788 distinct selectors, on all 56 built
   pages (everything under `_site/` except `redesign-lab/`), at 1440 and at 390 wide, 112 page loads:
   at load, again after a real mouse sweep, again during a real wheel scroll to the bottom, and at the
   end. A class or id that appeared on an element at any moment of those loads was also recorded. 470
   selectors matched somewhere. Of the 387 rules not made by a component or page file, 219 matched
   nothing.
2. *Chrome's own rule usage tracking as a second opinion.* Of those 219, Chrome reported only one as
   used: `.achievement-toast.toast-exit`, which a script adds for a moment. That rule stays. None of
   the 101 rules I removed was reported used.
3. *A search for anything that could make the markup appear later.* For every class, id and
   attribute in a removed rule I searched `_javascript/`, `assets/js/` (source and the built
   `dist/*.min.js`), `assets/lib/`, `_includes/`, `_layouts/`, `_plugins/`, `_posts/`, `_tabs/`,
   `_data/` and the top-level pages, as whole words and as substrings (to catch a class built from
   parts, such as `'card-palette-' + x`: there are none). Where a script mentioned a name, I read the
   line to see whether it creates the element or only looks for it. Every case below says which.
4. *Content.* A rule that kramdown, rouge, `callout.rb`, `syntax-retag.rb` or `_includes/refactor-content.html`
   can produce markup for was kept even though no post uses it today (list below).

**After the edits**, on the final tree (`4dcad14`):
- `npm test` passes (eslint, stylelint, the load-order check with 0 hazards and its 7 pinned
  findings, no comments in the source).
- `css-rule-diff` against the baseline stylesheet: REMOVED 122, ADDED 1, CHANGED 2. Explained in the
  next section.
- A stricter check of mine: read the old and the new stylesheet in order and confirm that every rule in
  the new one is the same text, in the same place, as in the old one. All 813 rules and at-rules of
  the new file match in order. The 111 skipped from the old file are the 101 removed rules and the 10
  removed `@keyframes` blocks. Only three nodes needed leniency: `:root` and `html` (custom
  properties removed) and the shared `border-radius` rule (two selector parts dropped).
- Every removed selector part, checked against the census: 113 parts, matched on a page: 0.
- `page-fingerprint capture --styles` / `compare` against the baseline: **identical across 20 page
  views** (position, size and the whole computed style of every element and its `::before` and
  `::after`). I captured the baseline twice first and the two were identical. The plain fingerprint
  (position and size only, with script errors) is also identical.
- `check-workbench`: 51 specimens, 0 problems, output byte for byte the same as the baseline.
- `behaviour-check`, normal and reduced motion: byte for byte the same as the baseline (`cmp` prints
  nothing). The baseline was captured twice and the two files were equal. The bundles listing is
  unchanged (no script was touched).

**Hover, focus and pressed states** are not in the fingerprint. For every deleted rule that mentions
one, the class or id in front of the state matches zero elements on all 56 pages and no script or
template creates it, so no element can ever be in that state. They are named in the commit messages.

**What I did not prove with a browser:** custom properties. The fingerprint compares the properties
that use them, so a wrongly removed one would show up as a restyled element, but only on the ten sample
pages and not for hover or focus. The proof for stage 3 is the search: no `var()` of the name in the
compiled stylesheet, none in any script (the only custom properties scripts read or write are `--mx`,
`--my`, `--cx`, `--cy`, `--aw-orbit`, `--bar-h`, `--pscale`, `--win-w`, `--win-h`), template, inline
style, post, plugin, `assets/css/*.css` (`chrome-scene.css` read, not edited), the Font Awesome subset, or
the CDN stylesheets for tocbot 4.32.2 and GLightbox 3.3.0 (fetched and searched in a browser), and no
name built from parts.

## css-rule-diff reports two things you should expect

1. **ADDED 1.** `.post-preview` and `.post-preview::before` used to `@extend %rounded`. That
   placeholder's one compiled rule (`border-radius: 10px`) lists every selector that extends it, so
   removing the two dead extenders shortens its selector list from 9 parts to 7. `css-rule-diff`
   keys rules by selector text, so it sees the old rule as removed and the shorter one as added. The
   declarations are identical and both dropped parts match 0 elements. My own diff
   (`rulediff2`, in the scratch folder) pairs them up and prints "selector list lost these parts".
2. **CHANGED 2, stage 3 only.** `:root` lost 15 declarations and `html` lost 49, and nothing else
   changed in either. For each stage 3 commit I checked that the before and after declaration lists
   differ by exactly the removed custom properties, with the rest in the same order, and that nothing
   was added.

## Commits

Stage 1, Sass that makes no CSS (compiled stylesheet byte for byte identical each time):

| Commit | What |
|---|---|
| `0519f19` | 12 placeholders nothing extends |
| `1559553` | 25 mixins nothing includes |
| `be5d87d` | 112 of 123 Sass variables nothing reads, and `@use 'sass:math'` |
| `19448ee` | the `md` and `between` breakpoint mixins |
| `ecf7c69` | three `//` comments inside the `$-breakpoints` map (see the blind-spot section) |
| `eb7871b` | two `@use` lines nothing reads (`_base.scss` variables, `_animations.scss` math) |
| `e5ccc74` | 6 more placeholders, left unextended by the stage 2 deletions |
| `cb12679` | the `lt` and `xl` breakpoint mixins and the `xl` map entry, left unused by stage 2 |
| `1aeb355` | puts `$reduced-motion-extras:` on one line so stylelint passes (see below) |

Stage 2, dead rules (101 rules; `css-rule-diff` ADDED 0, CHANGED 0 apart from the shortened list):

| Commit | Rules | What |
|---|---|---|
| `ce62634` | 37 | animations: 35 reduced-motion rules for markup no page has, and the `#main-wrapper` fade |
| `595ecf3` | 6 | a11y: the old `#topbar` rules and `footer p a` |
| `1e9cf7d` | 5 | foundations: `.reveal` (3), `.wrap`, `.invisible` |
| `1080e6a` | 1 | typography: the `#tags`, `#archives`, `.categories` border reset |
| `c3ff807` | 10 | base: `.post-preview`, `.post-meta`, `h1.dynamic-title`, `.content:not(.prose)` |
| `e275739` | 11 | base: `.tag:hover`, `.post-tag`, `.rounded-10`, `.flex-grow-1`, `.hide-border-bottom`, `.input-focus`, a hover block |
| `5d89860` | 16 | base: the old home divider, icon boxes and card palettes |
| `17e3b4c` | 15 | decisions: classes only the lab invented |

Stage 3, custom properties and keyframes (64 custom property declarations, 10 keyframes blocks):

| Commit | What |
|---|---|
| `45b9922` | `--space-1` to `--space-6` |
| `53a0010` | `--color-night-2`, `--color-surface-faint`, `--color-stamp-paper`, `--color-code-green`, `--color-icon-stroke`, `--color-shadow-warm`, `--font-hand` |
| `379f0fd` | `--color-line-tag`, `--color-tag-text` |
| `95b9f09` | 9 dark theme properties that no rule ever read |
| `1ef2654` | 21 dark theme properties that only deleted Sass read |
| `afef84d` | 19 dark theme properties that only deleted rules read |
| `4dcad14` | ten `@keyframes` |

**A note on bisecting.** Commits `ce62634` to `e275739` (six commits) fail `npm run lint:scss`
on one line: stylelint wants `$reduced-motion-extras: '#section-landing::before';` on one line, and
`ce62634` left the value on the next line. `1aeb355` fixes it and proves the stylesheet did not
change. The compiled output of every commit was checked; only the lint was red.

## Deletions, with the evidence

### Stage 1: Sass that produces no CSS

**Variables (`be5d87d`).** `_variables.scss` had 123 `$name: value !default` lines. I searched all of
`_sass/` for each name, as `v.$name` from other files and `$name` inside the file. 110 are read
nowhere; `$glass-blur` and `$glass-blur-strong` were the only readers of `$blur-md` and `$blur-lg`, so
those went too. Eleven stay, and each has a reader: `$radius-sm` (`_syntax`, `_typography`),
`$radius-lg` (`_placeholders`, `_post`), `$sidebar-width`, `$sidebar-width-large`, `$footer-height`,
`$footer-height-large`, `$main-content-max-width`, `$back2top-size` (all in `components/_buttons.scss`),
`$code-font-size`, `$code-header-height`, `$code-icon-width` (`_syntax`). These are Sass variables, not
CSS custom properties; none could reach the browser.

**Mixins (`1559553`).** 25 of 36 mixins are included nowhere: `text-ellipsis`, `text-clip`, `pt-pb`,
`glass-strong`, `glass-lantern`, `glow-dot`, `glow-dot-small`, `radial-hover-glow`, `icon-with-glow`,
`pulse-glow` (with the `@keyframes pulse-glow` it declared inside), `smooth-transition`, `slide`,
`flex-center`, `max-w-100`, `input-focus-glow`, `label`, `heading-glow`, `img-caption`,
`img-with-glow`, `card-base`, `card-hover`, `button-base`, `button-with-shimmer`, `floating-orb`,
`custom-scrollbar`. `text-ellipsis` and `glass-strong` were included only by placeholders that
`0519f19` removed first. The 11 that are included keep every line: `mt-mb`, `ml-mr`, `pl-pr`, `glass`
(`_post.scss`), `shimmer-effect`, `animated-underline`, `transition`, `align-center`, `placeholder`,
`placeholder-focus`, `prompt`. The `@use 'variables'` line went with `card-base` and `button-base`,
the only users of `v.$radius-lg` in that file.

**Placeholders (`0519f19`, `e5ccc74`).** A placeholder makes no CSS until a rule `@extend`s it.
`%text-highlight`, `%text-xs`, `%text-clip`, `%text-ellipsis`, `%link-underline`, `%nav-links`,
`%clickable-transition`, `%max-w-100`, `%panel-border`, `%btn-color`, `%glass-panel` and
`%glass-panel-strong` were extended by nothing. After stage 2 removed their only extenders,
`%text-sm`, `%normal-font-style`, `%link-hover` (`.post-meta`), `%tag-hover`, `%link-color`
(`.tag:hover`) and `%no-bottom-border` (the `#tags` rule) were unextended too. Nine stay, all
extended: `%rounded`, `%no-cursor`, `%cursor-pointer`, `%table-cell`, `%code-snippet-bg`,
`%code-snippet-padding`, `%img-caption`, `%anchor`, `%sup-fn-target`.

**Breakpoints (`19448ee`, `cb12679`).** `md` and `between` were included nowhere. `lt` and `xl` were
included once each, by `h1.dynamic-title` and `.content:not(.prose)`. The `md` map key stays
(`bp.get(md)` is read in `_post.scss`).

**Two `@use` lines (`eb7871b`).**

### Stage 2: dead rules

Every rule below matched **0 elements on all 56 pages at 1440 and 390 wide** and is named by no
template, include, plugin, post or data file, and no script creates it. Where a script mentions a
name, the case is described.

**`ce62634` animations, 37 rules.** The reduced-motion list (`html <selector> { animation: none }`)
named a sidebar-era top bar and cards that are gone. Removed selectors: `#topbar`, `#avatar`,
`.nav-item .nav-link`, `.topbar-bottom a`, `.text-container`, `#landing-box::before` and `::after`,
`.portal-door`, `.portal-side-link`, `.posts-grid .card`, `.post-card .card`,
`#related-posts a.post-preview`, `article > header`, `.post-tldr`, `.post-takeaway`,
`.section-icon-box` (+ `.icon-dot`), `.card-icon-box` (+ `.card-icon-dot`), `.tool-icon`,
`.demo-reel-embed`, `.demo-reel-placeholder` (+ `i`), the sparkler and fireworks switch tracks,
`.meta-chip`, `.scroll-indicator i`, `.nav-ribbon`, `.landing-title`, `.access > section`,
`.year::after`, `.steam-line`, `.ambient-orb`, and `#main-wrapper` / `#main-wrapper.page-exit` (twice
each: the reduced-motion entry and the fade-in rule itself). Script mentions:
- `achievements.js:272` does `document.getElementById('avatar')`; nothing has that id, so the script
  branch never runs.
- `achievements.js:251` looks up `.tool-icon`, `mouse-trail.js:11` lists `.card`, `.tool-icon`,
  `.fireworks-switch`, `.sparkler-switch`, `.post-tag` in a selector string. Neither creates one.
- `page-transition.js` reads `#main-wrapper` and adds `.page-exit` to it only if it exists. No page
  has it (the templates pass found this), and no script creates it.
- `.year::after`: the archives page uses `arc-year`, not `year`. `article > header`: the post's
  `<header>` is not a direct child of `<article id="post-page">`.

Kept from that list because they match elements or are on a leave-alone list: `.post-nav-card`,
`#back-to-top.show`, `.btn.btn-outline-primary` (Back button, P535), `#section-landing::before`,
`.post-firefly`, and `.post-section` and `.post-content-container` (the post sparks; `post-enhance.js`
builds `.post-section` and queries `.post-content-container`).

**`595ecf3` a11y, 6 rules.** `#topbar .topbar-bottom > a.mx-1`, `footer p a`, `#topbar`, and the
sparkler/fireworks switch tooltip under `#topbar .topbar-bottom` (base, `[title]::after`, and the
`:hover`/`:focus-within` pair). No `id="topbar"`, `topbar-bottom`, `mx-1`, `sparkler-switch` or
`fireworks-switch` anywhere. The only footer is `_includes/footer-line.html`: links and a span, no
paragraph, and no script builds one. The hover and focus rules need an element with id `topbar`.
The button list below them stays whole (see dead parts).

**`1e9cf7d` foundations, 5 rules.** `.reveal`, `.reveal.in` and its reduced-motion override, `.wrap`,
`.invisible`. No class `reveal`, `wrap` or `invisible` in any markup (`footer-wrap` is another class).
`toc.js` calls `$tocWrapper.classList.remove('invisible')` on `#toc-wrapper`, but that element in
`_layouts/post.html:36` never had it, and no script adds it. `.d-none` stays: `mermaid.js` adds it.

**`1080e6a` typography, 1 rule.** `main .categories a, main #tags a, main #archives a` (a bottom
border reset, written as one list). No `id="tags"`, `id="archives"` or `class="categories"` in any
layout, include or script. (kramdown would give a post heading called Tags the id `tags`, but the
rule only turns off a bottom border on links inside it and nothing draws one, so even then nothing
changes.)

**`c3ff807` base, 10 rules.** `h1.dynamic-title` (and its `~ .content` margin, under 850px),
`.post-preview` with `::before` and `:hover::before`, `.post-meta` with its `em` and link hover, and
`.content:not(.prose)` with its 1200px variant. The only element with class `content` is the post
body, always `class="prose content"` (`_layouts/post.html:66`), so `:not(.prose)` cannot match. The
`.post-preview` removal is also what shortened the shared `border-radius` list.

**`e275739` base, 11 rules.** `.tag:hover` (two rules), `.post-tag` (+ `:not(:last-child)`),
`.rounded-10`, `.flex-grow-1`, `.hide-border-bottom`, `.input-focus`, and an
`@media (hover: hover)` block holding `#sidebar ul > li:last-child::after`, `.nav-link` and
`.post-preview`. `.post-tag` is only ever looked up (`mouse-trail.js:11`, `achievements.js:209`), never
created. No `#sidebar`, `.nav-link` or `.tag` element exists.

**`5d89860` base, 16 rules, 138 lines.** `.home-content > section + section` (and `::before`),
`.scene-spacer`, `.section-icon-box` (5 rules), `.card-icon-box` (4), `.post-card:hover
.card-icon-glow`, and the palettes `.card-palette-amber`, `-orange`, `-gold`. None of these class
names appears anywhere in the live tree, not even as a substring (`palette-`, `icon-box`, `icon-dot`
return nothing), so none is built from parts. `.post-card` is live (`project-cards-expensive.js`,
`project-card.html`) but never contains a `.card-icon-glow`.

**`17e3b4c` decisions, 15 rules.** `.d-h0`, the `.d-anchor` family (base, the `:hover`/`:focus-visible`
pair, the two `:is(...)` rules, the reduced-motion override), `.prose .table-scroll`, `.d-tag`,
`.d-meta`, `.d-relcard` (base, hover/focus pair, reduced-motion), `.d-callout--reference`,
`body.spacious .bio-h` and `body.spacious .bio-h--lesser`. These names appear only in `redesign-lab/`
pages. The heading anchor `refactor-content.html` writes is `class="anchor"`; the table wrapper it
writes is `table-wrapper`; `callout.rb` knows only note, tldr, warning and quote; nothing adds class
`spacious` (the only class a script puts on `<body>` is `motion-off`, `drift-magnet.js:178`).

### Stage 3: custom properties and keyframes

**Custom properties (64 declarations).** For every definition I checked: no `var(--name` in the
compiled stylesheet; no mention in any script, template, inline style, post, plugin or
`assets/css/*.css`; no mention in the Font Awesome subset or the CDN stylesheets; and no name built
from parts (the only interpolated names in `_sass` are `--prompt-#{$type}-bg`, `--prompt-#{$type}-icon-color`
and `--fa-font-#{$fa_style}`, which are reads, and compile to plain names). I also followed chains: a
property read only by another unread property is unread too. I ran that to a fixed point after each
stage; it converges in one round (the second round added only what my stage 2 deletions had stranded,
which is why there are six groups).
- `45b9922`: `--space-1` to `--space-6`.
- `53a0010`: `--color-night-2`, `--color-surface-faint`, `--color-stamp-paper`, `--color-code-green`,
  `--color-icon-stroke`, `--color-shadow-warm`, `--font-hand`. Never read by anything.
- `379f0fd`: `--color-line-tag`, `--color-tag-text` (read only by `.d-tag`).
- `95b9f09`: `--categories-border`, `--categories-hover-bg`, `--categories-icon-hover-color`,
  `--dash-color`, `--code-header-muted-color`, `--gold-06`, `--gold-08`, `--toc-highlight`,
  `--toc-popup-border-color`. Not read even before this pass (the first four only by the never-compiled
  stylesheets the component pass deleted).
- `1ef2654`: 21 read only by the mixins and placeholders stage 1 removed. `git show d6a9638:_sass/abstracts/_mixins.scss`
  shows the readers.
- `afef84d`: 19 read only by rules stage 2 removed: `--card-bg`, `--card-hover-bg`, `--tag-hover`,
  `--separator-gradient`, `--transition-fast`, `--input-focus-border-color`, `--gold-60`,
  `--orange-a10/15/20/35/60/80`, `--yellow-a15/20/35/60/80`, `--red-a10`.

**Keyframes (`4dcad14`).** `float`, `pulse`, `pulse-scale`, `pulse-slow`, `fade-in`, `fade-up`, `spin`,
`spin-slow`, `chase-tail`, `page-fade-out`. I parsed every `animation` and `animation-name` value in
the stylesheet with postcss and searched every script and stylesheet for the names. The only
animation properties scripts touch are `post-enhance.js:40` (`animationDelay`) and
`drift-magnet.js:170` (listens for `animationend`, name `dm-border-fly`, which stays). `fade-in` and
`page-fade-out` were named only by the `#main-wrapper` rule; `float` and `pulse-slow` only by Sass
mixins. Kept: `shimmer` (P535), `float-gentle`, `fade-in-up` (named by `.under-construction` and
`.not-found`), `toast-slide-in`, `toast-slide-out`.

There is no `@font-face` or `@property` in this area (those are in `_line-boil.scss` and
`_merged-card.scss`).

## Looked at and left alone, and why

On Rod's leave-alone list (reported, untouched): `.btn.btn-outline-primary`, `.shimmer`, the
`shimmer-effect` mixin, `@keyframes shimmer` and `.blur &` in `_typography.scss` (P535); every
`--syn-*` colour and every rouge token rule; the short-name tokens in `_foundations.scss`;
`fa-*` (none are in this area); `.popup`, `.img-link` and `%img-caption` (image zoom); the post
sparks and fireflies (`.post-section`, `.post-content-container`, `.post-firefly` entries in the
reduced-motion list); the achievement toast and debug panel (`.achievement-toast`, `#achievement-debug`
and all its children: 21 rules that match nothing at rest, built by `achievements.js`; `.toast-exit` is
added for a moment, Chrome saw it used).

After the deletions **118 rules in these files still match no element**, and all 118 are on the list
above or are content (next heading). 32 more rules are live but carry a dead part in their selector
list; the brief says a list is dead only if every part is, so they stay whole. The dead parts:
- `_placeholders.scss`: `.content a.popup` and `.embed-video` in the `%img-caption` and `%rounded` lists,
  `blockquote[class^=prompt-]`, `.preview-img`, `.preview-img img`, `figure.highlight`, `h4 .anchor`, `h5 .anchor`.
- `_base.scss`: `.content ol.task-list`, `.content ul.task-list` (and their `li`).
- `_syntax.scss`: `div.nolineno`, `div.language-console`, `div.language-terminal` (first-column rules).
- `_a11y.scss`: `.projects-preview-header .btn.btn-sm`, `.landing-projects .btn.btn-sm` (the third part,
  `a.btn.btn-outline-primary.btn-sm`, is the Back button).
- `_decisions.scss`: `.d-h2`, `.d-h3`, `.d-h4`, `.d-counts`, `.d-figure` (+ `img`, `video`, `figcaption`) in lists with
  `.prose h2` and so on; `.prose li a` (no post puts a link in a list item yet); the rouge classes
  `kd kr kn nv na py fm m mh mb c cm cs cd`.

## Styles for content no post uses yet

Kept; they appear the moment a post supplies the markup. All of them are rules that match nothing today.
- **Lists and definitions:** nested lists (`.content ol:not([class]) ol` and friends), task lists
  (`ul.task-list` and its checkbox icons, which `refactor-content.html` writes), `dl > dd`.
- **Headings:** `h4` and `h5` (the scroll margin from the `@for` loop, `.prose h4` and its counter).
- **Block quotes and callouts:** `blockquote`, `blockquote > p:last-child`, the prompt variants
  `prompt-tip/info/warning/danger` (kramdown `{: .prompt-tip}`) and their 576px variant. The four
  `d-callout` types that `callout.rb` writes (note, tldr, warning, quote): base, `> p`, label, warning
  padding, tape colours.
- **Text:** `kbd`, `.prose del`, `ins`, `sup`, `sub a`, footnotes (`.footnotes > ol`, `a.footnote`,
  `a.reversefootnote`, `sup:target`).
- **Code:** `code.filepath`, `a > code.highlighter-rouge` (+ hover), `blockquote code`, `td.rouge-code a`,
  `[file] .code-header span > i`, the copy-button `[timeout]` state (set by `clipboard.js` when the button
  is pressed), `nolineno`/`language-console`/`language-terminal` first-column rules, and the rouge token classes
  and `x-*` classes `syntax-retag.rb` writes that today's posts do not hit (`.no`, `.nc`, `.nn`, the string
  family, `.cp`, `.x-func`, `.x-class`, `.x-const`).
- **Images and embeds:** `.left`, `.right`, `.preview-img` (+ `img`, `:not(.no-bg)`, `#post-list`), `html .light`
  (an image class `refactor-content.html` picks out), `.mermaid`, `mjx-container`, and `.embed-video`
  (+ `.twitch`, `.file`) and `.embed-audio` (+ `.file`, `.spotify`). The Chirpy `embed/*.html` includes that
  wrote the embed classes are not in `_includes/`, so nothing emits them today; they stay because the brief
  names embeds as content.
- **`.d-none`:** `mermaid.js` adds it to a mermaid block.
- **`.tok-type`, `.tok-keyword`, `.tok-const`, `.tok-var`, `.tok-class`, `.tok-struct`, `.tok-func`,
  `.tok-comment`, `.tok-number`, `.tok-string`** (8 rules, `_decisions.scss`): see decision 1.

## Short-name tokens in `_foundations.scss` that nothing reads (kept, for Rod)

Of the fourteen short names in the `:root` rule at the top of `base/_foundations.scss`, these ten
are read by nothing today: `--glow`, `--glow-soft`, `--gold`, `--gold-deep`, `--panel`, `--pink`,
`--muted`, `--head-scale`, `--space-scale`, and `--measure` (its only reader was `.wrap`, removed in
`1e9cf7d`). These four are read: `--night`, `--night2`, `--text` (the body background and colour) and
`--type-scale` (the body font size). I deleted none of them, as the brief says. The long-name tokens in
`abstracts/_tokens.scss` that nothing read are gone (stage 3); the long-name twin of `--night2`,
`--color-night-2`, went with them, which does not conflict with either naming choice.

## For Rod to decide

1. **The `.tok-*` rules** (8 rules, about 12 lines, `_decisions.scss:333-373`). Nothing emits those
   classes: rouge writes `k`, `kt`, `n`, `s` and so on and `syntax-retag.rb` writes `x-*`. They are
   names from the lab's text-decisions page. I deleted them in my first draft and put them back,
   because the brief says to leave rouge token rules alone and these sit in the same block. A one-line
   decision each way.
2. **The embed styles** (`.embed-video`, `.embed-audio`, about 45 lines) and **the image zoom styles**
   (`.popup`, `.img-link`, `%img-caption`) stay until you decide. Nothing emits the embed classes.
3. **`--glass-shadow` is broken, and it was before this pass.** `_dark.scss:19-22` has two `//` notes
   inside the value (`// Deep shadow`, `// Ambient glow`). In a custom property Sass keeps them as text,
   so the compiled value is `0 8px 32px rgba(...), // Deep shadow 0 0 60px ...` and `box-shadow:
   var(--glass-shadow)` is invalid. I measured it: the post's previous/next cards
   (`.post-nav-card`, which use the `glass` mixin) compute `box-shadow: none`. Deleting the two notes
   would make a shadow appear (a visible change), so I left them. Say if you want the shadow; it is a
   two-line edit.
4. **Duplicated definitions** (not deleted, because both are read): `--color-white` and `--color-black`
   are defined in `_tokens.scss` and again, with the same value, in `_dark.scss`. `--z-overlay` is 200 in
   `_tokens.scss` and 500 in `_dark.scss`. `:root` beats `html` on the same element, so the page uses 200
   (measured: 200 on the root) and the 500 never applies. Delete the `_dark.scss` three, or pick the value you meant.
5. **The repeated `@layer reset, tokens, prose, components, overrides;` line.** It is at the top of
   `_foundations.scss`, `_decisions.scss`, `_focus-ring.scss` and in the middle of `_typography.scss:24`
   (agent 4 found 21 more in the component files). Only the first one in the output sets the order.
6. **Dead parts inside live selector lists** (32 rules, above). A list edit changes a surviving rule.
7. **Two comments are still in the source** (a `stylelint-disable` directive with several lines of
   prose): `_decisions.scss:149-151` and `components/_line-boil.scss:63`. The check keeps directives. The
   `:not()` explanation in `_decisions.scss` is the kind of thing you said belongs in `CODE-AUDIT.md`.
8. **Cosmetic:** some files have a doubled blank line where a comment used to be (`_decisions.scss`,
   `_base.scss`). Left alone because tidying them is a rewrite of surviving lines.

## The no-comments check has blind spots

`tools/strip-comments.mjs` finds SCSS comments with `postcss-scss`'s `walkComments`. I fed that parser
fourteen cases directly (script is `blindspots.mjs` in my scratch folder, version of postcss-scss as
installed here):

| Where the comment is | Seen? |
|---|---|
| between two rules, on its own line | yes |
| inside a rule, on its own line | yes |
| after a declaration, same line | yes |
| inside a Sass map `( ... )` | **no** |
| inside a multi-line Sass list (comma separated, with or without parentheses) | **no** |
| inside a multi-line function call, `calc(...)` | **no** |
| inside the argument list of an `@include` | **no** |
| inside a multi-line property value (`box-shadow`) | **no** |
| inside a multi-line custom property value | **no** |
| inside a selector list | **no** |
| inside an `@each` list | **no** |
| `/* */` inside a Sass map | **no** |
| `/* */` inside a value | **no** |

So it only sees comments that sit between statements. Anything inside a value, a selector or the
parameters of an at-rule is invisible to it, for both `//` and `/* */`.

What that cost in the code: I searched every `//` and `/*` in `_sass/` and `assets/css/*.scss` as plain text.
Five comments were hidden, and nothing else:
- `_breakpoints.scss`: `// 1 column`, `// 2 columns`, `// 3 columns` inside the `$-breakpoints` map. Removed
  in `ecf7c69`. They said how many columns Chirpy used above `sm`, `lg` and `xl`; they never reached the
  stylesheet.
- `_dark.scss:20-21`: `// Deep shadow` and `// Ambient glow` inside the `--glass-shadow` value. These are not
  comments to the browser, they are part of the value (decision 3), so they are still there.
- Two `stylelint-disable` directives with prose, which the tool deliberately keeps (decision 7).

I did not search outside the SCSS, so I do not know what the same blind spot hides in the scripts or
templates (the JavaScript parser is a different one, `espree`, which handles those positions, but I did
not test it). A plain-text search for `//` and `/*` after the tool says zero is the cheap cross-check.

## Hand-offs

**Scripts** (not mine to edit; code that now has no markup and no style):
- `achievements.js:272-284` looks up `document.getElementById('avatar')`. No element has that id.
- `achievements.js:251` looks up `.tool-icon`; `achievements.js:209` and `mouse-trail.js:11` name `.post-tag`,
  `.pin-tag`, `.card`, `.tool-icon`, `.sparkler-switch`, `.fireworks-switch`, `.badge` in selector strings,
  none of which exist.
- `toc.js:18` removes the class `invisible` from `#toc-wrapper`, which never has it.
- `page-transition.js` now has no style at all: `#main-wrapper` is on no page and the fade rules are gone.

**Templates:** the class `bio-h--lesser` is on the About page (`_layouts/section-about.html`) and now
has no rule anywhere. Its only rule was `body.spacious .bio-h--lesser`, which could never match.
Everything else the census saw on pages still has a rule or a reason: the classes with no rule anywhere
are `giscus-frame--loading`, `language-hlsl`, `node-name--H2`, `node-name--H3`, `rouge-gutter`,
`rouge-table`, `toc-list-item` (third party or generated) and `bio-h--lesser`.

**Components (agent 4's files):** `--gold-60` is defined at `_sass/components/_merged-card.scss:18` and is
now read by nothing (its reader was `.section-icon-box .icon-dot`, removed here). `_buttons.scss:57-61`
lists `.post-tag`, `.tool-icon`, `.fireworks-switch`, `.sparkler-switch` beside `.btn`; those parts have
no elements (agent 4 noted this too).

**Docs (not mine to edit):**
- `docs/code-comments/_sass/abstracts/{_mixins,_placeholders,_variables,_breakpoints,_animations,_tokens}.scss.md`,
  `docs/code-comments/_sass/base/{_base,_a11y,_foundations,_decisions,_typography}.scss.md` and
  `docs/code-comments/_sass/themes/_dark.scss.md` describe code that has gone or quote old line numbers.
- `docs/ARCHITECTURE-HANDOFF.md`, `docs/ARCHITECTURE.md`, `docs/MERGE-NIGHT.md`,
  `docs/THEME-BOUNDARY-AUDIT.md` and `docs/REQUESTS.md` mention the mixin and placeholder files;
  `docs/ARCHITECTURE-HANDOFF.md` lists `--space-N`; `docs/REQUESTS.md` mentions `.post-preview` and
  `.tok-type`.
- `docs/WORKBENCH-CHECK.md` section 2 and the templates report's hand-offs: `h1.dynamic-title`,
  `.post-preview`, `#related-posts a.post-preview` are done; `.tool-icon`, `.sparkler-switch`,
  `.fireworks-switch`, `.post-card .card`, `.posts-grid .card` are done (the `_buttons.scss` list
  parts are not, above). `.shimmer` and `.popup` were left on purpose.
- `docs/simplify/scss-components-pages.md` hand-offs for this area: all done except `shimmer`
  (held). Its list of 40-odd unread custom properties is done apart from the ten short names.

**Lab:** nothing in `redesign-lab/` links the site stylesheet except `callout-pick.html` and
`codeblock-fix.html` (agent 4's finding). The lab pages that use `.d-*`, `.tok-*`, `.post-preview` and
the like carry their own CSS and do not change. Generated `todo.html` and `audit/*.html` will drop the
removed lines on their next build.

## Housekeeping

- The drive had 3.3 to 3.8 GB free throughout. My scratch folder is 4.7 MB, one headless Chrome ran at
  a time, every script closes its page in a `finally`, nothing hit ENOSPC.
- The session was cut off by a usage limit after `e275739`. The resume found the lint failure above and
  re-proved everything committed so far (fingerprint, workbench, rule diff) before continuing.
- My edits wrote LF; `git diff` shows only removed lines apart from the one-line `$reduced-motion-extras`
  change and three removed blank lines.
- The other session's files (`chrome-scene.css`, `hana-bloom.js`, the two `FishGame.md` posts, the drafts,
  `.obsidian/`, `POST-FRAMES-FINDINGS.md`) were never touched.
- `tools/` was not edited. The tools I leaned on and what they could not do: `css-rule-diff` cannot tell a
  shortened selector list from a removed rule plus an added one; it compares by selector text.

## Commit trailer

Every commit ends with `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
