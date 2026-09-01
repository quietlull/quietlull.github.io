/**
 * Post page enhancements:
 * - Splits content at h2 boundaries into glass section cards
 * - Adds scroll-triggered fade-in animations via IntersectionObserver
 * - Adds a reading progress bar
 * - Section completion sparks
 */

export function initPostEnhance() {
  const article = document.querySelector('article');
  if (!article) return;

  splitSections();
  initReadingProgress();
  initSectionSparks();
  initImagePopups();
  initFireflies(article);
}

/**
 * Split .content children at every <h2> into individual glass sections.
 * Each section gets its own .post-section wrapper.
 */
function splitSections() {
  const content = document.querySelector('.post-content-container .content');
  if (!content) return;

  const children = Array.from(content.children);
  if (children.length === 0) return;

  // Group children into sections split at h2 boundaries
  const sections = [];
  let currentGroup = [];

  for (const child of children) {
    if (child.tagName === 'H2' && currentGroup.length > 0) {
      sections.push(currentGroup);
      currentGroup = [];
    }
    currentGroup.push(child);
  }
  if (currentGroup.length > 0) {
    sections.push(currentGroup);
  }

  // Don't split if there's only one section (no h2s or just one)
  if (sections.length <= 1) return;

  // Clear content and re-insert wrapped sections
  content.innerHTML = '';

  sections.forEach((group, index) => {
    const section = document.createElement('div');
    section.className = 'post-section';
    section.style.animationDelay = `${index * 0.08}s`;

    group.forEach(el => section.appendChild(el));
    content.appendChild(section);
  });
}

/**
 * Thin amber progress bar at the top of the viewport showing read progress.
 */
function initReadingProgress() {
  const article = document.querySelector('article');
  if (!article) return;

  const bar = document.createElement('div');
  bar.className = 'reading-progress-bar';
  document.body.appendChild(bar);

  // Cache article dimensions — only recalculate on resize
  let articleTop = 0;
  let articleHeight = 0;

  function cacheRect() {
    const rect = article.getBoundingClientRect();
    articleTop = rect.top + window.scrollY;
    articleHeight = rect.height;
  }
  cacheRect();
  window.addEventListener('resize', cacheRect, { passive: true });

  function updateProgress() {
    const viewportHeight = window.innerHeight;
    const scrolled = window.scrollY - articleTop;
    const total = articleHeight - viewportHeight;

    if (total <= 0) {
      bar.style.width = '0%';
      return;
    }

    const progress = Math.max(0, Math.min(1, scrolled / total));
    bar.style.width = `${progress * 100}%`;
  }

  // Passive scroll listener — single style update, no rAF needed
  window.addEventListener('scroll', updateProgress, { passive: true });

  // Click-to-jump: click position on bar maps to article scroll position
  bar.addEventListener('click', (e) => {
    const ratio = e.clientX / window.innerWidth;
    const viewportHeight = window.innerHeight;
    const total = articleHeight - viewportHeight;
    if (total <= 0) return;
    const targetY = articleTop + ratio * total;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  });

  updateProgress();
}

/**
 * Ambient fireflies — tiny gold dots that slowly drift behind post content.
 */
function initFireflies(article) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = article.querySelector('.post-content-container') || article;
  // Ensure positioning context
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }

  const count = 8;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'post-firefly';
    const dur = 10 + Math.random() * 10;           // 10–20s
    const delay = Math.random() * dur;               // stagger within cycle
    const dx = (Math.random() - 0.5) * 60;          // ±30px horizontal
    const dy = -20 - Math.random() * 40;             // -20 to -60px upward
    const opacity = 0.06 + Math.random() * 0.08;    // 0.06–0.14
    dot.style.cssText = `
      left: ${5 + Math.random() * 90}%;
      top: ${10 + Math.random() * 80}%;
      --fly-dur: ${dur.toFixed(1)}s;
      --fly-delay: ${delay.toFixed(1)}s;
      --fly-dx: ${dx.toFixed(0)}px;
      --fly-dy: ${dy.toFixed(0)}px;
      --fly-opacity: ${opacity.toFixed(2)};
    `;
    container.appendChild(dot);
  }
}

/**
 * Spark burst when a section scrolls fully out of the viewport (read completion).
 * Fires once per section at the h2 heading position.
 */
function initSectionSparks() {
  const sections = document.querySelectorAll('.post-section');
  if (!sections.length) return;

  const fired = new Set();

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      /* Fire when section leaves viewport going upward (user scrolled past it) */
      if (!entry.isIntersecting
          && entry.boundingClientRect.top < 0
          && !fired.has(entry.target)) {
        fired.add(entry.target);

        const h2 = entry.target.querySelector('h2');
        if (h2 && typeof window.sparklerBurst === 'function') {
          const rect = h2.getBoundingClientRect();
          window.sparklerBurst(rect.left + rect.width / 2, rect.bottom);
        }
      }
    }
  }, { threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/**
 * Wrap post content images in <a class="popup"> so GLightbox handles zoom.
 * Skips emoji, images already inside links, and images already with .popup.
 */
function initImagePopups() {
  if (typeof GLightbox !== 'function') return;

  const content = document.querySelector('.post-content-container .content');
  if (!content) return;

  const images = Array.from(content.querySelectorAll('img:not(.emoji)'))
    .filter((img) => !img.closest('a'));

  if (images.length === 0) return;

  /* Build GLightbox slide elements from images */
  const slides = images.map((img) => ({
    href: img.src,
    type: 'image',
    alt: img.alt || ''
  }));

  const lightbox = GLightbox({ elements: slides });
  lightbox.on('open', () => { document.dispatchEvent(new Event('achievement:imageenlarge')); });

  images.forEach((img, index) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lightbox.openAt(index);
    });
  });
}
