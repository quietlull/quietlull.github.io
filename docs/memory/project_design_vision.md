# Design Vision & Discovery — Rodney Fan portfolio

**Captured:** 2026-04-25 (during full session on tech-art portfolio redesign)

This file holds the personal/design-direction context I should NOT lose between sessions. Read this BEFORE proposing any major visual change.

## The brief, restated

Rod's existing tech-art portfolio felt "like a Claude site" — generic professional aesthetic, glass-morphism cards, breathing animations on everything, gold accent on dark. Not because individual elements are bad, but because the *structure* and *combination* read as AI-default.

The pivot direction: **Neocities energy** — passion-dense, hand-built feel, owner's interests on display, decoration for its own sake — but with modern web polish (responsive, performant, accessible, smooth interactions). Move *away* from corporate-portfolio training data.

**Crucial nuance:** This is NOT rebuild-from-scratch territory. The existing site's lantern/festival theme is genuinely Rod's (see below). The job is to make existing personality elements feel MORE intentional + add specific personal touches + cut generic Claude defaults + push the existing theme harder.

## Site balance

- **65% portfolio / 35% personal.** Distinct separation already exists between project posts (portfolio) and the About page + Ramblings (personal).
- Projects should be findable in a single click and on the landing page. Hiring-manager scannability stays a hard constraint.
- A separate clean `/resume` page makes sense (was already on the to-do).
- Don't pitch "all-in personal site" or "pure portfolio" — neither is what he wants.

## What the site should say about Rod

- Passionate about art + games + tech art (not just tech art alone)
- Attention to detail
- Loves what he does
- Has whimsy; values child-like wonder and curiosity
- Stories matter to him deeply
- A jack-of-all-trades, dreamer, motivated by seeing others' work

## Rod in his own words (verbatim from discovery)

- **Self-described:** "a dreamer, jack of all trades, and someone whos motivation comes from seeing other's work and from broad places... a whimsical way of thinking and a love of things that provide a sense of child like wonder and curiosity"
- **Obsessions:** anime / fictional media (especially Monogatari and similarly reputation-heavy series); narrative works in general; a "bit of a morbid fascination with mental illness and media that portrays it" (he suffers from some of it himself — handle this with respect, don't make light of it, but it IS part of his honest self)
- **At parties he says:** "I'm a game developer first, artist after that. Technical art is poorly understood inside and outside the games community." He knows a lot about games (rendering, design, developer history).

## Visual identity already revealed by Rod

- **Phone wallpaper:** animated wallpaper of Steele from Honkai Impact 3rd (~10 years unchanged) — character struggling with confidence, animation just felt right
- **Discord PFP:** Rod's own (self-described "poorly drawn") sketch of Zoe from League of Legends. Skin concept: **yukata put on incorrectly + fireworks + festivals** (also ~10 years unchanged). The festival/firework theme is *his*, not a Claude projection.
- This is why the lantern theme on the live site WORKS — sky lanterns are festival items. Don't throw it away. The existing palette (amber/gold on dark navy) is built around his Three.js lantern scene and is from a specific part of Shinsekai Yori's ED.

## The core tension — RESOLVED (2026-06-02): "look at this," not "look at me"

The wonder/whimsy vs. don't-center-myself tension is **resolved**, and the earlier dimden framing ("personality only through craft, never look at me") was refined by Rod as **too austere** — taken literally it produces the formal/quiet/impersonal failure mode where none of his voice survives.

The real rule is about **register**, not absence:
- **"Look at me"** — arrogant, impersonal; the subject is Rod's *status*. REJECT.
- **"Look at this"** — casual, excited; the subject is the *work* or a cool thing he's into. Rod is still very present (it's HIS enthusiasm pointing), but aimed OUTWARD. Like dragging a friend over to show them something, not handing over a resume. KEEP.

**Consequence: Rod's voice is allowed to be loud.** The enthusiasm IS the personality. We are NOT suppressing him to defer to the work — we aim his presence at the work instead of at his importance. Truer to "a dreamer motivated by seeing others' work."

**Confirmation from his own taste:** every reference he gave already lives in "look at this" — SuckerPinch ("look at this absurd thing I did"), Acerola ("look at this rendering trick"), dimden's cursor-cat ("look at this thing I made for fun"). He never picked a "look at me" creator.

**The litmus test for ANY element going forward:**
> Is this pointing at the work / a cool thing (keep), or at Rod's status (cut)? Is the tone casual-excited, like showing a friend — not curated-to-impress?

## Aesthetic anchors / references he loves

