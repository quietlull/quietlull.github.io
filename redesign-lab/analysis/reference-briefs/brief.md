PREMISE VERIFIED. Live site confirms the saved note character for character, but the note has a real blind spot.

## 1. Premise verdict

- **No `sources/*.md` file exists for TheRealMJP.** The stated source lives at `C:/Users/Rod/Documents/ProjectFiles/Website/redesign-lab/analysis/component-sources/source-prev-next.md`. That file is inside this repo, so it is a CLAIM, not provenance. I fetched the live site to verify it.
- **Live CSS matches the note exactly**, character for character. Fetched `https://therealmjp.github.io/css/style.min.4bc523c643bd50ebce05154df32e255bc3b0c9bae8e5b0be991a7f5163fae5af.css` (HTTP 200, 17,512 chars, saved to scratchpad as `mjp.css`) and the post page `https://therealmjp.github.io/posts/shader-permutations-part1/` (HTTP 200, 52,996 bytes).
- **"NO box" is confirmed by exhaustive grep**, not by a summarizer. I regexed every rule in the full stylesheet whose selector mentions `post-nav`, `next-post`, or `prev-post`. There are exactly five, and none sets `border`, `background`, `box-shadow`, or `border-radius`. The boxlessness is real absence evidence.

## 2. Verbatim CSS (live, unmodified)

```
.post-nav{display:flex;justify-content:space-between;margin-top:1.5em;margin-bottom:2.5em;font-size:1.2em}
.post-nav a{flex-basis:50%;flex-grow:1}
.post-nav .next-post{text-align:left;padding-right:5px}
.post-nav .prev-post{text-align:right;padding-left:5px}
.post-nav .post-nav-label{font-size:.8em;opacity:.8;text-transform:uppercase}
.thin{max-width:720px;margin:auto}
.feather{display:inline-block;vertical-align:-.125em;width:1em;height:1em}
```

Markup, verbatim from page source (SVG guts elided, `<br>` is literal):

```
<div class="post-nav thin">
  <a class="next-post" href="https://therealmjp.github.io/posts/gpu-memory-pool/">
    <span class="post-nav-label"><svg class="feather feather-arrow-left">...</svg>&nbsp;Newer</span><br><span>GPU Memory Pools in D3D12</span>
  </a>
  <a class="prev-post" href="https://therealmjp.github.io/posts/shader-permutations-part2/">
    <span class="post-nav-label">Older&nbsp;<svg class="feather feather-arrow-right">...</svg></span><br><span>The Shader Permutation Problem - Part 2: How Do We Fix It?</span>
  </a>
</div>
```

## 3. The note's blind spot: the component's colour and hover are INHERITED

The note says "the rules contain zero colour, so it drops onto a night ground unchanged." That is true of the five `.post-nav` rules and **misleading about the component**. `.post-nav` is a sibling of `</article>`, so it sits **outside `.content`** and picks up the global anchor rules:

```
a{color:#e8eef2;text-decoration:none;border:none;transition-property:color;transition-duration:.4s;transition-timing-function:ease-out}
a:hover{color:#fff;text-shadow:0 0 1px #fff}
```

A craft stage building from the note alone ships this component **with no hover state at all**. The hover is a 0.4s ease-out colour lift plus a 1px white text-shadow.

Also inherited and easy to miss: `html{line-height:1.6;letter-spacing:.06em}`. The uppercase kicker gets its tracking **free from the html-level `.06em`** and has no `letter-spacing` of its own. If our stack has no global tracking, the craft stage must add it explicitly or the kicker will look wrong.

## 4. What is genuinely THEIRS

Geometry and behaviour, all verified live:
- `display:flex; justify-content:space-between`; each anchor `flex-basis:50%; flex-grow:1`, so the whole 50% column is the hit target
- Outward `text-align`, with the 5px inner-edge padding as the only gutter
- Kicker recipe: `.8em`, `opacity:.8`, `text-transform:uppercase`, stacked over the real post title. Title:kicker ratio is 1 : 0.8
- Block bumped to `1.2em`; asymmetric `1.5em` top / `2.5em` bottom margins
- Icon sized `1em` with `vertical-align:-.125em`; `&nbsp;` binds arrow to word so they never wrap apart
- Newer/Older labelling instead of Prev/Next
- Class names are inverted: `.next-post` is the LEFT, newer one. Confirmed by `text-align:left`. Do not copy this trap.

## 5. What cannot transfer under palette law

- `#e8eef2` link colour is a cool-tinted near-white. Swap to `--color-text` `#f5f3ef`.
- `a:hover{color:#fff;text-shadow:0 0 1px #fff}` is a white glow. It transfers as geometry but the glow is a taste call against the de-glow principle. **Flag for Rod rather than assume.**
- **`#018574` teal must not follow the component.** It appears in `.content a{box-shadow:inset 0 -4px #018574}`, `.post-info a:hover`, and `#TableOfContents a:hover`. It is a cool accent and forbidden. Because `.post-nav` sits outside `.content` it never touches the component. The risk is a craft stage grabbing the wrong anchor rule.
- `html{background:#494f5c}` is a cool slate. Irrelevant to us. Nothing on `.post-nav` sets a background, which is exactly why it works over a live scene.

## 6. Two gaps in the source our version must fill (these are OURS, not theirs)

- **No focus style.** Grepped the whole stylesheet: the only `:focus` rules are `.screen-reader-text:focus` and `.content a.anchor:focus svg`. There is **no `:focus-visible` for these links**. Under WCAG 2.2 AA that is a defect in the source. Good news for anti-bloat: a global lantern-glow ring already exists at `C:/Users/Rod/Documents/ProjectFiles/Website/redesign-lab/extracted/styles/generic.css:25`, sourced in `C:/Users/Rod/Documents/ProjectFiles/Website/redesign-lab/sources/focus-ring.md`. **The component should inherit it and declare nothing.**
- **Reduced motion does not cover this.** MJP's `@media(prefers-reduced-motion),(print)` block targets only `.animated`. The 0.4s link transition runs regardless. If our version keeps the transition it needs its own reduced-motion path, and that path is ours.

## 7. Tier and idea-origin for the ledger

- Geometry, kicker recipe, boxlessness, Newer/Older labelling: **THEIRS**, verified live, tier **True**.
- Replacing the `<br>` stack with a flex column plus gap (same geometry, survives long titles): **Claude**. This is the single change that makes the build **Remixed** rather than True. It is defensible but must be logged as ours.
- Warm token substitution: forced by palette law, **OURS**.
- Whatever replaces the feather arrows needs **its own source**. Typed ASCII chevrons have a real precedent in Book of Shaders (`< <` / `> >`, verified in the same note), which is a cheap hand-made tell. Anything hand-drawn is currently **unsourced** and would be Slop until cited.
- Focus ring: already sourced and global, **do not re-declare**.

## 8. Open question for Rod

The white hover glow (`text-shadow:0 0 1px #fff`) is the one element where the source and the de-glow principle disagree. Options are keep it warm (`--color-gold`), drop the shadow and keep the colour lift only, or drop the hover entirely. That is a taste call, not a mechanical one, so I have not picked.