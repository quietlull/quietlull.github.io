# rework-harumaki (harumaki) — AS-BUILT ledger

**Per-rework ledger for `rework-harumaki.html`** (sibling to `rework-hana-ledger.md`). Follows the Code Provenance Contract in `element-tracker.md` (memory: `project_code_provenance.md`). These rows are **source candidates**; when an element is chosen for the final site and proven, its row is promoted into the by-surface sections of `element-tracker.md`.

**Columns:** Tier = `True` (verbatim source) / `Remixed` (True code changed/combined) / `Slop` (fabricated). Idea = `mine` (Rod) / `theirs` (reference) / `claude` (my invention = debt). Source = URL/`ref-*.html`/`file:line`, else `—` with `lead:` in notes.

**TRUST RESET applies:** every element is `Slop` until re-proven, regardless of how it was built this session. One genuine exception (the Three.js bundle) noted below.

---

## Chrome / global
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| Hand-drawn Caveat logo + glow | Slop | theirs | — | lead: `ref-harumaki.html` hand-lettered logo |
| Logo glow halo | Slop | mine | — | Rod-ACCEPTED (keep); has on/off toggle for testing. |
| Tagline copy | Slop | mine | — | Rod's voice |
| Top-left Menu (hamburger) | Slop | theirs | — | lead: harumaki menu |
| Right social rail (dots) | Slop | theirs | — | lead: harumaki rail (real uses text labels) |
| **Three.js scene bg (the bundle)** | **True** | **mine** | `/assets/js/dist/three-background-scene.min.js` | Rod's REAL about-scene bundle, loaded verbatim. Only genuinely-True code here. |
| BG · Scene toggle (the wrapper) | Slop | claude | — | the show/hide toggle around the bundle is my code |
| Gooey liquid toggle (breathe/sparkler/fireworks) | Remixed | theirs | codepen.io/nicolasjesenberger/pen/xxmbvxL | ✅ goo-filter liquid flows through a center notch between `[word\|Off]`. Gemini-finalized from the nicolasjesenberger source, recolored amber-on-night. NOTE: `#goo` filter id is GLOBAL — one defs block per page; rename if surfaces combine. Also renamed the toggle SVG class `.frame`->`.gframe` to avoid harumaki's card frame-draw `.frame{z-index:4}` overpainting the labels. |
| Footer (Caveat centered) | Slop | theirs | — | lead: harumaki footer line |

## Hero / section
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| ~tilde~ section headers | Slop | theirs | — | lead: `ref-harumaki.html` ~tilde~ Caveat headers |
| Mono section number prefix | Slop | mine | — | Rod-ACCEPTED (keep): plain-text section labels |
| Bento grid (varied spans) | Slop | mine | — | Rod chose over orbs; layout lead: 109ichiki grid |

## Buttons / tags / links
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| Primary button (filled + glow) | Slop | theirs? | — | lead: glow-ignite (phojanecki `vwyZpY`) per canonical |
| Outline button (square, fill-sweep) | Slop | theirs | — | lead: codepen seadox `zYqxVjy`, davekilljoy `AqLQRL` |
| Pill button (rounded, fill-sweep) | Slop | mine | — | Rod: "side fill like Read more"; rejected shine (Jansbury `ooggpO`) |
| Inline link (underline-draw) | Slop | theirs? | — | lead: norikura underline + arrow |
| Tags (hover transparent fill / solid active) | Slop | mine | — | Rod's call (pagination model) |

