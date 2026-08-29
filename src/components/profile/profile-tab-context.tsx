"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type ProfileTabId =
  | "overview"
  | "profile"
  | "history"
  | "continue"
  | "watchlist"
  | "favorites"
  | "notifications"
  | "settings";

type ProfileTabContextValue = {
  tab: ProfileTabId;
  setTab: (tab: ProfileTabId) => void;
};

const ProfileTabContext = createContext<ProfileTabContextValue | null>(null);

export function ProfileTabProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<ProfileTabId>("overview");
  const value = useMemo(() => ({ tab, setTab }), [tab]);
  return <ProfileTabContext.Provider value={value}>{children}</ProfileTabContext.Provider>;
}

export function useProfileTab() {
  const ctx = useContext(ProfileTabContext);
  if (!ctx) {
    throw new Error("useProfileTab must be used within ProfileTabProvider");
  }
  return ctx;
}
