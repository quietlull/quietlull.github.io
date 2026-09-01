## REFERENCE BRIEF - Related post card

### 1. Premise check: the stated source

`redesign-lab/extracted/components/project-cards-expensive/` exists (css 213 lines, html, js). It is **OURS**, and it says so itself. Lines 1-8 of `project-cards-expensive.css` are a self-filed **CIRCULAR CITATION banner**: the only parent it ever named was `rework-merodev-yanne.html`, an in-repo file.

Its one real external claim is `yannesidibe.com/about .glow`. **I fetched it. It does not hold.**

```
https://yannesidibe.com/about   -> HTTP 404 (Next.js 404 page)
https://yannesidibe.com/        -> HTTP 200, 4 CSS chunks fetched
  grep "glow"            -> 0 hits
  grep "mask-composite"  -> 0 hits
  grep "plus-lighter"    -> 0 hits
  grep "radial-gradient" -> 3 hits, all Tailwind bg-gradient utilities
  grep "--mx|--my|--mouse|--cursor" -> 0 hits
```
The site is now Tailwind/Next. **Nothing on the live site today matches the cited rule, and `/about` is gone.** Per LIVE SITE WINS: the band-reveal citation is dead, not just unread. Saved: `.../scratchpad/yanne-root.html`, `yanne-*.css`.

**What legitimises the component instead:** `docs/REQUESTS.md:41`, Rod 2026-08-22 - *"we made the project cards together so its ok biggest issue with them over anything else is scaling."* Origin **ROD**, objection withdrawn. Same standing as the card-grey row (`element-tracker.md:139`, "Origin ROD, so it is a taste call rather than Slop"). So the child inherits a Rod-owned taste call, not a reference.

The merged-card dependency (`merged-card/merged-card.css`) cites "Rod-provided flip-tile CodePen via rework-harumaki" - **no URL is recorded anywhere**, and `docs/REQUESTS.md:104` records CodePen returning 403 to this repo's sessions. Unverifiable, do not restate it as provenance.

---

### 2. The three deletions - verified line by line

P138's line numbers were checked against the current file. Four of five are exact; one is off.

| P138 says | Actual | Verbatim |
|---|---|---|
| blur, lines 150, 180 | **correct** | `filter: blur(2.5px);` |
| translateY, lines 97, **112**, 115 | 97 and 115 correct; **112 is `transform: none;`**, the mobile reset, not a translateY | `transform: translateY(58px);` / `transform: translateY(36px);` |
| hover box-shadow, 210-212 | **correct**, rule closes at 213 | `box-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.6);` |

---

### 3. THREE DISCREPANCIES - the treatment does not do what it says

**(a) Deleting the hover rule ADDS glow. It does not remove it.**
`project-cards-expensive.css:209-213` is a **suppressor**, and its own comment says so: *"keep the card's own static cover hover-glow out of the way"*.

```css
/* project-cards-expensive.css:210-213 */
.epx-cards .ct-glow-card:hover .card-cover {
  border-color: rgba(245, 158, 11, 0.14);
  box-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.6);
}
```
It overrides this, in the dependency:
```css
/* merged-card.css, .merged-cards .post-card:hover .card-cover */
border-color: rgba(var(--glow-border-hue, 245, 158, 11), 0.45);
box-shadow:
  0 14px 30px -10px rgba(0, 0, 0, 0.6),
  0 0 24px rgba(var(--glow-hue, 251, 191, 36), 0.3);
```
Both selectors are specificity `0,4,0`; `project-cards-expensive.css` loads second in all six host pages (`final-landing.html:29-30`, `a3-assembly.html:30-31`, `projects-aggregate.html:37-38`, etc.), so the suppressor wins on source order. **Delete it and the card gains a 24px gold bloom plus a 0.45 gold border on hover** - the opposite of "no glow". To actually remove the hover glow you must delete `merged-card.css`'s hover rule, or keep 210-213 and delete only its `box-shadow` line.

