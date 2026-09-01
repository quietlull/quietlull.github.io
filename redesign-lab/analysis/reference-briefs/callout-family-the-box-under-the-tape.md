# REFERENCE BRIEF: callout family (the BOX under the tape)

## 1. PREMISE CHECK - the headline

**The stated sources do not cover the component I was asked to brief.** Verified live this session, not from the notes.

`gneiss-washi-tape.md` and `serrated-edge-css.md` are both about the **tape**. Neither describes a callout box, and neither describes how categories differ. I re-fetched all six gneiss stylesheets and grepped `index/box/util/text/deco` for `callout|notice|warning|admonition|aside`: **zero hits.** gneiss.place has no callout system at all. Its only prose device in that family is a bare `blockquote`.

So: the tape treatment is fully sourced, the **box is not**, and the **five-way differentiation is not**. I have not substituted a site silently - section 5 lists the four real sites already in `sources/` that do cover it, all re-verified live, and states exactly which is doing what.

**Verified verbatim (fetched this session, byte-matched against the notes):**

| file | result |
|---|---|
| `https://gneiss.place/nonhtml/css/deco.css` | HTTP 200, 1007 bytes. `.taped::before` matches the note **character for character**. Note's correction stands: the rule is in `deco.css`, not `index.css`. |
| `https://www.cyanilux.com/css/style.css` | HTTP 200. `.notice` family at line 765 verbatim. |
| `https://flamedfury.com/z2Ai70SrDv.css` | HTTP 200, 103,170 bytes (note's figure exact). `aside` rules verbatim. |
| `https://catlikecoding.com/unity/tutorials/tutorials.css` | HTTP 200. `aside` at 236, `article header` at 95 verbatim. |

---

## 2. Where the BOX actually comes from on gneiss, and what the built component got wrong

`washi-tape.css` credits gneiss for "card rotated, shadow warm brown rgba(88,70,48,.5)". Both are real but **neither is in `deco.css`**, and one of the two numbers is off by 10x.

**The warm shadow is real. It is in `box.css`, verbatim:**

```css
.box {
  border: 2px solid var(--ink-primary);
  padding: 0;
  background: var(--bg-paper);
  margin: 3px;
  margin-top: 0;
  border-radius: 0px 4px 4px 4px;
  box-shadow: 0 3px 5px rgba(88, 70, 48, 0.50);
}
```

**DISCREPANCY 1 - the rotation is 10x too big.** The host that `.taped` sits on is `index.css`:

```css
.content-panel { position: relative; transform: rotate(-0.05deg); margin-top: 10px; }
.iframe-panel  { position: relative; transform: rotate(-0.05deg); margin-top: 10px; }
```

`-0.05deg`, matching the inline `style="rotate: 0.05deg;"` the note recorded on the markup. The built `.taped` uses `transform: rotate(-0.5deg)`. **Ten times the source.** Live site wins: `-0.05deg` is theirs, `-0.5deg` is ours and must be labelled ours. This is squarely my remit, since "reference = no rotation" makes rotation a live design lever across the family.

**DISCREPANCY 2 - the shadow placeholder can be retired now.** `.taped` currently ships `box-shadow: 0 3px 5px rgba(0,0,0,0.45)` with a comment saying it "becomes rgba(88,70,48,.5) when colour lands". Colour has landed and the real value is verified above. Use `0 3px 5px rgba(88, 70, 48, 0.50)` verbatim.

**Two more real gneiss box devices, both verified, both useful and neither yet cited anywhere:**

```css
.pinned-note {
  position: absolute; top: 64%; right: 5%;
  background: #f3e7c9; padding: 10px 14px; width: 150px;
  font-size: 13px; text-align: center;
  border: 1px solid #c9b48a;
  box-shadow: 3px 3px 0 #bda77d;   /* HARD offset, zero blur */
  transform: rotate(2deg); z-index: 9999;
}

.polaroid {
  display: inline-block; background: var(--bg-paper);
  padding: 1rem 1rem 3rem 1rem;    /* the deep bottom sill IS the polaroid */
  border-radius: 4px; box-shadow: var(--shadow-lifted);
  max-width: max-content; transition: transform 0.2s ease;
}
```

`.pinned-note`'s **hard, unblurred `3px 3px 0` shadow is the scene-safe option** and it is sourced. A blurred shadow smears the live three.js scene behind it; a hard offset does not. Offer it against the `0 3px 5px` warm blur rather than picking for him.

`.polaroid` matters because the fieldnotes markup is `class="taped polaroid"` - the tape's real partner box is asymmetric-padded (`1rem 1rem 3rem`), not evenly padded. That asymmetry is theirs and is free.

Resolved gneiss tokens: `--bg-paper #fdfcf9`, `--bg-paper-alt #f4f0ec`, `--ink-primary #2a3135`, `--accent-red #a83c32`, `--shadow-quiet 1px 2px 4px rgba(0,0,0,.04)`, `--shadow-lifted 2px 6px 12px rgba(0,0,0,.08)`.

**Do NOT take** `.glassine-overlay-box` from the same `box.css` file. It carries `backdrop-filter: blur(2px)`. It is sitting right next to the rules you want.

---

## 3. The quote box contradicts its own sources. Confirmed, and it is worse than stated

Three independent sites, zero boxes.

**Maxime Heckel** - no bar, no rule, no glyph, **no background**. The whole device is typographic contrast plus a width break that lets the quote physically escape the 663px measure:

```css
.c-cZflSx{padding-top:32px;padding-bottom:32px;width:100%;margin:0}
.c-dErIMx{max-width:1020px;padding:0 var(--space-2);text-align:center;width:100%;margin:0 auto;color:var(--text-primary)}
.c-dErIMx p{font-family:var(--font-serif);margin-bottom:0;font-style:italic;font-size:var(--font-size-7) !important;line-height:1.6818 !important;font-weight:var(--font-weight-400) !important}
```

**Stripe** - weaker than "refuses". The rule exists but is **REJECTED ON USAGE** in our own note: genuine CSS, zero `<blockquote>` elements across four fetched articles. It is dead CSS, not a used device.

```css
.BlogPost-module__ifVEqa__articleBody blockquote{border-left:2px solid var(--bodyTextColor);margin:24px 0 0 12px;padding-left:16px}
```

**gneiss itself, verified live this session** - also refuses a box, and it is the tape's own site:

```css
blockquote { border-left: 3px solid var(--ink-primary); padding-left: var(--space-md);
             margin: 1.5rem 0 1.5rem 1rem; font-style: italic;
             font-family: var(--font-display); font-size: 1.05rem; color: #333; }
blockquote cite { display: block; margin-top: 0.75rem; font-family: var(--font-body);
                  font-size: 0.85rem; font-style: normal; color: var(--accent-red); }
```

**Verdict: quote + card + L-corner tape has no source. Tier it Slop, idea-origin Claude, and say so in the header.** A left bar is the only boxless treatment all three share, and tape B (left edge) is already the tldr's slot.

**Same problem, one degree milder, on tldr.** catlikecoding's TL;DR is also boxless - italic, bullets stripped, a 1.5em whitespace island as the only signal:

```css
article header h1 { display: inline-block; font-size: 32px; margin: 0 }
article header p  { display: inline-block; font-weight: 700; margin: 0 0 0 .5em }
article header ul { font-style: italic; list-style-type: none; margin: 1.5em; padding: 0 }
article header ul li { margin: 0; padding: 0 }
```

Milder because catlikecoding does run a boxed `aside` on the same site, so a box is at least in that site's vocabulary. Maxime and stripe have no such fallback for quote.

---

## 4. The category-colour scheme has a collision Rod should see before it is built

Two things beyond the palette question:

**a) It overturns more of D27 than "the colour half".** D27's own wording is the four colours are for **sections**. If colour now encodes **type**, a warning inside the blue section renders pink, and section identity and type identity fight over the same single loud object. There is no third channel left on the tape. This is the actual consequence and it is a Rod call, not a craft call.

