import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article data-card className={featured ? "md:col-span-8" : "md:col-span-4"}>
      <Link href={`/work/${project.slug}`} className="group block">
        <ProjectVisual project={project} />
        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">
              {project.index} — {project.category}
            </p>
            <h3
              className={`mt-2 tracking-[-0.045em] text-white/95 transition-transform duration-500 motion-safe:group-hover:translate-x-1 ${featured ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}`}
            >
              {project.name}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/58">{project.statement}</p>
          </div>
          <span
            className="mt-5 shrink-0 text-xl text-white/45 transition-all duration-500 ease-out motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1 group-hover:text-signal"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>
      </Link>
    </article>
  );
}
