/** Shared motion tokens — transform & opacity only for 60fps GPU paths */
export const EASE = {
  out: "power3.out",
  inOut: "power4.inOut",
  expo: "expo.out",
  smooth: "power2.inOut",
} as const;

export const DURATION = {
  fast: 0.45,
  base: 0.75,
  slow: 1.1,
  hero: 1.4,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
}

export function isDesktopPointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
}
