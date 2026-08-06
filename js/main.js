document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav.main');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Paired works show their second state on hover. Touch devices get no hover,
  // so the first tap swaps and the second opens the lightbox.
  const touch = window.matchMedia('(hover: none)').matches;
  if (touch) {
    document.querySelectorAll('figure.work.pair').forEach((fig) => {
      fig.addEventListener('click', (e) => {
        if (!fig.classList.contains('shown-alt')) {
          e.stopPropagation();
          document.querySelectorAll('figure.work.pair.shown-alt').forEach((o) => {
            if (o !== fig) o.classList.remove('shown-alt');
          });
          fig.classList.add('shown-alt');
        }
      }, true);
    });
  }

  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCaption = lightbox.querySelector('figcaption');
    const closeBtn = lightbox.querySelector('.close');

    document.querySelectorAll('[data-lightbox]').forEach((el) => {
      el.addEventListener('click', () => {
        // a paired work opens whichever state is currently showing
        const showingAlt = el.classList.contains('pair') &&
          (el.matches(':hover') || el.classList.contains('shown-alt'));
        lbImg.src = (showingAlt && el.getAttribute('data-full-alt')) ||
          el.getAttribute('data-full') || el.querySelector('img').src;
        lbCaption.textContent = (showingAlt && el.getAttribute('data-caption-alt')) ||
          el.getAttribute('data-caption') || '';
        lightbox.classList.add('open');
      });
    });

    const close = () => lightbox.classList.remove('open');
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }
});
