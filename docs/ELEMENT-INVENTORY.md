# Element inventory - what markup ACTUALLY ships

Generated 2026-09-04 from the BUILT pages in `_site/`, one representative page per type, with
`<script>`, `<style>` and **HTML comments** stripped before counting.

**Every block appears ONCE, with a count and where it is used.** Rod: *"discard repeated
elements shared between pages and just add a counter and where its used"*.

**Why this file exists.** No previous audit enumerated the built markup. Contrast, CSS load
order, perf and provenance each measure one axis; none counts what HTML shipped.

**Vocabulary (Rod's, 2026-09-04).** **element** = you can point at it with inspect element, and
may contain sub-elements. **wrapper** = only holds things, named as one. **component** = the
reusable definition an element instantiates. **behaviour** = a visible consequence a component
declares. Spacers are elements; wrappers are not.

**Styled? is variant-aware.** A block counts as styled if ANY of its tokens has a rule - `reel`
looks unstyled if you only check `.reel`, because the rule is on `.reel__bar`.

## Headline

| | |
|---|---|
| distinct blocks | **166** |
| on exactly one page type | **123 (74%)** |
| stylesheets defining them = the real component count | **35** |
| blocks with no rule anywhere | **27** (18 of them FontAwesome) |

## Renames agreed 2026-09-04

No abbreviations unless a commonly understood acronym; the exception list is empty until Rod
names one.

| now | what it is | becomes |
|---|---|---|
| `h` | the hero, full viewport minus the bar | `hero` |
| `sec` | vertical padding band per section | `section-band` (wrapper) |
| `col` | content column, `padding-inline: 18.5%` | `content-column` (wrapper) |
| `lb` | text whose faces line-boil swaps | `boiled-text` |
| `epx-cards` | the project-card grid ("expensive") | `project-card-grid` (wrapper) |
| `ptd` | page title + description block | `page-heading` |
| `d-h1` | display h1 owned by `_decisions.scss` | `heading-display` |
| `z-layer` | per-child hover depth offset | `parallax-layer` |

## THE PROJECT CARD IS ONE COMPONENT WEARING FOURTEEN NAMES

`post-card  ct-glow-card  card-link  card-tilt  card-flipper  card-front  card-cover  glass-plane  card-body  card-title  card-meta  card-back  back-read  card-pin`

None of these say they belong together; `glass-plane` and `back-read` do not even share the
prefix. Under composition-with-modifiers it is one block with sub-elements, and the behaviours
(tilt, dwell-flip, dwell-ring, border glow, drift, magnet, video-on-hover) become declared and
removable instead of welded into two files.

## Blocks with NO rule anywhere

### FontAwesome (18) - agreed for removal, replaced with the social-icon pattern

`fa-angle-up  fa-arrow-left  fa-arrow-right  fa-bone  fa-book  fa-brush  fa-clipboard  fa-code  fa-cube  fa-fw  fa-hashtag  fa-image  fa-spin  fa-spinner  fa-th-large  fa-times  fa-wand-magic-sparkles  fa-wrench`

### The rest (9) - each needs a verdict

| block | pages | used on | uses | note |
|---|---|---|---|---|
| `boil-word` | 1 | about | 1 | No direct rule; check whether line-boil creates it at runtime before judging. |
| `gl` | 1 | post | 5 | ABBREVIATION and unstyled. Needs a look. |
| `js-magnetic` | 6 | about, archives, blog, landing, post, projects | 67 | CORRECT as-is - a behaviour hook should carry no CSS. The model to copy. |
| `js-magnetic-inner` | 1 | landing | 5 | CORRECT as-is - the inner-text half of the magnet. |
| `language-hlsl` | 1 | post | 5 | Rouge's language marker; effectively a data attribute. |
| `post-nav-prev` | 1 | post | 1 | REAL FIND: prev/next post nav carrying a class nothing styles. |
| `readtime` | 1 | post | 4 | Chirpy leftover. |
| `rouge-gutter` | 1 | post | 5 | Rouge line-number gutter we do not style. |
| `rouge-table` | 1 | post | 5 | Rouge table-layout class we do not style - the rules target `.highlight table`. |

## Grouped by the stylesheet that defines them

This grouping IS the component list: everything under one sheet is one component and its
sub-elements.

### `_sass/pages/_post.scss`

21 block(s), 37 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `mrow` | 1 | post | 7 | mrow |  |
| `raillabel` | 1 | post | 5 | raillabel |  |
| `railblock` | 1 | post | 4 | railblock |  |
| `post-nav-card` | 1 | post | 2 | post-nav-card |  |
| `post-nav-label` | 1 | post | 2 | post-nav-label |  |
| `post-nav-title` | 1 | post | 2 | post-nav-title |  |
| `spine` | 1 | post | 1 | spine |  |
| `posthead` | 1 | post | 1 | posthead |  |
| `rail` | 1 | post | 1 | rail |  |
| `kit-tag-row` | 1 | post | 1 | kit-tag-row |  |
| `article` | 1 | post | 1 | article |  |
| `content` | 1 | post | 1 | content |  |
| `posthero` | 1 | post | 1 | posthero |  |
| `lead` | 1 | post | 1 | lead |  |
| `post-related` | 1 | post | 1 | post-related |  |
| `post-foot` | 1 | post | 1 | post-foot |  |
| `post-navigation` | 1 | post | 1 | post-navigation |  |
| `post-nav-grid` | 1 | post | 1 | post-nav-grid |  |
| `post-nav-next` | 1 | post | 1 | post-nav-next |  |
| `post-nav-back` | 1 | post | 1 | post-nav-back |  |
| `post-comments` | 1 | post | 1 | post-comments |  |

### `_sass/components/_merged-card.scss`

18 block(s), 523 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `z-layer` | 2 | landing, projects | 131 | z-layer | parallax-layer |
| `card-pin` | 2 | landing, projects | 38 | card-pin card-pin--star card-pin--wip |  |
| `takeaway-text` | 2 | landing, projects | 36 | takeaway-text takeaway-text--none |  |
| `post-card` | 2 | landing, projects | 24 | post-card |  |
| `card-link` | 2 | landing, projects | 24 | card-link |  |
| `card-tilt` | 2 | landing, projects | 24 | card-tilt |  |
| `card-flipper` | 2 | landing, projects | 24 | card-flipper |  |
| `card-front` | 2 | landing, projects | 24 | card-front |  |
| `card-cover` | 2 | landing, projects | 24 | card-cover |  |
| `glass-plane` | 2 | landing, projects | 24 | glass-plane |  |
| `card-body` | 2 | landing, projects | 24 | card-body |  |
| `card-title` | 2 | landing, projects | 24 | card-title |  |
| `card-meta` | 2 | landing, projects | 24 | card-meta |  |
| `card-back` | 2 | landing, projects | 24 | card-back |  |
| `back-read` | 2 | landing, projects | 24 | back-read |  |
| `posts-grid-hue-a` | 2 | landing, projects | 12 | posts-grid-hue-a |  |
| `posts-grid-hue-b` | 2 | landing, projects | 12 | posts-grid-hue-b |  |
| `merged-cards` | 2 | landing, projects | 6 | merged-cards merged-cards--square |  |

### `_sass/base/_decisions.scss`

16 block(s), 628 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `n` | 1 | post | 187 | n |  |
| `p` | 1 | post | 176 | p |  |
| `o` | 1 | post | 76 | o |  |
| `x-bracket` | 1 | post | 71 | x-bracket |  |
| `mi` | 1 | post | 31 | mi |  |
| `x-type` | 1 | post | 21 | x-type |  |
| `kt` | 1 | post | 20 | kt |  |
| `nb` | 1 | post | 15 | nb |  |
| `c1` | 1 | post | 11 | c1 |  |
| `highlight` | 1 | post | 5 | highlight |  |
| `k` | 1 | post | 5 | k |  |
| `x-control` | 1 | post | 5 | x-control |  |
| `nf` | 1 | post | 2 | nf |  |
| `mf` | 1 | post | 1 | mf |  |
| `x-semantic` | 1 | post | 1 | x-semantic |  |
| `mo` | 1 | post | 1 | mo |  |

### `_sass/pages/_projects.scss`

15 block(s), 210 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `fas` | 7 | about, archives, blog, landing, portal, post, projects | 61 | fas |  |
| `pill-icon` | 1 | projects | 46 | pill-icon pill-icon--2d pill-icon--3d pill-icon--rigging pill-icon-... |  |
| `pv2-cell` | 1 | projects | 16 | pv2-cell |  |
| `pv2-descbox` | 1 | projects | 16 | pv2-descbox |  |
| `pv2-desc` | 1 | projects | 16 | pv2-desc |  |
| `pv2-metabox` | 1 | projects | 16 | pv2-metabox |  |
| `pv2-date` | 1 | projects | 16 | pv2-date |  |
| `pv2-tags` | 1 | projects | 15 | pv2-tags |  |
| `pv2-grid` | 1 | projects | 2 | pv2-grid |  |
| `pv2-head` | 1 | projects | 1 | pv2-head |  |
| `pv2-controls` | 1 | projects | 1 | pv2-controls |  |
| `pv2-search` | 1 | projects | 1 | pv2-search |  |
| `pv2-filters` | 1 | projects | 1 | pv2-filters |  |
| `pv2-pinned` | 1 | projects | 1 | pv2-pinned |  |
| `pv2-rule` | 1 | projects | 1 | pv2-rule |  |

### `_sass/pages/_about.scss`

9 block(s), 22 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `col` | 3 | about, landing, projects | 6 | col | content-column (wrapper) |
| `band` | 1 | about | 4 | band band--tight |  |
| `bio-h` | 1 | about | 3 | bio-h bio-h--lesser |  |
| `hero` | 1 | about | 2 | hero hero__fill |  |
| `sect` | 1 | about | 2 | sect |  |
| `scenewide` | 1 | about | 2 | scenewide scenewide__hole |  |
| `biorow` | 1 | about | 1 | biorow |  |
| `biocol` | 1 | about | 1 | biocol |  |
| `textbox` | 1 | about | 1 | textbox |  |

### `_sass/base/_syntax.scss`

6 block(s), 28 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `small` | 1 | post | 6 | small |  |
| `highlighter-rouge` | 1 | post | 6 | highlighter-rouge |  |
| `code-header` | 1 | post | 5 | code-header |  |
| `lineno` | 1 | post | 5 | lineno |  |
| `rouge-code` | 1 | post | 5 | rouge-code |  |
| `language-plaintext` | 1 | post | 1 | language-plaintext |  |

### `_sass/components/_entry-row.scss`

6 block(s), 98 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `er-row` | 1 | archives | 19 | er-row |  |
| `er-body` | 1 | archives | 19 | er-body |  |
| `er-date` | 1 | archives | 19 | er-date |  |
| `er-ttl` | 1 | archives | 19 | er-ttl |  |
| `er-link` | 1 | archives | 19 | er-link |  |
| `er-list` | 1 | archives | 3 | er-list |  |

### `_sass/pages/_section-landing.scss`

6 block(s), 40 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `skills-row` | 1 | landing | 22 | skills-row skills-row__icon skills-row__item skills-row__label |  |
| `h` | 1 | landing | 10 | h h__clock h__col h__name h__role h__social h__vert h__vert-cols | hero |
| `sec` | 1 | landing | 5 | sec sec--head | section-band (wrapper) |
| `viewall-row` | 1 | landing | 1 | viewall-row |  |
| `reel` | 1 | landing | 1 | reel__bar |  |
| `scene-space` | 1 | landing | 1 | scene-space |  |

### `_sass/components/_button-kit.scss`

4 block(s), 91 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `kit-tag` | 2 | post, projects | 58 | kit-tag |  |
| `kit-button` | 2 | landing, portal | 16 | kit-button kit-button--outline kit-button--pill kit-button__fill ki... |  |
| `badge-icon` | 1 | projects | 13 | badge-icon |  |
| `is-active` | 4 | about, landing, post, projects | 4 | is-active |  |

### `_sass/pages/_archives.scss`

4 block(s), 10 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `arc-group` | 1 | archives | 3 | arc-group |  |
| `arc-year` | 1 | archives | 3 | arc-year |  |
| `wf` | 2 | archives, blog | 2 | wf |  |
| `titlebar` | 2 | archives, blog | 2 | titlebar |  |

### `_sass/base/_a11y.scss`

2 block(s), 8 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `skip-link` | 7 | about, archives, blog, landing, portal, post, projects | 7 | skip-link |  |
| `btn-sm` | 1 | post | 1 | btn-sm |  |

### `_sass/components/_achievement-wall.scss`

2 block(s), 4 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `aw` | 1 | about | 3 | aw aw__cat aw__detail |  |
| `tagline` | 1 | about | 1 | tagline |  |

### `_sass/components/_drift-magnet.scss`

2 block(s), 33 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `dm-social` | 2 | landing, post | 32 | dm-social dm-social__fill dm-social__glyph dm-social__mark |  |
| `dm-row` | 1 | post | 1 | dm-row |  |

### `_sass/components/_footer-line.scss`

2 block(s), 43 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `footer-line` | 6 | about, archives, blog, landing, post, projects | 37 | footer-line footer-line__item footer-line__name |  |
| `footer-wrap` | 6 | about, archives, blog, landing, post, projects | 6 | footer-wrap |  |

### `_sass/components/_page-title-desc.scss`

2 block(s), 16 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `ptd` | 3 | archives, blog, projects | 13 | ptd ptd--projects ptd--ramblings ptd--sub ptd__desc ptd__title | page-heading |
| `d-h1` | 3 | archives, blog, projects | 3 | d-h1 | heading-display |

### `_sass/components/_portal-window.scss`

2 block(s), 88 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `pwin` | 1 | portal | 85 | pwin pwin--door pwin--lead pwin--social pwin__bar pwin__body pwin__... |  |
| `centre` | 1 | portal | 3 | centre centre__mark centre__welcome |  |

### `_sass/components/_project-cards-expensive.scss`

2 block(s), 27 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `ct-glow-card` | 2 | landing, projects | 24 | ct-glow-card |  |
| `epx-cards` | 2 | landing, projects | 3 | epx-cards | project-card-grid (wrapper) |

### `_sass/components/_related-card-real.scss`

2 block(s), 19 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `rc` | 1 | post | 18 | rc rc--v2 rc__body rc__cover rc__meta rc__title |  |
| `rc-grid` | 1 | post | 1 | rc-grid |  |

### `_sass/pages/_portal.scss`

2 block(s), 2 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `pground` | 1 | portal | 1 | pground |  |
| `field` | 1 | portal | 1 | field |  |

### `_sass/abstracts/_animations.scss`

1 block(s), 1 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `btn-outline-primary` | 1 | post | 1 | btn-outline-primary |  |

### `_sass/abstracts/_placeholders.scss`

1 block(s), 5 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `anchor` | 1 | post | 5 | anchor |  |

### `_sass/base/_base.scss`

1 block(s), 7 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `btn-box-shadow` | 7 | about, archives, blog, landing, portal, post, projects | 7 | btn-box-shadow |  |

### `_sass/base/_typography.scss`

1 block(s), 5 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `far` | 1 | post | 5 | far |  |

### `_sass/components/_bio-block.scss`

1 block(s), 1 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `prose` | 1 | post | 1 | prose |  |

### `_sass/components/_buttons.scss`

1 block(s), 8 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `btn` | 7 | about, archives, blog, landing, portal, post, projects | 8 | btn |  |

### `_sass/components/_cursor-glow.scss`

1 block(s), 7 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `cursorglow` | 7 | about, archives, blog, landing, portal, post, projects | 7 | cursorglow |  |

### `_sass/components/_empty-state.scss`

1 block(s), 12 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `es` | 2 | blog, projects | 12 | es es--stack es__action es__body es__content es__q es__title |  |

### `_sass/components/_favicon.scss`

1 block(s), 27 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `favicon` | 6 | about, archives, blog, landing, post, projects | 27 | favicon favicon--square favicon__img favicon__magnet |  |

### `_sass/components/_line-boil.scss`

1 block(s), 11 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `lb` | 7 | about, archives, blog, landing, portal, post, projects | 11 | lb | boiled-text |

### `_sass/components/_portrait-frame.scss`

1 block(s), 7 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `pf` | 1 | about | 7 | pf pf--window pf__bar pf__body pf__inner pf__media pf__name |  |

### `_sass/components/_search-field.scss`

1 block(s), 3 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `sf` | 1 | projects | 3 | sf sf--ronja sf__input |  |

### `_sass/components/_section-head.scss`

1 block(s), 10 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `section-head` | 2 | about, landing | 10 | section-head section-head__name |  |

### `_sass/components/_stamp-callout.scss`

1 block(s), 2 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `stamp-callout` | 1 | post | 2 | stamp-callout stamp-callout__title |  |

### `_sass/components/_toc-real.scss`

1 block(s), 2 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `toc` | 1 | post | 2 | toc toc--v3 |  |

### `_sass/components/_top-bar.scss`

1 block(s), 44 uses.

| block | pages | used on | uses | variants | rename |
|---|---|---|---|---|---|
| `top-bar` | 6 | about, archives, blog, landing, post, projects | 44 | top-bar top-bar__home top-bar__left top-bar__link top-bar__logo top... |  |

