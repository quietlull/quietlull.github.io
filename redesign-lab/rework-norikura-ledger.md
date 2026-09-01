# rework-norikura — AS-BUILT ledger

**Per-rework ledger for the norikura direction** (`element-norikura.html` / `rework-norikura.html` / `ref-norikura.html` + `ref-norikura-skin.html`). Sibling to `rework-harumaki-ledger.md` / `rework-hana-ledger.md`. Follows the Code Provenance Contract in `element-tracker.md` (memory: `project_code_provenance.md`). Rows are **source candidates**; when an element is chosen for the final site and proven, its row promotes into the by-surface sections of `element-tracker.md`.

**Columns:** Tier = `True` (verbatim source) / `Remixed` (True changed/combined) / `Slop` (fabricated). Idea = `mine` (Rod) / `theirs` (reference) / `claude` (my invention = debt). Source = URL / `ref-*.html` / `file:line`, else `—` with `lead:` in notes.

**TRUST RESET applies:** every element `Slop` until re-proven. One genuine exception (the Three.js bundle) noted below.

**Norikura character / governing rule:** cool, elegant, **restraint** — single gold accent, UI holds still, the Three.js scene is the only motion. `[DERIVE]` items extend **norikura's OWN idiom** (the bordered gold pill `.stamp`/`.ticket` + hairline + mono meta), per Rod: derive only from norikura, never another theme. That keeps Idea=`theirs` (norikura) and the claude debt low.

---

## Chrome / global
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| **Three.js scene bg (the bundle)** | **True** | **mine** | `/assets/js/dist/three-background-scene.min.js` | Rod's REAL about-scene, loaded verbatim. Only genuinely-True code. Replaces norikura's CSS firework/lake. |
| Top nav (gold-underline links) | Remixed | theirs | suwako-hanabi.com `.gnavi` (layout.css) | scaleX hairline underline + border-right dividers, recolored #fff->gold. Built in rework-norikura. |
| Right vertical rail (writing-mode vertical) | Slop | theirs | — | lead: `ref-norikura.html` `.rail` [sig] |
| Bottom-right CTA pill | Slop | theirs | — | lead: `ref-norikura.html` `.ticket` [sig] — the bordered-gold-pill idiom DERIVE items extend |
| Footer | Remixed | theirs | sengokuhanabi.com `.footer` (style.css) | follow-us display + centered SNS row (scale-hover) + copyright. Recolored to night. Built in rework-norikura. |

## Hero / section
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| Big serif display title + soft glow | Slop | theirs | — | lead: `ref-norikura.html` `.hero .jp` |
| Mono subtitle (letter-spaced caps) | Slop | theirs | — | lead: `ref-norikura.html` `.en` |
| Date-stamp pill | Slop | theirs | — | lead: `ref-norikura.html` `.stamp` [sig] |
| Lede paragraph | Slop | theirs? | — | lead: `ref-norikura.html` `.lede` |
| Slash-label section header (`/ Program /`) | Slop | theirs | — | lead: `ref-norikura.html` `.program h2` [sig] |

## Buttons / tags / links
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| Buttons (.boxbutton) | Remixed | theirs | restaurant.nelu.osaka `.boxbutton` (main.css) | clip-path bevel + inset hairline `:before` + arrow + pure-CSS hoverRoll (their JS->CSS `:hover`). Recolored to gold. Built in rework-norikura. |
| Tags | Slop | theirs | — | DERIVE: norikura mono hairline chips (like card time-meta) |
| Inline link (underline + arrow) | Slop | theirs? | — | lead: norikura underline-draw + arrow |

## Cards
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| Program/project card (hairline panel + hover-LIFT + gold border) | Slop | theirs | — | lead: `ref-norikura.html` `.pcard`. KEEP hover-lift; NO frame-draw/ignite (that's hana — would break restraint) |
| Card image treatment (16/10 thumb) | Slop | theirs | — | structure theirs; production = real thumbnails |
| Card image PLACEHOLDER fill | Remixed | mine | rework-norikura `.card .thumb` | RESOLVED: now SOLID near-black #080b18 (Rod's call). claude radial debt removed. |
| Key-learning hover quote | Slop | mine | — | Rod's concept — re-source CODE only, keep the idea |

## List controls
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| Search bar | Slop | mine | — | Rod's spec: square, `//` prefix, blinking caret, no animation. DERIVE hairline from norikura. Reconcile w/ canonical search row. |
| Filter pills (active = gold fill) | Slop | theirs | — | DERIVE from norikura `.stamp` pill |
| Empty state | Slop | theirs? | — | DERIVE: norikura hairline + muted mono; canonical lead PatternFly (NO dashed border) |
| Ambient toggles (thin gold line + dot) | Slop | claude? | — | DEBT/derivation: norikura has no toggle; thin-line fits restraint but unproven. Canonical toggle lead = YarivFrd slap-toggle — reconcile. |

## Post (NOT YET swept)
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| Post kit (header/container/info) | Remixed | theirs | sengokuhanabi.com `.decision`+`.contact_wrap`+`.inner` (style.css) | Rod's pick: serif announcement card + serif info card (deco-rule underline) in centered container. Recolored to night panels. Built in rework-norikura. |
| TL;DR block | Slop | theirs? | — | DERIVE: hairline-left + serif/mono; canonical callout family |
| Blockquote | Slop | theirs? | — | DERIVE: gold hairline-left + serif italic |
| Code block + copy | Slop | theirs | — | **lead/PICK: shadcn code-snippet block** (shadcn.io/blocks/cta-card-inset-code-snippet-copy) — Rod's pick 2026-06-09. Adapt: dark navy, gold hairline, mono filename tab, gold copy, muted syntax w/ gold-only highlights. Re-prove (extract + match) before True. |
| Takeaway block | Slop | theirs? | — | DERIVE: hairline-left + serif/mono; canonical callout family |

## About
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| About block (slash-label + serif body) | Slop | theirs | — | lead: `ref-norikura.html` `.about` |
| Stats — numbers | Slop | mine | — | Rod: SOLID amber serif numbers + mono labels + hairline dividers. lead layout: Aceternity stats row (ui.aceternity.com/blocks/stats-sections). NO cross-theme borrow. |
| Trophies / badge grid | Slop | mine? | — | Rod: bordered/hairline tile row, locked/unlocked states. Leaning DERIVE (quiet hairline cells, gold unlocked / dim locked) over importing a kit. structure ref: Trophy UI (ui.trophy.so). |
| "Currently studying…" status line | Slop | theirs? | — | canonical lead: adevade live expanding-ring pulse (ember). Current ember-dot pulse = claude placeholder, to replace. |

---

## ROLLUP (rework-norikura)
- ~24 elements. **Tier: True 1 / Remixed 5 / Slop ~18.** True = Three.js bundle. Remixed (2026-06-11, built in rework-norikura): nav (suwako-hanabi), buttons (nelu.osaka), footer (sengoku), post kit (sengoku `.decision`/`.contact_wrap`/`.inner`), card placeholder (solid black).
- **Idea = `claude`: ~1** (ambient toggle thin-line `?`) ≈ **~4%** — card-placeholder claude debt RESOLVED (solid #080b18). Well under guardrail.
- Sources this session: suwako-hanabi.com (nav), restaurant.nelu.osaka (buttons), sengokuhanabi.com (footer + post kit). shadcn code block PICKED but not yet wired (rework uses the simple block).
- NEXT: optional polish — wire shadcn code block, real SNS svg icons in footer, single-article reading layout (Gagosian dropped). Stats/trophies/status fine for now.
