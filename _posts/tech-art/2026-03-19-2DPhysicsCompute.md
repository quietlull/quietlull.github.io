---
title: "2D Physics Compute"
description: "2D physics simulation powered by compute shaders — collision detection, spatial hashing, and particle dynamics all running on the GPU."
author: Rod
date: 2026-03-19 12:00:00 +0800
categories: [project]
tags: [project, unity, shader, compute, 2D]
section: tech-art
engine: Unity
role: Solo Developer
team_size: Solo
duration: In Progress
pin: false
priority: 8
wip: true
takeaway: 
image:
  path: assets/img/placeholder-wip.svg
media_subpath: '/assets/media/2DPhysicsCompute'
---

<!-- INTRO: What is this project? A 2D physics sim running entirely on compute shaders? What made you want to move physics to the GPU rather than using Unity's built-in physics? Was there a specific project need (particle count, performance) or was it more of a learning exercise? What does it look like in action? -->

<!-- IMAGE/GIF: Hero shot — particles colliding, bouncing, or whatever the most visually impressive result is -->

### Why GPU Physics?

<!-- MOTIVATION: What are the limits of CPU-side 2D physics that pushed you to compute? Was it particle count? Frame budget? How many objects are you simulating vs what Unity's physics can handle? Any benchmarks or comparisons? -->

### The Compute Pipeline

<!-- OVERVIEW: High-level architecture. How many compute shaders/passes are involved? What's the per-frame flow — something like:
  1. Spatial hash build (assign particles to grid cells)
  2. Collision detection (check neighbors in grid)
  3. Resolve forces / apply velocity
  4. Update positions
-->

### Spatial Hashing

<!-- LAYER 1: How do you partition the 2D space for broad-phase collision? Grid-based spatial hash? How do you handle particles on cell boundaries? What's the hash function? How does this compare to brute force O(n²) checking? -->

<!-- CODE: The spatial hash kernel or the key parts of it -->

### Collision Detection & Resolution

<!-- LAYER 2: Narrow-phase collision. Circle-circle? AABB? How do you resolve overlaps — projection, impulse? How do you handle multiple simultaneous collisions? Any stability issues you had to solve? -->

<!-- CODE: The collision resolve kernel or the interesting parts -->

### Particle Dynamics

<!-- LAYER 3: How do you integrate velocity and position? Euler? Verlet? Any damping, gravity, or other forces? How do you read back to CPU if needed (e.g., for gameplay interactions)? -->

<!-- IMAGE/GIF: The sim in action — ideally showing many particles interacting -->

### Performance

<!-- RESULTS: How many particles can you push? What's the frame time? How does it scale? Any GPU profiling numbers? How does this compare to the CPU equivalent? -->

### What I Learned

<!-- REFLECTION: What was the hardest part — the spatial hash, the collision math, or wrangling compute buffer patterns? How does this compare to your other compute work (grass, display shaders)? What would you do differently? -->
