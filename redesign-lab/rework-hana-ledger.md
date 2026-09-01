# Rework ledger — `rework-hana.html` (as-built)

Per the **Code Provenance Contract** (`memory: project_code_provenance.md`) and the canonical ledger (`element-tracker.md`). This tracks the **as-built elements in this one rework file** as *source candidates* that feed the canonical by-surface ledger. Same columns.

- **Tier:** `True` (verbatim from a real source, cited) / `Remixed` (True code changed or combined — cite parents + what changed) / `Slop` (free-handed by me, no source — not shippable).
- **Idea:** `mine` (Rod) / `theirs` (a reference) / `claude` (my invention — a debt).
- **Source:** URL / snippet / `—` until proven.

Trust-reset default = `Slop`. Rows are `Remixed` only where Rod handed me the real source code **this session** (and I cite what I changed).

---

## Top bar
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Wordmark "lantern" | Slop | mine | ref-hana.html (Rod) | Rod: the wordmark treatment is in ref-hana.html. Type deferred to the font exploration; match treatment then. |
| Nav links (ignite-glow rollover) | Remixed | theirs | sources/hana-nav.md (hana.b-rave live) | Rod gave the full hana nav (HTML+CSS+JS). CHANGED: took the stacked drop-shadow ignite (transparent->colored, transition filter .125s cubic-bezier), recolored hana red rgba(255,26,0)->orange, dropped hana's 3840 --pv scaling. Per-letter `<span>` GSAP stagger = optional enhancement (config was cut off). |
| BG toggle (Bloom/Scene) | Slop | claude | — | **debt** — my lab utility for previewing the Three.js scene |
| Slap toggle (Breathing/Off) | Remixed | theirs | codepen.io/YarivFrd/pen/PEOJLj | Rod gave exact CSS+JS+HTML this session. CHANGED: recolored to `--glow`, scaled down, full-pill `border-radius:40px`, flip driven by JS `.on` class (the `:checked~.flap` sibling selector was unreliable on `display:none` radios) |
| Social chips (gh/in/@) | Remixed | theirs | codepen.io/phojanecki/pen/vwyZpY | ripple hover = phojanecki CSS Rod gave (recolored). The bordered-chip box + glyphs are free-handed (Slop part). Placeholder glyphs -> real SVGs later |

## Hero
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Kicker / title / subtitle | Remixed | theirs | ref-hana.html (Rod: mostly verbatim from hana) | Rod: this exists in ref-hana.html, most code taken directly from the site. TODO: faithful-diff our hero vs ref-hana.html -> promote to True. Font choice deferred. |

## Buttons & tags
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Primary button (glow ripple) | Remixed | theirs | codepen.io/phojanecki/pen/vwyZpY | phojanecki `outline-offset` ripple + glow Rod gave (recolored, applied to filled amber). Removed the underline `::after` (read as a black bar on a filled button) |
| Outline button (fill-sweep) | Remixed | theirs | codepen.io/nfranciosi/pen/eGRKON -> sources/nfranciosi-button-fill.md | Rod picked + pasted. CHANGED: recolored red/black/white -> `--gold-deep`/`--gold`/`--night`, applied to our button + `<span>` (z-index 5 above the two fill layers). `::before` fills from left, `::after` follows from right (delayed). Replaced the free-handed background-position sweep |
| Pill button (rounded fill-sweep) | Remixed | theirs | codepen.io/nfranciosi/pen/eGRKON | same nfranciosi sweep + `border-radius:40px` |
| Inline link (underline-draw) | Remixed | theirs | sources/mauriciabad-underline-link.md (codepen.io/MauriciAbad/pen/QJmwOY) | Rod picked. scaleX underline, origin bottom-right->bottom-left; `background:currentcolor`=gold. Dropped the prior combined drop-shadow glow (de-glow). |
| Tags (ripple hover) | Remixed | theirs | phojanecki (ripple) + codepen (box, origin not recorded) | ripple = phojanecki (recolored). BOX = Rod: "reuse span.tag, originally from a codepen, source not remembered" -> Rod-authorized keep despite lost provenance. |

