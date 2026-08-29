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
  subtitle: string;
  rating: number;
  year: number;
  episodeBadge: string;
  genres: Genre[];
  accent: string;
};

export type LatestEpisode = {
  id: string;
  title: string;
  episode: string;
  timeAgo: string;
  badge?: string;
  accent: string;
};

export type RecentUpdate = {
  id: string;
  title: string;
  episode: string;
  timeAgo: string;
  rating: number;
  badge?: string;
  accent: string;
};

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
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    badge: "Featured",
    meta: "TV • 2025 • Action, Fantasy",
    episodeLabel: "Episode 8",
    description:
      "Sung Jinwoo rises from the weakest hunter to an unstoppable force. Every dungeon raid pushes him closer to the truth behind the System—and the shadows that answer only to him.",
  },
  {
    id: "jjk",
    title: "Jujutsu Kaisen",
    badge: "Featured",
    meta: "TV • 2023 • Action, Supernatural",
    episodeLabel: "Episode 17",
    description:
      "In a world where curses thrive on fear, Yuji Itadori and his allies race to stop a catastrophe. Loyalties fracture as ancient powers awaken beneath Shibuya.",
  },
  {
    id: "frieren",
    title: "Frieren: Beyond Journey's End",
    badge: "Featured",
    meta: "TV • 2023 • Fantasy, Slice of Life",
    episodeLabel: "Episode 15",
    description:
      "After the hero's party disbands, the elf mage Frieren begins a new journey—to understand humanity, memory, and the quiet magic of time itself.",
  },
  {
    id: "one-piece",
    title: "One Piece",
    badge: "Featured",
    meta: "TV • 2024 • Adventure, Fantasy",
    episodeLabel: "Episode 1110",
    description:
      "Luffy and the Straw Hats storm Egghead Island as world-shaking secrets surface. The next era of pirates begins with a battle that could rewrite history.",
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
  {
    id: "frieren-cw",
    title: "Frieren: Beyond Journey's End",
    subtitle: "S1 • E15 • Beyond Journeys",
    progress: 55,
    accent: "from-emerald-950 via-teal-800 to-amber-500",
  },
  {
    id: "kaiju-cw",
    title: "Kaiju No. 8",
    subtitle: "S1 • E6 • Kafka Hibino",
    progress: 72,
    accent: "from-slate-900 via-cyan-800 to-lime-500",
  },
  {
    id: "blue-lock-cw",
    title: "Blue Lock",
    subtitle: "S2 • E3 • Absolute Egoist",
    progress: 22,
    accent: "from-sky-950 via-blue-800 to-cyan-500",
  },
  {
    id: "csm-cw",
    title: "Chainsaw Man",
    subtitle: "S1 • E7 • Meowy's Whereabouts",
    progress: 90,
    accent: "from-red-950 via-rose-800 to-orange-500",
  },
  {
    id: "mha-cw",
    title: "My Hero Academia",
    subtitle: "S7 • E10 • Vestiges",
    progress: 48,
    accent: "from-green-950 via-emerald-700 to-lime-400",
  },
  {
    id: "one-piece-cw",
    title: "One Piece",
    subtitle: "S21 • E1085 • Egghead",
    progress: 15,
    accent: "from-blue-950 via-sky-700 to-amber-400",
  },
  {
    id: "oshi-cw",
    title: "Oshi no Ko",
    subtitle: "S2 • E2 • Tokyo Blade",
    progress: 38,
    accent: "from-fuchsia-950 via-pink-700 to-rose-400",
  },
  {
    id: "apothecary-cw",
    title: "The Apothecary Diaries",
    subtitle: "S2 • E4 • Courtesan's Secret",
    progress: 61,
    accent: "from-lime-950 via-green-800 to-emerald-400",
  },
];

