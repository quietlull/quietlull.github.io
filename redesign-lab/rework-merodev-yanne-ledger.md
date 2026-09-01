# Rework ledger — `rework-merodev-yanne.html` (as-built)

Per the **Code Provenance Contract** (`memory: project_code_provenance.md`) and the canonical ledger (`element-tracker.md`). Tracks the **as-built elements in this one rework file** as *source candidates* feeding the canonical by-surface ledger. Same columns as `rework-hana-ledger.md`.

- **Tier:** `True` (verbatim from a real source, cited) / `Remixed` (True code changed or combined — cite parents + what changed) / `Slop` (free-handed by me, no source — not shippable).
- **Idea:** `mine` (Rod) / `theirs` (a reference) / `claude` (my invention — a debt).
- **Source:** URL / snippet / `—` until proven.

**THEME OF THIS REWORK (Rod 2026-06-09):** the MOST code-heavy, blocky, technological design — terminal/HUD, corner brackets/reticles, monospace, sharp rectangles. It currently HITS that mark; keep it. Every snippet hunted for this page must match that character (NOT soft/rounded/organic). Palette swap purple+lime -> amber still owed, but the blocky/tech CHARACTER is the keeper.

**Rod's calls this session (2026-06-09):** the **cursor glow** (`.cursorglow`) and the **glow reveal** (`.glow` dual-layer) are NOT slop — Rod found their references (brittanychiang / yannesidibe) himself. Everything else = `Slop`. **Hunt workflow:** web-hunt per element; Rod copy-pastes CodePens I can't reach.

---

## Top bar
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Name + role block | Slop | mine | — | Rod's identity; mono styling free-handed |
| Framed "WORKS" (center) | Slop | theirs | — | lead: merodev centered framed label |
| Bracketed "EXIT" (`.brk` reticle) | Slop | theirs | — | lead: merodev bracketed EXIT; corner-reticle free-handed |

## Hero
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Kinetic ring (spinning multilingual `textPath`) | Remixed | theirs | ref-yannesidibe.html (in-repo capture) | traced 2026-06-09: near-identical to the in-repo yannesidibe capture (same SVG path, same greeting, same 26s spin). CHANGED: size 70->62vmin, font IBM Plex Mono->Space Mono, 15->14px. NOT free-handed slop. -> True once ref-yannesidibe.html itself is verified faithful vs real yannesidibe.com. |
| Center kicker + name `h1` | Slop | mine | — | lead: yannesidibe hero center; name is Rod's, styling free-handed |

## Buttons & tags
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Primary / outline buttons (corner-bracket) | Remixed | theirs | sources/ashlook-scifi-button.md (codepen.io/Ashlook/pen/YzQQwdo) | Ashlook sci-fi button, pasted by Rod 2026-06-09. Mechanic kept verbatim (4 corner divs = full border at rest -> contract to corner brackets on hover + radial `:active` flash). CHANGED: font Verdana->Space Mono, dropped material box-shadow, recolored (`--color` HSL: lime 68 100% 67% / purple2 255 100% 74%). Replaced the old `.brk`/`.c` span brackets on these buttons. NOTE: lime/purple still merodev palette -> amber later. |
| Inline text-link | Slop | theirs | — | free-handed; lead: generic underline |
| Tags (`[ ]` bracketed mono) | Slop | theirs | — | lead: merodev bracket convention; free-handed |

## Project cards
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Card panel (merodev clean rect) | Slop | theirs | — | lead: merodev card layout via inventory; free-handed |
| Bracket reveal (`.pcard .bg`) | Slop | theirs | — | INTENDED LOOK (Rod 2026-06-09): corner brackets ONLY, HIDDEN until the cursor reaches the card, then revealed (radial-mask at `--mx/--my`). Behavior restored (reverted my border-glow detour — that was wrong). Stays Slop until the radial-mask-reveal technique is sourced; shares the cursor-lantern `--mx/--my` (candidate provenance = same yannesidibe/cursor-reveal family). CARD-LANGUAGE: brackets = PROJECT cards; rounded `.glow` = ABOUT cards. |
| Card image fill (gradient placeholder) | Slop | claude | — | **debt** — my gradient placeholder; Rod's standing call (hana) = SOLID BLACK. Correction owed |
| Title / VIEW LIVE / sub meta | Slop | theirs | — | lead: merodev caption row; free-handed |

