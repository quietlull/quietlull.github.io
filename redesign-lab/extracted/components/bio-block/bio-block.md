# Bio block - the About page's two prose blocks

Built 2026-08-23. Three versions of `bio_intro` + `bio_more`, each drawn inside its measured
blockout reservation so the fit is visible rather than claimed.

Demo: `/redesign-lab/extracted/index.html?c=bio-block`
CSS: `redesign-lab/extracted/components/bio-block/bio-block.css`

Rod's framing for this page: *"about page is the landing page except the about me is the hero, the
achievements are the project cards."* So `bio_intro` is the About page's **hero**, not one panel in
a stack. That is the lens the fit problem below should be read through.

---

## 1. The reservation, measured

Read off `about-blockout.html?v=panels` at **viewport 1440** with `getBoundingClientRect`, 2026-08-23.

**Why the `panels` variant is the right one to measure:** it renders portrait **191 x 200**, status
chip **100 x 20** and locked state **641 x 40** - exactly the three ABOUT rows in
`analysis/2026-08-23-blockout-contract.md`. The contract was taken off this variant, so the bio
slots have to be too.

| slot | reserved OUTER | content box | position at 1440 |
|---|---|---|---|
| `bio_intro` | **675 x 112** | 641 wide | x 270, y 196 |
| `bio_more` | **675 x 138** | 641 wide | x 270, y 318 |
| gap between them | **10px** (`.p { margin-top: 10px }`) | | |

Panel chrome as **rendered**: `border 2px`, `padding 10px 15px`, `radius 4px`.

### The blockout's labels are wrong again

The panels are **labelled** `BIO_INTRO - 140px` and `BIO_MORE - 180px`. They **render** 112 and 138.
This is the same fault the contract already logged for the post page (its column is labelled 701 and
renders 711). The rendered value is used here, because that is the geometry Rod approved by eye.

**Nobody should cite 140 / 180. They are labels, not measurements.**

---

## 2. THE FIT. It does not fit, and here is exactly why

Every version renders at **675 wide, which is the reservation's width to the pixel**. The height is
the problem, and it is the same problem in all three versions because it is a property of the copy
and the decided type, not of any design here.

| version | slot | reserved | rendered | over by |
|---|---|---|---|---|
| V1 panel | `bio_intro` | 112 | **369** | **+257** |
| V1 panel | `bio_more` | 138 | **230** | **+92** |
| V2 heading card | `bio_intro` | 112 | **359** | **+247** |
| V2 heading card | `bio_more` | 138 | **220** | **+82** |
| V3 bare | `bio_intro` | 112 | **345** | **+233** |
| V3 bare | `bio_more` | 138 | **208** | **+70** |

Measured at 1440 over CDP, and the demo page re-measures on load so the numbers on it are never
typed by hand.

### The cause, and it is one number

**The blockout's schematic line pitch is 13px. A real line of the decided body type is 23.4px.**

`about-blockout.html` draws prose as `.lines span { height: 1px; margin: 0 0 12px }` - a 1px rule
every 13px. The decided body type is 18px at 130% (`final-post.html:435-436`, resting on Rod's own
94-character call, P33), which is **23.4px per line**. That is a **1.8x** factor, and it is why the
reservation is short even where the blockout drew *more* rules than the copy needs:

- `bio_intro` - blockout drew **6** rules; the real copy sets **10** lines (3 + 4 + 3 across three
  paragraphs). Short on both counts.
- `bio_more` - blockout drew **8** rules; the real copy sets only **6** lines. **Fewer lines and it
  still overflows**, purely on pitch.

Full arithmetic for V1 `bio_intro`, so nothing is hand-waved:
`10 lines x 23.4 = 234` + `2 paragraph gaps x 24 = 48` + `head 27.5 + its 36px bottom margin` +
`panel chrome 24 (20 padding + 4 border)` = **369.4**.

### What I did NOT do about it

- **Did not shrink the type.** Rod rejected small type on this page already: *"Text is too small. i
  have no idea why you chose this size should try to be consistent with posts."*
- **Did not cut his words.** The copy is his, verbatim.
- **Did not silently overflow.** The reservation is drawn as a dashed gold rectangle at true size in
  the demo and the overrun is printed next to every block.

### The three honest ways out, none of them taken here

1. **Grow the reservation** to the measured heights (369 / 230 for V1). This is the one I would
   recommend if asked: the blockout drew a schematic, not a text metric, and Rod has since called
   `bio_intro` the page's hero. It is also consistent with how the contract resolved the post
   column - the later decision won and the blockout was declared out of date.
