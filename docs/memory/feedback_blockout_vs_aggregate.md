---
name: feedback-blockout-vs-aggregate
description: Blockouts are UNIFORM MONOCHROME greybox (geometry only); the aggregate is the bench-component build that uses the SET COLORS. Never conflate them.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d1d0c775-c102-4c14-b21e-98f9e13d1b9f
  modified: 2026-08-16T13:54:58.156Z
---

# Blockout vs aggregate: two different artifacts (Rod, 2026-08-16)

> **The full procedure now lives in the repo at `docs/PAGE-PROCESS.md`** and is linked from
> `CLAUDE.md`, so every agent inherits it instead of Rod re-explaining it per page. Read that
> first; this note is the short version of why it exists.

**BLOCKOUT = uniform monochrome greybox.** Geometry only, one grey language, NO colour, no real
type treatment, no accents. Exactly what `redesign-lab/landing-blockout.html` already does, and
what repo docs [[DECISIONS D8]] already said. Its job is to let Rod judge LAYOUT with nothing else
competing for his eye.

**AGGREGATE = the assembled page built from workbench components, using the SET COLORS.** This is
where the real palette, real type and real components go. `new-landing.html` / `a3-assembly.html`
are the aggregates.

**Why:** Rod rejected a set of "blockouts" I made 2026-08-16 (post/projects/about/ramblings/resume/
portal `-tests.html`) because they were styled pages with gold accents and real type. Colour in a
blockout smuggles taste into a layout decision, which is the same failure as an earlier attempt
that "smuggled each site's colour into the greybox and broke comparability" (CHANGELOG 2026-08-12).
I had the rule in the repo docs and still broke it.

**How to apply:**
- Building a BLOCKOUT? One grey. No gold, no accent, no palette variable. Geometry and spacing only.
- Building an AGGREGATE? Bench components + the set colours.
- Do not ship a hybrid and call it either one.
- **STAGE CHECK (Rod, 2026-08-16): the sub-pages START at BLOCKOUT stage**, not aggregate. The
  landing is the surface that is further along, not these.
- **But the gate is COMPONENT COVERAGE, not ceremony (Rod, same day):** if a page type is not
  missing components, or most of it can be built from what the bench already has, then build the
  AGGREGATE as well, using a greybox **placeholder** for each missing layout component (D9's
  placeholder rule at page level - reuse the blockout's greybox box, reserve the real spacing).
  So: run the coverage check first, then decide. Say explicitly which slots are real components and
  which are placeholders when handing it over.

## The other half of the same correction

Rod also rejected that batch for **finishing far too fast, which meant no analysis happened**. What
was missing, and is required BEFORE building any blockout:

1. **What Rod actually needs** on that page type (the content slots, from the frozen section spec).
2. **What already exists** — the current `_layouts/`, and which bench components already cover it.
3. **What other sites do for that layout**, read from source, and *how we can copy it*.
4. **At least FOUR real reference sites per page type**, portal included. One or two is not a
   sample, it is a guess wearing a citation, and it **breaks the provenance law** ([[project-code-provenance]]).

Speed here is a symptom, not a virtue: if a page type took minutes, the analysis did not happen.
See [[feedback-design-generation-mishap]] — multi-agent work is for parallel EXTRACTION, never
generation.
