# Noise / Grain Texture

- **Source URL:** https://chriskalafatis.com/main.js (bundle) + https://chriskalafatis.com/main.css
- **Captured:** 2026-06-11
- **Tier: (NOT cleanly extractable — see honesty note below). No verbatim shader saved to avoid guessing.**

## Honest finding: the grain is a WebGL shader, NOT CSS feTurbulence or a noise PNG

I scraped the full HTML, the 94KB `main.css`, and the 756KB `main.js`. Findings:

- **CSS has NO grain.** Searched `main.css` for `noise / grain / turbulence / feTurbulence / data:image / blend`. The only hit is a `.noise` class that is an **empty placeholder**: `height:1rem;width:1rem;position:fixed;visibility:hidden`. There is no `feTurbulence` SVG filter, no tiled noise PNG `background-image`, and no CSS `mix-blend-mode` grain overlay. (The site DOES use `mix-blend-mode:difference` heavily — but that's for the white UI inverting over the canvas, not for grain.)
- **The page is Three.js / WebGL driven.** `main.js` contains Three.js (`THREE` x466) and ~16 shader programs. Keyword counts in the bundle: `gl_FragColor` x43, `gl_Position` x21, `uniform float` x113, `vUv` x101, `fract(` x23, `random(` x35 (GLSL random/hash noise). The headless screenshot only ever shows the WebGL preloader ("CHRIS KALAFATIS. 100%") — confirming content + grain render on the WebGL canvas after init.
- **Conclusion:** the film-grain is almost certainly a fragment-shader noise pass (a `random()/fract()` hash-noise term, likely in a post-processing/screen-space pass or per-image-plane shader) composited in WebGL. It is embedded as GLSL strings scattered through a 756KB minified bundle.

## Why no verbatim code here (provenance honesty)

Per the HARD RULE: I will NOT deobfuscate the bundle or guess which of the ~16 shaders is the grain pass. Pulling a random `fract()` fragment and labeling it "the grain shader" would be fabrication. The correct, honest extraction requires inspecting the live WebGL program / shader source in a real browser. That is a CHROME-AGENT SCRAPE REQUEST (below).

## Asset URLs (for the browser agent)
- Bundle containing the shaders: `https://chriskalafatis.com/main.js`
- CSS (confirmed grain-free): `https://chriskalafatis.com/main.css`

## Practical alternative for the lab (if Rod just wants the LOOK, not this exact shader)
A film-grain that matches this aesthetic is trivially done WITHOUT the bundle, via a self-contained source we can tier separately:
- CSS-only: an SVG `feTurbulence` overlay (`<filter><feTurbulence type="fractalNoise" baseFrequency="0.8" .../></filter>`) on a fixed full-screen div with low opacity + `mix-blend-mode: overlay/soft-light`, optionally animated by jittering the seed.
- These are well-documented, reproducible-from-a-real-snippet techniques. Recommend grabbing one from a known CodePen as a `Tier: True` source rather than reverse-engineering this site's WebGL pass.
