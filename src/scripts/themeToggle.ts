const storageKey = "theme";
const root = document.documentElement;
const themeColorMeta = document.querySelector("meta[name='theme-color']");
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

const getSystemTheme = () => (systemThemeQuery.matches ? "dark" : "light");

const getStoredTheme = () =>
  window.localStorage.getItem(storageKey) || "system";

const setThemeUi = (themeMode: string) => {
  const themeButton = document.querySelector<HTMLButtonElement>(
    "[data-theme-toggle]",
  );

  if (themeButton) {
    themeButton.dataset.themeMode = themeMode;
    themeButton.setAttribute("aria-pressed", String(themeMode === "dark"));
  }
};

const applyTheme = (themeMode: string) => {
  const resolvedTheme = themeMode === "system" ? getSystemTheme() : themeMode;

  root.dataset.theme = resolvedTheme;
  root.style.colorScheme = resolvedTheme;

  if (themeColorMeta) {
    themeColorMeta.setAttribute(
      "content",
      resolvedTheme === "dark" ? "#111111" : "#f5f5f5",
    );
  }

  setThemeUi(themeMode);
};

const setTheme = (themeMode: string) => {
  if (themeMode === "system") {
    window.localStorage.removeItem(storageKey);
  } else {
    window.localStorage.setItem(storageKey, themeMode);
  }

  root.dataset.themeMode = themeMode;
  applyTheme(themeMode);
};

const initialMode = getStoredTheme();
root.dataset.themeMode = initialMode;
applyTheme(initialMode);

window.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.querySelector<HTMLButtonElement>(
    "[data-theme-toggle]",
  );

  if (!themeButton) {
    return;
  }

  themeButton.addEventListener("click", () => {
    const current = root.dataset.themeMode || "system";
    let nextTheme = "system";

    if (current === "system") {
      nextTheme = "light";
    } else if (current === "light") {
      nextTheme = "dark";
    }

    setTheme(nextTheme);
  });
});

systemThemeQuery.addEventListener("change", () => {
  if (root.dataset.themeMode === "system") {
    applyTheme("system");
  }
});
