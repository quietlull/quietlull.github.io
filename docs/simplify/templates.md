# Simplification pass: templates

Area: `_layouts/**` (not `compress.html`), `_includes/**`, `assets/404.html`. Baseline commit
`632133a`. 19 small commits on `main`, none pushed.

## Result

Template lines went from 2233 to 2071 (162 fewer, 7%), across 26 files touched. Four files are
gone: `_layouts/page.html`, `_includes/datetime.html`, `_includes/metadata-hook.html`,
`_includes/origin-type.html` (43 lines). No CSS rule, script bundle or stylesheet
changed (`css-rule-diff`: removed 0, added 0, changed 0; `assets/js/dist` file sizes identical).

How it was proved, every batch:

- Built the site in development and in production (`JEKYLL_ENV=production`, into the scratch folder,
  because the production block is off in a local build and the compress layout is on). Kept every
  built `.html` page (56, minus `redesign-lab/`) from the baseline and compared each with the same
  page after every change, whitespace collapsed to one space (so "a space" versus "no space"
  between two tags still counts). `assets/feed.xml` was compared separately.
- The only differences left against the baseline, in both builds, are the ones listed under
  "What changed in the built pages" below. Nothing else.
- `node tools/page-fingerprint.mjs compare --ignore-classes`: identical across 20 page views
  (including script problems).
- `node tools/check-workbench.mjs`: 51 specimens, 0 problems, output byte for byte the same as the
  start.
- `npm test`: passes.

## Lines per file

| File | Before | After |
|---|---|---|
| `_includes/related-posts.html` | 114 | 87 |
| `_includes/read-time.html` | 30 | 14 |
| `_layouts/default.html` | 72 | 60 |
| `_includes/head.html` | 115 | 106 |
| `_includes/js-selector.html` | 86 | 80 |
| `_includes/jsdelivr-combine.html` | 26 | 19 |
| `_includes/refactor-content.html` | 228 | 222 |
| `_includes/tag-badges.html` | 48 | 42 |
| `_includes/post-description.html` | 23 | 18 |
| `_includes/social-sprite.html` | 7 | 6 |
| `_includes/post-media.html` | 6 | 6 |
| `_includes/post-nav.html` | 43 | 43 |
| `_includes/project-card.html` | 58 | 58 |
| `_layouts/archives.html` | 46 | 43 |
| `_layouts/blog.html` | 68 | 65 |
| `_layouts/portal.html` | 150 | 148 |
| `_layouts/post.html` | 112 | 111 |
| `_layouts/ramblings.html` | 70 | 67 |
| `_layouts/section-about.html` | 63 | 60 |
| `_layouts/section-landing.html` | 97 | 94 |
| `_layouts/section-projects.html` | 76 | 73 |
| `_layouts/tag.html` | 48 | 45 |
| `_includes/datetime.html` | 12 | deleted |
| `_includes/metadata-hook.html` | 0 | deleted |
| `_includes/origin-type.html` | 11 | deleted |
| `_layouts/page.html` | 20 | deleted |

`post-media.html`, `post-nav.html` and `project-card.html` keep their line counts because the
change was inside a line (a parameter, a class name). Untouched: the other 23 template files, one of which is the vendored `compress.html`.

## Deletions, with the evidence

**1. The dead branch in `related-posts.html`** (lead 1). The include chose between two layouts on
`include.variant == 'rc'`. Its only caller, `_layouts/post.html`, always passed `variant='rc'`, so
the `else` branch (the theme's original grid, with Bootstrap `row`, `row-cols-*`, `g-4`, `mb-4`,
`h-100`, `card-img-top`) could never be chosen. Built pages contain none of its markers
(`post-preview`, `id="related-posts"`, `related-label`, `row-cols`). Gone: the branch, the test, and
the `variant` argument in `post.html`. (`9a9121b`)

**2. `_includes/datetime.html`.** Its only caller was that dead branch. Searched `_layouts`,
`_includes`, `assets/404.html`, `assets/feed.xml`, `_plugins`, `_data`, `_config.yml`, `tools`: no
other `include datetime`. No built page contains `data-ts=`. (`20b472a`)

**3. `_includes/metadata-hook.html`.** Zero bytes. `head.html` included it as its last line. Both
gone. (`d23331c`)

**4. The old `.tag-badge` shape in `tag-badges.html`.** `include.variant` chose between the
redesign's `.kit-tag` pills in `.pv2-tags` and the old design's `.tag-badge` in `.tag-badges`. The
only caller (`project-card.html`) always passes `variant='kit'`. Neither `tag-badge` nor
`tag-badges` is in any built page or stylesheet. The kit markup is unchanged. (`6d5ca2f`)

