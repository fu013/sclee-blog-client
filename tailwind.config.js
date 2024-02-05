/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: "0px",
      // => @media (min-width: 0px) { ... }
      tablet: "640px",
      // => @media (min-width: 640px) { ... }
      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }
      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7F43F5",
          1: "#9364F2",
          2: "#A884EF",
          3: "#BCA4EB",
          4: "#D0C5E8",
          5: "rgba(0, 0, 0, 0.1)",
        },
        gray: {
          DEFAULT: "#FFFFFF",
          1: "#E5E5E5",
          2: "#AEB0B4",
          3: "#707885",
          4: "#353C49",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};
