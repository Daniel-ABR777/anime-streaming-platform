export type Theme = "light" | "dark";

export function subscribeTheme(onStoreChange: () => void) {
  window.addEventListener("nova-theme-change", onStoreChange);
  return () => window.removeEventListener("nova-theme-change", onStoreChange);
}

export function getThemeSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function getThemeServerSnapshot(): Theme {
  return "dark";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") root.classList.remove("dark");
  else root.classList.add("dark");
  localStorage.setItem("nova-theme", theme);
  window.dispatchEvent(new Event("nova-theme-change"));
}
