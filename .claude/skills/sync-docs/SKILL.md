---
name: sync-docs
description: Update the docs/ notes so learnings propagate to every agent on the repo. Run whenever a SECTION or FEATURE is finished (lab or live), after any change batch, or after context compaction to re-orient. Periodic mode = contradiction audit.
allowed-tools: Read Grep Glob Edit Write Bash
---

# Sync Documentation

The docs system lives in `docs/` (atomic notes + `docs/INDEX.md` + one-screen `docs/STATUS.md`),
with `CLAUDE.md` at the repo root linking in. "Docs are part of done": a change batch is not
finished until the touched note, STATUS, and CHANGELOG reflect it.

## When to run this

- **Whenever a section or feature is DONE** - lab or live, redesign or code. This is the moment
  learnings exist and the moment they get lost; docs/ is how every parallel agent on this repo
  (redesign, Sarah, character, palette, future sessions) inherits them and stays aimed at the
  same goal. Do not wait to be asked.
- **After every batch of code changes** (new features, refactors, bug fixes)
- **After a context window compaction/shrink** (re-read CLAUDE.md + docs/STATUS.md to re-orient)
- **When the user asks** via `/sync-docs` - if asked with no recent changes, run periodic mode

## After a change batch

1. **Update the touched subsystem note** (find it via `docs/INDEX.md` - e.g. BREATHING.md,
   ARCHITECTURE.md, THEME-BOUNDARY.md). Compile, don't retrieve: rewrite the note to be currently
   true rather than appending history.
2. **Update `docs/STATUS.md`** - keep it to one screen; move finished items out, add what is now
   in flight.
3. **Append a `docs/CHANGELOG.md` entry** - date, SHORT-CAPS-TITLE, prose with the WHY, who
   decided (ROD / CLAUDE), what was rejected. The changelog is the only append-only file.
4. If a decision was made or reversed: record it in `docs/DECISIONS.md` (keep the losers) or
   `docs/DEAD-ENDS.md`. If something cost real time and is not inferable from code, add a
   symptom-first entry to `docs/TRAPS.md`.

## Periodic mode (contradiction audit)

Grep-verify the docs against the code: counts, file paths, claims. Fix what is stale (code wins),
and declare loudly anything too rotten to patch - a small fresh note beats patching a pile.
Spot-check that `docs/INDEX.md` still lists every note, one line each.

## Rules

- Be accurate, not verbose. Only document what is expensive to rediscover AND not inferable from
  the code - delete doc content that fails that bar rather than maintaining it.
- Never document per-element inventories or line numbers; they rot instantly (grep instead).
- If unsure about something, mark it `[VERIFY]` rather than guessing; if a section seems wrong but
  you cannot prove it, flag it rather than changing it silently.
