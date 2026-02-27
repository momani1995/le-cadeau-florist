"use client";

import { Flower } from "lucide-react";

export function FleurDeLis({
  className,
  size = 24,
  strokeWidth = 1.5,
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  const baseClass =
    "relative inline-flex items-center justify-center";
  const mergedClass = className
    ? `${baseClass} ${className}`
    : baseClass;

  return (
    <span className={mergedClass} aria-hidden>
      {/* Soft circular halo to echo a crest */}
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.24),transparent_70%)] blur-[1.5px]" />

      {/* Primary Lucide Flower, tightened stroke to feel more emblematic */}
      <Flower
        size={size}
        strokeWidth={strokeWidth + 0.2}
        className="relative"
      />

      {/* Secondary rotated flower to suggest the classic three-petal fleur-de-lis symmetry */}
      <Flower
        size={size * 0.68}
        strokeWidth={strokeWidth}
        className="absolute rotate-45 opacity-55"
      />
    </span>
  );
}

