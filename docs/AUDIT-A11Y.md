# Accessibility audit

**Report only. No code was changed.**

Measured **2026-08-25, 07:26 to 07:31 PDT**, against the live dev server on `localhost:4000`,
in real Chrome driven over CDP at 1440x900. Nine page types, **239 focusable controls**, every
number below measured that morning rather than read off a stylesheet.

Run under [STYLE.md](../STYLE.md) Section J. Two deliberate deviations from that section: it
names `redesign-lab/analysis/<date>-uxa11y-report.md` as the destination and this brief named
this file, and its scope list predates the port, so the scope here is the real pages.

> **The pages were moving while I measured.** The landing page was ported at 07:15, in the middle
> of my first pass, so that pass was thrown away and everything here comes from the 07:26 re-run.
> Anything touched after 07:31 is not in this report.

---

## The headline: what a real person actually hits

Ranked by how much it hurts, not by criterion number.

| # | What goes wrong | Where | Severity |
|---|---|---|---|
| 1 | The text under each post title is almost invisible | `/game-design/blogs/`, `/tags/*` | **Blocker** |
| 2 | Videos start playing and there is no way to stop them | post pages, landing | **Blocker** |
| 3 | The project card's own title is the hardest thing on the card to read | landing, projects | **Major** |
| 4 | The front page has no name in the browser tab and no main heading | `/` portal | **Major** |
| 5 | The blogs search box has no label | `/game-design/blogs/` | **Major** |
| 6 | The back of a project card can only be reached with a mouse | landing, projects | **Major** |
| 7 | Locked achievements announce a switch they do not have | `/tech-art/about/` | **Major** |
| 8 | The achievement panel changes silently for a screen reader | `/tech-art/about/` | **Major** |
| 9 | Code line numbers are too faint to read | post pages | Minor |
| 10 | Four more small pieces of text sit just under the readable line | various | Minor |
| 11 | Two pages scroll sideways on a narrow phone | blogs, post | Minor |

### 1. The text under each post title is almost invisible

On the blogs list and every tag page, the description, the date and the reading time are dark
grey on a dark background. I measured **1.66:1, 1.78:1 and 1.83:1** where **4.5:1** is the
minimum, and the screenshot confirms it: the title is bright, everything under it nearly
disappears. This is the worst readability problem on the site.

The cause is Bootstrap's `.text-muted`, which resolves to `rgba(33, 37, 41, 0.75)`, a colour
picked for a **light** page. Nothing overrides it for the dark design.

**Smallest fix:** one rule in the site's own CSS giving `.text-muted` a light value. Do not edit
`_sass/vendors/_bootstrap.scss`, it is PurgeCSS output and machine owned.

### 2. Videos start playing and there is no way to stop them

The post page starts **10 looping videos** on load and the landing starts one. None has a pause
button, and none is wired to the motion switch. This is WCAG 2.2.2, which is **Level A**, the
lowest bar there is, and STYLE.md Rule 71 already calls it out in writing.

The markup comes from `_includes/post-media.html:13` and `_layouts/post.html:101`, both of which
emit `autoplay muted loop` with no controls. The pause path that does exist,
`assets/js/components/merged-card.js:192-222`, only reaches `.post-card video`, and these are not
inside a `.post-card`.

**Smallest fix:** widen that same pause loop from `.post-card video` to every `video[autoplay]`
on the page. The function already exists and already reads the motion state.

### 3. The project card's own title is the hardest thing on the card to read

`Procedural 3D Mask`, `Doomsday Sales!` and their siblings are `rgb(163, 161, 157)` at 15px,
printed straight onto the cover image. Across the landing and projects pages **15 card titles
measure below 4.5:1, the worst at 3.03:1**. The description underneath, which sits on the solid
panel, is fine. So the least readable text on the card is its name.

**Smallest fix:** either brighten `.card-title` to the page's own text colour, or darken the
`.glass-plane` scrim that already sits behind it. The scrim is the safer of the two because it
also helps the `SOLO DEVELOPER . UNITY` line above the fold.

### 4. The front page has no name in the browser tab and no main heading

The portal's browser tab reads `| Rodney Fan`, a stray bar and no page name. Its only heading is
an `<h3>`, so the page has no `<h1>` at all and a screen reader's heading list opens at level
three.

`index.html` has no `title:` in its front matter, and `_includes/head.html:53` only drops the
separator when `page.layout == 'home'`. The portal's layout is `portal`, so the `' | '` is
appended to nothing.

