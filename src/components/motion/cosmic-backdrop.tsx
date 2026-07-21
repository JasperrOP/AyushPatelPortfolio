"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  depth: number;
  twinkle: number;
  violet: boolean;
};

type Nebula = {
  x: number;
  y: number;
  radius: number;
  hue: number;
  alpha: number;
  driftX: number;
  driftY: number;
  phase: number;
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

/**
 * One persistent canvas sky behind the entire page.
 *
 * This exists so no section ever renders as a flat black void — the nebula and
 * star layers are continuous from hero to footer, and parallax by scroll depth
 * so the page reads as one connected space rather than stacked panels.
 *
 * Runs on a single RAF loop, pauses when the tab is hidden, and bails out
 * entirely under reduced-motion (falling back to a static gradient).
 */
export function CosmicBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let nebulae: Nebula[] = [];
    let shooters: Shooter[] = [];
    let frame = 0;
    let time = 0;
    let scrollY = window.scrollY;
    let targetScroll = scrollY;
    let running = true;

    /* Seeded PRNG so the layout is stable across resizes */
    let seed = 20260721;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      seed = 20260721;

      /* Star density scales with viewport area, capped for low-end GPUs */
      const count = Math.min(260, Math.round((width * height) / 6200));

      stars = Array.from({ length: count }, () => {
        const depth = rand();
        return {
          x: rand() * width,
          /* Spread over 3 viewport heights so parallax always has fresh sky */
          y: rand() * height * 3,
          r: depth * 1.5 + 0.35,
          depth,
          twinkle: rand() * Math.PI * 2,
          violet: rand() > 0.68,
        };
      });

      nebulae = [
        { x: 0.5, y: 0.35, radius: 0.62, hue: 268, alpha: 0.3, driftX: 0.4, driftY: 0.22, phase: 0 },
        { x: 0.18, y: 0.75, radius: 0.5, hue: 285, alpha: 0.2, driftX: -0.3, driftY: 0.3, phase: 1.7 },
        { x: 0.84, y: 0.55, radius: 0.46, hue: 250, alpha: 0.17, driftX: 0.26, driftY: -0.24, phase: 3.4 },
      ];
    };

    /* ── Static fallback for reduced-motion ─────────────────────────── */
    const paintStatic = () => {
      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        0,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.75,
      );
      glow.addColorStop(0, "rgba(139, 92, 246, 0.20)");
      glow.addColorStop(0.5, "rgba(88, 40, 170, 0.08)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        const y = star.y % height;
        ctx.globalAlpha = 0.28 + star.depth * 0.45;
        ctx.fillStyle = star.violet ? "#c4b5fd" : "#ffffff";
        ctx.beginPath();
        ctx.arc(star.x, y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      time += 0.0042;

      /* Ease toward real scroll so parallax never jitters on fast wheels */
      scrollY += (targetScroll - scrollY) * 0.085;

      ctx.clearRect(0, 0, width, height);

      /* ── Nebula field: soft drifting colour masses ── */
      ctx.globalCompositeOperation = "lighter";

      nebulae.forEach((neb) => {
        const cx =
          (neb.x + Math.sin(time * neb.driftX + neb.phase) * 0.06) * width;
        const cy =
          (neb.y + Math.cos(time * neb.driftY + neb.phase) * 0.05) * height -
          scrollY * 0.035;

        const radius = neb.radius * Math.max(width, height);
        const pulse = 0.82 + Math.sin(time * 0.9 + neb.phase) * 0.18;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `hsla(${neb.hue}, 88%, 62%, ${neb.alpha * pulse})`);
        grad.addColorStop(
          0.42,
          `hsla(${neb.hue + 10}, 80%, 48%, ${neb.alpha * pulse * 0.34})`,
        );
        grad.addColorStop(1, "hsla(260, 80%, 40%, 0)");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      ctx.globalCompositeOperation = "source-over";

      /* ── Star layers: deeper stars parallax faster ── */
      stars.forEach((star) => {
        const parallax = scrollY * (0.06 + star.depth * 0.34);
        /* Wrap through 3 viewport-heights of sky */
        let y = (star.y - parallax) % (height * 3);
        if (y < 0) y += height * 3;
        if (y > height + 40) return;

        const flicker = 0.62 + Math.sin(time * 2.4 + star.twinkle) * 0.38;
        const alpha = (0.22 + star.depth * 0.6) * flicker;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.violet ? "#c4b5fd" : "#ffffff";
        ctx.beginPath();
        ctx.arc(star.x, y, star.r, 0, Math.PI * 2);
        ctx.fill();

        /* Brightest stars get a soft bloom */
        if (star.depth > 0.86) {
          ctx.globalAlpha = alpha * 0.22;
          ctx.beginPath();
          ctx.arc(star.x, y, star.r * 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;

      /* ── Occasional shooting star ── */
      if (rand() > 0.9975 && shooters.length < 2) {
        shooters.push({
          x: rand() * width * 0.7,
          y: rand() * height * 0.45,
          vx: 5.5 + rand() * 3.5,
          vy: 2.2 + rand() * 1.8,
          life: 0,
          maxLife: 70,
        });
      }

      shooters = shooters.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;

        const t = s.life / s.maxLife;
        const alpha = Math.sin(t * Math.PI) * 0.85;

        const trail = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 11, s.y - s.vy * 11);
        trail.addColorStop(0, `rgba(233, 213, 255, ${alpha})`);
        trail.addColorStop(1, "rgba(233, 213, 255, 0)");

        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 11, s.y - s.vy * 11);
        ctx.stroke();

        return s.life < s.maxLife && s.x < width + 120 && s.y < height + 120;
      });

      frame = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      targetScroll = window.scrollY;
    };

    const onResize = () => {
      build();
      if (reduced) paintStatic();
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        running = false;
      } else if (!running && !reduced) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };

    build();

    if (reduced) {
      paintStatic();
    } else {
      frame = requestAnimationFrame(draw);
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* Base wash — guarantees colour even before the canvas paints */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,#150d2e_0%,#08060f_55%,#000000_100%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Vignette keeps text legible over the brightest nebula cores */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
