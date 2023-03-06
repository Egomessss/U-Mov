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
      gray:"#101010",
      orange: "#F55803",
      green: "#02ff0e",
      blue: "#0CC6FF",
      cream: "#FBEBCE",
      white: "#FFFFFF",
    },
  },
  plugins: [],
}