**(b) `translateY` is not a "band reveal". It is the layout.**
Lines 97 and 115 are the Studio Gohan staggered-grid zig-zag (`.epx-cards.is-staggered > *:nth-child(4n+2)`), a static offset inside a `@media (max-width: 760px)` block at 115. It carries no transition and no motion. Removing it is a **layout change**, and it only applies at all if `.is-staggered` is on the grid - which for a 3-up related row it would not be. The actual cursor band reveal is elsewhere and **survives all three deletions**.

**(c) The three deletions remove neither the glass nor the motion.**
Still live after all three cuts:
- **Glass:** `.glass-plane` (`merged-card.css`) - `inset: 8px`, `--glass-sheen` gradient, `border-left: 1px solid rgba(251,191,36,.5)`. Untouched. (No `backdrop-filter` anywhere - that one is clean.)
- **Glow:** the masked ring pseudo-elements at css:139-160 and 173-186, cursor-tracked, `mix-blend-mode: plus-lighter`, plus the 180px `color-mix(--color-glow 14%)` spill. Deleting `blur(2.5px)` only makes the ring **hard-edged** - which is exactly the "reads as a metal band" failure the file's own comment at 119-131 says was fixed by adding that blur.
- **Motion:** `.card-tilt { transition: transform .4s }`, `.z-layer { transition: transform .5s }`, `.card-flipper { transition: transform .6s }` + `rotateY(180deg)` dwell-flip, `img:hover { transform: scale(1.05) }`, `.card-title` colour/text-shadow transitions, plus `merged-card.js` rAF tilt (`rotateX/rotateY/translateY(-LIFT)/scale`), gyro, and `project-cards-expensive.js` `bindReveal` writing `--mx/--my` every cursor move.

**Cheapest honest route to Rod's actual words ("no glass and motion and glow"):** the glass plane is the host of the front reveal, so `display: none` on `.glass-plane` removes glass and front glow in one move - and `merged-card.css` already ships that switch as `.merged-cards.no-glass`. That is a fourth change, not one of the three. Flag it, do not silently take it.

---

### 4. Verbatim CSS worth keeping (all `merged-card.css` unless noted)

```css
.merged-cards .card-link {
  display: block; width: 100%; height: 100%;
  text-decoration: none; color: inherit;
}

.merged-cards .card-cover {
  position: absolute; inset: 0;
  overflow: hidden;
  background: linear-gradient(160deg, var(--cover-hi), var(--cover-lo));
  border: 1px solid rgba(245, 158, 11, 0.14);
}

.merged-cards .card-cover::after {
  content: ''; position: absolute; inset: auto 0 0 0;
  height: 62%;
  background: linear-gradient(180deg, transparent 0%, rgba(11, 16, 36, 0.62) 55%, var(--cover-lo) 100%);
  pointer-events: none;
}

.merged-cards .card-body {
  position: relative; align-self: flex-end; width: 100%;
  padding: 1.3rem 1.5rem;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
}

.merged-cards .card-title {
  font-family: var(--font-display);
  font-weight: 700; font-size: 1.7rem; line-height: 1;
  color: var(--color-gold-deep);
  margin-bottom: 0.2rem;
}

.merged-cards .card-meta {
  font-family: var(--font-body);
  font-size: 0.7rem;            /* T3-E floor */
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--color-gold-deep); opacity: 0.85;
}
```
Radius: base is `border-radius: 1rem` on `.card-cover` and `12px` on `.glass-plane`. **SQUARE BY DEFAULT means the modifier is mandatory** - `.merged-cards--square` (last rule in the file, deliberately, so it out-cascades) zeroes both. Build square from the start rather than relying on a class the host might forget.