**b) Pink = warning, green = note inverts the universal convention** (green reads "ok", warm reads "caution"). A taste flag, not a blocker, but it is the one thing a reader decodes without being taught.

Colour sourcing status, unchanged from `washi-tape.css` and re-stated because two of five are not clean:

| category | tape | colour | source status |
|---|---|---|---|
| warning | D, 4 diagonal corner tabs | `#f078f0` | measured off harumakigohan.com header PNGs. **Sourced.** |
| note | A, top edge | `#6fbf73` | **NO SOURCE. Still the one guess.** Wants a harumaki sample or Rod picking it. |
| tldr | B, left edge | `var(--color-glow)` | ours already, the ember |
| quote | C, L corners | `var(--color-accent-cool)` | ours already, Gen'eiten flyers |
| reference | none | none | n/a |

**On the blue:** the palette law says no cool accent outside the sky. Rod approved the blue L on the tape directly ("for the Blue L the vertical piece should be on top"), so it stands as his exception **on the tape object only**. It must not migrate to the box border, box text, or a chip. Say it in the header so the next agent does not read the exception as a licence.

---

## 5. The four real box sources, all re-verified live. Two say BOX, three say NO BOX

Nothing here was substituted silently - these are the only files in `sources/` that cover a callout box, and none of them is the stated source.

