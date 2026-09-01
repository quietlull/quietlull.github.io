/* achievement-wall - catalogue + detail.

   ROD'S INTERACTION MODEL, 2026-08-24, verbatim:
     "hovering should show the last hovered achievement's text on the right, clicking the
      achievement should force its border to shine and activate it."

   So HOVER and CLICK are two different gestures doing two different jobs, and that is what makes
   the thing readable: you can inspect all 29 without ever changing what the scene is doing. An
   earlier draft had click doing both, which meant you could not look at a tile's details without
   toggling its effect on and off.

   "LAST hovered" is load-bearing. The panel does NOT clear on mouseout - a panel that blanked every
   time the pointer left a 64px square would be unreadable, and he said "last hovered", not
   "hovered". Keyboard focus feeds the same channel, so a tab-through reads identically to a
   mouse-over rather than being a second, lesser path.

   WHAT IS REAL HERE AND WHAT IS NOT, because a demo that fakes things is worse than no demo:
     - The 29 achievements ARE the live site's, copied from `_javascript/modules/components/
       achievements.js` (that file is off-limits to edit under D22, so this is a transcription).
       Counts match the blockout exactly: explorer 7, reader 6, interactor 8, secret 3, meta 5.
     - `unlocked` and `progress` here are DEMO VALUES, marked as such. The real ones live in
       localStorage under `rod-achievements` and are per-visitor.
     - ACTIVE state is genuinely new - the live data model has `unlocked` (earned) but nothing for
       active (toggled). Earned and switched-on are different axes.
     - The Three.js hook does NOT exist and nothing here pretends it does. No stub function, no
       comment promising one. D34 says scene state has to persist across pages and 19b is still
       open, so writing a fake hook now would be inventing a contract.
*/

