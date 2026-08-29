"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Pagination,
  SearchResultCard,
} from "@/components/catalog/catalog-cards";
import { SiteHeader } from "@/components/layout/site-header";
import {
  catalogAnime,
  countByType,
  filterGenres,
  filterSeasons,
  filterStudios,
  searchCatalog,
  type AnimeType,
} from "@/data/catalog";

const PAGE_SIZE = 12;

type ResultTab = "all" | "anime" | "episodes" | "movies" | "characters";

export function SearchPage({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [draft, setDraft] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState<"All" | AnimeType>("All");
  const [genres, setGenres] = useState<string[]>([]);
  const [season, setSeason] = useState("All Seasons");
  const [tab, setTab] = useState<ResultTab>("all");
  const [sort, setSort] = useState("relevant");
  const [page, setPage] = useState(1);
  const [openSections, setOpenSections] = useState({
    type: true,
    genre: true,
    season: true,
    studio: true,
  });

  useEffect(() => {
    setQuery(initialQuery);
    setDraft(initialQuery);
    setPage(1);
  }, [initialQuery]);

  const matched = useMemo(() => searchCatalog(query), [query]);

  const filtered = useMemo(() => {
    let items = matched;
    if (typeFilter !== "All") {
      items = items.filter((item) => item.type === typeFilter);
    }
    if (genres.length > 0) {
      items = items.filter((item) => genres.every((g) => item.genres.includes(g)));
    }
    if (season !== "All Seasons") {
      items = items.filter((item) => item.season === season);
    }
    if (tab === "movies") items = items.filter((item) => item.type === "Movie");
    if (tab === "anime") items = items.filter((item) => item.type !== "Movie");

    const sorted = [...items];
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "newest") sorted.sort((a, b) => b.year - a.year);
    if (sort === "title") sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [matched, typeFilter, genres, season, tab, sort]);

  const typeCounts = countByType(matched);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const displayTotal = query.trim() ? Math.max(filtered.length * 5 + 4, filtered.length) : catalogAnime.length;

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    const next = draft.trim();
    setQuery(next);
    setPage(1);
    router.push(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  }

  function clearFilters() {
    setTypeFilter("All");
    setGenres([]);
    setSeason("All Seasons");
    setPage(1);
  }

  function toggleGenre(genre: string) {
    setGenres((current) =>
      current.includes(genre) ? current.filter((g) => g !== genre) : [...current, genre],
    );
    setPage(1);
  }

  return (
    <div className="min-h-dvh bg-[#f4f6fb] text-slate-900 dark:bg-[#0b0f1a] dark:text-white">
      <SiteHeader />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Search Results</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Found{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {query.trim() ? displayTotal : catalogAnime.length}
            </span>{" "}
            results
            {query.trim() ? (
              <>
                {" "}
                for{" "}
                <span className="font-semibold text-violet-600 dark:text-violet-300">
                  &apos;{query}&apos;
                </span>
              </>
            ) : null}
          </p>

          <form onSubmit={submitSearch} className="relative mt-5 max-w-3xl">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              <SearchIcon />
            </span>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Search anime..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pr-12 pl-11 text-sm text-slate-800 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/15 dark:border-white/10 dark:bg-[#151821] dark:text-white"
            />
            {draft ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setDraft("");
                  setQuery("");
                  setPage(1);
                  router.push("/search");
                }}
                className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white"
              >
                ×
              </button>
            ) : null}
          </form>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-[260px]">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-white/8 dark:bg-[#12161f]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold">Filters</h2>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-medium text-violet-600 transition hover:text-violet-500 dark:text-violet-300"
                >
                  Clear All
                </button>
              </div>

              <FilterSection
                title="Type"
                open={openSections.type}
                onToggle={() =>
                  setOpenSections((s) => ({ ...s, type: !s.type }))
                }
              >
                {(
                  [
                    ["All", typeCounts.all],
                    ["TV Series", typeCounts.tv],
                    ["Movie", typeCounts.movie],
                    ["OVA", typeCounts.ova],
                    ["Special", typeCounts.special],
                  ] as const
                ).map(([label, count]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setTypeFilter(label === "All" ? "All" : label);
                      setPage(1);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                      typeFilter === label || (label === "All" && typeFilter === "All")
                        ? "bg-violet-500/15 font-semibold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                    }`}
                  >
                    <span>
                      {label === "Movie" ? "Movies" : label === "Special" ? "Specials" : label}
                    </span>
                    <span className="text-xs text-slate-400">({count})</span>
                  </button>
                ))}
              </FilterSection>

              <FilterSection
                title="Genre"
                open={openSections.genre}
                onToggle={() =>
                  setOpenSections((s) => ({ ...s, genre: !s.genre }))
                }
              >
                {filterGenres.slice(0, 5).map((genre) => (
                  <label
                    key={genre}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                  >
                    <input
                      type="checkbox"
                      checked={genres.includes(genre)}
                      onChange={() => toggleGenre(genre)}
                      className="h-3.5 w-3.5 rounded border-slate-300 text-violet-500 focus:ring-violet-500"
                    />
                    {genre}
                  </label>
                ))}
                <button type="button" className="mt-1 px-2 text-xs font-semibold text-violet-600 dark:text-violet-300">
                  + More
                </button>
              </FilterSection>

              <FilterSection
                title="Season"
                open={openSections.season}
                onToggle={() =>
                  setOpenSections((s) => ({ ...s, season: !s.season }))
                }
              >
                {filterSeasons.slice(0, 5).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSeason(item);
                      setPage(1);
                    }}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                      season === item
                        ? "bg-violet-500/15 font-semibold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <button type="button" className="mt-1 px-2 text-xs font-semibold text-violet-600 dark:text-violet-300">
                  + More
                </button>
              </FilterSection>

              <FilterSection
                title="Studio"
                open={openSections.studio}
                onToggle={() =>
                  setOpenSections((s) => ({ ...s, studio: !s.studio }))
                }
              >
                {filterStudios.slice(0, 3).map((studio) => (
                  <div
                    key={studio}
                    className="rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300"
                  >
                    {studio}
                  </div>
                ))}
                <button type="button" className="mt-1 px-2 text-xs font-semibold text-violet-600 dark:text-violet-300">
                  + More
                </button>
              </FilterSection>
            </div>
          </aside>

          <section className="min-w-0 flex-1">
            <div className="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between dark:border-white/8">
              <div className="flex gap-1 overflow-x-auto scrollbar-none">
                {(
                  [
                    ["all", `All Results (${displayTotal})`],
                    ["anime", `Anime (${Math.max(typeCounts.tv + typeCounts.ova, filtered.length)})`],
                    ["episodes", "Episodes (267)"],
                    ["movies", `Movies (${typeCounts.movie})`],
                    ["characters", "Characters (18)"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setTab(id);
                      setPage(1);
                    }}
                    className={`relative shrink-0 px-3 py-2 text-sm font-semibold transition ${
                      tab === id
                        ? "text-violet-600 dark:text-violet-300"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {label}
                    {tab === id ? (
                      <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-violet-500" />
                    ) : null}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                Sort by:
                <select
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value);
                    setPage(1);
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 outline-none dark:border-white/10 dark:bg-[#151821] dark:text-slate-200"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="title">Title A–Z</option>
                </select>
              </label>
            </div>

            {pageItems.length === 0 ? (
              <p className="py-16 text-center text-sm text-slate-500">
                No results found. Try a different keyword or clear filters.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {pageItems.map((item) => (
                  <SearchResultCard key={item.id} item={item} />
                ))}
              </div>
            )}

            <div className="mt-8">
              <Pagination
                page={Math.min(page, totalPages)}
                totalPages={Math.max(totalPages, 9)}
                onChange={setPage}
              />
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 sm:flex-row sm:items-center dark:border-white/8 dark:bg-[#12161f]">
              <p className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="mt-0.5 text-violet-500">★</span>
                Can&apos;t find what you&apos;re looking for? Try different keywords or check our
                Browse page.
              </p>
              <Link
                href="/browse"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                Browse All Anime
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function FilterSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-slate-200 py-3 first:border-t-0 first:pt-0 dark:border-white/8">
      <button
        type="button"
        onClick={onToggle}
        className="mb-2 flex w-full items-center justify-between text-sm font-bold text-slate-800 dark:text-white"
      >
        {title}
        <span className={`text-slate-400 transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open ? <div className="space-y-0.5">{children}</div> : null}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
