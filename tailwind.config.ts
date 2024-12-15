import { Great_Vibes, Satisfy } from "next/font/google";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        Great_Vibes: ["Great Vibes", "sans-serif"],
        Satisfy: ["Satisfy", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
