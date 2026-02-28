/**
 * Ensures image paths are root-relative (from public/) so they resolve
 * correctly on any route (e.g. /product/123) and never as relative paths.
 */
const FALLBACK_IMAGE = "/assets/hero-tableau.png";

/** Base64 forest-green blur placeholder for hero images (10x10 SVG #050b08) */
export const FOREST_GREEN_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMDUwYjA4Ii8+PC9zdmc+";

export function normalizeImageSrc(raw: string | undefined): string {
  if (!raw || typeof raw !== "string") return FALLBACK_IMAGE;
  const trimmed = raw.trim();
  if (!trimmed) return FALLBACK_IMAGE;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}
