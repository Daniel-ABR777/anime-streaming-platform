"use client";

import Link from "next/link";
import { ReactNode, useRef, type ReactElement } from "react";

type SectionRowProps = {
  id?: string;
  title: string;
  icon?: ReactElement;
  children: ReactNode;
  viewAllHref?: string;
};

export function SectionRow({
  id,
  title,
  icon,
  children,
  viewAllHref = "#",
}: SectionRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: -1 | 1) {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.75, 360), behavior: "smooth" });
  }

  return (
    <section id={id} className="scroll-mt-20 space-y-3.5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 sm:text-lg dark:text-white">
          {icon ? <span className="text-[1.05em] leading-none">{icon}</span> : null}
          {title}
        </h2>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <Link
            href={viewAllHref}
            className="text-sm font-medium text-violet-600 transition hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
          >
            View All
          </Link>
          <button
            type="button"
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollBy(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-[#151821] dark:text-slate-300 dark:hover:border-violet-500/40 dark:hover:text-white"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollBy(1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-[#151821] dark:text-slate-300 dark:hover:border-violet-500/40 dark:hover:text-white"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div ref={scrollerRef} className="scrollbar-none flex gap-3.5 overflow-x-auto pb-1 sm:gap-4">
        {children}
      </div>
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M12.5 4.5 7 10l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M7.5 4.5 13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
