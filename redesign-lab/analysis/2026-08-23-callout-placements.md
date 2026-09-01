# Where the new callouts actually fit — read off a real post

Rod, 2026-08-23: *"find places where the new callouts might be good to use as well."*

Worked against **`_posts/tech-art/2026-03-20-ComputeGrass.md`**, his most complete post, because
the honest test of a callout system is whether it fits writing that already exists rather than
writing invented to suit it.

**Result: four of the five categories have a genuine home in this one post. One does not, and
saying so is the useful part.**

---

## 1. TL;DR — orange, tape B (left edge) — **he already writes one**

Lines 26-32. The post opens with *"The pipeline works as follows:"* and six bullets that summarise
the entire system before any detail:

> - A script generates blade positions and feeds it to a position buffer on the GPU
> - Each frame compute shader reads that position buffer and generates the grass blade geometry
> - A single `Graphics.DrawProceduralIndirect` does a batched draw call...

**That IS a TL;DR. It is already written, in the right place, doing the right job — it just is not
marked as one.** This is the strongest find in the whole analysis: the category does not need new
writing, it needs the existing paragraph wrapped.

**Worth checking against the earlier measurement:** the count said "TL;DR appears 0 times", which
was true as a *front-matter field* and as a labelled device. It missed that the pattern exists in
prose. The device is less speculative than the count implied.

---

## 2. Warning — pink, tape D (diagonal corners) — the twitching bug

Line 73: *"A very important part I added with smoothing the return of the grass in the shader.
Before this fix the grass looked like this:"* followed by `GrassTwitchingIssue.mp4`.

**This is a gotcha with a video of the failure attached** — do this or your grass twitches. It is
the loudest thing in the post and it currently reads as an ordinary paragraph. Tape D is the
loudest placement, which matches.

A second, weaker candidate from the same family, general enough to be worth writing rather than
extracting: *do not read from a `RWStructuredBuffer` you are also writing to in the same pass — it
compiles, and it gives a different answer on every vendor.* That one is not in the post yet.

---

## 3. Reference / links — no tape — the Cyanilux pointer

Line 152: *"For an example that does something similar but adds camera culling for a moving
character you can check out [Cyanilux](https://www.cyanilux.com/tutorials/gpu-instanced-grass-breakdown/)
which made a system just like that."*

**That is further reading, buried mid-paragraph**, where a reader who wants it has to find it and a
reader who does not has to read past it. It is exactly what the reference category is for, and
"no tape" suits it — end matter should be quiet.

**Note the ordering problem this exposes:** the link is useful *while* reading that section, not at
the end of the post. So "reference / links" may want to be an inline aside rather than end matter.
Worth a thought before it is built, because it changes where the component sits.

---

## 4. Note — green, tape A (top edge) — the road not taken

Line 155: *"Originally used a ping-pong to decay the render texture but that didn't give me the
control I wanted so I decided to go with this method which I don't think I've seen in anyone else's
grass shader implementation."*

**An aside about an approach he tried and rejected, plus a claim of novelty.** It interrupts the
technical flow and would read better set apart. Tape A is the quietest placement, which suits an
aside.

---

## 5. Quote — blue, tape C — **no honest home in this post, and that matters**

The strongest candidate is the second half of the sentence above: *"which I don't think I've seen in
anyone else's grass shader implementation."*

**But pulling it would duplicate a line the reader meets moments later, in a post with five
sections.** A pull quote is a rest in a long column; this post is not long enough to need one.

**So the quote category is the one to be sceptical about.** It is also the category that forced the
biggest compromise — L-corners need corners, so it gained a card, which contradicts both its
sources. **A device with no home in the best-developed post, that also had to be bent to exist, is
worth asking whether it should exist at all.** Not a recommendation to drop it; a flag that it is
the weakest of the five and Rod should decide with that in front of him.

---

## What this changes

- **TL;DR is the highest-value build.** The content is already written in 1 of 19 posts and the
  pattern will recur.
- **Warning is second** — one clear instance plus an obvious general case.
- **Note and reference each have exactly one instance here**, which is enough to justify them but
  not enough to prove the shape. Re-check against a second post before locking their design.
- **Quote has none.** Build it last, or ask first.
- **The earlier "all five appear zero times" framing was too blunt.** It counted labelled devices
  and front-matter fields. Three of the five already exist as *unmarked prose patterns*, which is a
  materially different situation: the writing is there, the marking is not.