2. **Cut the copy.** `bio_intro`'s third paragraph (the toolkit list) is the one that reads most
   like a CV line next to the two personal ones. Cutting it saves 70 + 24 = 94px.
3. **Split the block.** Keep 112 for a short lede and move the rest into `bio_more`.

**This is a layout question and layout is Rod's alone, so it is recorded, not acted on.**

---

## 3. The copy

Verbatim from `tech-art/about.md` front matter (`bio_intro` / `bio_more` keys). **One mechanical
change, house rule only:** his two em dashes become commas, per the no-em-dash rule in
CONVENTIONS. Both read cleanly as commas:

- `...technical art is invisible - it just makes...` becomes `...invisible, it just makes...`
- `...competitive esports - I've held...` becomes `...competitive esports, I've held...`

Nothing else in his words is touched. **Open question below.**

---

## 4. What is reused rather than rebuilt (D5)

`decisions.css` already decides the type, so this file does not restate it:

| taken from | what it gives |
|---|---|
| `decisions.css:189-194` | `.prose` - the 94ch measure and the white body colour |
| `decisions.css:195-200` | `.prose p` - weight 300, 130%, -0.18px |
| `decisions.css:210-221` | `.prose a` - stripe's highlighter link and its hover fill |
| `decisions.css:31-33` | `--h2-color` / `--h3-color`, the ladder colours |
| `decisions.css:73-106` | the H2 / H3 sizes and their bottom margins |
| `decisions.css:571-578` | the ROLE MAPPING: on About, the bio head plays H2 and the lesser head plays H3 |

Only two things are added, because they are house decisions that live on `final-post.html` rather
than in `decisions.css` and cannot be reached from off that page:

- body `font-size: 16px`, `18px` from 960px up - `final-post.html:435-436`
- rhythm: margin-TOP only, 24px - `final-post.html:439`

**That is a decision citation, not provenance.** The provenance behind it is stripe.dev, cited by
`decisions.css:184-188`.

**Measure note:** the `.prose` cap is 767px (94 x 8.16). The content box here is 641px in V1 and 675
in V2/V3, so the cap never fires - 641 / 8.16 = 78.5 characters. It is left in place because it does
fire the moment the block is used anywhere wider.

**Nothing in this component animates**, so there is no `prefers-reduced-motion` path to write. The
only transition anywhere near it is `decisions.css`'s link hover, which is that file's business.

**No existing component did this job.** `extracted/components/` has 44 folders and none is a prose
block; the nearest thing that exists is `final-about.html`'s own in-page `.sect` / `.textbox` rules,
which is a **page**, not a component, and which Rod has asked to keep clean until he merges. Those
rules cite the same dimden and cyanilux sources this component is built on, so V1 and V2 are the
component form of what that page already reaches for.

---

## 5. The versions

All three come from **one verified source note**, `sources/section-and-heading-blocks.md`, which
holds six real treatments read from source on 2026-08-22. The three chosen are the three that
answer the one thing genuinely still open for this component: **is the bio block a box, and if so,
where is the box?** The note itself says no source puts the heading card and the section block
together, so those are separate answers and not a spectrum.

### V1 - PANEL. The block is a translucent box, the heading is plain inside it.

- **TIER: Remixed. IDEA-ORIGIN: theirs** (dimden), picked for this page by Rod.
- **Source:** dimden.dev `.box`, `https://dimden.dev/css/main.css?9` lines 168-180, read from source
  and transcribed in `sources/section-and-heading-blocks.md` section B. 17 `.box` elements on their
  homepage, so it is their working system, not a one-off.
- **Verbatim:** the `2px` border, its `#383838`, and `padding: 10px 15px`.
- **Ours, three departures:**
  1. radius `4px` to `0` - the locked shape rule.
  2. fill `#000000a8` to `--color-panel`. Their fill is 66% pure black; ours is the warm grey Rod
     picked on `card-greys-tests`. The source note calls their translucency *"a real precedent for
     D27's normal transparent cards in grey"*, so the mechanism is theirs and the hue is his.
  3. `margin: 5px` all round to the blockout's 10px top gap. Recorded because
     `sources/section-and-heading-blocks.md:107-111` already caught `about-blockout.html`
     mis-transcribing dimden's 5px-all-sides as 10px-top-only. The blockout wins here on the
     "match the blockout" instruction, **not** because the transcription was right.
