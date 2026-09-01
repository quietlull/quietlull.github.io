# SOURCE (True) — factory.ai (button alternative)

- **URL:** https://factory.ai (Tailwind/Next site, Geist font)
- **Captured:** 2026-06-11 via Chrome extension (Tailwind utilities + computed styles; raw HTML was output-filtered, reconstructed from class lists).
- **Rod wants:** "some of their buttons … as alternatives to current buttons." This is the CTA ("Request a Demo").
- **Recolor:** base near-black #1f1d1c -> Rod midnight; hover light fill -> Rod amber.

## Anatomy (Tailwind utilities -> de-Tailwind'd recipe)
Button: `bg-base-1000` (#1f1d1c) · `border border-transparent` · `rounded-sm` (3px) · `h-[31px]` · `px-[14px]` · `transition-colors duration-150` · `overflow-clip` · `group`.
Hover: `hover:bg-light-base-secondary` + `hover:[&_*]:text-dark-base-primary` = **color INVERSION** (dark bg/light text -> light bg/dark text).
Label: `<span class="relative z-10 uppercase">` (uppercase, sits above the overlay).
Overlay: `<div class="pointer-events-none absolute inset-0 opacity-0 group-hover:animate-[delayedFadeIn_100ms_ease-out_forwards]">` (a delayed fade layer for smoothness).

## Plain-CSS recipe (recolor to amber-night)
```css
.btn-factory{position:relative;display:inline-flex;align-items:center;justify-content:center;height:31px;padding:0 14px;border:1px solid transparent;border-radius:3px;background:#1f1d1c;color:#eee;font-family:Geist,system-ui,monospace;cursor:pointer;overflow:clip;transition:background-color .15s cubic-bezier(.4,0,.2,1),color .15s cubic-bezier(.4,0,.2,1)}
.btn-factory > span{position:relative;z-index:10;display:flex;align-items:center;text-transform:uppercase}
.btn-factory:hover{background:#eaeaea;color:#1f1d1c}   /* -> recolor: hover background:var(--amber); color:#0a0a0a */
.btn-factory > .ovl{pointer-events:none;position:absolute;inset:0;opacity:0;will-change:transform}
.btn-factory:hover > .ovl{animation:delayedFadeIn 100ms ease-out forwards}
@keyframes delayedFadeIn{0%{opacity:0}100%{opacity:1}}  /* "delayed" fade; exact keyframe in factory's CSS if precision needed */
```
HTML: `<button class="btn-factory"><span>Request a Demo</span><div class="ovl"></div></button>`

**Why Rod may like it as an alternative:** sharp tiny radius + uppercase + clean inversion = the "dev-tool" button. Contrast with the locked Ashlook corner-bracket button — this is the minimal-inversion option.
