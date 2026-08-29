import type { Metadata } from "next";
import { CollectionPage } from "@/components/catalog/collection-page";

export const metadata: Metadata = {
  title: "AniStream — Latest Episodes",
  description: "Catch the newest anime episodes on AniStream.",
};

export default function LatestRoute() {
  return (
    <CollectionPage
      title="Latest Episodes"
      description="Fresh episodes and newly updated series."
      filter={{ status: "Airing", sort: "newest" }}
    />
  );
}
