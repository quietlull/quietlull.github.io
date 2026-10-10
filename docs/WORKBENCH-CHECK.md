# Workbench check, 2026-09-29 (P538)

Rod: *"double check that all workbench components are working one by one launch agents to check"*.

Six agents checked all 36 tabs of `redesign-lab/workbench.html`, one component at a time, each
against the live page it was extracted from, with real pointer input. This file is the combined
result. It was first kept in a session scratch folder, which was deleted before it could be used;
it is in the repo now so that does not happen twice.

**How it was measured.** The Browser pane was hidden for most of the run, so animation frames did
not tick there. Five of the six agents drove their own headless Chrome over CDP
(`Input.dispatchMouseEvent`, real key and wheel events). Nobody used in-page `dispatchEvent`.
Viewport 1440x900 unless a width is given.

Nothing in this file has been applied except where a line says so.

---

## 1. Things a visitor can see (need Rod's call)

| # | what | where | evidence |
|---|---|---|---|
| 1 | **Featured cards break below 760px (phones).** Ragged, overlapping. | `_sass/components/_merged-card.scss`: `.merged-cards` is `repeat(6, 1fr)` below 760px, the wide card still gets `grid-column: span 12`, and the 12-column rule sits inside `@media (min-width: 760px)` | At 390px: first card 72px wide, others 167px, the full-width card 254px inside a 239px grid. Also mis-sized at 600 and 759 |
| 2 | **Flipped card backs overflow the card in narrow windows.** | same file, same mobile decision | 800px wide: 3 of 8 backs overflow by 1 to 20px. 759px: 25 to 30px. 390px: up to 159px |
| 3 | **The post link underline leaks onto things that are not text links.** Every related card grows a 243px gold bar 4px below it on hover. | `_sass/base/_base.scss`, the `&:not(.img-link)` block under `.content a` (unlayered) beats `.rc::after { content: none }` in `_related-card-real.scss`, which is layered (the D36 trap) | On a live post the rule matches 5 heading anchors, the Back button, 2 prev/next cards, 3 related cards, and 1 real text link. It is also what kills the Back button's shimmer (P535) |
| 4 | **`/ramblings/` lists no posts.** | `_layouts/ramblings.html` (the `all_posts` assign) lists posts tagged `ramblings`; no tracked post has that tag, they use `blog` | "Nothing here yet" on the built page |
| 5 | **`No projects matching “”`** with empty quotes | `assets/js/components/search-field.js`, the line that fills `.es__q`, always wraps the text in quotes | Projects page: pick pills only (unity, shader, rigging) with the search box empty |
| 6 | **Table of contents links are white, not silver, and hover changes nothing.** | tocbot's own CDN stylesheet (`a.toc-link { color: currentColor }`, unlayered) beats `.toc a` in `_toc-real.scss` | Rest colour `rgb(245,243,239)`; the design is a silver to gold step (the removed comment is in `docs/code-comments/_sass/components/_toc-real.scss.md`) |
| 7 | About hero panel overflows its hero box by 45px | `_sass/pages/_about.scss` (`height: 50vh; min-height: 590px`), content is about 615px | `.hero` spans y 96 to 686, the panel 116 to 731. Rod's own tune (P447) |
| 8 | "yours, not mine" tagline is `#9aa3bd`, the blue D31 bans | `_about.scss`, the rule with `color: var(--color-muted)` | palette call |
| 9 | Calls to Rod's own functions (`SampleLevel(`) are variable blue, not function pink | `_plugins/syntax-retag.rb` only re-tags scalar types (`SCALARS`) and SCREAMING macros | 7 of 7 call-shaped tokens. Low confidence, may be intended |
| 10 | The card cover sinks 2px on hover | `_merged-card.scss`, `--z: var(--z-hover, var(--z, 0))` refers to itself | effectively invisible |
| 11 | The Back button has no side padding, the tint hugs the text | Bootstrap leftover, `a.btn.btn-outline-primary.btn-sm` in `_a11y.scss` sets vertical padding only | inference |
| 12 | The kit-button's text magnet has never worked (P536) | `drift-magnet.js` (`tick`) sets `translate` on an inline label, which ignores it | forced 20px translate moved it 0px |

