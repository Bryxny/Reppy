/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: "#29272f",
        white: "#ffffff",
        grey: "#e3e4ea",
        blue: "#a5aacc",
        green: "#b0cca5",
        yellow: "#f9eaa1",
      },
    },
  },
  plugins: [],
};
