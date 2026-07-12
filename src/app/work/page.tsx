import type { Metadata } from "next";
import Link from "next/link";
import { SplitHeadline } from "@/components/motion/split-headline";
import { ProjectShowcase } from "@/components/work/project-showcase";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected AI engineering and full-stack projects by Ayush Patel.",
};

export default function WorkPage() {
  return (
    <main id="main" className="px-5 pb-24 pt-32 md:px-8 md:pb-40 md:pt-48">
      <div className="mx-auto max-w-[1440px]">
        <p data-motion="page-reveal" className="eyebrow">
          Selected work / {String(projects.length).padStart(2, "0")} projects
        </p>
        <SplitHeadline
          as="h1"
          immediate={false}
          className="display mt-6 max-w-4xl text-6xl md:text-9xl"
        >
          A closer look at the systems behind the interface.
        </SplitHeadline>
        <div className="mt-20">
          <ProjectShowcase projects={projects} />
        </div>
        <div className="mt-24 border-t border-white/10 pt-12">
          <Link
            data-magnetic
            data-hover-lift
            href="/#contact"
            className="text-lg text-white/70 transition-colors hover:text-white"
          >
            Start a conversation ↗
          </Link>
        </div>
      </div>
    </main>
  );
}
