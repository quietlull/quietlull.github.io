Premise verified against the live site. Here is the brief.

---

# REFERENCE BRIEF: Heading anchor (Maxime Heckel)

## 1. Premise check: CONFIRMED, byte-for-byte

`sources/maximeheckel-prose.md` exists and covers this component directly (section "heading", note lines 211-230). I re-fetched the live site rather than trusting the note.

- Article: `https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/` (1,415,500 bytes)
- Stylesheet: `https://blog.maximeheckel.com/_next/static/css/266efdc9435911cb.css?dpl=dpl_D55AwAuhiG9aofCjTHPmq72NeKkp` (27,821 bytes). Same build hash the note recorded, still the only `_next/static/css` file linked.
- The four rules appear at byte offset 25555, in one contiguous run, in exactly the claimed order, with exactly the claimed declarations.

**No discrepancy between the note and the live site.** The note is accurate. Local copies: `C:\Users\Rod\AppData\Local\Temp\claude\C--Users-Rod-Documents-ProjectFiles-Website\5b134360-884e-4a99-88bf-dcdb6d975d1c\scratchpad\mh-main.css` and `mh-article.html`.

## 2. Verbatim CSS (THEIRS, live-confirmed)

```css
.anchor-link{--anchor-border-color:transparent!important;opacity:0;text-decoration:none!important;transition:opacity .2s ease;margin-left:.33rem;display:inline-flex;align-items:center;vertical-align:middle;color:var(--text-tertiary)}
h2,h3{scroll-margin-top:6.6rem}
h2:hover .anchor-link,h3:hover .anchor-link,h4:hover .anchor-link{opacity:1}
.anchor-link:focus-visible{opacity:1;color:var(--accent)}
```

Not wrapped in `@media (hover:hover)`. Bare, as quoted.

Verbatim markup (live, from the first `<h2>`), giving the chain-link icon as a real external snippet:

```html
<a href="#painterly-post-processing-with-the-kuwahara-filter" class="... anchor-link space-window-top"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="16" height="16" class="anchor-icon"><path d="M10 19.0004L9.82843 19.1719C8.26634 20.734 5.73368 20.734 4.17158 19.1719L3.82843 18.8288C2.26634 17.2667 2.26633 14.734 3.82843 13.1719L7.17158 9.8288C8.73368 8.2667 11.2663 8.2667 12.8284 9.8288L13.1716 10.1719C13.8252 10.8256 14.2053 11.6491 14.312 12.5004" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.68799 12.5004C9.79463 13.3516 10.1748 14.1752 10.8284 14.8288L11.1715 15.1719C12.7336 16.734 15.2663 16.734 16.8284 15.1719L20.1715 11.8288C21.7336 10.2667 21.7336 7.73404 20.1715 6.17194L19.8284 5.8288C18.2663 4.2667 15.7336 4.2667 14.1715 5.8288L14 6.00037" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
```

`stroke="currentColor"` means the icon inherits the `color` declaration for free. `space-window-top` and `.anchor-icon` have zero CSS rules in the live sheet (dead hooks).

## 3. Theirs vs ours

**Genuinely THEIRS (transfers as True):** `opacity:0` at rest with the element still occupying layout so the heading never reflows; reveal driven by hovering the *heading*, not the mark, so the hit area is the whole heading; `transition:opacity .2s ease`; `margin-left:.33rem`; the `inline-flex / align-items:center / vertical-align:middle` trio that seats an icon in a text baseline; `:focus-visible` as a co-equal reveal trigger; `scroll-margin-top` on the heading as the paired half; the chain-link SVG path data.

**OURS (must be declared as departures):** both colours; the icon glyph if it is not the chain; the `scroll-margin-top` *value*; whatever cancels our own link chrome.

## 4. What cannot transfer under palette law

Both of their colour slots are blue-hued and are blocked:

| Their token | Resolves to (dark theme, live) | Verdict |
|---|---|---|
| `--text-tertiary` = `--gray-1000` | `oklch(66.65% 0.04 262.04)` | Hue 262 = blue-violet tinted grey. This is the `--color-muted #9aa3bd` failure mode exactly. **Blocked.** Use `--color-silver #a3a19d`. |
| `--accent` = `--blue-800` | `oklch(61.53% 0.1675 262.04)` | Saturated blue. **Blocked** (no cool accent outside the sky). Use `--color-gold #fbbf24`. |

