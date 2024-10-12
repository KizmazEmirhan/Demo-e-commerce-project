/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Raleway", "sans-serif"],
    },
  },
};
