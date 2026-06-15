import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["var(--font-orbitron)"],
        sans: ["var(--font-space-grotesk)", "sans-serif"],
      },
      colors: {
        background: "var(--bg-base)",
        surface: "var(--surface)",
        primary: "var(--text-main)",
        muted: "var(--text-muted)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
};
export default config;
