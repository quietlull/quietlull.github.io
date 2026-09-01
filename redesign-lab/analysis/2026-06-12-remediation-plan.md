# Remediation Plan — top-down, options per point (2026-06-12)

Covers every open finding from the a11y report (B1 done) + the design report + Rod's palette
directive ("never use pink; fix the palette in general"). **Top-down:** foundations first
(palette, type) because they cascade into everything; then layout/structure; then atmosphere;
then component polish; then deferred. Each point gives **2–3 options**, a **recommendation**, a
**reference** (Rod's standing requirement), and a provenance note. **Nothing is implemented yet —
this is for approval.** Mark each point with the option you want (or "rec" to take my pick).

How to respond: e.g. "T0-A: opt2, T0-B: rec, T1-A: opt1 …" or just "take all recs except …".

---

> **STATUS 2026-06-12: TIER 0 DONE & verified.** T0-A Option 1 (warm + 1 cool accent): pink
> removed from settings + Palette editor; `--color-accent-cool` token added (**PROVISIONAL
> #6fa8d4 — Rod to lock on Palette page or sample a twilight ref**); warm ramp commented into
> tiers. T0-B Option 1: Caveat reserved to the hero logo ONLY; section headers + card titles +
> takeaway titles -> Shippori serif; inline-link + footer -> M PLUS body; Inter dropped from
> aggregate kit/tools/list. Verified across components + aggregate, zero console errors.
> NEXT: Tiers 1-4 point-by-point per Rod. Decision still open: lock the cool-accent value + where
> to spend it (one focal mark per view).

# TIER 0 — Foundations (do first; everything inherits)

## T0-A — Palette overhaul (kills pink; design report D6) — ELEVATED
Current: warm-only ramp (gold `#fbbf24` / gold-deep `#f59e0b` / glow `#ff6a00` / glow-soft
`#ffd9a8`) on night `#070c23`, muted blue-grey `#9aa3bd`, unused pink `#ff3da1`. Problem: it's
near-monochrome warm, so hierarchy rests entirely on glow; pink was the only planned "top note"
and you've cut it.

- **Option 1 — Disciplined warm mono + ONE cool accent (no pink).** Keep the amber lantern family
  but tighten it into clear value tiers; replace pink's "top note" role with a single COOL
  twilight accent drawn from the theme's real origin — a lantern-blue / sky-cyan (e.g. a
  `#7db4e6`-ish) used rarely (active state, one focal mark). Warm = the festival; cool = the
  night sky it hangs in. *Ref:* Shinsekai Yori ED (your palette's origin) + harumaki/Shinkai
  twilight grading (`harumaki-vibe-sites.md`: cornflower/sky-cyan/lavender). *Provenance:* accent
  value sampled from those references, not invented.
- **Option 2 — Pure warm monochrome, hierarchy by value only (no second hue at all).** Delete
  pink, add no accent. Instead formalize the amber ramp into deliberate steps (e.g. 5 rungs from
  glow-soft highlight → gold → gold-deep → ember → night) and build ALL hierarchy from value +
  glow intensity. Most disciplined, most "lantern in the dark," zero temptation to rainbow. *Ref:*
  hana.b-rave (single-accent restraint) + the de-glow principle. *Provenance:* re-tier existing
  warm values; no new colors.
- **Option 3 — Two-temperature twilight system.** A fuller rebuild: a warm lantern ramp AND a
  cool night ramp (deep blue → lavender) as co-equal families, the way Shinkai sky-grading works.
  Richest and most on-theme, but the biggest change and the easiest to over-do. *Ref:* TUYU /
  Fumino / Kaf twilight palettes (`harumaki-vibe-sites.md`). *Provenance:* sample ramps from those
  live sites (would run vibe-site-research to lock exact values).

**Recommendation: Option 1.** Keeps your identity intact, removes pink, gives back a top note
that's *true to the Shinsekai/twilight origin* rather than a random secondary, and is low-risk
(one token added, one removed). Option 2 if you want maximal restraint; Option 3 only if you want
to spend real time on a richer system. *(All three are tunable live on the Palette page first.)*

## T0-B — Type system (design report D3 + D4)
Current: 4 display faces, no rule — Caveat (hero + every header + card titles + footer),
Shippori serif (post title + prose), Inter (kit/tools/list), M PLUS Rounded (body).

- **Option 1 — Reserve hand for logo; serif display; one sans for body+UI.** Caveat → wordmark
  only. Section headers + post title → Shippori serif (one display voice). Body + all UI (kill
  Inter) → M PLUS Rounded. Mono stays for meta/code/tags. *Ref:* potg.art
  (`sources/potg-typography.md`) high-contrast serif + clean sans; harumaki/hana sparing
  hand-lettering. *Provenance:* faces already loaded; this is reassignment, not new fonts.
- **Option 2 — Mono-led (109ichiki direction).** Display + headers → a strong serif; body → a
  readable sans; **but lean the UI/meta on IBM Plex Mono** as the workhorse "voice" (the techy
  109ichiki feel you leaned toward earlier). Hand = logo only. More "tech-art," slightly less
  warm. *Ref:* 109ichiki.com (mono-led) in the element ledger.
- **Option 3 — Keep Caveat for headers, just unify everything else + drop Inter.** Minimal move:
  accept hand-script section headers as the festival signature, but make them consistent (all
  headers Caveat, nothing else), fold Inter → M PLUS, post title → serif stays. Lowest effort;
  does NOT fully resolve D3 (hand-script still broad) but kills the Inter clash. *Ref:* harumaki.

**Recommendation: Option 1.** Directly resolves both D3 (reserve distinction) and D4 (one system),
matches the potg candidates already sourced, and is reassignment-only. Final *exact* face
selection still your call — this just sets the ROLES. Pairs with: do T0-A and T0-B together as the
"cohesion pass," since they're the biggest coherence wins and everything below sits on them.

---

# TIER 1 — Layout & structure

> **T1 STATUS (2026-06-12):** T1-A **PARKED to last** (Rod likes the tall hero + Three.js bg;
> revisit deliberately at the end). T1-B **DONE** (Rod: retrofit aggregate now) — h1, `<main>`,
> skip link, h2 sections, h3 cards/post-title, h4 prose; verified outline + landmark + skip link,
> zero console errors. T1-C **awaiting Rod** (explained that scroll-padding KEEPS the sticky bar;
> Option 1 has no nav downside). Cool accent: Rod tunes on Palette page.

## T1-A — Lead with the work / hero height + section order (design D1 + D8)
- **Option 1 — Compact hero + work first.** Cap hero ~55–60vh; move the cards section directly
  after the hero; relocate tools to after the work. *Ref:* merodev.net / brittanychiang.
- **Option 2 — Hero with a work peek.** Keep a taller hero but pull the first card row to straddle
  the fold (a sliver visible), signalling "scroll = work." *Ref:* yannesidibe (hero + immediate
  grid).
- **Option 3 — Keep order, tighten only.** Leave hero→tools→work order; just reduce hero height
  and tools vertical footprint so all three are reachable fast. Lowest disruption.

**Recommendation: Option 1.** Cleanest fix for the priority-floor (work findable on the landing),
and tools-as-support reads correctly. This is a real-template decision — apply at assembly, not on
the throwaway aggregate.

## T1-B — Document semantics: h1 / main / skip / heading levels (a11y M1)
- **Option 1 — Full pass at assembly.** Hero name → `<h1>`; `.shead` titles → `<h2>`, card/post
  sub-items → `<h3>`; wrap content in `<main id="main">`; skip link first focusable. *Ref:*
  existing site templates + `_a11y.scss` (all four already exist there).
- **Option 2 — Retrofit the aggregate now too.** Same changes, but also patch the aggregate so the
  lab page is itself conformant for testing. More work on a throwaway.
- **Option 3 — Minimum viable.** Just `<h1>` + `<main>` + skip link now; defer perfect heading
  nesting to assembly.

**Recommendation: Option 1.** The pieces exist in the real templates; fixing at assembly avoids
polishing a throwaway. (B-tier exemption covers the aggregate's *code style*, not its a11y, but
since it's not shipped, assembly is the right place.)

## T1-C — Sticky bar obscures focus/anchors (a11y M3)
- **Option 1 — `scroll-padding-top` = bar height** on the scroll root; cheap, standard. *Ref:*
  CSS spec / MDN scroll-padding.
- **Option 2 — Shrink the bar so it obscures less** (ties to D2 toggle quieting + maybe a thinner
  bar), then add a smaller scroll-padding. *Ref:* norikura compact bar.
- **Option 3 — Non-sticky bar.** Let it scroll away entirely (no overlap problem). Loses
  persistent nav. *Ref:* many single-page portfolios.

**Recommendation: Option 1** (+ D2 helps). One line, no behavior loss.

---

> **T1-C DONE (2026-06-12, Opt 1):** `scroll-padding-top:9rem` — sticky bar unchanged, in-page
> jumps land below it. Verified 144px computed.
> **TIER 2 STATUS (2026-06-12):** T2-A DONE (Opt 1: brightness .78->.6 + radial mask central pool;
> de-glow verified; **off-center variant rendered for Rod to choose — centered committed**).
> T2-B DONE (reduced-motion @media + body.motion-off hook on bloom/entrance anims). T2-C DONE
> (Rod's variant: hover-to-play, no autoplay, paused under reduced-motion/motion-off, still first
> frame; verified paused-at-load + plays-on-hover + blocked-when-motion-off). Lands in merged-card
> component (flows to bench + aggregate).

# TIER 2 — Atmosphere & motion

## T2-A — Bloom floods the night (design D5)
- **Option 1 — Lower intensity + tighter radius.** Reduce bloom alpha and shrink its spread so the
  night dominates and the glow pools behind the name. *Ref:* de-glow principle
  (`project_visual_references.md`) + hana's subtle bloom.
- **Option 2 — Off-center the pool.** Keep intensity but move the bloom off the dead center so it
  reads as a lantern light source, not a vignette wash. *Ref:* hana (off-center bloom).
- **Option 3 — Both + reduced default.** Combine 1 and 2 and set a lower default, leaving the
  Palette/scene tuning to push it up if wanted. Safest.

**Recommendation: Option 1** (tunable live — start low, you raise to taste).

## T2-B — Reduced-motion guards on ambient CSS (a11y M4, hard rule)
- **Option 1 — Wrap all decorative keyframes** (`bgfade` bloom, title/logo glows) in
  `@media (prefers-reduced-motion: reduce){…animation:none}`; bloom holds a static frame. *Ref:*
  existing `_animations.scss` kill-switch block.
- **Option 2 — Tie to the existing motion kill-switch too** (so the toggle AND the OS pref both
  freeze ambient), one shared mechanism. *Ref:* same.
- **Option 3 — JS-gate at init** (read the pref in JS, skip starting the animations). More code,
  less declarative.

**Recommendation: Option 2** — covers both the OS pref (hard rule) and the manual toggle with one
mechanism; mirrors how the real site already works.

## T2-C — Autoplay videos need a pause path (a11y M2, 2.2.2)
- **Option 1 — Pause on motion-off / reduced-motion.** When the kill-switch fires or the OS pref
  is set, `pause()` all `<video autoplay>`. *Ref:* existing Three.js visibility-pause pattern
  (PROJECT-STATUS).
- **Option 2 — In-view play + a visible pause control.** Play only while on screen
  (IntersectionObserver), with a small pause button. More UI, fuller control. *Ref:* same observer
  pattern; pause-button is a small new control (would need a source/icon).
- **Option 3 — Both.** In-view play AND honor the kill-switch. Most correct, most work.

**Recommendation: Option 1** — satisfies 2.2.2 with the least new surface, reuses an existing
pattern, and folds into the same kill-switch as T2-B.

---

> **TIER 3 STATUS (2026-06-12):** T3-A DONE (Opt 1 ghost: bar toggles dim at rest, only ON
> features glow — verified Breathing/Sparkler glow, Fireworks ghosted; may be revisited in palette
> pass per Rod). T3-B deferred to assembly (consume component). T3-C DONE (aria-hidden on 8 icon
> SVGs, component + aggregate). T2-A bloom: brightness is the lever; rendered loud(1.0)/mid(.6,
> committed)/calm(.35) for Rod to pick a level (earlier .78->.6 was imperceptible). REMAINING:
> T3-D targets, T3-E tiny text, T3-F flip-keyboard, T3-G text-over-video re-measure.

# TIER 3 — Component polish (small, but options as requested)

## T3-A — Top-bar toggles too loud (design D2)
- **Opt 1 — Ghost resting state, glow only when on.** *Ref:* norikura thin-line toggles.
- **Opt 2 — Shrink + move** the trio to the bar's far edge / a menu. *Ref:* dimden single accent.
- **Opt 3 — Reduce to one combined "effects" control** that opens the three. *Ref:* PSO2 NGS
  contextual controls (your reference). **Rec: Opt 1** (smallest change, biggest calm-down).

## T3-B — Aggregate list filters are `<span>` (a11y m1)
- **Opt 1 — Consume the extracted `list-controls` component** (already uses `<button>`). *Rec.*
- **Opt 2 — Patch the aggregate spans → buttons** inline. *Ref:* own component. **Rec: Opt 1** —
  resolves at assembly for free; no reason to fix the throwaway.

## T3-C — Decorative tool-icon SVGs not hidden (a11y m2)
- **Opt 1 — `aria-hidden="true"` on each** (label carries meaning). *Rec.*
- **Opt 2 — `role="img"` + `<title>`** making each icon a named graphic. Heavier; redundant with
  the visible label. **Rec: Opt 1.**

## T3-D — Sub-24px tap targets (a11y m3)
- **Opt 1 — Raise nav-link vertical padding** to hit 24px min. *Ref:* WCAG 2.5.8.
- **Opt 2 — Keep visual size, add invisible hit-area padding** (pseudo-element expands target).
  *Ref:* common pattern. **Rec: Opt 1** for nav; the slap control is already 27px tall (its halves
  get the spacing exception).

## T3-E — Sub-10px text (a11y m4 / readability)
- **Opt 1 — Floor UI text at ~11–12px** in the type pass (toggle labels, back-read, card-meta).
- **Opt 2 — Leave as-is** (decorative micro-labels) but verify 200% zoom keeps them usable.
  **Rec: Opt 1**, folded into T0-B.

## T3-F — Card flip (takeaway) has no keyboard trigger (a11y m5)
- **Opt 1 — Accept as decorative** (takeaway text is already in the DOM / AT tree; card link
  navigates). *Rec.*
- **Opt 2 — Add a `focusin` flip** mirroring the dwell, so keyboard reveals it too. *Ref:* own
  card JS. **Rec: Opt 1** unless the takeaway ever becomes content-only.

## T3-G — Text-over-video contrast borderline (a11y N1)
- **Opt 1 — Strengthen the cover scrim** (raise mid-stop alpha ~.62→.75). *Rec; tunable.*
- **Opt 2 — Solid text plate** behind the title/meta. Safest, slightly heavier look.
- **Opt 3 — Constrain to dark-enough posters** only. Fragile. **Rec: Opt 1**, re-measure after.

---

> **MORE TIER 3 (2026-06-12):** T2-C CORRECTED per Rod — autoplay STAYS default; only
> reduced-motion/motion-off pauses + hover-plays (markup keeps `autoplay`, JS gates). T3-D DONE
> (nav links 30px tall, >=24). T3-E DONE (card-meta 11.2px, back-read .68rem; bar micro-labels
> deferred to bar/palette revisit). T3-G RE-MEASURED: title is large text (30px, 3:1 bar),
> worst-case raw 3.05:1 -> PASSES; scrim makes real ratio higher. No fix needed; optional scrim
> insurance deferred. T2-A bloom: deferred to palette pass (stays mid .6).
> REMAINING: T3-F (flip keyboard), T4-A (global focus - needs a reference), T4-B (spacing - last),
> T1-A (hero - last).

# TIER 4 — Deferred / needs your input

> **CLOSING ITEMS (2026-06-12):** T3-F ACCEPTED as decorative (content in DOM + card is a link;
> no keyboard flip needed). T4-A: Rod chose **research glow-focus references first** — gathering
> real cited patterns to present before building. T4-B (spacing) + T1-A (hero) remain the final
> Rod-driven items.

> **T4-A DONE (2026-06-12, Option B):** global lantern-glow `:focus-visible` (transparent outline
> for HCM + amber ring + ember bloom) in `extracted/styles/generic.css` AND aggregate; slap
> `:has()` ring harmonized to match. Sourced in `sources/focus-ring.md` (dev.to box-shadow
> technique + Bootstrap two-tone + darekkay). Rule verified present/well-formed in cascade +
> focus management works (activeElement correct); live focus capture not possible headless (no OS
> focus). **PLAN COMPLETE except the two deliberately-last items: T4-B (spacing, Rod tunes) and
> T1-A (hero, revisit).**

## T4-A — Global focus indicator (a11y B2) — you parked this pending a reference
- **Opt 1 — Lift the existing `_a11y.scss` `:focus-visible`** amber outline site-wide. *Ref:* your
  own live site (already shipped it).
- **Opt 2 — A festival focus** (a soft lantern-glow ring instead of a hard outline). *Ref:* would
  run vibe-site-research for tasteful glow-focus patterns. **Rec:** decide after you see a
  reference — I can pull 3–4 glow-focus examples if you want Opt 2.

> **PALETTE ACCENT SOURCED (2026-06-12):** pixel-sampled harumaki Gen'eiten flyers
> (`sources/harumaki-palette.md`). Confirmed Rod's gold/glow/night already match the reference;
> the only correction was the cool accent -> `--color-accent-cool: #3090a8` (harumaki teal-cyan;
> alt cobalt #1830a8). Still open: WHERE to spend the accent (one focal mark/view) — decide during
> real-page building. **T4-B REFRAMED (Rod): spacing isn't meaningful until real pages exist;
> defer the spacing pass to real-page construction, set per-page.**

## T4-B — Deliberate spacing pass (design D7) — your hand on the tuner
- **Opt 1 — You tune in the bench/aggregate**, send the JSON, I bake it. *Rec — it's your call by
  definition.*
- **Opt 2 — I propose a first-draft rhythm** (varied, intentional gaps) for you to adjust. *Ref:*
  Gestalt proximity. **Rec: Opt 1**, do last once order/sizes settle.

---

## Suggested execution order (once approved)
1. **T0-A + T0-B** (palette + type) — foundations; live-preview on the Palette page first.
2. **T1-A + T1-B + T1-C** (layout/semantics/sticky) — at assembly of the real templates.
3. **T2-A/B/C** (atmosphere + motion) — one shared kill-switch covers B/C.
4. **T3-A…G** (component polish) — batch.
5. **T4-A** (focus, after you pick a reference) + **T4-B** (spacing, last).

Everything traces to an existing reference or your own site/components — no new slop. Palette and
type are the only points that benefit from locking a decision *before* I touch code, because they
cascade. Tell me your picks and I'll start at Tier 0.
