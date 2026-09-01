/* callout-family - the page's own scene wiring, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract is
   `export function init(root)`.

   TWO CHANGES, both forced by the move and neither touching a callout:
     1. hana-bloom.js is a classic IIFE that bakes two canvases into #hana-bg the moment it is
        evaluated. A module is evaluated ONCE per URL, so re-mounting this component would find an
        empty #hana-bg. The counter in the import URL makes each mount a fresh evaluation.
     2. the scene toggle flipped a class on document.body, which in the bench is the whole page.
        It flips it on the component root instead. */
let mounts = 0;

export async function init(root) {
  mounts += 1;
  await import(/* @vite-ignore */ `/redesign-lab/hana-bloom.js?mount=${mounts}`);

  const shell = root.querySelector('.cb-callout-family');
  const button = root.querySelector('#scenetoggle');
  if (!shell || !button) {
    return;
  }
  button.addEventListener('click', () => {
    const off = shell.classList.toggle('noscene');
    button.textContent = `scene: ${off ? 'off' : 'on'}`;
  });
}
