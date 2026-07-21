"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so scroll position and
 * ScrollTrigger stay on the same frame. Uses the standard window-scroller
 * integration — no scrollerProxy — which is what pinned triggers expect.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: Lenis | null = null;
    let cleanup = () => {};
    let cancelled = false;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);

        lenis = new Lenis({
          duration: 1.05,
          smoothWheel: true,
          touchMultiplier: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        lenis.on("scroll", ScrollTrigger.update);

        const tick = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        cleanup = () => {
          gsap.ticker.remove(tick);
          lenis?.destroy();
          lenis = null;
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <>{children}</>;
}
