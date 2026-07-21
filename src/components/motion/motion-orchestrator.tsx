"use client";

import { useEffect } from "react";
import { EASE, DURATION } from "@/lib/motion";

type GsapLib = typeof import("gsap")["gsap"];

/**
 * Single owner of every ScrollTrigger on the page. Section components stay free
 * of animation wiring — this file targets them via `data-anim`, `data-rail`,
 * and `data-pin` attributes.
 *
 * IMPORTANT — why reveals use fromTo(immediateRender: false) rather than from():
 * `gsap.from()` renders its start state immediately, so a later
 * ScrollTrigger.refresh() (which pinning forces, since pins change page height)
 * can re-apply `opacity: 0` to elements that already played. With the default
 * toggleActions of "play none none none" they never replay, and whole sections
 * render blank. Deferring the render keeps elements visible until their trigger
 * actually fires, which makes a stuck-invisible state impossible.
 */
export function MotionOrchestrator() {
  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);
        document.documentElement.classList.add("motion-ready");

        /**
         * Scroll-triggered reveal that can never leave an element hidden.
         * `immediateRender: false` means the start state is only applied when
         * the trigger fires; `once` stops refreshes from re-running it.
         */
        const reveal = (
          g: GsapLib,
          targets: gsap.TweenTarget,
          from: gsap.TweenVars,
          trigger: Element | string,
          start = "top 85%",
          extra: gsap.TweenVars = {},
        ) => {
          const list = gsap.utils.toArray<Element>(targets);
          if (!list.length) return;

          g.fromTo(
            list,
            from,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              scaleX: 1,
              rotate: 0,
              duration: DURATION.base,
              ease: EASE.expo,
              immediateRender: false,
              overwrite: "auto",
              ...extra,
              scrollTrigger: { trigger, start, once: true },
            },
          );
        };

        const mm = gsap.matchMedia();

        /* ── Reveals that run at every breakpoint ────────────────────── */
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          /* Hero runs on load, not on scroll — safe to use from() here */
          gsap.from("[data-anim='hero-line']", {
            yPercent: 118,
            duration: DURATION.hero,
            ease: EASE.expo,
            stagger: 0.09,
          });

          gsap.from("[data-anim='hero-eyebrow']", {
            opacity: 0,
            y: 18,
            duration: DURATION.base,
            ease: EASE.out,
            delay: 0.25,
          });

          gsap.from("[data-anim='hero-tag']", {
            opacity: 0,
            y: 24,
            duration: DURATION.base,
            ease: EASE.out,
            stagger: 0.1,
            delay: 0.5,
          });

          /* Hero glow shrinks away as the hero leaves */
          gsap.to("[data-anim='hero-glow']", {
            scale: 0.7,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-section='hero']",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          /* Section heads */
          gsap.utils.toArray<HTMLElement>("[data-anim='head-title']").forEach((el) => {
            reveal(gsap, el, { opacity: 0, y: 60 }, el, "top 88%", {
              duration: DURATION.slow,
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-anim='head-eyebrow']").forEach((el) => {
            reveal(gsap, el, { opacity: 0, x: -24 }, el, "top 92%", {
              ease: EASE.out,
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-anim='head-statement']").forEach((el) => {
            reveal(gsap, el, { opacity: 0, x: 40 }, el, "top 90%", {
              duration: DURATION.slow,
            });
          });

          /* Discipline band */
          reveal(
            gsap,
            "[data-anim='band-word']",
            { opacity: 0, y: 40 },
            "[data-section='band']",
            "top 80%",
            { stagger: 0.06 },
          );

          reveal(
            gsap,
            "[data-anim='band-rule']",
            { scaleX: 0 },
            "[data-section='band']",
            "top 80%",
            { stagger: 0.06, ease: EASE.out, transformOrigin: "left center" },
          );

          /* About */
          reveal(
            gsap,
            "[data-anim='about-left']",
            { opacity: 0, y: 50 },
            "[data-anim='about-left']",
            "top 88%",
            { duration: DURATION.slow },
          );

          reveal(
            gsap,
            "[data-anim='about-para']",
            { opacity: 0, y: 30 },
            "[data-anim='about-right']",
            "top 85%",
            { stagger: 0.1, ease: EASE.out },
          );

          /* Recognition rows */
          gsap.utils.toArray<HTMLElement>("[data-anim='recognition-row']").forEach((row) => {
            reveal(gsap, row, { opacity: 0, x: -50 }, row, "top 92%");
          });

          /* Contact rows */
          gsap.utils.toArray<HTMLElement>("[data-anim='contact-row']").forEach((row) => {
            reveal(gsap, row, { opacity: 0, y: 36 }, row, "top 90%", {
              ease: EASE.out,
            });
          });

          /* Sticker badge */
          reveal(
            gsap,
            "[data-anim='sticker']",
            { scale: 0, rotate: -32 },
            "[data-anim='sticker']",
            "top 92%",
            { duration: 0.85, ease: "back.out(2.2)", rotate: -7 },
          );

          /* Portrait — rotates and tilts as it crosses the viewport */
          const portrait = document.querySelector<HTMLElement>("[data-anim='portrait']");
          if (portrait) {
            gsap.fromTo(
              portrait,
              { rotateZ: -9, rotateY: 13, y: 70, scale: 0.9 },
              {
                rotateZ: 4,
                rotateY: -8,
                y: -50,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: portrait,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.1,
                },
              },
            );

            /* Image counter-parallaxes inside the frame for depth */
            gsap.fromTo(
              "[data-anim='portrait-img']",
              { yPercent: -7, scale: 1.16 },
              {
                yPercent: 7,
                scale: 1.16,
                ease: "none",
                scrollTrigger: {
                  trigger: portrait,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.1,
                },
              },
            );

            /* Sheen sweeps across during the rotation */
            gsap.fromTo(
              "[data-anim='portrait-sheen']",
              { xPercent: -110 },
              {
                xPercent: 110,
                ease: "none",
                scrollTrigger: {
                  trigger: portrait,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.4,
                },
              },
            );

            /* Glow breathes with scroll position */
            gsap.fromTo(
              "[data-anim='portrait-glow']",
              { opacity: 0.35, scale: 0.85 },
              {
                opacity: 0.9,
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                  trigger: portrait,
                  start: "top bottom",
                  end: "center center",
                  scrub: 1,
                },
              },
            );
          }

          /* Numeric counters */
          gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
            const target = Number(el.dataset.counter ?? 0);
            const suffix = el.dataset.counterSuffix ?? "";
            const value = { n: 0 };

            gsap.to(value, {
              n: target,
              duration: 1.9,
              ease: EASE.out,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
              onUpdate: () => {
                el.textContent = `${Math.round(value.n)}${suffix}`;
              },
            });
          });

          /* Scroll cue */
          gsap.fromTo(
            "[data-anim='cue-fill']",
            { yPercent: -100 },
            {
              yPercent: 100,
              duration: 1.7,
              ease: "power2.inOut",
              repeat: -1,
              repeatDelay: 0.35,
            },
          );

          gsap.to("[data-anim='hero-cue']", {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-section='hero']",
              start: "top top",
              end: "40% top",
              scrub: true,
            },
          });
        });

        /* ── Desktop only: pinned sections with horizontal scrub ─────── */
        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
          /* Skills rail */
          const skillsTrack = document.querySelector<HTMLElement>(
            "[data-rail='skills'] [data-rail-track]",
          );
          const skillsProgress = document.querySelector<HTMLElement>(
            "[data-rail-progress='skills']",
          );

          if (skillsTrack) {
            const distance = () =>
              Math.max(0, skillsTrack.scrollWidth - window.innerWidth + 64);

            gsap.to(skillsTrack, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: "[data-pin='skills']",
                start: "top top",
                end: () => `+=${distance()}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                /* Pins recalculate before dependent triggers */
                refreshPriority: 2,
                onUpdate: (self) => {
                  if (skillsProgress) {
                    skillsProgress.style.width = `${self.progress * 100}%`;
                  }
                },
              },
            });
          }

          /* Experience */
          const phaseTrack = document.querySelector<HTMLElement>(
            "[data-rail='phases'] [data-rail-track]",
          );
          const phaseViewport = document.querySelector<HTMLElement>("[data-rail='phases']");

          if (phaseTrack && phaseViewport) {
            const distance = () =>
              Math.max(0, phaseTrack.scrollWidth - phaseViewport.clientWidth + 32);

            gsap.fromTo(
              phaseTrack,
              { x: () => phaseViewport.clientWidth * 0.28 },
              {
                x: () => -distance(),
                ease: "none",
                immediateRender: true,
                scrollTrigger: {
                  trigger: "[data-pin='experience']",
                  start: "top top",
                  /* Travel distance plus the initial offset — no dead scroll */
                  end: () => `+=${distance() + phaseViewport.clientWidth * 0.28}`,
                  pin: true,
                  pinSpacing: true,
                  scrub: 1,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                  refreshPriority: 1,
                },
              },
            );
          }

          /* Projects gallery — cards enter from the right edge and travel left */
          const galleryTrack = document.querySelector<HTMLElement>(
            "[data-rail='gallery'] [data-rail-track]",
          );
          const galleryViewport = document.querySelector<HTMLElement>(
            "[data-rail='gallery']",
          );

          if (galleryTrack && galleryViewport) {
            /* Start fully off the right edge, end with the last card in frame */
            const startX = () => galleryViewport.clientWidth;
            const endX = () =>
              -Math.max(0, galleryTrack.scrollWidth - galleryViewport.clientWidth + 64);

            gsap.fromTo(
              galleryTrack,
              { x: startX },
              {
                x: endX,
                ease: "none",
                immediateRender: true,
                scrollTrigger: {
                  trigger: "[data-pin='gallery']",
                  start: "top top",
                  end: () => `+=${startX() - endX()}`,
                  pin: true,
                  pinSpacing: true,
                  scrub: 1,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                  refreshPriority: 1,
                },
              },
            );
          }
        });

        /* ── Pointer affordances ─────────────────────────────────────── */
        mm.add("(min-width: 768px) and (pointer: fine)", () => {
          const teardown: Array<() => void> = [];

          gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
            const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: EASE.out });
            const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: EASE.out });

            const move = (event: PointerEvent) => {
              const box = el.getBoundingClientRect();
              xTo((event.clientX - (box.left + box.width / 2)) * 0.32);
              yTo((event.clientY - (box.top + box.height / 2)) * 0.32);
            };

            const reset = () => {
              xTo(0);
              yTo(0);
            };

            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", reset);

            teardown.push(() => {
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", reset);
              gsap.set(el, { x: 0, y: 0 });
            });
          });

          return () => teardown.forEach((fn) => fn());
        });

        /* Refresh once layout has settled — fonts change heading heights, which
           moves every trigger below them. */
        const settle = () => ScrollTrigger.refresh();

        if (document.fonts?.status === "loaded") {
          requestAnimationFrame(settle);
        } else {
          void document.fonts?.ready.then(() => requestAnimationFrame(settle));
        }

        window.addEventListener("load", settle, { once: true });

        dispose = () => {
          window.removeEventListener("load", settle);
          mm.revert();
          ScrollTrigger.getAll().forEach((t) => t.kill());
          document.documentElement.classList.remove("motion-ready");
        };
      },
    );

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return null;
}
