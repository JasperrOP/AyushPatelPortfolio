import { SectionHead } from "@/components/ui/section-head";
import { GravityStage } from "@/components/motion/gravity-stage";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/JasperrOP" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-patel-383027295/" },
  { label: "Email", href: "mailto:ayush30904@gmail.com" },
];

/** Chips that become rigid bodies once gravity is switched on. */
const FALLING_TAGS = [
  "Agentic AI",
  "RAG",
  "LangChain",
  "LangGraph",
  "Next.js",
  "FastAPI",
  "PyTorch",
  "Docker",
  "PostgreSQL",
  "TypeScript",
  "Socket.IO",
  "MongoDB",
  "React",
  "Node.js",
  "Vector DBs",
];

const TAG_TONES = [
  "bg-violet text-paper",
  "bg-white/[0.07] text-paper border border-white/15",
  "bg-blaze text-void",
  "bg-white/[0.07] text-paper border border-white/15",
  "bg-forest text-paper",
];

/**
 * Contact: label/value rows, bracketed socials, and a physics playground where
 * the closing type and tech chips can be dropped under real gravity.
 */
export function Contact() {
  return (
    <section id="contact" data-section="contact" className="relative overflow-hidden">
      <div className="section-pad">
        <SectionHead
          eyebrow="Let's build something"
          title="Contact"
          statement="Open to work involving agentic AI, RAG, full-stack development, or backend systems."
        />

        <div className="gutter mt-24 md:mt-32">
          <div className="border-t border-white/12">
            <div data-anim="contact-row" className="rule-row py-8">
              <p className="display text-[clamp(1.15rem,2vw,1.6rem)] text-paper/45">
                E-MAIL
              </p>
              <a
                data-magnetic
                data-hover-lift
                href="mailto:ayush30904@gmail.com"
                className="display mt-4 block text-[clamp(1.5rem,4.5vw,3.25rem)] text-paper transition-colors hover:text-violet-bright"
              >
                ayush30904@gmail.com
              </a>
            </div>

            <div data-anim="contact-row" className="rule-row py-8">
              <p className="display text-[clamp(1.15rem,2vw,1.6rem)] text-paper/45">
                SOCIAL
              </p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    data-hover-lift
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mono text-sm uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-violet-bright"
                  >
                    {"{ "}
                    {social.label}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Gravity playground ───────────────────────────────────────── */}
      <GravityStage className="min-h-[78svh] overflow-hidden pt-16">
        <div className="gutter flex h-full flex-col justify-center pb-24 pt-20">
          <p className="mono mb-10 max-w-[34ch] text-xs uppercase tracking-[0.2em] text-paper/40">
            Try the switch — everything below has mass.
          </p>

          <h2 className="condensed max-w-[16ch] text-[clamp(3rem,11vw,10rem)] leading-[0.86] text-paper">
            <span data-gravity-item className="inline-block">
              Just
            </span>{" "}
            <span data-gravity-item className="inline-block text-violet-bright">
              imagine
            </span>{" "}
            <span data-gravity-item className="inline-block">
              I
            </span>{" "}
            <span data-gravity-item className="inline-block">
              code
            </span>
          </h2>

          <div className="mt-14 flex max-w-[62rem] flex-wrap gap-3">
            {FALLING_TAGS.map((tag, i) => (
              <span
                key={tag}
                data-gravity-item
                className={`pill inline-block px-5 py-2.5 text-sm ${
                  TAG_TONES[i % TAG_TONES.length]
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-4">
            <a
              data-gravity-item
              href="mailto:ayush30904@gmail.com"
              className="pill bg-paper px-7 text-void"
            >
              Start a conversation
            </a>
            <a
              data-gravity-item
              href="https://github.com/JasperrOP"
              target="_blank"
              rel="noreferrer noopener"
              className="pill border border-white/20 bg-white/[0.05] px-7 text-paper"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </GravityStage>
    </section>
  );
}
