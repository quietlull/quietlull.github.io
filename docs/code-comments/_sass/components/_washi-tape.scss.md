# Comments removed from `_sass/components/_washi-tape.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/washi-tape/washi-tape.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `/* THIS IS WHERE ALL THE COLOUR ON THE SITE LIVES (Rod 2026-08-22). The cards went grey and`

```text
washi-tape - the site's tape marker, one definition stuck on anything, and the ONE loud
   object on the site (D27). Rod made it a convention 2026-08-21.
   gneiss.place `.taped`, read from their served CSS (sources/gneiss-washi-tape.md). Remixed:
   the tape is theirs, using it as a system-wide marker is Rod's, and the left-edge and L-corner
   placements have no equivalent on their site.
   THE TORN ENDS are winterwind.com/tutorials/css/29 (sources/serrated-edge-css.md), case D,
   which Rod picked 2026-08-22. Their pitch is IRREGULAR on purpose - that is what separates a
   tear from a zigzag, and a uniform one reads as a postage stamp. DO NOT TIDY THOSE NUMBERS.
   Two things are ours: the tear runs on the ENDS rather than the long edge, and its amplitude is
   in PIXELS, because a percentage on .tape--left would resolve against a 300px card and bite
   15px out of a 26px strip.
   MEASURE OFF THE CARD, never a fixed pixel guess. Only the WIDTH is fixed, because real tape
   comes off a roll at one width.
   Still a greybox: --tape-img is a hatch stand-in for the real photographed asset.
   See washi-tape.md, which also holds the open items and the density caveat.
```

### Line 23, above `.tape {`

```text
THIS IS WHERE ALL THE COLOUR ON THE SITE LIVES (Rod 2026-08-22). The cards went grey and
   untextured in the same breath, so colour is concentrated in one small object instead of spread
   across surfaces - which is why four accents do not read as a rainbow.
   Orange and blue are existing tokens. Pink #f078f0 was MEASURED off harumakigohan's own header
   PNGs. Green #6fbf73 is the one guess in the set and is flagged, not smuggled: it wants a real
   sample or Rod picking it. See washi-tape.md.
```

### Line 30, above `--tape-img: repeating-linear-gradient(45deg,`

```text
The neutral is a FALLBACK inside var(), never a declaration. Declare --tape-hue on .tape and
     it shadows the host's value, and every stripe renders grey. It did, until this was caught.
```

### Line 34, on the line `--tape-w: 26px;`

```text
the roll's width. Fixed, because real tape has one width.
```

### Line 35, on the line `--tape-bite: 7px;`

```text
how much of the strip lands ON the card. The rest overhangs.
```

### Line 36, on the line `--tape-min: 44px;`

```text
MUST stay clearly longer than --tape-w. See the note on .tape--v.
```

### Line 37, on the line `--tape-max: 84px;`

```text
longer than this and it stops being tape, it becomes a stripe
```

### Line 39, above `--tear-h: polygon(`

```text
The torn ends. --tear-h tears the left and right ends of a horizontal strip; --tear-v is the
     same numbers transposed for a vertical one.
```

### Line 64, on the line `clip-path: var(--tear-h);`

```text
horizontal is the default; the vertical placements override
```

### Line 67, above `.tape--top { --tape-bite: 16px; top: calc(var(--tape-bite) - 30px); left: 38%; width: 110px; height: 30px; }`

```text
Over the top edge, off-centre so it never reads as a centred label (gneiss uses left:40%).
   The 16px bite is Rod's approved value, not the corners' 7px. Unify only on his say-so.
```

### Line 71, above `.tape--left { top: 0; bottom: 0; left: calc(var(--tape-bite) - var(--tape-w)); width: var(--tape-w); clip-path`

```text
Down the left edge. Pinned top AND bottom so it matches the card at any content length, which
   is why this is the one placement the clamp does not govern. Rod asked for an exact match.
```

### Line 75, above `.tape--v  { width: var(--tape-w); height: clamp(var(--tape-min), 60%, var(--tape-max));`

```text
L corners. Each L is TWO strips crossing at the corner, the way tape really overlaps:
     <i class="tape tape--v tape--tl"></i><i class="tape tape--h tape--tl"></i>
   THE ARMS TAKE DIFFERENT PERCENTAGES ON PURPOSE - a callout is 625 wide and 76 tall, so one
   number cannot serve both. And --tape-min must stay clearly longer than --tape-w: when they
   were equal, a short card clamped the side arm into a 26x26 square that hid exactly under the
   horizontal one and the vertical tape read as missing.
   z-index 2 on the vertical arm is Rod's call, not tidying. Without it paint order falls back to
   DOM order and the horizontal arm wins for no better reason than being written second - and the
   markup order is how you read an L, so it should not have to encode a paint decision.
```

### Line 94, above `.tape--corner {`

```text
Diagonal corner strips, Rod 2026-08-23, the way tape really holds a photo down.
   THE ANGLE IS NOT A PREFERENCE, it is which two edges the corner joins: (tl, br) go -45deg and
   (tr, bl) go +45deg.
   2.6x the roll width, because a 45deg rotation needs about 1.41x the diagonal reach and
   anything under 2x leaves the corner poking out past the tape.
   The negative offset centres the strip ON the corner so half overhangs, which is what makes it
   read as holding the card down. --tape-bite does not drive this one - a diagonal has no single
   bite edge.
```

### Line 117, above `.taped {`

```text
The host has to leave overhang room: width: calc(100% - 2 * (tape-w - tape-bite)).
   It also needs a positioning context and, per gneiss, a sub-degree tilt and a WARM shadow.
```

### Line 122, above `transform: rotate(-0.05deg);`

```text
0.05deg is gneiss's real value; we shipped -0.5, ten times too much (fixed 2026-08-23).
     On a 700px card 0.5deg lifts a corner 6.11px and reads as a tilt, 0.05deg lifts it 0.61px and
     reads as no tilt at all. So the card now looks unrotated, which is what theirs looks like.
     A visible tilt would be OURS and would have to be labelled. See washi-tape.md.
```

### Line 127, on the line `box-shadow: 0 3px 5px var(--color-shadow);`

```text
becomes rgba(88,70,48,.5) when colour lands (D18)
```

### Line 130, above `.tape--orange {`

```text
The four section tapes. Put one on the HOST, never on the .tape, so recolouring a section in
   one place moves every strip on it.
```

### Line 147, above `.tape--green {`

```text
The one unsourced colour of the four. It is a guess. See washi-tape.md.
```

### Line 153, above `}`

```text
There is deliberately no border rule here. Case D has no outline and gneiss's real tape has
   none either.
```
