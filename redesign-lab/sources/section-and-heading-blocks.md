# Headings and SECTIONS as their own blocks - six real treatments

Rod, P54, 2026-08-22: *"make sure the headers in posts have their own spaced out cards and sections
are broken down into their own bits."*

This is a LAYOUT change to the post page, asked for directly. Per `docs/PAGE-PROCESS.md` a change
Rod asks for becomes a **new variant**, not an edit, and the treatment needs a real source before it
is drawn. Six are below. Four were already held in this folder and verified there; two
(cyanilux, dimden) were read from source on 2026-08-22 for this note.

Rendered side by side at the post's real 94-character measure on `section-break-tests.html`.

---

## A. CYANILUX - every heading IS a card. **Tier: True. Read from source 2026-08-22.**

- **Source URL:** https://www.cyanilux.com/css/style.css?v=12 (13,301 bytes), lines 817-832
- **Seen on:** https://www.cyanilux.com/tutorials/urp-shader-code/ - **20 `<h2>` on that one page**,
  so this is the site's working system, not a one-off.

```css
h2:not(.title-no-margin):not(.title-undecorated), h3, h4 {
	margin-top : 30px;
	padding : 7px 20px;
	background-color: #282828;
	/*border-bottom: 2px solid #505050;*/
	border-left: 10px solid #00aabb;
	border-radius: 7px;
}

.foldout > h2, .foldout > h3, .foldout > h4 {
	background-color: #303030;
}

.tabpanel > div > h2, .tabpanel > div > h3, .tabpanel > div > h4 {
	background-color: #303030;
}
```

**This is Rod's ask, literally.** Every h2, h3 and h4 gets a filled box, a 10px accent left edge and
**30px of space above it** - "their own spaced out cards" in one rule.

Two details worth keeping:
- **h2, h3 and h4 all get the SAME treatment.** There is no size or weight escalation carrying the
  hierarchy - depth is carried by the heading's position in the flow, not by its box.
- **Nesting is carried by FILL.** A heading inside a `.foldout` or a `.tabpanel` goes `#282828` ->
  `#303030`, i.e. one step lighter per level of containment. That is a ready-made answer to the
  second half of the ask.

Its section container, same file, and the page shell it sits in:

```css
.foldout {
	margin-top: 5px;
	margin-bottom: 10px;
	padding: 0px 15px 0px 10px;
	overflow: hidden;
	background-color: #282828;
	border-radius : 10px;
}

.content {
	margin: auto;
	width: 70%;
	border: 3px solid #303030;
	padding: 30px;
	background-color: #202020;
	border-radius: 20px;
	box-shadow: 5px 5px 10px 0px #000000;
	transition: width 0.5s;
}
```

**Caveat, stated:** this site nests card inside card inside card - page shell, section, heading.
That is three fills deep before any prose. Our page has a live scene behind it, which a stack of
opaque fills would bury. That is a real cost, not a detail.

---

## B. DIMDEN - the SECTION is a translucent panel, the heading is plain inside it.
**Tier: True. Read from source 2026-08-22.**

- **Source URL:** https://dimden.dev/css/main.css?9 (18,447 bytes), lines 168-180
- **Seen on:** https://dimden.dev/ - **17 `.box` elements** on the homepage.

```css
.box {
    background-color: #000000a8;
    border: 2px solid #383838;
    border-radius: 4px;
    color: white;
    padding: 10px 15px;
    margin: 5px;
}
@-moz-document url-prefix() {
    .box {
        background-color: #000000d3;
    }
}
```

**The fill is TRANSLUCENT** - `#000000a8` is 66% black over whatever the page is showing, and the
Firefox-only override pushes it to 83% rather than to opaque. That is a real precedent for D27's
"normal transparent cards in grey", from a site already in Rod's gallery, and it is the one source
here whose panel would not bury the scene.

**CORRECTION to a number already in this repo:** `about-blockout.html` transcribes this as
`border:2px solid #666; border-radius:4px; padding:10px 15px; margin-top:10px`. Two of those are
off - the real border is **`#383838`** (the `#666` is the blockout's grey language, which is fine
and deliberate) and the real margin is **`5px` on all four sides**, not `10px` on top only. The
padding and radius match exactly.

---

## C. MINIONSART - a tinted section block, separated by FILL alone. **Tier: True.** Already held.

- **Source:** `minionsart-prose.md` in this folder - style.css:487-494, verified there character for
  character, and used at `Posts.html:80`, `grasssystem.html:117`, `grasssystem.html:199`.

