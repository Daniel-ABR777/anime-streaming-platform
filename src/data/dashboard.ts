export type Genre = string;

export type FeaturedSlide = {
  id: string;
  title: string;
  badge: string;
  meta: string;
  episodeLabel: string;
  description: string;
};

export type ContinueItem = {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  accent: string;
};

export type AnimeCardItem = {
  id: string;
  title: string;
  rating: number;
  genres: Genre[];
  accent: string;
};

export type LatestEpisode = {
  id: string;
  title: string;
  episode: string;
  badge?: string;
  accent: string;
};

export type RecentUpdate = {
  id: string;
  title: string;
  episode: string;
  timeAgo: string;
  accent: string;
};

/** Only one featured slide is available (dashboard-dark / dashboard-light). */
export const featuredSlides: FeaturedSlide[] = [
  {
    id: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    badge: "Featured",
    meta: "TV • 2024 • Action, Fantasy",
    episodeLabel: "Episode 10",
    description:
      "Tanjiro and the Hashira face the looming threat of a new demon uprising. As bonds are tested and swords drawn, the battle for the future of the Demon Slayer Corps begins.",
  },
];

export const continueWatching: ContinueItem[] = [
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    subtitle: "S1 • E8 • The Dungeon Raid",
    progress: 65,
    accent: "from-indigo-950 via-violet-800 to-fuchsia-600",
  },
  {
    id: "jjk",
    title: "Jujutsu Kaisen",
    subtitle: "S2 • E17 • Right and Wrong",
    progress: 40,
    accent: "from-zinc-900 via-rose-900 to-orange-600",
  },
  {
    id: "aot",
    title: "Attack on Titan Final Season",
    subtitle: "S4 • E25 • The Final Chapter",
    progress: 80,
    accent: "from-stone-900 via-amber-900 to-red-700",
  },
  {
    id: "spy-family",
    title: "Spy x Family",
    subtitle: "S2 • E9 • Mission: Friendship",
    progress: 30,
    accent: "from-pink-200 via-rose-400 to-pink-600",
  },
];

export const trendingAnime: AnimeCardItem[] = [
  {
    id: "frieren",
    title: "Frieren: Beyond Journey's End",
    rating: 9.4,
    genres: ["Fantasy", "Slice of Life"],
    accent: "from-emerald-950 via-teal-800 to-amber-500",
  },
  {
    id: "kaiju",
    title: "Kaiju No. 8",
    rating: 8.7,
    genres: ["Action", "Sci-Fi"],
    accent: "from-slate-900 via-cyan-800 to-lime-500",
  },
  {
    id: "wind-breaker",
    title: "Wind Breaker",
    rating: 8.5,
    genres: ["Action", "Drama"],
    accent: "from-sky-950 via-blue-700 to-cyan-400",
  },
  {
    id: "slime",
    title: "That Time I Got Reincarnated as a Slime",
    rating: 8.3,
    genres: ["Fantasy", "Adventure"],
    accent: "from-blue-950 via-indigo-700 to-sky-300",
  },
];

export const popularAnime: AnimeCardItem[] = [
  {
    id: "naruto",
    title: "Naruto: Shippuden",
    rating: 9.2,
    genres: ["Action", "Adventure"],
    accent: "from-orange-950 via-amber-700 to-yellow-400",
  },
  {
    id: "one-piece",
    title: "One Piece",
    rating: 9.0,
    genres: ["Adventure", "Fantasy"],
    accent: "from-blue-950 via-sky-700 to-amber-400",
  },
  {
    id: "death-note",
    title: "Death Note",
    rating: 8.9,
    genres: ["Psychological", "Thriller"],
    accent: "from-neutral-950 via-zinc-800 to-red-700",
  },
  {
    id: "mha",
    title: "My Hero Academia",
    rating: 8.6,
    genres: ["Action", "School"],
    accent: "from-green-950 via-emerald-700 to-lime-400",
  },
];

export const latestEpisodes: LatestEpisode[] = [
  {
    id: "blue-lock",
    title: "Blue Lock",
    episode: "S2 • E5",
    badge: "New Episode",
    accent: "from-sky-950 via-blue-800 to-cyan-500",
  },
  {
    id: "oshi",
    title: "Oshi no Ko",
    episode: "S2 • E4",
    badge: "New Episode",
    accent: "from-fuchsia-950 via-pink-700 to-rose-400",
  },
  {
    id: "apothecary",
    title: "The Apothecary Diaries",
    episode: "S2 • E6",
    badge: "New Episode",
    accent: "from-lime-950 via-green-800 to-emerald-400",
  },
];

export const recentlyUpdated: RecentUpdate[] = [
  {
    id: "ds-upd",
    title: "Demon Slayer",
    episode: "S4 • E10",
    timeAgo: "2h ago",
    accent: "from-violet-950 via-purple-800 to-fuchsia-500",
  },
  {
    id: "solo-upd",
    title: "Solo Leveling",
    episode: "S2 • E8",
    timeAgo: "5h ago",
    accent: "from-indigo-950 via-violet-800 to-blue-500",
  },
  {
    id: "wb-upd",
    title: "Wind Breaker",
    episode: "S1 • E12",
    timeAgo: "1d ago",
    accent: "from-sky-950 via-blue-700 to-cyan-400",
  },
];
