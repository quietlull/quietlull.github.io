/**
 * Post page enhancements:
 * - Splits content at h2 boundaries into glass section cards
 * - Adds scroll-triggered fade-in animations via IntersectionObserver
 * - Adds a reading progress bar
 */

export function initPostEnhance() {
  const article = document.querySelector('article');
  if (!article) return;

  splitSections();
  initReadingProgress();
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

  let ticking = false;

  function updateProgress() {
    const rect = article.getBoundingClientRect();
    const articleTop = rect.top + window.scrollY;
    const articleHeight = rect.height;
    const viewportHeight = window.innerHeight;

    const scrolled = window.scrollY - articleTop;
    const total = articleHeight - viewportHeight;

    if (total <= 0) {
      bar.style.width = '0%';
      return;
    }

    const progress = Math.max(0, Math.min(1, scrolled / total));
    bar.style.width = `${progress * 100}%`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  updateProgress();
}
