# Provenance audit, merge night

**Report only. Nothing was changed except this file.**

> **DATED SNAPSHOT, corrected 2026-09-02.** Two components it rows and grades have since been
> deleted: `callout-family` (replaced by the `{% callout %}` block in `_plugins/callout.rb` writing
> `.d-callout`, styled in `_sass/base/_decisions.scss:507-638`) and `slap-toggle` (stripped under
> D47). Their provenance rows are kept as the record of what was cited; they are no longer claims
> about shipping code. The PurgeCSS paragraph is also dead: Bootstrap and `purgecss.js` are gone
> (D48), so nothing prunes CSS at build time and the point about our own unused rules surviving now
> applies to the whole sheet.

Audited 2026-08-25 against the working tree as it stood at 03:00 and against the built site in
`_site/` (timestamped 02:45, 53 pages, lab pages excluded). Other agents were editing `_sass/`
while this ran, so treat every file:line as a snapshot. The conclusions rest on the built output
and on the citations themselves, not on comment wording, so a comment-shortening pass in flight
does not move them.

The law being audited: every design element derives from a real snippet, tiered True / Remixed /
Slop. Slop cannot ship. A citation pointing inside this repo is circular and is not a source.
`rework-*.html` and `ref-*.html` are candidates, never sources.

---

## THE HEADLINE

**Nothing circular renders on a live page tonight. One Slop thing does, and it is the page
background.**

| what | where | tier | why it is a problem |
|---|---|---|---|
| **The breathing bloom** (`body::before`, `breathe-bg` 16s) in `_sass/base/_foundations.scss:27` | **Every one of the 51 chrome-bearing pages** | **Slop.** Ledger row "Ambient / breathing bloom", `element-tracker.md:46`, reads `Slop / ? / -` with the note "Provenance unproven" | No source has ever been found for it. It is now painted on the whole live site. It is also the only shipped element with a **blank** Source column that a visitor can see. |
| Its `body { background: ... }` sibling, three stacked radial gradients | Same 51 pages | Same row, same blank source | Nothing unlayered competes on `background`, so the layered rule wins and this is the real page ground now. |

Two things make this smaller than it sounds, and both are worth saying:

- **Rod already killed it by name, and the deletion pass missed this copy.** `DECISIONS.md:509`
  says "The live site's breathing dies when the new theme replaces `_sass/`", and **D43
  (`DECISIONS.md:1467`, Rod, 2026-08-26) closes it outright**: *"breathing is dead its listed in
  memory many times"*, with "REJECTED: porting breathing forward. It has no place in the new
  design." Commit `0068529` then deleted the breathing **JavaScript**. The ported CSS bloom
  survived it. So this is not an open design question, it is one file the sweep did not reach.
- **It is one selector.** Deleting `body::before` and its reduced-motion twin clears the whole
  finding. Cheapest fix on the list.

**Everything else that ships is either sourced, Rod's own, or unreachable.** The 26 component
stylesheets all compile into the served stylesheet, but 21 of them have no markup anywhere on the
live site. They are downloaded, not rendered.

---

## 1. WHAT ACTUALLY SHIPPED, AND WHAT A VISITOR REACHES

All 26 components plus the three base files are `@forward`ed by `_sass/components/_index.scss` and
`_sass/base/_index.scss`, into `main.scss`, into the one served sheet
`/assets/css/jekyll-theme-chirpy.css` (207 KB). **PurgeCSS only purges Bootstrap**
(`purgecss.js:4-5`, output `_sass/vendors/_bootstrap.scss`), so none of our own unused rules are
stripped. Every page downloads all of it.

Reachability was measured, not inferred: every `class="..."` token in the 53 built pages was
collected and intersected with each component's own selectors.

| ships as CSS | renders on a live page |
|---|---|
| 26 components + 3 base files | **5 components + 3 base files** |

**The five that render**, all via `_layouts/default.html` and the two new chrome includes:

| component | markup | pages |
|---|---|---|
| `top-bar` | `_includes/top-bar.html` | 51 |
| `favicon` | `_includes/top-bar.html` | 51 |
| `line-boil` | `.lb` on the wordmark, `_includes/top-bar.html` | 51 |
| `footer-line` | `_includes/footer-line.html` | 51 |
| `drift-magnet` | the JS engine, `.js-magnetic` on bar links and favicon | 51 |

