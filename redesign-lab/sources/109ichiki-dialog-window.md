# Draggable DIALOG WINDOW - 109ichiki.com. **Tier: True.**

- **Source URL:** https://109ichiki.com/_astro/style.COBHKi4A.css (62,906 bytes)
- **Seen on:** https://109ichiki.com/ - markup:
  `<h2 class="_title_3fli2_59">meme.webp</h2>` +
  `<button class="_close_3fli2_70" data-js="dialog-box-close" aria-label="close">`
- **Captured:** 2026-08-23, read from the site's own served CSS.

Rod named 109ichiki's popup windows for the portal alongside zutomayo (D15, and again in P64).
**This is the one that actually drags.** Class names are Astro build hashes, so `_3fli2_` is the
component's scope id, not a name we should carry over.

## The mechanism, verbatim

```css
._root_3fli2_1 {
  width: 100%; height: 100%;
  border: solid 1px var(--color-border);
  border-radius: .1875rem;
  pointer-events: auto;
}

._root_3fli2_1[data-blink=true] { animation: _blinking_3fli2_1 .1s step-end infinite; }

._inner_3fli2_23 {
  display: grid;
  grid-template-rows: 2rem 1fr;     /* 1.5rem at the smaller breakpoint */
  width: 100%; height: 100%;
  border: solid 1px var(--color-white-1);
  border-radius: 2px;
}

._header_3fli2_40 {
  position: relative;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 .5rem 1px .625rem;      /* 0 .25rem 1px .375rem when small */
  border-bottom: solid 1px var(--color-border);
  background-color: var(--color-bg);
  cursor: grab;
}
._header_3fli2_40:active { cursor: grabbing; }

._title_3fli2_59 { font-size: var(--font-size-base-en); pointer-events: none; padding-bottom: 1px; }

._close_3fli2_70 { position: relative; width: 1.125rem; height: 1.125rem; }   /* .75rem when small */
._close_3fli2_70:before {
  content: ""; position: absolute; inset: 0; margin: auto;
  width: 100%; height: 100%; transform: scale(2);
}

._closeInner_3fli2_91 { position: relative; display: block; width: 100%; height: 100%; }
._closeInner_3fli2_91:after {
  content: ""; display: block; position: absolute; inset: 0; margin: auto;
  width: 90%; height: 1px; background-color: var(--color-border);
}
._closeInner_3fli2_91:before { transform: rotate(45deg); }
._closeInner_3fli2_91:after  { transform: rotate(-45deg); }

._body_3fli2_117 {
  position: relative; height: 100%;
  color: var(--color-text); background-color: var(--color-bg);
  overflow: hidden; contain: paint;
}
```

## Four devices worth taking

1. **`cursor: grab` -> `:active { cursor: grabbing }` on the header.** This is what makes it a real
   drag handle, and it is the exact thing zutomayo does NOT have - theirs is `cursor: pointer`,
   which is why `zutomayo-pcmove-window.md` records their drag as unconfirmed. **If Rod wants
   draggable windows, this is the reference, not zutomayo.**

2. **The title bar is a GRID ROW, not an absolutely-positioned overlay.**
   `grid-template-rows: 2rem 1fr` means the bar takes its height and the body takes the rest, at any
   window size, with no padding to keep in sync. zutomayo does the same job with
   `position:absolute` on the bar plus a matching `padding-top: 46px` on the body - two numbers that
   must agree. The grid is one number and cannot drift.

3. **The close button has a 2x invisible hit area.** `._close:before` is `inset:0` at
   `transform: scale(2)`, so an 18px glyph carries a 36px target. That is a real accessibility win
   for free (STYLE.md wants ~44px targets) and it costs one pseudo-element.

4. **The X is drawn in CSS.** Two 1px lines at `rotate(45deg)` and `rotate(-45deg)`, 90% wide. No
   icon font, no SVG, no asset - and it inherits `--color-border`, so it recolours with the frame.

Plus one that is theirs and probably not ours: `[data-blink=true]` runs
`animation: blinking .1s step-end infinite`. A 10Hz blink is a **flash hazard** - STYLE.md's
Section J caps flashing at 3/sec. Do not carry it across without a rethink.

## What transfers and what does not

- **TRANSFERS:** the grab/grabbing handle, the grid title bar, the scaled hit area, the CSS-drawn X,
  `overflow:hidden; contain:paint` on the body (it stops a scrolling body repainting the frame).
- **DOES NOT:** the Astro hash class names; their `--color-*` tokens; the blink state (flash hazard).
- **NOT TAKEN FROM HERE:** the drag itself is JS and **the JS was not read**. The CSS proves the
  handle is meant to be dragged; it does not tell us how they implement it.

## Where this leaves the portal (P64)

**Two verified window references now: this and zutomayo.** They differ in a way that makes the
choice real rather than cosmetic:

| | 109ichiki | zutomayo |
|---|---|---|
| bar | grid row, `2rem` | absolute, `46px` + matching body padding |
| handle | **`cursor: grab`** - genuinely draggable | `cursor: pointer` - drag unconfirmed |
| dismiss | close button, CSS-drawn X | **collapse to the bar** (`height: 46px`) |
| shadow | none | `3px 3px 0`, zero blur |
| mobile | not read | rotate 90deg and dock as a tab |

**Two is what there is, and two is what this says.** PAGE-PROCESS wants four per page type for
common surfaces and explicitly warns that a quota manufactures false provenance on rare ones - the
portal is the rare one that produced the potg.art/lyra.horse mistake. A web search for more turned
up template listicles and jQuery plugins, not live sites whose CSS could be read.
