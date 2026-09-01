# SOURCE: LOWRYS FARM "Ready to Go Out?" motion (2026-06-14)

Rod's chosen quality reference for **slow bob + clean scroll-in reveals**. Code below is
**verbatim** from the live stylesheet (fetched, not paraphrased):
`https://static.dot-st.com/static/docs/lowrysfarm/pages/ready_to_go_out/assets/css/style.css`
(companion JS: `.../assets/js/index.js` — the class-toggle trigger logic).

This is a True-Code source for the drift/entrance behavior in the provenance ledger. Provenance
of the FEEL is two easing curves — capture them exactly; they're what makes it read "polished."

## The two "feel" curves (the whole secret)
- **Entrance = springy overshoot:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (easeOutBack — the >1
  control point gives the slight settle-past-then-back). Used on every reveal.
- **Bob = sinusoidal in-out:** `cubic-bezier(0.445, 0.05, 0.55, 0.95)` (easeInOutSine — smooth,
  no linear "tick"). Used on every continuous float.

## Continuous loops (verbatim @keyframes — all `infinite`)
```css
@keyframes float{50%{transform:translateY(-0.5rem)}100%{transform:translateY(0)}}      /* the bob */
@keyframes katakata{0%{transform:rotate(0deg)}100%{transform:rotate(3deg)}}            /* tiny wobble (steps(2)) */
@keyframes scroll-left{0%{transform:translateX(0%)}100%{transform:translateX(-50%)}}   /* marquee strip */
@keyframes rotate-center{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}     /* scroll badge spin */
@keyframes fadeSlide{0%{opacity:0}10%{opacity:1}20%{opacity:1}30%{opacity:0}100%{opacity:0}} /* hero crossfade */
```
Bob is **single-axis translateY**, applied with **per-element duration stagger** so they desync:
```css
.look-mv .keyitem-wrap{animation:float cubic-bezier(0.445,0.05,0.55,0.95) infinite}
.comment .fukidashi1 img{animation:float 3700ms cubic-bezier(0.445,0.05,0.55,0.95) infinite}
.comment .fukidashi2 img{animation:float 3800ms 1s cubic-bezier(0.445,0.05,0.55,0.95) infinite} /* +100ms +1s delay = out of phase */
```

## Scroll-in entrances (verbatim — JS toggles `.fadein`/`.show`/`.in`; CSS transitions)
```css
.fadein{opacity:0;transform:translateY(10px);
  transition:transform .8s cubic-bezier(0.34,1.56,0.64,1), opacity .5s ease}           /* rise + springy settle */
/* staggered hero (each waits longer): h1 spans slide in from translateX(10px) */
.pc-mv_wrap>h1 span{transform:translateX(10px);opacity:0;
  transition:transform .5s .8s cubic-bezier(0.34,1.56,0.64,1), opacity .2s .8s ease}    /* h1 @ .8s delay */
.pc-mv_wrap>h2{transform:translateX(10px);opacity:0;
  transition:transform .5s 1s cubic-bezier(0.34,1.56,0.64,1), opacity .2s 1s ease}      /* h2 @ 1s delay */
.look-mv .keyitem-wrap .keyitem-ph{transform:translateY(30px);opacity:0;
  transition:transform .9s 1s cubic-bezier(0.34,1.56,0.64,1), opacity .2s 1s ease}      /* bigger items rise further (30px) */
```
JS pattern (index.js, paraphrased — it's the standard reveal): on scroll, when an element's top
crosses ~0.7 viewport height, add `.in`/`.show`/`.fadein`; CSS does the rest. = a plain
**IntersectionObserver class toggle** in our rebuild (no jQuery needed).

## The UX-safe principle Rod flagged (record it)
The bob/wobble run on **decoration only** (product tags, speech-bubble images, badges). The
**text and the floating glass panel over it do NOT move** — motion never touches readable/clickable
content. The glass is a static foreground layer; the life happens around it. This is how you get
"things floating" without the click-a-moving-target UX nightmare.

## Rebuild notes (for when we build it; standards-compliant)
- Bob: `@keyframes float` translateY(-0.5rem), `easeInOutSine` bezier, `infinite`, per-element
  `animation-delay`/duration stagger (Sass `@for` or `:nth-child`), DECORATION only.
- Entrance: `.is-inview` class via IntersectionObserver (Rule 80/standards: real, dependency-free)
  + the `easeOutBack` springy transition; stagger by index.
- Both behind `@media (prefers-reduced-motion: reduce)` (Rule 89, hard).
- For the richer 2-axis wander (the breakdance option) see refs-floating-and-palette.md; LOWRYS
  itself is single-axis bob — simpler, and Rod prefers its polish.
