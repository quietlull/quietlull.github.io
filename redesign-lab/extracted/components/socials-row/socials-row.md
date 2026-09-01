# socials-row - "Elsewhere"

Three versions of the five-link social block for the ABOUT rail.

**Reservation: 191 x 120.** Read off `about-blockout.html` at viewport 1440 with
`getBoundingClientRect`, recorded in `analysis/2026-08-23-blockout-contract.md` (ABOUT table,
"Socials"). Every fit number below was measured the same way, in headless Chrome at 1440, against
the demo in this folder. None of them is arithmetic unless it says it is.

| version | measured | verdict |
|---|---|---|
| V1 Ring | **191 x 112** | FITS, 8px of height spare |
| V2 Names | **191 x 107.59** | FITS, 12.41px spare |
| V3 Marked | **191 x 107.59** | FITS, 12.41px spare |

---

## What was REUSED rather than sourced

- **The five marks.** `references/social-icons/` already holds github / x / linkedin / artstation /
  itchdotio, fetched verbatim from `unpkg.com/simple-icons@13.0.0` on 2026-08-23 for the portal
  windows (`portal-window.css:338`). `element-tracker.md` logs them as
  `Social icons (5) | True | mine`. Nothing new was fetched, nothing was drawn, nothing was
  approximated. Geometry byte-identical; those files carry no `fill` attribute so there was nothing
  to strip.
- **The label recipe.** `.socials-row__label` is TheRealMJP's kicker
  (`font-size:.8em; opacity:.8; text-transform:uppercase; letter-spacing:.06em`), already fetched,
  verified live and built in `extracted/components/prevnext-real/prevnext-real.css:58`. Reused, not
  re-sourced.
- **The focus ring.** Not declared here. `extracted/styles/generic.css:25` owns it globally
  (sources/focus-ring.md, Option B). Every version pairs `:hover` with `:focus-visible` instead,
  which is stephanewillems' own rule.
- **The type size.** `0.75rem` is `decisions.css:423` (`.d-tag`), not a new number.

## What was NOT reused, and why

- `extracted/components/drift-magnet/` has a `.dm-social` - a circular social button with
  dennissnellenberg's rising-circle fill. **Not used.** It carries text glyphs ("GH", "AS"), it is
  3.4rem, and the fill is a solid gold disc rising behind the glyph, which is the largest opaque
  object any of these versions could put in front of the live scene. It stays available if Rod
  wants motion on V1.