**A. flamedfury `aside` - one box, role changes ONLY the icon. Rod already picked this device.** Verified verbatim:

```css
.post aside, .styleguide aside, .page aside {
  --border-width: 0.2rem;
  --border: var(--border-width) solid #999;
  border: var(--border);
  border-radius: var(--border-radius);
  padding-inline: var(--space-s-m);
  position: relative;
  color: var(--color-text);
  background-color: var(--color-bg);
  padding-inline-start: var(--space-l-xl);
  padding-block: var(--space-s-m);
  margin-block: var(--space-m-l);
}
```
```css
--space-s-m:  clamp(0.625rem,  0.41rem + 1.06vw, 1.3125rem);
--space-l-xl: clamp(1.1875rem, 0.48rem + 3.56vw, 3.5rem);
--space-m-l:  clamp(0.875rem,  0.55rem + 1.63vw, 1.9375rem);
```

**Confirmed live: `--border-radius` bare is defined ZERO times in the file.** `--border-radius-medium` and `--border-radius-small` exist; the bare token does not. The declaration resolves to nothing and **their aside renders square**. Square-by-default is not a deviation from this source, it is a transcription of it.

This is the strongest structural answer to "how do five categories differ": **one box, one shell, the variant class changes one thing only.** That is exactly the property the tape system needs, since the tape is already the differentiator. The role classes are `note / warning / tip / skateboard`.

**B. cyanilux `.notice` - hatched gutter plus round chip.** Verified verbatim at line 765, plus the live markup.

```css
.notice { margin: 5px 0px; display:flex; background-color: #282828;
          border-radius : 10px; border: 3px solid #303030; }
.notice-left { margin-right: 10px;
  background: repeating-linear-gradient(45deg, #262626, #262626 12px, #202020 12px, #202020 24px);
  border-radius : 6px 0px 0px 6px; }
.notice-exclamation { margin: 15px 10px; background-color: #00aabb; color:#202020;
  min-width : 28px; height : 28px; border-radius : 100%;
  font-weight: 700; font-size: 20px; text-align: center; }
.notice > div > p { margin : 5px 0px; }
```

**DISCREPANCY 3, and it would have bitten the build.** `cyanilux-notice-callout.md` calls `.notice-left` a "narrow hatched gutter" and suggests for the blockquote role: *drop the chip and keep only the hatched gutter*. **`.notice-left` has no width declaration.** Live markup confirms it contains nothing but the chip:

