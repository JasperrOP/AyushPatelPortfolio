"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/projects";

/** Per-visual accent pairs, so the generated fallbacks don't all look alike. */
const TONES: Record<Project["visual"], [string, string]> = {
  research: ["#a855f7", "#6366f1"],
  model: ["#8b5cf6", "#ec4899"],
  location: ["#06b6d4", "#8b5cf6"],
  booking: ["#f59e0b", "#a855f7"],
  predictive: ["#10b981", "#8b5cf6"],
  assessment: ["#8b5cf6", "#3b82f6"],
};

/**
 * Card thumbnail.
 *
 * Uses a real screenshot when `project.image` is set (drop files in
 * /public/projects and point to them). Until then it renders a generated
 * system-map from the project's own pipeline stages — so a card is never blank
 * and never shows a fake screenshot of something that doesn't exist.
 */
export function ProjectThumb({ project }: { project: Project }) {
  const [from, to] = TONES[project.visual] ?? TONES.assessment;
  const stages = project.system.slice(0, 4);
  const gradientId = `thumb-${project.slug}`;
  const [imageFailed, setImageFailed] = useState(false);

  /* Falls through to the generated diagram if the file isn't there yet, so a
     not-yet-added screenshot never renders as a broken image. */
  if (project.image && !imageFailed) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} interface`}
          fill
          sizes="(min-width: 768px) 26rem, 80vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          onError={() => setImageFailed(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="absolute inset-0 opacity-70 transition-transform duration-700 group-hover:scale-[1.06]"
        style={{
          background: `radial-gradient(120% 90% at 20% 0%, ${from}38 0%, transparent 60%), radial-gradient(100% 80% at 90% 30%, ${to}30 0%, transparent 65%)`,
        }}
      />
      <div className="precision-grid absolute inset-0 opacity-40" aria-hidden="true" />

      {/* Pipeline drawn from the project's real stage list */}
      <svg
        viewBox="0 0 320 200"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={`${project.name} pipeline diagram`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1">
            <stop stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>

        {stages.map((_, i) => {
          if (i === stages.length - 1) return null;
          const x1 = 46 + i * 76;
          const y1 = i % 2 === 0 ? 74 : 126;
          const y2 = (i + 1) % 2 === 0 ? 74 : 126;
          return (
            <path
              key={`edge-${i}`}
              d={`M${x1} ${y1} C ${x1 + 38} ${y1}, ${x1 + 38} ${y2}, ${x1 + 76} ${y2}`}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.75"
            />
          );
        })}

        {stages.map((stage, i) => {
          const cx = 46 + i * 76;
          const cy = i % 2 === 0 ? 74 : 126;
          return (
            <g key={stage}>
              <circle cx={cx} cy={cy} r="14" fill="#0a0a0c" stroke={from} strokeWidth="1.4" />
              <circle cx={cx} cy={cy} r="4" fill={to} />
              <text
                x={cx}
                y={cy + 30}
                textAnchor="middle"
                fill="rgba(255,255,255,0.42)"
                fontSize="7.5"
                fontFamily="var(--font-mono), monospace"
              >
                {stage.length > 16 ? `${stage.slice(0, 15)}…` : stage}
              </text>
            </g>
          );
        })}
      </svg>

      <span className="mono absolute left-5 top-5 text-[0.6rem] uppercase tracking-[0.2em] text-paper/40">
        System map
      </span>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
    </div>
  );
}