**5. Three parameters in `post-media.html`**: `width`, `height`, `lqip`. Its three callers
(`related-posts.html`, `blog.html`, `ramblings.html`) pass only `src`, `alt`, `class`. (`f6c7130`)

**6. The `prompt` option in `read-time.html`** and its captured "read" text. Both callers pass only
`content` and `lang`. (`e3ea1d5`)

**7. `{% include lang.html %}` in eight layouts** (archives, blog, portal, ramblings,
section-about, section-landing, section-projects, tag). The include only sets a variable `lang`;
none of these files reads `lang` or `include.lang` (searched each). A layout's assigned variables
do not reach `default.html`, which includes `lang.html` itself. `post.html` and the deleted
`page.html` did read it; `post.html` keeps its include. (`f2c6ff1`)

**8. `lang=lang` argument** passed by `default.html` to `top-bar.html`, `refactor-content.html`
(twice) and `footer-line.html`. None of the three contains `include.lang`. `js-selector.html`,
which reads it, keeps it. (`008a2ef`)

**9. The `refactor:` front matter key** in eight layouts (seven `true`, one `false`). Its only
reader was the test in `default.html` removed under "Simplifications" below. (`924236a`)

**10. Two class names no rule and no script mentions**, from the workbench's "No stylesheet" panel:
`readtime` (84 uses, 21 pages) and `post-nav-prev` (21 uses). Searched `_site/assets/css/*.css`,
`_sass`, `assets/js`, `_javascript`, the inline scripts in the templates, `tools`: no selector and
no script names either. `post-nav-next`, its twin, has a rule and stays. The other names in that
panel are script hooks (`js-magnetic`, `js-magnetic-inner`, `boil-word`, `es__q`, `pwin--lead`),
Font Awesome, or syntax-highlighter output, which this pass leaves alone. (`4759810`)

**11. `_layouts/page.html`, and every condition on a layout that does not exist** (`home`,
`category`, `page`, `tags`). Searched every `.md` and `.html` outside `node_modules`, `_site`,
`.claude`: nothing sets `layout: page`, `home`, `category` or `tags` (the only hits are inside
`redesign-lab/_BACKUP-pre-deletion-2026-08-26`, which Jekyll skips). `_layouts/home.html`,
`category.html` and `tags.html` do not exist. Both `_tabs` pages set their own layout, so `page.html`
rendered nothing. `head.html`: the `<title>` test `unless page.layout == 'home'` was always true;
the two stylesheet links that shared the layout test `post` now share one `if`. `js-selector.html`:
dropped `page`, `home`, `category` from the layout lists, and the `when 'section-projects'` branch,
which assigned `commons`, the same as the `else`. (`ff7e123`)

**12. Two values `refactor-content.html` computed and never read.** `_final_src` is assigned twice
and read nowhere. `_wrapper_class` is read once, at the `unless _wrapper_class == ''` test; the
later `append: ' blur'` and `append: ' shimmer'` (the lqip branch and its `else`) write to it after
that test, in an iteration that resets it. Six lines. This path (an `lqip` attribute) is not used by
any current post, so this one is read from the code, not observed. (`6defb6a`)

**13. The `si-x` symbol** in `social-sprite.html`. Nothing points at `#si-x`: searched all
templates, `assets/js`, `_javascript`, `_sass`, `_plugins`, `_data`, `_posts`. The sprite is written
into 23 pages. (`2761946`)

**14. The `json` option in `post-description.html`.** Its only caller, `assets/feed.xml`, passes
only `max_length=400`. `_site/feed.xml` is identical before and after apart from `<updated>`. The
`default: 200` stays. (`5855d46`)

**15. The asset-source switch** (`origin-type.html`). It set `type` to `'cors'` unless
`assets.self_host.enabled` was true. That key is empty in `_config.yml`, so `type` was always
`'cors'`. `head.html` and `js-selector.html` read `site.data.origin[type]` in 14 places and
`head.html` wrapped the resource hints in `unless site.assets.self_host.enabled`; all now read
`site.data.origin.cors`. The file and its include in `default.html` are gone. (`14fe454`)

**16. `site.alt_lang` fallback** in the `<html lang>` attribute. It is set nowhere. (`dd7349d`)

