/**
 * Post page enhancements:
 * - Splits content at h2 boundaries into glass section cards
 * - Adds scroll-triggered fade-in animations via IntersectionObserver
 * - Adds a reading progress bar
 * - Section completion sparks
 * - Bottom-of-article confetti burst
 */

export function initPostEnhance() {
  const article = document.querySelector('article');
  if (!article) return;

  splitSections();
  initReadingProgress();
  initSectionSparks();
  initBottomConfetti(article);
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
 * Confetti burst when the reader reaches the bottom of the article.
 * Colorful strips/ribbons that burst upward and flutter down.
 */
function initBottomConfetti(article) {
  let fired = false;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && !fired) {
        fired = true;
        observer.disconnect();
        fireConfetti();
      }
    }
  }, { threshold: 0.1 });

  const lastChild = article.lastElementChild;
  if (lastChild) observer.observe(lastChild);
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

function fireConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const colors = [
    '#fbbf24', '#f59e0b', '#f97316', '#ef4444',
    '#ec4899', '#a855f7', '#3b82f6', '#22d3ee',
    '#10b981', '#84cc16', '#FFF9F0', '#fcd34d'
  ];

  const pieces = [];
  const count = 80;
  const cx = canvas.width / 2;
  const cy = canvas.height * 0.7;

  for (let i = 0; i < count; i++) {
    const angle = (Math.random() * Math.PI * 0.8) + Math.PI * 0.1;
    const speed = 8 + Math.random() * 10;
    pieces.push({
      x: cx + (Math.random() - 0.5) * canvas.width * 0.5,
      y: cy,
      vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
      vy: -Math.sin(angle) * speed,
      w: 3 + Math.random() * 5,
      h: 8 + Math.random() * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
      opacity: 1,
      gravity: 0.15 + Math.random() * 0.1,
      drag: 0.98 + Math.random() * 0.015,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.05 + Math.random() * 0.05
    });
  }

  let frame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    for (const p of pieces) {
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.x += p.vx + Math.sin(p.wobble) * 0.8;
      p.y += p.vy;
      p.rotation += p.spin;
      p.wobble += p.wobbleSpeed;

      /* Fade out once below viewport or after a while */
      if (p.y > canvas.height * 0.85) {
        p.opacity -= 0.02;
      }

      if (p.opacity <= 0) continue;
      alive = true;

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (alive) {
      frame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frame);
      canvas.remove();
    }
  }

  frame = requestAnimationFrame(animate);
}
