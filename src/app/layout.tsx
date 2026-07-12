import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { MotionOrchestrator } from "@/components/motion/motion-orchestrator";
import { CustomCursor } from "@/components/motion/custom-cursor";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ayushpatel.dev"),
  title: { default: "Ayush Patel — Software Engineer & AI/ML Engineer", template: "%s | Ayush Patel" },
  description:
    "Ayush Patel is a Software Engineer and AI/ML Engineer building full-stack applications and LLM-powered, agentic AI systems with LangChain, LangGraph, and RAG.",
    verification: {
    google: "18IQDCSw4UERmco5QJjAPKp_bQ4yjxicyU_rRNElRKk",
  },
  keywords: [
    "GenAI Engineer",
    "LLM",
    "Agentic AI",
    "LangChain",
    "LangGraph",
    "RAG",
    "Full-stack",
    "Ayush Patel",
  ],
  authors: [{ name: "Ayush Patel" }],
  creator: "Ayush Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ayush Patel — Software Engineer & AI/ML Engineer",
    description:
      "Full-stack applications and LLM-powered, agentic AI systems.",
    siteName: "Ayush Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Patel — Software Engineer & AI/ML Engineer",
    description:
      "Full-stack applications and LLM-powered, agentic AI systems.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-paper focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <MotionOrchestrator />
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScroll>
        <div className="grain" aria-hidden="true" />
        <CustomCursor />
      </body>
    </html>
  );
}
