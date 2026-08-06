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
  if (!lightbox) return;

  const closeBtn = lightbox.querySelector('.close');

  // Rebuild the lightbox body so a pair can be shown as two plates at once.
  let stage = lightbox.querySelector('.lb-stage');
  if (!stage) {
    lightbox.querySelectorAll('figure').forEach((f) => f.remove());
    stage = document.createElement('div');
    stage.className = 'lb-stage';
    lightbox.appendChild(stage);
  }

  const plate = (src, caption) => {
    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.src = src;
    img.alt = caption || '';
    fig.appendChild(img);
    if (caption) {
      const cap = document.createElement('figcaption');
      cap.textContent = caption;
      fig.appendChild(cap);
    }
    return fig;
  };

  const open = (el) => {
    const src = el.getAttribute('data-full') ||
      (el.querySelector('img') && el.querySelector('img').src);
    const cap = el.getAttribute('data-caption') || '';
    const altSrc = el.getAttribute('data-full-alt');
    const altCap = el.getAttribute('data-caption-alt') || '';

    stage.innerHTML = '';
    stage.classList.toggle('is-pair', !!altSrc);
    stage.appendChild(plate(src, cap));
    if (altSrc) stage.appendChild(plate(altSrc, altCap));

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('[data-lightbox]').forEach((el) => {
    el.addEventListener('click', () => open(el));
  });

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === stage) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
});
