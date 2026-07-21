"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Entry preloader.
 *
 * Progress is driven by real signals — font loading plus window load — rather
 * than a fake timer, then eased so the counter never stalls or snaps. On
 * completion the panel splits into vertical slats that lift away, and the page
 * beneath is released by adding `.is-loaded` to <html>.
 *
 * Skipped entirely under reduced-motion and on repeat visits within a session.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("intro-seen") === "1";

    if (reduced || seen) {
      html.classList.add("is-loaded");
      setDone(true);
      return;
    }

    html.classList.add("is-loading");

    let real = 0;
    let shown = 0;
    let frame = 0;
    let finished = false;

    const bump = (to: number) => {
      real = Math.max(real, to);
    };

    /* Real readiness signals */
    void document.fonts?.ready.then(() => bump(0.65));
    if (document.readyState === "complete") {
      bump(1);
    } else {
      window.addEventListener("load", () => bump(1), { once: true });
    }

    /* Floor that creeps forward so the counter always feels alive */
    const started = performance.now();

    const tick = () => {
      const elapsed = (performance.now() - started) / 1000;
      /* Asymptotic crawl toward 0.9 — never reaches it on its own */
      const crawl = 0.9 * (1 - Math.exp(-elapsed * 0.85));
      const target = Math.max(real, crawl);

      shown += (target - shown) * 0.08;

      const pct = Math.min(100, Math.round(shown * 100));
      setProgress(pct);

      if (real >= 1 && pct >= 99 && !finished) {
        finished = true;
        setProgress(100);
        void reveal();
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    const reveal = async () => {
      const { gsap } = await import("gsap");
      const root = rootRef.current;

      if (!root) {
        html.classList.remove("is-loading");
        html.classList.add("is-loaded");
        setDone(true);
        return;
      }

      const slats = root.querySelectorAll("[data-slat]");

      gsap
        .timeline({
          onComplete: () => {
            html.classList.remove("is-loading");
            html.classList.add("is-loaded");
            sessionStorage.setItem("intro-seen", "1");
            setDone(true);
            /* Pinned triggers measured against a locked page need a recount */
            void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) =>
              ScrollTrigger.refresh(),
            );
          },
        })
        .to("[data-intro-meta]", { opacity: 0, y: -18, duration: 0.4, ease: "power2.in" })
        .to(
          slats,
          {
            yPercent: -100,
            duration: 0.95,
            ease: "power4.inOut",
            stagger: { amount: 0.28, from: "start" },
          },
          "-=0.15",
        );
    };

    return () => {
      cancelAnimationFrame(frame);
      html.classList.remove("is-loading");
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-end justify-between"
      aria-hidden="true"
    >
      {/* Vertical slats that lift away on completion */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} data-slat className="h-full flex-1 bg-void" />
        ))}
      </div>

      <div
        data-intro-meta
        className="relative flex w-full items-end justify-between gutter pb-[clamp(2rem,6vh,4rem)]"
      >
        <div>
          <p className="mono text-[0.65rem] uppercase tracking-[0.35em] text-paper/45">
            Ayush Patel
          </p>
          <p className="mono mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-violet-bright">
            Software &amp; AI/ML Engineer
          </p>
        </div>

        <p className="display text-[clamp(3.5rem,14vw,11rem)] leading-none tabular-nums text-paper">
          {String(progress).padStart(3, "0")}
          <span className="text-violet-bright">%</span>
        </p>
      </div>

      {/* Load progress rule */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
        <div
          className="h-full bg-violet-bright transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
