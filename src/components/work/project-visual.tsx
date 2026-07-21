"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { prefersReducedMotion } from "@/lib/motion";

export function ProjectVisual({ project }: { project: Project }) {
  const root = useRef<HTMLDivElement>(null);
  /* Screenshots are optional — fall back to the generated system map if the
     file hasn't been added to /public yet. */
  const [imageFailed, setImageFailed] = useState(false);

  const pathsByVisual: Record<Project["visual"], string[]> = {
    research: ["M24 165 C110 165 112 56 200 56 S286 123 370 123", "M200 56 C250 56 252 196 408 196"],
    model: ["M26 181 H120 L162 66 L224 181 L273 102 L334 181 L395 67 L452 181"],
    location: ["M35 193 C94 139 104 78 174 115 S252 226 313 150 S397 58 456 96"],
    booking: ["M24 200 H130 V70 H360 V200 H456", "M130 70 L360 200"],
    predictive: ["M24 206 L120 170 L200 190 L280 100 L360 130 L456 44"],
    assessment: ["M40 60 H300", "M40 110 H360", "M40 160 H260", "M40 210 H320"],
  };
  const paths = pathsByVisual[project.visual];

  const nodeYsByVisual: Record<Project["visual"], number[]> = {
    research: [165, 56, 123, 196],
    model: [165, 56, 123, 196],
    location: [162, 105, 160, 92],
    booking: [200, 70, 200, 200],
    predictive: [206, 170, 100, 44],
    assessment: [60, 110, 160, 210],
  };
  const nodeYs = nodeYsByVisual[project.visual];

  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          const mask = root.current!.querySelector<HTMLElement>("[data-reveal-mask]");
          if (mask) {
            gsap.fromTo(
              mask,
              { scaleX: 1, transformOrigin: "left center" },
              {
                scaleX: 0,
                duration: 1.15,
                ease: "power4.inOut",
                scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
              },
            );
          }

          const image = root.current!.querySelector<HTMLElement>("[data-project-image]");
          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.12, autoAlpha: 0 },
              {
                scale: 1,
                autoAlpha: 1,
                duration: 1.3,
                ease: "power3.out",
                scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
              },
            );
            return;
          }

          const paths = root.current!.querySelectorAll<SVGPathElement>("[data-path]");
          const nodes = root.current!.querySelectorAll<SVGCircleElement>("[data-node]");

          paths.forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, autoAlpha: 0 });
          });
          gsap.set(nodes, { scale: 0, transformOrigin: "center center" });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
          });

          paths.forEach((path, i) => {
            const length = path.getTotalLength();
            tl.to(
              path,
              {
                strokeDashoffset: 0,
                autoAlpha: 1,
                duration: 1.2,
                ease: "power2.out",
              },
              i * 0.15,
            );
          });

          tl.to(
            nodes,
            { scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)" },
            "-=0.6",
          );
        }, root);
      },
    );

    return () => ctx?.revert();
  }, []);

  if (project.image && !imageFailed) {
    return (
      <div
        ref={root}
        data-visual
        className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#11151d] will-change-transform"
      >
        <div
          data-project-image
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover object-top"
            priority={false}
            onError={() => setImageFailed(true)}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
        </div>
        <div data-reveal-mask className="reveal-mask" aria-hidden="true" />
        <div className="absolute left-5 top-5 font-mono text-[10px] tracking-[0.16em] text-white/70">
          {project.index} / LIVE PREVIEW
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex justify-between font-mono text-[10px] text-white/70">
          <span>{project.category.toUpperCase()}</span>
          <span>SCREEN CAPTURE</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={root}
      data-visual
      className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#11151d] p-5 will-change-transform"
    >
      <div className="precision-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        data-reveal-mask
        className="reveal-mask"
        aria-hidden="true"
      />
      <div className="absolute left-5 top-5 font-mono text-[10px] tracking-[0.16em] text-white/45">
        {project.index} / SYSTEM MAP
      </div>
      <svg
        viewBox="0 0 480 250"
        className="absolute inset-0 h-full w-full"
        aria-label={`${project.name} system visual`}
        role="img"
      >
        <defs>
          <linearGradient id={`path-${project.slug}`} x1="0" x2="1">
            <stop stopColor="#75e1ff" />
            <stop offset="1" stopColor="#9a7cff" />
          </linearGradient>
        </defs>
        {paths.map((d) => (
          <path
            key={d}
            data-path
            d={d}
            fill="none"
            stroke={`url(#path-${project.slug})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        {[70, 170, 290, 405].map((cx, i) => (
          <circle
            key={cx}
            data-node
            cx={cx}
            cy={nodeYs[i]}
            r="5"
            fill="#f4f2ed"
          />
        ))}
      </svg>
      <div className="absolute bottom-5 left-5 right-5 flex justify-between font-mono text-[10px] text-white/45">
        <span>{project.category.toUpperCase()}</span>
        <span>LIVE LOGIC</span>
      </div>
    </div>
  );
}
