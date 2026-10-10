# Simplification pass: component and page styles

Area: `_sass/components/**` (27 files, 2968 lines) and `_sass/pages/**` (13 files, 1235 lines).
Baseline commit `d2c6f97`. 22 commits on `main` plus this report, none pushed. One of the 22 is the
`--text-muted` line (see "One exception"). No template, script or stylesheet outside the area was
touched.

## Result

The two folders went from 4203 to 3314 lines (889 fewer, 21%): components 2968 to 2264, pages 1235
to 1050. Six files are gone: `_bio-block.scss`, `_figure-real.scss`, `_popups.scss`,
`_reference-links.scss` (and their `@forward` lines in `components/_index.scss`), and
`_categories.scss`, `_category-tag.scss`, which Sass never read.

The compiled stylesheet (`_site/assets/css/jekyll-theme-chirpy.css`) went from 993 rules and 21
`@keyframes` to 873 rules and 19, and from 121,474 to 108,980 bytes (12.5 KB, 10%). Visitors download
that file on every page.

Nothing a visitor can see or feel changed. Every surviving rule is the same text in the same order,
except one rule that lost one unread declaration (see "One exception").

## How it was proved safe

All of it ran in a real Chrome (`tools/real-browser.mjs`), one browser at a time, against `_site`
served by `tools/static-server.mjs`. No server was started. Nothing used an in-page `dispatchEvent`.

**1. A census of every rule.** I parsed the built stylesheet (993 rules) and attributed each rule to
its source file through the Sass source map. For each rule I took its selector, cut off the
hover, focus, active and `::before`/`::after` parts (a pseudo part cannot make an element exist), and
asked the browser how many elements it matches. That was done on all 56 built pages (everything
under `_site/` except `redesign-lab/`) at 1440 and at 390 wide, 112 page loads: once after the
scripts had run, again after a real mouse sweep over the page, again during a real wheel scroll to
the bottom, and once more at the end. A rule counts as dead only if it matched zero elements in
every one of those. 179 of the 606 rules that come from these two folders matched nothing.
The scratch scripts are `rules.mjs` and `census.mjs`; they are not in the repo.

**2. Chrome's own rule usage tracking as a second opinion.** `CSS.startRuleUsageTracking` ran during
every one of the 112 loads. All 179 zero-match rules were also never reported as used. (Tracking
alone would not be proof: 20 rules in these folders match elements and are still never reported,
namely 12 hover, focus and press rules, 6 rules in media blocks that did not apply at those two
widths or in normal motion, and 2 inside the hidden empty-state message. So it was used only to
confirm, never to choose.)

**3. A search for anything that could make the markup appear later.** For every token in a
rule I word-searched the live tree: `_javascript/`, `assets/js/` including `dist/*.min.js` and
`assets/lib/`, `_includes/`, `_layouts/` (inline scripts), `_plugins/`, `_posts/` (including the
untracked drafts), `_tabs/`, `_data/` and the top-level pages. I also searched for class names built
from a prefix (`'is-' + x`, `classList.add(a + b)`): there are none. A name that a script
writes stays; that is why the 24 achievement wall rules that match nothing at rest, `is-flipped`,
`is-closed`, `can-reset`, `is-dragging`, `dm-flash` and `kit-tag.is-active` are still here. Details under "Looked at and left
alone".

**4. After the edits**, on the final tree:
- `npm test` passes (eslint, stylelint, the load-order check, no comments). The load-order check
  still reports 0 hazards and its 7 pinned findings (the three deliberate overrides are untouched).
- `css-rule-diff` against the baseline stylesheet: removed 122 (120 rules and the two `popup`
  keyframes), added 0, changed 1 (the exception below).
- A stricter check of my own: read the old and the new stylesheet in order and confirm that every
  rule in the new one is the same text, in the same place, as in the old one. Measured on the build
  before the last commit: all 924 rules and at-rules of the new file match in order, and the 125 that
  are skipped are the 122 above plus three repeats of the layer order statement from the three
  deleted files that had one (the first statement, which sets the order, is still there). After the
  last commit, 923 of the 924 are identical and the 924th is `.merged-cards`, one declaration shorter.
  `css-rule-diff` does not check order; this does.
