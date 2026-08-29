"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

type Theme = "light" | "dark";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("nova-theme-change", onStoreChange);
  return () => window.removeEventListener("nova-theme-change", onStoreChange);
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") root.classList.remove("dark");
  else root.classList.add("dark");
  localStorage.setItem("nova-theme", theme);
  window.dispatchEvent(new Event("nova-theme-change"));
}

const menuItems = [
  { href: "/profile", label: "Profile", icon: ProfileIcon },
  { href: "/watchlist", label: "Watchlist", icon: StarIcon },
  { href: "/favorites", label: "Favorites", icon: HeartIcon },
  { href: "/history", label: "History", icon: ClockIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
] as const;

type MenuPosition = { top: number; right: number };

export function ProfileMenu({ showChevron = true }: { showChevron?: boolean }) {
  const router = useRouter();
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<MenuPosition>({ top: 0, right: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    function updatePosition() {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPosition({
        top: rect.bottom + 10,
        right: Math.max(8, window.innerWidth - rect.right),
      });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function handleLogout() {
    setOpen(false);
    router.push("/signin");
  }

  const menu =
    open && mounted
      ? createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label="Account menu"
            style={{ top: position.top, right: position.right }}
            className="fixed z-[80] w-[220px] rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15 dark:border-white/8 dark:bg-[#12141c] dark:shadow-black/50"
          >
            <div className="space-y-0.5">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const active = index === 0;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-violet-500/15 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    {item.label}
                  </Link>
                );
              })}

              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
              >
                <LogoutIcon className="h-[18px] w-[18px] shrink-0" />
                Logout
              </button>
            </div>

            <div className="my-2 h-px bg-slate-200 dark:bg-white/8" />

            <div className="flex items-center justify-between px-3 py-2">
              <span className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                {theme === "dark" ? (
                  <MoonIcon className="h-[18px] w-[18px]" />
                ) : (
                  <SunIcon className="h-[18px] w-[18px]" />
                )}
                Theme
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={theme === "dark"}
                aria-label="Toggle dark theme"
                onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
                className={`relative h-6 w-11 rounded-full transition ${
                  theme === "dark" ? "bg-violet-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                    theme === "dark" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="relative ml-0.5">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1.5 rounded-full p-0.5 transition hover:bg-slate-100 dark:hover:bg-white/5"
      >
        <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#2a1b45] ring-[2.5px] ring-violet-500">
          <AvatarArt />
        </span>
        {showChevron ? (
          <svg
            viewBox="0 0 20 20"
            className={`h-4 w-4 text-slate-400 transition duration-200 dark:text-slate-300 ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 7.5 10 12.5 15 7.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </button>
      {menu}
    </div>
  );
}

function AvatarArt() {
  return (
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
  );
}

function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5.5 19.2c1.3-3.3 3.7-5 6.5-5s5.2 1.7 6.5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="m12 3.5 2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.4 6.9 19.2l1-5.7-4.1-4 5.7-.8L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M10 7V5.5A1.5 1.5 0 0 1 11.5 4h7A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 10 18.5V17"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M4 12h10M11 8.5 14.5 12 11 15.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 7 7 0 1 0 20.5 14.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4 4.2 19.8M19.8 4.2l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
