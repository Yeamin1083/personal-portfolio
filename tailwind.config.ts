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
        playfair: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-space-grotesk)", "sans-serif"],
      },
      colors: {
        background: "#000000",
        surface: "#111111",
        primary: "#F3F4F6",
        muted: "#9CA3AF",
        accent: "#E5E7EB",
      },
    },
  },
  plugins: [],
};
export default config;