export const trendingAnime: AnimeCardItem[] = [
  {
    id: "frieren",
    title: "Frieren: Beyond Journey's End",
    subtitle: "Season 1 • Journey Continues",
    rating: 9.4,
    year: 2023,
    episodeBadge: "EPS 28",
    genres: ["Fantasy", "Slice of Life"],
    accent: "from-emerald-950 via-teal-800 to-amber-500",
  },
  {
    id: "kaiju",
    title: "Kaiju No. 8",
    subtitle: "Season 1 • Defense Force",
    rating: 8.7,
    year: 2024,
    episodeBadge: "EPS 12",
    genres: ["Action", "Sci-Fi"],
    accent: "from-slate-900 via-cyan-800 to-lime-500",
  },
  {
    id: "wind-breaker",
    title: "Wind Breaker",
    subtitle: "Season 1 • Bofurin Arc",
    rating: 8.5,
    year: 2024,
    episodeBadge: "EPS 13",
    genres: ["Action", "Drama"],
    accent: "from-sky-950 via-blue-700 to-cyan-400",
  },
  {
    id: "slime",
    title: "That Time I Got Reincarnated as a Slime",
    subtitle: "Season 3 • Tempest",
    rating: 8.3,
    year: 2024,
    episodeBadge: "EPS 24",
    genres: ["Fantasy", "Adventure"],
    accent: "from-blue-950 via-indigo-700 to-sky-300",
  },
  {
    id: "solo-trend",
    title: "Solo Leveling",
    subtitle: "Season 2 • Shadow Monarch",
    rating: 9.1,
    year: 2025,
    episodeBadge: "EPS 13",
    genres: ["Action", "Fantasy"],
    accent: "from-indigo-950 via-violet-800 to-fuchsia-600",
  },
  {
    id: "ds-trend",
    title: "Demon Slayer",
    subtitle: "Hashira Training Arc",
    rating: 8.9,
    year: 2024,
    episodeBadge: "EPS 8",
    genres: ["Action", "Fantasy"],
    accent: "from-violet-950 via-purple-800 to-fuchsia-500",
  },
  {
    id: "jjk-trend",
    title: "Jujutsu Kaisen",
    subtitle: "Season 2 • Shibuya Incident",
    rating: 9.0,
    year: 2023,
    episodeBadge: "EPS 23",
    genres: ["Action", "Supernatural"],
    accent: "from-zinc-900 via-rose-900 to-orange-600",
  },
  {
    id: "dandadan",
    title: "Dandadan",
    subtitle: "Season 1 • Occult Chaos",
    rating: 8.8,
    year: 2024,
    episodeBadge: "EPS 12",
    genres: ["Action", "Comedy"],
    accent: "from-pink-950 via-fuchsia-700 to-orange-400",
  },
  {
    id: "delicious",
    title: "Delicious in Dungeon",
    subtitle: "Season 1 • Party Feast",
    rating: 8.6,
    year: 2024,
    episodeBadge: "EPS 24",
    genres: ["Adventure", "Comedy"],
    accent: "from-amber-950 via-yellow-700 to-lime-400",
  },
  {
    id: "mushoku",
    title: "Mushoku Tensei",
    subtitle: "Season 2 • Labyrinth City",
    rating: 8.7,
    year: 2023,
    episodeBadge: "EPS 24",
    genres: ["Fantasy", "Adventure"],
    accent: "from-cyan-950 via-teal-700 to-sky-400",
  },
  {
    id: "bleach-trend",
    title: "Bleach: Thousand-Year Blood War",
    subtitle: "Cour 3 • The Conflict",
    rating: 9.2,
    year: 2024,
    episodeBadge: "EPS 14",
    genres: ["Action", "Supernatural"],
    accent: "from-red-950 via-orange-800 to-amber-500",
  },
  {
    id: "ubw-trend",
    title: "Fate/stay night: Unlimited Blade Works",
    subtitle: "Complete Series",
    rating: 8.4,
    year: 2014,
    episodeBadge: "EPS 25",
    genres: ["Action", "Fantasy"],
    accent: "from-blue-950 via-indigo-800 to-sky-500",
  },
];

