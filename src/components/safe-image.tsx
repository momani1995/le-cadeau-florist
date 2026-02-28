"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { normalizeImageSrc } from "@/lib/images";

type SafeImageProps = React.ComponentProps<typeof Image> & {
  /** Placeholder when src is missing or image fails to load */
  fallbackClassName?: string;
};

export function SafeImage({
  src,
  alt,
  onError,
  fallbackClassName,
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = normalizeImageSrc(typeof src === "string" ? src : undefined);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setFailed(true);
    onError?.(e);
  };

  if (failed) {
    const baseClass =
      "flex flex-col items-center justify-center gap-2 bg-[color:rgba(7,19,14,0.95)] text-[color:#f6f1e8]/70";
    const fillClass = props.fill ? " absolute inset-0" : "";
    return (
      <div
        className={fallbackClassName ?? `${baseClass}${fillClass}`}
        aria-hidden
      >
        <ImageIcon className="h-8 w-8 shrink-0 text-brand-gold/60" />
        <span className="text-[0.6rem] uppercase tracking-widest opacity-80">
          Image
        </span>
      </div>
    );
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}
