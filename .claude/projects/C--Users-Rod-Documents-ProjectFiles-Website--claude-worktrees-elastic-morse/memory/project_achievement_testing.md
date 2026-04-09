---
name: Achievement testing tool needed
description: User wants a simpler way to reset/re-trigger achievements for testing purposes
type: project
---

User wants a tool to simplify testing achievements in the future. Currently the only way is `localStorage.removeItem('achievements')` + reload.

**Why:** Manual console commands are friction during visual QA passes.
**How to apply:** When working on achievements or QA tooling, consider adding a dev-mode reset button or keyboard shortcut.
