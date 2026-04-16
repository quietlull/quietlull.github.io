---
title: "Compute Grass"
description: "GPU-driven grass rendering in Unity using compute shaders, instanced drawing, and render texture controls for interaction and culling."
author: Rod
date: 2026-03-20 12:00:00 +0800
categories: [project]
tags: [project, unity, shader, compute, 3D]
section: tech-art
engine: Unity
role: Artist
team_size: 2 
duration: 1 Week
priority: 10
pin: true
wip: false
takeaway: Even old techniques have their place in modern games, if i wrote off GPU Gems as a resource just because it was released in 2004 I would likely not have as deep of an understanding of the fundamentals needed to make this whole system. Although new solutions always come out that can update the old concepts people rely on, they tend to be incremental and build upon each other. 
image:
  path: assets/media/GrassCompute/GrassHeroAndPreviewImage.gif
media_subpath: '/assets/media/GrassCompute'
---

I think at this point every tech artist worth their salt eventually makes their own grass shader, but I never seemed to have the opportunity to do so. Although this project is an unusual case: a fixed-camera, top-down roguelike, not exactly the rolling meadows most grass implementations are built for. That constraint made it more interesting to solve.

My implementation draws from research into techniques dating back to GPU Gems (2004) while incorporating 22 years of community experimentation on top of that foundation. The result is a system I feel represents the best combination of approaches for this specific context.

The pipeline works as follows:
- A script generates blade positions and feeds it to a position buffer on the GPU
- Each frame compute shader reads that position buffer and generates the grass blade geometry and feeds it into a vertex buffer. 
- A single `Graphics.DrawProceduralIndirect` does a batched draw call and renders it all at once regardless of the blade count
- A top-down orthographic camera renders any interactor objects into a render texture used to control interaction, creation, and culling, of the grass blades. 
- Each frame a decay compute shader is used to read the cameras fresh RenderTexture and writes it on top of a previous buffer while decaying the old stored values and writes the results out so grass interactions slowly lose influence over time rather than snapping instantly. 
- A final per-blade buffer stores smoothed tip offsets, preventing jitter as blades return to resting. 


### The Compute Pipeline

As mentioned there are two compute shaders that this system uses one is the grass compute which does most of the calculations for the grass and one that does the RT decay. 

I'm going to skip past most of the boring stuff like buffer declarations and try to get the the important details

To start off this is how i cull and create grass as you can see in the RT the alpha channel is designated as a creation zone and the blue channel is designated as a cull zone. The main reason i need this is because in this game there are magic spells that create grass in an area. Structures that spawn on top of that grass and need it to be culled rather than clip through their bottom

![Culling and grass creation zones](GrassCullAndCreationZoneShowcase.gif)

``` hlsl
float4 rt = _GrassRT.SampleLevel(sampler_linear_clamp, uv, 0);

bool inCreation = rt.a > 0.5; // A channel — does grass exist here at all?
bool isCulled   = rt.b > 0.5; // B channel — is a structure suppressing it?

if (!inCreation || isCulled)
{
    // still lerp tip to zero so there's no pop on re-entry
    _BladeTipOffsets[bladeID] = lerp(prevPush, float2(0, 0), t);
    ZeroVerts(vertBase, 12);
    return;
}
```
After this I use the same rendertexture's R channel to do the pushing of interactor objects

``` hlsl
    float d          = _GrassRTParams.w;
    float sampleDist = d * 16.0;

    float rR = _GrassRT.SampleLevel(sampler_linear_clamp, uv + float2(sampleDist, 0), 0).r;
    float rL = _GrassRT.SampleLevel(sampler_linear_clamp, uv - float2(sampleDist, 0), 0).r;
    float rU = _GrassRT.SampleLevel(sampler_linear_clamp, uv + float2(0, sampleDist), 0).r;
    float rD = _GrassRT.SampleLevel(sampler_linear_clamp, uv - float2(0, sampleDist), 0).r;

    float2 grad    = float2(rR - rL, rU - rD);
    float  gradLen = length(grad);
```
A very important part I added with smoothing the return of the grass in the shader. Before this fix the grass looked like this:

![Grass twitching issue before fix](GrassTwitchingIssue.gif)

After this code section here:

