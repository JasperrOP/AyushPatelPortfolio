"use client";

import { useLayoutEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Per-route entry transition.
 *
 * The wrapper must NOT carry a persistent `will-change: transform` or any
 * transform once the tween is done: both establish a containing block for
 * `position: fixed` descendants, which is what GSAP uses to pin sections. A
 * lingering one makes pinned stages position against this div instead of the
 * viewport, so they drift out of view and the section reads as blank.
 *
 * will-change is therefore applied only while the tween runs, and both it and
 * the transform are cleared on completion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const page = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = page.current;
    if (!el || prefersReducedMotion()) return;

    let ctx: { revert: () => void } | undefined;

    void import("gsap").then(({ gsap }) => {
      if (!page.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24, willChange: "transform, opacity" },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            onComplete: () => {
              /* Clearing transform AND will-change restores the viewport as the
                 containing block for pinned children. */
              gsap.set(el, { clearProps: "transform,willChange" });
              void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) =>
                ScrollTrigger.refresh(),
              );
            },
          },
        );
      }, page);
    });

    return () => ctx?.revert();
  }, []);

  return <div ref={page}>{children}</div>;
}
