/**
 * Hero: the name set oversized in the lower-left, floating directly on the
 * persistent cosmic backdrop. The old CSS light-shaft was removed — it rendered
 * as a hard vertical line rather than atmosphere, and the canvas nebula now
 * carries that job across the whole page.
 */
export function Hero() {
  return (
    <section
      data-section="hero"
      className="relative flex h-[100svh] min-h-[620px] flex-col justify-end overflow-hidden"
    >
      {/* Local bloom that grounds the name in the surrounding sky */}
      <div
        data-anim="hero-glow"
        className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[85%] w-[min(70vw,900px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.28)_0%,rgba(139,92,246,0.1)_45%,transparent_72%)] blur-[60px]"
        aria-hidden="true"
      />

      <div className="relative z-10 gutter pb-[clamp(3rem,9vh,7rem)]">
        <p data-anim="hero-eyebrow" className="eyebrow mb-8 text-paper/70">
          Software &amp; AI/ML Engineer
        </p>

        <h1
          data-anim="hero-name"
          className="display text-[clamp(3.75rem,15vw,15rem)] text-paper"
        >
          <span className="block overflow-hidden">
            <span data-anim="hero-line" className="block">
              Ayush
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-anim="hero-line" className="block">
              Patel
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <p data-anim="hero-tag" className="max-w-[38ch] text-base leading-relaxed text-paper/60">
            I build LLM-powered applications, agentic AI architectures, and
            full-stack systems — from retrieval pipelines to production APIs.
          </p>

          <a
            data-anim="hero-tag"
            data-magnetic
            href="#work"
            className="pill border border-white/20 bg-white/[0.04] text-paper backdrop-blur-sm hover:bg-paper hover:text-void"
          >
            Selected work
            <span className="ml-3" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-anim="hero-cue"
        className="pointer-events-none absolute bottom-8 right-[clamp(1.25rem,4vw,4rem)] hidden items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span className="mono text-[0.65rem] uppercase tracking-[0.3em] text-paper/40">
          Scroll
        </span>
        <span className="h-10 w-px overflow-hidden bg-white/15">
          <span data-anim="cue-fill" className="block h-full w-full bg-violet-bright" />
        </span>
      </div>
    </section>
  );
}

const DISCIPLINES = [
  ["Agentic AI", false],
  ["RAG", false],
  ["Full-stack", true],
  ["System design", false],
  ["Backend", false],
  ["LLMs", true],
  ["DSA", false],
] as const;

/**
 * Word-row band — terms separated by short violet connector rules, with a
 * couple set in italic for rhythm.
 */
export function DisciplineBand() {
  return (
    <section
      data-section="band"
      className="relative overflow-hidden border-y border-white/10 py-[clamp(4rem,9vw,8rem)]"
    >
      <div className="gutter">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-center gap-x-8 gap-y-6 text-center">
          {DISCIPLINES.map(([word, isItalic], i) => (
            <span key={word} className="flex items-center gap-8">
              <span
                data-anim="band-word"
                className={`display text-[clamp(1.85rem,5.2vw,4.5rem)] text-paper ${
                  isItalic ? "italic" : ""
                }`}
              >
                {word}
              </span>
              {i < DISCIPLINES.length - 1 && (
                <span
                  data-anim="band-rule"
                  className="hidden h-px w-[clamp(2rem,4vw,5rem)] origin-left bg-violet md:block"
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
