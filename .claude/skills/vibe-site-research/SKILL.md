---
name: vibe-site-research
description: >-
  Find real, live websites that share a target visual STYLE / vibe with a reference site or aesthetic — design research for a reference look. Use this whenever the user wants to find sites "like X", references or inspiration matching a specific vibe/aesthetic/mood, "sites in this style", a cluster of sites that feel like a given reference, who designs/builds sites in a certain look, or where to find more of an aesthetic — even if they never say the word "research". Especially reach for it when a naive keyword search would cluster on the wrong thing (the subject/niche) instead of the actual visual style. It decouples STYLE from NICHE, fans out verified multi-angle research, and compiles a screenshot-verified reference set plus the makers and discovery galleries behind the look.
---

# Vibe-site research

Find a curated set of **real, verified** websites that share a reference's **visual style**, plus the studios/designers who make that look and the galleries where more of it lives.

This exists because ordinary "find sites like X" search fails in a specific way: it latches onto **what the reference is about** (a musician, a coffee brand, a game) and returns more of that *subject*, when the user actually wants more of that *look*. The whole method is built to avoid that trap.

## Three principles (hold these the whole way through)

1. **Style is not niche.** The single most important move. A site can be in the same niche as the reference and look nothing like it (e.g. two musicians, opposite aesthetics), or in a totally unrelated niche and look almost identical (a cozy game site that matches a musician's site). Always separate "what it's about" from "how it looks," and chase the look across niches.
2. **Verify by eye, never by hope.** A URL returning HTTP 200 proves nothing about its style — or that it's even the right page. Open candidates and *look*. Reject dead, redirected, login-walled, and off-style sites. Never put an unverified or invented URL in front of the user.
3. **Honesty over completeness.** Five real, confirmed, on-style sites beat fifteen padded with guesses. Flag what you couldn't confirm. If you discover a premise was wrong (e.g. "that agency built these sites" turns out false), correct it loudly rather than quietly keeping the tidy story.

## When the target is MOTION, not a look (read this first if so)

If the user is hunting a **behavior** — how things *move* (drift, float, bob, sway, parallax, ease, reveal) — the default flow above will fail in three specific ways. Adjust before you start:

1. **A static screenshot CANNOT verify motion.** This is the cardinal error. A still frame proves a site is live and on-palette; it says nothing about whether elements drift over time or how a hover feels. Verifying motion needs one of:
   - **Temporal capture** — screenshot the SAME url twice with different `--virtual-time-budget` waits (e.g. `shot.ps1 ... -WaitMs 2000` and again `-WaitMs 6000`), then compare element positions across the two frames. If a decorative/UI element moved with no input, that's confirmed ambient drift. (For hover/scroll motion, capture is harder — fall back to code-signature.)
   - **Code-signature** — fetch the page source/CSS/JS and look for the mechanism: `@keyframes` with `translate`/`rotate` + `infinite`, `requestAnimationFrame` loops, `transition`/cubic-bezier easings, GSAP/`ScrollTrigger`, IntersectionObserver reveal classes. The code is often the only honest proof of *how* it moves.
   - Say explicitly, per site, whether motion was **temporal-confirmed**, **code-confirmed**, or only **claimed** — never imply you saw motion you couldn't capture.

2. **Design galleries tag by APPEARANCE, not behavior.** Awwwards/godly/siteinspire cluster on look; searching them for motion drags up whatever is flashy (physics toys, WebGL heroes), not the specific quality wanted. Point the search at **motion-native sources** instead: **Codrops** (tympanus.net — tutorials/demos by effect), **CodePen** (search the exact effect), **osmo.supply** (interaction recipes), **Awwwards "Interaction"/"Animation" collections and Site/Interaction-of-the-Day**, **godly.website "playful"**, and for the motion *vocabulary*, **uimovement.com** / **dribbble** interaction shots (concepts, not live sites — use to name the effect, then go find it live).

3. **Technique demos are valid results — often the best ones.** For a behavior, a clean CodePen/Codrops demo of the exact motion (with copyable, reusable code) is usually more useful than a full site that buries it. Don't down-rank them; the deliverable for a motion hunt is "the effect + where its code lives," not just "sites."

The fingerprint (Step 1) also changes: describe the **motion** concretely — *what* moves, *what triggers it* (ambient/continuous vs hover vs scroll vs load), *the path* (vertical bob, orbital wander, multi-axis drift), *the speed/easing* (slow sine, ease-out settle), and *amplitude* (subtle few-px vs large). "Floaty" is not a fingerprint; "each element drifts on an independent slow sine, ~8-15px, never fully still, like paper lanterns in still air" is. Build the trait checklist from THOSE, and tell every subagent the verification rule from point 1.

## Step 1 — Build the style fingerprint

Before searching anything, write a concrete, specific description of the *look*. Vague keywords ("dreamy", "minimal") return generic noise; a precise fingerprint is what makes the search land.

If the user (or another agent) already pasted a style analysis, use it. Otherwise generate one by **visually inspecting the reference site** (headless screenshot — see Step 4 verification tools). Capture, concretely:

- **Mood / feeling** — the emotional register (e.g. "dreamy, nostalgic, cinematic, storybook").
- **Palette** — with **hex values** and a named grading (e.g. "twilight: cornflower #4D82E6 + lavender #8F63DF + sky cyan; warm-pink accents — 'golden-hour at night'"). Color is the strongest, most searchable signal.
- **Typography** — display face vs body face; serif/sans; and crucially any **hand-lettering, brush, or ornamental** treatment (squiggles, tildes, drawn logos).
- **Layout** — column structure, whitespace density, how image-forward it is, nav/rail patterns.
- **Shape language** — organic / blob / masked vs hard rectangles.
- **Decorative motifs** — recurring ornaments, illustration style.
- **Language(s)** — and any bilingual / community feel.

## Step 2 — Decouple style from niche, out loud

Write down two short lists:
- **NICHE (ignore for matching):** what the reference is *about*.
- **STYLE (match on this):** the look, from the fingerprint.

Then commit to **searching the STYLE across unrelated niches**, and to **excluding same-niche/different-style** sites. State the exclusions in the final report — "X is the same niche but doesn't match the style" is a useful, trust-building result, not a failure.

## Step 3 — Turn the style into a trait checklist

Distill the fingerprint into **5–7 discrete, checkable traits**, each something you can answer yes/no per site. Example:

> [ ] twilight/sky-graded palette  [ ] hand-lettered or illustrated display type  [ ] decorative ornaments (squiggle/brush)  [ ] single-column, image-forward, whitespace-rich  [ ] organic/blob/masked shapes  [ ] dreamy/nostalgic/storybook mood

Score every candidate against the checklist and report how many it hits. This replaces a fuzzy "feels similar" with something comparable, and makes the **closest matches** (most traits) obvious — mark them ⭐.

## Step 4 — Fan out research across multiple angles (not one search)

One search angle has blind spots; several blind, parallel angles cover them. Spawn **parallel subagents**, each owning a different cluster, so they don't converge on the same obvious results:

- **Angle A — adjacent niche** (the reference's own world, but style-filtered).
- **Angles B/C — unrelated niches** (deliberately far away — e.g. games, picture-books, editorial, brand sites — to prove and exploit niche-independence).
- **Angle D — the makers** (see Step 6): who designs/builds sites in this look.
- **Angle E — curation galleries** (see Step 6): mine design galleries by style filters.

Give every subagent the **same** package: the style fingerprint, the trait checklist, and these constraints (quote them):

> Match the STYLE, not the subject/niche. Only REAL URLs you confirm exist via search — do NOT fabricate or guess; skip dead/redirected/login-walled. Verify each live and, where possible, screenshot it to confirm the look. For each site: name, URL, niche, which checklist traits it hits, language. Flag anything you couldn't confirm. Return a tight markdown list, no preamble.

Use `Agent` (general-purpose) subagents in a single message so they run concurrently. If subagents aren't available, run the angles yourself sequentially.

## Step 5 — Verify live + visually

Treat agent output as **candidates**, not results. For the shortlist (at minimum the ⭐ picks), open and look:

- **Headless screenshot** of any external URL: `redesign-lab/shot.ps1` in this repo —
  `powershell -File redesign-lab/shot.ps1 -Url "URL" -Out "$env:TEMP\x.png" -W 1366 -H 1600` then read the PNG. (Classic `--headless`, not `--headless=new`.) Or the **web-snapshot** skill if present.
- **Grab real CSS/colors** if you need to confirm palette/type: PowerShell `Invoke-WebRequest URL` works on external domains.
- Reject anything that doesn't actually show the style. A confident screenshot is the difference between this method and a link dump.

Note: heavy WebGL or gated sites may not screenshot cleanly — say so and rely on their case-study/press evidence instead of overclaiming.

## Step 6 — Find the makers and the discovery engines

Two force-multipliers that turn a list into a renewable supply:

- **Makers** — who actually designs/builds sites in this look (studios, agencies, individual designers). One identified maker's portfolio is a whole vein of matches. **Double-check "who made it" claims** — a shared domain or label is not proof of authorship; verify before asserting (a real failure mode: assuming a label's hosting domain meant a single agency built its artists' sites — it didn't).
- **Native vocabulary** — the words insiders use to describe the look, which are far better search terms than English adjectives. For Japanese dreamy/illustrated styles: **幻想的** (gensōteki, dreamlike) · **エモい** (emoi, nostalgic) · **手描き** (tegaki, hand-drawn) · **水彩** (suisai, watercolor) · **やさしい配色** (soft palette).
- **Curation galleries** — the best renewable sources, searched by style filter:
  - **SANKOU!** (sankoudesign.com) — JP gallery; filter by イラスト / 水彩 / 手書き / やさしい配色.
  - **Awwwards**, **FWA**, **godly.website**, **siteinspire**, **land-book**, **httpster** — tag/keyword by the look ("illustration", "pastel", "dreamy", "storytelling", "hand-drawn").
- If no canonical *movement name* exists, say so and describe the look compositionally rather than inventing a label.

## Step 7 — Follow the threads (iterate; don't stop at round one)

The first fan-out is a starting net, not the answer — its real value is the **leads** it surfaces. The strongest matches usually come from chasing those, not from the initial keyword search. Run **at least one follow-up round**, feeding round-one discoveries back in as fresh search angles:

- A **maker** turned up → search their full portfolio/archive; one studio is often a whole vein of matches.
- A **gallery** turned up → mine its style-filtered pages (e.g. SANKOU's 水彩 / 手書き).
- **Native vocabulary** turned up → re-search with those exact terms — far better hits than English adjectives.
- A site sits on a shared **host / label / webring** → check its neighbors.
- A **premise broke** (e.g. "agency X built these" proved false) → re-investigate with the corrected understanding; this often opens the better thread.

Spawn a fresh **parallel batch** of subagents for the strongest leads, verify again (Step 5), and fold the keepers in. Stop when a round returns mostly duplicates or off-style results (diminishing returns) — usually 2-3 rounds total. Skipping iteration is the most common way this method under-delivers.

## Step 8 — Compile the structured doc

Save a markdown report (and summarize the highlights in chat). Use this shape:

```
# Sites sharing <reference>'s style (<date>)

Style fingerprint: <one dense line — mood · palette+hex · type · layout · shapes>.
Trait checklist: [ ] t1  [ ] t2  [ ] t3 ...
NICHE (ignored): <...>   STYLE (matched on): <...>
All URLs verified live + visually inspected. ⭐ = closest matches.

## Makers + where to find more
- Studios/designers: <name — url — what they make>
- Native search terms: <...>   Galleries: <...>

## <Cluster / niche A>
1. ⭐ **Name** — URL — niche — traits hit: t1,t2,t4 — language — one-line why.
...

## Checked + dropped (off-style / dead / unverified)
- <Name — why dropped (same niche but wrong style / 404 / couldn't confirm)>
```

Group by cluster so the niche-independence is visible. Keep the "dropped" list — it's evidence the curation was disciplined, and it stops the same dead ends being re-investigated later.

## Anti-patterns (what makes this method fail)

- **Clustering on subject.** If your results are all the same *kind of thing* as the reference, you matched niche, not style. Stop and re-decouple.
- **Trusting 200s.** Listing URLs you never looked at. Always verify the shortlist visually.
- **Fabricated or "probably exists" URLs.** Never. A smaller honest list wins.
- **Tidy-story bias.** Keeping a clean narrative ("one agency makes all these") after evidence contradicts it. Correct it.
- **Generic adjectives as search terms.** "minimal", "aesthetic", "cool" return noise. Use the fingerprint's specifics and the native vocabulary.
