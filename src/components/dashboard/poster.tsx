type PosterProps = {
  title: string;
  accent: string;
  className?: string;
  compact?: boolean;
};

export function Poster({ title, accent, className = "", compact = false }: PosterProps) {
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${accent} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent_55%)]" />
      <div
        className={`absolute inset-0 flex items-center justify-center font-black tracking-wide text-white/90 ${
          compact ? "text-lg" : "text-2xl"
        }`}
      >
        {initials}
      </div>
    </div>
  );
}
