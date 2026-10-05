/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#071757",
        secondary: "#EB2C2E",
        ternary: "#112972",
        prime: "#e2eaf1",
        "prime-light": "#1D3E9F",
        // New design system
        ink: {
          DEFAULT: "#0C1F66",
          800: "#0A1A57",
          700: "#16308F",
        },
        brand: {
          DEFAULT: "#EB2C2E",
          600: "#D11F22",
          400: "#FF5A5C",
          50: "#FFF1F1",
        },
        mist: "#F5F7FB",
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "var(--font-body)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(12,31,102,0.05), 0 12px 32px -12px rgba(12,31,102,0.16)",
        lift: "0 2px 4px rgba(12,31,102,0.05), 0 28px 60px -20px rgba(12,31,102,0.30)",
        glow: "0 18px 50px -12px rgba(235,44,46,0.55)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
