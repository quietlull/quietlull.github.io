# COMPLETENESS CRITIQUE — sub-page layout research batch

## 0. The headline failure, before anything else

**The brief asked for SIX page types. The output contains TWO** — POST and PROJECTS — **and the PROJECTS entry is truncated mid-way through its third variant** (`"the whole effect is fou"`). V4 of PROJECTS does not exist in the deliverable.

Missing entirely: **ABOUT, RAMBLINGS / post index, RESUME, PORTAL.**

That is not a neutral 33% delivery. Per the repo's own gap table at `C:\Users\Rod\Documents\ProjectFiles\Website\redesign-lab\analysis\2026-08-16-subpage-sources.md` (lines under "Where the gaps are"):

| Page type | Sources already in hand | Delivered? |
|---|---|---|
| About | 4 (fully covered) | NO |
| Projects | 4 (fully covered) | partial (3 variants, truncated) |
| Post | 3, needed 1+ more | YES |
| Ramblings | 2, needed 2+ more | NO |
| Resume | 1, needed 3+ more | NO |
| Portal | **0, needed 4** | NO |

The batch delivered the two page types that were already sourced and skipped all four that required actual new sourcing — including the two (resume, portal) where the repo says the research does not exist at all. The expensive half is untouched.

---

## 1. POST / article page

### Did it reach 4+ live sites read from source?
**Yes — and I verified all four independently. This is the strongest part of the batch by a wide margin.**

Every declared byte count is exact:

| Site | CSS URL | HTTP | Bytes | Claimed |
|---|---|---|---|---|
| Cyanilux | `https://www.cyanilux.com/css/style.css?v=12` | 200 | **13301** | 13,301 ✓ |
| Mike Klubnika | `https://mikeklubnika.com/static/style/main.css` | 200 | **8021** | 8,021 ✓ |
| dimden | `https://dimden.dev/css/blog.css` | 200 | **3404** | 3,404 ✓ |
| Inigo Quilez | `https://iquilezles.org/style.css` | 200 | **4487** | 4,487 ✓ |

Spot-checked declared geometry against the real sheets, all confirmed:
- Cyanilux: `.content { width:70%; border:3px solid #303030; padding:30px; background-color:#202020; border-radius:20px; box-shadow:5px 5px 10px 0px #000000; transition:width 0.5s }`; breakpoints `min-width:1200 -> 60%`, `max-width:1000 -> 85%`, `max-width:600 -> 90% + padding 10px`; heading bars `h2,h3,h4 { margin-top:30px; padding:7px 20px; background-color:#282828; border-left:10px solid #00aabb; border-radius:7px }`. All exactly as specced.
- Klubnika: `max-width:58em; border-width:1px; border-top-width:0; border-bottom-width:0; border-color:rgb(92,92,92)`, `linear-gradient(0deg, ... 91% ...)`, `.banner`, sole `@media (max-width:756px)`, `margin-top:2px`. Exact.
- dimden: `#logo width:380px`, `hr { height:4px; border:none }`, `padding:35px`, breakpoints 600/400, `display:table`, `animation-timing-function:steps(4)`, `z-index:1000`. The `max-width:1200px` and `font-size:105%` are page-level, not in `blog.css` — the spec says exactly that, and I confirmed both appear inline on the article page. Exact.
- iq: `div#container{max-width:120ch;padding-top:32px;padding-left:24px}`, `body{font-size:1.125rem;line-height:1.8}`, `.partsC{display:flex;justify-content:space-around;flex-wrap:wrap}`, `.part25/.part30/.part40/.part50/.part60/.part70/.part75`, `.code{overflow:auto;white-space:pre;line-height:1.35}`, `.formula{mix-blend-mode:screen}`. Exact.
- I also verified the disputed one: `iquilezles.org/articles/raymarchingdf/` 404s to a plain curl and only resolves under a browser UA (37,809 bytes). The claimed page-level override is real — the page carries `width: 45%` and **36** `class="part"` / `class="myPicture"` pairs inside a single `.partsC`. Nothing fabricated.

Nothing marked inferred or partial. Nothing fabricated. This is genuine read-from-source work.

### Four different families, or four tweaks?
**Four genuine families.** Container grammar: bordered card / hairline sheet with fading edges / no chrome at all / no centring at all. Divider grammar: filled UI bars / 1px dotted / nothing / 4px solid block. Measure basis: percentage / em / **ch** / fixed max-width with no centring. Header grammar: centred meta block / left-right pairs with no meta block / centred single run / single inline meta line. These do not collapse into each other.