export const popularAnime: AnimeCardItem[] = [
  {
    id: "naruto",
    title: "Naruto: Shippuden",
    subtitle: "Complete Series",
    rating: 9.2,
    year: 2007,
    episodeBadge: "EPS 500",
    genres: ["Action", "Adventure"],
    accent: "from-orange-950 via-amber-700 to-yellow-400",
  },
  {
    id: "one-piece",
    title: "One Piece",
    subtitle: "Egghead Island Arc",
    rating: 9.0,
    year: 1999,
    episodeBadge: "EPS 1112",
    genres: ["Adventure", "Fantasy"],
    accent: "from-blue-950 via-sky-700 to-amber-400",
  },
  {
    id: "death-note",
    title: "Death Note",
    subtitle: "Complete Series",
    rating: 8.9,
    year: 2006,
    episodeBadge: "EPS 37",
    genres: ["Psychological", "Thriller"],
    accent: "from-neutral-950 via-zinc-800 to-red-700",
  },
  {
    id: "mha",
    title: "My Hero Academia",
    subtitle: "Season 7",
    rating: 8.6,
    year: 2024,
    episodeBadge: "EPS 21",
    genres: ["Action", "School"],
    accent: "from-green-950 via-emerald-700 to-lime-400",
  },
  {
    id: "aot-pop",
    title: "Attack on Titan",
    subtitle: "The Final Chapters",
    rating: 9.3,
    year: 2013,
    episodeBadge: "EPS 94",
    genres: ["Action", "Drama"],
    accent: "from-stone-900 via-amber-900 to-red-700",
  },
  {
    id: "hxh",
    title: "Hunter x Hunter",
    subtitle: "Complete Series",
    rating: 9.1,
    year: 2011,
    episodeBadge: "EPS 148",
    genres: ["Adventure", "Fantasy"],
    accent: "from-green-950 via-lime-700 to-yellow-400",
  },
  {
    id: "fma",
    title: "Fullmetal Alchemist: Brotherhood",
    subtitle: "Complete Series",
    rating: 9.5,
    year: 2009,
    episodeBadge: "EPS 64",
    genres: ["Action", "Adventure"],
    accent: "from-red-950 via-amber-800 to-yellow-500",
  },
  {
    id: "steins",
    title: "Steins;Gate",
    subtitle: "Complete Series",
    rating: 9.0,
    year: 2011,
    episodeBadge: "EPS 24",
    genres: ["Sci-Fi", "Thriller"],
    accent: "from-slate-950 via-cyan-800 to-amber-400",
  },
  {
    id: "cowboy",
    title: "Cowboy Bebop",
    subtitle: "Complete Series",
    rating: 8.9,
    year: 1998,
    episodeBadge: "EPS 26",
    genres: ["Action", "Sci-Fi"],
    accent: "from-orange-950 via-rose-800 to-sky-500",
  },
  {
    id: "evangelion",
    title: "Neon Genesis Evangelion",
    subtitle: "Complete Series",
    rating: 8.7,
    year: 1995,
    episodeBadge: "EPS 26",
    genres: ["Mecha", "Psychological"],
    accent: "from-purple-950 via-violet-800 to-fuchsia-500",
  },
  {
    id: "code-geass",
    title: "Code Geass",
    subtitle: "Lelouch of the Rebellion",
    rating: 8.8,
    year: 2006,
    episodeBadge: "EPS 50",
    genres: ["Mecha", "Drama"],
    accent: "from-rose-950 via-red-800 to-amber-500",
  },
  {
    id: "vinland",
    title: "Vinland Saga",
    subtitle: "Season 2 • Farmland Arc",
    rating: 9.0,
    year: 2019,
    episodeBadge: "EPS 48",
    genres: ["Action", "Drama"],
    accent: "from-sky-950 via-blue-800 to-stone-400",
  },
];

export const latestEpisodes: LatestEpisode[] = [
  {
    id: "blue-lock",
    title: "Blue Lock",
    episode: "S2 • E5",
    timeAgo: "5 mins ago",
    badge: "SUB",
    accent: "from-sky-950 via-blue-800 to-cyan-500",
  },
  {
    id: "oshi",
    title: "Oshi no Ko",
    episode: "S2 • E4",
    timeAgo: "12 mins ago",
    badge: "SUB",
    accent: "from-fuchsia-950 via-pink-700 to-rose-400",
  },
  {
    id: "apothecary",
    title: "The Apothecary Diaries",
    episode: "S2 • E6",
    timeAgo: "1 hour ago",
    badge: "SUB",
    accent: "from-lime-950 via-green-800 to-emerald-400",
  },
  {
    id: "solo-latest",
    title: "Solo Leveling",
    episode: "S2 • E8",
    timeAgo: "2 hours ago",
    badge: "DUB",
    accent: "from-indigo-950 via-violet-800 to-blue-500",
  },
  {
    id: "kaiju-latest",
    title: "Kaiju No. 8",
    episode: "S1 • E11",
    timeAgo: "3 hours ago",
    badge: "SUB",
    accent: "from-slate-900 via-cyan-800 to-lime-500",
  },
  {
    id: "wb-latest",
    title: "Wind Breaker",
    episode: "S1 • E12",
    timeAgo: "4 hours ago",
    badge: "SUB",
    accent: "from-sky-950 via-blue-700 to-cyan-400",
  },
  {
    id: "dandadan-latest",
    title: "Dandadan",
    episode: "S1 • E10",
    timeAgo: "5 hours ago",
    badge: "DUB",
    accent: "from-pink-950 via-fuchsia-700 to-orange-400",
  },
  {
    id: "ds-latest",
    title: "Demon Slayer",
    episode: "S4 • E7",
    timeAgo: "6 hours ago",
    badge: "SUB",
    accent: "from-violet-950 via-purple-800 to-fuchsia-500",
  },
  {
    id: "mha-latest",
    title: "My Hero Academia",
    episode: "S7 • E14",
    timeAgo: "8 hours ago",
    badge: "SUB",
    accent: "from-green-950 via-emerald-700 to-lime-400",
  },
  {
    id: "one-piece-latest",
    title: "One Piece",
    episode: "E1110",
    timeAgo: "10 hours ago",
    badge: "SUB",
    accent: "from-blue-950 via-sky-700 to-amber-400",
  },
  {
    id: "jjk-latest",
    title: "Jujutsu Kaisen",
    episode: "S2 • E20",
    timeAgo: "12 hours ago",
    badge: "DUB",
    accent: "from-zinc-900 via-rose-900 to-orange-600",
  },
  {
    id: "delicious-latest",
    title: "Delicious in Dungeon",
    episode: "S1 • E18",
    timeAgo: "1 day ago",
    badge: "SUB",
    accent: "from-amber-950 via-yellow-700 to-lime-400",
  },
];

