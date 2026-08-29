"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  BrowseAnimeCard,
  Pagination,
} from "@/components/catalog/catalog-cards";
import { SiteHeader } from "@/components/layout/site-header";
import { Poster } from "@/components/dashboard/poster";
import {
  catalogAnime,
  countByType,
  filterGenres,
  filterStudios,
  type AnimeStatus,
  type AnimeType,
  type CatalogItem,
} from "@/data/catalog";

const PAGE_SIZE = 12;

type TypePill = "All" | AnimeType;

const typePills: { id: TypePill; label: string; icon: string }[] = [
  { id: "All", label: "All", icon: "▦" },
  { id: "TV Series", label: "TV Series", icon: "▣" },
  { id: "Movie", label: "Movies", icon: "▶" },
  { id: "OVA", label: "OVA", icon: "◎" },
  { id: "ONA", label: "ONA", icon: "◯" },
  { id: "Special", label: "Specials", icon: "★" },
];

export function BrowsePage() {
  const searchParams = useSearchParams();
  const [typePill, setTypePill] = useState<TypePill>("All");
  const [typeChecks, setTypeChecks] = useState<AnimeType[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [season, setSeason] = useState("All Seasons");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [studio, setStudio] = useState("All Studios");
  const [status, setStatus] = useState<"All Status" | AnimeStatus>("All Status");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const type = searchParams.get("type");
    const genre = searchParams.get("genre");
    const seasonParam = searchParams.get("season");

    if (type === "Movie" || type === "TV Series" || type === "OVA" || type === "ONA" || type === "Special") {
      setTypePill(type);
    }
    if (genre) setGenres([genre]);
    if (seasonParam) setSeason(seasonParam);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let items: CatalogItem[] = [...catalogAnime];

    if (typePill !== "All") {
      items = items.filter((item) => item.type === typePill);
    }
    if (typeChecks.length > 0) {
      items = items.filter((item) => typeChecks.includes(item.type));
    }
    if (genres.length > 0) {
      items = items.filter((item) => genres.some((g) => item.genres.includes(g)));
    }
    if (season !== "All Seasons") {
      items = items.filter((item) => item.season === season);
    }
    if (studio !== "All Studios") {
      items = items.filter((item) => item.studio === studio);
    }
    if (status !== "All Status") {
      items = items.filter((item) => item.status === status);
    }
    if (yearFrom) {
      const y = Number(yearFrom);
      if (!Number.isNaN(y)) items = items.filter((item) => item.year >= y);
    }
    if (yearTo) {
      const y = Number(yearTo);
      if (!Number.isNaN(y)) items = items.filter((item) => item.year <= y);
    }

    if (sort === "newest") items.sort((a, b) => b.year - a.year);
    if (sort === "rating") items.sort((a, b) => b.rating - a.rating);
    if (sort === "title") items.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "popular") items.sort((a, b) => b.episodes - a.episodes);

    return items;
  }, [typePill, typeChecks, genres, season, studio, status, yearFrom, yearTo, sort]);

  const counts = countByType(catalogAnime);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const resultLabel = (Math.max(filtered.length, 1) * 52).toLocaleString();

  function clearFilters() {
    setTypePill("All");
    setTypeChecks([]);
    setGenres([]);
    setSeason("All Seasons");
    setYearFrom("");
    setYearTo("");
    setStudio("All Studios");
    setStatus("All Status");
    setPage(1);
  }

  function toggleTypeCheck(type: AnimeType) {
    setTypeChecks((current) =>
      current.includes(type) ? current.filter((t) => t !== type) : [...current, type],
    );
    setPage(1);
  }

  function toggleGenre(genre: string) {
    setGenres((current) =>
      current.includes(genre) ? current.filter((g) => g !== genre) : [...current, genre],
    );
    setPage(1);
  }

  function applyFilters() {
    setPage(1);
  }

  return (
    <div className="min-h-dvh bg-[#f4f6fb] text-slate-900 dark:bg-[#0b0f1a] dark:text-white">
      <SiteHeader />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Browse Anime</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Find your next favorite anime from our huge collection.
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {typePills.map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => {
                setTypePill(pill.id);
                setPage(1);
              }}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                typePill === pill.id
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/25"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-[#151821] dark:text-slate-300 dark:hover:border-violet-500/40 dark:hover:text-white"
              }`}
            >
              <span aria-hidden="true">{pill.icon}</span>
              {pill.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-[260px]">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-white/8 dark:bg-[#12161f]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold">Filters</h2>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-medium text-violet-600 dark:text-violet-300"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-bold">Type</h3>
                  {(
                    [
                      ["TV Series", counts.tv],
                      ["Movie", counts.movie],
                      ["OVA", counts.ova],
                      ["Special", counts.special],
                    ] as const
                  ).map(([label, count]) => (
                    <label
                      key={label}
                      className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-1 py-1.5 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={typeChecks.includes(label)}
                          onChange={() => toggleTypeCheck(label)}
                          className="h-3.5 w-3.5 rounded border-slate-300 text-violet-500"
                        />
                        {label === "Movie" ? "Movies" : label === "Special" ? "Specials" : label}
                      </span>
                      <span className="text-xs text-slate-400">{count}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold">Genre</h3>
                  {filterGenres.slice(0, 6).map((genre) => {
                    const count = catalogAnime.filter((i) => i.genres.includes(genre)).length;
                    return (
                      <label
                        key={genre}
                        className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-1 py-1.5 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <span className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={genres.includes(genre)}
                            onChange={() => toggleGenre(genre)}
                            className="h-3.5 w-3.5 rounded border-slate-300 text-violet-500"
                          />
                          {genre}
                        </span>
                        <span className="text-xs text-slate-400">{count}</span>
                      </label>
                    );
                  })}
                  <button type="button" className="mt-1 text-xs font-semibold text-violet-600 dark:text-violet-300">
                    + View More
                  </button>
                </div>

                <label className="block space-y-1.5 text-sm">
                  <span className="font-bold">Season</span>
                  <select
                    value={season}
                    onChange={(event) => {
                      setSeason(event.target.value);
                      setPage(1);
                    }}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-700 outline-none dark:border-white/10 dark:bg-[#0f1420] dark:text-slate-200"
                  >
                    <option>All Seasons</option>
                    <option>Spring 2024</option>
                    <option>Winter 2024</option>
                    <option>Fall 2023</option>
                    <option>Summer 2023</option>
                    <option>Fall 2022</option>
                  </select>
                </label>

                <div>
                  <span className="mb-1.5 block text-sm font-bold">Year</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="From"
                      value={yearFrom}
                      onChange={(event) => setYearFrom(event.target.value)}
                      className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-white/10 dark:bg-[#0f1420]"
                    />
                    <input
                      type="number"
                      placeholder="To"
                      value={yearTo}
                      onChange={(event) => setYearTo(event.target.value)}
                      className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-white/10 dark:bg-[#0f1420]"
                    />
                  </div>
                </div>

                <label className="block space-y-1.5 text-sm">
                  <span className="font-bold">Studio</span>
                  <select
                    value={studio}
                    onChange={(event) => {
                      setStudio(event.target.value);
                      setPage(1);
                    }}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-700 outline-none dark:border-white/10 dark:bg-[#0f1420] dark:text-slate-200"
                  >
                    <option>All Studios</option>
                    {filterStudios.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1.5 text-sm">
                  <span className="font-bold">Status</span>
                  <select
                    value={status}
                    onChange={(event) => {
                      setStatus(event.target.value as typeof status);
                      setPage(1);
                    }}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-700 outline-none dark:border-white/10 dark:bg-[#0f1420] dark:text-slate-200"
                  >
                    <option>All Status</option>
                    <option>Finished</option>
                    <option>Airing</option>
                    <option>Upcoming</option>
                  </select>
                </label>

                <button
                  type="button"
                  onClick={applyFilters}
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-violet-500 text-sm font-bold text-white transition hover:brightness-110"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          <section className="min-w-0 flex-1">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                {resultLabel} Results
              </p>
              <div className="flex items-center gap-2">
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
                    <option value="newest">Newest Added</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popular">Most Popular</option>
                    <option value="title">Title A–Z</option>
                  </select>
                </label>
                <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-white/10">
                  <button
                    type="button"
                    aria-label="Grid view"
                    onClick={() => setView("grid")}
                    className={`flex h-8 w-8 items-center justify-center rounded-md text-sm ${
                      view === "grid"
                        ? "bg-violet-500 text-white"
                        : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
                    }`}
                  >
                    ▦
                  </button>
                  <button
                    type="button"
                    aria-label="List view"
                    onClick={() => setView("list")}
                    className={`flex h-8 w-8 items-center justify-center rounded-md text-sm ${
                      view === "list"
                        ? "bg-violet-500 text-white"
                        : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
                    }`}
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>

            {pageItems.length === 0 ? (
              <p className="py-16 text-center text-sm text-slate-500">
                No anime match these filters.
              </p>
            ) : view === "grid" ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                {pageItems.map((item) => (
                  <BrowseAnimeCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {pageItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-3 dark:border-white/8 dark:bg-[#12161f]"
                  >
                    <Poster
                      title={item.title}
                      orientation="portrait"
                      className="h-24 w-[68px] shrink-0 rounded-xl"
                      sizes="68px"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold">{item.title}</h3>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {item.year} • {item.type}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-amber-400">
                        ★ {item.rating.toFixed(1)}
                      </p>
                    </div>
                    <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-[10px] font-bold text-violet-600 dark:text-violet-300">
                      EPS {item.episodes}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8">
              <Pagination
                page={Math.min(page, totalPages)}
                totalPages={Math.max(totalPages, 42)}
                onChange={setPage}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
