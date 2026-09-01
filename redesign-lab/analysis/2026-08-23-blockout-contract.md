# The blockout contract — MEASURED, not guessed

Rod, 2026-08-23: *"double check if the elements match the blackouts... the new components must match
the spacing and layout of the previous approved blockouts... no guessing real measurements on the
gallery pages."*

Every number below was read off the rendered blockout at **viewport 1440**, via
`getBoundingClientRect()` and computed styles. Nothing here is from a label, a comment or a memory —
**and that distinction turned out to matter** (see the first finding).

---

## POST — `post-blockout.html?v=stripe`

| slot | measured | margins |
|---|---|---|
| H1 title | **1398 × 100** | — |
| Hero media (16:9) | **711 × 394** | mb 14 |
| In-body figure | **711 × 394** | mb 14 |
| Code block | **711 × 200** | **mt 24**, mb 14 |
| Prev / next | **345 × 44** each | — |

## PROJECTS — `projects-blockout.html`

| slot | measured |
|---|---|
| Page title | **930 × 44** |
| Description (2 lines) | **930 × 50** |
| Search | **400 × 34** (200×34 inner) |
| Empty state | **930 × 60** |
| Panel / grid | 1000 wide, 3 × 300 cells, 20px gaps *(from the earlier build pass)* |

## ABOUT — `about-blockout.html`

| slot | measured |
|---|---|
| Status chip | **100 × 20** |
| Locked / empty state | **641 × 40** |
| Portrait | **191 × 200** (in a 225px rail) |
| Socials | **191 × 120** |

## RAMBLINGS — `ramblings-blockout.html`

| slot | measured | count |
|---|---|---|
| Entry blurb (2 lines) | **1054 × 45** | ×8 |
| Entry title | **838 × 30** | ×8 |
| Search | **1351 × 40** | 1 |
| Empty state | **1351 × 60** | 1 |
| Page description | **520 × 44** | 1 |
| Page title | **380 × 100**, centred | 1 |

## LANDING — `landing-blockout.html`

| slot | measured | count |
|---|---|---|
| Skill tile | **150 × 150** | ×8 |
| Project card | **684 × 179** | ×4 |
| Skills header | **1421 × 72** | |
| Projects header | **1421 × 64** | |
| Skill flipper | **1421 × 120** | |
| Demo reel band | **1421 × 540**, with a **960 × 540** 16:9 player | |
| Scene bottom | **1421 × 720** | |
| Hero | **1349 × 515** | |

---

# FOUR MISMATCHES FOUND

## 1. The blockout's own labels disagree with the blockout's own rendering

The post blockout **labels** its content column `701 wide` and `701x394 — 12 cols`. It **renders at
711**. A 10px gap between the annotation and the geometry, inside one file.

**The rendered value wins** — it is what Rod approved by eye. But the labels should be corrected so
the next reader is not measuring against a number the page itself does not honour.

## 2. THE BIG ONE — the post's content column: blockout **711**, final-post **767**

`final-post.html` renders `.prose` at **767px** (94ch × 8.16px, locked by Rod in P33). The blockout
reserves **711**.

**RESOLVED 2026-08-23 by Rod: 767 IS CORRECT.** *"indeed its the 94 character one that's correct."*

So **the blockout is 56px out of date**, not the page. Components size to **767**, and the
blockout's `701` label / `711` render are both stale on this number.

He also set a standing rule in the same breath: *"please always just assume the later decision is
correct when possible it doesn't hurt to check though."* P33 locked 94 characters *after* the
blockout was drawn, and P31 later widened the article so header and article end together on his red
line - two later calls against one earlier drawing. **Default to the later decision and keep
building; raise the conflict, do not stall on it.**

**Everything downstream inherits this.** Code block, figure, callouts and prev/next all size off the
content column, so they cannot be "matched to the blockout" until this is settled.

## 3. The callout renders **2× its reserved height**

`final-post.html` reserves **767 × 80** for a callout (its comment cites a measured 625 × 76
footprint). The built callout renders **659 × 158** in its demo.

Two separate causes, and only one is a fault:
- **Width 659 is correct** — the tape overhang math `calc(100% - 2 × (26 − 7))` deliberately insets
  the box so the tape can overhang. 767 stage − 68 padding − 38 overhang = 661. Working as designed.
- **Height 158 vs 80 is a real overrun.** The demo callout carries a label plus two lines of copy;
  the reservation was drawn for a shorter block. **Either the reservation is too small for real
  copy, or the callout must lose the label.** Rod's call, but the contract currently says 80.

## 4. Prev / next: blockout reserves **345 × 44** each; the build is a 50% flex

TheRealMJP's own rule is `flex-basis: 50%; flex-grow: 1`, which at a 711 column gives ~350 and at
767 gives ~380. **Neither is 345.** The source's proportional rule and the blockout's fixed pixel
reservation are different specifications of the same thing.

345 × 2 = 690, which is neither 711 nor 767 — so the blockout's own prev/next does not fill its own
content column either.

---

# What this means for the build

**Mismatch 2 is SETTLED: the content column is 767.** Every component sizes off that, and the
`post-blockout` labels (`701`) and render (`711`) are stale. The remaining live mismatch is #3, the
callout height.

**The blockout stays as-is on disk** rather than being edited - it is an approved artefact and Rod
keeps provenance copies. This file is the correction layer; read it alongside the blockout, not
instead of it.

**The components keep their provenance copies either way** — Rod said a copy may be kept for
provenance, so nothing built is discarded, only re-fitted.
