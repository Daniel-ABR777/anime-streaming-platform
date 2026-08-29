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

      <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <HeroBanner />

        <SectionRow
          id="continue"
          title="Continue Watching"
          icon={<PlaySectionIcon />}
          viewAllHref="/profile?tab=continue"
        >
          {continueWatching.map((item) => (
            <ContinueCard key={item.id} item={item} />
          ))}
        </SectionRow>

        <SectionRow
          id="trending"
          title="Trending Now"
          icon={<FlameIcon />}
          viewAllHref="/trending"
        >
          {trendingAnime.map((item) => (
            <AnimeCard key={item.id} item={item} />
          ))}
        </SectionRow>

        <SectionRow
          id="latest"
          title="Latest Episodes"
          icon={<BoltIcon />}
          viewAllHref="/latest"
        >
          {latestEpisodes.map((item) => (
            <LatestEpisodeCard key={item.id} item={item} />
          ))}
        </SectionRow>

        <SectionRow
          id="browse"
          title="Ongoing Anime"
          icon={<TvIcon />}
          viewAllHref="/browse"
        >
          {recentlyUpdated.map((item) => (
            <RecentUpdateCard key={item.id} item={item} />
          ))}
        </SectionRow>

        <SectionRow
          id="movies"
          title="Anime Movies"
          icon={<ClapperIcon />}
          viewAllHref="/movies"
        >
          {popularAnime.map((item) => (
            <AnimeCard key={item.id} item={item} />
          ))}
        </SectionRow>
      </main>
    </div>
  );
}

function PlaySectionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-violet-500" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-orange-500" fill="currentColor" aria-hidden="true">
      <path d="M12 2c1.5 3.2-.2 5.2-1.8 6.8C8.5 10.5 7 12.2 7 15a5 5 0 0 0 10 0c0-2.6-1-4.4-2.4-6C13.2 7.4 12.4 5.8 12 2Z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-400" fill="currentColor" aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" />
    </svg>
  );
}

function TvIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-400" fill="none" aria-hidden="true">
      <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 20h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ClapperIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-fuchsia-400" fill="none" aria-hidden="true">
      <path
        d="M4 9.5h16V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m4 9.5 3.2-5.2 3.3 2L14 3.3l3.2 2L20.5 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
