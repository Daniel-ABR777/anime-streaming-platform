export type ProfileUser = {
  username: string;
  bio: string;
  joinedLabel: string;
  location: string;
  verified: boolean;
  stats: {
    animeWatched: number;
    episodesWatched: number;
    favorites: number;
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
  accent: string;
};

export type WatchlistItem = {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
};

export const profileUser: ProfileUser = {
  username: "OtakuKai",
  bio: "Just an otaku who loves great stories, beautiful animation, and late-night binge sessions.",
  joinedLabel: "Joined March 12, 2022",
  location: "Anime Profile",
  verified: true,
  stats: {
    animeWatched: 247,
    episodesWatched: 4392,
    favorites: 86,
  },
};

export const watchHistory: WatchHistoryItem[] = [
  {
    id: "solo",
    title: "Solo Leveling",
    subtitle: "Season 1 • Episode 12",
    status: "Completed",
    progress: 100,
    date: "May 24, 2024",
    accent: "from-sky-950 via-blue-700 to-cyan-400",
  },
  {
    id: "ds",
    title: "Demon Slayer: Kimetsu no Yaiba",
    subtitle: "Season 4 • Episode 8",
    status: "Completed",
    progress: 100,
    date: "May 22, 2024",
    accent: "from-orange-950 via-red-700 to-amber-400",
  },
  {
    id: "frieren",
    title: "Frieren: Beyond Journey's End",
    subtitle: "Season 1 • Episode 15",
    status: "On Hold",
    progress: 62,
    date: "May 20, 2024",
    accent: "from-slate-800 via-zinc-600 to-stone-300",
  },
  {
    id: "csm",
    title: "Chainsaw Man",
    subtitle: "Season 1 • Episode 7",
    status: "Completed",
    progress: 100,
    date: "May 18, 2024",
    accent: "from-red-950 via-rose-800 to-orange-500",
  },
];

export const profileWatchlist: WatchlistItem[] = [
  {
    id: "jjk",
    title: "Jujutsu Kaisen",
    subtitle: "Season 2 • Ready to watch",
    accent: "from-zinc-900 via-rose-900 to-orange-600",
  },
  {
    id: "one-piece",
    title: "One Piece",
    subtitle: "Catching up • Episode 1080",
    accent: "from-blue-950 via-sky-700 to-amber-400",
  },
  {
    id: "kaiju",
    title: "Kaiju No. 8",
    subtitle: "Season 1 • Not started",
    accent: "from-slate-900 via-cyan-800 to-lime-500",
  },
];

export const profileFavorites: WatchlistItem[] = [
  {
    id: "naruto",
    title: "Naruto: Shippuden",
    subtitle: "All-time favorite",
    accent: "from-orange-950 via-amber-700 to-yellow-400",
  },
  {
    id: "death-note",
    title: "Death Note",
    subtitle: "Psychological masterpiece",
    accent: "from-neutral-950 via-zinc-800 to-red-700",
  },
  {
    id: "aot",
    title: "Attack on Titan",
    subtitle: "Completed series",
    accent: "from-stone-900 via-amber-900 to-red-700",
  },
];
