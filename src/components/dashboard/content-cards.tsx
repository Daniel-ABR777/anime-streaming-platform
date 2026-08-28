import { Poster } from "@/components/dashboard/poster";
import type {
  AnimeCardItem,
  ContinueItem,
  LatestEpisode,
  RecentUpdate,
} from "@/data/dashboard";

export function ContinueCard({ item }: { item: ContinueItem }) {
  return (
    <article className="dash-card flex w-[260px] shrink-0 gap-3 rounded-2xl p-2.5 sm:w-[280px]">
      <Poster
        title={item.title}
        accent={item.accent}
        compact
        className="h-[84px] w-[72px] shrink-0 rounded-xl"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
        <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
        <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p>
        <div className="mt-2.5 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              style={{ width: `${item.progress}%` }}
            />
          </div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {item.progress}%
          </span>
          <button
            type="button"
            aria-label={`Continue ${item.title}`}
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

export function AnimeCard({ item }: { item: AnimeCardItem }) {
  return (
    <article className="dash-card group w-[200px] shrink-0 overflow-hidden rounded-2xl sm:w-[220px]">
      <div className="relative">
        <Poster title={item.title} accent={item.accent} className="aspect-[3/4] w-full" />
        <button
          type="button"
          aria-label={`Play ${item.title}`}
          className="absolute right-2.5 bottom-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-violet-500 text-white opacity-95 shadow-lg shadow-violet-500/40 transition group-hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
          </svg>
        </button>
      </div>
      <div className="space-y-2 p-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold text-slate-900 dark:text-white">
          {item.title}
        </h3>
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < Math.round(item.rating / 2) ? "opacity-100" : "opacity-30"}>
              ★
            </span>
          ))}
          <span className="ml-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
            {item.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {item.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-white/8 dark:text-slate-300"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function LatestEpisodeCard({ item }: { item: LatestEpisode }) {
  return (
    <article className="dash-card flex w-[200px] shrink-0 gap-3 rounded-2xl p-2.5 sm:w-[220px]">
      <Poster
        title={item.title}
        accent={item.accent}
        compact
        className="h-16 w-16 shrink-0 rounded-xl"
      />
      <div className="min-w-0 flex-1 py-0.5">
        <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{item.episode}</p>
        {item.badge ? (
          <span className="mt-1.5 inline-block text-[11px] font-semibold text-violet-600 dark:text-violet-300">
            {item.badge}
          </span>
        ) : null}
      </div>
    </article>
  );
}

export function RecentUpdateCard({ item }: { item: RecentUpdate }) {
  return (
    <article className="dash-card flex w-[200px] shrink-0 gap-3 rounded-2xl p-2.5 sm:w-[220px]">
      <Poster
        title={item.title}
        accent={item.accent}
        compact
        className="h-16 w-16 shrink-0 rounded-xl"
      />
      <div className="min-w-0 flex-1 py-0.5">
        <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{item.episode}</p>
        <p className="mt-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
          {item.timeAgo}
        </p>
      </div>
    </article>
  );
}