The two pages without chrome are the portal and its paginated twin, and that is `has_chrome =
false` in `_layouts/default.html`, by design.

**The three base files reach every page**, and two of them reach it through bare element selectors
rather than classes, which is why they count:

| file | layer | how it reaches live markup |
|---|---|---|
| `_foundations.scss` | `reset` | `body`, `body::before`, `*`, `html` |
| `_decisions.scss` | `prose` | `h1`, `h2`, `h3`, `h4` bare, plus `.card-title` which IS on the live project cards |
| `_focus-ring.scss` | `overrides` | `:focus-visible` global |

**The 21 that do not render**: achievement-wall, bio-block, button-kit, callout-family,
cursor-glow, empty-state, entry-row, figure-real, merged-card, page-title-desc, portal-window,
portrait-frame, project-cards-expensive, reference-links, related-card-real, search-field,
section-head, slap-toggle, stamp-callout, toc-real, washi-tape.

The live layouts still carry the OLD site's markup (`post-card`, `card-img-top`, `blog-controls`,
`trophy-grid`, the old portal doors). **The port shipped the CSS half of the redesign and none of
the markup half**, apart from the bar and the footer.

### Class-name collisions, checked and clear

Six live class tokens also appear in ported files: `post-card`, `card-body`, `card-title`,
`card-link`, `card-meta`, `takeaway-text`. Every one of them is a **descendant** selector under
`.merged-cards`, `.epx-cards` or `.pf--window`, none of which exist in live markup. Nothing paints
by accident. The single exception is deliberate: `_decisions.scss` puts `.card-title` on the h4
rung outright, so the live card titles do take that rule wherever the old unlayered CSS does not
declare the same property.

### Lab bench furniture is in the production stylesheet

Not a provenance defect, but found on the way and it belongs in the same sweep. The served CSS
contains `.labtag`, `.lantern`, `.ph`, `.lab`, and every `*-demo` block from the component files
(`cursor-glow-demo`, `button-kit-demo`, `dm-demo`, `favicon-demo`, `slap-toggle-demo`).
`_foundations.scss` names this exact set as "BENCH FURNITURE, not the design" and says it is on
the merge cleanup list. It shipped anyway.

---

## 2. THE TIER OF EVERY SHIPPED COMPONENT

"Outside repo" answers one question only: does the citation resolve to something that is not a
file in this repository.

