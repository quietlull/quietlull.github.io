All URLs below were verified live by HTTP probe (status + title) during this pass, not guessed. Method: parsed all 99 cards out of `reference-gallery.html` (tier is assigned at runtime from the `.tier` span, so section order in the raw file is misleading), then crawled each shortlisted site's real link graph to find its actual sub-page paths.

# SUB-PAGE LAYOUT SHORTLIST

**Sources read:** `C:\Users\Rod\Documents\ProjectFiles\Website\redesign-lab\reference-gallery.html` (99 cards, 12 in the Sub-pages section) · `analysis\2026-08-14-gallery-teardown.md` · `analysis\layout-measurements.md` · `references.md`

**Key:** `[GALLERY]` = already a Sub-pages card with a verified first-screen + full-page capture stored locally in `C:\Users\Rod\Documents\ProjectFiles\Website\redesign-lab\references\captures\sub-*.jpg` — the measure phase can start from those without re-capturing. `[NEW]` = site is in the gallery, this sub-page was found by crawling and is not yet carded.

---

## 1. POST / ARTICLE (post template)

| Site | Tier | URL | Note |
|---|---|---|---|
| dimden | **S** | https://dimden.dev/blog/13-optimizing-rendering-of-100k-html-nodes | `[GALLERY]` Rod on the site: "So much feature-slop, playful, tons to interact with... Says a lot without explicit showcases." Mine: title, date line, prose at a comfortable measure, inline images, syntax-highlighted code block, **same fixed 900px column as the home page, so the site never changes width between page types**. |
| whey-isolate | untiered | https://whey-isolate.neocities.org/posts/2024-04-20-The-Pride-Morse-Manifesto | `[GALLERY]` (URL now redirects, drop the `.html`). Mine: long article in a three-column shell (nav left / article centre / sidebar right) over a starfield; chrome never changes between index and article, only the middle column does. |
| Eve | **B** | https://eveofficial.com/news/20260801200004.html | `[NEW]` Rod: "Good spacing. Standout is their personal logo... basically a really good favicon." Minimal JP news-article template. |
| ZUTOMAYO | **B** | https://zutomayo.net/news/ (index; individual entries redirect into bespoke special pages) | `[NEW]` Rod: "Cool but a little too cluttered. Like the style + spacing, and the little fake popup windows - very internet-core." |
| Mike Klubnika | C+ | https://mikeklubnika.com/logs/log_1 | `[NEW]` Rod: "Looks awful, and I LOVE it - very custom, very old-internet." Devlog post template; site also has `/updates/update_37` and `/misc/entry_4` as sibling entry shapes. |
| Cyanilux | C | https://www.cyanilux.com/tutorials/urp-shader-code/ | `[NEW]` Rod: "Not a looker, but an inspiration." Nearest peer to Rod's own tech-art posts; left-border callouts, rounded panels. |
| Maxime Heckel | C | https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders | `[NEW]` Rod: "Feels like AI. I like their timeline, nothing else." Include as the anti-reference for post pages. |
| Inigo Quilez | C | https://iquilezles.org/articles/raymarchingdf/ | `[NEW]` Rod: "Minimalist - they're the GOAT of SDF stuff, but not a site goal." Teardown: 5KB of CSS total. |
| Mateusz Urbanowicz | untiered | https://mateuszurbanowicz.com/2026/05/02/taking-good-photos/ | `[NEW]` Gallery flag "shinkai grade"; watercolour + sidebar-nav editorial blog. |

---

## 2. PROJECTS-INDEX