- **Could not transfer:** nothing. This one ports cleanly.
- **Why it is the version that suits this page:** of the six treatments in that note, dimden's is the
  **only translucent fill**. Every other boxed option is opaque and would sit on top of the live
  scene instead of letting it through. Rod's own gallery note on this exact page
  (`reference-gallery.html:221`): *"stacked bordered panels ... personality through framing rather
  than typography."* dimden.dev is **tier S** in his gallery.

### V2 - HEADING CARD. The heading is the box; the prose sits bare underneath.

- **TIER: Remixed. IDEA-ORIGIN: theirs** (cyanilux).
- **Source:** cyanilux `h2, h3, h4`, `https://www.cyanilux.com/css/style.css?v=12` lines 817-832,
  read from source, transcribed in `sources/section-and-heading-blocks.md` section A. 20 `h2` on one
  page of theirs.
- **Verbatim:** `padding: 7px 20px`, the `10px solid` left edge, and the idea that **h2, h3 and h4
  all get the same box** - no size or weight escalation carries hierarchy, depth comes from position
  in the flow. That is exactly what this page needs, because `bio_more`'s head is one rung down and
  does not want a second design.
- **Ours, three departures:**
  1. radius `7px` to `0` - shape rule.
  2. accent `#00aabb` to the **ladder colour of the level** (`--h2-color` gold, `--h3-color` silver).
     Their accent is a cool cyan and the palette law puts no cool accent outside the sky. Taking the
     level's already-decided colour is the smallest honest join; inventing a warm cyan-substitute
     would not be.
  3. background `#282828` (opaque) to `--color-panel` (translucent) - same scene reason as V1.
- **Could not transfer:**
  - their `margin-top: 30px` above the heading. The head is always its block's first child here and
    the 10px block gap is the blockout's, so their 30px has nowhere to fire. **Dropped rather than
    kept as a rule that never runs.**
  - their nesting-by-fill (`#282828` to `#303030`, one step lighter per level of containment). It is
    a real device but it keys off **containment**, and these two blocks are **siblings**. Reusing it
    here would be borrowing the look and dropping the meaning, so it is left out.
- **Note:** cyanilux is **tier C** in Rod's gallery. The rule is still the literal answer to his own
  earlier ask (P54, *"headers in posts have their own spaced out cards"*), which is why it is here.

### V3 - BARE. No box at all; one rule between the blocks.

- **TIER: Remixed. IDEA-ORIGIN: theirs** (iquilezles). Kept in the set on the source note's own
  instruction, not on a hunch.
- **Source:** `iquilezles.org/style.css?v=2`, transcribed in
  `sources/section-and-heading-blocks.md` section E and `sources/iquilezles-prose.md`.
- **Verbatim:** the principle, quoted from the held note - *"no boxes, borders, backgrounds, radii,
  shadows or padding are ever used to separate a component from prose. Components differ from prose
  only by (a) colour, (b) font family, (c) line-height."* The section break is a bare `<hr>`, and
  there is **no `hr{}` rule in their stylesheet** (`grep -c 'hr{'` returns 0), so there is none in
  `bio-block.css` either. **That absence is the transcription, not an omission.**
- **Ours, and it is an inversion rather than a tweak:** their heading is pure white against `#c0c0c0`
  body text. Ours is the opposite - `decisions.css:186-188` makes body copy the brightest thing on
  the page and lets the heading recede. **Mechanism kept (hierarchy by colour value alone, nothing
  drawn), direction flipped.** That is why this is Remixed and not True.
- **Could not transfer:** their `<hr>` rhythm. Their page spaces things with literal `<br>` tags and
  the browser's default `hr` margins. **Measured on our demo: the default `hr` margins are zeroed by
  `foundations.css`'s global `*{margin:0}` reset, so the bare `hr` contributes about 2px and no
  space.** The rule survives; the spacing around it does not. If V3 wins, that gap has to be decided
  and it will be **ours**, since nothing about their spacing survived the port.
- **Why it is in the set:** the source note's own words - *"the floor of the range. Included so the
  boxed options have something to be judged against; without it every variant on the page is a box
  and the comparison is rigged."*

---

## 6. Open questions for Rod

1. **THE FIT, and it is the one that matters.** `bio_intro` needs **369px** and the blockout reserves
   **112**. Grow the reservation, cut a paragraph, or split the block? Section 2 has the three
   options costed. Layout is yours, so nothing was chosen.
