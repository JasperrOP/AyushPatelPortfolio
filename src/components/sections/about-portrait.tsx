"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Portrait card for the About section.
 *
 * The orchestrator drives `data-anim="portrait"` on scroll: the card rotates,
 * tilts, and lifts as it crosses the viewport, while the image inside
 * counter-parallaxes for depth.
 *
 * Falls back to a labelled placeholder when the photo file is missing, so the
 * layout never collapses and it's obvious what needs adding.
 */
export function AboutPortrait({
  src = "/ayush.jpg",
  alt = "Ayush Patel",
}: {
  src?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative [perspective:1200px]">
      {/* Violet glow behind the card */}
      <div
        data-anim="portrait-glow"
        className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.28)_0%,transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div
        data-anim="portrait"
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] border border-violet/25 bg-black/50 shadow-[0_40px_90px_-30px_rgba(139,92,246,0.45)] [transform-style:preserve-3d]"
      >
        {!failed ? (
          <Image
            data-anim="portrait-img"
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 26rem, 80vw"
            className="object-cover object-center"
            onError={() => setFailed(true)}
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="display text-[clamp(3rem,7vw,5rem)] leading-none text-violet-bright">
              AP
            </span>
            <p className="mono text-[0.62rem] uppercase leading-relaxed tracking-[0.18em] text-paper/45">
              Add your photo at
              <br />
              <span className="text-violet-bright">public{src}</span>
            </p>
          </div>
        )}

        {/* Sheen that sweeps across as the card rotates */}
        <div
          data-anim="portrait-sheen"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.14)_50%,transparent_65%)]"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          aria-hidden="true"
        />

        <span className="mono absolute bottom-5 left-5 text-[0.6rem] uppercase tracking-[0.2em] text-paper/60">
          Ayush Patel · Ahmedabad
        </span>
      </div>
    </div>
  );
}
