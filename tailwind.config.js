/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
    "./formkit.config.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "app" : "url('/img/1.jpg')"
      },
      colors: {
        'black-matte': '#1C1C1C',
        'dark-gray': '#333333',
        'steel-gray': '#555555',
        'deep-red': '#B71C1C',
        'mustard-yellow': '#FFC107',
        'vtd-primary' : colors.blue
      },
    },
  },
  plugins: [],
}