| Reference | What he likes |
|---|---|
| **dimden.dev** | THE primary reference. Little cat follows cursor. Neon sign you can toggle. Live cursor tracking of other visitors visible on the page. Many interactive elements. "Incredible, huge source of inspiration." |
| **PSO2 NGS UI** | Futuristic. Contextual controls (hold ESC vs tap ESC do different things). Good interaction design even though the game was bad. |
| **Monogatari editing** (Shaft) | Strongly resonates. Bold typographic moves, asymmetric composition. (NOTE: He does NOT want CJK characters on the site — that was a Claude reach that he disliked.) |
| **Acerola** | Channel he watches fully; she uses Monogatari-style editing in tech-art videos. |
| **SuckerPinch** | Channel he likes for "very funny and abstract as well as unusual comp sci videos" — even when he doesn't understand them. |
| **Shinsekai Yori ED** | The amber/gold palette on dark navy is sourced from a specific part of this ED. Don't replace the palette wholesale. |
| **PSO2** (original) | One of his favorite games. NGS was a poor follow-up. |
| **A game with a mini-game volume control** | He loves UI that contains a tiny game (even though he recognizes that's bad UX for a volume slider). |

## What Rod resists

- Corporate speech, vague passion statements, generic taglines ("It's the artificial feeling that bugs me")
- Lack of excitement and movement
- Layout / element choices that don't feel intentional ("things don't look intentionally arranged, strange decisions on spacing")
- Typography and color are NOT what feel Claude-y to him — **it's the layout and the design of the elements themselves**
- People who think too highly of themselves; he doesn't see himself as important
- "Subscribe to me" energy; the focus should be on the WORK he made or the cool thing he's studying, not on Rod himself
- CJK characters as decoration (Claude reach he disliked)
- Designs that try to look serious

## What visitor experience Rod wants

- Imagined visitor: someone bored, shuffling through portfolios
- Wants them to feel wonder, joy, whimsy, interest sparked just from the page
- If they like a project, focus should land on the project, not on Rod
- If they want to know more about him, the about/ramblings is there but it's not the headline

## Practical constraints

- **GitHub Pages static hosting.** No backend. Dimden-style live cursor sharing, real-time guestbooks etc. need a 3rd-party service or are out.
- Existing features Chirpy supports that he likes: visitor counter, achievements, themed cursor, sparkler
- Open to adding: a comment section
- Open to: doing some custom art (Figma — he made his favicon there). More personal art comes after he starts his solo game project.
- Closed on: music toggle / now-playing widget. He doesn't want to share listening data. A "music I like" subpage is OK.

## What he doesn't see crossover for

- Audio gear and wires/strands/cables (which he loves — they remind him of shader graph nodes). He can't see how to incorporate into the site. (Note for future: maybe a SVG cable-routing decoration between sections, or a node-graph-inspired connector animation? Defer for now.)

## Cross-cutting design moves that emerged

1. **Keep the lantern/festival theme.** It's genuinely his (Zoe yukata + fireworks profile picture, ten years of consistent festival imagery). The execution was what failed in earlier previews, not the theme.
2. **Add specific dimden-style interactive moments.** Even one or two — a cursor element that does something playful, a UI toggle that flips a visual state, hidden hover surprises.
3. **Replace generic taglines with specific work hooks.** Instead of "Real-time shaders & systems," sit with the specific best thing each project taught.
4. **Reduce self-importance.** Hero shouldn't be a giant name-and-tagline. The hero should center the *work* or a thing he's interested in right now.
5. **Push details that feel hand-placed.** Avoid the algorithmic-grid feel. Use intentional spacing decisions, not even rhythm. (User explicitly named "strange decisions on spacing" as a Claude tell.)
6. **NOT a clean-slate rebuild.** Modify the existing site. Don't propose massive overhauls; iterate on specific surfaces.

## Things to revisit later

- "Desk / workshop bench" metaphor proposal — Rod said not worth pursuing right now but keep on backburner.
- Audio-gear / cable-as-node aesthetic — open question, no clear hook yet.
- Music I like subpage — possible, not priority.
- Comment system — wants to add, future.
- Solo game project — when Rod starts it, expect more custom art assets to feed into the site.

## How to behave when proposing future changes

- Ask before building. Tiny experiments on single surfaces, not full-page mockups.
- Quote his specific words back when proposing direction — show the connection.
- Avoid the temptation to "design a system" — Neocities sites aren't systematic; they're collaged.
- When proposing references, name *specific* sites/games/moments not categories.
- Resist the urge to add three-column card grids, glass cards on every surface, breathing-glow on every element, monospace taglines under every header. These are tells.
- When unsure, lean **dimden.dev energy + Rod's existing lantern/festival theme**, not "premium dark mode portfolio."