| component | on a live page | tier | idea origin | citation | outside repo |
|---|---|---|---|---|---|
| **top-bar** | **yes, 51** | Remixed | theirs + Rod | nav pill fill = dennissnellenberg `.btn-fill` via `sources/dennissnellenberg-buttons.md`; shell = norikura scrape, `scraped-norikura.md`, itself suwako-hanabi.com | **yes** |
| **favicon** | **yes, 51** | Rod original | Rod | Rod's own Figma artwork, mark and spin both his | n/a, his own |
| **line-boil** | **yes, 51** | True | Rod | Rod's own Lineboil + Numberboil faces, drawn by him 2026-08-23 | n/a, his own |
| **footer-line** | **yes, 51** | **OURS, no source** | **Rod** | none. The lab `.labtag` promoted to a real element on his call | **no, and the file says so** |
| **drift-magnet** | **yes, 51** | Remixed | theirs + Rod | breakdance4fun (drift), dennissnellenberg + tdesero (magnet), chriskalafatis (lerp) | **yes** |
| `_foundations.scss` | **yes, 51** | **Slop** | **?** | **blank** | **no** |
| `_decisions.scss` | **yes, 51** | Remixed | Rod | stripe.dev, catlikecoding, acegikmo, ronja, VS Code Dark+ palette; the file's own rule is "a rule with no citation is a bug in this file" | **yes** |
| `_focus-ring.scss` | **yes, 51** | Remixed | theirs | `sources/focus-ring.md`, Bootstrap 5.3 focus-ring, dev.to hybrid_alex, darekkay | **yes** |
| achievement-wall | no | mixed, see section 6 | Rod | john_r_muir CodePen + mikeklubnika.com/about + internal reuse | **partly** |
| bio-block | no | Remixed | theirs | dimden.dev `main.css?9:168-180`, cyanilux `style.css?v=12:817-832` | **yes** |
| button-kit | no | **MIX, shapes line is Slop** | theirs | ripple = phojanecki CodePen; fill-sweep = nfranciosi CodePen; magnetic = `sources/magnetic-buttons.md`; **shapes = `rework-stephan.html`** | **partly** |
| callout-family | no | Remixed x3, **one variant Slop** | theirs, Rod; **boxed quote = claude** | flamedfury, cyanilux, catlikecoding, gneiss.place, all re-fetched 2026-08-23 | **yes, except `.co-quote--boxed`** |
| cursor-glow | no | Remixed | theirs | brittanychiang.com + merodev `.cursorglow`, Rod-authorised 2026-06-09 | **yes**, but nothing pinned in `sources/` |
| empty-state | no | Remixed | theirs (PatternFly) + Rod (copy) | unpkg PatternFly 6.6.1 empty-state.css, 7,960 bytes, fetched and token chains walked; TheRealMJP for row geometry | **yes** |
| entry-row | no | Remixed, one part True | theirs | eveofficial.com `style.css?ver=260816230345`, via the saved read at `analysis/subpage-specs/extract-5.md:42` | **yes**, but not re-fetched this session and the file says so |
| figure-real | no | Remixed; **video block self-marked Slop** | theirs + Rod | catlikecoding `tutorials.css`, re-fetched, zero discrepancy | **yes** |
| merged-card | no | Remixed | Rod + theirs | **"Rod-provided flip-tile CodePen via rework-harumaki"** and "merged card v2 via rework-harumaki". No URL for either | **weak. The CodePen is real but unnamed and unpinned; the route is in-repo** |
| page-title-desc | no | Remixed | theirs | potg.art `_astro/about.DQG1MDvI.css`, re-verified live 2026-08-23; acegikmo | **yes** |
| portal-window | no | Remixed | Rod | **`merged-card.css` + `project-cards-expensive.css`, declared as internal reuse, not claimed as a citation** | **no, and stated plainly** |
| portrait-frame | no | Remixed | theirs + Rod | catlikecoding (via figure-real), filipporuffini, 109ichiki `style.COBHKi4A.css` | **yes** |
| project-cards-expensive | no | **file banner says Slop; the rim is not** | mixed | banner points at `rework-merodev-yanne.html`; rim's real sources are john_r_muir CodePen (pinned, verbatim) + yannesidibe.com/about (**now 404**) + brittanychiang.com | **partly, see section 4** |
| reference-links | no | Remixed | theirs | ronja-tutorials.com `app.d876a0cc99d23e9edadbac7fc6abde13.css`, Rod picked it 2026-08-24 | **yes** |
| related-card-real | no | **OURS** | **Rod** | none for the card. Focus block cites `sources/focus-ring.md` | **no for the card, yes for the ring** |
| search-field | no | Remixed x6 | theirs | `sources/search-fields-2026-08-24.md`, six fields read off live sites 2026-08-24 | **yes** |
| section-head | no | Remixed | Rod | harumakigohan.com `m_*.png` heading art, pixel-censused, saved to `references/harumaki-heads/` | **yes**, and an art asset is owed |
| slap-toggle | no | Remixed | theirs | codepen.io/YarivFrd/pen/PEOJLj, exact copy then rescaled | **yes** |
| stamp-callout | no | Remixed | Rod | "Rod-provided stamp CSS", no URL | **no URL, but Rod-supplied, which the law allows** |
| toc-real | no | Remixed | theirs | docs.astro.build Starlight, served CSS, same content hash re-verified. File says "SLOP RISK: none" | **yes** |
| washi-tape | no | Remixed | Rod | gneiss.place `deco.css` `.taped`; tear = winterwind.com/tutorials/css/29; stripe fill = codingartistweb.com | **yes**, except the green `#6fbf73` which the file flags as the one unsourced colour |

---

## 3. THE CIRCULAR ONES: IT IS 12, NOT 14

`docs/MERGE-WORKLIST.md:398` and `:500` both list 14 and the second one is headed "Corrections to
this file". **The correction from 12 to 14 was itself wrong.** It was made by grepping the phrase
"CIRCULAR CITATION", which also catches files that mention another component's banner.

