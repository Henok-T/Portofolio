(function () {
  const storageKey = "ht-theme";

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || systemTheme();
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      const next = theme === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", "Switch to " + next + " mode");
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  const saved = localStorage.getItem(storageKey);
  applyTheme(saved === "light" || saved === "dark" ? saved : systemTheme());

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (!localStorage.getItem(storageKey)) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-theme-toggle]");
    if (!btn) return;
    const next = currentTheme() === "dark" ? "light" : "dark";
    localStorage.setItem(storageKey, next);
    applyTheme(next);
  });
})();
