# SOURCE (True) — organic divider line (WebGL vertex-deformed quad), from chriskalafatis.com

- **URL:** https://chriskalafatis.com/ (`main.js`, line-mesh class `jm`). Captured 2026-06-12 via Rod's Chrome agent.
- **Tier:** True (verbatim fragment shader). Vertex deform described (not fully pasted).
- **How it works:** the `<div class="home_about_line gl_line">` elements are INVISIBLE position anchors (`height:1px; visibility:hidden`) — just `getBoundingClientRect()` targets. The visible wavy line is a Three.js `Mesh` on the global WebGL canvas (`div#gl`, `z-index:-1; pointer-events:none`).
- **The wave** comes from the VERTEX shader: `pos.y -= b * 0.045 * hhl` deforms the plane vertically by a hover/scroll value `b` and a quintic easing. The **fragment** draws a sub-pixel 1px line at `vUv.y = 0.5` via `ln(lw=0.0001, et=0.001)`. The `p` uniform drives a left->right reveal (`step(vUv.x, et)`), `et = ea(p)` quintic.

## Line fragment shader (verbatim)
```glsl
#define GLSLIFY 1
uniform vec2 hover; uniform sampler2D tex; uniform float b; uniform float p; uniform float a;
varying vec2 vUv; varying float bb;
float ea(float x) { return x < 0.5 ? 8. * x * x * x * x : 1. - pow(-2. * x + 2., 4.) / 2.; }
float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold-afwidth, threshold+afwidth, value);
}
float ln(float a, float b, float lw, float et){
    float hlw = lw * 0.9855;
    return smoothstep(a - hlw - et, a - hlw, b) - smoothstep(a + hlw, a+ hlw + et, b);
}
void main(){
    float alpha = 1.; float et = ea(p); float cut = 0.001;
    alpha *= aastep(cut, vUv.x); alpha *= 1. - aastep(1. - cut, vUv.x);
    alpha *= aastep(cut, vUv.y); alpha *= 1. - aastep(1. - cut, vUv.y);
    vec3 color = vec3(1.);
    vec3 c =  color * ln(vUv.y, 0.5, 0.0001, 0.001) * alpha;
    gl_FragColor.rgb = c;
    gl_FragColor.a = mix(0., c.r, step(vUv.x, et)) * a * alpha;
}
```

## Remix plan
A full WebGL line-mesh-per-divider (with the vertex deform + scroll-driven `b`) is heavy. For assembly v1: either (a) reuse the SAME fullscreen grain shader's canvas and add line meshes, or (b) approximate with an inline SVG sine `<path>` drawn left->right via `stroke-dashoffset` + a gentle scroll-driven amplitude (Remixed approximation — flag as such; the True one is the vertex-deformed mesh above).