Verified by looking for the banner block itself, `/* !! CIRCULAR CITATION - CORRECTED 2026-08-16 !!`:

| file | carries its own banner | what its mention actually is |
|---|---|---|
| button-kit | **yes** | own banner, line 22 |
| card-tests | **yes** | own banner, line 22 |
| code-block | **yes** | own banner, line 22 |
| draw-in-icons | **yes** | own banner, line 22 |
| hero | **yes** | own banner, line 22 |
| list-controls | **yes** | own banner, line 22 |
| post-header | **yes** | own banner, line 22 |
| project-cards-expensive | **yes** | own banner, line 22 |
| quote-block | **yes** | own banner, line 22 |
| reel-band | **yes** | own banner, line 22 |
| site-footer | **yes** | own banner, line 22 |
| tldr-callout | **yes** | own banner, line 22 |
| **empty-state** | **no** | line 55 describes **list-controls**: "its own header declares it CIRCULAR CITATION / Slop" |
| **footer-line** | **no** | line 33 describes **site-footer**: "it cites a `rework-*.html` inside this repo" |

**Real count: 12.** `empty-state` and `footer-line` are false positives and should come off the
list. The worklist already half-knew this, it notes "footer-line's banner is now stale", but the
truth is stronger: footer-line never had a banner.

### Which of the 12 shipped

| shipped to `_sass/components/` | renders on a live page |
|---|---|
| **button-kit**, **project-cards-expensive** | **neither** |

The other ten (card-tests, code-block, draw-in-icons, hero, list-controls, post-header,
quote-block, reel-band, site-footer, tldr-callout) were **not ported at all**. `list-controls`, the
one flagged repeatedly in REQUESTS as the live blocker, is not among the 26 and its markup is not
on any page.

So the answer to "which circular things are on a page a visitor can reach" is: **none.**

---

## 4. THE FALSE POSITIVES, INCLUDING TWO MORE

The brief named two corrections already made. Both hold, and the same grep artifact produced four
more that are still being repeated in `docs/STATUS.md:119-124`.

| claim | verdict |
|---|---|
| **`cursor-glow` is circular** | **False positive, already corrected** at `REQUESTS.md:68` (P436). The word in its file is the CSS keyword `circle` in `radial-gradient(... circle at ...)`. Real row: `element-tracker.md:45`, Remixed / theirs, Rod-authorised 2026-06-09. |
| **The project card's hover rim is the Slop part** | **Wrong, and the file-level banner is wrong for that technique.** `sources/john-r-muir-glow-border.md` exists, is headed "SOURCE (True)", carries the real URL `codepen.io/john_r_muir/pen/ExzJjqL`, and holds the CSS and JS verbatim as Rod pasted it. Rod exempted the rim by name 2026-06-09 and `DECISIONS.md:1266` records him withdrawing the objection. |
| **`drift-magnet` is circular** (STATUS.md:119) | **False positive.** `drift-magnet.css:52` reads `/* circular social ... circle buttons */`. It is a shape word. Its real sources are three external sites. |
| **`empty-state` is circular** (STATUS.md:119, MERGE-WORKLIST 14-list) | **False positive.** It is describing list-controls, and describing it in order to explain why it refuses to reuse it. |
| **`footer-line` is circular** (STATUS.md:119, MERGE-WORKLIST 14-list) | **False positive.** It is describing site-footer. |
| **`search-bar` is circular** (STATUS.md:119) | **False positive.** `search-bar.css:89` is quoting `list-controls.css:1-9`. |

**STATUS.md's "seven of those are on a final page" is really three**: button-kit, list-controls,
project-cards-expensive. And of those three, only two shipped and neither renders.

One more that is genuinely dead rather than merely unread, and it is new:

> **yannesidibe.com/about now returns HTTP 404.** `related-card-real.css` records the fetch:
> root returns 200 on Tailwind/Next, and grepping it gives zero hits for `glow`, `mask-composite`,
> `plus-lighter`, or any `--mx/--my/--mouse/--cursor`. The citation is not unread, it is gone.
> Live site wins. The rim survives on john_r_muir and brittanychiang, but yannesidibe can no longer
> be pinned by anyone, so the debt below has changed shape.