- `page-fingerprint capture --styles` / `compare`: **identical across 20 page views** (4541 elements,
  position, size and the whole computed style of each element and its `::before` and `::after`). I
  captured the baseline twice first and the two were identical.
- `check-workbench`: 51 specimens, 0 problems, output byte for byte the same as the baseline.
- `behaviour-check`, normal and reduced motion: byte for byte the same as the baseline (`cmp` prints
  nothing). The baseline itself was captured twice and the two files were equal.

**Hover, focus and pressed states** are not in the fingerprint. For every deleted rule that
mentions one, the class in front of the state matches zero elements on all 56 pages, so no element
can ever be in that state: `.kit-button--primary:hover`, `.inline-link:hover`, `.dm-favicon:hover`,
`.dm-motion-btn:hover`, `.rc--v3:hover` and `:focus-visible`, `.sf--pr-mob:focus-within`,
`.sf--cinra:focus-within`, `.aw--trigger .aw__tile:hover`, `.aw--scale .aw__tile:hover`. For the deleted rules keyed on a class a script could add
(`.is-staggered`, `.is-regular`, `.no-glass`, `.is-settled`, `.is-earned`, `aw--*`), no script,
template or post writes the name, in source or in the built bundles.

## One exception to "changed 0"

`e47f14a` removes one line from a surviving rule: `--text-muted: var(--color-warm-muted);` in
`.merged-cards`. Nothing reads `--text-muted`: no `var(--text-muted)` in the compiled stylesheet
(`--text-muted-color` and `--text-muted-highlight-color` are different properties), none in any
template, inline style, script or stylesheet under `assets/`, and none in the two stylesheets a post
loads from a CDN (tocbot 4.32.2 and GLightbox 3.3.0, fetched and searched inside the browser).
`css-rule-diff` shows it as CHANGED 1 because the rule's body is one declaration shorter. The brief
says custom property definitions that nothing references are dead, so I did it, in its own commit so
it is easy to revert. The fingerprint leaves custom properties out by design.

## Lines per file

| File | Before | After |
|---|---|---|
| `components/_project-cards-expensive.scss` | 178 | 74 |
| `components/_portrait-frame.scss` | 147 | 75 |
| `components/_search-field.scss` | 105 | 37 |
| `components/_button-kit.scss` | 139 | 94 |
| `components/_drift-magnet.scss` | 121 | 77 |
| `components/_merged-card.scss` | 386 | 356 |
| `components/_empty-state.scss` | 93 | 65 |
| `components/_page-title-desc.scss` | 63 | 38 |
| `components/_toc-real.scss` | 60 | 36 |
| `components/_related-card-real.scss` | 95 | 77 |
| `components/_achievement-wall.scss` | 257 | 237 |
| `components/_top-bar.scss` | 256 | 236 |
| `components/_entry-row.scss` | 118 | 113 |
| `components/_favicon.scss` | 62 | 58 |
| `components/_cursor-glow.scss` | 33 | 28 |
| `components/_index.scss` | 26 | 22 |
| `pages/_post.scss` | 385 | 350 |
| `components/_bio-block.scss` | 63 | deleted |
| `components/_popups.scss` | 54 | deleted |
| `components/_figure-real.scss` | 40 | deleted |
| `components/_reference-links.scss` | 32 | deleted |
| `pages/_categories.scss` | 90 | deleted |
| `pages/_category-tag.scss` | 60 | deleted |

Untouched, 17 files: in `components/` `_buttons`, `_footer-line`, `_line-boil`, `_portal-window`,
`_section-head`, `_stamp-callout`, `_washi-tape`; in `pages/` `_about`, `_archives`, `_blog`,
`_index`, `_portal`, `_projects`, `_ramblings`, `_section-landing`, `_stub-pages`, `_tags`. Every
rule in them matched an element, or is kept for a reason given below.

