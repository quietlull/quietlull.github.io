---
name: project-tape-carries-the-colour
description: "D27 - paper is out, cards are plain grey, and the striped washi tape is the site's one loud object in four section colours. Its tips still look fake."
metadata: 
  node_type: memory
  type: project
  originSessionId: 8c9b47c5-9fab-44bd-8291-93f4e3e7cb2f
  modified: 2026-08-22T11:48:58.072Z
---

Rod, 2026-08-22: *"i dont think paper is the play lets do something else. im thinking we just do
normal transparent cards in grey with no texture, the background already adds some texture, and we
will have the fun striped washi tape in the blue, green, pink, and orange for different sections."*

Recorded as **D27** in `docs/DECISIONS.md`. Three things that only make sense together:

1. **No texture on cards.** They are plain, transparent, grey. The scene already carries grain via
   its own paper filter (D24), so a second texture competed with the background instead of adding.
2. **The tape is the site's one loud object** - striped, four colours, one per section.
3. **So colour is CONCENTRATED, not spread.** The design does not get more colourful; it gets
   colourful in exactly one place.

**It OVERTURNS T0-A** ("warm + 1 cool", one cool accent spent rarely, never blanket-applied). D27
carries the reconciliation: the SPIRIT survives (colour spent rarely, on one small object), the
LETTER does not. Expect T0-A to be quoted back at this; the answer is already written down.

**Colour provenance:** orange `#ff6a00` and blue `#3090a8` were already ours. Pink `#f078f0` is
**measured** off harumakigohan.com's own section-header PNGs. **Green `#6fbf73` has NO source** -
Rod agrees it needs one; sample it from a real asset or let him pick.

## THE TIPS: research DONE 2026-08-22, the PICK is still Rod's

Rod asked for a look at other sites first. That happened. `redesign-lab/washi-tape-tests.html` holds
the real reference asset plus 6 sourced edge mechanisms; verbatim CSS in
`redesign-lab/sources/gneiss-washi-tape.md`, `torn-edge-svg-filters.md`, `serrated-edge-css.md`.

**THE FINDING THAT MATTERS, and it contradicts the ask.** Rod asked for *"serrated edges like the
tape was taken out from a roller"*. gneiss.place's real `tape1.png`, measured (alpha threshold 128,
rotated onto the strip's own principal axis): **298 x 116 on its own axis, drawn at 5.42 degrees off
its bitmap axis, ends wandering +/- 6px in two or three broad lobes.** A dispenser blade gives ten to
twenty alternations. **Real washi TEARS; it does not serrate.** Both targets are drawn side by side
rather than one being picked for him.

**Three faults independent of the tips, all measured** - fix these whatever he picks:
1. ours carries a `1px border`; the real tape has **no outline at all**
2. ours is axis-aligned; the real tape sits at **5.42 degrees** to the edge it is stuck on
3. our fill is an opaque two-tone repeat; the sourced stripe (codingartistweb) has a **transparent
   third band** over a 15px period, which is why ours reads as a painted bar

**Citation corrected:** `.taped` IS on gneiss.place, but in `/nonhtml/css/deco.css`, **not**
`index.css` - that file has zero occurrences of "tape". Anyone re-checking against `index.css` alone
would wrongly conclude the citation was fabricated. Only `tape1.png` exists; `tape2/3/4.png` are 404.

**Dead ends, so nobody re-walks them:** CodePen returns **403** to Claude Code sessions (curl and
WebFetch alike) - cite article bodies and raw repo files instead. And the gallery's own
neocities/collage sites (cinni, whey-isolate, midnightsolarium, melonking, minekosmarket, solani)
have **no washi tape in CSS** at all - all six checked.

**Paper is PARKED, not deleted** - nothing shipped, so nothing to unwind. `paper-tests.html`,
`paper-tuner.html` and `references/paper/*-height.png` all survive. The finding worth keeping: only
three sheets exist and **the generator that baked them is not in the repo**, so washi / cold press /
wove is the whole palette of paper available without rebuilding it.

Related: [[project-palette-exploration]], [[project-design-pillars]], [[feedback-bench-is-ours-not-provenance]].
