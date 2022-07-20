/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    height:{
      '45':'45px',
      'header-height':'70px',
      'hidden':'0px',
    },
    width:{
      '45':'45px',
      'sidebar-width':'200px',
      'hidden':'0px',
    },
    padding:{
      '45':'45px',
      'header-height':'70px',
    },
    colors: {
      transparent: 'transparent',
      current: '#86BC25',
      'white': '#ffffff',
      'black': '#000',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