Also drop `--anchor-border-color:transparent!important` as written: it is a Stitches-specific cancel for `.c-kySERo-iGeyqa-underline-true`, a selector that does not exist here. Its *purpose* must be reproduced with our own cancel (see 5b).

## 5. Findings the craft stage has to act on

**a) `scroll-margin-top: 6.6rem` is calibrated to THEIR nav and breaks on ours at two of three breakpoints.**

Our bar tokens (`extracted/components/top-bar/top-bar.css:9-12` and the scaling ladder at :152, :249). Full bar = `--top-bar-height + --top-bar-border * 2`:

| Tier | Full bar | `6.6rem` (105.6px) leaves |
|---|---|---|
| >=781px | 96px | +9.6px clearance, correct |
| <=780px | 107.6px | **-2px, heading tucked under the bar** |
| <=560px | 123.6px | **-18px, heading covered** |

The bar is genuinely sticky: `final-post.html:175` is `.top-bar{position:sticky;top:0;z-index:60}`, so the premise is real and the failure is real.

Derive it instead, which is already the house pattern for exactly this problem at `final-post.html:228`:

```css
scroll-margin-top: calc(var(--top-bar-height, 5.875rem) + var(--top-bar-border, 1px) * 2 + 0.6rem);
```

At desktop this evaluates to 105.6px, i.e. it **reproduces their 6.6rem exactly** and self-corrects at the two stacked tiers. The fallbacks matter because `decisions.css` can load on pages that do not link `top-bar.css`.

**b) Our `.prose a` overrides the anchor's colour outright, and adds chrome theirs did not have.**

`decisions.css:173-183`:
```css
.prose a { color: var(--color-text, #f5f3ef); border-bottom: 1px solid var(--color-line, rgba(251,191,36,.26)); ... }
.prose a:hover, .prose a:focus-visible { background-color: var(--color-gold, #fbbf24); color: var(--color-panel-solid, #1c1a18); }
```

The anchor is an `<a>` inside `.prose h2`, so it is a `.prose a`. Specificity: `.prose a` is (0,1,1), `.d-anchor` is (0,1,0), and `.prose a` also comes later in the file. Consequences:

- The anchor's `color` declaration is **dead**. It renders `--color-text`, not the intended muted tone.
- It inherits a **gold hairline border-bottom** under the mark. Their `--anchor-border-color:transparent!important` was precisely the cancel for this; our port dropped that half and did not replace it. Meanwhile the `text-decoration:none!important` that survived is fighting nothing, since `.prose a` already sets `text-decoration:none`.
- `:focus-visible` gets a **gold filled block** behind the mark from `.prose a:focus-visible`, not theirs' colour swap. That may be a good focus indicator, but it is a call to make, not a thing to inherit by accident.

Craft needs an explicit cancel at winning specificity, e.g. scoping to `.prose h2 .d-anchor` / `:is(...) .d-anchor`, or setting `border-bottom: 0` and the colour on a selector that beats (0,1,1).

**c) `--color-muted-warm` does not exist.** Used 3x in `decisions.css` (:79, :102, :128), defined nowhere in the lab. Every use silently falls back to the literal `#8a8a8a`, which is not an approved token. `--color-silver: #a3a19d` is defined (`decisions.css:20`) and is the intended warm equivalent.

**d) Their own h4 asymmetry.** `h4:hover .anchor-link{opacity:1}` reveals on h4, but `scroll-margin-top` covers only `h2,h3`. So an h4 anchor on their site jumps under their own nav. Do not copy that; pick one heading set and apply both halves to it.

**e) The glyph is an open slot.** Rod judged variant A at `text-decisions.html:710-745`; its demo used a plain `#` character (`<span class="a">#</span>`), not the chain SVG. What was picked is the *behaviour*. The chain-link SVG above is available as a True-tier external snippet if wanted, but the mark itself has not been decided.

## 6. State of play

- No `.d-anchor` markup exists on any lab page (`final-post.html`: 0 hits, `post-aggregate.html`: 0 hits). Nothing to migrate.
- `decisions.css:118-141` already carries a `.d-anchor` port from today, with the three defects in 5a/5b/5c. It is off-limits to edit; the craft stage builds a corrected version under `extracted/components/`.
- No files were written this stage, per instruction.

**Tier: True** (geometry, mechanism, transition, timing and structure all lift verbatim from a live external sheet). **Idea origin: theirs.** The departures in 5a-5c are corrections forced by our palette and our bar, not new design.