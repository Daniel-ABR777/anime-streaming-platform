"use client";

import { ReactNode, useRef } from "react";

type SectionRowProps = {
  id?: string;
  title: string;
  children: ReactNode;
  viewAllHref?: string;
};

export function SectionRow({ id, title, children, viewAllHref = "#" }: SectionRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: -1 | 1) {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.75, 320), behavior: "smooth" });
  }

  return (
    <section id={id} className="scroll-mt-20 space-y-3">
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
          className="absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-base text-slate-700 shadow-md backdrop-blur sm:h-9 sm:w-9 dark:border-white/10 dark:bg-[#121826]/95 dark:text-white"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label={`Scroll ${title} right`}
          onClick={() => scrollBy(1)}
          className="absolute top-1/2 right-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-base text-slate-700 shadow-md backdrop-blur sm:h-9 sm:w-9 dark:border-white/10 dark:bg-[#121826]/95 dark:text-white"
        >
          ›
        </button>

        <div
          ref={scrollerRef}
          className="scrollbar-none flex gap-3 overflow-x-auto px-10 pb-1 sm:px-11"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
