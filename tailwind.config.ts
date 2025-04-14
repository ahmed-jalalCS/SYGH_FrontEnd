import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000",
          100: "#000319",
        },
      },
      fontFamily: {
        sans: ["Tajawal", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
