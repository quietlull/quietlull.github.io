/**
 * Smooth page transitions — fade out current content before navigating.
 * The existing #main-wrapper fade-in animation handles arrival.
 */
export function initPageTransition() {
  const EXIT_DURATION = 300;

  // Restore content visibility when returning via bfcache (back/forward)
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      const wrapper = document.getElementById('main-wrapper');
      if (wrapper) wrapper.classList.remove('page-exit');
    }
  });

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    // Skip: modifier keys (open in new tab), target="_blank", downloads
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;

    const url = link.href;
    if (!url) return;

    // Skip: external links, hash-only links, javascript: links
    try {
      const dest = new URL(url, window.location.origin);
      if (dest.origin !== window.location.origin) return;
      if (dest.pathname === window.location.pathname && dest.hash) return;
      if (dest.protocol !== 'http:' && dest.protocol !== 'https:') return;
    } catch {
      return;
    }

    e.preventDefault();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.location = url;
      return;
    }

    const wrapper = document.getElementById('main-wrapper');
    if (!wrapper) {
      window.location = url;
      return;
    }

    wrapper.classList.add('page-exit');

    setTimeout(() => {
      window.location = url;
    }, EXIT_DURATION);
  });
}