export const recentlyUpdated: RecentUpdate[] = [
  {
    id: "ds-upd",
    title: "Demon Slayer",
    episode: "S4 • E10",
    timeAgo: "2h ago",
    rating: 9.1,
    badge: "SUB",
    accent: "from-violet-950 via-purple-800 to-fuchsia-500",
  },
  {
    id: "solo-upd",
    title: "Solo Leveling",
    episode: "S2 • E8",
    timeAgo: "5h ago",
    rating: 8.9,
    badge: "SUB",
    accent: "from-indigo-950 via-violet-800 to-blue-500",
  },
  {
    id: "wb-upd",
    title: "Wind Breaker",
    episode: "S1 • E12",
    timeAgo: "1d ago",
    rating: 8.5,
    badge: "DUB",
    accent: "from-sky-950 via-blue-700 to-cyan-400",
  },
  {
    id: "jjk-upd",
    title: "Jujutsu Kaisen",
    episode: "S2 • E23",
    timeAgo: "2d ago",
    rating: 9.0,
    badge: "SUB",
    accent: "from-zinc-900 via-rose-900 to-orange-600",
  },
  {
    id: "kaiju-upd",
    title: "Kaiju No. 8",
    episode: "S1 • E12",
    timeAgo: "2d ago",
    rating: 8.7,
    badge: "SUB",
    accent: "from-slate-900 via-cyan-800 to-lime-500",
  },
  {
    id: "blue-upd",
    title: "Blue Lock",
    episode: "S2 • E6",
    timeAgo: "3d ago",
    rating: 8.4,
    badge: "SUB",
    accent: "from-sky-950 via-blue-800 to-cyan-500",
  },
  {
    id: "oshi-upd",
    title: "Oshi no Ko",
    episode: "S2 • E5",
    timeAgo: "3d ago",
    rating: 8.8,
    badge: "DUB",
    accent: "from-fuchsia-950 via-pink-700 to-rose-400",
  },
  {
    id: "apothecary-upd",
    title: "The Apothecary Diaries",
    episode: "S2 • E7",
    timeAgo: "4d ago",
    rating: 8.9,
    badge: "SUB",
    accent: "from-lime-950 via-green-800 to-emerald-400",
  },
  {
    id: "dandadan-upd",
    title: "Dandadan",
    episode: "S1 • E11",
    timeAgo: "4d ago",
    rating: 8.8,
    badge: "SUB",
    accent: "from-pink-950 via-fuchsia-700 to-orange-400",
  },
  {
    id: "mha-upd",
    title: "My Hero Academia",
    episode: "S7 • E15",
    timeAgo: "5d ago",
    rating: 8.6,
    badge: "SUB",
    accent: "from-green-950 via-emerald-700 to-lime-400",
  },
  {
    id: "frieren-upd",
    title: "Frieren",
    episode: "S1 • E28",
    timeAgo: "1w ago",
    rating: 9.4,
    badge: "DUB",
    accent: "from-emerald-950 via-teal-800 to-amber-500",
  },
  {
    id: "bleach-upd",
    title: "Bleach TYBW",
    episode: "S3 • E4",
    timeAgo: "1w ago",
    rating: 9.2,
    badge: "SUB",
    accent: "from-red-950 via-orange-800 to-amber-500",
  },
];
