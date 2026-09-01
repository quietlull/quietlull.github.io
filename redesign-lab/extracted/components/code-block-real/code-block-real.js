/* code-block-real - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract
   is `export function init(root)`; the body below is unchanged apart from its indent. */
export function init() {
/* One sample, rendered three times. Cloning beats triplicating the markup: the three blocks are
   guaranteed identical apart from the scheme class, which is the entire point of the comparison. */
var LINES = [
  ['t-pre','#pragma kernel','',' CSMain'],
  [],
  ['t-comment','// A channel: does grass exist here at all?'],
  ['t-type','float4','',' rt = ','t-var','_GrassRT','','.','t-func','SampleLevel','','(sampler_linear_clamp, uv, ','t-num','0','','); '],
  ['t-type','bool','',' inCreation = rt.a > ','t-num','0.5','','; '],
  ['t-type','bool','',' isCulled   = rt.b > ','t-num','0.5','','; '],
  [],
  ['t-type','void','',' ','t-func','UpdateDecay','','(','t-type','uint3','',' id : ','t-class','SV_DispatchThreadID',''  ,')'],
  ['t-type','{'],
  ['t-comment','    // Convert 2D texel texture to 1D array'],
  ['t-type','    int','',' idx = id.y * texWidth + id.x;'],
  ['t-type','    float','',' prev = ','t-func','lerp','','(prevPush, ','t-func','saturate','','(rt.r), ','t-var','t','','); '],
  ['t-type','    return','',' ','t-func','saturate','','(prev * ','t-num','0.97','','); '],
  ['t-type','}']
];
var COPY='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '+
  'stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13"/>'+
  '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

function render(mount, scheme){
  var rows='';
  LINES.forEach(function(parts,i){
    var code='';
    for(var k=0;k<parts.length;k+=2){
      var cls=parts[k], txt=parts[k+1]===undefined?'':parts[k+1];
      code += cls ? '<span class="'+cls+'">'+txt.replace(/</g,'&lt;')+'</span>'
                  : txt.replace(/</g,'&lt;');
    }
    // line 4 highlighted, to show the reserved 3px marker recolouring without reflow
    rows += '<div class="cbx__ln'+(i===3?' is-hi':'')+'">'+
            '<span class="cbx__num">'+(i+1)+'</span>'+
            '<span class="cbx__code">'+(code||' ')+'</span></div>';
  });
  document.getElementById(mount).innerHTML =
    '<div class="cbx '+scheme+'">'+
      '<div class="cbx__bar"><p class="cbx__name">GrassCompute.hlsl</p>'+
      '<button class="cbx__copy" aria-label="Copy code to clipboard">'+COPY+'</button></div>'+
      '<pre class="cbx__pre">'+rows+'</pre></div>';
}
render('rod','cbx--rod'); render('iq','cbx--iq'); render('cc','cbx--cc');

/* swatch strips, read back off the live computed styles so they cannot drift from the CSS */
[['sw-rod','cbx--rod'],['sw-iq','cbx--iq'],['sw-cc','cbx--cc']].forEach(function(p){
  var probe=document.querySelector('.'+p[1]); var cs=getComputedStyle(probe);
  var names=['type','var','class','func','comment','num','str','pre'];
  document.getElementById(p[0]).innerHTML = names.map(function(n){
    var v=cs.getPropertyValue('--syn-'+n).trim();
    return '<i style="background:'+v+'">'+n+'</i>';
  }).join('');
});
}
