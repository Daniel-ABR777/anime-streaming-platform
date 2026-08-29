"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import dashboardDark from "@/imgs/dashboard-dark.jpg";
import dashboardLight from "@/imgs/dashboard-light.jpg";
import { featuredSlides } from "@/data/dashboard";

const AUTO_MS = 5500;

export function HeroBanner() {
  const total = featuredSlides.length;
  const [index, setIndex] = useState(0);
  const slide = featuredSlides[index] ?? featuredSlides[0];

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (total <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [total, index]);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-xl dark:border-white/10">
      <div className="relative min-h-[300px] sm:min-h-[360px] lg:min-h-[400px]">
        <Image
          src={dashboardLight}
          alt=""
          fill
          priority
          sizes="(max-width: 1400px) 100vw, 1400px"
          className="object-cover object-[72%_center] dark:hidden"
        />
        <Image
          src={dashboardDark}
          alt=""
          fill
          priority
          sizes="(max-width: 1400px) 100vw, 1400px"
          className="hidden object-cover object-[72%_center] dark:block"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#f4f6fb] via-[#f4f6fb]/90 to-transparent dark:from-[#0b0f1a] dark:via-[#0b0f1a]/82 dark:to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#f4f6fb]/95 via-transparent to-transparent dark:from-[#0b0f1a]/90 dark:via-transparent"
        />

        <div className="absolute top-1/2 right-3 z-20 flex -translate-y-1/2 flex-col items-center gap-2 sm:right-5">
          <button
            type="button"
            aria-label="Previous featured slide"
            onClick={goPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/80 bg-white/75 text-lg text-slate-500 shadow-md backdrop-blur transition hover:bg-white dark:border-white/15 dark:bg-black/35 dark:text-white/70 dark:hover:bg-black/55"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next featured slide"
            onClick={goNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/80 bg-white/75 text-lg text-slate-500 shadow-md backdrop-blur transition hover:bg-white dark:border-white/15 dark:bg-black/35 dark:text-white/70 dark:hover:bg-black/55"
          >
            ›
          </button>
        </div>

        <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-between p-5 pr-14 sm:min-h-[360px] sm:p-8 sm:pr-20 lg:min-h-[400px] lg:p-10">
          <div key={slide.id} className="max-w-xl animate-[fadeSlide_420ms_ease]">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-400/15 dark:text-violet-300">
              <span aria-hidden="true">★</span>
              {slide.badge}
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px] lg:leading-[1.1] dark:text-white">
              {slide.title}
            </h1>

            <p className="mt-2 text-sm text-slate-600 sm:text-[15px] dark:text-slate-300">
              {slide.meta}
              <span className="mx-2 text-violet-500">•</span>
              <span className="font-semibold text-violet-600 dark:text-violet-300">
                {slide.episodeLabel}
              </span>
            </p>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-[15px] dark:text-slate-300/85">
              {slide.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 px-5 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:brightness-110"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
                Watch Now
              </button>
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-5 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-violet-300 hover:text-violet-700 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-violet-300/50 dark:hover:text-violet-200"
              >
                <span className="text-lg leading-none">+</span>
                Add to Watchlist
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between gap-4">
            <div className="flex items-center gap-1.5">
              {featuredSlides.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition ${
                    i === index
                      ? "w-5 bg-violet-500"
                      : "w-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-white/25 dark:hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <span className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-300">
              {index + 1} / {total}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
