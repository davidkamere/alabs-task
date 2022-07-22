/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './Components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signin': "url('../public/stone.png')",
        'feed': "url('../public/dune.png')",
        'floral': "url('../public/floral.png')"
      },
      fontFamily: {
       montserrat: ["Montserrat"],
       lato: ["Lato"]
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
  ],
}