### Missing slots?
**None.** All ten frozen slots appear in all four. I confirmed the frozen list is real, not invented — `_layouts/post.html:91-99` (hero via `page.image` + `post-media.html`), `:129-133` (TL;DR, conditional), `:157-160` (`page.takeaway`), `:76` (`read-time.html`), `_includes/post-nav.html`, `_includes/related-posts.html`, `_includes/toc.html:5` (`position-sticky`), `_layouts/default.html:43` (`#panel-wrapper.col-xl-2`).

### Real numbers or adjectives?
Real numbers, and the arithmetic is checkable. Two errors, both worth fixing:

1. **The iq 1280px breakpoint is omitted, and it is load-bearing.** The sheet ends with `@media only screen and (max-width:1280px){ ... .part,.part25,...,.part70{padding-right:0px;width:100%} .partsC{flex-direction:column} .code{font-size:0.8em;line-height:120%} }`. V·IQ claims "the cheapest possible responsive story in the set: two numbers instead of a component" and "needs zero breakpoints." The *reading column* needs none; the **media wall and code block do**, and at the stated 1440 reference there is only 160px of headroom before the entire 45% wall collapses to a single column and the code type drops to 14.4px. Restate the wall spec with that breakpoint.
2. **Klubnika's rule is `1px dotted white`, not `#666`.** The spec says "1px DOTTED #666" in a passage otherwise written as verbatim transcription. Greybox recolouring is correct; presenting it as the source value is not.

### Unsourced / Claude-originated?
No free-handed variant, and the two reshapes that could have been inventions are self-declared and legitimate (dimden's `#footer` cell construction reused as a 3-column TOC; iq's `.part30` reused as a TOC wall).

**But the POST batch has NO idea-origin field at all.** The PROJECTS batch carries `Idea origin: theirs (...) / Claude (...)` inline; POST carries nothing. Under the provenance law origin tracking is mandatory and Claude-originated ideas are capped at ~25%. At minimum these need tagging as Claude-originated placements: dimden footer→TOC, iq `.part30`→TOC, cyanilux read-time as a third pill, and every "reserved as" takeaway-overlay geometry. And `redesign-lab\element-tracker.md` is not updated for any of it.

### Verdict on the open questions
Q1 is the honest and correct call, and it is also the batch's biggest hole: **all four sources put the TOC in flow, so none of the four can be compared against the live page's sticky rail** (`_layouts/default.html:43` + `_includes/toc.html:5`, both confirmed present). Refusing to free-hand a rail was right. But stripe.dev is already measured, already Rod-picked, and already in `archive\2026-08-16-rejected-subpage-tests\README.md` with 24 columns at 58.375px / 6-column 350px rail / 12-column 701px prose — that is a fifth variant waiting to be transcribed, not a question. Q2's doc-drift catch is verified: **STYLE.md is not at the repo root.** Q3 understates itself — `page.takeaway` at `_layouts/post.html:157` is *also* conditional, so the rambling state loses three slots, not two.

---

## 2. PROJECTS index / work grid

### Did it reach 4+ live sites read from source?
**Unproven — only three are visible, and the fourth is lost to truncation.** The three that are there check out exactly:

| Site | Cited asset | Confirmed |
|---|---|---|
| MinionsArt | `/tutorials/style.css`, `Builder.js`, `<template id="test">` | all three present on the live page ✓ |
| 109ichiki | `/_astro/style.COBHKi4A.css` | exact filename hash present ✓ |
| Kaito Note | `/assets/css/style.css` | present ✓ |

Against a hard four-site floor, **PROJECTS does not clear it as delivered.**

Separate problem: `analysis\2026-08-16-subpage-sources.md` says projects is "fully covered" by **109ichiki / harumaki / cinni / whey-isolate** — Rod's own vetted gallery picks. The output keeps 109ichiki and silently drops harumaki, cinni and whey-isolate in favour of two sites not in the gallery. New sourcing is allowed; discarding three of Rod's vetted references without a sentence of justification is not, under "the gallery goes first."

### Different families?
The three visible ones, yes: chromed-object card on an island panel / frameless square field with padding-gutters / zero-gutter mosaic with a vertical right rail. Control grammar differs too (centred chip grid / two-grammar row / vertical labelled lists). No verdict possible on V4.

