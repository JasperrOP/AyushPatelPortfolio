"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-patel-383027295/" },
  { label: "GitHub", href: "https://github.com/JasperrOP" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!overlay.current) return;

    if (prefersReducedMotion()) {
      overlay.current.style.display = open ? "block" : "none";
      return;
    }

    let ctx: { revert: () => void } | undefined;
    void import("gsap").then(({ gsap }) => {
      if (!overlay.current) return;
      ctx = gsap.context(() => {
        if (open) {
          gsap.set(overlay.current, { display: "block" });
          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
          tl.fromTo(
            overlay.current,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power4.inOut" },
          )
            .from(
              "[data-nav-link]",
              { y: 60, autoAlpha: 0, stagger: 0.07, duration: 0.7 },
              "-=0.45",
            )
            .from(
              "[data-nav-meta] > *",
              { y: 20, autoAlpha: 0, stagger: 0.06, duration: 0.5 },
              "-=0.35",
            );
        } else {
          gsap.to(overlay.current, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.55,
            ease: "power3.inOut",
            onComplete: () => gsap.set(overlay.current, { display: "none" }),
          });
        }
      });
    });

    return () => ctx?.revert();
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background,border,backdrop-filter] duration-500 ${
          scrolled && !open ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-8">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5"
            aria-label="Ayush Patel home"
            onClick={() => setOpen(false)}
          >
            <span className="hidden font-mono text-[10px] tracking-[0.22em] text-white/35 transition-colors duration-300 group-hover:text-signal sm:inline">
              AP&nbsp;/
            </span>
            <span className="text-[1.05rem] font-semibold tracking-[-0.02em] text-white md:text-xl">
              Ayush<span className="text-signal">.</span>Patel
            </span>
          </Link>

          <a
            data-magnetic
            data-hover-lift
            className="hidden rounded-full border border-white/20 px-5 py-2.5 text-sm transition-colors hover:border-signal hover:text-signal md:inline-flex"
            href="mailto:ayush30904@gmail.com"
          >
            Get in touch
          </a>

          <button
            className="relative z-50 grid h-11 w-11 place-items-center"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative flex h-4 w-6 flex-col items-center justify-between">
              <span
                className={`block h-px w-full bg-white transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-full bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-full bg-white transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        ref={overlay}
        className="fixed inset-0 z-30 hidden bg-ink"
        style={{ display: "none" }}
        aria-hidden={!open}
      >
        <div className="precision-grid absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-5 md:px-8">
          <nav aria-label="Full-screen navigation">
            {links.map((link) => (
              <Link
                data-nav-link
                data-hover-lift
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/10 py-4 font-mono text-[clamp(2.5rem,9vw,6rem)] leading-none tracking-[-0.04em] text-white/85 transition-colors first:pt-0 hover:text-signal md:py-5"
              >
                {link.label.toLowerCase()}.
              </Link>
            ))}
          </nav>

          <div
            data-nav-meta
            className="mt-14 grid gap-10 md:mt-20 md:grid-cols-2"
          >
            <div>
              <p className="eyebrow">E-mail</p>
              <a
                href="mailto:ayush30904@gmail.com"
                className="mt-3 block text-lg text-white/80 transition-colors hover:text-signal md:text-2xl"
              >
                ayush30904@gmail.com
              </a>
            </div>
            <div>
              <p className="eyebrow">Social</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm text-white/70 transition-colors hover:text-signal"
                  >
                    {`{ ${social.label.toUpperCase()} }`}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
