import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        carbon: "#0a0a0c",
        card: "#101013",
        paper: "#ffffff",
        violet: {
          DEFAULT: "#8b5cf6",
          bright: "#a855f7",
        },
        indigo: { deep: "#241f52" },
        amber: { signal: "#fbbf24" },
        salmon: "#fca5a5",
        blaze: "#ff3b0f",
        forest: "#0f6b45",
        blush: "#ffc3d0",
        sand: "#c9c3b2",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        condensed: ["var(--font-condensed)", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)", opacity: "0.2" },
          "50%": { transform: "translate3d(0, -14px, 0)", opacity: "0.8" },
        },
      },
      animation: {
        drift: "drift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