```html
<div class="notice"><div class="notice-left"><div class="notice-exclamation">!</div></div>
<div style="margin: 5px;">...</div></div>
```

Its 48px width is `min-width:28px` plus the chip's `margin: 15px 10px`. **Drop the chip and the gutter collapses to zero and renders nothing.** If the craft stage wants a chipless gutter it must declare a width, and that width is OURS.

Also note the 45deg hatch here is the **same mechanism at a different scale** as the tape's own stripe (24px period vs the tape's 10px). Putting a hatched gutter on a card that already wears hatched tape will read as one object repeated, not two. Worth a look before it is built.

**C. catlikecoding `aside` - a disclosure box, not an admonition.** Verified verbatim at line 236:

```css
aside { background-color: #ddd; border: 2px solid #ccc; font-size: 14px; margin: 1em; padding: 0 1em }
aside h3 { font-size: 14px; margin: 0 0 1em; padding: 1em 0 0; cursor: pointer }
aside div { display: none }
aside div.expanded { display: block }
.tutorials ol, article aside h3 { text-align: center }
.dark aside { background-color: #444; border-color: #555 }
@media print { aside div { display: block } }
```

Three things here are genuinely good and cheap: **the box is one notch smaller than prose** (14px vs 16px) so a run of callouts reads as a quiet secondary rail rather than a stack of banners; **the h3 gets no size hierarchy** at all; and the collapse degrades to fully readable under `@media print`. Square already, 2px flat border, no radius, no shadow.

**D. stripe references list - this is your "reference" category, and it says NO BOX.** Note-verified (not re-fetched; the note carries its own verify pass):

```css
.ListItem-module__kBFJiq__listItem{grid-template-columns:subgrid;border-bottom:.5px solid var(--borderColor,--fontColor);color:var(--listItemText);grid-column:1/-1;display:grid}
.BlogPost-module__ifVEqa__additionalResourcesList{grid-column:1/-1;grid-template-columns:subgrid;margin:0;padding:0;list-style:none;display:grid}
.BlogPost-module__ifVEqa__link{grid-column:1/-1;grid-template-columns:subgrid;align-items:center;padding:12px 0;display:grid}
.SquareIcon-module__6K7DfG__icon{background-color:var(--squareTextColor);width:8px;min-width:8px;height:8px;min-height:8px;margin-top:.5px}
```

Hairline `.5px` bottom rules, an **8px hard square** marker, `list-style:none`, 12px row padding, no card, no border, no fill. **The decided treatment for reference is "no tape, no rotation" and this source goes one further: no box either.** That is the cleanest sourced answer in this brief.

**E. Optional, for the category LABEL - maxime's tab that straddles the edge.** Note-verified, not re-fetched. Structurally the same move as tape on an edge, so it may double up rather than help:

```css
.c-hwIklu{position:absolute;display:flex;top:-16px;right:-8px;border-radius:var(--border-radius-1);padding:6px;color:var(--background);font-size:var(--font-size-1);font-weight:var(--font-weight-500);user-select:none;background:var(--icon-background, var(--background))}
.c-hwIklu-fTjxTx-variant-info{--icon-background:var(--accent)}
```

Free-form label text ("Sources", "Reminder"), not a fixed severity set. The `--danger` sibling variant is banned under no-red.

---

## 6. What cannot transfer under the palette / scene law

| source value | why it dies | replacement |
|---|---|---|
| cyanilux `#00aabb` chip | cyan, cool UI accent | gold ramp, or the type colour already on the tape |
| flamedfury `#999` border and Tabler icon strokes | dead grey on a warm site; icons are stock | `--color-silver #a3a19d`; icons need their own source |
| catlikecoding `#ddd/#ccc`, `.dark aside #444/#555` | neutral scale, and `#444` is an **opaque fill that kills the scene** | `--color-panel rgba(28,26,24,.55)` + a warm line token |
| gneiss `--bg-paper #fdfcf9`, `--ink-primary #2a3135` | light-paper palette, inverts on night | `--color-panel` / `--color-text #f5f3ef` |
| gneiss `--accent-red #a83c32` (on `blockquote cite`) | no red, outright | `--color-silver` |
| maxime `--danger` variant | no red | drop the variant |
| gneiss `.glassine-overlay-box` `backdrop-filter: blur(2px)` | glass tell, being stripped site-wide | do not take |
| all radii: cyanilux 10/6px, gneiss `.box` `0 4px 4px 4px`, `.polaroid` 4px | square by default | 0. catlikecoding and flamedfury are already square. |

