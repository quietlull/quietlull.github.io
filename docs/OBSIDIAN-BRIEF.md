# Obsidian brief

Research verdict (web research, 2026-08-11) on using Obsidian-style knowledge management with
Claude Code for this project.

## The verdict

**Token efficiency comes from the note SHAPE, not from Obsidian's software.** Community consensus
(including Anthropic's own 2026 context-engineering guidance) converges on: plain markdown in the
repo, structured as small single-topic notes + a tiny index + a short CLAUDE.md that links out.
Claude reads files off disk natively and loads only what the task touches - orientation cost then
scales with what CHANGED since last session, not with project size. That is exactly what this
docs/ folder is.

Distrust the "71.5x fewer tokens" claim circulating in this space - unverifiable marketing. The
honest framing is the orientation-cost one above.

## What we adopted

- Atomic notes + one-screen STATUS + INDEX (this folder).
- **Compile, don't retrieve** - update the existing note rather than appending a new one; the
  changelog is the only append-only file.
- The maintenance loop: docs are part of done (per change batch), plus an occasional contradiction
  audit (the /sync-docs skill's periodic mode). Without this the system is just a prettier pile
  that goes stale - the Underworld project's doc rot proved it.

## Using Obsidian the app (optional, free, harmless)

Open the repo (or just docs/) as a vault for the human-facing layer: graph view, backlinks,
click-to-follow. If you do:

- Gitignore `.obsidian/` (config churn, no value to the agent or the repo).
- Keep links as standard markdown `[text](file.md)` - they work in Obsidian, on GitHub, AND for
  Claude. `[[wikilinks]]` render as literal text everywhere outside Obsidian.
- Skip Dataview / Bases / Templater for this use - they are human-display plugins; Claude reads
  the raw markdown underneath and gets nothing from them.

## The MCP layer - skip for now, revisit triggers

The mature stack if ever wanted: **Local REST API plugin** (coddingtonbear - the foundation, has a
built-in MCP server) + **mcp-obsidian** (markuspfundstein - the most battle-tested standalone
server). Adds live read/write from other MCP clients and heading-level patching.

Revisit ONLY if one of these becomes true:

1. You want Claude Desktop / phone / another MCP client reading and writing the SAME notes Claude
   Code maintains.
2. You want Obsidian's graph/backlink view updating live while an agent writes.

Neither makes Claude Code itself more token-efficient - that is already paid for by the note shape.
Native Claude Code features (auto-memory, skills' progressive disclosure, subagents for big reads,
@-file imports) cover the rest of what the community's Obsidian frameworks hand-rolled.
