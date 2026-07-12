"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches ||
      !ring.current ||
      !dot.current
    ) {
      return;
    }

    document.documentElement.classList.add("custom-cursor");

    const ringEl = ring.current;
    const dotEl = dot.current;
    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;
    let targetX = -100;
    let targetY = -100;
    let frame = 0;
    let scale = 1;

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const onEnter = () => {
      scale = 2.4;
      ringEl.classList.add("is-hover");
    };
    const onLeave = () => {
      scale = 1;
      ringEl.classList.remove("is-hover");
    };

    const interactive = document.querySelectorAll<HTMLElement>(
      "a, button, [data-magnetic], [data-card], [data-hover-lift]",
    );
    interactive.forEach((el) => {
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
    });

    const tick = () => {
      ringX += (targetX - ringX) * 0.14;
      ringY += (targetY - ringY) * 0.14;
      dotX += (targetX - dotX) * 0.35;
      dotY += (targetY - dotY) * 0.35;

      ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
      dotEl.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      interactive.forEach((el) => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      });
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/60 mix-blend-difference transition-[border-color] duration-300 md:block"
        aria-hidden="true"
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[61] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan mix-blend-difference md:block"
        aria-hidden="true"
      />
    </>
  );
}