**Existing in-repo violation to fix, not carry forward:** `extracted/components/quote-block/quote-block.css:19` sets `color: var(--color-muted)` - that is `#9aa3bd`, the banned last blue. Use `--color-silver #a3a19d`.

**Status of the three existing callout components:** `tldr-callout.css` and `quote-block.css` both carry a self-declared **CIRCULAR CITATION correction at the top** - they cite `rework-hana.html` / `rework-harumaki.html`, which are our own builds. Both are **Slop with no external provenance** by their own headers. `stamp-callout.css` cites "Rod-provided stamp CSS", which is Rod-origin and stands. Do not treat any of the three as a parent; the sources above are the real ones.

---

## 7. Geometry contract the box must honour (REUSE `washi-tape.css`, do not redefine)

Read off the built component. These are hard numbers the box has to clear or the tape clips:

- `--tape-w: 26px`, `--tape-bite: 7px` (`.tape--top` overrides to 16px)
- **Host width:** `calc(100% - 2 * (var(--tape-w) - var(--tape-bite)))`, offset `margin-left: 19px`
- **Host needs `position: relative` and must NOT set `overflow: hidden`** - every placement overhangs
- `.tape--top`: `top: -14px`, height 30px, `left: 38%`, width 110px. Needs 14px clear above, plus rotation slack
- `.tape--left`: `left: -19px`, pinned `top: 0; bottom: 0`. Box left padding must clear the 7px bite
- `.tape--corner`: `top: -9.1px`, `left/right: -24.7px`, width 67.6px, rotated 45deg. **Four of these on the warning box** means all four corners need padding that keeps text out from under the tabs
- `.tape--v` z-index 2 sits over `.tape--h` z-index 1 (Rod: vertical on top)
- **The colour class goes on the HOST, not on `.tape`.** So the box element carries it: `class="callout callout--warning taped tape--pink"`. This is not cosmetic - `.tape` deliberately declares `--tape-hue` only as a `var()` fallback so the host value can inherit. Setting it on `.tape` renders grey.

---

## 8. Open asks for Rod, batched

1. **Rotation.** Source is `-0.05deg`; we ship `-0.5deg`, 10x. Correct to theirs, or keep ours and label it ours?
2. **Quote has no source for a box.** Three sites refuse one (stripe does not even use its own rule). Boxless left-bar quote with tape on the bar, or accept a Slop-tiered card?
3. **Section colour vs type colour collide on one object.** What happens to a warning inside the blue section?
4. **Green `#6fbf73` is still the one unsourced colour** and it is now carrying the `note` category, the most-used one.
5. **Shadow:** warm blur `0 3px 5px rgba(88,70,48,.5)` (gneiss `.box`) or hard offset `3px 3px 0` (gneiss `.pinned-note`)? Both sourced; the hard one does not smear the scene.
6. **Pink = warning, green = note inverts the convention every reader already knows.** Intentional?

Scratchpad with all fetched CSS: `C:\Users\Rod\AppData\Local\Temp\claude\C--Users-Rod-Documents-ProjectFiles-Website\5b134360-884e-4a99-88bf-dcdb6d975d1c\scratchpad\` (`deco.css`, `gneiss-index.css`, `gneiss-box.css`, `gneiss-text.css`, `gneiss-util.css`, `cyanilux.css`, `cyan-page.html`, `flamed.css`, `catlike.css`). No component files written, per the stage instruction.