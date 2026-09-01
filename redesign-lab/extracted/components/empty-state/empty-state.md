# Empty state

Shown when a search or a filter returns nothing. Three versions, all built to the measured
reservation: **930 x 60** (projects) and **1351 x 60** (ramblings). Height 60 on both.

Demo: `/redesign-lab/extracted/index.html?c=empty-state`
(served: `http://localhost:4000/redesign-lab/extracted/index.html?c=empty-state`)

---

## The source, and the claim that had to be checked first

`rework-hana-ledger.md:53` files this element as **Remixed / "PatternFly (source pulled)"**.
There is **no `sources/patternfly-*.md` in the lab**. The claim pointed at nothing, so it was
checked rather than trusted.

PatternFly is a real, public, open-source design system, so the check was possible. Fetched and
read this session:

| file | bytes | what it gave |
|---|---|---|
| `unpkg.com/@patternfly/patternfly/components/EmptyState/empty-state.css` (v6.6.1) | 7,960 | the component |
| `unpkg.com/@patternfly/patternfly@6.6.1/base/patternfly-variables.css` | 258,176 | the token values |

Every PatternFly number used below was resolved through their token chain to a literal, not read
off a variable name:

```
spacer--md = spacer--300 = 1rem        m-xs title = heading--xs = size--md = size--300 = 1rem
spacer--sm = spacer--200 = 0.5rem      size--sm   = size--200 = 0.875rem
spacer--xs = spacer--100 = 0.25rem     heading line-height = line-height--100 = 1.3
m-xs content MaxWidth    = 21.875rem   heading weight      = weight--300      = 600
```

**The claim survived, and one detail of it was false.** The canonical ledger note says the
PatternFly empty state has **no dashed border**. Confirmed as real absence evidence rather than a
summary: grep for `border|background|radius` across the entire 7,960-byte file returns **zero
hits**. So the `1px dashed` box in `list-controls/list-controls.css` is **not** PatternFly's. It is
ours, and that file's own header already says so.

A second, verified source is used for the row geometry in V2 and V3: **TheRealMJP**, read live this
session from `therealmjp.github.io/css/style.min.4bc523c6...css` (17,516 bytes). The two rules
quoted are from their **list**, not their prev/next:

```
.posts-group .post-item a{display:flex;justify-content:space-between;align-items:baseline;padding:12px 0}
.posts-group .post-day  {flex-shrink:0;margin-left:1em;opacity:.6}
```

---

## What was reused rather than rebuilt

`extracted/components/list-controls/` already ships `.list-controls__empty`. **Its CSS is not
reused**, and the reasons are mechanical rather than taste:

1. its own header declares it a circular citation and Slop;
2. it uses `--color-muted` (#9aa3bd), the last blue in the token set, banned by the palette law;
3. `border-radius: 10px`, against the square rule;
4. it renders roughly 130px tall inside `max-width: 560px`. The reservation is 60 x 930/1351.

**What IS carried across is the content model** (heading, next step, action link) and that model
belongs to PatternFly (`__title-text` / `__body` / `__footer > __actions`), not to the bench file.

Also reused, and named so the duplication is a choice rather than an accident:

- the action link is **decisions.css `.prose a` copied verbatim** (stripe.dev, CONFIRMED, your pick
  2026-08-23). Duplicated because an empty state is not inside `.prose`, and `.prose` carries a
  767px measure that would fight a 930/1351 box. **Adding `.es__action` to that selector list in
  decisions.css deletes this whole block.**
- the focus ring is **not declared at all**. The global one at `extracted/styles/generic.css:25`
  (sourced in `sources/focus-ring.md`) already covers it. Same call `prevnext-real.css` made.

---

## Where the copy comes from

The brief said this needs real copy, not "No results". It does not have to be invented: **the live
site already writes contextual empty-state copy and branches it four ways**, at
`_javascript/modules/components/post-filter.js:123-146`.

| branch | live sentence | file:line |
|---|---|---|
| tags + query | `No ${tags} projects matching "${query}"` | post-filter.js:130 |
| tags only | `No ${tags} projects yet - more coming soon!` | post-filter.js:133 |
| query only | `No projects matching "${query}"` | post-filter.js:136 |
| neither | `No projects match your filters.` | post-filter.js:139 |
| ramblings, nothing published | `Nothing here yet. Check back later!` | `_layouts/ramblings.html:93` |

So **the title line in every version is your own sentence, origin ROD**. Two changes, both logged:

- the live "yet - more coming soon!" carries an **em dash**. House rule says none, so it is a comma.
- the live copy has **no second line at all**. The next-step sentence sitting in PatternFly's
  `__body` slot is **new, and the words are mine**. That is the one thing on this page that is
  Claude-origin copy, and it is the first thing to rewrite.

The demo carries a block at the bottom listing all four branches with my proposed second lines, so
the copy can be judged separately from the layout.

---

## Version 1 - CENTRED STACK

**Tier: Remixed. Idea origin: theirs (PatternFly) + Rod (copy).**
The closest thing to the source that fits the box. Two lines in a 350px centred column.

**Verbatim from PatternFly**
- the four container declarations: `display:flex; align-items:center; justify-content:center;
  text-align:center`
- `padding-inline: 1rem` (their `.pf-m-xs` padding, spacer--md)
- `.es__content { max-width: 21.875rem }` (their `.pf-m-xs` content width, 350px)
- title `font-size: 1rem` (their m-xs `heading--xs`) and `line-height: 1.3` (their heading
  line-height)
- body margin `0.25rem` is their `spacer--xs`, their own smallest step

**Ours**
- `padding-block: 0` plus `min-height: 60px` with `align-items:center` doing the vertical centring.
  Theirs is `padding-block: 1rem` on `.pf-m-xs`, and 16 + 20.8 + 16 + 18.2 + 16 is 87px in a 60px
  box. **This substitution is the single biggest departure in the component.**
- the **step down** from their 1rem body margin to their 0.25rem one. The value is theirs, the
  choice of step is ours.
- the action link lives **inside the second sentence** ("Try a shorter word, or *show all 12
  projects*."). PatternFly puts it in a separate `__footer` with its own 1rem top margin, which
  costs a third line the box does not have.

**Could not transfer**
- their title `font-weight: 600`. decisions.css takes stripe's confirmed rule that hierarchy is
  size and tracking and never weight, which is why nothing in that file is bold. 600 would be the
  boldest thing on the whole index page. Held at 300.
- their body `font-size: 1rem` (`body--lg`). Dropped one step to their own `size--sm` (0.875rem) so
  two lines clear 60px.
- their `text--color--subtle` grey. Ours is `--color-silver` (7.40:1, measured in decisions.css).
  `--color-muted` is not used anywhere in this component.
- the `__icon` slot. See the open questions.

**Measured at 1440:** box **930 x 60** and **1351 x 60**. Content 42.98px, **17.02px of air**.
**FITS.**

---

## Version 2 - CENTRED ROW

**Tier: Remixed. Idea origin: theirs (PatternFly + TheRealMJP) + Rod (copy).**
Title, next step and action all on one centred line. The action stays its own element, which is
closer to how PatternFly actually structures the footer than V1 is.

**Verbatim from PatternFly**
- the whole layout rule, lifted off their `__actions` block and applied to the whole content
  instead of only the buttons: `display:flex; flex-wrap:wrap; gap:0.5rem 1rem;
  justify-content:center`. Both gap values resolved from their spacer tokens
  (`gap--group--vertical` = spacer--sm = 0.5rem, `gap--action-to-action--default` = spacer--md =
  1rem).
- `max-width: none` is their own default `__content--MaxWidth`.

**Ours / borrowed elsewhere**
- `align-items: baseline` is **TheRealMJP's list row**, not PatternFly's. Borrowed because it is
  the same problem: a row of text at two sizes that has to share one baseline.
- applying an *actions* rule to *all* the content is our decision, not a rule they wrote.

**Could not transfer**
- same three as V1 (weight 600, body 1rem, subtle grey), same reasons.

**Measured at 1440:** box **930 x 60** and **1351 x 60**. Content 28.19px, **31.81px of air**.
**FITS**, and it stays on one line at both widths.

Note on narrow viewports: `min-height` is a floor, not a cap. Below roughly 560px this row wraps to
two lines (about 47px of content) and the box is allowed to grow rather than clip. The reservation
was measured at 1440 only, so nothing below that is under contract.

---

## Version 3 - SPLIT ROW

**Tier: Remixed. Idea origin: theirs (PatternFly content + TheRealMJP geometry) + Rod (copy).**
Message hard left, action hard right. **The only version that actually uses the width**, and the
only one whose rhythm matches the list it sits at the bottom of.

**Verbatim from TheRealMJP** (read live this session)
- `display:flex; justify-content:space-between; align-items:baseline; padding:12px 0` from
  `.posts-group .post-item a`
- `flex-shrink:0; margin-left:1em` from `.posts-group .post-day`

Taken from their **list row** rather than their prev/next on purpose: an empty state sits in a list,
so it should inherit the list's own left/right rhythm.

**From PatternFly**
- the content model (title / body / action) and `max-width: none`.

**Ours**
- `text-align: left`. PatternFly centres; a split row cannot be centred.

**Could not transfer**
- their `opacity: .6` on the right-hand item. Opacity over a live three.js scene is not a colour,
  it is a window onto whatever is behind it. The silver token carries the same role at a contrast
  that was actually measured.
- their `border-bottom: 1px #7d828a dashed` row rule. This is the closest **real external** dashed
  hairline in the whole set, and it is the nearest thing to the dashed box you kept in rework-hana,
  but on their site it is a **row separator**, not a box around an empty state. Noted, not built.
  See the open questions.

**Measured at 1440:** box **930 x 60** and **1351 x 60**. Content 28.19px plus their 12px top and
bottom padding = 52.19px, **7.81px of air**. **FITS.**

---

## Accessibility and motion

- `role="status"` on the box in all three. The live site announces **nothing** when a search empties
  the grid: `post-filter.js:142` writes `innerHTML` into a plain `div`, so a screen reader user gets
  silence. This is an addition and it is a WCAG requirement rather than a style choice, so it is
  flagged rather than slipped in.
- `prefers-reduced-motion: reduce` removes the action link's `transition: background-color 0.1s
  linear`. That is the only animated property in the component.
- No `backdrop-filter`, no blur, no `box-shadow`, no fill of any kind. Nothing here competes with
  the scene: the component is text on the ground.
- Contrast, using values already measured in decisions.css: title `--color-text` 17.31:1, body
  `--color-silver` 7.40:1. `--color-muted` (#9aa3bd) appears nowhere.

---

## Open questions for Rod

1. **The icon.** PatternFly has an `__icon` slot and your live site fills it with Font Awesome
   (`fa-search`, `fa-filter`, `fa-inbox`, `fa-coffee`). Neither survives the port: FA is not
   shipping, and drawing a replacement glyph would be unsourced. **None of the three versions has an
   icon.** Do you want one, and if so from where? At 60px it would have to sit inline beside the
   text, not stacked above it the way PatternFly does.

2. **The second line is my writing.** The title lines are yours. The next-step lines are not. The
   demo lists all four branches at the bottom so you can rewrite them in one pass.

3. **The dashed border.** You kept one in rework-hana. PatternFly has none, and that is now verified
   absence rather than an assumption. The only real external dashed precedent found is TheRealMJP's
   **row separator** hairline. Options: no border at all (built), or a dashed hairline *above and
   below* the band borrowed from their list. Say which and it gets built.

4. **V3 at 1351 throws the action a long way from the message.** That is the point of the version,
   and it echoes the ramblings list's own left/right rows, but it is a genuinely long throw. Worth
   your eye specifically at the ramblings width.

5. **Two golds in one 60px box** in V2 and V3: the echoed query takes the emphasis yellow and the
   action link carries the gold hairline plus the gold fill on hover. One too many?

6. **"Show all 12 projects" implies a live count.** Your `post-filter.js:77` also renders a
   `Showing X of Y projects` counter. That counter has **no reservation in either blockout**. Is it
   surviving the redesign? If not, the action should read "Show all projects".

7. **A blockout label disagrees with the blockout's own geometry, again.** Two of the four projects
   variants label this slot `EMPTY STATE - one 300x300 cell` / `one 300x300 tile`
   (`projects-blockout.html:240` and `:262`) while the box they draw renders **930 x 60**. This is
   the same class of mismatch the blockout contract already logged as finding 1. Built to the
   measurement, per the contract. **But if the winning projects variant really wants the empty state
   to occupy one grid cell rather than a full-width band, that is a different component and I should
   build it rather than re-fit this one.**

---

# Appendix: reasoning moved out of the stylesheet, 2026-08-25

Moved from `_sass/components/_empty-state.scss` under D45 (comments get short). Original wording,
kept because it is the provenance record. The stylesheet points here.

## The header

> empty-state - the "your search/filter returned nothing" block.
> Built 2026-08-23. Reservation: 930 x 60 (projects) and 1351 x 60 (ramblings). Height 60 both.

### What the ledger claimed, and what was actually there

> rework-hana-ledger.md:53 files this as "Remixed / PatternFly (source pulled)". There is NO
> sources/patternfly-*.md in the lab. The claim pointed at nothing, so it was checked instead of
> trusted. PatternFly is a real, public, open-source design system, so the check was possible:
>
>   FETCHED 2026-08-23, 7,960 bytes:
>   https://unpkg.com/@patternfly/patternfly/components/EmptyState/empty-state.css   (v6.6.1)
>   https://unpkg.com/@patternfly/patternfly@6.6.1/base/patternfly-variables.css     (tokens)
>
> Every PatternFly value quoted below was resolved through their token chain to a literal, not
> guessed. The chains, so they can be re-walked:
>   spacer--md  = spacer--300           = 1rem
>   spacer--sm  = spacer--200           = 0.5rem
>   spacer--xs  = spacer--100           = 0.25rem
>   m-xs title  = heading--xs = size--md = size--300 = 1rem
>   size--sm    = size--200             = 0.875rem
>   heading line-height = line-height--100 = 1.3
>   heading weight      = weight--300      = 600
>   m-xs content MaxWidth                  = 21.875rem
>
> THE CLAIM SURVIVED, AND ONE DETAIL OF IT WAS FALSE. The ledger's canonical note says the
> PatternFly empty state has NO dashed border. Confirmed as REAL ABSENCE EVIDENCE, not a summary:
> grep for border|background|radius across the whole 7,960-byte file returns ZERO hits. So
> `list-controls.css`'s `1px dashed` box is NOT PatternFly's - it is ours, and its own header
> already admits the component has no external provenance.

### What is reused rather than rebuilt

> `extracted/components/list-controls/` already ships `.list-controls__empty`. It is NOT reused
> as CSS and the reasons are concrete, not stylistic:
>   1. its own header declares it CIRCULAR CITATION / Slop;
>   2. it uses --color-muted (#9aa3bd), the blue the palette law rules out;
>   3. border-radius: 10px, against the square rule;
>   4. it renders roughly 130px tall at max-width 560px. The reservation is 60 x 930/1351.
> What IS carried over from it is the CONTENT MODEL - heading, next step, action link - and that
> model is PatternFly's (__title-text / __body / __footer > __actions), not the bench file's.

### Where the copy comes from

> Not invented. The live site already writes contextual empty-state copy and branches it four
> ways, at `_javascript/modules/components/post-filter.js:123-146`:
>   tags + query -> No {tags} projects matching "{query}"
>   tags only    -> No {tags} projects yet - more coming soon!
>   query only   -> No projects matching "{query}"
>   neither      -> No projects match your filters.
> and `_layouts/ramblings.html:93` -> Nothing here yet. Check back later!
> So the TITLE line in every version below is the live site's own sentence, origin ROD.
> TWO CHANGES TO IT, both logged:
>   - the live "yet - more coming soon!" carries an em dash. House rule: no em dashes. Comma.
>   - the live copy has NO second line. The next-step sentence is NEW and is CLAUDE's words in
>     PatternFly's __body slot. Flagged in the .md for Rod to rewrite in his own voice.

(The four branches above are template literals in the source; the braces stand in for the
JavaScript interpolation so this file stays plain text.)

### Tier, and the missing icon

> V1 Remixed, V2 Remixed, V3 Remixed. Nothing here is True: the source is a 2rem-padded
> centred stack and every version had to be compressed into a 60px band, which is ours.

> PatternFly has an `__icon` slot (2xl, subtle colour, 1.5rem below it) and the live site fills it
> with Font Awesome (`fa-search`, `fa-filter`, `fa-inbox`, `fa-coffee`). Neither transfers: FA is
> not shipping with the redesign, and drawing a replacement glyph would be unsourced. No icon is
> drawn in any version rather than inventing one.

## The shared shell

> The four container declarations are PatternFly's `.pf-v6-c-empty-state` verbatim.
> padding-inline is their `.pf-m-xs` value (spacer--md). padding-block is NOT: theirs is also
> 1rem, and 1rem + 1rem + a 20.8px line + a 16px body margin + an 18.2px line is 90px in a 60px
> box. So the vertical padding is dropped to 0 and `min-height` + `align-items:center` do the
> centring instead. THAT SUBSTITUTION IS OURS and is the single biggest departure in the file.
> min-height, not height: the reservation is a floor measured at 1440, and below about 560px the
> row versions wrap to a second line and the box must be allowed to grow rather than clip.

### [hidden] had to be given back its win

> `hidden` HAS TO WIN, and it did not. The UA gives [hidden] `display:none`, but a class rule
> with the same origin beats an attribute presentation hint, so `display:flex` here overrode it
> and the empty state rendered ANYWAY. Measured on final-ramblings: the "no ramblings matching
> ..." message was on screen under eight visible rows, every child visible and opaque, and
> role="status" was announcing it. This is a correctness bug, not a look.

## The parts

> PatternFly `.pf-m-xs` --content--MaxWidth: 21.875rem (350px), verbatim. Overridden in the two
> row versions to their own default `none`, which is also verbatim.

> TITLE - their `__title-text`. Size and line-height verbatim.
> ONE DEPARTURE: their font-weight is 600. decisions.css takes stripe's confirmed rule that
> hierarchy is size and tracking and NEVER weight, which is why nothing in that file is bold.
> 600 would be the single boldest thing on an index page, so it becomes 300.
> COLOUR: their title takes the page's default text colour, so ours takes --color-text, measured
> at 17.31:1 against the reading well in decisions.css.

> the echoed tag and query. --emphasis-color is decisions.css's settled name for the H2 yellow
> that bold already takes, so this introduces no new accent. Weight held at 300 for the reason
> directly above - the emphasis is carried by colour, not by weight.

> BODY - their `__body`. Their colour role is text--color--subtle, which maps onto our silver
> (7.40:1, measured in decisions.css). --color-muted is NOT used here: it is the last blue in the
> token set and the palette law bans it.
> ONE DEPARTURE: their body is 1rem (body--lg). Dropped one step to their own size--sm so the
> two-line stack fits 60px. The step is ours; the value is theirs.
> weight / line-height / letter-spacing are decisions.css's settled body rule (stripe, CONFIRMED)
> so the sentence reads identically to prose body copy elsewhere on the site.

> ACTION - PatternFly's `__actions` slot, but the LOOK is not theirs: their action is a Button
> component, and this site does not put a button in a list index.
> These four declarations are decisions.css `.prose a` copied VERBATIM (stripe.dev, CONFIRMED,
> picked by Rod 2026-08-23) - the highlighter link that fills gold and flips the text to the
> panel colour. Duplicated rather than referenced because an empty state is not inside `.prose`
> and `.prose` also carries a 767px measure that would fight the 930/1351 box.
> ANTI-BLOAT NOTE, so the duplication is a choice and not an accident: if Rod prefers, adding
> `.es__action` to decisions.css's `.prose a` selector list deletes this whole block.
> `position: relative` from that rule is NOT carried - it is inert there and would be inert here.

> FOCUS RING: deliberately not declared. The global ring already exists at
> extracted/styles/generic.css:25 and is sourced in sources/focus-ring.md. Re-declaring it would
> be duplicate code for no gain (D5). Same call prevnext-real.css made.

That global ring has since shipped, in `_sass/base/_focus-ring.scss`.

## The three versions

### V1 - centred stack

> The closest thing to PatternFly that fits.
> Two lines in a 350px centred column, exactly their shape, vertically compressed.
> The action lives INSIDE the second sentence rather than in their separate `__footer`, because
> `__footer` costs its own 1rem top margin plus a third line and the box only has 60px. Putting
> it inline is OURS.
> MEASURED CONTENT HEIGHT: 20.8 (title) + 4 (margin) + 18.2 (body) = 43.0px inside 60px.

> their `__body--MarginBlockStart` is spacer--md (1rem). Stepped down to spacer--xs (0.25rem),
> which is PatternFly's own smallest spacer, so the value is still theirs and only the STEP is
> ours. 1rem here would push the stack to 55px of content and leave 2.5px of air.

### V2 - centred row

> Title, next step and action on ONE centred line.
> The layout rule is PatternFly's own `__actions` block, verbatim, applied to the whole content
> instead of just the buttons:
>     display:flex; flex-wrap:wrap; gap:<RowGap> <ColumnGap>; justify-content:center;
> with RowGap = spacer--gap--group--vertical = spacer--sm = 0.5rem and
>      ColumnGap = spacer--gap--action-to-action--default = spacer--md = 1rem.
> `max-width:none` is their own default `__content--MaxWidth`, also verbatim.
> align-items:baseline is NOT theirs - it is TheRealMJP's list row
> (`.posts-group .post-item a{...align-items:baseline...}`, read live from
> therealmjp.github.io/css/style.min.4bc5....css this session). Borrowed because this is the same
> situation: a row of text at two different sizes that has to sit on one line.
> MEASURED CONTENT HEIGHT: one line, 20.8px inside 60px. If it wraps to two, 47px. Still inside.

### V3 - split row

> Message hard left, action hard right. The only version that uses the width.
> GEOMETRY IS TheRealMJP'S LIST ROW, read live this session and quoted here in full:
>     .posts-group .post-item a{display:flex;justify-content:space-between;align-items:baseline;
>                               padding:12px 0}
>     .posts-group .post-day{flex-shrink:0;margin-left:1em;opacity:.6}
> Taken from their LIST, not their prev/next - the empty state sits in a list and inherits the
> list's rhythm, which is the whole argument for this version.
> TWO THINGS NOT TAKEN:
>   - their `opacity:.6` on the right-hand item. Opacity over a live three.js scene is not a
>     colour, it is a window onto whatever is behind. The silver token carries the same role at a
>     contrast that was actually measured.
>   - their `border-bottom:1px #7d828a dashed` row rule. It is a real external dashed hairline and
>     it is the closest thing in the set to the dashed box Rod liked in rework-hana, but it is a
>     ROW SEPARATOR on their site, not a box around an empty state. Noted in the .md, not built.
> text-align:left is OURS: PatternFly centres, and a split row cannot be centred.
> MEASURED CONTENT HEIGHT: 12 + 20.8 + 12 = 44.8px, and min-height 60 wins. Inside 60px.