```css
.sectionbackground {
    padding: 7px;
    padding-left: 20px;
    margin: 10px;
    padding-right: 20px;
    border-radius: 2px;
    background-color: #1c1c1c;
}
```

The held note's own description: *"literally the base .section rule plus one fill and a near-square
2px radius. Contrast with the black `.post_card` parent is tiny (#1c1c1c on #000), so the box
separates by fill alone, no rule, no accent bar, no left border."*

**The quietest of the boxed options** and the closest to the "square by default" rule already
locked - 2px is effectively square. Its near-zero contrast is the interesting part: it proves a
section can be a block without becoming a card.

---

## D. CATLIKE CODING - no card at all; NUMBERING makes the section a unit.
**Tier: True.** Already held.

- **Source:** `catlikecoding-prose.md` in this folder - tutorials.css, verified there.
- Selectors: `body{counter-reset:h2}` / `h2{counter-reset:h3}` / `h2:before,h3:before` /
  `article section h2:before` / `section>h3:before`

The held note's own description: *"Two nested CSS counters produce 1, 1.1, 1.2, 2, 2.1
automatically, and the numbers are deliberately DE-emphasised - the `::before` is 14px #888 while
the h2 itself is 20px #222, so the number is a small grey tick sitting before a heading that is
barely larger than body text (20px against 16px prose). The manuscript numbering carries the
hierarchy so the type sizes never have to. No rule, no anchor icon, no colour. h2 also forces a page
break in print, making the section the unit of the document."*

**This is the strongest counter-proposal to a card**, and it is worth putting in front of Rod
precisely because it answers "sections broken down into their own bits" without drawing a single
box. It is also the only one of the six whose section boundary survives printing.

---

## E. IQUILEZLES - hierarchy by COLOUR VALUE alone, plus a bare `<hr>`. **Tier: True.** Already held.

- **Source:** `iquilezles-prose.md` in this folder - https://iquilezles.org/style.css?v=2

```css
h3{ color:#ffffff;font-weight:normal;}h2{ color:#ffffff;font-weight:normal;}
/* there is NO hr{} rule in style.css - grep -c 'hr{' returns 0 */
```

Headings are **de-emphasised**: weight explicitly reset to normal, and the only signal is pure white
against `#c0c0c0` body text. The section break is an unstyled `<hr>` - browser default inset border -
with rhythm from literal `<br>` tags. No size jump, no bold, no numbering, no anchor.

The held note's transferable line: *"no boxes, borders, backgrounds, radii, shadows or padding are
ever used to separate a component from prose. Components differ from prose only by (a) colour,
(b) font family, (c) line-height."*

**The floor of the range.** Included so the boxed options have something to be judged against;
without it every variant on the page is a box and the comparison is rigged.

---

## F. ACEGIKMO - h1 as a ruled chapter divider; h5 as a run-in. **Tier: True.** Already held.

- **Source:** `acegikmo-prose.md` in this folder - https://acegikmo.com/shapes/css/styles.css

Two devices, per the held note: *"(1) h1 is a full-width section rule: centred display-face type
with `border-bottom: solid 1px` and no colour on the border, so the rule inherits the pink `color`
and the heading reads as a ruled chapter divider. (2) h5 is `display: inline` - a run-in heading
that flows into the paragraph beside it rather than occupying its own line."* Whole scale at
`font-weight: 100`, every level with a tight `.3em` bottom margin so the heading sticks to the text
it labels.

**The borderless-colour trick is the reusable bit:** `border-bottom: solid 1px` with no `border-color`
inherits `color`, so one accent change moves the type and its rule together. That costs nothing and
works under any palette, which matters while D18 keeps colour undecided.

---

## What this set does NOT contain, so nobody assumes it does

- **No source here puts the heading card and the section block together.** Cyanilux boxes the
  heading, dimden and MinionsArt box the section. Doing both at once is a COMBINATION and would be
  ours - label it that way if it wins.
- **The greybox versions square every radius** per Rod's locked 2026-08-11 shape rule ("square by
  default, round only by exception"), the same pass `projects-blockout.html` already applied. The
  sources' own radii are 7 / 10 / 20 (cyanilux), 4 (dimden) and 2 (MinionsArt), recorded here so the
  shape call stays reversible.
- **Only dimden's fill is translucent.** Every other boxed option is opaque and would sit on top of
  the live scene rather than letting it through. On a page whose whole ground is that scene, that is
  the deciding property, not the radius.