### Missing slots?
**Yes, multiple, against its own frozen list:**
- **read-time is absent from all three visible variants.** V1 specs two date positions and no read-time; V2 has caption chip + tag chips and no date/read-time at all; V3 has category + role/engine + WIP and no read-time. The slot list names "date + read-time" as frozen.
- **per-item description is absent from V2 and V3.** V1 has it (280px, 14px). The others have a caption only.
- **empty state is absent from V3.** V1 and V2 both spec one; V3 does not.
- V2's search field is admitted as Claude-placed because 109ichiki has no search at all — correctly declared, but it means one frozen slot in that variant has no source.

### Real numbers?
Yes, and the arithmetic is genuinely checkable: 109ichiki `1440 - 40 - 112 = 1288`, `/6 = 214.67` ✓; kaito `135 + 412x4 + 135 = 1918` of 1920 ✓, `1648/3 = 549.33` matching their shipped 549x312 assets ✓. This part is real work.

### The disqualifying finding
**The PROJECTS batch declares a second blockout language, and the one it declares is not grey.**

It specifies `redesign-lab/foundations.css` `.ph` as its greybox. Line 37 of that file:

```
.ph{position:relative;background-color:#0d1430;background-image:repeating-linear-gradient(45deg,rgba(255,255,255,.03) 0 10px,rgba(255,255,255,0) 10px 20px);border:1px solid rgba(255,255,255,.10)}
```

`#0d1430` is navy. `foundations.css` is the coloured lab sheet — `--gold`, lantern radial-gradients, saturated-orange drop-shadow halos. The output describes it as a "flat `#0d1430` fill" alongside "NO hue anywhere," which is self-contradicting.

This lands on both rules the previous batch was killed for. `analysis\2026-08-16-subpage-sources.md`: "Reuse EXACTLY - a second grey language would break comparability across surfaces." `archive\2026-08-16-rejected-subpage-tests\README.md` failure #1: "Coloured, gold accents... A blockout is uniform monochrome greybox." The POST batch got this right (`#141414` landing-blockout tokens). PROJECTS reintroduces the exact rejected fault.

**Third inconsistency:** three reference viewports in one deliverable. POST at 1440, V2 measured at 1440, V3 specced in 1920 design pixels, and `landing-blockout.html` is at 1920. As written, nothing in this batch is comparable to anything else in it.

---

## 3. Overall verdict

**READY to build as blockouts — one page type only:**

- **POST.** Four verified live sources, four real families, full slot coverage, correct grey language, honest risk write-ups. Build it, after three answers: (a) transcribe stripe.dev as **V5** for the rail family rather than leaving it as a question — without it nothing in the batch tests the layout the site actually ships today; (b) Rod rules on prose measure, since three of four variants sit at 95-120ch; (c) both fixed full-viewport layers ship OFF, per the 2026-08-13 `edge-rails` rejection. Also fix the iq 1280 breakpoint, correct the klubnika dotted-rule colour, and add the idea-origin field plus an `element-tracker.md` entry before a file is opened.

**NEEDS ANOTHER PASS:**

- **PROJECTS.** Fourth variant absent or unverifiable; three of Rod's own vetted references dropped without justification; read-time missing from every variant and description/empty-state missing from some; and the declared greybox is `#0d1430` navy from the coloured lab sheet, which repeats the precise fault that killed the last batch. Not buildable as specced. Re-spec in the `#141414` language at a single agreed viewport, restore the missing slots, and either produce the fourth source or drop to what can be defended.
- **ABOUT.** Not delivered. Four gallery sources already exist (109ichiki / dimden / harumaki / cinni) — this is the cheapest remaining pass and there is no excuse for its absence.
- **RAMBLINGS / post index.** Not delivered. Two sources on hand, two-plus still needed.
- **RESUME.** Not delivered. One source total (brittanychiang, already measured). Three more required.
- **PORTAL.** Not delivered. **Zero sources exist.** This is the single largest research task in the whole project and nothing has been done on it.

**The pattern to name plainly:** the rejected 2026-08-16 batch failed by going wide and shallow. This one corrects the depth and fails the width — it spends real, verifiable effort on the two page types that were already researched, and delivers nothing on the four where the research gap was documented in advance in this repo's own notes. Two of six, one of which is unusable as specced, is a 17% delivery against the brief.