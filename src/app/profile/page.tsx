import type { Metadata } from "next";
import { ProfilePage } from "@/components/profile/profile-page";

export const metadata: Metadata = {
  title: "AniStream — Profile",
  description: "Manage your AniStream profile, watch history, and favorites.",
};

export default function Profile() {
  return <ProfilePage />;
}
