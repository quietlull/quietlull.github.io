---
title: Decompliling The Shaders Of ZZZ! (Part1)
description: Reverse engineering shaders and why that can be valuable to do.
date: 2024-12-01 20:55:00 +0800
categories: [project]
tags: [project]
priority: 1
pin: true
image: 
    path: assets/media/ZZZProject/CodeScroll.gif
media_subpath: '/assets/media/ZZZProject'

---

## Decompiling shaders and learning from the pros

At this point in time it's becoming increasingly easy to decompile shaders with tools like nvidia nsight, renderdoc, even without hex editors and resource dumping tools taking a peak behind the veil of the game engine has never been easier. I'm not going to go into too much detail on how to get these files but it's not too hard these days with a quick google search or searches.

With that being said let's explore a game that has some stunning stylized anime graphics, let's look at ZZZ and their toon shader implementation and see how we can implement their shader for ourselves. 

### So where do we start?

![alt text](FirstImage.jpg)

So as you can see in the image above once the shader has been decompiled we get two files: a fragment shader and a vertex shader. 



To keep it simple ill only be explaining the fragment shader there isnt too much happening in the vertex shader other than the values that are getting passed over like vertex color, world normals, etc.  

![alt text](CodeScroll.gif)

We have quite a mess of numbers and inputs none of which are named. This is done more so to optimize the compiled shader rather than to thwart our attempts of understanding what it says. But with this mess of numbers how do we even figure anything out? After one variable is used it's often even instantly erased to store another different number and for now we don't know any of the values used above.

The best way to figure out what these do would be directly changing the values and textures used during rendering or simply looking at the models and textures themselves but lets say we are unable to do that what then? How do we figure out what any of this does? 


![alt text](SecondImage.jpg)

The only thing we start with is knowing that v11 is the flag for “isfrontface”. So lets look at everything that uses v11 we see r0.x = v11.x ? 1 : -1; at the very start with returns 1 if the front face is true and -1 if it's false we also see r0.z = cmp((int)v11.x == 0); which just turns it directly into a true false. The next line r0.y = r0.z ? r0.y : 0; tells us to only use the if its the back face and is later applied to t3 lets assume this is our color texture for the backface and using the same logic we can deduce that t2 is the color texture for the front face. (We know its color because it end up being used as the base for a lot of other calculations in the future)

![alt text](ThirdImage.jpg)


We see r3.xyz = t4.SampleBias(s0_s, r0.yz, cb0[185].y).xyz; and see calculations being done to it im not going to explain it for now since its a little long winded but we can see they are unpacking a normal map and reconstructing the z channel which is common in mobile and console games to conserve another space to pack information into. I do know what the B they pack in here is but i dont have the other information to explain why yet.

Given this we have already reconstructed what 3 of the textures used in this shader are using this we can kind of intuit the rest from looking at the math and what they do to these three primary textures. 

We can intuit that texture5 has something to do with lighting and ramp values t5.r is changed to r4.y and used in r2.xyzw = cmp(r4.yyyy < float4(0.2, 0.4, 0.6, 0.8)); for threshold comparisons t5.g is turned into r4.x which is later used in a standard PBR metal calculation so we can deduce its a metal calculation you can see it in these lines 

r0.w = -r0.x * 0.959999979 + 0.959999979;
r9.yzw = r1.xyz * r0.www;
// Diffuse = Albedo * (1 - metallic) this is dielectric diffuse

r11.yzw = float3(-0.0399999991,-0.0399999991,-0.0399999991) + r1.xyz;
// Subtract 0.04 from albedo


r11.yzw = r0.xxx * r11.yzw + float3(0.0399999991,0.0399999991,0.0399999991);
// r11.yzw = r0.x * (albedo - 0.04) + 0.04
// This is: lerp(0.04, albedo, metallic)
// This calculates F0 (base reflectance)

t5.b ends up being used as a part of a specular calculation and will keep it as simple as that for now as it's pretty complicated already and this is another whole can of worms. You have no idea how long it took me to figure this one out although it was very good practice in the long run. 

For the next ones your also just going to have to trust me on this but the shader i got doesnt do transparency but it it did t6.r would be opacity (this one is obvious if you look at the texture) t6.g is something that removes specular like an anti specular mask, t6.b is a mask where it marks where i think rimlight appears? I know this mainly because of its outputs so here is what we have learned in this little reverse engineering session. 

T2 is FrontFaceColor
T3 is BackFaceColor
T4 is NormalMapTexture + AO 
T5 is a LightMap that contains ShadowRamp, Metalic, and Gloss
T6 is a MaterialMap containing Opacity, Specular, and a RimlightMask 

In the next part of my article I'll be recreating parts of the shader in unity’s shadergraph so if you're interested in seeing it stay tuned! 

If you want to take a look for yourself on this specific shader ill be putting it in pastebin below. See if you can get to where I got! I have another version of the file with extra comments explaining everything but honestly I think it's good to tackle the exercise on your own to see if you can come to the same conclusions about the material maps as I did!
