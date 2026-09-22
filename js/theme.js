/*
 * Theme toggle
 * - First visit follows the system setting (prefers-color-scheme).
 * - Clicking the toggle saves an explicit choice in localStorage.
 * - The tiny inline script in <head> applies a saved choice before paint.
 */
(() => {
  const root = document.documentElement;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const STORAGE_KEY = 'theme';
  const BAR_COLORS = { light: '#FFFFFF', dark: '#062545' };

  const currentTheme = () =>
    root.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light');

  function syncUi() {
    const theme = currentTheme();
    const next = theme === 'dark' ? 'light' : 'dark';

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-label', `Switch to ${next} theme`);
      button.title = `Switch to ${next} theme`;
    });

    // Only override the browser bar color once the visitor has made a choice
    if (root.hasAttribute('data-theme')) {
      document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
        meta.setAttribute('content', BAR_COLORS[theme]);
      });
    }
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* Storage can be unavailable (private mode); the choice still applies for this page. */
    }
    syncUi();
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-theme-toggle]');
    if (!button) return;
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  systemDark.addEventListener('change', syncUi);
  syncUi();
})();
