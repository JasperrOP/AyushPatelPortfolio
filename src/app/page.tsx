import Link from "next/link";
import { Hero, DisciplineBand } from "@/components/sections/hero";
import { SkillsRail } from "@/components/sections/skills-rail";
import { Experience } from "@/components/sections/experience";
import { ProjectsGallery } from "@/components/sections/projects-gallery";
import { About, Recognition } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { SectionHead } from "@/components/ui/section-head";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <DisciplineBand />
      <SkillsRail />
      <Experience />

      {/* No overflow-hidden and no bottom padding here: overflow clipping on an
          ancestor breaks GSAP pinning, and trailing padding would leave an empty
          run after the pin releases. */}
      <section
        id="work"
        data-section="work"
        className="relative pt-[clamp(6rem,12vw,12rem)]"
      >
        <SectionHead
          eyebrow="Featured work"
          title="Projects"
          statement="A collection of projects spanning agentic AI, full-stack development, and machine learning."
        />

        <div className="mt-16 md:mt-20">
          <ProjectsGallery projects={projects} />
        </div>

        <div className="flex justify-center pb-20 pt-4">
          <Link
            data-hover-lift
            data-magnetic
            href="/work"
            className="pill border border-white/20 bg-white/[0.04] text-paper hover:bg-paper hover:text-void"
          >
            All {projects.length} projects
            <span className="ml-3" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </section>

      <About />
      <Recognition />
      <Contact />
    </main>
  );
}
