import Image from "next/image";
import profileImage from "@/imgs/profile.jpg";

type UserAvatarProps = {
  size?: "sm" | "md" | "lg";
  showVerified?: boolean;
  className?: string;
};

const sizeMap = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-28 w-28 sm:h-32 sm:w-32",
} as const;

const sizePx = {
  sm: 40,
  md: 64,
  lg: 128,
} as const;

export function UserAvatar({
  size = "md",
  showVerified = false,
  className = "",
}: UserAvatarProps) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <span
        className={`overflow-hidden rounded-full bg-[#2a1b45] ring-2 ring-violet-500 ${sizeMap[size]}`}
      >
        <Image
          src={profileImage}
          alt="Profile avatar"
          width={sizePx[size]}
          height={sizePx[size]}
          className="h-full w-full object-cover"
        />
      </span>
      {showVerified ? (
        <span className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-white ring-2 ring-[#0b0f1a]">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
            <path d="M7.8 13.4 4.6 10.2l1.2-1.2 2 2 5.4-5.4 1.2 1.2-6.6 6.6Z" />
          </svg>
        </span>
      ) : null}
    </span>
  );
}
