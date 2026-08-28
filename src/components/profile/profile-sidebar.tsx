"use client";

import { useSyncExternalStore } from "react";
import { UserAvatar } from "@/components/profile/user-avatar";
import {
  useProfileTab,
  type ProfileTabId,
} from "@/components/profile/profile-tab-context";
import { profileUser } from "@/data/profile";
import {
  applyTheme,
  getThemeServerSnapshot,
  getThemeSnapshot,
  subscribeTheme,
} from "@/lib/theme";

const sideLinks: {
  id: ProfileTabId;
  label: string;
  icon: typeof ProfileIcon;
}[] = [
  { id: "watchlist", label: "Watchlist", icon: StarIcon },
  { id: "favorites", label: "Favorites", icon: HeartIcon },
  { id: "history", label: "History", icon: ClockIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

export function ProfileSidebar() {
  const { tab, setTab } = useProfileTab();
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  return (
    <aside className="profile-panel flex w-full flex-col rounded-2xl p-5 lg:min-h-[calc(100dvh-7rem)] lg:w-[280px] lg:shrink-0">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <UserAvatar size="lg" showVerified className="mx-auto lg:mx-0" />
        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 transition hover:text-violet-500 dark:text-violet-300 dark:hover:text-violet-200"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M4 16.5V19h2.5L18 7.5 15.5 5 4 16.5Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path d="M13.8 6.7 17.3 10.2" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          Change Avatar
        </button>

        <h1 className="mt-4 flex items-center gap-1.5 text-2xl font-extrabold text-slate-900 dark:text-white">
          {profileUser.username}
          {profileUser.verified ? (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-white">
              <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                <path d="M7.8 13.4 4.6 10.2l1.2-1.2 2 2 5.4-5.4 1.2 1.2-6.6 6.6Z" />
              </svg>
            </span>
          ) : null}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {profileUser.bio}
        </p>

        <div className="mt-4 w-full space-y-2 text-sm text-slate-500 dark:text-slate-400">
          <p className="flex items-center justify-center gap-2 lg:justify-start">
            <CalendarIcon />
            {profileUser.joinedLabel}
          </p>
          <p className="flex items-center justify-center gap-2 lg:justify-start">
            <PinIcon />
            {profileUser.location}
          </p>
        </div>
      </div>

      <nav className="mt-6 space-y-1" aria-label="Profile sections">
        <div
          className="flex w-full items-center gap-3 rounded-xl bg-violet-500/15 px-3 py-2.5 text-sm font-medium text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
          aria-current="page"
        >
          <ProfileIcon className="h-[18px] w-[18px]" />
          Profile
        </div>
        {sideLinks.map((link) => {
          const Icon = link.icon;
          const active = tab === link.id;
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => setTab(link.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                active
                  ? "text-violet-600 dark:text-violet-400"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {link.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/8">
        <span className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          Theme
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={theme === "dark"}
          aria-label="Toggle dark theme"
          onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
          className={`relative h-6 w-11 rounded-full transition ${
            theme === "dark" ? "bg-violet-500" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
              theme === "dark" ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </aside>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5.5 19.2c1.3-3.3 3.7-5 6.5-5s5.2 1.7 6.5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="m12 3.5 2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.4 6.9 19.2l1-5.7-4.1-4 5.7-.8L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path
        d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 7 7 0 1 0 20.5 14.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path
        d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4 4.2 19.8M19.8 4.2l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