export const ACHIEVEMENTS = [
  /* SUN, not the lantern. Rod 2026-08-24: "first light should use a sun emoji". It also clears a
     real defect: the lantern was shared with `lantern-tapper`, so on an icon-only wall those two
     tiles were pixel-identical and only the tooltip told them apart. */
  { id: "first-light", cat: "explorer", title: "First Light", icon: '\u{2600}', desc: "Welcome to the portfolio!", hasProgress: false, reward: null },
  { id: "explorer", cat: "explorer", title: "Explorer", icon: '\u{1F9ED}', desc: "Visited both worlds", hasProgress: false, reward: null },
  { id: "curator", cat: "explorer", title: "Curator", icon: '\u{1F3A8}', desc: "Viewed 5 projects", hasProgress: false, reward: null },
  { id: "cartographer", cat: "explorer", title: "Cartographer", icon: '\u{1F5FA}', desc: "Visited 10 unique pages", hasProgress: false, reward: null },
  { id: "deep-diver", cat: "explorer", title: "Deep Diver", icon: '\u{1F9FF}', desc: "Scrolled to the bottom of 5 pages", hasProgress: false, reward: null },
  { id: "the-nether", cat: "explorer", title: "The Nether", icon: '\u{1F30C}', desc: "Entered the portal", hasProgress: false, reward: null },
  { id: "behind-curtain", cat: "explorer", title: "Behind the Curtain", icon: '\u{1F3AD}', desc: "Found the person behind the work", hasProgress: false, reward: null },
  { id: "scholar", cat: "reader", title: "Scholar", icon: '\u{1F4DC}', desc: "Read an article to the end", hasProgress: false, reward: null },
  { id: "bookworm", cat: "reader", title: "Bookworm", icon: '\u{1F4DA}', desc: "Read 3 articles to the end", hasProgress: false, reward: null },
  { id: "well-rounded", cat: "reader", title: "Well-Rounded", icon: '\u{1F4D6}', desc: "Read posts from 5 different tags", hasProgress: true, reward: null },
  { id: "connoisseur", cat: "reader", title: "Connoisseur", icon: '\u{1F9D0}', desc: "Read posts from 10 different tags", hasProgress: true, reward: null },
  { id: "completionist", cat: "reader", title: "Completionist", icon: '\u{1F451}', desc: "Read a post from every tag", hasProgress: true, reward: null },
  { id: "zoom-enhance", cat: "reader", title: "Zoom Enhance", icon: '\u{1F50D}', desc: "Clicked an image to enlarge it", hasProgress: false, reward: null },
  { id: "pyrotechnician", cat: "interactor", title: "Pyrotechnician", icon: '\u{1F386}', desc: "Launched 50 fireworks", hasProgress: true, reward: "auto-fireworks" },
  { id: "toolsmith", cat: "interactor", title: "Toolsmith", icon: '\u{1F6E0}', desc: "Hovered every tool on a landing page", hasProgress: false, reward: null },
  { id: "copy-that", cat: "interactor", title: "Copy That", icon: '\u{1F4CB}', desc: "Used the code copy button", hasProgress: true, reward: null },
  { id: "fan-club", cat: "interactor", title: "Fan Club", icon: '\u{2B50}', desc: "Spent quality time with the avatar", hasProgress: true, reward: null },
  /* MOSQUITO, and the choice between his two options was settled by measurement, not taste.
     Rod: "fly should use a fly or mosquito emoji". The beetle was rendering as TOFU on his own
     machine - and so does the FLY, U+1FAB0, because both are Unicode 13.0 and his Windows emoji
     font predates that block. Rasterised at 48px and compared against a known-missing control:
     fly and beetle are byte-identical to it, 0 coloured pixels, same 30.98 advance. The mosquito
     is Unicode 11.0 and renders (65.91 advance, 280 coloured px). Taking the fly would have
     swapped one empty box for another. */
  { id: "touched-my-fly", cat: "interactor", title: "Hey, You Touched My Fly!", icon: '\u{1F99F}', desc: "Caught a firefly", hasProgress: false, reward: null },
  { id: "lantern-tapper", cat: "interactor", title: "Lantern Tapper", icon: '\u{1F3EE}', desc: "Knocked 25 lanterns", hasProgress: true, reward: "lantern-shape" },
  { id: "lantern-painter", cat: "interactor", title: "Lantern Painter", icon: '\u{1F308}', desc: "Knocked 50 lanterns", hasProgress: true, reward: "lantern-color" },
  { id: "lantern-master", cat: "interactor", title: "Lantern Master", icon: '\u{1FA94}', desc: "Knocked 100 lanterns", hasProgress: true, reward: "lantern-panel" },
  { id: "rabbit-hole", cat: "secret", title: "Down the Rabbit Hole", icon: '\u{1F407}', desc: "Discovered the ramblings", hasProgress: false, reward: null },
  { id: "night-owl", cat: "secret", title: "Night Owl", icon: '\u{1F989}', desc: "Visited between midnight and 4am", hasProgress: false, reward: null },
  { id: "early-bird", cat: "secret", title: "Early Bird", icon: '\u{1F426}', desc: "Visited between 5am and 7am", hasProgress: false, reward: null },
  { id: "getting-started", cat: "meta", title: "Getting Started", icon: '\u{1F31F}', desc: "Unlocked 5 achievements", hasProgress: true, reward: null },
  { id: "collector", cat: "meta", title: "Collector", icon: '\u{1F3C6}', desc: "Unlocked 15 achievements", hasProgress: true, reward: null },
  { id: "section-clear", cat: "meta", title: "Section Clear", icon: '\u{1F3AE}', desc: "All achievements possible from one section", hasProgress: false, reward: null },
  { id: "golden-god", cat: "meta", title: "Golden God", icon: '\u{1F3C5}', desc: "All section + cross-section achievements", hasProgress: false, reward: null },
  { id: "1001-percent", cat: "meta", title: "1001%", icon: '\u{1F48E}', desc: "Every. Single. Achievement.", hasProgress: false, reward: null }
];

const CAT_LABEL = { explorer: 'Explorer', reader: 'Reader', interactor: 'Interactor', secret: 'Secret', meta: 'Meta' };
const CAT_ORDER = ['explorer', 'reader', 'interactor', 'secret', 'meta'];

/* Demo unlock state, 15 of 29. `connoisseur` was added on 2026-08-25 for one specific reason worth
   recording: with the original 14, ALL FOUR silver-tier achievements happened to be locked, so the
   silver edge Rod had just asked for could never appear on screen. He would have looked for it,
   not found it, and reasonably concluded it was broken. This is demo data, not real unlock state -
   the real thing is per-visitor and lives in localStorage - so nudging it to make every tier
   visible costs nothing and makes the wall actually demonstrable. */
const DEMO_UNLOCKED = new Set(['first-light', 'explorer', 'curator', 'the-nether', 'behind-curtain',
  'scholar', 'bookworm', 'well-rounded', 'zoom-enhance', 'pyrotechnician', 'copy-that',
  'lantern-tapper', 'rabbit-hole', 'getting-started', 'connoisseur']);
