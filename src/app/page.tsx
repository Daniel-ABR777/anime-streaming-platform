import type { Metadata } from "next";
import { DashboardPage } from "@/components/dashboard/dashboard-page";

export const metadata: Metadata = {
  title: "AniStream — Home",
  description: "Browse featured, trending, and continue watching on AniStream.",
};

export default function Home() {
  return <DashboardPage />;
}
