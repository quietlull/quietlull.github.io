# REJECTED 2026-08-16 — six sub-page "blockouts" that were not blockouts

ROD rejected this whole batch on sight. Kept only because the MEASUREMENTS in them are real and
were expensive to get; the pages themselves are not a direction and must not be revived.

## Why they were rejected (four separate failures, all avoidable)

1. **They were not blockouts.** Coloured, gold accents, real type treatment. A blockout is uniform
   monochrome greybox, geometry only — the rule was already written in DECISIONS D8 and in the
   landing-blockout the batch was supposedly modelled on.
2. **No analysis happened.** What Rod actually needs per page, what already exists in `_layouts/`,
   what the bench components already cover, and what other sites do — none of it was done.
3. **Nowhere near enough sources.** One to three sites per page type; Rod requires at least FOUR
   live sites per page type, portal included. This breaks the provenance law.
4. **Finished far too fast**, which is the symptom of 1-3 rather than a separate fault.

The procedure that should have been followed is now written down at `docs/PAGE-PROCESS.md` and
linked from `CLAUDE.md`.

## What IS worth keeping from here — real numbers, read from live sites

**stripe.dev blog post** (measured @1440, 2026-08-16, `getComputedStyle`):
- 24-column grid, **58.375px per column**, container 1425px, children on `subgrid`
- sticky metadata rail **exactly 6 columns (350px)**, `top:60px`
- prose column **exactly 12 columns (701px, ~78ch)**; remaining 6 columns are right margin — the
  layout is deliberately NOT centred
- h1 **101px / 93px line-height / weight 300 / -6.07px tracking** (light, not bold); h2 48/48/300
- body 18px / 23.4px (1.3); rules 1px in the ink colour `rgb(1,22,39)`; section rhythm 56px
- face is `sohne-var` (Klim Söhne) — COMMERCIAL, cannot ship, must be substituted
- their prose runs ~78ch at 1.3 leading, which CONFLICTS with STYLE.md's 65-75ch

**brittanychiang.com** (measured @1440, 2026-08-16):
- sticky left header **561px wide, left:121, top:0, FULL viewport height** — it never scrolls
- right column **607px**, left:697 → gutter **16px**, right margin 136px
- h1 48/48/700; prose 16/26 (1.625) at ~76ch; experience rows 183px tall
- date rail 12px UPPERCASE, .3px tracking, `rgb(100,116,139)`, format "2024 — Present"
- skill pills 28px tall, radius 9999px, padding 4px 12px, 12px type, fill `rgba(45,212,191,.1)`
  on `rgb(94,234,212)` text
- ground `rgb(15,23,42)`, body text `rgb(148,163,184)`
- NOTE her accent is TEAL, which breaks the locked palette law (warm + blue DNA, blue only in the
  sky, no cool UI accent). Geometry is transcribable; the colour is not.
- her webfont did not resolve during measurement (fell back to Times), so NO type family is claimed
  — only sizes and ratios, which are face-independent

**stripe.dev awwwards entry** — the version Rod prefers is the Site-of-the-Day (Oct 9 2024) build,
which is NOT live. Its float-over-imagery treatment exists only as awwwards' preview imagery, so no
CSS can be transcribed for it. Captures are in `references/captures/stripe-dev-*`.

## One real bug found while building these, worth not rediscovering

`grid-column: span 6` sets the START, so pairing it with a separate `grid-column-start: 14` leaves
the end at `auto` and collapses the element to a single column. Use `grid-column: 14 / span 6`.
