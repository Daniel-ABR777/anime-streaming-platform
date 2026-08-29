export const desktopNav = [
  { href: "/", label: "Home" },
  { href: "/#browse", label: "Browse" },
  { href: "/#movies", label: "Movies" },
  { href: "/#trending", label: "Trending" },
  { href: "/#latest", label: "Latest" },
] as const;

export const genreLinks = [
  { href: "/?genre=action#browse", label: "Action" },
  { href: "/?genre=adventure#browse", label: "Adventure" },
  { href: "/?genre=comedy#browse", label: "Comedy" },
  { href: "/?genre=drama#browse", label: "Drama" },
  { href: "/?genre=fantasy#browse", label: "Fantasy" },
  { href: "/?genre=horror#browse", label: "Horror" },
  { href: "/?genre=romance#browse", label: "Romance" },
  { href: "/?genre=sci-fi#browse", label: "Sci-Fi" },
  { href: "/?genre=slice-of-life#browse", label: "Slice of Life" },
  { href: "/?genre=supernatural#browse", label: "Supernatural" },
] as const;

export const seasonLinks = [
  { href: "/?season=summer-2026#browse", label: "Summer 2026" },
  { href: "/?season=spring-2026#browse", label: "Spring 2026" },
  { href: "/?season=winter-2026#browse", label: "Winter 2026" },
  { href: "/?season=fall-2025#browse", label: "Fall 2025" },
  { href: "/?season=summer-2025#browse", label: "Summer 2025" },
] as const;

export const mobileNavGroups = [
  {
    id: "browse",
    items: [
      { href: "/", label: "Home" },
      { href: "/#browse", label: "Browse Anime" },
      { href: "/#trending", label: "Trending" },
      { href: "/#popular", label: "Popular" },
      { href: "/#latest", label: "Latest Episodes" },
      { href: "/#ongoing", label: "Ongoing" },
      { href: "/#movies", label: "Movies" },
    ],
  },
  {
    id: "discover",
    items: [
      { href: "/#genres", label: "Genres" },
      { href: "/#seasons", label: "Seasons" },
      { href: "/#studios", label: "Studios" },
    ],
  },
  {
    id: "library",
    items: [
      { href: "/profile", label: "My Watchlist" },
      { href: "/profile", label: "Favorites" },
      { href: "/#continue", label: "Continue Watching" },
      { href: "/profile", label: "Watch History" },
      { href: "/profile", label: "Notifications" },
    ],
  },
  {
    id: "info",
    items: [
      { href: "/profile", label: "Settings" },
      { href: "/#about", label: "About" },
      { href: "/#contact", label: "Contact" },
    ],
  },
] as const;