| Site | Tier | URL | Note |
|---|---|---|---|
| 109ichiki | **A** | https://109ichiki.com/works/ | `[GALLERY]` Rod: "love the font, the use of space, and the 3D elements." Mine: **the closest reference to a projects page** - huge mono `WORKS_` label + barcode motif, one line of filter chips, then a plain thumbnail grid with captions. No cards, no borders, no shadows, inside the site's fixed frame. Measured: works region = 76% of page, container 1400/97%, 97.5px section breath. |
| Unseen Studio | **S+** | https://unseen.co/projects/ | `[NEW]` Rod: "S+. STEAL CANDIDATE... Ties straight to your water-scene." Also live: https://unseen.co/world/ and https://unseen.co/contact/. (`/work`, `/about`, `/journal` are 404 - do not cite those.) |
| potg.art | A- | https://potg.art/works/ | `[NEW]` Rod: "Main art floats around in the Works section... love the background + spacing, very little text, very nice fonts." Scroll-jacked stacked 100vh scenes - art floats inside full-screen scenes, no flow layout. |
| yannesidibe | **B** | https://www.yannesidibe.com/work | `[NEW]` Rod: "Took the cool element (the hover). Nothing else about the site is cool, tbh." **Note: `references.md` line 21 cites `yannesidibe.com/about` - that URL is now a 404**, the site restructured. |
| Kaito Note | **B** | https://kaitonote.com/works/ | `[NEW]` Rod: "Great shader effects - feels interactive." |
| TUYU | **B** | https://tuyu.moe/works/ | `[NEW]` Rod: "love the hand-drawn watercolor aesthetic + colors, good spacing... but the scene is a little too cluttered." |
| chriskalafatis | B- | https://chriskalafatis.com/projects | `[NEW]` Rod: "like the motion." Brutalist/grotesque, black-on-white. |
| Jaime Kim | B- | https://www.jaimekim.com/books and https://www.jaimekim.com/sketch | `[NEW]` Rod: "Cute line boil, good layout, great name text." Measured: 286px intro + uniform 296px-tile masonry wall x138 - **flagged in layout-measurements as ≈ the pomodorosa anti-pattern**. |
| MinionsArt | C+ | https://minionsart.github.io/tutorials/ | `[NEW]` Rod: **"One of the reasons I'm starting my own. Love the card look (rounded edges), the layout, and the tags."** Highest-praise index in the whole gallery. Caveat: it is index-only - cards link out to Patreon, there is no on-site post template. Grid is JS-built from `/tutorials/TutData.json`. |
| Mike Klubnika | C+ | https://mikeklubnika.com/games (index) + https://mikeklubnika.com/games/buckshot_roulette (detail) | `[NEW]` The most complete index→detail pair of any indie site in the set. |
| dimden | **S** | https://dimden.dev/gallery | `[NEW]` "dimden's cool gallery" - an OC art gallery inside the same fixed 900px column. Not yet carded; direct sibling to Rod's own art/projects surface. |
| harumaki | **S** | https://harumakigohan.com/chara/ | `[GALLERY]` Mine: uniform avatar grid under a tilde-wrapped `~CHARACTERS~` header on the same fixed sky as home. **The one place this site uses a strict grid, and it works because the ground behind it is atmospheric.** |
| cinni | untiered | https://cinni.net/art/ | `[GALLERY]` Mine: deliberately sparse art index - a few framed pieces on a patterned wall with hand-drawn garlands, one screen, no pagination. |
| Avogado6 | C | https://www.avogado6.com/work2021/ | `[NEW]` Dense archive-grid; teardown notes 214 `<img>` tags, second only to harumaki main. |
| pomodorosa | B+ | https://pomodorosa.com/tagged/works | `[NEW]` ⚠️ **CONFLICT - resolve before measuring.** Gallery card says "B+. Great bento-box layout for the projects." `layout-measurements.md` lines 48-52 supersede it: *"Rod 2026-08-11: 'a site with layout I dislike'... numbers kept so we know what NOT to do: tiny intro + wall-dominant + minimal chrome = disliked."* Treat as anti-reference unless Rod re-confirms. |

---

## 3. ABOUT

| Site | Tier | URL | Note |
|---|---|---|---|
| dimden | **S** | https://dimden.dev/about.html | `[GALLERY]` Mine: stacked bordered panels - a portrait box, then short first-person paragraphs each in its own frame, over a photographic background. **Personality through framing rather than typography.** |
| harumaki | **S** | https://harumakigohan.com/profile/ | `[GALLERY]` Mine: almost nothing - a `~PROFILE~` tilde header, a small centred block of text, a row of social icons, and an enormous amount of sky. **The restraint is the statement.** |
| 109ichiki | **A** | https://109ichiki.com/profile/ | `[GALLERY]` Mine: a split - oversized `PROFILE_` label and bio left, a single artwork panel floating right on a wireframe grid, socials as small labelled buttons. Vast empty space below the fold rather than filler sections. |
| potg.art | A- | https://potg.art/about/ | `[NEW]` |
| Kaito Note | **B** | https://kaitonote.com/profile/ | `[NEW]` |
| TUYU | **B** | https://tuyu.moe/profile/ | `[NEW]` |
| ZUTOMAYO | **B** | https://zutomayo.net/profile/ | `[NEW]` |
| Eve | **B** | https://eveofficial.com/profile.html | `[NEW]` |
| chriskalafatis | B- | https://chriskalafatis.com/about | `[NEW]` |
| Jaime Kim | B- | https://www.jaimekim.com/about | `[NEW]` |
| Miranda Sofroniou | B- | https://www.mirandasofroniou.com/about | `[NEW]` Rod: "B-. Same as Jaime Kim." Teardown caveat: Wix build, its 874 custom properties are framework boilerplate, **do not cite as design-system evidence**. |
| Mike Klubnika | C+ | https://mikeklubnika.com/about | `[NEW]` |
| cinni | untiered | https://cinni.net/about | `[GALLERY]` (redirects from `about.html`) Mine: an about page as a **scrapbook** - profile panel with full-body illustration, a "what's in my bag" object spread, socials as pixel buttons, site awards. **Information as collected objects rather than prose.** |
| whey-isolate | untiered | https://whey-isolate.neocities.org/about | `[NEW]` Not carded; same three-column shell as their gallery/post pages. |
| brittanychiang | C | https://brittanychiang.com/ (about is a section, not a page) | Rod: "Kinda looks bad but it's ok." Sourced element only: the cursor vignette spotlight (`cursor-lantern.js`). |

