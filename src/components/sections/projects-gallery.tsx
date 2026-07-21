"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { ProjectThumb } from "@/components/work/project-thumb";

/**
 * Horizontal project gallery with a live "n — total" counter.
 *
 * On desktop the orchestrator pins this stage and scrubs the track from right
 * to left, so cards enter from the right edge. On mobile it degrades to a
 * native swipe rail.
 */
export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let ticking = false;

    const measure = () => {
      ticking = false;
      const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-gallery-card]"));
      if (!cards.length) return;

      const centre = window.innerWidth / 2;
      let nearest = 0;
      let shortest = Infinity;

      cards.forEach((card, i) => {
        const box = card.getBoundingClientRect();
        const distance = Math.abs(box.left + box.width / 2 - centre);
        if (distance < shortest) {
          shortest = distance;
          nearest = i;
        }
      });

      setActive(nearest + 1);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      data-pin="gallery"
      className="flex min-h-[80svh] flex-col justify-center md:h-[100svh] md:min-h-0"
    >
      <div
        ref={railRef}
        data-rail="gallery"
        className="overflow-x-auto pb-4 [scrollbar-width:none] md:overflow-hidden [&::-webkit-scrollbar]:hidden"
      >
        <div
          data-rail-track
          className="flex w-max gap-5 px-[clamp(1.25rem,4vw,4rem)] md:gap-7"
        >
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              data-gallery-card
              data-hover-lift
              className="group relative flex h-[clamp(24rem,62vh,32rem)] w-[min(80vw,22rem)] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-colors duration-500 hover:border-violet md:w-[24rem]"
            >
              {/* Visual */}
              <div className="relative h-[46%] w-full shrink-0 overflow-hidden border-b border-white/10">
                <ProjectThumb project={project} />
                <span className="mono absolute right-5 top-5 text-xs text-violet-bright">
                  {project.index}
                </span>
              </div>

              {/* Copy */}
              <div className="relative flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="mono text-[0.62rem] uppercase leading-relaxed tracking-[0.18em] text-paper/45">
                    {project.category}
                  </p>
                  <h3 className="display mt-3 text-[clamp(1.4rem,2.2vw,1.9rem)] leading-tight text-paper">
                    {project.name}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-paper/55">
                    {project.statement}
                  </p>
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="mono rounded-full border border-white/12 px-3 py-1 text-[0.62rem] text-paper/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="mono mt-5 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-violet-bright opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    View case study
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mono mt-8 flex items-center justify-center gap-4 text-sm text-paper/70">
        <span className="tabular-nums text-paper">{active}</span>
        <span className="h-px w-8 bg-white/30" aria-hidden="true" />
        <span className="tabular-nums">{projects.length}</span>
      </div>
    </div>
  );
}
