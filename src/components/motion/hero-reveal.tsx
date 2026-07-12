"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { SplitHeadline } from "./split-headline";
import { prefersReducedMotion } from "@/lib/motion";

export function HeroReveal() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let detachMove: (() => void) | undefined;

    void import("gsap").then(({ gsap }) => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from("[data-hero='eyebrow']", { y: 20, autoAlpha: 0, duration: 0.7 })
          .from("[data-hero='glow']", { scale: 0.6, autoAlpha: 0, duration: 1.4, ease: "power2.out" }, 0)
          .from(
            "[data-hero='desc']",
            { y: 28, autoAlpha: 0, duration: 0.85, stagger: 0.12 },
            "-=0.55",
          )
          .from("[data-hero='cta']", { y: 22, autoAlpha: 0, duration: 0.7 }, "-=0.45")
          .from("[data-hero='meta'] > *", { y: 16, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, "-=0.35");

        if (window.matchMedia("(min-width: 768px) and (pointer: fine)").matches) {
          const glow = root.current!.querySelector<HTMLElement>("[data-hero='glow']");
          const grid = root.current!.querySelector<HTMLElement>("[data-hero='grid']");
          if (glow) {
            const glowX = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3.out" });
            const glowY = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3.out" });
            const gridX = grid ? gsap.quickTo(grid, "x", { duration: 1.2, ease: "power3.out" }) : null;
            const gridY = grid ? gsap.quickTo(grid, "y", { duration: 1.2, ease: "power3.out" }) : null;

            const onMove = (event: PointerEvent) => {
              const box = root.current!.getBoundingClientRect();
              const relX = (event.clientX - box.left) / box.width - 0.5;
              const relY = (event.clientY - box.top) / box.height - 0.5;
              glowX(relX * 60);
              glowY(relY * 60);
              gridX?.(relX * -14);
              gridY?.(relY * -14);
            };
            const el = root.current!;
            el.addEventListener("pointermove", onMove);
            detachMove = () => el.removeEventListener("pointermove", onMove);
          }
        }
      }, root);
    });

    return () => {
      detachMove?.();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-14 pt-28 md:px-8 md:pb-20"
      aria-label="Introduction"
    >
      <div data-hero="grid" className="precision-grid absolute inset-0 opacity-35 will-change-transform" aria-hidden="true" />
      <div
        data-hero="glow"
        className="absolute left-1/2 top-1/2 h-[min(600px,80vw)] w-[min(600px,80vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[150px] will-change-transform"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1440px]">
        <p data-hero="eyebrow" className="eyebrow">
          Software Engineer &amp; AI/ML Engineer — Gujarat, India
        </p>

        <SplitHeadline
          className="display text-balance mt-6 text-[clamp(3.6rem,13.5vw,11.5rem)]"
        >
          Ayush Patel
        </SplitHeadline>

        <p
          data-hero="desc"
          className="mt-5 max-w-2xl text-xl leading-[1.35] tracking-[-0.02em] text-white/55 md:text-3xl"
        >
          Full-stack engineering, meet{" "}
          <span className="outline-text">intelligent systems.</span>
        </p>

        <div className="mt-9 grid max-w-3xl gap-7 md:grid-cols-[1fr_auto] md:items-end">
          <p data-hero="desc" className="max-w-xl text-base leading-8 text-white/60 md:text-lg">
            I design and ship production software end to end — from ReactJS, Next.js, FastAPI, and
            Node.js applications to agentic, LLM-powered systems built with LangChain, LangGraph,
            and Retrieval-Augmented Generation.
          </p>
          <Link
            data-hero="cta"
            data-magnetic
            href="#work"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink shadow-card transition-shadow hover:shadow-card-hover"
          >
            Explore selected work <span aria-hidden="true">↓</span>
          </Link>
        </div>

        <div
          data-hero="meta"
          className="mt-12 grid gap-2 border-t border-white/15 pt-5 text-xs text-white/45 md:grid-cols-3"
        >
          <span>Unjha, Mehsana, Gujarat, India</span>
          <span>GenAI Engineer Intern · OxiqAI</span>
          <span className="md:text-right">May 2026 — Present</span>
        </div>
      </div>
    </section>
  );
}
