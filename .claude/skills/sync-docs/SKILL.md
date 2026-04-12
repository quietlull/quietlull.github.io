---
name: sync-docs
description: Update PROJECT-STATUS.md after code changes or context window compaction. Run this after making changes to keep documentation accurate, or after resuming from a compacted context to re-orient.
allowed-tools: Read Grep Glob Edit Write Bash
---

# Sync Documentation

You must update `PROJECT-STATUS.md` in the project root to reflect the current state of the codebase. This is the single source of truth that future sessions (and the user) rely on.

## When to run this

- **After every batch of code changes** (new features, refactors, bug fixes)
- **After a context window compaction/shrink** (re-read the file to re-orient yourself)
- **When the user asks** via `/sync-docs`

## What to update

1. **Read `PROJECT-STATUS.md`** first to understand its current state.

2. **Breathing Element Map** — If any breathing animations were added, removed, or reassigned:
   - Verify by grepping: `grep -r "breathe-ember\|breathe-glow\|breathe-slow\|breathe-beacon\|throb-glow\|throb-dot" --include='*.scss' -n`
   - Update the element map table with: element, tier, keyframe, duration, hue override, source file
   - Update `$breathe-selectors` in `_animations.scss` if needed

3. **Architecture Changes** — If CSS variables, keyframes, mixins, or JS modules were modified:
   - Update the relevant section
   - Note any new files created or files deleted

4. **Common Mistakes** — If you made an error the user corrected:
   - Add it to the "Mistakes to Avoid" section with: what went wrong, why, what to do instead
   - This prevents repeating the same mistake in future sessions

5. **TODOs** — If tasks were completed or new ones identified:
   - Move completed items to "Completed" with date
   - Add new items with context about what needs to happen

6. **Cleanup Log** — If code was removed:
   - Update `CLEANUP-LOG.md` with what was removed and why

## Verification

After updating, do a quick sanity check:
- Does the breathing element map match what `grep` finds in the SCSS?
- Are the keyframe names and tier assignments accurate?
- Are the file paths still correct?

## Important

- Be accurate, not verbose. Short entries are better than long explanations.
- If you're unsure about something, mark it with `[VERIFY]` rather than guessing.
- The user's directive: "Do not assume. Ask first." applies here too — if a section seems wrong but you're not sure, flag it rather than changing it silently.
