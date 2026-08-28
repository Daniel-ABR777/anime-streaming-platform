"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("nova-theme-change", onStoreChange);
  return () => window.removeEventListener("nova-theme-change", onStoreChange);
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribeMounted(onStoreChange: () => void) {
  queueMicrotask(onStoreChange);
  return () => {};
}

function getMountedSnapshot() {
  return true;
}

function getMountedServerSnapshot() {
  return false;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") root.classList.remove("dark");
  else root.classList.add("dark");
  localStorage.setItem("nova-theme", theme);
  window.dispatchEvent(new Event("nova-theme-change"));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getMountedServerSnapshot,
  );

  function toggle() {
    applyTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        !mounted
          ? "Toggle color theme"
          : theme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
      }
      className="fixed top-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/70 text-violet-700 shadow-lg backdrop-blur-md transition hover:scale-105 sm:top-5 sm:right-5 sm:h-11 sm:w-11 dark:border-violet-400/30 dark:bg-[#120a28]/70 dark:text-violet-200"
    >
      {!mounted || theme === "dark" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4 4.2 19.8M19.8 4.2l-1.4 1.4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 7 7 0 1 0 20.5 14.2Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
