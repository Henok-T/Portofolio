/*
 * Reviews renderer
 *
 * Fetches /data/reviews.json and renders cards into two targets:
 *   [data-reviews-grid]   – the full reviews page list
 *   [data-reviews-teaser] – the homepage teaser (featured reviews only)
 *
 * On success, removes .nav-reviews-hidden from all [data-reviews-link] elements
 * so the nav link becomes visible.
 *
 * Uses DOM construction (no innerHTML) for all review content.
 */

const STAR_PATHS = {
  full: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  empty: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
};

function starSvg(filled) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', STAR_PATHS.full);
  path.setAttribute('fill', filled ? 'var(--illo-coffee)' : 'none');
  path.setAttribute('stroke', 'var(--illo-coffee)');
  path.setAttribute('stroke-width', '1.5');
  path.setAttribute('stroke-linejoin', 'round');

  svg.appendChild(path);
  return svg;
}

function starsRow(count) {
  const div = document.createElement('div');
  div.className = 'review-stars';
  div.setAttribute('aria-label', `${count} out of 5 stars`);
  for (let i = 1; i <= 5; i++) {
    div.appendChild(starSvg(i <= count));
  }
  return div;
}

function reviewCard(review) {
  const figure = document.createElement('figure');
  figure.className = 'review-card';

  figure.appendChild(starsRow(review.stars || 5));

  const blockquote = document.createElement('blockquote');
  const p = document.createElement('p');
  p.textContent = review.text;
  blockquote.appendChild(p);
  figure.appendChild(blockquote);

  const figcaption = document.createElement('figcaption');
  const authorSpan = document.createElement('span');
  authorSpan.className = 'review-author';
  authorSpan.textContent = review.author;
  figcaption.appendChild(authorSpan);

  if (review.role) {
    const roleSpan = document.createElement('span');
    roleSpan.className = 'review-role';
    roleSpan.textContent = review.role;
    figcaption.appendChild(roleSpan);
  }

  figure.appendChild(figcaption);
  return figure;
}

function emptyState(container) {
  const div = document.createElement('div');
  div.className = 'reviews-empty';

  const heading = document.createElement('p');
  heading.textContent = 'No reviews yet.';

  const sub = document.createElement('p');
  sub.textContent = 'Reviews will appear here once clients share their feedback.';

  div.appendChild(heading);
  div.appendChild(sub);
  container.appendChild(div);
}

(async () => {
  const grid = document.querySelector('[data-reviews-grid]');
  const teaser = document.querySelector('[data-reviews-teaser]');
  const links = document.querySelectorAll('[data-reviews-link]');

  if (!grid && !teaser) return;

  let reviews = [];
  try {
    const res = await fetch('/data/reviews.json');
    if (res.ok) reviews = await res.json();
  } catch {
    /* fetch failed; leave empty */
  }

  if (reviews.length > 0) {
    links.forEach((el) => el.classList.remove('nav-reviews-hidden'));
  }

  if (grid) {
    if (reviews.length === 0) {
      emptyState(grid);
    } else {
      reviews.forEach((r) => grid.appendChild(reviewCard(r)));
    }
  }

  if (teaser) {
    const featured = reviews.filter((r) => r.featured);
    if (featured.length > 0) {
      featured.slice(0, 3).forEach((r) => teaser.appendChild(reviewCard(r)));
      teaser.closest('section')?.removeAttribute('hidden');
    }
  }
})();
