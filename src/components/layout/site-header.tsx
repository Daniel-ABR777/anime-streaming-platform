"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ProfileMenu } from "@/components/dashboard/profile-menu";
import {
  desktopNav,
  genreLinks,
  mobileNavGroups,
  seasonLinks,
} from "@/data/nav";

type MenuId = "genres" | "season" | "search" | "mobile" | null;

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<MenuId>(null);
  const [query, setQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchId = useId();

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu((current) =>
          current === "genres" || current === "season" || current === "mobile" || current === "search"
            ? null
            : current,
        );
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (openMenu === "mobile") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [openMenu]);

  function toggleMenu(id: Exclude<MenuId, null>) {
    setOpenMenu((current) => (current === id ? null : id));
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/5 dark:bg-[#0b0f1a]/90"
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 lg:hidden dark:text-slate-200 dark:hover:bg-white/5"
          aria-label={openMenu === "mobile" ? "Close menu" : "Open menu"}
          aria-expanded={openMenu === "mobile"}
          aria-controls="mobile-nav"
          onClick={() => toggleMenu("mobile")}
        >
          {openMenu === "mobile" ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpenMenu(null)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
            AniStream
          </span>
        </Link>

        <nav className="ml-2 hidden min-w-0 flex-1 items-center gap-0.5 lg:flex" aria-label="Primary">
          {desktopNav.slice(0, 2).map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              label={link.label}
              active={link.href === "/" && pathname === "/"}
            />
          ))}
          <HeaderDropdown
            label="Genres"
            open={openMenu === "genres"}
            onToggle={() => toggleMenu("genres")}
            items={genreLinks}
          />
          <HeaderDropdown
            label="Season"
            open={openMenu === "season"}
            onToggle={() => toggleMenu("season")}
            items={seasonLinks}
          />
          {desktopNav.slice(2).map((link) => (
            <NavLink key={link.label} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <IconButton
            label="Search"
            className="text-slate-500 lg:hidden dark:text-slate-300"
            onClick={() => toggleMenu("search")}
          >
            <SearchIcon />
          </IconButton>

          <label htmlFor={searchId} className="relative hidden w-[220px] lg:block xl:w-[260px]">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              ref={searchInputRef}
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search anime..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-100 pr-16 pl-9 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/15 dark:border-white/8 dark:bg-[#151821] dark:text-white dark:placeholder:text-slate-500"
            />
            <kbd className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-slate-400 dark:border-white/10 dark:bg-[#0f121a] dark:text-slate-500">
              Ctrl K
            </kbd>
          </label>

          <IconButton label="Favorites" href="/profile" className="text-slate-600 dark:text-slate-200">
            <HeartIcon />
          </IconButton>

          <IconButton label="Notifications" badgeCount={3} className="text-slate-600 dark:text-slate-200">
            <BellIcon />
          </IconButton>

          <ProfileMenu showChevron />
        </div>
      </div>

      {openMenu === "search" ? (
        <div className="border-t border-slate-200 px-4 py-3 lg:hidden dark:border-white/5">
          <label htmlFor={`${searchId}-mobile`} className="relative block">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              id={`${searchId}-mobile`}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search anime..."
              autoFocus
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-100 pr-3 pl-9 text-sm text-slate-800 outline-none dark:border-white/8 dark:bg-[#151821] dark:text-white"
            />
          </label>
        </div>
      ) : null}

      {openMenu === "mobile" ? (
        <div
          id="mobile-nav"
          className="max-h-[min(80dvh,640px)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden dark:border-white/5 dark:bg-[#0b0f1a]"
        >
          {mobileNavGroups.map((group, index) => (
            <div
              key={group.id}
              className={index > 0 ? "border-t border-slate-200 dark:border-white/8" : ""}
            >
              <ul className="px-2 py-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-t border-slate-200 px-2 py-3 dark:border-white/8">
            <div className="flex gap-2 px-2 pb-2">
              <Link
                href="/signin"
                onClick={() => setOpenMenu(null)}
                className="flex-1 rounded-full border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700 dark:border-white/10 dark:text-slate-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpenMenu(null)}
                className="flex-1 rounded-full bg-violet-500 py-2.5 text-center text-sm font-semibold text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function NavLink({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-lg px-2.5 py-2 text-sm font-medium transition xl:px-3 ${
        active
          ? "text-violet-600 dark:text-violet-300"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

function HeaderDropdown({
  label,
  open,
  onToggle,
  items,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={onToggle}
        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium transition xl:px-3 ${
          open
            ? "bg-slate-100 text-slate-900 dark:bg-white/5 dark:text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
        }`}
      >
        {label}
        <svg
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`}
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
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute top-[calc(100%+6px)] left-0 z-50 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-[#121826]"
        >
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              role="menuitem"
              onClick={onToggle}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function IconButton({
  label,
  children,
  onClick,
  href,
  badgeCount,
  className = "",
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  badgeCount?: number;
  className?: string;
}) {
  const classes = `relative inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100 dark:hover:bg-white/5 ${className}`;

  const content = (
    <>
      {children}
      {typeof badgeCount === "number" ? (
        <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-[#0b0f1a]">
          {badgeCount}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-label={label} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path
        d="M6.5 9.5a5.5 5.5 0 0 1 11 0c0 4.2 1.5 5.5 1.5 5.5H5s1.5-1.3 1.5-5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