**17. The dayjs `relativeTime` plugin** in the combined script request. The only dayjs code is
`_javascript/modules/components/locale-datetime.js` (`dayjs.unix`, `.locale`, `.format`, and it
extends only `window.dayjs_plugin_localizedFormat`). Searched `_javascript`, `assets/js`, the
templates and all ten `assets/js/dist/*.min.js` for `relativeTime` and `fromNow`: nothing. The shorter
request was fetched and returns 200 (8916 bytes against 10388). This is the one change that alters
what a browser requests, on 23 pages, so it has its own commit. (`e3e8c32`)

**18. The non-jsdelivr branches in `jsdelivr-combine.html`.** After item 15 its only caller feeds it
`site.data.origin.cors` URLs, and every script entry in `_data/origin/cors.yml` is on
`cdn.jsdelivr.net` (the one that is not, the Font Awesome stylesheet, never goes through it). The
other two branches printed a non-jsdelivr URL as its own `<script>`. (`9810dd9`)

## Simplifications (same output, shorter)

- **One `<main>` in `default.html`** instead of two. They differed only by `class="page-column"` and
  by the test `layout.refactor or layout.layout == 'default'`, which picked between running the
  content through `refactor-content.html` and printing it raw. Three built pages take that second
  shape: `404`, and the two under-construction pages. For under-construction the test is true (its
  parent layout is `default`). The 404 content has no table, code block, checkbox, `img` or `h2`-`h5`
  with an id, the only things the include changes, so running it through gives the same output. The
  class is now applied with `unless full_bleed contains page.layout`. (`de47611`)
- **`read-time.html` clamp**: the four-line `unless read_time > 0 ... min_time` is
  `| at_least: 1`. Built pages contain both "1 min" (clamp taken) and longer reads, and all are
  unchanged. The no-space join `</em></span>` is kept exactly. (`e3ea1d5`)
- **`head.html`**: the lazy-polyfill and glightbox stylesheets had identical conditions after item
  11 and sit next to each other, so they share one `if`. Same order. (`ff7e123`)

## What changed in the built pages (the full list)

Both builds (development and production), against the baseline. Nothing else differs.

| Change | Pages | Commit |
|---|---|---|
| `class="readtime"` removed from the read-time `<span>` | 21 posts, 84 spans | `4759810` |
| `post-nav-prev` removed from the previous-post card (`<a>` on 20 posts, `<div class="... disabled">` on 1) | 21 posts | `4759810` |
| `<symbol id="si-x">` removed from the inline social sprite | 23 (21 posts, 2 section landings) | `2761946` |
| `plugin/relativeTime.js` removed from the combined dayjs script URL | 23 (section-about, section-landing, post, archives, tag) | `e3e8c32` |

## Looked at and left alone, and why

Needs a decision from Rod (a switch that is off or fixed today, but plausibly wanted):

- **`social_preview_image` branch in `head.html`** (about 18 lines). `_config.yml` leaves it empty, so
  it never runs, but it is the ready-made way to add a site-wide `og:image`, and
  `docs/AUDIT-1-WORKING.md` lists a broken `og:image` on 13 posts as open. Left.
- **`site.cdn` branch in `media-url.html`**. Empty in `_config.yml`, never runs. The media is heavy,
  so a CDN is a plausible move. Left.
- **`theme_mode`** (always `dark`) in `default.html`; `pwa.enabled` in `favicons.html`; `toc`;
  `comments.provider`; `pageviews.provider`. Each has one value today. Folding them is a 2 to 4
  line gain each and removes a lever. Left; say if you want them gone.
- **`skills=page.skills` in `section-landing.html`**. No page sets `skills:`, so the default list is
  always used. It is the way to give each section its own skills. Left.
- **Chirpy image options in `refactor-content.html`**: the class-picking block (`preview-img`,
  `normal`, `left`, `right`, `light`, `dark`, `w-*`), the `preview-img` path, the `lqip` branch, the
  task-list checkbox swap, the table wrapper. Every post uses only `{: style=...}` and
  `{: width=...}`, none of these. The class-picking block is the odd one: it strips those classes
  from the `<img>` but the `<a class="popup img-link">` wrapper that used them is no longer built, so
  a post that used `{: .left}` would lose the class and get nothing in return. Deleting it is about
  36 lines and changes nothing a current post shows, but it is an authoring feature, so it is your
  call.
- **`data-section` on `<main>`** (`default.html`). No stylesheet or script reads it. It may be an
  intended hook for per-section styling, so it stays.
