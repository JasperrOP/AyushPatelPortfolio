import Link from "next/link";
import { HeroReveal } from "@/components/motion/hero-reveal";
import { HeroSignal } from "@/components/motion/hero-signal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { ParticleField } from "@/components/motion/particle-field";
import { ProjectShowcase } from "@/components/work/project-showcase";
import { projects, skills } from "@/lib/projects";

const focusAreas = [
  { index: "01", label: "Full-stack development" },
  { index: "02", label: "Agentic AI & RAG" },
  { index: "03", label: "System design" },
  { index: "04", label: "DSA problems", counter: 220, suffix: "+" },
];

const experienceItems = [
  "Built multi-agent workflows and RAG pipelines for retrieval and task automation.",
  "Implemented observability, fallback mechanisms, and guardrails for more reliable AI workflows.",
  "Built an autonomous HRMS for leave management, payroll, and attendance; estimated manual processing effort reduced by 60–70%.",
  "Integrated autonomous agents with backend REST APIs and databases.",
];

export default function HomePage() {
  return (
    <main id="main">
      <HeroReveal />
      <HeroSignal />

      {/* Focus areas — horizontal rail with counter */}
      <section data-section="focus" className="section-pad px-5 md:px-8">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow">Focus areas</p>
          <div className="mt-8 grid border-y border-white/10 md:grid-cols-4">
            {focusAreas.map((item) => (
              <div
                data-motion="rail"
                className="border-b border-white/10 py-8 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
                key={item.index}
              >
                <span className="mr-3 font-mono text-xs text-signal">{item.index}</span>
                <span className="text-2xl tracking-[-0.04em] text-white/90">
                  {item.counter ? (
                    <>
                      <span data-counter={item.counter} data-counter-suffix={item.suffix}>
                        0{item.suffix}
                      </span>{" "}
                      {item.label}
                    </>
                  ) : (
                    item.label
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience — clip-path panel + bullet cascade */}
      <section
        id="experience"
        data-section="experience"
        className="bg-paper px-5 py-20 text-ink md:px-8 md:py-32"
      >
        <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow !text-ink/55">Experience / 2026 — present</p>
            <h2 className="display mt-5 text-5xl md:text-7xl">
              OxiqAI<span className="text-signal">.</span>
            </h2>
            <p className="mt-4 font-mono text-xs text-ink/55">
              GENAI ENGINEER INTERN · REMOTE, PUNE, INDIA
            </p>
          </div>
          <div
            data-motion="experience-panel"
            className="md:col-span-7 md:col-start-6"
          >
            <p className="text-balance text-2xl leading-[1.25] tracking-[-0.035em] md:text-4xl">
              Developing LLM-powered applications and agentic AI architectures with modular,
              reusable agent and tool components.
            </p>
            <ul className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
              {experienceItems.map((item) => (
                <li
                  data-motion="experience-item"
                  className="py-5 text-sm leading-7 text-ink/70"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Work — project cards with clip-path reveals */}
      <section id="work" data-section="work" className="section-pad relative px-5 md:px-8">
        <ParticleField count={18} />
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p data-motion="work-part" className="eyebrow">
                Selected work
              </p>
              <SplitHeadline
                as="h2"
                immediate={false}
                className="display mt-5 text-5xl md:text-7xl"
              >
                Systems, made tangible.
              </SplitHeadline>
            </div>
            <Link
              data-motion="work-part"
              data-hover-lift
              href="/work"
              className="hidden shrink-0 text-sm text-white/65 transition-colors hover:text-white md:block"
            >
              All projects ↗
            </Link>
          </div>
          <div className="mt-16">
            <ProjectShowcase projects={projects} />
          </div>
          <div className="mt-14 flex justify-center md:hidden">
            <Link
              data-hover-lift
              href="/work"
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              All {projects.length} projects ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Skills — row slide from left */}
      <section
        data-section="skills"
        className="border-y border-white/10 section-pad px-5 md:px-8"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow">Technical capability</p>
          <div className="mt-8 divide-y divide-white/10 border-t border-white/10">
            {skills.map(([name, detail], index) => (
              <div
                data-motion="skills-row"
                className="grid gap-4 py-8 md:grid-cols-12 md:items-center"
                key={name}
              >
                <p className="font-mono text-xs text-signal md:col-span-3">
                  0{index + 1} / {name}
                </p>
                <p className="text-lg leading-8 text-white/72 md:col-span-8">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education — asymmetric column reveals */}
      <section data-section="education" className="section-pad relative px-5 md:px-8">
        <ParticleField count={14} />
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow">Education & recognition</p>
          <div className="mt-10 grid gap-14 md:grid-cols-2 md:gap-20">
            <div data-motion="education-left">
              <h2 className="text-3xl tracking-[-0.04em] md:text-4xl">
                B.Tech, Computer Science & Engineering (AI & ML)
              </h2>
              <p className="mt-4 text-white/60">
                Adani University, Ahmedabad · June 2023 — Present
              </p>
              <p className="mt-3 font-mono text-sm text-signal">CGPA 8.72 / 10</p>
            </div>
            <ul
              data-motion="education-right"
              className="space-y-5 border-l border-white/12 pl-7 text-sm leading-7 text-white/68"
            >
              <li>
                <span data-counter={220} data-counter-suffix="+">
                  0+
                </span>{" "}
                Data Structures & Algorithms problems solved across coding platforms.
              </li>
              <li>2nd place — CodeCrypts, C language puzzles (intracollege).</li>
              <li>
                Smart India Hackathon 2024 · HackOut 2025 (DA-IICT) · Odoo Hackathon x Adani
                University 2026.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact — scale-in blocks + magnetic CTA */}
      <section
        id="contact"
        data-section="contact"
        className="bg-signal px-5 py-20 text-ink md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <p data-motion="contact-part" className="eyebrow !text-ink/60">
            Contact
          </p>
          <SplitHeadline
            as="h2"
            immediate={false}
            className="display mt-6 max-w-5xl text-5xl md:text-8xl"
          >
            {"Let's build something thoughtful."}
          </SplitHeadline>
          <p data-motion="contact-part" className="lead mt-8 max-w-xl !text-ink/75">
            For opportunities involving agentic AI, RAG, full-stack development, or backend
            systems, reach out by email.
          </p>
          <a
            data-motion="contact-part"
            data-magnetic
            data-hover-lift
            href="mailto:ayush30904@gmail.com"
            className="mt-10 inline-flex items-center border-b border-ink pb-2 text-xl md:text-3xl"
          >
            ayush30904@gmail.com <span className="ml-4" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
