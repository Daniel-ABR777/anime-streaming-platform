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
import { UserAvatar } from "@/components/profile/user-avatar";

const menuItems = [
  { href: "/profile", label: "My Profile" },
  { href: "/#continue", label: "Continue Watching" },
  { href: "/profile", label: "Watchlist" },
  { href: "/profile", label: "Favorites" },
  { href: "/profile", label: "Watch History" },
  { href: "/profile", label: "Notifications" },
  { href: "/profile", label: "Settings" },
] as const;

type MenuPosition = { top: number; right: number };

export function ProfileMenu({ showChevron = true }: { showChevron?: boolean }) {
  const router = useRouter();
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
            className="fixed z-[80] w-[200px] overflow-hidden rounded-xl border border-slate-200 bg-[#f3f4f6] py-1.5 shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-[#1a1d27] dark:shadow-black/50"
          >
            <div className="px-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3.5 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-200/80 dark:text-slate-100 dark:hover:bg-white/8"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mx-3 my-1.5 h-px bg-slate-300 dark:bg-white/15" />

            <div className="px-1">
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="block w-full rounded-lg px-3.5 py-2 text-left text-sm font-medium text-slate-800 transition hover:bg-slate-200/80 dark:text-slate-100 dark:hover:bg-white/8"
              >
                Logout
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
        <UserAvatar size="sm" />
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