const DEMO_PROGRESS = { 'well-rounded': [5, 5], 'connoisseur': [6, 10], 'completionist': [6, 14],
  'pyrotechnician': [50, 50], 'copy-that': [3, 1], 'fan-club': [12, 30], 'lantern-tapper': [25, 25],
  'lantern-painter': [25, 50], 'lantern-master': [25, 100], 'getting-started': [14, 5],
  'collector': [14, 15] };

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* TIERS. Rod 2026-08-24: "make it go silver > gold > prismatic like in TFT."
   Thresholds are proportions of the achievement's own target, so a 10-lantern goal and a 100-lantern
   goal tier at the same felt progress rather than at the same raw count. */
function tierFor(cur, target) {
  const p = target > 0 ? cur / target : 0;
  if (p >= 1) return 'prismatic';
  if (p >= 0.66) return 'gold';
  if (p >= 0.33) return 'silver';
  return 'bronze';
}

/* REDACTION. Rod: "same amount of characters as real text but all in ?"
   Spaces are preserved so the mask keeps the word rhythm of what it hides - a single run of 48
   question marks reads as a censor bar, whereas broken runs read as withheld words. */
function mask(text) {
  return String(text).replace(/\S/g, '?');
}

/* Flavor text does not exist yet - he has said twice it is "empty for now" - so there is no real
   string to take a length from. These are STAND-IN LENGTHS purely so the redacted line has a
   believable shape to look at; the moment he writes the real flavour text, `mask()` should be run
   against that instead and this table deleted. Marked here rather than left to look like content. */
const FLAVOR_PLACEHOLDER_LEN = 54;
const flavorStandIn = (a) => 'x'.repeat(Math.max(20, FLAVOR_PLACEHOLDER_LEN - (a.title.length % 12)));

function panelMarkup(a, isActive) {
  if (!a) {
    return '<div class="aw__empty">Hover an achievement to read it. Click one to switch its effect on.</div>';
  }
  const unlocked = DEMO_UNLOCKED.has(a.id);

  /* THE NAME IS ALWAYS SHOWN NOW, locked or not - Rod: "For locked ones give them just the name".
     This changes what the live site does for the three SECRET achievements, which render `???`
     until earned (`achievements.js:243-245`). His instruction says "do this for all achievements",
     so the later call wins, but it is a real behaviour change and not a styling one. */
  const name = a.title;

  /* PROGRESS. Only 11 of 29 records carry a progress function; the other 18 are booleans with no
     scale, so they report earned/not rather than inventing an "0 / 1". */
  const p = DEMO_PROGRESS[a.id];
  let progress;
  if (p) {
    const pct = Math.min(100, Math.round((p[0] / p[1]) * 100));
    const tier = tierFor(p[0], p[1]);
    /* The numbers first, then the criterion on its own line. An earlier version appended the
       achievement's own `desc` to the fraction and produced "25 / 50 knocked 50 lanterns" - the
       target said twice, once as a number and once as a sentence. */
    progress = '<div class="aw__val">' + p[0] + ' / ' + p[1]
      + ' <span class="aw__tier aw__tier--' + tier + '">' + tier + '</span></div>'
      + '<div class="aw__bar aw__bar--' + tier + '"><i style="width:' + pct + '%"></i></div>'
      + '<div class="aw__crit">' + esc(a.desc) + '</div>';
  } else {
    progress = '<div class="aw__val">' + (unlocked ? 'Earned' : 'Not yet earned') + '</div>';
  }

  const state = unlocked ? (isActive ? 'Active' : 'Inactive') : 'Locked';

  /* FLAVOR and EFFECT are redacted while locked and readable once earned. */
  let flavor;
  if (unlocked) {
    flavor = '<div class="aw__val aw__val--empty">yours to write</div>';
  } else {
    flavor = '<div class="aw__val aw__val--masked">' + mask(flavorStandIn(a)) + '</div>';
  }

  /* A LOCKED EFFECT IS REDACTED WHETHER OR NOT ONE EXISTS. Showing "no scene effect on this one"
     while locked would leak which of the 29 carry a reward - the four that do would be the only
     ones with a mask, so the mask itself becomes the answer. Only 4 of 29 have a reward today, so
     that leak would have been very legible. */
  let effect;
  if (!unlocked) {
    effect = '<div class="aw__val aw__val--masked">' + mask(a.reward || flavorStandIn(a).slice(0, 22)) + '</div>';
  } else if (a.reward) {
    effect = '<div class="aw__val">' + esc(a.reward) + '</div>';
  } else {
    effect = '<div class="aw__val aw__val--empty">no scene effect on this one</div>';
  }

  return ''
    + '<h3 class="aw__dttl">' + esc(name) + '</h3>'
    + '<div class="aw__field"><span class="aw__lbl">Progress</span>' + progress + '</div>'
    + '<div class="aw__field"><span class="aw__lbl">State</span>'
    + '<span class="aw__state' + (isActive ? ' is-on' : '') + '"><i class="aw__dot"></i>'
    + '<span class="aw__val">' + state + '</span></span></div>'
    + '<div class="aw__field"><span class="aw__lbl">Flavor Text</span>' + flavor + '</div>'
    + '<div class="aw__field"><span class="aw__lbl">Effect</span>' + effect + '</div>';
}

