import type { Metadata } from "next";
import { CollectionPage } from "@/components/catalog/collection-page";

export const metadata: Metadata = {
  title: "AniStream — Anime Movies",
  description: "Browse anime movies on AniStream.",
};

export default function MoviesRoute() {
  return (
    <CollectionPage
      title="Anime Movies"
      description="Feature films and theatrical anime releases."
      filter={{ type: "Movie", sort: "rating" }}
    />
  );
}