## Cards — 4 modes (toggle cycles Merged -> Flip -> Hana -> Old; `?mode=` for capture)
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| **MERGED card (default)** — live-site card content + flip-tile look + parallax z-layers + dwell-flip + gyro | Remixed | mine | `card-isolated.html` (live site, verbatim) + `flip-tile-bundle.html` (Rod CodePen) | ✅ FIXED 2026-06-11: markup was UNBALANCED (cards 1-2 missing `</div>`×2 closing body+front before `.card-back`; parser emptied the `.card-link` and displaced `.card-front` a full card-height down, spilling onto the reel band). Rebalanced + indented. `.card-title` collision with hana-cards CSS fixed by scoping (`.cards .card-title` / `.post-card .card-title` — hana's `text-align:center` was leaking in). The merge concept = Rod's direction; v2 build = other agent. CHANGED vs parents: z-layer parallax, glass-plane, dwell-flip, odd/even hue. **PORTABLE COPY kept: `merged-card-bundle.html`** (self-contained source for other layouts, full provenance header). |
| Merged grid = BENTO | Remixed | theirs | flip-tile bundle grid (Rod CodePen) | ✅ 2026-06-11: was uniform 3-col (not harumaki); now reuses the flip-tile 6/12-col grid + `data-column-span`/`data-row-span` rules already in the file. Arrangement mirrors the tile-layout's own (Compute Grass = big span-6 row-2 cell, `--img-h:600px` so the tall image fills it; ZZZ + 2D Physics span-6 right). |
| Bento flip-tile grid (cover + body + 3D flip to backface) | Remixed | theirs | Rod-provided CodePen flip-tile (`:has(:checked)` rotateY) | ✅ recolored to harumaki; replaces old shell + thumb + meta + hover-learn in one. |
| Tile cover (warm gradient placeholder) | Slop | claude | — | placeholder; real = project media |
| Pin badge | Slop | mine? | — | lead: Rod's corner-ribbon snippet |
| Key-learning (now flip backface / merged card-back) | Remixed | mine+theirs | (flip-tile) | Rod's concept, now lives on the flip backface |
| frame-draw border | — | theirs | — | DROPPED from bento (flip-tile is rounded); still available for other surfaces |

## List controls
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| Search (segtag pill, two-part) | Slop | mine | — | rework-harumaki variant. lead: codepen designcouch `vYYByYY`, chamsi `LavooJ`. NOTE: canonical search spec differs (square, `//` prefix, blinking caret, no animation) — reconcile when promoting. |
| Filter pills (hover fill / solid active) | Slop | mine | — | Rod's call (pagination model) |
| Empty state (dashed border) | Slop | claude | — | DEBT: my dashed-border version; canonical lead: PatternFly (NO dashed) |
| Pagination (connected bar, square, no border) | Slop | mine | — | Rod's exact calls; lead: harumaki pagination bar |
| Reel band (full-bleed) | Slop | theirs | — | lead: harumaki SERIES band |

## Post
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| Post header | Slop | theirs? | — | lead: norikura serif + slash |
| TL;DR block | Remixed | theirs | Rod-provided stamp CSS (radial-gradient dot cutout) | ✅ STAMP callout (perforated dot edge), recolored amber-on-night |
| Takeaway block | Remixed | theirs | Rod-provided stamp CSS | ✅ shares the STAMP rule with TL;DR |
| Blockquote (Caveat) | Slop | theirs? | — | lead: callout / harumaki Caveat |
| Code block + copy | Slop | theirs? | — | lead: terminal frame, no traffic lights; candidate: TheOnlyZac rounded-terminal |

## About
| Element | Tier | Idea | Source | Note |
|---|---|---|---|---|
| Bio cards | Slop | theirs? | — | lead: yannesidibe hover-reveal glow |
| Stats — numbers | Slop | mine | — | Rod: solid amber serif |
| Trophies / badge grid | Slop | mine? | — | Rod: bordered tile row, locked/unlocked states |
| "Currently studying…" ✦ star status | Remixed | theirs | codepen.io/rezapirighadim/details/JjQvVWy | ✅ Rod-provided dot-pulse ping (scale->fade) applied to the kept ✦ star shape |
| Tools line | Slop | mine | — | Rod's content |

---

## ROLLUP (rework-harumaki)
- ~40 elements. **Tier: True 1 / Remixed 8 / Slop ~30.** True = Three.js bundle. Remixed: ✦ star ping (rezapirighadim), TL;DR + Takeaway STAMP (Rod-provided), GOOEY liquid toggle (nicolasjesenberger, Gemini-finalized), FLIP-TILE bento + flip-backface key-learning (Rod-provided), MERGED card (card-isolated × flip-tile, fixed + bento'd 2026-06-11, portable copy = `merged-card-bundle.html`). Font LOCKED: M PLUS Rounded 1c + Caveat.
- **Idea = `claude`: ~2 remaining debts** (tile cover placeholder, empty state). RESOLVED by Rod-acceptance: logo halo, mono section number. REPLACED by flip-tile: bento thumb + meta. Well under the 25% guardrail.
- Everything else is `mine` (Rod's calls) or `theirs?` (reference lead, code still needs re-proving).
