/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFC0CB', // Standard pink or a nice pastel pink like #FFD1DC, user asked for pink. Let's go with a soft pink.
          cream: '#FFFDD0',
          yellow: '#FDFD96',
          blue: '#AEC6CF',
          green: '#77DD77',
        }
      },
      fontFamily: {
        sans: ['"Architects Daughter"', 'cursive', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
