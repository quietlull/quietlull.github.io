---
title: "Studying the Shaders of Arknights Endfield"
description: "Breaking down the toon shading, outline rendering, and material techniques used in Arknights: Endfield through shader analysis."
author: Rod
date: 2026-03-10 12:00:00 +0800
categories: [project]
tags: [project, unity, shader, study, 3D]
section: tech-art
engine: Unity
role: Research
team_size: Solo
duration: In Progress
pin: false
priority: 6
wip: true
takeaway: 
image:
  path: assets/img/placeholder-wip.svg
media_subpath: '/assets/media/ArknightsEndfield'
---

<!-- INTRO: Similar to your ZZZ shader study but for Arknights: Endfield. What drew you to this game's visuals specifically? How does its art style differ from ZZZ? Is this the same decompilation pipeline you used for ZZZ, or a different approach? What were you hoping to learn from this one that ZZZ didn't cover? -->

<!-- IMAGE/GIF: Hero shot — a screenshot or comparison showing the visual style you're analyzing -->

<!-- ### How Does It Compare to ZZZ? -->

<!-- COMPARISON: Both are anime-style toon shaders in Unity, so what's different? Different lighting model? Different outline approach? Different material layering? This section is important because it shows the reader (and hiring managers) that you can distinguish between implementations rather than treating all toon shaders as the same thing. -->

<!-- ### The Toon Shading Model -->

<!-- ANALYSIS 1: What does the main toon shading look like? How many shadow steps? Ramp texture or step function? How does it handle light direction? Any specular model? How does it differ from ZZZ's approach? -->

<!-- IMAGE: Side-by-side or annotated breakdown of the shading -->

<!-- CODE: Key fragment shader sections with your annotations explaining what each part does -->

<!-- ### Outline Rendering -->

<!-- ANALYSIS 2: How are outlines done? Inverted hull? Screen-space edge detection? Post-process? How does it handle outline width variation (e.g., thicker at silhouette, thinner at detail)? Any vertex color tricks for outline control? -->

<!-- CODE: Outline-relevant shader code with annotations -->

<!-- ### Material Techniques -->

<!-- ANALYSIS 3: Any standout material techniques — face shading with SDF, hair anisotropy, emission maps, rim lighting? What makes the materials feel distinct from other anime games? Pick 1-2 techniques that were most interesting to break down. -->

<!-- IMAGE: Close-up of the technique in action -->

<!-- ### What I Learned -->

<!-- REFLECTION: How has doing two shader studies (ZZZ + this) changed how you approach toon shading in your own work? What techniques would you adopt vs skip? Did anything surprise you about how they solved a problem? -->