**Smallest fix:** add `title: Home` to `index.html`'s front matter, which fixes the tab and the
stray bar together, and promote `.centre__welcome` from `h3` to `h1` in `_layouts/portal.html:162`.

### 5. The blogs search box has no label

`#post-search` on the blogs page carries only a placeholder, `Search posts...`, and a placeholder
vanishes the moment someone types. The projects page already does this correctly: its field
carries `aria-label="Filter projects by title, description or tag"`.

**Smallest fix:** add an `aria-label` to `#post-search` the way the projects field has one.

### 6. The back of a project card can only be reached with a mouse

The card flips after a dwell on hover. The handlers in `assets/js/components/merged-card.js:72-114`
are `mouseenter`, `mousemove` and `mouseleave` only, with no focus or key handler anywhere. The
back face carries real writing that appears on no other surface, for example *"Even older
techniques have value, even in modern games..."*.

Two different people are affected differently. A **keyboard** user never sees that text at all. A
**screen reader** user does hear it, because the back is not `aria-hidden`, so instead of losing
it they get the front and back read out one after the other with nothing saying which is which.

**Smallest fix:** start the same dwell on `focus` alongside the existing `mouseenter`, and clear
it on `blur`. That fixes the keyboard case and leaves the pointer behaviour untouched.

### 7. Locked achievements announce a switch they do not have

**26 of the 29 tiles** carry `aria-disabled="true"` and `aria-pressed="false"` at the same time.
A screen reader reads that as "toggle button, not pressed, dimmed" for a tile that can never be
pressed, so it offers a switch that does not exist.

Keeping locked tiles reachable was the right call and it works: all 29 are in the tab order, and
clicking a locked one still fills the panel. Only the `aria-pressed` is wrong.

**Smallest fix:** emit `aria-pressed` only for unlocked tiles in
`assets/js/components/achievement-wall.js`, in the same expression that already decides
`aria-disabled`.

### 8. The achievement panel changes silently for a screen reader

Tabbing across the tiles updates the detail panel on the right, and that panel is the only place
the progress, the state, the criterion and the effect exist. But `.aw__detail` has no
`role="status"` and no `aria-live`, and the tiles carry no `aria-controls` or `aria-describedby`.
So someone tabbing the wall hears 29 names and none of the content.

**Smallest fix:** put `role="status"` on `.aw__detail`. Nothing else has to move.

### 9 to 11: the smaller ones

- **Code line numbers**, `pre.lineno` at `rgba(254, 243, 199, 0.3)`, measure **2.39:1**. Raise the alpha.
- **Four pieces of text sit just under the line:** the takeaway callout `p.takeaway-text` at **3.04:1**, the `WIP` badge at **3.58:1**, the `Built by hand` footer credit at **3.76:1** on eight pages, and the blogs tag buttons at **4.34:1**. The two achievement labels, `.aw__lbl` at **4.30:1** and `.aw__grouplbl` at **4.49:1**, are close enough to the 4.5 line to be a rounding argument, but they are still under it.
- **Narrow screens:** at a 320px viewport the blogs page is **367px** wide because `nav.top-bar__nav` will not wrap, and the post page is **336px** because of the code block. At 200% zoom only the post page still overflows, by 16px.

---

## Per criterion

### WCAG 2.4.7 focus visible, and 2.4.11 focus not obscured

**Passes everywhere.** All 239 controls across all nine pages show a visible gold focus ring.

| Checked | Result |
|---|---|
| Every focusable control, 9 pages, 239 total | **Pass.** Every one matched `:focus-visible` and painted a ring |
| Ring clipped by an `overflow: hidden` ancestor | **Pass.** Tested by removing the overflow and re-capturing: no difference |
| The search field's border substitute | **Pass, and the concern is stale.** The field gets the normal `2px` gold outline like everything else, so no substitute is load bearing |
| The skip link | **Pass.** Slides into view on focus and reads clearly, gold panel with dark text |
| Favicon home link, top left corner | **Minor.** Sits flush at 0,0, so the ring's left and top edges have no room and `body { overflow-x: hidden }` trims them. Right and bottom paint normally |

Two things worth knowing. First, **two rings are drawn, not one**: `_sass/base/_a11y.scss` is
unlayered, so its gold `outline` beats the layered ring in `_sass/base/_focus-ring.scss`, which
then contributes its `box-shadow` on top. Both are visible, nothing is broken, but the transparent
outline that `_focus-ring.scss`'s comment protects for Windows High Contrast Mode is being
replaced by a real gold one before it ever gets there. Second, the top bar links looked ringless
on first measurement and were not; see "What I got wrong" below.

### WCAG 2.5.8 pointer target size

