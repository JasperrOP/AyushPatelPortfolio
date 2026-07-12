"use client";

import { useLayoutEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: string;
  className?: string;
  accent?: string;
  as?: "h1" | "h2";
  /** When true, animates on mount (hero). Otherwise scroll-triggered. */
  immediate?: boolean;
};

export function SplitHeadline({
  children,
  className = "",
  accent,
  as: Tag = "h1",
  immediate = true,
}: Props) {
  const root = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          const chars = root.current!.querySelectorAll<HTMLElement>("[data-char]");
          gsap.set(chars, { yPercent: 108, autoAlpha: 0 });

          const tween = gsap.to(chars, {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.72,
            stagger: 0.016,
            ease: "power4.out",
            clearProps: "transform",
          });

          if (!immediate) {
            gsap.timeline({
              scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
            }).add(tween, 0);
          } else {
            gsap.timeline({ delay: 0.12 }).add(tween, 0);
          }
        }, root);
      },
    );

    return () => ctx?.revert();
  }, [immediate]);

  const words = children.split(" ");

  return (
    <Tag
      ref={root}
      aria-label={`${children}${accent ? ` ${accent}` : ""}`}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span
          className="mr-[.23em] inline-block overflow-hidden align-top"
          key={`${word}-${wordIndex}`}
        >
          {[...word].map((char, charIndex) => (
            <span
              data-char
              className="inline-block will-change-transform"
              aria-hidden="true"
              key={`${char}-${charIndex}`}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
      {accent && (
        <>
          <span className="inline-block overflow-hidden align-top" aria-hidden="true">
            <span data-char className="inline-block will-change-transform">
              &nbsp;
            </span>
          </span>
          <span className="inline-block overflow-hidden align-top">
            <span
              data-char
              className="outline-text inline-block will-change-transform"
              aria-hidden="true"
            >
              {accent}
            </span>
          </span>
        </>
      )}
    </Tag>
  );
}
