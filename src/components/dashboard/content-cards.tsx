import type { ReactNode } from "react";
import { Poster } from "@/components/dashboard/poster";
import type {
  AnimeCardItem,
  ContinueItem,
  LatestEpisode,
  RecentUpdate,
} from "@/data/dashboard";

type StreamCardProps = {
  title: string;
  subtitle: string;
  accent: string;
  playLabel: string;
  footer: ReactNode;
};

function StreamCard({ title, subtitle, accent, playLabel, footer }: StreamCardProps) {
  return (
    <article className="dash-card flex w-[250px] shrink-0 gap-3 rounded-2xl p-2.5 sm:w-[280px]">
      <Poster
        title={title}
        accent={accent}
        compact
        className="h-[84px] w-[72px] shrink-0 rounded-xl"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
        <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        <div className="mt-2.5 flex items-center gap-2">
          {footer}
          <button
            type="button"
            aria-label={playLabel}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500 text-white shadow-md shadow-violet-500/30"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export function ContinueCard({ item }: { item: ContinueItem }) {
  return (
    <StreamCard
      title={item.title}
      subtitle={item.subtitle}
      accent={item.accent}
      playLabel={`Continue ${item.title}`}
      footer={
        <>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              style={{ width: `${item.progress}%` }}
            />
          </div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {item.progress}%
          </span>
        </>
      }
    />
  );
}

export function AnimeCard({ item }: { item: AnimeCardItem }) {
  return (
    <StreamCard
      title={item.title}
      subtitle={item.genres.join(" • ")}
      accent={item.accent}
      playLabel={`Play ${item.title}`}
      footer={
        <>
          <div className="flex flex-1 items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-[11px] ${
                  i < Math.round(item.rating / 2) ? "opacity-100" : "opacity-30"
                }`}
              >
                ★
              </span>
            ))}
            <span className="ml-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {item.rating.toFixed(1)}
            </span>
          </div>
        </>
      }
    />
  );
}

export function LatestEpisodeCard({ item }: { item: LatestEpisode }) {
  return (
    <StreamCard
      title={item.title}
      subtitle={item.episode}
      accent={item.accent}
      playLabel={`Play ${item.title}`}
      footer={
        <span className="flex-1 truncate text-[11px] font-semibold text-violet-600 dark:text-violet-300">
          {item.badge ?? "Episode"}
        </span>
      }
    />
  );
}

export function RecentUpdateCard({ item }: { item: RecentUpdate }) {
  return (
    <StreamCard
      title={item.title}
      subtitle={item.episode}
      accent={item.accent}
      playLabel={`Play ${item.title}`}
      footer={
        <span className="flex-1 truncate text-[11px] font-medium text-slate-400 dark:text-slate-500">
          {item.timeAgo}
        </span>
      }
    />
  );
}