## List controls
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Terminal search (`>` prompt + caret) | Slop (box) / Remixed (caret) | mine (concept) / theirs (caret) | sources/109ichiki-caret.md (109ichiki.com) | CARET swapped to 109ichiki `::after content:"_"` step-start blink (renamed scoped classes, recolored lime) -> Remixed. Input BOX styling + real-typeable behavior still Slop (Rod's concept; needs source). Same caret is a 1:1 source for the top-bar "WORKS" heading caret. |
| Filters (`[ ]` bracketed) | Slop | theirs | — | lead: bracket convention; active = lime. Free-handed |
| Empty state (dashed border) | Slop | theirs | — | lead: PatternFly structure; free-handed. (Rod kept dashed in hana) |

## Post block
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Post header (`.ph` h1 + meta rule) | Slop | theirs | — | mono-brutalist; free-handed. WATCH `.ph` collision (renamed to `.phead` in hana) |
| TL;DR block (callout) | Slop | theirs | — | the BLOCK is free-handed callout; its `.glow` reveal = the approved Remixed (Ambient row) |
| Prose (h2 `//` / p / ul `>` / inline code) | Slop | mine | — | readability; free-handed |
| Blockquote | Slop | theirs | — | lead: callout family; free-handed |
| Code block (`copy` + token spans, no traffic lights) | Slop | theirs | — | lead: terminal codepens; "no traffic lights" per Rod; free-handed |
| Takeaway block (callout) | Slop | theirs | — | BLOCK free-handed; rides approved `.glow` reveal |

## About
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Bio cards (spotlight `.glow`) | Slop | theirs | — | the CARD is free-handed; the hover-reveal `.glow` = approved Remixed. lead: yannesidibe bio |
| Stats numbers (hollow `text-stroke`) | Slop | theirs | — | **correction owed** — Rod rejected hollow yannesidibe stroke (wants SOLID amber serif) |
| Trophy tiles (`[ ]` bracketed, locked) | Slop | mine | — | Rod: keep bordered-tile row; bracket styling theirs |
| Status line (dot + "currently studying") | Slop | theirs | — | lead: adevade pulse ring (here just a static dot); free-handed |

## Bottom / footer
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Corner toggles (HQ / Sound / Light[soon]) | Slop | theirs | — | lead: merodev corner toggles; plain checkboxes free-handed. (Final toggles = YarivFrd slap toggle, see hana) |
| Footer (centered mono, social) | Slop | theirs | — | lead: merodev bottom social bar; free-handed |

## Ambient / cross-cutting
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| **Cursor glow (`.cursorglow` vignette)** | **Remixed** | theirs | brittanychiang.com (#about cursor glow) | ✅ Rod-authorized not-slop. Big radial `at var(--cx) var(--cy)` fixed overlay following pointer; recolored to purple. Rod's synthesis = "cursor-as-lantern." VERBATIM source-diff not yet pinned (well-known pattern) |
| **Glow reveal (`.glow` dual-layer)** | **Remixed** | theirs | yannesidibe.com/about (spotlight border) | ✅ Rod-authorized not-slop. `::before`/`::after` radial gradients masked with `mask-composite:exclude` (xor border), positioned at per-element `--mx/--my`; white specular core + purple falloff. Recolored; applied to cards+bio+tldr+takeaway. Verbatim diff not yet pinned |
| Top vignette (`.glow-top`) | Slop | claude | — | **debt** — my decorative purple top-radial; no source |
| Corner-bracket reticle (`.brk`) | Slop | theirs | — | lead: merodev reticle; free-handed |
| Cursor-tracking JS (inline) | Remixed | theirs | (drives the two approved glows) | inline reimplementation, NOT the shared `cursor-lantern.js` (`.spot-host`). Dedup later: one shared module |
| Palette (purple `#6d4bff` / lime `#e8ff59`) | Slop | theirs | — | merodev/yanne palette — REPLACE with Rod's twilight amber |
| BG Three.js scene + toggle | True (scene) / Slop (toggle) | mine (scene) / claude (toggle) | /assets/js/dist/three-background-scene.min.js | scene bundle = Rod's real True code; show/hide toggle wiring (`#bgToggle` pill, `scene-off` body class, `?scene=1`) = my claude wrapper, matches harumaki/hana. Added 2026-06-09. |

---

## This rework's metric
- ~26 elements tracked.
- **Remixed (real source): 3** — cursor glow (brittanychiang), glow reveal (yannesidibe), the inline JS that drives them. (Rod-authorized; verbatim source-diffs still owed.)
- **Slop: ~23** (the re-sourcing worklist).
- **Idea = `claude`: 2** (top vignette, card gradient placeholder) ≈ **~8%** — under the 25% guardrail.
- **Corrections owed:** card image -> solid black; stats numbers -> solid amber (not hollow stroke); palette -> amber; corner toggles -> slap toggle.
- **RESOLVED (Rod 2026-06-09):** `.pcard .bg` -> refactor onto the real `.glow` engine (squared + bracket = project; rounded = about). Keepers Idea = `theirs` confirmed.
- **DONE 2026-06-09:** brackets = bracket-only, hidden-until-cursor (per Rod; reverted the border-glow detour). Added Three.js bg scene toggle (harumaki/hana pattern).
- **REFERENCE HUNT (2026-06-09):** 5 candidates per remaining slop element compiled in `merodev-yanne-refhunt.md`. Awaiting Rod's picks; on pick -> save to `sources/`, adapt, log Remixed here.