/* ACTIVE STATE IS MULTI-SELECT AND IT PERSISTS. Rod 2026-08-24: "more than one can be active and
   they persist its like an Easter egg for those who decide to explore my page."
   That settles both open questions at once and it changes what this is. A picker would be a control
   panel; a set of independent switches that survive a reload is something you accumulate over
   visits, which is what makes it an easter egg rather than a settings screen.
   So persistence is not a nicety here - an easter egg that forgets itself on refresh is not an
   easter egg, and a demo without storage would be demoing the wrong thing.

   SEPARATE KEY, deliberately. The live site stores EARNED achievements under `rod-achievements`
   (`_javascript/modules/config/storage-keys.js:10`). ACTIVE is a different axis from EARNED, and
   writing into that object from the lab risks corrupting real unlock state Rod has accumulated. */
const ACTIVE_KEY = 'rod-achievements-active-v1';

function loadActive() {
  try {
    const raw = localStorage.getItem(ACTIVE_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    /* filtered against the real list, so a renamed or deleted achievement cannot resurrect itself */
    return new Set(Array.isArray(ids) ? ids.filter((id) => ACHIEVEMENTS.some((a) => a.id === id)) : []);
  } catch (e) {
    return new Set();   /* private mode, disabled storage, or corrupt JSON - degrade to nothing on */
  }
}

function saveActive(set) {
  try { localStorage.setItem(ACTIVE_KEY, JSON.stringify([...set])); } catch (e) { /* nothing to do */ }
}

export function init(root = document) {
  const host = root.querySelector('.aw');
  if (!host) return () => {};
  const cat = host.querySelector('.aw__cat');
  const detail = host.querySelector('.aw__detail');
  const active = loadActive();
  let lastHovered = null;

  /* build the catalogue, grouped, in the blockout's category order */
  cat.innerHTML = CAT_ORDER.map((c) => {
    const items = ACHIEVEMENTS.filter((a) => a.cat === c);
    return '<div class="aw__group"><div class="aw__grouplbl">' + CAT_LABEL[c] + ' &middot; ' + items.length + '</div>'
      + '<div class="aw__groupgrid">' + items.map((a) => {
        const unlocked = DEMO_UNLOCKED.has(a.id);
        /* NAMES ARE SHOWN EVEN WHEN LOCKED - Rod: "For locked ones give them just the name". The
           secret ones lose their `???` masking as a result, which the live site does apply
           (`achievements.js:243-245`); his "do this for all achievements" is the later call. */
        const label = a.title + (unlocked ? '' : ' (locked)');
        /* aria-disabled, NOT disabled. A `disabled` button cannot be hovered, focused or tabbed to,
           which had silently pulled 15 of 29 tiles out of the keyboard and made more than half the
           wall unreadable. This announces "unavailable" while keeping the tile reachable; the click
           handler is what refuses the toggle. */
        /* the tier is put ON THE TILE, not just computed for the panel - Rod 2026-08-24:
           "prismatic cards get the prismatic text but not borders can you change that as well".
           Same function the panel uses, so the edge and the label can never disagree. */
        const pr = DEMO_PROGRESS[a.id];
        const tier = pr ? tierFor(pr[0], pr[1]) : (unlocked ? 'gold' : 'bronze');
        return '<button type="button" class="aw__tile" data-id="' + a.id + '" data-tier="' + tier + '"'
          + ' aria-pressed="' + (active.has(a.id) ? 'true' : 'false') + '"'
          + (unlocked ? '' : ' aria-disabled="true"')
          + '><span aria-hidden="true">' + a.icon + '</span>'
          /* the project card's pinned badge glyph, reused rather than redrawn - the same BLACK STAR
             it renders at `project-cards-expensive.html:23`. */
          + '<i class="aw__on" aria-hidden="true">&#9733;</i>'
          + '<span class="aw__sr">' + esc(label) + '</span></button>';
      }).join('') + '</div></div>';
  }).join('');

  const render = () => {
    detail.innerHTML = panelMarkup(lastHovered, lastHovered && active.has(lastHovered.id));
  };
  render();

  const read = (el) => {
    const a = ACHIEVEMENTS.find((x) => x.id === el.dataset.id);
    if (a) { lastHovered = a; render(); }
  };

  /* Hover AND focus feed the same channel, so tabbing reads exactly like pointing. No mouseout
     handler on purpose - "last hovered" means the panel holds. */
  cat.addEventListener('pointerover', (e) => {
    const t = e.target.closest('.aw__tile');
    if (t) read(t);
  });
  cat.addEventListener('focusin', (e) => {
    const t = e.target.closest('.aw__tile');
    if (t) read(t);
  });

  cat.addEventListener('click', (e) => {
    const t = e.target.closest('.aw__tile');
    if (!t) return;
    /* A locked achievement still READS on click, it just does not toggle. Refusing here rather than
       with the `disabled` attribute is exactly what lets it stay hoverable and tabbable. */
    if (t.getAttribute('aria-disabled') === 'true') { read(t); return; }
    const on = t.getAttribute('aria-pressed') !== 'true';
    t.setAttribute('aria-pressed', String(on));
    if (on) active.add(t.dataset.id); else active.delete(t.dataset.id);
    saveActive(active);     /* without this the easter egg forgets itself on reload, which is the
                               one thing it must not do. Caught by measuring storage after a click
                               rather than by reading the code back. */
    startOrbit();
    if (!on) { t.style.removeProperty('--mx'); t.style.removeProperty('--my'); }
    read(t);   /* clicking also reads it, so the panel always describes what you just touched */
  });

  /* THE TILT. Rod 2026-08-24: "make the achievement cards also have the card tilt."
     Ported from `merged-card.js:8-12, 35-44, 72-115`, delegated on the catalogue rather than bound
     29 times. The angles are carried UNCHANGED because degrees are scale-free; the two PIXEL terms
     are not, and both are scaled by the size ratio 64/376:
       perspective  1000px -> 170px   (1000 * 64/376 = 170.2)
       lift            6px ->   1px   (6 * 64/376 = 1.02)
     That ratio is not a guess. Apparent depth is `half-size * sin(angle) / perspective`: the card
     gives 188*sin8/1000 = 0.0262, and holding that at 32px half-size needs 170px. Left at the
     card's 1000px a 64px tile projects 1.0147 against the card's 1.0385 - the depth simply is not
     there. At 170px the two measure 1.0385 / 1.0377, the same card.
     `perspective()` INSIDE the transform rather than on a parent, deliberately: the project card's
     perspective sits on the card itself so each one has its own vanishing point at its own centre.
     A shared perspective on the row would give one vanishing point at the row's middle and fisheye
     the tiles at either end.

     PROVENANCE, stated because it is not clean: the tilt has NO external source. `merged-card.js:1`
     cites `rework-harumaki.html`, a file in this repo, and nothing in `sources/` mentions tilt. So
     this is internal reuse and needs a ledger row saying exactly that - the same shape as the
     portal-window row, which says outright "internal reuse, NOT an external citation". Idea origin
     ROD, since he asked for it.

     KEYBOARD: pointer only, and that is a real gap rather than an oversight. Pointer position has
     no keyboard equivalent, and the wall is otherwise the one component here where tabbing reads
     exactly like hovering. Flagged for Rod rather than decided - a fixed small angle on focus would
     work, but inventing one is a design call. */
  const TILT_DEG = 8, TILT_LIFT = 1, TILT_SCALE = 1.02, TILT_PERSPECTIVE = 170;
  let tiltEl = null, tiltFrame = null, tiltX = 0, tiltY = 0;

  const applyTilt = () => {
    tiltFrame = null;
    if (!tiltEl) return;
    const r = tiltEl.getBoundingClientRect();
    const x = ((tiltX - r.left) / r.width - 0.5) * 2;
    const y = ((tiltY - r.top) / r.height - 0.5) * 2;
    /* The tilt no longer knows the hover scale exists - Rod 2026-08-25, transform-lane rule. It used
       to read `.aw--scale` off the host and fold 1.3 in by hand, because both wrote `transform` and
       the later write won. The hover now owns the `scale` property and this owns `transform`, so
       they compose without either being aware of the other. */
    tiltEl.style.transform = 'perspective(' + TILT_PERSPECTIVE + 'px)'
      + ' rotateX(' + (-y * TILT_DEG) + 'deg) rotateY(' + (x * TILT_DEG) + 'deg)'
      + ' translateY(' + -TILT_LIFT + 'px) scale(' + TILT_SCALE + ')';
  };

  cat.addEventListener('pointerover', (e) => {
    const t = e.target.closest('.aw__tile');
    if (!t) return;
    tiltEl = t;
    t.style.transition = 'transform .15s ease-out';
    t.style.willChange = 'transform';
  });
  cat.addEventListener('pointermove', (e) => {
    if (!tiltEl) return;
    tiltX = e.clientX; tiltY = e.clientY;
    if (tiltFrame === null) tiltFrame = requestAnimationFrame(applyTilt);
  });
  cat.addEventListener('pointerout', (e) => {
    const t = e.target.closest('.aw__tile');
    if (!t || t !== tiltEl) return;
    tiltEl = null;
    if (tiltFrame !== null) { cancelAnimationFrame(tiltFrame); tiltFrame = null; }
    /* the slower easing on the way out is the card's own asymmetry, .15s in and .4s out */
    t.style.transition = 'transform .4s ease-out';
    t.style.transform = '';
    t.style.willChange = '';
  });

  /* THE ORBIT. Active tiles walk their glow around their own border. This lives here rather than in
     a CSS keyframe because animating a custom property needs it REGISTERED, and the `@property`
     rules parse but do not register in this Chrome - measured, the glow sat on the 0% stop and never
     moved. See the note at the top of achievement-wall.css.
     It runs ONLY while something is active and cancels itself when nothing is, so an untouched wall
     costs no frames at all. */
  /* THE LAP TIME IS READ FROM `--aw-orbit`, NOT HARD-CODED. It was 2800 in JS, and that was a live
     defect the moment the orbit moved out of CSS: the tuner still offered a "how long one lap takes"
     dial, the copy-out still emitted `--aw-orbit`, and NOTHING consumed it - Rod's first tune set it
     to 5s and it would have changed nothing at all, silently. A dial that does nothing is worse than
     no dial, because the export carries it into the file as if it worked. */
  const ORBIT_MS = (parseFloat(getComputedStyle(host).getPropertyValue('--aw-orbit')) || 2.8) * 1000;
  let raf = 0;
  const orbit = (t) => {
    if (!active.size) { raf = 0; return; }
    const phase = (t % ORBIT_MS) / ORBIT_MS * 4;      /* 0..4, one unit per edge */
    const leg = Math.floor(phase), f = phase - leg;
    /* the four corners, so the light tracks the edge the rim is actually drawn on */
    const pts = [[0, 0], [100, 0], [100, 100], [0, 100], [0, 0]];
    const [x0, y0] = pts[leg], [x1, y1] = pts[leg + 1];
    const mx = (x0 + (x1 - x0) * f) + '%';
    const my = (y0 + (y1 - y0) * f) + '%';
    cat.querySelectorAll('.aw__tile[aria-pressed="true"]').forEach((tile) => {
      tile.style.setProperty('--mx', mx);
      tile.style.setProperty('--my', my);
    });
    raf = requestAnimationFrame(orbit);
  };
  const startOrbit = () => { if (!raf && active.size) raf = requestAnimationFrame(orbit); };
  startOrbit();

  /* THE RIM. One shared window pointermove + one rAF via cursor-coords, the same broadcaster the
     project cards use, rather than a second listener and loop of our own. */
  let stop = () => {};
  import('../cursor-coords/cursor-coords.js').then(({ onCursor }) => {
    const tiles = [...cat.querySelectorAll('.aw__tile')];
    stop = onCursor((cx, cy) => {
      for (const tile of tiles) {
        if (tile.getAttribute('aria-pressed') === 'true') continue;  /* active tiles hold their own centre */
        const r = tile.getBoundingClientRect();
        tile.style.setProperty('--mx', (cx - r.left) + 'px');
        tile.style.setProperty('--my', (cy - r.top) + 'px');
      }
    });
  });

  return () => { stop(); if (raf) cancelAnimationFrame(raf); if (tiltFrame) cancelAnimationFrame(tiltFrame); };
}
