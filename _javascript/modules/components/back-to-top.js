export function back2top() {
  const btn = document.getElementById('back-to-top');

  let ticking = false;
  window.addEventListener('scroll', () => {
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
