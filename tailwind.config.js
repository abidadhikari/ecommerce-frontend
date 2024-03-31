/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      color: {
        primary: "#FF69b4", // Can always use CSS variables too e.g. "var(--color-primary)",
        secondary: "#333333",
        brand: "#243c5a",
      },
    },
  },
  plugins: [],
};
