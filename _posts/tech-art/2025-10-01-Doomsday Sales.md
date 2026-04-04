---
title: Doomsday Sales!
description: Talking about Doomsday Sales the game i took part in making in.
author: Rod
date: 2025-10-01 20:55:00 +0800
categories: [project]
tags: [project]
priority: 1
pin: true
image: 
    path: assets/media/DoomsdaySales/UnrealEditor_2dzGAmnox1.gif
media_subpath: '/assets/media/DoomsdaySales'
---

## So what is doomsday sales?

Doomsday Sales! Is a 3rd first person on rails shooter game where you explore a supermarket filled with colorful characters who get in your way from grabbing as many items as you can to max out your credit card before the world ends.  

It was a goofy little game that we decided to make but overall it was a fun project to work on! I worked on some 3D models and technical art like shaders, and VFX. We had a pretty interesting look that I was able to make over the course of 2 days which I'm pretty proud of! I had never really done any complex shaders in unreal before so learning it was definitely an interesting process, I also learned how the post process would work at the same time. 

![alt text](<YB7fPy (1).png>)

### So What Did I Do?

The biggest visible contribution to the jam was mainly the combination of material shader and post processes I did. When we originally thought up the style we wanted to go for we looked at the cartoon chowder for inspiration. Something that chowder has that we really wanted to get the feel of was- 

1. Wobbly Incomplete Outlines
2. Visible Bleeding Object Color That Would Leave The Edges Of An Object
3. Visible Bleeding Object Color That Would Be On Nearby Objects

Here is how i accomplished these three things using unreal shader nodes, 


### The Weird Outlines

For the first effect which is the incomplete outlines I mostly relied on some edge erosion on the objects combined with a post process outline shader to make the outlines more wobbly and noisy. 

![Edge Errosion Very Minor In Final Product](<Screenshot 2025-12-30 212241.jpg>)


At first i ran into some problems I ran into that I couldn't fully understand. At first I thought that this would be a perfect use case for a Roberts Cross operator which I learned about during a session where I was reverse engineering the shaders in ZZZ. however applying a similar method to the one i use in unity results in a broken mess of black covering half the screen. I'm not entirely sure how or why my math was wrong but regardless I moved on due to the time constraints using a less efficient outline making method. Something I did find nice about the shaders in unreal is that they are more similar to the ones in ShaderToy which I often look through to find inspiration.

Here is what the objects look like without the post process or errosion

![alt text](<Screenshot 2025-12-30 213130.jpg>)

Here it is with the outline and slight errosion.

![alt text](<Screenshot 2025-12-30 213320.jpg>)

Some issues ld like to further resolve in the future is the problem of flat normals which completely ruins the edge erosion this could be resolved in a lot of different ways like having a custom normal map be used or even storing the smooth vertex normals in the vertex color but i didnt end up having time to test these methods. 

### Visible Bleeding Object Color That Would Leave The Edges Of An Object

After using a renderpass to have the objects in the scene outlined I created a second pass where objects would try to “bleed slightly” outside of the edge of the outlines. This would offset the color of the objects slightly which would result in sometimes having a more extreme bleed or a less extreme bleed. Originally I wanted this bleed to be way stronger but after testing it out we found it hard to aim for the center of the object. The result is that we ended up keeping it but the offset would be exceedingly small to make sure no confusion was to be had. 

Here is the "bleed" effect

![alt text](<Screenshot 2025-12-30 213342.jpg>)

Final effect with the two other shaders

![alt text](<Screenshot 2025-12-30 213400.jpg>)

I'd like to think that my shader adds a lot of charm to the game and and think its a relatively simple way to do these two separate effects. 

### Visible Bleeding Object Color That Would Be On Nearby Objects 

The last effect that was cool was using Lumen in an unreal engine to add splotches of color onto objects that were being occluded. I wanted to see if I could push this further by changing this color to match the object that was near it but I ended up not having time to explore this further. For now all it does is add some pink to surfaces that are being occluded which assists a little in the chowder like splotches that end up all over the scene. 

![alt text](UnrealEditor_ar7lJeTEpz.gif)

### Other features

Lastly i want to mention other features that the shader does have but i deem simple or not important. Toon lighting with a pretty standard dot product of normal and lighting was used. I did edit the shadows of the meshes but unlike unity which has “fake” shadows and can be freely manipulated unreal 6 doesn't support this because their shadows are “real” and not just a color projected onto surfaces that are “in shadow” so i ended up turning this off.

### Closing thoughts

So let me know what you think of the shader! I felt pretty happy with the look we ended up getting from it and if you end up giving our game a try let me know if there was anything else you found cool. Maybe I could break that down too as long as its a VFX or shad
