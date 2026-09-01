# minionsart.github.io - Unity tutorial prose

Sourced 2026-08-18 by curl, then independently re-grepped by a second agent against the
downloaded files. Only declarations marked CONFIRMED below survived that check.

- **Article read:** https://minionsart.github.io/tutorials/grasssystem.html
- **Stylesheets downloaded:**
  - https://minionsart.github.io/tutorials/style.css
  - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css

## Confirmed components (10)

### callout - `.dropdown-content`

The site's only callout device: a pure-black panel dropped on the #353635 page ground, no border and no icon, with a soft 8px-down 16px-blur shadow so the darker block reads as sitting BELOW the page rather than raised. The site reuses its dropdown-menu class verbatim as a prose notice box, so the geometry is menu geometry, not a designed admonition.

Source file: https://minionsart.github.io/tutorials/style.css

```css
.dropdown-content {
    position: relative;
    background-color: black;
    min-width: 160px;
    font-size: 14px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}
```

Used on the page as:

```html
<div class="dropdown-content" style="max-width: 450px; align-content: center; margin: auto">
    <span class="dates">Permission: </span> These assets can be used in both free and commercial
    projects. You can modify it to suit your own needs. Credit is not necessary, but highly appreciated.
    You may not resell the assets on their own.
</div>
```

> Verify pass: EXISTS in style.css:421-428, exact match with claim: ".dropdown-content {\n    position: relative;\n    background-color: black;\n    min-width: 160px;\n    font-size: 14px;\n    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n    z-index: 1;\n}" USED on page: Posts.html:87 `<div class="dropdown-content">` wrapping the Permission callout text, and grasssystem.html:63 `<div class="dropdown-content" style="max-width: 450px; align-content: center; margin: auto">`. Adversarial check on the W3Schools-dropdown suspicion: Builder.js:33-45 does toggle `dropdownContent.style.display`, but `grep -n "dropdown-btn" *.html` returns no matches, so the `if (dropdownBtn != undefined)` guard never fires an

### callout - `.sectionbackground`

