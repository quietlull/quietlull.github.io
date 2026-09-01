# A3 assembly — analysis, fixes applied, and decisions waiting on Rod

Page: `redesign-lab/a3-assembly.html` (switcher bottom-centre, provenance panel left).
Real workbench components in each verified A3 layout, over the live lantern scene / hana bloom.
Missing pieces are drawn with the **blockout's own greybox placeholder** (`.box` + `.fill`, dashed
#555 on #1b1b1b) so nothing invented reads as finished. Nothing new was designed for this page.

## What is real vs reserved

REAL components (from `extracted/`): top-bar (square favicon, nav, square slap toggles) · hero
(logo, tagline, goo scene switch, chevron, social rail) · project-cards-expensive (square bento,
pink star pins, drift+magnet+band-reveal+tilt, video on hover) · draw-in-icons (8 skills, magnet +
cursor recolour) · slap-toggle (skill flipper) · list-controls (filter chips) · reel-band ·
site-footer · the three.js scene + hana bloom pair.

BUILT 2026-08-13 (was reserved; each transcribed from the source site's own CSS, which was
re-fetched for the purpose — see `element-tracker.md` for the per-element provenance rows):

| Component | Needed by | Source | State |
|---|---|---|---|
| **seam-band** `--tiled` (160px) | a3seam (×3) | ndt `.borderpink`/`.borderblue`/`.bordernavy` | mechanism done, ARTWORK owed |
| **seam-band** `--sheet` (96px) | a3main | harumaki main `img.top_hr_cloud` | mechanism done, ARTWORK owed |
| **edge-rails** (106px, both edges) | a3rails | /10/ `.left`/`.right` (their カーテン block) | mechanism done, ARTWORK owed |
| **dated-timeline** | a3rails | /10/ `.handmade_*` | DONE (rule strip art optional) |
| **picture-frame** | a3frame | 109ichiki `._frame` | DONE, one taste call open |

STILL RESERVED with a blockout placeholder:

| Missing | Needed by | Why it is not built |
|---|---|---|
| **In-scene identity art** (mark + character on the ground) | a3main | It is artwork, not code, and it belongs to the character-scene track. Nothing to transcribe. |
| Floating-window motif | a3frame | decoration only, no space reserved |

**The pattern worth remembering:** three of the four devices are *painted PNGs* on the source
sites, not CSS. So what a component can own is the mechanism (tile, pin, scale, mask) plus an art
slot: each takes a `url()` in a CSS variable (`--seam-art`, `--rail-art`, `--tl-rule`) and degrades
to a plain rule until real art exists. The layouts are now judgeable on spacing and rhythm without
anyone having drawn anything, and the art becomes one clearly scoped drawing task.

## Fixes already applied (clear, not subjective)

1. **a3main no longer deletes the second card row.** It was `display:none`, which broke your rule
   that the information flow is fixed — a layout may reshape a section, never remove one. It is now
   a second, shorter strip. Verified: all 12 flow sections survive in **every** variant.
2. **a3seam now shows a seam at every transition** (3), not just one — that is what ndt does.
3. **Placeholders switched to the blockout's greybox language** (was an invented amber style).
4. **a3frame's "floating window" entry** relabelled as decoration, since it reserves no space —
   the missing-list should not imply a gap that isn't there.

## Fonts — scanned from the live sites, applied per variant

Computed (not declared) via CDP; also added to the gallery as filter tags (19 font tags across 21 cards).

| Variant | Source font | Used here |
|---|---|---|
| a3main | Trirong (serif) | Shippori Mincho |
| a3seam | **M PLUS Rounded 1c** | exact match, already in the lab |
| a3rails | Zen Old Mincho | Shippori Mincho |
| a3frame | **IBM Plex Mono** (their entire site, headings included) | exact match |
| a3zones | Lato | Lato |
| spec / hybrid | — | lab default |

**Finding worth your attention:** the whole harumaki family renders in **mincho / serif**
(Trirong, Yu Mincho, Noto Serif JP, Zen Old Mincho) — only ndt is the rounded sans. Your locked
type call is "scribbly hand-drawn name + clean mono, **no serif**". Your favourite sites are
serif-heavy. That is a real conflict, not a detail.

## Fixes applied during the component build (2026-08-13)

5. **a3frame's top bar now sits INSIDE the frame** (`top:20px; margin:20px 20px 0`). It was sticky
   at `top:0`, so it covered the gutter type and crossed the frame line. 109 puts its own menu
   inside the frame (`top: padding-outside + 1.40625rem`), so this is the faithful fix, not a
   workaround.

## NEW DECISIONS FROM THE BUILD

8. **Artwork for the three painted devices.** The seam strip, the cloud sheet and the rail
   illustrations are PNGs on the source sites. Do you draw them, do we source them, or do we go
   art-free and let the seam/rails stay as rules? Nothing else is blocked either way.
9. **Picture frame: opaque band or stroke only?** 109's frame paints the band outside it with the
   page background. Faithful, but it crops the lantern scene. The assembly currently runs
   `--open` (stroke only). One class swaps it.
10. **Timeline content.** It currently carries three real-sounding log entries in your voice as
   placeholders. If a3rails survives the cull, that section needs actual entries (it maps to
   ramblings, not projects).

## DECISIONS FOR YOU

1. **Serif vs no-serif.** Your S-tier references are mincho/serif; your locked rule says no serif.
   Keep the rule, or admit a Japanese-style mincho for headings only? (a3main and a3rails currently
   preview Shippori Mincho so you can see it.)
2. **Which layouts survive?** Six are live: spec · a3main · a3seam · a3rails · a3frame · a3zones ·
   hybrid. Name the keepers and I will cull the rest.
3. **Hybrid check.** It replaces A3-hana: spec rhythm and heights, content pulled into an 820px
   centred column on a soft panel, 90px before the skills/reel headers, and **no** full-screen
   footer (the weakest part of A3-hana). Right amount of hana, or push further either way?
4. **Build order for the missing components** — the table above. My suggestion: seam band first
   (cheapest, unlocks a3seam completely), then edge rails, then the timeline. Your call.
5. **a3frame drops "View all"** because 109 has no such affordance. Keep it dropped, or keep the
   link and accept the deviation?
6. **a3main's fold crop.** The card strip deliberately breaks the 1080 line (854→1254) so a slice
   invites the scroll, which means the row is *never* fully visible on screen 1 — the opposite of
   your original spec where it fits exactly. Which do you want?
7. **Scene bottom height varies by variant** (70vh–110vh). Should this be constant across layouts,
   since it is your own signature moment rather than a borrowed one?
