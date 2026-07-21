const PHASES = [
  {
    n: "#1",
    title: "Architect",
    body: "Modular, reusable agent and tool components — so a new workflow is assembled from parts that already work, not rebuilt from scratch.",
    bg: "bg-forest",
    fg: "text-paper",
  },
  {
    n: "#2",
    title: "Retrieve",
    body: "Multi-agent workflows and RAG pipelines for retrieval and task automation, grounding model output in real source material.",
    bg: "bg-blush",
    fg: "text-void",
  },
  {
    n: "#3",
    title: "Harden",
    body: "Observability, fallback mechanisms, and guardrails — the layer that decides whether an AI workflow is a demo or something you can run.",
    bg: "bg-blaze",
    fg: "text-void",
  },
  {
    n: "#4",
    title: "Integrate",
    body: "Autonomous agents wired into backend REST APIs and databases. Built an autonomous HRMS covering leave, payroll, and attendance — an estimated 60–70% cut in manual processing effort.",
    bg: "bg-sand",
    fg: "text-void",
  },
];

/**
 * Pinned editorial section: the headline holds still while the phase cards
 * travel horizontally past it.
 *
 * The pinned element is exactly one viewport tall so the pin never parks empty
 * padding in the viewport. On mobile it degrades to a native swipe rail.
 */
export function Experience() {
  return (
    <section id="experience" data-section="experience" className="relative">
      <div
        data-pin="experience"
        className="gutter flex min-h-[90svh] flex-col justify-center py-24 md:h-[100svh] md:min-h-0 md:flex-row md:items-center md:gap-14 md:py-0"
      >
        {/* Held side — the headline */}
        <div className="md:w-[42%] md:shrink-0">
          <p className="eyebrow text-paper/70">Experience / 2026 — present</p>

          <h2 className="condensed relative mt-7 text-[clamp(3rem,8vw,7rem)] text-paper">
            Trust the
            <br />
            process
            <span
              data-anim="sticker"
              className="sticker absolute left-[16%] top-[40%] bg-violet-bright text-base text-void md:text-2xl"
              aria-hidden="true"
            >
              OxiqAI
            </span>
          </h2>

          <p className="mono mt-8 text-xs uppercase tracking-[0.18em] text-paper/50">
            GenAI Engineer Intern · Remote — Pune, India
          </p>
          <p className="mt-4 max-w-[40ch] text-[0.95rem] leading-relaxed text-paper/70">
            Developing LLM-powered applications and agentic AI architectures.
          </p>
        </div>

        {/* Travelling side */}
        <div
          data-rail="phases"
          className="mt-12 overflow-x-auto [scrollbar-width:none] md:mt-0 md:flex-1 md:overflow-hidden [&::-webkit-scrollbar]:hidden"
        >
          <div data-rail-track className="flex w-max gap-5">
            {PHASES.map((phase) => (
              <article
                key={phase.n}
                data-rail-card
                className={`flex h-[22rem] w-[min(74vw,20rem)] shrink-0 flex-col justify-between rounded-3xl p-7 md:h-[26rem] md:w-[22rem] ${phase.bg} ${phase.fg}`}
              >
                <span className="mono text-sm opacity-70">{phase.n}</span>

                <div>
                  <h3 className="condensed text-[clamp(2rem,3.4vw,3rem)]">{phase.title}</h3>
                  <p className="mt-5 text-[0.9rem] leading-relaxed opacity-85">
                    {phase.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