``` hlsl
    float  pushStr  = saturate(rt.r * _InteractionStr);
    float2 prevPush = _BladeTipOffsets[bladeID];
    float  prevMag  = length(prevPush);

    float2 targetPush;

    if (gradLen > _InteractionDir)
    {
        targetPush = -(grad / gradLen) * pushStr;
    }
    else if (pushStr > 0.1 && prevMag > 1e-6)
    {
        targetPush = (prevPush / prevMag) * pushStr;
    }
    else
    {
        targetPush = float2(0, 0);
    }

    float  t          = saturate(_ReturnSpeed * _DeltaTime * 60.0);
    float2 smoothPush = lerp(prevPush, targetPush, t);
    _BladeTipOffsets[bladeID] = smoothPush;
```
The grass looks like this 

![Grass after smoothing fix](GrassTwitchingIssueFixed.gif)

Lastly I add some noise, and offsets to the blade orientation to make it feel a bit more organic 

``` hlsl
    // Wind 
    float  windPhase  = dot(bladePos.xz, _WindDir) * _WindFreq + _GrassTime * _WindSpeed;
    float  windAmt    = sin(windPhase) * _WindStrength;
    float2 windOffset = _WindDir * windAmt;
    float2 tipXZ      = smoothPush + windOffset;

    // Blade Orientation 
    float  angle  = Hash(bladePos.xz) * 6.28318;
    float2 rightA = float2( cos(angle), sin(angle));
    float2 rightB = float2(-sin(angle), cos(angle)); // 90° — only used in X mode
    float  halfW  = _BladeWidth * 0.5;
```
### Fixing the Twitching

As for the other compute its short but sweet. It converts a 2D texel texture into a 1D array for storage and pretty much does what a ping pong would but just for the R channel, the GBA channel remain untouched.
``` hlsl
void UpdateDecay(uint3 id : SV_DispatchThreadID)
{
    // Convert 2D texel texture to 1D array
    int idx = id.y * texWidth + id.x;

    // Get the previous buffer and current camera input
    float previous = decayBuffer[idx];
    float fresh    = CameraInput[id.xy].r;

    // Framerate independent decay
    float perFrameDecay = pow(abs(decayFactor), deltaTime);
    float next = max(previous * perFrameDecay, fresh);

    // Cutoff
    next = next < 0.005 ? 0.0 : next;

    //Result
    decayBuffer[idx] = next;
    Result[id.xy]    = float4(next, CameraInput[id.xy].g, CameraInput[id.xy].b, CameraInput[id.xy].a);
}
```

This is the end result:
![Overview of the grass rendering](GrassHeroAndPreviewImage.gif)

### Render Texture Control

A camera renders only the GrassRT layer into _camRT each frame this way is easy to influence and test in the scene and very simple to add to objects to the RenderTexture. In hindsight I probably could have rendered the objects directly into a render texture however since this second camera will only be drawing very minor geometry in a fixed space i figured this would work well. For an example that does something similar but adds camera culling for a moving character you can check out [Cyanilux](https://www.cyanilux.com/tutorials/gpu-instanced-grass-breakdown/) which made a system just like that but for my use case this was not needed and I figured this brought the highest detail for the grass interactions. 

Originally used a ping-pong to decay the render texture but that didn't give me the control I wanted so I decided to go with this method which I don't think I've seen in anyone else's grass shader implementation

### Three Variants: X, Quad, and Triangle

After all of that I decided to try out some different types of grass, originally I liked the triangular grass but my partner on the project asked me for "softer" "fluffier" grass this led me to try out some different methods. I ended up doing some quick changes and tested it all out and my final preference was the Quads although most commonly people use the X cross version.  

Triangle: 3 verts, cheapest, no texture support (triangular UV unwrap)
![Triangle grass variant](TriangleGrassCompare.gif)

Quad: 6 verts, correct rect UV
![Quad grass variant](QuadGrassCompare.gif)

X Cross: 12 verts, visible from all angles, full texture support, the standard
![X Cross grass variant](XCrossGrassCompare.gif)

### What I Learned

Throughout this project even though it was about a week of time spent I would say it was pretty productive reading all these different ways to render grass really opened my eyes on how many different methods can provide similar results with different benefits and trade offs.

I was also surprised that I enjoyed the look of the quads rather than the X Cross which goes to show the more standard method doesn't always look the most like what you may want. It also showed me it's ok to simplify the effect of the original if you think it's unnecessary. The original grass interactor showcase I saw used both the R and G channel for grass disruption but I saw little to no difference and could keep the G channel for future light map stuff. 

Overall I'm super proud of this system especially the turn around time for this whole thing which was about 1 day of research and 3 days of work. It also works really well with my P3DM system and im excited to extend the functionality of the grass shader used to render it so that it can adapt based on terrain zones. I hope you enjoyed I'll see you in the next one.

