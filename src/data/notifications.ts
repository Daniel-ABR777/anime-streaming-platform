export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
  type: "episode" | "system" | "social" | "promo";
};

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "New Episode Available",
    message: "Solo Leveling S2 E8 — The Shadow Monarch is now streaming.",
    timeAgo: "2 mins ago",
    unread: true,
    type: "episode",
  },
  {
    id: "n2",
    title: "Watchlist Update",
    message: "Demon Slayer was added to your recommended watchlist.",
    timeAgo: "18 mins ago",
    unread: true,
    type: "social",
  },
  {
    id: "n3",
    title: "Premium Reminder",
    message: "Your Premium plan renews in 7 days. Manage billing anytime.",
    timeAgo: "1 hour ago",
    unread: true,
    type: "promo",
  },
  {
    id: "n4",
    title: "Continue Watching",
    message: "Pick up where you left off on Frieren: Beyond Journey's End.",
    timeAgo: "Yesterday",
    unread: false,
    type: "episode",
  },
  {
    id: "n5",
    title: "New Badge Unlocked",
    message: "You earned the Marathoner badge for a 45-day watch streak.",
    timeAgo: "2 days ago",
    unread: false,
    type: "system",
  },
  {
    id: "n6",
    title: "Trending Now",
    message: "Kaiju No. 8 is trending in Action this week.",
    timeAgo: "3 days ago",
    unread: false,
    type: "social",
  },
];

export const unreadNotifications = notifications.filter((item) => item.unread);
export const unreadCount = unreadNotifications.length;
