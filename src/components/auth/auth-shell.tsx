import Image from "next/image";
import { ReactNode } from "react";
import authDark from "@/imgs/auth-dark.png";
import authLight from "@/imgs/auth-light.png";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <ThemeToggle />

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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-white/35 dark:from-[#0b0618]/45 dark:via-transparent dark:to-[#070414]/55"
      />

      <main className="relative z-10 flex min-h-dvh flex-col items-center px-4 py-6 sm:px-6 sm:py-10">
        <section className="auth-card my-auto w-full max-w-[420px] rounded-[22px] px-5 py-6 sm:rounded-[28px] sm:px-9 sm:py-9">
          {children}
        </section>
      </main>
    </div>
  );
}
