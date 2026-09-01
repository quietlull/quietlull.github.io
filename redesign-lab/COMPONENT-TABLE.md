# Component table — what has to be built, and what decided it

Built 2026-08-23 from Rod's picks on `text-decisions.html`.
**The goal this serves (Rod):** *"work until you finish spreading all my decisions to the final
pages and created 2-3 real version to replace the blockout version in extracted components for me
to review. Until you do this keep the final pages clean and we can add everything together."*

**So: the final pages stay CLEAN.** Real versions land in `extracted/components/` for review first;
nothing goes onto a `final-*` page until Rod picks a version. The only thing already spread to the
pages is `decisions.css`, which is type and colour only — no new components.

**Portal is excluded** — another agent is on it (Rod, 2026-08-23).

---

## Legend

- **Decided** — Rod has picked the treatment; the build target is unambiguous.
- **Source** — CONFIRMED means the CSS was read from the live site and saved in `sources/`.
- **State** — `greybox` = only a blockout exists. `real` = a usable component exists.
- **Versions** — how many real variants to build for review.

---

## A. BUILT 2026-08-23 — 8 components, 3 versions each

**Batch review page: [`component-review.html`](component-review.html).** Per-component demos and
provenance sit in each `extracted/components/<name>/` folder.

**The multi-agent run died on a session limit**, not a code fault — 8 craft agents failed at once
("session limit, resets 7:50am"). The **8 reference briefs had already completed**, so the
components were built from them directly. Briefs: [`analysis/reference-briefs/`](analysis/reference-briefs/).

| # | component | decided as | source | state | versions |
|---|---|---|---|---|---|
| A1 | **Callout family** (4 categories) | warning=tape D/pink · note=tape A/green · tldr=tape B/orange · quote=tape C/blue · reference=no tape | gneiss `.taped` CONFIRMED + winterwind tear CONFIRMED; placements ours | **3 BUILT** | 3 |
| A2 | **Code block + copy** | Maxime Heckel header strip, **squared** (D20) | `maximeheckel-prose.md` CONFIRMED | **3 BUILT** | 3 — **the open part is COLOURS** |
| A3 | **Figure + caption** | catlikecoding, no mat, **left-aligned** caption (remix) | `catlikecoding-prose.md` CONFIRMED | **3 BUILT** | 2 |
| A4 | **Table** | squared, H2-yellow header, scroll wrapper (remix) | `iquilezles-prose.md` + `acegikmo-prose.md` CONFIRMED | **3 BUILT** | 2 |
| A5 | **TOC** — rail + mobile popup | Starlight, one system | Starlight/astro CONFIRMED | **3 BUILT** | 3 |
| A6 | **Prev / next** | TheRealMJP split halves, no box | `bookofshaders-prose.md` sibling; TheRealMJP CONFIRMED | **3 BUILT** | 2 |
| A7 | **Heading anchor** | Maxime, appears on hover + `scroll-margin-top` | `maximeheckel-prose.md` CONFIRMED | **3 BUILT** | 2 |
| A8 | **Related post card** | **BUILT standalone** — the "minus three rules" spec was wrong, see the note | OURS, origin ROD. The parent's one external citation is **dead** (yannesidibe /about is 404) | **3 built** | 3 |
| A9 | **Meta chip — rectangle** | `.kit-button` **squared** | OURS + partly sourced — see the correction below | real-ish | 2 |

### Correction on `button-kit` (2026-08-23)

Rod: *"this isnt true we worked on that together its ok to use since we sourced it from multiple
other components."* **He is right and the earlier "filed Slop, no external source" was too broad.**
Read from the file's own header, the component is a MIX:

- **Genuinely sourced, external, verifiable:** the primary hover ripple (phojanecki,
  `codepen.io/phojanecki/pen/vwyZpY`), the outline/pill fill-sweep (nfranciosi →
  `sources/nfranciosi-button-fill.md`), and the magnetic behaviour (`sources/magnetic-buttons.md`).
