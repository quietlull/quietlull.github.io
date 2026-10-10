export function initPostEnhance() {
  const article = document.querySelector('article');
  if (!article) return;

  splitSections();
  initReadingProgress();
  initSectionSparks();
  initImagePopups();
  initFireflies(article);
}

function splitSections() {
  const content = document.querySelector('.post-content-container .content');
  if (!content) return;

  const children = Array.from(content.children);
  if (children.length === 0) return;

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

  if (sections.length <= 1) return;

  content.innerHTML = '';

  sections.forEach((group, index) => {
    const section = document.createElement('div');
    section.className = 'post-section';
    section.style.animationDelay = `${index * 0.08}s`;

    group.forEach(el => section.appendChild(el));
    content.appendChild(section);
  });
}

function initReadingProgress() {
  const article = document.querySelector('article');
  if (!article) return;

  const bar = document.createElement('div');
  bar.className = 'reading-progress-bar';
  document.body.appendChild(bar);

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

  window.addEventListener('scroll', updateProgress, { passive: true });

  updateProgress();
}

function initFireflies(article) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = article.querySelector('.post-content-container') || article;
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }

  const count = 8;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'post-firefly';
    const dur = 10 + Math.random() * 10;
    const delay = Math.random() * dur;
    const dx = (Math.random() - 0.5) * 60;
    const dy = -20 - Math.random() * 40;
    const opacity = 0.06 + Math.random() * 0.08;
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

function initSectionSparks() {
  const sections = document.querySelectorAll('.post-section');
  if (!sections.length) return;

  const fired = new Set();

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting
          && entry.boundingClientRect.top < 0
          && !fired.has(entry.target)) {
        fired.add(entry.target);

        const progressBar = document.querySelector('.reading-progress-bar');
        if (progressBar && typeof window.sparklerBurst === 'function') {
          const rect = progressBar.getBoundingClientRect();
          window.sparklerBurst(rect.right, rect.bottom);
        }
      }
    }
  }, { threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

function initImagePopups() {
  if (typeof GLightbox !== 'function') return;

  const content = document.querySelector('.post-content-container .content');
  if (!content) return;

  const images = Array.from(content.querySelectorAll('img:not(.emoji)'))
    .filter((img) => !img.closest('a'));

  if (images.length === 0) return;

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
