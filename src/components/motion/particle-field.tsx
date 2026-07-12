"use client";

import { useMemo } from "react";

type Particle = {
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  tone: "signal" | "white";
};

/**
 * Purely decorative, CSS-only floating dot field (transform + opacity only).
 * Deterministic pseudo-random layout so server/client output match (no hydration mismatch).
 */
export function ParticleField({ count = 26, className = "" }: { count?: number; className?: string }) {
  const particles = useMemo<Particle[]>(() => {
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: count }, (_, i) => ({
      left: `${(rand() * 100).toFixed(2)}%`,
      top: `${(rand() * 100).toFixed(2)}%`,
      size: 2 + Math.round(rand() * 2),
      delay: Number((rand() * 6).toFixed(2)),
      duration: Number((6 + rand() * 6).toFixed(2)),
      tone: i % 5 === 0 ? "signal" : "white",
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full motion-safe:animate-particle-float ${
            p.tone === "signal" ? "bg-signal/70" : "bg-white/50"
          }`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
