"use client";

import { useEffect } from "react";

export function MotionOrchestrator() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();

        mm.add(
          {
            reduce: "(prefers-reduced-motion: reduce)",
            mobile: "(max-width: 767px), (pointer: coarse)",
            desktop: "(min-width: 768px) and (pointer: fine)",
          },
          (ctx) => {
            const { reduce, mobile, desktop } = ctx.conditions ?? {};
            if (reduce) return;

            const gsapCtx = gsap.context((context) => {
              /* ── Focus rail: horizontal slide-in with index stagger ── */
              const railItems = gsap.utils.toArray<HTMLElement>("[data-motion='rail']");
              if (railItems.length) {
                gsap.from(railItems, {
                  x: mobile ? 0 : -40,
                  y: mobile ? 28 : 0,
                  autoAlpha: 0,
                  duration: 0.9,
                  stagger: 0.1,
                  ease: "power3.out",
                  scrollTrigger: { trigger: "[data-section='focus']", start: "top 78%", once: true },
                });
              }

              /* ── Experience: clip-path panel reveal + bullet cascade ── */
              const expPanel = document.querySelector<HTMLElement>("[data-motion='experience-panel']");
              if (expPanel) {
                gsap.fromTo(
                  expPanel,
                  { clipPath: "inset(0 100% 0 0)" },
                  {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 1.15,
                    ease: "power4.inOut",
                    scrollTrigger: { trigger: expPanel, start: "top 80%", once: true },
                  },
                );
              }
              const expItems = gsap.utils.toArray<HTMLElement>("[data-motion='experience-item']");
              if (expItems.length) {
                gsap.from(expItems, {
                  x: -24,
                  autoAlpha: 0,
                  duration: 0.7,
                  stagger: 0.09,
                  ease: "power3.out",
                  scrollTrigger: { trigger: "[data-section='experience']", start: "top 72%", once: true },
                });
              }

              /* ── Work heading: upward reveal with split feel ── */
              const workParts = gsap.utils.toArray<HTMLElement>("[data-motion='work-part']");
              if (workParts.length) {
                gsap.from(workParts, {
                  y: 48,
                  autoAlpha: 0,
                  duration: 0.95,
                  stagger: 0.12,
                  ease: "power3.out",
                  scrollTrigger: { trigger: "[data-section='work']", start: "top 78%", once: true },
                });
              }

              /* ── Skills: rows slide from left with rule draw ── */
              const skillRows = gsap.utils.toArray<HTMLElement>("[data-motion='skills-row']");
              if (skillRows.length) {
                gsap.from(skillRows, {
                  x: mobile ? 0 : -56,
                  autoAlpha: 0,
                  duration: 0.8,
                  stagger: 0.08,
                  ease: "power3.out",
                  scrollTrigger: { trigger: "[data-section='skills']", start: "top 80%", once: true },
                });
              }

              /* ── Education: asymmetric column reveals ── */
              const eduLeft = document.querySelector<HTMLElement>("[data-motion='education-left']");
              const eduRight = document.querySelector<HTMLElement>("[data-motion='education-right']");
              if (eduLeft) {
                gsap.from(eduLeft, {
                  y: 40,
                  autoAlpha: 0,
                  duration: 0.9,
                  ease: "power3.out",
                  scrollTrigger: { trigger: "[data-section='education']", start: "top 78%", once: true },
                });
              }
              if (eduRight) {
                gsap.from(eduRight, {
                  y: 56,
                  autoAlpha: 0,
                  duration: 1,
                  delay: 0.15,
                  ease: "power3.out",
                  scrollTrigger: { trigger: "[data-section='education']", start: "top 78%", once: true },
                });
              }

              /* ── Contact: scale-in headline block ── */
              const contactParts = gsap.utils.toArray<HTMLElement>("[data-motion='contact-part']");
              if (contactParts.length) {
                gsap.from(contactParts, {
                  y: 36,
                  autoAlpha: 0,
                  scale: 0.98,
                  duration: 0.85,
                  stagger: 0.1,
                  ease: "power3.out",
                  scrollTrigger: { trigger: "[data-section='contact']", start: "top 82%", once: true },
                });
              }

              /* ── Project showcase rows: cascading reveal ── */
              const projectRows = gsap.utils.toArray<HTMLElement>("[data-motion='project-row']");
              if (projectRows.length) {
                gsap.from(projectRows, {
                  y: 56,
                  autoAlpha: 0,
                  duration: 0.9,
                  stagger: 0.08,
                  ease: "power3.out",
                  scrollTrigger: { trigger: projectRows[0], start: "top 90%", once: true },
                });
              }

              /* ── Project cards: rise + clip-path visual reveal ── */
              document.querySelectorAll<HTMLElement>("[data-card]").forEach((card, i) => {
                const visual = card.querySelector<HTMLElement>("[data-visual]");
                const mask = card.querySelector<HTMLElement>("[data-reveal-mask]");

                gsap.from(card, {
                  y: 64,
                  autoAlpha: 0,
                  duration: 0.95,
                  delay: i * 0.06,
                  ease: "power3.out",
                  scrollTrigger: { trigger: card, start: "top 88%", once: true },
                });

                if (mask) {
                  gsap.fromTo(
                    mask,
                    { scaleX: 1, transformOrigin: "left center" },
                    {
                      scaleX: 0,
                      duration: 1.15,
                      ease: "power4.inOut",
                      scrollTrigger: { trigger: card, start: "top 85%", once: true },
                    },
                  );
                }

                if (desktop && visual) {
                  const enter = () =>
                    gsap.to(visual, {
                      y: -8,
                      scale: 1.02,
                      duration: 0.5,
                      ease: "power3.out",
                      overwrite: true,
                    });
                  const leave = () =>
                    gsap.to(visual, {
                      y: 0,
                      scale: 1,
                      duration: 0.6,
                      ease: "power3.out",
                      overwrite: true,
                    });
                  card.addEventListener("pointerenter", enter);
                  card.addEventListener("pointerleave", leave);
                  context.add(() => {
                    card.removeEventListener("pointerenter", enter);
                    card.removeEventListener("pointerleave", leave);
                  });
                }
              });

              /* ── Counters ── */
              document.querySelectorAll<HTMLElement>("[data-counter]").forEach((counter) => {
                const finalValue = Number(counter.dataset.counter ?? 0);
                const suffix = counter.dataset.counterSuffix ?? "+";
                const state = { value: 0 };
                gsap.to(state, {
                  value: finalValue,
                  duration: 1.6,
                  ease: "power2.out",
                  snap: { value: 1 },
                  scrollTrigger: { trigger: counter, start: "top 88%", once: true },
                  onUpdate: () => {
                    counter.textContent = `${Math.round(state.value)}${suffix}`;
                  },
                });
              });

              /* ── Magnetic buttons (desktop) ── */
              if (desktop) {
                document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((button) => {
                  const xTo = gsap.quickTo(button, "x", { duration: 0.4, ease: "power3.out" });
                  const yTo = gsap.quickTo(button, "y", { duration: 0.4, ease: "power3.out" });
                  const move = (event: PointerEvent) => {
                    const box = button.getBoundingClientRect();
                    xTo((event.clientX - box.left - box.width / 2) * 0.22);
                    yTo((event.clientY - box.top - box.height / 2) * 0.22);
                  };
                  const leave = () => {
                    xTo(0);
                    yTo(0);
                  };
                  button.addEventListener("pointermove", move);
                  button.addEventListener("pointerleave", leave);
                  context.add(() => {
                    button.removeEventListener("pointermove", move);
                    button.removeEventListener("pointerleave", leave);
                  });
                });
              }

              /* ── Work / project page scroll reveals ── */
              const pageReveal = gsap.utils.toArray<HTMLElement>("[data-motion='page-reveal']");
              pageReveal.forEach((el) => {
                gsap.from(el, {
                  y: 36,
                  autoAlpha: 0,
                  duration: 0.8,
                  ease: "power3.out",
                  scrollTrigger: { trigger: el, start: "top 88%", once: true },
                });
              });

              const systemSteps = gsap.utils.toArray<HTMLElement>("[data-motion='system-step']");
              if (systemSteps.length) {
                gsap.from(systemSteps, {
                  y: 32,
                  autoAlpha: 0,
                  duration: 0.7,
                  stagger: 0.08,
                  ease: "power3.out",
                  scrollTrigger: { trigger: "[data-section='system']", start: "top 80%", once: true },
                });
              }

              /* ── Premium link hover (desktop) ── */
              if (desktop) {
                document.querySelectorAll<HTMLElement>("[data-hover-lift]").forEach((link) => {
                  const enter = () =>
                    gsap.to(link, { y: -2, duration: 0.35, ease: "power2.out", overwrite: true });
                  const leave = () =>
                    gsap.to(link, { y: 0, duration: 0.4, ease: "power2.out", overwrite: true });
                  link.addEventListener("pointerenter", enter);
                  link.addEventListener("pointerleave", leave);
                  context.add(() => {
                    link.removeEventListener("pointerenter", enter);
                    link.removeEventListener("pointerleave", leave);
                  });
                });
              }
            });

            return () => gsapCtx.revert();
          },
        );

        cleanup = () => mm.revert();
      },
    );

    return () => cleanup?.();
  }, []);

  return null;
}
