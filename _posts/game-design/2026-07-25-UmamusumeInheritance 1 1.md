---
title: "Umamusume: One of the Best Systems I've Seen in Games"
description: A breakdown of Umamusume's inheritance system, one mechanic that quietly pulls double duty as half a dozen systems at once.
author: Rod
date: 2026-07-25 20:55:00 +0800
categories: [blog]
tags: [blog, game-design, umamusume, roguelike, systems-design]
section: game-design
takeaway: Umamusume's inheritance system is a masterclass in one mechanic solving many problems at once, and more roguelikes should steal it.
priority: 1
pin: false
# image:                       # TODO: drop in a cropped hero image, then uncomment these two lines
#   path: assets/media/UmamusumeInheritance/hero.jpg
media_subpath: '/assets/media/UmamusumeInheritance'
---

Umamusume has one of the deepest and most unique systems I've ever seen in a game, one that I've never seen replicated anywhere else. Its inheritance system pulls "double duty" as half a dozen things at once: a match history, soft progression, a persistent goal, a team-building puzzle, asynchronous multiplayer, a mid-run dopamine spike, a failure-mitigation device, and an end-of-run reward. It quietly solves a pile of common design problems and folds them all into one persistent loop that feels like a slot machine after every run.

If you haven't played it, it's genuinely hard to convey how omnipresent and powerful this one system is, so I decided to do a little breakdown on how it works.

<!-- IMAGE: a hero shot, maybe the inheritance / parent-select screen -->

## How Inheritance Works

Every run ends with a "veteran uma", a token that stores the result of that run. Besides inheritance you also spend it on the game's asynchronous multiplayer content, so at first you just want to build the strongest token you can. That alone makes it a clean end-of-run reward: play well, walk away with a better token for the meta game.

The second run is where it becomes more than a simple reward. When you start it, you can use a previous token as one of two "parents" for your new uma. Parents pass down "sparks" (essentially genes), an instant stat bonus at the start of the run, plus other effects I'll get to later in this breakdown. Crucially, a token stores not just its own genes but its parents' genes too, so a new run inherits from all six parents and grandparents at once. That's what turns it into a soft progression system and a persistent goal.

<!-- IMAGE: the sparks / factor list on a finished uma -->

Each run generates sparks: 1 blue, 1 pink, 1 green, and potentially several whites. Blue and white are the main ones that drive progression, so I'll expand on them here. You always get a blue spark, but what you get is random, weighted by how high your stats were when the run ended, and it grants extra stats for the next run. White sparks come from specific conditions, winning a certain race, holding a certain skill at the end, and can grant stats or other rewards (see team building section).

From this alone players start getting a sense of anticipation at the end of every run and try their best to gain the maximum number of sparks on both the parents and the grandparents.

## Inheritance as Team Building

So in the section above we mentioned that you also get pink sparks and green sparks, if they don't give stats, what do they do?

Pink sparks handle aptitudes. Every uma has aptitudes for distance, style, and terrain, and roughly speaking each grade below A is about a 10% hit to performance. Pink sparks let you raise those, so you can run an uma somewhere it was never designed for. That matters most in the asynchronous multiplayer content, which needs multiple horses for the same race and bans duplicates, forcing you to get creative with who you build.

<!-- IMAGE: the aptitude grade screen (distance / style / terrain letters) -->

Green sparks grant a skill unique to that specific character. Since you can inherit six different green sparks on a single uma, ideally you want six ancestors with six different skills. And because every character brings a unique green spark, no character ever becomes fully obsolete, which is a built-in answer to power creep. A "weaker" option stays worth building purely for its skill.

There's also affinity, essentially how much two characters like each other. It has some lore behind it, but mechanically it just discourages pairing low-affinity parents. More of a team-building restriction than a core piece, but worth a mention.

## The Cherry on Top

Although the former two are what I would argue are the most important parts of the inheritance system to the game of Umamusume, I want to do some honorable mentions on some of the knock-on effects of the system itself.

**Mid-run dopamine spike:** Twice per run you get interrupted and "inspired" by your parents. This dumps a big stat spike from your blue sparks, can hand you skills from your white sparks, and has a chance to upgrade an aptitude via your pinks, potentially all the way to S rank. In a lucky case three S-rank aptitudes stack, which is something that genuinely matters in competitive play.

<!-- IMAGE: an inspiration event / a 3-star blue spark roll -->

**Failure-mitigation device:** A big part of the rogue-like genre is random chance, which means many times when you're aiming for a perfect or "god run" you will end up fizzling out and losing. In most roguelikes that's just 30 wasted minutes. But because Umamusume decouples "run success" from "genetic success", even a failed run can still miraculously roll a 3-star blue spark and suddenly go from a waste of time to the most valuable asset on your account. It acts as an incredibly potent psychological safety net and sparks a burst of dopamine and anticipation even when things don't quite turn out the way you wanted.

## The Takeaway

Umamusume built an addictive, deep roguelike system that almost nobody replicates, and I think more games should, especially roguelikes that lack a strong meta game aspect or want more depth in team building or meta game decision making.

Just one of these many benefits would make this system a great addition for many games: getting all of them from a single system is exceedingly rare.

A few games that come to mind for this kind of system would be games like Fire Emblem Heroes, which contains similar elements of characters with different aptitudes and skills but lacks a deep progression system or any way to augment them in a deep way. Or roguelike games that entirely lack meta game progression like Slay the Spire.

I'm not saying either game needs this, only that for the right audience it could be a golden bullet. I think it's rare for a game to make such an all-encompassing solution, and I think its creation is pure genius. It takes real foresight and care to have a system that feels deeply linked to every other game mechanic, with complex dynamics that create waves of knock-on effects that work so well together.

I hope you will join me next time as I review another game system that I deeply admire, and stay tuned for more in the future.
