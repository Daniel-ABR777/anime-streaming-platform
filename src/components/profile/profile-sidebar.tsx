"use client";

import Link from "next/link";
import {
  useProfileTab,
  type ProfileTabId,
} from "@/components/profile/profile-tab-context";

const sideLinks: {
  id: ProfileTabId;
  label: string;
  icon: typeof OverviewIcon;
  badge?: number;
}[] = [
  { id: "overview", label: "Overview", icon: OverviewIcon },
  { id: "profile", label: "Profile", icon: ProfileIcon },
  { id: "history", label: "Watch History", icon: ClockIcon },
  { id: "continue", label: "Continue Watching", icon: PlayIcon },
  { id: "watchlist", label: "Watchlist", icon: StarIcon },
  { id: "favorites", label: "Favorites", icon: HeartIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon, badge: 3 },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

export function ProfileSidebar() {
  const { tab, setTab } = useProfileTab();

  return (
    <aside className="profile-panel flex w-full flex-col rounded-2xl p-4 lg:min-h-[calc(100dvh-7rem)] lg:w-[240px] lg:shrink-0">
      <nav className="space-y-1" aria-label="Profile sections">
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
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/25"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              }`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              <span className="flex-1">{link.label}</span>
              {link.badge ? (
                <span
                  className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                    active ? "bg-white/20 text-white" : "bg-violet-500 text-white"
                  }`}
                >
                  {link.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 pt-6">
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 text-white shadow-lg shadow-violet-500/20">
          <p className="text-sm font-bold">Go Premium</p>
          <p className="mt-1 text-xs text-white/80">
            Unlock HD streaming, downloads, and exclusive badges.
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-xl bg-white py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
          >
            Upgrade Now
          </button>
        </div>

        <div className="flex items-center justify-between px-1">
          <p className="text-[11px] text-slate-400">© 2026 AniStream</p>
          <div className="flex items-center gap-2 text-slate-400">
            <SocialLink label="Discord" href="#">
              <DiscordIcon />
            </SocialLink>
            <SocialLink label="Twitter" href="#">
              <TwitterIcon />
            </SocialLink>
            <SocialLink label="YouTube" href="#">
              <YouTubeIcon />
            </SocialLink>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SocialLink({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="transition hover:text-violet-400"
    >
      {children}
    </Link>
  );
}

function OverviewIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
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

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
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

function BellIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M6.5 9.5a5.5 5.5 0 0 1 11 0c0 4.2 1.5 5.5 1.5 5.5H5s1.5-1.3 1.5-5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M20 5.5A15 15 0 0 0 15.4 4l-.4.8c1.6.4 3.1 1 4.4 1.9C15.6 5.4 10.8 5.2 9.2 5.2c-1.6 0-6.4.2-10.2 1.5C.3 5.8 1.8 5.2 3.4 4.8L3 4A15 15 0 0 0-1.6 5.5C-4.2 9.8-4.9 14-4.5 18c2.2 1.6 4.3 2.6 6.4 3.2l1-1.6c-1-.3-1.9-.8-2.7-1.4.2.1.5.3.7.4 3.7 1.7 7.6 1.7 11.2 0 .2-.1.5-.2.7-.4-.8.6-1.7 1.1-2.7 1.4l1 1.6c2.1-.6 4.2-1.6 6.4-3.2.5-4.7-.7-8.8-3.3-12.5Z" transform="translate(4.5 1) scale(.62)" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M18.2 3H21l-6.5 7.4L22 21h-5.7l-4.5-5.9L6.5 21H3.7l7-8L2 3h5.8l4 5.3L18.2 3Zm-1 16.3h1.6L7 4.6H5.3l11.9 14.7Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M22 12.2c0-2.3-.2-3.9-.5-4.8-.3-.9-.9-1.5-1.8-1.8C18.2 5.2 12 5.2 12 5.2s-6.2 0-7.7.4c-.9.3-1.5.9-1.8 1.8C2.2 8.3 2 10 2 12.2s.2 3.9.5 4.8c.3.9.9 1.5 1.8 1.8 1.5.4 7.7.4 7.7.4s6.2 0 7.7-.4c.9-.3 1.5-.9 1.8-1.8.3-.9.5-2.5.5-4.8ZM10 15.5v-6.6l5.5 3.3L10 15.5Z" />
    </svg>
  );
}
