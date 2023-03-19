/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lilita: ["Lilita One", "cursive"],
      },
    },
    colors: {
      black: "#000000",
      darkgray: "#101010",
      lightgray: "#EEEEEE",
      orange: "#F55803",
      green: "#02ff0e",
      blue: "#0CC6FF",
      white: "#FFFFFF",
    },
  },
  plugins: [],
}
