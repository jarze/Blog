document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#nav-search-btn').forEach(element => {
    element.addEventListener('click', () => {
      document.body.classList.add('search-active');
      setTimeout(() => document.querySelector('.search-input').focus(), 500);
    });
  });

  if (!typeof LocalSearch === 'undefined' || !window.CONFIG) {
    // Search DB path
    console.warn('`hexo-generator-searchdb` plugin is not installed!');
    return;
  }
  const localSearch = new LocalSearch({
    path: CONFIG.path
  });

  const input = document.querySelector('.search-input');

  const inputEventFunction = () => {
    if (!localSearch.isfetched) return;
    const searchText = input.value.trim().toLowerCase();
    const keywords = searchText.split(/[-\s]+/);
    const container = document.querySelector('.search-result-container');
    let resultItems = [];
    if (searchText.length > 0) {
      // Perform local searching
      resultItems = localSearch.getResultItems(keywords);
    }
    if (keywords.length === 1 && keywords[0] === '') {
      container.classList.add('no-result');
      container.innerHTML = '<div class="search-result-icon">👽</div>';
    } else if (resultItems.length === 0) {
      container.classList.add('no-result');
      container.innerHTML = '<div class="search-result-icon">👽</div>';
    } else {
      resultItems.sort((left, right) => {
        if (left.includedCount !== right.includedCount) {
          return right.includedCount - left.includedCount;
        } else if (left.hitCount !== right.hitCount) {
          return right.hitCount - left.hitCount;
        }
        return right.id - left.id;
      });
      const stats = resultItems.length;

      container.classList.remove('no-result');
      container.innerHTML = `<div class="search-stats">${`📍    ${stats} 📂`}</div>
        <hr>
        <ul class="search-result-list">${resultItems
          .map(result => result.item)
          .join('')}</ul>`;
      if (typeof pjax === 'object') pjax.refresh(container);
    }
  };

  localSearch.highlightSearchWords(document.querySelector('.post-body'));
  localSearch.fetchData();
  input.addEventListener('input', inputEventFunction);

  window.addEventListener('search:loaded', inputEventFunction);

  // Handle and trigger popup window
  document.querySelectorAll('.popup-trigger').forEach(element => {
    element.addEventListener('click', () => {
      document.body.classList.add('search-active');
      // Wait for search-popup animation to complete
      setTimeout(() => input.focus(), 500);
      if (!localSearch.isfetched) localSearch.fetchData();
    });
  });

  // Monitor main search box
  const onPopupClose = () => {
    document.body.classList.remove('search-active');
  };

  document
    .querySelector('.search-pop-overlay')
    .addEventListener('click', event => {
      if (event.target === document.querySelector('.search-pop-overlay')) {
        onPopupClose();
      }
    });
  document
    .querySelector('.popup-btn-close')
    .addEventListener('click', onPopupClose);
  document.addEventListener('pjax:success', () => {
    localSearch.highlightSearchWords(document.querySelector('.post-body'));
    onPopupClose();
  });
  window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      onPopupClose();
    }
  });
});