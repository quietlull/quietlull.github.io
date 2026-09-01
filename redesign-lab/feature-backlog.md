# FEATURE BACKLOG — everything undone (master index, 2026-06-14)

Single aggregated list of open work across the shipped site + redesign + infra. POINTS to detailed sources;
does not duplicate them. Status: `TODO` (not started) · `PARKED` (deferred, has notes) · `DECIDE` (waiting on
Rod) · `WIP` (in progress) · `BLOCKED` (needs an asset/decision first).

Sources: `project_design_vision.md` (dimden), `PROJECT-STATUS.md` (shipped task list), `HANDOFF.md` (redesign
parked), `analysis/2026-06-14-infra-jekyll-audit.md` (infra), `js-optimization-log.md` (carried flags).

---

## A. Dimden.dev-inspired interactions (from design vision)
| # | Feature | Status | Notes |
|---|---|---|---|
| D1 | **Cursor-following character** (dimden's "little cat follows cursor") | TODO | Overlaps the character-animation ask (see C1). Could be the 3D character OR a small DOM sprite. |
| D2 | **Toggleable neon sign** — a UI toggle that flips a visual state, just for delight | TODO | "look at this" energy; pick a sign/element to toggle. Needs a real source snippet. |
| D3 | **Live visitor cursors** (other visitors' cursors on the page) | BLOCKED | IMPOSSIBLE on static GitHub Pages without a realtime backend. Options: 3rd-party (websocket/Firebase) = out of static scope; or a faked "ghost cursor" replay. Rod aware of constraint. |
| D4 | Hidden hover surprises / small playful interactive moments | TODO | The general dimden principle: evidence the owner cared. Scatter a few. |

## B. Three.js / scene features
| # | Feature | Status | Notes |
|---|---|---|---|
| B1 | **Animated character** (ghost spirit at the dock) | WIP — SKINNED REMIX built (`character-test.html`), tuning | `dissolve-ref.html` = verbatim 1-for-1 Codrops port ("perfect and beautiful" per Rod; repo cloned to `_ref-emissive-dissolve/`). `character-test.html` = that effect REMIXED onto the skinned RobotExpressive: HDRI/cubemap STRIPPED, flat WHITE body, skin-aware particles (applyBoneTransform + frozen pose), particle.png sprite, selective bloom, Tweakpane. Full spec: `character-spec.md`. NOT nested — standalone test scene first, then integrate at the dock in `three-background-scene.js`. GHOST-FADE between states (NOT skeletal cross-fade) -> no blend needed, masks model quality; almost-all-WHITE flat shader (deliberate, to hide rough model). Auto-cycle timer + click-to-force-transition (raycast = lantern-controller pattern). Asset = Mixamo char+rig (Rod sends FBX). Pipeline: Route A (per-anim FBX -> one mixer) dev, Route B (.glb named clips via Blender) prod. |
| B1-roadmap | Active feature queue on the dissolve (Rod 2026-06-14, /loop) | QUEUED, in order | After the animated-skinned base is confirmed: (1) B1c → (2) B1a → (3) B1b. |
| B1-LESSON | Skinned-mesh particles MUST be GPU-skinned | LEARNED 2026-06-14 | Codrops particles share the mesh geometry (works for STATIC meshes). A skinned mesh keeps geometry at BIND pose; the body deforms in the GPU vertex shader. CPU `applyBoneTransform` DIVERGES for GLTF rigs (RobotExpressive NaN/160x, Soldier spread-blob). FIX in `character-test.html`: skin the particle vertex shader with three's own skinning (boneTexture + skinIndex/skinWeight + bindMatrix, Points as child of the SkinnedMesh so modelMatrix matches) -> particles = body exactly; drift = world-space offset added after. Also: RobotExpressive is a bad test model (rig scale); use Soldier/Mixamo. |
| B1c | CLICK-CENTERED dissolve | QUEUED (1st) | Dissolve emanates from a raycast click point. Needs SKINNED world pos as a fragment varying (`transformed`→world) to bias the threshold by distance-from-click; noise stays bind-space. Remix of the Codrops dissolve; idea = Rod's. |
| B1a | MOUSE influence on particle flow | QUEUED (2nd) | Modulate `velocityFactor`/drift by cursor delta. |
| B1b | Particles as CHERRY-BLOSSOM PETALS | QUEUED (3rd) | Rod's specific want. Swap `particle.png` → a petal sprite (SOURCE a real CC0 petal PNG, don't free-hand) + petal-flutter motion (slower fall, more horizontal sway, rotation already present). |
| B2 | Upgrade Three.js models — box lanterns -> FBX/GLTF (PROJECT-STATUS O5) | TODO | High effort. |
| B3 | Lantern progression rewards (shape/color/panel) — tracked, rewards deferred until meshes added | PARKED | Tied to B2. |
| B4 | Whole-site Three.js perf + memory-leak audit | WIP | Background agent running 2026-06-14; findings -> separate report. |

## C. Redesign build (HANDOFF — after bench tuning)
| # | Feature | Status | Notes |
|---|---|---|---|
| C1 | Build decided hero into layout (name->bar+favicon, discipline line, magnetic chevron) | TODO | |
| C2 | Socials rail on the hero | DECIDE | LEFT vs RIGHT unresolved (defaulted RIGHT). |
| C3 | Nav/favicon final behaviors | WIP | Favicon spin now counter-clockwise (2026-06-14). |
| C4 | ENTRANCE-ANIMATION pass — LOWRYS reveal + Studio Gohan temporal stagger (0.2s/card, cap 2.4s) + bench "replay entrances" | TODO | Spec in figma-iteration. |
| C5 | Real Jekyll templates from the verified bench components | TODO | The big payoff phase. |
| C6 | Nav model: full reload (Jekyll) vs SPA | RESOLVED | = full page reload (`page-transition.js:58` `window.location=url`; no SPA router). So scene listeners are NOT leaks today. If ever SPA: add `destroy()` teardown everywhere (see js-optimization-log audit). |
| C7 | About block redesign | PARKED | "a fail, mostly slop" — needs a dedicated design conversation. |
| C8 | Bake tuned bench values into component CSS (use `transform: scale`, NOT tuner `zoom`) | TODO | Lands well in a future `abstracts/_tokens.scss` (see F5). |
| C9 | Prune debug globals (`window.scene/...`) — some used by toggles | DECIDE | Prune only on confirmation. |

## D. Achievements / gamification (PROJECT-STATUS)
| # | Feature | Status | Notes |
|---|---|---|---|
| E1 | Feature-unlock system — hide toggles until earned (A9) | **DONE (verified 2026-08-16)** | Already shipped and working: `.reward-locked{display:none}` on the topbar fireworks switch, removed by `achievements.js` when Pyrotechnician (50 launched) fires. The unlock moment is the design — Rod rejected a "master kill" fireworks toggle precisely because it would spend it (docs `DECISIONS.md` D12). |
| E1b | **Achievement DESIGN pass — what the new achievements should look like** | DECIDE (Rod raised 2026-08-16) | Not the mechanism (that works), the presentation and the set. Open: which achievements survive the redesign, what the toast/trophy case look like in the new visual language, and which ones grant rewards vs are just recognition. Current set = 29 in 5 categories, listed in `achievements.js`. Blocked on nothing; needs Rod's taste. |
| E2 | Personalize achievement names/icons to Rod's media (O8) | TODO | |
| E3 | Achievement unlock rewards — custom cursors/themes/hidden pages/card styles/scene options (O9) | TODO | |
| E4 | Easter eggs: avatar 10x-click spin (E1), long-press lantern burst (E3), card drag-release bounce (E4) | PARKED | Backburner. |
| E5 | Optional achievements: 404 visit, under-construction visit | TODO | |

## E. Site infrastructure (from infra audit — several awaiting Rod)
| # | Feature | Status | Notes |
|---|---|---|---|
| F1 | Turn on visible pageview counter (`pageviews.provider: goatcounter`) | DECIDE | One-word fix; analytics already live. |
| F2 | Comments (Giscus) | DECIDE | On vs intentionally-off. |
| F3 | Social preview image (`social_preview_image`) | TODO | Highest SEO leverage; needs one image. |
| F4 | Re-enable contact links (ArtStation/itch.io/email/RSS) | DECIDE | `_data/contact.yml:14-28` commented out. |
| F5 | Strip Chirpy to minimal custom theme (LICENSE/package.json/semantic-release/gemspec/authors/locales) | DECIDE | Recommended direction; subtractive. |
| F6 | Remove tracked `_gif-archive/` (~414 MB) + gitignore | DECIDE | Highest-impact repo cleanup; MP4s already shipped. |
| F7 | Delete stray `rollup.config-<ts>.cjs` + dead `_layouts/projects.html`, `_includes/projectfilterandsearch.html` | DECIDE | Confirmed dead. |
| F8 | `_data/projects.yml` registry + component-ize previews into one `card.html` + `_tokens.scss` | TODO | Nice-to-haves. |
| F9 | PR-triggered CI lint (`npm test` already defined, not wired) | TODO | |
| F10 | Markdown cleanup — delete 5 high-confidence stale docs (+2 verify-then-delete) | DECIDE | List in infra audit / doc-inventory. |

## F. Content & pages
| # | Feature | Status | Notes |
|---|---|---|---|
| R1 | **ROD TASK: get the Z MEASUREMENTS of the scene** | ROD | Needed before the near-water firework band can be tuned. Rod 2026-08-16: "as we get lower it should be easier to get closer fireworks." Current measured facts: scene content ends at z -1130, the water plane spans z +4500 to -4500 at y=-100, and the greeting band sits at -3000..-4500 where the frustum is 3644-5205 units tall, so the water surface projects near the horizon and no shell can sit visually close to it. A second NEARER band (~-500..-1500) is the fix, and picking its numbers needs Rod's real z figures for where the dock and water read best. |
| R2 | **Replace the WORDMARK near the end** | TODO | Rod 2026-08-16: "the wordmark is fine, we can keep it since it's just text, keep a note that we should replace it near the end." It is plain text so it needs no source and is not blocking anything; it gets its real treatment once the rest of the name (the scribbly hand-drawn mark, and the line-boil animation replacing Caveat) is settled. |
| G0 | **Page blockouts after the landing: POST · PROJECTS · ABOUT · RAMBLINGS** | WIP (Rod 2026-08-16) | The landing is nearly done, so the remaining surfaces get the same treatment `hero-tests.html` got: switchable variants over the live scene, each derived from a real captured reference. **POST is the most important one** (Rod), and it is the SHARED template — projects and ramblings both use it (see memory `project_site_sections_and_plan.md` #4). Reference Rod chose: **stripe.dev's blog**, and specifically the version on its awwwards entry, which he prefers to what stripe.dev serves today. CAVEAT logged at capture time: the awwwards version is a PAST design, so only their preview imagery exists — no live CSS to transcribe, which the provenance law normally wants. For the other three Rod asked for "a few generated from existing sites" first, then he writes a real spec against what he dislikes. |
| G1 | Finish WIP/under-construction posts (C1) | TODO | Rod-authored. |
| G2 | Design write-up posts (C2) | TODO | |
| G3 | `/resume` page (clean, conventional, subtly linked) | TODO | Long-agreed. |
| G4 | "Music I like" subpage | PARKED | OK in principle; not a now-playing widget. |
| G5 | Comment system | DECIDE | = F2. |

## G. Backburner concepts (design vision)
| # | Feature | Status | Notes |
|---|---|---|---|
| H1 | "Desk / workshop bench" metaphor | PARKED | Rod: not now, keep on backburner. |
| H2 | Audio-gear / cable-as-shader-graph-node decoration | PARKED | No clear hook yet. |

## H. Carried JS flags (non-visual, need Rod's ok)
- `achievements.js onScrollEnd` offsetTop/offsetHeight caching — behavioral (shifts toast timing). FLAGGED.
- (More from the running Three.js audit will be appended.)