---

## 5. THE CLAUDE-ORIGIN PERCENTAGE

**Computed from the ledger: 0 of 103 rows. The Idea column has never once been set to `claude`.**

| Idea value | rows |
|---|---|
| theirs | 36 |
| theirs? | 15 |
| mine | 14 |
| rod | 14 |
| ? | 12 |
| mine? | 6 |
| theirs + mine | 2 |
| other single-offs | 4 |
| **claude** | **0** |

**That 0% is not the answer, it is the finding.** The cap cannot be measured because the column
that is supposed to carry the number is empty, while the prose in the same file and in the
component files openly admits Claude origin in at least four places:

| item | where it is admitted | ledger row |
|---|---|---|
| The 2026-08-13 rim material pass, `plus-lighter` + 2.5px blur + inward spill | `element-tracker.md:45`, "IDEA = `claude` for these three treatments ... counts against the <25% guardrail" | same row, Idea column still reads `theirs` |
| `.co-quote--boxed`, the boxed quote callout | `callout-family.css:264` and `.md:54`, "tiered SLOP, idea-origin CLAUDE" | **no row exists at all** |
| The empty-state next-step sentence | `empty-state.md:95`, "Claude-origin copy, and it is the first thing to rewrite" | **no row** |
| filter-pills application | `filter-pills.md:113`, "Claude-originated and counts against the under-25% budget" | **no row** |
| The scene show/hide toggle wrappers | `element-tracker.md:182`, "= Slop/`claude`" | bullet, not a row |

The ledger's own rollup already says so, at `element-tracker.md:29-32`: "This rollup is STALE ...
the claude-idea ratio below cannot currently answer 'are we still under ~25%'". **That warning has
been sitting there since 2026-06-09 and is still true tonight.**

**Best available honest statement: at least 5 known Claude-origin items against 103 tracked
elements, which is roughly 5%, and none of the five is on a live page.** That number is a floor,
not a measurement, because it counts only what someone volunteered in prose. The cap is not
currently enforceable.

Tier counts, recomputed the same way, for the record: **46 Slop, 32 Remixed, 12 True, 2 OURS,
plus 11 rows on compound or withdrawn tiers.** `STATUS.md:117` says "93 tiered rows: 12 True, 30
Remixed, 46 Slop"; the row count is now 103 and Remixed is 32.

---

## 6. THE ACHIEVEMENT WALL, TIERED HONESTLY

It shipped as a 33 KB stylesheet, the largest component file in the port. **It has no markup and
no JS on the live site.** `_layouts/section-about.html` and `_includes/aboutmecontainer.html` both
still render the old `trophy-grid` populated by `achievements.js`; `assets/js/components/` holds
four modules and `achievement-wall.js` is not one of them. So the wall is downloaded, not shown.

Piece by piece, since one tier for the whole thing would be a lie:

| part | tier | idea | source | outside repo |
|---|---|---|---|---|
| The rim / proximity glow | **Remixed** | theirs | `sources/john-r-muir-glow-border.md`, verbatim, `codepen.io/john_r_muir/pen/ExzJjqL`, pasted by Rod. Plus brittanychiang.com | **yes** |
| The rim's 2026-08-13 material pass, plus-lighter + 2.5px blur + inward spill | Remixed shape, **claude treatment** | **claude** | none. Rod picked them off an 8-option bench, but they were originated here | **no** |
| **The tilt** | **internal reuse, no external source** | **Rod** (he asked for it) | ported from `merged-card.js:8-12, 35-44, 72-115`, which cites `rework-harumaki.html`, **a file in this repo** | **no** |
| Detail panel, 333px wide | **Remixed** | theirs | **mikeklubnika.com/about**, read from source, via the approved blockout at `about-blockout.html:69-71` and its provenance note at `:255` | **yes** |
| Detail panel height 360, not the blockout's 250 | ours | **Rod** | his call 2026-08-24, "yes extend the panel". Recorded as a blockout deviation | n/a |
| The star badge | **internal reuse** | Rod | `merged-card.css:291-300`, the project card's pinned badge, carried verbatim | **no** |
| The 29 achievements | **True** | Rod | transcribed from the live site, `_javascript/modules/components/achievements.js`. The live site is a legal source under the law | **yes**, live site counts |
| Tier colours bronze / silver / gold / prismatic | **unsourced** | **Rod** | none. The file explains prismatic by analogy to TFT; no snippet is cited | **no** |
| The JS orbit loop | ours | claude mechanism, Rod's effect | written here after `@property` registration was measured not to take in this Chrome | **no** |

