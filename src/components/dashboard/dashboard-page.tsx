import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { HeroBanner } from "@/components/dashboard/hero-banner";
import { SectionRow } from "@/components/dashboard/section-row";
import {
  AnimeCard,
  ContinueCard,
  LatestEpisodeCard,
  RecentUpdateCard,
} from "@/components/dashboard/content-cards";
import {
  continueWatching,
  latestEpisodes,
  popularAnime,
  recentlyUpdated,
  trendingAnime,
} from "@/data/dashboard";

export function DashboardPage() {
  return (
    <div className="min-h-dvh bg-[#f4f6fb] text-slate-900 dark:bg-[#0b0f1a] dark:text-white">
      <DashboardHeader />

      <main className="mx-auto max-w-[1400px] space-y-7 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <HeroBanner />

        <SectionRow id="continue" title="Continue Watching">
          {continueWatching.map((item) => (
            <ContinueCard key={item.id} item={item} />
          ))}
        </SectionRow>

        <SectionRow id="trending" title="Trending Anime">
          {trendingAnime.map((item) => (
            <AnimeCard key={item.id} item={item} />
          ))}
        </SectionRow>

        <SectionRow id="popular" title="Popular Anime">
          {popularAnime.map((item) => (
            <AnimeCard key={item.id} item={item} />
          ))}
        </SectionRow>

        <div id="browse" className="grid scroll-mt-20 gap-7 lg:grid-cols-2 lg:gap-8">
          <SectionRow id="latest" title="Latest Episodes">
            {latestEpisodes.map((item) => (
              <LatestEpisodeCard key={item.id} item={item} />
            ))}
          </SectionRow>

          <SectionRow id="movies" title="Recently Updated">
            {recentlyUpdated.map((item) => (
              <RecentUpdateCard key={item.id} item={item} />
            ))}
          </SectionRow>
        </div>
      </main>
    </div>
  );
}
