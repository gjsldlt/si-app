/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        loginRegisterMobile: "url('')",
        loginRegisterTablet: "url('')",
        loginRegisterDesktop: "url('')",
      },
      height: {
        45: '45px',
        'header-height': '60px',
        hidden: '0px',
        heroicon: '30px',
        '100vh': '100vh',
        'active-border-state': '40%',
        'active-profile-bar': '120px',
        full: '100%',
        screen: '100vh',
        iconbutton: '30px',
      },
      width: {
        45: '45px',
        hidden: '0px',
        heroicon: '30px',
        0: '0px',
        'sidebar-min': '60px',
        'sidebar-width': '200px',
        profileBarMobile: '0px',
        profileBar: '200px',
        'active-border-state': '4px',
        'half-screen': '50vw',
        '100vw': '100vw',
        full: '100%',
        screen: '100vw',
        iconbutton: '30px',
      },
      padding: {
        0: '0',
        45: '45px',
        'header-height': '60px',
        profileBar: '1rem',
        'sidebar-min': '60px',
      },
      left: {
        'sidebar-min': '60px',
      },
      margin: {
        'header-height': '60px',
        'sidebar-min': '60px',
        1: '0.25rem',
        2: '0.50rem',
        5: '1.25rem',
      },
      colors: {
        transparent: 'transparent',
        main: '#86BC25',
        current: '#2BD79C',
        sidebar: '#041E42',
        header: '#052654',
        white: '#ffffff',
        black: '#000',
        purple: '#3f3cbb',
        midnight: '#121063',
        metal: '#565584',
        tahiti: '#3ab7bf',
        silver: '#ecebff',
        'bubble-gum': '#ff77e9',
        bermuda: '#78dcca',
        grey1: '#D0D0CE',
        gainsboro: 'rgba(220 220 220,0.5)',
        gray: '#8B8B8D',
      },
      backgroundImage: {
        staticBanner: `url('/assets/images/static.jpeg')`,
        adminBanner: `url('/assets/images/admin/background-admin.jpg')`,
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
