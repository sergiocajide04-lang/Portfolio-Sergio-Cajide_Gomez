/* =========================================================
   Sergio Cajide Gómez — Portfolio · app.js
   ========================================================= */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Intro cinematic ---------- */
  const intro = document.getElementById('intro');
  if (intro) {
    const dismiss = () => {
      intro.classList.add('hide');
      document.body.style.overflow = '';
      window.setTimeout(() => intro.remove(), 900);
    };
    // Play once per browser session, and never if reduced motion
    const seen = sessionStorage.getItem('introSeen');
    if (reduceMotion || seen) {
      intro.remove();
    } else {
      document.body.style.overflow = 'hidden';
      sessionStorage.setItem('introSeen', '1');
      window.setTimeout(dismiss, 3900);          // ~3.9s total
      const skip = intro.querySelector('.intro-skip');
      if (skip) skip.addEventListener('click', dismiss);
      intro.addEventListener('click', (e) => {
        if (e.target === intro) dismiss();
      });
    }
  }

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  /* ---------- Cursor glow on blueprint grid ---------- */
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    let raf = null;
    window.addEventListener('pointermove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        document.body.style.setProperty('--mx', e.clientX + 'px');
        document.body.style.setProperty('--my', e.clientY + 'px');
        raf = null;
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            // animate language bars when revealed
            entry.target.querySelectorAll('.lang-bar[data-w]').forEach((b) => {
              b.style.width = b.getAttribute('data-w');
            });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
    document.querySelectorAll('.lang-bar[data-w]').forEach((b) => {
      b.style.width = b.getAttribute('data-w');
    });
  }

  /* ---------- Experience cards: tap to expand (touch) ---------- */
  document.querySelectorAll('[data-expand]').forEach((card) => {
    card.addEventListener('click', () => card.classList.toggle('open'));
  });

  /* ---------- Active section in nav (landing) ---------- */
  const navAnchors = Array.from(
    document.querySelectorAll('.nav-links a[href^="#"]')
  );
  const sections = navAnchors
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = '#' + entry.target.id;
            navAnchors.forEach((a) =>
              a.classList.toggle('active', a.getAttribute('href') === id)
            );
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Contact form -> mailto ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const get = (id) => (document.getElementById(id) || {}).value || '';
      const nombre = get('nombre');
      const email = get('email');
      const asunto = get('asunto') || 'Contacto desde portfolio';
      const mensaje = get('mensaje');
      const body = `Nombre: ${nombre}\nEmail: ${email}\n\n${mensaje}`;
      window.location.href =
        `mailto:sergio.cajide04@gmail.com?subject=${encodeURIComponent(
          asunto
        )}&body=${encodeURIComponent(body)}`;
    });
  }
})();