A tinted-block callout that is literally the base .section rule (padding 7px / 20px sides) plus one fill and a near-square 2px radius. Contrast with the black .post_card parent is tiny (#1c1c1c on #000), so the box separates by fill alone, no rule, no accent bar, no left border.

Source file: https://minionsart.github.io/tutorials/style.css

```css
.sectionbackground {
    padding: 7px;
    padding-left: 20px;
    margin: 10px;
    padding-right: 20px;
    border-radius: 2px;
    background-color: #1c1c1c;
}
```

Used on the page as:

```html
<div class="sectionbackground">
    Source Files (Seperate Runtime Package included):<br />
    <div id="sourcelinks">
        <div class="section" id="extraLinks">
```

> Verify pass: EXISTS in style.css:487-494, exact match: ".sectionbackground {\n    padding: 7px;\n    padding-left: 20px;\n    margin: 10px;\n    padding-right: 20px;\n    border-radius: 2px;\n    background-color: #1c1c1c;\n}" (note the real file genuinely has padding-left before margin before padding-right in that odd order, exactly as claimed). USED on page: Posts.html:80 `<div class="sectionbackground">` containing "Source Files:", plus grasssystem.html:117 and grasssystem.html:199.

### heading - `.dates`

The hanging-label device that carries every prose section: a violet (#966eff) inline lead-in word ending in a colon ("Permission: ", "Description: ", "Tags: "), set in the SAME size and weight as the body copy. The only signal is hue, so labels never break the text block's rhythm.

Source file: https://minionsart.github.io/tutorials/style.css

```css
.dates {
    color: #966eff;
    margin: 5px;
}
```

Used on the page as:

```html
<div><span class="dates">Description: </span></div>
<div id="postdescription" class="post_description">
    Base Setup for the Grass System:
```

> Verify pass: EXISTS in style.css:80-83, exact match: ".dates {\n    color: #966eff;\n    margin: 5px;\n}" (immediately followed by a distinct `.dates2 { color: #d46eff; margin: 5px; }` at :84 - not conflated). Only one `^.dates {` in the file. USED on page: Posts.html:71 `<div><span class="dates">Description: </span></div>`, Posts.html:88 `<span class="dates">Permission: </span>`, Posts.html:116, grasssystem.html:64 and :85, and injected by Builder.js:364 `'<span class="dates"><calendar></calendar> Released: </span>' + a.date`. CAVEAT on the claimed role "heading": every real usage is an inline label span inside body text, never a heading element.

### heading - `.centered`

A three-shadow faux-emboss: two purple (#6f2faa) offsets pushed up-left and up-right plus one dark violet (#30144a) 1px down, which fakes a light source above and a drop below on white text. The rule is a bare <hr /> placed INSIDE the heading div, so the divider inherits the heading's own 10px margin box instead of being a sibling.

Source file: https://minionsart.github.io/tutorials/style.css

```css
.centered {
    color: white;
    text-shadow:
        #6f2faa -1px -2px 0px,
        #6f2faa 2px -2px 1px,
        #30144a 0px 1px 1px;
    font-size: 30px;
    line-height: 1;
    height: auto;
    text-align: left;
    padding: 5px;
    margin: 10px;
}
```

Used on the page as:

```html
<div class="centered">
    Base Grass System
    <hr />
</div>
```

> Verify pass: EXISTS in style.css:305-315, exact match including the three-stop text-shadow: ".centered {\n    color: white;\n    text-shadow:\n        #6f2faa -1px -2px 0px,\n        #6f2faa 2px -2px 1px,\n        #30144a 0px 1px 1px;\n    font-size: 30px;\n    line-height: 1;\n    height: auto;\n    text-align: left;\n    padding: 5px;\n    margin: 10px;\n}" Adversarial check: a near-identical `.centeredSmaller` sits directly above at :291-303 differing only in font-size 22px - the claim correctly quoted the 30px `.centered`, not the neighbour. USED as a heading: Posts.html:63 `<div class="centered" id="title">Glitch/Wireframe Shader Graph</div>`, grasssystem.html:74, :159, :247 `<div class="centered" i

### prose-link - `a, a:hover`

Links are undifferentiated from body text at rest (white, no underline) and identify themselves only on hover, via a hue jump to aqua stacked with filter: brightness(150%), so the whole element including any icon-image child brightens, not just the glyph color.

Source file: https://minionsart.github.io/tutorials/style.css

```css
a {
    color: white;
    text-decoration: none;
}

a:hover {
    color: aqua;
    filter: brightness(150%);
}
```

Used on the page as:

```html
<a href="https://www.youtube.com/watch?v=2OA9sicjj7E"><youtube></youtube>Video Tutorial</a>
```

> Verify pass: BOTH EXIST as bare element rules. style.css:11-14 `a {\n    color: white;\n    text-decoration: none;\n}` and style.css:25-28 `a:hover {\n    color: aqua;\n    filter: brightness(150%);\n}`. Exactly one `^a {` in the file, no @media re-declaration. USED on page: anchors throughout, e.g. Builder.js:339 `postlink.innerHTML = "<a href=" + a.link + "><linkIcon></linkIcon> READ POST</a>"` and Builder.js:456 `'<span class="postLink"><a href="' + a.webgllink + '">DEMO </a></span>'`.

### prose-link - `.postLink`

Inline links promoted to purple chips (#572585, 2px radius) sitting mid-sentence, with the rest of the sentence continuing as plain text after the chip. The four-corner 1px text-shadow in near-black (33,25,15) is a hand-rolled 1px outline that keeps white 14px bold legible on the mid-purple fill.

Source file: https://minionsart.github.io/tutorials/style.css

```css
.postLink {
    height: 10px;

    text-align: center;
    text-shadow:
        rgb(33, 25, 15) -1px -1px 0px,
        rgb(33, 25, 15) 1px -1px 0px,
        rgb(33, 25, 15) -1px 1px 0px,
        rgb(33, 25, 15) 1px 1px 0px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
    font-family: "Franklin Gothic Medium", serif;
    background-color: #572585;
    border-radius: 2px;
    margin: 5px;
    padding: 11px;
}

.postLink:hover {
    color: aqua;
    filter: brightness(150%);
}
```

Used on the page as:

```html
<span class="postLink" id="postlink"
    ><a href="https://www.patreon.com/posts/grass-system-urp-83683483"
        ><linkicon></linkicon>Free post</a
    >
</span>
Base Grass System for BIRP and URP
```

> Verify pass: EXISTS in style.css:55-73. Every quoted line matches verbatim, including the four-stop `rgb(33, 25, 15)` text-shadow, `font-family: "Franklin Gothic Medium", serif;` and `background-color: #572585;`. FLAG: the claim is TRUNCATED mid-property at the bare word "border" - the real rule continues `border-radius: 2px;\n    margin: 5px;\n    padding: 11px;\n}` and is followed by `.postLink:hover { color: aqua; filter: brightness(150%); }` at :75. Truncation, not fabrication. USED on page: Posts.html:78 `<div><span class="postLink" id="postlink">Free post </span> Free resources!</div>`, grasssystem.html:100/109/182/191, and Builder.js:456.

### prose-link - `.patreonDownloadLink`

Same chip geometry as .postLink but recolored orange (#e56d3c) and padded 5px instead of 11px, so link CLASS is encoded by hue and chip size while the outline/type treatment stays identical. Its hover drops the color change and keeps only brightness(150%), because aqua-on-orange would break the semantic.

Source file: https://minionsart.github.io/tutorials/style.css

```css
.patreonDownloadLink {
    height: 10px;

    text-align: center;
    text-shadow:
        rgb(33, 25, 15) -1px -1px 0px,
        rgb(33, 25, 15) 1px -1px 0px,
        rgb(33, 25, 15) -1px 1px 0px,
        rgb(33, 25, 15) 1px 1px 0px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
    font-family: "Franklin Gothic Medium", serif;
    background-color: #e56d3c;
    border-radius: 2px;
    margin: 5px;
    padding: 5px;
}

.patreonDownloadLink:hover {
    filter: brightness(150%);
}
```

Used on the page as:

```html
<span class="patreonDownloadLink"
    ><a href="https://www.patreon.com/posts/grass-system-urp-85356573"
        >DOWNLOAD
    </a></span
>
<patreon></patreon>URP Files ($10 Tier)
```

> Verify pass: EXISTS in style.css:94-112. All quoted lines match verbatim, including the identical four-stop `rgb(33, 25, 15)` shadow and the distinguishing `background-color: #e56d3c;` (orange, vs .postLink's purple #572585 - the claim did not conflate the two). FLAG: TRUNCATED - the claim stops at background-color; the real rule continues `border-radius: 2px;\n    margin: 5px;\n    padding: 5px;\n}` (padding 5px here, vs 11px on .postLink) plus `.patreonDownloadLink:hover { filter: brightness(150%); }` at :114. USED on page: grasssystem.html:122, :131, :204, :213 `<span class="patreonDownloadLink"`, and injected by Builder.js:400, :405, :411, :424, :437.

### prose-link - `linkIcon`

The external/leading link mark is an INVENTED HTML element (<linkicon>) whose entire content is replaced by content: url(...) on a raster PNG, nudged down 3px via position: relative to sit on the text baseline. The whole icon set (patreon, youtube, twitch, tag, calendar, urp, godot) is built this way, no pseudo-elements and no <img> tags in the prose.

Source file: https://minionsart.github.io/tutorials/style.css

```css
linkIcon {
    max-height: 20px;
    top: 3px;
    content: url(/tutorials/Images/link.png);
    position: relative;
}
```

Used on the page as:

```html
<a href="https://www.patreon.com/posts/grass-system-urp-83683483"><linkicon></linkicon>Free post</a>
```

> Verify pass: EXISTS in style.css:680-685 as a bare custom-element selector (no leading dot, exactly as claimed): "linkIcon {\n    max-height: 20px;\n    top: 3px;\n    content: url(/tutorials/Images/link.png);\n    position: relative;\n}" It sits in a run of identical icon-element rules (a `tag.png` one directly above ending at :678, `godot { ... godot.png }` directly below at :687) - the claim quoted the link.png one correctly. USAGE is JS-generated only: Builder.js:339 `postlink.innerHTML = "<a href=" + a.link + "><linkIcon></linkIcon> READ POST</a>";` - zero matches in the static HTML files, so it only appears on the rendered page after Builder.js runs.

### list - `bullet, bulletlist, bullet:before`

Custom <bulletlist>/<bullet> elements replace ul/li entirely. The marker mechanism is display: list-item with list-style-type: none (native marker box suppressed) and the glyph re-added as ::before content \25C6, a solid black diamond, with 5px trailing gap and 12px left padding. Nesting is expressed by descendant depth (bulletlist bulletlist bullet::before) swapping to a hollow diamond: filled = level 1, hollow = level 2. NOTE ON VERBATIM ACCURACY: the nested glyph in the downloaded file is the literal UTF-8 character U+2B26 WHITE MEDIUM DIAMOND typed inline, NOT an escape sequence; I substituted a bracketed placeholder in the block above solely to keep this field ASCII, everything else is character-for-character. Also the .bulletlist .bulletlist rule in the file is dead, nothing uses class="bulletlist".

Source file: https://minionsart.github.io/tutorials/style.css

```css
bullet:before {
    content: "\25C6";
    padding-right: 5px;
}

bulletlist {
    text-indent: -2px;
}

bulletlist:after {
    text-indent: -2px;
}

bulletlist bulletlist bullet::before {
    content: "[U+2B26 literal char in file]";
    /* Different bullet icon for nested bullets */
}

bullet {
    display: list-item;
    list-style-type: none;
    padding-left: 12px;
}
```

Used on the page as:

```html
<div id="postdescription" class="post_description">
    Base Setup for the Grass System:
    <bulletlist
        ><bullet>Grass Painter Tool</bullet>
        <bullet>Generate Grass on Meshes/Terrain</bullet
        ><bullet>Change Grass Length/Width/Color/Amount etc.</bullet
        ><bullet>Blend Grass with Terrain/Meshes</bullet>
        <bullet>Interactive Setup</bullet></bulletlist
    >
```

> Verify pass: ALL EXIST in style.css:788-814 and match verbatim: `bullet:before { content: "\25C6"; padding-right: 5px; }` (:788), `bulletlist { text-indent: -2px; }` (:793), `bulletlist:after { text-indent: -2px; }` (:797), `bulletlist bulletlist bullet::before { content: "⬦"; /* Different bullet icon for nested bullets */ }` (:805) - od -c on line 806 gives `" 342 254 246 " ;` = UTF-8 E2 AC A6 = U+2B26, so the claim's "[U+2B26 literal char in file]" annotation is accurate - and `bullet { display: list-item; list-style-type: none; padding-left: 12px; }` (:810). OMISSION (not fabrication): the claim skips `.bulletlist .bulletlist { text-indent: -2px; }` at :801 which sits between the quoted blocks. USED o

### figure - `.post-image-holder`

There is NO <figure> or <figcaption> anywhere on the page: media is a bare <img> with a 15px radius, object-fit: contain inside a 450px cap, and opacity: 0.9 so every image is knocked back 10 percent against the black card, matching the .post_card opacity: 0.9. Asymmetric margin (25px all round, 10px bottom) pulls the following caption-substitute line closer. Caption duty is done by a sibling .section div holding a text link, not by a caption element. The src is .avif with an inline onerror fallback to a PNG placeholder.

Source file: https://minionsart.github.io/tutorials/style.css

```css
.post-image-holder {
    background-color: transparent;

    color: white;
    position: relative;

    display: flex;
    max-width: 450px;
    object-fit: contain;
    margin: 25px;
    margin-bottom: 10px;
    border-radius: 15px;
    text-decoration: none;
    opacity: 0.9;
}
```

Used on the page as:

```html
<img
    class="post-image-holder"
    id="postPreview"
    src="/tutorials/Images/Avif/grass_system.avif"
    onerror="this.onerror=null; this.src='/tutorials/Images/Gifs/placeholder.png';" />
```

> Verify pass: EXISTS in style.css:465-478, exact match including the blank line after background-color and after position: ".post-image-holder {\n    background-color: transparent;\n\n    color: white;\n    position: relative;\n\n    display: flex;\n    max-width: 450px;\n    object-fit: contain;\n    margin: 25px;\n    margin-bottom: 10px;\n    border-radius: 15px;\n    text-decoration: none;\n    opacity: 0.9;\n}" Adversarial check: a similar `.preview-image-holder` sits directly above at :453-463 with `background-color: aliceblue`, `width: 300px; height: 160px`, `border-radius: 15px 15px 0px 0px` - the claim quoted the correct one. USED on page: Posts.html:97 `class="post-image-holder"` on `<img id="po

## Roles this site does NOT have

- codeblock
- inlinecode
- blockquote
- pullquote
- tldr-summary
- aside-sidenote
- footnote
- toc
- table

## Notes

HONEST SCOPE WARNING - this site is a LINK INDEX, not a prose-publishing site. Almost every \"tutorial\" is a card whose link points off-site to patreon.com. I grepped all 152KB of TutData.json and found ZERO on-site article links (filtering the link/extralink/patreonlink values of patreon/youtube/twitter leaves only empty strings, and there are no .html references in the JSON at all). So there is very little long-form body copy here, and no long-form typography system to copy.\n\nHOW I FOUND A REAL ARTICLE (discovered from markup, not guessed): https://minionsart.github.io/tutorials/ is a JS-built index (empty <div class=\"grid-container\" id=\"output\"></div> filled by Builder.js from TutData.json), so it contains no article hrefs. Builder.js fetches header.html; header.html contains the only real on-site page link: <a href=\"/tutorials/grasssystem.html\">Grass System</a>. That is the page I fetched and cited every htmlUsage from. I also fetched Posts.html (the per-post template, reached as Posts.html?post=<id>, referenced in Builder.js at the commented line for newlink and at the currenturl.includes(\"Posts\") check) - it uses the identical component set (.post_card, .centered, .dates, .post_description, .sectionbackground, .dropdown-content permission notice, .postLink, .post-image-holder), which confirms these devices are the site's post template rather than one-offs.\n\nSTACK: no build system, no CSS-in-JS, no Tailwind, no hashed class names. One hand-written 814-line stylesheet (style.css, 14960 bytes) plus jQuery 3.3.1, requirejs, and Font Awesome 4.7.0 from CDN. I downloaded font-awesome.min.css and confirmed it contributes nothing prose-related (grep for blockquote/figcaption/admonition/callout/pre{/code{ returns nothing) - it is only the icon font for the search button.\n\nCONFIRMED ABSENT, not merely unfound: grepping style.css case-insensitively for note|notice|callout|admonition|warning|tip|info|aside|alert|blockquote|quote|pull|tldr|summary|highlight|panel|pre|code|figure|figcaption|sidenote|marginnote|footnote|table|h1-h6|toc returns exactly ONE line - line 35, \"display: table;\" on .mainbody. There is not a single rule for code, pre, blockquote, figure, figcaption, table, or any h1-h6 in the entire stylesheet. The same grep over grasssystem.html and Posts.html returns nothing at all. For a SHADER TUTORIAL site this is the headline finding: it has no code-block styling whatsoever, because the shader code lives on Patreon, not here. Headings are divs (.header2, .centered), never h tags.\n\nWEIRD BUT REAL - the site styles INVENTED HTML ELEMENTS, not classes. <bullet>, <bulletlist>, <linkicon>, <patreon>, <youtube>, <urp>, <godot>, <tag>, <calendar> etc. are all non-standard tags styled by element selector, with icons injected via content: url(...) on the element itself (not a pseudo-element). This is invalid HTML that works because unknown elements are display: inline by default and are still stylable. If any of this gets remixed: content on a real element is non-standard (Chrome/Safari honour it, it is not specced for non-pseudo elements) and these tags carry zero semantics for screen readers. A real implementation should use ul/li with ::before, and img with alt text.\n\nCASE-SENSITIVITY TRAP: the CSS declares linkIcon, Patreon, PatreonBig with capitals while the HTML writes <linkicon>, <patreon>. This works only because HTML tag matching is case-insensitive. Do not carry that pattern into anything XML-ish or into a framework that treats these as components.\n\nCONTRAST CAVEAT if remixed: .dates is #966eff on the black .post_card, roughly 4.6:1 - squeaks past AA for body text but is not comfortable. The whole page leans on multi-layer text-shadow outlines rather than real contrast to keep white text legible on mid-tone chips (.postLink white on #572585 reads acceptably only because of the added dark 1px outline, which contrast checkers do not measure).\n\nDEAD CSS spotted (I did NOT claim any of these as findings): .bulletlist .bulletlist is class-based while the live rule is element-based, and nothing uses class=\"bulletlist\". Also .collapsible, .content, .number, .headertext, .LinkButton, .normal-link, .patreon-link, .dates2, .typefilter appear in the CSS but in NEITHER page I fetched - the index HTML even has handleCollapsible() commented out.\n\nLOCAL EVIDENCE COPIES, for re-verification: C:\\Users\\Rod\\AppData\\Local\\Temp\\claude\\C--Users-Rod-Documents-ProjectFiles-Website\\54a6653a-b92f-48bd-aae5-34a6aa020cc6\\scratchpad\\callout-sources\\minionsart\\ containing style.css, grasssystem.html, Posts.html, header.html, page.html, Builder.js, TutData.json, font-awesome.min.css.
