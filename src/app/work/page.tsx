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
    <main id="main" className="gutter pb-24 pt-32 md:pb-40 md:pt-48">
      <div className="mx-auto max-w-[1600px]">
        <p className="eyebrow text-paper/70">
          Selected work / {String(projects.length).padStart(2, "0")} projects
        </p>
        <SplitHeadline
          as="h1"
          immediate={false}
          className="display mt-10 max-w-5xl text-[clamp(2.75rem,8vw,7rem)] text-paper"
        >
          A closer look at the systems behind the interface.
        </SplitHeadline>

        <div className="mt-24">
          <ProjectShowcase projects={projects} />
        </div>

        <div className="mt-24 border-t border-white/10 pt-12">
          <Link
            data-magnetic
            data-hover-lift
            href="/#contact"
            className="pill border border-white/20 bg-white/[0.04] text-paper hover:bg-paper hover:text-void"
          >
            Start a conversation
            <span className="ml-3" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