2. **The em dashes.** Your `about.md` front matter has two of them. The house rule says commas and I
   applied it, but that rule is about *my* writing and this is *your* prose. Say the word and they go
   back verbatim.
3. **Heading level.** `decisions.css:571-578` maps About's bio head to the **H2** role and the lesser
   head to **H3**, and that is what is built. Your front matter writes **both** as `###`. The CSS
   mapping is the newer decision so it wins here, but the markdown will need the tag changed at port
   time or the ladder and the source disagree.
4. **Should the bio head carry the H2 counter and hairline?** `.d-h2` in `decisions.css` adds a
   numeric counter and a trailing rule. On About that renders **"1 Hey There, I'm Rod"** and
   **"1.1 More About Me"**, which reads like a manuscript rather than a bio. Left off here, matching
   `decisions.css`'s own About mapping, which sets colour and weight only. Confirm.
5. **The panel padding.** V1 takes dimden's `10px 15px`, which is also exactly what the blockout
   renders - so it satisfies both the source and the contract. But `final-about.html:259-260` argues
   the opposite in your name: *"a full text box wants the room, and 10px 15px is menu padding"*, and
   reaches for cyanilux's 30px instead. Both positions are defensible and they contradict. Which?
6. **One frame per paragraph.** Your own gallery note on dimden's about page says *"short
   first-person paragraphs each in its own frame"* - that is a real fourth direction and it is
   **yours**, not mine. It is not built, because it multiplies the fit overrun rather than solving it
   and I did not want to pad the set with a version I would have to ship broken. Say so and it gets
   built properly.
7. **The portrait.** In this blockout variant the portrait lives in the 225px rail beside the *first*
   panel, not beside the bio - so these blocks run the full 675. `final-about.html` instead puts the
   portrait beside the bio in a flex hero, which gives a ~510px text column. Those are two different
   layouts for the same slot and only one can survive the merge.

---

# Appendix: reasoning moved out of the stylesheet, 2026-08-25

Moved from `_sass/components/_bio-block.scss` under D45 (comments get short). Original wording,
kept because it is the provenance record. The stylesheet points here.

## Header

> bio-block - the ABOUT page's two prose blocks: bio_intro and bio_more. Built 2026-08-23.
>
> Rod: "about page is the landing page except the about me is the hero, the achievements are the
> project cards." So bio_intro is the About page's HERO, not a paragraph in a stack.
>
> COPY IS REAL AND VERBATIM from tech-art/about.md front matter (bio_intro / bio_more keys).
> ONE mechanical change, house rule only: his two em dashes become commas (CONVENTIONS: no em
> dashes in written content). Nothing else in his words is touched.

### The measured reservation

> Read off about-blockout.html?v=panels at viewport 1440 with getBoundingClientRect, 2026-08-23.
> Variant `panels` is the right one to measure: its portrait renders 191x200, its status chip
> 100x20 and its locked state 641x40, which are exactly the three ABOUT rows in
> analysis/2026-08-23-blockout-contract.md. The contract came off this variant.
>
>   bio_intro   OUTER 675 x 112   at x 270, y 196    content box 641 wide
>   bio_more    OUTER 675 x 138   at x 270, y 318    content box 641 wide
>   gap between them   10px   (`.p { margin-top: 10px }`)
>   panel chrome as RENDERED   border 2px - padding 10px 15px - radius 4px
>
> THE BLOCKOUT'S OWN LABELS ARE WRONG AGAIN, the same fault the contract logged for the post:
> the panels are labelled "BIO_INTRO - 140px" and "BIO_MORE - 180px" and they render 112 and 138.
> The RENDERED value is used here, because that is the geometry Rod approved by eye.
>
> *** AND NEITHER NUMBER HOLDS THE REAL COPY. This is stated, not silently absorbed. ***
> The blockout drew bio_intro as SIX 1px schematic rules. The real bio_intro is a heading plus
> THREE paragraphs, which set ten lines at the decided type. Measured overflow is in the .md and
> is drawn in the demo. Nothing here shrinks the type or cuts his words to make a number fit.

### What is reused rather than rebuilt (D5)

