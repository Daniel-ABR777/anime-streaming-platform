"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import {
  AuthField,
  EmailIcon,
  LockIcon,
  UserIcon,
} from "@/components/auth/auth-field";

export function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    router.push("/");
  }

  return (
    <AuthShell>
      <div className="mb-5 flex flex-col items-center text-center sm:mb-6">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-violet-400/80 text-violet-500 sm:mb-4 sm:h-[72px] sm:w-[72px] dark:border-violet-400 dark:text-violet-300">
          <svg viewBox="0 0 48 48" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" aria-hidden="true">
            <circle cx="20" cy="18" r="6" stroke="currentColor" strokeWidth="2.2" />
            <path
              d="M8.5 36c1.6-5 5-7.5 11.5-7.5S30.4 31 32 36"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M33 16v10M28 21h10"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="text-[22px] font-extrabold tracking-[0.08em] text-slate-900 sm:text-[28px] dark:text-white">
          CREATE ACCOUNT
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 sm:mt-2 dark:text-slate-300/80">
          Join Nova and start watching anime.
        </p>
      </div>

      <form className="space-y-3.5 sm:space-y-4" onSubmit={handleSubmit}>
        <AuthField
          id="username"
          label="USERNAME"
          icon={<UserIcon />}
          type="text"
          autoComplete="username"
          placeholder="Choose a username"
          value={username}
          onChange={setUsername}
          required
          minLength={3}
        />

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

        <AuthField
          id="password"
          label="PASSWORD"
          icon={<LockIcon />}
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            if (error) setError("");
          }}
          passwordToggle
          required
          minLength={8}
        />

        <AuthField
          id="confirmPassword"
          label="CONFIRM PASSWORD"
          icon={<LockIcon />}
          autoComplete="new-password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(value) => {
            setConfirmPassword(value);
            if (error) setError("");
          }}
          passwordToggle
          required
          minLength={8}
        />

        {error ? (
          <p className="text-sm font-medium text-rose-500 dark:text-rose-400" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="auth-login-btn mt-1 flex h-11 w-full items-center justify-center rounded-full text-sm font-bold tracking-[0.18em] text-white transition sm:h-12 sm:tracking-[0.22em]"
        >
          SIGN UP
        </button>
      </form>

      <div className="mt-6 flex items-center gap-3 sm:mt-7">
        <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        <span className="text-[11px] font-semibold tracking-[0.14em] text-slate-400 sm:tracking-[0.18em]">
          ALREADY A MEMBER?
        </span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
      </div>

      <div className="mt-3.5 text-center sm:mt-4">
        <Link
          href="/signin"
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-500 dark:text-violet-300 dark:hover:text-violet-200"
        >
          Sign in
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-400 sm:mt-6 dark:text-slate-500">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
          <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        Secure signup. We respect your privacy.
      </p>
    </AuthShell>
  );
}
