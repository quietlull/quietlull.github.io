# Cleanup Log

Tracks all code removed and architectural changes for easy reference.
Changes are also in git history.

---

## Removed Code

### Unused Animation Utility Classes (from `_animations.scss`)
*19 classes, ~80 lines. Zero references anywhere in HTML, JS, or other SCSS.*

| Class | Keyframe it used |
|-------|-----------------|
| `.animate-float` | `float` |
| `.animate-float-gentle` | `float-gentle` |
| `.animate-breathing` | `breathing` |
| `.animate-pulse` | `pulse` |
| `.animate-pulse-scale` | `pulse-scale` |
| `.animate-pulse-glow` | `pulse-glow` |
| `.animate-fade-in` | `fade-in` |
| `.animate-fade-in-up` | `fade-in-up` |
| `.animate-fade-in-down` | `fade-in-down` |
| `.animate-scale-in` | `scale-in` |
| `.animate-scale-pulse` | `scale-pulse` |
| `.animate-slide-in-right` | `slide-in-right` |
| `.animate-slide-in-left` | `slide-in-left` |
| `.animate-spin` | `spin` |
| `.animate-spin-slow` | `spin-slow` |
| `.animate-breathe-slow` | `breathe-slow` |
| `.animate-heartbeat` | `heartbeat` |
| `.animate-breathe-ring` | `breathe-ring` |
| `.animate-pulse-slow` | `pulse-slow` |

### Unused Keyframes (from `_animations.scss`)
*Zero references outside the file. Some were holdovers from earlier iterations.*

| Keyframe | Why unused |
|----------|-----------|
| `shimmer-slow` | Only `shimmer` is used |
| `fade-in-down` | Only `fade-in-up` is used |
| `scale-in` | No class or element uses it |
| `scale-pulse` | No class or element uses it |
| `slide-in-right` | No class or element uses it |
| `slide-in-left` | No class or element uses it |
| `breathe-ring` | Replaced by `throb-dot` |
| `breathe-soft` | Replaced by `throb-glow` on breathing toggle |
| `pulse-glow` | No element uses it |

*Kept:* `pulse-scale` (dot/indicator effects), `breathe-toggle-glow` (legacy toggle option)

### Unused Animation Delay/Duration Utilities (from `_animations.scss`)
*~15 lines. No references in HTML or JS.*

| Class |
|-------|
| `.delay-0` through `.delay-4000` (8 classes) |
| `.duration-fast` through `.duration-slowest` (5 classes) |

### Unused Animation Control Classes (from `_animations.scss`)
| Class |
|-------|
| `.animation-paused` |
| `.animation-running` |

### Comment/Formatting Cleanup (from `_animations.scss`)
Replaced verbose `// ====` section headers with compact `// ---` markers.
Removed "removed — see CLEANUP-LOG.md" inline comments (this file covers that).
Collapsed single-property rules to one line where readable.
Cleaned `$reduced-motion-extras` list — removed references to deleted `.animate-*` classes.

**Result: `_animations.scss` 800 lines -> 401 lines (50% reduction)**

---

## Maintenance Notes

### Breathing System — How to add breathing to a new element
1. Pick a tier: T1 `breathe-ember`, T2 `breathe-glow`, T3 `breathe-slow`, T4 `breathe-beacon`
2. Add `animation: <keyframe> <duration> ease-in-out infinite;` in the element's SCSS
3. Add the element's selector to `$breathe-selectors` in `_sass/abstracts/_animations.scss`
4. For warm/orange color, add `--breathe-hue: 249, 115, 22; --breathe-border-hue: 234, 88, 12;`
5. Test: breathing toggle off should disable it, `prefers-reduced-motion` should disable it

### Stacking Bands Reference
| Tier | Outer rest-peak | Inner rest-peak | Border rest-peak |
|------|----------------|----------------|-----------------|
| T1 Ember | 0.06-0.20 | 0.04-0.12 | 0.10-0.20 |
| T2 Glow | 0.18-0.35 | 0.10-0.25 | 0.18-0.28 |
| T3 Lantern | 0.30-0.50 | 0.22-0.40 | 0.25-0.35 |
| T4 Beacon | 0.45-0.70 | 0.35-0.55 | 0.30-0.40 |

### Key Files
| What | Where |
|------|-------|
| All keyframes + kill-switch | `_sass/abstracts/_animations.scss` |
| CSS hue variables | `_sass/themes/_dark.scss` |
| Breathing toggle JS | `_javascript/modules/components/breathe-toggle.js` |
| Sparkler | `_javascript/modules/components/mouse-trail.js` |
| Shared color utils | `_javascript/modules/utils/color-utils.js` |
| Storage keys | `_javascript/modules/config/storage-keys.js` |
