"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Body = {
  el: HTMLElement;
  /** Home transform, so "gravity off" restores exactly where it started. */
  home: { x: number; y: number };
};

/**
 * Physics playground for the closing section.
 *
 * Every child tagged `data-gravity-item` keeps its normal document position
 * until gravity is enabled. On enable, matter-js is dynamically imported (it is
 * never in the initial bundle), a rigid body is created at each element's
 * current screen box, and a RAF loop mirrors body transforms back onto the DOM
 * nodes. Disabling tweens everything home and disposes the engine.
 */
export function GravityStage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  /** Everything needed to tear the simulation down. */
  const sim = useRef<{
    stop: () => void;
  } | null>(null);

  const disable = useCallback(() => {
    sim.current?.stop();
    sim.current = null;

    const stage = stageRef.current;
    if (!stage) return;

    const items = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-gravity-item]"),
    );

    void import("gsap").then(({ gsap }) => {
      gsap.to(items, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.68)",
        stagger: { amount: 0.35, from: "random" },
        clearProps: "transform",
      });
    });
  }, []);

  const enable = useCallback(async () => {
    const stage = stageRef.current;
    if (!stage || sim.current) return;

    setLoading(true);

    /* Heavy dependency — only ever fetched when the user opts in */
    const [Matter, { gsap }] = await Promise.all([
      import("matter-js"),
      import("gsap"),
    ]);

    setLoading(false);

    const { Engine, Runner, Bodies, Composite, Body: MBody } = Matter;

    const stageBox = stage.getBoundingClientRect();
    const width = stageBox.width;
    const height = stageBox.height;

    const engine = Engine.create({ gravity: { x: 0, y: 1.1 } });
    const runner = Runner.create();

    const items = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-gravity-item]"),
    );

    const bodies: Array<{ node: HTMLElement; body: Matter.Body; ox: number; oy: number }> =
      [];

    items.forEach((el) => {
      /* Neutralise any existing transform so we measure the true home box */
      gsap.set(el, { x: 0, y: 0, rotate: 0 });
      const box = el.getBoundingClientRect();

      const cx = box.left - stageBox.left + box.width / 2;
      const cy = box.top - stageBox.top + box.height / 2;

      const body = Bodies.rectangle(cx, cy, box.width, box.height, {
        restitution: 0.52,
        friction: 0.42,
        frictionAir: 0.014,
        /* Small random spin so the pile settles unevenly, like real objects */
        angle: 0,
      });

      MBody.setAngularVelocity(body, (Math.random() - 0.5) * 0.16);
      MBody.setVelocity(body, { x: (Math.random() - 0.5) * 3.5, y: 0 });

      bodies.push({ node: el, body, ox: cx, oy: cy });
      Composite.add(engine.world, body);
    });

    /* Walls: floor, both sides, and a high ceiling so nothing escapes upward */
    const wall = 200;
    Composite.add(engine.world, [
      Bodies.rectangle(width / 2, height + wall / 2, width * 2, wall, {
        isStatic: true,
      }),
      Bodies.rectangle(-wall / 2, height / 2, wall, height * 3, { isStatic: true }),
      Bodies.rectangle(width + wall / 2, height / 2, wall, height * 3, {
        isStatic: true,
      }),
      Bodies.rectangle(width / 2, -height, width * 2, wall, { isStatic: true }),
    ]);

    Runner.run(runner, engine);

    let frame = 0;
    const sync = () => {
      bodies.forEach(({ node, body, ox, oy }) => {
        node.style.transform =
          `translate(${body.position.x - ox}px, ${body.position.y - oy}px) ` +
          `rotate(${body.angle}rad)`;
      });
      frame = requestAnimationFrame(sync);
    };
    frame = requestAnimationFrame(sync);

    /* Nudge the pile when the pointer moves through it */
    const onPointer = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;

      bodies.forEach(({ body }) => {
        const dx = body.position.x - px;
        const dy = body.position.y - py;
        const distSq = dx * dx + dy * dy;
        if (distSq < 22000 && distSq > 1) {
          const force = 0.0016 / Math.sqrt(distSq);
          MBody.applyForce(body, body.position, { x: dx * force, y: dy * force });
        }
      });
    };

    stage.addEventListener("pointermove", onPointer);

    sim.current = {
      stop: () => {
        cancelAnimationFrame(frame);
        stage.removeEventListener("pointermove", onPointer);
        Runner.stop(runner);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        bodies.forEach(({ node }) => {
          node.style.transform = "";
        });
      },
    };
  }, []);

  const toggle = () => {
    if (enabled) {
      disable();
      setEnabled(false);
    } else {
      setEnabled(true);
      void enable();
    }
  };

  /* Always dispose on unmount, even if left enabled */
  useEffect(() => () => sim.current?.stop(), []);

  return (
    <div ref={stageRef} className={`relative ${className}`}>
      <button
        onClick={toggle}
        data-magnetic
        aria-pressed={enabled}
        className={`pill absolute right-[clamp(1.25rem,4vw,4rem)] top-0 z-20 gap-2.5 border text-sm ${
          enabled
            ? "border-violet bg-violet text-paper"
            : "border-white/20 bg-white/[0.05] text-paper backdrop-blur-sm hover:bg-white/[0.12]"
        }`}
      >
        <span aria-hidden="true">{enabled ? "↺" : "↓"}</span>
        {loading ? "Loading physics…" : enabled ? "Reset gravity" : "Enable gravity"}
      </button>

      {children}
    </div>
  );
}
