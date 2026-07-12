"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "./project-visual";
import { prefersReducedMotion } from "@/lib/motion";

type QuickSetter = (value: number) => void;

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<QuickSetter | null>(null);
  const quickY = useRef<QuickSetter | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  const desktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;

  useEffect(() => {
    if (!previewRef.current || prefersReducedMotion()) return;
    void import("gsap").then(({ gsap }) => {
      if (!previewRef.current) return;
      gsap.set(previewRef.current, { xPercent: -50, yPercent: -50 });
      quickX.current = gsap.quickTo(previewRef.current, "x", { duration: 0.55, ease: "power3.out" });
      quickY.current = gsap.quickTo(previewRef.current, "y", { duration: 0.55, ease: "power3.out" });
    });
  }, []);

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!listRef.current || !desktop) return;
    const box = listRef.current.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    if (quickX.current && quickY.current) {
      quickX.current(x);
      quickY.current(y);
    } else if (previewRef.current) {
      previewRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    }
  };

  return (
    <div
      ref={listRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setReady(false)}
      className="relative"
    >
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          data-hover-lift
          data-motion="project-row"
          onPointerEnter={() => {
            setActiveIndex(i);
            setReady(true);
          }}
          onPointerLeave={() => setReady(false)}
          className="group relative flex items-center justify-between gap-6 overflow-hidden border-b border-white/10 py-7 transition-colors duration-500 first:border-t md:py-9"
        >
          {/* Ghost index number */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 select-none font-mono text-[6rem] font-medium leading-none text-white/[0.035] transition-colors duration-500 group-hover:text-signal/[0.08] md:text-[9rem]"
          >
            {project.index}
          </span>

          {/* Fill sweep on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-white/[0.035] transition-transform duration-500 ease-out group-hover:scale-x-100"
          />

          <div className="relative z-10 flex min-w-0 flex-1 items-baseline gap-4 md:gap-8">
            <span className="shrink-0 font-mono text-xs text-signal">{project.index}</span>
            <div className="min-w-0">
              <h3 className="truncate text-3xl tracking-[-0.045em] text-white/90 transition-all duration-500 group-hover:translate-x-2 group-hover:text-white sm:text-4xl md:text-6xl">
                {project.name}
              </h3>
              <p className="mt-2 hidden max-w-md truncate text-sm text-white/45 transition-colors duration-500 group-hover:text-white/65 md:block">
                {project.category}
              </p>
            </div>
          </div>

          <div className="relative z-10 hidden shrink-0 items-center gap-3 md:flex">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] tracking-[0.06em] text-white/45 transition-colors duration-500 group-hover:border-signal/40 group-hover:text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>

          <span
            className="relative z-10 shrink-0 text-2xl text-white/35 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal"
            aria-hidden="true"
          >
            ↗
          </span>
        </Link>
      ))}

      {/* Cursor-following live preview (desktop only) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 z-20 hidden w-[340px] rotate-[-2deg] transition-opacity duration-300 ease-out md:block ${
          ready && activeIndex !== null ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="scale-95 shadow-card-hover transition-transform duration-300 ease-out" style={{ transform: ready ? "scale(1)" : "scale(0.92)" }}>
          {activeIndex !== null ? <ProjectVisual project={projects[activeIndex]} /> : null}
        </div>
      </div>
    </div>
  );
}
