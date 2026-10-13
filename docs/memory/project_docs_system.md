---
name: project-docs-system
description: "docs/ + repo CLAUDE.md = the repo's source of truth (2026-08-11). Orient from CLAUDE.md + docs/STATUS.md; docs are part of done; refactor deferred until post-redesign."
metadata: 
  node_type: memory
  type: project
  originSessionId: d0c58552-18a2-49ae-b75d-2ee8211fe4c8
  modified: 2026-08-12T00:15:47.129Z
---

# The docs system is the repo's source of truth (2026-08-11)

**Orient every session (and after compaction) from `CLAUDE.md` (repo root) + `docs/STATUS.md`.** Then load only the note the task touches via `docs/INDEX.md`. PROJECT-STATUS.md and CLEANUP-LOG.md are RETIRED (deleted 2026-08-11; history in git) - never resurrect them.

**The shape:** atomic single-topic notes in `docs/` (Jekyll-excluded): STATUS (one screen, what is true now), CONVENTIONS (philosophy + concrete rules), ARCHITECTURE, BREATHING, THEME-BOUNDARY, REFACTOR-PLAN, TRAPS (symptom-first - search there FIRST when debugging), DECISIONS (kept with their rejected losers), DEAD-ENDS (do not re-litigate), VOCABULARY, UPSTREAM, CHANGELOG (append-only). Ported from Rod's Underworld project, a cleaner higher-stakes codebase whose lessons he wants applied here.

**Docs are part of done:** whenever a section, feature, or change batch is finished (lab or live), run `/sync-docs` - touched note + STATUS + a dated CHANGELOG entry. Rod's rationale: this is how the goal stays tracked and learnings propagate to EVERY agent on the repo; unsynced learnings die with the session. (`/sync-docs` also has a periodic contradiction-audit mode.) Code wins: a doc that disagrees with code is stale - fix the doc. Never trust doc counts without re-measuring; never document per-element inventories or line numbers (they rot - grep instead).

**Core ported philosophy** (full text in docs/CONVENTIONS.md): believe the observation then verify the mechanism; grep-verify claims before writing them; reformulate before adding complexity; decisions keep losers, dead ends get tombstones; symmetric listener lifecycle; fail loudly; zero abbreviations in names; comments stand alone.

**The structural refactor is DEFERRED but MANDATORY (D6):** Phases 1-3 of docs/REFACTOR-PLAN.md (theme-boundary extraction, `data-breathing` decoupling, theme-swap decision) wait until the redesign ships so extraction happens ONCE on the final surfaces - but the site stays a boundary-less Chirpy fork until it happens, so it must eventually be done. Do not start it early; do not let it be forgotten.

Related: [[feedback-anti-bloat]] (D5), [[project-code-provenance]] (D7), [[working-rules]].