## Project cards
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Card panel + merch layout (image top / title below / item meta) | Remixed | theirs | hana (via ref-hana.html) | Rod: the PANEL itself is from hana directly (NOT slop). |
| frame-draw border (6-span) | Remixed | theirs | hana (direct grab, Rod-confirmed) | Rod: "direct grab from hana so it's ok." `frame-draw.js`. |
| ignite-on-hover (card glow) | Remixed | theirs | sources/john-r-muir-glow-border.md (codepen.io/john_r_muir/pen/ExzJjqL) | APPLIED. Mouse-tracked radial glow on `.card`, recolored white->amber, single layer, `--mx/--my` set per-card by rAF-throttled JS. |
| Card image / wrapper | True | mine | /assets/media/* (Rod's real project videos) | APPLIED. Black placeholder -> ACTUAL project media from the main site via `<video autoplay loop muted>`: GrassCompute, ZZZProject, P3DM. Card 3 swapped Lantern Scene -> Procedural 3D Mask (real 3rd pinned project; no lantern media exists). VERIFIED rendering. |
| Key-learning hover quote (alt cross-fade) | Slop | mine | Rod's own main pages (existing feature) | Rod ACCEPTS current as slop for now — all codepen refs were worse than what exists; best was samirmuratovic PBRxJw. Re-source from Rod's live site hover-quote feature later. Rides hana alt-image cross-fade |
| Pinned ribbon | Remixed | theirs | Rod-provided corner-ribbon snippet (session 2026-06-09) | classic CSS corner-ribbon (no URL given). CHANGED: recolored amber band / dark-orange tails, scaled ~0.7, anchored to `.card-img` (overflow:visible so it overhangs+folds) |
| Card title / item number | Slop | theirs | — | lead: HANA merch caption |

## List controls
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Search bar box (square, `//` prefix, typeable) | Slop | mine | — | **Rod's exact spec** + ACCEPTS as-is (likes it minimal, no lift; codepen refs were low quality). Box free-handed but Rod-accepted. |
| Search blink caret (border-left on input) | Remixed | theirs | codepen.io/atelierbram/pen/abrbyQ -> sources/atelierbram-border-caret.md | Rod pasted source. CHANGED: border-left (not -right), recolored `--gold`, dropped typing-width anim, applied to a real input, hidden on `:focus-within`/`.has-text` so the native gold caret takes over. Replaces the old misaligning floating `.caret` span; border auto-matches text height + sits flush |
| Filter pills (glow-ignite active) | Remixed | theirs | phojanecki (matches the tags) | Rod: uses a codepen ref + matches the tag ripple/glow. Resolved. |
| Empty state (heading + next-step + action, dashed border) | Remixed | theirs | PatternFly (source pulled) | Rod: ok, it's from a source we pulled. Resolved. |

## Post block
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Post header (`.phead`) | Remixed | theirs | codepen (origin; tuned with Rod) | Rod: keep — tuned together, code originally from codepen. (renamed `.ph`->`.phead` for the foundations collision.) |
| TL;DR / Takeaway / Blockquote (callout family) | Remixed | theirs | codepen (origin; tuned with Rod) | Rod: keep — tuned together, code originally from codepen. left-accent + tint + faint glow. |
| Prose (h2/p/ul/links/inline code) | Slop | mine | — | readability priority; free-handed |
| Code block (terminal frame: filename + copy, no traffic lights) | Remixed | theirs | codepen (resolved pre-branch with Rod) | Rod: fine, went through this before the branch. No traffic lights. |

## About
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Bio cards (left-accent + glow) | Remixed | theirs | = post callout family (codepen) | Rod: bio cards should just MATCH the post formatting (same as TL;DR/takeaway/blockquote callouts), NOT a yannesidibe hover-reveal. Already do. |
| Stats numbers (solid amber serif) | Slop | mine | — | Rod: solid, rejected the hollow yannesidibe `text-stroke` |
| Trophy tiles (bordered, locked/unlocked) | Slop | mine | — | Rod: keep the bordered-tile row (ok for now) |
| Achievement unlock toast + trigger button | Remixed | theirs | sources/robooneus-achievement-toast.md (codepen.io/robooneus/pen/EKrLZV) | Rod picked. Xbox-style toast RELOCATED bottom-center->bottom-RIGHT (Steam-style per Rod), recolored cyan->dark panel+amber, rounded; kept circle->bar expand + icon pop + text reveal. Added a test trigger button (Rod's ask). ?ach=1 static-shows for capture. VERIFIED bottom-right. |
| Status line (live expanding-ring pulse) | Remixed | theirs | codepen.io/adevade/pen/pZeqYx | Rod: taken directly from codepen (recolored to ember, else unchanged). |

## Footer
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Footer (centered mono) | Slop | theirs | — | Rod/another agent grabbing directly from hana. Pending. |

## Ambient / cross-cutting
| Element | Tier | Idea | Source | Notes |
|---|---|---|---|---|
| Lava-bloom background (`hana-bloom.js`) | Slop | theirs (effect) / claude (code) | — | Rod: ours is a REVERSE-ENGINEERED approximation. Hana's real one uses a webp animation + textures (can't be lifted as CSS). ACCEPTED — effect=hana's, code=ours. |
| De-glow reading scrim | Slop | claude | — | **debt** — my contrast fix; derives from the de-glow principle (which is the real idea) |
| Three.js scene (toggle wiring) | Slop | mine | — | the SCENE is Rod's real `three-background-scene.js`; the toggle wiring is mine/claude |

---

## This rework's metric
- ~32 elements tracked.
- **Remixed (~21)** — [prior 20] + john_r_muir card-ignite glow.
- **True (~1)** — card media = Rod's own /assets/media project videos (GrassCompute, ZZZProject, P3DM).
- **Slop remaining: ~5** — Rod-ACCEPTED: key-learning hover quote (ref Rod's pages later), search box (minimal), lava-bloom (reverse-engineered; hana webp, can't grab). Type-deferred: wordmark. Footer (Rod grabbing). Trophy grid ok for now. claude debts: BG-toggle, de-glow scrim, three.js wiring.
- **Idea = `claude`: 2-3** (BG toggle, de-glow scrim, three.js toggle wiring) ≈ **~8%** — under the 25% guardrail. Most free-handed code has a `theirs` lead or is a `mine` concept; the debt is small and named.
