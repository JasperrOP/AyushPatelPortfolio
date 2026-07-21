"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/#skills", label: "Skills" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-patel-383027295/" },
  { label: "GitHub", href: "https://github.com/JasperrOP" },
];

/**
 * Fixed header with the reference's twin-pill treatment: a solid accent
 * "contact" pill beside a neutral "menu" pill that opens a full-screen overlay.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

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
          gsap
            .timeline({ defaults: { ease: "power4.out" } })
            .fromTo(
              overlay.current,
              { clipPath: "inset(0 0 100% 0)" },
              { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power4.inOut" },
            )
            .from(
              "[data-nav-link]",
              { yPercent: 110, stagger: 0.06, duration: 0.7 },
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
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="flex items-center justify-between gutter py-5 md:py-7">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5"
            aria-label="Ayush Patel home"
            onClick={() => setOpen(false)}
          >
            <span className="display text-[1.15rem] tracking-tight text-paper md:text-2xl">
              Ayush<span className="text-violet-bright">.</span>Patel
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              data-magnetic
              data-hover-lift
              className="pill hidden bg-violet text-paper hover:bg-violet-bright md:inline-flex"
              href="mailto:ayush30904@gmail.com"
            >
              Contact
            </a>

            <button
              className="pill relative z-50 gap-3 bg-white/[0.08] text-paper backdrop-blur-md hover:bg-white/[0.16]"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative flex h-3 w-5 flex-col justify-between">
                <span
                  className={`block h-px w-full bg-current transition-transform duration-300 ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current transition-opacity duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlay}
        className="fixed inset-0 z-30 hidden bg-void"
        style={{ display: "none" }}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-center gutter">
          <nav aria-label="Full-screen navigation">
            {links.map((link) => (
              <span key={link.href} className="block overflow-hidden">
                <Link
                  data-nav-link
                  data-hover-lift
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display block py-1.5 text-[clamp(2.25rem,8vw,5.5rem)] leading-[1.05] text-paper/85 transition-colors hover:text-violet-bright"
                >
                  {link.label.toLowerCase()}
                  <span className="text-violet-bright">.</span>
                </Link>
              </span>
            ))}
          </nav>

          <div data-nav-meta className="mt-14 grid gap-10 md:mt-20 md:grid-cols-2">
            <div>
              <p className="eyebrow text-paper/60">E-mail</p>
              <a
                href="mailto:ayush30904@gmail.com"
                className="mt-4 block text-lg text-paper/80 transition-colors hover:text-violet-bright md:text-2xl"
              >
                ayush30904@gmail.com
              </a>
            </div>
            <div>
              <p className="eyebrow text-paper/60">Social</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mono text-sm text-paper/70 transition-colors hover:text-violet-bright"
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
