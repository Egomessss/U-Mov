/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lilita: ["Lilita One", "cursive"],
      },
    },
    colors: {
      black: "#000000",
      yellow: "#FFCC00",
      green: "#003400",
      cream: "#FBEBCE",
      white: "#FFFFFF",
    },
  },
  plugins: [],
}
