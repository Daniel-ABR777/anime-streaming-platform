import type { Metadata } from "next";
import { Suspense } from "react";
import { ProfilePage } from "@/components/profile/profile-page";

export const metadata: Metadata = {
  title: "AniStream — Profile",
  description: "Manage your AniStream profile, watch history, and favorites.",
};

export default function Profile() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh bg-[#0b0f1a] text-white">
          <div className="mx-auto max-w-[1440px] px-4 py-10 text-sm text-slate-400">
            Loading profile…
          </div>
        </div>
      }
    >
      <ProfilePage />
    </Suspense>
  );
}
