---
title: "Compute Display Shaders + Dot Matrix"
description: "A compute-driven dot matrix display system in Unity — world-space pixel snapping, direct render texture drawing, and framerate-independent decay."
author: Rod
date: 2026-03-17 12:00:00 +0800
categories: [project]
tags: [project, unity, shader, compute, 3D]
section: tech-art
engine: Unity
role: Solo Developer
team_size: Solo
duration: 1 Week
priority: 9
pin: false
wip: true
takeaway: 
image:
  path: assets/img/placeholder-wip.svg
media_subpath: '/assets/media/ComputeDisplayShaders'
---

<!-- INTRO: What is this and what does it look like? A dot matrix display driven by compute shaders. How did this come about — was it for the roguelike, a standalone experiment, inspiration from real LED boards? What made you want to build this? -->

<!-- IMAGE/GIF: Hero shot — the dot matrix effect in action, ideally with an interactor leaving trails -->

### How It Works

<!-- OVERVIEW: Give the high-level pipeline like you did for ComputeGrass. Three layers:
  1. Dot matrix shader snaps pixels to world-space grid positions
  2. Script draws directly to a render texture based on world-space positions (no camera unlike the grass system)
  3. Compute shader decays the render texture (similar to grass decay)
-->

### The Dot Matrix Shader

<!-- LAYER 1: How does the pixel snapping work? Is this a surface/fragment shader that quantizes the UV or world position to a grid? What controls the dot size, spacing, color? Does it read from the render texture to know what to display? -->

<!-- IMAGE/GIF: Close-up of the dot matrix grid — maybe showing the snapping in action -->

<!-- CODE: The key part of the shader that does the world-space snapping -->

### Direct Render Texture Drawing

<!-- LAYER 2: This is where it diverges from the grass system. Instead of a camera rendering objects into the RT, you draw directly. How does this work — Graphics.Blit? CommandBuffer? Direct pixel writes? How do you map world-space object positions to RT coordinates? What are the interactor objects — anything that leaves a mark on the display? -->

<!-- What's the advantage of drawing directly vs using a camera like the grass system? Cheaper? More control? -->

<!-- CODE: The script that maps world positions to RT pixels -->

### Compute Decay

<!-- LAYER 3: You mentioned this is similar to the grass decay compute. Is it the same shader or a variant? Same framerate-independent decay approach? Any differences in how the decay looks on a dot matrix vs on grass? -->

<!-- CODE: If the decay compute is different enough from the grass version, show it. If it's basically the same, a sentence saying so and linking to the grass post is fine -->

### What I Learned

<!-- How does this compare to the grass system architecturally? What did you learn from building a second compute pipeline — was it faster the second time around? What would you do differently? Any insights about the camera vs direct-draw tradeoff? -->
