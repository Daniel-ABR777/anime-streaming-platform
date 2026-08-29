export const desktopNav = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/browse?type=Movie", label: "Movies" },
  { href: "/#trending", label: "Trending" },
  { href: "/#latest", label: "Latest" },
] as const;

export const genreLinks = [
  { href: "/browse?genre=Action", label: "Action" },
  { href: "/browse?genre=Adventure", label: "Adventure" },
  { href: "/browse?genre=Comedy", label: "Comedy" },
  { href: "/browse?genre=Drama", label: "Drama" },
  { href: "/browse?genre=Fantasy", label: "Fantasy" },
  { href: "/browse?genre=Horror", label: "Horror" },
  { href: "/browse?genre=Romance", label: "Romance" },
  { href: "/browse?genre=Sci-Fi", label: "Sci-Fi" },
  { href: "/browse?genre=Slice of Life", label: "Slice of Life" },
  { href: "/browse?genre=Supernatural", label: "Supernatural" },
] as const;

export const seasonLinks = [
  { href: "/browse?season=Spring 2024", label: "Spring 2024" },
  { href: "/browse?season=Winter 2024", label: "Winter 2024" },
  { href: "/browse?season=Fall 2023", label: "Fall 2023" },
  { href: "/browse?season=Summer 2023", label: "Summer 2023" },
  { href: "/browse?season=Fall 2022", label: "Fall 2022" },
] as const;

export const mobileNavGroups = [
  {
    id: "browse",
    items: [
      { href: "/", label: "Home" },
      { href: "/browse", label: "Browse Anime" },
      { href: "/#trending", label: "Trending" },
      { href: "/#latest", label: "Latest Episodes" },
      { href: "/#browse", label: "Ongoing" },
      { href: "/browse?type=Movie", label: "Movies" },
      { href: "/search", label: "Search" },
    ],
  },
  {
    id: "discover",
    items: [
      { href: "/browse?genre=Action", label: "Genres" },
      { href: "/browse?season=Spring 2024", label: "Seasons" },
      { href: "/browse", label: "Studios" },
    ],
  },
  {
    id: "library",
    items: [
      { href: "/profile?tab=watchlist", label: "My Watchlist" },
      { href: "/profile?tab=favorites", label: "Favorites" },
      { href: "/profile?tab=continue", label: "Continue Watching" },
      { href: "/profile?tab=history", label: "Watch History" },
      { href: "/profile?tab=notifications", label: "Notifications" },
    ],
  },
  {
    id: "info",
    items: [
      { href: "/profile?tab=settings", label: "Settings" },
      { href: "/#about", label: "About" },
      { href: "/#contact", label: "Contact" },
    ],
  },
] as const;
