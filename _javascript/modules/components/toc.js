import { TocDesktop as desktop } from './toc/toc-desktop';

/* ONE TOC, THE RAIL. The mobile bar/popup pair was deleted 2026-09-03 on Rod's word, so this no
   longer picks an implementation by viewport width - there is only one left. Below 1200px the
   rail is hidden by `_sass/pages/_post.scss` and no table of contents renders at all, which is
   the accepted cost of that removal rather than an oversight.
   The 1200px number still has to agree with the stylesheet: tocbot is only initialised above it,
   so initialising at a width where the rail is hidden would build a TOC nobody can see. */
const desktopMode = matchMedia('(min-width: 1200px)');

function init() {
  if (document.querySelector('main>article[data-toc="true"]') === null) {
    return;
  }

  if (!desktopMode.matches) {
    return;
  }

  desktop.init();

  const $tocWrapper = document.getElementById('toc-wrapper');
  if ($tocWrapper) {
    $tocWrapper.classList.remove('invisible');
  }

  desktopMode.onchange = (event) => {
    if (event.matches) {
      desktop.init();
      const $wrapper = document.getElementById('toc-wrapper');
      if ($wrapper) {
        $wrapper.classList.remove('invisible');
      }
    }
  };
}

export { init as initToc };
