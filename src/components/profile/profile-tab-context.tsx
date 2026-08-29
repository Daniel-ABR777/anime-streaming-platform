"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ProfileTabId =
  | "overview"
  | "profile"
  | "history"
  | "continue"
  | "watchlist"
  | "favorites"
  | "notifications"
  | "settings";

const VALID_TABS: readonly ProfileTabId[] = [
  "overview",
  "profile",
  "history",
  "continue",
  "watchlist",
  "favorites",
  "notifications",
  "settings",
] as const;

type ProfileTabContextValue = {
  tab: ProfileTabId;
  setTab: (tab: ProfileTabId) => void;
};

const ProfileTabContext = createContext<ProfileTabContextValue | null>(null);

export function isProfileTabId(value: string | null | undefined): value is ProfileTabId {
  return !!value && (VALID_TABS as readonly string[]).includes(value);
}

export function ProfileTabProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [tab, setTabState] = useState<ProfileTabId>(
    isProfileTabId(tabParam) ? tabParam : "overview",
  );

  useEffect(() => {
    if (isProfileTabId(tabParam)) {
      setTabState(tabParam);
    }
  }, [tabParam]);

  const setTab = useCallback(
    (next: ProfileTabId) => {
      setTabState(next);
      const params = new URLSearchParams(searchParams.toString());
      if (next === "overview") {
        params.delete("tab");
      } else {
        params.set("tab", next);
      }
      const query = params.toString();
      router.replace(query ? `/profile?${query}` : "/profile", { scroll: false });
    },
    [router, searchParams],
  );

  const value = useMemo(() => ({ tab, setTab }), [tab, setTab]);
  return <ProfileTabContext.Provider value={value}>{children}</ProfileTabContext.Provider>;
}

export function useProfileTab() {
  const ctx = useContext(ProfileTabContext);
  if (!ctx) {
    throw new Error("useProfileTab must be used within ProfileTabProvider");
  }
  return ctx;
}
