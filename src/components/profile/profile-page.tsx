import { ProfileContent } from "@/components/profile/profile-content";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";

export function ProfilePage() {
  return (
    <div className="min-h-dvh bg-[#f4f6fb] text-slate-900 dark:bg-[#0b0f1a] dark:text-white">
      <ProfileHeader />
      <main className="mx-auto flex max-w-[1440px] flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6 lg:flex-row lg:items-stretch lg:px-8">
        <ProfileSidebar />
        <ProfileContent />
      </main>
    </div>
  );
}
