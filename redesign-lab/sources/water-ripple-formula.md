# Water ripple — ring-formula sources [Bob, 2026-06-15]

Captured by Bob (water agent) to ground the click-ripple shader. Rod's call: "a circle mask with sine is good enough."
Confirmed — the canonical click/touch ripple is **direction x sine(distance*freq - time*speed), masked + decayed**.
Two independent VERBATIM GLSL sources for the core, plus a circle-mask source and a decay source.

## S1 — alco GLSL ripple gist (VERBATIM, fetched)
URL: https://gist.github.com/alco/3070640  (raw: gist.githubusercontent.com/alco/3070640/raw)
```glsl
uniform float time;
uniform sampler2D tex;
uniform sampler2D tex2;
float radius = .5;
void main(){
	float t = clamp(time / 6., 0., 1.);
	vec2 coords = gl_TexCoord[0].st;
	vec2 dir = coords - vec2(.5);
	float dist = distance(coords, vec2(.5));
	vec2 offset = dir * (sin(dist * 80. - time*15.) + .5) / 30.;
	vec2 texCoord = coords + offset;
	vec4 diffuse = texture2D(tex, texCoord);
	vec4 mixin = texture2D(tex2, texCoord);
 	gl_FragColor = mixin * t + diffuse * (1. - t);
}
```
KEY: `vec2 offset = dir * (sin(dist * 80. - time*15.) + .5) / 30.;` -> UV offset = direction-from-center * sine(dist*freq - time*speed). Same FAMILY as Rod's existing DUDV UV-offset distortion.

## S2 — Godot port of Shadertoy ldBXDD (VERBATIM, fetched)
URLs: https://godotshaders.com/shader/ripple-shader/  <- ports  https://www.shadertoy.com/view/ldBXDD
```glsl
uniform float wave_count : hint_range(1.0,20.0,1.0)=20.0;
uniform float speed : hint_range(0.0,10.0,0.1)=3.0;
uniform float height : hint_range(0.0,0.1,0.001)=0.003;
void fragment(){
	vec2 cPos = -1.0 + 2.0 * UV / (1.0/TEXTURE_PIXEL_SIZE);
	float cLength = length(cPos);
	vec2 uv = FRAGCOORD.xy/(1.0/SCREEN_PIXEL_SIZE).xy + (cPos/cLength) * cos(cLength*wave_count - TIME*speed) * height;
	vec3 col = texture(SCREEN_TEXTURE,uv).xyz;
	COLOR = vec4(col,1.0);
}
```
KEY: `(cPos/cLength) * cos(cLength*wave_count - TIME*speed) * height` -> identical structure: normalized-direction * cos(dist*freq - time*speed) * amplitude. Independent confirmation of S1.

## S3 — circle MASK / annulus (VERBATIM, fetched)
URL: https://gist.github.com/JBlackCat/f4c786e65796cf5ee60198a45a9c6cbc
```glsl
float calculatedRadius = length(coords - center);
float innerRadius = radius - thickness;
float pctOuterCircle = 1.0 - smoothstep(radius - blur, radius + blur, calculatedRadius);
float pctInnerCircle = 1.0 - smoothstep(innerRadius - blur, innerRadius + blur, calculatedRadius);
// ring = pctOuterCircle - pctInnerCircle
```
Use: bounds the ripple to a finite EXPANDING ring (radius = age*speed) instead of infinite rings.

## S4 — exponential decay term (REPORTED, not verbatim-fetched)
URL: https://medium.com/@mejdiclubiste/my-journey-into-android-shaders-building-a-ripple-effect-library-8c38d0a4f65c
Reported formula: `rippleAmount = uAmplitude * sin(distance/20.0 - uTime*uFrequency) * exp(-distance * uDecay)`
Adds the `exp(-distance*decay)` falloff so the ring fades with distance/age (ubiquitous, standard). Marked REPORTED
(came via search summary, not a verbatim fetch) — the core dir*sine is already double-confirmed by S1+S2.

## BOB'S COMBINED RECIPE (Remixed from S1+S2+S3+S4) for the click ripple
Per active ripple i (world xz origin + spawn time), in the water fragment shader:
```
d    = distance(vWorldPosition.xz, origin)        // S1/S2 distance
age  = uTime - start
front= age * uRippleSpeed                         // expanding ring radius
wave = sin(d * uRippleFreq - age * uRippleSpeed)  // S1/S2 dir*sine core
mask = smoothstep(front+W, front, d) * smoothstep(front-W, front, d)  // S3 annulus around the front
env  = exp(-uRippleDecay * age) * exp(-uRippleDistFalloff * d)         // S4 fade
dir  = normalize(vWorldPosition.xz - origin)
rippleOffset += dir * wave * mask * env * uRippleAmp
```
Then `rippleOffset` is ADDED to the existing DUDV `distortion` that offsets the reflection UV in mirroredSurface.js.
Provenance: dir*sine = S1+S2 (True, verbatim); annulus mask = S3 (True); decay = S4 (reported+standard). Raycast that
sets `origin` = Rod's `lantern-controller.js` plane-intersect (his code). NOISE rework (separate) = three.js Water
4-sample normal (sources/ameen-watermesh.md).
```
```
