"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthField, EmailIcon, LockIcon } from "@/components/auth/auth-field";

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <AuthShell>
      <div className="mb-5 flex flex-col items-center text-center sm:mb-6">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-violet-400/80 text-violet-500 sm:mb-4 sm:h-[72px] sm:w-[72px] dark:border-violet-400 dark:text-violet-300">
          <svg viewBox="0 0 48 48" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" aria-hidden="true">
            <rect x="10" y="13" width="28" height="20" rx="3.5" stroke="currentColor" strokeWidth="2.2" />
            <path d="M18 36h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M21.5 19.5v7l7-3.5-7-3.5Z" fill="currentColor" />
          </svg>
        </div>

        <h1 className="text-[22px] font-extrabold tracking-[0.08em] text-slate-900 sm:text-[28px] dark:text-white">
          WELCOME BACK
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 sm:mt-2 dark:text-slate-300/80">
          Sign in to continue watching anime.
        </p>
      </div>

      <form className="space-y-3.5 sm:space-y-4" onSubmit={handleSubmit}>
        <AuthField
          id="email"
          label="EMAIL"
          icon={<EmailIcon />}
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
          required
        />

        <div>
          <AuthField
            id="password"
            label="PASSWORD"
            icon={<LockIcon />}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            passwordToggle
            required
          />
          <div className="flex justify-end pt-1.5">
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
          className="auth-login-btn mt-1 flex h-11 w-full items-center justify-center rounded-full text-sm font-bold tracking-[0.22em] text-white transition sm:h-12"
        >
          LOGIN
        </button>
      </form>

      <div className="mt-6 flex items-center gap-3 sm:mt-7">
        <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-400">
          NEW TO NOVA?
        </span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
      </div>

      <div className="mt-3.5 text-center sm:mt-4">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-500 dark:text-violet-300 dark:hover:text-violet-200"
        >
          Create account
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-400 sm:mt-6 dark:text-slate-500">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
          <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        Secure login. We respect your privacy.
      </p>
    </AuthShell>
  );
}
