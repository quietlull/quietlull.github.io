# Rework ledger — `rework-stephan.html` (as-built)

Per the **Code Provenance Contract** (`memory: project_code_provenance.md`) and the canonical ledger (`element-tracker.md`). Tracks the as-built elements in this one rework as *source candidates* feeding the canonical by-surface ledger. Same columns as `rework-hana-ledger.md`.

- **Tier:** `True` (verbatim from a real source, cited) / `Remixed` (True code changed or combined — cite parents + what changed) / `Slop` (free-handed by me, no source — not shippable).
- **Idea:** `mine` (Rod) / `theirs` (a reference) / `claude` (my invention — a debt).
- **Source:** URL / file / `—` until proven.

Reference source for this design: `ref-stephanewillems.html` + `ref-stephanewillems-skin.html` (recreations of **stephanewillems.be/skills**). Rod's note (2026-06-09): "the icon animations are NOT slop; everything else likely is."

---

## Top bar
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Cursive logo write-in (clip-path wipe) | True | theirs | stephanewillems.be (via `ref-stephanewillems.html` .logo) | Sacramento + `clip-path:inset(0 100% 0 0)`->`0` `@keyframes write`. Copied faithfully from ref. |
| Centered pill nav (active pill) | Slop | theirs | — | lead: stephanewillems centered pill nav; rework CSS is free-handed approximation (border-radius:999px pill, `.on` border). Re-source from ref. |
| Social dots | Slop | theirs? | — | 13px round dots -> gold on hover. Free-handed; placeholder (no real glyphs/links). |

## Hero
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Hero (h1 + gold accent word + sub) | Slop | mine? | — | "Technical art, made clean." Copy is Rod-voice-ish; layout/styling free-handed. |

## Buttons & tags
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Primary / outline / pill buttons (solid rounded) | Slop | claude | — | **debt** — plain rounded buttons, no sourced interaction (cf. hana's phojanecki ripple which IS sourced). Re-source. |
| Inline text link (underline grow) | Slop | theirs? | — | border-bottom transparent->gold. Free-handed; lead: norikura underline. |
| Tags (soft filled chip) | Slop | claude | — | **debt** — filled `rgba` chip, no sourced hover. Re-source. |

## Skills (the sourced core)
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Draw-in icon animation system | True | theirs | stephanewillems.be/skills (via `ref-stephanewillems.html`) | `pathLength=1` + `stroke-dasharray/dashoffset:1` + `@keyframes draw` (offset 1->0), staggered `--d`, label `@keyframes fade` delay `calc(--d + .8s)`, hover `scale(1.08)` + gold drop-shadow + stroke recolor. Faithful copy. (Ref is a recreation one level removed, but the technique is standard + verifiable.) |
| Icon SVG geometry (the 8 shapes) | Remixed | theirs | `ref-stephanewillems.html` paths | hand-approximated brand-logo paths from the ref (not verbatim from official sources). **CONTENT SLOP:** the skills are stephanewillems's WEB-DEV set (JS/React/Node/Vue/Mongo/Tailwind/PHP) — WRONG for Rod. Replace with Rod's real tools (HLSL/GLSL/Unity/Three.js/compute/RenderDoc/C#/Blender) using real/official SVGs (-> those become True). |
| Labeled Technology<->Personal toggle | Slop | theirs | — | rework's `.tsw` is a DEAD pure-CSS pill stub — no `<input>`, no JS, no second skill group. The REAL functional toggle (checkbox + group swap + redraw-on-switch JS) lives in `ref-stephanewillems.html`. Re-source the real one. |

## Project cards
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Card (rounded panel, thumb, hover-lift) | Slop | claude | — | **debt** — generic rounded card + translateY hover + gradient thumb. No sourced card language (cf. hana frame-draw, merodev reticle). Re-source from a chosen card ref. |
| Pinned badge | Slop | mine? | — | small gold rounded tag, top-right. Free-handed (NOT the hana corner-ribbon). lead: Rod's ribbon snippet. |

## List controls
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Search bar (soft rounded, static text) | Slop | mine | — | Rod's concept (search projects&tags); this version is a non-typeable static `<div>`. Re-source code (cf. hana's typeable `//` version). |
| Filter pills (solid gold active) | Slop | theirs? | — | rounded pills, active = solid gold fill. lead: glow-ignite active (not solid) per canonical. |
| Empty state (dashed border) | Slop | theirs? | — | heading + broaden-tag hint + browse-all link. lead: PatternFly structure. |

## Post block
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Post header (`.ph` h1 + meta rule) | Slop | theirs? | — | clean header; watch `.ph` collision (renamed `.phead` in hana). |
| TL;DR / Takeaway (callout family) | Slop | theirs? | — | lead: left-tint + faint glow callout; free-handed. |
| Prose (h2/p/ul/blockquote/inline code) | Slop | mine | — | readability priority; free-handed. |
| Code block (copy btn, no traffic lights) | Slop | theirs? | — | lead: terminal-window codepens; free-handed. |

## About
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Bio cards (rounded panels) | Slop | theirs? | — | lead: yannesidibe hover-reveal glow; this version is a plain panel. |
| Stats numbers (solid gold) | Slop | mine | — | Rod: solid amber numbers. Free-handed. |
| Trophy tiles (bordered, locked) | Slop | mine | — | Rod: bordered-tile row, lock state. Free-handed. |
| Status line (small dot) | Slop | theirs? | — | "currently studying" + dot. lead: adevade pulse-ring (this version is a static dot, not the pulse). |

## Footer
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Footer (centered links + copyright) | Slop | theirs? | — | lead: minimal centered footer. Free-handed. |

---

## This rework's metric
- ~22 elements tracked.
- **True (sourced, faithful): 2** — draw-in icon animation system, cursive logo write-in.
- **Remixed: 1** — icon SVG geometry (but content-wrong: needs Rod's real tools).
- **Slop: ~19** (the re-sourcing worklist).
- **Idea = `claude` (debts): ~3** (solid buttons, filled tags, generic rounded card) ~= **14%** — under the 25% guardrail, but this rework leans more `claude` than hana did because its buttons/cards/tags carry NO sourced interaction (hana's did). Stephan's real value to the final site = the **draw-in icons + logo write-in + the functional toggle** (once re-sourced). The rest is weaker than hana's versions.
