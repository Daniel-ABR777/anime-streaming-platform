"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ProfileMenu } from "@/components/dashboard/profile-menu";
import {
  applyTheme,
  getThemeServerSnapshot,
  getThemeSnapshot,
  subscribeTheme,
} from "@/lib/theme";

const navLinks = [
  { href: "/", label: "Browse" },
  { href: "/#trending", label: "Trending" },
  { href: "/#new", label: "New Releases" },
  { href: "/#schedule", label: "Schedule" },
];

export function ProfileHeader() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#f7f8fc]/90 backdrop-blur-xl dark:border-white/5 dark:bg-[#0b0f1a]/90">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
            AniStream
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <label className="relative hidden w-56 md:block lg:w-64">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="m16 16 3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search anime..."
              className="h-10 w-full rounded-full border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-[#121826] dark:text-white dark:placeholder:text-slate-500"
            />
          </label>

          <button
            type="button"
            onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
            aria-label={
              !mounted
                ? "Toggle color theme"
                : theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-[#121826] dark:text-slate-300 dark:hover:text-violet-300"
          >
            {!mounted || theme === "dark" ? (
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
                <path
                  d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4 4.2 19.8M19.8 4.2l-1.4 1.4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
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

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-[#121826] dark:text-slate-300"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
              <path
                d="M6.5 9.5a5.5 5.5 0 0 1 11 0c0 4.2 1.5 5.5 1.5 5.5H5s1.5-1.3 1.5-5.5Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-violet-500 ring-2 ring-white dark:ring-[#0b0f1a]" />
          </button>

          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