**Honest one-line tier: Remixed, idea-origin Rod, with three parts that are internal reuse and one
part that is unsourced colour.** The file already says most of this out loud, which is the right
behaviour, and `achievement-wall.js:298-302` even names the precedent: it should get a ledger row
in the same shape as the portal-window row, which says outright "internal reuse, NOT an external
citation".

**It has no ledger row at all today.** The nearest rows are "Achievements trophy grid + unlock
toast" (`element-tracker.md:164`, Slop grid / Remixed toast) and the `achievement-tile` component,
whose own `.md:116` notes its blockout citation "cites `about-blockout.html` itself, which is a
circular citation pointing inside this repo".

---

## 7. WHAT IS OWED, AND THE CHEAPEST WAY TO CLEAR EACH

| # | debt | cheapest clear |
|---|---|---|
| 1 | **The breathing bloom is Slop and is on every live page** | Delete `body::before` and its `prefers-reduced-motion` twin from `_sass/base/_foundations.scss:27` and `:40`, plus the `breathe-bg` keyframes. **D43 already decided this**, and commit `0068529` deleted the breathing JS while leaving this. Two rules, no design call. |
| 2 | **The yannesidibe verbatim diff was never pinned, and now cannot be** | The page is 404. Stop chasing it. Retire the citation, promote `sources/john-r-muir-glow-border.md` to primary (it is already verbatim and pinned), and add brittanychiang as the second. Edit is to the ledger row and to two file headers, no code moves. |
| 3 | **The rim material pass is idea-origin claude and is not in the Idea column** | One-word edit: `element-tracker.md:45` Idea `theirs` becomes `theirs + claude`, or split the row. Until the column carries it, the cap cannot be computed. |
| 4 | **The cap cannot be computed at all** | Add the four admitted Claude-origin items as real rows with Idea `claude`, then recompute. The prose already exists; it just is not in the table. Half an hour of ledger work, and it turns a permanent open question into a number. |
| 5 | **`_foundations.scss` bench furniture is in the production stylesheet** | Delete `.ph`, `.lantern`, `.lab`, `.labtag` and the `*-demo` blocks from the ported files. The foundations file's own comment already nominates this exact set. |
| 6 | **The 14-vs-12 circular count is wrong in two docs** | Correct `MERGE-WORKLIST.md:398` and `:500` to 12, and `STATUS.md:119-124` from seven to three. Grep for the banner block, never for the phrase. |
| 7 | **`merged-card`'s parent is an unnamed CodePen reached through `rework-harumaki.html`** | Ask Rod for the CodePen URL. He provided it, so he may still have it. If it cannot be recovered, tier it OURS the way `related-card-real` and `portal-window` already do, rather than leaving a citation that routes through this repo. |
| 8 | **The achievement wall has no ledger row** | Add one, in the portal-window shape, with the seven-part breakdown from section 6. It is the honest form and the precedent already exists. |
| 9 | **Its tier colours are unsourced** | Either cite something real for the four-tier ramp or file it origin ROD as a taste call, which is what `card-greys-tests` did for the warm grey. It is his palette decision either way. |
| 10 | **`washi-tape`'s green `#6fbf73` has no source** | Already flagged in the file as "the one unsourced colour of the four". Rod picks it, and it files origin ROD, exactly as the green tape was closed at `REQUESTS.md:363`. |
| 11 | **`button-kit`'s shapes line is still circular** | Only the padding is actually inherited (radius is squared by house rule). Source the padding or state it as ours. `REQUESTS.md:363` already narrowed the problem to this one line. |
| 12 | **`entry-row` is built from a saved read, not a live fetch** | Re-fetch eveofficial.com once and diff. The file says so itself and says the live site wins. |

---

## 8. WHERE THE FILE, THE LEDGER AND THE `.md` DISAGREE

