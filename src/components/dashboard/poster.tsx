import Image from "next/image";
import cardLength from "@/imgs/card-length.jpg";
import cardWidth from "@/imgs/card-width.jpg";

export type PosterOrientation = "portrait" | "landscape";

type PosterProps = {
  title: string;
  /** portrait → card-length.jpg (taller); landscape → card-width.jpg (wider) */
  orientation?: PosterOrientation;
  accent?: string;
  className?: string;
  compact?: boolean;
  sizes?: string;
};

export function Poster({
  title,
  orientation = "portrait",
  className = "",
  sizes = "(max-width: 640px) 40vw, 200px",
}: PosterProps) {
  const src = orientation === "landscape" ? cardWidth : cardLength;

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      <Image
        src={src}
        alt={title}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
