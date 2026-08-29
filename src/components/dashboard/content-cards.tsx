import { Poster } from "@/components/dashboard/poster";
import type {
  AnimeCardItem,
  ContinueItem,
  LatestEpisode,
  RecentUpdate,
} from "@/data/dashboard";

function StarIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
      <path d="M10 1.8 12.4 7l5.6.8-4 3.9.9 5.6L10 14.8 4.1 17.3l.9-5.6-4-3.9L6.6 7 10 1.8Z" />
    </svg>
  );
}

function PlayTriangle({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

/** Compact horizontal card — Continue Watching (portrait thumb). */
export function ContinueCard({ item }: { item: ContinueItem }) {
  return (
    <article className="dash-card flex h-[108px] w-[250px] shrink-0 gap-3 rounded-2xl p-2.5 sm:w-[280px]">
      <Poster
        title={item.title}
        orientation="portrait"
        compact
        className="h-[84px] w-[72px] shrink-0 rounded-xl"
        sizes="72px"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
        <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
        <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p>
        <div className="mt-2.5 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-violet-500"
              style={{ width: `${item.progress}%` }}
            />
          </div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {item.progress}%
          </span>
          <button
            type="button"
            aria-label={`Continue ${item.title}`}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500 text-white shadow-md shadow-violet-500/30 transition hover:brightness-110"
          >
            <PlayTriangle />
          </button>
        </div>
      </div>
    </article>
  );
}

/** Vertical poster card — Trending / Movies (portrait image, bottom-aligned meta). */
export function AnimeCard({ item }: { item: AnimeCardItem }) {
  return (
    <article className="flex w-[148px] shrink-0 flex-col sm:w-[168px]">
      <div className="relative w-full shrink-0 overflow-hidden rounded-xl">
        <Poster
          title={item.title}
          orientation="portrait"
          className="aspect-[2/3] w-full"
          sizes="(max-width: 640px) 148px, 168px"
        />
        <span className="absolute top-2 left-2 rounded-md bg-violet-600 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
          {item.episodeBadge}
        </span>
      </div>

      <div className="mt-2.5 flex h-[84px] flex-col sm:h-[88px]">
        <h3 className="line-clamp-2 text-sm leading-snug font-bold text-slate-900 dark:text-white">
          {item.title}
        </h3>
        <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p>
        <div className="mt-auto flex items-center gap-1.5 text-xs">
          <span className="inline-flex items-center gap-1 font-semibold text-amber-400">
            <StarIcon />
            {item.rating.toFixed(1)}
          </span>
          <span className="text-slate-400 dark:text-slate-500">{item.year}</span>
        </div>
      </div>
    </article>
  );
}

/** Wide thumbnail card — Latest Episodes (landscape image). */
export function LatestEpisodeCard({ item }: { item: LatestEpisode }) {
  return (
    <article className="flex w-[220px] shrink-0 flex-col sm:w-[240px]">
      <div className="group relative w-full shrink-0 overflow-hidden rounded-xl">
        <Poster
          title={item.title}
          orientation="landscape"
          className="aspect-video w-full"
          sizes="(max-width: 640px) 220px, 240px"
        />
        <span className="absolute top-2 left-2 rounded-md bg-violet-600 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
          {item.badge ?? "SUB"}
        </span>
        <button
          type="button"
          aria-label={`Play ${item.title}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-slate-900 shadow-lg transition group-hover:scale-105 group-hover:bg-white">
            <PlayTriangle className="h-4 w-4" />
          </span>
        </button>
      </div>
      <div className="mt-2.5 flex h-[52px] items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
          <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
            {item.episode}
            <span className="mx-1.5 text-slate-300 dark:text-slate-600">•</span>
            {item.timeAgo}
          </p>
        </div>
        <button
          type="button"
          aria-label={`More options for ${item.title}`}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white"
        >
          ⋮
        </button>
      </div>
    </article>
  );
}

/** Wide thumbnail card — Ongoing (landscape image). */
export function RecentUpdateCard({ item }: { item: RecentUpdate }) {
  return (
    <article className="flex w-[220px] shrink-0 flex-col sm:w-[240px]">
      <div className="relative w-full shrink-0 overflow-hidden rounded-xl">
        <Poster
          title={item.title}
          orientation="landscape"
          className="aspect-video w-full"
          sizes="(max-width: 640px) 220px, 240px"
        />
        <span className="absolute top-2 left-2 rounded-md bg-violet-600 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
          {item.badge ?? "SUB"}
        </span>
      </div>
      <div className="mt-2.5 flex h-[52px] items-end justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
          <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{item.episode}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 pb-0.5 text-xs font-semibold text-amber-400">
          <StarIcon />
          {item.rating.toFixed(1)}
        </span>
      </div>
    </article>
  );
}
