# ABOUT pages - how much SPACE they actually use. Measured 2026-08-22.

Rod, P60: *"the full scene at the bottom is not spaced correctly. I think overall we should do
another test because i want this to look a little more spacious maybe look at more references. send
me a few because the section cards need to be spaced more."*

All numbers below are `getBoundingClientRect` / `getComputedStyle` **at 1440 on the live site**.
Where a number is not read, it says so.

---

## THE HEADLINE: our section rhythm is 10px. The references run 100-213px.

| site | section rhythm | content column | page height | real blocks |
|---|---|---|---|---|
| **potg.art/about** | **213 / 200 / 100 / 199 px** | **800px** (text), full-bleed for imagery | 6,404px | 6 sections, **3 headings total** |
| **harumakigohan.com/profile** | 26 / 20 / 34 / 26 px + `<br>` at 23px | 1240px inside a **1280px** max-width | **~800px total** | **5 elements** |
| thatskygame (already on record, STATUS) | 150-360px per zone | - | - | - |
| **OURS - about-blockout dimden panels** | **`margin-top: 10px`** | 675 + 225 | - | 10+ blocks |
| **OURS - about-blockout Klubnika** | stacked, `.cat` at `min-height:372px` | 928px | - | 10+ blocks |

**That is a 10x to 20x difference and it is almost certainly what Rod is feeling.** He asked for
"more spacious"; the gap between our panels is 10px and the two references he can be shown run 100
to 213px between sections.

---

## potg.art/about - **Tier: True, measured live.** The "spacious" reference.

- **URL:** https://potg.art/about/ - tagged *spacious* in Rod's own gallery, which is why it was
  checked first (PAGE-PROCESS stage 0: the gallery is always the first place to look).

```
section.first    1240 x 263    margin-top -195   (pulled up under the header)
section.kv       1440 x 620    margin-top  213   full bleed
section.my        800 x 480    margin-top  200
section.client    800 x 2705   margin-top  100
section.slider   1440 x 452    margin-top  200   full bleed
section.contact  1440 x 900    margin-top    0
```

**Three things worth stealing, and one caution.**

1. **A ~200px section rhythm, held almost everywhere.** Not a scale, not a ratio - one number,
   reused. The single 100px is between `.my` and `.client`, which are the two halves of the same
   idea, so the tighter gap is doing work.
2. **The column NARROWS for text and goes FULL BLEED for imagery.** 800px for prose, 1440 for the
   key visual and the slider. The page breathes by changing width, not only by adding gaps.
3. **Three headings on a 6,400px page.** The spaciousness is partly just *having less on it*.
4. **CAUTION (D19):** this is a portfolio About whose life is its imagery. Transcribing the rhythm
   alone gives a tall empty page - which is precisely how `projects-aggregate.html` was rejected.
   Take the 200px and the width-change; do not take the silhouette.

---

## harumakigohan.com/profile - **Tier: True, measured live.** The "almost nothing on it" reference.

- **URL:** https://harumakigohan.com/profile/ - Rod's top-tier site.

```
.contents        max-width 1280px, margin 0 80px, padding 110px 20px 20px
  img.top_m_prof    164 x 22     the section heading - a DRAWN PNG, not type
  br                  0 x 23
  img.top_gohan     110 x 110    the avatar,           margin-top 26
  br                  0 x 23
  span.prof_text   1240 x 72     the entire bio,       margin-top 20
  div.prof_sns     1240 x 42     social row,           margin-top 34
  img.prof_butterfly 68 x 92     decoration,           margin-top 26
```

**The whole About page is ~800px tall and has five real elements.** No portrait card, no stats, no
status block, no achievements grid. The bio is **one 72px-tall span**.

Consistent with the earlier finding on their landing (REQUESTS P35): **zero HTML headings on the
page** - every heading is a drawn PNG, here 164x22. Their rhythm is small (20-34px) precisely
*because* there is so little to separate.

**The lesson for us is a subtraction, not an addition.** Rod's own key-features list (P62) is
**header / about me / achievements / scene window** - four things. The blockout currently declares
ten: h1, portrait, bio_intro, bio_more, status terminal, trophy header, five category walls, locked
state. Getting to "spacious" is probably mostly getting to four.

---

## The status terminal - Rod does not recognise it, and that is the answer (P61)

He said: *"i also dont know what the status terminal is."* It is the 2-column status table from
**dimden.dev**, carried into both About variants. The Klubnika variant's own blockout note already
flags it as a **NAMED BORROW** - it is not Klubnika's, it was imported from the other variant.

It is not in his four key features. **Recommend cutting it.** Recorded rather than cut unilaterally,
because removing a declared blockout slot is still a change to the blockout.

---

## What is NOT measured here, so nobody cites it as if it were

- **109ichiki.com/profile** - fetched (30,816 bytes) but its spacing was NOT measured at 1440. It is
  the draggable-window profile Rod likes; its window mechanism is covered in
  `zutomayo-pcmove-window.md` territory, not here.
- **cinni.net/about.html** - fetched (3,981 bytes). Small hand-made page, scrapbook register. Not
  measured.
- **dimden.dev/about.html** - already transcribed in `about-blockout.html` (900px, 675+225, zero
  gap). Its `.box` rule is verified in `section-and-heading-blocks.md`.
- **merodev.net / brittanychiang.com** - in the gallery, not opened for this pass.

Four references were asked for and **two are measured**. Saying two rather than padding to four is
the rule from PAGE-PROCESS: a minimum-source quota manufactures false provenance.
