"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { Poster } from "@/components/dashboard/poster";
import { UserAvatar } from "@/components/profile/user-avatar";
import { useProfileTab } from "@/components/profile/profile-tab-context";
import bannerImage from "@/imgs/banner.jpg";
import {
  profileBadges,
  profileContinueWatching,
  profileFavorites,
  profileUser,
  profileWatchlist,
  watchHistory,
} from "@/data/profile";
import {
  applyTheme,
  getThemeServerSnapshot,
  getThemeSnapshot,
  subscribeTheme,
} from "@/lib/theme";

export function ProfileContent() {
  const { tab, setTab } = useProfileTab();

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-5 xl:flex-row xl:items-start">
      <div className="min-w-0 flex-1 space-y-5">
        <ProfileBanner />

        {(tab === "overview" || tab === "continue") && <ContinueWatchingSection />}
        {(tab === "overview" || tab === "history") && <WatchHistorySection />}
        {(tab === "overview" || tab === "watchlist" || tab === "favorites") && (
          <div className="grid gap-5 md:grid-cols-2">
            {(tab === "overview" || tab === "watchlist") && (
              <PosterShelf
                title="My Watchlist"
                items={profileWatchlist}
                icon="bookmark"
                onViewAll={() => setTab("watchlist")}
              />
            )}
            {(tab === "overview" || tab === "favorites") && (
              <PosterShelf
                title="Favorites"
                items={profileFavorites}
                icon="heart"
                onViewAll={() => setTab("favorites")}
              />
            )}
          </div>
        )}

        {tab === "profile" && <ProfileDetailsPanel />}
        {tab === "notifications" && <NotificationsPanel />}
        {tab === "settings" && <AccountSettingsCard />}
      </div>

      {(tab === "overview" || tab === "profile" || tab === "settings") && (
        <aside className="w-full shrink-0 space-y-5 xl:w-[320px]">
          <StatisticsCard />
          <AccountSettingsCard />
          <BadgesCard />
        </aside>
      )}
    </div>
  );
}