**Nothing fails.** Fourteen distinct controls measure under 24px on one axis, and **every one of
them clears the spacing exception**: the rule allows a small target when no neighbour's centre is
within 24px, and the closest pair here is 45.6px apart.

| Control | Size | Nearest neighbour centre | Verdict |
|---|---|---|---|
| Footer line links, 6 kinds, up to 8 pages | 33 to 64.5 **x 12** | 49.3 to 61 | Pass by spacing, hard to hit |
| Portal window close buttons | **16x16** and **22x22** | 64 and 219.7 | Pass by spacing, hard to hit |
| Blogs tag buttons | 74 to 116 **x 23** | 45.6 to 102.9 | Pass by spacing, 1px under |
| Projects filter pills | 63.3 to 77.4 **x 25.6** | n/a | **Pass outright.** The 13.6px regression is gone |
| Card tag chips, 42 of them | 10.9 to 17.2 **x 14.6 to 17.2** | n/a | **Not applicable.** They are `<span>`s, not focusable and not clickable. The whole card is the target |
| Top bar nav links | 67 to 108 **x 34.9** | n/a | **Pass outright** |
| Achievement tiles | **64x64** | n/a | **Pass outright** |

So this criterion is clean on paper. The 12px footer and the 16px close buttons are still a real
irritation to hit with a finger or a shaky hand, which is Fitts's Law, not WCAG.

### WCAG 1.3.1 heading order

| Page | Headings | Result |
|---|---|---|
| `/` portal | h3 only | **Fail.** No h1, the page opens at level three |
| `/tech-art/` landing | h1, h2, h3 x10 | Pass |
| `/tech-art/projects/` | h1, h2, h3 x16 | Pass |
| `/tech-art/about/` | h1, h2, h3, h2 | Pass |
| `/game-design/blogs/` | h1, then h3 x2 | **Fail.** Jumps h1 to h3, the entry titles are `h3.h5.mb-2` |
| post | h1, then h3 x5 | **Fail.** Jumps h1 to h3, the body headings are h3 with no h2 above them |
| `/ramblings/` | h1, h2 x2 | Pass, and deliberately so |
| `/archives/`, `/tags/shader/` | h1 only | Pass |

The ramblings page is the model to copy. Its entry titles keep an `<h2>` tag while rendering at
the H3 size on purpose, exactly so the page does not jump a level. The blogs page and the post
page have the same shape of content and do not do this.

On `.section-head__name`: the visible text does sit in a child `<span>`, but I could not turn that
into a defect. The element's own level and its size agree on every page I measured, `h1` at
61.4px and `h2` at 38.4px, so the ladder is holding.

### WCAG 2.1.1 keyboard

| Thing | Result |
|---|---|
| Achievement tiles, Enter | **Pass, tested with real key events.** `aria-pressed` went false to true and `["first-light"]` was written to storage |
| Achievement tiles, Space | **Pass, tested with real key events.** Toggled back off and cleared storage |
| Portal "restore all windows" | **Pass.** It is a `div` with `role="button"`, but it has a real `keydown` handler for Enter and Space at `assets/js/effects/portal-windows.js:404` |
| Portal window dragging | **Report only.** Pointer only, no keyboard path, no `role`, no `tabindex` on `.pwin`. Nothing depends on it: the windows' links and close buttons are all tabbable, and dragging only moves decoration |
| Project card flip | **Fail.** Pointer only, see headline 6 |
| Card tilt and achievement tilt | **Out of scope, correctly.** Pointer position has no keyboard equivalent and nothing depends on it. `achievement-wall.js` already flags this in its own comments |
| Focus order matches reading order | Pass on 8 pages. The portal has 4 backward jumps, but its windows are scattered by design and have no single reading order, so this is a note, not a fault |
| Focus traps | None found |
| Positive `tabindex` | None anywhere |
| Focusable content inside `aria-hidden` | None anywhere |

### WCAG 4.1.2 name, role, value

| Checked | Result |
|---|---|
| `aria-pressed` on locked achievement tiles | **Fail**, 26 tiles, see headline 7 |
| `aria-pressed` on unlocked tiles | **Pass.** Flips on activation and persists to storage |
| `aria-disabled` keeps tiles reachable | **Pass.** All 29 tiles are in the tab order and locked ones still fill the panel |
| `aria-current` | Not used. The top bar marks the current page with an `.is-active` class only, so the "you are here" state is visual only |
| `aria-controls` pointing at missing ids | None |
| `hidden` used to hide live content | None found |
| Controls with no accessible name | **1**, the blogs search field, see headline 5 |
| Live regions | Two, `role="status"` on the empty state for projects and ramblings. Correct |

