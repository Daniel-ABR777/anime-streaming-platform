"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  notifications,
  unreadCount,
  unreadNotifications,
} from "@/data/notifications";

const PREVIEW_LIMIT = 3;

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const menuId = useId();

  const preview = unreadNotifications.slice(0, PREVIEW_LIMIT);

  function clearCloseTimer() {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openMenu() {
    clearCloseTimer();
    setOpen(true);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  }

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
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

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-label="Notifications"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onFocus={openMenu}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
      >
        <BellIcon />
        {unreadCount > 0 ? (
          <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-[#0b0f1a]">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Unread notifications"
          className="absolute top-[calc(100%+8px)] right-0 z-[80] w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 dark:border-white/10 dark:bg-[#12141c] dark:shadow-black/50 sm:w-[360px]"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/8">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Notifications</h2>
            <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[11px] font-semibold text-violet-600 dark:text-violet-300">
              {unreadCount} new
            </span>
          </div>

          {preview.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500">
              You&apos;re all caught up.
            </p>
          ) : (
            <ul className="max-h-[320px] overflow-y-auto py-1">
              {preview.map((item) => (
                <li key={item.id}>
                  <Link
                    href="/profile?tab=notifications"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex gap-3 px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-white/5"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-300">
                      <TypeIcon type={item.type} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </span>
                        {item.unread ? (
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                        ) : null}
                      </span>
                      <span className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        {item.message}
                      </span>
                      <span className="mt-1 block text-[11px] font-medium text-slate-400">
                        {item.timeAgo}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-slate-200 p-2 dark:border-white/8">
            <Link
              href="/profile?tab=notifications"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex h-10 w-full items-center justify-center rounded-xl bg-violet-500 text-xs font-bold tracking-[0.14em] text-white transition hover:brightness-110"
            >
              VIEW ALL
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TypeIcon({ type }: { type: (typeof notifications)[number]["type"] }) {
  if (type === "episode") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
      </svg>
    );
  }
  if (type === "promo") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="m12 3.5 2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.4 6.9 19.2l1-5.7-4.1-4 5.7-.8L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "social") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8v4l2.5 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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
