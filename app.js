/* =========================================================
   Sergio Cajide Gómez — Portfolio · app.js
   JavaScript sin dependencias. Cada bloque es independiente
   y no hace nada si su marcado no está en la página.
   ========================================================= */
(function () {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  // Traducción de etiquetas que cambian en tiempo de ejecución (i18n.js)
  const t = (text) => (window.I18N ? window.I18N.t(text) : text);
  const onLangChange = (fn) => document.addEventListener('langchange', fn);

  /* ---------- Cabecera y progreso de lectura ---------- */
  function initHeader() {
    const header = $('#siteHeader');
    const bar = $('#progressBar');
    if (!header || !bar) return;

    let ticking = false;
    const update = () => {
      const max = root.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.setProperty('--progress', ratio.toFixed(4));
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ---------- Menú móvil (hoja inferior) ---------- */
  function initMenu() {
    const menu = $('#menu');
    const openBtn = $('#menuOpen');
    const list = $('#menuList');
    if (!menu || !openBtn || !list || typeof menu.showModal !== 'function') {
      if (openBtn) openBtn.hidden = true;
      return;
    }

    const close = () => { if (menu.open) menu.close(); };

    openBtn.addEventListener('click', () => {
      menu.showModal();
      openBtn.setAttribute('aria-expanded', 'true');
    });
    menu.addEventListener('close', () => {
      openBtn.setAttribute('aria-expanded', 'false');
      openBtn.focus({ preventScroll: true });
    });

    menu.addEventListener('click', (event) => {
      if (event.target === menu || event.target.closest('[data-close-menu]')) {
        close();
        return;
      }
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      event.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      close();
      if (target) goTo(target, link.getAttribute('href'));
    });
  }

  /* Desplaza a una sección y le pasa el foco sin un segundo salto */
  function goTo(target, hash) {
    // Si el destino está dentro de un bloque aún sin aparecer, se muestra ya: su
    // desplazamiento de entrada movería el destino mientras llegamos
    const pending = target.closest('.reveal:not(.is-in)');
    if (pending) {
      pending.style.transition = 'none';
      pending.classList.add('is-in');
      void pending.offsetWidth;
      pending.style.transition = '';
    }
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
      if (hash) history.pushState(null, '', hash);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  /* ---------- Sección activa en la navegación ---------- */
  function initNavSpy() {
    const links = $$('.nav-list a[href^="#"], .menu-list a[href^="#"]');
    const ids = [...new Set(links.map((a) => a.getAttribute('href').slice(1)))];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const setActive = (id) => {
      // Los enlaces del menú se clonan al iniciar, así que se vuelven a consultar
      $$('.nav-list a[href^="#"], .menu-list a[href^="#"]').forEach((a) => {
        if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => observer.observe(section));

    const hero = $('#top');
    if (hero) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(null);
      }, { rootMargin: '-45% 0px -50% 0px' }).observe(hero);
    }
  }

  /* ---------- Aparición al desplazar ---------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }

    // Pequeño escalonado entre hermanos que entran a la vez
    items.forEach((el) => {
      const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal'));
      const index = siblings.indexOf(el) % 4;
      if (index > 0) el.style.setProperty('--reveal-delay', index * 70 + 'ms');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    items.forEach((el) => observer.observe(el));
  }

  /* ---------- Desplegables de funciones ---------- */
  function initDisclosures() {
    $$('.disclosure[aria-controls]').forEach((button) => {
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel) return;
      const label = $('.disclosure-label', button);
      // Textos en español; se traducen al pintarlos
      const closedText = label ? label.textContent.trim() : '';
      const openText = (label && label.dataset.openLabel) || 'Ocultar ' + closedText.toLowerCase();
      const render = () => {
        if (label) label.textContent = t(button.getAttribute('aria-expanded') === 'true' ? openText : closedText);
      };
      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(open));
        panel.classList.toggle('is-open', open);
        render();
      });
      onLangChange(render);
    });
  }

  /* ---------- Tarjetas con giro ---------- */
  function initFlipCards() {
    $$('[data-flip]').forEach((card) => {
      const front = $('.cert-front', card);
      const back = $('.cert-back', card);
      const flipBtn = $('.cert-flip', card);
      if (!front || !back || !flipBtn) return;

      const setFlipped = (flipped, moveFocus) => {
        card.classList.toggle('is-flipped', flipped);
        flipBtn.setAttribute('aria-expanded', String(flipped));
        front.inert = flipped;
        back.inert = !flipped;
        front.setAttribute('aria-hidden', String(flipped));
        back.setAttribute('aria-hidden', String(!flipped));
        if (moveFocus) (flipped ? back : flipBtn).focus({ preventScroll: true });
      };

      setFlipped(false, false);

      flipBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        setFlipped(true, true);
      });

      // Toda la cara frontal gira al pulsarla, salvo sus propios controles
      front.addEventListener('click', (event) => {
        if (event.target.closest('button, a')) return;
        setFlipped(true, true);
      });

      $$('.cert-unflip', back).forEach((btn) => {
        btn.addEventListener('click', () => setFlipped(false, true));
      });

      back.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          setFlipped(false, true);
        }
      });
    });
  }

  /* ---------- Visor de diplomas ---------- */
  function initViewer() {
    const dialog = $('#viewer');
    if (!dialog || typeof dialog.showModal !== 'function') {
      // Sin <dialog>: los botones abren directamente el PDF original
      $$('[data-open-viewer]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const card = btn.closest('[data-diploma-src]');
          if (card) window.open(card.dataset.diplomaPdf, '_blank', 'noopener');
        });
      });
      return;
    }

    const img = $('#viewerImg');
    const title = $('#viewerTitle');
    const pdf = $('#viewerPdf');
    const verify = $('#viewerVerify');
    const zoomBtn = $('#viewerZoom');
    const zoomLabel = $('.viewer-zoom-label', zoomBtn);
    const stage = $('#viewerStage');
    const closeBtn = $('#viewerClose');
    let opener = null;
    let pressedOnBackdrop = false;

    const setZoom = (on, point) => {
      dialog.classList.toggle('is-zoomed', on);
      zoomBtn.setAttribute('aria-pressed', String(on));
      zoomLabel.textContent = t(on ? 'Ajustar' : 'Ampliar');
      if (on && point) {
        // Centra la ampliación en el punto pulsado
        stage.scrollLeft = point.x * stage.scrollWidth - stage.clientWidth / 2;
        stage.scrollTop = point.y * stage.scrollHeight - stage.clientHeight / 2;
      }
    };

    const open = (card, trigger) => {
      opener = trigger;
      img.src = card.dataset.diplomaSrc;
      img.alt = card.dataset.diplomaAlt || '';
      title.textContent = card.dataset.diplomaTitle || 'Diploma';
      pdf.href = card.dataset.diplomaPdf;
      verify.hidden = !card.dataset.diplomaVerify;
      if (card.dataset.diplomaVerify) verify.href = card.dataset.diplomaVerify;
      setZoom(false);
      root.classList.add('is-locked');
      dialog.showModal();
      closeBtn.focus();
    };

    $$('[data-open-viewer]').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        const card = btn.closest('[data-diploma-src]');
        if (card) open(card, btn);
      });
    });

    closeBtn.addEventListener('click', () => dialog.close());

    dialog.addEventListener('close', () => {
      root.classList.remove('is-locked');
      setZoom(false);
      stage.scrollTo(0, 0);
      if (opener && opener.isConnected) opener.focus({ preventScroll: true });
      opener = null;
    });

    // Cerrar al pulsar el fondo, pero no si el gesto empezó dentro del contenido
    dialog.addEventListener('pointerdown', (event) => {
      pressedOnBackdrop = event.target === dialog;
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog && pressedOnBackdrop) dialog.close();
      pressedOnBackdrop = false;
    });

    zoomBtn.addEventListener('click', () => setZoom(!dialog.classList.contains('is-zoomed')));
    onLangChange(() => { zoomLabel.textContent = t(dialog.classList.contains('is-zoomed') ? 'Ajustar' : 'Ampliar'); });

    img.addEventListener('click', (event) => {
      const zoomed = dialog.classList.contains('is-zoomed');
      const rect = img.getBoundingClientRect();
      const point = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
      setZoom(!zoomed, zoomed ? null : point);
    });
  }

  /* ---------- Copiar email ---------- */
  function initCopyEmail() {
    const btn = $('#copyEmail');
    const status = $('#copyStatus');
    if (!btn) return;
    const label = $('.copy-label', btn);
    let timer = null;

    const fallbackCopy = (text) => {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.append(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    };

    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch (err) {
        ok = fallbackCopy(text);
      }
      label.textContent = t(ok ? 'Copiado' : 'No se pudo copiar');
      if (status) status.textContent = t(ok ? 'Email copiado al portapapeles' : 'No se pudo copiar el email');
      btn.classList.toggle('is-done', ok);
      window.clearTimeout(timer);
      timer = window.setTimeout(reset, 2200);
    });

    function reset() {
      label.textContent = t('Copiar');
      btn.classList.remove('is-done');
      if (status) status.textContent = '';
    }
    onLangChange(() => { window.clearTimeout(timer); reset(); });
  }

  /* ---------- Formulario → cliente de correo ---------- */
  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;
    const error = $('#formError');
    const fields = $$('input, textarea', form);

    fields.forEach((field) => {
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true' && field.checkValidity()) {
          field.removeAttribute('aria-invalid');
        }
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const invalid = fields.filter((field) => !field.checkValidity());
      fields.forEach((field) => {
        if (invalid.includes(field)) field.setAttribute('aria-invalid', 'true');
        else field.removeAttribute('aria-invalid');
      });

      if (invalid.length) {
        const names = invalid.map((f) => $('label[for="' + f.id + '"]', form).firstChild.textContent.trim().toLowerCase());
        error.textContent = t('Revisa:') + ' ' + names.join(', ') + '.';
        error.hidden = false;
        invalid[0].focus();
        return;
      }
      error.hidden = true;

      const value = (id) => form.elements[id].value.trim();
      const subject = value('asunto') || t('Contacto desde el portfolio');
      const body = t('Nombre:') + ' ' + value('nombre') + '\nEmail: ' + value('email') + '\n\n' + value('mensaje');
      window.location.href = 'mailto:sergio.cajide04@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });

    // El mensaje de error se redacta en el idioma activo: al cambiarlo, se oculta
    onLangChange(() => { error.hidden = true; });
  }

  /* ---------- Panel de habilidades ---------- */
  function initSkills() {
    const panel = $('#skillsPanel');
    if (!panel) return;
    const groups = $$('.skillset-group', panel);
    const chips = [];
    groups.forEach((group, index) => {
      $$('.chips li', group).forEach((li) => {
        li.classList.add('skill-chip');
        li.dataset.cat = String(index);
        chips.push(li);
      });
    });

    // Filtros por área, generados a partir de los títulos de cada grupo
    const filters = document.createElement('div');
    filters.className = 'skill-filters';
    filters.setAttribute('role', 'group');
    filters.setAttribute('aria-label', 'Filtrar habilidades por área');
    const makeButton = (cat, label, count) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'skill-filter';
      btn.dataset.cat = cat;
      btn.setAttribute('aria-pressed', String(cat === 'all'));
      const text = document.createElement('span');
      text.textContent = label;
      const badge = document.createElement('span');
      badge.className = 'skill-filter-count';
      badge.setAttribute('aria-hidden', 'true');
      badge.dataset.i18nSkip = '';
      badge.textContent = String(count);
      btn.append(text, badge);
      filters.append(btn);
      return btn;
    };
    const buttons = [makeButton('all', 'Todas', chips.length)];
    groups.forEach((group, index) => {
      buttons.push(makeButton(String(index), $('.skillset-head', group).textContent.trim(), $$('.chips li', group).length));
    });
    $('.skills-top', panel).append(filters);

    let locked = 'all';
    const show = (cat) => {
      panel.dataset.active = cat;
      chips.forEach((chip) => chip.classList.toggle('is-match', cat !== 'all' && chip.dataset.cat === cat));
    };
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        locked = btn.dataset.cat === locked && locked !== 'all' ? 'all' : btn.dataset.cat;
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === locked)));
        show(locked);
      });
      // Vista previa al pasar el ratón o con el foco
      btn.addEventListener('mouseenter', () => show(btn.dataset.cat));
      btn.addEventListener('mouseleave', () => show(locked));
    });
    filters.addEventListener('focusout', () => show(locked));
    chips.forEach((chip) => {
      const hint = buttons.find((b) => b.dataset.cat === chip.dataset.cat);
      chip.addEventListener('mouseenter', () => hint.classList.add('is-hint'));
      chip.addEventListener('mouseleave', () => hint.classList.remove('is-hint'));
    });
    show('all');

    // Entrada: contador de 0 a 20 y habilidades que aparecen «descifrándose»
    const counter = $('.skills-count', panel);
    const total = chips.length;
    const reveal = () => {
      if (reduceMotion.matches) {
        chips.forEach((chip) => chip.classList.add('is-in'));
        counter.textContent = String(total);
        return;
      }
      const start = performance.now();
      const tickCount = (now) => {
        const p = Math.min((now - start) / 1100, 1);
        counter.textContent = String(Math.round(total * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tickCount);
      };
      requestAnimationFrame(tickCount);
      chips.forEach((chip, i) => window.setTimeout(() => {
        chip.classList.add('is-in');
        scramble(chip);
      }, 120 + i * 55));
    };

    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    function scramble(chip) {
      const target = chip.textContent;
      const duration = 520;
      const begin = performance.now();
      chip.classList.add('is-scrambling');
      const frame = (now) => {
        const p = Math.min((now - begin) / duration, 1);
        const fixed = Math.floor(target.length * p);
        let out = target.slice(0, fixed);
        for (let k = fixed; k < target.length; k++) {
          out += target[k] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        chip.dataset.scramble = out;
        if (p < 1) requestAnimationFrame(frame);
        else { chip.classList.remove('is-scrambling'); delete chip.dataset.scramble; }
      };
      requestAnimationFrame(frame);
    }

    counter.textContent = reduceMotion.matches ? String(total) : '0';
    if (!('IntersectionObserver' in window)) { reveal(); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); reveal(); }
    }, { threshold: 0.25 });
    io.observe(panel);
  }

  /* ---------- Portada del TFG: ligera inclinación 3D con el ratón ---------- */
  function initTfgTilt() {
    const cover = $('.tfg-cover');
    if (!cover || reduceMotion.matches || !window.matchMedia('(pointer: fine)').matches) return;
    const front = $('.tfg-sheet--front', cover);
    cover.addEventListener('pointermove', (event) => {
      const r = cover.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      front.style.setProperty('--ry', (x * 16).toFixed(2) + 'deg');
      front.style.setProperty('--rx', (-y * 16).toFixed(2) + 'deg');
    });
    cover.addEventListener('pointerleave', () => {
      front.style.removeProperty('--rx');
      front.style.removeProperty('--ry');
    });
  }

  /* ---------- Cinta de herramientas ---------- */
  function initMarquee() {
    const marquee = $('#toolMarquee');
    if (!marquee) return;
    const track = $('.marquee-track', marquee);
    const originals = $$('.marquee-item', track);

    // Segunda copia para un bucle sin saltos; invisible para lectores de pantalla
    originals.forEach((item) => {
      const copy = item.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      copy.classList.add('is-clone');
      track.append(copy);
    });

    const setDuration = () => {
      const half = track.scrollWidth / 2;
      marquee.style.setProperty('--marquee-duration', Math.max(20, Math.round(half / 45)) + 's');
    };
    setDuration();
    window.addEventListener('resize', setDuration, { passive: true });
    marquee.classList.add('is-running');
  }

  /* ---------- Año del pie ---------- */
  function initYear() {
    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  initHeader();
  initMenu();
  initNavSpy();
  initReveal();
  initDisclosures();
  initFlipCards();
  initViewer();
  initCopyEmail();
  initContactForm();
  initSkills();
  initTfgTilt();
  initMarquee();
  initYear();
  // El idioma se aplica al final, cuando ya existen los elementos clonados (menú, cinta)
  if (window.I18N) window.I18N.init();
})();