## Deletions, with the evidence

Every item below matched **0 elements on all 56 pages at 1440 and 390 wide** and is named by no
template, script (source or built), plugin, post or data file. Each commit message repeats this.

**1. `_categories.scss` and `_category-tag.scss`** (`ac3d175`, 150 lines). Not compiled at all.
`_sass/pages/_index.scss` forwards neither (they came off on 2026-08-31 when the tag pages and
archive were ported; the index's comment said "left on disk for the strip pass"), and nothing
`@use`s them. The built stylesheet has none of their selectors. `css-rule-diff`: 0 removed.

**2. `_popups.scss`** (`d75c69e`, 54 lines). Every rule is under `#notification`. No template,
layout, script or post writes that id (only a locale string contains the word). It also held the
`popup` keyframes, plain and `-webkit-`, which only `#notification.toast.show` used. 4 rules and 2
keyframes. The achievement toast is a different thing (`.achievement-toast`, `_animations.scss`).

**3. `_bio-block.scss`** (`b9faf7b`, 63 lines, 14 rules). `.bio`, `.bio__h`, `.bio__h--lesser`,
`.bio--panel`, `.bio--headcard`, `.bio--bare`, `.bio--v4`. The About page uses `.bio-h`, `.biorow`
and `.biocol` (styled in `_about.scss`). Already in `docs/WORKBENCH-CHECK.md` section 2.

**4. `_reference-links.scss`** (`e5dd5fe`, 32 lines, 5 rules). `.reference-links` and
`.reference-links__label`: no template, plugin, script or post emits either.

**5. `_figure-real.scss`** (`6269ee5`, 40 lines, 8 rules). `.fig`, `.fig--v1`, `.fig--v2`,
`.fig--v3`. Word search finds none in the live tree (the substring `fig` is in every "config").

**6. `_project-cards-expensive.scss`** (`3e879b7`, 104 lines, 16 rules). `.epx`, `.epx-note`,
`.epx-controls` (+ button), `.epx-ctl` (+ input), and `.is-staggered` / `.is-regular` on
`.wrapper-project-card-grid` with their 10 rules. The controls' markup was lab only, and the script
that set the two layout classes was deleted in `5c1cf45` (js-raw pass). The glow rules under
`.ct-glow-card` stay; one of them is pinned by `css-order-check`.

**7. `_merged-card.scss`** (`e9b03a1`, 28 lines, 3 rules). `body.no-glass .glass-plane` and
`.merged-cards.no-glass .glass-plane` (the glass button that set `no-glass` went in `a853445`),
`.merged-cards-glass-toggle`, `.merged-cards .card-back .takeaway-quote` (the card back writes
`takeaway-text` and `back-read`, which stay).

**8. `_button-kit.scss`** (`0b9d28a`, 45 lines, 6 rules). `.kit-button--primary` (+ `:hover`) and
`.inline-link` (+ `::after`, `:hover`, `:hover::after`). The portal's Enter button, which
`css-order-check` describes as the "primary look", is `kit-button--outline`, not `--primary`
(`_layouts/portal.html:19, 38, 57`).

**9. `_drift-magnet.scss`** (`3d5cb5b`, 44 lines, 5 rules). `.dm-favicon` (+ `__icon`, `:hover
__icon`) and `.dm-motion-btn` (+ `:hover`). The motion button's handler went with the
`[data-motion-toggle]` branch in `86cf3b9`. `.dm-flash`, `.dm-social*` and `.dm-row` stay.

**10. `_search-field.scss`** (`c6235e3`, 68 lines, 14 rules). `.sf__mark` and the variants
`.sf--pr-desk`, `.sf--pr-mob`, `.sf--cinra`, `.sf--craigmod`, `.sf--a24` with their `.sf__input`
rules. All three search boxes on the site are `class="sf sf--ronja"` (`_layouts/blog.html:30`,
`ramblings.html:31`, `section-projects.html:23`).

**11. `_portrait-frame.scss`** (`c085806`, 72 lines, 10 rules). `.pf .pf__media--empty`,
`.fig.pf figcaption`, `.fig.pf--plain`, `.fig.pf--brackets`, `.pf__corners`, `.pf__corner` and its
four corner modifiers. The About page uses only `class="pf pf--window"`
(`_layouts/section-about.html:16`).

**12. `_related-card-real.scss`** (`1e7988f`, 18 lines, 7 rules). `.rc-grid--v3`, `.rc--v3` and its
four rules, and `.rc--v1 .rc__cover { display: none }`. The `rc--v1` cards are built by the inline
script in `_layouts/under-construction.html:45-52`, which creates `rc__body`, `rc__title` and
`rc__meta` and never a cover; the related-post cards that do have `rc__cover` are `rc--v2`.
Handed over by the templates pass.

**13. `_toc-real.scss`** (`c0367fb`, 24 lines, 4 rules). `.toc--v1`, `.toc--v2`, and the two rules
keyed on `a[aria-current="true"]`. The contents list is `class="toc toc--v3"` (10 pages). Nothing
ever sets `aria-current` on a link: tocbot 4.32.2, the pinned version, contains no `aria-`
attribute at all (its source, read inside the browser, searched for `aria-current`: not found), the
links read `aria-current` as `null` on a post, and none of our scripts writes it. Its active link
gets `is-active-link`, which `_post.scss` styles. `docs/WORKBENCH-CHECK.md` section 1 item 6 had
already noted these never match.

**14. `_achievement-wall.scss`** (`ff2cc34`, 20 lines, 6 rules). The modes `.aw--trigger` (3 rules),
`.aw--uniform`, `.aw--scale`, `.aw--short`. They are classes on the `.aw` wrapper. The wrapper is
`class="aw"` (`_layouts/section-about.html:49`) and `achievement-wall.js` never touches its class
(no `classList`, no `className`). The only `aw--` strings in the live tree are these rules.

**15. `_page-title-desc.scss`** (`d6bf806`, 25 lines, 4 rules). `.page-heading--para`,
`.page-heading--ruled` (title and description), `.page-heading--ramblings-hairline`. The headings in
use are `--sub` (28 pages), `--projects` and `--ramblings`.

**16. `_empty-state.scss`** (`9a83870`, 28 lines, 4 rules). `.es--row .es__content`, `.es--split`
and its two child rules. The only layout in use is `.es--stack` (4 elements).

**17. Four single removals.**
- `.er-cat` in `_entry-row.scss` (`9cc3a19`, 5 lines). Was on the workbench's "named here, used
  nowhere" list.
- `.favicon.is-earned .favicon__img` in `_favicon.scss` (`2c2984d`, 4 lines). Nothing adds
  `is-earned`. The reduced-motion rule that lists it next to two live selectors stays whole.
- `&.is-settled` in `_cursor-glow.scss` (`e14f811`, 5 lines). Nothing adds `is-settled`;
  `cursor-glow.js` only sets `--cx` and `--cy`.
- `.top-bar__toggles` in `_top-bar.scss` (`243bdd7`, 20 lines, 3 rules: the base and its placements
  at 780px and 560px). The slot for the old sparkler and fireworks switches; `_includes/top-bar.html`
  has no such element.

**18. `_post.scss`** (`6cf8a12`, 35 lines). `.figmat` (base, 760px and up, `video`) and `.figcap`:
4 rules, no template, plugin, script or post writes either. Also the Sass variable `$toc-bar-height`
(defined, used nowhere in `_sass`) and `@use '../abstracts/placeholders'` (the file has no `@extend`
and no placeholder). The `.prose > .figmat` entry in the `margin-top` list stays, because that
list has live parts.

**19. `--text-muted` in `_merged-card.scss`** (`e47f14a`, 1 line). See "One exception".

## Looked at and left alone, and why

On Rod's leave-alone list (reported, untouched):
- `_washi-tape.scss`, all 17 rules, none matched by any page.
- The `.pwin` rule in `_portal.scss` (P530) and the post page's section sparks and fireflies in
  `_post.scss`, including `.post-firefly` and its reference to `@keyframes firefly-drift`, which
  does not exist.
- Everything under `.post-navigation .post-nav-back`, the Back button and its shimmer chain (P535).
- Every `fa-*` rule, the kit button's text magnet (P536), `.dm-row`.

Rules that matched nothing at rest and are **kept** because a script or content makes them appear.
All 59 zero-match rules left in these folders are in this list:
- **24 achievement wall rules.** `achievement-wall.js` sets `aria-pressed` on click and writes
  `aw__bar--*`, `aw__tier--*`, `aw__state`, `aw__field`, `aw__crit`, `aw__dttl`, `aw__lbl`,
  `aw__val`, `aw__dot` into the detail panel on hover (assembled from strings, e.g.
  `'aw__bar aw__bar--' + tier`). The behaviour check drives all of this.
- `.kit-tag.is-active` (2 rules): `search-field.js` toggles `is-active` on filter pills.
- `.merged-cards .card-flipper.is-flipped`, `.pwin.is-closed`, `.centre.can-reset` (2 rules),
  `.pwin.is-dragging .pwin__inner`, `.dm-flash`: all added by scripts on hover, press or drag.
- 6 GLightbox rules in `_post.scss` (`.goverlay`, `.glightbox-clean .gslide-media` x3,
  `.gprev`, `.gprev:hover`). The lightbox cannot open today (`img-popup.js` needs `.popup`, which
  no page has) but "decide about image zoom" is still open (`docs/AUDIT-1-WORKING.md` item 7, see
  `js-bundled.md` item 1). Kept for that decision.
- 3 rules under `#ramblings-page` and `#post-page .toc ul ul ul`: see the next heading.

Selector lists with a dead part. The brief says a list is dead only if every part is, so these
stay whole. 11 rules; the dead part is named:
- `_buttons.scss`: `.btn, .post-tag, .tool-icon, .fireworks-switch, .sparkler-switch` (the `:active`
  press). Only `.btn` has an element. The three switches were handed over by the bundled-scripts pass.
- `_entry-row.scss` (4 rules): `.er-row > a`, `.er-row--media > a` and the `.er-row > a:hover` and
  `:focus-visible` `.er-thumb` list. Every entry row is `.er-row > .er-body`, none is an `<a>`.
- `_favicon.scss`: `.favicon.is-earned .favicon__img` in the reduced-motion list.
- `_post.scss`: `.prose > .figmat` and `.prose > .cb` in the `margin-top: 40px` list.
- `_about.scss` (2 rules): `.sect a`; links only exist inside `.textbox`.
- `_achievement-wall.scss`, `_button-kit.scss`: the pressed or `is-active` state, set by script.

Looked at, no change:
- **`_section-head.scss` hover rule.** The hand audit said the label "links to its section" and
  every page emits a `<span>`. A span can still be hovered, and the rule changes its colour, so it
  is live. Only its `:focus-visible` half cannot happen on a span, and it shares one rule with
  `:hover`.
- **`.section-head__name`, `.er-ttl`, `.rc` have a blank line left where a comment was** (15 files
  have a blank line before a closing brace, `_related-card-real.scss:32` has a doubled `;;`).
  Harmless, formatting only, left because tidying them is a rewrite of surviving rules.
- The `@layer reset, tokens, prose, components, overrides;` line at the top of 21 files (42 lines
  with the blank). Each repeats the order that the first file sets. Left as a decision.
- `.merged-cards--square`, `dm-flash`, `dwell-ring` and its `is-on` / `is-filling`, `cursor-shield`,
  `line-boil-text` and `__g`, `is-dragging`, `is-closed`, `can-reset`, `is-flipped`, `motion-off`:
  all kept, as the brief said.
- Rules inside hidden blocks (`.es__title b`, `.es__action`, the reduced-motion and `hover: none`
  media blocks): they match elements, Chrome's usage tracking just cannot see them.

## Styles for content no post uses yet

Kept; they appear the moment a post or page supplies the markup.
- `#ramblings-page .searchrow`, `.sf--ronja`, `.er-list` (`_ramblings.scss`): `/ramblings/` lists
  posts tagged `ramblings` and there are none, so the page shows "Nothing here yet" without the
  search row. Known issue 4 in `docs/WORKBENCH-CHECK.md`.
- `#post-page .toc ul ul ul` (`_post.scss`): the contents list takes `h2, h3, h4`
  (`_javascript/modules/components/toc.js`), so a post with an h4 under an h3 under an h2 produces a
  third level.
- Nothing for tables, footnotes, task lists, `kbd`, block quotes, callouts, code blocks, math or
  embeds lives in these two folders (those are in `_sass/base`, agent 5's). The callout stamp
  (`_stamp-callout.scss`) matched.

Deleted although a post author could in principle write the HTML by hand, because no renderer,
plugin or template emits them and no post uses them: `.fig*`, `.figmat`, `.figcap`,
`.reference-links`, `.bio*`. They are in git (`git show d2c6f97:_sass/components/_figure-real.scss`)
if you want any back. See decision 2.

## For Rod to decide

1. **The image zoom styles** (6 rules in `_post.scss`): keep with the lightbox, or delete if image
   zoom is dropped. Same decision as `js-bundled.md` item 1.
2. **The post building blocks that nothing emits** (`.fig*`, `.figmat`, `.figcap`,
   `.reference-links`) went. Say if you wanted them as a toolkit for hand-written HTML in posts and
   I will restore them.
3. **Dead parts inside live selector lists** (11 rules, above): a list edit changes a surviving
   rule, so I left them. A one-line change each if you want them.
4. **The repeated `@layer` order line** at the top of 21 stylesheets.
5. **`--text-muted`** (the one changed rule, `e47f14a`): revert that commit if you would rather the
   pass changed nothing but whole rules.
6. **Washi tape**: 17 rules nobody uses, held on purpose; still in the compiled file.
7. Two things I saw and did not touch because they are rewrites: `.merged-cards .card-title` is
   declared twice in `_merged-card.scss` (the second only sets `font-weight: 400`), and
   `_related-card-real.scss:32` has a doubled `;;`.

## Hand-offs

**For `_sass/abstracts`, `_sass/base`, `_sass/themes` (agent 5):**
- `--space-1` to `--space-6` (`_sass/abstracts/_tokens.scss`) are now read by nothing. `--space-2`,
  `--space-3` and `--space-4` were read only by rules deleted here (`.epx` and
  `.merged-cards-glass-toggle` read `--space-3`, `.dm-motion-btn` read `--space-2` and `--space-4`); `--space-1`, `--space-5` and `--space-6` were
  already unread.
- `--categories-border`, `--categories-hover-bg`, `--categories-icon-hover-color` and
  `--dash-color` (defined near `_sass/themes/_dark.scss:121-124`) were read only by the two
  never-compiled files deleted in `ac3d175`.
- More custom properties defined and never read (no `var()` in the compiled stylesheet, nothing in
  any script, template or other stylesheet): `--amber-a10`, `--amber-a30`, `--bg-glass-strong`,
  `--bg-secondary`, `--code-header-muted-color`, `--color-code-green`, `--color-icon-stroke`,
  `--color-night-2`, `--color-shadow-warm`, `--color-stamp-paper`, `--color-surface-faint`,
  `--font-hand`, `--glass-border-strong`, `--glass-shadow-strong`, `--glow`, `--glow-medium`,
  `--glow-ring`, `--glow-ring-small`, `--glow-soft`, `--glow-strong`, `--glow-subtle`, `--gold`,
  `--gold-03`, `--gold-05`, `--gold-06`, `--gold-08`, `--gold-deep`, `--head-scale`,
  `--input-focus-glow`, `--label-color`, `--link-underline-color`, `--muted`, `--panel`, `--pink`,
  `--shadow-a60`, `--slate-a40`, `--space-scale`, `--text-muted-highlight-color`, `--toc-highlight`,
  `--toc-popup-border-color`, `--topbar-active-color`, `--topbar-text-color`. (`--aw-orbit`, mine,
  is read by a script and stays.)
- `@keyframes` that nothing references (no `animation` or `animation-name` in the compiled file, no
  script mentions them): `chase-tail`, `fade-up`, `pulse`, `pulse-scale`, `pulse-slow`, `shimmer`,
  `spin-slow` in `_sass/abstracts/_animations.scss`. `shimmer` is part of the shimmer chain on the
  leave-alone list.
- Nothing in `abstracts/` lost its last user to my deletions apart from the custom properties above:
  every mixin, placeholder and breakpoint helper that the deleted files used (`mx.transition`,
  `mx.text-ellipsis`, `%rounded`, `%no-bottom-border`, `%link-hover`, `bp.lt`, `bp.get`) still has
  another user.
- `.toast-*` in `_animations.scss` belong to `.achievement-toast`, not to the deleted popups.

**For the templates:** nothing. I looked for markup classes whose last style rule I removed: none of
the deleted class names appears in any built page. The classes that appear on pages and have no rule
anywhere and no script are all third party or generated (`node-name--H2`, `node-name--H3`,
`toc-list-item`, `rouge-gutter`, `rouge-table`, `language-hlsl`, `giscus-frame--loading`).

**For the docs (not mine to edit):**
- `docs/code-comments/_sass/components/{_bio-block,_figure-real,_popups,_reference-links}.scss.md`
  and `docs/code-comments/_sass/pages/{_categories,_category-tag}.scss.md` describe deleted files;
  the pages for the files that shrank quote the old line numbers.
- `docs/ARCHITECTURE-HANDOFF.md:189-190`, `docs/THEME-BOUNDARY-AUDIT.md:130,133` and
  `docs/MERGE-NIGHT.md:157` list `_categories.scss` and `_category-tag.scss`.
- `docs/WORKBENCH-CHECK.md` section 2: the bio block, `.epx*` / `.is-staggered` / `.is-regular`,
  `.no-glass`, `.takeaway-quote`, `.kit-button--primary`, `.inline-link`, `.dm-favicon`,
  `.dm-motion-btn`, `.rc--v3`, `.pf--plain` / `.pf--brackets` are done. The `_section-head.scss:41-52`
  item is not dead (above).
- `docs/simplify/templates.md` hand-offs: `.rc--v1 .rc__cover` is done. `.post-preview`,
  `h1.dynamic-title` and `#related-posts a.post-preview` are in `_sass/base` and `abstracts`
  (agent 5).

**Lab:** no lab page loses anything it showed. The lab pages that carry their own copies of these
components (`redesign-lab/extracted/components/...`) load their own CSS. The only two lab pages
that link the site stylesheet, `callout-pick.html` and `codeblock-fix.html`, use none of the deleted
classes. The generated workbench rebuilt without panels for the four deleted stylesheets (51
specimens before and after). Generated `redesign-lab/todo.html` and `audit/*.html` will drop the
deleted files on their next build.

## Housekeeping

- The drive had 3 to 4 GB free throughout. Scratch stayed at 2.4 MB, one headless Chrome ran at a
  time and every script closes its page in a `finally`. No command hit ENOSPC.
- The page fingerprint's noon clock (`3580e48`) was already in place, so the baseline and the
  final comparison, taken about an hour apart after midnight, agree.
- `.claude/worktrees/elastic-morse/` is a leftover worktree copy inside the repo (it is git
  ignored). Greps that forget `--exclude-dir=.claude` find hundreds of stale hits there.
- My Python edits wrote LF; `git diff` shows only the removed lines and `git status` lists only the
  files that were modified or untracked before the pass started.

## Commit trailer

Every commit ends with `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
