# Design audit + directions (2026-08-08, /loop working doc)

Living doc for the "push the audit + catalog the whole site references" loop. Two halves: (A) the standards stack we audit against, (B) the per-page audit procedure, (C) directions emerging from the catalog. Progress tracker at the bottom.

## A. Standards to fold in (beyond impeccable)

Found by research; each complements impeccable rather than replacing it.

1. **Vercel Web Interface Guidelines** (Rauno Freiberg) — github.com/vercel-labs/web-interface-guidelines, also vercel.com/design/guidelines, also packaged as a Claude skill. A concrete interaction/a11y checklist: everything interactive reachable by Tab + visible focus ring (never `outline:none` without a replacement), touch targets >=44x44, links are `<a href>` / buttons are `<button>`, every input has a `<label>` and lives in a `<form>` (Enter submits), **layered shadows (>=2 layers = ambient + direct)**, **APCA over WCAG2 for contrast**, active-voice copy, and *no extraneous animation on frequent low-novelty actions*. → **USE as our interaction/a11y audit checklist**, alongside STYLE.md's WCAG hard rules.
2. **Google DESIGN.md standard** (open-sourced draft for coding agents) — YAML front matter with design *facts* (colors, typography, spacing, radius, component tokens) + Markdown *rationale* (what it should feel like, how colors are used, what to avoid). Tokens give exact values; rationale gives judgment. → **USE as the FORMAT** when we consolidate our foundations into one DESIGN.md (matches impeccable's `init` output; add an explicit anti-references section = our pillars + the tells we cut).
3. **"Fixing Visual AI Slop"** (trilogyai) — another anti-slop "rules layer" (baseline UI quality, a11y, metadata, motion perf). → skim for extra tells not in impeccable; low priority.

**How the stack composes:**
- impeccable = anti-slop *aesthetic* tells + a quality detector.
- Vercel WIG = interaction/a11y *rigor*.
- Google DESIGN.md = the *token + rationale format*.
- STYLE.md = our WCAG hard rules + UX heuristics + the Section-J analysis procedure.
- **On top of all of it: our razor** (pillars + elevate-or-cut). The standards flag candidates; the razor decides.

## B. Per-page audit procedure (report-only, per STYLE.md Section J)

For each redesign surface (rework-*.html, element sets, aggregate, then real pages):

1. **Pillar pass** — does this surface serve a pillar (playful / alive-living / "look at this")? Name which. A surface serving none is a flag by itself.
2. **Tell pass** — list every impeccable tell present. For each, run **the fork**: (a) pillar backs it → name the *elevated/alternative* version and the *visible reason* it's not slop; (b) no pillar → mark **cut**.
3. **Quality pass** — Vercel WIG + impeccable quality subset + STYLE.md WCAG: contrast (prefer APCA), 44px targets, visible focus, heading order, line-length 65–75ch, layered shadows, no width/height/layout animation, no extraneous motion on frequent actions.
4. **Output** — a per-page findings list. Report only; proposals must name their code source. Reports land in `redesign-lab/analysis/`.

## C. Directions emerging from the catalog

As the gallery grows, clusters are appearing that could become the redesign's axis. Early read (untiered, pending Rod):
- **Two poles of "aliveness":** maximalist-alive (dimden, zutomayo, tuyu, merodev) vs restrained-editorial (yorushika, aimer, mateusz, norikura). Rod's sweet spot is almost certainly **"alive but intentional"** — dimden's density without dimden's chaos. Worth an explicit dial.
- **Paper-morphism has real precedent:** yorushika (kraft-paper object photography) + fumino (layered paper index-card tabs). Both prove the washi/paper-panel direction reads as craft, not slop.
- **Watercolor-twilight cluster:** harumaki (+ndt/ftr), mateusz, tuyu, aimer — the hand-painted, soft-graded, warm-on-cool family. This is the palette/illustration north star.
- **Type split:** elegant serif-display (aimer, norikura, reol, potg) vs geometric-mono (109ichiki, merodev). Still unresolved; the catalog is stacking evidence for a serif-display + mono-accent pairing.

## Progress tracker (loop completion criteria) — COMPLETE 2026-08-08

- [x] **Every cataloged site: image + >=5 tags.** **44 sites cataloged, ALL with 8 tags.** Buckets: tier-1/sourced (17), dreamy/twilight (10), dark-cinematic (6 usable), nocturnal-serif (11). Deferred (headless can't render heavy WebGL / gated / dead — need Rod's real browser): theirisk, igma, stabondar, quentinhocde, sundown-studio, anzo.studio.
- [x] **Every redesign page audited for style.** reworks (deep) + aggregate + bench (grep tell-scan) → `2026-08-08-style-audit-findings.md`. Net: build already dropped Inter; only open levers = `.s-post .post` glass→paper-morphism, the `.s-tools` icon-tile-stack decision, and any carried-forward decorative halos. All are Rod-decisions. (section-landings = superseded, skipped.)
- [x] **Scout other standards.** Vercel WIG + Google DESIGN.md + trilogy (section A).

Loop stopped: criteria met. Open items are all Rod-decisions (tier the untiered cards; approve the 3 audit levers; real-browser pass for the 6 WebGL sites).
