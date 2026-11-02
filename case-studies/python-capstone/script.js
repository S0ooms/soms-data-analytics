/* ==========================================================
   S.O.M.S. Python Capstone Case Study
   Standalone interactions; does not modify portfolio script.js.
   ========================================================== */

(() => {
  "use strict";

  // Highlight the current section in the familiar case-study sidebar.
  const tocLinks = [...document.querySelectorAll('.toc-nav a[href^="#"]')];
  const sections = tocLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      const candidates = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (!candidates.length) return;
      const id = candidates[0].target.id;
      tocLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-10% 0px -70% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // Filter chart cards without needing a charting library or new data calls.
  const filterButtons = [...document.querySelectorAll('.filter-button[data-filter]')];
  const chartCards = [...document.querySelectorAll('.chart-card[data-category]')];
  const chartCount = document.getElementById('visibleChartCount');

  function setChartFilter(filter) {
    let visible = 0;
    chartCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });

    filterButtons.forEach(button => {
      const selected = button.dataset.filter === filter;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });

    if (chartCount) chartCount.textContent = `${visible} ${visible === 1 ? 'chart' : 'charts'}`;
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => setChartFilter(button.dataset.filter));
  });

  // Enlarge the original PNG instead of recreating its numbers in JavaScript.
  const dialog = document.getElementById('imageDialog');
  const dialogImage = document.getElementById('dialogImage');
  const dialogCaption = document.getElementById('dialogCaption');
  const openOriginal = document.getElementById('openOriginal');
  const closeDialog = document.getElementById('closeDialog');

  if (dialog && dialogImage && typeof dialog.showModal === 'function') {
    document.querySelectorAll('a[data-lightbox]').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const fullImage = link.getAttribute('href');
        const inlineImage = link.querySelector('img');
        dialogImage.src = fullImage;
        dialogImage.alt = inlineImage?.alt || 'Enlarged capstone visualization';
        if (dialogCaption) dialogCaption.textContent = link.dataset.caption || 'Capstone visualization';
        if (openOriginal) openOriginal.href = fullImage;
        dialog.showModal();
      });
    });

    closeDialog?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
  }

  // Small convenience control for long case studies.
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const updateTopButton = () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 700);
    };
    window.addEventListener('scroll', updateTopButton, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    updateTopButton();
  }
})();
