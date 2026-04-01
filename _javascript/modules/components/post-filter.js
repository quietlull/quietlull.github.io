/**
 * Client-side search and sort for blog/projects pages.
 * Expects #post-search input, [data-sort] dropdown items,
 * and .post-item elements with data-date and data-title attributes.
 */
export function initPostFilter() {
  const searchInput = document.getElementById('post-search');
  const sortItems = document.querySelectorAll('[data-sort]');
  const container = document.getElementById('posts-container');

  if (!container) return;

  const allItems = Array.from(container.querySelectorAll('.post-item'));
  if (allItems.length === 0) return;

  let currentSort = 'newest';

  function getTitle(el) {
    return (el.dataset.title || '').toLowerCase();
  }

  function getDate(el) {
    return parseInt(el.dataset.date, 10) || 0;
  }

  function applyFilter() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    // Collect matching items preserving sort order
    const sorted = allItems.slice().sort((a, b) => {
      if (currentSort === 'oldest') return getDate(a) - getDate(b);
      if (currentSort === 'title')  return getTitle(a).localeCompare(getTitle(b));
      return getDate(b) - getDate(a); // newest (default)
    });

    let visibleCount = 0;
    sorted.forEach(item => {
      const title = getTitle(item);
      const visible = !query || title.includes(query);
      item.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
      // Re-append in sorted order
      container.appendChild(item);
    });

    // Show/hide empty state
    let emptyState = container.parentElement.querySelector('.no-posts');
    if (visibleCount === 0) {
      if (!emptyState) {
        emptyState = document.createElement('div');
        emptyState.className = 'no-posts text-center py-5';
        emptyState.innerHTML = '<i class="fas fa-search fa-3x text-muted mb-3"></i><p class="text-muted">No posts match your search.</p>';
        container.parentElement.insertBefore(emptyState, container.nextSibling);
      }
      emptyState.style.display = '';
    } else if (emptyState) {
      emptyState.style.display = 'none';
    }
  }

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }

  // Sort
  sortItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      currentSort = item.dataset.sort;
      // Update active state
      sortItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      applyFilter();
    });
  });
}
