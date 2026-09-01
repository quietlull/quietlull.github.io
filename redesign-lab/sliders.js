(function(){
  var root=document.documentElement;
  function bind(input){
    var v=input.dataset.var, unit=input.dataset.unit||'';
    var out=document.getElementById(input.id+'-out');
    function apply(){ root.style.setProperty(v, input.value+unit); if(out){ out.textContent=input.value+unit; } }
    input.addEventListener('input', apply); apply();
  }
  var inputs=document.querySelectorAll('.lab input[type=range]');
  inputs.forEach(bind);
  var reset=document.querySelector('.lab .reset');
  if(reset){ reset.addEventListener('click', function(){
    inputs.forEach(function(i){ i.value=i.dataset.default; i.dispatchEvent(new Event('input')); });
  }); }

  /* card-in reveal on scroll (hana-style) */
  var items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && items.length){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{threshold:.14, rootMargin:'0px 0px -8% 0px'});
    items.forEach(function(el,i){ el.style.transitionDelay=(Math.min(i,6)*0.06)+'s'; io.observe(el); });
  } else { items.forEach(function(el){ el.classList.add('in'); }); }
})();
