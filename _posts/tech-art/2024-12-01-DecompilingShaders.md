---
title: Decompiling The Shaders Of ZZZ!
description: Breaking down a compiled toon shader from Zenless Zone Zero to figure out what make the game look the way it does.
author: Rod
date: 2024-12-01 20:55:00 +0800
categories: [project]
tags: [project, unity, shader, study, 3D]
section: tech-art
engine: Unity
role: Research
team_size: Solo
duration: 2 weeks
priority: 10
pin: true
takeaway: The key insight from reverse engineering compiled shaders is that you can simply deduce the purpose of things from just pure math. While having big clues like textures and directly changing values is useful it's not always necessary. When it comes to reverse engineering things it's often the smallest thread that ends up unraveling the ball of yarn.
image:
  path: assets/media/ZZZProject/CodeScroll.gif
media_subpath: '/assets/media/ZZZProject'
---

At this point in time it's becoming increasingly easy to decompile shaders with tools like nvidia nsight, renderdoc, or even community tools for modding. Even without hex editors and resource dumping tools taking a peak behind the veil of the game engine has never been easier. With that being said I'm not going to go into more detail on how to get your hands on these files. 

With that being said let's look at ZZZ and their toon shader implementation and see how we can implement some parts of their shader for ourselves. 

### So where do we start?

![ShaderDumps](FirstImage.jpg)

As you can see in the image above once the shader has been decompiled we get two files: a fragment shader and a vertex shader. 

To keep it simple I'll only be explaining the fragment shader. There isn't too much happening in the vertex shader other than the values that are getting passed over like vertex color, world normals, etc.  

To start we have quite a mess of numbers and inputs none of which are named. This is done more so to optimize the compiled shader rather than to thwart our attempts of understanding what it says. But with this mess of numbers how do we even figure anything out? After one variable is used it's often instantly erased to store another different number and for now we don't know any of the values used above.

The best way to figure out what these do would be directly changing the values and textures used during rendering or simply looking at the models and textures themselves but let's say we are unable to do that what then? How do we figure out what any of this does? 


![FrontFaceFlag](SecondImage.jpg)

The only thing we start with is knowing that `v11` is the flag for `isFrontFace`. So let's look at everything that uses `v11`:

```
r0.x = v11.x ? 1 : -1;
```

This returns `1` if the front face is true and `-1` if it's false. We also see:

```
r0.z = cmp((int)v11.x == 0);
```

Which just turns it directly into a boolean. The next line:

```
r0.y = r0.z ? r0.y : 0;
```

This tells us to only use the value if it's the back face, and is later applied to `t3`, let's assume this is our color texture for the backface. Using the same logic we can deduce that `t2` is the color texture for the front face. (We know it's color because it ends up being used as the base for a lot of other calculations later on.)

![TextureSamples](ThirdImage.jpg)


We see:

```
r3.xyz = t4.SampleBias(s0_s, r0.yz, cb0[185].y).xyz;
```

The calculations following this are unpacking a normal map and reconstructing the Z channel, this is common in mobile and console games to free up a channel for packing extra information. In this case the blue channel is packed with ambient occlusion data instead.

Given this we have already reconstructed what 3 of the textures used in this shader are using this we can kind of intuit the rest from looking at the math and what they do to these three primary textures. 

We can intuit that `t5` has something to do with lighting and ramp values. `t5.r` is changed to `r4.y` and used in:

```
r2.xyzw = cmp(r4.yyyy < float4(0.2, 0.4, 0.6, 0.8));
```

These are likely threshold comparisons for shadow ramp steps. `t5.g` is turned into `r4.x` which is later used in a standard PBR metallic calculation - you can see it in these lines:

```
r0.w = -r0.x * 0.959999979 + 0.959999979;
r9.yzw = r1.xyz * r0.www;
// Diffuse = Albedo * (1 - metallic) - this is dielectric diffuse

r11.yzw = float3(-0.0399999991,-0.0399999991,-0.0399999991) + r1.xyz;
// Subtract 0.04 from albedo

r11.yzw = r0.xxx * r11.yzw + float3(0.0399999991,0.0399999991,0.0399999991);
// r11.yzw = r0.x * (albedo - 0.04) + 0.04
// This is: lerp(0.04, albedo, metallic)
// This calculates F0 (base reflectance)
```

`t5.b` ends up being used as part of a specular calculation. Admittedly this one took the longest to crack but was great practice for reading compiled shader math.

For `t6` we can figure out each channel by tracing where they end up in the final output. The shader I got doesn’t use transparency but if it did, `t6.r` would be opacity, this is obvious if you look at the texture itself but this post assumes that we don't. `t6.g` acts as an anti-specular mask, zeroing out specular wherever it’s applied. `t6.b` marks where rimlight appears, deduced from how it’s multiplied into the rim lighting calculations at the end of the shader.

### What we learned

Putting it all together, here’s what each texture slot does:

| Texture | Purpose |
|---------|---------|
| `T2` | Front Face Color |
| `T3` | Back Face Color |
| `T4` | Normal Map + AO (packed in blue channel) |
| `T5` | Light Map - Shadow Ramp (R), Metallic (G), Gloss (B) |
| `T6` | Material Map - Opacity (R), Anti-Specular Mask (G), Rimlight Mask (B) |

The key insight from this whole exercise is that you can deduce what textures do from how they’re used in the math, not just from looking at the textures themselves. Following `isFrontFace` was the single thread that unraveled everything else and when it comes to reverse engineering things it's often the smallest thread that ends up unraveling the ball of yarn.

If you want to try this yourself I’ll be putting the shader source in a pastebin soon. I also have a version with extra comments explaining each section but I’d recommend tackling it raw first, see if you can reach the same conclusions about the material maps on your own!
