import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SplitHeadline } from "@/components/motion/split-headline";
import { ProjectVisual } from "@/components/work/project-visual";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project
    ? { title: project.name, description: project.statement }
    : {};
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <main id="main">
      <section className="px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-48">
        <div className="mx-auto max-w-[1440px]">
          <Link
            href="/work"
            className="eyebrow transition-colors hover:text-signal"
            data-hover-lift
          >
            ← All work
          </Link>
          <div className="mt-12 grid gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <p data-motion="page-reveal" className="eyebrow">
                {project.index} / {project.category}
              </p>
              <SplitHeadline
                as="h1"
                immediate={false}
                className="display mt-6 max-w-5xl text-6xl md:text-9xl"
              >
                {project.name}
              </SplitHeadline>
              <p
                data-motion="page-reveal"
                className="lead mt-8 max-w-2xl"
              >
                {project.statement}
              </p>
            </div>
            <div
              data-motion="page-reveal"
              className="self-end md:col-span-3 md:col-start-10"
            >
              <p className="eyebrow">Stack</p>
              <p className="mt-3 text-sm leading-7 text-white/60">
                {project.technologies.join(" · ")}
              </p>
              {(project.github || project.deployed) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition-colors hover:border-signal hover:text-white"
                    >
                      GitHub ↗
                    </a>
                  ) : null}
                  {project.deployed ? (
                    <a
                      href={project.deployed}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition-colors hover:border-signal hover:text-white"
                    >
                      Live Demo ↗
                    </a>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          <div className="mt-16">
            <ProjectVisual project={project} />
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-20 text-ink md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1120px] gap-16 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow !text-ink/55">What it does</p>
          </div>
          <div>
            <p
              data-motion="page-reveal"
              className="text-balance text-3xl leading-[1.2] tracking-[-0.04em] md:text-5xl"
            >
              {project.statement}
            </p>
            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {project.outcomes.map((outcome) => (
                <p
                  data-motion="page-reveal"
                  className="border-t border-ink/15 pt-5 text-base leading-7 text-ink/70"
                  key={outcome}
                >
                  {outcome}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-section="system" className="px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1120px]">
          <p className="eyebrow">System / confirmed components</p>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-5">
            {project.system.map((step, i) => (
              <li
                data-motion="system-step"
                className="min-h-36 bg-ink p-6"
                key={step}
              >
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <p className="mt-8 text-lg tracking-[-0.03em] text-white/90">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-white/10 px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1120px] gap-14 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">Engineering decisions</p>
          </div>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {project.capabilities.map((item, i) => (
              <li
                data-motion="page-reveal"
                className="grid gap-5 py-7 md:grid-cols-[48px_1fr]"
                key={item}
              >
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <span className="text-lg leading-7 text-white/78">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-signal px-5 py-16 text-ink md:px-8 md:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow !text-ink/60">Next project</p>
            <p className="display mt-4 text-5xl md:text-7xl">{next.name}</p>
          </div>
          <Link
            data-magnetic
            data-hover-lift
            className="text-lg underline underline-offset-8 transition-opacity hover:opacity-80"
            href={`/work/${next.slug}`}
          >
            Read case study ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