**Accessibility notes (inference that they matter):** the active nav link is marked only by a class,
no `aria-current="page"` (the `is-active` class on `.top-bar__link` in `_includes/top-bar.html`). tocbot marks the
active TOC link with `is-active-link` and never sets `aria-current`; the two `a[aria-current="true"]` rules in
`_toc-real.scss` could therefore never match and were removed on 2026-10-10.

**Local only, not the site:**
- Card and post videos failing or freezing on hover is Jekyll's dev server (WEBrick answers a range
  re-check with 304 instead of 206). Tick "Disable cache" in DevTools. See P532.
- The archive listing one post twice is the untracked Obsidian copy
  `_posts/game-design/2026-07-25-UmamusumeInheritance 1 1.md`.

## 2. Dead code that still ships

**All of it is gone as of 2026-10-10** (the simplification pass, P543), each item re-measured
before it was cut. Kept here as the record of what the 36-tab check found:

- `_sass/components/_bio-block.scss`: file deleted.
- `.epx*`, `.is-staggered`, `.is-regular` and `bindControls` in `project-cards-expensive.js`: deleted.
- `.merged-cards-glass-toggle`, `.no-glass` and the glass toggle in `merged-card.js`: deleted.
- `.takeaway-quote`, `.kit-button--primary`, `.inline-link`: deleted.
- `.dm-favicon`, `.dm-motion-btn` and the `[data-motion-toggle]` branch in `drift-magnet.js`: deleted.
- `.rc--v3`, `.rc-grid--v3`, `pf--plain`, `pf--brackets`: deleted.
- The stale comments went with every other comment (P542).

**One item was wrong and stays:** the hover rule in `_section-head.scss`. The label is a `<span>`,
but a span can still be hovered and the rule changes its colour, so it is live. Only its
`:focus-visible` half can never happen.

What the pass found beyond this list is in `docs/simplify/`, one report per area.

## 3. Components that only work because of their page

The pattern the workbench exposed. A component pulled out of its page breaks because something
outside it was doing part of its job.

| component | what it borrows | status |
|---|---|---|
| `.kit-button` | a flex or grid parent, to make its clip work | **fixed, P529** (`display: inline-block`) |
| related card | the post page's rule capping video width | **fixed, P534** |
| `.dm-social__mark` (social icon) | its size, set only in `_post.scss:210` and `_section-landing.scss:91` | open |
| page heading | `margin: 0` on its title, repeated in six page files (`_blog:38`, `_archives:39`, `_ramblings:34`, `_tags:43`, `_projects:21`, `_stub-pages:80`) | open |
| search field | its 50px height (`_projects.scss:34-40`, `_ramblings.scss`) | open |
| `.kit-tag` | its `display`, same as the button | open |
| code block | `.prose` for its colours, `.content` for square corners | open |
| portal window (the reverse) | `_portal.scss:30-38` styles `.pwin` on every page and beats the component's own fallbacks | open, P530 |

Nine of thirteen page stylesheets wrap every rule in a page id (`#section-landing`, `#post-page`,
...), so anything they style depends on that page by construction.

## 4. What was wrong with the workbench itself

**FIXED 2026-10-09 by rebuilding it** (P539). Every item in this section is addressed by the new generator; the list is kept as the record of why it was rebuilt. The one thing a specimen still cannot show is anything the Rollup layout bundle builds at runtime, such as the table of contents. The Pages tabs run that bundle; the shell says so.

**The generator can only see class names.** It is blind to rules written against ids, tag names,
attributes and Sass placeholders, and it matched class names inside comments and inside a Sass
list. That is the root of most misfiled tabs: About showed the Projects page, Bio block showed a
whole article, Animations showed a button, and the real code block was filed under Unstyled.