function ProfileBanner() {
  const { stats } = profileUser;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-xl dark:border-white/8">
      <div className="relative min-h-[220px] sm:min-h-[260px]">
        <Image
          src={bannerImage}
          alt=""
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1100px"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"
        />

        <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between gap-5 p-5 sm:min-h-[260px] sm:p-6 lg:flex-row lg:items-end lg:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="relative shrink-0">
              <UserAvatar size="lg" className="ring-4 ring-white/20" />
              <button
                type="button"
                aria-label="Change avatar"
                className="absolute right-1 bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-white shadow-lg ring-2 ring-black/40 transition hover:brightness-110"
              >
                <CameraIcon />
              </button>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                  {profileUser.username}
                </h1>
                {profileUser.premium ? (
                  <span className="rounded-full bg-violet-500 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-white uppercase">
                    Premium
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-white/70">
                {profileUser.handle}
                <span className="mx-2 text-white/40">•</span>
                {profileUser.joinedLabel}
              </p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80">
                {profileUser.bio}
              </p>
              <button
                type="button"
                className="mt-3 inline-flex h-9 items-center rounded-xl border border-white/25 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            <BannerStat label="Days Watched" value={String(stats.daysWatched)} />
            <BannerStat label="Anime Watched" value={String(stats.animeWatched)} />
            <BannerStat
              label="Episodes Watched"
              value={stats.episodesWatched.toLocaleString()}
            />
            <BannerStat label="Time Watched" value={stats.timeWatched} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BannerStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 backdrop-blur-sm">
      <p className="text-[11px] font-medium text-white/65">{label}</p>
      <p className="mt-0.5 text-lg font-extrabold text-white sm:text-xl">{value}</p>
    </div>
  );
}

function ContinueWatchingSection() {
  return (
    <section className="profile-panel rounded-2xl p-4 sm:p-5">
      <SectionHeader title="Continue Watching" />
      <div className="scrollbar-none mt-4 flex gap-3 overflow-x-auto pb-1">
        {profileContinueWatching.map((item) => (
          <article
            key={item.id}
            className="w-[220px] shrink-0 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/80 dark:border-white/8 dark:bg-white/[0.03] sm:w-[240px]"
          >
            <div className="group relative">
              <Poster
                title={item.title}
                orientation="landscape"
                className="aspect-video w-full"
                sizes="240px"
              />
              <button
                type="button"
                aria-label={`Continue ${item.title}`}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-slate-900 shadow-lg transition group-hover:scale-105">
                  <PlayTriangle />
                </span>
              </button>
            </div>
            <div className="p-3">
              <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                {item.episode}
              </p>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-violet-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WatchHistorySection() {
  return (
    <section className="profile-panel rounded-2xl p-4 sm:p-5">
      <SectionHeader title="Watch History" />
      <ul className="mt-4 space-y-3">
        {watchHistory.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 sm:flex-nowrap dark:border-white/6 dark:bg-white/[0.03]"
          >
            <Poster
              title={item.title}
              orientation="portrait"
              className="h-14 w-14 shrink-0 rounded-lg"
              sizes="56px"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <span className="text-xs font-medium text-slate-400">{item.timeAgo}</span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-violet-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PosterShelf({
  title,
  items,
  icon,
  onViewAll,
}: {
  title: string;
  items: typeof profileWatchlist;
  icon: "bookmark" | "heart";
  onViewAll: () => void;
}) {
  return (
    <section className="profile-panel rounded-2xl p-4 sm:p-5">
      <SectionHeader title={title} onViewAll={onViewAll} />
      <div className="mt-4 grid grid-cols-3 gap-3">
        {items.map((item) => (
          <article key={item.id} className="min-w-0">
            <div className="relative overflow-hidden rounded-xl">
              <Poster
                title={item.title}
                orientation="portrait"
                className="aspect-[2/3] w-full"
                sizes="120px"
              />
              <span
                className={`absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg text-white shadow ${
                  icon === "heart" ? "bg-rose-500/90" : "bg-sky-500/90"
                }`}
              >
                {icon === "heart" ? <HeartFill /> : <BookmarkFill />}
              </span>
            </div>
            <h3 className="mt-2 line-clamp-2 text-xs font-bold text-slate-900 dark:text-white">
              {item.title}
            </h3>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{item.type}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatisticsCard() {
  const { stats, typeBreakdown } = profileUser;
  const circumference = 2 * Math.PI * 54;
  const segments = [
    { value: typeBreakdown.tv, color: "#8b5cf6", label: "TV Series" },
    { value: typeBreakdown.movies, color: "#38bdf8", label: "Movies" },
    { value: typeBreakdown.ova, color: "#f472b6", label: "OVA" },
    { value: typeBreakdown.specials, color: "#fbbf24", label: "Specials" },
  ];

  let offset = 0;

  return (
    <section className="profile-panel rounded-2xl p-5">
      <h2 className="text-base font-bold text-slate-900 dark:text-white">Statistics</h2>

      <div className="mt-4 flex flex-col items-center">
        <div className="relative h-36 w-36">
          <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
            <circle cx="70" cy="70" r="54" fill="none" stroke="currentColor" strokeWidth="14" className="text-slate-200 dark:text-white/10" />
            {segments.map((segment) => {
              const length = (segment.value / 100) * circumference;
              const dash = `${length} ${circumference - length}`;
              const currentOffset = offset;
              offset += length;
              return (
                <circle
                  key={segment.label}
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="14"
                  strokeDasharray={dash}
                  strokeDashoffset={-currentOffset}
                  strokeLinecap="butt"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-xl font-extrabold text-slate-900 dark:text-white">
              {stats.episodesWatched.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-500">Episodes</p>
          </div>
        </div>

        <ul className="mt-4 grid w-full grid-cols-2 gap-2 text-xs">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: segment.color }} />
              {segment.label} {segment.value}%
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <MiniStat label="Average Rating" value={`${stats.averageRating}/10`} />
        <MiniStat label="Longest Streak" value={`${stats.longestStreak} Days`} />
        <MiniStat label="Total Anime" value={String(stats.animeWatched)} />
        <MiniStat label="Genres Explored" value={String(stats.genresExplored)} />
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2.5 dark:border-white/6 dark:bg-white/[0.03]">
      <p className="text-[11px] text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

function AccountSettingsCard() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  return (
    <section className="profile-panel rounded-2xl p-5">
      <h2 className="text-base font-bold text-slate-900 dark:text-white">Account Settings</h2>
      <ul className="mt-4 space-y-3">
        <SettingRow label="Email" value={profileUser.email} />
        <SettingRow label="Password" value="••••••••••" />
        <SettingRow label="Language" value={profileUser.language} />
        <SettingRow label="Theme" value={theme === "dark" ? "Dark" : "Light"} />
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/8">
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Email Notifications
          </p>
          <p className="text-xs text-slate-500">Get updates about new episodes</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={true}
          aria-label="Toggle email notifications"
          className="relative h-6 w-11 rounded-full bg-violet-500"
        >
          <span className="absolute top-0.5 left-0.5 h-5 w-5 translate-x-5 rounded-full bg-white shadow" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
        className="mt-4 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:text-slate-200 dark:hover:border-violet-500/40 dark:hover:text-white"
      >
        Switch to {theme === "dark" ? "Light" : "Dark"} Theme
      </button>
    </section>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{value}</p>
      </div>
      <button
        type="button"
        className="shrink-0 text-sm font-semibold text-violet-600 transition hover:text-violet-500 dark:text-violet-300"
      >
        Change
      </button>
    </li>
  );
}

function BadgesCard() {
  return (
    <section className="profile-panel rounded-2xl p-5">
      <SectionHeader title="Badges" />
      <div className="mt-4 flex flex-wrap justify-between gap-3">
        {profileBadges.map((badge) => (
          <div key={badge.id} className="flex w-[56px] flex-col items-center gap-1.5 text-center">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${badge.color} text-sm font-black text-white shadow-md`}
            >
              {badge.label.slice(0, 1)}
            </span>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProfileDetailsPanel() {
  return (
    <section className="profile-panel rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile Details</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{profileUser.bio}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <DetailField label="Display name" value={profileUser.username} />
        <DetailField label="Handle" value={profileUser.handle} />
        <DetailField label="Joined" value={profileUser.joinedLabel} />
        <DetailField label="Location" value={profileUser.location} />
      </div>
    </section>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2.5 dark:border-white/6 dark:bg-white/[0.03]">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

function NotificationsPanel() {
  const notes = [
    "New episode of Solo Leveling is available",
    "Demon Slayer was added to your watchlist recommendations",
    "Your Premium plan renews in 7 days",
  ];

  return (
    <section className="profile-panel rounded-2xl p-5">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Notifications</h2>
      <ul className="mt-4 space-y-2">
        {notes.map((note) => (
          <li
            key={note}
            className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-3 text-sm text-slate-700 dark:border-white/6 dark:bg-white/[0.03] dark:text-slate-200"
          >
            {note}
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionHeader({
  title,
  onViewAll,
}: {
  title: string;
  onViewAll?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-base font-bold text-slate-900 dark:text-white">{title}</h2>
      <button
        type="button"
        onClick={onViewAll}
        className="text-sm font-medium text-violet-600 transition hover:text-violet-500 dark:text-violet-300"
      >
        View All
      </button>
    </div>
  );
}

function PlayTriangle() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M4.5 8.5h2.2l1.2-2h8.2l1.2 2H19.5A1.5 1.5 0 0 1 21 10v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18v-8a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function HeartFill() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

function BookmarkFill() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5h10A1.5 1.5 0 0 1 18.5 6v13.2L12 15.5l-6.5 3.7V6A1.5 1.5 0 0 1 7 4.5Z" />
    </svg>
  );
}