- **`pill-icon` on the seven `<i>` icons in `kit-filter-pills.html`**. No rule starts from it
  (`.pill-icon--tool` and its siblings do). It sits inside Font Awesome markup (P524), so it stays.

Not mine to touch (the README's list): `.btn.btn-outline-primary` and the markup in
`post-nav.html` (P535), every `fa-*` class and `<i>` (P524), `.dm-row` in `post.html` (P329),
everything inside `{% if jekyll.environment == 'production' %}`, the analytics and pageviews
includes, and the service worker.

Looked at, no change worth the risk:

- **The inline scripts** (`landing-scripts.html`, `portal-scripts.html`, `under-construction.html`,
  `giscus.html`, `pageviews/goatcounter.html`, `about-scripts.html` and the three small search
  scripts) are unchanged. Guards such as `if (clock)` and `if (!title || !fill)` are not dead (the
  portal's social windows have no `.pwin__fill`). `under-construction.html` writes its post list
  into the page twice; the two copies are equal, but only one runs, and merging them is a rewrite of
  a script, not a deletion.
- **`skills-row.html`, `portal.html`, `kit-filter-pills.html`, `tag-badges.html`**: long runs of
  near-identical markup that a loop could shorten. That is a rewrite, and the output must stay byte
  for byte; not worth the risk here.
- **`blog.html` and `ramblings.html`**, and their two script includes, are near copies; sharing them
  needs a new include, which the contract forbids.
- **`language-alias.html`** maps 40-odd code-fence names. Only a few are used today, but any new
  post can use any language.
- **`page.math` and `page.mermaid`** in `js-selector.html`: no post sets either, but they are
  per-post switches, not site settings.
- **`lang.html`, `comment.html`, `toc-status.html`**: small, each has real callers.
- Every `id` and `data-*` in the templates was checked against the stylesheets and scripts; the only
  one with no reader is `data-section` (above). `#main-content` and the `si-*` symbols are reached by
  fragment links.

## Hand-offs

For the bundled-scripts area:

- `initLocaleDatetime()` (`_javascript/modules/components/locale-datetime.js`, called from `home.js`,
  `misc.js`, `post.js`) now has no producer: `datetime.html` was the only template that wrote
  `data-ts`, and no built page had one even before. It still calls `dayjs.locale()` and
  `dayjs.extend()` unconditionally, so the dayjs files cannot be removed from `js-selector.html` until
  that function goes. When it does, delete the whole `dayjs` block (the second `if` in
  `_includes/js-selector.html`, with its `locale` variable). That is a template edit, so it needs
  doing by whoever owns templates next.

For the styles areas (rules whose markup is gone or was only in a dead branch):

- `_sass/base/_base.scss:55` `h1.dynamic-title` (only `page.html` used it), and the `~ .content` rule
  under it.
- `_sass/base/_base.scss:90` and `:380` `.post-preview`, and `_sass/abstracts/_animations.scss:86`
  `'#related-posts a.post-preview'` (only the dead related-posts branch had them).
- `_sass/components/_related-card-real.scss:57` `.rc--v1 .rc__cover { display: none; }`: the cards
  that `under-construction.html` builds (`rc rc--v1`) never create an `.rc__cover`.

For data and config (outside this area):

- `_config.yml`: the `assets:` block (`self_host`) is no longer read. The `defaults` entry giving the
  `tabs` collection `layout: page` points at a layout that no longer exists. Both `_tabs` files set
  their own layout, so nothing breaks, but a new tab without one would render with no layout.
- `_data/origin/basic.yml` is no longer read. In `_data/origin/cors.yml`, `dayjs.js.relativeTime`,
  `webfonts` and `search` are read by no template.
- `_data/locales/en.yml`: `post.read_time.prompt`, `post.relate_posts` and `df.post` are no longer
  read by a template.

For docs: `docs/code-comments/_includes/{datetime,metadata-hook,origin-type}.html.md` describe files
that no longer exist; `docs/ARCHITECTURE-HANDOFF.md` section 1f/1g still lists `page.html`,
`datetime.html`, `metadata-hook.html`, `origin-type.html`; `docs/ELEMENT-INVENTORY.md` lists
`readtime`.

Lab: nothing in `redesign-lab/` includes or depends on any removed template (searched for
`{% include`; the lab pages carry no layout). `redesign-lab/todo.html` is a generated page that
lists `readtime` and `post-nav-prev` and will lose them on its next build.

## Commit trailer

The README asks for `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`, and every commit here
carries that line as written.
