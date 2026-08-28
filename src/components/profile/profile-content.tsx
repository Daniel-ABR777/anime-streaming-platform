"use client";

import { useState, type ReactNode } from "react";
import { Poster } from "@/components/dashboard/poster";
import { ProgressRing } from "@/components/profile/progress-ring";
import {
  profileFavorites,
  profileUser,
  profileWatchlist,
  watchHistory,
  type HistoryStatus,
} from "@/data/profile";

type TabId = "history" | "watchlist" | "favorites" | "settings";

const tabs: { id: TabId; label: string; icon: typeof HistoryTabIcon }[] = [
  { id: "history", label: "Watch History", icon: HistoryTabIcon },
  { id: "watchlist", label: "Watchlist", icon: StarTabIcon },
  { id: "favorites", label: "Favorites", icon: HeartTabIcon },
  { id: "settings", label: "Settings", icon: SettingsTabIcon },
];

function statusStyles(status: HistoryStatus) {
  if (status === "Completed") {
    return "text-violet-600 dark:text-violet-300";
  }
  if (status === "On Hold") {
    return "text-slate-500 dark:text-slate-400";
  }
  return "text-sky-600 dark:text-sky-300";
}

export function ProfileContent() {
  const [tab, setTab] = useState<TabId>("history");
  const { stats } = profileUser;

  return (
    <section className="profile-panel min-w-0 flex-1 rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <button
          type="button"
          className="flex h-36 w-full shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-400/50 bg-violet-500/5 px-4 text-center transition hover:border-violet-400 hover:bg-violet-500/10 sm:h-40 lg:w-48 dark:border-violet-400/35"
        >
          <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-300">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path
                d="M12 16V6M8 9.5 12 5.5 16 9.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 16.5V18a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18v-1.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Click to upload or
            <br />
            drag and drop
          </span>
          <span className="mt-1 text-xs text-slate-400">JPG, PNG or GIF (Max 2MB)</span>
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                {profileUser.username}
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-white">
                  <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                    <path d="M7.8 13.4 4.6 10.2l1.2-1.2 2 2 5.4-5.4 1.2 1.2-6.6 6.6Z" />
                  </svg>
                </span>
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {profileUser.bio}
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
                  <path
                    d="M8 3v4M16 3v4M4 10h16"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
                {profileUser.joinedLabel}
              </p>
            </div>
            <button
              type="button"
              className="rounded-full border border-violet-400/60 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-500/10 dark:text-violet-300"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <StatCard
          icon={<TvIcon />}
          label="Anime Watched"
          value={stats.animeWatched.toLocaleString()}
        />
        <StatCard
          icon={<ClapperIcon />}
          label="Episodes Watched"
          value={stats.episodesWatched.toLocaleString()}
        />
        <StatCard
          icon={<HeartFillIcon />}
          label="Favorites"
          value={stats.favorites.toLocaleString()}
        />
      </div>

      <div className="mt-7 border-b border-slate-200 dark:border-white/8">
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {tabs.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`relative flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "text-violet-600 dark:text-violet-300"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
                {active ? (
                  <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-violet-500" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        {tab === "history" ? <WatchHistoryPanel /> : null}
        {tab === "watchlist" ? <SimpleListPanel items={profileWatchlist} empty="No watchlist items yet." /> : null}
        {tab === "favorites" ? <SimpleListPanel items={profileFavorites} empty="No favorites yet." /> : null}
        {tab === "settings" ? <SettingsPanel /> : null}
      </div>
    </section>
  );
}

function WatchHistoryPanel() {
  return (
    <div>
      <ul className="space-y-3">
        {watchHistory.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 sm:flex-nowrap dark:border-white/6 dark:bg-white/[0.03]"
          >
            <Poster
              title={item.title}
              accent={item.accent}
              compact
              className="h-16 w-16 shrink-0 rounded-xl"
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p>
            </div>
            <div className={`flex items-center gap-2 text-sm font-medium ${statusStyles(item.status)}`}>
              <span
                className={`h-2 w-2 rounded-full ${
                  item.status === "Completed" ? "bg-violet-500" : "bg-slate-400"
                }`}
              />
              {item.status}
            </div>
            <ProgressRing value={item.progress} />
            <span className="w-28 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
              {item.date}
            </span>
            <button
              type="button"
              aria-label={`More options for ${item.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white"
            >
              ⋮
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-5 text-center">
        <button
          type="button"
          className="text-sm font-semibold text-violet-600 transition hover:text-violet-500 dark:text-violet-300"
        >
          View full watch history →
        </button>
      </div>
    </div>
  );
}

function SimpleListPanel({
  items,
  empty,
}: {
  items: { id: string; title: string; subtitle: string; accent: string }[];
  empty: string;
}) {
  if (items.length === 0) {
    return <p className="py-10 text-center text-sm text-slate-500">{empty}</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-white/6 dark:bg-white/[0.03]"
        >
          <Poster
            title={item.title}
            accent={item.accent}
            compact
            className="h-16 w-16 shrink-0 rounded-xl"
          />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p>
          </div>
          <button
            type="button"
            className="rounded-full bg-violet-500 px-3 py-1.5 text-xs font-bold text-white"
          >
            Open
          </button>
        </li>
      ))}
    </ul>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 dark:border-white/6 dark:bg-white/[0.03]">
      <h3 className="text-base font-bold text-slate-900 dark:text-white">Account Settings</h3>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium text-slate-600 dark:text-slate-300">Display name</span>
        <input
          defaultValue={profileUser.username}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none focus:border-violet-400 dark:border-white/10 dark:bg-[#0f1420] dark:text-white"
        />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium text-slate-600 dark:text-slate-300">Bio</span>
        <textarea
          defaultValue={profileUser.bio}
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-violet-400 dark:border-white/10 dark:bg-[#0f1420] dark:text-white"
        />
      </label>
      <button
        type="button"
        className="rounded-full bg-violet-500 px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
      >
        Save Changes
      </button>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-4 dark:border-white/6 dark:bg-white/[0.03]">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-300">
          {icon}
        </span>
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function TvIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 20h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m10 10 5 2.5-5 2.5V10Z" fill="currentColor" />
    </svg>
  );
}

function ClapperIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4 9.5h16V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m4 9.5 3.2-5.2 3.3 2L14 3.3l3.2 2L20.5 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartFillIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

function HistoryTabIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8v4l3 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 4.5 6 6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function StarTabIcon({ className }: { className?: string }) {
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

function HeartTabIcon({ className }: { className?: string }) {
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

function SettingsTabIcon({ className }: { className?: string }) {
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
