(function createSiteApp(global) {
  const knownFilters = new Set(['all', 'ai-eda', 'hardware', 'low-power']);

  function sortPublications(records) {
    if (!Array.isArray(records)) return [];
    return [...records].sort((left, right) => {
      if (right.year !== left.year) return right.year - left.year;
      return String(left.id).localeCompare(String(right.id));
    });
  }

  function filterPublications(records, filter) {
    if (!Array.isArray(records)) return [];
    if (!knownFilters.has(filter) || filter === 'all') return [...records];
    return records.filter(
      ({ topics }) => Array.isArray(topics) && topics.includes(filter),
    );
  }

  function hasValidPublicationData(records) {
    return (
      Array.isArray(records) &&
      records.length > 0 &&
      records.every(
        ({ id, topics, year }) =>
          typeof id === 'string' &&
          Array.isArray(topics) &&
          Number.isInteger(year),
      )
    );
  }

  function setUpFilters(document, records) {
    const buttons = [...document.querySelectorAll('[data-filter]')];
    const articles = [...document.querySelectorAll('[data-publication-id]')];
    const count = document.querySelector('.result-count');

    if (buttons.length === 0 || articles.length === 0 || !count) return;

    const applyFilter = (filter) => {
      const visibleIds = new Set(
        filterPublications(records, filter).map(({ id }) => id),
      );

      for (const article of articles) {
        article.hidden = !visibleIds.has(article.dataset.publicationId);
      }

      for (const button of buttons) {
        button.setAttribute(
          'aria-pressed',
          String(button.dataset.filter === filter),
        );
      }

      const total = visibleIds.size;
      count.textContent = `Showing ${total} publication${total === 1 ? '' : 's'}`;
    };

    for (const button of buttons) {
      button.addEventListener('click', () => applyFilter(button.dataset.filter));
    }
  }

  function setUpActiveNavigation(document) {
    if (typeof global.IntersectionObserver !== 'function') return;

    const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    const linkById = new Map(
      links.map((link) => [link.getAttribute('href').slice(1), link]),
    );
    const sections = [...linkById.keys()]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new global.IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(({ isIntersecting }) => isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!visible) return;
        for (const link of links) link.removeAttribute('aria-current');
        linkById.get(visible.target.id)?.setAttribute('aria-current', 'location');
      },
      { rootMargin: '-18% 0px -66% 0px', threshold: [0.15, 0.4] },
    );

    for (const section of sections) observer.observe(section);
  }

  function setUpChipMotion(document) {
    if (typeof global.matchMedia !== 'function') return;
    const precisePointer = global.matchMedia('(pointer: fine)').matches;
    const reducedMotion = global.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const figure = document.querySelector('.chip-figure');

    if (!precisePointer || reducedMotion || !figure) return;

    figure.addEventListener('pointermove', (event) => {
      const bounds = figure.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      figure.style.setProperty('--pointer-x', x.toFixed(3));
      figure.style.setProperty('--pointer-y', y.toFixed(3));
    });

    figure.addEventListener('pointerleave', () => {
      figure.style.setProperty('--pointer-x', '0');
      figure.style.setProperty('--pointer-y', '0');
    });
  }

  function init() {
    const document = global.document;
    const records = global.PUBLICATIONS;
    if (!document || !hasValidPublicationData(records)) return;

    document.documentElement.classList.add('js');
    setUpFilters(document, records);
    setUpActiveNavigation(document);
    setUpChipMotion(document);
  }

  const api = Object.freeze({ filterPublications, sortPublications });
  global.SiteApp = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  if (global.document) {
    if (global.document.readyState === 'loading') {
      global.document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
      init();
    }
  }
}(typeof globalThis !== 'undefined' ? globalThis : window));
