/* achievement-tile - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract
   is `export function init(root)`; the body below is unchanged apart from its indent. */
export function init() {
/* REAL achievement data, transcribed from _javascript/modules/components/achievements.js:22-34
   (the EXPLORER category, 7 items). Icons are that file's own emoji, written as numeric
   references so this file stays ASCII. The unlocked set is the blockout's own 14 / 29 progress
   narrowed to this category: 4 of 7. */
var EXPLORER = [
  { icon: '&#x1F3EE;', title: 'First Light',        desc: 'Welcome to the portfolio!',          got: true  },
  { icon: '&#x1F9ED;', title: 'Explorer',           desc: 'Visited both worlds',                got: true  },
  { icon: '&#x1F3A8;', title: 'Curator',            desc: 'Viewed 5 projects',                  got: true  },
  { icon: '&#x1F5FA;', title: 'Cartographer',       desc: 'Visited 10 unique pages',            got: false },
  { icon: '&#x1F9FF;', title: 'Deep Diver',         desc: 'Scrolled to the bottom of 5 pages',  got: true  },
  { icon: '&#x1F30C;', title: 'The Nether',         desc: 'Entered the portal',                 got: false },
  { icon: '&#x1F3AD;', title: 'Behind the Curtain', desc: 'Found the person behind the work',   got: false }
];

/* Each version renders the same seven, differing only in how a locked one is drawn.
   The tile is icon only, so the NAME is the accessible name via aria-label plus a native title
   tooltip. KNOWN LIMIT, stated with the build rather than discovered later: title does not exist
   on touch, so on a phone the tile has no visible name at all. */
function tile(cls, a, drawLocked) {
  if (!a.got && !drawLocked) return '';
  var label = a.got ? a.title + '. ' + a.desc + '. Unlocked.' : 'Locked achievement.';
  var mark = a.got ? '<span class="at-mark">' + a.icon + '</span>' : '';
  var mod = a.got ? ' ' + cls + '--unlocked' : ' ' + cls + '--locked';
  return '<li class="slot slot--tile">'
       + '<span class="at-tile ' + cls + mod + '" role="img" aria-label="' + label + '"'
       + (a.got ? ' title="' + a.title + ' - ' + a.desc + '"' : '') + '>'
       + mark + '</span></li>';
}

function fill(id, cls, drawLocked) {
  document.getElementById(id).innerHTML =
    EXPLORER.map(function (a) { return tile(cls, a, drawLocked); }).join('');
}
fill('wall1', 'at1-tile', true);
fill('wall2', 'at2-tile', true);
fill('wall3', 'at3-tile', false);

/* THE FIT READOUT. Measured with getBoundingClientRect in this browser, right now. Nothing here
   is a claim: if a version overflows its reservation the number says so and the line goes pink. */
function box(el) { var r = el.getBoundingClientRect(); return [+r.width.toFixed(2), +r.height.toFixed(2)]; }
function line(name, got, want) {
  var ok = got[0] <= want[0] + 0.01 && got[1] <= want[1] + 0.01;
  var exact = Math.abs(got[0] - want[0]) < 0.01 && Math.abs(got[1] - want[1]) < 0.01;
  var verdict = exact ? 'EXACT'
    : ok ? 'fits, ' + (want[0] - got[0]).toFixed(2) + ' x ' + (want[1] - got[1]).toFixed(2) + ' spare'
    : 'OVERFLOWS by ' + Math.max(0, got[0] - want[0]).toFixed(2) + ' x ' + Math.max(0, got[1] - want[1]).toFixed(2);
  return '<span class="' + (ok ? 'ok' : 'no') + '">' + name + ': ' + got[0] + ' x ' + got[1]
       + '  against reserved ' + want[0] + ' x ' + want[1] + '  -> ' + verdict + '</span>';
}
function perRow(wall) {
  var tops = {};
  wall.querySelectorAll('.at-tile').forEach(function (t) {
    var y = Math.round(t.getBoundingClientRect().top); tops[y] = (tops[y] || 0) + 1;
  });
  return Object.keys(tops).map(function (k) { return tops[k]; }).join(' + ');
}
function report(fitId, wallId, rowId) {
  var wall = document.getElementById(wallId);
  var t = wall.querySelector('.at-tile');
  var out = [];
  if (t) out.push(line('tile', box(t), [88, 31]));
  out.push(line('locked / empty state', box(document.getElementById(rowId)), [641, 40]));
  out.push('wall: ' + wall.querySelectorAll('.at-tile').length + ' tiles, '
         + perRow(wall) + ' per row, gap ' + getComputedStyle(wall).gap
         + ', inside ' + box(wall)[0] + ' (blockout renders 6 + 1 at gap 10px inside 641)');
  document.getElementById(fitId).innerHTML = out.join('\n');
}
report('fit1', 'wall1', 'row1');
report('fit2', 'wall2', 'row2');
report('fit3', 'wall3', 'row3');

/* =============================================================================================
   VERSIONS 4-6 DATA. All 29 achievements, transcribed from the ACHIEVEMENTS array in
   _javascript/modules/components/achievements.js - every title, description, icon, category and
   `scope` value is that file's, read and never edited (D22). Icons are written as numeric
   character references so this file stays ASCII.

   Category counts, which the readout re-counts live rather than trusting this comment:
   explorer 7, reader 6, interactor 8, secret 3, meta 5 = 29.

   `scope` is a REAL field in that file ('section' | 'cross' | 'site' | 'meta'). V5 uses it to
   derive rarity rather than inventing a rarity by taste. Nothing else here reads it.

   THE EARNED SET AND THE PROGRESS NUMBERS COME FROM ONE STATE VECTOR, not from picking values
   one tile at a time, so the numbers cannot contradict each other:
       unlocked 14   tagsRead 3   lanternKnocks 31   fireworkCount 18   avatarHoverTime 6
   That gives the blockout's own 14 of 29, keeps the Explorer group at the 4 of 7 that V1-V3
   already show, earns lantern-tapper (>=25) but not painter (>=50), and earns getting-started
   (>=5) but not collector (>=15). `prog` is only present on the ten achievements that actually
   ship a `progress` function; the other 19 are booleans and correctly have none. Counts are
   clamped to their target when displayed, which is the source's own behaviour (fan-club uses
   Math.min(s.avatarHoverTime, 10)). */
var ALL = [
  /* Explorer 7 */
  { cat:'explorer',   scope:'section', t:'First Light',           d:'Welcome to the portfolio!',                 i:'&#x1F3EE;', got:true  },
  { cat:'explorer',   scope:'cross',   t:'Explorer',              d:'Visited both worlds',                       i:'&#x1F9ED;', got:true  },
  { cat:'explorer',   scope:'section', t:'Curator',               d:'Viewed 5 projects',                         i:'&#x1F3A8;', got:true  },
  { cat:'explorer',   scope:'section', t:'Cartographer',          d:'Visited 10 unique pages',                   i:'&#x1F5FA;', got:false },
  { cat:'explorer',   scope:'section', t:'Deep Diver',            d:'Scrolled to the bottom of 5 pages',         i:'&#x1F9FF;', got:true  },
  { cat:'explorer',   scope:'site',    t:'The Nether',            d:'Entered the portal',                        i:'&#x1F30C;', got:false },
  { cat:'explorer',   scope:'site',    t:'Behind the Curtain',    d:'Found the person behind the work',          i:'&#x1F3AD;', got:false },
  /* Reader 6 */
  { cat:'reader',     scope:'section', t:'Scholar',               d:'Read an article to the end',                i:'&#x1F4DC;', got:true  },
  { cat:'reader',     scope:'section', t:'Bookworm',              d:'Read 3 articles to the end',                i:'&#x1F4DA;', got:true  },
  { cat:'reader',     scope:'section', t:'Well-Rounded',          d:'Read posts from 5 different tags',          i:'&#x1F4D6;', got:false, prog:[3, 5]    },
  { cat:'reader',     scope:'section', t:'Connoisseur',           d:'Read posts from 10 different tags',         i:'&#x1F9D0;', got:false, prog:[3, 10]   },
  { cat:'reader',     scope:'cross',   t:'Completionist',         d:'Read a post from every tag',                i:'&#x1F451;', got:false, prog:[3, 15]   },
  { cat:'reader',     scope:'section', t:'Zoom Enhance',          d:'Clicked an image to enlarge it',            i:'&#x1F50D;', got:true  },
  /* Interactor 8 */
  { cat:'interactor', scope:'section', t:'Pyrotechnician',        d:'Launched 50 fireworks',                     i:'&#x1F386;', got:false, prog:[18, 50]  },
  { cat:'interactor', scope:'section', t:'Toolsmith',             d:'Hovered every tool on a landing page',      i:'&#x1F6E0;', got:true  },
  { cat:'interactor', scope:'section', t:'Copy That',             d:'Used the code copy button',                 i:'&#x1F4CB;', got:true  },
  { cat:'interactor', scope:'section', t:'Fan Club',              d:'Spent quality time with the avatar',        i:'&#x2B50;',  got:false, prog:[6, 10]   },
  { cat:'interactor', scope:'section', t:'Hey, You Touched My Fly!', d:'Caught a firefly',                       i:'&#x1FAB2;', got:true  },
  { cat:'interactor', scope:'section', t:'Lantern Tapper',        d:'Knocked 25 lanterns',                       i:'&#x1F3EE;', got:true,  prog:[31, 25]  },
  { cat:'interactor', scope:'section', t:'Lantern Painter',       d:'Knocked 50 lanterns',                       i:'&#x1F308;', got:false, prog:[31, 50]  },
  { cat:'interactor', scope:'section', t:'Lantern Master',        d:'Knocked 100 lanterns',                      i:'&#x1FA94;', got:false, prog:[31, 100] },
  /* Secret 3 */
  { cat:'secret',     scope:'site',    t:'Down the Rabbit Hole',  d:'Discovered the ramblings',                  i:'&#x1F407;', got:true  },
  { cat:'secret',     scope:'section', t:'Night Owl',             d:'Visited between midnight and 4am',          i:'&#x1F989;', got:false },
  { cat:'secret',     scope:'section', t:'Early Bird',            d:'Visited between 5am and 7am',               i:'&#x1F426;', got:true  },
  /* Meta 5 */
  { cat:'meta',       scope:'meta',    t:'Getting Started',       d:'Unlocked 5 achievements',                   i:'&#x1F31F;', got:true,  prog:[14, 5]   },
  { cat:'meta',       scope:'meta',    t:'Collector',             d:'Unlocked 15 achievements',                  i:'&#x1F3C6;', got:false, prog:[14, 15]  },
  { cat:'meta',       scope:'meta',    t:'Section Clear',         d:'All achievements possible from one section', i:'&#x1F3AE;', got:false },
  { cat:'meta',       scope:'meta',    t:'Golden God',            d:'All section + cross-section achievements',  i:'&#x1F3C5;', got:false },
  { cat:'meta',       scope:'meta',    t:'1001%',                 d:'Every. Single. Achievement.',               i:'&#x1F48E;', got:false }
];

/* SECRETS ARE NOT SPOILED, and it costs nothing: the locked accessible name is "Locked
   achievement." in every version, so the three Secret tiles say no more than any other locked
   one. That is PlayStation's `trophyHidden` rule (the model's own words: further details are not
   displayed unless earned) - the tile stays, the text goes. Minecraft's alternative, removing an
   unearned entry from the screen entirely, is rejected because it would punch a hole in a fixed
   641 x 40 reservation. */
function st(a) { return a.got ? '--unlocked' : '--locked'; }
function lab(a) { return a.got ? a.t + '. ' + a.d + '. Unlocked.' : 'Locked achievement.'; }
function tip(a) { return a.got ? ' title="' + a.t + ' - ' + a.d + '"' : ''; }
function mk(a) { return a.got ? '<span class="at-mark">' + a.i + '</span>' : ''; }

/* V4 - the two state classes are the whole version. Same box, four colours apart. */
function t4(a) {
  return '<li class="slot slot--tile"><span class="at-tile at4-tile at4-tile' + st(a)
       + '" role="img" aria-label="' + lab(a) + '"' + tip(a) + '>' + mk(a) + '</span></li>';
}

/* V5 - rarity is DERIVED from the live file's `scope`, never assigned by hand. */
function frame(a) {
  if (a.scope === 'meta') return ' at5-tile--challenge';
  if (a.scope === 'section') return '';
  return ' at5-tile--goal';                                  /* 'cross' and 'site' */
}
function t5(a) {
  return '<li class="slot slot--tile"><span class="at-tile at5-tile at5-tile' + st(a) + frame(a)
       + '" role="img" aria-label="' + lab(a) + '"' + tip(a) + '>' + mk(a) + '</span></li>';
}

/* V6 - the tile is the bar. Width is set inline exactly as Steam's markup does it. */
function cur(a) { return Math.min(a.prog[0], a.prog[1]); }
function pct(a) {
  if (a.got) return '100%';
  if (!a.prog) return '0%';
  return (cur(a) / a.prog[1] * 100).toFixed(2) + '%';
}
function num(a) {
  if (a.got || !a.prog) return '';
  return '<span class="at6-count">' + cur(a) + '/' + a.prog[1] + '</span>';
}
function lab6(a) {
  if (a.got) return lab(a);
  return a.prog ? 'Locked achievement, ' + cur(a) + ' of ' + a.prog[1] + '.' : lab(a);
}
function t6(a) {
  return '<li class="slot slot--tile"><span class="at-tile at6-tile at6-tile' + st(a)
       + '" style="--at6-pct:' + pct(a) + '" role="img" aria-label="' + lab6(a) + '"' + tip(a) + '>'
       + '<i class="at6-fill"></i>' + mk(a) + num(a) + '</span></li>';
}

function put(id, fn, list) {
  document.getElementById(id).innerHTML = list.map(fn).join('');
}
function byTitle(n) {
  return ALL.filter(function (a) { return a.t === n; })[0];
}
var EXPL = ALL.filter(function (a) { return a.cat === 'explorer'; });
var WITHCOUNT = ALL.filter(function (a) { return !!a.prog; });

put('wall4', t4, EXPL);   put('dense4', t4, ALL);
put('wall5', t5, EXPL);   put('dense5', t5, ALL);
put('wall6', t6, EXPL);   put('dense6', t6, ALL);   put('count6', t6, WITHCOUNT);

/* The V5 shape key is built from SIX REAL ACHIEVEMENTS rather than from invented swatches, so
   nothing on this page is a tile that does not exist. */
put('key5', t5, ['First Light', 'Cartographer', 'Explorer', 'The Nether',
                 'Getting Started', 'Collector'].map(byTitle));

/* --- THE READOUTS FOR 4-6. Same rule as 1-3: measured here, in this browser, never asserted. -- */
function census() {
  var c = {}, got = 0;
  ALL.forEach(function (a) { c[a.cat] = (c[a.cat] || 0) + 1; if (a.got) got++; });
  return 'data: explorer ' + c.explorer + ', reader ' + c.reader + ', interactor ' + c.interactor
       + ', secret ' + c.secret + ', meta ' + c.meta + ' = ' + ALL.length + ' tiles, '
       + got + ' earned, ' + WITHCOUNT.length + ' with a real progress function';
}
function report2(fitId, wallId, denseId, rowId, extra) {
  var wall = document.getElementById(wallId);
  var dense = document.getElementById(denseId);
  var out = [census()];
  out.push(line('tile', box(wall.querySelector('.at-tile')), [88, 31]));
  out.push(line('locked / empty state', box(document.getElementById(rowId)), [641, 40]));
  out.push('explorer wall: ' + wall.querySelectorAll('.at-tile').length + ' tiles, '
         + perRow(wall) + ' per row, gap ' + getComputedStyle(wall).gap
         + ', inside ' + box(wall)[0]);
  out.push('all 29:        ' + dense.querySelectorAll('.at-tile').length + ' tiles, '
         + perRow(dense) + ' per row, block ' + box(dense)[0] + ' x ' + box(dense)[1]
         + ' inside 641');
  if (extra) out.push(extra());
  document.getElementById(fitId).innerHTML = out.join('\n');
}

/* V4's own claim, verified rather than repeated: locked and earned are the SAME GEOMETRY. */
function hue4() {
  var u = box(document.querySelector('#dense4 .at4-tile--unlocked'));
  var l = box(document.querySelector('#dense4 .at4-tile--locked'));
  var same = u[0] === l[0] && u[1] === l[1];
  return '<span class="' + (same ? 'ok' : 'no') + '">hue swap: earned ' + u[0] + ' x ' + u[1]
       + ', locked ' + l[0] + ' x ' + l[1] + ' -> '
       + (same ? 'identical geometry, only the four colours differ - which is the sprite finding'
               : 'GEOMETRY DIFFERS, the version has lost its premise') + '</span>';
}

/* V5's own claim: the silhouette costs interior area, never grid space, and the fancy shapes
   stay a minority. Both counted off the data, not stated. */
function frames5() {
  var n = { task: 0, goal: 0, challenge: 0 }, k;
  ALL.forEach(function (a) {
    k = a.scope === 'meta' ? 'challenge' : (a.scope === 'section' ? 'task' : 'goal');
    n[k]++;
  });
  var boxes = [], seen = {};
  document.querySelectorAll('#dense5 .at-tile').forEach(function (t) {
    seen[box(t).join(' x ')] = 1;
  });
  boxes = Object.keys(seen);
  var one = boxes.length === 1 && boxes[0] === '88 x 31';
  return '<span class="' + (one ? 'ok' : 'no') + '">frames: task ' + n.task + ' ('
       + Math.round(n.task / ALL.length * 100) + '%), goal ' + n.goal + ' ('
       + Math.round(n.goal / ALL.length * 100) + '%), challenge ' + n.challenge + ' ('
       + Math.round(n.challenge / ALL.length * 100) + '%)  vs Minecraft vanilla 72 / 8 / 20'
       + '  -  all 29 render at ' + boxes.join(' AND ')
       + (one ? ', so rarity costs no grid space' : ', so a shape IS costing grid space')
       + '</span>';
}

/* V6's own claim: a count fits where a title does not. Measured, including the widest one. */
function count6() {
  var wide = 0, txt = '-';
  document.querySelectorAll('#count6 .at6-count').forEach(function (c) {
    var w = c.getBoundingClientRect().width;
    if (w > wide) { wide = w; txt = c.textContent; }
  });
  var t = document.querySelector('#count6 .at6-tile');
  var cs = getComputedStyle(t);
  var free = 88 - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
           - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth);
  var m = document.querySelector('#wall6 .at-mark');
  var markW = m ? m.getBoundingClientRect().width : 0;
  var gap = parseFloat(cs.columnGap) || 0;
  var need = markW + gap + wide;
  var ok = need <= free + 0.01;
  return '<span class="' + (ok ? 'ok' : 'no') + '">count: widest is "' + txt + '" at '
       + wide.toFixed(2) + 'px. icon ' + markW.toFixed(2) + ' + gap ' + gap.toFixed(2)
       + ' + count ' + wide.toFixed(2) + ' = ' + need.toFixed(2) + 'px against ' + free.toFixed(2)
       + 'px free inside the tile -> '
       + (ok ? 'fits, ' + (free - need).toFixed(2) + 'px spare (a title needed about 50 and could not)'
             : 'OVERFLOWS by ' + (need - free).toFixed(2)) + '</span>';
}

report2('fit4', 'wall4', 'dense4', 'row4', hue4);
report2('fit5', 'wall5', 'dense5', 'row5', frames5);
report2('fit6', 'wall6', 'dense6', 'row6', count6);
}