### Accessible names on icon-only controls

| Checked | Result |
|---|---|
| Achievement tiles' hidden label | **Pass, and verified rather than assumed.** `.aw__sr` computes to 1x1 with `clip-path: inset(50%)`, `overflow: hidden`, and crucially `visibility: visible`, so it is invisible on screen and still in the accessibility tree. The emoji and the star are both `aria-hidden`, so the name is exactly `First Light` |
| Is the class defined in a stylesheet the live page loads | **Yes.** `_sass/components/_achievement-wall.scss:56`, in the component's own file. The bug where 29 labels rendered as visible text is fixed and did not come back |
| Portal window close buttons | Pass, `aria-label="Close Tech Art"` and so on |
| Favicon home link | Pass, `aria-label="Home"` |
| Pinned card star | Pass, `role="img"` with `aria-label="Pinned"` |
| Card tag chips, the tech icons | **Pass.** Each is `role="img"` with an `aria-label` and a `title`, for example `Unity`, `Shader`, `3D`. The inner icon is `aria-hidden`, so the name is said once, not twice |
| Images missing `alt` | **None**, across all nine pages |

One knock-on worth knowing, though it is not a failure. Because the tag chips are labelled and
sit **inside** the card's `<a>`, their labels fold into the link's name. The first card on the
projects page announces as *"star, Compute Grass, Artist, Unity, GPU-driven grass rendering in
Unity using compute shaders..."*, the whole card body read as one link name. That is legal under
2.4.4, the destination is certainly described, but it is a long thing to sit through 16 times.
Worth a look when the cards next get touched.

### WCAG 1.4.3 contrast

Measured off real pixels, not off tokens. Two captures of each page, one as rendered and one with
every glyph made transparent, then diffed: the pixels that changed are the glyphs, and the same
pixels in the second capture are the true background. That is what makes text over the glass
panels and the scene measurable, because the rendered pixel already carries the panel, the blur
and whatever is behind it.

| Text | Size | Measured | Needs | Pages |
|---|---|---|---|---|
| `p.text-muted.small` post description | 14.3px | **1.66** | 4.5 | blogs |
| `time.text-muted` post date | 14.4px | **1.78** | 4.5 | tags |
| `span.reading-time` | 14.3px | **1.81** | 4.5 | blogs |
| `time` | 14.3px | **1.83** | 4.5 | blogs |
| `pre.lineno` code line numbers | 13.6px | **2.39** | 4.5 | post |
| `span.lb__g` portal centre letter | 50.4px | **2.63** | 3 | portal |
| `h3.card-title` project card title | 15px | **3.03** | 4.5 | landing, projects |
| `p.takeaway-text` | 12.8px | **3.04** | 4.5 | projects |
| `span.card-pin--wip` WIP badge | 8.8px | **3.58** | 4.5 | landing, projects |
| `span.footer-line__end` "Built by hand" | 10px | **3.76** | 4.5 | 8 pages |
| `span.aw__lbl` | 11.2px | **4.30** | 4.5 | about |
| `button.btn-outline-secondary` tag buttons | 14px | **4.34** | 4.5 | blogs |
| `div.aw__grouplbl` | 11.2px | **4.49** | 4.5 | about |

Three things the brief flagged as risks that came back **clean**:

- **Gold on dark passes everywhere**, 29 distinct places, from 9.34:1 to 16.57:1. It is the most reliable colour on the site.
- **The redacted `?` fields at 55% opacity pass**, 5.41:1 and 5.61:1. Comfortably readable.
- **The tier colours pass.** `h3.aw__dttl` measured 10.33:1.

The portal centre letter at 2.63:1 is one sample of one decorative letterform in `rgb(248, 106, 3)`
orange. It is real but it is the identity mark, not something anyone reads.

### Reflow and zoom, 1.4.10 and 1.4.4

| Page | 320px wide | 200% zoom |
|---|---|---|
| portal, landing, projects, about | Pass | Pass |
| `/game-design/blogs/` | **Fail**, page is 367px, `nav.top-bar__nav` will not wrap | Pass |
| post | **Fail**, page is 336px, the code block pushes it | **Fail**, 16px over |

---

## Reduced motion: 22 sites, 3 contracts

D34 puts this out of scope for the redesign, so this is **reported, not raised as a blocker**.

I counted **22** live sites, not the handoff's 20. The extra two are
`_sass/pages/_section-landing.scss:177` and `assets/css/chrome-scene.css:79`, both of which look
like they landed after that count was taken.

