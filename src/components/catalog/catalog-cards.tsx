import { Poster } from "@/components/dashboard/poster";
import type { CatalogItem } from "@/data/catalog";

function StarIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
      <path d="M10 1.8 12.4 7l5.6.8-4 3.9.9 5.6L10 14.8 4.1 17.3l.9-5.6-4-3.9L6.6 7 10 1.8Z" />
    </svg>
  );
}

function BookmarkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M7 4.5h10A1.5 1.5 0 0 1 18.5 6v13.2L12 15.5l-6.5 3.7V6A1.5 1.5 0 0 1 7 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Search results card — type badge + year/status + bookmark. */
export function SearchResultCard({ item }: { item: CatalogItem }) {
  return (
    <article className="flex flex-col">
      <div className="relative overflow-hidden rounded-xl">
        <Poster
          title={item.title}
          orientation="portrait"
          className="aspect-[2/3] w-full"
          sizes="(max-width: 768px) 45vw, 160px"
        />
        <span className="absolute top-2 left-2 rounded-md bg-violet-600 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
          {item.type}
        </span>
      </div>
      <h3 className="mt-2.5 line-clamp-2 text-sm font-bold text-slate-900 dark:text-white">
        {item.title}
      </h3>
      <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
        {item.year} • {item.status}
      </p>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
          <StarIcon />
          {item.rating.toFixed(1)}
        </span>
        <button
          type="button"
          aria-label={`Save ${item.title}`}
          className="text-slate-400 transition hover:text-violet-500 dark:hover:text-violet-300"
        >
          <BookmarkIcon />
        </button>
      </div>
    </article>
  );
}

/** Browse grid card — New/Hot badge + EPS pill. */
export function BrowseAnimeCard({ item }: { item: CatalogItem }) {
  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden rounded-xl">
        <Poster
          title={item.title}
          orientation="portrait"
          className="aspect-[2/3] w-full"
          sizes="(max-width: 768px) 45vw, 160px"
        />
        {item.badge ? (
          <span
            className={`absolute top-2 left-2 rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white ${
              item.badge === "New" ? "bg-emerald-500" : "bg-orange-500"
            }`}
          >
            {item.badge}
          </span>
        ) : null}
        <button
          type="button"
          aria-label={`Bookmark ${item.title}`}
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/35 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
        >
          <BookmarkIcon />
        </button>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
        </div>
      </div>
      <h3 className="mt-2.5 line-clamp-2 text-sm font-bold text-slate-900 dark:text-white">
        {item.title}
      </h3>
      <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
        {item.year} • {item.type}
      </p>
      <div className="mt-1.5 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
          <StarIcon />
          {item.rating.toFixed(1)}
        </span>
        <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-violet-600 dark:text-violet-300">
          EPS {item.episodes}
        </span>
      </div>
    </article>
  );
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  const pages = buildPageList(page, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <PageButton
        label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        ‹
      </PageButton>
      {pages.map((item, idx) =>
        item === "…" ? (
          <span key={`e-${idx}`} className="px-1 text-sm text-slate-400">
            …
          </span>
        ) : (
          <PageButton
            key={item}
            label={`Page ${item}`}
            active={item === page}
            onClick={() => onChange(item)}
          >
            {item}
          </PageButton>
        ),
      )}
      <PageButton
        label="Next page"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        ›
      </PageButton>
    </nav>
  );
}

function PageButton({
  children,
  label,
  onClick,
  active = false,
  disabled = false,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "bg-violet-500 text-white"
          : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-[#151821] dark:text-slate-300 dark:hover:border-violet-500/40 dark:hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function buildPageList(page: number, total: number): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (page >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", page - 1, page, page + 1, "…", total];
}
