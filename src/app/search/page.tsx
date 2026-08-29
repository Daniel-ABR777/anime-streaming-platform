import type { Metadata } from "next";
import { SearchPage } from "@/components/search/search-page";

export const metadata: Metadata = {
  title: "AniStream — Search Results",
  description: "Search anime, movies, and more on AniStream.",
};

type SearchParams = Promise<{ q?: string | string[] }>;

export default async function SearchRoute({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const raw = params.q;
  const query = Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? "");

  return <SearchPage initialQuery={query} />;
}
