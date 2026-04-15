---
title: "Procedural 3D Mask"
description: "A reusable SDF-like dynamic zone system in Unity with ShaderGraph support, used for terrain blending, wall transparency, dissolves, and more."
author: Rod
date: 2026-03-11 12:00:00 +0800
categories: [project]
tags: [project, shader, 3D]
section: tech-art
engine: Unity
role: Solo Developer
team_size: Solo
duration: Ongoing
priority: 9
pin: false
wip: true
takeaway: A single simple to use tool that works on everything is worth more than a thousand specialized ones that only do one thing. When I first learned about the core of this system I thought to myself "I gotta try that" and now that I've made it even though its just a simple mask fed into a shader because if the way it was built to be simple and reusable, every new use case layers on top of the system without needing to rebuild anything. It sparks those "thinking with portal" moments and that's exactly what a tool is meant to be.
image:
  path: /assets/media/P3DM/P3DMHero.gif
media_subpath: '/assets/media/P3DM'
---

## Procedural 3D Mask

It all started with a video by an artist named [Sakura Rabbit](https://www.youtube.com/watch?v=63-4VAMylV8) I looked at it and wondered to myself "How did they do that?" later on while reading an article by [MinionsArtTutorials](https://www.patreon.com/posts/26438849) I had my realization on how it was done. This led me another realization that hit me in the face Sakura Rabbit uses this effect ALL THE TIME. And even though it was right in front of me I had never noticed. Once I saw it and once I learned it, it suddenly felt like I saw instances where I could use this everywhere, in every project I worked on, all the time. 

Then I thought what if I added more? What if instead of just a single mask I made multiple? What if each mask had a different zone ID that I could use to do math and logic in my shaders? I realized honestly this system wasn't just versatile it was practically universally useful for projects. Project after project I would build on my version of this system and now we are here. 

A system that can be used easily in ShaderGraph, can pass arbitrary values, can be animated, can be scaled, can be used for basically whatever you need and can be added to any ShaderGraph or .shader material you would like.

<!-- Actually since my hero shot should be in the image above i think its ok not to have one here but i should also improve my hero shot cus right now its not too crazy but this is a if i have time at the end thing -->

### How It Works

The basic premise is a devilishly simple three steps. 

At the scene level, you place the source scripts on any game object each with its own options for shape, radius, and falloff. 

These register with a manager script which then passes the details of each object into the GPU

This then is later used to construct a shape and passed into shader or wherever else you want to use them. 

``` HLSL
//Example of a function used to construct a sphere on the GPU
inline float P3DM_Shape_Sphere(
    float3 pos, float3 center,
    float radius, float intensity, float edgeSize, float smooth,
    float noise, float noiseStrength)
{
    float d = distance(pos, center);
    float r = radius + noise * noiseStrength;
    float shape = 1.0 - saturate(max(0.0, d - r + edgeSize) / edgeSize);
    shape = pow(shape, smooth + 0.01);
    return shape * intensity;
}
```

![Mask without noise](/assets/media/P3DM/MaskWithoutNoise.gif)

Dead simple, extremely capable, now for practically any world space related effect you can think of there is now something that can drive it. 

Here's an example using some Voronoi noise to fed into the rim output 

![Mask with Voronoi noise](/assets/media/P3DM/MaskWithNoise.gif)

Here are some quick examples of what I used this system for in this specific project

### Wall Transparency

Incredibly simple effect utilizing the mask as a transparency mask, you can also add noise like in the mask example 

![Wall transparency using P3DM mask](/assets/media/P3DM/MaskTransparency.gif)


<!-- CODE/NODES: If you have a ShaderGraph screenshot of the custom functions, this is where it goes -->

### Terrain Blending

For my terrain system I added something called type, effectively type is just a float value but when 2 types of differing value overlap they pass another type value into the shader. Using this I'm able to pass zone information and determine which index from the 2D texture array I want to use.

![Terrain blending with P3DM zones](/assets/media/P3DM/TerrainShowcase.gif)


### Other Use Cases

It's an understatement to say this tool is flexible. If you watch some of Sakura Rabbit's videos you'll see it everywhere. Here's a few ideas that you could use it for but I haven't tried personally yet. 
- Want to create a path that floats up as you go near it? use P3DM as a lerp for vertex offsets and attach the P3DMObject to the player. 
- What if you want a hidden path that only shows the ground underneath you use the same lerp but for transparency instead. 
- Maybe you have a magic-flashlight and you want it reveal a different world when you point it at things? create a P3DMObject that's a cone and use it on the flashlight 
- What if you wanted dust particles in the air but they only show when they're in rays of sunlight? just make the area of the window contain a P3DM object.
- How about raindrops on characters? use the P3DM mask easy normal map change and you're good to go. 

Honestly there are so many uses for this system that the question becomes what isn't this useful for? I would implore those who try this for themselves to see what other additions you could make to the system for extra effects and use cases that I never thought of. 

### What I Learned

It's not always the crazy ultra specific tools that bring the most value to the table. It's often something small that lets you do a lot of different specific things that ends up being the most useful. Also sometimes it's good to think about how else a particular tool can be used and how it fits into a toolbox rather than looking at it alone. Sometimes a hammer is just a hammer but look a bit closer and one might find a nail remover, crowbar, nutcracker and all sorts of use cases packed into one.