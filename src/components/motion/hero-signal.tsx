"use client";

import { useLayoutEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export function HeroSignal() {
  const path = useRef<SVGPathElement>(null);
  const section = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !path.current) return;
    let ctx: { revert: () => void } | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.fromTo(
            path.current,
            { strokeDashoffset: 900 },
            {
              strokeDashoffset: 0,
              duration: 2.2,
              ease: "power2.out",
              scrollTrigger: { trigger: section.current, start: "top 90%", once: true },
            },
          );
        }, section);
      },
    );

    return () => ctx?.revert();
  }, []);

  return (
    <div
      ref={section}
      className="relative h-40 w-full overflow-hidden border-y border-white/10 md:h-52"
      aria-hidden="true"
    >
      <div className="precision-grid absolute inset-0" />
      <svg viewBox="0 0 1000 200" className="h-full w-full">
        <path
          ref={path}
          d="M-20,130 C100,130 108,45 230,45 S360,155 470,155 S610,70 710,70 S820,120 1020,120"
          fill="none"
          stroke="#9a7cff"
          strokeWidth="2"
          strokeDasharray="900"
        />
        <circle cx="470" cy="155" r="5" fill="#75e1ff" />
        <circle cx="710" cy="70" r="5" fill="#f4f2ed" />
      </svg>
      <span className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.15em] text-white/45 md:left-8">
        SIGNAL / SYSTEM / OUTCOME
      </span>
    </div>
  );
}
