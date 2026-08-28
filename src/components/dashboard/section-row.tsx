"use client";

import { ReactNode, useRef } from "react";

type SectionRowProps = {
  title: string;
  children: ReactNode;
  viewAllHref?: string;
};

export function SectionRow({ title, children, viewAllHref = "#" }: SectionRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: -1 | 1) {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.8, 420), behavior: "smooth" });
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">{title}</h2>
        <a
          href={viewAllHref}
          className="text-sm font-medium text-violet-600 transition hover:text-violet-500 dark:text-violet-300 dark:hover:text-violet-200"
        >
          View All →
        </a>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label={`Scroll ${title} left`}
          onClick={() => scrollBy(-1)}
          className="absolute top-1/2 left-0 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-md backdrop-blur md:flex dark:border-white/10 dark:bg-[#121826]/90 dark:text-white"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label={`Scroll ${title} right`}
          onClick={() => scrollBy(1)}
          className="absolute top-1/2 right-0 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-md backdrop-blur md:flex dark:border-white/10 dark:bg-[#121826]/90 dark:text-white"
        >
          ›
        </button>

        <div
          ref={scrollerRef}
          className="scrollbar-none flex gap-3 overflow-x-auto px-0 pb-1 md:px-11"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
