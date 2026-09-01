/* filter-pills - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract
   is `export function init(root)`; the body below is unchanged apart from its indent. */
export function init() {
var pills=[].slice.call(document.querySelectorAll('.fp__pill'));
pills.forEach(function(b){
  b.addEventListener('click',function(){
    pills.forEach(function(x){x.classList.remove('is-active');x.setAttribute('aria-pressed','false');});
    b.classList.add('is-active'); b.setAttribute('aria-pressed','true'); measure();
  });
});
function measure(){
  var b=document.querySelector('.fp__pill'), r=b.getBoundingClientRect(),
      cs=getComputedStyle(b);
  document.getElementById('m').innerHTML =
    'pill '+r.width.toFixed(1)+' x '+r.height.toFixed(1)+
    ' &middot; radius '+cs.borderRadius+
    ' &middot; colour '+cs.color+
    ' &middot; WCAG 2.5.8 target 24px: <b style="color:'+(r.height>=24?'#8fbf7a':'#e08a5a')+'">'+
    (r.height>=24?'PASS':'FAIL, needs vertical padding')+'</b>'+
    ' &middot; active carries TWO channels (colour + fill), not colour alone';
}
measure();
}
