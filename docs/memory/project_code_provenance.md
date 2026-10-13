# Code Provenance Contract — the HARD rule (2026-06-09)

Rod imposed this because he is sick of cleaning up fabricated ("randomly generated nonsense") code, and of me forgetting code examples he explicitly provided. This is a binding behavioral contract, not a guideline. Now also recorded in the repo: CLAUDE.md standing rules + docs/DECISIONS.md D7 ([[project-docs-system]]).

## The rule

**Everything on the site MUST come from, or derive from, a real code snippet** — either from a reference site / CodePen, OR extracted verbatim from the current live site by an agent. Nothing ships that was free-handed.

If an element is NOT backed by a snippet in the ledger, I do NOT generate it. I **ask Rod**, or help him hunt a real reference, FIRST.

## The three tiers

- **True Code** — lifted verbatim from a real source (reference site, CodePen, or the live site's own code). Recorded WITH its source (URL / file:line) so it can be re-verified. This is "absolute truth."
- **Remixed Code** — True Code that was changed, or multiple True sources combined. Must cite parent source(s) AND state what changed. (Remixing slop = still slop.)
- **Slop Code** — fabricated by me, no source. NOT allowed to ship. Every Slop entry is a worklist item: find a source (-> True/Remixed) or ask Rod.

## Second axis — Idea origin

Provenance (where the CODE came from) is separate from authorship (whose IDEA it is). Track an **Idea** flag per element: `mine` (Rod) / `theirs` (a reference) / `claude` (my invention = a standing debt, must be revisited).

**Rod's 25% guardrail:** if `claude`-originated ideas exceed ~25% of the design, the "no human intentionality" problem persists no matter what we do. The ledger must let us COUNT the claude ratio and keep it under 25%. Resetting code provenance must NOT erase a genuine `mine` signal — those concepts get their CODE re-sourced, not replaced.

## The system

- **CANONICAL LEDGER = `redesign-lab/element-tracker.md`** (gitignored, persists across branches). By final-site surface; columns Tier/Idea/Source/Notes; includes the 25% metric rollup. Rod actively edits it — coordinate, don't clobber. (TRUST RESET 2026-06-09: all lab code = Slop until re-proven.)
- **SAVE PASTED SNIPPETS VERBATIM** to `redesign-lab/sources/<name>.md` (URL + untouched original code), then cite that file as the Source. The saved file is the provenance anchor; the adapted lab code is the Remixed copy.
- **Source wells:** `redesign-lab/sources/*` — fresh dated verbatim extractions (e.g. hana-glow.css). Per-rework ledgers (`rework-<name>-ledger.md`) hold as-built candidates that get promoted into the canonical ledger.

## Reliable-sourcing model (proven 2026-06-09, folded from SESSION-HANDOFF)

- **Live, non-rebuilt sites** -> fresh-extract verbatim into `sources/` = True. (Captured recipes in old memory breakdowns count as Slop until re-proven — sites drift.)
- **Rebuilt/SPA sites** (e.g. yannesidibe went Next.js, styles live in JS) -> can't trust live OR captured -> CodePen or Rod-paste.
- **CodePen** -> I can't fetch it (Cloudflare); Rod pastes.

## Durable lesson: external audits vs our de-glow (2026-06-09)

A web agent audited rework-hana vs the original and wanted every block re-wrapped in glow panels — exactly the Claude-tell our de-glow principle kills (a lantern needs the night; only a few things glow). **We intentionally diverge from references' everything-glows; do not let any audit "fix" that back.** Its one valid point (ignite-on-scroll-in, not constant glow) was adopted from a True source.

Related: [[project-design-pillars]], [[project-design-vision]], [[feedback-design-generation-mishap]], [[working-rules]].
