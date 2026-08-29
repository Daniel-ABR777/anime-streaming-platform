import type { Metadata } from "next";
import { Suspense } from "react";
import { BrowsePage } from "@/components/browse/browse-page";

export const metadata: Metadata = {
  title: "AniStream — Browse Anime",
  description: "Browse and filter anime from the AniStream catalog.",
};

export default function BrowseRoute() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh bg-[#0b0f1a] text-white">
          <div className="mx-auto max-w-[1440px] px-4 py-10 text-sm text-slate-400">Loading browse…</div>
        </div>
      }
    >
      <BrowsePage />
    </Suspense>
  );
}
