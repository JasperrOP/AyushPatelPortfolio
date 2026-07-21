import { SectionHead } from "@/components/ui/section-head";
import { AboutPortrait } from "@/components/sections/about-portrait";

/**
 * Editorial break: a violet-tinted panel lifts the section off the black
 * backdrop without introducing colours from outside the palette.
 */
export function About() {
  return (
    <section
      id="about"
      data-section="about"
      className="relative overflow-hidden section-pad"
    >
      {/* Violet-tinted panel — distinguishes the section without leaving the palette */}
      <div
        className="absolute inset-0 border-y border-violet/20 bg-[linear-gradient(180deg,rgba(20,12,42,0.55)_0%,rgba(28,16,58,0.75)_50%,rgba(20,12,42,0.55)_100%)]"
        aria-hidden="true"
      />

      <div className="relative">
        <SectionHead
          eyebrow="Code with purpose, build to scale"
          title="About"
          statement="Passionate about clean architecture — I build reliable AI systems and full-stack products from prototype to production."
        />

      <div className="gutter mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-12">
        {/* Portrait — rotates on scroll */}
        <div className="md:col-span-4">
          <AboutPortrait />
        </div>

        <div data-anim="about-left" className="md:col-span-4">
          <div className="rounded-3xl border border-violet/25 bg-black/40 p-8 backdrop-blur-sm">
            <p className="display text-[clamp(2.5rem,5vw,4rem)] leading-none text-violet-bright">
              8.72
              <span className="text-[0.4em] text-paper/50"> / 10</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper/60">
              CGPA — B.Tech Computer Science &amp; Engineering (AI &amp; ML),
              Adani University, Ahmedabad. June 2023 — present.
            </p>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="display text-[clamp(2.5rem,5vw,4rem)] leading-none text-violet-bright">
                <span data-counter={220} data-counter-suffix="+">
                  0+
                </span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-paper/60">
                Data Structures &amp; Algorithms problems solved across coding
                platforms.
              </p>
            </div>
          </div>
        </div>

        <div data-anim="about-right" className="space-y-6 md:col-span-4">
          {[
            "I'm a Software and AI/ML Engineer focused on the part of the stack where language models meet real systems — retrieval, tool use, and the guardrails that keep them honest.",
            "Most of what I build starts as a question about reliability. An agent that answers correctly once is a demo; one that recovers from a failed tool call, logs why, and falls back cleanly is a system. That gap is where I spend my time.",
            "Outside of agentic work I build full-stack products end to end — typed React frontends, real-time Node and FastAPI services, and the databases underneath. 220+ DSA problems keep the fundamentals sharp.",
            "Currently a GenAI Engineer Intern at OxiqAI, working on LLM-powered applications and modular agent architectures.",
          ].map((para) => (
            <p
              key={para}
              data-anim="about-para"
              className="text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.75] text-paper/75"
            >
              <span className="mr-2 text-violet-bright" aria-hidden="true">
                ✳
              </span>
              {para}
            </p>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const RECOGNITION = [
  { label: "2nd place", detail: "CodeCrypts — C language puzzles, intracollege." },
  { label: "SIH 2024", detail: "Smart India Hackathon participant." },
  { label: "HackOut 2025", detail: "DA-IICT, Gandhinagar." },
  { label: "Odoo x Adani", detail: "Odoo Hackathon x Adani University, 2026." },
];

/** Recognition strip — numbered rows that slide in from the left. */
export function Recognition() {
  return (
    <section data-section="recognition" className="relative section-pad">
      <div className="gutter">
        <p className="eyebrow text-paper/70">Achievements &amp; credentials</p>

        <div className="mt-14 border-t border-white/10">
          {RECOGNITION.map((item, i) => (
            <div
              key={item.label}
              data-anim="recognition-row"
              className="rule-row grid gap-3 py-8 md:grid-cols-12 md:items-baseline"
            >
              <span className="mono text-xs text-violet-bright md:col-span-1">
                0{i + 1}
              </span>
              <span className="display text-[clamp(1.5rem,3vw,2.5rem)] text-paper md:col-span-5">
                {item.label}
              </span>
              <span className="text-base text-paper/55 md:col-span-6">
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
