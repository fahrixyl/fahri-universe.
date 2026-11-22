import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: "#05070D", navy: "#080D19", navy2: "#0D1528",
        electric: "#2563EB", cyan: "#22D3EE", ink: "#F8FAFC", mute: "#94A3B8",
      },
      fontFamily: {
        display: ["var(--font-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
