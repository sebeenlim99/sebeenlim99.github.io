document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav.main');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCaption = lightbox.querySelector('figcaption');
    const closeBtn = lightbox.querySelector('.close');

    document.querySelectorAll('[data-lightbox]').forEach((el) => {
      el.addEventListener('click', () => {
        lbImg.src = el.getAttribute('data-full') || el.querySelector('img').src;
        lbCaption.textContent = el.getAttribute('data-caption') || '';
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
