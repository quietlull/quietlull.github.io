# Breathing system

The ambient glow animation system: tiered box-shadow/border "breathing" on glass elements.
Folded from PROJECT-STATUS.md 2026-08-11. The per-element inventory is deliberately NOT documented
here - it goes stale instantly; grep the SCSS for `breathe-|throb-` when you need it.

## Color: CSS variables, never keyframe variants

Color adapts via two custom properties consumed inside the keyframes:

- `--breathe-hue` - RGB triplet, default `251,191,36` (gold)
- `--breathe-border-hue` - default `245,158,11` (amber)
- Orange override per element: `--breathe-hue: 249,115,22; --breathe-border-hue: 234,88,12;`

**Tombstone:** `-warm` keyframe variants are a dead model ([DEAD-ENDS.md](DEAD-ENDS.md)). Any
`breathe-*-warm` keyframe you find is a leftover; color variation is variables only.

## Tiers: stacking bands

Each tier's resting glow >= the tier below's peak, so hierarchy never collapses.

| Tier | Keyframe | Outer rest/peak | Inner rest/peak | Border rest/peak | Scale |
|------|----------|----------------|----------------|-----------------|-------|
| T1 Ember | `breathe-ember` | 0.06/0.20 | 0.04/0.12 | 0.10/0.20 | none |
| T2 Glow | `breathe-glow` | 0.18/0.35 | 0.10/0.25 | 0.18/0.28 | none |
| T3 Lantern | `breathe-slow` | 0.30/0.50 | 0.22/0.40 | 0.25/0.35 | none |
| T4 Beacon | `breathe-beacon` | 0.45/0.70 | 0.35/0.55 | 0.30/0.40 | 1.0/1.03 |

Special keyframes: `throb-glow` (T4-level pulse - active nav + breathing toggle), `throb-dot`
(scale 1 -> 1.5 + glow swell - icon dots), `breathe-toggle-glow` (legacy hardcoded gold, kept as
option), `pulse-scale` (opacity + scale, kept for indicators).

## Kill switch

One shared `$breathe-selectors` list in `_sass/abstracts/_animations.scss`, consumed by BOTH:

- `html.no-breathe { }` - the manual toggle (`breathe-toggle.js`)
- `@media (prefers-reduced-motion)` - OS-level, combined with `$reduced-motion-extras`

Phase 2 of the refactor replaces the list with a `data-breathing` attribute
([REFACTOR-PLAN.md](REFACTOR-PLAN.md)).

## Adding breathing to an element (until Phase 2)

1. Pick a tier; add `animation: <keyframe> <duration> ease-in-out infinite;` in the element's SCSS.
2. Add the selector to `$breathe-selectors` (miss this and the kill switch silently skips it).
3. For orange, add the hue-variable overrides above.
4. Test: breathing toggle off disables it, AND `prefers-reduced-motion` disables it.

## Sparkler integration

`mouse-trail.js` auto-detects breathing elements by string-matching computed `animationName` for
`breathe`/`throb`, then walks up the DOM and samples `borderColor` from the first breathing
ancestor. No selector list on the JS side - but renaming a keyframe breaks detection
([TRAPS.md](TRAPS.md)). Phase 2 moves this to `data-breathing` too.

## Key files

| What | Path |
|------|------|
| Keyframes + kill switch | `_sass/abstracts/_animations.scss` |
| Hue CSS variables | `_sass/themes/_dark.scss` |
| Breathing toggle | `_javascript/modules/components/breathe-toggle.js` |
| Sparkler | `_javascript/modules/components/mouse-trail.js` |
| Color utils | `_javascript/modules/utils/color-utils.js` |
| Storage keys | `_javascript/modules/config/storage-keys.js` |
