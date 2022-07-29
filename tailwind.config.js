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
      'header-height':'60px',
      'hidden':'0px',
      'heroicon':'30px',
      '100vh':'100vh',
      'active-border-state':'40%',
      'active-profile-bar':'120px',
    },
    width:{
      '45':'45px',
      'hidden':'0px',
      'heroicon':'30px',
      '0':'0px',
      'sidebar-min':'60px',
      'sidebar-width':'200px',
      'profileBarMobile':'0px',
      'profileBar':'200px',
      'active-border-state':'4px',
      'half-screen':'50vw',
    },
    padding:{
      '0':'0',
      '45':'45px',
      'header-height':'60px',
      'profileBar':'1rem',
    },
    colors: {
      transparent: 'transparent',
      current: '#2BD79C',
      'sidebar':'#041E42',
      'header':'#005587',
      'white': '#ffffff',
      'black': '#000',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'grey1':'#D0D0CE',
      'gainsboro':'rgba(220 220 220,0.5)'
    },
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
