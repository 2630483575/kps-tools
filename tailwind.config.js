/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      boxShadow: {
        list: "0 6px 6px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        background: "rgba(226, 221, 221, 0.5)",
      },
      borderRadius: {
        list: "12px",
      },
    },
  },
};