---

## 4. BLOG-LIST (post index / ramblings)

| Site | Tier | URL | Note |
|---|---|---|---|
| dimden | **S** | https://dimden.dev/blog | `[GALLERY]` Mine: **no thumbnails at all** - a stack of link-coloured titles each with a small "POSTED ON \<date\>" line beneath. Pure text list in the fixed column. **Proof an index does not need cards.** |
| harumaki | **S** | https://harumakigohan.com/live/ | `[GALLERY]` Filed as "event list" but structurally the dated-entry index: `~EVENT~` header then dated entries down a narrow column, each with line-art or a poster, over the fixed sky. Long scroll built from one repeating entry shape. |
| Eve | **B** | https://eveofficial.com/news/ | `[NEW]` |
| ZUTOMAYO | **B** | https://zutomayo.net/news/ | `[NEW]` |
| MinionsArt | C+ | https://minionsart.github.io/tutorials/ | `[NEW]` The tag-filter + card index Rod explicitly named as a reason he started his own site. Doubles as projects-index candidate. |
| Mike Klubnika | C+ | https://mikeklubnika.com/logs | `[NEW]` |
| Cyanilux | C | https://www.cyanilux.com/recent/ and https://www.cyanilux.com/contents/ | `[NEW]` Two different index shapes on one site: reverse-chron feed vs. a full grouped contents table. |
| Maxime Heckel | C | https://blog.maximeheckel.com/ (the homepage IS the list) | `[NEW]` Rod: **"I like their timeline, nothing else."** Year-list + mono dates. The timeline is the specific thing to measure. |
| Inigo Quilez | C | https://iquilezles.org/articles/ | `[NEW]` Flat card grid content index, near-zero styling. |
| Reol | C | https://reol.jp/blog/list/1/0/ | `[NEW]` Rod: "C. Not much to say." Low priority. |
| Avogado6 | C | https://www.avogado6.com/diary2025/ | `[NEW]` Year-partitioned archive (`/diary2017` … `/diary2025`). |
| Mateusz Urbanowicz | untiered | https://mateuszurbanowicz.com/posts-so-far/ | `[NEW]` |
| whey-isolate | untiered | https://whey-isolate.neocities.org/Blog | `[NEW]` Note the capital B; `/blog` is a 404. |

---

## 5. RESUME

**No true resume/CV page exists anywhere in the 99 cards.** This is a genuine gap in the reference set, not an omission of this pass. The honest candidates are timeline/archive *devices* that a resume page could be built from:

| Site | Tier | URL | Note |
|---|---|---|---|
| brittanychiang | C | https://brittanychiang.com/archive | `[NEW]` The closest thing to a CV surface in the gallery: a full archive **table** (year / title / made-at / built-with / links). Site tags are literally `timeline`, `skill-pills`, `dev-portfolio`. Rod's read is lukewarm ("kinda looks bad but it's ok"), so treat as structural donor only. |
| Freya Holmér | C | https://acegikmo.com/ | `[NEW]` Avatar-hero + project grid + timeline = a CV page in all but name, from a tech-art peer. Rod: **"Oddly enough I dig it - minimalist... Not what I want, but I like it nonetheless."** Teardown: 5KB CSS. (`acegikmo.com/blog` returns an empty 17-byte page - not a real surface.) |
| harumaki /10/ | untiered | https://harumakigohan.com/10/ | `[GALLERY-adjacent]` The dated-timeline spine: fixed 106px illustrated rails on both page edges, ~900px column between, entries as dates (3.28, 4.26, 10.29…) each a heading plus poster. Teardown confirms `repeat-y` x4 = the tiled vertical rule (`date_line.png`). The best *timeline mechanism* in the set. |
| Maxime Heckel | C | https://blog.maximeheckel.com/ | The year-list timeline Rod singled out. |
| Reol | C | https://reol.jp/feature/history_of_reol | `[NEW]` A literal career-history page. Low tier, but it is the only "history of me" surface found. |

