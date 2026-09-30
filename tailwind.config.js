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
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