- `extracted/components/skills-row/` does the closest job (marks in a row with mono labels, drawn in
  with stephanewillems' `pathLength="1"`). **It does not fit and that is measured from its own
  declared values:** its item is `4.75rem` wide with a `3rem` icon and a `2rem` container gap, so
  191px holds two columns (152 + 32 = 184), five items make three rows, and three rows come to
  `3 * 67.9 + 2 * 32 = 267.7` against a 120 reservation. Shrinking the icon to make it fit would be
  three numbers of mine replacing three of theirs, so it is not offered as a version. **The draw-in
  is still available for free** on V1 or V3 by adding `skills-row`'s classes to the marks - say the
  word.
- `skills-row__label` uses `--color-muted` (#9aa3bd), which is the blue the palette law rules out.
  Not carried across.

## A saved source is WRONG and the live site corrected it

`sources/cortiz-socials.md` was checked rather than trusted. Live `cortiz.dev` fetched 2026-08-23
(index 22,691 bytes, `/_next/static/css/e603ef32f6459a22.css`). **Three of its claims do not hold.**

| the note says | the live site says |
|---|---|
| `50px x 50px` | **70 x 70** at desktop. 50 x 50 is the `@media(max-width:768px)` value. |
| "the HOVER is GSAP-driven (no CSS hover rule found)" | **There is a CSS hover and it is the whole state change:** `a:hover{border-color:#fff}`, `a:hover svg{color:#fff}`, and `a svg{color:hsla(0,0%,100%,.711); transition:color .2s ease-in-out}`. |
| the rule lives on `.mediaLink` | `.mediaLink` carries **no CSS at all**; it is a bare hook. The rules are on `.SocialMedia_socialMedia__608e_ a`. |

Also absent from the note and used here: the row is `<div class="flex gap-[12px]">` (**gap 12px**),
and the marks are `width="1em" height="1em"` at `text-[20px] lg:text-[30px]` - so their 70px ring
pairs with a 30px mark and their 50px ring pairs with a **20px** mark. That pairing is used rather
than a size of mine.

**OPEN FOR ROD:** `sources/cortiz-socials.md` is outside this folder so it was not edited. It needs
the correction, and its "Decision needed: recreate the feel ourselves (magnetic hover or
ring-fill-on-hover)" paragraph is now moot - the feel is a two-value colour lift and it is in CSS.

---

## V1 - "Ring"

- **Tier:** Remixed
- **Idea origin:** Rod. `sources/cortiz-socials.md` opens with "Rod wants: the social buttons".
- **Source:** cortiz.dev, re-fetched and corrected 2026-08-23 (see above).

**Verbatim:** the 12px row gap; the 50px box; `border: 2px solid`; `border-radius: 50%`;
`display:flex; align-items:center; justify-content:center`; the 20px mark that goes with the 50px
box; `transition: color .2s ease-in-out`.

**Ours:**
- **Colour.** Theirs is one hue at two values - white at 71.1% resting, 100% on hover. Ours is
  `--color-silver` resting (which is literally `#f5f3ef` mixed 62% into the panel,
  `decisions.css:20`) lifting to `--color-gold`. The value RELATIONSHIP is theirs; the hue is the
  site's, because a white ring and a white mark on a night ground is exactly the cool-neutral look
  the palette law exists to prevent.
- `border: 2px solid currentcolor` rather than a separate `border-color`. Theirs transitions only
  `color`, so their ring **snaps** to white while the mark fades; ours fade together. A real
  behavioural difference, not a tidy-up.
- No label. Forced, not chosen: the label block measures 9.59 + 8 = 17.59px and 112 + 17.59 =
  **129.59** against a 120 reservation.

**Could not transfer:**
- Their 70px desktop ring. Five 70px rings need `5 * 70 + 4 * 12 = 398px`; the rail is 191. The
  50px value is theirs too, just from their narrow breakpoint, so nothing was invented - but a
  191px rail is being given a value calibrated for a phone, and that is worth knowing.
- Their `#fff` hover, per the palette law.

**ROUND, AND IT NEEDS ROD'S WORD.** Square-by-default is locked. On this source the circle is not
decoration, it is the only liftable part: the hover was believed to be GSAP (it is not), and the
colour cannot come across. Square the ring and V1 stops being sourced at all. Kept round and flagged
rather than squared silently.

---

## V2 - "Names"

- **Tier:** True on the link rule; the block as a whole is Remixed (the label is grafted from
  TheRealMJP, and the colour half of the hover is mine).
- **Idea origin:** theirs.
- **Source:** 109ichiki.com footer SNS list. `https://109ichiki.com/profile/` plus
  `https://109ichiki.com/_astro/style.COBHKi4A.css` (62,906 bytes, fetched 2026-08-23 - the same
  file and the same byte count already recorded in `sources/109ichiki-dialog-window.md`, so that
  note verifies). Rod tiered this site himself; his gallery note on the profile page reads
  "socials as small labelled buttons".

**Verbatim,** `_snsLink_m7rmt_45`:

```css
display:flex; align-items:center;
text-decoration:underline;
text-decoration-thickness:1px;
text-underline-offset:.1875rem;
text-decoration-color:color-mix(in srgb,currentColor 60%,transparent)
:hover { text-decoration:none }
```

and its container `_sns_m7rmt_35`: `{display:flex; gap:1.25rem}` with
`@media screen and (max-width:576px){display:block}`.

**The stack is theirs too.** A 191px rail cannot hold five names in a row, and rather than invent a
stack I took the rule they already ship for that case - their own `<=576px` `display:block`. No
layout was originated.

**The hover is the interesting part and it is backwards on purpose:** the underline is present at
rest and REMOVED on hover. That is a non-colour state change, which is what WCAG 1.4.1 wants, and it
costs no motion over the live scene.

**Ours:**
- `color` also moves to gold on hover/focus. Theirs does not change colour, but theirs sits on an
  opaque page. On a night ground the underline vanishing on its own reads as the link switching
  off. Say the word and the colour half comes out.
- `line-height: 1.5`, and the number has a reason rather than a taste: the house body value is 1.7
  (`extracted/styles/generic.css:18`), which makes five names `5 * 20.4 = 102`, and 102 plus the
  measured 17.59 label block = **119.59** of 120. That is 0.41px of slack, which is not slack. At
  1.5 the block measures 107.59 and the slack is 12.41px.

**Worth knowing, not a fault:** the link measures the full 191 wide, because their narrow layout is
a block `<li>` with a `display:flex` `<a>` in it. The **underline does not** - it is painted on the
text run, measured at 43.2 / 7.2 / 57.61 / 72 / 50.41px for the five names. So the whole row is the
hit target and only the word is marked. That is a bigger pointer and keyboard target than the text,
so it stays.

**Could not transfer:** their `1.25rem` wide-layout gap, because the wide layout itself does not
fit. Their font (`--font-size-base-en`) is a build variable on a Japanese site and was not chased;
`0.75rem` comes from `decisions.css` instead.

---

## V3 - "Marked"

- **Tier:** Remixed
- **Idea origin:** theirs
- **Source:** the OTHER social device on 109ichiki.com - the labelled link on the profile and
  loading screens: `<a class="_root_2nwwz_1"><span class="_inner_2nwwz_27">Twitter<span
  class="_arrow_2nwwz_35"><svg .../></span></span></a>`. Same stylesheet, same fetch.

**Verbatim:**

```css
._inner_2nwwz_27 { display:flex; align-items:center; justify-content:center;
                   gap:.5em; padding:.25em 1.2em .3em }
._arrow_2nwwz_35 { width:.8em; display:flex; align-items:center;
                   justify-content:center; margin-top:.16em }
[target=_blank] ._arrow_2nwwz_35 { transform:rotate(-45deg) }
```

The arrow **path** is theirs byte for byte (`viewBox="0 0 12 9"`). The mark at `width:1em;
height:1em` is cortiz's own markup (`height="1em" width="1em"` on every social svg), so the mark
tracks the label size instead of being pinned.

**Ours:** the same silver-to-gold lift and 0.2s colour transition as V1, and the stack, which is
109ichiki's own `<576px` rule again.

**Could not transfer - THE PILL BOX, and it is dropped for three separate reasons:**
1. `border-radius:100vh` is a full pill, against square-by-default.
2. Squared, it lands on something the site already owns twice (`.d-tag` and `.tag-badge`), so it
   would be a third box for one job.
3. It does not fit. **This one is arithmetic from their declared values, not a measured render, and
   is labelled as such:** at 0.75rem their `.25em 1.2em .3em` padding plus a 1px border makes each
   chip 20.6px tall with 14.4px of side padding each side; against the measured name widths
   (43.2 / 7.2 / 57.61 / 72 / 50.41) five chips wrap to four rows inside 191px, which is about
   100px of chips before the label's measured 17.59, leaving nothing for the padding that makes a
   pill a pill. If Rod wants the chips, that gets built and measured rather than estimated.

Their **invert hover** (`background:var(--color-text); color:var(--color-bg)`) goes with the box -
filling a box requires a box.

Their arrow's wrapper `<span>` is dropped and its rules applied to the `<svg>` directly. One element
instead of two, identical geometry (D5).

**Verified rather than assumed:** the arrow is the one element here whose colour comes through a
`<use>` shadow tree with `fill="currentColor"` on the path and `fill="none"` on the host svg, which
is theirs and is the kind of thing that silently renders nothing. It was clipped out of the rendered
page and checked: it paints, at 9.6 x 7.2 (0.8em against a 12:9 viewBox) rotated -45deg, giving an
11.87px axis-aligned box.

---

## Open questions for Rod

1. **Marks, names, or both?** That is the actual choice between the three, and nothing in the
   blockout answers it - it reserves a box, not a treatment.
2. **V1 is round.** It is the only round thing here. Keep the circle as the one shape-pass
   exception, or square it and accept that V1 stops being sourced?
3. **V2's hover adds a colour change theirs does not have.** Keep it, or ship the underline-removal
   alone as they do?
4. **The post rail is a different, smaller slot and is NOT solved here.** `final-post.html:616`
   carries the same component as `data-slot="socials (Elsewhere)"` at `min-height:90px`. V2 and V3
   measure 107.59, which is over it; V1 measures 112, also over. The post rail's WIDTH was never
   measured for this pass, so re-fitting it is a separate job, not an assumption.
5. **`sources/cortiz-socials.md` needs correcting** and is outside this folder, so it was left
   alone. Three of its claims are wrong (table above).
6. **The draw-in is available.** stephanewillems' `pathLength="1"` is already built in `skills-row`
   and would drop onto V1 or V3's marks with no new source. Not applied, because nobody asked for
   motion in this slot.