> decisions.css does the TYPE. This file does not restate it:
>   .prose            the 94ch measure + the white body colour           decisions.css:189-194
>   .prose p          weight 300 / 130% / -0.18px                        decisions.css:195-200
>   .prose a          stripe's highlighter link + hover fill             decisions.css:210-221
>   --h2-color / --h3-color   the ladder colours                         decisions.css:31-33
> Only two things are added, and both are house decisions that live on final-post.html rather
> than in decisions.css, so they have to be repeated somewhere to be usable off that page:
>   font-size 16px / 18px from 960px up   final-post.html:435-436
>   rhythm: margin-TOP only, 24px         final-post.html:439
> THAT IS A DECISION CITATION, NOT PROVENANCE. The provenance behind it is stripe.dev, cited by
> decisions.css:184-188 (P33, Rod's own 94-character call).
>
> MEASURE NOTE: the .prose cap is 767px (94 x 8.16). The reservation's content box is 641px, so
> the cap never fires at this width - 641 / 8.16 = 78.5 characters. The cap is left in place
> because it does fire the moment the block is used anywhere wider.
>
> NOTHING IN THIS FILE ANIMATES, so there is no prefers-reduced-motion path to write. The one
> transition anywhere near it is decisions.css's link hover, which is that file's business.

## The heading ladder

> the heading ladder, taken from decisions.css and NOT re-decided.
> ROLE MAPPING is decisions.css:571-578, which is explicit for this page: about's `.bio-h` plays
> the H2 role and `.bio-h--lesser` plays the H3 role. Sizes are the ladder's own
> (decisions.css:73-106); weight is 100 on both because the ladder's rule is that hierarchy is
> size and tracking, never weight.
> DELIBERATELY NOT TAKEN: `.d-h2`'s nested COUNTER and trailing hairline. Those number a post's
> sections; the About page has two bio blocks and would read "1" and "1.1". decisions.css's own
> about mapping sets colour and weight only, and this follows it.

## V1 - panel

> The whole block is one translucent panel; the heading is plain inside it.
> TIER: Remixed.   IDEA-ORIGIN: theirs (dimden), picked for this page by Rod.
>
> SOURCE: dimden.dev `.box`, https://dimden.dev/css/main.css?9 lines 168-180, read from source
> 2026-08-22 and transcribed character for character in
> redesign-lab/sources/section-and-heading-blocks.md section B. 17 `.box` elements on their
> homepage, so it is their working system.
>
>   .box { background-color:#000000a8; border:2px solid #383838; border-radius:4px;
>          color:white; padding:10px 15px; margin:5px; }
>
> VERBATIM HERE: the 2px border, its #383838, and the 10px 15px padding.
> THREE DEPARTURES, all stated:
>   1. radius 4px -> 0. The locked shape rule (square by default, 2026-08-11).
>   2. #000000a8 -> --color-panel. Their fill is 66% pure BLACK; ours is the warm grey Rod picked
>      on card-greys-tests at 55%. The source note calls their translucency "a real precedent for
>      D27's normal transparent cards in grey" - so the mechanism is theirs and the hue is his.
>   3. margin 5px all round -> the blockout's 10px top gap (`.bio + .bio`). Recorded because
>      section-and-heading-blocks.md:107-111 already caught about-blockout mis-transcribing
>      dimden's 5px-all-sides as 10px-top-only. The blockout wins here on the "match the
>      blockout" instruction, not because the transcription was right.
>
> WHY IT IS THE ONE THAT SUITS THE SCENE: of the six treatments in that source note, dimden's is
> the ONLY translucent fill. Every other boxed option is opaque and would sit on top of the live
> scene instead of letting it through.
> Rod's own gallery note on this exact page (reference-gallery.html:221): "stacked bordered
> panels ... personality through framing rather than typography."

## V2 - heading card

> The HEADING is the box; the prose sits bare underneath it.
> TIER: Remixed.   IDEA-ORIGIN: theirs (cyanilux).
>
> SOURCE: cyanilux `h2, h3, h4`, https://www.cyanilux.com/css/style.css?v=12 lines 817-832, read
> from source 2026-08-22, transcribed in sources/section-and-heading-blocks.md section A. Seen
> working on 20 h2 in one page of theirs.
>
>   h2:not(.title-no-margin):not(.title-undecorated), h3, h4 {
>     margin-top:30px; padding:7px 20px; background-color:#282828;
>     border-left:10px solid #00aabb; border-radius:7px; }
>
> VERBATIM HERE: padding 7px 20px, and the 10px solid left edge.
> THE IDEA WORTH HAVING, and it is theirs: h2, h3 and h4 all get the SAME box. No size or weight
> escalation carries the hierarchy - depth comes from position in the flow. That is exactly what
> this page needs, because bio_more's head is one rung down and does not want a second design.
>
> THREE DEPARTURES, all stated:
>   1. radius 7px -> 0. Shape rule.
>   2. #00aabb -> the ladder colour of the level (--h2-color / --h3-color). Their accent is a
>      cool cyan and the palette law puts no cool accent outside the sky. Taking the ladder's own
>      colour rather than inventing a warm one is the smallest honest join: the level already has
>      a decided colour and the edge just uses it.
>   3. background #282828 (opaque) -> --color-panel (translucent). Same reason as V1: an opaque
>      fill sits on top of the scene.
> ONE THING THAT COULD NOT TRANSFER: their `margin-top: 30px` above the heading. Here the heading
> is always its block's first child and the 10px block gap is the blockout's, so their 30px never
> had anywhere to fire. Dropped rather than carried as a rule that never runs.
> NOT TAKEN: their nesting-by-fill (#282828 -> #303030 one step lighter per level of
> containment). It is a real device but it keys off CONTAINMENT, and these two blocks are
> siblings - reusing it here would be borrowing the look and dropping the meaning.

## V3 - bare

The V3 banner is written with Sass `//` line comments in the stylesheet, not `/* */`, and that is
deliberate. The lab original nested a second `/* ... */` inside itself for the `grep -c 'hr{'`
aside. CSS comments do not nest, so that inner `*/` closed the outer comment and everything after
it parsed as CSS: Sass refuses it outright, and a browser recovers by eating the rule that
follows. `.bio--bare { padding: 0 }` had been DEAD in the lab, silently, since it was written.
Re-flagged as a lab defect in the port report.

> V3 - BARE.  No box anywhere. The heading recedes, the prose leads, one rule between blocks.
> TIER: Remixed.   IDEA-ORIGIN: theirs (iquilezles), kept in the set on the source note's own
> instruction rather than on a hunch.
>
> SOURCE: iquilezles.org/style.css?v=2, transcribed in sources/section-and-heading-blocks.md
> section E and in sources/iquilezles-prose.md.
>
>   h3{ color:#ffffff; font-weight:normal; }  h2{ color:#ffffff; font-weight:normal; }
>   (there is NO hr{} rule in that stylesheet - grep -c 'hr{' returns 0)
>
> THE TRANSFERABLE LINE, quoted from the held note: "no boxes, borders, backgrounds, radii,
> shadows or padding are ever used to separate a component from prose. Components differ from
> prose only by (a) colour, (b) font family, (c) line-height."
> The section break is a bare `<hr>` - browser default, no rule written, which is why there is
> no `hr` selector below either. That absence is the transcription, not an omission.
>
> WHY IT IS IN THE SET: section-and-heading-blocks.md:178-179 says it plainly - "the floor of the
> range. Included so the boxed options have something to be judged against; without it every
> variant on the page is a box and the comparison is rigged."
>
> ONE DEPARTURE, and it is an inversion rather than a tweak: their heading is pure WHITE against
> #c0c0c0 body text. Ours is the opposite - decisions.css:186-188 makes body copy the brightest
> thing on the page and lets the heading recede. So the MECHANISM survives (hierarchy by colour
> value alone, nothing drawn) and the DIRECTION flips. That is why this is Remixed and not True.
>
> There is no rule to write for the block itself. That is the version.

## V4 - the one Rod picked, 2026-08-23

> PICKED 2026-08-23: V4 = V1's PANEL + V2's HEADING LINE.
> Rod: "bio block do v1 but the header has the line from v2"
>
> So the block keeps V1's single translucent panel, and the heading gains cyanilux's 10px left
> edge from V2. Nothing else of V2 comes across - not its box, not its padding, not its fill.
>
> THIS IS A REMIX OF TWO SOURCED HALVES and is filed as one: dimden supplies the panel (V1),
> cyanilux supplies the edge (V2). Neither site does both, so the COMBINATION is ours.
>
> WHY THE EDGE STILL WORKS WITHOUT THEIR BOX: cyanilux's `border-left: 10px` is doing two jobs on
> their site - marking the level AND terminating their fill. Here the panel already supplies a
> ground, so the edge is left doing only the first job, which is the half Rod asked for. Their
> padding is NOT carried, because the heading sits inside V1's panel padding already and adding
> theirs would double it.
>
> THE LEVEL COLOUR IS THE LADDER'S, not cyanilux's #00aabb, which is a cool cyan the palette law
> rules out. h2 gets the H2 yellow, the lesser head gets the H3 silver - the level already has a
> decided colour, so the edge just uses it rather than introducing a new one.
