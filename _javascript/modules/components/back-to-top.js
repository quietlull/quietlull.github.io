export function back2top() {
  const btn = document.getElementById('back-to-top');
  const root = document.documentElement;
  let scrollTimer = null;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!root.classList.contains('is-scrolling')) {
      root.classList.add('is-scrolling');
    }
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => root.classList.remove('is-scrolling'), 150);

    if (!ticking) {
      requestAnimationFrame(() => {
        btn.classList.toggle('show', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    if (typeof window.sparklerBurst === 'function') {
      const rect = btn.getBoundingClientRect();
      window.sparklerBurst(rect.left + rect.width / 2, rect.top);
    }
    window.scrollTo({ top: 0 });
  });
}
