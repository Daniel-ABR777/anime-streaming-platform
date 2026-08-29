import type { Metadata } from "next";
import { CollectionPage } from "@/components/catalog/collection-page";

export const metadata: Metadata = {
  title: "AniStream — Trending Now",
  description: "See what’s trending across AniStream right now.",
};

export default function TrendingRoute() {
  return (
    <CollectionPage
      title="Trending Now"
      description="The hottest anime climbing the charts right now."
      filter={{ sort: "rating" }}
    />
  );
}
