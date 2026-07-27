import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0C",
        bone: "#FAF9F4",
        paper: "#FFFFFF",
        slate: {
          DEFAULT: "#726F6A",
          light: "#A6A29A",
        },
        line: "#E6E2D8",
        gold: {
          DEFAULT: "#C6A15B",
          deep: "#93732F",
          soft: "#F3E9D3",
        },
        team: {
          green: "#1E7A4C",
          "green-deep": "#14532D",
          "green-soft": "#E7F3EC",
          red: "#A6362B",
          "red-deep": "#7A2620",
          "red-soft": "#F7E9E7",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        stamp: {
          "0%": { opacity: "0", transform: "scale(2.2) rotate(-14deg)" },
          "60%": { opacity: "1" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-8deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        rise: "rise .5s cubic-bezier(.2,.7,.3,1) both",
        stamp: "stamp .6s cubic-bezier(.2,.8,.2,1) both",
        shimmer: "shimmer 3.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
