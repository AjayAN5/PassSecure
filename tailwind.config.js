/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppinsFont: ['"Poppins"', "sans-serif"],
        alegreyaFont: ['"Alegreya"', "sans-serif"],
        montserratFont: ['"Montserrat"', "sans-serif"]
      }
    },
  },
  plugins: [],
}

