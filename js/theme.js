(() => {
  const storageKey = "portfolio-theme";
  const root = document.documentElement;

  function savedTheme() {
    try {
      return localStorage.getItem(storageKey) === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    const button = document.querySelector(".theme-toggle");
    if (button) {
      button.setAttribute("aria-pressed", String(dark));
      button.title = dark ? "Switch to light mode" : "Switch to dark mode";
    }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = dark ? "#18131f" : "#FAF7FF";
  }

  // This file runs before the stylesheet to avoid a light flash on saved dark mode.
  applyTheme(savedTheme());

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".theme-toggle");
    if (!button) return;
    applyTheme(root.dataset.theme);
    button.hidden = false;

    button.addEventListener("click", () => {
      const theme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(theme);
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // The toggle still works for this page if the browser blocks storage.
      }
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey || event.key === null) applyTheme(savedTheme());
  });

  // Browser Back can restore a cached page with an older theme.
  window.addEventListener("pageshow", () => applyTheme(savedTheme()));
})();
