/**
 * Client-side search and tag filtering for blog/projects pages.
 * Expects #post-search input, .filter-pill buttons with data-tag,
 * and .post-item elements with data-title and data-tags attributes.
 */
export function initPostFilter() {
  const searchInput = document.getElementById('post-search');
  const pillContainer = document.getElementById('filter-pills');
  const pills = pillContainer
    ? Array.from(pillContainer.querySelectorAll('.filter-pill'))
    : [];

  // Collect ALL .post-item elements on the page (pinned + normal)
  const allItems = Array.from(document.querySelectorAll('[data-post-item]'));
  if (allItems.length === 0) return;

  const totalCount = allItems.length;
  const activeTags = new Set();

  // Clear filters button
  let clearBtn = null;
  if (pillContainer) {
    clearBtn = document.createElement('button');
    clearBtn.className = 'btn btn-sm filter-pill filter-clear';
    clearBtn.innerHTML = '<i class="fas fa-times"></i> Clear';
    clearBtn.style.display = 'none';
    pillContainer.appendChild(clearBtn);

    clearBtn.addEventListener('click', () => {
      activeTags.clear();
      pills.forEach(p => p.classList.remove('active'));
      if (searchInput) searchInput.value = '';
      applyFilter();
    });
  }

  function getTitle(el) {
    return (el.dataset.title || '').toLowerCase();
  }

  function getTags(el) {
    return (el.dataset.tags || '').toLowerCase().split(',').filter(Boolean);
  }

  function applyFilter() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let visibleCount = 0;
    allItems.forEach(item => {
      const title = getTitle(item);
      const tags = getTags(item);

      // Text search matches title or tags
      const matchesSearch = !query || title.includes(query)
        || tags.some(t => t.includes(query));

      // Tag filter — item must have ALL active tags
      const matchesTags = activeTags.size === 0
        || [...activeTags].every(tag => tags.includes(tag));

      const visible = matchesSearch && matchesTags;
      item.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    // Show/hide empty state and results count
    const container = document.getElementById('posts-container');
    if (container) {
      // --- Search results count (G4) ---
      let resultsCount = container.parentElement.querySelector('.search-results-count');
      if (!resultsCount) {
        resultsCount = document.createElement('div');
        resultsCount.className = 'search-results-count';
        container.parentElement.insertBefore(resultsCount, container);
      }
      if (visibleCount > 0 && visibleCount < totalCount) {
        resultsCount.textContent = `Showing ${visibleCount} of ${totalCount} projects`;
        resultsCount.style.display = '';
      } else {
        resultsCount.style.display = 'none';
      }

      // --- Contextual empty state (G5) ---
      let emptyState = container.parentElement.querySelector('.no-results-message');
      // Remove old generic empty state if present
      const oldEmpty = container.parentElement.querySelector('.no-posts-filter');
      if (oldEmpty) oldEmpty.style.display = 'none';

      if (!emptyState) {
        emptyState = document.createElement('div');
        emptyState.className = 'no-results-message no-posts text-center py-5';
        container.parentElement.appendChild(emptyState);
      }

      // Update pill match counts
      pills.forEach(pill => {
        const tag = pill.dataset.tag.toLowerCase();
        let count = 0;
        allItems.forEach(item => {
          const tags = getTags(item);
          if (!tags.includes(tag)) return;
          // Check if item would be visible with current search + other active tags
          const matchesSearch = !query || getTitle(item).includes(query)
            || tags.some(t => t.includes(query));
          const otherTags = [...activeTags].filter(t => t !== tag);
          const matchesOther = otherTags.length === 0
            || otherTags.every(t => tags.includes(t));
          if (matchesSearch && matchesOther) count++;
        });
        let countSpan = pill.querySelector('.pill-count');
        if (!countSpan) {
          countSpan = document.createElement('span');
          countSpan.className = 'pill-count';
          pill.appendChild(countSpan);
        }
        countSpan.textContent = count;
        pill.classList.toggle('pill-empty', count === 0);
      });

      // Show/hide clear button
      const hasFilters = activeTags.size > 0 || query.length > 0;
      if (clearBtn) clearBtn.style.display = hasFilters ? '' : 'none';

      if (visibleCount === 0) {
        const activeTagList = [...activeTags];
        let icon = '';
        let message = '';

        if (activeTagList.length > 0 && query) {
          icon = '<i class="fas fa-filter fa-3x text-muted mb-3"></i>';
          message = `<p class="text-muted">No ${activeTagList.join(', ')} projects matching "${query}"</p>`;
        } else if (activeTagList.length > 0) {
          icon = '<i class="fas fa-filter fa-3x text-muted mb-3"></i>';
          message = `<p class="text-muted">No ${activeTagList.join(', ')} projects yet — more coming soon!</p>`;
        } else if (query) {
          icon = '<i class="fas fa-search fa-3x text-muted mb-3"></i>';
          message = `<p class="text-muted">No projects matching "${query}"</p>`;
        } else {
          icon = '<i class="fas fa-search fa-3x text-muted mb-3"></i>';
          message = '<p class="text-muted">No projects match your filters.</p>';
        }

        emptyState.innerHTML = icon + message;
        emptyState.style.display = '';
      } else {
        emptyState.style.display = 'none';
      }
    }
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }

  // Tag pill toggles
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const tag = pill.dataset.tag.toLowerCase();

      if (activeTags.has(tag)) {
        activeTags.delete(tag);
        pill.classList.remove('active');
      } else {
        activeTags.add(tag);
        pill.classList.add('active');
      }

      applyFilter();
    });
  });

  // Initial count update
  applyFilter();
}
