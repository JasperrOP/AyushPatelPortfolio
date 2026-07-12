"use client";

import { useLayoutEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const page = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!page.current || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;

    void import("gsap").then(({ gsap }) => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.fromTo(
          page.current,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out", clearProps: "transform" },
        );
      }, page);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={page} className="will-change-transform">
      {children}
    </div>
  );
}
