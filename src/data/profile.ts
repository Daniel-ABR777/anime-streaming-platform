export type ProfileUser = {
  username: string;
  handle: string;
  bio: string;
  joinedLabel: string;
  location: string;
  verified: boolean;
  premium: boolean;
  email: string;
  language: string;
  theme: string;
  stats: {
    daysWatched: number;
    animeWatched: number;
    episodesWatched: number;
    timeWatched: string;
    averageRating: number;
    longestStreak: number;
    genresExplored: number;
    favorites: number;
  };
  typeBreakdown: {
    tv: number;
    movies: number;
    ova: number;
    specials: number;
  };
};

export type HistoryStatus = "Completed" | "On Hold" | "Watching";

export type WatchHistoryItem = {
  id: string;
  title: string;
  subtitle: string;
  status: HistoryStatus;
  progress: number;
  date: string;
  timeAgo: string;
  accent: string;
};

export type WatchlistItem = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  accent: string;
};

export type ContinueWatchItem = {
  id: string;
  title: string;
  episode: string;
  progress: number;
  accent: string;
};

export type ProfileBadge = {
  id: string;
  label: string;
  color: string;
};

export const profileUser: ProfileUser = {
  username: "AnimeFan99",
  handle: "@animefan99",
  bio: "Just an otaku who loves great stories, beautiful animation, and late-night binge sessions.",
  joinedLabel: "Joined March 2023",
  location: "Anime Profile",
  verified: true,
  premium: true,
  email: "animefan99@email.com",
  language: "English",
  theme: "Dark",
  stats: {
    daysWatched: 125,
    animeWatched: 342,
    episodesWatched: 5241,
    timeWatched: "89d 14h",
    averageRating: 8.7,
    longestStreak: 45,
    genresExplored: 28,
    favorites: 86,
  },
  typeBreakdown: {
    tv: 71,
    movies: 15,
    ova: 8,
    specials: 6,
  },
};

export const profileContinueWatching: ContinueWatchItem[] = [
  {
    id: "solo",
    title: "Solo Leveling",
    episode: "S2 • E8 • The Shadow Monarch",
    progress: 65,
    accent: "from-indigo-950 via-violet-800 to-fuchsia-600",
  },
  {
    id: "jjk",
    title: "Jujutsu Kaisen",
    episode: "S2 • E17 • Right and Wrong",
    progress: 40,
    accent: "from-zinc-900 via-rose-900 to-orange-600",
  },
  {
    id: "frieren",
    title: "Frieren: Beyond Journey's End",
    episode: "S1 • E15 • Beyond Journeys",
    progress: 78,
    accent: "from-emerald-950 via-teal-800 to-amber-500",
  },
  {
    id: "kaiju",
    title: "Kaiju No. 8",
    episode: "S1 • E6 • Kafka Hibino",
    progress: 22,
    accent: "from-slate-900 via-cyan-800 to-lime-500",
  },
];

export const watchHistory: WatchHistoryItem[] = [
  {
    id: "solo",
    title: "Solo Leveling",
    subtitle: "Season 2 • Episode 8",
    status: "Watching",
    progress: 65,
    date: "May 24, 2024",
    timeAgo: "Today",
    accent: "from-sky-950 via-blue-700 to-cyan-400",
  },
  {
    id: "ds",
    title: "Demon Slayer: Kimetsu no Yaiba",
    subtitle: "Season 4 • Episode 8",
    status: "Completed",
    progress: 100,
    date: "May 22, 2024",
    timeAgo: "Yesterday",
    accent: "from-orange-950 via-red-700 to-amber-400",
  },
  {
    id: "frieren",
    title: "Frieren: Beyond Journey's End",
    subtitle: "Season 1 • Episode 15",
    status: "On Hold",
    progress: 62,
    date: "May 20, 2024",
    timeAgo: "2 days ago",
    accent: "from-slate-800 via-zinc-600 to-stone-300",
  },
  {
    id: "csm",
    title: "Chainsaw Man",
    subtitle: "Season 1 • Episode 7",
    status: "Completed",
    progress: 100,
    date: "May 18, 2024",
    timeAgo: "4 days ago",
    accent: "from-red-950 via-rose-800 to-orange-500",
  },
];

export const profileWatchlist: WatchlistItem[] = [
  {
    id: "jjk",
    title: "Jujutsu Kaisen",
    subtitle: "Season 2 • Ready to watch",
    type: "TV Series",
    accent: "from-zinc-900 via-rose-900 to-orange-600",
  },
  {
    id: "one-piece",
    title: "One Piece",
    subtitle: "Catching up • Episode 1080",
    type: "TV Series",
    accent: "from-blue-950 via-sky-700 to-amber-400",
  },
  {
    id: "kaiju",
    title: "Kaiju No. 8",
    subtitle: "Season 1 • Not started",
    type: "TV Series",
    accent: "from-slate-900 via-cyan-800 to-lime-500",
  },
];

export const profileFavorites: WatchlistItem[] = [
  {
    id: "naruto",
    title: "Naruto: Shippuden",
    subtitle: "All-time favorite",
    type: "TV Series",
    accent: "from-orange-950 via-amber-700 to-yellow-400",
  },
  {
    id: "death-note",
    title: "Death Note",
    subtitle: "Psychological masterpiece",
    type: "TV Series",
    accent: "from-neutral-950 via-zinc-800 to-red-700",
  },
  {
    id: "aot",
    title: "Attack on Titan",
    subtitle: "Completed series",
    type: "TV Series",
    accent: "from-stone-900 via-amber-900 to-red-700",
  },
];

export const profileBadges: ProfileBadge[] = [
  { id: "early", label: "Early Bird", color: "from-amber-400 to-orange-500" },
  { id: "marathon", label: "Marathoner", color: "from-violet-500 to-fuchsia-500" },
  { id: "explorer", label: "Explorer", color: "from-sky-400 to-cyan-500" },
  { id: "fanatic", label: "Fanatic", color: "from-rose-500 to-red-500" },
  { id: "collector", label: "Collector", color: "from-emerald-400 to-teal-500" },
];
