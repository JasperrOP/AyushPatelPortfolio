import { SectionHead } from "@/components/ui/section-head";
import { skillCards } from "@/lib/projects";

/**
 * Capability cards on a horizontal rail.
 *
 * The heading scrolls normally, then a separate stage — exactly one viewport
 * tall — is pinned while the track scrubs sideways. Pinning a stage that is
 * taller than the viewport is what caused the earlier "black screen" gaps:
 * the pin froze the tall section and left its empty padding filling the view.
 *
 * The section has no bottom padding on purpose — the pinned stage ends flush,
 * so the pin releasing hands straight over to the next section with no gap.
 */
export function SkillsRail() {
  return (
    <section
      id="skills"
      data-section="skills"
      className="relative pt-[clamp(6rem,12vw,12rem)]"
    >
      <SectionHead
        eyebrow="Behind the scene, beyond the screen"
        title="Skills"
        statement="I work across agentic AI, full-stack engineering, and the data layer that holds it together."
      />

      {/* Pinned stage — height is locked to the viewport */}
      <div
        data-pin="skills"
        className="mt-16 flex min-h-[80svh] flex-col justify-center md:mt-20 md:h-[100svh] md:min-h-0"
      >
        <div
          data-rail="skills"
          className="overflow-x-auto pb-6 [scrollbar-width:none] md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          <div
            data-rail-track
            className="flex w-max gap-6 px-[clamp(1.25rem,4vw,4rem)] md:gap-8"
          >
            {skillCards.map((card) => (
              <article
                key={card.index}
                data-rail-card
                className="rail-card flex w-[min(84vw,30rem)] shrink-0 flex-col p-8 md:w-[34rem] md:p-11"
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 className="display max-w-[12ch] text-[clamp(1.6rem,2.9vw,2.5rem)] text-paper">
                    {card.title}
                  </h3>
                  <span
                    className="display shrink-0 text-[clamp(2.75rem,5.5vw,4.5rem)] leading-none text-violet-bright"
                    aria-hidden="true"
                  >
                    {card.index}
                  </span>
                </div>

                <p className="mt-6 text-[0.95rem] leading-relaxed text-paper/60">
                  {card.blurb}
                </p>

                <ul className="mt-8 border-t border-white/10">
                  {card.facets.map((facet, i) => (
                    <li
                      key={facet}
                      className="flex items-center gap-5 border-b border-white/10 py-3.5"
                    >
                      <span className="mono text-xs text-violet-bright">0{i + 1}</span>
                      <span className="text-base text-paper/90 md:text-lg">{facet}</span>
                    </li>
                  ))}
                </ul>

                <p className="mono mt-7 text-[0.68rem] leading-relaxed tracking-wider text-paper/35">
                  {card.stack}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Scrub progress bar — fills as the rail travels */}
        <div className="mx-[clamp(1.25rem,4vw,4rem)] mt-10 hidden h-px bg-white/10 md:block">
          <div
            data-rail-progress="skills"
            className="h-full w-0 origin-left bg-violet-bright"
          />
        </div>
      </div>
    </section>
  );
}