**Nothing anywhere listens for the setting changing.** Confirmed by searching the whole repo: the
only media query listeners are dark mode at `_javascript/theme.js:81` and a TOC breakpoint at
`_javascript/modules/components/toc.js:33`. Neither is this one. So someone who turns "reduce
motion" on mid-visit gets a half-updated page until they reload.

### Contract 1: CSS media query, 12 sites. Live and correct.

The browser re-evaluates these the instant the OS setting changes. These are the well behaved ones.

1. `_sass/abstracts/_animations.scss:109`
2. `_sass/base/_decisions.scss:194`
3. `_sass/base/_decisions.scss:429`
4. `_sass/base/_foundations.scss:41`
5. `_sass/components/_callout-family.scss:167`
6. `_sass/components/_empty-state.scss:83`
7. `_sass/components/_entry-row.scss:136`
8. `_sass/components/_favicon.scss:70`
9. `_sass/components/_merged-card.scss:372`
10. `_sass/components/_slap-toggle.scss:122`
11. `_sass/pages/_section-landing.scss:177`
12. `assets/css/chrome-scene.css:79`

### Contract 2: JavaScript reads it once at startup, 7 sites. Frozen until reload.

Each of these asks the question once and then never again, so flipping the OS setting changes
nothing on the page in front of you.

13. `assets/js/components/drift-magnet.js:274`
14. `assets/js/components/merged-card.js:193`
15. `assets/js/components/merged-card.js:225`
16. `_javascript/modules/components/achievements.js:151` **the most frozen of the seven**, a module level `const` evaluated at import
17. `_javascript/modules/components/card-tilt.js:23`
18. `_javascript/modules/components/mouse-trail.js:71`
19. `_javascript/modules/components/post-enhance.js:121`

### Contract 3: the `body.motion-off` class, seeded once then live.

`drift-magnet.js:274` turns the OS preference into a class on `<body>` and then watches that class
with a `MutationObserver`, so the class itself is live and the motion toggle can drive it. But its
**seed** is a one-shot read, so the OS setting only ever reaches it at startup.
`merged-card.js:194` reads the same class.

**Verified working:** with reduce emulated, `body.motion-off` was set on both the landing and the
post page. The seed does what it claims, it just only fires once.

### The three that already do it right

These re-read the query each time they use it, which is the pattern the other seven could copy:

20. `assets/js/effects/portal-windows.js:158`, read live at line 454
21. `_javascript/modules/components/fireworks-toggle.js:44`
22. `_javascript/modules/components/page-transition.js:39`

---

## What I could not test, and what I got wrong

### Could not test

- **Screen reader announcement.** I can show the markup is correct and I did. I cannot show that NVDA, JAWS or VoiceOver actually says the right thing, and I did not try to infer it. Correct markup is evidence, not proof. Every claim above about "a screen reader hears X" is a claim about the accessibility tree, not about a real screen reader.
- **Anything per frame.** `requestAnimationFrame` does not run in a hidden tab. The orbit glow on active tiles, the drift, the card tilt, the cursor rim and the Three.js scene were all **not running** while I measured. Nothing here should be read as "the animations work".
- **The flash audit for the fireworks**, STYLE.md Rule 72. It needs a captured frame sequence and a luminance count per second. Not done.
- **Gyro tilt as motion actuation**, Rule 79 and 2.5.4. Needs a real device.
- **Contrast of the card's back face.** The back is rotated away and never painted in a static capture, so my sampler read the front face through it. `span.back-read` at 2.07:1 is **my method failing, not a finding.** It needs a capture taken in the flipped state.

### What I got wrong first, and why it matters

Three findings evaporated when I checked the mechanism instead of trusting the reading. All three
came from the same root cause, and it is worth writing down because it will catch the next agent.

1. **"The skip link never appears on focus."** It does. I read its position in a hidden browser tab, where **CSS transitions are frozen**, so I was reading the start of a 180ms transition and calling it the final state. Killing transitions first showed it moving to `translateY(0)` correctly.
2. **"The top bar nav links have no focus ring."** They do. Same cause, a `box-shadow` caught mid-transition reads as transparent.
3. **"The TOC link's ring is not painted."** It is. My capture caught a stale paint. I proved it by forcing a magenta outline inline, which made both the magenta and the real gold ring appear in the same shot.

The method that survived: **disable transitions and animations before reading any focus state**,
**press a real Tab first** so Chrome will match `:focus-visible` at all, and **look at the picture**
rather than trusting a pixel heuristic. My gold-pixel scanner produced two false "no ring" results
that the images immediately disproved.
