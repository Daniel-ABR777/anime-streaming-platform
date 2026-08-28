"use client";

import { InputHTMLAttributes, ReactNode, useState } from "react";

type AuthFieldProps = {
  id: string;
  label: string;
  icon: ReactNode;
  type?: string;
  autoComplete?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  passwordToggle?: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type" | "value" | "onChange" | "placeholder" | "autoComplete" | "className"
>;

export function AuthField({
  id,
  label,
  icon,
  type = "text",
  autoComplete,
  placeholder,
  value,
  onChange,
  passwordToggle = false,
  ...rest
}: AuthFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = passwordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[11px] font-bold tracking-[0.14em] text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={inputType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`auth-input h-11 w-full rounded-xl py-3 pl-11 text-sm sm:h-12 ${
            passwordToggle ? "pr-12" : "pr-4"
          }`}
          {...rest}
        />
        {passwordToggle ? (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-2.5 flex w-9 items-center justify-center rounded-lg text-slate-400 transition hover:text-violet-500 dark:hover:text-violet-300"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path
        d="M3 3l18 18M10.5 10.7a2.5 2.5 0 0 0 3.8 3.2M9.9 5.6A10.8 10.8 0 0 1 12 5.3c5.2 0 9.2 3.5 10.5 6.7a12.4 12.4 0 0 1-4.1 4.9M6.2 6.3A12.3 12.3 0 0 0 1.5 12C2.8 15.2 6.8 18.7 12 18.7c1.2 0 2.3-.2 3.4-.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m5 8 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8 10V8a4 4 0 0 1 8 0v2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5.5 19.5c1.2-3.2 3.5-4.8 6.5-4.8s5.3 1.6 6.5 4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
