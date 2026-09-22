/*
 * Illustrations: scroll-in reveal via IntersectionObserver.
 * All animation that is not scroll-triggered runs via CSS (steam, gears).
 * This file only manages the .illo-reveal → .is-visible class transition.
 */

(() => {
  const items = document.querySelectorAll('.illo-reveal');
  if (!items.length || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  items.forEach((el) => observer.observe(el));
})();