Also:
- No web fonts and no Font Awesome stylesheet, so text is in fallback faces and about 110 icons
  are blank. No icon sprite.
- Page scripts never load: cards, achievement wall, search, portal windows, table of contents.
- Line boil measures its letters inside a hidden tab, gets 0, and pins every letter 0px wide. The
  wordmark is an orange blob unless its tab was open at load.
- The portal specimen's `.pground` switches the page glow off on all 36 tabs
  (`body:has(.pground)::before { content: none }`, `_portal.scss:24-26`).
- The extractor never finishes an `<hr>` and swallows the next section; it copies `hidden`.
- All 47 videos sit in hidden tabs and start loading at once. Ids repeat across tabs. Links in
  specimens navigate away. Changing the `#` in the address does not switch tabs.
- It picks the single largest extraction per stylesheet, so variants are missing (only the pill of
  the button kit, only one footer, only one favicon).
- The "behaviours" line reads "none declared" on 33 of 36 tabs.
- It was generated on 2026-09-04 and never regenerated.

## 5. Tab by tab

| tab | result on the old workbench |
|---|---|
| merged-card | works, except everything the card script does (tilt, flip, ring, glow band, hover video) |
| button-kit | works; P529 confirmed. Only the pill shown, no outline button, no tag |
| project-cards-expensive | byte-identical to the merged-card tab |
| section-head | works |
| section-landing | broken: 1064px black icons in a 7,703px stage. Its whole stylesheet is under `#section-landing` |
| top-bar | works only if open at load (line boil 0px bug). Sticky cannot stick inside the stage |
| footer-line | works. Only one of two variants shown |
| favicon | works. Size differs from the top bar's on purpose |
| line-boil | same 0px bug; really a repeat of the top-bar wordmark |
| cursor-glow | the tab's own copy never moves; the page-wide one does |
| portrait-frame | works. 191 vs 199px wide (page rule) |
| achievement-wall | empty box: the wall script builds all 29 tiles and never runs here. Works once started |
| base | invisible: the specimen is the back-to-top button, hidden until scroll |
| about | shows the Projects page, not About |
| drift-magnet | hover fill works. Icons blank (sprite and size both missing). The specimen is the post's still row, so no drift or magnet to see |
| related-card-real | cards equal (P534 confirmed). Hides the live underline bug |
| buttons | shows the post Back button, not the back-to-top button the stylesheet is about |
| stamp-callout | works |
| toc-real | empty: tocbot builds the list at runtime |
| bio-block | shows a whole article; the real component is unused |
| post | whole article, 13,765px. 17 of 22 selectors differ from live (page id missing) |
| decisions | code block in one flat colour: 0 of 72 tokens coloured, needs `.prose` |
| syntax | a bare `<td>`, which the browser drops |
| a11y | shows the Back button, not the skip link |
| placeholders | an empty link. The file is Sass placeholders and emits nothing |
| typography | one blank icon |
| animations | a button, from a false match on a string in a Sass list |
| unstyled-blocks | actually the full code block |
| entry-row | works |
| archives | works; spacing differs (page id missing) |
| page-title-desc | works; 48px extra above the title |
| empty-state | blank: copied with `hidden` still on |
| search-field | 17px tall instead of 50px; typing works, filtering needs its script |
| projects | 12 thin strips 800px tall; the `<hr>` bug swallowed the grid |
| portal-window | sits at the top-left of the whole page, over the masthead |
| portal | all 8 windows piled at the top-left, name wraps |

Live behaviour checked and fine: card tilt, flip, glow band and hover video; top bar hover fill,
magnets, boil and sticky; footer; favicon spin; cursor glow and its comments shield; landing socials
drift and magnet; achievement wall hover, click and keyboard; back-to-top; code copy button; heading
anchors; skip link; table of contents tracking and click; search and filter pills; portal window
drag, close and restore.
