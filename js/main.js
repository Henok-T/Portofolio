/*
 * Site-wide behavior
 * 1. Mobile navigation (bottom sheet)
 * 2. Header border once the page scrolls
 * 3. Highlight the nav link for the section in view (homepage only)
 * 4. Footer year
 * 5. Service worker registration
 */

/* ---------- 1. Mobile navigation ---------- */
function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const panel = document.querySelector('[data-nav-panel]');
  const backdrop = document.querySelector('[data-nav-backdrop]');
  const closeButton = document.querySelector('[data-nav-close]');
  if (!toggle || !panel) return;

  const smallScreen = window.matchMedia('(max-width: 859.98px)');
  // Everything outside the sheet becomes inert while it is open
  const outside = [
    document.querySelector('main'),
    document.querySelector('footer'),
    document.querySelector('.brand'),
    document.querySelector('[data-theme-toggle]'),
  ].filter(Boolean);
  // The toggle itself stays out of this list: making the focused element inert
  // makes the browser reset focus to <body> right after the sheet opens.


  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  function setOpen(open, { restoreFocus = true } = {}) {
    toggle.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('is-open', open);
    backdrop?.classList.toggle('is-visible', open);
    outside.forEach((el) => { el.inert = open; });

    if (open) {
      // Wait a frame so the sheet is visible (and focusable) first
      window.requestAnimationFrame(() => panel.querySelector('a, button')?.focus());
    } else if (restoreFocus) {
      toggle.focus();
    }
  }

  toggle.addEventListener('click', () => setOpen(!isOpen()));
  closeButton?.addEventListener('click', () => setOpen(false));
  backdrop?.addEventListener('click', () => setOpen(false));

  // Following a link closes the sheet; the browser moves to the target
  panel.addEventListener('click', (event) => {
    if (event.target.closest('a') && isOpen()) setOpen(false, { restoreFocus: false });
  });

  document.addEventListener('keydown', (event) => {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }

    // Keep Tab inside the sheet
    if (event.key === 'Tab') {
      const focusable = [...panel.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Growing past the breakpoint turns the sheet back into the inline nav
  smallScreen.addEventListener('change', () => {
    if (isOpen()) setOpen(false, { restoreFocus: false });
  });
}

/* ---------- 2. Header state ---------- */
function initHeaderState() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  function syncHeight() {
    document.documentElement.style.setProperty(
      '--header-h',
      header.getBoundingClientRect().height + 'px'
    );
  }

  let ticking = false;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    syncHeight();
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', syncHeight, { passive: true });

  update();
}

/* ---------- 3. Current-section highlighting ---------- */
function initSectionHighlight() {
  const links = [...document.querySelectorAll('.nav-list a[href^="/#"]')];
  const sections = links
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((section) => observer.observe(section));
}

/* ---------- 4. Footer year ---------- */
function initYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

/* ---------- 5. Service worker ---------- */
function registerServiceWorker() {
  // HTTPS only, so local development never serves stale cached files
  if (!('serviceWorker' in navigator) || window.location.protocol !== 'https:') return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* The site works normally without it. */
    });
  });
}

initMobileNav();
initHeaderState();
initSectionHighlight();
initYear();
registerServiceWorker();
