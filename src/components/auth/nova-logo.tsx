export function NovaLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-3">
        <svg
          width="46"
          height="46"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="novaN"
              x1="8"
              y1="4"
              x2="40"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#C084FC" />
              <stop offset="0.45" stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#6D28D9" />
            </linearGradient>
          </defs>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.2 6.2C10.4 6.2 9.75 6.85 9.75 7.65V40.35C9.75 41.15 10.4 41.8 11.2 41.8H15.55C16.2 41.8 16.78 41.4 17.02 40.8L28.55 12.2H31.9C33.55 12.2 34.9 13.55 34.9 15.2V40.35C34.9 41.15 35.55 41.8 36.35 41.8H38.25C39.05 41.8 39.7 41.15 39.7 40.35V7.65C39.7 6.85 39.05 6.2 38.25 6.2H33.85C33.2 6.2 32.62 6.6 32.38 7.2L20.85 35.8H17.55C15.9 35.8 14.55 34.45 14.55 32.8V7.65C14.55 6.85 13.9 6.2 13.1 6.2H11.2Z"
            fill="url(#novaN)"
          />
        </svg>

        <div className="flex flex-col leading-none">
          <span className="text-[28px] font-extrabold tracking-[0.18em] text-slate-900 dark:text-white">
            NOVA
          </span>
          <span className="mt-1 text-[15px] font-semibold tracking-[0.55em] text-slate-700 dark:text-white/90">
            STREAM
          </span>
        </div>
      </div>
      <p className="text-[10px] font-medium tracking-[0.35em] text-slate-500 dark:text-violet-200/70">
        ANIME. UNLIMITED.
      </p>
    </div>
  );
}
