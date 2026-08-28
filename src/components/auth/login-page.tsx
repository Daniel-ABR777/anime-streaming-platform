"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import authDark from "@/imgs/auth-dark.png";
import authLight from "@/imgs/auth-light.png";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { NovaLogo } from "@/components/auth/nova-logo";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="relative min-h-full overflow-hidden">
      <ThemeToggle />

      {/* Light / dark background images from src/imgs */}
      <Image
        src={authLight}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center dark:hidden"
      />
      <Image
        src={authDark}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-center dark:block"
      />

      {/* Soft vignette to keep the card readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-white/35 dark:from-[#0b0618]/45 dark:via-transparent dark:to-[#070414]/55"
      />

      <main className="relative z-10 flex min-h-full flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="mb-7 sm:mb-8">
          <NovaLogo />
        </div>

        <section className="auth-card w-full max-w-[420px] rounded-[28px] px-7 py-8 sm:px-9 sm:py-9">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-violet-400/80 text-violet-500 dark:border-violet-400 dark:text-violet-300">
              <svg
                viewBox="0 0 48 48"
                className="h-10 w-10"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="10"
                  y="13"
                  width="28"
                  height="20"
                  rx="3.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                />
                <path
                  d="M18 36h12"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M21.5 19.5v7l7-3.5-7-3.5Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <h1 className="text-[28px] font-extrabold tracking-[0.08em] text-slate-900 dark:text-white">
              WELCOME BACK
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300/80">
              Sign in to continue watching anime.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[11px] font-bold tracking-[0.14em] text-slate-700 dark:text-slate-200"
              >
                EMAIL
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400 dark:text-slate-400">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
                    <rect
                      x="3.5"
                      y="5.5"
                      width="17"
                      height="13"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="m5 8 7 5 7-5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input h-12 w-full rounded-xl py-3 pr-4 pl-11 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-[11px] font-bold tracking-[0.14em] text-slate-700 dark:text-slate-200"
              >
                PASSWORD
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400 dark:text-slate-400">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M8 10V8a4 4 0 0 1 8 0v2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input h-12 w-full rounded-xl py-3 pr-12 pl-11 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-2.5 flex w-9 items-center justify-center rounded-lg text-slate-400 transition hover:text-violet-500 dark:text-slate-400 dark:hover:text-violet-300"
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
                      <path
                        d="M3 3l18 18M10.5 10.7a2.5 2.5 0 0 0 3.8 3.2M9.9 5.6A10.8 10.8 0 0 1 12 5.3c5.2 0 9.2 3.5 10.5 6.7a12.4 12.4 0 0 1-4.1 4.9M6.2 6.3A12.3 12.3 0 0 0 1.5 12C2.8 15.2 6.8 18.7 12 18.7c1.2 0 2.3-.2 3.4-.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
                      <path
                        d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex justify-end pt-0.5">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-violet-600 transition hover:text-violet-500 dark:text-violet-300 dark:hover:text-violet-200"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="auth-login-btn mt-1 flex h-12 w-full items-center justify-center rounded-full text-sm font-bold tracking-[0.22em] text-white transition"
            >
              LOGIN
            </button>
          </form>

          <div className="mt-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 dark:text-slate-400">
              NEW TO NOVA?
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-500 dark:text-violet-300 dark:hover:text-violet-200"
            >
              Create account
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <rect
                x="5"
                y="10"
                width="14"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M8 10V8a4 4 0 0 1 8 0v2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Secure login. We respect your privacy.
          </p>
        </section>
      </main>
    </div>
  );
}
