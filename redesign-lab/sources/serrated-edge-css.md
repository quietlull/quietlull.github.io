# SERRATED edges - the "cut off a roll" look, three real CSS mechanisms

Rod, 2026-08-22: *"i want serrated edges like the tape was taken out from a roller"*. A dispenser
blade gives a **regular fine sawtooth**, which is a different problem from a hand tear (see
`torn-edge-svg-filters.md`). All three below are read from source 2026-08-22.

**Standing warning from the component's own header, still binding:** do NOT free-hand a sawtooth.
Every one of these is a named mechanism with a named author, and the geometry comes from them.

---

## A. Two-gradient MASK sawtooth - CSS-Tricks. **Tier: True (article body).**

- **Source URL:** https://css-tricks.com/using-css-masks-to-create-jagged-edges/
- Stuart Langridge, 2020-05-12.

The single tooth, verbatim from the article:

```css
.el {
  linear-gradient(
    to bottom right,
    white,
    white 50%,
    transparent 50%,
    transparent
  );
}
```

**The trap the article exists to document, quoted in its own terms:** you cannot use the sawtooth
alone as a `mask-image`. Confining the mask to the bottom stripe with `mask-size` leaves the rest of
the element with no mask at all, which masks it away entirely. His words: what you need is *"a
mask-image that is a rectangle the size of the image with just a sawtooth at the bottom"*.

So it is **two mask images**:
1. the tooth gradient above, `repeat-x`, positioned at the edge being serrated;
2. a second gradient that is transparent for that same edge depth and opaque above it, sized to the
   whole element.

He also records that Blink and WebKit needed `-webkit-` prefixed mask properties at the time of
writing, and that the effect degrades to "no sawtooth" rather than breaking.

**Why this one suits tape best:** it is the only mechanism here that is *regular*, which is what a
blade actually produces, and the tooth pitch is a single `mask-size` number - i.e. it is tunable on
the bench, which is where design gets decided.

**Not read:** his pens `oNXaeLa` and `poJxrxW`. CodePen returns 403 in this session. The mechanism
above is transcribed from the article prose and its one inline code block, and the second gradient
is described there in words rather than given as code - **so the second gradient's exact stops are
OURS and must be labelled as ours** when built.

## A2. The same family, independently - Terry Mun. **NOT READ. Do not cite yet.**

- https://medium.com/coding-design/saw-tooth-banners-with-css-95c31e91c196 returns **403**.
- Held only as a name. It reportedly uses two mirrored triangles per jagged edge as a
  `background-image` rather than a mask. That is a search-result summary, not source, and per
  TRAPS a summary is a description. Listed so nobody re-finds it and thinks it is new.

---

## B. Irregular tear by clip-path - winterwind.com. **Tier: True. Verbatim, complete.**

- **Source URL:** https://www.winterwind.com/tutorials/css/29

```css
.paper:before, .paper:after {
  content: '';
  position: absolute;
  height: 2px;
  width: 100%;
  left: 0;
  -webkit-clip-path: polygon(1% 0%, 4% 100%, 9% 0%, 13% 100%, 19% 1%, 21% 100%, 26% 5%, 30% 100%, 36% 2%, 43% 100%, 50% 1%, 52% 100%, 61% 0%, 69% 94%, 70% 0%, 76% 100%, 81% 0%, 84% 100%, 91% 0%, 97% 100%, 99% 3%);
}

.paper:before { background-color: #2e3537; top: 0; }
.paper:after  { background: url(...) 0; bottom: -2px; }
```

**Read the numbers, they are the interesting part.** 21 points, alternating 0-5% and 94-100%, with
**irregular horizontal spacing** (1, 4, 9, 13, 19, 21, 26, 30, 36, 43, 50, 52, 61, 69, 70, 76, 81,
84, 91, 97, 99). That irregular pitch is the entire difference between "torn" and "zigzag" in a
polygon. A uniform pitch here would look like a stamp.

The strip is only **2 px** tall and is painted in the **background colour**, over the sheet - it
covers the sheet's straight edge rather than cutting it. That works on a flat ground and would
**not** work on this site, where a live three.js scene shows through. For us this has to become a
`clip-path` on the tape itself, which is a change of mechanism, not a transcription.

---

## C. The striped tape body - Coding Artist. **Tier: True. Verbatim.**

- **Source URL:** https://codingartistweb.com/2021/10/how-to-create-washi-tape-notes-with-pure-css/

```css
.tape {
  position: absolute;
  height: 220px;
  width: 60px;
  transform: rotate(45deg);
  background: repeating-linear-gradient(
    45deg,
    #f7c61a 0,
    #f7c61a 5px,
    transparent 5px,
    transparent 10px,
    #101010 10px,
    #101010 15px
  );
}
```

**This is the citation our stripe has been missing.** `washi-tape.css` already builds its stripe as
a `repeating-linear-gradient` at 45deg with 5 px bands and had no source for that choice. This is
one, and it is closer than ours: theirs is a **three-stop** repeat - colour, **transparent**, dark -
over a 15 px period, so the card shows through every third band. Ours is a two-tone opaque repeat
over a 10 px period, which is why ours reads as a painted bar.

Also note their strip is **220 x 60 = 3.67 : 1**, rotated 45 degrees, used as a corner tab. That is
the same aspect our `.tape--top` uses. Coincidence, but it means the aspect is at least not lonely.

## D. Tape as an image on the corners - Code It Pretty. **Tier: True. Verbatim.** For contrast.

- **Source URL:** http://www.codeitpretty.com/2013/10/washi-tape-notes-with-html-css.html

```css
.tape-box { width: 450px; margin: 0 auto; position: relative;
            box-shadow: 0 4px 10px -5px rgba(0, 0, 0, .5); }
.tape-box:before { content: url(LEFT WASHI TAPE IMAGE URL HERE);  left: -25px;  top: -25px; }
.tape-box:after  { content: url(RIGHT WASHI TAPE IMAGE URL HERE); right: -25px; top: -25px; }
```

The placeholder strings are theirs, in the published article. Same family as gneiss: an asset on a
pseudo-element, hung **-25px outside the box on both axes** so it overhangs the corner. Included
because it is the second independent site to reach for `::before`/`::after` + one image, which is
what makes that a convention rather than one site's habit.
