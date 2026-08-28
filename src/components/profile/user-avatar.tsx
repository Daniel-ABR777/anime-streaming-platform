type UserAvatarProps = {
  size?: "sm" | "md" | "lg";
  showVerified?: boolean;
  className?: string;
};

const sizeMap = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-28 w-28",
} as const;

export function UserAvatar({
  size = "md",
  showVerified = false,
  className = "",
}: UserAvatarProps) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <span
        className={`overflow-hidden rounded-full bg-[#2a1b45] ring-[3px] ring-violet-500 ${sizeMap[size]}`}
      >
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <circle cx="32" cy="32" r="32" fill="#3b2760" />
          <path
            d="M12 38c2-14 10-24 20-24s18 10 20 24c-4 2-10 4-20 4s-16-2-20-4Z"
            fill="#6d28d9"
          />
          <path
            d="M18 30c1-12 7-20 14-20s13 8 14 20c-3 1-8 2-14 2s-11-1-14-2Z"
            fill="#8b5cf6"
          />
          <ellipse cx="32" cy="36" rx="11" ry="12" fill="#f5d0c5" />
          <path
            d="M21 28c2-7 6-11 11-11s9 4 11 11c-3-2-7-3-11-3s-8 1-11 3Z"
            fill="#7c3aed"
          />
          <circle cx="27.5" cy="35" r="1.3" fill="#2e1065" />
          <circle cx="36.5" cy="35" r="1.3" fill="#2e1065" />
          <path
            d="M29 40c1.2 1.4 4.8 1.4 6 0"
            stroke="#c084a0"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M20 44c3 8 8 12 12 12s9-4 12-12c-4 2-8 3-12 3s-8-1-12-3Z"
            fill="#4c1d95"
          />
        </svg>
      </span>
      {showVerified ? (
        <span className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-white ring-2 ring-[#0b0f1a] dark:ring-[#0b0f1a]">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
            <path d="M7.8 13.4 4.6 10.2l1.2-1.2 2 2 5.4-5.4 1.2 1.2-6.6 6.6Z" />
          </svg>
        </span>
      ) : null}
    </span>
  );
}