Layout to lift from `.epx-cards.is-regular` (css:70-103): `grid-template-columns: repeat(4, 1fr)` (make it 3 for related, per `docs/REQUESTS.md:53` P9), `column-gap: 1rem`, `row-gap: 1rem`, `align-items: start`, `height: auto; min-height: 0; aspect-ratio: 1 / 1`. Note `min-height: 14rem` on `.merged-cards .post-card` is a flip-tile leftover that fights `aspect-ratio` - and **scaling is Rod's one named open complaint about the parent** (`REQUESTS.md:41`), so the child inherits it. Do not carry `min-height` forward blindly.

---

### 5. Cannot transfer under the palette law

| Declaration | Where | Problem |
|---|---|---|
| `--color-cover-hi: #1b2452` | `settings.css:42` | midnight **blue**. Card fill outside the sky. |
| `--color-cover-lo: #0b1024` | `settings.css:43` | same. |
| `rgba(11, 16, 36, 0.62)` | `.card-cover::after` | blue seating gradient. |
| `--color-muted` (`#9aa3bd`) | `.epx-note`, `.epx-ctl` | bench chrome only, but the last blue text token - never carry it into the card. |

D27 plus `element-tracker.md:139` ("Warm grey is the winner") already replaced these on every other surface: **`--color-panel: rgba(28,26,24,.55)` / `--color-panel-solid: #1c1a18`**. The card cover gradient is one of the last blue fills left in the bench. Substituting it is a colour change, so it needs Rod's word rather than a quiet swap - but building the new component on the blue tokens re-imports a dead palette.

`--color-silver: #a3a19d` is **not defined in `settings.css`** (grep: absent). `docs/REQUESTS.md:176` P139 records it as owed. If the craft stage uses it, it must declare it locally and say so.

---

### 6. Focus state - this one has real external provenance

No `:focus` or `:focus-visible` exists in `merged-card.css`, `project-cards-expensive.css`, or `foundations.css`. The card is a full-card `<a class="card-link">`. With hover stripped it is a keyboard trap for the eye: **WCAG 2.4.7 fail today, before any deletion.**

`redesign-lab/sources/focus-ring.md` is a genuine external note (Bootstrap 5.3 focus-ring helper; dev.to hybrid_alex "Better CSS outlines with box-shadows"; darekkay). Its non-negotiable base, verbatim:

```css
outline: 2px solid transparent;   /* survives Windows High Contrast Mode; NOT outline:none */
```
Its **Option B is a glow** (`0 0 12px 2px color-mix(--color-glow 45%)`) and is out here. Option A is a two-tone `box-shadow` ring - a shadow, which the treatment is trying to shed, though a focus indicator is not a resting shadow.

The parent's proposed **border-colour change costs no motion and no glow** and is measurable: rest is `rgba(245,158,11,0.14)`, so moving to `var(--color-gold)` `#fbbf24` is a large delta against the cover fill and clears the 3:1 non-text-contrast bar comfortably. Recommend: border-colour on `:focus-visible` **and** `:hover` (same declaration, one rule), plus the transparent `outline` line above for HCM. That is one rule, three declarations, zero motion.

---

### 7. Tier ruling for the craft stage

- **The card itself: OURS. Idea origin ROD.** Not "Remixed", not "True" - there is no external parent, and the one that was claimed is now provably absent from the live site. Say this plainly in the header. Do not restate yannesidibe, merodev, or the unnamed CodePen.
- **The focus indicator: Remixed, origin theirs** - Bootstrap 5.3 + dev.to hybrid_alex via `sources/focus-ring.md`.
- **Ledger is stale:** `element-tracker.md:146` still reads *"Related posts cards | Slop | theirs? | - | follows Project-cards direction"*, and `:78` describes a different card entirely (hana panel + john_r_muir ignite), not this bench component. Both rows need correcting to match Rod's 2026-08-22 withdrawal.

### 8. Reduced motion

`merged-card.js:193,225` gates tilt/gyro on `prefers-reduced-motion`. **The CSS transitions have no reduced-motion path at all** - only `.dwell-ring.is-filling` does. If the built component ends up genuinely motionless, this is moot; if any transition survives, it needs the media query the parent never had.