| element | the file says | the ledger says | the `.md` says | who is right |
|---|---|---|---|---|
| **footer-line** | "ORIGIN: ROD ... It is OURS, not sourced" | "Footer (centered mono letter-spaced) \| **Slop** \| theirs? \| -" with a lead pointing at HANA | no `.md` | **The file.** Rod picked the lab tag on 2026-08-22 and the ledger row was never updated. It is on 51 live pages under a stale Slop tier. |
| **project-cards-expensive** | file-level banner: "NO EXTERNAL PROVENANCE and is Slop" | "Project cards \| Remixed/True \| mixed \| hana panel + real videos + **john_r_muir ignite**" | no `.md` | **The ledger, for the rim.** The banner is a blanket stamp applied to the whole file in 2026-08-16; the ledger row and `DECISIONS.md:1266` are both more specific and both later. The banner is right about the rest of the file. |
| **cursor-glow** | no banner, only the CSS keyword `circle` | Remixed / theirs / Rod-authorised | no `.md` | **Both agree.** The disagreement was only ever in a grep, and `REQUESTS.md:68` already retracted it. |
| **top-bar** | header says the nav pill takes the "button-kit-primary lit look" | "Top nav links \| Remixed \| theirs \| `sources/hana-nav.md`", the hana stacked-shadow ignite | no `.md` | **Neither matches the code.** `_top-bar.scss:114` and `:134-151` implement dennissnellenberg's rising-circle fill, which is properly sourced and is neither of the two things claimed. Two stale prose citations on the one component that is live on every page. |
| **empty-state** | its own header corrects `rework-hana-ledger.md:53`, which filed it "Remixed / PatternFly (source pulled)" when no `sources/patternfly-*.md` existed | "Empty state \| **Slop** \| theirs? \| -" | `.md:104` "Tier: Remixed. Idea origin: theirs (PatternFly) + Rod (copy)" | **The file and the `.md`.** The claim was checked against a live fetch and survived; the ledger row predates the check. |
| **achievement-wall** | a seven-part honest breakdown in the CSS and JS headers | **no row** | no `.md` | **The file, and it needs promoting into a row.** |
| **`element-tracker.md` rollup** | n/a | "Total tracked elements: ~60 ... True 2 / Remixed 5 / Slop rest", self-marked STALE since 2026-06-09 | n/a | **Nothing.** Recount: 103 rows, 46 Slop / 32 Remixed / 12 True / 2 OURS. `STATUS.md:117`'s 93 rows and 30 Remixed are also behind. |

---

## 9. RE-VERIFIED AGAINST HEAD AFTER THE COMMENT PASS

Three commits landed under this audit while it ran (`61ede67`, `9f6d826`, `389b18a`, `0068529`).
Every finding above was re-checked against the tree afterwards. Two details moved, neither
conclusion did.

| what moved | now |
|---|---|
| `_button-kit.scss` lost the `!! CIRCULAR CITATION` banner block in `389b18a` | **The substance survived and improved.** The file now reads "SLOP UNTIL RESOURCED. The shapes cite rework-stephan.html, which is our own build ... A citation pointing inside this repo is not a source", and it correctly names the rising fill as dennissnellenberg rather than as button-kit's own. The banner form is gone; the honesty is not. It still counts as circular on its shapes line. |
| Grepping `!! CIRCULAR CITATION` in the lab now returns **13 files, not 12** | `button-kit.md` carries the banner too. It is a note, not a stylesheet. **The stylesheet count is still 12** and the list in section 3 is unchanged. |

`_sass/components/_project-cards-expensive.scss` is now the only file in `_sass/` carrying the
banner block verbatim. The breathing bloom in `_foundations.scss` is still there, two references,
after `0068529` removed the breathing JavaScript.

---

## What this audit did not check

- Whether the ported CSS renders *correctly*, only whether it renders at all. Token mapping is a
  separate problem and `STATUS.md` already owns it.
- The four sources that could not be re-fetched this session. Where a file says "not re-fetched",
  that is reported as the file states it, not verified independently.
- `redesign-lab/` pages. They are gitignored, CI never sees them, and `_config.yml:251` records
  that this is deliberate. Nothing in the lab is reachable in production.
