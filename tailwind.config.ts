import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0c0f",
        surface: "#121419",
        paper: "#f4f2ed",
        signal: "#9a7cff",
        cyan: "#75e1ff",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 24px 48px -12px rgba(0, 0, 0, 0.45)",
        "card-hover": "0 32px 64px -16px rgba(154, 124, 255, 0.18)",
      },
      keyframes: {
        "particle-float": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)", opacity: "0.25" },
          "50%": { transform: "translate3d(0, -18px, 0)", opacity: "0.85" },
        },
      },
      animation: {
        "particle-float": "particle-float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