- **Circular-cited:** only the SHAPES line — radius and padding — which points at
  `rework-stephan.html`, a file in this repo.

So the blanket warning at the top of that file overstates its own case, and I repeated it without
checking what it actually pointed at — the exact mistake the warning itself is about.

**What this means for the meta rectangle specifically:** we square it anyway (`border-radius: 8px`
→ `0`), so the only value actually inherited is `padding: 0.7rem 1.5rem`. **Offer:** stephanewillems'
live CSS can be fetched and checked in a few minutes; if their real buttons carry that padding, the
shapes line stops being circular and the whole component is clean. Worth doing once rather than
carrying the caveat forever.

## B. Already real — no build, verify only

| # | component | why it is done |
|---|---|---|
| B1 | **Takeaway stamp** | Rod's own CSS, perforated edge. The one callout with a legitimate attribution. |
| B2 | **Tag badge (squares)** | The live site's own `.post-tag`, squared. OURS, carried forward on Rod's instruction. |
| B3 | **Washi tape** | Case D locked, border deleted, opaque, axis-aligned. Four placements, all built. |
| B4 | **Section head (h2/h3)** | Case G — catlike counters on acegikmo's rule. Live in `decisions.css`. |
| B5 | **Type system** | Ladder, colours, links, inline code, emphasis, lists, sup/sub/abbr. All in `decisions.css`. |

## C. WAS "blocked, no source" — two of the three were MIS-FILED

**Both C1 and C3 had sources all along**, in files already saved and marked CONFIRMED. Neither was
blocked on provenance; they were blocked on a mis-read. Corrected below and both are now built.

| # | component | what it needs |
|---|---|---|
| ~~C1~~ | **Post header** | **BUILT 2026-08-23, 3 versions.** *Mis-filed:* "the bench bundles title+meta" is a fact about the BENCH FILE, not the source. stripe's `.sidebar`/`.metaDataItem` cover the split and were already saved and CONFIRMED. |
| C2 | **Reading progress bar** | **CUT by Rod 2026-08-23** ("lets just remove it... either way its broken"). It lives in `_javascript/`, which D22 blocks until the port, so the deletion is a **port-time task**. No component needed. |
| ~~C3~~ | **Image zoom** | **BUILT 2026-08-23, 3 versions.** *Mis-filed:* the figure brief had already noted stripe carried a zoom affordance, and it does — `.imageExpandButton` + `.imageExpandIcon`, complete and verified, sitting in a source we already had. **Scope honest: the affordance only. The overlay is NOT sourced and is not built.** |

## D. Not this session

| # | item | why |
|---|---|---|
| D1 | **Portal** | Another agent is on it. |
| D2 | **H0 / site mark** | Being replaced by the line boil, which is blocked on Rod's three scratch fonts. |
| D3 | **Post h1→h3 heading skip** | A WCAG 1.3.1 failure. Fix is a **markup** change on `final-post.html`, not a component. |

---

## Carried constraints — every build below has to satisfy these

1. **Provenance law.** Every element derives from a real snippet, tiered True / Remixed / Slop, idea
   origin tracked. No source? Ask. A CSS header claiming a parent is a *claim* — check what it
   points at, and if it points inside this repo the chain never left the building.
2. **Square by default.** Round only by exception. This bites A2, A4 and A9 specifically.
3. **Palette law.** No red, no cool accent outside the sky, and `--color-muted` (`#9aa3bd`) is the
   last blue in any text token — do not reach for it.
4. **The scene is behind everything.** Any solid fill, blur or shadow competes with it. Blur is the
   glass tell and is being stripped site-wide.
5. **Anti-bloat (D5).** Fewer lines and readability win. Caches, guards and helper extractions for
   micro-savings are bloat.
6. **Reduced motion.** D21 requires a path; the scene still has none, so components must not add to
   that debt.
7. **The final pages stay clean** until Rod picks a version.