---

## 6. PORTAL (root splash / gateway)

| Site | Tier | URL | Note |
|---|---|---|---|
| merodev | **A** | https://merodev.net/ | Rod: **"Like a lot about it - colors + playful bits. Layout isn't amazing. It screams 'internet,' which you like."** The enter-gate is the homepage itself; tags `enter-gate` / `black-gate` / `terminal-ui`. Measured: "enter-gate → one-screen desktop metaphor; no flow layout." ⚠️ Client-rendered - static crawl returns 0 links, needs the CDP pass. |
| Unseen Studio | **S+** | https://unseen.co/ | Rod's only S+ and his declared STEAL CANDIDATE (reactive water, click-to-dive, cursor butterflies). Tagged `splash-screen`; measured as a single 100vh WebGL canvas, layout N/A. |
| 109ichiki | **A** | https://109ichiki.com/ | A **fixed SVG frame 20px inside the viewport** - the site scrolls inside a picture frame, with draggable retro windows and a full-screen 1080px footer. The frame is the portal device. |
| midnightsolarium | **B** | https://midnightsolarium.neocities.org/ | Rod: "Old-school 'homemade' vibe; leans almost intentionally bad / early-2000s. Like it, but B." Explicitly tagged `gateway`; one screen, fixed 700px column, content-warning entry. Title is literally ". . . entering the solarium". |
| ZUTOMAYO | **B** | https://zutomayo.net/ | Measured: "one-screen interactive landing (bug-catch); no flow layout." A portal that is a *game*. |
| cinni | untiered | https://cinni.net/ | The **diorama**: one fixed 1125x740 stage centred in the viewport with **no page scroll at all** - a room you look into rather than a page you travel down. Sidebar menu is the portal's index. |
| melonking | untiered | https://melonking.net/ → https://melonking.net/melon | Maximalist one-screen splash world (795px "everything" block); the real hub is `/melon`, which fans out to `/frames/*` sub-worlds. |
| whey-isolate | untiered | https://whey-isolate.neocities.org/sitemap | `[NEW]` A **star-map sitemap** - regions (Pleiades / Hyades / Orion) with absolutely-positioned labels over one image. The most literal "portal" artifact found, and not yet carded. |
| terminal.shop | untiered | https://www.terminal.shop/ | Pure-black terminal/code-editor UI with line numbers; sub-pages `/about`, `/faq`, `/cron`, `/api`. |

---

## Caveats the measure phase must carry

1. **`pomodorosa` is contradicted between two docs** (gallery B+ "great bento-box layout for the projects" vs. `layout-measurements.md` "a site with layout I dislike", dated later). Get Rod's call before measuring it.
2. **`norikura-hanabi.com` is dead (HTTP 404)** and is still carried as a B-tier card. Only the stored capture survives. No sub-pages are recoverable.
3. **`references.md` line 21 is stale**: `https://yannesidibe.com/about` now 404s; the live surface is `https://www.yannesidibe.com/work`.
4. **Sites with no crawlable sub-pages (client-rendered - need the CDP/browser pass, static fetch returns zero links):** `stephanewillems.be` (A), `merodev.net` (A), `dennissnellenberg.com` (B-), `fumino.b-rave.tokyo` (B+), `unit.software` (C+), `cortiz.dev` (C), `filipporuffini.com` (untiered). The teardown already flagged stephanewillems + merodev as "static read invalid".
5. **`hoshimachi-suisei.jp` (A-) has no reachable sub-page paths at all** - `/profile/` and `/discography/` both return 404 with the SPA shell. Its 86 custom properties are real, but its sub-pages need a browser.
6. **12 sub-pages already have verified captures on disk** (first-screen + full-page, `gaps: []`, contact-sheet checked) at `C:\Users\Rod\Documents\ProjectFiles\Website\redesign-lab\references\captures\` — `sub-109-works`, `sub-109-profile`, `sub-dimden-blog`, `sub-dimden-post`, `sub-dimden-about`, `sub-harumaki-chara`, `sub-harumaki-profile`, `sub-harumaki-live`, `sub-whey-gallery`, `sub-whey-post`, `sub-cinni-about`, `sub-cinni-art`. Stitched full-pages repeat fixed layers (nav, backdrops, edge rails, frames) once per screen — a known artifact, not a layout finding.
7. **The teardown's headline finding applies to every sub-page here**: harumaki-family pages are image-composited (304 `<img>`, zero design tokens) while western studio/portfolio pages are tokenised. Measuring a harumaki sub-page's spacing will not transfer unless the artwork question is settled first.