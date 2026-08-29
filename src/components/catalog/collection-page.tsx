"use client";

import { useMemo, useState } from "react";
import {
  BrowseAnimeCard,
  Pagination,
} from "@/components/catalog/catalog-cards";
import { SiteHeader } from "@/components/layout/site-header";
import {
  catalogAnime,
  type AnimeStatus,
  type AnimeType,
  type CatalogItem,
} from "@/data/catalog";

const PAGE_SIZE = 12;

export type CollectionFilter = {
  type?: AnimeType;
  status?: AnimeStatus;
  sort?: "rating" | "newest" | "title";
};

type CollectionPageProps = {
  title: string;
  description: string;
  filter?: CollectionFilter;
  items?: CatalogItem[];
};

export function CollectionPage({
  title,
  description,
  filter,
  items: providedItems,
}: CollectionPageProps) {
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let items = providedItems ? [...providedItems] : [...catalogAnime];

    if (filter?.type) {
      items = items.filter((item) => item.type === filter.type);
    }
    if (filter?.status) {
      items = items.filter((item) => item.status === filter.status);
    }

    const sort = filter?.sort ?? "newest";
    if (sort === "rating") items.sort((a, b) => b.rating - a.rating);
    if (sort === "newest") items.sort((a, b) => b.year - a.year || b.rating - a.rating);
    if (sort === "title") items.sort((a, b) => a.title.localeCompare(b.title));

    return items;
  }, [filter, providedItems]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="min-h-dvh bg-[#f4f6fb] text-slate-900 dark:bg-[#0b0f1a] dark:text-white">
      <SiteHeader />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
          <p className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">
            {filtered.length} title{filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        {pageItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {pageItems.map((item) => (
              <BrowseAnimeCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300/80 px-6 py-16 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
            No titles found in this collection yet.
          </div>
        )}

        {totalPages > 1 ? (
          <div className="mt-10 flex justify-center">
            <Pagination
              page={safePage}
              totalPages={totalPages}
              onChange={(next) => setPage(next)}
            />
          </div>
        ) : null}
      </main>
    </div>
  );
}
